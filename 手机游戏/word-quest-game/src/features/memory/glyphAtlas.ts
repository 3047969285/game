import * as THREE from "three";

/**
 * 半透明英文字母精灵用的字形图集：8×8 格、512px 的单张 canvas 纹理，
 * 洪流里的字母与显形时汇聚的字母共用同一张，整个舞台只占一次纹理上传。
 */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,'-?!:;&"; // 61 格，≤ 64
export const GLYPH_GRID = 8;

/** 字符 → 图集格号；不在图集里的字符返回 -1 */
export function glyphIndex(ch: string): number {
  return CHARS.indexOf(ch);
}

/** 取一段文字里能画出来的字母格号（用于从句子 / 单词里抽字母） */
export function glyphsOf(text: string): number[] {
  const out: number[] = [];
  for (const ch of text) {
    const i = glyphIndex(ch);
    if (i >= 0 && /[A-Za-z]/.test(ch)) out.push(i);
  }
  return out;
}

function createGlyphAtlas(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const size = 512;
  const cell = size / GLYPH_GRID;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${Math.round(cell * 0.62)}px Georgia, "Times New Roman", serif`;
  ctx.shadowColor = "rgba(255,255,255,0.85)";
  ctx.shadowBlur = 4;
  for (let i = 0; i < CHARS.length; i++) {
    const cx = (i % GLYPH_GRID) * cell + cell / 2;
    const cy = Math.floor(i / GLYPH_GRID) * cell + cell / 2;
    ctx.fillText(CHARS[i], cx, cy);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

let shared: THREE.CanvasTexture | null = null;
let refs = 0;

/** 取共享图集（引用计数）；没有 DOM 时返回 null */
export function acquireGlyphAtlas(): THREE.CanvasTexture | null {
  shared ??= createGlyphAtlas();
  if (shared) refs++;
  return shared;
}

export function releaseGlyphAtlas(): void {
  if (!shared || refs === 0) return;
  refs--;
  if (refs === 0) {
    shared.dispose();
    shared = null;
  }
}

/** 粒子着色器共用的“圆点 / 字形”片元片段：glyph < 0 为圆点，否则从图集取字形 alpha */
export const GLYPH_FRAGMENT_GLSL = /* glsl */ `
float glyphAlpha(sampler2D atlas, float glyph, vec2 pc) {
  if (glyph < -0.5) {
    float d = length(pc - 0.5) * 2.0;
    float a = clamp(1.0 - d, 0.0, 1.0);
    return a * a;
  }
  float gx = mod(glyph, 8.0);
  float gy = floor(glyph / 8.0);
  // gl_PointCoord 原点在左上；canvas 纹理 flipY 后 v 向上
  vec2 uv = vec2(gx + pc.x, (7.0 - gy) + (1.0 - pc.y)) / 8.0;
  return texture2D(atlas, uv).a;
}
`;
