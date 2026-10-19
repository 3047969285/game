import * as THREE from "three";
import type { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { applyFilm, type FilmControls } from "./filmPass";
import type { MemoryHud, SubtitleOptions } from "./hud";
import type { CameraShot, Vec3 } from "./types";

/**
 * 电影导演：宽银幕黑边、机位运镜（缓入缓出）、字幕、定格 / 胶片卡住。
 * 它只计算“第三人称电影机位”的相机姿态（getPose）；真正写入相机的是 PovRig，
 * 这样 you → watch → me 的切换可以在同一个地方做姿态混合。
 */

export interface CameraPose {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
}

const ease = (t: number): number => t * t * (3 - 2 * t);
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 2.2);
const v3 = (v: Vec3): THREE.Vector3 => new THREE.Vector3(v.x, v.y, v.z);

interface ShotAnim {
  from: CameraPose;
  to: CameraPose;
  t: number;
  duration: number;
  move: NonNullable<CameraShot["move"]>;
  /** orbit：围绕 look 的极坐标起止 */
  orbit?: { a0: number; a1: number; r0: number; r1: number; y0: number; y1: number };
  done?: () => void;
}

export class CinemaDirector {
  private readonly pose: CameraPose = { pos: new THREE.Vector3(0, 1.8, 5), look: new THREE.Vector3(0, 1.2, 0), fov: 46 };
  private anim: ShotAnim | null = null;
  private sway = 0;
  private time = 0;

  private readonly film: FilmControls = { film: 0, fade: 0, dim: 0, jitter: 0 };
  private jitterLeft = 0;
  private freeze: { t: number; resolve: () => void } | null = null;
  private dimTarget = 0;

  /** 定格后场景动态应停住（MemoryStage 读取） */
  frozen = false;

  constructor(
    private readonly hud: MemoryHud,
    private readonly filmPass: ShaderPass,
    /** 基准竖直 fov（竖屏时更大，MemoryStage 随窗口比例更新） */
    public baseFov: number
  ) {
    this.pose.fov = baseFov;
  }

  // ───────── 黑边 / 字幕 ─────────

  letterbox(on: boolean): void {
    this.hud.setLetterbox(on);
  }

  subtitle(text: string, zh?: string, highlight?: readonly string[], blank?: SubtitleOptions["blank"]): void {
    this.hud.setSubtitle(text, zh, { vocab: highlight, blank });
  }

  // ───────── 机位 ─────────

  /** 当前电影机位姿态（PovRig 在 watch 模式读取） */
  getPose(out: CameraPose): CameraPose {
    out.pos.copy(this.pose.pos);
    out.look.copy(this.pose.look);
    out.fov = this.pose.fov;
    if (!this.anim) {
      // 静止机位上叠一点手持呼吸，避免“死”画面
      const s = this.sway;
      out.pos.x += Math.sin(s * 0.7) * 0.012;
      out.pos.y += Math.sin(s * 0.53 + 1.3) * 0.01;
    }
    return out;
  }

  /** 把当前姿态硬设为 pose（切入 watch 之前，让运镜从相机现在的位置起步） */
  setPoseFrom(pos: THREE.Vector3, look: THREE.Vector3, fov: number): void {
    this.pose.pos.copy(pos);
    this.pose.look.copy(look);
    this.pose.fov = fov;
    this.anim = null;
  }

  /**
   * 运镜：duration 秒内从 from（缺省为当前机位）平滑移动到 to。
   * 返回的 Promise 在到达时 resolve；新的 shot 会取代进行中的 shot（旧的立即 resolve）。
   */
  shot(s: CameraShot): Promise<void> {
    this.finishAnim();
    const move = s.move ?? "dolly";
    const from: CameraPose = s.from
      ? { pos: v3(s.from), look: this.pose.look.clone(), fov: this.pose.fov }
      : { pos: this.pose.pos.clone(), look: this.pose.look.clone(), fov: this.pose.fov };
    const fovTo = s.fov ?? this.baseFov;
    const to: CameraPose = { pos: v3(s.to), look: v3(s.look), fov: move === "push" ? fovTo * 0.9 : fovTo };
    if (s.from) {
      // 切镜：起点直接落在 from，look 也跳到目标附近，避免从旧朝向“扫”过来
      from.look.copy(to.look);
      from.fov = fovTo;
    }
    const duration = Math.max(0.01, s.duration ?? 6);
    if (move === "still") {
      this.pose.pos.copy(to.pos);
      this.pose.look.copy(to.look);
      this.pose.fov = to.fov;
      return Promise.resolve();
    }
    let orbit: ShotAnim["orbit"];
    if (move === "orbit") {
      const c = to.look;
      const a0 = Math.atan2(from.pos.x - c.x, from.pos.z - c.z);
      let a1 = Math.atan2(to.pos.x - c.x, to.pos.z - c.z);
      while (a1 - a0 > Math.PI) a1 -= Math.PI * 2;
      while (a1 - a0 < -Math.PI) a1 += Math.PI * 2;
      orbit = {
        a0,
        a1,
        r0: Math.hypot(from.pos.x - c.x, from.pos.z - c.z),
        r1: Math.hypot(to.pos.x - c.x, to.pos.z - c.z),
        y0: from.pos.y,
        y1: to.pos.y,
      };
    }
    return new Promise<void>((resolve) => {
      this.anim = { from, to, t: 0, duration, move, orbit, done: resolve };
    });
  }

  private finishAnim(): void {
    const a = this.anim;
    if (!a) return;
    this.anim = null;
    a.done?.();
  }

  // ───────── 定格 ─────────

  /** 二维笔记本：背景压暗（CSS 的 backdrop-filter 负责虚化） */
  setDim(amount: number): void {
    this.dimTarget = amount;
  }

  /** 断片答错：胶片卡顿抖动 */
  glitch(seconds = 0.6): void {
    this.jitterLeft = seconds;
  }

  /**
   * 定格：画面停住 → 褪成暖色胶片（降饱和、颗粒、暗角）→ 题注 → 淡白上浮。
   */
  freezeFrame(caption: string, zh?: string): Promise<void> {
    this.frozen = true;
    this.hud.setChromeHidden(true);
    this.hud.clearSubtitle();
    this.hud.setPrompt();
    return new Promise<void>((resolve) => {
      this.freeze = { t: 0, resolve };
      window.setTimeout(() => this.hud.setCaption(caption, zh), 1500);
    });
  }

  update(dt: number): void {
    this.time += dt;
    this.sway += dt;

    const a = this.anim;
    if (a) {
      a.t += dt;
      const k = Math.min(1, a.t / a.duration);
      const e = a.move === "push" ? easeOut(k) : ease(k);
      if (a.orbit) {
        const o = a.orbit;
        const ang = THREE.MathUtils.lerp(o.a0, o.a1, e);
        const r = THREE.MathUtils.lerp(o.r0, o.r1, e);
        this.pose.pos.set(a.to.look.x + Math.sin(ang) * r, THREE.MathUtils.lerp(o.y0, o.y1, e), a.to.look.z + Math.cos(ang) * r);
      } else {
        this.pose.pos.lerpVectors(a.from.pos, a.to.pos, e);
      }
      this.pose.look.lerpVectors(a.from.look, a.to.look, e);
      this.pose.fov = THREE.MathUtils.lerp(a.from.fov, a.to.fov, e);
      if (k >= 1) this.finishAnim();
    }

    // 胶片卡顿
    this.jitterLeft = Math.max(0, this.jitterLeft - dt);
    this.film.jitter = this.jitterLeft > 0 ? Math.min(1, this.jitterLeft * 3) : 0;
    this.film.dim += (this.dimTarget - this.film.dim) * (1 - Math.exp(-dt * 4));

    const f = this.freeze;
    if (f) {
      f.t += dt;
      this.film.film = Math.min(1, f.t / 2.4);
      const fadeStart = 5.6;
      this.film.fade = f.t > fadeStart ? Math.min(1, (f.t - fadeStart) / 2.2) : 0;
      if (f.t > fadeStart + 2.3) {
        this.freeze = null;
        f.resolve();
      }
    }
    applyFilm(this.filmPass, this.film, this.time);
  }

  dispose(): void {
    this.finishAnim();
    if (this.freeze) {
      const f = this.freeze;
      this.freeze = null;
      f.resolve();
    }
  }
}
