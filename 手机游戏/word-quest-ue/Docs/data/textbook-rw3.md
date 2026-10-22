# 英语教材提取（新视野读写教程 3）

> 2026-10-22 · DeepSeek Harness
> 把用户本地提供的《新视野大学英语（第四版）读写教程 3（思政智慧版）》提取进项目：
> **文章（Text A / Text B / Stories of China）、单词表、练习题/翻译/写作任务**。

## 1. 来源与方法

- **源文件**：`~/Downloads/新视野大学英语（第四版）读写教程3思政智慧版.docx`（用户本地文件；docx 内是 176 张页图，无文字层）。
- **流程**：
  1. 解压 docx → `word/media/` 176 张页图；按 `word/document.xml` 中的 drawing 顺序还原页序。
  2. macOS Vision OCR（`VNRecognizeTextRequest`，`zh-Hans` + `en-US`，accurate）逐页识别，保留每行 `y / x / text`。
  3. 双栏检测：左栏（x<0.48）读完再读右栏；单栏按 y 排序。
  4. 规则解析（`Tools/data_textbook.py`）：按 `Section A/B/C`、`Text A/B`、`New words`、练习标题切页，抽取段落/单词/题目。
- **产物**：`Content/Data/textbook/rw3/`（页文本、结构化 JSON、CSV、单元 Markdown）。

## 2. 单元与页码映射

| 单元 | 标题 | Opener | Section A | Section B | Section C | Unit project |
|------|------|--------|-----------|-----------|-----------|--------------|
| 1 | The digital age: Are we ready? | 17 | 19 | 33 | 42 | 44 |
| 2 | Life stories | 45 | 47 | 59 | 69 | 71 |
| 3 | Let's go | 73 | 75 | 87 | 96 | 98 |
| 4 | When work is a pleasure | 99 | 101 | 113 | 122 | 124 |
| 5 | China's space dream | 125 | 127 | 139 | 148 | 150 |
| 6 | The economy: power behind everyday life | 151 | 153 | 165 | 174 | 176 |

> 页码为提取顺序页号（1–176），不是教材印刷页码。

## 3. 提取结果（可复查计数）

| 项目 | 数量 |
|------|------|
| 单元 | 6 |
| Text A 段落 | 50 |
| Text B 段落 | 72 |
| 单词（Text A + Text B） | 506 |
| 题目（理解/词汇/结构/写作等） | 270 |
| Section C 翻译提示句（中文段落） | 25 行（6 个单元，每单元 4–5 行） |
| Stories of China 短文 | 6 篇（每篇约 1.8–2.2k 字符） |

## 4. 文件结构

```
Content/Data/textbook/rw3/
├─ pages/page_001.txt … page_176.txt   # OCR 页文本（阅读顺序）
├─ textbook.json                        # 结构化数据（主产物）
├─ words.csv                            # unit,section,word,phonetic,pos,meaning_cn
├─ questions.csv                        # unit,section,kind,question,options,page
└─ units/unit01.md … unit06.md         # 单单元可读版（文章/单词/练习）
```

`textbook.json` 结构：
```json
{"meta": {...}, "counts": {...},
 "units": [{"unit_id": "unit01", "title": "...", "pages": {...},
   "sections": {
     "A": {"article": {"paragraphs": [...], "raw": "..."},
           "words": [{"word","phonetic","pos","meaning_cn","definition_en",...}],
           "exercises": [{"heading","page","raw","questions":[{"question","options","answer"}]}]},
     "B": {...},
     "C": {"story": {"raw": "..."}, "exercises": [...], "translation": [...]}}}]}
```

## 5. 使用方式

- 游戏内容 / 出题：读 `textbook.json`（文章按段落、题目带 options、翻译在 `sections.C.translation`）。
- 词汇/词表：`words.csv`（UE 可走已有 `DT_Vocabulary`/DataTable 导入流程）。
- 生成导入用数据：`~/.local/share/hunyuan3d/.venv/bin/python Tools/data_textbook.py`（幂等，重写产物）。
- 单元可读版：`Content/Data/textbook/rw3/units/unit01.md`。

## 6. 已知限制（复核时优先看这些）

1. **OCR 误读**：如 `New woras`、`Reading comprenension`、`Transiation`、`apleasure`（a pleasure）等，解析器做了别名/词典纠正，但个别单词、音标、中文释义仍有错。
2. **段落号丢失**：部分页首段没有识别到编号（如 Unit 1 Text A 第 1 段开头 `na quet` → `On a quiet`），段落切分以编号/空行为主，可能合并或拆错。
3. **单词表**：词条与释义跨行/跨栏，OCR 偶尔把上一条释义并到下一条（如 `immerse/immersed`）；`meaning_cn` 已尽量只保留中文片段，`definition_en` 保留英文释义。
4. **题目**：只提取题干与选项（A–D），**教材答案/听力原文/二维码数字资源不在 docx 内**；少数填空题的编号/选项会被 OCR 打乱。
5. **Stories of China**：故事区含少量 OCR 噪声（单字符行已过滤），翻译练习已单独拆到 `translation`。
6. **无听力、视频、U 校园数字课程内容**；本提取只覆盖 docx 页图可见内容。

## 7. 版权与仓库（2026-10-22 更新）

- 源文件是用户本人提供的教材；用户是授课教师，教材原文经其授权用于本项目给学生的学习应用，**可以**提交到仓库与 dist。
- 对外公开发布/再分发时由教师确认授权范围；不得商业转售。本仓库不再把教材原文排除在 git 之外。

## 8. 复现（如需重跑 OCR）

```bash
# 1) 解压 docx 页图（word/media/），按 document.xml 顺序得到 page_order.txt
# 2) 用 macOS Vision OCR 逐页输出 y/x/text（Swift + Vision，见 §1 方法）
# 3) 导入并解析
python3 Tools/data_textbook.py --from-ocr <ocr_page_txt_dir>
# 4) 测试
~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests/test_textbook_extract.py -q
```
