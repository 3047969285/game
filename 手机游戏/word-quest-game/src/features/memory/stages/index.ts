import type { SceneKit } from "../../world/sceneProps";
import type * as THREE from "three";
import { APARTMENT_2090 } from "./apartment2090";
import { CLUB_ROOM } from "./clubRoom";
import { EMPTY_ROOM } from "./emptyRoom";
import type { StageDef } from "./types";
import { VOID_STAGE } from "./void";

export type { StageDef, StageEnvironment, StageBounds } from "./types";
export { pieceGroup, addDisposer } from "./types";
export { CLUB_SEATS } from "./clubRoom";
export { APARTMENT } from "./apartment2090";

/** 舞台注册表：通用 emptyRoom、空舞台 void，以及两个手写舞台 clubRoom（《周四的沉默》）与 apartment2090（开场） */
const STAGES: Record<string, StageDef> = {
  [EMPTY_ROOM.name]: EMPTY_ROOM,
  [VOID_STAGE.name]: VOID_STAGE,
  [CLUB_ROOM.name]: CLUB_ROOM,
  [APARTMENT_2090.name]: APARTMENT_2090,
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
