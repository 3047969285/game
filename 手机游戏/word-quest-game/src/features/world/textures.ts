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

/** 生成地形颜色 / 粗糙度 / 法线贴图（高质量分层草地） */
export function createTerrainMaps(): {
  color: THREE.Texture;
  roughness: THREE.Texture;
  normal: THREE.Texture;
} {
  const rnd = seededRand(20260616);

  const color = canvasTexture((ctx, size) => {
    // 基底渐变
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, "#26412b");
    grad.addColorStop(0.4, "#2f5234");
    grad.addColorStop(0.7, "#274a30");
    grad.addColorStop(1, "#223d29");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // 大尺度色块（明暗草地区域）
    for (let i = 0; i < 90; i++) {
      const r = 60 + rnd() * 160;
      const cx = rnd() * size;
      const cy = rnd() * size;
      const light = rnd() > 0.5;
      const blob = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const a = 0.06 + rnd() * 0.1;
      blob.addColorStop(0, light ? `rgba(120,150,80,${a})` : `rgba(28,52,34,${a})`);
      blob.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = blob;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 泥土 / 碎石斑块
    for (let i = 0; i < 28; i++) {
      const cx = rnd() * size;
      const cy = rnd() * size;
      const r = 18 + rnd() * 46;
      const blob = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      blob.addColorStop(0, `rgba(86,68,44,${0.18 + rnd() * 0.18})`);
      blob.addColorStop(1, "rgba(86,68,44,0)");
      ctx.fillStyle = blob;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 细密草点（明 / 暗双层）
    for (let i = 0; i < 26000; i++) {
      const dark = rnd() > 0.5;
      const g = 40 + rnd() * 70;
      ctx.fillStyle = dark
        ? `rgba(${g - 10},${g + 30},${g - 6},${0.05 + rnd() * 0.1})`
        : `rgba(${g + 50},${g + 80},${g + 20},${0.05 + rnd() * 0.12})`;
      ctx.beginPath();
      ctx.arc(rnd() * size, rnd() * size, 0.5 + rnd() * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  });

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

  color.repeat.set(14, 18);
  roughness.repeat.set(14, 18);
  normal.repeat.set(14, 18);
  return { color, roughness, normal };
}
