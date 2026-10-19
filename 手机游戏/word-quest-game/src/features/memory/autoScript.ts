import type { WordEntry } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { memoryScriptId, type SectionKey } from "./ids";
import { memoryObjectFor, ARCHETYPES } from "./memoryObjects";
import { getStage } from "./stages";
import { findExactWord, hashSeed, sentenceHasWord, seededRandom, splitSentences } from "./text";
import type { Beat, BuildPiece, CameraShot, MemoryScript, PaperPage, Vec3, WordObjectPlacement } from "./types";

/**
 * 通用回忆：没有手写脚本的段落由数据自动生成（emptyRoom 舞台）。
 *  - 文章前 6 句作为 narrate：前 2 句在“下潜”（you），触碰物件之后的句子在“我在看我”（watch）；
 *  - 每句话建立舞台的一块部件；
 *  - 含本单元词的句子里选 2 句改成 gap（断片）；
 *  - 最后一页 paper 用含词句子 3 行；
 *  - 以 freeze 收尾。
 * 同一个 (单元, 段落) 永远生成同一份脚本（种子来自 id）。
 */

const NARRATE_COUNT = 6;
const YOU_SENTENCES = 2; // 这些句子发生在下潜阶段，之后才有 touch
const MAX_PAPER_WORDS = 22;

/** 每个句子位建立的舞台部件（emptyRoom） */
const BUILD_PLAN: string[][] = [["floor", "wall_back"], ["window", "wall_left", "wall_right", "wall_front"], ["table", "chairs"], ["board", "shelf"], ["lamp", "plant"], []];

interface Candidate {
  index: number;
  sentence: string;
  words: WordEntry[];
}

function shuffle<T>(list: T[], rand: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function buildAutoScript(unit: Rw3UnitContent, words: WordEntry[], section: SectionKey, stageName = "emptyRoom"): MemoryScript {
  const sec = unit.sections[section];
  const passage = sec?.passage ?? "";
  const sentences = splitSentences(passage);
  const id = memoryScriptId(unit.unit_id, section);
  const rand = seededRandom(hashSeed(id));
  const stage = getStage(stageName);

  const candidates: Candidate[] = sentences.map((sentence, index) => ({
    index,
    sentence,
    words: words.filter((w) => sentenceHasWord(sentence, w.word)),
  }));

  // ── gap：先在 touch 之后的句子位（2..5）里挑，不够 2 句时向后补充句子 ──
  const gapPool = shuffle(candidates.filter((c) => c.index >= YOU_SENTENCES && c.index < NARRATE_COUNT && c.words.length > 0), rand);
  const gaps: Array<{ cand: Candidate; answer: WordEntry }> = [];
  const usedAnswers = new Set<string>();
  const pickAnswer = (c: Candidate): WordEntry | undefined => c.words.find((w) => !usedAnswers.has(w.id)) ?? undefined;
  for (const c of gapPool) {
    if (gaps.length >= 2) break;
    const a = pickAnswer(c);
    if (a) {
      usedAnswers.add(a.id);
      gaps.push({ cand: c, answer: a });
    }
  }
  const extraGaps: Array<{ cand: Candidate; answer: WordEntry }> = [];
  if (gaps.length < 2) {
    for (const c of candidates.filter((c) => c.index >= NARRATE_COUNT && c.words.length > 0)) {
      if (gaps.length + extraGaps.length >= 2) break;
      const a = pickAnswer(c);
      if (a) {
        usedAnswers.add(a.id);
        extraGaps.push({ cand: c, answer: a });
      }
    }
  }
  const gapByIndex = new Map(gaps.map((g) => [g.cand.index, g]));

  // ── 干扰词：同单元、不在该句里出现、不等于答案；优先同词性 ──
  const decoysFor = (g: { cand: Candidate; answer: WordEntry }): WordEntry[] => {
    const others = words.filter((w) => w.id !== g.answer.id && !sentenceHasWord(g.cand.sentence, w.word));
    const samePos = shuffle(others.filter((w) => w.pos === g.answer.pos), rand);
    const rest = shuffle(others.filter((w) => w.pos !== g.answer.pos), rand);
    return [...samePos, ...rest].slice(0, 2);
  };
  const gapPlans = [...gaps, ...extraGaps].map((g) => ({ ...g, decoys: decoysFor(g) }));

  // ── touch 的词：优先前 6 句里出现的词（排除 gap 答案），不足用本单元其它词补到 5–6 个 ──
  const touchWords: WordEntry[] = [];
  const takeTouch = (w: WordEntry): void => {
    if (touchWords.length < 6 && !touchWords.some((t) => t.id === w.id) && !usedAnswers.has(w.id)) touchWords.push(w);
  };
  for (const c of candidates.slice(0, NARRATE_COUNT)) for (const w of c.words) takeTouch(w);
  for (const w of shuffle(words, rand)) {
    if (touchWords.length >= 5) break;
    takeTouch(w);
  }

  // ── 物件与摆放位 ──
  const objectWords: WordEntry[] = [];
  const addObject = (w: WordEntry): void => {
    if (!objectWords.some((o) => o.id === w.id)) objectWords.push(w);
  };
  touchWords.forEach(addObject);
  for (const g of gapPlans) {
    addObject(g.answer);
    g.decoys.forEach(addObject);
  }
  const slotPool: Vec3[] = [...stage.slots.table, ...stage.slots.hover, ...stage.slots.floor];
  const placements: WordObjectPlacement[] = objectWords.slice(0, slotPool.length).map((w, i) => {
    const def = memoryObjectFor(w.id, w.word);
    const pos = slotPool[i];
    return {
      wordId: w.id,
      archetype: ARCHETYPES[def.archetype] ? def.archetype : "book",
      position: { ...pos },
      rotationY: ((i * 0.9) % (Math.PI * 2)) - Math.PI / 2,
      // 桌面上的小物件略小一些
      scale: pos.y > 0.5 && pos.y < 0.9 ? 0.62 : undefined,
    };
  });
  const placedIds = new Set(placements.map((p) => p.wordId));

  // ── 舞台部件（piece 表就是 stage.targets 的默认风格）──
  const pieces: BuildPiece[] = Object.entries(stage.targets).map(([target, style]) => ({ id: target, target, style }));

  // ── 节拍 ──
  const beats: Beat[] = [];
  const shot = (i: number): CameraShot => stage.shots[i % stage.shots.length];
  const buildFor = (index: number): string[] => (BUILD_PLAN[index] ?? []).filter((t) => t in stage.targets);
  const gapBeat = (g: (typeof gapPlans)[number], index: number): Beat => ({
    kind: "gap",
    sentence: g.cand.sentence,
    answerWordId: g.answer.id,
    decoyWordIds: g.decoys.filter((d) => placedIds.has(d.id)).map((d) => d.id),
    camera: shot(index),
    build: buildFor(index),
  });

  const narrateSentences = sentences.slice(0, NARRATE_COUNT);
  narrateSentences.forEach((text, i) => {
    if (i === YOU_SENTENCES) {
      beats.push({
        kind: "touch",
        prompt: "Reach out. Touch what you remember.",
        zh: "伸手，触碰你记得的东西。",
        wordIds: touchWords.filter((w) => placedIds.has(w.id)).map((w) => w.id),
      });
    }
    const plan = gapByIndex.has(i) ? gapPlans.find((p) => p.cand.index === i) : undefined;
    if (plan) {
      beats.push(gapBeat(plan, i));
      return;
    }
    beats.push({
      kind: "narrate",
      pov: i < YOU_SENTENCES ? "you" : "watch",
      text,
      build: buildFor(i),
      camera: i < YOU_SENTENCES ? undefined : shot(i),
      voice: "system",
    });
  });
  // 句子不足 6 句的极端情况：仍要保证有 touch
  if (narrateSentences.length <= YOU_SENTENCES) {
    beats.push({ kind: "touch", prompt: "Reach out. Touch what you remember.", zh: "伸手，触碰你记得的东西。", wordIds: touchWords.filter((w) => placedIds.has(w.id)).map((w) => w.id) });
  }
  // 补充的 gap（后面的句子）：紧接着 watch 阶段
  for (const plan of gapPlans.filter((p) => p.cand.index >= NARRATE_COUNT)) beats.push(gapBeat(plan, plan.cand.index));

  // ── paper：3 行含词句子，占位词取该句里与原形一致的本单元词 ──
  const used = new Set(gapPlans.map((g) => g.cand.index));
  const paperCandidates = candidates
    .filter((c) => c.sentence.split(/\s+/).length <= MAX_PAPER_WORDS)
    .map((c) => ({ c, word: c.words.find((w) => findExactWord(c.sentence, w.word)) }))
    .filter((x): x is { c: Candidate; word: WordEntry } => x.word !== undefined);
  const fresh = paperCandidates.filter((x) => !used.has(x.c.index));
  const paperPicks: typeof paperCandidates = [];
  const paperWordIds = new Set<string>();
  for (const x of [...shuffle(fresh, rand), ...shuffle(paperCandidates.filter((x) => used.has(x.c.index)), rand)]) {
    if (paperPicks.length >= 3) break;
    if (paperWordIds.has(x.word.id)) continue;
    paperWordIds.add(x.word.id);
    paperPicks.push(x);
  }
  paperPicks.sort((a, b) => a.c.index - b.c.index);
  const lines = paperPicks.map(({ c, word }) => {
    const hit = findExactWord(c.sentence, word.word)!;
    return `${c.sentence.slice(0, hit.index)}{{${word.id}}}${c.sentence.slice(hit.index + hit.length)}`;
  });
  if (lines.length > 0) {
    const decoyPool = shuffle(words.filter((w) => !paperWordIds.has(w.id)), rand);
    const page: PaperPage = {
      style: section === "section_b" ? "diary" : section === "section_c" ? "ticket" : "notebook",
      title: sec?.title ?? unit.title,
      lines,
      decoyWordIds: decoyPool.slice(0, 3).map((w) => w.id),
    };
    beats.push({ kind: "paper", page });
  }

  beats.push({ kind: "freeze", caption: sec?.title ?? unit.title, zh: unit.title_zh });

  return {
    id,
    unitId: unit.unit_id,
    section,
    title: sec?.title ?? unit.title,
    titleZh: unit.title_zh,
    stage: stageName,
    pieces,
    actors: [],
    objects: placements,
    beats,
    reward: { lightNode: `${unit.unit_id}:${section}` },
  };
}
