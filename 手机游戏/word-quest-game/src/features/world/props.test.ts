import * as THREE from "three";
import { expect, it } from "vitest";
import { atlasRect, FOLIAGE_ATLAS_CELLS } from "./foliageTextures";
import { leafCard } from "./props";
import { seededRand } from "./utils";

// 叶片图集（阶段 3）没有给实心树冠预留的白色色块了；同样要防的是卡片采到格子外（相邻叶簇或边距）出现悬空色块。
it("叶片卡片的 UV 只落在灌木叶簇这一格内", () => {
  const [u0, v0, u1, v1] = atlasRect(FOLIAGE_ATLAS_CELLS.shrub);
  const rnd = seededRand(7);
  for (let n = 0; n < 20; n++) {
    const geometry = leafCard(new THREE.Vector3(), 1, rnd, n / 10 - 1);
    const uv = geometry.attributes.uv;
    expect(uv.count).toBeGreaterThan(0);
    for (let i = 0; i < uv.count; i++) {
      expect(uv.getX(i)).toBeGreaterThanOrEqual(u0 - 1e-6);
      expect(uv.getX(i)).toBeLessThanOrEqual(u1 + 1e-6);
      expect(uv.getY(i)).toBeGreaterThanOrEqual(v0 - 1e-6);
      expect(uv.getY(i)).toBeLessThanOrEqual(v1 + 1e-6);
    }
    geometry.dispose();
  }
});
