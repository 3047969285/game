import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { applyKitPattern } from "../../world/kitShader";
import { createBush } from "../../world/props";
import { Frame, chair, table, type SceneKit } from "../../world/sceneProps";
import { addDisposer, pieceGroup, type StageDef } from "./types";

/**
 * 2090 年的公寓：雨夜。
 * 一面落地窗（窗外是安静的未来城市：发光的楼体轮廓、缓缓滑过的悬浮交通的光迹，玻璃上有滚动的雨痕），
 * 极简的房间——一把椅子、一张小桌、桌上 2026 年的纸质旧笔记本、桌边悬浮着柔光的 “MEMORY RECALL” 界面面板。
 * 老年的他（灰发、开衫）坐在椅子上，面朝桌子（+x）。单位：米。窗墙在 z = -3，房间 x ∈ [-4.2, 4.2]，z ∈ [-3, 3.2]，高 2.9。
 * 雨痕仅为视觉效果，声音统一由配乐与旁白控制。
 */

const W = 8.4;
const D = 6.2;
const H = 2.9;
const T = 0.2;
const HX = W / 2;
const Z0 = -3; // 窗墙内侧
const Z1 = Z0 + D;

/** 供脚本使用的关键位置 */
export const APARTMENT = {
  /** 老年的他坐的位置（座面中心）与朝向（面向 +x 的桌子） */
  oldMan: { x: 0.45, y: 0, z: -0.45, yaw: Math.PI / 2 },
  /** 悬浮界面面板中心 */
  panel: { x: 1.98, y: 1.3, z: -0.2 },
  /** 旧笔记本在桌上的位置 */
  notebook: { x: 1.55, y: 0.75, z: -0.62 },
} as const;

const TARGETS = {
  floor: "rise",
  wall_left: "rise",
  wall_right: "rise",
  wall_front: "rise",
  ceiling: "fade",
  window: "fade",
  city: "fade",
  rain: "fade",
  chair: "rise",
  desk: "rise",
  notebook: "condense",
  panel: "fade",
  lamp: "fade",
  plant: "grow",
} as const;

export const APARTMENT_TARGETS = Object.keys(TARGETS);

const hasDom = typeof document !== "undefined";

function makeCanvas(w: number, h: number): { canvas: HTMLCanvasElement; g: CanvasRenderingContext2D } | null {
  if (!hasDom) return null;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d");
  return g ? { canvas, g } : null;
}

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ───────────────────────── 房间 ─────────────────────────

function buildFloor(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "floor", (k) => {
    const f = new Frame(k.kit);
    const floor = new THREE.MeshStandardMaterial({ color: 0x2c2b30, roughness: 0.34, metalness: 0.18 });
    const rug = new THREE.MeshStandardMaterial({ color: 0x4a4a52, roughness: 1, metalness: 0 });
    f.box(floor, W + 0.4, 0.12, D + 0.4, 0, -0.12, (Z0 + Z1) / 2, 0.01);
    f.box(rug, 3.2, 0.015, 2.4, 0.9, 0, -0.35, 0.004);
  });
}

function buildWalls(kit: SceneKit): THREE.Group[] {
  const wall = new THREE.MeshStandardMaterial({ color: 0x8d8b88, roughness: 0.92, metalness: 0 });
  applyKitPattern(wall, "plaster", { grime: 0.15, wear: 0.1 });
  const frontWall = new THREE.MeshStandardMaterial({ color: 0x8d8b88, roughness: 0.92, metalness: 0 });
  const left = pieceGroup(kit, "wall_left", (k) => new Frame(k.kit).box(wall, T, H, D + 2 * T, -HX - T / 2, 0, (Z0 + Z1) / 2, 0.006));
  const right = pieceGroup(kit, "wall_right", (k) => new Frame(k.kit).box(wall, T, H, D + 2 * T, HX + T / 2, 0, (Z0 + Z1) / 2, 0.006));
  const front = pieceGroup(kit, "wall_front", (k) => new Frame(k.kit).put(new THREE.PlaneGeometry(W, H), frontWall, 0, H / 2, Z1, 0, Math.PI, 0));
  // 公寓的 “太阳” 是一盏从屋里斜上方打来的暖色主光：墙与顶不投影，光不会被墙挡在门外
  for (const g of [left, right, front]) {
    g.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = false;
    });
  }
  return [left, right, front];
}

function buildCeiling(kit: SceneKit): THREE.Group {
  const g = pieceGroup(kit, "ceiling", (k) => {
    const f = new Frame(k.kit);
    const plaster = new THREE.MeshStandardMaterial({ color: 0x7c7a78, roughness: 0.95, metalness: 0, side: THREE.DoubleSide });
    const strip = new THREE.MeshStandardMaterial({ color: 0x111418, roughness: 0.5, emissive: 0xcfe4ff, emissiveIntensity: 1.1 });
    f.box(plaster, W + 2 * T, 0.2, D + 2 * T, 0, H, (Z0 + Z1) / 2, 0.006);
    // 一条柔和的顶灯带，沿窗墙方向
    f.box(strip, W - 1.2, 0.02, 0.1, 0, H - 0.02, Z0 + 1.1, 0.004);
    f.box(strip, 0.1, 0.02, D - 1.4, -HX + 1.1, H - 0.02, (Z0 + Z1) / 2, 0.004);
  });
  g.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = false;
  });
  return g;
}

/** 落地窗：只有细钢框（落地、通顶），没有玻璃面——玻璃感由雨层承担 */
function buildWindow(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "window", (k) => {
    const f = new Frame(k.kit);
    const steel = new THREE.MeshStandardMaterial({ color: 0x1b1d22, roughness: 0.4, metalness: 0.7 });
    const z = Z0 + 0.03;
    for (const x of [-HX, -HX / 2, 0, HX / 2, HX]) f.box(steel, 0.07, H, 0.1, x, 0, z, 0.004);
    f.box(steel, W, 0.07, 0.1, 0, 0, z, 0.004);
    f.box(steel, W, 0.07, 0.1, 0, H - 0.07, z, 0.004);
    f.box(steel, W, 0.04, 0.08, 0, 1.1, z, 0.003);
  });
}

// ───────────────────────── 窗外的城市 ─────────────────────────

/** 一张窗户贴图：深蓝底、随机点亮的暖黄 / 冷白小窗。重复铺在楼体上（UV 按真实尺寸缩放） */
function windowTexture(): THREE.CanvasTexture | null {
  const c = makeCanvas(128, 256);
  if (!c) return null;
  const { canvas, g } = c;
  const r = rng(2090);
  g.fillStyle = "#0b1020";
  g.fillRect(0, 0, 128, 256);
  for (let row = 0; row < 32; row++) {
    for (let col = 0; col < 12; col++) {
      const v = r();
      if (v < 0.5) continue;
      const warm = r() < 0.55;
      const a = 0.35 + r() * 0.65;
      g.fillStyle = warm ? `rgba(255,${196 + Math.floor(r() * 40)},${120 + Math.floor(r() * 50)},${a})` : `rgba(${170 + Math.floor(r() * 50)},225,255,${a})`;
      g.fillRect(col * 10.6 + 2, row * 8 + 1.5, 6.4, 4.4);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** 楼体盒子，UV 按米缩放（贴图一格 = 40 m × 96 m，约 3 m 一层、3.3 m 一间） */
function towerBox(w: number, h: number, d: number, x: number, y: number, z: number): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.getAttribute("uv");
  const normal = geo.getAttribute("normal");
  for (let i = 0; i < uv.count; i++) {
    const horizontal = Math.abs(normal.getY(i)) < 0.5;
    const across = Math.abs(normal.getX(i)) > 0.5 ? d : w;
    uv.setXY(i, uv.getX(i) * (horizontal ? across / 40 : w / 40), uv.getY(i) * (horizontal ? h / 96 : d / 96));
  }
  geo.translate(x, y + h / 2, z);
  return geo;
}

function buildCity(root: THREE.Group): THREE.Group {
  const g = new THREE.Group();
  g.name = "city";
  const r = rng(77);
  const towers: THREE.BufferGeometry[] = [];
  const lights: THREE.BufferGeometry[] = [];
  const beaconRed: THREE.BufferGeometry[] = [];
  // 三层纵深：近处矮而宽，远处高而密
  const layers: Array<{ z0: number; z1: number; n: number; hMin: number; hMax: number; wMin: number; wMax: number }> = [
    { z0: -16, z1: -26, n: 9, hMin: 14, hMax: 34, wMin: 4, wMax: 8 },
    { z0: -30, z1: -52, n: 14, hMin: 24, hMax: 62, wMin: 5, wMax: 11 },
    { z0: -58, z1: -96, n: 16, hMin: 36, hMax: 96, wMin: 7, wMax: 16 },
  ];
  for (const layer of layers) {
    for (let i = 0; i < layer.n; i++) {
      const span = 150;
      const x = -span / 2 + ((i + r() * 0.8) / layer.n) * span;
      const z = layer.z0 + (layer.z1 - layer.z0) * r();
      const h = layer.hMin + (layer.hMax - layer.hMin) * Math.pow(r(), 1.3);
      const w = layer.wMin + (layer.wMax - layer.wMin) * r();
      const d = w * (0.7 + r() * 0.6);
      towers.push(towerBox(w, h, d, x, -0.2, z));
      // 楼顶的锥形尖塔 / 顶灯、竖向的发光边
      if (r() < 0.35) towers.push(new THREE.ConeGeometry(w * 0.16, h * 0.14, 6).translate(x, h * 1.07 - 0.2, z));
      if (r() < 0.6) lights.push(new THREE.BoxGeometry(0.55, h * (0.5 + r() * 0.4), 0.55).translate(x + w / 2 + 0.02, h * 0.45 - 0.2, z + d / 2 + 0.02));
      beaconRed.push(new THREE.BoxGeometry(1.2, 1.2, 1.2).translate(x, h + (r() < 0.35 ? h * 0.14 : 0) - 0.2 + 0.4, z));
    }
  }
  const tex = windowTexture();
  const towerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.5, 1.5, 1.55), map: tex ?? undefined });
  if (!tex) towerMat.color.set(0x16203a);
  const towerMesh = new THREE.Mesh(mergeGeometries(towers, false)!, towerMat);
  towerMesh.name = "towers";
  g.add(towerMesh);
  const stripMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 1.6, 2.1) });
  g.add(new THREE.Mesh(mergeGeometries(lights, false)!, stripMat));
  const beaconMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 0.35, 0.3) });
  g.add(new THREE.Mesh(mergeGeometries(beaconRed, false)!, beaconMat));
  // 地平线上的光晕：一张竖向渐变的大平面（青绿 → 洋红 → 夜色）
  const glowGeo = new THREE.PlaneGeometry(260, 70, 1, 4);
  const pos = glowGeo.getAttribute("position");
  const colors: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const v = (pos.getY(i) + 35) / 70; // 0 底 .. 1 顶
    const k = Math.pow(1 - v, 2.2);
    colors.push(0.1 + k * 0.28, 0.2 + k * 0.5, 0.34 + k * 0.62);
  }
  glowGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  glowGeo.translate(0, 20, -118);
  g.add(new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({ vertexColors: true, depthWrite: false })));
  if (tex) addDisposer(root, () => tex.dispose());
  // 城市不投影也不接收阴影
  g.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = false;
      m.receiveShadow = false;
      m.frustumCulled = false;
    }
  });
  return g;
}

const TRAFFIC_COUNT = 44;

interface Streak {
  lane: { y: number; z: number };
  x: number;
  speed: number;
  len: number;
  phase: number;
}

function buildTraffic(): THREE.InstancedMesh {
  const geo = new THREE.BoxGeometry(1, 0.17, 0.17);
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.8, 1.8, 1.8) });
  const mesh = new THREE.InstancedMesh(geo, mat, TRAFFIC_COUNT);
  mesh.name = "traffic-streaks";
  mesh.frustumCulled = false;
  const r = rng(404);
  const tones = [new THREE.Color(2.0, 1.7, 1.2), new THREE.Color(1.1, 1.8, 2.2), new THREE.Color(2.0, 2.0, 2.0), new THREE.Color(2.2, 0.9, 0.7)];
  const streaks: Streak[] = [];
  for (let i = 0; i < TRAFFIC_COUNT; i++) {
    const dir = r() < 0.5 ? -1 : 1;
    streaks.push({
      lane: { y: 5 + Math.floor(r() * 5) * 4.2 + r(), z: -9 - r() * 42 },
      x: -70 + r() * 140,
      speed: dir * (2.2 + r() * 5.5),
      len: 1.4 + r() * 3.2,
      phase: r(),
    });
    mesh.setColorAt(i, tones[Math.floor(r() * tones.length)]);
  }
  mesh.userData.streaks = streaks;
  mesh.castShadow = false;
  updateTraffic(mesh, 0, 99); // 先摆好初始位置（包围盒按真实范围算，溶解 / 粒子才不会聚到原点）
  return mesh;
}

const _m = new THREE.Matrix4();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();

function updateTraffic(mesh: THREE.InstancedMesh, dt: number, age: number): void {
  const streaks = mesh.userData.streaks as Streak[];
  const grow = Math.min(1, age / 2.5);
  streaks.forEach((s, i) => {
    s.x += s.speed * dt;
    if (s.x > 75) s.x = -75;
    else if (s.x < -75) s.x = 75;
    _p.set(s.x, s.lane.y + Math.sin(age * 0.4 + s.phase * 6) * 0.15, s.lane.z);
    _s.set(s.len * grow, 1, 1);
    _m.compose(_p, _q, _s);
    mesh.setMatrixAt(i, _m);
  });
  mesh.instanceMatrix.needsUpdate = true;
}

// ───────────────────────── 雨 ─────────────────────────

const RAIN_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const RAIN_FRAG = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform float uFade;
uniform vec2 uSize;
float h11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float h21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main() {
  vec2 p = vUv * uSize;
  float a = 0.0;
  for (int l = 0; l < 3; l++) {
    float fl = float(l);
    float cols = 6.0 + fl * 5.0;
    float x = p.x * cols;
    float id = floor(x);
    float fx = fract(x) - 0.5;
    float seed = h11(id + fl * 31.7);
    float speed = 0.16 + seed * 0.32 + fl * 0.06;
    float len = 0.3 + seed * 0.8;
    float cyc = 2.4 + seed * 2.2;
    float head = cyc * (1.0 - fract(uTime * speed / cyc + seed * 7.0));
    float ym = mod(p.y, cyc);
    float d = ym - head;
    float trail = step(0.0, d) * (1.0 - smoothstep(0.0, len, d));
    float off = (h11(id * 3.1 + fl) - 0.5) * 0.5 + sin(p.y * 2.0 + seed * 9.0) * 0.04;
    float w = 0.05 + 0.06 * seed;
    float streak = smoothstep(w, 0.0, abs(fx - off));
    float bead = smoothstep(0.1, 0.0, length(vec2(fx - off, d * cols * 0.7)));
    a += (trail * streak * 0.5 + bead * 0.9) * (0.5 + 0.5 * h11(id + 5.0));
  }
  vec2 g = p * 16.0;
  vec2 gi = floor(g);
  vec2 gf = fract(g) - 0.5;
  float r = h21(gi);
  float dot0 = smoothstep(0.2, 0.04, length(gf - (vec2(h21(gi + 1.7), h21(gi + 4.3)) - 0.5) * 0.5)) * step(0.9, r);
  a += dot0 * 0.55;
  a = clamp(a, 0.0, 1.0);
  gl_FragColor = vec4(vec3(0.74, 0.88, 1.0) * (0.7 + 0.5 * a), a * 0.42 * uFade);
}
`;

function buildRain(): THREE.Group {
  const g = new THREE.Group();
  g.name = "rain";
  const mat = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTime: { value: 0 }, uFade: { value: 0 }, uSize: { value: new THREE.Vector2(W, H) } }]),
    vertexShader: RAIN_VERT,
    fragmentShader: RAIN_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, H), mat);
  mesh.name = "rain-glass";
  mesh.position.set(0, H / 2, Z0 + 0.012);
  mesh.castShadow = false;
  mesh.renderOrder = 6;
  g.add(mesh);
  return g;
}

// ───────────────────────── 家具、笔记本、界面 ─────────────────────────

function buildChair(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "chair", (k) => {
    const f = new Frame(k.kit, APARTMENT.oldMan.x, 0, APARTMENT.oldMan.z, APARTMENT.oldMan.yaw);
    chair(k, f, new THREE.MeshStandardMaterial({ color: 0x4d4e55, roughness: 0.75 }));
    // 软垫
    f.box(new THREE.MeshStandardMaterial({ color: 0x6a5f54, roughness: 1 }), 0.4, 0.05, 0.4, 0, 0.47, 0, 0.02);
  });
}

function buildDesk(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "desk", (k) => {
    table(k, new Frame(k.kit, 1.62, 0, -0.45, Math.PI / 2), 1.1, 0.62, 0.75, new THREE.MeshStandardMaterial({ color: 0x6f5a45, roughness: 0.6 }));
  });
}

/** 2026 年的纸质旧笔记本：深褐布面、泛黄纸边、松紧带、一支旧钢笔 */
function buildNotebook(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "notebook", (k) => {
    const n = APARTMENT.notebook;
    const f = new Frame(k.kit, n.x, n.y, n.z, 0.35);
    const cover = new THREE.MeshStandardMaterial({ color: 0x4a3426, roughness: 0.85 });
    const pages = new THREE.MeshStandardMaterial({ color: 0xd8c79b, roughness: 1 });
    f.box(cover, 0.21, 0.028, 0.29, 0, 0, 0, 0.004);
    f.box(pages, 0.19, 0.022, 0.27, 0.008, 0.003, 0, 0.001);
    f.box(cover, 0.21, 0.004, 0.29, 0, 0.026, 0, 0.002);
    f.box(k.p.fabricRed, 0.01, 0.032, 0.29, 0.07, 0, 0, 0.001);
    f.box(k.m.brass, 0.012, 0.05, 0.012, -0.14, 0.0, 0.16, 0.002, 0, 0.3, 0);
    f.box(k.p.plasticDark, 0.012, 0.012, 0.15, -0.16, 0.0, 0.22, 0.003, 0, 0.25, 0);
  });
}

function drawSpaced(g: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number): void {
  let cx = x;
  for (const ch of text) {
    g.fillText(ch, cx, y);
    cx += g.measureText(ch).width + spacing;
  }
}

/** 界面面板的贴图：透明底（叠加混合），青白色的字与细线 */
function panelTexture(): THREE.CanvasTexture | null {
  const c = makeCanvas(640, 440);
  if (!c) return null;
  const { canvas, g } = c;
  g.clearRect(0, 0, 640, 440);
  const cyan = "rgba(140,234,255,";
  g.fillStyle = cyan + "0.1)";
  g.fillRect(8, 8, 624, 424);
  g.strokeStyle = cyan + "0.9)";
  g.lineWidth = 2.5;
  g.strokeRect(8, 8, 624, 424);
  for (const [x, y, dx, dy] of [
    [8, 8, 1, 1],
    [632, 8, -1, 1],
    [8, 432, 1, -1],
    [632, 432, -1, -1],
  ] as const) {
    g.beginPath();
    g.moveTo(x, y + dy * 34);
    g.lineTo(x, y);
    g.lineTo(x + dx * 34, y);
    g.lineWidth = 6;
    g.stroke();
  }
  g.textBaseline = "alphabetic";
  g.fillStyle = "rgba(235,252,255,0.96)";
  g.font = '700 46px "Helvetica Neue", Arial, sans-serif';
  drawSpaced(g, "MEMORY RECALL", 44, 92, 7);
  g.fillStyle = cyan + "0.7)";
  g.fillRect(44, 112, 330, 2);
  g.font = '500 20px "Helvetica Neue", Arial, sans-serif';
  g.fillStyle = cyan + "0.78)";
  drawSpaced(g, "DESTINATION", 44, 168, 5);
  g.fillStyle = "rgba(235,252,255,0.95)";
  g.font = '600 56px "Helvetica Neue", Arial, sans-serif';
  g.fillText("2026", 44, 232);
  g.font = '500 24px "Helvetica Neue", Arial, sans-serif';
  g.fillStyle = cyan + "0.85)";
  drawSpaced(g, "UNIVERSITY", 44, 272, 6);
  // 右侧的同心环与刻度
  g.strokeStyle = cyan + "0.55)";
  g.lineWidth = 2;
  for (const rr of [52, 78, 104]) {
    g.beginPath();
    g.arc(500, 210, rr, 0, Math.PI * 2);
    g.stroke();
  }
  g.lineWidth = 5;
  g.strokeStyle = cyan + "0.95)";
  g.beginPath();
  g.arc(500, 210, 78, -Math.PI / 2, Math.PI * 0.55);
  g.stroke();
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    g.lineWidth = i % 3 === 0 ? 3 : 1.5;
    g.strokeStyle = cyan + (i % 3 === 0 ? "0.8)" : "0.4)");
    g.beginPath();
    g.moveTo(500 + Math.cos(a) * 112, 210 + Math.sin(a) * 112);
    g.lineTo(500 + Math.cos(a) * 122, 210 + Math.sin(a) * 122);
    g.stroke();
  }
  // 数据条与进度
  const r = rng(11);
  g.fillStyle = cyan + "0.35)";
  for (let i = 0; i < 6; i++) g.fillRect(44, 308 + i * 10, 60 + r() * 220, 3);
  g.fillStyle = "rgba(235,252,255,0.9)";
  g.font = '600 22px "Helvetica Neue", Arial, sans-serif';
  drawSpaced(g, "ARE YOU READY?", 44, 408, 5);
  g.fillStyle = cyan + "0.3)";
  g.fillRect(360, 394, 240, 8);
  g.fillStyle = cyan + "0.95)";
  g.fillRect(360, 394, 96, 8);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function buildPanel(root: THREE.Group): THREE.Group {
  const g = new THREE.Group();
  g.name = "panel";
  const p = APARTMENT.panel;
  const tex = panelTexture();
  const mat = new THREE.MeshBasicMaterial({
    map: tex ?? undefined,
    color: tex ? new THREE.Color(1.7, 1.7, 1.7) : new THREE.Color(0.4, 1.3, 1.7),
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  // 面板朝向老人（-x），略转向镜头一侧
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.62), mat);
  face.name = "panel-face";
  face.position.set(p.x, p.y, p.z);
  face.rotation.y = -Math.PI / 2 + 0.5;
  g.add(face);
  // 桌面上手放的光环与圆盘
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.006, 6, 40),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0.4, 1.7, 2.2), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  ring.name = "panel-ring";
  ring.rotation.x = Math.PI / 2;
  ring.position.set(1.62, 0.766, -0.05);
  g.add(ring);
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(0.15, 36),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0.1, 0.5, 0.7), transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.set(1.62, 0.762, -0.05);
  g.add(disc);
  g.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    }
  });
  if (tex) addDisposer(root, () => tex.dispose());
  return g;
}

function buildLamp(kit: SceneKit): THREE.Group {
  const g = pieceGroup(kit, "lamp", (k) => {
    const f = new Frame(k.kit, -2.5, 0, -1.9);
    f.cyl(k.m.darkSteel, 0.16, 0.18, 0.03, 0, 0, 0, 20);
    f.cyl(k.m.darkSteel, 0.012, 0.012, 1.5, 0, 0.03, 0, 8);
    f.cyl(k.m.lampGlass, 0.12, 0.2, 0.3, 0, 1.45, 0, 24);
  });
  return g;
}

function buildPlant(kit: SceneKit): THREE.Group {
  const g = pieceGroup(kit, "plant", (k) => {
    const f = new Frame(k.kit, 3.4, 0, -2.2);
    f.cyl(new THREE.MeshStandardMaterial({ color: 0x2f2f33, roughness: 0.6 }), 0.28, 0.2, 0.5, 0, 0, 0, 20);
    f.cyl(k.m.soil, 0.25, 0.25, 0.04, 0, 0.48, 0, 18);
  });
  const bush = createBush(1.5, kit.detail);
  bush.position.set(3.4, 0.5, -2.2);
  g.add(bush);
  return g;
}

export function buildApartment(kit: SceneKit): THREE.Group {
  const root = new THREE.Group();
  root.name = "stage-apartment2090";
  root.add(buildFloor(kit), ...buildWalls(kit), buildCeiling(kit), buildWindow(kit));
  const city = buildCity(root);
  city.add(buildTraffic()); // 悬浮交通是城市的一部分，随城市一起显形
  root.add(city, buildRain());
  root.add(buildChair(kit), buildDesk(kit), buildNotebook(kit), buildPanel(root), buildLamp(kit), buildPlant(kit));
  return root;
}

// ───────────────────────── 动画 ─────────────────────────

interface Refs {
  rain?: THREE.Mesh;
  traffic?: THREE.InstancedMesh;
  panel?: THREE.Object3D;
  ring?: THREE.Object3D;
  rainSeen?: number;
  trafficSeen?: number;
}
const refsOf = new WeakMap<THREE.Group, Refs>();

function animateApartment(root: THREE.Group, dt: number, time: number): void {
  let refs = refsOf.get(root);
  if (!refs) {
    refs = {
      rain: root.getObjectByName("rain-glass") as THREE.Mesh | undefined,
      traffic: root.getObjectByName("traffic-streaks") as THREE.InstancedMesh | undefined,
      panel: root.getObjectByName("panel-face"),
      ring: root.getObjectByName("panel-ring"),
    };
    refsOf.set(root, refs);
  }
  // 雨：部件开始显形（父组 visible）后 2.5 秒内淡入；材质是 Materializer 克隆的，从网格上取当前材质
  if (refs.rain) {
    const visible = refs.rain.parent?.visible ?? false;
    if (visible && refs.rainSeen === undefined) refs.rainSeen = time;
    const u = (refs.rain.material as THREE.ShaderMaterial).uniforms;
    u.uTime.value = time;
    u.uFade.value = refs.rainSeen === undefined ? 0 : Math.min(1, (time - refs.rainSeen) / 2.5);
  }
  if (refs.traffic) {
    const visible = refs.traffic.parent?.visible ?? false;
    if (visible && refs.trafficSeen === undefined) refs.trafficSeen = time;
    if (visible) updateTraffic(refs.traffic, dt, time - (refs.trafficSeen ?? time));
  }
  if (refs.panel) {
    refs.panel.position.y = APARTMENT.panel.y + Math.sin(time * 0.9) * 0.018;
    refs.panel.rotation.y = -Math.PI / 2 + 0.5 + Math.sin(time * 0.35) * 0.04;
    refs.panel.position.x = APARTMENT.panel.x + Math.sin(time * 0.5) * 0.01;
  }
  if (refs.ring) refs.ring.scale.setScalar(1 + Math.sin(time * 2.1) * 0.035);
}

export const APARTMENT_2090: StageDef = {
  name: "apartment2090",
  showPlayer: false,
  targets: TARGETS,
  bounds: { minX: -HX + 0.6, maxX: HX - 0.6, minZ: Z0 + 0.8, maxZ: Z1 - 0.6 },
  cameraBounds: { minX: -HX + 0.3, maxX: HX - 0.3, minZ: Z0 + 0.3, maxZ: Z1 + 3 },
  spawn: { x: -1.5, y: 0, z: 1.8, yaw: Math.PI },
  slots: { table: [], hover: [], floor: [] },
  shots: [{ from: { x: -0.8, y: 1.5, z: 3.0 }, to: { x: 0, y: 1.45, z: 1.9 }, look: { x: 0.9, y: 1.2, z: -0.6 }, duration: 14, move: "dolly" }],
  environment: {
    fogColor: 0x070b16,
    fogDensity: 0.011,
    skyTop: 0x0a1228,
    skyMid: 0x1c4060,
    skyBot: 0x140f18,
    sunColor: 0xffd9b0,
    sunDir: { x: 0.55, y: 0.62, z: 0.5 },
    sunIntensity: 1.5,
    hemiSky: 0x5f86c8,
    hemiGround: 0x15181f,
    hemiIntensity: 0.55,
    envIntensity: 0.75,
    shadowRadius: 6,
  },
  build: buildApartment,
  animate: animateApartment,
};
