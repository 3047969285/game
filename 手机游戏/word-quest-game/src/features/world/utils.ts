import * as THREE from "three";

/**
 * 地形高度采样（多层分形）。
 * 中央探索走廊（x≈0）保持平缓便于行走与放置建筑；
 * 越往两侧山体越高，形成河谷 / 峡谷式的大世界地貌。
 */
export function terrainHeight(x: number, z: number): number {
  // 距中央走廊的归一化距离 0(中心) → 1(远侧)，并做 smoothstep 平滑
  const corridor = Math.min(1, Math.abs(x) / 120);
  const sideMask = corridor * corridor * (3 - 2 * corridor);

  // 大尺度山脉（主要作用于两侧）
  const macro =
    Math.sin(x * 0.012) * 7.0 +
    Math.cos(z * 0.009) * 6.0 +
    Math.sin((x * 0.7 + z) * 0.0075) * 5.0;

  // 中尺度丘陵（全局轻微起伏）
  const mid =
    Math.sin(x * 0.05 + z * 0.028) * 1.7 +
    Math.cos(x * 0.037 - z * 0.045) * 1.3;

  // 高频细节
  const detail =
    Math.sin(x * 0.19 + z * 0.12) * 0.4 +
    Math.cos(x * 0.16 - z * 0.2) * 0.28;

  return macro * sideMask + mid * (0.4 + 0.6 * sideMask) + detail;
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
