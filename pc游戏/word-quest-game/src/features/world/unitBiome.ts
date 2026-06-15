/** 每个单元专属的生物群系主题 — 原神风格地图氛围 */

export interface UnitBiome {
  id: string;
  label: string;
  /** 天空颜色 top / mid / bottom */
  skyTop: number;
  skyMid: number;
  skyBot: number;
  fogColor: number;
  fogDensity: number;
  sunColor: number;
  sunIntensity: number;
  hemiSky: number;
  hemiGround: number;
  ambientColor: number;
  /** 地形顶点颜色 (r g b 0~1) */
  terrainTint: [number, number, number];
  /** 主水晶/地标颜色 */
  crystalColor: number;
  /** 词汇光球颜色 */
  orbColor: number;
  /** 光球辉光颜色 */
  glowColor: number;
  /** 路径颜色 */
  pathColor: number;
  /** 装饰风格 */
  decorStyle: "forest" | "coast" | "temple" | "market" | "plains" | "space";
}

export const UNIT_BIOMES: Record<string, UnitBiome> = {
  /** 数字时代 — 赛博蓝 */
  unit01: {
    id: "unit01", label: "数字时代",
    skyTop: 0x040e1e, skyMid: 0x0c2244, skyBot: 0x081630,
    fogColor: 0x0e2038, fogDensity: 0.0030,
    sunColor: 0x50aaff, sunIntensity: 1.0,
    hemiSky: 0x2060b0, hemiGround: 0x081828,
    ambientColor: 0x1850a0,
    terrainTint: [0.04, 0.14, 0.28],
    crystalColor: 0x40a8ff, orbColor: 0x00d4ff, glowColor: 0x0088ff,
    pathColor: 0x1060b0,
    decorStyle: "coast",
  },
  /** 传记人物 — 晨曦金 */
  unit02: {
    id: "unit02", label: "传记人物",
    skyTop: 0x0e0804, skyMid: 0x30180a, skyBot: 0x1a0e06,
    fogColor: 0x281408, fogDensity: 0.0028,
    sunColor: 0xffcc50, sunIntensity: 1.5,
    hemiSky: 0xd08030, hemiGround: 0x281804,
    ambientColor: 0x804020,
    terrainTint: [0.22, 0.12, 0.04],
    crystalColor: 0xffaa00, orbColor: 0xffd060, glowColor: 0xffb820,
    pathColor: 0xa06020,
    decorStyle: "market",
  },
  /** 旅行探索 — 翡翠丛林 */
  unit03: {
    id: "unit03", label: "旅行探索",
    skyTop: 0x061610, skyMid: 0x123824, skyBot: 0x0a2018,
    fogColor: 0x102818, fogDensity: 0.0038,
    sunColor: 0x90ffb0, sunIntensity: 1.2,
    hemiSky: 0x40c060, hemiGround: 0x081c10,
    ambientColor: 0x1a4428,
    terrainTint: [0.06, 0.22, 0.10],
    crystalColor: 0x40e060, orbColor: 0x60ff80, glowColor: 0x20d050,
    pathColor: 0x1a7030,
    decorStyle: "forest",
  },
  /** 劳动传统 — 赤陶暖土 */
  unit04: {
    id: "unit04", label: "劳动传统",
    skyTop: 0x0e0804, skyMid: 0x2c1408, skyBot: 0x180c04,
    fogColor: 0x221004, fogDensity: 0.0032,
    sunColor: 0xff8830, sunIntensity: 1.4,
    hemiSky: 0xc04818, hemiGround: 0x200c04,
    ambientColor: 0x602010,
    terrainTint: [0.28, 0.12, 0.04],
    crystalColor: 0xff6818, orbColor: 0xff9040, glowColor: 0xff5010,
    pathColor: 0x904018,
    decorStyle: "temple",
  },
  /** 中国航天 — 星际紫 */
  unit05: {
    id: "unit05", label: "航天探索",
    skyTop: 0x020208, skyMid: 0x0c0820, skyBot: 0x06041a,
    fogColor: 0x080618, fogDensity: 0.0025,
    sunColor: 0xc080ff, sunIntensity: 0.8,
    hemiSky: 0x6018c0, hemiGround: 0x100830,
    ambientColor: 0x380c60,
    terrainTint: [0.08, 0.04, 0.22],
    crystalColor: 0xc060ff, orbColor: 0xe080ff, glowColor: 0x9030e0,
    pathColor: 0x5018a0,
    decorStyle: "space",
  },
  /** 共享经济 — 霓虹暮色 */
  unit06: {
    id: "unit06", label: "共享经济",
    skyTop: 0x100612, skyMid: 0x2c0c28, skyBot: 0x180812,
    fogColor: 0x200818, fogDensity: 0.0035,
    sunColor: 0xff50b0, sunIntensity: 1.0,
    hemiSky: 0xd02880, hemiGround: 0x200812,
    ambientColor: 0x501840,
    terrainTint: [0.18, 0.04, 0.16],
    crystalColor: 0xff30a0, orbColor: 0xff60c8, glowColor: 0xe01880,
    pathColor: 0x801860,
    decorStyle: "temple",
  },
};

/** 默认生物群系（CET4/6 或未匹配时） */
export const DEFAULT_BIOME: UnitBiome = {
  id: "default", label: "",
  skyTop: 0x3a5a8a, skyMid: 0x5a7aaa, skyBot: 0x0a1020,
  fogColor: 0x1a2540, fogDensity: 0.0042,
  sunColor: 0xfff4e0, sunIntensity: 1.45,
  hemiSky: 0xc8e0ff, hemiGround: 0x243828,
  ambientColor: 0x9ab0cc,
  terrainTint: [0.09, 0.20, 0.10],
  crystalColor: 0x60a5fa, orbColor: 0x80c0ff, glowColor: 0x4090ee,
  pathColor: 0x3060a0,
  decorStyle: "forest",
};

export function getBiome(unitId?: string): UnitBiome {
  if (!unitId) return DEFAULT_BIOME;
  return UNIT_BIOMES[unitId] ?? DEFAULT_BIOME;
}
