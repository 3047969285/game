import * as THREE from "three";
import { afterEach, describe, expect, it } from "vitest";
import { MergedBuilder, boxGeo, createKitMaterials } from "./detailKit";
import {
  KIT_BASE_ATTRIBUTE,
  applyKitPattern,
  classifySurface,
  disposeSurfaceArrays,
  getSurfaceArrays,
  isKitMaterial,
  setSurfaceQuality,
  tagKitGeometry,
} from "./kitShader";
import { applySurfaceGrain } from "./materials";
import { SURFACE_KINDS } from "./surfaceTextures";

const std = (color: number, roughness = 0.85, metalness = 0.02, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** 模拟 three 在编译前交给 onBeforeCompile 的着色器对象 */
function compile(mat: THREE.MeshStandardMaterial) {
  const shader = {
    uniforms: {} as Record<string, THREE.IUniform>,
    vertexShader: "#include <common>\nvoid main(){\n#include <begin_vertex>\n}",
    fragmentShader:
      "#include <common>\nvoid main(){\n#include <color_fragment>\n#include <roughnessmap_fragment>\n#include <normal_fragment_maps>\n#include <aomap_fragment>\n}",
  };
  mat.onBeforeCompile(shader as unknown as THREE.WebGLProgramParametersWithUniforms, {} as THREE.WebGLRenderer);
  return shader;
}

afterEach(() => {
  disposeSurfaceArrays();
  setSurfaceQuality("high");
});

describe("classifySurface", () => {
  it("classifies typical colors", () => {
    expect(classifySurface(std(0x9aa3ad, 0.4, 0.8))).toBe("metal");
    expect(classifySurface(std(0x8a6a4a, 0.82))).toBe("wood");
    expect(classifySurface(std(0x765b42, 0.88))).toBe("wood");
    expect(classifySurface(std(0x8b3a2b, 0.85))).toBe("brick");
    expect(classifySurface(std(0xd8cfb8, 0.9))).toBe("plaster");
    expect(classifySurface(std(0x8d9085, 0.92))).toBe("masonry");
    expect(classifySurface(std(0xc8c8c4, 0.9))).toBe("concrete");
  });

  it("honors an explicit hint over color", () => {
    expect(classifySurface(std(0x8d9085, 0.9), "brick")).toBe("brick");
    expect(classifySurface(std(0x8d9085, 0.9), "not-a-kind")).toBe("masonry");
    const m = std(0x8d9085);
    m.userData.surfaceKind = "concrete";
    expect(classifySurface(m)).toBe("concrete");
  });

  it("returns null for emissive, transparent, vertex-color, textured and shared materials", () => {
    expect(classifySurface(std(0x8a6a4a, 0.8, 0, { emissive: 0xffc15a, emissiveIntensity: 0.9 }))).toBeNull();
    expect(classifySurface(std(0x8a6a4a, 0.8, 0, { transparent: true, opacity: 0.5 }))).toBeNull();
    expect(classifySurface(std(0x8a6a4a, 0.8, 0, { vertexColors: true }))).toBeNull();
    expect(classifySurface(std(0x8a6a4a, 0.8, 0, { map: new THREE.Texture() }))).toBeNull();
    expect(classifySurface(std(0x8a6a4a, 0.8, 0, { normalMap: new THREE.Texture() }))).toBeNull();
    const shared = std(0x8a6a4a);
    shared.userData.shared = true;
    expect(classifySurface(shared)).toBeNull();
    expect(classifySurface(new THREE.MeshPhysicalMaterial({ color: 0x8a6a4a }) as unknown as THREE.MeshStandardMaterial)).toBeNull();
  });

  it("leaves stylized and organic colors alone (foliage, water, sci-fi panels, soil, paper)", () => {
    expect(classifySurface(std(0x3f6f45, 0.95))).toBeNull();
    expect(classifySurface(std(0x78815a, 0.96))).toBeNull();
    expect(classifySurface(std(0x34485e, 0.84, 0.12))).toBeNull();
    expect(classifySurface(std(0x4a3b2c, 1))).toBeNull();
    expect(classifySurface(std(0xb5966c, 0.96))).toBeNull();
    expect(classifySurface(std(0xece3cf, 0.95))).toBeNull();
    expect(classifySurface(std(0xff3366, 0.5))).toBeNull();
  });
});

describe("shared surface arrays", () => {
  it("builds 8 layers once, flags them shared, and rebuilds after dispose", () => {
    setSurfaceQuality("low");
    const a = getSurfaceArrays();
    expect(getSurfaceArrays()).toBe(a);
    expect(a.quality).toBe("low");
    expect(a.size).toBe(256);
    expect(a.albedo.image.depth).toBe(SURFACE_KINDS.length);
    expect(a.normal.image.depth).toBe(SURFACE_KINDS.length);
    expect(a.albedo.userData.shared).toBe(true);
    expect(a.albedo.colorSpace).toBe(THREE.NoColorSpace);
    expect(a.generationMs).toBeGreaterThan(0);
    disposeSurfaceArrays();
    setSurfaceQuality("high");
    const b = getSurfaceArrays();
    expect(b).not.toBe(a);
    expect(b.size).toBe(512);
  });

  it("ignores a quality change after the arrays exist", () => {
    const a = getSurfaceArrays("high");
    setSurfaceQuality("low");
    expect(getSurfaceArrays("low")).toBe(a);
    expect(a.quality).toBe("high");
  });
});

describe("applyKitPattern", () => {
  it("accepts the legacy kind names and marks the material", () => {
    for (const k of ["masonry", "paving", "wood", "tiles"] as const) {
      const m = std(0x999999);
      applyKitPattern(m, k);
      expect(isKitMaterial(m)).toBe(true);
      expect(m.userData.kitKind).toBe(k);
    }
  });

  it("binds non-null array textures at compile time (never a null sampler)", () => {
    const m = std(0x999999);
    applyKitPattern(m, "brick");
    const shader = compile(m);
    expect(shader.uniforms.uKitAlb.value).toBeInstanceOf(THREE.DataArrayTexture);
    expect(shader.uniforms.uKitNrm.value).toBeInstanceOf(THREE.DataArrayTexture);
    expect(shader.uniforms.uKitGrime.value).toBe(1);
    expect(shader.uniforms.uKitWear.value).toBe(1);
  });

  it("injects triplanar color / normal / roughness / AO and grime / wear, with the right layer", () => {
    const m = std(0x999999);
    applyKitPattern(m, "metal");
    const s = compile(m);
    expect(s.fragmentShader).toContain("texture(uKitAlb");
    expect(s.fragmentShader).toContain("kAo");
    expect(s.fragmentShader).toContain("fwidth");
    expect(s.fragmentShader).toContain("vKitH");
    expect(s.fragmentShader).toMatch(/reflectedLight\.indirectDiffuse \*= kAo/);
    expect(s.fragmentShader).toContain(`${SURFACE_KINDS.indexOf("metal").toFixed(1)})`);
    expect(s.vertexShader).toContain("aKitBase");
    expect(s.vertexShader).toContain("instanceMatrix");
    // 高画质：三个投影；有雨痕
    expect(s.fragmentShader).toContain("kUZ");
    expect(s.fragmentShader).toContain("kS1");
  });

  it("low quality uses two planes and no rain streaks", () => {
    setSurfaceQuality("low");
    const m = std(0x999999);
    applyKitPattern(m, "plaster");
    const s = compile(m);
    expect(s.fragmentShader).toContain("kWt");
    expect(s.fragmentShader).not.toContain("kUZ");
    expect(s.fragmentShader).not.toContain("kS1");
  });

  it("uses distinct program cache keys per kind and per quality", () => {
    const keys = new Set<string>();
    for (const k of SURFACE_KINDS) {
      const m = std(0x999999);
      applyKitPattern(m, k);
      keys.add(m.customProgramCacheKey());
    }
    expect(keys.size).toBe(SURFACE_KINDS.length);
    const hi = std(0x999999);
    applyKitPattern(hi, "wood");
    const keyHigh = hi.customProgramCacheKey();
    getSurfaceArrays("low");
    expect(hi.customProgramCacheKey()).not.toBe(keyHigh);
  });

  it("only patches once; a second call just updates grime / wear", () => {
    const m = std(0x999999);
    applyKitPattern(m, "masonry", { grime: 0.3 });
    const hook = m.onBeforeCompile;
    applyKitPattern(m, "wood", { wear: 0.5 });
    expect(m.onBeforeCompile).toBe(hook);
    expect(m.userData.kitKind).toBe("masonry");
    const s = compile(m);
    expect(s.uniforms.uKitGrime.value).toBe(0.3);
    expect(s.uniforms.uKitWear.value).toBe(0.5);
  });

  it("keeps working when the renderer recompiles (uniform values are shared, not stale)", () => {
    const m = std(0x999999);
    applyKitPattern(m, "tiles");
    const a = compile(m);
    const b = compile(m);
    expect(b.uniforms.uKitGrime).toBe(a.uniforms.uKitGrime);
  });
});

describe("kit geometry base height", () => {
  it("tagKitGeometry stores the lowest point once", () => {
    const g = new THREE.BoxGeometry(1, 2, 1);
    g.translate(0, 3, 0);
    tagKitGeometry(g);
    const attr = g.getAttribute(KIT_BASE_ATTRIBUTE);
    expect(attr.itemSize).toBe(2);
    expect(attr.count).toBe(g.getAttribute("position").count);
    expect(attr.getX(0)).toBeCloseTo(2, 5);
    expect(attr.getY(0)).toBe(1);
    tagKitGeometry(g);
    expect(g.getAttribute(KIT_BASE_ATTRIBUTE)).toBe(attr);
  });

  it("MergedBuilder tags kit meshes and tolerates already tagged geometry", () => {
    const m = createKitMaterials();
    const shared = boxGeo(1, 1, 1, 0.01);
    tagKitGeometry(shared);
    const kit = new MergedBuilder();
    kit.add(shared, m.stone, { y: 0.5 });
    kit.add(boxGeo(2, 1, 1, 0.01), m.stone, { x: 3, y: 0.5 });
    kit.add(boxGeo(1, 1, 1, 0.01), m.leaf, { x: -3, y: 0.5 });
    const parent = new THREE.Group();
    const meshes = kit.build(parent);
    expect(meshes).toHaveLength(2);
    const stoneMesh = meshes.find((x) => x.material === m.stone)!;
    expect(stoneMesh.geometry.getAttribute("position").count).toBeGreaterThan(24);
    expect(stoneMesh.geometry.getAttribute(KIT_BASE_ATTRIBUTE).getX(0)).toBeCloseTo(0, 3);
    const leafMesh = meshes.find((x) => x.material === m.leaf)!;
    expect(leafMesh.geometry.getAttribute(KIT_BASE_ATTRIBUTE)).toBeUndefined();
  });
});

describe("createKitMaterials", () => {
  it("maps building materials to surface kinds and leaves glass / lamp / soil / foliage alone", () => {
    const m = createKitMaterials();
    expect([m.stone, m.stoneDark, m.stoneWarm].map((x) => x.userData.kitKind)).toEqual(["masonry", "masonry", "masonry"]);
    expect([m.paveA, m.paveB].map((x) => x.userData.kitKind)).toEqual(["paving", "paving"]);
    expect([m.wood, m.woodDark].map((x) => x.userData.kitKind)).toEqual(["wood", "wood"]);
    expect([m.terracottaRoof, m.slate].map((x) => x.userData.kitKind)).toEqual(["tiles", "tiles"]);
    expect([m.brass, m.steel, m.copper, m.darkSteel].map((x) => x.userData.kitKind)).toEqual(["metal", "metal", "metal", "metal"]);
    for (const untouched of [m.soil, m.lampGlass, m.glass, m.leaf, m.leafLight, m.paper]) expect(isKitMaterial(untouched)).toBe(false);
    expect(m.stone.fog).toBe(false);
  });
});

describe("applySurfaceGrain", () => {
  it("upgrades classifiable plain materials to kit surfaces once and tags their geometry", () => {
    const wood = std(0x765b42, 0.88);
    const brick = std(0x8b3a2b, 0.85);
    const grass = std(0x3f6f45, 0.95);
    const glow = std(0x8a6a4a, 0.5, 0, { emissive: 0xffaa33, emissiveIntensity: 1 });
    const root = new THREE.Group();
    const geos = [wood, wood, brick, grass, glow].map((mat, i) => {
      const g = new THREE.BoxGeometry(1, 1, 1);
      const mesh = new THREE.Mesh(g, mat);
      mesh.position.x = i;
      root.add(mesh);
      return g;
    });
    applySurfaceGrain(root);
    applySurfaceGrain(root);
    expect(wood.userData.kitKind).toBe("wood");
    expect(brick.userData.kitKind).toBe("brick");
    expect(isKitMaterial(grass)).toBe(false);
    expect(isKitMaterial(glow)).toBe(false);
    for (const i of [0, 1, 2]) expect(geos[i].getAttribute(KIT_BASE_ATTRIBUTE)).toBeDefined();
    expect(geos[3].getAttribute(KIT_BASE_ATTRIBUTE)).toBeUndefined();
    // 未归类的纯色材质仍然得到旧的颗粒效果
    const s = { uniforms: {}, vertexShader: "#include <begin_vertex>", fragmentShader: "#include <color_fragment>" };
    grass.onBeforeCompile(s as unknown as THREE.WebGLProgramParametersWithUniforms, {} as THREE.WebGLRenderer);
    expect(s.vertexShader).toContain("vGrainWorld");
  });

  it("leaves people and noSurface subtrees on the grain-only path", () => {
    const skin = std(0xe2b898, 0.55);
    const hair = std(0x4a3020, 0.3);
    const prop = std(0x765b42, 0.88);
    const person = new THREE.Group();
    person.name = "scene-person";
    person.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), skin));
    const inner = new THREE.Group();
    inner.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), hair));
    person.add(inner);
    const tagged = new THREE.Group();
    tagged.userData.noSurface = true;
    tagged.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), prop));
    const root = new THREE.Group();
    root.add(person, tagged);
    applySurfaceGrain(root);
    for (const m of [skin, hair, prop]) expect(isKitMaterial(m)).toBe(false);
  });

  it("does not stack grain on top of kit materials", () => {
    const m = createKitMaterials();
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), m.stone);
    const root = new THREE.Group();
    root.add(mesh);
    const hook = m.stone.onBeforeCompile;
    applySurfaceGrain(root);
    expect(m.stone.onBeforeCompile).toBe(hook);
    expect(mesh.geometry.getAttribute(KIT_BASE_ATTRIBUTE)).toBeDefined();
  });
});
