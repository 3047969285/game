import type { GameSave } from "./types";
import { DEFAULT_COURSE } from "./constants";

/** 默认存档 */
export function createDefaultSave(): GameSave {
  return {
    courseId: DEFAULT_COURSE,
    levelProgress: {},
    mapNodeId: "",
    discoveredWords: [],
    wordMemory: {},
  };
}
