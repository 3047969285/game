import * as THREE from "three";
import { createSimpleWaterMaterial } from "./waterSurface";
import { MergedBuilder, boxGeo, cylGeo, gableGeo, strutGeo, prismGeo, type KitMaterials } from "./detailKit";
import { bushParts, createPine, createTree } from "./props";

/**
 * 中枢细节层：在各单元中枢的主体建筑之外，补上檐口 / 窗框 / 雕像 / 起重机 / 索具 / 灯桩 /
 * 货物 / 设备 / 围栏等"可近看"的二级与三级细节。全部写入调用方的 MergedBuilder（按材质合并）。
 */

const matCache = new Map<string, THREE.MeshStandardMaterial>();
/** 同色同参数的材质只建一次：合并构建器按材质分桶，重复新建会让 draw call 成倍增加 */
const cloth = (color: number): THREE.MeshStandardMaterial => {
  const key = `c${color}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: 0.92, side: THREE.DoubleSide });
    m.fog = false;
    matCache.set(key, m);
  }
  return m;
};
const paint = (color: number, roughness = 0.55, metalness = 0.1): THREE.MeshStandardMaterial => {
  const key = `p${color}:${roughness}:${metalness}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    m.fog = false;
    matCache.set(key, m);
  }
  return m;
};

const box = (k: MergedBuilder, mat: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number, ry = 0, r = 0.03): void =>
  k.add(boxGeo(w, h, d, r), mat, { x, y, z, ry });
const cyl = (k: MergedBuilder, mat: THREE.Material, rt: number, rb: number, h: number, x: number, y: number, z: number, seg = 16): void =>
  k.add(cylGeo(rt, rb, h, seg), mat, { x, y, z });
const rod = (k: MergedBuilder, mat: THREE.Material, a: [number, number, number], b: [number, number, number], r = 0.03): void =>
  k.add(strutGeo(a, b, r, 5), mat);
const lathe = (profile: Array<[number, number]>, seg = 18): THREE.BufferGeometry => new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), seg);

/** 石雕像：基座 + 长袍旋转体 + 披肩 + 头 + 举起的手臂（持卷轴 / 火炬） */
function statue(k: MergedBuilder, m: KitMaterials, x: number, y: number, z: number, ry: number, scale = 1): void {
  k.add(boxGeo(1.3 * scale, 0.5 * scale, 1.3 * scale, 0.05), m.stoneDark, { x, y: y + 0.25 * scale, z, ry });
  k.add(boxGeo(1.0 * scale, 1.5 * scale, 1.0 * scale, 0.05), m.stone, { x, y: y + 1.25 * scale, z, ry });
  k.add(boxGeo(1.15 * scale, 0.2 * scale, 1.15 * scale, 0.04), m.stoneDark, { x, y: y + 2.1 * scale, z, ry });
  const base = y + 2.2 * scale;
  k.add(lathe([[0.02, 0], [0.42, 0.02], [0.36, 0.9], [0.28, 1.5], [0.3, 1.95], [0.14, 2.15], [0.0, 2.2]], 18), m.stoneWarm, { x, y: base, z, sx: scale, sy: scale, sz: scale, ry });
  k.add(new THREE.SphereGeometry(0.2, 14, 10), m.stoneWarm, { x, y: base + 2.4 * scale, z, sx: scale, sy: scale * 1.1, sz: scale });
  const c = Math.cos(ry);
  const s = Math.sin(ry);
  rod(k, m.stoneWarm, [x + 0.28 * scale * c, base + 1.75 * scale, z - 0.28 * scale * s], [x + 0.5 * scale * c, base + 2.55 * scale, z - 0.5 * scale * s], 0.07 * scale);
  k.add(cylGeo(0.05 * scale, 0.05 * scale, 0.6 * scale, 8), m.brass, { x: x + 0.52 * scale * c, y: base + 2.7 * scale, z: z - 0.52 * scale * s });
}

/** 路灯桩：铸铁柱身 + 柱础 + 灯笼 + 灯帽 */
function lamp(k: MergedBuilder, m: KitMaterials, x: number, y: number, z: number, h = 4.4): void {
  cyl(k, m.darkSteel, 0.28, 0.34, 0.4, x, y + 0.2, z, 10);
  cyl(k, m.darkSteel, 0.08, 0.13, h, x, y + 0.4 + h / 2, z, 10);
  k.add(new THREE.TorusGeometry(0.13, 0.025, 6, 14), m.darkSteel, { x, y: y + 1.2, z, rx: Math.PI / 2 });
  cyl(k, m.lampGlass, 0.2, 0.15, 0.55, x, y + 0.4 + h + 0.28, z, 8);
  k.add(new THREE.ConeGeometry(0.3, 0.28, 8), m.darkSteel, { x, y: y + 0.4 + h + 0.7, z });
}

// ─────────────────────────────────────────────────────────────
export function addHarborDetail(k: MergedBuilder, m: KitMaterials, rand: () => number): void {
  const az = 51.2;
  const sailCloth = cloth(0xd8ccb0);
  const redPaint = paint(0xb83b32, 0.6, 0.05);
  const navy = paint(0x234a68, 0.55, 0.05);

  // 档案馆：窗楣拱心石 / 窗台 / 窗棂、双扇铜钉大门、檐口齿饰、真屋顶 + 烟囱 + 钟楼
  for (const x of [-5.2, 0, 5.2]) {
    box(k, m.stone, 0.5, 0.7, 0.4, x, 8.75, az - 0.95, 0, 0.04);
    box(k, m.stoneDark, 5.0, 0.28, 0.6, x, 0.55 + 2.2 - 0.14, az - 1.0, 0, 0.03);
    box(k, m.darkSteel, 0.1, 4.2, 0.08, x, 4.4, az - 0.92, 0, 0.01);
    for (const y of [3.0, 5.2]) box(k, m.darkSteel, 4.0, 0.08, 0.08, x, y, az - 0.92, 0, 0.01);
    for (const dx of [-1, 1]) box(k, m.stone, 0.3, 4.4, 0.35, x + dx * 2.5, 4.6, az - 1.0, 0, 0.03);
  }
  box(k, m.woodDark, 3.2, 4.8, 0.3, 0, 3.2, az - 1.35, 0, 0.04);
  for (const dx of [-0.8, 0.8]) {
    box(k, m.wood, 1.4, 4.2, 0.18, dx, 3.1, az - 1.55, 0, 0.03);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) k.add(new THREE.SphereGeometry(0.06, 6, 5), m.brass, { x: dx - 0.4 + j * 0.4, y: 1.6 + i * 0.75, z: az - 1.66 });
  }
  k.add(archFrameLocal(3.4, 2.7, 0.4), m.stoneDark, { x: 0, y: 5.4, z: az - 1.35 });
  for (let i = 0; i < 38; i++) box(k, m.stoneDark, 0.28, 0.2, 0.3, -9.0 + i * 0.48, 9.35, az - 1.48, 0, 0.02);
  k.add(gableGeo(19.2, 3.0, 7.0), m.slate, { x: 0, y: 10.55, z: az + 2.6 });
  for (const x of [-6.5, 6.5]) {
    box(k, m.stoneDark, 0.9, 3.0, 0.9, x, 12.2, az + 1.0, 0, 0.04);
    box(k, m.stone, 1.1, 0.2, 1.1, x, 13.75, az + 1.0, 0, 0.03);
  }
  cyl(k, m.stoneWarm, 1.15, 1.2, 1.4, 0, 14.3, az + 1.8, 8);
  k.add(new THREE.SphereGeometry(1.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), m.copper, { x: 0, y: 15.0, z: az + 1.8 });
  rod(k, m.brass, [0, 16.2, az + 1.8], [0, 17.8, az + 1.8], 0.04);
  rod(k, m.brass, [-0.6, 17.4, az + 1.8], [0.6, 17.4, az + 1.8], 0.03);
  // 门旁旗杆与旗
  for (const x of [-7.6, 7.6]) {
    rod(k, m.steel, [x, 1.8, az - 2.4], [x, 9.0, az - 2.4], 0.07);
    box(k, redPaint, 1.5, 0.9, 0.04, x + (x < 0 ? 0.85 : -0.85), 8.3, az - 2.4, 0, 0.005);
  }

  // 码头：沿岸 8 盏路灯、两台起重机、货堆
  for (let i = 0; i < 8; i++) lamp(k, m, -28 + i * 8 + 0.0, 1.66, 27.0, 3.6);
  for (const cx of [-14, 14]) {
    box(k, m.darkSteel, 2.2, 0.5, 2.2, cx, 1.9, 28.8, 0, 0.05);
    cyl(k, navy, 0.55, 0.7, 5.8, cx, 5.0, 28.8, 14);
    box(k, m.stoneDark, 1.8, 1.2, 1.8, cx, 8.4, 28.8, 0, 0.05);
    rod(k, m.steel, [cx, 8.4, 28.8], [cx, 8.5, 38.5], 0.14);
    rod(k, m.steel, [cx, 8.4, 28.8], [cx, 6.6, 27.0], 0.12);
    box(k, m.darkSteel, 1.6, 1.1, 1.6, cx, 7.2, 26.2, 0, 0.05);
    rod(k, m.darkSteel, [cx, 8.45, 36.0], [cx, 4.4, 36.0], 0.02);
    box(k, m.brass, 0.34, 0.34, 0.34, cx, 4.2, 36.0, 0, 0.03);
    rod(k, m.steel, [cx, 9.0, 28.8], [cx, 8.5, 38.2], 0.04);
    for (let t = 1; t < 6; t++) rod(k, m.steel, [cx + 0.45, 8.6, 29 + t * 1.6], [cx + 0.45, 9.0 - t * 0.04, 28.9 + t * 1.6 + 0.6], 0.02);
  }
  for (const [x, z] of [[-6, 28.4], [8, 28.8], [20, 28.2], [-22, 28.9]] as const) {
    for (let i = 0; i < 6; i++) box(k, i % 2 ? m.wood : m.woodDark, 1.0, 0.85, 1.0, x + (i % 3) * 1.05, 1.67 + 0.0 + Math.floor(i / 3) * 0.85, z + (i % 2) * 0.1, rand() * 0.3, 0.04);
    for (let i = 0; i < 4; i++) k.add(new THREE.SphereGeometry(0.34, 10, 8), sailCloth, { x: x + 3.1 + (i % 2) * 0.6, y: 1.9 + Math.floor(i / 2) * 0.35, z: z - 0.2 + (i % 2) * 0.4, sy: 0.6 });
    for (let i = 0; i < 5; i++) k.add(new THREE.TorusGeometry(0.3, 0.07, 6, 14), m.wood, { x: x - 1.4, y: 1.7 + i * 0.12, z: z + 0.3, rx: Math.PI / 2 });
  }
  // 船锚 + 舵轮展示
  rod(k, m.darkSteel, [2.6, 1.7, 28.2], [2.6, 3.5, 28.2], 0.09);
  k.add(new THREE.TorusGeometry(0.5, 0.07, 8, 16, Math.PI), m.darkSteel, { x: 2.6, y: 1.8, z: 28.2, rz: Math.PI });
  rod(k, m.darkSteel, [2.0, 3.2, 28.2], [3.2, 3.2, 28.2], 0.07);

  // 帆船：舷侧木条、船艏斜桅 + 三角帆、艉舵与灯、桅索与横绳梯
  for (const [index, x] of [-23, 23].entries()) {
    const z = index === 0 ? 37.2 : 42.1;
    for (const sx of [-1, 1]) for (const y of [1.15, 1.45]) box(k, m.woodDark, 0.05, 0.07, 10.2, x + sx * 1.14, y, z, 0, 0.01);
    rod(k, m.woodDark, [x, 2.2, z + 5.5], [x, 3.4, z + 8.4], 0.1);
    k.add(new THREE.PlaneGeometry(2.8, 3.0), sailCloth, { x, y: 3.9, z: z + 6.0, ry: Math.PI / 2, sx: 1, sy: 1 });
    rod(k, m.steel, [x, 6.6, z], [x, 3.4, z + 8.4], 0.015);
    box(k, m.woodDark, 0.12, 1.6, 0.5, x, 1.5, z - 5.7, 0, 0.02);
    cyl(k, m.lampGlass, 0.14, 0.12, 0.3, x, 3.0, z - 5.0, 8);
    rod(k, m.woodDark, [x, 2.0, z - 5.0], [x, 3.4, z - 5.0], 0.04);
    for (const s of [-1, 1]) {
      rod(k, m.steel, [x, 7.2, z + 0.1], [x + s * 1.1, 1.65, z - 0.9], 0.012);
      rod(k, m.steel, [x, 7.2, z + 0.1], [x + s * 1.1, 1.65, z + 1.0], 0.012);
      for (let r = 1; r < 8; r++) {
        const t = r / 8;
        rod(k, m.steel, [x + s * 1.1 * t, 7.2 - 5.55 * t, z + 0.1 - 1.0 * t], [x + s * 1.1 * t, 7.2 - 5.55 * t, z + 0.1 + 1.1 * t], 0.01);
      }
    }
  }
}

function archFrameLocal(w: number, h: number, d: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, w / 2 + 0.3, 0, Math.PI, false);
  shape.lineTo(-w / 2, 0);
  shape.absarc(0, 0, w / 2, Math.PI, 0, true);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false, curveSegments: 16 });
  geo.translate(0, h - w / 2, -d / 2);
  return geo;
}

// ─────────────────────────────────────────────────────────────
export function addTempleDetail(k: MergedBuilder, m: KitMaterials, rand: () => number): THREE.Group {
  const extras = new THREE.Group();
  const cz = 40;
  const floor = 1.8;
  const topY = floor + 0.95 * 0.7 + 9.6 + 0.95;

  // 檐部：三陇板—陇间壁交替的多立克饰带；屋檐瓦当、屋角山花饰
  for (let i = 0; i < 24; i++) {
    const x = -11.0 + i * 0.96 + 0.48;
    box(k, i % 2 ? m.stoneWarm : m.stone, 0.62, 0.74, 0.08, x, topY + 0.2, cz - 7.12, 0, 0.01);
    box(k, m.stoneDark, 0.06, 0.74, 0.1, x - 0.16, topY + 0.2, cz - 7.16, 0, 0.005);
    box(k, m.stoneDark, 0.06, 0.74, 0.1, x + 0.16, topY + 0.2, cz - 7.16, 0, 0.005);
  }
  for (let i = 0; i < 26; i++) k.add(new THREE.ConeGeometry(0.2, 0.34, 6), m.terracottaRoof, { x: -12 + i * 0.96, y: topY + 1.55, z: cz - 7.9, rx: Math.PI / 2 });
  for (const s of [-1, 1]) {
    k.add(new THREE.ConeGeometry(0.55, 1.5, 8), m.stoneWarm, { x: s * 12.4, y: topY + 2.2, z: cz - 7.2, sz: 0.4 });
    k.add(new THREE.ConeGeometry(0.5, 1.4, 8), m.stoneWarm, { x: s * 12.4, y: topY + 2.2, z: cz + 7.2, sz: 0.4 });
  }
  k.add(new THREE.ConeGeometry(0.8, 2.0, 8), m.stoneWarm, { x: 0, y: topY + 6.0, z: cz - 7.3, sz: 0.4 });
  // 山花雕塑群：中央立像 + 两侧斜卧像（简化人体体块）
  for (const [x, h, tilt] of [[-4.6, 0.8, 0.3], [-2.4, 1.3, 0.12], [0, 1.9, 0], [2.4, 1.3, -0.12], [4.6, 0.8, -0.3]] as const) {
    k.add(lathe([[0.01, 0], [0.34, 0.1], [0.3, h * 0.7], [0.18, h], [0.01, h * 1.05]], 12), m.stoneWarm, { x, y: topY + 2.0 + (0.9 - h * 0.2), z: cz - 7.35, rz: tilt, sz: 0.6 });
    k.add(new THREE.SphereGeometry(0.17, 10, 8), m.stoneWarm, { x: x - tilt * h, y: topY + 2.0 + (0.9 - h * 0.2) + h * 1.15, z: cz - 7.35 });
  }
  // 大台阶两侧护墙 + 狮子基座雕像
  for (const s of [-1, 1]) {
    box(k, m.stoneDark, 0.9, 1.4, 2.8, s * 4.8, 0.9, cz - 10.8, 0, 0.05);
    box(k, m.stone, 1.1, 0.2, 3.0, s * 4.8, 1.7, cz - 10.8, 0, 0.04);
    statue(k, m, s * 8.4, floor, cz - 8.2, s > 0 ? Math.PI : Math.PI, 0.95);
    statue(k, m, s * 12.2, floor, cz - 8.2, Math.PI, 0.8);
  }
  // 内殿大门：门框 + 青铜双扉 + 门钉 + 门楣 + 两侧壁龛
  box(k, m.stoneDark, 3.4, 5.0, 0.3, 0, floor + 2.5, cz - 4.9, 0, 0.05);
  for (const dx of [-0.65, 0.65]) {
    box(k, m.brass, 1.2, 4.0, 0.12, dx, floor + 2.0, cz - 5.0, 0, 0.03);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) k.add(new THREE.SphereGeometry(0.05, 6, 5), m.stoneWarm, { x: dx - 0.25 + j * 0.5, y: floor + 0.7 + i * 0.7, z: cz - 5.08 });
  }
  for (const dx of [-5.5, 5.5]) {
    box(k, m.stoneDark, 1.6, 2.8, 0.2, dx, floor + 3.2, cz - 4.9, 0, 0.04);
    box(k, m.slate, 1.2, 2.4, 0.1, dx, floor + 3.2, cz - 4.98, 0, 0.03);
  }
  // 方砖前庭 + 喷泉：三层水盆 + 中央水柱雕塑
  for (let i = -3; i <= 3; i++) for (let j = 0; j < 3; j++) box(k, (i + j) % 2 ? m.paveA : m.paveB, 3.9, 0.06, 3.9, i * 4.0, 0.62, cz - 14 - j * 4.0, 0, 0.01);
  cyl(k, m.stoneDark, 2.8, 3.0, 0.5, 0, 0.9, cz - 18, 24);
  cyl(k, m.stone, 2.5, 2.7, 0.28, 0, 1.3, cz - 18, 24);
  cyl(k, m.stoneWarm, 0.3, 0.5, 2.0, 0, 2.3, cz - 18, 12);
  cyl(k, m.stone, 1.3, 1.1, 0.25, 0, 3.0, cz - 18, 20);
  cyl(k, m.stoneWarm, 0.14, 0.3, 1.2, 0, 3.7, cz - 18, 10);
  const waterMat = createSimpleWaterMaterial({ depth: 0.45 });
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.06, 28), waterMat);
  basin.position.set(0, 1.46, cz - 18);
  basin.userData.isLandscapeStage = true;
  extras.add(basin);
  // 橄榄树与松树环绕
  for (const [x, z, s] of [[-17, cz - 6, 1.1], [17, cz - 6, 1.1], [-17, cz + 6, 1.3], [17, cz + 6, 1.3], [-14, cz - 18, 0.9], [14, cz - 18, 0.9]] as const) {
    const t = rand() > 0.4 ? createTree(s) : createPine(s * 1.1);
    t.position.set(x, 0.6, z);
    extras.add(t);
  }
  // 台基四角灯桩 + 长椅
  for (const [x, z] of [[-13, cz - 9.6], [13, cz - 9.6]] as const) lamp(k, m, x, 1.8, z, 3.4);
  return extras;
}

// ─────────────────────────────────────────────────────────────
export function addLaunchDetail(k: MergedBuilder, m: KitMaterials): void {
  const white = paint(0xeef1f4, 0.4, 0.25);
  const red = paint(0xc13b32, 0.45, 0.25);
  const blue = paint(0x274b8f, 0.45, 0.25);
  const dark = paint(0x2a3138, 0.5, 0.6);
  const hazard = paint(0xf1c232, 0.55, 0.1);
  const cz = 40;
  const base = 1.8;

  // 箭体：四枚助推器（锥头 + 环带）、级间段环缝、国旗色带、发动机喷管、脐带接口
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const bx = Math.cos(a) * 2.2;
    const bz = cz + Math.sin(a) * 2.2;
    k.add(lathe([[0.0, 0], [0.5, 0.0], [0.52, 0.2], [0.52, 5.4]], 20), white, { x: bx, y: base + 0.6, z: bz });
    k.add(lathe([[0.52, 0], [0.4, 0.8], [0.18, 1.6], [0.0, 2.1]], 20), red, { x: bx, y: base + 6.0, z: bz });
    k.add(new THREE.CylinderGeometry(0.2, 0.34, 0.6, 14, 1, true), dark, { x: bx, y: base + 0.3, z: bz });
    rod(k, m.steel, [bx * 0.7 + (Math.cos(a) * -0.4), base + 2.0, cz + (bz - cz) * 0.7], [bx, base + 2.0, bz], 0.07);
  }
  for (const y of [1.2, 2.6, 4.0, 6.0, 6.9, 8.8, 9.5, 11.4]) k.add(new THREE.TorusGeometry(1.6, 0.03, 6, 40), m.steel, { x: 0, y: base + y + 1.0, z: cz, rx: Math.PI / 2 });
  k.add(new THREE.CylinderGeometry(1.62, 1.62, 0.42, 40, 1, true), blue, { x: 0, y: base + 7.45, z: cz });
  k.add(new THREE.CylinderGeometry(1.62, 1.62, 0.12, 40, 1, true), white, { x: 0, y: base + 7.05, z: cz });
  for (const a of [0, Math.PI]) box(k, dark, 0.3, 2.2, 0.06, Math.sin(a) * 1.6, base + 5.0, cz - Math.cos(a) * 1.6, a, 0.01);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    k.add(new THREE.CylinderGeometry(0.34, 0.6, 0.9, 16, 1, true), dark, { x: Math.cos(a) * 0.9, y: base + 0.5, z: cz + Math.sin(a) * 0.9 });
  }

  // 发射台：火焰导流槽 + 转向器、黄黑警示边、台面螺栓与脐带塔支撑
  box(k, dark, 3.4, 0.9, 7.8, 0, 1.0, cz, 0, 0.03);
  box(k, hazard, 4.4, 0.05, 0.3, 0, 1.64, cz - 3.2, 0, 0.005);
  box(k, hazard, 4.4, 0.05, 0.3, 0, 1.64, cz + 3.2, 0, 0.005);
  k.add(new THREE.ConeGeometry(1.5, 1.2, 4), m.darkSteel, { x: 0, y: 1.5, z: cz, ry: Math.PI / 4 });
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    k.add(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 6), m.brass, { x: Math.cos(a) * 3.0, y: 1.66, z: cz + Math.sin(a) * 3.0 });
  }
  // 塔架：摆臂接口 + 工作平台护栏 + 脐带管线
  const gx = 6.8;
  for (const y of [8.5, 12.5]) {
    box(k, m.darkSteel, 2.2, 0.12, 2.0, gx - 1.3, 1.4 + y - 0.6, cz, 0, 0.02);
    for (const sz of [-1, 1]) rod(k, m.steel, [gx - 2.3, 1.4 + y, cz + sz * 1.0], [gx - 0.2, 1.4 + y, cz + sz * 1.0], 0.04);
    rod(k, red, [gx - 4.8, 1.4 + y, cz - 0.25], [gx - 1.6, 1.4 + y - 0.3, cz - 0.25], 0.06);
    rod(k, m.darkSteel, [gx - 4.8, 1.4 + y - 0.2, cz + 0.25], [gx - 1.6, 1.4 + y - 0.5, cz + 0.25], 0.05);
  }
  for (const [x, z] of [[gx - 0.7, cz - 0.7], [gx + 0.7, cz + 0.7]] as const) {
    k.add(new THREE.CylinderGeometry(0.08, 0.08, 18, 6), red, { x, y: 1.4 + 9, z });
  }
  // 避雷桅杆 ×3 + 探照灯塔 ×4
  for (const [x, z] of [[-12, cz - 11], [12, cz - 11], [0, cz + 14]] as const) {
    rod(k, m.steel, [x, 1.4, z], [x, 21, z], 0.08);
    rod(k, m.steel, [x - 0.8, 1.4, z + 0.8], [x, 14, z], 0.04);
    rod(k, m.steel, [x + 0.8, 1.4, z + 0.8], [x, 14, z], 0.04);
    k.add(new THREE.SphereGeometry(0.14, 8, 6), m.brass, { x, y: 21.1, z });
  }
  for (const [x, z] of [[-9, cz - 9], [9, cz - 9], [-9, cz + 9], [9, cz + 9]] as const) {
    cyl(k, m.darkSteel, 0.1, 0.16, 7.2, x, 1.4 + 3.6, z, 8);
    box(k, m.darkSteel, 1.6, 0.9, 0.3, x, 1.4 + 7.4, z, 0, 0.03);
    for (let i = 0; i < 6; i++) k.add(new THREE.SphereGeometry(0.15, 8, 6), m.lampGlass, { x: x - 0.55 + (i % 3) * 0.55, y: 1.4 + 7.2 + (i < 3 ? 0.2 : 0.62), z: z - 0.2 });
  }
  // 总装大楼 + 履带路 + 雷达 + 地勤车辆 + 管架 + 围栏 + 风向袋
  box(k, m.stone, 15, 14, 12, -22, 7.6, cz + 7, 0, 0.1);
  for (let i = 0; i < 6; i++) box(k, m.stoneDark, 0.3, 14, 12.2, -29 + i * 2.8, 7.6, cz + 7, 0, 0.03);
  box(k, m.darkSteel, 6.0, 9.5, 0.3, -22, 6.2, cz + 0.95, 0, 0.05);
  for (let i = 0; i < 4; i++) box(k, hazard, 6.2, 0.35, 0.34, -22, 3.0 + i * 2.4, cz + 0.88, 0, 0.02);
  box(k, white, 15.4, 0.5, 12.4, -22, 14.9, cz + 7, 0, 0.05);
  for (const [x, w] of [[-26, 3.4], [-18, 3.4]] as const) box(k, red, w, 1.2, 0.2, x, 11.6, cz + 0.9, 0, 0.02);
  for (let i = 0; i < 9; i++) box(k, i % 2 ? m.paveA : m.paveB, 11, 0.06, 4.2, -10 + (i % 1) * 0 + i * 0.0, 0.8, cz + 0.0, 0, 0.01);
  for (const [x, z, r] of [[16, cz - 2, 0.0], [20, cz + 4, 0.5]] as const) {
    cyl(k, m.darkSteel, 0.35, 0.55, 3.2, x, 1.6 + 1.6, z, 10);
    k.add(new THREE.SphereGeometry(2.2, 20, 8, 0, Math.PI * 2, 0, Math.PI / 3), white, { x, y: 5.0, z, rx: -0.9, ry: r });
    rod(k, m.steel, [x, 5.0, z], [x + Math.sin(r) * 0.0, 7.0, z - 1.2], 0.04);
  }
  for (const [x, z, ry] of [[10, cz - 13, 0.3], [-4, cz - 14, -0.2], [14, cz + 12, 1.2]] as const) {
    box(k, white, 3.2, 1.3, 1.6, x, 1.4 + 1.2, z, ry, 0.08);
    box(k, m.glass, 1.0, 0.7, 1.62, x - 0.9 * Math.cos(ry), 1.4 + 1.5, z + 0.9 * Math.sin(ry), ry, 0.04);
    for (const dx of [-1.1, 1.1]) for (const dz of [-0.8, 0.8]) k.add(new THREE.CylinderGeometry(0.34, 0.34, 0.26, 12), m.darkSteel, { x: x + dx * Math.cos(ry), y: 1.4 + 0.34, z: z - dx * Math.sin(ry) + dz, rz: Math.PI / 2, ry });
  }
  for (const z of [cz - 6, cz + 6]) {
    for (let i = 0; i < 4; i++) k.add(new THREE.CylinderGeometry(0.16, 0.16, 6, 8), m.steel, { x: -12 + i * 1.5, y: 2.4 + i * 0.0, z, rz: Math.PI / 2 });
    box(k, m.darkSteel, 0.3, 1.8, 0.3, -9, 2.2, z, 0, 0.03);
    box(k, m.darkSteel, 0.3, 1.8, 0.3, -15, 2.2, z, 0, 0.03);
  }
  const fenceR = 19;
  for (let i = 0; i < 44; i++) {
    const a = (i / 44) * Math.PI * 2;
    const x = Math.cos(a) * fenceR;
    const z = cz + Math.sin(a) * fenceR;
    if (z > cz + 4 && x < -8) continue;
    rod(k, m.darkSteel, [x, 0.9, z], [x, 3.0, z], 0.05);
    if (i % 2) rod(k, m.steel, [x, 2.7, z], [Math.cos(a + 0.143) * fenceR, 2.7, cz + Math.sin(a + 0.143) * fenceR], 0.012);
  }
  rod(k, m.steel, [24, 1.4, cz - 8], [24, 8.4, cz - 8], 0.07);
  k.add(new THREE.ConeGeometry(0.35, 2.4, 8, 1, true), red, { x: 24.9, y: 8.2, z: cz - 8, rz: Math.PI / 2 });
}

// ─────────────────────────────────────────────────────────────
export function addExchangeDetail(k: MergedBuilder, m: KitMaterials, opts: { stalls: boolean; ledger: boolean }, rand: () => number): THREE.Group {
  const extras = new THREE.Group();
  const flagA = cloth(0xc94a3d);
  const flagB = cloth(0x2f5d8a);
  const cz = 38;

  if (opts.ledger) {
    const lz = 49;
    // 立面：檐口齿饰、山花徽章浮雕、巨门 + 青铜门扇、左右壁龛雕像、台阶全宽
    for (let i = 0; i < 44; i++) box(k, m.stoneDark, 0.34, 0.26, 0.34, -10.4 + i * 0.5, 13.35, lz - 2.1, 0, 0.02);
    box(k, m.woodDark, 4.4, 5.6, 0.3, 0, 3.7, lz - 1.75, 0, 0.05);
    for (const dx of [-1.0, 1.0]) {
      box(k, m.brass, 1.9, 4.8, 0.12, dx, 3.3, lz - 1.9, 0, 0.03);
      for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) k.add(new THREE.SphereGeometry(0.06, 6, 5), m.stoneWarm, { x: dx - 0.45 + j * 0.9, y: 1.4 + i * 0.7, z: lz - 1.98 });
    }
    k.add(archFrameLocal(4.4, 3.2, 0.4), m.stoneDark, { x: 0, y: 6.9, z: lz - 1.75 });
    for (let i = 0; i < 6; i++) box(k, i % 2 ? m.stone : m.stoneWarm, 18 + i * 0.0 - i * 0.0, 0.18, 1.2, 0, 0.18 + 0.0 + i * 0.0, lz - 4.6 - i * 0.5, 0, 0.02);
    for (const x of [-7.0, 7.0]) {
      box(k, m.stoneDark, 1.5, 3.2, 0.25, x, 4.0, lz - 1.7, 0, 0.04);
      statue(k, m, x, 1.3, lz - 4.2, Math.PI, 0.8);
    }
    // 大钟：钟面（发光）由外部材质提供，这里做钟框与指针
    cyl(k, m.brass, 1.15, 1.15, 0.25, 0, 11.9, lz - 2.3, 28);
    k.add(new THREE.TorusGeometry(1.1, 0.1, 8, 36), m.brass, { x: 0, y: 11.9, z: lz - 2.45 });
    rod(k, m.darkSteel, [0, 11.9, lz - 2.5], [0.6, 12.4, lz - 2.5], 0.04);
    rod(k, m.darkSteel, [0, 11.9, lz - 2.5], [-0.15, 12.9, lz - 2.5], 0.035);
    // 旗杆
    for (const x of [-13.4, 13.4]) {
      rod(k, m.steel, [x, 1.3, lz - 4], [x, 11.3, lz - 4], 0.08);
      box(k, x < 0 ? flagA : flagB, 2.0, 1.2, 0.05, x + (x < 0 ? 1.1 : -1.1), 10.4, lz - 4, 0, 0.005);
    }
  }

  // 广场中央喷泉：三层水盆 + 铜雕"货币之树"
  cyl(k, m.stoneDark, 3.6, 3.8, 0.6, 0, 1.55, cz + 3, 28);
  cyl(k, m.stone, 3.3, 3.5, 0.4, 0, 2.15, cz + 3, 28);
  cyl(k, m.stoneWarm, 0.45, 0.7, 2.4, 0, 3.0, cz + 3, 12);
  cyl(k, m.stone, 1.7, 1.4, 0.3, 0, 4.0, cz + 3, 22);
  cyl(k, m.stoneWarm, 0.2, 0.4, 1.4, 0, 4.9, cz + 3, 10);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    k.add(new THREE.SphereGeometry(0.28, 12, 8), m.brass, { x: Math.cos(a) * 0.75, y: 6.0, z: cz + 3 + Math.sin(a) * 0.75 });
    rod(k, m.brass, [0, 5.6, cz + 3], [Math.cos(a) * 0.75, 6.0, cz + 3 + Math.sin(a) * 0.75], 0.035);
  }
  const pool = createSimpleWaterMaterial({ depth: 0.6 });
  const water = new THREE.Mesh(new THREE.CylinderGeometry(3.15, 3.15, 0.05, 30), pool);
  water.position.set(0, 2.38, cz + 3);
  water.userData.isLandscapeStage = true;
  extras.add(water);

  // 货摊物件：果篮、布匹卷、秤、悬挂灯串、侧架
  if (opts.stalls) {
    for (const x of [-12, 0, 12]) {
      const z = 35;
      for (let i = 0; i < 4; i++) {
        cyl(k, m.wood, 0.34, 0.26, 0.28, x - 2.6 + i * 1.5, 3.0, z + 0.7, 14);
        for (let j = 0; j < 5; j++) k.add(new THREE.SphereGeometry(0.12, 8, 6), paint([0xd94b3d, 0xf2a93b, 0x7ab648, 0xe06b8f][(i + j) % 4], 0.55, 0), { x: x - 2.6 + i * 1.5 + (j - 2) * 0.1, y: 3.22 + (j % 2) * 0.04, z: z + 0.7 + ((j * 7) % 3 - 1) * 0.1 });
      }
      for (let i = 0; i < 4; i++) cyl(k, cloth([0xc94a3d, 0x2f5d8a, 0xd9b24a, 0x4d7a55][i]), 0.2, 0.2, 1.2, x + 3.0, 1.9 + i * 0.0, z - 1.1 + i * 0.4, 12);
      rod(k, m.brass, [x - 0.5, 3.5, z + 0.9], [x - 0.5, 3.0, z + 0.9], 0.03);
      k.add(new THREE.TorusGeometry(0.2, 0.025, 6, 14, Math.PI), m.brass, { x: x - 0.5, y: 3.5, z: z + 0.9, rz: Math.PI });
      for (let i = 0; i < 8; i++) k.add(new THREE.SphereGeometry(0.1, 8, 6), m.lampGlass, { x: x - 3.4 + i * 1.0, y: 4.8 + Math.sin(i * 0.8) * 0.12 - 0.0, z: z - 2.3 });
      for (const s of [-1, 1]) {
        box(k, m.woodDark, 0.1, 3.0, 0.1, x + s * 3.9, 1.4 + 1.5, z + 0.4, 0, 0.01);
        for (const y of [2.2, 3.0]) box(k, m.wood, 0.8, 0.06, 0.5, x + s * 3.9, y, z + 0.4, 0, 0.01);
      }
    }
  }
  // 广场家具：长椅、铸铁路灯、盆栽乔木、自行车架、告示栏
  for (const [x, z, ry] of [[-14, cz + 6, 0], [14, cz + 6, 0], [-6, cz + 8, Math.PI], [6, cz + 8, Math.PI]] as const) {
    box(k, m.woodDark, 2.2, 0.12, 0.7, x, 1.8, z, ry, 0.02);
    box(k, m.woodDark, 2.2, 0.5, 0.1, x, 2.2, z - 0.3 * Math.cos(ry), ry, 0.02);
    for (const sx of [-0.9, 0.9]) box(k, m.darkSteel, 0.1, 0.4, 0.6, x + sx, 1.6, z, ry, 0.02);
  }
  for (const x of [-15, -7.5, 7.5, 15]) lamp(k, m, x, 1.35, cz - 7.5, 3.8);
  for (const [x, z] of [[-17, cz + 1], [17, cz + 1]] as const) {
    cyl(k, m.stoneDark, 1.0, 1.15, 0.9, x, 1.8, z, 12);
    const t = createTree(0.85);
    t.position.set(x, 2.25, z);
    extras.add(t);
  }
  box(k, m.woodDark, 0.15, 2.4, 0.15, -9, 2.6, cz - 8.5, 0, 0.02);
  box(k, m.woodDark, 0.15, 2.4, 0.15, -6, 2.6, cz - 8.5, 0, 0.02);
  box(k, m.wood, 3.4, 1.3, 0.1, -7.5, 3.3, cz - 8.5, 0, 0.02);
  for (let i = 0; i < 8; i++) box(k, m.paper, 0.6, 0.4, 0.02, -8.8 + (i % 4) * 0.82, 3.0 + Math.floor(i / 4) * 0.55, cz - 8.58, (rand() - 0.5) * 0.15, 0.005);
  return extras;
}

// ─────────────────────────────────────────────────────────────
export function addMemoryTreeDetail(k: MergedBuilder, m: KitMaterials, rand: () => number, glow: THREE.Material): THREE.Group {
  const extras = new THREE.Group();
  const cz = 38;
  const ribbon = [cloth(0xc94a3d), cloth(0xd9b24a), cloth(0x3f7a8c), cloth(0x8a5aa8)];

  // 石环：刻字石碑 + 发光符文槽
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const x = Math.cos(a) * 9;
    const z = cz + Math.sin(a) * 9;
    box(k, m.stoneDark, 0.9, 0.1, 0.16, x, 1.18 + (i % 3) * 0.0, z, -a, 0.01);
    if (i % 3 === 0) {
      box(k, m.stone, 1.0, 2.4, 0.45, x * 1.12, 1.4, cz + (z - cz) * 1.12, -a + Math.PI / 2, 0.08);
      const rune = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.02), glow);
      rune.position.set(x * 1.12 - Math.sin(a) * 0.0, 1.6, cz + (z - cz) * 1.12);
      rune.rotation.y = -a + Math.PI / 2;
      rune.userData.isLandscapeBeacon = true;
      extras.add(rune);
    }
  }
  // 树下：环形长椅、花坛、盘根处青苔、铺石小径
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    const x = Math.cos(a) * 5.6;
    const z = cz + Math.sin(a) * 5.6;
    box(k, m.woodDark, 2.2, 0.14, 0.6, x, 0.95, z, -a + Math.PI / 2, 0.02);
    box(k, m.woodDark, 2.2, 0.5, 0.08, x - Math.cos(a) * 0.3, 1.3, z - Math.sin(a) * 0.3, -a + Math.PI / 2, 0.02);
    for (const s of [-0.9, 0.9]) box(k, m.darkSteel, 0.1, 0.5, 0.5, x + Math.sin(a) * s, 0.7, z - Math.cos(a) * s, -a + Math.PI / 2, 0.02);
  }
  for (let i = 0; i < 14; i++) box(k, i % 2 ? m.paveA : m.paveB, 1.6, 0.08, 1.1, (i % 2 ? 0.3 : -0.3), 0.64, 25 + i * 0.55, 0.05 * (i % 3), 0.01);
  for (let i = 0; i < 24; i++) {
    const a = rand() * Math.PI * 2;
    const r = 3.2 + rand() * 6;
    for (const part of bushParts(0.7 + rand() * 0.5, "low")) k.add(part.geometry, part.material, { x: Math.cos(a) * r, y: 0.45, z: cz + Math.sin(a) * r, ry: rand() * 6.28, sy: 0.5 });
  }
  // 记忆签：从枝头垂下的丝带 + 木牌，三层高度，随机朝向
  for (let i = 0; i < 70; i++) {
    const a = rand() * Math.PI * 2;
    const r = 2.5 + rand() * 8.5;
    const y0 = 11 + rand() * 9;
    const x = Math.cos(a) * r;
    const z = cz + Math.sin(a) * r;
    const len = 1.2 + rand() * 2.2;
    rod(k, m.wood, [x, y0, z], [x, y0 - len, z], 0.012);
    const mat = ribbon[i % 4];
    k.add(new THREE.PlaneGeometry(0.22, 0.7 + rand() * 0.4), mat, { x, y: y0 - len - 0.25, z, ry: rand() * 3.14 });
    if (i % 3 === 0) box(k, m.wood, 0.3, 0.46, 0.03, x + 0.2, y0 - len * 0.5, z, rand() * 3.14, 0.01);
  }
  // 小神龛：基座 + 四柱 + 歇山顶 + 供灯
  const sx = 16;
  const sz = cz - 6;
  box(k, m.stoneDark, 3.4, 0.5, 3.4, sx, 0.85, sz, 0, 0.05);
  for (const dx of [-1.3, 1.3]) for (const dz of [-1.3, 1.3]) cyl(k, m.woodDark, 0.14, 0.17, 2.6, sx + dx, 2.4, sz + dz, 10);
  k.add(prismGeo(2.7, 0.3, 0.05, 4), m.terracottaRoof, { x: sx, y: 3.7, z: sz, ry: Math.PI / 4 });
  k.add(new THREE.ConeGeometry(2.4, 1.1, 4), m.terracottaRoof, { x: sx, y: 4.5, z: sz, ry: Math.PI / 4 });
  cyl(k, m.stone, 0.4, 0.5, 0.8, sx, 1.5, sz, 10);
  cyl(k, m.lampGlass, 0.14, 0.12, 0.3, sx, 2.1, sz, 8);
  // 秋千：两根立柱横梁 + 绳 + 座板
  const wx = -15;
  const wz = cz + 6;
  rod(k, m.woodDark, [wx - 1.4, 0.6, wz], [wx - 0.9, 5.2, wz], 0.1);
  rod(k, m.woodDark, [wx + 1.4, 0.6, wz], [wx + 0.9, 5.2, wz], 0.1);
  rod(k, m.woodDark, [wx - 1.0, 5.1, wz], [wx + 1.0, 5.1, wz], 0.11);
  rod(k, m.wood, [wx - 0.4, 5.0, wz], [wx - 0.4, 1.4, wz], 0.015);
  rod(k, m.wood, [wx + 0.4, 5.0, wz], [wx + 0.4, 1.4, wz], 0.015);
  box(k, m.wood, 0.9, 0.06, 0.3, wx, 1.35, wz, 0, 0.01);
  return extras;
}
