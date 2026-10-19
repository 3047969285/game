import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { glassCrystal } from "./materials";
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
export const GRASS_TUFT_HEIGHT = 0.5;

/**
 * 草丛单元几何：一丛 18 片草叶，根部散布在半径 ~0.45 m 的圆内并呈扇形外倾，
 * 叶片根宽尖窄、二次弯曲；顶点色由根部深绿渐变到叶尖黄绿，少量叶片带枯黄色。
 * 这样一格草是一撮有体积的草簇，铺开后才像草坪而不是稀疏的尖刺。
 */
export function grassBladeGeometry(bladeCount = 18): THREE.BufferGeometry {
  const rnd = seededRand(90210);
  const geos: THREE.BufferGeometry[] = [];

  for (let b = 0; b < bladeCount; b++) {
    const t0 = rnd();
    const dist = Math.sqrt(t0) * 0.45;
    const ang = rnd() * Math.PI * 2;
    const bx = Math.cos(ang) * dist;
    const bz = Math.sin(ang) * dist;
    const h = 0.16 + rnd() * 0.34;
    const w = 0.05 + rnd() * 0.04;
    const outward = 0.06 + dist * 0.7 + rnd() * 0.12;
    const segs = 3;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const dirX = Math.cos(ang);
    const dirZ = Math.sin(ang);
    const side = rnd() * Math.PI;
    const sx = Math.cos(side);
    const sz = Math.sin(side);

    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const y = t * h;
      const halfW = (w * (1 - t * 0.92)) * 0.5;
      const bend = outward * t * t;
      const cx = bx + dirX * bend;
      const cz = bz + dirZ * bend;
      positions.push(cx - sx * halfW, y, cz - sz * halfW);
      positions.push(cx + sx * halfW, y, cz + sz * halfW);
      uvs.push(0, t, 1, t);
    }
    for (let s = 0; s < segs; s++) {
      const a = s * 2;
      const bb = s * 2 + 1;
      const c2 = s * 2 + 2;
      const d = s * 2 + 3;
      indices.push(a, c2, bb, bb, c2, d);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();

    // 根部深、尖端亮；少量枯黄叶片
    const tint = 0.78 + rnd() * 0.3;
    const dry = rnd() > 0.82 ? 1 : 0;
    const colors = new Float32Array(positions.length);
    for (let v = 0; v < positions.length / 3; v++) {
      const t = THREE.MathUtils.clamp(positions[v * 3 + 1] / GRASS_TUFT_HEIGHT, 0, 1);
      const green = [0.07 + t * 0.27, 0.15 + t * 0.34, 0.045 + t * 0.1];
      const straw = [0.2 + t * 0.34, 0.17 + t * 0.26, 0.07 + t * 0.1];
      for (let ch = 0; ch < 3; ch++) colors[v * 3 + ch] = (green[ch] * (1 - dry) + straw[ch] * dry) * tint;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
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
export function withConstUV(geo: THREE.BufferGeometry): THREE.BufferGeometry {
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
export function getFoliageMaterial(): THREE.MeshStandardMaterial {
  if (!foliageMat) {
    foliageMat = new THREE.MeshStandardMaterial({ map: getLeafTexture(), alphaTest: 0.5, vertexColors: true, side: THREE.DoubleSide, roughness: 0.86, metalness: 0.02 });
  }
  return foliageMat;
}

const UP = new THREE.Vector3(0, 1, 0);
const LEAF_TONES = [0x4a8a52, 0x3f7d4f, 0x56994f, 0x356b43, 0x62a050, 0x468a4a, 0x6aa656];

/** 叶片卡片：单个带顶点色的四边形，按位置 / 朝向 / 尺寸摆好 */
export function leafCard(p: THREE.Vector3, size: number, rnd: () => number, up: number, tmp: { m: THREE.Matrix4; q: THREE.Quaternion; e: THREE.Euler; c: THREE.Color }, tint: [number, number, number, number] = [0.26, 0.5, 0.36, 2.1]): THREE.BufferGeometry {
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
export function createTree(scale = 1, detail: "high" | "low" = "high"): THREE.Group {
  const low = detail === "low";
  return buildBroadleaf({ u: 0.2 * scale, limbs: 4, segs: 3, forkFrom: 3, roots: 3, blobsPerTip: 1, blobDetail: low ? 1 : 2, blobScale: 0.6, cardsPerTip: low ? 10 : 72, cardSize: [1.5, 2.8], seed: Math.floor(scale * 10000) + 77 });
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
export function createPine(scale = 1, detail: "high" | "low" = "high"): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 7919) + 13);
  const s = scale;
  const trunkH = 1.6 * s;
  finish(g, [trunkGeometry(trunkH, 0.15 * s, 0.07 * s, new THREE.Color(0x4a382a), (rnd() - 0.5) * 0.04)], vcMaterial(0.95, "bark"));

  const layers = detail === "low" ? 4 : 7;
  const cardsPerLayer = detail === "low" ? 6 : 34;
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
    for (let k = 0; k < cardsPerLayer; k++) {
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
export function createBush(scale = 1, detail: "high" | "low" = "high"): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 31337) + 5);
  const tones = [0x3f7448, 0x4a8553, 0x35643f, 0x56915a, 0x6b9446];
  const geos: THREE.BufferGeometry[] = [];
  const low = detail === "low";
  const count = low ? 4 : 6 + Math.floor(rnd() * 3);
  const bushTmp = { m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), c: new THREE.Color() };
  for (let i = 0; i < count; i++) {
    const r = (0.3 + rnd() * 0.3) * scale;
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * 0.55 * scale;
    const col = new THREE.Color(tones[Math.floor(rnd() * tones.length)]).offsetHSL(0, 0, (rnd() - 0.5) * 0.05);
    geos.push(withConstUV(bake(organicBlob(Math.floor(rnd() * 3) + 1, 2, 0.24), mat4(Math.cos(a) * d, r * 0.7, Math.sin(a) * d, r * 0.9, r * 0.7, r * 0.84, rnd() * 3, rnd() * 6, 0), col.multiplyScalar(1.25), (_y, ny) => 0.6 + 0.4 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1))));
    for (let k = 0; k < (low ? 4 : 16); k++) {
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

let doubleVcMat: THREE.MeshStandardMaterial | undefined;
/** 顶点色双面材质（花瓣 / 芦苇叶片等薄片用） */
function doubleVcMaterial(): THREE.MeshStandardMaterial {
  if (!doubleVcMat) doubleVcMat = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.78, metalness: 0, side: THREE.DoubleSide });
  return doubleVcMat;
}

/** 先俯仰再偏航（Ry·Rx）的放置矩阵：花瓣 / 叶片绕自身根部向外倾斜后再绕茎旋转 */
function placeYX(x: number, y: number, z: number, yaw: number, pitch: number): THREE.Matrix4 {
  return new THREE.Matrix4().makeTranslation(x, y, z).multiply(new THREE.Matrix4().makeRotationY(yaw)).multiply(new THREE.Matrix4().makeRotationX(pitch));
}

/** 野花：3–5 枝，每枝细茎 + 两片叶 + 六瓣花冠 + 花蕊，全部合并为一个网格（原先每枝 2 个网格） */
export function createFlower(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 6151) + 29);
  const petalColors = [0xf2d24b, 0xef7fa8, 0xf6f6f0, 0xb98cf0, 0xf2934b, 0xe8584f];
  const stemTone = new THREE.Color(0x4a7a3a);
  const geos: THREE.BufferGeometry[] = [];
  const stems = 3 + Math.floor(rnd() * 3);
  for (let i = 0; i < stems; i++) {
    const h = (0.28 + rnd() * 0.3) * scale;
    const petal = new THREE.Color(petalColors[Math.floor(rnd() * petalColors.length)]);
    const a = rnd() * Math.PI * 2;
    const d = rnd() * 0.24 * scale;
    const x = Math.cos(a) * d;
    const z = Math.sin(a) * d;
    const stem = new THREE.CylinderGeometry(0.007 * scale, 0.012 * scale, h, 5, 1);
    stem.translate(0, h / 2, 0);
    geos.push(bake(stem, mat4(x, 0, z), stemTone.clone().multiplyScalar(0.85 + rnd() * 0.3)));
    for (let k = 0; k < 2; k++) {
      const leaf = new THREE.PlaneGeometry(0.11 * scale, 0.034 * scale, 2, 1);
      leaf.translate(0.055 * scale, 0, 0);
      leaf.rotateX(-Math.PI / 2);
      geos.push(bake(leaf, placeYX(x, h * (0.22 + k * 0.22), z, k * Math.PI + rnd() * 2, 0.35), stemTone.clone().multiplyScalar(1.1 + rnd() * 0.2)));
    }
    const petalCount = 6;
    for (let k = 0; k < petalCount; k++) {
      const pg = new THREE.CircleGeometry(1, 8);
      pg.scale(0.034 * scale, 0.062 * scale, 1);
      pg.translate(0, 0.064 * scale, 0);
      pg.rotateX(-Math.PI / 2);
      geos.push(bake(pg, placeYX(x, h, z, (k / petalCount) * Math.PI * 2, -0.5), petal.clone().multiplyScalar(0.92 + rnd() * 0.16), (_y) => 1));
    }
    geos.push(bake(new THREE.SphereGeometry(0.022 * scale, 7, 5), mat4(x, h + 0.01 * scale, z), new THREE.Color(0xd9a21d)));
  }
  finish(g, geos, doubleVcMaterial(), false);
  return g;
}
/** 弯曲的细叶片带（4 段，根宽尖窄，顶点色从根到梢渐变），沿 +Y 生长 */
function ribbonBlade(h: number, w: number, bendX: number, bendZ: number, base: THREE.Color, tip: THREE.Color): THREE.BufferGeometry {
  const segs = 4;
  const pos: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const c = new THREE.Color();
  for (let s = 0; s <= segs; s++) {
    const t = s / segs;
    const hw = (w * (1 - t * 0.9)) / 2;
    const ox = bendX * t * t;
    const oz = bendZ * t * t;
    pos.push(ox - hw, t * h, oz, ox + hw, t * h, oz);
    c.copy(base).lerp(tip, t);
    col.push(c.r, c.g, c.b, c.r, c.g, c.b);
    if (s > 0) {
      const a = (s - 1) * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/** 芦苇 / 香蒲（水边点缀）：9 片弯曲叶带 + 部分带棕色穗，合并为单个网格 */
export function createReed(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 4111) + 3);
  const geos: THREE.BufferGeometry[] = [];
  const tipTone = new THREE.Color(0x9bb257);
  const baseTone = new THREE.Color(0x3f6030);
  for (let i = 0; i < 9; i++) {
    const h = (0.7 + rnd() * 1.0) * scale;
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * 0.28 * scale;
    const blade = ribbonBlade(h, (0.05 + rnd() * 0.035) * scale, (rnd() - 0.5) * 0.55 * scale, (rnd() - 0.5) * 0.55 * scale, baseTone.clone().multiplyScalar(0.85 + rnd() * 0.3), tipTone.clone().multiplyScalar(0.85 + rnd() * 0.3));
    blade.applyMatrix4(mat4(Math.cos(a) * d, 0, Math.sin(a) * d, 1, 1, 1, 0, rnd() * Math.PI * 2, 0));
    geos.push(blade);
    if (rnd() > 0.68) {
      const sh = h * (0.8 + rnd() * 0.15);
      const stalk = new THREE.CylinderGeometry(0.006 * scale, 0.01 * scale, sh, 4, 1);
      stalk.translate(0, sh / 2, 0);
      geos.push(bake(stalk, mat4(Math.cos(a) * d, 0, Math.sin(a) * d), baseTone.clone().multiplyScalar(1.2)));
      const head = new THREE.CylinderGeometry(0.022 * scale, 0.022 * scale, 0.14 * scale, 7, 1);
      head.translate(0, 0.07 * scale, 0);
      geos.push(bake(head, mat4(Math.cos(a) * d, sh * 0.96, Math.sin(a) * d), new THREE.Color(0x5a3a22)));
    }
  }
  finish(g, geos, doubleVcMaterial(), false);
  return g;
}

/** 倒木：带板根残桩与树皮纹的圆木、断口年轮面、两个枝桩与顶部苔藓，合并为单个网格 */
export function createFallenLog(scale = 1): THREE.Mesh {
  const rnd = seededRand(Math.floor(scale * 2027) + 11);
  const len = (1.8 + rnd() * 1.4) * scale;
  const r = (0.17 + rnd() * 0.06) * scale;
  const bark = new THREE.Color(0x56402e);
  const geos: THREE.BufferGeometry[] = [];
  const trunk = trunkGeometry(len, r * 1.05, r * 0.85, bark, 0);
  trunk.rotateZ(-Math.PI / 2);
  trunk.translate(-len / 2, r * 0.82, 0);
  geos.push(trunk);
  // 断口（年轮面）：浅色圆面 + 同心环
  const cut = new THREE.CircleGeometry(r * 0.85, 14);
  geos.push(bake(cut, mat4(len / 2 + 0.002, r * 0.82, 0, 1, 1, 1, 0, Math.PI / 2, 0), new THREE.Color(0xb8956a)));
  const ring = new THREE.RingGeometry(r * 0.35, r * 0.4, 14);
  geos.push(bake(ring, mat4(len / 2 + 0.004, r * 0.82, 0, 1, 1, 1, 0, Math.PI / 2, 0), new THREE.Color(0x8a6844)));
  // 枝桩
  for (let i = 0; i < 2; i++) {
    const stub = new THREE.CylinderGeometry(r * 0.12, r * 0.2, r * 1.1, 6, 1);
    stub.translate(0, r * 0.55, 0);
    geos.push(bake(stub, mat4((rnd() - 0.5) * len * 0.6, r * 1.3, (rnd() > 0.5 ? 1 : -1) * r * 0.5, 1, 1, 1, (rnd() - 0.5) * 0.7, 0, (rnd() - 0.5) * 0.8), bark.clone().multiplyScalar(0.9)));
  }
  // 苔藓团
  const moss = new THREE.Color(0x4d7338);
  for (let i = 0; i < 4; i++) {
    const mr = r * (0.35 + rnd() * 0.3);
    geos.push(bake(organicBlob(Math.floor(rnd() * 3) + 1, 1, 0.3), mat4((rnd() - 0.5) * len * 0.8, r * 1.62, (rnd() - 0.5) * r * 0.8, mr * 1.3, mr * 0.45, mr), moss.clone().multiplyScalar(0.8 + rnd() * 0.4), (_y, ny) => 0.75 + 0.25 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1)));
  }
  const merged = mergeGeometries(geos, false)!;
  const mesh = new THREE.Mesh(merged, doubleVcMaterial());
  mesh.rotation.y = rnd() * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** 岩石：1~3 块凿刻感石头——脊线噪声位移 + 岩层条纹 + 地衣斑点 + 顶面苔藓，附 3–5 颗卵石，合并为单个网格 */
export function createRock(scale = 1): THREE.Mesh {
  const rnd = seededRand(Math.floor(scale * 9973) + 17);
  const geos: THREE.BufferGeometry[] = [];
  const stoneTone = new THREE.Color(0x77797c).offsetHSL(0, 0, (rnd() - 0.5) * 0.08);
  const pieces = 1 + Math.floor(rnd() * 2.4);
  const chisel = (geo: THREE.BufferGeometry, seed: number, amt: number): void => {
    const p = geo.attributes.position;
    const n = geo.attributes.normal;
    const col = geo.attributes.color;
    for (let k = 0; k < p.count; k++) {
      const x = p.getX(k);
      const y = p.getY(k);
      const z = p.getZ(k);
      const ridge = 1 - Math.abs(vnoise(x * 5, y * 5, z * 5, seed)) * 1.6;
      const fine = vnoise(x * 14, y * 14, z * 14, seed + 3);
      const d = (Math.max(0, ridge) * 0.6 + fine * 0.25) * amt;
      p.setXYZ(k, x + n.getX(k) * d, y + n.getY(k) * d, z + n.getZ(k) * d);
      const strata = 0.9 + 0.1 * Math.sin(y * 26 / Math.max(0.2, amt * 6) + vnoise(x * 3, y * 3, z * 3, seed) * 3);
      const lichen = THREE.MathUtils.smoothstep(vnoise(x * 9, y * 9, z * 9, seed + 7), 0.42, 0.62);
      const kk = strata * (0.9 + fine * 0.18);
      col.setXYZ(k, THREE.MathUtils.lerp(col.getX(k) * kk, 0.6, lichen * 0.35), THREE.MathUtils.lerp(col.getY(k) * kk, 0.62, lichen * 0.35), THREE.MathUtils.lerp(col.getZ(k) * kk, 0.34, lichen * 0.35));
    }
    geo.computeVertexNormals();
  };
  for (let i = 0; i < pieces; i++) {
    const r = (i === 0 ? 0.55 : 0.2 + rnd() * 0.22) * scale;
    const a = rnd() * Math.PI * 2;
    const d = i === 0 ? 0 : (0.5 + rnd() * 0.35) * scale;
    const blob = organicBlob(Math.floor(rnd() * 5) + 20, i === 0 ? 3 : 2, 0.34);
    const piece = bake(
      blob,
      mat4(Math.cos(a) * d, r * 0.32, Math.sin(a) * d, r * 1.15, r * 0.7, r, (rnd() - 0.5) * 0.35, rnd() * 6, (rnd() - 0.5) * 0.35),
      stoneTone.clone().offsetHSL(0, 0, (rnd() - 0.5) * 0.06),
      (_y, ny) => 0.62 + 0.38 * THREE.MathUtils.clamp(0.4 + 0.6 * ny, 0, 1)
    );
    chisel(piece, 11 + i * 5, r * 0.09);
    geos.push(piece);
  }
  const pebbles = 3 + Math.floor(rnd() * 3);
  for (let i = 0; i < pebbles; i++) {
    const pr = (0.05 + rnd() * 0.07) * scale;
    const a = rnd() * Math.PI * 2;
    const d = (0.55 + rnd() * 0.55) * scale;
    geos.push(bake(organicBlob(Math.floor(rnd() * 3) + 1, 1, 0.22), mat4(Math.cos(a) * d, pr * 0.4, Math.sin(a) * d, pr * 1.2, pr * 0.7, pr, rnd() * 3, rnd() * 6, 0), stoneTone.clone().offsetHSL(0, 0, (rnd() - 0.5) * 0.1), (_y, ny) => 0.7 + 0.3 * THREE.MathUtils.clamp(0.5 + 0.5 * ny, 0, 1)));
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

/** 野花丛单元几何（实例化用）：细茎 + 六瓣花冠 + 花蕊，顶点色：花瓣白（由实例色着色）、花蕊黄、茎绿 */
export function wildflowerGeometry(): THREE.BufferGeometry {
  const geos: THREE.BufferGeometry[] = [];
  const stem = new THREE.CylinderGeometry(0.004, 0.006, 0.26, 4, 1);
  stem.translate(0, 0.13, 0);
  geos.push(bake(stem, mat4(0, 0, 0), new THREE.Color(0.2, 0.34, 0.12)));
  for (let k = 0; k < 6; k++) {
    const pg = new THREE.CircleGeometry(1, 7);
    pg.scale(0.022, 0.044, 1);
    pg.translate(0, 0.046, 0);
    pg.rotateX(-Math.PI / 2);
    geos.push(bake(pg, placeYX(0, 0.27, 0, (k / 6) * Math.PI * 2, -0.45), new THREE.Color(1, 1, 1)));
  }
  geos.push(bake(new THREE.SphereGeometry(0.014, 6, 5), mat4(0, 0.275, 0), new THREE.Color(1.0, 0.82, 0.25)));
  const leaf = new THREE.PlaneGeometry(0.07, 0.022, 2, 1);
  leaf.translate(0.035, 0, 0);
  leaf.rotateX(-Math.PI / 2);
  geos.push(bake(leaf, placeYX(0, 0.07, 0, 0.6, 0.4), new THREE.Color(0.22, 0.4, 0.14)));
  geos.push(bake(leaf, placeYX(0, 0.1, 0, 3.5, 0.4), new THREE.Color(0.22, 0.4, 0.14)));
  return mergeGeometries(geos, false)!;
}
/** 供场景道具复用：一丛灌木 / 花坛植物的叶片卡片几何（单位球半径 1，中心在原点）*/
export function shrubCardGeometries(seed: number, radius: number, count = 26): THREE.BufferGeometry[] {
  const rnd = seededRand(seed);
  const tmp = { m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), c: new THREE.Color() };
  const out: THREE.BufferGeometry[] = [];
  for (let i = 0; i < count; i++) {
    const dir = new THREE.Vector3(rnd() - 0.5, rnd() * 0.7 - 0.1, rnd() - 0.5).normalize();
    out.push(leafCard(dir.multiplyScalar(radius * (0.35 + rnd() * 0.65)), radius * (0.7 + rnd() * 0.5), rnd, dir.y, tmp, [0.27, 0.55, 0.4, 2.4]));
  }
  return out;
}
