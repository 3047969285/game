import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { bakeGroupByMaterial } from "./detailKit";
import { bootGeometry, handGeometry, handGeometryFor, headGeometry, jacketGeometry, lowerSleeveGeometry, shinGeometry, thighGeometry, upperSleeveGeometry } from "./avatarBody";
import { hairGeometry } from "./avatarBody";
import { mirrorX } from "./sdf";

/**
 * 场景中的"路人 / 同学"：与探险者同一套 SDF 解剖形体（低分辨率版本，约 1/8 面数），
 * 同样的比例（约 8 头身）。原点：站姿在脚底；坐姿在臀部正下方的座面上（面朝 +Z）。
 */

export type PersonPose = "stand" | "phone" | "listen" | "talk" | "write" | "read" | "walk" | "point";

export interface PersonOptions {
  shirt: number;
  trousers?: number;
  skin?: number;
  hair?: number;
  hairStyle?: "short" | "long" | "bun";
  seated?: boolean;
  pose?: PersonPose;
  /** 整体缩放（场景比例约为真人的 1.3–1.6 倍） */
  scale?: number;
  /** 躯干前倾（弧度） */
  lean?: number;
  /** 配饰：眼镜 / 围巾（颜色）/ 双肩包（颜色） */
  glasses?: boolean;
  scarf?: number;
  backpack?: number;
  /** 宇航头盔（白色盔体 + 深色面罩） */
  helmet?: boolean;
}

/** 低模共享几何（首次使用时生成，约 0.3 s，之后所有人物复用） */
let lod: {
  head: THREE.BufferGeometry;
  hair: Record<string, THREE.BufferGeometry>;
  jacket: THREE.BufferGeometry;
  upper: THREE.BufferGeometry;
  lower: THREE.BufferGeometry;
  hand: THREE.BufferGeometry;
  thigh: THREE.BufferGeometry;
  shin: THREE.BufferGeometry;
  boot: THREE.BufferGeometry;
} | undefined;

const Q = 0.4;
function parts(): NonNullable<typeof lod> {
  lod ??= {
    head: headGeometry(Q),
    hair: { short: hairGeometry(Q, "short"), long: hairGeometry(Q, "long") },
    jacket: jacketGeometry(Q),
    upper: upperSleeveGeometry(Q),
    lower: lowerSleeveGeometry(Q),
    hand: handGeometry(Q),
    thigh: thighGeometry(Q),
    shin: shinGeometry(Q),
    boot: bootGeometry(Q),
  };
  return lod;
}

const shared = (() => {
  let cache: Record<string, THREE.MeshStandardMaterial> | undefined;
  return (): Record<string, THREE.MeshStandardMaterial> => {
    cache ??= {
      eyeWhite: new THREE.MeshStandardMaterial({ color: 0xf1ece6, roughness: 0.25 }),
      iris: new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.3 }),
      lip: new THREE.MeshStandardMaterial({ color: 0x9a5048, roughness: 0.5 }),
      shoe: new THREE.MeshStandardMaterial({ color: 0x4a3626, roughness: 0.65 }),
      phone: new THREE.MeshStandardMaterial({ color: 0x20272d, roughness: 0.35, metalness: 0.3 }),
      screen: new THREE.MeshStandardMaterial({ color: 0x7ad4d0, emissive: 0x1f9aa0, emissiveIntensity: 0.55, roughness: 0.3 }),
    };
    return cache;
  };
})();

function mesh(geometry: THREE.BufferGeometry, material: THREE.Material): THREE.Mesh {
  const m = new THREE.Mesh(geometry, material);
  m.castShadow = true;
  m.receiveShadow = true;
  m.userData.isLandscapeStage = true;
  return m;
}

function rbox(w: number, h: number, d: number, r: number, mat: THREE.Material): THREE.Mesh {
  return mesh(new RoundedBoxGeometry(w, h, d, 1, Math.min(r, w / 2.01, h / 2.01, d / 2.01)), mat);
}

interface ArmPose {
  shoulder: number;
  elbow: number;
  side?: number;
}

const ARM_POSES: Record<PersonPose, { left: ArmPose; right: ArmPose }> = {
  stand: { left: { shoulder: 0.04, elbow: -0.15 }, right: { shoulder: -0.04, elbow: -0.15 } },
  phone: { left: { shoulder: -0.7, elbow: -1.35, side: -0.06 }, right: { shoulder: -0.7, elbow: -1.35, side: 0.06 } },
  listen: { left: { shoulder: -0.55, elbow: -0.95 }, right: { shoulder: -0.5, elbow: -0.95 } },
  talk: { left: { shoulder: -0.5, elbow: -0.95 }, right: { shoulder: -1.15, elbow: -0.75, side: 0.1 } },
  write: { left: { shoulder: -0.55, elbow: -0.9 }, right: { shoulder: -0.85, elbow: -1.2, side: 0.05 } },
  read: { left: { shoulder: -0.95, elbow: -1.45, side: -0.1 }, right: { shoulder: -0.95, elbow: -1.45, side: 0.1 } },
  walk: { left: { shoulder: 0.45, elbow: -0.25 }, right: { shoulder: -0.45, elbow: -0.5 } },
  point: { left: { shoulder: 0.04, elbow: -0.15 }, right: { shoulder: -1.45, elbow: -0.1, side: 0.12 } },
};

/** 创建一个写实比例的人物 */
export function createPerson(opts: PersonOptions): THREE.Group {
  const s = shared();
  const g = parts();
  const root = new THREE.Group();
  root.name = "scene-person";
  const seated = opts.seated ?? false;
  const pose = opts.pose ?? (seated ? "listen" : "stand");

  const std = (color: number, roughness: number, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02, ...extra });
  const shirt = std(opts.shirt, 0.86, { side: THREE.DoubleSide });
  const trousers = std(opts.trousers ?? 0x39465a, 0.88);
  const skin = std(opts.skin ?? 0xe2b898, 0.55, { emissive: 0x3a1608, emissiveIntensity: 0.05 });
  const skinFace = new THREE.MeshStandardMaterial({ color: skin.color.getHex(), roughness: 0.55, metalness: 0.02, vertexColors: true, emissive: 0x3a1608, emissiveIntensity: 0.05 });
  const hair = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.42, metalness: 0.15, side: THREE.DoubleSide });
  const hairTint = opts.hair ?? 0x2b1d16;
  const browMat = std(new THREE.Color(hairTint).multiplyScalar(0.8).getHex(), 0.7);

  // 站姿：髋高 0.91；坐姿：髋在座面之上 0.1。人体几何按"探险者"坐标（脚底 y=0、髋 y=0.91）建模，
  // 因此放进一个下移 0.91 的子框架，再按姿势旋转手臂 / 腿 / 头。
  const hipY = seated ? 0.1 : 0.91;
  const body = new THREE.Group();
  body.position.y = hipY;
  body.rotation.x = opts.lean ?? 0;
  root.add(body);
  const frame = new THREE.Group();
  frame.position.y = -0.91;
  body.add(frame);

  frame.add(mesh(g.jacket, shirt));

  // 头：SDF 头部 + 眼睛 + 眉 + 嘴 + 头发
  const head = new THREE.Group();
  head.position.y = 1.5;
  head.rotation.x = pose === "phone" || pose === "read" ? 0.38 : pose === "write" ? 0.3 : opts.lean ? -opts.lean * 0.6 : 0;
  frame.add(head);
  head.add(mesh(g.head, skinFace));
  for (const sx of [-1, 1]) {
    const eye = mesh(new THREE.SphereGeometry(0.0125, 12, 9), s.eyeWhite);
    eye.position.set(sx * 0.034, 0.2, 0.0685);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.0072, 10, 8), s.iris);
    iris.scale.set(1, 1, 0.35);
    iris.position.z = 0.0118;
    eye.add(iris);
    head.add(eye);
    const brow = rbox(0.046, 0.009, 0.012, 0.004, browMat);
    brow.position.set(sx * 0.037, 0.2165, 0.0885);
    brow.rotation.z = -sx * 0.1;
    head.add(brow);
  }
  const mouth = mesh(new THREE.CapsuleGeometry(0.0026, 0.026, 3, 8), s.lip);
  mouth.rotation.z = Math.PI / 2;
  mouth.scale.set(1, 1, 0.6);
  mouth.position.set(0, 0.1215, 0.0875);
  head.add(mouth);

  // 头发：短发 / 长发（顶点色，按 hair 色调着色）/ 发髻
  const style = opts.hairStyle ?? "short";
  const hairGeo = (style === "long" ? g.hair.long : g.hair.short).clone();
  const hc = new THREE.Color(hairTint);
  const lum = (hc.r + hc.g + hc.b) / 3;
  const ca = hairGeo.attributes.color as THREE.BufferAttribute;
  for (let i = 0; i < ca.count; i++) {
    const k = (ca.getX(i) + ca.getY(i) + ca.getZ(i)) / 3 / 0.05;
    ca.setXYZ(i, hc.r * k * (0.35 / Math.max(0.05, lum)) * 0.6, hc.g * k * (0.35 / Math.max(0.05, lum)) * 0.6, hc.b * k * (0.35 / Math.max(0.05, lum)) * 0.6);
  }
  head.add(mesh(hairGeo, hair));
  if (style === "bun") {
    const bun = mesh(new THREE.SphereGeometry(0.05, 14, 10), std(hairTint, 0.7));
    bun.scale.set(1, 0.9, 1);
    bun.position.set(0, 0.3, -0.07);
    head.add(bun);
  }

  if (opts.helmet) {
    const shell = mesh(new THREE.SphereGeometry(0.145, 24, 16), std(0xeef2f4, 0.3, { metalness: 0.2 }));
    shell.scale.set(1.0, 1.12, 1.08);
    shell.position.y = 0.2;
    head.add(shell);
    const visor = mesh(new THREE.SphereGeometry(0.12, 20, 12), std(0x1b3447, 0.12, { metalness: 0.7 }));
    visor.scale.set(0.95, 0.68, 0.55);
    visor.position.set(0, 0.2, 0.108);
    head.add(visor);
    const ring = mesh(new THREE.TorusGeometry(0.1, 0.018, 8, 20), std(0xc9d0d4, 0.4, { metalness: 0.5 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.07;
    head.add(ring);
  }
  if (opts.glasses) {
    const frameMat = std(0x1a1a1a, 0.4, { metalness: 0.4 });
    for (const sx of [-1, 1]) {
      const rim = mesh(new THREE.TorusGeometry(0.0245, 0.0032, 6, 18), frameMat);
      rim.position.set(sx * 0.034, 0.2, 0.092);
      head.add(rim);
    }
    const bridge = mesh(new THREE.CylinderGeometry(0.0028, 0.0028, 0.02, 5), frameMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.204, 0.093);
    head.add(bridge);
  }
  if (opts.scarf !== undefined) {
    const sc = mesh(new THREE.TorusGeometry(0.074, 0.032, 8, 20), std(opts.scarf, 0.92));
    sc.rotation.x = Math.PI / 2;
    sc.position.y = 1.54;
    frame.add(sc);
  }
  if (opts.backpack !== undefined) {
    const bag = rbox(0.29, 0.4, 0.15, 0.06, std(opts.backpack, 0.85));
    bag.position.set(0, 1.27 + 0.2 - 0.2, -0.155);
    frame.add(bag);
  }

  // 双臂
  const armPoses = ARM_POSES[pose];
  for (const side of [-1, 1] as const) {
    const p = side === 1 ? armPoses.left : armPoses.right;
    const arm = new THREE.Group();
    arm.position.set(side * 0.2, 1.46, 0);
    arm.rotation.x = p.shoulder;
    arm.rotation.z = (p.side ?? 0) * side;
    frame.add(arm);
    arm.add(mesh(side === 1 ? g.upper : mirrorX(g.upper), shirt));
    const elbow = new THREE.Group();
    elbow.position.y = -0.28;
    elbow.rotation.x = p.elbow;
    arm.add(elbow);
    elbow.add(mesh(side === 1 ? g.lower : mirrorX(g.lower), shirt));
    const hand = new THREE.Group();
    hand.position.y = -0.27;
    elbow.add(hand);
    hand.add(mesh(handGeometryFor(side, g.hand), skin));
    if (pose === "read" && side === 1) {
      const book = rbox(0.2, 0.03, 0.27, 0.008, std(0x2f5d8a, 0.8));
      book.position.set(-0.12, -0.12, 0.06);
      book.rotation.set(-0.9, 0, 0.1);
      hand.add(book);
    }
    if (pose === "write" && side === -1) {
      const pen = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.15, 6), std(0x1d2b4d, 0.4));
      pen.position.set(0, -0.12, 0.03);
      pen.rotation.x = -0.9;
      hand.add(pen);
    }
    if (pose === "phone" && side === 1) {
      const phone = rbox(0.075, 0.016, 0.15, 0.006, s.phone);
      phone.position.set(-0.05, -0.1, 0.02);
      phone.rotation.set(-0.4, 0, 0.1);
      hand.add(phone);
      const screen = mesh(new THREE.PlaneGeometry(0.062, 0.128), s.screen);
      screen.rotation.x = -Math.PI / 2;
      screen.position.set(0, 0.0085, 0);
      phone.add(screen);
    }
  }

  // 双腿
  for (const side of [-1, 1] as const) {
    const hip = new THREE.Group();
    hip.position.set(side * 0.09, 0.91, 0);
    hip.rotation.x = seated ? -Math.PI / 2 + 0.03 : pose === "walk" ? 0.42 * -side : 0;
    frame.add(hip);
    hip.add(mesh(g.thigh, trousers));
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    knee.rotation.x = seated ? Math.PI / 2 - 0.03 : pose === "walk" && side === 1 ? 0.55 : 0.03;
    hip.add(knee);
    knee.add(mesh(g.shin, trousers));
    knee.add(mesh(g.boot, s.shoe));
  }

  // 烘焙：按材质合并成十几个网格
  bakeGroupByMaterial(root);
  root.scale.setScalar(opts.scale ?? 1);
  return root;
}
