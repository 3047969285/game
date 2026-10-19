import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { glassCrystal } from "./materials";
import { seededRand } from "./utils";
import { FOLIAGE_ATLAS_CELLS, atlasRect } from "./foliageTextures";
import { applyFoliageShadow, disposeFoliageResources, foliageSun, getBarkMaterial, getFoliageMaterial, setFoliageQuality, windTime } from "./foliageMaterials";

export { applyFoliageShadow, disposeFoliageResources, foliageSun, getBarkMaterial, getFoliageMaterial, setFoliageQuality, windTime };

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
  shade: (y: number, ny: number) => number = () => 1,
  keepUV = false
): THREE.BufferGeometry {
  const geo = source.clone();
  if (!keepUV) geo.deleteAttribute("uv");
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
  applyFoliageShadow(mesh, material);
  group.add(mesh);
}

/**
 * 树干：带板根与树皮纵脊的旋转体（径向噪声位移 + 顶点色深浅沟壑）。
 * withUV 时保留 UV：u 绕周一圈、v 沿长度，按真实长度缩放使树皮纹理不被拉伸（供 getBarkMaterial 使用）；
 * 不带 UV 时与旧行为一致（倒木等顶点色网格要与无 UV 的几何合并）。
 */
export function trunkGeometry(height: number, base: number, top: number, color: THREE.Color, lean: number, withUV = false, rows = 16, radial = 18): THREE.BufferGeometry {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= rows; i++) {
    const t = i / rows;
    const flare = base * 0.6 * Math.exp(-t * 13);
    pts.push(new THREE.Vector2(THREE.MathUtils.lerp(base, top, Math.pow(t, 0.85)) + flare, -0.08 * height + t * height * 1.08));
  }
  const lathe = new THREE.LatheGeometry(pts, radial);
  const p = lathe.attributes.position;
  const colors = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const y = p.getY(i);
    const a = Math.atan2(z, x);
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
  }
  lathe.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  if (withUV) {
    const uv = lathe.attributes.uv;
    const tile = Math.PI * 2 * ((base + top) / 2 + base * 0.1); // 一圈周长 ≈ 一个纹理块高度
    for (let i = 0; i < uv.count; i++) uv.setY(i, (uv.getY(i) * height * 1.08) / tile);
  } else {
    lathe.deleteAttribute("uv");
  }
  lathe.computeVertexNormals();
  // 旋转体接缝处的顶点是重复的，法线各算各的会出现一道明暗线：把接缝两侧的法线取平均
  const n = lathe.attributes.normal;
  const rowN = rows + 1;
  for (let j = 0; j < rowN; j++) {
    const a = j;
    const b = radial * rowN + j;
    const nx = n.getX(a) + n.getX(b);
    const ny = n.getY(a) + n.getY(b);
    const nz = n.getZ(a) + n.getZ(b);
    const l = Math.hypot(nx, ny, nz) || 1;
    n.setXYZ(a, nx / l, ny / l, nz / l);
    n.setXYZ(b, nx / l, ny / l, nz / l);
  }
  return lathe;
}

// ───────────────────────── 叶簇卡片 ─────────────────────────

/** 整树低频摆幅系数：顶端物体空间位移 ≈ K × 树高（沿 (高度/树高)^2 增长） */
const TRUNK_SWAY_K = 0.03;
/** 叶片高频抖动幅度 ≈ 卡片尺寸 × 此系数 */
const FLUTTER_K = 0.05;

const V_UP = new THREE.Vector3(0, 1, 0);

/**
 * 叶簇卡片批量构建：一次累积成单个带 position / normal / uv / color / aSway 的索引几何，
 * 比逐张 PlaneGeometry 再合并快得多。卡片 UV 指向图集某一格；颜色是明暗乘子（贴图自带色相）。
 */
class CardBuilder {
  private readonly pos: number[] = [];
  private readonly nor: number[] = [];
  private readonly uvs: number[] = [];
  private readonly col: number[] = [];
  private readonly sw: number[] = [];
  private readonly idx: number[] = [];
  private readonly n = new THREE.Vector3();

  get cardCount(): number {
    return this.pos.length / 12;
  }

  /**
   * 加一张卡片。ax / ay 为卡片的 x / y 轴（单位向量，y 为叶簇"枝向"）；
   * front：正面（逆时针绕向）应朝向的方向；shadeTarget + mix：着色法线向该方向偏移（球形法线让树冠明暗连续）。
   */
  add(
    center: THREE.Vector3,
    ax: THREE.Vector3,
    ay: THREE.Vector3,
    w: number,
    h: number,
    cell: number,
    shade: [number, number, number],
    flutter: number,
    front: THREE.Vector3,
    shadeTarget: THREE.Vector3,
    mix: number,
    mirror = false
  ): void {
    this.n.crossVectors(ax, ay).normalize();
    const flip = this.n.dot(front) < 0 ? -1 : 1;
    if (flip < 0) this.n.negate();
    const sn = this.n.clone().multiplyScalar(1 - mix).addScaledVector(shadeTarget, mix).normalize();
    const [u0, v0, u1, v1] = atlasRect(cell);
    const base = this.pos.length / 3;
    for (let k = 0; k < 4; k++) {
      const ix = k === 1 || k === 2 ? 1 : 0;
      const iy = k >= 2 ? 1 : 0;
      const lx = (ix - 0.5) * w * flip;
      const ly = (iy - 0.5) * h;
      this.pos.push(center.x + ax.x * lx + ay.x * ly, center.y + ax.y * lx + ay.y * ly, center.z + ax.z * lx + ay.z * ly);
      this.nor.push(sn.x, sn.y, sn.z);
      const uu = mirror ? 1 - ix : ix;
      this.uvs.push(u0 + (u1 - u0) * uu, v0 + (v1 - v0) * iy);
      const g = 0.88 + 0.12 * iy; // 基部略暗：自遮蔽
      this.col.push(shade[0] * g, shade[1] * g, shade[2] * g);
      this.sw.push(0, flutter * (0.3 + 0.7 * iy));
    }
    // flip<0 时 x 轴取反，绕向仍保持 (0,1,2)(0,2,3) 的逆时针对应于 n
    this.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }

  build(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.uvs, 2));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.col, 3));
    g.setAttribute("aSway", new THREE.Float32BufferAttribute(this.sw, 2));
    g.setIndex(this.pos.length / 3 > 65535 ? new THREE.Uint32BufferAttribute(this.idx, 1) : new THREE.Uint16BufferAttribute(this.idx, 1));
    return g;
  }
}

/** 按顶点高度烘焙整树摆幅（aSway.x = K·H·(y/H)^2），已有 aSway 的保留其 y 分量 */
function bakeSway(geo: THREE.BufferGeometry, height: number): void {
  const p = geo.attributes.position;
  let sw = geo.attributes.aSway as THREE.BufferAttribute | undefined;
  if (!sw) {
    sw = new THREE.BufferAttribute(new Float32Array(p.count * 2), 2);
    geo.setAttribute("aSway", sw);
  }
  const amp = TRUNK_SWAY_K * height;
  for (let i = 0; i < p.count; i++) {
    const f = THREE.MathUtils.clamp(p.getY(i) / height, 0, 1);
    sw.setX(i, amp * f * f);
  }
  sw.needsUpdate = true;
}

function maxY(geos: THREE.BufferGeometry[]): number {
  let m = 0.001;
  for (const g of geos) {
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) if (p.getY(i) > m) m = p.getY(i);
  }
  return m;
}

/** 把一棵树的木质（树皮材质）与叶片卡片合并后加入 group，并统一烘焙摆幅 */
function addTreeMeshes(group: THREE.Group, woodGeos: THREE.BufferGeometry[], leaves: THREE.BufferGeometry | null, bark: THREE.Material): void {
  const wood = woodGeos.length > 0 ? mergeGeometries(woodGeos, false) : null;
  const height = maxY([...(wood ? [wood] : []), ...(leaves ? [leaves] : [])]);
  if (wood) {
    bakeSway(wood, height);
    const mesh = new THREE.Mesh(wood, bark);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    applyFoliageShadow(mesh, bark);
    group.add(mesh);
  }
  if (leaves) {
    bakeSway(leaves, height);
    const fm = getFoliageMaterial();
    const mesh = new THREE.Mesh(leaves, fm);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    applyFoliageShadow(mesh, fm);
    group.add(mesh);
  }
}

/** 树枝：略收细的开口圆管（带 UV 沿长度按真实比例展开，顶点色为明暗乘子） */
function tube(a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number, radial: number, tone: number, rnd: () => number): THREE.BufferGeometry {
  const dir = b.clone().sub(a);
  const len = dir.length();
  const geo = new THREE.CylinderGeometry(r1, r0, len, radial, 1, true);
  geo.translate(0, len / 2, 0);
  const uv = geo.attributes.uv;
  const uOff = rnd();
  const vOff = rnd();
  const vScale = len / (Math.PI * (r0 + r1));
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) + uOff, uv.getY(i) * vScale + vOff);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const k = tone * (0.78 + 0.22 * Math.min(1, pos.getY(i) / len));
    colors[i * 3] = k;
    colors[i * 3 + 1] = k;
    colors[i * 3 + 2] = k;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.applyMatrix4(new THREE.Matrix4().compose(a, new THREE.Quaternion().setFromUnitVectors(V_UP, dir.normalize()), new THREE.Vector3(1, 1, 1)));
  return geo;
}

const BARK_TINT = new THREE.Color(1.0, 0.96, 0.9);

function randUnit(rnd: () => number, out: THREE.Vector3): THREE.Vector3 {
  // 三个均匀数的和近似高斯，归一化后在球面上分布较均匀
  out.set(rnd() + rnd() + rnd() - 1.5, rnd() + rnd() + rnd() - 1.5, rnd() + rnd() + rnd() - 1.5);
  if (out.lengthSq() < 1e-6) out.set(0, 1, 0);
  return out.normalize();
}

/** 叶片卡片：单张、随机朝向，供场景道具（花坛灌木等）复用；使用灌木叶簇格 */
export function leafCard(p: THREE.Vector3, size: number, rnd: () => number, up: number, _tmp?: unknown, _tint?: unknown): THREE.BufferGeometry {
  const b = new CardBuilder();
  const n = randUnit(rnd, new THREE.Vector3());
  const ax = new THREE.Vector3().crossVectors(n, Math.abs(n.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : V_UP).normalize();
  const ay = new THREE.Vector3().crossVectors(n, ax).normalize();
  const roll = rnd() * Math.PI * 2;
  const ax2 = ax.clone().multiplyScalar(Math.cos(roll)).addScaledVector(ay, Math.sin(roll));
  const ay2 = ay.clone().multiplyScalar(Math.cos(roll)).addScaledVector(ax, -Math.sin(roll));
  const light = 0.62 + 0.4 * THREE.MathUtils.clamp(0.5 + up * 0.6, 0, 1);
  const tint = 0.94 + rnd() * 0.12;
  b.add(p, ax2, ay2, size, size, FOLIAGE_ATLAS_CELLS.shrub, [light * tint, light, light * (1.1 - (tint - 0.94))], size * FLUTTER_K, n, n, 0.4, rnd() > 0.5);
  return b.build();
}

interface BroadleafOpts {
  /** 米 → 世界单位的缩放（远古树 1，普通树 ≈ 0.2 × scale） */
  u: number;
  limbs: number;
  segs: number;
  /** 从第几段起长出分叉小枝 */
  forkFrom: number;
  roots: number;
  /** 叶簇卡片总预算（按枝梢面积分配） */
  cards: number;
  /** 卡片边长范围（单位 u） */
  cardSize: [number, number];
  /** 每个分叉末端再长几根细小枝（low 为 0） */
  twigs: number;
  radial: number;
  trunkRows: number;
  trunkRadial: number;
  seed: number;
}

interface Tip {
  p: THREE.Vector3;
  r: number;
}

/**
 * 阔叶树生成器：板根主干 → 放射状主枝（逐段收细并二次弯曲）→ 分叉小枝 → 细小枝，
 * 枝梢周围按球壳分布叶簇卡片（外层亮、内层暗，枝干从缝隙里露出）。
 * 产出 2 个网格：树皮（getBarkMaterial）与叶片（getFoliageMaterial）。
 */
function buildBroadleaf(o: BroadleafOpts): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(o.seed);
  const u = o.u;
  const woodGeos: THREE.BufferGeometry[] = [];
  const limb = (a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number, tone = 1): void => {
    woodGeos.push(tube(a, b, r0, r1, o.radial, tone, rnd));
  };

  const trunkH = 13 * u;
  woodGeos.push(trunkGeometry(trunkH, 1.9 * u, 1.15 * u, BARK_TINT, (rnd() - 0.5) * 0.02, true, o.trunkRows, o.trunkRadial));
  for (let i = 0; i < o.roots; i++) {
    const a = (i / o.roots) * Math.PI * 2 + rnd() * 0.4;
    const out = (3.4 + rnd() * 2.2) * u;
    limb(new THREE.Vector3(Math.cos(a) * u, 2.2 * u, Math.sin(a) * u), new THREE.Vector3(Math.cos(a) * out, -0.25 * u, Math.sin(a) * out), 0.7 * u, 0.18 * u, 0.95);
  }

  const tips: Tip[] = [];
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
          tips.push({ p: end, r: (1.9 + rnd() * 1.0) * u });
          // 细小枝：从分叉末端再分出几根，叶簇着生在它们的末梢
          for (let k = 0; k < o.twigs; k++) {
            const c = b + (k === 0 ? -1 : 1) * (0.6 + rnd() * 0.7) * (rnd() > 0.5 ? 1 : -1);
            const e2 = end.clone().add(new THREE.Vector3(Math.cos(c) * (1.3 + rnd() * 1.2) * u, (0.5 + rnd() * 1.6) * u, Math.sin(c) * (1.3 + rnd() * 1.2) * u));
            limb(end, e2, 0.05 * u, 0.025 * u);
            tips.push({ p: e2, r: (1.4 + rnd() * 0.8) * u });
          }
        }
      }
      if (s === 2) tips.push({ p: p.clone().add(new THREE.Vector3(0, 1.2 * u, 0)), r: (2.2 + rnd() * 1.0) * u });
      prev = p;
    }
    tips.push({ p: prev.clone().add(new THREE.Vector3(0, 0.8 * u, 0)), r: (2.5 + rnd() * 1.0) * u });
  }
  tips.push({ p: new THREE.Vector3(0, trunkH + 4.5 * u, 0), r: 3.4 * u });

  // 树冠中心与半径：卡片明暗按到中心的归一化距离决定（内部更暗，制造体积感）
  const center = new THREE.Vector3();
  for (const t of tips) center.add(t.p);
  center.multiplyScalar(1 / tips.length);
  let canopyR = 0.001;
  for (const t of tips) canopyR = Math.max(canopyR, t.p.distanceTo(center) + t.r);
  let weightSum = 0;
  for (const t of tips) weightSum += t.r * t.r;

  const cards = new CardBuilder();
  const dir = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const outward = new THREE.Vector3();
  const tipOut = new THREE.Vector3();
  const gn = new THREE.Vector3();
  const ay = new THREE.Vector3();
  const ax = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  for (const tip of tips) {
    const count = Math.max(2, Math.round((o.cards * tip.r * tip.r) / weightSum));
    tipOut.copy(tip.p).sub(center).normalize();
    for (let k = 0; k < count; k++) {
      randUnit(rnd, dir).multiplyScalar(0.8).addScaledVector(tipOut, 0.55).normalize();
      pos.copy(tip.p).addScaledVector(dir, tip.r * (0.25 + rnd() * 0.85));
      outward.copy(pos).sub(center);
      const depth = THREE.MathUtils.clamp(outward.length() / canopyR, 0, 1);
      outward.normalize();
      // 卡片朝向：外 + 上 + 随机；y 轴（枝向）取外向在卡片平面内的投影并加扰动
      gn.copy(outward).multiplyScalar(0.7).addScaledVector(V_UP, 0.45).add(randUnit(rnd, tmp).multiplyScalar(0.55)).normalize();
      ay.copy(outward).addScaledVector(gn, -outward.dot(gn));
      if (ay.lengthSq() < 0.02) randUnit(rnd, ay);
      ay.normalize();
      const jitter = (rnd() - 0.5) * 1.8;
      tmp.crossVectors(gn, ay);
      ay.multiplyScalar(Math.cos(jitter)).addScaledVector(tmp, Math.sin(jitter)).normalize();
      ax.crossVectors(ay, gn).normalize();
      const inner = depth < 0.55 && rnd() < 0.75;
      const cell = inner ? FOLIAGE_ATLAS_CELLS.broadleafDark : FOLIAGE_ATLAS_CELLS.broadleaf;
      const lit = THREE.MathUtils.lerp(0.34, 1.02, THREE.MathUtils.smoothstep(depth, 0.15, 1)) * (0.82 + 0.18 * THREE.MathUtils.clamp(0.5 + outward.y * 0.8, 0, 1)) * (0.9 + 0.2 * rnd());
      const warm = 0.96 + rnd() * 0.1;
      const size = (o.cardSize[0] + rnd() * (o.cardSize[1] - o.cardSize[0])) * u;
      cards.add(pos, ax, ay, size, size, cell, [lit * warm, lit, lit * (1.08 - (warm - 0.96))], size * FLUTTER_K, outward, outward, 0.55, rnd() > 0.5);
    }
  }
  addTreeMeshes(g, woodGeos, cards.build(), getBarkMaterial("broadleaf"));
  return g;
}

/** 阔叶树：板根主干 + 放射分枝 + 枝梢叶簇卡片（卡片数 high ≈ 1900，low ≈ 440 且更大张） */
export function createTree(scale = 1, detail: "high" | "low" = "high"): THREE.Group {
  const low = detail === "low";
  return buildBroadleaf({
    u: 0.2 * scale,
    limbs: 4,
    segs: 3,
    forkFrom: 3,
    roots: 3,
    cards: low ? 440 : 1900,
    cardSize: low ? [2.2, 3.6] : [1.3, 2.3],
    twigs: low ? 0 : 2,
    radial: low ? 4 : 6,
    trunkRows: low ? 8 : 16,
    trunkRadial: low ? 8 : 18,
    seed: Math.floor(scale * 10000) + 77,
  });
}

/** 远古巨树（单元 3 记忆树）：尺寸直接按米给出，枝叶更密 */
export function createAncientTree(): THREE.Group {
  return buildBroadleaf({ u: 1, limbs: 8, segs: 4, forkFrom: 2, roots: 8, cards: 9000, cardSize: [1.5, 2.9], twigs: 2, radial: 7, trunkRows: 16, trunkRadial: 18, seed: 4411 });
}

/**
 * 针叶松：笔直收细的主干 + 逐轮生长的枝条（先近水平伸出、末端下垂），
 * 每根枝条上沿长度排两层针叶枝片卡片（面朝上、略下垂），顶端一束向上的枝片；没有实心圆锥。
 */
export function createPine(scale = 1, detail: "high" | "low" = "high"): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 7919) + 13);
  const s = scale;
  const low = detail === "low";
  const H = 4.3 * s;
  const woodGeos: THREE.BufferGeometry[] = [];
  woodGeos.push(trunkGeometry(H * 0.97, 0.15 * s, 0.022 * s, BARK_TINT, (rnd() - 0.5) * 0.03, true, low ? 8 : 16, low ? 6 : 12));

  const whorls = low ? 5 : 9;
  const layers = low ? 2 : 4;
  const cards = new CardBuilder();
  const origin = new THREE.Vector3();
  const prev = new THREE.Vector3();
  const cur = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const radial = new THREE.Vector3();
  const ax = new THREE.Vector3();
  const ay = new THREE.Vector3();
  const nrm = new THREE.Vector3();
  const center = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const sizeBoost = low ? 1.4 : 1;
  for (let i = 0; i < whorls; i++) {
    const t = i / (whorls - 1);
    const y = (0.9 + t * 3.05) * s;
    const L = (1.1 - 0.9 * t) * s * (0.92 + rnd() * 0.16);
    const nb = low ? 4 : Math.round(7 - t * 2.5);
    const twist = rnd() * Math.PI * 2;
    const droop = 0.4 - 0.1 * t;
    for (let j = 0; j < nb; j++) {
      const a = twist + (j / nb) * Math.PI * 2 + (rnd() - 0.5) * 0.5;
      const bl = L * (0.85 + rnd() * 0.3);
      radial.set(Math.cos(a), 0, Math.sin(a));
      origin.set(0, y + (rnd() - 0.5) * 0.12 * s, 0);
      const pathAt = (uu: number, out: THREE.Vector3): THREE.Vector3 =>
        out.set(radial.x * bl * uu, origin.y + bl * (0.12 * uu - droop * uu * uu), radial.z * bl * uu);
      // 枝条：2–3 段细管
      const segs = low ? 2 : 3;
      prev.copy(origin);
      for (let k = 1; k <= segs; k++) {
        pathAt(k / segs, cur);
        const r0 = Math.max(0.006 * s, 0.045 * s * (1 - 0.65 * t) * (1 - ((k - 1) / segs) * 0.8));
        const r1 = Math.max(0.004 * s, 0.045 * s * (1 - 0.65 * t) * (1 - (k / segs) * 0.8));
        woodGeos.push(tube(prev, cur, r0, r1, low ? 3 : 4, 0.85, rnd));
        prev.copy(cur);
      }
      // 针叶枝片：沿枝条依次排开，每张的 y 轴顺枝条切线
      const csize = THREE.MathUtils.clamp(bl * 0.55, 0.38 * s, 0.8 * s) * sizeBoost;
      const nCard = THREE.MathUtils.clamp(Math.round(bl / (csize * 0.42)), low ? 2 : 3, low ? 3 : 7);
      for (let k = 0; k < nCard; k++) {
        const uu = 0.2 + (k / Math.max(1, nCard - 1)) * 0.8;
        pathAt(uu, center);
        pathAt(Math.min(1.02, uu + 0.05), tangent).sub(center).normalize();
        center.addScaledVector(tangent, csize * 0.35);
        const inner = THREE.MathUtils.lerp(0.5, 1.02, THREE.MathUtils.smoothstep(uu, 0.1, 0.8));
        for (let ly = 0; ly < layers; ly++) {
          // 多层绕枝条轴倾斜的枝片（枝条上下左右都有针叶）；两层时只取左右
          const tilt = layers === 4 ? (ly - 1.5) * 0.5 : (ly - 0.5) * 0.9;
          ay.copy(tangent);
          ax.crossVectors(ay, V_UP).normalize();
          q.setFromAxisAngle(ay, tilt + (rnd() - 0.5) * 0.25);
          ax.applyQuaternion(q);
          nrm.crossVectors(ax, ay).normalize();
          const yaw = (rnd() - 0.5) * 0.35;
          q.setFromAxisAngle(nrm, yaw);
          const ay2 = ay.clone().applyQuaternion(q);
          const ax2 = ax.clone().applyQuaternion(q);
          const dark = layers === 4 && ly === 0 ? 0.82 : 1;
          const lit = inner * (0.7 + 0.3 * t) * dark * (0.9 + 0.2 * rnd());
          const sz = csize * (0.9 + rnd() * 0.2);
          cards.add(center, ax2, ay2, sz, sz, FOLIAGE_ATLAS_CELLS.conifer, [lit, lit, lit * 1.04], sz * FLUTTER_K, V_UP, radial.clone().multiplyScalar(0.5).addScaledVector(V_UP, 0.5).normalize(), 0.3, rnd() > 0.5);
        }
      }
    }
  }
  // 顶梢：交叉的竖直枝片
  const topN = low ? 2 : 3;
  for (let k = 0; k < topN; k++) {
    const a = (k / topN) * Math.PI + rnd() * 0.3;
    ax.set(Math.cos(a), 0, Math.sin(a));
    center.set(0, H * 0.9 + 0.12 * s, 0);
    const sz = 0.62 * s * sizeBoost;
    cards.add(center, ax, V_UP, sz, sz, FOLIAGE_ATLAS_CELLS.conifer, [1, 1, 1.04], sz * FLUTTER_K * 0.6, nrm.crossVectors(ax, V_UP), nrm.clone(), 0, rnd() > 0.5);
  }
  addTreeMeshes(g, woodGeos, cards.build(), getBarkMaterial("conifer"));
  return g;
}

/** 灌木：从地面伸出的细枝 + 半球形分布的圆叶叶簇卡片（底部稀疏），偶有浆果 */
export function createBush(scale = 1, detail: "high" | "low" = "high"): THREE.Group {
  const g = new THREE.Group();
  const rnd = seededRand(Math.floor(scale * 31337) + 5);
  const low = detail === "low";
  const s = scale;
  const woodGeos: THREE.BufferGeometry[] = [];
  const stems = low ? 4 : 5 + Math.floor(rnd() * 5);
  for (let i = 0; i < stems; i++) {
    const a = (i / stems) * Math.PI * 2 + rnd() * 0.8;
    const reach = (0.35 + rnd() * 0.4) * s;
    const h = (0.4 + rnd() * 0.4) * s;
    const mid = new THREE.Vector3(Math.cos(a) * reach * 0.35, h * 0.5, Math.sin(a) * reach * 0.35);
    const end = new THREE.Vector3(Math.cos(a) * reach, h, Math.sin(a) * reach);
    const base = new THREE.Vector3(Math.cos(a) * 0.03 * s, 0, Math.sin(a) * 0.03 * s);
    if (low) {
      woodGeos.push(tube(base, end, 0.02 * s, 0.008 * s, 3, 0.8, rnd));
    } else {
      woodGeos.push(tube(base, mid, 0.022 * s, 0.014 * s, 3, 0.8, rnd));
      woodGeos.push(tube(mid, end, 0.014 * s, 0.006 * s, 3, 0.8, rnd));
    }
  }

  const cards = new CardBuilder();
  const target = low ? 150 : 520;
  const size = low ? [0.36, 0.56] : [0.26, 0.44];
  const c = new THREE.Vector3(0, 0.38 * s, 0);
  const dir = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const outward = new THREE.Vector3();
  const gn = new THREE.Vector3();
  const ay = new THREE.Vector3();
  const ax = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  let made = 0;
  let guard = 0;
  while (made < target && guard++ < target * 6) {
    randUnit(rnd, dir);
    const radius = (0.4 + 0.6 * Math.sqrt(rnd())) * 0.72 * s;
    pos.set(dir.x * radius, c.y + dir.y * radius * 0.85, dir.z * radius);
    if (pos.y < 0.06 * s) continue;
    // 底部稀疏
    const low01 = THREE.MathUtils.clamp((pos.y - 0.06 * s) / (0.3 * s), 0, 1);
    if (rnd() > 0.25 + 0.75 * low01) continue;
    outward.copy(pos).sub(c).normalize();
    gn.copy(outward).multiplyScalar(0.75).addScaledVector(V_UP, 0.35).add(randUnit(rnd, tmp).multiplyScalar(0.5)).normalize();
    ay.copy(outward).addScaledVector(gn, -outward.dot(gn));
    if (ay.lengthSq() < 0.02) randUnit(rnd, ay);
    ay.normalize();
    const jitter = (rnd() - 0.5) * 1.6;
    tmp.crossVectors(gn, ay);
    ay.multiplyScalar(Math.cos(jitter)).addScaledVector(tmp, Math.sin(jitter)).normalize();
    ax.crossVectors(ay, gn).normalize();
    const depth = THREE.MathUtils.clamp(pos.distanceTo(c) / (0.72 * s), 0, 1);
    const lit = THREE.MathUtils.lerp(0.45, 1.02, THREE.MathUtils.smoothstep(depth, 0.2, 1)) * (0.62 + 0.38 * low01) * (0.9 + 0.2 * rnd());
    const warm = 0.95 + rnd() * 0.1;
    const sz = (size[0] + rnd() * (size[1] - size[0])) * s;
    cards.add(pos, ax, ay, sz, sz, FOLIAGE_ATLAS_CELLS.shrub, [lit * warm, lit, lit * (1.07 - (warm - 0.95))], sz * FLUTTER_K, outward, outward, 0.5, rnd() > 0.5);
    made++;
  }
  addTreeMeshes(g, woodGeos, cards.build(), getBarkMaterial("broadleaf"));
  if (!low && rnd() > 0.6) {
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
/** 供场景道具复用：一丛灌木 / 花坛植物的叶片卡片几何（单位球半径 1，中心在原点，使用 getFoliageMaterial()）*/
export function shrubCardGeometries(seed: number, radius: number, count = 26): THREE.BufferGeometry[] {
  const rnd = seededRand(seed);
  const out: THREE.BufferGeometry[] = [];
  for (let i = 0; i < count; i++) {
    const dir = new THREE.Vector3(rnd() - 0.5, rnd() * 0.7 - 0.1, rnd() - 0.5).normalize();
    out.push(leafCard(dir.multiplyScalar(radius * (0.35 + rnd() * 0.65)), radius * (0.7 + rnd() * 0.5), rnd, dir.y));
  }
  return out;
}
