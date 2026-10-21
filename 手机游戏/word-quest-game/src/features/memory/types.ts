/**
 * 回忆脚本的数据格式与校验。纯数据 + 纯函数，不依赖 three / DOM，可在 node 下测试。
 * 对应 docs/api-memory-m1.md 第 2 节。
 */

import { isWeatherKind, type WeatherKind } from "../world/weather";

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

/**
 * lap：坐着双手放在膝上（含胸靠背）；reach：右手在约 1.5 秒里慢慢抬起，用手 IK 伸向 seat.reach（左手仍放在膝上）；
 * laugh：坐着大笑后仰（定格用）。有 seat 的人除 stand / walk 外一律坐在椅子上。
 */
export type ActorPose = "stand" | "phone" | "listen" | "talk" | "write" | "read" | "walk" | "point" | "sit" | "lap" | "reach" | "laugh";

/** 座位 / 桌子标定：actor 的 position / rotationY 就是椅面中心与朝向，其余量相对它（单位米） */
export interface ActorSeat {
  /** 椅面高度 */
  height: number;
  /** 桌面高度 */
  tableHeight?: number;
  /** 椅面中心到桌子近侧边缘的前向距离 */
  tableEdge?: number;
  /** 本座位前纸 / 笔记本中心（座位局部：x = 角色左侧，z = 前方） */
  paper?: { x: number; z: number };
  /** 伸手目标（座位局部坐标：x = 角色左侧，y = 离地高度，z = 前方），pose "reach" 时右手伸向这里 */
  reach?: Vec3;
}

export interface Actor {
  id: string; // "me2026" 表示年轻的“我”
  name: string; // "Me (2026)" / "Lin"
  /** createPerson 的参数：服装、发型、肤色、性别 */
  look: Record<string, unknown>;
  position: Vec3;
  rotationY?: number;
  pose?: ActorPose;
  /** 有座位：坐下时校准到椅面 / 桌面（骨盆落在椅面上、脚平放地面、手落在桌上），站起 / 入座有过渡动作 */
  seat?: ActorSeat;
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

/** 一幕里的视角：他（第三人称，默认）/ 我（第一人称，真实上课）/ 纸（二维笔记本）。第二人称的 “你” 只在下潜与上浮，不在切换器里 */
export type ActPov = "watch" | "me" | "paper";

/** 一道理解题（来自 micro_world_checks 与 reading.questions） */
export interface ActQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

/** 一个提纲要点的填词选择：答案词（本单元词的任一屈折形式）与干扰词 */
export interface OutlineChoice {
  /** 正确的词形（讲义 / 提纲里出现的词形） */
  answers: string[];
  wordIds: string[];
  decoys: string[];
}

/** 笔记本任务 */
export type NoteTask =
  | { kind: "translate"; zh: string; en: string; keywords: string[] } // sections.translation.sentences
  | { kind: "fill"; line: string; answers: string[]; wordIds: string[]; decoys: string[] } // 课文原句挖词；line 里的空位是 ____
  | { kind: "outline"; prompt: string; points: string[]; choices: OutlineChoice[] }; // sections.writing

/** 本幕的断片：第三人称里答对画面中的物件，记忆才接得上 */
export interface ActGap {
  /** 断片的句子在本幕里的序号 */
  sentence: number;
  answerWordId: string;
  decoyWordIds: string[];
}

/** 一句话的舞台提示 */
export interface SentenceCue {
  build?: string[];
  camera?: CameraShot;
  /** 中文字幕 */
  zh?: string;
}

/** 附身对话（在第三人称里是旁观，在第一人称里要自己开口） */
export interface ActDialog {
  speaker: string;
  line: string;
  zh?: string;
  options: Array<{ wordId?: string; label?: string; reply: string; correct: boolean }>;
}

/** 回忆的一幕：课文按段落切出来的一段。三种视角看的是同一幕的不同内容 */
export interface MemoryAct {
  index: number;
  /** 本幕的课文句子（原文，按句切分） */
  sentences: string[];
  /** 本幕第一句在整篇课文里的序号 */
  start: number;
  /** 本幕出现的单元词 */
  wordIds: string[];
  /** 本幕的理解题 */
  questions: ActQuestion[];
  /** 本幕的笔记任务（填词 → 翻译 → 最后一幕的写作） */
  notes: NoteTask[];
  /** 本幕开始时显形的舞台部件 */
  build?: string[];
  /** 本幕开始时的人物动作（只用 actor 节拍） */
  actorCues?: Beat[];
  /** 逐句的舞台提示，序号与 sentences 对应 */
  cues?: SentenceCue[];
  gap?: ActGap;
  dialog?: ActDialog;
}

/** 手机干扰（主题机制，单元 1：学习时手机偶尔亮起通知） */
export interface DistractionSpec {
  kind: "phone";
  /** 无关消息：[发件人, 内容] */
  messages: Array<[string, string]>;
}

/** 节拍：回忆按顺序执行的一步 */
export type Beat =
  | { kind: "narrate"; pov: Pov; text: string; zh?: string; build?: string[]; camera?: CameraShot; speak?: boolean; voice?: Voice; /** 说这句话的人物 actor id（嘴 / 手势 / 其他人的视线跟着他） */ speaker?: string }
  | { kind: "touch"; prompt: string; zh?: string; wordIds: string[] } // 第二人称：触碰这些物件
  | { kind: "gap"; sentence: string; answerWordId: string; decoyWordIds: string[]; camera?: CameraShot; zh?: string; build?: string[] } // 断片：选对物件
  | {
      kind: "choice";
      speaker: string;
      line: string;
      zh?: string;
      /**
       * 选项。wordId 缺省时用 label 作为按钮文字（开场的 “Ready.” / “Not yet.”）；
       * soft=true 的选项不算答错：回复一句话，停顿后再问一次（“Not yet.”）
       */
      options: Array<{ wordId?: string; label?: string; reply: string; correct: boolean; soft?: boolean }>;
      camera?: CameraShot;
      /** 提问的音色，默认 young（同学）；开场用 system */
      voice?: Voice;
      /** 第一人称借谁的眼睛，默认 "me2026"（年轻的我）；开场借 2090 年的他 */
      viewer?: string;
      /** 视线朝向的世界坐标（speaker 不是场景里的人物时用；缺省朝向说话的人，再缺省朝向 viewer 自己的方向） */
      lookAt?: Vec3;
    } // 附身对话
  | { kind: "actor"; actorId: string; action: "enter" | "walk" | "pose" | "exit"; to?: Vec3; pose?: ActorPose; duration?: number }
  | { kind: "pov"; to: Pov; camera?: CameraShot }
  | { kind: "paper"; page: PaperPage } // 二维旧笔记本
  | { kind: "wait"; seconds: number }
  | {
      /** 让一批舞台部件 / 人物 / 物件显形（不朗读）。camera 不阻塞；等待 wait 秒（缺省等于 duration） */
      kind: "build";
      targets: string[];
      duration?: number;
      pov?: Pov;
      camera?: CameraShot;
      wait?: number;
    }
  | { kind: "dive"; seconds?: number } // 下潜：光粒洪流越来越急，闭上眼睛（渐黑，不再淡白）
  | {
      /** 切换天气（不阻塞）：seconds 为过渡时长，缺省 6 秒；look 可同时切换记忆色调（2 秒平滑） */
      kind: "weather";
      weather: WeatherKind;
      seconds?: number;
      look?: string;
    }
  | {
      /** 进入 “幕” 的时间线：跑完 script.acts 里的全部幕（自由切换视角，默认第三人称），再继续后面的节拍 */
      kind: "acts";
      startPov?: ActPov;
    }
  | {
      kind: "freeze";
      caption: string;
      zh?: string;
      /** 定格淡白之后回到 2090 年：老年的他说的一句话（雨声 + 字幕） */
      epilogue?: { text: string; zh?: string; voice?: Voice };
      /** 专注度偏低（被手机分心）时换成这一句 */
      epilogueDistracted?: { text: string; zh?: string; voice?: Voice };
    }; // 定格成底片，上浮

export interface MemoryScript {
  id: string; // "u01a"
  unitId: string; // "unit01"
  section: "section_a" | "section_b" | "section_c";
  title: string;
  titleZh: string;
  /** 舞台：由哪个 builder 搭场景 */
  stage: string; // "clubRoom"
  /** 默认天气（缺省用舞台默认） */
  weather?: WeatherKind;
  /** 记忆色调 id 覆盖（缺省按 unitId 取） */
  look?: string;
  /** 可建立的部件表（可选）。narrate.build 里的字符串先按 id 查这里，查不到就当作舞台部件名直接显形 */
  pieces?: BuildPiece[];
  actors: Actor[];
  objects: WordObjectPlacement[];
  beats: Beat[];
  /** “幕” 时间线：由 beats 里的 { kind: "acts" } 驱动 */
  acts?: MemoryAct[];
  /** 第一人称里提问的人（老师 / 组织者）的 actor id */
  organizer?: string;
  /** 第一人称借谁的眼睛上课，缺省 me2026 */
  student?: string;
  /** 学习时的手机干扰 */
  distraction?: DistractionSpec;
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
  /** 在第一人称 / 笔记本的主动任务里用到的词（掌握度只在这里增加） */
  wordsMastered?: string[];
  /** 第一人称的平均专注度 0–1（没有干扰机制时为 1） */
  focus?: number;
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
        for (const o of beat.options) {
          if (o.wordId) needWord(o.wordId, where);
          else if (!o.label) err(`${where}: 选项既没有 wordId 也没有 label`);
        }
        if (beat.viewer && !actorIds.has(beat.viewer)) err(`${where}: 不存在的 viewer ${beat.viewer}`);
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
      case "build":
        if (beat.targets.length === 0) err(`${where}: 没有要显形的目标`);
        for (const ref of beat.targets) {
          if (pieceIds.has(ref) || actorIds.has(ref) || objectIds.has(ref)) continue;
          if (ref.startsWith("actor:") && actorIds.has(ref.slice(6))) continue;
          if (ref.startsWith("word:") && objectIds.has(ref.slice(5))) continue;
          if (targets && targets.has(ref)) continue;
          if (!targets && !script.pieces) continue;
          err(`${where}: build 目标 ${ref} 不存在`);
        }
        break;
      case "acts":
        if (!script.acts || script.acts.length === 0) err(`${where}: 脚本没有 acts`);
        break;
      case "weather":
        if (!isWeatherKind(beat.weather)) err(`${where}: 未知天气 ${String(beat.weather)}`);
        if (beat.seconds !== undefined && !(beat.seconds >= 0)) err(`${where}: 非法过渡时长`);
        break;
      case "pov":
      case "dive":
      case "freeze":
        break;
    }
  });

  for (const key of [script.organizer, script.student]) {
    if (key && !actorIds.has(key)) err(`不存在的 actor ${key}（organizer / student）`);
  }
  for (const act of script.acts ?? []) {
    const where = `act#${act.index}`;
    if (act.sentences.length === 0) err(`${where}: 没有句子`);
    act.cues?.forEach((cue, i) => {
      checkBuild(cue.build, `${where}.cue#${i}`);
      if (i >= act.sentences.length) err(`${where}: cue#${i} 超出句子数`);
    });
    checkBuild(act.build, where);
    for (const cue of act.actorCues ?? []) {
      if (cue.kind !== "actor") err(`${where}: actorCues 只能是 actor 节拍`);
      else if (!actorIds.has(cue.actorId)) err(`${where}: 不存在的 actor ${cue.actorId}`);
    }
    if (act.gap) {
      const g = act.gap;
      const sentence = act.sentences[g.sentence];
      if (sentence === undefined) err(`${where}: 断片的句序 ${g.sentence} 越界`);
      needObject(g.answerWordId, `${where}.gap`);
      for (const id of g.decoyWordIds) {
        needObject(id, `${where}.gap`);
        if (id === g.answerWordId) err(`${where}.gap: 干扰词与答案相同`);
        const d = ctx.words?.get(id);
        if (sentence !== undefined && d && findWordToken(sentence, d.word)) err(`${where}.gap: 干扰词 ${d.word} 也出现在句子里`);
      }
      const answer = ctx.words?.get(g.answerWordId);
      if (sentence !== undefined && answer && !findWordToken(sentence, answer.word)) err(`${where}.gap: 句子里没有答案词 ${answer.word}`);
    }
    if (act.dialog) {
      if (act.dialog.options.length < 2) err(`${where}.dialog: 选项少于 2 个`);
      if (!act.dialog.options.some((o) => o.correct)) err(`${where}.dialog: 没有正确选项`);
      for (const o of act.dialog.options) {
        if (o.wordId) needWord(o.wordId, `${where}.dialog`);
        else if (!o.label) err(`${where}.dialog: 选项既没有 wordId 也没有 label`);
      }
      if (!script.actors.some((a) => a.name === act.dialog!.speaker || a.id === act.dialog!.speaker)) err(`${where}.dialog: 说话的人 ${act.dialog.speaker} 不在 actors 里`);
    }
  }

  if (script.weather !== undefined && !isWeatherKind(script.weather)) err(`未知的默认天气 ${String(script.weather)}`);
  if (script.beats.length === 0) err("脚本没有任何节拍");
  return errors;
}
