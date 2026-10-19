import type { WordEntry } from "../../../core/types";
import type { Rw3UnitContent } from "../../../infra/data";
import { buildAutoScript } from "../autoScript";
import { memoryScriptId, type SectionKey } from "../ids";
import type { MemoryScript } from "../types";

export { PROLOGUE_SCRIPT } from "./prologue";

/** 手写脚本注册表：M1b 起在这里登记（例如 u01a）。没有登记的段落由 autoScript 生成 */
const HANDWRITTEN: Record<string, MemoryScript> = {};

export function registerMemoryScript(script: MemoryScript): void {
  HANDWRITTEN[script.id] = script;
}

export function resolveMemoryScript(unit: Rw3UnitContent, words: WordEntry[], section: SectionKey): MemoryScript {
  return HANDWRITTEN[memoryScriptId(unit.unit_id, section)] ?? buildAutoScript(unit, words, section);
}
