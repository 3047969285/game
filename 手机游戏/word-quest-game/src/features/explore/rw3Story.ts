import type { ContextScene, ContextSegment, Rw3SubWorld, WordEntry, ZoneDef } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { RW3_LEARNING_METHODS } from "../learn/learningMethods";
import { buildRw3Phases } from "./rw3Phases";
import { pickPhilosophy } from "./philosophy";
import { passageWithAllWords, pickLine, sentenceToSegments, wordInText } from "./sceneUtils";
import { selectRw3WorldPhases } from "./rw3SubWorlds";
import { getRw3World } from "./rw3Worlds";

function contextLineFor(word: WordEntry, passage: string, slot: number): string {
  if (passage) {
    const sentences = passage.split(/(?<=[.!?])\s+/);
    const hit = sentences.find((s) => wordInText(s, word.word));
    if (hit) return hit.trim();
  }
  return pickLine(word, slot);
}

/** 读写3：单元枢纽场景，承载单元总叙事与完整学习管线。 */
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
  const world = getRw3World(zone.id.replace("rw3_", ""));

  const secA = unit?.sections.section_a?.title;
  const secB = unit?.sections.section_b?.title;
  const secC = unit?.sections.section_c?.title;
  const sectionLine = [secA, secB, secC].filter(Boolean).join(" · ");

  const segments: ContextSegment[] = [
    { type: "text", content: `Unit ${unitIndex + 1} — ${unitEn} ` },
    { type: "text", content: `主题：${unit?.theme ?? "reading & writing"}。` },
  ];
  if (world) {
    segments.push(
      { type: "text", content: ` 世界入口：${world.worldName}。${world.opening} ` },
      { type: "text", content: ` 任务：${world.mission} ` },
      { type: "text", content: ` 转折：${world.turningPoint} ` },
    );
  }
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
    world?.worldName,
    world?.mission,
    sectionLine ? `涵盖 ${sectionLine}` : "涵盖阅读与写作",
    `本幕 ${words.length} 词`,
    readQ?.explanation,
    world?.ending,
    thought.zh,
  ].filter(Boolean);

  const rw3Phases = buildRw3Phases(zone, wordMap, unit, wordIds);

  return {
    levelId: zone.id,
    unitId: zone.id,
    worldId: "hub",
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
    learningMethods: RW3_LEARNING_METHODS,
    unitWorld: world,
  };
}

/**
 * 读写3：从同一个单元枢纽进入文章/训练子世界。
 * 子世界复用同一份单元内容，只筛选属于当前世界的学习阶段，避免复制教材数据。
 */
export function buildRw3SubWorldScene(
  zone: ZoneDef,
  wordMap: Map<string, WordEntry>,
  unit: Rw3UnitContent | undefined,
  wordIds: string[],
  subWorld: Rw3SubWorld,
  unitIndex = 0
): ContextScene | null {
  const hub = buildRw3UnitScene(zone, wordMap, unit, wordIds, unitIndex);
  if (!hub || !hub.rw3Phases) return null;

  const phases = selectRw3WorldPhases(hub.rw3Phases, subWorld);
  if (!phases.length) return null;

  const unitId = zone.id.replace("rw3_", "");
  const world = getRw3World(unitId);
  return {
    ...hub,
    levelId: `${zone.id}::${subWorld.id}`,
    unitId: zone.id,
    worldId: subWorld.id,
    title: subWorld.title,
    settingEn: `${hub.settingEn} · ${subWorld.id}`,
    chapter: `${hub.chapter} · ${subWorld.subtitle}`,
    plotZh: `${world?.opening ?? hub.plotZh} ${subWorld.subtitle}。进入后必须完成当前世界的检索与迁移任务。`,
    rw3Phases: phases,
  };
}
