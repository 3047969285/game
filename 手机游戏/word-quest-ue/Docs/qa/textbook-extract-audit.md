# 教材提取审查报告（新视野读写教程 3）

> 2026-10-22 · DeepSeek · 审查对象：`Content/Data/textbook/rw3/`（OCR 页文本 + textbook.json + CSV）
> 结论：**结构完整、可作项目内容基准；正文仍有 OCR 级别错字，已修 55 处高置信错误，剩余需人工校对。**

## 1. 结构检查（通过）

| 检查项 | 结果 |
|---|---|
| 页数 / 页序 | 176 页，与 docx `document.xml` 顺序一致；OCR 空页仅为封面/扉页/单元扉页（14 页） |
| 单元 | 6 个，页码区间：19–44 / 47–71 / 75–98 / 101–124 / 127–150 / 153–176 |
| Section / Text 检测 | A/B/C、Text A/B、Unit project 全部命中；C 首单元以 `Stories of China` 开头的问题已修复 |
| Text A/B 文章 | 12 篇全部有正文；Text A 50 段（约 660–940 词/篇）、Text B 71 段（约 890–1030 词/篇） |
| 文章页覆盖率 | 与页文本逐行比对：Text A **98.4–100%**；Text B **90–100%**（低值页是 Reading skills 说明页，已从正文裁剪） |
| New words | 506 条；词条含音标 506/506、中文释义 505/506；同词重复 0 |
| 练习题 | 270 项（理解/词汇/构词/搭配/结构/写作），其中 44 项带 A–D 选项 |
| Section C 翻译 | 25 行中文 → 合并为 6 个段落式翻译任务，全部为中文 |
| Stories of China | 6 篇（约 1.8–2.2k 字符/篇） |
| 单元标题 | 6 个，已与 Map of the book / 单元扉页核对 |

## 2. 审查中发现并已修复的问题

| # | 问题 | 修复 |
|---|------|------|
| 1 | 第 1 单元 Section C 以 `Stories of China` 开头，未匹配 `Section C` | 检测规则增加 `Stories of China` |
| 2 | Text B 正文起点误把 Reading skills 说明页算入（U2/U5/U6 等） | 以页面中 `Text B` 标题行为正文起点，裁剪其前内容 |
| 3 | 页眉/页脚/词数行混入正文（如 `New Horzon colege...`、`（897 woras）`） | 增加页眉/词数过滤 |
| 4 | 选择题选项只取到第一行，后续行丢失 | 选项续行合并（≤110 字符） |
| 5 | OCR 标题拼写不一：`New woras`、`Reading comprenension`、`Transiation` 等 | 标题别名归一 |
| 6 | 单词词首粘 `A/▲` 标记（`Adense`、`A convention`） | 词典校验式剥离（不误伤 American 等） |
| 7 | 同标题跨页重复（Structure analysis 等） | 相邻同名块合并 |
| 8 | 故事与翻译练习同页 | 以 `Translation/Transiation` 行为界拆分 |
| 9 | OCR 高频错字（正文/题目） | 人工核对后修正 **55 处**（如 `woras→words`、`worla→world`、`Cisnye-4→Chang'e-4`、`allowea→allowed`、`execulises→executives`） |
| 10 | 中文提示词 OCR 错字（`钓→的`、`随看→随着`、`深人→深入`、`一合→一台`） | 中文纠错表修正 |

## 3. 仍需人工处理（未伪造、未强行修正）

1. **正文残余 OCR 错字**：修正表只覆盖高置信项；仍有类似 `occasiomaly`（已修）、`Cperaleyend`（仪式名）、`Ane JOy ora...`（小节标题）等错读，以及 `execulises` 之外的单词级误读。建议对 `unit*.md` 做一轮人工通读。
2. **音标不可直接用于教学**：如 `scenario /so nariau/`、`convention /kon'venjan/` 为 OCR 结果；单词本身与中文释义可用，音标建议后续从词典重配。
3. **单词表混入专有名词**：`Santa Maria`、`Audrey Hepburn`、`Machu Picchu` 等是教材词表原文，非错误；如需纯普通词词库需过滤。
4. **1 条缺中文释义**：`unit04/B/void`（OCR 未识别到中文行，保留英文释义）。
5. **教材无答案页**：270 题均无 answer/explanation；自动评分前需人工补答案。
6. **听力/微检查/写作提纲/Word 表练习答案**不在 docx 页图内（或为空白表格），未虚构；需另编。
7. **旁注/表格/二维码内容**：OCR 只取正文文本，表格类（如 Banked cloze 词库）可能不完整。

## 4. 判定

- **结构、单元映射、文章/单词/题目/翻译的完整性：通过**。
- **文本正确性：结构性正确，但仍有 OCR 错字**；已写入 `needsProofreading: true`，游戏内直接使用前建议人工校对。
- 作为“后续项目按此教材修改”的内容基准可用；需与教材答案/听力材料配合时再补。

## 5. 复现审查

```bash
python3 Tools/data_textbook.py          # 重新解析
python3 - <<'PY'                        # 结构/词/题统计
import json; d=json.load(open('Content/Data/textbook/rw3/textbook.json')); print(d['counts'])
PY
~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests/test_textbook_extract.py -q
```
