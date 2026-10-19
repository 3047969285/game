import * as THREE from "three";
import { generateBarkTexture, generateFoliageAtlas, type RGBA8Image } from "./foliageTextures";
import { disposeRockResources } from "./rockMaterial";

/**
 * 植被共享材质：叶片（图集 + 法线 + alpha 镂空 + 逆光透射 + 风）与树皮（程序纹理 + 整树摆动）。
 * 材质按种类做成单例：vegetationField 的 BatchedMesh 按材质对象身份分批。
 * 阴影：为每个材质登记一对带同样风位移 / alpha 裁切的深度材质，网格通过 applyFoliageShadow() 挂上。
 */

/** 共享时间 uniform（秒），由 World3D.tickScene 每帧更新 */
export const windTime = { value: 0 };

/** 共享太阳 uniform：dir 为世界空间指向太阳的单位向量，color 已含强度，由 World3D.tickScene 每帧更新 */
export const foliageSun = {
  dir: { value: new THREE.Vector3(0.4, 0.8, -0.45).normalize() },
  color: { value: new THREE.Color(1, 0.95, 0.85) },
};

export type FoliageQuality = "high" | "low";
let quality: FoliageQuality = "high";

/** 设置纹理档位（需在第一次取材质之前调用；之后调用无效果） */
export function setFoliageQuality(q: FoliageQuality): void {
  if (!foliageMat && Object.keys(barkMats).length === 0) quality = q;
}

const ALPHA_TEST = 0.45;

/**
 * 风顶点着色器片段（注入在 begin_vertex 之后，`transformed` 仍在物体空间，
 * 随后 project_vertex / worldpos_vertex 才会乘上 batchingMatrix 与 modelMatrix，因此位移自然跟随实例缩放与旋转）：
 * - 世界空间相位取自实例原点：BatchedMesh 用 modelMatrix * batchingMatrix，普通 Mesh 用 modelMatrix。
 * - aSway.x：整树低频摆幅（几何生成时按 (高度/树高)^2 烘焙，物体空间单位）；aSway.y：叶片高频抖动幅度。
 */
const WIND_PARS = /* glsl */ `
uniform float windTime;
attribute vec2 aSway;
`;

const WIND_VERTEX = /* glsl */ `
{
  #ifdef USE_BATCHING
    mat4 windM = modelMatrix * batchingMatrix;
  #else
    mat4 windM = modelMatrix;
  #endif
  vec3 windOrigin = windM[3].xyz;
  float windPh = dot(windOrigin.xz, vec2(0.23, 0.17));
  float windGust = 0.5 + 0.5 * sin(windTime * 0.8 + windPh * 0.6) + 0.35 * sin(windTime * 1.7 + windPh * 1.3 + 1.3);
  // 世界风向（+x、+z 方向）换算到物体空间（忽略非均匀缩放）
  vec3 windObjDir = normalize(transpose(mat3(windM)) * vec3(0.82, 0.0, 0.57));
  transformed += windObjDir * (windGust * aSway.x);
  float windFt = windTime * 5.2 + windPh * 2.1;
  transformed += vec3(
    sin(windFt + position.x * 9.0 + position.y * 3.0),
    0.5 * sin(windFt * 1.31 + position.y * 8.0 + position.z * 2.0),
    sin(windFt * 0.87 + position.z * 9.0 + position.x * 3.0)
  ) * (aSway.y * (0.55 + 0.45 * windGust));
}
`;

function patchWindVertex(shader: { vertexShader: string; uniforms: Record<string, THREE.IUniform> }): void {
  shader.uniforms.windTime = windTime;
  shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>\n${WIND_PARS}`).replace("#include <begin_vertex>", `#include <begin_vertex>\n${WIND_VERTEX}`);
}

/** 逆光透射：背光时叶片透亮（正比于叶色与太阳色） */
const TRANSLUCENCY_PARS = /* glsl */ `
uniform vec3 foliageSunDir;
uniform vec3 foliageSunColor;
`;
const TRANSLUCENCY_FRAGMENT = /* glsl */ `
{
  vec3 tlSun = normalize((viewMatrix * vec4(foliageSunDir, 0.0)).xyz);
  vec3 tlView = normalize(vViewPosition);
  float tlBack = pow(max(dot(-tlView, tlSun), 0.0), 4.0);
  totalEmissiveRadiance += diffuseColor.rgb * foliageSunColor * (tlBack * 0.35);
}
`;

// ───────────────────────── 纹理 ─────────────────────────

function dataTexture(img: RGBA8Image, srgb: boolean, repeat: boolean, anisotropy: number): THREE.DataTexture {
  const tex = new THREE.DataTexture(img.data, img.size, img.size, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.wrapS = tex.wrapT = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = anisotropy;
  tex.needsUpdate = true;
  return tex;
}

/**
 * 远处保叶：镂空叶片缩小采样（高 mip 层）时 alpha 被平均稀释，alphaTest 会把叶子裁掉，远处树像枯枝。
 * 按当前 mip 层级抬高 alpha，保持远处树冠的覆盖率。
 */
const ALPHA_MIP_FIX = `
#ifdef USE_MAP
  vec2 fTexSz = vec2(textureSize(map, 0));
  vec2 fDx = dFdx(vMapUv * fTexSz);
  vec2 fDy = dFdy(vMapUv * fTexSz);
  float fMip = max(0.0, 0.5 * log2(max(dot(fDx, fDx), dot(fDy, fDy))));
  diffuseColor.a *= 1.0 + fMip * 0.3;
#endif`;

function patchAlphaMip(shader: { fragmentShader: string }): void {
  shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", `#include <map_fragment>\n${ALPHA_MIP_FIX}`);
}

const ATLAS_SEED = 4177;
const BARK_SEED = 913;

// ───────────────────────── 材质 ─────────────────────────

let foliageMat: THREE.MeshStandardMaterial | undefined;
const barkMats: Partial<Record<"broadleaf" | "conifer", THREE.MeshStandardMaterial>> = {};

/** 阴影用深度材质登记表：视觉材质 → [深度, 距离] */
const shadowMats = new Map<THREE.Material, { depth: THREE.MeshDepthMaterial; distance: THREE.MeshDistanceMaterial }>();

function registerShadowMaterials(visual: THREE.MeshStandardMaterial, key: string): void {
  const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  const distance = new THREE.MeshDistanceMaterial();
  for (const m of [depth, distance]) {
    m.map = visual.map;
    m.alphaTest = visual.alphaTest;
    m.onBeforeCompile = (shader) => {
      patchWindVertex(shader);
      patchAlphaMip(shader);
    };
    m.customProgramCacheKey = () => `wind-shadow-${key}-v2`;
  }
  shadowMats.set(visual, { depth, distance });
}

/**
 * 叶片材质：叶簇图集（map + normalMap，alphaTest 镂空）、顶点色明暗、逆光透射、风。
 * 几何需带 uv（指向图集格子）、color、aSway。
 */
export function getFoliageMaterial(): THREE.MeshStandardMaterial {
  if (foliageMat) return foliageMat;
  const size = quality === "high" ? 1024 : 512;
  const atlas = generateFoliageAtlas(size, ATLAS_SEED);
  const mat = new THREE.MeshStandardMaterial({
    map: dataTexture(atlas.albedo, true, false, quality === "high" ? 4 : 2),
    normalMap: dataTexture(atlas.normal, false, false, quality === "high" ? 4 : 2),
    normalScale: new THREE.Vector2(0.8, 0.8),
    alphaTest: ALPHA_TEST,
    vertexColors: true,
    side: THREE.DoubleSide,
    roughness: 0.82,
    metalness: 0,
  });
  mat.onBeforeCompile = (shader) => {
    patchWindVertex(shader);
    patchAlphaMip(shader);
    shader.uniforms.foliageSunDir = foliageSun.dir;
    shader.uniforms.foliageSunColor = foliageSun.color;
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>\n${TRANSLUCENCY_PARS}`).replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>\n${TRANSLUCENCY_FRAGMENT}`);
  };
  mat.customProgramCacheKey = () => "foliage-wind-v2";
  mat.userData.shared = true;
  foliageMat = mat;
  registerShadowMaterials(mat, "foliage");
  return mat;
}

/** 树皮材质：程序树皮纹理 + 法线 + 顶点色明暗，整树低频摆动与叶片同相位 */
export function getBarkMaterial(kind: "broadleaf" | "conifer"): THREE.MeshStandardMaterial {
  const hit = barkMats[kind];
  if (hit) return hit;
  const size = quality === "high" ? 512 : 256;
  const tex = generateBarkTexture(size, BARK_SEED, kind);
  const mat = new THREE.MeshStandardMaterial({
    map: dataTexture(tex.albedo, true, true, quality === "high" ? 4 : 2),
    normalMap: dataTexture(tex.normal, false, true, quality === "high" ? 4 : 2),
    normalScale: new THREE.Vector2(1, 1),
    vertexColors: true,
    roughness: 0.96,
    metalness: 0,
  });
  mat.onBeforeCompile = (shader) => patchWindVertex(shader);
  mat.customProgramCacheKey = () => "bark-wind-v1";
  mat.userData.shared = true;
  barkMats[kind] = mat;
  registerShadowMaterials(mat, `bark-${kind}`);
  return mat;
}

/** 给网格（含 BatchedMesh）挂上带风 / alpha 裁切的阴影深度材质；非植被材质则不处理 */
export function applyFoliageShadow(mesh: THREE.Mesh, material: THREE.Material): void {
  const s = shadowMats.get(material);
  if (!s) return;
  mesh.customDepthMaterial = s.depth;
  mesh.customDistanceMaterial = s.distance;
}

/**
 * 释放全部植被共享纹理 / 材质 / 阴影材质（世界整体销毁时调用）。
 * 切换单元不必调用：纹理在单元之间复用，下次取材质时才会重新生成。
 */
export function disposeFoliageResources(): void {
  const mats: THREE.MeshStandardMaterial[] = [];
  if (foliageMat) mats.push(foliageMat);
  for (const m of Object.values(barkMats)) if (m) mats.push(m);
  for (const m of mats) {
    m.map?.dispose();
    m.normalMap?.dispose();
    m.dispose();
    const s = shadowMats.get(m);
    s?.depth.dispose();
    s?.distance.dispose();
    shadowMats.delete(m);
  }
  disposeRockResources();
  foliageMat = undefined;
  delete barkMats.broadleaf;
  delete barkMats.conifer;
}
