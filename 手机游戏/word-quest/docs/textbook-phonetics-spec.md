# 教材音标转写规格（给音标 agent）

目标：从教材 New words 页图里，为数据层词表逐词转写**准确的 IPA 音标**。OCR 出来的音标不可用（如 `/so nariau/`），必须看页图人工转写。

## 输入

- 页图：`/tmp/rw3_pages/page_017.jpg … page_176.jpg`（扩展名可能是 `.jpg` 或 `.png`，先 `ls`）
- 词表：`手机游戏/word-quest/data/vocabulary/college_english_rw3.json`，按 `unit_id` 过滤出你的单元；只处理 `word` 字段。
- New words 位置：单元 Page range 内，标题为 `New words` / `Words and expressions` 的页；分 Section A 和 Section B 两段词表。用 `read_image` 看这些页。

## 输出

只写一个文件：`手机游戏/word-quest/data/textbook/rw3/qa/phonetics/unitNN.json`

```json
{
  "groan": "/ɡrəʊn/",
  "terminal": "/ˈtɜːmɪnl/"
}
```

- 键：词表里的单词原样（小写；短语保留空格）。
- 值：带 `/ /` 的 IPA；保留重音 `ˈ`、次重音 `ˌ`、长音 `ː`。
- 词表里每个词都要有；页图上找不到的词就**不要写**（宁缺勿错），在返回摘要里列出缺失清单。

## 转写规则

- 只按书上的音标转写，不要用别的词典替换；书上印刷不清时参考上下文，仍不确定就跳过。
- 统一易混字符：`ɪ ʊ ə ɜ ɔ ɑ æ ʌ ŋ ʃ ʒ θ ð tʃ dʒ`、重音 `ˈ ˌ`、长音 `ː`；不要把 `ə` 写成 `a`，不要把 `ː` 漏掉。
- 美式/英式混排照书；同一词表内保持一致。
- 不增删词条，不改词表内容。

## 返回

一段摘要：输出路径、写入词条数、缺失词数量与前 10 个缺失词。不要改其他文件。
