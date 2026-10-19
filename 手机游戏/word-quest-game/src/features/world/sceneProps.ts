import { getFoliageMaterial, shrubCardGeometries } from "./props";
import * as THREE from "three";
import { MergedBuilder, boxGeo, createKitMaterials, cylGeo, gableGeo, strutGeo, type KitMaterials } from "./detailKit";

/**
 * 场景道具库：长椅、桌椅、书架、黑板、屏幕、讲台、花坛、栏杆、台阶、遮阳篷……
 * 全部用真实米制尺寸建模，通过 Frame 放到场景里（可带朝向与整体缩放）。
 * 所有道具写进同一个 MergedBuilder，场景最后一次 build() 成少量网格。
 */

export interface PropMaterials {
  books: THREE.MeshStandardMaterial[];
  fabricRed: THREE.MeshStandardMaterial;
  fabricBlue: THREE.MeshStandardMaterial;
  fabricGreen: THREE.MeshStandardMaterial;
  fabricGrey: THREE.MeshStandardMaterial;
  fabricCream: THREE.MeshStandardMaterial;
  screenOn: THREE.MeshStandardMaterial;
  screenOff: THREE.MeshStandardMaterial;
  boardGreen: THREE.MeshStandardMaterial;
  boardWhite: THREE.MeshStandardMaterial;
  ceramic: THREE.MeshStandardMaterial;
  leather: THREE.MeshStandardMaterial;
  plasticDark: THREE.MeshStandardMaterial;
  water: THREE.MeshStandardMaterial;
  canvasOlive: THREE.MeshStandardMaterial;
}

export interface SceneKit {
  kit: MergedBuilder;
  m: KitMaterials;
  p: PropMaterials;
}

export function createSceneKit(): SceneKit {
  const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}) => {
    const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    mat.fog = false;
    return mat;
  };
  const bookTones = [0x9b3d3a, 0x2f5d8a, 0x3f7a4f, 0xc79a3a, 0x6a4a8a, 0xd8d0b8, 0x7a5a3a, 0x2d3a46];
  return {
    kit: new MergedBuilder(),
    m: createKitMaterials(),
    p: {
      books: bookTones.map((c) => std(c, 0.82)),
      fabricRed: std(0xb04a40, 0.95, 0, { side: THREE.DoubleSide }),
      fabricBlue: std(0x3b5f8f, 0.95, 0, { side: THREE.DoubleSide }),
      fabricGreen: std(0x4d7a55, 0.95, 0, { side: THREE.DoubleSide }),
      fabricGrey: std(0x7d848c, 0.95, 0, { side: THREE.DoubleSide }),
      fabricCream: std(0xe8dec6, 0.95, 0, { side: THREE.DoubleSide }),
      screenOn: std(0x7ad4d0, 0.3, 0.1, { emissive: 0x1f9aa0, emissiveIntensity: 0.7 }),
      screenOff: std(0x14191e, 0.2, 0.4),
      boardGreen: std(0x2f4a3f, 0.9),
      boardWhite: std(0xf0efe8, 0.6),
      ceramic: std(0xf1ece2, 0.35),
      leather: std(0x5a3a28, 0.7, 0.05),
      plasticDark: std(0x20262b, 0.45, 0.2),
      water: std(0x2f6e7c, 0.45, 0.05, { transparent: true, opacity: 0.94, envMapIntensity: 0.3 }),
      canvasOlive: std(0x7f8f6a, 0.95, 0, { side: THREE.DoubleSide }),
    },
  };
}

const _t = new THREE.Matrix4();
const _r = new THREE.Matrix4();
const _s = new THREE.Matrix4();
const _e = new THREE.Euler();

/**
 * 局部坐标系：原点在地面 (x,y,z)，朝向 ry（绕 Y），整体缩放 s。
 * put() 的局部坐标单位为"米"，经 s 放大后写入合并构建器。
 */
export class Frame {
  constructor(
    public readonly kit: MergedBuilder,
    public readonly x = 0,
    public readonly y = 0,
    public readonly z = 0,
    public readonly ry = 0,
    public readonly s = 1,
    private readonly base: THREE.Matrix4 = new THREE.Matrix4()
  ) {
    this.base = new THREE.Matrix4()
      .makeTranslation(x, y, z)
      .multiply(new THREE.Matrix4().makeRotationY(ry))
      .multiply(new THREE.Matrix4().makeScale(s, s, s));
  }

  /** 以局部偏移 / 朝向生成子坐标系 */
  child(lx: number, ly: number, lz: number, localRy = 0): Frame {
    const f = new Frame(this.kit, 0, 0, 0, 0, 1);
    (f as unknown as { base: THREE.Matrix4 }).base = this.base
      .clone()
      .multiply(_t.makeTranslation(lx, ly, lz))
      .multiply(_r.makeRotationY(localRy));
    return f;
  }

  put(geo: THREE.BufferGeometry, mat: THREE.Material, lx = 0, ly = 0, lz = 0, rx = 0, rry = 0, rz = 0, sx = 1, sy = 1, sz = 1): void {
    _e.set(rx, rry, rz);
    const m = this.base
      .clone()
      .multiply(_t.makeTranslation(lx, ly, lz))
      .multiply(_r.makeRotationFromEuler(_e))
      .multiply(_s.makeScale(sx, sy, sz));
    this.kit.addMatrix(geo, mat, m);
  }

  /** 倒角方块，底面在局部 y */
  box(mat: THREE.Material, w: number, h: number, d: number, lx: number, ly: number, lz: number, radius = 0.02, rx = 0, rry = 0, rz = 0): void {
    this.put(boxGeo(w, h, d, radius), mat, lx, ly + h / 2, lz, rx, rry, rz);
  }

  /** 圆台 / 圆柱，底面在局部 y */
  cyl(mat: THREE.Material, rTop: number, rBottom: number, h: number, lx: number, ly: number, lz: number, radial = 20): void {
    this.put(cylGeo(rTop, rBottom, h, radial), mat, lx, ly + h / 2, lz);
  }

  strut(mat: THREE.Material, a: [number, number, number], b: [number, number, number], r: number, radial = 6): void {
    this.put(strutGeo(a, b, r, radial), mat);
  }

  ball(mat: THREE.Material, r: number, lx: number, ly: number, lz: number, sx = 1, sy = 1, sz = 1): void {
    this.put(new THREE.SphereGeometry(r, 14, 10), mat, lx, ly, lz, 0, 0, 0, sx, sy, sz);
  }
}

// ───────────────────────── 家具 ─────────────────────────

/** 公园长椅：木条座面 + 靠背 + 铸铁侧板 + 扶手 */
export function bench(k: SceneKit, f: Frame, length = 1.8): void {
  const { m } = k;
  for (let i = 0; i < 4; i++) f.box(m.wood, length, 0.035, 0.085, 0, 0.44, -0.18 + i * 0.1, 0.008);
  for (let i = 0; i < 3; i++) f.box(m.wood, length, 0.08, 0.03, 0, 0.62 + i * 0.12, -0.27 - i * 0.02, 0.008, -0.12);
  for (const s of [-1, 1]) {
    const x = (s * (length - 0.12)) / 2;
    f.box(m.darkSteel, 0.05, 0.44, 0.5, x, 0, -0.04, 0.01);
    f.box(m.darkSteel, 0.05, 0.05, 0.5, x, 0.58, -0.04, 0.01);
    f.box(m.darkSteel, 0.05, 0.38, 0.05, x, 0.4, -0.27, 0.01, -0.12);
  }
}

/** 椅子：座面 + 靠背 + 四条细腿 */
export function chair(k: SceneKit, f: Frame, seat = k.m.wood): void {
  const { m } = k;
  f.box(seat, 0.42, 0.04, 0.42, 0, 0.44, 0, 0.01);
  f.box(seat, 0.42, 0.34, 0.03, 0, 0.5, -0.2, 0.01, -0.08);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) f.cyl(m.woodDark, 0.018, 0.022, 0.44, sx * 0.18, 0, sz * 0.18, 8);
  f.box(m.woodDark, 0.38, 0.02, 0.02, 0, 0.18, 0.18, 0.005);
}

/** 圆凳 */
export function stool(k: SceneKit, f: Frame, h = 0.46): void {
  f.cyl(k.m.wood, 0.17, 0.17, 0.04, 0, h - 0.04, 0, 20);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    f.strut(k.m.woodDark, [Math.cos(a) * 0.13, h - 0.04, Math.sin(a) * 0.13], [Math.cos(a) * 0.2, 0, Math.sin(a) * 0.2], 0.018, 6);
  }
}

/** 桌子：圆角桌面 + 四腿 */
export function table(k: SceneKit, f: Frame, w = 1.4, d = 0.8, h = 0.75, top = k.m.wood): void {
  f.box(top, w, 0.045, d, 0, h - 0.045, 0, 0.012);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) f.box(k.m.woodDark, 0.06, h - 0.045, 0.06, sx * (w / 2 - 0.08), 0, sz * (d / 2 - 0.08), 0.01);
  f.box(k.m.woodDark, w - 0.2, 0.05, 0.03, 0, h - 0.13, d / 2 - 0.08, 0.008);
}

/** 圆桌 */
export function roundTable(k: SceneKit, f: Frame, r = 0.6, h = 0.74): void {
  f.cyl(k.m.wood, r, r, 0.04, 0, h - 0.04, 0, 36);
  f.cyl(k.m.woodDark, 0.05, 0.07, h - 0.04, 0, 0, 0, 12);
  f.cyl(k.m.woodDark, 0.28, 0.3, 0.04, 0, 0, 0, 20);
}

/** 带抽屉的书桌 */
export function desk(k: SceneKit, f: Frame, w = 1.5, d = 0.75, h = 0.75): void {
  const { m } = k;
  f.box(m.wood, w, 0.04, d, 0, h - 0.04, 0, 0.012);
  f.box(m.woodDark, 0.04, h - 0.04, d - 0.06, -w / 2 + 0.05, 0, 0, 0.008);
  f.box(m.woodDark, 0.5, h - 0.04, d - 0.06, w / 2 - 0.3, 0, 0, 0.008);
  for (let i = 0; i < 3; i++) {
    f.box(m.wood, 0.44, 0.17, 0.02, w / 2 - 0.3, 0.06 + i * 0.21, d / 2 - 0.02, 0.006);
    f.box(m.brass, 0.1, 0.014, 0.014, w / 2 - 0.3, 0.14 + i * 0.21, d / 2 + 0.005, 0.004);
  }
}

/** 书架：外框 + 层板 + 随机高度颜色的书 */
export function bookshelf(k: SceneKit, f: Frame, w = 2.2, h = 2.4, rows = 5, seed = 1): void {
  const { m, p } = k;
  const rand = mulberry(seed);
  f.box(m.woodDark, 0.05, h, 0.34, -w / 2 + 0.025, 0, 0, 0.008);
  f.box(m.woodDark, 0.05, h, 0.34, w / 2 - 0.025, 0, 0, 0.008);
  f.box(m.woodDark, w, h, 0.02, 0, 0, -0.16, 0.006);
  f.box(m.wood, w, 0.05, 0.36, 0, h, 0, 0.01);
  const gap = (h - 0.1) / rows;
  for (let r = 0; r <= rows; r++) f.box(m.wood, w - 0.08, 0.035, 0.32, 0, 0.05 + r * gap, 0, 0.008);
  for (let r = 0; r < rows; r++) {
    let x = -w / 2 + 0.08;
    while (x < w / 2 - 0.12) {
      const bw = 0.03 + rand() * 0.035;
      const bh = gap * (0.55 + rand() * 0.38);
      if (rand() > 0.07) f.box(p.books[Math.floor(rand() * p.books.length)], bw, bh, 0.22 + rand() * 0.05, x + bw / 2, 0.085 + r * gap, 0.01, 0.004, 0, 0, (rand() - 0.5) * (rand() > 0.9 ? 0.4 : 0));
      x += bw + 0.004;
    }
  }
}

/** 一摞书 */
export function bookStack(k: SceneKit, f: Frame, n = 4, seed = 3): void {
  const rand = mulberry(seed);
  let y = 0;
  for (let i = 0; i < n; i++) {
    const h = 0.03 + rand() * 0.03;
    f.box(k.p.books[Math.floor(rand() * k.p.books.length)], 0.26 - i * 0.012, h, 0.19, 0, y, 0, 0.004, 0, (rand() - 0.5) * 0.4);
    y += h;
  }
}

/** 翻开的书 */
export function openBook(k: SceneKit, f: Frame): void {
  f.box(k.p.leather, 0.42, 0.015, 0.3, 0, 0, 0, 0.004);
  f.box(k.m.paper, 0.2, 0.025, 0.27, -0.105, 0.012, 0, 0.004, 0, 0, 0.05);
  f.box(k.m.paper, 0.2, 0.025, 0.27, 0.105, 0.012, 0, 0.004, 0, 0, -0.05);
}

// ───────────────────────── 屏幕 / 电子设备 ─────────────────────────

/** 显示器（立式）：屏幕可换材质（亮屏 / 熄屏） */
export function monitor(k: SceneKit, f: Frame, w = 0.62, h = 0.36, screen = k.p.screenOn): void {
  f.cyl(k.p.plasticDark, 0.1, 0.13, 0.015, 0, 0, 0, 16);
  f.box(k.p.plasticDark, 0.04, 0.2, 0.03, 0, 0.01, 0, 0.006);
  f.box(k.p.plasticDark, w + 0.03, h + 0.03, 0.03, 0, 0.2, 0, 0.01);
  f.put(new THREE.PlaneGeometry(w, h), screen, 0, 0.2 + (h + 0.03) / 2, 0.0166);
}

/** 笔记本电脑（打开） */
export function laptop(k: SceneKit, f: Frame, screen = k.p.screenOn): void {
  f.box(k.m.steel, 0.34, 0.015, 0.23, 0, 0, 0, 0.005);
  f.box(k.p.plasticDark, 0.3, 0.003, 0.1, 0, 0.015, 0.03, 0.001);
  f.box(k.m.steel, 0.34, 0.22, 0.01, 0, 0.012, -0.11, 0.004, -0.38);
  f.put(new THREE.PlaneGeometry(0.31, 0.19), screen, 0, 0.115, -0.105, -0.38);
}

/** 手机（平放） */
export function phone(k: SceneKit, f: Frame, screen = k.p.screenOn): void {
  f.box(k.p.plasticDark, 0.07, 0.008, 0.145, 0, 0, 0, 0.004);
  f.put(new THREE.PlaneGeometry(0.062, 0.13), screen, 0, 0.0085, 0, -Math.PI / 2);
}

/** 讲台 */
export function lectern(k: SceneKit, f: Frame): void {
  f.box(k.m.woodDark, 0.6, 1.0, 0.45, 0, 0, 0, 0.015);
  f.box(k.m.wood, 0.7, 0.04, 0.55, 0, 1.0, 0.0, 0.01, -0.28);
  f.box(k.m.brass, 0.4, 0.012, 0.012, 0, 0.98, 0.22, 0.003);
}

/** 黑板 / 白板：框 + 板面 + 粉笔槽 */
export function board(k: SceneKit, f: Frame, w = 2.4, h = 1.2, mat = k.p.boardGreen): void {
  f.box(k.m.woodDark, w + 0.12, h + 0.12, 0.05, 0, 0, 0, 0.012);
  f.box(mat, w, h, 0.02, 0, 0.06, 0.03, 0.006);
  f.box(k.m.wood, w * 0.7, 0.04, 0.08, 0, 0.04, 0.07, 0.008);
}

// ───────────────────────── 户外 / 市政 ─────────────────────────

/** 花坛（圆形）：石围 + 土 + 灌木 + 小花 */
export function planter(k: SceneKit, f: Frame, r = 0.5, seed = 5): void {
  const rand = mulberry(seed);
  f.cyl(k.m.stoneDark, r, r * 1.04, 0.38, 0, 0, 0, 24);
  f.cyl(k.m.stone, r * 1.05, r * 1.05, 0.05, 0, 0.38, 0, 24);
  f.cyl(k.m.soil, r * 0.88, r * 0.88, 0.05, 0, 0.38, 0, 24);
  for (let i = 0; i < 6; i++) {
    const a = rand() * Math.PI * 2;
    const d = rand() * r * 0.5;
    f.ball(rand() > 0.5 ? k.m.leaf : k.m.leafLight, r * (0.28 + rand() * 0.14), Math.cos(a) * d, 0.62 + rand() * 0.1, Math.sin(a) * d, 1, 0.85, 1);
  }
  f.ball(k.m.leafLight, r * 0.36, 0, 0.82, 0, 1, 0.9, 1);
  const fm = getFoliageMaterial();
  for (const g of shrubCardGeometries(seed * 13 + 5, r * 0.62, 110)) f.put(g, fm, 0, 0.72, 0);
}

/** 路灯 */
export function lampPost(k: SceneKit, f: Frame, h = 3.4): void {
  f.cyl(k.m.slate, 0.14, 0.18, 0.18, 0, 0, 0, 10);
  f.cyl(k.m.slate, 0.045, 0.065, h, 0, 0.18, 0, 8);
  f.strut(k.m.slate, [0, h + 0.18, 0], [0.45, h + 0.3, 0], 0.03, 5);
  f.put(new THREE.ConeGeometry(0.26, 0.2, 8), k.m.slate, 0.5, h + 0.34);
  f.cyl(k.m.lampGlass, 0.12, 0.18, 0.32, 0.5, h - 0.02, 0, 8);
}

/** 栏杆：沿局部 +x 方向 length，立柱 + 双横杆 */
export function railing(k: SceneKit, f: Frame, length: number, h = 1.0, mat = k.m.steel): void {
  const n = Math.max(2, Math.round(length / 1.0));
  for (let i = 0; i <= n; i++) f.cyl(mat, 0.02, 0.025, h, (i / n) * length, 0, 0, 8);
  f.box(mat, length, 0.04, 0.04, length / 2, h, 0, 0.01);
  f.box(mat, length, 0.025, 0.025, length / 2, h * 0.5, 0, 0.006);
}

/** 台阶：n 级，向 +z 升高（局部），宽 w */
export function stairs(k: SceneKit, f: Frame, w = 2, n = 4, rise = 0.17, run = 0.32): void {
  for (let i = 0; i < n; i++) f.box(k.m.stoneWarm, w, rise * (i + 1), run, 0, 0, i * run, 0.015);
}

/** 木箱 */
export function crate(k: SceneKit, f: Frame, w = 0.6, h = 0.45, d = 0.5): void {
  f.box(k.m.wood, w, h, d, 0, 0, 0, 0.012);
  for (let i = 1; i < 3; i++) f.box(k.m.woodDark, w + 0.004, 0.025, d + 0.004, 0, (h * i) / 3, 0, 0.004);
  for (const s of [-1, 1]) f.box(k.m.woodDark, 0.04, h + 0.004, d + 0.004, s * (w / 2 - 0.03), 0, 0, 0.004);
}

/** 木桶 */
export function barrel(k: SceneKit, f: Frame, r = 0.28, h = 0.7): void {
  f.put(cylGeo(r * 0.92, r * 0.92, h, 20), k.m.woodDark, 0, h / 2, 0);
  f.put(cylGeo(r, r, h * 0.5, 20), k.m.woodDark, 0, h / 2, 0);
  for (const y of [0.14, 0.4, 0.6]) f.put(new THREE.TorusGeometry(r * 0.98, 0.012, 5, 24), k.m.darkSteel, 0, y * (h / 0.74), 0, Math.PI / 2);
}

/** 行李箱 */
export function suitcase(k: SceneKit, f: Frame, w = 0.5, h = 0.7, d = 0.25, tone = k.p.fabricBlue): void {
  f.box(tone, w, h, d, 0, 0.05, 0, 0.04);
  f.box(k.m.darkSteel, 0.03, h * 0.5, 0.03, 0, h + 0.05, -d * 0.2, 0.005);
  f.box(k.m.darkSteel, w * 0.5, 0.025, 0.03, 0, h + 0.28, -d * 0.2, 0.005);
  for (const s of [-1, 1]) f.cyl(k.p.plasticDark, 0.025, 0.025, 0.05, s * (w / 2 - 0.06), 0, 0, 10);
}

/** 画框 / 照片 */
export function pictureFrame(k: SceneKit, f: Frame, w = 0.6, h = 0.45, art = k.p.fabricCream): void {
  f.box(k.m.woodDark, w + 0.06, h + 0.06, 0.03, 0, 0, 0, 0.008);
  f.put(new THREE.PlaneGeometry(w, h), art, 0, h / 2 + 0.03, 0.017);
}

/** 地球仪 */
export function globe(k: SceneKit, f: Frame, r = 0.2): void {
  f.cyl(k.m.brass, 0.1, 0.12, 0.03, 0, 0, 0, 16);
  f.cyl(k.m.brass, 0.015, 0.015, 0.2, 0, 0.03, 0, 8);
  f.put(new THREE.SphereGeometry(r, 24, 16), k.p.fabricBlue, 0, 0.3 + r * 0.5, 0, 0.4);
  f.put(new THREE.TorusGeometry(r * 1.08, 0.01, 6, 36, Math.PI * 1.5), k.m.brass, 0, 0.3 + r * 0.5, 0, 0.4, Math.PI / 2);
}

/** 茶杯 + 茶碟 */
export function cup(k: SceneKit, f: Frame): void {
  f.cyl(k.p.ceramic, 0.055, 0.055, 0.008, 0, 0, 0, 16);
  f.cyl(k.p.ceramic, 0.04, 0.03, 0.065, 0, 0.008, 0, 16);
  f.put(new THREE.TorusGeometry(0.02, 0.006, 5, 10, Math.PI), k.p.ceramic, 0.05, 0.04, 0, 0, 0, -Math.PI / 2);
}

/** 条纹遮阳篷：向 +z 外伸，两端带支架 */
export function awning(k: SceneKit, f: Frame, w = 2.4, depth = 1.0, stripes = 8, a = k.p.fabricRed, b = k.p.fabricCream): void {
  for (let i = 0; i < stripes; i++) f.box(i % 2 ? b : a, w / stripes, 0.015, depth, -w / 2 + (i + 0.5) * (w / stripes), 2.3, depth / 2, 0.004, 0.32);
  f.box(k.m.woodDark, w + 0.06, 0.05, 0.05, 0, 2.62, 0.02, 0.01);
  for (const s of [-1, 1]) f.cyl(k.m.woodDark, 0.025, 0.03, 2.4, s * (w / 2), 0, depth - 0.05, 8);
}

/** 带尖屋顶的小木屋（亭子）：四柱 + 四坡顶 */
export function gazebo(k: SceneKit, f: Frame, r = 1.4, roof = k.m.terracottaRoof): void {
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) f.cyl(k.m.woodDark, 0.06, 0.07, 2.4, dx * r, 0, dz * r, 10);
  f.box(k.m.woodDark, r * 2 + 0.2, 0.1, 0.1, 0, 2.4, -r, 0.01);
  f.box(k.m.woodDark, r * 2 + 0.2, 0.1, 0.1, 0, 2.4, r, 0.01);
  f.box(k.m.woodDark, 0.1, 0.1, r * 2 + 0.2, -r, 2.4, 0, 0.01);
  f.box(k.m.woodDark, 0.1, 0.1, r * 2 + 0.2, r, 2.4, 0, 0.01);
  f.put(new THREE.ConeGeometry(r * 1.7, 1.0, 4), roof, 0, 3.0, 0, 0, Math.PI / 4);
  f.ball(k.m.brass, 0.07, 0, 3.55, 0);
}

/** 小房子：石基 + 抹灰墙 + 双坡瓦顶 + 门窗 + 烟囱；正面朝局部 +z */
export function house(k: SceneKit, f: Frame, w = 2.4, h = 2.6, d = 2.2, roof = k.m.terracottaRoof, wall = k.m.paper): void {
  const { m } = k;
  f.box(m.stoneDark, w + 0.1, 0.3, d + 0.1, 0, 0, 0, 0.02);
  f.box(wall, w, h - 0.3, d, 0, 0.3, 0, 0.03);
  f.put(gableGeo(w + 0.5, 0.95 + w * 0.12, d + 0.5), roof, 0, h, 0);
  f.put(gableGeo(w + 0.3, 0.8 + w * 0.12, d + 0.3), m.woodDark, 0, h - 0.04, 0, 0, 0, 0, 1, 0.97, 0.99);
  // 门 + 门框 + 台阶
  f.box(m.woodDark, 0.82, 1.65, 0.07, 0, 0.3, d / 2 + 0.01, 0.01);
  f.box(m.wood, 0.7, 1.55, 0.06, 0, 0.3, d / 2 + 0.04, 0.01);
  f.box(m.stoneWarm, 1.2, 0.16, 0.45, 0, 0, d / 2 + 0.22, 0.02);
  f.box(m.brass, 0.05, 0.05, 0.04, 0.24, 1.05, d / 2 + 0.08, 0.008);
  // 窗：框 + 玻璃 + 窗台 + 十字窗棂
  for (const sx of [-1, 1]) {
    const x = sx * (w / 2 - 0.55);
    f.box(m.woodDark, 0.66, 0.74, 0.07, x, 1.15, d / 2 + 0.01, 0.01);
    f.put(new THREE.PlaneGeometry(0.54, 0.62), m.glass, x, 1.52, d / 2 + 0.05);
    f.box(m.woodDark, 0.03, 0.62, 0.03, x, 1.21, d / 2 + 0.06, 0.004);
    f.box(m.woodDark, 0.54, 0.03, 0.03, x, 1.51, d / 2 + 0.06, 0.004);
    f.box(m.stoneWarm, 0.78, 0.05, 0.14, x, 1.1, d / 2 + 0.07, 0.01);
  }
  f.box(m.stoneDark, 0.32, 1.0, 0.32, w / 2 - 0.45, h + 0.15, -d / 4, 0.02);
}
/** 水面圆盘（池塘 / 码头水域）：石围 + 水面 */
export function waterDisc(k: SceneKit, f: Frame, r = 2.4, sx = 1, sz = 1): void {
  f.put(cylGeo(r + 0.28, r + 0.34, 0.3, 40), k.m.stoneDark, 0, 0.15, 0, 0, 0, 0, sx, 1, sz);
  f.put(cylGeo(r, r, 0.2, 40), k.p.water, 0, 0.27, 0, 0, 0, 0, sx, 1, sz);
}

/** 帆船：木船体（侧面轮廓挤出）+ 甲板 + 舷墙 + 船舱 + 桅杆 + 弧形帆 + 缆索；船头朝局部 +x */
export function ship(k: SceneKit, f: Frame, L = 3.2, masts = 1, sail: THREE.Material = k.p.fabricCream, hull: THREE.Material = k.m.woodDark): void {
  const { m } = k;
  const W = L * 0.3;
  const H = L * 0.22;
  const s = new THREE.Shape();
  s.moveTo(-L / 2, H);
  s.lineTo(-L * 0.36, 0);
  s.lineTo(L * 0.3, 0);
  s.quadraticCurveTo(L * 0.5, H * 0.25, L / 2 + 0.12, H * 0.92);
  s.lineTo(-L / 2, H);
  const geo = new THREE.ExtrudeGeometry(s, { depth: W, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
  geo.translate(0, 0, -W / 2);
  f.put(geo, hull, 0, 0.05, 0);
  f.box(k.p.fabricRed, L * 0.98, 0.05, 0.04, 0, H * 0.95, W / 2 + 0.02, 0.01);
  f.box(k.p.fabricRed, L * 0.98, 0.05, 0.04, 0, H * 0.95, -W / 2 - 0.02, 0.01);
  f.box(m.wood, L * 0.9, 0.04, W * 0.92, 0, H * 0.9, 0, 0.01);
  f.box(m.woodDark, L * 0.22, H * 0.55, W * 0.7, -L * 0.3, H * 0.92, 0, 0.02);
  f.box(m.slate, L * 0.1, 0.1, 0.02, -L * 0.3, H * 1.25, W * 0.36, 0.005);
  const step = L * 0.5 / Math.max(1, masts);
  for (let i = 0; i < masts; i++) {
    const x = L * 0.12 - i * step * 0.9;
    const mh = L * (0.95 - i * 0.12);
    f.cyl(m.woodDark, 0.025, 0.04, mh, x, H * 0.92, 0, 10);
    f.box(m.woodDark, 0.03, 0.03, L * 0.3, x, H * 0.92 + mh * 0.32, -L * 0.04, 0.005);
    const sg = new THREE.PlaneGeometry(L * 0.3, mh * 0.62, 8, 10);
    const pos = sg.attributes.position;
    for (let v = 0; v < pos.count; v++) pos.setZ(v, Math.cos((pos.getX(v) / (L * 0.3)) * Math.PI) * 0.12 * L * 0.3 + 0.02);
    sg.computeVertexNormals();
    f.put(sg, sail, x, H * 0.92 + mh * 0.66, 0, 0, Math.PI / 2 - Math.PI / 2, 0);
    f.strut(m.steel, [x, H * 0.92 + mh, 0], [L / 2 + 0.05, H * 0.9, 0], 0.008, 4);
    f.strut(m.steel, [x, H * 0.92 + mh, 0], [-L / 2, H * 1.0, 0], 0.008, 4);
  }
  f.box(k.p.fabricRed, 0.22, 0.14, 0.01, L * 0.12, H * 0.92 + L * 0.93, 0.0, 0.003);
}

/** 帐篷（救援站）：四根柱 + 倾斜帆布顶 + 前檐 */
export function tent(k: SceneKit, f: Frame, w = 4.4, d = 3.4, h = 2.6, canvas: THREE.Material = k.p.canvasOlive): void {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) f.cyl(k.m.woodDark, 0.05, 0.06, h, sx * (w / 2 - 0.1), 0, sz * (d / 2 - 0.1), 10);
  for (const s of [-1, 1]) f.box(canvas, w + 0.4, 0.04, d * 0.62, 0, h + 0.28, s * d * 0.27, 0.01, -s * 0.22);
  f.box(k.m.woodDark, w + 0.1, 0.06, 0.06, 0, h + 0.5, 0, 0.01);
  f.box(canvas, w + 0.3, 0.45, 0.03, 0, h - 0.4, d / 2 + 0.02, 0.01);
}
/** 路标：立柱 + 若干块带朝向的指示牌（yaw 为牌面方向，len 为牌长） */
export function signpost(k: SceneKit, f: Frame, signs: Array<{ yaw: number; len?: number; tone?: THREE.Material }>, h = 2.6): void {
  f.cyl(k.m.woodDark, 0.06, 0.085, h, 0, 0, 0, 10);
  f.cyl(k.m.stoneDark, 0.2, 0.24, 0.18, 0, 0, 0, 12);
  signs.forEach((s, i) => {
    const y = h - 0.3 - i * 0.34;
    const len = s.len ?? 0.95;
    const g = f.child(0, y, 0, s.yaw);
    g.box(s.tone ?? k.m.wood, len, 0.24, 0.045, len / 2 - 0.05, 0, 0, 0.012);
    g.put(new THREE.ConeGeometry(0.16, 0.2, 3), s.tone ?? k.m.wood, len + 0.04, 0.12, 0, 0, 0, -Math.PI / 2, 1, 1, 0.3);
    g.box(k.m.paper, len * 0.6, 0.05, 0.01, len / 2 - 0.05, 0.1, 0.03, 0.003);
  });
  f.ball(k.m.brass, 0.07, 0, h + 0.05, 0);
}

/** 自行车（侧立）：两个轮圈带辐条 + 车架 + 座椅 + 把手 */
export function bicycle(k: SceneKit, f: Frame, tone: THREE.Material = k.p.fabricRed): void {
  const { m } = k;
  for (const x of [-0.55, 0.55]) {
    f.put(new THREE.TorusGeometry(0.33, 0.018, 8, 28), m.darkSteel, x, 0.36, 0);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI;
      f.strut(m.steel, [x + Math.cos(a) * 0.32, 0.36 + Math.sin(a) * 0.32, 0], [x - Math.cos(a) * 0.32, 0.36 - Math.sin(a) * 0.32, 0], 0.004, 3);
    }
    f.cyl(m.steel, 0.03, 0.03, 0.05, x, 0.36, 0, 8);
  }
  f.strut(tone as THREE.Material, [-0.55, 0.36, 0], [-0.1, 0.38, 0], 0.016, 6);
  f.strut(tone as THREE.Material, [-0.1, 0.38, 0], [0.4, 0.74, 0], 0.016, 6);
  f.strut(tone as THREE.Material, [-0.55, 0.36, 0], [-0.1, 0.75, 0], 0.016, 6);
  f.strut(tone as THREE.Material, [-0.1, 0.75, 0], [0.4, 0.74, 0], 0.016, 6);
  f.strut(tone as THREE.Material, [0.4, 0.74, 0], [0.55, 0.36, 0], 0.016, 6);
  f.box(k.p.leather, 0.22, 0.04, 0.1, -0.12, 0.8, 0, 0.015);
  f.strut(m.darkSteel, [0.4, 0.74, 0], [0.38, 0.95, 0], 0.012, 5);
  f.box(m.darkSteel, 0.03, 0.03, 0.4, 0.38, 0.95, 0, 0.008);
}

/** 铁轨：枕木 + 两根钢轨，沿局部 +x 延伸 length */
export function rails(k: SceneKit, f: Frame, length = 6, gauge = 0.72): void {
  const n = Math.floor(length / 0.42);
  for (let i = 0; i <= n; i++) f.box(k.m.woodDark, 0.2, 0.1, gauge + 0.7, (i / n) * length, 0, 0, 0.02);
  for (const sz of [-1, 1]) f.box(k.m.steel, length, 0.07, 0.07, length / 2, 0.1, (sz * gauge) / 2, 0.012);
}

/** 雨伞（撑开）：伞杆 + 伞面 + 伞尖 */
export function umbrella(k: SceneKit, f: Frame, r = 0.55, tone: THREE.Material = k.p.fabricRed): void {
  f.cyl(k.m.darkSteel, 0.012, 0.012, 1.5, 0, 0, 0, 6);
  f.put(new THREE.ConeGeometry(r, 0.28, 16, 1, true), tone, 0, 1.58, 0);
  f.ball(k.m.brass, 0.025, 0, 1.76, 0);
}
/** 靠书架的木梯（斜靠，顶端朝局部 -z）：两侧立杆 + 踏板 */
export function ladder(k: SceneKit, f: Frame, h = 2.4): void {
  const lean = 0.2;
  for (const sx of [-1, 1]) f.strut(k.m.wood, [sx * 0.22, 0, 0.3], [sx * 0.22, h, 0.3 - h * lean], 0.025, 6);
  const n = Math.floor(h / 0.3);
  for (let i = 1; i <= n; i++) {
    const t = (i * 0.3) / h;
    f.box(k.m.woodDark, 0.44, 0.03, 0.08, 0, t * h - 0.015, 0.3 - t * h * lean, 0.008);
  }
  for (const sx of [-1, 1]) f.cyl(k.p.plasticDark, 0.03, 0.03, 0.04, sx * 0.22, 0, 0.3, 8);
}

/** 书车：木推车 + 三层书（顺序随机的彩色书脊） */
export function bookCart(k: SceneKit, f: Frame, seed = 2): void {
  const rand = mulberry(seed);
  f.box(k.m.wood, 1.2, 0.05, 0.5, 0, 0.35, 0, 0.012);
  f.box(k.m.woodDark, 1.2, 0.3, 0.04, 0, 0.35, -0.23, 0.01);
  for (const sx of [-1, 1]) f.box(k.m.woodDark, 0.05, 0.8, 0.5, sx * 0.58, 0.35, 0, 0.01);
  f.box(k.m.woodDark, 1.2, 0.04, 0.4, 0, 0.7, 0, 0.01, -0.2);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) f.put(new THREE.TorusGeometry(0.1, 0.03, 8, 14), k.m.darkSteel, sx * 0.5, 0.12, sz * 0.2, 0, Math.PI / 2);
  for (let r = 0; r < 2; r++) {
    let x = -0.52;
    while (x < 0.5) {
      const bw = 0.04 + rand() * 0.03;
      f.box(k.p.books[Math.floor(rand() * k.p.books.length)], bw, 0.18 + rand() * 0.1, 0.22, x + bw / 2, r === 0 ? 0.4 : 0.74, -0.02, 0.004, 0, 0, r === 1 ? -0.2 : 0);
      x += bw + 0.004;
    }
  }
}
function mulberry(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
