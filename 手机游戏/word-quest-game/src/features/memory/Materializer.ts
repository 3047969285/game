import * as THREE from "three";
import { acquireGlyphAtlas, releaseGlyphAtlas, GLYPH_FRAGMENT_GLSL, glyphsOf } from "./glyphAtlas";
import type { BuildStyle } from "./types";

/**
 * 世界随声音建立。
 *
 * 每个“可建立的东西”（一堵墙、一张桌、一个单词物件）注册成一个 Piece：
 *  - 材质：对象里每种材质都 **克隆一份**（每个 Piece 自己的材质实例），用 onBeforeCompile 打上溶解补丁。
 *    溶解参数（uRvAmt / uRvGhost / uRvPulse …）是 Piece 私有的 uniform 对象，同一 Piece 的所有克隆共享引用。
 *    three 只在“切换材质”时重传 uniform，所以每个 Piece 用独立的材质实例才能保证各自的显形进度互不串扰。
 *    克隆继承原材质的 onBeforeCompile / customProgramCacheKey（程序化表面、植被风），并在缓存键后追加补丁标记，
 *    因此同类材质的所有克隆仍然共用同一个 GPU 程序，不增加编译次数。
 *  - 阴影：castShadow 的网格配一份同样带溶解丢弃的深度材质（沿用植被的风深度材质），未显形的部分不会投下幽灵阴影。
 *  - 溶解：世界空间的“方向 + 噪声”场 f∈[0,1]，f 小于推进前沿 r 的像素保留，其余 discard；前沿内侧一圈叠加冷白自发光
 *    （HDR，被泛光拾取）；前沿外侧可选“幽灵”态：抖动抽样的冷光点阵，用于触碰前漂浮的物件。
 *  - 粒子：整个舞台共用一个 THREE.Points（一次 draw call），显形开始时在环形缓冲里分配该 Piece 的粒子：
 *    取自物件表面的采样点，从起点汇聚到目标；其中 3–6 个是半透明英文字母（字形图集取样）。
 * 开销：Piece 未显形且无幽灵时 obj.visible=false，不产生任何绘制；显形完成后与普通网格相同，仅多一个已跳过的分支。
 */

const EDGE_WIDTH = 0.075;

const STYLE_PARAMS: Record<BuildStyle, { radial: boolean; noise: number; scale: number; growY: boolean }> = {
  rise: { radial: false, noise: 0.28, scale: 1.7, growY: false },
  grow: { radial: false, noise: 0.22, scale: 2.2, growY: true },
  condense: { radial: true, noise: 0.74, scale: 3.4, growY: false },
  fade: { radial: true, noise: 0.95, scale: 1.2, growY: false },
};

const RV_COMMON = /* glsl */ `
varying vec3 vRvPos;
`;

const RV_FRAG_PARS = /* glsl */ `
varying vec3 vRvPos;
uniform float uRvAmt;
uniform float uRvGhost;
uniform float uRvPulse;
uniform float uRvMode;
uniform vec3 uRvDir;
uniform vec3 uRvCenter;
uniform float uRvBase;
uniform float uRvSpan;
uniform float uRvNoise;
uniform float uRvScale;
uniform float uRvSeed;
uniform float uRvTime;
uniform vec3 uRvEdge;
float rvH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float rvN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(rvH(i), rvH(i + vec3(1, 0, 0)), f.x), mix(rvH(i + vec3(0, 1, 0)), rvH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(rvH(i + vec3(0, 0, 1)), rvH(i + vec3(1, 0, 1)), f.x), mix(rvH(i + vec3(0, 1, 1)), rvH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
float rvField(vec3 p) {
  float t = uRvMode < 0.5 ? (dot(p, uRvDir) - uRvBase) / uRvSpan : length(p - uRvCenter) / uRvSpan;
  t = clamp(t, 0.0, 1.0);
  float n = rvN(p * uRvScale + uRvSeed) * 0.65 + rvN(p * uRvScale * 2.7 + uRvSeed * 1.7) * 0.35;
  n = smoothstep(0.18, 0.82, n);
  return mix(t, n, uRvNoise);
}
`;

const RV_VERT_MAIN = /* glsl */ `
{
  vec4 rvP = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  rvP = instanceMatrix * rvP;
  #endif
  vRvPos = (modelMatrix * rvP).xyz;
}
`;

const RV_FRAG_MAIN = /* glsl */ `
bool rvGhostPx = false;
float rvGlow = 0.0;
if (uRvAmt < 0.9999) {
  float rvF = rvField(vRvPos);
  float rvR = mix(-${EDGE_WIDTH.toFixed(3)}, 1.0 + ${EDGE_WIDTH.toFixed(3)}, uRvAmt);
  if (rvF > rvR) {
    if (uRvGhost < 0.004) discard;
    float cover = uRvGhost * (0.2 + 0.8 * rvN(vRvPos * uRvScale * 5.0 + uRvTime * 0.5));
    if (rvH(vec3(gl_FragCoord.xy, floor(uRvTime * 8.0))) > cover) discard;
    rvGhostPx = true;
  } else {
    rvGlow = 1.0 - smoothstep(0.0, ${(EDGE_WIDTH * 1.7).toFixed(3)}, rvR - rvF);
  }
}
`;

const RV_FRAG_MAIN_DEPTH = /* glsl */ `
if (uRvAmt < 0.9999) {
  float rvF = rvField(vRvPos);
  float rvR = mix(-${EDGE_WIDTH.toFixed(3)}, 1.0 + ${EDGE_WIDTH.toFixed(3)}, uRvAmt);
  if (rvF > rvR) discard;
}
`;

const RV_FRAG_OUT = /* glsl */ `
if (rvGhostPx) {
  float rvTw = 0.75 + 0.25 * sin(uRvTime * 2.4 + vRvPos.x * 3.0 + vRvPos.y * 2.0);
  gl_FragColor = vec4(uRvEdge * rvTw * 1.5, 1.0);
} else {
  gl_FragColor.rgb += uRvEdge * (rvGlow * rvGlow * 2.6);
  #ifdef RV_PULSE
  float rvFr = pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), 2.0);
  gl_FragColor.rgb += uRvEdge * uRvPulse * (0.18 + rvFr * 1.4);
  #endif
}
`;

export interface RevealUniforms {
  uRvAmt: { value: number };
  uRvGhost: { value: number };
  uRvPulse: { value: number };
  uRvMode: { value: number };
  uRvDir: { value: THREE.Vector3 };
  uRvCenter: { value: THREE.Vector3 };
  uRvBase: { value: number };
  uRvSpan: { value: number };
  uRvNoise: { value: number };
  uRvScale: { value: number };
  uRvSeed: { value: number };
  uRvTime: { value: number };
  uRvEdge: { value: THREE.Color };
}

/** 给一份（已克隆的）材质打溶解补丁；depth=true 时只做丢弃（阴影深度通道） */
export function applyRevealPatch(clone: THREE.Material, source: THREE.Material, u: RevealUniforms, depth: boolean): void {
  const prevCompile = source.onBeforeCompile;
  const prevKey = source.customProgramCacheKey();
  clone.onBeforeRender = source.onBeforeRender;
  clone.onBeforeCompile = (shader, renderer) => {
    prevCompile.call(source, shader, renderer);
    Object.assign(shader.uniforms, u);
    const withPulse = !depth && shader.fragmentShader.includes("vViewPosition") && shader.fragmentShader.includes("normal_fragment_begin");
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${RV_COMMON}`)
      .replace("#include <project_vertex>", `#include <project_vertex>\n${RV_VERT_MAIN}`);
    let frag = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${withPulse ? "#define RV_PULSE\n" : ""}${RV_FRAG_PARS}`)
      .replace("#include <clipping_planes_fragment>", `#include <clipping_planes_fragment>\n${depth ? RV_FRAG_MAIN_DEPTH : RV_FRAG_MAIN}`);
    if (!depth) frag = frag.replace("#include <dithering_fragment>", `#include <dithering_fragment>\n${RV_FRAG_OUT}`);
    shader.fragmentShader = frag;
  };
  clone.customProgramCacheKey = () => `${prevKey}|rv1|${depth ? "d" : "c"}`;
  clone.needsUpdate = true;
}

function createUniforms(timeU: { value: number }, seed: number): RevealUniforms {
  return {
    uRvAmt: { value: 0 },
    uRvGhost: { value: 0 },
    uRvPulse: { value: 0 },
    uRvMode: { value: 0 },
    uRvDir: { value: new THREE.Vector3(0, 1, 0) },
    uRvCenter: { value: new THREE.Vector3() },
    uRvBase: { value: 0 },
    uRvSpan: { value: 1 },
    uRvNoise: { value: 0.3 },
    uRvScale: { value: 2 },
    uRvSeed: { value: seed },
    uRvTime: timeU,
    uRvEdge: { value: new THREE.Color(0.62, 0.86, 1.0) },
  };
}

type PieceState = "hidden" | "revealing" | "revealed" | "hiding";

export interface Piece {
  id: string;
  obj: THREE.Object3D;
  style: BuildStyle;
  u: RevealUniforms;
  state: PieceState;
  /** 0..1：当前溶解进度（已缓动） */
  amt: number;
  t: number;
  duration: number;
  ghostBase: number;
  pulseBase: number;
  meshes: THREE.Mesh[];
  clones: THREE.Material[];
  depthClones: THREE.Material[];
  samples: Float32Array;
  box: THREE.Box3;
  center: THREE.Vector3;
  size: THREE.Vector3;
  baseScale: THREE.Vector3;
  letters: number[];
  waiters: Array<() => void>;
}

export interface MaterializerOptions {
  /** 粒子池容量；缺省按画质 */
  capacity?: number;
  /** 每个 Piece 最多汇聚多少粒子 */
  perPiece?: number;
  /** 不创建 Points（node 测试用） */
  headless?: boolean;
}

export interface RevealOptions {
  /** 汇聚的字母来源（句子或单词）；缺省用 Piece 名 */
  letters?: string;
  /** 延迟开始（秒） */
  delay?: number;
}

const ease = (x: number): number => x * x * x * (x * (x * 6 - 15) + 10); // smootherstep

const POINTS_VERT = /* glsl */ `
attribute vec3 aStart;
attribute vec3 aTarget;
attribute vec4 aInfo; // x=开始时间 y=飞行时长 z=随机种子 w=字形格号(-1=光点)
attribute vec2 aLook; // x=世界尺寸(米) y=暖色混合
uniform float uTime;
uniform float uScale;
varying float vA;
varying float vGlyph;
varying vec3 vCol;
void main() {
  float k = (uTime - aInfo.x) / max(aInfo.y, 0.001);
  if (k < 0.0 || k > 1.3) {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vA = 0.0; vGlyph = -1.0; vCol = vec3(0.0);
    return;
  }
  float m = clamp(k, 0.0, 1.0);
  float e = 1.0 - pow(1.0 - m, 2.6);
  vec3 pos = mix(aStart, aTarget, e);
  vec3 d = aTarget - aStart;
  vec3 side = normalize(cross(d, vec3(0.0, 1.0, 0.0)) + vec3(1e-4));
  pos += side * sin(m * 3.14159) * (aInfo.z - 0.5) * 0.5 * length(d) * 0.5;
  pos.y += sin(m * 3.14159) * 0.18 * aInfo.z;
  vA = smoothstep(0.0, 0.18, k) * (1.0 - smoothstep(0.82, 1.3, k));
  vGlyph = aInfo.w;
  vCol = mix(vec3(0.55, 0.85, 1.15), vec3(1.25, 1.1, 0.9), aLook.y);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(aLook.x * uScale / max(-mv.z, 0.1), 1.0, 110.0);
}
`;

const POINTS_FRAG = /* glsl */ `
uniform sampler2D uAtlas;
varying float vA;
varying float vGlyph;
varying vec3 vCol;
${GLYPH_FRAGMENT_GLSL}
void main() {
  float a = glyphAlpha(uAtlas, vGlyph, gl_PointCoord) * vA;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vCol * (vGlyph < -0.5 ? 1.6 : 1.2), a * (vGlyph < -0.5 ? 0.9 : 0.75));
}
`;

export class Materializer {
  readonly group = new THREE.Group();
  private readonly pieces = new Map<string, Piece>();
  private readonly timeU = { value: 0 };
  private time = 0;
  private points?: THREE.Points;
  private pointsMat?: THREE.ShaderMaterial;
  private atlas: THREE.Texture | null = null;
  private cap = 0;
  private perPiece: number;
  private cursor = 0;
  private aStart!: THREE.BufferAttribute;
  private aTarget!: THREE.BufferAttribute;
  private aInfo!: THREE.BufferAttribute;
  private aLook!: THREE.BufferAttribute;
  private seed = 1;

  constructor(opts: MaterializerOptions = {}) {
    this.group.name = "materializer";
    this.perPiece = opts.perPiece ?? 160;
    if (!opts.headless) this.buildPoints(opts.capacity ?? 3200);
  }

  private rand(): number {
    // mulberry32：让每次运行的粒子分布一致，便于复现
    this.seed = (this.seed + 0x6d2b79f5) | 0;
    let t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  private buildPoints(capacity: number): void {
    this.cap = capacity;
    const g = new THREE.BufferGeometry();
    const dummy = new Float32Array(capacity * 3);
    g.setAttribute("position", new THREE.BufferAttribute(dummy, 3));
    this.aStart = new THREE.BufferAttribute(new Float32Array(capacity * 3), 3);
    this.aTarget = new THREE.BufferAttribute(new Float32Array(capacity * 3), 3);
    const info = new Float32Array(capacity * 4);
    for (let i = 0; i < capacity; i++) {
      info[i * 4] = 1e9;
      info[i * 4 + 1] = 1;
      info[i * 4 + 3] = -1;
    }
    this.aInfo = new THREE.BufferAttribute(info, 4);
    this.aLook = new THREE.BufferAttribute(new Float32Array(capacity * 2), 2);
    for (const a of [this.aStart, this.aTarget, this.aInfo, this.aLook]) a.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("aStart", this.aStart);
    g.setAttribute("aTarget", this.aTarget);
    g.setAttribute("aInfo", this.aInfo);
    g.setAttribute("aLook", this.aLook);
    this.atlas = acquireGlyphAtlas();
    this.pointsMat = new THREE.ShaderMaterial({
      uniforms: { uTime: this.timeU, uScale: { value: 600 }, uAtlas: { value: this.atlas } },
      vertexShader: POINTS_VERT,
      fragmentShader: POINTS_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.pointsMat.toneMapped = true;
    this.points = new THREE.Points(g, this.pointsMat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 10;
    this.points.name = "materializer-particles";
    this.group.add(this.points);
  }

  /** 屏幕像素高度与垂直 fov（度）：把世界尺寸换算成点精灵像素大小 */
  setView(heightPx: number, fovDeg: number): void {
    if (!this.pointsMat) return;
    this.pointsMat.uniforms.uScale.value = heightPx / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2));
  }

  /** 注册一个可建立的对象（名字必须唯一）。注册后立即不可见。 */
  register(obj: THREE.Object3D, style: BuildStyle = "condense", name = obj.name): Piece {
    if (!name) throw new Error("Materializer.register: 对象需要 name");
    if (this.pieces.has(name)) throw new Error(`Materializer.register: 重复的名字 ${name}`);
    obj.updateMatrixWorld(true);
    const params = STYLE_PARAMS[style];
    const u = createUniforms(this.timeU, this.rand() * 40);
    const box = new THREE.Box3().setFromObject(obj);
    if (box.isEmpty()) box.set(new THREE.Vector3(-0.1, 0, -0.1).add(obj.position), new THREE.Vector3(0.1, 0.2, 0.1).add(obj.position));
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    u.uRvMode.value = params.radial ? 1 : 0;
    u.uRvNoise.value = params.noise;
    u.uRvScale.value = params.scale;
    if (params.radial) {
      u.uRvCenter.value.copy(center);
      u.uRvSpan.value = Math.max(0.15, size.length() / 2);
      u.uRvBase.value = 0;
    } else {
      u.uRvDir.value.set(0, 1, 0);
      u.uRvBase.value = box.min.y;
      u.uRvSpan.value = Math.max(0.25, size.y);
    }

    const piece: Piece = {
      id: name,
      obj,
      style,
      u,
      state: "hidden",
      amt: 0,
      t: 0,
      duration: 2.5,
      ghostBase: 0,
      pulseBase: 0,
      meshes: [],
      clones: [],
      depthClones: [],
      samples: new Float32Array(0),
      box,
      center,
      size,
      baseScale: obj.scale.clone(),
      letters: glyphsOf(name.replace(/^[a-z]+:/, "")),
      waiters: [],
    };

    const cloneOf = new Map<THREE.Material, THREE.Material>();
    const swap = (m: THREE.Material): THREE.Material => {
      let c = cloneOf.get(m);
      if (!c) {
        c = m.clone();
        if ("fog" in c) (c as THREE.MeshStandardMaterial).fog = true; // 套件材质默认关雾；回忆里未建好的远处要融进雾里
        applyRevealPatch(c, m, u, false);
        cloneOf.set(m, c);
        piece.clones.push(c);
      }
      return c;
    };
    obj.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || (mesh as THREE.InstancedMesh).isInstancedMesh) return;
      piece.meshes.push(mesh);
      const original = mesh.material;
      const first = (Array.isArray(original) ? original[0] : original) as THREE.Material;
      mesh.material = Array.isArray(original) ? original.map(swap) : swap(original);
      if (mesh.castShadow) {
        const baseDepth = mesh.customDepthMaterial ?? new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
        const depth = baseDepth.clone();
        if (!mesh.customDepthMaterial) {
          const std = first as THREE.MeshStandardMaterial;
          if (std.map && std.alphaTest > 0) {
            (depth as THREE.MeshDepthMaterial).map = std.map;
            depth.alphaTest = std.alphaTest;
          }
        }
        applyRevealPatch(depth, baseDepth, u, true);
        mesh.customDepthMaterial = depth;
        piece.depthClones.push(depth);
      }
    });

    piece.samples = this.sampleSurface(piece.meshes, box, center);
    obj.visible = false;
    this.pieces.set(name, piece);
    return piece;
  }

  private sampleSurface(meshes: THREE.Mesh[], box: THREE.Box3, center: THREE.Vector3): Float32Array {
    const want = 240;
    const total = meshes.reduce((n, m) => n + (m.geometry.getAttribute("position")?.count ?? 0), 0);
    const out: number[] = [];
    const v = new THREE.Vector3();
    if (total > 0) {
      for (const mesh of meshes) {
        const pos = mesh.geometry.getAttribute("position");
        if (!pos) continue;
        const take = Math.max(1, Math.round((pos.count / total) * want));
        for (let i = 0; i < take; i++) {
          v.fromBufferAttribute(pos, Math.floor(this.rand() * pos.count)).applyMatrix4(mesh.matrixWorld);
          out.push(v.x, v.y, v.z);
        }
      }
    }
    if (out.length === 0) {
      for (let i = 0; i < 24; i++) out.push(THREE.MathUtils.lerp(box.min.x, box.max.x, this.rand()), THREE.MathUtils.lerp(box.min.y, box.max.y, this.rand()), THREE.MathUtils.lerp(box.min.z, box.max.z, this.rand()));
    }
    void center;
    return new Float32Array(out);
  }

  has(target: string | THREE.Object3D): boolean {
    return this.lookup(target) !== undefined;
  }

  piece(target: string | THREE.Object3D): Piece | undefined {
    return this.lookup(target);
  }

  private lookup(target: string | THREE.Object3D): Piece | undefined {
    return typeof target === "string" ? this.pieces.get(target) : this.pieces.get(target.name);
  }

  /** 幽灵态：未显形时以抖动的冷光点阵“漂浮”。0 关闭 */
  setGhost(target: string | THREE.Object3D, amount: number): void {
    const p = this.lookup(target);
    if (!p) return;
    p.ghostBase = amount;
    if (p.state === "hidden") p.obj.visible = amount > 0.004;
  }

  /** 边缘光脉冲（悬停 / 提示闪烁）。0 关闭 */
  setPulse(target: string | THREE.Object3D, amount: number): void {
    const p = this.lookup(target);
    if (p) p.pulseBase = amount;
  }

  /**
   * 开始显形。返回的 Promise 在显形完成（或舞台销毁）时 resolve。重复调用是幂等的。
   */
  reveal(target: string | THREE.Object3D, duration?: number, opts: RevealOptions = {}): Promise<void> {
    const p = this.lookup(target);
    if (!p) return Promise.resolve();
    if (p.state === "revealed") return Promise.resolve();
    return new Promise<void>((resolve) => {
      p.waiters.push(resolve);
      if (p.state === "revealing") return;
      p.duration = Math.max(0.2, duration ?? 2.5);
      p.t = -(opts.delay ?? 0);
      if (opts.letters) p.letters = glyphsOf(opts.letters);
      p.state = "revealing";
      p.obj.visible = true;
      this.emitParticles(p, opts.delay ?? 0);
    });
  }

  /** 反向溶解消失（演员退场等） */
  hide(target: string | THREE.Object3D, duration = 1.2): Promise<void> {
    const p = this.lookup(target);
    if (!p || p.state === "hidden") return Promise.resolve();
    return new Promise<void>((resolve) => {
      p.waiters.push(resolve);
      p.duration = Math.max(0.2, duration);
      p.t = 0;
      p.state = "hiding";
    });
  }

  isRevealed(target: string | THREE.Object3D): boolean {
    return this.lookup(target)?.state === "revealed";
  }

  isRevealing(target: string | THREE.Object3D): boolean {
    return this.lookup(target)?.state === "revealing";
  }

  /** 立刻完成所有进行中的显形（跳过 / 定格前） */
  completeAll(): void {
    for (const p of this.pieces.values()) {
      if (p.state === "revealing") this.settle(p, true);
    }
  }

  /** 平均建立进度（只统计 filter 为真的 Piece），用来驱动环境亮度 */
  progress(filter?: (p: Piece) => boolean): number {
    let sum = 0;
    let n = 0;
    for (const p of this.pieces.values()) {
      if (filter && !filter(p)) continue;
      n++;
      sum += p.state === "revealed" ? 1 : p.state === "revealing" || p.state === "hiding" ? p.amt : 0;
    }
    return n ? sum / n : 1;
  }

  forEach(cb: (p: Piece) => void): void {
    this.pieces.forEach(cb);
  }

  /**
   * 预编译：让所有 Piece 临时可见并编译全部着色器程序，避免首次显形时卡顿。
   */
  async prewarm(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): Promise<void> {
    const saved = new Map<Piece, boolean>();
    for (const p of this.pieces.values()) {
      saved.set(p, p.obj.visible);
      p.obj.visible = true;
    }
    try {
      const r = renderer as THREE.WebGLRenderer & { compileAsync?: (s: THREE.Object3D, c: THREE.Camera) => Promise<unknown> };
      if (r.compileAsync) {
        // 编译很慢的设备上也不能无限等待：最多等 6 秒，之后让首帧自己去编译
        await Promise.race([r.compileAsync(scene, camera), new Promise((resolve) => setTimeout(resolve, 6000))]);
      } else {
        renderer.compile(scene, camera);
      }
    } catch {
      // 编译失败会在首次绘制时暴露；这里不阻塞
    } finally {
      for (const [p, v] of saved) p.obj.visible = v;
    }
  }

  private emitParticles(p: Piece, delay: number): void {
    if (!this.points) return;
    const dur = p.duration;
    const sizeLen = p.size.length();
    const surface = 2 * (p.size.x * p.size.y + p.size.y * p.size.z + p.size.x * p.size.z);
    const dust = THREE.MathUtils.clamp(Math.round(surface * 5), 32, this.perPiece);
    const letters = THREE.MathUtils.clamp(3 + Math.round(sizeLen / 3), 3, 6);
    const params = STYLE_PARAMS[p.style];
    const flight = THREE.MathUtils.clamp(dur * 0.55, 0.9, 2.2);
    const startAt = this.time + delay;
    const nSamples = p.samples.length / 3;
    const spanAlong = Math.max(0.25, p.u.uRvSpan.value);

    for (let i = 0; i < dust + letters; i++) {
      const isLetter = i >= dust && p.letters.length > 0;
      if (i >= dust && !isLetter) break;
      const slot = this.cursor;
      this.cursor = (this.cursor + 1) % this.cap;
      const si = Math.floor(this.rand() * nSamples) * 3;
      const tx = p.samples[si];
      const ty = p.samples[si + 1];
      const tz = p.samples[si + 2];

      // 起点：按风格决定从哪汇聚
      let sx: number, sy: number, sz: number;
      const r1 = this.rand();
      const r2 = this.rand();
      const r3 = this.rand();
      if (p.style === "rise") {
        const ang = r1 * Math.PI * 2;
        const rad = 1.2 + r2 * 2.0;
        sx = tx + Math.cos(ang) * rad;
        sz = tz + Math.sin(ang) * rad;
        sy = p.box.min.y + r3 * 0.35;
      } else if (p.style === "grow") {
        sx = tx + (r1 - 0.5) * 0.8;
        sz = tz + (r2 - 0.5) * 0.8;
        sy = p.box.min.y - 0.6 - r3 * 0.8;
      } else if (p.style === "condense") {
        const ang = r1 * Math.PI * 2;
        const el = (r2 - 0.5) * Math.PI;
        const rad = sizeLen * 0.5 + 1.0 + r3 * 1.6;
        sx = p.center.x + Math.cos(ang) * Math.cos(el) * rad;
        sy = p.center.y + Math.sin(el) * rad * 0.8 + 0.4;
        sz = p.center.z + Math.sin(ang) * Math.cos(el) * rad;
      } else {
        sx = tx + (r1 - 0.5) * 1.6;
        sy = ty + 0.3 + r2 * 0.9;
        sz = tz + (r3 - 0.5) * 1.6;
      }

      // 到达时间：方向风格按高度推进（与溶解前沿一致），噪声风格随机
      const along = params.radial ? this.rand() : THREE.MathUtils.clamp((ty - p.u.uRvBase.value) / spanAlong, 0, 1);
      const arrival = THREE.MathUtils.lerp(this.rand(), along, 1 - params.noise);
      const t0 = startAt + Math.max(0, arrival * dur * 0.8 - flight * 0.55);

      this.aStart.setXYZ(slot, sx, sy, sz);
      this.aTarget.setXYZ(slot, tx, ty, tz);
      const glyph = isLetter ? p.letters[Math.floor(this.rand() * p.letters.length)] : -1;
      this.aInfo.setXYZW(slot, t0, flight * (isLetter ? 1.25 : 1), this.rand(), glyph);
      this.aLook.setXY(slot, isLetter ? 0.2 + this.rand() * 0.14 : 0.05 + this.rand() * 0.07, this.rand() < 0.18 ? 1 : 0);
    }
    this.aStart.needsUpdate = this.aTarget.needsUpdate = this.aInfo.needsUpdate = this.aLook.needsUpdate = true;
  }

  private settle(p: Piece, revealed: boolean): void {
    p.state = revealed ? "revealed" : "hidden";
    p.amt = revealed ? 1 : 0;
    p.t = 0;
    p.u.uRvAmt.value = p.amt;
    p.u.uRvGhost.value = revealed ? 0 : p.ghostBase;
    p.obj.visible = revealed || p.ghostBase > 0.004;
    if (p.style === "grow") p.obj.scale.copy(p.baseScale);
    const waiters = p.waiters;
    p.waiters = [];
    for (const w of waiters) w();
  }

  update(dt: number): void {
    this.time += dt;
    this.timeU.value = this.time;
    for (const p of this.pieces.values()) {
      if (p.state === "revealing") {
        p.t += dt;
        const k = Math.min(1, Math.max(0, p.t / p.duration));
        p.amt = ease(k);
        p.u.uRvAmt.value = p.amt;
        p.u.uRvGhost.value = Math.max(p.ghostBase * (1 - p.amt), 0.16 * (1 - k));
        if (STYLE_PARAMS[p.style].growY) {
          const s = 0.72 + 0.28 * p.amt;
          p.obj.scale.set(p.baseScale.x, p.baseScale.y * s, p.baseScale.z);
        }
        if (k >= 1) this.settle(p, true);
      } else if (p.state === "hiding") {
        p.t += dt;
        const k = Math.min(1, p.t / p.duration);
        p.amt = 1 - ease(k);
        p.u.uRvAmt.value = p.amt;
        p.u.uRvGhost.value = 0;
        if (k >= 1) this.settle(p, false);
      } else if (p.state === "hidden") {
        p.u.uRvGhost.value = p.ghostBase;
      }
      p.u.uRvPulse.value = p.pulseBase > 0 ? p.pulseBase * (0.7 + 0.3 * Math.sin(this.time * 5)) : 0;
    }
  }

  dispose(): void {
    for (const p of this.pieces.values()) {
      for (const w of p.waiters) w();
      p.waiters = [];
      for (const m of p.clones) m.dispose();
      for (const m of p.depthClones) m.dispose();
      for (const mesh of p.meshes) mesh.customDepthMaterial = undefined as unknown as THREE.Material;
    }
    this.pieces.clear();
    this.points?.geometry.dispose();
    this.pointsMat?.dispose();
    if (this.atlas) releaseGlyphAtlas();
    this.group.removeFromParent();
  }
}
