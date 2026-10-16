import * as THREE from "three";
import { MergedBuilder, boxGeo, createKitMaterials, cylGeo, prismGeo, strutGeo } from "./detailKit";

const STATIONS = [
  { x: -21, z: -20, color: 0x38bdf8 },
  { x: 21, z: -20, color: 0xfbbf24 },
  { x: -21, z: 20, color: 0x4ade80 },
  { x: 21, z: 20, color: 0xf472b6 },
];

/**
 * 四座学习站：六边形石台 + 四柱凉亭（彩色帆布顶）+ 讲台与翻开的书 + 漂浮光球与光环。
 * 光球 / 光环保持独立网格供外部动画驱动。
 */
export function buildStudyStations(): THREE.Group {
  const root = new THREE.Group();
  root.name = "study-stations";
  const m = createKitMaterials();

  for (const s of STATIONS) {
    const kit = new MergedBuilder();
    const canvas = new THREE.MeshStandardMaterial({ color: s.color, roughness: 0.82, side: THREE.DoubleSide });
    canvas.fog = false;
    const cloth = new THREE.MeshStandardMaterial({ color: new THREE.Color(s.color).lerp(new THREE.Color(0xffffff), 0.55), roughness: 0.82, side: THREE.DoubleSide });
    cloth.fog = false;
    const { x, z } = s;

    // 台基：两层六边形 + 台面嵌环
    kit.add(prismGeo(3.7, 0.2, 0.025, 6), m.stoneDark, { x, y: 0.62, z });
    kit.add(prismGeo(3.3, 0.16, 0.02, 6), m.stone, { x, y: 0.82, z });
    kit.add(new THREE.TorusGeometry(2.6, 0.03, 5, 6), m.slate, { x, y: 1.0, z, rx: Math.PI / 2, rz: Math.PI / 6 });
    const top = 0.98;

    // 凉亭：四根柱 + 圈梁 + 四面坡布顶
    const r = 1.75;
    for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r]]) {
      kit.add(boxGeo(0.34, 0.12, 0.34, 0.03), m.stoneDark, { x: x + dx * 0.78, y: top + 0.06, z: z + dz * 0.78 });
      kit.add(cylGeo(0.075, 0.095, 2.3, 12), m.wood, { x: x + dx * 0.78, y: top + 1.27, z: z + dz * 0.78 });
    }
    const beamY = top + 2.42;
    for (const sz of [-1, 1]) kit.add(boxGeo(r * 1.56 + 0.3, 0.16, 0.14, 0.02), m.woodDark, { x, y: beamY, z: z + sz * r * 0.78 });
    for (const sx of [-1, 1]) kit.add(boxGeo(0.14, 0.16, r * 1.56 + 0.3, 0.02), m.woodDark, { x: x + sx * r * 0.78, y: beamY, z });
    const roof = new THREE.ConeGeometry(2.6, 0.95, 4, 1);
    kit.add(roof, canvas, { x, y: beamY + 0.5, z, ry: Math.PI / 4 });
    kit.add(new THREE.ConeGeometry(2.3, 0.78, 4, 1), cloth, { x, y: beamY + 0.42, z, ry: Math.PI / 4, sy: 0.96 });
    kit.add(new THREE.SphereGeometry(0.09, 8, 6), m.brass, { x, y: beamY + 1.02, z });
    // 讲台 + 翻开的书 + 小凳
    kit.add(cylGeo(0.14, 0.2, 1.0, 12), m.woodDark, { x, y: top + 0.5, z });
    kit.add(boxGeo(0.9, 0.06, 0.62, 0.02), m.wood, { x, y: top + 1.04, z, rx: -0.3 });
    kit.add(boxGeo(0.4, 0.03, 0.5, 0.01), m.paper, { x: x - 0.21, y: top + 1.09, z: z - 0.02, rx: -0.3, rz: 0.06 });
    kit.add(boxGeo(0.4, 0.03, 0.5, 0.01), m.paper, { x: x + 0.21, y: top + 1.09, z: z - 0.02, rx: -0.3, rz: -0.06 });
    for (const sx of [-1, 1]) {
      kit.add(boxGeo(0.7, 0.07, 0.34, 0.02), m.wood, { x: x + sx * 1.1, y: top + 0.42, z: z + 1.05 });
      kit.add(boxGeo(0.07, 0.4, 0.3, 0.012), m.woodDark, { x: x + sx * 1.1 - 0.28, y: top + 0.2, z: z + 1.05 });
      kit.add(boxGeo(0.07, 0.4, 0.3, 0.012), m.woodDark, { x: x + sx * 1.1 + 0.28, y: top + 0.2, z: z + 1.05 });
    }
    // 悬挂灯
    for (const sx of [-1, 1]) {
      kit.add(strutGeo([x + sx * 1.1, beamY - 0.08, z + 1.3], [x + sx * 1.1, beamY - 0.5, z + 1.3], 0.01, 4), m.steel);
      kit.add(cylGeo(0.1, 0.12, 0.22, 8), m.lampGlass, { x: x + sx * 1.1, y: beamY - 0.62, z: z + 1.3 });
    }
    kit.build(root, "study-station", { isLandscapeStage: true });

    const orbMat = new THREE.MeshStandardMaterial({ color: s.color, emissive: s.color, emissiveIntensity: 1.1, roughness: 0.2, metalness: 0.3 });
    orbMat.fog = false;
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.36, 2), orbMat);
    orb.position.set(x, top + 1.9, z);
    orb.userData.isLandscapeBeacon = true;
    root.add(orb);
    const ringMat = new THREE.MeshStandardMaterial({ color: s.color, emissive: s.color, emissiveIntensity: 0.7, roughness: 0.3, metalness: 0.4 });
    ringMat.fog = false;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.035, 8, 40), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, top + 1.9, z);
    ring.userData.isLandscapeRing = true;
    root.add(ring);
  }
  return root;
}

/**
 * 数字海岸的远景信号塔：四柱桁架塔（斜撑 + 横梁）、观景平台、扇区天线板、抛物面天线，
 * 塔间悬垂电缆。发光塔帽与数据环保持独立网格供动画驱动。
 */
export function buildSignalMasts(glow: THREE.MeshStandardMaterial, edge: THREE.MeshStandardMaterial): THREE.Group {
  const root = new THREE.Group();
  root.name = "signal-masts";
  const m = createKitMaterials();
  const towers: ReadonlyArray<readonly [number, number, number]> = [[-28, 35, 13], [0, 43, 18], [28, 35, 11]];
  const kit = new MergedBuilder();
  const tops: Array<[number, number, number]> = [];

  for (const [x, z, h] of towers) {
    kit.add(prismGeo(3.2, 0.5, 0.04, 8), m.stoneDark, { x, y: 0, z });
    kit.add(prismGeo(2.6, 0.3, 0.03, 8), m.stone, { x, y: 0.5, z });
    const baseY = 0.8;
    const rb = 1.9;
    const rt = 0.55;
    const legs: Array<[[number, number, number], [number, number, number]]> = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      legs.push([[x + Math.cos(a) * rb, baseY, z + Math.sin(a) * rb], [x + Math.cos(a) * rt, baseY + h, z + Math.sin(a) * rt]]);
      kit.add(strutGeo(legs[i][0], legs[i][1], 0.13, 8), m.steel);
      kit.add(boxGeo(0.5, 0.3, 0.5, 0.05), m.stoneDark, { x: legs[i][0][0], y: baseY + 0.15, z: legs[i][0][2] });
    }
    const at = (leg: number, t: number): [number, number, number] => [
      legs[leg][0][0] + (legs[leg][1][0] - legs[leg][0][0]) * t,
      legs[leg][0][1] + (legs[leg][1][1] - legs[leg][0][1]) * t,
      legs[leg][0][2] + (legs[leg][1][2] - legs[leg][0][2]) * t,
    ];
    const levels = Math.round(h / 1.6);
    for (let l = 0; l <= levels; l++) {
      const t = l / levels;
      for (let i = 0; i < 4; i++) {
        kit.add(strutGeo(at(i, t), at((i + 1) % 4, t), 0.05, 6), m.steel);
        if (l < levels) {
          kit.add(strutGeo(at(i, t), at((i + 1) % 4, t + 1 / levels), 0.035, 5), m.steel);
          kit.add(strutGeo(at((i + 1) % 4, t), at(i, t + 1 / levels), 0.035, 5), m.steel);
        }
      }
    }
    // 观景平台 + 栏杆（2/3 高度）
    const py = baseY + h * 0.66;
    const pr = rb + (rt - rb) * 0.66 + 0.55;
    kit.add(prismGeo(pr, 0.12, 0.015, 8), m.slate, { x, y: py, z });
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2;
      kit.add(strutGeo([x + Math.cos(a) * (pr - 0.05), py + 0.12, z + Math.sin(a) * (pr - 0.05)], [x + Math.cos(a) * (pr - 0.05), py + 0.62, z + Math.sin(a) * (pr - 0.05)], 0.02, 4), m.steel);
    }
    kit.add(new THREE.TorusGeometry(pr - 0.05, 0.025, 5, 32), m.steel, { x, y: py + 0.62, z, rx: Math.PI / 2 });
    // 扇区天线板（三面）+ 抛物面天线
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2 + 0.4;
      kit.add(boxGeo(0.35, 1.2, 0.1, 0.02), m.paper, { x: x + Math.cos(a) * (rt + 0.5), y: baseY + h * 0.86, z: z + Math.sin(a) * (rt + 0.5), ry: -a + Math.PI / 2 });
    }
    kit.add(new THREE.SphereGeometry(0.7, 20, 8, 0, Math.PI * 2, 0, Math.PI / 3), m.paper, { x: x + rt + 0.9, y: baseY + h * 0.74, z, rz: -Math.PI / 2 + 0.2 });
    kit.add(strutGeo([x + rt, baseY + h * 0.74, z], [x + rt + 0.55, baseY + h * 0.74, z], 0.06, 6), m.steel);
    // 塔顶避雷针 + 航空障碍灯
    kit.add(strutGeo([x, baseY + h, z], [x, baseY + h + 1.8, z], 0.04, 6), m.steel);
    kit.add(cylGeo(0.09, 0.14, 0.2, 8), m.brass, { x, y: baseY + h + 0.2, z });
    tops.push([x, baseY + h + 1.4, z]);
  }
  kit.build(root, "signal-mast", { isLandscapeStage: true });

  // 塔间悬垂电缆
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x2b3036, roughness: 0.6, metalness: 0.5 });
  cableMat.fog = false;
  const link = (a: [number, number, number], b: [number, number, number]): void => {
    const mid: [number, number, number] = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 1.6, (a[2] + b[2]) / 2];
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(...a), new THREE.Vector3(...mid), new THREE.Vector3(...b));
    const cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.04, 5, false), cableMat);
    cable.userData.isLandscapeRoute = true;
    root.add(cable);
  };
  const anchor = (i: number): [number, number, number] => [towers[i][0], 0.8 + towers[i][2] * 0.7, towers[i][1]];
  link(anchor(0), anchor(1));
  link(anchor(1), anchor(2));

  // 发光塔帽与数据环
  towers.forEach(([x, z, h], i) => {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 14), glow);
    cap.position.set(tops[i][0], tops[i][1] + 0.2, tops[i][2]);
    cap.userData.isLandscapeBeacon = true;
    root.add(cap);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.06, 6, 40), edge);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, 0.8 + h * 0.4, z);
    ring.userData.isLandscapeRing = true;
    root.add(ring);
  });
  return root;
}
