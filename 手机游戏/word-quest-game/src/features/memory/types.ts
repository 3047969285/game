/**
 * 回忆脚本的数据格式与校验。纯数据 + 纯函数，不依赖 three / DOM，可在 node 下测试。
 * 对应 docs/api-memory-m1.md 第 2 节。
 */

export type Pov = "you" | "watch" | "me" | "paper"; // 第二人称 / 第三人称 / 第一人称 / 二维

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** 场景里的一块“可建立”的东西：随某句话从洪流中显形 */
export interface BuildPiece {
  id: string;
  /** 由 stage builder 生成的 Object3D 的名字（builder 用 group.name 标记） */
  target: string;
  /** 显形时长（秒），默认 2.5 */
  duration?: number;
  /** 显形方式：rise 从地面升起（墙、桌）、condense 光粒凝结（物件）、grow 由下往上生长（树、植物）、fade 淡入（光、天空） */
  style?: BuildStyle;
}

export type BuildStyle = "rise" | "condense" | "grow" | "fade";

/** 记忆物件 = 一个单词 */
export interface WordObjectPlacement {
  wordId: string; // rw3_unit01_04
  archetype: string; // 见 memoryObjects.ts
  position: Vec3;
  rotationY?: number;
  scale?: number;
}

export type ActorPose = "stand" | "phone" | "listen" | "talk" | "write" | "read" | "walk" | "point" | "sit";

export interface Actor {
  id: string; // "me2026" 表示年轻的“我”
  name: string; // "Me (2026)" / "Lin"
  /** createPerson 的参数：服装、发型、肤色、性别 */
  look: Record<string, unknown>;
  position: Vec3;
  rotationY?: number;
  pose?: ActorPose;
}

export interface CameraShot {
  /** 机位与目标；duration 秒内从当前机位平滑运镜过去 */
  from?: Vec3;
  to: Vec3;
  look: Vec3;
  duration?: number;
  fov?: number;
  /** 镜头运动风格 */
  move?: "dolly" | "orbit" | "push" | "still";
}

export interface PaperPage {
  style: "notebook" | "diary" | "ticket";
  title: string;
  /** 每行：原文含 {{wordId}} 占位，被“晕开”的位置由玩家用词块补全 */
  lines: string[];
  /** 额外干扰词块 */
  decoyWordIds: string[];
}

export type Voice = "system" | "young" | "old";

/** 节拍：回忆按顺序执行的一步 */
export type Beat =
  | { kind: "narrate"; pov: Pov; text: string; zh?: string; build?: string[]; camera?: CameraShot; speak?: boolean; voice?: Voice }
  | { kind: "touch"; prompt: string; zh?: string; wordIds: string[] } // 第二人称：触碰这些物件
  | { kind: "gap"; sentence: string; answerWordId: string; decoyWordIds: string[]; camera?: CameraShot; zh?: string; build?: string[] } // 断片：选对物件
  | {
      kind: "choice";
      speaker: string;
      line: string;
      zh?: string;
      options: Array<{ wordId: string; reply: string; correct: boolean }>;
      camera?: CameraShot;
    } // 附身对话
  | { kind: "actor"; actorId: string; action: "enter" | "walk" | "pose" | "exit"; to?: Vec3; pose?: ActorPose; duration?: number }
  | { kind: "pov"; to: Pov; camera?: CameraShot }
  | { kind: "paper"; page: PaperPage } // 二维旧笔记本
  | { kind: "wait"; seconds: number }
  | { kind: "freeze"; caption: string; zh?: string }; // 定格成底片，上浮

export interface MemoryScript {
  id: string; // "u01a"
  unitId: string; // "unit01"
  section: "section_a" | "section_b" | "section_c";
  title: string;
  titleZh: string;
  /** 舞台：由哪个 builder 搭场景 */
  stage: string; // "clubRoom"
  /** 可建立的部件表（可选）。narrate.build 里的字符串先按 id 查这里，查不到就当作舞台部件名直接显形 */
  pieces?: BuildPiece[];
  actors: Actor[];
  objects: WordObjectPlacement[];
  beats: Beat[];
  /** 回忆完成后 2026 校园地图上点亮的东西（交给 App） */
  reward?: { lightNode?: string };
}

export interface MemoryResult {
  /** 是否从头播到尾（freeze 之后） */
  completed: boolean;
  /** 玩家是否中途退出 */
  exited: boolean;
  /** 本次触碰 / 答对过的词 */
  wordsSeen: string[];
  /** 断片 / 选择 / 笔记本里的答错次数 */
  mistakes: number;
}

/** 纸页占位符：{{rw3_unit01_13}} */
export const PAPER_SLOT_RE = /\{\{([^{}]+)\}\}/g;

export function paperSlotIds(page: PaperPage): string[] {
  const ids: string[] = [];
  for (const line of page.lines) {
    for (const m of line.matchAll(PAPER_SLOT_RE)) ids.push(m[1]);
  }
  return ids;
}

export interface ValidateContext {
  /** 舞台里存在的部件名（stageTargets(script.stage)） */
  stageTargets?: readonly string[];
  /** 单元词表：wordId -> 词形。提供后会校验词是否属于词表，并检查 gap 句子里含答案词 */
  words?: ReadonlyMap<string, { word: string }>;
}

/** 在句子里找某个词（允许常见屈折后缀）。返回命中的原文片段，没有命中返回 null */
export function findWordToken(sentence: string, word: string): { index: number; length: number; text: string } | null {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = new RegExp(`\\b${escaped}(?:s|es|ed|d|ing)?\\b`, "i").exec(sentence);
  return m ? { index: m.index, length: m[0].length, text: m[0] } : null;
}

/**
 * 校验脚本里的全部引用：build 目标、wordId、actorId。返回错误列表，空数组代表通过。
 */
export function validateScript(script: MemoryScript, ctx: ValidateContext = {}): string[] {
  const errors: string[] = [];
  const err = (msg: string): void => {
    errors.push(`[${script.id}] ${msg}`);
  };

  const targets = ctx.stageTargets ? new Set(ctx.stageTargets) : null;
  const pieceIds = new Set<string>();
  for (const piece of script.pieces ?? []) {
    if (pieceIds.has(piece.id)) err(`重复的 piece id: ${piece.id}`);
    pieceIds.add(piece.id);
    if (targets && !targets.has(piece.target)) err(`piece ${piece.id} 指向不存在的舞台部件 ${piece.target}`);
  }
  const checkBuild = (list: string[] | undefined, where: string): void => {
    for (const ref of list ?? []) {
      if (pieceIds.has(ref)) continue;
      if (targets && targets.has(ref)) continue;
      if (!targets && !script.pieces) continue; // 没有任何可校验的信息
      err(`${where}: build 引用 ${ref} 既不是 piece id 也不是舞台部件`);
    }
  };

  const actorIds = new Set<string>();
  for (const actor of script.actors) {
    if (actorIds.has(actor.id)) err(`重复的 actor id: ${actor.id}`);
    actorIds.add(actor.id);
  }

  const objectIds = new Set<string>();
  for (const obj of script.objects) {
    if (objectIds.has(obj.wordId)) err(`重复的物件 ${obj.wordId}`);
    objectIds.add(obj.wordId);
    if (ctx.words && !ctx.words.has(obj.wordId)) err(`物件 ${obj.wordId} 不在词表里`);
  }

  const knownWord = (id: string): boolean => objectIds.has(id) || (ctx.words ? ctx.words.has(id) : false);
  const needWord = (id: string, where: string): void => {
    if (!knownWord(id)) err(`${where}: 词 ${id} 既不在 objects 里也不在单元词表里`);
  };
  const needObject = (id: string, where: string): void => {
    if (!objectIds.has(id)) err(`${where}: 词 ${id} 必须在 objects 里有物件`);
  };

  script.beats.forEach((beat, i) => {
    const where = `beat#${i}(${beat.kind})`;
    switch (beat.kind) {
      case "narrate":
        checkBuild(beat.build, where);
        if (!beat.text.trim()) err(`${where}: 空文本`);
        break;
      case "touch":
        if (beat.wordIds.length === 0) err(`${where}: 没有可触碰的词`);
        for (const id of beat.wordIds) needObject(id, where);
        break;
      case "gap": {
        checkBuild(beat.build, where);
        needObject(beat.answerWordId, where);
        for (const id of beat.decoyWordIds) {
          needObject(id, where);
          if (id === beat.answerWordId) err(`${where}: 干扰词与答案相同 ${id}`);
        }
        const answer = ctx.words?.get(beat.answerWordId);
        if (answer && !findWordToken(beat.sentence, answer.word)) err(`${where}: 句子里没有答案词 ${answer.word}`);
        break;
      }
      case "choice":
        if (beat.options.length < 2) err(`${where}: 选项少于 2 个`);
        if (!beat.options.some((o) => o.correct)) err(`${where}: 没有正确选项`);
        for (const o of beat.options) needWord(o.wordId, where);
        break;
      case "actor":
        if (!actorIds.has(beat.actorId)) err(`${where}: 不存在的 actor ${beat.actorId}`);
        if (beat.action === "walk" && !beat.to) err(`${where}: walk 需要 to`);
        break;
      case "paper": {
        const slots = paperSlotIds(beat.page);
        if (slots.length === 0) err(`${where}: 纸页没有任何空位`);
        for (const id of slots) needWord(id, where);
        for (const id of beat.page.decoyWordIds) needWord(id, where);
        break;
      }
      case "wait":
        if (!(beat.seconds >= 0)) err(`${where}: 非法时长`);
        break;
      case "pov":
      case "freeze":
        break;
    }
  });

  if (script.beats.length === 0) err("脚本没有任何节拍");
  return errors;
}
