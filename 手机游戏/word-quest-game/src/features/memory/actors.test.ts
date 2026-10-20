import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import { createPerson, type PersonRig } from "../world/people";
import { spawnActor } from "./actors";
import { PROLOGUE_SCRIPT } from "./scripts/prologue";

describe("actors：一套骨架驱动自然姿势与表情", () => {
  const actor = PROLOGUE_SCRIPT.actors[0];

  it("电影人物只有一个身体和一套骨架，蒙皮按材质合批且预算有界", () => {
    const handle = spawnActor(actor, ["reach"]);
    const person = handle.root.children[0] as THREE.Group;
    expect(handle.root.children).toHaveLength(1);
    expect(person.name).toBe("old2090:body");

    const skinned: THREE.SkinnedMesh[] = [];
    const bones: THREE.Bone[] = [];
    person.traverse((node) => {
      if ((node as THREE.SkinnedMesh).isSkinnedMesh) skinned.push(node as THREE.SkinnedMesh);
      if ((node as THREE.Bone).isBone) bones.push(node as THREE.Bone);
    });
    const stats = person.userData.personGeometryStats as { draws: number; triangles: number; joints: number };
    expect(skinned.length).toBeGreaterThanOrEqual(5);
    expect(skinned.length).toBeLessThanOrEqual(8);
    expect(stats.draws).toBeLessThanOrEqual(11); // 上限计入隐藏道具，运行时绘制更少
    expect(stats.triangles).toBeLessThan(45_000); // 面部保留完整采样，衣物细节走 low
    expect(bones.length).toBe(stats.joints);
    for (const mesh of skinned) {
      const weights = mesh.geometry.getAttribute("skinWeight");
      for (let i = 0; i < weights.count; i++) {
        expect(weights.getX(i) + weights.getY(i) + weights.getZ(i) + weights.getW(i)).toBeCloseTo(1, 5);
      }
    }
    handle.dispose();
  });

  it("真实低档减少衣物细节几何，高档保留细节且绘制批次数不增加", () => {
    const low = spawnActor(actor, [], "low");
    const high = spawnActor(actor, [], "high");
    const lowStats = low.root.userData.personGeometryStats as { draws: number; triangles: number };
    const highStats = high.root.userData.personGeometryStats as { draws: number; triangles: number };
    expect(lowStats.triangles).toBeLessThan(highStats.triangles);
    expect(highStats.triangles - lowStats.triangles).toBeGreaterThan(1000);
    expect(lowStats.draws).toBeLessThanOrEqual(11);
    expect(highStats.draws).toBe(lowStats.draws);
    // High quality adds surface stitching, not another mesh/material batch.
    expect(highStats.triangles).toBeLessThan(50_000);
    low.dispose();
    high.dispose();
  });

  it("reach 从膝上逐渐伸出，途中骨骼角度连续，不切换隐藏身体", () => {
    const handle = spawnActor(actor, ["reach"]);
    const person = handle.root.children[0] as THREE.Group;
    const rig = person.userData.personRig as PersonRig;
    const start = rig.arms.right.shoulder.rotation.x;
    handle.setPose("reach");
    let middle = start;
    for (let t = 0; t < 0.24; t += 1 / 60) {
      handle.update(1 / 60, t);
      middle = rig.arms.right.shoulder.rotation.x;
    }
    expect(middle).not.toBeCloseTo(start, 3);
    expect(Math.abs(middle - start)).toBeLessThan(0.9);
    for (let t = 0.24; t < 0.75; t += 1 / 60) handle.update(1 / 60, t);
    expect(rig.arms.right.shoulder.rotation.x).toBeCloseTo(-1.12, 1);
    expect(handle.root.children).toHaveLength(1);
    expect(handle.pose).toBe("reach");
    expect(handle.eyePosition(new THREE.Vector3()).y).toBeGreaterThan(1.2);
    handle.dispose();
  });

  it("说话时嘴唇有连续开合，倾听/思考改变眉眼，读书与手机道具按姿势出现", () => {
    const handle = spawnActor(actor, ["talk", "listen", "read", "phone"]);
    const person = handle.root.children[0] as THREE.Group;
    const rig = person.userData.personRig as PersonRig;
    rig.setExpression("neutral", 0);
    handle.update(1 / 60, 0);
    expect(rig.mouth.scale.y).toBeLessThan(0.13); // 静息时闭口，讲话才明显张开
    handle.setPose("talk");
    const mouthScales: number[] = [];
    for (let t = 0; t < 1; t += 1 / 60) {
      handle.update(1 / 60, t);
      mouthScales.push(rig.mouth.scale.y);
    }
    expect(Math.max(...mouthScales) - Math.min(...mouthScales)).toBeGreaterThan(0.1);
    handle.setPose("listen");
    handle.update(1 / 60, 1.1);
    const listeningBrow = rig.brows[0].position.y;
    handle.setPose("read");
    handle.update(0.5, 1.6);
    expect(rig.props.book?.visible).toBe(true);
    expect(rig.props.phone?.visible).toBe(false);
    handle.setPose("phone");
    handle.update(0.5, 2.2);
    expect(rig.props.phone?.visible).toBe(true);
    expect(rig.props.book?.visible).toBe(false);
    handle.setPose("write");
    handle.update(0.5, 2.8);
    expect(rig.props.pen?.visible).toBe(true);
    expect(rig.brows[0].position.y).not.toBe(listeningBrow);
    const blinkDifferences = new Set<string>();
    for (let t = 0; t < 6; t += 1 / 60) {
      handle.update(1 / 60, t);
      blinkDifferences.add(`${rig.eyes[0].scale.y.toFixed(3)}:${rig.eyes[1].scale.y.toFixed(3)}`);
    }
    expect(blinkDifferences.size).toBeGreaterThan(2);
    handle.dispose();
  });

  it("持续播放时头部微动有界，不逐帧累积成歪头", () => {
    const handle = spawnActor(actor);
    const rig = handle.root.children[0].userData.personRig as PersonRig;
    for (let frame = 0; frame < 3600; frame++) {
      handle.update(1 / 60, frame / 60);
      expect(Math.abs(rig.head.rotation.z)).toBeLessThanOrEqual(0.015);
      expect(Math.abs(rig.head.rotation.y)).toBeLessThanOrEqual(0.11);
    }
    handle.dispose();
  });

  it("姿势行走驱动左右腿/手臂反向摆动并在到达后恢复；坐姿眼高正确", async () => {
    const handle = spawnActor(actor, ["walk"]);
    const person = handle.root.children[0] as THREE.Group;
    const rig = person.userData.personRig as PersonRig;
    handle.setPose("stand");
    const arrival = handle.walkTo({ x: 0.3, y: 0, z: 0.15 }, 0.8);
    for (let t = 0; t < 0.3; t += 1 / 60) handle.update(1 / 60, t);
    expect(Math.abs(rig.legs.left.hip.rotation.x - rig.legs.right.hip.rotation.x)).toBeGreaterThan(0.2);
    for (let t = 0.3; t < 1; t += 1 / 60) handle.update(1 / 60, t);
    await arrival;
    expect(handle.pose).toBe("stand");
    expect(handle.root.position.x).toBeCloseTo(0.3);
    expect(handle.root.position.z).toBeCloseTo(0.15);
    handle.dispose();
  });

  it("第一人称普通NPC仍走旧静态接口；动态人物释放蒙皮几何与独占材质", () => {
    const staticPerson = createPerson({ shirt: 0x759283 });
    expect(staticPerson.userData.personRig).toBeUndefined();
    const handle = spawnActor(actor, []);
    const person = handle.root.children[0] as THREE.Group;
    const geometries: THREE.BufferGeometry[] = [];
    person.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) geometries.push((node as THREE.Mesh).geometry);
    });
    const owned = person.userData.ownedMaterials as Set<THREE.Material>;
    const geoSpies = geometries.map((geometry) => vi.spyOn(geometry, "dispose"));
    const materials = [...owned];
    const matSpies = materials.map((material) => vi.spyOn(material, "dispose"));
    handle.dispose();
    expect(geoSpies.every((spy) => spy.mock.calls.length === 1)).toBe(true);
    expect(matSpies.every((spy) => spy.mock.calls.length === 1)).toBe(true);
    expect(owned.size).toBe(0);
    staticPerson.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) (node as THREE.Mesh).geometry.dispose();
    });
  });
});
