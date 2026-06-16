import * as THREE from "three";
import { glassCrystal, stone } from "./materials";

/** 阔叶树（簇状圆润树冠，告别"圆锥假树"） */
export function createTree(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14 * scale, 0.26 * scale, 1.7 * scale, 10),
    stone(0x4a3728, 0.95)
  );
  trunk.position.y = 0.85 * scale;
  trunk.castShadow = true;
  g.add(trunk);

  // 由多个低多边形球簇组成的树冠，带轻微色差
  const leafTones = [0x2d6a4f, 0x357a58, 0x276044, 0x3a8a62];
  const blobs: Array<[number, number, number, number]> = [
    [0, 2.5, 0, 1.05],
    [0.55, 2.25, 0.2, 0.72],
    [-0.5, 2.3, -0.25, 0.7],
    [0.15, 2.95, -0.1, 0.78],
    [-0.2, 2.7, 0.45, 0.6],
  ];
  for (const [bx, by, bz, br] of blobs) {
    const mat = new THREE.MeshStandardMaterial({
      color: leafTones[Math.floor(Math.random() * leafTones.length)],
      roughness: 0.82,
      metalness: 0.02,
      flatShading: true,
    });
    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(br * scale, 1), mat);
    blob.position.set(bx * scale, by * scale, bz * scale);
    blob.castShadow = true;
    g.add(blob);
  }
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

  for (let i = 0; i < 5; i++) {
    const layer = new THREE.Mesh(
      new THREE.ConeGeometry((1.15 - i * 0.17) * scale, 1.0 * scale, 9),
      new THREE.MeshStandardMaterial({ color: 0x1b4332 + i * 0x020302, roughness: 0.72, flatShading: true })
    );
    layer.position.y = (1.3 + i * 0.62) * scale;
    layer.rotation.y = i * 0.4;
    layer.castShadow = true;
    g.add(layer);
  }
  g.add(trunk);
  return g;
}

/**
 * 草丛单元几何（基座在 y=0，向上 0.5）。用于实例化草地。
 * 由两片交叉的细长叶片组成，附带顶/底渐变顶点色。
 */
export function grassBladeGeometry(): THREE.BufferGeometry {
  const blade = new THREE.PlaneGeometry(0.09, 0.5, 1, 3);
  blade.translate(0, 0.25, 0);
  const second = blade.clone();
  second.rotateY(Math.PI / 2);
  const merged = mergeBufferGeometries([blade, second]);

  // 顶点色：根部偏暗、尖端偏亮
  const pos = merged.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp(pos.getY(i) / 0.5, 0, 1);
    colors[i * 3] = 0.16 + t * 0.22;
    colors[i * 3 + 1] = 0.3 + t * 0.4;
    colors[i * 3 + 2] = 0.14 + t * 0.16;
  }
  merged.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return merged;
}

/** 轻量几何合并（避免引入 addons 依赖） */
function mergeBufferGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = new THREE.BufferGeometry();
  let vertexCount = 0;
  let indexCount = 0;
  for (const g of geos) {
    vertexCount += g.attributes.position.count;
    indexCount += g.index ? g.index.count : g.attributes.position.count;
  }
  const position = new Float32Array(vertexCount * 3);
  const normal = new Float32Array(vertexCount * 3);
  const uv = new Float32Array(vertexCount * 2);
  const index = new Uint32Array(indexCount);
  let vo = 0;
  let io = 0;
  for (const g of geos) {
    const p = g.attributes.position;
    const n = g.attributes.normal;
    const u = g.attributes.uv;
    position.set(p.array as Float32Array, vo * 3);
    if (n) normal.set(n.array as Float32Array, vo * 3);
    if (u) uv.set(u.array as Float32Array, vo * 2);
    const idx = g.index;
    if (idx) {
      for (let i = 0; i < idx.count; i++) index[io++] = idx.getX(i) + vo;
    } else {
      for (let i = 0; i < p.count; i++) index[io++] = i + vo;
    }
    vo += p.count;
  }
  merged.setAttribute("position", new THREE.BufferAttribute(position, 3));
  merged.setAttribute("normal", new THREE.BufferAttribute(normal, 3));
  merged.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  merged.setIndex(new THREE.BufferAttribute(index, 1));
  return merged;
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
