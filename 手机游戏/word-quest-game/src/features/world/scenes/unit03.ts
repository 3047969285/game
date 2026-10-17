import * as THREE from "three";
import { archFrameGeo } from "../detailKit";
import { createPine, createTree } from "../props";
import * as props from "../sceneProps";
import { SCENE_SCALE, STAGE_Y, addBeacon, addCanvasPlane, createStage, finishStage, makeRouteMap, makeSignTexture, placePerson, worldXZ, type SceneModule } from "./context";

/**
 * 单元 3「罗盘海岸」12 个段落场景（旅行主题）。
 * A：行程 · 绕路 · 集市偶遇 · 反思花园　B：旅舍 · 开放路线 · 雨棚 · 自信　C：站台 · 车厢 · 车窗风景 · 路网
 */

/** 沿折线铺设小径：每段一块倒角石板 / 土径，带轻微随机偏转 */
function trail(s: ReturnType<typeof createStage>, pts: Array<[number, number]>, tone: THREE.Material, width = 0.8, step = 0.6): void {
  const { f } = s;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, z0] = pts[i];
    const [x1, z1] = pts[i + 1];
    const len = Math.hypot(x1 - x0, z1 - z0);
    const ang = Math.atan2(x1 - x0, z1 - z0);
    const n = Math.max(1, Math.round(len / step));
    for (let j = 0; j < n; j++) {
      const t = (j + 0.5) / n;
      f.box(tone, width, 0.05, step * 0.82, x0 + (x1 - x0) * t, 0, z0 + (z1 - z0) * t, 0.02, 0, ang + Math.sin(i * 7 + j * 3) * 0.08);
    }
  }
}

/** 程序化风景画：渐变天空、太阳、三层远山、田野 */
function makeLandscape(): THREE.CanvasTexture | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 700;
  const g = canvas.getContext("2d");
  if (!g) return undefined;
  const sky = g.createLinearGradient(0, 0, 0, 420);
  sky.addColorStop(0, "#7fb2de");
  sky.addColorStop(1, "#f6e7c4");
  g.fillStyle = sky;
  g.fillRect(0, 0, 1200, 700);
  g.fillStyle = "#fff4c8";
  g.beginPath();
  g.arc(880, 180, 62, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "rgba(255,255,255,0.8)";
  for (const [x, y, w] of [[200, 120, 160], [520, 90, 120], [1020, 80, 140]] as const) {
    g.beginPath();
    g.ellipse(x, y, w, 28, 0, 0, Math.PI * 2);
    g.fill();
  }
  const layers: Array<[string, number, number]> = [["#8aa7b8", 330, 90], ["#6f9a86", 400, 70], ["#4f7f5a", 470, 50]];
  for (const [color, base, amp] of layers) {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(0, 700);
    for (let x = 0; x <= 1200; x += 20) g.lineTo(x, base - Math.abs(Math.sin(x * 0.006 + base)) * amp - Math.sin(x * 0.017) * 14);
    g.lineTo(1200, 700);
    g.fill();
  }
  g.fillStyle = "#b9c98a";
  g.fillRect(0, 560, 1200, 140);
  g.strokeStyle = "rgba(60,90,40,0.45)";
  g.lineWidth = 3;
  for (let i = 0; i < 12; i++) {
    g.beginPath();
    g.moveTo(i * 120 - 100, 700);
    g.lineTo(560 + (i - 6) * 20, 560);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ───────────────────────── Section A ─────────────────────────

/** 行程：整面路线地图 + 行李车 + 岔路路标 + 路边小店，旅行者在向店主问路 */
export const itineraryScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const pins: Array<[number, number]> = [[0.12, 0.72], [0.3, 0.3], [0.52, 0.58], [0.74, 0.25], [0.9, 0.7]];
  const wall = f.child(0, 0, -2.4, 0);
  wall.box(m.stoneDark, 6.6, 0.2, 0.8, 0, 0, 0, 0.03);
  for (const sx of [-1, 1]) wall.cyl(m.woodDark, 0.09, 0.1, 3.5, sx * 3.2, 0.2, 0, 12);
  wall.box(m.woodDark, 6.7, 0.2, 0.3, 0, 3.5, 0, 0.03);
  wall.box(m.woodDark, 6.2, 2.9, 0.1, 0, 0.55, 0, 0.03);
  addCanvasPlane(ctx, makeRouteMap(pins), 0, 0.55 + 1.45, -2.4 + 0.07, 5.8, 2.65);
  pins.forEach(([px, py]) => addBeacon(ctx, ctx.glow, (px - 0.5) * 5.8 * -1 * -1, 0.55 + 0.1 + (1 - py) * 2.65, -2.2, 0.12));
  // 行李车：推车 + 两只箱子 + 背包
  const cart = f.child(-4.0, 0, 0.4, 0.4);
  cart.box(m.darkSteel, 1.2, 0.06, 0.8, 0, 0.3, 0, 0.015);
  for (const [x, z] of [[-0.5, -0.32], [0.5, -0.32], [-0.5, 0.32], [0.5, 0.32]]) cart.put(new THREE.TorusGeometry(0.12, 0.035, 8, 16), m.darkSteel, x, 0.15, z, 0, Math.PI / 2);
  cart.strut(m.darkSteel, [-0.55, 0.33, -0.3], [-0.55, 1.15, -0.3], 0.02, 6);
  cart.strut(m.darkSteel, [-0.55, 0.33, 0.3], [-0.55, 1.15, 0.3], 0.02, 6);
  cart.strut(m.darkSteel, [-0.55, 1.15, -0.3], [-0.55, 1.15, 0.3], 0.02, 6);
  props.suitcase(k, cart.child(0.1, 0.33, 0, 0.1), 0.6, 0.5, 0.34, p.fabricBlue);
  props.suitcase(k, cart.child(0.1, 0.8, 0, -0.2), 0.5, 0.36, 0.3, p.fabricRed);
  // 岔路路标 + 小径
  const dirt = std(0x7a6a4c);
  trail(s, [[-2.8, 1.8], [-1.0, 1.0], [0.8, 1.3], [2.6, 0.9]], dirt, 0.9, 0.6);
  trail(s, [[0.8, 1.3], [0.2, 2.4], [-0.4, 3.2]], m.paveA, 0.6, 0.55);
  props.signpost(k, f.child(1.6, 0, 0.5, 0.3), [{ yaw: Math.PI / 2 - 0.4, len: 1.1 }, { yaw: -Math.PI / 2 + 0.3, len: 0.9, tone: m.copper }]);
  addBeacon(ctx, ctx.glow, 1.6, 3.1, 0.5, 0.12);
  // 路边小店：木板房 + 招牌 + 柜台 + 店主
  const shop = f.child(4.1, 0, -0.7, -0.35);
  props.house(k, shop, 2.5, 2.7, 1.8, m.terracottaRoof, p.fabricCream);
  props.table(k, shop.child(0, 0, 1.55), 1.8, 0.6, 0.9, m.wood);
  for (let i = 0; i < 4; i++) shop.cyl(p.ceramic, 0.09, 0.08, 0.2, -0.6 + i * 0.4, 0.9, 1.5, 12);
  addBeacon(ctx, ctx.glow, 3.7, 3.3, -0.1, 0.15);
  placePerson(ctx, { shirt: 0xc79a3a, hair: 0x3a2a1c, pose: "talk" }, 4.0, 0, 0.55, 0.2);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0xb04a40, pose: "point" }, 2.9, 0, 1.3, -1.0);
  props.lampPost(k, f.child(-4.9, 0, 2.2));
  props.lampPost(k, f.child(4.9, 0, 2.6));
  finishStage(s, "scene-itinerary");
};

function std(color: number, roughness = 0.9): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });
  m.fog = false;
  return m;
}

/** 绕路：大石堵住主路，蜿蜒小径绕行，警示栏与路标指向新路线 */
export const detourScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  // 主路（被堵）
  trail(s, [[-4.8, 2.6], [-2.4, 2.4], [0, 1.8]], m.paveA, 0.9, 0.6);
  // 滑落的岩石堆
  for (const [x, z, r] of [[-0.5, 1.4, 0.85], [0.5, 1.8, 0.7], [0.1, 0.8, 0.6], [1.2, 1.1, 0.5], [-1.1, 0.9, 0.45]] as const) {
    f.put(new THREE.DodecahedronGeometry(r, 1), m.rock, x, r * 0.6, z, x, z, 0, 1.2, 0.8, 1);
  }
  for (let i = 0; i < 18; i++) f.put(new THREE.DodecahedronGeometry(0.08 + (i % 4) * 0.03, 0), m.stoneDark, -1.6 + (i % 6) * 0.65, 0.06, 0.6 + Math.floor(i / 6) * 0.5, i, i * 2, 0);
  // 警示栏：红白相间横杆 + 立柱 + 告示牌
  for (const sx of [-1, 1]) f.cyl(m.woodDark, 0.05, 0.06, 1.0, sx * 1.8, 0, 2.2, 8);
  for (let i = 0; i < 6; i++) f.box(i % 2 ? p.fabricCream : p.fabricRed, 0.55, 0.14, 0.04, -1.4 + i * 0.56, 0.7, 2.2, 0.01);
  f.box(m.darkSteel, 0.9, 0.5, 0.04, 0, 1.15, 2.2, 0.02);
  f.box(p.fabricRed, 0.7, 0.3, 0.01, 0, 1.25, 2.23, 0.005);
  // 绕行小径（弧形）+ 路标
  const dirt = std(0x7a6a4c);
  trail(s, [[-2.4, 2.4], [-3.0, 0.4], [-1.6, -1.6], [1.2, -2.0], [3.6, -0.6], [4.6, 1.8]], dirt, 0.85, 0.55);
  props.signpost(k, f.child(-2.6, 0, 1.9, 0.2), [{ yaw: -Math.PI / 2 + 0.2, len: 1.1, tone: m.copper }]);
  props.signpost(k, f.child(3.8, 0, 0.4, -0.2), [{ yaw: Math.PI / 2 + 0.5, len: 1.0, tone: m.copper }]);
  addBeacon(ctx, ctx.glow, -2.6, 3.1, 1.9, 0.14);
  addBeacon(ctx, ctx.glow, 3.8, 3.1, 0.4, 0.14);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, backpack: 0x2f5d8a, scarf: 0xe0b04a, pose: "walk" }, -2.9, 0, -0.3, 0.5);
  // 小树
  for (const [x, z, sc] of [[-4.6, -1.2, 1.1], [4.8, -1.8, 1.0], [0.4, -3.2, 1.3]] as const) {
    const t = createPine(sc);
    const [wx, wz] = worldXZ(x, z);
    t.position.set(wx, STAGE_Y, wz);
    ctx.root.add(t);
  }
  props.lampPost(k, f.child(-4.8, 0, 3.0));
  finishStage(s, "scene-detour");
};

/** 集市偶遇：两座对望的摊位 + 满地的石板，两位旅行者在摊间相遇，头顶的灯串 */
export const marketEncounterScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.7, 3.8, 0.05, 0, 0, 0, 40);
  [-3.4, 3.4].forEach((x, i) => {
    const st = f.child(x, 0, -0.2, -x * 0.07);
    props.awning(k, st.child(0, 0, -1.0, Math.PI), 2.6, 1.3, 8, i === 0 ? p.fabricRed : p.fabricBlue, p.fabricCream);
    props.table(k, st.child(0, 0, 0.3), 2.2, 0.7, 0.85, m.wood);
    for (let j = 0; j < 6; j++) {
      const tone = [0xd94b3d, 0xf2a93b, 0x7ab648, 0xe06b8f, 0x6a4bd9, 0xf2c14e][j];
      st.put(new THREE.SphereGeometry(0.1, 10, 8), std(tone, 0.6), -0.8 + j * 0.32, 0.95, 0.3 + (j % 2) * 0.12);
    }
    props.crate(k, st.child(-1.4, 0, -0.5, 0.2), 0.6, 0.45, 0.5);
    props.barrel(k, st.child(1.4, 0, -0.5), 0.26, 0.65);
    for (let j = 0; j < 3; j++) props.bookStack(k, st.child(-0.6 + j * 0.6, 0.85, 0.6, j), 2 + j, 20 + j);
  });
  // 灯串：悬垂曲线 + 灯泡
  const pts = [-3.6, -1.8, 0, 1.8, 3.6].map((x, i) => new THREE.Vector3(...worldPos(x, 3.2 - (i === 2 ? 0.55 : i % 2 ? 0.3 : 0), -0.4)));
  const wire = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.02, 5, false), std(0x23282d));
  wire.userData.isLandscapeRoute = true;
  ctx.root.add(wire);
  for (let i = 0; i < 9; i++) {
    const v = new THREE.CatmullRomCurve3(pts).getPoint(i / 8);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1 * SCENE_SCALE, 10, 8), ctx.glow);
    bulb.position.copy(v).add(new THREE.Vector3(0, -0.12, 0));
    bulb.userData.isLandscapeBeacon = i % 2 === 0;
    ctx.root.add(bulb);
  }
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0xb04a40, pose: "talk" }, -0.8, 0, 1.4, 0.45);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, scarf: 0x4d7a55, pose: "listen" }, 0.8, 0, 1.4, -0.45);
  props.planter(k, f.child(-1.7, 0, 3.0), 0.5, 22);
  props.planter(k, f.child(1.7, 0, 3.0), 0.5, 24);
  props.lampPost(k, f.child(-4.9, 0, 2.0));
  props.lampPost(k, f.child(4.9, 0, 2.0));
  finishStage(s, "scene-market-encounter");
};

/** 反思花园：层层退台的花坛、倒影池与汀步、长椅与石灯，一位旅人在日记本上记录 */
export const reflectionGardenScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  // 退台花坛（后高前低）
  for (let i = 0; i < 4; i++) {
    const z = -3.0 + i * 0.75;
    const w = 7.6 - i * 0.9;
    f.box(m.stoneDark, w, 0.35 + (3 - i) * 0.3, 0.7, 0, 0, z, 0.04);
    f.box(m.soil, w - 0.2, 0.05, 0.5, 0, 0.33 + (3 - i) * 0.3, z, 0.01);
    for (let j = 0; j < Math.floor(w / 0.6); j++) {
      f.ball(j % 2 ? m.leafLight : m.leaf, 0.2 + (j % 3) * 0.04, -w / 2 + 0.4 + j * 0.6, 0.55 + (3 - i) * 0.3, z, 1, 0.8, 1);
    }
  }
  // 倒影池 + 汀步 + 睡莲
  f.put(new THREE.CylinderGeometry(2.0, 2.0, 0.2, 40), k.p.water, 0, 0.14, 1.3, 0, 0, 0, 1.3, 1, 0.75);
  f.put(new THREE.TorusGeometry(2.0, 0.12, 8, 40), m.stoneDark, 0, 0.24, 1.3, Math.PI / 2, 0, 0, 1.3, 0.75, 1);
  for (let i = 0; i < 5; i++) f.cyl(m.stone, 0.26, 0.28, 0.08, -1.6 + i * 0.8, 0.22, 1.3 + Math.sin(i * 1.4) * 0.25, 14);
  for (const [x, z] of [[-1.0, 1.7], [0.6, 0.9], [1.6, 1.6]]) {
    f.cyl(m.leaf, 0.2, 0.2, 0.02, x, 0.26, z, 14);
    f.ball(k.p.fabricCream, 0.07, x + 0.04, 0.3, z, 1, 0.7, 1);
  }
  // 长椅 + 石灯 + 人物（坐着写日记）
  props.bench(k, f.child(-3.4, 0, 1.5, -0.5), 1.8);
  props.bench(k, f.child(3.4, 0, 1.5, 0.5), 1.8);
  placePerson(ctx, { shirt: 0xc79a3a, hair: 0x2b1d16, hairStyle: "bun", seated: true, pose: "write", lean: 0.1 }, -3.3, 0.44, 1.5, -0.5);
  const lan = f.child(-2.6, 0, 3.0);
  lan.cyl(m.stoneDark, 0.18, 0.22, 0.2, 0, 0, 0, 10);
  lan.cyl(m.stone, 0.07, 0.09, 0.9, 0, 0.2, 0, 10);
  lan.box(m.stone, 0.4, 0.3, 0.4, 0, 1.1, 0, 0.03);
  lan.cyl(m.lampGlass, 0.12, 0.12, 0.2, 0, 1.14, 0, 8);
  lan.put(new THREE.ConeGeometry(0.34, 0.2, 4), m.stoneDark, 0, 1.5, 0, 0, Math.PI / 4);
  // 枫树
  const tree = createTree(1.5);
  const [tx, tz] = worldXZ(3.9, -2.2);
  tree.position.set(tx, STAGE_Y + 0.6, tz);
  ctx.root.add(tree);
  addBeacon(ctx, ctx.glow, 0, 3.0, -0.2, 0.22);
  props.lampPost(k, f.child(4.8, 0, 2.6));
  finishStage(s, "scene-reflection-garden");
};

// ───────────────────────── Section B ─────────────────────────

/** 旅舍：木石结构的青年旅舍、门前长椅与自行车架、行李，旅行者刚到、老板在门口迎接 */
export const hostelScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const hf = f.child(0, 0, -1.6);
  props.house(k, hf, 6.6, 3.4, 2.8, m.terracottaRoof, p.fabricCream);
  // 二层窗与阳台
  for (const sx of [-2.2, 0, 2.2]) {
    hf.box(m.woodDark, 0.9, 0.95, 0.08, sx, 2.1, 1.42, 0.01);
    hf.put(new THREE.PlaneGeometry(0.76, 0.8), m.glass, sx, 2.58, 1.47);
    hf.box(m.wood, 1.05, 0.06, 0.34, sx, 1.98, 1.58, 0.01);
  }
  const tex = makeSignTexture([{ text: "HOSTEL", y: 110, font: "bold 96px Arial, sans-serif" }, { text: "BEDS · TEA · MAPS", y: 220, font: "bold 36px Arial, sans-serif", color: "#d8c598" }], { width: 720, height: 300, background: "#3a2d20" });
  addCanvasPlane(ctx, tex, 0, 3.1, -1.6 + 1.52, 2.0, 0.85);
  addBeacon(ctx, ctx.glow, 0, 4.9, -0.3, 0.2);
  // 门前：长椅、自行车架、行李
  props.bench(k, f.child(-3.4, 0, 0.9, 0.35), 1.7);
  props.bicycle(k, f.child(3.0, 0, 1.0, 0.3), k.p.fabricRed);
  props.bicycle(k, f.child(3.5, 0, 0.7, 0.2), k.p.fabricBlue);
  f.box(m.darkSteel, 1.6, 0.05, 0.05, 3.2, 0.5, 1.3, 0.01);
  props.suitcase(k, f.child(-1.6, 0, 1.4, 0.4), 0.55, 0.62, 0.3, p.fabricGreen);
  trail(s, [[0, 3.6], [0, 2.4], [0, 1.4]], m.paveA, 0.9, 0.6);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "walk" }, -0.2, 0, 2.3, 0.1);
  placePerson(ctx, { shirt: 0xb99b7c, hair: 0x555555, scarf: 0xb04a40, pose: "talk" }, 0.9, 0, 0.9, -0.3);
  props.planter(k, f.child(-4.6, 0, 0.0), 0.5, 5);
  props.lampPost(k, f.child(-4.9, 0, 2.4));
  props.lampPost(k, f.child(4.9, 0, 2.4));
  finishStage(s, "scene-hostel");
};

/** 开放路线：高大石拱门下分出两条路径，各通向路标终点；旅行者在岔口查看地图 */
export const openRouteScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const g = f.child(0, 0, -1.2, 0);
  for (const sx of [-1, 1]) {
    g.box(m.stoneDark, 1.2, 0.4, 1.2, sx * 2.6, 0, 0, 0.05);
    g.box(m.stone, 0.95, 3.4, 0.95, sx * 2.6, 0.4, 0, 0.06);
    g.box(m.stoneDark, 1.25, 0.25, 1.25, sx * 2.6, 3.8, 0, 0.05);
  }
  g.put(archFrameGeo(2.6, 2.0, 1.0, 0.06), m.stone, 0, 4.05, 0);
  g.box(m.stoneDark, 0.8, 0.8, 1.1, 0, 6.5, 0, 0.06);
  g.put(new THREE.SphereGeometry(0.2, 14, 10), m.brass, 0, 7.5, 0);
  // 两条路径从拱门下向左右展开
  trail(s, [[0, 2.6], [0, 0.9], [-0.9, -0.4]], m.paveA, 0.9, 0.55);
  trail(s, [[0, 2.6], [0, 0.9], [0.9, -0.4]], m.paveB, 0.9, 0.55);
  trail(s, [[-0.9, -0.4], [-2.4, -1.4], [-3.9, -2.4]], std(0x6a8a8f), 0.85, 0.55);
  trail(s, [[0.9, -0.4], [2.4, -1.4], [3.9, -2.4]], std(0x7aa07a), 0.85, 0.55);
  for (const sx of [-1, 1]) {
    props.signpost(k, f.child(sx * 4.0, 0, -2.8, -sx * 0.4), [{ yaw: sx * (Math.PI / 2 - 0.5), len: 1.1, tone: sx < 0 ? m.copper : m.leaf }], 2.4);
    addBeacon(ctx, ctx.edge, sx * 4.0, 2.9, -2.8, 0.34);
  }
  // 岔口的旅行者 + 地图
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, backpack: 0x2f5d8a, pose: "read" }, 0.0, 0, 2.2, 0.0);
  props.bench(k, f.child(-3.8, 0, 1.6, -0.5), 1.6);
  props.planter(k, f.child(3.8, 0, 1.8), 0.5, 27);
  props.lampPost(k, f.child(-4.9, 0, 2.6));
  props.lampPost(k, f.child(4.9, 0, 2.6));
  void p;
  finishStage(s, "scene-open-route");
};

/** 自信：层层石阶攀向观景台，台上有栏杆、望远镜和飘动的旗，一位旅人站在最高处眺望 */
export const confidenceScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  for (let i = 0; i < 4; i++) {
    const w = 7.6 - i * 1.2;
    f.box(i % 2 ? m.stoneWarm : m.stone, w, 0.4 + i * 0.4, 1.1, 0, 0, 1.6 - i * 0.95, 0.05);
  }
  const top = 0.4 + 3 * 0.4 + 0.4;
  f.box(m.stoneDark, 4.4, 0.4, 1.7, 0, top - 0.4, -1.6, 0.05);
  // 栏杆
  props.railing(k, f.child(-2.0, top, -0.85, 0), 4.0, 0.95, m.darkSteel);
  props.railing(k, f.child(-2.0, top, -2.4, 0), 4.0, 0.95, m.darkSteel);
  for (const sx of [-1, 1]) props.railing(k, f.child(sx * 2.0, top, -2.4, Math.PI / 2 * -sx), 1.6, 0.95, m.darkSteel);
  // 望远镜（投币式）
  const sc = f.child(1.5, top, -1.2, -0.4);
  sc.cyl(m.darkSteel, 0.06, 0.1, 1.1, 0, 0, 0, 10);
  sc.put(new THREE.CylinderGeometry(0.1, 0.12, 0.7, 16), m.steel, 0.1, 1.22, 0.2, Math.PI / 2 - 0.4);
  sc.put(new THREE.TorusGeometry(0.12, 0.025, 8, 16), m.brass, 0.1, 1.2, 0.5, Math.PI / 2 - 0.4);
  // 旗杆 + 旗
  f.cyl(m.steel, 0.03, 0.04, 3.0, -1.8, top, -2.2, 8);
  f.box(p.fabricRed, 1.0, 0.55, 0.02, -1.3, top + 2.4, -2.2, 0.005);
  addBeacon(ctx, ctx.glow, 0, 2.2 + top, -2.2, 0.4);
  // 人物（观景台上眺望）
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "point" }, -0.2, top, -1.6, 0.0);
  props.planter(k, f.child(-3.6, 0, 2.4), 0.5, 29);
  props.planter(k, f.child(3.6, 0, 2.4), 0.5, 31);
  props.lampPost(k, f.child(-4.8, 0, 1.2));
  props.lampPost(k, f.child(4.8, 0, 1.2));
  finishStage(s, "scene-confidence");
};

/** 雨棚：木构坡顶长棚、棚下长椅与行李，棚外细雨与水洼，两位旅人撑着伞 / 避雨 */
export const rainShelterScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.6, 3.7, 0.05, 0, 0, 0, 40);
  // 长棚：六柱 + 梁 + 双坡瓦顶
  for (const sx of [-3.2, 0, 3.2]) for (const sz of [-1.6, 1.0]) f.cyl(m.woodDark, 0.09, 0.11, 2.8, sx, 0, sz, 12);
  for (const sz of [-1.6, 1.0]) f.box(m.woodDark, 7.2, 0.2, 0.2, 0, 2.8, sz, 0.03);
  for (const sx of [-3.2, 0, 3.2]) f.box(m.woodDark, 0.18, 0.18, 2.8, sx, 2.8, -0.3, 0.02);
  for (const s2 of [-1, 1]) f.box(m.terracottaRoof, 7.8, 0.1, 1.9, 0, 3.2, -0.3 + s2 * 0.85, 0.02, -s2 * 0.38);
  f.box(m.brass, 7.9, 0.12, 0.2, 0, 3.55, -0.3, 0.02);
  // 棚下长椅 + 行李 + 灯
  props.bench(k, f.child(0, 0, -1.2, Math.PI), 3.2);
  props.suitcase(k, f.child(-1.9, 0, 0.3, 0.5), 0.5, 0.55, 0.28, p.fabricBlue);
  for (const sx of [-1.8, 1.8]) {
    f.strut(m.darkSteel, [sx, 2.8, -0.3], [sx, 2.3, -0.3], 0.012, 4);
    f.cyl(m.lampGlass, 0.1, 0.14, 0.3, sx, 2.0, -0.3, 8);
  }
  placePerson(ctx, { shirt: 0xb99b7c, hair: 0x2b1d16, seated: true, pose: "listen", scarf: 0xb04a40 }, 0.5, 0.45, -1.0, 0);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x555555, seated: true, pose: "talk" }, -0.5, 0.45, -1.0, 0);
  // 棚外：撑伞的人 + 水洼 + 雨丝
  props.umbrella(k, f.child(3.2, 0, 2.6, 0), 0.62, p.fabricRed);
  placePerson(ctx, { shirt: 0x4d7a55, hair: 0x2b1d16, pose: "walk" }, 3.2, 0, 2.6, 0.9);
  for (const [x, z, r] of [[-2.4, 2.4, 0.7], [0.4, 2.8, 0.55], [-3.8, 0.8, 0.5]] as const) f.cyl(p.water, r, r, 0.015, x, 0.0, z, 20);
  const rainMat = new THREE.MeshBasicMaterial({ color: 0xbfe3f2, transparent: true, opacity: 0.55, depthWrite: false });
  const rain = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.008 * SCENE_SCALE, 0.008 * SCENE_SCALE, 0.7 * SCENE_SCALE, 4), rainMat, 140);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 140; i++) {
    const a = (i * 2.399) % (Math.PI * 2);
    const r = 1.2 + ((i * 37) % 100) / 100 * 3.6;
    const lx = Math.cos(a) * r * 1.2;
    const lz = 1.2 + Math.sin(a) * r * 0.7;
    const [wx, wz] = worldXZ(lx, lz);
    dummy.position.set(wx, STAGE_Y + (0.8 + ((i * 53) % 100) / 100 * 3.4) * SCENE_SCALE, wz);
    dummy.rotation.z = 0.12;
    dummy.updateMatrix();
    rain.setMatrixAt(i, dummy.matrix);
  }
  rain.userData.noLandscapeShadow = true;
  rain.castShadow = false;
  ctx.root.add(rain);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  finishStage(s, "scene-rain-shelter");
};

// ───────────────────────── Section C ─────────────────────────

/** 站台：钢柱雨棚站台、双轨道、信号机与站钟，乘客带着行李等车 */
export const railPlatformScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  // 站台 + 黄线
  f.box(m.stoneDark, 10.4, 0.5, 2.6, 0, 0, 0.2, 0.04);
  f.box(m.paveA, 10.2, 0.04, 2.4, 0, 0.5, 0.2, 0.01);
  f.box(p.fabricCream, 10.2, 0.012, 0.12, 0, 0.54, 1.3, 0.003);
  // 钢柱 + 雨棚桁架
  for (const x of [-4.2, -1.4, 1.4, 4.2]) {
    f.cyl(m.darkSteel, 0.1, 0.12, 3.5, x, 0.54, -0.6, 12);
    f.box(m.darkSteel, 0.4, 0.15, 0.4, x, 0.54, -0.6, 0.02);
  }
  f.box(m.darkSteel, 10.2, 0.14, 0.14, 0, 4.0, -0.6, 0.02);
  for (let i = 0; i < 4; i++) f.box(m.slate, 2.6, 0.08, 2.6, -3.9 + i * 2.6, 4.12, 0.25, 0.015, 0.14);
  f.box(p.fabricRed, 10.4, 0.1, 0.1, 0, 4.0, 1.5, 0.01);
  // 站钟
  const clk = f.child(0, 3.2, -0.6, 0);
  clk.put(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32), p.ceramic, 0, 0, 0.1, Math.PI / 2);
  clk.put(new THREE.TorusGeometry(0.42, 0.04, 8, 32), m.brass, 0, 0, 0.14);
  clk.box(m.darkSteel, 0.025, 0.28, 0.01, 0, -0.14, 0.18, 0.004);
  clk.box(m.darkSteel, 0.02, 0.2, 0.01, 0.1, -0.1, 0.19, 0.004, 0, 0, -1.1);
  // 站名牌
  const sign = makeSignTexture([{ text: "PLATFORM 3", y: 120, font: "bold 80px Arial, sans-serif" }, { text: "COAST EXPRESS", y: 230, font: "bold 40px Arial, sans-serif", color: "#d8c598" }], { width: 720, height: 340, background: "#1f3a5f" });
  addCanvasPlane(ctx, sign, 3.3, 3.1, -0.6 + 0.1, 1.6, 0.75);
  // 轨道（站台前方两条）
  props.rails(k, f.child(-5.2, 0, 2.8, 0), 10.4, 0.72);
  props.rails(k, f.child(-5.2, 0, 4.3, 0), 10.4, 0.72);
  // 信号机
  for (const sx of [-1, 1]) {
    const sg = f.child(sx * 4.9, 0, 3.4);
    sg.cyl(m.darkSteel, 0.05, 0.07, 3.2, 0, 0, 0, 8);
    sg.box(p.plasticDark, 0.3, 0.8, 0.2, 0, 3.0, 0, 0.03);
    sg.ball(sx < 0 ? std(0x3ec16a, 0.3) : std(0xe0555d, 0.3), 0.08, 0, 3.25, 0.12);
    addBeacon(ctx, sx < 0 ? ctx.glow : ctx.edge, sx * 4.9, 3.9, 3.4, 0.14);
  }
  // 候车长椅 + 乘客
  props.bench(k, f.child(-3.0, 0.54, 0.2, Math.PI), 1.8);
  props.bench(k, f.child(3.0, 0.54, 0.2, Math.PI), 1.8);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0xc79a3a, seated: true, pose: "listen" }, -3.3, 0.54 + 0.45, 0.0, 0);
  props.suitcase(k, f.child(-1.8, 0.54, 0.6, 0.3), 0.55, 0.6, 0.3, p.fabricGreen);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, scarf: 0xb04a40, pose: "stand" }, 1.0, 0.54, 0.8, 0.0);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, pose: "phone" }, 2.8, 0.54, 0.7, -0.3);
  finishStage(s, "scene-rail-platform");
};

/** 车厢：一节蓝白涂装的客车，大窗里能看到座位与乘客，转向架、车门、车顶通风器与铁轨 */
export const railCarScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  props.rails(k, f.child(-5.4, 0, 0.2, 0), 10.8, 0.9);
  const body = std(0x2f5d8a, 0.5);
  const stripe = std(0xe8e4d8, 0.5);
  f.box(m.darkSteel, 9.0, 0.35, 2.3, 0, 0.5, 0.2, 0.05);
  f.box(body, 9.2, 0.7, 2.5, 0, 0.85, 0.2, 0.06);
  f.box(stripe, 9.22, 0.12, 2.52, 0, 1.55, 0.2, 0.02);
  f.box(body, 9.2, 1.45, 2.5, 0, 1.65, 0.2, 0.08);
  f.box(stripe, 9.0, 0.28, 2.32, 0, 3.1, 0.2, 0.05);
  f.put(new THREE.CylinderGeometry(1.2, 1.2, 9.0, 24, 1, false, -Math.PI / 2 - 0.9, 1.8), m.darkSteel, 0, 3.25, 0.2, 0, 0, Math.PI / 2, 1, 1, 0.7);
  // 窗：玻璃 + 窗框 + 车内座椅与乘客
  const winXs = [-3.5, -1.75, 0, 1.75, 3.5];
  winXs.forEach((x) => {
    f.box(m.darkSteel, 1.42, 1.0, 0.06, x, 1.75, 1.45, 0.02);
    f.put(new THREE.PlaneGeometry(1.3, 0.88), m.glass, x, 2.25, 1.49);
  });
  for (const x of winXs) {
    f.box(p.fabricBlue, 0.7, 0.18, 0.5, x, 1.45, 0.7, 0.04);
    f.box(p.fabricBlue, 0.7, 0.6, 0.12, x, 1.5, 0.45, 0.04, -0.1);
  }
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, hairStyle: "long", seated: true, pose: "read" }, -1.75, 1.5, 0.55, Math.PI);
  placePerson(ctx, { shirt: 0x78968a, hair: 0x443a34, seated: true, pose: "phone" }, 1.75, 1.5, 0.55, Math.PI);
  // 车门 + 台阶
  f.box(stripe, 1.1, 2.0, 0.06, 4.15, 0.9, 1.46, 0.02);
  f.box(m.slate, 0.9, 0.12, 0.35, 4.15, 0.55, 1.65, 0.02);
  // 转向架：车轮 + 车架
  for (const x of [-3.0, 3.0]) {
    f.box(m.darkSteel, 1.7, 0.2, 0.3, x, 0.28, 1.2, 0.03);
    for (const dx of [-0.55, 0.55]) f.put(new THREE.CylinderGeometry(0.34, 0.34, 0.12, 24), m.steel, x + dx, 0.34, 1.3, Math.PI / 2);
  }
  // 车顶通风器
  for (const x of [-3, 0, 3]) f.cyl(m.steel, 0.2, 0.22, 0.18, x, 3.9, 0.2, 14);
  addBeacon(ctx, ctx.glow, 0, 5.0, 0.2, 0.22);
  props.lampPost(k, f.child(-5.0, 0, 3.0));
  props.lampPost(k, f.child(5.0, 0, 3.0));
  finishStage(s, "scene-rail-car");
};

/** 车窗风景：车厢侧壁上的大拱窗，窗外是一幅有层次的田园画，窗边的乘客在看风景 */
export const landscapeWindowScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.6, 3.6, 0.04, 0, 0, 0, 40);
  // 车厢内壁：左右墙板 + 上方拱形
  const wall = std(0xd7cdb5, 0.9);
  f.box(wall, 2.6, 4.8, 0.25, -2.9, 0, -2.2, 0.03);
  f.box(wall, 2.6, 4.8, 0.25, 2.9, 0, -2.2, 0.03);
  f.box(wall, 3.4, 1.4, 0.25, 0, 3.4, -2.2, 0.03);
  f.box(wall, 3.4, 0.9, 0.25, 0, 0, -2.2, 0.03);
  f.put(archFrameGeo(1.85, 1.65, 0.3, 0.04), m.woodDark, 0, 2.2, -2.2);
  f.box(m.woodDark, 0.12, 2.2, 0.3, -1.7, 0.9, -2.2, 0.02);
  f.box(m.woodDark, 0.12, 2.2, 0.3, 1.7, 0.9, -2.2, 0.02);
  // 窗景画（分三层：天空 + 远山 + 田野）
  addCanvasPlane(ctx, makeLandscape(), 0, 2.5, -2.5, 3.4, 2.0);
  f.put(new THREE.PlaneGeometry(3.3, 1.8), m.glass, 0, 2.5, -2.25);
  // 窗帘：束在两侧
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 4; i++) f.box(p.fabricRed, 0.18, 2.4 - i * 0.1, 0.1, sx * (1.55 + i * 0.1), 1.2, -2.0 + i * 0.01, 0.03);
    f.box(m.brass, 0.1, 0.06, 0.14, sx * 1.55, 1.9, -2.0, 0.01);
  }
  // 窗边小桌 + 座椅 + 乘客（背向观众看风景）
  props.table(k, f.child(0, 0, -1.4), 1.0, 0.5, 0.74, m.wood);
  props.cup(k, f.child(-0.2, 0.74, -1.4));
  props.openBook(k, f.child(0.25, 0.74, -1.4, 0.2));
  props.chair(k, f.child(-0.6, 0, -0.4, Math.PI), m.woodDark);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, hairStyle: "long", seated: true, pose: "listen" }, -0.6, 0.45, -0.4, Math.PI);
  props.chair(k, f.child(0.6, 0, -0.4, Math.PI), m.woodDark);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x555555, seated: true, pose: "point", glasses: true }, 0.6, 0.45, -0.4, Math.PI - 0.3);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  props.planter(k, f.child(-3.6, 0, 1.8), 0.5, 33);
  props.planter(k, f.child(3.6, 0, 1.8), 0.5, 35);
  addBeacon(ctx, ctx.glow, 1.1, 3.9, -2.0, 0.28);
  finishStage(s, "scene-landscape-window");
};

/** 路网：沙盘式的微缩路网——三座城市模型以铁路与公路相连，沿线有发光节点，一位旅人俯身查看 */
export const routeNetworkScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  // 沙盘：木框 + 台面 + 绿地
  f.box(m.woodDark, 8.6, 0.95, 4.4, 0, 0, -0.9, 0.06);
  f.box(std(0x7e9a62, 0.95), 8.2, 0.05, 4.0, 0, 0.95, -0.9, 0.02);
  const cities: Array<[number, number, number]> = [[-3.0, -1.2, 1.1], [0.2, -1.8, 1.4], [3.0, -1.0, 1.0]];
  cities.forEach(([cx, cz, sc], ci) => {
    for (let i = 0; i < 9; i++) {
      const bx = cx + ((i % 3) - 1) * 0.5 * sc;
      const bz = cz + (Math.floor(i / 3) - 1) * 0.45 * sc;
      const h = (0.3 + ((i * 37 + ci * 11) % 10) / 10 * 0.8) * sc;
      f.box(i % 2 ? m.stoneWarm : p.fabricCream, 0.36 * sc, h, 0.34 * sc, bx, 1.0, bz, 0.02);
      f.box(m.slate, 0.4 * sc, 0.03, 0.38 * sc, bx, 1.0 + h, bz, 0.005);
    }
    addBeacon(ctx, ctx.glow, cx, 1.0 + 1.6 * sc + 0.3, cz, 0.18 * sc);
  });
  // 铁路 / 公路连线（沿城市连线铺枕木与钢轨）
  const links: Array<[number, number, number, number]> = [[-3.0, -1.2, 0.2, -1.8], [0.2, -1.8, 3.0, -1.0], [-3.0, -1.2, 3.0, -1.0]];
  links.forEach(([x0, z0, x1, z1], li) => {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const ang = Math.atan2(z1 - z0, x1 - x0);
    const n = Math.round(len / 0.3);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const x = x0 + (x1 - x0) * t;
      const z = z0 + (z1 - z0) * t + (li === 2 ? 0.9 * Math.sin(t * Math.PI) : 0);
      f.box(li === 2 ? m.paveA : m.woodDark, 0.12, 0.03, 0.34, x, 1.0, z, 0.008, 0, -ang);
    }
    if (li !== 2) for (const dz of [-0.1, 0.1]) f.box(m.steel, len, 0.025, 0.025, (x0 + x1) / 2, 1.03, (z0 + z1) / 2 + dz, 0.005, 0, -ang);
  });
  // 小火车
  f.box(std(0xb83b32, 0.5), 0.5, 0.18, 0.2, -1.4, 1.04, -1.5, 0.04, 0, 0.25);
  f.box(m.darkSteel, 0.3, 0.12, 0.18, -1.0, 1.04, -1.62, 0.03, 0, 0.25);
  // 沙盘前的人物 + 立牌
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "point", lean: 0.12 }, 0.3, 0, 2.3, 0.0);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, pose: "listen" }, -1.4, 0, 2.5, 0.3);
  const tex = makeSignTexture([{ text: "ROUTE NETWORK", y: 110, font: "bold 70px Arial, sans-serif" }], { width: 720, height: 220, background: "#1f3a5f" });
  addCanvasPlane(ctx, tex, 0, 0.55, 1.35, 1.8, 0.55, 0, -0.18);
  props.lampPost(k, f.child(-4.9, 0, 2.4));
  props.lampPost(k, f.child(4.9, 0, 2.4));
  finishStage(s, "scene-route-network");
};

export const UNIT03_SCENES: Record<string, SceneModule> = {
  itinerary: itineraryScene,
  detour: detourScene,
  "market-encounter": marketEncounterScene,
  "reflection-garden": reflectionGardenScene,
  hostel: hostelScene,
  "open-route": openRouteScene,
  "rain-shelter": rainShelterScene,
  confidence: confidenceScene,
  "rail-platform": railPlatformScene,
  "rail-car": railCarScene,
  "landscape-window": landscapeWindowScene,
  "route-network": routeNetworkScene,
};

function worldPos(lx: number, ly: number, lz: number): [number, number, number] {
  const [x, z] = worldXZ(lx, lz);
  return [x, STAGE_Y + ly * SCENE_SCALE, z];
}
