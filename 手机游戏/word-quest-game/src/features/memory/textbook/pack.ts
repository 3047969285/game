import { SECTION_KEYS } from "../ids";
import {
  TextbookInputError,
  type Exercise,
  type PackIssue,
  type TextbookPack,
  type TextbookPassageInput,
  type UnitPack,
} from "./types";

const PACK_SCHEMA = "rw3-pack/1";
const INVALID_PACK = "不是有效的教材包文件";
const OCR_TRACE = /=== ?image|[^\p{L}\p{N}\s]{4,}/u;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** JSON.parse + 结构检查；不合法一律抛 TextbookInputError。 */
export function parsePack(json: string): TextbookPack {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new TextbookInputError(INVALID_PACK);
  }
  if (!isRecord(data) || typeof data.schema !== "string" || typeof data.book !== "string" || !Array.isArray(data.units)) {
    throw new TextbookInputError(INVALID_PACK);
  }
  for (const unit of data.units) {
    if (!isRecord(unit) || !Array.isArray(unit.texts) || !Array.isArray(unit.newWords) || !Array.isArray(unit.exercises)) {
      throw new TextbookInputError(INVALID_PACK);
    }
    for (const text of unit.texts) {
      if (!isRecord(text) || !Array.isArray(text.paragraphs) || !Array.isArray(text.scenes)) throw new TextbookInputError(INVALID_PACK);
    }
    for (const exercise of unit.exercises) {
      if (!isRecord(exercise) || !Array.isArray(exercise.items)) throw new TextbookInputError(INVALID_PACK);
    }
  }
  return data as unknown as TextbookPack;
}

function validateExercise(exercise: Exercise, path: string, issues: PackIssue[]): void {
  const error = (sub: string, message: string) => issues.push({ path: `${path}${sub}`, level: "error", message });
  exercise.items.forEach((item, index) => {
    if (item.n !== index + 1) error(`.items[${index}].n`, `题号应为 ${index + 1}，实际为 ${String(item.n)}。`);
  });
  exercise.items.forEach((item, index) => {
    const itemPath = `.items[${index}]`;
    if (item.options !== undefined || exercise.kind === "text_b_mcq") {
      if (!item.options || item.options.length === 0) {
        error(`${itemPath}.options`, "选择题缺少 options。");
      } else if (typeof item.answer !== "number" || !Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.options.length) {
        error(`${itemPath}.answer`, "选择题 answer 越界。");
      }
      return;
    }
    if (item.answer === null && item.answer_source !== "open") {
      error(`${itemPath}.answer_source`, "answer 为 null 时 answer_source 必须是 open。");
    }
  });
  if (exercise.kind === "banked_cloze" && exercise.passage !== undefined) {
    const blanks = (exercise.passage.match(/\{\{\d+\}\}/g) ?? []).length;
    if (blanks !== exercise.items.length) error(".passage", `passage 有 ${blanks} 个空位，但 items 有 ${exercise.items.length} 题。`);
  }
}

/** 返回空数组表示通过；规则见接口文档第 6 节。 */
export function validatePack(pack: TextbookPack): PackIssue[] {
  const issues: PackIssue[] = [];
  const add = (path: string, level: PackIssue["level"], message: string) => issues.push({ path, level, message });
  if (pack.schema !== PACK_SCHEMA) add("schema", "error", `schema 必须是 "${PACK_SCHEMA}"。`);

  const seenUnits = new Set<number>();
  const seenExercises = new Set<string>();
  pack.units.forEach((unit, ui) => {
    const up = `units[${ui}]`;
    if (!Number.isInteger(unit.unit) || unit.unit < 1 || unit.unit > 6) add(`${up}.unit`, "error", "unit 必须在 1..6 之间。");
    else if (seenUnits.has(unit.unit)) add(`${up}.unit`, "error", `unit ${unit.unit} 重复。`);
    seenUnits.add(unit.unit);

    const sections = unit.texts.map((text) => text.section);
    const complete = unit.texts.length === 3 && SECTION_KEYS.every((key) => sections.filter((s) => s === key).length === 1);
    if (!complete) add(`${up}.texts`, "error", "texts 必须恰好包含 section_a、section_b、section_c 各一篇。");

    unit.texts.forEach((text, ti) => {
      const tp = `${up}.texts[${ti}]`;
      const covered = new Set<number>();
      text.paragraphs.forEach((paragraph, pi) => {
        if (paragraph.trim() === "") add(`${tp}.paragraphs[${pi}]`, "error", "段落为空。");
        else if (OCR_TRACE.test(paragraph)) add(`${tp}.paragraphs[${pi}]`, "warn", "段落含明显 OCR 痕迹。");
      });
      text.scenes.forEach((scene, si) => {
        scene.paragraphs.forEach((n, k) => {
          if (!Number.isInteger(n) || n < 1 || n > text.paragraphs.length) add(`${tp}.scenes[${si}].paragraphs[${k}]`, "error", `段号 ${String(n)} 越界（共 ${text.paragraphs.length} 段）。`);
          else covered.add(n);
        });
      });
      text.paragraphs.forEach((_, pi) => {
        if (!covered.has(pi + 1)) add(`${tp}.paragraphs[${pi}]`, "warn", "该段没有被任何场景覆盖。");
      });
      if (text.paragraphs.length < 4) add(`${tp}.paragraphs`, "warn", "课文段落数少于 4。");
    });

    if (unit.newWords.length === 0) add(`${up}.newWords`, "warn", "newWords 为空。");
    unit.newWords.forEach((word, wi) => {
      if (!word.phonetic) add(`${up}.newWords[${wi}].phonetic`, "warn", `“${word.word}” 缺少音标。`);
    });

    unit.exercises.forEach((exercise, ei) => {
      const ep = `${up}.exercises[${ei}]`;
      if (seenExercises.has(exercise.id)) add(`${ep}.id`, "error", `练习 id “${exercise.id}” 重复。`);
      seenExercises.add(exercise.id);
      validateExercise(exercise, ep, issues);
    });
  });
  return issues;
}

/** 按 unit 排序合并；重复的 unit 抛 TextbookInputError。 */
export function mergeUnitPacks(units: UnitPack[]): TextbookPack {
  const seen = new Set<number>();
  for (const unit of units) {
    if (seen.has(unit.unit)) throw new TextbookInputError(`单元 ${unit.unit} 重复，无法合并。`);
    seen.add(unit.unit);
  }
  return { schema: PACK_SCHEMA, book: "", units: [...units].sort((a, b) => a.unit - b.unit) };
}

/** 转成现有段落存储结构（段落以空行连接），旧导入流程可直接使用。 */
export function packToPassages(pack: TextbookPack): TextbookPassageInput[] {
  return pack.units.flatMap((unit) =>
    unit.texts.map((text) => ({ unit: unit.unit, section: text.section, title: text.title, passage: text.paragraphs.join("\n\n") }))
  );
}
