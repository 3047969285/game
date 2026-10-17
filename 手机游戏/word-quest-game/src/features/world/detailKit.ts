import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

/**
 * 建筑细节工具箱：倒角体块、圆台、细杆、拱、八边形台阶，
 * 以及按材质合并网格的构建器（数百个小件 → 每种材质一个 draw call）。
 */

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3(1, 1, 1);
const _p = new THREE.Vector3();

/** 倒角方块（底面中心在原点以上 h/2 处，需自行摆放） */
export function boxGeo(w: number, h: number, d: number, radius = 0.04): THREE.BufferGeometry {
  return new RoundedBoxGeometry(w, h, d, 1, Math.min(radius, w / 2.01, h / 2.01, d / 2.01));
}

/** 圆台 / 圆柱（顶面半径 rTop，底面半径 rBottom） */
export function cylGeo(rTop: number, rBottom: number, h: number, radial = 16): THREE.BufferGeometry {
  return new THREE.CylinderGeometry(rTop, rBottom, h, radial, 1);
}

/** 带倒角的正多边形棱柱，底面在 y=0，边朝向坐标轴 */
export function prismGeo(radius: number, height: number, bevel: number, sides = 8): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  for (let i = 0; i < sides; i++) {
    const a = ((i + 0.5) / sides) * Math.PI * 2;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.001, height - bevel * 2),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, bevel, 0);
  return geo;
}

/** 环形扇区瓷砖（铺地用），顶面在 y=thickness */
export function annulusSectorGeo(r0: number, r1: number, a0: number, a1: number, thickness: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(Math.cos(a0) * r0, Math.sin(a0) * r0);
  shape.lineTo(Math.cos(a0) * r1, Math.sin(a0) * r1);
  shape.absarc(0, 0, r1, a0, a1, false);
  shape.lineTo(Math.cos(a1) * r0, Math.sin(a1) * r0);
  shape.absarc(0, 0, r0, a1, a0, true);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, curveSegments: 3 });
  // Shape 在 XY 平面；绕 X 轴 -90° 后挤出方向变为 +Y（角度镜像对完整环无影响）
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/** 两点之间的细杆 */
export function strutGeo(a: [number, number, number], b: [number, number, number], radius: number, radial = 6): THREE.BufferGeometry {
  const from = new THREE.Vector3(...a);
  const dir = new THREE.Vector3(...b).sub(from);
  const geo = new THREE.CylinderGeometry(radius, radius, dir.length(), radial, 1);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  geo.applyMatrix4(new THREE.Matrix4().compose(from.clone().addScaledVector(dir, 0.5), q, new THREE.Vector3(1, 1, 1)));
  return geo;
}

/** 半圆拱框：外半径 ro、内半径 ri、厚度 depth，拱脚在 y=0，中心在原点，朝 +Z */
export function archFrameGeo(ro: number, ri: number, depth: number, bevel = 0.04): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, ro, 0, Math.PI, false);
  shape.lineTo(-ri, 0);
  shape.absarc(0, 0, ri, Math.PI, 0, true);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.001, depth - bevel * 2),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.8,
    bevelSegments: 1,
    curveSegments: 18,
  });
  geo.translate(0, 0, -(depth - bevel * 2) / 2);
  return geo;
}

export interface Placement {
  x?: number;
  y?: number;
  z?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  sx?: number;
  sy?: number;
  sz?: number;
}

/**
 * 按材质合并的网格构建器。
 * 用法：kit.add(geo, material, {x, y, z, ry})，最后 kit.build(parent)。
 */
export class MergedBuilder {
  private readonly buckets = new Map<THREE.Material, THREE.BufferGeometry[]>();

  add(geometry: THREE.BufferGeometry, material: THREE.Material, at: Placement = {}): void {
    const geo = geometry.clone();
    geo.deleteAttribute("uv");
    _e.set(at.rx ?? 0, at.ry ?? 0, at.rz ?? 0);
    _q.setFromEuler(_e);
    _p.set(at.x ?? 0, at.y ?? 0, at.z ?? 0);
    _s.set(at.sx ?? 1, at.sy ?? 1, at.sz ?? 1);
    geo.applyMatrix4(_m.compose(_p, _q, _s));
    const welded = geo.index ? geo : mergeVertices(geo, 1e-4);
    const list = this.buckets.get(material) ?? [];
    list.push(welded);
    this.buckets.set(material, list);
  }

  /** 用完整矩阵放置（局部坐标系 / 缩放 / 任意旋转组合时使用） */
  addMatrix(geometry: THREE.BufferGeometry, material: THREE.Material, matrix: THREE.Matrix4): void {
    const geo = geometry.clone();
    geo.deleteAttribute("uv");
    geo.applyMatrix4(matrix);
    const welded = geo.index ? geo : mergeVertices(geo, 1e-4);
    const list = this.buckets.get(material) ?? [];
    list.push(welded);
    this.buckets.set(material, list);
  }

  /** 把已合并的几何放进 parent；返回生成的网格 */
  build(parent: THREE.Object3D, name = "detail", userData: Record<string, unknown> = {}): THREE.Mesh[] {
    const meshes: THREE.Mesh[] = [];
    let i = 0;
    for (const [material, geos] of this.buckets) {
      const merged = mergeGeometries(geos, false);
      if (!merged) continue;
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, material);
      mesh.name = `${name}-${i++}`;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      Object.assign(mesh.userData, userData);
      parent.add(mesh);
      meshes.push(mesh);
    }
    this.buckets.clear();
    return meshes;
  }
}

/** 可重复的伪随机数 */
export function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface KitMaterials {
  stone: THREE.MeshStandardMaterial;
  stoneDark: THREE.MeshStandardMaterial;
  stoneWarm: THREE.MeshStandardMaterial;
  paveA: THREE.MeshStandardMaterial;
  paveB: THREE.MeshStandardMaterial;
  slate: THREE.MeshStandardMaterial;
  wood: THREE.MeshStandardMaterial;
  woodDark: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  steel: THREE.MeshStandardMaterial;
  copper: THREE.MeshStandardMaterial;
  leaf: THREE.MeshStandardMaterial;
  leafLight: THREE.MeshStandardMaterial;
  soil: THREE.MeshStandardMaterial;
  lampGlass: THREE.MeshStandardMaterial;
  paper: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  darkSteel: THREE.MeshStandardMaterial;
  rock: THREE.MeshStandardMaterial;
  terracottaRoof: THREE.MeshStandardMaterial;
}

/** 写实建筑常用材质。学习入口需要在雾中保持清晰，因此统一关闭雾。 */
export function createKitMaterials(): KitMaterials {
  const std = (color: number, roughness: number, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}) => {
    const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    mat.fog = false;
    return mat;
  };
  return {
    stone: std(0xb9b3a6, 0.9),
    stoneDark: std(0x8a867d, 0.92),
    stoneWarm: std(0xc9bda6, 0.9),
    paveA: std(0x9a9a94, 0.95),
    paveB: std(0x858a88, 0.95),
    slate: std(0x4a5258, 0.86, 0.06),
    wood: std(0x8a6a4a, 0.82, 0.02),
    woodDark: std(0x5a4330, 0.85, 0.02),
    brass: std(0xb68a3c, 0.36, 0.8),
    steel: std(0x8e99a4, 0.4, 0.8),
    copper: std(0x4f9a8c, 0.52, 0.55),
    leaf: std(0x3f6f45, 0.95),
    leafLight: std(0x5f9150, 0.95),
    soil: std(0x4a3b2c, 1),
    lampGlass: std(0xfff0c8, 0.3, 0, { emissive: 0xffc15a, emissiveIntensity: 0.9 }),
    paper: std(0xece3cf, 0.95),
    darkSteel: std(0x2f353b, 0.5, 0.7),
    rock: std(0x7b7d80, 0.95),
    terracottaRoof: std(0xb5654a, 0.82),
    glass: (() => {
      const g = new THREE.MeshPhysicalMaterial({ color: 0x1f4a5c, roughness: 0.06, metalness: 0.1, transparent: true, opacity: 0.78, clearcoat: 1 });
      g.fog = false;
      return g;
    })(),
  };
}
