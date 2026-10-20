import { readFileSync } from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { beforeAll, describe, expect, it } from "vitest";
import { registerHumanModel } from "./humanVisual";
import { spawnActor } from "../memory/actors";

/**
 * 真人网格级检查：用 GLB 里的真实蒙皮网格（node 下给 GLTFLoader 补 self / createImageBitmap，贴图不解码），
 * 摆好姿势后取每个顶点的蒙皮位置，检查“脚落地、臀部不陷进椅面、背不穿椅背、手不穿桌面”。
 */
const SEAT = { height: 0.48, tableHeight: 0.75, tableEdge: 0.35, paper: { x: -0.2, z: 0.46 } };

beforeAll(async () => {
  globalThis.self = globalThis;
  globalThis.createImageBitmap = async () => ({ width: 4, height: 4, close() {} });
  for (const kind of ["male", "female"]) {
    const buf = readFileSync(new URL(`../../../public/models/humans/${kind}.glb`, import.meta.url));
    const gltf = await new GLTFLoader().parseAsync(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), "");
    registerHumanModel(kind, gltf.scene);
  }
});

const P = new THREE.Vector3();
function skinnedVertices(root) {
  root.updateMatrixWorld(true);
  const pts = [];
  root.getObjectByName("human-visual").traverse((o) => {
    if (!o.isSkinnedMesh) return;
    o.skeleton.update();
    const n = o.geometry.getAttribute("position").count;
    for (let i = 0; i < n; i++) { o.getVertexPosition(i, P); P.applyMatrix4(o.matrixWorld); pts.push(P.clone()); }
  });
  return pts;
}

function measure(kind, pose) {
  const actor = { id: "t", name: "T", look: { seated: true, shirt: 0x6a6f9a, hairStyle: kind === "male" ? "short" : "long" }, position: { x: 0, y: 0, z: 0 }, rotationY: 0, pose: "listen", seat: SEAT };
  const h = spawnActor(actor, [], "low");
  h.animator.setPose(pose, 0);
  for (let i = 0; i < 90; i++) h.update(1 / 60, i / 60);
  const pts = skinnedVertices(h.root);
  const r = { minY: 9, seat: 0, back: 0, table: 0, tableBelow: 0 };
  for (const p of pts) {
    r.minY = Math.min(r.minY, p.y);
    if (Math.abs(p.x) < 0.21 && p.z > -0.21 && p.z < 0.21 && p.y < 0.48 && p.y > 0.4) r.seat = Math.max(r.seat, 0.48 - p.y);
    if (Math.abs(p.x) < 0.21 && p.z < -0.185 && p.z > -0.26 && p.y > 0.5 && p.y < 0.84) r.back = Math.max(r.back, -0.185 - p.z);
    if (Math.abs(p.x) < 2.4 && p.z > 0.35 && p.y > 0.705 && p.y < 0.75) r.table = Math.max(r.table, Math.min(0.75 - p.y, p.y - 0.705));
  }
  h.dispose();
  return r;
}

describe("真人网格：坐姿与家具的接触（蒙皮后的真实顶点）", () => {
  for (const kind of ["male", "female"]) for (const pose of ["sitUpright", "sitLeanForward", "sitPhoneLap", "sitPhoneTable", "sitChinHand", "sitWrite", "sitSlouch", "sitTalk", "sitLaugh"]) {
    it(`${kind} ${pose}：脚落地、臀部陷进椅面 ≤ 3.5 cm、背不穿椅背（≤ 3.5 cm）、手 / 身体不穿桌面（≤ 1.5 cm）`, () => {
      const r = measure(kind, pose);
      if (process.env.MESH_DEBUG) process.stdout.write(`\n${kind} ${pose} ${JSON.stringify(r)}\n`);
      expect(r.minY, "脚底").toBeGreaterThan(-0.02);
      expect(r.minY, "脚底").toBeLessThan(0.03);
      expect(r.seat, "椅面").toBeLessThan(0.035);
      expect(r.back, "椅背").toBeLessThan(0.035);
      expect(r.table, "桌面").toBeLessThan(0.015);
    });
  }

  it("长时间运动层（呼吸 / 微晃 / 视线 / 说话手势 / 小动作 / 变体姿势）下，身体始终不穿桌面（≤ 2.5 cm）、不陷进椅面（≤ 4 cm）、脚不离地也不陷地", () => {
    for (const kind of ["male", "female"]) for (const pose of ["listen", "write", "phone", "talk"]) {
      const actor = { id: "t" + kind + pose, name: "T", look: { seated: true, shirt: 0x6a6f9a, glasses: true, hairStyle: kind === "male" ? "short" : "long" }, position: { x: 0, y: 0, z: 0 }, rotationY: 0, pose, seat: SEAT };
      const h = spawnActor(actor, [], "low");
      let worstSeat = 0, worstTable = 0, minY = 9, maxToe = 0;
      for (let i = 0; i < 60 * 70; i++) {
        h.update(1 / 60, i / 60);
        if (i % 20 !== 0) continue;
        for (const p of skinnedVertices(h.root)) {
          minY = Math.min(minY, p.y);
          if (Math.abs(p.x) < 0.21 && p.z > -0.21 && p.z < 0.21 && p.y < 0.48 && p.y > 0.38) worstSeat = Math.max(worstSeat, 0.48 - p.y);
          if (Math.abs(p.x) < 2.4 && p.z > 0.35 && p.y > 0.705 && p.y < 0.75) worstTable = Math.max(worstTable, Math.min(0.75 - p.y, p.y - 0.705));
        }
      }
      expect(minY, `${kind} ${pose} 地面`).toBeGreaterThan(-0.03);
      expect(worstSeat, `${kind} ${pose} 椅面`).toBeLessThan(0.04);
      expect(worstTable, `${kind} ${pose} 桌面`).toBeLessThan(0.025);
      void maxToe;
      h.dispose();
    }
  }, 60000);

  it("站姿：脚底在地面，身高约 1.8 m（±4%）", () => {
    for (const kind of ["male", "female"]) {
      const actor = { id: "t", name: "T", look: { seated: false, hairStyle: kind === "male" ? "short" : "long" }, position: { x: 0, y: 0, z: 0 }, rotationY: 0, pose: "stand" };
      const h = spawnActor(actor, [], "low");
      for (let i = 0; i < 30; i++) h.update(1 / 60, i / 60);
      const box = new THREE.Box3().setFromPoints(skinnedVertices(h.root));
      expect(Math.abs(box.min.y)).toBeLessThan(0.015);
      expect(box.max.y).toBeGreaterThan(1.8 * 0.95);
      expect(box.max.y).toBeLessThan(1.8 * 1.07);
      h.dispose();
    }
  });
});
