import { describe, expect, it } from "vitest";
import { SURFACE_KINDS, SURFACE_SCALE, generateSurfaceTexture, surfaceLayer, type SurfaceKind } from "./surfaceTextures";

const SIZE = 128;
const tex = Object.fromEntries(SURFACE_KINDS.map((k) => [k, generateSurfaceTexture(k, SIZE, 7)])) as Record<SurfaceKind, ReturnType<typeof generateSurfaceTexture>>;
const same = (a: Uint8Array, b: Uint8Array): boolean => a.length === b.length && a.every((v, i) => v === b[i]);

describe("surface kinds", () => {
  it("lists the 8 kinds with positive physical scales and stable layers", () => {
    expect(SURFACE_KINDS).toHaveLength(8);
    SURFACE_KINDS.forEach((k, i) => {
      expect(SURFACE_SCALE[k]).toBeGreaterThan(0.5);
      expect(surfaceLayer(k)).toBe(i);
    });
  });
  it("rejects sizes that are not a power of two", () => {
    expect(() => generateSurfaceTexture("brick", 100, 1)).toThrow();
    expect(() => generateSurfaceTexture("brick", 32, 1)).toThrow();
  });
});

describe("generateSurfaceTexture", () => {
  it("returns RGBA8 buffers of the right size", () => {
    for (const k of SURFACE_KINDS) {
      const t = tex[k];
      expect(t.size).toBe(SIZE);
      expect(t.albedo).toHaveLength(SIZE * SIZE * 4);
      expect(t.normal).toHaveLength(SIZE * SIZE * 4);
      expect(t.height).toHaveLength(SIZE * SIZE);
    }
  });

  it("is deterministic per seed and differs between seeds", () => {
    for (const k of SURFACE_KINDS) {
      const again = generateSurfaceTexture(k, SIZE, 7);
      expect(same(again.albedo, tex[k].albedo)).toBe(true);
      expect(same(again.normal, tex[k].normal)).toBe(true);
      expect(same(generateSurfaceTexture(k, SIZE, 8).albedo, tex[k].albedo)).toBe(false);
    }
  });

  it("tiles seamlessly in albedo, normal and height", () => {
    const edgeDiff = (data: Uint8Array, stride: number, chan: number, a: number, b: number, horiz: boolean): number => {
      let s = 0;
      for (let t = 0; t < SIZE; t++) {
        const ia = (horiz ? t * SIZE + a : a * SIZE + t) * stride + chan;
        const ib = (horiz ? t * SIZE + b : b * SIZE + t) * stride + chan;
        s += Math.abs(data[ia] - data[ib]);
      }
      return s / SIZE;
    };
    for (const k of SURFACE_KINDS) {
      const t = tex[k];
      const layers: [Uint8Array, number, number][] = [
        [t.albedo, 4, 0],
        [t.albedo, 4, 1],
        [t.normal, 4, 0],
        [t.normal, 4, 1],
        [t.height, 1, 0],
      ];
      for (const [data, stride, chan] of layers) {
        for (const horiz of [true, false]) {
          // 环绕边与普通相邻列的差异同量级：不应比图案内部最大的相邻列差异（灰缝 / 板缝 / 瓦沿的硬边）更突兀
          let inner = 0;
          for (let i = 0; i < SIZE - 1; i++) inner = Math.max(inner, edgeDiff(data, stride, chan, i, i + 1, horiz));
          expect(edgeDiff(data, stride, chan, 0, SIZE - 1, horiz)).toBeLessThanOrEqual(inner * 1.1 + 1);
        }
      }
    }
  });

  it("encodes outward-facing tangent-space normals", () => {
    for (const k of SURFACE_KINDS) {
      const n = tex[k].normal;
      for (let i = 0; i < n.length; i += 4) {
        expect(n[i + 2]).toBeGreaterThanOrEqual(128);
        const x = n[i] / 127.5 - 1;
        const y = n[i + 1] / 127.5 - 1;
        const z = n[i + 2] / 127.5 - 1;
        expect(Math.abs(Math.hypot(x, y, z) - 1)).toBeLessThan(0.03);
      }
    }
  });

  it("keeps AO mean in 0.6..0.95 and detail luminance centered on 0.65 (colors stay faithful)", () => {
    for (const k of SURFACE_KINDS) {
      const a = tex[k].albedo;
      let ao = 0;
      let lum = 0;
      for (let i = 0; i < a.length; i += 4) {
        ao += a[i + 3];
        lum += 0.3 * a[i] + 0.59 * a[i + 1] + 0.11 * a[i + 2];
      }
      const px = a.length / 4;
      expect(ao / px / 255).toBeGreaterThan(0.6);
      expect(ao / px / 255).toBeLessThan(0.95);
      expect(Math.abs(lum / px / 255 - 0.65)).toBeLessThan(0.03);
    }
  });

  it("has real relief and roughness variation, not a flat fill", () => {
    for (const k of SURFACE_KINDS) {
      const t = tex[k];
      let hMin = 255;
      let hMax = 0;
      for (const v of t.height) {
        hMin = Math.min(hMin, v);
        hMax = Math.max(hMax, v);
      }
      expect(hMax - hMin).toBeGreaterThan(40);
      let rMin = 255;
      let rMax = 0;
      let flatNormals = 0;
      for (let i = 0; i < t.normal.length; i += 4) {
        rMin = Math.min(rMin, t.normal[i + 3]);
        rMax = Math.max(rMax, t.normal[i + 3]);
        if (t.normal[i] === 128 && t.normal[i + 1] === 128) flatNormals++;
      }
      expect(rMax - rMin).toBeGreaterThan(20);
      expect(flatNormals / (SIZE * SIZE)).toBeLessThan(0.9);
    }
  });

  it("brick: mortar joints are 5..25% of the surface and sit lower than the brick faces", () => {
    const t = generateSurfaceTexture("brick", 256, 3);
    let mortar = 0;
    for (const h of t.height) if (h < 30) mortar++;
    const frac = mortar / t.height.length;
    expect(frac).toBeGreaterThan(0.05);
    expect(frac).toBeLessThan(0.25);
  });

  it("masonry / paving: joints are recessed but visible blocks dominate", () => {
    for (const k of ["masonry", "paving"] as const) {
      const t = generateSurfaceTexture(k, 256, 3);
      let joint = 0;
      for (const h of t.height) if (h < 60) joint++;
      const frac = joint / t.height.length;
      expect(frac).toBeGreaterThan(0.03);
      expect(frac).toBeLessThan(0.3);
    }
  });

  it("generates all 8 kinds at 512 within the startup budget", () => {
    const t0 = performance.now();
    for (const k of SURFACE_KINDS) generateSurfaceTexture(k, 512, 20260616);
    expect(performance.now() - t0).toBeLessThan(250);
  });
});
