import { seededRandom } from "./text";

/**
 * 漫画格的手绘风格滤镜（纯函数，原地处理 RGBA 像素）：降饱和 → 色阶分层 → 向纸色偏暖 →
 * 沿明暗边缘描墨线 → 纸纹颗粒 → 暗角。不依赖 canvas 的 filter（Safari 不支持），node 下可测。
 */

export interface ComicOptions {
  /** 保留原色的比例（0 = 纯灰度），默认 0.4 */
  saturation?: number;
  /** 色阶数，默认 6 */
  levels?: number;
  /** 墨线强度 0–1，默认 0.85 */
  ink?: number;
  seed?: number;
}

const PAPER: readonly [number, number, number] = [248, 238, 208];
const INK: readonly [number, number, number] = [34, 38, 58];

export function comicify(data: Uint8ClampedArray, width: number, height: number, opts: ComicOptions = {}): void {
  const sat = opts.saturation ?? 0.4;
  const levels = Math.max(2, opts.levels ?? 6);
  const inkAmount = opts.ink ?? 0.85;
  const rand = seededRandom(opts.seed ?? 7);
  const n = width * height;
  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) lum[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;

  // Sobel 边缘
  const edge = new Float32Array(n);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const gx = -lum[i - width - 1] - 2 * lum[i - 1] - lum[i + width - 1] + lum[i - width + 1] + 2 * lum[i + 1] + lum[i + width + 1];
      const gy = -lum[i - width - 1] - 2 * lum[i - width] - lum[i - width + 1] + lum[i + width - 1] + 2 * lum[i + width] + lum[i + width + 1];
      edge[i] = Math.min(1, Math.hypot(gx, gy) * 1.6);
    }
  }

  const step = 255 / (levels - 1);
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const o = i * 4;
      const g = lum[i] * 255;
      const c: [number, number, number] = [0, 0, 0];
      for (let k = 0; k < 3; k++) {
        const mixed = g + (data[o + k] - g) * sat;
        const banded = Math.round(mixed / step) * step;
        // 偏向纸色：暗部保留，亮部染成暖白
        const paper = PAPER[k] * (0.55 + 0.45 * lum[i]);
        c[k] = banded * 0.7 + paper * 0.3;
      }
      const line = Math.max(0, (edge[i] - 0.18) / 0.82) * inkAmount;
      for (let k = 0; k < 3; k++) c[k] = c[k] * (1 - line) + INK[k] * line;
      // 纸纹 + 暗角
      const grain = (rand() - 0.5) * 12;
      const dx = (x - cx) / (cx || 1);
      const dy = (y - cy) / (cy || 1);
      const vig = 1 - 0.28 * Math.min(1, (dx * dx + dy * dy) / 1.6);
      for (let k = 0; k < 3; k++) data[o + k] = Math.max(0, Math.min(255, (c[k] + grain) * vig));
      data[o + 3] = 255;
    }
  }
}
