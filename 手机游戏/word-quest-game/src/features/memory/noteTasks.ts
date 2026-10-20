import { hashSeed, seededRandom } from "./text";
import type { NoteTask, OutlineChoice } from "./types";

/**
 * 笔记本任务的词块与判定（纯函数）：
 *  - translate：词块 = 参考译文切成的词块（关键词作为一块）+ 2–3 个干扰词；按顺序拼出整句；
 *  - fill：课文原句挖空，从词块里选（答案 + 干扰词）；
 *  - outline：每个写作要点选一个最合适的本单元词。
 */

export interface Tile {
  id: string;
  text: string;
  /** 干扰词块（参考译文里没有） */
  decoy: boolean;
  /** 关键词块（题目给出的关键词，UI 上用荧光笔标出） */
  keyword?: boolean;
}

/** 忽略大小写与标点的规范形式 */
export function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const FUNCTION_WORDS = new Set(
  "a an the of to in on at for and but or as with by from into onto about not our their its his her your my we us it that this these those is are was were be been can may might will would should could do does did have has had".split(" ")
);

/**
 * 把参考译文切成词块：关键词（可含多个词）合成一块；虚词和后面的实词合成一块（最多 3 个词），
 * 这样一句 25 个词的译文只有十来块。标点跟着前面的词。
 */
export function chunkSentence(sentence: string, keywords: readonly string[] = []): Array<{ text: string; keyword: boolean }> {
  const tokens = sentence.split(/\s+/).filter(Boolean);
  const norm = tokens.map((t) => normalizeText(t));
  const kw = keywords.map((k) => normalizeText(k).split(" ").filter(Boolean)).filter((k) => k.length > 0).sort((a, b) => b.length - a.length);
  const chunks: Array<{ text: string; keyword: boolean }> = [];
  let i = 0;
  while (i < tokens.length) {
    const hit = kw.find((k) => k.every((w, j) => norm[i + j] === w));
    if (hit) {
      chunks.push({ text: tokens.slice(i, i + hit.length).join(" "), keyword: true });
      i += hit.length;
      continue;
    }
    let j = i;
    const parts: string[] = [];
    while (j < tokens.length && parts.length < 3) {
      parts.push(tokens[j]);
      const isFn = FUNCTION_WORDS.has(norm[j]);
      j++;
      if (!isFn) break;
      // 下一个词是关键词的开头时不要吞进来
      if (kw.some((k) => k.every((w, x) => norm[j + x] === w))) break;
    }
    chunks.push({ text: parts.join(" "), keyword: false });
    i = j;
  }
  return chunks;
}

function shuffle<T>(list: readonly T[], rand: () => number): T[] {
  const out = [...list];
  for (let k = out.length - 1; k > 0; k--) {
    const j = Math.floor(rand() * (k + 1));
    [out[k], out[j]] = [out[j], out[k]];
  }
  return out;
}

export interface TranslateTiles {
  tiles: Tile[];
  /** 正确顺序的词块 id */
  solution: string[];
}

/**
 * 翻译题的词块。distractorPool 是候选干扰词（本单元词的原形等），
 * 会排除参考译文里已有的词（避免出现 “也说得通” 的歧义）。
 */
export function buildTranslateTiles(task: Extract<NoteTask, { kind: "translate" }>, distractorPool: readonly string[], seed = task.en): TranslateTiles {
  const rand = seededRandom(hashSeed(seed));
  const chunks = chunkSentence(task.en, task.keywords);
  const tiles: Tile[] = chunks.map((c, i) => ({ id: `t${i}`, text: c.text, decoy: false, keyword: c.keyword }));
  const solution = tiles.map((t) => t.id);
  const used = new Set(normalizeText(task.en).split(" "));
  const pool = shuffle(
    [...new Set(distractorPool.map((w) => w.trim()).filter(Boolean))].filter((w) => !normalizeText(w).split(" ").some((x) => used.has(x))),
    rand
  );
  const count = tiles.length > 9 ? 3 : 2;
  pool.slice(0, count).forEach((text, i) => tiles.push({ id: `d${i}`, text, decoy: true }));
  return { tiles: shuffle(tiles, rand), solution };
}

/** 玩家按顺序放进去的词块文字拼成的句子是否等于参考译文 */
export function checkTranslate(task: Extract<NoteTask, { kind: "translate" }>, placed: readonly string[]): boolean {
  return normalizeText(placed.join(" ")) === normalizeText(task.en);
}

/** 填词：词块 = 答案 + 干扰词（打乱） */
export function fillTiles(task: Extract<NoteTask, { kind: "fill" }>): Tile[] {
  const rand = seededRandom(hashSeed(task.line));
  const tiles: Tile[] = [
    ...task.answers.map((text, i) => ({ id: `a${i}`, text, decoy: false })),
    ...task.decoys.map((text, i) => ({ id: `d${i}`, text, decoy: true })),
  ];
  return shuffle(tiles, rand);
}

/** 第 slot 个空填 given 对不对（忽略大小写） */
export function checkFill(task: Extract<NoteTask, { kind: "fill" }>, slot: number, given: string): boolean {
  const want = task.answers[slot];
  return want !== undefined && want.toLowerCase() === given.toLowerCase();
}

/** 写作提纲：第 point 个要点的词块 */
export function outlineTiles(choice: OutlineChoice, seed: string): Tile[] {
  const rand = seededRandom(hashSeed(seed));
  return shuffle(
    [...choice.answers.map((text, i) => ({ id: `a${i}`, text, decoy: false })), ...choice.decoys.map((text, i) => ({ id: `d${i}`, text, decoy: true }))],
    rand
  );
}

export function checkOutline(choice: OutlineChoice, given: string): boolean {
  return choice.answers.some((a) => a.toLowerCase() === given.toLowerCase());
}

/** 笔记任务的一句话说明（底部提示用） */
export function noteTitle(task: NoteTask): string {
  switch (task.kind) {
    case "translate":
      return "Translate it";
    case "fill":
      return "Fill the gap";
    case "outline":
      return "Plan your writing";
  }
}
