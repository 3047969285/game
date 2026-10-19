import type { SceneKit } from "../../world/sceneProps";
import type * as THREE from "three";
import { EMPTY_ROOM } from "./emptyRoom";
import type { StageDef } from "./types";
import { VOID_STAGE } from "./void";

export type { StageDef, StageEnvironment, StageBounds } from "./types";
export { pieceGroup } from "./types";

/** 舞台注册表：M1b 往这里加 clubRoom / apartment2090 */
const STAGES: Record<string, StageDef> = {
  [EMPTY_ROOM.name]: EMPTY_ROOM,
  [VOID_STAGE.name]: VOID_STAGE,
};

export function registerStage(def: StageDef): void {
  STAGES[def.name] = def;
}

export function getStage(name: string): StageDef {
  const def = STAGES[name];
  if (!def) throw new Error(`未知舞台: ${name}`);
  return def;
}

export function hasStage(name: string): boolean {
  return name in STAGES;
}

/** 舞台里可显形的部件名（不需要搭建几何，供脚本校验） */
export function stageTargets(name: string): string[] {
  return Object.keys(getStage(name).targets);
}

/** 搭出舞台。每个可显形部件是返回 Group 的顶层子 Group，name 唯一 */
export function buildStage(name: string, kit: SceneKit): THREE.Group {
  return getStage(name).build(kit);
}
