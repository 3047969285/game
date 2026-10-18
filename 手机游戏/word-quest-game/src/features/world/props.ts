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

/** 树干：带板根与树皮纵脊的旋转体（径向噪声位移 + 顶点色深浅沟壑） */
export function trunkGeometry(height: number, base: number, top: number, color: THREE.Color, lean: number): THREE.BufferGeometry {
  const rows = 16;
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= rows; i++) {
    const t = i / rows;
    const flare = base * 0.6 * Math.exp(-t * 13);
    pts.push(new THREE.Vector2(THREE.MathUtils.lerp(base, top, Math.pow(t, 0.85)) + flare, -0.08 * height + t * height * 1.08));
  }
  const lathe = new THREE.LatheGeometry(pts, 18);
  const p = lathe.attributes.position;
  const colors = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const y = p.getY(i);
    const a = Math.atan2(z, x);
    const r = Math.hypot(x, z);
    const ridge = Math.sin(a * 7 + y * 0.9 / Math.max(0.2, height * 0.15)) * 0.5 + Math.sin(a * 13 - y * 1.7 / Math.max(0.2, height * 0.15)) * 0.3 + vnoise(x * 3, y * 2.2, z * 3, 3) * 0.6;
    const lobe = Math.max(0, Math.sin(a * 5 + 0.7)) * Math.exp(-Math.max(0, y) / (height * 0.12));
    const k = 1 + ridge * 0.055 + lobe * 0.28;
    p.setX(i, x * k + lean * Math.pow(Math.max(0, y) / height, 2) * height);
    p.setZ(i, z * k);
    const crevice = 0.72 + 0.28 * THREE.MathUtils.clamp(0.5 + ridge * 0.6, 0, 1);
    const dark = 0.7 + 0.3 * Math.min(1, Math.max(0, y) / (height * 0.3));
    const kc = crevice * dark;
    colors[i * 3] = color.r * kc;
    colors[i * 3 + 1] = color.g * kc;
    colors[i * 3 + 2] = color.b * kc;
    void r;
  }
  lathe.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  lathe.deleteAttribute("uv");
  lathe.computeVertexNormals();
  return lathe;
}

const FOLIAGE_SOLID_UV = 0.02;

/** 给无 UV 的团块几何写入常量 UV（指向叶贴图左上角的实心色块），与叶片卡片共用同一材质 */
function withConstUV(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  const n = geo.attributes.position.count;
  const uv = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    uv[i * 2] = FOLIAGE_SOLID_UV;
    uv[i * 2 + 1] = 1 - FOLIAGE_SOLID_UV;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

let foliageMat: THREE.MeshStandardMaterial | undefined;
function getFoliageMaterial(): THREE.MeshStandardMaterial {
  if (!foliageMat) {
    foliageMat = new THREE.MeshStandardMaterial({ map: getLeafTexture(), alphaTest: 0.5, vertexColors: true, side: THREE.DoubleSide, roughness: 0.86, metalness: 0.02 });
  }
  return foliageMat;
}

const UP = new THREE.Vector3(0, 1, 0);
const LEAF_TONES = [0x4a8a52, 0x3f7d4f, 0x56994f, 0x356b43, 0x62a050, 0x468a4a, 0x6aa656];

/** 叶片卡片：单个带顶点色的四边形，按位置 / 朝向 / 尺寸摆好 */
function leafCard(p: THREE.Vector3, size: number, rnd: () => number, up: number, tmp: { m: THREE.Matrix4; q: THREE.Quaternion; e: THREE.Euler; c: THREE.Color }, tint: [number, number, number, number] = [0.26, 0.5, 0.36, 2.1]): THREE.BufferGeometry {
  tmp.e.set(rnd() * Math.PI, rnd() * Math.PI * 2, rnd() * Math.PI);
  tmp.q.setFromEuler(tmp.e);
  tmp.m.compose(p, tmp.q, new THREE.Vector3(size, size, size));
  const card = new THREE.PlaneGeometry(1, 1);
  const light = 0.7 + 0.5 * THREE.MathUtils.clamp(0.5 + up * 0.6, 0, 1);
  tmp.c.setHSL(tint[0] + (rnd() - 0.5) * 0.05, tint[1], tint[2] * light + 0.1).multiplyScalar(tint[3]);
  const colors = new Float32Array(card.attributes.position.count * 3);
  for (let i = 0; i < colors.length; i += 3) {
    colors[i] = tmp.c.r;
    colors[i + 1] = tmp.c.g;
    colors[i + 2] = tmp.c.b;
  }
  card.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  card.applyMatrix4(tmp.m);
  return card;
}

interface BroadleafOpts {
  /** 米 → 世界单位的缩放（远古树 1，普通树 ≈ 0.2 × scale） */
  u: number;
  limbs: number;
  segs: number;
  /** 从第几段起长出分叉小枝 */
  forkFrom: number;
  roots: number;
  blobsPerTip: number;
  blobDetail: number;
  blobScale: number;
  cardsPerTip: number;
  cardSize: [number, number];
  seed: number;
}

/**
 * 阔叶树生成器：板根主干 → 放射状主枝（逐段收细并二次弯曲）→ 分叉小枝 →
 * 枝梢处叶团 + 外层叶片卡片，木质 / 叶两个合并网格。
 */
function buildBroadleaf(o: BroadleafOpts): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(o.seed);
  const u = o.u;
  const bark = new THREE.Color(0x5b4533);
  const woodGeos: THREE.BufferGeometry[] = [];
  const limb = (a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number, tone = 1): void => {
    const dir = b.clone().sub(a);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(r1, r0, len, 7, 1);
    geo.translate(0, len / 2, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize());
    woodGeos.push(bake(geo, new THREE.Matrix4().compose(a, q, new THREE.Vector3(1, 1, 1)), bark.clone().multiplyScalar(tone), (y) => 0.8 + 0.2 * Math.min(1, y / len)));
  };

  const trunkH = 13 * u;
  woodGeos.push(trunkGeometry(trunkH, 1.9 * u, 1.15 * u, bark, (rnd() - 0.5) * 0.02));
  for (let i = 0; i < o.roots; i++) {
    const a = (i / o.roots) * Math.PI * 2 + rnd() * 0.4;
    const out = (3.4 + rnd() * 2.2) * u;
    limb(new THREE.Vector3(Math.cos(a) * u, 2.2 * u, Math.sin(a) * u), new THREE.Vector3(Math.cos(a) * out, -0.25 * u, Math.sin(a) * out), 0.7 * u, 0.18 * u, 0.95);
  }

  const tips: Array<{ p: THREE.Vector3; r: number }> = [];
  for (let i = 0; i < o.limbs; i++) {
    const a = (i / o.limbs) * Math.PI * 2 + rnd() * 0.4;
    const y0 = trunkH * (0.62 + rnd() * 0.3);
    const reach = (7.5 + rnd() * 3.5) * u;
    const rise = (5 + rnd() * 4) * u;
    let prev = new THREE.Vector3(Math.cos(a) * 0.5 * u, y0, Math.sin(a) * 0.5 * u);
    for (let s = 1; s <= o.segs; s++) {
      const t = s / o.segs;
      const p = new THREE.Vector3(Math.cos(a) * reach * t, y0 + rise * Math.pow(t, 0.8) + Math.sin(t * 3 + i) * 0.4 * u, Math.sin(a) * reach * t);
      const r0 = Math.max(0.1 * u, 0.62 * u * (1 - ((s - 1) / o.segs) * 0.85));
      const r1 = Math.max(0.07 * u, 0.62 * u * (1 - (s / o.segs) * 0.85));
      limb(prev, p, r0, r1);
      if (s >= o.forkFrom) {
        for (const side of [-1, 1]) {
          const b = a + side * (0.5 + rnd() * 0.5);
          const end = p.clone().add(new THREE.Vector3(Math.cos(b) * (2.2 + rnd() * 1.6) * u, (1.6 + rnd() * 2.2) * u, Math.sin(b) * (2.2 + rnd() * 1.6) * u));
          limb(p, end, r1 * 0.8, 0.05 * u);
          tips.push({ p: end, r: (2.1 + rnd() * 1.2) * u });
        }
      }
      if (s === 2) tips.push({ p: p.clone().add(new THREE.Vector3(0, 1.2 * u, 0)), r: (2.4 + rnd() * 1.2) * u });
      prev = p;
    }
    tips.push({ p: prev.clone().add(new THREE.Vector3(0, 0.8 * u, 0)), r: (2.8 + rnd() * 1.2) * u });
  }
  tips.push({ p: new THREE.Vector3(0, trunkH + 4.5 * u, 0), r: 3.8 * u });
  finish(g, woodGeos, vcMaterial(0.95, "bark"));

  const leafGeos: THREE.BufferGeometry[] = [];
  const tmp = { m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), c: new THREE.Color() };
  for (const { p, r } of tips) {
    for (let k = 0; k < o.blobsPerTip; k++) {
      const col = new THREE.Color(LEAF_TONES[Math.floor(rnd() * LEAF_TONES.length)]).offsetHSL((rnd() - 0.5) * 0.04, 0, (rnd() - 0.5) * 0.07).multiplyScalar(1.35);
      const spread = k === 0 ? 0 : r * 0.85;
      const jx = (rnd() - 0.5) * spread;
      const jy = (rnd() - 0.3) * spread * 0.6;
      const jz = (rnd() - 0.5) * spread;
      const rr = r * (k === 0 ? o.blobScale : 0.34 + rnd() * 0.3);
      leafGeos.push(withConstUV(bake(organicBlob(Math.floor(rnd() * 5) + 1, o.blobDetail, 0.38), mat4(p.x + jx, p.y + jy, p.z + jz, rr * 1.1, rr * 0.8, rr, rnd() * 3, rnd() * 6, rnd() * 3), col, (y, ny) => (0.5 + 0.5 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1)) * (0.93 + 0.1 * Math.sin(y * 19.3 + k)))));
    }
    for (let k = 0; k < o.cardsPerTip; k++) {
      const dir = new THREE.Vector3(rnd() - 0.5, rnd() - 0.3, rnd() - 0.5).normalize();
      const pos = p.clone().addScaledVector(dir, r * 1.05 * (0.65 + rnd() * 0.55));
      const size = (o.cardSize[0] + rnd() * (o.cardSize[1] - o.cardSize[0])) * u;
      leafGeos.push(leafCard(pos, size, rnd, dir.y, tmp));
    }
  }
  finish(g, leafGeos, getFoliageMaterial());
  return g;
}

/** 阔叶树：板根主干 + 放射分枝 + 枝梢叶团与叶片卡片 */
export function createTree(scale = 1): THREE.Group {
  return buildBroadleaf({ u: 0.2 * scale, limbs: 4, segs: 3, forkFrom: 3, roots: 3, blobsPerTip: 1, blobDetail: 2, blobScale: 0.6, cardsPerTip: 72, cardSize: [1.5, 2.8], seed: Math.floor(scale * 10000) + 77 });
}

/** 远古巨树（单元 3 记忆树）：尺寸直接按米给出，枝叶更密 */
export function createAncientTree(): THREE.Group {
  return buildBroadleaf({ u: 1, limbs: 8, segs: 4, forkFrom: 2, roots: 8, blobsPerTip: 4, blobDetail: 2, blobScale: 0.78, cardsPerTip: 40, cardSize: [1.7, 3.3], seed: 4411 });
}

let leafTexture: THREE.CanvasTexture | undefined;
/** 叶丛贴图：一簇带叶脉的叶片喷射状散开，透明底（alphaTest 裁切） */
function getLeafTexture(): THREE.CanvasTexture {
  if (leafTexture) return leafTexture;
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const rnd = seededRand(8821);
  // 左上角实心色块：供团块几何（常量 UV）取样，保持不透明
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, 10, 10);
  for (let i = 0; i < 16; i++) {
    g.save();
    g.translate(size / 2 + (rnd() - 0.5) * 26, size * 0.62 + (rnd() - 0.5) * 30);
    g.rotate((rnd() - 0.5) * Math.PI * 1.6);
    const len = 60 + rnd() * 46;
    const wid = 15 + rnd() * 10;
    const tone = 0.62 + rnd() * 0.38;
    const grad = g.createLinearGradient(0, 0, len, 0);
    grad.addColorStop(0, `rgb(${Math.round(74 * tone)},${Math.round(120 * tone)},${Math.round(52 * tone)})`);
    grad.addColorStop(1, `rgb(${Math.round(150 * tone)},${Math.round(190 * tone)},${Math.round(84 * tone)})`);
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(0, 0);
    g.quadraticCurveTo(len * 0.5, -wid, len, 0);
    g.quadraticCurveTo(len * 0.5, wid, 0, 0);
    g.fill();
    g.strokeStyle = "rgba(40,70,30,0.55)";
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(len * 0.92, 0);
    g.stroke();
    g.restore();
  }
  leafTexture = new THREE.CanvasTexture(c);
  leafTexture.colorSpace = THREE.SRGBColorSpace;
  leafTexture.anisotropy = 4;
  return leafTexture;
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
  const pineTmp = { m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), c: new THREE.Color() };
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
    leafGeos.push(withConstUV(bake(cone, mat4(0, (1.05 + t * 2.6) * s, 0, radius * 0.92, height, radius * 0.92, 0, rnd() * Math.PI, 0), col, (y) => 0.55 + 0.45 * (y / 1.0 + 0.5))));
    // 针叶簇：沿枝裙边缘向外下垂的卡片，打碎锥形轮廓
    for (let k = 0; k < 34; k++) {
      const ang = rnd() * Math.PI * 2;
      const rr = radius * (0.35 + rnd() * 0.7);
      const ph = (1.05 + t * 2.6) * s - height * 0.5 * (rr / radius) + height * 0.5 + (rnd() - 0.5) * height * 0.2;
      leafGeos.push(leafCard(new THREE.Vector3(Math.cos(ang) * rr, ph - height * (rr / radius) * 0.55, Math.sin(ang) * rr), (0.5 + rnd() * 0.45) * s, rnd, -0.4, pineTmp, [0.38, 0.45, 0.2, 1.5]));
    }
  }
  finish(g, leafGeos, getFoliageMaterial());
  return g;
}

/** 灌木：6~8 团细密不规则叶丛，偶有浆果 */
export function createBush(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 31337) + 5);
  const tones = [0x3f7448, 0x4a8553, 0x35643f, 0x56915a, 0x6b9446];
  const geos: THREE.BufferGeometry[] = [];
  const count = 6 + Math.floor(rnd() * 3);
  const bushTmp = { m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), c: new THREE.Color() };
  for (let i = 0; i < count; i++) {
    const r = (0.3 + rnd() * 0.3) * scale;
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * 0.55 * scale;
    const col = new THREE.Color(tones[Math.floor(rnd() * tones.length)]).offsetHSL(0, 0, (rnd() - 0.5) * 0.05);
    geos.push(withConstUV(bake(organicBlob(Math.floor(rnd() * 3) + 1, 2, 0.24), mat4(Math.cos(a) * d, r * 0.7, Math.sin(a) * d, r * 0.9, r * 0.7, r * 0.84, rnd() * 3, rnd() * 6, 0), col.multiplyScalar(1.25), (_y, ny) => 0.6 + 0.4 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1))));
    for (let k = 0; k < 16; k++) {
      const dir = new THREE.Vector3(rnd() - 0.5, rnd() - 0.25, rnd() - 0.5).normalize();
      geos.push(leafCard(new THREE.Vector3(Math.cos(a) * d, r * 0.7, Math.sin(a) * d).addScaledVector(dir, r * (0.8 + rnd() * 0.4)), (0.28 + rnd() * 0.22) * scale, rnd, dir.y, bushTmp, [0.27, 0.5, 0.34, 2.0]));
    }
  }
  finish(g, geos, getFoliageMaterial());
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
