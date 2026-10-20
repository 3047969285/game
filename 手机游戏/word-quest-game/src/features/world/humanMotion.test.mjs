import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { makeTestRig } from "./humanTestKit.mjs";
import { GAZE_LIMITS, HumanAnimator, mulberry32 } from "./humanMotion";
import { CORE_BONES } from "./humanRig";

const v = (x, y, z) => new THREE.Vector3(x, y, z);
const SEAT = { height: 0.48, tableHeight: 0.75, tableEdge: 0.35, paper: { x: -0.2, z: 0.46 } };
const FACE_MORPHS = ["eyeBlinkLeft", "eyeBlinkRight", "jawOpen", "mouthFunnel", "mouthSmileLeft", "mouthSmileRight", "browInnerUp", "eyeLookOutLeft", "eyeLookInLeft"];

function face() {
  const mesh = new THREE.Mesh();
  mesh.morphTargetDictionary = Object.fromEntries(["eyeBlinkLeft", "eyeBlinkRight", "jawOpen", "mouthFunnel", "mouthPucker", "mouthStretchLeft", "mouthStretchRight", "mouthLowerDownLeft", "mouthLowerDownRight", "mouthSmileLeft", "mouthSmileRight", "browInnerUp", "browOuterUpLeft", "browOuterUpRight", "browDownLeft", "browDownRight", "eyeLookInLeft", "eyeLookOutLeft", "eyeLookInRight", "eyeLookOutRight", "eyeLookUpLeft", "eyeLookUpRight", "eyeLookDownLeft", "eyeLookDownRight", "eyeSquintLeft", "eyeSquintRight", "cheekSquintLeft", "cheekSquintRight"].map((name, i) => [name, i]));
  mesh.morphTargetInfluences = new Array(40).fill(0);
  return mesh;
}
const morph = (mesh, name) => mesh.morphTargetInfluences[mesh.morphTargetDictionary[name]];

function make(seed, opts = {}) {
  const { rig } = makeTestRig(opts.kind ?? "male");
  const mesh = face();
  const anim = new HumanAnimator(rig, { seed, seat: SEAT, hasSeat: true, initial: "sitUpright", faces: [mesh], ...opts });
  return { rig, anim, mesh };
}

function boneState(rig) {
  return CORE_BONES.map((name) => rig.bone(name).node.quaternion.toArray().map((n) => n.toFixed(6)).join(",")).join("|");
}

function run(seed, seconds, sample, opts) {
  const m = make(seed, opts);
  const out = [];
  for (let i = 0; i < seconds * 60; i++) {
    m.anim.update(1 / 60);
    out.push(sample(m, i / 60));
  }
  return { ...m, out };
}

describe("humanMotion：确定性与个体差异", () => {
  it("mulberry32 同 seed 同序列", () => {
    const a = mulberry32(42), b = mulberry32(42), c = mulberry32(43);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
    expect(a()).not.toBe(c());
  });

  it("同一 seed 可复现：逐帧骨骼状态完全一致", () => {
    const a = run(11, 6, (m) => boneState(m.rig)).out;
    const b = run(11, 6, (m) => boneState(m.rig)).out;
    expect(a).toEqual(b);
  });

  it("不同 seed 的呼吸相位、眨眼时间都不同（同桌的人不同步）", () => {
    const seeds = [1, 2, 3, 4, 5, 6];
    const chest = seeds.map((s) => run(s, 5, (m) => m.rig.bone("Spine2").node.quaternion.x).out[299]);
    expect(new Set(chest.map((c) => c.toFixed(5))).size).toBeGreaterThanOrEqual(5);
    const firstBlink = seeds.map((s) => {
      const r = run(s, 12, (m) => morph(m.mesh, "eyeBlinkLeft"));
      return r.out.findIndex((x) => x > 0.6);
    });
    expect(firstBlink.every((f) => f > 0)).toBe(true);
    expect(new Set(firstBlink).size).toBeGreaterThanOrEqual(5);
  });

  it("呼吸周期 3.5–4.5 s，胸腔俯仰按这个周期起伏", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const { anim } = make(seed);
      expect(anim.breathPeriod).toBeGreaterThanOrEqual(3.5);
      expect(anim.breathPeriod).toBeLessThanOrEqual(4.5);
    }
    for (const seed of [3, 8]) {
      const r = run(seed, 40, (m) => [m.anim.breath, new THREE.Euler().setFromQuaternion(m.rig.characterRotation("Spine1", new THREE.Quaternion()), "YXZ").x], { initial: "sitSlouch" });
      const b = r.out.map((o) => o[0]);
      // 呼吸值自身的周期
      const auto = (d, lag) => d.slice(lag).reduce((s, n, i) => s + n * d[i], 0);
      let best = 0, bestLag = 0;
      for (let lag = 150; lag <= 330; lag++) { const a = auto(b, lag); if (a > best) { best = a; bestLag = lag; } }
      expect(bestLag / 60).toBeGreaterThan(r.anim.breathPeriod - 0.3);
      expect(bestLag / 60).toBeLessThan(r.anim.breathPeriod + 0.3);
      // 胸腔（Spine1）的俯仰谱峰在呼吸频率上（微晃更慢、更小，不会盖过它）
      const x = r.out.map((o) => o[1]);
      const mag = (f) => {
        let re = 0, im = 0;
        x.forEach((n, i) => { const ph = (2 * Math.PI * f * i) / 60; re += n * Math.cos(ph); im += n * Math.sin(ph); });
        return Math.hypot(re, im);
      };
      let peakF = 0, peak = 0;
      for (let f = 0.18; f <= 0.6; f += 0.005) { const m = mag(f); if (m > peak) { peak = m; peakF = f; } }
      expect(Math.abs(peakF - 1 / r.anim.breathPeriod)).toBeLessThan(0.03);
    }
  });
});

describe("humanMotion：视线", () => {
  it("眼 → 头 → 颈分层：头先不动只动眼，大角度时头 / 颈依次接力，且在限位内（头 ≤ 70°，颈 ≤ 45°）", () => {
    const m = make(4);
    m.anim.setLookTarget(v(0.6, 1.2, 0.3), true); // 几乎在身体侧面
    let maxHead = 0, maxNeck = 0;
    for (let i = 0; i < 300; i++) {
      m.anim.update(1 / 60);
      const g = m.anim.gazeState;
      maxHead = Math.max(maxHead, Math.abs(g.headYaw));
      maxNeck = Math.max(maxNeck, Math.abs(g.neckYaw));
      expect(Math.abs(g.eyeYaw)).toBeLessThanOrEqual(GAZE_LIMITS.eye + 1e-6);
    }
    expect(maxHead).toBeLessThanOrEqual((70 * Math.PI) / 180 + 1e-6);
    expect(maxNeck).toBeLessThanOrEqual((45 * Math.PI) / 180 + 1e-6);
    expect(maxHead).toBeGreaterThan(0.4);
    // 目标在身后：仍然不超限
    m.anim.setLookTarget(v(0, 1.2, -2), true);
    for (let i = 0; i < 300; i++) {
      m.anim.update(1 / 60);
      const g = m.anim.gazeState;
      expect(Math.abs(g.headYaw)).toBeLessThanOrEqual((70 * Math.PI) / 180 + 1e-6);
      expect(Math.abs(g.neckYaw)).toBeLessThanOrEqual((45 * Math.PI) / 180 + 1e-6);
    }
  });

  it("小角度只动眼（头不动），眼比头快", () => {
    const m = make(9);
    for (let i = 0; i < 120; i++) m.anim.update(1 / 60);
    m.anim.setLookTarget(v(0.2, 1.3, 1.5), true);
    let eyeAt = -1, headAt = -1;
    for (let i = 0; i < 180; i++) {
      m.anim.update(1 / 60);
      const g = m.anim.gazeState;
      if (eyeAt < 0 && Math.abs(g.eyeYaw) > 0.04) eyeAt = i;
      if (headAt < 0 && Math.abs(g.headYaw) > 0.03) headAt = i;
    }
    expect(eyeAt).toBeGreaterThanOrEqual(0);
    expect(headAt === -1 || headAt >= eyeAt).toBe(true);
  });

  it("有人说话时倾听者偶尔点头：幅度小，30 秒内至少 2 次", () => {
    const m = make(2);
    m.anim.setListening(true);
    const q = new THREE.Quaternion(), e = new THREE.Euler(0, 0, 0, "YXZ");
    const pitch = [];
    for (let i = 0; i < 60 * 30; i++) {
      m.anim.update(1 / 60);
      pitch.push(e.setFromQuaternion(m.rig.characterRotation("Head", q), "YXZ").x);
    }
    // 去掉缓慢的视线漂移（±0.5 s 滑动平均），剩下点头
    const hp = pitch.map((p, i) => {
      const lo = Math.max(0, i - 30), hi = Math.min(pitch.length, i + 31);
      return p - pitch.slice(lo, hi).reduce((a, b) => a + b, 0) / (hi - lo);
    });
    let peaks = 0, last = -100;
    for (let i = 1; i < hp.length - 1; i++) if (hp[i] > 0.012 && hp[i] >= hp[i - 1] && hp[i] > hp[i + 1] && i - last > 15) { peaks++; last = i; }
    expect(peaks).toBeGreaterThanOrEqual(2);
    expect(Math.max(...hp.map(Math.abs))).toBeLessThan(0.3);
  });

  it("眨眼：2–6 s 一次，左右眼错开几毫秒", () => {
    const r = run(7, 60, (m) => [morph(m.mesh, "eyeBlinkLeft"), morph(m.mesh, "eyeBlinkRight")]);
    const starts = [];
    r.out.forEach(([l], i) => { if (l > 0.5 && (i === 0 || r.out[i - 1][0] <= 0.5)) starts.push(i / 60); });
    expect(starts.length).toBeGreaterThan(8);
    const gaps = starts.slice(1).map((t, i) => t - starts[i]).filter((g) => g > 0.5);
    expect(Math.min(...gaps)).toBeGreaterThan(0.9);
    expect(Math.max(...gaps)).toBeLessThan(7);
    expect(r.out.some(([l, rr]) => Math.abs(l - rr) > 0.05)).toBe(true);
  });
});

describe("humanMotion：说话", () => {
  it("说话时下颌 / 口型随音节包络开合，不说话时闭嘴", () => {
    const m = make(5);
    const idle = [];
    for (let i = 0; i < 120; i++) { m.anim.update(1 / 60); idle.push(morph(m.mesh, "jawOpen")); }
    expect(Math.max(...idle)).toBeLessThan(0.02);
    m.anim.setSpeaking(true);
    const talk = [];
    for (let i = 0; i < 180; i++) { m.anim.update(1 / 60); talk.push(morph(m.mesh, "jawOpen")); }
    expect(Math.max(...talk)).toBeGreaterThan(0.2);
    expect(Math.min(...talk.slice(30))).toBeLessThan(0.15);
    expect(new Set(talk.map((x) => x.toFixed(2))).size).toBeGreaterThan(10);
    m.anim.setSpeaking(false);
    for (let i = 0; i < 60; i++) m.anim.update(1 / 60);
    expect(morph(m.mesh, "jawOpen")).toBeLessThan(0.03);
  });

  it("说话时有拍点手势：手腕离开 / 回到原位，且幅度在 12 cm 内", () => {
    const m = make(6, { initial: "sitTalk" });
    m.anim.setSpeaking(true);
    for (let i = 0; i < 60; i++) m.anim.update(1 / 60);
    const base = m.anim.getTarget().limbs[1].p.clone();
    let max = 0, moving = 0;
    for (let i = 0; i < 60 * 12; i++) {
      m.anim.update(1 / 60);
      const d = m.anim.lastTargets[1].p.distanceTo(base);
      max = Math.max(max, d);
      if (d > 0.015) moving++;
    }
    expect(max).toBeGreaterThan(0.03);
    expect(max).toBeLessThan(0.12);
    expect(moving).toBeGreaterThan(30);
  });
});

describe("humanMotion：手机 / 写字 / 小动作", () => {
  it("手机：拇指周期性滑动（拇指关节在动），手机道具可见", () => {
    const props = new THREE.Group();
    const m = make(3, { initial: "sitPhoneLap", propParent: props });
    const thumb = [];
    for (let i = 0; i < 60 * 12; i++) {
      m.anim.update(1 / 60);
      thumb.push(m.rig.fingertip("Right", "Thumb", v(0, 0, 0)).toArray());
    }
    // 拇指尖在滑动时的最大位移（多次滑动，中间有静止）
    const base = thumb[0];
    let reach = 0;
    for (const p of thumb) reach = Math.max(reach, Math.hypot(p[0] - base[0], p[1] - base[1], p[2] - base[2]));
    expect(reach).toBeGreaterThan(0.012);
    expect(new Set(thumb.map((p) => p.join())).size).toBeGreaterThan(100);
    expect(props.getObjectByName("human-prop-phone").visible).toBe(true);
  });

  it("写字：笔尖在纸面上沿行移动", () => {
    const props = new THREE.Group();
    const m = make(3, { initial: "sitWrite", propParent: props });
    const xs = [];
    for (let i = 0; i < 60 * 6; i++) {
      m.anim.update(1 / 60);
      xs.push(m.anim.penTip(v(0, 0, 0)).x);
    }
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.02);
    expect(props.getObjectByName("human-prop-pen").visible).toBe(true);
  });

  it("空闲小动作：60 秒内会出现姿势调整（骨盆挪动 / 手摸脸等），不同 seed 的时间不同", () => {
    const hipsRange = (s) => {
      const r = run(s, 60, (m) => m.anim.hipsPosition.z);
      return Math.max(...r.out) - Math.min(...r.out);
    };
    expect(hipsRange(21)).toBeGreaterThan(0.004);
    const handMoves = (s) => {
      const r = run(s, 60, (m) => m.rig.position("RightHand", v(0, 0, 0)).toArray());
      const base = r.out[0];
      return r.out.some((p) => Math.hypot(p[0] - base[0], p[1] - base[1], p[2] - base[2]) > 0.12);
    };
    expect([1, 2, 3, 4, 5, 6, 7, 8].some(handMoves)).toBe(true);
  });
});

describe("humanMotion：过渡", () => {
  function transitionStats(from, to, opts = {}) {
    const m = make(12, { initial: from, ...opts });
    for (let i = 0; i < 120; i++) m.anim.update(1 / 60);
    const before = boneQuats(m.rig);
    const hipsBefore = m.rig.position("Hips", v(0, 0, 0));
    m.anim.setPose(to);
    let frames = 0, maxStep = 0, maxHipsStep = 0;
    let prev = before, prevHips = hipsBefore;
    while (m.anim.isTransitioning && frames < 600) {
      m.anim.update(1 / 60);
      frames++;
      const now = boneQuats(m.rig);
      maxStep = Math.max(maxStep, ...now.map((q, i) => q.angleTo(prev[i])));
      const hips = m.rig.position("Hips", v(0, 0, 0));
      maxHipsStep = Math.max(maxHipsStep, hips.distanceTo(prevHips));
      prev = now;
      prevHips = hips;
    }
    return { seconds: frames / 60, maxStep, maxHipsStep, m };
  }
  const boneQuats = (rig) => CORE_BONES.map((name) => rig.bone(name).node.quaternion.clone());

  it("坐姿之间的过渡 0.5–0.9 s 内完成，相邻帧无跳变（骨骼旋转 < 0.2 rad / 帧，骨盆位移 < 2 cm / 帧）", () => {
    for (const [a, b] of [["sitUpright", "sitWrite"], ["sitPhoneLap", "sitUpright"], ["sitLeanForward", "sitSlouch"], ["sitUpright", "sitLaugh"]]) {
      const r = transitionStats(a, b);
      expect(r.seconds, `${a}→${b}`).toBeGreaterThanOrEqual(0.5);
      expect(r.seconds, `${a}→${b}`).toBeLessThanOrEqual(0.92);
      expect(r.maxStep, `${a}→${b} 骨骼`).toBeLessThan(0.2);
      expect(r.maxHipsStep, `${a}→${b} 骨盆`).toBeLessThan(0.02);
    }
  });

  it("起身 / 坐下有过渡动作（≤ 0.9 s）：站到椅子侧边 ↔ 坐在椅面上，骨盆没有瞬移", () => {
    const stand = transitionStats("sitUpright", "standRelaxed");
    expect(stand.seconds).toBeLessThanOrEqual(0.92);
    expect(stand.maxHipsStep).toBeLessThan(0.025);
    expect(stand.m.rig.position("Hips", v(0, 0, 0)).y).toBeGreaterThan(0.8);
    expect(stand.m.rig.position("Hips", v(0, 0, 0)).x).toBeGreaterThan(0.4); // 站在椅子侧边，不是站在椅面上
    const sit = transitionStats("standRelaxed", "sitPhoneLap");
    expect(sit.seconds).toBeLessThanOrEqual(0.92);
    expect(sit.maxHipsStep).toBeLessThan(0.025);
    expect(Math.abs(sit.m.rig.position("Hips", v(0, 0, 0)).y - (SEAT.height + sit.m.rig.dims.sitDrop))).toBeLessThan(0.012);
    // 脚始终落在地面（过渡中踝的高度不会离地太多）
    expect(sit.m.rig.position("LeftFoot", v(0, 0, 0)).y).toBeLessThan(sit.m.rig.dims.ankleHeight + 0.03);
  });

  it("年长者动作整体变慢 ×0.8：过渡约 1.25 倍时长", () => {
    const young = transitionStats("sitUpright", "sitSlouch");
    const old = transitionStats("sitUpright", "sitSlouch", { aged: true });
    expect(old.seconds / young.seconds).toBeGreaterThan(1.15);
    expect(old.seconds / young.seconds).toBeLessThan(1.4);
  });

  it("切换姿势中途再切：没有跳变", () => {
    const m = make(13);
    for (let i = 0; i < 60; i++) m.anim.update(1 / 60);
    m.anim.setPose("sitWrite");
    for (let i = 0; i < 18; i++) m.anim.update(1 / 60);
    let prev = CORE_BONES.map((name) => m.rig.bone(name).node.quaternion.clone());
    m.anim.setPose("sitLeanForward");
    let max = 0;
    for (let i = 0; i < 60; i++) {
      m.anim.update(1 / 60);
      const now = CORE_BONES.map((name) => m.rig.bone(name).node.quaternion.clone());
      max = Math.max(max, ...now.map((q, i2) => q.angleTo(prev[i2])));
      prev = now;
    }
    expect(max).toBeLessThan(0.2);
  });
});

describe("humanMotion：站姿 / 走路 / 笑", () => {
  it("走路：双脚交替摆动，骨盆上下起伏，停下后回到站姿", () => {
    const m = make(14, { initial: "standRelaxed", hasSeat: false });
    for (let i = 0; i < 60; i++) m.anim.update(1 / 60);
    const phase = { v: 0 };
    const feet = [], hipsY = [];
    for (let i = 0; i < 120; i++) {
      phase.v += (1 / 60) * 8.2;
      m.anim.setWalking(true, phase.v);
      m.anim.update(1 / 60);
      feet.push(m.rig.position("LeftFoot", v(0, 0, 0)).z - m.rig.position("RightFoot", v(0, 0, 0)).z);
      hipsY.push(m.rig.position("Hips", v(0, 0, 0)).y);
    }
    expect(Math.max(...feet)).toBeGreaterThan(0.2);
    expect(Math.min(...feet)).toBeLessThan(-0.2);
    expect(Math.max(...hipsY) - Math.min(...hipsY)).toBeGreaterThan(0.01);
    m.anim.setWalking(false, phase.v);
    for (let i = 0; i < 120; i++) m.anim.update(1 / 60);
    expect(Math.abs(m.rig.position("LeftFoot", v(0, 0, 0)).z - m.rig.position("RightFoot", v(0, 0, 0)).z)).toBeLessThan(0.1);
  });

  it("sitLaugh：笑的脸（嘴角上扬、下颌张开、眯眼）+ 肩膀抖动", () => {
    const m = make(15, { initial: "sitUpright" });
    for (let i = 0; i < 60; i++) m.anim.update(1 / 60);
    m.anim.setPose("sitLaugh");
    const shoulder = [];
    for (let i = 0; i < 120; i++) { m.anim.update(1 / 60); shoulder.push(m.rig.position("LeftShoulder", v(0, 0, 0)).y); }
    expect(morph(m.mesh, "mouthSmileLeft")).toBeGreaterThan(0.5);
    expect(morph(m.mesh, "eyeSquintLeft")).toBeGreaterThan(0.3);
    expect(Math.max(...shoulder.slice(60)) - Math.min(...shoulder.slice(60))).toBeGreaterThan(0.003);
  });

  it("坐姿的骨盆始终在椅面上（呼吸 / 微晃 / 小动作都不会把人抬离椅子）", () => {
    for (const id of ["sitUpright", "sitWrite", "sitPhoneLap", "sitTalk"]) {
      const r = run(31, 40, (m) => m.rig.position("Hips", v(0, 0, 0)).y, { initial: id });
      for (const y of r.out) expect(Math.abs(y - (SEAT.height + r.rig.dims.sitDrop))).toBeLessThan(0.02);
    }
  });
});
