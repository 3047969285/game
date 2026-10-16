import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

/** 单腿骨骼：髋关节 + 膝关节（用于屈膝步态 / IK） */
export interface LegRig {
  hip: THREE.Group;
  knee: THREE.Group;
}

/** 角色骨骼引用（供走路动画驱动） */
export interface AvatarRig {
  leftLeg: LegRig;
  rightLeg: LegRig;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  head: THREE.Group;
  /** 围巾尾端（行进时向后飘动，绕 X 轴正向旋转 = 向身后甩） */
  cape: THREE.Group;
  /** 面部（表情控制）：眼球整体缩放 Y 即为眨眼 */
  eyeL: THREE.Mesh;
  eyeR: THREE.Mesh;
  brow: THREE.Mesh;
  mouth: THREE.Mesh;
  /** 面部静止位置，表情在其基础上做偏移 */
  faceRest: { browY: number; mouthY: number };
  /** 服装材质（换装染色） */
  mats: {
    jacket: THREE.MeshStandardMaterial;
    trim: THREE.MeshStandardMaterial;
    cape: THREE.MeshStandardMaterial;
  };
}

const HEAD_CENTER_Y = 0.19;

type Mats = Record<
  "jacket" | "trousers" | "skin" | "leather" | "boot" | "sole" | "hair" | "trim" | "scarf" | "brass" | "eyeWhite" | "iris" | "lip",
  THREE.MeshStandardMaterial
>;

function shadowed<T extends THREE.Mesh>(mesh: T): T {
  mesh.castShadow = true;
  return mesh;
}

/** 上粗下细的圆台，顶面在 y=0，向下延伸 len（肢体 / 颈） */
function taper(rTop: number, rBottom: number, len: number, mat: THREE.Material, radial = 16): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, len, radial, 1), mat);
  mesh.position.y = -len / 2;
  return shadowed(mesh);
}

function ball(r: number, mat: THREE.Material, sx = 1, sy = 1, sz = 1, seg = 14): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg - 4)), mat);
  mesh.scale.set(sx, sy, sz);
  return shadowed(mesh);
}

function rbox(w: number, h: number, d: number, radius: number, mat: THREE.Material): THREE.Mesh {
  return shadowed(new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), mat));
}

function at<T extends THREE.Object3D>(obj: T, x: number, y: number, z: number): T {
  obj.position.set(x, y, z);
  return obj;
}

/** 腿：髋 group 含大腿，膝 group 含小腿 + 皮靴。髋在 y=0.91 时鞋底恰好落地。 */
function makeLeg(m: Mats): LegRig {
  const hip = new THREE.Group();
  hip.add(ball(0.112, m.trousers, 1, 1, 1, 14));
  hip.add(taper(0.112, 0.08, 0.42, m.trousers, 18));

  const knee = new THREE.Group();
  knee.position.y = -0.42;
  hip.add(knee);
  knee.add(ball(0.08, m.trousers, 1, 1, 1, 12));
  knee.add(taper(0.08, 0.064, 0.4, m.trousers, 16));

  // 靴筒 + 靴口翻边
  const shaft = taper(0.064, 0.058, 0.17, m.boot, 16);
  shaft.position.y = -0.255;
  knee.add(shaft);
  const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.066, 0.011, 8, 18), m.leather);
  cuff.rotation.x = Math.PI / 2;
  cuff.position.y = -0.17;
  knee.add(cuff);

  // 鞋面（横躺的胶囊压扁）+ 鞋底 + 鞋头
  const upper = shadowed(new THREE.Mesh(new THREE.CapsuleGeometry(0.056, 0.13, 5, 12), m.boot));
  upper.rotation.x = Math.PI / 2;
  upper.scale.set(1.08, 1, 0.86);
  upper.position.set(0, -0.43, 0.06);
  knee.add(upper);
  const sole = rbox(0.12, 0.032, 0.285, 0.014, m.sole);
  sole.position.set(0, -0.465, 0.07);
  knee.add(sole);

  return { hip, knee };
}

/** 手：手掌 + 微曲四指 + 拇指 */
function makeHand(m: Mats): THREE.Group {
  const hand = new THREE.Group();
  hand.add(at(rbox(0.064, 0.075, 0.032, 0.011, m.skin), 0, -0.04, 0));
  const fingers = rbox(0.06, 0.07, 0.026, 0.011, m.skin);
  fingers.position.set(0, -0.105, 0.012);
  fingers.rotation.x = -0.35;
  hand.add(fingers);
  const thumb = shadowed(new THREE.Mesh(new THREE.CapsuleGeometry(0.0125, 0.04, 4, 8), m.skin));
  thumb.position.set(0.034, -0.065, 0.014);
  thumb.rotation.set(-0.4, 0, -0.5);
  hand.add(thumb);
  return hand;
}

/** 手臂：肩 group（枢轴在肩）→ 上臂 → 肘（微曲）→ 前臂 + 袖口 + 手 */
function makeArm(m: Mats, side: 1 | -1): THREE.Group {
  const arm = new THREE.Group();
  arm.add(ball(0.066, m.jacket, 1, 1, 1, 12));
  arm.add(taper(0.06, 0.05, 0.28, m.jacket, 16));

  const elbow = new THREE.Group();
  elbow.position.y = -0.28;
  elbow.rotation.x = -0.22;
  arm.add(elbow);
  elbow.add(ball(0.05, m.jacket, 1, 1, 1, 12));
  elbow.add(taper(0.049, 0.039, 0.25, m.jacket, 14));
  const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.043, 0.035, 14), m.trim);
  cuff.position.y = -0.245;
  elbow.add(shadowed(cuff));
  const hand = makeHand(m);
  hand.position.y = -0.27;
  hand.rotation.z = side * 0.04;
  elbow.add(hand);
  return arm;
}

/** 提灯：黄铜顶盖 + 玻璃罩 + 底座 + 提手，挂在右手下方 */
function makeLantern(m: Mats): THREE.Group {
  const g = new THREE.Group();
  const glass = new THREE.MeshStandardMaterial({
    color: 0xffd98a,
    emissive: 0xffa72b,
    emissiveIntensity: 1.1,
    roughness: 0.2,
    transparent: true,
    opacity: 0.88,
  });
  g.add(shadowed(at(new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.042, 0.1, 10), glass), 0, 0, 0)));
  g.add(at(shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.052, 0.04, 10), m.brass)), 0, 0.07, 0));
  g.add(at(shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.016, 10), m.brass)), 0, -0.058, 0));
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.004, 6, 14, Math.PI), m.brass);
  handle.position.y = 0.09;
  g.add(handle);
  const flame = new THREE.PointLight(0xffb347, 1.2, 10);
  flame.position.set(0, 0, 0);
  g.add(flame);
  return g;
}

/** 探险者角色（第三人称、写实比例的骨骼化人形，约 1.8 米） */
export function createExplorerAvatar(): THREE.Group {
  const root = new THREE.Group();
  root.name = "Explorer";

  const std = (color: number, roughness: number, metalness = 0.02, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  const m: Mats = {
    jacket: std(0x3b4f68, 0.88, 0, { side: THREE.DoubleSide }),
    trousers: std(0x59554d, 0.9),
    skin: std(0xd9a07c, 0.56, 0, { emissive: 0x3a1608, emissiveIntensity: 0.18 }),
    leather: std(0x6b4630, 0.62, 0.04),
    boot: std(0x4d3626, 0.66, 0.04),
    sole: std(0x1f1b18, 0.9),
    hair: std(0x2b1d16, 0.72, 0.05),
    trim: std(0x5b8def, 0.5, 0.2, { emissive: 0x1b3a78, emissiveIntensity: 0.25 }),
    scarf: std(0x3b6bd6, 0.9, 0, { side: THREE.DoubleSide }),
    brass: std(0xb68a3c, 0.35, 0.8),
    eyeWhite: std(0xf1ece6, 0.25),
    iris: std(0x3a2a1f, 0.3),
    lip: std(0xb0625a, 0.5),
  };

  // 骨盆 + 腰带
  root.add(at(rbox(0.35, 0.2, 0.21, 0.06, m.trousers), 0, 0.97, 0));
  const belt = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.162, 0.162, 0.04, 22), m.leather));
  belt.scale.set(1.22, 1, 0.8);
  belt.position.y = 1.07;
  root.add(belt);
  root.add(at(rbox(0.04, 0.03, 0.012, 0.004, m.brass), 0, 1.07, 0.136));

  // 躯干：外套主体（胸廓）+ 下摆
  const chest = shadowed(new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.3, 8, 20), m.jacket));
  chest.scale.set(1.3, 1, 0.78);
  chest.position.y = 1.29;
  root.add(chest);
  const hem = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.168, 0.2, 0.23, 24, 1, true), m.jacket));
  hem.scale.set(1.2, 1, 0.8);
  hem.position.y = 0.97;
  root.add(hem);
  // 门襟拉链 + 胸前口袋
  root.add(at(rbox(0.014, 0.5, 0.012, 0.004, m.trim), 0, 1.2, 0.121));
  for (const s of [-1, 1]) {
    root.add(at(rbox(0.085, 0.075, 0.025, 0.01, m.jacket), s * 0.1, 1.2, 0.114));
  }
  // 肩部：斜方肌过渡
  for (const s of [-1, 1]) {
    root.add(at(ball(0.09, m.jacket, 1, 0.7, 1, 14), s * 0.14, 1.5, 0));
  }

  // 衣领 + 围巾
  const collar = shadowed(new THREE.Mesh(new THREE.TorusGeometry(0.083, 0.03, 10, 22), m.jacket));
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 1.52;
  collar.scale.set(1.08, 1.0, 1);
  root.add(collar);
  const scarfRing = shadowed(new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.034, 10, 22), m.scarf));
  scarfRing.rotation.x = Math.PI / 2;
  scarfRing.position.y = 1.545;
  root.add(scarfRing);
  root.add(at(ball(0.04, m.scarf, 1, 1.1, 0.9, 12), -0.06, 1.51, 0.075));

  // 背包：皮革背囊 + 翻盖 + 搭扣 + 肩带
  const pack = rbox(0.28, 0.36, 0.14, 0.05, m.leather);
  pack.position.set(0, 1.27, -0.15);
  root.add(pack);
  root.add(at(rbox(0.29, 0.13, 0.045, 0.02, m.leather), 0, 1.4, -0.205));
  root.add(at(rbox(0.04, 0.05, 0.015, 0.006, m.brass), 0, 1.37, -0.232));
  root.add(at(rbox(0.26, 0.05, 0.16, 0.02, m.leather), 0, 1.07, -0.13));
  for (const s of [-1, 1]) {
    const strap = rbox(0.04, 0.34, 0.014, 0.004, m.leather);
    strap.position.set(s * 0.1, 1.3, 0.123);
    root.add(strap);
    const backStrap = rbox(0.04, 0.012, 0.28, 0.004, m.leather);
    backStrap.position.set(s * 0.1, 1.46, -0.04);
    root.add(backStrap);
  }

  // 颈 + 头
  const headGroup = new THREE.Group();
  headGroup.position.y = 1.5;
  const neck = taper(0.05, 0.056, 0.1, m.skin, 14);
  neck.position.y = 0.04;
  headGroup.add(neck);

  const skull = ball(0.1, m.skin, 0.9, 1.12, 1.02, 28);
  skull.position.y = HEAD_CENTER_Y;
  headGroup.add(skull);
  const jaw = ball(0.026, m.skin, 1.2, 0.7, 0.8, 12);
  jaw.position.set(0, HEAD_CENTER_Y - 0.104, 0.056);
  headGroup.add(jaw);
  for (const s of [-1, 1]) {
    headGroup.add(at(ball(0.022, m.skin, 0.38, 1, 0.7, 10), s * 0.093, HEAD_CENTER_Y - 0.008, -0.005));
  }
  headGroup.add(at(ball(0.017, m.skin, 0.8, 1.25, 1.1, 10), 0, HEAD_CENTER_Y - 0.026, 0.1));
  headGroup.add(at(ball(0.011, m.skin, 1.3, 0.8, 0.8, 8), 0.011, HEAD_CENTER_Y - 0.038, 0.104));
  headGroup.add(at(ball(0.011, m.skin, 1.3, 0.8, 0.8, 8), -0.011, HEAD_CENTER_Y - 0.038, 0.104));

  // 眼睛：眼白（整体缩放 Y = 眨眼）+ 虹膜 + 瞳孔
  const eyeGeo = new THREE.SphereGeometry(0.0175, 14, 10);
  eyeGeo.scale(1.05, 0.78, 0.55);
  const makeEye = (side: 1 | -1): THREE.Mesh => {
    const eye = new THREE.Mesh(eyeGeo, m.eyeWhite);
    eye.position.set(side * 0.037, HEAD_CENTER_Y + 0.01, 0.086);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.0098, 12, 8), m.iris);
    iris.scale.set(1, 1, 0.4);
    iris.position.z = 0.0086;
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.0048, 8, 6), new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2 }));
    pupil.scale.set(1, 1, 0.4);
    pupil.position.z = 0.0099;
    eye.add(iris, pupil);
    return eye;
  };
  const eyeL = makeEye(1);
  const eyeR = makeEye(-1);

  // 眉毛：两道微斜的弧条，合并成一个 Mesh 方便整体抬降
  const browParts: THREE.BufferGeometry[] = [];
  for (const s of [-1, 1]) {
    const g = new RoundedBoxGeometry(0.05, 0.011, 0.014, 2, 0.004);
    g.rotateZ(s * 0.1);
    g.translate(s * 0.037, 0, 0);
    browParts.push(g);
  }
  const browY = HEAD_CENTER_Y + 0.046;
  const brow = new THREE.Mesh(mergeGeometries(browParts)!, m.hair);
  brow.position.set(0, browY, 0.088);
  brow.rotation.x = -0.12;

  // 嘴：上下唇的一条细胶囊
  const mouthY = HEAD_CENTER_Y - 0.066;
  const mouth = new THREE.Mesh(new THREE.CapsuleGeometry(0.0055, 0.03, 3, 8), m.lip);
  mouth.rotation.z = Math.PI / 2;
  mouth.scale.set(1, 1, 0.8);
  mouth.position.set(0, mouthY, 0.093);

  // 头发：脑后 / 两侧的包裹 + 额前刘海顶盖
  const hairBack = shadowed(
    new THREE.Mesh(
      new THREE.SphereGeometry(0.108, 28, 18, Math.PI / 2 + 0.95, Math.PI * 2 - 1.9, 0, Math.PI * 0.64),
      new THREE.MeshStandardMaterial({ color: 0x2b1d16, roughness: 0.72, metalness: 0.05, side: THREE.DoubleSide })
    )
  );
  hairBack.scale.set(0.95, 1.12, 1.02);
  hairBack.position.y = HEAD_CENTER_Y + 0.003;
  const hairTop = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.109, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.33), m.hair));
  hairTop.scale.set(0.95, 1.12, 1.04);
  hairTop.position.set(0, HEAD_CENTER_Y + 0.004, 0.004);
  headGroup.add(eyeL, eyeR, brow, mouth, hairBack, hairTop);
  root.add(headGroup);

  // 围巾尾端（挂在颈后，行进时向后飘）
  const cape = new THREE.Group();
  cape.position.set(0.07, 1.48, -0.075);
  const tailGeo = new THREE.PlaneGeometry(0.13, 0.5, 1, 6);
  tailGeo.translate(0, -0.25, 0);
  const tail = shadowed(new THREE.Mesh(tailGeo, m.scarf));
  tail.rotation.x = 0.04;
  cape.add(tail);
  const tailTrim = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.03), m.trim);
  tailTrim.position.set(0, -0.485, 0.001);
  cape.add(tailTrim);
  cape.rotation.x = 0.16;
  root.add(cape);

  // 双腿、双臂
  const leftLeg = makeLeg(m);
  leftLeg.hip.position.set(0.09, 0.91, 0);
  const rightLeg = makeLeg(m);
  rightLeg.hip.position.set(-0.09, 0.91, 0);
  root.add(leftLeg.hip, rightLeg.hip);

  const leftArm = makeArm(m, 1);
  leftArm.position.set(0.225, 1.46, 0);
  const rightArm = makeArm(m, -1);
  rightArm.position.set(-0.225, 1.46, 0);
  root.add(leftArm, rightArm);

  // 提灯挂在右手（随手臂摆动）
  const lantern = makeLantern(m);
  lantern.position.set(0, -0.69, 0.1);
  rightArm.add(lantern);

  // 脚下光环（移动时脉冲）
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 0.64, 36),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.22, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  ring.userData.isFootRing = true;
  root.add(ring);

  const rig: AvatarRig = {
    leftLeg,
    rightLeg,
    leftArm,
    rightArm,
    head: headGroup,
    cape,
    eyeL,
    eyeR,
    brow,
    mouth,
    faceRest: { browY, mouthY },
    mats: { jacket: m.jacket, trim: m.trim, cape: m.scarf },
  };
  root.userData.rig = rig;
  return root;
}
