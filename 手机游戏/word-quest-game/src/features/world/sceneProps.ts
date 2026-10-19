import { getFoliageMaterial, shrubCardGeometries } from "./props";
import * as THREE from "three";
import { createSimpleWaterMaterial } from "./waterSurface";
import { MergedBuilder, boxGeo, createKitMaterials, cylGeo, gableGeo, strutGeo, type KitMaterials } from "./detailKit";
import { createBookPageBlock, createBookPrint, createBookRibbon, createPetalGeometry, createPlanterRim } from "./propGeometry";

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
  printInk: THREE.MeshStandardMaterial;
  water: THREE.MeshPhysicalMaterial;
  canvasOlive: THREE.MeshStandardMaterial;
}

export type PropDetail = "high" | "low";

export interface SceneKit {
  detail: PropDetail;
  kit: MergedBuilder;
  m: KitMaterials;
  p: PropMaterials;
}

export function createSceneKit(detail: PropDetail = "high"): SceneKit {
  const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}) => {
    const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    mat.fog = false;
    return mat;
  };
  const bookTones = [0x9b3d3a, 0x2f5d8a, 0x3f7a4f, 0xc79a3a, 0x6a4a8a, 0xd8d0b8, 0x7a5a3a, 0x2d3a46];
  return {
    detail,
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
      printInk: std(0x41494d, 0.98, 0),
      water: createSimpleWaterMaterial({ depth: 0.55 }),
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

/** 公园长椅：木条、镂空铁支架、弧形扶手与固定件。 */
export function bench(k: SceneKit, f: Frame, length = 1.8): void {
  const { m } = k;
  for (let i = 0; i < 4; i++) f.box(m.wood, length, 0.035, 0.085, 0, 0.44, -0.18 + i * 0.1, 0.008);
  for (let i = 0; i < 3; i++) f.box(m.wood, length, 0.08, 0.03, 0, 0.62 + i * 0.12, -0.27 - i * 0.02, 0.008, -0.12);
  for (const s of [-1, 1]) {
    const x = (s * (length - 0.12)) / 2;
    for (const z of [-0.23, 0.19]) {
      f.box(m.darkSteel, 0.10, 0.035, 0.13, x, 0, z, 0.006);
      f.strut(m.darkSteel, [x, 0.035, z], [x, 0.435, z * 0.78], 0.026, 8);
    }
    f.strut(m.darkSteel, [x, 0.425, -0.28], [x, 0.425, 0.23], 0.027, 8);
    f.strut(m.darkSteel, [x, 0.40, -0.27], [x, 0.96, -0.35], 0.024, 8);
    const arm = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x, 0.58, 0.20), new THREE.Vector3(x, 0.65, 0.13),
      new THREE.Vector3(x, 0.66, -0.14), new THREE.Vector3(x, 0.63, -0.29),
    ]);
    f.put(new THREE.TubeGeometry(arm, k.detail === "high" ? 12 : 6, 0.024, 6, false), m.darkSteel);
    f.strut(m.darkSteel, [x, 0.45, 0.18], [x, 0.61, 0.18], 0.020, 6);
    if (k.detail === "high") {
      for (let i = 0; i < 4; i++) f.cyl(m.steel, 0.008, 0.008, 0.004, x, 0.476, -0.18 + i * 0.1, 6);
      for (let i = 0; i < 3; i++) {
        f.put(cylGeo(0.008, 0.008, 0.004, 6), m.steel, x, 0.66 + i * 0.12, -0.248 - i * 0.02, Math.PI / 2);
      }
    }
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
    const cover = k.p.books[Math.floor(rand() * k.p.books.length)];
    const w = Math.max(0.10, 0.26 - i * 0.012);
    const book = f.child(0, y, 0, (rand() - 0.5) * 0.4);
    book.box(cover, w, 0.003, 0.19, 0, 0, 0, 0.001);
    book.box(k.m.paper, w - 0.01, h - 0.006, 0.18, 0.002, 0.003, 0, 0.001);
    book.box(cover, w, 0.003, 0.19, 0, h - 0.003, 0, 0.001);
    book.box(cover, 0.006, h, 0.19, -w / 2 + 0.003, 0, 0, 0.001);
    if (k.detail === "high") {
      for (const z of [-0.06, 0.06]) book.box(k.m.brass, 0.001, h * 0.6, 0.006, -w / 2 - 0.0006, h * 0.2, z, 0);
      book.box(k.m.brass, w * 0.45, 0.0008, 0.035, 0, h + 0.0002, 0, 0);
    }
    y += h;
  }
}

/** 翻开的书：独立纸页截面、装订沟、贴合曲面的印刷与书签。 */
export function openBook(k: SceneKit, f: Frame): void {
  for (const side of [-1, 1] as const) {
    f.box(k.p.leather, 0.216, 0.009, 0.3, side * 0.108, 0.002, 0, 0.003);
    f.put(createBookPageBlock(side, k.detail === "high" ? 10 : 4), k.m.paper);
    if (k.detail === "high") f.put(createBookPrint(side), k.p.printInk);
  }
  f.strut(k.p.leather, [0, 0.015, -0.15], [0, 0.015, 0.15], 0.008, 8);
  if (k.detail === "high") {
    f.put(createBookRibbon(), k.p.fabricRed);
  }
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
  f.box(k.p.plasticDark, 0.292, 0.0015, 0.101, 0, 0.0152, -0.026, 0.001);
  f.box(k.p.plasticDark, 0.098, 0.001, 0.048, 0, 0.0153, 0.073, 0.001);
  f.box(k.m.steel, 0.094, 0.001, 0.044, 0, 0.0164, 0.073, 0.001);
  f.strut(k.m.darkSteel, [-0.115, 0.018, -0.103], [0.115, 0.018, -0.103], 0.008, 8);
  const angle = 0.30;
  const c = Math.cos(angle), s = Math.sin(angle);
  const lidPart = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, front: number) =>
    f.put(geometry, material, x, 0.018 + y * c + front * s, -0.103 - y * s + front * c, -angle);
  lidPart(boxGeo(0.34, 0.22, 0.009, 0.004), k.m.steel, 0, 0.11, 0);
  lidPart(new THREE.PlaneGeometry(0.315, 0.193), k.p.plasticDark, 0, 0.11, 0.005);
  lidPart(new THREE.PlaneGeometry(0.295, 0.169), screen, 0, 0.11, 0.0056);
  if (k.detail === "high") {
    for (let row = 0; row < 4; row++) for (let col = 0; col < 10; col++) {
      f.box(k.m.darkSteel, 0.023, 0.0018, 0.017, -0.125 + col * 0.0278, 0.0168, -0.063 + row * 0.023, 0.0005);
    }
    f.box(k.m.darkSteel, 0.11, 0.0018, 0.013, 0, 0.0168, 0.026, 0.0005);
    for (const x of [-0.157, 0.157]) for (let i = 0; i < 6; i++) {
      f.box(k.p.plasticDark, 0.003, 0.0006, 0.010, x, 0.0155, -0.067 + i * 0.016, 0);
    }
    // 同一个盖板局部坐标系，屏幕内容不会随屏幕倾角脱离表面。
    lidPart(new THREE.PlaneGeometry(0.258, 0.009), k.m.paper, 0, 0.174, 0.0059);
    for (let row = 0; row < 4; row++) {
      lidPart(new THREE.PlaneGeometry(0.16 - row * 0.018, 0.003), k.m.paper, -0.024, 0.145 - row * 0.020, 0.0059);
    }
    lidPart(new THREE.PlaneGeometry(0.003, 0.003), k.p.plasticDark, 0, 0.212, 0.0058);
  }
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
  f.put(new THREE.CylinderGeometry(r, r * 1.04, 0.38, 24, 1, true), k.m.stoneDark, 0, 0.19, 0);
  f.put(createPlanterRim(r, 0.08), k.m.stone, 0, 0.355, 0);
  f.cyl(k.m.soil, r * 0.88, r * 0.88, 0.045, 0, 0.31, 0, 24);
  const fm = getFoliageMaterial();
  for (const g of shrubCardGeometries(seed * 13 + 5, r * 0.62, k.detail === "high" ? 96 : 30)) {
    const colors = g.attributes.color;
    for (let i = 0; i < colors.count; i++) colors.setXYZ(i, colors.getX(i) * 0.82, colors.getY(i) * 0.82, colors.getZ(i) * 0.82);
    f.put(g, fm, 0, 0.66, 0);
  }
  for (let i = 0; i < (k.detail === "high" ? 7 : 3); i++) {
    const angle = rand() * Math.PI * 2;
    const distance = Math.sqrt(rand()) * r * 0.60;
    const x = Math.cos(angle) * distance, z = Math.sin(angle) * distance;
    const height = 0.78 + rand() * 0.22;
    const size = r * (0.12 + rand() * 0.05);
    f.strut(k.m.leaf, [x * 0.85, 0.35, z * 0.85], [x, height, z], 0.008, 5);
    const flower = f.child(x, height, z, angle);
    const petals = k.detail === "high" ? 6 : 4;
    for (let p = 0; p < petals; p++) {
      flower.put(createPetalGeometry(), i % 2 ? k.p.fabricCream : k.p.fabricRed, 0, 0, 0, 0, p / petals * Math.PI * 2, 0, size, size, size);
    }
    flower.put(new THREE.SphereGeometry(size * 0.25, 8, 5), k.p.books[3], 0, 0.008, 0, 0, 0, 0, 1, 0.55, 1);
  }
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

export interface HouseFacadeOpening {
  kind: "door" | "window";
  x: number;
  y: number;
  width: number;
  height: number;
  curtain?: boolean;
  sillOverhang?: number;
  lintelOverhang?: number;
}

const WINDOW_FRAME_WIDTH = 0.045;

/** 房屋正面洞口布局（局部米制坐标，底面 y=0，正面朝 +z）。 */
export function getHouseFacadeLayout(w: number, h: number): HouseFacadeOpening[] {
  const doorHeight = Math.min(1.65, h - 0.35);
  const windowWidth = Math.min(0.56, Math.max(0.2, (w - 1.25) / 2));
  const windowY = Math.min(1.2, h - 0.8);
  const windowHeight = Math.min(0.64, h - windowY - 0.16);
  const sillOverhang = 0.025;
  const lintelOverhang = 0.025;
  const sideClearance = 0.05;
  const trimExtent = Math.max(sillOverhang, lintelOverhang, WINDOW_FRAME_WIDTH);
  const windowX = w / 2 - sideClearance - trimExtent - windowWidth / 2;
  return [
    { kind: "door", x: 0, y: 0.3, width: Math.min(0.82, w - 0.08), height: doorHeight },
    { kind: "window", x: -windowX, y: windowY, width: windowWidth, height: windowHeight, sillOverhang, lintelOverhang },
    { kind: "window", x: windowX, y: windowY, width: windowWidth, height: windowHeight, curtain: true, sillOverhang, lintelOverhang },
  ];
}

function addFrontFacadeWithOpenings(
  f: Frame,
  wall: THREE.Material,
  width: number,
  height: number,
  frontZ: number,
  wallBottom: number,
  wallDepth: number,
  openings: HouseFacadeOpening[],
): void {
  const xCuts = [...new Set([
    -width / 2,
    width / 2,
    ...openings.flatMap((opening) => [opening.x - opening.width / 2, opening.x + opening.width / 2]),
  ])].sort((a, b) => a - b);
  for (let i = 0; i < xCuts.length - 1; i++) {
    const left = xCuts[i];
    const right = xCuts[i + 1];
    if (right - left < 0.006) continue;
    const x = (left + right) / 2;
    const holes = openings
      .filter((opening) => x > opening.x - opening.width / 2 && x < opening.x + opening.width / 2)
      .sort((a, b) => a.y - b.y);
    let y = wallBottom;
    for (const opening of holes) {
      const holeBottom = THREE.MathUtils.clamp(opening.y, wallBottom, height);
      const holeTop = THREE.MathUtils.clamp(opening.y + opening.height, wallBottom, height);
      if (holeBottom - y > 0.006) f.box(wall, right - left, holeBottom - y, wallDepth, x, y, frontZ - wallDepth / 2, 0);
      y = Math.max(y, holeTop);
    }
    if (height - y > 0.006) f.box(wall, right - left, height - y, wallDepth, x, y, frontZ - wallDepth / 2, 0);
  }
}

/** 小房子：石基 + 有真实门窗洞口的墙体 + 双坡瓦顶 + 门窗细节 + 烟囱；正面朝局部 +z */
export function house(k: SceneKit, f: Frame, w = 2.4, h = 2.6, d = 2.2, roof = k.m.terracottaRoof, wall = k.m.paper): void {
  const { m } = k;
  const wallBottom = 0.3;
  const wallHeight = Math.max(0.1, h - wallBottom);
  const wallDepth = Math.min(0.16, d * 0.12);
  const frontZ = d / 2;
  const openings = getHouseFacadeLayout(w, h);
  const door = openings[0];
  const windows = openings.slice(1);

  f.box(m.stoneDark, w + 0.1, wallBottom, d + 0.1, 0, 0, 0, 0.02);
  // 三面封闭墙 + 正面按洞口分段，窗内透光板因此位于真实空隙中。
  f.box(wall, wallDepth, wallHeight, d, -w / 2 + wallDepth / 2, wallBottom, 0, 0);
  f.box(wall, wallDepth, wallHeight, d, w / 2 - wallDepth / 2, wallBottom, 0, 0);
  f.box(wall, w, wallHeight, wallDepth, 0, wallBottom, -d / 2 + wallDepth / 2, 0);
  addFrontFacadeWithOpenings(f, wall, w, h, frontZ, wallBottom, wallDepth, openings);

  f.put(gableGeo(w + 0.5, 0.95 + w * 0.12, d + 0.5), roof, 0, h, 0);
  f.put(gableGeo(w + 0.3, 0.8 + w * 0.12, d + 0.3), m.woodDark, 0, h - 0.04, 0, 0, 0, 0, 1, 0.97, 0.99);

  // 门洞保留原有中心、底边和台阶位置；门框压住洞口边缘，门板退后少许形成阴影缝。
  const jambWidth = 0.06;
  const doorFaceZ = frontZ + 0.008;
  const doorLeft = door.x - door.width / 2;
  const doorRight = door.x + door.width / 2;
  const jambZ = frontZ - wallDepth / 2 + 0.01;
  const jambHeight = Math.max(0.2, door.height - 0.08);
  const headerY = door.y + jambHeight;
  f.box(m.woodDark, jambWidth, jambHeight, wallDepth + 0.04, doorLeft + jambWidth / 2, door.y, jambZ, 0.008);
  f.box(m.woodDark, jambWidth, jambHeight, wallDepth + 0.04, doorRight - jambWidth / 2, door.y, jambZ, 0.008);
  f.box(m.woodDark, door.width, 0.08, wallDepth + 0.04, door.x, headerY, jambZ, 0.008);
  const doorBoardWidth = Math.max(0.48, door.width - jambWidth * 2 - 0.08);
  const doorBoardHeight = door.height - 0.11;
  f.box(m.wood, doorBoardWidth, doorBoardHeight, 0.055, door.x, door.y, doorFaceZ, 0.008);
  if (k.detail === "high") {
    // 两道横档和三道窄木缝，合并进已有木材材质。
    for (const y of [door.y + 0.56, door.y + 1.12]) {
      if (y < door.y + doorBoardHeight - 0.04) f.box(m.woodDark, doorBoardWidth - 0.08, 0.025, 0.012, door.x, y, doorFaceZ + 0.034, 0.003);
    }
    for (const dx of [-0.14, 0, 0.14]) f.box(m.woodDark, 0.012, doorBoardHeight - 0.12, 0.012, door.x + dx, door.y + 0.06, doorFaceZ + 0.034, 0.002);
    for (const y of [door.y + 0.16, door.y + door.height - 0.22]) {
      f.box(m.brass, 0.035, 0.075, 0.012, doorLeft + jambWidth / 2, y, doorFaceZ + 0.038, 0.003);
    }
  }
  f.box(m.stoneWarm, Math.max(0.9, door.width + 0.38), 0.16, 0.45, 0, 0, frontZ + 0.22, 0.02);
  f.box(m.brass, 0.05, 0.05, 0.04, door.x + Math.min(0.24, doorBoardWidth * 0.4), door.y + Math.min(0.75, doorBoardHeight * 0.49), doorFaceZ + 0.04, 0.008);

  for (const opening of windows) {
    const windowFrame = f.child(opening.x, opening.y, frontZ + 0.006);
    windowPane(k, windowFrame, opening.width, opening.height, {
      cols: k.detail === "high" ? 2 : 1,
      rows: k.detail === "high" ? 2 : 1,
      curtain: k.detail === "high" && opening.curtain,
      lit: true,
      frame: m.woodDark,
      recess: wallDepth + 0.03,
      sillOverhang: opening.sillOverhang,
      lintelOverhang: opening.lintelOverhang,
    });
    // 侧窗洞口加深色内侧边，窗框压在墙外表面，玻璃与暖光板留有真实前后距离。
    const revealDepth = wallDepth;
    const revealZ = frontZ - revealDepth / 2;
    for (const sx of [-1, 1]) {
      f.box(m.woodDark, 0.025, opening.height, revealDepth, opening.x + sx * opening.width / 2, opening.y, revealZ, 0.003);
    }
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
  // 舷墙、栏杆、甲板、船尾楼
  f.box(k.p.fabricRed, L * 0.98, 0.05, 0.04, 0, H * 0.95, W / 2 + 0.02, 0.01);
  f.box(k.p.fabricRed, L * 0.98, 0.05, 0.04, 0, H * 0.95, -W / 2 - 0.02, 0.01);
  f.box(m.wood, L * 0.9, 0.04, W * 0.92, 0, H * 0.9, 0, 0.01);
  for (let i = 0; i < 9; i++) for (const sz of [-1, 1]) f.box(m.woodDark, 0.02, H * 0.22, 0.02, -L * 0.42 + i * L * 0.1, H * 0.95, sz * (W / 2 - 0.02), 0.004);
  f.box(m.woodDark, L * 0.22, H * 0.55, W * 0.7, -L * 0.3, H * 0.92, 0, 0.02);
  f.box(m.slate, L * 0.1, 0.1, 0.02, -L * 0.3, H * 1.25, W * 0.36, 0.005);
  // 舵：舵柄 + 舵叶
  f.box(m.woodDark, 0.02, H * 0.6, W * 0.12, -L / 2 - 0.02, H * 0.2, 0, 0.004);
  f.strut(m.woodDark, [-L / 2 - 0.02, H * 0.75, 0], [-L / 2 + 0.2, H * 1.0, 0], 0.012, 5);
  // 船头斜桅与前帆
  f.strut(m.woodDark, [L / 2 - 0.1, H * 0.95, 0], [L / 2 + 0.28, H * 1.35, 0], 0.02, 6);
  // 锚 + 缆绳盘
  f.put(new THREE.TorusGeometry(0.05, 0.01, 6, 14, Math.PI), m.darkSteel, L * 0.36, H * 0.9, W / 2 + 0.05, 0, 0, Math.PI);
  f.strut(m.darkSteel, [L * 0.36, H * 0.9, W / 2 + 0.05], [L * 0.36, H * 0.9 + 0.14, W / 2 + 0.05], 0.008, 4);
  f.cyl(m.wood, 0.07, 0.07, 0.04, L * 0.2, H * 0.93, W * 0.25, 12);
  const step = L * 0.5 / Math.max(1, masts);
  for (let i = 0; i < masts; i++) {
    const x = L * 0.12 - i * step * 0.9;
    const mh = L * (0.95 - i * 0.12);
    const base = H * 0.92;
    f.cyl(m.woodDark, 0.022, 0.04, mh, x, base, 0, 10);
    // 帆桁：上桁（帆顶）与下桁（帆脚），帆挂在两桁之间
    const top = base + mh * 0.92;
    const bot = base + mh * 0.3;
    const sw = L * 0.34;
    f.strut(m.woodDark, [x, top, -sw / 2], [x, top, sw / 2], 0.014, 6);
    f.strut(m.woodDark, [x, bot, -sw / 2 * 1.1], [x, bot, sw / 2 * 1.1], 0.016, 6);
    // 帆：横帆（宽沿船宽 z，鼓向船首 +x），上窄下宽的梯形，带横向补丁缝线
    const sg = new THREE.PlaneGeometry(1, 1, 12, 10);
    const pos = sg.attributes.position;
    const sh = top - bot;
    for (let v = 0; v < pos.count; v++) {
      const u = pos.getX(v) + 0.5;
      const w = pos.getY(v) + 0.5;
      const half = (sw / 2) * (0.78 + 0.22 * (1 - w));
      const px = (u - 0.5) * 2 * half;
      const py = bot + w * sh;
      const bulge = Math.sin(u * Math.PI) * Math.sin(w * Math.PI * 0.9 + 0.2) * 0.1 * L * 0.3;
      pos.setXYZ(v, bulge, py, px);
    }
    sg.computeVertexNormals();
    f.put(sg, sail, x, 0, 0);
    for (let q = 1; q < 5; q++) f.strut(m.woodDark, [x + 0.012, bot + (sh * q) / 5, -sw / 2 * 0.86], [x + 0.012, bot + (sh * q) / 5, sw / 2 * 0.86], 0.004, 4);
    // 桅顶：望斗 + 旗；横桅索梯
    f.cyl(m.woodDark, 0.07, 0.06, 0.04, x, top + 0.02, 0, 10);
    f.strut(m.steel, [x, base + mh, 0], [L / 2 + 0.05, H * 0.9, 0], 0.008, 4);
    f.strut(m.steel, [x, base + mh, 0], [-L / 2, H * 1.0, 0], 0.008, 4);
    for (const sz of [-1, 1]) {
      f.strut(m.steel, [x, top, 0], [x, H * 0.95, sz * (W / 2 + 0.03)], 0.006, 4);
      for (let r = 1; r < 6; r++) {
        const t = r / 6;
        f.strut(m.steel, [x, top - (top - H * 0.95) * t, sz * (W / 2 + 0.03) * t], [x + 0.001, top - (top - H * 0.95) * t, sz * (W / 2 + 0.03) * t + 0.0], 0.004, 3);
      }
    }
    if (i === 0) f.box(k.p.fabricRed, 0.22, 0.14, 0.01, x + 0.11, base + mh + 0.06, 0.0, 0.003);
  }
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

const windowMatCache = new WeakMap<object, { glow: THREE.MeshStandardMaterial; curtain: THREE.MeshStandardMaterial }>();
/**
 * 带窗框的窗：外框 + 窗台 + 过梁 + 窗棂格 + 玻璃 + 室内暖光板 + 窗帘（可选）。
 * f 的局部原点在窗洞底边中心，朝 +z；w × h 为洞口尺寸。
 */
export function windowPane(k: SceneKit, f: Frame, w: number, h: number, opts: { cols?: number; rows?: number; curtain?: boolean; lit?: boolean; frame?: THREE.Material; recess?: number; sillOverhang?: number; lintelOverhang?: number } = {}): void {
  const { m } = k;
  const cols = opts.cols ?? 2;
  const rows = opts.rows ?? 2;
  const frame = opts.frame ?? m.woodDark;
  let mats = windowMatCache.get(k);
  if (!mats) {
    mats = {
      glow: new THREE.MeshStandardMaterial({ color: 0xffe2a8, emissive: 0xffb45a, emissiveIntensity: 0.55, roughness: 0.7 }),
      curtain: new THREE.MeshStandardMaterial({ color: 0xd9c8a8, roughness: 0.95, side: THREE.DoubleSide }),
    };
    windowMatCache.set(k, mats);
  }
  const t = WINDOW_FRAME_WIDTH;
  // 室内背板（暖光，窗内有人家的感觉）
  if (opts.lit !== false) f.box(mats.glow, w - t, h - t, 0.01, 0, t / 2, -(opts.recess ?? 0.02), 0.002);
  // 玻璃：略深的反射面
  f.put(new THREE.PlaneGeometry(w - t * 1.4, h - t * 1.4), m.glass, 0, h / 2, 0.02);
  // 外框四边
  f.box(frame, w + t * 2, t, 0.08, 0, -t, 0.0, 0.006);
  f.box(frame, w + t * 2, t, 0.08, 0, h, 0.0, 0.006);
  f.box(frame, t, h + t * 2, 0.08, -w / 2 - t / 2, -t, 0.0, 0.006);
  f.box(frame, t, h + t * 2, 0.08, w / 2 + t / 2, -t, 0.0, 0.006);
  // 窗棂
  for (let i = 1; i < cols; i++) f.box(frame, 0.022, h, 0.05, -w / 2 + (w * i) / cols, 0, 0.03, 0.003);
  for (let j = 1; j < rows; j++) f.box(frame, w, 0.022, 0.05, 0, (h * j) / rows, 0.03, 0.003);
  // 窗台 + 过梁
  const sillOverhang = Math.max(0, opts.sillOverhang ?? 0.11);
  const lintelOverhang = Math.max(0, opts.lintelOverhang ?? 0.1);
  f.box(m.stoneWarm, w + sillOverhang * 2, 0.05, 0.16, 0, -t - 0.05, 0.05, 0.01);
  f.box(m.stoneDark, w + lintelOverhang * 2, 0.06, 0.1, 0, h + t, 0.03, 0.01);
  if (opts.curtain) {
    for (const s of [-1, 1]) {
      const g = new THREE.PlaneGeometry(w * 0.3, h * 0.92, 5, 1);
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 40) * 0.012);
      g.computeVertexNormals();
      f.put(g, mats.curtain, s * w * 0.33, h * 0.5, 0.06);
    }
    f.box(m.brass, w + 0.08, 0.015, 0.015, 0, h - 0.03, 0.07, 0.004);
  }
}
