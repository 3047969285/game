/** 回忆 id 约定：u{单元两位}{a|b|c}。轻量模块（无 three 依赖），App 主包可直接引用。 */

export type SectionKey = "section_a" | "section_b" | "section_c";

export const SECTION_KEYS: readonly SectionKey[] = ["section_a", "section_b", "section_c"];

const LETTER: Record<SectionKey, string> = { section_a: "a", section_b: "b", section_c: "c" };

/** unitId 形如 "unit01" → "u01a" */
export function memoryScriptId(unitId: string, section: SectionKey): string {
  return `u${unitId.replace(/^unit/, "").padStart(2, "0")}${LETTER[section]}`;
}
