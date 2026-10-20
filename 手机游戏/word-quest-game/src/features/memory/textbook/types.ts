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
