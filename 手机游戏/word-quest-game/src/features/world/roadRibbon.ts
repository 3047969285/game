import * as THREE from "three";
import { fbm } from "./utils";

/**
 * 贴地道路：沿曲线生成带路拱、两侧路缘与碎石渐变的带状网格，
 * 每个顶点单独采样地形高度，因此随地形起伏而不是一根悬空的管子。
 */
export function buildRoadRibbon(
  curve: THREE.Curve<THREE.Vector3>,
  opts: {
    width: number;
    steps: number;
    groundY: (x: number, z: number) => number;
    base: number;
    /** 路面中线的发光嵌条颜色（可选） */
    inlay?: { color: number; emissive: number; intensity: number };
  }
): THREE.Group {
  const group = new THREE.Group();
  group.name = "road";
  const half = opts.width / 2;
  const base = new THREE.Color(opts.base);

  // 横截面：路缘外侧 → 路缘 → 路肩 → 路面（含路拱）→ 对称
  const profile: Array<{ off: number; lift: number; tone: number }> = [
    { off: -half - 0.55, lift: -0.04, tone: 0.55 },
    { off: -half - 0.18, lift: 0.1, tone: 0.78 },
    { off: -half, lift: 0.17, tone: 0.95 },
    { off: -half * 0.7, lift: 0.09, tone: 1.0 },
    { off: 0, lift: 0.13, tone: 1.06 },
    { off: half * 0.7, lift: 0.09, tone: 1.0 },
    { off: half, lift: 0.17, tone: 0.95 },
    { off: half + 0.18, lift: 0.1, tone: 0.78 },
    { off: half + 0.55, lift: -0.04, tone: 0.55 },
  ];
  const cols = profile.length;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const p = new THREE.Vector3();
  const t = new THREE.Vector3();
  const c = new THREE.Color();

  for (let i = 0; i <= opts.steps; i++) {
    const u = i / opts.steps;
    curve.getPoint(u, p);
    curve.getTangent(u, t);
    const sx = -t.z;
    const sz = t.x;
    const len = Math.hypot(sx, sz) || 1;
    for (let k = 0; k < cols; k++) {
      const { off, lift, tone } = profile[k];
      const x = p.x + (sx / len) * off;
      const z = p.z + (sz / len) * off;
      positions.push(x, opts.groundY(x, z) + lift, z);
      const speck = 0.88 + 0.24 * fbm(x * 1.7, z * 1.7, 2);
      c.copy(base).multiplyScalar(tone * speck);
      colors.push(c.r, c.g, c.b);
    }
    if (i > 0) {
      const row = i * cols;
      const prev = (i - 1) * cols;
      for (let k = 0; k < cols - 1; k++) {
        indices.push(prev + k, row + k, prev + k + 1, prev + k + 1, row + k, row + k + 1);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const road = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.96, metalness: 0.02, side: THREE.DoubleSide })
  );
  road.receiveShadow = true;
  group.add(road);

  if (opts.inlay) {
    const inlayPos: number[] = [];
    const inlayIdx: number[] = [];
    for (let i = 0; i <= opts.steps; i++) {
      const u = i / opts.steps;
      curve.getPoint(u, p);
      curve.getTangent(u, t);
      const sx = -t.z;
      const sz = t.x;
      const len = Math.hypot(sx, sz) || 1;
      for (const off of [-0.09, 0.09]) {
        const x = p.x + (sx / len) * off;
        const z = p.z + (sz / len) * off;
        inlayPos.push(x, opts.groundY(x, z) + 0.17, z);
      }
      if (i > 0) {
        const r = i * 2;
        const q = (i - 1) * 2;
        inlayIdx.push(q, r, q + 1, q + 1, r, r + 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(inlayPos, 3));
    g.setIndex(inlayIdx);
    g.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({
      color: opts.inlay.color,
      emissive: opts.inlay.emissive,
      emissiveIntensity: opts.inlay.intensity,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });
    const inlay = new THREE.Mesh(g, mat);
    inlay.userData.noShadow = true;
    group.add(inlay);
  }
  return group;
}
