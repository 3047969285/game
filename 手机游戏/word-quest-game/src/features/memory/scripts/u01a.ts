import { CLUB_SEATS } from "../stages/clubRoom";
import type { Actor, Beat, BuildPiece, CameraShot, MemoryScript, Vec3, WordObjectPlacement } from "../types";

/**
 * 单元 1 · 回忆 A《周四的沉默》（文章 Connection or conversation）。舞台 clubRoom：周四傍晚，图书馆庭院边的社团教室。
 *
 *  1. 下潜（you）：雾中光尘 → 系统：“You remember a Thursday…” → 地面 / 墙 / 窗 / 庭院的树 / 长桌依次显形 → 触碰 6 个物件
 *  2. 我在看我（watch）：同学们逐个入场、坐下、低头看手机；文章前 9 句逐句朗读，3 次断片（experiment / anxious / carefully）
 *  3. 附身（me）：借年轻的我的眼睛，两次开口：Lin 的提问（conversation / purpose 都行）与组织者的请求（offline）
 *  4. 旧笔记本（paper）：三行被晕开的课堂笔记
 *  5. 定格：大家第一次一起笑起来的一刻 → 泛黄 → 上浮回 2090 年，老年的他轻声说一句话
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
const ATTENTION = W(9);
const PURPOSE = W(30);
const ALGORITHM = W(6);
const OFFLINE = W(10);
const VIRTUAL = W(8);
const CYBER = W(12);
const PLATFORM = W(17);
const SCROLL = W(5);

const TABLE_Y = 0.755;
const ROW_Z = -0.25;

/** 桌上一排物件（x 从左到右）。断片的候选就近摆放：每次三个物件相距约 1.2 米，镜头能一起框住 */
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
];

const look = (o: Record<string, unknown>): Record<string, unknown> => ({ seated: true, ...o });

const actors: Actor[] = [
  {
    id: "me2026",
    name: "Me (2026)",
    look: look({ shirt: 0x33384a, hair: 0x14100e, hairStyle: "short", skin: 0xe0b894, trousers: 0x2c3140, outfit: "hoodie", backpack: 0x2e5a73 }),
    position: { x: 4.5, y: 0, z: CLUB_SEATS.me.z },
    rotationY: CLUB_SEATS.me.yaw,
    pose: "stand",
  },
  {
    id: "lin",
    name: "Lin",
    look: look({ shirt: 0xa05a6a, hair: 0x1c1411, hairStyle: "long", skin: 0xe6bf9f, trousers: 0x3a4254, outfit: "tee" }),
    position: { x: CLUB_SEATS.lin.x, y: 0, z: -2.9 },
    rotationY: CLUB_SEATS.lin.yaw,
    pose: "stand",
  },
  {
    id: "mei",
    name: "Mei",
    look: look({ shirt: 0x5f8a7a, hair: 0x2a1c14, hairStyle: "bun", glasses: true, skin: 0xdfb594, trousers: 0x40424a, outfit: "tee" }),
    position: { x: CLUB_SEATS.mei.x, y: 0, z: -2.9 },
    rotationY: CLUB_SEATS.mei.yaw,
    pose: "stand",
  },
  {
    id: "an",
    name: "An",
    look: look({ shirt: 0x6a6f9a, hair: 0x201812, hairStyle: "short", skin: 0xd9ad8a, trousers: 0x33363f, outfit: "hoodie" }),
    position: { x: -4.5, y: 0, z: CLUB_SEATS.an.z },
    rotationY: CLUB_SEATS.an.yaw,
    pose: "stand",
  },
  {
    id: "rui",
    name: "Rui",
    look: look({ shirt: 0x6b7f8c, hair: 0x3a2a1e, hairStyle: "short", glasses: true, skin: 0xe2b898, trousers: 0x3b3a36, outfit: "tee" }),
    position: { x: CLUB_SEATS.rui.x, y: 0, z: 2.6 },
    rotationY: CLUB_SEATS.rui.yaw,
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

const enter = (actorId: string, to: Vec3, seat: Vec3, walk = 1.7): Beat[] => [
  { kind: "actor", actorId, action: "enter", to, pose: "stand", duration: 1.0 },
  { kind: "actor", actorId, action: "walk", to: seat, duration: walk },
  { kind: "actor", actorId, action: "pose", pose: "phone" },
];

const seat = (s: { x: number; z: number }): Vec3 => ({ x: s.x, y: 0, z: s.z });

const beats: Beat[] = [
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

  // ───────── 2. 我在看我（他们）─────────
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

  {
    kind: "narrate",
    pov: "watch",
    text: "A campus conversation club met each Thursday in a room that looked out over the library courtyard.",
    zh: "一个校园会话社每周四聚会，教室正对着图书馆庭院。",
    voice: "system",
    build: ["notice", "shelf"],
    camera: shot({ x: -4.4, y: 1.9, z: 3.5 }, { x: -3.4, y: 1.8, z: 3.0 }, { x: 0.5, y: 1.15, z: -1.0 }, 11),
  },
  {
    kind: "narrate",
    pov: "watch",
    text: "Its members could send a message in seconds, yet during shared breaks some sat together without knowing how to begin.",
    zh: "社员们几秒钟就能发出一条消息，可在共同的休息时间里，有些人坐在一起，却不知道怎样开口。",
    voice: "system",
    build: ["plants"],
    camera: shot({ x: 4.3, y: 1.7, z: 3.3 }, { x: 3.4, y: 1.65, z: 2.7 }, { x: -0.3, y: 1.0, z: -0.7 }, 11),
  },
  {
    kind: "narrate",
    pov: "watch",
    text: "Several said they felt lonely even while their screens filled with names, photos, and alerts.",
    zh: "好几个人说，哪怕屏幕上满是名字、照片和提醒，他们还是觉得孤单。",
    voice: "system",
    camera: shot({ x: 0.2, y: 1.45, z: 2.9 }, { x: 0.2, y: 1.3, z: 1.9 }, { x: 0.1, y: 0.95, z: -0.9 }, 9, { move: "push", fov: 40 }),
  },
  {
    kind: "narrate",
    pov: "watch",
    text: "The club asked a practical question: what kind of connection does this moment need?",
    zh: "社团提出了一个很实际的问题：这一刻需要怎样的连接？",
    voice: "system",
    build: ["board"],
    camera: shot({ x: -0.8, y: 1.6, z: 2.3 }, { x: 0.2, y: 1.55, z: 1.7 }, { x: 5.0, y: 1.45, z: -1.0 }, 9),
  },
  {
    kind: "gap",
    sentence: "To explore it, student organizers designed a four-week listening experiment for learning, not a scientific study.",
    zh: "为了探索这个问题，学生组织者设计了一项为期四周的倾听实验，目的是学习，而不是科学研究。",
    answerWordId: EXPERIMENT,
    decoyWordIds: [NOTIFICATION, MESSAGE],
    camera: GAP_HINT,
    build: ["plan"],
  },
  // 实验开始：大家放下手机，抬起头
  ...(["lin", "mei", "an", "rui", "me2026"] as const).map((id): Beat => ({ kind: "actor", actorId: id, action: "pose", pose: "listen" })),
  {
    kind: "narrate",
    pov: "watch",
    text: "At each session, members placed their devices in a basket for twenty minutes and took turns describing a small challenge.",
    zh: "每次活动中，成员们把设备放进篮子二十分钟，轮流讲述一个小小的难题。",
    voice: "system",
    build: ["basket", "clock"],
    camera: shot({ x: -1.8, y: 1.7, z: 1.9 }, { x: -2.6, y: 1.5, z: 1.2 }, { x: -4.4, y: 0.8, z: -2.9 }, 9),
  },
  {
    kind: "narrate",
    pov: "watch",
    text: "The listener had to ask one follow-up question and summarize what they had heard before replying.",
    zh: "倾听者必须先追问一个问题，并在回应之前概括自己听到的内容。",
    voice: "system",
    camera: shot({ x: 1.6, y: 1.6, z: 2.8 }, { x: 0.6, y: 1.5, z: 2.2 }, { x: 0.3, y: 1.05, z: -0.9 }, 9),
  },
  {
    kind: "gap",
    sentence: "The rule felt awkward at first, and some participants were anxious that an urgent message might arrive.",
    zh: "这条规则起初让人别扭，有些参与者担心会错过紧急消息。",
    answerWordId: ANXIOUS,
    decoyWordIds: [DEVICE, CONNECTION],
    camera: GAP_HINT,
  },
  {
    kind: "gap",
    sentence: "By the third session, a pause no longer seemed like a failure; it gave people time to choose words carefully.",
    zh: "到第三次活动时，沉默不再像是一种失败；它给了人们小心斟酌措辞的时间。",
    answerWordId: CAREFULLY,
    decoyWordIds: [CONVERSATION, DEVICE],
    camera: GAP_HINT,
  },

  // ───────── 3. 附身（我）─────────
  { kind: "actor", actorId: "lin", action: "pose", pose: "talk" },
  {
    kind: "choice",
    speaker: "Lin",
    line: "So… what do we actually talk about?",
    zh: "那……我们到底要聊什么呢？",
    options: [
      { wordId: CONVERSATION, reply: "A real conversation. Just that.", correct: true },
      { wordId: PURPOSE, reply: "Maybe we start with our purpose. Why are we here?", correct: true },
      { wordId: ALGORITHM, reply: "Whatever the algorithm shows us?", correct: false },
    ],
  },
  { kind: "actor", actorId: "lin", action: "pose", pose: "listen" },
  { kind: "actor", actorId: "rui", action: "pose", pose: "talk" },
  {
    kind: "choice",
    speaker: "Rui",
    line: "Phones in the basket, everyone. For one session, can we stay…",
    zh: "手机都放进篮子里吧。就这一次，我们能不能保持……",
    options: [
      { wordId: OFFLINE, reply: "Offline. Just for one session.", correct: true },
      { wordId: VIRTUAL, reply: "Virtual?", correct: false },
      { wordId: CYBER, reply: "Cyber?", correct: false },
    ],
  },
  { kind: "actor", actorId: "rui", action: "pose", pose: "listen" },

  // ───────── 4. 旧笔记本（纸）─────────
  {
    kind: "paper",
    page: {
      style: "notebook",
      title: "Thursday Notes",
      lines: [`Week 1: we put every {{${DEVICE}}} in a basket.`, `It felt strange to start a {{${CONVERSATION}}} without a screen.`, `Real {{${CONNECTION}}} needs {{${ATTENTION}}}.`],
      decoyWordIds: [ALGORITHM, PLATFORM, SCROLL],
    },
  },

  // ───────── 5. 定格 · 上浮 ─────────
  { kind: "actor", actorId: "mei", action: "pose", pose: "talk" },
  { kind: "actor", actorId: "lin", action: "pose", pose: "talk" },
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
  },
];

export const U01A_SCRIPT: MemoryScript = {
  id: "u01a",
  unitId: "unit01",
  section: "section_a",
  title: "Thursday's Silence",
  titleZh: "周四的沉默",
  stage: "clubRoom",
  pieces,
  actors,
  objects,
  beats,
  reward: { lightNode: "unit01:section_a" },
};
