import type { ContextSegment, Rw3Phase, WordEntry, WordInContext, ZoneDef } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { buildClozeItems } from "../learn/cloze";
import { quizFromUnitListening, quizFromUnitReading } from "../learn/quiz";
import { passageWithAllWords, pickLine, wordInText } from "./sceneUtils";

function toWordInContext(
  w: WordEntry,
  passage: string,
  slot: number
): WordInContext {
  let contextLine = pickLine(w, slot);
  if (passage) {
    const sentences = passage.split(/(?<=[.!?])\s+/);
    const hit = sentences.find((s) => wordInText(s, w.word));
    if (hit) contextLine = hit.trim();
  }
  return { id: w.id, word: w.word, pos: w.pos, meaning: w.meaning, contextLine };
}

function wordsInPassage(all: WordEntry[], passage: string, fallback: WordEntry[]): WordInContext[] {
  const inText = all.filter((w) => wordInText(passage, w.word));
  const pool = inText.length ? inText : fallback;
  return pool.map((w, i) => toWordInContext(w, passage, i));
}

function buildSectionSegments(title: string, passage: string, words: WordEntry[]): ContextSegment[] {
  const segs: ContextSegment[] = [{ type: "text", content: `${title}. ` }];
  if (passage) {
    segs.push(...passageWithAllWords(passage, words));
  }
  return segs;
}

/** 按教材结构构建读写3 完整单元学习管线 */
export function buildRw3Phases(
  _zone: ZoneDef,
  wordMap: Map<string, WordEntry>,
  unit: Rw3UnitContent | undefined,
  wordIds: string[]
): Rw3Phase[] {
  const allWords: WordEntry[] = [];
  for (const id of wordIds) {
    const w = wordMap.get(id);
    if (w) allWords.push(w);
  }
  if (!allWords.length || !unit) return [];

  const vocabMeta = unit.sections.vocabulary;
  const levelCount = vocabMeta?.level_count ?? 4;
  const perLevel = vocabMeta?.words_per_level ?? 5;

  const passageA = unit.sections.section_a?.passage?.trim() ?? unit.sections.reading?.passage?.trim() ?? "";
  const passageB = unit.sections.section_b?.passage?.trim() ?? "";
  const passageC = unit.sections.section_c?.passage?.trim() ?? "";
  const listenScript = unit.sections.listening?.script?.trim() ?? passageA;

  const phases: Rw3Phase[] = [];

  if (passageA) {
    const secWords = wordsInPassage(allWords, passageA, allWords);
    phases.push({
      kind: "section_a",
      label: "Section A",
      title: unit.sections.section_a?.title ?? "Section A",
      segments: buildSectionSegments(unit.sections.section_a?.title ?? "Section A", passageA, allWords),
      words: secWords,
    });
  }

  if (passageB) {
    const secWords = wordsInPassage(allWords, passageB, allWords.slice(0, 10));
    phases.push({
      kind: "section_b",
      label: "Section B",
      title: unit.sections.section_b?.title ?? "Section B",
      segments: buildSectionSegments(unit.sections.section_b?.title ?? "Section B", passageB, allWords),
      words: secWords,
    });
  }

  if (passageC) {
    const secWords = wordsInPassage(allWords, passageC, allWords.slice(10, 20));
    phases.push({
      kind: "section_c",
      label: "Section C",
      title: unit.sections.section_c?.title ?? "Stories of China",
      segments: buildSectionSegments(unit.sections.section_c?.title ?? "Stories of China", passageC, allWords),
      words: secWords,
    });
  }

  for (let lv = 0; lv < levelCount; lv++) {
    const slice = allWords.slice(lv * perLevel, (lv + 1) * perLevel);
    if (!slice.length) continue;
    phases.push({
      kind: "vocab",
      label: `词汇 Lv${lv + 1}`,
      level: lv + 1,
      totalLevels: levelCount,
      words: slice.map((w, i) => toWordInContext(w, passageA || listenScript, lv * perLevel + i)),
    });
  }

  const readingQs = quizFromUnitReading(unit);
  if (readingQs.length) {
    phases.push({
      kind: "reading_quiz",
      label: "阅读理解",
      title: unit.sections.reading?.title ?? "Reading Comprehension",
      questions: readingQs,
    });
  }

  const listeningQs = quizFromUnitListening(unit);
  if (listenScript) {
    const listenWords = allWords.filter((w) => wordInText(listenScript, w.word));
    const segs: ContextSegment[] = [
      { type: "text", content: `${unit.sections.listening?.title ?? "Listening"}. ` },
      ...(listenWords.length
        ? passageWithAllWords(listenScript, listenWords)
        : [{ type: "text" as const, content: listenScript }]),
    ];
    phases.push({
      kind: "listening",
      label: "听力理解",
      title: unit.sections.listening?.title ?? "Listening",
      script: listenScript,
      segments: segs,
      questions: listeningQs,
    });
  }

  const allInContext = allWords.map((w, i) => toWordInContext(w, passageA || listenScript, i));
  phases.push({
    kind: "cloze",
    label: "语境填空",
    items: buildClozeItems(allInContext),
  });

  const trans = unit.sections.translation?.sentences;
  if (trans?.length) {
    phases.push({
      kind: "translation",
      label: "翻译",
      sentences: trans.map((s) => ({
        zh: s.zh,
        enReference: s.en_reference,
        keywords: s.keywords ?? [],
      })),
    });
  }

  const writing = unit.sections.writing;
  if (writing?.prompt) {
    phases.push({
      kind: "writing",
      label: "写作",
      prompt: writing.prompt,
      outline: writing.outline ?? [],
    });
  }

  return phases;
}
