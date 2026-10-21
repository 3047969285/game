/**
 * 自适应分辨率（纯逻辑）：目标 60 fps。
 * 帧耗时（指数平均）> high 持续 hold 秒 → 降一档像素比；< low 持续 hold 秒 → 升一档。
 * 12–18 ms 之间不动（迟滞带）；每次调整后冷却 hold 秒；
 * 若刚升档就又被迫降档（12 s 内），封顶在降后的档位 30 s，避免来回抖动。
 */
export interface AdaptiveScalerOptions {
  max: number;
  min?: number;
  step?: number;
  /** 毫秒 */
  high?: number;
  low?: number;
  /** 秒 */
  hold?: number;
  initial?: number;
}

export class AdaptiveScaler {
  ratio: number;
  /** 帧耗时指数平均（毫秒），供浮层显示 */
  avgMs = 16.7;
  private max: number;
  private readonly min: number;
  private readonly step: number;
  private readonly high: number;
  private readonly low: number;
  private readonly hold: number;
  private slow = 0;
  private fast = 0;
  private cooldown = 0;
  private clock = 0;
  private lastRaiseAt = -Infinity;
  private ceiling = Infinity;
  private ceilingUntil = 0;

  constructor(o: AdaptiveScalerOptions) {
    this.max = o.max;
    this.min = Math.min(o.min ?? 0.75, o.max);
    this.step = o.step ?? 0.25;
    this.high = o.high ?? 18;
    this.low = o.low ?? 12;
    this.hold = o.hold ?? 2;
    this.ratio = Math.min(o.max, Math.max(this.min, o.initial ?? o.max));
  }

  setMax(max: number): void {
    this.max = max;
    if (this.ratio > max) this.ratio = max;
  }

  /** 返回新的像素比（发生了调整时），否则 null。frameMs 为这一帧的真实耗时，dt 为秒 */
  push(frameMs: number, dt: number): number | null {
    if (!(frameMs > 0) || frameMs > 300 || !(dt > 0) || dt > 0.5) return null; // 切后台 / 卡死后的超长帧不计
    this.clock += dt;
    this.avgMs += (frameMs - this.avgMs) * (1 - Math.exp(-dt / 0.35));
    if (this.cooldown > 0) {
      this.cooldown -= dt;
      this.slow = this.fast = 0;
      return null;
    }
    if (this.avgMs > this.high) {
      this.slow += dt;
      this.fast = 0;
    } else if (this.avgMs < this.low) {
      this.fast += dt;
      this.slow = 0;
    } else {
      this.slow = this.fast = 0;
    }
    if (this.slow >= this.hold && this.ratio > this.min + 1e-6) {
      const next = Math.max(this.min, this.ratio - this.step);
      if (this.clock - this.lastRaiseAt < 12) {
        this.ceiling = next;
        this.ceilingUntil = this.clock + 30;
      }
      return this.apply(next);
    }
    const cap = this.clock < this.ceilingUntil ? Math.min(this.max, this.ceiling) : this.max;
    if (this.fast >= this.hold && this.ratio < cap - 1e-6) {
      this.lastRaiseAt = this.clock;
      return this.apply(Math.min(cap, this.ratio + this.step));
    }
    return null;
  }

  private apply(next: number): number {
    this.ratio = next;
    this.slow = this.fast = 0;
    this.cooldown = this.hold;
    return next;
  }
}
