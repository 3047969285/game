import * as THREE from "three";
import { glassCrystal, stone } from "./materials";

/** 阔叶树 */
export function createTree(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18 * scale, 0.28 * scale, 1.6 * scale, 12),
    stone(0x4a3728, 0.95)
  );
  trunk.position.y = 0.8 * scale;
  trunk.castShadow = true;

  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.75, metalness: 0.02 });
  const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.95 * scale, 2.2 * scale, 14), leafMat);
  foliage.position.y = 2.3 * scale;
  foliage.castShadow = true;

  const top = foliage.clone();
  top.scale.set(0.82, 0.75, 0.82);
  top.position.y = 3.1 * scale;
  g.add(trunk, foliage, top);
  return g;
}

/** 松树 */
export function createPine(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12 * scale, 0.2 * scale, 1.2 * scale, 10),
    stone(0x3d2e22, 0.9)
  );
  trunk.position.y = 0.6 * scale;
  trunk.castShadow = true;

  for (let i = 0; i < 4; i++) {
    const layer = new THREE.Mesh(
      new THREE.ConeGeometry((1.1 - i * 0.18) * scale, 1.1 * scale, 12),
      new THREE.MeshStandardMaterial({ color: 0x1b4332 + i * 0x020202, roughness: 0.7 })
    );
    layer.position.y = (1.4 + i * 0.75) * scale;
    layer.castShadow = true;
    g.add(layer);
  }
  g.add(trunk);
  return g;
}

/** 岩石 */
export function createRock(scale = 1): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55 * scale, 1), stone(0x5c6370, 0.88));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** 石灯笼 */
export function createLantern(color: number): THREE.Group {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.4, 8), stone(0x374151, 0.6));
  post.position.y = 0.7;
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.35), glassCrystal(color, 0.5));
  lamp.position.y = 1.55;
  const light = new THREE.PointLight(color, 0.8, 6);
  light.position.y = 1.55;
  g.add(post, lamp, light);
  return g;
}
