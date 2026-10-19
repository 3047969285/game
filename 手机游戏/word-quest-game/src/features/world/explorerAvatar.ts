import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { MergedBuilder, type Placement } from "./detailKit";
import { seededRand, smoothstep } from "./utils";

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

const HEAD_CENTER_Y = 0.19;

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
  fabric: { fine: 260, mid: 48, weave: 1, bump: 0.0009, tone: 0.06, rough: 0.1 },
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
    jacket: applySurface(std(0x2f4a5f, 0.86, 0, { side: THREE.DoubleSide }), "fabric"),
    inner: applySurface(std(0xe4dccb, 0.9, 0, { side: THREE.DoubleSide }), "fabric"),
    trousers: applySurface(std(0x4a4a46, 0.9), "fabric"),
    skin: applySurface(std(skinTone, 0.55, 0, { emissive: 0x3a1608, emissiveIntensity: 0.05 }), "skin"),
    skinFace: applySurface(std(skinTone, 0.5, 0, { emissive: 0x3a1608, emissiveIntensity: 0.05, vertexColors: true }), "skin"),
    leather: applySurface(std(0x6b4630, 0.62, 0.04), "leather"),
    leatherDark: applySurface(std(0x3f2a1d, 0.66, 0.04), "leather"),
    boot: applySurface(std(0x45301f, 0.62, 0.05), "leather"),
    sole: std(0x1b1815, 0.9),
    hair: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.42, metalness: 0.15, side: THREE.DoubleSide }),
    brow: std(0x241812, 0.7),
    trim: std(0xc9a24a, 0.4, 0.75, { emissive: 0x5a3a08, emissiveIntensity: 0.18 }),
    scarf: applySurface(std(0x6a2a26, 0.88, 0, { side: THREE.DoubleSide }), "fabric"),
    brass: applySurface(std(0xb68a3c, 0.34, 0.85), "metal"),
    armor: Object.assign(new THREE.MeshPhysicalMaterial({ color: 0x1c2733, roughness: 0.38, metalness: 0.6, clearcoat: 0.7, clearcoatRoughness: 0.25 }), {}),
    eyeWhite: new THREE.MeshPhysicalMaterial({ color: 0xf3eeea, roughness: 0.22, clearcoat: 0.9, clearcoatRoughness: 0.08 }),
    lip: std(0xa85a52, 0.46),
    tunicVc: applySurface(std(0xffffff, 0.86, 0, { vertexColors: true, side: THREE.DoubleSide }), "fabric"),
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

/** 布料下垂的皱褶位移：沿角度的多频率起伏 + 竖向噪声，作用在径向 */
function foldFactor(angle: number, y: number, seed: number, amp: number): number {
  return 1 + amp * (Math.sin(angle * 6 + y * 14 + seed) * 0.5 + Math.sin(angle * 11 - y * 9 + seed * 2.3) * 0.3 + Math.sin(angle * 3 + y * 5 + seed * 0.6) * 0.2);
}

/** 旋转体肢段（顶端在 y=0 向下延伸 len），带布料皱褶，沿 z 压扁 */
function limbLathe(profile: Array<[number, number]>, len: number, seed: number, amp: number, squashZ = 1): THREE.BufferGeometry {
  const pts = profile.map(([t, r]) => new THREE.Vector2(r, -t * len)).reverse(); // 自下而上，法线朝外
  const geo = new THREE.LatheGeometry(pts, 22);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const k = foldFactor(Math.atan2(z, x), p.getY(i), seed, amp);
    p.setXYZ(i, x * k, p.getY(i), z * k * squashZ);
  }
  geo.deleteAttribute("uv");
  geo.computeVertexNormals();
  return geo;
}

// ─────────────────────────────────────────────────────────────
// 头部：雕刻面部（高斯隆起 / 凹陷）、眼睛、发丝、发髻、头带
// ─────────────────────────────────────────────────────────────
interface Feature {
  c: [number, number, number];
  s: number;
  a: number;
  tint?: [number, number, number];
}

const FACE_FEATURES: Feature[] = [
  { c: [0, 0.72, 0.7], s: 0.32, a: 0.03 }, // 额
  { c: [0.3, 0.44, 0.86], s: 0.16, a: 0.045 }, // 眉弓
  { c: [-0.3, 0.44, 0.86], s: 0.16, a: 0.045 },
  { c: [0.4, 0.12, 0.9], s: 0.13, a: -0.07, tint: [0.88, 0.76, 0.74] }, // 眼窝
  { c: [-0.4, 0.12, 0.9], s: 0.13, a: -0.07, tint: [0.88, 0.76, 0.74] },
  { c: [0, 0.02, 0.99], s: 0.1, a: 0.06 }, // 鼻梁
  { c: [0, -0.3, 1.0], s: 0.1, a: 0.08 }, // 鼻头
  { c: [0.15, -0.3, 0.98], s: 0.07, a: 0.05 }, // 鼻翼
  { c: [-0.15, -0.3, 0.98], s: 0.07, a: 0.05 },
  { c: [0.07, -0.38, 0.99], s: 0.045, a: -0.04, tint: [0.62, 0.45, 0.42] }, // 鼻孔
  { c: [-0.07, -0.38, 0.99], s: 0.045, a: -0.04, tint: [0.62, 0.45, 0.42] },
  { c: [0.52, -0.1, 0.84], s: 0.18, a: 0.05, tint: [1.0, 0.9, 0.87] }, // 颧骨（微红）
  { c: [-0.52, -0.1, 0.84], s: 0.18, a: 0.05, tint: [1.0, 0.9, 0.87] },
  { c: [0.5, -0.52, 0.78], s: 0.17, a: -0.035 }, // 颊凹
  { c: [-0.5, -0.52, 0.78], s: 0.17, a: -0.035 },
  { c: [0, -0.545, 0.95], s: 0.1, a: 0.045, tint: [1.0, 0.76, 0.74] }, // 上唇
  { c: [0, -0.64, 0.93], s: 0.06, a: -0.04, tint: [0.86, 0.58, 0.56] }, // 唇缝
  { c: [0, -0.73, 0.9], s: 0.1, a: 0.05, tint: [1.0, 0.78, 0.76] }, // 下唇
  { c: [0, -0.9, 0.7], s: 0.13, a: 0.07 }, // 下巴
];
function sculptFace(): THREE.BufferGeometry {
  const geo = mergeVertices(new THREE.IcosahedronGeometry(1, 38), 1e-4);
  geo.deleteAttribute("uv");
  const p = geo.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const feats = FACE_FEATURES.map((f) => ({ ...f, v: new THREE.Vector3(...f.c).normalize() }));
  const u = new THREE.Vector3();
  const R = new THREE.Vector3(0.083, 0.1, 0.093);
  for (let i = 0; i < p.count; i++) {
    u.fromBufferAttribute(p, i).normalize();
    let disp = 0;
    let tr = 1;
    let tg = 1;
    let tb = 1;
    for (const f of feats) {
      const w = Math.exp(-u.distanceToSquared(f.v) / (2 * f.s * f.s));
      disp += f.a * 1.7 * w;
      if (f.tint) {
        tr += (f.tint[0] - 1) * w;
        tg += (f.tint[1] - 1) * w;
        tb += (f.tint[2] - 1) * w;
      }
    }
    const jaw = smoothstep(-0.15, -0.95, u.y);
    const r = 1 + disp;
    p.setXYZ(i, u.x * (1 - 0.2 * jaw) * r * R.x, u.y * r * R.y, u.z * r * R.z);
    colors[i * 3] = Math.min(1.1, tr);
    colors[i * 3 + 1] = Math.min(1.1, tg);
    colors[i * 3 + 2] = Math.min(1.1, tb);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

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
  eye.position.set(side * 0.0365, HEAD_CENTER_Y + 0.011, 0.076);
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
  const upper = new THREE.Mesh(lidGeo(0, Math.PI * 0.38), m.skin);
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

/** 单根发丝带：沿受重力 / 头型约束的路径，根部宽尖端细，顶点色从发根渐变到发梢 */
function hairRibbon(root: THREE.Vector3, normal: THREE.Vector3, dir0: THREE.Vector3, len: number, w0: number, rnd: () => number, tone: number): THREE.BufferGeometry {
  const segs = 7;
  const pts: THREE.Vector3[] = [root.clone()];
  const dir = dir0.clone().normalize();
  let p = root.clone();
  const center = new THREE.Vector3(0, HEAD_CENTER_Y, 0);
  for (let k = 1; k <= segs; k++) {
    p = p.clone().addScaledVector(dir, len / segs);
    // 约束：不进入头部椭球内（略大于头皮半径）
    const rel = p.clone().sub(center);
    const e = Math.sqrt((rel.x / 0.097) ** 2 + (rel.y / 0.117) ** 2 + (rel.z / 0.108) ** 2);
    if (e < 1) rel.multiplyScalar(1 / Math.max(0.2, e));
    p = center.clone().add(rel);
    dir.add(new THREE.Vector3((rnd() - 0.5) * 0.12, -0.34, -0.06)).normalize();
    pts.push(p.clone());
  }
  const pos: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const c = new THREE.Color();
  for (let k = 0; k <= segs; k++) {
    const t = k / segs;
    const tangent = (k < segs ? pts[k + 1].clone().sub(pts[k]) : pts[k].clone().sub(pts[k - 1])).normalize();
    const side = new THREE.Vector3().crossVectors(tangent, normal).normalize();
    const hw = (w0 * (1 - t * 0.82)) / 2;
    const a = pts[k].clone().addScaledVector(side, -hw);
    const b = pts[k].clone().addScaledVector(side, hw);
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    c.setRGB(0.07 + tone * 0.05 + t * 0.08, 0.045 + tone * 0.035 + t * 0.05, 0.03 + tone * 0.02 + t * 0.03);
    col.push(c.r, c.g, c.b, c.r, c.g, c.b);
    if (k > 0) {
      const i = (k - 1) * 2;
      idx.push(i, i + 2, i + 1, i + 1, i + 2, i + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function buildHair(): THREE.BufferGeometry {
  const rnd = seededRand(2031);
  const geos: THREE.BufferGeometry[] = [];
  const center = new THREE.Vector3(0, HEAD_CENTER_Y, 0);
  const R = new THREE.Vector3(0.092, 0.109, 0.1);

  // A) 发帽：覆盖头顶 / 两侧 / 脑后的实体发壳，沿经线刻出发束沟槽，发际线前高后低
  const cap = new THREE.SphereGeometry(1, 112, 72);
  const cp = cap.attributes.position;
  const keep: number[] = [];
  const ci = cap.index!;
  const centroid = new THREE.Vector3();
  const vtmp = new THREE.Vector3();
  const hairline = (x: number): number => 0.5 + 0.34 * Math.abs(x) + 0.0;
  for (let i = 0; i < ci.count; i += 3) {
    centroid.set(0, 0, 0);
    for (let k = 0; k < 3; k++) centroid.add(vtmp.fromBufferAttribute(cp, ci.getX(i + k)));
    centroid.multiplyScalar(1 / 3).normalize();
    const faceRegion = centroid.z > 0.12 && centroid.y < hairline(centroid.x);
    const lowFront = centroid.y < -0.12 && centroid.z > -0.3; // 下颌 / 颈前不覆盖
    const lowSide = centroid.y < -0.55;
    if (!lowFront && !lowSide && !(faceRegion && centroid.z > 0.6)) keep.push(ci.getX(i), ci.getX(i + 1), ci.getX(i + 2));
  }
  cap.setIndex(keep);
  const colors = new Float32Array(cp.count * 3);
  for (let i = 0; i < cp.count; i++) {
    vtmp.fromBufferAttribute(cp, i).normalize();
    const phi = Math.atan2(vtmp.x, vtmp.z);
    const theta = Math.acos(THREE.MathUtils.clamp(vtmp.y, -1, 1));
    const strand = Math.sin(phi * 64 + Math.sin(theta * 4 + phi * 3) * 2.4) * 0.5 + 0.5;
    const lock = Math.sin(phi * 9 + theta * 2.2) * 0.5 + 0.5;
    // 发际线 / 鬓角下缘：越过边界的顶点平滑收进头皮内部（隐藏），避免三角形剔除造成的锯齿边
    const edgeFront = vtmp.z > 0.05 ? THREE.MathUtils.smoothstep(vtmp.y - hairline(vtmp.x), 0.0, 0.12) : 1;
    const edgeLow = THREE.MathUtils.smoothstep(vtmp.y + 0.55, 0.0, 0.2) * (vtmp.z > -0.35 ? 1 : 0.0 + 1);
    const clip = Math.min(edgeFront, vtmp.z > -0.35 ? edgeLow : 1);
    const r = THREE.MathUtils.lerp(0.84, 1.04 + 0.014 * strand + 0.012 * lock, clip);
    cp.setXYZ(i, vtmp.x * r * R.x, vtmp.y * r * R.y, vtmp.z * r * R.z);
    const tone = 0.62 + strand * 0.5 + lock * 0.2;
    colors[i * 3] = 0.07 * tone;
    colors[i * 3 + 1] = 0.045 * tone;
    colors[i * 3 + 2] = 0.03 * tone;
  }
  cap.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  cap.deleteAttribute("uv");
  cap.computeVertexNormals();
  cap.translate(center.x, center.y, center.z);
  geos.push(cap);

  // B) 脑后与两侧垂发：宽而密的发束，覆盖颈后到肩背
  let made = 0;
  let guard = 0;
  while (made < 64 && guard++ < 2000) {
    const phi = rnd() * Math.PI * 2;
    const theta = Math.PI * (0.52 + rnd() * 0.2);
    const u = new THREE.Vector3(Math.sin(theta) * Math.sin(phi), Math.cos(theta), Math.sin(theta) * Math.cos(phi));
    if (u.z > 0.0 || (u.z > -0.3 && Math.abs(u.x) < 0.7)) continue; // 只在后脑与耳后
    const root = center.clone().add(new THREE.Vector3(u.x * R.x * 1.02, u.y * R.y * 1.02, u.z * R.z * 1.02));
    const dir = new THREE.Vector3(u.x * 0.25, -1, u.z * 0.2 - 0.12).normalize();
    geos.push(hairRibbon(root, u, dir, 0.15 + rnd() * 0.1, 0.03 + rnd() * 0.016, rnd, rnd()));
    made++;
  }
  // C) 刘海与两缕鬓发：粗而短，从发际线向两侧斜下扫，止于眉上
  for (let i = 0; i < 9; i++) {
    const s = (i / 8 - 0.5) * 2;
    const u = new THREE.Vector3(s * 0.62, 0.8 + (1 - Math.abs(s)) * 0.06, 0.45 + (1 - Math.abs(s)) * 0.12).normalize();
    const root = center.clone().add(new THREE.Vector3(u.x * R.x * 1.03, u.y * R.y * 1.03, u.z * R.z * 1.03));
    const dir = new THREE.Vector3(s * 0.8 + (s === 0 ? 0.25 : 0), -0.22, 0.38).normalize();
    geos.push(hairRibbon(root, u, dir, 0.046 + rnd() * 0.02, 0.026 + rnd() * 0.01, rnd, rnd()));
  }
  for (const side of [-1, 1]) {
    const u = new THREE.Vector3(side * 0.93, 0.28, 0.2).normalize();
    const root = center.clone().add(new THREE.Vector3(u.x * R.x * 1.02, u.y * R.y * 1.02, u.z * R.z * 1.02));
    geos.push(hairRibbon(root, u, new THREE.Vector3(side * 0.12, -1, 0.18).normalize(), 0.17, 0.03, rnd, 0.5));
  }
  return mergeGeometries(geos, false)!;
}
function buildHead(m: Mats, rig: { eyeL?: THREE.Mesh; eyeR?: THREE.Mesh; brow?: THREE.Mesh; mouth?: THREE.Mesh }): { head: THREE.Group; browY: number; mouthY: number } {
  const head = group(0, 1.5, 0);
  const parts = new Parts();
  // 颈：略带锁骨 / 胸锁乳突肌过渡
  parts.cyl(m.skin, 0.047, 0.056, 0.12, { y: 0.03 }, 18);
  parts.ball(m.skin, 0.03, { x: 0.025, y: 0.045, z: 0.02, sx: 1.2, sy: 2.0 }, 10);
  parts.ball(m.skin, 0.03, { x: -0.025, y: 0.045, z: 0.02, sx: 1.2, sy: 2.0 }, 10);
  // 耳廓：外轮 + 耳垂 + 内凹
  for (const s of [-1, 1]) {
    parts.ball(m.skin, 0.022, { x: s * 0.088, y: HEAD_CENTER_Y - 0.004, z: -0.004, sx: 0.36, sy: 1.15, sz: 0.75 }, 12);
    parts.ball(m.skin, 0.008, { x: s * 0.089, y: HEAD_CENTER_Y - 0.03, z: 0.0, sx: 0.5, sy: 1.1 }, 8);
  }
  parts.build(head, "head-base");

  const face = new THREE.Mesh(sculptFace(), m.skinFace);
  face.position.y = HEAD_CENTER_Y;
  face.castShadow = true;
  head.add(face);

  const eyeL = makeEye(m, 1);
  const eyeR = makeEye(m, -1);

  // 眉毛：两道渐细的弧形管，合并为一个 Mesh 便于整体抬降
  const browGeos: THREE.BufferGeometry[] = [];
  for (const s of [-1, 1]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(s * 0.016, -0.001, 0.0),
      new THREE.Vector3(s * 0.034, 0.005, 0.003),
      new THREE.Vector3(s * 0.052, 0.003, 0.0),
      new THREE.Vector3(s * 0.062, -0.006, -0.006),
    ]);
    const tube = new THREE.TubeGeometry(curve, 10, 0.0042, 6, false);
    tube.scale(1, 0.85, 0.6);
    browGeos.push(tube);
  }
  const browY = HEAD_CENTER_Y + 0.047;
  const brow = new THREE.Mesh(mergeGeometries(browGeos.map((g) => {
    const x = g.toNonIndexed();
    x.deleteAttribute("uv");
    return x;
  }))!, m.brow);
  brow.position.set(0, browY, 0.0925);
  brow.rotation.x = -0.1;

  // 嘴缝：上下唇之间的深色细线（表情时缩放）
  const mouthY = HEAD_CENTER_Y - 0.0675;
  const mouth = new THREE.Mesh(new THREE.CapsuleGeometry(0.0028, 0.022, 3, 8), m.lip);
  mouth.rotation.z = Math.PI / 2;
  mouth.scale.set(1, 1, 0.6);
  mouth.position.set(0, mouthY, 0.0935);

  // 头发：发丝带 + 发髻 + 头带
  const hair = new THREE.Mesh(buildHair(), m.hair);
  hair.castShadow = true;
  const hairParts = new Parts();
  hairParts.ball(m.armor, 0.034, { y: HEAD_CENTER_Y + 0.108, z: -0.03, sy: 0.85 }, 14);
  hairParts.torus(m.brass, 0.034, 0.004, { y: HEAD_CENTER_Y + 0.088, z: -0.03, rx: Math.PI / 2 }, Math.PI * 2, 18);
  hairParts.cyl(m.brass, 0.0035, 0.0035, 0.13, { y: HEAD_CENTER_Y + 0.112, z: -0.03, rz: Math.PI / 2 }, 6);
  hairParts.ball(m.brass, 0.006, { x: 0.065, y: HEAD_CENTER_Y + 0.112, z: -0.03 }, 8);
  hairParts.ball(m.brass, 0.006, { x: -0.065, y: HEAD_CENTER_Y + 0.112, z: -0.03 }, 8);
  hairParts.build(head, "hair-top");
  // 头带：绕额头一圈的布带 + 脑后两条飘带
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.096, 0.0085, 8, 40), m.scarf);
  band.rotation.x = Math.PI / 2 - 0.12;
  band.scale.set(0.93, 1.07, 1);
  band.position.set(0, HEAD_CENTER_Y + 0.052, -0.004);
  band.castShadow = true;
  const medal = new THREE.Mesh(new THREE.CylinderGeometry(0.0125, 0.0125, 0.004, 18), m.brass);
  medal.rotation.x = Math.PI / 2;
  medal.position.set(0, HEAD_CENTER_Y + 0.057, 0.1);
  head.add(eyeL, eyeR, brow, mouth, hair, band, medal);
  for (const s of [-1, 1]) {
    const tailGeo = new THREE.PlaneGeometry(0.022, 0.2, 1, 6);
    tailGeo.translate(0, -0.1, 0);
    const tp = tailGeo.attributes.position;
    for (let i = 0; i < tp.count; i++) tp.setZ(i, Math.sin(tp.getY(i) * 20 + s) * 0.006 - Math.abs(tp.getY(i)) * 0.07);
    tailGeo.computeVertexNormals();
    const tail = new THREE.Mesh(tailGeo, m.scarf);
    tail.position.set(s * 0.02, HEAD_CENTER_Y + 0.046, -0.1);
    tail.rotation.set(0.12, s * 0.35, s * 0.1);
    tail.castShadow = true;
    head.add(tail);
  }
  rig.eyeL = eyeL;
  rig.eyeR = eyeR;
  rig.brow = brow;
  rig.mouth = mouth;
  return { head, browY, mouthY };
}

// ─────────────────────────────────────────────────────────────
// 四肢
// ─────────────────────────────────────────────────────────────
function makeHandParts(p: Parts, m: Mats, side: 1 | -1): void {
  p.box(m.skin, 0.062, 0.07, 0.028, { y: -0.038 }, 0.011);
  const fingerX = [-0.023, -0.0075, 0.0075, 0.023];
  const lens = [0.034, 0.039, 0.037, 0.03];
  fingerX.forEach((x, i) => {
    const curl = 0.28 + i * 0.05;
    p.add(new THREE.CapsuleGeometry(0.0085, lens[i], 3, 8), m.skin, { x, y: -0.08 - lens[i] / 2 * Math.cos(curl), z: 0.004 + lens[i] / 2 * Math.sin(curl), rx: -curl });
    p.add(new THREE.CapsuleGeometry(0.0078, lens[i] * 0.8, 3, 8), m.skin, { x, y: -0.08 - lens[i] * Math.cos(curl) - lens[i] * 0.35, z: 0.004 + lens[i] * Math.sin(curl) + lens[i] * 0.45, rx: -curl - 0.5 });
    p.ball(m.skin, 0.0092, { x, y: -0.075, z: 0.003 }, 8);
  });
  p.add(new THREE.CapsuleGeometry(0.0105, 0.032, 3, 8), m.skin, { x: side * 0.036, y: -0.06, z: 0.012, rx: -0.5, rz: -side * 0.55 });
  p.add(new THREE.CapsuleGeometry(0.0095, 0.026, 3, 8), m.skin, { x: side * 0.048, y: -0.085, z: 0.026, rx: -0.8, rz: -side * 0.45 });
}

function makeArm(m: Mats, side: 1 | -1): THREE.Group {
  const arm = new THREE.Group();
  const up = new Parts();
  // 肩头 + 上臂（袍袖，微外扩）
  up.ball(m.jacket, 0.07, {}, 14);
  up.add(limbLathe([[0, 0.066], [0.4, 0.06], [1, 0.052]], 0.28, side * 1.7, 0.03), m.jacket);
  up.torus(m.trim, 0.056, 0.004, { y: -0.14, rx: Math.PI / 2 }, Math.PI * 2, 18);
  // 肩甲：三片叠压的弧形甲片 + 金边 + 中央凸脊 + 铆钉
  for (let i = 0; i < 3; i++) {
    const r = 0.074 - i * 0.003;
    up.add(new THREE.SphereGeometry(r, 22, 10, 0, Math.PI * 2, 0, Math.PI * 0.46), m.armor, { x: side * (0.004 + i * 0.004), y: 0.025 - i * 0.03, sx: 1.05, sy: 0.62, sz: 1.0, rz: -side * (0.16 + i * 0.1) });
    up.torus(m.trim, r * 0.97, 0.0032, { x: side * (0.004 + i * 0.004), y: 0.025 - i * 0.03 - 0.003, rx: Math.PI / 2, rz: 0, sx: 1.05, sy: 1.0 }, Math.PI * 2, 26);
  }
  up.add(new THREE.BoxGeometry(0.012, 0.01, 0.12), m.trim, { x: side * 0.012, y: 0.05, rz: -side * 0.2 });
  for (const z of [-0.05, 0, 0.05]) up.ball(m.brass, 0.006, { x: side * 0.012, y: 0.045, z }, 8);
  up.build(arm, "arm-upper");

  const elbow = group(0, -0.28, 0);
  elbow.rotation.x = -0.22;
  arm.add(elbow);
  const low = new Parts();
  low.ball(m.jacket, 0.05, {}, 12);
  low.add(limbLathe([[0, 0.05], [0.5, 0.044], [1, 0.039]], 0.25, side * 2.9, 0.025), m.jacket);
  // 护臂：皮革筒 + 金属边 + 三枚铆钉 + 束带
  low.cyl(m.leather, 0.047, 0.044, 0.15, { y: -0.17 }, 18);
  low.torus(m.brass, 0.0475, 0.004, { y: -0.097, rx: Math.PI / 2 }, Math.PI * 2, 20);
  low.torus(m.brass, 0.0445, 0.004, { y: -0.243, rx: Math.PI / 2 }, Math.PI * 2, 20);
  for (let i = 0; i < 3; i++) low.ball(m.brass, 0.0052, { x: Math.sin(i * 0.7 - 0.7) * 0.048, y: -0.17, z: Math.cos(i * 0.7 - 0.7) * 0.048 }, 8);
  low.box(m.leatherDark, 0.02, 0.015, 0.1, { y: -0.17, z: 0.0, x: side * 0.044, rz: side * 0.1 }, 0.004);
  low.build(elbow, "arm-lower");
  const hand = group(0, -0.27, 0);
  hand.rotation.z = side * 0.04;
  const handParts = new Parts();
  makeHandParts(handParts, m, side);
  handParts.build(hand, "hand");
  elbow.add(hand);
  return arm;
}

function makeLeg(m: Mats, side: 1 | -1): LegRig {
  const hip = new THREE.Group();
  const thigh = new Parts();
  thigh.ball(m.trousers, 0.108, {}, 14);
  thigh.add(limbLathe([[0, 0.108], [0.45, 0.098], [1, 0.073]], 0.42, side * 3.3, 0.035), m.trousers);
  thigh.build(hip, "thigh");

  const knee = group(0, -0.42, 0);
  hip.add(knee);
  const shin = new Parts();
  shin.ball(m.trousers, 0.078, {}, 12);
  shin.add(limbLathe([[0, 0.074], [0.5, 0.064], [1, 0.058]], 0.4, side * 4.1, 0.02), m.trousers);
  // 膝甲：圆形皮甲 + 金边 + 中央铆钉
  shin.add(new THREE.SphereGeometry(0.05, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), m.armor, { y: 0.0, z: 0.058, rx: Math.PI / 2 - 0.05, sy: 0.4 });
  shin.torus(m.trim, 0.05, 0.003, { y: 0, z: 0.058, rx: 0 }, Math.PI * 2, 20);
  shin.ball(m.brass, 0.006, { z: 0.088 }, 8);
  // 绑腿：四道皮束带
  for (let i = 0; i < 4; i++) shin.torus(m.leather, 0.066 - i * 0.003, 0.0055, { y: -0.12 - i * 0.045, rx: Math.PI / 2 }, Math.PI * 2, 20);
  // 靴筒 + 翻边 + 胫甲
  shin.add(new THREE.CylinderGeometry(0.066, 0.058, 0.17, 20, 1), m.boot, { y: -0.255 });
  shin.torus(m.leather, 0.067, 0.012, { y: -0.17, rx: Math.PI / 2 }, Math.PI * 2, 22);
  shin.add(new THREE.CylinderGeometry(0.071, 0.064, 0.15, 14, 1, true, -0.8, 1.6), m.armor, { y: -0.215, z: 0.004 });
  shin.torus(m.trim, 0.068, 0.0026, { y: -0.14, rx: Math.PI / 2 }, Math.PI, 18);
  // 鞋面：脚背 + 鞋头 + 鞋跟 + 鞋底（加厚）+ 系带
  shin.add(new THREE.CapsuleGeometry(0.056, 0.12, 5, 14), m.boot, { y: -0.43, z: 0.06, rx: Math.PI / 2, sx: 1.08, sz: 0.86 });
  shin.ball(m.boot, 0.052, { y: -0.438, z: 0.145, sx: 1.05, sy: 0.72 }, 14);
  shin.ball(m.leatherDark, 0.034, { y: -0.45, z: 0.17, sx: 1.2, sy: 0.55 }, 10);
  shin.box(m.boot, 0.1, 0.07, 0.07, { y: -0.43, z: -0.04 }, 0.02);
  shin.box(m.sole, 0.122, 0.034, 0.3, { y: -0.462, z: 0.065 }, 0.014);
  shin.box(m.sole, 0.116, 0.04, 0.075, { y: -0.462, z: -0.045 }, 0.014);
  for (let i = 0; i < 5; i++) {
    shin.box(m.leatherDark, 0.052, 0.006, 0.006, { y: -0.375 - i * 0.002, z: 0.045 + i * 0.014, rx: -0.35 }, 0.002);
    shin.ball(m.brass, 0.004, { x: 0.028, y: -0.372 - i * 0.002, z: 0.045 + i * 0.014 }, 6);
    shin.ball(m.brass, 0.004, { x: -0.028, y: -0.372 - i * 0.002, z: 0.045 + i * 0.014 }, 6);
  }
  shin.build(knee, "shin");
  return { hip, knee };
}

// ─────────────────────────────────────────────────────────────
// 躯干：带皱褶的袍体（顶点色表现 V 领内衬与镶边）、腰带、肩背甲、裙甲、背包与卷轴
// ─────────────────────────────────────────────────────────────
function buildTunic(m: Mats): THREE.Mesh {
  const profile: Array<[number, number]> = [
    [0.172, 0.82], [0.178, 0.9], [0.172, 0.98], [0.15, 1.08], [0.146, 1.14], [0.158, 1.24], [0.172, 1.34], [0.172, 1.42], [0.15, 1.49], [0.098, 1.535], [0.062, 1.552],
  ];
  const geo = new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 40, 0, Math.PI * 2);
  const p = geo.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const jacket = new THREE.Color(0x2f4a5f);
  const inner = new THREE.Color(0xe4dccb);
  const trim = new THREE.Color(0xc9a24a);
  const tmp = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const ang = Math.atan2(z, x);
    const k = foldFactor(ang, y, 1.3, y < 1.1 ? 0.03 : 0.012);
    // 胸腔横宽纵窄：x 放大 z 压扁
    p.setXYZ(i, x * k * 1.12, y, z * k * 0.8);
    // V 领：前襟（z>0）区域内衬色，边缘镶金
    const front = z > 0.02 ? 1 : 0;
    const vHalf = Math.max(0, (y - 1.32) * 0.5);
    const ax = Math.abs(x * 1.12);
    const inV = front * (1 - smoothstep(vHalf - 0.012, vHalf + 0.004, ax)) * (y > 1.32 ? 1 : 0);
    const edge = front * (smoothstep(vHalf - 0.026, vHalf - 0.008, ax) - smoothstep(vHalf - 0.008, vHalf + 0.01, ax)) * (y > 1.32 ? 1 : 0);
    tmp.copy(jacket).lerp(inner, inV).lerp(trim, Math.max(0, edge) * 0.9);
    // 下摆暗化，增加体积
    const shade = 0.82 + 0.18 * smoothstep(0.8, 1.35, y);
    colors[i * 3] = tmp.r * shade;
    colors[i * 3 + 1] = tmp.g * shade;
    colors[i * 3 + 2] = tmp.b * shade;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.deleteAttribute("uv");
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, m.tunicVc);
  mesh.castShadow = true;
  return mesh;
}

function buildTorsoParts(m: Mats): Parts {
  const t = new Parts();
  // 骨盆（裤腰）
  t.box(m.trousers, 0.35, 0.2, 0.21, { y: 0.97 }, 0.06);
  // 腰封：宽布带 + 前结 + 两条垂尾（尾端带穗）
  t.add(new THREE.CylinderGeometry(0.17, 0.172, 0.085, 36, 1), m.scarf, { y: 1.07, sx: 1.22, sz: 0.8 });
  t.torus(m.brass, 0.168, 0.0035, { y: 1.112, rx: Math.PI / 2, sx: 1.22, sy: 0.8 }, Math.PI * 2, 40);
  t.torus(m.brass, 0.171, 0.0035, { y: 1.03, rx: Math.PI / 2, sx: 1.22, sy: 0.8 }, Math.PI * 2, 40);
  t.torus(m.scarf, 0.026, 0.011, { x: 0.05, y: 1.075, z: 0.139, ry: 0.5, rx: 0 }, Math.PI * 2, 14);
  t.torus(m.scarf, 0.026, 0.011, { x: 0.092, y: 1.075, z: 0.132, ry: -0.5 }, Math.PI * 2, 14);
  t.ball(m.scarf, 0.02, { x: 0.071, y: 1.075, z: 0.141, sx: 1.2 }, 10);
  for (const [dx, len, rot] of [[0.07, 0.3, 0.08], [0.095, 0.24, -0.12]] as const) {
    t.box(m.scarf, 0.04, len, 0.008, { x: dx, y: 1.0 - len / 2 + 0.03, z: 0.142, rz: rot }, 0.003);
    t.cyl(m.brass, 0.003, 0.003, 0.05, { x: dx + rot * -len * 0.5, y: 0.705 + (0.3 - len), z: 0.147 }, 6);
    t.ball(m.brass, 0.0085, { x: dx + rot * -len * 0.5, y: 0.68 + (0.3 - len), z: 0.147 }, 8);
  }
  // 胸甲：皮甲 + 金边 + 圆形护心镜
  t.box(m.leatherDark, 0.16, 0.14, 0.03, { y: 1.27, z: 0.118 }, 0.035);
  t.cyl(m.brass, 0.045, 0.045, 0.012, { y: 1.31, z: 0.138, rx: Math.PI / 2 }, 28);
  t.torus(m.trim, 0.05, 0.0035, { y: 1.31, z: 0.14 }, Math.PI * 2, 28);
  t.cyl(m.armor, 0.032, 0.032, 0.014, { y: 1.31, z: 0.142, rx: Math.PI / 2 }, 22);
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) t.ball(m.brass, 0.0048, { x: sx * 0.085, y: 1.31 + sy * 0.065, z: 0.137 }, 6);
  // 斜挎束带（左肩→右腰）与金扣
  
  
  // 衣领：立领环 + 内衬领 + 肩背斜方肌
  t.torus(m.jacket, 0.085, 0.026, { y: 1.52, rx: Math.PI / 2, sx: 1.06 }, Math.PI * 2, 26);
  t.torus(m.inner, 0.08, 0.016, { y: 1.538, rx: Math.PI / 2 }, Math.PI * 2, 26);
  t.torus(m.trim, 0.092, 0.0035, { y: 1.5, rx: Math.PI / 2, sx: 1.06 }, Math.PI * 2, 26);
  for (const s of [-1, 1]) t.ball(m.jacket, 0.09, { x: s * 0.142, y: 1.5, sy: 0.7 }, 14);
  // 裙甲：前后各三片皮甲 + 内层长布片
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * 0.082;
    for (const front of [1, -1] as const) {
      t.box(m.leatherDark, 0.075, 0.2 - Math.abs(i - 1) * 0.02, 0.012, { x: x * (front > 0 ? 1.05 : 1.0), y: 0.82, z: front * 0.138, rx: front * -0.08 }, 0.004);
      t.box(m.brass, 0.062, 0.006, 0.014, { x, y: 0.925, z: front * 0.142 }, 0.002);
      t.ball(m.brass, 0.0045, { x, y: 0.865, z: front * 0.146 }, 6);
    }
  }
  // 背包：皮革背囊 + 翻盖 + 搭扣 + 肩带 + 卷轴筒（斜挎）
  t.box(m.leather, 0.28, 0.36, 0.14, { y: 1.27, z: -0.15 }, 0.05);
  t.box(m.leather, 0.29, 0.13, 0.045, { y: 1.4, z: -0.205 }, 0.02);
  t.box(m.brass, 0.04, 0.05, 0.015, { y: 1.37, z: -0.232 }, 0.006);
  t.box(m.leatherDark, 0.26, 0.05, 0.16, { y: 1.07, z: -0.13 }, 0.02);
  t.cyl(m.scarf, 0.052, 0.052, 0.3, { y: 1.04, z: -0.23, rz: Math.PI / 2 }, 16);
  t.cyl(m.brass, 0.055, 0.055, 0.012, { x: 0.152, y: 1.04, z: -0.23, rz: Math.PI / 2 }, 16);
  t.cyl(m.brass, 0.055, 0.055, 0.012, { x: -0.152, y: 1.04, z: -0.23, rz: Math.PI / 2 }, 16);
  for (const s of [-1, 1]) {
    t.box(m.leather, 0.028, 0.2, 0.012, { x: s * 0.1, y: 1.36, z: 0.122 }, 0.004);
    t.box(m.leather, 0.04, 0.012, 0.28, { x: s * 0.1, y: 1.46, z: -0.04 }, 0.004);
  }
  // 腰间葫芦与小袋
  t.add(new THREE.SphereGeometry(0.036, 14, 10), m.leather, { x: -0.19, y: 0.99, z: 0.02, sy: 1.1 });
  t.add(new THREE.SphereGeometry(0.026, 12, 8), m.leather, { x: -0.19, y: 1.05, z: 0.02 });
  t.cyl(m.brass, 0.01, 0.014, 0.014, { x: -0.19, y: 1.085, z: 0.02 }, 8);
  t.box(m.leatherDark, 0.07, 0.06, 0.04, { x: 0.19, y: 1.0, z: 0.02 }, 0.015);
  return t;
}

/** 披风：分段平面 + 竖向垂褶 + 金边（行进时由外部驱动旋转） */
function buildCape(m: Mats): THREE.Group {
  const cape = group(0.0, 1.48, -0.085);
  const geo = new THREE.PlaneGeometry(0.34, 0.62, 8, 10);
  geo.translate(0, -0.31, 0);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const fold = Math.sin(x * 26) * 0.012 * (1 + -y * 1.4);
    p.setZ(i, fold - (-y) * 0.04 - Math.abs(x) * Math.abs(x) * 0.5);
  }
  geo.computeVertexNormals();
  const body = new THREE.Mesh(geo, m.scarf);
  body.castShadow = true;
  const trimGeo = new THREE.PlaneGeometry(0.34, 0.03, 8, 1);
  const tp = trimGeo.attributes.position;
  for (let i = 0; i < tp.count; i++) tp.setZ(i, -Math.abs(tp.getX(i)) * Math.abs(tp.getX(i)) * 0.5 - 0.0 - 0.62 * 0.04);
  trimGeo.translate(0, -0.605, 0.002);
  const hemTrim = new THREE.Mesh(trimGeo, m.trim);
  cape.add(body, hemTrim);
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
  for (let i = 0; i < 5; i++) {
    lp.cyl(m.scarf, 0.0016, 0.0016, 0.05, { x: (i - 2) * 0.008, y: -0.088 }, 4);
  }
  lp.ball(m.scarf, 0.0085, { y: -0.114 }, 8);
  lp.build(g, "lantern");
  const flame = new THREE.PointLight(0xffb347, 1.2, 10);
  g.add(flame);
  return g;
}

// ─────────────────────────────────────────────────────────────
/** 探险者角色（第三人称、写实比例的骨骼化人形，约 1.8 米） */
export function createExplorerAvatar(): THREE.Group {
  const root = new THREE.Group();
  root.name = "Explorer";
  const m = createMats();

  root.add(buildTunic(m));
  const torso = buildTorsoParts(m);
  torso.build(root, "torso");

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
  leftArm.position.set(0.225, 1.46, 0);
  const rightArm = makeArm(m, -1);
  rightArm.position.set(-0.225, 1.46, 0);
  root.add(leftArm, rightArm);

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