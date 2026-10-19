import type { WordEntry } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";

/**
 * 测试用：直接读取 public/data 里的真实课程数据（经 Vite 的 import.meta.glob 以原始文本引入，
 * 不依赖 node 类型）。仅供 *.test.ts 使用，不会进入产物。
 */
const unitFiles = import.meta.glob<string>("/public/data/content/college_english_rw3/unit0[1-6].json", { eager: true, query: "?raw", import: "default" });
const vocabFiles = import.meta.glob<string>("/public/data/vocabulary/college_english_rw3.json", { eager: true, query: "?raw", import: "default" });

export function loadUnits(): Rw3UnitContent[] {
  return Object.entries(unitFiles)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, raw]) => JSON.parse(raw) as Rw3UnitContent);
}

export function loadVocab(): Map<string, WordEntry> {
  const raw = Object.values(vocabFiles)[0];
  return new Map((JSON.parse(raw) as { words: WordEntry[] }).words.map((w) => [w.id, w]));
}
