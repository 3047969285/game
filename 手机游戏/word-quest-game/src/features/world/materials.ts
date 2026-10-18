import * as THREE from "three";

const grainPatched = new WeakSet<THREE.Material>();

const GRAIN_NOISE_GLSL = /* glsl */ `
varying vec3 vGrainWorld;
float gHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float gNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(gHash(i), gHash(i + vec3(1, 0, 0)), f.x), mix(gHash(i + vec3(0, 1, 0)), gHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(gHash(i + vec3(0, 0, 1)), gHash(i + vec3(1, 0, 1)), f.x), mix(gHash(i + vec3(0, 1, 1)), gHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
// 大尺度明暗斑驳（低频，远处也稳定）
float gGrain(vec3 p) {
  return gNoise(p * 1.7) * 0.6 + gNoise(p * 6.5) * 0.4;
}
// 表面起伏高度（取解析梯度，避免 dFdx 产生 2x2 像素马赛克）
float gBump(vec3 p) {
  return gNoise(p * 5.0) * 0.6 + gNoise(p * 17.0) * 0.4;
}
`;

/**
 * 给场景中所有"纯色"标准材质注入世界空间微表面：颗粒凹凸、明暗斑驳与粗糙度起伏。
 * 不依赖 UV，盒子 / 圆柱 / 球体上的纹理尺度一致，石头、木头、金属不再是一块平滑塑料。
 * 带贴图、顶点色、自发光或透明的材质（地形、草、水晶、光效）保持原样。
 */
export function applySurfaceGrain(root: THREE.Object3D, strength = 1): void {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const mat of list) {
      if (grainPatched.has(mat) || mat.type !== "MeshStandardMaterial") continue;
      const std = mat as THREE.MeshStandardMaterial;
      if (std.map || std.normalMap || std.bumpMap || std.vertexColors || std.transparent) continue;
      if (std.emissiveIntensity > 0.25 && std.emissive.getHex() !== 0) continue;
      grainPatched.add(mat);
      const prev = std.onBeforeCompile;
      std.onBeforeCompile = (shader, renderer) => {
        prev?.call(std, shader, renderer);
        shader.vertexShader = "varying vec3 vGrainWorld;\n" + shader.vertexShader.replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           vec4 gLocal = vec4(transformed, 1.0);
           #ifdef USE_INSTANCING
             gLocal = instanceMatrix * gLocal;
           #endif
           vGrainWorld = (modelMatrix * gLocal).xyz;`
        );
        shader.fragmentShader = GRAIN_NOISE_GLSL + shader.fragmentShader
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
             float gTone = gGrain(vGrainWorld);
             diffuseColor.rgb *= 1.0 + (gTone - 0.5) * ${(0.10 * strength).toFixed(2)};`
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
             roughnessFactor = clamp(roughnessFactor + (gTone - 0.5) * 0.22, 0.05, 1.0);`
          )
          .replace(
            "#include <normal_fragment_maps>",
            `#include <normal_fragment_maps>
             {
               // 像素覆盖面积越大（越远）凹凸越弱，避免远处闪烁
               float gFade = 1.0 - smoothstep(0.02, 0.12, length(fwidth(vGrainWorld)));
               const float gE = 0.012;
               vec3 gW = vGrainWorld;
               float gB0 = gBump(gW);
               vec3 gGradW = vec3(
                 gBump(gW + vec3(gE, 0.0, 0.0)) - gB0,
                 gBump(gW + vec3(0.0, gE, 0.0)) - gB0,
                 gBump(gW + vec3(0.0, 0.0, gE)) - gB0) / gE;
               vec3 gGradV = mat3(viewMatrix) * gGradW;
               gGradV -= normal * dot(gGradV, normal);
               normal = normalize(normal - gGradV * ${(0.05 * strength).toFixed(3)} * gFade);
             }`
          );
      };
      std.customProgramCacheKey = () => "grain";
      std.needsUpdate = true;
    }
  });
}

/** 水晶 / 玻璃质感 */
export function glassCrystal(color: number, emissiveIntensity: number): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity,
    metalness: 0.15,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    reflectivity: 1,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });
}

/** 石头 / 建筑质感（含粗糙度变化，更有细节） */
export function stone(color: number, roughness = 0.82): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.06,
    envMapIntensity: 0.4,
  });
}

/** 苔藓石砖（路石专用，带轻微自发光描边） */
export function mossyStone(color: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.88,
    metalness: 0.04,
    emissive: 0x1a3a20,
    emissiveIntensity: 0.06,
  });
}

/** 发光路径材质 */
export function glowPath(cleared: boolean): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: cleared ? 0x6ee7b7 : 0x5b8def,
    emissive: cleared ? 0x34d399 : 0x3b82f6,
    emissiveIntensity: cleared ? 0.72 : 0.38,
    roughness: 0.18,
    metalness: 0.4,
    transparent: true,
    opacity: 0.88,
  });
}

/** 所有水面共享的时间 uniform（由 World3D.tickScene 每帧推进） */
export const waterTime = { value: 0 };

/**
 * 水面材质：着色器内两层交叉滚动的世界空间法线扰动（不再依赖 CPU 顶点涟漪），
 * 叠加随视角变化的浅 / 深水色与稀疏的白色浪尖高光。
 */
export function water(): THREE.MeshPhysicalMaterial {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x1e6a9a,
    roughness: 0.06,
    metalness: 0.12,
    transparent: true,
    opacity: 0.72,
    reflectivity: 0.95,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 0.6,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uWaterTime = waterTime;
    shader.vertexShader = "varying vec3 vWaterWorld;\n" + shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       vWaterWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`
    );
    shader.fragmentShader = `
      uniform float uWaterTime;
      varying vec3 vWaterWorld;
      float wHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float wNoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(wHash(i), wHash(i + vec2(1.0, 0.0)), f.x), mix(wHash(i + vec2(0.0, 1.0)), wHash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float wHeight(vec2 p) {
        float t = uWaterTime;
        return wNoise(p * 0.55 + vec2(t * 0.18, t * 0.07)) * 0.6
             + wNoise(p * 1.35 + vec2(-t * 0.22, t * 0.15)) * 0.28
             + wNoise(p * 3.1 + vec2(t * 0.35, -t * 0.3)) * 0.12;
      }
    ` + shader.fragmentShader
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
         {
           float wFade = 1.0 - smoothstep(60.0, 220.0, length(vViewPosition));
           const float wE = 0.08;
           float w0 = wHeight(vWaterWorld.xz);
           vec2 wG = vec2(wHeight(vWaterWorld.xz + vec2(wE, 0.0)) - w0, wHeight(vWaterWorld.xz + vec2(0.0, wE)) - w0) / wE;
           vec3 wGV = mat3(viewMatrix) * vec3(wG.x, 0.0, wG.y);
           wGV -= normal * dot(wGV, normal);
           normal = normalize(normal - wGV * 0.34 * wFade);
         }`
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         {
           float wDepth = wHeight(vWaterWorld.xz * 0.2 + 7.0);
           diffuseColor.rgb = mix(diffuseColor.rgb * 0.62, diffuseColor.rgb * 1.35 + vec3(0.02, 0.07, 0.06), wDepth);
         }`
      )
      .replace(
        "#include <opaque_fragment>",
        `{
           float wCrest = smoothstep(0.80, 0.93, wHeight(vWaterWorld.xz * 1.9 + vec2(uWaterTime * 0.12, 0.0)));
           outgoingLight += vec3(0.55, 0.62, 0.66) * wCrest * 0.28;
         }
         #include <opaque_fragment>`
      );
  };
  mat.customProgramCacheKey = () => "water-v2";
  return mat;
}

/** 路灯光晕 Sprite 纹理（软光点） */
export function makeLanternGlowTexture(color: string): THREE.Texture {
  const sz = 64;
  const cv = document.createElement("canvas");
  cv.width = sz; cv.height = sz;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
  g.addColorStop(0, color);
  g.addColorStop(0.4, "rgba(255,220,140,0.35)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  return new THREE.CanvasTexture(cv);
}

/** 路灯自身灯柱材质 */
export function lanternMetal(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x4a5568,
    roughness: 0.45,
    metalness: 0.85,
  });
}

/** 路灯灯罩（自发光玻璃） */
export function lanternGlass(color: number): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.4,
    roughness: 0.04,
    metalness: 0,
    transparent: true,
    opacity: 0.82,
    clearcoat: 1,
  });
}
