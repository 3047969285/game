import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
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

// ─────────────────────────────────────────────────────────────
// 自然物：树 / 松 / 灌木 / 岩石。每个物体合并成 1~2 个网格（顶点色承载明暗与色调），
// 共享材质与程序化的有机几何，既细致又不增加太多 draw call。
// ─────────────────────────────────────────────────────────────

const vcMats = new Map<string, THREE.MeshStandardMaterial>();
export function vcMaterial(roughness = 0.88, key = "leaf"): THREE.MeshStandardMaterial {
  const id = `${key}:${roughness}`;
  let m = vcMats.get(id);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness, metalness: 0.02 });
    vcMats.set(id, m);
  }
  return m;
}

/** 顶点噪声（按位置确定性，保证相同位置的顶点位移一致，网格不开裂） */
function vnoise(x: number, y: number, z: number, seed: number): number {
  return (
    Math.sin(x * 2.3 + seed) * Math.cos(y * 2.1 + seed * 1.3) * 0.5 +
    Math.sin(z * 2.7 - seed * 0.7 + x * 1.1) * 0.35 +
    Math.sin((x + y + z) * 4.1 + seed) * 0.15
  );
}

const organicCache = new Map<string, THREE.BufferGeometry>();
/** 不规则圆润团块（树冠 / 灌木 / 岩石），已焊接顶点并重算平滑法线 */
export function organicBlob(seed: number, detail: number, amount: number): THREE.BufferGeometry {
  const key = `${seed}:${detail}:${amount}`;
  const hit = organicCache.get(key);
  if (hit) return hit;
  const welded = mergeVertices(new THREE.IcosahedronGeometry(1, detail), 1e-4);
  const p = welded.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = vnoise(v.x, v.y, v.z, seed);
    v.multiplyScalar(1 + n * amount);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  welded.computeVertexNormals();
  welded.deleteAttribute("uv");
  organicCache.set(key, welded);
  return welded;
}

/** 烘焙：套矩阵 + 写顶点色（color 为基色，shade 控制随高度 / 法线的明暗） */
export function bake(
  source: THREE.BufferGeometry,
  matrix: THREE.Matrix4,
  color: THREE.Color,
  shade: (y: number, ny: number) => number = () => 1
): THREE.BufferGeometry {
  const geo = source.clone();
  geo.deleteAttribute("uv");
  if (!geo.attributes.normal) geo.computeVertexNormals();
  const p0 = geo.attributes.position;
  const n0 = geo.attributes.normal;
  const colors = new Float32Array(p0.count * 3);
  for (let i = 0; i < p0.count; i++) {
    const k = shade(p0.getY(i), n0.getY(i));
    colors[i * 3] = color.r * k;
    colors[i * 3 + 1] = color.g * k;
    colors[i * 3 + 2] = color.b * k;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.applyMatrix4(matrix);
  return geo.index ? geo : mergeVertices(geo, 1e-4);
}

const TMP_M = new THREE.Matrix4();
const TMP_Q = new THREE.Quaternion();
const TMP_E = new THREE.Euler();
const TMP_P = new THREE.Vector3();
const TMP_S = new THREE.Vector3();
export function mat4(x: number, y: number, z: number, sx = 1, sy = sx, sz = sx, rx = 0, ry = 0, rz = 0): THREE.Matrix4 {
  TMP_E.set(rx, ry, rz);
  TMP_Q.setFromEuler(TMP_E);
  TMP_P.set(x, y, z);
  TMP_S.set(sx, sy, sz);
  return TMP_M.clone().compose(TMP_P, TMP_Q, TMP_S);
}

export function finish(group: THREE.Group, geos: THREE.BufferGeometry[], material: THREE.Material, cast = true): void {
  if (geos.length === 0) return;
  const merged = mergeGeometries(geos, false);
  if (!merged) return;
  const mesh = new THREE.Mesh(merged, material);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  group.add(mesh);
}

/** 树干：带根部外扩的旋转体（顶点色做树皮纵向纹） */
export function trunkGeometry(height: number, base: number, top: number, color: THREE.Color, lean: number): THREE.BufferGeometry {
  const pts = [
    new THREE.Vector2(base * 1.55, -0.1),
    new THREE.Vector2(base * 1.22, height * 0.07),
    new THREE.Vector2(base * 0.98, height * 0.2),
    new THREE.Vector2((base + top) * 0.5, height * 0.55),
    new THREE.Vector2(top, height),
  ];
  const lathe = new THREE.LatheGeometry(pts, 11);
  const p = lathe.attributes.position;
  const colors = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const a = Math.atan2(p.getZ(i), p.getX(i));
    const stripe = 0.82 + 0.18 * Math.sin(a * 7 + p.getY(i) * 1.3);
    const dark = 0.7 + 0.3 * Math.min(1, p.getY(i) / (height * 0.3));
    const k = stripe * dark;
    colors[i * 3] = color.r * k;
    colors[i * 3 + 1] = color.g * k;
    colors[i * 3 + 2] = color.b * k;
    // 微弯：越高偏移越多
    p.setX(i, p.getX(i) + lean * Math.pow(p.getY(i) / height, 2) * height);
  }
  lathe.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  lathe.deleteAttribute("uv");
  lathe.computeVertexNormals();
  return lathe;
}

/** 阔叶树：弯曲树干 + 分枝 + 九团不规则树冠（顶亮底暗），合并为 2 个网格 */
export function createTree(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 10000) + 77);
  const s = scale;

  const trunkH = 2.7 * s;
  const bark = new THREE.Color(0x5a4230);
  const woodGeos: THREE.BufferGeometry[] = [trunkGeometry(trunkH, 0.2 * s, 0.1 * s, bark, (rnd() - 0.5) * 0.06)];
  const branchGeo = new THREE.CylinderGeometry(0.035 * s, 0.09 * s, 1, 6, 1);
  branchGeo.translate(0, 0.5, 0);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + rnd() * 0.5;
    const len = (0.9 + rnd() * 0.7) * s;
    const tilt = 0.7 + rnd() * 0.4;
    const y = trunkH * (0.62 + rnd() * 0.3);
    woodGeos.push(bake(branchGeo, mat4(0, y, 0, 1, len, 1, Math.cos(a) * tilt, 0, -Math.sin(a) * tilt), bark.clone().multiplyScalar(0.9)));
  }
  finish(g, woodGeos, vcMaterial(0.95, "bark"));

  const tones = [0x4a8a52, 0x3f7d4f, 0x56994f, 0x356b43, 0x62a050, 0x468a4a];
  const crownY = trunkH + 0.25 * s;
  const leafGeos: THREE.BufferGeometry[] = [];
  const lumps = 9 + Math.floor(rnd() * 3);
  for (let i = 0; i < lumps; i++) {
    const a = rnd() * Math.PI * 2;
    const ring = i === 0 ? 0 : 0.55 + rnd() * 0.7;
    const layer = i === 0 ? 0.25 : (rnd() - 0.35) * 1.6;
    const r = (i === 0 ? 1.1 : 0.62 + rnd() * 0.42) * s;
    const col = new THREE.Color(tones[Math.floor(rnd() * tones.length)]).offsetHSL((rnd() - 0.5) * 0.03, 0, (rnd() - 0.5) * 0.05);
    leafGeos.push(
      bake(organicBlob(Math.floor(rnd() * 4) + 1, 3, 0.2), mat4(Math.cos(a) * ring * s, crownY + layer * s, Math.sin(a) * ring * s, r * 1.08, r * 0.86, r, rnd() * 3, rnd() * 6, rnd() * 3), col, (y, ny) => 0.62 + 0.38 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1) + y * 0.0)
    );
  }
  finish(g, leafGeos, vcMaterial(0.86, "leaf"));
  return g;
}

/**
 * 远古巨树（单元 3 记忆树）：厚实的板根与主干、八条向上分叉的粗枝（逐级收细）、
 * 枝端与枝中的叶团（约 50 团，顶亮底暗），整体合并为 2 个网格。尺寸直接按米给出。
 */
export function createAncientTree(): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(4411);
  const bark = new THREE.Color(0x5b4533);
  const woodGeos: THREE.BufferGeometry[] = [];
  const unitCyl = new THREE.CylinderGeometry(1, 1, 1, 8, 1);
  unitCyl.translate(0, 0.5, 0);
  const up = new THREE.Vector3(0, 1, 0);
  const limb = (a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number, tone = 1): void => {
    const dir = b.clone().sub(a);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(r1, r0, len, 9, 1);
    geo.translate(0, len / 2, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir.normalize());
    woodGeos.push(bake(geo, new THREE.Matrix4().compose(a, q, new THREE.Vector3(1, 1, 1)), bark.clone().multiplyScalar(tone), (y) => 0.8 + 0.2 * Math.min(1, y / len)));
  };

  // 主干 + 板根
  const trunkH = 13;
  woodGeos.push(trunkGeometry(trunkH, 1.9, 1.15, bark, 0.012));
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + rnd() * 0.3;
    const out = 3.4 + rnd() * 2.2;
    limb(new THREE.Vector3(Math.cos(a) * 1.0, 2.2, Math.sin(a) * 1.0), new THREE.Vector3(Math.cos(a) * out, -0.25, Math.sin(a) * out), 0.7, 0.18, 0.95);
  }

  // 主枝：从树干上部放射状向外上方伸展，沿途二次弯曲并分出小枝
  const tips: Array<{ p: THREE.Vector3; r: number }> = [];
  const limbs = 8;
  for (let i = 0; i < limbs; i++) {
    const a = (i / limbs) * Math.PI * 2 + rnd() * 0.4;
    const y0 = trunkH * (0.62 + rnd() * 0.3);
    const reach = 7.5 + rnd() * 3.5;
    const rise = 5 + rnd() * 4;
    let prev = new THREE.Vector3(Math.cos(a) * 0.5, y0, Math.sin(a) * 0.5);
    const segs = 4;
    for (let s = 1; s <= segs; s++) {
      const t = s / segs;
      const p = new THREE.Vector3(Math.cos(a) * reach * t, y0 + rise * Math.pow(t, 0.8) + Math.sin(t * 3 + i) * 0.4, Math.sin(a) * reach * t);
      const r0 = 0.62 * (1 - (s - 1) / segs * 0.85);
      const r1 = 0.62 * (1 - s / segs * 0.85);
      limb(prev, p, Math.max(0.1, r0), Math.max(0.07, r1));
      if (s >= 2) {
        // 分叉小枝
        for (const side of [-1, 1]) {
          const b = a + side * (0.5 + rnd() * 0.5);
          const end = p.clone().add(new THREE.Vector3(Math.cos(b) * (2.2 + rnd() * 1.6), 1.6 + rnd() * 2.2, Math.sin(b) * (2.2 + rnd() * 1.6)));
          limb(p, end, r1 * 0.8, 0.05);
          tips.push({ p: end, r: 2.1 + rnd() * 1.2 });
        }
      }
      if (s === 2 || s === 3) tips.push({ p: p.clone().add(new THREE.Vector3(0, 1.2, 0)), r: 2.4 + rnd() * 1.2 });
      prev = p;
    }
    tips.push({ p: prev.clone().add(new THREE.Vector3(0, 0.8, 0)), r: 2.8 + rnd() * 1.2 });
  }
  tips.push({ p: new THREE.Vector3(0, trunkH + 4.5, 0), r: 3.8 });
  finish(g, woodGeos, vcMaterial(0.95, "bark"));

  // 叶团：枝梢处的不规则团块，向外 / 向上渐亮
  const tones = [0x4a8a52, 0x3f7d4f, 0x56994f, 0x356b43, 0x62a050, 0x468a4a, 0x6aa656];
  const leafGeos: THREE.BufferGeometry[] = [];
  for (const { p, r: baseR } of tips) {
    const r = baseR * 1.45;
    for (let k = 0; k < 4; k++) {
      const col = new THREE.Color(tones[Math.floor(rnd() * tones.length)]).offsetHSL((rnd() - 0.5) * 0.04, 0, (rnd() - 0.5) * 0.07);
      const spread = k === 0 ? 0 : r * 0.85;
      const jitter = new THREE.Vector3((rnd() - 0.5) * spread, (rnd() - 0.3) * spread * 0.6, (rnd() - 0.5) * spread);
      const rr = r * (k === 0 ? 0.78 : 0.34 + rnd() * 0.3);
      leafGeos.push(bake(organicBlob(Math.floor(rnd() * 5) + 1, 2, 0.38), mat4(p.x + jitter.x, p.y + jitter.y, p.z + jitter.z, rr * 1.1, rr * 0.8, rr, rnd() * 3, rnd() * 6, rnd() * 3), col, (y, ny) => (0.5 + 0.5 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1)) * (0.93 + 0.1 * Math.sin(y * 19.3 + k))));
    }
  }
  finish(g, leafGeos, vcMaterial(0.86, "leaf"));
  return g;
}
/** 针叶松：七层下垂的锯齿枝裙（边缘起伏、底部更暗），合并为 2 个网格 */
export function createPine(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 7919) + 13);
  const s = scale;
  const trunkH = 1.6 * s;
  finish(g, [trunkGeometry(trunkH, 0.15 * s, 0.07 * s, new THREE.Color(0x4a382a), (rnd() - 0.5) * 0.04)], vcMaterial(0.95, "bark"));

  const layers = 7;
  const leafGeos: THREE.BufferGeometry[] = [];
  for (let i = 0; i < layers; i++) {
    const t = i / (layers - 1);
    const radius = (1.35 - t * 0.95) * s;
    const height = (1.05 - t * 0.28) * s;
    const cone = new THREE.ConeGeometry(1, 1, 16, 2);
    const p = cone.attributes.position;
    for (let k = 0; k < p.count; k++) {
      const x = p.getX(k);
      const z = p.getZ(k);
      const y = p.getY(k);
      const a = Math.atan2(z, x);
      const rim = y < 0 ? 1 : 0;
      const wob = 1 + rim * (0.16 * Math.sin(a * 8 + i * 1.7) + 0.08 * Math.sin(a * 13 + i));
      p.setXYZ(k, x * wob, y - rim * 0.08 * (0.5 + 0.5 * Math.sin(a * 8 + i)), z * wob);
    }
    cone.computeVertexNormals();
    const col = new THREE.Color(0x24543d).offsetHSL((rnd() - 0.5) * 0.02, 0, (rnd() - 0.5) * 0.05);
    leafGeos.push(bake(cone, mat4(0, (1.05 + t * 2.6) * s, 0, radius, height, radius, 0, rnd() * Math.PI, 0), col, (y) => 0.55 + 0.45 * (y / 1.0 + 0.5)));
  }
  finish(g, leafGeos, vcMaterial(0.82, "pine"));
  return g;
}

/** 灌木：6~8 团细密不规则叶丛，偶有浆果 */
export function createBush(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 31337) + 5);
  const tones = [0x3f7448, 0x4a8553, 0x35643f, 0x56915a, 0x6b9446];
  const geos: THREE.BufferGeometry[] = [];
  const count = 6 + Math.floor(rnd() * 3);
  for (let i = 0; i < count; i++) {
    const r = (0.3 + rnd() * 0.3) * scale;
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * 0.55 * scale;
    const col = new THREE.Color(tones[Math.floor(rnd() * tones.length)]).offsetHSL(0, 0, (rnd() - 0.5) * 0.05);
    geos.push(bake(organicBlob(Math.floor(rnd() * 3) + 1, 2, 0.24), mat4(Math.cos(a) * d, r * 0.78, Math.sin(a) * d, r * 1.1, r * 0.82, r, rnd() * 3, rnd() * 6, 0), col, (_y, ny) => 0.6 + 0.4 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1)));
  }
  finish(g, geos, vcMaterial(0.9, "bush"));
  if (rnd() > 0.6) {
    const berryGeos: THREE.BufferGeometry[] = [];
    const berry = new THREE.SphereGeometry(0.035 * scale, 6, 5);
    const tone = new THREE.Color([0xd94b58, 0x6a4bd9, 0xf2c14e][Math.floor(rnd() * 3)]);
    for (let i = 0; i < 9; i++) {
      const a = rnd() * Math.PI * 2;
      const d = (0.25 + rnd() * 0.35) * scale;
      berryGeos.push(bake(berry, mat4(Math.cos(a) * d, (0.35 + rnd() * 0.3) * scale, Math.sin(a) * d), tone));
    }
    finish(g, berryGeos, vcMaterial(0.5, "berry"), false);
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

/** 岩石：1~3 块不规则石头，顶面生苔（按法线向上着色），合并为单个网格 */
export function createRock(scale = 1): THREE.Mesh {
  const rnd = seededRand(Math.floor(scale * 9973) + 17);
  const geos: THREE.BufferGeometry[] = [];
  const stoneTone = new THREE.Color(0x77797c).offsetHSL(0, 0, (rnd() - 0.5) * 0.08);
  const pieces = 1 + Math.floor(rnd() * 2.4);
  for (let i = 0; i < pieces; i++) {
    const r = (i === 0 ? 0.55 : 0.2 + rnd() * 0.22) * scale;
    const a = rnd() * Math.PI * 2;
    const d = i === 0 ? 0 : (0.5 + rnd() * 0.35) * scale;
    const blob = organicBlob(Math.floor(rnd() * 5) + 20, 2, 0.34);
    geos.push(
      bake(
        blob,
        mat4(Math.cos(a) * d, r * 0.32, Math.sin(a) * d, r * 1.15, r * 0.7, r, (rnd() - 0.5) * 0.35, rnd() * 6, (rnd() - 0.5) * 0.35),
        stoneTone.clone().offsetHSL(0, 0, (rnd() - 0.5) * 0.06),
        (_y, ny) => 0.62 + 0.38 * THREE.MathUtils.clamp(0.4 + 0.6 * ny, 0, 1)
      )
    );
  }
  const merged = mergeGeometries(geos, false)!;
  // 苔藓：朝上的面向绿色混合
  const n = merged.attributes.normal;
  const col = merged.attributes.color;
  const moss = new THREE.Color(0x58783f);
  for (let i = 0; i < col.count; i++) {
    const up = THREE.MathUtils.smoothstep(n.getY(i), 0.55, 0.9) * 0.85;
    col.setXYZ(i, THREE.MathUtils.lerp(col.getX(i), moss.r * 0.9, up), THREE.MathUtils.lerp(col.getY(i), moss.g * 0.9, up), THREE.MathUtils.lerp(col.getZ(i), moss.b * 0.9, up));
  }
  const mesh = new THREE.Mesh(merged, vcMaterial(0.95, "rock"));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** 石灯笼：基座 + 灯柱 + 火袋（玻璃发光）+ 屋顶 + 宝珠 */
export function createLantern(color: number): THREE.Group {
  const g = new THREE.Group();
  const stoneTone = new THREE.Color(0x8c8b84);
  const parts: THREE.BufferGeometry[] = [];
  const add = (geo: THREE.BufferGeometry, y: number, tone = stoneTone, sx = 1, sy = 1, sz = 1): void => {
    parts.push(bake(geo, mat4(0, y, 0, sx, sy, sz), tone, (_y, ny) => 0.78 + 0.22 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1)));
  };
  add(new RoundedBoxGeometry(0.46, 0.14, 0.46, 1, 0.03), 0.07);
  add(new THREE.CylinderGeometry(0.075, 0.1, 0.62, 10), 0.45);
  add(new RoundedBoxGeometry(0.34, 0.08, 0.34, 1, 0.025), 0.8);
  // 火袋框架：四根立柱
  for (const [x, z] of [[-0.13, -0.13], [0.13, -0.13], [-0.13, 0.13], [0.13, 0.13]] as const) {
    parts.push(bake(new THREE.BoxGeometry(0.045, 0.34, 0.045), mat4(x, 1.02, z), stoneTone.clone().multiplyScalar(0.9)));
  }
  add(new RoundedBoxGeometry(0.4, 0.07, 0.4, 1, 0.025), 1.22);
  const roof = new THREE.ConeGeometry(0.34, 0.24, 4, 1);
  parts.push(bake(roof, mat4(0, 1.38, 0, 1, 1, 1, 0, Math.PI / 4, 0), stoneTone.clone().multiplyScalar(0.85)));
  add(new THREE.SphereGeometry(0.05, 10, 8), 1.55);
  const body = new THREE.Mesh(mergeGeometries(parts, false)!, vcMaterial(0.9, "lantern"));
  body.castShadow = true;
  body.receiveShadow = true;

  const glass = glassCrystal(color, 0.9);
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.2), glass);
  lamp.position.y = 1.02;
  const light = new THREE.PointLight(color, 0.8, 6);
  light.position.y = 1.05;
  g.add(body, lamp, light);
  return g;
}
