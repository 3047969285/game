import * as THREE from "three";
import { getFlagstoneMaterial } from "./rockMaterial";
import { roadLiftAt } from "./roadRibbon";
import { seededRand, valueNoise } from "./utils";

/**
 * 不规则石板路：沿曲线用抖动网格 Voronoi 切分路面，每个格子内缩出缝隙成为一块石板，
 * 全部石板（外加路缘碎石）合并成一个网格、一个材质，颜色走顶点色 + 共享岩石纹理。
 * planFlagstones 是纯逻辑（无 WebGL），可单测。
 */

export interface FlagstoneOpts {
  /** 路宽 */
  width: number;
  groundY: (x: number, z: number) => number;
  seed: number;
  quality: "high" | "med" | "low";
}

export interface FlagstoneBuildOpts extends FlagstoneOpts {
  /** 配色：overworld 为灰 / 暖灰 / 青灰，unit 为单元路线的深蓝灰 */
  palette?: "overworld" | "unit";
  /** 石板顶面相对地形的抬升，参数为距中线的横向偏移；默认沿 buildRoadRibbon 的路拱 + 5 cm */
  lift?: (off: number) => number;
  /** 路线起 / 终点内缩（米） */
  startInset?: number;
  endInset?: number;
}

export interface PlannedStone {
  cx: number;
  cz: number;
  /** 多边形顶点（世界 xz），逆时针（鞋带公式面积为正），5–8 个点 */
  poly: Array<[number, number]>;
  /** 0..1 色调随机 */
  tone: number;
}

type P2 = [number, number];

const GAP_HALF = [0.02, 0.04] as const; // 每块石板内缩 2~4 cm，相邻石板缝隙 4~8 cm
const MIN_AREA = 0.1;

function polyArea(poly: P2[]): number {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i];
    const [x1, y1] = poly[(i + 1) % poly.length];
    a += x0 * y1 - x1 * y0;
  }
  return a * 0.5;
}

/** Sutherland–Hodgman：保留 nx*x + ny*y <= c 的一侧 */
function clipHalfPlane(poly: P2[], nx: number, ny: number, c: number): P2[] {
  const out: P2[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const da = nx * a[0] + ny * a[1] - c;
    const db = nx * b[0] + ny * b[1] - c;
    if (da <= 0) out.push(a);
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
      const t = da / (da - db);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
}

/** 凸多边形整体向内缩 d（把每条边的半平面内移再求交） */
function insetConvex(poly: P2[], d: number): P2[] {
  let out = poly;
  const n = poly.length;
  for (let i = 0; i < n && out.length >= 3; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    const ex = b[0] - a[0];
    const ey = b[1] - a[1];
    const len = Math.hypot(ex, ey);
    if (len < 1e-6) continue;
    // 逆时针多边形：外法线 = (ey, -ex)
    const nx = ey / len;
    const ny = -ex / len;
    out = clipHalfPlane(out, nx, ny, nx * a[0] + ny * a[1] - d);
  }
  return out;
}

function dedupe(poly: P2[], eps = 1e-5): P2[] {
  const out: P2[] = [];
  for (const p of poly) {
    const q = out[out.length - 1];
    if (!q || Math.hypot(p[0] - q[0], p[1] - q[1]) > eps) out.push(p);
  }
  while (out.length > 1 && Math.hypot(out[0][0] - out[out.length - 1][0], out[0][1] - out[out.length - 1][1]) <= eps) out.pop();
  return out;
}

/** 把顶点数调整到 5..8：多了删三角面积最小的顶点（只会收缩），少了在最长边上插入微凸的中点 */
function fitVertexCount(poly: P2[]): P2[] {
  const p = poly.slice();
  while (p.length > 8) {
    let best = 0;
    let bestA = Infinity;
    for (let i = 0; i < p.length; i++) {
      const a = p[(i + p.length - 1) % p.length];
      const b = p[i];
      const c = p[(i + 1) % p.length];
      const ar = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]));
      if (ar < bestA) {
        bestA = ar;
        best = i;
      }
    }
    p.splice(best, 1);
  }
  while (p.length < 5) {
    let best = 0;
    let bestL = -1;
    for (let i = 0; i < p.length; i++) {
      const a = p[i];
      const b = p[(i + 1) % p.length];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (l > bestL) {
        bestL = l;
        best = i;
      }
    }
    const a = p[best];
    const b = p[(best + 1) % p.length];
    const ex = b[0] - a[0];
    const ey = b[1] - a[1];
    const len = Math.hypot(ex, ey) || 1;
    // 外法线方向微凸 3 mm，保持严格凸
    p.splice(best + 1, 0, [(a[0] + b[0]) / 2 + (ey / len) * 0.003, (a[1] + b[1]) / 2 - (ex / len) * 0.003]);
  }
  return p;
}

interface Frames {
  length: number;
  /** 弧长 s 处的中线点与单位切线 */
  at(s: number): { x: number; z: number; tx: number; tz: number };
}

function makeFrames(points: ReadonlyArray<{ x: number; z: number }>): Frames {
  const xs: number[] = [points[0].x];
  const zs: number[] = [points[0].z];
  const cum: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i].x - points[i - 1].x, points[i].z - points[i - 1].z);
    if (d < 1e-6) continue;
    xs.push(points[i].x);
    zs.push(points[i].z);
    cum.push(cum[cum.length - 1] + d);
  }
  const length = cum[cum.length - 1];
  const n = xs.length;
  // 顶点切线 = 相邻两段方向的平均：偏移线连续，折点处不会出现楔形重叠 / 裂口
  const vtx: number[] = [];
  const vtz: number[] = [];
  for (let i = 0; i < n; i++) {
    const i0 = Math.max(0, i - 1);
    const i1 = Math.min(n - 1, i + 1);
    const dx = xs[i1] - xs[i0];
    const dz = zs[i1] - zs[i0];
    const l = Math.hypot(dx, dz) || 1;
    vtx.push(dx / l);
    vtz.push(dz / l);
  }
  return {
    length,
    at(s) {
      const ss = Math.min(length, Math.max(0, s));
      let lo = 0;
      let hi = n - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] <= ss) lo = mid;
        else hi = mid;
      }
      const seg = Math.max(1e-9, cum[hi] - cum[lo]);
      const u = (ss - cum[lo]) / seg;
      let tx = vtx[lo] + (vtx[hi] - vtx[lo]) * u;
      let tz = vtz[lo] + (vtz[hi] - vtz[lo]) * u;
      const l = Math.hypot(tx, tz) || 1;
      tx /= l;
      tz /= l;
      return { x: xs[lo] + (xs[hi] - xs[lo]) * u, z: zs[lo] + (zs[hi] - zs[lo]) * u, tx, tz };
    },
  };
}

/** 路带局部坐标 (s 沿路, t 横向，与 buildRoadRibbon 同向：法线 = (-tz, tx)) → 世界 xz */
function toWorld(f: Frames, s: number, t: number): P2 {
  const q = f.at(s);
  return [q.x - q.tz * t, q.z + q.tx * t];
}

interface StoneST {
  poly: P2[]; // (s, t)，逆时针
  cs: number;
  ct: number;
  tone: number;
}

/** 内部：在 (s, t) 空间切分；s ∈ [s0, s1]，t ∈ [-w/2, w/2] */
function planST(length: number, width: number, seed: number, s0 = 0, s1 = length): StoneST[] {
  const rnd = seededRand(Math.floor(seed) * 2654435 + 91);
  const rows = Math.max(2, Math.round(width / 0.82));
  const rowH = width / rows;
  const colW = rowH * 1.3;
  const half = width / 2;
  const cols0 = Math.floor(s0 / colW) - 1;
  const cols1 = Math.ceil(s1 / colW) + 1;
  const seeds: Array<{ s: number; t: number }> = [];
  for (let c = cols0; c <= cols1; c++) {
    for (let r = 0; r < rows; r++) {
      seeds.push({
        s: (c + 0.5 + 0.5 * (r & 1)) * colW + (rnd() - 0.5) * 0.6 * colW,
        t: -half + (r + 0.5) * rowH + (rnd() - 0.5) * 0.6 * rowH,
      });
    }
  }
  const out: StoneST[] = [];
  for (let i = 0; i < seeds.length; i++) {
    const me = seeds[i];
    // 该格子的随机边界：路缘边的石板长短不一
    const tLo = -half + rnd() * 0.1;
    const tHi = half - rnd() * 0.1;
    const skip = rnd() < 0.04;
    const gap = GAP_HALF[0] + rnd() * (GAP_HALF[1] - GAP_HALF[0]);
    const tone = rnd();
    if (me.s < s0 - colW || me.s > s1 + colW) continue;
    let poly: P2[] = [
      [Math.max(s0, me.s - 2 * colW), tLo],
      [Math.min(s1, me.s + 2 * colW), tLo],
      [Math.min(s1, me.s + 2 * colW), tHi],
      [Math.max(s0, me.s - 2 * colW), tHi],
    ];
    if (poly[0][0] >= poly[1][0]) continue;
    const jLo = Math.max(0, i - 4 * rows);
    const jHi = Math.min(seeds.length, i + 4 * rows + 1);
    for (let j = jLo; j < jHi && poly.length >= 3; j++) {
      if (j === i) continue;
      const o = seeds[j];
      if (Math.abs(o.s - me.s) > 2.6 * colW || Math.abs(o.t - me.t) > 2.6 * rowH) continue;
      const nx = o.s - me.s;
      const ny = o.t - me.t;
      const mx = (o.s + me.s) / 2;
      const my = (o.t + me.t) / 2;
      poly = clipHalfPlane(poly, nx, ny, nx * mx + ny * my);
    }
    if (poly.length < 3 || skip) continue;
    poly = dedupe(poly);
    if (poly.length < 3) continue;
    poly = dedupe(insetConvex(poly, gap));
    if (poly.length < 3) continue;
    const area = polyArea(poly);
    if (area < MIN_AREA) continue;
    poly = fitVertexCount(poly);
    let cs = 0;
    let ct = 0;
    for (const p of poly) {
      cs += p[0];
      ct += p[1];
    }
    out.push({ poly, cs: cs / poly.length, ct: ct / poly.length, tone });
  }
  return out;
}

/** 纯逻辑：沿路生成石板多边形（抖动网格 Voronoi 切分后内缩出缝隙），可单测 */
export function planFlagstones(points: Array<{ x: number; z: number }>, width: number, seed: number): PlannedStone[] {
  if (points.length < 2) return [];
  const frames = makeFrames(points);
  if (frames.length < 0.5) return [];
  const stones: PlannedStone[] = [];
  for (const st of planST(frames.length, width, seed)) {
    let poly = st.poly.map(([s, t]) => toWorld(frames, s, t));
    if (polyArea(poly) < 0) poly = poly.reverse();
    let cx = 0;
    let cz = 0;
    for (const p of poly) {
      cx += p[0];
      cz += p[1];
    }
    stones.push({ cx: cx / poly.length, cz: cz / poly.length, poly, tone: st.tone });
  }
  return stones;
}

/** Chaikin 切角：把折线的拐角磨圆（石板沿圆滑后的中线铺设） */
export function smoothPolyline(points: Array<{ x: number; z: number }>, iterations = 3): Array<{ x: number; z: number }> {
  let pts = points.map((p) => ({ x: p.x, z: p.z }));
  for (let it = 0; it < iterations && pts.length > 2; it++) {
    const next = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      next.push({ x: a.x * 0.75 + b.x * 0.25, z: a.z * 0.75 + b.z * 0.25 }, { x: a.x * 0.25 + b.x * 0.75, z: a.z * 0.25 + b.z * 0.75 });
    }
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
}

/**
 * 在折线的每个拐点两侧各补一个点（距拐点 radius 米，不超过相邻线段的 45%）：
 * 中线仍严格沿原折线（与 buildRoadRibbon 的路面重合），但石板的横向基准在拐点附近平滑过渡，
 * 内侧石板不会互相挤压重叠。
 */
export function addCornerBlend(points: Array<{ x: number; z: number }>, radius = 6): Array<{ x: number; z: number }> {
  if (points.length < 3) return points.map((p) => ({ x: p.x, z: p.z }));
  const out = [{ x: points[0].x, z: points[0].z }];
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1];
    const b = points[i];
    const c = points[i + 1];
    const lab = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    const lbc = Math.hypot(c.x - b.x, c.z - b.z) || 1;
    const r0 = Math.min(radius, lab * 0.45);
    const r1 = Math.min(radius, lbc * 0.45);
    out.push({ x: b.x + ((a.x - b.x) / lab) * r0, z: b.z + ((a.z - b.z) / lab) * r0 }, { x: b.x, z: b.z }, { x: b.x + ((c.x - b.x) / lbc) * r1, z: b.z + ((c.z - b.z) / lbc) * r1 });
  }
  out.push({ x: points[points.length - 1].x, z: points[points.length - 1].z });
  return out;
}

// ───────────────────────── 网格 ─────────────────────────

const OVERWORLD_TONES = [0xc7ccd0, 0xcfcfca, 0xd8cebf, 0xc4cbc8]; // 青灰 / 灰 / 暖灰 / 灰绿
const UNIT_TONES = [0x7b8794, 0x727c88, 0x69737f, 0x75808a]; // 深蓝灰（不饱和）
const MOSS = new THREE.Color(0x4f6335);
const UV_SCALE = 0.7;

interface MeshAcc {
  pos: number[];
  col: number[];
  uv: number[];
  idx: number[];
}

interface StoneStyle {
  thickness: number;
  bevel: number;
  drop: number;
  tone: number;
  mossy: number;
}

/** 往累加器里加一块石板：中心扇形顶面 + 倒角带 + 侧壁（各自独立顶点，棱线保持清晰） */
function addSlab(
  acc: MeshAcc,
  poly: P2[],
  offs: number[],
  groundY: (x: number, z: number) => number,
  lift: (off: number) => number,
  tones: number[],
  st: StoneStyle,
  rnd: () => number
): void {
  const n = poly.length;
  let cx = 0;
  let cz = 0;
  for (const p of poly) {
    cx += p[0];
    cz += p[1];
  }
  cx /= n;
  cz /= n;
  const yTop: number[] = [];
  for (let i = 0; i < n; i++) {
    const [x, z] = poly[i];
    // 顶面贴合地形与路拱，另加一点石板自身的不平
    yTop.push(groundY(x, z) + lift(offs[i]) + (valueNoise(x * 2.1 + 3, z * 2.1) - 0.5) * 0.02);
  }
  const yAvg = yTop.reduce((a, b) => a + b, 0) / n;
  const base = new THREE.Color(tones[Math.min(tones.length - 1, Math.floor(st.tone * tones.length))]);
  const next = new THREE.Color(tones[Math.min(tones.length - 1, Math.floor(st.tone * tones.length) + 1) % tones.length]);
  base.lerp(next, (st.tone * tones.length) % 1);
  base.multiplyScalar(0.84 + rnd() * 0.26);
  const c = new THREE.Color();
  const push = (x: number, y: number, z: number, u: number, v: number, moss: number, shade: number): number => {
    c.copy(base).multiplyScalar(shade).lerp(MOSS, moss);
    acc.pos.push(x, y, z);
    acc.col.push(c.r, c.g, c.b);
    acc.uv.push(u, v);
    return acc.pos.length / 3 - 1;
  };
  // 倒角内圈：向中心收 bevel（不超过到中心距离的 35%）
  const inner: P2[] = poly.map(([x, z]) => {
    const dx = x - cx;
    const dz = z - cz;
    const d = Math.hypot(dx, dz) || 1;
    const k = Math.min(st.bevel, d * 0.35) / d;
    return [x - dx * k, z - dz * k];
  });
  // 顶面扇形
  const topC = push(cx, yAvg + 0.008, cz, cx * UV_SCALE, cz * UV_SCALE, 0, 1.04);
  const topRing: number[] = [];
  for (let i = 0; i < n; i++) {
    const wear = 0.93 + rnd() * 0.07;
    topRing.push(push(inner[i][0], yTop[i], inner[i][1], inner[i][0] * UV_SCALE, inner[i][1] * UV_SCALE, st.mossy * 0.25 * rnd(), wear));
  }
  for (let i = 0; i < n; i++) acc.idx.push(topC, topRing[(i + 1) % n], topRing[i]);
  // 倒角带：A（内圈高）→ B（外缘，低 drop）
  const bevA: number[] = [];
  const bevB: number[] = [];
  for (let i = 0; i < n; i++) {
    bevA.push(push(inner[i][0], yTop[i], inner[i][1], inner[i][0] * UV_SCALE, inner[i][1] * UV_SCALE, st.mossy * 0.25, 0.94));
    bevB.push(push(poly[i][0], yTop[i] - st.drop - rnd() * 0.006, poly[i][1], poly[i][0] * UV_SCALE, poly[i][1] * UV_SCALE, st.mossy * 0.55 * (0.5 + rnd()), 0.8));
  }
  // 侧壁：B → 沉入地下的底圈
  const sideB: number[] = [];
  const sideC: number[] = [];
  let run = 0;
  for (let i = 0; i < n; i++) {
    const [x, z] = poly[i];
    const prev = poly[(i + n - 1) % n];
    run += Math.hypot(x - prev[0], z - prev[1]);
    const yB = yTop[i] - st.drop;
    const yC = Math.min(yB - st.thickness + st.drop, groundY(x, z) - 0.06);
    sideB.push(push(x, yB, z, run * UV_SCALE, yB * UV_SCALE, st.mossy * 0.7, 0.72));
    sideC.push(push(x, yC, z, run * UV_SCALE, yC * UV_SCALE, st.mossy * 0.9, 0.45));
  }
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    acc.idx.push(bevA[i], bevA[j], bevB[i], bevA[j], bevB[j], bevB[i]);
    acc.idx.push(sideB[i], sideB[j], sideC[i], sideB[j], sideC[j], sideC[i]);
  }
}

/** 缓和多边形（碎石）：顶点数 5~6，半径带抖动 */
function pebblePoly(cx: number, cz: number, r: number, rnd: () => number): P2[] {
  const n = 5 + Math.floor(rnd() * 2);
  const a0 = rnd() * 6.28;
  const sx = 0.85 + rnd() * 0.5;
  const poly: P2[] = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + (i / n) * Math.PI * 2 + (rnd() - 0.5) * 0.4;
    const rr = r * (0.75 + rnd() * 0.5);
    poly.push([cx + Math.cos(a) * rr * sx, cz + Math.sin(a) * rr]);
  }
  return poly; // 角度递增 → 逆时针
}

/** 多条折线（世界 xz）合并成同一个石板网格组（一个网格、一种材质） */
export function buildFlagstonePaths(paths: Array<Array<{ x: number; z: number }>>, opts: FlagstoneBuildOpts): THREE.Group {
  const group = new THREE.Group();
  group.name = "flagstone-path";
  const acc: MeshAcc = { pos: [], col: [], uv: [], idx: [] };
  const half = opts.width / 2;
  const lift = opts.lift ?? ((off: number) => roadLiftAt(off, half) + 0.05);
  const tones = opts.palette === "unit" ? UNIT_TONES : OVERWORLD_TONES;
  const pebbleDensity = opts.quality === "high" ? 1.2 : opts.quality === "med" ? 0.7 : 0.3;

  paths.forEach((points, pi) => {
    if (points.length < 2) return;
    const frames = makeFrames(points);
    const s0 = opts.startInset ?? 0;
    const s1 = frames.length - (opts.endInset ?? 0);
    if (s1 - s0 < 1) return;
    const seed = opts.seed + pi * 977;
    const rnd = seededRand(seed * 31 + 7);
    for (const st of planST(frames.length, opts.width, seed, s0, s1)) {
      const poly = st.poly.map(([s, t]) => toWorld(frames, s, t));
      const offs = st.poly.map(([, t]) => t);
      if (polyArea(poly) < 0) {
        poly.reverse();
        offs.reverse();
      }
      addSlab(
        acc,
        poly,
        offs,
        opts.groundY,
        lift,
        tones,
        { thickness: 0.08 + rnd() * 0.04, bevel: 0.022 + rnd() * 0.012, drop: 0.02 + rnd() * 0.01, tone: st.tone, mossy: rnd() < 0.4 ? 0.3 + rnd() * 0.7 : rnd() * 0.25 },
        rnd
      );
    }
    // 路缘零散碎石与土石过渡
    const count = Math.floor((s1 - s0) * pebbleDensity);
    for (let k = 0; k < count; k++) {
      const side = k & 1 ? 1 : -1;
      const s = s0 + rnd() * (s1 - s0);
      const t = side * (half - 0.15 + Math.pow(rnd(), 1.6) * 0.75);
      const [x, z] = toWorld(frames, s, t);
      const r = 0.045 + rnd() * rnd() * 0.12;
      const poly = pebblePoly(x, z, r, rnd);
      addSlab(
        acc,
        poly,
        poly.map(() => t),
        opts.groundY,
        (off) => Math.max(0.012, lift(off) - 0.04),
        tones,
        { thickness: 0.05, bevel: Math.min(0.015, r * 0.3), drop: 0.012, tone: rnd(), mossy: rnd() * 0.6 },
        rnd
      );
    }
  });

  if (acc.idx.length === 0) return group;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(acc.pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(acc.col, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(acc.uv, 2));
  geo.setIndex(new THREE.BufferAttribute(acc.pos.length / 3 > 65535 ? new Uint32Array(acc.idx) : new Uint16Array(acc.idx), 1));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  const mesh = new THREE.Mesh(geo, getFlagstoneMaterial());
  mesh.name = "flagstones";
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  group.add(mesh);
  return group;
}

/** 沿曲线铺不规则石板：返回一个合并网格组（每种材质最多一个网格） */
export function buildFlagstonePath(curve: THREE.Curve<THREE.Vector3>, opts: FlagstoneBuildOpts): THREE.Group {
  const len = curve.getLength();
  const pts = curve.getSpacedPoints(Math.max(4, Math.ceil(len / 0.5))).map((p) => ({ x: p.x, z: p.z }));
  return buildFlagstonePaths([pts], opts);
}
