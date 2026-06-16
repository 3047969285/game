import * as THREE from "three";

/** 地形高度采样（与 mesh 起伏一致） */
export function terrainHeight(x: number, z: number): number {
  const ridge = Math.sin(x * 0.06) * 2 + Math.cos(z * 0.04) * 2.5 + Math.sin((x + z) * 0.03) * 1.2;
  const detail = Math.sin(x * 0.22 + z * 0.11) * 0.45 + Math.cos(x * 0.17 - z * 0.19) * 0.35;
  return ridge + detail;
}

/** 可复现的伪随机数 */
export function seededRand(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** 释放 Group 内所有几何体与材质 */
export function disposeGroup(group: THREE.Group): void {
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose();
    if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
    else mesh.material?.dispose();
  });
}

/** 从场景移除并释放 Group */
export function removeGroup(scene: THREE.Scene, group?: THREE.Group): void {
  if (!group) return;
  scene.remove(group);
  disposeGroup(group);
}

/** 未解锁站点的半透明样式 */
export function applyLockedStyle(group: THREE.Group): void {
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      m.transparent = true;
      const std = m as THREE.MeshStandardMaterial;
      if (std.opacity > 0.5) std.opacity = 0.38;
    }
  });
}
