import { afterEach, describe, expect, it } from "vitest";
import { headGeometry, upperSleeveGeometry } from "./avatarBody";

describe("avatarBody 人体轮廓采样边界", () => {
  const geometries = new Set<ReturnType<typeof headGeometry>>();
  afterEach(() => {
    geometries.forEach((geometry) => geometry.dispose());
    geometries.clear();
  });

  it("完整保留头颅顶部，网格在采样盒边缘之前闭合", () => {
    const geometry = headGeometry(0.72);
    geometries.add(geometry);
    geometry.computeBoundingBox();
    const bounds = geometry.boundingBox!;
    expect(bounds.max.y).toBeGreaterThan(0.295);
    expect(bounds.max.y).toBeLessThan(0.345); // 采样盒顶部为 .36，头顶与边界保留余量
    expect(bounds.min.y).toBeGreaterThan(-0.05);
    expect(bounds.min.y).toBeLessThan(0.02);
  });

  it("肩袖上缘连续圆合，不贴住 marching-cubes 采样盒的平面边界", () => {
    const geometry = upperSleeveGeometry(0.72);
    geometries.add(geometry);
    geometry.computeBoundingBox();
    const bounds = geometry.boundingBox!;
    expect(bounds.max.y).toBeGreaterThan(0.06);
    expect(bounds.max.y).toBeLessThan(0.085); // 采样盒顶部为 .09，余量排除平切
    expect(bounds.min.y).toBeGreaterThan(-0.35);
    expect(bounds.min.y).toBeLessThan(-0.31);
  });
});
