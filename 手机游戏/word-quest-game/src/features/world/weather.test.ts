import { describe, expect, it } from "vitest";
import { LOOKS, resolveLook, emptyResolved } from "../memory/memoryLooks";
import { foliageWindStrength, isWeatherKind, maxBudget, precipitationBudget, UNIT_DEFAULT_WEATHER, WEATHER_KINDS, WEATHER_PRESETS, WeatherState, weatherTint } from "./weather";

function run(w: WeatherState, seconds: number, dt = 1 / 60): void {
  for (let t = 0; t < seconds; t += dt) w.update(dt);
}

describe("天气预设", () => {
  it("九种天气齐全，参数在合理范围", () => {
    expect(WEATHER_KINDS).toEqual(["clear", "overcast", "lightRain", "heavyRain", "drizzleMist", "snow", "windGusts", "dusk", "night"]);
    for (const k of WEATHER_KINDS) {
      const p = WEATHER_PRESETS[k];
      for (const key of ["cloud", "skyGrey", "rain", "snow", "mist", "wind", "gust", "wetTarget", "skyTintAmt"] as const) {
        expect(p[key], `${k}.${key}`).toBeGreaterThanOrEqual(0);
        expect(p[key], `${k}.${key}`).toBeLessThanOrEqual(1);
      }
      expect(p.rain > 0 && p.snow > 0, `${k} 不会雨雪同屏`).toBe(false);
    }
    expect(isWeatherKind("snow")).toBe(true);
    expect(isWeatherKind("hail")).toBe(false);
  });

  it("每个单元都有合法的默认天气", () => {
    for (const id of ["unit01", "unit02", "unit03", "unit04", "unit05", "unit06"]) expect(isWeatherKind(UNIT_DEFAULT_WEATHER[id]), id).toBe(true);
  });

  it("雨天降光、增雾、变湿；夜晚最暗；黄昏的光偏珊瑚紫而不是黄", () => {
    const clear = WEATHER_PRESETS.clear;
    expect(WEATHER_PRESETS.heavyRain.sunMul).toBeLessThan(WEATHER_PRESETS.lightRain.sunMul);
    expect(WEATHER_PRESETS.lightRain.sunMul).toBeLessThan(clear.sunMul);
    expect(WEATHER_PRESETS.drizzleMist.fogMul).toBeGreaterThan(WEATHER_PRESETS.lightRain.fogMul);
    expect(WEATHER_PRESETS.heavyRain.wetTarget).toBeGreaterThan(WEATHER_PRESETS.lightRain.wetTarget);
    expect(WEATHER_PRESETS.night.skyDark).toBeLessThan(WEATHER_PRESETS.overcast.skyDark);
    const d = WEATHER_PRESETS.dusk;
    expect(d.sunTintG).toBeLessThan(d.sunTintR); // 绿通道压低 → 偏粉 / 珊瑚，不黄
    expect(d.sunTintB).toBeGreaterThan(d.sunTintG - 0.02);
  });
});

describe("WeatherState 状态机", () => {
  it("set 之后在给定秒数内趋近目标预设", () => {
    const w = new WeatherState("clear");
    w.set("overcast", 4);
    expect(w.transitioning).toBe(true);
    run(w, 1);
    expect(w.params.cloud).toBeGreaterThan(0.12);
    expect(w.params.cloud).toBeLessThan(0.85);
    run(w, 5);
    expect(w.params.cloud).toBeCloseTo(0.85, 2);
    expect(w.transitioning).toBe(false);
  });

  it("seconds=0 立即切换", () => {
    const w = new WeatherState("clear");
    w.set("heavyRain", 0);
    expect(w.params.rain).toBe(1);
    expect(w.wet).toBeCloseTo(1, 6);
    expect(w.kind).toBe("heavyRain");
  });

  it("重复设置同一种天气不重启过渡", () => {
    const w = new WeatherState("clear");
    w.set("snow", 4);
    const v = w.version;
    w.set("snow", 4);
    expect(w.version).toBe(v);
  });

  it("雨 → 雪：先把雨淡到几乎为 0 再升起雪，任何时刻不会雨雪同屏", () => {
    const w = new WeatherState("heavyRain");
    w.set("snow", 5);
    let maxBoth = 0;
    let snowStarted = false;
    for (let t = 0; t < 20; t += 1 / 60) {
      w.update(1 / 60);
      maxBoth = Math.max(maxBoth, Math.min(w.params.rain, w.params.snow));
      if (w.params.snow > 0.05) {
        snowStarted = true;
        expect(w.params.rain).toBeLessThan(0.03);
      }
    }
    expect(snowStarted).toBe(true);
    expect(maxBoth).toBeLessThan(0.03);
    expect(w.params.snow).toBeCloseTo(0.8, 2);
    expect(w.params.rain).toBeLessThan(0.001);
  });

  it("雪 → 雨同样先交接", () => {
    const w = new WeatherState("snow");
    w.set("lightRain", 4);
    let maxBoth = 0;
    for (let t = 0; t < 15; t += 1 / 60) {
      w.update(1 / 60);
      maxBoth = Math.max(maxBoth, Math.min(w.params.rain, w.params.snow));
    }
    expect(maxBoth).toBeLessThan(0.03);
    expect(w.params.rain).toBeCloseTo(0.45, 2);
  });

  it("任意两种天气互切都能收敛，参数始终有限", () => {
    for (const a of WEATHER_KINDS) {
      for (const b of WEATHER_KINDS) {
        const w = new WeatherState(a);
        w.set(b, 3);
        run(w, 14, 1 / 30);
        for (const v of Object.values(w.params)) expect(Number.isFinite(v)).toBe(true);
        expect(w.transitioning, `${a}→${b}`).toBe(false);
        expect(w.params.rain).toBeCloseTo(WEATHER_PRESETS[b].rain, 3);
        expect(w.params.snow).toBeCloseTo(WEATHER_PRESETS[b].snow, 3);
      }
    }
  });

  it("潮湿：下雨时上升快，雨停后变干慢", () => {
    const w = new WeatherState("clear");
    w.set("heavyRain", 2);
    run(w, 12);
    expect(w.wet).toBeGreaterThan(0.9);
    w.set("clear", 2);
    run(w, 12);
    expect(w.wet).toBeGreaterThan(0.45); // 12 s 后仍然半湿
    run(w, 90);
    expect(w.wet).toBeLessThan(0.05);
  });

  it("风力：阵风天气比晴天更强，且随时间起伏有界", () => {
    const calm = new WeatherState("clear");
    const gust = new WeatherState("windGusts");
    let maxCalm = 0;
    let maxGust = 0;
    let minGust = Infinity;
    for (let t = 0; t < 60; t += 0.1) {
      maxCalm = Math.max(maxCalm, calm.windNow(t));
      const g = gust.windNow(t);
      maxGust = Math.max(maxGust, g);
      minGust = Math.min(minGust, g);
    }
    expect(maxGust).toBeGreaterThan(maxCalm);
    expect(maxGust).toBeLessThan(2.6);
    expect(maxGust).toBeGreaterThan(minGust + 0.5);
    expect(foliageWindStrength(maxGust)).toBeGreaterThan(foliageWindStrength(0));
  });
});

describe("粒子预算", () => {
  it("低画质恰为中画质的一半，高画质更多，且有上限", () => {
    const low = maxBudget("low");
    const med = maxBudget("med");
    const high = maxBudget("high");
    expect(low.drops).toBe(med.drops / 2);
    expect(low.flakes).toBe(med.flakes / 2);
    expect(low.splashes).toBe(med.splashes / 2);
    expect(high.drops).toBeGreaterThan(med.drops);
    expect(high.drops).toBeLessThanOrEqual(4000);
    expect(high.flakes).toBeLessThanOrEqual(3000);
  });

  it("按天气取活跃数量：雨天只有雨线 + 涟漪，雪天只有雪片，晴天为 0；大雨多于小雨", () => {
    for (const q of ["high", "med", "low"] as const) {
      const heavy = precipitationBudget("heavyRain", q);
      const light = precipitationBudget("lightRain", q);
      const snow = precipitationBudget("snow", q);
      const clear = precipitationBudget("clear", q);
      expect(heavy.drops).toBeGreaterThan(light.drops);
      expect(heavy.flakes).toBe(0);
      expect(snow.drops).toBe(0);
      expect(snow.flakes).toBeGreaterThan(0);
      expect(clear).toEqual({ drops: 0, flakes: 0, splashes: 0 });
      expect(heavy.drops).toBeLessThanOrEqual(maxBudget(q).drops);
    }
    expect(precipitationBudget("heavyRain", "low").drops).toBe(precipitationBudget("heavyRain", "med").drops / 2);
  });
});

describe("weatherTint", () => {
  it("夜晚压暗、阴天灰化、黄昏偏粉紫，且 out 可与输入同一对象", () => {
    const base = resolveLook(LOOKS.unit01).skyMid;
    const night = weatherTint({ ...base }, WEATHER_PRESETS.night, { r: 0, g: 0, b: 0 });
    expect(night.r + night.g + night.b).toBeLessThan((base.r + base.g + base.b) * 0.5);
    const over = weatherTint({ ...base }, WEATHER_PRESETS.overcast, { r: 0, g: 0, b: 0 });
    expect(Math.max(over.r, over.g, over.b) - Math.min(over.r, over.g, over.b)).toBeLessThan(Math.max(base.r, base.g, base.b) - Math.min(base.r, base.g, base.b));
    const same = { ...base };
    weatherTint(same, WEATHER_PRESETS.clear, same);
    expect(same.r).toBeCloseTo(base.r, 6);
    const dusk = weatherTint({ ...base }, WEATHER_PRESETS.dusk, { r: 0, g: 0, b: 0 });
    expect(dusk.r - dusk.g).toBeGreaterThan(base.r - base.g); // 向粉紫偏移：红相对绿增加
    expect(dusk.b - dusk.g).toBeLessThan(base.b - base.g + 0.2);
    expect(emptyResolved().skyTop).toBeTruthy();
  });
});
