import * as THREE from "three";
import { MergedBuilder, boxGeo, createKitMaterials, cylGeo, gableGeo, prismGeo, strutGeo, rng, type KitMaterials } from "./detailKit";
import { createTree } from "./props";

/**
 * 单元 2–6 中枢（圣所之外的"单元主题建筑"）：港口档案馆、记忆古树、思想神殿、发射场、交易广场。
 * 坐标沿用旧版（建筑群位于 z≈35–60），发光 / 动画件保持独立网格。
 */

const mat = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial => {
  const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  m.fog = false;
  return m;
};

/** 带分段的锥形旋转体（灯塔 / 火箭箭体） */
function latheGeo(profile: Array<[number, number]>, radial = 32): THREE.BufferGeometry {
  return new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), radial);
}

/** 柱子：柱础 + 柱身（带凹槽线）+ 柱颈环 + 柱头 + 顶板 */
function addColumn(kit: MergedBuilder, m: KitMaterials, x: number, y: number, z: number, h: number, r: number): void {
  kit.add(boxGeo(r * 3.0, r * 0.7, r * 3.0, 0.05), m.stoneDark, { x, y: y + r * 0.35, z });
  kit.add(cylGeo(r * 0.82, r, h, 24), m.stone, { x, y: y + r * 0.7 + h / 2, z });
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * Math.PI * 2;
    kit.add(cylGeo(r * 0.045, r * 0.045, h * 0.92, 4), m.stoneDark, { x: x + Math.cos(a) * r * 0.9, y: y + r * 0.7 + h / 2, z: z + Math.sin(a) * r * 0.9 });
  }
  kit.add(new THREE.TorusGeometry(r * 0.84, r * 0.07, 6, 24), m.stoneDark, { x, y: y + r * 0.7 + h - r * 0.2, z, rx: Math.PI / 2 });
  kit.add(cylGeo(r * 1.3, r * 0.82, r * 0.5, 24), m.stoneWarm, { x, y: y + r * 0.7 + h + r * 0.25, z });
  kit.add(boxGeo(r * 3.0, r * 0.45, r * 3.0, 0.04), m.stoneDark, { x, y: y + r * 0.7 + h + r * 0.72, z });
}

// ─────────────────────────────────────────────────────────────
/** 单元 2：人生档案港（海水 + 码头 + 帆船 + 档案馆 + 灯塔） */
export function buildHarborHub(
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  signTexture?: THREE.Texture
): THREE.Group {
  const root = new THREE.Group();
  root.name = "harbor-hub";
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  const rand = rng(202);
  const sail = mat(0xe8dfc7, 0.9, 0, { side: THREE.DoubleSide });
  const hullWood = mat(0x6b4a33, 0.8);
  const hullTrim = mat(0xb83b32, 0.7);

  // 海水：位移起伏的平面（静态波纹）+ 渐变色（岸边偏青、深处偏蓝）
  const waterGeo = new THREE.PlaneGeometry(78, 42, 78, 42);
  waterGeo.rotateX(-Math.PI / 2);
  const wp = waterGeo.attributes.position;
  const wc = new Float32Array(wp.count * 3);
  const deep = new THREE.Color(0x1d4458);
  const shallow = new THREE.Color(0x3b7f86);
  const tmp = new THREE.Color();
  for (let i = 0; i < wp.count; i++) {
    const x = wp.getX(i);
    const z = wp.getZ(i);
    wp.setY(i, Math.sin(x * 0.45 + z * 0.3) * 0.07 + Math.cos(x * 0.21 - z * 0.52) * 0.06);
    const t = THREE.MathUtils.clamp((z + 21) / 42, 0, 1); // 0 近岸 → 1 远处
    tmp.copy(shallow).lerp(deep, t * 0.9);
    wc[i * 3] = tmp.r;
    wc[i * 3 + 1] = tmp.g;
    wc[i * 3 + 2] = tmp.b;
  }
  waterGeo.setAttribute("color", new THREE.BufferAttribute(wc, 3));
  waterGeo.computeVertexNormals();
  const waterMat = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.4, metalness: 0.05, transparent: true, opacity: 0.94, envMapIntensity: 0.35 });
  waterMat.fog = false;
  const waveMat = mat(0x8fd0d4, 0.4, 0.05, { transparent: true, opacity: 0.55 });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.position.set(0, 0.52, 39);
  water.userData.isLandscapeStage = true;
  water.userData.noLandscapeShadow = true;
  root.add(water);

  // 码头石岸：压顶石 + 石砌缝 + 系缆柱 + 梯子
  kit.add(boxGeo(66, 1.1, 5.2, 0.08), m.stoneDark, { y: 0.45, z: 29.4 });
  kit.add(boxGeo(66.6, 0.22, 5.6, 0.05), m.stone, { y: 1.56, z: 29.4 });
  for (let i = 0; i < 44; i++) kit.add(boxGeo(0.04, 0.9, 0.06, 0.01), m.slate, { x: -32.5 + i * 1.5, y: 0.5, z: 26.82 });
  for (let i = 0; i < 12; i++) {
    const x = -30 + i * 5.45;
    kit.add(cylGeo(0.14, 0.18, 0.5, 12), m.darkSteel, { x, y: 1.78, z: 27.3 });
    kit.add(cylGeo(0.22, 0.14, 0.1, 12), m.darkSteel, { x, y: 2.28, z: 27.3 });
  }

  // 三座木栈桥：横铺木板（留缝）+ 纵梁 + 桩 + 缆绳圈
  for (const x of [-26, 0, 26]) {
    for (let k = 0; k < 20; k++) kit.add(boxGeo(8.5, 0.1, 0.62, 0.015), k % 2 ? m.wood : m.woodDark, { x, y: 1.48, z: 29.6 + k * 0.7 });
    for (const s of [-1, 1]) {
      kit.add(boxGeo(0.26, 0.3, 14, 0.03), m.woodDark, { x: x + s * 4.1, y: 1.28, z: 36.2 });
      for (let k = 0; k < 4; k++) {
        const z = 31 + k * 3.8;
        kit.add(cylGeo(0.18, 0.2, 2.3, 10), m.woodDark, { x: x + s * 4.1, y: 0.5, z });
        kit.add(new THREE.TorusGeometry(0.2, 0.05, 6, 14), m.wood, { x: x + s * 4.1, y: 1.0, z, rx: Math.PI / 2 });
      }
    }
  }
  // 灯笼桩（栈桥尽头）
  for (const x of [-26, 0, 26]) {
    kit.add(cylGeo(0.07, 0.09, 2.6, 8), m.darkSteel, { x, y: 1.5, z: 42.6 });
    kit.add(cylGeo(0.2, 0.26, 0.5, 8), m.lampGlass, { x, y: 4.0, z: 42.6 });
    kit.add(new THREE.ConeGeometry(0.34, 0.3, 8), m.darkSteel, { x, y: 4.45, z: 42.6 });
  }

  // 两艘帆船：船体（挤出）+ 甲板 + 舷墙 + 船舱 + 桅杆 + 帆 + 缆索
  for (const [index, x] of [-23, 23].entries()) {
    const z = index === 0 ? 37.2 : 42.1;
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-5.3, 0.55);
    hullShape.quadraticCurveTo(-5.9, 0.5, -5.0, 0.1);
    hullShape.lineTo(-3.8, -0.8);
    hullShape.lineTo(3.8, -0.8);
    hullShape.quadraticCurveTo(5.3, -0.2, 5.8, 0.55);
    hullShape.closePath();
    const hullGeo = new THREE.ExtrudeGeometry(hullShape, { depth: 2.2, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.1, bevelThickness: 0.08 });
    hullGeo.translate(0, 0, -1.1);
    kit.add(hullGeo, hullWood, { x, y: 1.0, z, ry: Math.PI / 2 });
    kit.add(boxGeo(0.14, 0.14, 10.8, 0.02), hullTrim, { x: x + 1.12, y: 1.55, z });
    kit.add(boxGeo(0.14, 0.14, 10.8, 0.02), hullTrim, { x: x - 1.12, y: 1.55, z });
    for (let k = 0; k < 14; k++) kit.add(boxGeo(2.1, 0.06, 0.55, 0.01), k % 2 ? m.wood : m.woodDark, { x, y: 1.62, z: z - 4.6 + k * 0.72 });
    kit.add(boxGeo(1.2, 0.8, 1.6, 0.04), m.wood, { x, y: 1.66, z: z - 2.6 });
    kit.add(boxGeo(1.3, 0.08, 1.7, 0.02), m.woodDark, { x, y: 2.5, z: z - 2.6 });
    kit.add(cylGeo(0.07, 0.12, 6.4, 10), m.woodDark, { x, y: 1.6, z });
    kit.add(cylGeo(0.05, 0.05, 3.4, 8), m.woodDark, { x, y: 4.6, z: z - 0.1, rx: Math.PI / 2 });
    // 帆（鼓起的弧面）
    const sailGeo = new THREE.PlaneGeometry(3.2, 3.9, 8, 8);
    const sp = sailGeo.attributes.position;
    for (let i = 0; i < sp.count; i++) sp.setZ(i, Math.cos((sp.getX(i) / 3.2) * Math.PI) * 0.35);
    sailGeo.computeVertexNormals();
    kit.add(sailGeo, index === 0 ? sail : mat(0xbfd4e8, 0.9, 0, { side: THREE.DoubleSide }), { x, y: 4.2, z, ry: Math.PI / 2 });
    kit.add(strutGeo([x, 7.9, z], [x, 1.6, z - 5.3], 0.012, 4), m.steel);
    kit.add(strutGeo([x, 7.9, z], [x, 1.6, z + 5.5], 0.012, 4), m.steel);
  }

  // 档案馆：石砌主体 + 双壁柱 + 拱窗 + 山花 + 发光档案牌
  const az = 51.2;
  kit.add(boxGeo(17.5, 9.6, 1.2, 0.08), m.stoneWarm, { y: 0.0 + 0.0, z: az });
  for (let i = 1; i < 12; i++) kit.add(boxGeo(17.6, 0.05, 1.22, 0.01), m.stoneDark, { y: i * 0.8, z: az });
  for (const x of [-8.5, 8.5]) {
    kit.add(boxGeo(1.6, 0.8, 1.9, 0.06), m.stoneDark, { x, y: 0, z: az - 0.55 });
    kit.add(cylGeo(0.62, 0.78, 8.2, 20), m.stone, { x, y: 0.8, z: az - 0.55 });
    kit.add(boxGeo(1.8, 0.6, 2.0, 0.06), m.stoneDark, { x, y: 9.0, z: az - 0.55 });
  }
  kit.add(boxGeo(18.6, 0.7, 2.1, 0.06), m.stoneDark, { y: 9.6, z: az - 0.2 });
  kit.add(gableGeo(18.2, 2.8, 1.2), m.stone, { y: 10.3, z: az - 0.2 });
  for (let k = 0; k < 6; k++) kit.add(boxGeo(0.34, 0.34, 0.14, 0.02), m.stoneDark, { x: -7.5 + k * 3, y: 9.35, z: az - 1.28 });
  for (const x of [-5.2, 0, 5.2]) {
    kit.add(boxGeo(4.6, 4.8, 0.3, 0.05), m.stoneDark, { x, y: 2.2, z: az - 0.7 });
    kit.add(boxGeo(4.2, 4.4, 0.2, 0.04), m.slate, { x, y: 2.4, z: az - 0.8 });
    kit.add(new THREE.CylinderGeometry(2.1, 2.1, 0.2, 24, 1, false, 0, Math.PI), m.slate, { x, y: 6.8, z: az - 0.8, rx: Math.PI / 2 });
  }
  kit.add(boxGeo(17.6, 0.5, 1.4, 0.05), m.brass, { y: 8.7, z: az - 0.75 });
  for (let i = 0; i < 4; i++) kit.add(boxGeo(5.2 - i * 0.2, 0.16, 0.5, 0.02), m.stone, { x: 0, y: 0.0 + i * 0.16, z: az - 2.2 - i * 0.2 });

  // 灯塔（港口尽头）：旋转体塔身 + 红白条 + 灯室 + 平台
  const lx = 0;
  const lz = 58.2;
  const towerRed = mat(0xb83b32, 0.7);
  kit.add(cylGeo(2.1, 2.5, 0.8, 32), m.stoneDark, { x: lx, y: 0, z: lz });
  let ty = 0.8;
  for (let i = 0; i < 6; i++) {
    const h = 1.05;
    kit.add(cylGeo(1.65 - i * 0.07 - 0.07, 1.65 - i * 0.07 + 0.0, h, 32), i % 2 ? towerRed : m.stone, { x: lx, y: ty, z: lz });
    ty += h;
  }
  kit.add(cylGeo(2.0, 1.45, 0.3, 36), m.stoneDark, { x: lx, y: ty, z: lz });
  for (let k = 0; k < 20; k++) {
    const a = (k / 20) * Math.PI * 2;
    kit.add(strutGeo([lx + Math.cos(a) * 1.9, ty + 0.3, lz + Math.sin(a) * 1.9], [lx + Math.cos(a) * 1.9, ty + 1.0, lz + Math.sin(a) * 1.9], 0.025, 4), m.steel);
  }
  kit.add(new THREE.TorusGeometry(1.9, 0.03, 5, 36), m.steel, { x: lx, y: ty + 1.0, z: lz, rx: Math.PI / 2 });
  kit.add(cylGeo(1.05, 1.1, 1.1, 24), m.glass, { x: lx, y: ty + 0.3, z: lz });
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    kit.add(strutGeo([lx + Math.cos(a) * 1.08, ty + 0.3, lz + Math.sin(a) * 1.08], [lx + Math.cos(a) * 1.08, ty + 1.4, lz + Math.sin(a) * 1.08], 0.04, 5), m.darkSteel);
  }
  kit.add(cylGeo(1.35, 1.15, 0.15, 28), m.darkSteel, { x: lx, y: ty + 1.4, z: lz });
  kit.add(new THREE.ConeGeometry(1.35, 0.8, 28), towerRed, { x: lx, y: ty + 1.95, z: lz });
  kit.add(strutGeo([lx, ty + 2.3, lz], [lx, ty + 3.0, lz], 0.03, 4), m.steel);

  // 码头杂物：木桶 / 木箱 / 绳圈
  for (let i = 0; i < 10; i++) {
    const x = -28 + rand() * 56;
    if (rand() > 0.5) {
      kit.add(cylGeo(0.4, 0.4, 0.9, 16), m.woodDark, { x, y: 1.68, z: 28.2 + rand() * 1.4 });
    } else {
      kit.add(boxGeo(0.8, 0.7, 0.8, 0.04), m.wood, { x, y: 1.68, z: 28.2 + rand() * 1.4, ry: rand() * 3 });
    }
  }
  kit.build(root, "harbor-hub", { isLandscapeStage: true });

  // 发光件
  for (const [index, x] of [-18, -6, 6, 18].entries()) {
    const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.36 + (index % 2) * 0.08, 0), glow);
    beacon.position.set(x, 3.5 + (index % 2) * 0.45, 40.0);
    beacon.userData.isLandscapeBeacon = true;
    root.add(beacon);
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.4, 1.1, 24), m.stoneDark);
    pedestal.position.set(x, 1.0, 40.2);
    pedestal.castShadow = true;
    pedestal.userData.isLandscapeStage = true;
    root.add(pedestal);
    const record = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.4 + (index % 2) * 0.4, 0.2), index % 2 ? edge : m.stone);
    record.position.set(x, 2.5, 40.2);
    record.castShadow = true;
    record.userData.isLandscapeStage = true;
    root.add(record);
  }
  for (const x of [-26, 0, 26]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 6, 16), edge);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x + 3.45, 1.62, 37.8);
    ring.userData.isLandscapeRing = true;
    root.add(ring);
  }
  const lightBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 14), glow);
  lightBeacon.position.set(lx, ty + 0.9, lz);
  lightBeacon.userData.isLandscapeBeacon = true;
  root.add(lightBeacon);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.08, 7, 36), edge);
  halo.rotation.x = Math.PI / 2;
  halo.position.set(lx, ty + 0.9, lz);
  halo.userData.isLandscapeRing = true;
  root.add(halo);
  for (const [x, z] of [[-31, 31], [-15, 46], [15, 46], [31, 31]] as const) {
    const wave = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.08, 6, 32), waveMat);
    wave.rotation.x = Math.PI / 2;
    wave.position.set(x, 0.66, z);
    wave.userData.isLandscapeRing = true;
    root.add(wave);
  }
  if (signTexture) {
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(14.8, 2.78), new THREE.MeshBasicMaterial({ map: signTexture, side: THREE.DoubleSide, toneMapped: false }));
    sign.position.set(0, 7.7, az - 1.1);
    sign.rotation.y = Math.PI;
    root.add(sign);
  }
  return root;
}

// ─────────────────────────────────────────────────────────────
/** 单元 3：记忆古树（真实树干 + 巨冠 + 发光记忆果 + 树根与石环） */
export function buildMemoryTreeHub(glow: THREE.MeshStandardMaterial, edge: THREE.MeshStandardMaterial): THREE.Group {
  const root = new THREE.Group();
  root.name = "memory-tree-hub";
  const rand = rng(303);
  const tree = createTree(7.5);
  tree.position.set(0, 0, 38);
  root.add(tree);
  // 发光记忆果：悬在树冠内的发光小球
  const fruitMat = glow.clone();
  fruitMat.emissiveIntensity = 1.4;
  for (let i = 0; i < 26; i++) {
    const a = rand() * Math.PI * 2;
    const r = 4 + rand() * 7;
    const y = 21 + (rand() - 0.2) * 9;
    const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.55 + rand() * 0.4, 14, 10), fruitMat);
    fruit.position.set(Math.cos(a) * r, y, 38 + Math.sin(a) * r);
    fruit.userData.isLandscapeBeacon = true;
    root.add(fruit);
  }
  // 环绕树根的石环与岩石
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    kit.add(boxGeo(1.8 + rand() * 0.6, 0.8, 1.2, 0.12), i % 2 ? m.stone : m.stoneDark, { x: Math.cos(a) * 9, y: 0.3 + rand() * 0.2, z: 38 + Math.sin(a) * 9, ry: -a });
  }
  for (let i = 0; i < 7; i++) {
    const a = rand() * Math.PI * 2;
    kit.add(new THREE.DodecahedronGeometry(0.7 + rand() * 0.9, 1), m.rock, { x: Math.cos(a) * (11 + rand() * 4), y: 0.4, z: 38 + Math.sin(a) * (11 + rand() * 4), sy: 0.7, ry: rand() * 3 });
  }
  kit.build(root, "memory-tree-ring", { isLandscapeStage: true });
  for (const x of [-31, 31]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4, 0.16, 8, 48), edge);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, 0.9, 36);
    ring.userData.isLandscapeRing = true;
    root.add(ring);
  }
  return root;
}

// ─────────────────────────────────────────────────────────────
/** 单元 4：思想神殿（三层台基、列柱廊、檐部、山花、屋顶、内殿、火盆） */
export function buildIdeaTempleHub(glow: THREE.MeshStandardMaterial, edge: THREE.MeshStandardMaterial): THREE.Group {
  const root = new THREE.Group();
  root.name = "idea-temple-hub";
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  const cz = 40;
  // 台基
  kit.add(boxGeo(30, 0.4, 19, 0.07), m.stoneDark, { y: 0.6, z: cz });
  kit.add(boxGeo(28.2, 0.4, 17.4, 0.06), m.stone, { y: 1.0, z: cz });
  kit.add(boxGeo(26.6, 0.4, 16, 0.06), m.stoneWarm, { y: 1.4, z: cz });
  const floor = 1.8;
  // 前方大台阶
  for (let i = 0; i < 4; i++) kit.add(boxGeo(9, 0.2, 1.4, 0.04), m.stoneWarm, { x: 0, y: 0.6 + i * 0.4, z: cz - 9.6 - (3 - i) * 0.6 });
  // 列柱：前后各 6 根，两侧各 2 根（中间）
  const colH = 9.6;
  const cr = 0.95;
  const xs = [-10.4, -6.24, -2.08, 2.08, 6.24, 10.4];
  for (const x of xs) {
    addColumn(kit, m, x, floor, cz - 6.2, colH, cr);
    addColumn(kit, m, x, floor, cz + 6.2, colH, cr);
  }
  for (const x of [-10.4, 10.4]) for (const z of [cz - 2.07, cz + 2.07]) addColumn(kit, m, x, floor, z, colH, cr);
  const topY = floor + cr * 0.7 + colH + cr * 0.95 + 0.0;
  // 檐部：额枋 + 三陇板饰带 + 檐口
  kit.add(boxGeo(23.2, 1.3, 14.0, 0.08), m.stoneWarm, { y: topY, z: cz });
  for (let i = 0; i < 24; i++) kit.add(boxGeo(0.4, 0.9, 0.18, 0.03), m.stoneDark, { x: -11 + i * 0.96, y: topY + 0.2, z: cz - 7.05 });
  kit.add(boxGeo(24.4, 0.5, 15.3, 0.06), m.stone, { y: topY + 1.3, z: cz });
  // 山花 + 檐口斜线 + 屋顶
  kit.add(gableGeo(24.2, 3.6, 1.2), m.stone, { y: topY + 1.8, z: cz - 6.9 });
  kit.add(gableGeo(24.2, 3.6, 1.2), m.stone, { y: topY + 1.8, z: cz + 6.9 });
  kit.add(gableGeo(19.8, 2.7, 0.3), m.slate, { y: topY + 2.2, z: cz - 7.4 });
  kit.add(gableGeo(25.0, 3.7, 15.2), m.stoneWarm, { y: topY + 1.85, z: cz });
  kit.add(gableGeo(24.4, 3.3, 15.4), m.terracottaRoof, { y: topY + 1.95, z: cz });
  kit.add(boxGeo(25.6, 0.4, 0.5, 0.06), m.stone, { y: topY + 5.2, z: cz });
  // 内殿：墙体 + 门洞 + 侧窗
  kit.add(boxGeo(16.4, colH, 9.4, 0.06), m.stone, { y: floor, z: cz });
  kit.add(boxGeo(2.4, 4.2, 0.4, 0.05), m.slate, { y: floor, z: cz - 4.75 });
  kit.add(boxGeo(2.9, 0.3, 0.6, 0.04), m.stoneDark, { y: floor + 4.2, z: cz - 4.8 });
  for (const s of [-1, 1]) for (const dx of [-5, 5]) kit.add(boxGeo(1.4, 2.4, 0.3, 0.04), m.slate, { x: dx, y: floor + 3.2, z: cz - 4.75 + (s > 0 ? 0 : 0) });
  // 火盆 × 2（门前）
  for (const s of [-1, 1]) {
    kit.add(cylGeo(0.5, 0.2, 1.1, 14), m.brass, { x: s * 3.4, y: floor, z: cz - 8.2 });
    kit.add(cylGeo(0.75, 0.5, 0.35, 16), m.brass, { x: s * 3.4, y: floor + 1.1, z: cz - 8.2 });
  }
  kit.build(root, "idea-temple", { isLandscapeStage: true });

  // 山花浮雕：发光圆徽
  const emblem = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.12, 28), glow);
  emblem.rotation.x = Math.PI / 2;
  emblem.position.set(0, topY + 3.0, cz - 7.58);
  root.add(emblem);
  // 屋脊火冠与光环（动画件）
  const flame = new THREE.Mesh(new THREE.OctahedronGeometry(1.3, 1), glow);
  flame.position.set(0, topY + 6.6, cz);
  flame.userData.isLandscapeBeacon = true;
  root.add(flame);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(8, 0.18, 8, 56), edge);
  halo.rotation.x = Math.PI / 2;
  halo.position.set(0, topY + 5.4, cz);
  halo.userData.isLandscapeRing = true;
  root.add(halo);
  for (const s of [-1, 1]) {
    const brazier = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1), glow);
    brazier.position.set(s * 3.4, floor + 1.7, cz - 8.2);
    brazier.userData.isLandscapeBeacon = true;
    root.add(brazier);
  }
  return root;
}

// ─────────────────────────────────────────────────────────────
/** 单元 5：发射场（八角发射台、箭体、发射塔架、燃料罐、控制楼） */
export function buildLaunchComplex(glow: THREE.MeshStandardMaterial, edge: THREE.MeshStandardMaterial, withGantry = true): THREE.Group {
  const root = new THREE.Group();
  root.name = "launch-complex";
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  const white = mat(0xeef1f4, 0.4, 0.3);
  const red = mat(0xc13b32, 0.45, 0.3);
  const dark = mat(0x2a3138, 0.5, 0.6);
  const cz = 40;
  const padTop = 1.4;

  // 发射台：三层八角 + 警示色带 + 火焰导流槽
  kit.add(prismGeo(14.6, 0.5, 0.05, 8), m.stoneDark, { y: 0.6, z: cz });
  kit.add(prismGeo(13.4, 0.35, 0.04, 8), m.slate, { y: 1.1, z: cz });
  kit.add(prismGeo(10, 0.15, 0.03, 8), m.stone, { y: 1.45, z: cz });
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    kit.add(boxGeo(1.5, 0.04, 0.5, 0.01), i % 2 ? m.brass : m.darkSteel, { x: Math.cos(a) * 12.4, y: 1.47, z: cz + Math.sin(a) * 12.4, ry: -a });
  }
  kit.add(boxGeo(4.2, 0.1, 5.2, 0.03), m.darkSteel, { y: 1.62, z: cz });

  // 箭体：旋转体分段（鼻锥 / 上段 / 红色环带 / 主体 / 裙部）
  const rx = 0;
  const base = padTop + 0.4;
  kit.add(latheGeo([[0, 0], [1.1, 0.0], [1.5, 0.2], [1.55, 1.6]], 40), dark, { x: rx, y: base, z: cz });
  kit.add(latheGeo([[1.55, 0], [1.6, 4.4]], 40), white, { x: rx, y: base + 1.6, z: cz });
  kit.add(latheGeo([[1.6, 0], [1.6, 0.9]], 40), red, { x: rx, y: base + 6.0, z: cz });
  kit.add(latheGeo([[1.6, 0], [1.55, 2.6]], 40), white, { x: rx, y: base + 6.9, z: cz });
  kit.add(latheGeo([[1.55, 0], [1.3, 1.2], [0.9, 2.6], [0.45, 3.8], [0.0, 4.6]].map(([r, y]) => [r, y] as [number, number]), 40), white, { x: rx, y: base + 9.5, z: cz });
  kit.add(latheGeo([[0.45, 0], [0.5, 0.5]], 20), red, { x: rx, y: base + 13.5, z: cz });
  // 尾翼 ×4（倒角挤出梯形）
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(2.2, -0.6);
  finShape.lineTo(2.2, 1.4);
  finShape.lineTo(0, 3.4);
  finShape.closePath();
  const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
  finGeo.translate(0, 0, -0.07);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    kit.add(finGeo, red, { x: rx + Math.cos(a) * 1.5, y: base + 1.2, z: cz + Math.sin(a) * 1.5, ry: -a });
  }
  // 发动机喷口
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    kit.add(new THREE.CylinderGeometry(0.25, 0.4, 0.7, 14, 1, true), dark, { x: rx + Math.cos(a) * 0.65, y: base - 0.35, z: cz + Math.sin(a) * 0.65 });
  }
  // 舷窗
  for (const y of [11.1, 11.9]) {
    kit.add(new THREE.TorusGeometry(0.2, 0.05, 8, 18), m.steel, { x: rx, y: base + y - 2, z: cz - 1.5, rx: 0 });
  }

  if (withGantry) {
    // 发射塔架：四柱桁架 + 横撑斜撑 + 摆臂 + 避雷针
    const gx = 6.8;
    const gh = 17;
    const legs: Array<[[number, number, number], [number, number, number]]> = [];
    for (const [dx, dz] of [[-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7]]) {
      legs.push([[gx + dx, padTop, cz + dz], [gx + dx * 0.8, padTop + gh, cz + dz * 0.8]]);
      kit.add(strutGeo(legs[legs.length - 1][0], legs[legs.length - 1][1], 0.09, 8), m.steel);
    }
    const lv = 11;
    for (let l = 0; l <= lv; l++) {
      const t = l / lv;
      const at = (i: number, tt: number): [number, number, number] => [
        legs[i][0][0] + (legs[i][1][0] - legs[i][0][0]) * tt,
        legs[i][0][1] + (legs[i][1][1] - legs[i][0][1]) * tt,
        legs[i][0][2] + (legs[i][1][2] - legs[i][0][2]) * tt,
      ];
      const order = [0, 1, 3, 2];
      for (let i = 0; i < 4; i++) {
        kit.add(strutGeo(at(order[i], t), at(order[(i + 1) % 4], t), 0.04, 5), m.steel);
        if (l < lv) kit.add(strutGeo(at(order[i], t), at(order[(i + 1) % 4], t + 1 / lv), 0.03, 4), m.steel);
      }
    }
    for (const y of [8.5, 12.5]) {
      kit.add(boxGeo(5.2, 0.16, 0.5, 0.03), m.darkSteel, { x: gx - 2.8, y: padTop + y, z: cz });
      kit.add(strutGeo([gx - 0.8, padTop + y, cz], [gx - 5.3, padTop + y - 0.05, cz], 0.07, 6), m.darkSteel);
    }
    kit.add(strutGeo([gx, padTop + gh, cz], [gx, padTop + gh + 2.4, cz], 0.04, 5), m.steel);
    // 燃料罐 + 管道
    for (const dz of [-3.6, 3.6]) {
      kit.add(cylGeo(1.1, 1.1, 3.2, 24), white, { x: -7.6, y: padTop, z: cz + dz });
      kit.add(new THREE.SphereGeometry(1.1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), white, { x: -7.6, y: padTop + 3.2, z: cz + dz });
      kit.add(strutGeo([-6.5, padTop + 0.8, cz + dz], [-1.8, padTop + 0.4, cz + dz * 0.3], 0.1, 8), m.steel);
    }
    // 控制楼 + 天线
    kit.add(boxGeo(5.2, 2.6, 3.6, 0.08), m.stone, { x: -3, y: padTop, z: cz + 10.5 });
    kit.add(boxGeo(5.5, 0.2, 3.9, 0.04), m.slate, { x: -3, y: padTop + 2.6, z: cz + 10.5 });
    kit.add(boxGeo(4.2, 0.9, 0.1, 0.02), m.glass, { x: -3, y: padTop + 1.2, z: cz + 8.65 });
    kit.add(strutGeo([-1.4, padTop + 2.8, cz + 10.5], [-1.4, padTop + 5.2, cz + 10.5], 0.05, 6), m.steel);
    kit.add(new THREE.SphereGeometry(0.9, 20, 8, 0, Math.PI * 2, 0, Math.PI / 3), white, { x: -2.2, y: padTop + 5.0, z: cz + 10.5, rx: -0.9 });
  }
  kit.build(root, "launch-complex", { isLandscapeStage: true });

  // 动画件：鼻锥信标 + 双轨道环
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12), glow);
  nose.position.set(rx, base + 14.3, cz);
  nose.userData.isLandscapeBeacon = true;
  root.add(nose);
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(8, 0.2, 8, 56), edge);
  ringA.rotation.x = Math.PI / 2.4;
  ringA.position.set(0, 9, cz);
  ringA.userData.isLandscapeRing = true;
  root.add(ringA);
  const ringB = ringA.clone();
  ringB.rotation.x = -Math.PI / 3;
  ringB.rotation.z = Math.PI / 5;
  root.add(ringB);
  return root;
}

// ─────────────────────────────────────────────────────────────
/** 单元 6：交易广场（铺地、货摊、交易所立面与发光账本） */
export function buildExchangeHub(
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  opts: { stalls: boolean; ledger: boolean }
): THREE.Group {
  const root = new THREE.Group();
  root.name = "exchange-hub";
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  const rand = rng(606);
  const cz = 38;
  // 广场：两层石台 + 方砖铺地
  kit.add(boxGeo(32, 0.5, 20, 0.06), m.stoneDark, { y: 0.55, z: cz });
  kit.add(boxGeo(30.4, 0.3, 18.4, 0.05), m.stone, { y: 1.05, z: cz });
  for (let i = -7; i <= 7; i++) kit.add(boxGeo(0.04, 0.02, 18.2, 0.005), m.slate, { x: i * 2, y: 1.36, z: cz });
  for (let k = -4; k <= 4; k++) kit.add(boxGeo(30.2, 0.02, 0.04, 0.005), m.slate, { y: 1.36, z: cz + k * 2 });

  if (opts.stalls) {
    for (const x of [-12, 0, 12]) {
      const z = 35;
      const cloth = [mat(0xc94a3d, 0.9, 0, { side: THREE.DoubleSide }), mat(0xf1e8d2, 0.9, 0, { side: THREE.DoubleSide })];
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) kit.add(cylGeo(0.1, 0.12, 3.6, 10), m.woodDark, { x: x + sx * 3.4, y: 1.4, z: z + sz * 2.2 });
      kit.add(boxGeo(7.8, 0.14, 0.14, 0.02), m.woodDark, { x, y: 5.0, z: z - 2.2 });
      kit.add(boxGeo(7.8, 0.14, 0.14, 0.02), m.woodDark, { x, y: 5.0, z: z + 2.2 });
      for (let k = 0; k < 10; k++) kit.add(boxGeo(0.82, 0.05, 5.4, 0.01), cloth[k % 2], { x: x - 3.7 + k * 0.82, y: 5.35, z, rx: 0 });
      kit.add(boxGeo(7.2, 1.3, 1.5, 0.06), m.wood, { x, y: 1.4, z: z + 1.0 });
      kit.add(boxGeo(7.4, 0.12, 1.7, 0.03), m.woodDark, { x, y: 2.7, z: z + 1.0 });
      for (let k = 0; k < 14; k++) {
        const tone = [0xd94b3d, 0xf2a93b, 0x7ab648, 0xe06b8f][k % 4];
        kit.add(new THREE.SphereGeometry(0.15, 10, 8), mat(tone, 0.6), { x: x - 3 + (k % 7) * 1.0, y: 2.95, z: z + 0.65 + Math.floor(k / 7) * 0.5 });
      }
      kit.add(boxGeo(1.2, 0.9, 0.9, 0.05), m.wood, { x: x + 2.6, y: 1.4, z: z - 1.2, ry: rand() * 2 });
      kit.add(cylGeo(0.45, 0.45, 0.95, 16), m.woodDark, { x: x - 2.6, y: 1.4, z: z - 1.2 });
    }
  }

  if (opts.ledger) {
    // 交易所：石砌立面 + 柱廊 + 檐口 + 发光账本屏
    const lz = 49;
    kit.add(boxGeo(21, 12.4, 3.6, 0.08), m.stoneWarm, { y: 1.3, z: lz });
    for (let i = 1; i < 15; i++) kit.add(boxGeo(21.1, 0.05, 3.62, 0.01), m.stoneDark, { y: 1.3 + i * 0.8, z: lz });
    for (const x of [-9, -4.5, 0, 4.5, 9]) addColumn(kit, m, x, 1.3, lz - 2.7, 8.6, 0.45);
    kit.add(boxGeo(22, 1.0, 2.2, 0.06), m.stone, { y: 10.2, z: lz - 2.5 });
    kit.add(boxGeo(22.8, 0.5, 4.2, 0.06), m.stoneDark, { y: 13.7, z: lz });
    kit.add(gableGeo(22.4, 2.4, 1.2), m.stone, { y: 14.2, z: lz - 1.2 });
    kit.add(boxGeo(11.2, 7.0, 0.3, 0.06), m.slate, { y: 3.2, z: lz - 1.6 });
    for (let i = -3; i <= 3; i++) kit.add(boxGeo(7.5, 0.08, 0.12, 0.01), m.brass, { y: 5.0 + i * 0.7 - 1.3, z: lz - 1.85 });
    kit.add(boxGeo(13, 0.4, 0.4, 0.05), m.brass, { y: 10.3, z: lz - 3.7 });
  }
  kit.build(root, "exchange-hub", { isLandscapeStage: true });

  if (opts.ledger) {
    const face = new THREE.Mesh(new THREE.BoxGeometry(10.4, 6.4, 0.18), glow);
    face.position.set(0, 6.0, 49 - 1.78);
    face.castShadow = false;
    root.add(face);
  }
  if (opts.stalls) {
    for (const x of [-12, 0, 12]) {
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), glow);
      lantern.position.set(x, 4.6, 33);
      lantern.userData.isLandscapeBeacon = true;
      root.add(lantern);
    }
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.07, 8, 48), edge);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 1.5, cz + 4);
  ring.userData.isLandscapeRing = true;
  root.add(ring);
  return root;
}
