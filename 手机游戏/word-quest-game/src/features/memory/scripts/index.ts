import type { WordEntry } from "../../../core/types";
import type { Rw3UnitContent } from "../../../infra/data";
import { buildAutoScript } from "../autoScript";
import { memoryScriptId, type SectionKey } from "../ids";
import type { MemoryScript } from "../types";

import { buildU01aScript } from "./u01a";

export { PROLOGUE_SCRIPT } from "./prologue";
export { buildU01aScript, U01A_BASE } from "./u01a";

/** 手写脚本的生成函数：需要课程数据（课文全文要按幕切分）。passageOverride 是导入的教材原文 */
export type ScriptFactory = (unit: Rw3UnitContent, words: WordEntry[], passageOverride?: string) => MemoryScript;

/** 手写脚本注册表：单元 1 的记忆点 A《周四的沉默》（u01a）。没有登记的段落由 autoScript 生成 */
const HANDWRITTEN: Record<string, ScriptFactory> = {
  u01a: buildU01aScript,
};

export function registerMemoryScript(id: string, factory: ScriptFactory): void {
  HANDWRITTEN[id] = factory;
}

export function resolveMemoryScript(unit: Rw3UnitContent, words: WordEntry[], section: SectionKey, passageOverride?: string): MemoryScript {
  const factory = HANDWRITTEN[memoryScriptId(unit.unit_id, section)];
  return factory ? factory(unit, words, passageOverride) : buildAutoScript(unit, words, section, "emptyRoom", passageOverride);
}
