import type { WordEntry } from "../../../core/types";
import type { Rw3UnitContent } from "../../../infra/data";
import { buildAutoScript } from "../autoScript";
import { memoryScriptId, type SectionKey } from "../ids";
import type { MemoryScript } from "../types";

export { PROLOGUE_SCRIPT } from "./prologue";

/** 手写脚本的生成函数：需要课程数据（课文全文要按幕切分）。passageOverride 是导入的教材原文 */
export type ScriptFactory = (unit: Rw3UnitContent, words: WordEntry[], passageOverride?: string) => MemoryScript;

/**
 * 可选的脚本注册表。旧的手写剧本《周四的沉默》（u01a）已退役：
 * 单元 1 的记忆点 A 和其它段落一样由 autoScript 按教材真实课文生成。
 * 保留注册接口只是为了将来确有需要时能挂特殊段落。
 */
const HANDWRITTEN: Record<string, ScriptFactory> = {};

export function registerMemoryScript(id: string, factory: ScriptFactory): void {
  HANDWRITTEN[id] = factory;
}

export function resolveMemoryScript(unit: Rw3UnitContent, words: WordEntry[], section: SectionKey, passageOverride?: string): MemoryScript {
  const factory = HANDWRITTEN[memoryScriptId(unit.unit_id, section)];
  return factory ? factory(unit, words, passageOverride) : buildAutoScript(unit, words, section, "emptyRoom", passageOverride);
}
