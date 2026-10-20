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
  system: { rate: 0.92, pitch: 1.0, prefer: ["Samantha", "Aria", "Jenny", "Zira", "Google US English", "Karen", "Serena"] },
  young: { rate: 1.0, pitch: 1.08, prefer: ["Google US English", "Aaron", "Guy", "Ryan", "Alex", "Samantha"] },
  old: { rate: 0.88, pitch: 0.85, prefer: ["Daniel", "Google UK English Male", "Arthur", "David", "Alex", "Guy"] },
};

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
  for (const name of PROFILES[voice].prefer) {
    const hit = candidates.find((v) => v.name.includes(name));
    if (hit) return hit;
  }
  return candidates.find((v) => /^en[-_]us/i.test(v.lang)) ?? candidates[0];
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

  speak(text: string, voice: Voice = "system"): Promise<void> {
    this.cancel();
    const words = splitWords(text);
    const total = words.length;
    const profile = PROFILES[voice];
    const synth = getSynth();

    return new Promise<void>((resolve) => {
      let done = false;
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
        const per = (SECONDS_PER_WORD * 1000) / fastMultiplier;
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

      let utterance: SpeechSynthesisUtterance;
      try {
        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = profile.rate;
        utterance.pitch = profile.pitch;
        const v = pickVoice(synth, voice);
        if (v) {
          utterance.voice = v;
          utterance.lang = v.lang;
        }
      } catch {
        runTimerMode();
        return;
      }

      let fellBack = false;
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
        if (started) return;
        started = true;
        startedAt = performance.now();
        const perWord = (SECONDS_PER_WORD / profile.rate) * 1000;
        // 没有 boundary 事件的声音：按时间推进词
        const iv = setInterval(() => {
          if (done || boundarySeen) return;
          const elapsed = performance.now() - startedAt;
          if (elapsed > 500) emit(Math.floor(elapsed / perWord));
        }, 120);
        intervals.add(iv);
        // onend 不来的保险
        later(() => {
          if (done) return;
          try {
            synth.cancel();
          } catch {
            // ignore
          }
          emit(total - 1);
          finish();
        }, total * perWord * 2 + 4000);
      };

      utterance.onstart = () => beginWatchers();
      utterance.onboundary = (ev: SpeechSynthesisEvent) => {
        if (ev.name && ev.name !== "word") return;
        beginWatchers();
        boundarySeen = true;
        let idx = 0;
        for (let i = 0; i < total; i++) {
          if (words[i].start <= ev.charIndex) idx = i;
          else break;
        }
        emit(idx);
      };
      utterance.onend = () => {
        emit(total - 1);
        finish();
      };
      utterance.onerror = () => {
        if (done) return;
        if (started) finish();
        else fallbackToTimer();
      };

      try {
        synth.cancel(); // 清掉可能残留的队列（含 unlock 的静音句）
        synth.speak(utterance);
      } catch {
        runTimerMode();
        return;
      }

      // 被自动播放策略拦截时 onstart 永远不来：1.5 秒后确认引擎没有在读就降级
      later(() => {
        if (done || started) return;
        if (synth.speaking) {
          beginWatchers();
          return;
        }
        fallbackToTimer();
      }, START_TIMEOUT_MS);
    });
  }
}
