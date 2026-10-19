import * as THREE from "three";
import { MergedBuilder } from "../../world/detailKit";
import type { SceneKit } from "../../world/sceneProps";
import type { BuildStyle, CameraShot, Vec3 } from "../types";

/**
 * 舞台定义：一个舞台 = 若干个可显形的部件（顶层子 Group，name 唯一）+ 环境参数 + 机位 / 摆放位表。
 * 新增舞台（M1b 的 clubRoom、apartment2090）只需要实现 StageDef 并在 stages/index.ts 里注册。
 */
export interface StageEnvironment {
  /** 雾 / 背景色与浓度（FogExp2） */
  fogColor: number;
  fogDensity: number;
  /** 渐变天穹（PMREM 环境反射）*/
  skyTop: number;
  skyMid: number;
  skyBot: number;
  sunColor: number;
  /** 太阳位置方向（从原点指向太阳）与满亮度强度 */
  sunDir: Vec3;
  sunIntensity: number;
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  /** 环境反射强度（满亮度） */
  envIntensity: number;
  /** 阴影相机覆盖半径（米） */
  shadowRadius: number;
}

export interface StageBounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface StageDef {
  name: string;
  /** 是否显示 2090 年的他（开场占位不显示），默认 true */
  showPlayer?: boolean;
  /** 部件名 → 默认显形风格 */
  targets: Readonly<Record<string, BuildStyle>>;
  /** 2090 年的他（玩家）可以走动的范围；相机也被限制在这个范围内 */
  bounds: StageBounds;
  /** 玩家出生点与朝向（弧度，绕 Y） */
  spawn: Vec3 & { yaw: number };
  /** 物件摆放位：桌面 / 悬空 / 地面 */
  slots: { table: Vec3[]; hover: Vec3[]; floor: Vec3[] };
  /** 常用电影机位（autoScript 循环使用） */
  shots: CameraShot[];
  environment: StageEnvironment;
  /** 搭出所有部件；kit 提供共享材质 */
  build(kit: SceneKit): THREE.Group;
}

/** 每个部件用独立的合并构建器，这样一个部件 = 少量网格，Materializer 可以单独溶解它 */
export function pieceGroup(kit: SceneKit, name: string, fill: (pk: SceneKit) => void): THREE.Group {
  const pk: SceneKit = { ...kit, kit: new MergedBuilder() };
  fill(pk);
  const group = new THREE.Group();
  group.name = name;
  pk.kit.build(group, name);
  return group;
}
