// 地表多层材质：层权重（CPU / GLSL 共用常量）+ 可无缝平铺的程序纹理生成。
// 纯逻辑模块：不依赖 three，可在 node / vitest 中直接运行。

export const LAYER_COUNT = 5;
export type LayerId = 0 | 1 | 2 | 3 | 4;
export type Weights5 = [number, number, number, number, number];

export interface LayerWeightsInput {
  /** 法线 y 分量（1 = 水平） */
  normalY: number;
  /** 地形高度（世界单位） */
  height: number;
  /** 三个 0..1 噪声：dry / dirt / gravel 斑块 */
  nDry: number;
  nDirt: number;
  nGravel: number;
  /** 每层高度图值 0..1（来自 albedo alpha），用于高度混合 */
  layerHeights?: [number, number, number, number, number];
}

/** CPU 与 GLSL 共用的阈值常量，改这里两端同时生效。 */
export const LW = {
  /** 坡度 (1 - normalY) 的岩面过渡区间 */
  rockA: 0.16,
  rockB: 0.42,
  /** 高处偏枯的高度区间 */
  hiA: 14,
  hiB: 38,
  /** 枯草噪声过渡 + 高处加成 */
  dryA: 0.58,
  dryB: 0.78,
  dryGain: 0.5,
  hiGain: 0.22,
  /** 泥土噪声过渡 */
  dirtA: 0.54,
  dirtB: 0.74,
  dirtGain: 0.9,
  /** 碎石噪声过渡 */
  gravelA: 0.62,
  gravelB: 0.76,
  /** 高度混合：权重 *(层高度 + bias) 后平方锐化 */
  hBias: 0.2,
} as const;

function ss(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** 返回 5 个层权重（草 / 枯草 / 泥土 / 碎石 / 岩面），和为 1，均 ≥ 0 */
export function layerWeights(i: LayerWeightsInput): Weights5 {
  const rock = ss(LW.rockA, LW.rockB, 1 - i.normalY);
  const hi = ss(LW.hiA, LW.hiB, i.height);
  const dry = Math.min(1, ss(LW.dryA, LW.dryB, i.nDry) * LW.dryGain + hi * LW.hiGain);
  const dirt = ss(LW.dirtA, LW.dirtB, i.nDirt) * LW.dirtGain;
  const gravel = ss(LW.gravelA, LW.gravelB, i.nGravel);
  const flat = 1 - rock;
  const wDirt = flat * dirt;
  const r1 = flat * (1 - dirt);
  const wGravel = r1 * gravel;
  const r2 = r1 * (1 - gravel);
  const wDry = r2 * dry;
  const wGrass = r2 * (1 - dry);
  const lh = i.layerHeights ?? [0.5, 0.5, 0.5, 0.5, 0.5];
  const raw = [wGrass, wDry, wDirt, wGravel, rock];
  let sum = 0;
  const a = raw.map((w, k) => {
    const v = w * (lh[k] + LW.hBias);
    const s = v * v;
    sum += s;
    return s;
  });
  const inv = 1 / Math.max(sum, 1e-6);
  return [a[0] * inv, a[1] * inv, a[2] * inv, a[3] * inv, a[4] * inv];
}

function gf(n: number): string {
  const s = String(n);
  return /[.e]/.test(s) ? s : `${s}.0`;
}

/** 与 layerWeights 同源常量的 GLSL 函数（含高度混合） */
export function layerWeightsGLSL(): string {
  return `
void layerWeights(float normalY, float height, float nDry, float nDirt, float nGravel, float lh[5], out float w[5]) {
  float rock = smoothstep(${gf(LW.rockA)}, ${gf(LW.rockB)}, 1.0 - normalY);
  float hi = smoothstep(${gf(LW.hiA)}, ${gf(LW.hiB)}, height);
  float dry = min(1.0, smoothstep(${gf(LW.dryA)}, ${gf(LW.dryB)}, nDry) * ${gf(LW.dryGain)} + hi * ${gf(LW.hiGain)});
  float dirt = smoothstep(${gf(LW.dirtA)}, ${gf(LW.dirtB)}, nDirt) * ${gf(LW.dirtGain)};
  float gravel = smoothstep(${gf(LW.gravelA)}, ${gf(LW.gravelB)}, nGravel);
  float flat_ = 1.0 - rock;
  float r1 = flat_ * (1.0 - dirt);
  float r2 = r1 * (1.0 - gravel);
  w[0] = r2 * (1.0 - dry);
  w[1] = r2 * dry;
  w[2] = flat_ * dirt;
  w[3] = r1 * gravel;
  w[4] = rock;
  float sum = 0.0;
  for (int k = 0; k < 5; k++) {
    float v = w[k] * (lh[k] + ${gf(LW.hBias)});
    w[k] = v * v;
    sum += w[k];
  }
  float inv = 1.0 / max(sum, 1e-6);
  for (int k = 0; k < 5; k++) w[k] *= inv;
}
`;
}

// ── 斑块噪声（与 utils.fbm 同一公式；这里独立复制以保持本模块不依赖 three） ──

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return (
    hash2(xi, yi) * (1 - u) * (1 - v) +
    hash2(xi + 1, yi) * u * (1 - v) +
    hash2(xi, yi + 1) * (1 - u) * v +
    hash2(xi + 1, yi + 1) * u * v
  );
}
function fbm(x: number, y: number, oct: number): number {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * vnoise(x * freq, y * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

/** 地形局部坐标 (x, z) 处的三个斑块噪声（GPU 端 terrainNoises 与之对应） */
export function terrainNoises(x: number, z: number): { nDry: number; nDirt: number; nGravel: number } {
  return {
    nDry: fbm(x * 0.012 + 13, z * 0.012 + 71, 3),
    nDirt: fbm(x * 0.009 + 31, z * 0.009 + 17, 4) * 0.68 + fbm(x * 0.045, z * 0.045, 3) * 0.32,
    nGravel: fbm(x * 0.028 + 150, z * 0.028 + 20, 4),
  };
}

/** GLSL：tlNoise/tlFbm + `vec3 terrainNoises(vec2 p)`（x=dry, y=dirt, z=gravel）。定义 TL_LOW 时减少倍频。 */
export function terrainNoisesGLSL(): string {
  return `
float tlHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float tlNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(tlHash(i), tlHash(i + vec2(1.0, 0.0)), f.x), mix(tlHash(i + vec2(0.0, 1.0)), tlHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float tlFbm(vec2 p, int oct) {
  float a = 0.5, f = 1.0, s = 0.0, n = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    s += a * tlNoise(p * f); n += a; a *= 0.5; f *= 2.0;
  }
  return s / n;
}
vec3 terrainNoises(vec2 p) {
#ifdef TL_LOW
  float nDry = tlFbm(p * 0.012 + vec2(13.0, 71.0), 2);
  float nDirt = tlFbm(p * 0.009 + vec2(31.0, 17.0), 3) * 0.68 + tlFbm(p * 0.045, 2) * 0.32;
  float nGravel = tlFbm(p * 0.028 + vec2(150.0, 20.0), 3);
#else
  float nDry = tlFbm(p * 0.012 + vec2(13.0, 71.0), 3);
  float nDirt = tlFbm(p * 0.009 + vec2(31.0, 17.0), 4) * 0.68 + tlFbm(p * 0.045, 3) * 0.32;
  float nGravel = tlFbm(p * 0.028 + vec2(150.0, 20.0), 4);
#endif
  return vec3(nDry, nDirt, nGravel);
}
`;
}

// ── 配色 ────────────────────────────────────────────────────

export interface LayerPalette {
  grass: number;
  dryGrass: number;
  dirt: number;
  gravel: number;
  rock: number;
}

type RGB = [number, number, number];
const hexToRgb = (h: number): RGB => [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255];
const rgbToHex = (c: RGB): number => {
  const q = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255);
  return (q(c[0]) << 16) | (q(c[1]) << 8) | q(c[2]);
};
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const lum = (c: RGB): number => c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;

/** 由 biome 地表三色推导 5 层配色：整体偏自然、略去饱和 */
export function paletteFromGround(ground: { grass: number; dirt: number; rock: number }): LayerPalette {
  const g0 = hexToRgb(ground.grass);
  const d0 = hexToRgb(ground.dirt);
  const r0 = hexToRgb(ground.rock);
  const grass = mixRgb(g0, [lum(g0), lum(g0), lum(g0)], 0.1);
  const straw: RGB = [0.66, 0.6, 0.33];
  const dryGrass = mixRgb(grass, straw, 0.62);
  const dirt = mixRgb(d0, [lum(d0), lum(d0), lum(d0)], 0.08);
  const gravel = mixRgb(mixRgb(r0, d0, 0.38), [1, 1, 1], 0.1);
  const rock = r0;
  return {
    grass: rgbToHex(grass),
    dryGrass: rgbToHex(dryGrass),
    dirt: rgbToHex(dirt),
    gravel: rgbToHex(gravel),
    rock: rgbToHex(rock),
  };
}

// ── 程序纹理 ────────────────────────────────────────────────

export interface TileTextureData {
  size: number;
  /** RGBA8：rgb = sRGB 颜色，a = 该层高度图 */
  albedo: Uint8Array;
  /** RGBA8：rgb = 切线空间法线（0..255 编码），a = 粗糙度 */
  normal: Uint8Array;
}

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

interface Canvas {
  S: number;
  mask: number;
  R: Float32Array;
  G: Float32Array;
  B: Float32Array;
  H: Float32Array;
}

function newCanvas(S: number): Canvas {
  const n = S * S;
  return { S, mask: S - 1, R: new Float32Array(n), G: new Float32Array(n), B: new Float32Array(n), H: new Float32Array(n) };
}

/** 周期值噪声分形场（0..1）：x/y 方向格数 cellsX/cellsY，每个倍频翻倍；格数对 size 取模 → 严格无缝 */
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
    for (let y = 0; y < S; y++) {
      const f = (y * cy) / S;
      const j0 = Math.floor(f);
      const t = f - j0;
      const wy = t * t * (3 - 2 * t);
      const r0 = (j0 % cy) * cx;
      const r1 = ((j0 + 1) % cy) * cx;
      const row = y * S;
      for (let x = 0; x < S; x++) {
        const a = lat[r0 + x0[x]];
        const b = lat[r0 + x1[x]];
        const c = lat[r1 + x0[x]];
        const d = lat[r1 + x1[x]];
        const u = wx[x];
        const top = a + (b - a) * u;
        out[row + x] = out[row + x] + amp * (top + (c + (d - c) * u - top) * wy);
      }
    }
    norm += amp;
    amp *= gain;
  }
  const inv = 1 / norm;
  for (let i = 0; i < out.length; i++) out[i] *= inv;
  return out;
}

/** 将噪声拉伸对比（围绕 0.5），使 fbm 的窄分布更饱满 */
function contrast(f: Float32Array, k: number): void {
  for (let i = 0; i < f.length; i++) {
    const v = (f[i] - 0.5) * k + 0.5;
    f[i] = v < 0 ? 0 : v > 1 ? 1 : v;
  }
}

/** 写一个像素（环绕），alpha 混合颜色，高度取 max */
function put(c: Canvas, x: number, y: number, r: number, g: number, b: number, a: number, h: number): void {
  const i = (y & c.mask) * c.S + (x & c.mask);
  c.R[i] += (r - c.R[i]) * a;
  c.G[i] += (g - c.G[i]) * a;
  c.B[i] += (b - c.B[i]) * a;
  if (h > c.H[i]) c.H[i] = h;
}

interface BladeOpts {
  count: number;
  lenMin: number;
  lenMax: number;
  wMin: number;
  wMax: number;
  curve: number;
  base: RGB;
  baseDark: number;
  tipLight: number;
  tipYellow: number;
  bright: [number, number];
  /** 少量替代色（枯叶 / 土色）占比与颜色 */
  alt?: { p: number; color: RGB };
  hueJitter: number;
}

function drawBlades(c: Canvas, rnd: () => number, o: BladeOpts): void {
  const S = c.S;
  for (let n = 0; n < o.count; n++) {
    let x = rnd() * S;
    let y = rnd() * S;
    let th = rnd() * Math.PI * 2;
    const len = o.lenMin + rnd() * (o.lenMax - o.lenMin);
    const w0 = o.wMin + rnd() * (o.wMax - o.wMin);
    const curv = (rnd() - 0.5) * o.curve;
    const bright = o.bright[0] + rnd() * (o.bright[1] - o.bright[0]);
    const base = o.alt && rnd() < o.alt.p ? o.alt.color : o.base;
    const dh = (rnd() - 0.5) * o.hueJitter;
    const steps = Math.max(3, Math.round(len / 0.8));
    const hv = 0.8 + rnd() * 0.2;
    for (let s = 0; s < steps; s++) {
      const t = s / (steps - 1);
      const cs = Math.cos(th);
      const sn = Math.sin(th);
      const wd = Math.max(0.9, w0 * (1 - t * 0.8));
      const k = o.baseDark + (o.tipLight - o.baseDark) * t;
      const r = base[0] * bright * k * (1 + dh + o.tipYellow * t);
      const g = base[1] * bright * k * (1 + o.tipYellow * t * 0.3);
      const b = base[2] * bright * k * (1 - dh - o.tipYellow * t * 1.2);
      const hh = (0.38 + 0.62 * Math.pow(t, 0.55)) * hv;
      const half = wd * 0.5;
      const px = Math.round(x);
      const py = Math.round(y);
      if (wd < 1.5) {
        put(c, px, py, r, g, b, 0.9, hh);
      } else {
        for (let off = -half; off <= half + 0.01; off += 1) {
          const edge = Math.abs(off) > half - 0.5 ? 0.65 : 0.95;
          put(c, Math.round(x - sn * off), Math.round(y + cs * off), r, g, b, edge, hh);
        }
      }
      x += cs * 0.8;
      y += sn * 0.8;
      th += curv * 0.05;
    }
  }
}

interface DomeOpts {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  ang: number;
  color: RGB;
  hScale: number;
  shadow: number;
}

/** 带明暗与投影的圆丘（石子 / 土块），环绕写入 */
function drawDome(c: Canvas, o: DomeOpts): void {
  const ca = Math.cos(o.ang);
  const sa = Math.sin(o.ang);
  const ext = Math.ceil(Math.max(o.rx, o.ry) * 1.7) + 1;
  const ix = Math.round(o.cx);
  const iy = Math.round(o.cy);
  const lx = -0.6;
  const ly = -0.8;
  for (let dy = -ext; dy <= ext; dy++) {
    for (let dx = -ext; dx <= ext; dx++) {
      const fx = dx + (ix - o.cx);
      const fy = dy + (iy - o.cy);
      const u = (fx * ca + fy * sa) / o.rx;
      const v = (-fx * sa + fy * ca) / o.ry;
      const d2 = u * u + v * v;
      if (d2 > 2.9) continue;
      const i = ((iy + dy) & c.mask) * c.S + ((ix + dx) & c.mask);
      if (d2 < 1) {
        const dome = Math.sqrt(1 - d2);
        // 简化光照：法线 ≈ (fx, fy, dome*r)，光从左上
        const nl = (fx * lx + fy * ly) / (Math.max(o.rx, o.ry) * 1.0);
        const light = 0.74 + 0.3 * dome - 0.28 * nl * (1 - dome * 0.6);
        const a = d2 > 0.8 ? 0.8 : 1;
        c.R[i] += (o.color[0] * light - c.R[i]) * a;
        c.G[i] += (o.color[1] * light - c.G[i]) * a;
        c.B[i] += (o.color[2] * light - c.B[i]) * a;
        const h = dome * o.hScale;
        if (h > c.H[i]) c.H[i] = h;
      } else if (o.shadow > 0) {
        // 光源在左上，投影落在右下
        const dir = (fx * -lx + fy * -ly) / (Math.sqrt(fx * fx + fy * fy) + 1e-4);
        const fall = 1 - (Math.sqrt(d2) - 1) / 0.7;
        if (fall > 0 && dir > -0.2) {
          const k = 1 - o.shadow * fall * Math.min(1, dir + 0.3);
          c.R[i] *= k;
          c.G[i] *= k;
          c.B[i] *= k;
        }
      }
    }
  }
}

/** 周期 Voronoi：每格一个（可各向异性的）特征点，返回 F1、F2 与最近格 id */
function voronoi(S: number, n: number, rnd: () => number, aniso: boolean): { d1: Float32Array; d2: Float32Array; id: Int32Array } {
  const cells = n * n;
  const px = new Float32Array(cells);
  const py = new Float32Array(cells);
  const cs = new Float32Array(cells);
  const sn = new Float32Array(cells);
  const ia = new Float32Array(cells);
  const ib = new Float32Array(cells);
  for (let i = 0; i < cells; i++) {
    px[i] = 0.5 + (rnd() - 0.5) * 0.85;
    py[i] = 0.5 + (rnd() - 0.5) * 0.85;
    const ang = rnd() * Math.PI;
    cs[i] = Math.cos(ang);
    sn[i] = Math.sin(ang);
    const stretch = aniso ? 0.75 + rnd() * 0.7 : 1;
    const size = aniso ? 0.8 + rnd() * 0.45 : 1;
    ia[i] = 1 / (size * stretch);
    ib[i] = 1 / (size / stretch);
  }
  const d1 = new Float32Array(S * S);
  const d2 = new Float32Array(S * S);
  const id = new Int32Array(S * S);
  for (let y = 0; y < S; y++) {
    const v = (y * n) / S;
    const cy0 = Math.floor(v);
    for (let x = 0; x < S; x++) {
      const u = (x * n) / S;
      const cx0 = Math.floor(u);
      let m1 = 1e9;
      let m2 = 1e9;
      let best = 0;
      for (let j = -1; j <= 1; j++) {
        const cyy = cy0 + j;
        const wy = ((cyy % n) + n) % n;
        for (let i = -1; i <= 1; i++) {
          const cxx = cx0 + i;
          const wxi = ((cxx % n) + n) % n;
          const k = wy * n + wxi;
          const ddx = u - (cxx + px[k]);
          const ddy = v - (cyy + py[k]);
          const a = ddx * cs[k] + ddy * sn[k];
          const b = -ddx * sn[k] + ddy * cs[k];
          const d = a * a * ia[k] * ia[k] + b * b * ib[k] * ib[k];
          if (d < m1) {
            m2 = m1;
            m1 = d;
            best = k;
          } else if (d < m2) m2 = d;
        }
      }
      const o = y * S + x;
      d1[o] = Math.sqrt(m1);
      d2[o] = Math.sqrt(m2);
      id[o] = best;
    }
  }
  return { d1, d2, id };
}

const smooth01 = (a: number, b: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function fillGrass(c: Canvas, rnd: () => number, p: LayerPalette, dry: boolean): void {
  const S = c.S;
  const k = S / 512;
  const grass = hexToRgb(p.grass);
  const dryC = hexToRgb(p.dryGrass);
  const dirt = hexToRgb(p.dirt);
  const n1 = noiseField(S, rnd, 4, 4, 5);
  const n2 = noiseField(S, rnd, 16, 16, 3);
  contrast(n1, 1.8);
  if (!dry) {
    const under: RGB = [grass[0] * 0.5, grass[1] * 0.5, grass[2] * 0.45];
    for (let i = 0; i < S * S; i++) {
      const m = n1[i] * 0.7 + n2[i] * 0.3;
      c.R[i] = under[0] * (0.7 + 0.6 * m);
      c.G[i] = under[1] * (0.7 + 0.6 * m);
      c.B[i] = under[2] * (0.7 + 0.6 * m);
      c.H[i] = 0.12 + 0.2 * n2[i];
    }
    drawBlades(c, rnd, {
      count: Math.round(26000 * k * k),
      lenMin: 12 * k + 3,
      lenMax: 30 * k + 3,
      wMin: 1.5,
      wMax: 2.5,
      curve: 1.2,
      base: grass,
      baseDark: 0.58,
      tipLight: 1.12,
      tipYellow: 0.16,
      bright: [0.75, 1.25],
      alt: { p: 0.05, color: dryC },
      hueJitter: 0.08,
    });
    // 零星小花
    const flowers: RGB[] = [[0.93, 0.92, 0.84], [0.93, 0.78, 0.22], [0.9, 0.9, 0.92]];
    const nf = Math.round(9 * k * k) + 3;
    for (let f = 0; f < nf; f++) {
      const fx = rnd() * S;
      const fy = rnd() * S;
      const col = flowers[Math.floor(rnd() * flowers.length)];
      const r = (1.3 + rnd() * 0.8) * Math.max(0.8, k);
      for (let q = 0; q < 5; q++) {
        const a = (q / 5) * Math.PI * 2 + rnd();
        drawDome(c, { cx: fx + Math.cos(a) * r, cy: fy + Math.sin(a) * r, rx: r * 0.7, ry: r * 0.7, ang: 0, color: col, hScale: 0.9, shadow: 0 });
      }
      drawDome(c, { cx: fx, cy: fy, rx: r * 0.55, ry: r * 0.55, ang: 0, color: [0.95, 0.72, 0.15], hScale: 0.95, shadow: 0 });
    }
  } else {
    for (let i = 0; i < S * S; i++) {
      const patch = smooth01(0.5, 0.72, n1[i]);
      const m = n2[i];
      c.R[i] = (dryC[0] * 0.62 + (dirt[0] * 0.8 - dryC[0] * 0.62) * patch * 0.55) * (0.78 + 0.4 * m);
      c.G[i] = (dryC[1] * 0.62 + (dirt[1] * 0.8 - dryC[1] * 0.62) * patch * 0.55) * (0.78 + 0.4 * m);
      c.B[i] = (dryC[2] * 0.62 + (dirt[2] * 0.8 - dryC[2] * 0.62) * patch * 0.55) * (0.78 + 0.4 * m);
      c.H[i] = 0.1 + 0.18 * m;
    }
    drawBlades(c, rnd, {
      count: Math.round(11000 * k * k),
      lenMin: 24 * k + 4,
      lenMax: 58 * k + 4,
      wMin: 1.3,
      wMax: 2.1,
      curve: 3.4,
      base: dryC,
      baseDark: 0.62,
      tipLight: 1.08,
      tipYellow: 0.08,
      bright: [0.7, 1.3],
      alt: { p: 0.12, color: [dirt[0] * 1.1, dirt[1] * 1.05, dirt[2]] },
      hueJitter: 0.1,
    });
    // 少量仍带绿意的嫩叶
    drawBlades(c, rnd, {
      count: Math.round(1200 * k * k),
      lenMin: 10 * k + 3,
      lenMax: 22 * k + 3,
      wMin: 1.4,
      wMax: 2,
      curve: 1.4,
      base: hexToRgb(p.grass),
      baseDark: 0.6,
      tipLight: 1.05,
      tipYellow: 0.1,
      bright: [0.7, 1],
      hueJitter: 0.06,
    });
  }
}

function fillDirt(c: Canvas, rnd: () => number, p: LayerPalette): void {
  const S = c.S;
  const k = S / 512;
  const dirt = hexToRgb(p.dirt);
  const rock = hexToRgb(p.rock);
  const n1 = noiseField(S, rnd, 4, 4, 5);
  const n2 = noiseField(S, rnd, 32, 32, 3);
  contrast(n1, 1.8);
  for (let i = 0; i < S * S; i++) {
    const grain = 0.94 + rnd() * 0.12;
    const m = (0.76 + 0.46 * n1[i]) * (0.9 + 0.2 * n2[i]) * grain;
    const warm = n1[i] > 0.55 ? 1.04 : 0.98;
    c.R[i] = dirt[0] * m * warm;
    c.G[i] = dirt[1] * m;
    c.B[i] = dirt[2] * m / warm;
    c.H[i] = 0.28 + 0.2 * n2[i] + 0.1 * n1[i];
  }
  // 土块（低对比）
  const clods = Math.round(110 * k * k);
  for (let q = 0; q < clods; q++) {
    const r = (5 + rnd() * 8) * k + 1.5;
    const t = 0.9 + rnd() * 0.25;
    drawDome(c, {
      cx: rnd() * S,
      cy: rnd() * S,
      rx: r * (0.8 + rnd() * 0.5),
      ry: r * (0.8 + rnd() * 0.5),
      ang: rnd() * 3.14,
      color: [dirt[0] * t, dirt[1] * t, dirt[2] * t],
      hScale: 0.55 + rnd() * 0.15,
      shadow: 0.2,
    });
  }
  // 小石子
  const peb = Math.round(520 * k * k);
  for (let q = 0; q < peb; q++) {
    const r = (1.5 + Math.pow(rnd(), 2) * 5) * Math.max(0.7, k);
    const mixT = rnd() * 0.65;
    const br = 0.72 + rnd() * 0.55;
    drawDome(c, {
      cx: rnd() * S,
      cy: rnd() * S,
      rx: r * (0.85 + rnd() * 0.5),
      ry: r * (0.7 + rnd() * 0.4),
      ang: rnd() * 3.14,
      color: [(rock[0] + (dirt[0] - rock[0]) * mixT) * br, (rock[1] + (dirt[1] - rock[1]) * mixT) * br, (rock[2] + (dirt[2] - rock[2]) * mixT) * br],
      hScale: 0.8 + rnd() * 0.2,
      shadow: 0.38,
    });
  }
  // 细裂纹
  const cracks = Math.round(16 * k) + 4;
  for (let q = 0; q < cracks; q++) {
    let x = rnd() * S;
    let y = rnd() * S;
    let a = rnd() * Math.PI * 2;
    const steps = Math.round((70 + rnd() * 150) * k) + 20;
    for (let s = 0; s < steps; s++) {
      a += (rnd() - 0.5) * 0.7;
      x += Math.cos(a);
      y += Math.sin(a);
      const px = Math.round(x);
      const py = Math.round(y);
      const i = (py & c.mask) * S + (px & c.mask);
      c.R[i] *= 0.5;
      c.G[i] *= 0.5;
      c.B[i] *= 0.5;
      c.H[i] = Math.min(c.H[i], 0.04);
      if (s % 3 === 0) {
        const j = (py & c.mask) * S + ((px + 1) & c.mask);
        c.R[j] *= 0.8;
        c.G[j] *= 0.8;
        c.B[j] *= 0.8;
        c.H[j] = Math.min(c.H[j], 0.18);
      }
    }
  }
}

function fillGravel(c: Canvas, rnd: () => number, p: LayerPalette): void {
  const S = c.S;
  const k = S / 512;
  const grav = hexToRgb(p.gravel);
  const dirt = hexToRgb(p.dirt);
  const n = Math.round(24 * k + 2) | 0;
  const cells = Math.max(8, n);
  const v = voronoi(S, cells, rnd, true);
  const tone = new Float32Array(cells * cells);
  const warm = new Float32Array(cells * cells);
  const hgt = new Float32Array(cells * cells);
  for (let i = 0; i < tone.length; i++) {
    tone[i] = 0.62 + rnd() * 0.75;
    warm[i] = rnd();
    hgt[i] = 0.6 + rnd() * 0.4;
  }
  const soil: RGB = [dirt[0] * 0.38, dirt[1] * 0.36, dirt[2] * 0.33];
  const n2 = noiseField(S, rnd, 24, 24, 2);
  for (let i = 0; i < S * S; i++) {
    const id = v.id[i];
    const d1 = v.d1[i];
    const edge = smooth01(0.0, 0.1, v.d2[i] - d1);
    const dome = Math.max(0, 1 - d1 * 0.85);
    const w = warm[id];
    const t = tone[id] * (0.86 + 0.28 * n2[i]) * (0.78 + 0.3 * dome) * (0.95 + rnd() * 0.1);
    const r = grav[0] * t * (0.94 + 0.14 * w);
    const g = grav[1] * t * (0.97 + 0.04 * w);
    const b = grav[2] * t * (1.04 - 0.14 * w);
    const e = edge * edge;
    c.R[i] = soil[0] + (r - soil[0]) * e;
    c.G[i] = soil[1] + (g - soil[1]) * e;
    c.B[i] = soil[2] + (b - soil[2]) * e;
    c.H[i] = 0.04 + 0.96 * Math.pow(dome, 0.7) * edge * hgt[id];
  }
}

function fillRock(c: Canvas, rnd: () => number, p: LayerPalette): void {
  const S = c.S;
  const k = S / 512;
  const rock = hexToRgb(p.rock);
  const moss = mixRgb(hexToRgb(p.grass), [0.1, 0.12, 0.06], 0.35);
  const s1 = noiseField(S, rnd, 2, 12, 5);
  const s2 = noiseField(S, rnd, 6, 6, 4);
  const s3 = noiseField(S, rnd, 32, 32, 3);
  const s4 = noiseField(S, rnd, 3, 3, 4);
  contrast(s1, 1.6);
  contrast(s4, 1.8);
  const vA = voronoi(S, Math.max(4, Math.round(9 * Math.max(0.7, k))), rnd, false);
  const vB = voronoi(S, Math.max(8, Math.round(15 * Math.max(0.7, k * 1.0))), rnd, false);
  for (let i = 0; i < S * S; i++) {
    const h0 = s1[i] * 0.5 + s2[i] * 0.32 + s3[i] * 0.18;
    const wob = (s3[i] - 0.5) * 0.09;
    const crackA = 1 - smooth01(0.0, 0.035, vA.d2[i] - vA.d1[i] + wob);
    const crackB = (1 - smooth01(0.0, 0.05, vB.d2[i] - vB.d1[i] + wob)) * 0.55 * smooth01(0.35, 0.7, s2[i]);
    const crack = Math.min(1, crackA + crackB);
    const h = h0 * (1 - 0.8 * crack);
    const band = 0.74 + 0.5 * s1[i];
    const warm = s2[i];
    let r = rock[0] * band * (0.96 + 0.1 * warm);
    let g = rock[1] * band;
    let b = rock[2] * band * (1.04 - 0.1 * warm);
    const ao = 0.62 + 0.55 * h;
    const crk = 1 - 0.38 * crack;
    r *= ao * crk;
    g *= ao * crk;
    b *= ao * crk;
    const mossAmt = smooth01(0.55, 0.78, s4[i]) * smooth01(0.6, 0.2, h0) * 0.55;
    if (mossAmt > 0) {
      r += (moss[0] * (0.7 + 0.5 * s3[i]) - r) * mossAmt;
      g += (moss[1] * (0.7 + 0.5 * s3[i]) - g) * mossAmt;
      b += (moss[2] * (0.7 + 0.5 * s3[i]) - b) * mossAmt;
    }
    const grain = 0.94 + rnd() * 0.12;
    c.R[i] = r * grain;
    c.G[i] = g * grain;
    c.B[i] = b * grain;
    c.H[i] = h;
  }
}

const NORMAL_STRENGTH: Record<LayerId, number> = { 0: 1.8, 1: 1.5, 2: 2.4, 3: 3.4, 4: 3.0 };
/** 各层粗糙度基值（着色器里同样作为回退常量） */
export const LAYER_ROUGHNESS: Record<LayerId, number> = { 0: 0.9, 1: 0.94, 2: 0.97, 3: 0.84, 4: 0.9 };

function finalize(c: Canvas, layer: LayerId): TileTextureData {
  const S = c.S;
  const albedo = new Uint8Array(S * S * 4);
  const normal = new Uint8Array(S * S * 4);
  const q = (v: number) => (v <= 0 ? 0 : v >= 1 ? 255 : (v * 255 + 0.5) | 0);
  const H = c.H;
  const mask = c.mask;
  const str = NORMAL_STRENGTH[layer];
  const rb = LAYER_ROUGHNESS[layer];
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
      const i = (y0 + x) * 4;
      const j = y0 + x;
      albedo[i] = q(c.R[j]);
      albedo[i + 1] = q(c.G[j]);
      albedo[i + 2] = q(c.B[j]);
      albedo[i + 3] = q(H[j]);
      normal[i] = q(nx * inv * 0.5 + 0.5);
      normal[i + 1] = q(ny * inv * 0.5 + 0.5);
      normal[i + 2] = q(inv * 0.5 + 0.5);
      normal[i + 3] = q(rb + (0.5 - H[j]) * 0.12);
    }
  }
  return { size: S, albedo, normal };
}

/** 生成一层可无缝平铺的程序纹理（size 必须是 2 的幂） */
export function generateLayerTexture(layer: LayerId, size: number, seed: number, palette: LayerPalette): TileTextureData {
  if (size < 64 || (size & (size - 1)) !== 0) throw new Error("size must be a power of two >= 64");
  const rnd = mulberry(seed * 7919 + layer * 104729 + 1);
  const c = newCanvas(size);
  switch (layer) {
    case 0:
      fillGrass(c, rnd, palette, false);
      break;
    case 1:
      fillGrass(c, rnd, palette, true);
      break;
    case 2:
      fillDirt(c, rnd, palette);
      break;
    case 3:
      fillGravel(c, rnd, palette);
      break;
    default:
      fillRock(c, rnd, palette);
  }
  return finalize(c, layer);
}
