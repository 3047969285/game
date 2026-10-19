import * as THREE from "three";
import { WATER_ABSORB, generateFoamTexture, generateWaveNormalMap } from "./waterTextures";

/**
 * 写实水面：MeshPhysicalMaterial（ior 1.333，F0≈0.02）+ onBeforeCompile，
 * 由 three 处理 envMap / 灯光 / 雾，着色器内覆盖法线、颜色、透明度、粗糙度与自发光。
 *
 * - 波纹：两层不同方向 / 尺度 / 滚动速度的法线纹理 + 一层低频大波（同一张图，另一个频率），按距离淡化细节
 * - 反射：scene.environment（PMREM 天空），Schlick 菲涅尔同时抬高透明度，掠射角几乎全反射
 * - 太阳高光：Blinn 形式，随波纹碎裂成亮点
 * - 深浅：水深（由烘焙的地形高度纹理得到）→ Beer-Lambert 吸收，浅水青绿透明，深水深蓝绿不透明
 * - 岸边：浅水处随时间涌动的泡沫
 *
 * 片元纹理采样（不含 three 自带的环境贴图采样）：high / med 5 次（法线×3、水深、泡沫），low 3 次（法线×2、水深）。
 */

export type WaterQuality = "high" | "med" | "low";

/** 共享 uniform：时间、太阳方向 / 颜色（World3D.tickScene 每帧更新；颜色已乘强度） */
export const waterUniforms = {
  time: { value: 0 },
  sunDir: { value: new THREE.Vector3(0.3, 0.6, -0.5).normalize() },
  sunColor: { value: new THREE.Color(1, 0.95, 0.85) },
};

export interface WaterBodyOpts {
  /** 湖面轮廓（局部 xz，已是不规则椭圆） */
  outline: THREE.Vector2[];
  /** 世界坐标中心与水面高度 */
  x: number;
  y: number;
  z: number;
  groundY: (x: number, z: number) => number;
  quality: WaterQuality;
  /** 主题色：浅水 / 深水 */
  shallowColor?: number;
  deepColor?: number;
}

export interface WaterBody {
  mesh: THREE.Mesh;
  dispose(): void;
}

const DEFAULT_SHALLOW = 0x5fa592;
const DEFAULT_DEEP = 0x0c3a3e;

// ── 共享的程序纹理（所有水面共用一份，按尺寸缓存）──────────────────────────────
const normalCache = new Map<number, THREE.DataTexture>();
const foamCache = new Map<number, THREE.DataTexture>();

function tileTexture(data: Uint8Array, size: number, anisotropy: number): THREE.DataTexture {
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = anisotropy;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function sharedNormalMap(size: number): THREE.DataTexture {
  let tex = normalCache.get(size);
  if (!tex) {
    tex = tileTexture(generateWaveNormalMap(size, 11).data, size, 4);
    normalCache.set(size, tex);
  }
  return tex;
}

function sharedFoamMap(size: number): THREE.DataTexture {
  let tex = foamCache.get(size);
  if (!tex) {
    tex = tileTexture(generateFoamTexture(size, 23).data, size, 2);
    foamCache.set(size, tex);
  }
  return tex;
}

// ── 着色器 ────────────────────────────────────────────────────────────────────
const FRAG_PARS = /* glsl */ `
  uniform float uWTime;
  uniform vec3 uWSunDir;
  uniform vec3 uWSunColor;
  uniform sampler2D uWNormal;
  uniform vec3 uWShallow;
  uniform vec3 uWDeep;
  uniform vec4 uWRamp; // 无水深纹理时：网格局部 z0, z1, 近处水深, 远处水深
  #ifdef W_DEPTH_TEX
    uniform sampler2D uWDepthTex;
    uniform vec4 uWBox; // minX, minZ, 1/sizeX, 1/sizeZ
  #endif
  #ifdef W_FOAM_TEX
    uniform sampler2D uWFoam;
  #endif
  varying vec3 vWPos;
  varying float vWLocalZ;
`;

const NORMAL_BLOCK = /* glsl */ `
  vec3 wToCam = cameraPosition - vWPos;
  float wDist = length(wToCam);
  vec3 wV = wToCam / max(wDist, 1e-4);
  float wT = uWTime;
  vec2 wP = vWPos.xz;
  // 细节随距离淡出，避免远处闪烁
  float wFa = 1.0 - smoothstep(30.0, 170.0, wDist);
  float wFb = 1.0 - smoothstep(60.0, 250.0, wDist);
  vec4 wNa = texture2D(uWNormal, wP * 0.21 + vec2(0.030, 0.011) * wT);
  vec2 wSa = (wNa.xy - 0.5) * 2.0 / max(wNa.z * 2.0 - 1.0, 0.25);
  // 第二层：旋转 37°、不同尺度和方向，并被第一层轻微扭曲，打散平铺感
  vec2 wPB = vec2(0.8 * wP.x + 0.6 * wP.y, -0.6 * wP.x + 0.8 * wP.y);
  vec4 wNb = texture2D(uWNormal, wPB * 0.083 + vec2(-0.012, 0.019) * wT + wSa * 0.012);
  vec2 wSb = (wNb.xy - 0.5) * 2.0 / max(wNb.z * 2.0 - 1.0, 0.25);
  vec2 wSlope = wSa * 0.5 * wFa + wSb * 0.7 * wFb;
  #ifdef W_FAR
    // 远处低频大波：同一张图的另一个（很低的）频率，同时调制细节振幅，进一步隐藏平铺
    vec4 wNf = texture2D(uWNormal, wP * 0.0113 + vec2(0.004, -0.003) * wT);
    vec2 wSf = (wNf.xy - 0.5) * 2.0 / max(wNf.z * 2.0 - 1.0, 0.25);
    wSlope = wSlope * (0.7 + 0.6 * wNf.a) + wSf * 0.55;
  #endif
  wSlope *= 0.55;
  vec3 wN = normalize(vec3(-wSlope.x, 1.0, -wSlope.y));
  normal = normalize((viewMatrix * vec4(wN, 0.0)).xyz);

  // 水深
  #ifdef W_DEPTH_TEX
    float wDepth = max(-texture2D(uWDepthTex, (vWPos.xz - uWBox.xy) * uWBox.zw).r, 0.0);
  #else
    float wDepth = mix(uWRamp.z, uWRamp.w, smoothstep(uWRamp.x, uWRamp.y, vWLocalZ));
  #endif

  // 吸收（Beer-Lambert）：视线越斜，水中路径越长
  float wNdV = clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
  float wPath = wDepth / max(wNdV, 0.3);
  vec3 wCol = mix(uWShallow, uWDeep, 1.0 - exp(-wPath * vec3(${WATER_ABSORB.rate.map((r) => r.toFixed(2)).join(", ")})));
  float wAlpha = ${WATER_ABSORB.alphaMin.toFixed(2)} + (${WATER_ABSORB.alphaMax.toFixed(2)} - ${WATER_ABSORB.alphaMin.toFixed(2)}) * (1.0 - exp(-wPath * ${WATER_ABSORB.alphaRate.toFixed(2)}));
  // Schlick 菲涅尔（F0 = 0.02）：俯视透明、平视几乎全反射
  float wFres = 0.02 + 0.98 * pow(1.0 - wNdV, 5.0);
  wAlpha = mix(wAlpha, 1.0, clamp(wFres * 1.6, 0.0, 1.0));

  // 岸边泡沫：浅水处，噪声阈值 + 随时间涌动
  float wFoam = 0.0;
  #ifdef W_DEPTH_TEX
    #ifdef W_FOAM_TEX
      float wFl = texture2D(uWFoam, wP * 0.27 + vec2(0.017, -0.012) * wT + wSa * 0.03).r;
    #else
      float wFl = wNa.a;
    #endif
    float wSwash = 0.5 + 0.5 * sin(wT * 0.8 + wFl * 6.2832 + wP.x * 0.15);
    float wThr = 0.22 + 0.16 * wSwash;
    float wBand = 1.0 - smoothstep(wThr * 0.15, wThr, wDepth);
    wFoam = wBand * smoothstep(0.30, 0.62, wFl + wBand * 0.4);
    wFoam = max(wFoam, (1.0 - smoothstep(0.0, 0.06, wDepth)) * 0.65 * (0.5 + wFl));
    wFoam *= wFa * 0.5 + 0.5;
  #endif
  wCol = mix(wCol, vec3(0.86, 0.92, 0.90), wFoam);
  diffuseColor.rgb = wCol;
  diffuseColor.a = mix(wAlpha, 0.95, wFoam);
  roughnessFactor = mix(0.14, 0.8, wFoam) + smoothstep(80.0, 300.0, wDist) * 0.2;

  // 太阳亮点：Blinn，法线碎裂 → 一片闪烁的碎光
  vec3 wR = reflect(-wV, wN);
  float wGlint = pow(max(dot(wR, uWSunDir), 0.0), 520.0);
  totalEmissiveRadiance += uWSunColor * wGlint * 0.9 * (1.0 - wFoam);
`;

const ENV_BLOCK = /* glsl */ `
  #if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
    #if defined( W_LOWENV ) && defined( ENVMAP_TYPE_CUBE_UV )
      {
        // low：只取一个 mip 的一次采样
        vec3 wRv = inverseTransformDirection( reflect( - geometryViewDir, geometryNormal ), viewMatrix );
        float wMip = floor( clamp( roughnessToMip( max( material.roughness, 0.0525 ) ), cubeUV_m0, CUBEUV_MAX_MIP ) );
        radiance += bilinearCubeUV( envMap, envMapRotation * wRv, wMip ) * envMapIntensity * ( 1.0 - wFoam * 0.85 );
      }
    #else
      radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness ) * ( 1.0 - wFoam * 0.85 );
    #endif
  #endif
`;

interface SurfaceConfig {
  quality: WaterQuality;
  shallow: number;
  deep: number;
  fog: boolean;
  depthTex?: THREE.Texture;
  /** minX, minZ, 1/sizeX, 1/sizeZ */
  box?: THREE.Vector4;
  /** 无水深纹理时：网格局部 z0, z1, 近处水深, 远处水深 */
  ramp?: THREE.Vector4;
}

function createSurfaceMaterial(cfg: SurfaceConfig): THREE.MeshPhysicalMaterial {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.14,
    metalness: 0,
    ior: 1.333,
    transparent: true,
    depthWrite: true,
    envMapIntensity: 1,
  });
  mat.fog = cfg.fog;
  const normalTex = sharedNormalMap(cfg.quality === "low" ? 128 : 256);
  const foamTex = cfg.quality === "low" || !cfg.depthTex ? undefined : sharedFoamMap(256);
  const shallow = new THREE.Color(cfg.shallow);
  const deep = new THREE.Color(cfg.deep);
  const ramp = cfg.ramp ?? new THREE.Vector4(0, 1, 0.8, 0.8);
  const defines = [
    cfg.depthTex ? "#define W_DEPTH_TEX" : "",
    foamTex ? "#define W_FOAM_TEX" : "",
    cfg.quality !== "low" ? "#define W_FAR" : "",
    cfg.quality === "low" ? "#define W_LOWENV" : "",
  ].join("\n");

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uWTime = waterUniforms.time;
    shader.uniforms.uWSunDir = waterUniforms.sunDir;
    shader.uniforms.uWSunColor = waterUniforms.sunColor;
    shader.uniforms.uWNormal = { value: normalTex };
    shader.uniforms.uWShallow = { value: shallow };
    shader.uniforms.uWDeep = { value: deep };
    shader.uniforms.uWRamp = { value: ramp };
    if (cfg.depthTex) {
      shader.uniforms.uWDepthTex = { value: cfg.depthTex };
      shader.uniforms.uWBox = { value: cfg.box ?? new THREE.Vector4(0, 0, 1, 1) };
    }
    if (foamTex) shader.uniforms.uWFoam = { value: foamTex };
    shader.vertexShader = "varying vec3 vWPos;\nvarying float vWLocalZ;\n" + shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vWLocalZ = transformed.z;`
    );
    shader.fragmentShader = defines + "\n" + FRAG_PARS + shader.fragmentShader
      .replace("#include <normal_fragment_maps>", NORMAL_BLOCK)
      .replace("#include <lights_fragment_maps>", ENV_BLOCK)
      .replace(
        "#include <fog_fragment>",
        `#ifdef USE_FOG
           // 与地形同一套雾公式：远处水面融入雾色
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`
      );
  };
  const key = `water-v1-${cfg.quality}-${cfg.depthTex ? "d" : "f"}-${foamTex ? "f" : "n"}`;
  mat.customProgramCacheKey = () => key;
  return mat;
}

/** 湖面：按轮廓三角化 + 烘焙地形高度纹理得到水深 */
export function createWaterBody(opts: WaterBodyOpts): WaterBody {
  const { outline, x, y, z, groundY, quality } = opts;
  const geo = new THREE.ShapeGeometry(new THREE.Shape(outline), 1);
  geo.rotateX(-Math.PI / 2);

  // 轮廓的世界包围盒（局部 (px, py) → 世界 (x + px, z - py)），外扩 1.5 米
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const p of outline) {
    minX = Math.min(minX, x + p.x);
    maxX = Math.max(maxX, x + p.x);
    minZ = Math.min(minZ, z - p.y);
    maxZ = Math.max(maxZ, z - p.y);
  }
  const margin = 1.5;
  minX -= margin;
  minZ -= margin;
  maxX += margin;
  maxZ += margin;
  const sizeX = maxX - minX;
  const sizeZ = maxZ - minZ;

  // 水深纹理：R = 地形高度 − 水位（半精度浮点，可线性过滤）；正值 = 岸上，负值 = 水下
  const n = quality === "low" ? 32 : 64;
  const texels = new Uint16Array(n * n);
  for (let j = 0; j < n; j++) {
    const wz = minZ + ((j + 0.5) / n) * sizeZ;
    for (let i = 0; i < n; i++) {
      const wx = minX + ((i + 0.5) / n) * sizeX;
      const rel = THREE.MathUtils.clamp(groundY(wx, wz) - y, -16, 16);
      texels[j * n + i] = THREE.DataUtils.toHalfFloat(rel);
    }
  }
  const depthTex = new THREE.DataTexture(texels, n, n, THREE.RedFormat, THREE.HalfFloatType);
  depthTex.magFilter = THREE.LinearFilter;
  depthTex.minFilter = THREE.LinearFilter;
  depthTex.wrapS = THREE.ClampToEdgeWrapping;
  depthTex.wrapT = THREE.ClampToEdgeWrapping;
  depthTex.generateMipmaps = false;
  depthTex.colorSpace = THREE.NoColorSpace;
  depthTex.needsUpdate = true;

  const material = createSurfaceMaterial({
    quality,
    shallow: opts.shallowColor ?? DEFAULT_SHALLOW,
    deep: opts.deepColor ?? DEFAULT_DEEP,
    fog: true,
    depthTex,
    box: new THREE.Vector4(minX, minZ, 1 / sizeX, 1 / sizeZ),
  });
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(x, y, z);
  mesh.userData.isWater = true;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return {
    mesh,
    dispose() {
      geo.dispose();
      material.dispose();
      depthTex.dispose();
    },
  };
}

export interface SimpleWaterOpts {
  /** 固定水深（米），默认 0.6 */
  depth?: number;
  /** 水深沿网格局部 z 渐变：z0 → z1 之间由 near 变到 far（覆盖 depth） */
  ramp?: { z0: number; z1: number; near: number; far: number };
  shallowColor?: number;
  deepColor?: number;
  /** 是否受场景雾影响（单元舞台材质一般关闭），默认 false */
  fog?: boolean;
  quality?: WaterQuality;
}

/** 没有深度纹理的小水面（喷泉水池、码头海面、水塘）：同一套水面着色，水深取固定值或沿 z 渐变 */
export function createSimpleWaterMaterial(opts: SimpleWaterOpts = {}): THREE.MeshPhysicalMaterial {
  const d = opts.depth ?? 0.6;
  const r = opts.ramp;
  const mat = createSurfaceMaterial({
    quality: opts.quality ?? "med",
    shallow: opts.shallowColor ?? DEFAULT_SHALLOW,
    deep: opts.deepColor ?? DEFAULT_DEEP,
    fog: opts.fog ?? false,
    ramp: r ? new THREE.Vector4(r.z0, r.z1, r.near, r.far) : new THREE.Vector4(0, 1, d, d),
  });
  return mat;
}
