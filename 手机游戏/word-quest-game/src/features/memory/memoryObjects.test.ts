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
});
