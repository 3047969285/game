import { beginSpeech } from "../../infra/speechActivity";
import type { Voice } from "./types";

/**
 * 英语朗读（speechSynthesis）。核心承诺：speak() 一定会 resolve，绝不卡死流程。
 *
 * 降级策略（任何一条命中都改用计时，每词 0.33 秒）：
 *  - 浏览器没有 speechSynthesis；
 *  - 调用 speak 后 ~1.5 秒内引擎既没触发 onstart、`speechSynthesis.speaking` 也不是 true（被自动播放策略拦截）；
 *  - 发声前就收到 onerror。
 * 发声后：
 *  - 没有 onboundary 事件的声音（部分系统 / 网络声音）用计时器按词推进；
 *  - onend 迟迟不来（Chrome 的已知问题）则在 “预计时长 × 2 + 4 秒” 后强制结束。
 */

export const SECONDS_PER_WORD = 0.33;

/** 测试开关 ?memfast=1：不用 TTS，直接按计时降级并加速（倍率） */
let fastMultiplier = 1;
export function setNarratorFast(multiplier: number): void {
  fastMultiplier = Math.max(1, multiplier);
}
/** 第一人称跟读的语速（0.8 / 1.0）：乘在每个音色的基础语速上 */
let rateScale = 1;
export function setNarratorRate(scale: number): void {
  rateScale = Math.min(1.5, Math.max(0.5, scale));
}
export function getNarratorRate(): number {
  return rateScale;
}
const START_TIMEOUT_MS = 1500;

export interface WordEvent {
  /** 当前正在读的词（从 0 开始） */
  index: number;
  word: string;
  total: number;
}

type WordCallback = (e: WordEvent) => void;

interface VoiceProfile {
  rate: number;
  pitch: number;
  /** 偏好的声音名片段（按顺序） */
  prefer: string[];
}

const PROFILES: Record<Voice, VoiceProfile> = {
  system: { rate: 0.97, pitch: 1.0, prefer: ["Aria", "Jenny", "Sonia", "Libby", "Ava", "Samantha", "Serena", "Karen", "Google US English", "Zira"] },
  young: { rate: 1.02, pitch: 1.04, prefer: ["Guy", "Andrew", "Brian", "Ryan", "Aaron", "Alex", "Google US English", "Samantha"] },
  old: { rate: 0.9, pitch: 0.9, prefer: ["Thomas", "George", "Ryan", "Daniel", "Arthur", "Google UK English Male", "David", "Alex"] },
};

/** 声音质量打分：神经网络 / 高级声音远比系统自带的机械合成自然 */
function voiceQuality(v: SpeechSynthesisVoice): number {
  const n = `${v.name} ${v.voiceURI ?? ""}`;
  let q = 0;
  if (/natural|neural|multilingual/i.test(n)) q += 100;
  if (/online/i.test(n)) q += 20;
  if (/premium|enhanced|siri|studio|wavenet/i.test(n)) q += 80;
  if (/google/i.test(n)) q += 25;
  if (!v.localService) q += 10;
  if (/^en[-_]us/i.test(v.lang)) q += 6;
  else if (/^en[-_]gb/i.test(v.lang)) q += 4;
  if (/zira|david|mark|hazel|espeak|compact/i.test(n)) q -= 40; // 老式机械音
  return q;
}
/** 拆词：返回每个词的起止字符位置 */
export function splitWords(text: string): Array<{ word: string; start: number }> {
  const out: Array<{ word: string; start: number }> = [];
  for (const m of text.matchAll(/\S+/g)) out.push({ word: m[0], start: m.index ?? 0 });
  return out;
}

function getSynth(): SpeechSynthesis | undefined {
  const g = globalThis as { speechSynthesis?: SpeechSynthesis; SpeechSynthesisUtterance?: unknown };
  if (!g.speechSynthesis || typeof g.SpeechSynthesisUtterance !== "function") return undefined;
  return g.speechSynthesis;
}

function pickVoice(synth: SpeechSynthesis, voice: Voice): SpeechSynthesisVoice | undefined {
  let voices: SpeechSynthesisVoice[] = [];
  try {
    voices = synth.getVoices();
  } catch {
    return undefined;
  }
  const en = voices.filter((v) => /^en[-_]/i.test(v.lang));
  if (en.length === 0) return undefined;
  const pool = en.filter((v) => /^en[-_](us|gb)/i.test(v.lang));
  const candidates = pool.length ? pool : en;
  const prefer = PROFILES[voice].prefer;
  const score = (v: SpeechSynthesisVoice): number => {
    const idx = prefer.findIndex((name) => v.name.includes(name));
    return voiceQuality(v) + (idx >= 0 ? 60 - idx * 4 : 0);
  };
  return [...candidates].sort((a, b) => score(b) - score(a))[0];
}

/** 把整段文字切成"意群"：按句末标点断句，过长的句子再按逗号 / 分号切，每块带它在原文里的起点 */
export function splitChunks(text: string): Array<{ text: string; start: number; kind: "sentence" | "comma" | "end" | "question" | "exclaim" }> {
  const out: Array<{ text: string; start: number; kind: "sentence" | "comma" | "end" | "question" | "exclaim" }> = [];
  const re = /[^.!?;:\n]+[.!?;:]*|\n+/g;
  for (const m of text.matchAll(re)) {
    const seg = m[0];
    if (!seg.trim()) continue;
    const base = m.index ?? 0;
    const words = seg.trim().split(/\s+/).length;
    const tail = seg.trimEnd().slice(-1);
    const kindOf = (t: string): "sentence" | "question" | "exclaim" => (t === "?" ? "question" : t === "!" ? "exclaim" : "sentence");
    if (words <= 14) {
      out.push({ text: seg, start: base, kind: kindOf(tail) });
      continue;
    }
    // 长句：在逗号处切，逗号块之间停顿更短，末块沿用句末语气
    let last = 0;
    for (const cm of seg.matchAll(/,\s+/g)) {
      const cut = (cm.index ?? 0) + cm[0].length;
      const piece = seg.slice(last, cut);
      if (piece.trim().split(/\s+/).length >= 4 && seg.slice(cut).trim().split(/\s+/).length >= 3) {
        out.push({ text: piece, start: base + last, kind: "comma" });
        last = cut;
      }
    }
    out.push({ text: seg.slice(last), start: base + last, kind: kindOf(tail) });
  }
  if (out.length === 0) out.push({ text, start: 0, kind: "end" });
  return out;
}
export type Tone = "neutral" | "warm" | "excited" | "curious" | "serious" | "soft";

/** 由文字内容判断语气：不同语境带不同的调 */
export function detectTone(text: string): Tone {
  const t = text.toLowerCase();
  const q = (text.match(/\?/g) ?? []).length;
  const ex = (text.match(/!/g) ?? []).length;
  if (/\b(sorry|sad|miss(ed)?|lonely|alone|tears?|cry(ing)?|lost|goodbye|afraid|gone|died?|quiet)\b/.test(t)) return "soft";
  if (/\b(danger|warning|must|never|urgent|serious|crisis|emergency|disaster|war)\b/.test(t)) return "serious";
  if (ex >= 1 || /\b(wow|amazing|great|fantastic|congratulations|hooray|incredible|wonderful)\b/.test(t)) return "excited";
  if (q >= 1) return "curious";
  if (/\b(thank|please|welcome|friend|hope|love|dear|together|smile|happy|glad)\b/.test(t)) return "warm";
  return "neutral";
}

interface ChunkProsody {
  rate: number;
  pitch: number;
  /** 本块结束后的停顿（毫秒） */
  pause: number;
  volume: number;
}

/**
 * 每一个意群的韵律：
 *  - 句子越长语速越快（口语里长句会"连着说"），短句放慢、加重；
 *  - 疑问句抬高音调，陈述句末收低、放慢，感叹句提速加高；
 *  - 逗号后短停顿，句末长停顿，段落（换行）更长；
 *  - "Well / Oh / So / But / You know" 这类口语起头词放慢一点，像边想边说；
 *  - 引号里的话略抬高音调，像换了说话人；
 *  - 每块有一点点（确定性的）随机起伏，避免每句都是同一个调。
 */
function prosodyFor(chunk: { text: string; kind: string }, index: number, count: number, tone: Tone, base: { rate: number; pitch: number }, natural: boolean): ChunkProsody {
  const words = chunk.text.trim().split(/\s+/).length;
  const jit = ((Math.sin(index * 12.9898 + words * 78.233) * 43758.5453) % 1 + 1) % 1 - 0.5; // -0.5..0.5 确定性
  const amp = natural ? 0.5 : 1; // 神经网络声音本身已有起伏，少加一点
  let rate = base.rate;
  let pitch = base.pitch;
  let pause = 120;
  let volume = 1;

  // 语气底色
  if (tone === "warm") { rate *= 0.97; pitch += 0.03; }
  else if (tone === "excited") { rate *= 1.06; pitch += 0.07; }
  else if (tone === "curious") { rate *= 0.99; pitch += 0.04; }
  else if (tone === "serious") { rate *= 0.92; pitch -= 0.06; }
  else if (tone === "soft") { rate *= 0.88; pitch -= 0.03; volume = 0.85; }

  // 句长：长句连着说，短句收着说
  if (words > 12) rate *= 1.04;
  else if (words <= 4) { rate *= 0.93; pitch += 0.015; }

  // 句式
  if (chunk.kind === "question") { pitch += 0.09; rate *= 0.98; pause = 360; }
  else if (chunk.kind === "exclaim") { pitch += 0.07; rate *= 1.04; pause = 320; volume = Math.min(1, volume + 0.05); }
  else if (chunk.kind === "comma") { pitch += 0.02; pause = 140; }
  else { pitch -= 0.025; rate *= 0.97; pause = 300; }
  if (index === count - 1) { pitch -= 0.03; rate *= 0.95; pause = 0; } // 最后一句收尾

  // 口语起头词：边想边说
  if (/^\s*(well|oh|so|but|um|hmm|yes|no|okay|ok|you know|actually|look)\b/i.test(chunk.text)) { rate *= 0.9; pause += 90; }
  // 引号：换了一个人说话
  if (/["“”']/.test(chunk.text)) pitch += 0.03;
  // 换行：段落停顿
  if (/\n/.test(chunk.text)) pause += 280;

  rate *= 1 + jit * 0.05 * amp;
  pitch += jit * 0.05 * amp;
  return {
    rate: Math.min(1.6, Math.max(0.55, rate)),
    pitch: Math.min(1.8, Math.max(0.5, pitch)),
    pause: Math.round(pause),
    volume,
  };
}
interface Session {
  cancel(): void;
}

export class Narrator {
  private readonly callbacks = new Set<WordCallback>();
  private active: Session | null = null;

  /** 订阅“正在读第几个词”事件。返回取消订阅函数 */
  onWord(cb: WordCallback): () => void {
    this.callbacks.add(cb);
    return () => this.callbacks.delete(cb);
  }

  get busy(): boolean {
    return this.active !== null;
  }

  /**
   * 在用户手势里同步调用一次，给 iOS / Safari 解锁朗读（之后的 speak 才允许异步触发）。
   */
  unlock(): void {
    const synth = getSynth();
    if (!synth) return;
    try {
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      synth.speak(u);
    } catch {
      // 解锁失败不影响流程（会走计时降级）
    }
  }

  /** 预计朗读时长（秒），用于不朗读时的节奏 */
  static estimate(text: string): number {
    return Math.max(0.6 / fastMultiplier, (splitWords(text).length * SECONDS_PER_WORD) / fastMultiplier);
  }

  cancel(): void {
    this.active?.cancel();
    this.active = null;
  }

  /** speakerId：说话的人物 actor id（登记到 speechActivity，音乐闪避之外也让对应人物开口） */
  speak(text: string, voice: Voice = "system", speakerId?: string, toneHint?: Tone): Promise<void> {
    this.cancel();
    const words = splitWords(text);
    const total = words.length;
    const profile = PROFILES[voice];
    const synth = getSynth();

    return new Promise<void>((resolve) => {
      let done = false;
      let releaseMusic: (() => void) | undefined;
      let lastIndex = -1;
      let boundarySeen = false;
      let started = false;
      let startedAt = 0;
      const timers = new Set<ReturnType<typeof setTimeout>>();
      const intervals = new Set<ReturnType<typeof setInterval>>();

      const later = (fn: () => void, ms: number): void => {
        const t = setTimeout(() => {
          timers.delete(t);
          fn();
        }, ms);
        timers.add(t);
      };

      const emit = (index: number): void => {
        const upto = Math.min(index, total - 1);
        while (lastIndex < upto) {
          lastIndex++;
          const e: WordEvent = { index: lastIndex, word: words[lastIndex].word, total };
          for (const cb of [...this.callbacks]) cb(e);
        }
      };

      const finish = (): void => {
        if (done) return;
        done = true;
        releaseMusic?.();
        timers.forEach(clearTimeout);
        intervals.forEach(clearInterval);
        timers.clear();
        intervals.clear();
        if (this.active === session) this.active = null;
        resolve();
      };

      const session: Session = {
        cancel: () => {
          if (!done && synth) {
            try {
              synth.cancel();
            } catch {
              // ignore
            }
          }
          finish();
        },
      };
      this.active = session;

      if (total === 0) {
        later(finish, 0);
        return;
      }

      /** 纯计时：每词 0.33 秒（?memfast=1 时更快） */
      const runTimerMode = (): void => {
        const per = (SECONDS_PER_WORD * 1000) / fastMultiplier / rateScale;
        for (let i = 0; i < total; i++) later(() => emit(i), i * per);
        later(() => {
          emit(total - 1);
          finish();
        }, total * per);
      };

      if (!synth || fastMultiplier > 1) {
        runTimerMode();
        return;
      }

      const tone = toneHint ?? detectTone(text);
      const chosen = pickVoice(synth, voice);
      const natural = chosen ? /natural|neural|premium|enhanced|siri|studio|wavenet|google/i.test(chosen.name) : false;
      const chunks = splitChunks(text);
      let chunkIndex = 0;
      let fellBack = false;
      let pausesTotal = 0;

      const fallbackToTimer = (): void => {
        if (fellBack || done) return;
        fellBack = true;
        try {
          synth.cancel();
        } catch {
          // ignore
        }
        runTimerMode();
      };

      const beginWatchers = (): void => {
        if (started || done) return;
        started = true;
        if (!done) releaseMusic = beginSpeech(speakerId);
        startedAt = performance.now();
        const perWord = (SECONDS_PER_WORD / (profile.rate * rateScale)) * 1000;
        // 没有 boundary 事件的声音：按时间推进词
        const iv = setInterval(() => {
          if (done || boundarySeen) return;
          const elapsed = performance.now() - startedAt;
          if (elapsed > 500) emit(Math.floor(elapsed / perWord));
        }, 120);
        intervals.add(iv);
        // onend 不来的保险（含各块之间的停顿）
        later(() => {
          if (done) return;
          try {
            synth.cancel();
          } catch {
            // ignore
          }
          emit(total - 1);
          finish();
        }, total * perWord * 2 + 4000 + pausesTotal + chunks.length * 400);
      };

      const speakChunk = (ci: number): void => {
        if (done) return;
        const chunk = chunks[ci];
        let utterance: SpeechSynthesisUtterance;
        try {
          utterance = new SpeechSynthesisUtterance(chunk.text.trim());
          const p = prosodyFor(chunk, ci, chunks.length, tone, { rate: profile.rate, pitch: profile.pitch }, natural);
          utterance.lang = "en-US";
          utterance.rate = p.rate * rateScale;
          utterance.pitch = p.pitch;
          utterance.volume = p.volume;
          if (chosen) {
            utterance.voice = chosen;
            utterance.lang = chosen.lang;
          }
          pausesTotal += p.pause;
          const leading = chunk.text.length - chunk.text.trimStart().length;
          utterance.onstart = () => beginWatchers();
          utterance.onboundary = (ev: SpeechSynthesisEvent) => {
            if (ev.name && ev.name !== "word") return;
            beginWatchers();
            boundarySeen = true;
            const globalChar = chunk.start + leading + ev.charIndex;
            let idx = 0;
            for (let i = 0; i < total; i++) {
              if (words[i].start <= globalChar) idx = i;
              else break;
            }
            emit(idx);
          };
          utterance.onend = () => {
            if (done) return;
            if (ci >= chunks.length - 1) {
              emit(total - 1);
              finish();
              return;
            }
            // 块与块之间的自然停顿：先把本块读到的词推进到位
            const nextStart = chunks[ci + 1].start;
            let upto = 0;
            for (let i = 0; i < total; i++) if (words[i].start < nextStart) upto = i;
            emit(upto);
            later(() => speakChunk(ci + 1), p.pause);
          };
          utterance.onerror = () => {
            if (done) return;
            if (started) finish();
            else fallbackToTimer();
          };
        } catch {
          runTimerMode();
          return;
        }
        try {
          if (ci === 0) synth.cancel(); // 清掉可能残留的队列（含 unlock 的静音句）
          synth.speak(utterance);
        } catch {
          runTimerMode();
        }
      };

      chunkIndex = 0;
      speakChunk(chunkIndex);

      // 被自动播放策略拦截时 onstart 永远不来：1.5 秒后确认引擎没有在读就降级
      later(() => {
        if (done || started) return;
        if (synth.speaking) {
          beginWatchers();
          return;
        }
        fallbackToTimer();
      }, START_TIMEOUT_MS);    });
  }
}
