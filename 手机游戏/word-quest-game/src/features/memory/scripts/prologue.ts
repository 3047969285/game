import type { MemoryScript } from "../types";

/**
 * 开场占位（M1a）：黑屏 + 一句系统字幕。M1b 换成 2090 年公寓的完整开场。
 * 舞台 "void"：只有雾和光尘，不出现 2090 年的他。
 */
export const PROLOGUE_SCRIPT: MemoryScript = {
  id: "prologue",
  unitId: "",
  section: "section_a",
  title: "Destination: 2026",
  titleZh: "目的地：2026",
  stage: "void",
  actors: [],
  objects: [],
  beats: [
    { kind: "wait", seconds: 1.0 },
    { kind: "narrate", pov: "you", text: "Destination: 2026. University.", zh: "目的地：2026 年。大学。", voice: "system" },
    { kind: "wait", seconds: 1.6 },
  ],
};
