import * as THREE from "three";
import { archFrameGeo } from "../detailKit";
import { createPine, createTree } from "../props";
import * as props from "../sceneProps";
import { SCENE_SCALE, STAGE_Y, addBeacon, createStage, finishStage, makeSignTexture, placePerson, worldXZ, type SceneContext, type SceneModule } from "./context";

/**
 * 单元 2「人生档案港」12 个段落场景（局部米制坐标，+z 朝向观众）。
 * A：时间线 · 路线证据 · 坚持攀登 · 传承拱门　B：聚光灯 · 救援站 · 长久服务 · 社区见证　C：船队 · 和平往来 · 海图室 · 交换港
 */

/** 把画布贴到平面上（世界坐标放置），用于地图 / 海图 / 告示 */
function addCanvasPlane(ctx: SceneContext, tex: THREE.Texture | undefined, lx: number, ly: number, lz: number, w: number, h: number, yaw = 0, rx = 0): void {
  if (!tex) return;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w * SCENE_SCALE, h * SCENE_SCALE), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, toneMapped: false }));
  const [x, z] = worldXZ(lx, lz);
  mesh.position.set(x, STAGE_Y + ly * SCENE_SCALE, z);
  mesh.rotation.set(rx, Math.PI + yaw, 0);
  mesh.userData.isLandscapeStage = true;
  mesh.userData.noLandscapeShadow = true;
  ctx.root.add(mesh);
}

/** 程序化的航线地图：海面底色、陆地剪影、虚线航线和图钉位置 */
function makeRouteMap(pins: Array<[number, number]>): THREE.CanvasTexture | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 740;
  const g = canvas.getContext("2d");
  if (!g) return undefined;
  g.fillStyle = "#b9d3d6";
  g.fillRect(0, 0, canvas.width, canvas.height);
  g.strokeStyle = "rgba(60,100,120,0.18)";
  g.lineWidth = 1;
  for (let i = 0; i < 28; i++) {
    g.beginPath();
    g.moveTo(i * 52, 0);
    g.lineTo(i * 52, canvas.height);
    g.stroke();
  }
  for (let i = 0; i < 15; i++) {
    g.beginPath();
    g.moveTo(0, i * 52);
    g.lineTo(canvas.width, i * 52);
    g.stroke();
  }
  g.fillStyle = "#d7c9a4";
  for (const [cx, cy, rx, ry] of [[230, 250, 210, 150], [1120, 200, 240, 130], [700, 640, 330, 90], [1150, 560, 150, 110]] as const) {
    g.beginPath();
    g.ellipse(cx, cy, rx, ry, 0.2, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = "#7a6b45";
  g.lineWidth = 3;
  g.setLineDash([]);
  g.stroke();
  g.strokeStyle = "#b8473f";
  g.lineWidth = 6;
  g.setLineDash([18, 12]);
  g.beginPath();
  pins.forEach(([x, y], i) => (i === 0 ? g.moveTo(x * canvas.width, y * canvas.height) : g.lineTo(x * canvas.width, y * canvas.height)));
  g.stroke();
  g.setLineDash([]);
  g.fillStyle = "#3a2d1a";
  g.font = "bold 34px Georgia, serif";
  g.fillText("N", 1310, 90);
  g.beginPath();
  g.moveTo(1322, 100);
  g.lineTo(1312, 150);
  g.lineTo(1332, 150);
  g.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ───────────────────────── Section A ─────────────────────────

/** 时间线：三块展板 + 一艘停在小水池里的帆船，沿展板脚下的路线点亮三个节点 */
export const timelineScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const labels = ["DEPARTURE", "CROSSING", "ARRIVAL"];
  [-3.6, 0, 3.6].forEach((x, i) => {
    const c = f.child(x, 0, -2.0, (1 - i) * 0.12);
    c.box(m.stoneDark, 2.0, 0.16, 0.6, 0, 0, 0, 0.03);
    for (const sx of [-1, 1]) c.cyl(m.woodDark, 0.06, 0.07, 2.6, sx * 0.85, 0.16, 0, 10);
    c.box(m.woodDark, 2.1, 1.7, 0.08, 0, 0.7, 0, 0.03);
    c.box(p.boardWhite, 1.9, 1.5, 0.04, 0, 0.8, 0.05, 0.01);
    c.box(m.paper, 1.5, 0.7, 0.012, 0, 1.4, 0.075, 0.004);
    c.box([m.copper, m.brass, k.p.fabricRed][i], 1.5, 0.1, 0.012, 0, 1.2, 0.08, 0.004);
    for (let r = 0; r < 3; r++) c.box(m.stoneDark, 1.1 - r * 0.2, 0.05, 0.012, -0.2 + (r * 0.1) * -1, 1.08 - r * 0.15, 0.08, 0.004);
    c.box(m.woodDark, 2.2, 0.08, 0.2, 0, 2.7, 0, 0.02);
    const tex = makeSignTexture([{ text: labels[i], y: 160, font: "bold 78px Arial, sans-serif" }], { width: 640, height: 320, background: "#2c3e50" });
    addCanvasPlane(ctx, tex, x + Math.sin((1 - i) * 0.12) * 0.0, 2.45, -1.9, 1.5, 0.5, (1 - i) * 0.12);
  });
  // 小水池 + 帆船
  props.waterDisc(k, f.child(0, 0, 1.0), 2.5, 1.35, 0.78);
  props.ship(k, f.child(-0.2, 0.3, 1.0, 0.25), 3.1, 2);
  // 途径节点（沿展板脚下的石板路）
  for (let i = 0; i < 12; i++) f.box(i % 2 ? m.paveA : m.paveB, 0.7, 0.045, 0.5, -4.6 + i * 0.84, 0, -1.0, 0.015);
  [-3.6, 0, 3.6].forEach((x) => addBeacon(ctx, ctx.glow, x, 0.4, -1.0, 0.13));
  props.bench(k, f.child(-4.6, 0, 1.4, -0.7), 1.6);
  props.bench(k, f.child(4.6, 0, 1.4, 0.7), 1.6);
  props.lampPost(k, f.child(-5.3, 0, -1.6));
  props.lampPost(k, f.child(5.3, 0, -1.6));
  finishStage(s, "scene-timeline");
};

/** 路线证据：整面航线地图墙 + 图钉 + 两张证据陈列桌，一位研究者在指认路线 */
export const routeEvidenceScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  const pins: Array<[number, number]> = [[0.16, 0.7], [0.36, 0.34], [0.58, 0.62], [0.82, 0.3]];
  const wall = f.child(0, 0, -2.2, 0);
  wall.box(m.stoneDark, 6.2, 0.2, 0.8, 0, 0, 0, 0.03);
  for (const sx of [-1, 1]) wall.cyl(m.woodDark, 0.09, 0.1, 3.4, sx * 3.0, 0.2, 0, 12);
  wall.box(m.woodDark, 6.2, 0.2, 0.3, 0, 3.4, 0, 0.03);
  wall.box(m.woodDark, 5.8, 2.8, 0.1, 0, 0.5, 0, 0.03);
  addCanvasPlane(ctx, makeRouteMap(pins), 0, 0.5 + 1.4 + 0.2 - 0.2, -2.2 + 0.07, 5.5, 2.5);
  pins.forEach(([px, py], i) => {
    addBeacon(ctx, i % 2 ? ctx.edge : ctx.glow, (px - 0.5) * -5.5 * -1 * -1, 0.5 + 0.2 + (1 - py) * 2.5 + 0.05, -2.2 + 0.2, 0.12);
  });
  // 证据陈列桌：桌面 + 玻璃罩 + 书与照片
  for (const [x, yaw] of [[-2.2, 0.3], [2.2, -0.3]] as const) {
    const t = f.child(x, 0, 0.7, yaw);
    props.table(k, t, 1.7, 0.9, 0.8);
    t.put(new THREE.BoxGeometry(1.5, 0.12, 0.7), m.glass, 0, 0.88, 0);
    props.openBook(k, t.child(-0.3, 0.805, 0, 0.1));
    props.bookStack(k, t.child(0.4, 0.805, 0.05, 0.3), 3, 8);
    props.pictureFrame(k, t.child(0.0, 0.805, 0.25, -0.2), 0.3, 0.22);
  }
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x3a2a1c, glasses: true, pose: "point", backpack: 0xc79a3a }, 0.2, 0, 0.1, 0.0);
  props.lampPost(k, f.child(-4.4, 0, 1.6));
  props.lampPost(k, f.child(4.4, 0, 1.6));
  props.planter(k, f.child(0, 0, 3.0), 0.5, 41);
  finishStage(s, "scene-route-evidence");
};

/** 坚持：六级岩石台阶蜿蜒上升至山顶，山顶有旗杆与信标；半山有一位登山者 */
export const perseveranceScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  for (let i = 0; i < 6; i++) {
    const x = -3.9 + i * 1.6;
    const h = 0.35 + i * 0.45;
    f.box(i % 2 ? m.stoneDark : m.stone, 1.75, h, 2.0, x, 0, -0.2, 0.06);
    f.box(m.leafLight, 1.7, 0.08, 1.9, x, h, -0.2, 0.04);
    for (let r = 0; r < 3; r++) f.put(new THREE.DodecahedronGeometry(0.16 + (r % 2) * 0.05, 1), m.rock, x - 0.4 + r * 0.4, h + 0.1, 0.5, 0, r, 0, 1, 0.7, 1);
  }
  // 沿坡扶手
  for (let i = 0; i < 6; i++) f.cyl(m.woodDark, 0.03, 0.04, 0.9, -4.3 + i * 1.6, 0.35 + i * 0.45, 0.85, 8);
  f.strut(m.woodDark, [-4.3, 1.25, 0.85], [5.0 - 0.6 + 0, 3.55 + 0.9 - 0.35, 0.85], 0.02, 6);
  // 山顶旗杆与旗
  f.cyl(m.steel, 0.03, 0.04, 2.6, 4.1, 3.05, -0.2, 8);
  f.box(k.p.fabricRed, 0.9, 0.5, 0.02, 4.55, 4.9, -0.2, 0.005);
  addBeacon(ctx, ctx.glow, 3.4, 4.2, -0.2, 0.3);
  // 登山者
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, backpack: 0x2f5d8a, pose: "walk" }, -0.35, 1.55, 0.6, -0.9);
  // 背景岩丛与小松树
  const pine = createPine(1.4);
  const [px, pz] = worldXZ(-4.6, -1.5);
  pine.position.set(px, STAGE_Y, pz);
  ctx.root.add(pine);
  const tree = createTree(1.0);
  const [tx, tz] = worldXZ(5.0, -1.7);
  tree.position.set(tx, STAGE_Y + 3.0, tz);
  ctx.root.add(tree);
  props.lampPost(k, f.child(-5.3, 0, 1.2), 3.0);
  finishStage(s, "scene-perseverance");
};

/** 传承：三座渐高的石拱门，每座下有一盏灯，门前并排的纪念石碑；祖孙在第一座拱门前 */
export const legacyScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  [0, 1, 2].forEach((i) => {
    const x = (i - 1) * 3.3;
    const h = 2.8 + i * 0.7;
    const c = f.child(x, 0, -0.6 - i * 0.6, 0);
    const w = 2.1;
    for (const sx of [-1, 1]) {
      c.box(m.stoneDark, 0.8, 0.3, 0.9, sx * (w / 2 + 0.2), 0, 0, 0.04);
      c.box(m.stone, 0.62, h - 0.3, 0.72, sx * (w / 2 + 0.2), 0.3, 0, 0.05);
    }
    c.put(archFrameGeo(w / 2 + 0.52, w / 2 - 0.1, 0.72, 0.05), i === 2 ? m.stoneWarm : m.stone, 0, h, 0);
    c.box(m.stoneDark, 0.5, 0.55, 0.8, 0, h + w / 2 + 0.3, 0, 0.05);
    c.put(new THREE.SphereGeometry(0.14, 12, 10), m.brass, 0, h + w / 2 + 0.95, 0);
    c.strut(m.steel, [0, h + w / 2, 0], [0, h + 0.5, 0], 0.01, 4);
    addBeacon(ctx, ctx.glow, x, h + 0.35, -0.6 - i * 0.6, 0.2 + i * 0.05);
    // 纪念石碑
    const stele = f.child(x, 0, 1.3 - i * 0.2, 0);
    stele.box(m.stoneDark, 0.9, 0.18, 0.5, 0, 0, 0, 0.03);
    stele.box(m.stone, 0.7, 1.1 + i * 0.15, 0.2, 0, 0.18, 0, 0.05);
    stele.box(m.slate, 0.5, 0.5, 0.02, 0, 0.55 + i * 0.05, 0.11, 0.01);
  });
  for (let i = 0; i < 14; i++) f.box(i % 2 ? m.paveA : m.paveB, 0.65, 0.04, 0.5, -4.8 + i * 0.74, 0, 2.5, 0.015);
  placePerson(ctx, { shirt: 0x9a8f6c, hair: 0x6a6a6a, scarf: 0xb04a40, pose: "point" }, -3.6, 0, 1.6, 0.5);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, scale: 1.0 }, -2.8, 0, 1.9, -0.4);
  props.lampPost(k, f.child(-5.3, 0, 1.0));
  props.lampPost(k, f.child(5.3, 0, 1.0));
  props.planter(k, f.child(4.3, 0, 2.5), 0.5, 3);
  finishStage(s, "scene-legacy");
};

// ───────────────────────── Section B ─────────────────────────

/** 聚光灯：木质舞台、天鹅绒幕布、两侧灯架与光柱、讲台上的发言者与前排观众，中央立着一枚金星奖杯 */
export const spotlightScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  // 舞台 + 台阶
  f.box(m.woodDark, 7.0, 0.5, 3.2, 0, 0, -1.4, 0.05);
  for (let i = 0; i < 10; i++) f.box(i % 2 ? m.wood : m.woodDark, 6.8, 0.02, 0.3, 0, 0.5, -2.9 + i * 0.32, 0.005);
  props.stairs(k, f.child(0, 0, 1.0, Math.PI), 2.2, 3, 0.16, 0.3);
  // 幕布：竖向褶皱
  for (let i = 0; i < 16; i++) f.box(p.fabricRed, 0.45, 3.2, 0.12, -3.4 + i * 0.45, 0.5, -3.0 - (i % 2) * 0.05, 0.03);
  f.box(m.woodDark, 7.4, 0.35, 0.3, 0, 3.7, -3.0, 0.04);
  for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) f.box(p.fabricRed, 0.5, 2.9 - i * 0.3, 0.2, sx * (3.5 + i * 0.12), 0.5, -2.7 + i * 0.35, 0.04);
  // 灯架 + 灯 + 光柱
  for (const sx of [-1, 1]) {
    const rig = f.child(sx * 4.5, 0, 0.3);
    for (const [dx, dz] of [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]]) rig.strut(m.steel, [dx, 0, dz], [dx * 0.6, 4.2, dz * 0.6], 0.035, 6);
    for (let l = 0; l <= 6; l++) {
      const t = l / 6;
      const sc = 1 - t * 0.4;
      rig.strut(m.steel, [-0.22 * sc, t * 4.2, -0.22 * sc], [0.22 * sc, t * 4.2, -0.22 * sc], 0.015, 4);
      rig.strut(m.steel, [-0.22 * sc, t * 4.2, 0.22 * sc], [0.22 * sc, t * 4.2, 0.22 * sc], 0.015, 4);
    }
    for (let l = 0; l < 3; l++) {
      rig.put(new THREE.CylinderGeometry(0.15, 0.2, 0.34, 14), p.plasticDark, -sx * 0.4, 3.0 + l * 0.35, 0.3, 0.5, 0, sx * 0.9);
    }
    const beam = new THREE.Mesh(new THREE.ConeGeometry(1.5 * SCENE_SCALE, 7 * SCENE_SCALE, 18, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff2c0, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
    const [bx, bz] = worldXZ(sx * 4.5 - sx * 2.0, 0.3 - 1.0);
    beam.position.set(bx, STAGE_Y + 2.8 * SCENE_SCALE, bz);
    beam.rotation.z = sx * 0.5;
    beam.userData.noLandscapeShadow = true;
    ctx.root.add(beam);
  }
  // 讲台 + 发言者 + 奖杯
  props.lectern(k, f.child(-1.2, 0.5, -1.4, 0.15));
  placePerson(ctx, { shirt: 0x3b5f8f, hair: 0x2b1d16, pose: "talk" }, -2.1, 0.5, -1.3, 0.3);
  const trophy = f.child(1.3, 0.5, -1.4);
  trophy.cyl(m.stoneDark, 0.3, 0.38, 0.5, 0, 0, 0, 20);
  trophy.cyl(m.brass, 0.06, 0.08, 0.5, 0, 0.5, 0, 12);
  addBeacon(ctx, ctx.edge, 1.3, 1.9, -1.4, 0.28);
  // 前排观众：四把椅子，两人入座
  for (let i = 0; i < 4; i++) props.chair(k, f.child(-1.8 + i * 1.2, 0, 2.3, Math.PI));
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, hairStyle: "long", seated: true, pose: "listen" }, -0.6, 0.45, 2.3, Math.PI);
  placePerson(ctx, { shirt: 0x78968a, hair: 0x443a34, seated: true, pose: "listen" }, 0.6, 0.45, 2.3, Math.PI);
  props.lampPost(k, f.child(-5.4, 0, 2.2));
  props.lampPost(k, f.child(5.4, 0, 2.2));
  finishStage(s, "scene-spotlight");
};

/** 救援站：帆布大棚下的净水桶、物资箱与告示栏，两位志愿者正在分发 */
export const humanitarianScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.8, 3.9, 0.05, 0, 0, 0, 40);
  props.tent(k, f.child(0, 0, -0.4), 7.0, 5.0, 2.9, p.canvasOlive);
  // 净水桶（带龙头）
  for (const sx of [-1, 1]) {
    const t = f.child(sx * 2.6, 0, -1.4);
    t.cyl(m.steel, 0.46, 0.5, 1.3, 0, 0.2, 0, 20);
    t.cyl(m.darkSteel, 0.46, 0.46, 0.06, 0, 1.5, 0, 20);
    t.put(new THREE.TorusGeometry(0.46, 0.02, 6, 24), m.darkSteel, 0, 0.8, 0, Math.PI / 2);
    t.cyl(m.brass, 0.03, 0.03, 0.2, 0, 0.5, 0.55, 8);
    t.box(m.wood, 1.0, 0.2, 1.0, 0, 0, 0, 0.03);
  }
  // 物资箱：整齐的三堆，箱盖十字标记
  [-1.6, 0, 1.6].forEach((x, i) => {
    props.crate(k, f.child(x, 0, -0.1, 0.05 * (i - 1)), 1.1, 0.8, 0.8);
    props.crate(k, f.child(x, 0.8, -0.1, 0.3 * (i - 1)), 0.8, 0.5, 0.7);
    f.box(i === 1 ? m.brass : k.p.fabricRed, 0.5, 0.012, 0.1, x, 1.31, -0.1, 0.003, 0, 0, 0);
  });
  // 粮袋
  for (let i = 0; i < 4; i++) f.put(new THREE.SphereGeometry(0.3, 12, 10), k.p.fabricCream, 3.3, 0.18 + (i % 2) * 0.2, -0.5 + i * 0.5, 0, i, 0, 1.2, 0.6, 0.8);
  // 告示栏
  const bd = f.child(0, 0, -2.6);
  bd.cyl(m.woodDark, 0.07, 0.08, 2.6, -1.9, 0, 0, 10);
  bd.cyl(m.woodDark, 0.07, 0.08, 2.6, 1.9, 0, 0, 10);
  props.board(k, bd.child(0, 0.5, 0), 3.4, 1.4, p.boardGreen);
  for (let i = 0; i < 3; i++) bd.box(i === 1 ? m.brass : m.paper, 0.7, 0.9, 0.01, -1.1 + i * 1.1, 0.75, 0.11, 0.004);
  [-1.1, 0, 1.1].forEach((x) => addBeacon(ctx, ctx.glow, x, 2.35, -2.5, 0.12));
  // 两位志愿者
  placePerson(ctx, { shirt: 0x6f927c, hair: 0x2b1d16, pose: "talk", backpack: 0xc79a3a }, -0.7, 0, 1.5, 0.4);
  placePerson(ctx, { shirt: 0xb99b7c, hair: 0x3a2a1c, scarf: 0xb04a40, pose: "listen" }, 0.7, 0, 1.5, -0.4);
  props.lampPost(k, f.child(-4.4, 0, 1.4));
  props.lampPost(k, f.child(4.4, 0, 1.4));
  finishStage(s, "scene-humanitarian");
};

/** 长久服务：一棵茂盛的大树，树下环形石凳，种子与铭牌，象征持续生长 */
export const lastingServiceScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  f.cyl(m.leafLight, 3.7, 3.8, 0.05, 0, 0, 0, 40);
  const tree = createTree(2.3);
  const [tx, tz] = worldXZ(0, -0.8);
  tree.position.set(tx, STAGE_Y, tz);
  ctx.root.add(tree);
  // 树池 + 环形石凳
  f.cyl(m.stoneDark, 1.5, 1.6, 0.3, 0, 0, -0.8, 28);
  f.cyl(m.soil, 1.3, 1.3, 0.05, 0, 0.3, -0.8, 28);
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + 0.1;
    if (Math.sin(a) < -0.2) continue;
    f.box(m.wood, 0.9, 0.08, 0.38, Math.cos(a) * 2.3, 0.4, -0.8 + Math.sin(a) * 2.3 * 0.9, 0.015, 0, -a + Math.PI / 2);
    f.box(m.stoneDark, 0.12, 0.4, 0.3, Math.cos(a) * 2.3, 0, -0.8 + Math.sin(a) * 2.3 * 0.9, 0.02, 0, -a + Math.PI / 2);
  }
  // 铭牌 + 洒水壶
  const plaque = f.child(1.2, 0, 1.4, -0.3);
  plaque.box(m.stoneDark, 0.9, 0.15, 0.5, 0, 0, 0, 0.03);
  plaque.box(m.stone, 0.7, 0.8, 0.14, 0, 0.15, 0, 0.04, -0.15);
  plaque.box(m.brass, 0.5, 0.3, 0.02, 0, 0.5, 0.09, 0.005, -0.15);
  const can = f.child(-1.3, 0, 1.4);
  can.cyl(m.copper, 0.16, 0.18, 0.3, 0, 0, 0, 14);
  can.strut(m.copper, [0.12, 0.2, 0], [0.5, 0.45, 0], 0.025, 6);
  addBeacon(ctx, ctx.edge, -3.4, 1.0, 0.4, 0.2);
  addBeacon(ctx, ctx.edge, 3.4, 1.0, 0.4, 0.2);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, pose: "point" }, 0.0, 0, 2.3, 0);
  props.planter(k, f.child(-4.2, 0, 1.2), 0.55, 6);
  props.planter(k, f.child(4.2, 0, 1.2), 0.55, 8);
  props.lampPost(k, f.child(-4.8, 0, -1.6));
  props.lampPost(k, f.child(4.8, 0, -1.6));
  finishStage(s, "scene-lasting-service");
};

/** 社区见证：环绕圆桌的三张弧形长椅，成员坐成一圈倾听彼此，桌上一盏灯，头顶漂浮声音 */
export const communityWitnessScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.6, 3.7, 0.06, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 2.7, 2.7, 0.08, 0, 0, 0, 40);
  props.roundTable(k, f.child(0, 0, 0.7), 0.7, 0.72);
  const lam = f.child(0, 0.72, 0.7);
  lam.cyl(m.brass, 0.08, 0.1, 0.03, 0, 0, 0, 12);
  lam.cyl(m.lampGlass, 0.07, 0.07, 0.2, 0, 0.03, 0, 12);
  lam.put(new THREE.ConeGeometry(0.11, 0.1, 12), m.brass, 0, 0.28, 0);
  // 三张长椅在桌后围成弧形，面向观众与圆桌
  const seats: Array<[number, number, number]> = [[-2.5, -0.5, -0.65], [0, -1.7, 0], [2.5, -0.5, 0.65]];
  seats.forEach(([x, z, yaw]) => props.bench(k, f.child(x, 0, z, Math.PI * 0 + yaw * -1 + Math.PI), 1.9));
  const crowd = [
    { x: -2.5, z: -0.35, yaw: -0.65, shirt: 0x79aaa5, hair: 0x2b1d16, pose: "talk" as const },
    { x: -0.5, z: -1.55, yaw: 0, shirt: 0xb99b7c, hair: 0x3a2a1c, pose: "listen" as const },
    { x: 0.6, z: -1.55, yaw: 0, shirt: 0x829fc0, hair: 0x2b1d16, pose: "listen" as const },
    { x: 2.5, z: -0.35, yaw: 0.65, shirt: 0xc18168, hair: 0x555555, pose: "listen" as const },
  ];
  for (const c of crowd) placePerson(ctx, { shirt: c.shirt, hair: c.hair, seated: true, pose: c.pose }, c.x, 0.46, c.z, c.yaw);  for (const x of [-3.2, 0, 3.2]) addBeacon(ctx, ctx.glow, x, 2.6, 0.3, 0.2);
  props.lampPost(k, f.child(-4.4, 0, -1.6));
  props.lampPost(k, f.child(4.4, 0, -1.6));
  props.planter(k, f.child(-3.6, 0, 2.6), 0.5, 10);
  props.planter(k, f.child(3.6, 0, 2.6), 0.5, 12);
  finishStage(s, "scene-community-witness");
};

// ───────────────────────── Section C ─────────────────────────

/** 船队：三艘不同帆数的帆船停靠在木栈桥边，水面、系缆柱与货箱 */
export const fleetScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  f.put(new THREE.CylinderGeometry(5.0, 5.0, 0.2, 48), k.p.water, 0, 0.12, 0.0);
  f.box(m.stoneDark, 11.6, 0.36, 0.5, 0, 0, 3.6, 0.03);
  // 栈桥
  for (let i = 0; i < 22; i++) f.box(i % 2 ? m.wood : m.woodDark, 0.38, 0.06, 1.5, -4.2 + i * 0.4, 0.6, 2.6, 0.01);
  for (let i = 0; i < 8; i++) {
    f.cyl(m.woodDark, 0.09, 0.11, 0.9, -4.0 + i * 1.15, 0, 3.3, 10);
    f.cyl(m.woodDark, 0.09, 0.11, 0.9, -4.0 + i * 1.15, 0, 1.9, 10);
  }
  [[-3.2, 3, -0.5], [0, 2, 0.3], [3.2, 3, 0.1]].forEach(([x, masts, zOff], i) => {
    props.ship(k, f.child(x, 0.2, zOff, 0.12 - i * 0.12), i === 1 ? 3.6 : 3.0, masts as number, i === 1 ? k.p.fabricRed : k.p.fabricCream);
  });
  props.barrel(k, f.child(-4.4, 0.66, 2.9));
  props.crate(k, f.child(4.4, 0.66, 2.6), 0.6, 0.5, 0.5);
  for (const x of [-1.5, 1.5]) props.crate(k, f.child(x, 0.66, 2.8, x * 0.1), 0.55, 0.45, 0.5);
  props.lampPost(k, f.child(-5.2, 0.66, 2.0));
  props.lampPost(k, f.child(5.2, 0.66, 2.0));
  placePerson(ctx, { shirt: 0x3b5f8f, hair: 0x2b1d16, pose: "point", scarf: 0xb04a40 }, 0.9, 0.66, 2.6, 0.2);
  addBeacon(ctx, ctx.glow, 0, 5.2, 0.3, 0.2);
  finishStage(s, "scene-fleet");
};

/** 和平往来：两座石厅以拱桥相连，桥心两人握手，桥头的书台摆着交换的书 */
export const peaceContactScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  f.put(new THREE.CylinderGeometry(5.0, 5.0, 0.2, 48), k.p.water, 0, 0.12, 0.2);
  for (const sx of [-1, 1]) {
    f.box(m.stoneDark, 3.4, 0.3, 3.0, sx * 4.2, 0, 0.1, 0.04);
    props.house(k, f.child(sx * 4.2, 0.3, 0.1, -sx * 0.1), 3.0, 3.2, 2.4, sx < 0 ? m.terracottaRoof : m.slate, m.stoneWarm);
  }
  // 拱桥：桥面 + 拱 + 栏杆
  f.box(m.stone, 5.2, 0.28, 1.5, 0, 1.0, 0.1, 0.04);
  f.put(archFrameGeo(2.5, 2.1, 1.4, 0.04), m.stoneDark, 0, 0.25, 0.1);
  for (const dz of [-0.65, 0.85]) {
    f.box(m.stoneDark, 5.2, 0.12, 0.14, 0, 1.28 + 0.65, dz, 0.02);
    for (let i = 0; i < 7; i++) f.box(m.stoneDark, 0.1, 0.65, 0.1, -2.4 + i * 0.8, 1.28, dz, 0.015);
  }
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, pose: "talk" }, -0.55, 1.28, 0.1, Math.PI / 2 + 0.3);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x555555, pose: "talk" }, 0.55, 1.28, 0.1, -Math.PI / 2 - 0.3);
  // 书台：交换的书
  for (const sx of [-1, 1]) {
    const t = f.child(sx * 1.9, 0, 2.3, 0);
    t.cyl(m.stoneDark, 0.3, 0.38, 0.8, 0, 0, 0, 14);
    t.box(m.stone, 0.8, 0.06, 0.6, 0, 0.8, 0, 0.015);
    props.openBook(k, t.child(0, 0.86, 0, sx * 0.4));
    props.bookStack(k, t.child(sx * 0.28, 0.86, 0.1, 0.2), 3, 12 + sx);
  }
  addBeacon(ctx, ctx.glow, 0, 3.2, 0.1, 0.22);
  props.lampPost(k, f.child(-5.4, 0, 2.2));
  props.lampPost(k, f.child(5.4, 0, 2.2));
  finishStage(s, "scene-peace-contact");
};

/** 海图室：圆形海图桌（画布海图 + 罗盘玫瑰）、测量仪器、卷轴架与地球仪，中央指南针信标 */
export const chartRoomScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.7, 3.7, 0.04, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 3.3, 3.3, 0.05, 0, 0, 0, 40);
  // 圆桌 + 海图
  f.cyl(m.woodDark, 2.0, 2.0, 0.12, 0, 0.78, 0, 48);
  f.cyl(m.wood, 2.1, 2.1, 0.06, 0, 0.72, 0, 48);
  f.cyl(m.woodDark, 0.18, 0.28, 0.78, 0, 0, 0, 14);
  f.cyl(m.woodDark, 0.8, 0.9, 0.08, 0, 0, 0, 24);
  const chart = document.createElement("canvas");
  chart.width = 900;
  chart.height = 900;
  const g = chart.getContext("2d");
  let chartTex: THREE.CanvasTexture | undefined;
  if (g) {
    g.fillStyle = "#e2d3ac";
    g.fillRect(0, 0, 900, 900);
    g.strokeStyle = "#6a8a96";
    g.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      g.beginPath();
      g.moveTo(i * 52, 0);
      g.lineTo(i * 52, 900);
      g.moveTo(0, i * 52);
      g.lineTo(900, i * 52);
      g.stroke();
    }
    g.fillStyle = "#b8c9a0";
    g.beginPath();
    g.ellipse(250, 300, 150, 100, 0.4, 0, Math.PI * 2);
    g.ellipse(650, 620, 170, 110, -0.3, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "#b8473f";
    g.lineWidth = 6;
    g.setLineDash([16, 12]);
    g.beginPath();
    g.moveTo(150, 700);
    g.bezierCurveTo(350, 450, 500, 650, 760, 200);
    g.stroke();
    g.setLineDash([]);
    g.translate(740, 160);
    g.fillStyle = "#3a2d1a";
    for (let i = 0; i < 8; i++) {
      g.rotate(Math.PI / 4);
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(10, -50);
      g.lineTo(-10, -50);
      g.fill();
    }
    chartTex = new THREE.CanvasTexture(chart);
    chartTex.colorSpace = THREE.SRGBColorSpace;
    chartTex.anisotropy = 4;
  }
  if (chartTex) {
    const plane = new THREE.Mesh(new THREE.CircleGeometry(1.9 * SCENE_SCALE, 48), new THREE.MeshBasicMaterial({ map: chartTex, toneMapped: false }));
    const [cx, cz] = worldXZ(0, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(cx, STAGE_Y + 0.912 * SCENE_SCALE, cz);
    plane.userData.noLandscapeShadow = true;
    ctx.root.add(plane);
  }
  // 仪器：圆规 / 六分仪 / 铜罗盘 / 地球仪
  const dev = f.child(-0.8, 0.84, 0.3, 0.6);
  dev.strut(m.brass, [0, 0, 0], [0.12, 0.28, 0], 0.012, 5);
  dev.strut(m.brass, [0.24, 0, 0], [0.12, 0.28, 0], 0.012, 5);
  const comp = f.child(0.8, 0.84, 0.4);
  comp.cyl(m.brass, 0.14, 0.14, 0.05, 0, 0, 0, 20);
  comp.put(new THREE.CircleGeometry(0.12, 20), p.ceramic, 0, 0.052, 0, -Math.PI / 2);
  props.globe(k, f.child(3.1, 0, -1.2));
  // 卷轴架
  const rack = f.child(-3.3, 0, -1.5, 0.3);
  rack.box(m.woodDark, 1.4, 1.6, 0.4, 0, 0, 0, 0.03);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) rack.put(new THREE.CylinderGeometry(0.06, 0.06, 0.38, 10), p.fabricCream, -0.5 + c * 0.33, 0.28 + r * 0.45, 0.0, Math.PI / 2, 0, 0);
  placePerson(ctx, { shirt: 0x3b5f8f, hair: 0x2b1d16, glasses: true, pose: "point" }, 0.1, 0, 2.3, 0.2);
  props.lampPost(k, f.child(-4.6, 0, 1.6));
  props.lampPost(k, f.child(4.6, 0, 1.6));
  addBeacon(ctx, ctx.edge, 0, 3.0, -0.9, 0.28);
  finishStage(s, "scene-chart-room");
};

/** 交换港：左右两座货摊栈桥，货物与天平，中间的木桥上有交换的箱子 */
export const exchangeHarborScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.put(new THREE.CylinderGeometry(5.0, 5.0, 0.2, 48), p.water, 0, 0.12, 0.0);
  for (const sx of [-1, 1]) {
    const piers = f.child(sx * 3.9, 0, 0.1);
    for (let i = 0; i < 12; i++) piers.box(i % 2 ? m.wood : m.woodDark, 2.4, 0.07, 0.36, 0, 0.62, -2.0 + i * 0.37, 0.01);
    for (const dx of [-1.1, 1.1]) for (const dz of [-2.0, 0, 2.0]) piers.cyl(m.woodDark, 0.09, 0.11, 0.7, dx, 0, dz, 10);
    props.awning(k, piers.child(0, 0.65, -0.4), 2.2, 1.2, 7, sx < 0 ? p.fabricRed : p.fabricBlue, p.fabricCream);
    props.table(k, piers.child(0, 0.65, -0.1), 1.6, 0.6, 0.7);
    props.crate(k, piers.child(-0.7, 0.65, 1.2, 0.2), 0.5, 0.4, 0.45);
    props.barrel(k, piers.child(0.8, 0.65, 1.2), 0.24, 0.6);
  }
  // 中央木桥 + 栏杆
  for (let i = 0; i < 14; i++) f.box(i % 2 ? m.wood : m.woodDark, 0.38, 0.07, 1.4, -2.7 + i * 0.415, 0.78, 0.1, 0.01, 0, 0, 0);
  for (const dz of [-0.55, 0.75]) props.railing(k, f.child(-2.8, 0.82, dz, 0), 5.6, 0.9, m.woodDark);
  props.crate(k, f.child(-0.7, 0.85, 0.1, 0.1), 0.55, 0.45, 0.5);
  props.crate(k, f.child(0.7, 0.85, 0.1, -0.2), 0.55, 0.45, 0.5);
  // 天平
  const sc = f.child(0, 0.85, 0.8);
  sc.cyl(m.brass, 0.04, 0.06, 0.6, 0, 0, 0, 10);
  sc.box(m.brass, 0.9, 0.035, 0.035, 0, 0.6, 0, 0.008);
  for (const sx of [-1, 1]) {
    sc.strut(m.steel, [sx * 0.42, 0.6, 0], [sx * 0.42, 0.28, 0], 0.006, 4);
    sc.cyl(m.brass, 0.14, 0.14, 0.02, sx * 0.42, 0.27, 0, 16);
  }
  [-1.6, 0, 1.6].forEach((x) => addBeacon(ctx, ctx.glow, x, 2.8 + (x === 0 ? 0.4 : 0), -0.1, 0.17));
  placePerson(ctx, { shirt: 0xb99b7c, hair: 0x2b1d16, pose: "talk" }, -1.8, 0.65, 0.2, 0.9);
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x555555, pose: "listen" }, 1.8, 0.65, 0.2, -0.9);
  props.lampPost(k, f.child(-5.3, 0, 2.2));
  props.lampPost(k, f.child(5.3, 0, 2.2));
  finishStage(s, "scene-exchange-harbor");
};

export const UNIT02_SCENES: Record<string, SceneModule> = {
  timeline: timelineScene,
  "route-evidence": routeEvidenceScene,
  perseverance: perseveranceScene,
  legacy: legacyScene,
  spotlight: spotlightScene,
  humanitarian: humanitarianScene,
  "lasting-service": lastingServiceScene,
  "community-witness": communityWitnessScene,
  fleet: fleetScene,
  "peace-contact": peaceContactScene,
  "chart-room": chartRoomScene,
  "exchange-harbor": exchangeHarborScene,
};
