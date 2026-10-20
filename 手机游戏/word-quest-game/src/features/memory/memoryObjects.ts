import * as THREE from "three";
import { MergedBuilder, boxGeo, cylGeo } from "../world/detailKit";
import { Frame, chair, cup, globe, laptop, monitor, openBook, bookStack, suitcase, type SceneKit } from "../world/sceneProps";

/**
 * 单词即物件：每个词在记忆里是一个能看见、能拿起、能用的实体。
 *  - archetype：外形原型（用 sceneProps 的道具 + 少量新几何拼出，约 30 种）
 *  - verb：触碰时的小动画（glow / open / spin / ring / flip / bloom）
 *  - line：第二人称旁白一句，含该词
 * M1 覆盖单元 1 的 30 个词；其它单元的词先走 memoryObjectFor 的确定性回退，M2/M3 再补手写条目。
 */

export type Verb = "glow" | "open" | "spin" | "ring" | "flip" | "bloom";

export interface MemoryObjectDef {
  archetype: string;
  verb: Verb;
  line: string;
}

type Maker = (k: SceneKit, f: Frame) => void;

interface Archetype {
  build: Maker;
  /** 展示倍率：记忆里的物件比真实尺寸略大，保证在房间尺度下看得清 */
  scale: number;
}

const put = (f: Frame, geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1): void =>
  f.put(geo, mat, x, y, z, rx, ry, rz, sx, sy, sz);

export const ARCHETYPES: Record<string, Archetype> = {
  screen: { build: (k, f) => monitor(k, f, 0.46, 0.28), scale: 1.5 },
  laptop: { build: (k, f) => laptop(k, f), scale: 1.7 },
  phone: {
    build: (k, f) => {
      f.box(k.p.plasticDark, 0.082, 0.165, 0.011, 0, 0.012, 0, 0.008);
      f.box(k.p.plasticDark, 0.07, 0.012, 0.07, 0, 0, -0.03, 0.004, -0.0, 0, 0);
      put(f, new THREE.PlaneGeometry(0.07, 0.146), k.p.screenOn, 0, 0.094, 0.0065);
      for (let i = 0; i < 3; i++) put(f, new THREE.PlaneGeometry(0.052, 0.014), k.p.fabricCream, i % 2 ? 0.006 : -0.006, 0.13 - i * 0.027, 0.0072);
    },
    scale: 2.6,
  },
  cable: {
    build: (k, f) => {
      // 两部手机之间一根细线：connection
      for (const x of [-0.26, 0.26]) {
        f.box(k.p.plasticDark, 0.1, 0.011, 0.17, x, 0, 0, 0.006, 0, x < 0 ? 0.25 : -0.25, 0);
        put(f, new THREE.PlaneGeometry(0.085, 0.145), k.p.screenOn, x, 0.0118, 0, -Math.PI / 2, 0, x < 0 ? 0.25 : -0.25);
        f.box(k.m.brass, 0.02, 0.012, 0.014, x * 0.78, 0.004, 0, 0.002);
      }
      let prev: [number, number, number] = [-0.2, 0.012, 0];
      for (let i = 1; i <= 12; i++) {
        const t = i / 12;
        const next: [number, number, number] = [-0.2 + t * 0.4, 0.012 + Math.sin(t * Math.PI) * 0.07, Math.sin(t * Math.PI * 2) * 0.06];
        f.strut(k.p.fabricBlue, prev, next, 0.007, 6);
        prev = next;
      }
    },
    scale: 1.5,
  },
  phoneRow: {
    build: (k, f) => {
      // 桌上一排手机：一部亮着屏，两部扣着
      for (let i = -1; i <= 1; i++) {
        const p = f.child(i * 0.105, 0, i === 0 ? 0.01 : 0, i * 0.1);
        p.box(k.p.plasticDark, 0.085, 0.011, 0.17, 0, 0, 0, 0.006);
        if (i === 0) put(p, new THREE.PlaneGeometry(0.072, 0.15), k.p.screenOn, 0, 0.0118, 0, -Math.PI / 2);
        else put(p, new THREE.PlaneGeometry(0.072, 0.15), k.p.screenOff, 0, 0.0118, 0, -Math.PI / 2);
      }
    },
    scale: 1.7,
  },
  chatScreen: {
    build: (k, f) => {
      // 立着的小平板，屏幕上是几个对话气泡：message
      f.box(k.p.plasticDark, 0.27, 0.19, 0.012, 0, 0.03, 0, 0.008);
      put(f, new THREE.PlaneGeometry(0.245, 0.165), k.p.screenOff, 0, 0.1225, 0.0066);
      f.strut(k.p.plasticDark, [0, 0.05, -0.006], [0, 0.0, -0.09], 0.01, 5);
      f.box(k.p.plasticDark, 0.12, 0.008, 0.05, 0, 0, -0.1, 0.003);
      f.box(k.p.fabricCream, 0.1, 0.03, 0.003, -0.055, 0.168, 0.0075, 0.01);
      f.box(k.p.screenOn, 0.115, 0.03, 0.003, 0.05, 0.128, 0.0075, 0.01);
      f.box(k.p.fabricCream, 0.07, 0.03, 0.003, -0.075, 0.088, 0.0075, 0.01);
      f.box(k.p.screenOn, 0.08, 0.03, 0.003, 0.07, 0.048, 0.0075, 0.01);
    },
    scale: 1.45,
  },
  topicCard: {
    build: (k, f) => {
      // 小木座上立着一张话题卡，卡面上两个对话气泡：conversation
      f.box(k.m.woodDark, 0.16, 0.03, 0.06, 0, 0, 0, 0.008);
      f.box(k.p.fabricCream, 0.2, 0.15, 0.006, 0, 0.03, 0.0, 0.004);
      put(f, new THREE.SphereGeometry(0.04, 14, 8), k.p.fabricBlue, -0.045, 0.125, 0.005, 0, 0, 0, 1.5, 0.95, 0.12);
      put(f, new THREE.SphereGeometry(0.035, 14, 8), k.p.fabricRed, 0.05, 0.085, 0.005, 0, 0, 0, 1.4, 0.95, 0.12);
      f.box(k.p.printInk, 0.14, 0.008, 0.002, 0, 0.055, 0.004, 0);
      f.box(k.p.printInk, 0.1, 0.008, 0.002, -0.02, 0.04, 0.004, 0);
    },
    scale: 1.7,
  },
  teaPair: {
    build: (k, f) => {
      // 托盘上两只相对的茶杯：converse
      f.box(k.m.woodDark, 0.3, 0.012, 0.18, 0, 0, 0, 0.005);
      cup(k, f.child(-0.08, 0.012, 0, 0.5));
      cup(k, f.child(0.08, 0.012, 0, Math.PI - 0.5));
      f.cyl(k.p.ceramic, 0.026, 0.034, 0.07, 0, 0.012, -0.05, 14);
    },
    scale: 2.0,
  },
  plug: {
    build: (k, f) => {
      f.box(k.m.paper, 0.18, 0.12, 0.05, 0.1, 0, 0, 0.01);
      f.box(k.p.plasticDark, 0.02, 0.03, 0.01, 0.1, 0.04, 0.026, 0.002);
      f.box(k.p.plasticDark, 0.02, 0.03, 0.01, 0.1, 0.07, 0.026, 0.002);
      f.box(k.p.plasticDark, 0.07, 0.05, 0.04, -0.12, 0.035, 0, 0.01);
      f.box(k.m.brass, 0.03, 0.008, 0.012, -0.065, 0.045, 0, 0.002);
      f.box(k.m.brass, 0.03, 0.008, 0.012, -0.065, 0.065, 0, 0.002);
      f.strut(k.p.fabricGrey, [-0.155, 0.06, 0], [-0.25, 0.02, 0.04], 0.01, 6);
      f.strut(k.p.fabricGrey, [-0.25, 0.02, 0.04], [-0.3, 0.012, -0.03], 0.01, 6);
    },
    scale: 2.0,
  },
  bubble: {
    build: (k, f) => {
      put(f, new THREE.SphereGeometry(0.1, 16, 12), k.p.ceramic, -0.06, 0.16, 0, 0, 0, 0, 1.4, 0.9, 0.5);
      put(f, new THREE.ConeGeometry(0.03, 0.06, 4), k.p.ceramic, -0.12, 0.085, 0, 0, 0, Math.PI);
      put(f, new THREE.SphereGeometry(0.08, 16, 12), k.p.fabricBlue, 0.1, 0.1, 0.03, 0, 0, 0, 1.4, 0.9, 0.5);
      put(f, new THREE.ConeGeometry(0.025, 0.05, 4), k.p.fabricBlue, 0.15, 0.045, 0.03, 0, 0, Math.PI);
      for (let i = 0; i < 3; i++) put(f, new THREE.SphereGeometry(0.012, 8, 6), k.p.plasticDark, -0.1 + i * 0.04, 0.16, 0.052);
    },
    scale: 1.8,
  },
  scroll: {
    build: (k, f) => {
      put(f, cylGeo(0.05, 0.05, 0.3, 14), k.m.paper, -0.05, 0.05, 0, 0, 0, Math.PI / 2);
      f.box(k.m.paper, 0.3, 0.004, 0.22, 0.15, 0, 0, 0.001);
      for (let i = 0; i < 4; i++) f.box(k.p.printInk, 0.2 - i * 0.03, 0.002, 0.008, 0.2, 0.004, -0.06 + i * 0.04, 0);
    },
    scale: 1.7,
  },
  gear: {
    build: (k, f) => {
      f.cyl(k.m.brass, 0.12, 0.12, 0.04, 0, 0, 0, 24);
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        f.put(boxGeo(0.05, 0.04, 0.045, 0.006), k.m.brass, Math.cos(a) * 0.14, 0.02, Math.sin(a) * 0.14, 0, -a, 0);
      }
      f.cyl(k.m.darkSteel, 0.04, 0.04, 0.05, 0, 0, 0, 12);
    },
    scale: 2.0,
  },
  lock: {
    build: (k, f) => {
      f.box(k.m.brass, 0.16, 0.13, 0.06, 0, 0, 0, 0.012);
      put(f, new THREE.TorusGeometry(0.05, 0.013, 8, 18, Math.PI), k.m.steel, 0, 0.13, 0);
      f.box(k.m.darkSteel, 0.02, 0.04, 0.012, 0, 0.045, 0.031, 0.004);
    },
    scale: 2.2,
  },
  globe: { build: (k, f) => globe(k, f, 0.16), scale: 1.6 },
  eye: {
    build: (k, f) => {
      f.cyl(k.m.darkSteel, 0.06, 0.08, 0.03, 0, 0, 0, 14);
      put(f, new THREE.SphereGeometry(0.11, 20, 14), k.p.ceramic, 0, 0.15, 0);
      put(f, new THREE.SphereGeometry(0.06, 14, 10), k.p.fabricBlue, 0, 0.15, 0.075, 0, 0, 0, 1, 1, 0.4);
      put(f, new THREE.SphereGeometry(0.028, 10, 8), k.p.plasticDark, 0, 0.15, 0.092, 0, 0, 0, 1, 1, 0.4);
    },
    scale: 1.8,
  },
  cards: {
    build: (k, f) => {
      const tones = [k.p.fabricBlue, k.p.fabricRed, k.p.fabricGreen];
      tones.forEach((tone, i) => {
        const c = f.child(i * 0.045 - 0.04, i * 0.012, i * 0.03 - 0.03, (i - 1) * 0.28);
        c.box(tone, 0.22, 0.008, 0.15, 0, 0, 0, 0.003);
        c.box(k.m.paper, 0.18, 0.002, 0.012, 0, 0.008, -0.03, 0);
        c.box(k.m.paper, 0.12, 0.002, 0.012, -0.03, 0.008, 0, 0);
      });
    },
    scale: 2.0,
  },
  antenna: {
    build: (k, f) => {
      f.cyl(k.m.darkSteel, 0.08, 0.1, 0.03, 0, 0, 0, 14);
      f.cyl(k.m.steel, 0.012, 0.016, 0.26, 0, 0.03, 0, 8);
      put(f, new THREE.SphereGeometry(0.16, 20, 8, 0, Math.PI * 2, 0, Math.PI * 0.4), k.m.steel, 0.02, 0.26, 0.02, -0.7, 0, 0, 1, 0.5, 1);
      f.ball(k.m.lampGlass, 0.02, 0.02, 0.3, 0.1);
    },
    scale: 1.6,
  },
  bottle: {
    build: (k, f) => {
      f.cyl(k.p.leather, 0.05, 0.055, 0.12, 0, 0, 0, 16);
      f.cyl(k.p.leather, 0.022, 0.045, 0.04, 0, 0.12, 0, 16);
      f.cyl(k.m.brass, 0.026, 0.026, 0.025, 0, 0.16, 0, 12);
      f.cyl(k.p.ceramic, 0.056, 0.056, 0.05, 0, 0.03, 0, 16);
    },
    scale: 2.3,
  },
  scales: {
    build: (k, f) => {
      f.cyl(k.m.brass, 0.08, 0.1, 0.02, 0, 0, 0, 16);
      f.cyl(k.m.brass, 0.012, 0.016, 0.3, 0, 0.02, 0, 8);
      f.box(k.m.brass, 0.34, 0.012, 0.018, 0, 0.32, 0, 0.003, 0, 0, 0.12);
      for (const s of [-1, 1] as const) {
        const x = s * 0.17;
        const y = 0.32 + s * 0.02;
        f.strut(k.m.brass, [x, y, 0], [x - 0.05, y - 0.13, 0], 0.003, 4);
        f.strut(k.m.brass, [x, y, 0], [x + 0.05, y - 0.13, 0], 0.003, 4);
        f.cyl(k.m.brass, 0.065, 0.05, 0.012, x, y - 0.145, 0, 16);
      }
    },
    scale: 1.6,
  },
  blocks: {
    build: (k, f) => {
      f.box(k.p.fabricBlue, 0.14, 0.14, 0.14, -0.04, 0, 0, 0.012);
      f.child(0.07, 0.05, 0.02, 0.5).box(k.p.fabricRed, 0.12, 0.12, 0.12, 0, 0, 0, 0.012);
      f.box(k.p.fabricCream, 0.07, 0.07, 0.07, 0.0, 0.14, -0.0, 0.01);
    },
    scale: 2.0,
  },
  podium: {
    build: (k, f) => {
      f.cyl(k.m.stoneWarm, 0.2, 0.22, 0.08, 0, 0, 0, 24);
      f.cyl(k.m.stone, 0.15, 0.17, 0.08, 0, 0.08, 0, 24);
      f.cyl(k.m.stoneWarm, 0.1, 0.12, 0.08, 0, 0.16, 0, 24);
      f.ball(k.m.lampGlass, 0.04, 0, 0.28, 0);
    },
    scale: 1.7,
  },
  funnel: {
    build: (k, f) => {
      f.cyl(k.m.steel, 0.02, 0.02, 0.1, 0, 0, 0, 10);
      f.cyl(k.m.steel, 0.13, 0.02, 0.13, 0, 0.1, 0, 20);
      f.cyl(k.m.darkSteel, 0.135, 0.13, 0.012, 0, 0.228, 0, 20);
      for (let i = 0; i < 4; i++) f.ball(k.m.lampGlass, 0.012, Math.cos(i * 1.7) * 0.05, 0.34 - i * 0.03, Math.sin(i * 1.7) * 0.05);
    },
    scale: 1.9,
  },
  calendar: {
    build: (k, f) => {
      f.box(k.m.paper, 0.26, 0.3, 0.02, 0, 0.02, 0, 0.006);
      f.box(k.p.fabricRed, 0.26, 0.06, 0.024, 0, 0.26, 0, 0.006);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) f.box(c + r === 4 ? k.p.fabricRed : k.p.printInk, 0.03, 0.025, 0.004, -0.09 + c * 0.045, 0.04 + r * 0.045, 0.0115, 0);
      f.box(k.m.woodDark, 0.12, 0.02, 0.1, 0, 0, -0.05, 0.004);
    },
    scale: 1.8,
  },
  sprout: {
    build: (k, f) => {
      f.cyl(k.p.ceramic, 0.07, 0.05, 0.1, 0, 0, 0, 16);
      f.cyl(k.m.soil, 0.062, 0.062, 0.012, 0, 0.09, 0, 14);
      f.strut(k.m.leaf, [0, 0.1, 0], [0, 0.22, 0], 0.006, 5);
      put(f, new THREE.SphereGeometry(0.05, 10, 8), k.m.leafLight, -0.05, 0.24, 0, 0, 0, 0.5, 1.4, 0.35, 0.8);
      put(f, new THREE.SphereGeometry(0.05, 10, 8), k.m.leaf, 0.05, 0.25, 0, 0, 0, -0.5, 1.4, 0.35, 0.8);
    },
    scale: 2.2,
  },
  letter: {
    build: (k, f) => {
      f.box(k.p.fabricCream, 0.3, 0.012, 0.2, 0, 0, 0, 0.003);
      f.box(k.m.paper, 0.26, 0.006, 0.01, 0, 0.012, 0.0, 0);
      put(f, new THREE.ConeGeometry(0.15, 0.1, 3), k.p.fabricCream, 0, 0.012, -0.04, 0, 0, 0, 1, 0.1, 1.0);
      f.ball(k.p.fabricRed, 0.026, 0, 0.02, 0.015, 1, 0.4, 1);
    },
    scale: 1.6,
  },
  emptyChair: { build: (k, f) => chair(k, f), scale: 0.85 },
  megaphone: {
    build: (k, f) => {
      put(f, cylGeo(0.15, 0.04, 0.26, 20), k.p.fabricRed, 0, 0.16, 0.08, Math.PI / 2, 0, 0);
      f.box(k.p.plasticDark, 0.05, 0.1, 0.06, 0, 0, -0.04, 0.01);
      f.cyl(k.m.steel, 0.045, 0.045, 0.03, 0, 0.14, -0.06, 14);
    },
    scale: 1.8,
  },
  clock: {
    build: (k, f) => {
      put(f, cylGeo(0.12, 0.12, 0.05, 28), k.m.brass, 0, 0.15, 0, Math.PI / 2);
      put(f, cylGeo(0.1, 0.1, 0.01, 28), k.p.fabricCream, 0, 0.15, 0.027, Math.PI / 2);
      for (const s of [-1, 1] as const) f.ball(k.m.brass, 0.04, s * 0.07, 0.28, 0, 1, 0.6, 1);
      f.box(k.p.plasticDark, 0.008, 0.07, 0.006, 0, 0.15, 0.036, 0.001);
      put(f, boxGeo(0.008, 0.05, 0.006, 0.001), k.p.plasticDark, 0.02, 0.165, 0.037, 0, 0, -1.0);
      f.cyl(k.m.brass, 0.012, 0.012, 0.04, -0.08, 0, 0.01, 8);
      f.cyl(k.m.brass, 0.012, 0.012, 0.04, 0.08, 0, 0.01, 8);
    },
    scale: 1.9,
  },
  cup: { build: (k, f) => cup(k, f), scale: 3.0 },
  hourglass: {
    build: (k, f) => {
      f.cyl(k.m.woodDark, 0.09, 0.09, 0.02, 0, 0, 0, 16);
      f.cyl(k.m.woodDark, 0.09, 0.09, 0.02, 0, 0.28, 0, 16);
      f.cyl(k.m.glass, 0.075, 0.008, 0.12, 0, 0.16, 0, 16);
      f.cyl(k.m.glass, 0.008, 0.075, 0.12, 0, 0.02, 0, 16);
      f.cyl(k.m.lampGlass, 0.05, 0.05, 0.03, 0, 0.02, 0, 12);
      for (const a of [0, 1, 2]) f.cyl(k.m.woodDark, 0.007, 0.007, 0.26, Math.cos(a * 2.09) * 0.075, 0.02, Math.sin(a * 2.09) * 0.075, 6);
    },
    scale: 1.7,
  },
  suitcase: { build: (k, f) => suitcase(k, f, 0.4, 0.5, 0.2), scale: 1.0 },
  flask: {
    build: (k, f) => {
      const profile = [new THREE.Vector2(0.001, 0), new THREE.Vector2(0.1, 0), new THREE.Vector2(0.11, 0.01), new THREE.Vector2(0.05, 0.16), new THREE.Vector2(0.03, 0.22), new THREE.Vector2(0.034, 0.26)];
      put(f, new THREE.LatheGeometry(profile, 20), k.m.glass, 0, 0.0, 0);
      put(f, new THREE.CylinderGeometry(0.075, 0.095, 0.07, 18), k.p.fabricGreen, 0, 0.045, 0);
      f.ball(k.m.lampGlass, 0.018, 0.02, 0.1, 0.0);
    },
    scale: 1.9,
  },
  compass: {
    build: (k, f) => {
      f.cyl(k.m.brass, 0.13, 0.13, 0.035, 0, 0, 0, 28);
      f.cyl(k.p.fabricCream, 0.108, 0.108, 0.01, 0, 0.032, 0, 28);
      f.put(new THREE.TorusGeometry(0.115, 0.008, 6, 32), k.m.brass, 0, 0.037, 0, Math.PI / 2);
      f.put(new THREE.ConeGeometry(0.018, 0.09, 4), k.p.fabricRed, 0, 0.047, -0.05, Math.PI / 2, 0, 0);
      f.put(new THREE.ConeGeometry(0.018, 0.09, 4), k.p.fabricCream, 0, 0.047, 0.05, -Math.PI / 2, 0, 0);
      f.ball(k.m.brass, 0.012, 0, 0.052, 0);
    },
    scale: 2.0,
  },
  book: { build: (k, f) => openBook(k, f), scale: 1.6 },
  books: { build: (k, f) => bookStack(k, f, 4, 5), scale: 1.8 },
  lamp: {
    build: (k, f) => {
      f.cyl(k.m.darkSteel, 0.07, 0.08, 0.02, 0, 0, 0, 16);
      f.strut(k.m.darkSteel, [0, 0.02, 0], [0.04, 0.2, 0], 0.007, 6);
      f.strut(k.m.darkSteel, [0.04, 0.2, 0], [-0.04, 0.3, 0], 0.007, 6);
      f.cyl(k.m.lampGlass, 0.07, 0.03, 0.09, -0.06, 0.24, 0, 16);
    },
    scale: 1.9,
  },
};

const E = (archetype: string, verb: Verb, line: string): MemoryObjectDef => ({ archetype, verb, line });

/**
 * 单元 1《数字时代》30 词 → 物件。每条旁白是第二人称的一句话，自然地用到这个词（词形可以变化）。
 * 物件都是桌上 / 手边能拿起的东西，不贴字。
 */
export const MEMORY_OBJECTS: Record<string, MemoryObjectDef> = {
  rw3_unit01_01: E("screen", "glow", "You watch the digital screen glow, soft and always on."),
  rw3_unit01_02: E("cable", "glow", "You follow the thin cable between two phones, the one connection you can see."),
  rw3_unit01_03: E("topicCard", "bloom", "You read the topic on the card and wait for the conversation to begin."),
  rw3_unit01_04: E("phone", "ring", "Another notification lights up your phone."),
  rw3_unit01_05: E("scroll", "open", "You scroll and scroll until the whole evening unrolls."),
  rw3_unit01_06: E("gear", "spin", "You feel an algorithm quietly choosing for you."),
  rw3_unit01_07: E("lock", "flip", "You lock your privacy behind a dozen tiny settings."),
  rw3_unit01_08: E("globe", "spin", "You turn the little globe, and a virtual world spins with it."),
  rw3_unit01_09: E("eye", "bloom", "Wherever your attention goes, the day follows."),
  rw3_unit01_10: E("plug", "flip", "You pull the plug and go offline, and the room breathes."),
  rw3_unit01_11: E("cards", "flip", "You try to multitask, with three cards held in one hand."),
  rw3_unit01_12: E("antenna", "ring", "You hear the cyber world hum on its tall antenna."),
  rw3_unit01_13: E("phoneRow", "glow", "You line up every device on the table, and one is still glowing."),
  rw3_unit01_14: E("bottle", "flip", "You turn the little brown bottle and think about addiction."),
  rw3_unit01_15: E("scales", "ring", "You look for balance, a little here and a little there."),
  rw3_unit01_16: E("blocks", "flip", "You fit two blocks together, and that is what interaction feels like."),
  rw3_unit01_17: E("podium", "bloom", "You step onto the platform, and suddenly everyone can see you."),
  rw3_unit01_18: E("funnel", "spin", "You filter the noise, and only a little of the world gets through."),
  rw3_unit01_19: E("calendar", "flip", "You colour in one more square, because a habit is built day by day."),
  rw3_unit01_20: E("sprout", "bloom", "You stay mindful, and something small begins to grow."),
  rw3_unit01_21: E("chatScreen", "open", "You open a short message and read it twice."),
  rw3_unit01_22: E("emptyChair", "glow", "You look at the empty chair and feel a little lonely."),
  rw3_unit01_23: E("megaphone", "ring", "You lift the megaphone, because good communication needs a voice and an ear."),
  rw3_unit01_24: E("clock", "ring", "You feel anxious as the clock keeps ticking."),
  rw3_unit01_25: E("cup", "glow", "You carry the cup carefully, so the tea stays warm."),
  rw3_unit01_26: E("hourglass", "flip", "You turn the hourglass to begin another session."),
  rw3_unit01_27: E("teaPair", "bloom", "You sit down to converse, and the tea slowly cools."),
  rw3_unit01_28: E("suitcase", "open", "You pack the bag the night before, and readiness feels like a closed zip."),
  rw3_unit01_29: E("flask", "glow", "You watch the experiment bubble away, green and uncertain."),
  rw3_unit01_30: E("compass", "spin", "You follow the needle, because purpose always points somewhere."),
};

/** 其它单元（M3 之前）用的通用原型池 */
const GENERIC_ARCHETYPES = ["book", "books", "lamp", "globe", "cup", "letter", "clock", "compass", "sprout", "lock", "hourglass", "calendar", "scroll", "blocks", "scales", "podium"] as const;
const GENERIC_VERBS: Verb[] = ["glow", "open", "spin", "ring", "flip", "bloom"];

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 词 → 物件定义：有手写条目用手写，否则按词 id 确定性回退（同一个词永远得到同一个物件） */
export function memoryObjectFor(wordId: string, word?: string): MemoryObjectDef {
  const hit = MEMORY_OBJECTS[wordId];
  if (hit) return hit;
  const h = hashString(wordId);
  const shown = word ?? "this";
  return {
    archetype: GENERIC_ARCHETYPES[h % GENERIC_ARCHETYPES.length],
    verb: GENERIC_VERBS[(h >>> 4) % GENERIC_VERBS.length],
    line: `The memory settles around the word ${shown}.`,
  };
}

/**
 * 搭出一个词的物件。原点在物件底面中心，已按原型的展示倍率放大；
 * group.name = `word:${wordId}`，供 Materializer 注册。
 */
export function buildWordObject(wordId: string, kit: SceneKit, archetype?: string, word?: string): THREE.Group {
  const def = memoryObjectFor(wordId, word);
  const name = archetype && ARCHETYPES[archetype] ? archetype : ARCHETYPES[def.archetype] ? def.archetype : "book";
  const arch = ARCHETYPES[name];
  const pk: SceneKit = { ...kit, kit: new MergedBuilder() };
  arch.build(pk, new Frame(pk.kit));
  const group = new THREE.Group();
  group.name = `word:${wordId}`;
  pk.kit.build(group, `word-${name}`);
  group.scale.setScalar(arch.scale);
  group.userData.wordId = wordId;
  group.userData.archetype = name;
  group.userData.verb = def.verb;
  return group;
}

export interface VerbPose {
  rotX: number;
  rotY: number;
  rotZ: number;
  /** 相对基准缩放的倍率 */
  scale: number;
  lift: number;
}

/** 触碰动画：t∈[0,1] → 相对基准姿态的偏移。纯函数，便于测试 */
export function verbPose(verb: Verb, t: number): VerbPose {
  const x = Math.min(1, Math.max(0, t));
  const e = x * x * (3 - 2 * x);
  const hump = Math.sin(x * Math.PI);
  const pose: VerbPose = { rotX: 0, rotY: 0, rotZ: 0, scale: 1, lift: 0 };
  switch (verb) {
    case "glow":
      pose.scale = 1 + 0.14 * hump;
      pose.lift = 0.05 * hump;
      break;
    case "open":
      pose.rotX = -0.55 * hump;
      pose.lift = 0.12 * hump;
      pose.scale = 1 + 0.08 * hump;
      break;
    case "spin":
      pose.rotY = Math.PI * 2 * e;
      pose.lift = 0.08 * hump;
      break;
    case "ring":
      pose.rotZ = Math.sin(x * Math.PI * 7) * 0.22 * (1 - x);
      pose.scale = 1 + 0.06 * hump;
      break;
    case "flip":
      pose.rotX = Math.PI * 2 * e;
      pose.lift = 0.18 * hump;
      break;
    case "bloom":
      pose.scale = 1 + 0.28 * hump + 0.06 * Math.sin(x * Math.PI * 3) * (1 - x);
      pose.lift = 0.08 * hump;
      break;
  }
  return pose;
}
