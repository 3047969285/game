import type * as THREE from "three";
import type { AdaptiveScaler } from "./adaptiveScaler";

/** 仅开发用：URL 带 ?perf=1 时显示 fps / 帧耗时 / draw calls / 三角形 / 像素比 */
export function perfOverlayEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (!import.meta.env?.DEV) return false;
  try {
    return new URLSearchParams(window.location.search).get("perf") === "1";
  } catch {
    return false;
  }
}

export interface PerfOverlay {
  /** 每帧在渲染之后调用，frameMs 为本帧耗时 */
  update(frameMs: number): void;
  dispose(): void;
}

export function attachPerfOverlay(renderer: THREE.WebGLRenderer, container: HTMLElement, scaler?: AdaptiveScaler): PerfOverlay {
  const el = document.createElement("div");
  el.setAttribute("data-perf-overlay", "");
  el.style.cssText = "position:absolute;left:8px;bottom:8px;z-index:9999;padding:6px 8px;border-radius:6px;background:rgba(6,14,24,.72);color:#9fe8ff;font:11px/1.45 ui-monospace,monospace;pointer-events:none;white-space:pre";
  container.appendChild(el);
  // composer 每个通道都会 render 一次；关掉自动清零，由这里每帧手动清零，才能得到整帧的 draw calls
  renderer.info.autoReset = false;
  let acc = 0;
  let frames = 0;
  let msSum = 0;
  return {
    update(frameMs: number) {
      frames++;
      msSum += frameMs;
      acc += frameMs;
      if (acc >= 250) {
        const avg = msSum / frames;
        const info = renderer.info.render;
        el.textContent = `${(1000 / Math.max(0.1, avg)).toFixed(0)} fps  ${avg.toFixed(1)} ms\ncalls ${Math.round(info.calls)}  tris ${Math.round(info.triangles)}\nratio ${renderer.getPixelRatio().toFixed(2)}${scaler ? `  avg ${scaler.avgMs.toFixed(1)} ms` : ""}`;
        acc = 0;
        frames = 0;
        msSum = 0;
      }
      renderer.info.reset();
    },
    dispose() {
      renderer.info.autoReset = true;
      el.remove();
    },
  };
}
