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
    brow: std(0x241812, 0.7),
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
  { c: [0, -0.3, 1.0], s: 0.1, a: 0.06 }, // 鼻头
  { c: [0.15, -0.3, 0.98], s: 0.07, a: 0.05 }, // 鼻翼
  { c: [-0.15, -0.3, 0.98], s: 0.07, a: 0.05 },
  { c: [0.07, -0.38, 0.99], s: 0.045, a: -0.04, tint: [0.62, 0.45, 0.42] }, // 鼻孔
  { c: [-0.07, -0.38, 0.99], s: 0.045, a: -0.04, tint: [0.62, 0.45, 0.42] },
  { c: [0.52, -0.1, 0.84], s: 0.18, a: 0.05, tint: [1.0, 0.9, 0.87] }, // 颧骨（微红）
  { c: [-0.52, -0.1, 0.84], s: 0.18, a: 0.05, tint: [1.0, 0.9, 0.87] },
  { c: [0.5, -0.52, 0.78], s: 0.17, a: -0.035 }, // 颊凹
  { c: [-0.5, -0.52, 0.78], s: 0.17, a: -0.035 },
  { c: [0, -0.545, 0.95], s: 0.08, a: 0.014, tint: [1.0, 0.86, 0.84] }, // 上唇（三段拼出宽度）
  { c: [0.12, -0.55, 0.93], s: 0.07, a: 0.01, tint: [1.0, 0.86, 0.84] },
  { c: [-0.12, -0.55, 0.93], s: 0.07, a: 0.01, tint: [1.0, 0.86, 0.84] },
  { c: [0, -0.645, 0.93], s: 0.05, a: -0.016, tint: [0.9, 0.7, 0.68] }, // 唇缝
  { c: [0.12, -0.645, 0.92], s: 0.05, a: -0.014, tint: [0.9, 0.7, 0.68] },
  { c: [-0.12, -0.645, 0.92], s: 0.05, a: -0.014, tint: [0.9, 0.7, 0.68] },
  { c: [0, -0.73, 0.9], s: 0.09, a: 0.018, tint: [1.0, 0.84, 0.82] }, // 下唇
  { c: [0.1, -0.73, 0.89], s: 0.08, a: 0.012, tint: [1.0, 0.84, 0.82] },
  { c: [-0.1, -0.73, 0.89], s: 0.08, a: 0.012, tint: [1.0, 0.84, 0.82] },
  { c: [0, -0.9, 0.7], s: 0.13, a: 0.05 }, // 下巴
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

/** 现代短发：发壳（沿经线刻出发束沟槽，发际线前高后低）+ 两鬓短发 + 额前短刘海 */
function buildHair(): THREE.BufferGeometry {
  const rnd = seededRand(2031);
  const geos: THREE.BufferGeometry[] = [];
  const center = new THREE.Vector3(0, HEAD_CENTER_Y, 0);
  const R = new THREE.Vector3(0.09, 0.108, 0.098);
  const cap = new THREE.SphereGeometry(1, 112, 72);
  const cp = cap.attributes.position;
  const keep: number[] = [];
  const ci = cap.index!;
  const centroid = new THREE.Vector3();
  const vtmp = new THREE.Vector3();
  const hairline = (x: number): number => 0.55 + 0.3 * Math.abs(x);
  for (let i = 0; i < ci.count; i += 3) {
    centroid.set(0, 0, 0);
    for (let k = 0; k < 3; k++) centroid.add(vtmp.fromBufferAttribute(cp, ci.getX(i + k)));
    centroid.multiplyScalar(1 / 3).normalize();
    const hidden = centroid.y < -0.32 || (centroid.z > 0.6 && centroid.y < hairline(centroid.x));
    if (!hidden) keep.push(ci.getX(i), ci.getX(i + 1), ci.getX(i + 2));
  }
  cap.setIndex(keep);
  const colors = new Float32Array(cp.count * 3);
  for (let i = 0; i < cp.count; i++) {
    vtmp.fromBufferAttribute(cp, i).normalize();
    const phi = Math.atan2(vtmp.x, vtmp.z);
    const theta = Math.acos(THREE.MathUtils.clamp(vtmp.y, -1, 1));
    const strand = Math.sin(phi * 58 + Math.sin(theta * 4 + phi * 3) * 2.2) * 0.5 + 0.5;
    const lock = Math.sin(phi * 8 + theta * 2.4) * 0.5 + 0.5;
    const edgeFront = vtmp.z > 0.05 ? THREE.MathUtils.smoothstep(vtmp.y - hairline(vtmp.x), 0.0, 0.1) : 1;
    const edgeLow = THREE.MathUtils.smoothstep(vtmp.y + 0.32, 0.0, 0.16);
    const clip = Math.min(edgeFront, edgeLow);
    const r = THREE.MathUtils.lerp(0.84, 1.05 + 0.012 * strand + 0.012 * lock, clip);
    cp.setXYZ(i, vtmp.x * r * R.x, vtmp.y * r * R.y, vtmp.z * r * R.z);
    const tone = 0.55 + strand * 0.5 + lock * 0.25;
    colors[i * 3] = 0.075 * tone;
    colors[i * 3 + 1] = 0.05 * tone;
    colors[i * 3 + 2] = 0.034 * tone;
  }
  cap.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  cap.deleteAttribute("uv");
  cap.computeVertexNormals();
  cap.translate(center.x, center.y, center.z);
  geos.push(cap);
  // 刘海：短而自然，向两侧斜扫，止于眉上
  for (let i = 0; i < 9; i++) {
    const s = (i / 8 - 0.5) * 2;
    const u = new THREE.Vector3(s * 0.62, 0.84 + (1 - Math.abs(s)) * 0.05, 0.4 + (1 - Math.abs(s)) * 0.1).normalize();
    const root = center.clone().add(new THREE.Vector3(u.x * R.x * 1.05, u.y * R.y * 1.05, u.z * R.z * 1.05));
    const dir = new THREE.Vector3(s * 0.75 + (s === 0 ? 0.3 : 0), -0.25, 0.42).normalize();
    geos.push(hairRibbon(root, u, dir, 0.036 + rnd() * 0.016, 0.022 + rnd() * 0.008, rnd, rnd()));
  }
  // 鬓角与后颈短发
  for (const side of [-1, 1]) {
    const u = new THREE.Vector3(side * 0.95, 0.18, -0.05).normalize();
    const root = center.clone().add(new THREE.Vector3(u.x * R.x * 1.03, u.y * R.y * 1.03, u.z * R.z * 1.03));
    geos.push(hairRibbon(root, u, new THREE.Vector3(side * 0.08, -1, 0.05).normalize(), 0.05, 0.026, rnd, 0.4));
  }
  for (let i = 0; i < 12; i++) {
    const phi = Math.PI + (i / 11 - 0.5) * 1.6;
    const theta = Math.PI * 0.62;
    const u = new THREE.Vector3(Math.sin(theta) * Math.sin(phi), Math.cos(theta), Math.sin(theta) * Math.cos(phi));
    const root = center.clone().add(new THREE.Vector3(u.x * R.x * 1.03, u.y * R.y * 1.03, u.z * R.z * 1.03));
    geos.push(hairRibbon(root, u, new THREE.Vector3(u.x * 0.1, -1, -0.1).normalize(), 0.05 + rnd() * 0.02, 0.028, rnd, rnd()));
  }
  return mergeGeometries(geos, false)!;
}

function buildHead(m: Mats, rig: { eyeL?: THREE.Mesh; eyeR?: THREE.Mesh; brow?: THREE.Mesh; mouth?: THREE.Mesh }): { head: THREE.Group; browY: number; mouthY: number } {
  const head = group(0, 1.5, 0);
  const parts = new Parts();
  parts.cyl(m.skin, 0.047, 0.056, 0.12, { y: 0.03 }, 18);
  parts.ball(m.skin, 0.03, { x: 0.025, y: 0.045, z: 0.02, sx: 1.2, sy: 2.0 }, 10);
  parts.ball(m.skin, 0.03, { x: -0.025, y: 0.045, z: 0.02, sx: 1.2, sy: 2.0 }, 10);
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

  const browGeos: THREE.BufferGeometry[] = [];
  for (const s of [-1, 1]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(s * 0.016, -0.001, 0.0),
      new THREE.Vector3(s * 0.034, 0.004, 0.003),
      new THREE.Vector3(s * 0.052, 0.002, 0.0),
      new THREE.Vector3(s * 0.062, -0.005, -0.006),
    ]);
    const tube = new THREE.TubeGeometry(curve, 10, 0.0038, 6, false);
    tube.scale(1, 0.8, 0.6);
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
  const mouthY = HEAD_CENTER_Y - 0.0675;
  const mouth = new THREE.Mesh(new THREE.CapsuleGeometry(0.0026, 0.03, 3, 8), m.lip);
  mouth.rotation.z = Math.PI / 2;
  mouth.scale.set(1, 1, 0.6);
  mouth.position.set(0, mouthY, 0.0935);

  const hair = new THREE.Mesh(buildHair(), m.hair);
  hair.castShadow = true;
  head.add(eyeL, eyeR, brow, mouth, hair);
  rig.eyeL = eyeL;
  rig.eyeR = eyeR;
  rig.brow = brow;
  rig.mouth = mouth;
  return { head, browY, mouthY };
}

// ─────────────────────────────────────────────────────────────
// 四肢（现代户外装束：夹克袖、牛仔工装裤、登山靴）
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
  up.ball(m.jacket, 0.068, {}, 14);
  up.add(limbLathe([[0, 0.064], [0.4, 0.058], [1, 0.05]], 0.28, side * 1.7, 0.034), m.jacket);
  up.build(arm, "arm-upper");
  const elbow = group(0, -0.28, 0);
  elbow.rotation.x = -0.22;
  arm.add(elbow);
  const low = new Parts();
  low.ball(m.jacket, 0.049, {}, 12);
  low.add(limbLathe([[0, 0.049], [0.5, 0.044], [1, 0.04]], 0.255, side * 2.9, 0.03), m.jacket);
  low.torus(m.leatherDark, 0.04, 0.0075, { y: -0.252, rx: Math.PI / 2 }, Math.PI * 2, 18);
  low.torus(m.jacket, 0.043, 0.0085, { y: -0.245, rx: Math.PI / 2 }, Math.PI * 2, 18);
  low.build(elbow, "arm-lower");
  const hand = group(0, -0.27, 0);
  hand.rotation.z = side * 0.04;
  const hp = new Parts();
  makeHandParts(hp, m, side);
  if (side === 1) {
    // 左手托着一本皮面笔记本（世界里的"日记"）
    hp.box(m.leatherDark, 0.115, 0.155, 0.026, { x: -0.012, y: -0.088, z: 0.052, rx: -0.45 }, 0.006);
    hp.box(m.inner, 0.104, 0.146, 0.016, { x: -0.012, y: -0.088, z: 0.054, rx: -0.45 }, 0.003);
    hp.box(m.brass, 0.008, 0.15, 0.03, { x: -0.066, y: -0.088, z: 0.052, rx: -0.45 }, 0.003);
  }
  hp.build(hand, "hand");
  elbow.add(hand);
  return arm;
}

function makeLeg(m: Mats, side: 1 | -1): LegRig {
  const hip = new THREE.Group();
  const thigh = new Parts();
  thigh.ball(m.trousers, 0.106, {}, 14);
  thigh.add(limbLathe([[0, 0.106], [0.45, 0.097], [1, 0.071]], 0.42, side * 3.3, 0.04), m.trousers);
  // 工装裤腿侧袋
  thigh.box(m.trousers, 0.012, 0.11, 0.095, { x: side * 0.1, y: -0.2, z: 0.0 }, 0.004);
  thigh.box(m.leatherDark, 0.014, 0.012, 0.1, { x: side * 0.104, y: -0.15 }, 0.003);
  thigh.build(hip, "thigh");

  const knee = group(0, -0.42, 0);
  hip.add(knee);
  const shin = new Parts();
  shin.ball(m.trousers, 0.075, {}, 12);
  shin.add(limbLathe([[0, 0.071], [0.5, 0.062], [1, 0.06]], 0.4, side * 4.1, 0.03), m.trousers);
  // 裤脚堆叠（盖在靴口上）
  shin.torus(m.trousers, 0.062, 0.012, { y: -0.215, rx: Math.PI / 2 }, Math.PI * 2, 20);
  // 登山靴：靴筒 + 靴舌 + 系带孔 + 脚背 + 鞋头 + 加厚齿纹底
  shin.add(new THREE.CylinderGeometry(0.058, 0.056, 0.09, 20, 1), m.boot, { y: -0.275 });
  shin.torus(m.leatherDark, 0.059, 0.008, { y: -0.23, rx: Math.PI / 2 }, Math.PI * 2, 20);
  shin.add(new THREE.CapsuleGeometry(0.054, 0.115, 5, 14), m.boot, { y: -0.425, z: 0.058, rx: Math.PI / 2, sx: 1.06, sz: 0.85 });
  shin.ball(m.boot, 0.052, { y: -0.435, z: 0.138, sx: 1.03, sy: 0.7 }, 14);
  shin.ball(m.leatherDark, 0.04, { y: -0.445, z: 0.16, sx: 1.15, sy: 0.5 }, 10);
  shin.box(m.boot, 0.1, 0.075, 0.07, { y: -0.425, z: -0.04 }, 0.02);
  shin.box(m.sole, 0.124, 0.04, 0.305, { y: -0.462, z: 0.065 }, 0.016);
  shin.box(m.sole, 0.118, 0.045, 0.078, { y: -0.463, z: -0.045 }, 0.016);
  for (let i = 0; i < 6; i++) shin.box(m.sole, 0.126, 0.006, 0.014, { y: -0.487, z: -0.06 + i * 0.05 }, 0.002);
  for (let i = 0; i < 5; i++) {
    shin.box(m.inner, 0.05, 0.005, 0.005, { y: -0.375 - i * 0.002, z: 0.045 + i * 0.014, rx: -0.35 }, 0.002);
    shin.ball(m.brass, 0.0036, { x: 0.028, y: -0.372 - i * 0.002, z: 0.045 + i * 0.014 }, 6);
    shin.ball(m.brass, 0.0036, { x: -0.028, y: -0.372 - i * 0.002, z: 0.045 + i * 0.014 }, 6);
  }
  shin.build(knee, "shin");
  return { hip, knee };
}

// ─────────────────────────────────────────────────────────────
// 躯干：户外夹克（顶点色：领口露出白衬衫）、腰带、双肩背包、围巾
// ─────────────────────────────────────────────────────────────
function buildJacket(m: Mats): THREE.Mesh {
  const profile: Array<[number, number]> = [
    [0.168, 0.84], [0.174, 0.9], [0.17, 0.98], [0.15, 1.08], [0.146, 1.14], [0.156, 1.24], [0.168, 1.34], [0.168, 1.42], [0.148, 1.49], [0.098, 1.53], [0.066, 1.545],
  ];
  const geo = new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 40, 0, Math.PI * 2);
  const p = geo.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const jacket = new THREE.Color(0x3f4a3c);
  const inner = new THREE.Color(0xeceae2);
  const tmp = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const ang = Math.atan2(z, x);
    const k = foldFactor(ang, y, 1.3, y < 1.1 ? 0.034 : 0.014);
    p.setXYZ(i, x * k * 1.12, y, z * k * 0.8);
    // 领口：夹克拉链半开，仅在 V 形小三角里露出白衬衫
    const front = z > 0.02 ? 1 : 0;
    const vHalf = Math.max(0, (y - 1.4) * 0.5);
    const ax = Math.abs(x * 1.12);
    const inV = front * (1 - smoothstep(vHalf - 0.01, vHalf + 0.004, ax)) * (y > 1.4 ? 1 : 0);
    tmp.copy(jacket).lerp(inner, inV);
    const shade = 0.84 + 0.16 * smoothstep(0.84, 1.35, y);
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
  // 腰带：皮带 + 金属扣
  t.add(new THREE.CylinderGeometry(0.168, 0.17, 0.034, 36, 1), m.leatherDark, { y: 1.04, sx: 1.12, sz: 0.8 });
  t.box(m.brass, 0.034, 0.028, 0.012, { y: 1.04, z: 0.14 }, 0.004);
  // 夹克拉链 + 立领 + 内衬领 + 肩线
  t.box(m.brass, 0.007, 0.42, 0.006, { y: 1.2, z: 0.126 }, 0.002);
  t.torus(m.jacket, 0.085, 0.024, { y: 1.51, rx: Math.PI / 2, sx: 1.06 }, Math.PI * 2, 26);
  t.torus(m.inner, 0.078, 0.014, { y: 1.532, rx: Math.PI / 2 }, Math.PI * 2, 26);
  for (const s of [-1, 1]) {
    t.ball(m.jacket, 0.088, { x: s * 0.14, y: 1.49, sy: 0.7 }, 14);
    // 胸前翻盖口袋 + 纽扣
    t.box(m.jacket, 0.08, 0.07, 0.016, { x: s * 0.085, y: 1.26, z: 0.114, rx: -0.04 }, 0.006);
    t.box(m.leatherDark, 0.07, 0.016, 0.018, { x: s * 0.085, y: 1.285, z: 0.119 }, 0.004);
    t.ball(m.brass, 0.005, { x: s * 0.085, y: 1.273, z: 0.126 }, 6);
    // 腰部斜插口袋
    t.box(m.jacket, 0.075, 0.1, 0.014, { x: s * 0.095, y: 0.97, z: 0.128, rz: -s * 0.15 }, 0.005);
  }
  // 下摆抽绳
  t.torus(m.leatherDark, 0.17, 0.0045, { y: 0.9, rx: Math.PI / 2, sx: 1.12, sy: 0.8 }, Math.PI * 2, 36);
  // 双肩背包：主仓 + 前袋 + 拉链 + 侧袋水壶 + 肩带 + 胸扣
  t.box(m.leather, 0.29, 0.4, 0.15, { y: 1.27, z: -0.155 }, 0.06);
  t.box(m.jacket, 0.24, 0.17, 0.05, { y: 1.15, z: -0.235 }, 0.025);
  t.box(m.brass, 0.012, 0.17, 0.012, { y: 1.15, z: -0.262 }, 0.003);
  t.box(m.leatherDark, 0.26, 0.05, 0.13, { y: 1.43, z: -0.18 }, 0.02);
  t.cyl(m.scarf, 0.032, 0.032, 0.17, { x: 0.165, y: 1.12, z: -0.16 }, 14);
  t.cyl(m.leatherDark, 0.034, 0.034, 0.02, { x: 0.165, y: 1.205, z: -0.16 }, 14);
  for (const s of [-1, 1]) {
    t.box(m.leatherDark, 0.045, 0.34, 0.016, { x: s * 0.1, y: 1.3, z: 0.12 }, 0.005);
    t.box(m.leatherDark, 0.045, 0.014, 0.27, { x: s * 0.1, y: 1.46, z: -0.035 }, 0.005);
  }
  t.box(m.leatherDark, 0.2, 0.016, 0.01, { y: 1.34, z: 0.131 }, 0.003);
  t.ball(m.brass, 0.006, { y: 1.34, z: 0.138 }, 6);
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
  leftArm.position.set(0.225, 1.46, 0);
  const rightArm = makeArm(m, -1);
  rightArm.position.set(-0.225, 1.46, 0);
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