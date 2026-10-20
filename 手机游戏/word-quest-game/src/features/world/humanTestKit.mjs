import { readFileSync } from "node:fs";
import { buildSkeletonFromGltfJson, HumanRig } from "./humanRig";

/** 测试专用：读取本地 GLB 的 JSON 骨架，不加载贴图（node 下没有 DOM）。 */
export function loadGltfJson(kind) {
  const file = readFileSync(new URL(`../../../public/models/humans/${kind}.glb`, import.meta.url));
  return JSON.parse(file.toString("utf8", 20, 20 + file.readUInt32LE(12)));
}

export function makeTestRig(kind = "male") {
  const { frame, visual } = buildSkeletonFromGltfJson(loadGltfJson(kind));
  return { rig: new HumanRig(visual, frame), frame, visual };
}
