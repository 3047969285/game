import * as THREE from "three";
import { meshFromSDF, mirrorX, sdBox, sdCone, sdEllipsoid, sdSphere, sdTorus, smax, smin, type SDF } from "./sdf";

/**
 * 角色人体与服装的 SDF 雕刻：头（颅骨、颧骨、眉弓、鼻、唇、下颌、耳、颈）、手（掌 / 指骨 / 拇指）、
 * 以及按人体解剖形状包裹的夹克、袖、裤、靴。坐标均为所属骨骼组的局部坐标。
 */

/** 面部顶点色：唇红、脸颊血色、眼窝与眼睑偏暗、鼻孔深色（皮肤材质需 vertexColors） */
function withFaceColors(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  const bump = (v: number, r: number): number => Math.max(0, 1 - v / r) ** 1.5;
  for (let i = 0; i < p.count; i++) {
    const x = Math.abs(p.getX(i));
    const y = p.getY(i);
    const z = p.getZ(i);
    let r = 1;
    let g = 1;
    let b = 1;
    const mix = (w: number, tr: number, tg: number, tb: number): void => {
      r += (tr - r) * w;
      g += (tg - g) * w;
      b += (tb - b) * w;
    };
    if (z > 0.06) {
      // 唇
      const lip = bump(Math.sqrt(((x) / 0.024) ** 2 + ((y - 0.1205) / 0.0105) ** 2), 1);
      mix(lip * 0.85, 0.96, 0.66, 0.64);
      // 脸颊血色
      mix(bump(Math.hypot(x - 0.047, y - 0.158, z - 0.065), 0.034) * 0.45, 1.0, 0.84, 0.82);
      // 眼窝 / 眼睑偏暗
      mix(bump(Math.hypot(x - 0.034, (y - 0.2) * 1.25, z - 0.075), 0.03) * 0.5, 0.82, 0.68, 0.66);
      // 眼袋
      mix(bump(Math.hypot(x - 0.034, y - 0.18, z - 0.075), 0.014) * 0.25, 0.9, 0.78, 0.8);
      // 鼻孔
      mix(bump(Math.hypot(x - 0.0066, y - 0.149, z - 0.099), 0.009) * 0.9, 0.5, 0.36, 0.34);
      // 鼻头微红
      mix(bump(Math.hypot(x, y - 0.158, z - 0.108), 0.012) * 0.3, 1.0, 0.82, 0.8);
    }
    col[i * 3] = r;
    col[i * 3 + 1] = g;
    col[i * 3 + 2] = b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}
/** 头部（头组局部坐标：y=0 在颈根，脸朝 +z） */
export function headGeometry(q = 1): THREE.BufferGeometry {
  const sdf: SDF = (x, y, z) => {
    const ax = Math.abs(x);
    let d = sdEllipsoid(ax, y, z, 0, 0.215, -0.012, 0.077, 0.088, 0.093); // 颅
    d = smin(d, sdEllipsoid(ax, y, z, 0, 0.183, 0.024, 0.066, 0.08, 0.07), 0.04); // 面部
    d = smin(d, sdCone(ax, y, z, 0.052, 0.142, -0.016, 0, 0.098, 0.056, 0.029, 0.023), 0.03); // 下颌到下巴
    d = smin(d, sdSphere(ax, y, z, 0, 0.093, 0.058, 0.023), 0.02); // 下巴
    d = smin(d, sdSphere(ax, y, z, 0.052, 0.176, 0.046, 0.024), 0.03); // 颧骨
    d = smin(d, sdEllipsoid(ax, y, z, 0.042, 0.152, 0.048, 0.02, 0.022, 0.016), 0.03); // 脸颊
    d = smin(d, sdCone(ax, y, z, 0, 0.212, 0.078, 0.046, 0.207, 0.069, 0.0115, 0.0105), 0.02); // 眉弓
    // 鼻：鼻梁 + 鼻头 + 鼻翼
    d = smin(d, sdCone(ax, y, z, 0, 0.206, 0.082, 0, 0.166, 0.096, 0.0075, 0.0095), 0.012);
    d = smin(d, sdSphere(ax, y, z, 0, 0.159, 0.1, 0.0112), 0.01);
    d = smin(d, sdSphere(ax, y, z, 0.0105, 0.155, 0.092, 0.0075), 0.008);
    // 颈
    d = smin(d, sdCone(ax, y, z, 0, 0.12, -0.012, 0, 0.0, -0.004, 0.047, 0.053), 0.045);
    d = smin(d, sdSphere(ax, y, z, 0, 0.07, 0.04, 0.009), 0.02); // 喉结
    // 耳
    d = smin(d, sdEllipsoid(ax, y, z, 0.077, 0.192, -0.01, 0.008, 0.031, 0.019), 0.01);
    // 唇：上唇（人中弓形）+ 下唇
    d = smin(d, sdCone(ax, y, z, 0, 0.1285, 0.0835, 0.019, 0.1255, 0.077, 0.0065, 0.0058), 0.006);
    d = smin(d, sdCone(ax, y, z, 0, 0.1135, 0.0795, 0.015, 0.1155, 0.074, 0.0078, 0.0066), 0.006);
    // 减法：眼窝、鼻孔、唇缝、人中沟
    d = smax(d, -sdEllipsoid(ax, y, z, 0.034, 0.2, 0.083, 0.021, 0.016, 0.02), 0.012);
    d = smax(d, -sdSphere(ax, y, z, 0.0066, 0.149, 0.097, 0.0042), 0.003);
    d = smax(d, -sdEllipsoid(ax, y, z, 0, 0.1212, 0.082, 0.021, 0.0013, 0.013), 0.002);
    d = smax(d, -sdCone(ax, y, z, 0, 0.14, 0.098, 0, 0.13, 0.092, 0.0018, 0.0018), 0.002);
    // 眼睑：上睑皱褶与下睑（在眼窝挖空之后加回，包住眼球上下缘）
    d = smin(d, sdEllipsoid(ax, y, z, 0.034, 0.2135, 0.0745, 0.0165, 0.0065, 0.0115), 0.006);
    d = smin(d, sdEllipsoid(ax, y, z, 0.034, 0.1865, 0.0745, 0.0155, 0.004, 0.01), 0.005);    return d;
  };
  return withFaceColors(meshFromSDF(sdf, [0, 0.1, 0.02], 0.16, Math.max(24, Math.round(84 * q)), { boundR: 0.2 }));
}

/** 手（手组局部坐标：手腕在原点，向下为 -y；手掌厚度沿 x，宽度沿 z，手指向内（-side）自然微屈，拇指在前侧） */
export function handGeometry(q = 1): THREE.BufferGeometry {
  // 以"左手"为基准（side = +1 时手指向 -x 内屈）；右手镜像
  const finger = (x: number, y: number, z: number, bz: number, len: number, rad: number, curl: number): number => {
    let d = 1e9;
    let px = 0;
    let py = -0.082;
    let pz = bz;
    let ang = 0;
    const segs = [len * 0.5, len * 0.32, len * 0.24];
    const rs = [rad, rad * 0.88, rad * 0.78];
    for (let s = 0; s < 3; s++) {
      ang += curl * (s === 0 ? 0.55 : 1);
      const nx = px - Math.sin(ang) * segs[s];
      const ny = py - Math.cos(ang) * segs[s];
      d = Math.min(d, sdCone(x, y, z, px, py, pz, nx, ny, pz, rs[s], rs[Math.min(s + 1, 2)] * 0.96));
      px = nx;
      py = ny;
    }
    return d;
  };
  const sdf: SDF = (x, y, z) => {
    let d = sdBox(x, y, z, 0, -0.044, 0, 0.014, 0.036, 0.036, 0.011); // 手掌
    d = smin(d, sdCone(x, y, z, 0, 0.012, 0, 0, -0.02, 0, 0.021, 0.026), 0.02); // 手腕
    d = smin(d, sdEllipsoid(x, y, z, -0.004, -0.032, 0.03, 0.014, 0.024, 0.013), 0.015); // 鱼际
    const cur = 0.52;
    d = smin(d, finger(x, y, z, 0.027, 0.074, 0.0088, cur), 0.006); // 食指
    d = smin(d, finger(x, y, z, 0.009, 0.082, 0.0091, cur + 0.03), 0.006); // 中指
    d = smin(d, finger(x, y, z, -0.009, 0.076, 0.0086, cur + 0.06), 0.006); // 无名指
    d = smin(d, finger(x, y, z, -0.026, 0.06, 0.0078, cur + 0.1), 0.006); // 小指
    // 拇指：从鱼际向前下方伸出，两节
    d = smin(d, sdCone(x, y, z, -0.004, -0.04, 0.034, -0.012, -0.066, 0.046, 0.0108, 0.0092), 0.01);
    d = smin(d, sdCone(x, y, z, -0.012, -0.066, 0.046, -0.02, -0.086, 0.05, 0.0092, 0.0078), 0.008);
    return d;
  };
  return meshFromSDF(sdf, [-0.02, -0.07, 0.005], 0.1, Math.max(24, Math.round(64 * q)), { boundR: 0.13 });
}

export function handGeometryFor(side: 1 | -1, base: THREE.BufferGeometry): THREE.BufferGeometry {
  return side === 1 ? base : mirrorX(base);
}

// ─────────────────────────────────────────────────────────────
// 服装壳体
// ─────────────────────────────────────────────────────────────
/** 夹克躯干的连续曲面场：胸廓 / 腹 / 臀 + 肩线 + 立领 + 胸前口袋盖，下摆圆角，领口开孔，布料褶皱 */
function jacketField(x: number, y: number, z: number): number {
  const ax = Math.abs(x);
  let d = sdEllipsoid(ax, y, z, 0, 1.34, 0.0, 0.156, 0.172, 0.1); // 胸
  d = smin(d, sdEllipsoid(ax, y, z, 0.065, 1.31, 0.026, 0.08, 0.065, 0.075), 0.05); // 胸肌隆起
  d = smin(d, sdEllipsoid(ax, y, z, 0, 1.14, 0.0, 0.14, 0.17, 0.092), 0.06); // 腰腹
  d = smin(d, sdEllipsoid(ax, y, z, 0, 0.97, -0.004, 0.155, 0.13, 0.108), 0.06); // 髋臀
  d = smin(d, sdCone(ax, y, z, 0, 1.475, 0, 0.17, 1.462, -0.004, 0.05, 0.054), 0.075); // 肩线（更圆润的斜肩）
  d = smin(d, sdCone(ax, y, z, 0, 1.47, -0.02, 0, 1.54, -0.02, 0.095, 0.058), 0.07); // 斜方肌到颈根
  d = smin(d, sdTorus(ax, y, z, 0, 1.525, 0.0, 0.074, 0.026), 0.02); // 立领
  // 胸前口袋盖
  d = smin(d, sdBox(ax, y, z, 0.085, 1.27, 0.094, 0.04, 0.03, 0.014, 0.006), 0.006);
  d = smax(d, 0.88 - y, 0.03); // 下摆
  d = smax(d, -sdCone(ax, y, z, 0, 1.43, -0.006, 0, 1.62, -0.006, 0.058, 0.058), 0.014); // 领口
  const ang = Math.atan2(z, x);
  d += (Math.sin(ang * 7 + y * 13) * 0.5 + Math.sin(ang * 12 - y * 8 + 1.7) * 0.3) * (y < 1.15 ? 0.0055 : 0.0028);
  return d;
}

export function jacketGeometry(q = 1): THREE.BufferGeometry {
  return meshFromSDF(jacketField, [0, 1.22, -0.005], 0.5, Math.max(24, Math.round(92 * q)), { boundR: 0.55, maxTris: 160000 });
}

/** 贴合夹克表面的皮革装备：双肩背包肩带（越过肩头垂到背后）、胸扣带、腰带 */
export function gearGeometry(): THREE.BufferGeometry {
  const shell = (x: number, y: number, z: number): number => Math.abs(jacketField(x, y, z) - 0.0075) - 0.0075;
  const sdf: SDF = (x, y, z) => {
    const ax = Math.abs(x);
    const strap = sdBox(ax, y, z, 0.093, 1.34, -0.01, 0.022, 0.2, 0.24, 0.004); // 肩带
    const sternum = sdBox(ax, y, z, 0.05, 1.335, 0.05, 0.05, 0.009, 0.14, 0.003); // 胸扣带
    const belt = Math.abs(y - 1.045) - 0.017; // 腰带环
    const region = Math.min(strap, sternum, belt);
    return Math.max(shell(x, y, z), region);
  };
  return meshFromSDF(sdf, [0, 1.25, -0.005], 0.4, 100, { boundR: 0.46, maxTris: 120000 });
}

/** 夹克前襟拉链（贴合表面的细条） */
export function zipperGeometry(): THREE.BufferGeometry {
  const shell = (x: number, y: number, z: number): number => Math.abs(jacketField(x, y, z) - 0.006) - 0.006;
  const sdf: SDF = (x, y, z) => Math.max(shell(x, y, z), sdBox(x, y, z, 0, 1.2, 0.12, 0.0055, 0.265, 0.1, 0.002));
  return meshFromSDF(sdf, [0, 1.2, 0.08], 0.3, 80, { boundR: 0.34, maxTris: 40000 });
}
/** 上臂袖（臂组局部：肩在原点向下） */
export function upperSleeveGeometry(q = 1): THREE.BufferGeometry {
  const sdf: SDF = (x, y, z) => {
    let d = sdCone(x, y, z, 0, 0.0, 0, 0, -0.28, 0, 0.056, 0.046);
    d = smin(d, sdEllipsoid(x, y, z, 0.004, -0.045, 0, 0.058, 0.08, 0.06), 0.04); // 三角肌
    d = smin(d, sdEllipsoid(x, y, z, 0, -0.13, 0.011, 0.048, 0.09, 0.046), 0.03); // 肱二头肌
    const ang = Math.atan2(z, x);
    d += (Math.sin(ang * 6 + y * 17) * 0.5 + Math.sin(ang * 3 - y * 9) * 0.3) * 0.0028;
    return d;
  };
  return meshFromSDF(sdf, [0, -0.14, 0], 0.2, Math.max(24, Math.round(60 * q)), { boundR: 0.26 });
}

/** 前臂袖（肘组局部：肘在原点向下），袖口收紧 */
export function lowerSleeveGeometry(q = 1): THREE.BufferGeometry {
  const sdf: SDF = (x, y, z) => {
    let d = sdCone(x, y, z, 0, 0, 0, 0, -0.255, 0, 0.046, 0.039);
    d = smin(d, sdEllipsoid(x, y, z, 0, -0.07, 0.004, 0.05, 0.095, 0.046), 0.03); // 前臂肌
    d = smin(d, sdTorus(x, y, z, 0, -0.246, 0, 0.039, 0.0092), 0.01); // 弹力袖口
    const ang = Math.atan2(z, x);
    d += (Math.sin(ang * 5 + y * 21) * 0.5 + Math.sin(ang * 9 - y * 11) * 0.3) * 0.0026 * (y > -0.2 ? 1 : 0.4);
    return d;
  };
  return meshFromSDF(sdf, [0, -0.13, 0], 0.19, Math.max(24, Math.round(56 * q)), { boundR: 0.24 });
}

/** 大腿裤管（髋组局部：髋在原点向下） */
export function thighGeometry(q = 1): THREE.BufferGeometry {
  const sdf: SDF = (x, y, z) => {
    let d = sdCone(x, y, z, 0, 0.0, 0, 0, -0.42, 0, 0.108, 0.074);
    d = smin(d, sdEllipsoid(x, y, z, 0, -0.16, 0.02, 0.1, 0.17, 0.095), 0.05); // 股四头肌
    d = smin(d, sdEllipsoid(x, y, z, 0, -0.1, -0.035, 0.092, 0.12, 0.085), 0.05); // 腘绳肌 / 臀下沿
    const ang = Math.atan2(z, x);
    d += (Math.sin(ang * 6 + y * 15) * 0.5 + Math.sin(ang * 3 - y * 8 + 2.1) * 0.35) * 0.0034;
    // 膝部横向褶皱
    d += Math.max(0, Math.sin(y * 70 + 1.1)) * 0.0018 * (y < -0.3 ? 1 : 0);
    return d;
  };
  return meshFromSDF(sdf, [0, -0.2, 0], 0.28, Math.max(24, Math.round(60 * q)), { boundR: 0.34 });
}

/** 小腿裤管（膝组局部：膝在原点向下），裤脚堆叠 */
export function shinGeometry(q = 1): THREE.BufferGeometry {
  const sdf: SDF = (x, y, z) => {
    let d = sdCone(x, y, z, 0, 0, 0, 0, -0.26, 0, 0.074, 0.058);
    d = smin(d, sdEllipsoid(x, y, z, 0, -0.1, -0.03, 0.06, 0.12, 0.06), 0.04); // 小腿肚
    d = smin(d, sdTorus(x, y, z, 0, -0.232, 0, 0.063, 0.014), 0.012); // 裤脚堆叠
    d = smin(d, sdTorus(x, y, z, 0, -0.215, 0, 0.066, 0.012), 0.01);
    const ang = Math.atan2(z, x);
    d += (Math.sin(ang * 5 + y * 19) * 0.5 + Math.sin(ang * 8 - y * 9) * 0.3) * 0.0028;
    return d;
  };
  return meshFromSDF(sdf, [0, -0.13, 0], 0.2, Math.max(24, Math.round(56 * q)), { boundR: 0.26 });
}

/** 登山靴（膝组局部）：靴筒 + 脚后跟 / 足弓 / 鞋头的连续曲面 + 加厚鞋底 */
export function bootGeometry(q = 1): THREE.BufferGeometry {
  const sdf: SDF = (x, y, z) => {
    const ax = Math.abs(x);
    let d = sdCone(ax, y, z, 0, -0.235, 0, 0, -0.39, 0.012, 0.062, 0.058); // 靴筒
    d = smin(d, sdEllipsoid(ax, y, z, 0, -0.432, -0.04, 0.046, 0.042, 0.048), 0.03); // 脚跟
    d = smin(d, sdEllipsoid(ax, y, z, 0, -0.436, 0.03, 0.05, 0.04, 0.085), 0.03); // 足中
    d = smin(d, sdEllipsoid(ax, y, z, 0, -0.446, 0.12, 0.051, 0.034, 0.062), 0.03); // 鞋头
    d = smin(d, sdTorus(ax, y, z, 0, -0.238, 0, 0.061, 0.012), 0.01); // 靴口翻边
    // 鞋底：圆角厚板 + 前掌上翘
    const sole = sdBox(ax, y - Math.max(0, z - 0.11) * 0.18, z, 0, -0.468, 0.062, 0.06, 0.02, 0.148, 0.014);
    d = smin(d, sole, 0.008);
    // 鞋底齿纹
    d += Math.max(0, Math.sin(z * 120)) * 0.0012 * (y < -0.482 ? 1 : 0);
    return d;
  };
  return meshFromSDF(sdf, [0, -0.36, 0.04], 0.21, Math.max(24, Math.round(80 * q)), { boundR: 0.28 });
}
