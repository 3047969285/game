import type { ContextScene, ContextSegment, WordEntry, ZoneDef } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { buildRw3Phases } from "./rw3Phases";
import { pickPhilosophy } from "./philosophy";
import { passageWithAllWords, pickLine, sentenceToSegments, wordInText } from "./sceneUtils";

function contextLineFor(word: WordEntry, passage: string, slot: number): string {
  if (passage) {
    const sentences = passage.split(/(?<=[.!?])\s+/);
    const hit = sentences.find((s) => wordInText(s, word.word));
    if (hit) return hit.trim();
  }
  return pickLine(word, slot);
}

/** 读写3：一单元一幕，全文 + 本单元全部词汇 */
export function buildRw3UnitScene(
  zone: ZoneDef,
  wordMap: Map<string, WordEntry>,
  unit: Rw3UnitContent | undefined,
  wordIds: string[],
  unitIndex = 0
): ContextScene | null {
  const words: WordEntry[] = [];
  for (const id of wordIds) {
    const w = wordMap.get(id);
    if (w) words.push(w);
  }
  if (words.length === 0) return null;

  const passage = unit?.sections.reading?.passage?.trim() ?? "";
  const listenScript = unit?.sections.listening?.script?.trim() ?? "";
  const thought = pickPhilosophy(unitIndex, zone.order ?? unitIndex);
  const unitZh = unit?.title_zh ?? zone.name;
  const unitEn = unit?.title ?? zone.name_en;

  const secA = unit?.sections.section_a?.title;
  const secB = unit?.sections.section_b?.title;
  const secC = unit?.sections.section_c?.title;
  const sectionLine = [secA, secB, secC].filter(Boolean).join(" · ");

  const segments: ContextSegment[] = [
    { type: "text", content: `Unit ${unitIndex + 1} — ${unitEn} ` },
    { type: "text", content: `主题：${unit?.theme ?? "reading & writing"}。` },
  ];
  if (sectionLine) {
    segments.push({ type: "text", content: ` 教材结构：${sectionLine}。 ` });
  }
  segments.push({ type: "text", content: thought.en + " " });

  if (unit?.sections.reading?.title) {
    segments.push({
      type: "text",
      content: ` Reading: ${unit.sections.reading.title}. `,
    });
  }

  if (passage) {
    segments.push(...passageWithAllWords(passage, words));
  } else {
    for (const w of words) {
      segments.push(...sentenceToSegments(pickLine(w, unitIndex), w));
    }
  }

  if (listenScript && listenScript !== passage) {
    segments.push({ type: "text", content: " Listening script: " });
    const listenWords = words.filter((w) => wordInText(listenScript, w.word));
    if (listenWords.length) {
      segments.push(...passageWithAllWords(listenScript, listenWords));
    } else {
      segments.push({ type: "text", content: listenScript.slice(0, 280) + (listenScript.length > 280 ? "…" : "") });
    }
  }

  const readQ = unit?.sections.reading?.questions?.[0];
  if (readQ?.question) {
    segments.push({
      type: "text",
      content: ` Comprehension focus: ${readQ.question} `,
    });
  }

  if (unit?.sections.section_c?.title) {
    segments.push({
      type: "text",
      content: ` Section C — ${unit.sections.section_c.title}: Stories of China in context. `,
    });
  }

  segments.push({
    type: "text",
    content: " Tap every highlighted word — one unit, one scene, full recall.",
  });

  const plotParts = [
    unitZh,
    sectionLine ? `涵盖 ${sectionLine}` : "涵盖阅读与写作",
    `本幕 ${words.length} 词`,
    readQ?.explanation,
    thought.zh,
  ].filter(Boolean);

  const rw3Phases = buildRw3Phases(zone, wordMap, unit, wordIds);

  return {
    levelId: zone.id,
    title: zone.name,
    settingEn: unitEn,
    chapter: `${unitZh} · 单元全景（${words.length} 词）`,
    plotZh: plotParts.join("。") + "。",
    philosophyZh: thought.zh,
    philosophyEn: thought.en,
    segments,
    words: words.map((w, i) => ({
      id: w.id,
      word: w.word,
      pos: w.pos,
      meaning: w.meaning,
      contextLine: contextLineFor(w, passage || listenScript, unitIndex + i),
    })),
    rw3Phases,
  };
}
