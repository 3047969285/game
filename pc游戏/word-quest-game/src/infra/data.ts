import type { CourseId, CourseTemplate, VocabBundle, WordEntry } from "../core/types";

const cache = new Map<string, unknown>();

export interface Rw3QuizRaw {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

/** 读写3 单元内容（教材全模块） */
export interface Rw3UnitContent {
  unit_id: string;
  title: string;
  title_zh: string;
  theme: string;
  sections: {
    section_a?: { title?: string; type?: string; passage?: string };
    section_b?: { title?: string; type?: string; passage?: string };
    section_c?: { title?: string; type?: string; passage?: string };
    vocabulary?: { level_count: number; words_per_level: number };
    reading?: {
      title?: string;
      passage?: string;
      questions?: Rw3QuizRaw[];
    };
    listening?: {
      title?: string;
      script?: string;
      questions?: Rw3QuizRaw[];
    };
    translation?: {
      sentences?: Array<{
        zh: string;
        en_reference: string;
        keywords?: string[];
      }>;
    };
    writing?: {
      prompt?: string;
      outline?: string[];
    };
  };
}

/** 拉取 JSON 并缓存 */
async function fetchJson<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const data = (await res.json()) as T;
  cache.set(url, data);
  return data;
}

/** 加载课程模板 */
export async function loadTemplate(courseId: CourseId): Promise<CourseTemplate> {
  return fetchJson<CourseTemplate>(`${import.meta.env.BASE_URL}data/templates/${courseId}.json`);
}

/** 加载词库为 Map */
export async function loadVocabulary(courseId: CourseId): Promise<Map<string, WordEntry>> {
  const bundle = await fetchJson<VocabBundle>(`${import.meta.env.BASE_URL}data/vocabulary/${courseId}.json`);
  return new Map(bundle.words.map((w) => [w.id, w]));
}

/** 加载读写3 全部单元内容 */
export async function loadRw3Units(): Promise<Map<string, Rw3UnitContent>> {
  const map = new Map<string, Rw3UnitContent>();
  await Promise.all(
    Array.from({ length: 6 }, async (_, i) => {
      const unitId = `unit${String(i + 1).padStart(2, "0")}`;
      const unit = await fetchJson<Rw3UnitContent>(
        `${import.meta.env.BASE_URL}data/content/college_english_rw3/${unitId}.json`
      );
      map.set(unitId, unit);
    })
  );
  return map;
}
