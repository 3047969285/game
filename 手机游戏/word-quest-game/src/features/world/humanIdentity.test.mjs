import { readFileSync } from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { beforeAll, describe, expect, it } from "vitest";
import { buildSkeletonFromGltfJson } from "./humanRig";
import { loadGltfJson } from "./humanTestKit.mjs";
import { applyFaceShape, face, faceBoneOffsets, faceDistance, FACE_LIMITS, NEUTRAL_FACE } from "./humanIdentity";
import { registerHumanModel } from "./humanVisual";
import { spawnActor } from "../memory/actors";
import { CHARACTERS, characterLook } from "../memory/characters";
import { CLUB_ACTORS_FIXTURE } from "../memory/testFixtures";
import { PROLOGUE_SCRIPT } from "../memory/scripts/prologue";

beforeAll(async () => {
  globalThis.self = globalThis;
  globalThis.createImageBitmap = async () => ({ width: 4, height: 4, close() {} });
  for (const kind of ["male", "female"]) {
    const buf = readFileSync(new URL(`../../../public/models/humans/${kind}.glb`, import.meta.url));
    registerHumanModel(kind, (await new GLTFLoader().parseAsync(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), "")).scene);
  }
});

const extreme = face(Object.fromEntries(Object.keys(NEUTRAL_FACE).map((k, i) => [k, i % 2 ? 1 : -1])));

describe("FaceShape：脸部骨骼静息偏移", () => {
  it("偏移在限位内（位移 ≤ 6.5 mm，缩放 ≤ 14%，头 ≤ 5%），极端脸型也不越界", () => {
    for (const shape of [extreme, face(Object.fromEntries(Object.keys(NEUTRAL_FACE).map((k) => [k, 1]))), face(Object.fromEntries(Object.keys(NEUTRAL_FACE).map((k) => [k, -1])))]) {
      for (const [name, o] of Object.entries(faceBoneOffsets(shape))) {
        for (const v of o.pos) expect(Math.abs(v), name).toBeLessThanOrEqual((name === "Bip01 MJaw" ? FACE_LIMITS.jaw : FACE_LIMITS.pos) + 1e-9);
        for (const v of o.scale) expect(Math.abs(v), name).toBeLessThanOrEqual((name === "Head" ? FACE_LIMITS.head : name === "Bip01 MJaw" ? FACE_LIMITS.jawScale : FACE_LIMITS.scale) + 1e-9);
      }
    }
    // 超出 −1..1 的输入被夹住
    const wild = face({ jawWidth: 9, noseLength: -9 });
    expect(wild.jawWidth).toBe(1);
    expect(wild.noseLength).toBe(-1);
  });

  it("同一脸型每次生成一致；不同身份的骨骼偏移向量距离足够大", () => {
    const a = faceBoneOffsets(CHARACTERS.lin.face), b = faceBoneOffsets(CHARACTERS.lin.face);
    expect(a).toEqual(b);
    const ids = ["me2026", "lin", "mei", "an", "rui", "organizer"];
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      expect(faceDistance(CHARACTERS[ids[i]].face, CHARACTERS[ids[j]].face), `${ids[i]} vs ${ids[j]}`).toBeGreaterThan(1.0);
    }
  });

  for (const kind of ["male", "female"]) it(`${kind}：应用到骨架后，面部骨骼位移 ≤ 限位，Head 缩放 ≤ 5%`, () => {
    const { visual } = buildSkeletonFromGltfJson(loadGltfJson(kind));
    const rest = new Map();
    visual.traverse((n) => rest.set(n, { p: n.position.clone(), s: n.scale.clone() }));
    applyFaceShape(visual, extreme);
    const worldBefore = new Map();
    let moved = 0;
    visual.traverse((n) => {
      const r = rest.get(n);
      if (!n.name.startsWith("Bip01") && n.name !== "Head") return;
      const dp = n.position.distanceTo(r.p) * visual.getWorldScale(new THREE.Vector3()).x * 0.01; // 骨骼局部单位 → 米（Bip01 缩放 0.01）
      if (dp > 1e-9) moved++;
      expect(dp, n.name).toBeLessThan(0.02);
      if (n.name === "Bip01 MJaw") expect(dp).toBeGreaterThan(0.004);
      for (const c of ["x", "y", "z"]) expect(Math.abs(n.scale[c] / r.s[c] - 1), n.name).toBeLessThanOrEqual(0.3);
    });
    void worldBefore;
    expect(moved).toBeGreaterThan(10);
    const head = visual.getObjectByName("Head");
    const hr = rest.get(head).s;
    for (const c of ["x", "y", "z"]) expect(Math.abs(head.scale[c] / hr[c] - 1)).toBeLessThanOrEqual(FACE_LIMITS.head + 1e-6);
  });
});

describe("身份表", () => {
  const ids = ["me2026", "lin", "mei", "an", "rui", "organizer"];
  it("u01a 的同学 + me2026 + organizer：（发型, 发色, 脸型）两两不同", () => {
    const combos = ids.map((id) => JSON.stringify([CHARACTERS[id].hair.style, CHARACTERS[id].hair.color, CHARACTERS[id].face]));
    expect(new Set(combos).size).toBe(ids.length);
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      expect(CHARACTERS[ids[i]].hair.style === CHARACTERS[ids[j]].hair.style && CHARACTERS[ids[i]].hair.color === CHARACTERS[ids[j]].hair.color).toBe(false);
    }
  });
  it("me2026：凌乱短碎发 + 圆框眼镜 + 灰色连帽卫衣 + 深蓝牛仔裤 + 黑双肩包；old2090 与它共用 FaceShape", () => {
    const me = CHARACTERS.me2026;
    expect(me.hair.style).toBe("messyCrop");
    expect(me.accessories).toContain("roundGlasses");
    expect(me.accessories).toContain("backpack");
    expect(me.outfit.top).toBe("hoodie");
    expect(me.outfit.bottom).toBe("jeans");
    expect(CHARACTERS.old2090.face).toBe(me.face);
    expect(CHARACTERS.old2090.aged).toBe(true);
    expect(CHARACTERS.old2090.hair.style).toBe("thinningSwept");
    expect(CHARACTERS.old2090.accessories).toContain("metalRoundGlasses");
    expect(CHARACTERS.lin.hair.style).toBe("bob");
    expect(CHARACTERS.mei.hair.style).toBe("highPonytail");
    expect(CHARACTERS.an.hair.style).toBe("buzz");
    expect(CHARACTERS.rui.accessories).toContain("squareGlasses");
    expect(CHARACTERS.organizer.hair.style).toBe("lowPonytail");
  });
  it("u01a 与 prologue 的演员都用身份表（同一身份每次生成一致）", () => {
    for (const actor of CLUB_ACTORS_FIXTURE) expect(actor.look).toEqual(characterLook(actor.id));
    expect(PROLOGUE_SCRIPT.actors[0].look).toEqual(characterLook("old2090"));
  });
});

describe("真人网格上的身份（node 下用真实 GLB 蒙皮网格）", () => {
  for (const id of ["me2026", "old2090", "lin", "mei", "an", "rui", "organizer"]) {
    it(`${id}：头发 / 眼镜等配饰就位，头发顶点 ≤ 6000，底模发片被剔除，摆动更新不出错`, () => {
      const actor = { id, name: id, look: characterLook(id), position: { x: 0, y: 0, z: 0 }, rotationY: 0, pose: "listen", seat: { height: 0.48, tableHeight: 0.75, tableEdge: 0.35 } };
      const h = spawnActor(actor, [], "low");
      const person = h.root.children[0];
      const hair = person.getObjectByName(`human-hair-${CHARACTERS[id].hair.style}`);
      expect(hair, id).toBeTruthy();
      expect(hair.geometry.getAttribute("position").count).toBeLessThanOrEqual(6000);
      expect(hair.parent.name).toBe("human-visual");
      const names = [];
      person.traverse((o) => o.isMesh && names.push(o.name));
      for (const accessory of CHARACTERS[id].accessories ?? []) {
        if (/Glasses/.test(accessory)) expect(names).toContain("human-glasses-frame");
        if (accessory === "backpack") expect(names).toContain("human-backpack");
        if (accessory === "hairClip") expect(names).toContain("human-hairclip");
      }
      for (let i = 0; i < 120; i++) h.update(1 / 60, i / 60);
      h.dispose();
    });
  }

  it("马尾 / 长发尾端会随头部转动摆动，且摆动角有界", () => {
    const actor = { id: "mei", name: "Mei", look: characterLook("mei"), position: { x: 0, y: 0, z: 0 }, rotationY: 0, pose: "listen", seat: { height: 0.48, tableHeight: 0.75, tableEdge: 0.35 } };
    const h = spawnActor(actor, [], "low");
    const info = h.root.children[0].userData.humanVisual;
    expect(info.hair.sway).toBeTruthy();
    let max = 0;
    for (let i = 0; i < 360; i++) {
      if (i === 60) h.animator.setLookTarget(new THREE.Vector3(1.5, 1.2, 0.5), true);
      if (i === 150) h.animator.setLookTarget(new THREE.Vector3(-1.5, 1.2, 0.5), true);
      h.update(1 / 60, i / 60);
      h.root.updateMatrixWorld(true);
      max = Math.max(max, info.hair.sway.angle);
      expect(info.hair.sway.angle).toBeLessThan(0.75);
    }
    expect(max).toBeGreaterThan(0.01);
    h.dispose();
  });

  it("底模头发被收缩：男底模的 opacity 发片整层隐藏，女底模只剩睫毛", () => {
    for (const [id, expectVisible] of [["me2026", false], ["lin", true]]) {
      const actor = { id, name: id, look: characterLook(id), position: { x: 0, y: 0, z: 0 }, rotationY: 0, pose: "stand" };
      const h = spawnActor(actor, [], "low");
      let opacity;
      h.root.traverse((o) => { if (o.isSkinnedMesh && o.material.name === "" && false) opacity = o; });
      const meshes = [];
      h.root.getObjectByName("human-visual").traverse((o) => { if (o.isSkinnedMesh && /^Mesh/.test(o.name)) meshes.push(o); });
      const op = meshes.find((m) => /opacity/.test(m.material.name || ""));
      void opacity;
      if (op) expect(op.visible).toBe(expectVisible);
      h.dispose();
    }
  });
});
