import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import { MemoryAir } from "./MemoryAir";
const bounds = { minX: -5, maxX: 5, minZ: -3.3, maxZ: 3.3 };

describe("窗边浮尘", () => {
  it("分档保持固定点数，坐标可复现并落在窗边范围", () => {
    for (const [quality, count] of [["low",80],["med",160],["high",240]] as const) {
      const a = new MemoryAir(bounds, quality, false);
      const b = new MemoryAir(bounds, quality, false);
      const p = a.object.geometry.getAttribute("position");
      expect(p.count).toBe(count);
      expect(Array.from(p.array)).toEqual(Array.from(b.object.geometry.getAttribute("position").array));
      for (let i=0; i<p.count; i++) {
        expect(p.getX(i)).toBeGreaterThanOrEqual(-3);
        expect(p.getX(i)).toBeLessThanOrEqual(3);
        expect(p.getY(i)).toBeGreaterThanOrEqual(.25);
        expect(p.getY(i)).toBeLessThanOrEqual(2.85);
        expect(p.getZ(i)).toBeGreaterThanOrEqual(bounds.minZ);
        expect(p.getZ(i)).toBeLessThanOrEqual(.8);
      }
      expect(a.object.material.depthWrite).toBe(false);
      expect(a.object.material.blending).toBe(THREE.NormalBlending);
      a.dispose(); b.dispose();
    }
  });
  it("空舞台不显示；随房间重现淡入，减少动态模式固定时间", () => {
    const air = new MemoryAir(bounds, "low", true);
    air.update(10,0,720,46);
    expect(air.object.visible).toBe(false);
    air.update(15,1,720,46);
    expect(air.object.visible).toBe(true);
    expect(air.object.material.uniforms.uTime.value).toBe(0);
    expect(air.object.material.uniforms.uOpacity.value).toBeCloseTo(.65);
    expect(air.object.material.uniforms.uScale.value).toBeGreaterThan(0);
    air.dispose();
  });
  it("更新不替换缓冲，销毁幂等并从场景移除", () => {
    const air = new MemoryAir(bounds,"high",false);
    const scene = new THREE.Scene(); scene.add(air.object);
    const attribute = air.object.geometry.getAttribute("position");
    const geometry = vi.spyOn(air.object.geometry,"dispose");
    const material = vi.spyOn(air.object.material,"dispose");
    air.update(1,.5,1080,50); air.update(2,.7,1080,50);
    expect(air.object.geometry.getAttribute("position")).toBe(attribute);
    expect(air.object.material.uniforms.uTime.value).toBe(2);
    air.dispose(); air.dispose(); air.update(9,1,1080,50);
    expect(geometry).toHaveBeenCalledOnce(); expect(material).toHaveBeenCalledOnce();
    expect(air.object.parent).toBeNull();
    expect(air.object.material.uniforms.uTime.value).toBe(2);
  });
});
