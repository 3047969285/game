# 接口文档：M1c 自由切换视角 · 第一人称真实学习 · 导入我的教材

对应 GDD：`docs/gdd-memory-game.md`。M1a/M1b 的引擎见 `docs/api-memory-m1.md`（第 8、9 节是实际实现）。

## 0. 用户反馈（本阶段要解决的）

1. 视角现在由剧本自动切换，玩家不能选；四种视角只是先后出现的不同阶段，不是同一段回忆的不同看法。
2. 默认应该是**第三人称**（看当年的我）。
3. **第一人称要是真实的学习过程**：坐在当年我的位子上，像真的在上这节课一样学这篇课文。
4. 内容太少：一段回忆只用了课文 8–10 句，课文的题目、翻译、写作都没进回忆。
5. 要能用真正的《大学英语读写教程 3》（第四版 · 思政智慧版）原文学习——但原文有版权、游戏公开发布，所以只能**由用户导入自己的教材**，只存在本机浏览器里。

## 1. 共享时间线

一段回忆 = 一篇课文（section_a / b / c）按**段落**切成若干“幕”（Act）。三种视角看的是同一条时间线，进度共享。

```ts
export interface MemoryAct {
  index: number;
  /** 本幕的课文句子（原文，按句切分） */
  sentences: string[];
  /** 本幕出现的单元词（在句子里出现的） */
  wordIds: string[];
  /** 本幕的理解题（来自 micro_world_checks[section] 与 sections.reading.questions，按出现位置分配到幕） */
  questions: Array<{ question: string; options: string[]; answer: number; explanation: string }>;
  /** 本幕的笔记任务（翻译句 / 写作提纲，按幕分配；最后一幕放写作） */
  notes: NoteTask[];
  /** 舞台布置：本幕要显形的部件、人物动作（手写脚本可指定；autoScript 按句子关键词自动分配） */
  build?: string[];
  actorCues?: Beat[];
}

export type NoteTask =
  | { kind: "translate"; zh: string; en: string; keywords: string[] }     // sections.translation.sentences
  | { kind: "fill"; line: string; answers: string[] }                     // 课文句挖词
  | { kind: "outline"; prompt: string; points: string[] };                // sections.writing

export function buildActs(unit: Rw3UnitContent, words: WordEntry[], section: Section, passageOverride?: string): MemoryAct[];
```

- 一篇约 19 句的课文切成 4–6 幕（按段落；没有段落标记时每 3–4 句一幕，尽量不拆开句意）。
- **课文要全部用上**，每一句都出现在某一幕里。
- 每篇课文的 micro_world_checks 题、`reading.questions`（section_a）、`translation.sentences`、`writing` 全部分配到幕里，不丢。

## 2. 三种视角 = 同一幕的三种内容

| 视角 | 默认 | 内容 | 推进方式 |
|------|------|------|----------|
| **他 · 第三人称**（WATCHING） | ✅ 默认 | 电影：本幕句子逐句朗读 + 字幕，世界随句子继续生长，同学和当年的我表演；每幕 1 次“断片”（挖词，选画面里的物件）| 自动播放；断片要答 |
| **我 · 第一人称**（ME） | | **真实上课**：见第 3 节 | 玩家完成本幕学习步骤 |
| **纸 · 二维**（PAPER） | | 当年我的课堂笔记本：本幕的生词卡（词、音标、词性、中文、课文原句）+ 一格漫画（本幕场景的定格截图做成手绘风格：降饱和 + 描边 + 纸纹）+ 本幕笔记任务 | 玩家完成笔记任务 |

- **切换器**：屏幕右上角三个小按钮「他 / 我 / 纸」，随时可点；当前视角高亮。切换时镜头平滑过渡（他→我：镜头推进到当年我的眼睛；我→纸：低头看向桌上的笔记本，纸张翻起铺满屏幕）。
- **进度规则**：一幕在**任一视角**完成即算看过（第三人称看完本幕 / 第一人称完成本幕学习 / 二维完成本幕笔记）；但单词“掌握度”只在第一人称和二维的主动任务里增加。第三人称看完自动进入下一幕；在第一人称 / 二维里，完成本幕任务后提示“下一幕”。
- **2090 的“你”**（第二人称）保留在开头（下潜建世界、触碰物件）和结尾（上浮），不在切换器里。
- 每幕结束时三种视角里没做的内容不强制，但在记忆匣里标为“这一幕的笔记还空着”。

## 3. 第一人称：真实的学习过程

当年的我坐在座位上。镜头在眼睛高度，看向桌面。桌上有：**课文讲义**（一页纸，3D 平面，用 Canvas 渲染清晰的英文排版）、**笔记本**、**笔**、**手机**。抬头能看到同学和组织者 / 老师、黑板。

本幕的学习步骤（按顺序，底部一行提示）：

1. **预习生词**：讲义上本幕的单元词淡淡标出。点一个词 → 笔划出下划线，页边出现手写批注（中文义 + 音标），同时朗读这个词。本幕生词都点过才继续（不认识的普通词也可以点，给出简短释义：先查单元词表，查不到只朗读不给释义）。
2. **跟读课文**：朗读本幕句子，讲义上当前句高亮、笔尖跟着移动；玩家可以随时点句子重听、点词查义。可调语速（0.8 / 1.0）。
3. **课堂提问**：抬头，老师 / 组织者看着你问本幕的理解题（朗读题目）；底部出现选项（每个选项一行，可展开看全文）。选对 → 老师点头，朗读 explanation；选错 → 老师说 “Look at the text again.”，讲义上相关句子闪一下，再选。
4. **记笔记**：低头看笔记本：本幕的 NoteTask。
   - translate：中文句在笔记本上，下方词块拼英文（keywords 一定在词块里；词块 = 参考译文切分 + 2–3 个干扰词），拼好朗读整句；
   - fill：课文原句挖空，从词块里选；
   - outline：写作提纲，每个要点选一个最合适的本单元词 / 句型填进去。
5. **手机干扰**（主题机制，单元 1 才有，后续单元可换成各自的干扰）：学习过程中手机偶尔亮起通知。点开会看到一条无关消息、并扣一点“专注”；不理它，专注保持。幕结束时显示本幕专注度（不影响通关，影响结尾旁白）。

## 4. 内容扩充

- 手写脚本 u01a 改为基于 `buildActs` 的时间线：保留现有的开场下潜、触碰、附身对话、结尾，但课文**全文** 19 句全部进入各幕。
- autoScript 也改为 `buildActs`：所有 18 段回忆都是“全文 + 全部题目 + 翻译 + 写作”。
- 二维漫画格：每幕在第三人称播放结束的那一帧截图（`renderer` 读取一帧到 canvas），套手绘风格滤镜，存为本幕漫画格；没看过第三人称的幕用舞台默认机位截一帧。

## 5. 导入我的教材（本机专用，不上传）

记忆匣里新增「导入我的教材」：

```ts
export interface ImportedTextbook {
  id: string;                 // 本机生成
  title: string;              // 用户填写或从文件推断
  importedAt: number;
  units: Array<{
    unit: number;             // 1–6（第四版第 3 册的单元号）
    sections: Partial<Record<"section_a" | "section_b" | "section_c", { title?: string; passage: string }>>;
    /** 用户教材里的生词表（可选；识别 "New words" 类区块） */
    glossary?: Array<{ word: string; phonetic?: string; pos?: string; meaning?: string }>;
  }>;
}

export function parseTextbookText(raw: string): ImportedTextbook;     // 纯函数，可测
export async function readTextbookFile(file: File): Promise<string>;  // .txt / .md / .docx（解压读 word/document.xml）/ .pdf（pdfjs-dist 提取文本）
export const textbookStore: { save(t): Promise<void>; load(): Promise<ImportedTextbook | null>; clear(): Promise<void> }; // IndexedDB
```

- 默认教材名：《大学英语读写教程 3（第四版 · 思政智慧版）》；该版每单元为 Section A、Section B 和 “Stories of China”（作为 section_c）。
- 识别规则：`Unit 1` / `Unit One` / `UNIT 1` 标题切单元；`Section A` / `Text A` / `Section B` / `Text B` / `Section C` / `Stories of China` 切课文；课文标题取 section 标记后的第一行；“New words / Words and expressions / Glossary” 后到下一个 section 标记之间为生词表（每行 `word /phonetic/ pos. 中文`，能解析多少算多少）。
- 导入后给出一个**核对页**：列出识别到的单元 / 课文标题 / 每篇的开头一句和句数，用户可以手动调整（选择某段文字属于哪个单元 / section，或直接粘贴替换）。
- 导入的内容**只存在本机 IndexedDB**：不发网络请求、不写进仓库、不进 `dist`、不进存档同步。记忆匣里能一键删除。界面上明确写：“只保存在这台设备的浏览器里，请使用你合法拥有的教材。”
- 生效方式：`buildActs(..., passageOverride)`——有导入的课文时用导入原文替换练习原文；单元词表照旧（用户生词表里的词额外作为“课本生词”加入第一人称预习）。题目 / 翻译 / 写作仍用游戏自带的（它们是原创的；与导入原文不完全对应时，理解题只在第三人称断片和第一人称预习、跟读里用导入原文，提问环节改为用导入原文自动生成的“这句话里缺了哪个词”题）。
- 手写舞台（u01a 等）在导入原文时，舞台不变，字幕和讲义换成原文。

## 6. 测试

- `buildActs`：6 个单元 × 3 篇，每篇所有句子都被分配且顺序不变；题目 / 翻译 / 写作全部分配；每幕 3–6 句。
- `parseTextbookText`：用一段**自己编写的**模拟教材文本（不要用真实教材内容）测试单元 / section / 生词表识别、英文数字单元名（Unit One）、缺 section C、乱序空行。
- 第一人称步骤状态机（纯函数 `nextLearnStep(state, event)`）：步骤顺序、未完成不能跳、选错可重试。
- 视角切换状态机：任一视角完成一幕即标记；第三人称自动进下一幕；切换不丢进度。
- translate 词块：keywords 都在词块里；正确顺序拼出 en_reference（忽略大小写和标点）。
