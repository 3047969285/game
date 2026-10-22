# 教材包接口文档（rw3-pack/1）

教材包是一份 JSON，承载版权原文，只存在于本机：
- 生成后放在 `local-textbook/pack/unitNN.json`（每单元一份）；
- 合并成 `local-textbook/textbook-pack.json`（全书一份）；
- 玩家在游戏里通过“记忆匣 → 导入教材”导入，存进 IndexedDB。

本文是数据结构、校验规则和代码接口的唯一约定。

## 1. 顶层

```ts
interface TextbookPack {
  schema: "rw3-pack/1";
  book: string;                 // "新视野大学英语（第四版）读写教程3 思政智慧版"
  units: UnitPack[];            // 合并包 1..6；单元包也用同一结构，units 只有 1 项
}
```

## 2. 单元

```ts
interface UnitPack {
  unit: number;                 // 1..6
  title: string;                // 英文单元名，如 "The digital age: Are we ready?"
  quotation?: { text: string; author: string };
  preview: string;              // Preview 段落全文
  texts: TextPack[];            // 恰好 3 篇：section_a, section_b, section_c
  newWords: NewWord[];          // Text A + Text B 的 New words（含短语）
  exercises: Exercise[];
  project?: { title: string; steps: string[] };
}

type SectionKey = "section_a" | "section_b" | "section_c";
```

## 3. 课文

```ts
interface TextPack {
  section: SectionKey;
  title: string;                // 课文标题（OCR 常把竖排标题拆成几行，需合并）
  paragraphs: string[];         // 按书中段号顺序；去掉段号、页眉页脚、行尾断词连字符
  scenes: SceneSpec[];          // 场景清单（自写描述，可进仓库）
}

interface SceneSpec {
  id: string;                   // "u01a_s1"
  paragraphs: number[];         // 1 起始，覆盖本场景的段落
  place: string;                // 中文，具体地点
  time: string;                 // 时间与光线
  people: string[];             // 人物（书中名字或身份）
  objects: string[];            // 关键物件（英文小写，优先用本单元生词能附着的物件）
  mood: string;                 // 氛围
  summary_zh: string;           // 一两句自写概述（不得照抄原文）
  pov: "him" | "me" | "paper";  // 主视角：他（2090 老人回看）、我（当年的自己）、纸（笔记本）
}
```

## 4. 生词

```ts
interface NewWord {
  word: string;                 // 原形；短语照写，如 "be absorbed in"
  section: "section_a" | "section_b";
  phonetic?: string;            // 书中音标（OCR 不准时可留空）
  pos?: string;                 // "n." "v." "a." "ad." 等，短语留空
  def_en?: string;
  def_zh: string;
  phrase: boolean;
  paragraph?: number;           // 在课文中首次出现的段号
}
```

## 5. 练习

```ts
type ExerciseKind =
  | "pre_reading" | "understanding" | "critical" | "words_in_use" | "word_building"
  | "banked_cloze" | "expressions_in_use" | "structure_writing" | "reading_skills"
  | "text_b_mcq" | "collocation" | "translation";

interface Exercise {
  id: string;                   // "u01_a_words_in_use"
  section: SectionKey;
  kind: ExerciseKind;
  instructions: string;         // 题目要求原文
  bank?: string[];              // 选词填空 / 表达填空的词库
  passage?: string;             // 带空的短文：空位写成 {{1}} {{2}} …
  items: ExerciseItem[];
  sample?: string;              // structure_writing 的范文 / 提纲；translation 的原文段落
}

interface ExerciseItem {
  n: number;                    // 题号，1 起始
  prompt: string;               // 题干；句子填空的空位写成 ____
  options?: string[];           // 选择题选项（不带 A/B/C/D 前缀）
  answer: string | number | string[] | null;
                                // 选择题：选项下标（0 起）；填空：字符串（多空用数组）；
                                // critical / pre_reading 这类开放题：null
  answer_source: "derived" | "book" | "open";
  explanation_zh?: string;      // 自写解析
}
```

## 6. 校验规则（`validatePack(pack): PackIssue[]`）

返回空数组表示通过。每条问题的结构：

```ts
interface PackIssue { path: string; level: "error" | "warn"; message: string }
```

- error：
  - `schema` 不是 `"rw3-pack/1"`；
  - `unit` 不在 1..6，或在合并包里重复；
  - `texts` 不是恰好 3 篇，或 section 重复、缺失；
  - 段落为空字符串；
  - 场景的 `paragraphs` 越界；
  - 练习 `id` 重复；
  - `items[].n` 不是从 1 连续；
  - 选择题 `answer` 越界，或缺 `options`；
  - 填空题 `answer` 为 null 但 `answer_source` 不是 `"open"`；
  - `passage` 中 `{{k}}` 的个数和 `items` 数不一致（banked_cloze）。
- warn：
  - 课文段落数 < 4；
  - 段落含明显 OCR 痕迹（连续非字母符号、`=== image`）；
  - 某段没有被任何场景覆盖；
  - `newWords` 为空；
  - `phonetic` 缺失。

## 7. 代码接口（`src/features/memory/textbook/pack.ts`）

```ts
export function parsePack(json: string): TextbookPack;          // JSON.parse + 结构检查，不合法抛 TextbookInputError
export function validatePack(pack: TextbookPack): PackIssue[];
export function mergeUnitPacks(units: UnitPack[]): TextbookPack; // 按 unit 排序，重复抛错
export function packToPassages(pack: TextbookPack): TextbookPassageInput[];
                                                                 // 转成现有段落存储结构，保证旧导入流程可用
```

存储（`store.ts`，扩展）：

```ts
savePack(pack: TextbookPack): Promise<void>;     // 整包存进 IndexedDB "rw3_pack" 仓
loadPack(): Promise<TextbookPack | null>;
clearPack(): Promise<void>;
```

### 错误情况

| 情况 | 结果 |
|------|------|
| 文件不是 JSON | 抛 `TextbookInputError("不是有效的教材包文件")` |
| `validatePack` 有 error | 拒绝导入，在界面列出前 5 条 |
| IndexedDB 不可用 | 抛 `TextbookStorageError`，游戏回到原创内容 |
