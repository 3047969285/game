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

/**
 * 地面细节贴图：明亮的细节 / 明暗层，真正的色相由地形顶点色提供。
 *
 * 包含草叶笔触、泥土斑块、细小石子与柔和色斑，让地面在近处经得起细看，
 * 同时保持整体亮度偏高（乘算后不会把顶点色压暗）。
 */
export function createGroundDetailMap(): THREE.Texture {
  const rnd = seededRand(20261015);
  const texture = canvasTexture((ctx, size) => {
    // 明亮基色（略带暖调，作为乘算底色）
    ctx.fillStyle = "#dcd9cd";
    ctx.fillRect(0, 0, size, size);

    // 大块色斑：草地与泥土的冷暖差异
    for (let i = 0; i < 130; i++) {
      const x = rnd() * size;
      const y = rnd() * size;
      const r = 36 + rnd() * 150;
      const warm = rnd() > 0.55;
      const c = warm ? "156,132,98" : "116,138,100";
      const a = 0.045 + rnd() * 0.085;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${c},${a})`);
      g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 草叶笔触：细短的明暗线条，模拟草皮肌理
    for (let i = 0; i < 6000; i++) {
      const x = rnd() * size;
      const y = rnd() * size;
      const len = 3 + rnd() * 7;
      const ang = -Math.PI / 2 + (rnd() - 0.5) * 1.3;
      const light = rnd() > 0.5;
      ctx.strokeStyle = light
        ? `rgba(232,236,214,${0.1 + rnd() * 0.2})`
        : `rgba(84,100,72,${0.08 + rnd() * 0.17})`;
      ctx.lineWidth = 0.8 + rnd() * 1.2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      ctx.stroke();
    }

    // 细小石子 / 沙粒
    for (let i = 0; i < 1100; i++) {
      const x = rnd() * size;
      const y = rnd() * size;
      const r = 0.8 + rnd() * 2.2;
      const v = 168 + rnd() * 60;
      ctx.fillStyle = `rgba(${v | 0},${(v - 4) | 0},${(v - 12) | 0},${0.2 + rnd() * 0.35})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 干草 / 落叶点缀
    for (let i = 0; i < 260; i++) {
      const x = rnd() * size;
      const y = rnd() * size;
      ctx.strokeStyle = `rgba(170,150,104,${0.2 + rnd() * 0.3})`;
      ctx.lineWidth = 1 + rnd() * 1.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (rnd() - 0.5) * 8, y + (rnd() - 0.5) * 8);
      ctx.stroke();
    }
  }, THREE.SRGBColorSpace, 1024);
  texture.repeat.set(56, 68);
  texture.anisotropy = 8;
  return texture;
}
