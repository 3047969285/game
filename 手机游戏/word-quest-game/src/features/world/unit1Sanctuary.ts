import * as THREE from "three";
import {
  MergedBuilder,
  annulusSectorGeo,
  boxGeo,
  createKitMaterials,
  cylGeo,
  prismGeo,
  rng,
  strutGeo,
  type Placement,
} from "./detailKit";

/** 把相对某个朝向的局部偏移转换成世界摆放参数 */
function local(base: { x: number; z: number; ry: number }, lx: number, ly: number, lz: number): Placement {
  const c = Math.cos(base.ry);
  const s = Math.sin(base.ry);
  return { x: base.x + lx * c + lz * s, y: ly, z: base.z - lx * s + lz * c, ry: base.ry };
}

/**
 * 单元 1「信号花园」中央学习圣所：三层倒角台基、石砖放射铺地、
 * 四根带灯笼的石柱、石砌门楼（藤蔓 + 吊灯）、长椅与花坛。
 * 发光件（光球、环）保持独立网格，供外部动画驱动。
 */
export interface SanctuaryStyle {
  /** 石材向主题色偏移的颜色 */
  tint?: number;
  /** 是否有藤蔓与花坛（星际单元关闭） */
  greenery?: boolean;
}

export function buildUnit1Sanctuary(glow: THREE.MeshStandardMaterial, edge: THREE.MeshStandardMaterial, style: SanctuaryStyle = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = "unit1-sanctuary";
  const m = createKitMaterials();
  const greenery = style.greenery ?? true;
  if (style.tint !== undefined) {
    const tint = new THREE.Color(style.tint);
    for (const key of ["stone", "stoneWarm", "stoneDark", "paveA", "paveB"] as const) m[key].color.lerp(tint, 0.16);
  }
  const kit = new MergedBuilder();
  const rand = rng(1701);

  // ── 台基：三层八边形倒角台阶
  kit.add(prismGeo(14.5, 0.3, 0.04), m.stoneDark, { y: 0 });
  kit.add(prismGeo(13.6, 0.22, 0.035), m.stone, { y: 0.3 });
  kit.add(prismGeo(12.8, 0.16, 0.03), m.stoneWarm, { y: 0.52 });
  const top = 0.68;

  // ── 铺地：同心环 + 放射分缝的环形瓷砖，深浅交错
  const rings: Array<[number, number, number]> = [
    [8.1, 9.3, 34],
    [9.4, 10.6, 40],
    [10.7, 12.5, 48],
  ];
  rings.forEach(([r0, r1, count], ringIndex) => {
    const step = (Math.PI * 2) / count;
    for (let i = 0; i < count; i++) {
      const a0 = i * step + 0.006 + (ringIndex % 2) * step * 0.5;
      kit.add(annulusSectorGeo(r0, r1, a0, a0 + step - 0.012, 0.028), (i + ringIndex) % 2 ? m.paveA : m.paveB, { y: top });
    }
  });

  // ── 中央圆台：两级台阶 + 罗盘放射嵌条
  kit.add(prismGeo(7.5, 0.09, 0.02, 16), m.stoneDark, { y: top });
  kit.add(prismGeo(7.1, 0.09, 0.02, 16), m.stone, { y: top + 0.09 });
  const daisTop = top + 0.18;
  for (let i = 0; i < 8; i++) {
    kit.add(boxGeo(0.14, 0.012, 5.4, 0.004), m.slate, { y: daisTop + 0.006, ry: (i / 8) * Math.PI, z: 0 });
  }
  const compass = new THREE.TorusGeometry(5.6, 0.045, 5, 72);
  kit.add(compass, m.slate, { y: daisTop + 0.012, rx: Math.PI / 2 });

  // ── 四根石柱（-7,-7 / 7,-7 / -7,7 / 7,7）：柱础 + 多棱柱身 + 束环 + 柱头 + 铜顶灯笼
  const beaconCenters: Array<[number, number, number]> = [];
  for (const [x, z] of [[-7, -7], [7, -7], [-7, 7], [7, 7]] as const) {
    const y0 = top;
    kit.add(boxGeo(1.1, 0.34, 1.1, 0.05), m.stoneDark, { x, y: y0 + 0.17, z });
    kit.add(boxGeo(0.86, 0.2, 0.86, 0.04), m.stone, { x, y: y0 + 0.44, z });
    kit.add(cylGeo(0.3, 0.36, 3.0, 14), m.stone, { x, y: y0 + 0.54 + 1.5, z });
    for (const t of [0.16, 0.84]) {
      kit.add(new THREE.TorusGeometry(0.33 - 0.03 * t, 0.035, 6, 20), m.stoneDark, { x, y: y0 + 0.54 + 3.0 * t, z, rx: Math.PI / 2 });
    }
    const shaftTop = y0 + 3.54;
    kit.add(cylGeo(0.46, 0.28, 0.26, 14), m.stoneWarm, { x, y: shaftTop + 0.13, z });
    kit.add(boxGeo(0.98, 0.14, 0.98, 0.04), m.stoneDark, { x, y: shaftTop + 0.33, z });
    // 灯笼笼架：四根黄铜立杆 + 底环 + 顶环 + 铜顶
    const cageBottom = shaftTop + 0.4;
    const cageH = 0.95;
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
      kit.add(strutGeo([x + Math.cos(a) * 0.3, cageBottom, z + Math.sin(a) * 0.3], [x + Math.cos(a) * 0.3, cageBottom + cageH, z + Math.sin(a) * 0.3], 0.022, 6), m.brass);
    }
    kit.add(new THREE.TorusGeometry(0.31, 0.03, 5, 20), m.brass, { x, y: cageBottom, z, rx: Math.PI / 2 });
    kit.add(new THREE.TorusGeometry(0.31, 0.03, 5, 20), m.brass, { x, y: cageBottom + cageH, z, rx: Math.PI / 2 });
    kit.add(new THREE.ConeGeometry(0.4, 0.32, 10), m.copper, { x, y: cageBottom + cageH + 0.16, z });
    kit.add(new THREE.SphereGeometry(0.05, 8, 6), m.brass, { x, y: cageBottom + cageH + 0.34, z });
    beaconCenters.push([x, cageBottom + cageH / 2, z]);
  }

  // ── 门楼（+Z 入口，z = 8.5）：双石墩 + 过梁 + 檐口齿饰 + 山花 + 铭牌 + 藤蔓 + 吊灯
  const gateZ = 8.5;
  for (const side of [-1, 1]) {
    const x = side * 5.3;
    kit.add(boxGeo(1.7, 0.55, 1.7, 0.06), m.stoneDark, { x, y: top + 0.275, z: gateZ });
    kit.add(boxGeo(1.2, 5.0, 1.2, 0.08), m.stone, { x, y: top + 0.55 + 2.5, z: gateZ });
    // 墩身壁柱凹槽
    for (const fz of [-1, 1]) {
      kit.add(boxGeo(0.14, 4.4, 0.05, 0.01), m.stoneDark, { x: x + side * 0.0, y: top + 0.55 + 2.5, z: gateZ + fz * 0.62 });
    }
    kit.add(boxGeo(1.55, 0.3, 1.55, 0.05), m.stoneWarm, { x, y: top + 0.55 + 5.15, z: gateZ });
    kit.add(boxGeo(1.75, 0.1, 1.75, 0.03), m.stoneDark, { x, y: top + 0.55 + 5.35, z: gateZ });
  }
  const lintelY = top + 0.55 + 5.4 + 0.5;
  kit.add(boxGeo(12.7, 1.0, 1.3, 0.07), m.stone, { y: lintelY, z: gateZ });
  kit.add(boxGeo(13.3, 0.22, 1.7, 0.04), m.stoneWarm, { y: lintelY + 0.62, z: gateZ });
  kit.add(boxGeo(13.0, 0.08, 1.55, 0.02), m.stoneDark, { y: lintelY + 0.77, z: gateZ });
  for (let i = 0; i < 43; i++) {
    kit.add(boxGeo(0.14, 0.14, 0.12, 0.015), m.stoneDark, { x: -6.3 + i * 0.3, y: lintelY - 0.58, z: gateZ + 0.7 });
  }
  // 山花（三角形，倒角挤出）
  const pediment = new THREE.Shape();
  pediment.moveTo(-2.4, 0);
  pediment.lineTo(2.4, 0);
  pediment.lineTo(0, 1.2);
  pediment.closePath();
  const pedGeo = new THREE.ExtrudeGeometry(pediment, { depth: 0.9, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 1 });
  pedGeo.translate(0, 0, -0.45);
  kit.add(pedGeo, m.stone, { y: lintelY + 0.81, z: gateZ });
  // 铭牌（石板 + 黄铜边）
  kit.add(boxGeo(3.4, 0.62, 0.1, 0.02), m.slate, { y: lintelY + 0.02, z: gateZ + 0.7 });
  kit.add(boxGeo(3.55, 0.05, 0.08, 0.01), m.brass, { y: lintelY + 0.36, z: gateZ + 0.72 });
  kit.add(boxGeo(3.55, 0.05, 0.08, 0.01), m.brass, { y: lintelY - 0.32, z: gateZ + 0.72 });
  // 吊灯：两根链 + 铜顶 + 玻璃
  for (const x of [-2.6, 2.6]) {
    kit.add(strutGeo([x, lintelY - 0.5, gateZ + 0.45], [x, lintelY - 1.4, gateZ + 0.45], 0.012, 4), m.steel);
    kit.add(new THREE.ConeGeometry(0.2, 0.16, 8), m.copper, { x, y: lintelY - 1.42, z: gateZ + 0.45 });
    kit.add(cylGeo(0.14, 0.17, 0.34, 8), m.lampGlass, { x, y: lintelY - 1.67, z: gateZ + 0.45 });
    kit.add(cylGeo(0.12, 0.12, 0.05, 8), m.brass, { x, y: lintelY - 1.87, z: gateZ + 0.45 });
  }
  // 藤蔓：沿石墩攀爬、过梁垂落的叶团
  const leafGeo = new THREE.IcosahedronGeometry(0.16, 1);
  const addLeaf = (x: number, y: number, z: number, s: number): void => {
    kit.add(leafGeo, rand() > 0.5 ? m.leaf : m.leafLight, { x, y, z, sx: s, sy: s * 0.85, sz: s });
  };
  for (const side of greenery ? [-1, 1] : []) {
    for (let i = 0; i < 26; i++) {
      const t = i / 26;
      addLeaf(side * (5.3 + (rand() - 0.5) * 1.1), top + 0.9 + t * 4.3, gateZ + 0.62 + rand() * 0.18, 0.55 + rand() * 0.7);
    }
  }
  for (let i = 0; i < (greenery ? 34 : 0); i++) {
    const x = -6 + rand() * 12;
    addLeaf(x, lintelY - 0.58 - rand() * (Math.abs(x) > 4.5 ? 0.9 : 0.35), gateZ + 0.7 + rand() * 0.15, 0.5 + rand() * 0.6);
  }

  // ── 长椅（4 张，朝向中央）
  const benchAngles = [0.22, Math.PI - 0.22, Math.PI + 0.22, -0.22];
  for (const a of benchAngles) {
    const r = 11.2;
    const base = { x: Math.cos(a) * r, z: Math.sin(a) * r, ry: Math.atan2(-Math.cos(a), -Math.sin(a)) };
    kit.add(boxGeo(2.1, 0.09, 0.56, 0.025), m.wood, local(base, 0, top + 0.5, 0));
    kit.add(boxGeo(2.1, 0.46, 0.07, 0.02), m.wood, { ...local(base, 0, top + 0.82, -0.27), rx: 0 });
    for (const sx of [-0.9, 0.9]) {
      kit.add(boxGeo(0.12, 0.5, 0.58, 0.02), m.stoneDark, local(base, sx, top + 0.25, 0));
    }
  }

  // ── 花坛：倒角圆台 + 土 + 灌木 + 小花
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const r = 12.0;
    const cx = Math.cos(a) * r;
    const cz = Math.sin(a) * r;
    if (!greenery || (Math.abs(cx) < 6.8 && cz > 6)) continue; // 门楼前方留出通道
    kit.add(cylGeo(0.95, 1.05, 0.42, 14), m.stoneDark, { x: cx, y: top + 0.21, z: cz });
    kit.add(cylGeo(0.8, 0.8, 0.05, 14), m.soil, { x: cx, y: top + 0.44, z: cz });
    for (let k = 0; k < 7; k++) {
      const b = (k / 7) * Math.PI * 2 + i;
      kit.add(new THREE.IcosahedronGeometry(0.3, 1), k % 2 ? m.leaf : m.leafLight, {
        x: cx + Math.cos(b) * 0.38,
        y: top + 0.72 + (k % 3) * 0.06,
        z: cz + Math.sin(b) * 0.38,
        sy: 0.82,
      });
    }
    kit.add(new THREE.IcosahedronGeometry(0.4, 1), m.leafLight, { x: cx, y: top + 0.9, z: cz, sy: 0.85 });
  }

  kit.build(root, "unit1-sanctuary", { isLandscapeStage: true });

  // ── 发光 / 动画件（保持独立网格）
  const lowerRing = new THREE.Mesh(new THREE.TorusGeometry(11.8, 0.07, 8, 64), edge);
  lowerRing.rotation.x = Math.PI / 2;
  lowerRing.position.y = top + 0.03;
  lowerRing.userData.isLandscapeRing = true;
  root.add(lowerRing);

  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(6.8, 0.055, 8, 56), glow);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = daisTop + 0.04;
  innerRing.userData.isLandscapeRing = true;
  root.add(innerRing);

  const gateRing = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.07, 8, 48), glow);
  gateRing.position.set(0, top + 4.4, gateZ);
  root.add(gateRing);

  for (const [x, y, z] of beaconCenters) {
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 14), glow);
    orb.position.set(x, y, z);
    orb.userData.isLandscapeBeacon = true;
    root.add(orb);
  }

  return root;
}
