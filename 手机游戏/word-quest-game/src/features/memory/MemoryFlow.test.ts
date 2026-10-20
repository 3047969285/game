import { describe, expect, it } from "vitest";
import { MemoryFlow } from "./MemoryFlow";

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

describe("MemoryFlow", () => {
  it("按画质控制单次 Points 的粒子预算", () => {
    const high = new MemoryFlow("high");
    const med = new MemoryFlow("med");
    const low = new MemoryFlow("low");

    expect(high.object.geometry.getAttribute("aInfo").count).toBe(384);
    expect(med.object.geometry.getAttribute("aInfo").count).toBe(278);
    expect(low.object.geometry.getAttribute("aInfo").count).toBe(140);
    expect(high.object.isPoints && med.object.isPoints && low.object.isPoints).toBe(true);

    high.dispose();
    med.dispose();
    low.dispose();
  });

  it("reduced motion 固定环境流动，同时保留可见粒子", () => {
    const flow = new MemoryFlow("low", { reducedMotion: true });
    const material = flow.object.material as unknown as { uniforms: { uT: { value: number } } };

    flow.setSpeaking(true);
    flow.setSentence("memory");
    flow.update(2);

    expect(material.uniforms.uT.value).toBe(0);
    expect(flow.object.geometry.getAttribute("aInfo").count).toBeGreaterThan(0);
    flow.dispose();
  });

  it("字母亮度在换字阈值内归零，且着色器相位速度与 CPU 一致", () => {
    const flow = new MemoryFlow("low");
    const shader = (flow.object.material as unknown as { vertexShader: string }).vertexShader;

    expect(shader).toContain("uT * 0.35 * aInfo.y");
    expect(shader).toContain("smoothstep(0.01, 0.04, letterPhase * letterPhase) * 0.40");
    expect(smoothstep(0.01, 0.04, 0.009)).toBe(0);
    expect(smoothstep(0.01, 0.04, 0.01)).toBe(0);
    expect(smoothstep(0.01, 0.04, 0.025)).toBeGreaterThan(0);

    flow.dispose();
  });
});
