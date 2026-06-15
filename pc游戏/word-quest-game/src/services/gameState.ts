import type { CourseId, GameSave, WordMemory } from "../core/types";
import { createDefaultSave } from "../core/save";
import { loadSave, writeSave } from "../infra/storage";
import { createWordMemory, isDue, isLearned, scheduleReview } from "./srs";

export { createDefaultSave };

/** 存档读写与学习调度 */
export class GameState {
  save: GameSave;

  constructor(save?: GameSave) {
    this.save = save ?? createDefaultSave();
    this.ensureFields();
  }

  /** 从本地存储加载 */
  static load(): GameState {
    return new GameState(loadSave());
  }

  /** 持久化 */
  persist(): void {
    writeSave(this.save);
  }

  /** 切换课程 */
  setCourse(courseId: CourseId): void {
    this.save.courseId = courseId;
    this.persist();
  }

  /** 补齐字段 */
  private ensureFields(): void {
    if (!this.save.discoveredWords) this.save.discoveredWords = [];
    if (!this.save.mapNodeId) this.save.mapNodeId = "";
    if (!this.save.levelProgress) this.save.levelProgress = {};
    if (!this.save.wordMemory) this.save.wordMemory = {};
  }

  /** 记录当前地图站点 */
  setMapNode(nodeId: string): void {
    this.save.mapNodeId = nodeId;
    this.persist();
  }

  /** 获取单词记忆状态 */
  getMemory(wordId: string): WordMemory {
    return this.save.wordMemory[wordId] ?? createWordMemory();
  }

  /**
   * 回忆自评并更新间隔重复
   * quality: 1=忘记 3=模糊 4=记住 5=秒懂
   */
  gradeWord(wordId: string, quality: number): void {
    const next = scheduleReview(this.getMemory(wordId), quality);
    this.save.wordMemory[wordId] = next;
    if (quality >= 3 && !this.save.discoveredWords.includes(wordId)) {
      this.save.discoveredWords.push(wordId);
    }
    this.persist();
  }

  /** 完成关卡 */
  completeLevel(levelId: string): void {
    if (this.save.levelProgress[levelId]?.cleared) return;
    this.save.levelProgress[levelId] = { cleared: true };
    this.persist();
  }

  /** 单词是否已纳入长期记忆库 */
  isWordDiscovered(wordId: string): boolean {
    return this.save.discoveredWords.includes(wordId);
  }

  /** 统计当前词库中到期应复习的词数 */
  countDueWords(wordIds: Iterable<string>, now = Date.now()): number {
    return this.getDueWordIds(wordIds, Number.MAX_SAFE_INTEGER, now).length;
  }

  /**
   * 取到期复习词 ID，按紧迫度排序
   * 优先：逾期越久、上次自评越低
   */
  getDueWordIds(wordIds: Iterable<string>, limit = 12, now = Date.now()): string[] {
    const scored: { id: string; score: number }[] = [];
    for (const id of wordIds) {
      const mem = this.getMemory(id);
      if (!isDue(mem, now)) continue;
      const overdueDays = Math.max(0, (now - mem.dueAt) / (24 * 60 * 60 * 1000));
      const weak = mem.lastQuality < 3 ? 2 : mem.lastQuality < 4 ? 1 : 0;
      scored.push({ id, score: overdueDays * 10 + weak * 5 + (6 - mem.ease) });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.id);
  }

  /** 统计一组词中有多少到期 */
  countDueInSet(wordIds: string[], now = Date.now()): number {
    let n = 0;
    for (const id of wordIds) {
      if (isDue(this.getMemory(id), now)) n += 1;
    }
    return n;
  }

  /** 学习统计 */
  getLearningStats(wordIds: Iterable<string>): { learned: number; mastered: number; weak: number } {
    let learned = 0;
    let mastered = 0;
    let weak = 0;
    for (const id of wordIds) {
      const mem = this.getMemory(id);
      if (!isLearned(mem)) continue;
      learned += 1;
      if (mem.lastQuality >= 4 && mem.interval >= 6) mastered += 1;
      if (mem.lastQuality <= 2) weak += 1;
    }
    return { learned, mastered, weak };
  }

  /**
   * 薄弱词：上次自评为忘记/勉强，优先巩固
   * 排除已到期复习队列中的词，避免重复练同一批
   */
  getWeakWordIds(wordIds: Iterable<string>, limit = 8, exclude = new Set<string>()): string[] {
    const scored: { id: string; score: number }[] = [];
    for (const id of wordIds) {
      if (exclude.has(id)) continue;
      const mem = this.getMemory(id);
      if (!isLearned(mem) || mem.lastQuality > 2) continue;
      scored.push({ id, score: (3 - mem.lastQuality) * 10 + (6 - mem.ease) });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.id);
  }
}
