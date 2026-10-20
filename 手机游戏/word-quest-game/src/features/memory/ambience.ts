/**
 * 环境声：2090 年公寓里的雨声。WebAudio 滤波噪声合成，不需要任何音频文件。
 *  - 一层高频的“沙沙”（白噪声 → 高通 + 低通），音量被一个很慢的 LFO 轻轻起伏，像雨势时大时小；
 *  - 一层低频的“远雷般的底噪”（粉红噪声 → 低通），让声音有厚度；
 *  - 偶尔一两滴落在窗台上的水声（短促的带通噪声脉冲）。
 * 浏览器要求在用户手势之后才允许出声：start() 会尝试创建 / 恢复 AudioContext，
 * 如果当时还是 suspended，就等下一次点击 / 按键再恢复。stop() 淡出后关闭，dispose 时一定调用。
 */

type AudioCtor = new () => AudioContext;

function audioCtor(): AudioCtor | undefined {
  const g = globalThis as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor };
  return g.AudioContext ?? g.webkitAudioContext;
}

function makeNoise(ctx: AudioContext, seconds: number, pink: boolean): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    if (pink) {
      // Paul Kellet 的简化粉红噪声
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.2;
    } else {
      data[i] = white;
    }
  }
  // 首尾淡入淡出，循环接缝处不出现“咔”声
  const fade = Math.min(2048, length >> 2);
  for (let i = 0; i < fade; i++) {
    const k = i / fade;
    data[i] *= k;
    data[length - 1 - i] *= k;
  }
  return buffer;
}

export class RainAmbience {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sources: AudioScheduledSourceNode[] = [];
  private dripTimer: ReturnType<typeof setTimeout> | null = null;
  private resumeHook: (() => void) | null = null;
  private stopped = false;
  private started = false;

  /** 淡入（秒）。可重复调用，只会启动一次 */
  start(fadeSeconds = 3): void {
    if (this.started || this.stopped) return;
    const Ctor = audioCtor();
    if (!Ctor) return;
    this.started = true;
    try {
      const ctx = new Ctor();
      this.ctx = ctx;
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      this.master = master;

      // 沙沙层
      const hiss = ctx.createBufferSource();
      hiss.buffer = makeNoise(ctx, 4, false);
      hiss.loop = true;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1100;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 7200;
      const hissGain = ctx.createGain();
      hissGain.gain.value = 0.2;
      hiss.connect(hp).connect(lp).connect(hissGain).connect(master);

      // 雨势起伏
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoDepth = ctx.createGain();
      lfoDepth.gain.value = 0.05;
      lfo.connect(lfoDepth).connect(hissGain.gain);

      // 低频底噪
      const rumble = ctx.createBufferSource();
      rumble.buffer = makeNoise(ctx, 5, true);
      rumble.loop = true;
      const rlp = ctx.createBiquadFilter();
      rlp.type = "lowpass";
      rlp.frequency.value = 420;
      const rumbleGain = ctx.createGain();
      rumbleGain.gain.value = 0.38;
      rumble.connect(rlp).connect(rumbleGain).connect(master);

      for (const s of [hiss, lfo, rumble]) s.start();
      this.sources.push(hiss, lfo, rumble);

      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + fadeSeconds);

      if (ctx.state === "suspended") {
        void ctx.resume().catch(() => undefined);
        if (ctx.state === "suspended") {
          const hook = (): void => {
            void ctx.resume().catch(() => undefined);
            this.removeResumeHook();
          };
          this.resumeHook = hook;
          window.addEventListener("pointerdown", hook);
          window.addEventListener("keydown", hook);
        }
      }
      this.scheduleDrip();
    } catch {
      // 没有音频不影响流程
    }
  }

  private removeResumeHook(): void {
    if (!this.resumeHook) return;
    window.removeEventListener("pointerdown", this.resumeHook);
    window.removeEventListener("keydown", this.resumeHook);
    this.resumeHook = null;
  }

  /** 窗台上偶尔落下一滴 */
  private scheduleDrip(): void {
    if (this.stopped) return;
    this.dripTimer = setTimeout(
      () => {
        this.drip();
        this.scheduleDrip();
      },
      2200 + Math.random() * 5200
    );
  }

  private drip(): void {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master || ctx.state !== "running") return;
    try {
      const src = ctx.createBufferSource();
      src.buffer = makeNoise(ctx, 0.12, false);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1600 + Math.random() * 1400;
      bp.Q.value = 6;
      const g = ctx.createGain();
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.35, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
      src.connect(bp).connect(g).connect(master);
      src.start(t);
      src.stop(t + 0.14);
    } catch {
      // ignore
    }
  }

  /** 淡出并关闭。可重复调用 */
  stop(fadeSeconds = 0.5): void {
    if (this.stopped) return;
    this.stopped = true;
    if (this.dripTimer) clearTimeout(this.dripTimer);
    this.dripTimer = null;
    this.removeResumeHook();
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    try {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeSeconds);
    } catch {
      // ignore
    }
    const sources = this.sources;
    this.sources = [];
    setTimeout(
      () => {
        for (const s of sources) {
          try {
            s.stop();
          } catch {
            // 已经停了
          }
        }
        void ctx.close().catch(() => undefined);
      },
      fadeSeconds * 1000 + 80
    );
    this.ctx = null;
    this.master = null;
  }
}
