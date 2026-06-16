import type { MapNode, WordPickup } from "../../core/types";
import { terrainHeight } from "./utils";

export interface MinimapBiomePalette {
  /** 地面基色 (hex) */
  ground: number;
  /** 高地 / 受光色 (hex) */
  highland: number;
  /** 路径色 (hex) */
  path: number;
}

export interface MinimapState {
  playerX: number;
  playerZ: number;
  playerYaw?: number;
  nodes: MapNode[];
  nearNodeId?: string;
  pickups?: WordPickup[];
  biome?: MinimapBiomePalette;
}

/** 地形局部原点 Z（与世界一致） */
const MINIMAP_ORIGIN_Z = 180;

/** 探险小地图（2D 画布） */
export class Minimap {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private bounds = { minX: -40, maxX: 40, minZ: 0, maxZ: 400 };
  /** 地形浮雕缓存（随地图边界 / 生物群系变化重建） */
  private relief?: HTMLCanvasElement;
  private reliefKey = "";

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

  setNodes(nodes: MapNode[], pickups?: WordPickup[]): void {
    if (!nodes.length && !pickups?.length) return;
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
    if (pickups?.length) {
      for (const p of pickups) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minZ = Math.min(minZ, p.z);
        maxZ = Math.max(maxZ, p.z);
      }
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

    // 地形浮雕背景（与世界地形同步）
    const relief = this.getRelief(w, h, state.biome);
    ctx.save();
    roundRect(ctx, 0, 0, w, h, 12);
    ctx.clip();
    if (relief) ctx.drawImage(relief, 0, 0, w, h);
    else {
      ctx.fillStyle = "rgba(8, 14, 28, 0.82)";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.restore();

    ctx.strokeStyle = "rgba(147, 197, 253, 0.4)";
    ctx.lineWidth = 1;
    roundRect(ctx, 0, 0, w, h, 12);
    ctx.stroke();

    const toX = (x: number) => ((x - minX) / (maxX - minX)) * (w - 16) + 8;
    const toY = (z: number) => h - 8 - ((z - minZ) / (maxZ - minZ)) * (h - 16);

    // 路径
    if (state.nodes.length > 1) {
      const pathCol = state.biome ? hexToCss(state.biome.path, 0.7) : "rgba(91, 141, 239, 0.55)";
      ctx.strokeStyle = pathCol;
      ctx.lineWidth = 2.4;
      ctx.shadowColor = pathCol;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      state.nodes.forEach((n, i) => {
        const px = toX(n.x);
        const py = toY(n.z);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
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

    // 词汇光球（未收集=金色菱形，已收集=淡灰色小点）
    if (state.pickups?.length) {
      for (const p of state.pickups) {
        const bx = toX(p.x);
        const by = toY(p.z);
        if (p.collected) {
          ctx.fillStyle = "rgba(100,220,130,0.45)";
          ctx.beginPath();
          ctx.arc(bx, by, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.moveTo(bx, by - 4);
          ctx.lineTo(bx + 3, by);
          ctx.lineTo(bx, by + 4);
          ctx.lineTo(bx - 3, by);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    // 玩家：带朝向的箭头
    const px = toX(state.playerX);
    const py = toY(state.playerZ);
    const yaw = state.playerYaw ?? 0;
    // 世界 forward=(sin,0,cos)；小地图 Y 轴向上为 -z，故方向角换算
    const ang = Math.atan2(Math.sin(yaw), -Math.cos(yaw));
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(ang);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#1e3a5f";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(4.2, 5);
    ctx.lineTo(0, 2.5);
    ctx.lineTo(-4.2, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "600 10px sans-serif";
    ctx.fillText("地图", 10, 16);
  }

  /** 构建 / 复用地形浮雕背景 */
  private getRelief(w: number, h: number, biome?: MinimapBiomePalette): HTMLCanvasElement | undefined {
    const ground = biome?.ground ?? 0x1a3328;
    const highland = biome?.highland ?? 0x4a6a52;
    const { minX, maxX, minZ, maxZ } = this.bounds;
    const key = `${w}x${h}|${minX.toFixed(0)},${maxX.toFixed(0)},${minZ.toFixed(0)},${maxZ.toFixed(0)}|${ground}|${highland}`;
    if (this.relief && this.reliefKey === key) return this.relief;

    const cv = this.relief ?? document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const rctx = cv.getContext("2d");
    if (!rctx) return undefined;

    const g0 = hexToRgb(ground);
    const g1 = hexToRgb(highland);
    const cell = 3;
    // 光照方向（用于山体明暗）
    const lx = 0.6;
    const lz = -0.5;

    for (let py = 0; py < h; py += cell) {
      for (let pxx = 0; pxx < w; pxx += cell) {
        const worldX = minX + ((pxx - 8) / (w - 16)) * (maxX - minX);
        const worldZ = minZ + ((h - 8 - py) / (h - 16)) * (maxZ - minZ);
        const lz0 = worldZ - MINIMAP_ORIGIN_Z;
        const hC = terrainHeight(worldX, lz0);
        const hX = terrainHeight(worldX + 2, lz0);
        const hZ = terrainHeight(worldX, lz0 + 2);
        // 坡面明暗
        const slope = (hC - hX) * lx + (hC - hZ) * lz;
        const shade = clamp01(0.62 + slope * 0.16);
        // 高度混合 0(低) → 1(高)
        const t = clamp01((hC + 6) / 18);
        const r = Math.round((g0.r + (g1.r - g0.r) * t) * shade);
        const g = Math.round((g0.g + (g1.g - g0.g) * t) * shade);
        const b = Math.round((g0.b + (g1.b - g0.b) * t) * shade);
        rctx.fillStyle = `rgb(${r},${g},${b})`;
        rctx.fillRect(pxx, py, cell, cell);
      }
    }

    this.relief = cv;
    this.reliefKey = key;
    return cv;
  }
}

function hexToRgb(hex: number): { r: number; g: number; b: number } {
  return { r: (hex >> 16) & 0xff, g: (hex >> 8) & 0xff, b: hex & 0xff };
}

function hexToCss(hex: number, alpha = 1): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
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
