import * as THREE from "three";

/** 站点名称路牌（Canvas 精灵） */
export function createSignpost(label: string, unlocked: boolean): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = unlocked ? "rgba(8, 18, 40, 0.72)" : "rgba(40, 40, 40, 0.55)";
  roundRect(ctx, 8, 8, 496, 112, 20);
  ctx.fill();

  ctx.strokeStyle = unlocked ? "rgba(147, 197, 253, 0.55)" : "rgba(120, 120, 120, 0.4)";
  ctx.lineWidth = 3;
  roundRect(ctx, 8, 8, 496, 112, 20);
  ctx.stroke();

  ctx.fillStyle = unlocked ? "#f3f4f6" : "#9ca3af";
  ctx.font = "bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  const text = label.length > 22 ? label.slice(0, 21) + "…" : label;
  ctx.fillText(text, 24, 72);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(10, 2.5, 1);
  sprite.position.y = 7.2;
  sprite.userData.isSignpost = true;
  return sprite;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
