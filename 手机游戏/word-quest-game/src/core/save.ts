import type { GameSave } from "./types";
import { DEFAULT_COURSE } from "./constants";

/** 默认存档 */
export function createDefaultSave(): GameSave {
  return {
    courseId: DEFAULT_COURSE,
    levelProgress: {},
    rw3PhaseProgress: {},
    rw3PassageProgress: {},
    rw3MemoryProgress: {},
    mapNodeId: "",
    discoveredWords: [],
    wordMemory: {},
    rewardIds: [],
    experience: 0,
  };
}
