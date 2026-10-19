import * as THREE from "three";
import {
  SURFACE_ALBEDO_MEAN,
  SURFACE_AO_MEAN,
  SURFACE_KINDS,
  SURFACE_ROUGH_NEUTRAL,
  SURFACE_SCALE,
  generateSurfaceTexture,
  surfaceLayer,
  type SurfaceKind,
} from "./surfaceTextures";

/**
 * 程序化 PBR 表面（三平面世界空间，不依赖 UV）：
 * 8 种材料（砌石 / 砖 / 灰泥 / 铺地 / 木板 / 屋瓦 / 金属 / 混凝土）的细节贴图打包成两个共享的 DataArrayTexture
 * （albedo+AO、法线+粗糙度），着色器里按世界法线三向取样：
 *   - albedo 只做围绕材质原色的调制（rgb / 0.65），平均亮度不变；
 *   - 法线 whiteout 混合后替换 normal_fragment_maps，粗糙度与贴图 alpha 相乘，AO 乘到间接光；
 *   - 墙根污渍（离物体最低点 0–1.2 m 变暗偏褐）、竖向雨痕、棱角磨损（法线变化率）。
 * 低画质：顶面 + 一个主侧面两次取样（双平面），不做雨痕。
 */

/** 旧名称（masonry / paving / wood / tiles）仍然有效，新增 brick / plaster / metal / concrete */
export type KitPatternKind = SurfaceKind;
export type SurfaceQuality = "high" | "low";

export interface KitPatternOptions {
  /** 墙根污渍与雨痕强度（0 关闭，默认 1） */
  grime?: number;
  /** 棱角磨损强度（0 关闭，默认 1） */
  wear?: number;
}

// ───────────────────────── 共享数组纹理 ─────────────────────────

export interface SurfaceArrays {
  quality: SurfaceQuality;
  size: number;
  /** rgb = 细节亮度（平均 0.65），a = AO；线性数据，不做 sRGB 解码 */
  albedo: THREE.DataArrayTexture;
  /** rgb = 切线空间法线，a = 相对粗糙度（0.66 中性） */
  normal: THREE.DataArrayTexture;
  /** 生成耗时（毫秒） */
  generationMs: number;
  dispose(): void;
}

const SURFACE_SEED = 20260616;
let requestedQuality: SurfaceQuality = "high";
let arrays: SurfaceArrays | undefined;

/** 设置纹理档位（需在第一次取数组纹理之前调用；之后调用无效果） */
export function setSurfaceQuality(q: SurfaceQuality): void {
  if (!arrays) requestedQuality = q;
}

/** 当前生效的档位（数组纹理创建后以其为准） */
export function surfaceQuality(): SurfaceQuality {
  return arrays ? arrays.quality : requestedQuality;
}

function pack(layers: Uint8Array[], size: number, aniso: number): THREE.DataArrayTexture {
  const per = size * size * 4;
  const data = new Uint8Array(per * layers.length);
  layers.forEach((l, i) => data.set(l, i * per));
  const tex = new THREE.DataArrayTexture(data, size, size, layers.length);
  tex.format = THREE.RGBAFormat;
  tex.type = THREE.UnsignedByteType;
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = aniso;
  tex.userData.shared = true;
  tex.needsUpdate = true;
  return tex;
}

/**
 * 全局共享的 8 层表面数组纹理（只生成一次）。必须在第一次渲染前存在——着色器在编译时（onBeforeCompile）
 * 就会调用它，因此采样器永远不会是 null。size：high 512、low 256。
 */
export function getSurfaceArrays(quality: SurfaceQuality = requestedQuality, aniso = 4): SurfaceArrays {
  if (arrays) return arrays;
  const size = quality === "low" ? 256 : 512;
  const t0 = typeof performance !== "undefined" ? performance.now() : Date.now();
  const a: Uint8Array[] = [];
  const n: Uint8Array[] = [];
  for (const kind of SURFACE_KINDS) {
    const t = generateSurfaceTexture(kind, size, SURFACE_SEED);
    a.push(t.albedo);
    n.push(t.normal);
  }
  const albedo = pack(a, size, aniso);
  const normal = pack(n, size, aniso);
  const generationMs = (typeof performance !== "undefined" ? performance.now() : Date.now()) - t0;
  arrays = {
    quality,
    size,
    albedo,
    normal,
    generationMs,
    dispose() {
      albedo.dispose();
      normal.dispose();
    },
  };
  return arrays;
}

/** 释放共享数组纹理（世界整体销毁时调用）；之后再次取用会重新生成 */
export function disposeSurfaceArrays(): void {
  arrays?.dispose();
  arrays = undefined;
}

// ───────────────────────── 几何：墙根基准高度 ─────────────────────────

/** 物体空间最低点（x）+ 有效标记（y = 1）。没有此属性的几何不做墙根污渍。 */
export const KIT_BASE_ATTRIBUTE = "aKitBase";

/**
 * 给几何添加“最低点”顶点属性（每个顶点同一个值）。着色器据此算出 world y − 物体最低点，
 * 合并网格（原点在地面）、居中放置的方块、实例化网格都能得到正确的墙根高度。
 * 只加属性，不改位置 / 法线 / 索引。
 */
export function tagKitGeometry(geometry: THREE.BufferGeometry): void {
  if (geometry.getAttribute(KIT_BASE_ATTRIBUTE)) return;
  const pos = geometry.getAttribute("position");
  if (!pos) return;
  if (!geometry.boundingBox) geometry.computeBoundingBox();
  const minY = geometry.boundingBox?.min.y;
  if (minY === undefined || !Number.isFinite(minY)) return;
  const data = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    data[i * 2] = minY;
    data[i * 2 + 1] = 1;
  }
  geometry.setAttribute(KIT_BASE_ATTRIBUTE, new THREE.BufferAttribute(data, 2));
}

/** 材质是否已经被 applyKitPattern 处理 */
export function isKitMaterial(mat: THREE.Material): boolean {
  return mat.userData.kitKind !== undefined;
}

// ───────────────────────── 着色器 ─────────────────────────

/** 每种材料的着色器参数：墙根污渍 / 雨痕 / 棱角磨损强度、棱角处粗糙度变化 */
const KIND_PARAMS: Record<SurfaceKind, { grime: number; streak: number; wear: number; edgeRough: number }> = {
  masonry: { grime: 1.0, streak: 0.8, wear: 0.85, edgeRough: 0.08 },
  brick: { grime: 1.0, streak: 0.7, wear: 0.8, edgeRough: 0.06 },
  plaster: { grime: 1.0, streak: 1.0, wear: 0.55, edgeRough: 0.1 },
  paving: { grime: 0.5, streak: 0.0, wear: 0.7, edgeRough: 0.06 },
  wood: { grime: 0.7, streak: 0.4, wear: 0.9, edgeRough: 0.06 },
  tiles: { grime: 0.35, streak: 0.2, wear: 0.6, edgeRough: 0.06 },
  metal: { grime: 0.4, streak: 0.35, wear: 1.0, edgeRough: -0.28 },
  concrete: { grime: 1.0, streak: 1.0, wear: 0.5, edgeRough: 0.06 },
};

const f = (v: number): string => v.toFixed(3);

const VERTEX_PARS = /* glsl */ `
attribute vec2 aKitBase;
varying vec3 vKitWorld;
varying float vKitH;
`;

const VERTEX_BEGIN = /* glsl */ `
{
  vec4 kLocal = vec4(transformed, 1.0);
  vec4 kBase = vec4(0.0, aKitBase.x, 0.0, 1.0);
  #ifdef USE_BATCHING
    kLocal = batchingMatrix * kLocal;
    kBase = batchingMatrix * kBase;
  #endif
  #ifdef USE_INSTANCING
    kLocal = instanceMatrix * kLocal;
    kBase = instanceMatrix * kBase;
  #endif
  vKitWorld = (modelMatrix * kLocal).xyz;
  // no base attribute (aKitBase.y == 0): skip the wall-base grime
  vKitH = aKitBase.y > 0.5 ? vKitWorld.y - (modelMatrix * kBase).y : 100.0;
}
`;

const FRAGMENT_PARS = /* glsl */ `
varying vec3 vKitWorld;
varying float vKitH;
uniform highp sampler2DArray uKitAlb;
uniform highp sampler2DArray uKitNrm;
uniform float uKitGrime;
uniform float uKitWear;
float kHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float kNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(kHash(i), kHash(i + vec2(1.0, 0.0)), f.x), mix(kHash(i + vec2(0.0, 1.0)), kHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
`;

/** 取样 + 颜色 / 法线 / 粗糙度。放在 normal_fragment_maps 之后：此时 normal 已是几何法线（视图空间）。 */
function samplingGLSL(kind: SurfaceKind, low: boolean): string {
  const layer = surfaceLayer(kind).toFixed(1);
  const scale = SURFACE_SCALE[kind];
  const head = `
  vec3 kN = inverseTransformDirection(normal, viewMatrix);
  vec3 kAbs = abs(kN);
  float kDist = length(vViewPosition);
  vec3 kP = vKitWorld * ${(1 / scale).toFixed(5)};
`;
  const body = low
    ? `
  // low quality: top + one dominant side (two planes)
  float kWy = pow(kAbs.y, 4.0);
  float kWs = pow(max(kAbs.x, kAbs.z), 4.0);
  float kWt = kWy / (kWy + kWs + 1e-5);
  bool kSX = kAbs.x > kAbs.z;
  vec3 kUT = vec3(kP.xz + vec2(0.61, 0.29), ${layer});
  vec3 kUS = vec3((kSX ? kP.zy + vec2(0.17, 0.43) : kP.xy + vec2(0.83, 0.07)), ${layer});
  vec4 kAT = texture(uKitAlb, kUT);
  vec4 kAS = texture(uKitAlb, kUS);
  vec4 kNT = texture(uKitNrm, kUT);
  vec4 kNS = texture(uKitNrm, kUS);
  vec4 kA = mix(kAS, kAT, kWt);
  vec3 kt = kNT.xyz * 2.0 - 1.0;
  vec3 ks = kNS.xyz * 2.0 - 1.0;
  vec3 kTw = vec3(kt.xy + kN.xz, abs(kt.z) * kN.y).xzy;
  vec3 kSw = kSX ? vec3(ks.xy + kN.zy, abs(ks.z) * kN.x).zyx : vec3(ks.xy + kN.xy, abs(ks.z) * kN.z);
  vec3 kBn = normalize(kTw * kWt + kSw * (1.0 - kWt));
  float kRg = mix(kNS.a, kNT.a, kWt);
`
    : `
  vec3 kW = pow(kAbs, vec3(4.0));
  kW /= (kW.x + kW.y + kW.z + 1e-5);
  vec3 kUX = vec3(kP.zy + vec2(0.17, 0.43), ${layer});
  vec3 kUY = vec3(kP.xz + vec2(0.61, 0.29), ${layer});
  vec3 kUZ = vec3(kP.xy + vec2(0.83, 0.07), ${layer});
  vec4 kA = texture(uKitAlb, kUX) * kW.x + texture(uKitAlb, kUY) * kW.y + texture(uKitAlb, kUZ) * kW.z;
  vec4 kNx = texture(uKitNrm, kUX);
  vec4 kNy = texture(uKitNrm, kUY);
  vec4 kNz = texture(uKitNrm, kUZ);
  vec3 tx = kNx.xyz * 2.0 - 1.0;
  vec3 ty = kNy.xyz * 2.0 - 1.0;
  vec3 tz = kNz.xyz * 2.0 - 1.0;
  tx = vec3(tx.xy + kN.zy, abs(tx.z) * kN.x);
  ty = vec3(ty.xy + kN.xz, abs(ty.z) * kN.y);
  tz = vec3(tz.xy + kN.xy, abs(tz.z) * kN.z);
  vec3 kBn = normalize(tx.zyx * kW.x + ty.xzy * kW.y + tz.xyz * kW.z);
  float kRg = kNx.a * kW.x + kNy.a * kW.y + kNz.a * kW.z;
`;
  return head + body;
}

function detailGLSL(kind: SurfaceKind, low: boolean): string {
  const p = KIND_PARAMS[kind];
  return `
{
${samplingGLSL(kind, low)}
  // edge curvature (1/m) = normal change rate / world position change rate, distance independent; fades out far away
  float kCurv = length(fwidth(kN)) / max(length(fwidth(vKitWorld)), 1e-5);
  float kEdge = smoothstep(7.0, 22.0, kCurv) * (1.0 - smoothstep(18.0, 60.0, kDist)) * uKitWear * ${f(p.wear)};

  // color: modulation around the material color; AO is applied after aomap_fragment
  diffuseColor.rgb *= kA.rgb * ${f(1 / SURFACE_ALBEDO_MEAN)};
  kAo = kA.a;
  roughnessFactor = clamp(roughnessFactor * kRg * ${f(1 / SURFACE_ROUGH_NEUTRAL)}, 0.04, 1.0);

  // normal: relaxes to the geometric normal with distance
  float kNF = 1.0 - 0.7 * smoothstep(30.0, 100.0, kDist);
  normal = normalize((viewMatrix * vec4(normalize(mix(kN, kBn, kNF)), 0.0)).xyz);

  // wall-base grime: vertical faces within 0-1.2 m of the object's lowest point get darker and browner, broken up by noise
  float kWall = 1.0 - smoothstep(0.55, 0.88, kAbs.y);
  float kHu = vKitWorld.x * kAbs.z + vKitWorld.z * kAbs.x;
  float kBreak = kNoise(vec2(kHu * 2.3, vKitWorld.y * 1.1 + 3.0));
  float kG = (1.0 - smoothstep(0.0, 1.15 * (0.45 + 0.9 * kBreak), vKitH)) * kWall * uKitGrime * ${f(p.grime)};
  kG = clamp(kG, 0.0, 1.0);
  diffuseColor.rgb *= mix(vec3(1.0), vec3(0.5, 0.43, 0.35), kG * 0.8);
  roughnessFactor = mix(roughnessFactor, max(roughnessFactor, 0.9), kG * 0.6);
  kAo *= 1.0 - 0.25 * kG * (1.0 - smoothstep(0.0, 0.35, vKitH));
${
  low || p.streak <= 0
    ? ""
    : `
  // vertical rain streaks
  float kS1 = kNoise(vec2(kHu * 8.0, vKitWorld.y * 0.5));
  float kS2 = kNoise(vec2(kHu * 1.4 + 7.0, vKitWorld.y * 0.12));
  float kStr = smoothstep(0.64, 0.9, kS1) * smoothstep(0.4, 0.75, kS2) * kWall * uKitGrime * ${f(p.streak)} * smoothstep(0.3, 1.6, vKitH);
  diffuseColor.rgb *= 1.0 - kStr * vec3(0.26, 0.24, 0.2);
`
}
  // edge wear: brighter, less saturated exposed material
  float kLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 kChip = mix(diffuseColor.rgb, vec3(kLum), 0.35) * 1.28 + 0.012;
  diffuseColor.rgb = mix(diffuseColor.rgb, kChip, kEdge * 0.85);
  roughnessFactor = clamp(roughnessFactor + kEdge * ${f(p.edgeRough)}, 0.04, 1.0);
}
`;
}

const AO_GLSL = /* glsl */ `
{
  // normalized by the texture's mean AO so flat areas keep their brightness and only cavities darken
  float kAoN = min(kAo * ${f(1 / SURFACE_AO_MEAN)}, 1.06);
  reflectedLight.indirectDiffuse *= kAoN;
  reflectedLight.indirectSpecular *= mix(1.0, kAoN, 0.6);
  reflectedLight.directDiffuse *= mix(1.0, kAoN, 0.35);
}
`;

/**
 * 给标准材质加上程序化 PBR 表面。同一材质只处理一次（再次调用只更新强度）。
 * 墙根污渍需要几何带 aKitBase 属性：渲染时会对未打标签的几何自动补上（第一帧之后生效）。
 */
export function applyKitPattern(mat: THREE.MeshStandardMaterial, kind: KitPatternKind, opts: KitPatternOptions = {}): void {
  const existing = mat.userData.kitUniforms as { grime: { value: number }; wear: { value: number } } | undefined;
  if (existing) {
    if (opts.grime !== undefined) existing.grime.value = opts.grime;
    if (opts.wear !== undefined) existing.wear.value = opts.wear;
    return;
  }
  const uniforms = { grime: { value: opts.grime ?? 1 }, wear: { value: opts.wear ?? 1 } };
  mat.userData.kitUniforms = uniforms;
  mat.userData.kitKind = kind;
  const prevCompile = mat.onBeforeCompile;
  const prevRender = mat.onBeforeRender;
  const prevKey = mat.customProgramCacheKey();

  mat.onBeforeCompile = (shader, renderer) => {
    prevCompile.call(mat, shader, renderer);
    // 数组纹理在这里（第一次编译、早于第一次绘制）保证已经存在
    const tex = getSurfaceArrays();
    const low = tex.quality === "low";
    shader.uniforms.uKitAlb = { value: tex.albedo };
    shader.uniforms.uKitNrm = { value: tex.normal };
    shader.uniforms.uKitGrime = uniforms.grime;
    shader.uniforms.uKitWear = uniforms.wear;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${VERTEX_PARS}`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>\n${VERTEX_BEGIN}`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${FRAGMENT_PARS}`)
      .replace("#include <color_fragment>", "#include <color_fragment>\nfloat kAo = 1.0;")
      .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>\n${detailGLSL(kind, low)}`)
      .replace("#include <aomap_fragment>", `#include <aomap_fragment>\n${AO_GLSL}`);
  };
  mat.onBeforeRender = (renderer, scene, camera, geometry, object, group) => {
    prevRender.call(mat, renderer, scene, camera, geometry, object, group);
    if (!geometry.getAttribute(KIT_BASE_ATTRIBUTE)) tagKitGeometry(geometry);
  };
  mat.customProgramCacheKey = () => `kit-v2-${kind}-${surfaceQuality()}+${prevKey}`;
  mat.needsUpdate = true;
}

// ───────────────────────── 材质归类 ─────────────────────────

const _hsl = { h: 0, s: 0, l: 0 };

/**
 * 按调用方提示或材质颜色 / metalness / roughness 推断表面类型。
 * 发光、透明、顶点色、带贴图、共享单例（植被 / 岩石 / 石板）以及风格化的饱和色 / 绿色 / 蓝色材质返回 null。
 * hint 可以是任意 SurfaceKind 名称（优先于颜色推断），也可用 mat.userData.surfaceKind 预先标注。
 */
export function classifySurface(mat: THREE.MeshStandardMaterial, hint?: string): SurfaceKind | null {
  if (mat.type !== "MeshStandardMaterial") return null;
  if (mat.userData.shared) return null;
  if (mat.map || mat.normalMap || mat.bumpMap || mat.roughnessMap || mat.metalnessMap || mat.aoMap || mat.alphaMap || mat.emissiveMap || mat.displacementMap || mat.lightMap) return null;
  if (mat.vertexColors || mat.transparent || mat.opacity < 1 || mat.alphaTest > 0 || mat.wireframe) return null;
  const em = mat.emissive;
  if (mat.emissiveIntensity * Math.max(em.r, em.g, em.b) > 0.04) return null;

  const wanted = hint ?? (mat.userData.surfaceKind as string | undefined);
  if (wanted && (SURFACE_KINDS as string[]).includes(wanted)) return wanted as SurfaceKind;

  if (mat.metalness > 0.5) return "metal";
  mat.color.getHSL(_hsl, THREE.SRGBColorSpace);
  const { h, s, l } = _hsl;
  if (l > 0.86 || l < 0.1 || s > 0.62) return null;
  // 近中性灰：浅灰混凝土，中灰砌石
  if (s < 0.08) return l >= 0.62 ? "concrete" : l >= 0.18 ? "masonry" : null;
  const warm = h < 0.17 || h >= 0.95;
  if (!warm) {
    // 绿 / 青 / 蓝 / 紫 / 品红：植物、水、科幻面板等风格化色，不套真实材料
    if (h >= 0.17 && h < 0.46 && s > 0.1) return null;
    if (h >= 0.46 && s > 0.15) return null;
    return l >= 0.62 ? "concrete" : l >= 0.18 ? "masonry" : null;
  }
  // 泥土 / 夯土地面 / 树干：粗糙且偏黄褐，不处理
  if ((mat.roughness >= 0.95 && s >= 0.2) || (mat.roughness >= 0.99 && s >= 0.08)) return null;
  if (l >= 0.6) return "plaster";
  // 高饱和的黄 / 橙（非砖红）是风格化色，不像真实木料
  if (s > 0.5 && h >= 0.065 && h < 0.17) return null;
  if (s >= 0.28 && (h < 0.065 || h >= 0.95)) {
    if (l >= 0.42) return "tiles";
    if (h < 0.04 || h >= 0.95) return "brick";
    // 偏棕的深色按木料处理
  }
  if (s >= 0.1) return l >= 0.14 ? "wood" : null;
  return l >= 0.18 ? "masonry" : null;
}

/**
 * 鹅卵石 / 碎石路面（Voronoi 圆顶石块）：石块间的缝隙变暗变粗糙，石面微隆，
 * 世界空间图案，不依赖 UV，适合沿曲线铺设的路带。
 */
export function applyCobblePattern(mat: THREE.MeshStandardMaterial, scale = 5.5): void {
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = "varying vec3 vCobWorld;\n" + shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       vCobWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`
    );
    shader.fragmentShader = `
      varying vec3 vCobWorld;
      float cHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      vec3 cVor(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        float d1 = 8.0, d2 = 8.0, id = 0.0;
        for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
          vec2 g = vec2(float(x), float(y));
          vec2 o = vec2(cHash(i + g), cHash(i + g + 19.3));
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < d1) { d2 = d1; d1 = d; id = cHash(i + g + 7.7); }
          else if (d < d2) { d2 = d; }
        }
        return vec3(sqrt(d1), sqrt(d2), id);
      }
      float cDome(vec2 p) { vec3 v = cVor(p); return smoothstep(0.0, 0.3, v.y - v.x); }
    ` + shader.fragmentShader
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         float cGap = 0.0;
         {
           vec3 v = cVor(vCobWorld.xz * ${scale.toFixed(2)});
           float edge = v.y - v.x;
           cGap = 1.0 - smoothstep(0.03, 0.16, edge);
           diffuseColor.rgb *= (0.78 + v.z * 0.42) * (1.0 - cGap * 0.5);
         }`
      )
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>\n roughnessFactor = mix(roughnessFactor, 1.0, cGap);`)
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
         {
           float cFade = 1.0 - smoothstep(20.0, 70.0, length(vViewPosition));
           if (cFade > 0.01) {
             vec2 q = vCobWorld.xz * ${scale.toFixed(2)};
             const float cE = 0.03;
             float h0 = cDome(q);
             vec2 gr = vec2(cDome(q + vec2(cE, 0.0)) - h0, cDome(q + vec2(0.0, cE)) - h0) / cE;
             vec3 gv = mat3(viewMatrix) * vec3(gr.x, 0.0, gr.y);
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * 0.09 * cFade);
           }
         }`
      );
  };
  mat.customProgramCacheKey = () => `cobble-${scale}`;
  mat.needsUpdate = true;
}