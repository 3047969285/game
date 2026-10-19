import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createSceneKit } from "../world/sceneProps";
import { buildStage, getStage, stageTargets } from "./stages";

describe("stages", () => {
  it("emptyRoom：顶层子 Group 名与 targets 一一对应，且都有网格", () => {
    const group = buildStage("emptyRoom", createSceneKit("low"));
    const names = group.children.map((c) => c.name).sort();
    expect(names).toEqual([...stageTargets("emptyRoom")].sort());
    for (const child of group.children) {
      let meshes = 0;
      child.traverse((o) => ((o as THREE.Mesh).isMesh ? meshes++ : 0));
      expect(meshes, child.name).toBeGreaterThan(0);
    }
  });

  it("emptyRoom 绘制调用预算：舞台部分网格数 ≤ 90（整个回忆 ≤ 150）", () => {
    const group = buildStage("emptyRoom", createSceneKit("high"));
    let meshes = 0;
    group.traverse((o) => ((o as THREE.Mesh).isMesh ? meshes++ : 0));
    expect(meshes).toBeLessThanOrEqual(90);
  });

  it("摆放位都在可走范围附近，机位朝向房间内部", () => {
    const def = getStage("emptyRoom");
    const all = [...def.slots.table, ...def.slots.hover, ...def.slots.floor];
    expect(all.length).toBeGreaterThanOrEqual(14);
    for (const p of all) {
      expect(p.x).toBeGreaterThan(def.bounds.minX - 1.5);
      expect(p.x).toBeLessThan(def.bounds.maxX + 1.5);
      expect(p.z).toBeGreaterThan(def.bounds.minZ - 1.5);
      expect(p.z).toBeLessThan(def.bounds.maxZ + 1.5);
    }
    for (const s of def.shots) {
      expect(Math.abs(s.to.x)).toBeLessThan(5.5);
      expect(Math.abs(s.to.z)).toBeLessThan(4.5);
    }
  });

  it("未知舞台抛错", () => {
    expect(() => getStage("nowhere")).toThrow();
  });
});
