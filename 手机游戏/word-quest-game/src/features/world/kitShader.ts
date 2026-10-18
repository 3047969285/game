import * as THREE from "three";

/**
 * 程序化 PBR 表面图案（三平面世界空间，不依赖 UV）：
 * 石料砌块 / 铺地石板 / 木板木纹 / 瓦片。给纯色标准材质补上灰缝、块面明暗、边缘磨损与粗糙度变化，
 * 让石墙、木料、屋顶在近处有真实的材质层次，而不是一块块平涂色。
 */
export type KitPatternKind = "masonry" | "paving" | "wood" | "tiles";

const PARAMS: Record<KitPatternKind, { course: number; block: number }> = {
  masonry: { course: 0.42, block: 1.05 },
  paving: { course: 0.62, block: 0.62 },
  wood: { course: 0.16, block: 3.0 },
  tiles: { course: 0.24, block: 0.3 },
};

const GLSL = /* glsl */ `
varying vec3 vKitWorld;
varying vec3 vKitNormal;
float kHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float kNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(kHash(i), kHash(i + vec2(1.0, 0.0)), f.x), mix(kHash(i + vec2(0.0, 1.0)), kHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
// 返回 x: 色调系数, y: 灰缝 / 缝隙强度
vec2 kPattern(vec2 p, float course, float block, int kind) {
  float row = floor(p.y / course);
  float rowRand = kHash(vec2(row, 3.1));
  float bl = block * (kind == 2 ? (0.7 + 0.9 * rowRand) : (0.82 + 0.5 * kHash(vec2(row, 7.7))));
  float u = p.x / bl + rowRand * 9.0 + (kind == 3 ? 0.5 * mod(row, 2.0) : 0.0);
  float col = floor(u);
  vec2 f = vec2(fract(u), fract(p.y / course));
  vec2 d = min(f, 1.0 - f) * vec2(bl, course);
  float edge = (kind == 2) ? d.y : min(d.x, d.y);
  float gap = 1.0 - smoothstep(kind == 2 ? 0.004 : 0.007, kind == 2 ? 0.012 : 0.02, edge);
  float wear = 1.0 - smoothstep(0.018, kind == 3 ? 0.07 : 0.05, edge);
  float tone = kHash(vec2(col, row));
  float grain = kind == 2 ? kNoise(vec2(p.x * 1.4, p.y * 38.0 + col * 5.0)) : kNoise(p * 26.0);
  float shade = (0.84 + tone * 0.28) * (1.0 - wear * 0.07) * (0.93 + grain * 0.14);
  return vec2(shade, gap);
}
`;

const KIND_INDEX: Record<KitPatternKind, number> = { masonry: 0, paving: 1, wood: 2, tiles: 3 };

export function applyKitPattern(mat: THREE.MeshStandardMaterial, kind: KitPatternKind): void {
  const { course, block } = PARAMS[kind];
  const k = KIND_INDEX[kind];
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = "varying vec3 vKitWorld;\nvarying vec3 vKitNormal;\n" + shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       vKitWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vKitNormal = normalize(mat3(modelMatrix) * normal);`
    );
    shader.fragmentShader = GLSL + shader.fragmentShader
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         float kGap = 0.0;
         {
           vec3 kn = normalize(vKitNormal);
           vec3 kw = pow(abs(kn), vec3(5.0));
           kw /= (kw.x + kw.y + kw.z + 1e-4);
           vec2 pa = kPattern(vec2(vKitWorld.z, vKitWorld.y), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k});
           vec2 pb = kPattern(vec2(vKitWorld.x, vKitWorld.y), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k});
           vec2 pc = kPattern(vec2(vKitWorld.x, vKitWorld.z), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k});
           vec2 pr = pa * kw.x + pc * kw.y + pb * kw.z;
           diffuseColor.rgb *= pr.x * (1.0 - pr.y * 0.4);
           kGap = pr.y;
         }`
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
         roughnessFactor = mix(roughnessFactor, 1.0, kGap);`
      )
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
         {
           // 灰缝凹槽：沿主投影方向对缝隙强度求有限差分，把法线向缝内倾斜（远处淡出避免闪烁）
           float kFade = 1.0 - smoothstep(22.0, 80.0, length(vViewPosition));
           if (kFade > 0.01) {
             vec3 ka = abs(normalize(vKitNormal));
             const float kE = 0.012;
             vec3 kg;
             if (ka.y > ka.x && ka.y > ka.z) {
               vec2 q = vKitWorld.xz;
               float g0 = kPattern(q, ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y;
               kg = vec3(kPattern(q + vec2(kE, 0.0), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y - g0, 0.0, kPattern(q + vec2(0.0, kE), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y - g0) / kE;
             } else if (ka.x > ka.z) {
               vec2 q = vec2(vKitWorld.z, vKitWorld.y);
               float g0 = kPattern(q, ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y;
               kg = vec3(0.0, kPattern(q + vec2(0.0, kE), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y - g0, kPattern(q + vec2(kE, 0.0), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y - g0) / kE;
             } else {
               vec2 q = vec2(vKitWorld.x, vKitWorld.y);
               float g0 = kPattern(q, ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y;
               kg = vec3(kPattern(q + vec2(kE, 0.0), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y - g0, kPattern(q + vec2(0.0, kE), ${course.toFixed(3)}, ${block.toFixed(3)}, ${k}).y - g0, 0.0) / kE;
             }
             vec3 kv = mat3(viewMatrix) * kg;
             kv -= normal * dot(kv, normal);
             normal = normalize(normal + kv * 0.0055 * kFade);
           }
         }`
      );
  };
  mat.customProgramCacheKey = () => `kit-${kind}`;
  mat.needsUpdate = true;
}
