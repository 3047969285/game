import * as THREE from "three";
import { glassCrystal, stone } from "./materials";
import { seededRand } from "./utils";

/** 轻量几何合并（避免引入 addons 依赖） */
function mergeBufferGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = new THREE.BufferGeometry();
  let vertexCount = 0;
  let indexCount = 0;
  const hasColor = geos.some((g) => g.attributes.color);
  for (const g of geos) {
    vertexCount += g.attributes.position.count;
    indexCount += g.index ? g.index.count : g.attributes.position.count;
  }
  const position = new Float32Array(vertexCount * 3);
  const normal = new Float32Array(vertexCount * 3);
  const uv = new Float32Array(vertexCount * 2);
  const color = hasColor ? new Float32Array(vertexCount * 3) : null;
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
    if (color) {
      if (g.attributes.color) color.set(g.attributes.color.array as Float32Array, vo * 3);
      else color.fill(1, vo * 3, (vo + p.count) * 3);
    }
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
  if (color) merged.setAttribute("color", new THREE.BufferAttribute(color, 3));
  merged.setIndex(new THREE.BufferAttribute(index, 1));
  return merged;
}

/** 草丛单元几何的最大高度（供着色器做摆动归一化） */
export const GRASS_TUFT_HEIGHT = 0.58;

/**
 * 草丛单元几何：由多片带弯曲的锥形草叶组成一簇。
 *
 * 相比原先"两片交叉细长矩形"的牙签造型，这里每片草叶根部宽、尖端收窄并向外弯曲，
 * 一簇 7 片，高度控制在膝下，看起来才像真正的草皮。
 */
export function grassBladeGeometry(bladeCount = 7): THREE.BufferGeometry {
  const rnd = seededRand(90210);
  const geos: THREE.BufferGeometry[] = [];

  for (let b = 0; b < bladeCount; b++) {
    const h = 0.26 + rnd() * 0.32;
    const w = 0.045 + rnd() * 0.03;
    const bend = (rnd() - 0.5) * 0.3;
    const bendZ = (rnd() - 0.5) * 0.3;
    const segs = 4;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const y = t * h;
      // 尖端收窄
      const halfW = (w * (1 - t * 0.9)) * 0.5;
      // 二次弯曲，让草叶自然外翻
      const ox = bend * t * t;
      const oz = bendZ * t * t;
      positions.push(-halfW + ox, y, oz);
      positions.push(halfW + ox, y, oz);
      uvs.push(0, t, 1, t);
    }
    for (let s = 0; s < segs; s++) {
      const a = s * 2;
      const bb = s * 2 + 1;
      const c = s * 2 + 2;
      const d = s * 2 + 3;
      indices.push(a, c, bb, bb, c, d);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();

    // 每片草叶独立的明暗 / 冷暖，让整片草皮不再是一块同色
    const tint = 0.82 + rnd() * 0.34;
    const warm = rnd();
    const colors = new Float32Array(positions.length);
    for (let v = 0; v < positions.length / 3; v++) {
      const t = THREE.MathUtils.clamp(positions[v * 3 + 1] / GRASS_TUFT_HEIGHT, 0, 1);
      colors[v * 3] = (0.19 + t * 0.36 + warm * 0.06) * tint;
      colors[v * 3 + 1] = (0.33 + t * 0.5) * tint;
      colors[v * 3 + 2] = (0.12 + t * 0.24 + (1 - warm) * 0.05) * tint;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 每片草叶随机朝向 + 轻微倾倒
    g.rotateZ((rnd() - 0.5) * 0.4);
    g.rotateY(rnd() * Math.PI * 2);
    geos.push(g);
  }

  return mergeBufferGeometries(geos);
}

/** 阔叶树：锥形树干 + 分枝 + 分层圆润树冠 */
export function createTree(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 10000) + 77);

  // 树干：明显上细下粗，带轻微倾斜，别像根笔直的木杆
  const trunkH = 2.6 * scale;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13 * scale, 0.34 * scale, trunkH, 9),
    stone(0x4a3728, 0.95)
  );
  trunk.position.y = trunkH / 2;
  trunk.rotation.z = (rnd() - 0.5) * 0.09;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  g.add(trunk);

  // 分枝：从树干中上部斜伸出的几根枝桠，把树冠"撑"起来
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + rnd() * 0.4;
    const len = (0.85 + rnd() * 0.6) * scale;
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045 * scale, 0.11 * scale, len, 6),
      stone(0x453425, 0.95)
    );
    branch.position.set(Math.cos(a) * 0.2 * scale, trunkH * (0.68 + i * 0.07), Math.sin(a) * 0.2 * scale);
    branch.rotation.set(Math.cos(a) * 0.75, 0, -Math.sin(a) * 0.75);
    branch.castShadow = true;
    g.add(branch);
  }

  // 根部外扩（树干基座加粗一圈，避免"细杆插地"）
  const root = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4 * scale, 0.52 * scale, 0.34 * scale, 9),
    stone(0x42331f, 0.95)
  );
  root.position.y = 0.14 * scale;
  root.receiveShadow = true;
  g.add(root);

  // 树冠：多个球簇，色调有细微差异
  const leafTones = [0x3f7d4f, 0x4a8c59, 0x356b43, 0x55996a, 0x2f6039];
  const crownY = trunkH + 0.4 * scale;
  const blobs: Array<[number, number, number, number]> = [
    [0, 0.15, 0, 1.15],
    [0.65, -0.15, 0.28, 0.82],
    [-0.62, -0.08, -0.34, 0.8],
    [0.2, 0.7, -0.14, 0.9],
    [-0.28, 0.58, 0.56, 0.72],
    [0.38, 0.48, -0.6, 0.68],
    [-0.1, 1.1, 0.08, 0.6],
  ];
  for (const [bx, by, bz, br] of blobs) {
    const mat = new THREE.MeshStandardMaterial({
      color: leafTones[Math.floor(rnd() * leafTones.length)],
      roughness: 0.86,
      metalness: 0.02,
      flatShading: true,
    });
    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(br * scale, 1), mat);
    blob.position.set(bx * scale, crownY + by * scale, bz * scale);
    blob.rotation.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI);
    blob.scale.set(1, 0.86 + rnd() * 0.2, 1);
    blob.castShadow = true;
    g.add(blob);
  }
  return g;
}

/** 针叶松：更密的锥层 + 细微色差，剪影更自然 */
export function createPine(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 7919) + 13);

  const trunkH = 1.5 * scale;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1 * scale, 0.2 * scale, trunkH, 8),
    stone(0x3d2e22, 0.9)
  );
  trunk.position.y = trunkH / 2;
  trunk.castShadow = true;
  g.add(trunk);

  const layers = 6;
  for (let i = 0; i < layers; i++) {
    const t = i / (layers - 1);
    const radius = (1.25 - t * 0.85) * scale;
    const height = (1.15 - t * 0.3) * scale;
    const tone = new THREE.Color(0x1f4a37).offsetHSL(0, 0, (rnd() - 0.5) * 0.06);
    const layer = new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, 9),
      new THREE.MeshStandardMaterial({ color: tone, roughness: 0.8, metalness: 0.02, flatShading: true })
    );
    layer.position.y = (1.15 + t * 2.5) * scale;
    layer.rotation.y = rnd() * Math.PI;
    layer.castShadow = true;
    g.add(layer);
  }
  return g;
}

/** 灌木：低矮的球簇 */
export function createBush(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 31337) + 5);
  const tones = [0x3a6b45, 0x447a4f, 0x2f5a3a, 0x4d8557];
  const count = 4 + Math.floor(rnd() * 3);
  for (let i = 0; i < count; i++) {
    const r = (0.32 + rnd() * 0.3) * scale;
    const blob = new THREE.Mesh(
      new THREE.IcosahedronGeometry(r, 1),
      new THREE.MeshStandardMaterial({
        color: tones[Math.floor(rnd() * tones.length)],
        roughness: 0.88,
        metalness: 0.02,
        flatShading: true,
      })
    );
    const a = rnd() * Math.PI * 2;
    const d = rnd() * 0.45 * scale;
    blob.position.set(Math.cos(a) * d, r * 0.72, Math.sin(a) * d);
    blob.rotation.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI);
    blob.castShadow = true;
    g.add(blob);
  }
  return g;
}

/** 野花：细茎 + 交叉花瓣面片（不透明双面，成本低） */
export function createFlower(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 6151) + 29);
  const petalColors = [0xf2d24b, 0xef7fa8, 0xf0f0f0, 0xb98cf0, 0xf2934b];

  const stems = 3 + Math.floor(rnd() * 3);
  for (let i = 0; i < stems; i++) {
    const h = (0.28 + rnd() * 0.28) * scale;
    const color = petalColors[Math.floor(rnd() * petalColors.length)];
    const a = rnd() * Math.PI * 2;
    const d = rnd() * 0.22 * scale;
    const x = Math.cos(a) * d;
    const z = Math.sin(a) * d;

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012 * scale, 0.016 * scale, h, 4),
      new THREE.MeshStandardMaterial({ color: 0x4a7a3a, roughness: 0.9 })
    );
    stem.position.set(x, h / 2, z);

    const head = new THREE.Mesh(
      new THREE.CircleGeometry(0.075 * scale, 6),
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.75,
        metalness: 0,
        side: THREE.DoubleSide,
        emissive: color,
        emissiveIntensity: 0.06,
      })
    );
    head.position.set(x, h, z);
    head.rotation.x = -Math.PI / 2 + (rnd() - 0.5) * 0.6;

    g.add(stem, head);
  }
  return g;
}

/** 芦苇 / 高草（水边点缀） */
export function createReed(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 4111) + 3);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6f8f4a,
    roughness: 0.9,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  for (let i = 0; i < 5; i++) {
    const h = (0.8 + rnd() * 0.9) * scale;
    const blade = new THREE.Mesh(new THREE.PlaneGeometry(0.07 * scale, h), mat);
    blade.position.set((rnd() - 0.5) * 0.35 * scale, h / 2, (rnd() - 0.5) * 0.35 * scale);
    blade.rotation.set((rnd() - 0.5) * 0.3, rnd() * Math.PI, (rnd() - 0.5) * 0.3);
    blade.castShadow = true;
    g.add(blade);
  }
  return g;
}

/** 倒木 */
export function createFallenLog(scale = 1): THREE.Mesh {
  const rnd = seededRand(Math.floor(scale * 2027) + 11);
  const len = (1.6 + rnd() * 1.4) * scale;
  const log = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16 * scale, 0.19 * scale, len, 8),
    stone(0x503b29, 0.95)
  );
  log.rotation.z = Math.PI / 2;
  log.rotation.y = rnd() * Math.PI;
  log.position.y = 0.16 * scale;
  log.castShadow = true;
  log.receiveShadow = true;
  return log;
}

/** 岩石：不规则多面体，带轻微色差 */
export function createRock(scale = 1): THREE.Mesh {
  const rnd = seededRand(Math.floor(scale * 9973) + 17);
  const geo = new THREE.DodecahedronGeometry(0.55 * scale, 0);
  // 随机扰动顶点，避免所有石头长得一样
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const f = 0.82 + rnd() * 0.36;
    pos.setXYZ(i, pos.getX(i) * f, pos.getY(i) * (f * 0.8), pos.getZ(i) * f);
  }
  geo.computeVertexNormals();
  const tone = new THREE.Color(0x6a7078).offsetHSL(0, 0, (rnd() - 0.5) * 0.1);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: tone, roughness: 0.92, metalness: 0.03, flatShading: true })
  );
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
