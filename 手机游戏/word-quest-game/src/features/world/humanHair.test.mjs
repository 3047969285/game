import { readFileSync } from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { beforeAll, describe, expect, it } from "vitest";
import { baseHairMask, buildHairGeometry, cullOpacityHair, HAIR_STYLES, hairTexturePixels, headLandmarks, shrinkBaseHair } from "./humanHair";

const scenes = {};
beforeAll(async () => {
  globalThis.self = globalThis;
  globalThis.createImageBitmap = async () => ({ width: 4, height: 4, close() {} });
  for (const kind of ["male", "female"]) {
    const buf = readFileSync(new URL(`../../../public/models/humans/${kind}.glb`, import.meta.url));
    scenes[kind] = (await new GLTFLoader().parseAsync(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), "")).scene;
  }
});

function parts(kind) {
  const meshes = [];
  scenes[kind].traverse((o) => { if (o.isSkinnedMesh) meshes.push(o); });
  const byMaterial = (suffix) => meshes.find((m) => m.material.name.endsWith(suffix));
  const head = byMaterial("_head");
  return { head, opacity: byMaterial("_opacity"), names: head.skeleton.bones.map((b) => b.name), meshes };
}

describe("底模头发处理", () => {
  for (const kind of ["male", "female"]) {
    it(`${kind}：收缩后头发顶点都在颅骨椭球上或内部，脸 / 眼 / 嘴 / 耳顶点不动`, () => {
      const { head, names } = parts(kind);
      const geometry = head.geometry.clone();
      const before = geometry.getAttribute("position").array.slice();
      const lm = headLandmarks(geometry, names);
      expect(lm).toBeTruthy();
      expect(lm.eye.y).toBeGreaterThan(1.5);
      const mask = baseHairMask(geometry, names, lm);
      const moved = shrinkBaseHair(geometry, names, lm);
      if (process.env.HAIR_DEBUG) { let mc = 0; mask.forEach((m) => (mc += m)); process.stdout.write(`\n${kind} mask ${mc} moved ${moved} total ${mask.length} eye ${lm.eye.toArray().map((n) => n.toFixed(3))}\n`); }
      expect(moved).toBeGreaterThan(150);
      const pos = geometry.getAttribute("position");
      const c = lm.skull.center, r = lm.skull.radii;
      let hair = 0;
      for (let i = 0; i < pos.count; i++) {
        if (mask[i]) {
          hair++;
          const s = ((pos.getX(i) - c.x) / r.x) ** 2 + ((pos.getY(i) - c.y) / r.y) ** 2 + ((pos.getZ(i) - c.z) / r.z) ** 2;
          expect(s).toBeLessThanOrEqual(1 + 1e-4);
        } else {
          for (let k = 0; k < 3; k++) expect(pos.array[i * 3 + k]).toBe(before[i * 3 + k]);
        }
        const bone = names[geometry.getAttribute("skinIndex").getX(i)];
        if (/Eye|MJaw|Mouth|Lip|Tongue|Nose/.test(bone) && geometry.getAttribute("skinWeight").getX(i) > 0.5) expect(mask[i], bone).toBe(0);
      }
      expect(hair).toBeGreaterThan(moved - 1);
    });

    it(`${kind}：opacity 层只保留眼周（睫毛 / 眉），头发卡片全部剔除`, () => {
      const { head, opacity, names } = parts(kind);
      const lm = headLandmarks(head.geometry, names);
      const geometry = opacity.geometry.clone();
      const tris = cullOpacityHair(geometry, lm);
      const pos = geometry.getAttribute("position");
      const index = geometry.getIndex();
      if (kind === "male") expect(tris).toBe(0);
      else expect(tris).toBeGreaterThan(60);
      for (let t = 0; t < index.count; t++) {
        const i = index.getX(t);
        expect(Math.abs(pos.getY(i) - lm.eye.y)).toBeLessThan(0.05);
        expect(pos.getZ(i)).toBeGreaterThan(lm.eye.z - 0.04);
      }
    });
  }
});

describe("程序发型", () => {
  const lmFor = (kind) => { const { head, names } = parts(kind); return headLandmarks(head.geometry, names); };
  for (const style of HAIR_STYLES) it(`${style}：顶点 ≤ 6000，有 uv / normal / skin 属性，发片在头周围`, () => {
    const lm = lmFor(/bob|Ponytail|long|earShort|sideBun/.test(style) ? "female" : "male");
    const build = buildHairGeometry(style, lm, 7);
    const g = build.geometry;
    expect(build.vertexCount).toBeLessThanOrEqual(6000);
    expect(build.vertexCount).toBeGreaterThan(150);
    for (const name of ["position", "normal", "uv", "color", "skinIndex", "skinWeight"]) expect(g.getAttribute(name), name).toBeTruthy();
    expect(g.getIndex().count % 3).toBe(0);
    g.computeBoundingBox();
    const box = g.boundingBox;
    expect(box.max.y).toBeGreaterThan(lm.eye.y + 0.05); // 头顶有头发
    expect(box.max.y).toBeLessThan(lm.eye.y + 0.22);
    expect(box.min.y).toBeGreaterThan(lm.eye.y - 0.45);
    // 头发不盖脸：眼 / 眉 / 鼻 / 脸颊区域（眼高 −6…+4 cm，脸前，|x| < 7 cm）里没有发片顶点
    const posA = g.getAttribute("position");
    for (let i = 0; i < posA.count; i++) {
      const x = posA.getX(i) - lm.eye.x, y = posA.getY(i) - lm.eye.y, z = posA.getZ(i) - lm.eye.z;
      expect(Math.abs(x) < 0.07 && y > -0.06 && y < 0.04 && z > -0.02, `${style} 顶点 ${i} 在脸上 ${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`).toBe(false);
    }
    // 同 seed 一致
    const again = buildHairGeometry(style, lm, 7);
    expect(again.geometry.getAttribute("position").array).toEqual(g.getAttribute("position").array);
    if (/ponytail|Ponytail|bob|long|shortTieUp/i.test(style)) expect(build.tail).toBeTruthy();
    if (process.env.HAIR_DEBUG) process.stdout.write(`\n${style} verts ${build.vertexCount} box y ${(box.min.y - lm.eye.y).toFixed(3)}..${(box.max.y - lm.eye.y).toFixed(3)} z ${(box.min.z - lm.eye.z).toFixed(3)}..${(box.max.z - lm.eye.z).toFixed(3)} x ±${box.max.x.toFixed(3)}\n`);
  });

  it("马尾从发圈处向下垂（不翘起）：发圈以上没有马尾顶点，越往下越细", () => {
    const lm = lmFor("female");
    for (const [style, tieY] of [["highPonytail", 0.066], ["lowPonytail", -0.034]]) {
      const { geometry } = buildHairGeometry(style, lm, 3);
      const pos = geometry.getAttribute("position");
      const c = lm.skull.center;
      let above = 0, low = 0;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i) - c.y, z = pos.getZ(i) - c.z;
        if (z < -0.14 && y > tieY + 0.035) above++; // 脑后、发圈之上
        if (y < tieY - 0.15) low++;
      }
      expect(above, style).toBe(0);
      expect(low, style).toBeGreaterThan(10);
    }
  });

  it("发丝贴图：发壳半边不透明（仅发梢软透明），发束半边两侧 / 根部 / 发梢透明，有发丝纹", () => {
    const d = hairTexturePixels();
    const W = 256, H = 256;
    const alpha = (x, y) => d[(y * W + x) * 4 + 3];
    expect(alpha(60, 100)).toBe(255);
    expect(alpha(60, H - 1)).toBeLessThan(30);
    expect(alpha(60, 20)).toBe(255);
    expect(alpha(128, 100)).toBeLessThan(40); // 发束左缘
    expect(alpha(255, 100)).toBeLessThan(40); // 发束右缘
    expect(alpha(192, 120)).toBeGreaterThan(200);
    expect(alpha(192, 2)).toBeLessThan(40); // 发束根部淡入
    const row = Array.from({ length: 24 }, (_, i) => d[(60 * W + 20 + i) * 4]);
    expect(new Set(row).size).toBeGreaterThan(8);
  });
});
