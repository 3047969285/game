import * as THREE from "three";
import type { StageDef } from "./types";

/** 空舞台：只有雾和光尘。M1a 的开场占位使用它（黑屏 + 一句系统字幕）。 */
export const VOID_STAGE: StageDef = {
  name: "void",
  showPlayer: false,
  targets: {},
  bounds: { minX: -4, maxX: 4, minZ: -4, maxZ: 4 },
  spawn: { x: 0, y: 0, z: 0, yaw: Math.PI },
  slots: { table: [], hover: [], floor: [] },
  shots: [{ from: { x: 0, y: 1.6, z: 5 }, to: { x: 0, y: 1.6, z: 3.6 }, look: { x: 0, y: 1.6, z: 0 }, duration: 14, move: "dolly" }],
  environment: {
    fogColor: 0x05070c,
    fogDensity: 0.07,
    skyTop: 0x0b1020,
    skyMid: 0x141c30,
    skyBot: 0x05070c,
    sunColor: 0x9db4d8,
    sunDir: { x: 0.3, y: 0.8, z: 0.4 },
    sunIntensity: 0.3,
    hemiSky: 0x6a82ae,
    hemiGround: 0x1a1e28,
    hemiIntensity: 0.4,
    envIntensity: 0.3,
    shadowRadius: 6,
  },
  build: () => {
    const g = new THREE.Group();
    g.name = "stage-void";
    return g;
  },
};
