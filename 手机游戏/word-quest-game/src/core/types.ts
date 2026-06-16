/** 课程标识 */
export type CourseId = "cet4" | "cet6" | "college_english_rw3";

/** 词库条目（仅保留运行时字段） */
export interface WordEntry {
  id: string;
  word: string;
  pos: string;
  meaning: string;
  meanings?: string[];
  phonetic?: string;
  example?: string;
  example_zh?: string;
  collocation?: string;
}

/** 关卡定义 */
export interface LevelDef {
  id: string;
  title: string;
  word_ids: string[];
  content_refs?: string[];
  boss?: boolean;
}

/** CET 听力题 */
export interface CetListeningItem {
  id: string;
  title: string;
  script: string;
  questions: QuizQuestion[];
}

/** CET 阅读题 */
export interface CetReadingItem {
  id: string;
  title: string;
  passage: string;
  questions: QuizQuestion[];
}

/** CET 翻译题 */
export interface CetTranslationItem {
  id: string;
  zh: string;
  en_reference: string;
  keywords: string[];
}

/** CET 全套内容包 */
export interface CetContentBundle {
  listening: Map<string, CetListeningItem>;
  reading: Map<string, CetReadingItem>;
  translation: Map<string, CetTranslationItem>;
}

/** CET 场景类型 */
export type CetSceneKind = "listening" | "reading" | "translation" | "boss";

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

/** 地图上可拾取的词汇光球（原神风格探索收集点） */
export interface WordPickup {
  id: string;
  word: string;
  meaning: string;
  /** 世界坐标 */
  x: number;
  y: number;
  z: number;
  /** 是否已被收集 */
  collected: boolean;
}

/** 单元探索模式状态 */
export interface UnitExploreState {
  unitId: string;
  unitLabel: string;
  pickups: WordPickup[];
  collectedIds: Set<string>;
}

/** 本地存档 */
export interface GameSave {
  courseId: CourseId;
  levelProgress: Record<string, LevelProgress>;
  mapNodeId: string;
  discoveredWords: string[];
  wordMemory: Record<string, WordMemory>;
}
