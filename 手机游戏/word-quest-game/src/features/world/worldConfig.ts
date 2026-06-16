/** 世界尺度与探险参数 */
/** 探索地图尺寸（企业级大世界） */
export const TERRAIN_SIZE = { width: 720, depth: 880 };
/** 地形网格细分（更高密度以承载分形起伏细节） */
export const TERRAIN_SEGMENTS = { w: 216, d: 264 };
export const TERRAIN_ORIGIN_Y = -0.5;
export const TERRAIN_ORIGIN_Z = 180;

export const INTERACT_RADIUS = 12;
export const PLAYER_SPEED = 22;
export const PLAYER_TURN_SPEED = 10;
export const CAMERA_DISTANCE = 12.5;
export const CAMERA_HEIGHT = 6.0;

/** 世界坐标 → 地形高度 */
export function sampleTerrainY(worldX: number, worldZ: number, heightFn: (x: number, z: number) => number): number {
  return heightFn(worldX, worldZ - TERRAIN_ORIGIN_Z) + TERRAIN_ORIGIN_Y;
}
