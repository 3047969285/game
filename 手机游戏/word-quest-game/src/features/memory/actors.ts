import * as THREE from "three";
import { createPerson, type PersonOptions, type PersonPose } from "../world/people";
import type { Actor, ActorPose, Vec3 } from "./types";

/**
 * 回忆里的人物（同学 / 年轻的“我”）：复用 people.ts 的 createPerson（SDF 人体，烘焙成十来个网格）。
 * 烘焙后的人物不能再改姿势，所以每个姿势预建一个变体（只显示一个），切换姿势 = 切换可见变体；
 * 整个 Actor 是一个 Group，可被 Materializer 注册后整体溶解入场 / 退场。
 * 走路 = 平移 + 起伏 + “walk” 变体（若预建了），没有骨骼动画。
 */

const SEAT_HEIGHT = 0.46;

export interface ActorHandle {
  readonly id: string;
  readonly actor: Actor;
  /** 注册到 Materializer 的根（name = `actor:${id}`） */
  readonly root: THREE.Group;
  pose: ActorPose;
  /** 切换姿势（没有预建该姿势时保持当前） */
  setPose(pose: ActorPose): void;
  /** 走到 pos，duration 秒（缓入缓出），返回的 Promise 到达时 resolve */
  walkTo(pos: Vec3, duration: number): Promise<void>;
  /** 逐帧更新（走路补间与待机呼吸） */
  update(dt: number, time: number): void;
  /** 眼睛位置（世界坐标），第一人称相机用 */
  eyePosition(out: THREE.Vector3): THREE.Vector3;
  dispose(): void;
}

function personFor(actor: Actor, pose: ActorPose): THREE.Group {
  const look = actor.look as Partial<PersonOptions>;
  const seated = pose === "sit";
  const opts: PersonOptions = {
    shirt: 0x4f6f86,
    ...look,
    seated: seated || look.seated,
    pose: (seated ? "listen" : pose) as PersonPose,
  };
  const person = createPerson(opts);
  person.name = `${actor.id}:${pose}`;
  return person;
}

/**
 * 创建人物。poses 是脚本里这个人物会用到的全部姿势（含初始姿势）。
 */
export function spawnActor(actor: Actor, poses: readonly ActorPose[] = []): ActorHandle {
  const initial = actor.pose ?? "stand";
  const wanted = [...new Set<ActorPose>([initial, ...poses, "walk"])];
  const root = new THREE.Group();
  root.name = `actor:${actor.id}`;
  const variants = new Map<ActorPose, THREE.Group>();
  for (const p of wanted) {
    const v = personFor(actor, p);
    v.visible = p === initial;
    if (p === "sit") v.position.y = SEAT_HEIGHT;
    root.add(v);
    variants.set(p, v);
  }
  root.position.set(actor.position.x, actor.position.y, actor.position.z);
  root.rotation.y = actor.rotationY ?? 0;

  let walk: { from: THREE.Vector3; to: THREE.Vector3; t: number; duration: number; resolve: () => void; restore: ActorPose } | null = null;

  const handle: ActorHandle = {
    id: actor.id,
    actor,
    root,
    pose: initial,
    setPose(pose) {
      const next = variants.get(pose);
      if (!next) return;
      variants.get(handle.pose)!.visible = false;
      next.visible = true;
      handle.pose = pose;
    },
    walkTo(pos, duration) {
      if (walk) walk.resolve();
      const to = new THREE.Vector3(pos.x, pos.y, pos.z);
      const from = root.position.clone();
      return new Promise<void>((resolve) => {
        walk = { from, to, t: 0, duration: Math.max(0.05, duration), resolve, restore: handle.pose };
        const dir = to.clone().sub(from);
        if (dir.lengthSq() > 1e-4) root.rotation.y = Math.atan2(dir.x, dir.z);
        handle.setPose("walk");
      });
    },
    update(dt, time) {
      const body = variants.get(handle.pose);
      if (walk) {
        walk.t += dt;
        const k = Math.min(1, walk.t / walk.duration);
        const e = k * k * (3 - 2 * k);
        root.position.lerpVectors(walk.from, walk.to, e);
        root.position.y += Math.abs(Math.sin(time * 9)) * 0.035;
        if (k >= 1) {
          root.position.copy(walk.to);
          const w = walk;
          walk = null;
          handle.setPose(w.restore === "walk" ? "stand" : w.restore);
          w.resolve();
        }
      } else if (body) {
        // 待机呼吸
        body.position.y = (handle.pose === "sit" ? SEAT_HEIGHT : 0) + Math.sin(time * 1.5 + actor.position.x) * 0.004;
      }
    },
    eyePosition(out) {
      root.updateMatrixWorld(true);
      const head = new THREE.Vector3(0, handle.pose === "sit" ? SEAT_HEIGHT + 1.02 : 1.62, 0.08);
      return out.copy(head).applyMatrix4(root.matrixWorld);
    },
    dispose() {
      if (walk) {
        const w = walk;
        walk = null;
        w.resolve();
      }
      root.removeFromParent();
    },
  };
  return handle;
}
