import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createSceneKit } from "../world/sceneProps";
import { loadUnits, loadVocab } from "./testData";
import { ARCHETYPES, MEMORY_OBJECTS, buildWordObject, memoryObjectFor, verbPose, type Verb } from "./memoryObjects";

const units = loadUnits();
const vocab = loadVocab();
const ALL_WORDS = units.flatMap((unit) => (unit.word_ids ?? []).map((id) => ({ unitId: unit.unit_id, id, word: vocab.get(id)?.word ?? "" })));

function triangles(group: THREE.Group): number {
  let n = 0;
  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) n += (m.geometry.index?.count ?? m.geometry.attributes.position.count) / 3;
  });
  return n;
}

function meshCount(root: THREE.Object3D): number {
  let n = 0;
  root.traverse((o) => ((o as THREE.Mesh).isMesh ? n++ : 0));
  return n;
}

function maxSize(group: THREE.Group): number {
  const size = new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3());
  return Math.max(size.x, size.y, size.z);
}

describe("memoryObjects：通用物件策略", () => {
  it("数据层有 6 个单元、每个单元都有词；不靠旧单元 1 的 30 条手写映射", () => {
    expect(units).toHaveLength(6);
    expect(ALL_WORDS.length).toBeGreaterThan(300);
    for (const unit of units) expect(unit.word_ids?.length ?? 0, unit.unit_id).toBeGreaterThan(0);
    expect(MEMORY_OBJECTS).toEqual({});
  });

  it("任意单元词都能拿到物件定义：原型合法、旁白是含该词的第二人称完整句、同一词永远一致", () => {
    const verbs = new Set<Verb>();
    for (const { id, word } of ALL_WORDS) {
      const def = memoryObjectFor(id, word);
      expect(ARCHETYPES[def.archetype], `${id} → ${def.archetype}`).toBeDefined();
      expect(["glow", "open", "spin", "ring", "flip", "bloom"], id).toContain(def.verb);
      expect(def.line, id).toContain(word);
      expect(def.line, id).toMatch(/^You\b/);
      expect(def.line, id).toMatch(/\.$/);
      expect(memoryObjectFor(id, word), id).toEqual(def);
      verbs.add(def.verb);
    }
    // 六个单元合起来，六种触碰动画都被用到
    expect([...verbs].sort()).toEqual(["bloom", "flip", "glow", "open", "ring", "spin"]);
  });

  it("通用策略有足够的多样性：没有集中在少数几个原型上", () => {
    const archetypes = new Set(ALL_WORDS.map(({ id, word }) => memoryObjectFor(id, word).archetype));
    expect(archetypes.size).toBeGreaterThanOrEqual(20);
    // 同一个单元内部也不该只有一个原型
    for (const unit of units) {
      const inUnit = new Set((unit.word_ids ?? []).map((id) => memoryObjectFor(id, vocab.get(id)?.word).archetype));
      expect(inUnit.size, unit.unit_id).toBeGreaterThanOrEqual(5);
    }
  });

  it("每个 archetype 都能 build 出非空 Group，且包围盒大小合理", () => {
    const kit = createSceneKit("low");
    for (const [name, arch] of Object.entries(ARCHETYPES)) {
      const g = buildWordObject("test", kit, name);
      expect(g.name).toBe("word:test");
      expect(g.children.length, name).toBeGreaterThan(0);
      expect(triangles(g), name).toBeGreaterThan(8);
      const size = maxSize(g);
      // 展示尺寸：最大边在 15 cm 与 2.2 m 之间
      expect(size, name).toBeGreaterThan(0.15);
      expect(size, name).toBeLessThan(2.2);
      expect(g.scale.x).toBeCloseTo(arch.scale);
      // 合并后每个物件的网格数应很少（draw call 预算）
      expect(meshCount(g), name).toBeLessThanOrEqual(12);
    }
  });

  for (const unit of units) {
    it(`${unit.unit_id}：全部 ${unit.word_ids?.length ?? 0} 个词都能 build 出物件，名字带词 id、尺寸合理`, () => {
      const kit = createSceneKit("low");
      for (const id of unit.word_ids ?? []) {
        const word = vocab.get(id)?.word ?? "";
        const def = memoryObjectFor(id, word);
        const g = buildWordObject(id, kit, undefined, word);
        expect(g.name, id).toBe(`word:${id}`);
        expect(g.userData.wordId, id).toBe(id);
        expect(g.userData.archetype, id).toBe(def.archetype);
        expect(g.userData.verb, id).toBe(def.verb);
        expect(g.children.length, id).toBeGreaterThan(0);
        expect(triangles(g), id).toBeGreaterThan(8);
        expect(maxSize(g), id).toBeGreaterThan(0.15);
        expect(maxSize(g), id).toBeLessThan(2.2);
        expect(g.scale.x, id).toBeCloseTo(ARCHETYPES[def.archetype].scale);
        expect(meshCount(g), id).toBeLessThanOrEqual(12);
      }
    });
  }

  it("显式传入 archetype 时优先用它（脚本里的摆放仍然可以指定外形）", () => {
    const kit = createSceneKit("low");
    for (const name of ["phone", "cable", "emptyChair", "cup"]) {
      const g = buildWordObject("rw3_unit01_01", kit, name, "scenario");
      expect(g.userData.archetype).toBe(name);
      expect(g.scale.x).toBeCloseTo(ARCHETYPES[name].scale);
    }
    // 不存在的 archetype 回退到通用策略，不会抛错
    const fallback = buildWordObject("rw3_unit01_01", kit, "does-not-exist", "scenario");
    expect(ARCHETYPES[fallback.userData.archetype]).toBeDefined();
  });

  it("每个单元内部六种动词都被用到", () => {
    for (const unit of units) {
      const verbs = new Set((unit.word_ids ?? []).map((id) => memoryObjectFor(id, vocab.get(id)?.word).verb));
      expect(verbs.size, unit.unit_id).toBe(6);
    }
  });

  it("verbPose 起止都回到基准姿态，过程中有可见变化", () => {
    const verbs: Verb[] = ["glow", "open", "spin", "ring", "flip", "bloom"];
    for (const v of verbs) {
      const end = verbPose(v, 1);
      expect(end.scale).toBeCloseTo(1, 5);
      expect(Math.abs(end.lift)).toBeLessThan(1e-6);
      const start = verbPose(v, 0);
      expect(start.scale).toBeCloseTo(1, 5);
      const mid = verbPose(v, 0.4);
      const moved = Math.abs(mid.rotX) + Math.abs(mid.rotY) + Math.abs(mid.rotZ) + Math.abs(mid.scale - 1) + Math.abs(mid.lift);
      expect(moved, v).toBeGreaterThan(0.01);
    }
  });
});
