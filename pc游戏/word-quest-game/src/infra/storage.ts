import type { CourseId, GameSave, LevelProgress } from "../core/types";
import { createDefaultSave } from "../core/save";

const KEY_V2 = "word_quest_save_v2";
const KEY_V1 = "word_quest_save_v1";

/** 归一化旧存档字段 */
function normalize(raw: Record<string, unknown> | null): GameSave {
  const base = createDefaultSave();
  if (!raw) return base;

  const progress: Record<string, LevelProgress> = {};
  if (raw.levelProgress && typeof raw.levelProgress === "object") {
    for (const [id, p] of Object.entries(raw.levelProgress as Record<string, { cleared?: boolean }>)) {
      if (p?.cleared) progress[id] = { cleared: true };
    }
  }

  const wordMemory =
    raw.wordMemory && typeof raw.wordMemory === "object"
      ? (raw.wordMemory as GameSave["wordMemory"])
      : {};

  return {
    courseId: (raw.courseId as CourseId) ?? base.courseId,
    mapNodeId: (raw.mapNodeId as string) ?? "",
    discoveredWords: Array.isArray(raw.discoveredWords) ? (raw.discoveredWords as string[]) : [],
    levelProgress: progress,
    wordMemory,
  };
}

/** 读取存档（兼容 v1） */
export function loadSave(): GameSave {
  try {
    const raw = localStorage.getItem(KEY_V2) ?? localStorage.getItem(KEY_V1);
    return normalize(raw ? JSON.parse(raw) : null);
  } catch {
    return createDefaultSave();
  }
}

/** 写入存档 */
export function writeSave(save: GameSave): void {
  localStorage.setItem(KEY_V2, JSON.stringify(save));
}
