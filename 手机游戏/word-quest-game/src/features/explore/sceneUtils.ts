import type { ContextSegment, WordEntry } from "../../core/types";
import { philosophyLine } from "./philosophy";

export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 生成带词汇的语境句 */
export function pickLine(word: WordEntry, slot: number): string {
  if (word.example?.trim()) return word.example.trim();
  return philosophyLine(word.word, word.pos, slot);
}

export function wordInText(text: string, word: string): boolean {
  return new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").test(text);
}

export function sentenceToSegments(sentence: string, word: WordEntry): ContextSegment[] {
  const re = new RegExp(`\\b(${escapeRegExp(word.word)})\\b`, "i");
  const match = sentence.match(re);
  if (!match || match.index === undefined) {
    return [
      { type: "text", content: sentence + " " },
      { type: "word", content: word.word, wordId: word.id },
      { type: "text", content: ". " },
    ];
  }
  const before = sentence.slice(0, match.index);
  const after = sentence.slice(match.index + match[0].length);
  const segments: ContextSegment[] = [];
  if (before) segments.push({ type: "text", content: before });
  segments.push({ type: "word", content: match[0], wordId: word.id });
  if (after) segments.push({ type: "text", content: after + " " });
  return segments;
}

/** 在段落中按词频优先选取 */
export function pickWords(words: WordEntry[], count: number): WordEntry[] {
  const sorted = [...words].sort((a, b) => a.id.localeCompare(b.id));
  const step = Math.max(1, Math.floor(sorted.length / count));
  const picked: WordEntry[] = [];
  for (let i = 0; i < sorted.length && picked.length < count; i += step) picked.push(sorted[i]);
  let idx = 0;
  while (picked.length < count && idx < sorted.length) {
    if (!picked.includes(sorted[idx])) picked.push(sorted[idx]);
    idx += 1;
  }
  return picked.slice(0, count);
}

/** 优先选取出现在原文中的词 */
export function pickWordsFromText(words: WordEntry[], text: string, count: number): WordEntry[] {
  const inText = words.filter((w) => wordInText(text, w.word));
  const pool = inText.length >= Math.min(count, words.length) ? inText : words;
  return pickWords(pool, Math.min(count, pool.length));
}

/** 在整段课文中嵌入全部目标词（按出现顺序） */
export function passageWithAllWords(passage: string, words: WordEntry[]): ContextSegment[] {
  const inPassage = words.filter((w) => wordInText(passage, w.word));
  const sorted = [...inPassage].sort((a, b) => {
    const ia = passage.search(new RegExp(`\\b${escapeRegExp(a.word)}\\b`, "i"));
    const ib = passage.search(new RegExp(`\\b${escapeRegExp(b.word)}\\b`, "i"));
    return ia - ib;
  });

  let rest = passage;
  const segments: ContextSegment[] = [];
  const covered = new Set<string>();

  for (const w of sorted) {
    const re = new RegExp(`(\\b${escapeRegExp(w.word)}\\b)`, "i");
    const m = rest.match(re);
    if (!m || m.index === undefined) continue;
    if (m.index > 0) segments.push({ type: "text", content: rest.slice(0, m.index) });
    segments.push({ type: "word", content: m[1], wordId: w.id });
    rest = rest.slice(m.index + m[0].length);
    covered.add(w.id);
  }

  if (rest.trim()) segments.push({ type: "text", content: rest });

  const missing = words.filter((w) => !covered.has(w.id));
  if (missing.length) {
    segments.push({ type: "text", content: " " });
    for (const w of missing) {
      segments.push(...sentenceToSegments(pickLine(w, 0), w));
    }
  }

  return segments;
}

/** 将多句原文拆成可点击词的分段 */
export function passageToSegments(passage: string, picked: WordEntry[]): ContextSegment[] {
  const sentences = passage.split(/(?<=[.!?])\s+/).filter(Boolean);
  const segments: ContextSegment[] = [];
  const covered = new Set<string>();

  for (const sentence of sentences) {
    const hit = picked.find((w) => !covered.has(w.id) && wordInText(sentence, w.word));
    if (hit) {
      segments.push(...sentenceToSegments(sentence, hit));
      covered.add(hit.id);
    } else {
      segments.push({ type: "text", content: sentence + " " });
    }
  }

  for (const w of picked) {
    if (!covered.has(w.id)) {
      segments.push(...sentenceToSegments(pickLine(w, 0), w));
    }
  }

  return segments;
}
