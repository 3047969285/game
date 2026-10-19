import { loadMemoryProgress, writeMemoryProgress } from "../../infra/storage";

/** 回忆进度：完成的回忆、看过的词、是否播过开场（存储见 infra/storage 的 MemoryProgressSave） */

export function isMemoryDone(id: string): boolean {
  return loadMemoryProgress().done.includes(id);
}

export function markMemoryDone(id: string, wordsSeen: readonly string[] = []): void {
  const p = loadMemoryProgress();
  if (!p.done.includes(id)) p.done.push(id);
  for (const w of wordsSeen) if (!p.wordsSeen.includes(w)) p.wordsSeen.push(w);
  writeMemoryProgress(p);
}

/** 在回忆里遇见过的词 id */
export function memoryWordsSeen(): string[] {
  return loadMemoryProgress().wordsSeen;
}

export function isPrologueSeen(): boolean {
  return loadMemoryProgress().prologueSeen;
}

export function markPrologueSeen(): void {
  const p = loadMemoryProgress();
  p.prologueSeen = true;
  writeMemoryProgress(p);
}
