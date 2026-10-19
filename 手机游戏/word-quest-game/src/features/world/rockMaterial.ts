import * as THREE from "three";
import { generateLayerTexture, type LayerPalette } from "./terrainLayers";

/**
 * 岩石共享材质：三向投影的程序岩石纹理（阶段 2 的 rock 层，调成无苔藓的中性灰岩）
 * + 三向法线 + 粗糙度，世界法线朝上的面混入苔藓 / 地衣，底部接地处加深（接触阴影 + 湿润）。
 * 顶点色只承载每块岩石的色差；几何需带 position / normal / color（uv 可有可无）。
 * 材质为单例，只在 disposeRockResources()（随 disposeFoliageResources）释放。
 */

const ROCK_TEX_SIZE = 256;
const ROCK_SEED = 2207;
/** 纹理平铺密度（每米重复次数，物体空间）：岩石大致 1m 量级，约 0.9m 一块纹理 */
const TRIPLANAR_FREQ = 1.1;

/** 中性灰岩配色；grass 与 rock 同色，使纹理自带的苔藓斑退化为灰色（苔藓改由着色器按朝向混入） */
const ROCK_PALETTE: LayerPalette = {
  grass: 0x8a8984,
  dryGrass: 0x8a8984,
  dirt: 0x6f665a,
  gravel: 0x8d8b85,
  rock: 0x8a8984,
};

export interface RockTextures {
  albedo: THREE.DataTexture;
  normal: THREE.DataTexture;
}

let textures: RockTextures | undefined;
let rockMat: THREE.MeshStandardMaterial | undefined;

function dataTexture(data: Uint8Array, size: number, srgb: boolean): THREE.DataTexture {
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/** 共享岩石纹理（岩石材质与石板路共用，只生成一次） */
export function getRockTextures(): RockTextures {
  if (textures) return textures;
  const t = generateLayerTexture(4, ROCK_TEX_SIZE, ROCK_SEED, ROCK_PALETTE);
  textures = { albedo: dataTexture(t.albedo, t.size, true), normal: dataTexture(t.normal, t.size, false) };
  return textures;
}

const VARYINGS = /* glsl */ `
varying vec3 vRkPos;
varying vec3 vRkNrm;
varying vec3 vRkWorldN;
varying mat3 vRkM;
`;

const FRAGMENT_PARS = /* glsl */ `
uniform sampler2D rkAlbedo;
uniform sampler2D rkNormal;

float rkHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float rkNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(rkHash(i), rkHash(i + vec3(1, 0, 0)), f.x), mix(rkHash(i + vec3(0, 1, 0)), rkHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(rkHash(i + vec3(0, 0, 1)), rkHash(i + vec3(1, 0, 1)), f.x), mix(rkHash(i + vec3(0, 1, 1)), rkHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
`;

const TRIPLANAR_VERTEX_POS = /* glsl */ `
vRkPos = transformed;
`;

const TRIPLANAR_VERTEX_NRM = /* glsl */ `
{
  mat4 rkModel = modelMatrix;
  #ifdef USE_BATCHING
    rkModel = modelMatrix * batchingMatrix;
  #endif
  vRkM = mat3(rkModel);
  vRkNrm = normalize(objectNormal);
  vRkWorldN = normalize(vRkM * objectNormal);
}
`;

/** 颜色：三向取样 albedo，岩层条纹，朝上面的苔藓 / 地衣，底部湿润变暗 */
const TRIPLANAR_COLOR = /* glsl */ `
vec3 rkN = normalize(vRkNrm);
vec3 rkW = pow(abs(rkN), vec3(5.0));
rkW /= (rkW.x + rkW.y + rkW.z);
vec3 rkP = vRkPos * ${TRIPLANAR_FREQ.toFixed(3)};
vec4 rkAx = texture2D(rkAlbedo, rkP.zy);
vec4 rkAy = texture2D(rkAlbedo, rkP.xz + 0.37);
vec4 rkAz = texture2D(rkAlbedo, rkP.xy + 0.71);
vec4 rkA = rkAx * rkW.x + rkAy * rkW.y + rkAz * rkW.z;
float rkStrata = 0.93 + 0.1 * sin(vRkPos.y * 17.0 + rkNoise(vRkPos * 2.3) * 4.5);
vec3 rkAlb = rkA.rgb * rkStrata;
// 苔藓：世界法线朝上 × 噪声（在凹处略多）
float rkUp = smoothstep(0.55, 0.9, vRkWorldN.y);
float rkMn = rkNoise(vRkPos * 3.1 + 5.0) * 0.6 + rkNoise(vRkPos * 9.0) * 0.4;
float rkMoss = rkUp * smoothstep(0.32, 0.62, rkMn + (0.5 - rkA.a) * 0.35);
// 侧面低处：薄薄一层地衣斑
float rkLichen = smoothstep(0.58, 0.72, rkNoise(vRkPos * 6.5 + 11.0)) * (1.0 - rkUp) * 0.28;
vec3 rkMossCol = mix(vec3(0.20, 0.27, 0.12), vec3(0.31, 0.38, 0.17), rkNoise(vRkPos * 13.0)) * (0.65 + 0.7 * rkA.a);
rkAlb = mix(rkAlb, rkMossCol, clamp(rkMoss * 0.9, 0.0, 0.92));
rkAlb = mix(rkAlb, vec3(0.50, 0.52, 0.36), rkLichen);
// 接地：接触阴影 + 湿润
float rkGround = 1.0 - smoothstep(0.0, 0.2, vRkPos.y);
rkAlb *= mix(1.0, 0.5, rkGround);
diffuseColor.rgb *= rkAlb;
`;

/** 法线：三向 whiteout 混合，转到视图空间 */
const TRIPLANAR_NORMAL = /* glsl */ `
{
  vec3 rkNo = normalize(vRkNrm);
  vec3 rkWn = pow(abs(rkNo), vec3(5.0));
  rkWn /= (rkWn.x + rkWn.y + rkWn.z);
  vec3 rkQ = vRkPos * ${TRIPLANAR_FREQ.toFixed(3)};
  vec3 tx = texture2D(rkNormal, rkQ.zy).xyz * 2.0 - 1.0;
  vec3 ty = texture2D(rkNormal, rkQ.xz + 0.37).xyz * 2.0 - 1.0;
  vec3 tz = texture2D(rkNormal, rkQ.xy + 0.71).xyz * 2.0 - 1.0;
  tx = vec3(tx.xy + rkNo.zy, abs(tx.z) * rkNo.x);
  ty = vec3(ty.xy + rkNo.xz, abs(ty.z) * rkNo.y);
  tz = vec3(tz.xy + rkNo.xy, abs(tz.z) * rkNo.z);
  vec3 rkBn = normalize(tx.zyx * rkWn.x + ty.xzy * rkWn.y + tz.xyz * rkWn.z);
  rkBn = normalize(mix(rkNo, rkBn, 0.9));
  vec3 rkWorld = normalize(vRkM * rkBn);
  normal = normalize((viewMatrix * vec4(rkWorld, 0.0)).xyz);
}
`;

/** 粗糙度：取自法线图 alpha（三向混合），苔藓更粗糙、接地处更湿 */
const TRIPLANAR_ROUGH = /* glsl */ `
{
  vec3 rkNr = normalize(vRkNrm);
  vec3 rkWr = pow(abs(rkNr), vec3(5.0));
  rkWr /= (rkWr.x + rkWr.y + rkWr.z);
  vec3 rkR = vRkPos * ${TRIPLANAR_FREQ.toFixed(3)};
  float rkRough = texture2D(rkNormal, rkR.zy).a * rkWr.x + texture2D(rkNormal, rkR.xz + 0.37).a * rkWr.y + texture2D(rkNormal, rkR.xy + 0.71).a * rkWr.z;
  roughnessFactor = mix(rkRough, 0.97, rkMoss * 0.8);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.72, rkGround);
}
`;

/** 岩石共享材质（三向投影 + 苔藓）。几何需带 position / normal / color。 */
export function getRockMaterial(): THREE.MeshStandardMaterial {
  if (rockMat) return rockMat;
  const tex = getRockTextures();
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.92, metalness: 0 });
  mat.userData.shared = true;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.rkAlbedo = { value: tex.albedo };
    shader.uniforms.rkNormal = { value: tex.normal };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${VARYINGS}`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>\n${TRIPLANAR_VERTEX_POS}`)
      .replace("#include <beginnormal_vertex>", `#include <beginnormal_vertex>\n${TRIPLANAR_VERTEX_NRM}`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${VARYINGS}${FRAGMENT_PARS}`)
      .replace("#include <color_fragment>", `#include <color_fragment>\n${TRIPLANAR_COLOR}`)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>\n${TRIPLANAR_ROUGH}`)
      .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>\n${TRIPLANAR_NORMAL}`);
  };
  mat.customProgramCacheKey = () => "rock-triplanar-v1";
  rockMat = mat;
  return mat;
}

let flagMat: THREE.MeshStandardMaterial | undefined;

/** 石板路共享材质：共用岩石纹理（平面 UV）+ 法线，颜色全走顶点色 */
export function getFlagstoneMaterial(): THREE.MeshStandardMaterial {
  if (flagMat) return flagMat;
  const tex = getRockTextures();
  flagMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: tex.albedo,
    normalMap: tex.normal,
    normalScale: new THREE.Vector2(0.7, 0.7),
    vertexColors: true,
    roughness: 0.9,
    metalness: 0,
  });
  flagMat.userData.shared = true;
  return flagMat;
}

/** 释放岩石共享纹理 / 材质（世界整体销毁时调用） */
export function disposeRockResources(): void {
  rockMat?.dispose();
  rockMat = undefined;
  flagMat?.dispose();
  flagMat = undefined;
  textures?.albedo.dispose();
  textures?.normal.dispose();
  textures = undefined;
}
