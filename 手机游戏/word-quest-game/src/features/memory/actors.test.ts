import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { spawnActor } from "./actors";
import { PROLOGUE_SCRIPT } from "./scripts/prologue";

function visibleVariant(root: THREE.Object3D): string[] {
  return root.children.filter((c) => c.visible).map((c) => c.name);
}

describe("actors：老年的他慢慢伸手", () => {
  const actor = PROLOGUE_SCRIPT.actors[0];

  it("初始双手放在膝上（lap），reach 在约 1.5 秒里依次经过 reach1..3 到最终姿势，再不抖动", () => {
    const h = spawnActor(actor, ["reach"]);
    expect(visibleVariant(h.root)).toEqual(["old2090:lap"]);
    h.setPose("reach");
    const seen: string[] = [];
    for (let t = 0; t < 2; t += 1 / 60) {
      h.update(1 / 60, t);
      const v = visibleVariant(h.root);
      expect(v).toHaveLength(1);
      if (seen[seen.length - 1] !== v[0]) seen.push(v[0]);
    }
    expect(seen).toEqual(["old2090:lap", "old2090:reach1", "old2090:reach2", "old2090:reach3", "old2090:reach"]);
    expect(h.pose).toBe("reach");
    // 动作刚开始的 0.6 秒里还没到最终姿势
    const h2 = spawnActor(actor, ["reach"]);
    h2.setPose("reach");
    for (let t = 0; t < 0.6; t += 1 / 60) h2.update(1 / 60, t);
    expect(visibleVariant(h2.root)[0]).not.toBe("old2090:reach");
  });

  it("坐姿的 lap / reach 抬高到座面上，眼睛位置在座椅上方", () => {
    const h = spawnActor(actor, ["reach"]);
    h.root.position.set(0, 0, 0);
    const eye = h.eyePosition(new THREE.Vector3());
    expect(eye.y).toBeGreaterThan(1.2);
    expect(eye.y).toBeLessThan(1.6);
  });
});
