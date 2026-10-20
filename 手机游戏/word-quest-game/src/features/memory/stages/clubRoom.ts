import { interiorKit, interiorWood } from "./interiorMaterials";
import { floorJoints, studyNotebook } from "./studyDetails";
import * as THREE from "three";
import { applyKitPattern } from "../../world/kitShader";
import { createBush, createTree } from "../../world/props";
import { buildFlagstonePath } from "../../world/flagstonePath";
import { bench, board, chair, cup, lampPost, table, type SceneKit, Frame } from "../../world/sceneProps";
import type { ActorSeat } from "../types";
import { makePlaster } from "./emptyRoom";
import { pieceGroup, type StageDef } from "./types";

/**
 * 《周四的沉默》的舞台“clubRoom”：周四傍晚，图书馆庭院边的社团教室。
 * 单位：米。房间 11（x）× 8（z），墙高 3.4；z = -4 是窗墙，窗外是庭院（石板路、长椅、树）和远处的图书馆。
 * 低低的暖阳从窗外左前方照进来；一张长桌，桌边五把椅子（两头各一把），黑板、书架、植物、软木板、四周计划表、挂钟。
 * 每个可显形的部件是一个顶层 Group（name 唯一），全部用合并几何：整个舞台约 55 个网格。
 */

const W = 11;
const D = 8;
const H = 3.4;
const T = 0.25;
const HX = W / 2;
const HZ = D / 2;
/** 庭院地面比室内地板低 13 cm */
const GY = -0.13;

/** 窗洞：x ∈ [-2.9, 2.9]，y ∈ [0.6, 3.0] */
const WIN_X = 2.9;
const WIN_Y0 = 0.6;
const WIN_Y1 = 3.0;

/** 指向太阳的方向（从原点看）。低、暖、从窗外偏左 */
export const CLUB_SUN_DIR = new THREE.Vector3(-0.34, 0.27, -0.9).normalize();

const TARGETS = {
  floor: "rise",
  wall_back: "rise",
  window: "fade",
  wall_left: "rise",
  wall_right: "rise",
  wall_front: "rise",
  ceiling: "fade",
  courtyard_ground: "rise",
  courtyard_path: "rise",
  benches: "rise",
  library: "rise",
  tree_a: "grow",
  tree_b: "grow",
  tree_c: "grow",
  tree_d: "grow",
  sunlight: "fade",
  table: "rise",
  chairs: "rise",
  basket: "condense",
  board: "rise",
  plan: "fade",
  clock: "condense",
  shelf: "rise",
  plants: "grow",
  notice: "fade",
  lamps: "fade",
} as const;

export const CLUB_ROOM_TARGETS = Object.keys(TARGETS);

/** 椅面高度（与 sceneProps.chair 的座面一致）/ 长桌（中心 z = -0.25，4.9 × 1.0，桌面高 0.75）*/
export const CHAIR_SEAT_HEIGHT = 0.48;
export const CLUB_TABLE = { x: 0, z: -0.25, width: 4.9, depth: 1.0, height: 0.75 } as const;

/** 椅子位置与朝向（人物就坐的位置，yaw 与 CLUB_SEATS 一致） */
export const CLUB_SEATS = {
  /** 年轻的“我”：桌子右端，面朝 -x */
  me: { x: 2.8, z: -0.25, yaw: -Math.PI / 2 },
  lin: { x: 0.9, z: -1.1, yaw: 0 },
  mei: { x: -0.6, z: -1.1, yaw: 0 },
  an: { x: -2.8, z: -0.25, yaw: Math.PI / 2 },
  rui: { x: -1.3, z: 0.6, yaw: Math.PI },
} as const;

/** 笔记本 / 笔在桌面的位置（世界坐标，与 buildTable 一致）*/
const NOTEBOOKS: Record<keyof typeof CLUB_SEATS, [number, number]> = {
  lin: [CLUB_SEATS.lin.x - 0.35, -0.64],
  mei: [CLUB_SEATS.mei.x + 0.1, -0.64],
  rui: [CLUB_SEATS.rui.x + 0.2, 0.12],
  an: [CLUB_SEATS.an.x + 0.38, -0.3],
  me: [CLUB_SEATS.me.x - 0.38, -0.25],
};

/**
 * 某个座位的标定数据（人物 actor.seat 用）：椅面高度、桌面高度、椅面中心到桌边的前向距离，
 * 以及桌上笔记本在座位局部坐标里的位置。座位局部：x = 角色左侧、z = 前方（yaw 与 CLUB_SEATS 一致）。
 */
export function clubSeatSpec(id: keyof typeof CLUB_SEATS): ActorSeat {
  const seat = CLUB_SEATS[id];
  const fx = Math.sin(seat.yaw), fz = Math.cos(seat.yaw); // 前方
  const lx = Math.cos(seat.yaw), lz = -Math.sin(seat.yaw); // 角色左侧
  const toLocal = (wx: number, wz: number): { x: number; z: number } => ({ x: (wx - seat.x) * lx + (wz - seat.z) * lz, z: (wx - seat.x) * fx + (wz - seat.z) * fz });
  // 桌面是轴对齐矩形，座位都面朝桌子的一条边：前向距离 = 座位中心到那条边
  const hx = CLUB_TABLE.width / 2, hz = CLUB_TABLE.depth / 2;
  const edge = Math.abs(fz) > 0.5
    ? (fz > 0 ? CLUB_TABLE.z - hz - seat.z : seat.z - (CLUB_TABLE.z + hz))
    : (fx > 0 ? CLUB_TABLE.x - hx - seat.x : seat.x - (CLUB_TABLE.x + hx));
  const [nx, nz] = NOTEBOOKS[id];
  return { height: CHAIR_SEAT_HEIGHT, tableHeight: CLUB_TABLE.height, tableEdge: edge, paper: toLocal(nx, nz) };
}

const EMPTY_CHAIRS: Array<[number, number, number]> = [
  [-2.0, -1.1, 0],
  [0.4, 0.6, Math.PI],
  [1.6, 0.6, Math.PI],
];

/** 透明 / 半透明的东西（玻璃、纱帘、光束）不投影，否则太阳照不进来 */
function noCast(group: THREE.Object3D, only?: (m: THREE.Material) => boolean): void {
  group.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const mat = mesh.material as THREE.Material;
    if (!only || only(mat)) mesh.castShadow = false;
  });
}

const std = (color: number, roughness = 0.85, metalness = 0, side: THREE.Side = THREE.FrontSide): THREE.MeshStandardMaterial =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness, side });

// ───────────────────────── 房间 ─────────────────────────

function buildFloor(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "floor", (k) => {
    const f = new Frame(k.kit);
    const boards = interiorWood(0xa27d56,.72);
    const skirting = std(0xd9cfbc, 0.8);
    const rug = std(0x8a7f70, 1, 0, THREE.DoubleSide);
    const rugEdge = std(0x756b5f, 1, 0, THREE.DoubleSide);
    f.box(boards, W + 0.4, 0.12, D + 0.4, 0, -0.12, 0, 0.01);
    floorJoints(k, W, D);
    f.box(skirting, W, 0.12, 0.03, 0, 0, -HZ + 0.015, 0.004);
    f.box(skirting, W, 0.12, 0.03, 0, 0, HZ - 0.015, 0.004);
    f.box(skirting, 0.03, 0.12, D, -HX + 0.015, 0, 0, 0.004);
    f.box(skirting, 0.03, 0.12, D, HX - 0.015, 0, 0, 0.004);
    // 长桌下的一块低饱和地毯
    f.box(rugEdge, 6.3, 0.012, 3.5, 0, 0, -0.25, 0.004);
    f.box(rug, 6.0, 0.016, 3.2, 0, 0, -0.25, 0.004);
  });
}

function buildWallBack(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "wall_back", (k) => {
    const f = new Frame(k.kit);
    const plaster = makePlaster();
    const z = -HZ - T / 2;
    const side = HX - WIN_X + T;
    f.box(plaster, side, H, T, -(HX + WIN_X) / 2 - T / 2, 0, z, 0.006);
    f.box(plaster, side, H, T, (HX + WIN_X) / 2 + T / 2, 0, z, 0.006);
    f.box(plaster, WIN_X * 2, WIN_Y0, T, 0, 0, z, 0.006);
    f.box(plaster, WIN_X * 2, H - WIN_Y1, T, 0, WIN_Y1, z, 0.006);
  });
}

function buildWindow(kit: SceneKit): THREE.Group {
  const g = pieceGroup(kit, "window", (k) => {
    const f = new Frame(k.kit);
    const paint = std(0xe0d8c8, 0.6);
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xeaf2f4, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.1, clearcoat: 1, envMapIntensity: 1.2, depthWrite: false });
    const sheer = std(0xefe6d2, 0.95, 0, THREE.DoubleSide);
    sheer.transparent = true;
    sheer.opacity = 0.82;
    const z = -HZ + 0.02;
    // 外框与竖棂（四格）、横档
    f.box(paint, WIN_X * 2 + 0.14, 0.07, 0.14, 0, WIN_Y0 - 0.07, z, 0.006);
    f.box(paint, WIN_X * 2 + 0.14, 0.07, 0.14, 0, WIN_Y1, z, 0.006);
    for (const x of [-WIN_X, -WIN_X / 2, 0, WIN_X / 2, WIN_X]) f.box(paint, 0.07, WIN_Y1 - WIN_Y0 + 0.14, 0.14, x, WIN_Y0 - 0.07, z, 0.006);
    f.box(paint, WIN_X * 2, 0.05, 0.1, 0, 2.2, z, 0.004);
    f.put(new THREE.PlaneGeometry(WIN_X * 2, WIN_Y1 - WIN_Y0), glass, 0, (WIN_Y0 + WIN_Y1) / 2, z);
    // 窗台
    f.box(k.m.stoneWarm, WIN_X * 2 + 0.5, 0.05, 0.34, 0, WIN_Y0 - 0.12, -HZ + 0.1, 0.01);
    // 两侧纱帘
    for (const s of [-1, 1]) {
      const g2 = new THREE.PlaneGeometry(0.62, 2.9, 6, 1);
      const p = g2.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 22 + s) * 0.025);
      g2.computeVertexNormals();
      f.put(g2, sheer, s * (WIN_X + 0.42), 1.8, z + 0.16);
    }
    f.box(k.m.darkSteel, WIN_X * 2 + 1.6, 0.025, 0.025, 0, 3.22, z + 0.18, 0.004);
  });
  noCast(g, (m) => m.transparent);
  return g;
}

// ───────────────────────── 庭院 ─────────────────────────

function buildCourtyardGround(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "courtyard_ground", (k) => {
    const f = new Frame(k.kit);
    const lawn = std(0x6f8f4d, 1);
    const lawn2 = std(0x5f8043, 1);
    const stone = std(0xb7ac98, 0.9);
    applyKitPattern(stone, "paving", { grime: 0.3, wear: 0.4 });
    // 大块草坪（两种绿色拼出深浅）、窗外的石阶平台、花坛石沿
    f.box(lawn, 90, 0.2, 60, 0, GY - 0.2, -4.2 - 30, 0);
    f.box(lawn2, 14, 0.02, 9, -9, GY, -17, 0.004);
    f.box(lawn2, 12, 0.02, 8, 11, GY, -22, 0.004);
    f.box(stone, 8.4, 0.1, 2.2, 0, GY - 0.02, -5.2, 0.012);
    f.box(stone, 5.2, 0.1, 1.2, 0, GY - 0.02, -6.7, 0.012);
    // 草坪边的低矮树篱（一排圆润的灌木块）
    for (let i = 0; i < 11; i++) {
      const x = -13 + i * 2.6;
      f.ball(k.m.leaf, 0.8 + (i % 3) * 0.12, x, GY + 0.45, -13.5 - (i % 2) * 0.3, 1.3, 0.8, 1);
    }
    // 路灯
    lampPost(k, new Frame(k.kit, 2.2, GY, -9.6), 3.2);
  });
}

function buildCourtyardPath(kit: SceneKit): THREE.Group {
  const g = new THREE.Group();
  g.name = "courtyard_path";
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, -6.6), new THREE.Vector3(-0.6, 0, -10), new THREE.Vector3(1.2, 0, -14.5), new THREE.Vector3(0, 0, -21)]);
  const path = buildFlagstonePath(curve, { width: 2.6, groundY: () => GY, seed: 20260, quality: kit.detail === "high" ? "med" : "low" });
  g.add(path);
  return g;
}

function buildBenches(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "benches", (k) => {
    // 路两边相对的两张长椅
    bench(k, new Frame(k.kit, -2.5, GY, -9.4, Math.PI / 2), 1.7);
    bench(k, new Frame(k.kit, 3.2, GY, -11.6, -Math.PI / 2), 1.7);
  });
}

function buildLibrary(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "library", (k) => {
    const f = new Frame(k.kit, 0, GY, -27);
    const wall = std(0xcdbb9a, 0.92);
    applyKitPattern(wall, "masonry", { grime: 0.35, wear: 0.2 });
    const glassDark = std(0x2a3640, 0.2, 0.4);
    // 主楼、屋檐、中央门廊（四根圆柱）、三排窗（一部分亮着灯）
    f.box(wall, 36, 9.5, 5, 0, 0, 0, 0.05);
    f.box(k.m.slate, 37, 0.7, 5.8, 0, 9.5, 0, 0.05);
    f.box(k.m.slate, 12, 1.6, 4.2, 0, 10.2, 0, 0.05);
    f.box(wall, 10, 0.5, 2.6, 0, 6.2, 3.4, 0.03);
    f.box(k.m.stoneWarm, 11, 0.5, 3.4, 0, 0, 3.6, 0.03);
    for (const x of [-4, -1.4, 1.4, 4]) f.cyl(k.m.stoneWarm, 0.45, 0.5, 6, x, 0.5, 4.3, 14);
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 12; i++) {
        const x = -16 + i * 2.9;
        if (Math.abs(x) < 6.5 && row === 0) continue;
        const lit = (i * 7 + row * 3) % 5 < 2;
        f.box(lit ? k.m.lampGlass : glassDark, 1.1, 1.7, 0.2, x, 1.6 + row * 2.8, 2.5, 0.01);
      }
    }
    f.box(glassDark, 2.4, 3.4, 0.2, 0, 0.5, 2.6, 0.01);
  });
}

function treePiece(name: string, x: number, z: number, scale: number, yaw: number, kit: SceneKit): THREE.Group {
  const g = new THREE.Group();
  g.name = name;
  const tree = createTree(scale, kit.detail);
  tree.position.set(x, GY, z);
  tree.rotation.y = yaw;
  g.add(tree);
  return g;
}

/** 窗口射进来的几束斜阳：四个窗格各一个“光柱”（沿太阳方向拉出的棱柱，沿途渐隐），叠加混合 */
function buildSunlight(): THREE.Group {
  const dir = CLUB_SUN_DIR.clone().negate(); // 光的传播方向
  const pos: number[] = [];
  const col: number[] = [];
  const uv: number[] = [];
  const quad = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, d: THREE.Vector3, a0: number, a1: number): void => {
    for (const [i, [p, al]] of ([
      [a, a0],
      [b, a0],
      [c, a1],
      [a, a0],
      [c, a1],
      [d, a1],
    ] as Array<[THREE.Vector3, number]>).entries()) {
      uv.push(...[[0,0],[1,0],[1,1],[0,0],[1,1],[0,1]][i]);
      pos.push(p.x, p.y, p.z);
      col.push(1, 0.82, 0.55, al);
    }
  };
  const panes: Array<[number, number, number, number]> = [];
  for (const [x0, x1] of [
    [-WIN_X, -WIN_X / 2],
    [-WIN_X / 2, 0],
    [0, WIN_X / 2],
    [WIN_X / 2, WIN_X],
  ]) {
    panes.push([x0 + 0.05, x1 - 0.05, WIN_Y0 + 0.05, 2.15]);
  }
  const len = 6.5;
  for (const [x0, x1, y0, y1] of panes) {
    const c = [new THREE.Vector3(x0, y0, -HZ), new THREE.Vector3(x1, y0, -HZ), new THREE.Vector3(x1, y1, -HZ), new THREE.Vector3(x0, y1, -HZ)];
    const far = c.map((p) => p.clone().addScaledVector(dir, len));
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      quad(c[i], c[j], far[j], far[i], 0.075, 0);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 4));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec2 vShaftUv;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvShaftUv = uv;");
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec2 vShaftUv;")
      .replace("#include <color_fragment>", "#include <color_fragment>\ndiffuseColor.a *= smoothstep(0.0,0.22,vShaftUv.x)*(1.0-smoothstep(0.78,1.0,vShaftUv.x))*smoothstep(0.0,0.1,vShaftUv.y);");
  };
  mat.customProgramCacheKey = () => "soft-window-shaft-v1";
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.raycast = () => undefined;
  const g = new THREE.Group();
  g.name = "sunlight";
  g.add(mesh);
  return g;
}

// ───────────────────────── 室内家具 ─────────────────────────

function buildTable(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "table", (k) => {
    table(k, new Frame(k.kit, 0, 0, -0.25), 4.9, 1.0, 0.75);
    const f = new Frame(k.kit);
    const y = 0.75;
    // 每个座位前一本笔记本、一支笔；桌上几只杯子
    const spots: Array<[number, number, number]> = [
      [...NOTEBOOKS.lin, 0.1],
      [...NOTEBOOKS.mei, -0.15],
      [...NOTEBOOKS.rui, 0.2],
      [...NOTEBOOKS.an, Math.PI / 2 + 0.1],
      [...NOTEBOOKS.me, Math.PI / 2 - 0.15],
    ];
    for (const [x, z, r] of spots) {
      const nb = f.child(x, y, z, r);
      studyNotebook(k, nb);
    }
    for (const [x, z] of [
      [-1.0, -0.62],
      [1.9, -0.62],
      [-2.1, 0.1],
    ] as Array<[number, number]>) {
      cup(k, f.child(x, y, z));
    }
  });
}

function buildChairs(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "chairs", (k) => {
    for (const s of Object.values(CLUB_SEATS)) chair(k, new Frame(k.kit, s.x, 0, s.z, s.yaw));
    for (const [x, z, yaw] of EMPTY_CHAIRS) chair(k, new Frame(k.kit, x, 0, z, yaw));
  });
}

/** 角落里的小圆桌 + 藤篮：大家把手机放进去 */
function buildBasket(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "basket", (k) => {
    const f = new Frame(k.kit, -4.4, 0, -2.9);
    const wicker = std(0xa5834f, 0.95);
    f.cyl(k.m.woodDark, 0.34, 0.34, 0.04, 0, 0.62, 0, 24);
    f.cyl(k.m.woodDark, 0.04, 0.05, 0.62, 0, 0, 0, 10);
    f.cyl(k.m.woodDark, 0.22, 0.24, 0.03, 0, 0, 0, 16);
    f.cyl(wicker, 0.24, 0.17, 0.2, 0, 0.66, 0, 20);
    f.put(new THREE.TorusGeometry(0.24, 0.016, 6, 24), wicker, 0, 0.86, 0, Math.PI / 2);
    // 篮子里露出几部手机的边缘
    for (let i = 0; i < 3; i++) f.box(k.p.plasticDark, 0.07, 0.01, 0.14, -0.07 + i * 0.07, 0.85, -0.02 + (i % 2) * 0.04, 0.003, 0, i * 0.5, 0);
  });
}

function buildBoard(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "board", (k) => {
    const bf = new Frame(k.kit, HX - 0.05, 1.0, -1.0, -Math.PI / 2);
    board(k, bf, 2.8, 1.2);
    // 粉笔字：标题（一行）、四行周次（小圆圈 + 横线）
    const chalk = k.m.paper;
    const z = 0.045;
    bf.box(chalk, 1.0, 0.035, 0.003, -0.7, 0.06 + 1.04, z, 0);
    bf.box(chalk, 1.4, 0.012, 0.003, -0.5, 0.06 + 0.97, z, 0);
    for (let i = 0; i < 4; i++) {
      const y = 0.06 + 0.78 - i * 0.2;
      bf.put(new THREE.TorusGeometry(0.045, 0.006, 5, 14), chalk, -1.05, y + 0.02, z);
      bf.box(chalk, 0.9 - i * 0.1, 0.018, 0.003, -0.35, y, z, 0);
    }
    bf.put(new THREE.TorusGeometry(0.22, 0.008, 5, 22), chalk, 0.7, 0.06 + 0.7, z, 0, 0, 0, 1.3, 0.8, 1);
    bf.box(chalk, 0.55, 0.014, 0.003, 0.7, 0.06 + 0.35, z, 0);
    bf.box(chalk, 0.4, 0.014, 0.003, 0.7, 0.06 + 0.25, z, 0);
  });
}

/** 贴在墙上的“四周计划表” */
function buildPlan(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "plan", (k) => {
    const wf = new Frame(k.kit, HX - 0.02, 1.0, 1.55, -Math.PI / 2);
    wf.box(k.m.paper, 0.8, 1.05, 0.006, 0, 0, 0, 0.002);
    wf.box(k.p.printInk, 0.6, 0.05, 0.003, 0, 0.9, 0.005, 0);
    for (let i = 0; i < 4; i++) {
      wf.box(k.p.printInk, 0.5, 0.025, 0.003, 0.02, 0.7 - i * 0.2, 0.005, 0);
      wf.box(k.p.fabricRed, 0.07, 0.07, 0.003, -0.29, 0.69 - i * 0.2, 0.005, 0);
    }
    for (const x of [-0.34, 0.34]) wf.ball(k.p.fabricRed, 0.014, x, 1.02, 0.01);
  });
}

function buildClock(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "clock", (k) => {
    const f = new Frame(k.kit, HX - 0.04, 2.55, -1.0, -Math.PI / 2);
    f.put(new THREE.CylinderGeometry(0.24, 0.24, 0.05, 28), k.m.brass, 0, 0.24, 0.02, Math.PI / 2);
    f.put(new THREE.CylinderGeometry(0.21, 0.21, 0.01, 28), k.p.fabricCream, 0, 0.24, 0.05, Math.PI / 2);
    f.box(k.p.plasticDark, 0.012, 0.15, 0.006, 0, 0.24, 0.058, 0.002);
    f.put(new THREE.BoxGeometry(0.01, 0.11, 0.006), k.p.plasticDark, 0.04, 0.27, 0.058, 0, 0, -1.2);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      f.box(k.p.plasticDark, 0.008, 0.02, 0.004, Math.sin(a) * 0.18, 0.24 + Math.cos(a) * 0.18 - 0.01, 0.058, 0, 0, -a);
    }
  });
}

/** 书架：只用三种书脊颜色（少一些网格），沿用 bookshelf 的结构 */
function buildShelf(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "shelf", (k) => {
    const f = new Frame(k.kit, HX - 0.22, 0, -3.15, -Math.PI / 2);
    const w = 1.6;
    const h = 2.3;
    const rows = 5;
    const tones = [k.p.books[1], k.p.books[2], k.p.books[6]];
    f.box(k.m.woodDark, 0.05, h, 0.34, -w / 2 + 0.025, 0, 0, 0.008);
    f.box(k.m.woodDark, 0.05, h, 0.34, w / 2 - 0.025, 0, 0, 0.008);
    f.box(k.m.woodDark, w, h, 0.02, 0, 0, -0.16, 0.006);
    f.box(k.m.wood, w, 0.05, 0.36, 0, h, 0, 0.01);
    const gap = (h - 0.1) / rows;
    for (let r = 0; r <= rows; r++) f.box(k.m.wood, w - 0.08, 0.035, 0.32, 0, 0.05 + r * gap, 0, 0.008);
    let seed = 7;
    const rnd = (): number => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let r = 0; r < rows; r++) {
      let x = -w / 2 + 0.08;
      while (x < w / 2 - 0.12) {
        const bw = 0.03 + rnd() * 0.035;
        const bh = gap * (0.55 + rnd() * 0.38);
        if (rnd() > 0.08) f.box(tones[Math.floor(rnd() * tones.length)], bw, bh, 0.22, x + bw / 2, 0.085 + r * gap, 0.01, 0.004);
        x += bw + 0.004;
      }
    }
  });
}

function buildPlants(kit: SceneKit): THREE.Group {
  const g = pieceGroup(kit, "plants", (k) => {
    for (const [x, z] of [
      [-4.8, 3.2],
      [4.85, 3.2],
    ] as Array<[number, number]>) {
      const f = new Frame(k.kit, x, 0, z);
      f.cyl(k.p.ceramic, 0.3, 0.22, 0.48, 0, 0, 0, 20);
      f.cyl(k.m.soil, 0.27, 0.27, 0.04, 0, 0.46, 0, 18);
    }
  });
  const a = createBush(1.35, kit.detail);
  a.position.set(-4.8, 0.46, 3.2);
  const b = createBush(1.05, kit.detail);
  b.position.set(4.85, 0.46, 3.2);
  g.add(a, b);
  return g;
}

/** 左墙上的软木板：贴满了社团的便条 */
function buildNotice(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "notice", (k) => {
    const cork = std(0xb58b5a, 1);
    const wf = new Frame(k.kit, -HX + 0.03, 1.15, -0.4, Math.PI / 2);
    wf.box(k.m.woodDark, 1.5, 1.0, 0.04, 0, 0, 0, 0.008);
    wf.box(cork, 1.4, 0.9, 0.02, 0, 0.05, 0.02, 0.004);
    const notes: Array<[number, number, number, number]> = [
      [-0.45, 0.65, 0.3, 0.4],
      [-0.05, 0.55, 0.32, 0.36],
      [0.38, 0.62, 0.34, 0.42],
      [-0.3, 0.2, 0.4, 0.28],
      [0.2, 0.17, 0.3, 0.3],
      [0.55, 0.2, 0.2, 0.26],
    ];
    notes.forEach(([x, y, w, h], i) => {
      wf.box(i % 2 ? k.p.fabricCream : k.m.paper, w, h, 0.004, x - 0.1, y, 0.03, 0, 0, 0, (i - 2.5) * 0.04);
      wf.ball(k.p.fabricRed, 0.014, x - 0.1, y + h - 0.03, 0.04);
    });
  });
}

function buildLamps(kit: SceneKit): THREE.Group {
  const g = pieceGroup(kit, "lamps", (k) => {
    for (const x of [-1.5, 0, 1.5]) {
      const f = new Frame(k.kit, x, 0, -0.25);
      f.strut(k.m.darkSteel, [0, H, 0], [0, 2.4, 0], 0.006, 5);
      f.cyl(k.m.darkSteel, 0.07, 0.3, 0.26, 0, 2.18, 0, 20);
      f.ball(k.m.lampGlass, 0.07, 0, 2.2, 0);
    }
  });
  noCast(g);
  return g;
}

function buildCeiling(): THREE.Group {
  const g = new THREE.Group();
  g.name = "ceiling";
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(W + 2 * T, 0.2, D + 2 * T), makePlaster());
  mesh.position.set(0, H + 0.1, 0);
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  g.add(mesh);
  return g;
}

export function buildClubRoom(kit: SceneKit): THREE.Group {
  kit = interiorKit(kit);
  const root = new THREE.Group();
  root.name = "stage-clubRoom";
  const plaster = makePlaster();
  root.add(buildFloor(kit), buildWallBack(kit), buildWindow(kit));
  root.add(pieceGroup(kit, "wall_left", (k) => new Frame(k.kit).box(plaster, T, H, D + 2 * T, -HX - T / 2, 0, 0, 0.006)));
  root.add(pieceGroup(kit, "wall_right", (k) => new Frame(k.kit).box(plaster, T, H, D + 2 * T, HX + T / 2, 0, 0, 0.006)));
  // 前墙是一张朝向室内的单面平面：从房间外面看它被背面剔除、完全透明，跟随相机可以退到墙外
  const front = pieceGroup(kit, "wall_front", (k) => new Frame(k.kit).put(new THREE.PlaneGeometry(W, H), makePlaster(), 0, H / 2, HZ, 0, Math.PI, 0));
  noCast(front);
  root.add(front, buildCeiling());
  root.add(buildCourtyardGround(kit), buildCourtyardPath(kit), buildBenches(kit), buildLibrary(kit));
  root.add(treePiece("tree_a", 3.7, -7.4, 1.27, 0.4, kit), treePiece("tree_b", 6.9, -11.5, 1.52, 2.1, kit), treePiece("tree_c", 1.5, -18, 1.73, 4.0, kit), treePiece("tree_d", -9.4, -9.2, 1.41, 1.0, kit));
  root.add(buildSunlight());
  root.add(buildTable(kit), buildChairs(kit), buildBasket(kit), buildBoard(kit), buildPlan(kit), buildClock(kit), buildShelf(kit), buildPlants(kit), buildNotice(kit), buildLamps(kit));
  return root;
}

export const CLUB_ROOM: StageDef = {
  name: "clubRoom",
  targets: TARGETS,
  bounds: { minX: -HX + 0.6, maxX: HX - 0.6, minZ: -HZ + 0.9, maxZ: HZ - 0.6 },
  cameraBounds: { minX: -HX + 0.4, maxX: HX - 0.4, minZ: -HZ + 0.5, maxZ: HZ + 4.6 },
  spawn: { x: -2.6, y: 0, z: 2.6, yaw: Math.PI },
  slots: {
    table: [
      { x: -1.9, y: 0.76, z: -0.25 },
      { x: -1.0, y: 0.76, z: -0.25 },
      { x: 0, y: 0.76, z: -0.25 },
      { x: 1.0, y: 0.76, z: -0.25 },
      { x: 1.9, y: 0.76, z: -0.25 },
    ],
    hover: [
      { x: -3.2, y: 1.4, z: 1.2 },
      { x: 3.2, y: 1.4, z: 1.4 },
      { x: -3.6, y: 1.5, z: -1.8 },
      { x: 0, y: 1.8, z: 1.8 },
    ],
    floor: [
      { x: -4.2, y: 0, z: -2.8 },
      { x: 3.6, y: 0, z: 2.2 },
    ],
  },
  shots: [
    { from: { x: -4.3, y: 1.9, z: 3.2 }, to: { x: -3.4, y: 1.8, z: 2.6 }, look: { x: 0.6, y: 1.0, z: -0.6 }, duration: 10, move: "dolly" },
    { from: { x: 4.4, y: 1.7, z: 3.0 }, to: { x: 3.6, y: 1.7, z: 2.4 }, look: { x: -0.6, y: 1.0, z: -0.8 }, duration: 10, move: "dolly" },
    { from: { x: 0, y: 1.5, z: 3.4 }, to: { x: 0, y: 1.3, z: 2.0 }, look: { x: 0, y: 1.0, z: -0.8 }, duration: 9, move: "push", fov: 40 },
  ],
  environment: {
    fogColor: 0xe6cfa6,
    fogDensity: 0.016,
    skyTop: 0x9fb8d6,
    skyMid: 0xf1d7ab,
    skyBot: 0x6b5a46,
    sunColor: 0xffc98a,
    sunDir: { x: CLUB_SUN_DIR.x, y: CLUB_SUN_DIR.y, z: CLUB_SUN_DIR.z },
    sunIntensity: 3.1,
    hemiSky: 0xbac8dc,
    hemiGround: 0x6e5a44,
    hemiIntensity: 1.0,
    envIntensity: 0.85,
    shadowRadius: 10,
  },
  build: buildClubRoom,
};
