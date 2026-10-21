# 读写3 学习内容数据结构（D8）

> 数据源：`../word-quest-game/public/data/content/college_english_rw3/unit01–06.json`
> 模板：`../word-quest-game/public/data/templates/college_english_rw3.json`
> 范围：**只读写3**；CET4/CET6 不接入（按 Claude 指令）。
> 转换脚本：`Tools/data_import_content.py`（可重复执行）；产物在 `Content/Data/content/` 与 UE `/Game/Data/DT_Content_*`。

## 1. 总量与单元分布

| 类别 | 条数 | 分布 |
|------|------|------|
| 单元 unit | 6 | 每单元 1 |
| 课文段落 section_a/b/c | 18 | 每单元 3 段（`title` / `type` / `passage`） |
| 阅读题 reading.questions | 23 | unit01 3 题，其余每单元 4 题 |
| 听力题 listening.questions | 24 | 每单元 4 题 |
| 微检查 micro_world_checks | 72 | 每单元 3 段 × 4 题 |
| 翻译 translation.sentences | 24 | 每单元 4 句（zh / en_reference / keywords） |
| 写作 writing | 6 | 每单元 1 个 prompt + 4 条 outline |
| 写作提纲 outline | 24 | 每单元 4 条 |

词表见 `Docs/data/rw3-vocabulary.md`（D2，130 词，30/20/20/20/20/20）。

## 2. 字段说明

### 2.1 unit（`unit*.json` 顶层）
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `unit_id` | string | 单元 ID | `unit01` |
| `unit_number` | int | 1–6 | `1` |
| `edition` | int | 教材版次 | `4` |
| `title` | string | 英文单元名 | `The digital age: Are we ready?` |
| `title_zh` | string | 中文单元名 | `数字时代：我们准备好了吗？` |
| `theme` | string | 主题标签 | `digital life, connection, technology` |
| `word_ids` | string[] | 本单元词 ID（30/20/…） | `rw3_unit01_01` |
| `micro_world_checks` | object | `section_a/b/c` → 题数组 | 见 2.2 |
| `sections` | object | 8 个键：`section_a/b/c`、`vocabulary`、`reading`、`listening`、`translation`、`writing` | 见下 |

### 2.2 题目对象（阅读题 / 听力题 / 微检查共用）
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `question` | string | ✅ | 题干（英文） |
| `options` | string[] | ✅ | 4 个选项 |
| `answer` | int | ✅ | 正确项下标 0–3 |
| `explanation` | string | ✅ | 解析（英文） |

### 2.3 reading
`title`、`passage`（正文）、`questions[]`（题目对象）。unit01 的 `reading.passage` 与 `section_a.passage` 同源。

### 2.4 listening
`title`、`script`（听力原文）、`questions[]`。

### 2.5 translation
`sentences[]`：`zh`（中文题干，含“请将下列句子译为英文：”）、`en_reference`（参考译）、`keywords[]`（本句关键词）。

### 2.6 writing
`prompt`（英文写作要求）、`outline[]`（4 条英文提纲）。

### 2.7 vocabulary
`sections.vocabulary = { level_count: 6, words_per_level: 5 }`；实际词条在 `public/data/vocabulary/college_english_rw3.json`（130 条），已由 D2 导入 `DT_Vocabulary`。

### 2.8 template（`templates/college_english_rw3.json`）
`id/name/name_en/description/version/source/exam_info/zones/rank_tiers/game_rules`：
- `zones[].levels[]`：闯关层级（`id/title/stamina_cost/word_ids/content_refs`）
- `exam_info`：满分 100 / 及格 60 / 时长 90 分钟
- `game_rules`：金币/体力/连击等规则（供 M2 UI 使用，暂未导入）

## 3. 建议的 C++ 行结构（Codex 加字段用，目前只读）

```cpp
USTRUCT(BlueprintType) struct FRw3UnitRow : public FTableRowBase
{
    GENERATED_BODY()
    UPROPERTY(EditAnywhere, BlueprintReadOnly) FString UnitId;
    UPROPERTY(EditAnywhere, BlueprintReadOnly) int32 UnitNumber = 0;
    UPROPERTY(EditAnywhere, BlueprintReadOnly) int32 Edition = 0;
    UPROPERTY(EditAnywhere, BlueprintReadOnly) FString Title;
    UPROPERTY(EditAnywhere, BlueprintReadOnly) FString TitleZh;
    UPROPERTY(EditAnywhere, BlueprintReadOnly) FString Theme;
    UPROPERTY(EditAnywhere, BlueprintReadOnly) TArray<FString> WordIds;
};

USTRUCT(BlueprintType) struct FRw3SectionRow : public FTableRowBase
{
    GENERATED_BODY()
    UPROPERTY() FString UnitId;
    UPROPERTY() FString SectionId;   // section_a/b/c
    UPROPERTY() FString Title;
    UPROPERTY() FString Type;        // reading / stories_of_china
    UPROPERTY() FString Passage;
};

USTRUCT(BlueprintType) struct FRw3QuestionRow : public FTableRowBase
{
    GENERATED_BODY()
    UPROPERTY() FString UnitId;
    UPROPERTY() FString Section;     // section_a / listening / micro_check...
    UPROPERTY() FString Question;
    UPROPERTY() TArray<FString> Options;
    UPROPERTY() int32 Answer = 0;
    UPROPERTY() FString Explanation;
};

USTRUCT(BlueprintType) struct FRw3ListeningRow : public FTableRowBase
{
    GENERATED_BODY()
    UPROPERTY() FString UnitId;
    UPROPERTY() FString Title;
    UPROPERTY() FString Script;
};

USTRUCT(BlueprintType) struct FRw3TranslationRow : public FTableRowBase
{
    GENERATED_BODY()
    UPROPERTY() FString UnitId;
    UPROPERTY() FString Zh;
    UPROPERTY() FString EnReference;
    UPROPERTY() TArray<FString> Keywords;
};

USTRUCT(BlueprintType) struct FRw3WritingRow : public FTableRowBase
{
    GENERATED_BODY()
    UPROPERTY() FString UnitId;
    UPROPERTY() FString Prompt;
    UPROPERTY() TArray<FString> Outline;
};
```

## 4. 过渡期通用导入（已可用）

Codex 的结构体就绪前，用**通用 JSON 包装行结构**导入，一类一个 DataTable：

| 资源 | 行结构 | 行数 |
|------|--------|------|
| `/Game/Data/DT_Content_Unit` | `/Script/JsonUtilities.JsonObjectWrapper`（列 `JsonString`） | 6 |
| `/Game/Data/DT_Content_Section` | 同上 | 18 |
| `/Game/Data/DT_Content_ReadingQuestion` | 同上 | 23 |
| `/Game/Data/DT_Content_ListeningQuestion` | 同上 | 24 |
| `/Game/Data/DT_Content_MicroCheck` | 同上 | 72 |
| `/Game/Data/DT_Content_Translation` | 同上 | 24 |
| `/Game/Data/DT_Content_Writing` | 同上 | 6 |
| `/Game/Data/DT_Content_OutlinePoint` | 同上 | 24 |

- 行名约定：`unit01`、`unit01:section_a`、`unit01:reading:0`、`unit01:listening:2`、`unit01:section_a:3`、`unit01:translation:1`、`unit01:writing`、`unit01:outline:2`。
- `JsonString` 列是该行的完整 JSON（便于 Codex 后续无痛切到强类型 struct）。
- 生成/导入命令：
  ```bash
  python3 Tools/data_import_content.py --data-only     # 只生成 JSON/CSV
  # 或 UE 无头导入（会校验行数）
  UnrealEditor-Cmd WordQuestUE.uproject -run=pythonscript -script=Tools/data_import_content.py -unattended -nosplash -nullrhi
  ```

## 5. 验证

`pytest Tools/qa/tests -q`（`test_content_import.py`）检查：
- 条数与源 JSON 一致（6/18/23/24/72/24/6/24）
- 必填字段非空（题干/选项/答案下标/解析、课文正文、翻译 zh+en、写作 prompt+outline）
- 单元分布（每单元 3 段、4 翻译、4 提纲…）
- 中英文配对完整（translation 每条都有 zh 与 en_reference；section 的 title/title_zh 成对）
