/**
 * 植被程序纹理（纯像素逻辑，不依赖 three，可单测）。
 *
 * - 叶片图集：2×2 格子（阔叶 / 深色阔叶 / 针叶枝片 / 灌木），alpha 为叶片轮廓，另附由高度图求得的法线。
 * - 树皮：沿 u、v 都可无缝平铺（周期噪声），阔叶为纵向裂纹，针叶为鳞片状剥落。
 *
 * 约定：数据行 0 对应 v = 0，所以"向上"（叶簇从基部伸向枝梢）即行号增大的方向，
 * 卡片几何里 v 越大越靠近枝梢。
 */

export interface RGBA8Image {
  size: number;
  data: Uint8Array; // RGBA8, size*size*4
}

export const FOLIAGE_ATLAS_CELLS = { broadleaf: 0, broadleafDark: 1, conifer: 2, shrub: 3 } as const;

/** 图集里某格的 UV 矩形 [u0, v0, u1, v1] */
export function atlasRect(cell: number): [number, number, number, number] {
  const col = cell % 2;
  const row = Math.floor(cell / 2);
  return [col * 0.5, row * 0.5, col * 0.5 + 0.5, row * 0.5 + 0.5];
}

// ───────────────────────── 随机 / 噪声 ─────────────────────────

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ihash(x: number, y: number, s: number): number {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function smooth01(t: number): number {
  return t * t * (3 - 2 * t);
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** 非周期值噪声 0..1 */
function vnoise(x: number, y: number, s: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = smooth01(x - xi);
  const fy = smooth01(y - yi);
  const a = ihash(xi, yi, s);
  const b = ihash(xi + 1, yi, s);
  const c = ihash(xi, yi + 1, s);
  const d = ihash(xi + 1, yi + 1, s);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

function wrapInt(i: number, p: number): number {
  return ((i % p) + p) % p;
}

const latticeCache = new Map<number, Float32Array>();

/** 周期值噪声：x 方向周期 px、y 方向周期 py（格点数），返回 0..1（格点值查表缓存） */
function pnoise(x: number, y: number, px: number, py: number, s: number): number {
  const key = (px * 1024 + py) * 8192 + (s & 8191);
  let T = latticeCache.get(key);
  if (!T) {
    T = new Float32Array(px * py);
    for (let j = 0; j < py; j++) for (let i = 0; i < px; i++) T[j * px + i] = ihash(i, j, s);
    latticeCache.set(key, T);
  }
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = smooth01(x - xi);
  const fy = smooth01(y - yi);
  const x0 = wrapInt(xi, px);
  const x1 = x0 + 1 === px ? 0 : x0 + 1;
  const y0 = wrapInt(yi, py) * px;
  const y1 = (y0 + px) % (px * py);
  const a = T[y0 + x0];
  const b = T[y0 + x1];
  const c = T[y1 + x0];
  const d = T[y1 + x1];
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

// ───────────────────────── 颜色 ─────────────────────────

let HR = 0;
let HG = 0;
let HB = 0;
/** HSV → RGB（结果写入 HR/HG/HB，避免分配） */
function hsv(h: number, s: number, v: number): void {
  h = h - Math.floor(h);
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: HR = v; HG = t; HB = p; break;
    case 1: HR = q; HG = v; HB = p; break;
    case 2: HR = p; HG = v; HB = t; break;
    case 3: HR = p; HG = q; HB = v; break;
    case 4: HR = t; HG = p; HB = v; break;
    default: HR = v; HG = p; HB = q; break;
  }
}

// ───────────────────────── 画布 ─────────────────────────

interface Buf {
  size: number;
  r: Float32Array;
  g: Float32Array;
  b: Float32Array;
  a: Float32Array;
  h: Float32Array;
}

function makeBuf(size: number): Buf {
  const n = size * size;
  return { size, r: new Float32Array(n), g: new Float32Array(n), b: new Float32Array(n), a: new Float32Array(n), h: new Float32Array(n).fill(0.5) };
}

/** over 合成（非预乘 RGB） */
function blend(B: Buf, i: number, r: number, g: number, b: number, cov: number, h: number): void {
  const ad = B.a[i];
  if (ad <= 0) {
    B.r[i] = r;
    B.g[i] = g;
    B.b[i] = b;
    B.a[i] = cov;
    B.h[i] = h;
    return;
  }
  const ao = cov + ad * (1 - cov);
  const wn = cov / ao;
  const wd = 1 - wn;
  B.r[i] = B.r[i] * wd + r * wn;
  B.g[i] = B.g[i] * wd + g * wn;
  B.b[i] = B.b[i] * wd + b * wn;
  B.a[i] = ao;
  B.h[i] = B.h[i] * wd + h * wn;
}

/** 一个格子的绘制上下文：格子原点 + 尺寸 + 安全边距 */
interface Cell {
  B: Buf;
  ox: number;
  oy: number;
  S: number;
  m: number; // 边距（像素）：边距内永远保持 alpha = 0
  seed: number;
}

function paintCapsule(
  C: Cell,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  r0: number,
  r1: number,
  hueA: number,
  satA: number,
  valA: number,
  hueB: number,
  satB: number,
  valB: number,
  rnd: number
): void {
  const { B, ox, oy, S, m } = C;
  const rmax = Math.max(r0, r1) + 1;
  const minx = Math.max(m, Math.floor(Math.min(x0, x1) - rmax));
  const maxx = Math.min(S - m - 1, Math.ceil(Math.max(x0, x1) + rmax));
  const miny = Math.max(m, Math.floor(Math.min(y0, y1) - rmax));
  const maxy = Math.min(S - m - 1, Math.ceil(Math.max(y0, y1) + rmax));
  const abx = x1 - x0;
  const aby = y1 - y0;
  const ab2 = abx * abx + aby * aby || 1e-6;
  for (let py = miny; py <= maxy; py++) {
    const row = (oy + py) * B.size + ox;
    for (let px = minx; px <= maxx; px++) {
      const dx = px + 0.5 - x0;
      const dy = py + 0.5 - y0;
      let t = (dx * abx + dy * aby) / ab2;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const ex = dx - abx * t;
      const ey = dy - aby * t;
      const rr = r0 + (r1 - r0) * t;
      const d2 = ex * ex + ey * ey;
      const lim = rr + 1;
      if (d2 > lim * lim) continue;
      const d = Math.sqrt(d2) - rr;
      const cov = d <= -0.5 ? 1 : d >= 0.5 ? 0 : 0.5 - d;
      if (cov <= 0.003) continue;
      const k = 1 - Math.min(1, Math.abs(d + rr * 0.5) / (rr + 0.5)) * 0.35; // 横向明暗：中间亮、边缘暗
      hsv(hueA + (hueB - hueA) * t, satA + (satB - satA) * t, (valA + (valB - valA) * t) * k * (0.92 + 0.16 * rnd));
      blend(B, row + px, HR, HG, HB, cov, 0.62 - Math.min(1, Math.abs(d) / (rr + 0.5)) * 0.2);
    }
  }
}

// ───────────────────────── 阔叶 / 灌木叶片 ─────────────────────────

interface LeafSpec {
  x: number;
  y: number;
  ang: number;
  len: number;
  wid: number;
  hue: number;
  sat: number;
  val: number;
  serr: number;
  shapeExp: number;
  back: boolean;
  fold: number;
  veinGap: number;
  seed: number;
}

function paintLeaf(C: Cell, L: LeafSpec): void {
  const { B, ox, oy, S, m } = C;
  const ca = Math.cos(L.ang);
  const sa = Math.sin(L.ang);
  const px0 = L.x;
  const py0 = L.y;
  // 外接盒：基点、叶尖、两侧最宽点
  const tx = px0 + ca * L.len;
  const ty = py0 + sa * L.len;
  const r = L.wid + 2;
  const minx = Math.max(m, Math.floor(Math.min(px0, tx) - r));
  const maxx = Math.min(S - m - 1, Math.ceil(Math.max(px0, tx) + r));
  const miny = Math.max(m, Math.floor(Math.min(py0, ty) - r));
  const maxy = Math.min(S - m - 1, Math.ceil(Math.max(py0, ty) + r));
  const teeth = Math.max(5, Math.round(L.len / 11));
  const invLen = 1 / L.len;
  const midW = 0.5 + L.len * 0.0035;
  for (let py = miny; py <= maxy; py++) {
    const row = (oy + py) * B.size + ox;
    for (let px = minx; px <= maxx; px++) {
      const dx = px + 0.5 - px0;
      const dy = py + 0.5 - py0;
      const a = dx * ca + dy * sa;
      if (a < 0 || a > L.len) continue;
      const t = a * invLen;
      const b = -dx * sa + dy * ca;
      const ab = b < 0 ? -b : b;
      let hw = L.wid * Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(t, L.shapeExp))), 0.78);
      hw *= 1 + L.serr * (Math.abs(Math.sin(t * teeth * Math.PI)) - 0.5);
      if (hw < 0.4) continue;
      const cov0 = hw - ab + 0.5;
      if (cov0 <= 0.003) continue;
      const cov = cov0 >= 1 ? 1 : cov0;
      const u = ab / hw; // 0 主脉 → 1 叶缘
      const n1 = vnoise(px * 0.045, py * 0.045, L.seed);
      const n2 = vnoise(px * 0.19, py * 0.19, L.seed + 5);
      let val = L.val * (0.8 + 0.3 * t) * (0.86 + 0.26 * n1) * (0.94 + 0.1 * n2);
      val *= 1 - 0.24 * smoothstep(0.76, 1, u);
      val *= 1 + 0.12 * L.fold * (b / hw);
      let sat = L.sat * (1 - 0.18 * t);
      const hue = L.hue - 0.028 * t + 0.03 * (n1 - 0.5);
      // 叶脉：主脉 + 斜向侧脉
      const mid = smoothstep(midW + 0.9, midW * 0.4, ab) * (1 - 0.5 * t);
      const ph = (a - ab * 0.82) / L.veinGap;
      const fr = ph - Math.floor(ph);
      const dist = (fr < 0.5 ? fr : 1 - fr) * L.veinGap * 0.8;
      const line = smoothstep(1.3, 0.25, dist) * Math.pow(Math.max(0, 1 - u), 0.7) * smoothstep(0.06, 0.2, t) * smoothstep(1, 0.8, t);
      let vein = Math.max(mid, line * 0.85);
      if (L.back) {
        val *= 1.16;
        sat *= 0.62;
        vein *= 1.35;
      }
      val *= 1 + 0.3 * vein;
      sat *= 1 - 0.38 * vein;
      hsv(hue, sat, Math.min(1, val));
      const h = 0.55 + 0.2 * (1 - u * u) * (L.back ? 0.6 : 1) - vein * (L.back ? -0.1 : 0.16);
      blend(B, row + px, HR, HG, HB, cov, h);
    }
  }
}

interface Pt {
  x: number;
  y: number;
}

interface LeafPlan {
  leaf: Omit<LeafSpec, "x" | "y" | "ang"> & { x: number; y: number; ang: number; petiole: number };
}

/** 把一组"单位坐标"图元缩放平移到格子安全区内的变换 */
interface Fit {
  scale: number;
  ox: number;
  oy: number;
}

function fitTo(S: number, m: number, minX: number, minY: number, maxX: number, maxY: number, maxScale: number): Fit {
  const pad = m + Math.max(2, S * 0.012);
  const avail = S - 2 * pad;
  const w = Math.max(1e-6, maxX - minX);
  const h = Math.max(1e-6, maxY - minY);
  const scale = Math.min(avail / w, avail / h, maxScale);
  return { scale, ox: S / 2 - ((minX + maxX) / 2) * scale, oy: S / 2 - ((minY + maxY) / 2) * scale };
}

interface ClusterOpts {
  dark: boolean;
  round: boolean; // 灌木：更圆更密
  seed: number;
}

/** 阔叶 / 灌木叶簇：一根小枝（或多根小枝放射）上着生叶片 */
function paintBroadleafCluster(C: Cell, o: ClusterOpts): void {
  const rnd = mulberry32(C.seed);
  const S = C.S;
  const plans: LeafPlan[] = [];
  const twigs: Array<{ pts: Pt[]; r0: number }> = [];

  const hueBase = o.dark ? 0.285 + rnd() * 0.03 : 0.235 + rnd() * 0.04;
  const addLeaf = (base: Pt, ang: number, len: number, widRatio: number, petiole: number): void => {
    // 色相：绿 → 黄绿随机，深色格更蓝更暗
    const hue = hueBase + (rnd() - 0.5) * (o.dark ? 0.04 : 0.09) + (rnd() > 0.88 && !o.dark ? -0.04 : 0);
    const sat = (o.dark ? 0.5 : 0.42) + rnd() * 0.12;
    const val = (o.dark ? 0.27 : o.round ? 0.5 : 0.46) + rnd() * 0.14;
    plans.push({
      leaf: {
        x: base.x,
        y: base.y,
        ang,
        len,
        wid: len * widRatio,
        hue,
        sat,
        val,
        serr: o.round ? 0.04 : 0.08,
        shapeExp: o.round ? 0.8 + rnd() * 0.2 : 0.62 + rnd() * 0.25,
        back: rnd() > 0.74,
        fold: rnd() * 2 - 1,
        veinGap: Math.max(6, len * (o.round ? 0.2 : 0.16)),
        seed: Math.floor(rnd() * 99999),
        petiole,
      },
    });
  };

  if (!o.round) {
    const n = 8 + Math.floor(rnd() * 7);
    const bend = (rnd() - 0.5) * 0.35;
    const pts: Pt[] = [];
    for (let i = 0; i <= 12; i++) {
      const s = i / 12;
      pts.push({ x: bend * s * s, y: s });
    }
    twigs.push({ pts, r0: 0.014 });
    const at = (s: number): { p: Pt; dir: number } => ({ p: { x: bend * s * s, y: s }, dir: Math.atan2(1, 2 * bend * s) });
    for (let i = 0; i < n; i++) {
      const s = 0.2 + 0.72 * (i / Math.max(1, n - 1)) + (rnd() - 0.5) * 0.03;
      const { p, dir } = at(s);
      const side = i % 2 === 0 ? 1 : -1;
      const off = 0.75 + rnd() * 0.5 + (1 - s) * 0.25;
      const len = (0.4 - 0.1 * s) * (0.8 + rnd() * 0.34);
      addLeaf(p, dir + side * off, len, 0.3 + rnd() * 0.12, 0.03);
    }
    const tip = at(1);
    addLeaf(tip.p, tip.dir + (rnd() - 0.5) * 0.2, 0.42 * (0.9 + rnd() * 0.2), 0.34, 0.0);
  } else {
    const twigN = 5 + Math.floor(rnd() * 2);
    for (let k = 0; k < twigN; k++) {
      const ang = Math.PI / 2 + (k - (twigN - 1) / 2) * 0.5 + (rnd() - 0.5) * 0.15;
      const length = 0.55 + rnd() * 0.25;
      const curve = (rnd() - 0.5) * 0.5;
      const pts: Pt[] = [];
      const dirAt = (s: number): number => ang + curve * s;
      let x = 0;
      let y = 0;
      for (let i = 0; i <= 8; i++) {
        pts.push({ x, y });
        const dir = dirAt(i / 8);
        x += Math.cos(dir) * (length / 8);
        y += Math.sin(dir) * (length / 8);
      }
      twigs.push({ pts, r0: 0.01 });
      const leafN = 3 + Math.floor(rnd() * 3);
      for (let i = 0; i < leafN; i++) {
        const s = 0.3 + 0.7 * (i / leafN) + rnd() * 0.05;
        const idx = Math.min(8, Math.floor(s * 8));
        const p = pts[idx];
        const side = i % 2 === 0 ? 1 : -1;
        addLeaf(p, dirAt(s) + side * (0.7 + rnd() * 0.5), (0.2 + rnd() * 0.12) * (1.1 - 0.3 * s), 0.55 + rnd() * 0.12, 0.012);
      }
      const end = pts[8];
      addLeaf(end, dirAt(1) + (rnd() - 0.5) * 0.4, 0.26 + rnd() * 0.08, 0.6, 0.0);
    }
  }

  // 包围盒（单位坐标）：叶基、叶尖、叶中两侧
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const grow = (x: number, y: number): void => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };
  for (const { leaf } of plans) {
    const ca = Math.cos(leaf.ang);
    const sa = Math.sin(leaf.ang);
    grow(leaf.x, leaf.y);
    grow(leaf.x + ca * leaf.len, leaf.y + sa * leaf.len);
    for (const t of [0.3, 0.45]) {
      for (const sg of [-1, 1]) grow(leaf.x + ca * leaf.len * t - sa * leaf.wid * sg, leaf.y + sa * leaf.len * t + ca * leaf.wid * sg);
    }
  }
  for (const tw of twigs) for (const p of tw.pts) grow(p.x, p.y);
  grow(0, -0.04);
  const fit = fitTo(S, C.m, minX, minY, maxX, maxY, S * 0.97);

  // 小枝（先画，叶片盖在上面）
  const tw = (p: Pt): Pt => ({ x: p.x * fit.scale + fit.ox, y: p.y * fit.scale + fit.oy });
  for (const t of twigs) {
    for (let i = 0; i < t.pts.length - 1; i++) {
      const a = tw(t.pts[i]);
      const b = tw(t.pts[i + 1]);
      const s = i / (t.pts.length - 1);
      const r0 = Math.max(1.1, t.r0 * fit.scale * (1 - s * 0.55));
      const r1 = Math.max(0.8, t.r0 * fit.scale * (1 - (s + 1 / (t.pts.length - 1)) * 0.55));
      paintCapsule(C, a.x, a.y, b.x, b.y, r0, r1, 0.085, 0.45, 0.28, 0.1, 0.4, 0.36, rnd());
    }
  }
  // 叶片：随机顺序叠放；先画叶柄
  const order = plans.map((_, i) => i).sort(() => rnd() - 0.5);
  for (const i of order) {
    const L = plans[i].leaf;
    const base = tw({ x: L.x, y: L.y });
    const len = L.len * fit.scale;
    const spec: LeafSpec = { ...L, x: base.x, y: base.y, len, wid: L.wid * fit.scale };
    if (L.petiole > 0) {
      const pl = L.petiole * fit.scale;
      paintCapsule(C, base.x, base.y, base.x + Math.cos(L.ang) * pl, base.y + Math.sin(L.ang) * pl, 1.1, 0.8, 0.11, 0.42, 0.3, 0.14, 0.4, 0.4, rnd());
      spec.x += Math.cos(L.ang) * pl * 0.9;
      spec.y += Math.sin(L.ang) * pl * 0.9;
    }
    paintLeaf(C, spec);
  }
}

// ───────────────────────── 针叶枝片 ─────────────────────────

function paintNeedle(C: Cell, x: number, y: number, ang: number, len: number, rad: number, hue: number, sat: number, val: number, r: number): void {
  const x1 = x + Math.cos(ang) * len;
  const y1 = y + Math.sin(ang) * len;
  paintCapsule(C, x, y, x1, y1, rad, rad * 0.45, hue, sat, val * 0.72, hue - 0.02, sat * 0.9, val * 1.12, r);
}

function paintConiferSprig(C: Cell, seed: number): void {
  const rnd = mulberry32(seed);
  const S = C.S;
  // 单位坐标：主轴 (0,0)→(0,1)，略弯；左右各 11 根侧枝（开口朝前的羽状）
  const axisBend = (rnd() - 0.5) * 0.08;
  const axisAt = (s: number): Pt => ({ x: axisBend * s * s, y: s });
  interface Needle {
    x: number;
    y: number;
    ang: number;
    len: number;
    hue: number;
    sat: number;
    val: number;
    r: number;
  }
  const needles: Needle[] = [];
  const caps: Array<{ a: Pt; b: Pt; r0: number; r1: number }> = [];
  caps.push({ a: axisAt(0), b: axisAt(1), r0: 0.0105, r1: 0.003 });
  const pairs = 15;
  const addNeedlesAlong = (pts: Pt[], dirs: number[], tipFrac: number): void => {
    const total = pts.length - 1;
    for (let i = 0; i < total; i++) {
      for (const f of [0, 0.34, 0.67]) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const w = (i + f) / total;
        const x = p0.x + (p1.x - p0.x) * f;
        const y = p0.y + (p1.y - p0.y) * f;
        const d = dirs[i];
        for (const side of [-1, 1]) {
          const fresh = w > tipFrac;
          const ang = d + side * (0.62 + rnd() * 0.3);
          const len = 0.1 * (1 - 0.4 * w) * (0.82 + rnd() * 0.36) * (fresh ? 0.8 : 1);
          needles.push({
            x,
            y,
            ang,
            len,
            hue: fresh ? 0.22 + rnd() * 0.04 : 0.37 + rnd() * 0.04,
            sat: fresh ? 0.5 : 0.46 + rnd() * 0.12,
            val: fresh ? 0.58 + rnd() * 0.08 : 0.36 + rnd() * 0.12,
            r: rnd(),
          });
        }
      }
    }
  };
  for (let k = 0; k < pairs; k++) {
    const s = 0.08 + 0.84 * (k / (pairs - 1));
    const base = axisAt(s);
    for (const side of [-1, 1]) {
      const L = 0.5 * Math.pow(1 - s * 0.8, 0.85) * (0.88 + rnd() * 0.24);
      const a0 = Math.PI / 2 - side * (1.08 - s * 0.2 + (rnd() - 0.5) * 0.12); // 与主轴夹角 ≈ 60°
      const pts: Pt[] = [base];
      const dirs: number[] = [];
      let x = base.x;
      let y = base.y;
      const segs = 6;
      for (let i = 0; i < segs; i++) {
        const d = a0 + side * (i / segs) * 0.55; // 逐渐向前弯
        dirs.push(d);
        x += Math.cos(d) * (L / segs);
        y += Math.sin(d) * (L / segs);
        pts.push({ x, y });
      }
      for (let i = 0; i < segs; i++) caps.push({ a: pts[i], b: pts[i + 1], r0: 0.0055 * (1 - (i / segs) * 0.5), r1: 0.0055 * (1 - ((i + 1) / segs) * 0.5) });
      addNeedlesAlong(pts, dirs, 0.78);
      // 枝端一撮针叶
      for (let t = 0; t < 4; t++) {
        needles.push({ x, y, ang: dirs[segs - 1] + (t - 1.5) * 0.28, len: 0.06 * (0.85 + rnd() * 0.3), hue: 0.23 + rnd() * 0.04, sat: 0.5, val: 0.58, r: rnd() });
      }
    }
  }
  // 主轴上的针叶与顶芽
  {
    const pts: Pt[] = [];
    const dirs: number[] = [];
    for (let i = 0; i <= 14; i++) pts.push(axisAt(0.15 + (i / 14) * 0.85));
    for (let i = 0; i < 14; i++) dirs.push(Math.atan2(pts[i + 1].y - pts[i].y, pts[i + 1].x - pts[i].x));
    addNeedlesAlong(pts, dirs, 0.7);
    const tipP = axisAt(1);
    for (let t = 0; t < 6; t++) needles.push({ x: tipP.x, y: tipP.y, ang: Math.PI / 2 + (t - 2.5) * 0.34, len: 0.07, hue: 0.23, sat: 0.5, val: 0.6, r: rnd() });
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const grow = (x: number, y: number): void => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };
  for (const n of needles) {
    grow(n.x, n.y);
    grow(n.x + Math.cos(n.ang) * n.len, n.y + Math.sin(n.ang) * n.len);
  }
  for (const c of caps) {
    grow(c.a.x, c.a.y);
    grow(c.b.x, c.b.y);
  }
  grow(0, -0.03);
  const fit = fitTo(S, C.m, minX, minY, maxX, maxY, S * 0.97);
  const T = (p: Pt): Pt => ({ x: p.x * fit.scale + fit.ox, y: p.y * fit.scale + fit.oy });
  const rad = Math.max(0.9, S * 0.0034);
  for (const c of caps) {
    const a = T(c.a);
    const b = T(c.b);
    paintCapsule(C, a.x, a.y, b.x, b.y, Math.max(0.9, c.r0 * fit.scale), Math.max(0.8, c.r1 * fit.scale), 0.07, 0.5, 0.27, 0.075, 0.45, 0.32, rnd());
  }
  needles.sort(() => rnd() - 0.5);
  for (const n of needles) {
    const p = T(n);
    paintNeedle(C, p.x, p.y, n.ang, n.len * fit.scale, rad, n.hue, n.sat, n.val, n.r);
  }
}

// ───────────────────────── 图集 ─────────────────────────

function sobelNormals(h: Float32Array, a: Float32Array | null, size: number, strength: number, wrap: boolean): Uint8Array {
  const out = new Uint8Array(size * size * 4);
  const xm = new Int32Array(size);
  const xp = new Int32Array(size);
  for (let i = 0; i < size; i++) {
    xm[i] = wrap ? (i + size - 1) % size : Math.max(0, i - 1);
    xp[i] = wrap ? (i + 1) % size : Math.min(size - 1, i + 1);
  }
  for (let y = 0; y < size; y++) {
    const rm = (wrap ? (y + size - 1) % size : Math.max(0, y - 1)) * size;
    const r0 = y * size;
    const rp = (wrap ? (y + 1) % size : Math.min(size - 1, y + 1)) * size;
    for (let x = 0; x < size; x++) {
      const i = r0 + x;
      const o = i * 4;
      if (a && a[i] < 0.02) {
        out[o] = 128;
        out[o + 1] = 128;
        out[o + 2] = 255;
        out[o + 3] = 255;
        continue;
      }
      const l = xm[x];
      const r = xp[x];
      const dx = (h[rm + r] + 2 * h[r0 + r] + h[rp + r] - h[rm + l] - 2 * h[r0 + l] - h[rp + l]) / 8;
      const dy = (h[rp + l] + 2 * h[rp + x] + h[rp + r] - h[rm + l] - 2 * h[rm + x] - h[rm + r]) / 8;
      const nx = -dx * strength;
      const ny = -dy * strength;
      const inv = 1 / Math.sqrt(nx * nx + ny * ny + 1);
      out[o] = ((nx * inv * 0.5 + 0.5) * 255 + 0.5) | 0;
      out[o + 1] = ((ny * inv * 0.5 + 0.5) * 255 + 0.5) | 0;
      out[o + 2] = ((inv * 0.5 + 0.5) * 255 + 0.5) | 0;
      out[o + 3] = 255;
    }
  }
  return out;
}

function toByte(v: number): number {
  const x = Math.round(v * 255);
  return x < 0 ? 0 : x > 255 ? 255 : x;
}

/** 叶片图集：2×2 格子，每格一种叶簇，alpha 为叶片轮廓；附法线图 */
export function generateFoliageAtlas(size: number, seed: number): { albedo: RGBA8Image; normal: RGBA8Image } {
  const B = makeBuf(size);
  const S = Math.floor(size / 2);
  const m = Math.max(3, Math.round(S * 0.03));
  const cells: Array<{ id: number; paint: (c: Cell) => void }> = [
    { id: FOLIAGE_ATLAS_CELLS.broadleaf, paint: (c) => paintBroadleafCluster(c, { dark: false, round: false, seed: seed * 31 + 1 }) },
    { id: FOLIAGE_ATLAS_CELLS.broadleafDark, paint: (c) => paintBroadleafCluster(c, { dark: true, round: false, seed: seed * 31 + 2 }) },
    { id: FOLIAGE_ATLAS_CELLS.conifer, paint: (c) => paintConiferSprig(c, seed * 31 + 3) },
    { id: FOLIAGE_ATLAS_CELLS.shrub, paint: (c) => paintBroadleafCluster(c, { dark: false, round: true, seed: seed * 31 + 4 }) },
  ];
  const mean = new Float32Array(cells.length * 3);
  for (const { id, paint } of cells) {
    const ox = (id % 2) * S;
    const oy = Math.floor(id / 2) * S;
    paint({ B, ox, oy, S, m, seed });
    // 边距内强制 alpha = 0（保证 mipmap 不串色），并统计本格平均色用于填充透明区
    let sr = 0;
    let sg = 0;
    let sb = 0;
    let sn = 0;
    for (let y = 0; y < S; y++) {
      const inY = y >= m && y < S - m;
      for (let x = 0; x < S; x++) {
        const i = (oy + y) * size + ox + x;
        if (!inY || x < m || x >= S - m) {
          B.a[i] = 0;
          B.h[i] = 0.5;
        } else if (B.a[i] > 0.5) {
          sr += B.r[i];
          sg += B.g[i];
          sb += B.b[i];
          sn++;
        }
      }
    }
    if (sn > 0) {
      mean[id * 3] = sr / sn;
      mean[id * 3 + 1] = sg / sn;
      mean[id * 3 + 2] = sb / sn;
    }
  }
  const albedo = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const o = i * 4;
      const cell = Math.min(1, Math.floor(x / S)) + Math.min(1, Math.floor(y / S)) * 2;
      const a = B.a[i];
      if (a < 0.004) {
        albedo[o] = toByte(mean[cell * 3]);
        albedo[o + 1] = toByte(mean[cell * 3 + 1]);
        albedo[o + 2] = toByte(mean[cell * 3 + 2]);
        albedo[o + 3] = 0;
      } else {
        albedo[o] = toByte(B.r[i]);
        albedo[o + 1] = toByte(B.g[i]);
        albedo[o + 2] = toByte(B.b[i]);
        albedo[o + 3] = toByte(a);
      }
    }
  }
  const normal = sobelNormals(B.h, B.a, size, 7 * (size / 1024), false);
  return { albedo: { size, data: albedo }, normal: { size, data: normal } };
}

// ───────────────────────── 树皮 ─────────────────────────

interface WorleyTable {
  gx: number;
  gy: number;
  fx: Float32Array;
  fy: Float32Array;
  id: Float32Array;
}

function makeWorleyTable(gx: number, gy: number, seed: number): WorleyTable {
  const fx = new Float32Array(gx * gy);
  const fy = new Float32Array(gx * gy);
  const id = new Float32Array(gx * gy);
  for (let j = 0; j < gy; j++) {
    for (let i = 0; i < gx; i++) {
      const k = j * gx + i;
      fx[k] = 0.15 + ihash(i, j, seed) * 0.7;
      fy[k] = 0.15 + ihash(i, j, seed + 17) * 0.7;
      id[k] = ihash(i, j, seed + 31);
    }
  }
  return { gx, gy, fx, fy, id };
}

/** 周期 Worley：写入 [F1, F2, 最近点 id 的随机值]（单位：格子） */
function worley(u: number, v: number, T: WorleyTable, out: number[]): void {
  const { gx, gy } = T;
  const x = u * gx;
  const y = v * gy;
  const cx = Math.floor(x);
  const cy = Math.floor(y);
  let f1 = 9;
  let f2 = 9;
  let id = 0;
  for (let dj = -1; dj <= 1; dj++) {
    const cj = cy + dj;
    const wj = wrapInt(cj, gy);
    for (let di = -1; di <= 1; di++) {
      const ci = cx + di;
      const k = wj * gx + wrapInt(ci, gx);
      const ex = x - (ci + T.fx[k]);
      const ey = y - (cj + T.fy[k]);
      const d = ex * ex + ey * ey;
      if (d < f1) {
        f2 = f1;
        f1 = d;
        id = T.id[k];
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  out[0] = Math.sqrt(f1);
  out[1] = Math.sqrt(f2);
  out[2] = id;
}

/** 一维周期 Worley（只看 u 方向，得到纵向的沟脊）：写入 [F1, F2, id] */
function worley1D(u: number, T: WorleyTable, out: number[]): void {
  const { gx } = T;
  const x = u * gx;
  const cx = Math.floor(x);
  let f1 = 9;
  let f2 = 9;
  let id = 0;
  for (let di = -1; di <= 1; di++) {
    const ci = cx + di;
    const k = wrapInt(ci, gx);
    const d = Math.abs(x - (ci + T.fx[k]));
    if (d < f1) {
      f2 = f1;
      f1 = d;
      id = T.id[k];
    } else if (d < f2) {
      f2 = d;
    }
  }
  out[0] = f1;
  out[1] = f2;
  out[2] = id;
}

/** 树皮：沿 u、v 都无缝平铺；阔叶为纵向裂纹，针叶为鳞片状剥落 */
export function generateBarkTexture(size: number, seed: number, kind: "broadleaf" | "conifer"): { albedo: RGBA8Image; normal: RGBA8Image } {
  const N = size;
  const albedo = new Uint8Array(N * N * 4);
  const height = new Float32Array(N * N);
  const w: number[] = [0, 0, 0];
  const s0 = seed * 7 + (kind === "conifer" ? 101 : 3);
  const wt1 = kind === "broadleaf" ? makeWorleyTable(10, 1, s0 + 9) : makeWorleyTable(11, 3, s0 + 9);
  const wt2 = makeWorleyTable(22, 8, s0 + 12);
  for (let y = 0; y < N; y++) {
    const v = (y + 0.5) / N;
    for (let x = 0; x < N; x++) {
      const u = (x + 0.5) / N;
      const i = y * N + x;
      let r: number;
      let g: number;
      let b: number;
      let hgt: number;
      const low = pnoise(u * 4, v * 4, 4, 4, s0 + 1);
      if (kind === "broadleaf") {
        // 纵向深裂：纵向拉长的 Worley 脊（沿 v 蜿蜒），裂纹时断时续，叠一层更细的短裂
        const wig = pnoise(u * 2, v * 5, 2, 5, s0 + 3) - 0.5;
        const wig2 = pnoise(u * 5, v * 11, 5, 11, s0 + 4) - 0.5;
        const uu = u + 0.028 * wig + 0.01 * wig2;
        worley1D(uu, wt1, w);
        const edge1 = w[1] - w[0];
        const gate1 = smoothstep(0.3, 0.6, pnoise(u * 10, v * 4, 10, 4, s0 + 5)); // 裂纹深浅沿长度变化
        const furrow1 = 1 - smoothstep(0.0, 0.13, edge1);
        worley(uu + 0.31, v + 0.07 * wig, wt2, w);
        const edge2 = w[1] - w[0];
        const furrow2 = (1 - smoothstep(0.0, 0.09, edge2)) * 0.5 * smoothstep(0.3, 0.7, pnoise(u * 6, v * 9, 6, 9, s0 + 6));
        const crack = Math.min(1, Math.max(furrow1 * (0.4 + 0.6 * gate1), furrow2));
        const fiber = pnoise(u * 120, v * 8, 120, 8, s0 + 7);
        const fine = pnoise(u * 70, v * 40, 70, 40, s0 + 11);
        const ridgeTone = 0.9 + 0.2 * pnoise(u * 10, v * 3, 10, 3, s0 + 8);
        hgt = (1 - crack * 0.9) * (0.85 + 0.15 * fiber) + 0.05 * fine;
        const k = ridgeTone * (0.82 + 0.4 * low) * (0.86 + 0.28 * fiber) * (0.94 + 0.1 * fine) * (1 - 0.82 * crack);
        r = 0.4 * k;
        g = 0.35 * k;
        b = 0.3 * k;
        const lichen = smoothstep(0.64, 0.78, pnoise(u * 7, v * 7, 7, 7, s0 + 12)) * (1 - crack) * 0.2;
        r += (0.5 * k - r) * lichen;
        g += (0.54 * k - g) * lichen;
        b += (0.4 * k - b) * lichen;
      } else {
        // 鳞片状树皮：纵向拉长、边界扭曲的 Worley 板块，板间沟深浅不一，板面有纵向纤维
        const wu = 0.03 * (pnoise(u * 5, v * 3, 5, 3, s0 + 3) - 0.5) + 0.012 * (pnoise(u * 14, v * 8, 14, 8, s0 + 4) - 0.5);
        const wv = 0.06 * (pnoise(u * 4, v * 5, 4, 5, s0 + 5) - 0.5);
        worley(u + wu, v + wv, wt1, w);
        const edge = w[1] - w[0];
        const gate = 0.6 + 0.8 * pnoise(u * 7, v * 6, 7, 6, s0 + 6); // 各处沟宽不同
        const rim = smoothstep(0.0, 0.16 * gate, edge); // 0 = 板间深沟
        const dome = 1 - Math.min(1, w[0] * 1.1);
        const streak = pnoise(u * 60, v * 5, 60, 5, s0 + 10);
        const fine = pnoise(u * 90, v * 30, 90, 30, s0 + 11);
        hgt = rim * (0.5 + 0.35 * dome) * (0.88 + 0.16 * streak) + 0.05 * fine;
        const cellTone = 0.75 + 0.5 * w[2];
        const k = cellTone * (0.85 + 0.3 * low) * (0.8 + 0.4 * streak) * (0.9 + 0.2 * fine) * (0.3 + 0.7 * rim) * (0.88 + 0.2 * dome);
        r = 0.37 * k;
        g = 0.28 * k;
        b = 0.22 * k;
        const grey = smoothstep(0.5, 0.85, w[2]) * 0.4;
        r += (0.4 * k - r) * grey;
        g += (0.34 * k - g) * grey;
        b += (0.3 * k - b) * grey;
      }
      const o = i * 4;
      albedo[o] = toByte(r);
      albedo[o + 1] = toByte(g);
      albedo[o + 2] = toByte(b);
      albedo[o + 3] = 255;
      height[i] = hgt;
    }
  }
  const normal = sobelNormals(height, null, N, (kind === "broadleaf" ? 5 : 6) * (N / 512), true);
  return { albedo: { size: N, data: albedo }, normal: { size: N, data: normal } };
}
