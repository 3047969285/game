import * as THREE from "three";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
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

/** 这个变体是不是坐姿：sit 一定是；look.seated 的人物在 phone / listen / talk 等姿势下也坐着，只有走路和站立例外 */
function isSeated(actor: Actor, pose: string): boolean {
  const look = actor.look as Partial<PersonOptions>;
  return pose === "sit" || (look.seated === true && pose !== "walk" && pose !== "stand");
}

/** 一个人物共用的三种“合并材质”：布料类（衣服、鞋、眼白……）、皮肤、头发 */
interface CompactMaterials {
  matte: THREE.MeshStandardMaterial;
  skin: THREE.MeshStandardMaterial;
  hair: THREE.MeshStandardMaterial;
}

function compactMaterials(): CompactMaterials {
  return {
    matte: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.84, metalness: 0.02, side: THREE.DoubleSide }),
    skin: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.55, metalness: 0.02, emissive: 0x3a1608, emissiveIntensity: 0.05 }),
    hair: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.42, metalness: 0.15, side: THREE.DoubleSide }),
  };
}

/**
 * 压缩绘制调用：createPerson 烘焙后每个人仍有 12–15 个网格（每种材质一个），五个人就是近 70 次绘制。
 * 回忆里人物只占画面的一小块，细节材质差异看不出来：把颜色烘进顶点色，按 “布料 / 皮肤 / 头发” 三类合并，
 * 每个人只剩 3–4 个网格（发光的手机屏幕单独保留）。
 */
function compactPerson(person: THREE.Group, mats: CompactMaterials): void {
  const buckets = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const meshes: THREE.Mesh[] = [];
  person.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
  });
  person.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(person.matrixWorld).invert();
  for (const mesh of meshes) {
    const src = mesh.material as THREE.MeshStandardMaterial;
    let target: THREE.Material;
    if (src.emissiveIntensity > 0.3 && src.emissive.getHex() !== 0) target = src; // 发光的屏幕保持原样
    else if (src.metalness > 0.1 && src.vertexColors) target = mats.hair;
    else if (src.emissiveIntensity > 0 && src.emissive.getHex() !== 0) target = mats.skin;
    else target = mats.matte;
    let geo = mesh.geometry.clone();
    geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, mesh.matrixWorld));
    if (target !== src) {
      geo.deleteAttribute("uv");
      const count = geo.getAttribute("position").count;
      const existing = geo.getAttribute("color");
      const color = new Float32Array(count * 3);
      const base = src.color ?? new THREE.Color(1, 1, 1);
      for (let i = 0; i < count; i++) {
        const k = src.vertexColors && existing ? 1 : 0;
        color[i * 3] = base.r * (k ? existing.getX(i) : 1);
        color[i * 3 + 1] = base.g * (k ? existing.getY(i) : 1);
        color[i * 3 + 2] = base.b * (k ? existing.getZ(i) : 1);
      }
      geo.setAttribute("color", new THREE.BufferAttribute(color, 3));
    }
    if (!geo.index) geo = mergeVertices(geo, 1e-4);
    const list = buckets.get(target) ?? [];
    list.push(geo);
    buckets.set(target, list);
  }
  for (const mesh of meshes) mesh.removeFromParent();
  for (const [material, geos] of buckets) {
    // 不同来源的几何属性要一致才能合并：统一只留 position / normal / color
    const attrs = material === mats.matte || material === mats.skin || material === mats.hair ? ["position", "normal", "color"] : ["position", "normal"];
    for (const g of geos) for (const name of Object.keys(g.attributes)) if (!attrs.includes(name)) g.deleteAttribute(name);
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    person.add(mesh);
  }
}

/** 变体名：除了 ActorPose，还有 reach 的中间姿势 reach1..reach3（reach 本身 = 最终的 reach4） */
type VariantKey = ActorPose | "reach1" | "reach2" | "reach3";
const REACH_STEPS: VariantKey[] = ["lap", "reach1", "reach2", "reach3", "reach"];
const REACH_SECONDS = 1.5;

function personFor(actor: Actor, pose: VariantKey, mats?: CompactMaterials): THREE.Group {
  const look = actor.look as Partial<PersonOptions>;
  const seated = isSeated(actor, pose);
  const opts: PersonOptions = {
    shirt: 0x4f6f86,
    ...look,
    seated,
    pose: (pose === "sit" ? "listen" : pose === "reach" ? "reach4" : pose) as PersonPose,
  };
  const person = createPerson(opts);
  person.name = `${actor.id}:${pose}`;
  if (mats) compactPerson(person, mats);
  return person;
}

/**
 * 创建人物。poses 是脚本里这个人物会用到的全部姿势（含初始姿势）。
 */
export function spawnActor(actor: Actor, poses: readonly ActorPose[] = []): ActorHandle {
  const initial = actor.pose ?? "stand";
  const wanted = [...new Set<VariantKey>([initial, ...poses, "walk"])];
  // reach 需要 lap → reach1..3 → reach 的全部中间姿势，才能在 1.5 秒里慢慢抬手
  if (wanted.includes("reach")) for (const k of REACH_STEPS) if (!wanted.includes(k)) wanted.push(k);
  const root = new THREE.Group();
  root.name = `actor:${actor.id}`;
  const variants = new Map<VariantKey, THREE.Group>();
  let shown: VariantKey = initial;
  let reachT = -1;
  const mats = compactMaterials();
  for (const p of wanted) {
    const v = personFor(actor, p, mats);
    v.visible = p === initial;
    if (isSeated(actor, p)) v.position.y = SEAT_HEIGHT;
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
      if (!variants.has(pose)) return;
      const show = (key: VariantKey): void => {
        variants.get(shown)!.visible = false;
        variants.get(key)!.visible = true;
        shown = key;
      };
      handle.pose = pose;
      if (pose === "reach" && variants.has("reach1") && shown !== "reach") {
        reachT = 0; // 从 lap 开始慢慢抬手，由 update 逐步切换中间姿势
        show("lap");
        return;
      }
      reachT = -1;
      show(pose);
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
      if (reachT >= 0) {
        reachT += dt;
        const k = Math.min(1, reachT / REACH_SECONDS);
        const e = k * k * (3 - 2 * k);
        const key = REACH_STEPS[Math.round(e * (REACH_STEPS.length - 1))];
        if (key !== shown) {
          variants.get(shown)!.visible = false;
          variants.get(key)!.visible = true;
          shown = key;
        }
        if (k >= 1) reachT = -1;
      }
      const body = variants.get(shown);
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
        body.position.y = (isSeated(actor, handle.pose) ? SEAT_HEIGHT : 0) + Math.sin(time * 1.5 + actor.position.x) * 0.004;
      }
    },
    eyePosition(out) {
      root.updateMatrixWorld(true);
      const head = new THREE.Vector3(0, isSeated(actor, handle.pose) ? SEAT_HEIGHT + 0.89 : 1.68, 0.1);
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
