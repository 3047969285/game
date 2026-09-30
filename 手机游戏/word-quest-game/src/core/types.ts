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

/** 单元世界中的原创语法讲解点 */
export interface GrammarPoint {
  id: string;
  title: string;
  concept: string;
  pattern: string;
  explanation: string;
  examples: Array<{ en: string; zh: string }>;
  pitfall: string;
}

/** 记忆宫殿路线中的一个空间锚点 */
export interface MemoryRouteStop {
  place: string;
  image: string;
  recall: string;
}

/** 把记忆方法转化为游戏动作，而不是只放在说明文字里 */
export interface MethodStep {
  id: string;
  title: string;
  principle: string;
  action: string;
  reward: string;
}

/** 学习科学策略及其在游戏中的可执行动作。 */
export interface LearningMethod {
  id: string;
  title: string;
  principle: string;
  action: string;
}

/** 读写3 单元内部的逻辑子世界。单元入口固定，文章与训练可以拥有多个世界。 */
export type Rw3SubWorldKind =
  | "section_a"
  | "section_b"
  | "stories_of_china"
  | "learning_lab"
  | "unit_project";

export interface Rw3SubWorld {
  id: string;
  kind: Rw3SubWorldKind;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
  phaseKinds: Rw3Phase["kind"][];
}

/** 读写3 每个单元的原创世界、叙事、语法与记忆训练配置 */
export interface UnitWorldContent {
  unitId: string;
  worldName: string;
  worldTagline: string;
  mentor: string;
  opening: string;
  mission: string;
  turningPoint: string;
  ending: string;
  landmarks: string[];
  grammar: GrammarPoint[];
  practiceQuestions: QuizQuestion[];
  methods: MethodStep[];
  memoryAnchor: string;
  memoryRoute: MemoryRouteStop[];
  recallPrompt: string;
}

/** 读写3 单元学习阶段 */
export type Rw3Phase =
  | {
      kind: "section_a" | "section_b" | "section_c";
      label: string;
      title: string;
      segments: ContextSegment[];
      words: WordInContext[];
      /** 文章段落拆出的微世界身份与主动检索任务。 */
      worldId?: string;
      worldTitle?: string;
      landmark?: string;
      memoryImage?: string;
      recallPrompt?: string;
      /** 文章微世界的段落级理解校准题。 */
      checkpoint?: QuizQuestion;
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
      kind: "grammar";
      label: string;
      title: string;
      points: GrammarPoint[];
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
  | { kind: "writing"; label: string; prompt: string; outline: string[] }
  | {
      kind: "memory";
      label: string;
      title: string;
      mentor: string;
      methods: MethodStep[];
      memoryAnchor: string;
      memoryRoute: MemoryRouteStop[];
      recallPrompt: string;
    };

/** 语境阅读场景 */
export interface ContextScene {
  levelId: string;
  /** 读写3 子世界所属单元，便于单元进度与子世界进度分离。 */
  unitId?: string;
  /** 读写3 单元内部子世界 ID。 */
  worldId?: string;
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
  /** 贯穿本单元的学习科学策略，不只是展示文案。 */
  learningMethods?: LearningMethod[];
  /** 该单元的原创世界与学习方法配置 */
  unitWorld?: UnitWorldContent;
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
  /** 当前单元入口中的子世界节点，返回入口时重新生成。 */
  subWorlds: Rw3SubWorld[];
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
  rewardIds: string[];
  experience: number;
}
