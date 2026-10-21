/**
 * 记忆色调（memory look）：每个单元一份“记忆回溯 · 科技风”调色数据。
 * 纯数据 + 纯函数，不依赖 three / DOM，可在 node 下测试。MemoryStage 与主世界（World3D）共用。
 * 约定：冷、净、通透；中性偏冷的白；暗部微青；不出现暖黄。详见 docs/api-memory-look.md。
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** 数据形态：颜色为 0xRRGGBB（sRGB） */
export interface MemoryLook {
  id: string;
  label: string;
  skyTop: number;
  skyMid: number;
  skyBot: number;
  fog: number;
  /** 相对舞台 / 生物群系自带雾浓度的倍率 */
  fogMul: number;
  sun: number;
  /** 相对舞台自带太阳强度的倍率 */
  sunMul: number;
  hemiSky: number;
  hemiGround: number;
  ambient: number;
  /** 调色：暗部 / 亮部色偏（只取色相，亮度被归一化） */
  shadowTint: number;
  highlightTint: number;
  /** 色偏强度 0..0.3 */
  tintAmt: number;
  /** 曝光倍率（相对渲染器基准曝光） */
  exposure: number;
  contrast: number;
  saturation: number;
  /** 抬黑 0..0.05 */
  lift: number;
  /** 泛光强度倍率 */
  bloom: number;
  /** 色差强度（仅暗角区域） 0..0.004 */
  aberration: number;
  /** 扫描线 / 全息微闪强度（仅暗角区域） 0..0.1 */
  scanline: number;
  vignette: number;
  /** MemoryFlow 光尘 / 字母的两种颜色 */
  dustA: number;
  dustB: number;
}

export type LookNumberKey = "fogMul" | "sunMul" | "tintAmt" | "exposure" | "contrast" | "saturation" | "lift" | "bloom" | "aberration" | "scanline" | "vignette";
export type LookColorKey = "skyTop" | "skyMid" | "skyBot" | "fog" | "sun" | "hemiSky" | "hemiGround" | "ambient" | "shadowTint" | "highlightTint" | "dustA" | "dustB";

export const LOOK_NUMBER_KEYS: readonly LookNumberKey[] = ["fogMul", "sunMul", "tintAmt", "exposure", "contrast", "saturation", "lift", "bloom", "aberration", "scanline", "vignette"];
export const LOOK_COLOR_KEYS: readonly LookColorKey[] = ["skyTop", "skyMid", "skyBot", "fog", "sun", "hemiSky", "hemiGround", "ambient", "shadowTint", "highlightTint", "dustA", "dustB"];

export type ResolvedLook = Record<LookNumberKey, number> & Record<LookColorKey, Rgb>;

const base = {
  fogMul: 1,
  sunMul: 1,
  tintAmt: 0.14,
  exposure: 1,
  contrast: 1.06,
  saturation: 1.04,
  lift: 0.012,
  bloom: 1,
  aberration: 0.0016,
  scanline: 0.035,
  vignette: 0.2,
} as const;

export const LOOKS: Record<string, MemoryLook> = {
  /** 单元 1 数字时代：青色 / 冰蓝 */
  unit01: {
    ...base, id: "unit01", label: "数字 · 冰蓝",
    skyTop: 0x2a6fb0, skyMid: 0x7fc1e4, skyBot: 0xdff3f8, fog: 0xbfe3ea,
    sun: 0xeef8ff, hemiSky: 0xbfe6f5, hemiGround: 0x35505a, ambient: 0xa8c9d6,
    shadowTint: 0x2fa8c4, highlightTint: 0xe8f6ff, dustA: 0x7fe8ff, dustB: 0xc9f3ff,
    aberration: 0.0019, scanline: 0.05,
  },
  /** 单元 2 人物传记：档案银 + 微玫瑰 */
  unit02: {
    ...base, id: "unit02", label: "传记 · 档案银",
    skyTop: 0x5a7894, skyMid: 0xb9c4d0, skyBot: 0xeadfe3, fog: 0xd3d5dc,
    sun: 0xf6f1f4, hemiSky: 0xd2d9e4, hemiGround: 0x4f4a52, ambient: 0xb8bac4,
    shadowTint: 0x6e8fb0, highlightTint: 0xf6eef2, tintAmt: 0.12, saturation: 0.94, contrast: 1.08,
    dustA: 0xcfd6e2, dustB: 0xe9c0cc, scanline: 0.028,
  },
  /** 单元 3 旅行探索：黎明青 + 柔珊瑚 */
  unit03: {
    ...base, id: "unit03", label: "旅行 · 黎明青",
    skyTop: 0x2f7f93, skyMid: 0x8ccdc8, skyBot: 0xf3d9d6, fog: 0xbfdcd6,
    sun: 0xfff1ee, hemiSky: 0xb6dcd8, hemiGround: 0x3f4f46, ambient: 0xa6c8c4,
    shadowTint: 0x2aa398, highlightTint: 0xfff0f0, tintAmt: 0.15, saturation: 1.08,
    dustA: 0x8fe3d6, dustB: 0xff9f8f,
  },
  /** 单元 4 劳动传统：石墨 + 暖中性（不黄）+ 丝绸光泽 */
  unit04: {
    ...base, id: "unit04", label: "工艺 · 石墨",
    skyTop: 0x4a5663, skyMid: 0x9aa3ab, skyBot: 0xd9d6d2, fog: 0xb9bcc0,
    sun: 0xf3ede6, hemiSky: 0xc8ccd2, hemiGround: 0x3b3a3c, ambient: 0xa8a9ad,
    shadowTint: 0x5f7688, highlightTint: 0xf2eeea, tintAmt: 0.1, saturation: 0.92, contrast: 1.1,
    dustA: 0xd9d4cd, dustB: 0xb4c2d8, bloom: 1.1, scanline: 0.03,
  },
  /** 单元 5 中国航天：深靛 + 紫色星光 */
  unit05: {
    ...base, id: "unit05", label: "航天 · 深靛",
    skyTop: 0x0e1240, skyMid: 0x3a3f8f, skyBot: 0x8a86c8, fog: 0x4a4e8c,
    sun: 0xdfe2ff, hemiSky: 0x8f99d8, hemiGround: 0x1c1a40, ambient: 0x6d73b8,
    shadowTint: 0x4a4fd0, highlightTint: 0xe6e4ff, tintAmt: 0.18, exposure: 1.04, fogMul: 1.1,
    dustA: 0xb9a8ff, dustB: 0xe3dcff, bloom: 1.2, aberration: 0.0021,
  },
  /** 单元 6 共享经济：港口板岩 + 翡翠招牌 */
  unit06: {
    ...base, id: "unit06", label: "经济 · 港湾板岩",
    skyTop: 0x34556e, skyMid: 0x7f9aa8, skyBot: 0xcfdad8, fog: 0xa9bcc0,
    sun: 0xeef4f2, hemiSky: 0xa8c0c4, hemiGround: 0x30403f, ambient: 0x8fa6aa,
    shadowTint: 0x2c9a86, highlightTint: 0xeaf4f2, tintAmt: 0.15,
    dustA: 0x4fe3a8, dustB: 0xa8c4cc,
  },
  /** 2090 年的公寓 / 开场：深蓝夜 */
  memory2090: {
    ...base, id: "memory2090", label: "2090 · 深蓝夜",
    skyTop: 0x0a1228, skyMid: 0x1c4060, skyBot: 0x203048, fog: 0x0c1424,
    sun: 0xcfe0ff, hemiSky: 0x5f86c8, hemiGround: 0x15181f, ambient: 0x4a6a96,
    shadowTint: 0x2a6fb0, highlightTint: 0xe4efff, tintAmt: 0.16, exposure: 1.02, sunMul: 0.9,
    dustA: 0x7fb4ff, dustB: 0xc4dcff, scanline: 0.04,
  },
  /** 未匹配单元 / 通用 */
  neutral: {
    ...base, id: "neutral", label: "回溯 · 冷白",
    skyTop: 0x3f77b8, skyMid: 0x9cc4e4, skyBot: 0xe4eef2, fog: 0xc6d8e2,
    sun: 0xf4f8ff, hemiSky: 0xc4daf0, hemiGround: 0x40505c, ambient: 0xb0c2d2,
    shadowTint: 0x3b8fb8, highlightTint: 0xeaf3ff, dustA: 0x8fd0e8, dustB: 0xd2e6f2,
  },
};

export function lookFor(unitId?: string): MemoryLook {
  if (!unitId) return LOOKS.neutral;
  return LOOKS[unitId] ?? LOOKS.neutral;
}

export function hexToRgb(hex: number, out: Rgb = { r: 0, g: 0, b: 0 }): Rgb {
  out.r = ((hex >> 16) & 255) / 255;
  out.g = ((hex >> 8) & 255) / 255;
  out.b = (hex & 255) / 255;
  return out;
}

export function emptyResolved(): ResolvedLook {
  const o = {} as ResolvedLook;
  for (const k of LOOK_NUMBER_KEYS) o[k] = 0;
  for (const k of LOOK_COLOR_KEYS) o[k] = { r: 0, g: 0, b: 0 };
  return o;
}

export function resolveLook(look: MemoryLook, out: ResolvedLook = emptyResolved()): ResolvedLook {
  for (const k of LOOK_NUMBER_KEYS) out[k] = look[k];
  for (const k of LOOK_COLOR_KEYS) hexToRgb(look[k], out[k]);
  return out;
}

/** 逐字段插值，无分配（out 可与 a 同一个对象） */
export function lerpLook(a: ResolvedLook, b: ResolvedLook, t: number, out: ResolvedLook): ResolvedLook {
  for (const k of LOOK_NUMBER_KEYS) out[k] = a[k] + (b[k] - a[k]) * t;
  for (const k of LOOK_COLOR_KEYS) {
    const x = a[k];
    const y = b[k];
    const o = out[k];
    o.r = x.r + (y.r - x.r) * t;
    o.g = x.g + (y.g - x.g) * t;
    o.b = x.b + (y.b - x.b) * t;
  }
  return out;
}

export const smooth01 = (t: number): number => {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  return x * x * (3 - 2 * x);
};

/**
 * 平滑切换：setTarget 之后用 smoothstep 在 seconds 内从“当前值”过渡到新 look。
 * 中途再次 setTarget 从当前混合值起步，不会跳变。
 */
export class LookBlender {
  readonly current: ResolvedLook;
  private readonly from = emptyResolved();
  private readonly to = emptyResolved();
  private elapsed = 1;
  private duration = 1;
  private _target: MemoryLook;
  /** 每次 setTarget 递增，调用方据此判断是否需要重建环境贴图等 */
  version = 0;

  constructor(initial: MemoryLook) {
    this._target = initial;
    this.current = resolveLook(initial);
    resolveLook(initial, this.from);
    resolveLook(initial, this.to);
  }

  get target(): MemoryLook {
    return this._target;
  }

  get settled(): boolean {
    return this.elapsed >= this.duration - 1e-6;
  }

  /** seconds <= 0 立即切换 */
  setTarget(look: MemoryLook, seconds = 2): void {
    if (look === this._target && this.settled) return;
    this._target = look;
    lerpLook(this.current, this.current, 0, this.from);
    resolveLook(look, this.to);
    this.duration = Math.max(0, seconds);
    this.elapsed = 0;
    this.version++;
    if (this.duration === 0) this.update(0);
  }

  update(dt: number): ResolvedLook {
    if (this.settled && this.duration > 0) return this.current;
    this.elapsed = Math.min(this.duration, this.elapsed + dt);
    const t = this.duration <= 0 ? 1 : smooth01(this.elapsed / this.duration);
    lerpLook(this.from, this.to, t, this.current);
    return this.current;
  }
}

// ── 色温 / 色相度量（测试与调参用） ──

/** 暖度：r - b（sRGB）。> 0 偏暖，< 0 偏冷 */
export function warmth(c: Rgb): number {
  return c.r - c.b;
}

export function hueSatLight(c: Rgb): { h: number; s: number; l: number } {
  const max = Math.max(c.r, c.g, c.b);
  const min = Math.min(c.r, c.g, c.b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d < 1e-6) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === c.r) h = ((c.g - c.b) / d) % 6;
  else if (max === c.g) h = (c.b - c.r) / d + 2;
  else h = (c.r - c.g) / d + 4;
  h *= 60;
  if (h < 0) h += 360;
  return { h, s, l };
}

/** 参与“偏不偏暖”判定的关键色 */
export function lookKeyColors(look: MemoryLook): number[] {
  return [look.skyTop, look.skyMid, look.skyBot, look.fog, look.sun, look.hemiSky, look.ambient, look.shadowTint, look.highlightTint, look.dustA, look.dustB];
}

/** 色偏向量（亮度归一化后的乘子，着色器用） */
export function normalizedTint(c: Rgb, out: [number, number, number]): [number, number, number] {
  const l = Math.max(0.05, c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722);
  out[0] = c.r / l;
  out[1] = c.g / l;
  out[2] = c.b / l;
  return out;
}
