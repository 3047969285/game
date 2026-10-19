import * as THREE from "three";
import { acquireGlyphAtlas, releaseGlyphAtlas, GLYPH_FRAGMENT_GLSL, glyphsOf } from "./glyphAtlas";
import type { QualityTier } from "../world/postPipeline";

/**
 * “记忆的洪流”：场景里持续存在的环境粒子——缓慢流动的光尘与半透明的英文字母。
 * 空场景时它是唯一可见的东西（雾中的光）；朗读时流速变快、往正在显形的物件方向偏转。
 *
 * 全部粒子是一个 THREE.Points（一次 draw call）。位置完全在顶点着色器里解析计算：
 *   p = 基点 × 盒子 + 速度 × 流时间，再对“盒子中心（跟随相机焦点）”取模环绕，
 * 因此没有逐帧 CPU 更新；流速变化靠 CPU 累积“流时间”，不会产生跳变。
 */

const VERT = /* glsl */ `
attribute vec3 aBase;
attribute vec3 aVel;
attribute vec4 aInfo; // x=种子 y=速度/相位倍率 z=字形格号(-1=光点) w=世界尺寸
uniform float uT;
uniform vec3 uCenter;
uniform vec3 uBox;
uniform float uScale;
uniform vec3 uAtt;
uniform float uAttAmt;
uniform float uVis;
varying float vA;
varying float vGlyph;
varying vec3 vCol;
void main() {
  vec3 p = aBase * uBox + aVel * uT;
  p = uCenter + (mod(p - uCenter + 0.5 * uBox, uBox) - 0.5 * uBox);
  vec3 rel = (p - uCenter) / (0.5 * uBox);
  float edge = 1.0 - smoothstep(0.78, 1.0, max(max(abs(rel.x), abs(rel.y)), abs(rel.z)));
  float sd = aInfo.x * 40.0;
  p += vec3(sin(uT * 0.31 + sd), sin(uT * 0.23 + sd * 1.7) * 0.6, cos(uT * 0.27 + sd * 0.7)) * 0.38;
  vec3 d = uAtt - p;
  float w = uAttAmt * smoothstep(10.0, 0.6, length(d));
  p += d * w * 0.5;
  float tw;
  if (aInfo.z < -0.5) {
    tw = 0.3 + 0.7 * pow(0.5 + 0.5 * sin(uT * 0.9 * aInfo.y + aInfo.x * 6.283), 2.0);
  } else {
    tw = pow(0.5 + 0.5 * sin(uT * 0.35 * aInfo.y + aInfo.x * 6.283), 2.0) * 0.75;
  }
  vA = tw * edge * uVis * (0.65 + w * 0.7);
  vGlyph = aInfo.z;
  vCol = mix(vec3(0.5, 0.78, 1.1), vec3(1.15, 1.0, 0.85), step(0.82, fract(aInfo.x * 7.31)));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(aInfo.w * uScale / max(-mv.z, 0.1), 1.0, 90.0);
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uAtlas;
varying float vA;
varying float vGlyph;
varying vec3 vCol;
${GLYPH_FRAGMENT_GLSL}
void main() {
  float a = glyphAlpha(uAtlas, vGlyph, gl_PointCoord) * vA;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vCol * (vGlyph < -0.5 ? 1.5 : 1.15), a * (vGlyph < -0.5 ? 0.85 : 0.7));
}
`;

const DEFAULT_LETTERS = glyphsOf("rememberthursdayconversationcourtyard");

export class MemoryFlow {
  readonly object: THREE.Points;
  private readonly material: THREE.ShaderMaterial;
  private readonly atlas: THREE.Texture | null;
  private readonly geometry: THREE.BufferGeometry;
  private readonly info: THREE.BufferAttribute;
  private readonly dustCount: number;
  private readonly letterCount: number;
  private flowT = 0;
  private speed = 1;
  private speedTarget = 1;
  private attAmt = 0;
  private attTarget = 0;
  private visibility = 1;
  private visTarget = 1;
  private readonly center = new THREE.Vector3();
  private readonly centerTarget = new THREE.Vector3();
  private pending: number[] = [];
  private nextLetter = 0;

  constructor(quality: QualityTier) {
    // 低画质：粒子数减半
    const dust = quality === "high" ? 560 : quality === "med" ? 400 : 200;
    const letters = quality === "high" ? 40 : quality === "med" ? 30 : 16;
    this.dustCount = dust;
    this.letterCount = letters;
    const n = dust + letters;
    const base = new Float32Array(n * 3);
    const vel = new Float32Array(n * 3);
    const info = new Float32Array(n * 4);
    const rnd = (seed: number): (() => number) => {
      let s = seed >>> 0;
      return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };
    const r = rnd(2090);
    for (let i = 0; i < n; i++) {
      const isLetter = i >= dust;
      base[i * 3] = r();
      base[i * 3 + 1] = r();
      base[i * 3 + 2] = r();
      // 光尘缓慢上浮并略微侧漂；字母更慢
      const k = isLetter ? 0.45 : 1;
      vel[i * 3] = (r() - 0.5) * 0.5 * k;
      vel[i * 3 + 1] = (0.06 + r() * 0.18) * k;
      vel[i * 3 + 2] = (r() - 0.5) * 0.5 * k;
      info[i * 4] = r();
      info[i * 4 + 1] = 0.6 + r() * 0.9;
      info[i * 4 + 2] = isLetter ? DEFAULT_LETTERS[Math.floor(r() * DEFAULT_LETTERS.length)] : -1;
      info[i * 4 + 3] = isLetter ? 0.26 + r() * 0.16 : 0.035 + r() * 0.06;
    }
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.geometry.setAttribute("aBase", new THREE.BufferAttribute(base, 3));
    this.geometry.setAttribute("aVel", new THREE.BufferAttribute(vel, 3));
    this.info = new THREE.BufferAttribute(info, 4);
    this.info.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute("aInfo", this.info);

    this.atlas = acquireGlyphAtlas();
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uT: { value: 0 },
        uCenter: { value: this.center },
        uBox: { value: new THREE.Vector3(24, 9, 24) },
        uScale: { value: 600 },
        uAtt: { value: new THREE.Vector3() },
        uAttAmt: { value: 0 },
        uVis: { value: 1 },
        uAtlas: { value: this.atlas },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.object = new THREE.Points(this.geometry, this.material);
    this.object.frustumCulled = false;
    this.object.renderOrder = 9;
    this.object.name = "memory-flow";
  }

  setView(heightPx: number, fovDeg: number): void {
    this.material.uniforms.uScale.value = heightPx / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2));
  }

  /** 洪流盒子的中心（跟随相机焦点） */
  setCenter(p: THREE.Vector3): void {
    this.centerTarget.copy(p);
  }

  /** 当前朗读的句子：字母粒子会在淡出的瞬间悄悄换成这句话里的字母 */
  setSentence(text: string): void {
    const g = glyphsOf(text);
    if (g.length) this.pending = g;
  }

  /** 朗读时流速变快 */
  setSpeaking(on: boolean): void {
    this.speedTarget = on ? 2.4 : 1;
  }

  /** 往正在显形的物件方向偏转；null 取消 */
  setAttractor(pos: THREE.Vector3 | null, strength = 1): void {
    if (pos) (this.material.uniforms.uAtt.value as THREE.Vector3).copy(pos);
    this.attTarget = pos ? strength : 0;
  }

  /** 环境粒子的整体可见度（世界建得越完整越淡） */
  setVisibility(v: number): void {
    this.visTarget = v;
  }

  update(dt: number): void {
    const k = 1 - Math.exp(-dt * 2.2);
    this.speed += (this.speedTarget - this.speed) * k;
    this.attAmt += (this.attTarget - this.attAmt) * k;
    this.visibility += (this.visTarget - this.visibility) * k;
    this.flowT += dt * this.speed;
    this.center.lerp(this.centerTarget, 1 - Math.exp(-dt * 1.5));
    const u = this.material.uniforms;
    u.uT.value = this.flowT;
    u.uAttAmt.value = this.attAmt;
    u.uVis.value = this.visibility;

    // 字母换字：只在某个字母粒子透明度趋近 0 时才换，肉眼看不到跳变
    if (this.pending.length) {
      let changed = false;
      for (let tries = 0; tries < 3; tries++) {
        const slot = this.dustCount + (this.nextLetter % this.letterCount);
        this.nextLetter++;
        const seed = this.info.getX(slot);
        const mul = this.info.getY(slot);
        const phase = 0.5 + 0.5 * Math.sin(this.flowT * 0.35 * mul + seed * 6.283);
        if (phase * phase < 0.01) {
          this.info.setZ(slot, this.pending[Math.floor(Math.random() * this.pending.length)]);
          changed = true;
        }
      }
      if (changed) this.info.needsUpdate = true;
    }
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    if (this.atlas) releaseGlyphAtlas();
    this.object.removeFromParent();
  }
}
