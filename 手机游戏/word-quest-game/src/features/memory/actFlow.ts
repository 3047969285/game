import type { WordEntry } from "../../core/types";
import { contentTokens } from "./acts";
import { hashSeed, normalizeToken, seededRandom } from "./text";
import { findWordToken, type ActPov, type ActQuestion, type MemoryAct } from "./types";

/**
 * 幕的状态机（纯函数）：
 *  - 第一人称的学习步骤：预习生词 → 跟读课文 → 课堂提问 → 记笔记 → 完成；
 *  - 三种视角的切换与进度：任一视角完成一幕即算看过，第三人称看完自动进入下一幕，切换不丢进度；
 *  - 手机干扰与专注度。
 */

// ───────────────────────── 第一人称的学习步骤 ─────────────────────────

export type LearnStep = "preview" | "read" | "ask" | "notes" | "done";

export interface LearnState {
  step: LearnStep;
  /** 本幕要预习的生词 id */
  words: readonly string[];
  /** 已经点过的生词 */
  tapped: readonly string[];
  /** 跟读一遍已经读完 */
  readDone: boolean;
  questionIndex: number;
  questionsTotal: number;
  /** 当前这道题已经选错的次数 */
  wrongAttempts: number;
  noteIndex: number;
  notesTotal: number;
}

export type LearnEvent =
  | { type: "tapWord"; wordId: string }
  | { type: "readFinished" }
  | { type: "answer"; correct: boolean }
  | { type: "noteDone" }
  | { type: "advance" };

/** 本幕的第一个有内容的步骤 */
function firstStep(s: Omit<LearnState, "step">): LearnStep {
  if (s.words.length > 0) return "preview";
  return "read";
}

export function initLearnState(act: Pick<MemoryAct, "wordIds" | "questions" | "notes">, notesDone = 0): LearnState {
  const base = {
    words: act.wordIds,
    tapped: [] as string[],
    readDone: false,
    questionIndex: 0,
    questionsTotal: act.questions.length,
    wrongAttempts: 0,
    noteIndex: Math.min(notesDone, act.notes.length),
    notesTotal: act.notes.length,
  };
  return { step: firstStep(base), ...base };
}

/** 读完之后的下一步：有题进提问，没题进笔记，都没有就完成 */
function afterRead(s: LearnState): LearnStep {
  if (s.questionIndex < s.questionsTotal) return "ask";
  return afterAsk(s);
}

function afterAsk(s: LearnState): LearnStep {
  return s.noteIndex < s.notesTotal ? "notes" : "done";
}

/**
 * 步骤推进。未完成不能跳：preview 要点完所有生词才能 advance；read 要读完一遍才能 advance；
 * ask 答对才前进（选错可以重试，次数记在 wrongAttempts）；notes 每完成一个任务前进一个。
 */
export function nextLearnStep(state: LearnState, event: LearnEvent): LearnState {
  switch (state.step) {
    case "preview":
      if (event.type === "tapWord") {
        if (!state.words.includes(event.wordId) || state.tapped.includes(event.wordId)) return state;
        return { ...state, tapped: [...state.tapped, event.wordId] };
      }
      if (event.type === "advance" && state.tapped.length >= state.words.length) return { ...state, step: "read" };
      return state;
    case "read":
      if (event.type === "readFinished") return { ...state, readDone: true };
      if (event.type === "advance" && state.readDone) return { ...state, step: afterRead(state) };
      return state;
    case "ask":
      if (event.type !== "answer") return state;
      if (!event.correct) return { ...state, wrongAttempts: state.wrongAttempts + 1 };
      {
        const questionIndex = state.questionIndex + 1;
        const next = { ...state, questionIndex, wrongAttempts: 0 };
        return questionIndex < state.questionsTotal ? next : { ...next, step: afterAsk(next) };
      }
    case "notes":
      if (event.type !== "noteDone") return state;
      {
        const noteIndex = state.noteIndex + 1;
        const next = { ...state, noteIndex };
        return noteIndex < state.notesTotal ? next : { ...next, step: "done" };
      }
    case "done":
      return state;
  }
}

export const LEARN_STEP_ORDER: readonly LearnStep[] = ["preview", "read", "ask", "notes", "done"];

// ───────────────────────── 视角切换与进度 ─────────────────────────

export interface ActProgress {
  /** 第三人称看完 */
  watched: boolean;
  /** 第一人称学完（预习 / 跟读 / 提问 / 笔记） */
  learned: boolean;
  /** 笔记本的任务做完（在第一人称或二维里做都算） */
  noted: boolean;
}

export interface FlowState {
  pov: ActPov;
  act: number;
  total: number;
  progress: ActProgress[];
  /** 全部幕走完 */
  finished: boolean;
}

export type FlowEvent =
  | { type: "switch"; pov: ActPov }
  /** 某个视角完成了当前幕 */
  | { type: "complete"; pov: ActPov }
  /** 玩家点了 “下一幕” */
  | { type: "next" };

export function initFlow(total: number, pov: ActPov = "watch"): FlowState {
  return { pov, act: 0, total, progress: Array.from({ length: total }, () => ({ watched: false, learned: false, noted: false })), finished: total === 0 };
}

/** 一幕在任一视角完成即算看过 */
export function actSeen(p: ActProgress): boolean {
  return p.watched || p.learned || p.noted;
}

/** 这一幕的笔记还空着（有笔记任务却没做） */
export function notesEmpty(p: ActProgress, act: Pick<MemoryAct, "notes">): boolean {
  return act.notes.length > 0 && !p.noted;
}

function advance(state: FlowState): FlowState {
  const act = state.act + 1;
  return act >= state.total ? { ...state, act: state.total - 1, finished: true } : { ...state, act };
}

export function flowReduce(state: FlowState, event: FlowEvent): FlowState {
  if (state.finished) return state;
  switch (event.type) {
    case "switch":
      return event.pov === state.pov ? state : { ...state, pov: event.pov };
    case "complete": {
      const progress = state.progress.map((p, i) => {
        if (i !== state.act) return p;
        if (event.pov === "watch") return { ...p, watched: true };
        if (event.pov === "me") return { ...p, learned: true, noted: true };
        return { ...p, noted: true };
      });
      const next = { ...state, progress };
      // 第三人称看完自动进入下一幕；第一人称 / 二维要玩家点 “下一幕”
      return event.pov === "watch" ? advance(next) : next;
    }
    case "next":
      return actSeen(state.progress[state.act]) ? advance(state) : state;
  }
}

// ───────────────────────── 手机干扰与专注度 ─────────────────────────

export const FOCUS_PENALTY = 0.2;

/** 专注度 0–1：每点开一次无关消息扣一点 */
export function focusScore(taps: number): number {
  return Math.max(0, Math.round((1 - taps * FOCUS_PENALTY) * 100) / 100);
}

/**
 * 手机通知亮起的时刻（相对本幕学习开始的毫秒数）：每幕 1–2 次，间隔足够长，不会连着响。
 * 同一 (种子, 幕) 永远相同。
 */
export function planDistractions(seed: string, actIndex: number): number[] {
  const rand = seededRandom(hashSeed(`${seed}:${actIndex}`));
  const first = 14000 + Math.floor(rand() * 16000);
  return rand() < 0.5 ? [first] : [first, first + 26000 + Math.floor(rand() * 12000)];
}

/** 本次回忆的平均专注度（没有任何幕的专注数据时为 1） */
export function averageFocus(scores: readonly number[]): number {
  if (scores.length === 0) return 1;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;
}

// ───────────────────────── 点词查义 / 相关句 ─────────────────────────

export interface GlossIndex {
  /** token 可以带标点。先查本单元词（含屈折形式），再查整本词表；查不到返回 null（只朗读，不给释义） */
  lookup(token: string): WordEntry | null;
}

/** 常见屈折形式 → 可能的原形 */
function baseForms(t: string): string[] {
  const out = [t];
  if (t.endsWith("ies")) out.push(t.slice(0, -3) + "y");
  if (t.endsWith("es")) out.push(t.slice(0, -2));
  if (t.endsWith("s")) out.push(t.slice(0, -1));
  if (t.endsWith("ed")) out.push(t.slice(0, -2), t.slice(0, -1));
  if (t.endsWith("ing")) out.push(t.slice(0, -3), t.slice(0, -3) + "e");
  if (t.endsWith("ly")) out.push(t.slice(0, -2));
  return out;
}

export function buildGlossIndex(unitWords: readonly WordEntry[], allWords: Iterable<WordEntry>): GlossIndex {
  const byWord = new Map<string, WordEntry>();
  for (const w of allWords) if (!byWord.has(w.word.toLowerCase())) byWord.set(w.word.toLowerCase(), w);
  return {
    lookup(token) {
      const t = normalizeToken(token);
      if (!t) return null;
      for (const w of unitWords) if (findWordToken(t, w.word)) return w;
      for (const form of baseForms(t)) {
        const hit = byWord.get(form);
        if (hit) return hit;
      }
      return null;
    },
  };
}

/** 最相关的课文句子（序号）：用来在答错时让讲义上那一句闪一下 */
export function relatedSentences(act: Pick<MemoryAct, "sentences">, q: ActQuestion): number[] {
  const tokens = new Set([...contentTokens(q.question), ...contentTokens(q.options[q.answer] ?? ""), ...contentTokens(q.explanation)]);
  let best = -1;
  let bestScore = 0;
  act.sentences.forEach((s, i) => {
    const set = new Set(contentTokens(s));
    let score = 0;
    for (const t of tokens) if (set.has(t)) score++;
    if (score > bestScore) {
      best = i;
      bestScore = score;
    }
  });
  return best >= 0 ? [best] : [];
}
