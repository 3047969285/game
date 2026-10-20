import { COVER_MS, REVEAL_MS, drawMemoryEntry, ease, memoryMotes } from "./visual";
import "./transition.css";

export interface MemoryEntryOptions { title: string; onCancel?: () => void }
/** Covers the outgoing scene, waits for actual readiness, then opens onto it. */
export class MemoryEntryTransition {
  readonly element = document.createElement("div");
  readonly cancelled: Promise<null>;
  readonly covered: Promise<boolean>;
  private resolveCancel!: (value: null) => void;
  private resolveCovered!: (value: boolean) => void;
  private resolveReveal: (() => void) | null = null;
  private revealPromise: Promise<void> | null = null;
  private readonly canvas = document.createElement("canvas");
  private readonly copy = document.createElement("div");
  private readonly cancelButton = document.createElement("button");
  private readonly context = this.canvas.getContext("2d");
  private readonly reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
  private readonly low = window.innerWidth < 700;
  private readonly motes = memoryMotes(this.low);
  private readonly started = performance.now();
  private revealStart: number | null = null;
  private frame = 0;
  private width = 1;
  private height = 1;
  private disposed = false;
  private aborted = false;
  private lastPaint = -Infinity;
  private hasCovered = false;
  private readonly opener = document.activeElement as HTMLElement | null;
  private readonly resize = (): void => {
    this.width = Math.max(1, window.innerWidth); this.height = Math.max(1, window.innerHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, this.low ? 1.25 : 1.5);
    this.canvas.width = Math.round(this.width*ratio); this.canvas.height = Math.round(this.height*ratio);
    this.context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  private readonly keydown = (event: KeyboardEvent): void => {
    event.stopPropagation();
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); this.cancel(); }
    if (event.key === "Tab") { event.preventDefault(); this.cancelButton.focus(); }
  };

  constructor(private readonly options: MemoryEntryOptions) {
    this.cancelled = new Promise((resolve) => { this.resolveCancel = resolve; });
    this.covered = new Promise((resolve) => { this.resolveCovered = resolve; });
    this.element.className = "memory-entry";
    this.element.setAttribute("role", "dialog"); this.element.setAttribute("aria-modal", "true");
    this.element.setAttribute("aria-label", "进入记忆回溯"); this.element.setAttribute("aria-busy", "true");
    this.canvas.setAttribute("aria-hidden", "true");
    this.copy.className = "memory-entry-copy";
    const kicker = document.createElement("div"); kicker.className = "memory-entry-kicker"; kicker.textContent = "MEMORY RECALL";
    const title = document.createElement("h2"); title.textContent = "回溯记忆";
    const subtitle = document.createElement("p"); subtitle.className = "memory-entry-title"; subtitle.textContent = options.title;
    const line = document.createElement("div"); line.className = "memory-entry-line";
    const hint = document.createElement("p"); hint.className = "memory-entry-hint"; hint.textContent = "拾起那些未曾走远的瞬间";
    this.copy.append(kicker, title, subtitle, line, hint);
    this.cancelButton.className = "memory-entry-cancel"; this.cancelButton.type = "button"; this.cancelButton.textContent = "取消回溯";
    this.cancelButton.addEventListener("click", () => this.cancel());
    this.element.append(this.canvas, this.copy, this.cancelButton);
    document.body.append(this.element);
    window.addEventListener("resize", this.resize); window.addEventListener("keydown", this.keydown, true);
    this.resize(); this.cancelButton.focus({ preventScroll: true });
    this.frame = requestAnimationFrame(this.tick);
  }
  get isCancelled(): boolean { return this.aborted; }
  private readonly tick = (now: number): void => {
    if (this.disposed) return;
    const coverMs = this.reduced ? 360 : COVER_MS;
    const revealMs = this.reduced ? 420 : REVEAL_MS;
    const cover = Math.min(1, Math.max(0, (now-this.started)/coverMs));
    const reveal = this.revealStart === null ? 0 : Math.min(1, Math.max(0, (now-this.revealStart)/revealMs));
    // Slow standby/reduced-motion frames save battery during asset loading.
    const interval = this.reduced ? 60 : cover === 1 && this.revealStart === null ? 50 : this.low ? 33 : 16;
    if (now-this.lastPaint >= interval || reveal === 1 || (cover === 1 && !this.hasCovered)) {
      this.lastPaint = now;
      this.element.style.setProperty("--entry-copy", String(ease(cover)*(1-ease(reveal))));
      this.element.style.setProperty("--entry-blur", `${this.reduced ? 0 : ease(cover)*(1-ease(reveal))*(this.low ? 4 : 8)}px`);
      this.element.style.opacity = String(1-ease(Math.max(0, (reveal-.7)/.3)));
      if (this.context) drawMemoryEntry(this.context, this.width, this.height, { time: (now-this.started)/1000, cover, reveal, reduced: this.reduced }, this.motes);
      else this.element.style.backgroundColor = `rgba(4,9,19,${ease(cover)*(1-ease(reveal))})`;
      if (cover === 1 && !this.hasCovered) { this.hasCovered = true; this.resolveCovered(true); }
    }
    if (reveal === 1) { this.dispose(); return; }
    this.frame = requestAnimationFrame(this.tick);
  };
  /** Call only after the new scene has rendered its first frame beneath us. */
  reveal(): Promise<void> {
    if (this.disposed) return Promise.resolve();
    if (this.revealPromise) return this.revealPromise;
    this.revealPromise = new Promise((resolve) => { this.resolveReveal = resolve; });
    this.revealStart = performance.now();
    this.element.setAttribute("aria-busy", "false");
    return this.revealPromise;
  }
  cancel(): void {
    if (this.disposed) return;
    this.aborted = true;
    this.resolveCancel(null); this.resolveCovered(false);
    try { this.options.onCancel?.(); } finally { this.dispose(); }
  }
  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    window.removeEventListener("resize", this.resize); window.removeEventListener("keydown", this.keydown, true);
    this.resolveCovered(false); this.resolveReveal?.(); this.resolveReveal = null;
    this.element.remove();
    // Release the backing store immediately, including on cancellation.
    this.canvas.width = this.canvas.height = 1;
    if (this.opener?.isConnected && this.opener.getClientRects().length) this.opener.focus({ preventScroll: true });
    else document.querySelector<HTMLElement>("#screen-memory.active button")?.focus({ preventScroll: true });
  }
}
