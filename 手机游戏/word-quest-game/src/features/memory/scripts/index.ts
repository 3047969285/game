import type { WordEntry } from "../../../core/types";
import type { Rw3UnitContent } from "../../../infra/data";
import { buildAutoScript } from "../autoScript";
import { memoryScriptId, type SectionKey } from "../ids";
import type { MemoryScript } from "../types";

import { U01A_SCRIPT } from "./u01a";

export { PROLOGUE_SCRIPT } from "./prologue";
export { U01A_SCRIPT } from "./u01a";

/** 手写脚本注册表：单元 1 的记忆点 A《周四的沉默》（u01a）。没有登记的段落由 autoScript 生成 */
const HANDWRITTEN: Record<string, MemoryScript> = {
  [U01A_SCRIPT.id]: U01A_SCRIPT,
};

export function registerMemoryScript(script: MemoryScript): void {
  HANDWRITTEN[script.id] = script;
}

export function resolveMemoryScript(unit: Rw3UnitContent, words: WordEntry[], section: SectionKey): MemoryScript {
  return HANDWRITTEN[memoryScriptId(unit.unit_id, section)] ?? buildAutoScript(unit, words, section);
}
