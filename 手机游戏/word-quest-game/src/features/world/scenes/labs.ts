import * as THREE from "three";
import { archFrameGeo } from "../detailKit";
import * as props from "../sceneProps";
import { SCENE_SCALE, STAGE_Y, addBeacon, addCanvasPlane, createStage, finishStage, makeSignTexture, placePerson, type SceneModule, type Stage } from "./context";
import type { Frame } from "../sceneProps";

/**
 * 学习实验室与项目世界（12 个）：词汇 1–6 级庭院、语法工坊、填空台、翻译桥、阅读/听力/写作/记忆项目。
 * 以 worldId 为键分发（见 unitLandscape.addLearningSceneLandmark）。
 */

const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial => {
  const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  m.fog = false;
  return m;
};

function floorDisc(s: Stage, r = 3.7): void {
  s.f.cyl(s.k.p.fabricGrey, r, r, 0.04, 0, 0, 0, 40);
  s.f.cyl(s.k.p.fabricCream, r - 0.5, r - 0.5, 0.05, 0, 0, 0, 40);
}

function sides(s: Stage, z = 1.8): void {
  props.lampPost(s.k, s.f.child(-4.8, 0, z));
  props.lampPost(s.k, s.f.child(4.8, 0, z));
  props.planter(s.k, s.f.child(-4.3, 0, z + 1.0), 0.5, 41);
  props.planter(s.k, s.f.child(4.3, 0, z + 1.0), 0.5, 43);
}

/** 单词石：石座 + 铜帽 + 悬浮发光词卡 */
function wordStone(s: Stage, ctx: Parameters<SceneModule>[0], lx: number, lz: number, h: number, i: number, big = false): void {
  const { m } = s.k;
  const t = s.f.child(lx, 0, lz, i * 0.3);
  const r = big ? 0.55 : 0.4;
  t.cyl(m.stoneDark, r + 0.14, r + 0.2, 0.2, 0, 0, 0, 8);
  t.cyl(m.stone, r, r + 0.08, h, 0, 0.2, 0, 8);
  t.cyl(m.brass, r + 0.06, r + 0.06, 0.06, 0, 0.2 + h, 0, 8);
  const card = new THREE.Mesh(new THREE.OctahedronGeometry((big ? 0.3 : 0.2) * SCENE_SCALE, 1), i % 2 ? ctx.edge : ctx.glow);
  card.position.set(-lx * SCENE_SCALE, STAGE_Y + (h + 0.7 + (big ? 0.2 : 0)) * SCENE_SCALE, 27 - lz * SCENE_SCALE);
  card.userData.isLandscapeBeacon = true;
  ctx.root.add(card);
}

/** 小路石板：沿点列铺一条发白的路径 */
function stepPath(f: Frame, k: props.SceneKit, pts: Array<[number, number]>): void {
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const n = Math.max(1, Math.round(Math.hypot(bx - ax, bz - az) / 0.45));
    for (let j = 1; j < n; j++) {
      const t = j / n;
      f.box(j % 2 ? k.m.paveA : k.m.paveB, 0.34, 0.03, 0.26, ax + (bx - ax) * t, 0.04, az + (bz - az) * t, 0.01, 0, Math.atan2(bx - ax, bz - az));
    }
  }
}

const LEVELS: Record<number, { pts: Array<[number, number]>; h: (i: number) => number }> = {
  1: { pts: Array.from({ length: 5 }, (_, i) => [Math.cos((i / 5) * Math.PI * 2 - 0.6) * 2.7, Math.sin((i / 5) * Math.PI * 2 - 0.6) * 2.2 - 0.2] as [number, number]), h: (i) => 0.7 + (i % 2) * 0.2 },
  2: { pts: [[-3.2, 1.2], [-1.6, 0.6], [0, 0], [1.6, -0.6], [3.2, -1.2]], h: (i) => 0.5 + i * 0.28 },
  3: { pts: [[-3, 1.2], [-1.5, 0.2], [0, -0.9], [1.5, 0.2], [3, 1.2]], h: (i) => [0.7, 0.55, 1.4, 0.55, 0.7][i] },
  4: { pts: [[0, -1.8], [-2.6, 0], [0, 0], [2.6, 0], [0, 1.9]], h: (i) => (i === 2 ? 1.2 : 0.7) },
  5: { pts: Array.from({ length: 5 }, (_, i) => [Math.cos(-Math.PI / 2 + i * 1.12) * (0.9 + i * 0.5), Math.sin(-Math.PI / 2 + i * 1.12) * (0.7 + i * 0.4)] as [number, number]), h: (i) => 0.6 + i * 0.12 },
  6: { pts: [[-2.7, -1.3], [-2.7, 1.3], [0, 0], [2.7, -1.3], [2.7, 1.3]], h: (i) => (i === 2 ? 1.5 : 0.75) },
};

/** 词汇庭院：五座刻字单词石围成不同阵型，中央是各级特有的阅读桌 / 树 / 方尖碑，一位学习者在其间背词 */
const vocabScene = (level: number): SceneModule => (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  const layout = LEVELS[level] ?? LEVELS[1];
  floorDisc(s, 4.0);
  stepPath(f, k, layout.pts);
  layout.pts.forEach(([x, z], i) => wordStone(s, ctx, x, z, layout.h(i), i, level === 6 && i === 2));
  // 中央陈设
  if (level === 1) {
    props.roundTable(k, f.child(0, 0, -0.2), 0.55, 0.74);
    props.bookStack(k, f.child(0, 0.74, -0.2, 0.3), 4, 7);
  } else if (level === 2) {
    props.stairs(k, f.child(0, 0, -2.6), 3.2, 4);
    props.openBook(k, f.child(-1.0, 0, 1.9, 0.2));
  } else if (level === 3) {
    f.cyl(m.stoneDark, 0.9, 1.0, 0.1, 0, 0, 0.6, 20);
    props.waterDisc(k, f.child(0, 0.1, 0.6), 0.8);
  } else if (level === 4) {
    props.lectern(k, f.child(0, 0, 0.9));
  } else if (level === 5) {
    props.planter(k, f.child(0, 0, 0.2), 0.7, 61);
  } else {
    f.cyl(m.stoneDark, 0.8, 0.9, 0.2, 0, 0, 0, 12);
    f.cyl(m.stone, 0.32, 0.5, 2.4, 0, 0.2, 0, 4);
    f.cyl(m.brass, 0.05, 0.32, 0.4, 0, 2.6, 0, 4);
  }
  props.bench(k, f.child(-2.9, 0, 2.2, 0.4), 1.5);
  props.bench(k, f.child(2.9, 0, 2.2, -0.4), 1.5);
  placePerson(ctx, { shirt: [0x6a8aa8, 0xc18168, 0x79aaa5, 0xc79a3a, 0xb04a40, 0x496c72][(level - 1) % 6], hair: 0x2b1d16, pose: level % 2 ? "read" : "phone", backpack: 0x3b5f8f }, level === 4 ? 1.2 : 0.2, 0, 1.9, level % 2 ? 0.2 : -0.3);
  ctx.ring(4.6 * SCENE_SCALE, STAGE_Y + 0.08, Math.PI / 2);
  sides(s, 2.4);
  finishStage(s, `scene-lab-vocab-${level}`);
};

function chalkTexture(lines: Array<[string, number, number, string]>, bg = "#243b34", w = 1024, h = 560): THREE.CanvasTexture | undefined {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (const [text, x, y, color] of lines) {
    g.fillStyle = color;
    g.font = text.length > 16 ? "bold 40px Arial, sans-serif" : "bold 64px Arial, sans-serif";
    g.fillText(text, x, y);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** 语法工坊：黑板上的句子结构图（主语 + 谓语 + 宾语），台前一排可拼接的字母方块与讲解的老师、听讲的学生 */
const grammarScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  floorDisc(s);
  const bd = f.child(0, 0, -2.4);
  bd.box(m.stoneDark, 6.4, 0.2, 0.8, 0, 0, 0);
  for (const sx of [-1, 1]) bd.box(m.woodDark, 0.18, 4.0, 0.22, sx * 3.0, 0.2, 0, 0.02);
  bd.box(m.woodDark, 6.4, 0.2, 0.3, 0, 4.0, 0, 0.02);
  bd.box(m.woodDark, 5.9, 3.5, 0.1, 0, 0.45, 0, 0.02);
  const tex = chalkTexture([
    ["Subject", 220, 150, "#9ee7ff"], ["+", 380, 150, "#f6eedb"], ["Verb", 520, 150, "#ffd58a"], ["+", 660, 150, "#f6eedb"], ["Object", 830, 150, "#ffb3a8"],
    ["The students  read  new books.", 512, 330, "#f6eedb"],
    ["S            V            O", 512, 420, "#9ec9b6"],
  ]);
  addCanvasPlane(ctx, tex, 0, 0.45 + 1.75, -2.4 + 0.07, 5.5, 3.2);
  // 粉笔槽 + 方块
  bd.box(m.wood, 5.6, 0.08, 0.2, 0, 0.4, 0.2, 0.02);
  const tones = [0x62b7d8, 0xd9a441, 0xd9685a, 0x6fae7e];
  for (let i = 0; i < 4; i++) f.box(std(tones[i], 0.6), 0.34, 0.34, 0.34, -1.3 + i * 0.5, 0.78, 0.3, 0.04, 0, i * 0.2);
  props.table(k, f.child(0, 0, 0.3), 2.8, 0.7, 0.78, m.wood);
  props.openBook(k, f.child(1.0, 0.78, 0.3, 0.2));
  addBeacon(ctx, ctx.glow, 0, 4.9, -2.1, 0.22);
  placePerson(ctx, { shirt: 0x496c72, hair: 0x555555, glasses: true, pose: "point" }, -1.9, 0, 0.3, 0.3);
  props.chair(k, f.child(1.7, 0, 1.6, Math.PI), m.woodDark);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, hairStyle: "bun", seated: true, pose: "write" }, 1.7, 0.45, 1.6, Math.PI);
  sides(s);
  finishStage(s, "scene-lab-grammar");
};

/** 填空台：石碑上刻着带空格的句子，下方木架上三块答案牌（一块发光），一位学生拿着选项 */
const clozeScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  floorDisc(s);
  const w = f.child(0, 0, -2.2);
  w.box(m.stoneDark, 5.8, 0.3, 1.0, 0, 0, 0, 0.04);
  w.box(m.stone, 5.4, 3.2, 0.5, 0, 0.3, 0, 0.05);
  w.box(m.stoneDark, 5.7, 0.2, 0.62, 0, 3.5, 0, 0.04);
  const tex = chalkTexture([["The sun ______ in the east.", 512, 200, "#2a2a2a"], ["( rises / rose / rising )", 512, 380, "#7a6a4a"]], "#e8dec6");
  addCanvasPlane(ctx, tex, 0, 2.0, -2.2 + 0.28, 4.8, 2.4);
  // 答案架
  const rack = f.child(0, 0, 0.4);
  rack.box(m.woodDark, 4.0, 0.1, 0.6, 0, 0.7, 0, 0.02);
  for (const sx of [-1, 1]) rack.box(m.woodDark, 0.12, 0.7, 0.5, sx * 1.9, 0, 0, 0.02);
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * 1.25;
    rack.box(m.paper, 1.0, 0.5, 0.06, x, 0.8, 0.1, 0.02, -0.25);
    rack.box(std([0x62b7d8, 0xd9a441, 0xd9685a][i], 0.7), 0.7, 0.08, 0.02, x, 1.05, 0.15, 0.005, -0.25);
  }
  addBeacon(ctx, ctx.glow, 0, 1.9, 0.4, 0.17);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, pose: "point", backpack: 0xc79a3a }, -2.4, 0, 1.4, 0.4);
  placePerson(ctx, { shirt: 0xc79a3a, hair: 0x555555, pose: "listen", glasses: true }, 2.4, 0, 1.4, -0.4);
  props.signpost(k, f.child(3.5, 0, -0.4), [{ yaw: -0.5, len: 0.9, tone: k.p.fabricGreen }], 1.8);
  sides(s);
  finishStage(s, "scene-lab-cloze");
};

/** 翻译桥：两张书桌（英文 / 中文）面对面，中间一座发光的拱门作为"桥"，桌上词典与稿纸 */
const translationScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  floorDisc(s);
  f.put(archFrameGeo(3.6, 2.4, 0.5, 0.06), m.stone, 0, 0, -0.8);
  for (const sx of [-1, 1]) f.box(m.stoneDark, 0.8, 0.3, 0.9, sx * 1.8, 0, -0.8, 0.04);
  const bridge = ctx.ring(2.0 * SCENE_SCALE, STAGE_Y + 2.6 * SCENE_SCALE, 0);
  bridge.position.z = 27 + 0.8 * SCENE_SCALE;
  for (const sx of [-1, 1]) {
    const d = f.child(sx * 2.9, 0, 0.6, -sx * 0.35);
    props.desk(k, d, 1.6, 0.8, 0.76);
    props.openBook(k, d.child(-0.3, 0.76, 0.0, 0.2));
    props.bookStack(k, d.child(0.45, 0.76, 0.0), 4, sx > 0 ? 3 : 5);
    props.chair(k, d.child(0, 0, 0.95, Math.PI), m.woodDark);
    placePerson(ctx, { shirt: sx < 0 ? 0x6a8aa8 : 0xb04a40, hair: 0x2b1d16, hairStyle: sx < 0 ? undefined : "bun", seated: true, pose: "write" }, sx * 2.9 + (-sx * 0.35) * 0.0, 0.45, 1.6, Math.PI);
  }
  const en = makeSignTexture([{ text: "EN", y: 90, font: "bold 90px Arial, sans-serif" }], { width: 400, height: 180, background: "#2f4a6a" });
  const zh = makeSignTexture([{ text: "中文", y: 90, font: "bold 90px 'Microsoft YaHei', sans-serif" }], { width: 400, height: 180, background: "#7a3a36" });
  addCanvasPlane(ctx, en, -2.9, 2.2, 0.6, 1.2, 0.54);
  addCanvasPlane(ctx, zh, 2.9, 2.2, 0.6, 1.2, 0.54);
  addBeacon(ctx, ctx.glow, 0, 1.6, -0.8, 0.28);
  addBeacon(ctx, ctx.edge, -0.7, 1.2, 0.1, 0.12);
  addBeacon(ctx, ctx.edge, 0.7, 1.2, 0.1, 0.12);
  sides(s, 2.4);
  finishStage(s, "scene-lab-translation");
};

/** 阅读项目：高书架环绕的阅读室，中央一张大阅读桌、台灯与读者，滚动梯倚着书架 */
const readingScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  floorDisc(s);
  for (const [x, z, yaw, seed] of [[-3.4, -1.2, 0.5, 71], [0, -2.6, 0, 73], [3.4, -1.2, -0.5, 75]] as const) {
    props.bookshelf(k, f.child(x, 0, z, yaw), 2.6, 3.2, 7, seed);
  }
  props.ladder(k, f.child(1.7, 0, -2.3), 2.6);
  props.table(k, f.child(0, 0, 0.5), 3.0, 1.0, 0.78, m.wood);
  props.openBook(k, f.child(-0.8, 0.78, 0.5, 0.1));
  props.openBook(k, f.child(0.9, 0.78, 0.6, -0.2));
  props.bookStack(k, f.child(0, 0.78, 0.2, 0.3), 5, 9);
  const lamp = f.child(-1.3, 0.78, 0.2);
  lamp.cyl(m.brass, 0.1, 0.12, 0.04, 0, 0, 0, 12);
  lamp.strut(m.brass, [0, 0.04, 0], [0.05, 0.5, 0], 0.012);
  lamp.cyl(k.p.fabricGreen, 0.04, 0.14, 0.14, 0.05, 0.5, 0, 12);
  addBeacon(ctx, ctx.glow, -1.25, 1.55, 0.2, 0.14);
  for (const sx of [-1, 1]) {
    props.chair(k, f.child(sx * 0.9, 0, 1.7, Math.PI), m.woodDark);
    placePerson(ctx, { shirt: sx < 0 ? 0x6a8aa8 : 0xc18168, hair: 0x2b1d16, hairStyle: sx < 0 ? undefined : "bun", glasses: sx < 0, seated: true, pose: "read" }, sx * 0.9, 0.45, 1.7, Math.PI);
  }
  ctx.ring(4.6 * SCENE_SCALE, STAGE_Y + 0.08, Math.PI / 2);
  sides(s, 2.2);
  finishStage(s, "scene-project-reading");
};

/** 听力项目：小型演播台——两只落地音箱、调音台、麦克风与同心声波环，听者戴着耳机坐在台前 */
const listeningScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  floorDisc(s);
  const speaker = (x: number): void => {
    const sp = f.child(x, 0, -1.3, -x * 0.1);
    sp.box(m.darkSteel, 1.1, 2.0, 0.8, 0, 0, 0, 0.05);
    sp.cyl(m.steel, 0.38, 0.38, 0.06, 0, 1.2, 0.4, 24);
    sp.put(new THREE.CylinderGeometry(0.34, 0.34, 0.06, 24), m.darkSteel, 0, 1.4, 0.44, Math.PI / 2);
    sp.put(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 20), m.darkSteel, 0, 0.55, 0.43, Math.PI / 2);
    sp.put(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16), m.steel, 0, 1.4, 0.47, Math.PI / 2);
  };
  speaker(-3.0);
  speaker(3.0);
  // 调音台
  const desk = f.child(0, 0, 0.1);
  props.desk(k, desk, 2.8, 0.9, 0.78);
  desk.box(m.darkSteel, 2.2, 0.08, 0.6, 0, 0.78, 0, 0.02, -0.2);
  for (let i = 0; i < 8; i++) desk.cyl(m.brass, 0.03, 0.03, 0.04, -0.95 + i * 0.27, 0.86, 0.1, 10);
  props.monitor(k, desk.child(0.95, 0.78, -0.15), 0.5, 0.3);
  // 麦克风架
  const mic = f.child(-1.9, 0, 0.8);
  mic.cyl(m.darkSteel, 0.2, 0.22, 0.04, 0, 0, 0, 14);
  mic.strut(m.steel, [0, 0.04, 0], [0, 1.5, 0], 0.015);
  mic.ball(m.darkSteel, 0.06, 0, 1.58, 0, 1, 1.5, 1);
  props.chair(k, f.child(0.4, 0, 1.6, Math.PI), m.woodDark);
  placePerson(ctx, { shirt: 0x496c72, hair: 0x2b1d16, seated: true, pose: "listen", glasses: true }, 0.4, 0.45, 1.6, Math.PI);
  placePerson(ctx, { shirt: 0xc79a3a, hair: 0x555555, pose: "talk", scarf: 0xb04a40 }, -1.9, 0, 1.4, 0.4);
  for (const r of [2.4, 3.6, 4.8]) {
    const wave = ctx.ring(r * SCENE_SCALE * 0.8, STAGE_Y + 0.16 + r * 0.35, Math.PI / 2.15);
    wave.userData.isLandscapeRing = true;
  }
  addBeacon(ctx, ctx.glow, 0, 2.4, -0.8, 0.2);
  sides(s, 2.4);
  finishStage(s, "scene-project-listening");
};

/** 写作项目：写字台 + 稿纸、笔与墨水、发光台灯、软木板上的便签，作者伏案写作 */
const writingScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  floorDisc(s);
  const cork = f.child(0, 0, -2.4);
  cork.box(m.woodDark, 5.6, 3.0, 0.12, 0, 0.8, 0, 0.03);
  cork.box(std(0xb98b57, 0.95), 5.3, 2.7, 0.05, 0, 0.95, 0.07, 0.01);
  const notes = [0xf6e28a, 0xf2a7a0, 0x9ee0c4, 0xa9c8f2, 0xf6e28a, 0xf2a7a0, 0x9ee0c4, 0xa9c8f2];
  notes.forEach((c, i) => cork.box(std(c, 0.9), 0.7, 0.7, 0.02, -2.0 + (i % 4) * 1.35, 1.2 + Math.floor(i / 4) * 1.15, 0.11, 0.01, 0, (i % 3 - 1) * 0.08));
  const desk = f.child(0, 0, 0.5);
  props.desk(k, desk, 3.2, 1.2, 0.78);
  desk.box(m.paper, 1.0, 0.03, 0.72, -0.2, 0.78, 0.1, 0.005, 0, 0.08);
  desk.box(m.paper, 0.9, 0.05, 0.65, 0.9, 0.78, -0.2, 0.005, 0, -0.1);
  desk.cyl(std(0x1d2b4d, 0.2, 0.2), 0.07, 0.08, 0.1, 1.2, 0.78, 0.3, 12);
  desk.strut(m.brass, [-0.1, 0.8, 0.1], [0.4, 0.95, 0.1], 0.012);
  props.laptop(k, desk.child(-1.1, 0.78, -0.2, 0.2));
  const lamp = desk.child(1.3, 0.78, -0.35);
  lamp.cyl(m.brass, 0.1, 0.12, 0.04, 0, 0, 0, 12);
  lamp.strut(m.brass, [0, 0.04, 0], [-0.1, 0.55, 0], 0.012);
  lamp.cyl(k.p.fabricGreen, 0.04, 0.14, 0.14, -0.1, 0.55, 0, 12);
  addBeacon(ctx, ctx.glow, 1.2, 1.7, 0.15, 0.14);
  props.chair(k, f.child(0, 0, 1.9, Math.PI), m.woodDark);
  placePerson(ctx, { shirt: 0x496c72, hair: 0x555555, glasses: true, seated: true, pose: "write", lean: 0.12 }, 0, 0.45, 1.9, Math.PI);
  f.cyl(m.darkSteel, 0.2, 0.17, 0.4, 2.7, 0, 1.0, 12);
  for (let i = 0; i < 3; i++) f.ball(m.paper, 0.1, 2.65 + i * 0.05, 0.5 + i * 0.1, 1.0);
  sides(s, 2.4);
  finishStage(s, "scene-project-writing");
};

/** 记忆项目：记忆宫殿——圆顶凉亭里放着地球仪，四周四座发光"记忆站"沿环形小径排开，树与长椅点缀 */
const memoryScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  floorDisc(s, 4.1);
  props.gazebo(k, f.child(0, 0, -0.6), 1.6, m.slate);
  props.globe(k, f.child(0, 0.2, -0.6), 0.28);
  f.cyl(m.stoneDark, 0.3, 0.4, 0.2, 0, 0, -0.6, 12);
  for (let i = 0; i < 4; i++) {
    const x = (i - 1.5) * 1.9;
    const z = 1.3 - Math.abs(i - 1.5) * 0.45;
    wordStone(s, ctx, x, z, 0.8, i);
  }
  stepPath(f, k, [[-3.2, 1.6], [-1.9, 1.2], [0, 1.0], [1.9, 1.2], [3.2, 1.6]]);
  props.bench(k, f.child(-3.0, 0, -0.9, 0.6), 1.4);
  props.bench(k, f.child(3.0, 0, -0.9, -0.6), 1.4);
  placePerson(ctx, { shirt: 0xb04a40, hair: 0x2b1d16, hairStyle: "bun", pose: "read" }, -0.8, 0, 2.3, 0.2);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x555555, pose: "talk", glasses: true }, 0.8, 0, 2.3, -0.3);
  ctx.ring(4.8 * SCENE_SCALE, STAGE_Y + 0.08, Math.PI / 2);
  sides(s, 2.8);
  finishStage(s, "scene-project-memory");
};

export const LAB_SCENES: Record<string, SceneModule> = {
  "lab-vocab-1": vocabScene(1),
  "lab-vocab-2": vocabScene(2),
  "lab-vocab-3": vocabScene(3),
  "lab-vocab-4": vocabScene(4),
  "lab-vocab-5": vocabScene(5),
  "lab-vocab-6": vocabScene(6),
  "lab-grammar": grammarScene,
  "lab-cloze": clozeScene,
  "lab-translation": translationScene,
  "project-reading": readingScene,
  "project-listening": listeningScene,
  "project-writing": writingScene,
  "project-memory": memoryScene,
};
