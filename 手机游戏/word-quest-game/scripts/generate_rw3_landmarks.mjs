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

/** Unit2 古典亭阁 */
function buildUnit02() {
  const g = new THREE.Group();
  g.name = "rw3_unit02_pavilion";
  basePlatform(g, 2.6, 0x6b7280);
  const cols = [-0.9, 0.9];
  for (const x of cols) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 2.6, 12), stone(0xd1d5db));
    col.position.set(x, 1.5, 0);
    col.castShadow = true;
    g.add(col);
  }
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.7, 1.1, 4), stone(0x7c6cf0));
  roof.position.y = 3.2;
  roof.rotation.y = Math.PI / 4;
  g.add(roof);
  addCrystal(g, 4.2, 0xa78bfa);
  return g;
}

/** Unit3 螺旋塔 */
function buildUnit03() {
  const g = new THREE.Group();
  g.name = "rw3_unit03_spiral";
  basePlatform(g, 2.3, 0x3f4f4a);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.85, 3.8, 16), stone(0x5c6b64));
  tower.position.y = 2.1;
  tower.castShadow = true;
  g.add(tower);
  for (let i = 0; i < 6; i++) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 1.1), stone(0x34d399));
    sp.position.set(0.75, 0.8 + i * 0.55, 0);
    sp.rotation.y = (i / 6) * Math.PI * 2;
    g.add(sp);
  }
  addCrystal(g, 4.8, 0x2dd4bf);
  return g;
}

/** Unit4 拱门 */
function buildUnit04() {
  const g = new THREE.Group();
  g.name = "rw3_unit04_arch";
  basePlatform(g, 2.8, 0x57534e);
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 2.8, 0.45), stone(0xa8a29e));
  legL.position.set(-1.1, 1.55, 0);
  const legR = legL.clone();
  legR.position.x = 1.1;
  const arch = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.18, 10, 24, Math.PI), stone(0x78716c));
  arch.rotation.z = Math.PI;
  arch.position.y = 2.9;
  g.add(legL, legR, arch);
  addCrystal(g, 4.5, 0xfbbf24);
  return g;
}

/** Unit5 天文台 */
function buildUnit05() {
  const g = new THREE.Group();
  g.name = "rw3_unit05_observatory";
  basePlatform(g, 2.5, 0x44403c);
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 1.2, 24), stone(0x9ca3af));
  cyl.position.y = 0.85;
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    glass(0x818cf8, 0.2)
  );
  dome.position.y = 1.45;
  const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.4, 8), stone(0x1f2937));
  scope.rotation.z = Math.PI / 3;
  scope.position.set(0.3, 2.8, 0.5);
  g.add(cyl, dome, scope);
  addCrystal(g, 4.3, 0xc4b5fd);
  return g;
}

/** Unit6 神殿方尖碑 */
function buildUnit06() {
  const g = new THREE.Group();
  g.name = "rw3_unit06_temple";
  basePlatform(g, 3, 0x57534e);
  const steps = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.25, 2.2), stone(0x9d8189));
  steps.position.y = 0.45;
  const obelisk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 3.4, 8), stone(0xc4a5b5));
  obelisk.position.y = 2.2;
  obelisk.castShadow = true;
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.05, 8, 40),
    new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xec4899, emissiveIntensity: 0.55, metalness: 0.8, roughness: 0.15 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 4.1;
  g.add(steps, obelisk, halo);
  addCrystal(g, 5.1, 0xf9a8d4);
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

