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
  const rw3PhaseProgress: GameSave["rw3PhaseProgress"] = {};
  if (raw.rw3PhaseProgress && typeof raw.rw3PhaseProgress === "object" && !Array.isArray(raw.rw3PhaseProgress)) {
    for (const [id, index] of Object.entries(raw.rw3PhaseProgress as Record<string, unknown>)) {
      if (Number.isInteger(index) && (index as number) >= 0) rw3PhaseProgress[id] = index as number;
    }
  }
  const rw3PassageProgress: GameSave["rw3PassageProgress"] = {};
  if (raw.rw3PassageProgress && typeof raw.rw3PassageProgress === "object" && !Array.isArray(raw.rw3PassageProgress)) {
    for (const [levelId, worlds] of Object.entries(raw.rw3PassageProgress as Record<string, unknown>)) {
      if (!worlds || typeof worlds !== "object" || Array.isArray(worlds)) continue;
      for (const [worldId, value] of Object.entries(worlds as Record<string, unknown>)) {
        if (!value || typeof value !== "object" || Array.isArray(value)) continue;
        const entry = value as Record<string, unknown>;
        const gradedWordIds = Array.isArray(entry.gradedWordIds)
          ? [...new Set(entry.gradedWordIds.filter((id): id is string => typeof id === "string"))]
          : [];
        const recallDone = entry.recallDone === true;
        const checkpointDone = entry.checkpointDone === true;
        if (gradedWordIds.length || recallDone || checkpointDone) {
          rw3PassageProgress[levelId] ??= {};
          rw3PassageProgress[levelId][worldId] = { gradedWordIds, recallDone, checkpointDone };
        }
      }
    }
  }
  const rawCourseId = raw.courseId;
  const courseId: CourseId =
    rawCourseId === "cet4" || rawCourseId === "cet6" || rawCourseId === "college_english_rw3"
      ? rawCourseId
      : base.courseId;

  return {
    courseId,
    mapNodeId: (raw.mapNodeId as string) ?? "",
    discoveredWords: Array.isArray(raw.discoveredWords) ? (raw.discoveredWords as string[]) : [],
    levelProgress: progress,
    rw3PhaseProgress,
    rw3PassageProgress,
    wordMemory,
    rewardIds: Array.isArray(raw.rewardIds) ? (raw.rewardIds as string[]) : [],
    experience: typeof raw.experience === "number" && Number.isFinite(raw.experience) ? raw.experience : 0,
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
