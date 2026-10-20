import * as THREE from "three";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { retargetRotation } from "./humanVisual";

describe("真人模型资源与骨骼适配", () => {
  for (const kind of ["male", "female"]) it(`${kind} 包含本地贴图、完整蒙皮、可用面部形变及许可`, () => {
    const file = readFileSync(new URL(`../../../public/models/humans/${kind}.glb`, import.meta.url));
    expect(file.toString("ascii", 0, 4)).toBe("glTF");
    expect(file.readUInt32LE(8)).toBe(file.length);
    expect(file.length).toBeLessThan(5_000_000);
    const gltf = JSON.parse(file.toString("utf8", 20, 20 + file.readUInt32LE(12)));
    const names = gltf.nodes.map((node) => node.name);
    for (const name of ["Head", "Spine", "LeftArm", "RightArm", "LeftForeArm", "LeftHand", "RightHand", "LeftUpLeg", "LeftLeg", "LeftFoot"]) expect(names).toContain(name);
    const morphs = gltf.meshes.flatMap((mesh) => mesh.extras?.targetNames ?? []);
    for (const name of ["jawOpen", "eyeBlinkLeft", "eyeBlinkRight", "mouthSmileLeft", "mouthSmileRight", "browInnerUp"]) expect(morphs).toContain(name);
    expect(gltf.images.every((image) => !image.uri && image.bufferView !== undefined)).toBe(true);
    expect(gltf.buffers.every((buffer) => !buffer.uri)).toBe(true);
    const triangles = gltf.meshes.flatMap((mesh) => mesh.primitives).reduce((sum, primitive) => sum + gltf.accessors[primitive.indices].count / 3, 0);
    expect(triangles).toBeLessThan(9_000);
    expect(readFileSync(new URL("../../../public/models/humans/LICENSE-Microsoft.txt", import.meta.url), "utf8")).toContain("Copyright (c) 2020 Microsoft");
  });

  it("任意朝向的骨骼将角色空间动作转换到绑定空间，零动作保留原始姿势", () => {
    const parent = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.2, -0.8, 0.3));
    const local = new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.3, 0.1, 0.4));
    const world = parent.clone().multiply(local);
    const out = new THREE.Quaternion();
    retargetRotation(local, world, new THREE.Euler(), out);
    expect(out.angleTo(local)).toBeLessThan(1e-7);
    const action = new THREE.Euler(-0.6, 0.2, 0.1);
    retargetRotation(local, world, action, out);
    const expectedWorld = new THREE.Quaternion().setFromEuler(action).multiply(world);
    expect(parent.clone().multiply(out).angleTo(expectedWorld)).toBeLessThan(1e-7);
  });
});
