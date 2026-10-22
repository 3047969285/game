import type { SectionKey } from "../ids";

export interface TextbookPassage {
  id: string;
  unit: number;
  section: SectionKey;
  title: string;
  passage: string;
  updatedAt: number;
}

export type TextbookPassageInput = Pick<TextbookPassage, "unit" | "section" | "title" | "passage">;

export interface ParsedPassage extends TextbookPassageInput {
  /** True when the parser could not find textbook headers and chose the editable default. */
  needsReview?: boolean;
}

export interface TextbookParseResult {
  passages: ParsedPassage[];
  warnings: string[];
}

export class TextbookInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TextbookInputError";
  }
}

export class TextbookStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TextbookStorageError";
  }
}

/** 教材包（rw3-pack/1）：版权原文只存在于本机，结构见 docs/textbook-rebuild/pack-schema.md。 */
export interface TextbookPack {
  schema: "rw3-pack/1";
  book: string;
  units: UnitPack[];
}

export interface UnitPack {
  unit: number;
  title: string;
  quotation?: { text: string; author: string };
  preview: string;
  texts: TextPack[];
  newWords: NewWord[];
  exercises: Exercise[];
  project?: { title: string; steps: string[] };
}

export interface TextPack {
  section: SectionKey;
  title: string;
  paragraphs: string[];
  scenes: SceneSpec[];
}

export interface SceneSpec {
  id: string;
  /** 1 起始的段号。 */
  paragraphs: number[];
  place: string;
  time: string;
  people: string[];
  objects: string[];
  mood: string;
  summary_zh: string;
  pov: "him" | "me" | "paper";
}

export interface NewWord {
  word: string;
  section: "section_a" | "section_b";
  phonetic?: string;
  pos?: string;
  def_en?: string;
  def_zh: string;
  phrase: boolean;
  paragraph?: number;
}

export type ExerciseKind =
  | "pre_reading" | "understanding" | "critical" | "words_in_use" | "word_building"
  | "banked_cloze" | "expressions_in_use" | "structure_writing" | "reading_skills"
  | "text_b_mcq" | "collocation" | "translation";

export interface Exercise {
  id: string;
  section: SectionKey;
  kind: ExerciseKind;
  instructions: string;
  bank?: string[];
  /** 带空短文，空位写成 {{1}} {{2}} …。 */
  passage?: string;
  items: ExerciseItem[];
  sample?: string;
}

export interface ExerciseItem {
  n: number;
  prompt: string;
  options?: string[];
  answer: string | number | string[] | null;
  answer_source: "derived" | "book" | "open";
  explanation_zh?: string;
}

export interface PackIssue {
  path: string;
  level: "error" | "warn";
  message: string;
}
