import * as THREE from "three";
import { seededRand } from "./utils";

/** 用 canvas 绘制并生成可平铺贴图 */
function canvasTexture(
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  colorSpace: THREE.ColorSpace = THREE.SRGBColorSpace,
  size = 1024
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  draw(canvas.getContext("2d")!, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = colorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

/** 生成地形粗糙度 / 法线贴图，颜色层统一使用可读的主题色地表。 */
export function createTerrainMaps(): {
  roughness: THREE.Texture;
  normal: THREE.Texture;
} {
  const rnd = seededRand(20260616);

  const roughness = canvasTexture((ctx, size) => {
    ctx.fillStyle = "#9a9a9a";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 60; i++) {
      const cx = rnd() * size;
      const cy = rnd() * size;
      const r = 30 + rnd() * 120;
      const v = 110 + rnd() * 110;
      const blob = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      blob.addColorStop(0, `rgba(${v},${v},${v},0.5)`);
      blob.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = blob;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 14000; i++) {
      const v = 120 + rnd() * 100;
      ctx.fillStyle = `rgba(${v},${v},${v},0.5)`;
      ctx.fillRect(rnd() * size, rnd() * size, 1.5, 1.5);
    }
  }, THREE.NoColorSpace);

  const normal = canvasTexture((ctx, size) => {
    ctx.fillStyle = "#8080ff";
    ctx.fillRect(0, 0, size, size);
    // 颗粒化法线扰动
    for (let i = 0; i < 12000; i++) {
      const nx = 96 + rnd() * 64;
      const ny = 96 + rnd() * 64;
      ctx.fillStyle = `rgb(${nx | 0},${ny | 0},255)`;
      const s = 1.5 + rnd() * 2.5;
      ctx.fillRect(rnd() * size, rnd() * size, s, s);
    }
    // 柔和起伏斑块
    for (let i = 0; i < 40; i++) {
      const cx = rnd() * size;
      const cy = rnd() * size;
      const r = 24 + rnd() * 90;
      const blob = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      blob.addColorStop(0, `rgba(${100 + rnd() * 50 | 0},${100 + rnd() * 50 | 0},255,0.4)`);
      blob.addColorStop(1, "rgba(128,128,255,0)");
      ctx.fillStyle = blob;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, THREE.NoColorSpace);

  roughness.repeat.set(14, 18);
  normal.repeat.set(14, 18);
  return { roughness, normal };
}

/** 全课程世界共用浅色、低反差地表，保留空间细节并让单元主题色可辨。 */
export function createReadableGroundMap(): THREE.Texture {
  const rnd = seededRand(20260930);
  const texture = canvasTexture((ctx, size) => {
    const base = ctx.createLinearGradient(0, 0, size, size);
    base.addColorStop(0, "#ece9df");
    base.addColorStop(0.48, "#e6e6df");
    base.addColorStop(1, "#e0e5df");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 88; i++) {
      const radius = 34 + rnd() * 116;
      const x = rnd() * size;
      const y = rnd() * size;
      const warm = rnd() > 0.56;
      const color = warm ? "112,96,72" : "76,104,88";
      const alpha = 0.018 + rnd() * 0.026;
      const patch = ctx.createRadialGradient(x, y, 0, x, y, radius);
      patch.addColorStop(0, `rgba(${color},${alpha})`);
      patch.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = patch;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 12000; i++) {
      const light = rnd() > 0.52;
      const tone = light ? "255,255,248" : "62,75,65";
      ctx.fillStyle = `rgba(${tone},${light ? 0.055 : 0.035 + rnd() * 0.025})`;
      ctx.fillRect(rnd() * size, rnd() * size, 0.5 + rnd() * 1.7, 0.5 + rnd() * 1.7);
    }
  }, THREE.SRGBColorSpace, 1024);
  texture.repeat.set(14, 18);
  return texture;
}
