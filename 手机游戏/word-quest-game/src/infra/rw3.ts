import type { CourseTemplate, GameSave, LevelDef, ZoneDef } from "../core/types";

/** 取单元全部词 ID（优先 boss/read 关） */
export function extractRw3UnitWordIds(zone: ZoneDef): string[] {
  const boss = zone.levels.find((l) => l.id.endsWith("_boss"));
  if (boss?.word_ids.length) return [...boss.word_ids];

  const read = zone.levels.find((l) => l.id.endsWith("_read"));
  if (read?.word_ids.length) return [...read.word_ids];

  const ids = new Set<string>();
  for (const level of zone.levels) {
    for (const id of level.word_ids) ids.add(id);
  }
  return [...ids].sort();
}

/** 构建读写3 单元级关卡（一幕 = 一整单元） */
export function buildRw3UnitLevel(zone: ZoneDef): LevelDef {
  return {
    id: zone.id,
    title: zone.name,
    word_ids: extractRw3UnitWordIds(zone),
  };
}

/** 旧存档：子关卡进度合并为单元进度 */
export function migrateRw3Progress(save: GameSave, template: CourseTemplate): boolean {
  if (template.id !== "college_english_rw3") return false;

  let changed = false;
  for (const zone of template.zones) {
    if (save.levelProgress[zone.id]?.cleared) continue;
    const subCleared = zone.levels.some((l) => save.levelProgress[l.id]?.cleared);
    if (subCleared) {
      save.levelProgress[zone.id] = { cleared: true };
      changed = true;
    }
  }

  const nodeId = save.mapNodeId;
  if (nodeId && !/^rw3_unit\d{2}$/.test(nodeId)) {
    const zone = template.zones.find((z) => nodeId.startsWith(z.id));
    if (zone && zone.id !== nodeId) {
      save.mapNodeId = zone.id;
      changed = true;
    }
  }

  return changed;
}
