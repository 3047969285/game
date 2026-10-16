import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/**
 * 全局几何升级：把场景里程序化生成的"生硬"基础体换成更细致的版本，
 * 不改动任何摆放 / 标记（userData），因此可以对既有的数十个场景统一生效。
 *
 *  - 方块 → 倒角方块（边缘有高光，不再是纸板盒子）
 *  - 低段数圆柱 / 圆锥 / 球 / 圆环 → 圆滑版本（8 边及以下视为有意的多边形，保持不变）
 */

const cache = new Map<THREE.BufferGeometry, THREE.BufferGeometry>();

function upgrade(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  const hit = cache.get(geo);
  if (hit) return hit;
  let next = geo;

  const type = geo.type;
  const p = (geo as unknown as { parameters?: Record<string, number> }).parameters;
  if (p) {
    if (type === "BoxGeometry") {
      const { width, height, depth } = p;
      const min = Math.min(width, height, depth);
      if (min >= 0.05 && p.widthSegments <= 1 && p.heightSegments <= 1 && p.depthSegments <= 1) {
        const radius = THREE.MathUtils.clamp(min * 0.2, 0.012, 0.085);
        next = new RoundedBoxGeometry(width, height, depth, 2, radius);
      }
    } else if (type === "CylinderGeometry") {
      const radial = p.radialSegments;
      if (radial >= 9 && radial < 24) {
        next = new THREE.CylinderGeometry(p.radiusTop, p.radiusBottom, p.height, 28, p.heightSegments, p.openEnded === 1, p.thetaStart, p.thetaLength);
      }
    } else if (type === "ConeGeometry") {
      const radial = p.radialSegments;
      if (radial >= 9 && radial < 24 && p.radius > 0.2) {
        next = new THREE.ConeGeometry(p.radius, p.height, 28, p.heightSegments, p.openEnded === 1, p.thetaStart, p.thetaLength);
      }
    } else if (type === "SphereGeometry") {
      if (p.widthSegments <= 14 && p.heightSegments <= 10 && p.radius > 0.08) {
        next = new THREE.SphereGeometry(p.radius, 28, 18, p.phiStart, p.phiLength, p.thetaStart, p.thetaLength);
      }
    } else if (type === "TorusGeometry") {
      if (p.radius > 0.3 && (p.radialSegments < 10 || p.tubularSegments < 40)) {
        next = new THREE.TorusGeometry(p.radius, p.tube, Math.max(p.radialSegments, 12), Math.max(p.tubularSegments, 64), p.arc);
      }
    }
  }

  cache.set(geo, next);
  return next;
}

/** 升级 root 下所有网格（含 InstancedMesh）的几何体 */
export function upgradeGeometry(root: THREE.Object3D): void {
  const touched: THREE.BufferGeometry[] = [];
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh || mesh.userData.keepGeometry) return;
    const old = mesh.geometry;
    const next = upgrade(old);
    if (next !== old) {
      mesh.geometry = next;
      touched.push(old);
      if ((mesh as unknown as THREE.InstancedMesh).isInstancedMesh) (mesh as unknown as THREE.InstancedMesh).computeBoundingSphere();
    }
  });
  for (const old of new Set(touched)) old.dispose();
  cache.clear();
}
