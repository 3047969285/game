import * as THREE from "three";
import * as props from "../sceneProps";
import { SCENE_SCALE, STAGE_Y, addBeacon, addCanvasPlane, createStage, finishStage, makeSignTexture, placePerson, worldXZ, type SceneModule, type Stage } from "./context";

/**
 * 单元 5「月背观测站」12 个段落场景（航天主题）。
 * A：月球探测器 · 中继桥 · 样本实验室 · 月平线　B：测试控制台 · 轨道调整 · 系统仿真 · 任务控制　C：训练 · 乘组模拟 · 科学展 · 未来前沿
 */

const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial => {
  const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  m.fog = false;
  return m;
};
const emissive = (color: number, intensity = 0.8): THREE.MeshStandardMaterial => std(color, 0.35, 0.1, { emissive: color, emissiveIntensity: intensity });

const WHITE = std(0xe9eef0, 0.4, 0.25);
const GREY = std(0x9aa3a8, 0.5, 0.4);
const DARK = std(0x20272d, 0.5, 0.5);
const SOLAR = std(0x1d2b4d, 0.25, 0.6);
const REGO = std(0x8d8a85, 1);
const REGO_DARK = std(0x6d6b68, 1);

/** 月面纹理：灰色底 + 撞击坑 */
function makeMoonTexture(): THREE.CanvasTexture | undefined {
  const c = document.createElement("canvas");
  c.width = 800;
  c.height = 400;
  const g = c.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = "#9b9893";
  g.fillRect(0, 0, 800, 400);
  for (let i = 0; i < 260; i++) {
    const x = (i * 197) % 800;
    const y = (i * 89) % 400;
    const r = 4 + ((i * 53) % 40);
    g.fillStyle = `rgba(${90 + (i % 40)},${88 + (i % 40)},${85 + (i % 40)},0.55)`;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "rgba(220,218,212,0.35)";
    g.lineWidth = 2;
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** 地球纹理：海洋蓝 + 大陆绿 + 云 */
function makeEarthTexture(): THREE.CanvasTexture | undefined {
  const c = document.createElement("canvas");
  c.width = 800;
  c.height = 400;
  const g = c.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = "#2a5f9a";
  g.fillRect(0, 0, 800, 400);
  g.fillStyle = "#4f8f4a";
  for (const [x, y, rx, ry] of [[160, 150, 90, 70], [300, 260, 60, 80], [520, 130, 110, 60], [620, 250, 70, 50], [700, 110, 50, 40]] as const) {
    g.beginPath();
    g.ellipse(x, y, rx, ry, 0.3, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = "rgba(255,255,255,0.7)";
  for (let i = 0; i < 24; i++) {
    g.beginPath();
    g.ellipse((i * 131) % 800, (i * 61) % 400, 50 + (i % 5) * 12, 10 + (i % 3) * 6, 0.2, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** 折线图屏幕纹理（遥测 / 仿真曲线） */
function makePlotTexture(seed: number, accent = "#7ef0d4"): THREE.CanvasTexture | undefined {
  const c = document.createElement("canvas");
  c.width = 640;
  c.height = 420;
  const g = c.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = "#0d1c24";
  g.fillRect(0, 0, 640, 420);
  g.strokeStyle = "rgba(120,200,190,0.2)";
  g.lineWidth = 1;
  for (let i = 0; i < 13; i++) {
    g.beginPath();
    g.moveTo(i * 50, 0);
    g.lineTo(i * 50, 420);
    g.stroke();
  }
  for (let i = 0; i < 9; i++) {
    g.beginPath();
    g.moveTo(0, i * 50);
    g.lineTo(640, i * 50);
    g.stroke();
  }
  for (const [color, off] of [[accent, 0], ["#f0b85a", 1.7]] as const) {
    g.strokeStyle = color;
    g.lineWidth = 4;
    g.beginPath();
    for (let x = 0; x <= 640; x += 6) {
      const y = 210 + Math.sin(x * 0.014 + seed + off) * 90 + Math.sin(x * 0.05 + seed * 2) * 26;
      if (x === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
  }
  g.fillStyle = "#7ef0d4";
  g.font = "bold 28px 'Courier New', monospace";
  g.fillText(`TLM-${(seed * 37) % 90 + 10}`, 18, 38);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** 月面圆盘：起伏的月壤 + 撞击坑环 + 散石（局部 y=0 为舞台面） */
function lunarPatch(s: Stage, cx: number, cz: number, r: number, seed = 1): void {
  const { f, k } = s;
  const c = f.child(cx, 0, cz);
  c.put(new THREE.CylinderGeometry(r, r * 1.04, 0.28, 48), REGO, 0, 0.14, 0);
  for (let i = 0; i < 9; i++) {
    const a = i * 2.4 + seed;
    const d = (0.25 + ((i * 0.37) % 0.6)) * r;
    const cr = 0.25 + ((i * 29 + seed) % 10) * 0.05;
    c.put(new THREE.TorusGeometry(cr, 0.06, 6, 22), REGO_DARK, Math.cos(a) * d, 0.3, Math.sin(a) * d * 0.9, Math.PI / 2);
    c.put(new THREE.CylinderGeometry(cr * 0.92, cr * 0.92, 0.03, 20), REGO_DARK, Math.cos(a) * d, 0.28, Math.sin(a) * d * 0.9);
  }
  for (let i = 0; i < 16; i++) {
    const a = i * 1.9 + seed * 3;
    const d = (0.2 + ((i * 0.53) % 0.75)) * r;
    c.put(new THREE.DodecahedronGeometry(0.06 + (i % 4) * 0.045, 1), k.m.rock, Math.cos(a) * d, 0.3, Math.sin(a) * d * 0.9, i, i * 2, 0, 1.3, 0.7, 1);
  }
}

/** 登月车 / 探测车：车架 + 太阳能翼 + 六轮 + 桅杆相机 + 高增益天线 */
function rover(s: Stage, lx: number, lz: number, yaw: number, scale = 1): void {
  const { f } = s;
  const r = f.child(lx, 0.3, lz, yaw);
  const sc = (v: number) => v * scale;
  r.put(new THREE.BoxGeometry(sc(1.6), sc(0.5), sc(1.0)), WHITE, 0, sc(0.6), 0);
  r.box(GREY, sc(1.5), sc(0.08), sc(0.9), 0, sc(0.88), 0, 0.02);
  for (const sz of [-1, 1]) {
    r.box(SOLAR, sc(1.3), sc(0.05), sc(0.8), 0, sc(0.95), sz * sc(0.95), 0.01, sz * 0.5);
    for (let i = 1; i < 4; i++) r.box(GREY, sc(1.3), sc(0.02), sc(0.015), 0, sc(0.98) + sz * 0.03, sz * sc(0.95) + sz * (i - 2) * sc(0.16), 0.004, sz * 0.5);
  }
  for (const x of [-0.6, 0, 0.6]) for (const z of [-0.62, 0.62]) {
    r.put(new THREE.CylinderGeometry(sc(0.26), sc(0.26), sc(0.2), 20), DARK, sc(x), sc(0.28), sc(z), Math.PI / 2);
    r.put(new THREE.TorusGeometry(sc(0.26), sc(0.03), 6, 20), GREY, sc(x), sc(0.28), sc(z) + (z > 0 ? 0.1 : -0.1) * scale);
    r.strut(GREY, [sc(x), sc(0.28), sc(z)], [sc(x * 0.6), sc(0.5), sc(z * 0.5)], 0.02 * scale, 5);
  }
  r.cyl(GREY, sc(0.03), sc(0.04), sc(1.0), sc(0.5), sc(1.1), 0, 8);
  r.box(WHITE, sc(0.4), sc(0.26), sc(0.3), sc(0.5), sc(2.05), 0, 0.03);
  r.put(new THREE.CylinderGeometry(sc(0.06), sc(0.06), sc(0.08), 12), DARK, sc(0.5), sc(2.18), sc(0.17), Math.PI / 2);
  r.put(new THREE.SphereGeometry(sc(0.28), 20, 8, 0, Math.PI * 2, 0, Math.PI / 3), WHITE, sc(-0.5), sc(1.5), 0, -0.9);
  r.strut(GREY, [sc(-0.5), sc(0.9), 0], [sc(-0.5), sc(1.4), 0], 0.025 * scale, 6);
}

/** 工作台 / 控制台桌：台面 + 抽屉柜（简化） */
function consoleDesk(s: Stage, lx: number, lz: number, w: number, yaw = 0, tilt = -0.25): void {
  const { f, k } = s;
  const c = f.child(lx, 0, lz, yaw);
  c.box(DARK, w, 0.75, 0.9, 0, 0, 0, 0.03);
  c.box(GREY, w, 0.06, 1.0, 0, 0.75, 0, 0.015);
  c.box(DARK, w, 0.5, 0.5, 0, 0.78, -0.2, 0.03, tilt);
  const tones = [0x5af0b8, 0xf0b85a, 0xe0555d, 0x5ab0f0];
  for (let i = 0; i < Math.floor(w / 0.22); i++) {
    c.cyl(std(tones[i % 4], 0.4, 0.2, { emissive: tones[i % 4], emissiveIntensity: i % 3 === 0 ? 0.6 : 0.15 }), 0.035, 0.035, 0.03, -w / 2 + 0.22 + i * 0.22, 0.84, 0.06, 10);
  }
  for (let i = 0; i < 4; i++) c.box(k.p.plasticDark, 0.16, 0.02, 0.1, -w / 2 + 0.4 + i * (w - 0.8) / 3, 0.79, 0.28, 0.005);
}

/** 悬挂的发光屏（画布纹理 + 外框），朝局部 +z */
function screenAt(s: Stage, tex: THREE.Texture | undefined, lx: number, ly: number, lz: number, w: number, h: number, yaw = 0): void {
  const { f, k } = s;
  f.child(lx, ly - h / 2 - 0.08, lz, yaw).box(k.p.plasticDark, w + 0.12, h + 0.12, 0.08, 0, 0, 0, 0.03);
  addCanvasPlane(s.ctx, tex, lx, ly, lz + 0.05, w, h, yaw);
}

// ───────────────────────── Section A ─────────────────────────

/** 月球探测器：月壤上的巡视车（太阳翼、六轮、天线）、插着的旗、脚印与车辙，宇航员在指点 */
export const lunarProbeScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  lunarPatch(s, 0, 0.2, 4.3, 3);
  rover(s, -0.8, -0.3, 0.35, 1.5);
  // 车辙 + 脚印
  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    for (const dz of [-0.5, 0.5]) f.box(REGO_DARK, 0.3, 0.02, 0.18, -3.0 + t * 2.0, 0.3, 1.2 + t * (-1.0) + dz, 0.005, 0, -0.45);
  }
  for (let i = 0; i < 6; i++) f.box(REGO_DARK, 0.16, 0.02, 0.3, 1.0 + i * 0.28, 0.3, 1.9 - i * 0.12 + (i % 2 ? 0.1 : -0.1), 0.01);
  // 旗
  f.cyl(k.m.steel, 0.02, 0.025, 2.4, 2.6, 0.3, -0.8, 8);
  f.box(k.p.fabricRed, 0.9, 0.55, 0.02, 3.05, 2.0, -0.8, 0.004);
  addBeacon(ctx, ctx.glow, -0.8, 4.2, -0.3, 0.24);
  addBeacon(ctx, ctx.edge, 0.2, 2.9, 0.1, 0.1);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0xe9eef0, hair: 0x2b1d16, helmet: true, pose: "point", backpack: 0xd8dde0 }, 1.9, 0.3, 1.3, -0.6);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  finishStage(s, "scene-lunar-probe");
};

/** 中继桥：地球模型与月球模型分立两侧，中间的中继站（双天线 + 太阳翼）与发光链路，操作员在控制台前 */
export const relayBridgeScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const earthTex = makeEarthTexture();
  const moonTex = makeMoonTexture();
  const stand = (lx: number, tone: THREE.Texture | undefined, r: number, base: THREE.Material): void => {
    const c = f.child(lx, 0, -0.6);
    c.cyl(GREY, 0.7, 0.8, 0.3, 0, 0, 0, 24);
    c.cyl(DARK, 0.1, 0.12, 0.9, 0, 0.3, 0, 12);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(r * SCENE_SCALE, 36, 24), tone ? new THREE.MeshStandardMaterial({ map: tone, roughness: 0.7 }) : base);
    const [x, z] = worldXZ(lx, -0.6);
    globe.position.set(x, STAGE_Y + (1.2 + r) * SCENE_SCALE, z);
    globe.castShadow = true;
    globe.userData.isLandscapeStage = true;
    ctx.root.add(globe);
    c.put(new THREE.TorusGeometry(r * 1.2, 0.03, 6, 40, Math.PI * 1.7), k.m.brass, 0, 1.2 + r, 0, 0.6, 0, 0.4);
  };
  stand(-3.4, earthTex, 1.0, WHITE);
  stand(3.4, moonTex, 0.75, GREY);
  // 中继站：立柱 + 双抛物面天线 + 太阳翼
  const rs = f.child(0, 0, -1.2);
  rs.cyl(GREY, 0.5, 0.6, 0.3, 0, 0, 0, 20);
  rs.cyl(WHITE, 0.28, 0.34, 1.5, 0, 0.3, 0, 20);
  rs.box(WHITE, 0.7, 0.5, 0.7, 0, 1.8, 0, 0.06);
  for (const sx of [-1, 1]) {
    rs.box(SOLAR, 1.5, 0.05, 0.9, sx * 1.35, 2.0, 0, 0.01, 0, 0, sx * 0.08);
    for (let i = 1; i < 5; i++) rs.box(GREY, 0.015, 0.06, 0.9, sx * (0.6 + i * 0.3), 2.0, 0, 0.003);
    rs.put(new THREE.SphereGeometry(0.5, 24, 10, 0, Math.PI * 2, 0, Math.PI / 3), WHITE, sx * 0.62, 2.7, 0.15, -1.1, 0, sx * 0.4);
    rs.strut(GREY, [sx * 0.4, 2.0, 0], [sx * 0.62, 2.6, 0.2], 0.02, 5);
  }
  const lnk = [[-3.4, 2.6], [-1.6, 4.0], [0, 4.3], [1.6, 3.8], [3.4, 2.5]].map(([x, y]) => new THREE.Vector3(worldXZ(x, -0.9)[0], STAGE_Y + y * SCENE_SCALE, worldXZ(x, -0.9)[1]));
  const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lnk), 40, 0.04 * SCENE_SCALE, 6, false), ctx.glow);
  tube.userData.isLandscapeRoute = true;
  ctx.root.add(tube);
  addBeacon(ctx, ctx.edge, 0, 4.7, -1.2, 0.18);
  consoleDesk(s, 0, 1.6, 3.2, Math.PI);
  placePerson(ctx, { shirt: 0x496c72, hair: 0x2b1d16, glasses: true, seated: true, pose: "write" }, 0, 0.45, 2.5, 0);
  props.chair(k, f.child(0, 0, 2.5, 0), GREY);
  props.lampPost(k, f.child(-4.8, 0, 2.0));
  props.lampPost(k, f.child(4.8, 0, 2.0));
  finishStage(s, "scene-relay-bridge");
};

/** 样本实验室：三只玻璃展柜里的月岩样本、显微镜、离心机、样品架与白板，研究员记录数据 */
export const sampleLabScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  // 实验台
  f.box(WHITE, 7.0, 0.85, 1.4, 0, 0, -0.8, 0.04);
  f.box(DARK, 7.1, 0.06, 1.5, 0, 0.85, -0.8, 0.015);
  for (let i = 0; i < 6; i++) f.box(GREY, 1.0, 0.7, 0.03, -2.9 + i * 1.16, 0.08, -0.08, 0.008);
  // 展柜：玻璃罩 + 岩石样本 + 标签
  [-2.4, 0, 2.4].forEach((x, i) => {
    const c = f.child(x, 0.91, -0.8);
    c.cyl(DARK, 0.5, 0.55, 0.12, 0, 0, 0, 24);
    c.put(new THREE.DodecahedronGeometry(0.3 + (i % 2) * 0.06, 1), i === 1 ? std(0x7a6f60, 0.9) : m.rock, 0, 0.42, 0, i, i * 2, 0, 1.1, 0.75, 0.9);
    c.put(new THREE.CylinderGeometry(0.62, 0.62, 1.0, 28, 1, true), m.glass, 0, 0.62, 0);
    c.cyl(GREY, 0.64, 0.64, 0.04, 0, 1.12, 0, 28);
    c.box(m.brass, 0.3, 0.1, 0.02, 0, 0.12, 0.54, 0.004);
  });
  // 显微镜：底座 + 立臂 + 镜筒 + 目镜 + 物镜转盘
  const mic = f.child(3.2, 0.91, -0.3, -0.3);
  mic.box(DARK, 0.5, 0.06, 0.4, 0, 0, 0, 0.02);
  mic.strut(GREY, [0, 0.06, -0.12], [0, 0.7, -0.12], 0.045, 8);
  mic.put(new THREE.CylinderGeometry(0.06, 0.06, 0.6, 14), GREY, 0, 0.56, 0.0, 0.5);
  mic.put(new THREE.CylinderGeometry(0.04, 0.05, 0.14, 12), DARK, 0, 0.88, -0.14, 0.5);
  mic.cyl(DARK, 0.1, 0.1, 0.04, 0, 0.22, 0.08, 16);
  // 离心机 + 样品管架
  const cf = f.child(-3.3, 0.91, -0.4);
  cf.cyl(WHITE, 0.3, 0.34, 0.3, 0, 0, 0, 20);
  cf.cyl(DARK, 0.28, 0.28, 0.04, 0, 0.3, 0, 20);
  for (let i = 0; i < 8; i++) cf.cyl(std(0x9bb8cc, 0.3, 0.1, { transparent: true, opacity: 0.8 }), 0.02, 0.02, 0.1, -0.6 + i * 0.09, 0.0, 0.35, 8);
  // 墙面：白板 + 样品架
  const bd = f.child(0, 0, -2.5);
  props.board(k, bd.child(0, 1.2, 0), 3.4, 1.4, p.boardWhite);
  for (let i = 0; i < 3; i++) bd.box(m.slate, 2.2 - i * 0.4, 0.05, 0.02, -0.4, 2.2 - i * 0.35, 0.07, 0.004);
  bd.box(DARK, 0.1, 2.6, 0.1, -1.9, 0, 0, 0.01);
  bd.box(DARK, 0.1, 2.6, 0.1, 1.9, 0, 0, 0.01);
  placePerson(ctx, { shirt: 0xf1f4f5, trousers: 0x59606a, hair: 0x2b1d16, glasses: true, pose: "write" }, -0.8, 0, 0.9, 0.2);
  addBeacon(ctx, ctx.glow, 0, 3.2, -0.8, 0.16);
  props.lampPost(k, f.child(-4.8, 0, 1.6));
  props.lampPost(k, f.child(4.8, 0, 1.6));
  finishStage(s, "scene-sample-lab");
};

/** 月平线：月壤弧形地平、前方的观景甲板与望远镜、天边升起的地球与日出光带，两位观测者 */
export const moonHorizonScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m } = k;
  lunarPatch(s, 0, -2.2, 3.8, 5);
  f.put(new THREE.SphereGeometry(7.0, 40, 16, 0, Math.PI * 2, 0, Math.PI / 6), REGO, 0, -6.6, -4.2);
  // 地球（远处）+ 日出光带
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1.1 * SCENE_SCALE, 28, 20), new THREE.MeshStandardMaterial({ map: makeEarthTexture(), roughness: 0.8 }));
  const [ex, ez] = worldXZ(-1.0, -4.2);
  earth.position.set(ex, STAGE_Y + 3.8 * SCENE_SCALE, ez);
  earth.userData.isLandscapeBeacon = true;
  ctx.root.add(earth);
  const glowBand = new THREE.Mesh(new THREE.BoxGeometry(11 * SCENE_SCALE, 0.12 * SCENE_SCALE, 0.1), emissive(0xffd890, 1.0));
  const [gx, gz] = worldXZ(0, -4.0);
  glowBand.position.set(gx, STAGE_Y + 0.9 * SCENE_SCALE, gz);
  glowBand.userData.noLandscapeShadow = true;
  ctx.root.add(glowBand);
  // 观景甲板 + 栏杆 + 望远镜
  f.box(DARK, 6.4, 0.3, 2.2, 0, 0, 1.2, 0.05);
  f.box(GREY, 6.2, 0.04, 2.0, 0, 0.3, 1.2, 0.02);
  props.railing(k, f.child(-3.1, 0.34, 0.3, 0), 6.2, 0.95, m.steel);
  const sc = f.child(1.6, 0.34, 1.0, -0.3);
  sc.cyl(DARK, 0.06, 0.1, 1.0, 0, 0, 0, 10);
  sc.put(new THREE.CylinderGeometry(0.12, 0.15, 0.9, 18), WHITE, 0.1, 1.15, -0.2, 1.2);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0xe9eef0, hair: 0x2b1d16, helmet: true, pose: "point" }, -0.9, 0.34, 1.2, 0.1);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0xe9eef0, hair: 0x555555, helmet: true, pose: "listen" }, 0.5, 0.34, 1.5, -0.3);
  addBeacon(ctx, ctx.edge, 0, 4.9, 0.4, 0.2);
  props.lampPost(k, f.child(-4.7, 0, 2.2));
  props.lampPost(k, f.child(4.7, 0, 2.2));
  finishStage(s, "scene-moon-horizon");
};

// ───────────────────────── Section B ─────────────────────────

/** 测试控制台：弧形控制台（按钮 / 旋钮 / 指示灯）、上方三块监控屏、后方试车台上的发动机喷管，工程师在调试 */
export const testConsoleScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  consoleDesk(s, 0, 0.4, 5.8, Math.PI);
  [-1.9, 0, 1.9].forEach((x, i) => screenAt(s, makePlotTexture(i * 2.1 + 1), x, 2.7, -0.4, 1.7, 1.1));
  for (const x of [-1.9, 0, 1.9]) f.box(DARK, 0.1, 1.5, 0.1, x, 0.8, -0.5, 0.01);
  // 试车台：发动机喷管 + 支架 + 管线
  const eng = f.child(0, 0, -2.4);
  eng.box(DARK, 2.6, 0.2, 1.6, 0, 0, 0, 0.04);
  for (const sx of [-1, 1]) eng.box(GREY, 0.2, 2.2, 0.2, sx * 1.0, 0.2, 0, 0.03);
  eng.put(new THREE.CylinderGeometry(0.35, 0.8, 1.3, 28, 1, true), std(0xb8873c, 0.35, 0.8), 0, 1.4, 0, 0, 0, 0, 1, -1, 1);
  eng.cyl(GREY, 0.4, 0.4, 0.7, 0, 1.9, 0, 24);
  eng.put(new THREE.TorusGeometry(0.62, 0.03, 6, 28), m.copper, 0, 1.2, 0, Math.PI / 2);
  eng.strut(m.copper, [0.5, 2.0, 0], [1.0, 0.6, 0.4], 0.04, 6);
  eng.strut(m.steel, [-0.5, 2.0, 0], [-1.0, 0.6, 0.4], 0.04, 6);
  // 指示灯条
  for (let i = 0; i < 7; i++) addBeacon(ctx, i % 3 === 0 ? ctx.edge : ctx.glow, -2.6 + i * 0.87, 1.25, 0.1, 0.08);
  props.chair(k, f.child(0, 0, 1.7, 0), GREY);
  placePerson(ctx, { shirt: 0x496c72, hair: 0x2b1d16, glasses: true, seated: true, pose: "write", lean: 0.1 }, 0, 0.45, 1.7, Math.PI);
  props.lampPost(k, f.child(-4.8, 0, 1.6));
  props.lampPost(k, f.child(4.8, 0, 1.6));
  finishStage(s, "scene-test-console");
};

/** 轨道调整：中央的月球模型（带撞击坑贴图）与三条倾斜轨道环，环上的小卫星模型，指令平板立柱与工程师 */
export const orbitAdjustmentScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  f.cyl(DARK, 3.0, 3.2, 0.3, 0, 0, -0.2, 40);
  f.cyl(GREY, 0.5, 0.7, 0.8, 0, 0.3, -0.2, 20);
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1.2 * SCENE_SCALE, 40, 28), new THREE.MeshStandardMaterial({ map: makeMoonTexture(), roughness: 0.95 }));
  const [mx, mz] = worldXZ(0, -0.2);
  moon.position.set(mx, STAGE_Y + 2.6 * SCENE_SCALE, mz);
  moon.castShadow = true;
  moon.userData.isLandscapeStage = true;
  ctx.root.add(moon);
  // 三条轨道环（保持 isLandscapeRing 动画）
  for (const [rx, ry, r] of [[0.2, 0, 2.4], [0.78, 0.55, 2.9], [-0.55, -0.72, 3.3]] as const) {
    const ring = ctx.ring(r * SCENE_SCALE, STAGE_Y + 2.6 * SCENE_SCALE, rx);
    ring.rotation.y = ry;
    ring.position.set(mx, STAGE_Y + 2.6 * SCENE_SCALE, mz);
    ring.scale.setScalar(0.5);
  }
  // 卫星：车体 + 太阳翼 + 天线
  const sat = (lx: number, ly: number, lz: number, yaw: number): void => {
    const c = f.child(lx, ly, lz, yaw);
    c.box(GREY, 0.4, 0.3, 0.3, 0, 0, 0, 0.03);
    for (const sx of [-1, 1]) c.box(SOLAR, 0.7, 0.03, 0.34, sx * 0.62, 0.15, 0, 0.008);
    c.put(new THREE.SphereGeometry(0.14, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2.4), WHITE, 0, 0.3, 0.0, -0.4);
    addBeacon(ctx, ctx.edge, lx, ly + 0.35, lz, 0.06);
  };
  sat(2.4, 4.2, 0.2, 0.3);
  sat(-1.8, 5.0, 0.1, -0.5);
  sat(-2.2, 1.8, -0.5, 0.8);
  // 指令平板立柱 + 工程师
  const t = f.child(-3.8, 0, 1.6, 0.4);
  t.cyl(DARK, 0.06, 0.08, 1.1, 0, 0, 0, 10);
  t.box(k.p.plasticDark, 0.8, 0.5, 0.05, 0, 1.1, 0, 0.03, -0.35);
  t.put(new THREE.PlaneGeometry(0.7, 0.4), k.p.screenOn, 0, 1.3, 0.03, -0.35);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0x59606a, hair: 0x2b1d16, glasses: true, pose: "point" }, -2.6, 0, 1.8, 0.3);
  props.lampPost(k, f.child(-4.9, 0, 0.0));
  props.lampPost(k, f.child(4.9, 0, 0.0));
  finishStage(s, "scene-orbit-adjustment");
};

/** 系统仿真：三块大屏各画一条仿真曲线，屏前桌上键盘与鼠标，中央一枚旋转的数据核心，分析员在调参 */
export const systemsSimulationScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  f.cyl(k.p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  [-3.0, 0, 3.0].forEach((x, i) => {
    f.box(DARK, 0.12, 1.7, 0.12, x, 0, -1.6, 0.01);
    f.box(GREY, 1.4, 0.1, 0.6, x, 0, -1.6, 0.02);
    screenAt(s, makePlotTexture(i * 1.7 + 3, i === 1 ? "#f0b85a" : "#7ef0d4"), x, 3.0, -1.6, 2.3, 1.5, (1 - i) * 0.12);
  });
  // 工作桌 + 键盘鼠标
  props.table(k, f.child(0, 0, 0.8), 4.2, 0.9, 0.75, std(0x2a3036, 0.5, 0.3));
  for (const x of [-1.2, 0, 1.2]) {
    f.box(k.p.plasticDark, 0.5, 0.02, 0.18, x, 0.75, 0.9, 0.006);
    f.box(k.p.plasticDark, 0.07, 0.03, 0.11, x + 0.38, 0.75, 0.9, 0.012);
  }
  // 数据核心：旋转环 + 核心球
  const [cx, cz] = worldXZ(0, -0.2);
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 * SCENE_SCALE, 2), ctx.glow);
  core.position.set(cx, STAGE_Y + 2.1 * SCENE_SCALE, cz);
  core.userData.isLandscapeBeacon = true;
  ctx.root.add(core);
  for (const r of [0.8, 1.1]) {
    const ring = ctx.ring(r * SCENE_SCALE, STAGE_Y + 2.1 * SCENE_SCALE, Math.PI / 2 + r * 0.4);
    ring.position.set(cx, STAGE_Y + 2.1 * SCENE_SCALE, cz);
    ring.scale.setScalar(0.3);
  }
  f.cyl(DARK, 0.5, 0.6, 0.8, 0, 0.0, -0.2, 20);
  props.chair(k, f.child(0, 0, 1.9, 0), GREY);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, glasses: true, seated: true, pose: "write", lean: 0.12 }, 0, 0.45, 1.9, Math.PI);
  props.lampPost(k, f.child(-4.8, 0, 1.6));
  props.lampPost(k, f.child(4.8, 0, 1.6));
  finishStage(s, "scene-systems-simulation");
};

/** 任务控制：三排阶梯式控制台、后墙的大型遥测屏墙、倒计时钟，三位操作员与一位飞行主任 */
export const missionControlScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m } = k;
  f.cyl(k.p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  // 屏墙：五块屏
  f.box(DARK, 6.8, 0.2, 0.7, 0, 0, -2.6, 0.03);
  f.box(DARK, 6.6, 3.2, 0.15, 0, 0.2, -2.6, 0.04);
  [-2.6, -1.3, 0, 1.3, 2.6].forEach((x, i) => addCanvasPlane(ctx, makePlotTexture(i * 1.3 + 2, i % 2 ? "#f0b85a" : "#7ef0d4"), x, 2.35, -2.5, 1.18, 0.9));
  const clk = makeSignTexture([{ text: "T-00:42:17", y: 160, font: "bold 110px 'Courier New', monospace", color: "#ff9a6a" }], { width: 720, height: 320, background: "#140d0a", border: "#7a3a28" });
  addCanvasPlane(ctx, clk, 0, 1.15, -2.5, 3.3, 0.95);
  // 三排控制台（逐排抬高）
  [[0.9, 0.0], [-0.1, 0.25], [-1.1, 0.5]].forEach(([z, h], row) => {
    for (const x of [-2.2, 0, 2.2]) {
      const c = f.child(x, h, z, 0);
      c.box(DARK, 1.9, 0.7, 0.8, 0, 0, 0, 0.03);
      c.box(GREY, 1.9, 0.05, 0.85, 0, 0.7, 0, 0.012);
      c.box(DARK, 1.2, 0.5, 0.06, 0, 0.74, -0.25, 0.02, -0.12);
      c.put(new THREE.PlaneGeometry(1.1, 0.42), row === 1 && x === 0 ? emissive(0x2a6f8a, 0.6) : emissive(0x1f4f5f, 0.5), 0, 0.99, -0.215, -0.12);
    }
    if (row < 2) f.box(m.stoneDark, 7.2, 0.25, 0.7, 0, 0, z - 0.5, 0.02);
  });
  // 操作员（背对观众看屏墙）+ 飞行主任
  for (const [x, row] of [[-2.2, 0], [0, 1], [2.2, 2]] as const) {
    const z = [0.9, -0.1, -1.1][row] + 0.8;
    const h = [0, 0.25, 0.5][row];
    props.chair(k, f.child(x, h, z, Math.PI), GREY);
    placePerson(ctx, { shirt: [0x496c72, 0x6a8aa8, 0x7d573d][row], hair: 0x2b1d16, seated: true, pose: "write" }, x, h + 0.45, z, Math.PI);
  }
  placePerson(ctx, { shirt: 0xf1f4f5, trousers: 0x59606a, hair: 0x555555, glasses: true, pose: "point" }, 3.6, 0, 1.8, -0.5);
  addBeacon(ctx, ctx.glow, 0, 4.3, -2.2, 0.24);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  finishStage(s, "scene-mission-control");
};

// ───────────────────────── Section C ─────────────────────────

/** 训练：跑台（带安全吊带）上的宇航员、圆形舱门模拟框、流程板和固定环，教练在旁记录 */
export const trainingScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  // 圆形舱门模拟
  const hatch = f.child(0, 0, -2.4);
  hatch.box(DARK, 4.2, 0.2, 0.7, 0, 0, 0, 0.03);
  hatch.put(new THREE.TorusGeometry(1.6, 0.18, 12, 40), GREY, 0, 2.3, 0.0);
  hatch.put(new THREE.CylinderGeometry(1.4, 1.4, 0.12, 40), std(0x2c363d, 0.5, 0.5), 0, 2.3, -0.02, Math.PI / 2);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    hatch.cyl(m.brass, 0.06, 0.06, 0.08, Math.cos(a) * 1.28, 2.3 + Math.sin(a) * 1.28 - 0.04, 0.07, 10);
  }
  hatch.put(new THREE.TorusGeometry(0.4, 0.06, 8, 24), m.brass, 0, 2.3, 0.08);
  // 流程板
  const bd = f.child(-3.6, 0, -1.2, 0.3);
  props.board(k, bd.child(0, 0.5, 0), 1.8, 1.8, p.boardWhite);
  for (let i = 0; i < 5; i++) {
    bd.box(m.slate, 1.2, 0.05, 0.02, 0, 2.0 - i * 0.28, 0.07, 0.004);
    bd.cyl(i < 3 ? m.leaf : m.stoneDark, 0.06, 0.06, 0.012, -0.8, 2.0 - i * 0.28, 0.07, 10);
  }
  // 跑台 + 吊带支架
  const tm = f.child(0.6, 0, 0.6, 0);
  tm.box(DARK, 1.0, 0.25, 2.4, 0, 0, 0, 0.05);
  tm.box(std(0x30363b, 0.8), 0.8, 0.03, 2.2, 0, 0.25, 0, 0.01);
  tm.box(DARK, 0.08, 1.5, 0.08, -0.5, 0.25, -1.1, 0.01);
  tm.box(DARK, 0.08, 1.5, 0.08, 0.5, 0.25, -1.1, 0.01);
  tm.box(DARK, 1.2, 0.08, 0.08, 0, 1.75, -1.1, 0.01);
  tm.box(p.fabricRed, 0.6, 0.08, 0.04, 0, 1.2, -1.1, 0.01);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0xe9eef0, hair: 0x2b1d16, helmet: true, pose: "walk", backpack: 0xd8dde0 }, 0.6, 0.26, 0.6, Math.PI / 2 + Math.PI / 2 * 0);
  // 教练
  placePerson(ctx, { shirt: 0x3b5f8f, hair: 0x555555, glasses: true, pose: "read" }, 2.6, 0, 1.2, -0.5);
  addBeacon(ctx, ctx.edge, 0, 4.8, -2.3, 0.22);
  ctx.ring(3.0 * SCENE_SCALE, STAGE_Y + 0.12, Math.PI / 2);
  props.lampPost(k, f.child(-4.8, 0, 1.8));
  props.lampPost(k, f.child(4.8, 0, 1.8));
  finishStage(s, "scene-training");
};

/** 乘组模拟：两只乘员舱（带舷窗与舱门）与两位着航天服的乘员面对面核对清单 */
export const crewSimulationScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  const pod = (lx: number, yaw: number): void => {
    const c = f.child(lx, 0, -1.4, yaw);
    c.box(DARK, 2.4, 0.3, 2.0, 0, 0, 0, 0.05);
    c.put(new THREE.CapsuleGeometry(0.95, 1.5, 12, 28), WHITE, 0, 1.6, 0, 0, 0, Math.PI / 2 * 0, 1, 1.3, 1);
    c.put(new THREE.CylinderGeometry(0.34, 0.34, 0.12, 28), m.glass, 0, 1.75, 0.92, Math.PI / 2);
    c.put(new THREE.TorusGeometry(0.34, 0.06, 8, 28), GREY, 0, 1.75, 0.95);
    c.put(new THREE.TorusGeometry(0.62, 0.05, 8, 32), m.brass, 0, 1.0, 0.9);
    c.box(DARK, 0.8, 0.08, 0.5, 0, 0.3, 1.0, 0.02);
    for (let i = 0; i < 6; i++) c.cyl(i % 2 ? m.brass : GREY, 0.04, 0.04, 0.04, -0.4 + i * 0.16, 0.9, 0.96, 8);
  };
  pod(-2.6, 0.2);
  pod(2.6, -0.2);
  // 清单板立架
  const bd = f.child(0, 0, 0.5);
  bd.cyl(DARK, 0.04, 0.05, 1.2, 0, 0, 0, 8);
  bd.box(k.p.plasticDark, 0.7, 0.9, 0.05, 0, 1.15, 0, 0.03);
  bd.put(new THREE.PlaneGeometry(0.6, 0.8), makePlotTexture(8) ? new THREE.MeshBasicMaterial({ map: makePlotTexture(8), toneMapped: false }) : k.p.screenOn, 0, 1.6, 0.03);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0xe9eef0, hair: 0x2b1d16, helmet: true, pose: "talk", backpack: 0xd8dde0 }, -1.0, 0, 1.5, 0.5);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0xe9eef0, hair: 0x555555, helmet: true, pose: "listen", backpack: 0xd8dde0 }, 1.0, 0, 1.5, -0.5);
  addBeacon(ctx, ctx.glow, 0, 4.4, -0.2, 0.26);
  props.lampPost(k, f.child(-4.8, 0, 1.8));
  props.lampPost(k, f.child(4.8, 0, 1.8));
  finishStage(s, "scene-crew-simulation");
};

/** 科学展：太阳系仪（轨道环 + 三颗行星小球 + 太阳）、说明牌与两位参观者 */
export const scienceExhibitScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  f.cyl(DARK, 2.0, 2.2, 0.35, 0, 0, -0.4, 36);
  f.cyl(GREY, 0.3, 0.4, 0.5, 0, 0.35, -0.4, 16);
  const [cx, cz] = worldXZ(0, -0.4);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.42 * SCENE_SCALE, 28, 20), emissive(0xffc15a, 1.0));
  sun.position.set(cx, STAGE_Y + 1.7 * SCENE_SCALE, cz);
  sun.userData.isLandscapeBeacon = true;
  ctx.root.add(sun);
  const planets: Array<[number, number, number, number]> = [[1.0, 0.12, 0xb0a590, 0.4], [1.6, 0.18, 0x3b7fc4, 1.9], [2.3, 0.3, 0xd0a060, 3.4], [3.0, 0.22, 0xc96a4a, 5.0]];
  for (const [r, pr, col, ang] of planets) {
    f.put(new THREE.TorusGeometry(r, 0.012, 6, 56), m.brass, 0, 1.7, -0.4, Math.PI / 2);
    const x = Math.cos(ang) * r;
    const z = -0.4 + Math.sin(ang) * r * 0.9;
    f.strut(GREY, [x, 1.7, z], [x * 0.6, 0.4, -0.4 + (z + 0.4) * 0.6], 0.012, 4);
    f.put(new THREE.SphereGeometry(pr, 18, 12), std(col, 0.6), x, 1.7, z);
  }
  f.put(new THREE.TorusGeometry(0.45, 0.025, 6, 30), std(0xd8c9a0, 0.5), Math.cos(3.4) * 2.3, 1.7, -0.4 + Math.sin(3.4) * 2.3 * 0.9, Math.PI / 2 - 0.4);
  // 说明牌
  for (const sx of [-1, 1]) {
    const pl = f.child(sx * 3.6, 0, 0.8, -sx * 0.5);
    pl.box(m.stoneDark, 0.8, 0.14, 0.5, 0, 0, 0, 0.03);
    pl.cyl(DARK, 0.04, 0.05, 0.9, 0, 0.14, 0, 8);
    pl.box(DARK, 1.0, 0.7, 0.05, 0, 0.95, 0, 0.03, -0.3);
    pl.box(p.boardWhite, 0.9, 0.6, 0.012, 0, 0.99, 0.03, 0.004, -0.3);
  }
  placePerson(ctx, { shirt: 0x7d573d, hair: 0x2b1d16, hairStyle: "bun", pose: "point" }, -1.2, 0, 2.0, 0.3);
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x555555, backpack: 0xc79a3a, pose: "read", scale: 1.0 }, 1.4, 0, 2.2, -0.3);
  props.bench(k, f.child(0, 0, 3.4, Math.PI), 1.8);
  props.lampPost(k, f.child(-4.8, 0, 1.2));
  props.lampPost(k, f.child(4.8, 0, 1.2));
  finishStage(s, "scene-science-exhibit");
};

/** 未来前沿：玻璃穹顶栖息舱（肋条 + 发光玻璃）、两侧大型太阳能阵列、登陆灯环与连接廊道，宇航员眺望 */
export const futureFrontierScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { f, k } = s;
  const { m } = k;
  lunarPatch(s, 0, 0.0, 4.4, 9);
  // 穹顶：半透明玻璃 + 肋条 + 基座环
  const dome = f.child(0, 0.3, -0.6);
  dome.cyl(WHITE, 2.7, 2.8, 0.4, 0, 0, 0, 40);
  dome.put(new THREE.SphereGeometry(2.5, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), std(0x9fd8e8, 0.12, 0.2, { transparent: true, opacity: 0.38, emissive: 0x2a6f8a, emissiveIntensity: 0.25 }), 0, 0.4, 0);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI;
    const pts: Array<[number, number, number]> = [];
    for (let t = 0; t <= 12; t++) {
      const th = (t / 12) * (Math.PI / 2);
      pts.push([Math.cos(a) * Math.cos(th) * 2.52, 0.4 + Math.sin(th) * 2.52, Math.sin(a) * Math.cos(th) * 2.52]);
    }
    for (let t = 0; t < 12; t++) dome.strut(WHITE, pts[t], pts[t + 1], 0.03, 5);
    const b = (i / 10) * Math.PI + Math.PI;
    const pts2: Array<[number, number, number]> = [];
    for (let t = 0; t <= 12; t++) {
      const th = (t / 12) * (Math.PI / 2);
      pts2.push([Math.cos(b) * Math.cos(th) * 2.52, 0.4 + Math.sin(th) * 2.52, Math.sin(b) * Math.cos(th) * 2.52]);
    }
    for (let t = 0; t < 12; t++) dome.strut(WHITE, pts2[t], pts2[t + 1], 0.03, 5);
  }
  dome.put(new THREE.TorusGeometry(2.5, 0.06, 8, 40), WHITE, 0, 0.42, 0, Math.PI / 2);
  dome.box(DARK, 0.9, 1.3, 0.1, 0, 0.4, 2.45, 0.03);
  // 太阳能阵列
  for (const sx of [-1, 1]) {
    const a = f.child(sx * 3.9, 0.3, 0.2, -sx * 0.2);
    for (let i = 0; i < 2; i++) {
      a.box(SOLAR, 1.6, 0.06, 1.1, 0, 0.95 + i * 0.08, -0.6 + i * 1.2, 0.01, -0.45);
      for (let j = 1; j < 4; j++) a.box(GREY, 1.6, 0.012, 0.016, 0, 0.99 + i * 0.08, -0.6 + i * 1.2, 0.002, -0.45);
    }
    a.box(GREY, 0.1, 1.0, 0.1, -0.6, 0, 0, 0.01);
    a.box(GREY, 0.1, 1.0, 0.1, 0.6, 0, 0, 0.01);
  }
  // 着陆灯环
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    addBeacon(ctx, i % 2 ? ctx.edge : ctx.glow, Math.cos(a) * 3.6, 0.5, 1.0 + Math.sin(a) * 3.0, 0.07);
  }
  addBeacon(ctx, ctx.glow, 0, 4.6, -0.6, 0.3);
  placePerson(ctx, { shirt: 0xe9eef0, trousers: 0xe9eef0, hair: 0x2b1d16, helmet: true, pose: "point", backpack: 0xd8dde0 }, -0.8, 0.3, 2.2, 0.2);
  props.lampPost(k, f.child(-4.8, 0, 2.4));
  props.lampPost(k, f.child(4.8, 0, 2.4));
  void m;
  finishStage(s, "scene-future-frontier");
};

export const UNIT05_SCENES: Record<string, SceneModule> = {
  "lunar-probe": lunarProbeScene,
  "relay-bridge": relayBridgeScene,
  "sample-lab": sampleLabScene,
  "moon-horizon": moonHorizonScene,
  "test-console": testConsoleScene,
  "orbit-adjustment": orbitAdjustmentScene,
  "systems-simulation": systemsSimulationScene,
  "mission-control": missionControlScene,
  training: trainingScene,
  "crew-simulation": crewSimulationScene,
  "science-exhibit": scienceExhibitScene,
  "future-frontier": futureFrontierScene,
};
