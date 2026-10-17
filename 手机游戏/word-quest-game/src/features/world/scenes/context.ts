import * as THREE from "three";
import { Frame, createSceneKit, type SceneKit } from "../sceneProps";
import { createPerson, type PersonOptions } from "../people";

/**
 * 段落微世界的场景上下文。
 * 约定：舞台中心在世界坐标 (0, 1.16, 27)（石砌平台台面高 1.16），观众相机在 -Z 一侧看向 +Z；
 * 场景用"局部米制坐标"建模：局部 +z 朝向观众（即世界 -Z），局部 +x 对应世界 -X，整体放大 SCENE_SCALE。
 */
export const SCENE_SCALE = 1.5;
export const STAGE_Y = 1.16;
export const STAGE_Z = 27;

export interface SceneContext {
  root: THREE.Group;
  glow: THREE.MeshStandardMaterial;
  edge: THREE.MeshStandardMaterial;
  dark: THREE.MeshStandardMaterial;
  ground: THREE.MeshStandardMaterial;
  accent: THREE.Color;
  /** 世界原生的信标 / 光环（沿用旧约定：isLandscapeBeacon / isLandscapeRing） */
  beacon: (y?: number) => THREE.Mesh;
  ring: (radius: number, y: number, rotation?: number) => THREE.Mesh;
}

export type SceneModule = (ctx: SceneContext) => void;

export interface Stage {
  ctx: SceneContext;
  k: SceneKit;
  /** 舞台根坐标系（局部 +z 朝向观众） */
  f: Frame;
}

export function createStage(ctx: SceneContext): Stage {
  const k = createSceneKit();
  const f = new Frame(k.kit, 0, STAGE_Y, STAGE_Z, Math.PI, SCENE_SCALE);
  return { ctx, k, f };
}

/** 局部 (lx, lz) → 世界 (x, z) */
export function worldXZ(lx: number, lz: number): [number, number] {
  return [-lx * SCENE_SCALE, STAGE_Z - lz * SCENE_SCALE];
}

/** 放置人物：局部坐标 + 局部朝向 yaw（0 = 面向观众） */
export function placePerson(ctx: SceneContext, opts: PersonOptions, lx: number, ly: number, lz: number, yaw = 0): THREE.Group {
  const person = createPerson({ scale: SCENE_SCALE, ...opts });
  const [x, z] = worldXZ(lx, lz);
  person.position.set(x, STAGE_Y + ly * SCENE_SCALE, z);
  person.rotation.y = Math.PI + yaw;
  ctx.root.add(person);
  return person;
}

/** 世界坐标发光小球（beacon 动画） */
export function addBeacon(ctx: SceneContext, material: THREE.Material, lx: number, ly: number, lz: number, radius = 0.12): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius * SCENE_SCALE, 20, 14), material);
  const [x, z] = worldXZ(lx, lz);
  mesh.position.set(x, STAGE_Y + ly * SCENE_SCALE, z);
  mesh.userData.isLandscapeBeacon = true;
  ctx.root.add(mesh);
  return mesh;
}

/** 局部坐标圆角发光牌（通知气泡等），可作为信标浮动 */
export function addGlowCard(ctx: SceneContext, material: THREE.Material, lx: number, ly: number, lz: number, w: number, h: number, yaw = 0, bob = true): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w * SCENE_SCALE, h * SCENE_SCALE, 0.04 * SCENE_SCALE), material);
  const [x, z] = worldXZ(lx, lz);
  mesh.position.set(x, STAGE_Y + ly * SCENE_SCALE, z);
  mesh.rotation.y = Math.PI + yaw;
  if (bob) mesh.userData.isLandscapeBeacon = true;
  ctx.root.add(mesh);
  return mesh;
}

/** 把合并后的静态件放进场景 */
export function finishStage(stage: Stage, name: string): void {
  stage.k.kit.build(stage.ctx.root, name, { isLandscapeStage: true });
}

/** 画布招牌：返回可直接贴到平面上的纹理（沿用旧场景的深色底 + 描边 + 居中文字风格） */
export function makeSignTexture(
  lines: Array<{ text: string; y: number; font: string; color?: string }>,
  opts: { width?: number; height?: number; background?: string; border?: string } = {}
): THREE.CanvasTexture | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = opts.width ?? 1200;
  canvas.height = opts.height ?? 320;
  const g = canvas.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = opts.background ?? "#263d3b";
  g.fillRect(0, 0, canvas.width, canvas.height);
  g.strokeStyle = opts.border ?? "#d6c49d";
  g.lineWidth = 8;
  g.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (const line of lines) {
    g.font = line.font;
    g.fillStyle = line.color ?? "#f6eedb";
    g.fillText(line.text, canvas.width / 2, line.y);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}