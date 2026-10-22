import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { isWeatherKind } from "../world/weather";
import { CinemaDirector } from "./CinemaDirector";
import { LOOKS, lookFor } from "./memoryLooks";
import { PROLOGUE_SCRIPT } from "./scripts/prologue";
import { getStage, stageTargets } from "./stages";
import { validateScript, type Beat, type MemoryScript } from "./types";

describe("weather 节拍与脚本 / 舞台的天气配置", () => {
  const base = (): MemoryScript => ({
    id: "t", unitId: "unit01", section: "section_a", title: "T", titleZh: "测", stage: "clubRoom",
    actors: [], objects: [],
    beats: [{ kind: "weather", weather: "heavyRain", seconds: 8 }, { kind: "wait", seconds: 1 }],
  });

  it("合法的 weather 节拍通过校验，未知天气 / 负时长报错", () => {
    expect(validateScript(base(), { stageTargets: stageTargets("clubRoom") })).toEqual([]);
    const bad = base();
    bad.beats = [{ kind: "weather", weather: "hail" as never }, { kind: "weather", weather: "snow", seconds: -1 }];
    const errs = validateScript(bad);
    expect(errs.some((e) => e.includes("未知天气"))).toBe(true);
    expect(errs.some((e) => e.includes("非法过渡时长"))).toBe(true);
    const badDefault = { ...base(), weather: "hail" as never };
    expect(validateScript(badDefault).some((e) => e.includes("默认天气"))).toBe(true);
  });

  it("每个注册的舞台天气配置合法：室内舞台走窗口模式（带窗位置），公寓自己画雨", () => {
    for (const name of ["emptyRoom", "clubRoom", "apartment2090", "void"]) {
      const w = getStage(name).weather;
      if (!w) continue;
      expect(isWeatherKind(w.default), name).toBe(true);
      if (w.mode === "window") {
        expect(w.window, name).toBeTruthy();
        expect(w.window!.width).toBeGreaterThan(1);
      }
    }
    expect(getStage("clubRoom").weather?.mode).toBe("window");
    expect(getStage("emptyRoom").weather?.mode).toBe("window");
    expect(getStage("apartment2090").weather?.mode).toBe("own");
    const club = getStage("clubRoom");
    // 会被淋湿的都是室外部件，且必须是舞台里真实存在的部件
    for (const part of club.weather!.wetParts ?? []) expect(stageTargets("clubRoom")).toContain(part);
    expect(club.weather!.wetParts).not.toContain("floor");
    expect(club.weather!.wetParts).not.toContain("table");
  });

  it("手写脚本的单元色调存在；开场用 2090 深蓝夜", () => {
    expect(lookFor("unit01").id).toBe("unit01");
    expect(PROLOGUE_SCRIPT.unitId).toBe("");
    expect(LOOKS.memory2090).toBeTruthy();
  });

  it("舞台的环境色不再偏黄：太阳光色接近中性冷白", () => {
    for (const name of ["emptyRoom", "clubRoom", "apartment2090"]) {
      const c = new THREE.Color(getStage(name).environment.sunColor);
      expect(c.b, name).toBeGreaterThanOrEqual(c.r * 0.92);
    }
  });
});

// ── CinemaDirector：镜头连续 ──

function makeCinema(): CinemaDirector {
  const hud = { setLetterbox: () => undefined, setSubtitle: () => undefined, clearSubtitle: () => undefined, setChromeHidden: () => undefined, setPrompt: () => undefined, setCaption: () => undefined };
  const filmPass = { uniforms: { uFilm: { value: 0 }, uFade: { value: 0 }, uDim: { value: 0 }, uJitter: { value: 0 }, uTime: { value: 0 } }, enabled: false };
  return new CinemaDirector(hud as never, filmPass as never, 46);
}

function drive(cinema: CinemaDirector, seconds: number, onFrame?: (pos: THREE.Vector3) => void): void {
  const pose = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 46 };
  for (let t = 0; t < seconds; t += 1 / 60) {
    cinema.update(1 / 60);
    cinema.getPose(pose);
    onFrame?.(pose.pos);
  }
}

describe("CinemaDirector：镜头运动连续，远距离切镜只在眨眼的瞬间发生", () => {
  const far: Beat = { kind: "narrate", pov: "watch", text: "x", camera: { from: { x: 4, y: 1.6, z: 3 }, to: { x: 3, y: 1.6, z: 2 }, look: { x: 0, y: 1, z: -2 }, duration: 4, move: "dolly" } };

  it("有眨眼钩子时：远处的 from 不会立刻切过去，调用 apply 的那一刻才切，之后平滑运镜", () => {
    const cinema = makeCinema();
    cinema.setPoseFrom(new THREE.Vector3(-3, 1.6, 3), new THREE.Vector3(0, 1.2, -2), 46);
    let pending: (() => void) | null = null;
    cinema.blinkCut = (apply) => { pending = apply; };
    const camera = (far as Extract<Beat, { kind: "narrate" }>).camera!;
    void cinema.shot(camera);
    expect(pending).not.toBeNull();
    const before = new THREE.Vector3();
    drive(cinema, 0.5, (p) => before.copy(p));
    expect(before.x).toBeCloseTo(-3, 1); // 眨眼之前镜头原地不动
    pending!();
    const landed = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 46 };
    cinema.getPose(landed);
    expect(landed.pos.x).toBeGreaterThan(3.5); // 那一下就是这次唯一的“切”：发生在眨眼全黑的瞬间
    let maxStep = 0;
    const prev = landed.pos.clone();
    drive(cinema, 4, (p) => {
      maxStep = Math.max(maxStep, p.distanceTo(prev));
      prev.copy(p);
    });
    expect(prev.x).toBeLessThan(3.5);
    expect(maxStep).toBeLessThan(0.05); // 切镜之后每帧位移很小：没有跳变
  });

  it("起点离当前机位很近：不触发切镜，直接从当前姿态滑过去", () => {
    const cinema = makeCinema();
    cinema.setPoseFrom(new THREE.Vector3(4.1, 1.6, 3.1), new THREE.Vector3(0, 1, -2), 46);
    let called = false;
    cinema.blinkCut = () => { called = true; };
    void cinema.shot((far as Extract<Beat, { kind: "narrate" }>).camera!);
    expect(called).toBe(false);
    let maxStep = 0;
    const prev = new THREE.Vector3(4.1, 1.6, 3.1);
    drive(cinema, 5, (p) => {
      maxStep = Math.max(maxStep, p.distanceTo(prev));
      prev.copy(p);
    });
    expect(maxStep).toBeLessThan(0.05);
  });

  it("目标突然改变时输出姿态被临界阻尼平滑：单帧位移受限，没有瞬移", () => {
    const cinema = makeCinema();
    cinema.setPoseFrom(new THREE.Vector3(0, 1.6, 4), new THREE.Vector3(0, 1.2, 0), 46);
    // 无钩子 + still：旧行为是硬切；这里用不带 from 的运镜，起点是当前姿态，目标在 1.5 米外
    void cinema.shot({ to: { x: 1.5, y: 1.6, z: 4 }, look: { x: 0, y: 1.2, z: 0 }, duration: 0.05, move: "dolly" });
    let maxStep = 0;
    const prev = new THREE.Vector3(0, 1.6, 4);
    drive(cinema, 2, (p) => {
      maxStep = Math.max(maxStep, p.distanceTo(prev));
      prev.copy(p);
    });
    expect(prev.x).toBeCloseTo(1.5, 1);
    expect(maxStep).toBeLessThan(0.08); // 0.05 秒的目标突变被平滑成数十帧
  });
});
