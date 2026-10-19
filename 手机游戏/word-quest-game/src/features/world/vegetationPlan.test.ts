import { describe, expect, it } from "vitest";
import { BASE_BUDGET, forestDensity, planVegetation, VARIANTS_PER_KIND, type VegetationPlanInput } from "./vegetationPlan";

const base: VegetationPlanInput = {
  centerX: 0,
  centerZ: 100,
  halfW: 300,
  halfD: 380,
  quality: "high",
  decorStyle: "forest",
  seed: 2024,
  groundY: (x, z) => Math.sin(x * 0.01) * 2 + z * 0.001,
  avoidCircles: [[40, 60, 26], [-80, 200, 26]],
  avoidEllipses: [{ x: 120, z: 150, rx: 55, rz: 35 }],
  avoidSegments: [{ ax: 40, az: 60, bx: -80, bz: 200, halfWidth: 7 }],
  clearCenterStrip: 14,
};

type Kind = "broadleaf" | "pine" | "bush" | "rock";
const KINDS: Kind[] = ["broadleaf", "pine", "bush", "rock"];

describe("planVegetation", () => {
  it("is deterministic and seed-sensitive", () => {
    expect(planVegetation(base)).toEqual(planVegetation({ ...base }));
    expect(planVegetation(base).length).toBeGreaterThan(500);
    expect(planVegetation({ ...base, seed: 7 })).not.toEqual(planVegetation(base));
  });

  it("keeps out of every avoid zone and the centre strip", () => {
    const list = planVegetation(base);
    for (const p of list) {
      for (const [cx, cz, r] of base.avoidCircles!) expect(Math.hypot(p.x - cx, p.z - cz)).toBeGreaterThan(r);
      for (const e of base.avoidEllipses!) expect(((p.x - e.x) / e.rx) ** 2 + ((p.z - e.z) / e.rz) ** 2).toBeGreaterThan(1);
      for (const s of base.avoidSegments!) {
        const abx = s.bx - s.ax;
        const abz = s.bz - s.az;
        const t = Math.min(1, Math.max(0, ((p.x - s.ax) * abx + (p.z - s.az) * abz) / (abx * abx + abz * abz)));
        expect(Math.hypot(p.x - (s.ax + abx * t), p.z - (s.az + abz * t))).toBeGreaterThan(s.halfWidth);
      }
      expect(Math.abs(p.x - base.centerX)).toBeGreaterThanOrEqual(14);
    }
  });

  it("stays in the region, within budgets, scale ranges and variant bounds", () => {
    const list = planVegetation(base);
    const range = { broadleaf: [0.8, 1.6], pine: [0.9, 2.0], bush: [0.7, 1.5], rock: [0.5, 1.3] } as const;
    for (const p of list) {
      expect(Math.abs(p.x - base.centerX)).toBeLessThanOrEqual(base.halfW);
      expect(Math.abs(p.z - base.centerZ)).toBeLessThanOrEqual(base.halfD);
      expect(p.variant).toBeGreaterThanOrEqual(0);
      expect(p.variant).toBeLessThan(VARIANTS_PER_KIND);
      expect(p.scale).toBeGreaterThanOrEqual(range[p.kind][0]);
      expect(p.scale).toBeLessThanOrEqual(range[p.kind][1]);
      const gy = base.groundY(p.x, p.z);
      expect(p.y).toBeCloseTo(p.kind === "rock" ? gy + 0.15 * p.scale : gy, 6);
    }
    const med = planVegetation({ ...base, quality: "med" });
    for (const k of KINDS) {
      expect(list.filter((p) => p.kind === k).length).toBeLessThanOrEqual(BASE_BUDGET[k]);
      expect(med.filter((p) => p.kind === k).length).toBeLessThanOrEqual(Math.floor(BASE_BUDGET[k] * 0.6));
    }
  });

  it("scales low / high totals into 0.25-0.45", () => {
    const hi = planVegetation(base).length;
    const lo = planVegetation({ ...base, quality: "low" }).length;
    expect(lo / hi).toBeGreaterThan(0.25);
    expect(lo / hi).toBeLessThan(0.45);
  });

  it("only produces rocks for the space theme", () => {
    const list = planVegetation({ ...base, decorStyle: "space" });
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((p) => p.kind === "rock")).toBe(true);
  });

  it("is denser in the edge band (< 60 from border) than the middle", () => {
    const noAvoid = { ...base, avoidCircles: [], avoidEllipses: [], avoidSegments: [], clearCenterStrip: 0 };
    const list = planVegetation(noAvoid);
    const edgeDist = (p: { x: number; z: number }) => Math.min(base.halfW - Math.abs(p.x - base.centerX), base.halfD - Math.abs(p.z - base.centerZ));
    const W = base.halfW * 2;
    const D = base.halfD * 2;
    const midArea = (W - 120) * (D - 120);
    const edgeArea = W * D - midArea;
    const edge = list.filter((p) => edgeDist(p) < 60).length / edgeArea;
    const mid = list.filter((p) => edgeDist(p) >= 60).length / midArea;
    expect(edge).toBeGreaterThan(mid);
    expect(forestDensity(base.centerX + base.halfW - 5, base.centerZ, base)).toBeGreaterThan(0.9);
  });

  it("returns [] for an empty region and drops non-finite ground", () => {
    expect(planVegetation({ ...base, halfW: 0 })).toEqual([]);
    expect(planVegetation({ ...base, halfD: -5 })).toEqual([]);
    expect(planVegetation({ ...base, groundY: () => NaN })).toEqual([]);
  });
});
