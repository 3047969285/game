import type { CourseTemplate, MapNode, ZoneDef } from "../../core/types";
import { sampleTerrainY, TERRAIN_ORIGIN_Z } from "../world/worldConfig";
import { terrainHeight } from "../world/utils";

const ZONE_THEMES: Record<string, { icon: string; bg: string }> = {
  vocabulary: { icon: "🌲", bg: "forest" },
  listening: { icon: "🎧", bg: "coast" },
  reading: { icon: "📖", bg: "library" },
  translation: { icon: "✍️", bg: "market" },
  boss: { icon: "🏛", bg: "temple" },
  unit: { icon: "📘", bg: "library" },
};

function themeFor(zone: ZoneDef) {
  return ZONE_THEMES[zone.type] ?? { icon: "📍", bg: "plains" };
}

function nodeGroundY(x: number, z: number): number {
  return sampleTerrainY(x, z, terrainHeight) + 0.2;
}

/** 读写3：每单元一个探索站（6 站） */
function buildRw3UnitMap(template: CourseTemplate, cleared: Set<string>): MapNode[] {
  const nodes: MapNode[] = [];

  for (let zi = 0; zi < template.zones.length; zi++) {
    const zone = template.zones[zi];
    const theme = themeFor(zone);
    const t = zi * 0.55;
    const x = Math.sin(t * 0.85) * 28 + (zi % 2 === 0 ? -8 : 8);
    const z = TERRAIN_ORIGIN_Z - 140 + zi * 72;
    const y = nodeGroundY(x, z);

    nodes.push({
      id: zone.id,
      zoneName: zone.name,
      name: formatUnitName(zone.name),
      icon: theme.icon,
      theme: theme.bg,
      x,
      y,
      z,
      unlocked: zi === 0 || cleared.has(template.zones[zi - 1].id),
      cleared: cleared.has(zone.id),
    });
  }

  return nodes;
}

function formatUnitName(zoneName: string): string {
  const m = zoneName.match(/Unit\s*(\d+):\s*(.+)/i);
  if (m) return `Unit ${m[1]} · ${m[2].trim()}`;
  return zoneName;
}

/** 根据课程模板生成 3D 地图节点 */
export function buildExploreMap(template: CourseTemplate, cleared: Set<string>): MapNode[] {
  if (template.id === "college_english_rw3") {
    return buildRw3UnitMap(template, cleared);
  }

  const nodes: MapNode[] = [];
  let prevId: string | null = null;
  let globalIdx = 0;

  for (let zi = 0; zi < template.zones.length; zi++) {
    const zone = template.zones[zi];
    const theme = themeFor(zone);
    const zoneZ = TERRAIN_ORIGIN_Z - 160 + zi * 52;

    const playable = zone.levels.filter((l) => l.word_ids.length > 0);

    playable.forEach((level, li) => {
      const t = globalIdx + li * 0.15;
      const x = Math.sin(t * 0.42) * (18 + zi * 2) + (zi % 2 === 0 ? -6 : 6);
      const z = zoneZ + li * 9;
      const y = nodeGroundY(x, z);

      nodes.push({
        id: level.id,
        zoneName: zone.name,
        name: formatLevelName(level.title),
        icon: theme.icon,
        theme: theme.bg,
        x,
        y,
        z,
        unlocked: globalIdx === 0 || (prevId !== null && cleared.has(prevId)),
        cleared: cleared.has(level.id),
      });

      prevId = level.id;
      globalIdx += 1;
    });
  }

  return nodes;
}

/** 关卡显示名 */
function formatLevelName(title: string): string {
  if (title.includes(" · ")) {
    const parts = title.split(" · ");
    const tail = parts[parts.length - 1];
    if (/词汇|阅读|听力|单元挑战/.test(tail)) return tail;
  }
  return title
    .replace(/^词汇森林\s*/, "")
    .replace(/^第/, "场景 ")
    .replace(/\s*·\s*/, " · ");
}

/** 取当前应聚焦的地图节点 */
export function resolveCurrentNode(nodes: MapNode[], currentId?: string): MapNode | null {
  if (!nodes.length) return null;
  if (currentId) {
    const hit = nodes.find((n) => n.id === currentId);
    if (hit) return hit;
  }
  const unlocked = nodes.filter((n) => n.unlocked);
  return unlocked[unlocked.length - 1] ?? nodes[0];
}
