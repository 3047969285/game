import * as THREE from "three";
import { MergedBuilder, boxGeo, createKitMaterials, cylGeo, strutGeo } from "./detailKit";

const TERRACE_TOP = 1.16;

/**
 * 给门式框架（两根立柱 + 横梁）补上建筑细节：柱础、柱帽、托架（牛腿）、
 * 檐口压条、螺栓。框架本体仍由调用方画出，这里只叠加倒角细节。
 */
export function buildPortalTrim(width: number, height: number, z: number, tone: "timber" | "steel"): THREE.Group {
  const root = new THREE.Group();
  root.name = "portal-trim";
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  const base = tone === "timber" ? m.stoneDark : m.slate;
  const trim = tone === "timber" ? m.woodDark : m.steel;

  for (const side of [-1, 1]) {
    const x = (side * width) / 2;
    // 柱础（石）+ 柱帽（压条）
    kit.add(boxGeo(0.96, 0.26, 1.0, 0.04), base, { x, y: TERRACE_TOP + 0.13, z });
    kit.add(boxGeo(0.86, 0.1, 0.9, 0.03), base, { x, y: TERRACE_TOP + 0.31, z });
    kit.add(boxGeo(0.8, 0.14, 0.86, 0.03), trim, { x, y: height - 0.38, z });
    // 牛腿：三角形托架
    const bracket = new THREE.Shape();
    bracket.moveTo(0, 0);
    bracket.lineTo(0.95, 0);
    bracket.lineTo(0, -0.95);
    bracket.closePath();
    const bGeo = new THREE.ExtrudeGeometry(bracket, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
    bGeo.translate(0, 0, -0.07);
    kit.add(bGeo, trim, { x: x - side * 0.26, y: height - 0.25, z, sx: -side });
    // 柱身两侧的竖向凹线
    for (const dz of [-0.33, 0.33]) {
      kit.add(boxGeo(0.06, (height - TERRACE_TOP) * 0.86, 0.04, 0.01), base, { x, y: (height + TERRACE_TOP) / 2, z: z + dz });
    }
  }
  // 横梁：上檐口压条 + 下沿装饰线 + 螺栓
  kit.add(boxGeo(width + 1.1, 0.14, 0.78, 0.035), trim, { y: height + 0.32, z });
  kit.add(boxGeo(width - 0.3, 0.08, 0.7, 0.02), trim, { y: height - 0.28, z });
  const bolts = Math.round(width / 0.9);
  for (let i = 0; i <= bolts; i++) {
    kit.add(cylGeo(0.035, 0.035, 0.05, 8), m.brass, { x: -width / 2 + (i * width) / bolts, y: height, z: z - 0.33, rx: Math.PI / 2 });
  }
  // 中央悬挂吊杆（两根）
  for (const x of [-width / 4, width / 4]) {
    kit.add(strutGeo([x, height - 0.3, z - 0.34], [x, height - 0.8, z - 0.34], 0.015, 5), m.steel);
    kit.add(new THREE.SphereGeometry(0.06, 8, 6), m.lampGlass, { x, y: height - 0.86, z: z - 0.34 });
  }
  kit.build(root, "portal-trim", { isLandscapeStage: true });
  return root;
}

/** 给矩形告示板加边框、顶灯与立柱托脚，使其像一块真正安装的招牌 */
export function buildSignFrame(width: number, height: number, x: number, y: number, z: number): THREE.Group {
  const root = new THREE.Group();
  root.name = "sign-frame";
  const m = createKitMaterials();
  const kit = new MergedBuilder();
  const t = 0.16;
  kit.add(boxGeo(width + t * 2, t, 0.34, 0.04), m.woodDark, { x, y: y + height / 2 + t / 2, z });
  kit.add(boxGeo(width + t * 2, t, 0.34, 0.04), m.woodDark, { x, y: y - height / 2 - t / 2, z });
  for (const side of [-1, 1]) {
    kit.add(boxGeo(t, height, 0.34, 0.04), m.woodDark, { x: x + side * (width / 2 + t / 2), y, z });
  }
  // 顶部鹅颈灯
  for (const lx of [-width / 3, 0, width / 3]) {
    kit.add(strutGeo([lx + x, y + height / 2 + t, z - 0.14], [lx + x, y + height / 2 + 0.5, z - 0.34], 0.02, 5), m.brass);
    kit.add(new THREE.ConeGeometry(0.17, 0.2, 10), m.brass, { x: lx + x, y: y + height / 2 + 0.5, z: z - 0.4, rx: 0.5 });
  }
  kit.build(root, "sign-frame", { isLandscapeStage: true });
  return root;
}
