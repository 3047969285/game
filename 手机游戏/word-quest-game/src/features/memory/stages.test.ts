import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createSceneKit } from "../world/sceneProps";
import { spawnActor } from "./actors";
import { Materializer } from "./Materializer";
import { buildWordObject } from "./memoryObjects";
import { PROLOGUE_SCRIPT } from "./scripts/prologue";
import { CLUB_ACTORS_FIXTURE, CLUB_OBJECTS_FIXTURE } from "./testFixtures";
import { buildStage, getStage, stageTargets } from "./stages";
import { CLUB_SEATS } from "./stages/clubRoom";

/** 前墙是一张朝向室内（法线 -z）的单面平面：从房间外面看是透明的（背面被剔除），也不会像盒子那样挡住相机 */
function expectFrontWallIsInwardPlane(wall: THREE.Object3D): void {
  let meshes = 0;
  wall.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    meshes++;
    expect(mesh.geometry.getAttribute("position").count).toBe(4);
    const n = mesh.geometry.getAttribute("normal");
    for (let i = 0; i < n.count; i++) expect(n.getZ(i)).toBeLessThan(-0.99);
    const mat = mesh.material as THREE.Material;
    expect(mat.side).toBe(THREE.FrontSide);
  });
  expect(meshes).toBe(1);
}

function countMeshes(root: THREE.Object3D, visibleOnly = false): number {
  let n = 0;
  root.traverse((o) => {
    if (!(o as THREE.Mesh).isMesh) return;
    if (visibleOnly) for (let p: THREE.Object3D | null = o; p; p = p.parent) if (!p.visible) return;
    n++;
  });
  return n;
}

describe("stages", () => {
  it("emptyRoom：顶层子 Group 名与 targets 一一对应，且都有网格", () => {
    const group = buildStage("emptyRoom", createSceneKit("low"));
    const names = group.children.map((c) => c.name).sort();
    expect(names).toEqual([...stageTargets("emptyRoom")].sort());
    for (const child of group.children) {
      let meshes = 0;
      child.traverse((o) => ((o as THREE.Mesh).isMesh ? meshes++ : 0));
      expect(meshes, child.name).toBeGreaterThan(0);
    }
  });

  it("emptyRoom 绘制调用预算：舞台部分网格数 ≤ 90（整个回忆 ≤ 150）", () => {
    const group = buildStage("emptyRoom", createSceneKit("high"));
    let meshes = 0;
    group.traverse((o) => ((o as THREE.Mesh).isMesh ? meshes++ : 0));
    expect(meshes).toBeLessThanOrEqual(90);
  });

  it("摆放位都在可走范围附近，机位朝向房间内部", () => {
    const def = getStage("emptyRoom");
    const all = [...def.slots.table, ...def.slots.hover, ...def.slots.floor];
    expect(all.length).toBeGreaterThanOrEqual(14);
    for (const p of all) {
      expect(p.x).toBeGreaterThan(def.bounds.minX - 1.5);
      expect(p.x).toBeLessThan(def.bounds.maxX + 1.5);
      expect(p.z).toBeGreaterThan(def.bounds.minZ - 1.5);
      expect(p.z).toBeLessThan(def.bounds.maxZ + 1.5);
    }
    for (const s of def.shots) {
      expect(Math.abs(s.to.x)).toBeLessThan(5.5);
      expect(Math.abs(s.to.z)).toBeLessThan(4.5);
    }
  });

  it("未知舞台抛错", () => {
    expect(() => getStage("nowhere")).toThrow();
  });

  it("emptyRoom 的前墙是朝向室内的单面平面、相机可以退到墙外（不再挡住 2090 年的他身后的视野）", () => {
    const def = getStage("emptyRoom");
    expect(def.cameraBounds).toBeDefined();
    expect(def.cameraBounds!.maxZ).toBeGreaterThan(def.bounds.maxZ + 2);
    const front = buildStage("emptyRoom", createSceneKit("low")).getObjectByName("wall_front")!;
    expectFrontWallIsInwardPlane(front);
  });

  it("emptyRoom 的灰泥墙是素净的暖色，地毯不是饱和的红", () => {
    const group = buildStage("emptyRoom", createSceneKit("low"));
    const colors = new Set<number>();
    group.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if ((o as THREE.Mesh).isMesh && m?.color) colors.add(m.color.getHex());
    });
    for (const hex of colors) {
      const c = new THREE.Color(hex);
      const hsl = { h: 0, s: 0, l: 0 };
      c.getHSL(hsl);
      // 没有高饱和的红色大面（旧地毯是 0xb04a40）
      expect(hsl.h < 0.04 && hsl.s > 0.5 && hsl.l > 0.3 && hsl.l < 0.6, hex.toString(16)).toBe(false);
    }
  });
});

describe("clubRoom（《周四的沉默》的舞台）", () => {
  const kit = createSceneKit("high");

  it("顶层子 Group 与 targets 一一对应，每个都有网格，名字唯一", () => {
    const group = buildStage("clubRoom", kit);
    const names = group.children.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
    expect([...names].sort()).toEqual([...stageTargets("clubRoom")].sort());
    for (const child of group.children) expect(countMeshes(child), child.name).toBeGreaterThan(0);
  });

  it("包含设计稿里的全部要素：窗、庭院（石板路、长椅、树）、黑板、书架、植物、长桌、手机篮、计划表、挂钟", () => {
    const targets = stageTargets("clubRoom");
    for (const t of ["window", "courtyard_ground", "courtyard_path", "benches", "tree_a", "tree_b", "board", "shelf", "plants", "table", "chairs", "basket", "plan", "clock", "sunlight"]) {
      expect(targets, t).toContain(t);
    }
    expect(getStage("clubRoom").targets.tree_a).toBe("grow");
  });

  it("回退绘制预算：舞台 + 五个可表情人物 + 全部物件 ≤ 165 个网格", () => {
    const stage = countMeshes(buildStage("clubRoom", kit));
    let actors = 0;
    for (const a of CLUB_ACTORS_FIXTURE) {
      const h = spawnActor(a, ["phone", "listen", "talk"]);
      h.setPose("phone");
      actors += countMeshes(h.root, true);
    }
    let objects = 0;
    for (const o of CLUB_OBJECTS_FIXTURE) objects += countMeshes(buildWordObject(o.wordId, kit, o.archetype));
    expect(stage).toBeLessThanOrEqual(85);
    // 回退身体保留独立眼白/虹膜/皮肤材质；本地真人资产为每人 3 个批次。
    expect(actors).toBeLessThanOrEqual(40);
    expect(stage + actors + objects).toBeLessThanOrEqual(165);
  });

  it("座位：五个人互不重叠，都靠着长桌；窗外的树不在太阳射入窗口的光路上（否则屋里全是树影）", () => {
    const seats = Object.values(CLUB_SEATS);
    for (let i = 0; i < seats.length; i++) {
      for (let j = i + 1; j < seats.length; j++) expect(Math.hypot(seats[i].x - seats[j].x, seats[i].z - seats[j].z)).toBeGreaterThan(1.0);
    }
    const def = getStage("clubRoom");
    for (const s of seats) {
      expect(Math.abs(s.x)).toBeLessThan(def.bounds.maxX);
      expect(Math.abs(s.z)).toBeLessThan(3);
    }
    // 光路：从窗洞 x∈[-2.9,2.9] 逆着阳光向窗外延伸，射线所在的 x 区间里不应有近处的树
    const sun = def.environment.sunDir;
    const group = buildStage("clubRoom", kit);
    for (const name of ["tree_a", "tree_b", "tree_c", "tree_d"]) {
      const box = new THREE.Box3().setFromObject(group.getObjectByName(name)!);
      const c = box.getCenter(new THREE.Vector3());
      const dz = -4 - c.z; // 窗墙到树的距离
      const off = sun.x * (dz / -sun.z); // 从窗口沿阳光方向退到树所在的纵深时，光路在 x 方向上的偏移
      const rayX0 = -2.9 + off;
      const rayX1 = 2.9 + off;
      const blocks = c.x > rayX0 - 1 && c.x < rayX1 + 1;
      expect(blocks, `${name} 挡在光路上: x=${c.x.toFixed(1)} 光路[${rayX0.toFixed(1)},${rayX1.toFixed(1)}]`).toBe(false);
    }
  });

  it("可走范围、出生点、相机范围：出生点在可走范围内，相机可以退到前墙之外", () => {
    const def = getStage("clubRoom");
    expect(def.spawn.x).toBeGreaterThan(def.bounds.minX);
    expect(def.spawn.x).toBeLessThan(def.bounds.maxX);
    expect(def.spawn.z).toBeLessThan(def.bounds.maxZ);
    expect(def.cameraBounds!.maxZ).toBeGreaterThan(def.bounds.maxZ + 3);
    const front = buildStage("clubRoom", kit).getObjectByName("wall_front")!;
    expectFrontWallIsInwardPlane(front);
  });

  it("透明的玻璃与纱帘不投影（否则太阳照不进房间）", () => {
    const win = buildStage("clubRoom", kit).getObjectByName("window")!;
    win.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && (m.material as THREE.Material).transparent) expect(m.castShadow).toBe(false);
    });
  });
});

describe("apartment2090（开场的舞台）", () => {
  const kit = createSceneKit("high");

  it("顶层子 Group 与 targets 一一对应；不显示 2090 年的玩家；有逐帧动画", () => {
    const group = buildStage("apartment2090", kit);
    const names = group.children.map((c) => c.name);
    expect([...names].sort()).toEqual([...stageTargets("apartment2090")].sort());
    for (const child of group.children) expect(countMeshes(child), child.name).toBeGreaterThan(0);
    const def = getStage("apartment2090");
    expect(def.showPlayer).toBe(false);
    expect(typeof def.animate).toBe("function");
  });

  it("窗外有成片的楼体（多层纵深）、悬浮交通的光迹、窗上的雨层；桌上有旧笔记本", () => {
    const group = buildStage("apartment2090", kit);
    const city = group.getObjectByName("city")!;
    let towers = 0;
    city.traverse((o) => {
      if ((o as THREE.Mesh).name === "towers") towers = ((o as THREE.Mesh).geometry.attributes.position.count / 24) | 0;
    });
    expect(towers).toBeGreaterThanOrEqual(30);
    const traffic = city.getObjectByName("traffic-streaks") as THREE.InstancedMesh;
    expect(traffic.count).toBeGreaterThanOrEqual(30);
    const rain = group.getObjectByName("rain-glass") as THREE.Mesh;
    expect((rain.material as THREE.ShaderMaterial).uniforms.uTime).toBeDefined();
    expect(group.getObjectByName("notebook")).toBeDefined();
    expect(group.getObjectByName("panel-face")).toBeDefined();
  });

  it("动画回调能推进雨与交通而不报错", () => {
    const def = getStage("apartment2090");
    const group = buildStage("apartment2090", kit);
    // 模拟 Materializer 开始显形：部件可见
    group.children.forEach((c) => (c.visible = true));
    def.animate!(group, 0.016, 1.0);
    def.animate!(group, 0.016, 3.5);
    const rain = group.getObjectByName("rain-glass") as THREE.Mesh;
    const u = (rain.material as THREE.ShaderMaterial).uniforms;
    expect(u.uTime.value).toBeCloseTo(3.5);
    expect(u.uFade.value).toBeGreaterThan(0.9);
  });
});

describe("手写舞台与 Materializer 的配合", () => {
  const kit = createSceneKit("high");

  it("clubRoom：全部部件、人物、物件都能注册、显形到完成，显形后可见，隐藏部件不产生绘制", () => {
    const m = new Materializer({ headless: true });
    const group = buildStage("clubRoom", kit);
    const registered: THREE.Object3D[] = [];
    for (const child of group.children) {
      m.register(child, getStage("clubRoom").targets[child.name] ?? "rise");
      registered.push(child);
      expect(child.visible, `${child.name} 注册后应隐藏`).toBe(false);
    }
    for (const o of CLUB_OBJECTS_FIXTURE) {
      const g = buildWordObject(o.wordId, kit, o.archetype);
      m.register(g, "condense");
      registered.push(g);
    }
    for (const a of CLUB_ACTORS_FIXTURE) {
      const h = spawnActor(a, ["phone", "listen", "talk"]);
      m.register(h.root, "fade");
      registered.push(h.root);
    }
    registered.forEach((o) => void m.reveal(o, 0.5));
    for (let i = 0; i < 60; i++) m.update(0.05);
    for (const o of registered) expect(m.isRevealed(o), o.name).toBe(true);
    m.dispose();
  });

  it("apartment2090：着色器材质（雨）、实例化网格（交通）、叠加混合的面板都能注册并显形", () => {
    const m = new Materializer({ headless: true });
    const group = buildStage("apartment2090", kit);
    for (const child of group.children) m.register(child, getStage("apartment2090").targets[child.name] ?? "fade");
    const act = spawnActor(PROLOGUE_SCRIPT.actors[0], ["listen", "point"]);
    m.register(act.root, "fade");
    group.children.forEach((c) => void m.reveal(c, 0.4));
    void m.reveal(act.root, 0.4);
    for (let i = 0; i < 40; i++) m.update(0.05);
    for (const c of group.children) expect(m.isRevealed(c), c.name).toBe(true);
    // 雨的材质是 Materializer 克隆的；动画回调必须作用在网格当前的材质上
    const rain = group.getObjectByName("rain-glass") as THREE.Mesh;
    getStage("apartment2090").animate!(group, 0.016, 2);
    expect((rain.material as THREE.ShaderMaterial).uniforms.uTime.value).toBe(2);
    m.dispose();
  });
});

describe("室内材质隔离", () => {
  it("构建两间教室不改写调用者的木材套件，材质仍可挂接显形补丁", () => {
    const kit = createSceneKit("high");
    const originalWood = kit.m.wood;
    const originalKey = originalWood.customProgramCacheKey();
    for (const name of ["emptyRoom", "clubRoom"]) {
      const room = buildStage(name,kit);
      expect(kit.m.wood).toBe(originalWood);
      expect(originalWood.customProgramCacheKey()).toBe(originalKey);
      const mz = new Materializer({headless:true});
      const p = mz.register(room.getObjectByName("table")!,"rise");
      const wood = p.clones.find(m=>m.name==="memory-interior-wood")!;
      expect(wood).toBeDefined();
      const shader = {
        uniforms: {},
        vertexShader: "#include <common>\n#include <begin_vertex>\n#include <project_vertex>",
        fragmentShader: "#include <common>\n#include <color_fragment>\n#include <clipping_planes_fragment>\n#include <dithering_fragment>",
      };
      wood.onBeforeCompile(shader as unknown as Parameters<THREE.Material["onBeforeCompile"]>[0], {} as THREE.WebGLRenderer);
      expect(shader.vertexShader).toContain("vInteriorP = transformed");
      expect(shader.fragmentShader).toContain("float iwGrain");
      expect(shader.fragmentShader).toContain("rvField(vRvPos)");
      expect(shader.uniforms).toHaveProperty("uRvAmt",p.u.uRvAmt);
      mz.dispose();
    }
  });
});
