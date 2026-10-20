import type { WordEntry } from "../../../core/types";
import type { Rw3UnitContent } from "../../../infra/data";
import { buildActs } from "../acts";
import { UNIT1_DISTRACTION } from "../autoScript";
import { CLUB_SEATS, clubSeatSpec } from "../stages/clubRoom";
import type { Actor, ActDialog, Beat, BuildPiece, CameraShot, MemoryAct, MemoryScript, SentenceCue, Vec3, WordObjectPlacement } from "../types";

/**
 * 单元 1 · 回忆 A《周四的沉默》（文章 Connection or conversation）。舞台 clubRoom：周四傍晚，图书馆庭院边的社团教室。
 *
 *  1. 下潜（you）：雾中光尘 → 系统：“You remember a Thursday…” → 地面 / 墙 / 窗 / 庭院的树 / 长桌依次显形 → 触碰 6 个物件
 *  2. 同学们入场（他）
 *  3. 五幕（课文 20 句全文，每幕 4 句；buildActs 按段落切）。三种视角看同一幕：
 *       他：逐句朗读 + 字幕，世界继续生长，每幕一次断片（选画面里的物件）；Lin / Rui 的对话在旁边发生
 *       我：坐在当年我的位子上上课（预习生词 → 跟读 → Rui 提问 → 对话 → 记笔记）；学习时手机偶尔亮起
 *       纸：当年的笔记本（漫画格 + 生词卡 + 笔记）
 *  4. 定格：大家第一次笑起来的一刻 → 泛黄 → 上浮回 2090 年，老年的他轻声说一句话
 */

// 词 id（rw3_unit01_NN）
const W = (n: number): string => `rw3_unit01_${String(n).padStart(2, "0")}`;
const DEVICE = W(13);
const NOTIFICATION = W(4);
const MESSAGE = W(21);
const CONVERSATION = W(3);
const LONELY = W(22);
const CONNECTION = W(2);
const EXPERIMENT = W(29);
const ANXIOUS = W(24);
const CAREFULLY = W(25);
const PURPOSE = W(30);
const COMMUNICATION = W(23);
const ALGORITHM = W(6);
const OFFLINE = W(10);
const VIRTUAL = W(8);
const CYBER = W(12);

const TABLE_Y = 0.755;
const ROW_Z = -0.25;

/** 桌上一排物件（x 从左到右）；purpose / communication 悬在桌子后沿的上空。断片的候选就近摆放，镜头能一起框住 */
const objects: WordObjectPlacement[] = [
  { wordId: NOTIFICATION, archetype: "phone", position: { x: -1.95, y: TABLE_Y, z: ROW_Z }, rotationY: 0.5, scale: 0.7 },
  { wordId: MESSAGE, archetype: "chatScreen", position: { x: -1.4, y: TABLE_Y, z: ROW_Z - 0.04 }, rotationY: 0.3, scale: 0.7 },
  { wordId: EXPERIMENT, archetype: "flask", position: { x: -0.85, y: TABLE_Y, z: ROW_Z }, rotationY: 0, scale: 0.7 },
  { wordId: CONVERSATION, archetype: "topicCard", position: { x: -0.3, y: TABLE_Y, z: ROW_Z }, rotationY: -0.25, scale: 0.8 },
  { wordId: CAREFULLY, archetype: "cup", position: { x: 0.25, y: TABLE_Y, z: ROW_Z + 0.04 }, rotationY: 0.6, scale: 0.6 },
  { wordId: DEVICE, archetype: "phoneRow", position: { x: 0.85, y: TABLE_Y, z: ROW_Z }, rotationY: 0.1, scale: 0.7 },
  { wordId: CONNECTION, archetype: "cable", position: { x: 1.45, y: TABLE_Y, z: ROW_Z }, rotationY: 0.15, scale: 0.5 },
  { wordId: ANXIOUS, archetype: "clock", position: { x: 1.97, y: TABLE_Y, z: ROW_Z }, rotationY: -0.2, scale: 0.7 },
  // 长桌左端不远处的空椅子（离桌面上的物件近，触碰阶段一屏就能框住）
  { wordId: LONELY, archetype: "emptyChair", position: { x: -3.75, y: 0, z: -1.7 }, rotationY: 0.9, scale: 1.0 },
  // 悬在桌后沿上空的两个词（第四、第五幕的断片答案）
  { wordId: PURPOSE, archetype: "compass", position: { x: 1.0, y: 1.3, z: -0.8 }, rotationY: 0, scale: 0.7 },
  { wordId: COMMUNICATION, archetype: "megaphone", position: { x: -1.0, y: 1.3, z: -0.8 }, rotationY: 0.4, scale: 0.7 },
];

const look = (o: Record<string, unknown>): Record<string, unknown> => ({ seated: true, ...o });

const actors: Actor[] = [
  {
    id: "me2026",
    name: "Me (2026)",
    look: look({ shirt: 0x33384a, hair: 0x14100e, hairStyle: "short", skin: 0xe0b894, trousers: 0x2c3140, outfit: "hoodie", backpack: 0x2e5a73 }),
    position: { x: 4.5, y: 0, z: CLUB_SEATS.me.z },
    rotationY: CLUB_SEATS.me.yaw,
    seat: clubSeatSpec("me"),
    pose: "stand",
  },
  {
    id: "lin",
    name: "Lin",
    look: look({ shirt: 0xa05a6a, hair: 0x1c1411, hairStyle: "long", skin: 0xe6bf9f, trousers: 0x3a4254, outfit: "tee" }),
    position: { x: CLUB_SEATS.lin.x, y: 0, z: -2.9 },
    rotationY: CLUB_SEATS.lin.yaw,
    seat: clubSeatSpec("lin"),
    pose: "stand",
  },
  {
    id: "mei",
    name: "Mei",
    look: look({ shirt: 0x5f8a7a, hair: 0x2a1c14, hairStyle: "bun", glasses: true, skin: 0xdfb594, trousers: 0x40424a, outfit: "tee" }),
    position: { x: CLUB_SEATS.mei.x, y: 0, z: -2.9 },
    rotationY: CLUB_SEATS.mei.yaw,
    seat: clubSeatSpec("mei"),
    pose: "stand",
  },
  {
    id: "an",
    name: "An",
    look: look({ shirt: 0xb0894f, hair: 0x201812, hairStyle: "short", skin: 0xd9ad8a, trousers: 0x33363f, outfit: "hoodie" }),
    position: { x: -4.5, y: 0, z: CLUB_SEATS.an.z },
    rotationY: CLUB_SEATS.an.yaw,
    seat: clubSeatSpec("an"),
    pose: "stand",
  },
  {
    id: "rui",
    name: "Rui",
    look: look({ shirt: 0x6b7f8c, hair: 0x3a2a1e, hairStyle: "short", glasses: true, skin: 0xe2b898, trousers: 0x3b3a36, outfit: "tee" }),
    position: { x: CLUB_SEATS.rui.x, y: 0, z: 2.6 },
    rotationY: CLUB_SEATS.rui.yaw,
    seat: clubSeatSpec("rui"),
    pose: "stand",
  },
];

/** 舞台部件的显形方式与时长（缺省取舞台默认风格）。id 与部件名相同，build 里直接写部件名 */
const SLOW: Record<string, number> = {
  courtyard_ground: 3.6,
  courtyard_path: 3.2,
  library: 4.2,
  tree_a: 4.4,
  tree_b: 4.8,
  tree_c: 5.2,
  tree_d: 4.6,
  sunlight: 3.6,
  window: 3.2,
};
const pieces: BuildPiece[] = Object.entries(SLOW).map(([target, duration]) => ({ id: target, target, duration }));

const shot = (from: Vec3, to: Vec3, lookAt: Vec3, duration = 10, extra: Partial<CameraShot> = {}): CameraShot => ({ from, to, look: lookAt, duration, move: "dolly", ...extra });

/** 断片的机位只提供 “从哪个方向看” 的提示；真正的位置与距离由引擎按候选物件的包围盒计算 */
const GAP_HINT: CameraShot = { to: { x: 0, y: 1.6, z: 3.6 }, look: { x: 0, y: 0.9, z: -0.3 } };

/** 六个循环使用的电影机位（课文 20 句，没有专门指定机位的句子轮流用） */
const SHOTS: CameraShot[] = [
  shot({ x: -4.4, y: 1.9, z: 3.5 }, { x: -3.4, y: 1.8, z: 3.0 }, { x: 0.5, y: 1.15, z: -1.0 }, 11),
  shot({ x: 4.3, y: 1.7, z: 3.3 }, { x: 3.4, y: 1.65, z: 2.7 }, { x: -0.3, y: 1.0, z: -0.7 }, 11),
  shot({ x: 0.2, y: 1.45, z: 2.9 }, { x: 0.2, y: 1.3, z: 1.9 }, { x: 0.1, y: 0.95, z: -0.9 }, 9, { move: "push", fov: 40 }),
  shot({ x: -0.8, y: 1.6, z: 2.3 }, { x: 0.2, y: 1.55, z: 1.7 }, { x: 5.0, y: 1.45, z: -1.0 }, 9),
  shot({ x: -1.8, y: 1.7, z: 1.9 }, { x: -2.6, y: 1.5, z: 1.2 }, { x: -4.4, y: 0.8, z: -2.9 }, 9),
  shot({ x: 1.6, y: 1.6, z: 2.8 }, { x: 0.6, y: 1.5, z: 2.2 }, { x: 0.3, y: 1.05, z: -0.9 }, 9),
];

/** 课文 20 句的中文字幕（按句序）。导入教材原文时不用 */
const ZH: string[] = [
  "一个校园会话社每周四聚会，教室正对着图书馆庭院。",
  "社员们几秒钟就能发出一条消息，可在共同的休息时间里，有些人坐在一起，却不知道怎样开口。",
  "好几个人说，哪怕屏幕上满是名字、照片和提醒，他们还是觉得孤单。",
  "社团提出了一个很实际的问题：这一刻需要怎样的连接？",
  "为了探索这个问题，学生组织者设计了一项为期四周的倾听实验，目的是学习，而不是科学研究。",
  "每次活动中，成员们把设备放进篮子二十分钟，轮流讲述一个小小的难题。",
  "倾听者必须先追问一个问题，并在回应之前概括自己听到的内容。",
  "这条规则起初让人别扭，有些参与者担心会错过紧急消息。",
  "到第三次活动时，沉默不再像是一种失败；它给了人们小心斟酌措辞的时间。",
  "成员们开始留意语气、犹豫，以及一句简短回答背后的意思。",
  "他们并没有停用群聊或视频通话，这些工具对于计划安排和维系远方的友谊依然有用。",
  "当信息简单、时间紧迫时，一条快捷的数字消息就很管用。",
  "面对面的交谈则提供了不同的东西：人们可以修正想法、回应情绪、建立信任。",
  "社团的记录描述的是它自己的做法，并不证明每个学生都需要同样的日常安排。",
  "这个局限反而让实验更有用，因为它引发的是讨论，而不是强加一条通用的规则。",
  "因此，为数字时代做好准备，意味着带着目的去选择工具，而不是把每一条通知都当作命令。",
  "忙碌的日子里，成员们用共享日历来保护一段不被打断的学习时间。",
  "艰难的日子里，他们把手机收起来，请朋友先倾听，再给建议。",
  "他们的目标不是减少技术，而是更有意识的沟通，以及更清楚何时该开口交谈。",
  "每个周四都以一个问题收尾：今天的联结，有没有让谁觉得被理解？",
];

/** 个别句子的舞台提示：让某些部件在这一句显形（序号为课文句序，从 0 起） */
const BUILD_AT: Record<number, string[]> = {
  0: ["notice", "shelf"],
  1: ["plants"],
  3: ["board"],
  4: ["plan"],
  5: ["basket", "clock"],
};

/** 每幕的断片：句子（课文句序）、答案词、干扰词。候选摆在一起，干扰词不出现在那一句里 */
const GAPS: Array<{ sentence: number; answer: string; decoys: string[] }> = [
  { sentence: 3, answer: CONNECTION, decoys: [ANXIOUS, CAREFULLY] },
  { sentence: 4, answer: EXPERIMENT, decoys: [NOTIFICATION, MESSAGE] },
  { sentence: 8, answer: CAREFULLY, decoys: [CONVERSATION, DEVICE] },
  { sentence: 15, answer: PURPOSE, decoys: [ANXIOUS, CAREFULLY] },
  { sentence: 18, answer: COMMUNICATION, decoys: [EXPERIMENT, CAREFULLY] },
];

/** 附身对话：第一幕 Lin 的提问，第二幕 Rui 的请求。第三人称里是旁观 */
const DIALOGS: Record<number, ActDialog> = {
  0: {
    speaker: "Lin",
    line: "So… what do we actually talk about?",
    zh: "那……我们到底要聊什么呢？",
    options: [
      { wordId: CONVERSATION, reply: "A real conversation. Just that.", correct: true },
      { wordId: PURPOSE, reply: "Maybe we start with our purpose. Why are we here?", correct: true },
      { wordId: ALGORITHM, reply: "Whatever the algorithm shows us?", correct: false },
    ],
  },
  1: {
    speaker: "Rui",
    line: "Phones in the basket, everyone. For one session, can we stay…",
    zh: "手机都放进篮子里吧。就这一次，我们能不能保持……",
    options: [
      { wordId: OFFLINE, reply: "Offline. Just for one session.", correct: true },
      { wordId: VIRTUAL, reply: "Virtual?", correct: false },
      { wordId: CYBER, reply: "Cyber?", correct: false },
    ],
  },
};

const poseAll = (pose: "phone" | "listen"): Beat[] => (["lin", "mei", "an", "rui", "me2026"] as const).map((id): Beat => ({ kind: "actor", actorId: id, action: "pose", pose }));

const enter = (actorId: string, to: Vec3, seat: Vec3, walk = 1.7): Beat[] => [
  { kind: "actor", actorId, action: "enter", to, pose: "stand", duration: 1.0 },
  { kind: "actor", actorId, action: "walk", to: seat, duration: walk },
  { kind: "actor", actorId, action: "pose", pose: "phone" },
];

const seat = (s: { x: number; z: number }): Vec3 => ({ x: s.x, y: 0, z: s.z });

/** 前半段（不依赖课程数据）：下潜建世界 + 触碰 6 个物件 + 同学们入场 */
const prelude: Beat[] = [
  // ───────── 1. 下潜（你）─────────
  { kind: "wait", seconds: 0.6 },
  {
    kind: "narrate",
    pov: "you",
    text: "You remember a Thursday.",
    zh: "你想起一个周四。",
    voice: "system",
    build: ["floor", "wall_back", "wall_left", "wall_right", "wall_front", "ceiling"],
  },
  {
    kind: "narrate",
    pov: "you",
    text: "A room by the library courtyard.",
    zh: "图书馆庭院边的一间教室。",
    voice: "system",
    build: ["window", "sunlight", "courtyard_ground", "courtyard_path", "benches", "library"],
  },
  {
    kind: "narrate",
    pov: "you",
    text: "Leaf by leaf, the courtyard trees come back.",
    zh: "庭院里的树，一片叶子一片叶子地回来了。",
    voice: "system",
    build: ["tree_a", "tree_b", "tree_c", "tree_d"],
  },
  {
    kind: "narrate",
    pov: "you",
    text: "A long table waits, and the chairs are pulled in close.",
    zh: "一张长桌在等着，椅子都拉得很近。",
    voice: "system",
    build: ["table", "chairs", "lamps"],
  },
  {
    kind: "touch",
    prompt: "Reach out. Touch what you remember.",
    zh: "伸手，触碰你记得的东西。",
    wordIds: [DEVICE, NOTIFICATION, MESSAGE, CONVERSATION, LONELY, CONNECTION],
  },

  // ───────── 2. 同学们入场（他）─────────
  {
    kind: "narrate",
    pov: "watch",
    text: "Now watch. This is how you were.",
    zh: "现在，看着吧。当年的你就是这个样子。",
    voice: "system",
    camera: shot({ x: -4.6, y: 1.95, z: 3.6 }, { x: -3.8, y: 1.85, z: 3.1 }, { x: 0.4, y: 1.1, z: -0.8 }, 12),
  },
  ...enter("mei", { x: CLUB_SEATS.mei.x, y: 0, z: -2.9 }, seat(CLUB_SEATS.mei)),
  ...enter("lin", { x: CLUB_SEATS.lin.x, y: 0, z: -2.9 }, seat(CLUB_SEATS.lin)),
  ...enter("an", { x: -4.5, y: 0, z: CLUB_SEATS.an.z }, seat(CLUB_SEATS.an), 1.6),
  ...enter("rui", { x: CLUB_SEATS.rui.x, y: 0, z: 2.6 }, seat(CLUB_SEATS.rui)),
  ...enter("me2026", { x: 4.5, y: 0, z: CLUB_SEATS.me.z }, seat(CLUB_SEATS.me), 1.6),
  { kind: "wait", seconds: 0.5 },
];

/** 后半段：定格 · 上浮 */
const finale: Beat[] = [
  // 第一次一起笑：先是 Mei 和 Lin 憋不住（sitLaugh：后仰、肩膀抖动），接着其他人也跟着笑起来
  { kind: "actor", actorId: "mei", action: "pose", pose: "laugh" },
  { kind: "actor", actorId: "lin", action: "pose", pose: "laugh" },
  { kind: "wait", seconds: 0.35 },
  { kind: "actor", actorId: "an", action: "pose", pose: "laugh" },
  { kind: "actor", actorId: "me2026", action: "pose", pose: "laugh" },
  { kind: "actor", actorId: "rui", action: "pose", pose: "laugh" },
  {
    kind: "narrate",
    pov: "watch",
    text: "And then, for the first time, we all laughed together.",
    zh: "然后，我们第一次一起笑了起来。",
    voice: "old",
    camera: shot({ x: 2.6, y: 1.4, z: 2.3 }, { x: 1.6, y: 1.35, z: 1.8 }, { x: -0.3, y: 1.1, z: -0.7 }, 8),
  },
  {
    kind: "freeze",
    caption: "Thursday's Silence",
    zh: "周四的沉默",
    epilogue: { text: "We were so young. And we were learning to listen.", zh: "那时我们那么年轻。而我们，正在学着倾听。", voice: "old" },
    epilogueDistracted: { text: "I remember that room. I wish I had looked up more often.", zh: "我记得那间教室。可惜当年，我没有多抬几次头。", voice: "old" },
  },
];

/** 给 buildActs 切好的幕装上舞台：逐句字幕 / 机位 / 部件、断片、对话、人物动作 */
function dressActs(acts: MemoryAct[], withZh: boolean): void {
  for (const act of acts) {
    const cues: SentenceCue[] = act.sentences.map((_, i) => {
      const abs = act.start + i;
      const cue: SentenceCue = {};
      if (withZh && ZH[abs]) cue.zh = ZH[abs];
      if (BUILD_AT[abs]) cue.build = BUILD_AT[abs];
      cue.camera = SHOTS[abs % SHOTS.length];
      return cue;
    });
    act.cues = cues;
    const gap = GAPS[act.index];
    if (gap) {
      const local = gap.sentence - act.start;
      if (local >= 0 && local < act.sentences.length) {
        act.gap = { sentence: local, answerWordId: gap.answer, decoyWordIds: gap.decoys };
        cues[local].camera = GAP_HINT;
      }
    }
    if (DIALOGS[act.index]) act.dialog = DIALOGS[act.index];
    // 实验开始（第二幕）：大家放下手机，抬起头
    if (act.index === 1) act.actorCues = poseAll("listen");
  }
}

/**
 * 《周四的沉默》的脚本。课文全文（20 句）由 buildActs 按段落切成 5 幕；
 * passageOverride 是导入的教材原文：舞台不变，字幕和讲义换成原文（中文字幕和断片不再适用，断片只在句子里确有答案词时保留）。
 */
export function buildU01aScript(unit: Rw3UnitContent, words: WordEntry[], passageOverride?: string): MemoryScript {
  const acts = buildActs(unit, words, "section_a", passageOverride);
  dressActs(acts, !passageOverride);
  if (passageOverride) {
    const byId = new Map(words.map((w) => [w.id, w.word]));
    for (const act of acts) {
      const g = act.gap;
      if (!g) continue;
      const sentence = act.sentences[g.sentence];
      const answer = byId.get(g.answerWordId);
      const ok = sentence !== undefined && answer !== undefined && new RegExp(`\\b${answer}(?:s|es|ed|d|ing)?\\b`, "i").test(sentence);
      const decoyHit = g.decoyWordIds.some((id) => {
        const d = byId.get(id);
        return d !== undefined && sentence !== undefined && new RegExp(`\\b${d}(?:s|es|ed|d|ing)?\\b`, "i").test(sentence);
      });
      if (!ok || decoyHit) act.gap = undefined;
    }
  }
  return { ...U01A_BASE, acts };
}

/** 不依赖课程数据的部分：舞台、人物、物件、下潜 / 入场 / 定格。stages.test 用它检查绘制预算 */
export const U01A_BASE: MemoryScript = {
  id: "u01a",
  unitId: "unit01",
  section: "section_a",
  title: "Thursday's Silence",
  titleZh: "周四的沉默",
  stage: "clubRoom",
  pieces,
  actors,
  objects,
  organizer: "rui",
  student: "me2026",
  distraction: UNIT1_DISTRACTION,
  beats: [...prelude, { kind: "acts" }, ...finale],
  reward: { lightNode: "unit01:section_a" },
};
