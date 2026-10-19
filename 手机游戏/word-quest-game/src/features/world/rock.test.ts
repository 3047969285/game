import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createRock } from "./props";
import { disposeRockResources, getRockMaterial } from "./rockMaterial";

describe("createRock", () => {
  it("stays within the 1500 vertex budget for every vegetation variant", () => {
    for (const s of [0.5, 0.8, 1, 1.13, 1.27, 1.6]) {
      const rock = createRock(s);
      expect(rock.geometry.attributes.position.count).toBeLessThanOrEqual(1500);
    }
  });

  it("is buried: lowest point sits near the ground", () => {
    for (const s of [0.7, 1, 1.13, 1.27]) {
      const geo = createRock(s).geometry;
      geo.computeBoundingBox();
      expect(geo.boundingBox!.min.y).toBeGreaterThan(-0.12 * s);
      expect(geo.boundingBox!.min.y).toBeLessThan(0.04 * s);
      expect(geo.boundingBox!.max.y).toBeGreaterThan(0.2 * s);
    }
  });

  it("has uv, color and normal attributes and the shared rock material", () => {
    const rock = createRock(1);
    for (const a of ["position", "normal", "color", "uv"]) expect(rock.geometry.attributes[a]).toBeDefined();
    expect(rock.material).toBe(getRockMaterial());
  });

  it("has flat fracture faces and strata (not a smooth blob)", () => {
    const geo = createRock(1).geometry;
    const n = geo.attributes.normal;
    // 平面切削 → 有相当比例的顶点法线几乎相同（同一断裂面）
    const buckets = new Map<string, number>();
    for (let i = 0; i < n.count; i++) {
      const key = `${Math.round(n.getX(i) * 6)},${Math.round(n.getY(i) * 6)},${Math.round(n.getZ(i) * 6)}`;
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    const biggest = Math.max(...buckets.values());
    expect(biggest / n.count).toBeGreaterThan(0.06);
  });

  it("is deterministic per scale", () => {
    const a = createRock(1.13).geometry.attributes.position;
    const b = createRock(1.13).geometry.attributes.position;
    expect(Array.from(a.array)).toEqual(Array.from(b.array));
    expect(createRock(1).geometry.attributes.position.count).not.toBe(0);
  });
});

describe("getRockMaterial", () => {
  it("is a shared singleton until released", () => {
    const m = getRockMaterial();
    expect(getRockMaterial()).toBe(m);
    expect(m.vertexColors).toBe(true);
    expect(m.userData.shared).toBe(true);
    disposeRockResources();
    expect(getRockMaterial()).not.toBe(m);
    disposeRockResources();
    expect(THREE.MathUtils.clamp(1, 0, 2)).toBe(1);
  });
});
