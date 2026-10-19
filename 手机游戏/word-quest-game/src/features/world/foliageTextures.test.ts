import { describe, expect, it } from "vitest";
import { FOLIAGE_ATLAS_CELLS, atlasRect, generateBarkTexture, generateFoliageAtlas } from "./foliageTextures";

const SIZE = 512;
const atlas = generateFoliageAtlas(SIZE, 7);
const S = SIZE / 2;
const same = (a: Uint8Array, b: Uint8Array): boolean => a.length === b.length && a.every((v, i) => v === b[i]);

function alphaAt(x: number, y: number): number {
  return atlas.albedo.data[(y * SIZE + x) * 4 + 3];
}

describe("generateFoliageAtlas", () => {
  it("returns correctly sized RGBA8 images", () => {
    for (const img of [atlas.albedo, atlas.normal]) {
      expect(img.size).toBe(SIZE);
      expect(img.data.length).toBe(SIZE * SIZE * 4);
    }
  });

  it("has opaque pixels near every cell centre and an empty alpha border", () => {
    for (const cell of Object.values(FOLIAGE_ATLAS_CELLS)) {
      const ox = (cell % 2) * S;
      const oy = Math.floor(cell / 2) * S;
      let centre = 0;
      for (let y = S / 2 - S / 8; y < S / 2 + S / 8; y++) for (let x = S / 2 - S / 8; x < S / 2 + S / 8; x++) if (alphaAt(ox + x, oy + y) > 200) centre++;
      expect(centre).toBeGreaterThan(40);
      let border = 0;
      for (let i = 0; i < S; i++) {
        border += alphaAt(ox + i, oy) + alphaAt(ox + i, oy + S - 1) + alphaAt(ox, oy + i) + alphaAt(ox + S - 1, oy + i);
      }
      expect(border).toBe(0);
    }
  });

  it("is deterministic per seed and differs across seeds", () => {
    const again = generateFoliageAtlas(SIZE, 7);
    expect(same(again.albedo.data, atlas.albedo.data)).toBe(true);
    expect(same(again.normal.data, atlas.normal.data)).toBe(true);
    const other = generateFoliageAtlas(SIZE, 8);
    expect(same(other.albedo.data, atlas.albedo.data)).toBe(false);
  });

  it("keeps leaves natural: mean HSV saturation of opaque pixels < 0.65", () => {
    const d = atlas.albedo.data;
    let sum = 0;
    let n = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 128) continue;
      const mx = Math.max(d[i], d[i + 1], d[i + 2]);
      const mn = Math.min(d[i], d[i + 1], d[i + 2]);
      sum += mx === 0 ? 0 : (mx - mn) / mx;
      n++;
    }
    expect(n).toBeGreaterThan(5000);
    expect(sum / n).toBeLessThan(0.65);
  });

  it("is airy: leaf cells keep a good share of transparent pixels", () => {
    for (const cell of [FOLIAGE_ATLAS_CELLS.broadleaf, FOLIAGE_ATLAS_CELLS.conifer]) {
      const ox = (cell % 2) * S;
      const oy = Math.floor(cell / 2) * S;
      let opaque = 0;
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (alphaAt(ox + x, oy + y) > 115) opaque++;
      expect(opaque / (S * S)).toBeLessThan(0.7);
      expect(opaque / (S * S)).toBeGreaterThan(0.08);
    }
  });
});

describe("atlasRect", () => {
  it("gives four non-overlapping rectangles inside [0,1]", () => {
    const rects = Object.values(FOLIAGE_ATLAS_CELLS).map((c) => atlasRect(c));
    for (const [u0, v0, u1, v1] of rects) {
      expect(u0).toBeGreaterThanOrEqual(0);
      expect(v0).toBeGreaterThanOrEqual(0);
      expect(u1).toBeLessThanOrEqual(1);
      expect(v1).toBeLessThanOrEqual(1);
      expect(u1).toBeGreaterThan(u0);
      expect(v1).toBeGreaterThan(v0);
    }
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i];
        const b = rects[j];
        const overlap = a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
        expect(overlap).toBe(false);
      }
    }
  });
});

describe("generateBarkTexture", () => {
  for (const kind of ["broadleaf", "conifer"] as const) {
    const tex = generateBarkTexture(128, 3, kind);
    const N = tex.albedo.size;
    const lum = (x: number, y: number): number => {
      const o = (y * N + x) * 4;
      return tex.albedo.data[o] + tex.albedo.data[o + 1] + tex.albedo.data[o + 2];
    };
    it(`${kind}: sized correctly and fully opaque`, () => {
      expect(tex.albedo.data.length).toBe(N * N * 4);
      expect(tex.normal.data.length).toBe(N * N * 4);
      for (let i = 3; i < tex.albedo.data.length; i += 4) expect(tex.albedo.data[i]).toBe(255);
    });
    it(`${kind}: tiles seamlessly in u and v`, () => {
      let seamU = 0;
      let innerU = 0;
      let seamV = 0;
      let innerV = 0;
      for (let k = 0; k < N; k++) {
        seamU += Math.abs(lum(0, k) - lum(N - 1, k));
        seamV += Math.abs(lum(k, 0) - lum(k, N - 1));
        for (let j = 0; j < N - 1; j++) {
          innerU += Math.abs(lum(j, k) - lum(j + 1, k));
          innerV += Math.abs(lum(k, j) - lum(k, j + 1));
        }
      }
      expect(seamU / N).toBeLessThan((innerU / (N * (N - 1))) * 2);
      expect(seamV / N).toBeLessThan((innerV / (N * (N - 1))) * 2);
    });
    it(`${kind}: normal map points mostly outwards`, () => {
      let nz = 0;
      for (let i = 0; i < N * N; i++) nz += tex.normal.data[i * 4 + 2];
      expect(nz / (N * N)).toBeGreaterThan(160);
    });
  }
});
