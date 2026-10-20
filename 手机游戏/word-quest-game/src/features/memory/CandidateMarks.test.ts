import * as THREE from "three";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TargetBeacons } from "./CandidateMarks";
import { installDomStubs } from "./testDom";

describe("TargetBeacons：触碰目标的灯柱", () => {
  beforeEach(installDomStubs);
  afterEach(() => vi.unstubAllGlobals());

  it("每个目标一道灯柱 + 一颗光点；屏幕大小恒定、不被遮挡；触碰后淡出并移除", () => {
    const scene = new THREE.Scene();
    const beacons = new TargetBeacons(scene);
    const obj = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3));
    obj.position.set(1, 0.8, -0.5);
    scene.add(obj);
    beacons.add("a", obj);
    beacons.add("a", obj); // 重复添加无效
    expect(beacons.count).toBe(1);
    for (let i = 0; i < 90; i++) beacons.update(1 / 60);
    const sprites: THREE.Sprite[] = [];
    scene.traverse((o) => ((o as THREE.Sprite).isSprite ? sprites.push(o as THREE.Sprite) : 0));
    expect(sprites).toHaveLength(2);
    for (const s of sprites) {
      const m = s.material as THREE.SpriteMaterial;
      expect(m.sizeAttenuation).toBe(false);
      expect(m.depthTest).toBe(false);
      expect(m.opacity).toBeGreaterThan(0.3);
    }
    // 灯柱在物件头顶
    expect(Math.min(...sprites.map((s) => s.position.y))).toBeGreaterThan(0.8);
    beacons.remove("a");
    for (let i = 0; i < 90; i++) beacons.update(1 / 60);
    const left: THREE.Object3D[] = [];
    scene.traverse((o) => ((o as THREE.Sprite).isSprite ? left.push(o) : 0));
    expect(left).toHaveLength(0);
    beacons.dispose();
  });
});
