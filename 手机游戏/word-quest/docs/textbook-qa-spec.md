# 教材 QA 规格（给校对/补答案的 agent）

目标：把《新视野大学英语（第四版）读写教程 3（思政智慧版）》OCR 结果整理成**可直接写进游戏数据层**的干净内容。
教材原文只允许做 OCR 纠错，**不得改写、缩写、概括或增补原文**。用户是老师，本书用于给学生的学习应用。

## 输入

- 结构化教材数据：`手机游戏/word-quest/data/textbook/rw3/textbook.json`
  - `units[i].sections.A/B/C.article.paragraphs`（A/B 是 Text A/B；C 是 Stories of China，正文在 `story.raw`）
  - `units[i].sections.A/B.words`：New words（含 `word` / `pos` / `meaning_cn` / `phonetic` / `raw`）
  - `units[i].sections.*.exercises[]`：练习块（`heading` / `page` / `questions[]`）
  - `units[i].sections.C.translation`：Section C 的中文翻译练习段落
- 页图（用于核对 OCR）：`/tmp/rw3_pages/page_017.jpg … page_176.jpg`
  - 扩展名可能是 `.jpg` 或 `.png`，用 `ls` 确认
  - 每页就是教材一页，页码与本规格给的页范围一致
- 参考旧数据层格式：`手机游戏/word-quest/data/content/college_english_rw3/unit01.json`

## 输出

只写一个文件：`手机游戏/word-quest/data/textbook/rw3/qa/<unit_id>.json`（UTF-8，合法 JSON）。
不要修改其他任何文件，不要运行构建/测试。

```json
{
  "unit_id": "unit01",
  "unit_number": 1,
  "title": "The digital age: Are we ready?",
  "title_zh": "数字时代：我们准备好了吗？",
  "theme": "digital life, connection, technology",
  "texts": {
    "section_a": {"title": "Connection or Conversation?", "paragraphs": ["...", "..."]},
    "section_b": {"title": "...", "paragraphs": ["..."]},
    "section_c": {"title": "...", "paragraphs": ["..."]}
  },
  "words": [
    {"word": "scenario", "pos": "n.", "meaning_cn": "可能发生的事；可能出现的情况；（电影、戏剧等的）剧情梗概", "section": "A"}
  ],
  "questions": [
    {
      "section": "A",
      "heading": "Reading comprehension",
      "source_page": 26,
      "question": "What activities are the family not allowed to do on their \u201coffline days\u201d?",
      "options": ["Use any electronic devices", "Leave the house", "Read paper books", "Play chess together"],
      "answer": 0,
      "explanation": "原文说周末从周五晚到周日晚不用电子游戏、电脑和手机。"
    }
  ],
  "translation": [
    {"zh": "A Smartphone Is All You Need", "en_reference": "A Smartphone Is All You Need"}
  ],
  "writing": {"prompt": "...", "outline": ["...", "..."]},
  "notes": ["无法可靠修复的 OCR 片段清单"]
}
```

## 逐项要求

### 1. 课文 `texts`

- 段落按书中顺序，一段一个字符串；去掉页眉页脚、页码、行尾断词连字符（如 `conver- sation` → `conversation`）、段号。
- 只修 OCR 错字（如 `woras`→`words`、`dlgital`→`digital`、`ana`→`and`、`trom`→`from`、`Know`→`know`），保留原文用词、标点风格（英文引号/破折号可统一为 ASCII 或原样）。
- **段落数量与原文页码内容对齐**，不要合并或拆分段；有疑问时对照页图。
- CJK 字符不要出现在英文正文里（OCR 常把英文误识成汉字）。
- Text A/B 标题：用页内标题（如 `Connection or Conversation?`），别用 "Text A"。
- Section C 标题：合并竖排/断行标题（如 `A Smartphone Is All You Need`）。

### 2. 单词 `words`

- 只保留**普通词/短语**（n. / v. / adj. / adv. / prep. / phr.），去掉专有名词（人名、地名、机构名，如 `Zheng He`、`Kenya`、`Machu Picchu`）和 OCR 无法还原的碎片。
- 修复词形（`Furiousty`→`furiously`、`tabiet`→`tablet` 之类）；词形无法确定就丢弃，不要编。
- `meaning_cn`：修 OCR 错字（`习份`→`习惯`、`便浸没`→`使浸没`、`钓`→`的`），保持教材释义，不要自己改写释义。
- `pos` 用教材缩写；**不要输出音标**（音标由后续脚本统一从词典重配），也去掉 `phonetic` 字段。
- `section` 标 `"A"` 或 `"B"`。去重（同词只留一条）。

### 3. 题目 `questions`

把教材练习做成游戏可判分的**四选一**题：

- `Reading comprehension` 的简答题（Understanding the text）：保留题干（修 OCR），自己写 4 个选项，**只有 1 个符合原文**，`answer` 为正确项下标 0–3，`explanation` 用中文写依据（引用原文要点）。
- Text B 的选择题：已有 A–D 选项的，修 OCR 错字后保留原选项与正确项；答案按原文判断，`source_page` 用该题所在页。
- 填空类（Words in use / Word building / Banked cloze / Expressions in use / Collocation）：题干 = 带 `______` 的句子（按教材句子修 OCR）；正确选项 = 教材该空的答案（词库/首字母提示可推），另外 3 个干扰项从本单元单词里选；`explanation` 用中文说明搭配/词义。
- 跳过 `Critical thinking`、`Work in pairs`、纯讨论题（无法客观判分），在 `notes` 里记一行。
- `source_page` 用教材页图页码（不是印刷页码），尽量准确。
- 每题必须保证：`options` 长度 = 4、`answer` ∈ [0,3]、题干与选项通顺无 OCR 残字。

### 4. 翻译 `translation`

- 输入：`sections.C.translation`（中文段落，OCR 可能错字，先修）。
- 输出：`zh`（修好的中文原文）+ `en_reference`（**你自己写的英文参考译文**，准确、自然、教学用，不要机翻腔）。
- 每单元通常 4–5 条。

### 5. 写作 `writing`

- 从 `Structured writing` / `Structure analysis & writing` 练习块提炼：
  - `prompt`：英文写作任务（保持教材题意）
  - `outline`：3–4 条英文提纲（可以自拟，但要贴合该题）
- 如果该单元没有明确写作题，用 `Unit project` 的任务或者留 `writing: null`。

## 质量底线

- 不编造教材没有的课文内容；不确定就查看页图。
- 所有英文句子必须语法通顺、无 OCR 残字（`？` 只在真问号处，`S`/`5`、`I`/`l`、`rn`/`m` 这类混淆要修）。
- 输出前自查一遍 JSON 可解析。
