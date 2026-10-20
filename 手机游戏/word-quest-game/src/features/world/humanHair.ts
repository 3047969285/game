import * as THREE from "three";
import type { HairStyleId } from "./humanIdentity";

/**
 * 头发（docs/api-character-identity.md §2）。
 *
 * 1. 底模头发的处理（GLB 实测：`*_head` primitive 里整个发型是一块带头发贴图的壳——男 1.5k 顶点的蓬松卷发、女的发髻 / 马尾；
 *    `*_opacity` primitive 全是头发卡片（男 744 顶点 0 个睫毛；女 596 顶点里 180 个是睫毛 / 眉，其余是发丝）。
 *    - head primitive：Head 骨主导、且落在“头发区域”（眉线以上 / 耳后 / 脑后拖出颅骨之外）的顶点 → 收缩到颅骨椭球表面（变成贴头皮的底层）。
 *    - opacity primitive：只保留落在眼睛周围包围盒里的顶点（睫毛 / 眉），其余三角形整体剔除。）
 * 2. 程序头发：沿颅骨椭球生长的发片（每片 = 一条带锥度的弯曲带），UV 沿宽 / 长，程序发丝贴图 + alphaTest，绑在 Head 骨上；
 *    尾端（马尾 / 长发 / 波波头）绑两根额外的弹簧骨（HairSway）。
 */

export type V3 = [number, number, number];

export interface SkullModel {
  center: THREE.Vector3;
  radii: THREE.Vector3;
}

export interface HeadLandmarks {
  /** 两眼中点（mesh 绑定空间，米） */
  eye: THREE.Vector3;
  eyeHalf: number;
  skull: SkullModel;
}

const boneName = (names: readonly string[], geometry: THREE.BufferGeometry, i: number): { name: string; weight: number } => {
  const si = geometry.getAttribute("skinIndex");
  const sw = geometry.getAttribute("skinWeight");
  let best = 0, bw = -1;
  for (let k = 0; k < 4; k++) {
    const w = sw.getComponent(i, k);
    if (w > bw) { bw = w; best = si.getComponent(i, k); }
  }
  // GLTFLoader 会把节点名里的空格换成下划线（Bip01 LEye → Bip01_LEye）
  return { name: (names[best] ?? "").replace(/_/g, " "), weight: bw };
};

/** 颅骨椭球（相对两眼中点）：半径与中心按男 / 女底模实测的眉线、耳位、后脑位置标定。 */
export const SKULL_RADII: V3 = [0.08, 0.112, 0.108];

export function headLandmarks(headGeometry: THREE.BufferGeometry, names: readonly string[]): HeadLandmarks | null {
  const pos = headGeometry.getAttribute("position");
  const sum = new THREE.Vector3();
  let n = 0;
  let minX = Infinity, maxX = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const { name, weight } = boneName(names, headGeometry, i);
    if (weight > 0.6 && (name === "Bip01 LEye" || name === "Bip01 REye")) {
      sum.add(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
      minX = Math.min(minX, pos.getX(i)); maxX = Math.max(maxX, pos.getX(i));
      n++;
    }
  }
  if (!n) return null;
  const eye = sum.multiplyScalar(1 / n);
  const center = new THREE.Vector3(0, eye.y + 0.005, eye.z - 0.066);
  return { eye, eyeHalf: Math.abs(maxX - minX) / 2 > 0.03 ? 0.031 : 0.031, skull: { center, radii: new THREE.Vector3(...SKULL_RADII) } };
}

/** 头发顶点：Head 骨主导，且在头发区域（几何判据，不依赖贴图，node 下可测试）。 */
export function baseHairMask(headGeometry: THREE.BufferGeometry, names: readonly string[], lm: HeadLandmarks): Uint8Array {
  const pos = headGeometry.getAttribute("position");
  const mask = new Uint8Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const { name, weight } = boneName(names, headGeometry, i);
    if (name !== "Head" || weight < 0.5) continue;
    const x = pos.getX(i) - lm.eye.x, y = pos.getY(i) - lm.eye.y, z = pos.getZ(i) - lm.eye.z;
    const ax = Math.abs(x);
    const ear = ax > 0.062 && ax < 0.096 && Math.abs(y) < 0.05 && z > -0.13 && z < -0.02;
    if (ear) continue;
    if (y > 0.05) mask[i] = 1; // 眉线以上
    else if (ax > 0.096 && y > -0.1) mask[i] = 1; // 头两侧蓬出的发束
    else if (z < -0.06 && y > -0.13) mask[i] = 1; // 脑后
    else if (z < -0.12) mask[i] = 1; // 拖出颅骨的发束（马尾 / 发髻）
  }
  return mask;
}

/** 把头发顶点收缩到颅骨椭球上（已经在椭球内的不动）。返回移动的顶点数。 */
export function shrinkBaseHair(headGeometry: THREE.BufferGeometry, names: readonly string[], lm: HeadLandmarks): number {
  const mask = baseHairMask(headGeometry, names, lm);
  const pos = headGeometry.getAttribute("position");
  const c = lm.skull.center, r = lm.skull.radii;
  let moved = 0;
  for (let i = 0; i < pos.count; i++) {
    if (!mask[i]) continue;
    const hx = pos.getX(i) - c.x, hy = pos.getY(i) - c.y, hz = pos.getZ(i) - c.z;
    const s = (hx / r.x) ** 2 + (hy / r.y) ** 2 + (hz / r.z) ** 2;
    if (s <= 1) continue;
    const k = 1 / Math.sqrt(s);
    pos.setXYZ(i, c.x + hx * k, c.y + hy * k, c.z + hz * k);
    moved++;
  }
  pos.needsUpdate = true;
  headGeometry.computeBoundingSphere();
  return moved;
}

/** opacity 层：只保留眼睛周围（睫毛 / 眉）的三角形，头发卡片全部剔除。返回保留的三角形数。 */
export function cullOpacityHair(geometry: THREE.BufferGeometry, lm: HeadLandmarks): number {
  const pos = geometry.getAttribute("position");
  const keep = (i: number): boolean => {
    const x = pos.getX(i) - lm.eye.x, y = pos.getY(i) - lm.eye.y, z = pos.getZ(i) - lm.eye.z;
    return Math.abs(y) < 0.045 && z > -0.03 && Math.abs(x) < 0.085;
  };
  const index = geometry.getIndex();
  const out: number[] = [];
  if (index) {
    for (let t = 0; t < index.count; t += 3) {
      const a = index.getX(t), b = index.getX(t + 1), c = index.getX(t + 2);
      if (keep(a) && keep(b) && keep(c)) out.push(a, b, c);
    }
  } else {
    for (let t = 0; t < pos.count; t += 3) if (keep(t) && keep(t + 1) && keep(t + 2)) out.push(t, t + 1, t + 2);
  }
  geometry.setIndex(out);
  return out.length / 3;
}

// ───────────────────────── 程序头发：实心发壳 + 沿壳面的宽发束 ─────────────────────────

function mulberry(seed: number): () => number {
  let a = (seed ^ 0x51ed270b) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (a: number, b: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const len3 = (v: V3): number => Math.hypot(v[0], v[1], v[2]);
const norm3 = (v: V3): V3 => { const l = len3(v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cross3 = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** 分段线性插值表 */
const table = (pts: Array<[number, number]>, x: number): number => {
  if (x <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) return lerp(pts[i - 1][1], pts[i][1], (x - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0]));
  return pts[pts.length - 1][1];
};

/** 发壳沿某条经线（从头顶到发际 / 发梢）的一个采样点 */
interface PathPoint { p: V3; n: V3; sw: number }
type Path = PathPoint[];

interface StyleDef {
  /** 发际线纬度（0 = 赤道，π/2 = 头顶），a = |lon|：0 正前 → π 正后 */
  endLat: (a: number) => number;
  /** 发际之下继续垂下的长度（米） */
  hang?: (a: number) => number;
  /** 离开颅骨的厚度 */
  thick: (lon: number, lat: number, noise: (x: number, y: number) => number) => number;
  flare?: number;
  back?: number;
  swing?: number;
  /** 沿壳面的宽发束：数量 / 宽度 / 只出现在 |lon| 超过 minA 的位置（脸前不放） */
  cards?: { count: number; width: [number, number]; minA?: number; tipExtra?: number };
  /** 马尾 / 揪 / 发髻 */
  bundle?: { kind: "tail"; tie: V3; len: number; radius: number; sway: boolean } | { kind: "bun"; center: V3; radius: number };
  sway?: { pivot: V3; mid: V3; tip: V3 };
}

const CROP_LINE: Array<[number, number]> = [[0, 0.8], [0.8, 0.78], [1.2, 0.58], [1.5, 0.42], [1.9, 0.3], [2.3, -0.05], [3.15, -0.3]];
const crop = (front: number, side = 0): ((a: number) => number) => (a) => table(CROP_LINE, a) + (front - 0.8) * (1 - smooth(0.9, 1.5, a)) + side * smooth(1.2, 1.9, a);

const STYLES: Record<HairStyleId, StyleDef> = {
  messyCrop: { endLat: crop(0.7), thick: (lon, lat, n) => (0.006 + 0.012 * Math.sin(lat)) + n(lon * 4, lat * 6) * 0.01 * Math.cos(lat), cards: { count: 26, width: [0.025, 0.04], tipExtra: 0.02 } },
  sidePart: { endLat: crop(0.74), thick: (lon, lat, n) => 0.006 + 0.008 * Math.sin(lat) + 0.007 * Math.max(0, Math.sin(lon - 0.4)) * Math.cos(lat) + n(lon * 3, lat * 4) * 0.003, cards: { count: 14, width: [0.03, 0.045], tipExtra: 0.012 } },
  buzz: { endLat: crop(0.82, 0.05), thick: () => 0.003 },
  wavy: { endLat: crop(0.68, -0.05), thick: (lon, lat, n) => 0.012 + 0.016 * Math.sin(lat) + n(lon * 6, lat * 9) * 0.01 * Math.cos(lat), hang: (a) => 0.03 * smooth(1.5, 2.4, a), flare: 0.02, cards: { count: 24, width: [0.03, 0.05], tipExtra: 0.025 } },
  shortTieUp: { endLat: crop(0.72), thick: (_lon, lat) => 0.006 + 0.007 * Math.sin(lat), cards: { count: 10, width: [0.025, 0.04] }, bundle: { kind: "tail", tie: [0, -0.04, -0.115], len: 0.075, radius: 0.016, sway: true }, sway: { pivot: [0, -0.04, -0.115], mid: [0, -0.07, -0.125], tip: [0, -0.105, -0.13] } },
  bob: { endLat: crop(0.64), hang: (a) => 0.1 * smooth(1.7, 2.3, a), flare: 0.03, back: 0.015, swing: 0.5, thick: (lon, lat) => 0.008 + 0.012 * Math.sin(lat) + 0.012 * smooth(1.2, 2, Math.abs(lon)) * Math.cos(lat), cards: { count: 22, width: [0.035, 0.055], minA: 1.7 }, sway: { pivot: [0, 0, -0.1], mid: [0, -0.07, -0.13], tip: [0, -0.15, -0.14] } },
  earShort: { endLat: crop(0.66), hang: (a) => 0.06 * smooth(1.9, 2.4, a), flare: 0.012, swing: 0.2, thick: (lon, lat) => 0.007 + 0.011 * Math.sin(lat) + 0.006 * smooth(1.2, 2, Math.abs(lon)) * Math.cos(lat), cards: { count: 12, width: [0.03, 0.045], minA: 1.7 } },
  longStraight: { endLat: crop(0.66), hang: (a) => 0.1 * smooth(1.6, 2.0, a) + 0.26 * smooth(1.7, 2.4, a), flare: 0.012, back: 0.05, swing: 0.7, thick: (lon, lat) => 0.007 + 0.01 * Math.sin(lat) + 0.01 * smooth(1.2, 2, Math.abs(lon)) * Math.cos(lat), cards: { count: 24, width: [0.04, 0.06], minA: 1.9 }, sway: { pivot: [0, -0.02, -0.105], mid: [0, -0.13, -0.15], tip: [0, -0.26, -0.17] } },
  highPonytail: { endLat: crop(0.76), thick: (lon, lat) => 0.005 + 0.006 * Math.sin(lat) + 0.01 * Math.exp(-(((Math.abs(lon) - 3.14) / 0.5) ** 2 + ((lat - 0.62) / 0.3) ** 2)), bundle: { kind: "tail", tie: [0, 0.066, -0.101], len: 0.3, radius: 0.03, sway: true }, sway: { pivot: [0, 0.066, -0.101], mid: [0, -0.04, -0.15], tip: [0, -0.2, -0.17] } },
  lowPonytail: { endLat: crop(0.74), thick: (lon, lat) => 0.005 + 0.006 * Math.sin(lat) + 0.01 * Math.exp(-(((Math.abs(lon) - 3.14) / 0.5) ** 2 + ((lat + 0.3) / 0.3) ** 2)), bundle: { kind: "tail", tie: [0, -0.034, -0.116], len: 0.28, radius: 0.028, sway: true }, sway: { pivot: [0, -0.034, -0.116], mid: [0, -0.12, -0.14], tip: [0, -0.27, -0.15] } },
  sideBun: { endLat: crop(0.76), thick: (_lon, lat) => 0.005 + 0.006 * Math.sin(lat), bundle: { kind: "bun", center: [0.052, 0.03, -0.112], radius: 0.04 } },
  thinningSwept: { endLat: crop(1.12, 0.05), thick: (_lon, lat) => 0.003 + 0.004 * Math.sin(lat), cards: { count: 16, width: [0.02, 0.03], minA: 1.0 } },
};

export const HAIR_STYLES = Object.keys(STYLES) as HairStyleId[];

export interface HairBuild {
  geometry: THREE.BufferGeometry;
  /** 有尾端摆动的发型：尾端骨的 pivot / 中段 / 尖端（头部坐标） */
  tail: { pivot: V3; mid: V3; tip: V3 } | null;
  vertexCount: number;
}

/** 值噪声（确定性） */
function valueNoise(seed: number): (x: number, y: number) => number {
  const h = (ix: number, iy: number): number => {
    let v = Math.imul(ix * 374761393 + iy * 668265263 + seed * 2246822519, 1274126177);
    v = (v ^ (v >>> 13)) >>> 0;
    return ((v & 0xffff) / 0xffff) * 2 - 1;
  };
  return (x, y) => {
    const x0 = Math.floor(x), y0 = Math.floor(y);
    const fx = smooth(0, 1, x - x0), fy = smooth(0, 1, y - y0);
    return lerp(lerp(h(x0, y0), h(x0 + 1, y0), fx), lerp(h(x0, y0 + 1), h(x0 + 1, y0 + 1), fx), fy);
  };
}

const TAU = Math.PI * 2;
const NCOL = 56, K1 = 9, K2 = 7;

interface MeshAcc { positions: number[]; normals: number[]; uvs: number[]; colors: number[]; skinIndex: number[]; skinWeight: number[]; index: number[] }
const pushVertex = (m: MeshAcc, p: V3, n: V3, u: number, v: number, shade: number, sw: number, mid: number): void => {
  m.positions.push(p[0], p[1], p[2]);
  m.normals.push(n[0], n[1], n[2]);
  m.uvs.push(u, v);
  m.colors.push(shade, shade, shade);
  m.skinIndex.push(0, 1, 2, 0);
  m.skinWeight.push(1 - sw, sw * (1 - mid), sw * mid, 0);
};

/**
 * 生成发型几何（mesh 绑定空间）：
 * 1) 实心发壳：NCOL 条经线，每条从头顶沿颅骨椭球表面（带厚度）走到发际，再按 hang 垂下；不透明，发丝贴图左半（沿经线方向）、
 *    发根暗 → 发梢亮、高光带由 UV(v) 决定；
 * 2) 贴着壳面的宽发束（切向、沿梳向，只在轮廓 / 发梢处，不朝外戳）；
 * 3) 马尾 = 收紧在发圈处、向下垂、渐细的实心束；发髻 = 球。
 * 顶点属性：position / normal / uv / color / skinIndex / skinWeight（0 = Head，1/2 = 尾端弹簧骨）。
 */
export function buildHairGeometry(style: HairStyleId, lm: HeadLandmarks, seed: number): HairBuild {
  const def = STYLES[style];
  const rnd = mulberry(seed * 977 + style.length * 13);
  const noise = valueNoise(seed + 5);
  const r = lm.skull.radii;
  const c = lm.skull.center;
  const m: MeshAcc = { positions: [], normals: [], uvs: [], colors: [], skinIndex: [], skinWeight: [], index: [] };
  const ell = (lon: number, lat: number): V3 => [r.x * Math.sin(lon) * Math.cos(lat), r.y * Math.sin(lat), r.z * Math.cos(lon) * Math.cos(lat)];
  const ellN = (p: V3): V3 => norm3([p[0] / (r.x * r.x), p[1] / (r.y * r.y), p[2] / (r.z * r.z)]);

  // 经线路径
  const paths: Path[] = [];
  for (let ci = 0; ci <= NCOL; ci++) {
    const lon = -Math.PI + (ci / NCOL) * TAU;
    const a = Math.abs(lon);
    const endLat = def.endLat(a);
    const path: Path = [];
    for (let k = 0; k <= K1; k++) {
      const lat = lerp(Math.PI / 2 - 0.02, endLat, k / K1);
      const base = ell(lon, lat);
      const n = ellN(base);
      const t = def.thick(lon, lat, noise);
      path.push({ p: [base[0] + n[0] * t, base[1] + n[1] * t, base[2] + n[2] * t], n, sw: 0 });
    }
    const hang = def.hang ? def.hang(a) : 0;
    if (hang > 0.004) {
      const E = path[path.length - 1].p;
      const out = norm3([E[0], 0, E[2]]);
      for (let j = 1; j <= K2; j++) {
        const t = j / K2;
        const flare = (def.flare ?? 0) * t * t;
        const p: V3 = [E[0] * (1 - 0.12 * t) + out[0] * flare, E[1] - hang * t, E[2] + out[2] * flare - (def.back ?? 0) * t];
        path.push({ p, n: norm3([out[0], 0.25, out[2]]), sw: (def.swing ?? 0) * Math.pow(t, 1.1) });
      }
    }
    paths.push(path);
  }
  const arc = (path: Path): number[] => {
    const out = [0];
    for (let i = 1; i < path.length; i++) out.push(out[i - 1] + Math.hypot(path[i].p[0] - path[i - 1].p[0], path[i].p[1] - path[i - 1].p[1], path[i].p[2] - path[i - 1].p[2]));
    return out.map((x) => x / (out[out.length - 1] || 1));
  };
  const sample = (path: Path, arcs: number[], v: number): PathPoint => {
    let i = 1;
    while (i < arcs.length - 1 && arcs[i] < v) i++;
    const f = (v - arcs[i - 1]) / ((arcs[i] - arcs[i - 1]) || 1);
    const A = path[i - 1], B = path[i];
    return { p: [lerp(A.p[0], B.p[0], f), lerp(A.p[1], B.p[1], f), lerp(A.p[2], B.p[2], f)], n: norm3([lerp(A.n[0], B.n[0], f), lerp(A.n[1], B.n[1], f), lerp(A.n[2], B.n[2], f)]), sw: lerp(A.sw, B.sw, f) };
  };
  const rootShade = (v: number): number => 0.5 + 0.55 * Math.pow(v, 0.8);

  // 1) 发壳
  let base = 0;
  paths.forEach((path, ci) => {
    const arcs = arc(path);
    const shade = 0.9 + noise(ci * 0.7, 3.3) * 0.12;
    path.forEach((pt, k) => {
      pushVertex(m, [c.x + pt.p[0], c.y + pt.p[1], c.z + pt.p[2]], pt.n, 0.02 + 0.46 * (ci / NCOL), arcs[k], rootShade(arcs[k]) * shade, pt.sw, smooth(0.3, 1, arcs[k]));
    });
  });
  const rows = paths[0].length;
  // 各列长度可能不同（有 hang 的列更长）：按各自的长度连接到下一列的对应行，行数不同时用比例对齐
  const colStart: number[] = [];
  let off = 0;
  for (const path of paths) { colStart.push(off); off += path.length; }
  void rows; void base;
  for (let ci = 0; ci < NCOL; ci++) {
    const A = paths[ci], B = paths[ci + 1];
    const n = Math.max(A.length, B.length);
    const at = (len: number, i: number): number => Math.min(len - 1, Math.round((i / (n - 1)) * (len - 1)));
    for (let i = 0; i < n - 1; i++) {
      const a0 = colStart[ci] + at(A.length, i), a1 = colStart[ci] + at(A.length, i + 1);
      const b0 = colStart[ci + 1] + at(B.length, i), b1 = colStart[ci + 1] + at(B.length, i + 1);
      if (a0 === a1 && b0 === b1) continue;
      m.index.push(a0, b0, a1, b0, b1, a1);
    }
  }

  // 2) 宽发束：沿壳面（切向）的发片，只放在轮廓 / 发梢
  if (def.cards) {
    const cardCount = def.cards.count;
    for (let k = 0; k < cardCount; k++) {
      let ci = Math.floor(rnd() * NCOL);
      let tries = 0;
      while (Math.abs(-Math.PI + (ci / NCOL) * TAU) < (def.cards.minA ?? 0.9) && tries++ < 20) ci = Math.floor(rnd() * NCOL);
      const path = paths[ci], arcs = arc(path);
      const v0 = 0.45 + rnd() * 0.25, v1 = 1;
      const width = lerp(def.cards.width[0], def.cards.width[1], rnd());
      const shade = 0.85 + rnd() * 0.25;
      const steps = 6;
      const pts: PathPoint[] = [];
      for (let s = 0; s <= steps; s++) pts.push(sample(path, arcs, lerp(v0, v1, s / steps)));
      // 延长一点发梢（沿末段切向）
      const last = pts[pts.length - 1], prev = pts[pts.length - 2];
      const dir = norm3([last.p[0] - prev.p[0], last.p[1] - prev.p[1], last.p[2] - prev.p[2]]);
      const extra = def.cards.tipExtra ?? 0.01;
      pts.push({ p: [last.p[0] + dir[0] * extra, last.p[1] + dir[1] * extra, last.p[2] + dir[2] * extra], n: last.n, sw: last.sw });
      const start = m.positions.length / 3;
      pts.forEach((pt, s) => {
        const next = pts[Math.min(pts.length - 1, s + 1)], before = pts[Math.max(0, s - 1)];
        const T = norm3([next.p[0] - before.p[0], next.p[1] - before.p[1], next.p[2] - before.p[2]]);
        const S = norm3(cross3(T, pt.n));
        const w = (width / 2) * (1 - 0.55 * Math.pow(s / (pts.length - 1), 2));
        const off = 0.0035 + 0.002 * (s / pts.length);
        const v = s / (pts.length - 1);
        for (const side of [-1, 1]) {
          pushVertex(m, [c.x + pt.p[0] + pt.n[0] * off + S[0] * w * side, c.y + pt.p[1] + pt.n[1] * off + S[1] * w * side, c.z + pt.p[2] + pt.n[2] * off + S[2] * w * side], pt.n, 0.5 + (side < 0 ? 0 : 0.5), v, rootShade(lerp(v0, 1, v)) * shade, pt.sw, smooth(0.3, 1, lerp(v0, 1, v)));
        }
      });
      for (let s = 0; s < pts.length - 1; s++) { const q = start + s * 2; m.index.push(q, q + 1, q + 2, q + 1, q + 3, q + 2); }
    }
  }

  // 3) 马尾 / 揪 / 发髻
  let tail: HairBuild["tail"] = null;
  if (def.bundle?.kind === "tail") {
    const { tie, len, radius, sway } = def.bundle;
    const K = 16, SIDES = 12;
    const centers: V3[] = [];
    for (let k = 0; k <= K; k++) {
      const t = k / K;
      // 先略向后再受重力垂下；始终向下（不会朝上翘）
      centers.push([tie[0] + noise(t * 3, 1.7) * 0.006 * t, tie[1] - len * Math.pow(t, 1.1), tie[2] - 0.055 * (1 - Math.exp(-t * 5)) - 0.02 * t]);
    }
    const start = m.positions.length / 3;
    for (let k = 0; k <= K; k++) {
      const t = k / K;
      const T = norm3([centers[Math.min(K, k + 1)][0] - centers[Math.max(0, k - 1)][0], centers[Math.min(K, k + 1)][1] - centers[Math.max(0, k - 1)][1], centers[Math.min(K, k + 1)][2] - centers[Math.max(0, k - 1)][2]]);
      const X = norm3(cross3(T, [0, 0, 1]));
      const Z = norm3(cross3(X, T));
      // 发圈处收紧 → 向下鼓起 → 渐细到发梢
      const rad = t < 0.04 ? radius * 0.45 : radius * (0.45 + 0.55 * smooth(0.04, 0.28, t)) * (1 - 0.82 * smooth(0.3, 1, t));
      for (let s = 0; s <= SIDES; s++) {
        const ang = (s / SIDES) * TAU;
        const nx = Math.cos(ang), nz = Math.sin(ang);
        const p: V3 = [centers[k][0] + (X[0] * nx * 1.0 + Z[0] * nz * 0.8) * rad, centers[k][1] + (X[1] * nx + Z[1] * nz * 0.8) * rad, centers[k][2] + (X[2] * nx + Z[2] * nz * 0.8) * rad];
        const n = norm3([X[0] * nx + Z[0] * nz, X[1] * nx + Z[1] * nz, X[2] * nx + Z[2] * nz]);
        const tieBand = t < 0.045;
        pushVertex(m, [c.x + p[0], c.y + p[1], c.z + p[2]], n, 0.02 + 0.46 * (s / SIDES), t, (tieBand ? 0.28 : rootShade(t) * (0.92 + 0.1 * Math.sin(ang * 3))), sway ? Math.pow(t, 1.3) : 0, smooth(0.3, 1, t));
      }
    }
    for (let k = 0; k < K; k++) for (let s = 0; s < SIDES; s++) {
      const a = start + k * (SIDES + 1) + s, b = a + SIDES + 1;
      m.index.push(a, b, a + 1, a + 1, b, b + 1);
    }
  } else if (def.bundle?.kind === "bun") {
    const { center, radius } = def.bundle;
    const start = m.positions.length / 3;
    const RINGS = 10, SIDES = 14;
    for (let i = 0; i <= RINGS; i++) {
      const lat = -Math.PI / 2 + (i / RINGS) * Math.PI;
      for (let s = 0; s <= SIDES; s++) {
        const ang = (s / SIDES) * TAU;
        const sw = 1 + 0.06 * Math.sin(ang * 3 + lat * 4);
        const n: V3 = [Math.cos(lat) * Math.cos(ang), Math.sin(lat), Math.cos(lat) * Math.sin(ang)];
        pushVertex(m, [c.x + center[0] + n[0] * radius * sw, c.y + center[1] + n[1] * radius * 0.9 * sw, c.z + center[2] + n[2] * radius * sw], n, 0.02 + 0.46 * (s / SIDES), i / RINGS, 0.75 + 0.3 * (i / RINGS), 0, 0);
      }
    }
    for (let i = 0; i < RINGS; i++) for (let s = 0; s < SIDES; s++) {
      const a = start + i * (SIDES + 1) + s, b = a + SIDES + 1;
      m.index.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  if (def.sway) tail = def.sway;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(m.positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(m.normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(m.uvs, 2));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(m.colors, 3));
  geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(m.skinIndex, 4));
  geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(m.skinWeight, 4));
  geometry.setIndex(m.index);
  geometry.computeBoundingSphere();
  return { geometry, tail, vertexCount: m.positions.length / 3 };
}

// ───────────────────────── 发丝贴图 ─────────────────────────

const HAIR_TEXTURE_W = 256, HAIR_TEXTURE_H = 256;

function hash1(x: number): number {
  let h = Math.imul(x + 0x9e3779b9, 0x85ebca6b);
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/**
 * 程序发丝贴图像素（RGBA）：左半 = 发壳（细发丝沿 v 方向、不透明、v≈0.3 处一条高光带、仅发梢处软透明），
 * 右半 = 宽发束卡片（两侧 / 根部 / 发梢软透明）。
 */
export function hairTexturePixels(): Uint8ClampedArray {
  const data = new Uint8ClampedArray(HAIR_TEXTURE_W * HAIR_TEXTURE_H * 4);
  const half = HAIR_TEXTURE_W / 2;
  for (let y = 0; y < HAIR_TEXTURE_H; y++) {
    const v = y / (HAIR_TEXTURE_H - 1);
    for (let x = 0; x < HAIR_TEXTURE_W; x++) {
      const card = x >= half;
      const lx = card ? x - half : x;
      const u = (lx + 0.5) / half;
      const fine = hash1(lx * 7 + 3) * 0.55 + hash1(lx * 3 + 11) * 0.3 + hash1(Math.floor(lx / 5) * 17 + 5) * 0.15;
      const wave = Math.sin(v * 7 + lx * 0.31) * 0.05;
      let shade = 0.66 + 0.34 * fine + wave;
      shade *= 1 + 0.13 * Math.exp(-(((v - 0.3) / 0.1) ** 2)); // 高光带（横向，垂直于发丝）：只是同色系的略亮，不是色条
      let alpha = 1;
      const tipNoise = hash1(lx * 13 + (card ? 91 : 5));
      if (card) {
        alpha *= smooth(0, 0.16, u) * smooth(0, 0.16, 1 - u);
        alpha *= smooth(0, 0.12, v);
        alpha *= 1 - smooth(0.72 + tipNoise * 0.12, 1, v);
      } else {
        alpha *= 1 - smooth(0.93 + tipNoise * 0.04, 1, v);
      }
      const o = (y * HAIR_TEXTURE_W + x) * 4;
      const cc = Math.min(255, Math.max(0, shade * 255));
      data[o] = data[o + 1] = data[o + 2] = cc;
      data[o + 3] = Math.min(255, alpha * 255);
    }
  }
  return data;
}

let sharedTexture: THREE.DataTexture | undefined;
export function hairTexture(): THREE.DataTexture {
  if (!sharedTexture) {
    sharedTexture = new THREE.DataTexture(hairTexturePixels(), HAIR_TEXTURE_W, HAIR_TEXTURE_H, THREE.RGBAFormat);
    sharedTexture.colorSpace = THREE.SRGBColorSpace;
    sharedTexture.wrapS = sharedTexture.wrapT = THREE.ClampToEdgeWrapping;
    sharedTexture.generateMipmaps = true;
    sharedTexture.minFilter = THREE.LinearMipmapLinearFilter;
    sharedTexture.magFilter = THREE.LinearFilter;
    sharedTexture.userData.shared = true;
    sharedTexture.needsUpdate = true;
  }
  return sharedTexture;
}

export function hairMaterial(color: number): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({ color, map: hairTexture(), vertexColors: true, alphaTest: 0.35, side: THREE.DoubleSide, roughness: 0.85, metalness: 0.0, envMapIntensity: 0.15 });
  m.name = "human-hair";
  return m;
}

// ───────────────────────── 绑到 Head 骨 + 弹簧 ─────────────────────────

export interface HairObject {
  mesh: THREE.SkinnedMesh;
  sway: HairSway | null;
  vertexCount: number;
  style: HairStyleId;
}

/**
 * 创建绑在 Head 骨上的发片网格。`headMesh` 是已绑定的 head SkinnedMesh（借用它的 skeleton / bindMatrix / 头骨 IBM）。
 * 有尾端的发型额外创建两根弹簧骨（Head 的子骨），并给发片自己的 Skeleton。
 */
export function createHair(style: HairStyleId, lm: HeadLandmarks, headMesh: THREE.SkinnedMesh, material: THREE.Material, seed: number): HairObject | null {
  const headBone = headMesh.skeleton.bones.find((b) => b.name === "Head");
  if (!headBone) return null;
  const headIndex = headMesh.skeleton.bones.indexOf(headBone);
  const headInverse = headMesh.skeleton.boneInverses[headIndex];
  const build = buildHairGeometry(style, lm, seed);
  const bones: THREE.Bone[] = [headBone];
  const inverses: THREE.Matrix4[] = [headInverse.clone()];
  let sway: HairSway | null = null;
  const bindToLocal = (p: V3): THREE.Vector3 => new THREE.Vector3(lm.skull.center.x + p[0], lm.skull.center.y + p[1], lm.skull.center.z + p[2]).applyMatrix4(headInverse);
  if (build.tail) {
    const pivotLocal = bindToLocal(build.tail.pivot);
    const midLocal = bindToLocal(build.tail.mid);
    const tipLocal = bindToLocal(build.tail.tip);
    const a = new THREE.Bone(), b = new THREE.Bone();
    a.name = "hair-sway-a"; b.name = "hair-sway-b";
    a.position.copy(pivotLocal);
    b.position.copy(midLocal).sub(pivotLocal);
    a.add(b);
    headBone.add(a);
    // 绑定逆矩阵：骨骼的绑定世界矩阵 = 头骨绑定世界矩阵 × 局部平移
    const bindA = new THREE.Matrix4().copy(headInverse).invert().multiply(new THREE.Matrix4().makeTranslation(pivotLocal.x, pivotLocal.y, pivotLocal.z));
    const bindB = bindA.clone().multiply(new THREE.Matrix4().makeTranslation(b.position.x, b.position.y, b.position.z));
    bones.push(a, b);
    inverses.push(bindA.invert(), bindB.invert());
    sway = new HairSway(headBone, a, b, pivotLocal, midLocal, tipLocal);
  } else {
    // 没有尾端：把权重全部落到 Head（skinWeight 里 1/2 号骨权重本来就是 0）
    bones.push(new THREE.Bone(), new THREE.Bone());
    inverses.push(new THREE.Matrix4(), new THREE.Matrix4());
  }
  const mesh = new THREE.SkinnedMesh(build.geometry, material);
  mesh.name = `human-hair-${style}`;
  mesh.frustumCulled = false;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const skeleton = new THREE.Skeleton(bones, inverses);
  mesh.bind(skeleton, headMesh.bindMatrix);
  return { mesh, sway, vertexCount: build.vertexCount, style };
}

const _p = new THREE.Vector3(), _s = new THREE.Vector3();

/** 马尾 / 长发 / 波波头尾端的二阶弹簧摆动：两个质点（中段 / 尖端）追头部带动的静止位置，转成两根骨的旋转。 */
export class HairSway {
  private readonly posA = new THREE.Vector3();
  private readonly velA = new THREE.Vector3();
  private readonly posB = new THREE.Vector3();
  private readonly velB = new THREE.Vector3();
  private ready = false;
  private readonly restDirA: THREE.Vector3;
  private readonly restDirB: THREE.Vector3;
  private readonly lenA: number;
  private readonly lenB: number;
  /** 最近一次的摆动角（弧度，测试用） */
  angle = 0;

  constructor(private readonly head: THREE.Bone, private readonly boneA: THREE.Bone, private readonly boneB: THREE.Bone, private readonly pivot: THREE.Vector3, private readonly mid: THREE.Vector3, private readonly tip: THREE.Vector3) {
    this.restDirA = mid.clone().sub(pivot);
    this.restDirB = tip.clone().sub(mid);
    this.lenA = this.restDirA.length();
    this.lenB = this.restDirB.length();
  }

  /** head 的世界矩阵需要是最新的（动画器 apply 之后）。 */
  update(dt: number): void {
    if (dt <= 0) return;
    const h = Math.min(dt, 1 / 30);
    this.head.updateWorldMatrix(true, false);
    const pivotW = this.head.localToWorld(_p.copy(this.pivot)).clone();
    const midRest = this.head.localToWorld(_p.copy(this.mid)).clone();
    const tipRest = this.head.localToWorld(_p.copy(this.tip)).clone();
    if (!this.ready) {
      this.posA.copy(midRest); this.posB.copy(tipRest);
      this.ready = true;
    }
    // 质点追静止位置（弹簧 + 阻尼）+ 重力
    const k = 70, c = 7;
    for (const [pos, vel, rest] of [[this.posA, this.velA, midRest], [this.posB, this.velB, tipRest]] as const) {
      vel.addScaledVector(rest.clone().sub(pos), k * h).addScaledVector(vel, -c * h);
      vel.y -= 1.2 * h;
      pos.addScaledVector(vel, h);
    }
    // 长度约束：A 距支点 lenA，B 距 A lenB（世界尺度按 head 缩放换算）
    const scale = this.head.getWorldScale(_s).x * 1; // 米 / 骨骼局部单位
    const la = this.lenA * scale, lb = this.lenB * scale;
    this.posA.sub(pivotW).setLength(la).add(pivotW);
    this.posB.sub(this.posA).setLength(lb).add(this.posA);
    // 转成骨骼局部旋转
    const toLocalDir = (a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3 => this.head.worldToLocal(b.clone()).sub(this.head.worldToLocal(a.clone())).normalize();
    const dirA = toLocalDir(pivotW, this.posA);
    const qa = new THREE.Quaternion().setFromUnitVectors(this.restDirA.clone().normalize(), dirA);
    this.clamp(qa, 0.7);
    this.boneA.quaternion.copy(qa);
    // B：在 A 的局部系里看 A→B
    const dirB = toLocalDir(this.posA, this.posB).applyQuaternion(qa.clone().invert());
    const qb = new THREE.Quaternion().setFromUnitVectors(this.restDirB.clone().normalize(), dirB);
    this.clamp(qb, 0.7);
    this.boneB.quaternion.copy(qb);
    this.angle = 2 * Math.acos(Math.min(1, Math.abs(qa.w)));
  }

  private clamp(q: THREE.Quaternion, max: number): void {
    const angle = 2 * Math.acos(Math.min(1, Math.abs(q.w)));
    if (angle > max) q.slerp(new THREE.Quaternion(), 1 - max / angle);
  }
}
