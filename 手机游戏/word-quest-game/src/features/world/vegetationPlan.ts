// 成片植被的布局规划：纯函数，不依赖 three / WebGL，可单测。
// 输出实例列表（种类、变体、位置、缩放、朝向），渲染由 vegetationField.ts 负责。

export type VegetationKind = "broadleaf" | "pine" | "bush" | "rock";

export interface VegetationInstance {
  kind: VegetationKind;
  /** 该类别内的造型变体序号，0 ≤ variant < VARIANTS_PER_KIND */
  variant: number;
  x: number;
  y: number;
  z: number;
  /** 均匀缩放 */
  scale: number;
  /** 绕 Y 轴旋转（弧度） */
  rotY: number;
}

/** 圆形避让区 [x, z, 半径] */
export type AvoidCircle = readonly [number, number, number];
/** 椭圆避让区（湖面）：中心、x / z 半轴 */
export interface AvoidEllipse { x: number; z: number; rx: number; rz: number }
/** 线段避让区（道路）：两端点和半宽 */
export interface AvoidSegment { ax: number; az: number; bx: number; bz: number; halfWidth: number }

export interface VegetationPlanInput {
  centerX: number;
  centerZ: number;
  halfW: number;
  halfD: number;
  quality: "high" | "med" | "low";
  /** "space" 时只出 rock */
  decorStyle: string;
  seed: number;
  groundY: (x: number, z: number) => number;
  avoidCircles?: AvoidCircle[];
  avoidEllipses?: AvoidEllipse[];
  avoidSegments?: AvoidSegment[];
  /** |x - centerX| 小于该值的条带不放植被（主世界中轴视线），默认 0 */
  clearCenterStrip?: number;
}

export const VARIANTS_PER_KIND = 3;
/** high 档各类别实例上限；med = 0.6×，low = 0.35× */
export const BASE_BUDGET: Record<VegetationKind, number> = { broadleaf: 900, pine: 1100, bush: 1200, rock: 500 };

const QUALITY_FACTOR = { high: 1, med: 0.6, low: 0.35 } as const;
const EDGE_BAND = 60;
const SCALE_RANGE: Record<VegetationKind, readonly [number, number]> = {
  broadleaf: [0.8, 1.6],
  pine: [0.9, 2.0],
  bush: [0.7, 1.5],
  rock: [0.5, 1.3],
};

function mulberry32(seed: number): () => number {
  let a = (seed | 0) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function latticeHash(ix: number, iz: number, seed: number): number {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iz, 668265263) ^ Math.imul(seed | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function valueNoise(x: number, z: number, seed: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const sx = fx * fx * (3 - 2 * fx);
  const sz = fz * fz * (3 - 2 * fz);
  const a = latticeHash(ix, iz, seed);
  const b = latticeHash(ix + 1, iz, seed);
  const c = latticeHash(ix, iz + 1, seed);
  const d = latticeHash(ix + 1, iz + 1, seed);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/** 距区域边界的距离（区域内为正） */
function edgeDistance(x: number, z: number, i: VegetationPlanInput): number {
  return Math.min(i.halfW - Math.abs(x - i.centerX), i.halfD - Math.abs(z - i.centerZ));
}

/** 林地密度 0..1：低频值噪声 + 边界 60 内的远景林带抬高 */
export function forestDensity(x: number, z: number, input: VegetationPlanInput): number {
  const n = valueNoise(x / 85, z / 85, input.seed) * 0.7 + valueNoise(x / 34, z / 34, input.seed + 101) * 0.3;
  const base = smoothstep(0.42, 0.62, n);
  const edgeT = 1 - smoothstep(0, EDGE_BAND, Math.max(0, edgeDistance(x, z, input)));
  return Math.min(1, Math.max(base, edgeT * 0.95));
}

function blocked(x: number, z: number, i: VegetationPlanInput): boolean {
  if (Math.abs(x - i.centerX) < (i.clearCenterStrip ?? 0)) return true;
  for (const [cx, cz, r] of i.avoidCircles ?? []) {
    if (Math.hypot(x - cx, z - cz) <= r) return true;
  }
  for (const e of i.avoidEllipses ?? []) {
    const dx = (x - e.x) / e.rx;
    const dz = (z - e.z) / e.rz;
    if (dx * dx + dz * dz <= 1) return true;
  }
  for (const s of i.avoidSegments ?? []) {
    const abx = s.bx - s.ax;
    const abz = s.bz - s.az;
    const len2 = abx * abx + abz * abz;
    const t = len2 > 0 ? Math.min(1, Math.max(0, ((x - s.ax) * abx + (z - s.az) * abz) / len2)) : 0;
    if (Math.hypot(x - (s.ax + abx * t), z - (s.az + abz * t)) <= s.halfWidth) return true;
  }
  return false;
}

interface Candidate extends VegetationInstance {
  /** 画质抽稀用的稳定排序值：越小越优先保留 */
  keep: number;
}

export function planVegetation(input: VegetationPlanInput): VegetationInstance[] {
  if (!(input.halfW > 0) || !(input.halfD > 0)) return [];
  const space = input.decorStyle === "space";
  const rand = mulberry32(input.seed * 2654435761 + 12345);
  const area = 4 * input.halfW * input.halfD;
  const cell = Math.min(6, Math.max(3.5, Math.sqrt(area / 14000)));
  const nx = Math.ceil((input.halfW * 2) / cell);
  const nz = Math.ceil((input.halfD * 2) / cell);
  const x0 = input.centerX - input.halfW;
  const z0 = input.centerZ - input.halfD;

  const out: Candidate[] = [];
  for (let iz = 0; iz < nz; iz++) {
    for (let ix = 0; ix < nx; ix++) {
      // 固定消耗随机数，保证布局与避让区 / 画质无关
      const jx = rand();
      const jz = rand();
      const r1 = rand();
      const r2 = rand();
      const r3 = rand();
      const r4 = rand();
      const r5 = rand();
      const r6 = rand();
      const r7 = rand();
      const r8 = rand();
      const x = x0 + (ix + jx) * cell;
      const z = z0 + (iz + jz) * cell;
      if (x < x0 || x > x0 + input.halfW * 2 || z < z0 || z > z0 + input.halfD * 2) continue;

      const dens = forestDensity(x, z, input);
      const edgeT = 1 - smoothstep(0, EDGE_BAND, Math.max(0, edgeDistance(x, z, input)));
      let kind: VegetationKind | undefined;
      if (space) {
        if (r1 < 0.12) kind = "rock";
      } else if (dens > 0.5 && r1 < (dens - 0.3) * 1.1) {
        kind = r2 < 0.3 + 0.6 * edgeT ? "pine" : "broadleaf";
      } else if (dens > 0.2 && r3 < 0.18 + 0.3 * dens) {
        kind = "bush";
      } else if (r4 < 0.05) {
        kind = "rock";
      }
      if (!kind) continue;
      if (blocked(x, z, input)) continue;
      const gy = input.groundY(x, z);
      if (!Number.isFinite(gy)) continue;

      const [s0, s1] = SCALE_RANGE[kind];
      const scale = s0 + r5 * (s1 - s0);
      out.push({
        kind,
        variant: Math.min(VARIANTS_PER_KIND - 1, Math.floor(r6 * VARIANTS_PER_KIND)),
        x,
        y: kind === "rock" ? gy - 0.04 * scale : gy, // 岩石底面落在 y=0，略埋入地面
        z,
        scale,
        rotY: r7 * Math.PI * 2,
        // 抽稀时优先保留林心：密度越高 keep 越小，林缘稀疏处先被删，树林保持成片
        keep: r8 * (1.15 - dens),
      });
    }
  }

  const factor = QUALITY_FACTOR[input.quality] ?? 1;
  const result: VegetationInstance[] = [];
  for (const kind of ["broadleaf", "pine", "bush", "rock"] as const) {
    const cap = Math.floor(BASE_BUDGET[kind] * factor);
    // 稳定抽稀：按 keep 值升序取前 min(cap, n×factor) 个，low 是 high 的子集
    const list = out.filter((c) => c.kind === kind).sort((a, b) => a.keep - b.keep || a.x - b.x || a.z - b.z);
    const take = Math.min(cap, Math.floor(list.length * factor));
    for (let i = 0; i < take; i++) {
      const { keep: _keep, ...inst } = list[i];
      void _keep;
      result.push(inst);
    }
  }
  return result;
}
