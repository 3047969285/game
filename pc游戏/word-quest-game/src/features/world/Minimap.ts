import type { MapNode } from "../../core/types";

export interface MinimapState {
  playerX: number;
  playerZ: number;
  nodes: MapNode[];
  nearNodeId?: string;
}

/** 探险小地图（2D 画布） */
export class Minimap {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private bounds = { minX: -40, maxX: 40, minZ: 0, maxZ: 400 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = this.canvas.clientWidth || 120;
    const h = this.canvas.clientHeight || 120;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  setNodes(nodes: MapNode[]): void {
    if (!nodes.length) return;
    let minX = Infinity,
      maxX = -Infinity,
      minZ = Infinity,
      maxZ = -Infinity;
    for (const n of nodes) {
      minX = Math.min(minX, n.x);
      maxX = Math.max(maxX, n.x);
      minZ = Math.min(minZ, n.z);
      maxZ = Math.max(maxZ, n.z);
    }
    const padX = 30;
    const padZ = 40;
    this.bounds = {
      minX: minX - padX,
      maxX: maxX + padX,
      minZ: minZ - padZ,
      maxZ: maxZ + padZ,
    };
  }

  draw(state: MinimapState): void {
    this.resize();
    const w = this.canvas.clientWidth || 120;
    const h = this.canvas.clientHeight || 120;
    const ctx = this.ctx;
    const { minX, maxX, minZ, maxZ } = this.bounds;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(8, 14, 28, 0.82)";
    roundRect(ctx, 0, 0, w, h, 12);
    ctx.fill();
    ctx.strokeStyle = "rgba(147, 197, 253, 0.35)";
    ctx.lineWidth = 1;
    roundRect(ctx, 0, 0, w, h, 12);
    ctx.stroke();

    const toX = (x: number) => ((x - minX) / (maxX - minX)) * (w - 16) + 8;
    const toY = (z: number) => h - 8 - ((z - minZ) / (maxZ - minZ)) * (h - 16);

    // 路径
    if (state.nodes.length > 1) {
      ctx.strokeStyle = "rgba(91, 141, 239, 0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      state.nodes.forEach((n, i) => {
        const px = toX(n.x);
        const py = toY(n.z);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    for (const n of state.nodes) {
      const px = toX(n.x);
      const py = toY(n.z);
      const r = n.id === state.nearNodeId ? 5.5 : 4;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      if (!n.unlocked) ctx.fillStyle = "#4b5563";
      else if (n.cleared) ctx.fillStyle = "#34d399";
      else if (n.id === state.nearNodeId) ctx.fillStyle = "#fbbf24";
      else ctx.fillStyle = "#60a5fa";
      ctx.fill();
    }

    const px = toX(state.playerX);
    const py = toY(state.playerZ);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#93c5fd";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "600 10px sans-serif";
    ctx.fillText("地图", 10, 16);
  }
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
