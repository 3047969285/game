import { describe, expect, it } from "vitest";
import { EYE_KEYS, EyeController, eyeBlur, eyeExposure, eyeLuminanceGain, eyeOpenAmount, eyeTimelineEnd, lidCenterMask } from "./eyeOpen";

describe("睁眼时间曲线", () => {
  it("开始是全黑闭眼，结束是完全睁开、聚焦、曝光为 1", () => {
    expect(eyeOpenAmount(0)).toBe(0);
    expect(lidCenterMask(eyeOpenAmount(0))).toBe(0);
    const end = eyeTimelineEnd();
    expect(eyeOpenAmount(end)).toBe(1);
    expect(eyeBlur(end)).toBe(0);
    expect(eyeExposure(end)).toBe(1);
    expect(eyeBlur(0.5)).toBeGreaterThan(0.9); // 一开始是虚焦
  });

  it("亮度增益（曝光 × 眼睑中心透光）全程不超过 1，没有过冲，也不会出现 NaN", () => {
    let max = 0;
    for (let t = -1; t <= 12; t += 1 / 120) {
      const g = eyeLuminanceGain(t);
      expect(Number.isFinite(g)).toBe(true);
      expect(g).toBeGreaterThanOrEqual(0);
      max = Math.max(max, g);
      expect(eyeOpenAmount(t)).toBeLessThanOrEqual(1);
      expect(eyeOpenAmount(t)).toBeGreaterThanOrEqual(0);
      expect(eyeExposure(t)).toBeLessThanOrEqual(1);
    }
    expect(max).toBeLessThanOrEqual(1);
    expect(max).toBeCloseTo(1, 3);
  });

  it("曝光单调上升，虚焦单调下降（没有忽明忽暗）", () => {
    let prevE = -1;
    let prevB = 2;
    for (let t = 0; t <= 8; t += 1 / 60) {
      const e = eyeExposure(t);
      const b = eyeBlur(t);
      expect(e).toBeGreaterThanOrEqual(prevE - 1e-9);
      expect(b).toBeLessThanOrEqual(prevB + 1e-9);
      prevE = e;
      prevB = b;
    }
  });

  it("眨眼次数为一到两次：开度曲线的局部极大之间的回落段数", () => {
    let blinks = 0;
    let prev = 0;
    let dir = 1;
    for (let t = 0; t <= 7; t += 1 / 120) {
      const v = eyeOpenAmount(t);
      if (v < prev - 1e-6 && dir > 0) {
        blinks++;
        dir = -1;
      } else if (v > prev + 1e-6 && dir < 0) dir = 1;
      prev = v;
    }
    expect(blinks).toBeGreaterThanOrEqual(1);
    expect(blinks).toBeLessThanOrEqual(2);
  });

  it("每个关键帧开度在 0..1 内，时间严格递增；曲线连续（相邻采样差很小）", () => {
    for (let i = 0; i < EYE_KEYS.length; i++) {
      expect(EYE_KEYS[i][1]).toBeGreaterThanOrEqual(0);
      expect(EYE_KEYS[i][1]).toBeLessThanOrEqual(1);
      if (i) expect(EYE_KEYS[i][0]).toBeGreaterThan(EYE_KEYS[i - 1][0]);
    }
    let prev = eyeOpenAmount(0);
    for (let t = 1 / 60; t < 8; t += 1 / 60) {
      const v = eyeOpenAmount(t);
      expect(Math.abs(v - prev)).toBeLessThan(0.05);
      prev = v;
    }
  });

  it("减弱动效：不眨眼、无虚焦、曝光恒定，平滑睁开", () => {
    expect(eyeBlur(0.3, true)).toBe(0);
    expect(eyeExposure(0, true)).toBe(1);
    let prev = 0;
    for (let t = 0; t <= 1.6; t += 1 / 60) {
      const v = eyeOpenAmount(t, true);
      expect(v).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = v;
    }
    expect(eyeTimelineEnd(true)).toBeLessThan(eyeTimelineEnd(false));
  });
});

describe("EyeController", () => {
  const step = (c: EyeController, seconds: number, dt = 1 / 60): void => {
    for (let t = 0; t < seconds; t += dt) c.update(dt);
  };

  it("默认闭眼；startOpening 后随时间线睁开并 resolve", async () => {
    const c = new EyeController();
    expect(c.open).toBe(0);
    expect(c.active).toBe(true);
    let done = false;
    void c.startOpening().then(() => (done = true));
    step(c, 3);
    expect(c.open).toBeGreaterThan(0);
    expect(c.awakening).toBe(true);
    step(c, 5);
    await Promise.resolve();
    expect(done).toBe(true);
    expect(c.open).toBe(1);
    expect(c.blur).toBe(0);
    expect(c.active).toBe(false); // 完全睁开且聚焦，通道可以关闭
  });

  it("全程亮度不超过 1：open ≤ 1，exposure ≤ 1", () => {
    const c = new EyeController();
    void c.startOpening();
    for (let t = 0; t < 9; t += 1 / 60) {
      c.update(1 / 60);
      expect(c.open).toBeLessThanOrEqual(1);
      expect(c.exposure).toBeLessThanOrEqual(1);
      expect(c.open * c.exposure).toBeLessThanOrEqual(1);
    }
  });

  it("close 慢慢闭眼到 0；单调不过冲", async () => {
    const c = new EyeController();
    c.openNow();
    let done = false;
    void c.close(1.2).then(() => (done = true));
    let prev = 1;
    for (let t = 0; t < 1.4; t += 1 / 60) {
      c.update(1 / 60);
      expect(c.open).toBeLessThanOrEqual(prev + 1e-9);
      prev = c.open;
    }
    await Promise.resolve();
    expect(done).toBe(true);
    expect(c.open).toBe(0);
  });

  it("blink：在全黑的瞬间调用 mid（只一次），之后恢复完全睁开", async () => {
    const c = new EyeController();
    c.openNow();
    let mids = 0;
    let openAtMid = -1;
    const p = c.blink(() => {
      mids++;
      openAtMid = c.open;
    });
    let done = false;
    void p.then(() => (done = true));
    step(c, 0.7);
    await Promise.resolve();
    expect(mids).toBe(1);
    expect(openAtMid).toBeLessThan(0.02);
    expect(done).toBe(true);
    expect(c.open).toBeCloseTo(1, 6);
  });

  it("睁眼时间线进行中眨眼：不打断时间线，曝光 / 虚焦继续推进", () => {
    const c = new EyeController();
    void c.startOpening();
    step(c, 3);
    const blurBefore = c.blur;
    void c.blink(() => undefined);
    step(c, 0.2);
    expect(c.blur).toBeLessThan(blurBefore);
    expect(c.awakening).toBe(true);
    step(c, 6);
    expect(c.open).toBe(1);
  });
});
