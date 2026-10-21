# 配音台词清单（D13）

> 源：`Content/Data/memory/acts.json`（D9）+ 课文句子（D8）
> 生成：`Tools/data_vo_manifest.py` → `Content/Data/vo/vo_manifest.csv`（附 `vo_summary.json`）
> 复现：`python3 Tools/data_vo_manifest.py`；校验：`python3 Tools/data_vo_manifest.py --check`

## 1. 总量

| 项 | 值 |
|----|----|
| 台词条数 | **441** |
| 估算总时长 | **约 46 分钟**（2765.9 s，英文 2.6 词/秒 + 标点停顿） |
| 语言 | 全部 `en`（中文字幕另存于 `acts.json` 的 `zh` 字段） |
| 课文逐句朗读 | 359 条（TTS） |
| 旁白 | 76 条（建议真人） |
| 角色台词 | 6 条（old2090 ×3、lin ×1、rui ×1、system ×1） |

## 2. 每说话人统计

| speaker | 条数 | 估算时长 | 说明 | 建议 |
|---------|------|----------|------|------|
| `tts_reader` | 359 | 2518.8 s（≈42 min） | 课文逐句朗读（6 单元 × 3 段 × 5 幕） | **TTS**（清晰、均匀；可换英音/美音） |
| `narrator` | 76 | 226.3 s（≈3.8 min） | 旁白（第三人称/第一人称过渡、定格） | **真人**（低沉、克制、留白） |
| `old2090` | 3 | 11.1 s | 2090 年老人的开场独白 | **真人**（老年男声，气息多、语速慢） |
| `lin` | 1 | 3.1 s | 女主台词 | **真人**（年轻女声，温柔偏冷） |
| `rui` | 1 | 5.0 s | 同学 Rui 台词 | **真人**（青年男声，平实） |
| `system` | 1 | 1.6 s | 系统提示（“Memory Recall”） | TTS（中性女声/男声均可） |

> 注：当前 `acts.json` 的场景骨架里 `me2026`、`mei`、`an`、`organizer` 还没有独立台词行（手写 `u01a` 之外以旁白驱动）。等 Claude/Codex 补角色对话后，重跑本脚本即可自动纳入；`speakers` 校验集合已包含全部角色 ID。

## 3. TTS 与真人录制分配

| 类别 | 建议 | 理由 |
|------|------|------|
| 课文朗读（359 条，42 min） | **TTS** | 量大、要求发音标准一致；用同一 voice + 统一语速 0.95×，按单元分目录 |
| 旁白（76 条，3.8 min） | **真人** | 承载情绪与叙事节奏；男声（与 old2090 同一演员最佳） |
| old2090（3 条） | **真人** | 开场记忆点，老年声线 TTS 不自然 |
| 主角对话（lin/rui 等） | **真人** | 角色辨识度；每角色固定一位配音 |
| 系统提示 | TTS | 短、中性、可复用 |

**录音规范（真人）**：48 kHz / 24 bit WAV，-16 LUFS 整体响度，-3 dBFS 峰值；每条前后留 150 ms 静音；文件名 = `line_id.wav`；同一角色同一麦克风/房间。
**TTS 规范**：48 kHz WAV，语速 0.95×，按 `line_id` 命名；课文朗读关闭情感夸张；数字/缩写（e.g., "Chang'e-4"）人工校对。

## 4. 字段说明（CSV）

| 列 | 说明 | 示例 |
|----|------|------|
| `line_id` | 唯一 ID（文件名用） | `vo.reading.unit03.section_a.a2.s1` |
| `speaker` | 角色 ID / `tts_reader` / `narrator` / `system` | `narrator` |
| `language` | 语言 | `en` |
| `text` | 英文台词/课文句 | `It has been sixty-four years.` |
| `context` | 上下文（单元/段落/幕/中文对照） | `prologue · narrate · pov=watch` |
| `emotion` | 情绪提示（给 TTS/演员） | `gentle, nostalgic, quiet` |
| `est_seconds` | 估算时长（秒） | `2.74` |
| `source` | 来源引用（便于回溯） | `acts.json:prologue` |

## 5. 命名约定

- 开场：`vo.prologue.l###`
- 课文逐句：`vo.reading.<unitId>.<section>.a<act>.s<sentence>`
- 剧本旁白/系统行：`vo.script.<scriptId>.l###`
- 附身对话：`vo.dialog.<scriptId>.a<act>`

## 6. 验证

`pytest Tools/qa/tests -q`（`test_vo_manifest.py`）：
- `line_id` 唯一；`speaker` 全部在角色表 + `tts_reader/narrator/system` 集合内
- `text`/`context` 非空；`est_seconds > 0`；`language == en`
- 条数与 `vo_summary.json` 一致（441）；6 个单元都有课文朗读行
