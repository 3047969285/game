import * as THREE from "three";

/** 用 canvas 绘制并生成可平铺贴图 */
function canvasTexture(
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  colorSpace: THREE.ColorSpace = THREE.SRGBColorSpace,
  size = 512
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  draw(canvas.getContext("2d")!, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = colorSpace;
  return tex;
}

/** 重复绘制噪声点 */
function repeat(count: number, draw: () => void): void {
  for (let i = 0; i < count; i++) draw();
}

/** 生成地形颜色 / 粗糙度 / 法线贴图 */
export function createTerrainMaps(): {
  color: THREE.Texture;
  roughness: THREE.Texture;
  normal: THREE.Texture;
} {
  const color = canvasTexture((ctx, size) => {
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, "#1a3d2a");
    grad.addColorStop(0.35, "#234a32");
    grad.addColorStop(0.65, "#1e3648");
    grad.addColorStop(1, "#2a3a28");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    repeat(9000, () => {
      const g = 40 + Math.random() * 60;
      ctx.fillStyle = `rgba(${g + 20}, ${g + 50}, ${g + 10}, ${0.08 + Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size, 0.6 + Math.random() * 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  const roughness = canvasTexture((ctx, size) => {
    ctx.fillStyle = "#888";
    ctx.fillRect(0, 0, size, size);
    repeat(6000, () => {
      const v = 120 + Math.random() * 100;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    });
  }, THREE.NoColorSpace);

  const normal = canvasTexture((ctx, size) => {
    ctx.fillStyle = "#8080ff";
    ctx.fillRect(0, 0, size, size);
    repeat(4000, () => {
      const nx = 110 + Math.random() * 30;
      const ny = 110 + Math.random() * 30;
      ctx.fillStyle = `rgb(${nx},${ny},255)`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 3, 3);
    });
  }, THREE.NoColorSpace);

  for (const tex of [color, roughness, normal]) tex.repeat.set(8, 12);
  return { color, roughness, normal };
}
