import type { Rw3Phase, Rw3SubWorld, UnitWorldContent } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";

type PhaseKind = Rw3Phase["kind"];

function hasPassage(value: { passage?: string } | undefined): boolean {
  return Boolean(value?.passage?.trim());
}

function hasAnyPhase(phases: Rw3Phase[], kinds: PhaseKind[]): boolean {
  return phases.some((phase) => kinds.includes(phase.kind));
}

/**
 * 依据真实单元结构生成内部世界入口。
 * 这里不复制教材内容，只负责把 Section A/B/C 与学习任务组织成空间入口。
 */
export function buildRw3SubWorlds(
  unit: Rw3UnitContent | undefined,
  world: UnitWorldContent | undefined,
  phases: Rw3Phase[]
): Rw3SubWorld[] {
  const sectionA = unit?.sections.section_a?.title?.trim() || "Section A · 文章世界";
  const sectionB = unit?.sections.section_b?.title?.trim() || "Section B · 文章世界";
  const sectionC = unit?.sections.section_c?.title?.trim() || "Stories of China";
  const result: Rw3SubWorld[] = [];

  if (hasPassage(unit?.sections.section_a) && hasAnyPhase(phases, ["section_a"])) {
    result.push({
      id: "section-a",
      kind: "section_a",
      title: sectionA,
      subtitle: "全文拆分多世界 · 分段精读 · 主动回忆",
      icon: "📖",
      order: 1,
      phaseKinds: ["section_a"],
    });
  }

  if (hasPassage(unit?.sections.section_b) && hasAnyPhase(phases, ["section_b"])) {
    result.push({
      id: "section-b",
      kind: "section_b",
      title: sectionB,
      subtitle: "拓展全文分世界 · 结构理解 · 主动回忆",
      icon: "🗺️",
      order: 2,
      phaseKinds: ["section_b"],
    });
  }

  if (hasPassage(unit?.sections.section_c) && hasAnyPhase(phases, ["section_c"])) {
    result.push({
      id: "stories-of-china",
      kind: "stories_of_china",
      title: sectionC,
      subtitle: "文化故事分世界 · 文化理解 · 迁移表达",
      icon: "🏮",
      order: 3,
      phaseKinds: ["section_c"],
    });
  }

  const labKinds: PhaseKind[] = ["vocab", "grammar", "cloze", "translation"];
  if (hasAnyPhase(phases, labKinds)) {
    result.push({
      id: "learning-lab",
      kind: "learning_lab",
      title: `${world?.worldName ?? "单元"} · 学习实验室`,
      subtitle: "交错练习 · 语法应用 · 延迟检索",
      icon: "🧪",
      order: 4,
      phaseKinds: labKinds,
    });
  }

  const projectKinds: PhaseKind[] = ["reading_quiz", "listening", "writing", "memory"];
  if (hasAnyPhase(phases, projectKinds)) {
    result.push({
      id: "unit-project",
      kind: "unit_project",
      title: "单元项目 · 综合挑战",
      subtitle: "阅读听力 · 写作迁移 · 记忆回放",
      icon: "🏁",
      order: 5,
      phaseKinds: projectKinds,
    });
  }

  return result;
}

/** 根据子世界入口筛选学习阶段，保证同一单元内可拥有多个学习世界。 */
export function selectRw3WorldPhases(phases: Rw3Phase[], world: Rw3SubWorld): Rw3Phase[] {
  return phases.filter((phase) => world.phaseKinds.includes(phase.kind));
}
