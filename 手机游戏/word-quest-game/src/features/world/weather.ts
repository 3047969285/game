/**
 * 天气系统（纯逻辑，无 three / DOM 依赖）：天气种类、参数预设、状态机、粒子预算。
 * 渲染见 weatherFx.ts；回忆舞台与主世界共用。详见 docs/api-memory-look.md §2.2。
 */

import type { Rgb } from "../memory/memoryLooks";

export type WeatherKind = "clear" | "overcast" | "lightRain" | "heavyRain" | "drizzleMist" | "snow" | "windGusts" | "dusk" | "night";

export const WEATHER_KINDS: readonly WeatherKind[] = ["clear", "overcast", "lightRain", "heavyRain", "drizzleMist", "snow", "windGusts", "dusk", "night"];

export function isWeatherKind(x: unknown): x is WeatherKind {
  return typeof x === "string" && (WEATHER_KINDS as readonly string[]).includes(x);
}

export interface WeatherParams {
  /** 云量 0..1（天空着色器的积云覆盖） */
  cloud: number;
  /** 直射光强度倍率 */
  sunMul: number;
  hemiMul: number;
  envMul: number;
  exposureMul: number;
  /** 雾浓度倍率 */
  fogMul: number;
  /** 天空向灰色混合的比例 0..1 */
  skyGrey: number;
  /** 天空亮度倍率 */
  skyDark: number;
  /** 直射光色乘子（在 look 的太阳色上再乘） */
  sunTintR: number;
  sunTintG: number;
  sunTintB: number;
  /** 天空染色（黄昏的珊瑚紫、夜的深蓝） */
  skyTintR: number;
  skyTintG: number;
  skyTintB: number;
  skyTintAmt: number;
  /** 降水强度 0..1 */
  rain: number;
  snow: number;
  /** 薄雾强度 0..1（额外雾浓度） */
  mist: number;
  /** 基础风力 0..1 与阵风幅度 0..1 */
  wind: number;
  gust: number;
  /** 地面潮湿目标 0..1 */
  wetTarget: number;
}

export const WEATHER_PARAM_KEYS: readonly (keyof WeatherParams)[] = [
  "cloud", "sunMul", "hemiMul", "envMul", "exposureMul", "fogMul", "skyGrey", "skyDark",
  "sunTintR", "sunTintG", "sunTintB", "skyTintR", "skyTintG", "skyTintB", "skyTintAmt",
  "rain", "snow", "mist", "wind", "gust", "wetTarget",
];

const P = (p: Partial<WeatherParams>): WeatherParams => ({
  cloud: 0.12, sunMul: 1, hemiMul: 1, envMul: 1, exposureMul: 1, fogMul: 1, skyGrey: 0, skyDark: 1,
  sunTintR: 1, sunTintG: 1, sunTintB: 1, skyTintR: 0.5, skyTintG: 0.5, skyTintB: 0.5, skyTintAmt: 0,
  rain: 0, snow: 0, mist: 0, wind: 0.25, gust: 0.15, wetTarget: 0,
  ...p,
});

export const WEATHER_PRESETS: Record<WeatherKind, WeatherParams> = {
  clear: P({}),
  overcast: P({ cloud: 0.85, sunMul: 0.35, hemiMul: 0.95, envMul: 0.85, fogMul: 1.25, skyGrey: 0.55, skyDark: 0.82, sunTintR: 0.94, sunTintG: 0.97, sunTintB: 1, wind: 0.35, gust: 0.25 }),
  lightRain: P({ cloud: 0.92, sunMul: 0.22, hemiMul: 0.85, envMul: 0.8, exposureMul: 1.02, fogMul: 1.5, skyGrey: 0.66, skyDark: 0.72, sunTintR: 0.9, sunTintG: 0.95, sunTintB: 1, rain: 0.45, wind: 0.4, gust: 0.3, wetTarget: 0.7 }),
  heavyRain: P({ cloud: 1, sunMul: 0.1, hemiMul: 0.7, envMul: 0.65, exposureMul: 1.06, fogMul: 2.1, skyGrey: 0.8, skyDark: 0.55, sunTintR: 0.86, sunTintG: 0.92, sunTintB: 1, rain: 1, wind: 0.7, gust: 0.6, wetTarget: 1 }),
  drizzleMist: P({ cloud: 0.8, sunMul: 0.28, hemiMul: 0.9, envMul: 0.85, fogMul: 2.8, skyGrey: 0.6, skyDark: 0.85, sunTintR: 0.94, sunTintG: 0.98, sunTintB: 1, rain: 0.16, mist: 1, wind: 0.12, gust: 0.08, wetTarget: 0.5 }),
  snow: P({ cloud: 0.9, sunMul: 0.3, hemiMul: 1, envMul: 1, exposureMul: 1.05, fogMul: 1.8, skyGrey: 0.5, skyDark: 0.9, sunTintR: 0.95, sunTintG: 0.98, sunTintB: 1.05, snow: 0.8, wind: 0.3, gust: 0.2, wetTarget: 0.2 }),
  windGusts: P({ cloud: 0.45, sunMul: 0.8, skyGrey: 0.15, wind: 0.85, gust: 1 }),
  dusk: P({ cloud: 0.4, sunMul: 0.55, hemiMul: 0.72, envMul: 0.7, exposureMul: 0.97, fogMul: 1.2, skyDark: 0.78, sunTintR: 1, sunTintG: 0.72, sunTintB: 0.82, skyTintR: 0.78, skyTintG: 0.5, skyTintB: 0.68, skyTintAmt: 0.38, wind: 0.2, gust: 0.1 }),
  night: P({ cloud: 0.3, sunMul: 0.08, hemiMul: 0.38, envMul: 0.32, exposureMul: 1.15, fogMul: 1.3, skyDark: 0.14, sunTintR: 0.55, sunTintG: 0.7, sunTintB: 1.15, skyTintR: 0.05, skyTintG: 0.1, skyTintB: 0.24, skyTintAmt: 0.86, wind: 0.18, gust: 0.1 }),
};

export type WeatherQuality = "high" | "med" | "low";

export interface PrecipBudget {
  drops: number;
  flakes: number;
  splashes: number;
}

/** 单种天气在某画质下的“满额”粒子数；low 恰为 med 的一半 */
const QUALITY_SCALE: Record<WeatherQuality, number> = { high: 1.5, med: 1, low: 0.5 };
const BASE_DROPS = 2000;
const BASE_FLAKES = 1200;
const BASE_SPLASH = 160;

/** 舞台预分配的最大粒子数（与天气种类无关，由强度裁剪） */
export function maxBudget(quality: WeatherQuality): PrecipBudget {
  const s = QUALITY_SCALE[quality];
  return { drops: Math.floor(BASE_DROPS * s), flakes: Math.floor(BASE_FLAKES * s), splashes: Math.floor(BASE_SPLASH * s) };
}

/** 某种天气当前实际活跃的粒子数（= 最大数 × 预设强度） */
export function precipitationBudget(kind: WeatherKind, quality: WeatherQuality): PrecipBudget {
  const max = maxBudget(quality);
  const p = WEATHER_PRESETS[kind];
  return { drops: Math.floor(max.drops * p.rain), flakes: Math.floor(max.flakes * p.snow), splashes: Math.floor(max.splashes * p.rain) };
}

const lerpRate = (dt: number, rate: number): number => 1 - Math.exp(-Math.max(0, dt) * rate);

/**
 * 天气状态机。set(kind, seconds) 之后参数以指数趋近新预设（约 seconds 秒到 98%）。
 * 雨 ↔ 雪互切：先把正在下的降水淡到 < 0.02，再升起新的降水，避免雨雪同屏。
 */
export class WeatherState {
  kind: WeatherKind;
  target: WeatherKind;
  readonly params: WeatherParams;
  /** 地面潮湿度 0..1：下雨时上升快，雨停后变干慢 */
  wet = 0;
  private rate = 1;
  /** 本次切换尚未完成（参数与目标预设仍有差距） */
  transitioning = false;
  version = 0;

  constructor(initial: WeatherKind = "clear") {
    this.kind = this.target = initial;
    this.params = { ...WEATHER_PRESETS[initial] };
    this.wet = this.params.wetTarget;
  }

  /** seconds <= 0 立即切换 */
  set(kind: WeatherKind, seconds = 4): void {
    if (kind === this.target && !(seconds <= 0 && this.transitioning)) return;
    this.target = kind;
    this.kind = kind;
    this.version++;
    if (seconds <= 0) {
      Object.assign(this.params, WEATHER_PRESETS[kind]);
      this.wet = this.params.wetTarget;
      this.transitioning = false;
      this.rate = 1;
      return;
    }
    this.rate = 4 / seconds;
    this.transitioning = true;
  }

  update(dt: number): void {
    if (dt <= 0) return;
    const goal = WEATHER_PRESETS[this.target];
    const p = this.params;
    const k = lerpRate(dt, this.rate);
    let maxDiff = 0;
    for (const key of WEATHER_PARAM_KEYS) {
      let g = goal[key];
      if (key === "snow" && g > 0 && p.rain > 0.02) g = 0;
      else if (key === "rain" && g > 0 && p.snow > 0.02) g = 0;
      const kk = key === "rain" || key === "snow" ? (g < p[key] ? Math.min(1, k * 1.6) : k) : k;
      p[key] += (g - p[key]) * kk;
      maxDiff = Math.max(maxDiff, Math.abs(goal[key] - p[key]));
    }
    if (this.transitioning && maxDiff < 0.004) {
      Object.assign(p, goal);
      this.transitioning = false;
    }
    const wk = lerpRate(dt, p.wetTarget > this.wet ? 0.25 : 0.05);
    this.wet += (p.wetTarget - this.wet) * wk;
  }

  /** 当前风力 0..~1.3（基础风 + 阵风包络），time 为秒 */
  windNow(time: number): number {
    const e = Math.max(0, Math.sin(time * 0.31) * Math.sin(time * 0.83 + 1.7));
    return this.params.wind + this.params.gust * e * e * 1.6;
  }

  /** 现在有没有可见的降水 */
  get precipitating(): boolean {
    return this.params.rain > 0.01 || this.params.snow > 0.01;
  }
}

/** 风力 → 植被摇摆倍率（1 = 无风时的默认摇摆） */
export function foliageWindStrength(windNow: number): number {
  return 0.75 + Math.min(1.4, windNow) * 1.1;
}

/**
 * 把天空 / 雾 / 半球光等颜色按天气调整：先压暗，再向同亮度灰色混合，最后向天空染色（黄昏珊瑚紫 / 夜蓝）混合。
 * out 可与 c 是同一个对象。strength 缩放天气对该颜色的影响（光源颜色用小一点的值）。
 */
export function weatherTint(c: Rgb, w: WeatherParams, out: Rgb, strength = 1): Rgb {
  const dark = 1 - (1 - w.skyDark) * strength;
  let r = c.r * dark;
  let g = c.g * dark;
  let b = c.b * dark;
  const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const grey = w.skyGrey * strength;
  r += (l - r) * grey;
  g += (l - g) * grey;
  b += (l - b) * grey;
  const t = w.skyTintAmt * strength;
  // 染色保持亮度：目标色按当前亮度缩放
  const tl = Math.max(0.05, w.skyTintR * 0.2126 + w.skyTintG * 0.7152 + w.skyTintB * 0.0722);
  const k = Math.max(l, 0.02) / tl;
  out.r = r + (Math.min(1, w.skyTintR * k) - r) * t;
  out.g = g + (Math.min(1, w.skyTintG * k) - g) * t;
  out.b = b + (Math.min(1, w.skyTintB * k) - b) * t;
  return out;
}

/** 主世界每个单元的默认天气（进入单元时 6 秒过渡；回到大地图恢复晴天） */
export const UNIT_DEFAULT_WEATHER: Readonly<Record<string, WeatherKind>> = {
  unit01: "clear",
  unit02: "overcast",
  unit03: "drizzleMist",
  unit04: "windGusts",
  unit05: "night",
  unit06: "lightRain",
};
