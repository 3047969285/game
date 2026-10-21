import { floorJoints, studyNotebook } from "./studyDetails";
import * as THREE from "three";
import { interiorKit, interiorPlaster, interiorWood } from "./interiorMaterials";
import { chair, board, bookshelf, table, windowPane, Frame, type SceneKit } from "../../world/sceneProps";
import { pieceGroup, type StageDef } from "./types";

/**
 * 通用舞台“emptyRoom”：一间无名的教室——地面、四面墙、一扇大窗、长桌与椅子、黑板、书架、落地灯、盆栽。
 * autoScript 用它跑通所有没有手写舞台的回忆段落。
 * 单位：米。房间 11 × 9，墙高 3.4；z = -4.5 为窗墙（太阳从窗外照进来）。
 */

const W = 11;
const D = 9;
const H = 3.4;
const T = 0.2;
const HX = W / 2;
const HZ = D / 2;

const TARGETS = {
  floor: "rise",
  wall_back: "rise",
  wall_left: "rise",
  wall_right: "rise",
  wall_front: "rise",
  window: "fade",
  table: "rise",
  chairs: "rise",
  board: "rise",
  shelf: "rise",
  lamp: "fade",
  plant: "grow",
} as const;

export const EMPTY_ROOM_TARGETS = Object.keys(TARGETS);

/** 素净的暖灰泥墙：程序化灰泥表面，污渍与磨损压得很轻，不出现壁纸似的花纹 */
export function makePlaster(side: THREE.Side = THREE.FrontSide): THREE.MeshStandardMaterial {
  return interiorPlaster(side);
}

function buildFloor(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "floor", (k) => {
    const f = new Frame(k.kit);
    // 木地板（程序化木纹）、涂白的踢脚线、一块低饱和的灰褐色地毯
    const boards = interiorWood(0xa38159,.74);
    const skirting = new THREE.MeshStandardMaterial({ color: 0xd9cfbc, roughness: 0.8, metalness: 0 });
    const rug = new THREE.MeshStandardMaterial({ color: 0x8b8173, roughness: 1, metalness: 0, side: THREE.DoubleSide });
    const rugEdge = new THREE.MeshStandardMaterial({ color: 0x766d61, roughness: 1, metalness: 0, side: THREE.DoubleSide });
    f.box(boards, W + 0.4, 0.12, D + 0.4, 0, -0.12, 0, 0.01);
    floorJoints(k, W, D);
    f.box(skirting, W, 0.12, 0.03, 0, 0, -HZ + 0.015, 0.004);
    f.box(skirting, W, 0.12, 0.03, 0, 0, HZ - 0.015, 0.004);
    f.box(skirting, 0.03, 0.12, D, -HX + 0.015, 0, 0, 0.004);
    f.box(skirting, 0.03, 0.12, D, HX - 0.015, 0, 0, 0.004);
    f.box(rugEdge, 4.8, 0.012, 3.4, 0, 0, -0.8, 0.004);
    f.box(rug, 4.5, 0.016, 3.1, 0, 0, -0.8, 0.004);
  });
}

export function buildEmptyRoom(kit: SceneKit): THREE.Group {
  kit = interiorKit(kit);
  const root = new THREE.Group();
  root.name = "stage-emptyRoom";
  const plaster = makePlaster();

  root.add(buildFloor(kit));

  // 窗墙：窗洞 x∈[-1.8,1.8]，y∈[0.9,2.7]，用四块墙体围出洞口
  root.add(
    pieceGroup(kit, "wall_back", (k) => {
      const f = new Frame(k.kit);
      const z = -HZ - T / 2;
      f.box(plaster, HX - 1.8 + T, H, T, (-HX - 1.8) / 2 - T / 2, 0, z, 0.006);
      f.box(plaster, HX - 1.8 + T, H, T, (HX + 1.8) / 2 + T / 2, 0, z, 0.006);
      f.box(plaster, 3.6, 0.9, T, 0, 0, z, 0.006);
      f.box(plaster, 3.6, H - 2.7, T, 0, 2.7, z, 0.006);
    })
  );
  root.add(
    pieceGroup(kit, "window", (k) => {
      windowPane(k, new Frame(k.kit, 0, 0.9, -HZ, 0), 3.6, 1.8, { cols: 3, rows: 2, lit: false, curtain: true });
    })
  );
  root.add(pieceGroup(kit, "wall_left", (k) => new Frame(k.kit).box(plaster, T, H, D + 2 * T, -HX - T / 2, 0, 0, 0.006)));
  root.add(pieceGroup(kit, "wall_right", (k) => new Frame(k.kit).box(plaster, T, H, D + 2 * T, HX + T / 2, 0, 0, 0.006)));
  // 前墙是一张朝向室内的单面平面（不是 BackSide 盒子：盒子的背面从外面看仍会挡住视线），相机可以退到墙外
  const front = pieceGroup(kit, "wall_front", (k) => new Frame(k.kit).put(new THREE.PlaneGeometry(W, H), makePlaster(), 0, H / 2, HZ, 0, Math.PI, 0));
  front.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = false;
  });
  root.add(front);

  root.add(
    pieceGroup(kit, "table", (k) => {
      table(k, new Frame(k.kit, 0, 0, -0.8), 2.9, 0.95, 0.75);
      for (const x of [-.9,.85]) studyNotebook(k, new Frame(k.kit,x,.75,-.8,x*.1));
      const f = new Frame(k.kit);
      // Cross braces and small metal fasteners ground the tabletop in real joinery.
      f.box(k.m.woodDark, 2.55, .07, .04, 0, .46, -.8, .003);
      for (const x of [-1.2,1.2]) for (const z of [-1.12,-.48]) {
        f.cyl(k.m.steel,.012,.012,.003,x,.683,z,8);
      }
    })
  );
  root.add(
    pieceGroup(kit, "chairs", (k) => {
      // 桌子两侧各三把椅子，面朝桌子
      for (const [i, x] of [-0.95, 0, 0.95].entries()) {
        chair(k, new Frame(k.kit, x, 0, -0.8 + 0.9, Math.PI + (i - 1) * 0.04));
        chair(k, new Frame(k.kit, x, 0, -0.8 - 0.9, 0 + (1 - i) * 0.04));
      }
    })
  );
  root.add(
    pieceGroup(kit, "board", (k) => {
      board(k, new Frame(k.kit, -HX + 0.05, 1.05, 0.2, Math.PI / 2), 2.8, 1.2);
    })
  );
  root.add(
    pieceGroup(kit, "shelf", (k) => {
      bookshelf(k, new Frame(k.kit, HX - 0.22, 0, -1.2, -Math.PI / 2), 2.2, 2.3, 5, 7);
    })
  );
  root.add(
    pieceGroup(kit, "lamp", (k) => {
      const f = new Frame(k.kit, -HX + 0.7, 0, -HZ + 0.7);
      f.cyl(k.m.darkSteel, 0.2, 0.22, 0.04, 0, 0, 0, 20);
      f.cyl(k.m.darkSteel, 0.018, 0.018, 1.55, 0, 0.04, 0, 8);
      f.cyl(k.m.lampGlass, 0.16, 0.26, 0.34, 0, 1.5, 0, 20);
    })
  );
  root.add(
    pieceGroup(kit, "plant", (k) => {
      const f = new Frame(k.kit, HX - 0.8, 0, -HZ + 0.8);
      f.cyl(k.p.ceramic, 0.26, 0.2, 0.42, 0, 0, 0, 18);
      f.cyl(k.m.soil, 0.23, 0.23, 0.04, 0, 0.4, 0, 18);
      // 一丛低模叶片：拉长的椭球斜插
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        const lean = 0.25 + (i % 3) * 0.12;
        const h = 0.7 + (i % 4) * 0.16;
        f.put(new THREE.SphereGeometry(0.1, 8, 6), i % 2 ? k.m.leaf : k.m.leafLight, Math.cos(a) * lean * 0.5, 0.44 + h / 2, Math.sin(a) * lean * 0.5, Math.sin(a) * lean, 0, -Math.cos(a) * lean, 1, h / 0.2, 0.45);
      }
    })
  );
  return root;
}

export const EMPTY_ROOM: StageDef = {
  name: "emptyRoom",
  targets: TARGETS,
  bounds: { minX: -HX + 0.55, maxX: HX - 0.55, minZ: -HZ + 0.7, maxZ: HZ - 0.55 },
  cameraBounds: { minX: -HX + 0.4, maxX: HX - 0.4, minZ: -HZ + 0.5, maxZ: HZ + 4.5 },
  spawn: { x: 0, y: 0, z: 2.3, yaw: Math.PI },
  slots: {
    table: [
      { x: -1.05, y: 0.77, z: -0.55 },
      { x: -0.5, y: 0.77, z: -1.05 },
      { x: 0.05, y: 0.77, z: -0.55 },
      { x: 0.6, y: 0.77, z: -1.05 },
      { x: 1.1, y: 0.77, z: -0.55 },
    ],
    hover: [
      { x: -2.4, y: 1.2, z: 0.6 },
      { x: 2.3, y: 1.35, z: 0.7 },
      { x: -3.1, y: 1.55, z: -1.8 },
      { x: 3.2, y: 1.2, z: -1.9 },
      { x: 0.2, y: 1.9, z: -2.3 },
      { x: -1.3, y: 1.0, z: 1.6 },
      { x: 1.5, y: 1.1, z: 1.7 },
    ],
    floor: [
      { x: -2.2, y: 0, z: 1.8 },
      { x: 2.0, y: 0, z: 2.0 },
    ],
  },
  shots: [
    { from: { x: 0, y: 2.0, z: 3.7 }, to: { x: 0.7, y: 1.85, z: 3.0 }, look: { x: 0, y: 1.1, z: -1.5 }, duration: 9, move: "dolly" },
    { from: { x: -4.2, y: 1.7, z: 2.6 }, to: { x: -3.3, y: 1.7, z: 2.1 }, look: { x: 0.4, y: 1.0, z: -1.0 }, duration: 9, move: "dolly" },
    { from: { x: 4.0, y: 1.8, z: 3.0 }, to: { x: 3.2, y: 1.8, z: 2.4 }, look: { x: -0.4, y: 1.0, z: -1.2 }, duration: 9, move: "dolly" },
    { from: { x: 0, y: 1.6, z: 2.8 }, to: { x: 0, y: 1.4, z: 1.3 }, look: { x: 0, y: 0.95, z: -0.8 }, duration: 8, move: "push", fov: 40 },
    { from: { x: -3.0, y: 2.2, z: 2.2 }, to: { x: 3.0, y: 2.2, z: 2.2 }, look: { x: 0, y: 1.0, z: -0.9 }, duration: 11, move: "orbit" },
    { from: { x: 0, y: 3.0, z: 4.0 }, to: { x: 0, y: 2.7, z: 3.4 }, look: { x: 0, y: 0.8, z: -1.0 }, duration: 9, move: "dolly" },
  ],
  weather: { default: "clear", mode: "window", window: { x: 0, y: 1.8, z: -HZ + 0.06, width: 3.6, height: 1.8 } },
  environment: {
    fogColor: 0x131b2a,
    fogDensity: 0.045,
    skyTop: 0x3a4a68,
    skyMid: 0x7d8aa0,
    skyBot: 0x2a2c34,
    sunColor: 0xf2f6ff,
    sunDir: { x: 0.35, y: 0.62, z: -0.7 },
    sunIntensity: 1.9,
    hemiSky: 0xb6c6de,
    hemiGround: 0x4a505a,
    hemiIntensity: 1.1,
    envIntensity: 1.0,
    shadowRadius: 9,
  },
  build: buildEmptyRoom,
};
