import * as THREE from "three";
import { basisQuaternion, FINGER_COUNT, HumanRig, SIDES, type CoreBone } from "./humanRig";
import {
  buildPose, DEFAULT_SEAT, FK_BONES, FK_LIMITS, LISTEN_VARIANTS, PHONE_VARIANTS, poseForScript,
  type FkBone, type HumanPose, type PoseId, type SeatSpec, type V3,
} from "./humanPoses";

/**
 * 程序化动作层（叠加在姿势上）。对应 docs/api-character-motion.md「humanMotion」。
 * 层：呼吸 / 微晃 / 分层视线（眼→头→颈→脊柱）+ 扫视 / 眨眼 / 倾听点头 / 说话（下颌 + 口型 + 眉 + 点头 + 手势）
 *     / 手机拇指滑动 / 写字 / 空闲小动作 / 姿势过渡（含坐下 / 起身）/ 走路。
 * 每个人由 seed 决定所有周期、幅度与间隔，所以彼此不同步；老人 speed = 0.8 让所有层变慢。
 */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (t: number): number => {
  const k = Math.min(1, Math.max(0, t));
  return k * k * (3 - 2 * k);
};
const damp = (current: number, target: number, tau: number, dt: number): number => current + (target - current) * (1 - Math.exp(-dt / Math.max(1e-4, tau)));
const clamp = THREE.MathUtils.clamp;

/** 视线限位（弧度） */
export const GAZE_LIMITS = { eye: 0.52, head: 1.2, neck: 0.78, spine: 0.3 } as const;

interface LimbState { p: THREE.Vector3; rel: number; pole: THREE.Vector3; f: THREE.Vector3; n: THREE.Vector3 }
interface PropState { presence: number; p: THREE.Vector3; n: THREE.Vector3; u: THREE.Vector3 }

/** 可混合的姿势状态 */
class PoseState {
  hips = new THREE.Vector3();
  hipsQ = new THREE.Quaternion();
  fk: THREE.Quaternion[] = FK_BONES.map(() => new THREE.Quaternion());
  limbs: LimbState[] = [0, 1, 2, 3].map(() => ({ p: new THREE.Vector3(), rel: 0, pole: new THREE.Vector3(), f: new THREE.Vector3(), n: new THREE.Vector3() }));
  curl = new Array<number>(FINGER_COUNT * 2).fill(0);
  gaze = new THREE.Vector3();
  phone: PropState = { presence: 0, p: new THREE.Vector3(), n: new THREE.Vector3(0, 1, 0), u: new THREE.Vector3(0, 0, 1) };
  book: PropState = { presence: 0, p: new THREE.Vector3(), n: new THREE.Vector3(0, 1, 0), u: new THREE.Vector3(0, 0, 1) };
  pen = 0;
  seated = false;
  breath = 1;
  sway = 1;
  fidget = 1;
  gesture = 1;

  copy(o: PoseState): this {
    this.hips.copy(o.hips); this.hipsQ.copy(o.hipsQ);
    o.fk.forEach((q, i) => this.fk[i].copy(q));
    o.limbs.forEach((l, i) => { const m = this.limbs[i]; m.p.copy(l.p); m.rel = l.rel; m.pole.copy(l.pole); m.f.copy(l.f); m.n.copy(l.n); });
    for (let i = 0; i < this.curl.length; i++) this.curl[i] = o.curl[i];
    this.gaze.copy(o.gaze);
    for (const key of ["phone", "book"] as const) { const a = this[key], b = o[key]; a.presence = b.presence; a.p.copy(b.p); a.n.copy(b.n); a.u.copy(b.u); }
    this.pen = o.pen; this.seated = o.seated; this.breath = o.breath; this.sway = o.sway; this.fidget = o.fidget; this.gesture = o.gesture;
    return this;
  }
}

const _qf = new THREE.Quaternion();
const _qg = new THREE.Quaternion();
const _e = new THREE.Euler(0, 0, 0, "YXZ");
const eulerQuat = (v: readonly number[], out: THREE.Quaternion): THREE.Quaternion => out.setFromEuler(_e.set(v[0], v[1], v[2]));
const setV = (out: THREE.Vector3, v: V3, dx = 0): THREE.Vector3 => out.set(v[0] + dx, v[1], v[2]);

/** 把姿势数据写进可混合状态。dx = 站在椅子旁时整体沿 x 的偏移。 */
function loadState(pose: HumanPose, out: PoseState, dx: number): void {
  setV(out.hips, pose.hips, dx);
  eulerQuat(pose.hipsRot, out.hipsQ);
  FK_BONES.forEach((name, i) => eulerQuat(pose.fk[name] ?? [0, 0, 0], out.fk[i]));
  const all = [pose.hands[0], pose.hands[1], pose.feet[0], pose.feet[1]];
  all.forEach((t, i) => {
    const l = out.limbs[i];
    setV(l.p, t.p, t.rel ? 0 : dx);
    l.rel = t.rel;
    l.pole.set(...t.pole).normalize();
    l.f.set(...t.f).normalize();
    l.n.set(...t.n).normalize();
  });
  pose.curl[0].forEach((c, i) => (out.curl[i] = c));
  pose.curl[1].forEach((c, i) => (out.curl[FINGER_COUNT + i] = c));
  setV(out.gaze, pose.gaze, dx);
  for (const key of ["phone", "book"] as const) {
    const placement = pose[key];
    out[key].presence = placement ? 1 : 0;
    if (placement) { setV(out[key].p, placement.p, dx); out[key].n.set(...placement.n).normalize(); out[key].u.set(...placement.u).normalize(); }
  }
  out.pen = pose.pen ? 1 : 0;
  out.seated = pose.seated;
  out.breath = pose.profile.breath; out.sway = pose.profile.sway; out.fidget = pose.profile.fidget; out.gesture = pose.profile.gesture;
}

function lerpState(a: PoseState, b: PoseState, e: number, eH: number, eV: number, out: PoseState): void {
  out.hips.set(a.hips.x + (b.hips.x - a.hips.x) * eH, a.hips.y + (b.hips.y - a.hips.y) * eV, a.hips.z + (b.hips.z - a.hips.z) * eH);
  out.hipsQ.slerpQuaternions(a.hipsQ, b.hipsQ, e);
  out.fk.forEach((q, i) => q.slerpQuaternions(a.fk[i], b.fk[i], e));
  out.limbs.forEach((l, i) => {
    const x = a.limbs[i], y = b.limbs[i];
    l.p.lerpVectors(x.p, y.p, e);
    l.rel = x.rel + (y.rel - x.rel) * e;
    l.pole.lerpVectors(x.pole, y.pole, e).normalize();
    // 朝向用四元数球面插值（掌心从朝上翻到朝下时向量线性插值会穿过零点而突然翻转）
    basisQuaternion(x.f, x.n, _qf);
    basisQuaternion(y.f, y.n, _qg);
    _qf.slerp(_qg, e);
    l.f.set(1, 0, 0).applyQuaternion(_qf);
    l.n.set(0, 1, 0).applyQuaternion(_qf);
  });
  for (let i = 0; i < out.curl.length; i++) out.curl[i] = a.curl[i] + (b.curl[i] - a.curl[i]) * e;
  out.gaze.lerpVectors(a.gaze, b.gaze, e);
  for (const key of ["phone", "book"] as const) {
    const x = a[key], y = b[key], o = out[key];
    o.presence = x.presence + (y.presence - x.presence) * e;
    const src = x.presence <= 0 ? y : y.presence <= 0 ? x : null;
    if (src) { o.p.copy(src.p); o.n.copy(src.n); o.u.copy(src.u); }
    else { o.p.lerpVectors(x.p, y.p, e); o.n.lerpVectors(x.n, y.n, e).normalize(); o.u.lerpVectors(x.u, y.u, e).normalize(); }
  }
  out.pen = a.pen + (b.pen - a.pen) * e;
  out.seated = e < 0.5 ? a.seated : b.seated;
  out.breath = a.breath + (b.breath - a.breath) * e;
  out.sway = a.sway + (b.sway - a.sway) * e;
  out.fidget = a.fidget + (b.fidget - a.fidget) * e;
  out.gesture = a.gesture + (b.gesture - a.gesture) * e;
}

export interface AnimatorOptions {
  seed?: number;
  seat?: SeatSpec;
  /** 当前有椅子可坐：站姿时站在椅子侧边，坐下 / 起身走一段侧步 */
  hasSeat?: boolean;
  /** 年长：所有动作层 ×0.8，身体略含胸 */
  aged?: boolean;
  glasses?: boolean;
  initial?: PoseId;
  /** 带脸部 morph 的网格 */
  faces?: THREE.Mesh[];
  /** 道具（手机 / 笔 / 书）的父节点；不传则不创建道具 */
  propParent?: THREE.Object3D;
  owned?: Set<THREE.Material>;
}

interface Fidget {
  kind: "shift" | "shrug" | "neck" | "chin" | "nose" | "glasses" | "roll" | "stretch";
  t: number;
  dur: number;
  hand: 0 | 1;
  dir: number;
}

/** 说话 / 倾听 / 看谁 的外部输入 */
export interface Attention {
  speaking: boolean;
  listening: boolean;
}

const BLINK_CLOSE = 0.07, BLINK_HOLD = 0.03, BLINK_OPEN = 0.11;
const blinkCurve = (t: number): number => (t < 0 ? 0 : t < BLINK_CLOSE ? t / BLINK_CLOSE : t < BLINK_CLOSE + BLINK_HOLD ? 1 : t < BLINK_CLOSE + BLINK_HOLD + BLINK_OPEN ? 1 - (t - BLINK_CLOSE - BLINK_HOLD) / BLINK_OPEN : 0);

export class HumanAnimator {
  readonly rig: HumanRig;
  readonly seat: SeatSpec;
  readonly speed: number;
  private readonly rng: () => number;
  private readonly poses = new Map<PoseId, HumanPose>();
  private readonly from = new PoseState();
  private readonly to = new PoseState();
  private readonly cur = new PoseState();
  private transition: { t: number; dur: number; kind: "sit" | "stand" | "normal" } | null = null;
  private settled = true;
  private readonly footLift = [0, 0];
  private poseId: PoseId;
  private scriptPose = "listen";
  private variants: readonly PoseId[] = [];
  private variantTimer = 0;
  private readonly standDx: number;
  clock = 0;
  private acc = 0;
  lowRate = false;

  // 个体参数（来自 seed）
  /** 呼吸周期（秒，3.5–4.5；说话时更短） */
  readonly breathPeriod: number;
  private breathPhase = 0;
  private readonly breathAmp: number;
  private readonly swayP: [number, number, number, number];
  private readonly swayPhase: number[];
  private readonly nodAmp: number;
  private readonly handPref: 0 | 1;

  // 输入
  private speaking = false;
  private listening = false;
  private wasListening = false;
  private listenTime = 0;
  private lookTarget: THREE.Vector3 | null = null;
  private pendingTarget: { p: THREE.Vector3 | null; delay: number } | null = null;
  private glanceTarget: THREE.Vector3 | null = null;
  private smile = 0;
  private walkWeight = 0;
  private walkPhase = 0;
  private walkOn = false;

  // 视线
  private gaze = { eyeYaw: 0, eyePitch: 0, headYaw: 0, headPitch: 0, neckYaw: 0, neckPitch: 0, spineYaw: 0, spinePitch: 0, lastTotalYaw: 0, lastTotalPitch: 0 };
  private saccade = { t: 1, yaw: 0, pitch: 0, curYaw: 0, curPitch: 0 };
  private glance = { t: 6, active: 0, dur: 0, yaw: 0, pitch: 0, atCamera: false };
  private blink = { t: 2.5, k: 0, active: false, double: false };
  private nod = { timer: 3, left: 0, t: 0, amp: 0.07, period: 0.55, pending: 0 };

  // 说话
  private speech = { env: 0, target: 0, t: 0, shape: 0.5, stress: 0, brow: 0, beat: 0, gestureT: 1, gesture: 0, gestureDur: 0.55, gestureAmp: 0.06, gestureHand: 1 as 0 | 1, headBeat: 0, headBeatPhase: 0 };
  // 手 / 写字 / 手机
  private write = { x: 0, line: 0, t: 0, speed: 0.012 };
  private scroll = { t: 1.5, phase: -1, dur: 0.38, bend: 0, thumbBase: 0 };
  private laugh = 0;
  private laughPhase = 0;
  private fidget: Fidget | null = null;
  private fidgetTimer: number;
  private shiftOffset = new THREE.Vector3();
  private shiftTarget = new THREE.Vector3();
  private shiftRot = 0;
  private shiftRotTarget = 0;

  private readonly morphs: { mesh: THREE.Mesh; map: Map<string, number> }[] = [];
  private readonly propMeshes: { phone?: THREE.Group; pen?: THREE.Mesh; book?: THREE.Group; glasses?: THREE.Group } = {};
  private readonly out = { hips: new THREE.Vector3(), tmp: new THREE.Vector3() };
  private readonly _v = new THREE.Vector3();
  private readonly _v2 = new THREE.Vector3();
  private readonly _v3 = new THREE.Vector3();
  private readonly _v4 = new THREE.Vector3();
  private readonly _qa = new THREE.Quaternion();
  private readonly _qb = new THREE.Quaternion();
  private readonly _qc = new THREE.Quaternion();
  private readonly spine2Q = new THREE.Quaternion();
  private neckFkPitch = 0;
  private readonly curlTmp = new Array<number>(FINGER_COUNT).fill(0);
  private readonly _m = new THREE.Matrix4();
  private readonly aged: boolean;
  private readonly glasses: boolean;

  constructor(rig: HumanRig, opts: AnimatorOptions = {}) {
    this.rig = rig;
    this.seat = opts.seat ?? DEFAULT_SEAT;
    this.aged = opts.aged === true;
    this.glasses = opts.glasses === true;
    this.speed = this.aged ? 0.8 : 1;
    this.rng = mulberry32(opts.seed ?? 1);
    const r = this.rng;
    this.breathPeriod = 3.5 + r();
    this.breathPhase = r() * Math.PI * 2;
    this.breathAmp = 0.85 + r() * 0.3;
    this.swayP = [7 + r() * 6, 9 + r() * 6, 11 + r() * 5, 6 + r() * 4];
    this.swayPhase = [r() * 6.28, r() * 6.28, r() * 6.28, r() * 6.28];
    this.nodAmp = 0.6 + r() * 0.8;
    this.handPref = r() < 0.86 ? 1 : 0;
    this.fidgetTimer = 6 + r() * 12;
    this.standDx = opts.hasSeat ? this.seat.standOffsetX ?? 0.55 : 0;
    this.blink.t = 1 + r() * 4;
    this.glance.t = 3 + r() * 6;
    this.nod.timer = 2 + r() * 4;
    this.scroll.t = 1 + r() * 2;
    this.speech.gestureT = 0.6 + r();
    for (const mesh of opts.faces ?? []) if (mesh.morphTargetDictionary) this.morphs.push({ mesh, map: new Map(Object.entries(mesh.morphTargetDictionary)) });
    this.poseId = opts.initial ?? (opts.hasSeat ? "sitUpright" : "standRelaxed");
    this.loadTarget(this.poseId);
    this.cur.copy(this.to);
    this.from.copy(this.to);
    this.setVariants(this.poseId);
    this.variantTimer = 15 + r() * 20;
    if (opts.propParent) this.createProps(opts.propParent, opts.owned);
  }

  // ───────── 公开接口 ─────────

  get pose(): PoseId { return this.poseId; }
  get seated(): boolean { return this.cur.seated; }
  get isTransitioning(): boolean { return this.transition !== null; }
  get hipsPosition(): THREE.Vector3 { return this.out.hips; }

  /** 当前人物是不是在说话（嘴 / 手势 / 呼吸都会变） */
  setSpeaking(on: boolean): void {
    if (on === this.speaking) return;
    this.speaking = on;
    if (on) { this.speech.gestureT = 0.3 + this.rng() * 0.6; this.speech.t = 0; }
  }
  isSpeaking(): boolean { return this.speaking; }
  /** 有人在说话（不是自己）：偶尔点头 */
  setListening(on: boolean): void { this.listening = on; }
  /** 注视目标（frame 空间）；null = 回到姿势默认视线。会有 0.15–0.5 s 的反应延迟 */
  setLookTarget(p: THREE.Vector3 | null, instant = false): void {
    if (instant) { this.lookTarget = p ? p.clone() : null; this.pendingTarget = null; return; }
    this.pendingTarget = { p: p ? p.clone() : null, delay: 0.15 + this.rng() * 0.35 };
  }
  /** 偶尔扫一眼的目标（例如第一人称的镜头 / 玩家） */
  setGlanceTarget(p: THREE.Vector3 | null): void {
    if (!p) this.glanceTarget = null;
    else (this.glanceTarget ??= new THREE.Vector3()).copy(p);
  }
  /** 目标移动时（说话的人在走动）刷新当前注视点，不重新触发反应延迟 */
  trackLookTarget(p: THREE.Vector3): void {
    if (this.pendingTarget?.p) this.pendingTarget.p.copy(p);
    else if (this.lookTarget) this.lookTarget.copy(p);
  }
  /** 一个词 / 重音脉冲（Narrator 词事件）：推一下口型与眉毛 */
  pulse(strength = 1): void {
    this.speech.stress = Math.max(this.speech.stress, strength);
    this.speech.target = Math.max(this.speech.target, 0.8);
  }
  setWalking(on: boolean, phase: number): void { this.walkOn = on; this.walkPhase = phase; }
  setSmile(v: number): void { this.smile = clamp(v, 0, 1); }

  /** 用剧本姿势名（stand / phone / listen / talk / write / read / walk / point / sit / lap / reach / laugh）切换 */
  setScriptPose(pose: string, seated: boolean, opts: { instant?: boolean; duration?: number } = {}): void {
    this.scriptPose = pose;
    const id = poseForScript(pose, seated);
    this.setVariants(id, pose);
    this.setSpeaking(pose === "talk");
    this.setPose(id, opts.instant ? 0 : opts.duration);
    this.variantTimer = 18 + this.rng() * 22;
  }

  setPose(id: PoseId, duration?: number): void {
    if (id === this.poseId) return;
    const prevSeated = this.to.seated;
    this.from.copy(this.cur);
    this.poseId = id;
    this.loadTarget(id);
    const kind: "sit" | "stand" | "normal" = !prevSeated && this.to.seated ? "sit" : prevSeated && !this.to.seated ? "stand" : "normal";
    const dur = duration ?? (kind === "normal" ? 0.55 + this.rng() * 0.3 : 0.9);
    this.settled = false;
    if (dur <= 0) { this.transition = null; this.cur.copy(this.to); this.settled = true; return; }
    this.transition = { t: 0, dur, kind };
  }

  /** 姿势的最终目标位姿（测试用：不含运动层） */
  getTarget(): PoseState { return this.to; }

  // ───────── 内部：姿势 ─────────

  private loadTarget(id: PoseId): void {
    let pose = this.poses.get(id);
    if (!pose) {
      pose = buildPose(id, { dims: this.rig.dims, seat: this.seat });
      this.poses.set(id, pose);
    }
    loadState(pose, this.to, pose.seated ? 0 : this.standDx);
    if (this.aged) this.applyAge(this.to);
  }

  /** 年长者：骨盆略后倾、胸略含、头略前伸 */
  private applyAge(state: PoseState): void {
    state.fk[0].multiply(this._qa.setFromEuler(_e.set(0.04, 0, 0)));
    state.fk[2].multiply(this._qa.setFromEuler(_e.set(0.07, 0, 0)));
    state.fk[3].multiply(this._qa.setFromEuler(_e.set(0.1, 0, 0)));
  }

  private setVariants(id: PoseId, script = this.scriptPose): void {
    this.variants = (script === "listen" || script === "sit") && id === "sitUpright" ? LISTEN_VARIANTS : script === "phone" && id === "sitPhoneLap" ? PHONE_VARIANTS : [];
  }

  // ───────── 每帧 ─────────

  update(dtReal: number): void {
    this.acc += Math.min(dtReal, 0.1);
    if (this.lowRate && this.acc < 0.1) return;
    const dt = this.acc * this.speed;
    this.acc = 0;
    if (dt <= 0) return;
    this.clock += dt;
    this.stepPose(dt);
    this.stepEvents(dt);
    this.apply(dt);
  }

  private stepPose(dt: number): void {
    if (this.pendingTarget) {
      this.pendingTarget.delay -= dt;
      if (this.pendingTarget.delay <= 0) { this.lookTarget = this.pendingTarget.p; this.pendingTarget = null; }
    }
    if (!this.transition) {
      if (!this.settled) { this.cur.copy(this.to); this.settled = true; }
      return;
    }
    const tr = this.transition;
    tr.t += dt;
    const k = tr.t / tr.dur;
    const e = smooth(k);
    let eH = e, eV = e;
    if (tr.kind === "sit") { eH = smooth(k / 0.7); eV = smooth((k - 0.3) / 0.7); }
    else if (tr.kind === "stand") { eV = smooth(k / 0.7); eH = smooth((k - 0.3) / 0.7); }
    lerpState(this.from, this.to, e, eH, eV, this.cur);
    // 坐下 / 起身要迈步：两脚先后抬离地面一小段（脚不在地上滑）
    if (tr.kind !== "normal") {
      this.footLift[0] = 0.07 * Math.sin(Math.PI * clamp((k - 0.05) / 0.7, 0, 1));
      this.footLift[1] = 0.07 * Math.sin(Math.PI * clamp((k - 0.2) / 0.7, 0, 1));
    }
    if (k >= 1) { this.transition = null; this.cur.copy(this.to); this.settled = true; this.footLift[0] = this.footLift[1] = 0; }
  }

  private stepEvents(dt: number): void {
    const r = this.rng;
    const sp = this.speech;
    const talking = this.speaking && !this.transition;

    // 说话包络：音节（每个 110–230 ms）+ 停顿
    if (this.speaking) {
      sp.t -= dt;
      if (sp.t <= 0) {
        if (r() < 0.1) { sp.target = 0; sp.t = 0.15 + r() * 0.3; }
        else { sp.target = 0.3 + r() * 0.7; sp.t = 0.11 + r() * 0.12; sp.shape = r(); if (r() < 0.24) sp.stress = 1; }
      }
    } else sp.target = 0;
    sp.env = damp(sp.env, sp.target, sp.target > sp.env ? 0.035 : 0.06, dt);
    sp.stress = damp(sp.stress, 0, 0.18, dt);
    sp.brow = damp(sp.brow, sp.stress, 0.1, dt);
    if (talking) {
      sp.gestureT -= dt;
      if (sp.gestureT <= 0 && sp.gesture <= 0) {
        sp.gesture = 1e-4;
        sp.gestureDur = 0.5 + r() * 0.35;
        sp.gestureAmp = 0.04 + r() * 0.05;
        sp.gestureHand = r() < 0.8 ? this.handPref : ((1 - this.handPref) as 0 | 1);
        sp.gestureT = 0.8 + r() * 1.6;
      }
    }
    if (sp.gesture > 0) { sp.gesture += dt / sp.gestureDur; if (sp.gesture >= 1) sp.gesture = 0; }
    sp.headBeatPhase += dt * (3.2 + sp.env * 2);

    // 眨眼：2–6 s，说话稍频繁，笑时抑制
    const bl = this.blink;
    bl.t -= dt;
    if (bl.t <= 0 && !bl.active) {
      bl.active = true;
      bl.k = 0;
      bl.double = r() < 0.08;
      bl.t = (2 + r() * 4) * (this.speaking ? 0.75 : 1);
    }
    if (bl.active) {
      bl.k += dt;
      if (bl.k > BLINK_CLOSE + BLINK_HOLD + BLINK_OPEN + 0.02) {
        if (bl.double) { bl.double = false; bl.k = -0.1; } else bl.active = false;
      }
    }

    // 扫视：0.7–2.8 s 一次的微小眼动
    const sc = this.saccade;
    sc.t -= dt;
    if (sc.t <= 0) {
      sc.t = 0.7 + r() * 2.1;
      const writing = this.poseId === "sitWrite" || this.poseId.startsWith("sitPhone");
      sc.yaw = (r() - 0.5) * (writing ? 0.1 : 0.07);
      sc.pitch = (r() - 0.5) * 0.05;
    }
    sc.curYaw = damp(sc.curYaw, sc.yaw, 0.03, dt);
    sc.curPitch = damp(sc.curPitch, sc.pitch, 0.03, dt);

    // 看向别处再回看（4–10 s）；有“瞟一眼玩家”的目标时 25% 概率看向它
    const g = this.glance;
    if (g.active > 0) {
      g.active -= dt;
    } else {
      g.t -= dt;
      if (g.t <= 0 && !this.speaking) {
        g.t = (4 + r() * 6) * (this.listening ? 0.8 : 1);
        g.dur = 0.7 + r() * 0.9;
        g.active = g.dur;
        g.atCamera = this.glanceTarget !== null && r() < 0.28;
        const dir = r() < 0.5 ? -1 : 1;
        g.yaw = dir * (0.22 + r() * 0.25);
        g.pitch = (r() - 0.35) * 0.3;
        if (!bl.active) bl.t = Math.min(bl.t, 0.12); // 转头时顺带眨一次
      }
    }

    // 倾听点头：别人说话时每 1.8–5 s 点 1–3 下；说话人刚停下时有时再点一下
    const nd = this.nod;
    if (this.listening) this.listenTime += dt;
    if (this.wasListening && !this.listening && this.listenTime > 1.5 && r() < 0.55) { nd.pending = 1; nd.left = 1; nd.t = 0; nd.amp = (0.05 + r() * 0.03) * this.nodAmp; }
    if (!this.listening) this.listenTime = 0;
    this.wasListening = this.listening;
    if (this.listening && nd.left <= 0) {
      nd.timer -= dt;
      if (nd.timer <= 0) {
        nd.left = 1 + Math.floor(r() * 3);
        nd.t = 0;
        nd.amp = (0.05 + r() * 0.04) * this.nodAmp;
        nd.period = 0.5 + r() * 0.15;
        nd.timer = (1.8 + r() * 3.2) / this.nodAmp;
      }
    }
    if (nd.left > 0) {
      nd.t += dt;
      if (nd.t >= nd.period) { nd.t -= nd.period; nd.left--; }
    }

    // 手机拇指滑动：每 1.2–3.2 s 一次 0.38 s 的滑动
    if (this.cur.phone.presence > 0.6 && this.poseId.startsWith("sitPhone")) {
      const s = this.scroll;
      if (s.phase < 0) {
        s.t -= dt;
        if (s.t <= 0) { s.phase = 0; s.dur = 0.3 + r() * 0.2; s.t = 1.2 + r() * 2.2; }
      } else {
        s.phase += dt / s.dur;
        if (s.phase >= 1) s.phase = -1;
      }
    }

    // 写字：笔尖沿行推进，行尾回到行首并下移一行
    if (this.poseId === "sitWrite" && !this.transition) {
      const w = this.write;
      w.t += dt;
      w.x += dt * w.speed;
      if (w.x > 0.075) { w.x = -0.01; w.line = (w.line + 1) % 4; w.speed = 0.009 + r() * 0.008; }
    }

    // 笑：沿 laugh 目标缓入缓出
    this.laugh = damp(this.laugh, this.poseId === "sitLaugh" ? 1 : 0, 0.35, dt);
    this.laughPhase += dt * (10 + Math.sin(this.clock * 1.7) * 2) * this.laugh;

    // 空闲小动作（每个人 8–20 s 一次）
    this.stepFidget(dt);
    // 听讲变体（端坐 / 写字 / 前倾 / 托腮）与手机变体：低频换姿势
    if (this.variants.length > 1 && !this.speaking && !this.transition) {
      this.variantTimer -= dt;
      if (this.variantTimer <= 0) {
        this.variantTimer = 20 + r() * 30;
        let next = Math.floor(r() * this.variants.length);
        if (this.variants[next] === this.poseId) next = (next + 1) % this.variants.length;
        this.setPose(this.variants[next]);
      }
    }
    this.smile = damp(this.smile, this.poseId === "sitLaugh" ? 0.95 : this.listening ? 0.12 : 0.06, 0.3, dt);
  }

  private stepFidget(dt: number): void {
    const r = this.rng;
    if (this.fidget) {
      const f = this.fidget;
      f.t += dt;
      if (f.t >= f.dur) {
        this.fidget = null;
        this.shiftTarget.set(0, 0, 0);
        this.shiftRotTarget = 0;
      }
    } else if (this.cur.fidget > 0 && !this.transition && this.walkWeight < 0.05 && this.poseId !== "sitLaugh") {
      this.fidgetTimer -= dt / this.cur.fidget;
      if (this.fidgetTimer <= 0) {
        this.fidgetTimer = 8 + r() * 12;
        const seated = this.cur.seated;
        // 手在忙（说话 / 拿手机 / 写字 / 伸手）时不摸脸；写字时只用左手
        const handsFree = !this.speaking && !this.poseId.startsWith("sitPhone") && this.poseId !== "sitReach" && this.poseId !== "standHoldBook" && this.poseId !== "standPhone";
        const kinds: Fidget["kind"][] = seated ? ["shift", "shift", "shrug", "roll", "stretch"] : ["shift", "shift", "shrug", "roll"];
        if (handsFree) kinds.push("neck", "nose", seated ? "chin" : "nose");
        if (handsFree && this.glasses) kinds.push("glasses", "glasses");
        const kind = kinds[Math.floor(r() * kinds.length)];
        const hand = this.poseId === "sitWrite" ? 0 : this.handPref;
        this.fidget = { kind, t: 0, dur: kind === "shift" ? 3 + r() * 3 : kind === "stretch" ? 2.4 : kind === "shrug" ? 1.3 : 2 + r() * 0.8, hand, dir: r() < 0.5 ? -1 : 1 };
        if (kind === "shift") {
          // 调整坐姿：骨盆前后挪、躯干换个重心
          this.shiftTarget.set((r() - 0.5) * 0.03, 0, seated ? (r() - 0.35) * 0.04 : 0);
          this.shiftRotTarget = (r() - 0.5) * 0.06;
        }
      }
    }
    this.shiftOffset.x = damp(this.shiftOffset.x, this.shiftTarget.x, 0.7, dt);
    this.shiftOffset.z = damp(this.shiftOffset.z, this.shiftTarget.z, 0.7, dt);
    this.shiftRot = damp(this.shiftRot, this.shiftRotTarget, 0.8, dt);
  }

  // ───────── 把状态 + 运动层写到骨架 ─────────

  private apply(dt: number): void {
    const rig = this.rig;
    const st = this.cur;
    const t = this.clock;
    const speakScale = this.speaking ? 0.6 : 1;
    this.walkWeight = damp(this.walkWeight, this.walkOn && !st.seated ? 1 : 0, 0.22, dt);
    const ww = this.walkWeight;
    rig.syncFrame();
    rig.resetPose();

    // 呼吸：周期 3.5–4.5 s，说话时变浅变快
    const period = this.breathPeriod * (this.speaking ? 0.78 : 1);
    this.breathPhase += (dt * Math.PI * 2) / period;
    const b = Math.sin(this.breathPhase) * this.breathAmp * st.breath * speakScale;
    this.breathValue = b;
    // 微晃：几条不同周期的慢正弦
    const sw = st.sway * (this.aged ? 0.8 : 1);
    const s1 = Math.sin((t * Math.PI * 2) / this.swayP[0] + this.swayPhase[0]);
    const s2 = Math.sin((t * Math.PI * 2) / this.swayP[1] + this.swayPhase[1]);
    const s3 = Math.sin((t * Math.PI * 2) / this.swayP[2] + this.swayPhase[2]);
    const s4 = Math.sin((t * Math.PI * 2) / this.swayP[3] + this.swayPhase[3]);

    // ── 骨盆 ──
    const hips = this.out.hips.copy(st.hips).add(this.shiftOffset);
    if (!st.seated) {
      hips.x += s1 * 0.012 * sw; // 站姿：重心缓慢左右移动
      hips.z += s2 * 0.004 * sw;
    } else {
      hips.z += s4 * 0.003 * sw;
    }
    // 走路：上下起伏
    if (ww > 0.001) hips.y -= (0.012 + 0.012 * Math.cos(this.walkPhase * 2)) * ww;
    if (this.laugh > 0.01) hips.y += Math.abs(Math.sin(this.laughPhase)) * 0.004 * this.laugh;
    rig.setHipsPosition(hips);
    const q = this._qa;
    q.copy(st.hipsQ);
    q.multiply(this._qb.setFromEuler(_e.set(s3 * 0.006 * sw, ww * Math.sin(this.walkPhase) * 0.06, this.shiftRot + s1 * (st.seated ? 0.004 : 0.012) * sw + ww * Math.cos(this.walkPhase) * 0.03)));
    rig.rotate("Hips", q);

    // ── 脊柱 / 肩（FK + 呼吸 + 微晃 + 笑）──
    const spineSway = [s1 * 0.007 * sw, 0, s2 * 0.007 * sw];
    const lf = this.laugh;
    const laughShake = Math.sin(this.laughPhase) * lf;
    const fd = this.fidget;
    const fk = fd ? Math.sin(Math.PI * Math.min(1, fd.t / fd.dur)) ** 1.5 : 0;
    const upper = (boneIndex: number, name: FkBone): void => {
      const base = st.fk[boneIndex];
      let pitch = 0, yaw = 0, roll = 0;
      if (name === "Spine") { yaw = spineSway[0] * 0.8 + ww * Math.sin(this.walkPhase) * -0.05; roll = spineSway[2] * 0.6; pitch = spineSway[0] * 0.4; }
      else if (name === "Spine1") { pitch = -0.012 * b; yaw = spineSway[0] * 0.5; roll = spineSway[2] * 0.6; if (fd?.kind === "stretch") pitch -= 0.09 * fk; }
      else if (name === "Spine2") {
        pitch = -0.02 * b + laughShake * 0.035; yaw = spineSway[0] * 0.4; roll = spineSway[2] * 0.4;
        if (fd?.kind === "roll") { yaw += fd.dir * 0.05 * fk; roll += fd.dir * 0.03 * fk; }
      } else if (name === "LeftShoulder") {
        roll = 0.014 * b + laughShake * 0.03;
        if (fd?.kind === "shrug" || fd?.kind === "stretch") roll += (fd.kind === "shrug" ? 0.12 : 0.08) * fk;
      } else {
        roll = -0.014 * b - laughShake * 0.03;
        if (fd?.kind === "shrug" || fd?.kind === "stretch") roll -= (fd.kind === "shrug" ? 0.12 : 0.08) * fk;
      }
      this._qb.setFromEuler(_e.set(pitch, yaw, roll));
      this._qc.copy(base).multiply(this._qb);
      if (name === "Spine2") this.spine2Q.copy(this._qc);
      rig.rotate(name, this._qc);
    };
    upper(0, "Spine");
    upper(1, "Spine1");
    upper(2, "Spine2");
    upper(4, "LeftShoulder");
    upper(5, "RightShoulder");
    rig.updateWorld();

    // ── 视线：眼 → 头 → 颈 → 脊柱 ──
    this.solveGaze(dt, st, rig);
    rig.updateWorld();

    // ── 手 / 脚 IK ──
    const targets = this.limbTargets(st, hips);
    for (let i = 0; i < 4; i++) {
      const side = SIDES[i % 2];
      const limb = i < 2 ? rig.arms[side] : rig.legs[side];
      const tg = targets[i];
      rig.solveLimb(limb, tg.p, tg.pole);
      rig.orientEnd(side, i < 2 ? "hand" : "foot", tg.f, tg.n);
    }
    for (const [i, side] of SIDES.entries()) {
      for (let f = 0; f < FINGER_COUNT; f++) this.curlTmp[f] = st.curl[i * FINGER_COUNT + f] + this.fidgetCurl(i as 0 | 1, f);
      rig.setCurl(side, this.curlTmp);
    }
    this.applyThumbScroll();
    this.updateProps(st, targets);
    this.updateGlasses();
    this.applyFace(dt, st);
  }

  private fidgetCurl(side: 0 | 1, finger: number): number {
    const f = this.fidget;
    let extra = 0;
    // 摸脸 / 推眼镜：手指略伸直
    if (f && f.hand === side && (f.kind === "glasses" || f.kind === "nose" || f.kind === "chin" || f.kind === "neck")) {
      const k = Math.sin(Math.PI * Math.min(1, f.t / f.dur));
      extra -= (finger === 1 ? 0.2 : 0.05) * k;
    }
    // 空闲手：每个人不同相位的缓慢手指起伏（不是握拳也不是僵直）
    extra += Math.sin(this.clock * (0.5 + finger * 0.11) + this.swayPhase[finger % 4] + side * 2) * 0.05;
    return extra;
  }

  /** 手 / 脚的最终目标（含呼吸之外的所有手部层） */
  private limbs: { p: THREE.Vector3; pole: THREE.Vector3; f: THREE.Vector3; n: THREE.Vector3 }[] = [0, 1, 2, 3].map(() => ({ p: new THREE.Vector3(), pole: new THREE.Vector3(), f: new THREE.Vector3(), n: new THREE.Vector3() }));

  private limbTargets(st: PoseState, hips: THREE.Vector3): typeof this.limbs {
    const out = this.limbs;
    const ww = this.walkWeight;
    const t = this.clock;
    const talking = this.speaking && !this.transition;
    const sp = this.speech;
    st.limbs.forEach((l, i) => {
      const o = out[i];
      o.p.copy(l.p).addScaledVector(hips, l.rel);
      o.pole.copy(l.pole);
      o.f.copy(l.f);
      o.n.copy(l.n);
    });
    // 站姿手在身体两侧的自然摆动 / 走路摆臂
    if (!st.seated) {
      const sway = Math.sin(t * 0.8 + this.swayPhase[0]) * 0.006;
      out[0].p.y += sway; out[1].p.y -= sway;
      out[0].p.z += -Math.sin(this.walkPhase) * 0.13 * ww;
      out[1].p.z += Math.sin(this.walkPhase) * 0.13 * ww;
      out[0].p.y += Math.max(0, -Math.sin(this.walkPhase)) * 0.02 * ww;
      out[1].p.y += Math.max(0, Math.sin(this.walkPhase)) * 0.02 * ww;
    }
    // 手势：说话的“拍点”小动作
    if (talking && sp.gesture > 0) {
      const k = Math.sin(Math.PI * sp.gesture) ** 0.8 * (st.gesture ?? 1);
      const idx = sp.gestureHand;
      const o = out[idx];
      const amp = sp.gestureAmp * (this.aged ? 0.8 : 1);
      const free = st.seated && o.p.y < this.seat.tableHeight + 0.1; // 手在桌上：只抬起腕与前臂，不离桌太远
      o.p.y += amp * k * (free ? 1.4 : 1);
      o.p.z += amp * 0.6 * k;
      o.p.x += (idx === 0 ? -1 : 1) * amp * 0.3 * k * Math.sin(sp.gesture * 6);
      o.f.y += 0.4 * k;
      o.n.x += (idx === 0 ? 1 : -1) * 0.5 * k;
    }
    // 说话时自由手轻微漂移
    if (talking && st.seated) {
      const idx = (1 - sp.gestureHand) as 0 | 1;
      out[idx].p.y += Math.sin(t * 1.3 + idx) * 0.004;
    }
    // 写字：笔尖沿行推进
    if (this.poseId === "sitWrite" && !this.transition) {
      const w = this.write;
      const o = out[1];
      const rowOffset = w.line * 0.016;
      o.p.x += w.x * 1.0;
      o.p.z -= rowOffset * -0.6;
      o.p.x += Math.sin(t * 38) * 0.0018 + Math.sin(t * 23) * 0.0014; // 笔画微动
      o.p.z += Math.sin(t * 31 + 1.2) * 0.0016;
      o.p.y += Math.max(0, Math.sin(t * 9)) * 0.0025;
      out[0].p.x += Math.sin(t * 0.7) * 0.002; // 左手按纸，轻微跟随
    }
    // 手机：右手随拇指滑动轻微位移
    if (this.poseId.startsWith("sitPhone") && st.phone.presence > 0.5) {
      const s = this.scroll;
      const k = s.phase >= 0 ? Math.sin(Math.PI * s.phase) : 0;
      out[1].p.y += k * 0.004;
      out[1].p.z += k * 0.006;
      out[0].p.y += Math.sin(t * 0.9 + 1.4) * 0.0015;
    }
    // 笑：双手随身体抖动
    if (this.laugh > 0.01) {
      const shake = Math.sin(this.laughPhase) * 0.006 * this.laugh;
      out[0].p.y += shake; out[1].p.y += shake;
    }
    // 小动作中的手：摸后颈 / 下巴 / 鼻子 / 推眼镜
    this.applyHandFidget(out);
    // 脚：走路步态；坐姿不动，只有重心转移时脚位保持
    if (ww > 0.001) {
      for (let i = 2; i < 4; i++) {
        const phase = this.walkPhase + (i === 3 ? Math.PI : 0);
        const o = out[i];
        o.p.z += Math.sin(phase) * 0.24 * ww;
        o.p.y += Math.max(0, Math.cos(phase)) * 0.085 * ww;
      }
    }
    out[2].p.y += this.footLift[0];
    out[3].p.y += this.footLift[1];
    // 坐姿：脚跟随重心转移时在地面微微挪动（脚尖点地）
    if (st.seated) {
      out[2].p.z += this.shiftOffset.z * 0.4;
      out[3].p.z += this.shiftOffset.z * 0.4;
    }
    return out;
  }

  private applyHandFidget(out: typeof this.limbs): void {
    const f = this.fidget;
    if (!f || (f.kind !== "neck" && f.kind !== "chin" && f.kind !== "nose" && f.kind !== "glasses")) return;
    const rig = this.rig;
    const head = rig.position("Head", this._v2);
    const w = Math.sin(Math.PI * Math.min(1, f.t / f.dur)) ** 0.7; // 缓入缓出的权重
    const sideSign = f.hand === 0 ? 1 : -1;
    const tgt = this._v3.copy(head);
    const dims = rig.dims;
    const o = out[f.hand];
    const fingers = this._v4;
    const normal = this._v;
    switch (f.kind) {
      case "neck": tgt.add(this.offset(0.05 * sideSign, -0.06, -0.09)); fingers.set(0.2 * sideSign, 0.9, 0.1); normal.set(-0.3 * sideSign, 0.2, 0.9); break;
      case "chin": tgt.add(this.offset(0.03 * sideSign, -0.12, 0.1)); fingers.set(0.2 * sideSign, 0.9, 0.3); normal.set(-0.9 * sideSign, 0, 0.3); break;
      case "nose": tgt.add(this.offset(0.035 * sideSign, -0.065, 0.14)); fingers.set(0.1 * sideSign, 0.95, 0.3); normal.set(-0.9 * sideSign, 0.1, 0.1); break;
      case "glasses": tgt.add(this.offset(0.03 * sideSign, dims.headToEyeY - 0.075 + 0.0, 0.16)); fingers.set(0.1 * sideSign, 0.95, 0.3); normal.set(-0.9 * sideSign, 0.1, 0.1); break;
    }
    o.p.lerp(tgt, w);
    o.f.lerp(fingers, w).normalize();
    o.n.lerp(normal, w).normalize();
    o.pole.lerp(this._v2.set(0.8 * sideSign * -1, -0.2, -0.8), w * 0.8);
  }
  private offset(x: number, y: number, z: number): THREE.Vector3 {
    return this.out.tmp.set(x, y, z);
  }

  private applyThumbScroll(): void {
    const s = this.scroll;
    if (this.cur.phone.presence < 0.5 || !this.poseId.startsWith("sitPhone")) return;
    const k = s.phase >= 0 ? Math.sin(Math.PI * s.phase) : 0;
    if (this.poseId === "sitPhoneLap") {
      // 拇指在屏幕上滑动：近节 / 中节小幅屈伸
      this.rig.addFingerBend("Right", "Thumb", 0, -0.55 * k + Math.sin(this.clock * 1.1) * 0.02);
      this.rig.addFingerBend("Right", "Thumb", 1, 0.45 * k);
    } else {
      // 手机在桌上：食指点屏
      const tap = Math.max(0, Math.sin(this.clock * 5.5 + this.swayPhase[1])) * (k > 0 ? 1 : 0.25);
      this.rig.addFingerBend("Right", "Index", 0, 0.25 * tap);
      this.rig.addFingerBend("Right", "Index", 1, 0.2 * tap);
    }
  }

  // ───────── 视线 ─────────

  private solveGaze(dt: number, st: PoseState, rig: HumanRig): void {
    const g = this.gaze;
    const head = rig.position("Head", this._v);
    const eye = this._v2.set(head.x, head.y + rig.dims.headToEyeY, head.z + rig.dims.headToEyeZ);
    this.neckFkPitch = _e.setFromQuaternion(st.fk[3], "YXZ").x;
    const goal = this.lookTarget ?? st.gaze;
    const dir = this._v3.copy(goal).sub(eye);
    // 躯干（Spine2）的角色轴旋转：把目标换到躯干坐标系
    const torso = rig.characterRotation("Spine2", this._qb).invert();
    dir.applyQuaternion(torso);
    let yaw = Math.atan2(dir.x, dir.z);
    let pitch = Math.asin(clamp(-dir.y / Math.max(1e-4, dir.length()), -1, 1));
    // 注视的二级运动：扫视 + 偶尔看向别处 / 看向玩家
    const gl = this.glance;
    if (gl.active > 0) {
      const k = Math.sin(Math.PI * clamp(1 - gl.active / gl.dur, 0, 1)) ** 0.5;
      if (gl.atCamera && this.glanceTarget) {
        const d2 = this._v4.copy(this.glanceTarget).sub(eye).applyQuaternion(torso);
        const gy = Math.atan2(d2.x, d2.z), gp = Math.asin(clamp(-d2.y / Math.max(1e-4, d2.length()), -1, 1));
        yaw += (gy - yaw) * k;
        pitch += (gp - pitch) * k;
      } else {
        yaw += gl.yaw * k;
        pitch += gl.pitch * k;
      }
    }
    yaw += this.saccade.curYaw;
    pitch += this.saccade.curPitch;
    // 说话 / 点头的头部动作
    let beatPitch = 0, beatYaw = 0, beatRoll = 0;
    if (this.speaking) {
      const sp = this.speech;
      beatPitch = sp.stress * 0.045 + Math.sin(sp.headBeatPhase) * 0.012 * (0.5 + sp.env);
      beatYaw = Math.sin(sp.headBeatPhase * 0.43 + 1) * 0.02;
      beatRoll = Math.sin(sp.headBeatPhase * 0.31) * 0.025;
    }
    const nd = this.nod;
    let nodPitch = 0;
    if (nd.left > 0) nodPitch = nd.amp * (0.5 - 0.5 * Math.cos((nd.t / nd.period) * Math.PI * 2));
    // 笑：头后仰 + 抖动
    if (this.laugh > 0.01) { pitch -= 0.25 * this.laugh; beatPitch += Math.sin(this.laughPhase) * 0.03 * this.laugh; beatRoll += Math.sin(this.laughPhase * 0.5) * 0.05 * this.laugh; }

    pitch = clamp(pitch, -0.9, 1.35);
    yaw = clamp(yaw, -2.0, 2.0);
    // 分配：头动在小角度内有死区（只动眼），超出后头 / 颈 / 脊柱依次接力
    const dead = 0.13;
    const excessYaw = Math.sign(yaw) * Math.max(0, Math.abs(yaw) - dead);
    const excessPitch = Math.sign(pitch) * Math.max(0, Math.abs(pitch) - dead * 0.8);
    const tHeadYaw = excessYaw * 0.55, tNeckYaw = excessYaw * 0.33, tSpineYaw = excessYaw * 0.12;
    const tHeadPitch = excessPitch * 0.42, tNeckPitch = excessPitch * 0.45, tSpinePitch = excessPitch * 0.13;
    g.headYaw = damp(g.headYaw, tHeadYaw, 0.16, dt);
    g.neckYaw = damp(g.neckYaw, tNeckYaw, 0.26, dt);
    g.spineYaw = damp(g.spineYaw, tSpineYaw, 0.5, dt);
    g.headPitch = damp(g.headPitch, tHeadPitch, 0.16, dt);
    g.neckPitch = damp(g.neckPitch, tNeckPitch, 0.26, dt);
    g.spinePitch = damp(g.spinePitch, tSpinePitch, 0.5, dt);
    g.headPitch = clamp(g.headPitch, -0.7, 0.7);
    g.neckPitch = clamp(g.neckPitch, -0.6, 0.8);
    g.spinePitch = clamp(g.spinePitch, -0.2, 0.25);
    g.headYaw = clamp(g.headYaw, -GAZE_LIMITS.head, GAZE_LIMITS.head);
    g.neckYaw = clamp(g.neckYaw, -GAZE_LIMITS.neck, GAZE_LIMITS.neck);
    g.spineYaw = clamp(g.spineYaw, -GAZE_LIMITS.spine, GAZE_LIMITS.spine);
    // 眼睛吃掉剩余角度（头慢于眼，眼先到位再被头“接走”）
    const rem = (total: number, parts: number): number => clamp(total - parts, -GAZE_LIMITS.eye, GAZE_LIMITS.eye);
    g.eyeYaw = damp(g.eyeYaw, rem(yaw, g.headYaw + g.neckYaw + g.spineYaw), 0.05, dt);
    g.eyePitch = damp(g.eyePitch, rem(pitch, g.headPitch + g.neckPitch + g.spinePitch + this.neckFkPitch), 0.05, dt);
    g.lastTotalYaw = yaw;
    g.lastTotalPitch = pitch;

    // 脊柱的视线分量叠在 FK + 呼吸之上；颈沿用姿势的前伸（含年长含胸）
    rig.rotate("Spine2", this._qc.copy(this.spine2Q).multiply(this._qa.setFromEuler(_e.set(g.spinePitch, g.spineYaw, 0))));
    const neckQ = this._qa.copy(st.fk[3]).multiply(this._qc.setFromEuler(_e.set(g.neckPitch + nodPitch * 0.4 + beatPitch * 0.3, g.neckYaw + beatYaw * 0.4, beatRoll * 0.4)));
    rig.rotate("Neck", neckQ);
    const headQ = this._qb.setFromEuler(_e.set(g.headPitch + nodPitch * 0.7 + beatPitch * 0.8, g.headYaw + beatYaw * 0.6, beatRoll * 0.6));
    rig.rotate("Head", headQ);
  }

  // ───────── 脸 ─────────

  private morph(name: string, value: number): void {
    const v = clamp(value, 0, 1);
    for (const m of this.morphs) {
      const i = m.map.get(name);
      if (i !== undefined && m.mesh.morphTargetInfluences) m.mesh.morphTargetInfluences[i] = v;
    }
  }

  private applyFace(dt: number, st: PoseState): void {
    void dt;
    const g = this.gaze;
    const sp = this.speech;
    const lf = this.laugh;
    // 眨眼（左右相差 16 ms），笑时眯眼而不是眨
    const blinkL = (this.blink.active ? blinkCurve(this.blink.k) : 0) * (1 - lf * 0.7);
    const blinkR = (this.blink.active ? blinkCurve(this.blink.k - 0.016) : 0) * (1 - lf * 0.7);
    // 看向下方时上眼睑自然下垂
    const lid = Math.max(0, g.eyePitch + g.headPitch * 0.5) * 0.35;
    this.morph("eyeBlinkLeft", Math.max(blinkL, lid) + lf * 0.35);
    this.morph("eyeBlinkRight", Math.max(blinkR, lid) + lf * 0.35);
    // 眼球
    const x = g.eyeYaw / 0.5, y = -g.eyePitch / 0.45;
    this.morph("eyeLookOutLeft", Math.max(0, x));
    this.morph("eyeLookInRight", Math.max(0, x));
    this.morph("eyeLookInLeft", Math.max(0, -x));
    this.morph("eyeLookOutRight", Math.max(0, -x));
    this.morph("eyeLookUpLeft", Math.max(0, y));
    this.morph("eyeLookUpRight", Math.max(0, y));
    this.morph("eyeLookDownLeft", Math.max(0, -y));
    this.morph("eyeLookDownRight", Math.max(0, -y));
    // 嘴：音节包络驱动下颌 + 口型（飘动的 funnel / stretch / pucker 混合），无 viseme 目标时用 ARKit 形状
    const env = sp.env;
    const shape = sp.shape;
    const laughJaw = lf * (0.3 + 0.25 * Math.abs(Math.sin(this.laughPhase)));
    this.morph("jawOpen", env * 0.42 + laughJaw);
    this.morph("mouthFunnel", env * 0.3 * shape);
    this.morph("mouthPucker", env * 0.18 * (1 - Math.abs(shape - 0.5) * 2));
    this.morph("mouthStretchLeft", env * 0.2 * (1 - shape));
    this.morph("mouthStretchRight", env * 0.2 * (1 - shape));
    this.morph("mouthLowerDownLeft", env * 0.2);
    this.morph("mouthLowerDownRight", env * 0.2);
    const smile = this.smile * (1 - env * 0.4);
    this.morph("mouthSmileLeft", smile);
    this.morph("mouthSmileRight", smile * 0.95);
    this.morph("cheekSquintLeft", smile * 0.5 + lf * 0.4);
    this.morph("cheekSquintRight", smile * 0.5 + lf * 0.4);
    this.morph("eyeSquintLeft", smile * 0.35 + lf * 0.5);
    this.morph("eyeSquintRight", smile * 0.35 + lf * 0.5);
    // 眉：说话重音抬眉；倾听时微挑
    const brow = 0.06 + sp.brow * 0.35 + (this.listening ? 0.08 : 0) + lf * 0.25;
    this.morph("browInnerUp", brow);
    this.morph("browOuterUpLeft", sp.brow * 0.25 + lf * 0.2);
    this.morph("browOuterUpRight", sp.brow * 0.2 + lf * 0.2);
    // 写字 / 看手机 / 读书时眉心微皱
    const focus = st.pen > 0.5 ? 0.12 : 0;
    this.morph("browDownLeft", focus);
    this.morph("browDownRight", focus);
  }

  // ───────── 道具 ─────────

  private createProps(parent: THREE.Object3D, owned?: Set<THREE.Material>): void {
    const mat = (color: number, rough = 0.5, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial => {
      const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.2, ...extra });
      owned?.add(m);
      return m;
    };
    const phone = new THREE.Group();
    phone.name = "human-prop-phone";
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.008, 0.147), mat(0x15171c, 0.35));
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.0012, 0.138), mat(0x0c1118, 0.2, { emissive: 0x8fb8ff, emissiveIntensity: 0.65 }));
    screen.position.y = 0.0046;
    phone.add(body, screen);
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.145, 8), mat(0x22252d, 0.4));
    pen.name = "human-prop-pen";
    const book = new THREE.Group();
    book.name = "human-prop-book";
    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.185, 0.02, 0.255), mat(0xe9e2cf, 0.9));
    pages.position.x = 0.004;
    book.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.025, 0.27), mat(0x7a4b3a, 0.8)), pages);
    for (const o of [phone, pen, book]) {
      o.visible = false;
      o.traverse((c) => { (c as THREE.Mesh).castShadow = true; });
      parent.add(o);
    }
    this.propMeshes.phone = phone; this.propMeshes.pen = pen; this.propMeshes.book = book;
    if (this.glasses) this.createGlasses(parent, mat);
  }

  /** 细框眼镜：两个镜圈 + 鼻梁 + 镜腿，跟着头骨骼（每帧在 updateGlasses 里对齐） */
  private createGlasses(parent: THREE.Object3D, mat: (color: number, rough?: number, extra?: THREE.MeshStandardMaterialParameters) => THREE.MeshStandardMaterial): void {
    const dims = this.rig.dims;
    const glasses = new THREE.Group();
    glasses.name = "human-prop-glasses";
    const frame = mat(0x1d2128, 0.35);
    const lens = mat(0xcfe3ff, 0.1, { transparent: true, opacity: 0.12, depthWrite: false });
    const r = 0.027, half = dims.eyeHalf;
    for (const side of [1, -1]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.0021, 6, 20), frame);
      ring.position.set(side * half, 0, 0);
      const glass = new THREE.Mesh(new THREE.CircleGeometry(r, 16), lens);
      glass.position.copy(ring.position);
      const temple = new THREE.Mesh(new THREE.BoxGeometry(0.0035, 0.0035, 0.115), frame);
      temple.position.set(side * (half + r + 0.004), 0.002, -0.058);
      glasses.add(ring, glass, temple);
    }
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(2 * (half - r) + 0.006, 0.0035, 0.0035), frame);
    bridge.position.set(0, 0.008, 0);
    glasses.add(bridge);
    parent.add(glasses);
    this.propMeshes.glasses = glasses;
  }

  private updateGlasses(): void {
    const glasses = this.propMeshes.glasses;
    if (!glasses) return;
    const dims = this.rig.dims;
    const q = this.rig.characterRotation("Head", this._qa);
    this.rig.position("Head", glasses.position);
    glasses.position.add(this._v.set(0, dims.headToEyeY, dims.headToEyeZ + 0.012).applyQuaternion(q));
    glasses.quaternion.copy(q);
  }

  private placeProp(obj: THREE.Object3D, s: PropState): void {
    obj.visible = s.presence > 0.01;
    if (!obj.visible) return;
    const y = this._v3.copy(s.n).normalize();
    const z = this._v2.copy(s.u).addScaledVector(y, -s.u.dot(y)).normalize();
    const x = this._v.crossVectors(y, z).normalize(); // 局部 x = y × z
    this._m.makeBasis(x, y, z);
    obj.quaternion.setFromRotationMatrix(this._m);
    obj.position.copy(s.p);
    obj.scale.setScalar(smooth(s.presence));
  }

  private updateProps(st: PoseState, targets: typeof this.limbs): void {
    if (this.propMeshes.phone) this.placeProp(this.propMeshes.phone, st.phone);
    if (this.propMeshes.book) this.placeProp(this.propMeshes.book, st.book);
    const pen = this.propMeshes.pen;
    if (pen) {
      pen.visible = st.pen > 0.01;
      if (pen.visible) {
        const hand = targets[1];
        // 笔尖落在指尖前方、笔上端靠在虎口：由此得到笔的方向
        const tip = this._v.copy(hand.p).addScaledVector(hand.f, 0.17).addScaledVector(hand.n, 0.03);
        const hold = this._v3.copy(hand.p).addScaledVector(hand.f, 0.07).addScaledVector(hand.n, -0.02);
        const dir = this._v4.copy(tip).sub(hold).normalize();
        pen.position.copy(tip).addScaledVector(dir, -0.0725);
        pen.quaternion.setFromUnitVectors(this._v2.set(0, 1, 0), dir);
        pen.scale.setScalar(smooth(st.pen));
      }
    }
  }

  /** 笔尖的世界（frame）位置：测试用 */
  penTip(out: THREE.Vector3): THREE.Vector3 | null {
    const pen = this.propMeshes.pen;
    if (!pen || !pen.visible) return null;
    return out.set(0, 0.0725, 0).applyQuaternion(pen.quaternion).add(pen.position);
  }

  /** 最近一帧的手 / 脚目标 [左手, 右手, 左脚, 右脚]（frame 空间，测试用） */
  get lastTargets(): ReadonlyArray<{ p: THREE.Vector3; pole: THREE.Vector3; f: THREE.Vector3; n: THREE.Vector3 }> { return this.limbs; }

  /** 当前呼吸值（-1..1，吸气为正；测试用） */
  get breath(): number { return this.breathValue; }
  private breathValue = 0;

  /** 手机拇指滑动的相位（-1 = 空闲，测试用） */
  get scrollPhase(): number { return this.scroll.phase; }

  /** 视线内部状态（测试用） */
  get gazeState(): Readonly<typeof this.gaze> { return this.gaze; }
}

/** 验证姿势关节角在 FK_LIMITS 内（测试 / 调试用）。返回越界项。 */
export function checkPoseLimits(pose: HumanPose): string[] {
  const bad: string[] = [];
  const check = (name: keyof typeof FK_LIMITS, v: V3): void => {
    v.forEach((a, i) => {
      const [lo, hi] = FK_LIMITS[name][i];
      if (a < lo || a > hi) bad.push(`${pose.id}.${name}[${i}]=${a}`);
    });
  };
  check("Hips", pose.hipsRot);
  for (const name of FK_BONES) { const v = pose.fk[name]; if (v) check(name, v); }
  return bad;
}

export type { CoreBone };
