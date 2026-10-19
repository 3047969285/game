import * as THREE from "three";
import { archFrameGeo, gableGeo } from "../detailKit";
import * as props from "../sceneProps";
import { SCENE_SCALE, STAGE_Y, addBeacon, addCanvasPlane, addGlowCard, createStage, finishStage, makeSignTexture, placePerson, worldXZ, type SceneModule, type Stage } from "./context";

/**
 * 单元 6「共益交易城」12 个段落场景（社区共享与书籍流通主题）。
 * A：书店 · 书籍交换 · 韧性 · 预算板　B：交换墙 · 资源循环 · 信任账本 · 可持续集市　C：图书馆 · 数字借阅 · 社区图书馆 · 知识之桥
 */

const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial => {
  const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  m.fog = false;
  return m;
};
const emissive = (color: number, intensity = 0.8): THREE.MeshStandardMaterial => std(color, 0.35, 0.1, { emissive: color, emissiveIntensity: intensity });

/** 书籍墙：行 × 列的书脊（随机高度与颜色），朝局部 +z，底面在 ly */
function bookWall(s: Stage, lx: number, ly: number, lz: number, w: number, h: number, rows: number, seed: number, yaw = 0): void {
  props.bookshelf(s.k, s.f.child(lx, ly, lz, yaw), w, h, rows, seed);
}

/** 弧形条形图纹理：预算板用的网格与标题 */
function makeBudgetTexture(): THREE.CanvasTexture | undefined {
  const c = document.createElement("canvas");
  c.width = 1000;
  c.height = 600;
  const g = c.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = "#f3efe2";
  g.fillRect(0, 0, 1000, 600);
  g.strokeStyle = "rgba(60,80,70,0.25)";
  g.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    g.beginPath();
    g.moveTo(80, 120 + i * 80);
    g.lineTo(940, 120 + i * 80);
    g.stroke();
  }
  g.fillStyle = "#24483f";
  g.font = "bold 54px Arial, sans-serif";
  g.fillText("COMMUNITY BUDGET", 80, 74);
  g.font = "bold 30px Arial, sans-serif";
  g.fillStyle = "#4a6a60";
  g.fillText("BOOKS", 190, 575);
  g.fillText("TOOLS", 470, 575);
  g.fillText("SHARED", 740, 575);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** 数字借阅屏纹理：封面网格 UI */
function makeLendingTexture(): THREE.CanvasTexture | undefined {
  const c = document.createElement("canvas");
  c.width = 900;
  c.height = 700;
  const g = c.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = "#12232c";
  g.fillRect(0, 0, 900, 700);
  g.fillStyle = "#7ef0d4";
  g.font = "bold 44px Arial, sans-serif";
  g.fillText("DIGITAL LENDING", 40, 70);
  const tones = ["#b83b32", "#2f5d8a", "#c79a3a", "#3f7a4f", "#6a4a8a", "#e8dec6"];
  for (let r = 0; r < 3; r++) {
    for (let col = 0; col < 5; col++) {
      const x = 40 + col * 168;
      const y = 110 + r * 190;
      g.fillStyle = tones[(r * 5 + col) % tones.length];
      g.fillRect(x, y, 140, 170);
      g.fillStyle = "rgba(255,255,255,0.8)";
      g.fillRect(x + 14, y + 20, 112, 10);
      g.fillRect(x + 14, y + 44, 80, 8);
    }
  }
  g.fillStyle = "#7ef0d4";
  g.fillRect(40, 660, 300, 14);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// ───────────────────────── Section A ─────────────────────────

/** 社区书店：带大橱窗与条纹遮阳篷的临街书店、门口书车与交换桌，店主与读者在店前；招牌写着 BOOK EXCHANGE */
export const bookshopScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const shop = f.child(0, 0, -1.8, 0);
  const wallTone = std(0x3e6b5e, 0.85);
  shop.box(m.stoneDark, 7.4, 0.3, 2.8, 0, 0, 0, 0.03);
  shop.box(wallTone, 7.2, 3.4, 2.6, 0, 0.3, 0, 0.04);
  shop.box(m.woodDark, 7.4, 0.4, 2.8, 0, 3.7, 0, 0.03);
  shop.put(gableGeo(7.6, 0.9, 2.9), m.slate, 0, 4.1, 0);
  // 大橱窗 ×2 + 门：窗框 + 玻璃 + 窗内书架
  for (const sx of [-1, 1]) {
    props.windowPane(k, shop.child(sx * 2.3, 0.78, 1.32), 2.3, 1.9, { cols: 3, rows: 2, lit: true, frame: m.woodDark });
    for (let i = 0; i < 3; i++) {
      shop.box(m.wood, 2.2, 0.04, 0.12, sx * 2.3, 1.0 + i * 0.6, 1.31, 0.008);
      for (let b = 0; b < 14; b++) shop.box(p.books[(b + i * 3 + (sx > 0 ? 5 : 0)) % p.books.length], 0.07, 0.2 + ((b * 7 + i) % 4) * 0.03, 0.1, sx * 2.3 - 1.0 + b * 0.15, 1.04 + i * 0.6, 1.31, 0.004);
    }
  }
  shop.box(m.woodDark, 1.4, 2.5, 0.1, 0, 0.3, 1.32, 0.02);
  shop.box(m.wood, 1.2, 2.3, 0.07, 0, 0.35, 1.36, 0.015);
  shop.put(new THREE.PlaneGeometry(0.7, 1.2), m.glass, 0, 1.7, 1.41);
  shop.box(m.brass, 0.06, 0.06, 0.05, 0.4, 1.3, 1.42, 0.01);
  // 遮阳篷
  props.awning(k, shop.child(0, 0.4, 1.35, 0), 6.8, 1.2, 12, p.fabricGreen, p.fabricCream);
  // 招牌（画布）
  const tex = makeSignTexture([{ text: "BOOK EXCHANGE", y: 78, font: "bold 70px Arial, sans-serif", color: "#fff4dc" }, { text: "LEAVE ONE  ·  TAKE ONE", y: 150, font: "bold 32px Arial, sans-serif", color: "#fff4dc" }], { width: 1024, height: 192, background: "#24483f", border: "#d9b77a" });
  addCanvasPlane(ctx, tex, 0, 3.5, -1.8 + 1.5, 5.4, 1.0);
  addBeacon(ctx, ctx.glow, -3.3, 4.2, -0.2, 0.14);
  // 门口：书车、交换桌、落地黑板
  props.bookCart(k, f.child(-3.3, 0, 0.9, 0.3), 3);
  props.table(k, f.child(3.2, 0, 0.9, -0.2), 1.6, 0.7, 0.8, m.wood);
  props.bookStack(k, f.child(2.8, 0.8, 0.9, 0.2), 5, 4);
  props.openBook(k, f.child(3.5, 0.8, 0.85, -0.3));
  const bd = f.child(1.9, 0, 2.0, -0.35);
  bd.box(m.woodDark, 0.8, 1.1, 0.06, 0, 0, 0, 0.015, -0.12);
  bd.box(p.boardGreen, 0.7, 0.95, 0.02, 0, 0.07, 0.04, 0.005, -0.12);
  placePerson(ctx, { shirt: 0xc79a3a, hair: 0x555555, glasses: true, pose: "talk", scarf: 0x3f7a4f }, 0.9, 0, 1.4, -0.2);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0xb04a40, pose: "read" }, -1.2, 0, 1.8, 0.3);
  const light = new THREE.PointLight(0xffdca0, 1.8, 16, 2);
  light.position.set(...worldPos(0, 2.2, 0.4));
  ctx.root.add(light);
  props.lampPost(k, f.child(-4.9, 0, 2.2));
  props.lampPost(k, f.child(4.9, 0, 2.2));
  props.planter(k, f.child(-1.9, 0, 3.0), 0.5, 51);
  finishStage(s, "scene-bookshop");
};

/** 书籍交换：两侧通顶书架、中间长桌上的交换书堆与"换一本"告示，两位邻居互换书本 */
export const bookExchangeScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 3.2, 3.2, 0.05, 0, 0, 0, 40);
  bookWall(s, -3.5, 0, -0.9, 2.6, 3.4, 7, 11, 0.5);
  bookWall(s, 3.5, 0, -0.9, 2.6, 3.4, 7, 17, -0.5);
  bookWall(s, 0, 0, -2.5, 3.2, 3.0, 6, 23, 0);
  props.ladder(k, f.child(1.6, 0, -2.2, 0), 2.6);
  props.table(k, f.child(0, 0, 0.4), 3.0, 0.9, 0.78, m.wood);
  props.bookStack(k, f.child(-0.8, 0.78, 0.4, 0.2), 6, 8);
  props.bookStack(k, f.child(0.7, 0.78, 0.45, -0.3), 4, 9);
  props.openBook(k, f.child(0.0, 0.78, 0.6, 0.1));
  const sign = makeSignTexture([{ text: "SWAP A BOOK", y: 100, font: "bold 70px Arial, sans-serif" }], { width: 720, height: 220, background: "#3a2d20" });
  addCanvasPlane(ctx, sign, 0, 1.25, 0.95, 1.2, 0.36, 0, -0.25);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, pose: "talk", backpack: 0xc79a3a }, -1.5, 0, 1.4, 0.5);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, hairStyle: "bun", pose: "listen" }, 1.5, 0, 1.4, -0.5);
  for (const x of [-2.2, 0, 2.2]) addBeacon(ctx, ctx.glow, x, 4.0, 0.2, 0.14);
  props.lampPost(k, f.child(-4.8, 0, 1.8));
  props.lampPost(k, f.child(4.8, 0, 1.8));
  finishStage(s, "scene-exchange");
};

/** 韧性：石拱门下四座并排的应急小屋，每座亮着一盏灯，路面连成一条汇聚的小径 */
export const resilienceScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.7, 3.8, 0.05, 0, 0, 0, 40);
  const arch = f.child(0, 0, -2.4, 0);
  for (const sx of [-1, 1]) {
    arch.box(m.stoneDark, 1.2, 0.35, 1.2, sx * 3.4, 0, 0, 0.05);
    arch.box(m.stone, 0.95, 3.6, 0.95, sx * 3.4, 0.35, 0, 0.06);
  }
  arch.put(archFrameGeo(3.9, 3.0, 1.0, 0.06), m.stone, 0, 3.95, 0);
  arch.box(m.stoneDark, 0.9, 0.8, 1.1, 0, 7.0, 0, 0.05);
  [-3.0, -1.0, 1.0, 3.0].forEach((x, i) => {
    props.house(k, f.child(x, 0, 0.0, (i - 1.5) * 0.12), 1.7, 2.0, 1.5, i % 2 ? m.terracottaRoof : m.slate, p.fabricCream);
    props.lampPost(k, f.child(x, 0, 1.1), 2.0);
    addBeacon(ctx, i % 2 ? ctx.edge : ctx.glow, x, 3.5, 0.0, 0.2);
  });
  for (let i = 0; i < 12; i++) f.box(i % 2 ? m.paveA : m.paveB, 0.8, 0.045, 0.5, (i - 5.5) * 0.12, 0, 2.6 - i * 0.28 - 0.0, 0.015);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "walk" }, -0.6, 0, 2.6, 0.2);
  placePerson(ctx, { shirt: 0xb99b7c, hair: 0x555555, scarf: 0xb04a40, pose: "talk" }, 0.6, 0, 2.4, -0.3);
  props.planter(k, f.child(-4.6, 0, 2.2), 0.5, 53);
  props.planter(k, f.child(4.6, 0, 2.2), 0.5, 55);
  finishStage(s, "scene-resilience");
};

/** 预算板：后墙的大幅预算图（三根实体柱状图逐级增高）、右侧一摞摞硬币，主持人指着柱状图讲解 */
export const budgetBoardScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  const bd = f.child(0, 0, -2.4, 0);
  bd.box(m.stoneDark, 6.4, 0.2, 0.8, 0, 0, 0, 0.03);
  for (const sx of [-1, 1]) bd.box(m.woodDark, 0.18, 4.2, 0.22, sx * 3.0, 0.2, 0, 0.02);
  bd.box(m.woodDark, 6.4, 0.2, 0.3, 0, 4.2, 0, 0.02);
  bd.box(m.woodDark, 5.9, 3.7, 0.1, 0, 0.45, 0, 0.02);
  addCanvasPlane(ctx, makeBudgetTexture(), 0, 0.45 + 1.85, -2.4 + 0.07, 5.6, 3.4);
  const heights = [1.0, 1.7, 2.5];
  [-1.7, 0.1, 1.9].forEach((x, i) => {
    const tone = [m.copper, m.brass, m.leaf][i];
    bd.box(tone, 0.95, heights[i], 0.22, x, 0.85, 0.14, 0.03);
    bd.box(m.paper, 0.6, 0.06, 0.02, x, 0.85 + heights[i] - 0.15, 0.26, 0.004);
  });
  addBeacon(ctx, ctx.glow, 1.9, 0.85 + 2.5 + 0.35, -2.2, 0.2);
  // 硬币柱 + 钱箱
  for (let i = 0; i < 5; i++) {
    const c = f.child(3.0 + (i % 2) * 0.45, 0, 0.6 + Math.floor(i / 2) * 0.45);
    for (let j = 0; j < 3 + i; j++) c.cyl(m.brass, 0.17, 0.17, 0.04, 0, j * 0.045, 0, 18);
  }
  props.table(k, f.child(-2.6, 0, 0.8, 0.2), 1.6, 0.7, 0.8, m.wood);
  props.openBook(k, f.child(-2.6, 0.8, 0.8, 0.2));
  props.cup(k, f.child(-2.1, 0.8, 0.8));
  placePerson(ctx, { shirt: 0x496c72, hair: 0x2b1d16, glasses: true, pose: "point" }, 0.0, 0, 1.4, 0.0);
  props.lampPost(k, f.child(-4.8, 0, 1.4));
  props.lampPost(k, f.child(4.8, 0, 1.4));
  finishStage(s, "scene-budget-board");
};

// ───────────────────────── Section B ─────────────────────────

/** 交换墙：整面格子书墙（每格摆着书）、滚动木梯、墙前的阅读角，一位读者站在梯子上取书 */
export const exchangeWallScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  const w = f.child(0, 0, -2.3, 0);
  w.box(m.woodDark, 7.4, 0.25, 0.9, 0, 0, 0, 0.03);
  w.box(m.woodDark, 7.4, 4.0, 0.12, 0, 0.25, -0.35, 0.02);
  for (const sx of [-1, 1]) w.box(m.woodDark, 0.16, 4.0, 0.7, sx * 3.6, 0.25, 0, 0.02);
  w.box(m.woodDark, 7.4, 0.18, 0.74, 0, 4.25, 0, 0.02);
  for (let r = 0; r <= 4; r++) w.box(m.wood, 7.1, 0.06, 0.66, 0, 0.3 + r * 0.95, 0, 0.012);
  for (let c = 1; c < 7; c++) w.box(m.wood, 0.05, 3.8, 0.66, -3.55 + c * 1.015, 0.3, 0, 0.01);
  const rnd = (i: number): number => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 7; c++) {
      const cx = -3.55 + c * 1.015 + 0.55;
      let x = cx - 0.42;
      let i = 0;
      while (x < cx + 0.4) {
        const bw = 0.05 + rnd(r * 77 + c * 13 + i) * 0.05;
        w.box(p.books[Math.floor(rnd(r * 31 + c * 7 + i * 5) * p.books.length)], bw, 0.4 + rnd(r * 5 + c * 11 + i) * 0.35, 0.34, x + bw / 2, 0.36 + r * 0.95, -0.05, 0.004);
        x += bw + 0.003;
        i++;
      }
    }
  }
  props.ladder(k, f.child(-1.0, 0, -1.7, 0), 3.2);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, hairStyle: "long", pose: "read" }, -1.0, 1.4, -1.55, 0);
  // 阅读角
  props.chair(k, f.child(2.3, 0, 0.6, Math.PI * 0.8), m.woodDark);
  props.roundTable(k, f.child(3.2, 0, 0.3), 0.42, 0.55);
  props.cup(k, f.child(3.2, 0.55, 0.3));
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x555555, seated: true, pose: "read", glasses: true }, 2.3, 0.45, 0.6, Math.PI * 0.8);
  props.bookStack(k, f.child(0.6, 0, 1.0, 0.3), 5, 6);
  addBeacon(ctx, ctx.glow, 0, 5.0, -1.9, 0.2);
  props.lampPost(k, f.child(-4.8, 0, 1.4));
  props.lampPost(k, f.child(4.8, 0, 1.4));
  finishStage(s, "scene-exchange-wall");
};

/** 资源循环：三座石座围成三角，各托一类共享资源（书 / 种苗 / 工具），弧形箭头首尾相接形成循环 */
export const resourceCycleScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.7, 3.8, 0.05, 0, 0, 0, 40);
  const pts: Array<[number, number]> = [[0, -1.8], [2.8, 1.3], [-2.8, 1.3]];
  pts.forEach(([x, z], i) => {
    const c = f.child(x, 0, z, 0);
    c.cyl(m.stoneDark, 1.0, 1.1, 0.35, 0, 0, 0, 24);
    c.cyl(m.stone, 0.85, 0.9, 0.3, 0, 0.35, 0, 24);
    if (i === 0) {
      props.bookStack(k, c.child(-0.25, 0.65, 0, 0.3), 5, 3);
      props.openBook(k, c.child(0.3, 0.65, 0.1, -0.2));
    } else if (i === 1) {
      for (let j = 0; j < 5; j++) {
        const a = j * 1.3;
        c.cyl(m.soil, 0.12, 0.1, 0.12, Math.cos(a) * 0.4, 0.65, Math.sin(a) * 0.4, 10);
        c.cyl(m.leaf, 0.02, 0.02, 0.28, Math.cos(a) * 0.4, 0.77, Math.sin(a) * 0.4, 5);
        c.ball(m.leafLight, 0.1, Math.cos(a) * 0.4, 1.08, Math.sin(a) * 0.4, 1, 0.8, 1);
      }
    } else {
      c.box(p.leather, 0.7, 0.14, 0.3, 0, 0.65, 0, 0.02);
      c.box(m.woodDark, 0.12, 0.7, 0.12, -0.1, 0.79, 0, 0.015, 0, 0, 0.6);
      c.box(m.steel, 0.4, 0.2, 0.2, -0.3, 1.35, 0, 0.02, 0, 0, 0.6);
      c.put(new THREE.TorusGeometry(0.2, 0.06, 8, 18, Math.PI * 1.5), m.steel, 0.35, 0.95, 0.0);
    }
  });
  // 循环箭头：沿三边画弧线 + 圆锥箭头
  const arrow = (a: [number, number], b: [number, number]): void => {
    const mid: [number, number] = [(a[0] + b[0]) / 2 * 1.35, (a[1] + b[1]) / 2 * 1.35 - 0.2];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...worldPos(a[0] * 0.65, 1.8, a[1] * 0.65)),
      new THREE.Vector3(...worldPos(mid[0], 2.5, mid[1])),
      new THREE.Vector3(...worldPos(b[0] * 0.65, 1.8, b[1] * 0.65))
    );
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.06 * SCENE_SCALE, 6, false), ctx.edge);
    tube.userData.isLandscapeRoute = true;
    ctx.root.add(tube);
    const end = curve.getPoint(1);
    const dir = curve.getTangent(1);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.18 * SCENE_SCALE, 0.45 * SCENE_SCALE, 12), ctx.edge);
    cone.position.copy(end);
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    ctx.root.add(cone);
  };
  arrow(pts[0], pts[1]);
  arrow(pts[1], pts[2]);
  arrow(pts[2], pts[0]);
  addBeacon(ctx, ctx.glow, 0, 3.6, 0.2, 0.3);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "walk" }, 0.4, 0, 2.6, 0.3);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  finishStage(s, "scene-resource-cycle");
};

/** 信任账本：长桌上摊开一本巨大的账本（两页 + 竖线与横线），羽毛笔、墨水瓶、蜡封，两侧信物台 */
export const trustLedgerScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  props.table(k, f.child(0, 0, -0.4), 6.2, 2.2, 0.82, m.woodDark);
  f.box(p.fabricGreen, 5.8, 0.02, 1.9, 0, 0.82, -0.4, 0.005);
  // 大账本：皮革封面 + 两页 + 书脊 + 横竖线
  const b = f.child(0, 0.84, -0.4, 0);
  b.box(p.leather, 4.4, 0.12, 1.7, 0, 0, 0, 0.04);
  b.box(m.paper, 2.0, 0.1, 1.55, -1.05, 0.12, 0, 0.02, 0, 0, 0.03);
  b.box(m.paper, 2.0, 0.1, 1.55, 1.05, 0.12, 0, 0.02, 0, 0, -0.03);
  b.box(m.stoneDark, 0.08, 0.14, 1.6, 0, 0.1, 0, 0.01);
  for (let i = 0; i < 9; i++) {
    b.box(m.slate, 1.8, 0.008, 0.012, -1.05, 0.225, -0.65 + i * 0.16, 0.002);
    b.box(m.slate, 1.8, 0.008, 0.012, 1.05, 0.225, -0.65 + i * 0.16, 0.002);
  }
  for (const x of [-1.7, -1.1, -0.5, 0.5, 1.1, 1.7]) b.box(m.slate, 0.012, 0.008, 1.4, x, 0.225, 0, 0.002);
  b.box(p.fabricRed, 0.5, 0.01, 0.25, 1.4, 0.23, -0.5, 0.003);
  // 羽毛笔 + 墨水瓶 + 蜡封
  const pen = f.child(2.3, 0.84, 0.3, 0.4);
  pen.strut(p.fabricCream, [0, 0, 0], [0.5, 0.25, 0], 0.014, 5);
  pen.put(new THREE.ConeGeometry(0.04, 0.2, 5), p.fabricCream, 0.55, 0.28, 0, 0, 0, -1.2);
  const ink = f.child(2.8, 0.84, -0.2);
  ink.cyl(std(0x1d2b4d, 0.2, 0.2), 0.1, 0.12, 0.14, 0, 0, 0, 14);
  ink.cyl(m.brass, 0.06, 0.06, 0.04, 0, 0.14, 0, 10);
  f.cyl(p.fabricRed, 0.1, 0.1, 0.02, 1.4, 0.84, 0.6, 14);
  // 信物台（两端）：石座 + 发光信物
  for (const sx of [-1, 1]) {
    const t = f.child(sx * 3.9, 0, -0.2);
    t.cyl(m.stoneDark, 0.5, 0.6, 0.4, 0, 0, 0, 20);
    t.cyl(m.stone, 0.3, 0.4, 0.8, 0, 0.4, 0, 16);
    t.box(m.brass, 0.4, 0.06, 0.4, 0, 1.2, 0, 0.01);
    addBeacon(ctx, sx < 0 ? ctx.edge : ctx.glow, sx * 3.9, 2.0, -0.2, 0.3);
  }
  ctx.ring(4.6 * SCENE_SCALE, STAGE_Y + 0.12, Math.PI / 2);
  props.chair(k, f.child(0, 0, 1.2, Math.PI), m.woodDark);
  placePerson(ctx, { shirt: 0x496c72, hair: 0x555555, glasses: true, seated: true, pose: "write", lean: 0.1 }, 0, 0.45, 1.2, Math.PI);
  props.lampPost(k, f.child(-4.9, 0, 1.8));
  props.lampPost(k, f.child(4.9, 0, 1.8));
  finishStage(s, "scene-trust-ledger");
};

/** 可持续集市：三座带遮阳篷的绿色货摊（农产品筐、可重复使用的布袋、木桶）、屋顶太阳能板、雨水桶，顾客带着篮子逛 */
export const sustainableMarketScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.7, 3.8, 0.05, 0, 0, 0, 40);
  [-3.3, 0, 3.3].forEach((x, i) => {
    const st = f.child(x, 0, -0.5, -x * 0.04);
    props.awning(k, st.child(0, 0, -1.1, Math.PI), 2.6, 1.3, 8, i === 1 ? p.fabricGreen : p.fabricBlue, p.fabricCream);
    props.table(k, st.child(0, 0, 0.2), 2.2, 0.7, 0.85, m.wood);
    for (let j = 0; j < 3; j++) {
      st.cyl(m.wood, 0.28, 0.22, 0.2, -0.7 + j * 0.7, 0.85, 0.2, 16);
      for (let q = 0; q < 6; q++) st.ball(std([0x7ab648, 0xd94b3d, 0xf2a93b][(i + j + q) % 3], 0.6), 0.08, -0.7 + j * 0.7 + Math.cos(q * 1.1) * 0.12, 1.1, 0.2 + Math.sin(q * 1.1) * 0.1);
    }
    props.crate(k, st.child(-1.3, 0, -0.6, 0.2), 0.6, 0.5, 0.5);
    for (let j = 0; j < 3; j++) st.box(p.fabricCream, 0.22, 0.34, 0.04, 0.2 + j * 0.3, 1.0, 0.9, 0.01);
  });
  // 屋顶太阳能板（中间摊位上方）
  const sp = f.child(0, 0, -0.5);
  for (const dz of [-0.9, 0.9]) sp.box(std(0x1d2b4d, 0.25, 0.6), 2.4, 0.06, 0.9, 0, 3.15, dz, 0.01, dz > 0 ? -0.2 : 0.2);
  // 雨水桶
  props.barrel(k, f.child(-4.7, 0, -0.4), 0.34, 0.9);
  props.barrel(k, f.child(4.7, 0, -0.4), 0.34, 0.9);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "walk" }, -1.6, 0, 1.8, 0.4);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, scarf: 0x3f7a4f, pose: "listen" }, 1.5, 0, 1.9, -0.4);
  [-3.3, 0, 3.3].forEach((x) => addBeacon(ctx, ctx.glow, x, 3.9, -0.4, 0.14));
  props.planter(k, f.child(-1.8, 0, 3.0), 0.5, 57);
  props.planter(k, f.child(1.8, 0, 3.0), 0.5, 59);
  props.lampPost(k, f.child(-4.9, 0, 2.2));
  props.lampPost(k, f.child(4.9, 0, 2.2));
  finishStage(s, "scene-sustainable-market");
};

// ───────────────────────── Section C ─────────────────────────

/** 图书馆：三个通顶书架开间 + 中间的大门、阅读桌与台灯、滚动木梯和地球仪，读者在翻书 */
export const libraryScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 3.2, 3.2, 0.05, 0, 0, 0, 40);
  const hall = f.child(0, 0, -2.5, 0);
  hall.box(m.stoneDark, 8.0, 0.3, 1.0, 0, 0, 0, 0.03);
  hall.box(m.paper, 7.8, 4.2, 0.2, 0, 0.3, -0.35, 0.03);
  hall.put(archFrameGeo(3.9, 3.5, 0.9, 0.05), m.stone, 0, 3.8, 0);
  bookWall(s, -2.9, 0, -2.2, 2.3, 3.4, 7, 31, 0);
  bookWall(s, 2.9, 0, -2.2, 2.3, 3.4, 7, 37, 0);
  bookWall(s, 0, 0, -2.2, 2.3, 3.4, 7, 41, 0);
  props.ladder(k, f.child(1.6, 0, -1.9, 0), 3.0);
  for (const x of [-1.8, 1.8]) {
    props.table(k, f.child(x, 0, 0.5), 1.6, 0.8, 0.76, m.wood);
    const l = f.child(x - 0.4, 0.76, 0.5);
    l.cyl(m.brass, 0.1, 0.12, 0.03, 0, 0, 0, 14);
    l.cyl(m.brass, 0.012, 0.012, 0.36, 0, 0.03, 0, 6);
    l.put(new THREE.CylinderGeometry(0.1, 0.15, 0.12, 14, 1, true), std(0x2f6f4f, 0.5), 0, 0.42, 0);
    props.openBook(k, f.child(x + 0.1, 0.76, 0.5, 0.2));
    props.chair(k, f.child(x, 0, 1.3, Math.PI), m.woodDark);
  }
  props.globe(k, f.child(3.4, 0, 0.8));
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, glasses: true, seated: true, pose: "read" }, -1.8, 0.45, 1.3, Math.PI);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, hairStyle: "bun", seated: true, pose: "read" }, 1.8, 0.45, 1.3, Math.PI);
  addBeacon(ctx, ctx.glow, 0, 5.2, -2.0, 0.22);
  props.lampPost(k, f.child(-4.8, 0, 1.8));
  props.lampPost(k, f.child(4.8, 0, 1.8));
  finishStage(s, "scene-library");
};

/** 数字借阅：整面大触摸屏（封面网格界面）、两侧书架、借阅卡刷卡柱与充电平板桌，读者在屏前操作 */
export const digitalLendingScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  const wall = f.child(0, 0, -2.2, 0);
  wall.box(m.slate, 5.0, 0.3, 0.7, 0, 0, 0, 0.04);
  wall.box(p.plasticDark, 4.6, 3.4, 0.16, 0, 0.3, 0, 0.08);
  addCanvasPlane(ctx, makeLendingTexture(), 0, 0.3 + 1.7, -2.2 + 0.09, 4.3, 3.1);
  bookWall(s, -3.9, 0, -1.7, 2.0, 3.6, 7, 43, 0.3);
  bookWall(s, 3.9, 0, -1.7, 2.0, 3.6, 7, 47, -0.3);
  // 刷卡柱
  for (const sx of [-1, 1]) {
    const pl = f.child(sx * 2.8, 0, 0.4, -sx * 0.3);
    pl.cyl(m.darkSteel, 0.1, 0.14, 1.1, 0, 0, 0, 14);
    pl.box(p.plasticDark, 0.34, 0.16, 0.3, 0, 1.1, 0, 0.04, -0.3);
    pl.box(p.screenOn, 0.26, 0.01, 0.2, 0, 1.2, 0.0, 0.002, -0.3);
  }
  // 平板充电桌
  props.table(k, f.child(0, 0, 1.6), 2.4, 0.8, 0.72, m.wood);
  for (let i = 0; i < 4; i++) {
    const t = f.child(-0.8 + i * 0.5, 0.72, 1.6);
    t.box(p.plasticDark, 0.34, 0.02, 0.24, 0, 0, 0, 0.006, 0, 0, 0);
    t.put(new THREE.PlaneGeometry(0.3, 0.2), i % 2 ? p.screenOn : p.screenOff, 0, 0.022, 0, -Math.PI / 2);
  }
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0x2f5d8a, pose: "point" }, -0.6, 0, 0.3, 0.0);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, glasses: true, pose: "phone" }, 1.0, 0, 0.4, -0.2);
  addBeacon(ctx, ctx.glow, 0, 4.4, -2.0, 0.22);
  props.lampPost(k, f.child(-4.8, 0, 1.8));
  props.lampPost(k, f.child(4.8, 0, 1.8));
  finishStage(s, "scene-digital-lending");
};

/** 社区图书馆：中间的圆形阅读桌与围坐的读者、两侧书架、后墙彩色便签反馈墙，前方的还书台 */
export const communityLibraryScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 3.2, 3.2, 0.05, 0, 0, 0, 40);
  bookWall(s, -4.0, 0, -0.6, 2.2, 3.4, 7, 53, 0.45);
  bookWall(s, 4.0, 0, -0.6, 2.2, 3.4, 7, 59, -0.45);
  // 反馈墙：木框 + 一格格彩色便签
  const fw = f.child(0, 0, -2.5, 0);
  fw.box(m.woodDark, 5.6, 0.2, 0.5, 0, 0, 0, 0.03);
  fw.box(m.woodDark, 5.6, 3.2, 0.1, 0, 0.2, -0.1, 0.02);
  const tones = [0xf2c14e, 0xe8707a, 0x7cc0e8, 0x7ab648, 0xf4f1de, 0xb18ae0];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) fw.box(std(tones[(r * 3 + c) % tones.length], 0.9), 0.4, 0.4, 0.012, -2.4 + c * 0.6, 0.5 + r * 0.58, -0.04, 0.004, 0, 0, ((r + c) % 3 - 1) * 0.06);
  [[-1.4, 3.2], [0.9, 3.4], [-0.2, 4.1]].forEach(([x, y]) => addGlowCard(ctx, ctx.glow, x, y, -2.2, 0.4, 0.3));
  // 阅读圆桌 + 三位读者
  props.roundTable(k, f.child(0, 0, 0.3), 1.0, 0.76);
  props.openBook(k, f.child(-0.3, 0.76, 0.3, 0.3));
  props.bookStack(k, f.child(0.4, 0.76, 0.2, 0.2), 3, 7);
  [[-1.6, 0.4, Math.PI / 2 + 0.2, 0x79aaa5], [1.6, 0.4, -Math.PI / 2 - 0.2, 0xb99b7c], [0, 1.8, Math.PI, 0x6a8aa8]].forEach(([x, z, yaw, shirt], i) => {
    props.chair(k, f.child(x, 0, z, yaw), m.wood);
    placePerson(ctx, { shirt, hair: i === 1 ? 0x555555 : 0x2b1d16, seated: true, pose: i === 2 ? "write" : "read" }, x, 0.45, z, yaw);
  });
  // 还书台
  const rd = f.child(3.0, 0, 2.2, -0.4);
  rd.box(m.woodDark, 1.6, 1.0, 0.6, 0, 0, 0, 0.03);
  rd.box(m.wood, 1.7, 0.06, 0.7, 0, 1.0, 0, 0.012);
  rd.box(m.brass, 0.5, 0.04, 0.02, 0, 0.7, 0.31, 0.004);
  props.bookStack(k, rd.child(0.3, 1.06, 0, 0.1), 4, 12);
  props.lampPost(k, f.child(-4.8, 0, 2.0));
  props.lampPost(k, f.child(-3.2, 0, 3.2), 3.0);
  finishStage(s, "scene-community-library");
};

/** 知识之桥：两座书塔（四面书架）以石拱桥相连，桥面踏板与栏杆，一位读者走过、另一位在桥心读书 */
export const knowledgeBridgeScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  f.put(new THREE.CylinderGeometry(5.0, 5.0, 0.2, 48), p_water(k), 0, 0.12, 0.0);
  for (const sx of [-1, 1]) {
    const t = f.child(sx * 4.0, 0, 0, 0);
    t.box(m.stoneDark, 2.0, 0.4, 2.0, 0, 0, 0, 0.05);
    t.box(m.stone, 1.7, 3.6, 1.7, 0, 0.4, 0, 0.05);
    for (let r = 0; r < 4; r++) {
      t.box(m.wood, 1.5, 0.06, 0.2, 0, 0.8 + r * 0.8, 0.86, 0.01);
      for (let c = 0; c < 6; c++) t.box(k.p.books[(r * 3 + c) % k.p.books.length], 0.14, 0.4, 0.16, -0.6 + c * 0.24, 0.86 + r * 0.8, 0.88, 0.004);
    }
    t.put(gableGeo(2.0, 0.9, 2.0), m.slate, 0, 4.0, 0);
  }
  // 石拱桥
  f.box(m.stone, 6.4, 0.3, 1.8, 0, 1.4, 0, 0.04);
  f.put(archFrameGeo(2.8, 2.4, 1.7, 0.04), m.stoneDark, 0, 0.3, 0);
  for (let i = 0; i < 6; i++) f.box(i % 2 ? m.wood : m.woodDark, 0.8, 0.08, 1.5, -2.5 + i * 1.0, 1.7, 0, 0.012);
  for (const dz of [-0.85, 0.85]) {
    f.box(m.stoneDark, 6.4, 0.14, 0.16, 0, 2.55, dz, 0.02);
    for (let i = 0; i < 8; i++) f.box(m.stoneDark, 0.14, 0.8, 0.14, -3.0 + i * 0.86, 1.75, dz, 0.015);
  }
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "walk" }, -1.4, 1.7, 0.0, Math.PI / 2);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, hairStyle: "bun", pose: "read" }, 1.2, 1.7, 0.0, 0.2);
  addBeacon(ctx, ctx.glow, 0, 4.6, 0, 0.3);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  void emissive;
  finishStage(s, "scene-knowledge-bridge");
};

function p_water(k: ReturnType<typeof createStage>["k"]): THREE.Material {
  return k.p.water;
}

function worldPos(lx: number, ly: number, lz: number): [number, number, number] {
  const [x, z] = worldXZ(lx, lz);
  return [x, STAGE_Y + ly * SCENE_SCALE, z];
}

export const UNIT06_SCENES: Record<string, SceneModule> = {
  bookshop: bookshopScene,
  exchange: bookExchangeScene,
  resilience: resilienceScene,
  "budget-board": budgetBoardScene,
  "exchange-wall": exchangeWallScene,
  "resource-cycle": resourceCycleScene,
  "trust-ledger": trustLedgerScene,
  "sustainable-market": sustainableMarketScene,
  library: libraryScene,
  "digital-lending": digitalLendingScene,
  "community-library": communityLibraryScene,
  "knowledge-bridge": knowledgeBridgeScene,
};
