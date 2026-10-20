import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { PICK_RADIUS_PX, pickNearest, projectToPixels } from "./Interaction";

describe("屏幕空间拾取", () => {
  const pts = [
    { x: 100, y: 100, radiusPx: 4 },
    { x: 400, y: 300, radiusPx: 4 },
    { x: 130, y: 100, radiusPx: 4 },
  ];

  it("半径内取最近的；刚好在 36 px 之内也能点中（远处只有几个像素的目标）", () => {
    expect(pickNearest(pts, 105, 100)).toBe(0);
    expect(pickNearest(pts, 118, 100)).toBe(2); // 离 #2 近
    expect(pickNearest(pts, 400 + PICK_RADIUS_PX - 1, 300)).toBe(1);
  });

  it("超出半径点空；在相机后面的目标不参与；投影半径大的目标拾取范围更大", () => {
    expect(pickNearest(pts, 250, 200)).toBe(-1);
    expect(pickNearest([{ x: 10, y: 10, radiusPx: 4, behind: true }], 10, 10)).toBe(-1);
    expect(pickNearest([{ x: 300, y: 300, radiusPx: 90 }], 300 + 80, 300)).toBe(0);
  });

  it("projectToPixels：相机前方的点落在画布内，后方的点标记 behind", () => {
    const cam = new THREE.PerspectiveCamera(46, 800 / 540, 0.1, 100);
    cam.position.set(0, 1.5, 6);
    cam.lookAt(0, 1, 0);
    cam.updateMatrixWorld(true);
    const p = projectToPixels(new THREE.Vector3(0, 1, 0), cam, 800, 540);
    expect(p.behind).toBe(false);
    expect(p.x).toBeGreaterThan(300);
    expect(p.x).toBeLessThan(500);
    const q = projectToPixels(new THREE.Vector3(0, 1, 12), cam, 800, 540);
    expect(q.behind).toBe(true);
  });
});
