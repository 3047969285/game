import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { buildFlagstonePath, planFlagstones, smoothPolyline } from "./flagstonePath";

function straight(len: number): Array<{ x: number; z: number }> {
  const pts: Array<{ x: number; z: number }> = [];
  for (let i = 0; i <= len; i += 2) pts.push({ x: 4, z: i });
  return pts;
}

function bendy(): Array<{ x: number; z: number }> {
  return smoothPolyline(
    [
      { x: 0, z: 0 },
      { x: 18, z: 60 },
      { x: -10, z: 130 },
      { x: 12, z: 200 },
    ],
    3
  );
}

function area(poly: Array<[number, number]>): number {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x0, z0] = poly[i];
    const [x1, z1] = poly[(i + 1) % poly.length];
    a += x0 * z1 - x1 * z0;
  }
  return a / 2;
}

function inside(poly: Array<[number, number]>, x: number, z: number): boolean {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i];
    const [xj, zj] = poly[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) c = !c;
  }
  return c;
}

function pathLength(pts: Array<{ x: number; z: number }>): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z);
  return l;
}

/** 点到折线的最短距离 */
function distToPath(pts: Array<{ x: number; z: number }>, x: number, z: number): number {
  let best = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const ax = pts[i - 1].x;
    const az = pts[i - 1].z;
    const dx = pts[i].x - ax;
    const dz = pts[i].z - az;
    const u = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1)));
    best = Math.min(best, Math.hypot(x - (ax + dx * u), z - (az + dz * u)));
  }
  return best;
}

describe("planFlagstones", () => {
  it("is deterministic and seed-sensitive", () => {
    const a = planFlagstones(straight(60), 3.4, 11);
    const b = planFlagstones(straight(60), 3.4, 11);
    const c = planFlagstones(straight(60), 3.4, 12);
    expect(a.length).toBeGreaterThan(30);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(c));
  });

  it("keeps every stone centre inside the road width", () => {
    const pts = bendy();
    for (const s of planFlagstones(pts, 3.4, 5)) {
      expect(distToPath(pts, s.cx, s.cz)).toBeLessThanOrEqual(1.7 + 1e-6);
      for (const [x, z] of s.poly) expect(distToPath(pts, x, z)).toBeLessThanOrEqual(1.7 + 0.05);
    }
  });

  it("gives 5-8 counter-clockwise vertices and a tone in 0..1", () => {
    for (const pts of [straight(80), bendy()]) {
      for (const s of planFlagstones(pts, 3.4, 3)) {
        expect(s.poly.length).toBeGreaterThanOrEqual(5);
        expect(s.poly.length).toBeLessThanOrEqual(8);
        expect(area(s.poly)).toBeGreaterThan(0);
        expect(s.tone).toBeGreaterThanOrEqual(0);
        expect(s.tone).toBeLessThanOrEqual(1);
      }
    }
  });

  it("does not overlap: sampled interior points belong to a single polygon", () => {
    const stones = planFlagstones(bendy(), 3.4, 9);
    for (let i = 0; i < stones.length; i++) {
      const a = stones[i];
      const samples: Array<[number, number]> = [[a.cx, a.cz]];
      for (const [x, z] of a.poly) {
        samples.push([a.cx + (x - a.cx) * 0.85, a.cz + (z - a.cz) * 0.85]);
        samples.push([a.cx + (x - a.cx) * 0.5, a.cz + (z - a.cz) * 0.5]);
      }
      for (let j = 0; j < stones.length; j++) {
        if (j === i) continue;
        const b = stones[j];
        if (Math.hypot(a.cx - b.cx, a.cz - b.cz) > 4) continue;
        for (const [x, z] of samples) expect(inside(b.poly, x, z)).toBe(false);
      }
    }
  });

  it("covers 60-90% of the road surface", () => {
    for (const [pts, w] of [
      [straight(120), 3.4],
      [bendy(), 3.4],
      [straight(60), 1.5],
    ] as const) {
      const total = planFlagstones([...pts], w, 21).reduce((n, s) => n + area(s.poly), 0);
      const cover = total / (pathLength([...pts]) * w);
      expect(cover).toBeGreaterThan(0.6);
      expect(cover).toBeLessThan(0.9);
    }
  });

  it("leaves 4-8 cm gaps between neighbouring stones", () => {
    const stones = planFlagstones(straight(40), 3.4, 2);
    let near = 0;
    for (const a of stones) {
      for (const b of stones) {
        if (a === b || Math.hypot(a.cx - b.cx, a.cz - b.cz) > 2.2) continue;
        // 顶点到另一块多边形的最近距离不会小于 0.03
        for (const [x, z] of a.poly) {
          for (let k = 0; k < b.poly.length; k++) {
            const [x0, z0] = b.poly[k];
            const [x1, z1] = b.poly[(k + 1) % b.poly.length];
            const dx = x1 - x0;
            const dz = z1 - z0;
            const u = Math.max(0, Math.min(1, ((x - x0) * dx + (z - z0) * dz) / (dx * dx + dz * dz || 1)));
            const d = Math.hypot(x - (x0 + dx * u), z - (z0 + dz * u));
            expect(d).toBeGreaterThan(0.03);
            near++;
          }
        }
      }
    }
    expect(near).toBeGreaterThan(100);
  });
});

describe("buildFlagstonePath", () => {
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 0, 40), new THREE.Vector3(-3, 0, 90)]);

  it("merges everything into a single mesh with uv / color / normal", () => {
    const g = buildFlagstonePath(curve, { width: 3.4, groundY: (x, z) => Math.sin(x * 0.1) * 0.3 + z * 0.01, seed: 7, quality: "high" });
    const meshes: THREE.Mesh[] = [];
    g.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
    });
    expect(meshes.length).toBe(1);
    const geo = meshes[0].geometry;
    for (const a of ["position", "normal", "color", "uv"]) expect(geo.attributes[a]).toBeDefined();
    expect(geo.index).not.toBeNull();
    expect(geo.attributes.position.count).toBeGreaterThan(2000);
  });

  it("hugs the terrain: slab tops stay close to ground + lift", () => {
    const groundY = (x: number, z: number) => 2 + Math.sin(x * 0.2) * 0.5 + z * 0.03;
    const g = buildFlagstonePath(curve, { width: 3.4, groundY, seed: 7, quality: "low" });
    const geo = (g.children[0] as THREE.Mesh).geometry;
    const p = geo.attributes.position;
    const n = geo.attributes.normal;
    let tops = 0;
    for (let i = 0; i < p.count; i++) {
      if (n.getY(i) > 0.9) {
        tops++;
        const dy = p.getY(i) - groundY(p.getX(i), p.getZ(i));
        expect(dy).toBeGreaterThan(-0.02);
        expect(dy).toBeLessThan(0.3);
      }
    }
    expect(tops).toBeGreaterThan(500);
  });

  it("top faces point up", () => {
    const g = buildFlagstonePath(curve, { width: 3.4, groundY: () => 0, seed: 3, quality: "low" });
    const geo = (g.children[0] as THREE.Mesh).geometry;
    const idx = geo.index!;
    const p = geo.attributes.position;
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();
    let up = 0;
    let down = 0;
    for (let i = 0; i < idx.count; i += 3) {
      a.fromBufferAttribute(p, idx.getX(i));
      b.fromBufferAttribute(p, idx.getX(i + 1));
      c.fromBufferAttribute(p, idx.getX(i + 2));
      const ny = b.clone().sub(a).cross(c.clone().sub(a)).y;
      if (ny > 1e-9) up++;
      else if (ny < -1e-9) down++;
    }
    expect(up).toBeGreaterThan(down * 0.8);
  });
});
