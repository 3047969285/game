import * as THREE from "three";

/**
 * 每个角色独一无二的“身份”数据与脸型（docs/api-character-identity.md）。
 * FaceShape 通过 Rocketbox 脸部骨骼的静息位移 / 缩放实现（叠在休息姿势上，表情与动画照常叠加），全部限幅。
 */

export interface FaceShape {
  jawWidth: number;
  jawLength: number;
  cheekbone: number;
  cheekFull: number;
  noseLength: number;
  noseWidth: number;
  noseBridge: number;
  eyeSpacing: number;
  eyeSize: number;
  browHeight: number;
  browArch: number;
  mouthWidth: number;
  lipThickness: number;
  foreheadHeight: number;
  headAspect: number;
}

export const FACE_KEYS: readonly (keyof FaceShape)[] = [
  "jawWidth", "jawLength", "cheekbone", "cheekFull", "noseLength", "noseWidth", "noseBridge", "eyeSpacing", "eyeSize", "browHeight", "browArch", "mouthWidth", "lipThickness", "foreheadHeight", "headAspect",
];

export const NEUTRAL_FACE: FaceShape = Object.fromEntries(FACE_KEYS.map((key) => [key, 0])) as unknown as FaceShape;

export const face = (partial: Partial<FaceShape>): FaceShape => clampFace({ ...NEUTRAL_FACE, ...partial });

export function clampFace(shape: FaceShape): FaceShape {
  const out = { ...shape };
  for (const key of FACE_KEYS) out[key] = Math.min(1, Math.max(-1, Number.isFinite(out[key]) ? out[key] : 0));
  return out;
}

export type HairStyleId =
  | "messyCrop" | "sidePart" | "buzz" | "wavy" | "shortTieUp"
  | "bob" | "highPonytail" | "lowPonytail" | "longStraight" | "earShort" | "sideBun"
  | "thinningSwept";

export type AccessoryId = "roundGlasses" | "squareGlasses" | "metalRoundGlasses" | "neckHeadphones" | "hairClip" | "backpack";

/** 渲染需要的身份子集（characters.ts 里的 CharacterIdentity 转换得到）。 */
export interface HumanLook {
  face: FaceShape;
  hairStyle: HairStyleId;
  /** 发色 hex */
  hairColor: number;
  /** −1..1：在现有肤色上变浅 / 变深 */
  skinTone: number;
  freckles?: number;
  moles?: Array<[number, number]>;
  browColor?: number;
  browThickness?: number;
  facialHair?: "none" | "stubble";
  accessories?: AccessoryId[];
  accessoryColor?: number;
  aged?: boolean;
  /** 0.96–1.04 */
  heightScale?: number;
}

/** 老年的脸：脸颊下垂（丰满度降低）、眉低、下颌略长（叠在同一 FaceShape 上，不改变身份表里的脸型）。 */
export function agedFace(shape: FaceShape): FaceShape {
  return face({ ...shape, cheekFull: shape.cheekFull - 0.45, browHeight: shape.browHeight - 0.35, jawLength: shape.jawLength + 0.1, cheekbone: shape.cheekbone + 0.1 });
}

/** 位移上限（米）与缩放上限：保证不穿模、不变形（测试里校验）。 */
export const FACE_LIMITS = { pos: 0.008, jaw: 0.012, scale: 0.14, jawScale: 0.2, head: 0.06 } as const;

export interface BoneOffset {
  /** 头部坐标（+x 角色左、+y 上、+z 前）下的位移，米 */
  pos: [number, number, number];
  scale: [number, number, number];
}

const add = (map: Record<string, BoneOffset>, name: string, pos: [number, number, number], scale: [number, number, number] = [0, 0, 0]): void => {
  const entry = (map[name] ??= { pos: [0, 0, 0], scale: [0, 0, 0] });
  for (let i = 0; i < 3; i++) { entry.pos[i] += pos[i]; entry.scale[i] += scale[i]; }
};

/** 纯函数：脸型 → 各脸部骨骼的静息偏移（位移 米 / 缩放增量）。限幅后返回。 */
export function faceBoneOffsets(input: FaceShape): Record<string, BoneOffset> {
  const s = clampFace(input);
  const m: Record<string, BoneOffset> = {};
  const P = FACE_LIMITS.pos, S = FACE_LIMITS.scale;
  const PJ = FACE_LIMITS.jaw, SJ = FACE_LIMITS.jawScale;
  // 下颌：整块下巴骨骼，宽 / 长 / 前突
  add(m, "Bip01 MJaw", [0, -PJ * s.jawLength, PJ * 0.4 * s.jawLength], [SJ * s.jawWidth, SJ * 0.85 * s.jawLength, SJ * 0.35 * s.jawWidth]);
  // 颧骨 / 脸颊
  for (const [side, name] of [[1, "Bip01 LCheek"], [-1, "Bip01 RCheek"]] as const) {
    add(m, name, [side * P * 0.9 * s.cheekbone, P * 0.2 * s.cheekbone, P * 0.8 * s.cheekbone + P * 0.6 * s.cheekFull], [S * s.cheekFull, S * s.cheekFull, S * s.cheekFull]);
  }
  for (const [side, name] of [[1, "Bip01 LMasseter"], [-1, "Bip01 RMasseter"]] as const) add(m, name, [side * P * 0.6 * s.jawWidth, 0, 0], [S * 0.6 * s.cheekFull, 0, S * 0.6 * s.cheekFull]);
  // 鼻
  add(m, "Bip01 MNose", [0, -P * 0.3 * s.noseLength, P * 0.7 * s.noseBridge], [S * s.noseWidth, S * 0.9 * s.noseLength, S * 0.9 * s.noseBridge]);
  // 眼睛 / 眼睑：间距与大小（眼球整体平移 / 缩放，眼睑骨同步）
  for (const [side, eye, top, bottom] of [[1, "Bip01 LEye", "Bip01 LEyeBlinkTop", "Bip01 LEyeBlinkBottom"], [-1, "Bip01 REye", "Bip01 REyeBlinkTop", "Bip01 REyeBlinkBottom"]] as const) {
    const dx = side * P * 0.5 * s.eyeSpacing;
    add(m, eye, [dx, 0, 0], [S * 0.5 * s.eyeSize, S * 0.5 * s.eyeSize, S * 0.5 * s.eyeSize]);
    add(m, top, [dx, P * 0.15 * s.eyeSize, 0]);
    add(m, bottom, [dx, -P * 0.15 * s.eyeSize, 0]);
  }
  // 眉：高度与弧度
  for (const side of [1, -1] as const) {
    const L = side === 1 ? "L" : "R";
    add(m, `Bip01 ${L}InnerEyebrow`, [0, P * 0.7 * s.browHeight - P * 0.3 * s.browArch, 0]);
    add(m, `Bip01 ${L}OuterEyebrow`, [side * P * 0.2 * s.browArch, P * 0.7 * s.browHeight + P * 0.5 * s.browArch, 0]);
  }
  add(m, "Bip01 MMiddleEyebrow", [0, P * 0.7 * s.browHeight, 0]);
  // 嘴：宽度与唇厚
  for (const [side, L] of [[1, "L"], [-1, "R"]] as const) {
    add(m, `Bip01 ${L}MouthCorner`, [side * P * 0.9 * s.mouthWidth, 0, 0]);
    add(m, `Bip01 ${L}Upperlip`, [side * P * 0.4 * s.mouthWidth, P * 0.3 * s.lipThickness, P * 0.4 * s.lipThickness]);
  }
  add(m, "Bip01 MUpperLip", [0, P * 0.3 * s.lipThickness, P * 0.5 * s.lipThickness], [0, S * 0.5 * s.lipThickness, S * 0.5 * s.lipThickness]);
  add(m, "Bip01 MBottomLip", [0, -P * 0.3 * s.lipThickness, P * 0.5 * s.lipThickness], [0, S * 0.5 * s.lipThickness, S * 0.5 * s.lipThickness]);
  // 头部整体：额头高（Y）与宽长比（X 对 Z）
  const H = FACE_LIMITS.head;
  add(m, "Head", [0, 0, 0], [H * s.headAspect, H * s.foreheadHeight, -H * 0.75 * s.headAspect]);
  // 限幅（下颌放宽到 12 mm / 20%）
  for (const [name, entry] of Object.entries(m)) {
    const pl = name === "Bip01 MJaw" ? PJ : P, sl = name === "Bip01 MJaw" ? SJ : S;
    for (let i = 0; i < 3; i++) {
      entry.pos[i] = Math.min(pl, Math.max(-pl, entry.pos[i]));
      entry.scale[i] = Math.min(sl, Math.max(-sl, entry.scale[i]));
    }
  }
  const head = m["Head"];
  if (head) for (let i = 0; i < 3; i++) head.scale[i] = Math.min(H, Math.max(-H, head.scale[i]));
  return m;
}

/** 偏移向量（所有骨骼的位移 + 缩放拼成一个向量），用于比较两张脸的距离。 */
export function faceVector(shape: FaceShape): number[] {
  const offsets = faceBoneOffsets(shape);
  const names = Object.keys(offsets).sort();
  return names.flatMap((name) => [...offsets[name].pos.map((v) => v / FACE_LIMITS.pos), ...offsets[name].scale.map((v) => v / FACE_LIMITS.scale)]);
}

export function faceDistance(a: FaceShape, b: FaceShape): number {
  const va = faceVector(a), vb = faceVector(b);
  return Math.sqrt(va.reduce((sum, v, i) => sum + (v - vb[i]) ** 2, 0));
}

const _m = new THREE.Matrix4();
const _v = new THREE.Vector3();

/**
 * 把脸型叠加到 visual 的脸部骨骼静息姿势上（在缩放 / 休息姿势快照之前调用）。
 * 头部坐标系偏移 → 骨骼局部：用父节点世界矩阵的逆换算（骨架里有 0.01 缩放与旋转）。
 */
export function applyFaceShape(visual: THREE.Object3D, shape: FaceShape): void {
  visual.updateMatrixWorld(true);
  // 头部坐标 = 世界轴（站立的角色：+x 左、+y 上、+z 前）；男女底模的头骨骼局部轴不同，下面按世界轴换算
  const offsets = faceBoneOffsets(shape);
  for (const [name, offset] of Object.entries(offsets)) {
    const bone = visual.getObjectByName(name) ?? visual.getObjectByName(name.replace(/ /g, "_"));
    if (!bone) continue;
    if (name !== "Head" && bone.parent) {
      _m.copy(bone.parent.matrixWorld);
      _m.setPosition(0, 0, 0);
      _m.invert();
      _v.set(offset.pos[0], offset.pos[1], offset.pos[2]).applyMatrix4(_m);
      bone.position.add(_v);
    }
    if (name === "Head") {
      const ax = headLocalAxes(visual);
      const d = [0, 0, 0];
      d[ax.x] += offset.scale[0]; d[ax.y] += offset.scale[1]; d[ax.z] += offset.scale[2];
      bone.scale.set(bone.scale.x * (1 + d[0]), bone.scale.y * (1 + d[1]), bone.scale.z * (1 + d[2]));
    } else {
      // 其它脸部骨骼的缩放同样按世界轴映射到各自的局部轴（骨骼局部轴因 Biped 而各异）
      const axes = localAxesOf(bone);
      const d = [0, 0, 0];
      d[axes.x] += offset.scale[0]; d[axes.y] += offset.scale[1]; d[axes.z] += offset.scale[2];
      bone.scale.set(bone.scale.x * (1 + d[0]), bone.scale.y * (1 + d[1]), bone.scale.z * (1 + d[2]));
    }
  }
  visual.updateMatrixWorld(true);
}

/** 世界 +x / +y / +z 分别对应该骨骼的哪根局部轴（取最接近的）。 */
function localAxesOf(node: THREE.Object3D): { x: number; y: number; z: number } {
  node.updateWorldMatrix(true, false);
  const q = node.getWorldQuaternion(new THREE.Quaternion()).invert();
  const axis = (v: THREE.Vector3): number => {
    v.applyQuaternion(q);
    const a = [Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)];
    return a.indexOf(Math.max(...a));
  };
  return { x: axis(new THREE.Vector3(1, 0, 0)), y: axis(new THREE.Vector3(0, 1, 0)), z: axis(new THREE.Vector3(0, 0, 1)) };
}

export function headLocalAxes(visual: THREE.Object3D): { x: number; y: number; z: number } {
  const head = visual.getObjectByName("Head");
  return head ? localAxesOf(head) : { x: 0, y: 1, z: 2 };
}
