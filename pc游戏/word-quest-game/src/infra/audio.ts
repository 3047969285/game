type Sfx = "click" | "nav" | "start" | "win";

/** 程序化 UI 音效 */
class AudioManager {
  private ctx: AudioContext | null = null;

  /** 首次交互后解锁音频上下文 */
  unlock(): void {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) this.ctx = new Ctx();
    }
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }

  /** 播放短音效 */
  play(type: Sfx): void {
    const ctx = this.ctx;
    if (!ctx) return;

    const t = ctx.currentTime;
    const master = ctx.createGain();
    master.connect(ctx.destination);

    const tone = (freq: number, start: number, dur: number, vol: number, wave: OscillatorType = "sine") => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, t + start);
      g.gain.setValueAtTime(0.0001, t + start);
      g.gain.exponentialRampToValueAtTime(vol, t + start + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + start + dur);
      osc.connect(g);
      g.connect(master);
      osc.start(t + start);
      osc.stop(t + start + dur + 0.02);
    };

    switch (type) {
      case "click":
        master.gain.value = 0.25;
        tone(880, 0, 0.06, 0.4, "triangle");
        break;
      case "nav":
        master.gain.value = 0.2;
        tone(520, 0, 0.08, 0.35);
        tone(780, 0.04, 0.1, 0.25);
        break;
      case "start":
        master.gain.value = 0.28;
        tone(440, 0, 0.12, 0.4);
        tone(660, 0.08, 0.15, 0.35);
        break;
      case "win":
        master.gain.value = 0.35;
        [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.1, 0.22, 0.4));
        break;
    }
  }
}

export const audio = new AudioManager();
