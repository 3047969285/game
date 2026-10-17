import * as THREE from "three";
import { archFrameGeo } from "../detailKit";
import * as props from "../sceneProps";
import { SCENE_SCALE, STAGE_Y, addBeacon, addCanvasPlane, createStage, finishStage, makeSignTexture, placePerson, worldXZ, type SceneModule, type Stage } from "./context";

/**
 * 单元 4「意义铸造所」12 个段落场景（职业与工艺主题）。
 * A：职业讨论 · 服务观察 · 小提琴 · 劳动尊严　B：卡尺 · 工艺品质 · 工艺演进 · 信任之桥　C：织机 · 绣台 · 传统纹样 · 活态传承
 */

const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial => {
  const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  m.fog = false;
  return m;
};

/** 程序化的传统纹样拼布：菱形 / 圆环 / 回纹交替 */
function makePatternTexture(cols: number, rows: number, seed: number): THREE.CanvasTexture | undefined {
  const cell = 120;
  const canvas = document.createElement("canvas");
  canvas.width = cols * cell;
  canvas.height = rows * cell;
  const g = canvas.getContext("2d");
  if (!g) return undefined;
  const palette = ["#b83b32", "#2f5d8a", "#c79a3a", "#3f7a4f", "#e8dec6", "#6a4a8a"];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c + seed;
      const x = c * cell;
      const y = r * cell;
      g.fillStyle = palette[(i * 5) % palette.length];
      g.fillRect(x, y, cell, cell);
      g.fillStyle = palette[(i * 3 + 4) % palette.length];
      const kind = i % 3;
      if (kind === 0) {
        g.beginPath();
        g.moveTo(x + cell / 2, y + 14);
        g.lineTo(x + cell - 14, y + cell / 2);
        g.lineTo(x + cell / 2, y + cell - 14);
        g.lineTo(x + 14, y + cell / 2);
        g.closePath();
        g.fill();
      } else if (kind === 1) {
        g.beginPath();
        g.arc(x + cell / 2, y + cell / 2, 38, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = palette[(i * 5) % palette.length];
        g.beginPath();
        g.arc(x + cell / 2, y + cell / 2, 18, 0, Math.PI * 2);
        g.fill();
      } else {
        g.lineWidth = 10;
        g.strokeStyle = palette[(i * 3 + 4) % palette.length];
        g.strokeRect(x + 20, y + 20, cell - 40, cell - 40);
        g.strokeRect(x + 40, y + 40, cell - 80, cell - 80);
      }
      g.strokeStyle = "rgba(0,0,0,0.2)";
      g.lineWidth = 2;
      g.strokeRect(x, y, cell, cell);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** 长工作台：台面 + 抽屉 + 台虎钳，桌下有横撑 */
function workbench(s: Stage, lx: number, lz: number, w: number, yaw = 0): void {
  const { k, f } = s;
  const b = f.child(lx, 0, lz, yaw);
  b.box(k.m.woodDark, w, 0.12, 1.0, 0, 0.8, 0, 0.02);
  b.box(k.m.wood, w + 0.1, 0.06, 1.05, 0, 0.92, 0, 0.015);
  for (const sx of [-1, 1]) b.box(k.m.woodDark, 0.12, 0.8, 0.9, sx * (w / 2 - 0.1), 0, 0, 0.02);
  b.box(k.m.woodDark, w - 0.4, 0.1, 0.1, 0, 0.3, -0.4, 0.01);
  for (let i = 0; i < 2; i++) b.box(k.m.wood, 0.9, 0.5, 0.04, -w / 2 + 0.8 + i * 1.05, 0.12, 0.47, 0.01);
  // 台虎钳
  b.box(k.m.darkSteel, 0.3, 0.2, 0.22, w / 2 - 0.5, 0.98, 0.3, 0.02);
  b.cyl(k.m.darkSteel, 0.02, 0.02, 0.4, w / 2 - 0.5, 1.0, 0.55, 8);
}

/** 工具钉板：墙板 + 悬挂的锤子 / 扳手 / 钳子 */
function pegboard(s: Stage, lx: number, lz: number, w = 2.6, h = 1.4): void {
  const { k, f } = s;
  const c = f.child(lx, 0, lz, 0);
  c.box(k.m.wood, w, h, 0.06, 0, 1.2, 0, 0.015);
  for (let i = 0; i < 4; i++) {
    const x = -w / 2 + 0.4 + i * (w - 0.8) / 3;
    c.box(k.m.darkSteel, 0.05, 0.5, 0.03, x, 1.6 - (i % 2) * 0.1, 0.06, 0.008);
    c.box(i % 2 ? k.m.brass : k.m.steel, 0.2, 0.1, 0.04, x, 2.1 - (i % 2) * 0.1, 0.06, 0.01);
  }
}

/** 钳形发光信标（局部坐标） */
function glowAt(s: Stage, mat: THREE.Material, lx: number, ly: number, lz: number, r = 0.2): void {
  addBeacon(s.ctx, mat, lx, ly, lz, r);
}

// ───────────────────────── Section A ─────────────────────────

/** 职业讨论：圆桌 + 三位围坐的参与者 + 半圆排开的三块职业展板与吊灯 */
export const careerScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 3.2, 3.2, 0.05, 0, 0, 0, 40);
  props.roundTable(k, f.child(0, 0, 0.2), 1.1, 0.74);
  props.laptop(k, f.child(-0.3, 0.74, 0.4, Math.PI));
  props.openBook(k, f.child(0.45, 0.74, 0.0, 0.3));
  props.cup(k, f.child(0.0, 0.74, 0.7));
  // 展板：三块立式职业板，每块有大号图形（齿轮 / 书 / 扳手）
  [-2.6, 0, 2.6].forEach((x, i) => {
    const bd = f.child(x, 0, -2.2, (1 - i) * 0.25);
    bd.box(m.stoneDark, 1.9, 0.14, 0.5, 0, 0, 0, 0.03);
    bd.box(m.woodDark, 0.1, 2.4, 0.1, -0.85, 0.14, 0, 0.01);
    bd.box(m.woodDark, 0.1, 2.4, 0.1, 0.85, 0.14, 0, 0.01);
    bd.box(p.boardWhite, 1.7, 1.9, 0.06, 0, 0.5, 0, 0.015);
    bd.box([m.copper, m.brass, m.steel][i], 1.5, 0.16, 0.02, 0, 2.2, 0.04, 0.005);
    if (i === 0) {
      bd.put(new THREE.TorusGeometry(0.35, 0.09, 8, 20), m.steel, 0, 1.3, 0.06);
      for (let t = 0; t < 8; t++) {
        const a = (t / 8) * Math.PI * 2;
        bd.box(m.steel, 0.12, 0.2, 0.08, Math.cos(a) * 0.48, 1.3 + Math.sin(a) * 0.48 - 0.1, 0.06, 0.01, 0, 0, a + Math.PI / 2);
      }
    } else if (i === 1) {
      props.openBook(k, bd.child(0, 0.9, 0.08, 0));
      bd.box(m.brass, 0.7, 0.04, 0.02, 0, 1.55, 0.05, 0.005);
    } else {
      bd.box(m.steel, 0.12, 0.9, 0.05, 0, 0.85, 0.06, 0.02, 0, 0, 0.7);
      bd.put(new THREE.TorusGeometry(0.17, 0.06, 8, 16, Math.PI * 1.5), m.steel, -0.24, 1.55, 0.06, 0, 0, 0.7);
    }
  });
  // 围坐：三把椅子 + 三位参与者
  const seats: Array<[number, number, number, number, "talk" | "listen" | "write", number]> = [
    [-1.8, 0.4, Math.PI / 2 + 0.15, 0x7d573d, "talk", 0x2b1d16],
    [1.8, 0.4, -Math.PI / 2 - 0.15, 0x496c72, "listen", 0x555555],
    [0, 2.0, Math.PI, 0x8a6844, "write", 0x3a2a1c],
  ];
  for (const [x, z, yaw, shirt, pose, hair] of seats) {
    props.chair(k, f.child(x, 0, z, yaw), m.wood);
    placePerson(ctx, { shirt, hair, seated: true, pose, glasses: pose === "write" }, x, 0.45, z, yaw);
  }
  // 吊灯（三盏）
  for (const x of [-2.0, 0, 2.0]) {
    f.strut(m.darkSteel, [x, 5.5, 0.2], [x, 4.2, 0.2], 0.01, 4);
    f.cyl(m.lampGlass, 0.2, 0.28, 0.4, x, 3.9, 0.2, 12);
    f.put(new THREE.ConeGeometry(0.3, 0.18, 12), m.brass, x, 4.38, 0.2);
  }
  glowAt(s, ctx.glow, 0, 3.6, 0.2, 0.28);
  props.lampPost(k, f.child(-4.7, 0, 1.2));
  props.lampPost(k, f.child(4.7, 0, 1.2));
  props.planter(k, f.child(-3.6, 0, 2.8), 0.5, 41);
  props.planter(k, f.child(3.6, 0, 2.8), 0.5, 43);
  finishStage(s, "scene-career");
};

/** 服务观察台：自习室的维护现场——一排课桌、一把短腿的椅子（带安全环）、检修清单板与工具箱，维修师傅在指点 */
export const benchScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  // 检修清单板
  const bd = f.child(0, 0, -2.4, 0);
  bd.box(m.stoneDark, 4.6, 0.16, 0.5, 0, 0, 0, 0.03);
  for (const sx of [-1, 1]) bd.box(m.woodDark, 0.12, 2.8, 0.12, sx * 2.1, 0.16, 0, 0.01);
  bd.box(m.woodDark, 4.6, 0.14, 0.2, 0, 2.95, 0, 0.02);
  bd.box(p.boardWhite, 4.2, 2.3, 0.05, 0, 0.55, 0.0, 0.01);
  for (let i = 0; i < 4; i++) {
    bd.box(m.slate, 2.4 - (i % 2) * 0.5, 0.06, 0.012, 0.3, 2.35 - i * 0.5, 0.04, 0.004);
    bd.cyl(i < 2 ? m.leaf : m.stoneDark, 0.1, 0.1, 0.012, -1.6, 2.28 - i * 0.5, 0.04, 14);
  }
  // 三套课桌椅（整齐），第四套椅子短腿
  [-3.0, -1.0, 1.0].forEach((x) => {
    props.desk(k, f.child(x, 0, 0.0, 0), 1.4, 0.7, 0.75);
    props.chair(k, f.child(x, 0, 0.8, Math.PI), m.wood);
  });
  const wob = f.child(3.0, 0, 0.0);
  props.desk(k, wob, 1.4, 0.7, 0.75);
  const chair = wob.child(0, 0, 0.8, Math.PI + 0.2);
  chair.box(m.wood, 0.42, 0.04, 0.42, 0, 0.4, 0, 0.01);
  chair.box(m.wood, 0.42, 0.34, 0.03, 0, 0.46, -0.2, 0.01, -0.08);
  for (const [sx, sz, h] of [[-1, -1, 0.4], [1, -1, 0.4], [-1, 1, 0.25], [1, 1, 0.4]] as const) chair.cyl(m.woodDark, 0.018, 0.022, h, sx * 0.18, 0, sz * 0.18, 8);
  const ring = ctx.ring(0.9, STAGE_Y + 0.15, Math.PI / 2);
  ring.scale.setScalar(0.8);
  const [rx, rz] = worldXZ(3.0, 0.8);
  ring.position.set(rx, STAGE_Y + 0.25, rz);
  // 工具箱 + 维修师傅
  const tb = f.child(2.0, 0, 1.5, 0.3);
  tb.box(p.fabricRed, 0.6, 0.28, 0.28, 0, 0, 0, 0.03);
  tb.box(m.darkSteel, 0.5, 0.04, 0.08, 0, 0.28, 0, 0.01);
  placePerson(ctx, { shirt: 0x2f5d8a, trousers: 0x3a3f45, hair: 0x2b1d16, pose: "point", backpack: 0xc79a3a }, 1.3, 0, 1.8, 0.5);
  addBeacon(ctx, ctx.glow, -1.6, 3.2, -1.9, 0.14);
  props.lampPost(k, f.child(-4.6, 0, 1.4));
  props.lampPost(k, f.child(4.6, 0, 1.4));
  finishStage(s, "scene-bench");
};

/** 小提琴：巨型的木质小提琴雕塑立在石座上，琴弦、琴桥、f 孔与琴头俱全；旁有琴谱架和一位听众 */
export const violinScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const varnish = std(0xa8531f, 0.35, 0.05);
  const dark = std(0x2b1608, 0.5, 0.1);
  f.cyl(m.stoneDark, 2.2, 2.4, 0.4, 0, 0, -0.4, 24);
  f.cyl(m.stone, 1.9, 2.0, 0.3, 0, 0.4, -0.4, 24);
  const v = f.child(0, 0.85, -0.4, 0);
  // 琴身：上下两瓣 + 腰
  v.put(new THREE.SphereGeometry(1.0, 32, 20), varnish, 0, 1.0, 0, 0, 0, 0, 0.95, 1.1, 0.28);
  v.put(new THREE.SphereGeometry(0.78, 32, 20), varnish, 0, 2.15, 0, 0, 0, 0, 0.9, 0.95, 0.27);
  v.put(new THREE.CylinderGeometry(0.5, 0.5, 0.36, 24), varnish, 0, 1.6, 0, Math.PI / 2, 0, 0, 1, 1, 1.1);
  // 面板上的 f 孔 / 琴桥 / 弦
  for (const sx of [-1, 1]) v.box(dark, 0.06, 0.55, 0.02, sx * 0.34, 1.4, 0.31, 0.01, 0, 0, sx * 0.12);
  v.box(std(0xd8b070, 0.5), 0.5, 0.1, 0.1, 0, 1.0, 0.33, 0.02);
  v.box(dark, 0.8, 0.18, 0.1, 0, 0.2, 0.3, 0.02);
  // 指板 + 琴颈 + 琴头（涡卷）
  v.box(dark, 0.22, 2.4, 0.14, 0, 1.8, 0.3, 0.03);
  v.box(varnish, 0.2, 0.5, 0.2, 0, 4.1, 0.15, 0.04);
  v.put(new THREE.TorusGeometry(0.2, 0.07, 10, 20, Math.PI * 1.7), varnish, 0, 4.75, 0.15, 0, 0, 0.6);
  for (let i = 0; i < 4; i++) {
    v.cyl(m.brass, 0.045, 0.045, 0.22, (i % 2 ? 1 : -1) * 0.2, 4.0 + (i > 1 ? 0.28 : 0), 0.15, 8);
    v.strut(m.steel, [-0.075 + i * 0.05, 4.0, 0.38], [-0.075 + i * 0.05, 0.4, 0.38], 0.008, 4);
  }
  glowAt(s, ctx.edge, 0, 5.8, -0.4, 0.28);
  // 弓靠在石座前
  const bow = f.child(2.2, 0, 0.4, 0);
  bow.strut(m.woodDark, [0, 0, 0], [0.5, 3.4, 0], 0.025, 6);
  bow.strut(p.fabricCream, [0.04, 0.2, 0.05], [0.46, 3.2, 0.05], 0.012, 4);
  // 琴谱架 + 听众
  const st = f.child(-2.8, 0, 1.3, 0.3);
  st.cyl(m.darkSteel, 0.03, 0.05, 1.4, 0, 0, 0, 8);
  st.box(m.darkSteel, 0.7, 0.4, 0.03, 0, 1.4, 0, 0.01, -0.35);
  st.box(m.paper, 0.6, 0.32, 0.01, 0, 1.43, 0.03, 0.003, -0.35);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, hairStyle: "long", pose: "listen" }, 2.8, 0, 1.4, -0.4);
  props.lampPost(k, f.child(-4.5, 0, -0.8));
  props.lampPost(k, f.child(4.5, 0, -0.8));
  props.planter(k, f.child(-3.6, 0, 2.8), 0.5, 45);
  props.planter(k, f.child(3.6, 0, 2.8), 0.5, 47);
  finishStage(s, "scene-violin");
};

/** 劳动尊严：四座石座各托一件工具雕塑（锤 / 扳手 / 齿轮 / 圆规），共享的中央信标与光环 */
export const workDignityScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  f.cyl(m.stoneWarm, 3.7, 3.8, 0.05, 0, 0, 0, 40);
  f.cyl(m.paveA, 2.6, 2.6, 0.06, 0, 0, 0.0, 40);
  const xs = [-3.6, -1.2, 1.2, 3.6];
  xs.forEach((x, i) => {
    const t = f.child(x, 0, 0.2, (i - 1.5) * -0.1);
    t.box(m.stoneDark, 1.3, 0.3, 1.3, 0, 0, 0, 0.04);
    t.box(m.stone, 1.05, 1.0, 1.05, 0, 0.3, 0, 0.05);
    t.box(m.brass, 0.7, 0.28, 0.03, 0, 0.62, 0.54, 0.008);
    const e = t.child(0, 1.5, 0);
    if (i === 0) {
      e.box(m.woodDark, 0.12, 1.1, 0.12, 0, -0.1, 0, 0.02, 0, 0, 0.35);
      e.box(m.steel, 0.5, 0.26, 0.26, -0.17, 0.5, 0, 0.03, 0, 0, 0.35);
    } else if (i === 1) {
      e.box(m.steel, 0.16, 1.3, 0.08, 0, -0.1, 0, 0.03, 0, 0, -0.4);
      e.put(new THREE.TorusGeometry(0.2, 0.08, 8, 20, Math.PI * 1.6), m.steel, 0.28, 0.58, 0, 0, 0, -0.4);
    } else if (i === 2) {
      e.put(new THREE.TorusGeometry(0.4, 0.12, 10, 24), m.brass, 0, 0.35, 0);
      for (let g = 0; g < 10; g++) {
        const a = (g / 10) * Math.PI * 2;
        e.box(m.brass, 0.14, 0.2, 0.2, Math.cos(a) * 0.55, 0.35 + Math.sin(a) * 0.55 - 0.1, 0, 0.02, 0, 0, a + Math.PI / 2);
      }
    } else {
      e.strut(m.steel, [0, 0.9, 0], [-0.35, -0.3, 0], 0.035, 6);
      e.strut(m.steel, [0, 0.9, 0], [0.35, -0.3, 0], 0.035, 6);
      e.ball(m.brass, 0.09, 0, 0.9, 0);
    }
  });
  glowAt(s, ctx.glow, 0, 3.9, 0.2, 0.3);
  ctx.ring(4.8, STAGE_Y + 0.12, Math.PI / 2);
  for (const x of [-2.4, 0, 2.4]) props.bench(k, f.child(x, 0, 2.6, 0), 1.6);
  props.lampPost(k, f.child(-4.8, 0, 1.6));
  props.lampPost(k, f.child(4.8, 0, 1.6));
  finishStage(s, "scene-work-dignity");
};

// ───────────────────────── Section B ─────────────────────────

/** 卡尺：一把巨型游标卡尺横卧在支架上（刻度尺、固定爪、滑动爪与数显），夹着一根黄铜圆棒 */
export const caliperScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  workbench(s, 0, -0.4, 6.6, 0);
  const c = f.child(0, 1.0, -0.4, 0);
  // 主尺 + 刻度
  c.box(m.steel, 5.6, 0.16, 0.5, 0, 0.0, 0, 0.02);
  for (let i = 0; i <= 56; i++) c.box(m.darkSteel, 0.014, i % 5 === 0 ? 0.12 : 0.07, 0.01, -2.8 + i * 0.1, i % 5 === 0 ? 0.04 : 0.08, 0.255, 0.002);
  // 固定爪（左）+ 滑动爪（可测圆棒）
  c.box(m.steel, 0.2, 1.4, 0.5, -2.7, -0.0, 0, 0.02);
  c.box(m.steel, 0.2, 1.4, 0.5, -0.2, 0.0, 0.0, 0.02);
  c.box(m.steel, 1.2, 0.5, 0.52, 0.45, 0.16, 0, 0.03);
  c.box(p.plasticDark, 0.6, 0.26, 0.04, 0.5, 0.45, 0.28, 0.02);
  c.put(new THREE.PlaneGeometry(0.5, 0.18), p.screenOn, 0.5, 0.58, 0.304);
  c.cyl(m.darkSteel, 0.08, 0.08, 0.1, 0.9, 0.68, 0.0, 14);
  // 被测圆棒
  c.cyl(m.brass, 0.5, 0.5, 1.2, -1.45, 0.16, 0, 24);
  glowAt(s, ctx.glow, -0.2, 2.6, -0.4, 0.28);
  glowAt(s, ctx.edge, 0.5, 2.0, -0.4, 0.16);
  pegboard(s, 0, -2.4, 3.6, 1.6);
  placePerson(ctx, { shirt: 0x496c72, trousers: 0x3a3f45, hair: 0x2b1d16, glasses: true, pose: "point" }, 0.0, 0, 1.6, 0.0);
  props.lampPost(k, f.child(-4.8, 0, 1.4));
  props.lampPost(k, f.child(4.8, 0, 1.4));
  finishStage(s, "scene-caliper");
};

/** 工艺品质：一张长工作台并排三件同样精度的作品（木凳 / 陶瓶 / 黄铜件），检验灯、钉板，两位匠人在检视 */
export const craftQualityScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  workbench(s, 0, -0.5, 7.0, 0);
  const top = 0.98;
  // 木凳
  const st = f.child(-2.3, top, -0.5);
  st.cyl(m.wood, 0.35, 0.35, 0.06, 0, 0.55, 0, 24);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    st.strut(m.woodDark, [Math.cos(a) * 0.25, 0.55, Math.sin(a) * 0.25], [Math.cos(a) * 0.38, 0, Math.sin(a) * 0.38], 0.04, 8);
  }
  // 陶瓶
  const vase = f.child(0, top, -0.5);
  vase.put(new THREE.LatheGeometry([new THREE.Vector2(0.01, 0), new THREE.Vector2(0.28, 0.02), new THREE.Vector2(0.4, 0.35), new THREE.Vector2(0.22, 0.7), new THREE.Vector2(0.14, 0.9), new THREE.Vector2(0.2, 1.0)].map((v) => v), 28), k.p.ceramic, 0, 0, 0);
  vase.put(new THREE.TorusGeometry(0.34, 0.015, 6, 28), std(0x2f5d8a, 0.4), 0, 0.4, 0, Math.PI / 2);
  // 黄铜零件（带孔圆盘 + 螺栓）
  const part = f.child(2.3, top, -0.5);
  part.cyl(m.brass, 0.38, 0.38, 0.12, 0, 0.0, 0, 28);
  part.cyl(m.brass, 0.24, 0.24, 0.3, 0, 0.12, 0, 20);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    part.cyl(m.darkSteel, 0.04, 0.04, 0.02, Math.cos(a) * 0.3, 0.12, Math.sin(a) * 0.3, 8);
  }
  // 检验灯（可调臂灯）
  const lp = f.child(-3.2, top, -0.9);
  lp.cyl(m.darkSteel, 0.1, 0.12, 0.04, 0, 0, 0, 14);
  lp.strut(m.darkSteel, [0, 0.04, 0], [0.5, 0.9, 0], 0.02, 6);
  lp.strut(m.darkSteel, [0.5, 0.9, 0], [1.4, 1.4, 0.1], 0.02, 6);
  lp.put(new THREE.ConeGeometry(0.2, 0.3, 14, 1, true), m.brass, 1.45, 1.35, 0.1, Math.PI);
  [-2.3, 0, 2.3].forEach((x) => addBeacon(ctx, x === 0 ? ctx.glow : ctx.edge, x, 3.1, -0.5, 0.14));
  pegboard(s, 0, -2.4, 3.8, 1.5);
  placePerson(ctx, { shirt: 0x7d573d, hair: 0x2b1d16, hairStyle: "short", glasses: true, pose: "write" }, -1.3, 0, 0.9, 0.2);
  placePerson(ctx, { shirt: 0x496c72, hair: 0x555555, pose: "point", scarf: 0xc79a3a }, 1.3, 0, 0.9, -0.2);
  props.lampPost(k, f.child(-4.8, 0, 1.4));
  props.lampPost(k, f.child(4.8, 0, 1.4));
  finishStage(s, "scene-craft-quality");
};

/** 工艺演进：左边是老式表盘量具，右边是数显量具，中间一条光路与成果信标；匠人对比两者 */
export const craftEvolutionScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  workbench(s, 0, -0.6, 7.4, 0);
  const top = 0.98;
  // 老式表盘量具：立柱 + 表盘（刻度 + 指针）
  const old = f.child(-2.4, top, -0.6, 0.15);
  old.cyl(m.darkSteel, 0.05, 0.07, 1.0, 0, 0, 0, 10);
  old.cyl(m.slate, 0.2, 0.25, 0.08, 0, 0, 0, 16);
  old.put(new THREE.CylinderGeometry(0.62, 0.62, 0.14, 40), p.ceramic, 0, 1.4, 0, Math.PI / 2);
  old.put(new THREE.TorusGeometry(0.64, 0.07, 10, 40), m.brass, 0, 1.4, 0.08);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    old.box(m.darkSteel, 0.02, i % 6 === 0 ? 0.13 : 0.07, 0.01, Math.sin(a) * 0.5, 1.4 + Math.cos(a) * 0.5 - 0.05, 0.085, 0.002, 0, 0, -a);
  }
  old.box(p.fabricRed, 0.025, 0.46, 0.01, 0.05, 1.4, 0.1, 0.004, 0, 0, -0.5);
  old.cyl(m.darkSteel, 0.03, 0.03, 0.3, 0, 0.9, 0.0, 8);
  // 数显量具：显示屏（画布数字）+ 探头
  const dig = f.child(2.4, top, -0.6, -0.15);
  dig.cyl(m.darkSteel, 0.05, 0.07, 1.0, 0, 0, 0, 10);
  dig.cyl(m.slate, 0.2, 0.25, 0.08, 0, 0, 0, 16);
  dig.box(p.plasticDark, 1.5, 1.0, 0.12, 0, 0.9, 0, 0.06);
  const digits = makeSignTexture([{ text: "12.347", y: 120, font: "bold 110px 'Courier New', monospace", color: "#8ff0d8" }, { text: "mm", y: 230, font: "bold 48px Arial, sans-serif", color: "#7ab8a8" }], { width: 600, height: 340, background: "#10252a", border: "#2e6a64" });
  addCanvasPlane(ctx, digits, 2.4 * 1 + 0.02, top + 1.42, -0.6 + 0.08, 1.3, 0.78, -0.15);
  dig.cyl(m.steel, 0.03, 0.03, 0.4, 0, 0.5, 0.2, 8);
  // 光路 + 成果信标
  const pts = [[-1.6, 3.0], [-0.8, 3.9], [0, 4.2], [0.8, 3.9], [1.6, 3.0]].map(([x, y]) => new THREE.Vector3(...[worldXZ(x, -0.6)[0], STAGE_Y + y * SCENE_SCALE, worldXZ(x, -0.6)[1]]));
  const arc = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 36, 0.05, 6, false), ctx.glow);
  arc.userData.isLandscapeRoute = true;
  ctx.root.add(arc);
  glowAt(s, ctx.edge, 0, 4.6, -0.6, 0.26);
  pegboard(s, 0, -2.5, 3.8, 1.5);
  placePerson(ctx, { shirt: 0x7d573d, hair: 0x2b1d16, glasses: true, pose: "point" }, 0.0, 0, 1.1, 0.0);
  props.lampPost(k, f.child(-4.8, 0, 1.4));
  props.lampPost(k, f.child(4.8, 0, 1.4));
  finishStage(s, "scene-craft-evolution");
};

/** 信任之桥：石桥墩承托的钢木吊桥，两座桥塔与主缆，桥上两人相向而行、握手致意 */
export const trustBridgeScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  f.put(new THREE.CylinderGeometry(5.0, 5.0, 0.2, 48), k.p.water, 0, 0.12, 0.0);
  const deckY = 1.6;
  for (const sx of [-1, 1]) {
    f.box(m.stoneDark, 1.5, 0.5, 2.2, sx * 4.0, 0, 0, 0.04);
    f.box(m.stone, 1.2, deckY - 0.5, 1.8, sx * 4.0, 0.5, 0, 0.05);
  }
  for (let i = 0; i < 24; i++) f.box(i % 2 ? m.wood : m.woodDark, 0.34, 0.08, 1.5, -4.0 + i * 0.35, deckY, 0, 0.01);
  for (const dz of [-0.8, 0.8]) f.box(m.darkSteel, 8.6, 0.14, 0.12, 0, deckY - 0.12, dz, 0.02);
  // 桥塔 + 主缆
  for (const x of [-3.4, 3.4]) {
    for (const dz of [-0.9, 0.9]) f.box(m.stone, 0.4, 3.6, 0.4, x, deckY, dz, 0.04);
    f.box(m.stoneDark, 0.5, 0.3, 2.2, x, deckY + 3.6, 0, 0.04);
  }
  for (const dz of [-0.9, 0.9]) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const x = -4.2 + t * 8.4;
      const y = deckY + 3.8 - Math.sin(t * Math.PI) * 2.6 + (Math.abs(x) > 3.4 ? 0 : 0);
      pts.push(new THREE.Vector3(...[worldXZ(x, dz)[0], STAGE_Y + y * SCENE_SCALE, worldXZ(x, dz)[1]]));
    }
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.035 * SCENE_SCALE, 6, false), std(0x2b3036, 0.5, 0.6));
    cable.userData.isLandscapeRoute = true;
    ctx.root.add(cable);
    for (let i = 1; i < 12; i++) {
      const t = i / 12;
      const x = -4.2 + t * 8.4;
      const y = deckY + 3.8 - Math.sin(t * Math.PI) * 2.6;
      f.strut(m.steel, [x, deckY + 0.1, dz], [x, y, dz], 0.012, 4);
    }
  }
  for (const dz of [-0.78, 0.78]) props.railing(k, f.child(-4.0, deckY + 0.08, dz, 0), 8.0, 0.95, m.woodDark);
  placePerson(ctx, { shirt: 0x496c72, trousers: 0x3a3f45, hair: 0x2b1d16, backpack: 0xc79a3a, pose: "talk" }, -0.55, deckY + 0.08, 0.0, Math.PI / 2 + 0.3);
  placePerson(ctx, { shirt: 0x7d573d, hair: 0x555555, scarf: 0xb04a40, pose: "talk" }, 0.55, deckY + 0.08, 0.0, -Math.PI / 2 - 0.3);
  glowAt(s, ctx.glow, 0, 5.6, 0, 0.3);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  finishStage(s, "scene-trust-bridge");
};

// ───────────────────────── Section C ─────────────────────────

/** 织机：木制立式织机，竖向经线、已织出的彩色布面、梭子与综杆，织工坐在前面，旁边是纱线篮 */
export const loomScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  const l = f.child(0, 0, -1.2, 0);
  for (const sx of [-1, 1]) {
    l.box(m.woodDark, 0.3, 0.2, 1.3, sx * 2.0, 0, 0, 0.03);
    l.box(m.wood, 0.22, 4.4, 0.22, sx * 2.0, 0.2, 0, 0.03);
  }
  l.box(m.wood, 4.4, 0.24, 0.24, 0, 4.4, 0, 0.03);
  l.box(m.woodDark, 4.2, 0.18, 0.2, 0, 0.9, 0, 0.02);
  const tones = [0xb83b32, 0x2f5d8a, 0xc79a3a, 0x3f7a4f, 0xe8dec6];
  for (let i = 0; i < 22; i++) l.cyl(i % 3 === 0 ? std(0xe8dec6, 0.9) : std(tones[i % tones.length], 0.9), 0.014, 0.014, 3.4, -1.9 + i * 0.18, 1.0, 0.0, 5);
  for (let r = 0; r < 4; r++) l.box(std(tones[(r + 1) % tones.length], 0.9), 3.9, 0.22, 0.04, 0, 1.0 + r * 0.24, 0.03, 0.008);
  l.box(m.woodDark, 4.0, 0.08, 0.12, 0, 2.6, 0.1, 0.01);
  l.box(m.wood, 3.9, 0.05, 0.1, 0, 3.2, -0.05, 0.01);
  for (let i = 0; i < 6; i++) l.cyl(m.stoneDark, 0.1, 0.12, 0.3, -1.8 + i * 0.72, 0.5, 0.2, 10);
  // 梭子
  f.box(m.woodDark, 0.5, 0.05, 0.1, 0.9, 1.5, -1.0, 0.02, 0, 0, 0.1);
  // 织工
  props.stool(k, f.child(0, 0, 0.6), 0.46);
  placePerson(ctx, { shirt: 0xb83b32, hair: 0x2b1d16, hairStyle: "bun", seated: true, pose: "write", lean: 0.1 }, 0, 0.46, 0.6, Math.PI);
  // 纱线篮
  for (const [x, z] of [[-3.0, 0.6], [3.0, 0.8]] as const) {
    const b = f.child(x, 0, z);
    b.cyl(m.wood, 0.4, 0.3, 0.45, 0, 0, 0, 18);
    for (let i = 0; i < 5; i++) b.ball(std(tones[i % tones.length], 0.9), 0.14, Math.cos(i * 1.3) * 0.18, 0.5, Math.sin(i * 1.3) * 0.18);
  }
  glowAt(s, ctx.glow, 0, 5.6, -1.2, 0.26);
  props.lampPost(k, f.child(-4.8, 0, 1.6));
  props.lampPost(k, f.child(4.8, 0, 1.6));
  finishStage(s, "scene-loom");
};

/** 绣台：大绣架（画布花样）立在桌后，桌上线轴、剪刀与针线盒，灯下坐着一位刺绣的人 */
export const embroideryScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  props.table(k, f.child(0, 0, 0.2), 4.4, 1.1, 0.78, m.wood);
  // 绣架：双立柱 + 大绣绷（画布花样）
  const fr = f.child(0, 0.78, -0.1, 0);
  for (const sx of [-1, 1]) fr.box(m.woodDark, 0.1, 2.2, 0.1, sx * 1.35, 0, -0.1, 0.01);
  fr.box(m.woodDark, 2.9, 0.1, 0.1, 0, 2.2, -0.1, 0.01);
  fr.put(new THREE.TorusGeometry(1.1, 0.07, 10, 40), m.wood, 0, 1.3, -0.1);
  const art = document.createElement("canvas");
  art.width = 800;
  art.height = 800;
  const g = art.getContext("2d");
  let tex: THREE.CanvasTexture | undefined;
  if (g) {
    g.fillStyle = "#efe6d0";
    g.fillRect(0, 0, 800, 800);
    const petals = ["#c13b4a", "#e0a63a", "#3f7a4f", "#2f5d8a"];
    g.translate(400, 400);
    for (let ring = 0; ring < 3; ring++) {
      for (let i = 0; i < 8; i++) {
        g.save();
        g.rotate((i / 8) * Math.PI * 2 + ring * 0.2);
        g.fillStyle = petals[(i + ring) % 4];
        g.beginPath();
        g.ellipse(0, -170 + ring * 45 - ring * 15, 52 - ring * 10, 120 - ring * 28, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
      }
    }
    g.fillStyle = "#e0a63a";
    g.beginPath();
    g.arc(0, 0, 46, 0, Math.PI * 2);
    g.fill();
    tex = new THREE.CanvasTexture(art);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
  }
  if (tex) {
    const disc = new THREE.Mesh(new THREE.CircleGeometry(1.06 * SCENE_SCALE, 48), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, side: THREE.DoubleSide }));
    const [dx, dz] = worldXZ(0, -0.1 - 0.05);
    disc.position.set(dx, STAGE_Y + (0.78 + 1.3) * SCENE_SCALE, dz);
    disc.rotation.y = Math.PI;
    disc.userData.noLandscapeShadow = true;
    ctx.root.add(disc);
  }
  // 线轴架：三排彩色线轴
  const rack = f.child(-3.6, 0, -0.9, 0.2);
  rack.box(m.woodDark, 0.9, 2.0, 0.3, 0, 0, 0, 0.02);
  const cols = [0xb83b32, 0x2f5d8a, 0xc79a3a, 0x3f7a4f, 0x6a4a8a, 0xe8dec6];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) rack.cyl(std(cols[(r * 3 + c) % cols.length], 0.8), 0.07, 0.07, 0.14, -0.3 + c * 0.2, 0.25 + r * 0.36, 0.15, 12);
  // 桌面：线轴、剪刀、针线盒、灯
  for (let i = 0; i < 6; i++) f.cyl(std(cols[i % cols.length], 0.8), 0.06, 0.06, 0.12, -1.7 + i * 0.22, 0.78, 0.65, 12);
  f.box(m.woodDark, 0.5, 0.14, 0.34, 1.6, 0.78, 0.6, 0.03);
  f.strut(m.steel, [1.0, 0.8, 0.7], [1.3, 0.82, 0.78], 0.01, 4);
  props.cup(k, f.child(-0.4, 0.78, 0.7));
  const lamp = f.child(2.0, 0.78, 0.0);
  lamp.cyl(m.darkSteel, 0.1, 0.12, 0.04, 0, 0, 0, 14);
  lamp.strut(m.darkSteel, [0, 0.04, 0], [0.1, 0.9, 0], 0.02, 6);
  lamp.put(new THREE.ConeGeometry(0.2, 0.22, 14, 1, true), m.brass, 0.12, 0.95, 0, Math.PI);
  glowAt(s, ctx.glow, 2.12, 2.2, 0.0, 0.1);
  props.chair(k, f.child(-0.6, 0, 1.4, Math.PI), m.woodDark);
  placePerson(ctx, { shirt: 0x3f7a4f, hair: 0x2b1d16, hairStyle: "long", glasses: true, seated: true, pose: "write", lean: 0.12 }, -0.6, 0.45, 1.4, Math.PI);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  finishStage(s, "scene-embroidery");
};

/** 传统纹样：整面拼布纹样墙（画布）、下方两只展示柜，一位观众阅读说明 */
export const heritageScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  const w = f.child(0, 0, -2.2, 0);
  w.box(m.stoneDark, 6.6, 0.2, 0.8, 0, 0, 0, 0.03);
  for (const sx of [-1, 1]) w.box(m.woodDark, 0.2, 4.4, 0.3, sx * 3.2, 0.2, 0, 0.02);
  w.box(m.woodDark, 6.6, 0.22, 0.3, 0, 4.4, 0, 0.02);
  w.box(m.woodDark, 6.2, 4.0, 0.1, 0, 0.35, 0, 0.02);
  addCanvasPlane(ctx, makePatternTexture(7, 5, 3), 0, 0.35 + 2.0, -2.2 + 0.07, 5.9, 3.85);
  // 展示柜（玻璃罩 + 织物）
  for (const sx of [-1, 1]) {
    const c = f.child(sx * 2.4, 0, 0.5, -sx * 0.15);
    c.box(m.woodDark, 1.8, 0.8, 0.9, 0, 0, 0, 0.03);
    c.put(new THREE.BoxGeometry(1.7, 0.5, 0.8), m.glass, 0, 1.05, 0);
    c.box(sx < 0 ? p.fabricRed : p.fabricBlue, 1.4, 0.04, 0.6, 0, 0.82, 0, 0.01);
    c.box(p.fabricCream, 1.0, 0.04, 0.5, 0, 0.86, 0, 0.01, 0, 0.2);
  }
  addBeacon(ctx, ctx.glow, 0, 4.6, -2.0, 0.24);
  placePerson(ctx, { shirt: 0x6a4a8a, hair: 0x2b1d16, hairStyle: "bun", pose: "read" }, 0.0, 0, 1.6, 0.0);
  props.bench(k, f.child(-4.4, 0, 1.8, 0.4), 1.6);
  props.lampPost(k, f.child(-4.8, 0, 0.2));
  props.lampPost(k, f.child(4.8, 0, 0.2));
  finishStage(s, "scene-heritage");
};

/** 活态传承：三重渐窄的拱门依次后退，每重门下悬挂纹样织锦，前方一架纺车，师傅与学徒在交谈 */
export const livingHeritageScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  [0, 1, 2].forEach((i) => {
    const z = -0.2 - i * 1.15;
    const half = 2.5 - i * 0.45;
    const h = 3.3 - i * 0.2;
    const c = f.child(0, 0, z, 0);
    for (const sx of [-1, 1]) {
      c.box(m.stoneDark, 0.8, 0.26, 0.8, sx * (half + 0.1), 0, 0, 0.04);
      c.box(m.stone, 0.56, h - 0.26, 0.56, sx * (half + 0.1), 0.26, 0, 0.05);
    }
    c.put(archFrameGeo(half + 0.4, half - 0.16, 0.56, 0.05), i === 1 ? m.stoneWarm : m.stone, 0, h, 0);
    // 悬挂的织锦
    const tex = makePatternTexture(2, 5, i * 4 + 1);
    addCanvasPlane(ctx, tex, 0, 2.2, z + 0.05, half * 0.7, 2.6 - i * 0.2);
    c.box(m.woodDark, half * 0.8, 0.08, 0.1, 0, 3.55 - i * 0.2, 0.0, 0.015);
    addBeacon(ctx, i === 1 ? ctx.edge : ctx.glow, 0, h + half + 0.5, z, 0.16);
  });
  // 纺车：大轮 + 辐条 + 锭子 + 踏板
  const w = f.child(-2.8, 0, 1.8, 0.4);
  w.put(new THREE.TorusGeometry(0.6, 0.05, 8, 32), m.wood, 0, 0.8, 0.0);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    w.strut(m.wood, [0, 0.8, 0], [Math.cos(a) * 0.58, 0.8 + Math.sin(a) * 0.58, 0], 0.02, 5);
  }
  w.cyl(m.woodDark, 0.06, 0.06, 0.12, 0, 0.76, 0, 10);
  w.box(m.woodDark, 0.12, 0.8, 0.12, 0, 0.0, 0, 0.02);
  w.box(m.woodDark, 1.4, 0.1, 0.5, 0.3, 0.12, 0, 0.02);
  w.strut(m.steel, [0.7, 0.9, 0.0], [1.2, 0.9, 0.0], 0.015, 4);
  w.cyl(p.fabricCream, 0.1, 0.1, 0.2, 1.2, 0.78, 0, 10);
  placePerson(ctx, { shirt: 0x6a4a8a, hair: 0x555555, hairStyle: "bun", pose: "point" }, 0.9, 0, 1.6, 0.4);
  placePerson(ctx, { shirt: 0x3f7a4f, hair: 0x2b1d16, pose: "listen" }, 2.0, 0, 1.5, -0.4);
  props.lampPost(k, f.child(-4.8, 0, 0.2));
  props.lampPost(k, f.child(4.8, 0, 0.2));
  props.planter(k, f.child(3.8, 0, 2.6), 0.5, 49);
  finishStage(s, "scene-living-heritage");
};

export const UNIT04_SCENES: Record<string, SceneModule> = {
  career: careerScene,
  bench: benchScene,
  violin: violinScene,
  "work-dignity": workDignityScene,
  caliper: caliperScene,
  "craft-quality": craftQualityScene,
  "craft-evolution": craftEvolutionScene,
  "trust-bridge": trustBridgeScene,
  loom: loomScene,
  "embroidery-table": embroideryScene,
  heritage: heritageScene,
  "living-heritage": livingHeritageScene,
};
