import type { ContextScene, ContextSegment, WordEntry } from "../../core/types";
import { philosophyLine, pickPhilosophy } from "../explore/philosophy";

const REVIEW_INTROS = [
  {
    en: "The Review Shrine gathers words that asked to return — not because you failed, but because memory is a conversation, not a vault.",
    zh: "复习圣殿收拢那些主动归来的词——不是因为失败，而是因为记忆是一场对话，不是仓库。",
  },
  {
    en: "Lin lights a single candle: \"What fades is not the word, but the attention you once lent it.\"",
    zh: "林点亮一支蜡烛：「褪色的不是词，而是你曾借给它的那份专注。」",
  },
  {
    en: "Today's queue is small on purpose. Science prefers many short retrievals over one long stare.",
    zh: "今天的队列故意很短。科学偏爱多次短提取，胜过一次长久盯视。",
  },
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pickLine(word: WordEntry, slot: number): string {
  if (word.example?.trim()) return word.example.trim();
  return philosophyLine(word.word, word.pos, slot);
}

function sentenceToSegments(sentence: string, word: WordEntry): ContextSegment[] {
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

const WEAK_INTROS = [
  {
    en: "The Weak Word Forge does not punish mistakes — it keeps the fire small enough that fragile memories can harden.",
    zh: "薄弱词熔炉不惩罚错误——它只把火生得足够小，让脆弱的记忆慢慢变硬。",
  },
  {
    en: "Chen says: \"A word you almost knew is closer to mastery than a word you never met twice.\"",
    zh: "陈说：「差一点记住的词，比从未重逢的词更接近掌握。」",
  },
];

type PracticeKind = "review" | "weak";

function buildPracticeScene(
  kind: PracticeKind,
  ids: string[],
  wordMap: Map<string, WordEntry>,
  batchSize: number
): ContextScene | null {
  const picked: WordEntry[] = [];
  for (const id of ids) {
    const w = wordMap.get(id);
    if (w) picked.push(w);
    if (picked.length >= batchSize) break;
  }
  if (picked.length === 0) return null;

  const introPool = kind === "review" ? REVIEW_INTROS : WEAK_INTROS;
  const intro = introPool[picked.length % introPool.length];
  const thought = pickPhilosophy(picked.length, kind === "review" ? 2 : 5);
  const contextLines = picked.map((w, i) => pickLine(w, i + (kind === "review" ? 40 : 80)));

  const segments: ContextSegment[] = [
    { type: "text", content: intro.en + " " },
    { type: "text", content: thought.en + " " },
  ];

  for (let i = 0; i < picked.length; i++) {
    segments.push(...sentenceToSegments(contextLines[i], picked[i]));
  }

  segments.push({
    type: "text",
    content:
      kind === "review"
        ? " Recall each glowing word before the answer appears — this is spaced retrieval, not repetition."
        : " These words stumbled last time. Give them context again before you judge yourself.",
  });

  return {
    levelId: kind === "review" ? "__review__" : "__weak__",
    title: kind === "review" ? "间隔复习 · 记忆圣殿" : "薄弱巩固 · 记忆熔炉",
    settingEn: kind === "review" ? "Shrine of Return" : "Forge of Return",
    chapter:
      kind === "review"
        ? `本轮 ${picked.length} 词 · SM-2 到期队列`
        : `本轮 ${picked.length} 词 · 上次回忆薄弱`,
    plotZh: `${intro.zh} ${thought.zh}`,
    philosophyZh: thought.zh,
    philosophyEn: thought.en,
    segments,
    words: picked.map((w, i) => ({
      id: w.id,
      word: w.word,
      pos: w.pos,
      meaning: w.meaning,
      contextLine: contextLines[i],
    })),
  };
}

/** 从到期词 ID 构建间隔复习场景 */
export function buildReviewScene(
  dueIds: string[],
  wordMap: Map<string, WordEntry>,
  batchSize = 12
): ContextScene | null {
  return buildPracticeScene("review", dueIds, wordMap, batchSize);
}

/** 从薄弱词 ID 构建巩固场景 */
export function buildWeakScene(
  weakIds: string[],
  wordMap: Map<string, WordEntry>,
  batchSize = 8
): ContextScene | null {
  return buildPracticeScene("weak", weakIds, wordMap, batchSize);
}
