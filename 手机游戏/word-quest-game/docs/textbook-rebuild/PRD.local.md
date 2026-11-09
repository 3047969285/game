# PRD · 英语书里的世界：读写教程 3 全书重建

## 1. 要做什么

把《新视野大学英语（第四版）读写教程 3》（思政智慧版）6 个单元全部做成游戏：

- 每单元 3 篇文章：Text A、Text B、Section C *Stories of China*。
- 文章里写到的每个场景都在三维回忆舞台里重建。
- New words 和各类练习全部变成游戏里的交互。

画面风格沿用 2090 年 “MEMORY RECALL” 开场的 CG 回忆风格（见 `src/styles/cg.css`）。

## 2. 为什么

现在只有 U1 记忆点 A（《周四的沉默》，clubRoom）是手工搭的舞台。其余 17 篇都由 `autoScript` 放进空房间（emptyRoom），课文写到的地点、人物、物件都没有出现。各单元的练习只有原创的仿学题，跟书里的题对不上。

## 3. 教材原文放哪里

2026-10-22 起 Web 客户端退役，UE 是唯一客户端。

- 教材原文（OCR 文本、课文、生词、题目）放在 `word-quest-ue/Content/Data/textbook/rw3/` 和 `Content/Data/content/textbook_*`，由 UE 直接读取。
- 用户决定：原文**不加进 .gitignore**，是否提交由用户决定。
- 自写的东西（场景设计、答案解析、参考译文、游戏机制）和原文分开存放，方便以后替换原文。

## 4. 范围

### 4.1 数据（P1）

1. OCR：用 macOS Vision，按版面分栏恢复阅读顺序。
2. 把 OCR 文本整理成每单元一份教材包（schema 见 `pack-schema.md`），包括：
   - 课文按段编号；
   - New words（含音标、词性、释义、出现段落）；
   - 全部练习：Understanding the text、Critical thinking、Words in use、Word building、Banked cloze、Expressions in use、Structure analysis & writing、Reading skills、Text B 选择题、Collocation、Translation、Unit project。
3. 学生用书没有答案，答案由我们推导，标 `answer_source: "derived"`，并给出中文解析。

### 4.2 场景清单（P2）

每篇文章按段落切成场景。每个场景写清：地点、时间、人物（用书中名字或身份）、关键物件（尽量是本单元生词能附着的东西）、光线和氛围、玩家视角，以及对应段落号。场景清单进仓库：`docs/textbook-rebuild/scenes/unitNN.md`。

### 4.3 机制映射（P3）

| 练习 | 游戏里怎么玩 |
|------|-------------|
| New words | 词附着在场景物件上（已有 Materializer / 词光球）：走近 → 浮现单词、音标、释义 → 拾起进“记忆匣” |
| Understanding the text | 回忆中的“断片”：场景冻结，老年的他问一句，玩家在画面里选对应的人或物，或选文字答案 |
| Critical thinking | 2090 年的他对年轻的自己发问；开放回答写进笔记本，不判对错 |
| Words in use | 笔记本漫画格里的句子缺词，从记忆匣里拖词进去，要求词形正确 |
| Word building | “词形炉”：词根 + 词缀拼合，变形动画 |
| Banked cloze | 一段回忆文字带光洞，词库里的词悬浮在场景中，选词填入后场景补全 |
| Expressions in use | 人物对话气泡缺短语，选对后对话继续播放 |
| Structure analysis & writing | 文章结构变成可展开的“记忆骨架”；写作任务写进笔记本，给提纲和自评清单 |
| Reading skills | 带着技巧重读一段（高亮线索）；答题点亮线索 |
| Text B 选择题 | 场景冻结的多选断片 |
| Collocation | 连线：把两个物件（词）用光线连起来 |
| Translation（Section C） | 中国故事场景里，2090 年的他用中文讲，玩家把一句句翻成英文；参考译文自写 |
| Unit project | 单元结束后的“回到现在”任务卡 |

### 4.4 引擎（P4）

- 教材包导入：扩展 `features/memory/textbook`，从只存段落改为整包（课文 + 生词 + 练习）。
- 解析与校验：`validatePack()`。
- 单元数据覆盖：有包时用包里的原文和题目替换原创内容。

### 4.5 舞台（P5）

按场景清单为 18 篇文章搭回忆舞台（新增 `stages/*.ts`）和手写脚本（`scripts/uNNx.ts`）。U1A 已有，作为模板。

## 5. 验收标准

1. 6 个单元的教材包都通过 `validatePack()`。课文段数与书一致，每单元 New words 数与书一致，每单元练习题数与书一致。
2. `git ls-files` 和 `dist/` 里搜不到任何课文原句（抽 20 句检测）。
3. 18 篇文章各有场景清单，每个场景都对应到段落。
4. 每种练习都至少在一个单元里可玩通，答案判定正确。
5. 手机竖屏（375×812）下全部交互可用，无 WASD 等键盘提示。
6. 没导入教材包时，游戏行为与现在一致，不报错。

## 6. 阶段与分工

| 阶段 | 内容 | 执行 |
|------|------|------|
| P1 | 教材包整理（每单元一个子代理） | Sonnet 子代理，Opus 审 |
| P2 | 场景清单 | 和 P1 同一子代理产出初稿，Opus 定稿 |
| P3/P4 | 导入、校验、练习组件 | Opus 写接口，Sonnet/Haiku 实现并写测试 |
| P5 | 舞台与脚本 | 先做 U1 全部 3 篇作为样板，再按单元推进 |
