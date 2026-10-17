import * as THREE from "three";
import * as props from "../sceneProps";
import { SCENE_SCALE, STAGE_Y, addBeacon, addGlowCard, createStage, finishStage, makeSignTexture, placePerson, worldXZ, type SceneModule, type Stage } from "./context";

/**
 * 单元 1「信号花园」Section B / C 的八个段落场景：
 * 通知过载 · 学习桌 · 过滤器 · 离线休息 · 乡村诊所 · 远程问诊 · 社区关怀 · 社区网络。
 * 局部坐标为米制，+z 朝向观众（见 context.ts）。
 */

const emissive = (color: number, intensity = 0.8): THREE.MeshStandardMaterial => {
  const m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, roughness: 0.35, metalness: 0.1 });
  m.fog = false;
  return m;
};
const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterial["userData"] = {}): THREE.MeshStandardMaterial => {
  const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
  Object.assign(m.userData, extra);
  m.fog = false;
  return m;
};

/** 手机形立牌：底座 + 立柱 + 圆角机身 + 亮屏 + 消息条目 */
function phoneStele(s: Stage, lx: number, lz: number, w: number, h: number, yaw: number, seed: number): { badgeAt: [number, number, number] } {
  const { k, f } = s;
  const c = f.child(lx, 0, lz, yaw);
  c.box(k.m.slate, 0.8, 0.12, 0.55, 0, 0, 0, 0.03);
  c.box(k.m.darkSteel, 0.12, h * 0.45, 0.1, 0, 0.12, 0, 0.01);
  const y0 = 0.12 + h * 0.45;
  const bodyH = h * 0.62;
  c.box(k.p.plasticDark, w, bodyH, 0.1, 0, y0, 0, 0.08);
  c.put(new THREE.PlaneGeometry(w - 0.12, bodyH - 0.14), k.p.screenOn, 0, y0 + bodyH / 2, 0.052);
  c.box(k.p.plasticDark, 0.22, 0.03, 0.012, 0, y0 + bodyH - 0.07, 0.055, 0.005);
  for (let r = 0; r < 4; r++) {
    const ww = (w - 0.42) * (0.55 + 0.4 * Math.abs(Math.sin(seed + r * 1.7)));
    const yy = y0 + bodyH - 0.3 - r * (bodyH - 0.5) / 4;
    c.cyl(k.m.paper, 0.06, 0.06, 0.012, -w / 2 + 0.17, yy, 0.056, 14);
    c.box(k.m.paper, ww, 0.045, 0.012, -w / 2 + 0.3 + ww / 2, yy + 0.02, 0.056, 0.008);
    c.box(k.m.stoneWarm, ww * 0.6, 0.03, 0.012, -w / 2 + 0.3 + ww * 0.3, yy - 0.04, 0.056, 0.006);
  }
  return { badgeAt: [lx + w * 0.42, y0 + bodyH - 0.1, lz + 0.1] };
}

// ───────────────────────── Section B ─────────────────────────

/** 通知过载：三块巨大的手机立牌包围一个低头看手机的人，通知气泡漂浮 */
export const notificationScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const badge = emissive(0xe0555d, 1.0);
  const defs = [
    { x: -2.7, z: -0.8, w: 1.0, h: 2.1, yaw: -0.3 },
    { x: 0, z: -1.7, w: 1.3, h: 2.6, yaw: 0 },
    { x: 2.7, z: -0.8, w: 1.05, h: 2.2, yaw: 0.3 },
  ];
  defs.forEach((d, i) => {
    const { badgeAt } = phoneStele(s, d.x, d.z, d.w, d.h, d.yaw, i * 2.3);
    addBeacon(ctx, badge, badgeAt[0], badgeAt[1], badgeAt[2], 0.1);
  });
  // 漂浮的通知气泡（沿用 beacon 浮动）
  for (const [x, y, z, w, h] of [[-1.3, 2.5, 0.4, 0.55, 0.22], [1.2, 2.1, 0.2, 0.5, 0.22], [0.1, 3.0, -0.2, 0.62, 0.24], [-2.0, 1.9, 1.0, 0.45, 0.2], [2.1, 2.7, 0.9, 0.48, 0.2]] as const) {
    addGlowCard(ctx, ctx.edge, x, y, z, w, h);
  }
  // 中间的人
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x2b1d16, scarf: 0xd98b4a, pose: "phone", lean: 0.04 }, 0, 0, 1.3, 0);
  // 座椅 / 花坛 / 路灯 / 石板路
  props.bench(k, f.child(-3.9, 0, 1.6, -0.6), 1.7);
  props.planter(k, f.child(3.8, 0, 1.6), 0.55, 3);
  props.planter(k, f.child(-4.1, 0, -1.2), 0.5, 9);
  props.lampPost(k, f.child(4.3, 0, -1.6));
  props.lampPost(k, f.child(-4.6, 0, 0.6));
  for (let i = 0; i < 5; i++) f.box(i % 2 ? k.m.paveA : k.m.paveB, 0.9, 0.05, 0.6, 0, 0, 2.2 + i * 0.68, 0.02);
  finishStage(s, "scene-notification");
};

/** 学习桌：固定时段看消息——窗外的提醒被玻璃隔开，书桌上有笔记、台灯与计时钟 */
export const studyDeskScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  // 地毯
  f.cyl(p.fabricGrey, 3.1, 3.1, 0.03, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 2.7, 2.7, 0.035, 0, 0, 0, 40);
  // 书桌：桌面朝向观众，人坐在桌后
  props.desk(k, f.child(0, 0, 0.4, Math.PI), 1.7, 0.8);
  const chairF = f.child(0, 0, -0.55, 0);
  props.chair(k, chairF, m.wood);
  placePerson(ctx, { shirt: 0x7d91a4, hair: 0x2b1d16, glasses: true, seated: true, pose: "write", lean: 0.14 }, 0, 0.45, -0.55, 0);
  // 桌面物件
  props.laptop(k, f.child(-0.4, 0.75, 0.45, Math.PI));
  props.openBook(k, f.child(0.25, 0.75, 0.45, 0.2));
  props.cup(k, f.child(0.65, 0.75, 0.2));
  props.phone(k, f.child(0.72, 0.75, 0.6, 3.14), k.p.screenOff);
  // 台灯：底座 + 双节臂 + 灯罩 + 发光球
  const lamp = f.child(-0.75, 0.75, 0.15);
  lamp.cyl(m.darkSteel, 0.08, 0.1, 0.03, 0, 0, 0, 16);
  lamp.strut(m.darkSteel, [0, 0.03, 0], [0.12, 0.38, 0], 0.012, 6);
  lamp.strut(m.darkSteel, [0.12, 0.38, 0], [0.04, 0.55, 0.05], 0.012, 6);
  lamp.put(new THREE.ConeGeometry(0.1, 0.12, 14, 1, true), m.brass, 0.04, 0.56, 0.05, Math.PI);
  addBeacon(ctx, ctx.glow, ...worldLocal(-0.75 + 0.04, 0.75 + 0.5, 0.2), 0.05);
  // 背板：时间表（三个固定查看时段）
  const bf = f.child(0, 0, -2.0, 0);
  props.board(k, bf, 3.0, 1.3, p.boardWhite);
  for (const [i, tone] of [[0, m.copper], [1, m.brass], [2, m.stone]] as const) {
    bf.box(tone, 0.7, 0.55, 0.012, -0.9 + i * 0.9, 0.5, 0.065, 0.01);
    bf.box(m.slate, 0.5, 0.04, 0.012, -0.9 + i * 0.9, 0.35, 0.07, 0.004);
  }
  // 左侧隔断：玻璃 + 被挡在外面的提醒（灰色气泡）
  const gl = f.child(-3.2, 0, 0, 0.45);
  gl.box(m.steel, 0.06, 0.06, 2.2, 0, 0, 0, 0.01);
  gl.box(m.steel, 0.06, 0.06, 2.2, 0, 2.2, 0, 0.01);
  for (const dz of [-1.07, 0, 1.07]) gl.box(m.steel, 0.06, 2.26, 0.06, 0, 0, dz, 0.01);
  gl.put(new THREE.PlaneGeometry(2.1, 2.1), m.glass, 0.0, 1.1, 0, 0, Math.PI / 2);
  for (const [i, y] of [[0, 0.9], [1, 1.5], [2, 2.0]] as const) {
    gl.box(m.stoneDark, 0.05, 0.22, 0.55, -0.12, y, -0.55 + i * 0.5, 0.03);
  }  // 右侧计时钟：立柱 + 钟面 + 铜框 + 指针
  const cf = f.child(3.2, 0, 0.2, -0.3);
  cf.cyl(m.darkSteel, 0.05, 0.07, 1.9, 0, 0, 0, 10);
  cf.cyl(m.slate, 0.2, 0.25, 0.1, 0, 0, 0, 16);
  cf.put(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 36), p.ceramic, 0, 2.1, 0.0, Math.PI / 2);
  cf.put(new THREE.TorusGeometry(0.52, 0.045, 10, 40), m.brass, 0, 2.1, 0.04);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    cf.box(m.slate, 0.025, i % 3 === 0 ? 0.1 : 0.06, 0.012, Math.sin(a) * 0.4, 2.1 + Math.cos(a) * 0.4 - 0.04, 0.05, 0.003, 0, 0, -a);
  }
  cf.box(m.darkSteel, 0.03, 0.3, 0.012, 0, 2.1, 0.06, 0.004);
  cf.box(m.darkSteel, 0.025, 0.2, 0.012, 0.08, 2.1, 0.065, 0.004, 0, 0, -1.2);
  addBeacon(ctx, ctx.glow, ...worldLocalYaw(3.2, 2.1, 0.4, -0.3), 0.05);
  // 植物与路灯
  props.planter(k, f.child(-2.1, 0, 2.2), 0.5, 4);
  props.planter(k, f.child(2.3, 0, 2.2), 0.5, 7);
  finishStage(s, "scene-study-desk");
};

/** 过滤器：链接 / 密码 / 个人资料三条通道汇入盾牌门——每条通道先经过一块屏幕检查 */
export const filterScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const risk = std(0xb5575c, 0.7);
  const safe = std(0x4a9a86, 0.7);
  // 三块检查屏（立牌）+ 立体图标
  const xs = [-2.9, 0, 2.9];
  xs.forEach((x, i) => {
    const c = f.child(x, 0, 1.2, 0);
    c.box(m.slate, 1.3, 0.14, 0.6, 0, 0, 0, 0.03);
    c.box(m.darkSteel, 0.12, 0.9, 0.1, 0, 0.14, 0, 0.01);
    c.box(p.plasticDark, 1.25, 1.55, 0.1, 0, 1.0, 0, 0.07);
    c.put(new THREE.PlaneGeometry(1.1, 1.4), i === 1 ? p.screenOn : emissive(0x5aa6c8, 0.45), 0, 1.78, 0.052);
    // 图标浮雕
    const icon = c.child(0, 1.7, 0.06);
    if (i === 0) {
      // 链接：两个交扣的圆环
      icon.put(new THREE.TorusGeometry(0.2, 0.05, 10, 24), m.brass, -0.14, 0, 0.02, 0, 0, -0.6);
      icon.put(new THREE.TorusGeometry(0.2, 0.05, 10, 24), m.brass, 0.14, 0, 0.02, 0, 0, 0.6);
    } else if (i === 1) {
      // 密码：锁体 + 锁梁
      icon.box(m.brass, 0.46, 0.34, 0.1, 0, -0.2, 0, 0.03);
      icon.put(new THREE.TorusGeometry(0.17, 0.045, 8, 20, Math.PI), m.brass, 0, 0.12, 0.04);
      icon.cyl(m.darkSteel, 0.03, 0.03, 0.12, 0, -0.14, 0.055, 8);
    } else {
      // 资料：头像
      icon.ball(m.stoneWarm, 0.17, 0, 0.15, 0.04);
      icon.put(new THREE.SphereGeometry(0.3, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), m.stoneWarm, 0, -0.32, 0.04, 0, 0, 0, 1, 0.85, 0.5);
    }
    // 通道：石板条，风险通道偏红，中间偏绿
    for (let j = 0; j < 4; j++) {
      const z = 0.4 - j * 0.65;
      const lx = x * (1 - (0.85 * (j + 1)) / 4);
      f.box(m.paveA, 0.9, 0.05, 0.6, lx, 0, z, 0.02, 0, -x * 0.04);
      f.box(i === 1 ? safe : risk, 0.9, 0.012, 0.08, lx, 0.05, z + 0.25, 0.004, 0, -x * 0.04);
    }
  });
  // 盾牌门：双柱 + 横梁 + 立体盾牌
  const g = f.child(0, 0, -2.5, 0);
  for (const sx of [-1, 1]) {
    g.box(m.stoneDark, 0.7, 0.3, 0.7, sx * 1.6, 0, 0, 0.04);
    g.cyl(m.stone, 0.26, 0.3, 3.0, sx * 1.6, 0.3, 0, 18);
    g.box(m.stoneDark, 0.7, 0.18, 0.7, sx * 1.6, 3.3, 0, 0.03);
  }
  g.box(m.stone, 4.0, 0.4, 0.7, 0, 3.4, 0, 0.04);
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.75);
  shape.lineTo(0.68, 0.5);
  shape.lineTo(0.58, -0.1);
  shape.quadraticCurveTo(0.4, -0.5, 0, -0.78);
  shape.quadraticCurveTo(-0.4, -0.5, -0.58, -0.1);
  shape.lineTo(-0.68, 0.5);
  shape.closePath();
  const shieldGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.05, bevelThickness: 0.04 });
  const shield = new THREE.Mesh(shieldGeo, ctx.edge);
  const [sx, sz] = worldXZ(0, -2.5 + 0.1);
  shield.scale.setScalar(SCENE_SCALE * 1.3);
  shield.position.set(sx, STAGE_Y + 2.2 * SCENE_SCALE, sz);
  shield.rotation.y = Math.PI;
  shield.userData.isLandscapeBeacon = true;
  ctx.root.add(shield);
  g.put(shieldGeo, k.m.steel, 0, 1.2, -0.12, 0, 0, 0, 1.0, 1.0, 0.5);
  // 一个正在阅读的人
  placePerson(ctx, { shirt: 0x6a8aa8, hair: 0x4a3a2a, pose: "read", backpack: 0x2f5d8a }, -1.3, 0, 2.4, -0.2);
  props.lampPost(k, f.child(4.5, 0, -0.5));
  props.lampPost(k, f.child(-4.5, 0, -0.5));
  props.planter(k, f.child(4.0, 0, 2.4), 0.5, 2);
  props.planter(k, f.child(-4.2, 0, 3.0), 0.5, 5);
  finishStage(s, "scene-filter");
};

/** 离线休息：凉亭下两位朋友并肩而坐、手机收进篮子，茶具、绿植与灯笼 */
export const offlineRestScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.4, 3.5, 0.08, 0, 0, 0, 40);
  f.cyl(p.fabricCream, 1.9, 1.9, 0.09, 0, 0, 0, 36);
  props.gazebo(k, f.child(0, 0, -0.3), 2.0, m.terracottaRoof);
  // 长椅（面向观众）+ 两人
  props.bench(k, f.child(0, 0, -0.9, Math.PI), 2.0);
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, hairStyle: "long", seated: true, pose: "listen", lean: -0.04 }, 0.45, 0.46, -0.65, 0);
  placePerson(ctx, { shirt: 0x78968a, hair: 0x443a34, seated: true, pose: "talk", lean: 0.03 }, -0.45, 0.46, -0.65, 0);
  // 小茶几与茶具
  props.roundTable(k, f.child(0, 0, 0.5), 0.45, 0.5);
  props.cup(k, f.child(-0.15, 0.5, 0.45));
  props.cup(k, f.child(0.15, 0.5, 0.55));
  f.cyl(m.copper, 0.1, 0.12, 0.2, 0, 0.5, 0.5, 14);
  // 篮子里的手机（屏幕朝下）
  const basket = f.child(2.7, 0, 0.9);
  basket.cyl(m.wood, 0.34, 0.26, 0.4, 0, 0, 0, 18);
  basket.put(new THREE.TorusGeometry(0.34, 0.025, 6, 22), m.woodDark, 0, 0.4, 0, Math.PI / 2);
  for (let i = 0; i < 3; i++) props.phone(k, basket.child((i - 1) * 0.1, 0.34, (i % 2) * 0.05 - 0.02, i * 0.7), k.p.screenOff);
  props.planter(k, f.child(-2.8, 0, 0.9), 0.55, 11);
  props.planter(k, f.child(-3.0, 0, -1.4), 0.5, 13);
  props.planter(k, f.child(3.0, 0, -1.4), 0.5, 17);
  props.lampPost(k, f.child(-3.7, 0, 1.8));
  // 静心光球 + 光环
  addBeacon(ctx, ctx.glow, ...worldLocal(0, 3.6, -0.3), 0.2);
  ctx.ring(1.2, STAGE_Y + 5.0, Math.PI / 2).position.set(...worldPos(0, 3.5, -0.3));
  ctx.ring(0.9, STAGE_Y + 5.0, Math.PI / 2).position.set(...worldPos(0, 3.7, -0.3));
  finishStage(s, "scene-offline-rest");
};

// ───────────────────────── Section C ─────────────────────────

/** 乡村诊所：山墙瓦顶的小楼、红十字、坡道与候诊椅，右侧远程会诊亭与天线 */
export const clinicScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const cross = emissive(0xe0555d, 0.7);
  // 主楼
  props.house(k, f.child(0, 0, -1.4), 4.8, 3.0, 2.8, m.terracottaRoof, m.paper);
  // 红十字（山墙前）
  const crossF = f.child(0, 3.4, -0.0);
  crossF.box(cross, 0.2, 0.7, 0.05, 0, 0, 0, 0.02);
  crossF.box(cross, 0.7, 0.2, 0.05, 0, 0.25, 0, 0.02);
  // 门廊：两柱 + 雨棚
  for (const sx of [-1, 1]) f.cyl(m.woodDark, 0.07, 0.09, 2.2, sx * 0.85, 0.2, 0.55, 10);
  f.box(m.woodDark, 2.1, 0.12, 0.8, 0, 2.4, 0.2, 0.02, -0.08);
  // 坡道 + 扶手
  f.box(m.stoneWarm, 1.6, 0.1, 2.4, 0, 0, 1.6, 0.02, -0.07);
  for (const sx of [-1, 1]) props.railing(k, f.child(sx * 0.85, 0.25, 1.0, Math.PI / 2), 2.0, 0.85);
  // 候诊椅
  props.bench(k, f.child(-2.4, 0, 0.7, 0), 1.6);
  props.bench(k, f.child(2.0, 0, 2.6, 0.2), 1.4);
  // 人物：医生在门口，病人坐着等候
  placePerson(ctx, { shirt: 0xf1f4f5, trousers: 0x59606a, hair: 0x2b1d16, glasses: true, pose: "talk" }, -0.5, 0.0, 2.4, 0.3);
  placePerson(ctx, { shirt: 0x9fb5c1, hair: 0x6a6a6a, seated: true, pose: "listen" }, -2.4, 0.46, 0.55, 0);
  // 远程会诊亭 + 通讯天线
  const kiosk = f.child(3.4, 0, -0.2, -0.35);
  kiosk.box(m.slate, 1.2, 0.14, 0.7, 0, 0, 0, 0.03);
  kiosk.box(p.plasticDark, 1.1, 1.5, 0.12, 0, 0.14, 0, 0.06);
  kiosk.put(new THREE.PlaneGeometry(0.96, 1.3), p.screenOn, 0, 0.86, 0.064);
  for (const [x, tone] of [[-0.24, m.stoneWarm], [0.24, m.copper]] as const) {
    kiosk.ball(tone, 0.1, x, 1.0, 0.07);
    kiosk.put(new THREE.SphereGeometry(0.17, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), tone, x, 0.7, 0.07, 0, 0, 0, 1, 0.8, 0.4);
  }
  const mast = f.child(-3.4, 0, -1.8);
  mast.cyl(m.steel, 0.05, 0.08, 4.2, 0, 0, 0, 10);
  mast.put(new THREE.SphereGeometry(0.4, 22, 10, 0, Math.PI * 2, 0, Math.PI / 3), p.ceramic, 0.25, 3.9, 0.15, -1.2);
  mast.strut(m.steel, [0, 3.9, 0], [0.5, 4.1, 0.3], 0.02, 5);
  addBeacon(ctx, ctx.edge, ...worldLocal(-3.4, 4.5, -1.8), 0.12);
  props.planter(k, f.child(-1.6, 0, 3.0), 0.5, 21);
  props.lampPost(k, f.child(1.8, 0, 0.4), 3.0);
  finishStage(s, "scene-clinic");
};

/** 远程问诊：墙面大屏里的两位医生与坐在长椅上的村民，隐私锁立牌，两端信号节点 */
export const telemedicineScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(p.fabricGrey, 3.4, 3.4, 0.03, 0, 0, 0, 40);
  // 大屏墙：边框 + 屏幕 + 底座 + 两位医生的头像剪影
  const wall = f.child(0, 0, -2.0);
  wall.box(m.slate, 4.6, 0.3, 0.5, 0, 0, 0, 0.04);
  wall.box(p.plasticDark, 4.4, 2.5, 0.14, 0, 0.3, 0, 0.08);
  wall.put(new THREE.PlaneGeometry(4.2, 2.3), emissive(0x2a5f77, 0.55), 0, 1.45, 0.075);
  for (const [x, tone] of [[-0.95, m.stoneWarm], [0.95, m.copper]] as const) {
    wall.ball(tone, 0.28, x, 1.85, 0.09);
    wall.put(new THREE.SphereGeometry(0.62, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), p.fabricCream, x, 0.95, 0.09, 0, 0, 0, 1, 0.9, 0.3);
  }
  wall.box(p.fabricCream, 0.12, 0.7, 0.02, 0, 1.2, 0.09, 0.01);
  wall.box(p.fabricCream, 0.7, 0.12, 0.02, 0, 1.49, 0.09, 0.01);
  // 村民：坐在长椅上面向大屏（背朝观众，略侧）
  props.bench(k, f.child(-0.6, 0, 1.1, Math.PI + 0.25), 2.0);
  placePerson(ctx, { shirt: 0x9a8f6c, hair: 0x555555, scarf: 0xb04a40, seated: true, pose: "listen", lean: 0.05 }, -0.6, 0.46, 0.95, Math.PI + 0.25);
  // 床边小桌：药箱 + 杯
  props.roundTable(k, f.child(2.0, 0, 0.6), 0.4, 0.55);
  props.suitcase(k, f.child(2.0, 0.55, 0.6, 0.4), 0.3, 0.2, 0.16, k.p.fabricGreen);
  // 隐私锁立牌
  const lockStele = f.child(3.5, 0, 0.0, -0.4);
  lockStele.box(m.slate, 0.8, 0.12, 0.5, 0, 0, 0, 0.03);
  lockStele.box(p.plasticDark, 0.62, 1.0, 0.1, 0, 0.12, 0, 0.06);
  lockStele.put(new THREE.PlaneGeometry(0.5, 0.88), p.screenOn, 0, 0.62, 0.052);
  lockStele.box(m.brass, 0.3, 0.22, 0.08, 0, 0.5, 0.07, 0.02);
  lockStele.put(new THREE.TorusGeometry(0.1, 0.03, 8, 16, Math.PI), m.brass, 0, 0.74, 0.07);
  // 两端信号节点：灯塔式立柱 + 信标，上空光缆
  for (const sx of [-1, 1]) {
    const n = f.child(sx * 4.2, 0, 0.2);
    n.cyl(m.stoneDark, 0.3, 0.38, 0.4, 0, 0, 0, 14);
    n.cyl(m.steel, 0.06, 0.1, 2.3, 0, 0.4, 0, 10);
    addBeacon(ctx, ctx.edge, ...worldLocal(sx * 4.2, 3.0, 0.2), 0.3);
  }
  const cable = new THREE.CatmullRomCurve3([-4.2, -2.2, 0, 2.2, 4.2].map((x, i) => new THREE.Vector3(...worldPos(x, 2.9 + (i % 2 ? 0.5 : -0.1), 0.2))));
  const tube = new THREE.Mesh(new THREE.TubeGeometry(cable, 48, 0.05, 6, false), ctx.edge);
  tube.userData.isLandscapeRoute = true;
  tube.castShadow = true;
  ctx.root.add(tube);
  props.lampPost(k, f.child(-3.9, 0, 1.8), 3.0);
  props.planter(k, f.child(3.9, 0, 2.0), 0.5, 8);
  finishStage(s, "scene-telemedicine");
};

/** 社区关怀：村中四幢小屋围向中央社区站，志愿者与医生在门前交谈 */
export const communityScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  f.cyl(m.stoneWarm, 3.7, 3.8, 0.06, 0, 0, 0, 40);
  // 四幢农舍（高低错落，屋顶朝向各异）
  const roofs = [m.terracottaRoof, m.slate, m.terracottaRoof, m.slate];
  [[-3.4, -2.3, 2.0, 2.3], [-1.5, -2.9, 2.2, 3.0], [1.7, -2.9, 2.2, 2.7], [3.5, -2.2, 2.0, 3.4]].forEach(([x, z, w, h], i) => {
    props.house(k, f.child(x, 0, z, (i - 1.5) * -0.18), w, h, 1.8, roofs[i], i % 2 ? p.fabricCream : m.paper);
  });
  // 社区站（中央，较大，带红十字）
  const hall = f.child(0, 0, -0.8);
  props.house(k, hall, 3.2, 3.2, 2.4, m.terracottaRoof, m.paper);
  const cross = emissive(0xe0555d, 0.7);
  hall.box(cross, 0.18, 0.62, 0.05, 0, 3.75, 1.35, 0.02);
  hall.box(cross, 0.62, 0.18, 0.05, 0, 3.97, 1.35, 0.02);
  // 门前：两位照护者面对面交谈
  placePerson(ctx, { shirt: 0x79aaa5, hair: 0x2b1d16, pose: "talk", backpack: 0xc79a3a }, -0.75, 0, 1.9, 0.5);
  placePerson(ctx, { shirt: 0xeef1f2, trousers: 0x59606a, hair: 0x3a2a1c, glasses: true, pose: "listen" }, 0.75, 0, 1.9, -0.5);
  // 登记台 + 物资桌
  const stand = f.child(3.2, 0, 1.6, -0.3);
  stand.box(m.slate, 0.7, 0.1, 0.5, 0, 0, 0, 0.02);
  stand.box(m.darkSteel, 0.08, 0.95, 0.08, 0, 0.1, 0, 0.01);
  stand.box(p.plasticDark, 0.8, 0.55, 0.08, 0, 1.0, 0, 0.05, -0.12);
  stand.put(new THREE.PlaneGeometry(0.7, 0.45), p.screenOn, 0, 1.28, 0.042, -0.12);
  props.table(k, f.child(-3.2, 0, 1.6, 0.3), 1.5, 0.7, 0.75);
  props.crate(k, f.child(-3.4, 0.75, 1.6), 0.4, 0.3, 0.3);
  props.bookStack(k, f.child(-2.9, 0.75, 1.6), 3, 5);
  // 通往中央的石板小径
  for (let i = 0; i < 4; i++) {
    f.box(m.paveA, 0.7, 0.04, 0.5, -2.3 + i * 0.55, 0.0, -1.2 + i * 0.5, 0.02, 0, 0.5);
    f.box(m.paveB, 0.7, 0.04, 0.5, 2.3 - i * 0.55, 0.0, -1.2 + i * 0.5, 0.02, 0, -0.5);
    f.box(m.paveA, 0.9, 0.04, 0.55, 0, 0.0, 0.8 + i * 0.6, 0.02);
  }
  addBeacon(ctx, ctx.glow, ...worldLocal(0, 4.5, -0.8 + 0.8), 0.22);
  props.lampPost(k, f.child(-4.4, 0, 0.4), 3.0);
  props.lampPost(k, f.child(4.4, 0, 0.4), 3.0);
  const light = new THREE.PointLight(0xffd5a0, 0.72, 11, 2);
  light.position.set(...worldPos(0, 3.5, 1.6));
  ctx.root.add(light);
  finishStage(s, "scene-community");
};

/** 社区网络：两座社区站以木桥相连，四位参与者在桥上交流，三枚网络节点与光缆 */
export const communityNetworkScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m } = k;
  f.cyl(m.stoneWarm, 3.6, 3.7, 0.06, 0, 0, 0, 40);
  // 桥：桥面板条 + 桥墩 + 栏杆
  const bridgeLen = 6.4;
  for (let i = 0; i < 20; i++) f.box(i % 2 ? m.wood : m.woodDark, 0.3, 0.07, 1.3, -bridgeLen / 2 + i * (bridgeLen / 19), 0.6, 0.2, 0.01);
  f.box(m.woodDark, bridgeLen, 0.14, 0.12, 0, 0.5, -0.4, 0.02);
  f.box(m.woodDark, bridgeLen, 0.14, 0.12, 0, 0.5, 0.8, 0.02);
  for (const x of [-2.4, 0, 2.4]) f.box(m.stoneDark, 0.5, 0.6, 1.6, x, 0, 0.2, 0.03);
  for (const z of [-0.4, 0.8]) props.railing(k, f.child(-bridgeLen / 2, 0.68, z, 0), bridgeLen, 0.95, m.woodDark);
  // 引桥（坡道）+ 扶手
  f.box(m.stoneWarm, 1.5, 0.08, 2.6, 0, 0.1, 2.0, 0.02, -0.19);
  // 两端的社区站
  for (const sx of [-1, 1]) {
    props.house(k, f.child(sx * 4.0, 0, -0.6, sx * 0.18), 2.3, 2.9, 2.0, sx < 0 ? m.terracottaRoof : m.slate, k.m.paper);
  }
  const cross = emissive(0xe0555d, 0.7);
  f.box(cross, 0.16, 0.56, 0.05, -4.0, 3.55, 0.45, 0.02);
  f.box(cross, 0.56, 0.16, 0.05, -4.0, 3.75, 0.45, 0.02);
  // 桥上四位参与者
  const mood: Array<{ shirt: number; hair: number; pose: "talk" | "listen" | "point"; yaw: number; x: number }> = [
    { shirt: 0x79aaa5, hair: 0x2b1d16, pose: "talk", yaw: 0.45, x: -2.2 },
    { shirt: 0x9fb5c1, hair: 0x6a6a6a, pose: "listen", yaw: -0.2, x: -0.7 },
    { shirt: 0xb99b7c, hair: 0x3a2a1c, pose: "point", yaw: 0.2, x: 0.7 },
    { shirt: 0x829fc0, hair: 0x2b1d16, pose: "listen", yaw: -0.45, x: 2.2 },
  ];
  for (const a of mood) placePerson(ctx, { shirt: a.shirt, hair: a.hair, pose: a.pose, backpack: a.x < 0 ? 0xc79a3a : undefined }, a.x, 0.67, 0.2, a.yaw);
  // 中央设备：平板支架
  const dev = f.child(0, 0.67, 1.1, 0);
  dev.box(m.darkSteel, 0.06, 0.8, 0.06, 0, 0, 0, 0.01);
  dev.box(k.p.plasticDark, 0.7, 0.5, 0.05, 0, 0.8, 0, 0.03, -0.25);
  dev.put(new THREE.PlaneGeometry(0.6, 0.42), k.p.screenOn, 0, 1.05, 0.028, -0.25);
  // 三枚网络节点 + 光缆
  const nodes: Array<[number, number, number]> = [[-4, 4.3, -0.6], [0, 3.9, -0.6], [4, 4.3, -0.6]];
  for (const [x, y, z] of nodes) {
    f.cyl(m.steel, 0.04, 0.06, y - 0.4, x, 0, z - 0.9, 8);
    addBeacon(ctx, ctx.glow, ...worldLocal(x, y, z - 0.9), 0.26);
  }
  const arcs = new THREE.CatmullRomCurve3(nodes.map(([x, y, z], i) => new THREE.Vector3(...worldPos(x, y - (i === 1 ? 0 : 0.1), z - 0.9))));
  const arc = new THREE.Mesh(new THREE.TubeGeometry(arcs, 40, 0.05, 6, false), ctx.edge);
  arc.userData.isLandscapeRoute = true;
  ctx.root.add(arc);
  ctx.ring(5.35 * 0 + 5.2, STAGE_Y + 0.2, Math.PI / 2);
  props.lampPost(k, f.child(-4.8, 0, 1.8), 3.0);
  props.lampPost(k, f.child(4.8, 0, 1.8), 3.0);
  const networkLight = new THREE.PointLight(0xa9e6ff, 0.9, 16, 2);
  networkLight.position.set(...worldPos(0, 5, 0.6));
  ctx.root.add(networkLight);
  finishStage(s, "scene-community-network");
};

// ───────────────────────── Section A：选择沟通方式 ─────────────────────────

/** 沟通方式观测台：快速消息 / 视频通话 / 面对面三个站台，中央罗盘指向各自路线，后方是"按目的选择"招牌 */
export const focusScene: SceneModule = (ctx) => {
  const s = createStage(ctx);
  const { k, f } = s;
  const { m, p } = k;
  const routeTones = [std(0x718d99, 0.7), std(0x6f927c, 0.7), std(0xb98b65, 0.7)];

  // 中央罗盘地徽 + 三条通往站台的路线
  f.cyl(m.stoneWarm, 1.5, 1.55, 0.05, 0, 0, 0.6, 40);
  f.put(new THREE.TorusGeometry(1.4, 0.03, 6, 48), m.brass, 0, 0.06, 0.6, Math.PI / 2);
  for (let i = 0; i < 8; i++) f.box(i % 2 ? m.slate : m.brass, 0.07, 0.012, i % 2 ? 1.0 : 1.35, 0, 0.05, 0.6, 0.003, 0, (i / 8) * Math.PI);
  const stations: Array<[number, number]> = [[-3.4, 0.4], [0, -1.9], [3.4, 0.4]];
  stations.forEach(([sx, sz], i) => {
    const dx = sx - 0;
    const dz = sz - 0.6;
    const len = Math.hypot(dx, dz) - 1.8;
    const ang = Math.atan2(dx, dz);
    const mid = 0.9 + len / 2;
    for (let j = 0; j < Math.ceil(len / 0.55); j++) {
      const t = 1.6 + j * 0.55;
      f.box(m.paveA, 0.55, 0.045, 0.42, Math.sin(ang) * t, 0, 0.6 + Math.cos(ang) * t, 0.015, 0, ang);
    }
    f.box(routeTones[i], 0.08, 0.012, len, Math.sin(ang) * mid * 1.0, 0.045, 0.6 + Math.cos(ang) * mid, 0.003, 0, ang);
  });
  // 中央罗盘指针（信标）
  const needle = new THREE.Mesh(new THREE.ConeGeometry(0.2 * SCENE_SCALE, 0.7 * SCENE_SCALE, 4), ctx.edge);
  const [nx, nz] = worldXZ(0, 0.6);
  needle.position.set(nx, STAGE_Y + 1.5 * SCENE_SCALE, nz);
  needle.rotation.x = Math.PI / 2;
  needle.userData.isLandscapeBeacon = true;
  ctx.root.add(needle);

  // 站台 1：快速消息——书桌 + 手机立牌 + 气泡
  props.table(k, f.child(-3.4, 0, 1.0, 0.3), 1.2, 0.6, 0.72);
  phoneStele(s, -3.4, -0.5, 1.0, 2.0, 0.35, 1.3);
  props.phone(k, f.child(-3.35, 0.72, 1.0, 0.3));
  addGlowCard(ctx, ctx.edge, -3.0, 2.3, -0.1, 0.5, 0.2);
  addGlowCard(ctx, ctx.glow, -3.9, 2.1, 0.1, 0.42, 0.18);

  // 站台 2：视频通话——立式显示器 + 摄像头 + 两个头像 + 桌
  const vf = f.child(0, 0, -1.9, 0);
  props.table(k, vf.child(0, 0, 0.5), 1.6, 0.7, 0.72);
  vf.box(m.slate, 2.3, 0.14, 0.5, 0, 0, -0.2, 0.03);
  vf.box(m.darkSteel, 0.1, 0.6, 0.1, 0, 0.14, -0.2, 0.01);
  vf.box(p.plasticDark, 2.2, 1.35, 0.1, 0, 0.74, -0.2, 0.07);
  vf.put(new THREE.PlaneGeometry(2.04, 1.19), emissive(0x2a5f77, 0.55), 0, 1.42, -0.145);
  vf.cyl(p.plasticDark, 0.04, 0.04, 0.05, 0, 2.09, -0.17, 12);
  for (const [x, tone] of [[-0.5, m.stoneWarm], [0.5, m.copper]] as const) {
    vf.ball(tone, 0.2, x, 1.62, -0.14);
    vf.put(new THREE.SphereGeometry(0.42, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), p.fabricCream, x, 1.05, -0.14, 0, 0, 0, 1, 0.9, 0.3);
  }
  props.laptop(k, vf.child(0.3, 0.72, 0.5, Math.PI));

  // 站台 3：面对面——圆桌 + 两把椅子 + 两位交谈者
  props.roundTable(k, f.child(3.4, 0, 0.4), 0.5, 0.72);
  props.cup(k, f.child(3.3, 0.72, 0.4));
  props.cup(k, f.child(3.55, 0.72, 0.45));
  props.chair(k, f.child(2.55, 0, 0.4, Math.PI / 2));
  props.chair(k, f.child(4.25, 0, 0.4, -Math.PI / 2));
  placePerson(ctx, { shirt: 0xc18168, hair: 0x2b1d16, hairStyle: "long", seated: true, pose: "talk", lean: 0.04 }, 2.55, 0.45, 0.4, -Math.PI / 2);
  placePerson(ctx, { shirt: 0x78968a, hair: 0x443a34, seated: true, pose: "listen", lean: 0.05 }, 4.25, 0.45, 0.4, Math.PI / 2);

  // 站台上方的信标
  for (const [x, z] of stations) addBeacon(ctx, ctx.edge, x, 3.3, z, 0.18);

  // 背板招牌：木框 + 两根立柱 + 画布文字
  const sign = f.child(0, 0, -3.4, 0);
  for (const sx of [-1, 1]) {
    sign.box(m.stoneDark, 0.5, 0.25, 0.5, sx * 3.0, 0, 0, 0.03);
    sign.cyl(m.woodDark, 0.12, 0.14, 3.6, sx * 3.0, 0.25, 0, 12);
  }
  sign.box(m.woodDark, 6.4, 0.2, 0.3, 0, 3.7, 0, 0.03);
  const tex = makeSignTexture([
    { text: "CHOOSE BY PURPOSE", y: 65, font: "bold 54px Arial, sans-serif" },
    { text: "QUICK MESSAGE", y: 145, font: "bold 34px Arial, sans-serif" },
    { text: "ONE CLUB · FOUR WEEKS · NOT A UNIVERSAL RULE", y: 265, font: "bold 25px Arial, sans-serif", color: "#d8c598" },
  ]);
  if (tex) {
    const [bx, bz] = worldXZ(0, -3.4 + 0.1);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(5.6 * SCENE_SCALE, 1.4 * SCENE_SCALE), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, toneMapped: false }));
    face.position.set(bx, STAGE_Y + 2.7 * SCENE_SCALE, bz);
    face.rotation.y = Math.PI;
    face.userData.isLandscapeStage = true;
    ctx.root.add(face);
  }
  sign.box(m.woodDark, 5.8, 1.5, 0.12, 0, 1.95, -0.02, 0.03);
  props.lampPost(k, f.child(-4.8, 0, 2.2));
  props.lampPost(k, f.child(4.8, 0, 2.2));
  props.planter(k, f.child(-1.8, 0, 2.4), 0.5, 31);
  props.planter(k, f.child(1.8, 0, 2.4), 0.5, 37);
  finishStage(s, "scene-focus");
};
/** 局部 (lx, ly, lz) → 世界 [x, y, z] */
function worldPos(lx: number, ly: number, lz: number): [number, number, number] {
  const [x, z] = worldXZ(lx, lz);
  return [x, STAGE_Y + ly * SCENE_SCALE, z];
}
/** addBeacon 的局部参数展开用：返回 [lx, ly, lz] 原样（命名占位，便于阅读） */
function worldLocal(lx: number, ly: number, lz: number): [number, number, number] {
  return [lx, ly, lz];
}
function worldLocalYaw(lx: number, ly: number, lz: number, _yaw: number): [number, number, number] {
  return [lx, ly, lz];
}

export const UNIT01_SCENES: Record<string, SceneModule> = {
  focus: focusScene,
  notification: notificationScene,
  "study-desk": studyDeskScene,
  filter: filterScene,
  "offline-rest": offlineRestScene,
  clinic: clinicScene,
  telemedicine: telemedicineScene,
  community: communityScene,
  "community-network": communityNetworkScene,
};

