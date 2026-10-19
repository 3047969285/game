import * as THREE from "three";
import { applyKitPattern } from "../../world/kitShader";
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

function buildFloor(kit: SceneKit): THREE.Group {
  return pieceGroup(kit, "floor", (k) => {
    const f = new Frame(k.kit);
    f.box(k.m.wood, W + 0.4, 0.12, D + 0.4, 0, -0.12, 0, 0.01);
    // 踢脚线
    f.box(k.m.woodDark, W, 0.14, 0.04, 0, 0, -HZ + 0.02, 0.006);
    f.box(k.m.woodDark, W, 0.14, 0.04, 0, 0, HZ - 0.02, 0.006);
    f.box(k.m.woodDark, 0.04, 0.14, D, -HX + 0.02, 0, 0, 0.006);
    f.box(k.m.woodDark, 0.04, 0.14, D, HX - 0.02, 0, 0, 0.006);
    // 窗下的一块地毯
    f.box(k.p.fabricRed, 4.6, 0.015, 3.2, 0, 0, -0.8, 0.006);
  });
}

export function buildEmptyRoom(kit: SceneKit): THREE.Group {
  const root = new THREE.Group();
  root.name = "stage-emptyRoom";
  const plaster = new THREE.MeshStandardMaterial({ color: 0xd6cfbf, roughness: 0.93, metalness: 0 });
  applyKitPattern(plaster, "plaster", { grime: 0.6 });

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
  root.add(pieceGroup(kit, "wall_front", (k) => new Frame(k.kit).box(plaster, W, H, T, 0, 0, HZ + T / 2, 0.006)));

  root.add(
    pieceGroup(kit, "table", (k) => {
      table(k, new Frame(k.kit, 0, 0, -0.8), 2.9, 0.95, 0.75);
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
  environment: {
    fogColor: 0x0f1626,
    fogDensity: 0.05,
    skyTop: 0x2a3a5a,
    skyMid: 0x56688a,
    skyBot: 0x1a2030,
    sunColor: 0xffe2b8,
    sunDir: { x: 0.25, y: 0.5, z: -0.85 },
    sunIntensity: 2.6,
    hemiSky: 0x9db4d8,
    hemiGround: 0x3a3228,
    hemiIntensity: 0.9,
    envIntensity: 0.9,
    shadowRadius: 9,
  },
  build: buildEmptyRoom,
};
