import { describe, expect, it } from "vitest";
import { AdaptiveScaler } from "./adaptiveScaler";

/** 以固定帧耗时喂给 scaler 若干秒，返回期间发生的调整 */
function feed(s: AdaptiveScaler, ms: number, seconds: number): number[] {
  const changes: number[] = [];
  const dt = Math.max(ms, 1) / 1000;
  for (let t = 0; t < seconds; t += dt) {
    const r = s.push(ms, dt);
    if (r !== null) changes.push(r);
  }
  return changes;
}

describe("AdaptiveScaler 自适应分辨率", () => {
  it("帧耗时 > 18 ms 持续 2 秒才降一档；短暂卡顿不降", () => {
    const s = new AdaptiveScaler({ max: 2, min: 0.75, step: 0.25 });
    expect(feed(s, 25, 1.5)).toEqual([]); // 不足 2 秒
    expect(s.ratio).toBe(2);
    feed(s, 8, 3); // 恢复正常，计时清零
    expect(feed(s, 25, 1.5)).toEqual([]);
    feed(s, 8, 1);
    const changes = feed(s, 25, 3);
    expect(changes[0]).toBe(1.75);
  });

  it("降档之后冷却 2 秒，再继续慢才继续降，逐级降到下限不再往下", () => {
    const s = new AdaptiveScaler({ max: 2, min: 0.75, step: 0.25 });
    const changes = feed(s, 30, 40);
    expect(changes).toEqual([1.75, 1.5, 1.25, 1, 0.75]);
    expect(s.ratio).toBe(0.75);
    // 每次调整的间隔不少于 hold(2s) + 冷却(2s) 的量级
    const s2 = new AdaptiveScaler({ max: 2, min: 0.75, step: 0.25 });
    let t = 0;
    const times: number[] = [];
    for (let i = 0; i < 3000; i++) {
      t += 0.03;
      if (s2.push(30, 0.03) !== null) times.push(t);
    }
    for (let i = 1; i < times.length; i++) expect(times[i] - times[i - 1]).toBeGreaterThanOrEqual(3.9);
  });

  it("帧耗时 < 12 ms 持续 2 秒才升一档，不超过上限", () => {
    const s = new AdaptiveScaler({ max: 2, min: 0.75, step: 0.25, initial: 1 });
    expect(feed(s, 8, 1.5)).toEqual([]);
    const changes = feed(s, 8, 30);
    expect(changes).toEqual([1.25, 1.5, 1.75, 2]);
    expect(s.ratio).toBe(2);
    expect(feed(s, 8, 10)).toEqual([]);
  });

  it("12–18 ms 的迟滞带内不动，并且会重置计时", () => {
    const s = new AdaptiveScaler({ max: 2, min: 0.75, step: 0.25, initial: 1.5 });
    expect(feed(s, 15, 30)).toEqual([]);
    expect(s.ratio).toBe(1.5);
    // 慢 1.5 秒 → 带内 → 慢 1.5 秒：不累计
    feed(s, 25, 1.5);
    feed(s, 15, 1);
    expect(feed(s, 25, 1.5)).toEqual([]);
  });

  it("刚升档就被迫降回：封顶，之后一段时间内不再往上试", () => {
    const s = new AdaptiveScaler({ max: 2, min: 0.75, step: 0.25, initial: 1.5 });
    expect(feed(s, 8, 2.5)).toEqual([1.75]);
    expect(feed(s, 30, 6.5)).toEqual([1.5]); // 升档后不到 12 秒就被迫降回 → 封顶 1.5
    const again = feed(s, 8, 12);
    expect(again).toEqual([]);
    expect(s.ratio).toBe(1.5);
    feed(s, 8, 40);
    expect(s.ratio).toBeGreaterThan(1.5); // 封顶（30 秒）解除后可以再升
  });

  it("切后台产生的超长帧不计入", () => {
    const s = new AdaptiveScaler({ max: 2 });
    for (let i = 0; i < 20; i++) expect(s.push(5000, 5)).toBeNull();
    expect(s.ratio).toBe(2);
    expect(s.push(0, 0.016)).toBeNull();
  });

  it("上限低于 0.75 时下限跟随上限；setMax 会夹住当前值", () => {
    const s = new AdaptiveScaler({ max: 0.5 });
    expect(feed(s, 40, 20)).toEqual([]);
    const t = new AdaptiveScaler({ max: 2 });
    t.setMax(1.25);
    expect(t.ratio).toBe(1.25);
  });
});
