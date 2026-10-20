import * as THREE from "three";
import { HumanAnimator } from "../world/humanMotion";
import { DEFAULT_SEAT, type SeatSpec } from "../world/humanPoses";
import { HumanRig } from "../world/humanRig";
import type { HumanVisualInfo } from "../world/humanVisual";
import { createPerson, type PersonOptions, type PersonPose, type PersonRig } from "../world/people";
import type { Actor, ActorPose, Vec3 } from "./types";

/** 回退（真人模型未加载）用的旧程序化骨架：座面高度 */
const SEAT_HEIGHT = 0.46;

export interface ActorHandle {
  readonly id: string;
  readonly actor: Actor;
  /** 注册到 Materializer 的根（name = `actor:${id}`） */
  readonly root: THREE.Group;
  pose: ActorPose;
  /** 真人模型的完整骨骼动画器（真人模型未加载时为 undefined，使用旧的程序化骨架） */
  readonly animator?: HumanAnimator;
  /** 正在说话（setPose("talk") 或 setSpeaking(true)） */
  speaking: boolean;
  setPose(pose: ActorPose): void;
  setSpeaking(on: boolean): void;
  /** 一个词的重音脉冲（Narrator 词事件） */
  pulse(strength?: number): void;
  /** 看向另一个人 / 世界点（null = 回到姿势默认视线）；有反应延迟，目标移动时自动跟随 */
  attend(target: ActorHandle | THREE.Vector3 | null): void;
  /** 有人在说话（不是我）：偶尔点头 */
  setListening(on: boolean): void;
  /** 偶尔瞟一眼的世界点（第一人称的玩家视线）；null = 不瞟 */
  glanceAt(point: THREE.Vector3 | null): void;
  /** 离相机的距离：远处（> 15 m）降为 10 fps 更新 */
  setDistance(meters: number): void;
  walkTo(pos: Vec3, duration: number): Promise<void>;
  update(dt: number, time: number): void;
  eyePosition(out: THREE.Vector3): THREE.Vector3;
  dispose(): void;
}

function isSeated(actor: Actor, pose: string): boolean {
  const look = actor.look as Partial<PersonOptions>;
  const canSit = actor.seat !== undefined || look.seated === true;
  return pose === "sit" || (canSit && pose !== "walk" && pose !== "stand");
}

function personPose(pose: ActorPose): PersonPose {
  if (pose === "sit") return "listen";
  if (pose === "reach") return "reach4";
  if (pose === "laugh") return "listen";
  return pose;
}

function hashSeed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0) % 100000;
}

/** 各姿势从上一个姿势过渡的时长（秒）；缺省由动画器按姿势对决定（0.55–0.85，坐下 / 起身 0.9） */
const REACH_SECONDS = 1.5;

/**
 * 电影回忆角色只持有一套动态骨架；脚本姿势由骨骼插值切换，避免多个隐藏身体副本和姿势硬切。
 * 真人模型已加载时由 HumanAnimator 驱动全身骨骼（骨盆 / 脊柱 / 颈 / 肩 / 手指 + 手脚 IK + 程序化动作层）；
 * 否则回退到旧的程序化骨架。`poses` 保留兼容旧脚本调用形态，不再用于预制姿势网格。
 */
export function spawnActor(actor: Actor, poses: readonly ActorPose[] = [], garmentDetail: "low" | "high" = "low"): ActorHandle {
  void poses;
  const initial = actor.pose ?? "stand";
  const look = actor.look as Partial<PersonOptions>;
  const options: PersonOptions = {
    shirt: 0x4f6f86,
    ...look,
    seed: look.seed ?? hashSeed(actor.id),
    animated: true,
    garmentDetail,
    seated: isSeated(actor, initial),
    pose: personPose(initial),
  };
  const person = createPerson(options);
  person.name = `${actor.id}:body`;
  const info = person.userData.humanVisual as HumanVisualInfo | undefined;
  const rig = person.userData.personRig as PersonRig;
  const root = new THREE.Group();
  root.name = `actor:${actor.id}`;
  root.add(person);
  root.position.set(actor.position.x, actor.position.y, actor.position.z);
  root.rotation.y = actor.rotationY ?? 0;
  const stats = person.userData.personGeometryStats as { draws: number; triangles: number; joints: number };
  root.userData.personGeometryStats = stats;

  let animator: HumanAnimator | undefined;
  if (info) {
    // 旧程序化骨架的道具 / 表情不再使用：道具由动画器自己画（手机 / 笔 / 书 / 眼镜）
    for (const prop of Object.values(rig.props)) if (prop) prop.visible = false;
    person.position.y = 0;
    info.restoreRest(); // 旧控制器的初始 update() 摆过一次姿势（含按座高下移 visual），回到 GLB 休息姿势再建骨架
    root.updateMatrixWorld(true);
    const seat: SeatSpec = actor.seat
      ? { height: actor.seat.height, tableHeight: actor.seat.tableHeight ?? DEFAULT_SEAT.tableHeight, tableEdge: actor.seat.tableEdge ?? DEFAULT_SEAT.tableEdge, paper: actor.seat.paper, reach: actor.seat.reach ? [actor.seat.reach.x, actor.seat.reach.y, actor.seat.reach.z] : undefined }
      : DEFAULT_SEAT;
    animator = new HumanAnimator(new HumanRig(info.visual, person), {
      seed: options.seed,
      seat,
      hasSeat: actor.seat !== undefined || look.seated === true,
      aged: look.aged === true,
      glasses: look.glasses === true,
      faces: info.faces,
      propParent: person,
      owned: person.userData.ownedMaterials as Set<THREE.Material> | undefined,
    });
    animator.setScriptPose(initial, isSeated(actor, initial), { instant: true });
  } else {
    person.position.y = isSeated(actor, initial) ? SEAT_HEIGHT : 0;
  }

  let walk: { from: THREE.Vector3; to: THREE.Vector3; t: number; duration: number; resolve: () => void; restore: ActorPose; fromYaw: number; toYaw: number } | null = null;
  let walkPhase = 0;
  let updateTime = 0;
  /** 走到座位后转回座位朝向 */
  let turnTo: number | null = null;
  let attention: ActorHandle | THREE.Vector3 | null = null;
  let attentionTimer = 0;
  let lastGlance: THREE.Vector3 | null = null;
  const targetFrame = new THREE.Vector3();
  const headPoint = new THREE.Vector3();

  const handle: ActorHandle = {
    id: actor.id,
    actor,
    root,
    pose: initial,
    animator,
    speaking: initial === "talk",
    setPose(pose) {
      handle.pose = pose;
      const seated = isSeated(actor, pose);
      if (animator) {
        animator.setScriptPose(pose === "walk" ? "stand" : pose, seated, { duration: pose === "reach" ? REACH_SECONDS : undefined });
        handle.speaking = animator.isSpeaking();
        return;
      }
      rig.setPose(personPose(pose), seated, 0.46);
      person.position.y = seated ? SEAT_HEIGHT : 0;
      handle.speaking = pose === "talk";
    },
    setSpeaking(on) {
      handle.speaking = on;
      animator?.setSpeaking(on);
    },
    pulse(strength = 1) {
      animator?.pulse(strength);
    },
    attend(target) {
      if (target === attention) return;
      attention = target;
      attentionTimer = 0;
      if (!animator) return;
      if (!target) animator.setLookTarget(null);
      else {
        const world = target instanceof THREE.Vector3 ? headPoint.copy(target) : target.eyePosition(headPoint);
        animator.setLookTarget(person.worldToLocal(targetFrame.copy(world)));
      }
    },
    setListening(on) {
      animator?.setListening(on);
    },
    glanceAt(point) {
      if (!animator) return;
      if (!point) {
        if (lastGlance) { lastGlance = null; animator.setGlanceTarget(null); }
        return;
      }
      if (lastGlance && lastGlance.distanceToSquared(point) < 0.01) return;
      lastGlance = (lastGlance ?? new THREE.Vector3()).copy(point);
      animator.setGlanceTarget(person.worldToLocal(targetFrame.copy(point)));
    },
    setDistance(meters) {
      if (animator) animator.lowRate = meters > 15;
    },
    walkTo(pos, duration) {
      if (walk) walk.resolve();
      const to = new THREE.Vector3(pos.x, pos.y, pos.z);
      const from = root.position.clone();
      const dir = to.clone().sub(from);
      const toYaw = dir.lengthSq() > 1e-4 ? Math.atan2(dir.x, dir.z) : root.rotation.y;
      turnTo = null;
      return new Promise<void>((resolve) => {
        const restore = handle.pose === "walk" ? "stand" : handle.pose;
        walk = { from, to, t: 0, duration: Math.max(0.05, duration), resolve, restore, fromYaw: root.rotation.y, toYaw };
        handle.setPose("walk");
        animator?.setWalking(true, walkPhase);
      });
    },
    update(dt, time) {
      updateTime = time;
      if (walk) {
        walk.t += dt;
        const k = Math.min(1, walk.t / walk.duration);
        const eased = k * k * (3 - 2 * k);
        root.position.lerpVectors(walk.from, walk.to, eased);
        root.rotation.y = walk.fromYaw + angleDiff(walk.toYaw, walk.fromYaw) * eased;
        walkPhase += dt * 8.2;
        if (k >= 1) {
          root.position.copy(walk.to);
          const finished = walk;
          walk = null;
          animator?.setWalking(false, walkPhase);
          if (actor.seat && actor.rotationY !== undefined) turnTo = actor.rotationY;
          handle.setPose(finished.restore === "walk" ? "stand" : finished.restore);
          finished.resolve();
        }
      }
      if (turnTo !== null) {
        const diff = angleDiff(turnTo, root.rotation.y);
        root.rotation.y += diff * Math.min(1, dt * 6);
        if (Math.abs(diff) < 0.003) { root.rotation.y = turnTo; turnTo = null; }
      }
      if (animator) {
        animator.setWalking(walk !== null, walkPhase);
        // 注视目标跟随（说话的人也许在动）：每 0.2 s 刷新一次
        attentionTimer -= dt;
        if (attention && attentionTimer <= 0) {
          attentionTimer = 0.2;
          const world = attention instanceof THREE.Vector3 ? headPoint.copy(attention) : attention.eyePosition(headPoint);
          root.updateMatrixWorld(true);
          animator.trackLookTarget(person.worldToLocal(targetFrame.copy(world)));
        }
        animator.update(dt);
        return;
      }
      rig.update(dt, updateTime, walk !== null, walkPhase, actor.position.x * 2.7 + actor.position.z * 1.3);
    },
    eyePosition(out) {
      root.updateMatrixWorld(true);
      if (animator) {
        const rigDims = animator.rig.dims;
        animator.rig.position("Head", out);
        out.y += rigDims.headToEyeY;
        out.z += rigDims.headToEyeZ;
        return out.applyMatrix4(person.matrixWorld);
      }
      const head = new THREE.Vector3(0, person.position.y + (isSeated(actor, handle.pose) ? 0.89 : 1.68), 0.1);
      return out.copy(head).applyMatrix4(root.matrixWorld);
    },
    dispose() {
      if (walk) {
        const finished = walk;
        walk = null;
        finished.resolve();
      }
      root.removeFromParent();
      const geometries = new Set<THREE.BufferGeometry>();
      const skeletons = new Set<THREE.Skeleton>();
      person.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) geometries.add((object as THREE.Mesh).geometry);
        if ((object as THREE.SkinnedMesh).isSkinnedMesh) skeletons.add((object as THREE.SkinnedMesh).skeleton);
      });
      geometries.forEach((geometry) => geometry.dispose());
      skeletons.forEach((skeleton) => skeleton.dispose());
      const owned = person.userData.ownedMaterials as Set<THREE.Material> | undefined;
      owned?.forEach((material) => material.dispose());
      owned?.clear();
      info?.ownedTextures.forEach((texture) => texture.dispose());
      info?.ownedTextures.splice(0);
    },
  };
  return handle;
}

/**
 * 群体注意力：谁在说话，其余人看谁、点头；第一人称里偶尔瞟一眼玩家。MemoryStage 每帧在 update 之前调用。
 * 说话的人看向最近的听众（第一人称且说话人是别人时看向玩家）。
 */
export function updateCrowd(handles: Iterable<ActorHandle>, viewer?: { handle: ActorHandle | null; eye: THREE.Vector3 | null }): void {
  const list = [...handles];
  const speaker = list.find((handle) => handle.speaking);
  for (const handle of list) {
    const isViewer = viewer?.handle === handle;
    if (speaker && handle !== speaker) {
      handle.setListening(true);
      handle.attend(speaker);
    } else if (speaker && handle === speaker) {
      handle.setListening(false);
      const listener = viewer?.eye && viewer.handle && viewer.handle !== handle ? viewer.eye : list.find((other) => other !== handle && other.root.visible) ?? null;
      handle.attend(listener);
    } else {
      handle.setListening(false);
      handle.attend(null);
    }
    handle.glanceAt(viewer?.eye && !isViewer && viewer.handle ? viewer.eye : null);
  }
}

function angleDiff(to: number, from: number): number {
  let delta = to - from;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
}
