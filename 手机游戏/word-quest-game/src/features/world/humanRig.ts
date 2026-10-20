import * as THREE from "three";

/**
 * 完整骨骼驱动（Rocketbox 骨架）：全身 FK + 手 / 脚两骨 IK + 手指逐节弯曲。
 * 对应 docs/api-character-motion.md「humanRig」。纯骨骼数学，不依赖渲染 / DOM，可在 node 下用 GLB 的 JSON 骨架做测试。
 *
 * 坐标约定：所有位置 / 方向都在 `frame`（人物组，原点在脚下、面朝 +Z、+X 为角色的左侧、单位米）中表达。
 * 旋转增量（delta）是“角色轴”增量：绕 +X 为低头 / 前倾，绕 +Y 为向左转，绕 +Z 为向右侧倾（与 retargetRotation 同一约定）。
 */

export const CORE_BONES = [
  "Hips", "Spine", "Spine1", "Spine2", "Neck", "Head",
  "LeftShoulder", "LeftArm", "LeftForeArm", "LeftHand",
  "RightShoulder", "RightArm", "RightForeArm", "RightHand",
  "LeftUpLeg", "LeftLeg", "LeftFoot", "LeftToeBase",
  "RightUpLeg", "RightLeg", "RightFoot", "RightToeBase",
] as const;
export type CoreBone = (typeof CORE_BONES)[number];
export type Side = "Left" | "Right";
export const SIDES: readonly Side[] = ["Left", "Right"];
export const FINGERS = ["Thumb", "Index", "Middle", "Ring", "Pinky"] as const;
export type FingerName = (typeof FINGERS)[number];
export const FINGER_COUNT = FINGERS.length;

export interface RigBone {
  readonly name: string;
  readonly node: THREE.Object3D;
  readonly restLocal: THREE.Quaternion;
  readonly restLocalPos: THREE.Vector3;
  /** 休息姿势下的世界旋转（相对 frame） */
  readonly restWorld: THREE.Quaternion;
  /** 休息姿势下的位置（frame 空间） */
  readonly restPos: THREE.Vector3;
}

export interface LimbBones { upper: RigBone; lower: RigBone; end: RigBone }

export interface BodyDims {
  thigh: number;
  shin: number;
  upperArm: number;
  foreArm: number;
  /** 踝关节骨骼到脚底（地面）的高度 */
  ankleHeight: number;
  /** 站立休息姿势下骨盆骨骼高度 */
  hipsHeight: number;
  hipHalfWidth: number;
  shoulderHalfWidth: number;
  /** 骨盆到肩关节的高度 / 前后偏移 */
  hipsToShoulderY: number;
  hipsToShoulderZ: number;
  /** 骨盆到颈根 / 头骨骼的高度 */
  hipsToNeckY: number;
  hipsToHeadY: number;
  /** 头骨骼到眼睛的高度与前向偏移 */
  headToEyeY: number;
  headToEyeZ: number;
  /** 两眼距中线的一半 */
  eyeHalf: number;
  /** 坐下时骨盆骨骼到椅面的高度（臀部网格最低处在骨盆骨骼下方；按网格实测：男底模 ≈ 0.16，女底模 ≈ 0.125，已含 2–3 cm 坐垫 / 肌肉压缩） */
  sitDrop: number;
}

interface FingerJoint {
  bone: RigBone;
  /** 绕此（骨骼局部）轴转正角 = 指尖向掌心卷曲 */
  axis: THREE.Vector3;
}

const _q = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _q3 = new THREE.Quaternion();
const _q4 = new THREE.Quaternion();
const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _s = new THREE.Vector3();
const _m = new THREE.Matrix4();

/** 各关节弯曲 100% 时的最大角度（弧度）：近节 / 中节 / 远节 */
const CURL_MAX: Record<FingerName, [number, number, number]> = {
  Thumb: [0.55, 0.75, 0.8],
  Index: [1.25, 1.5, 0.95],
  Middle: [1.3, 1.55, 1.0],
  Ring: [1.35, 1.5, 1.0],
  Pinky: [1.4, 1.5, 1.0],
};

/** 两骨 IK（解析解）。目标不可达时伸直指向目标；pole 决定肘 / 膝朝向。 */
export function solveTwoBone(root: THREE.Vector3, target: THREE.Vector3, l1: number, l2: number, pole: THREE.Vector3, outMid: THREE.Vector3, outEnd: THREE.Vector3): boolean {
  const dir = _v.copy(target).sub(root);
  const dist = dir.length();
  if (dist < 1e-6) dir.set(0, -1, 0);
  else dir.multiplyScalar(1 / dist);
  const reach = l1 + l2;
  const min = Math.abs(l1 - l2) + 1e-4;
  const reachable = dist <= reach - 1e-5 && dist >= min;
  const d = Math.min(reach - 1e-5, Math.max(min, dist));
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const perp = _v2.copy(pole).addScaledVector(dir, -pole.dot(dir));
  if (perp.lengthSq() < 1e-8) {
    perp.set(0, 0, 1).addScaledVector(dir, -dir.z);
    if (perp.lengthSq() < 1e-8) perp.set(0, 1, 0);
  }
  perp.normalize();
  outMid.copy(root).addScaledVector(dir, a).addScaledVector(perp, h);
  outEnd.copy(root).addScaledVector(dir, d);
  return reachable;
}

/** 由两个方向构造正交基（x = f，y = n 的正交分量）。 */
export function basisQuaternion(f: THREE.Vector3, n: THREE.Vector3, out: THREE.Quaternion): THREE.Quaternion {
  const x = _v.copy(f).normalize();
  const y = _v2.copy(n).addScaledVector(x, -n.dot(x));
  if (y.lengthSq() < 1e-8) y.set(0, 1, 0).addScaledVector(x, -x.y);
  y.normalize();
  const z = _v3.crossVectors(x, y);
  _m.makeBasis(x, y, z);
  return out.setFromRotationMatrix(_m);
}

/** 把“角色轴”增量旋转换算到骨骼局部：restLocal · restWorld⁻¹ · delta · restWorld */
export function retargetDelta(restLocal: THREE.Quaternion, restWorld: THREE.Quaternion, delta: THREE.Quaternion, out: THREE.Quaternion): THREE.Quaternion {
  _q.copy(restWorld).invert();
  return out.copy(restLocal).multiply(_q).multiply(delta).multiply(restWorld).normalize();
}

export class HumanRig {
  readonly bones = new Map<string, RigBone>();
  readonly missing: string[] = [];
  readonly dims: BodyDims;
  readonly arms: Record<Side, LimbBones>;
  readonly legs: Record<Side, LimbBones>;
  /** 手掌坐标系（骨骼局部）：手指方向 / 掌心法线 */
  private readonly handLocal: Record<Side, { f: THREE.Vector3; n: THREE.Vector3; basisInv: THREE.Quaternion }>;
  private readonly footLocal: Record<Side, { f: THREE.Vector3; n: THREE.Vector3; basisInv: THREE.Quaternion }>;
  private readonly fingerJoints: Record<Side, FingerJoint[][]>;
  private readonly frameInv = new THREE.Matrix4();
  private readonly frameQInv = new THREE.Quaternion();
  private readonly frameToBip = new THREE.Matrix4();
  private readonly hips: RigBone;
  private readonly hipsParent: THREE.Object3D | null;
  private readonly driven: RigBone[] = [];
  private readonly rootTmp = new THREE.Vector3();
  private readonly mid = new THREE.Vector3();
  private readonly end = new THREE.Vector3();

  constructor(readonly visual: THREE.Object3D, readonly frame: THREE.Object3D) {
    frame.updateWorldMatrix(true, false);
    visual.updateMatrixWorld(true);
    this.syncFrame();
    const grab = (name: string): RigBone | undefined => {
      const node = visual.getObjectByName(name);
      if (!node) {
        this.missing.push(name);
        return undefined;
      }
      node.getWorldQuaternion(_q);
      const bone: RigBone = {
        name,
        node,
        restLocal: node.quaternion.clone(),
        restLocalPos: node.position.clone(),
        restWorld: this.frameQInv.clone().multiply(_q.clone()),
        restPos: this.toFrame(node, new THREE.Vector3()),
      };
      this.bones.set(name, bone);
      return bone;
    };
    for (const name of CORE_BONES) {
      const bone = grab(name);
      if (bone) this.driven.push(bone);
    }
    this.fingerJoints = { Left: [], Right: [] };
    for (const side of SIDES) {
      for (const finger of FINGERS) {
        const chain: RigBone[] = [];
        for (const joint of [1, 2, 3]) {
          const bone = grab(`${side}Hand${finger}${joint}`);
          if (bone) chain.push(bone);
        }
        this.fingerJoints[side].push(chain.map((bone) => ({ bone, axis: new THREE.Vector3(1, 0, 0) })));
      }
    }
    if (this.missing.length) console.warn("[humanRig] missing bones:", this.missing.join(", "));
    const need = (name: string): RigBone => {
      const bone = this.bones.get(name);
      if (!bone) throw new Error(`humanRig: bone ${name} missing`);
      return bone;
    };
    this.hips = need("Hips");
    this.hipsParent = this.hips.node.parent;
    this.hipsParent?.updateWorldMatrix(true, false);
    if (this.hipsParent) this.frameToBip.copy(this.frameInv).invert().premultiply(_m.copy(this.hipsParent.matrixWorld).invert()); // 帧 → Bip01 局部
    const limb = (side: Side, names: [string, string, string]): LimbBones => ({ upper: need(`${side}${names[0]}`), lower: need(`${side}${names[1]}`), end: need(`${side}${names[2]}`) });
    this.arms = { Left: limb("Left", ["Arm", "ForeArm", "Hand"]), Right: limb("Right", ["Arm", "ForeArm", "Hand"]) };
    this.legs = { Left: limb("Left", ["UpLeg", "Leg", "Foot"]), Right: limb("Right", ["UpLeg", "Leg", "Foot"]) };

    const dist = (a: RigBone, b: RigBone): number => a.restPos.distanceTo(b.restPos);
    const neck = need("Neck"), head = need("Head");
    const lEye = visual.getObjectByName("Bip01 LEye");
    const eyeRest = lEye ? this.toFrame(lEye, new THREE.Vector3()) : head.restPos.clone().add(new THREE.Vector3(0, 0.09, 0.08));
    this.dims = {
      thigh: dist(this.legs.Left.upper, this.legs.Left.lower),
      shin: dist(this.legs.Left.lower, this.legs.Left.end),
      upperArm: dist(this.arms.Left.upper, this.arms.Left.lower),
      foreArm: dist(this.arms.Left.lower, this.arms.Left.end),
      ankleHeight: this.legs.Left.end.restPos.y,
      hipsHeight: this.hips.restPos.y,
      hipHalfWidth: Math.abs(this.legs.Left.upper.restPos.x),
      shoulderHalfWidth: Math.abs(this.arms.Left.upper.restPos.x),
      hipsToShoulderY: this.arms.Left.upper.restPos.y - this.hips.restPos.y,
      hipsToShoulderZ: this.arms.Left.upper.restPos.z - this.hips.restPos.z,
      hipsToNeckY: neck.restPos.y - this.hips.restPos.y,
      hipsToHeadY: head.restPos.y - this.hips.restPos.y,
      headToEyeY: eyeRest.y - head.restPos.y,
      headToEyeZ: eyeRest.z - head.restPos.z,
      eyeHalf: Math.abs(eyeRest.x) > 0.01 ? Math.abs(eyeRest.x) : 0.032,
      sitDrop: 0,
    };
    // 男底模骨盆低、腿短（臀部更靠下），女底模相反：由骨盆高度线性插值（两个底模实测：0.863 → 0.16，0.965 → 0.125）
    this.dims.sitDrop = clamp01(0.125 + (0.965 - this.dims.hipsHeight) * 0.343, 0.1, 0.18);

    // ── 手掌 / 脚掌的局部坐标系 ──
    const handLocal = {} as Record<Side, { f: THREE.Vector3; n: THREE.Vector3; basisInv: THREE.Quaternion }>;
    const footLocal = {} as Record<Side, { f: THREE.Vector3; n: THREE.Vector3; basisInv: THREE.Quaternion }>;
    for (const side of SIDES) {
      const hand = this.arms[side].end;
      const middle = this.bones.get(`${side}HandMiddle1`), index = this.bones.get(`${side}HandIndex1`), pinky = this.bones.get(`${side}HandPinky1`), thumb = this.bones.get(`${side}HandThumb1`);
      let f = new THREE.Vector3(0, -1, 0.1), n = new THREE.Vector3(side === "Left" ? -1 : 1, 0, 0);
      if (middle && index && pinky && thumb) {
        f = middle.restPos.clone().sub(hand.restPos).normalize();
        const across = thumb.restPos.clone().sub(pinky.restPos);
        across.addScaledVector(f, -across.dot(f)).normalize();
        // 左手：掌心 = 手指方向 × 拇指侧；右手相反（手性）
        n = new THREE.Vector3().crossVectors(f, across).multiplyScalar(side === "Left" ? 1 : -1).normalize();
      }
      handLocal[side] = this.localBasis(hand, f, n);
      const foot = this.legs[side].end;
      const toe = this.bones.get(`${side}ToeBase`);
      const ff = toe ? toe.restPos.clone().sub(foot.restPos) : new THREE.Vector3(0, 0, 0.12);
      ff.y = 0;
      ff.normalize();
      footLocal[side] = this.localBasis(foot, ff, new THREE.Vector3(0, 1, 0));
      // 手指卷曲轴：绕 (指节方向 × 掌心法线) 正转 = 指尖向掌心
      this.fingerJoints[side].forEach((chain) => {
        chain.forEach((joint, i) => {
          const next = chain[i + 1]?.bone ?? null;
          const dir = next ? next.restPos.clone().sub(joint.bone.restPos) : joint.bone.restPos.clone().sub(chain[i - 1] ? chain[i - 1].bone.restPos : hand.restPos);
          dir.normalize();
          const axisWorld = new THREE.Vector3().crossVectors(dir, n);
          if (axisWorld.lengthSq() < 1e-8) axisWorld.copy(lateralAxis(side));
          axisWorld.normalize();
          joint.axis.copy(axisWorld).applyQuaternion(_q.copy(joint.bone.restWorld).invert());
        });
      });
    }
    this.handLocal = handLocal;
    this.footLocal = footLocal;
  }

  private localBasis(bone: RigBone, fWorld: THREE.Vector3, nWorld: THREE.Vector3): { f: THREE.Vector3; n: THREE.Vector3; basisInv: THREE.Quaternion } {
    const inv = bone.restWorld.clone().invert();
    const f = fWorld.clone().applyQuaternion(inv);
    const n = nWorld.clone().applyQuaternion(inv);
    return { f, n, basisInv: basisQuaternion(f, n, new THREE.Quaternion()).invert() };
  }

  /** 每帧开头同步 frame 的世界矩阵（actor 移动 / 转向后仍在 frame 空间里算） */
  syncFrame(): void {
    this.frame.updateWorldMatrix(true, false);
    this.frameInv.copy(this.frame.matrixWorld).invert();
    this.frame.matrixWorld.decompose(_v, _q, _s);
    this.frameQInv.copy(_q).invert();
  }

  toFrame(node: THREE.Object3D, out: THREE.Vector3): THREE.Vector3 {
    return out.setFromMatrixPosition(node.matrixWorld).applyMatrix4(this.frameInv);
  }

  private worldQuatF(node: THREE.Object3D | null, out: THREE.Quaternion): THREE.Quaternion {
    if (!node) return out.identity();
    node.matrixWorld.decompose(_v, out, _s);
    return out.premultiply(this.frameQInv);
  }

  bone(name: string): RigBone | undefined {
    return this.bones.get(name);
  }

  /** 全部骨骼回到休息姿势局部旋转 */
  resetPose(): void {
    for (const bone of this.driven) bone.node.quaternion.copy(bone.restLocal);
    for (const side of SIDES) for (const chain of this.fingerJoints[side]) for (const joint of chain) joint.bone.node.quaternion.copy(joint.bone.restLocal);
  }

  /** 骨盆放到 frame 空间的某个位置 */
  setHipsPosition(p: THREE.Vector3): void {
    this.hips.node.position.copy(p).applyMatrix4(this.frameToBip);
  }

  /** 给骨骼叠加“角色轴”增量旋转 */
  rotate(name: CoreBone, delta: THREE.Quaternion): void {
    const bone = this.bones.get(name);
    if (bone) retargetDelta(bone.restLocal, bone.restWorld, delta, bone.node.quaternion);
  }

  /** 更新整个骨架的世界矩阵（FK 之后、IK 之前调用一次） */
  updateWorld(): void {
    this.hips.node.updateMatrixWorld(true);
  }

  /** 骨骼相对休息姿势的“角色轴”旋转（需先 updateWorld）。gaze 用它把目标换到躯干坐标系。 */
  characterRotation(name: CoreBone, out: THREE.Quaternion): THREE.Quaternion {
    const bone = this.bones.get(name);
    if (!bone) return out.identity();
    this.worldQuatF(bone.node, out);
    return out.multiply(_q2.copy(bone.restWorld).invert());
  }

  /** 世界（frame）空间里骨骼的当前位置，需先 updateWorld / solve */
  position(name: string, out: THREE.Vector3): THREE.Vector3 {
    const bone = this.bones.get(name);
    return bone ? this.toFrame(bone.node, out) : out.set(0, 0, 0);
  }

  private aim(bone: RigBone, child: RigBone, want: THREE.Vector3): void {
    const p = this.toFrame(bone.node, _v);
    const cur = this.toFrame(child.node, _v2).sub(p);
    const des = _v3.copy(want).sub(p);
    if (cur.lengthSq() < 1e-10 || des.lengthSq() < 1e-10) return;
    _q.setFromUnitVectors(cur.normalize(), des.normalize());
    const parentQ = this.worldQuatF(bone.node.parent, _q2);
    const own = _q3.copy(parentQ).multiply(bone.node.quaternion);
    own.premultiply(_q);
    bone.node.quaternion.copy(parentQ.invert().multiply(own)).normalize();
    bone.node.updateMatrixWorld(true);
  }

  /** 两骨 IK：手 / 脚（末端骨骼原点）落到 frame 空间目标，pole 为肘 / 膝朝向。返回目标是否可达。 */
  solveLimb(limb: LimbBones, target: THREE.Vector3, pole: THREE.Vector3): boolean {
    const root = this.toFrame(limb.upper.node, this.rootTmp);
    const l1 = limb.upper.restPos.distanceTo(limb.lower.restPos);
    const l2 = limb.lower.restPos.distanceTo(limb.end.restPos);
    const reachable = solveTwoBone(root, target, l1, l2, pole, this.mid, this.end);
    this.aim(limb.upper, limb.lower, this.mid);
    this.aim(limb.lower, limb.end, this.end);
    return reachable;
  }

  /** 末端（手 / 脚）朝向：fingers / forward 方向与掌心 / 脚背法线（frame 空间） */
  orientEnd(side: Side, kind: "hand" | "foot", f: THREE.Vector3, n: THREE.Vector3): void {
    const limb = kind === "hand" ? this.arms[side] : this.legs[side];
    const local = kind === "hand" ? this.handLocal[side] : this.footLocal[side];
    const target = basisQuaternion(f, n, _q4).multiply(local.basisInv);
    const parentQ = this.worldQuatF(limb.end.node.parent, _q2);
    limb.end.node.quaternion.copy(parentQ.invert().multiply(target)).normalize();
    limb.end.node.updateMatrixWorld(true);
  }

  /** 手指弯曲：curl[0..4] = 拇指…小指，0 = 伸直，1 = 握紧；joints 的弯曲按近 / 中 / 远节递进 */
  setCurl(side: Side, curl: ArrayLike<number>): void {
    this.fingerJoints[side].forEach((chain, finger) => {
      const c = Math.min(1, Math.max(0, curl[finger] ?? 0));
      const max = CURL_MAX[FINGERS[finger]];
      chain.forEach((joint, i) => {
        _q.setFromAxisAngle(joint.axis, max[i] * c);
        joint.bone.node.quaternion.copy(joint.bone.restLocal).multiply(_q);
      });
    });
  }

  /** 单根手指额外弯曲（拇指滑屏等细节），在 setCurl 之后调用，叠加到当前局部旋转 */
  addFingerBend(side: Side, finger: FingerName, joint: 0 | 1 | 2, angle: number): void {
    const j = this.fingerJoints[side][FINGERS.indexOf(finger)]?.[joint];
    if (!j) return;
    _q.setFromAxisAngle(j.axis, angle);
    j.bone.node.quaternion.multiply(_q);
  }

  /** 手指 / 手掌的当前世界位置（用于测试：指尖不穿桌面） */
  fingertip(side: Side, finger: FingerName, out: THREE.Vector3): THREE.Vector3 {
    const chain = this.fingerJoints[side][FINGERS.indexOf(finger)];
    const last = chain[chain.length - 1];
    if (!last) return out.set(0, 0, 0);
    this.updateWorld(); // 手指弯曲写在局部旋转里，渲染器才会更新世界矩阵；这里（测试 / 调试）强制刷新
    return this.toFrame(last.bone.node, out);
  }
}

function clamp01(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function lateralAxis(side: Side): THREE.Vector3 {
  return new THREE.Vector3(side === "Left" ? 1 : -1, 0, 0);
}

/**
 * 用 GLB 的 JSON 节点表在 node 里重建骨架（测试专用：不需要 GLTFLoader / 贴图 / DOM）。
 * 返回挂在一个 frame 组下的 Bip01 根；frame 已按 1.8 m 身高缩放并让脚底落在 y = 0（与 attachHumanVisual 一致）。
 */
export function buildSkeletonFromGltfJson(json: { nodes: Array<{ name?: string; translation?: number[]; rotation?: number[]; scale?: number[]; children?: number[] }>; scenes?: Array<{ nodes: number[] }>; accessors?: Array<{ min?: number[]; max?: number[] }>; meshes?: Array<{ primitives: Array<{ attributes: { POSITION: number } }> }> }): { frame: THREE.Group; visual: THREE.Group } {
  const objects = json.nodes.map((node) => {
    const object = new THREE.Object3D();
    object.name = node.name ?? "";
    if (node.translation) object.position.fromArray(node.translation);
    if (node.rotation) object.quaternion.fromArray(node.rotation);
    if (node.scale) object.scale.fromArray(node.scale);
    return object;
  });
  json.nodes.forEach((node, i) => node.children?.forEach((child) => objects[i].add(objects[child])));
  const visual = new THREE.Group();
  for (const index of json.scenes?.[0]?.nodes ?? [0]) visual.add(objects[index]);
  // 身高：网格包围盒（与 attachHumanVisual 相同的缩放 / 落地规则）
  let minY = Infinity, maxY = -Infinity;
  for (const mesh of json.meshes ?? []) for (const primitive of mesh.primitives) {
    const acc = json.accessors?.[primitive.attributes.POSITION];
    if (acc?.min && acc.max) { minY = Math.min(minY, acc.min[1]); maxY = Math.max(maxY, acc.max[1]); }
  }
  if (Number.isFinite(minY)) {
    const scale = 1.8 / (maxY - minY);
    visual.scale.multiplyScalar(scale);
    visual.position.y = -minY * scale;
  }
  const frame = new THREE.Group();
  frame.add(visual);
  frame.updateMatrixWorld(true);
  return { frame, visual };
}
