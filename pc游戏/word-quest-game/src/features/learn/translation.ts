import type { TranslationSentence } from "../../core/types";

/** 翻译自检：命中足够关键词即视为达标（游戏化轻量校验） */
export function checkTranslation(input: string, sentence: TranslationSentence): {
  ok: boolean;
  matched: string[];
  missing: string[];
} {
  const text = input.trim().toLowerCase();
  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of sentence.keywords) {
    if (text.includes(kw.toLowerCase())) matched.push(kw);
    else missing.push(kw);
  }

  const need = Math.min(2, sentence.keywords.length);
  const ok = matched.length >= need && text.length >= 12;
  return { ok, matched, missing };
}
