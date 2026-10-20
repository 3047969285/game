import { onSpeechActivity } from "./speechActivity";

export type MusicScene = "explore" | "memory" | "study";
export type MusicSelection = "auto" | MusicScene | "custom";
export const MUSIC_TRACKS = {
  explore: { title: "光下的远行", description: "探索 · 钢琴与竖琴", file: "explore.m4a", duration: 96 },
  memory: { title: "把昨天轻轻拾起", description: "回忆 · 温暖钢琴", file: "memory.m4a", duration: 90 },
  study: { title: "窗边的专注", description: "学习 · 安静钢琴", file: "study.m4a", duration: 96 },
} as const;
const SETTINGS_KEY = "word_quest_music_v2";
const FADE_MS = 1200;
interface Slot { element: HTMLAudioElement; key: string; gain: number; node?: GainNode }

/** Local soundtrack with two-voice fades, speech ducking and persistent user intent. */
export class MusicPlayer {
  private readonly slots: Slot[] = [0, 1].map(() => ({ element: new Audio(), key: "", gain: 0 }));
  private objectUrl: string | null = null;
  private fileName = "";
  private scene: MusicScene = "explore";
  private selection: MusicSelection = "auto";
  private enabled = true;
  private volume = .42;
  private customLoop = true;
  private activated = false;
  private hidden = false;
  private ducked = false;
  private active = 0;
  private version = 0;
  private disposed = false;
  private fade: ReturnType<typeof setInterval> | null = null;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private releaseSpeech: () => void;
  private error = "";
  private readonly listeners = new Set<() => void>();
  private readonly gesture = (): void => this.unlock();
  private readonly visibility = (): void => {
    this.hidden = document.hidden;
    void this.reconcile();
  };

  constructor() {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "null");
      if (saved && typeof saved === "object") {
        if (typeof saved.enabled === "boolean") this.enabled = saved.enabled;
        if (typeof saved.volume === "number" && Number.isFinite(saved.volume)) this.volume = Math.max(0, Math.min(1, saved.volume));
        if (["auto", "explore", "memory", "study"].includes(saved.selection)) this.selection = saved.selection;
        if (typeof saved.loop === "boolean") this.customLoop = saved.loop;
      }
    } catch { /* Storage can be disabled; audio remains usable. */ }
    for (const slot of this.slots) {
      slot.element.preload = "none";
      slot.element.addEventListener("error", () => {
        if (this.slots[this.active] !== slot || slot.key !== this.trackKey) return;
        this.error = "音乐载入失败，可重新播放或选择其他曲目";
        this.emit();
      });
      slot.element.addEventListener("ended", () => {
        if (this.slots[this.active] !== slot || slot.element.loop) return;
        this.enabled = false;
        this.persist();
        this.emit();
      });
    }
    this.releaseSpeech = onSpeechActivity((speaking) => {
      this.ducked = speaking;
      this.applyVolume();
      this.emit();
    });
    if (typeof document !== "undefined") {
      this.hidden = document.hidden;
      document.addEventListener("pointerdown", this.gesture, true);
      document.addEventListener("keydown", this.gesture, true);
      document.addEventListener("visibilitychange", this.visibility);
    }
  }

  subscribe(listener: () => void): () => void { this.listeners.add(listener); listener(); return () => { this.listeners.delete(listener); }; }
  private emit(): void { for (const listener of this.listeners) listener(); }
  private persist(): void {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ enabled: this.enabled, volume: this.volume, loop: this.customLoop, selection: this.selection === "custom" ? "auto" : this.selection })); } catch { /* optional */ }
  }
  get selected(): MusicSelection { return this.selection; }
  get level(): number { return this.volume; }
  get loop(): boolean { return this.selection === "custom" ? this.customLoop : true; }
  get hasCustom(): boolean { return this.objectUrl !== null; }
  get status(): string {
    if (this.error) return this.error;
    if (!this.enabled) return "已暂停";
    if (this.hidden) return "页面在后台，已暂停";
    if (!this.activated) return "点击或按键后开启场景配乐";
    if (this.ducked) return "朗读中 · 配乐已降低音量";
    return this.playing ? "正在播放" : "点击播放以开启声音";
  }
  private get trackKey(): string { return this.selection === "auto" ? this.scene : this.selection; }
  get name(): string { return this.trackKey === "custom" ? this.fileName : MUSIC_TRACKS[this.trackKey as MusicScene].title; }
  get hasTrack(): boolean { return this.trackKey !== "custom" || this.hasCustom; }
  get position(): number { return this.slots[this.active].key === this.trackKey ? this.slots[this.active].element.currentTime : 0; }
  get duration(): number {
    const slot = this.slots[this.active];
    const value = slot.key === this.trackKey ? slot.element.duration : Number.NaN;
    return Number.isFinite(value) ? value : this.trackKey === "custom" ? 0 : MUSIC_TRACKS[this.trackKey as MusicScene].duration;
  }
  get playing(): boolean { return this.enabled && !this.hidden && (!this.ctx || this.ctx.state === "running") && !this.slots[this.active].element.paused; }

  setScene(scene: MusicScene): void {
    if (this.scene === scene) return;
    this.scene = scene;
    if (this.selection === "auto") void this.reconcile();
    this.emit();
  }
  select(selection: MusicSelection): void {
    if (selection === "custom" && !this.objectUrl) return;
    if (this.selection === selection) return;
    this.selection = selection;
    this.persist();
    void this.reconcile();
    this.emit();
  }
  async load(file: File): Promise<void> {
    if (!file.type.startsWith("audio/") && !/\.(mp3|m4a|aac|ogg|wav|flac|webm)$/i.test(file.name)) throw new Error("请选择音频文件");
    this.stopFade();
    this.version++;
    for (const slot of this.slots) { slot.element.pause(); slot.key = ""; slot.gain = 0; }
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = URL.createObjectURL(file);
    this.fileName = file.name;
    this.selection = "custom";
    this.persist();
    await this.reconcile();
    this.emit();
  }

  /** Must run synchronously inside a gesture; both media voices are unlocked on Safari. */
  unlock(): void {
    if (this.disposed || this.hidden) return;
    const firstGesture = !this.activated;
    if (firstGesture) {
      this.activated = true;
      try {
        const Ctor = globalThis.AudioContext ?? (globalThis as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (Ctor) {
          this.ctx = new Ctor();
          this.master = this.ctx.createGain();
          this.master.connect(this.ctx.destination);
          for (const slot of this.slots) {
            slot.node = this.ctx.createGain();
            slot.node.gain.value = 0;
            this.ctx.createMediaElementSource(slot.element).connect(slot.node).connect(this.master);
          }
          this.applyVolume();
        }
      } catch { this.ctx = null; this.master = null; }
      if (this.enabled) {
        for (const spare of this.slots) {
          this.assign(spare);
          spare.element.volume = this.ctx ? 1 : 0;
          void spare.element.play().then(() => { if (this.slots[this.active] !== spare) spare.element.pause(); }).catch(() => undefined);
        }
      }
    }
    if (this.enabled && (firstGesture || !this.playing)) void this.reconcile();
    this.emit();
  }

  async toggle(): Promise<boolean> {
    this.enabled = !this.playing;
    this.persist();
    this.unlock();
    await this.reconcile();
    return this.playing;
  }
  setVolume(value: number): void {
    if (!Number.isFinite(value)) return;
    this.volume = Math.max(0, Math.min(1, value));
    this.persist(); this.applyVolume(); this.emit();
  }
  setLoop(loop: boolean): void {
    this.customLoop = loop;
    for (const slot of this.slots) slot.element.loop = slot.key === "custom" ? loop : true;
    this.persist(); this.emit();
  }
  private assign(slot: Slot): void {
    if (slot.key !== this.trackKey) {
      slot.element.pause();
      slot.key = this.trackKey;
      slot.element.src = slot.key === "custom" ? this.objectUrl! : `${import.meta.env.BASE_URL}audio/${MUSIC_TRACKS[slot.key as MusicScene].file}`;
      slot.gain = 0;
    }
    slot.element.loop = this.loop;
  }
  private stopFade(): void {
    if (this.fade) clearInterval(this.fade);
    this.fade = null;
    if (this.ctx) for (const slot of this.slots) if (slot.node) {
      slot.node.gain.cancelScheduledValues(this.ctx.currentTime);
      slot.node.gain.setValueAtTime(slot.gain, this.ctx.currentTime);
    }
  }
  private applyVolume(): void {
    const target = this.volume * (this.ducked ? .16 : 1);
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(target, this.ctx.currentTime, this.ducked ? .06 : .35);
      if (!this.fade) for (const slot of this.slots) if (slot.node) slot.node.gain.value = slot.gain;
    } else for (const slot of this.slots) slot.element.volume = Math.max(0, Math.min(1, slot.gain * target));
  }
  private async reconcile(): Promise<void> {
    if (this.disposed) return;
    const token = ++this.version;
    if (!this.enabled || this.hidden || !this.activated) {
      this.stopFade();
      for (const slot of this.slots) { slot.element.pause(); slot.gain = 0; }
      this.applyVolume(); this.emit(); return;
    }
    this.error = "";
    const matching = this.slots.findIndex((slot) => slot.key === this.trackKey);
    const next = matching >= 0 ? matching : (this.slots[0].gain <= this.slots[1].gain ? 0 : 1);
    const slot = this.slots[next];
    this.active = next;
    this.stopFade();
    this.assign(slot);
    this.applyVolume();
    try {
      if (this.ctx?.state === "suspended") void this.ctx.resume().catch(() => undefined);
      await slot.element.play();
    } catch {
      if (token === this.version) { this.error = "点击播放以开启声音"; this.emit(); }
      return;
    }
    if (token !== this.version) {
      if (!this.enabled || this.hidden || this.disposed || this.slots[this.active] !== slot) slot.element.pause();
      return;
    }
    this.stopFade();
    const start = performance.now();
    const gains = this.slots.map((item) => item.gain);
    if (this.ctx) this.slots.forEach((item, index) => {
      if (!item.node) return;
      const curve = Float32Array.from({ length: 65 }, (_, step) => {
        const t = step / 64;
        return Math.sqrt((1-t)*gains[index]**2+t*(index === next ? 1 : 0));
      });
      item.node.gain.setValueCurveAtTime(curve, this.ctx!.currentTime, FADE_MS / 1000);
    });
    this.fade = setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / FADE_MS);
      // Equal-power curve avoids a dip at the midpoint of a scene transition.
      this.slots.forEach((item, index) => { const target = index === next ? 1 : 0; item.gain = Math.sqrt((1-t)*gains[index]**2+t*target); });
      this.applyVolume();
      if (t === 1) {
        this.stopFade();
        this.slots.forEach((item, index) => { if (index !== next) item.element.pause(); });
        this.emit();
      }
    }, 30);
    this.emit();
  }
  dispose(): void {
    this.disposed = true; this.version++; this.stopFade(); this.releaseSpeech();
    if (typeof document !== "undefined") {
      document.removeEventListener("pointerdown", this.gesture, true);
      document.removeEventListener("keydown", this.gesture, true);
      document.removeEventListener("visibilitychange", this.visibility);
    }
    for (const slot of this.slots) { slot.element.pause(); slot.element.removeAttribute("src"); slot.element.load(); slot.node?.disconnect(); }
    void this.ctx?.close().catch(() => undefined);
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.listeners.clear(); this.objectUrl = null; this.fileName = "";
  }
}
