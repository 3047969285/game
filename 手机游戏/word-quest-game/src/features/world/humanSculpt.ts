import * as THREE from "three";
import type { FaceShape } from "./humanIdentity";
import type { HeadLandmarks } from "./humanHair";

/**
 * 每个实例的头部网格雕刻（docs/api-character-identity.md）。
 * head primitive 的几何每个实例已克隆：在“眼中点为原点、+x 左 / +y 上 / +z 前”的头部坐标里，
 * 用平滑的高斯径向基区域位移顶点（下颌 / 下巴 / 颧骨 / 脸颊 / 鼻 / 眼 / 眉弓 / 嘴唇 / 额头 / 脸长宽）。
 * - 蒙皮权重不动；位移是顶点位置的连续函数，所以眼睑 / 嘴缝 / 牙齿 / 睫毛随邻居一起动，不会裂开；
 * - 眼球（眼骨主导的顶点）按眼球中心处的位移整体平移 + 等比缩放，保持是圆球并嵌在眼眶里；
 * - morph 目标是相对位移，表情照常叠加；法线按“焊接位置”重算（UV 缝处法线连续）。
 */

type V3 = [number, number, number];

const SCULPT_MAX = 0.02; // 单个顶点最大位移（米）

const boneNameAt = (names: readonly string[], geometry: THREE.BufferGeometry, i: number): { name: string; weight: number } => {
  const si = geometry.getAttribute("skinIndex");
  const sw = geometry.getAttribute("skinWeight");
  let best = 0, bw = -1;
  for (let k = 0; k < 4; k++) {
    const w = sw.getComponent(i, k);
    if (w > bw) { bw = w; best = si.getComponent(i, k); }
  }
  return { name: (names[best] ?? "").replace(/_/g, " "), weight: bw };
};

const gauss = (px: number, py: number, pz: number, c: V3, s: number): number => {
  const dx = px - c[0], dy = py - c[1], dz = pz - c[2];
  return Math.exp(-(dx * dx + dy * dy + dz * dz) / (2 * s * s));
};
/** 光滑符号：中线处为 0（避免中线两侧顶点反向位移裂开） */
const sgn = (x: number): number => x / Math.sqrt(x * x + 0.012 * 0.012);

/** 计算头部坐标 (x,y,z)（相对眼中点）处的位移场。 */
export function sculptField(x: number, y: number, z: number, s: FaceShape, out: V3): V3 {
  let dx = 0, dy = 0, dz = 0;
  const side = sgn(x);
  const ax = Math.abs(x);
  const at = (cx: number, cy: number, cz: number, sigma: number): number => gauss(ax, y, z, [cx, cy, cz], sigma);

  // 下颌宽度 + 下颌角（gonial）
  let g = at(0.058, -0.088, -0.005, 0.042);
  dx += side * g * 0.014 * s.jawWidth;
  g = at(0.066, -0.075, -0.04, 0.035);
  dx += side * g * 0.008 * s.jawWidth;
  dy -= g * 0.007 * s.jawLength; // 下颌角下移 = 下颌线更方 / 更长
  // 下巴：长度（下伸 + 前突）与宽度
  g = gauss(ax, y, z, [0, -0.12, 0.045], 0.04);
  dy -= g * 0.016 * s.jawLength;
  dz += g * 0.006 * s.jawLength;
  dx += side * gauss(ax, y, z, [0.015, -0.115, 0.04], 0.03) * 0.007 * s.jawWidth;
  // 颧骨宽度 / 脸颊丰满
  g = at(0.056, -0.018, 0.02, 0.034);
  dx += side * g * 0.011 * s.cheekbone;
  dz += g * 0.004 * s.cheekbone;
  g = at(0.046, -0.055, 0.03, 0.038);
  dx += side * g * 0.006 * s.cheekFull;
  dz += g * 0.009 * s.cheekFull;
  // 鼻：长度（鼻尖下移 + 前伸）、宽度（鼻翼）、鼻梁高度
  g = gauss(ax, y, z, [0, -0.032, 0.045], 0.022);
  dy -= g * 0.011 * s.noseLength;
  dz += g * 0.012 * s.noseLength;
  g = at(0.016, -0.036, 0.03, 0.016);
  dx += side * g * 0.008 * s.noseWidth;
  g = gauss(ax, y, z, [0, 0.005, 0.035], 0.022);
  dz += g * 0.01 * s.noseBridge;
  // 眼：大小（绕眼眶中心放缩）与间距
  const eyeG = at(0.031, 0.0, 0.025, 0.024);
  dx += (ax - 0.031) * side * 0.12 * s.eyeSize * eyeG;
  dy += y * 0.12 * s.eyeSize * eyeG;
  dx += side * at(0.031, 0.0, 0.025, 0.036) * 0.0065 * s.eyeSpacing;
  // 眉弓 / 眉高
  g = at(0.03, 0.03, 0.03, 0.022);
  dz += g * 0.007 * s.browHeight;
  dy += g * 0.005 * s.browHeight;
  dy += at(0.035, 0.036, 0.03, 0.02) * 0.004 * s.browArch;
  // 嘴唇：丰满度、嘴宽
  g = gauss(ax, y, z, [0, -0.072, 0.045], 0.022);
  dz += g * 0.006 * s.lipThickness;
  dx += side * at(0.025, -0.072, 0.035, 0.022) * 0.009 * s.mouthWidth;
  // 额头高度
  dy += gauss(ax, y, z, [0, 0.065, 0.035], 0.045) * 0.014 * s.foreheadHeight;
  // 脸的长宽比：headAspect +1 = 宽短脸，−1 = 窄长脸（脸长 ±6%）
  const faceW = Math.exp(-((y + 0.04) ** 2) / (2 * 0.11 ** 2)) * smoothstep(-0.12, 0.0, z);
  dx += x * 0.07 * s.headAspect * faceW;
  dy -= (y + 0.03) * 0.06 * s.headAspect * faceW;

  const m = Math.hypot(dx, dy, dz);
  if (m > SCULPT_MAX) { const k = SCULPT_MAX / m; dx *= k; dy *= k; dz *= k; }
  out[0] = dx; out[1] = dy; out[2] = dz;
  return out;
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** 按焊接位置重算法线（UV 缝处重复顶点用同一条法线） */
export function recomputeWeldedNormals(geometry: THREE.BufferGeometry): void {
  const pos = geometry.getAttribute("position");
  const index = geometry.getIndex();
  const key = (i: number): string => `${Math.round(pos.getX(i) * 1e5)},${Math.round(pos.getY(i) * 1e5)},${Math.round(pos.getZ(i) * 1e5)}`;
  const acc = new Map<string, THREE.Vector3>();
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
  const tri = (i0: number, i1: number, i2: number): void => {
    a.fromBufferAttribute(pos, i0); b.fromBufferAttribute(pos, i1); c.fromBufferAttribute(pos, i2);
    n.crossVectors(c.clone().sub(b), a.clone().sub(b));
    for (const i of [i0, i1, i2]) {
      const k = key(i);
      const v = acc.get(k);
      if (v) v.add(n); else acc.set(k, n.clone());
    }
  };
  if (index) for (let t = 0; t < index.count; t += 3) tri(index.getX(t), index.getX(t + 1), index.getX(t + 2));
  else for (let t = 0; t < pos.count; t += 3) tri(t, t + 1, t + 2);
  const normals = geometry.getAttribute("normal");
  for (let i = 0; i < pos.count; i++) {
    const v = acc.get(key(i));
    if (!v || v.lengthSq() < 1e-14) continue;
    v.normalize();
    normals.setXYZ(i, v.x, v.y, v.z);
  }
  normals.needsUpdate = true;
}

/**
 * 雕刻头部几何（原地修改位置与法线）。`geometries` 里的其它几何（睫毛层）用同一个场，所以和脸一起动。
 * 眼球（眼骨主导）整体平移 + 等比缩放。返回最大位移（米）。
 */
export function sculptHead(geometry: THREE.BufferGeometry, names: readonly string[], lm: HeadLandmarks, shape: FaceShape, extra: THREE.BufferGeometry[] = []): number {
  const pos = geometry.getAttribute("position");
  const e = lm.eye;
  const f: V3 = [0, 0, 0];
  const field = (p: THREE.Vector3Like): V3 => sculptField(p.x - e.x, p.y - e.y, p.z - e.z, shape, f);

  // 眼球中心（每只眼）
  const centers: Record<string, { sum: THREE.Vector3; n: number }> = { "Bip01 LEye": { sum: new THREE.Vector3(), n: 0 }, "Bip01 REye": { sum: new THREE.Vector3(), n: 0 } };
  const owner: string[] = new Array(pos.count).fill("");
  const frozen: boolean[] = new Array(pos.count).fill(false);
  for (let i = 0; i < pos.count; i++) {
    const { name, weight } = boneNameAt(names, geometry, i);
    if (name === "Neck" || name.startsWith("Spine") || name.endsWith("Shoulder")) frozen[i] = true;
    if (weight > 0.5 && centers[name]) {
      owner[i] = name;
      centers[name].sum.add(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
      centers[name].n++;
    }
  }
  const eyeShift: Record<string, { c: THREE.Vector3; d: V3 }> = {};
  for (const [name, v] of Object.entries(centers)) {
    if (!v.n) continue;
    const c = v.sum.clone().multiplyScalar(1 / v.n);
    eyeShift[name] = { c, d: [...field(c)] as V3 };
  }
  const eyeScale = 1 + 0.07 * shape.eyeSize;
  let maxMove = 0;
  for (let i = 0; i < pos.count; i++) {
    if (frozen[i]) continue;
    const p = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
    let d: V3;
    const eye = owner[i] ? eyeShift[owner[i]] : undefined;
    if (eye) {
      // 眼球：绕中心等比放缩 + 平移（保持圆球）
      const q = p.clone().sub(eye.c).multiplyScalar(eyeScale - 1);
      d = [eye.d[0] + q.x, eye.d[1] + q.y, eye.d[2] + q.z];
    } else d = [...field(p)] as V3;
    pos.setXYZ(i, p.x + d[0], p.y + d[1], p.z + d[2]);
    maxMove = Math.max(maxMove, Math.hypot(d[0], d[1], d[2]));
  }
  pos.needsUpdate = true;
  recomputeWeldedNormals(geometry);
  geometry.computeBoundingSphere();
  for (const g of extra) {
    const p2 = g.getAttribute("position");
    for (let i = 0; i < p2.count; i++) {
      const d = field({ x: p2.getX(i), y: p2.getY(i), z: p2.getZ(i) });
      p2.setXYZ(i, p2.getX(i) + d[0], p2.getY(i) + d[1], p2.getZ(i) + d[2]);
    }
    p2.needsUpdate = true;
    g.computeBoundingSphere();
  }
  return maxMove;
}

export interface FaceMetrics {
  /** 下颌宽度（眼下 7–11 cm 处脸面顶点的 x 跨度） */
  jawWidth: number;
  /** 脸长：眼中点到下巴最低点 */
  faceLength: number;
  /** 鼻长：眼中点到鼻尖的垂直距离 */
  noseLength: number;
  /** 鼻梁 / 鼻尖前伸：鼻尖 z − 眼 z */
  noseProjection: number;
  /** 颧骨宽度（眼下 1–3 cm） */
  cheekWidth: number;
}

/** 从几何测出的脸部地标距离（测试 / 调试用）。 */
export function faceMetrics(geometry: THREE.BufferGeometry, lm: HeadLandmarks): FaceMetrics {
  const pos = geometry.getAttribute("position");
  const e = lm.eye;
  let jMin = Infinity, jMax = -Infinity, cMin = Infinity, cMax = -Infinity, chinY = Infinity, noseZ = -Infinity, noseY = 0;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) - e.x, y = pos.getY(i) - e.y, z = pos.getZ(i) - e.z;
    if (z < -0.03) continue;
    if (y < -0.07 && y > -0.11) { jMin = Math.min(jMin, x); jMax = Math.max(jMax, x); }
    if (y < -0.01 && y > -0.03) { cMin = Math.min(cMin, x); cMax = Math.max(cMax, x); }
    if (Math.abs(x) < 0.03 && y < -0.08) chinY = Math.min(chinY, y);
    if (Math.abs(x) < 0.012 && y < 0.0 && y > -0.055 && z > noseZ) { noseZ = z; noseY = y; }
  }
  return { jawWidth: jMax - jMin, faceLength: -chinY, noseLength: -noseY, noseProjection: noseZ, cheekWidth: cMax - cMin };
}
