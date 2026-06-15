import type { WordMemory } from "../core/types";

/** 新词默认记忆参数 */
export function createWordMemory(): WordMemory {
  return { interval: 0, ease: 2.5, reps: 0, dueAt: Date.now(), lastQuality: 0 };
}

/**
 * SM-2 间隔重复调度（SuperMemo 算法简化版）
 * quality: 0-5，3 及以上视为回忆成功
 */
export function scheduleReview(prev: WordMemory, quality: number, now = Date.now()): WordMemory {
  let { interval, ease, reps } = prev;
  const q = Math.max(0, Math.min(5, quality));

  if (q < 3) {
    reps = 0;
    interval = 1;
  } else if (reps === 0) {
    interval = 1;
    reps = 1;
  } else if (reps === 1) {
    interval = 6;
    reps = 2;
  } else {
    interval = Math.max(1, Math.round(interval * ease));
    reps += 1;
  }

  ease = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ease < 1.3) ease = 1.3;

  const dueAt = now + interval * 24 * 60 * 60 * 1000;
  return { interval, ease, reps, dueAt, lastQuality: q };
}

/** 是否已纳入长期记忆库（至少学习过一次） */
export function isLearned(memory: WordMemory): boolean {
  return memory.reps > 0;
}

/** 是否到期该复习（仅对已学过的词） */
export function isDue(memory: WordMemory, now = Date.now()): boolean {
  return isLearned(memory) && memory.dueAt <= now;
}
