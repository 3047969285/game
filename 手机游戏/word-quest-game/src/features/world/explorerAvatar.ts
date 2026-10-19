import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { MergedBuilder, type Placement } from "./detailKit";
import { hairGeometry, bootGeometry, gearGeometry, zipperGeometry, handGeometry, handGeometryFor, headGeometry, jacketGeometry, lowerSleeveGeometry, shinGeometry, thighGeometry, upperSleeveGeometry } from "./avatarBody";
import { mirrorX } from "./sdf";
import { seededRand } from "./utils";

/** 单腿骨骼：髋关节 + 膝关节（用于屈膝步态 / IK） */
export interface LegRig {
  hip: THREE.Group;
  knee: THREE.Group;
  ankle: THREE.Group;
}

/** 角色骨骼引用（供走路动画驱动） */
export interface AvatarRig {
  leftLeg: LegRig;
  rightLeg: LegRig;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  head: THREE.Group;
  /** 披风 / 围巾尾端（行进时向后飘动，绕 X 轴正向旋转 = 向身后甩） */
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


// ─────────────────────────────────────────────────────────────
// 表面材质：对象空间微表面（布纹 / 皮革颗粒 / 皮肤毛孔 / 拉丝金属）。
// 图案跟随肢体，不依赖 UV，肢体摆动时不会"游泳"；皮肤另加掠射次表面散射（暖红边缘光）。
// ─────────────────────────────────────────────────────────────
type SurfaceKind = "fabric" | "leather" | "skin" | "metal";

const SURFACE_GLSL = /* glsl */ `
varying vec3 vAvLoc;
varying mat3 vAvNM;
float avH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float avN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(avH(i), avH(i + vec3(1, 0, 0)), f.x), mix(avH(i + vec3(0, 1, 0)), avH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(avH(i + vec3(0, 0, 1)), avH(i + vec3(1, 0, 1)), f.x), mix(avH(i + vec3(0, 1, 1)), avH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`;

const SURFACE_PARAMS: Record<SurfaceKind, { fine: number; mid: number; weave: number; bump: number; tone: number; rough: number }> = {
  fabric: { fine: 260, mid: 48, weave: 1, bump: 0.0004, tone: 0.06, rough: 0.1 },
  leather: { fine: 210, mid: 34, weave: 0, bump: 0.0012, tone: 0.1, rough: 0.16 },
  skin: { fine: 330, mid: 70, weave: 0, bump: 0.00022, tone: 0.025, rough: 0.06 },
  metal: { fine: 420, mid: 22, weave: 0, bump: 0.0006, tone: 0.1, rough: 0.12 },
};

function applySurface(mat: THREE.MeshStandardMaterial, kind: SurfaceKind): THREE.MeshStandardMaterial {
  const c = SURFACE_PARAMS[kind];
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = "varying vec3 vAvLoc;\nvarying mat3 vAvNM;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n vAvLoc = position;\n vAvNM = normalMatrix;");
    const height = kind === "metal"
      ? `avN(vec3(p.x * ${c.fine.toFixed(1)}, p.y * 6.0, p.z * ${c.fine.toFixed(1)})) * 0.5 + avN(p * ${c.mid.toFixed(1)}) * 0.5`
      : `avN(p * ${c.mid.toFixed(1)}) * 0.55 + avN(p * ${c.fine.toFixed(1)}) * 0.45${c.weave ? " + (sin(p.x * 520.0) * sin(p.y * 520.0) + sin(p.y * 520.0 + 1.0) * sin(p.z * 520.0)) * 0.12" : ""}`;
    shader.fragmentShader = SURFACE_GLSL + `float avHeight(vec3 p) { return ${height}; }\n` + shader.fragmentShader
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         float avT = avN(vAvLoc * ${c.mid.toFixed(1)} * 0.6);
         diffuseColor.rgb *= 1.0 + (avT - 0.5) * ${(c.tone * 2).toFixed(3)};`
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
         roughnessFactor = clamp(roughnessFactor + (avT - 0.5) * ${(c.rough * 2).toFixed(3)}, 0.05, 1.0);`
      )
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
         {
           float avFade = 1.0 - smoothstep(0.004, 0.03, length(fwidth(vAvLoc)));
           if (avFade > 0.01) {
             const float aE = 0.0008;
             vec3 p0 = vAvLoc;
             float h0 = avHeight(p0);
             vec3 g = vec3(avHeight(p0 + vec3(aE, 0.0, 0.0)) - h0, avHeight(p0 + vec3(0.0, aE, 0.0)) - h0, avHeight(p0 + vec3(0.0, 0.0, aE)) - h0) / aE;
             vec3 gv = vAvNM * g;
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * ${c.bump.toFixed(4)} * avFade);
           }
         }`
      )
      .replace(
        "#include <opaque_fragment>",
        `${kind === "skin" ? `{
           // 皮肤次表面散射近似：掠射角处偏暖红的透光边缘
           float avF = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.6);
           outgoingLight += vec3(0.3, 0.09, 0.05) * avF * 0.1;
         }` : ""}
         #include <opaque_fragment>`
      );
  };
  mat.customProgramCacheKey = () => `avatar-${kind}-${mat.vertexColors ? "vc" : "plain"}`;
  mat.needsUpdate = true;
  return mat;
}

// ─────────────────────────────────────────────────────────────
// 材质集
// ─────────────────────────────────────────────────────────────
interface Mats {
  jacket: THREE.MeshStandardMaterial;
  inner: THREE.MeshStandardMaterial;
  trousers: THREE.MeshStandardMaterial;
  skin: THREE.MeshStandardMaterial;
  skinFace: THREE.MeshStandardMaterial;
  leather: THREE.MeshStandardMaterial;
  leatherDark: THREE.MeshStandardMaterial;
  boot: THREE.MeshStandardMaterial;
  sole: THREE.MeshStandardMaterial;
  hair: THREE.MeshStandardMaterial;
  brow: THREE.MeshStandardMaterial;
  trim: THREE.MeshStandardMaterial;
  scarf: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  armor: THREE.MeshPhysicalMaterial;
  eyeWhite: THREE.MeshPhysicalMaterial;
  lip: THREE.MeshStandardMaterial;
  tunicVc: THREE.MeshStandardMaterial;
  paper: THREE.MeshStandardMaterial;
}

function createMats(): Mats {
  const std = (color: number, roughness: number, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  const skinTone = 0xe2b898;
  return {
    jacket: applySurface(std(0x3f4a3c, 0.84, 0, { side: THREE.DoubleSide }), "fabric"),
    inner: applySurface(std(0xeceae2, 0.9, 0, { side: THREE.DoubleSide }), "fabric"),
    trousers: applySurface(std(0x34455c, 0.88), "fabric"),
    skin: applySurface(std(skinTone, 0.55, 0, { emissive: 0x3a1608, emissiveIntensity: 0.05 }), "skin"),
    skinFace: applySurface(std(skinTone, 0.5, 0, { emissive: 0x3a1608, emissiveIntensity: 0.05, vertexColors: true }), "skin"),
    leather: applySurface(std(0x6b4630, 0.62, 0.04), "leather"),
    leatherDark: applySurface(std(0x3f2a1d, 0.66, 0.04), "leather"),
    boot: applySurface(std(0x6b4a30, 0.6, 0.05), "leather"),
    sole: std(0x1b1815, 0.9),
    hair: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.42, metalness: 0.15, side: THREE.DoubleSide }),
    brow: std(0x3a281c, 0.7),
    trim: std(0xc9a24a, 0.4, 0.75, { emissive: 0x5a3a08, emissiveIntensity: 0.18 }),
    scarf: applySurface(std(0x9c3a2e, 0.9, 0, { side: THREE.DoubleSide }), "fabric"),
    brass: applySurface(std(0xb68a3c, 0.34, 0.85), "metal"),
    armor: Object.assign(new THREE.MeshPhysicalMaterial({ color: 0x1c2733, roughness: 0.38, metalness: 0.6, clearcoat: 0.7, clearcoatRoughness: 0.25 }), {}),
    eyeWhite: new THREE.MeshPhysicalMaterial({ color: 0xf3eeea, roughness: 0.22, clearcoat: 0.9, clearcoatRoughness: 0.08 }),
    lip: std(0x9a5048, 0.46),
    tunicVc: applySurface(std(0xffffff, 0.84, 0, { vertexColors: true, side: THREE.DoubleSide }), "fabric"),
    paper: std(0xffe2a0, 0.5, 0, { emissive: 0xffa53a, emissiveIntensity: 1.0, transparent: true, opacity: 0.92 }),
  };
}

// ─────────────────────────────────────────────────────────────
// 小工具
// ─────────────────────────────────────────────────────────────
class Parts {
  private readonly b = new MergedBuilder();
  add(geo: THREE.BufferGeometry, mat: THREE.Material, at: Placement = {}): void {
    this.b.add(geo, mat, at);
  }
  box(mat: THREE.Material, w: number, h: number, d: number, at: Placement = {}, r = 0.01): void {
    this.b.add(new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2.05, h / 2.05, d / 2.05)), mat, at);
  }
  cyl(mat: THREE.Material, rt: number, rb: number, h: number, at: Placement = {}, seg = 16): void {
    this.b.add(new THREE.CylinderGeometry(rt, rb, h, seg, 1), mat, at);
  }
  ball(mat: THREE.Material, r: number, at: Placement = {}, seg = 14): void {
    this.b.add(new THREE.SphereGeometry(r, seg, Math.max(8, seg - 4)), mat, at);
  }
  torus(mat: THREE.Material, r: number, tube: number, at: Placement = {}, arc = Math.PI * 2, seg = 22): void {
    this.b.add(new THREE.TorusGeometry(r, tube, 8, seg, arc), mat, at);
  }
  build(parent: THREE.Object3D, name: string): void {
    this.b.build(parent, name, {});
  }
}

function group(x: number, y: number, z: number): THREE.Group {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  return g;
}

// ─────────────────────────────────────────────────────────────
// 头部：雕刻面部（高斯隆起 / 凹陷）、眼睛、发丝、发髻、头带
// ─────────────────────────────────────────────────────────────
/** 虹膜贴图：放射纤维 + 角膜缘暗环 + 瞳孔 + 高光点 */
function irisTexture(): THREE.CanvasTexture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const rnd = seededRand(77);
  g.fillStyle = "#2a1a10";
  g.fillRect(0, 0, size, size);
  const cx = size / 2;
  const grad = g.createRadialGradient(cx, cx, size * 0.08, cx, cx, size * 0.5);
  grad.addColorStop(0, "#5a3a1f");
  grad.addColorStop(0.55, "#8a5a2c");
  grad.addColorStop(0.88, "#3a2412");
  grad.addColorStop(1, "#150c06");
  g.fillStyle = grad;
  g.beginPath();
  g.arc(cx, cx, size * 0.5, 0, Math.PI * 2);
  g.fill();
  for (let i = 0; i < 220; i++) {
    const a = rnd() * Math.PI * 2;
    const r0 = size * (0.1 + rnd() * 0.08);
    const r1 = size * (0.28 + rnd() * 0.2);
    g.strokeStyle = `rgba(${rnd() > 0.5 ? "190,140,80" : "60,36,18"},${0.12 + rnd() * 0.25})`;
    g.lineWidth = 1 + rnd() * 1.4;
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * r0, cx + Math.sin(a) * r0);
    g.lineTo(cx + Math.cos(a + (rnd() - 0.5) * 0.12) * r1, cx + Math.sin(a + (rnd() - 0.5) * 0.12) * r1);
    g.stroke();
  }
  g.fillStyle = "#060403";
  g.beginPath();
  g.arc(cx, cx, size * 0.115, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

let irisTex: THREE.CanvasTexture | undefined;

function makeEye(m: Mats, side: 1 | -1): THREE.Mesh {
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.0128, 22, 16), m.eyeWhite);
  eye.position.set(side * 0.034, 0.2, 0.0685);
  eye.scale.set(1.0, 0.94, 1.0);
  irisTex ??= irisTexture();
  const iris = new THREE.Mesh(new THREE.CircleGeometry(0.0072, 28), new THREE.MeshStandardMaterial({ map: irisTex, roughness: 0.28, metalness: 0 }));
  iris.position.set(0, 0, 0.0124);
  const cornea = new THREE.Mesh(
    new THREE.SphereGeometry(0.0072, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.02, metalness: 0, transparent: true, opacity: 0.16, clearcoat: 1, clearcoatRoughness: 0.02 })
  );
  cornea.rotation.x = Math.PI / 2;
  cornea.position.set(0, 0, 0.0098);
  // 眼睑：上下两片略大于眼球的球冠（随眼球整体缩放 = 眨眼时闭合）
  const lidGeo = (from: number, to: number): THREE.BufferGeometry => new THREE.SphereGeometry(0.0139, 22, 10, 0, Math.PI * 2, from, to - from);
  const upper = new THREE.Mesh(lidGeo(0, Math.PI * 0.45), m.skin);
  const lower = new THREE.Mesh(lidGeo(Math.PI * 0.86, Math.PI), m.skin);
  const lashes = new THREE.Mesh(new THREE.TorusGeometry(0.0132, 0.0006, 4, 18, Math.PI * 0.85), m.brow);
  lashes.rotation.set(0, 0, Math.PI * 0.075);
  lashes.position.set(0, 0.0, 0.0);
  lashes.scale.set(1, 1, 0.5);
  lashes.rotation.x = -0.38;
  lashes.position.set(0, 0.004, 0.0058);
  eye.add(iris, cornea, upper, lower, lashes);
  return eye;
}

function buildHead(m: Mats, rig: { eyeL?: THREE.Mesh; eyeR?: THREE.Mesh; brow?: THREE.Mesh; mouth?: THREE.Mesh }): { head: THREE.Group; browY: number; mouthY: number } {
  const head = group(0, 1.5, 0);


  const face = new THREE.Mesh(headGeometry(), m.skinFace);
  face.castShadow = true;
  head.add(face);
  const eyeL = makeEye(m, 1);
  const eyeR = makeEye(m, -1);

  const browGeos: THREE.BufferGeometry[] = [];
  for (const s of [-1, 1]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(s * 0.016, -0.001, 0.0),
      new THREE.Vector3(s * 0.034, 0.004, 0.003),
      new THREE.Vector3(s * 0.052, 0.002, 0.0),
      new THREE.Vector3(s * 0.062, -0.005, -0.006),
    ]);
    const tube = new THREE.TubeGeometry(curve, 10, 0.0032, 6, false);
    tube.scale(1, 0.7, 0.55);
    browGeos.push(tube);
  }
  const browY = 0.2165;
  const brow = new THREE.Mesh(mergeGeometries(browGeos.map((g) => {
    const x = g.toNonIndexed();
    x.deleteAttribute("uv");
    return x;
  }))!, m.brow);
  brow.position.set(0, browY, 0.0925);
  brow.rotation.x = -0.1;
  const mouthY = 0.1215;
  const mouth = new THREE.Mesh(new THREE.CapsuleGeometry(0.0026, 0.03, 3, 8), m.lip);
  mouth.rotation.z = Math.PI / 2;
  mouth.scale.set(1, 1, 0.6);
  mouth.position.set(0, mouthY, 0.0875);

  const hair = new THREE.Mesh(hairGeometry(), m.hair);
  hair.castShadow = true;
  head.add(eyeL, eyeR, brow, mouth, hair);
  rig.eyeL = eyeL;
  rig.eyeR = eyeR;
  rig.brow = brow;
  rig.mouth = mouth;
  return { head, browY, mouthY };
}

// ─────────────────────────────────────────────────────────────
// 四肢（SDF 雕刻的解剖形体：三角肌 / 二头肌 / 股四头肌 / 小腿肚 / 手指骨节，外覆夹克袖、工装裤与登山靴）
// ─────────────────────────────────────────────────────────────
let cache: { hand?: THREE.BufferGeometry; handR?: THREE.BufferGeometry; upper?: THREE.BufferGeometry; upperR?: THREE.BufferGeometry; lower?: THREE.BufferGeometry; lowerR?: THREE.BufferGeometry; thigh?: THREE.BufferGeometry; shin?: THREE.BufferGeometry; boot?: THREE.BufferGeometry } = {};

function makeArm(m: Mats, side: 1 | -1): THREE.Group {
  const arm = new THREE.Group();
  cache.upper ??= upperSleeveGeometry();
  cache.lower ??= lowerSleeveGeometry();
  cache.hand ??= handGeometry();
  const mir = (g: THREE.BufferGeometry): THREE.BufferGeometry => (side === 1 ? g : mirrorX(g));
  const upper = new THREE.Mesh(mir(cache.upper), m.jacket);
  upper.castShadow = true;
  arm.add(upper);
  const elbow = group(0, -0.28, 0);
  elbow.rotation.x = -0.22;
  arm.add(elbow);
  arm.userData.elbow = elbow;
  const lower = new THREE.Mesh(mir(cache.lower), m.jacket);
  lower.castShadow = true;
  elbow.add(lower);
  const hand = group(0, -0.27, 0);
  hand.rotation.z = side * 0.04;
  const handMesh = new THREE.Mesh(handGeometryFor(side, cache.hand), m.skin);
  handMesh.castShadow = true;
  hand.add(handMesh);
  if (side === 1) {
    // 左手托着一本皮面笔记本（世界里的"日记"）
    const hp = new Parts();
    hp.box(m.leatherDark, 0.026, 0.155, 0.115, { x: -0.044, y: -0.108, z: 0.02, rz: -0.06 }, 0.006);
    hp.box(m.inner, 0.016, 0.146, 0.104, { x: -0.034, y: -0.108, z: 0.02, rz: -0.06 }, 0.003);
    hp.box(m.brass, 0.03, 0.15, 0.008, { x: -0.044, y: -0.108, z: -0.036, rz: -0.06 }, 0.003);
    hp.build(hand, "notebook");
  }
  elbow.add(hand);
  return arm;
}

function makeLeg(m: Mats, side: 1 | -1): LegRig {
  void side;
  const hip = new THREE.Group();
  cache.thigh ??= thighGeometry();
  cache.shin ??= shinGeometry();
  cache.boot ??= bootGeometry();
  const thigh = new THREE.Mesh(cache.thigh.clone(), m.trousers);
  thigh.castShadow = true;
  hip.add(thigh);
  const knee = group(0, -0.42, 0);
  hip.add(knee);
  const shin = new THREE.Mesh(cache.shin.clone(), m.trousers);
  shin.castShadow = true;
  knee.add(shin);
  // 踝关节：靴子绕脚踝（膝下 0.43 m）转动，行走时脚掌随之保持水平
  const ankle = group(0, -0.43, 0);
  knee.add(ankle);
  const bootGeo = cache.boot.clone();
  bootGeo.translate(0, 0.43, 0);
  const boot = new THREE.Mesh(bootGeo, m.boot);
  boot.castShadow = true;
  ankle.add(boot);
  const laces = new Parts();
  for (let i = 0; i < 5; i++) {
    laces.box(m.inner, 0.056, 0.005, 0.005, { y: 0.032 - i * 0.002, z: 0.052 + i * 0.016, rx: -0.4 }, 0.002);
    laces.ball(m.brass, 0.0036, { x: 0.03, y: 0.035 - i * 0.002, z: 0.052 + i * 0.016 }, 6);
    laces.ball(m.brass, 0.0036, { x: -0.03, y: 0.035 - i * 0.002, z: 0.052 + i * 0.016 }, 6);
  }
  laces.build(ankle, "laces");
  return { hip, knee, ankle };
}
// ─────────────────────────────────────────────────────────────// ─────────────────────────────────────────────────────────────
// 躯干：户外夹克（顶点色：领口露出白衬衫）、腰带、双肩背包、围巾
// ─────────────────────────────────────────────────────────────
function buildJacket(m: Mats): THREE.Mesh {
  const mesh = new THREE.Mesh(jacketGeometry(), m.jacket);
  mesh.castShadow = true;
  return mesh;
}
function buildTorsoParts(m: Mats): Parts {
  const t = new Parts();
  // 骨盆（裤腰）
  t.box(m.trousers, 0.35, 0.2, 0.21, { y: 0.97 }, 0.06);
  // 腰带：皮带 + 金属扣
  t.box(m.brass, 0.034, 0.028, 0.012, { y: 1.04, z: 0.14 }, 0.004);
  // 夹克拉链 + 立领 + 内衬领 + 肩线
  t.torus(m.jacket, 0.085, 0.024, { y: 1.51, rx: Math.PI / 2, sx: 1.06 }, Math.PI * 2, 26);
  t.torus(m.inner, 0.078, 0.014, { y: 1.532, rx: Math.PI / 2 }, Math.PI * 2, 26);
  for (const s of [-1, 1]) {
    // 胸前翻盖口袋 + 纽扣
    t.ball(m.brass, 0.0048, { x: s * 0.085, y: 1.262, z: 0.112 }, 6);
  }
  // 双肩背包：主仓 + 前袋 + 拉链 + 侧袋水壶 + 肩带 + 胸扣
  t.box(m.leather, 0.29, 0.4, 0.15, { y: 1.27, z: -0.155 }, 0.06);
  t.box(m.jacket, 0.24, 0.17, 0.05, { y: 1.15, z: -0.235 }, 0.025);
  t.box(m.brass, 0.012, 0.17, 0.012, { y: 1.15, z: -0.262 }, 0.003);
  t.box(m.leatherDark, 0.26, 0.05, 0.13, { y: 1.43, z: -0.18 }, 0.02);
  t.cyl(m.scarf, 0.032, 0.032, 0.17, { x: 0.165, y: 1.12, z: -0.16 }, 14);
  t.cyl(m.leatherDark, 0.034, 0.034, 0.02, { x: 0.165, y: 1.205, z: -0.16 }, 14);
// 围巾：绕颈两圈
  t.torus(m.scarf, 0.074, 0.032, { y: 1.54, rx: Math.PI / 2 }, Math.PI * 2, 26);
  t.torus(m.scarf, 0.082, 0.026, { y: 1.51, rx: Math.PI / 2 - 0.12 }, Math.PI * 2, 26);
  t.ball(m.scarf, 0.044, { x: -0.056, y: 1.5, z: 0.075, sy: 1.1, sz: 0.9 }, 12);
  return t;
}

/** 围巾尾端（挂在颈后，行进时由外部驱动旋转飘动）：分段平面 + 竖向垂褶 + 流苏边 */
function buildCape(m: Mats): THREE.Group {
  const cape = group(0.07, 1.48, -0.08);
  const geo = new THREE.PlaneGeometry(0.15, 0.52, 3, 10);
  geo.translate(0, -0.26, 0);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    p.setZ(i, Math.sin(x * 60 + y * 8) * 0.008 * (1 + -y * 1.5) - -y * 0.03);
  }
  geo.computeVertexNormals();
  const body = new THREE.Mesh(geo, m.scarf);
  body.castShadow = true;
  const fringe = new Parts();
  for (let i = 0; i < 8; i++) fringe.cyl(m.scarf, 0.0016, 0.0016, 0.035, { x: -0.066 + i * 0.019, y: -0.54, z: -0.018 }, 4);
  fringe.build(cape, "scarf-fringe");
  cape.add(body);
  cape.rotation.x = 0.16;
  return cape;
}

/** 提灯：六角纸灯笼（发光纸面 + 黄铜骨架 + 宝顶 + 流苏），挂在右手 */
function makeLantern(m: Mats): THREE.Group {
  const g = new THREE.Group();
  const lp = new Parts();
  lp.cyl(m.paper, 0.046, 0.04, 0.1, { y: 0 }, 6);
  lp.cyl(m.brass, 0.06, 0.05, 0.016, { y: 0.058 }, 6);
  lp.add(new THREE.ConeGeometry(0.066, 0.05, 6), m.brass, { y: 0.09 });
  lp.cyl(m.brass, 0.05, 0.05, 0.014, { y: -0.057 }, 6);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    lp.cyl(m.brass, 0.0022, 0.0022, 0.1, { x: Math.cos(a) * 0.045, y: 0, z: Math.sin(a) * 0.045 }, 4);
  }
  lp.torus(m.brass, 0.034, 0.0035, { y: 0.108 }, Math.PI, 12);
  lp.ball(m.brass, 0.008, { y: 0.122 }, 8);
  lp.build(g, "lantern");
  const flame = new THREE.PointLight(0xffb347, 1.2, 10);
  g.add(flame);
  return g;
}

// ─────────────────────────────────────────────────────────────
/** 探险者：一位带着笔记本与提灯、走进"文字世界"的年轻大学生（第三人称、写实比例，约 1.8 米） */
export function createExplorerAvatar(): THREE.Group {
  const root = new THREE.Group();
  root.name = "Explorer";
  const m = createMats();

  root.add(buildJacket(m));
  const gear = new THREE.Mesh(gearGeometry(), m.leatherDark);
  gear.castShadow = true;
  const zip = new THREE.Mesh(zipperGeometry(), m.brass);
  root.add(gear, zip);
  buildTorsoParts(m).build(root, "torso");

  const faceRig: { eyeL?: THREE.Mesh; eyeR?: THREE.Mesh; brow?: THREE.Mesh; mouth?: THREE.Mesh } = {};
  const { head, browY, mouthY } = buildHead(m, faceRig);
  root.add(head);
  const cape = buildCape(m);
  root.add(cape);

  const leftLeg = makeLeg(m, 1);
  leftLeg.hip.position.set(0.09, 0.91, 0);
  const rightLeg = makeLeg(m, -1);
  rightLeg.hip.position.set(-0.09, 0.91, 0);
  root.add(leftLeg.hip, rightLeg.hip);

  const leftArm = makeArm(m, 1);
  leftArm.position.set(0.2, 1.46, 0);
  const rightArm = makeArm(m, -1);
  rightArm.position.set(-0.2, 1.46, 0);
  root.add(leftArm, rightArm);

  const lantern = makeLantern(m);
  lantern.position.set(0, -0.69, 0.1);
  rightArm.add(lantern);

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
    head,
    cape,
    eyeL: faceRig.eyeL!,
    eyeR: faceRig.eyeR!,
    brow: faceRig.brow!,
    mouth: faceRig.mouth!,
    faceRest: { browY, mouthY },
    mats: { jacket: m.jacket, trim: m.trim, cape: m.scarf },
  };
  root.userData.rig = rig;
  return root;
}