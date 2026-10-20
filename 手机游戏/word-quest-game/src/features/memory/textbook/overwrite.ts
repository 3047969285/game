import type { SectionKey } from "../ids";

export interface TextbookTarget {
  unit: number;
  section: SectionKey;
}

export interface TextbookOverwriteAnalysis {
  /** Distinct destinations that already have a saved passage. */
  replacing: TextbookTarget[];
  /** Destinations selected more than once in the current save batch. */
  duplicateTargets: Array<TextbookTarget & { count: number }>;
}

function keyFor(target: TextbookTarget): string {
  return `${target.unit}:${target.section}`;
}

export function analyzeTextbookOverwrites(
  targets: readonly TextbookTarget[],
  existing: readonly TextbookTarget[]
): TextbookOverwriteAnalysis {
  const existingKeys = new Set(existing.map(keyFor));
  const replacing = new Map<string, TextbookTarget>();
  const counts = new Map<string, { target: TextbookTarget; count: number }>();

  for (const target of targets) {
    const key = keyFor(target);
    if (existingKeys.has(key)) replacing.set(key, { ...target });
    const current = counts.get(key);
    if (current) current.count += 1;
    else counts.set(key, { target: { ...target }, count: 1 });
  }

  return {
    replacing: [...replacing.values()],
    duplicateTargets: [...counts.values()]
      .filter(({ count }) => count > 1)
      .map(({ target, count }) => ({ ...target, count })),
  };
}
