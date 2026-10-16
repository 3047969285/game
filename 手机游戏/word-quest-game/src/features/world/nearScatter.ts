import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { MergedBuilder, boxGeo, createKitMaterials, cylGeo, strutGeo } from "./detailKit";
import { seededRand, valueNoise } from "./utils";

/**
 * 近景环境细节：围绕单元入口的一圈乔木、针叶树、灌木、岩石、花丛、倒木 / 树桩、
 * 石板小径与路灯。全部用 InstancedMesh（或按材质合并），单个类型一个 draw call。
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

function organic(geo: THREE.BufferGeometry, amount: number, freq: number, seed: number): THREE.BufferGeometry {
  const welded = mergeVertices(geo, 1e-4);
  const p = welded.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = valueNoise(v.x * freq + seed, v.y * freq + v.z * freq * 0.7 + seed * 1.7);
    v.multiplyScalar(1 + (n - 0.5) * 2 * amount);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  welded.computeVertexNormals();
  return welded;
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

export function buildNearScatter(opts: NearScatterOptions): THREE.Group {
  const root = new THREE.Group();
  root.name = "near-scatter";
  const rand = seededRand(opts.seed ?? 4242);
  const d = opts.density;
  const blocked = (x: number, z: number, margin = 0): boolean => opts.avoid.some(([ax, az, r]) => Math.hypot(x - ax, z - az) < r + margin);
  const km = createKitMaterials();

  const std = (color: number, roughness = 0.9) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });
  const white = (roughness = 0.9) => std(0xffffff, roughness);

  // ── 共享几何
  const trunkGeo = cylGeo(0.16, 0.26, 1, 8);
  trunkGeo.translate(0, 0.5, 0);
  const lumpGeo = organic(new THREE.IcosahedronGeometry(1, 2), 0.16, 1.9, 3);
  const bushGeo = organic(new THREE.IcosahedronGeometry(1, 2), 0.22, 2.4, 11);
  const rockGeo = organic(new THREE.DodecahedronGeometry(1, 1), 0.28, 1.5, 7);
  const coneGeo = new THREE.ConeGeometry(1, 1, 9, 1);
  coneGeo.translate(0, 0.5, 0);
  const stemGeo = cylGeo(0.012, 0.014, 1, 4);
  stemGeo.translate(0, 0.5, 0);
  const headGeo = new THREE.SphereGeometry(0.06, 7, 5);
  const slabGeo = boxGeo(1.5, 0.12, 1.05, 0.03);
  const logGeo = cylGeo(0.3, 0.32, 1, 9);
  logGeo.rotateZ(Math.PI / 2);
  const stumpGeo = cylGeo(0.34, 0.42, 0.5, 9);

  const treeCount = Math.round(46 * d);
  const coniferCount = Math.round(26 * d);
  const bushCount = Math.round(70 * d);
  const rockCount = Math.round(40 * d);
  const flowerClusters = Math.round(34 * d);
  const logCount = Math.round(7 * d);

  const trunks = makeInst(trunkGeo, std(0x6b5238, 0.95), treeCount + 1, true);
  const lumps = makeInst(lumpGeo, white(0.92), treeCount * 4 + 1, true);
  const coniferTrunk = makeInst(trunkGeo, std(0x5a4332, 0.95), coniferCount + 1, true);
  const cones = makeInst(coneGeo, white(0.9), coniferCount * 3 + 1, true);
  const bushes = makeInst(bushGeo, white(0.94), bushCount + 1, true);
  const rocks = makeInst(rockGeo, white(0.95), rockCount + 1, true);
  const stems = makeInst(stemGeo, std(0x4e7a3c, 0.9), flowerClusters * 14 + 1, false);
  const heads = makeInst(headGeo, white(0.7), flowerClusters * 14 + 1, false);
  const logs = makeInst(logGeo, std(0x6a5440, 0.95), logCount + 1, true);
  const stumps = makeInst(stumpGeo, std(0x7a6247, 0.95), logCount + 1, true);
  const slabs = makeInst(slabGeo, white(0.92), 40, false);

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

  const leafTones = [0x4f7f3f, 0x5f9150, 0x6b9a4d, 0x3f6f45, 0x7ba35a, 0x8fae4f];
  // ── 阔叶树：树干 + 4 团不规则树冠
  for (let i = 0; i < treeCount; i++) {
    const p = place(18, 56, 3.5);
    if (!p) continue;
    const [x, z] = p;
    const y = opts.groundY(x, z);
    const s = 0.8 + rand() * 0.75;
    const yaw = rand() * Math.PI * 2;
    trunks.push(compose(x, y - 0.1, z, s, 3.6 * s, s, (rand() - 0.5) * 0.08, yaw, (rand() - 0.5) * 0.08));
    const tone = leafTones[Math.floor(rand() * leafTones.length)];
    const offsets: Array<[number, number, number, number]> = [
      [0, 4.7, 0, 1.9],
      [1.1, 4.2, 0.5, 1.45],
      [-0.9, 4.35, -0.7, 1.5],
      [0.1, 5.7, -0.2, 1.3],
    ];
    for (const [ox, oy, oz, r] of offsets) {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const wx = x + (ox * cy + oz * sy) * s;
      const wz = z + (-ox * sy + oz * cy) * s;
      C.setHex(tone).offsetHSL((rand() - 0.5) * 0.03, 0, (rand() - 0.5) * 0.08);
      lumps.push(compose(wx, y + oy * s, wz, r * s * 1.05, r * s * 0.82, r * s, 0, rand() * 6, 0), C.clone());
    }
  }
  // ── 针叶树：三层锥
  for (let i = 0; i < coniferCount; i++) {
    const p = place(20, 60, 3);
    if (!p) continue;
    const [x, z] = p;
    const y = opts.groundY(x, z);
    const s = 0.9 + rand() * 0.8;
    coniferTrunk.push(compose(x, y - 0.1, z, s * 0.8, 1.6 * s, s * 0.8));
    const tone = rand() > 0.5 ? 0x2f5f45 : 0x3b6b4a;
    for (let k = 0; k < 3; k++) {
      C.setHex(tone).offsetHSL(0, 0, (rand() - 0.5) * 0.05 + k * 0.012);
      cones.push(compose(x, y + (1.2 + k * 1.35) * s, z, (2.0 - k * 0.45) * s, 2.3 * s, (2.0 - k * 0.45) * s, 0, rand() * 6, 0), C.clone());
    }
  }
  // ── 灌木
  const bushTones = [0x4a7a3c, 0x5c8c48, 0x3d6b3a, 0x6b9446, 0x7c8f3f];
  for (let i = 0; i < bushCount; i++) {
    const p = place(16.5, 46, 1.8);
    if (!p) continue;
    const [x, z] = p;
    const s = 0.5 + rand() * 0.9;
    C.setHex(bushTones[Math.floor(rand() * bushTones.length)]).offsetHSL(0, 0, (rand() - 0.5) * 0.06);
    bushes.push(compose(x, opts.groundY(x, z) + 0.28 * s, z, s * 1.25, s * 0.85, s, 0, rand() * 6, 0), C.clone());
  }
  // ── 岩石（大小簇）
  for (let i = 0; i < rockCount; i++) {
    const p = place(16.5, 52, 1.5);
    if (!p) continue;
    const [x, z] = p;
    const s = 0.3 + Math.pow(rand(), 2) * 1.5;
    C.setHex(0x8a8a84).offsetHSL(0, (rand() - 0.5) * 0.04, (rand() - 0.5) * 0.12);
    rocks.push(compose(x, opts.groundY(x, z) + 0.18 * s, z, s * 1.2, s * 0.75, s, (rand() - 0.5) * 0.3, rand() * 6, (rand() - 0.5) * 0.3), C.clone());
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
  // ── 石板小径：从入口门楼向 +Z 蜿蜒而去
  for (let i = 0; i < 38; i++) {
    const t = i / 37;
    const z = opts.centerZ + 15.2 + t * 38;
    const x = opts.centerX + Math.sin(t * 5.2) * 3.2 * Math.min(1, t * 2.2);
    if (blocked(x, z, -1.5)) continue;
    C.setHex(i % 2 ? 0x9b9a92 : 0x86877f).offsetHSL(0, 0, (rand() - 0.5) * 0.04);
    const dz = 38 / 37;
    const dx = Math.cos(t * 5.2) * 5.2 * 3.2 * Math.min(1, t * 2.2) / 37;
    slabs.push(compose(x, opts.groundY(x, z) + 0.05, z, 0.85 + rand() * 0.2, 1, 0.85 + rand() * 0.2, 0, Math.atan2(dx, dz) + (rand() - 0.5) * 0.15, 0), C.clone());
  }

  for (const inst of [trunks, lumps, coniferTrunk, cones, bushes, rocks, stems, heads, logs, stumps, slabs]) {
    inst.mesh.count = inst.count;
    inst.mesh.instanceMatrix.needsUpdate = true;
    if (inst.mesh.instanceColor) inst.mesh.instanceColor.needsUpdate = true;
    inst.mesh.computeBoundingSphere();
    if (inst.count > 0) root.add(inst.mesh);
  }

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

  return root;
}
