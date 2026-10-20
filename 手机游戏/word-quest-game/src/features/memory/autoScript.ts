import type { WordEntry } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { buildActs } from "./acts";
import { memoryScriptId, type SectionKey } from "./ids";
import { memoryObjectFor, ARCHETYPES } from "./memoryObjects";
import { getStage } from "./stages";
import { hashSeed, sentenceHasWord, seededRandom } from "./text";
import type { Actor, Beat, BuildPiece, CameraShot, DistractionSpec, MemoryAct, MemoryScript, SentenceCue, Vec3, WordObjectPlacement } from "./types";

/**
 * 通用回忆：没有手写脚本的段落由数据自动生成（emptyRoom 舞台）。
 *  - 下潜（you）：两句系统旁白建起房间，触碰 5 个物件；
 *  - 课文全文由 buildActs 按段落切成若干幕：每幕的句子逐句朗读（他）、断片一次、理解题 / 翻译 / 写作都在幕里（我、纸）；
 *  - 以 freeze 收尾。
 * 同一个 (单元, 段落) 永远生成同一份脚本（种子来自 id）。
 */

const TOUCH_COUNT = 5;

/** 房间的主体在下潜阶段（两句系统旁白）建起；剩下的部件分到各幕 */
const PRELUDE_BUILD: string[][] = [["floor", "wall_back", "wall_left", "wall_right", "wall_front"], ["window", "table", "chairs"]];

/** 单元 1 的主题机制：学习时手机偶尔亮起（其它单元暂时没有） */
export const UNIT1_DISTRACTION: DistractionSpec = {
  kind: "phone",
  messages: [
    ["Mei", "did you see this? the cafeteria cat is back"],
    ["Class group (23)", "who has the notes from Tuesday?"],
    ["An", "noodles after this? the usual place"],
    ["Campus Store", "Your package has arrived at the pickup point"],
    ["Lin", "look at this photo from the weekend"],
  ],
};

/** emptyRoom 里的两个座位：年轻的我（近侧，面朝桌子对面）与对面的老师 */
const EMPTY_ROOM_SEATS = {
  me: { x: -0.95, y: 0, z: 0.1, yaw: Math.PI },
  teacher: { x: 0, y: 0, z: -1.7, yaw: 0 },
} as const;

function shuffle<T>(list: readonly T[], rand: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface GapPlan {
  act: number;
  /** 断片的句子在本幕里的序号 */
  sentence: number;
  answer: WordEntry;
}

/** 每幕挑一句含单元词的句子做断片；一个词只做一次答案。本幕没有可用的单元词时这一幕没有断片 */
export function planGaps(acts: readonly MemoryAct[], words: readonly WordEntry[], rand: () => number): GapPlan[] {
  const used = new Set<string>();
  const plans: GapPlan[] = [];
  for (const act of acts) {
    const options: Array<{ sentence: number; word: WordEntry }> = [];
    act.sentences.forEach((s, i) => {
      for (const w of words) if (!used.has(w.id) && sentenceHasWord(s, w.word)) options.push({ sentence: i, word: w });
    });
    if (options.length === 0) continue;
    const pick = shuffle(options, rand)[0];
    used.add(pick.word.id);
    plans.push({ act: act.index, sentence: pick.sentence, answer: pick.word });
  }
  return plans;
}

export function buildAutoScript(unit: Rw3UnitContent, words: WordEntry[], section: SectionKey, stageName = "emptyRoom", passageOverride?: string): MemoryScript {
  const sec = unit.sections[section];
  const id = memoryScriptId(unit.unit_id, section);
  const rand = seededRandom(hashSeed(id));
  const stage = getStage(stageName);
  const acts = buildActs(unit, words, section, passageOverride);

  // ── 断片的答案 → 触碰的词（不含答案）→ 干扰词 ──
  const gapPlans = planGaps(acts, words, rand);
  const answerIds = new Set(gapPlans.map((g) => g.answer.id));
  const touchWords: WordEntry[] = [];
  const takeTouch = (w: WordEntry): void => {
    if (touchWords.length < TOUCH_COUNT && !touchWords.some((t) => t.id === w.id) && !answerIds.has(w.id)) touchWords.push(w);
  };
  for (const act of acts.slice(0, 2)) for (const wid of act.wordIds) takeTouch(words.find((w) => w.id === wid)!);
  for (const w of shuffle(words, rand)) {
    if (touchWords.length >= TOUCH_COUNT) break;
    takeTouch(w);
  }

  const slotPool: Vec3[] = [...stage.slots.table, ...stage.slots.hover, ...stage.slots.floor];
  const objectWords: WordEntry[] = [];
  const addObject = (w: WordEntry): boolean => {
    if (objectWords.some((o) => o.id === w.id)) return true;
    if (objectWords.length >= slotPool.length) return false;
    objectWords.push(w);
    return true;
  };
  // 断片的答案物件先摆（占住桌面的位置），再摆触碰的物件
  gapPlans.forEach((g) => addObject(g.answer));
  touchWords.forEach(addObject);

  // 干扰词：已摆放的词里，不在该句里出现、不等于答案的，优先同词性；不够再补别的单元词
  const decoysFor = (g: GapPlan): WordEntry[] => {
    const sentence = acts[g.act].sentences[g.sentence];
    const fits = (w: WordEntry): boolean => w.id !== g.answer.id && !sentenceHasWord(sentence, w.word);
    const placed = objectWords.filter(fits);
    const ranked = [...shuffle(placed.filter((w) => w.pos === g.answer.pos), rand), ...shuffle(placed.filter((w) => w.pos !== g.answer.pos), rand)];
    const picked = ranked.slice(0, 2);
    if (picked.length < 2) {
      for (const w of shuffle(words.filter(fits), rand)) {
        if (picked.length >= 2) break;
        if (!picked.some((p) => p.id === w.id) && addObject(w)) picked.push(w);
      }
    }
    return picked;
  };
  const gapDecoys = new Map(gapPlans.map((g) => [g.act, decoysFor(g)]));

  const placements: WordObjectPlacement[] = objectWords.map((w, i) => {
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

  // ── 舞台部件：下潜阶段建房间，剩下的分到各幕 ──
  const pieces: BuildPiece[] = Object.entries(stage.targets).map(([target, style]) => ({ id: target, target, style }));
  const inPrelude = new Set(PRELUDE_BUILD.flat());
  const remaining = Object.keys(stage.targets).filter((t) => !inPrelude.has(t));
  const preludeBuild = (i: number): string[] => (PRELUDE_BUILD[i] ?? []).filter((t) => t in stage.targets);

  // ── 人物：年轻的我与对面的老师（第一人称里老师提问）──
  const hasSeats = stageName === "emptyRoom";
  const actors: Actor[] = hasSeats
    ? [
        {
          id: "me2026",
          name: "Me (2026)",
          look: { seated: true, shirt: 0x33384a, hair: 0x14100e, hairStyle: "short", skin: 0xe0b894, trousers: 0x2c3140, outfit: "hoodie", backpack: 0x2e5a73 },
          position: { x: EMPTY_ROOM_SEATS.me.x, y: 0, z: EMPTY_ROOM_SEATS.me.z },
          rotationY: EMPTY_ROOM_SEATS.me.yaw,
          seat: { height: 0.48, tableHeight: 0.75, tableEdge: 0.425 },
          pose: "listen",
        },
        {
          id: "teacher",
          name: "Ms. Chen",
          look: { seated: true, shirt: 0x7a5a6a, hair: 0x2a1c14, hairStyle: "bun", glasses: true, skin: 0xe2b898, trousers: 0x3b3a36, outfit: "tee" },
          position: { x: EMPTY_ROOM_SEATS.teacher.x, y: 0, z: EMPTY_ROOM_SEATS.teacher.z },
          rotationY: EMPTY_ROOM_SEATS.teacher.yaw,
          seat: { height: 0.48, tableHeight: 0.75, tableEdge: 0.425 },
          pose: "listen",
        },
      ]
    : [];

  // ── 幕：逐句机位与部件，断片 ──
  const shotAt = (i: number): CameraShot => stage.shots[i % stage.shots.length];
  acts.forEach((act, ai) => {
    const cues: SentenceCue[] = act.sentences.map((_, i) => ({ camera: shotAt(ai * 3 + i) }));
    const extra = remaining[ai];
    if (extra) cues[0].build = [extra];
    act.cues = cues;
    const plan = gapPlans.find((g) => g.act === ai);
    const decoys = (gapDecoys.get(ai) ?? []).filter((d) => placedIds.has(d.id));
    if (plan && placedIds.has(plan.answer.id) && decoys.length >= 1) {
      act.gap = { sentence: plan.sentence, answerWordId: plan.answer.id, decoyWordIds: decoys.map((d) => d.id) };
    }
  });

  // ── 节拍 ──
  const beats: Beat[] = [
    { kind: "narrate", pov: "you", text: "You remember a room, and a day.", zh: "你想起一个房间，和那一天。", voice: "system", build: preludeBuild(0) },
    { kind: "narrate", pov: "you", text: "Piece by piece, it comes back.", zh: "一点一点，它回来了。", voice: "system", build: preludeBuild(1) },
    {
      kind: "touch",
      prompt: "Reach out. Touch what you remember.",
      zh: "伸手，触碰你记得的东西。",
      wordIds: touchWords.filter((w) => placedIds.has(w.id)).map((w) => w.id),
    },
    { kind: "narrate", pov: "watch", text: "Now watch. This is how you were.", zh: "现在，看着吧。当年的你就是这个样子。", voice: "system", camera: shotAt(0) },
  ];
  for (const a of actors) beats.push({ kind: "actor", actorId: a.id, action: "enter", to: a.position, pose: a.pose, duration: 1.6 });
  if (acts.length > 0) beats.push({ kind: "acts" });
  beats.push({ kind: "freeze", caption: sec?.title ?? unit.title, zh: unit.title_zh });

  return {
    id,
    unitId: unit.unit_id,
    section,
    title: sec?.title ?? unit.title,
    titleZh: unit.title_zh,
    stage: stageName,
    pieces,
    actors,
    objects: placements,
    beats,
    acts,
    organizer: hasSeats ? "teacher" : undefined,
    student: hasSeats ? "me2026" : undefined,
    distraction: unit.unit_id === "unit01" ? UNIT1_DISTRACTION : undefined,
    reward: { lightNode: `${unit.unit_id}:${section}` },
  };
}
