# 记忆剧情脚本导出（D9）

> 源：`../word-quest-game/src/features/memory/{acts.ts, autoScript.ts, scripts/*.ts}`
> 生成：`Tools/data_export_acts.py`（esbuild 打包 TS → node 执行 `resolveMemoryScript`）
> 产物：`Content/Data/memory/acts.json`（UE Level Sequence / 演出系统的数据源）
> 重新生成：`python3 Tools/data_export_acts.py`；只校验：`python3 Tools/data_export_acts.py --check`

## 1. 总量

| 项 | 数量 | 说明 |
|----|------|------|
| 单元 | 6 | unit01–06（读写3） |
| 段落脚本 | 18 | 每单元 section_a/b/c |
| 幕 | 90 | 每段 5 幕（`u01a`…`u06c`） |
| 台词/旁白行 | 98 | `narrate` / `choice` / `gap` / `touch` / `freeze`（不含幕内课文句子） |
| 开场脚本 | 1 | `prologue`（Destination: 2026，2090 公寓雨夜，5 行） |

## 2. 顶层结构

```json
{
  "meta": { "source": "...", "generatedBy": "Tools/data_export_acts.py", "units": 6 },
  "prologue": { "id": "prologue", "title": "...", "titleZh": "...", "stage": "apartment2090",
                "weather": "lightRain", "actors": [...], "lines": [...], "cameras": [...], "acts": [] },
  "units": [
    { "unitId": "unit01", "unitNumber": 1, "title": "...", "titleZh": "...",
      "sections": [
        { "section": "section_a", "scriptId": "u01a", "title": "Thursday's Silence", "titleZh": "...",
          "stage": "clubRoom", "weather": null, "look": null,
          "organizer": "organizer", "student": "me2026",
          "actors": [ { "id": "me2026", "name": "Me (2026)", "pose": "sit" } ],
          "lines": [ ... ], "cameras": [ ... ],
          "acts": [ ... ] }
      ] }
  ]
}
```

## 3. 字段说明

### 3.1 `acts[]`（幕）
| 字段 | 说明 |
|------|------|
| `index` | 幕序号（0 起） |
| `start` | 本幕第一句在整篇课文里的句子序号 |
| `sentences` | 本幕的课文句子（原文，顺序不变） |
| `wordIds` | 本幕触发的单元单词 ID（对应 `DT_Vocabulary`） |
| `questions` | 理解题：`question/options/answer/explanation` |
| `notes` | 笔记本任务：`translate`（zh/en/keywords）、`fill`（line/answers/wordIds）、`outline`（prompt/points/choices） |
| `gap` | 断片：`sentence/answerWordId/decoyWordIds` |
| `dialog` | 附身对话：`speaker/line/zh/options[]` |
| `build` | 本幕开始时显形的舞台部件名 |
| `cues` | 逐句舞台提示（中文字幕 / build / camera） |

### 3.2 `lines[]`（台词/旁白，UE 字幕与配音用）
| 字段 | 说明 |
|------|------|
| `kind` | `narrate` / `choice` / `gap` / `touch` / `freeze` |
| `pov` | 视角：`you`（第二人称）/ `watch`（第三人称）/ `me`（第一人称）/ `paper`（二维） |
| `speaker` | 说话人 actor id（`me2026` / `lin` / `mei` / `an` / `rui` / `organizer` / `old2090` 或 `system`） |
| `voice` | 音色：`system` / `young` / `old` |
| `text` / `zh` | 英文台词 / 中文字幕 |
| `options[]` | `choice` 的选项：`wordId/label/reply/correct` |
| `answerWordId` | `gap` 的答案词 |
| `camera` | 机位：`from/to/look/duration/fov/move` |

### 3.3 `cameras[]`
从 `narrate/choice/gap` 节拍与幕内 `cues` 收集的机位列表；`move` ∈ `dolly` / `orbit` / `push` / `still`。

### 3.4 `actors[]`
`id`（角色 ID）、`name`、`pose`（`sit/lap/reach/stand/...`，动画蓝图用）。

## 4. 章节列表（18 段）

| 单元 | section_a | section_b | section_c | 舞台 |
|------|-----------|-----------|-----------|------|
| unit01 数字时代 | Thursday's Silence（手写脚本 u01a） | Living in the digital world | Stories of China | clubRoom / emptyRoom |
| unit02 Life stories | Two Lives, One Lesson | Audrey Hepburn — a real angel | Stories of China | emptyRoom |
| unit03 Let's go | The Surprising Purpose of Travel | Traveling Solo: Room to Adapt | Stories of China | emptyRoom |
| unit04 When work is a pleasure | What Makes Work Meaningful? | A Craft Tradition, Practiced with Care | Stories of China | emptyRoom |
| unit05 China's space dream | No limit for China's astronauts | Chang'e-4 kicked off a new space age | Stories of China | emptyRoom |
| unit06 The economy | Surviving an economic crisis | The sharing economy turns a new page | Stories of China | emptyRoom |

## 5. UE 端用法（Level Sequence）

- 每个 `section` → 一条 Level Sequence；`acts[].sentences` 对应字幕/朗读轨道，
  `cues[].build` 驱动场景显形（对应现有 `Materializer` 的光粒洪流），`gap`/`questions`/`notes` 交给 UMG。
- `lines[]` 的字幕/配音可直接生成 Sequencer 的 Subtitle 轨道；`pov` 切换对应相机轨道（CineCamera）。
- 变换坐标来自原 Three.js 世界（单位：米、Y 轴向上），导入 UE 时需 Y-up → Z-up 转换 + 场景根节点偏移（Codex 负责）。
- 说话人 ID 已校验 ⊆ `characters.ts` 的 ID 集合（`me2026/lin/mei/an/rui/organizer/old2090` + `system`）。

## 6. 验证

`pytest Tools/qa/tests -q`（`test_export_acts.py`）：
- 单元 6 / 段落 18 / 幕 90 / 行 98（与 `acts.json` 内 `meta` 计数一致）
- 每段幕数 5 且幕内句子非空、`start` 单调递增、句子拼起来覆盖全文
- 说话人 ID 全部在允许集合内
- `acts.json` 时间戳/来源字段完整
