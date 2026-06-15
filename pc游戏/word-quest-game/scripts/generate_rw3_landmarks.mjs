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

function addCrystal(group, y = 5.2, color = 0x60a5fa) {
  const crystal = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), glass(color, 0.45));
  crystal.name = "Crystal";
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

/** Unit1 数字书塔 */
function buildUnit01() {
  const g = new THREE.Group();
  g.name = "rw3_unit01_digital_tower";
  basePlatform(g, 2.4, 0x374151);
  for (let i = 0; i < 4; i++) {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.6 - i * 0.15, 0.9, 1.4 - i * 0.12),
      glass(0x3b82f6, 0.15 + i * 0.05)
    );
    box.position.y = 0.55 + i * 1.05;
    box.castShadow = true;
    g.add(box);
  }
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.95, 0.06, 12, 40),
    new THREE.MeshStandardMaterial({ color: 0x93c5fd, emissive: 0x3b82f6, emissiveIntensity: 0.5, metalness: 0.7, roughness: 0.2 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 4.6;
  g.add(ring);
  addCrystal(g, 5.4, 0x38bdf8);
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
  for (let i = 0; i < BUILDERS.length; i++) {
    const unit = String(i + 1).padStart(2, "0");
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
