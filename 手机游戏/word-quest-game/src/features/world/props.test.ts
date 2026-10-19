import * as THREE from "three";
import { expect, it } from "vitest";
import { leafCard, withConstUV } from "./props";
import { seededRand } from "./utils";

it('叶片卡片不会采到给实心树冠预留的白色色块', () => {
  const geometry = leafCard(new THREE.Vector3(), 1, seededRand(7), 1, {
    m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), c: new THREE.Color(),
  });
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    expect(uv.getX(i)).toBeGreaterThanOrEqual(0.05 - 1e-6);
    expect(uv.getX(i)).toBeLessThanOrEqual(1);
    expect(uv.getY(i)).toBeGreaterThanOrEqual(0);
    expect(uv.getY(i)).toBeLessThanOrEqual(1);
  }
  geometry.dispose();
});

it('实心树冠仍取白色色块，顶点色不会被叶片透明区域裁掉', () => {
  const geometry = withConstUV(new THREE.BoxGeometry());
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    expect(uv.getX(i)).toBeLessThan(10 / 256);
    expect(uv.getY(i)).toBeGreaterThan(1 - 10 / 256);
  }
  geometry.dispose();
});
