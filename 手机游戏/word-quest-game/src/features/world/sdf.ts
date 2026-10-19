import * as THREE from "three";
import { MarchingCubes } from "three/addons/objects/MarchingCubes.js";

/**
 * 有向距离场（SDF）建模工具：用球 / 椭球 / 胶囊 / 圆环的平滑并集与差集"雕刻"有机形体，
 * 再用 Marching Cubes 抽取网格。肌肉、关节、鼻唇、手指都能在一个连续曲面上自然过渡。
 */
export type SDF = (x: number, y: number, z: number) => number;

export const sdSphere = (x: number, y: number, z: number, cx: number, cy: number, cz: number, r: number): number =>
  Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy) + (z - cz) * (z - cz)) - r;

/** 椭球近似距离（Inigo Quilez 公式） */
export function sdEllipsoid(x: number, y: number, z: number, cx: number, cy: number, cz: number, rx: number, ry: number, rz: number): number {
  const px = x - cx;
  const py = y - cy;
  const pz = z - cz;
  const k0 = Math.sqrt((px / rx) ** 2 + (py / ry) ** 2 + (pz / rz) ** 2);
  const k1 = Math.sqrt((px / (rx * rx)) ** 2 + (py / (ry * ry)) ** 2 + (pz / (rz * rz)) ** 2);
  if (k1 < 1e-9) return -Math.min(rx, ry, rz);
  return (k0 * (k0 - 1)) / k1;
}

/** 渐变半径的胶囊（圆锥台）：a→b，半径 ra→rb */
export function sdCone(x: number, y: number, z: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, ra: number, rb: number): number {
  const pax = x - ax;
  const pay = y - ay;
  const paz = z - az;
  const bax = bx - ax;
  const bay = by - ay;
  const baz = bz - az;
  const h = Math.min(1, Math.max(0, (pax * bax + pay * bay + paz * baz) / (bax * bax + bay * bay + baz * baz)));
  const dx = pax - bax * h;
  const dy = pay - bay * h;
  const dz = paz - baz * h;
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - (ra + (rb - ra) * h);
}

/** 绕 y 轴的圆环（大半径 R、管半径 r），中心 (cx, cy, cz) */
export function sdTorus(x: number, y: number, z: number, cx: number, cy: number, cz: number, R: number, r: number): number {
  const qx = Math.sqrt((x - cx) * (x - cx) + (z - cz) * (z - cz)) - R;
  const qy = y - cy;
  return Math.sqrt(qx * qx + qy * qy) - r;
}

/** 圆角盒子，半尺寸 (hx, hy, hz)，圆角 r */
export function sdBox(x: number, y: number, z: number, cx: number, cy: number, cz: number, hx: number, hy: number, hz: number, r = 0): number {
  const qx = Math.abs(x - cx) - hx + r;
  const qy = Math.abs(y - cy) - hy + r;
  const qz = Math.abs(z - cz) - hz + r;
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const oz = Math.max(qz, 0);
  return Math.sqrt(ox * ox + oy * oy + oz * oz) + Math.min(Math.max(qx, qy, qz), 0) - r;
}

export function smin(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

export function smax(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.max(a, b) + h * h * k * 0.25;
}

/**
 * 把 SDF 网格化。采样立方体以 center 为中心、半边长 half，分辨率 res³。
 * boundR：包围球半径（超出直接判外部，加速）。返回非索引三角网格（位置 + 平滑法线）。
 */
export function meshFromSDF(sdf: SDF, center: [number, number, number], half: number, res: number, opts: { boundR?: number; maxTris?: number } = {}): THREE.BufferGeometry {
  const mc = new MarchingCubes(res, new THREE.MeshBasicMaterial(), false, false, opts.maxTris ?? 90000);
  mc.isolation = 0;
  const field = mc.field;
  const h = res / 2;
  const boundR2 = opts.boundR !== undefined ? opts.boundR * opts.boundR : Infinity;
  let idx = 0;
  for (let z = 0; z < res; z++) {
    const wz = center[2] + ((z - h) / h) * half;
    for (let y = 0; y < res; y++) {
      const wy = center[1] + ((y - h) / h) * half;
      for (let x = 0; x < res; x++) {
        const wx = center[0] + ((x - h) / h) * half;
        const dx = wx - center[0];
        const dy = wy - center[1];
        const dz = wz - center[2];
        if (dx * dx + dy * dy + dz * dz > boundR2) {
          field[idx++] = -1;
        } else {
          field[idx++] = -sdf(wx, wy, wz) / half;
        }
      }
    }
  }
  mc.update();
  const n = mc.count;
  const pos = new Float32Array(n * 3);
  const nor = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i += 3) {
    pos[i] = center[0] + mc.positionArray[i] * half;
    pos[i + 1] = center[1] + mc.positionArray[i + 1] * half;
    pos[i + 2] = center[2] + mc.positionArray[i + 2] * half;
    const nx = mc.normalArray[i];
    const ny = mc.normalArray[i + 1];
    const nz = mc.normalArray[i + 2];
    const l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nor[i] = nx / l;
    nor[i + 1] = ny / l;
    nor[i + 2] = nz / l;
  }
  mc.geometry.dispose();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  return geo;
}

/** 沿 X 镜像（左右对称部件复用）：翻转坐标并交换三角形顶点顺序保持朝外 */
export function mirrorX(src: THREE.BufferGeometry): THREE.BufferGeometry {
  const pos = src.attributes.position.array as Float32Array;
  const nor = src.attributes.normal.array as Float32Array;
  const n = pos.length / 3;
  const op = new Float32Array(pos.length);
  const on = new Float32Array(nor.length);
  for (let t = 0; t < n; t += 3) {
    for (let k = 0; k < 3; k++) {
      const from = (t + k) * 3;
      const to = (t + (k === 1 ? 2 : k === 2 ? 1 : 0)) * 3;
      op[to] = -pos[from];
      op[to + 1] = pos[from + 1];
      op[to + 2] = pos[from + 2];
      on[to] = -nor[from];
      on[to + 1] = nor[from + 1];
      on[to + 2] = nor[from + 2];
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(op, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(on, 3));
  return geo;
}
