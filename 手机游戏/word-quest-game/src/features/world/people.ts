import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { bakeGroupByMaterial } from "./detailKit";

/**
 * 场景中的"路人 / 同学"：与探险者角色同一套写实比例（约 8 头身）。
 * 原点：站姿在脚底；坐姿在臀部正下方的座面上（面朝 +Z）。
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
}

const geo = {
  scleraGeo: undefined as THREE.BufferGeometry | undefined,
};

function scleraGeometry(): THREE.BufferGeometry {
  if (!geo.scleraGeo) {
    const g = new THREE.SphereGeometry(0.0175, 12, 8);
    g.scale(1.05, 0.78, 0.55);
    geo.scleraGeo = g;
  }
  return geo.scleraGeo;
}

const shared = (() => {
  let cache: Record<string, THREE.MeshStandardMaterial> | undefined;
  return (): Record<string, THREE.MeshStandardMaterial> => {
    cache ??= {
      eyeWhite: new THREE.MeshStandardMaterial({ color: 0xf1ece6, roughness: 0.25 }),
      iris: new THREE.MeshStandardMaterial({ color: 0x3a2a1f, roughness: 0.3 }),
      lip: new THREE.MeshStandardMaterial({ color: 0xb0625a, roughness: 0.5 }),
      shoe: new THREE.MeshStandardMaterial({ color: 0x3b2d24, roughness: 0.7 }),
      sole: new THREE.MeshStandardMaterial({ color: 0x1f1b18, roughness: 0.9 }),
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

function taper(rTop: number, rBottom: number, len: number, mat: THREE.Material, radial = 12): THREE.Mesh {
  const m = mesh(new THREE.CylinderGeometry(rTop, rBottom, len, radial, 1), mat);
  m.position.y = -len / 2;
  return m;
}

function ball(r: number, mat: THREE.Material, sx = 1, sy = 1, sz = 1, seg = 12): THREE.Mesh {
  const m = mesh(new THREE.SphereGeometry(r, seg, Math.max(6, seg - 3)), mat);
  m.scale.set(sx, sy, sz);
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
  const root = new THREE.Group();
  root.name = "scene-person";
  const seated = opts.seated ?? false;
  const pose = opts.pose ?? (seated ? "listen" : "stand");

  const std = (color: number, roughness: number, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02, ...extra });
  const shirt = std(opts.shirt, 0.88);
  const trousers = std(opts.trousers ?? 0x4a4f57, 0.9);
  const skin = std(opts.skin ?? 0xd9a07c, 0.58, { emissive: 0x3a1608, emissiveIntensity: 0.14 });
  const hair = std(opts.hair ?? 0x2b1d16, 0.74, { metalness: 0.05, side: THREE.DoubleSide });

  // 站姿：髋高 0.91；坐姿：髋在座面之上 0.1
  const hipY = seated ? 0.1 : 0.91;
  const body = new THREE.Group();
  body.position.y = hipY;
  body.rotation.x = opts.lean ?? 0;
  root.add(body);

  // 骨盆 + 躯干 + 肩
  const pelvis = rbox(0.35, 0.2, 0.21, 0.06, trousers);
  pelvis.position.y = 0.05;
  body.add(pelvis);
  const chest = mesh(new THREE.CapsuleGeometry(0.15, 0.28, 6, 16), shirt);
  chest.scale.set(1.3, 1, 0.78);
  chest.position.y = 0.36;
  body.add(chest);
  const hem = mesh(new THREE.CylinderGeometry(0.168, 0.19, 0.18, 18, 1, true), new THREE.MeshStandardMaterial({ color: opts.shirt, roughness: 0.88, side: THREE.DoubleSide }));
  hem.scale.set(1.2, 1, 0.8);
  hem.position.y = 0.1;
  body.add(hem);
  for (const sx of [-1, 1]) {
    const shoulder = ball(0.09, shirt, 1, 0.7, 1, 12);
    shoulder.position.set(sx * 0.14, 0.54, 0);
    body.add(shoulder);
  }

  // 颈 + 头
  const head = new THREE.Group();
  head.position.y = 0.58;
  head.rotation.x = pose === "phone" || pose === "read" ? 0.38 : pose === "write" ? 0.3 : opts.lean ? -(opts.lean) * 0.6 : 0;
  body.add(head);
  const neck = taper(0.05, 0.056, 0.1, skin, 12);
  neck.position.y = 0.04;
  head.add(neck);
  const skull = ball(0.1, skin, 0.9, 1.12, 1.02, 22);
  skull.position.y = 0.19;
  head.add(skull);
  const chin = ball(0.026, skin, 1.2, 0.7, 0.8, 10);
  chin.position.set(0, 0.086, 0.056);
  head.add(chin);
  for (const sx of [-1, 1]) {
    const ear = ball(0.022, skin, 0.38, 1, 0.7, 8);
    ear.position.set(sx * 0.093, 0.182, -0.005);
    head.add(ear);
    const eye = new THREE.Mesh(scleraGeometry(), s.eyeWhite);
    eye.position.set(sx * 0.037, 0.2, 0.086);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.0098, 10, 8), s.iris);
    iris.scale.set(1, 1, 0.4);
    iris.position.z = 0.0086;
    eye.add(iris);
    head.add(eye);
    const brow = rbox(0.05, 0.011, 0.014, 0.004, hair);
    brow.position.set(sx * 0.037, 0.236, 0.089);
    brow.rotation.z = -sx * 0.1;
    head.add(brow);
    const nostril = ball(0.011, skin, 1.3, 0.8, 0.8, 8);
    nostril.position.set(sx * 0.011, 0.152, 0.104);
    head.add(nostril);
  }
  const nose = ball(0.017, skin, 0.8, 1.25, 1.1, 10);
  nose.position.set(0, 0.164, 0.1);
  head.add(nose);
  const mouth = mesh(new THREE.CapsuleGeometry(0.0055, 0.03, 3, 8), s.lip);
  mouth.rotation.z = Math.PI / 2;
  mouth.scale.set(1, 1, 0.8);
  mouth.position.set(0, 0.124, 0.093);
  head.add(mouth);

  // 头发
  const style = opts.hairStyle ?? "short";
  const back = mesh(new THREE.SphereGeometry(0.108, 22, 14, Math.PI / 2 + 0.95, Math.PI * 2 - 1.9, 0, Math.PI * (style === "long" ? 0.82 : 0.64)), hair);
  back.scale.set(0.95, 1.12, 1.02);
  back.position.y = 0.193;
  head.add(back);
  const cap = mesh(new THREE.SphereGeometry(0.109, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.33), hair);
  cap.scale.set(0.95, 1.12, 1.04);
  cap.position.set(0, 0.194, 0.004);
  head.add(cap);
  if (style === "long") {
    const fall = ball(0.1, hair, 0.95, 1.6, 0.8, 12);
    fall.position.set(0, 0.04, -0.06);
    head.add(fall);
  } else if (style === "bun") {
    const bun = ball(0.05, hair, 1, 0.9, 1, 12);
    bun.position.set(0, 0.3, -0.06);
    head.add(bun);
  }

  // 配饰
  if (opts.glasses) {
    const frame = std(0x1a1a1a, 0.4, { metalness: 0.4 });
    for (const sx of [-1, 1]) {
      const rim = mesh(new THREE.TorusGeometry(0.026, 0.0035, 6, 18), frame);
      rim.position.set(sx * 0.037, 0.2, 0.098);
      head.add(rim);
    }
    const bridge = mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.02, 5), frame);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.205, 0.099);
    head.add(bridge);
  }
  if (opts.scarf !== undefined) {
    const sc = mesh(new THREE.TorusGeometry(0.07, 0.034, 8, 20), std(opts.scarf, 0.92));
    sc.rotation.x = Math.PI / 2;
    sc.position.y = 0.6;
    body.add(sc);
  }
  if (opts.backpack !== undefined) {
    const bag = rbox(0.3, 0.38, 0.15, 0.05, std(opts.backpack, 0.85));
    bag.position.set(0, 0.34, -0.17);
    body.add(bag);
  }
  // 双臂
  const arms = ARM_POSES[pose];
  for (const side of [-1, 1] as const) {
    const p = side === 1 ? arms.left : arms.right;
    const arm = new THREE.Group();
    arm.position.set(side * 0.225, 0.55, 0);
    arm.rotation.x = p.shoulder;
    arm.rotation.z = (p.side ?? 0) * side;
    body.add(arm);
    arm.add(ball(0.066, shirt, 1, 1, 1, 10));
    arm.add(taper(0.06, 0.05, 0.28, shirt, 12));
    const elbow = new THREE.Group();
    elbow.position.y = -0.28;
    elbow.rotation.x = p.elbow;
    arm.add(elbow);
    elbow.add(ball(0.05, shirt, 1, 1, 1, 10));
    elbow.add(taper(0.049, 0.039, 0.25, shirt, 12));
    const hand = new THREE.Group();
    hand.position.y = -0.27;
    elbow.add(hand);
    const palm = rbox(0.064, 0.075, 0.032, 0.011, skin);
    palm.position.y = -0.04;
    hand.add(palm);
    const fingers = rbox(0.06, 0.07, 0.026, 0.011, skin);
    fingers.position.set(0, -0.105, 0.012);
    fingers.rotation.x = -0.35;
    hand.add(fingers);
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
    hip.position.set(side * 0.09, 0, 0);
    hip.rotation.x = seated ? -Math.PI / 2 + 0.03 : pose === "walk" ? 0.42 * -side : 0;
    body.add(hip);
    hip.add(ball(0.112, trousers, 1, 1, 1, 10));
    hip.add(taper(0.112, 0.08, 0.42, trousers, 14));
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    knee.rotation.x = seated ? Math.PI / 2 - 0.03 : pose === "walk" && side === 1 ? 0.55 : 0.03;
    hip.add(knee);
    knee.add(ball(0.08, trousers, 1, 1, 1, 10));
    knee.add(taper(0.08, 0.06, 0.4, trousers, 12));
    const upper = mesh(new THREE.CapsuleGeometry(0.056, 0.13, 4, 10), s.shoe);
    upper.rotation.x = Math.PI / 2;
    upper.scale.set(1.08, 1, 0.86);
    upper.position.set(0, -0.43, 0.06);
    knee.add(upper);
    const sole = rbox(0.12, 0.032, 0.285, 0.014, s.sole);
    sole.position.set(0, -0.465, 0.07);
    knee.add(sole);
  }

  // 坐姿：整个身体向下平移，使鞋底落在 y = -(0.91 - 0.1) 附近（由调用方按座高摆放）
  bakeGroupByMaterial(root);
  root.scale.setScalar(opts.scale ?? 1);
  return root;
}
