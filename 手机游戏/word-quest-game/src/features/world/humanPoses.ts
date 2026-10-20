import type { BodyDims } from "./humanRig";

/**
 * 姿势库（纯数据 + 构造函数，不依赖 three）。对应 docs/api-character-motion.md「humanPoses」。
 * 位置都在人物 frame 中：原点 = 椅面中心正下方的地面（站立时 = 脚下），面朝 +Z，+X 为角色的左侧。
 * 角度元组为 [俯仰, 偏转, 侧倾]（弧度）：俯仰 + = 前倾 / 低头，偏转 + = 向左转，侧倾 + = 向右倾。
 */

export type V3 = [number, number, number];

export type PoseId =
  | "sitUpright" | "sitLeanForward" | "sitPhoneLap" | "sitPhoneTable" | "sitChinHand" | "sitWrite" | "sitSlouch" | "sitTalk" | "sitLaugh" | "sitReach"
  | "standRelaxed" | "standArmsCrossed" | "standTalk" | "standHoldBook" | "standPoint" | "standPhone";

export type FkBone = "Spine" | "Spine1" | "Spine2" | "Neck" | "LeftShoulder" | "RightShoulder";
export const FK_BONES: readonly FkBone[] = ["Spine", "Spine1", "Spine2", "Neck", "LeftShoulder", "RightShoulder"];

/** 姿势里每个 FK 关节的角度限位 [最小, 最大]（俯仰 / 偏转 / 侧倾） */
export const FK_LIMITS: Record<FkBone | "Hips", [[number, number], [number, number], [number, number]]> = {
  Hips: [[-0.6, 0.6], [-0.5, 0.5], [-0.35, 0.35]],
  Spine: [[-0.45, 0.6], [-0.6, 0.6], [-0.4, 0.4]],
  Spine1: [[-0.45, 0.6], [-0.6, 0.6], [-0.4, 0.4]],
  Spine2: [[-0.45, 0.6], [-0.6, 0.6], [-0.4, 0.4]],
  Neck: [[-0.7, 0.8], [-0.79, 0.79], [-0.45, 0.45]],
  LeftShoulder: [[-0.4, 0.4], [-0.4, 0.4], [-0.5, 0.5]],
  RightShoulder: [[-0.4, 0.4], [-0.4, 0.4], [-0.5, 0.5]],
};

/** 一个肢体末端目标（手 / 脚）。rel = 1 表示位置相对当前骨盆（手自然下垂跟着身体走），0 为 frame 绝对。 */
export interface LimbTarget {
  p: V3;
  rel: number;
  /** 肘 / 膝朝向（pole 向量） */
  pole: V3;
  /** 手指 / 脚尖方向 */
  f: V3;
  /** 掌心 / 脚背法线（手：手掌朝向；脚：脚背朝上 = 向上） */
  n: V3;
}

export interface PropPlacement {
  p: V3;
  /** 屏幕 / 封面法线 */
  n: V3;
  /** “上”边方向 */
  u: V3;
}

export interface PoseProfile {
  /** 呼吸幅度倍率 */
  breath: number;
  /** 微晃幅度倍率 */
  sway: number;
  /** 小动作频率倍率（0 = 不做） */
  fidget: number;
  /** 说话手势幅度倍率 */
  gesture: number;
}

export interface HumanPose {
  id: PoseId;
  seated: boolean;
  /** 骨盆在 frame 中的位置 */
  hips: V3;
  hipsRot: V3;
  fk: Partial<Record<FkBone, V3>>;
  /** [左, 右] */
  hands: [LimbTarget, LimbTarget];
  feet: [LimbTarget, LimbTarget];
  /** 手指弯曲 [拇指, 食指, 中指, 无名指, 小指]：[左, 右] */
  curl: [number[], number[]];
  /** 默认视线点（frame 空间）；运动层的注视目标会覆盖它 */
  gaze: V3;
  phone?: PropPlacement;
  pen?: boolean;
  book?: PropPlacement;
  profile: PoseProfile;
}

/** 座位 / 桌子的标定数据（场景导出）。 */
export interface SeatSpec {
  /** 椅面高度 */
  height: number;
  /** 桌面高度 */
  tableHeight: number;
  /** 座椅中心到桌子近侧边缘的前向距离 */
  tableEdge: number;
  /** 本座位前纸 / 笔记本中心（座位局部：x = 角色左侧、z = 前方） */
  paper?: { x: number; z: number };
  /** 起身 / 坐下时站在椅子侧边的偏移（角色左侧为正） */
  standOffsetX?: number;
  /** 伸手目标（frame 空间，例如面板），sitReach 用 */
  reach?: V3;
}

export const DEFAULT_SEAT: SeatSpec = { height: 0.48, tableHeight: 0.75, tableEdge: 0.35 };

/**
 * 骨盆骨骼相对椅面中心的前后位置。按真实网格扫描：男底模大腿很粗、膝高受小腿长度限制（≤ 椅面高），
 * 骨盆放在座面中部偏前（臀部后缘距椅背约 12 cm）时大腿才能“坐”在座面上，而不是被椅面前沿切进去（陷入 ≤ 2 cm）。
 */
export const SEAT_HIP_Z = 0.04;

export interface PoseContext {
  dims: BodyDims;
  seat: SeatSpec;
}

const DOWN: V3 = [0, -1, 0];
const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const limb = (p: V3, pole: V3, f: V3, n: V3, rel = 0): LimbTarget => ({ p, rel, pole, f, n });
const side = (s: 1 | -1): number => s;

/** 站立 / 坐姿的脚：踝关节目标在地面上，脚尖略外八，膝朝前 */
function feet(ctx: PoseContext, hipsX: number, hipsZ: number, spread: number, forward: number, left?: Partial<{ x: number; z: number; yaw: number }>, right?: Partial<{ x: number; z: number; yaw: number }>): [LimbTarget, LimbTarget] {
  const y = ctx.dims.ankleHeight;
  const mk = (s: 1 | -1, o?: Partial<{ x: number; z: number; yaw: number }>): LimbTarget => {
    const yaw = o?.yaw ?? 0.14;
    return limb([hipsX + side(s) * spread + (o?.x ?? 0), y, hipsZ + forward + (o?.z ?? 0)], [side(s) * 0.25, 0.35, 1], [side(s) * Math.sin(yaw), 0, Math.cos(yaw)], [0, 1, 0]);
  };
  return [mk(1, left), mk(-1, right)];
}

const relaxedCurl = (v = 0.3): number[] => [v * 0.7, v, v * 1.1, v * 1.2, v * 1.3];

const SIT_PROFILE: PoseProfile = { breath: 1, sway: 1, fidget: 1, gesture: 1 };

/** 坐姿骨盆：椅面 + 臀厚，略往前 / 后挪 */
/** 骨盆骨骼高度 = 椅面 + 臀厚（dims.sitDrop：男 / 女底模的臀部网格最低处距骨盆骨骼的实测距离） */
function sitHips(ctx: PoseContext, dz = 0, dy = 0): V3 {
  return [0, ctx.seat.height + ctx.dims.sitDrop + dy, SEAT_HIP_Z + dz];
}

/** 坐姿的脚：大腿近水平，脚平放在椅子前方的地面上 */
function sitFeet(ctx: PoseContext, hipsZ: number, spread = 0.13, back = 0): [LimbTarget, LimbTarget] {
  return feet(ctx, 0, hipsZ, spread, ctx.dims.thigh * 1.04 - back, { yaw: 0.12 }, { yaw: 0.12 });
}

function tableHand(ctx: PoseContext, s: 1 | -1, x: number, depth: number, lift = 0.058): LimbTarget {
  const e = ctx.seat.tableEdge, T = ctx.seat.tableHeight;
  // 手掌向下并略向内侧滚，拇指一侧抬起，不压进桌面
  return limb([x, T + lift, e + depth], [side(s) * 0.55, -0.55, -0.65], [side(s) * -0.08, 0.1, 1], [-side(s) * 0.3, -1, 0]);
}

function paperAt(ctx: PoseContext): { x: number; z: number } {
  return ctx.seat.paper ?? { x: -0.12, z: ctx.seat.tableEdge + 0.1 };
}

/** 构造一个姿势。dims 来自实际骨架，所以男 / 女底模都能落在椅面和地面上。 */
export function buildPose(id: PoseId, ctx: PoseContext): HumanPose {
  const { dims, seat } = ctx;
  const T = seat.tableHeight;
  const e = seat.tableEdge;
  const hz = SEAT_HIP_Z;
  const standY = dims.ankleHeight + (dims.thigh + dims.shin) * 0.985;
  const hangY = dims.hipsToShoulderY - (dims.upperArm + dims.foreArm) * 0.955;
  const hangX = dims.shoulderHalfWidth + 0.05;
  const base = {
    seated: true,
    hips: sitHips(ctx),
    hipsRot: [0.04, 0, 0] as V3,
    fk: {} as HumanPose["fk"],
    feet: sitFeet(ctx, hz),
    curl: [relaxedCurl(0.25), relaxedCurl(0.25)] as [number[], number[]],
    gaze: [0, seat.height + 0.62, 1.7] as V3,
    profile: SIT_PROFILE,
  };
  switch (id) {
    case "sitUpright":
      return {
        ...base, id,
        fk: { Spine: [0.05, 0, 0], Spine1: [0.05, 0, 0], Spine2: [0.04, 0, 0], Neck: [0.04, 0, 0] },
        hands: [tableHand(ctx, 1, 0.09, 0.02), tableHand(ctx, -1, -0.09, 0.02)],
        curl: [relaxedCurl(0.12), relaxedCurl(0.12)],
      };
    case "sitLeanForward": {
      const depth = 0.12 + (dims.upperArm + dims.foreArm - 0.5) * 3;
      const lh = limb([0.045, T + 0.07, e + depth], [0.7, -1, -0.15], [-0.45, 0.08, 1], [-0.45, -0.85, 0]);
      const rh = limb([-0.045, T + 0.06, e + depth + 0.01], [-0.7, -1, -0.15], [0.45, 0.08, 1], [0.45, -0.85, 0]);
      return {
        ...base, id,
        hips: sitHips(ctx, 0.07),
        hipsRot: [0.12, 0, 0],
        fk: { Spine: [0.14, 0, 0], Spine1: [0.14, 0, 0], Spine2: [0.1, 0, 0], Neck: [0.04, 0, 0], LeftShoulder: [0, 0, 0.04], RightShoulder: [0, 0, -0.04] },
        feet: sitFeet(ctx, hz + 0.07, 0.13, 0.03),
        hands: [lh, rh],
        curl: [relaxedCurl(0.3), relaxedCurl(0.3)],
      };
    }
    case "sitPhoneLap": {
      const py = seat.height + 0.28;
      const phone: PropPlacement = { p: [0, py, 0.26], n: [0, 0.95, -0.3], u: [0, 0.3, 0.95] };
      const lh = limb([0.075, py - 0.045, 0.19], [0.6, -0.5, -0.6], [-0.25, 0.25, 1], [-0.55, 0.8, 0.1]);
      const rh = limb([-0.075, py - 0.045, 0.19], [-0.6, -0.5, -0.6], [0.25, 0.25, 1], [0.55, 0.8, 0.1]);
      return {
        ...base, id,
        hips: sitHips(ctx, 0.0),
        hipsRot: [-0.1, 0, 0],
        fk: { Spine: [0.1, 0, 0], Spine1: [0.13, 0, 0], Spine2: [0.12, 0, 0], Neck: [0.1, 0, 0], LeftShoulder: [0, 0, 0.05], RightShoulder: [0, 0, -0.05] },
        hands: [lh, rh],
        curl: [[0.45, 0.8, 0.85, 0.85, 0.85], [0.1, 0.8, 0.85, 0.85, 0.85]],
        gaze: [0, py + 0.02, 0.26],
        phone,
        profile: { ...SIT_PROFILE, breath: 0.9 },
      };
    }
    case "sitPhoneTable": {
      const phone: PropPlacement = { p: [0.02, T + 0.005, e + 0.14], n: [0, 1, 0], u: [0, 0, 1] };
      const rh = limb([-0.03, T + 0.085, e + 0.05], [-0.5, -0.6, -0.6], [0.1, -0.12, 1], [0.15, -1, 0.1]);
      return {
        ...base, id,
        hips: sitHips(ctx, 0.03),
        hipsRot: [0.04, 0, 0],
        fk: { Spine: [0.1, 0, 0], Spine1: [0.11, 0, 0], Spine2: [0.1, 0, 0], Neck: [0.08, 0, 0] },
        feet: sitFeet(ctx, hz + 0.03, 0.13, 0.02),
        hands: [tableHand(ctx, 1, 0.2, 0.05), rh],
        curl: [relaxedCurl(0.2), [0.5, 0.05, 0.7, 0.75, 0.8]],
        gaze: [0.02, T + 0.01, e + 0.14],
        phone,
      };
    }
    case "sitChinHand": {
      const lean = 0.5;
      const hz2 = hz + 0.07;
      const headZ = hz2 + dims.hipsToHeadY * Math.sin(lean);
      const headY = seat.height + dims.sitDrop + dims.hipsToHeadY * Math.cos(lean);
      const rh = limb([-0.045, headY - 0.11, headZ + 0.06], [-0.3, -0.8, 0.5], [0.15, 0.9, 0.3], [0.9, 0.2, 0.05]);
      return {
        ...base, id,
        hips: sitHips(ctx, 0.07),
        hipsRot: [0.12, 0, 0],
        fk: { Spine: [0.14, 0, 0.02], Spine1: [0.14, 0, 0.03], Spine2: [0.1, 0, 0.04], Neck: [0.0, 0, -0.04], RightShoulder: [0, 0, -0.07] },
        feet: sitFeet(ctx, hz2, 0.13, 0.03),
        hands: [limb([0.15, T + 0.055, e + 0.12], [0.5, -0.8, 0], [-0.1, 0.12, 1], [-0.3, -1, 0]), rh],
        curl: [relaxedCurl(0.2), [0.3, 0.25, 0.4, 0.55, 0.6]],
        gaze: [0, seat.height + 0.7, 1.6],
      };
    }
    case "sitWrite": {
      const paper = paperAt(ctx);
      const wx = paper.x - 0.02, wz = paper.z - 0.075;
      const rh = limb([wx, T + 0.083, wz], [-0.55, -0.55, -0.6], [0.0, -0.3, 1], [0.1, -1, 0.05]);
      const lh = limb([clamp(paper.x + 0.16, -0.06, 0.2), T + 0.055, paper.z - 0.04], [0.5, -0.6, -0.5], [-0.15, 0.12, 1], [-0.3, -1, 0]);
      return {
        ...base, id,
        hips: sitHips(ctx, 0.04),
        hipsRot: [0.08, 0, 0],
        fk: { Spine: [0.1, 0, 0], Spine1: [0.12, 0, 0.02], Spine2: [0.1, 0, 0.03], Neck: [0.1, 0, 0] },
        feet: sitFeet(ctx, hz + 0.04, 0.13, 0.02),
        hands: [lh, rh],
        curl: [relaxedCurl(0.12), [0.55, 0.65, 0.65, 0.8, 0.85]],
        gaze: [paper.x, T + 0.01, paper.z],
        pen: true,
        profile: { ...SIT_PROFILE, breath: 0.95, sway: 0.7 },
      };
    }
    case "sitSlouch": {
      const y = seat.height + 0.2;
      return {
        ...base, id,
        hips: sitHips(ctx, 0.0, -0.005),
        hipsRot: [-0.26, 0, 0],
        fk: { Spine: [0.07, 0, 0], Spine1: [0.09, 0, 0], Spine2: [0.1, 0, 0], Neck: [0.09, 0, 0], LeftShoulder: [0, 0, 0.03], RightShoulder: [0, 0, -0.03] },
        feet: sitFeet(ctx, hz, 0.15, -0.04),
        hands: [limb([0.17, y, 0.12], [0.5, -0.6, -0.6], [-0.1, 0.02, 1], DOWN), limb([-0.17, y, 0.12], [-0.5, -0.6, -0.6], [0.1, 0.02, 1], DOWN)],
        curl: [relaxedCurl(0.35), relaxedCurl(0.35)],
        gaze: [0, seat.height + 0.62, 1.7],
        profile: { ...SIT_PROFILE, breath: 1.05 },
      };
    }
    case "sitTalk":
      return {
        ...base, id,
        hips: sitHips(ctx, 0.02),
        fk: { Spine: [0.07, 0, 0], Spine1: [0.07, 0, 0], Spine2: [0.06, 0, 0], Neck: [0.04, 0, 0] },
        hands: [tableHand(ctx, 1, 0.16, 0.0), limb([-0.17, T + 0.22, e - 0.03], [-0.6, -0.8, -0.5], [0.2, 0.2, 1], [0.2, 0.8, 0.3])],
        curl: [relaxedCurl(0.15), relaxedCurl(0.3)],
        profile: { ...SIT_PROFILE, gesture: 1 },
      };
    case "sitLaugh":
      return {
        ...base, id,
        hips: sitHips(ctx, -0.0),
        hipsRot: [-0.14, 0, 0],
        fk: { Spine: [0.0, 0, 0], Spine1: [-0.03, 0, 0], Spine2: [-0.05, 0, 0], Neck: [-0.06, 0, 0], LeftShoulder: [0, 0, 0.06], RightShoulder: [0, 0, -0.06] },
        feet: sitFeet(ctx, hz, 0.15, -0.03),
        hands: [limb([0.12, seat.height + 0.31, 0.1], [0.7, -0.4, -0.6], [-0.4, -0.1, 1], [-0.7, -0.5, 0]), limb([-0.1, seat.height + 0.34, 0.11], [-0.7, -0.4, -0.6], [0.4, -0.1, 1], [0.7, -0.5, 0])],
        curl: [relaxedCurl(0.4), relaxedCurl(0.4)],
        gaze: [0.05, seat.height + 0.7, 1.7],
        profile: { breath: 1.6, sway: 0.5, fidget: 0, gesture: 0 },
      };
    case "sitReach": {
      const target = seat.reach ?? [-0.25, seat.height + 0.85, 0.5];
      return {
        ...base, id,
        hips: sitHips(ctx, 0.04),
        hipsRot: [0.08, 0, 0],
        // 伸手去够：身体前倾，右肩前探；左手仍放在膝上
        fk: { Spine: [0.08, 0, 0], Spine1: [0.1, 0, 0], Spine2: [0.1, 0, 0], Neck: [0.03, 0, 0], RightShoulder: [-0.12, 0, -0.06] },
        feet: sitFeet(ctx, hz + 0.04, 0.13, 0.02),
        hands: [limb([0.15, seat.height + 0.2, 0.14], [0.5, -0.6, -0.6], [-0.1, 0.02, 1], DOWN), limb(target, [-0.4, -0.7, -0.6], [-0.1, 0.35, 1], [0.1, -0.2, 0.2])],
        curl: [relaxedCurl(0.35), [0.2, 0.05, 0.12, 0.2, 0.25]],
        gaze: target,
      };
    }
    // ───────── 站姿 ─────────
    case "standRelaxed": {
      const sx = 0.03;
      return {
        ...base, id,
        seated: false,
        hips: [sx, standY, 0],
        hipsRot: [0.02, 0, -0.035],
        fk: { Spine: [0.01, 0, 0.03], Spine1: [0.01, 0, 0.02], Spine2: [0, 0, 0.02], Neck: [0.02, 0, 0] },
        feet: [limb([dims.hipHalfWidth + 0.015, dims.ankleHeight, 0], [0.1, 0.3, 1], [0.12, 0, 1], [0, 1, 0]), limb([-dims.hipHalfWidth - 0.075, dims.ankleHeight, 0.07], [-0.3, 0.3, 1], [-0.3, 0, 1], [0, 1, 0])],
        hands: [limb([hangX, hangY, 0.06], [0.3, -0.2, -1], [0, -1, 0.15], [-1, 0, 0], 1), limb([-hangX - 0.01, hangY - 0.01, 0.05], [-0.3, -0.2, -1], [0, -1, 0.15], [1, 0, 0], 1)],
        curl: [relaxedCurl(0.3), relaxedCurl(0.3)],
        gaze: [0, dims.ankleHeight + 1.55, 2],
        profile: { breath: 1, sway: 1, fidget: 1, gesture: 1 },
      };
    }
    case "standArmsCrossed":
      return {
        ...base, id,
        seated: false,
        hips: [0.02, standY, 0],
        hipsRot: [0.02, 0, -0.02],
        fk: { Spine: [0, 0, 0.02], Spine1: [0.02, 0, 0.0], Spine2: [0.02, 0, 0], Neck: [0.02, 0, 0] },
        feet: feet(ctx, 0, 0, dims.hipHalfWidth + 0.03, 0, { yaw: 0.2 }, { yaw: 0.2 }),
        hands: [limb([-0.14, 0.43, 0.2], [0.2, -1, -0.2], [-1, 0.1, 0.15], [0.1, -0.2, 1], 1), limb([0.15, 0.4, 0.18], [-0.2, -1, -0.2], [1, 0.1, 0.15], [-0.1, -0.2, 1], 1)],
        curl: [relaxedCurl(0.5), relaxedCurl(0.5)],
        gaze: [0, dims.ankleHeight + 1.55, 2],
      };
    case "standTalk":
      return {
        ...base, id,
        seated: false,
        hips: [0.02, standY, 0],
        hipsRot: [0.02, 0, -0.03],
        fk: { Spine: [0.01, 0, 0.02], Spine1: [0.02, 0, 0.01], Spine2: [0.01, 0, 0], Neck: [0.02, 0, 0] },
        feet: feet(ctx, 0, 0, dims.hipHalfWidth + 0.04, 0, { yaw: 0.25 }, { yaw: 0.25 }),
        hands: [limb([hangX - 0.02, hangY + 0.1, 0.12], [0.3, -0.3, -1], [0, -1, 0.2], [-1, 0, 0], 1), limb([-0.2, 0.46, 0.3], [-0.5, -0.6, -0.8], [0.1, 0.2, 1], [0.3, 0.8, 0.3], 1)],
        curl: [relaxedCurl(0.3), relaxedCurl(0.25)],
        gaze: [0, dims.ankleHeight + 1.55, 2],
      };
    case "standHoldBook": {
      const book: PropPlacement = { p: [0, standY + 0.4, 0.27], n: [0, 0.6, -0.8], u: [0, 0.8, 0.6] };
      return {
        ...base, id,
        seated: false,
        hips: [0, standY, 0],
        hipsRot: [0.02, 0, 0],
        fk: { Spine: [0.02, 0, 0], Spine1: [0.03, 0, 0], Spine2: [0.03, 0, 0], Neck: [0.04, 0, 0] },
        feet: feet(ctx, 0, 0, dims.hipHalfWidth + 0.03, 0, { yaw: 0.2 }, { yaw: 0.2 }),
        hands: [limb([0.13, 0.4, 0.22], [0.5, -0.8, -0.5], [-0.4, 0.4, 1], [-0.8, 0.2, 0.3], 1), limb([-0.13, 0.4, 0.22], [-0.5, -0.8, -0.5], [0.4, 0.4, 1], [0.8, 0.2, 0.3], 1)],
        curl: [[0.5, 0.7, 0.7, 0.75, 0.75], [0.5, 0.7, 0.7, 0.75, 0.75]],
        gaze: [0, standY + 0.4, 0.3],
        book,
        profile: { breath: 1, sway: 0.7, fidget: 0.7, gesture: 0.5 },
      };
    }
    case "standPoint":
      return {
        ...base, id,
        seated: false,
        hips: [0, standY, 0],
        hipsRot: [0.02, 0, 0],
        fk: { Spine: [0.02, 0, 0], Spine1: [0.02, 0, 0], Spine2: [0.01, 0, 0] },
        feet: feet(ctx, 0, 0, dims.hipHalfWidth + 0.03, 0, { yaw: 0.2 }, { yaw: 0.2 }),
        hands: [limb([hangX, hangY, 0.06], [0.3, -0.2, -1], [0, -1, 0.15], [-1, 0, 0], 1), limb([-0.14, dims.hipsToShoulderY - 0.02, (dims.upperArm + dims.foreArm) * 0.9], [-0.4, -0.5, -0.6], [-0.05, 0.1, 1], [0.1, -1, 0], 1)],
        curl: [relaxedCurl(0.3), [0.6, 0.0, 0.8, 0.85, 0.9]],
        gaze: [-0.4, dims.ankleHeight + 1.5, 3],
      };
    case "standPhone": {
      const phone: PropPlacement = { p: [0, standY + 0.38, 0.27], n: [0, 0.85, -0.5], u: [0, 0.5, 0.85] };
      return {
        ...base, id,
        seated: false,
        hips: [0, standY, 0],
        hipsRot: [0.02, 0, 0],
        fk: { Spine: [0.03, 0, 0], Spine1: [0.05, 0, 0], Spine2: [0.06, 0, 0], Neck: [0.08, 0, 0] },
        feet: feet(ctx, 0, 0, dims.hipHalfWidth + 0.03, 0, { yaw: 0.2 }, { yaw: 0.2 }),
        hands: [limb([0.07, 0.36, 0.22], [0.6, -0.6, -0.6], [-0.35, 0.3, 1], [-0.75, 0.3, 0.25], 1), limb([-0.07, 0.36, 0.22], [-0.6, -0.6, -0.6], [0.35, 0.3, 1], [0.75, 0.3, 0.25], 1)],
        curl: [[0.45, 0.8, 0.85, 0.85, 0.85], [0.1, 0.8, 0.85, 0.85, 0.85]],
        gaze: [0, standY + 0.36, 0.25],
        phone,
      };
    }
  }
}

export const SIT_POSES: readonly PoseId[] = ["sitUpright", "sitLeanForward", "sitPhoneLap", "sitPhoneTable", "sitChinHand", "sitWrite", "sitSlouch", "sitTalk", "sitLaugh", "sitReach"];
export const STAND_POSES: readonly PoseId[] = ["standRelaxed", "standArmsCrossed", "standTalk", "standHoldBook", "standPoint", "standPhone"];
export const ALL_POSES: readonly PoseId[] = [...SIT_POSES, ...STAND_POSES];

/** 剧本姿势 → 姿势库。座位上的人（seated）用坐姿，其余用站姿。 */
export function poseForScript(pose: string, seated: boolean): PoseId {
  if (seated) {
    switch (pose) {
      case "phone": return "sitPhoneLap";
      case "talk": return "sitTalk";
      case "write": return "sitWrite";
      case "read": return "sitLeanForward";
      case "lap": return "sitSlouch";
      case "reach": return "sitReach";
      case "laugh": return "sitLaugh";
      default: return "sitUpright";
    }
  }
  switch (pose) {
    case "talk": return "standTalk";
    case "read": return "standHoldBook";
    case "point": return "standPoint";
    case "phone": return "standPhone";
    default: return "standRelaxed";
  }
}

/** 听讲时的小变体：偶尔从端坐换到写字 / 前倾 / 托腮（运动层在“空闲”时轮换） */
export const LISTEN_VARIANTS: readonly PoseId[] = ["sitUpright", "sitWrite", "sitLeanForward", "sitChinHand", "sitUpright"];
export const PHONE_VARIANTS: readonly PoseId[] = ["sitPhoneLap", "sitPhoneTable", "sitPhoneLap"];
