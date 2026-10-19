/**
 * 水面程序纹理（纯逻辑，不依赖 three）：可平铺的波纹法线图、泡沫图，以及水深吸收的 CPU 版本。
 * 平铺性来自"周期值噪声"：每个八度的格点在 [0, period) 内取模，首尾格点相同。
 */

export interface TileTexture {
  size: number;
  data: Uint8Array;
}

function hash2(ix: number, iy: number, seed: number): number {
  let h = Math.imul(ix | 0, 374761393) ^ Math.imul(iy | 0, 668265263) ^ Math.imul((seed | 0) + 1, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);

/** 周期值噪声：u,v 为 [0,1) 的纹理坐标，period 为格点数；结果 0..1 */
function periodicNoise(u: number, v: number, period: number, seed: number): number {
  const x = u * period;
  const y = v * period;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = fade(x - x0);
  const fy = fade(y - y0);
  const xa = ((x0 % period) + period) % period;
  const ya = ((y0 % period) + period) % period;
  const xb = (xa + 1) % period;
  const yb = (ya + 1) % period;
  const a = hash2(xa, ya, seed);
  const b = hash2(xb, ya, seed);
  const c = hash2(xa, yb, seed);
  const d = hash2(xb, yb, seed);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

/** 波面高度场（平铺）：低频涌动 + 中频波纹 + 高频细碎起伏 */
function waveHeight(u: number, v: number, seed: number): number {
  let h = 0;
  let amp = 1;
  let period = 4;
  for (let o = 0; o < 5; o++) {
    // 取 billow（|2n-1| 翻折）让波峰更尖、波谷更圆，像水波而不是云
    const n = periodicNoise(u, v, period, seed * 17 + o * 101);
    const billow = 1 - Math.abs(2 * n - 1);
    h += (n * 0.45 + billow * 0.55) * amp;
    amp *= 0.55;
    period *= 2;
  }
  return h;
}

/** 可平铺的波纹法线图（RGBA8，rgb = 切线空间法线，a = 高度） */
export function generateWaveNormalMap(size: number, seed: number): TileTexture {
  const heights = new Float32Array(size * size);
  let hMin = Infinity;
  let hMax = -Infinity;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const h = waveHeight(x / size, y / size, seed);
      heights[y * size + x] = h;
      if (h < hMin) hMin = h;
      if (h > hMax) hMax = h;
    }
  }
  const data = new Uint8Array(size * size * 4);
  const strength = (size / 256) * 1.6;
  const range = hMax - hMin || 1;
  const wrap = (i: number): number => (i + size) % size;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (heights[y * size + wrap(x + 1)] - heights[y * size + wrap(x - 1)]) * 0.5 * strength * 2.2;
      const dy = (heights[wrap(y + 1) * size + x] - heights[wrap(y - 1) * size + x]) * 0.5 * strength * 2.2;
      const len = Math.hypot(dx, dy, 1);
      const o = (y * size + x) * 4;
      data[o] = Math.round(((-dx / len) * 0.5 + 0.5) * 255);
      data[o + 1] = Math.round(((-dy / len) * 0.5 + 0.5) * 255);
      data[o + 2] = Math.round(((1 / len) * 0.5 + 0.5) * 255);
      data[o + 3] = Math.round(((heights[y * size + x] - hMin) / range) * 255);
    }
  }
  return { size, data };
}

/** 泡沫纹理（R 通道，亦写入 G/B 方便调试），可平铺：细碎的网状泡沫 */
export function generateFoamTexture(size: number, seed: number): TileTexture {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      let f = 0;
      let amp = 0.5;
      let period = 6;
      for (let o = 0; o < 4; o++) {
        // 脊状噪声：细线交织成网状，再叠加团块
        const n = periodicNoise(u, v, period, seed * 31 + o * 53);
        f += (1 - Math.abs(2 * n - 1)) * amp;
        amp *= 0.5;
        period *= 2;
      }
      const clump = periodicNoise(u, v, 5, seed * 7 + 3);
      const value = Math.min(1, Math.max(0, Math.pow(f / 0.9375, 1.6) * (0.55 + clump * 0.7)));
      const i = (y * size + x) * 4;
      const byte = Math.round(value * 255);
      data[i] = byte;
      data[i + 1] = byte;
      data[i + 2] = byte;
      data[i + 3] = 255;
    }
  }
  return { size, data };
}

/** 水深吸收参数（GLSL 使用同一组常数） */
export const WATER_ABSORB = {
  /** 各通道吸收率（1/米）：红光吸收最快，所以深水偏蓝绿 */
  rate: [0.55, 0.35, 0.3] as const,
  alphaMin: 0.12,
  alphaMax: 0.97,
  alphaRate: 0.9,
};

/** 水深 → 颜色 / 透明度（Beer-Lambert）。负深度按 0 处理 */
export function waterAbsorption(
  depth: number,
  shallow: [number, number, number],
  deep: [number, number, number]
): { color: [number, number, number]; alpha: number } {
  const d = Math.max(0, depth);
  const r = WATER_ABSORB.rate;
  const color: [number, number, number] = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    const t = 1 - Math.exp(-d * r[c]);
    color[c] = shallow[c] + (deep[c] - shallow[c]) * t;
  }
  const alpha = WATER_ABSORB.alphaMin + (WATER_ABSORB.alphaMax - WATER_ABSORB.alphaMin) * (1 - Math.exp(-d * WATER_ABSORB.alphaRate));
  return { color, alpha };
}
