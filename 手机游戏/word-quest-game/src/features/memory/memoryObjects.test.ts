import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createSceneKit } from "../world/sceneProps";
import { loadUnits, loadVocab } from "./testData";
import { ARCHETYPES, MEMORY_OBJECTS, buildWordObject, memoryObjectFor, verbPose, type Verb } from "./memoryObjects";

const unit1 = loadUnits()[0] as { word_ids: string[] };
const vocab = new Map([...loadVocab()].map(([id, w]) => [id, w.word]));

function triangles(group: THREE.Group): number {
  let n = 0;
  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) n += (m.geometry.index?.count ?? m.geometry.attributes.position.count) / 3;
  });
  return n;
}

describe("memoryObjects", () => {
  it("单元 1 的 30 个词都有条目，旁白里含该词", () => {
    expect(unit1.word_ids).toHaveLength(30);
    for (const id of unit1.word_ids) {
      const def = MEMORY_OBJECTS[id];
      expect(def, id).toBeDefined();
      expect(ARCHETYPES[def.archetype], `${id} → ${def.archetype}`).toBeDefined();
      expect(def.line.toLowerCase(), id).toContain(vocab.get(id)!.slice(0, Math.max(4, vocab.get(id)!.length - 3)).toLowerCase());
    }
  });

  it("每个 archetype 都能 build 出非空 Group，且包围盒大小合理", () => {
    const kit = createSceneKit("low");
    for (const [name, arch] of Object.entries(ARCHETYPES)) {
      const g = buildWordObject("test", kit, name);
      expect(g.name).toBe("word:test");
      expect(g.children.length, name).toBeGreaterThan(0);
      expect(triangles(g), name).toBeGreaterThan(8);
      const box = new THREE.Box3().setFromObject(g);
      const size = box.getSize(new THREE.Vector3());
      // 展示尺寸：最大边在 15 cm 与 2.2 m 之间
      expect(Math.max(size.x, size.y, size.z), name).toBeGreaterThan(0.15);
      expect(Math.max(size.x, size.y, size.z), name).toBeLessThan(2.2);
      expect(g.scale.x).toBeCloseTo(arch.scale);
      // 合并后每个物件的网格数应很少（draw call 预算）
      let meshes = 0;
      g.traverse((o) => ((o as THREE.Mesh).isMesh ? meshes++ : 0));
      expect(meshes, name).toBeLessThanOrEqual(12);
    }
  });

  it("其它单元的词回退到确定性的物件", () => {
    const a = memoryObjectFor("rw3_unit03_07", "journey");
    const b = memoryObjectFor("rw3_unit03_07", "journey");
    expect(a).toEqual(b);
    expect(ARCHETYPES[a.archetype]).toBeDefined();
    expect(a.line).toContain("journey");
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

  it("单元 1 的 30 个词都 build 出非空的物件：有网格、有三角面、大小合理、名字带词 id", () => {
    const kit = createSceneKit("low");
    for (const id of unit1.word_ids) {
      const g = buildWordObject(id, kit, undefined, vocab.get(id));
      expect(g.name).toBe(`word:${id}`);
      expect(g.userData.wordId).toBe(id);
      expect(g.userData.archetype, id).toBe(MEMORY_OBJECTS[id].archetype);
      expect(g.children.length, id).toBeGreaterThan(0);
      expect(triangles(g), id).toBeGreaterThan(12);
      const size = new THREE.Box3().setFromObject(g).getSize(new THREE.Vector3());
      expect(Math.max(size.x, size.y, size.z), id).toBeGreaterThan(0.2);
      expect(Math.max(size.x, size.y, size.z), id).toBeLessThan(1.2);
    }
  });

  it("旁白是第二人称、一句完整的英语，自然地用到这个词", () => {
    for (const id of unit1.word_ids) {
      const line = MEMORY_OBJECTS[id].line;
      expect(line, id).toMatch(/\b[Yy]ou(r)?\b/);
      expect(line, id).toMatch(/^[A-Z].*\.$/);
      expect(line.split(/\s+/).length, id).toBeLessThanOrEqual(16);
    }
  });

  it("三十个词的物件各不相同：同一个原型最多被两个词共用，触碰阶段的六个词外形互不相同", () => {
    const count = new Map<string, number>();
    for (const id of unit1.word_ids) count.set(MEMORY_OBJECTS[id].archetype, (count.get(MEMORY_OBJECTS[id].archetype) ?? 0) + 1);
    for (const [name, n] of count) expect(n, name).toBeLessThanOrEqual(2);
    const six = ["rw3_unit01_13", "rw3_unit01_04", "rw3_unit01_21", "rw3_unit01_03", "rw3_unit01_22", "rw3_unit01_02"];
    expect(new Set(six.map((id) => MEMORY_OBJECTS[id].archetype)).size).toBe(6);
  });

  it("设计稿指定的物件：device 是桌上一排手机，notification 是亮着的手机，message 是屏幕上的消息气泡，connection 是两部手机之间的线，lonely 是空椅子", () => {
    expect(MEMORY_OBJECTS.rw3_unit01_13.archetype).toBe("phoneRow");
    expect(MEMORY_OBJECTS.rw3_unit01_04.archetype).toBe("phone");
    expect(MEMORY_OBJECTS.rw3_unit01_21.archetype).toBe("chatScreen");
    expect(MEMORY_OBJECTS.rw3_unit01_02.archetype).toBe("cable");
    expect(MEMORY_OBJECTS.rw3_unit01_22.archetype).toBe("emptyChair");
  });

  it("每个词都有触碰动画（verb），六种动画都被用到", () => {
    const verbs = new Set(unit1.word_ids.map((id) => MEMORY_OBJECTS[id].verb));
    expect([...verbs].sort()).toEqual(["bloom", "flip", "glow", "open", "ring", "spin"]);
  });
});
