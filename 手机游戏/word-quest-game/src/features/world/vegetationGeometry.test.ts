import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { FOLIAGE_ATLAS_CELLS, atlasRect } from "./foliageTextures";
import { createAncientTree, createBush, createPine, createTree, getBarkMaterial, getFoliageMaterial, shrubCardGeometries } from "./props";

function meshes(root: THREE.Object3D): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  root.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) out.push(o as THREE.Mesh);
  });
  return out;
}

function vertexCount(root: THREE.Object3D): number {
  return meshes(root).reduce((n, m) => n + m.geometry.attributes.position.count, 0);
}

function foliageMesh(root: THREE.Object3D): THREE.Mesh {
  const m = meshes(root).find((x) => x.material === getFoliageMaterial());
  if (!m) throw new Error("no foliage mesh");
  return m;
}

/** 预算（顶点数）：high / low */
const BUDGET = {
  tree: { high: 12000, low: 2500 },
  pine: { high: 8000, low: 2000 },
  bush: { high: 3000, low: 800 },
};

describe("vegetation vertex budgets", () => {
  it("broadleaf tree fits the budget", () => {
    for (const s of [1, 1.13, 1.27]) {
      expect(vertexCount(createTree(s, "high"))).toBeLessThanOrEqual(BUDGET.tree.high);
      expect(vertexCount(createTree(s, "low"))).toBeLessThanOrEqual(BUDGET.tree.low);
    }
  });
  it("pine fits the budget", () => {
    for (const s of [1, 1.13, 1.27]) {
      expect(vertexCount(createPine(s, "high"))).toBeLessThanOrEqual(BUDGET.pine.high);
      expect(vertexCount(createPine(s, "low"))).toBeLessThanOrEqual(BUDGET.pine.low);
    }
  });
  it("bush fits the budget (berries included)", () => {
    for (const s of [1, 1.13, 1.27]) {
      expect(vertexCount(createBush(s, "high"))).toBeLessThanOrEqual(BUDGET.bush.high);
      expect(vertexCount(createBush(s, "low"))).toBeLessThanOrEqual(BUDGET.bush.low);
    }
  });
  it("low detail is much lighter than high detail", () => {
    expect(vertexCount(createTree(1, "low"))).toBeLessThan(vertexCount(createTree(1, "high")) / 3);
    expect(vertexCount(createPine(1, "low"))).toBeLessThan(vertexCount(createPine(1, "high")) / 2);
  });
});

describe("foliage geometry", () => {
  const cases: Array<[string, THREE.Group]> = [
    ["tree high", createTree(1, "high")],
    ["tree low", createTree(1, "low")],
    ["pine high", createPine(1, "high")],
    ["pine low", createPine(1, "low")],
    ["bush high", createBush(1, "high")],
    ["bush low", createBush(1, "low")],
    ["ancient", createAncientTree()],
  ];

  for (const [name, root] of cases) {
    it(`${name}: leaf cards are pure quads with uv, colour and sway on every vertex`, () => {
      const geo = foliageMesh(root).geometry;
      const n = geo.attributes.position.count;
      expect(n % 4).toBe(0);
      expect(geo.index!.count).toBe((n / 4) * 6);
      expect(geo.attributes.uv.count).toBe(n);
      expect(geo.attributes.color.count).toBe(n);
      expect(geo.attributes.normal.count).toBe(n);
      expect(geo.attributes.aSway.count).toBe(n);
      expect(geo.attributes.aSway.itemSize).toBe(2);
      for (let i = 0; i < n; i++) {
        expect(Number.isFinite(geo.attributes.position.getX(i) + geo.attributes.position.getY(i) + geo.attributes.position.getZ(i))).toBe(true);
        const c = geo.attributes.color.getX(i);
        expect(c).toBeGreaterThan(0);
        expect(c).toBeLessThan(2);
      }
    });

    it(`${name}: wood has bark uv and shares the singleton bark material`, () => {
      const wood = meshes(root).filter((m) => m !== foliageMesh(root) && m.material !== undefined && (m.material === getBarkMaterial("broadleaf") || m.material === getBarkMaterial("conifer")));
      expect(wood.length).toBe(1);
      expect(wood[0].geometry.attributes.uv.count).toBe(wood[0].geometry.attributes.position.count);
      expect(wood[0].geometry.attributes.aSway).toBeDefined();
    });
  }

  it("pine cards sample only the conifer cell; broadleaf cards only leaf cells", () => {
    const within = (geo: THREE.BufferGeometry, cells: number[]): boolean => {
      const rects = cells.map((c) => atlasRect(c));
      const uv = geo.attributes.uv;
      for (let i = 0; i < uv.count; i++) {
        const ok = rects.some(([u0, v0, u1, v1]) => uv.getX(i) >= u0 - 1e-6 && uv.getX(i) <= u1 + 1e-6 && uv.getY(i) >= v0 - 1e-6 && uv.getY(i) <= v1 + 1e-6);
        if (!ok) return false;
      }
      return true;
    };
    expect(within(foliageMesh(createPine(1, "high")).geometry, [FOLIAGE_ATLAS_CELLS.conifer])).toBe(true);
    expect(within(foliageMesh(createTree(1, "high")).geometry, [FOLIAGE_ATLAS_CELLS.broadleaf, FOLIAGE_ATLAS_CELLS.broadleafDark])).toBe(true);
    expect(within(foliageMesh(createBush(1, "high")).geometry, [FOLIAGE_ATLAS_CELLS.shrub])).toBe(true);
  });

  it("pine is a layered branch structure, not a cone: width is spread over many separate branches and cards", () => {
    const geo = foliageMesh(createPine(1, "high")).geometry;
    // 卡片中心的水平半径应分布在很宽的范围内，且每一层都有（高度分层）
    const p = geo.attributes.position;
    const layers = new Set<number>();
    let rMax = 0;
    for (let i = 0; i < p.count; i += 4) {
      layers.add(Math.floor(p.getY(i) / 0.4));
      rMax = Math.max(rMax, Math.hypot(p.getX(i), p.getZ(i)));
    }
    expect(layers.size).toBeGreaterThanOrEqual(8);
    expect(rMax).toBeGreaterThan(1.2);
    expect(p.count / 4).toBeGreaterThan(300); // 大量枝片卡片
  });

  it("sway weight grows with height and is zero at the ground", () => {
    const root = createTree(1, "high");
    for (const m of meshes(root)) {
      const sw = m.geometry.attributes.aSway;
      const p = m.geometry.attributes.position;
      let low = Infinity;
      let high = 0;
      let top = -Infinity;
      for (let i = 0; i < p.count; i++) {
        top = Math.max(top, p.getY(i));
        if (p.getY(i) < 0.1) low = Math.min(low, sw.getX(i));
        high = Math.max(high, sw.getX(i));
      }
      expect(high).toBeGreaterThan(0);
      if (Number.isFinite(low)) expect(low).toBeLessThan(high * 0.05);
      expect(top).toBeGreaterThan(1);
    }
  });

  it("shrubCardGeometries still produce cards compatible with the foliage material", () => {
    const cards = shrubCardGeometries(5, 1, 6);
    expect(cards).toHaveLength(6);
    for (const c of cards) {
      expect(c.attributes.uv).toBeDefined();
      expect(c.attributes.color).toBeDefined();
      expect(c.attributes.aSway).toBeDefined();
      expect(c.index).not.toBeNull();
    }
  });
});

describe("shared materials", () => {
  it("foliage material is an alpha-tested double-sided singleton with atlas and normal map", () => {
    const m = getFoliageMaterial();
    expect(getFoliageMaterial()).toBe(m);
    expect(m.alphaTest).toBeGreaterThan(0.3);
    expect(m.side).toBe(THREE.DoubleSide);
    expect(m.map).toBeTruthy();
    expect(m.normalMap).toBeTruthy();
    expect(m.vertexColors).toBe(true);
  });
  it("bark materials are per-kind singletons with textures", () => {
    expect(getBarkMaterial("broadleaf")).toBe(getBarkMaterial("broadleaf"));
    expect(getBarkMaterial("conifer")).not.toBe(getBarkMaterial("broadleaf"));
    expect(getBarkMaterial("conifer").map).toBeTruthy();
    expect(getBarkMaterial("conifer").normalMap).toBeTruthy();
  });
  it("tree meshes carry wind-aware shadow materials that keep alpha cut-out", () => {
    const tree = createTree(1, "high");
    const f = foliageMesh(tree);
    expect(f.castShadow).toBe(true);
    expect(f.customDepthMaterial).toBeInstanceOf(THREE.MeshDepthMaterial);
    expect(f.customDistanceMaterial).toBeInstanceOf(THREE.MeshDistanceMaterial);
    expect(f.customDepthMaterial!.alphaTest).toBeGreaterThan(0.3);
    expect((f.customDepthMaterial as THREE.MeshDepthMaterial).map).toBe(getFoliageMaterial().map);
    for (const m of meshes(tree)) expect(m.customDepthMaterial).toBeDefined();
  });
});

describe("buildVegetationField with the new foliage", () => {
  it("batches bark and leaves per shared material, keeps sway data and wind-aware shadows", async () => {
    const { buildVegetationField } = await import("./vegetationField");
    const inst = (kind: "broadleaf" | "pine" | "bush", i: number) => ({ kind, variant: i % 3, x: i * 5, y: 0, z: i * 3, rotY: i, scale: 1 });
    const list = [0, 1, 2, 3].flatMap((i) => [inst("broadleaf", i), inst("pine", i), inst("bush", i)]);
    const field = buildVegetationField(list, { lodDistance: 70 });
    const batches = field.group.children as THREE.BatchedMesh[];
    // 阔叶 + 针叶树皮、叶片、灌木浆果（若有）：材质单例 → 批次数很少
    expect(batches.length).toBeLessThanOrEqual(4);
    const foliageBatch = batches.find((b) => b.material === getFoliageMaterial())!;
    expect(foliageBatch).toBeDefined();
    expect(foliageBatch.geometry.attributes.aSway).toBeDefined();
    expect(foliageBatch.customDepthMaterial).toBeInstanceOf(THREE.MeshDepthMaterial);
    expect(foliageBatch.customDistanceMaterial).toBeInstanceOf(THREE.MeshDistanceMaterial);
    for (const b of batches) {
      if (b.material === getBarkMaterial("broadleaf") || b.material === getBarkMaterial("conifer")) {
        expect(b.customDepthMaterial).toBeDefined();
        expect(b.geometry.attributes.uv).toBeDefined();
      }
    }
    field.dispose();
  });
});
