import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { bookPageHeight, createBookPageBlock, createBookPrint, createBookRibbon, createPlanterRim } from "./propGeometry";

describe('近景道具的几何结构', () => {
  it('纸页中央是装订沟，外侧拱起，左右镜像且尺寸保持米制', () => {
    expect(bookPageHeight(0.5)).toBeGreaterThan(bookPageHeight(0));
    const right = createBookPageBlock(1);
    const left = createBookPageBlock(-1);
    right.computeBoundingBox();
    left.computeBoundingBox();
    expect(right.boundingBox!.max.x).toBeCloseTo(-left.boundingBox!.min.x);
    expect(right.boundingBox!.min.x).toBeCloseTo(-left.boundingBox!.max.x);
    expect(right.boundingBox!.max.z - right.boundingBox!.min.z).toBeCloseTo(0.274);
    expect(right.boundingBox!.max.y).toBeLessThan(0.05);
    expect(right.boundingBox!.min.y).toBeGreaterThan(0.01);
    for (const geometry of [right, left]) {
      for (const attribute of Object.values(geometry.attributes)) {
        expect(Array.from(attribute.array).every(Number.isFinite)).toBe(true);
      }
      geometry.dispose();
    }
  });

  it.each([-1, 1] as const)('第 %s 页印刷朝上，沿纸面弯曲并留在页面内', (side) => {
    const geometry = createBookPrint(side);
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    for (let i = 0; i < position.count; i++) {
      const x = Math.abs(position.getX(i));
      expect(x).toBeGreaterThan(0.004);
      expect(x).toBeLessThan(0.205);
      expect(Math.abs(position.getZ(i))).toBeLessThan(0.137);
      expect(position.getY(i)).toBeCloseTo(bookPageHeight((x - 0.004) / 0.201) + 0.001, 5);
      expect(normal.getY(i)).toBeGreaterThan(0.9);
    }
    geometry.dispose();
  });

  it('石圈中央保持开口，顶部边缘有真实厚度', () => {
    const geometry = createPlanterRim(0.5);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    mesh.updateMatrixWorld(true);
    const ray = new THREE.Raycaster(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0));
    expect(ray.intersectObject(mesh)).toHaveLength(0);
    ray.ray.origin.x = 0.48;
    const hits = ray.intersectObject(mesh);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].point.y).toBeCloseTo(0.055);
    geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  });

  it('书签过页边之后下垂，纸面内的部分保持贴合', () => {
    const geometry = createBookRibbon();
    const positions = geometry.attributes.position;
    const start = positions.getY(0);
    let last = start;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      if (positions.getZ(i) < 0.137) expect(y).toBeCloseTo(start);
      expect(y).toBeLessThanOrEqual(last + 1e-6);
      last = y;
    }
    expect(last).toBeLessThan(start - 0.025);
    expect(last).toBeGreaterThan(0.01);
    geometry.dispose();
  });
});
