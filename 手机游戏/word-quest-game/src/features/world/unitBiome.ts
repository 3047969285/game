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
  /** Focused learning-scene framing; omit to use the shared defaults. */
  focusedLandscapeScale?: number;
  focusedLandscapeOffsetZ?: number;
}

export const UNIT_BIOMES: Record<string, UnitBiome> = {
  /** 数字时代 — 深蓝夜空、青绿信号花园与电讯蓝节点 */
  unit01: {
    id: "unit01", label: "数字时代",
    skyTop: 0x061723, skyMid: 0x163c4b, skyBot: 0x6b9683,
    fogColor: 0x4a6b61, fogDensity: 0.0026,
    sunColor: 0xbce7d3, sunIntensity: 1.25, sunDiscScale: 20, sunDiscOpacity: 0.24,
    sunFocusedDiscScale: 24, sunFocusedDiscOpacity: 0.32,
    hemiSky: 0x7bbab3, hemiGround: 0x213a30,
    ambientColor: 0x4b8581,
    terrainTint: [0.06, 0.42, 0.1],
    crystalColor: 0x50a8ff, orbColor: 0x35e3ce, glowColor: 0x188f91,
    pathColor: 0x247e83,
    decorStyle: "coast",
  },
  /** 人物传记 — 档案馆晨光：温暖旧金与中性石色，保留历史感但不压暗细节。 */
  unit02: {
    id: "unit02", label: "传记人物",
    skyTop: 0x40566b, skyMid: 0x9b927f, skyBot: 0xdcc9a8,
    fogColor: 0x958a77, fogDensity: 0.0024,
    sunColor: 0xffd9a6, sunIntensity: 1.5,
    hemiSky: 0xe2d5bf, hemiGround: 0x625344,
    ambientColor: 0xa79577,
    terrainTint: [0.34, 0.28, 0.19],
    crystalColor: 0xb98742, orbColor: 0xe2c580, glowColor: 0x9d6d31,
    pathColor: 0x76562f,
    decorStyle: "market",
    focusedLandscapeScale: 0.86,
    focusedLandscapeOffsetZ: 7,
  },
  /** 旅行探索 — 林间晨路：保留自然绿意，用晨光和灰绿远景维持方向感与可读性。 */
  unit03: {
    id: "unit03", label: "旅行探索",
    skyTop: 0x13252c, skyMid: 0x49695a, skyBot: 0x91a795,
    fogColor: 0x5b7065, fogDensity: 0.0028,
    sunColor: 0xffd1a1, sunIntensity: 1.2,
    hemiSky: 0xadc6bf, hemiGround: 0x3d4033,
    ambientColor: 0x899c88,
    terrainTint: [0.15, 0.23, 0.13],
    crystalColor: 0x83b68a, orbColor: 0xb8d28e, glowColor: 0x71a68c,
    pathColor: 0x536f56,
    decorStyle: "forest",
  },
  /** 劳动传统 — 柔和工坊暖光：让木作、金属工具和琥珀色灯光有清晰层次。 */
  unit04: {
    id: "unit04", label: "劳动传统",
    skyTop: 0x1d1b1a, skyMid: 0x51463b, skyBot: 0x837765,
    fogColor: 0x4e443b, fogDensity: 0.0028,
    sunColor: 0xffd6a0, sunIntensity: 1.25,
    hemiSky: 0xcbb8a1, hemiGround: 0x352f29,
    ambientColor: 0x8c7964,
    terrainTint: [0.2, 0.15, 0.1],
    crystalColor: 0xc99658, orbColor: 0xe4bf7c, glowColor: 0xb47a42,
    pathColor: 0x775d40,
    decorStyle: "temple",
  },
  /** 中国航天 — 月面晨光：冷静的银蓝远景，保证月球地形和探测器轮廓有明暗层次。 */
  unit05: {
    id: "unit05", label: "航天探索",
    skyTop: 0x11192c, skyMid: 0x344b6a, skyBot: 0x718394,
    fogColor: 0x516377, fogDensity: 0.0026,
    sunColor: 0xd5e5ff, sunIntensity: 1.15,
    hemiSky: 0xa7bad2, hemiGround: 0x333947,
    ambientColor: 0x7389a8,
    terrainTint: [0.2, 0.21, 0.25],
    crystalColor: 0x93bde8, orbColor: 0xdbeaff, glowColor: 0x79a8df,
    pathColor: 0x526d88,
    decorStyle: "space",
  },
  /** 共享经济 — 暮色中的共益交易城：暖石、旧木与低饱和青绿。 */
  unit06: {
    id: "unit06", label: "共益交易城",
    skyTop: 0x102b3a, skyMid: 0x416c70, skyBot: 0x607d79,
    fogColor: 0x344d52, fogDensity: 0.0028,
    sunColor: 0xffd39a, sunIntensity: 1.25,
    hemiSky: 0x9bbfca, hemiGround: 0x40352d,
    ambientColor: 0x78999a,
    terrainTint: [0.085, 0.13, 0.125],
    crystalColor: 0xd5a36f, orbColor: 0x7dc9b0, glowColor: 0x4e9f91,
    pathColor: 0x356d67,
    decorStyle: "exchange",
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
