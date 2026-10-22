# 教材内容接入与“按教材改造”约定

> 2026-10-22 · DeepSeek
> 约定：**以《新视野大学英语（第四版）读写教程 3》提取内容为项目后续学习内容的基准**；
> 现有游戏内容（D8 版 `rw3_units.json`）保留，迁移动作为渐进替换（见 §4）。

## 1. 项目里已就位的教材数据

| 文件 | 用途 |
|------|------|
| `word-quest/data/textbook/rw3/qa/unit01–06.json` | **校对后的干净内容**（数据层唯一输入） |
| `word-quest/data/textbook/rw3/textbook.json` | **教材基准数据**：6 单元、Text A/B 文章、New words、练习题、Stories of China、翻译 |
| `word-quest/data/content/college_english_rw3/` | 游戏实际内容：6 单元课文/词表/题目/翻译/写作（由 QA 生成） |
| `word-quest/data/vocabulary/college_english_rw3.json` | 教材词表（音标取自教材页图转写，缺则留空） |
| `Content/Data/vocabulary/college_english_rw3.json` / `.csv` | UE 词表（536 词，由 `Tools/data_vocabulary_csv.py` 生成） |
| `Content/Data/content/rw3_units.json` + `Content/Data/content/dt_*.csv` | UE 内容数据（由 `Tools/data_import_content.py --data-only` 从 `public/data` 重新生成） |
| `DT_Vocabulary` / `DT_Content_*` | UE DataTable（无头 `UnrealEditor-Cmd -run=pythonscript` 重新导入） |
| `Content/Data/textbook/rw3/pages/page_*.txt` | OCR 原始页文本（复核用） |
| `Content/Data/textbook/rw3/units/unit0*.md` | 单元可读版（校对用） |
| `Content/Data/textbook/rw3/words.csv` / `questions.csv` | 词表 / 题库（分析用） |
| `Content/Data/content/textbook_units.json` | **游戏内容格式**：文章段落、单词、题目、翻译提示（答案留空） |
| `Content/Data/content/textbook_vocabulary.csv` | 可导入 `DT_Vocabulary` 的词表（506 词，字段同 D2） |
| `Tools/data_textbook.py` | 教材解析/纠错/导出（幂等） |
| `Tools/data_textbook_bridge.py` | 教材 → 游戏内容格式 |
| `Docs/qa/textbook-extract-audit.md` | 审查结论与已知问题 |

## 2. 数据契约（哪些以后必须按教材来）

1. **单元**：6 个单元，`unit_id` / 标题 / 主题 / 顺序与教材一致（`textbook_units.json`）。
2. **文章**：`section_a` = Text A、`section_b` = Text B、`section_c` = Stories of China；
   以后游戏里“读文章”一律用这三篇（替换现在的原创改写稿）。
3. **单词**：以教材 New words 词表（506 条）为词库来源；游戏关卡词从其中选。
4. **理解题**：优先使用教材 Reading comprehension 题干（`textbook_units.json → questions`）。
5. **翻译**：使用教材 Section C 的中文段落（`translation_prompts`），参考译需另配。
6. **写作**：使用教材 Structured writing 的题型/主题，提纲可沿用现有原创提纲。

## 3. 必须另编/补齐的内容（教材 docx 里没有）

| 内容 | 现状 | 计划 |
|------|------|------|
| 选择题答案 / 解析 | 教材无答案页 | 人工补 `answer`（0–3）与 explanation；或只做练习模式不计分 |
| 听力题 + 原文 | 教材无音频文本 | 按单元主题新写（现有 D8 听力可先保留） |
| 微检查（micro checks） | 现有 72 条原创 | 按新文章重写，或保留作为语言点练习 |
| 翻译参考译 | 只有中文题干 | 人工/AI 初稿 + 人工审校 |
| 写作提纲 | 教材有题型 | 可沿用现有提纲，按新文章调整 |
| 音标 | OCR 结果不可靠 | 后续从词典重配音标 |

## 4. 迁移步骤（给 Codex / Claude）

1. **校对**：对照 `units/unit0*.md` 做一轮人工通读；错误改在 `Tools/data_textbook.py` 的纠错表或页文本中，重跑生成。
2. **游戏源数据**：更新 `word-quest-game/public/data/content/college_english_rw3/unit01–06.json`：
   - `sections.section_a/b/c.passage` ← `textbook_units.json` 对应段落（保留段落换行）；
   - `title/title_zh/theme` 保持现有（已与教材一致）；
   - 词表：从 506 词中每单元选 **30 个核心词**（建议 Text A 生词优先），生成稳定 `rw3_unitXX_NN` ID；完整 506 词作为“词库/生词本”另存；
   - `reading.questions`：换教材题干 + 补答案；`listening/micro/writing/translation` 按 §3 处理。
3. **模板**：`templates/college_english_rw3.json` 的 `zones[].levels[].word_ids` 如词 ID 变化需同步；尽量保持 ID 数量/映射稳定，降低前端改动。
4. **UE 导入**：`Tools/data_import_content.py`（DT_Content_*）+ `Tools/data_import_vocabulary.py`（DT_Vocabulary）重导；
   词表可直接用 `Content/Data/content/textbook_vocabulary.csv`（字段与 D2 一致）。
5. **验收**：单元数 6、每单元 3 篇阅读、词数/题数对齐，`needsProofreading` 置 false 前必须完成人工校对。

## 5. 边界（2026-10-22 更新）

- 教材原文经**教师授权**用于本项目教学应用，可进数据层、仓库与 dist；对外再分发需教师确认授权范围，不得商业转售。
- 数据层 `word-quest/data/content/college_english_rw3/` 与 `word-quest/data/vocabulary/college_english_rw3.json` 已由教材内容生成，是游戏实际内容源；
  `textbook_units.json` 保留为 UE 导入用的中间格式，不再与旧 D8 原创数据并存。

> **2026-10-22 完成**：数据层已按本约定替换——`word-quest/data/content/college_english_rw3/unit01–06.json` 与 `vocabulary/college_english_rw3.json` 已由教材 QA 结果生成（536 词、72 道微检查、模板 v2.0.0 / 127 关），游戏 `public/data` 已重新打包。音标按教材 New words 页图转写，页图未印音标的短语留空。

> **2026-10-22 DataTable 刷新**：`Content/Data/**` 源数据（536 词、18 篇课文、60 阅读题、59 听力题、72 微检查、19 翻译、6 写作）已由教材版重新生成；但 `DT_*` 是二进制 uasset，且仓库不含 `Binaries/`，无头 `UnrealEditor-Cmd` 无法加载 C++ 模块。刷新方法：在本机 UE 5.8 打开工程（首次会编译，或先跑 `Engine/Build/BatchFiles/Mac/Build.sh WordQuestUEEditor Mac Development`），然后执行
> `-ExecutePythonScript="Tools/data_import_content.py"` 与 `-ExecutePythonScript="Tools/data_import_vocabulary.py"`（或在编辑器 Output Log 里 `py Tools/data_import_content.py`、`py Tools/data_import_vocabulary.py`）。
