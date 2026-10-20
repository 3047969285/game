import type { WordEntry } from "../../core/types";
import type { Rw3QuizRaw, Rw3UnitContent } from "../../infra/data";
import type { SectionKey } from "./ids";
import { hashSeed, seededRandom, sentenceHasWord, splitSentences } from "./text";
import { findWordToken, type ActQuestion, type MemoryAct, type NoteTask, type OutlineChoice } from "./types";

/**
 * 回忆的 “幕”：一篇课文按段落切成若干幕（纯函数，不依赖 three / DOM）。
 *  - 三种视角（他 / 我 / 纸）看的是同一幕的不同内容，进度共享；
 *  - 课文的每一句都落在某一幕里，顺序不变；
 *  - 本段的理解题、翻译、写作全部分配进幕里（题目按它考的那一段课文，翻译按关键词，写作放最后一幕）；
 *  - passageOverride：导入的教材原文替换练习原文；配套理解题 / 翻译 / 写作不用于导入文本，避免内容错配。
 */

export const ACT_MIN = 3;
export const ACT_MAX = 6;
const ACT_TARGET = 4;

/** 这些词开头的句子紧跟着上一句（代词 / 承接词），尽量不要在它前面切幕 */
const CONNECTOR = /^(?:That|This|These|Those|Their|Its|It|They|He|She|His|Her|However|Therefore|Then|Also|Yet|But|And|So|Still|Instead|Meanwhile|Later|Thus|Hence|Both|Such)\b/;

const STOP = new Set(
  "about above after again also among because been before being between both could does doing during each from have having here into just like many more most much must only other over same should some such than that their them then there these they this those through under until very were what when where which while will with would your".split(" ")
);

/** 按段落标记（空行）切开课文，返回句子和每个段落第一句的序号 */
export function parsePassage(passage: string): { sentences: string[]; paragraphStarts: number[] } {
  const sentences: string[] = [];
  const paragraphStarts: number[] = [];
  for (const para of passage.split(/\n\s*\n/)) {
    const list = splitSentences(para);
    if (list.length === 0) continue;
    paragraphStarts.push(sentences.length);
    sentences.push(...list);
  }
  return { sentences, paragraphStarts };
}

/**
 * 幕的起点（句序）。段落优先；太短（< 3 句）的段落并进下一段，太长（> 6 句）的段落均匀切开，
 * 切口避开以代词 / 承接词开头的句子（尽量不拆开句意）。没有段落标记时每幕约 4 句。
 */
export function planActStarts(sentences: readonly string[], paragraphStarts: readonly number[] = [0]): number[] {
  const n = sentences.length;
  if (n === 0) return [];
  const heads = [...new Set([0, ...paragraphStarts.filter((i) => i > 0 && i < n)])].sort((a, b) => a - b);
  let ranges: Array<[number, number]> = heads.map((s, i) => [s, heads[i + 1] ?? n]);
  const merged: Array<[number, number]> = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && last[1] - last[0] < ACT_MIN) last[1] = r[1];
    else merged.push([r[0], r[1]]);
  }
  if (merged.length > 1) {
    const tail = merged[merged.length - 1];
    if (tail[1] - tail[0] < ACT_MIN) {
      merged.pop();
      merged[merged.length - 1][1] = tail[1];
    }
  }
  ranges = merged;

  const starts: number[] = [];
  for (const [s, e] of ranges) {
    const size = e - s;
    let k = size <= ACT_MAX ? 1 : Math.max(2, Math.round(size / ACT_TARGET));
    k = Math.max(k, Math.ceil(size / ACT_MAX));
    k = Math.max(1, Math.min(k, Math.floor(size / ACT_MIN)));
    const cuts: number[] = [];
    for (let j = 0; j <= k; j++) cuts.push(s + Math.round((j * size) / k));
    for (let j = 1; j < k; j++) {
      const ideal = cuts[j];
      const ok = (c: number): boolean => c - cuts[j - 1] >= ACT_MIN && c - cuts[j - 1] <= ACT_MAX && cuts[j + 1] - c >= ACT_MIN && cuts[j + 1] - c <= ACT_MAX;
      const pool = [ideal, ideal - 1, ideal + 1].filter(ok);
      let best = ideal;
      let bestPenalty = Infinity;
      for (const c of pool) {
        const penalty = CONNECTOR.test(sentences[c] ?? "") ? 1 : 0;
        if (penalty < bestPenalty) {
          best = c;
          bestPenalty = penalty;
        }
      }
      cuts[j] = best;
    }
    starts.push(...cuts.slice(0, k));
  }
  return starts;
}

// ───────────────────────── 题目分配 ─────────────────────────

function stem(t: string): string {
  return t.length > 5 ? t.replace(/(?:ing|ed|es|s|ly)$/, "") : t;
}

/** 文本里的实词（小写、去掉虚词和短词、粗略去词尾） */
export function contentTokens(text: string): string[] {
  const out: string[] = [];
  for (const m of text.toLowerCase().matchAll(/[a-z]{4,}/g)) if (!STOP.has(m[0])) out.push(stem(m[0]));
  return out;
}

/** 每幕的 token 集合与 df */
function actIndex(acts: readonly MemoryAct[]): { sets: Array<Set<string>>; weight: Map<string, number> } {
  const sets = acts.map((a) => new Set(contentTokens(a.sentences.join(" "))));
  const df = new Map<string, number>();
  for (const set of sets) for (const t of set) df.set(t, (df.get(t) ?? 0) + 1);
  const weight = new Map<string, number>();
  for (const [t, c] of df) weight.set(t, 1 / c);
  return { sets, weight };
}

/** 一段文本对每一幕的相关度 */
function relevance(index: ReturnType<typeof actIndex>, parts: Array<{ text: string; w: number }>): number[] {
  const scores = index.sets.map(() => 0);
  for (const part of parts) {
    const tokens = new Set(contentTokens(part.text));
    index.sets.forEach((set, i) => {
      for (const t of tokens) if (set.has(t)) scores[i] += part.w * (index.weight.get(t) ?? 0);
    });
  }
  return scores;
}

/** 贪心分配：得分高的先挑最合适且没满的幕；cap 是每幕的上限 */
function assignGreedy(scores: number[][], actCount: number, cap: number): number[] {
  const order = scores.map((s, i) => ({ i, best: Math.max(...s) })).sort((a, b) => b.best - a.best || a.i - b.i);
  const load = new Array<number>(actCount).fill(0);
  const result = new Array<number>(scores.length).fill(0);
  for (const { i } of order) {
    const ranked = scores[i].map((s, a) => ({ a, s })).sort((x, y) => y.s - x.s || x.a - y.a);
    const pick = ranked.find((r) => load[r.a] < cap) ?? ranked[0];
    result[i] = pick.a;
    load[pick.a]++;
  }
  return result;
}

function toQuestion(q: Rw3QuizRaw): ActQuestion {
  return { question: q.question, options: [...q.options], answer: q.answer, explanation: q.explanation ?? "" };
}

/**
 * 在 “题目按课文顺序出” 的前提下，给一串题目挑幕：幕序号单调不减，总得分最高；
 * 同一幕里连续放的题越多，扣分越重（避免题目堆在一幕）。返回每道题的幕序号。
 */
export function monotoneAssign(scores: readonly number[][], actCount: number): number[] {
  const n = scores.length;
  if (n === 0) return [];
  const mean = scores.reduce((sum, s) => sum + Math.max(...s), 0) / n;
  const lambda = 0.8 * mean + 0.05;
  const RUN = 4;
  const NEG = -1e9;
  // dp[i][a][r]：第 i 题放在幕 a、且它所在的连续一段已经有 r 题时的最高总分
  const dp = scores.map(() => Array.from({ length: actCount }, () => new Array<number>(RUN + 1).fill(NEG)));
  const from = scores.map(() => Array.from({ length: actCount }, () => new Array<[number, number] | null>(RUN + 1).fill(null)));
  for (let a = 0; a < actCount; a++) dp[0][a][1] = scores[0][a];
  for (let i = 1; i < n; i++) {
    for (let a = 0; a < actCount; a++) {
      for (let pa = 0; pa <= a; pa++) {
        for (let pr = 1; pr <= RUN; pr++) {
          const prev = dp[i - 1][pa][pr];
          if (prev <= NEG / 2) continue;
          const r = pa === a ? Math.min(RUN, pr + 1) : 1;
          const value = prev + scores[i][a] - (r > 1 ? lambda * (r - 1) : 0);
          if (value > dp[i][a][r]) {
            dp[i][a][r] = value;
            from[i][a][r] = [pa, pr];
          }
        }
      }
    }
  }
  let best = NEG;
  let cur: [number, number] = [0, 1];
  for (let a = 0; a < actCount; a++) for (let r = 1; r <= RUN; r++) if (dp[n - 1][a][r] > best) {
    best = dp[n - 1][a][r];
    cur = [a, r];
  }
  const result = new Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    result[i] = cur[0];
    const prev = from[i][cur[0]][cur[1]];
    if (!prev) break;
    cur = prev;
  }
  return result;
}

/** 把题目按它考的那一段课文分配到幕里（每个列表内部保持课文顺序）。同一幕里保持原顺序 */
export function assignQuestions(acts: MemoryAct[], lists: readonly (readonly ActQuestion[])[]): void {
  if (acts.length === 0) return;
  const index = actIndex(acts);
  const placed: Array<{ q: ActQuestion; act: number; order: number }> = [];
  let order = 0;
  for (const list of lists) {
    const scores = list.map((q, i) => {
      const correct = q.options[q.answer] ?? "";
      const others = q.options.filter((_, k) => k !== q.answer).join(" ");
      const s = relevance(index, [
        { text: q.question, w: 1.5 },
        { text: correct, w: 1.5 },
        { text: q.explanation, w: 1 },
        { text: others, w: 0.15 },
      ]);
      // 位置先验：题目大体按课文顺序出，得分接近时倾向于顺序对应的幕
      const expected = ((i + 0.5) / list.length) * acts.length;
      return s.map((v, a) => v + 0.25 * Math.max(0, 1 - Math.abs(a + 0.5 - expected) / acts.length));
    });
    const picks = monotoneAssign(scores, acts.length);
    list.forEach((q, i) => placed.push({ q, act: picks[i], order: order++ }));
  }
  for (const p of placed) acts[p.act].questions.push(p.q);
  for (const act of acts) act.questions.sort((a, b) => (placed.find((p) => p.q === a)?.order ?? 0) - (placed.find((p) => p.q === b)?.order ?? 0));
}

// ───────────────────────── 笔记任务 ─────────────────────────

function pick<T>(list: readonly T[], rand: () => number, n: number): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

const wordCount = (s: string): number => s.split(/\s+/).filter(Boolean).length;

/** 挖空的占位 */
export const BLANK = "____";

function fillFromSentence(sentence: string, token: { index: number; length: number; text: string }): string {
  return sentence.slice(0, token.index) + BLANK + sentence.slice(token.index + token.length);
}

/** 本幕的填词笔记：优先挖单元词，本幕没有单元词时挖一个较长的实词 */
export function buildFillTask(act: MemoryAct, words: readonly WordEntry[], passageSentences: readonly string[], rand: () => number): NoteTask | null {
  const candidates: Array<{ sentence: string; word: WordEntry; token: { index: number; length: number; text: string } }> = [];
  for (const sentence of act.sentences) {
    if (wordCount(sentence) > 30) continue;
    for (const word of words) {
      const token = findWordToken(sentence, word.word);
      if (token) candidates.push({ sentence, word, token });
    }
  }
  if (candidates.length > 0) {
    const chosen = pick(candidates, rand, 1)[0];
    const inSentence = (w: WordEntry): boolean => sentenceHasWord(chosen.sentence, w.word);
    const rest = words.filter((w) => w.id !== chosen.word.id && !inSentence(w));
    const samePos = pick(rest.filter((w) => w.pos === chosen.word.pos), rand, 3);
    const decoys = [...samePos, ...pick(rest.filter((w) => !samePos.includes(w)), rand, 3 - samePos.length)].map((w) => w.word);
    return { kind: "fill", line: fillFromSentence(chosen.sentence, chosen.token), answers: [chosen.token.text], wordIds: [chosen.word.id], decoys };
  }
  // 本幕没有单元词：挖一个较长的实词，干扰词取自整篇课文里的其它实词
  const plain: Array<{ sentence: string; token: { index: number; length: number; text: string } }> = [];
  for (const sentence of act.sentences) {
    if (wordCount(sentence) > 30) continue;
    for (const m of sentence.matchAll(/[A-Za-z]{6,}/g)) {
      if ((m.index ?? 0) === 0 || STOP.has(m[0].toLowerCase())) continue;
      plain.push({ sentence, token: { index: m.index ?? 0, length: m[0].length, text: m[0] } });
    }
  }
  if (plain.length === 0) return null;
  const chosen = pick(plain, rand, 1)[0];
  const pool = new Set<string>();
  for (const s of passageSentences) {
    if (s === chosen.sentence) continue;
    for (const m of s.matchAll(/[A-Za-z]{6,}/g)) if (!STOP.has(m[0].toLowerCase()) && m[0].toLowerCase() !== chosen.token.text.toLowerCase()) pool.add(m[0].toLowerCase());
  }
  const decoys = pick([...pool].filter((w) => !sentenceHasWord(chosen.sentence, w)), rand, 3);
  return { kind: "fill", line: fillFromSentence(chosen.sentence, chosen.token), answers: [chosen.token.text], wordIds: [], decoys };
}

/** 写作提纲每个要点的选词：要点里出现的单元词，没有就用题干里的，再没有就用本篇课文里最常出现的 */
export function buildOutlineChoices(points: readonly string[], prompt: string, words: readonly WordEntry[], passage: string, rand: () => number): OutlineChoice[] {
  const inPassage = words
    .map((w) => ({ w, n: (passage.match(new RegExp(`\\b${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "gi")) ?? []).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((x) => x.w);
  return points.map((point) => {
    let accepted = words.filter((w) => sentenceHasWord(point, w.word));
    if (accepted.length === 0) accepted = words.filter((w) => sentenceHasWord(prompt, w.word));
    if (accepted.length === 0) accepted = inPassage.slice(0, 1);
    if (accepted.length === 0) accepted = words.slice(0, 1);
    const shown = accepted.slice(0, 2);
    const taken = new Set(accepted.map((w) => w.id));
    // 干扰词：不能出现在要点 / 题干里，也不是任何可接受的答案
    const pool = words.filter((w) => !taken.has(w.id) && !sentenceHasWord(point, w.word) && !sentenceHasWord(prompt, w.word));
    const decoys = pick(pool, rand, 3).map((w) => w.word);
    const answers = shown.map((w) => {
      const token = findWordToken(point, w.word) ?? findWordToken(prompt, w.word);
      return token ? token.text : w.word;
    });
    return { answers: [...new Set(answers)], wordIds: shown.map((w) => w.id), decoys };
  });
}

/** 翻译题干里去掉 “请将下列句子译为英文：” */
export function zhPrompt(zh: string): string {
  return zh.replace(/^\s*请将下列句子译为英文\s*[：:]\s*/, "").trim();
}

// ───────────────────────── 构建 ─────────────────────────

/** 单元词在句子里出现的顺序（按首次出现） */
function wordsInOrder(sentences: readonly string[], words: readonly WordEntry[]): string[] {
  const seen: string[] = [];
  for (const s of sentences) for (const w of words) if (!seen.includes(w.id) && sentenceHasWord(s, w.word)) seen.push(w.id);
  return seen;
}

export function buildActs(unit: Rw3UnitContent, words: readonly WordEntry[], section: SectionKey, passageOverride?: string): MemoryAct[] {
  const importedPassage = Boolean(passageOverride?.trim());
  const passage = importedPassage ? passageOverride!.trim() : (unit.sections[section]?.passage ?? "");
  const { sentences, paragraphStarts } = parsePassage(passage);
  const starts = planActStarts(sentences, paragraphStarts);
  const acts: MemoryAct[] = starts.map((start, i) => {
    const mine = sentences.slice(start, starts[i + 1] ?? sentences.length);
    return { index: i, sentences: mine, start, wordIds: wordsInOrder(mine, words), questions: [], notes: [] };
  });
  if (acts.length === 0) return acts;
  const rand = seededRandom(hashSeed(`${unit.unit_id}:${section}:acts`));

  if (!importedPassage) {
    // 本地练习文本的理解题：micro_world_checks，section_a 再加 reading.questions。
    const lists: ActQuestion[][] = [(unit.micro_world_checks?.[section] ?? []).map(toQuestion)];
    if (section === "section_a") lists.push((unit.sections.reading?.questions ?? []).map(toQuestion));
    assignQuestions(acts, lists.filter((l) => l.length > 0));
  }

  // 游戏自带的翻译与写作练习不一定对应用户导入原文，因此只用于本地练习文本。
  const translations = importedPassage ? [] : (unit.sections.translation?.sentences ?? []);
  if (translations.length > 0) {
    const index = actIndex(acts);
    const scores = translations.map((t) => relevance(index, [{ text: (t.keywords ?? []).join(" "), w: 2 }, { text: t.en_reference, w: 1 }]));
    const picks = assignGreedy(scores, acts.length, Math.max(1, Math.ceil(translations.length / acts.length)));
    const placed = acts.map<NoteTask[]>(() => []);
    translations.forEach((t, i) => placed[picks[i]].push({ kind: "translate", zh: zhPrompt(t.zh), en: t.en_reference, keywords: [...(t.keywords ?? [])] }));
    acts.forEach((a, i) => a.notes.push(...placed[i]));
  }

  // 每幕一个填词笔记（放在翻译前面），最后一幕放写作
  for (const act of acts) {
    const fill = buildFillTask(act, words, sentences, rand);
    if (fill) act.notes.unshift(fill);
  }
  const writing = importedPassage ? undefined : unit.sections.writing;
  if (writing?.outline?.length) {
    const prompt = writing.prompt ?? "";
    acts[acts.length - 1].notes.push({ kind: "outline", prompt, points: [...writing.outline], choices: buildOutlineChoices(writing.outline, prompt, words, passage, rand) });
  }
  return acts;
}
