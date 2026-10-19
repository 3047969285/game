import { describe, expect, it } from "vitest";
import { generateFoamTexture, generateWaveNormalMap, waterAbsorption } from "./waterTextures";

const SIZE = 64;

/** 取某个通道在 (x,y) 处的值 */
const at = (data: Uint8Array, size: number, x: number, y: number, ch: number): number => data[(y * size + x) * 4 + ch];

/** 平铺检验：首尾（环绕）相邻差的平均 < 内部相邻差的平均 × 2 */
function seamRatio(data: Uint8Array, size: number, ch: number): number {
  let seam = 0;
  let inner = 0;
  for (let i = 0; i < size; i++) {
    seam += Math.abs(at(data, size, 0, i, ch) - at(data, size, size - 1, i, ch));
    seam += Math.abs(at(data, size, i, 0, ch) - at(data, size, i, size - 1, ch));
    for (let j = 0; j < size - 1; j++) {
      inner += Math.abs(at(data, size, j, i, ch) - at(data, size, j + 1, i, ch));
      inner += Math.abs(at(data, size, i, j, ch) - at(data, size, i, j + 1, ch));
    }
  }
  return seam / (2 * size) / (inner / (2 * size * (size - 1)));
}

describe("generateWaveNormalMap", () => {
  const map = generateWaveNormalMap(SIZE, 5);

  it("returns an RGBA8 image of the requested size", () => {
    expect(map.size).toBe(SIZE);
    expect(map.data.length).toBe(SIZE * SIZE * 4);
  });

  it("tiles seamlessly on every channel", () => {
    for (let ch = 0; ch < 4; ch++) expect(seamRatio(map.data, SIZE, ch)).toBeLessThan(2);
  });

  it("has an upward-facing normal everywhere (z >= 128) and unit length", () => {
    let maxXY = 0;
    for (let i = 0; i < SIZE * SIZE; i++) {
      expect(map.data[i * 4 + 2]).toBeGreaterThanOrEqual(128);
      const nx = (map.data[i * 4] / 255) * 2 - 1;
      const ny = (map.data[i * 4 + 1] / 255) * 2 - 1;
      const nz = (map.data[i * 4 + 2] / 255) * 2 - 1;
      expect(Math.hypot(nx, ny, nz)).toBeGreaterThan(0.97);
      expect(Math.hypot(nx, ny, nz)).toBeLessThan(1.03);
      maxXY = Math.max(maxXY, Math.hypot(nx, ny));
    }
    // 有真实起伏而不是一张平面
    expect(maxXY).toBeGreaterThan(0.1);
  });

  it("is deterministic per seed and differs between seeds", () => {
    const same = generateWaveNormalMap(SIZE, 5);
    const other = generateWaveNormalMap(SIZE, 6);
    expect(Array.from(same.data)).toEqual(Array.from(map.data));
    expect(Array.from(other.data)).not.toEqual(Array.from(map.data));
  });
});

describe("generateFoamTexture", () => {
  const foam = generateFoamTexture(SIZE, 3);

  it("tiles seamlessly", () => {
    expect(seamRatio(foam.data, SIZE, 0)).toBeLessThan(2);
  });

  it("is deterministic per seed", () => {
    expect(Array.from(generateFoamTexture(SIZE, 3).data)).toEqual(Array.from(foam.data));
    expect(Array.from(generateFoamTexture(SIZE, 4).data)).not.toEqual(Array.from(foam.data));
  });

  it("has both bright foam and dark gaps", () => {
    let lo = 255;
    let hi = 0;
    for (let i = 0; i < SIZE * SIZE; i++) {
      lo = Math.min(lo, foam.data[i * 4]);
      hi = Math.max(hi, foam.data[i * 4]);
    }
    expect(hi - lo).toBeGreaterThan(120);
  });
});

describe("waterAbsorption", () => {
  const shallow: [number, number, number] = [0.4, 0.7, 0.6];
  const deep: [number, number, number] = [0.04, 0.2, 0.22];

  it("is clear and shallow-coloured at zero depth", () => {
    const a = waterAbsorption(0, shallow, deep);
    expect(a.color[0]).toBeCloseTo(shallow[0], 5);
    expect(a.color[1]).toBeCloseTo(shallow[1], 5);
    expect(a.color[2]).toBeCloseTo(shallow[2], 5);
    expect(a.alpha).toBeLessThan(waterAbsorption(0.5, shallow, deep).alpha);
  });

  it("alpha never decreases and colour approaches the deep colour as depth grows", () => {
    let prevAlpha = -1;
    let prevDist = Infinity;
    for (const depth of [0, 0.1, 0.3, 0.8, 1.5, 3, 6, 12, 30]) {
      const a = waterAbsorption(depth, shallow, deep);
      expect(a.alpha).toBeGreaterThanOrEqual(prevAlpha);
      const dist = Math.hypot(a.color[0] - deep[0], a.color[1] - deep[1], a.color[2] - deep[2]);
      expect(dist).toBeLessThanOrEqual(prevDist + 1e-9);
      prevAlpha = a.alpha;
      prevDist = dist;
    }
    const far = waterAbsorption(60, shallow, deep);
    expect(far.alpha).toBeGreaterThan(0.9);
    expect(prevDist).toBeLessThan(0.03);
    expect(far.color[1]).toBeCloseTo(deep[1], 2);
  });

  it("treats negative depth as zero", () => {
    expect(waterAbsorption(-2, shallow, deep)).toEqual(waterAbsorption(0, shallow, deep));
  });
});
