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

/** 石头 / 建筑质感 */
export function stone(color: number, roughness = 0.82): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.08 });
}

/** 发光路径材质 */
export function glowPath(cleared: boolean): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: cleared ? 0x6ee7b7 : 0x5b8def,
    emissive: cleared ? 0x34d399 : 0x3b82f6,
    emissiveIntensity: cleared ? 0.55 : 0.28,
    roughness: 0.25,
    metalness: 0.35,
    transparent: true,
    opacity: 0.85,
  });
}

/** 水面材质 */
export function water(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0x1e6a9a,
    roughness: 0.08,
    metalness: 0.15,
    transparent: true,
    opacity: 0.72,
    reflectivity: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
}
