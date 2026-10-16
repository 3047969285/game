import * as THREE from "three";
import { MergedBuilder, annulusSectorGeo, boxGeo, createKitMaterials, prismGeo } from "./detailKit";

/**
 * 段落微世界的石砌平台：三层倒角八边形台阶 + 环形铺地 + 色带嵌条。
 * 顶面高度 1.16（与旧平台一致），平台中心位于 (0, 0, 27)。
 */
export function buildFocusedTerrace(routeColor: number): THREE.Group {
  const root = new THREE.Group();
  root.name = "focused-terrace";
  root.position.set(0, 0, 27);
  const m = createKitMaterials();
  const kit = new MergedBuilder();

  kit.add(prismGeo(8.8, 0.2, 0.03), m.stoneDark, { y: 0.68 });
  kit.add(prismGeo(8.4, 0.16, 0.025), m.stone, { y: 0.88 });
  kit.add(prismGeo(8.0, 0.12, 0.02), m.stoneWarm, { y: 1.04 });

  const rings: Array<[number, number, number]> = [
    [5.4, 6.6, 30],
    [6.7, 7.8, 38],
  ];
  rings.forEach(([r0, r1, count], ringIndex) => {
    const step = (Math.PI * 2) / count;
    for (let i = 0; i < count; i++) {
      const a0 = i * step + 0.007 + (ringIndex % 2) * step * 0.5;
      kit.add(annulusSectorGeo(r0, r1, a0, a0 + step - 0.014, 0.026), (i + ringIndex) % 2 ? m.paveA : m.paveB, { y: 1.16 });
    }
  });
  kit.add(new THREE.TorusGeometry(5.2, 0.04, 5, 64), m.slate, { y: 1.18, rx: Math.PI / 2 });
  kit.build(root, "focused-terrace", { isLandscapeStage: true });

  const inlay = new THREE.MeshStandardMaterial({
    color: routeColor,
    emissive: routeColor,
    emissiveIntensity: 0.18,
    roughness: 0.5,
    metalness: 0.15,
  });
  inlay.fog = false;
  const band = new THREE.Mesh(new THREE.TorusGeometry(7.95, 0.05, 6, 72), inlay);
  band.rotation.x = Math.PI / 2;
  band.position.y = 1.19;
  band.castShadow = false;
  band.userData.noLandscapeShadow = true;
  root.add(band);
  return root;
}

/** 入口台阶的一块石板：倒角石板 + 两侧色带 */
export function buildApproachSlab(routeColor: number): THREE.Group {
  const group = new THREE.Group();
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  kit.add(boxGeo(5.2, 0.18, 3.3, 0.05), m.stoneWarm, { y: 0 });
  kit.add(boxGeo(5.0, 0.04, 3.1, 0.02), m.paveA, { y: 0.1 });
  kit.build(group, "approach-slab", { isLandscapeStage: true });
  const inlay = new THREE.MeshStandardMaterial({
    color: routeColor,
    emissive: routeColor,
    emissiveIntensity: 0.16,
    roughness: 0.5,
  });
  inlay.fog = false;
  for (const side of [-1, 1]) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 2.9), inlay);
    strip.position.set(side * 2.35, 0.13, 0);
    strip.userData.noLandscapeShadow = true;
    group.add(strip);
  }
  return group;
}
