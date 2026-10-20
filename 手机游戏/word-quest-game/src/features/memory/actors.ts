import * as THREE from "three";
import { createPerson, type PersonOptions, type PersonPose, type PersonRig } from "../world/people";
import type { Actor, ActorPose, Vec3 } from "./types";

const SEAT_HEIGHT = 0.46;

export interface ActorHandle {
  readonly id: string;
  readonly actor: Actor;
  /** 注册到 Materializer 的根（name = `actor:${id}`） */
  readonly root: THREE.Group;
  pose: ActorPose;
  setPose(pose: ActorPose): void;
  walkTo(pos: Vec3, duration: number): Promise<void>;
  update(dt: number, time: number): void;
  eyePosition(out: THREE.Vector3): THREE.Vector3;
  dispose(): void;
}

function isSeated(actor: Actor, pose: string): boolean {
  const look = actor.look as Partial<PersonOptions>;
  return pose === "sit" || (look.seated === true && pose !== "walk" && pose !== "stand");
}

function personPose(pose: ActorPose): PersonPose {
  if (pose === "sit") return "listen";
  if (pose === "reach") return "reach4";
  return pose;
}

/**
 * 电影回忆角色只持有一套动态骨架；脚本姿势由骨骼插值切换，避免多个隐藏身体副本和姿势硬切。
 * `poses` 保留兼容旧脚本调用形态，但不再用于预制姿势网格。
 */
export function spawnActor(actor: Actor, poses: readonly ActorPose[] = [], garmentDetail: "low" | "high" = "low"): ActorHandle {
  void poses;
  const initial = actor.pose ?? "stand";
  const look = actor.look as Partial<PersonOptions>;
  const options: PersonOptions = {
    shirt: 0x4f6f86,
    ...look,
    animated: true,
    garmentDetail,
    seated: isSeated(actor, initial),
    pose: personPose(initial),
  };
  const person = createPerson(options);
  person.name = `${actor.id}:body`;
  person.position.y = isSeated(actor, initial) ? SEAT_HEIGHT : 0;
  const rig = person.userData.personRig as PersonRig;
  const root = new THREE.Group();
  root.name = `actor:${actor.id}`;
  root.add(person);
  root.position.set(actor.position.x, actor.position.y, actor.position.z);
  root.rotation.y = actor.rotationY ?? 0;
  const stats = person.userData.personGeometryStats as { draws: number; triangles: number; joints: number };
  root.userData.personGeometryStats = stats;

  let walk: { from: THREE.Vector3; to: THREE.Vector3; t: number; duration: number; resolve: () => void; restore: ActorPose; fromYaw: number; toYaw: number } | null = null;
  let walkPhase = 0;
  let updateTime = 0;

  const handle: ActorHandle = {
    id: actor.id,
    actor,
    root,
    pose: initial,
    setPose(pose) {
      handle.pose = pose;
      const seated = isSeated(actor, pose);
      rig.setPose(personPose(pose), seated, 0.46);
      person.position.y = seated ? SEAT_HEIGHT : 0;
    },
    walkTo(pos, duration) {
      if (walk) walk.resolve();
      const to = new THREE.Vector3(pos.x, pos.y, pos.z);
      const from = root.position.clone();
      const dir = to.clone().sub(from);
      const toYaw = dir.lengthSq() > 1e-4 ? Math.atan2(dir.x, dir.z) : root.rotation.y;
      return new Promise<void>((resolve) => {
        const restore = handle.pose === "walk" ? "stand" : handle.pose;
        walk = { from, to, t: 0, duration: Math.max(0.05, duration), resolve, restore, fromYaw: root.rotation.y, toYaw };
        handle.setPose("walk");
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
          handle.setPose(finished.restore === "walk" ? "stand" : finished.restore);
          finished.resolve();
        }
      }
      rig.update(dt, updateTime, walk !== null, walkPhase, actor.position.x * 2.7 + actor.position.z * 1.3);
    },
    eyePosition(out) {
      root.updateMatrixWorld(true);
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
    },
  };
  return handle;
}

function angleDiff(to: number, from: number): number {
  let delta = to - from;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
}
