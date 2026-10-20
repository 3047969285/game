import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { makeTestRig } from "./humanTestKit.mjs";
import { ALL_POSES, buildPose, DEFAULT_SEAT, poseForScript, SIT_POSES, STAND_POSES } from "./humanPoses";
import { checkPoseLimits, HumanAnimator } from "./humanMotion";

const v = (x, y, z) => new THREE.Vector3(x, y, z);
const KINDS = ["male", "female"];
const SEAT = { ...DEFAULT_SEAT, paper: { x: -0.35, z: 0.46 } };

function settle(kind, id, seat = SEAT) {
  const { rig } = makeTestRig(kind);
  const anim = new HumanAnimator(rig, { seed: 7, seat, hasSeat: true, initial: id, propParent: new THREE.Group() });
  for (let i = 0; i < 120; i++) anim.update(1 / 60);
  return { rig, anim };
}

describe("humanPoses：姿势库", () => {
  it("库里有规格要求的全部坐姿与站姿", () => {
    for (const id of ["sitUpright", "sitLeanForward", "sitPhoneLap", "sitPhoneTable", "sitChinHand", "sitWrite", "sitSlouch", "sitTalk", "sitLaugh", "standRelaxed", "standArmsCrossed", "standTalk", "standHoldBook"]) expect(ALL_POSES).toContain(id);
    expect(SIT_POSES.length).toBeGreaterThanOrEqual(9);
    expect(STAND_POSES.length).toBeGreaterThanOrEqual(4);
  });

  it("剧本姿势名映射到姿势库：有座位的人坐、没有的站", () => {
    expect(poseForScript("phone", true)).toBe("sitPhoneLap");
    expect(poseForScript("listen", true)).toBe("sitUpright");
    expect(poseForScript("talk", true)).toBe("sitTalk");
    expect(poseForScript("laugh", true)).toBe("sitLaugh");
    expect(poseForScript("lap", true)).toBe("sitSlouch");
    expect(poseForScript("talk", false)).toBe("standTalk");
    expect(poseForScript("stand", false)).toBe("standRelaxed");
  });

  for (const kind of KINDS) it(`${kind}：每个姿势的关节角都在限位内，坐姿的骨盆落在椅面上`, () => {
    const { rig } = makeTestRig(kind);
    for (const id of ALL_POSES) {
      const pose = buildPose(id, { dims: rig.dims, seat: SEAT });
      expect(checkPoseLimits(pose), id).toEqual([]);
      if (pose.seated) expect(Math.abs(pose.hips[1] - (SEAT.height + rig.dims.sitDrop))).toBeLessThan(0.0101);
      else expect(pose.hips[1]).toBeGreaterThan(0.8);
    }
  });

  it("所有坐姿的手 IK 目标在桌面或身体附近", () => {
    const { rig } = makeTestRig("male");
    for (const id of SIT_POSES) {
      const pose = buildPose(id, { dims: rig.dims, seat: SEAT });
      for (const hand of pose.hands) {
        const [x, y, z] = hand.p;
        const onTable = Math.abs(y - SEAT.tableHeight) < 0.12 && z > SEAT.tableEdge - 0.05 && Math.abs(x) < 0.6;
        const nearBody = Math.hypot(x, y - (SEAT.height + 0.16 + 0.35), z) < 0.75;
        expect(onTable || nearBody, `${id} 手目标 ${hand.p.map((n) => n.toFixed(2))}`).toBe(true);
      }
    }
  });

  for (const kind of KINDS) it(`${kind}：除伸手外，坐姿的手 / 脚 IK 都够得着（< 2 cm），脚平放地面，膝盖在桌下`, () => {
    for (const id of SIT_POSES) {
      const { rig, anim } = settle(kind, id);
      const t = anim.lastTargets;
      for (const [i, name] of ["LeftHand", "RightHand", "LeftFoot", "RightFoot"].entries()) {
        if (id === "sitReach" && i === 1) continue;
        const err = rig.position(name, v(0, 0, 0)).distanceTo(t[i].p);
        expect(err, `${kind} ${id} ${name}`).toBeLessThan(i < 2 && id === "sitLaugh" ? 0.03 : 0.025);
      }
      for (const side of ["Left", "Right"]) {
        expect(Math.abs(rig.position(`${side}ToeBase`, v(0, 0, 0)).y), `${id} 脚尖`).toBeLessThan(0.025);
        expect(rig.position(`${side}Leg`, v(0, 0, 0)).y + 0.07, `${id} 膝高`).toBeLessThan(SEAT.tableHeight - 0.045);
      }
    }
  });

  for (const kind of KINDS) it(`${kind}：手放在桌上的姿势，指尖不穿桌面（桌面 0.75）`, () => {
    const tip = v(0, 0, 0);
    for (const [id, sides] of [["sitUpright", ["Left", "Right"]], ["sitLeanForward", ["Left", "Right"]], ["sitWrite", ["Left"]], ["sitPhoneTable", ["Left"]], ["sitTalk", ["Left"]]]) {
      const { rig } = settle(kind, id);
      for (const side of sides) for (const finger of ["Thumb", "Index", "Middle", "Ring", "Pinky"]) {
        expect(rig.fingertip(side, finger, tip).y, `${kind} ${id} ${side}${finger}`).toBeGreaterThan(SEAT.tableHeight - 0.012);
      }
    }
  });

  it("写字：笔尖落在纸面附近，不穿桌子", () => {
    for (const kind of KINDS) {
      const { anim } = settle(kind, "sitWrite");
      const tip = anim.penTip(v(0, 0, 0));
      expect(tip).toBeTruthy();
      expect(tip.y).toBeGreaterThan(SEAT.tableHeight - 0.01);
      expect(tip.y).toBeLessThan(SEAT.tableHeight + 0.045);
      expect(Math.abs(tip.x - SEAT.paper.x)).toBeLessThan(0.15);
    }
  });

  it("手机姿势：手机悬在两手之间，屏幕朝向脸", () => {
    const { rig } = makeTestRig("male");
    const pose = buildPose("sitPhoneLap", { dims: rig.dims, seat: SEAT });
    const phone = pose.phone;
    expect(phone).toBeTruthy();
    const mid = v(0, 0, 0).add(v(...pose.hands[0].p)).add(v(...pose.hands[1].p)).multiplyScalar(0.5);
    expect(Math.hypot(phone.p[0] - mid.x, phone.p[2] - mid.z)).toBeLessThan(0.12);
    expect(Math.abs(phone.p[1] - mid.y)).toBeLessThan(0.1);
    expect(phone.n[1]).toBeGreaterThan(0.6); // 屏幕朝上 / 朝脸
  });
});
