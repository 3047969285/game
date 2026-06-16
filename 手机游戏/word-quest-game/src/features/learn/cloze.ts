import type { ClozeItem, WordInContext } from "../../core/types";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 生成语境填空题（释义四选一，干扰项来自同幕其他词） */
export function buildClozeItems(words: WordInContext[]): ClozeItem[] {
  const meanings = words.map((w) => w.meaning);
  return shuffle(
    words.map((w) => {
      const blanked = w.contextLine.replace(new RegExp(`\\b(${escapeRegExp(w.word)})\\b`, "i"), "_____");
      const pool = meanings.filter((m) => m !== w.meaning);
      const distractors = shuffle(pool).slice(0, 3);
      while (distractors.length < 3) distractors.push("（干扰项）");
      return {
        wordId: w.id,
        word: w.word,
        sentence: blanked,
        choices: shuffle([w.meaning, ...distractors.slice(0, 3)]),
        answer: w.meaning,
      };
    })
  );
}
