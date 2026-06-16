/** 世界尺度与探险参数 */
export const TERRAIN_SIZE = { width: 420, depth: 520 };
export const TERRAIN_SEGMENTS = { w: 140, d: 168 };
export const TERRAIN_ORIGIN_Y = -0.5;
export const TERRAIN_ORIGIN_Z = 100;

export const INTERACT_RADIUS = 12;
export const PLAYER_SPEED = 18;
export const PLAYER_TURN_SPEED = 10;
export const CAMERA_DISTANCE = 11;
export const CAMERA_HEIGHT = 5.2;

/** 世界坐标 → 地形高度 */
export function sampleTerrainY(worldX: number, worldZ: number, heightFn: (x: number, z: number) => number): number {
  return heightFn(worldX, worldZ - TERRAIN_ORIGIN_Z) + TERRAIN_ORIGIN_Y;
}
