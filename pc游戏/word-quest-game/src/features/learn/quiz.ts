import type { QuizQuestion } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";

/** 将单元 JSON 题目转为运行时格式 */
export function normalizeQuizQuestions(
  raw: Array<{
    question: string;
    options: string[];
    answer: number;
    explanation?: string;
  }> | undefined
): QuizQuestion[] {
  if (!raw?.length) return [];
  return raw.map((q) => ({
    question: q.question,
    options: q.options,
    answer: q.answer,
    explanation: q.explanation,
  }));
}

export function quizFromUnitReading(unit: Rw3UnitContent | undefined): QuizQuestion[] {
  return normalizeQuizQuestions(unit?.sections.reading?.questions);
}

export function quizFromUnitListening(unit: Rw3UnitContent | undefined): QuizQuestion[] {
  return normalizeQuizQuestions(unit?.sections.listening?.questions);
}
