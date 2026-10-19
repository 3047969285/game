import * as THREE from "three";
import { MergedBuilder, createKitMaterials, cylGeo, strutGeo } from "./detailKit";
import { buildFlagstonePaths } from "./flagstonePath";
import { seededRand } from "./utils";
import { buildVegetationField } from "./vegetationField";
import { VARIANTS_PER_KIND, type VegetationInstance } from "./vegetationPlan";

/**
 * 近景环境细节：围绕单元入口的一圈乔木、针叶树、灌木、岩石（走 vegetationField 的 BatchedMesh，
 * 与主世界植被同一套写实模型 / 材质）、花丛、倒木 / 树桩（InstancedMesh）、
 * 不规则石板小径（合并成一个网格）与路灯（合并）。
 */

export interface NearScatterOptions {
  /** 世界坐标中心（单元圣所） */
  centerX: number;
  centerZ: number;
  groundY: (x: number, z: number) => number;
  /** 需要避开的圆形区域 [x, z, 半径] */
  avoid: ReadonlyArray<readonly [number, number, number]>;
  /** 密度档位 0.5 / 0.75 / 1 */
  density: number;
  seed?: number;
}

interface Inst {
  mesh: THREE.InstancedMesh;
  count: number;
}

function makeInst(geometry: THREE.BufferGeometry, material: THREE.Material, max: number, shadow: boolean): Inst & { push: (m: THREE.Matrix4, color?: THREE.Color) => void } {
  const mesh = new THREE.InstancedMesh(geometry, material, max);
  mesh.castShadow = shadow;
  mesh.receiveShadow = true;
  mesh.userData.nearScatter = true;
  const state = { count: 0 };
  return {
    mesh,
    get count() {
      return state.count;
    },
    push(m: THREE.Matrix4, color?: THREE.Color) {
      if (state.count >= max) return;
      mesh.setMatrixAt(state.count, m);
      if (color) mesh.setColorAt(state.count, color);
      state.count++;
    },
  };
}

const M = new THREE.Matrix4();
const Q = new THREE.Quaternion();
const E = new THREE.Euler();
const P = new THREE.Vector3();
const S = new THREE.Vector3();
const C = new THREE.Color();

function compose(x: number, y: number, z: number, sx: number, sy: number, sz: number, rx = 0, ry = 0, rz = 0): THREE.Matrix4 {
  E.set(rx, ry, rz);
  Q.setFromEuler(E);
  P.set(x, y, z);
  S.set(sx, sy, sz);
  return M.compose(P, Q, S);
}

export interface NearScatter {
  group: THREE.Group;
  /** 每帧调用：植被按相机距离切换精细 / 简化几何 */
  update(camera: THREE.Camera): void;
  /** 释放植被 BatchedMesh 的几何（共享材质不释放）并移出场景；其余网格仍由 removeGroup / disposeGroup 释放 */
  dispose(): void;
}

export function buildNearScatter(opts: NearScatterOptions): NearScatter {
  const root = new THREE.Group();
  root.name = "near-scatter";
  const rand = seededRand(opts.seed ?? 4242);
  const d = opts.density;
  const blocked = (x: number, z: number, margin = 0): boolean => opts.avoid.some(([ax, az, r]) => Math.hypot(x - ax, z - az) < r + margin);
  const km = createKitMaterials();

  const std = (color: number, roughness = 0.9) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });
  const white = (roughness = 0.9) => std(0xffffff, roughness);

  // ── 共享几何
  const stemGeo = cylGeo(0.012, 0.014, 1, 4);
  stemGeo.translate(0, 0.5, 0);
  const headGeo = new THREE.SphereGeometry(0.06, 7, 5);
  const logGeo = cylGeo(0.3, 0.32, 1, 9);
  logGeo.rotateZ(Math.PI / 2);
  const stumpGeo = cylGeo(0.34, 0.42, 0.5, 9);

  const vegInstances: VegetationInstance[] = [];
  const variantOf = (): number => Math.min(VARIANTS_PER_KIND - 1, Math.floor(rand() * VARIANTS_PER_KIND));

  const treeCount = Math.round(46 * d);
  const coniferCount = Math.round(26 * d);
  const bushCount = Math.round(70 * d);
  const rockCount = Math.round(40 * d);
  const flowerClusters = Math.round(34 * d);
  const logCount = Math.round(7 * d);

  const stems = makeInst(stemGeo, std(0x4e7a3c, 0.9), flowerClusters * 14 + 1, false);
  const heads = makeInst(headGeo, white(0.7), flowerClusters * 14 + 1, false);
  const logs = makeInst(logGeo, std(0x6a5440, 0.95), logCount + 1, true);
  const stumps = makeInst(stumpGeo, std(0x7a6247, 0.95), logCount + 1, true);

  const place = (minR: number, maxR: number, margin: number): [number, number] | null => {
    for (let attempt = 0; attempt < 14; attempt++) {
      const a = rand() * Math.PI * 2;
      const r = minR + Math.sqrt(rand()) * (maxR - minR);
      const x = opts.centerX + Math.cos(a) * r;
      const z = opts.centerZ + Math.sin(a) * r;
      if (!blocked(x, z, margin)) return [x, z];
    }
    return null;
  };

  // ── 阔叶树
  for (let i = 0; i < treeCount; i++) {
    const p = place(18, 56, 3.5);
    if (!p) continue;
    const [x, z] = p;
    vegInstances.push({ kind: "broadleaf", variant: variantOf(), x, y: opts.groundY(x, z), z, scale: 0.85 + rand() * 0.65, rotY: rand() * Math.PI * 2 });
  }
  // ── 针叶树
  for (let i = 0; i < coniferCount; i++) {
    const p = place(20, 60, 3);
    if (!p) continue;
    const [x, z] = p;
    vegInstances.push({ kind: "pine", variant: variantOf(), x, y: opts.groundY(x, z), z, scale: 0.9 + rand() * 0.7, rotY: rand() * Math.PI * 2 });
  }
  // ── 灌木
  for (let i = 0; i < bushCount; i++) {
    const p = place(16.5, 46, 1.8);
    if (!p) continue;
    const [x, z] = p;
    vegInstances.push({ kind: "bush", variant: variantOf(), x, y: opts.groundY(x, z), z, scale: 0.7 + rand() * 0.8, rotY: rand() * Math.PI * 2 });
  }
  // ── 岩石（大小簇）：底面落在 y=0，略埋入地面
  for (let i = 0; i < rockCount; i++) {
    const p = place(16.5, 52, 1.5);
    if (!p) continue;
    const [x, z] = p;
    const scale = Math.min(2.2, (0.3 + Math.pow(rand(), 2) * 1.5) * 1.6);
    vegInstances.push({ kind: "rock", variant: variantOf(), x, y: opts.groundY(x, z) - 0.04 * scale, z, scale, rotY: rand() * Math.PI * 2 });
  }
  // ── 花丛
  const flowerTones = [0xf2c14e, 0xe8707a, 0xf4f1de, 0xb18ae0, 0xff9e5e, 0x7cc0e8];
  for (let i = 0; i < flowerClusters; i++) {
    const p = place(16.5, 38, 1.2);
    if (!p) continue;
    const [cx, cz] = p;
    const tone = flowerTones[Math.floor(rand() * flowerTones.length)];
    const n = 8 + Math.floor(rand() * 6);
    for (let k = 0; k < n; k++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * 1.1;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      const y = opts.groundY(x, z);
      const h = 0.35 + rand() * 0.3;
      stems.push(compose(x, y, z, 1, h, 1, (rand() - 0.5) * 0.3, 0, (rand() - 0.5) * 0.3));
      C.setHex(tone).offsetHSL((rand() - 0.5) * 0.03, 0, (rand() - 0.5) * 0.08);
      heads.push(compose(x, y + h, z, 1, 0.7, 1), C.clone());
    }
  }
  // ── 倒木 + 树桩
  for (let i = 0; i < logCount; i++) {
    const p = place(20, 50, 2);
    if (!p) continue;
    const [x, z] = p;
    const y = opts.groundY(x, z);
    const len = 1.6 + rand() * 1.6;
    logs.push(compose(x, y + 0.28, z, len, 1, 1, 0, rand() * Math.PI, (rand() - 0.5) * 0.12));
    const q = place(20, 50, 2);
    if (q) stumps.push(compose(q[0], opts.groundY(q[0], q[1]) + 0.24, q[1], 1, 0.8 + rand() * 0.6, 1));
  }
  // ── 石板小径：从入口门楼向 +Z 蜿蜒而去；避让区内的部分断开，每段一条不规则石板路（合并成一个网格）
  const pathAt = (t: number): { x: number; z: number } => ({
    x: opts.centerX + Math.sin(t * 5.2) * 3.2 * Math.min(1, t * 2.2),
    z: opts.centerZ + 15.2 + t * 38,
  });
  const runs: Array<Array<{ x: number; z: number }>> = [];
  let run: Array<{ x: number; z: number }> = [];
  const sampleN = 160;
  for (let i = 0; i <= sampleN; i++) {
    const pt = pathAt(i / sampleN);
    if (blocked(pt.x, pt.z, -1.5)) {
      if (run.length > 1) runs.push(run);
      run = [];
    } else {
      run.push(pt);
    }
  }
  if (run.length > 1) runs.push(run);
  if (runs.length > 0) {
    const pathGroup = buildFlagstonePaths(runs, {
      width: 1.6,
      groundY: opts.groundY,
      seed: (opts.seed ?? 4242) + 5,
      quality: d >= 1 ? "high" : d >= 0.75 ? "med" : "low",
      lift: () => 0.06,
    });
    pathGroup.name = "near-flagstones";
    root.add(pathGroup);
  }

  for (const inst of [stems, heads, logs, stumps]) {
    inst.mesh.count = inst.count;
    inst.mesh.instanceMatrix.needsUpdate = true;
    if (inst.mesh.instanceColor) inst.mesh.instanceColor.needsUpdate = true;
    inst.mesh.computeBoundingSphere();
    if (inst.count > 0) root.add(inst.mesh);
  }

  // ── 植被：BatchedMesh（按材质合并）；入口外圈距相机多半在 LOD 距离之内
  const field = buildVegetationField(vegInstances, { lodDistance: 45, castShadow: d > 0.5 });
  root.add(field.group);

  // ── 路灯：沿小径每隔一段一盏（合并）
  const kit = new MergedBuilder();
  for (let i = 0; i < 6; i++) {
    const t = (i + 0.5) / 6;
    const z = opts.centerZ + 15.2 + t * 34;
    const side = i % 2 ? 1 : -1;
    const x = opts.centerX + Math.sin(t * 5.2) * 3.2 * Math.min(1, t * 2.2) + side * 2.4;
    if (blocked(x, z, -1)) continue;
    const y = opts.groundY(x, z);
    kit.add(cylGeo(0.14, 0.18, 0.18, 8), km.slate, { x, y: y + 0.09, z });
    kit.add(strutGeo([x, y, z], [x, y + 3.4, z], 0.05, 6), km.slate);
    kit.add(strutGeo([x, y + 3.4, z], [x - side * 0.5, y + 3.55, z], 0.035, 5), km.slate);
    kit.add(new THREE.ConeGeometry(0.28, 0.2, 8), km.slate, { x: x - side * 0.55, y: y + 3.52, z });
    kit.add(cylGeo(0.14, 0.2, 0.36, 8), km.lampGlass, { x: x - side * 0.55, y: y + 3.3, z });
  }
  kit.build(root, "near-lamps", {});

  return {
    group: root,
    update: (camera) => field.update(camera),
    dispose: () => field.dispose(),
  };
}
