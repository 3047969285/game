import { describe, expect, it } from "vitest";
import { hexToRgb, hueSatLight, LOOKS, LookBlender, lerpLook, lookFor, lookKeyColors, resolveLook, warmth, emptyResolved, LOOK_COLOR_KEYS, LOOK_NUMBER_KEYS } from "./memoryLooks";

const UNITS = ["unit01", "unit02", "unit03", "unit04", "unit05", "unit06"];

describe("记忆色调数据", () => {
  it("六个单元都有各自的 look，字段齐全且数值在合理范围", () => {
    for (const id of UNITS) {
      const look = LOOKS[id];
      expect(look, id).toBeTruthy();
      expect(look.id).toBe(id);
      for (const k of LOOK_COLOR_KEYS) expect(Number.isInteger(look[k]) && look[k] >= 0 && look[k] <= 0xffffff, `${id}.${k}`).toBe(true);
      for (const k of LOOK_NUMBER_KEYS) expect(Number.isFinite(look[k]), `${id}.${k}`).toBe(true);
      expect(look.tintAmt).toBeLessThanOrEqual(0.3);
      expect(look.lift).toBeLessThanOrEqual(0.05);
      expect(look.aberration).toBeLessThanOrEqual(0.004);
      expect(look.scanline).toBeLessThanOrEqual(0.1);
    }
    expect(new Set(UNITS.map((u) => LOOKS[u].skyTop)).size).toBe(6);
  });

  it("关键色平均色温不偏暖：r - b 的平均值不高于 0.06，太阳 / 亮部色偏不高于 0.1", () => {
    for (const id of [...UNITS, "memory2090", "neutral"]) {
      const look = LOOKS[id];
      const mean = lookKeyColors(look).reduce((a, hex) => a + warmth(hexToRgb(hex)), 0) / lookKeyColors(look).length;
      expect(mean, `${id} 平均暖度`).toBeLessThanOrEqual(0.06);
      expect(warmth(hexToRgb(look.sun)), `${id} 太阳`).toBeLessThanOrEqual(0.1);
      expect(warmth(hexToRgb(look.highlightTint)), `${id} 亮部色偏`).toBeLessThanOrEqual(0.1);
      // 暗部色偏必须是冷色
      expect(warmth(hexToRgb(look.shadowTint)), `${id} 暗部色偏`).toBeLessThan(0);
    }
  });

  it("关键色里没有饱和的黄色相（40°–75°）", () => {
    for (const id of [...UNITS, "memory2090", "neutral"]) {
      for (const hex of lookKeyColors(LOOKS[id])) {
        const { h, s, l } = hueSatLight(hexToRgb(hex));
        const yellow = h >= 40 && h <= 75 && s > 0.25 && l > 0.25;
        expect(yellow, `${id} 0x${hex.toString(16)}`).toBe(false);
      }
    }
  });

  it("每个单元的特征色相符合设定", () => {
    const hue = (hex: number): number => hueSatLight(hexToRgb(hex)).h;
    expect(hue(LOOKS.unit01.dustA)).toBeGreaterThan(170); // 青 / 冰蓝
    expect(hue(LOOKS.unit01.dustA)).toBeLessThan(205);
    expect(hue(LOOKS.unit05.dustA)).toBeGreaterThan(240); // 靛 / 紫
    expect(hue(LOOKS.unit05.skyMid)).toBeGreaterThan(225);
    expect(hue(LOOKS.unit06.dustA)).toBeGreaterThan(140); // 翡翠
    expect(hue(LOOKS.unit06.dustA)).toBeLessThan(170);
    expect(hue(LOOKS.unit03.dustB)).toBeLessThan(15); // 珊瑚
    expect(hueSatLight(hexToRgb(LOOKS.unit04.skyMid)).s).toBeLessThan(0.12); // 石墨：近乎中性
  });

  it("lookFor 对未知单元回退到冷白", () => {
    expect(lookFor("unit03").id).toBe("unit03");
    expect(lookFor("nope").id).toBe("neutral");
    expect(lookFor(undefined).id).toBe("neutral");
  });

  it("lerpLook 端点正确，且无分配地写回 out", () => {
    const a = resolveLook(LOOKS.unit01);
    const b = resolveLook(LOOKS.unit05);
    const out = emptyResolved();
    lerpLook(a, b, 0, out);
    expect(out.skyTop.r).toBeCloseTo(a.skyTop.r, 6);
    lerpLook(a, b, 1, out);
    expect(out.skyTop.b).toBeCloseTo(b.skyTop.b, 6);
    lerpLook(a, b, 0.5, out);
    expect(out.exposure).toBeCloseTo((a.exposure + b.exposure) / 2, 6);
  });
});

describe("LookBlender：2 秒平滑过渡", () => {
  it("2 秒内 smoothstep 过渡到目标，起止速度为 0，单调", () => {
    const blender = new LookBlender(LOOKS.unit01);
    blender.setTarget(LOOKS.unit05, 2);
    expect(blender.settled).toBe(false);
    const start = blender.current.skyMid.b;
    const end = resolveLook(LOOKS.unit05).skyMid.b;
    let prev = start;
    let firstStep = 0;
    let lastStep = 0;
    for (let i = 0; i < 120; i++) {
      blender.update(1 / 60);
      const v = blender.current.skyMid.b;
      expect(Math.sign(v - prev) * Math.sign(end - start)).toBeGreaterThanOrEqual(0);
      if (i === 0) firstStep = Math.abs(v - prev);
      if (i === 119) lastStep = Math.abs(v - prev);
      prev = v;
    }
    expect(blender.settled).toBe(true);
    expect(blender.current.skyMid.b).toBeCloseTo(end, 5);
    const total = Math.abs(end - start);
    expect(firstStep).toBeLessThan(total * 0.01);
    expect(lastStep).toBeLessThan(total * 0.01);
  });

  it("中途再次切换从当前混合值起步，不跳变", () => {
    const blender = new LookBlender(LOOKS.unit01);
    blender.setTarget(LOOKS.unit02, 2);
    for (let i = 0; i < 60; i++) blender.update(1 / 60);
    const mid = blender.current.fog.r;
    blender.setTarget(LOOKS.unit06, 2);
    blender.update(0);
    expect(blender.current.fog.r).toBeCloseTo(mid, 6);
  });

  it("seconds=0 立即切换并递增 version", () => {
    const blender = new LookBlender(LOOKS.unit01);
    const v = blender.version;
    blender.setTarget(LOOKS.unit04, 0);
    expect(blender.version).toBe(v + 1);
    expect(blender.current.skyTop.r).toBeCloseTo(resolveLook(LOOKS.unit04).skyTop.r, 6);
    expect(blender.settled).toBe(true);
  });
});
