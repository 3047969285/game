/**
 * 词汇光球散步布局
 * 将单元词汇随机散布在地图探索区域，形成原神风格的收集点
 */
import type { WordPickup } from "../../core/types";
import { seededRand } from "../world/utils";
import { sampleTerrainY, TERRAIN_ORIGIN_Z } from "../world/worldConfig";
import { terrainHeight } from "../world/utils";

/** 地图探索区中心偏移（rw3 六单元各有其区域） */
const UNIT_CENTERS: Record<string, { x: number; z: number }> = {
  unit01: { x: -60, z: TERRAIN_ORIGIN_Z - 80 },
  unit02: { x:  60, z: TERRAIN_ORIGIN_Z - 80 },
  unit03: { x: -60, z: TERRAIN_ORIGIN_Z },
  unit04: { x:  60, z: TERRAIN_ORIGIN_Z },
  unit05: { x: -60, z: TERRAIN_ORIGIN_Z + 80 },
  unit06: { x:  60, z: TERRAIN_ORIGIN_Z + 80 },
};

const DEFAULT_CENTER = { x: 0, z: TERRAIN_ORIGIN_Z };

/** 单元探索地图的整体散布半径 */
const SPREAD_RADIUS = 85;
/** 最小间距，避免光球重叠 */
const MIN_GAP = 7;

/**
 * 为一个单元的词汇列表生成地图散步坐标
 * @param unitId  - 单元ID（如 "unit01"）或任意种子字符串
 * @param words   - [{ id, word, meaning }] 词汇列表
 * @param center  - 可选，覆盖中心点
 */
export function buildWordPickups(
  unitId: string,
  words: { id: string; word: string; meaning: string }[],
  center?: { x: number; z: number }
): WordPickup[] {
  const c = center ?? UNIT_CENTERS[unitId] ?? DEFAULT_CENTER;
  const seed = unitId.split("").reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7);
  const rand = seededRand(seed);

  const pickups: WordPickup[] = [];
  const placed: { x: number; z: number }[] = [];

  for (const w of words) {
    let attempts = 0;
    let px = 0, pz = 0;

    do {
      const angle = rand() * Math.PI * 2;
      // 距中心 10-SPREAD_RADIUS 之间，形成自然分布环形
      const r = 10 + rand() * SPREAD_RADIUS;
      px = c.x + Math.cos(angle) * r;
      pz = c.z + Math.sin(angle) * r;
      attempts++;
      if (attempts > 60) break;
    } while (placed.some((p) => Math.hypot(px - p.x, pz - p.z) < MIN_GAP));

    placed.push({ x: px, z: pz });
    const py = sampleTerrainY(px, pz, terrainHeight) + 1.6;

    pickups.push({
      id: w.id,
      word: w.word,
      meaning: w.meaning,
      x: px,
      y: py,
      z: pz,
      collected: false,
    });
  }

  return pickups;
}

/** 获取单元探索区中心（用于传送玩家） */
export function getUnitCenter(unitId: string): { x: number; z: number } {
  return UNIT_CENTERS[unitId] ?? DEFAULT_CENTER;
}
