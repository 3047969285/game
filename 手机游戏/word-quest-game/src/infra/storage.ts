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
  const rw3MemoryProgress: GameSave["rw3MemoryProgress"] = {};
  if (raw.rw3MemoryProgress && typeof raw.rw3MemoryProgress === "object" && !Array.isArray(raw.rw3MemoryProgress)) {
    for (const [levelId, actions] of Object.entries(raw.rw3MemoryProgress as Record<string, unknown>)) {
      if (!Array.isArray(actions)) continue;
      const actionIds = [...new Set(actions.filter((id): id is string => typeof id === "string" && id.length > 0))];
      if (actionIds.length) rw3MemoryProgress[levelId] = actionIds;
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
    rw3MemoryProgress,
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

// ───────────────────────── 回忆进度（记忆回溯） ─────────────────────────

const KEY_MEMORY = "word_quest_memory_v1";

/** 回忆游戏的进度：与学习存档分开存放，避免两处各持有一份内存副本而互相覆盖 */
export interface MemoryProgressSave {
  prologueSeen: boolean;
  /** 已完成的回忆 id（如 "u01a"） */
  done: string[];
  /** 在回忆里触碰 / 答对过的词 */
  wordsSeen: string[];
}

let memoryFallback: MemoryProgressSave | null = null;
let memoryFallbackIsLatest = false;

function copyMemoryProgress(progress: MemoryProgressSave): MemoryProgressSave {
  return {
    prologueSeen: progress.prologueSeen,
    done: [...progress.done],
    wordsSeen: [...progress.wordsSeen],
  };
}

function normalizeMemory(raw: unknown): MemoryProgressSave {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const strings = (v: unknown): string[] => (Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string"))] : []);
  return { prologueSeen: o.prologueSeen === true, done: strings(o.done), wordsSeen: strings(o.wordsSeen) };
}

export function loadMemoryProgress(): MemoryProgressSave {
  if (memoryFallback && memoryFallbackIsLatest) return copyMemoryProgress(memoryFallback);
  try {
    const raw = localStorage.getItem(KEY_MEMORY);
    return normalizeMemory(raw ? JSON.parse(raw) : null);
  } catch {
    return memoryFallback ? copyMemoryProgress(memoryFallback) : normalizeMemory(null);
  }
}

export function writeMemoryProgress(progress: MemoryProgressSave): void {
  memoryFallback = copyMemoryProgress(progress);
  try {
    localStorage.setItem(KEY_MEMORY, JSON.stringify(memoryFallback));
    memoryFallbackIsLatest = false;
  } catch {
    memoryFallbackIsLatest = true;
    // 存储不可用（隐私模式 / 配额）时仍保留本次会话内的进度
  }
}
