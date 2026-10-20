// 建筑 / 地标表面程序纹理：8 种材料的“细节层”（砌石、砖、灰泥、铺地、木板、屋瓦、金属、混凝土）。
// 纯逻辑模块：不依赖 three，可在 node / vitest 中直接运行。所有纹理沿 u、v 严格无缝平铺。
//
// 输出约定（颜色由材质自身 color 决定，贴图只做“围绕原色的调制”）：
//   albedo RGBA8：rgb = 细节亮度 + 轻微色偏（整张平均亮度 ≈ 0.65，着色器里 rgb / 0.65 即为调制系数），a = AO
//   normal RGBA8：rgb = 切线空间法线（0..255 编码，z 朝外），a = 相对粗糙度（0.66 为中性，着色器里 a / 0.66 作乘数）
//   height Uint8Array：0..255 高度（灰缝 / 凹槽最低），只供测试 / 预览使用，不上传 GPU

export type SurfaceKind =
  | "masonry" // 石砌块（错缝、不规则块面、深灰缝）
  | "brick" // 砖墙（统一尺寸、砂浆缝、个别砖色差）
  | "plaster" // 灰泥 / 粉刷墙（细颗粒、细裂纹、局部剥落）
  | "paving" // 方石铺地
  | "wood" // 木板（纵向纹理、节疤、板缝）
  | "tiles" // 屋瓦（弧形起伏、搭接阴影）
  | "metal" // 金属（拉丝、细划痕、局部氧化斑）
  | "concrete"; // 混凝土（气孔、模板缝）

export const SURFACE_KINDS: SurfaceKind[] = ["masonry", "brick", "plaster", "paving", "wood", "tiles", "metal", "concrete"];

/** 每种材质的物理尺度（米）：一张贴图在世界里覆盖多大 */
export const SURFACE_SCALE: Record<SurfaceKind, number> = {
  masonry: 2.4,
  brick: 1.2,
  plaster: 1.6,
  paving: 1.8,
  wood: 1.6,
  tiles: 1.2,
  metal: 1.0,
  concrete: 2.0,
};

/** 数组纹理里的层号 */
export function surfaceLayer(kind: SurfaceKind): number {
  return SURFACE_KINDS.indexOf(kind);
}

/** albedo 细节图的平均亮度（着色器按它归一化，保持材质原色的平均亮度） */
export const SURFACE_ALBEDO_MEAN = 0.65;
/** albedo.a（AO）的平均值（着色器按它归一化，平整处不额外变暗，只在空腔里变暗） */
export const SURFACE_AO_MEAN = 0.87;
/** normal.a 的中性粗糙度（着色器里 a / 0.66 作为粗糙度乘数） */
export const SURFACE_ROUGH_NEUTRAL = 0.66;

export interface SurfaceTexture {
  size: number;
  albedo: Uint8Array;
  normal: Uint8Array;
  height: Uint8Array;
}

// ───────────────────────── 随机 / 噪声 ─────────────────────────

function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const sm = (a: number, b: number, x: number): number => {
  const t = (x - a) / (b - a);
  return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 周期值噪声分形场（0..1）；格数对 size 取模 → 严格无缝。每个倍频格数翻倍，超过 size/2 即停止。 */
function noiseField(S: number, rnd: () => number, cellsX: number, cellsY: number, octaves: number, gain = 0.5): Float32Array {
  const out = new Float32Array(S * S);
  let amp = 1;
  let norm = 0;
  const x0 = new Int32Array(S);
  const x1 = new Int32Array(S);
  const wx = new Float32Array(S);
  for (let o = 0; o < octaves; o++) {
    const cx = cellsX << o;
    const cy = cellsY << o;
    if (cx > S / 2 || cy > S / 2) break;
    const lat = new Float32Array(cx * cy);
    for (let i = 0; i < lat.length; i++) lat[i] = rnd();
    for (let x = 0; x < S; x++) {
      const f = (x * cx) / S;
      const i0 = Math.floor(f);
      const t = f - i0;
      x0[x] = i0 % cx;
      x1[x] = (i0 + 1) % cx;
      wx[x] = t * t * (3 - 2 * t);
    }
    const col = new Float32Array(cx);
    for (let y = 0; y < S; y++) {
      const f = (y * cy) / S;
      const j0 = Math.floor(f);
      const t = f - j0;
      const wy = t * t * (3 - 2 * t);
      const r0 = (j0 % cy) * cx;
      const r1 = ((j0 + 1) % cy) * cx;
      for (let c = 0; c < cx; c++) col[c] = lat[r0 + c] + (lat[r1 + c] - lat[r0 + c]) * wy;
      const row = y * S;
      for (let x = 0; x < S; x++) {
        const a = col[x0[x]];
        out[row + x] += amp * (a + (col[x1[x]] - a) * wx[x]);
      }
    }
    norm += amp;
    amp *= gain;
  }
  if (norm === 0) throw new Error("noiseField: cells exceed size");
  const inv = 1 / norm;
  for (let i = 0; i < out.length; i++) out[i] *= inv;
  return out;
}

// ───────────────────────── 画布 ─────────────────────────

interface Plane {
  S: number;
  mask: number;
  /** 像素尺度：S / 512，用来把 512 下的像素尺寸缩放到当前分辨率 */
  s: number;
  H: Float32Array;
  /** 相对颜色（1 = 中性），finalize 时统一归一化到平均亮度 0.65 */
  R: Float32Array;
  G: Float32Array;
  B: Float32Array;
  /** 相对粗糙度（0.66 = 中性） */
  F: Float32Array;
  /** 额外 AO（1 = 无遮蔽），与高度图求得的空腔 AO 相乘 */
  A: Float32Array;
}

function newPlane(S: number): Plane {
  const n = S * S;
  const p: Plane = {
    S,
    mask: S - 1,
    s: S / 512,
    H: new Float32Array(n),
    R: new Float32Array(n).fill(1),
    G: new Float32Array(n).fill(1),
    B: new Float32Array(n).fill(1),
    F: new Float32Array(n).fill(SURFACE_ROUGH_NEUTRAL),
    A: new Float32Array(n).fill(1),
  };
  return p;
}

/** 在 (x,y) 处画一个以 r 为半径的软圆（环绕写入），回调拿到 (像素下标, 0..1 的中心度) */
function stampDisc(S: number, cx: number, cy: number, r: number, fn: (i: number, k: number) => void): void {
  const mask = S - 1;
  const ext = Math.ceil(r);
  const ix = Math.round(cx);
  const iy = Math.round(cy);
  for (let dy = -ext; dy <= ext; dy++) {
    for (let dx = -ext; dx <= ext; dx++) {
      const q = Math.sqrt(dx * dx + dy * dy) / r;
      if (q >= 1) continue;
      fn(((iy + dy) & mask) * S + ((ix + dx) & mask), 1 - q);
    }
  }
}

// ───────────────────────── 块状图案（砌石 / 砖 / 铺地 共用） ─────────────────────────

interface BlockOpts {
  rows: number;
  rowJitter: number;
  perRow: number;
  /** 每行块数在 perRow ± 1 内随机 */
  perRowVar: boolean;
  widthJitter: number;
  offset: "random" | "half" | "none";
  /** 边界扭曲幅度（像素，512 下） */
  warp: number;
}

interface BlockField {
  /** 到最近灰缝 / 块边界的距离（像素） */
  d: Float32Array;
  id: Int32Array;
  /** 块内归一化坐标 */
  fu: Float32Array;
  fv: Float32Array;
  total: number;
}

function blockField(S: number, rnd: () => number, o: BlockOpts): BlockField {
  const mask = S - 1;
  const s = S / 512;
  // 行：带随机高度，累计取整，整张高度刚好 S
  const rowTop = new Int32Array(o.rows + 1);
  {
    const w: number[] = [];
    let sum = 0;
    for (let r = 0; r < o.rows; r++) {
      const v = 1 + (rnd() - 0.5) * 2 * o.rowJitter;
      w.push(v);
      sum += v;
    }
    let acc = 0;
    for (let r = 0; r < o.rows; r++) {
      rowTop[r] = Math.round((acc / sum) * S);
      acc += w[r];
    }
    rowTop[o.rows] = S;
  }
  const rowOf = new Int16Array(S);
  for (let r = 0; r < o.rows; r++) for (let y = rowTop[r]; y < rowTop[r + 1]; y++) rowOf[y] = r;

  // 每行的块边界（行内坐标 0..S，按行偏移后铺满）
  const starts: Int32Array[] = [];
  const offs = new Int32Array(o.rows);
  const idBase = new Int32Array(o.rows + 1);
  const blockOf = new Uint16Array(o.rows * S);
  let total = 0;
  for (let r = 0; r < o.rows; r++) {
    const n = Math.max(1, o.perRow + (o.perRowVar ? ((rnd() * 3) | 0) - 1 : 0));
    const w: number[] = [];
    let sum = 0;
    for (let b = 0; b < n; b++) {
      const v = 1 + (rnd() - 0.5) * 2 * o.widthJitter;
      w.push(v);
      sum += v;
    }
    const st = new Int32Array(n + 1);
    let acc = 0;
    for (let b = 0; b < n; b++) {
      st[b] = Math.round((acc / sum) * S);
      acc += w[b];
    }
    st[n] = S;
    starts.push(st);
    offs[r] = o.offset === "random" ? Math.floor(rnd() * S) : o.offset === "half" ? (r & 1) * Math.round(S / n / 2) : 0;
    for (let b = 0; b < n; b++) for (let x = st[b]; x < st[b + 1]; x++) blockOf[r * S + x] = b;
    idBase[r] = total;
    total += n;
  }
  idBase[o.rows] = total;

  const wxF = noiseField(S, rnd, 6, 6, 3);
  const amp = o.warp * s * 2.6;
  const shy = (S / 3) | 0;
  const shx = (S / 5) | 0;
  const d = new Float32Array(S * S);
  const id = new Int32Array(S * S);
  const fu = new Float32Array(S * S);
  const fv = new Float32Array(S * S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = y * S + x;
      const ix = (x + ((wxF[i] - 0.5) * amp) | 0) & mask;
      const iy = (y + ((wxF[((y + shy) & mask) * S + ((x + shx) & mask)] - 0.5) * amp) | 0) & mask;
      const r = rowOf[iy];
      const xs = (ix - offs[r]) & mask;
      const b = blockOf[r * S + xs];
      const st = starts[r];
      const x0 = st[b];
      const x1 = st[b + 1];
      const top = rowTop[r];
      const bot = rowTop[r + 1];
      const dd = Math.min(xs - x0, x1 - 1 - xs, iy - top, bot - 1 - iy) + 0.5;
      d[i] = dd;
      id[i] = idBase[r] + b;
      fu[i] = (xs - x0 + 0.5) / (x1 - x0);
      fv[i] = (iy - top + 0.5) / (bot - top);
    }
  }
  return { d, id, fu, fv, total };
}

// ───────────────────────── 各材料 ─────────────────────────

function fillMasonry(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const bf = blockField(S, rnd, { rows: 6, rowJitter: 0.3, perRow: 3, perRowVar: true, widthJitter: 0.45, offset: "random", warp: 4.5 });
  const nLow = noiseField(S, rnd, 3, 3, 3);
  const nMid = noiseField(S, rnd, 10, 10, 3);
  const nFine = noiseField(S, rnd, S / 4, S / 4, 2);
  const nStain = noiseField(S, rnd, 4, 4, 3);
  const tone = new Float32Array(bf.total);
  const hb = new Float32Array(bf.total);
  const tint = new Float32Array(bf.total);
  const tilt = new Float32Array(bf.total * 2);
  for (let k = 0; k < bf.total; k++) {
    tone[k] = (0.78 + rnd() * 0.42) * (rnd() < 0.1 ? 0.8 : 1);
    hb[k] = 0.5 + rnd() * 0.3;
    tint[k] = (rnd() - 0.5) * 0.1;
    tilt[k * 2] = (rnd() - 0.5) * 0.16;
    tilt[k * 2 + 1] = (rnd() - 0.5) * 0.16;
  }
  const m = Math.max(2, 5 * s);
  for (let i = 0; i < S * S; i++) {
    const d = bf.d[i];
    const k = bf.id[i];
    const fu = bf.fu[i];
    const fv = bf.fv[i];
    const face = sm(m * 0.55, m * 0.55 + 8 * s, d);
    const mortar = 1 - sm(m * 0.45, m * 1.25, d);
    const dome = Math.sin(Math.PI * fu) * Math.sin(Math.PI * fv);
    const h = hb[k] * (0.82 + 0.26 * nLow[i]) + dome * 0.1 + (fu - 0.5) * tilt[k * 2] + (fv - 0.5) * tilt[k * 2 + 1] + (nMid[i] - 0.5) * 0.16 + (nFine[i] - 0.5) * 0.08;
    p.H[i] = lerp(0.04 + (nFine[i] - 0.5) * 0.05, h, face);
    let L = tone[k] * (0.88 + 0.28 * nMid[i]) * (0.9 + 0.2 * nStain[i]) * (0.84 + 0.16 * sm(m, m + 12 * s, d));
    L *= 0.94 + 0.12 * nFine[i];
    const mortarL = 1.04 * (0.82 + 0.34 * nFine[i]);
    L = lerp(L, mortarL, mortar);
    const t = tint[k] * (1 - mortar);
    p.R[i] = L * (1 + t + mortar * 0.03);
    p.G[i] = L * (1 + t * 0.3);
    p.B[i] = L * (1 - t * 0.9 - mortar * 0.07);
    p.F[i] = lerp(0.6 + (nMid[i] - 0.5) * 0.3, 0.95, mortar);
    p.A[i] = 1 - mortar * 0.35;
  }
}

function fillBrick(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const bf = blockField(S, rnd, { rows: 16, rowJitter: 0, perRow: 6, perRowVar: false, widthJitter: 0, offset: "half", warp: 0.8 });
  const nMid = noiseField(S, rnd, 8, 8, 3);
  const nFine = noiseField(S, rnd, S / 4, S / 4, 2);
  const nStain = noiseField(S, rnd, 5, 5, 3);
  const tone = new Float32Array(bf.total);
  const tintA = new Float32Array(bf.total);
  const hb = new Float32Array(bf.total);
  for (let k = 0; k < bf.total; k++) {
    tone[k] = (0.82 + rnd() * 0.3) * (rnd() < 0.08 ? 0.72 : 1) * (rnd() < 0.05 ? 1.12 : 1);
    tintA[k] = rnd() - 0.5;
    hb[k] = 0.76 + rnd() * 0.12;
  }
  const m = Math.max(2, 4 * s);
  for (let i = 0; i < S * S; i++) {
    const d = bf.d[i];
    const k = bf.id[i];
    const face = sm(m * 0.5, m + 2.6 * s, d);
    const mortar = 1 - sm(m * 0.4, m * 1.15, d);
    const grit = (nFine[i] - 0.5) * 0.07;
    p.H[i] = lerp(0.06 + grit * 0.4, hb[k] + grit + (nMid[i] - 0.5) * 0.06, face);
    let L = tone[k] * (0.9 + 0.2 * nMid[i]) * (0.92 + 0.16 * nFine[i]) * (0.94 + 0.12 * nStain[i]);
    L *= 0.9 + 0.1 * sm(m, m + 6 * s, d);
    const mortarL = 1.3 * (0.84 + 0.32 * nFine[i]);
    L = lerp(L, mortarL, mortar);
    const t = tintA[k] * (1 - mortar);
    p.R[i] = L * (1 + t * 0.16 + mortar * 0.04);
    p.G[i] = L * (1 - t * 0.04 + mortar * 0.14);
    p.B[i] = L * (1 - t * 0.3 + mortar * 0.2);
    p.F[i] = lerp(0.74 + (nFine[i] - 0.5) * 0.2, 0.96, mortar);
    p.A[i] = 1 - mortar * 0.4;
  }
}

function fillPaving(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const bf = blockField(S, rnd, { rows: 3, rowJitter: 0.04, perRow: 3, perRowVar: false, widthJitter: 0.05, offset: "random", warp: 1.6 });
  const nLow = noiseField(S, rnd, 3, 3, 3);
  const nMid = noiseField(S, rnd, 12, 12, 3);
  const nFine = noiseField(S, rnd, S / 4, S / 4, 2);
  const nWear = noiseField(S, rnd, 5, 5, 4);
  const tone = new Float32Array(bf.total);
  const tint = new Float32Array(bf.total);
  const level = new Float32Array(bf.total);
  const tilt = new Float32Array(bf.total * 2);
  for (let k = 0; k < bf.total; k++) {
    tone[k] = 0.86 + rnd() * 0.26;
    tint[k] = (rnd() - 0.5) * 0.08;
    level[k] = 0.62 + rnd() * 0.16;
    tilt[k * 2] = (rnd() - 0.5) * 0.1;
    tilt[k * 2 + 1] = (rnd() - 0.5) * 0.1;
  }
  const m = Math.max(2, 4.5 * s);
  for (let i = 0; i < S * S; i++) {
    const d = bf.d[i];
    const k = bf.id[i];
    const face = sm(m * 0.5, m + 4 * s, d);
    const joint = 1 - sm(m * 0.4, m * 1.2, d);
    const wear = nWear[i];
    const h = level[k] + (bf.fu[i] - 0.5) * tilt[k * 2] + (bf.fv[i] - 0.5) * tilt[k * 2 + 1] - wear * 0.12 + (nMid[i] - 0.5) * 0.08 + (nFine[i] - 0.5) * 0.05;
    p.H[i] = lerp(0.05 + (nFine[i] - 0.5) * 0.06, h, face);
    let L = tone[k] * (0.9 + 0.2 * nLow[i]) * (0.9 + 0.2 * nMid[i]) * (0.95 + 0.1 * nFine[i]);
    L *= 0.88 + 0.12 * sm(m, m + 8 * s, d);
    L = lerp(L, 0.78 * (0.8 + 0.4 * nFine[i]), joint);
    const t = tint[k] * (1 - joint);
    p.R[i] = L * (1 + t + joint * 0.04);
    p.G[i] = L * (1 + t * 0.2 + joint * 0.02);
    p.B[i] = L * (1 - t * 0.8 - joint * 0.06);
    p.F[i] = lerp(0.68 + (wear - 0.5) * 0.3, 0.96, joint);
    p.A[i] = 1 - joint * 0.4;
  }
}

function fillPlaster(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const mask = p.mask;
  const nBlot = noiseField(S, rnd, 3, 3, 5);
  const nMid = noiseField(S, rnd, 12, 12, 3);
  const nGrain = noiseField(S, rnd, S / 2, S / 2, 1);
  const nTrowel = noiseField(S, rnd, 5, 5, 3);
  const nFlake = noiseField(S, rnd, 6, 6, 4);
  const nFlakeDetail = noiseField(S, rnd, 24, 24, 3);
  // 裂纹：带分叉的折线（环绕写入）
  const crack = new Float32Array(S * S);
  const drawCrack = (x: number, y: number, ang: number, len: number, depth: number): void => {
    for (let t = 0; t < len; t++) {
      ang += (rnd() - 0.5) * 0.5;
      x += Math.cos(ang);
      y += Math.sin(ang);
      const ix = Math.round(x) & mask;
      const iy = Math.round(y) & mask;
      const a = 1 - t / len * 0.5;
      const i = iy * S + ix;
      if (crack[i] < a) crack[i] = a;
      const j = iy * S + ((ix + 1) & mask);
      const k = ((iy + 1) & mask) * S + ix;
      crack[j] = Math.max(crack[j], a * 0.35);
      crack[k] = Math.max(crack[k], a * 0.35);
      if (depth < 2 && rnd() < 0.0035) drawCrack(x, y, ang + (rnd() < 0.5 ? -1 : 1) * (0.5 + rnd() * 0.6), len * 0.45, depth + 1);
    }
  };
  const nCrack = 1;
  for (let c = 0; c < nCrack; c++) drawCrack(rnd() * S, rnd() * S, rnd() * Math.PI * 2, (110 + rnd() * 150) * s, 0);
  for (let i = 0; i < S * S; i++) {
    const flake = sm(0.8, 0.84, nFlake[i] + (nFlakeDetail[i] - 0.5) * 0.3);
    const flakeEdge = flake * (1 - sm(0.8, 1, flake));
    const grain = (nGrain[i] - 0.5) * 2 + (rnd() - 0.5) * 0.9;
    const c = crack[i];
    const h = 0.62 + (nTrowel[i] - 0.5) * 0.18 + grain * 0.03 - flake * 0.2 - c * 0.3 + flakeEdge * 0.04;
    p.H[i] = h;
    let L = (0.95 + 0.1 * nBlot[i]) * (0.96 + 0.08 * nMid[i]) * (1 + grain * 0.035);
    L = lerp(L, L * 0.94, flake);
    L *= 1 - c * 0.18;
    p.R[i] = L * (1 + flake * 0.01);
    p.G[i] = L * (1 - flake * 0.04);
    p.B[i] = L * (1 - flake * 0.12);
    p.F[i] = lerp(0.84 + (nMid[i] - 0.5) * 0.14, 0.98, flake);
    p.A[i] = 1 - c * 0.3 - flake * 0.1;
  }
}

function fillWood(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const mask = p.mask;
  const nPlank = 10;
  const rowTop = new Int32Array(nPlank + 1);
  {
    const w: number[] = [];
    let sum = 0;
    for (let r = 0; r < nPlank; r++) {
      const v = 0.88 + rnd() * 0.24;
      w.push(v);
      sum += v;
    }
    let acc = 0;
    for (let r = 0; r < nPlank; r++) {
      rowTop[r] = Math.round((acc / sum) * S);
      acc += w[r];
    }
    rowTop[nPlank] = S;
  }
  const rowOf = new Int16Array(S);
  for (let r = 0; r < nPlank; r++) for (let y = rowTop[r]; y < rowTop[r + 1]; y++) rowOf[y] = r;
  // 每块板 2 条木料：对接缝位置、色调、年轮频率
  const joint1 = new Int32Array(nPlank);
  const joint2 = new Int32Array(nPlank);
  const tone = new Float32Array(nPlank * 2);
  const tintA = new Float32Array(nPlank * 2);
  const ringN = new Float32Array(nPlank * 2);
  const ringPh = new Float32Array(nPlank * 2);
  for (let r = 0; r < nPlank; r++) {
    joint1[r] = Math.floor(rnd() * S);
    joint2[r] = (joint1[r] + Math.round(S * (0.38 + rnd() * 0.24))) & mask;
    for (let b = 0; b < 2; b++) {
      tone[r * 2 + b] = 0.8 + rnd() * 0.4;
      tintA[r * 2 + b] = rnd() - 0.5;
      ringN[r * 2 + b] = 2.5 + rnd() * 3.5;
      ringPh[r * 2 + b] = rnd() * 6.28;
    }
  }
  const grainLong = noiseField(S, rnd, 2, 32, 3);
  const grainWave = noiseField(S, rnd, 6, 6, 3);
  const pores = noiseField(S, rnd, 12, S / 2, 1);
  const nBlot = noiseField(S, rnd, 4, 4, 3);
  // 节疤：改变局部纹理采样的 y 偏移，并在中心画年轮
  const warpY = new Float32Array(S * S);
  const knots: { x: number; y: number; r: number }[] = [];
  for (let k = 0; k < 3; k++) knots.push({ x: rnd() * S, y: rnd() * S, r: (13 + rnd() * 9) * s });
  for (const kn of knots) {
    const ext = Math.ceil(kn.r * 2.6);
    for (let dy = -ext; dy <= ext; dy++) {
      for (let dx = -ext; dx <= ext; dx++) {
        const q = Math.sqrt((dx / 1.7) * (dx / 1.7) + dy * dy) / kn.r;
        if (q > 2.6) continue;
        const i = (Math.round(kn.y + dy) & mask) * S + (Math.round(kn.x + dx) & mask);
        warpY[i] += Math.sign(dy || 1) * 10 * s * Math.exp(-q * q * 0.9) * (q < 0.2 ? q / 0.2 : 1);
      }
    }
  }
  const knotL = new Float32Array(S * S).fill(1);
  const knotH = new Float32Array(S * S);
  for (const kn of knots) {
    const ext = Math.ceil(kn.r * 1.2);
    for (let dy = -ext; dy <= ext; dy++) {
      for (let dx = -ext; dx <= ext; dx++) {
        const q = Math.sqrt((dx / 1.7) * (dx / 1.7) + dy * dy) / kn.r;
        if (q >= 1.1) continue;
        const i = (Math.round(kn.y + dy) & mask) * S + (Math.round(kn.x + dx) & mask);
        const rings = 0.5 + 0.5 * Math.cos(q * 16);
        const core = 1 - sm(0.6, 1.1, q);
        knotL[i] *= 1 - core * (0.5 - 0.18 * rings);
        knotH[i] += core * (0.06 + 0.04 * rings) - sm(0.2, 0.5, q) * (1 - sm(0.5, 1.0, q)) * 0.03;
      }
    }
  }
  const TWO_PI = Math.PI * 2;
  for (let y = 0; y < S; y++) {
    const r = rowOf[y];
    const top = rowTop[r];
    const rowH = rowTop[r + 1] - top;
    const yl = y - top;
    const dEdge = Math.min(yl, rowH - 1 - yl) + 0.5;
    const seam = 1 - sm(0.3 * s, 2.8 * s, dEdge);
    for (let x = 0; x < S; x++) {
      const i = y * S + x;
      const sy = (y + (warpY[i] | 0)) & mask;
      const si = sy * S + x;
      // 对接缝
      const dj1 = Math.abs(x - joint1[r]);
      const dj2 = Math.abs(x - joint2[r]);
      const dj = Math.min(dj1, S - dj1, dj2, S - dj2) + 0.5;
      const jointG = 1 - sm(0.3 * s, 2.2 * s, dj);
      const board = ((x - joint1[r]) & mask) < ((joint2[r] - joint1[r]) & mask) ? 0 : 1;
      const bi = r * 2 + board;
      const g = grainLong[si];
      const wave = grainWave[si];
      const ring = 0.5 + 0.5 * Math.sin((((yl + warpY[i]) / rowH) * ringN[bi] + wave * 1.7 + g * 1.1) * TWO_PI + ringPh[bi]);
      const pore = sm(0.56, 0.78, pores[si]);
      let L = tone[bi] * (0.78 + 0.3 * g + 0.2 * ring) * (0.92 + 0.16 * nBlot[i]) * knotL[i];
      L *= 1 - pore * 0.22;
      const groove = Math.max(seam, jointG);
      L *= 1 - groove * 0.55;
      const t = tintA[bi];
      p.R[i] = L * (1 + t * 0.12);
      p.G[i] = L * (1 + t * 0.03);
      p.B[i] = L * (1 - t * 0.16);
      p.H[i] = (0.72 + ring * 0.05 - pore * 0.05 + (g - 0.5) * 0.04 + knotH[i]) * (1 - groove * 0.85);
      p.F[i] = 0.7 + (g - 0.5) * 0.16 + pore * 0.16 + groove * 0.2;
      p.A[i] = 1 - groove * 0.5 - pore * 0.12;
    }
  }
}

function fillTiles(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const mask = p.mask;
  const nc = 6;
  const nr = 5;
  const wxF = noiseField(S, rnd, 4, 4, 2);
  const nMid = noiseField(S, rnd, 10, 10, 3);
  const nFine = noiseField(S, rnd, S / 4, S / 4, 2);
  const nSoot = noiseField(S, rnd, 4, 4, 4);
  const tone = new Float32Array(nc * nr);
  const tintA = new Float32Array(nc * nr);
  const tiltV = new Float32Array(nc * nr);
  const gloss = new Float32Array(nc * nr);
  for (let k = 0; k < tone.length; k++) {
    tone[k] = 0.8 + rnd() * 0.36;
    tintA[k] = rnd() - 0.5;
    tiltV[k] = (rnd() - 0.5) * 0.14;
    gloss[k] = rnd();
  }
  const amp = 2.4 * s * 2.6;
  const PI = Math.PI;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = y * S + x;
      const px = x + (wxF[i] - 0.5) * amp;
      const py = y + (wxF[((y + 83) & mask) * S + ((x + 171) & mask)] - 0.5) * amp;
      const vv = (py / S) * nr;
      let row = Math.floor(vv);
      const t = vv - row;
      row = ((row % nr) + nr) % nr;
      const uc = (px / S) * nc + 0.5 * (row & 1);
      const colF = Math.floor(uc);
      const sx = uc - colF;
      const col = ((colF % nc) + nc) % nc;
      const id = row * nc + col;
      // 弧形截面：边缘最低、中央最高；沿坡向抬升，下缘形成搭接台阶
      const prof = Math.sqrt(Math.sin(PI * sx));
      const rise = 0.5 + 0.5 * t * (0.4 + 0.6 * t);
      const lip = 1 - sm(0.9, 1, t) * 0.12;
      const h = prof * rise * lip * 0.9 + tiltV[id] * (t - 0.5) + (nFine[i] - 0.5) * 0.04 + (nMid[i] - 0.5) * 0.05;
      p.H[i] = h;
      const lap = sm(0, 0.22, t);
      const valley = 1 - sm(0.02, 0.18, Math.min(sx, 1 - sx));
      let L = tone[id] * (0.88 + 0.12 * lap) * (0.92 + 0.16 * nMid[i]) * (0.94 + 0.12 * nFine[i]) * (1 - 0.18 * sm(0.55, 0.8, nSoot[i]));
      L *= 1 + 0.12 * sm(0.93, 1, t);
      L *= 1 - valley * 0.22;
      const ta = tintA[id];
      p.R[i] = L * (1 + ta * 0.1);
      p.G[i] = L * (1 - ta * 0.01);
      p.B[i] = L * (1 - ta * 0.14);
      p.F[i] = 0.62 + gloss[id] * 0.16 + (nFine[i] - 0.5) * 0.1 + valley * 0.2;
      p.A[i] = (0.6 + 0.4 * lap) * (1 - valley * 0.25);
    }
  }
}

function fillMetal(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const mask = p.mask;
  const brushA = noiseField(S, rnd, 2, S / 8, 3);
  const brushB = noiseField(S, rnd, 1, S / 4, 2);
  const nWave = noiseField(S, rnd, 3, 3, 3);
  const nOx = noiseField(S, rnd, 4, 4, 5);
  const nOxDetail = noiseField(S, rnd, 24, 24, 3);
  const nFine = noiseField(S, rnd, S / 2, S / 2, 1);
  const lightScratch = new Float32Array(S * S);
  const darkScratch = new Float32Array(S * S);
  const nScratch = Math.round(70 * s * Math.max(1, s));
  for (let c = 0; c < nScratch; c++) {
    let x = rnd() * S;
    let y = rnd() * S;
    const ang = (rnd() < 0.7 ? (rnd() - 0.5) * 0.5 : rnd() * Math.PI * 2);
    const len = (14 + rnd() * rnd() * 130) * s;
    const dark = rnd() < 0.15;
    const a = 0.3 + rnd() * 0.5;
    const cs = Math.cos(ang);
    const sn = Math.sin(ang);
    const target = dark ? darkScratch : lightScratch;
    for (let t = 0; t < len; t += 0.6) {
      x += cs * 0.6;
      y += sn * 0.6;
      const i = (Math.round(y) & mask) * S + (Math.round(x) & mask);
      const fade = 1 - Math.abs(t / len - 0.5) * 1.1;
      if (target[i] < a * fade) target[i] = a * fade;
    }
  }
  for (let i = 0; i < S * S; i++) {
    const br = (brushA[i] - 0.5) * 1.4 + (brushB[i] - 0.5) * 0.8;
    const ox = sm(0.56, 0.8, nOx[i] + (nOxDetail[i] - 0.5) * 0.28) * (0.6 + 0.4 * nOxDetail[i]);
    const ls = lightScratch[i];
    const ds = darkScratch[i];
    let L = (1 + br * 0.2) * (0.94 + 0.12 * nWave[i]) * (1 + (nFine[i] - 0.5) * 0.06);
    L *= 1 + ls * 0.38 - ds * 0.3;
    L = lerp(L, L * 0.8, ox);
    p.R[i] = L * (1 + ox * 0.07);
    p.G[i] = L * (1 - ox * 0.0);
    p.B[i] = L * (1 - ox * 0.14);
    p.H[i] = 0.6 + br * 0.03 + (nWave[i] - 0.5) * 0.12 - ls * 0.12 - ds * 0.18 + ox * 0.04;
    p.F[i] = 0.5 + br * 0.14 + ls * 0.18 + ox * 0.42 + (nFine[i] - 0.5) * 0.06;
    p.A[i] = 1 - ox * 0.12 - ds * 0.1;
  }
}

function fillConcrete(p: Plane, rnd: () => number): void {
  const S = p.S;
  const s = p.s;
  const nBlot = noiseField(S, rnd, 3, 3, 4);
  const nMid = noiseField(S, rnd, 14, 14, 3);
  const nGrain = noiseField(S, rnd, S / 2, S / 2, 1);
  const nStain = noiseField(S, rnd, 10, 2, 3);
  const pit = new Float32Array(S * S);
  const pitL = new Float32Array(S * S);
  const nPits = Math.round(260 * s * s);
  for (let c = 0; c < nPits; c++) {
    const r = (0.9 + rnd() * rnd() * 3.6) * s;
    const depth = 0.4 + rnd() * 0.6;
    stampDisc(S, rnd() * S, rnd() * S, Math.max(1.2, r), (i, k) => {
      const d = depth * Math.min(1, k * 1.8);
      if (pit[i] < d) pit[i] = d;
      pitL[i] = Math.max(pitL[i], d);
    });
  }
  // 模板缝（1 m 见方的板）与对拉螺栓孔
  const half = S / 2;
  const holes = new Float32Array(S * S);
  for (let j = 0; j < 2; j++) {
    for (let i2 = 0; i2 < 2; i2++) {
      for (const [ox, oy] of [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]]) {
        stampDisc(S, i2 * half + ox * half, j * half + oy * half, 5 * s, (idx, k) => {
          const d = Math.min(1, k * 1.6);
          if (holes[idx] < d) holes[idx] = d;
        });
      }
    }
  }
  const panelTone = [1.0, 0.96, 1.04, 0.98];
  for (let y = 0; y < S; y++) {
    const dy = Math.min(y % half, half - (y % half));
    for (let x = 0; x < S; x++) {
      const i = y * S + x;
      const dx = Math.min(x % half, half - (x % half));
      const seam = 1 - sm(0.2 * s, 2.4 * s, Math.min(dx, dy) + 0.5);
      const panel = panelTone[(x >= half ? 1 : 0) + (y >= half ? 2 : 0)];
      const gr = (nGrain[i] - 0.5) * 2;
      const hp = pit[i];
      const ho = holes[i];
      const h = 0.68 + (nMid[i] - 0.5) * 0.1 + gr * 0.035 - hp * 0.5 - seam * 0.45 - ho * 0.55;
      p.H[i] = h;
      let L = panel * (0.9 + 0.2 * nBlot[i]) * (0.94 + 0.12 * nMid[i]) * (0.86 + 0.28 * nStain[i]) * (1 + gr * 0.05);
      L *= 1 - hp * 0.42 - seam * 0.2 - ho * 0.5;
      p.R[i] = L * 1.01;
      p.G[i] = L;
      p.B[i] = L * 0.985;
      p.F[i] = 0.8 + (nMid[i] - 0.5) * 0.18 + hp * 0.12;
      p.A[i] = 1 - hp * 0.5 - seam * 0.25 - ho * 0.5;
    }
  }
}

// ───────────────────────── 输出 ─────────────────────────

interface FinalizeOpts {
  /** 法线强度（Sobel/8 的倍数，高度范围 0..1） */
  normal: number;
  /** 空腔 AO 强度 */
  ao: number;
  /** 空腔 AO 的模糊半径（512 下的像素） */
  aoRadius: number;
}

const FINALIZE: Record<SurfaceKind, FinalizeOpts> = {
  masonry: { normal: 3.2, ao: 2.4, aoRadius: 9 },
  brick: { normal: 3.0, ao: 2.2, aoRadius: 6 },
  plaster: { normal: 2.0, ao: 1.4, aoRadius: 5 },
  paving: { normal: 3.0, ao: 2.2, aoRadius: 8 },
  wood: { normal: 2.2, ao: 1.8, aoRadius: 4 },
  tiles: { normal: 4.6, ao: 2.4, aoRadius: 9 },
  metal: { normal: 1.6, ao: 1.2, aoRadius: 3 },
  concrete: { normal: 2.2, ao: 1.8, aoRadius: 5 },
};

/** 环绕的盒式模糊（水平 + 垂直两遍） */
function boxBlur(src: Float32Array, S: number, r: number): Float32Array {
  const tmp = new Float32Array(S * S);
  const out = new Float32Array(S * S);
  const mask = S - 1;
  const w = 2 * r + 1;
  const inv = 1 / w;
  for (let y = 0; y < S; y++) {
    const row = y * S;
    let acc = 0;
    for (let k = -r; k <= r; k++) acc += src[row + (k & mask)];
    for (let x = 0; x < S; x++) {
      tmp[row + x] = acc * inv;
      acc += src[row + ((x + r + 1) & mask)] - src[row + ((x - r) & mask)];
    }
  }
  for (let x = 0; x < S; x++) {
    let acc = 0;
    for (let k = -r; k <= r; k++) acc += tmp[(k & mask) * S + x];
    for (let y = 0; y < S; y++) {
      out[y * S + x] = acc * inv;
      acc += tmp[((y + r + 1) & mask) * S + x] - tmp[((y - r) & mask) * S + x];
    }
  }
  return out;
}

function finalize(p: Plane, kind: SurfaceKind): SurfaceTexture {
  const S = p.S;
  const n = S * S;
  const o = FINALIZE[kind];
  const mask = p.mask;
  const q = (v: number): number => (v <= 0 ? 0 : v >= 1 ? 255 : (v * 255 + 0.5) | 0);

  // 平均亮度归一化到 0.65
  let lumSum = 0;
  for (let i = 0; i < n; i++) lumSum += p.R[i] * 0.3 + p.G[i] * 0.59 + p.B[i] * 0.11;
  const k = SURFACE_ALBEDO_MEAN / (lumSum / n);

  // 空腔 AO：高度图相对其模糊的凹陷
  const blur = boxBlur(p.H, S, Math.max(2, Math.round(o.aoRadius * p.s)));
  const ao = new Float32Array(n);
  let aoSum = 0;
  for (let i = 0; i < n; i++) {
    const cav = blur[i] - p.H[i];
    const a = clamp01(1 - Math.max(0, cav) * o.ao * 3.2 + Math.max(0, -cav) * 0.25) * p.A[i];
    ao[i] = a < 0.35 ? 0.35 : a;
    aoSum += ao[i];
  }
  // AO 平均值拉到 SURFACE_AO_MEAN：着色器会按它归一化，整体亮度不变，只留下空腔对比
  const aoMean = aoSum / n;
  const aoGamma = Math.log(SURFACE_AO_MEAN) / Math.log(Math.min(0.99, Math.max(0.3, aoMean)));
  const aoLut = new Uint8Array(1025);
  for (let i = 0; i <= 1024; i++) aoLut[i] = q(Math.pow(i / 1024, aoGamma));

  const albedo = new Uint8Array(n * 4);
  const normal = new Uint8Array(n * 4);
  const height = new Uint8Array(n);
  const H = p.H;
  const str = o.normal;
  for (let y = 0; y < S; y++) {
    const ym = ((y - 1) & mask) * S;
    const y0 = y * S;
    const yp = ((y + 1) & mask) * S;
    for (let x = 0; x < S; x++) {
      const xm = (x - 1) & mask;
      const xp = (x + 1) & mask;
      const gx = H[ym + xp] + 2 * H[y0 + xp] + H[yp + xp] - H[ym + xm] - 2 * H[y0 + xm] - H[yp + xm];
      const gy = H[yp + xm] + 2 * H[yp + x] + H[yp + xp] - H[ym + xm] - 2 * H[ym + x] - H[ym + xp];
      const nx = (-gx * str) / 8;
      const ny = (-gy * str) / 8;
      const inv = 1 / Math.sqrt(nx * nx + ny * ny + 1);
      const j = y0 + x;
      const i4 = j * 4;
      albedo[i4] = q(p.R[j] * k);
      albedo[i4 + 1] = q(p.G[j] * k);
      albedo[i4 + 2] = q(p.B[j] * k);
      albedo[i4 + 3] = aoLut[(ao[j] * 1024 + 0.5) | 0];
      normal[i4] = q(nx * inv * 0.5 + 0.5);
      normal[i4 + 1] = q(ny * inv * 0.5 + 0.5);
      normal[i4 + 2] = q(inv * 0.5 + 0.5);
      normal[i4 + 3] = q(p.F[j]);
      height[j] = q(H[j]);
    }
  }
  return { size: S, albedo, normal, height };
}

const FILL: Record<SurfaceKind, (p: Plane, rnd: () => number) => void> = {
  masonry: fillMasonry,
  brick: fillBrick,
  plaster: fillPlaster,
  paving: fillPaving,
  wood: fillWood,
  tiles: fillTiles,
  metal: fillMetal,
  concrete: fillConcrete,
};

/** 生成一种表面的可无缝平铺纹理（size 必须是 2 的幂且 ≥ 64） */
export function generateSurfaceTexture(kind: SurfaceKind, size: number, seed: number): SurfaceTexture {
  if (size < 64 || (size & (size - 1)) !== 0) throw new Error("size must be a power of two >= 64");
  const rnd = mulberry(seed * 7919 + surfaceLayer(kind) * 104729 + 1);
  const plane = newPlane(size);
  FILL[kind](plane, rnd);
  return finalize(plane, kind);
}
