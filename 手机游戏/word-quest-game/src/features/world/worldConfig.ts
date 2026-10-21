/** 世界尺度与探险参数 */
/** 探索地图尺寸（企业级大世界） */
export const TERRAIN_SIZE = { width: 720, depth: 880 };
/** 地形网格细分（更高密度以承载分形起伏细节） */
export const TERRAIN_SEGMENTS = { w: 216, d: 264 };
export const TERRAIN_ORIGIN_Y = -0.5;
export const TERRAIN_ORIGIN_Z = 180;

export const INTERACT_RADIUS = 12;
export const PLAYER_SPEED = 2.2;
export const PLAYER_TURN_SPEED = 10;
/** 默认第三人称镜头与角色的距离（米）。 */
export const CAMERA_DISTANCE = 4.2;
/** 相机注视点在人物胸肩高度，俯仰围绕该点旋转。 */
export const CAMERA_HEIGHT = 1.45;

/** 世界坐标 → 地形高度 */
export function sampleTerrainY(worldX: number, worldZ: number, heightFn: (x: number, z: number) => number): number {
  return heightFn(worldX, worldZ - TERRAIN_ORIGIN_Z) + TERRAIN_ORIGIN_Y;
}
