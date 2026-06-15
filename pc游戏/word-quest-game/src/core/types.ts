/** 课程标识 */
export type CourseId = "cet4" | "cet6" | "college_english_rw3";

/** 词库条目（仅保留运行时字段） */
export interface WordEntry {
  id: string;
  word: string;
  pos: string;
  meaning: string;
  example?: string;
}

/** 关卡定义 */
export interface LevelDef {
  id: string;
  title: string;
  word_ids: string[];
}

/** 区域定义 */
export interface ZoneDef {
  id: string;
  name: string;
  name_en: string;
  type: string;
  order?: number;
  levels: LevelDef[];
}

/** 课程模板 */
export interface CourseTemplate {
  id: CourseId;
  name: string;
  zones: ZoneDef[];
}

/** 词库包 */
export interface VocabBundle {
  words: WordEntry[];
}

/** 关卡进度 */
export interface LevelProgress {
  cleared: boolean;
}

/** 地图探索节点 */
export interface MapNode {
  id: string;
  zoneName: string;
  name: string;
  icon: string;
  theme: string;
  x: number;
  y: number;
  z: number;
  unlocked: boolean;
  cleared: boolean;
  /** 该站点词库中到期应复习的词数 */
  dueCount?: number;
}

/** 学习场景来源 */
export type SceneMode = "level" | "review" | "weak";

/** 故事段落片段 */
export interface ContextSegment {
  type: "text" | "word";
  content: string;
  wordId?: string;
}

/** 语境中的单词 */
export interface WordInContext {
  id: string;
  word: string;
  pos: string;
  meaning: string;
  contextLine: string;
}

/** 单词间隔重复记忆状态 */
export interface WordMemory {
  interval: number;
  ease: number;
  reps: number;
  dueAt: number;
  lastQuality: number;
}

/** 语境填空题 */
export interface ClozeItem {
  wordId: string;
  word: string;
  sentence: string;
  choices: string[];
  answer: string;
}

/** 场景学习阶段（四六级等沿用 input/cloze；读写3 用 rw3） */
export type ScenePhase = "input" | "cloze" | "rw3";

/** 阅读理解 / 听力选择题 */
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

/** 翻译练习句 */
export interface TranslationSentence {
  zh: string;
  enReference: string;
  keywords: string[];
}

/** 读写3 单元学习阶段 */
export type Rw3Phase =
  | {
      kind: "section_a" | "section_b" | "section_c";
      label: string;
      title: string;
      segments: ContextSegment[];
      words: WordInContext[];
    }
  | {
      kind: "vocab";
      label: string;
      level: number;
      totalLevels: number;
      words: WordInContext[];
    }
  | {
      kind: "reading_quiz";
      label: string;
      title: string;
      questions: QuizQuestion[];
    }
  | {
      kind: "listening";
      label: string;
      title: string;
      script: string;
      segments: ContextSegment[];
      questions: QuizQuestion[];
    }
  | { kind: "cloze"; label: string; items: ClozeItem[] }
  | { kind: "translation"; label: string; sentences: TranslationSentence[] }
  | { kind: "writing"; label: string; prompt: string; outline: string[] };

/** 语境阅读场景 */
export interface ContextScene {
  levelId: string;
  title: string;
  settingEn: string;
  chapter: string;
  plotZh: string;
  philosophyZh: string;
  philosophyEn: string;
  segments: ContextSegment[];
  words: WordInContext[];
  /** 读写3 完整单元管线（Section A/B/C + 词汇 + 阅读/听力 + 填空 + 翻译 + 写作） */
  rw3Phases?: Rw3Phase[];
}

/** 本地存档 */
export interface GameSave {
  courseId: CourseId;
  levelProgress: Record<string, LevelProgress>;
  mapNodeId: string;
  discoveredWords: string[];
  wordMemory: Record<string, WordMemory>;
}
