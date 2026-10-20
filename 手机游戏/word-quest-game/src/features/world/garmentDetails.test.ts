import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createGarmentDetails, type GarmentDetailGeometry, type GarmentStyle } from "./garmentDetails";

function triangles(parts: GarmentDetailGeometry[]): number {
  return parts.reduce((sum, part) => sum + (part.geometry.index?.count ?? part.geometry.attributes.position.count) / 3, 0);
}

function dispose(parts: GarmentDetailGeometry[]): void {
  parts.forEach(({ geometry }) => geometry.dispose());
}

function coordinateBounds(parts: GarmentDetailGeometry[]) {
  return parts.map(({ anchor, side, material, geometry }) => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    return {
      anchor,
      side,
      material,
      min: [box.min.x, box.min.y, box.min.z],
      max: [box.max.x, box.max.y, box.max.z],
    };
  });
}

function hasVertexNear(positions: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, x: number, y: number, z: number, radius = 0.004): boolean {
  for (let i = 0; i < positions.count; i++) {
    if (Math.hypot(positions.getX(i) - x, positions.getY(i) - y, positions.getZ(i) - z) <= radius) return true;
  }
  return false;
}

describe("createGarmentDetails", () => {
  it.each(["tee", "hoodie", "coat"] as const)("%s batches details by bone anchor and material", (style: GarmentStyle) => {
    const parts = createGarmentDetails({ style, detail: "low" });
    try {
      const keys = parts.map(({ anchor, side, material }) => `${anchor}:${side}:${material}`);
      expect(new Set(keys).size).toBe(keys.length);
      expect(parts.every((part) => part.anchor === "torso" || part.side === -1 || part.side === 1)).toBe(true);
      expect(parts.filter((part) => part.anchor === "torso").every((part) => part.side === 0)).toBe(true);
      expect(parts.filter((part) => part.anchor !== "torso").every((part) => part.side !== 0)).toBe(true);
      expect(parts.some((part) => part.material === "trim")).toBe(style !== "tee");
      expect(parts).toHaveLength(style === "tee" ? 5 : 6);

      for (const part of parts) {
        const { geometry } = part;
        expect(geometry.isBufferGeometry).toBe(true);
        expect(geometry.index).not.toBeNull();
        expect(geometry.attributes.position.count).toBeGreaterThan(0);
        expect(geometry.attributes.normal.count).toBe(geometry.attributes.position.count);
        expect(geometry.userData.garmentDetail).toEqual({ anchor: part.anchor, side: part.side, material: part.material });
        for (const attribute of Object.values(geometry.attributes)) {
          expect(Array.from(attribute.array).every(Number.isFinite)).toBe(true);
        }
      }
    } finally {
      dispose(parts);
    }
  });

  it("keeps torso details in character coordinates and sleeve details in shoulder/elbow coordinates", () => {
    const parts = createGarmentDetails({ style: "coat", detail: "high" });
    try {
      const bounds = coordinateBounds(parts);
      const torso = bounds.find((part) => part.anchor === "torso" && part.material === "cloth")!;
      expect(torso.min[1]).toBeGreaterThan(0.88);
      expect(torso.max[1]).toBeLessThan(1.53);
      expect(torso.max[2]).toBeGreaterThan(0.1);

      for (const anchor of ["upperArm", "forearm"] as const) {
        for (const side of [-1, 1] as const) {
          const sleeve = bounds.find((part) => part.anchor === anchor && part.side === side)!;
          expect(sleeve.min[1]).toBeGreaterThan(anchor === "upperArm" ? -0.29 : -0.24);
          expect(sleeve.min[1]).toBeLessThan(-0.2);
          expect(sleeve.max[1]).toBeLessThan(0.01);
          expect(sleeve.min[2]).toBeGreaterThan(-0.06);
          expect(sleeve.max[2]).toBeGreaterThan(0.05);
        }
      }
      const left = parts.find((part) => part.anchor === "upperArm" && part.side === 1)!.geometry;
      const right = parts.find((part) => part.anchor === "upperArm" && part.side === -1)!.geometry;
      left.computeBoundingBox();
      right.computeBoundingBox();
      expect(left.boundingBox!.min.x).toBeCloseTo(-right.boundingBox!.max.x, 5);
      expect(left.boundingBox!.max.x).toBeCloseTo(-right.boundingBox!.min.x, 5);
      expect(left.boundingBox!.min.y).toBeCloseTo(right.boundingBox!.min.y, 5);
    } finally {
      dispose(parts);
    }
  });

  it("uses raised pocket faces for decorative pocket stitching", () => {
    const tee = createGarmentDetails({ style: "tee", detail: "low" });
    const hoodie = createGarmentDetails({ style: "hoodie", detail: "low" });
    try {
      const teePositions = tee.find((part) => part.anchor === "torso")!.geometry.attributes.position;
      const hoodiePositions = hoodie.find((part) => part.anchor === "torso" && part.material === "cloth")!.geometry.attributes.position;
      expect(hasVertexNear(teePositions, -0.077, 1.2835, 0.111)).toBe(true);
      let hoodieStitchOnPocket = false;
      for (let i = 0; i < hoodiePositions.count; i++) {
        hoodieStitchOnPocket ||= Math.abs(hoodiePositions.getX(i)) < 0.09
          && hoodiePositions.getY(i) > 0.95 && hoodiePositions.getY(i) < 0.985
          && hoodiePositions.getZ(i) > 0.139 && hoodiePositions.getZ(i) < 0.143;
      }
      expect(hoodieStitchOnPocket).toBe(true);
    } finally {
      dispose(tee);
      dispose(hoodie);
    }
  });

  it("keeps the low setting cheaper while retaining all three anchors", () => {
    for (const style of ["tee", "hoodie", "coat"] as const) {
      const low = createGarmentDetails({ style, detail: "low" });
      const high = createGarmentDetails({ style, detail: "high" });
      try {
        expect(new Set(low.map((part) => part.anchor))).toEqual(new Set(["torso", "upperArm", "forearm"]));
        expect(triangles(low)).toBeLessThan(triangles(high));
        expect(triangles(low)).toBeLessThanOrEqual(4000);
        expect(triangles(high)).toBeLessThanOrEqual(8000);
      } finally {
        dispose(low);
        dispose(high);
      }
    }
  });
});
