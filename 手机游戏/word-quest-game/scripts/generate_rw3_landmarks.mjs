/**
 * 生成读写3 六单元 GLB 地标（无需商业 CAD）
 * 运行: npm run gen:models
 */

/** Node 环境补齐 GLTFExporter 依赖 */
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class FileReader {
    result = null;
    onload = null;
    onloadend = null;
    onerror = null;
    readAsArrayBuffer(blob) {
      blob
        .arrayBuffer()
        .then((ab) => {
          this.result = ab;
          const ev = { target: this };
          this.onload?.(ev);
          this.onloadend?.(ev);
        })
        .catch((e) => this.onerror?.(e));
    }
  };
}

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "models", "rw3");

const stone = (color) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.12 });
const glass = (color, emissive = 0.22) =>
  new THREE.MeshPhysicalMaterial({
    color,
    emissive: new THREE.Color(color),
    emissiveIntensity: emissive,
    metalness: 0.35,
    roughness: 0.12,
    transparent: true,
    opacity: 0.88,
  });

function addCrystal(group, y = 5.2, color = 0x60a5fa, scale = 1, shard = false) {
  const geometry = shard ? new THREE.OctahedronGeometry(0.55, 0) : new THREE.IcosahedronGeometry(0.55, 1);
  const crystal = new THREE.Mesh(geometry, glass(color, 0.45));
  crystal.name = "Crystal";
  crystal.scale.set(scale, shard ? scale * 1.7 : scale, scale);
  crystal.position.y = y;
  crystal.castShadow = true;
  group.add(crystal);
  return crystal;
}

function basePlatform(group, radius = 2.2, color = 0x4b5563) {
  const p = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.15, 0.35, 32), stone(color));
  p.position.y = 0.175;
  p.receiveShadow = true;
  group.add(p);

  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.2 + (i % 3) * 0.05, 0),
      stone(0x5b6470 + (i % 2) * 0x0a0a0a)
    );
    rock.position.set(Math.cos(a) * (radius + 0.62), 0.3 + (i % 2) * 0.06, Math.sin(a) * (radius + 0.62));
    rock.rotation.set(a * 0.4, a, a * 0.2);
    rock.castShadow = true;
    group.add(rock);
  }

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius + 0.35, 0.05, 8, 48),
    new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.55, metalness: 0.25 })
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.36;
  group.add(rim);
}

/** 带倒角的八边形棱柱（底面在 y=0），平面朝向坐标轴 */
function octPrism(radius, height, bevel, material, sides = 8) {
  const shape = new THREE.Shape();
  for (let i = 0; i < sides; i++) {
    const a = ((i + 0.5) / sides) * Math.PI * 2;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.001, height - bevel * 2),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, bevel, 0);
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function place(mesh, x, y, z) {
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** 圆角方块：宽 w 高 h 深 d，圆角 r */
function rbox(w, h, d, r, material) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 1, r), material);
}

/**
 * 按材质合并几何：把数百个零散网格烘焙成每种材质一个网格，
 * 既减小 GLB 体积，也减少游戏里的 draw call。名为 Crystal 的可点击网格保持独立。
 */
function bakeByMaterial(group) {
  group.updateMatrixWorld(true);
  const buckets = new Map();
  const meshes = [];
  group.traverse((o) => {
    if (o.isMesh && o.name !== "Crystal") meshes.push(o);
  });
  for (const mesh of meshes) {
    const geo = mesh.geometry.clone();
    geo.deleteAttribute("uv");
    geo.applyMatrix4(mesh.matrixWorld);
    const welded = geo.index ? geo : mergeVertices(geo, 1e-4);
    const bucket = buckets.get(mesh.material) ?? { material: mesh.material, geos: [] };
    bucket.geos.push(welded);
    buckets.set(mesh.material, bucket);
    mesh.parent.remove(mesh);
    mesh.geometry.dispose();
  }
  let n = 0;
  for (const { material, geos } of buckets.values()) {
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, material);
    mesh.name = `${group.name}_part${n++}`;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
}

/** 两点之间的细杆（栏杆、桁架、拉索） */
function strut(a, b, radius, material, radial = 6) {
  const from = new THREE.Vector3(...a);
  const to = new THREE.Vector3(...b);
  const dir = to.clone().sub(from);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, dir.length(), radial), material);
  mesh.position.copy(from).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.castShadow = true;
  return mesh;
}

/** 方锥台（四棱台），底宽 wb、顶宽 wt */
function squareFrustum(wb, wt, h, material) {
  const geo = new THREE.CylinderGeometry(wt / Math.SQRT2, wb / Math.SQRT2, h, 4, 1);
  geo.rotateY(Math.PI / 4);
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Unit1 信号塔：石砌基座 + 玻璃幕墙塔身 + 观景台 + 铜顶 + 桁架天线与抛物面天线 */
function buildUnit01() {
  const g = new THREE.Group();
  g.name = "rw3_unit01_signal_tower";

  const limestone = new THREE.MeshStandardMaterial({ color: 0xd2cabb, roughness: 0.9, metalness: 0.02 });
  const limestoneDark = new THREE.MeshStandardMaterial({ color: 0xa79f90, roughness: 0.92, metalness: 0.02 });
  const slate = new THREE.MeshStandardMaterial({ color: 0x5d646b, roughness: 0.88, metalness: 0.05 });
  const paving = new THREE.MeshStandardMaterial({ color: 0x8b8f92, roughness: 0.95, metalness: 0.02 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x8e99a4, roughness: 0.38, metalness: 0.85 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x2f353b, roughness: 0.5, metalness: 0.7 });
  const copper = new THREE.MeshStandardMaterial({ color: 0x4f9a8c, roughness: 0.52, metalness: 0.55 });
  const wallGlass = new THREE.MeshPhysicalMaterial({
    color: 0x1f4a5c,
    roughness: 0.06,
    metalness: 0.1,
    transparent: true,
    opacity: 0.78,
    clearcoat: 1,
  });
  const litWindow = new THREE.MeshStandardMaterial({
    color: 0xffd9a0,
    emissive: 0xffb552,
    emissiveIntensity: 0.55,
    roughness: 0.35,
  });
  const doorWood = new THREE.MeshStandardMaterial({ color: 0x4e3524, roughness: 0.7, metalness: 0.05 });
  const leaf = new THREE.MeshStandardMaterial({ color: 0x3f6f45, roughness: 0.95 });
  const leafLight = new THREE.MeshStandardMaterial({ color: 0x5d8f4e, roughness: 0.95 });
  const soil = new THREE.MeshStandardMaterial({ color: 0x4a3b2c, roughness: 1 });
  const lampGlass = new THREE.MeshStandardMaterial({
    color: 0xfff0c8,
    emissive: 0xffc15a,
    emissiveIntensity: 0.9,
    roughness: 0.3,
  });
  const signal = new THREE.MeshStandardMaterial({
    color: 0x9ed8ff,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.9,
    roughness: 0.25,
    metalness: 0.4,
  });

  // ── 三层八边形台基（倒角）
  g.add(octPrism(3.1, 0.14, 0.02, limestoneDark));
  g.add(place(octPrism(2.72, 0.14, 0.02, limestone), 0, 0.14, 0));
  g.add(place(octPrism(2.3, 0.16, 0.02, limestone), 0, 0.28, 0));
  const deckTop = 0.44;

  // 铺地：台面上的同心嵌环 + 放射分缝
  for (const [r, w] of [[1.95, 0.025], [1.55, 0.02]]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, w, 4, 64), slate);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = deckTop + 0.012;
    g.add(ring);
  }
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const seam = strut(
      [Math.cos(a) * 1.0, deckTop + 0.012, Math.sin(a) * 1.0],
      [Math.cos(a) * 2.1, deckTop + 0.012, Math.sin(a) * 2.1],
      0.012,
      slate,
      4
    );
    seam.castShadow = false;
    g.add(seam);
  }

  // 入口台阶（朝 +Z）
  for (let i = 0; i < 3; i++) {
    const stepH = 0.06 * (3 - i);
    g.add(place(rbox(1.3 - i * 0.14, stepH, 0.3, 0.015, limestone), 0, deckTop + stepH / 2, 1.1 + i * 0.26));
  }

  // 低矮花坛 + 灌木（台基四角 45° 方向）与路灯
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i / 4) * Math.PI * 2;
    const cx = Math.cos(a) * 2.45;
    const cz = Math.sin(a) * 2.45;
    const bed = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.2, 14), limestone);
    g.add(place(bed, cx, deckTop + 0.1, cz));
    g.add(place(new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.04, 14), soil), cx, deckTop + 0.2, cz));
    for (let k = 0; k < 5; k++) {
      const b = (k / 5) * Math.PI * 2 + i;
      const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15 + (k % 2) * 0.04, 1), k % 2 ? leaf : leafLight);
      g.add(place(bush, cx + Math.cos(b) * 0.17, deckTop + 0.32 + (k % 3) * 0.03, cz + Math.sin(b) * 0.17));
    }

    // 路灯：灯杆在花坛之间，沿径向外侧
    const lampA = (i / 4) * Math.PI * 2;
    const lx = Math.cos(lampA) * 2.62;
    const lz = Math.sin(lampA) * 2.62;
    g.add(place(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.1, 10), darkSteel), lx, deckTop + 0.05, lz));
    g.add(place(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.04, 1.1, 8), darkSteel), lx, deckTop + 0.6, lz));
    g.add(place(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.05, 0.16, 8), lampGlass), lx, deckTop + 1.24, lz));
    g.add(place(new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.09, 8), darkSteel), lx, deckTop + 1.38, lz));
  }

  // ── 石砌塔基（方锥台，微收分）
  const baseH = 1.0;
  g.add(place(squareFrustum(1.95, 1.65, baseH, limestone), 0, deckTop + baseH / 2, 0));
  // 勒脚（底部深色石脚）
  g.add(place(rbox(2.0, 0.14, 2.0, 0.03, limestoneDark), 0, deckTop + 0.07, 0));
  // 石砌水平缝（浅色线条的凸出带）
  for (let i = 1; i < 6; i++) {
    const t = i / 6;
    const w = 1.95 - (1.95 - 1.65) * t + 0.05;
    g.add(place(rbox(w, 0.018, w, 0.004, limestoneDark), 0, deckTop + baseH * t, 0));
  }
  // 入口拱门：深色门洞 + 拱 + 门扇 + 门环
  const doorZ = 0.92;
  g.add(place(rbox(0.52, 0.64, 0.06, 0.01, slate), 0, deckTop + 0.4, doorZ));
  const arch = new THREE.Mesh(
    new THREE.CircleGeometry(0.26, 20, 0, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0x5d646b, roughness: 0.88, side: THREE.DoubleSide })
  );
  g.add(place(arch, 0, deckTop + 0.72, doorZ + 0.034));
  g.add(place(rbox(0.4, 0.58, 0.04, 0.008, doorWood), 0, deckTop + 0.36, doorZ + 0.04));
  g.add(place(new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.006, 6, 12), steel), 0.09, deckTop + 0.34, doorZ + 0.07));
  // 门楣石
  g.add(place(rbox(0.74, 0.07, 0.1, 0.015, limestoneDark), 0, deckTop + 0.88, doorZ));

  // 腰线（塔基与玻璃塔身之间的出挑线脚）
  const midY = deckTop + baseH;
  g.add(place(rbox(1.8, 0.1, 1.8, 0.025, limestoneDark), 0, midY + 0.02, 0));

  // ── 玻璃幕墙塔身（4 面窗 + 角柱 + 横梁 + 竖框）
  const shaftW = 1.5;
  const shaftH = 2.0;
  const shaftBase = midY + 0.07;
  g.add(place(rbox(shaftW - 0.04, shaftH, shaftW - 0.04, 0.01, wallGlass), 0, shaftBase + shaftH / 2, 0));
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      g.add(place(rbox(0.16, shaftH, 0.16, 0.03, limestone), sx * shaftW * 0.5, shaftBase + shaftH / 2, sz * shaftW * 0.5));
    }
  }
  const floors = 5;
  for (let i = 0; i <= floors; i++) {
    const y = shaftBase + (shaftH * i) / floors;
    g.add(place(rbox(shaftW + 0.02, 0.05, shaftW + 0.02, 0.01, i === 0 || i === floors ? limestoneDark : steel), 0, y, 0));
  }
  // 竖向窗框 + 点亮的楼层窗（部分格子亮灯）
  const mullions = [-0.38, 0, 0.38];
  for (const face of [0, 1, 2, 3]) {
    const holder = new THREE.Group();
    holder.rotation.y = (face * Math.PI) / 2;
    for (const mx of mullions) {
      const m = rbox(0.03, shaftH, 0.04, 0.008, steel);
      holder.add(place(m, mx * 0.62, shaftBase + shaftH / 2, shaftW * 0.5 - 0.005));
    }
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < 4; c++) {
        const lit = (f * 5 + c * 3 + face * 7) % 4 === 0;
        if (!lit) continue;
        const cx = (c - 1.5) * 0.34;
        const win = rbox(0.24, 0.26, 0.015, 0.004, litWindow);
        win.receiveShadow = false;
        holder.add(place(win, cx, shaftBase + (shaftH * (f + 0.5)) / floors, shaftW * 0.5 - 0.012));
      }
    }
    g.add(holder);
  }

  // ── 檐口：出挑挑檐 + 齿饰
  const cornY = shaftBase + shaftH + 0.03;
  g.add(place(rbox(1.92, 0.12, 1.92, 0.03, limestone), 0, cornY, 0));
  g.add(place(rbox(2.0, 0.05, 2.0, 0.015, limestoneDark), 0, cornY + 0.085, 0));
  for (let side = 0; side < 4; side++) {
    const holder = new THREE.Group();
    holder.rotation.y = (side * Math.PI) / 2;
    for (let i = 0; i < 9; i++) {
      const dent = rbox(0.07, 0.07, 0.06, 0.008, limestoneDark);
      holder.add(place(dent, -0.84 + i * 0.21, cornY - 0.095, 0.93));
    }
    g.add(holder);
  }

  // ── 观景台：八边形挑台 + 栏杆
  const balconyY = cornY + 0.12;
  g.add(place(octPrism(1.28, 0.09, 0.015, limestone), 0, balconyY, 0));
  const railR = 1.2;
  const railTop = balconyY + 0.09 + 0.26;
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const x = Math.cos(a) * railR;
    const z = Math.sin(a) * railR;
    g.add(strut([x, balconyY + 0.09, z], [x, railTop, z], 0.012, steel, 5));
  }
  const handrail = new THREE.Mesh(new THREE.TorusGeometry(railR, 0.016, 6, 48), steel);
  handrail.rotation.x = Math.PI / 2;
  handrail.position.y = railTop;
  g.add(handrail);
  const lowRail = new THREE.Mesh(new THREE.TorusGeometry(railR, 0.009, 5, 48), steel);
  lowRail.rotation.x = Math.PI / 2;
  lowRail.position.y = balconyY + 0.18;
  g.add(lowRail);

  // ── 灯室：八角玻璃 + 角柱 + 铜顶
  const lanternY = balconyY + 0.09;
  const lanternH = 0.62;
  g.add(place(octPrism(0.78, lanternH, 0.01, wallGlass), 0, lanternY, 0));
  for (let i = 0; i < 8; i++) {
    const a = ((i + 0.5) / 8) * Math.PI * 2;
    const r = 0.8;
    g.add(strut([Math.cos(a) * r, lanternY, Math.sin(a) * r], [Math.cos(a) * r, lanternY + lanternH, Math.sin(a) * r], 0.026, darkSteel, 6));
  }
  g.add(place(octPrism(0.9, 0.06, 0.012, darkSteel), 0, lanternY + lanternH, 0));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.98, 0.52, 8, 1), copper);
  roof.rotation.y = Math.PI / 8;
  g.add(place(roof, 0, lanternY + lanternH + 0.06 + 0.26, 0));
  const roofRing = new THREE.Mesh(new THREE.TorusGeometry(0.93, 0.025, 6, 40), steel);
  roofRing.rotation.x = Math.PI / 2;
  g.add(place(roofRing, 0, lanternY + lanternH + 0.07, 0));

  // ── 桁架天线（四柱 + 横撑 + 斜撑）
  const mastBase = lanternY + lanternH + 0.06 + 0.5;
  const mastH = 1.35;
  const legs = [];
  const rb = 0.22;
  const rt = 0.07;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    legs.push([
      [Math.cos(a) * rb, mastBase, Math.sin(a) * rb],
      [Math.cos(a) * rt, mastBase + mastH, Math.sin(a) * rt],
    ]);
    g.add(strut(legs[i][0], legs[i][1], 0.016, steel, 6));
  }
  const levels = 5;
  const at = (leg, t) => [
    legs[leg][0][0] + (legs[leg][1][0] - legs[leg][0][0]) * t,
    legs[leg][0][1] + (legs[leg][1][1] - legs[leg][0][1]) * t,
    legs[leg][0][2] + (legs[leg][1][2] - legs[leg][0][2]) * t,
  ];
  for (let l = 0; l <= levels; l++) {
    const t = l / levels;
    for (let i = 0; i < 4; i++) {
      g.add(strut(at(i, t), at((i + 1) % 4, t), 0.009, steel, 4));
      if (l < levels) {
        g.add(strut(at(i, t), at((i + 1) % 4, t + 1 / levels), 0.007, steel, 4));
      }
    }
  }
  // 抛物面天线（侧挂）+ 馈源
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xe6e9ec,
    roughness: 0.35,
    metalness: 0.55,
    side: THREE.DoubleSide,
  });
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 10, 0, Math.PI * 2, 0, Math.PI / 3.1), dishMat);
  dish.rotation.set(Math.PI / 2 + 0.35, 0, -Math.PI / 2 + 0.1);
  dish.position.set(0.32, mastBase + mastH * 0.52, 0);
  dish.castShadow = true;
  g.add(dish);
  g.add(strut([0.32, mastBase + mastH * 0.52, 0], [0.12, mastBase + mastH * 0.52, 0], 0.018, steel));
  g.add(strut([0.32 + 0.26, mastBase + mastH * 0.52 + 0.1, 0], [0.32 + 0.02, mastBase + mastH * 0.52, 0], 0.006, steel, 4));
  g.add(place(new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6), darkSteel), 0.32 + 0.26, mastBase + mastH * 0.52 + 0.1, 0));
  // 小型扇区天线板（对向）
  for (const s of [-1, 1]) {
    g.add(place(rbox(0.05, 0.3, 0.04, 0.008, new THREE.MeshStandardMaterial({ color: 0xd8dde2, roughness: 0.5, metalness: 0.3 })), s * 0.17, mastBase + mastH * 0.82, s * 0.0));
  }

  // 避雷针 + 发光信号环
  g.add(strut([0, mastBase + mastH, 0], [0, mastBase + mastH + 0.55, 0], 0.01, steel, 5));
  for (const [r, y] of [[0.36, 0.38], [0.26, 0.64]]) {
    const sig = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 6, 40), signal);
    sig.rotation.x = Math.PI / 2;
    sig.position.y = mastBase + y;
    g.add(sig);
  }
  addCrystal(g, mastBase + mastH + 0.5, 0x38bdf8, 0.42, true);
  bakeByMaterial(g);
  return g;
}

// ───────── 通用建筑辅助 ─────────
const std = (color, roughness = 0.85, metalness = 0.02, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

function kitMats() {
  return {
    limestone: std(0xd2cabb, 0.9),
    limestoneDark: std(0xa79f90, 0.92),
    slate: std(0x5d646b, 0.88, 0.05),
    paving: std(0x8b8f92, 0.95),
    steel: std(0x8e99a4, 0.38, 0.85),
    darkSteel: std(0x2f353b, 0.5, 0.7),
    copper: std(0x4f9a8c, 0.52, 0.55),
    brass: std(0xb68a3c, 0.36, 0.8),
    wood: std(0x8a6a4a, 0.82),
    woodDark: std(0x5a4330, 0.85),
    brick: std(0x9a5a45, 0.92),
    brickDark: std(0x6f3f33, 0.94),
    terracotta: std(0xb5654a, 0.85),
    whiteWash: std(0xeee8dc, 0.92),
    red: std(0xb83b32, 0.7),
    leaf: std(0x3f6f45, 0.95),
    leafLight: std(0x5d8f4e, 0.95),
    soil: std(0x4a3b2c, 1),
    rock: std(0x7b7d80, 0.95),
    lampGlass: std(0xfff0c8, 0.3, 0, { emissive: 0xffc15a, emissiveIntensity: 0.9 }),
    ember: std(0xff7a2a, 0.5, 0, { emissive: 0xff5a14, emissiveIntensity: 1.4 }),
    glassWall: new THREE.MeshPhysicalMaterial({ color: 0x1f4a5c, roughness: 0.06, metalness: 0.1, transparent: true, opacity: 0.78, clearcoat: 1 }),
    glowBlue: std(0x9ed8ff, 0.25, 0.4, { emissive: 0x38bdf8, emissiveIntensity: 0.9 }),
    solar: std(0x1d2b4d, 0.25, 0.6),
    regolith: std(0x8c8a86, 1),
    canvasA: std(0xc94a3d, 0.9, 0, { side: THREE.DoubleSide }),
    canvasB: std(0xf1e8d2, 0.9, 0, { side: THREE.DoubleSide }),
  };
}

/** 底面在 y 的圆台 */
function cyl(g, mat, rTop, rBottom, h, x, y, z, radial = 28) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, radial), mat);
  place(m, x, y + h / 2, z);
  g.add(m);
  return m;
}
/** 倒角方块，底面在 y */
function bx(g, mat, w, h, d, x, y, z, r = 0.03, ry = 0) {
  const m = rbox(w, h, d, r, mat);
  place(m, x, y + h / 2, z);
  m.rotation.y = ry;
  g.add(m);
  return m;
}
function ringMesh(g, mat, radius, tube, y, x = 0, z = 0, arc = Math.PI * 2) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 64, arc), mat);
  m.rotation.x = Math.PI / 2;
  place(m, x, y, z);
  g.add(m);
  return m;
}
function ball(g, mat, r, x, y, z, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), mat);
  m.scale.set(sx, sy, sz);
  place(m, x, y, z);
  g.add(m);
  return m;
}
/** 三层八边台基，返回台面高度 */
function tieredPlinth(g, m, r = 3.1) {
  g.add(octPrism(r, 0.14, 0.02, m.limestoneDark));
  g.add(place(octPrism(r - 0.38, 0.14, 0.02, m.limestone), 0, 0.14, 0));
  g.add(place(octPrism(r - 0.8, 0.16, 0.02, m.limestone), 0, 0.28, 0));
  return 0.44;
}
function lampPost(g, m, x, y, z) {
  cyl(g, m.darkSteel, 0.09, 0.11, 0.1, x, y, z, 10);
  cyl(g, m.darkSteel, 0.028, 0.04, 1.1, x, y + 0.1, z, 8);
  cyl(g, m.lampGlass, 0.05, 0.07, 0.16, x, y + 1.16, z, 8);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.09, 8), m.darkSteel);
  place(cap, x, y + 1.38, z);
  g.add(cap);
}
function bush(g, m, x, y, z, s = 1, seed = 0) {
  for (let k = 0; k < 4; k++) {
    const a = k * 1.7 + seed;
    ball(g, k % 2 ? m.leaf : m.leafLight, 0.15 * s + (k % 2) * 0.03, x + Math.cos(a) * 0.14 * s, y + 0.12 * s, z + Math.sin(a) * 0.14 * s, 1, 0.85, 1);
  }
}
/** 石砌台基上的塔身水平勒脚线 */
function bands(g, mat, w, y0, y1, n) {
  for (let i = 1; i < n; i++) bx(g, mat, w, 0.02, w, 0, y0 + ((y1 - y0) * i) / n, 0, 0.004);
}
/** 山墙三角形（挤出），底边中心在原点，朝 +Z */
function gable(g, mat, width, height, depth, x, y, z, ry = 0) {
  const s = new THREE.Shape();
  s.moveTo(-width / 2, 0);
  s.lineTo(width / 2, 0);
  s.lineTo(0, height);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
  geo.translate(0, 0, -depth / 2);
  const m = new THREE.Mesh(geo, mat);
  place(m, x, y, z);
  m.rotation.y = ry;
  g.add(m);
  return m;
}

/** Unit2 人生档案港：圆形柱廊档案亭 + 铜穹顶 + 系缆柱与木桶 */
function buildUnit02() {
  const g = new THREE.Group();
  g.name = "rw3_unit02_archive_pavilion";
  const m = kitMats();
  const top = tieredPlinth(g, m, 3.2);
  // 台阶
  for (let i = 0; i < 3; i++) {
    const h = 0.06 * (3 - i);
    bx(g, m.limestone, 1.5 - i * 0.14, h, 0.3, 0, top, 2.0 + i * 0.26, 0.015);
  }
  // 圆形铺地同心环
  for (const [r, w] of [[2.55, 0.02], [1.2, 0.02]]) ringMesh(g, m.slate, r, w, top + 0.012);
  // 八根柱廊：柱础 + 柱身（微收分）+ 柱颈环 + 柱头 + 顶板
  const colR = 1.75;
  const colH = 2.0;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const x = Math.cos(a) * colR;
    const z = Math.sin(a) * colR;
    bx(g, m.limestoneDark, 0.38, 0.12, 0.38, x, top, z, 0.03, -a);
    cyl(g, m.limestone, 0.1, 0.125, colH, x, top + 0.12, z, 20);
    for (let k = 0; k < 8; k++) {
      const fa = (k / 8) * Math.PI * 2;
      const fl = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, colH * 0.9, 4), m.limestoneDark);
      place(fl, x + Math.cos(fa) * 0.115, top + 0.12 + colH / 2, z + Math.sin(fa) * 0.115);
      fl.castShadow = false;
      g.add(fl);
    }
    ringMesh(g, m.limestoneDark, 0.105, 0.016, top + 0.12 + colH - 0.05, x, z);
    cyl(g, m.limestone, 0.19, 0.1, 0.13, x, top + 0.12 + colH, z, 20);
    bx(g, m.limestoneDark, 0.4, 0.07, 0.4, x, top + 0.25 + colH, z, 0.02, -a);
  }
  // 檐部：连续的圆环梁 + 齿饰
  const eY = top + 0.32 + colH;
  ringMesh(g, m.limestone, colR, 0.13, eY + 0.1);
  ringMesh(g, m.limestoneDark, colR + 0.05, 0.05, eY + 0.24);
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    bx(g, m.limestoneDark, 0.09, 0.09, 0.08, Math.cos(a) * (colR + 0.12), eY - 0.07, Math.sin(a) * (colR + 0.12), 0.01, -a);
  }
  // 内殿：圆形鼓座 + 拱窗 + 门
  cyl(g, m.whiteWash, 1.05, 1.05, 1.55, 0, top, 0, 36);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    bx(g, m.slate, 0.3, 0.62, 0.06, Math.cos(a) * 1.04, top + 0.62, Math.sin(a) * 1.04, 0.015, -a + Math.PI / 2);
  }
  bx(g, m.woodDark, 0.4, 0.9, 0.06, 0, top, 1.03, 0.01);
  // 铜穹顶：半球 + 肋 + 顶冠
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.0, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), m.copper);
  dome.scale.set(1, 0.62, 1);
  place(dome, 0, eY + 0.3, 0);
  g.add(dome);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const pts = [];
    for (let k = 0; k <= 10; k++) {
      const t = (k / 10) * (Math.PI / 2);
      pts.push(new THREE.Vector3(Math.cos(a) * Math.cos(t) * 2.02, eY + 0.3 + Math.sin(t) * 2.0 * 0.62 * 1.005, Math.sin(a) * Math.cos(t) * 2.02));
    }
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.022, 5, false), m.brass);
    tube.castShadow = true;
    g.add(tube);
  }
  cyl(g, m.brass, 0.1, 0.16, 0.2, 0, eY + 0.3 + 2.0 * 0.62, 0, 14);
  ball(g, m.brass, 0.11, 0, eY + 0.3 + 2.0 * 0.62 + 0.28, 0);
  // 港口细节：系缆柱 + 缆绳圈 + 木桶 + 路灯
  for (const s of [-1, 1]) {
    cyl(g, m.darkSteel, 0.1, 0.13, 0.4, s * 2.8, 0.44, 1.2, 14);
    cyl(g, m.darkSteel, 0.17, 0.1, 0.1, s * 2.8, 0.84, 1.2, 14);
    ringMesh(g, m.wood, 0.17, 0.04, 0.55, s * 2.8, 1.2);
    cyl(g, m.woodDark, 0.2, 0.2, 0.42, s * 2.7, 0.44, -1.9, 16);
    ringMesh(g, m.darkSteel, 0.205, 0.012, 0.58, s * 2.7, -1.9);
    ringMesh(g, m.darkSteel, 0.205, 0.012, 0.78, s * 2.7, -1.9);
    lampPost(g, m, s * 2.62, top, -0.8);
  }
  for (const [x, z] of [[-2.3, 2.1], [2.3, 2.1]]) bush(g, m, x, top, z, 1.2, x);
  addCrystal(g, eY + 0.3 + 2.0 * 0.62 + 0.75, 0xa78bfa, 0.42, true);
  bakeByMaterial(g);
  return g;
}

/** Unit3 罗盘海岸：红白条纹灯塔 + 看守小屋 + 罗盘铺地 */
function buildUnit03() {
  const g = new THREE.Group();
  g.name = "rw3_unit03_lighthouse";
  const m = kitMats();
  const top = tieredPlinth(g, m, 3.2);
  // 罗盘玫瑰铺地：八向放射条 + 双环
  for (let i = 0; i < 8; i++) {
    const len = i % 2 ? 1.7 : 2.5;
    const bar = bx(g, i % 2 ? m.slate : m.red, 0.12, 0.012, len, 0, top, 0, 0.004, (i / 8) * Math.PI);
    bar.position.y = top + 0.012;
  }
  ringMesh(g, m.slate, 2.2, 0.03, top + 0.014);
  ringMesh(g, m.slate, 0.9, 0.03, top + 0.014);
  const tw = new THREE.Group();
  g.add(tw);
  // 塔身：锥形圆筒，红白相间；底部石基
  cyl(tw, m.limestoneDark, 1.15, 1.25, 0.35, 0, top, 0, 32);
  const segs = [m.whiteWash, m.red, m.whiteWash, m.red, m.whiteWash];
  let y = top + 0.35;
  const heights = [0.75, 0.65, 0.6, 0.55, 0.5];
  segs.forEach((mat, i) => {
    const r0 = 1.05 - i * 0.075;
    const r1 = 1.05 - (i + 1) * 0.075;
    cyl(tw, mat, r1, r0, heights[i], 0, y, 0, 36);
    y += heights[i];
  });
  const shaftTop = y;
  // 窗：小拱窗沿螺旋排列
  for (let i = 0; i < 5; i++) {
    const a = i * 1.25 + 0.4;
    const yy = top + 0.9 + i * 0.62;
    const r = 1.05 - ((yy - top) / (shaftTop - top)) * 0.37 + 0.005;
    bx(tw, m.slate, 0.2, 0.3, 0.05, Math.cos(a) * r, yy, Math.sin(a) * r, 0.01, -a + Math.PI / 2);
  }
  // 看守门：木门
  bx(g, m.woodDark, 0.34, 0.62, 0.06, 0, top + 0.35, 1.0, 0.01);
  // 平台：环形挑台 + 栏杆
  const gY = shaftTop;
  cyl(g, m.limestone, 0.98, 0.78, 0.14, 0, gY, 0, 36);
  cyl(g, m.limestoneDark, 1.0, 1.0, 0.04, 0, gY + 0.14, 0, 36);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    g.add(strut([Math.cos(a) * 0.95, gY + 0.18, Math.sin(a) * 0.95], [Math.cos(a) * 0.95, gY + 0.5, Math.sin(a) * 0.95], 0.012, m.steel, 5));
  }
  ringMesh(g, m.steel, 0.95, 0.018, gY + 0.5);
  ringMesh(g, m.steel, 0.95, 0.01, gY + 0.3);
  // 灯室
  const lY = gY + 0.18;
  cyl(g, m.glassWall, 0.5, 0.52, 0.55, 0, lY, 0, 24);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    g.add(strut([Math.cos(a) * 0.52, lY, Math.sin(a) * 0.52], [Math.cos(a) * 0.52, lY + 0.55, Math.sin(a) * 0.52], 0.02, m.darkSteel, 5));
  }
  cyl(g, m.lampGlass, 0.2, 0.2, 0.28, 0, lY + 0.12, 0, 16);
  cyl(g, m.darkSteel, 0.62, 0.55, 0.07, 0, lY + 0.55, 0, 32);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.34, 32), m.red);
  place(cap, 0, lY + 0.62 + 0.17, 0);
  g.add(cap);
  ball(g, m.brass, 0.07, 0, lY + 0.98, 0);
  g.add(strut([0, lY + 1.0, 0], [0, lY + 1.35, 0], 0.012, m.steel, 5));
  // 看守小屋（侧）：白墙 + 红屋顶山墙 + 小窗
  bx(g, m.whiteWash, 1.3, 0.72, 0.95, -2.0, top, 1.0, 0.03, -0.35);
  gable(g, m.red, 1.45, 0.45, 1.05, -2.0, top + 0.72, 1.0, -0.35 + Math.PI / 2);
  bx(g, m.slate, 0.22, 0.22, 0.05, -2.2, top + 0.3, 1.43, 0.01, -0.35);
  bx(g, m.woodDark, 0.2, 0.42, 0.05, -1.85, top, 1.5, 0.01, -0.35);
  cyl(g, m.brick, 0.07, 0.09, 0.5, -1.8, top + 0.9, 0.85, 8);
  // 木栏 + 路灯 + 岩石
  for (let i = 0; i < 6; i++) {
    const x = 1.2 + i * 0.32;
    bx(g, m.wood, 0.07, 0.5, 0.07, x, top, 1.9 - i * 0.05, 0.015);
  }
  g.add(strut([1.2, top + 0.4, 1.9], [2.8, top + 0.4, 1.65], 0.02, m.wood, 5));
  g.add(strut([1.2, top + 0.25, 1.9], [2.8, top + 0.25, 1.65], 0.02, m.wood, 5));
  lampPost(g, m, 2.7, top, -1.2);
  lampPost(g, m, -2.7, top, -1.2);
  for (let i = 0; i < 5; i++) {
    const a = 2.2 + i * 0.55;
    const r = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2 + (i % 3) * 0.08, 1), m.rock);
    r.scale.set(1.2, 0.7, 1);
    place(r, Math.cos(a) * 3.5, 0.12, Math.sin(a) * 3.5);
    r.rotation.set(a, a * 2, 0);
    g.add(r);
  }
  addCrystal(g, lY + 1.7, 0x2dd4bf, 0.4, true);
  bakeByMaterial(g);
  return g;
}

/** Unit4 意义铸造所：砖砌工坊 + 烟囱 + 炉口火光 + 铁砧与齿轮 */
function buildUnit04() {
  const g = new THREE.Group();
  g.name = "rw3_unit04_forge";
  const m = kitMats();
  const top = tieredPlinth(g, m, 3.2);
  // 工坊主体：砖墙 + 石勒脚 + 水平砖缝线
  bx(g, m.limestoneDark, 2.7, 0.18, 2.1, 0, top, 0, 0.03);
  bx(g, m.brick, 2.6, 1.45, 2.0, 0, top + 0.18, 0, 0.03);
  for (let i = 1; i < 9; i++) bx(g, m.brickDark, 2.62, 0.012, 2.02, 0, top + 0.18 + i * 0.16, 0, 0.003);
  // 转角石
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) bx(g, m.limestone, 0.16, 1.45, 0.16, sx * 1.3, top + 0.18, sz * 1.0, 0.02);
  // 双坡屋顶：石板 + 屋脊 + 山墙
  const roofY = top + 1.63;
  for (const s of [-1, 1]) {
    const slab = bx(g, m.slate, 3.0, 0.1, 1.28, 0, roofY, 0, 0.02);
    slab.position.set(0, roofY + 0.38, s * 0.52);
    slab.rotation.x = s * 0.58;
  }
  bx(g, m.darkSteel, 3.05, 0.08, 0.14, 0, roofY + 0.76, 0, 0.02);
  gable(g, m.brick, 2.0, 0.72, 0.14, 1.3, roofY, 0, Math.PI / 2);
  gable(g, m.brick, 2.0, 0.72, 0.14, -1.3, roofY, 0, Math.PI / 2);
  // 烟囱：收分砖砌 + 帽 + 余烟（淡灰球）
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 2.1, 4), m.brick);
  chimney.rotation.y = Math.PI / 4;
  place(chimney, 0.85, top + 1.18 + 1.05, -0.5);
  g.add(chimney);
  bx(g, m.limestoneDark, 0.52, 0.1, 0.52, 0.85, top + 3.25, -0.5, 0.02);
  bx(g, m.limestoneDark, 0.4, 0.07, 0.4, 0.85, top + 3.35, -0.5, 0.015);
  // 炉口：拱形砖框 + 火光 + 前方炉台
  const mouth = new THREE.Mesh(new THREE.CircleGeometry(0.4, 24, 0, Math.PI), m.ember);
  place(mouth, -0.55, top + 0.62, 1.012);
  g.add(mouth);
  bx(g, m.ember, 0.8, 0.44, 0.02, -0.55, top + 0.2, 1.012, 0.004);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.07, 8, 24, Math.PI), m.limestone);
  place(arch, -0.55, top + 0.42, 1.03);
  g.add(arch);
  for (const s of [-1, 1]) bx(g, m.limestone, 0.14, 0.5, 0.14, -0.55 + s * 0.46, top + 0.18, 1.03, 0.02);
  bx(g, m.slate, 1.3, 0.12, 0.5, -0.55, top, 1.28, 0.03);
  // 大门（侧）：木门 + 铁箍 + 灯
  bx(g, m.woodDark, 0.7, 1.05, 0.08, 0.7, top + 0.18, 1.0, 0.015);
  for (const y of [0.35, 0.8]) bx(g, m.darkSteel, 0.72, 0.05, 0.1, 0.7, top + 0.18 + y, 1.0, 0.01);
  lampPost(g, m, 0.7 + 0.8, top, 1.5);
  // 室外：铁砧（砧面 + 腰 + 底）+ 木墩 + 淬火桶 + 齿轮 + 木柴
  cyl(g, m.woodDark, 0.22, 0.26, 0.36, 1.9, top, 1.4, 12);
  bx(g, m.darkSteel, 0.46, 0.08, 0.2, 1.9, top + 0.36, 1.4, 0.015);
  bx(g, m.darkSteel, 0.2, 0.14, 0.16, 1.9, top + 0.44, 1.4, 0.015);
  bx(g, m.darkSteel, 0.5, 0.1, 0.22, 1.9, top + 0.58, 1.4, 0.015);
  const horn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 10), m.darkSteel);
  horn.rotation.z = -Math.PI / 2;
  place(horn, 2.25, top + 0.63, 1.4);
  g.add(horn);
  cyl(g, m.woodDark, 0.26, 0.28, 0.5, -2.2, top, 1.5, 18);
  ringMesh(g, m.darkSteel, 0.27, 0.014, top + 0.15, -2.2, 1.5);
  ringMesh(g, m.darkSteel, 0.265, 0.014, top + 0.38, -2.2, 1.5);
  cyl(g, m.glowBlue, 0.22, 0.22, 0.02, -2.2, top + 0.5, 1.5, 18);
  // 墙面齿轮（大 + 小）
  for (const [gx, gy, gr, teeth] of [[-1.31, top + 1.0, 0.4, 14], [-1.31, top + 0.55, 0.22, 9]]) {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(gr, gr, 0.08, 24), m.darkSteel);
    body.rotation.z = Math.PI / 2;
    place(body, gx, gy, 0.1);
    g.add(body);
    for (let t = 0; t < teeth; t++) {
      const a = (t / teeth) * Math.PI * 2;
      const tooth = rbox(0.08, gr * 0.32, 0.12, 0.012, m.darkSteel);
      place(tooth, gx, gy + Math.cos(a) * (gr + 0.04), 0.1 + Math.sin(a) * (gr + 0.04));
      tooth.rotation.x = -a;
      g.add(tooth);
    }
  }
  // 木柴垛
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4 - r; c++) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.6, 8), m.wood);
    log.rotation.z = Math.PI / 2;
    place(log, 2.15, top + 0.08 + r * 0.13, -0.5 + c * 0.17 + r * 0.085);
    g.add(log);
  }
  bush(g, m, -2.4, top, -1.5, 1.3, 2);
  addCrystal(g, top + 3.9, 0xfbbf24, 0.4, true);
  bakeByMaterial(g);
  return g;
}

/** Unit5 月背观测站：分瓣穹顶天文台 + 望远镜 + 太阳能板 + 抛物面天线 + 月壤基座 */
function buildUnit05() {
  const g = new THREE.Group();
  g.name = "rw3_unit05_observatory";
  const m = kitMats();
  // 月壤基座：多层起伏圆盘 + 撞击坑 + 散石
  cyl(g, m.regolith, 3.2, 3.5, 0.2, 0, 0, 0, 48);
  cyl(g, m.regolith, 2.8, 3.1, 0.14, 0, 0.2, 0, 48);
  for (const [cx, cz, r] of [[-1.9, 1.6, 0.42], [2.1, 1.3, 0.3], [1.5, -2.0, 0.36]]) {
    ringMesh(g, m.limestoneDark, r, 0.05, 0.36, cx, cz);
    cyl(g, m.slate, r - 0.02, r - 0.02, 0.01, cx, 0.34, cz, 18);
  }
  for (let i = 0; i < 16; i++) {
    const a = i * 0.9;
    const rr = 3.35 + (i % 3) * 0.2;
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14 + (i % 4) * 0.06, 1), m.rock);
    rock.scale.set(1.3, 0.65, 1);
    place(rock, Math.cos(a) * rr, 0.12, Math.sin(a) * rr);
    rock.rotation.set(a, a * 2, 0);
    g.add(rock);
  }
  const top = 0.34;
  // 观测鼓座：金属蒙皮（竖向板缝）+ 环形走廊 + 入口舱门
  cyl(g, m.whiteWash, 1.35, 1.4, 1.1, 0, top, 0, 48);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    bx(g, m.steel, 0.025, 1.08, 0.03, Math.cos(a) * 1.395, top + 0.01, Math.sin(a) * 1.395, 0.005, -a);
  }
  ringMesh(g, m.steel, 1.38, 0.035, top + 0.55);
  ringMesh(g, m.steel, 1.36, 0.04, top + 1.1);
  bx(g, m.darkSteel, 0.55, 0.8, 0.08, 0, top, 1.38, 0.02);
  bx(g, m.glowBlue, 0.4, 0.55, 0.02, 0, top + 0.1, 1.43, 0.01);
  // 舷窗
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.5;
    if (Math.abs(a - Math.PI / 2) < 0.4) continue;
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 18), m.glowBlue);
    w.rotation.x = Math.PI / 2;
    place(w, Math.cos(a) * 1.4, top + 0.62, Math.sin(a) * 1.4);
    w.rotation.set(Math.PI / 2, 0, 0);
    w.rotation.y = 0;
    w.lookAt(Math.cos(a) * 3, top + 0.62, Math.sin(a) * 3);
    w.rotateX(Math.PI / 2);
    g.add(w);
  }
  // 穹顶：半球分 12 瓣（缝线）+ 观测缝（暗色）+ 顶部环
  const domeY = top + 1.1;
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.3, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), m.whiteWash);
  place(dome, 0, domeY, 0);
  g.add(dome);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const pts = [];
    for (let k = 0; k <= 12; k++) {
      const t = (k / 12) * (Math.PI / 2);
      pts.push(new THREE.Vector3(Math.cos(a) * Math.cos(t) * 1.31, domeY + Math.sin(t) * 1.31, Math.sin(a) * Math.cos(t) * 1.31));
    }
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 14, 0.014, 5, false), m.steel));
  }
  const slit = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1.6, 0.04), m.darkSteel);
  place(slit, 0, domeY + 0.78, 0.46);
  slit.rotation.x = 0.62;
  g.add(slit);
  ringMesh(g, m.steel, 1.31, 0.04, domeY);
  // 望远镜：镜筒 + 支架 + 目镜，从穹顶缝伸出
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 1.5, 20), m.limestone);
  tube.rotation.x = 1.0;
  place(tube, 0, domeY + 0.85, 0.5);
  g.add(tube);
  ringMesh(g, m.darkSteel, 0.155, 0.018, domeY + 0.85, 0, 0.5).rotation.set(1.0 + Math.PI / 2, 0, 0);
  // 太阳能板：两侧立架 + 栅格
  for (const s of [-1, 1]) {
    const x = s * 2.4;
    g.add(strut([x, top, -0.6], [x, top + 0.75, -0.6], 0.04, m.steel, 6));
    const panel = rbox(1.2, 0.04, 0.8, 0.01, m.solar);
    place(panel, x, top + 0.82, -0.6);
    panel.rotation.set(-0.5, 0, s * 0.1);
    g.add(panel);
    for (let k = 1; k < 4; k++) {
      const line = rbox(0.012, 0.045, 0.8, 0.003, m.steel);
      place(line, x - 0.6 + k * 0.3, top + 0.82, -0.6);
      line.rotation.set(-0.5, 0, s * 0.1);
      g.add(line);
    }
  }
  // 抛物面天线（后方）+ 通信桅杆
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.55, 28, 12, 0, Math.PI * 2, 0, Math.PI / 3), std(0xe6e9ec, 0.35, 0.55, { side: THREE.DoubleSide }));
  dish.rotation.set(Math.PI / 2 - 0.5, 0, 0);
  place(dish, -1.2, top + 1.2, -2.2);
  g.add(dish);
  g.add(strut([-1.2, top, -2.2], [-1.2, top + 1.15, -2.2], 0.05, m.steel, 6));
  g.add(strut([-1.2, top + 1.2, -2.2], [-1.2, top + 1.35, -1.95], 0.012, m.steel, 4));
  ball(g, m.darkSteel, 0.035, -1.2, top + 1.36, -1.93);
  // 燃料罐
  for (const x of [1.9, 2.4]) cyl(g, m.steel, 0.2, 0.2, 0.7, x, top, 2.0, 20);
  g.add(strut([1.9, top + 0.55, 2.0], [2.4, top + 0.55, 2.0], 0.03, m.darkSteel, 6));
  lampPost(g, m, -2.6, top, 1.2);
  addCrystal(g, domeY + 2.05, 0xc4b5fd, 0.4, true);
  bakeByMaterial(g);
  return g;
}

/** Unit6 共益交易城：木构市集 + 条纹遮阳篷 + 货摊 + 天平 + 钟楼 */
function buildUnit06() {
  const g = new THREE.Group();
  g.name = "rw3_unit06_market";
  const m = kitMats();
  const top = tieredPlinth(g, m, 3.3);
  // 铺地：砖纹（交错细缝）
  for (let i = -5; i <= 5; i++) {
    bx(g, m.slate, 5.2, 0.01, 0.02, 0, top, i * 0.42, 0.003);
  }
  // 木构大厅：四柱（带柱础）+ 梁 + 斜撑 + 双坡瓦顶（赤陶 + 脊）
  const hx = 1.55;
  const hz = 1.2;
  const colH = 1.9;
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    bx(g, m.limestoneDark, 0.34, 0.16, 0.34, sx * hx, top, sz * hz, 0.03);
    bx(g, m.woodDark, 0.22, colH, 0.22, sx * hx, top + 0.16, sz * hz, 0.03);
  }
  const bY = top + 0.16 + colH;
  for (const sz of [-1, 1]) bx(g, m.woodDark, hx * 2 + 0.3, 0.2, 0.2, 0, bY, sz * hz, 0.03);
  for (const sx of [-1, 1]) bx(g, m.woodDark, 0.2, 0.2, hz * 2 + 0.3, sx * hx, bY, 0, 0.03);
  // 斜撑（弧形用直撑近似）
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    g.add(strut([sx * hx, bY - 0.5, sz * hz], [sx * (hx - 0.45), bY, sz * hz], 0.045, m.wood, 6));
    g.add(strut([sx * hx, bY - 0.5, sz * hz], [sx * hx, bY, sz * (hz - 0.45)], 0.045, m.wood, 6));
  }
  // 屋顶
  const roofH = 0.95;
  for (const s of [-1, 1]) {
    const tile = bx(g, m.terracotta, hx * 2 + 0.9, 0.09, 1.55, 0, bY, 0, 0.02);
    tile.position.set(0, bY + 0.2 + roofH / 2, s * 0.72);
    tile.rotation.x = s * 0.62;
    // 瓦垄
    for (let k = 0; k < 14; k++) {
      const rib = rbox(0.025, 0.04, 1.5, 0.006, m.brickDark);
      place(rib, -hx - 0.4 + (k * (hx * 2 + 0.8)) / 13, bY + 0.2 + roofH / 2 + 0.03, s * 0.72);
      rib.rotation.x = s * 0.62;
      g.add(rib);
    }
  }
  bx(g, m.brickDark, hx * 2 + 0.95, 0.1, 0.14, 0, bY + 0.2 + roofH, 0, 0.02);
  gable(g, m.whiteWash, hz * 2 + 0.5, roofH, 0.08, hx + 0.3, bY + 0.1, 0, Math.PI / 2);
  gable(g, m.whiteWash, hz * 2 + 0.5, roofH, 0.08, -hx - 0.3, bY + 0.1, 0, Math.PI / 2);
  // 条纹遮阳篷（前方）：红白相间的倾斜布条
  for (let i = 0; i < 8; i++) {
    const strip = rbox(0.34, 0.02, 0.9, 0.005, i % 2 ? m.canvasB : m.canvasA);
    place(strip, -1.19 + i * 0.34, top + 1.65, hz + 0.45);
    strip.rotation.x = 0.4;
    g.add(strip);
  }
  g.add(strut([-1.4, top + 1.5, hz + 0.7], [-1.4, top + 0.16, hz + 0.7], 0.03, m.woodDark, 6));
  g.add(strut([1.4, top + 1.5, hz + 0.7], [1.4, top + 0.16, hz + 0.7], 0.03, m.woodDark, 6));
  // 货摊：柜台 + 木箱 + 水果（彩色小球）
  bx(g, m.wood, 2.2, 0.55, 0.5, 0, top + 0.16, hz + 0.45, 0.03);
  bx(g, m.woodDark, 2.3, 0.05, 0.6, 0, top + 0.71, hz + 0.45, 0.015);
  const fruitCols = [0xd94b3d, 0xf2a93b, 0x7ab648, 0xe06b8f];
  for (let i = 0; i < 12; i++) {
    const fx = -0.9 + (i % 6) * 0.36;
    const fz = hz + 0.3 + Math.floor(i / 6) * 0.22;
    ball(g, std(fruitCols[i % 4], 0.6), 0.07, fx, top + 0.82, fz);
  }
  for (const [x, z] of [[-2.2, 1.4], [2.2, 1.5], [2.5, -0.4]]) {
    bx(g, m.wood, 0.5, 0.4, 0.4, x, top, z, 0.025);
    bx(g, m.woodDark, 0.52, 0.04, 0.42, x, top + 0.28, z, 0.01);
    bx(g, m.wood, 0.4, 0.32, 0.4, x + 0.02, top + 0.4, z, 0.025, 0.4);
  }
  // 天平雕塑：立柱 + 横梁 + 吊链 + 两个托盘
  const tx = -2.4;
  const tz = -0.9;
  cyl(g, m.brass, 0.05, 0.07, 1.3, tx, top, tz, 14);
  bx(g, m.brass, 1.2, 0.05, 0.05, tx, top + 1.3, tz, 0.01);
  ball(g, m.brass, 0.07, tx, top + 1.34, tz);
  for (const s of [-1, 1]) {
    const x = tx + s * 0.6;
    g.add(strut([x, top + 1.3, tz], [x - 0.18, top + 0.78, tz], 0.008, m.steel, 4));
    g.add(strut([x, top + 1.3, tz], [x + 0.18, top + 0.78, tz], 0.008, m.steel, 4));
    cyl(g, m.brass, 0.2, 0.2, 0.025, x, top + 0.75, tz, 24);
  }
  // 钟楼（后方）：石砌方塔 + 钟室拱 + 铜尖顶
  const bx0 = 2.15;
  const bz0 = -1.9;
  bx(g, m.limestone, 0.9, 1.9, 0.9, bx0, top, bz0, 0.03);
  for (let i = 1; i < 6; i++) bx(g, m.limestoneDark, 0.92, 0.015, 0.92, bx0, top + i * 0.32, bz0, 0.003);
  bx(g, m.limestoneDark, 1.0, 0.1, 1.0, bx0, top + 1.9, bz0, 0.02);
  for (const [dx, dz] of [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]]) bx(g, m.limestone, 0.12, 0.6, 0.12, bx0 + dx, top + 2.0, bz0 + dz, 0.02);
  const spire = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.95, 4), m.copper);
  spire.rotation.y = Math.PI / 4;
  place(spire, bx0, top + 2.6 + 0.48, bz0);
  g.add(spire);
  const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.17, 0.26, 18), m.brass);
  place(bell, bx0, top + 2.3, bz0);
  g.add(bell);
  bx(g, m.slate, 0.2, 0.28, 0.04, bx0, top + 1.3, bz0 + 0.46, 0.01);
  // 桶、路灯、花盆
  for (const [x, z] of [[2.9, 0.9], [-2.9, 1.8]]) {
    cyl(g, m.woodDark, 0.2, 0.2, 0.42, x, top, z, 16);
    ringMesh(g, m.darkSteel, 0.205, 0.012, top + 0.15, x, z);
    ringMesh(g, m.darkSteel, 0.205, 0.012, top + 0.32, x, z);
  }
  lampPost(g, m, 2.75, top, 2.0);
  lampPost(g, m, -2.75, top, 2.0);
  bush(g, m, 0, top, -2.2, 1.4, 5);
  addCrystal(g, top + 2.6 + 1.5, 0xf9a8d4, 0.4, true);
  bakeByMaterial(g);
  return g;
}

const BUILDERS = [buildUnit01, buildUnit02, buildUnit03, buildUnit04, buildUnit05, buildUnit06];

function centerOnGround(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  object.position.x -= center.x;
  object.position.z -= center.z;
  object.position.y -= box.min.y;
  return size;
}

async function exportGlb(object, filePath) {
  const exporter = new GLTFExporter();
  const result = await exporter.parseAsync(object, { binary: true });
  const buf = result instanceof ArrayBuffer ? Buffer.from(result) : Buffer.from(JSON.stringify(result));
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buf);
  return buf.length;
}

async function main() {
  console.log("生成读写3 地标 GLB →", OUT_DIR);
  // 可选参数：只生成指定单元，如 `node scripts/generate_rw3_landmarks.mjs unit01`
  const only = process.argv.slice(2);
  for (let i = 0; i < BUILDERS.length; i++) {
    const unit = String(i + 1).padStart(2, "0");
    if (only.length && !only.includes(`unit${unit}`)) continue;
    const scene = BUILDERS[i]();
    centerOnGround(scene);
    const out = path.join(OUT_DIR, `unit${unit}.glb`);
    const bytes = await exportGlb(scene, out);
    console.log(`  ✓ unit${unit}.glb (${bytes.toLocaleString()} bytes)`);
    scene.traverse((c) => {
      if (c.geometry) c.geometry.dispose();
      if (c.material) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach((m) => m.dispose());
      }
    });
  }
  console.log("完成。运行 npm run dev 走动靠近水晶按 E 查看。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

