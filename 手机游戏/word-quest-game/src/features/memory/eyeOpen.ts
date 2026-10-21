/**
 * 人眼睁开（纯逻辑，无 three / DOM）：进入回忆时 黑 → 眼睑缓缓张开（眨一两次）→ 从虚焦拉到清晰 → 曝光渐适应。
 * 所有曲线都是分段 smoothstep（每段端点之间单调、不过冲），亮度增益 = 曝光 × 眼睑中心透光 ≤ 1，绝不闪白。
 * 渲染见 eyePass.ts。详见 docs/api-memory-look.md §2.4。
 */

export const smoothstep01 = (t: number): number => {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  return x * x * (3 - 2 * x);
};

/** [时间秒, 开度 0..1]：先半睁、眨一下、再睁大、再轻眨、最后完全睁开 */
export const EYE_KEYS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.6, 0],
  [1.7, 0.38],
  [2.05, 0.1],
  [2.35, 0.1],
  [3.9, 0.78],
  [4.25, 0.56],
  [4.55, 0.56],
  [6.0, 1],
];

/** 减弱动效：不眨眼，平滑睁开 */
export const EYE_KEYS_REDUCED: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.2, 0],
  [1.4, 1],
];

export const EYE_BLUR_END = 6.6;
export const EYE_EXPOSURE_START = 0.55;
export const EYE_EXPOSURE_END = 5.2;

function evalKeys(keys: ReadonlyArray<readonly [number, number]>, t: number): number {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i];
    if (t <= t1) {
      const [t0, v0] = keys[i - 1];
      return v0 + (v1 - v0) * smoothstep01((t - t0) / Math.max(1e-6, t1 - t0));
    }
  }
  return keys[keys.length - 1][1];
}

/** 睁眼开度 0..1 */
export function eyeOpenAmount(t: number, reduced = false): number {
  return evalKeys(reduced ? EYE_KEYS_REDUCED : EYE_KEYS, t);
}

/** 虚焦 1 → 0（睁开后才慢慢聚焦） */
export function eyeBlur(t: number, reduced = false): number {
  if (reduced) return 0;
  const k = smoothstep01((t - 1.0) / (EYE_BLUR_END - 1.0));
  return Math.pow(1 - k, 1.4);
}

/** 曝光（相对稳态）：略暗 → 1，不超过 1 */
export function eyeExposure(t: number, reduced = false): number {
  if (reduced) return 1;
  return EYE_EXPOSURE_START + (1 - EYE_EXPOSURE_START) * smoothstep01(t / EYE_EXPOSURE_END);
}

/** 眼睑中心的透光（着色器里对应的中心点遮罩）：开度小时迅速变暗 */
export function lidCenterMask(open: number): number {
  return smoothstep01(open / 0.22);
}

/** 画面中心像素亮度相对稳态的增益，必须 ≤ 1 */
export function eyeLuminanceGain(t: number, reduced = false): number {
  return eyeExposure(t, reduced) * lidCenterMask(eyeOpenAmount(t, reduced));
}

export function eyeTimelineEnd(reduced = false): number {
  return reduced ? 1.4 : Math.max(EYE_KEYS[EYE_KEYS.length - 1][0], EYE_BLUR_END);
}

type Mode = "timeline" | "tween" | "idle";

interface Tween {
  from: number;
  to: number;
  t: number;
  dur: number;
  done?: () => void;
  mid?: () => void;
}

interface Blink {
  t: number;
  closeSec: number;
  openSec: number;
  mid?: () => void;
  done: () => void;
}

/**
 * 眼睛控制器：开度 / 虚焦 / 曝光三个量随时间推进。
 * - startOpening()：从全黑开始的“醒来”时间线
 * - close(sec)：慢慢闭眼（下潜 / 上浮 / 退出）
 * - blink(mid)：眨眼（叠加在当前开度上的乘子），在全黑的瞬间调用 mid（镜头切换放这里）；睁眼时间线进行中也能眨
 * 构造后默认处于闭眼（开度 0）。update 不产生分配。
 */
export class EyeController {
  open = 0;
  blur = 0;
  exposure = 1;
  private mode: Mode = "tween";
  private clock = 0;
  private tween: Tween | null = null;
  private blinking: Blink | null = null;
  private base = 0;
  private resolveOpen: (() => void) | null = null;
  /** 时间线是否在运行（睁眼完成前为真） */
  get awakening(): boolean {
    return this.mode === "timeline";
  }

  constructor(private readonly reduced = false) {
    this.open = 0;
    this.blur = reduced ? 0 : 1;
    this.exposure = reduced ? 1 : EYE_EXPOSURE_START;
  }

  /** 从黑开始醒来；返回的 Promise 在完全睁开时 resolve */
  startOpening(): Promise<void> {
    this.mode = "timeline";
    this.clock = 0;
    this.tween = null;
    return new Promise<void>((resolve) => {
      this.resolveOpen?.();
      this.resolveOpen = resolve;
    });
  }

  /** 立即睁开（跳过动画） */
  openNow(): void {
    this.mode = "idle";
    this.base = 1;
    this.open = this.blinking ? this.open : 1;
    this.blur = 0;
    this.exposure = 1;
    this.tween = null;
    this.resolveOpen?.();
    this.resolveOpen = null;
  }

  /** 缓慢闭眼到全黑 */
  close(seconds = 1.2): Promise<void> {
    return new Promise<void>((resolve) => {
      this.finishPending();
      this.mode = "tween";
      this.tween = { from: this.base, to: 0, t: 0, dur: Math.max(0.01, seconds), done: resolve };
    });
  }

  /** 平滑睁开（闭眼之后重新睁眼，不重新虚焦） */
  reopen(seconds = 0.8): Promise<void> {
    return new Promise<void>((resolve) => {
      this.finishPending();
      this.mode = "tween";
      this.tween = { from: this.base, to: 1, t: 0, dur: Math.max(0.01, seconds), done: resolve };
    });
  }

  /** 眨眼：closeSec 闭、全黑瞬间调 mid、openSec 睁。已有眨眼进行中则先让它直接完成 */
  blink(mid?: () => void, closeSec = 0.16, openSec = 0.3): Promise<void> {
    return new Promise<void>((resolve) => {
      const prev = this.blinking;
      if (prev) {
        prev.mid?.();
        prev.done();
      }
      this.blinking = { t: 0, closeSec, openSec, mid, done: resolve };
    });
  }

  private finishPending(): void {
    const tw = this.tween;
    if (!tw) return;
    this.tween = null;
    tw.done?.();
  }

  /** 是否需要渲染这一通道（完全睁开且无虚焦时可关闭） */
  get active(): boolean {
    return !(this.open >= 0.999 && this.blur <= 0.002 && this.exposure >= 0.999);
  }

  update(dt: number): void {
    if (this.mode === "timeline") {
      this.clock += dt;
      this.base = eyeOpenAmount(this.clock, this.reduced);
      this.blur = eyeBlur(this.clock, this.reduced);
      this.exposure = eyeExposure(this.clock, this.reduced);
      if (this.clock >= eyeTimelineEnd(this.reduced)) {
        this.mode = "idle";
        this.base = 1;
        this.blur = 0;
        this.exposure = 1;
        this.resolveOpen?.();
        this.resolveOpen = null;
      }
    } else {
      const tw = this.tween;
      if (tw) {
        tw.t += dt;
        const k = smoothstep01(tw.t / tw.dur);
        this.base = tw.from + (tw.to - tw.from) * k;
        if (tw.t >= tw.dur) {
          this.base = tw.to;
          this.tween = null;
          tw.done?.();
        }
      }
    }
    let mul = 1;
    const b = this.blinking;
    if (b) {
      b.t += dt;
      if (b.t < b.closeSec) {
        mul = 1 - smoothstep01(b.t / b.closeSec);
      } else {
        if (b.mid) {
          const m = b.mid;
          b.mid = undefined;
          m();
        }
        mul = smoothstep01((b.t - b.closeSec) / b.openSec);
        if (b.t >= b.closeSec + b.openSec) {
          mul = 1;
          this.blinking = null;
          b.done();
        }
      }
    }
    this.open = this.base * mul;
  }
}
