import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { Materializer, applyRevealPatch, type RevealUniforms } from "./Materializer";

function piece(name: string, shared: THREE.Material, x = 0): THREE.Group {
  const g = new THREE.Group();
  g.name = name;
  const m = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), shared);
  m.position.set(x, 1, 0);
  m.castShadow = true;
  g.add(m);
  g.updateMatrixWorld(true);
  return g;
}

describe("Materializer（headless）", () => {
  it("共享材质按 Piece 克隆：每个 Piece 的材质实例与 uniform 互相独立", () => {
    const shared = new THREE.MeshStandardMaterial({ color: 0x884422 });
    const a = piece("a", shared);
    const b = piece("b", shared, 3);
    const mz = new Materializer({ headless: true });
    const pa = mz.register(a, "rise");
    const pb = mz.register(b, "rise");

    const matA = (a.children[0] as THREE.Mesh).material as THREE.Material;
    const matB = (b.children[0] as THREE.Mesh).material as THREE.Material;
    expect(matA).not.toBe(shared);
    expect(matB).not.toBe(shared);
    expect(matA).not.toBe(matB);
    expect(pa.u.uRvAmt).not.toBe(pb.u.uRvAmt);
    // 原材质保持原样：不带补丁，也不会被改动
    expect(shared.onBeforeCompile.toString()).not.toContain("uRv");

    void mz.reveal("a", 2);
    mz.update(1);
    expect(pa.u.uRvAmt.value).toBeGreaterThan(0.3);
    expect(pb.u.uRvAmt.value).toBe(0);
    mz.dispose();
  });

  it("注册后不可见；显形过程中可见；完成后 amt=1 并 resolve", async () => {
    const mz = new Materializer({ headless: true });
    const g = piece("wall", new THREE.MeshStandardMaterial());
    mz.register(g, "rise");
    expect(g.visible).toBe(false);
    expect(mz.isRevealed("wall")).toBe(false);
    let resolved = false;
    void mz.reveal("wall", 1).then(() => (resolved = true));
    expect(g.visible).toBe(true);
    mz.update(0.5);
    expect(mz.isRevealing("wall")).toBe(true);
    mz.update(0.6);
    await Promise.resolve();
    expect(mz.isRevealed("wall")).toBe(true);
    expect(resolved).toBe(true);
    expect(mz.piece("wall")!.u.uRvAmt.value).toBe(1);
    mz.dispose();
  });

  it("reduced motion 立即显示表面，但保留原显形时长与完成回调", async () => {
    const mz = new Materializer({ headless: true, reducedMotion: true });
    const g = piece("quiet-wall", new THREE.MeshStandardMaterial());
    const p = mz.register(g, "rise");
    let resolved = false;
    void mz.reveal("quiet-wall", 1).then(() => (resolved = true));

    mz.update(0.25);
    expect(mz.isRevealing("quiet-wall")).toBe(true);
    expect(p.amt).toBeLessThan(1);
    expect(p.u.uRvAmt.value).toBe(1);
    expect(p.u.uRvPulse.value).toBe(0);
    expect(resolved).toBe(false);

    mz.update(0.8);
    await Promise.resolve();
    expect(mz.isRevealed("quiet-wall")).toBe(true);
    expect(resolved).toBe(true);
    mz.dispose();
  });

  it("幽灵态：未显形也可见；hide 反向溶解后重新不可见", () => {
    const mz = new Materializer({ headless: true });
    const g = piece("orb", new THREE.MeshStandardMaterial());
    mz.register(g, "condense");
    mz.setGhost("orb", 0.5);
    expect(g.visible).toBe(true);
    mz.setGhost("orb", 0);
    expect(g.visible).toBe(false);
    void mz.reveal("orb", 0.5);
    mz.update(1);
    expect(mz.isRevealed("orb")).toBe(true);
    void mz.hide("orb", 0.5);
    mz.update(1);
    expect(mz.isRevealed("orb")).toBe(false);
    expect(g.visible).toBe(false);
    mz.dispose();
  });

  it("名字必须唯一", () => {
    const mz = new Materializer({ headless: true });
    mz.register(piece("x", new THREE.MeshStandardMaterial()), "fade");
    expect(() => mz.register(piece("x", new THREE.MeshStandardMaterial()), "fade")).toThrow();
    mz.dispose();
  });

  it("castShadow 的网格获得带溶解丢弃的深度材质", () => {
    const mz = new Materializer({ headless: true });
    const g = piece("t", new THREE.MeshStandardMaterial());
    mz.register(g, "rise");
    const depth = (g.children[0] as THREE.Mesh).customDepthMaterial;
    expect(depth).toBeInstanceOf(THREE.MeshDepthMaterial);
    mz.dispose();
  });

  it("着色器补丁：uniform 以引用方式接入，保留原有 include，并给程序缓存键追加标记", () => {
    const src = new THREE.MeshStandardMaterial();
    const clone = src.clone();
    const u = new Materializer({ headless: true }).register(piece("p", src), "rise").u as RevealUniforms;
    applyRevealPatch(clone, src, u, false);
    const shader = {
      uniforms: {} as Record<string, { value: unknown }>,
      vertexShader: "#include <common>\nvoid main(){\n#include <begin_vertex>\n#include <project_vertex>\n}",
      fragmentShader: "#include <common>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 normal;\n#include <dithering_fragment>\n}\nvarying vec3 vViewPosition; // normal_fragment_begin",
    };
    clone.onBeforeCompile(shader as never, undefined as never);
    expect(shader.uniforms.uRvAmt).toBe(u.uRvAmt);
    expect(shader.fragmentShader).toContain("discard");
    expect(shader.fragmentShader).toContain("#include <clipping_planes_fragment>");
    expect(shader.fragmentShader).toContain("RV_PULSE");
    expect(shader.vertexShader).toContain("vRvPos");
    expect(shader.fragmentShader).toContain("floor(vRvPos * 28.0");
    expect(shader.fragmentShader).not.toContain("floor(uRvTime * 8.0)");
    expect(clone.customProgramCacheKey()).toContain("rv1|c");
    expect(clone.customProgramCacheKey()).not.toBe(src.customProgramCacheKey());
  });
});
