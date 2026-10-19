import { describe, expect, it } from "vitest";
import {
  LAYER_COUNT,
  LW,
  generateLayerTexture,
  layerWeights,
  layerWeightsGLSL,
  paletteFromGround,
  terrainNoisesGLSL,
  type LayerId,
} from "./terrainLayers";

const flat = { normalY: 1, height: 2, nDry: 0.3, nDirt: 0.3, nGravel: 0.3 };
const palette = paletteFromGround({ grass: 0x5d8a3c, dirt: 0x7a6040, rock: 0x7a7d78 });
const same = (a: Uint8Array, b: Uint8Array): boolean => a.length === b.length && a.every((v, i) => v === b[i]);
const LAYERS: LayerId[] = [0, 1, 2, 3, 4];

describe("layerWeights", () => {
  it("is non-negative and sums to 1", () => {
    const cases = [flat, { ...flat, normalY: 0.2 }, { ...flat, nDirt: 0.9, nGravel: 0.9, nDry: 0.9 }, { ...flat, height: 60 }];
    for (const c of cases) {
      const w = layerWeights(c);
      expect(w).toHaveLength(LAYER_COUNT);
      expect(w.every((v) => v >= 0)).toBe(true);
      expect(w.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 6);
    }
  });
  it("prefers grass on flat low-noise ground", () => {
    const w = layerWeights(flat);
    expect(w.indexOf(Math.max(...w))).toBe(0);
  });
  it("prefers rock on steep slopes", () => {
    const w = layerWeights({ ...flat, normalY: 0.1 });
    expect(w.indexOf(Math.max(...w))).toBe(4);
  });
  it("raises dirt when nDirt is high", () => {
    expect(layerWeights({ ...flat, nDirt: 0.9 })[2]).toBeGreaterThan(layerWeights(flat)[2] + 0.5);
  });
  it("height blending lets the taller layer win a transition", () => {
    const mix = { ...flat, nDirt: 0.64 };
    const a = layerWeights({ ...mix, layerHeights: [0.1, 0.5, 0.9, 0.5, 0.5] });
    const b = layerWeights({ ...mix, layerHeights: [0.9, 0.5, 0.1, 0.5, 0.5] });
    expect(a[2]).toBeGreaterThan(b[2]);
  });
});

describe("generateLayerTexture", () => {
  const size = 128;
  const tex = LAYERS.map((l) => generateLayerTexture(l, size, 11, palette));

  it("has correct length and is deterministic", () => {
    for (const t of tex) {
      expect(t.albedo.length).toBe(size * size * 4);
      expect(t.normal.length).toBe(size * size * 4);
    }
    const again = generateLayerTexture(2, size, 11, palette);
    expect(same(again.albedo, tex[2].albedo)).toBe(true);
    const other = generateLayerTexture(2, size, 12, palette);
    expect(same(other.albedo, tex[2].albedo)).toBe(false);
  });

  it("tiles seamlessly", () => {
    const diff = (d: Uint8Array, a: number, b: number, horiz: boolean): number => {
      let s = 0;
      for (let t = 0; t < size; t++) {
        const ia = (horiz ? t * size + a : a * size + t) * 4;
        const ib = (horiz ? t * size + b : b * size + t) * 4;
        s += Math.abs(d[ia] - d[ib]) + Math.abs(d[ia + 1] - d[ib + 1]) + Math.abs(d[ia + 2] - d[ib + 2]);
      }
      return s / size;
    };
    for (const t of tex) {
      for (const horiz of [true, false]) {
        let inner = 0;
        for (let i = 0; i < size - 1; i++) inner += diff(t.albedo, i, i + 1, horiz);
        inner /= size - 1;
        expect(diff(t.albedo, 0, size - 1, horiz)).toBeLessThan(inner * 2 + 0.01);
      }
    }
  });

  it("encodes outward-facing normals", () => {
    for (const t of tex) for (let i = 2; i < t.normal.length; i += 4) expect(t.normal[i]).toBeGreaterThanOrEqual(128);
  });

  it("is not flat: layers have visible detail and height range", () => {
    for (const t of tex) {
      let mn = 255;
      let mx = 0;
      for (let i = 3; i < t.albedo.length; i += 4) {
        mn = Math.min(mn, t.albedo[i]);
        mx = Math.max(mx, t.albedo[i]);
      }
      expect(mx - mn).toBeGreaterThan(60);
    }
  });
});

describe("paletteFromGround", () => {
  it("gives five distinct colors with yellower dry grass", () => {
    expect(new Set(Object.values(palette)).size).toBe(5);
    const rg = (h: number) => ((h >> 16) & 255) / Math.max(1, (h >> 8) & 255);
    expect(rg(palette.dryGrass)).toBeGreaterThan(rg(palette.grass));
  });
});

describe("layerWeightsGLSL", () => {
  it("exposes the function and shares TS thresholds", () => {
    const g = layerWeightsGLSL();
    expect(g).toContain("void layerWeights(");
    for (const v of Object.values(LW)) expect(g).toContain(Number.isInteger(v) ? `${v}.0` : String(v));
    expect(terrainNoisesGLSL()).toContain("vec3 terrainNoises(");
  });
});
