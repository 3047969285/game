/**
 * 外观多样性（纯函数 + 像素处理，可在 node 下测试）。对应 docs/api-character-motion.md「外观多样性」。
 *
 * Rocketbox 底模只有两个，每个的身体是一张贴图（夹克 / 裤 / 鞋 / 手），头是一张贴图（皮肤 + 画好的头发 / 胡子）。
 * 每个实例：按区域把夹克染成 2026 年大学生的卫衣 / 针织衫 / 衬衫外套颜色、内搭 T 恤另一种颜色、裤子 / 鞋换色，
 * 头发 / 眉 / 胡子按发色重染（可灰白）、肤色微调；身高 ±4%、肩宽 / 腰 ±3%。老人：灰白头发和胡子、皮肤暗淡并带皱纹、含胸、动作慢。
 * 贴图是 512×512，坐标按贴图像素（左上为原点）。
 */

import type { HumanLook } from "./humanIdentity";

export type Outfit = "hoodie" | "tee" | "cardigan" | "knit" | "shirtJacket";
export type BeardMode = "none" | "stubble" | "full";

export interface HumanAppearance {
  kind: "male" | "female";
  seed: number;
  outfit: Outfit;
  /** 外套 / 卫衣 / 针织衫颜色（hex） */
  outer: number;
  /** 内搭 T 恤 / 衬衫 */
  inner: number;
  trousers: number;
  shoes: number;
  shoesAccent: number;
  hair: number;
  /** 目标肤色（hex）；贴图按此做乘法校正 */
  skin: number;
  beard: BeardMode;
  aged: boolean;
  /** 眉毛颜色（hex，缺省 = 发色） */
  browColor?: number;
  /** 眉粗 / 浓 0..1 */
  browThickness: number;
  browShape?: "arched" | "straight" | "soft";
  blush: number;
  lip: number;
  lipColor: number;
  /** 雀斑 0..1 与痣（头部贴图像素坐标） */
  freckles: number;
  moles: Array<[number, number]>;
  /** 整体缩放：身高 ±4%，宽度 ±3% */
  heightScale: number;
  widthScale: number;
}

export interface AppearanceBase {
  shirt?: number;
  trousers?: number;
  hair?: number;
  skin?: number;
  outfit?: string;
  aged?: boolean;
  glasses?: boolean;
  /** 显式指定同一底模的第几个人（让一屋子人不撞衫） */
  seed?: number;
  /** 固定身份（发色 / 肤色 / 眉 / 胡茬 / 雀斑 / 痣）：覆盖随机挑选 */
  look?: HumanLook;
}

function rng(seed: number): () => number {
  let a = (seed ^ 0x9e3779b9) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rgb = (hex: number): [number, number, number] => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
const toHex = (r: number, g: number, b: number): number => (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b);

export function hexLuminance(hex: number): number {
  const [r, g, b] = rgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function hslToHex(h: number, s: number, l: number): number {
  const f = (n: number): number => {
    const k = (n + h * 12) % 12;
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return toHex(f(0) * 255, f(8) * 255, f(4) * 255);
}
function shadeHex(hex: number, dl: number): number {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s, Math.min(0.92, Math.max(0.12, l + dl)));
}
function hexToHsl(hex: number): [number, number, number] {
  const [r, g, b] = rgb(hex).map((v) => v / 255) as [number, number, number];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0, s = 0;
  if (d > 1e-6) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h / 6 + 1) % 1;
  }
  return [h, s, l];
}

/** 2026 年大学生的上衣：卫衣 / T 恤 + 衬衫外套 / 针织衫的颜色盘（不是深色西装） */
const OUTER_PALETTE: Record<Outfit, number[]> = {
  hoodie: [0x6f7782, 0x3f5875, 0x7b8f6a, 0x8e5a5e, 0xb99a58, 0x56677d, 0x9a8f86],
  tee: [0xd8d3c8, 0x7aa0b8, 0xc98d8a, 0x8fb08c, 0xe0c27a, 0xa49ac0],
  cardigan: [0x7b6a50, 0x6c7a8a, 0x8a6a5c, 0x5f7a6a],
  knit: [0xd9c9ae, 0xb9835f, 0x7a8c9e, 0xc7b8a8, 0x8b9b7a],
  shirtJacket: [0x5d7a96, 0x7b8a5a, 0x9a7a5a, 0x6f7f8f, 0xa4a099],
};
const INNER_PALETTE = [0xf0eee8, 0xdad4c6, 0x9fb7cc, 0xe8c4c0, 0xc8d6c2, 0x2f3a4a, 0xb9b2c9];
const TROUSER_PALETTE = [0x39475f, 0x2f3e55, 0x5a6577, 0x6d6a5e, 0x8b826f, 0x2b2d34, 0x4a4f58];
const HAIR_PALETTE = [0x1a1410, 0x241a14, 0x3a2a1e, 0x4a3426, 0x2a2420, 0x5a4030, 0x15110e];
const SHOE_PALETTE = [0xe8e6e0, 0xd9d6cf, 0xbfc3c9, 0x35373d, 0xe0d8c8];
const SHOE_ACCENT = [0x3d6fb5, 0xd14a4a, 0x2f2f33, 0x5aa07a, 0xe0a030];
const OUTFITS: Outfit[] = ["hoodie", "tee", "knit", "shirtJacket", "hoodie", "cardigan"];

/** 根据 seed 与剧本给的基色，挑一个具体外观。同一 seed 总是同一个人；基色（剧本的 shirt / hair …）优先但会微调。 */
export function pickAppearance(kind: "male" | "female", base: AppearanceBase = {}, seedIn?: number): HumanAppearance {
  const seed = seedIn ?? base.seed ?? 1;
  const r = rng(seed * 7919 + (kind === "male" ? 11 : 29));
  const pick = <T,>(list: readonly T[]): T => list[Math.floor(r() * list.length) % list.length];
  const aged = base.aged === true;
  const outfit = (["hoodie", "tee", "cardigan", "knit", "shirtJacket"] as const).find((o) => o === base.outfit) ?? (aged ? "cardigan" : pick(OUTFITS));
  const jitter = (hex: number, amount: number): number => {
    const [h, s, l] = hexToHsl(hex);
    return hslToHex((h + (r() - 0.5) * 0.03 + 1) % 1, Math.min(1, Math.max(0, s * (0.9 + r() * 0.2))), Math.min(0.9, Math.max(0.08, l + (r() - 0.5) * amount)));
  };
  // 剧本里的深色上衣（接近黑 / 深蓝）在贴图上会像西装：提亮到中间调
  const lift = (hex: number): number => {
    const [h, s, l] = hexToHsl(hex);
    return l < 0.28 ? hslToHex(h, Math.min(0.55, Math.max(s, 0.2)), 0.3 + r() * 0.08) : hex;
  };
  const outer = base.shirt !== undefined ? jitter(lift(base.shirt), 0.08) : pick(OUTER_PALETTE[outfit]);
  let inner = pick(INNER_PALETTE);
  if (Math.abs(hexLuminance(inner) - hexLuminance(outer)) < 0.12) inner = hexLuminance(outer) > 0.55 ? 0x2f3a4a : 0xf0eee8;
  const look = base.look;
  const hair = look ? look.hairColor : aged ? 0xcfcfd2 : base.hair !== undefined ? jitter(base.hair, 0.04) : pick(HAIR_PALETTE);
  const skinBase = base.skin ?? 0xe0b894;
  const skin = look && look.skinTone !== 0 ? shadeHex(skinBase, look.skinTone * 0.17) : skinBase;
  return {
    kind,
    seed,
    outfit,
    outer,
    inner,
    trousers: base.trousers !== undefined ? jitter(base.trousers, 0.08) : pick(TROUSER_PALETTE),
    shoes: pick(SHOE_PALETTE),
    shoesAccent: pick(SHOE_ACCENT),
    hair,
    skin,
    beard: kind === "female" ? "none" : look ? (look.facialHair ?? "none") : aged ? "full" : r() < 0.25 ? "stubble" : "none",
    aged,
    browColor: look?.browColor,
    browThickness: look?.browThickness ?? 0.5,
    browShape: look?.browShape,
    blush: look?.blush ?? 0,
    lip: look?.lip ?? 0,
    lipColor: look?.lipColor ?? 0xc0605f,
    freckles: look?.freckles ?? 0,
    moles: look?.moles ?? [],
    heightScale: look?.heightScale ?? (aged ? 0.975 : 0.96 + r() * 0.08),
    widthScale: aged ? 0.985 : 0.97 + r() * 0.06,
  };
}

// ───────────────────────── 像素处理 ─────────────────────────

type Rect = [number, number, number, number];
const inRect = (x: number, y: number, r: Rect): boolean => x >= r[0] && x < r[2] && y >= r[1] && y < r[3];
const inAny = (x: number, y: number, rects: readonly Rect[]): boolean => rects.some((r) => inRect(x, y, r));

interface BodyLayout {
  jacket: Rect[];
  pants: Rect[];
  shoes: Rect[];
  skin: Rect[];
  /** 内搭（青 / 洋红 / 红）：夹克区域内的高饱和像素也染成内搭色 */
  inner: Rect[];
}

const BODY_LAYOUT: Record<"male" | "female", BodyLayout> = {
  male: {
    jacket: [[146, 0, 366, 190], [0, 222, 152, 392], [362, 222, 512, 392], [160, 190, 352, 412]],
    pants: [[0, 0, 152, 218], [360, 0, 512, 218]],
    shoes: [[108, 352, 204, 512], [328, 340, 410, 512]],
    skin: [[0, 424, 126, 512], [384, 424, 512, 512]],
    inner: [[148, 0, 362, 100], [222, 186, 284, 314], [164, 402, 352, 448]],
  },
  female: {
    jacket: [[96, 0, 416, 256], [0, 148, 512, 258], [150, 256, 352, 412]],
    pants: [[8, 276, 158, 458], [356, 276, 506, 458]],
    shoes: [[36, 448, 158, 512], [366, 448, 502, 512]],
    skin: [[0, 0, 96, 136], [418, 0, 512, 136], [222, 224, 294, 282]],
    inner: [[232, 268, 284, 322]],
  },
};

const lum01 = (r: number, g: number, b: number): number => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const smoothstep = (e0: number, e1: number, x: number): number => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** 亮度保留的染色：目标色 × (像素亮度 / 参考亮度)，参考亮度由区域典型明度决定 */
function dye(data: Uint8ClampedArray, i: number, target: readonly [number, number, number], ref: number, lo = 0.45, hi = 1.9, mix = 1): void {
  const l = lum01(data[i], data[i + 1], data[i + 2]);
  const f = clamp(l / ref, lo, hi);
  data[i] += (clamp(target[0] * f, 0, 255) - data[i]) * mix;
  data[i + 1] += (clamp(target[1] * f, 0, 255) - data[i + 1]) * mix;
  data[i + 2] += (clamp(target[2] * f, 0, 255) - data[i + 2]) * mix;
}

/** 青 / 品红 / 红等高饱和像素（贴图里的内搭 / 鞋带） */
function vivid(r: number, g: number, b: number): boolean {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max > 60 && (max - min) / Math.max(1, max) > 0.42;
}

/** 给身体贴图（RGBA，512×512）换上本实例的衣服颜色。原地修改。 */
export function recolorBody(data: Uint8ClampedArray, width: number, height: number, app: HumanAppearance, skinMul?: readonly [number, number, number]): void {
  const layout = BODY_LAYOUT[app.kind];
  const outer = rgb(app.outer), inner = rgb(app.inner), pants = rgb(app.trousers), shoes = rgb(app.shoes), accent = rgb(app.shoesAccent);
  const refJacket = app.kind === "male" ? 0.15 : 0.13;
  const refPants = app.kind === "male" ? 0.27 : 0.42;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r + g + b < 24) continue; // 未使用的黑底（含岛的黑边）
      if (inAny(x, y, layout.skin)) {
        if (skinMul) {
          data[i] = clamp(r * skinMul[0], 0, 255);
          data[i + 1] = clamp(g * skinMul[1], 0, 255);
          data[i + 2] = clamp(b * skinMul[2], 0, 255);
        }
        continue;
      }
      if (inAny(x, y, layout.inner) && vivid(r, g, b)) {
        dye(data, i, inner, 0.45, 0.6, 1.4);
        continue;
      }
      if (inAny(x, y, layout.shoes)) {
        // 白鞋保留；青 / 洋红的鞋带和装饰换成本实例的点缀色，鞋面按鞋色轻染；黑底不动
        if (lum01(r, g, b) < 0.09 && !vivid(r, g, b)) continue;
        if (vivid(r, g, b)) dye(data, i, accent, 0.4, 0.5, 1.5);
        else dye(data, i, shoes, 0.78, 0.7, 1.15, 0.7);
        continue;
      }
      if (inAny(x, y, layout.pants)) {
        dye(data, i, pants, refPants, 0.4, 2.0);
        continue;
      }
      if (inAny(x, y, layout.jacket)) {
        if (lum01(r, g, b) > 0.38 && !vivid(r, g, b) && app.kind === "male") continue; // 领口 / 袖口的灰色内衬保持原样
        dye(data, i, outer, refJacket, 0.5, 2.4);
      }
    }
  }
}

interface HeadLayout {
  /** 头发 / 胡子的亮度阈值（低于它算毛发） */
  hairMax: number;
  /** 必须保持原样的区域（眼睑 / 眼窝） */
  eyes: Rect;
  /** 眉毛所在的窄带 */
  brows: Rect;
  /** 胡子区域（下颌 / 上唇） */
  beard: Rect;
  /** 采样脸颊肤色用的区域 */
  cheek: Rect;
}
const HEAD_LAYOUT: Record<"male" | "female", HeadLayout> = {
  male: { hairMax: 0.3, eyes: [196, 134, 322, 166], brows: [190, 112, 330, 134], beard: [140, 196, 380, 320], cheek: [190, 160, 250, 190] },
  female: { hairMax: 0.42, eyes: [196, 134, 322, 166], brows: [190, 112, 330, 134], beard: [0, 0, 0, 0], cheek: [190, 170, 240, 200] },
};

/** 脸颊平均肤色（用来算肤色乘数）；失败时返回 null */
export function sampleSkin(data: Uint8ClampedArray, width: number, kind: "male" | "female"): [number, number, number] | null {
  const c = HEAD_LAYOUT[kind].cheek;
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = c[1]; y < c[3]; y++) for (let x = c[0]; x < c[2]; x++) { const i = (y * width + x) * 4; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
  return n ? [r / n, g / n, b / n] : null;
}

/** 目标肤色 / 贴图实际肤色 → 每通道乘数（限幅，避免脸变色太狠） */
export function skinMultiplier(target: number, sampled: readonly [number, number, number] | null): [number, number, number] {
  if (!sampled) return [1, 1, 1];
  const t = rgb(target);
  return [0, 1, 2].map((c) => clamp(0.55 + 0.45 * (t[c] / Math.max(1, sampled[c])), 0.8, 1.2)) as [number, number, number];
}

function hash2(x: number, y: number, seed: number): number {
  let h = Math.imul(x * 374761393 + y * 668265263 + seed * 2246822519, 1274126177);
  h = (h ^ (h >>> 13)) >>> 0;
  return (h & 0xffff) / 0xffff;
}
function valueNoise(x: number, y: number, cell: number, seed: number): number {
  const gx = x / cell, gy = y / cell;
  const x0 = Math.floor(gx), y0 = Math.floor(gy);
  const fx = smoothstep(0, 1, gx - x0), fy = smoothstep(0, 1, gy - y0);
  const a = hash2(x0, y0, seed), b = hash2(x0 + 1, y0, seed), c = hash2(x0, y0 + 1, seed), d = hash2(x0 + 1, y0 + 1, seed);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

/** 给头部贴图（皮肤 + 画好的头发 / 眉 / 胡子）重染发色、肤色，老人加皱纹。原地修改。 */
export function recolorHead(data: Uint8ClampedArray, width: number, height: number, app: HumanAppearance, skinMul: readonly [number, number, number]): void {
  const layout = HEAD_LAYOUT[app.kind];
  const hair = rgb(app.hair);
  const brow = rgb(app.browColor ?? app.hair);
  const refHair = app.kind === "male" ? 0.17 : 0.24;
  const aged = app.aged;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r + g + b < 6) continue;
      const l = lum01(r, g, b);
      const inFaceBand = inRect(x, y, layout.eyes);
      const isBrow = inRect(x, y, layout.brows);
      const isBeard = app.kind === "male" && inRect(x, y, layout.beard) && !isBrow;
      // 下方 / 左下的嘴腔、眼球贴图不是头发（红色为主）
      const reddish = r > g * 1.55 && r > b * 1.7 && l < 0.4;
      const limit = isBeard && app.beard !== "full" ? layout.hairMax + 0.1 : isBrow ? layout.hairMax + 0.24 * app.browThickness : layout.hairMax;
      const hairness = inFaceBand || reddish || (y > 300 && x < 190 && app.kind === "male") ? 0 : 1 - smoothstep(limit - 0.14, limit, l);
      if (hairness > 0.01) {
        if (isBeard && app.beard !== "full") {
          // 无胡子 / 胡茬：向脸颊肤色混合（保留一点明暗）
          const k = app.beard === "none" ? 0.92 : 0.6;
          const skin = [r, g, b];
          const sample = skinSampleCache.get(data) ?? [200, 150, 120];
          for (let c = 0; c < 3; c++) skin[c] = sample[c] * (0.88 + 0.12 * clamp(l / 0.2, 0, 1.4)) * skinMul[c];
          data[i] += (skin[0] - r) * hairness * k;
          data[i + 1] += (skin[1] - g) * hairness * k;
          data[i + 2] += (skin[2] - b) * hairness * k;
        } else {
          dye(data, i, isBrow ? brow : hair, refHair, 0.55, aged ? 1.25 : 1.6, hairness);
        }
        continue;
      }
      // 皮肤：肤色校正；老人去饱和、变灰黄并加皱纹 / 斑
      let nr = r * skinMul[0], ng = g * skinMul[1], nb = b * skinMul[2];
      if (aged && l > 0.3 && !reddish) {
        const gray = 0.3 * nr + 0.59 * ng + 0.11 * nb;
        nr = nr + (gray - nr) * 0.2;
        ng = ng + (gray - ng) * 0.2;
        nb = nb + (gray - nb) * 0.2;
        // 皱纹：额头 / 眼角 / 法令纹的横向细纹 + 低频斑点
        const wrinkle = Math.max(0, Math.sin(y * 0.9 + valueNoise(x, y, 14, app.seed) * 4)) * valueNoise(x * 0.4, y, 9, app.seed + 3);
        const spots = valueNoise(x, y, 7, app.seed + 9);
        const k = 1 - 0.07 * wrinkle - 0.06 * Math.max(0, spots - 0.62) * 3;
        nr *= k; ng *= k; nb *= k * 0.99;
      }
      data[i] = clamp(nr, 0, 255);
      data[i + 1] = clamp(ng, 0, 255);
      data[i + 2] = clamp(nb, 0, 255);
    }
  }
}
/** 雀斑 / 痣：确定性随机（同 seed 同位置），叠在脸颊与鼻梁上（头部贴图 512×512 的脸区）。 */
export function addSkinDetails(data: Uint8ClampedArray, width: number, app: HumanAppearance): void {
  const r = rng(app.seed * 31 + 7);
  const dot = (cx: number, cy: number, radius: number, strength: number, tint: readonly [number, number, number]): void => {
    for (let y = Math.floor(cy - radius - 1); y <= cy + radius + 1; y++) for (let x = Math.floor(cx - radius - 1); x <= cx + radius + 1; x++) {
      const d = Math.hypot(x - cx, y - cy) / radius;
      if (d > 1 || x < 0 || y < 0 || x >= width || y >= width) continue;
      const k = strength * (1 - d * d);
      const i = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) data[i + c] = data[i + c] * (1 - k) + tint[c] * k;
    }
  };
  const count = Math.round(app.freckles * 140);
  for (let i = 0; i < count; i++) {
    // 两颊 + 鼻梁：左右对称分布的随机点，鼻梁居中
    const nose = r() < 0.3;
    const x = nose ? 256 + (r() - 0.5) * 30 : (r() < 0.5 ? 200 + r() * 46 : 266 + r() * 46);
    const y = nose ? 160 + r() * 28 : 168 + r() * 40;
    dot(x, y, 1.1 + r() * 1.5, 0.28 + r() * 0.2, [120, 74, 48]);
  }
  for (const [mx, my] of app.moles) dot(mx, my, 2.6, 0.75, [70, 42, 30]);
  // 眉形 / 粗细：沿曲线画（左眉在贴图 x 200–248，右眉镜像）
  if (app.browShape) {
    const brow = rgb(app.browColor ?? app.hair);
    const arch = app.browShape === "arched" ? 7 : app.browShape === "soft" ? 3.5 : 0.8;
    const th = 1.6 + 3.4 * app.browThickness;
    for (const mirror of [false, true]) for (let k = 0; k <= 40; k++) {
      const t = k / 40; // 0 外端 → 1 内端
      const x = 198 + 52 * t;
      const y = 131 - arch * Math.sin(Math.PI * Math.min(1, t * 1.25)) + 3 * t;
      const radius = th * (0.45 + 0.55 * Math.sin(Math.PI * Math.min(1, 0.25 + t * 0.9)));
      dot(mirror ? 511 - x : x, y, radius, 0.7, [brow[0] * 0.8, brow[1] * 0.8, brow[2] * 0.8]);
    }
  }
  // 淡妆：腮红 + 唇色
  if (app.blush > 0) for (const cx of [212, 300]) dot(cx, 186, 26, 0.2 * app.blush, [226, 120, 118]);
  if (app.lip > 0) {
    const lc = rgb(app.lipColor);
    for (let y = 200; y <= 216; y++) for (let x = 232; x <= 280; x++) {
      const d = ((x - 256) / 21) ** 2 + ((y - 208) / 6) ** 2;
      if (d > 1) continue;
      const i = (y * width + x) * 4, k = 0.5 * app.lip * (1 - d);
      for (let c = 0; c < 3; c++) data[i + c] = data[i + c] * (1 - k) + lc[c] * k;
    }
  }
}

const skinSampleCache = new WeakMap<Uint8ClampedArray, [number, number, number]>();
/** recolorHead 之前调用：记录原始脸颊肤色，供“去胡子”使用 */
export function rememberSkin(data: Uint8ClampedArray, width: number, kind: "male" | "female"): [number, number, number] | null {
  const s = sampleSkin(data, width, kind);
  if (s) skinSampleCache.set(data, s);
  return s;
}

// ───────────────────────── GLB 贴图提取（不依赖 GLTFLoader 的 ImageBitmap 方向问题）─────────────────────────

export interface GlbImage { name: string; mime: string; bytes: Uint8Array }

/** 从 .glb 的二进制里取出内嵌图片（按 images[].name 区分），用 createImageBitmap 解码得到“原始方向”的像素。 */
export function extractGlbImages(buffer: ArrayBuffer): GlbImage[] {
  const view = new DataView(buffer);
  const jsonLen = view.getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 20, jsonLen))) as { images?: Array<{ name?: string; mimeType?: string; bufferView?: number }>; bufferViews: Array<{ byteOffset?: number; byteLength: number }> };
  const binStart = 20 + jsonLen + 8;
  return (json.images ?? []).flatMap((image) => {
    if (image.bufferView === undefined) return [];
    const bv = json.bufferViews[image.bufferView];
    return [{ name: image.name ?? "", mime: image.mimeType ?? "image/png", bytes: new Uint8Array(buffer, binStart + (bv.byteOffset ?? 0), bv.byteLength) }];
  });
}
