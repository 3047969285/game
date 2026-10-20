import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { bakeGroupByMaterial } from "./detailKit";
import { bootGeometry, handGeometry, headGeometry, jacketGeometry, lowerSleeveGeometry, shinGeometry, thighGeometry, upperSleeveGeometry } from "./avatarBody";
import { hairGeometry } from "./avatarBody";
import { mirrorX } from "./sdf";
import { attachHumanVisual } from "./humanVisual";
import { createGarmentDetails } from "./garmentDetails";

/**
 * 场景中的"路人 / 同学"：与探险者同一套 SDF 解剖形体（低分辨率版本，约 1/8 面数），
 * 同样的比例（约 8 头身）。原点：站姿在脚底；坐姿在臀部正下方的座面上（面朝 +Z）。
 */

export type PersonPose = "stand" | "phone" | "listen" | "talk" | "write" | "read" | "walk" | "point" | "lap" | "reach1" | "reach2" | "reach3" | "reach4";

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
  /** 服装款式；缺省时按颜色确定性地挑选，让人群有变化 */
  outfit?: "tee" | "hoodie" | "coat" | "dress";
  /** 帽子颜色（毛线帽 / 鸭舌帽） */
  hat?: number;
  /** 衣物表面细节质量；移动设备默认低档 */
  garmentDetail?: "low" | "high";
  /** 用于电影回忆角色：保留可驱动的关节骨架并按材质合成蒙皮网格；普通场景人物仍走静态低开销路径。 */
  animated?: boolean;
}

export interface PersonRig {
  body: THREE.Bone;
  head: THREE.Bone;
  arms: { left: { shoulder: THREE.Bone; elbow: THREE.Bone; hand: THREE.Bone }; right: { shoulder: THREE.Bone; elbow: THREE.Bone; hand: THREE.Bone } };
  legs: { left: { hip: THREE.Bone; knee: THREE.Bone; ankle: THREE.Bone }; right: { hip: THREE.Bone; knee: THREE.Bone; ankle: THREE.Bone } };
  eyes: THREE.Bone[];
  gazes: THREE.Bone[];
  brows: THREE.Object3D[];
  mouth: THREE.Bone;
  props: { book?: THREE.Group; phone?: THREE.Group; pen?: THREE.Group };
  setExpression(expression: PersonExpression, duration?: number): void;
  setPose(pose: PersonPose, seated: boolean, duration?: number): void;
  update(dt: number, time: number, walking: boolean, walkPhase: number, seed: number): void;
}

export type PersonExpression = "neutral" | "listen" | "think" | "softSmile" | "talk";

/** 低模共享几何（首次使用时生成，约 0.3 s，之后所有人物复用） */
let lod: {
  head: THREE.BufferGeometry;
  hair: Record<string, THREE.BufferGeometry>;
  jacket: THREE.BufferGeometry;
  upper: THREE.BufferGeometry;
  upperR: THREE.BufferGeometry;
  lower: THREE.BufferGeometry;
  lowerR: THREE.BufferGeometry;
  hand: THREE.BufferGeometry;
  handR: THREE.BufferGeometry;
  thigh: THREE.BufferGeometry;
  shin: THREE.BufferGeometry;
  boot: THREE.BufferGeometry;
} | undefined;

const Q = 0.4;
function parts(): NonNullable<typeof lod> {
  if (!lod) {
    const upper = upperSleeveGeometry(Q);
    const lower = lowerSleeveGeometry(Q);
    const hand = handGeometry(Q);
    lod = {
      head: headGeometry(0.58),
      hair: { short: hairGeometry(0.5, "short"), long: hairGeometry(0.5, "long") },
      jacket: jacketGeometry(Q),
      upper,
      upperR: mirrorX(upper),
      lower,
      lowerR: mirrorX(lower),
      hand,
      handR: mirrorX(hand),
      thigh: thighGeometry(Q),
      shin: shinGeometry(Q),
      boot: bootGeometry(Q),
    };
  }
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

function joint(animated: boolean): THREE.Group | THREE.Bone {
  return animated ? new THREE.Bone() : new THREE.Group();
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
  read: { left: { shoulder: -0.38, elbow: -1.0, side: -0.12 }, right: { shoulder: -0.38, elbow: -1.0, side: 0.12 } },
  walk: { left: { shoulder: 0.45, elbow: -0.25 }, right: { shoulder: -0.45, elbow: -0.5 } },
  point: { left: { shoulder: 0.04, elbow: -0.15 }, right: { shoulder: -1.45, elbow: -0.1, side: 0.12 } },
  // 坐着，双手放在膝上（lap），以及右手慢慢抬起、屈肘伸向前方的四个中间姿势（reach1 → reach4，供回忆里的人物逐帧过渡）
  lap: { left: { shoulder: -0.42, elbow: -0.55, side: -0.08 }, right: { shoulder: -0.42, elbow: -0.55, side: -0.08 } },
  reach1: { left: { shoulder: -0.42, elbow: -0.55, side: -0.08 }, right: { shoulder: -0.55, elbow: -0.62, side: -0.08 } },
  reach2: { left: { shoulder: -0.42, elbow: -0.55, side: -0.08 }, right: { shoulder: -0.78, elbow: -0.72, side: -0.1 } },
  reach3: { left: { shoulder: -0.42, elbow: -0.55, side: -0.08 }, right: { shoulder: -0.98, elbow: -0.8, side: -0.12 } },
  reach4: { left: { shoulder: -0.42, elbow: -0.55, side: -0.08 }, right: { shoulder: -1.12, elbow: -0.86, side: -0.12 } },
};

/** 创建一个写实比例的人物 */
export function createPerson(opts: PersonOptions): THREE.Group {
  const s = shared();
  const g = parts();
  const animated = opts.animated === true;
  const root = new THREE.Group();
  root.name = "scene-person";
  const seated = opts.seated ?? false;
  const pose = opts.pose ?? (seated ? "listen" : "stand");

  const ownedMaterials = new Set<THREE.Material>();
  const std = (color: number, roughness: number, extra: THREE.MeshStandardMaterialParameters = {}) => {
    const material = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02, ...extra });
    ownedMaterials.add(material);
    return material;
  };
  // 衣服颜色若与肤色太接近，看上去像光着上身：自动拉向偏冷的布料色
  const skinC = new THREE.Color(opts.skin ?? 0xe2b898);
  const shirtC = new THREE.Color(opts.shirt);
  const hs = { h: 0, s: 0, l: 0 };
  const hk = { h: 0, s: 0, l: 0 };
  shirtC.getHSL(hs);
  skinC.getHSL(hk);
  const hueGap = Math.min(Math.abs(hs.h - hk.h), 1 - Math.abs(hs.h - hk.h));
  if (hueGap < 0.055 && hs.s > 0.18 && Math.abs(hs.l - hk.l) < 0.24) shirtC.set(0x4f6f86).offsetHSL(0, 0, (hs.l - 0.5) * 0.2);
  const shirt = std(shirtC.getHex(), 0.86, { side: THREE.DoubleSide });
  const trousers = std(opts.trousers ?? 0x39465a, 0.88);
  const skin = std(opts.skin ?? 0xe2b898, 0.55, { emissive: 0x3a1608, emissiveIntensity: 0.05 });
  skin.name = "person-skin";
  const skinFace = new THREE.MeshStandardMaterial({ color: skin.color.getHex(), roughness: 0.55, metalness: 0.02, vertexColors: true, emissive: 0x3a1608, emissiveIntensity: 0.05 });
  skinFace.name = "person-face";
  const hair = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.42, metalness: 0.08, side: THREE.DoubleSide });
  hair.name = "person-hair";
  ownedMaterials.add(skinFace);
  ownedMaterials.add(hair);
  const hairTint = opts.hair ?? 0x2b1d16;
  const browMat = std(new THREE.Color(hairTint).multiplyScalar(0.8).getHex(), 0.7);
  browMat.name = "person-face-detail";

  // 站姿：髋高 0.91；坐姿：髋在座面之上 0.1。人体几何按"探险者"坐标（脚底 y=0、髋 y=0.91）建模，
  // 因此放进一个下移 0.91 的子框架，再按姿势旋转手臂 / 腿 / 头。
  const hipY = seated ? 0.1 : 0.91;
  const body = joint(animated);
  body.position.y = hipY;
  body.rotation.x = opts.lean ?? 0;
  root.add(body);
  const frame = joint(animated);
  frame.position.y = -0.91;
  body.add(frame);

  frame.add(mesh(g.jacket, shirt));

  // 头：SDF 头部 + 眼睛 + 眉 + 嘴 + 头发
  const head = joint(animated);
  head.position.y = 1.5;
  head.rotation.x = pose === "phone" || pose === "read" ? 0.38 : pose === "write" ? 0.3 : opts.lean ? -opts.lean * 0.6 : 0;
  frame.add(head);
  head.add(mesh(g.head, skinFace));
  const eyeBones: THREE.Bone[] = [];
  const gazeBones: THREE.Bone[] = [];
  const browBones: THREE.Bone[] = [];
  for (const sx of [-1, 1] as const) {
    const eye = joint(animated);
    eye.position.set(sx * 0.034, 0.2, 0.0685);
    const eyeball = mesh(new THREE.SphereGeometry(0.0125, 16, 12), s.eyeWhite);
    eye.add(eyeball);
    const gaze = joint(animated);
    gaze.position.z = 0.0118;
    const iris = mesh(new THREE.SphereGeometry(0.0072, 12, 10), s.iris);
    iris.scale.set(1, 1, 0.35);
    gaze.add(iris);
    const glint = mesh(new THREE.SphereGeometry(0.0021, 8, 6), s.eyeWhite);
    glint.position.set(-0.0022, 0.0027, 0.0023);
    gaze.add(glint);
    eye.add(gaze);
    const upperLid = mesh(new THREE.TorusGeometry(0.0118, 0.0017, 5, 16, Math.PI), skin);
    upperLid.position.set(0, 0.001, 0.006);
    upperLid.scale.y = 0.72;
    eye.add(upperLid);
    eyeBones.push(eye as THREE.Bone);
    gazeBones.push(gaze as THREE.Bone);
    head.add(eye);
    const brow = joint(animated);
    brow.position.set(sx * 0.037, 0.2165, 0.0885);
    brow.rotation.z = -sx * 0.1;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-sx * 0.015, -0.001, 0),
      new THREE.Vector3(-sx * 0.004, 0.003, 0.001),
      new THREE.Vector3(sx * 0.009, 0.002, 0),
    ]);
    brow.add(mesh(new THREE.TubeGeometry(curve, 8, 0.0027, 5, false), browMat));
    head.add(brow);
    browBones.push(brow as THREE.Bone);
  }
  const mouth = joint(animated);
  mouth.position.set(0, 0.132, 0.0875);
  const mouthInterior = std(0x542a29, 0.78);
  mouthInterior.name = "person-face-detail";
  const mouthGap = mesh(new THREE.SphereGeometry(0.0058, 12, 8), mouthInterior);
  mouthGap.scale.set(1.7, 0.55, 0.4);
  mouth.add(mouthGap);
  const lip = mesh(new THREE.CapsuleGeometry(0.0023, 0.025, 3, 8), s.lip);
  lip.rotation.z = Math.PI / 2;
  lip.scale.set(1, 1, 0.55);
  lip.position.y = 0.001;
  mouth.add(lip);
  const lowerLip = mesh(new THREE.CapsuleGeometry(0.0016, 0.019, 3, 8), skin);
  lowerLip.rotation.z = Math.PI / 2;
  lowerLip.position.set(0, -0.0042, 0.001);
  mouth.add(lowerLip);
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
  // 衬衫领与袖口：让上衣有层次（领口一圈浅色内领、腰带线）
  const innerMat = std(0xeeeae0, 0.9, { side: THREE.DoubleSide });
  const collar = mesh(new THREE.TorusGeometry(0.07, 0.012, 8, 24), innerMat);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 1.535;
  collar.scale.set(1.05, 1, 1);
  frame.add(collar);
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

  // ── 服装款式：连帽衫 / 长风衣 / 连衣裙（站姿才加裙摆与风衣下摆，坐姿只加帽兜），缺省按颜色挑选 ──
  const pick = (Math.imul(opts.shirt ^ ((opts.hair ?? 0) * 31), 2654435761) >>> 16) + (opts.hairStyle === "long" ? 3 : 0);
  const outfit = opts.outfit ?? (opts.helmet || opts.scarf !== undefined ? "tee" : (["tee", "hoodie", "coat", "dress", "tee", "hoodie"] as const)[pick % 6]);
  const longHair = (opts.hairStyle ?? "short") === "long";
  const style2 = outfit === "dress" && !longHair && opts.hairStyle !== "bun" ? "coat" : outfit;
  if (style2 === "hoodie" && !opts.helmet) {
    const hood = mesh(new THREE.TorusGeometry(0.083, 0.03, 10, 24), shirt);
    hood.rotation.x = Math.PI / 2 - 0.35;
    hood.position.set(0, 1.545, -0.03);
    hood.scale.set(1.05, 1, 1.15);
    frame.add(hood);
    const pocket = rbox(0.2, 0.09, 0.02, 0.01, shirt);
    pocket.position.set(0, 1.0, 0.128);
    frame.add(pocket);
  }
  if (!seated && (style2 === "coat" || style2 === "dress")) {
    const len = style2 === "coat" ? 0.62 : 0.46;
    const skirt = mesh(new THREE.CylinderGeometry(0.19, style2 === "coat" ? 0.235 : 0.27, len, 28, 1, true), shirt);
    skirt.scale.set(1.12, 1, 0.9);
    skirt.position.y = 1.0 - len / 2 + 0.02;
    skirt.receiveShadow = false;
    frame.add(skirt);
    if (style2 === "coat") {
      const lapel = rbox(0.016, 0.5, 0.02, 0.006, innerMat);
      lapel.position.set(0, 1.25, 0.121);
      frame.add(lapel);
    }
  }
  const hatColor = opts.hat ?? (pick % 7 === 3 && !seated ? 0x7a3b3b : pick % 7 === 5 && !seated ? 0x2f4a5f : undefined);
  if (hatColor !== undefined && !opts.helmet) {
    const hatMat = std(hatColor, 0.9);
    const beanie = mesh(new THREE.SphereGeometry(0.098, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), hatMat);
    beanie.scale.set(0.9, 1.06, 1.06);
    beanie.position.set(0, 0.215, -0.014);
    head.add(beanie);
    const rim = mesh(new THREE.TorusGeometry(0.09, 0.012, 8, 20), hatMat);
    rim.rotation.x = Math.PI / 2;
    rim.scale.set(0.92, 1.08, 1);
    rim.position.set(0, 0.2, -0.014);
    head.add(rim);
  }  // 双臂
  const armPoses = ARM_POSES[pose];
  const arms = {} as PersonRig["arms"];
  const dynamicProps: PersonRig["props"] = {};
  for (const side of [-1, 1] as const) {
    const p = side === 1 ? armPoses.left : armPoses.right;
    const arm = joint(animated);
    arm.position.set(side * 0.19, 1.42, 0);
    arm.rotation.x = p.shoulder;
    arm.rotation.z = (p.side ?? 0) * side;
    frame.add(arm);
    arm.add(mesh(side === 1 ? g.upper : g.upperR, shirt));
    const elbow = joint(animated);
    elbow.position.y = -0.28;
    elbow.rotation.x = p.elbow;
    arm.add(elbow);
    elbow.add(mesh(side === 1 ? g.lower : g.lowerR, shirt));
    const elbowPad = mesh(new THREE.SphereGeometry(0.043, 12, 9), shirt);
    elbowPad.scale.set(0.95, 0.86, 0.95);
    elbow.add(elbowPad);
    const cuff = mesh(new THREE.TorusGeometry(0.041, 0.008, 6, 16), innerMat);
    cuff.rotation.x = Math.PI / 2;
    cuff.position.y = -0.252;
    elbow.add(cuff);
    const hand = joint(animated);
    hand.position.y = -0.27;
    elbow.add(hand);
    hand.add(mesh(side === 1 ? g.hand : g.handR, skin));
    if (animated && side === 1) {
      const bookProp = new THREE.Group();
      bookProp.name = "actor-book-prop";
      const book = rbox(0.2, 0.03, 0.27, 0.008, std(0x2f5d8a, 0.8));
      book.position.set(-0.12, -0.12, 0.06);
      book.rotation.set(1.2, 0, 0.1);
      bookProp.add(book);
      bookProp.userData.personDynamicAccessory = true;
      bookProp.visible = pose === "read";
      hand.add(bookProp);
      dynamicProps.book = bookProp;

      const phoneProp = new THREE.Group();
      phoneProp.name = "actor-phone-prop";
      const phone = rbox(0.075, 0.016, 0.15, 0.006, s.phone);
      phone.position.set(-0.05, -0.1, 0.02);
      phone.rotation.set(-0.4, 0, 0.1);
      phoneProp.add(phone);
      const screen = mesh(new THREE.PlaneGeometry(0.062, 0.128), s.screen);
      screen.rotation.x = -Math.PI / 2;
      screen.position.set(0, 0.0085, 0);
      phone.add(screen);
      phoneProp.userData.personDynamicAccessory = true;
      phoneProp.visible = pose === "phone";
      hand.add(phoneProp);
      dynamicProps.phone = phoneProp;
    } else if (pose === "read" && side === 1) {
      const book = rbox(0.2, 0.03, 0.27, 0.008, std(0x2f5d8a, 0.8));
      book.position.set(-0.12, -0.12, 0.06);
      book.rotation.set(1.2, 0, 0.1);
      hand.add(book);
    }
    if (animated && side === -1) {
      const penProp = new THREE.Group();
      penProp.name = "actor-pen-prop";
      const pen = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.15, 6), std(0x1d2b4d, 0.4));
      pen.position.set(0, -0.12, 0.03);
      pen.rotation.x = -0.9;
      penProp.add(pen);
      penProp.userData.personDynamicAccessory = true;
      penProp.visible = pose === "write";
      hand.add(penProp);
      dynamicProps.pen = penProp;
    } else if (pose === "write" && side === -1) {
      const pen = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.15, 6), std(0x1d2b4d, 0.4));
      pen.position.set(0, -0.12, 0.03);
      pen.rotation.x = -0.9;
      hand.add(pen);
    }
    if (!animated && pose === "phone" && side === 1) {
      const phone = rbox(0.075, 0.016, 0.15, 0.006, s.phone);
      phone.position.set(-0.05, -0.1, 0.02);
      phone.rotation.set(-0.4, 0, 0.1);
      hand.add(phone);
      const screen = mesh(new THREE.PlaneGeometry(0.062, 0.128), s.screen);
      screen.rotation.x = -Math.PI / 2;
      screen.position.set(0, 0.0085, 0);
      phone.add(screen);
    }
    if (side === 1) arms.left = { shoulder: arm as THREE.Bone, elbow: elbow as THREE.Bone, hand: hand as THREE.Bone };
    else arms.right = { shoulder: arm as THREE.Bone, elbow: elbow as THREE.Bone, hand: hand as THREE.Bone };
  }

  // 双腿
  const legs = {} as PersonRig["legs"];
  for (const side of [-1, 1] as const) {
    const hip = joint(animated);
    hip.position.set(side * 0.09, 0.91, 0);
    hip.rotation.x = seated ? -Math.PI / 2 + 0.03 : pose === "walk" ? 0.42 * -side : 0;
    frame.add(hip);
    hip.add(mesh(g.thigh, trousers));
    const knee = joint(animated);
    knee.position.y = -0.42;
    knee.rotation.x = seated ? Math.PI / 2 - 0.03 : pose === "walk" && side === 1 ? 0.55 : 0.03;
    hip.add(knee);
    const kneecap = mesh(new THREE.SphereGeometry(0.068, 14, 10), trousers);
    kneecap.scale.set(1, 0.86, 0.9);
    knee.add(kneecap);
    knee.add(mesh(g.shin, trousers));
    const ankle = joint(animated);
    ankle.position.y = -0.26;
    knee.add(ankle);
    const boot = g.boot.clone();
    boot.translate(0, 0.26, 0);
    ankle.add(mesh(boot, s.shoe));
    if (side === 1) legs.left = { hip: hip as THREE.Bone, knee: knee as THREE.Bone, ankle: ankle as THREE.Bone };
    else legs.right = { hip: hip as THREE.Bone, knee: knee as THREE.Bone, ankle: ankle as THREE.Bone };
  }

  if (animated) {
    const garmentStyle = style2 === "hoodie" ? "hoodie" : style2 === "coat" || style2 === "dress" ? "coat" : "tee";
    for (const detail of createGarmentDetails({ style: garmentStyle, detail: opts.garmentDetail ?? "low" })) {
      const anchor = detail.anchor === "torso"
        ? frame
        : detail.anchor === "upperArm"
          ? (detail.side === 1 ? arms.left.shoulder : arms.right.shoulder)
          : (detail.side === 1 ? arms.left.elbow : arms.right.elbow);
      const detailMesh = mesh(detail.geometry, detail.material === "cloth" ? shirt : innerMat);
      detailMesh.name = `garment-${detail.anchor}-${detail.side}-${detail.material}`;
      detailMesh.userData.garmentGeometry = true;
      anchor.add(detailMesh);
    }
  }

  root.scale.setScalar(opts.scale ?? 1);
  if (animated) {
    const rig: PersonRig = {
      body: body as THREE.Bone,
      head: head as THREE.Bone,
      arms,
      legs,
      eyes: eyeBones,
      gazes: gazeBones,
      brows: browBones,
      mouth: mouth as THREE.Bone,
      props: dynamicProps,
      setExpression: () => undefined,
      setPose: () => undefined,
      update: () => undefined,
    };
    installPoseController(rig, pose, seated, opts.lean ?? 0);
    const sharedGeometry = new Set<THREE.BufferGeometry>([
      g.head, g.hair.short, g.hair.long, g.jacket, g.upper, g.upperR, g.lower, g.lowerR, g.hand, g.handR, g.thigh, g.shin, g.boot,
    ]);
    skinPerson(root, sharedGeometry, ownedMaterials);
    root.userData.personRig = rig;
    root.userData.ownedMaterials = ownedMaterials;
    const updateHuman = attachHumanVisual(root, {
      body: rig.body, bodyRestY: 0.91, head: rig.head,
      props: [
        ...[rig.props.book, rig.props.phone].filter((object): object is THREE.Group => !!object).map((object) => ({ object, hand: "LeftHand" })),
        ...(rig.props.pen ? [{ object: rig.props.pen, hand: "RightHand" }] : []),
      ],
      grip: () => rig.props.book?.visible || rig.props.phone?.visible || rig.props.pen?.visible ? 0.6 : 0,
      leftArm: rig.arms.left.shoulder, rightArm: rig.arms.right.shoulder,
      leftElbow: rig.arms.left.elbow, rightElbow: rig.arms.right.elbow,
      leftHip: rig.legs.left.hip, rightHip: rig.legs.right.hip,
      leftKnee: rig.legs.left.knee, rightKnee: rig.legs.right.knee,
      leftAnkle: rig.legs.left.ankle, rightAnkle: rig.legs.right.ankle,
      blinkLeft: () => 1 - rig.eyes[1].scale.y, blinkRight: () => 1 - rig.eyes[0].scale.y,
      mouthOpen: () => Math.max(0, rig.mouth.scale.y - 0.08) * 0.65,
      smile: () => Math.max(0, rig.mouth.scale.x - 1) * 10,
      browLift: () => Math.max(0, rig.brows[0].position.y - 0.2165) * 100,
      gazeX: () => rig.gazes[0].position.x * 80, gazeY: () => rig.gazes[0].position.y * 80,
    }, opts.hairStyle === "long" || opts.hairStyle === "bun" ? "female" : "male");
    if (updateHuman) {
      const proceduralUpdate = rig.update;
      rig.update = (...args) => { proceduralUpdate(...args); updateHuman(); };
    }
  } else {
    // 普通场景的NPC保持静态合批，减少绘制调用。
    bakeGroupByMaterial(root);
  }
  return root;
}

type PoseChannel = { node: THREE.Object3D; path: "position" | "rotation"; axis: "x" | "y" | "z"; value: number };

function makePoseChannels(rig: PersonRig, pose: PersonPose, seated: boolean, lean: number): PoseChannel[] {
  const armPose = ARM_POSES[pose];
  const left = armPose.left;
  const right = armPose.right;
  const channels: PoseChannel[] = [
    { node: rig.body, path: "position", axis: "y", value: seated ? 0.1 : 0.91 },
    { node: rig.body, path: "rotation", axis: "x", value: lean + (pose === "talk" ? -0.025 : 0) },
    { node: rig.body, path: "rotation", axis: "z", value: pose === "talk" ? 0.012 : 0 },
    { node: rig.head, path: "rotation", axis: "x", value: pose === "phone" || pose === "read" ? 0.34 : pose === "write" ? 0.25 : pose === "lap" || pose.startsWith("reach") ? -0.035 : -lean * 0.5 },
    { node: rig.head, path: "rotation", axis: "y", value: pose === "point" ? 0.08 : 0 },
    { node: rig.arms.left.shoulder, path: "rotation", axis: "x", value: left.shoulder },
    { node: rig.arms.left.shoulder, path: "rotation", axis: "z", value: (left.side ?? 0) },
    { node: rig.arms.left.elbow, path: "rotation", axis: "x", value: left.elbow },
    { node: rig.arms.left.hand, path: "rotation", axis: "x", value: pose === "phone" || pose === "read" ? -0.14 : -0.04 },
    { node: rig.arms.right.shoulder, path: "rotation", axis: "x", value: right.shoulder },
    { node: rig.arms.right.shoulder, path: "rotation", axis: "z", value: -(right.side ?? 0) },
    { node: rig.arms.right.elbow, path: "rotation", axis: "x", value: right.elbow },
    { node: rig.arms.right.hand, path: "rotation", axis: "x", value: pose === "phone" || pose === "read" ? -0.14 : -0.04 },
  ];
  for (const leg of [rig.legs.left, rig.legs.right]) {
    channels.push(
      { node: leg.hip, path: "rotation", axis: "x", value: seated ? -Math.PI / 2 + 0.03 : 0 },
      { node: leg.knee, path: "rotation", axis: "x", value: seated ? Math.PI / 2 - 0.03 : 0.03 },
      { node: leg.ankle, path: "rotation", axis: "x", value: 0 },
    );
  }
  return channels;
}

function readChannel(channel: PoseChannel): number {
  return channel.node[channel.path][channel.axis];
}

function writeChannel(channel: PoseChannel, value: number): void {
  channel.node[channel.path][channel.axis] = value;
}

function expressionForPose(pose: PersonPose): PersonExpression {
  if (pose === "talk") return "talk";
  if (pose === "listen") return "listen";
  if (pose === "read" || pose === "write" || pose === "phone") return "think";
  if (pose === "stand") return "softSmile";
  return "neutral";
}

function expressionValues(expression: PersonExpression): [browLift: number, browTilt: number, mouthOpen: number, smile: number, gazeDown: number] {
  switch (expression) {
    case "listen": return [0.0022, 0.018, 0.16, 0.15, 0];
    case "think": return [0.0008, -0.012, 0.1, 0, 0.0007];
    case "softSmile": return [0, 0, 0.1, 0.38, 0];
    case "talk": return [0.0012, 0.006, 0.48, 0.08, 0];
    default: return [0, 0, 0.08, 0.02, 0];
  }
}

function installPoseController(rig: PersonRig, initialPose: PersonPose, seated: boolean, lean: number): void {
  let channels = makePoseChannels(rig, initialPose, seated, lean);
  let current = channels.map((channel) => ({ ...channel, value: readChannel(channel) }));
  let transition: { from: number[]; to: number[]; elapsed: number; duration: number } | null = null;
  let expression = expressionForPose(initialPose);
  let expressionBlend = expressionValues(expression);
  let expressionTransition: { from: number[]; to: number[]; elapsed: number; duration: number } | null = null;
  let talkPulse = 0;
  rig.setExpression = (next, duration = 0.24): void => {
    if (next === expression) return;
    const to = expressionValues(next);
    expressionTransition = duration > 0 ? { from: expressionBlend.slice(), to, elapsed: 0, duration } : null;
    expression = next;
    if (duration <= 0) expressionBlend = to;
  };
  rig.setPose = (pose, isSeated, duration = 0.42): void => {
    channels = makePoseChannels(rig, pose, isSeated, lean);
    const to = channels.map((channel) => channel.value);
    const from = channels.map((channel, i) => {
      const prev = current[i];
      return prev ? readChannel(prev) : readChannel(channel);
    });
    transition = duration > 0 ? { from, to, elapsed: 0, duration } : null;
    current = channels.map((channel, i) => ({ ...channel, value: duration > 0 ? from[i] : to[i] }));
    if (duration <= 0) current.forEach((channel, i) => writeChannel(channel, to[i]));
    rig.setExpression(expressionForPose(pose), Math.min(0.32, duration));
    if (rig.props.book) rig.props.book.visible = pose === "read";
    if (rig.props.phone) rig.props.phone.visible = pose === "phone";
    if (rig.props.pen) rig.props.pen.visible = pose === "write";
  };
  rig.update = (dt, time, walking, walkPhase, seed): void => {
    if (transition) {
      transition.elapsed += dt;
      const linear = Math.min(1, transition.elapsed / transition.duration);
      const eased = linear * linear * (3 - 2 * linear);
      current = channels.map((channel, i) => ({ ...channel, value: THREE.MathUtils.lerp(transition!.from[i], transition!.to[i], eased) }));
      if (linear >= 1) transition = null;
    }
    for (const channel of current) writeChannel(channel, channel.value);

    if (expressionTransition) {
      expressionTransition.elapsed += dt;
      const linear = Math.min(1, expressionTransition.elapsed / expressionTransition.duration);
      const eased = linear * linear * (3 - 2 * linear);
      expressionBlend = expressionTransition.from.map((value, i) => THREE.MathUtils.lerp(value, expressionTransition!.to[i], eased)) as typeof expressionBlend;
      if (linear >= 1) expressionTransition = null;
    }

    const breath = Math.sin(time * 1.65 + seed) * 0.003;
    rig.body.position.y += (walking ? Math.abs(Math.sin(walkPhase * 2)) * 0.007 : breath * 0.7);
    rig.body.scale.y = 1 + breath * 0.35;
    rig.body.rotation.x += walking ? 0.025 : breath * 1.4;
    rig.body.rotation.y = Math.sin(time * 0.47 + seed) * (walking ? 0.012 : 0.008);
    rig.body.rotation.z += walking ? Math.sin(walkPhase) * 0.016 : Math.sin(time * 0.72 + seed) * 0.009;
    rig.head.rotation.y += Math.sin(time * 0.38 + seed * 1.7) * 0.027;
    rig.head.rotation.z = Math.sin(time * 0.63 + seed) * 0.014;

    if (walking) {
      const leftSwing = Math.sin(walkPhase);
      const rightSwing = Math.sin(walkPhase + Math.PI);
      rig.legs.left.hip.rotation.x += leftSwing * 0.36;
      rig.legs.right.hip.rotation.x += rightSwing * 0.36;
      rig.legs.left.knee.rotation.x += Math.max(0, Math.cos(walkPhase)) * 0.62;
      rig.legs.right.knee.rotation.x += Math.max(0, Math.cos(walkPhase + Math.PI)) * 0.62;
      rig.legs.left.ankle.rotation.x = -rig.legs.left.hip.rotation.x * 0.45 - rig.legs.left.knee.rotation.x * 0.7;
      rig.legs.right.ankle.rotation.x = -rig.legs.right.hip.rotation.x * 0.45 - rig.legs.right.knee.rotation.x * 0.7;
      rig.arms.left.shoulder.rotation.x -= leftSwing * 0.19;
      rig.arms.right.shoulder.rotation.x -= rightSwing * 0.19;
      rig.arms.left.elbow.rotation.x += 0.08 + Math.max(0, leftSwing) * 0.12;
      rig.arms.right.elbow.rotation.x += 0.08 + Math.max(0, rightSwing) * 0.12;
    } else {
      rig.arms.left.shoulder.rotation.z += Math.sin(time * 0.8 + seed) * 0.012;
      rig.arms.right.shoulder.rotation.z -= Math.sin(time * 0.8 + seed) * 0.012;
    }

    const blinkPhase = THREE.MathUtils.euclideanModulo(time + seed * 1.31, 4.2);
    rig.eyes.forEach((eye, i) => {
      // 两眼错开约 90 ms，避免同步机械眨眼。
      const phase = THREE.MathUtils.euclideanModulo(blinkPhase + i * 0.09, 4.2);
      const blink = phase < 0.13 ? Math.sin((phase / 0.13) * Math.PI) : 0;
      eye.scale.y = 1 - blink * 0.9;
      const gaze = rig.gazes[i];
      if (gaze) {
        const focusX = expression === "listen" ? Math.sin(time * 0.19 + seed * 0.8) * 0.0015 : Math.sin(time * 0.31 + seed + i * 0.2) * 0.0022;
        gaze.position.x = focusX;
        gaze.position.y = Math.sin(time * 0.24 + seed * 0.7) * 0.0011 - expressionBlend[4];
      }
    });
    const [browLift, browTilt, mouthOpen, smile] = expressionBlend;
    rig.brows.forEach((brow, i) => {
      const side = i === 0 ? -1 : 1;
      brow.position.y = 0.2165 + browLift + Math.sin(time * 0.53 + seed + i * 1.8) * (expression === "listen" ? 0.0004 : 0.00015);
      brow.rotation.z = -side * 0.1 + side * browTilt;
    });
    talkPulse += (expression === "talk" ? dt * (5.5 + Math.sin(time * 1.9) * 1.1) : -talkPulse * Math.min(1, dt * 8));
    rig.mouth.scale.x = 1 + smile * 0.12 - mouthOpen * 0.08;
    rig.mouth.scale.y = 0.08 + mouthOpen * (expression === "talk" ? 0.75 + Math.sin(talkPulse) * 0.45 : 0.32);
    rig.mouth.rotation.z = smile * 0.075 + Math.sin(time * 0.55 + seed) * 0.004;
    rig.mouth.position.y = 0.132 + smile * 0.0006;
  };
  rig.setPose(initialPose, seated, 0);
}

/** 将各关节刚性蒙皮到共享骨架；每个人仅保留按材质合并的少量网格。 */
function skinPerson(root: THREE.Group, sharedGeometry: ReadonlySet<THREE.BufferGeometry>, ownedMaterials: Set<THREE.Material>): void {
  root.updateMatrixWorld(true);
  const rootInverse = root.matrixWorld.clone().invert();
  const meshes: THREE.Mesh[] = [];
  const bones: THREE.Bone[] = [];
  root.traverse((object) => {
    if ((object as THREE.Bone).isBone) bones.push(object as THREE.Bone);
    if ((object as THREE.Mesh).isMesh) {
      let parent: THREE.Object3D | null = object;
      while (parent && parent !== root && !parent.userData.personDynamicAccessory) parent = parent.parent;
      if (!parent?.userData.personDynamicAccessory) meshes.push(object as THREE.Mesh);
    }
  });
  const boneIndex = new Map(bones.map((bone, index) => [bone, index]));
  type SkinBucket = "cloth" | "skin" | "hair" | "eyeWhite" | "iris" | "faceDetail" | "phone" | "screen";
  const buckets = new Map<SkinBucket, THREE.BufferGeometry[]>();
  const localGeometries = new Set<THREE.BufferGeometry>();
  const s = shared();
  const classify = (material: THREE.Material): SkinBucket => {
    if (material === s.eyeWhite) return "eyeWhite";
    if (material === s.iris) return "iris";
    if (material === s.lip) return "faceDetail";
    if (material === s.phone) return "phone";
    if (material === s.screen) return "screen";
    if (material.name === "person-hair") return "hair";
    if (material.name === "person-face-detail") return "faceDetail";
    if (material.name === "person-skin" || material.name === "person-face") return "skin";
    return "cloth";
  };
  const makeTarget = (bucket: SkinBucket): THREE.Material => {
    if (bucket === "phone") return s.phone;
    if (bucket === "screen") return s.screen;
    const params: THREE.MeshStandardMaterialParameters = { color: 0xffffff, vertexColors: true, metalness: 0.02, side: THREE.DoubleSide };
    if (bucket === "skin") Object.assign(params, { roughness: 0.55, emissive: 0x3a1608, emissiveIntensity: 0.05 });
    else if (bucket === "hair") Object.assign(params, { roughness: 0.42, metalness: 0.08 });
    else if (bucket === "eyeWhite") Object.assign(params, { roughness: 0.3, metalness: 0 });
    else if (bucket === "iris") Object.assign(params, { roughness: 0.34, metalness: 0 });
    else if (bucket === "faceDetail") Object.assign(params, { roughness: 0.72, metalness: 0 });
    else Object.assign(params, { roughness: 0.86 });
    const target = new THREE.MeshStandardMaterial(params);
    target.name = `person-${bucket}`;
    ownedMaterials.add(target);
    return target;
  };
  const targets = new Map<SkinBucket, THREE.Material>();
  for (const source of meshes) {
    let owner: THREE.Object3D | null = source;
    while (owner && !(owner as THREE.Bone).isBone) owner = owner.parent;
    if (!owner) throw new Error(`Animated character mesh "${source.name}" has no bone parent`);
    const index = boneIndex.get(owner as THREE.Bone);
    if (index === undefined) throw new Error("Animated character bone is absent from its skeleton");
    let geometry = source.geometry.clone();
    if (geometry.index) {
      const flat = geometry.toNonIndexed();
      geometry.dispose();
      geometry = flat;
    }
    geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(rootInverse, source.matrixWorld));
    const sourceColor = geometry.getAttribute("color");
    for (const name of Object.keys(geometry.attributes)) if (!["position", "normal", "color"].includes(name)) geometry.deleteAttribute(name);
    if (!geometry.getAttribute("normal")) geometry.computeVertexNormals();
    const material = source.material as THREE.MeshStandardMaterial;
    const bucket = classify(material);
    const target = targets.get(bucket) ?? makeTarget(bucket);
    targets.set(bucket, target);
    const count = geometry.getAttribute("position").count;
    if (bucket !== "phone" && bucket !== "screen") {
      const color = new Float32Array(count * 3);
      const base = material.color ?? new THREE.Color(1, 1, 1);
      for (let i = 0; i < count; i++) {
        const factor = material.vertexColors && sourceColor && i < sourceColor.count;
        color[i * 3] = base.r * (factor ? sourceColor!.getX(i) : 1);
        color[i * 3 + 1] = base.g * (factor ? sourceColor!.getY(i) : 1);
        color[i * 3 + 2] = base.b * (factor ? sourceColor!.getZ(i) : 1);
      }
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(color, 3));
    } else {
      geometry.deleteAttribute("color");
      if (bucket === "phone") geometry.deleteAttribute("uv");
    }
    const indices = new Uint16Array(count * 4);
    const weights = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      indices[i * 4] = index;
      weights[i * 4] = 1;
    }
    geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(indices, 4));
    geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(weights, 4));
    const list = buckets.get(bucket) ?? [];
    list.push(geometry);
    buckets.set(bucket, list);
    if (!sharedGeometry.has(source.geometry)) localGeometries.add(source.geometry);
  }
  const skeleton = new THREE.Skeleton(bones);
  skeleton.calculateInverses();
  const sourceMaterials = new Set(meshes.map((source) => source.material).filter((material): material is THREE.Material => !Array.isArray(material)));
  for (const [bucket, geometries] of buckets) {
    const merged = mergeGeometries(geometries, false);
    geometries.forEach((geometry) => geometry.dispose());
    if (!merged) throw new Error(`Could not merge animated character ${bucket} geometry`);
    const skin = new THREE.SkinnedMesh(merged, targets.get(bucket)!);
    skin.name = "person-skin";
    skin.castShadow = true;
    skin.receiveShadow = true;
    skin.bind(skeleton, root.matrixWorld.clone());
    root.add(skin);
  }
  meshes.forEach((mesh) => mesh.removeFromParent());
  localGeometries.forEach((geometry) => geometry.dispose());
  sourceMaterials.forEach((material) => {
    if (ownedMaterials.has(material)) {
      material.dispose();
      ownedMaterials.delete(material);
    }
  });
  let dynamicDraws = 0;
  let triangles = 0;
  let vertices = 0;
  root.traverse((object) => {
    if (!(object as THREE.Mesh).isMesh) return;
    const m = object as THREE.Mesh;
    const count = m.geometry.getAttribute("position").count;
    vertices += count;
    triangles += (m.geometry.index?.count ?? count) / 3;
    let parent: THREE.Object3D | null = object;
    while (parent && parent !== root && !parent.userData.personDynamicAccessory) parent = parent.parent;
    if (parent?.userData.personDynamicAccessory) dynamicDraws += 1;
  });
  root.userData.personGeometryStats = {
    draws: buckets.size + dynamicDraws,
    triangles,
    vertices,
    joints: bones.length,
  };
}
