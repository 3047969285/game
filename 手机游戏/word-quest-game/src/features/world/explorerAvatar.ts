import * as THREE from "three";
import { glassCrystal } from "./materials";

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
  cape: THREE.Group;
  /** 面部（表情控制） */
  eyeL: THREE.Mesh;
  eyeR: THREE.Mesh;
  brow: THREE.Mesh;
  mouth: THREE.Mesh;
  /** 服装材质（换装染色） */
  mats: {
    jacket: THREE.MeshStandardMaterial;
    trim: THREE.MeshStandardMaterial;
    cape: THREE.MeshStandardMaterial;
  };
}

/** 带膝关节的腿：髋 group 内含大腿，膝 group 内含小腿 + 脚 */
function makeLeg(thighMat: THREE.Material, shinMat: THREE.Material, bootMat: THREE.Material): LegRig {
  const hip = new THREE.Group();
  const thighLen = 0.4;
  const shinLen = 0.38;
  const r1 = 0.14;
  const r2 = 0.115;

  const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(r1, thighLen, 5, 10), thighMat);
  thigh.position.y = -(thighLen / 2 + r1 * 0.3);
  thigh.castShadow = true;
  hip.add(thigh);

  const knee = new THREE.Group();
  knee.position.y = -(thighLen + r1 * 0.2);
  hip.add(knee);

  const shin = new THREE.Mesh(new THREE.CapsuleGeometry(r2, shinLen, 5, 10), shinMat);
  shin.position.y = -(shinLen / 2 + r2 * 0.3);
  shin.castShadow = true;
  knee.add(shin);

  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.36), bootMat);
  foot.position.set(0, -(shinLen + r2 * 0.4), 0.08);
  foot.castShadow = true;
  knee.add(foot);

  return { hip, knee };
}

/** 创建一条可摆动的肢体（关节在 group 原点，肢体向下延伸） */
function makeLimb(
  upperMat: THREE.Material,
  lowerMat: THREE.Material,
  opts: { upperR: number; upperLen: number; lowerR: number; lowerLen: number; endMat?: THREE.Material; endR?: number; footMat?: THREE.Material }
): THREE.Group {
  const g = new THREE.Group();

  const upper = new THREE.Mesh(new THREE.CapsuleGeometry(opts.upperR, opts.upperLen, 5, 10), upperMat);
  upper.position.y = -(opts.upperLen / 2 + opts.upperR);
  upper.castShadow = true;
  g.add(upper);

  const lowerTop = -(opts.upperLen + opts.upperR * 2);
  const lower = new THREE.Mesh(new THREE.CapsuleGeometry(opts.lowerR, opts.lowerLen, 5, 10), lowerMat);
  lower.position.y = lowerTop - (opts.lowerLen / 2 + opts.lowerR);
  lower.castShadow = true;
  g.add(lower);

  const endY = lowerTop - (opts.lowerLen + opts.lowerR * 2);
  if (opts.footMat) {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(opts.lowerR * 2.1, 0.1, 0.34), opts.footMat);
    foot.position.set(0, endY + 0.04, 0.08);
    foot.castShadow = true;
    g.add(foot);
  } else if (opts.endMat && opts.endR) {
    const hand = new THREE.Mesh(new THREE.SphereGeometry(opts.endR, 12, 10), opts.endMat);
    hand.position.y = endY;
    hand.castShadow = true;
    g.add(hand);
  }
  return g;
}

/** 探险者角色（第三人称、骨骼化人形） */
export function createExplorerAvatar(): THREE.Group {
  const root = new THREE.Group();
  root.name = "Explorer";

  // 材质：夹克 / 裤装 / 皮肤 / 靴子 / 头发 / 镶边
  const jacket = new THREE.MeshStandardMaterial({ color: 0x2f4f7a, roughness: 0.62, metalness: 0.08 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x2a3340, roughness: 0.78, metalness: 0.04 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xefc4a0, roughness: 0.66, metalness: 0.02 });
  const boots = new THREE.MeshStandardMaterial({ color: 0x1a2530, roughness: 0.7, metalness: 0.06 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x2a1d16, roughness: 0.8, metalness: 0.02 });
  const trim = new THREE.MeshStandardMaterial({ color: 0x5b8def, roughness: 0.4, metalness: 0.3, emissive: 0x1b3a78, emissiveIntensity: 0.4 });

  // 骨盆
  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.26, 0.3), pants);
  pelvis.position.y = 0.98;
  pelvis.castShadow = true;
  root.add(pelvis);

  // 躯干
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.4, 6, 14), jacket);
  torso.position.y = 1.32;
  torso.scale.set(1.12, 1, 0.78);
  torso.castShadow = true;
  root.add(torso);

  // 胸前镶边（科技感腰带 / 领口）
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.04, 8, 20), trim);
  collar.position.y = 1.52;
  collar.rotation.x = Math.PI / 2;
  collar.scale.set(1.05, 0.7, 1);
  root.add(collar);

  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.34), trim);
  belt.position.y = 1.1;
  root.add(belt);

  // 背包
  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.22), jacket);
  pack.position.set(0, 1.34, -0.32);
  pack.castShadow = true;
  const packTrim = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.24), trim);
  packTrim.position.set(0, 1.5, -0.32);
  root.add(pack, packTrim);

  // 头部（含颈、发）
  const headGroup = new THREE.Group();
  headGroup.position.y = 1.6;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.14, 10), skin);
  neck.position.y = 0.04;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 22, 22), skin);
  head.position.y = 0.28;
  head.castShadow = true;
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.245, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.62),
    hair
  );
  hairCap.position.y = 0.31;
  headGroup.add(neck, head, hairCap);

  // 面部：眼睛 + 高光
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x16202c, roughness: 0.3, metalness: 0.1 });
  const eyeGeo = new THREE.SphereGeometry(0.035, 10, 10);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(0.085, 0.3, 0.205);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeR.position.set(-0.085, 0.3, 0.205);
  const browMat = new THREE.MeshStandardMaterial({ color: 0x2a1d16, roughness: 0.8 });
  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.03, 0.04), browMat);
  brow.position.set(0, 0.37, 0.2);
  // 嘴（弯曲程度表现表情）
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x7a4030, roughness: 0.6 });
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.022, 0.03), mouthMat);
  mouth.position.set(0, 0.2, 0.216);
  headGroup.add(eyeL, eyeR, brow, mouth);
  root.add(headGroup);

  // 披风（挂于肩部，行进时飘动）
  const cape = new THREE.Group();
  cape.position.set(0, 1.52, -0.16);
  const capeMat = new THREE.MeshStandardMaterial({
    color: 0x3b6bd6,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
    emissive: 0x14275e,
    emissiveIntensity: 0.25,
  });
  const capeMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.95, 1, 5), capeMat);
  capeMesh.position.y = -0.45;
  capeMesh.castShadow = true;
  cape.add(capeMesh);
  cape.rotation.x = -0.18;
  root.add(cape);

  // 双腿（髋 + 膝关节）
  const leftLeg = makeLeg(pants, pants, boots);
  leftLeg.hip.position.set(0.16, 0.88, 0);
  const rightLeg = makeLeg(pants, pants, boots);
  rightLeg.hip.position.set(-0.16, 0.88, 0);
  root.add(leftLeg.hip, rightLeg.hip);

  // 双臂（肩关节）
  const leftArm = makeLimb(jacket, jacket, { upperR: 0.1, upperLen: 0.26, lowerR: 0.088, lowerLen: 0.24, endMat: skin, endR: 0.095 });
  leftArm.position.set(0.42, 1.5, 0);
  const rightArm = makeLimb(jacket, jacket, { upperR: 0.1, upperLen: 0.26, lowerR: 0.088, lowerLen: 0.24, endMat: skin, endR: 0.095 });
  rightArm.position.set(-0.42, 1.5, 0);
  root.add(leftArm, rightArm);

  // 提灯（挂于右手附近）
  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), glassCrystal(0xfbbf24, 0.9));
  lantern.position.set(-0.5, 1.0, 0.12);
  const lanternLight = new THREE.PointLight(0xfbbf24, 1.2, 10);
  lanternLight.position.copy(lantern.position);
  root.add(lantern, lanternLight);

  // 脚下光环（移动时脉冲）
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.74, 36),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.32, side: THREE.DoubleSide })
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
    mats: { jacket, trim, cape: capeMat },
  };
  root.userData.rig = rig;
  return root;
}
