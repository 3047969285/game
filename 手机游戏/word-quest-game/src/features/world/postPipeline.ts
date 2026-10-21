import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { SSRPass } from "three/addons/postprocessing/SSRPass.js";
import { TemporalAA } from "./temporalAA";
import { MeteredOutputPass } from "./exposureMeter";
import { createAerialPerspective } from "./aerialPerspective";
import { makePhysicalSky } from "./physicalAtmosphere";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { normalizedTint, type ResolvedLook } from "../memory/memoryLooks";

/**
 * 主世界与回忆舞台共用的渲染基础设施：画质分档、后期管线（AO → 泛光 → 输出 → 调色）、
 * 渐变天空的 PMREM 环境贴图。World3D 与 MemoryStage 都从这里取，保证两处画面质感一致。
 */

export type QualityTier = "high" | "med" | "low";

export interface QualityConfig {
  /** 渲染像素比上限 */
  pixelRatio: number;
  /** 草丛铺设半径（米），草丛跟随玩家动态重排 */
  grassRadius: number;
  /** 草丛格子尺寸（米），越小越密 */
  grassCell: number;
  /** 阴影贴图尺寸 */
  shadowMap: number;
  /** 是否启用泛光后期 */
  bloom: boolean;
  /** 泛光内部分辨率系数 */
  bloomScale: number;
}

export const QUALITY_PRESETS: Record<QualityTier, QualityConfig> = {
  high: { pixelRatio: 2, grassRadius: 40, grassCell: 0.8, shadowMap: 2048, bloom: true, bloomScale: 0.6 },
  med: { pixelRatio: 1.5, grassRadius: 34, grassCell: 1.1, shadowMap: 1536, bloom: true, bloomScale: 0.45 },
  low: { pixelRatio: 1, grassRadius: 26, grassCell: 1.9, shadowMap: 1024, bloom: false, bloomScale: 0.5 },
};

/** 依据设备能力推断画质档位 */
export function detectQuality(): QualityTier {
  if (typeof window === "undefined") return "med";
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const small = Math.min(window.innerWidth, window.innerHeight) < 540;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const mobile = coarse || small;
  if (mobile && (cores <= 4 || mem <= 3)) return "low";
  if (mobile) return "med";
  if (cores <= 4 || mem <= 4) return "med";
  return "high";
}

export interface PostPipelineOptions {
  /**
   * 是否启用 GTAO（仅 high 档生效，默认 true）。回忆舞台关闭它：溶解显形的物件在
   * 法线 / 深度预通道里是“实心”的，会在未显形处留下幽灵般的环境光遮蔽。
   */
  ao?: boolean;
  /** 低画质（无泛光）时也建立 composer，供回忆舞台追加定格 / 虚化通道 */
  forceComposer?: boolean;
}

export interface PostPipeline {
  composer: EffectComposer;
  bloomPass?: UnrealBloomPass;
  /** 调色通道（最后一个内置通道）；追加的通道应在它之后 addPass */
  gradePass: ShaderPass;
}

/**
 * 后期处理管线：泛光（Bloom）让水晶 / 光球 / 太阳产生电影级辉光，
 * 随后 OutputPass 做色调映射，最后一道调色。失败或低画质（且未强制）时返回 undefined，调用方直接 renderer.render。
 */
export function createPostPipeline(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  quality: QualityTier,
  options: PostPipelineOptions = {}
): PostPipeline | undefined {
  const qcfg = QUALITY_PRESETS[quality];
  if (!qcfg.bloom && !options.forceComposer) return undefined;
  try {
    const size = renderer.getSize(new THREE.Vector2());
    const w = size.x;
    const h = size.y;
    // 多重采样渲染目标：否则走后期管线时 renderer 的 antialias 不生效，边缘会有明显锯齿
    const pr = Math.min(window.devicePixelRatio, qcfg.pixelRatio);
    const target = new THREE.WebGLRenderTarget(Math.max(1, Math.floor(w * pr)), Math.max(1, Math.floor(h * pr)), {
      type: THREE.HalfFloatType,
      samples: 0,
      depthTexture: new THREE.DepthTexture(Math.max(1, Math.floor(w * pr)), Math.max(1, Math.floor(h * pr)), THREE.UnsignedIntType),
    });
    const composer = new EffectComposer(renderer, target);
    const render = new RenderPass(scene, camera);
    let depth: THREE.DepthTexture | null = null;
    const taa = camera instanceof THREE.PerspectiveCamera ? new TemporalAA(camera, () => depth) : undefined;
    const ssr = quality === "high" && options.ao !== false && camera instanceof THREE.PerspectiveCamera
      ? new SSRPass({renderer,scene,camera,width:w,height:h,selects:[],groundReflector:null}) : undefined;
    if(ssr){ssr.opacity=.2;ssr.maxDistance=10;ssr.thickness=.08;ssr.resolutionScale=.5;
      ssr.ssrMaterial.defines.MAX_STEP=48;
      const resize=render.setSize.bind(render);render.setSize=(rw,rh)=>{resize(rw,rh);ssr.setSize(rw,rh);};
      const dispose=render.dispose.bind(render);render.dispose=()=>{ssr.dispose();dispose();};
    }
    let frame=0;let selected:THREE.Mesh[]=[];
    const point=new THREE.Vector3();
    const rawRender = render.render.bind(render);
    render.render = (r, write, read, dt, mask): void => {
      if (taa?.enabled) taa.jitter(read.width, read.height);
      else if (camera instanceof THREE.PerspectiveCamera) camera.clearViewOffset();
      if(ssr && frame++%30===0){selected=[];scene.traverse(o=>{const mesh=o as THREE.Mesh;if(!mesh.isMesh)return;
        mesh.getWorldPosition(point);if(point.distanceToSquared(camera.position)>45*45)return;
        const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
        if(materials.some(m=>m instanceof THREE.MeshStandardMaterial&&m.roughness<.3&&m.metalness>.3))selected.push(mesh);
      });ssr.selects=selected;}
      if(ssr && selected.length){ssr.render(r,read,read,dt,mask);depth=ssr.beautyRenderTarget.depthTexture;}
      else {rawRender(r,write,read,dt,mask);depth=read.depthTexture;}
    };
    composer.addPass(render);
    if (camera instanceof THREE.PerspectiveCamera && camera.far > 200)
      composer.addPass(createAerialPerspective(camera, scene, () => depth));
    if (taa) composer.addPass(taa);

    // 环境光遮蔽：让建筑根部、石阶缝隙、树下出现接触阴影，物体不再"漂"在地上
    if (quality !== "low" && options.ao !== false) {
      const ao = new GTAOPass(scene, camera, w, h);
      const aoSize=ao.setSize.bind(ao);ao.setSize=(aw,ah)=>aoSize(Math.max(1,Math.floor(aw*.5)),Math.max(1,Math.floor(ah*.5)));
      ao.output = GTAOPass.OUTPUT.Default;
      ao.blendIntensity = 0.55;
      ao.updateGtaoMaterial({ radius: 1.1, distanceExponent: 1.4, thickness: 2, scale: 1.1, samples: 12, distanceFallOff: 1, screenSpaceRadius: false });
      ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 5, rings: 2, samples: 8 });
      composer.addPass(ao);
    }

    let bloom: UnrealBloomPass | undefined;
    if (qcfg.bloom) {
      const bs = qcfg.bloomScale;
      bloom = new UnrealBloomPass(new THREE.Vector2(w * bs, h * bs), 0.62, 0.5, 0.78);
      // EffectComposer.setSize 会把泛光重置成全分辨率；这里包一层，让泛光始终按 bloomScale 降采样（省一大块填充率）
      const rawSetSize = bloom.setSize.bind(bloom);
      bloom.setSize = (bw: number, bh: number): void => rawSetSize(Math.max(1, Math.floor(bw * bs)), Math.max(1, Math.floor(bh * bs)));
      composer.addPass(bloom);
    }
    composer.addPass(new MeteredOutputPass());
    // 调色（记忆回溯 · 科技风）：输出空间做 S 曲线对比、抬黑、冷暗部 / 中性亮部色偏、饱和度；
    // 暗角区域额外叠加色差与极淡的扫描线 / 全息微闪（仅画面边缘，中心保持干净）。参数由 applyGrade(look) 驱动。
    const gradePass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uContrast: { value: 1.06 },
        uSat: { value: 1.04 },
        uLift: { value: 0.012 },
        uShadow: { value: new THREE.Vector3(0.7, 1.15, 1.3) },
        uHighlight: { value: new THREE.Vector3(0.96, 1.0, 1.05) },
        uTintAmt: { value: 0.14 },
        uAberration: { value: 0.0016 },
        uScan: { value: 0.035 },
        uVig: { value: 0.2 },
        uRes: { value: new THREE.Vector2(1280, 720) },
        uTime: { value: 0 },
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float uContrast, uSat, uLift, uTintAmt, uAberration, uScan, uVig, uTime;
          uniform vec3 uShadow, uHighlight;
          uniform vec2 uRes;
          varying vec2 vUv;
          void main() {
            vec2 q = vUv - 0.5;
            float rr = length(q * vec2(1.0, 1.12));
            // 只在画面边缘（暗角区域）生效的权重：中心为 0
            float edge = smoothstep(0.34, 0.92, rr);
            vec2 dir = normalize(q + 1e-5);
            float ab = uAberration * edge * (0.4 + rr);
            vec3 c;
            c.r = texture2D(tDiffuse, vUv + dir * ab).r;
            c.g = texture2D(tDiffuse, vUv).g;
            c.b = texture2D(tDiffuse, vUv - dir * ab).b;
            float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
            c = mix(vec3(l), c, uSat);
            c = mix(c, c * c * (3.0 - 2.0 * c), clamp((uContrast - 1.0) * 4.0 + 0.2, 0.0, 0.6));
            // 暗部偏冷（微青）、亮部中性偏冷的白；乘子已按亮度归一化，只改色相不改亮度
            c *= mix(vec3(1.0), mix(uShadow, uHighlight, smoothstep(0.04, 0.7, l)), uTintAmt);
            c = c * (1.0 - uLift) + uLift;
            // 全息扫描线：仅边缘，随时间极缓慢流动的亮带
            float scan = 0.5 + 0.5 * sin(vUv.y * uRes.y * 1.15 + uTime * 0.6);
            float band = smoothstep(0.0, 1.0, 0.5 + 0.5 * sin(vUv.y * 5.0 - uTime * 0.35));
            c *= 1.0 - uScan * edge * (scan * 0.6 + band * 0.4);
            c += vec3(0.0, 0.012, 0.018) * uScan * edge * band * 4.0;
            float vig = smoothstep(0.98, 0.3, rr);
            c *= mix(1.0 - uVig * 0.7, 1.0, vig);
            gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
          }
        `,
    });
    composer.addPass(gradePass);

    composer.setPixelRatio(Math.min(window.devicePixelRatio, qcfg.pixelRatio));
    composer.setSize(w, h);

    return { composer, bloomPass: bloom, gradePass };
  } catch {
    // 后期处理初始化失败时回退到直接渲染
    return undefined;
  }
}

export interface EnvironmentPalette {
  skyTop: THREE.ColorRepresentation;
  skyMid: THREE.ColorRepresentation;
  skyBot: THREE.ColorRepresentation;
  sunColor: THREE.ColorRepresentation;
  sunDir?: THREE.Vector3;
}

/**
 * 用渐变天穹 + 太阳高光生成 PMREM 环境贴图（金属 / 玻璃 / 清漆的反射来源）。
 * 调用方负责 dispose 返回的渲染目标；失败时返回 undefined（退回无反射渲染）。
 */
export function buildSkyEnvironment(renderer: THREE.WebGLRenderer, palette: EnvironmentPalette): THREE.WebGLRenderTarget | undefined {
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const sky = makePhysicalSky(10);
    if (palette.sunDir) sky.material.uniforms.sunPosition.value.copy(palette.sunDir).multiplyScalar(450000);
    sky.material.uniforms.showSunDisc.value = false;
    envScene.add(sky);

    const rt = pmrem.fromScene(envScene, 0.02);

    envScene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      }
    });
    pmrem.dispose();
    return rt;
  } catch {
    return undefined;
  }
}

const _sh: [number, number, number] = [1, 1, 1];
const _hi: [number, number, number] = [1, 1, 1];

/** 把当前记忆色调写进调色通道（无分配）。resX/resY 为绘制缓冲像素尺寸，用于扫描线密度 */
export function applyGrade(pass: ShaderPass, look: ResolvedLook, time: number, resX: number, resY: number): void {
  const u = pass.uniforms;
  u.uContrast.value = look.contrast;
  u.uSat.value = look.saturation;
  u.uLift.value = look.lift;
  u.uTintAmt.value = look.tintAmt;
  u.uAberration.value = look.aberration;
  u.uScan.value = look.scanline;
  u.uVig.value = look.vignette;
  u.uTime.value = time;
  u.uRes.value.set(resX, resY);
  normalizedTint(look.shadowTint, _sh);
  normalizedTint(look.highlightTint, _hi);
  u.uShadow.value.set(_sh[0], _sh[1], _sh[2]);
  u.uHighlight.value.set(_hi[0], _hi[1], _hi[2]);
}
