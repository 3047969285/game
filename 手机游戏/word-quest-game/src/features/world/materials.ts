import * as THREE from "three";

/** 水晶 / 玻璃质感 */
export function glassCrystal(color: number, emissiveIntensity: number): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity,
    metalness: 0.15,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    reflectivity: 1,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });
}

/** 石头 / 建筑质感（含粗糙度变化，更有细节） */
export function stone(color: number, roughness = 0.82): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.06,
    envMapIntensity: 0.4,
  });
}

/** 苔藓石砖（路石专用，带轻微自发光描边） */
export function mossyStone(color: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.88,
    metalness: 0.04,
    emissive: 0x1a3a20,
    emissiveIntensity: 0.06,
  });
}

/** 发光路径材质 */
export function glowPath(cleared: boolean): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: cleared ? 0x6ee7b7 : 0x5b8def,
    emissive: cleared ? 0x34d399 : 0x3b82f6,
    emissiveIntensity: cleared ? 0.72 : 0.38,
    roughness: 0.18,
    metalness: 0.4,
    transparent: true,
    opacity: 0.88,
  });
}

/** 水面材质 */
export function water(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0x1e6a9a,
    roughness: 0.06,
    metalness: 0.12,
    transparent: true,
    opacity: 0.72,
    reflectivity: 0.95,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 0.6,
  });
}

/** 路灯光晕 Sprite 纹理（软光点） */
export function makeLanternGlowTexture(color: string): THREE.Texture {
  const sz = 64;
  const cv = document.createElement("canvas");
  cv.width = sz; cv.height = sz;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
  g.addColorStop(0, color);
  g.addColorStop(0.4, "rgba(255,220,140,0.35)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  return new THREE.CanvasTexture(cv);
}

/** 路灯自身灯柱材质 */
export function lanternMetal(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x4a5568,
    roughness: 0.45,
    metalness: 0.85,
  });
}

/** 路灯灯罩（自发光玻璃） */
export function lanternGlass(color: number): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.4,
    roughness: 0.04,
    metalness: 0,
    transparent: true,
    opacity: 0.82,
    clearcoat: 1,
  });
}
