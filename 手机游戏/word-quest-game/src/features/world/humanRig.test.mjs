import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { makeTestRig } from "./humanTestKit.mjs";
import { CORE_BONES, FINGERS, solveTwoBone } from "./humanRig";
import { HumanAnimator } from "./humanMotion";

const KINDS = ["male", "female"];
const v = (x, y, z) => new THREE.Vector3(x, y, z);

describe("humanRig：Rocketbox 完整骨架", () => {
  for (const kind of KINDS) it(`${kind}：核心骨骼与 5×3 手指全部存在，肢体长度合理`, () => {
    const { rig } = makeTestRig(kind);
    expect(rig.missing).toEqual([]);
    for (const name of CORE_BONES) expect(rig.bone(name), name).toBeTruthy();
    for (const side of ["Left", "Right"]) for (const f of FINGERS) for (const j of [1, 2, 3]) expect(rig.bone(`${side}Hand${f}${j}`), `${side}${f}${j}`).toBeTruthy();
    const d = rig.dims;
    expect(d.thigh).toBeGreaterThan(0.33);
    expect(d.thigh).toBeLessThan(0.5);
    expect(d.shin).toBeGreaterThan(0.33);
    expect(d.upperArm + d.foreArm).toBeGreaterThan(0.45);
    expect(d.upperArm + d.foreArm).toBeLessThan(0.65);
    expect(d.ankleHeight).toBeGreaterThan(0.07);
    expect(d.ankleHeight).toBeLessThan(0.13);
  });

  it("两骨 IK 解析解：可达目标误差 < 1 cm，肘 / 膝朝向由 pole 决定", () => {
    const mid = v(0, 0, 0), end = v(0, 0, 0);
    const root = v(0, 1, 0);
    for (const target of [v(0.2, 0.6, 0.3), v(-0.1, 0.8, 0.45), v(0.05, 0.5, 0.1)]) {
      const ok = solveTwoBone(root, target, 0.3, 0.28, v(0, -1, 0), mid, end);
      expect(ok).toBe(true);
      expect(end.distanceTo(target)).toBeLessThan(1e-6);
      expect(root.distanceTo(mid)).toBeCloseTo(0.3, 6);
      expect(mid.distanceTo(end)).toBeCloseTo(0.28, 6);
    }
    // 肘朝下 / 朝上
    const target = v(0, 1, 0.45);
    solveTwoBone(root, target, 0.3, 0.28, v(0, -1, 0), mid, end);
    expect(mid.y).toBeLessThan(1);
    solveTwoBone(root, target, 0.3, 0.28, v(0, 1, 0), mid, end);
    expect(mid.y).toBeGreaterThan(1);
  });

  it("不可达时伸直指向目标", () => {
    const mid = v(0, 0, 0), end = v(0, 0, 0);
    const root = v(0, 1, 0);
    const target = v(0, 1, 2);
    expect(solveTwoBone(root, target, 0.3, 0.28, v(0, -1, 0), mid, end)).toBe(false);
    expect(end.x).toBeCloseTo(0, 6);
    expect(end.y).toBeCloseTo(1, 6);
    expect(end.z).toBeCloseTo(0.58, 4);
    expect(mid.z).toBeCloseTo(0.3, 4);
  });

  for (const kind of KINDS) it(`${kind}：骨架上的手臂 IK 到达可达目标（< 1 cm），不可达时沿目标方向伸直`, () => {
    const { rig } = makeTestRig(kind);
    rig.resetPose();
    rig.updateWorld();
    const shoulder = rig.position("LeftArm", v(0, 0, 0));
    const reachable = shoulder.clone().add(v(0.05, -0.2, 0.3));
    expect(rig.solveLimb(rig.arms.Left, reachable, v(0.4, -1, -0.3))).toBe(true);
    expect(rig.position("LeftHand", v(0, 0, 0)).distanceTo(reachable)).toBeLessThan(0.01);
    const far = shoulder.clone().add(v(0, 0.2, 1.5));
    expect(rig.solveLimb(rig.arms.Left, far, v(0.4, -1, -0.3))).toBe(false);
    const hand = rig.position("LeftHand", v(0, 0, 0));
    const dir = far.clone().sub(shoulder).normalize();
    expect(hand.clone().sub(shoulder).normalize().dot(dir)).toBeGreaterThan(0.999);
    expect(hand.distanceTo(shoulder)).toBeCloseTo(rig.dims.upperArm + rig.dims.foreArm, 2);
  });

  for (const kind of KINDS) it(`${kind}：膝盖朝前（pole）——腿 IK 把脚放在椅前地面时膝在脚的前上方`, () => {
    const { rig } = makeTestRig(kind);
    rig.resetPose();
    rig.setHipsPosition(v(0, 0.59, -0.05));
    rig.updateWorld();
    const foot = v(0.13, rig.dims.ankleHeight, 0.3);
    rig.solveLimb(rig.legs.Left, foot, v(0.25, 0.35, 1));
    const knee = rig.position("LeftLeg", v(0, 0, 0));
    expect(knee.z).toBeGreaterThan(0.2);
    expect(knee.y).toBeGreaterThan(rig.dims.ankleHeight + 0.25);
    expect(rig.position("LeftFoot", v(0, 0, 0)).distanceTo(foot)).toBeLessThan(0.01);
  });
});

describe("座位校准", () => {
  for (const kind of KINDS) it(`${kind}：骨盆高度 = 椅面 + 臀厚，脚底 y ≈ 地面（±1 cm），大腿近水平`, () => {
    const { rig } = makeTestRig(kind);
    const seat = { height: 0.48, tableHeight: 0.75, tableEdge: 0.35 };
    const anim = new HumanAnimator(rig, { seed: 5, seat, hasSeat: true, initial: "sitUpright" });
    for (let i = 0; i < 90; i++) anim.update(1 / 60);
    const hips = rig.position("Hips", v(0, 0, 0));
    // 呼吸 / 微晃只有毫米量级
    expect(Math.abs(hips.y - (seat.height + rig.dims.sitDrop))).toBeLessThan(0.012);
    expect(rig.dims.sitDrop).toBeGreaterThan(0.1);
    expect(rig.dims.sitDrop).toBeLessThan(0.17);
    for (const side of ["Left", "Right"]) {
      const ankle = rig.position(`${side}Foot`, v(0, 0, 0));
      const toe = rig.position(`${side}ToeBase`, v(0, 0, 0));
      expect(Math.abs(ankle.y - rig.dims.ankleHeight)).toBeLessThan(0.01); // 踝在地面上方 ankleHeight → 脚底 y ≈ 0
      expect(Math.abs(toe.y)).toBeLessThan(0.02); // 脚掌平放
      const knee = rig.position(`${side}Leg`, v(0, 0, 0));
      const hip = rig.position(`${side}UpLeg`, v(0, 0, 0));
      expect(Math.abs(knee.y - hip.y)).toBeLessThan(0.17); // 大腿近水平（男底模腿短，椅面 0.48 时略下倾）
      // 膝盖不进桌子：桌面下沿 0.705，膝盖加髌骨半径仍低于它
      expect(knee.y + 0.07).toBeLessThan(seat.tableHeight - 0.045);
    }
  });
});
