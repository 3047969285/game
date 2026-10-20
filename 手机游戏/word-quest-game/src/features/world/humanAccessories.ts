import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { AccessoryId } from "./humanIdentity";
import type { HeadLandmarks } from "./humanHair";

/**
 * 配饰（docs/api-character-identity.md §3）：圆框 / 方框 / 金属细框眼镜、耳机挂脖、发卡、双肩包。
 * 全部是 mesh 绑定空间里的程序几何，用 SkinnedMesh 刚性绑在某根骨骼上（借用身体 / 头 SkinnedMesh 的 skeleton 与 bindMatrix），
 * 所以随头 / 颈 / 脊柱运动，不需要每帧更新。
 */

export interface AccessorySet {
  meshes: THREE.Mesh[];
  materials: THREE.Material[];
  backpack?: THREE.Mesh;
}

const normName = (name: string): string => name.replace(/_/g, " ");

function boneIndex(skeleton: THREE.Skeleton, name: string): number {
  return skeleton.bones.findIndex((bone) => normName(bone.name) === name);
}

/** 骨骼在 mesh 绑定空间里的位置（由逆绑定矩阵求得） */
export function bindPosition(skeleton: THREE.Skeleton, name: string): THREE.Vector3 | null {
  const index = boneIndex(skeleton, name);
  if (index < 0) return null;
  return new THREE.Vector3().setFromMatrixPosition(skeleton.boneInverses[index].clone().invert());
}

function rigid(geometry: THREE.BufferGeometry, material: THREE.Material, bone: string, reference: THREE.SkinnedMesh, name: string): THREE.SkinnedMesh | null {
  const index = boneIndex(reference.skeleton, bone);
  if (index < 0) return null;
  const count = geometry.getAttribute("position").count;
  geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(new Array(count * 4).fill(0).map((_, i) => (i % 4 === 0 ? index : 0)), 4));
  geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(new Array(count * 4).fill(0).map((_, i) => (i % 4 === 0 ? 1 : 0)), 4));
  const mesh = new THREE.SkinnedMesh(geometry, material);
  mesh.name = name;
  mesh.frustumCulled = false;
  mesh.castShadow = true;
  mesh.bind(reference.skeleton, reference.bindMatrix);
  return mesh;
}

const tube = (points: THREE.Vector3[], radius: number, closed = false, segments = 28): THREE.BufferGeometry =>
  new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, closed, "catmullrom", 0.5), segments, radius, 5, closed);

/** 额头 / 眼周的脸面最前点：给眼镜定 z，避免插进脸里 */
export function faceFrontZ(headGeometry: THREE.BufferGeometry, lm: HeadLandmarks): number {
  const pos = headGeometry.getAttribute("position");
  let z = lm.eye.z + 0.012;
  for (let i = 0; i < pos.count; i++) {
    const x = Math.abs(pos.getX(i) - lm.eye.x), y = pos.getY(i) - lm.eye.y;
    // 只看眼眶周围的脸面（不含鼻梁 / 鼻尖）
    if (x > 0.02 && x < 0.045 && y > -0.02 && y < 0.025) z = Math.max(z, pos.getZ(i));
  }
  return z;
}

type GlassesKind = "round" | "metal" | "square";

function glassesGeometry(kind: GlassesKind, lm: HeadLandmarks, frontZ: number): { frame: THREE.BufferGeometry; lens: THREE.BufferGeometry } {
  const half = lm.eyeHalf;
  const z = Math.max(lm.eye.z + 0.02, frontZ + 0.006);
  const cy = lm.eye.y + 0.002;
  const r = kind === "metal" ? 0.0245 : 0.027;
  const tubeR = kind === "metal" ? 0.0026 : kind === "square" ? 0.0048 : 0.0056;
  const frames: THREE.BufferGeometry[] = [];
  const lenses: THREE.BufferGeometry[] = [];
  const ringPoints = (cx: number): THREE.Vector3[] => {
    const out: THREE.Vector3[] = [];
    const n = 24;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      if (kind === "square") {
        // 圆角方框：超椭圆
        const e = 0.38;
        const c = Math.cos(a), s = Math.sin(a);
        out.push(new THREE.Vector3(cx + Math.sign(c) * Math.pow(Math.abs(c), e) * 0.031, cy + Math.sign(s) * Math.pow(Math.abs(s), e) * 0.021, z));
      } else out.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z));
    }
    return out;
  };
  for (const side of [1, -1]) {
    const cx = lm.eye.x + side * half;
    frames.push(tube(ringPoints(cx), tubeR, true, 36));
    const lens = kind === "square" ? new THREE.PlaneGeometry(0.058, 0.040) : new THREE.CircleGeometry(r * 0.97, 20);
    lens.translate(cx, cy, z);
    lenses.push(lens);
    const outerX = cx + side * (kind === "square" ? 0.031 : r);
    // 镜腿：从镜框外沿向后到耳上
    frames.push(tube([new THREE.Vector3(outerX, cy + 0.003, z), new THREE.Vector3(side * (0.071), cy + 0.002, z - 0.045), new THREE.Vector3(side * 0.079, cy - 0.004, lm.eye.z - 0.085)], tubeR * 0.9, false, 10));
  }
  // 鼻梁
  const innerR = kind === "square" ? 0.031 : r;
  frames.push(tube([new THREE.Vector3(lm.eye.x + half - innerR, cy + 0.006, z), new THREE.Vector3(lm.eye.x, cy + 0.011, z + 0.002), new THREE.Vector3(lm.eye.x - half + innerR, cy + 0.006, z)], tubeR, false, 8));
  const normalize = (g: THREE.BufferGeometry): THREE.BufferGeometry => (g.index ? g.toNonIndexed() : g);
  return { frame: mergeGeometries(frames.map(normalize))!, lens: mergeGeometries(lenses.map(normalize))! };
}

function headphonesGeometry(neck: THREE.Vector3): THREE.BufferGeometry {
  const P = (x: number, y: number, z: number): THREE.Vector3 => new THREE.Vector3(neck.x + x, neck.y + y, neck.z + z);
  const band = tube([P(0.082, -0.07, 0.07), P(0.1, -0.015, 0.0), P(0.074, 0.02, -0.075), P(0, 0.03, -0.095), P(-0.074, 0.02, -0.075), P(-0.1, -0.015, 0.0), P(-0.082, -0.07, 0.07)], 0.0065, false, 36);
  const parts: THREE.BufferGeometry[] = [band.index ? band.toNonIndexed() : band];
  for (const side of [1, -1]) {
    const cup = new THREE.CylinderGeometry(0.034, 0.034, 0.024, 20);
    cup.rotateZ(Math.PI / 2); // 轴线沿 x
    cup.translate(side * 0.084, 0, 0);
    cup.translate(neck.x, neck.y - 0.082, neck.z + 0.078);
    parts.push(cup.index ? cup.toNonIndexed() : cup);
  }
  return mergeGeometries(parts)!;
}

function clipGeometry(lm: HeadLandmarks): THREE.BufferGeometry {
  const c = lm.skull.center, r = lm.skull.radii;
  // 左太阳穴上方的发际：椭球表面点 + 外凸
  const lon = 1.05, lat = 0.78;
  const p = new THREE.Vector3(r.x * Math.sin(lon) * Math.cos(lat), r.y * Math.sin(lat), r.z * Math.cos(lon) * Math.cos(lat));
  const n = new THREE.Vector3(p.x / (r.x * r.x), p.y / (r.y * r.y), p.z / (r.z * r.z)).normalize();
  const g = new THREE.BoxGeometry(0.034, 0.008, 0.009);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
  g.applyQuaternion(q);
  g.rotateY(0);
  g.translate(c.x + p.x + n.x * 0.016, c.y + p.y + n.y * 0.016, c.z + p.z + n.z * 0.016);
  return g;
}

function backpackGeometry(spine: THREE.Vector3): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const body = new THREE.BoxGeometry(0.3, 0.4, 0.14, 1, 1, 1);
  body.translate(spine.x, spine.y - 0.02, spine.z - 0.185);
  const pocket = new THREE.BoxGeometry(0.2, 0.15, 0.04);
  pocket.translate(spine.x, spine.y - 0.12, spine.z - 0.275);
  parts.push(body, pocket);
  for (const side of [1, -1]) {
    // 肩带：从包顶绕过肩膀到胸前
    parts.push(tube([new THREE.Vector3(spine.x + side * 0.1, spine.y + 0.16, spine.z - 0.2), new THREE.Vector3(spine.x + side * 0.12, spine.y + 0.2, spine.z - 0.06), new THREE.Vector3(spine.x + side * 0.125, spine.y + 0.1, spine.z + 0.075), new THREE.Vector3(spine.x + side * 0.115, spine.y - 0.08, spine.z + 0.085)], 0.014, false, 14));
  }
  return mergeGeometries(parts.map((g) => (g.index ? g.toNonIndexed() : g)))!;
}

export interface AccessoryInput {
  ids: readonly AccessoryId[];
  lm: HeadLandmarks;
  headMesh: THREE.SkinnedMesh;
  bodyMesh: THREE.SkinnedMesh;
  /** 发卡 / 眼镜框的主色（hex） */
  color?: number;
}

export function createAccessories(input: AccessoryInput): AccessorySet {
  const { ids, lm, headMesh, bodyMesh } = input;
  const out: AccessorySet = { meshes: [], materials: [] };
  const material = (color: number, rough = 0.4, metal = 0.1, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra });
    out.materials.push(m);
    return m;
  };
  const add = (mesh: THREE.SkinnedMesh | null): void => { if (mesh) out.meshes.push(mesh); };
  const glasses = ids.find((id) => id === "roundGlasses" || id === "squareGlasses" || id === "metalRoundGlasses");
  if (glasses) {
    const kind: GlassesKind = glasses === "squareGlasses" ? "square" : glasses === "metalRoundGlasses" ? "metal" : "round";
    const g = glassesGeometry(kind, lm, faceFrontZ(headMesh.geometry, lm));
    const frameColor = kind === "metal" ? 0xd9bf6e : input.color ?? 0x23262e;
    add(rigid(g.frame, material(frameColor, kind === "metal" ? 0.25 : 0.4, kind === "metal" ? 0.8 : 0.1), "Head", headMesh, "human-glasses-frame"));
    add(rigid(g.lens, material(0x9fc4e8, 0.05, 0, { transparent: true, opacity: 0.2, depthWrite: false, side: THREE.DoubleSide }), "Head", headMesh, "human-glasses-lens"));
  }
  if (ids.includes("neckHeadphones")) {
    const neck = bindPosition(bodyMesh.skeleton, "Neck");
    if (neck) add(rigid(headphonesGeometry(neck), material(0x23262d, 0.5, 0.15), "Neck", bodyMesh, "human-headphones"));
  }
  if (ids.includes("hairClip")) add(rigid(clipGeometry(lm), material(0xf0c9d4, 0.35, 0.3), "Head", headMesh, "human-hairclip"));
  if (ids.includes("backpack")) {
    const spine = bindPosition(bodyMesh.skeleton, "Spine2");
    if (spine) {
      const mesh = rigid(backpackGeometry(spine), material(0x17181c, 0.8, 0), "Spine2", bodyMesh, "human-backpack");
      if (mesh) { add(mesh); out.backpack = mesh; }
    }
  }
  return out;
}
