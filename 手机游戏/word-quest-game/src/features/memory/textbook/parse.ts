import type { SectionKey } from "../ids";
import { splitSentences } from "../text";
import { TextbookInputError, type ParsedPassage, type TextbookParseResult } from "./types";

export const MAX_TEXTBOOK_CHARS = 200_000;
export const MAX_TEXTBOOK_FILE_BYTES = 512_000;

const SECTION_BY_LETTER: Record<string, SectionKey> = { a: "section_a", b: "section_b", c: "section_c" };
const UNIT_BY_WORD: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

function unitFromHeader(line: string): number | null {
  const cleaned = line.replace(/^\s{0,3}#{1,6}\s+/, "");
  const match = /^\s*unit\s+(1|2|3|4|5|6|one|two|three|four|five|six)\b/i.exec(cleaned);
  if (!match) return null;
  const value = match[1].toLowerCase();
  return Number(value) || UNIT_BY_WORD[value] || null;
}

function sectionFromHeader(line: string): { section: SectionKey; title: string } | null {
  const cleaned = line.replace(/^\s{0,3}#{1,6}\s+/, "");
  const stories = /^\s*stories\s+of\s+china\b(?:\s*[:：—–-]\s*(.*))?\s*$/i.exec(cleaned);
  if (stories) return { section: "section_c", title: stories[1]?.trim() ?? "Stories of China" };
  const section = /^\s*(?:section|text)\s+([abc])\b(?:\s*[:：—–-]\s*(.*))?\s*$/i.exec(cleaned);
  if (!section) return null;
  return { section: SECTION_BY_LETTER[section[1].toLowerCase()], title: section[2]?.trim() ?? "" };
}

function looksLikeStandaloneTitle(line: string): boolean {
  const text = line.trim().replace(/^\s{0,3}#{1,6}\s+/, "");
  if (!text || /[.!?。！？;；]/.test(text) || /^[-*•]\s/.test(text)) return false;
  const words = text.match(/\S+/g)?.length ?? 0;
  return text.length <= 80 && words <= 8;
}

function isGlossaryHeader(line: string): boolean {
  const text = line.replace(/^\s{0,3}#{1,6}\s+/, "").trim();
  return /^(?:new\s+words\b|words\s+and\s+expressions\b|glossary\b)/i.test(text);
}

/** Parse editable passages from plain text or Markdown using Unit / Section markers. */
export function parseTextbookText(raw: string): TextbookParseResult {
  if (!raw.trim()) throw new TextbookInputError("内容为空。请粘贴课文或选择 .txt / .md 文件。");
  if (raw.length > MAX_TEXTBOOK_CHARS) throw new TextbookInputError(`内容超过 ${MAX_TEXTBOOK_CHARS.toLocaleString()} 个字符上限，请分篇导入。`);

  const lines = raw.replace(/\r\n?/g, "\n").replace(/^\uFEFF/, "").split("\n");
  const passages: ParsedPassage[] = [];
  const warnings: string[] = [];
  let unit = 1;
  let sawUnit = false;
  let sawSection = false;
  let inGlossary = false;
  let current: { unit: number; section: SectionKey; title: string; body: string[] } | null = null;

  const finish = (): void => {
    if (!current) return;
    const body = [...current.body];
    let title = current.title;
    const first = body.findIndex((line) => line.trim().length > 0);
    if (!title && first >= 0 && looksLikeStandaloneTitle(body[first])) {
      title = body.splice(first, 1)[0].trim();
    }
    const passage = body.join("\n").trim();
    if (passage) passages.push({ unit: current.unit, section: current.section, title, passage });
    else warnings.push(`Unit ${current.unit} ${current.section.replace("section_", "Section ").toUpperCase()} 没有识别到正文，已跳过。`);
    current = null;
  };

  for (const line of lines) {
    const nextUnit = unitFromHeader(line);
    if (nextUnit !== null) {
      finish();
      inGlossary = false;
      unit = nextUnit;
      sawUnit = true;
      continue;
    }
    const header = sectionFromHeader(line);
    if (header) {
      finish();
      inGlossary = false;
      sawSection = true;
      if (!sawUnit) warnings.push("没有找到 Unit 标题；段落先归入 Unit 1，请在核对时选择正确单元。");
      current = { unit, section: header.section, title: header.title, body: [] };
      continue;
    }
    if (current && !inGlossary && isGlossaryHeader(line)) {
      inGlossary = true;
      warnings.push(`Unit ${current.unit} · ${current.section.toUpperCase()} 检测到生词表标记；已省略该标记之后的词表内容。`);
      continue;
    }
    if (current && !inGlossary) current.body.push(line);
  }
  finish();

  if (passages.length === 0) {
    // Pasted single-passage text remains usable; the UI asks the user to verify its default destination.
    return {
      passages: [{ unit: 1, section: "section_a", title: "", passage: raw.trim(), needsReview: true }],
      warnings: ["未识别到 Unit / Section 标题，已暂放在 Unit 1 · Section A；请核对并选择正确位置。"],
    };
  }
  if (sawSection && !sawUnit && !warnings.some((warning) => warning.startsWith("没有找到 Unit"))) {
    warnings.push("没有找到 Unit 标题；段落先归入 Unit 1，请在核对时选择正确单元。");
  }
  if (!sawSection) warnings.push("未发现 Section 标题；请检查识别结果。");
  return { passages, warnings };
}

/** Decode only UTF-8 text files. Invalid byte sequences must not silently become replacement characters. */
export function decodeTextbookBytes(bytes: Uint8Array): string {
  if (bytes.byteLength > MAX_TEXTBOOK_FILE_BYTES) throw new TextbookInputError(`文件超过 ${MAX_TEXTBOOK_FILE_BYTES.toLocaleString()} 字节上限，请分篇导入。`);
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new TextbookInputError("文件不是有效的 UTF-8 文本；请另存为 UTF-8 后再导入。");
  }
  if (text.includes("\u0000")) throw new TextbookInputError("文件含有二进制或非 UTF-8 内容；当前只支持 .txt / .md 文本。");
  if (!text.trim()) throw new TextbookInputError("文件内容为空。");
  if (text.length > MAX_TEXTBOOK_CHARS) throw new TextbookInputError(`内容超过 ${MAX_TEXTBOOK_CHARS.toLocaleString()} 个字符上限，请分篇导入。`);
  return text;
}

export function previewPassage(passage: string): { sentenceCount: number; firstSentence: string } {
  const sentences = splitSentences(passage);
  return { sentenceCount: sentences.length, firstSentence: sentences[0] ?? "" };
}
