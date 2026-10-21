import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { maxBudget, WeatherState } from "./weather";
import { WeatherFx, WetnessTracker } from "./weatherFx";

const cam = new THREE.PerspectiveCamera(50, 1.6, 0.1, 100);
cam.position.set(1, 1.6, 2);

function frame(fx: WeatherFx, w: WeatherState, seconds = 0.5): void {
  for (let t = 0; t < seconds; t += 1 / 60) {
    w.update(1 / 60);
    fx.update(1 / 60, w, cam, 0.8, 720, 50, w.windNow(t));
  }
}

function layer(fx: WeatherFx, name: string): THREE.Mesh | undefined {
  return fx.object.getObjectByName(name) as THREE.Mesh | undefined;
}

describe("WeatherFx", () => {
  it("室外：雨线 / 雪片 / 涟漪的实例数就是各画质的预算，低画质为中画质的一半", () => {
    const med = new WeatherFx({ quality: "med", mode: "outdoor" });
    const low = new WeatherFx({ quality: "low", mode: "outdoor" });
    const budget = maxBudget("med");
    expect((layer(med, "weather-rain")!.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(budget.drops);
    expect((layer(med, "weather-snow")!.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(budget.flakes);
    expect((layer(med, "weather-ripples")!.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(budget.splashes);
    expect((layer(low, "weather-rain")!.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(budget.drops / 2);
    med.dispose();
    low.dispose();
  });

  it("晴天什么都不画；下雨只显示雨线 + 涟漪；下雪只显示雪片", () => {
    const fx = new WeatherFx({ quality: "med", mode: "outdoor" });
    const clear = new WeatherState("clear");
    frame(fx, clear);
    expect(layer(fx, "weather-rain")!.visible).toBe(false);
    expect(layer(fx, "weather-snow")!.visible).toBe(false);
    const rain = new WeatherState("heavyRain");
    frame(fx, rain);
    expect(layer(fx, "weather-rain")!.visible).toBe(true);
    expect(layer(fx, "weather-ripples")!.visible).toBe(true);
    expect(layer(fx, "weather-snow")!.visible).toBe(false);
    const snow = new WeatherState("snow");
    frame(fx, snow);
    expect(layer(fx, "weather-snow")!.visible).toBe(true);
    expect(layer(fx, "weather-rain")!.visible).toBe(false);
    fx.dispose();
  });

  it("室内（窗口模式）：没有任何落雨 / 落雪粒子，只有窗玻璃上的雨痕", () => {
    const fx = new WeatherFx({ quality: "high", mode: "window", window: { x: 0, y: 1.8, z: -3.9, width: 5.8, height: 2.4 } });
    expect(layer(fx, "weather-rain")).toBeUndefined();
    expect(layer(fx, "weather-snow")).toBeUndefined();
    expect(layer(fx, "weather-ripples")).toBeUndefined();
    const glass = layer(fx, "weather-glass")!;
    expect(glass).toBeTruthy();
    expect(glass.position.z).toBeCloseTo(-3.9, 6);
    frame(fx, new WeatherState("clear"));
    expect(glass.visible).toBe(false);
    frame(fx, new WeatherState("heavyRain"));
    expect(glass.visible).toBe(true);
    // 雨痕强度随雨量变化
    const light = new WeatherState("lightRain");
    frame(fx, light);
    const lightWet = (glass.material as THREE.ShaderMaterial).uniforms.uWet.value as number;
    frame(fx, new WeatherState("heavyRain"));
    expect((glass.material as THREE.ShaderMaterial).uniforms.uWet.value as number).toBeGreaterThan(lightWet);
    fx.dispose();
  });

  it("off 模式不创建任何层", () => {
    const fx = new WeatherFx({ quality: "med", mode: "off" });
    expect(fx.object.children.length).toBe(0);
    frame(fx, new WeatherState("heavyRain"));
    fx.dispose();
  });

  it("着色器是一次 draw call 的实例化面片（粒子位置不依赖 CPU 逐帧更新）", () => {
    const fx = new WeatherFx({ quality: "med", mode: "outdoor" });
    const rain = layer(fx, "weather-rain")!;
    expect(rain.geometry).toBeInstanceOf(THREE.InstancedBufferGeometry);
    expect(rain.geometry.getAttribute("aRnd")).toBeInstanceOf(THREE.InstancedBufferAttribute);
    expect(rain.frustumCulled).toBe(false);
    fx.dispose();
  });
});

describe("WetnessTracker", () => {
  it("潮湿让颜色变暗、粗糙度下降；干燥后恢复原值", () => {
    const mat = new THREE.MeshStandardMaterial({ color: 0x88aa66, roughness: 0.8 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), mat);
    const tracker = new WetnessTracker();
    tracker.add(mesh);
    const base = mat.color.clone();
    tracker.apply(1);
    expect(mat.color.r).toBeLessThan(base.r);
    expect(mat.color.g).toBeLessThan(base.g);
    expect(mat.roughness).toBeLessThan(0.8);
    expect(mat.roughness).toBeGreaterThanOrEqual(0.1);
    tracker.apply(0.5);
    const mid = mat.roughness;
    expect(mid).toBeGreaterThan(0.8 * 0.5);
    tracker.apply(0);
    expect(mat.color.r).toBeCloseTo(base.r, 6);
    expect(mat.roughness).toBeCloseTo(0.8, 6);
    mat.dispose();
    mesh.geometry.dispose();
  });

  it("潮湿度变化小于 0.01 时不重复遍历材质", () => {
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), mat);
    const tracker = new WetnessTracker();
    tracker.add(mesh);
    tracker.apply(0.5);
    mat.roughness = 0.123; // 外部改动：如果被重复应用就会被覆盖
    tracker.apply(0.505);
    expect(mat.roughness).toBe(0.123);
    tracker.add(mesh); // 重复 add 同一个对象不会让缓存失效
    tracker.apply(0.505);
    expect(mat.roughness).toBe(0.123);
    mat.dispose();
    mesh.geometry.dispose();
  });
});
