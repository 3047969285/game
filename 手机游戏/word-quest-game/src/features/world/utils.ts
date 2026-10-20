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

/** 二维哈希（确定性，用于程序化噪声） */
export function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

/** 平滑值噪声（双线性 + smoothstep 插值） */
export function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

/** 分形叠加噪声（多倍频，返回 0~1） */
export function fbm(x: number, y: number, octaves = 4): number {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, y * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

/** 平滑阶跃（与 GLSL smoothstep 一致） */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0 || 1e-6)));
  return t * t * (3 - 2 * t);
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

/** 释放 Group 内去重后的几何体、材质与贴图资源 */
export function disposeGroup(group: THREE.Group): void {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const textureKeys = [
    "map",
    "alphaMap",
    "aoMap",
    "bumpMap",
    "displacementMap",
    "emissiveMap",
    "envMap",
    "lightMap",
    "metalnessMap",
    "normalMap",
    "roughnessMap",
  ];

  group.traverse((obj) => {
    if (obj instanceof THREE.InstancedMesh || obj instanceof THREE.BatchedMesh) obj.dispose();
    if ((obj as THREE.SkinnedMesh).isSkinnedMesh) (obj as THREE.SkinnedMesh).skeleton.dispose();

    const mesh = obj as THREE.Mesh;
    if (mesh.geometry && !geometries.has(mesh.geometry)) {
      geometries.add(mesh.geometry);
      mesh.geometry.dispose();
    }

    const meshMaterials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    for (const material of meshMaterials) {
      // 共享单例材质（植被 / 岩石 / 石板）及其纹理由各自的 dispose*Resources 统一释放
      if (materials.has(material) || material.userData.shared) continue;
      materials.add(material);
      for (const key of textureKeys) {
        const texture = (material as unknown as Record<string, unknown>)[key];
        if (texture && typeof texture === "object" && (texture as { isTexture?: boolean }).isTexture) {
          if (!(texture as THREE.Texture).userData.shared) textures.add(texture as THREE.Texture);
        }
      }
      material.dispose();
    }
  });

  textures.forEach((texture) => texture.dispose());
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
