/** 每个单元专属的生物群系主题 — 原神风格地图氛围 */

import * as THREE from "three";

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
  /** Optional per-biome sun sprite tuning for scene readability. */
  sunDiscScale?: number;
  sunDiscOpacity?: number;
  /** Focused article scenes may use a quieter sun so the landmark stays legible. */
  sunFocusedDiscScale?: number;
  sunFocusedDiscOpacity?: number;
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
  decorStyle: "forest" | "coast" | "temple" | "market" | "exchange" | "plains" | "space";
  /** 地表配色（草 / 土 / 岩），缺省时由 terrainTint 推导 */
  ground?: { grass: number; dirt: number; rock: number };
  /** Focused learning-scene framing; omit to use the shared defaults. */
  focusedLandscapeScale?: number;
  focusedLandscapeOffsetZ?: number;
}

export const UNIT_BIOMES: Record<string, UnitBiome> = {
  /** 数字时代 — 深蓝夜空、青绿信号花园与电讯蓝节点 */
  unit01: {
    id: "unit01", label: "数字时代",
    skyTop: 0x3a78b6, skyMid: 0x80b5dc, skyBot: 0xd8e8e8,
    fogColor: 0xb4cfd0, fogDensity: 0.0012,
    sunColor: 0xf2f8ff, sunIntensity: 2.0, sunDiscScale: 20, sunDiscOpacity: 0.3,
    sunFocusedDiscScale: 24, sunFocusedDiscOpacity: 0.32,
    hemiSky: 0xb7d6ee, hemiGround: 0x4d5a3d,
    ambientColor: 0xaab9c8,
    terrainTint: [0.06, 0.42, 0.1],
    crystalColor: 0x50a8ff, orbColor: 0x35e3ce, glowColor: 0x188f91,
    pathColor: 0x247e83,
    decorStyle: "coast",
    ground: { grass: 0x568a3e, dirt: 0x86704f, rock: 0x7a7e78 },
  },
  /** 人物传记 — 档案馆晨光：温暖旧金与中性石色，保留历史感但不压暗细节。 */
  unit02: {
    id: "unit02", label: "传记人物",
    skyTop: 0x4d7fb0, skyMid: 0xa9c4d8, skyBot: 0xf0e1c4,
    fogColor: 0xd8ccb0, fogDensity: 0.0012,
    sunColor: 0xf6eef2, sunIntensity: 2.0,
    hemiSky: 0xd8e2ee, hemiGround: 0x6a5c48,
    ambientColor: 0xc0b49c,
    terrainTint: [0.34, 0.28, 0.19],
    crystalColor: 0xb98742, orbColor: 0xe2c580, glowColor: 0x9d6d31,
    pathColor: 0x76562f,
    decorStyle: "market",
    ground: { grass: 0x8a9455, dirt: 0x8d6d47, rock: 0x8c8272 },
    focusedLandscapeScale: 0.86,
    focusedLandscapeOffsetZ: 7,
  },
  /** 旅行探索 — 林间晨路：保留自然绿意，用晨光和灰绿远景维持方向感与可读性。 */
  unit03: {
    id: "unit03", label: "旅行探索",
    skyTop: 0x3f7aa8, skyMid: 0x8dbbd0, skyBot: 0xdbe8e0,
    fogColor: 0xb4c9b8, fogDensity: 0.0012,
    sunColor: 0xfff2f0, sunIntensity: 1.9,
    hemiSky: 0xc0d8d4, hemiGround: 0x4a4c36,
    ambientColor: 0xa9bba8,
    terrainTint: [0.15, 0.23, 0.13],
    crystalColor: 0x83b68a, orbColor: 0xb8d28e, glowColor: 0x71a68c,
    pathColor: 0x536f56,
    decorStyle: "forest",
    ground: { grass: 0x4c7d4a, dirt: 0x6d583c, rock: 0x626c64 },
  },
  /** 劳动传统 — 柔和工坊暖光：让木作、金属工具和琥珀色灯光有清晰层次。 */
  unit04: {
    id: "unit04", label: "劳动传统",
    skyTop: 0x4a74a0, skyMid: 0xa0b8c8, skyBot: 0xeadcc0,
    fogColor: 0xcdbfa6, fogDensity: 0.0018,
    sunColor: 0xf4eee8, sunIntensity: 1.9,
    hemiSky: 0xd6c9b6, hemiGround: 0x4a4034,
    ambientColor: 0xb09c84,
    terrainTint: [0.2, 0.15, 0.1],
    crystalColor: 0xc99658, orbColor: 0xe4bf7c, glowColor: 0xb47a42,
    pathColor: 0x775d40,
    decorStyle: "temple",
    ground: { grass: 0x7a7c46, dirt: 0x7d5f3d, rock: 0x71695c },
  },
  /** 中国航天 — 月面晨光：冷静的银蓝远景，保证月球地形和探测器轮廓有明暗层次。 */
  unit05: {
    id: "unit05", label: "航天探索",
    skyTop: 0x1a2a4c, skyMid: 0x4a6a96, skyBot: 0xaebfd0,
    fogColor: 0x8ea0b4, fogDensity: 0.0012,
    sunColor: 0xe6f0ff, sunIntensity: 2.0,
    hemiSky: 0xb8c8dc, hemiGround: 0x484e5c,
    ambientColor: 0x90a4c0,
    terrainTint: [0.2, 0.21, 0.25],
    crystalColor: 0x93bde8, orbColor: 0xdbeaff, glowColor: 0x79a8df,
    pathColor: 0x526d88,
    decorStyle: "space",
    ground: { grass: 0x8e929d, dirt: 0x7c7f88, rock: 0x9ca2ad },
  },
  /** 共享经济 — 暮色中的共益交易城：暖石、旧木与低饱和青绿。 */
  unit06: {
    id: "unit06", label: "共益交易城",
    skyTop: 0x3d78a8, skyMid: 0x86b6cc, skyBot: 0xdce6dc,
    fogColor: 0xb5cbc4, fogDensity: 0.0012,
    sunColor: 0xeef4f2, sunIntensity: 1.9,
    hemiSky: 0xb4d2da, hemiGround: 0x4a3f34,
    ambientColor: 0x98b4b4,
    terrainTint: [0.085, 0.13, 0.125],
    crystalColor: 0xd5a36f, orbColor: 0x7dc9b0, glowColor: 0x4e9f91,
    pathColor: 0x356d67,
    decorStyle: "exchange",
    ground: { grass: 0x5a8444, dirt: 0x7d6549, rock: 0x716f66 },
  },
};

/** 默认生物群系（CET4/6 或未匹配时） */
export const DEFAULT_BIOME: UnitBiome = {
  id: "default", label: "",
  // 明亮的上午：深蓝天顶 → 浅蓝中层 → 近地平线的暖白雾霭
  skyTop: 0x3f77b8, skyMid: 0x86b4de, skyBot: 0xdfe7ea,
  fogColor: 0xbdd0dc, fogDensity: 0.0012,
  sunColor: 0xf4f8ff, sunIntensity: 2.1,
  hemiSky: 0xbcd6f2, hemiGround: 0x5b5a3e,
  ambientColor: 0xb4c4d4,
  terrainTint: [0.12, 0.3, 0.1],
  crystalColor: 0x60a5fa, orbColor: 0x80c0ff, glowColor: 0x4090ee,
  pathColor: 0x3060a0,
  decorStyle: "forest",
  ground: { grass: 0x5d8a3c, dirt: 0x7a6040, rock: 0x7a7d78 },
};
export function getBiome(unitId?: string): UnitBiome {
  if (!unitId) return DEFAULT_BIOME;
  return UNIT_BIOMES[unitId] ?? DEFAULT_BIOME;
}

/** 地表配色：优先使用单元自定义，否则由 terrainTint 推导出自然的草 / 土 / 岩三色。 */
export function getGroundPalette(biome: UnitBiome): { grass: number; dirt: number; rock: number } {
  if (biome.ground) return biome.ground;

  const [r, g, b] = biome.terrainTint;
  const c = new THREE.Color(r, g, b);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);

  // 以主题色相为基准，提升饱和与亮度，得到可读的自然草地色
  const grass = new THREE.Color().setHSL(hsl.h, Math.min(1, hsl.s * 0.85 + 0.28), 0.34);
  // 泥土：色相偏暖，降低饱和
  const dirt = new THREE.Color().setHSL((hsl.h + 0.07) % 1, Math.min(1, hsl.s * 0.5 + 0.18), 0.33);
  // 岩石：几乎去饱和，略亮
  const rock = new THREE.Color().setHSL(hsl.h, Math.min(1, hsl.s * 0.16), 0.46);

  return {
    grass: grass.getHex(),
    dirt: dirt.getHex(),
    rock: rock.getHex(),
  };
}
