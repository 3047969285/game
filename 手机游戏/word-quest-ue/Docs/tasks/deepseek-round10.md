# DeepSeek 任务书 · 第十轮：NPC 的大脑（Claude 下发，2026-10-28）

先读 `Docs/tasks/round5-plan.md`。

**目录规则**：
- 可改：`Content/Data/npc/**`、`Docs/**`（任务书除外）、`Tools/qa/**`、`Tools/data_*.py`、`Tools/npc_*.py`。
- `Source/**` 本轮归 Codex。

**密钥规则**：
- DeepSeek 密钥只从 `~/.config/wordquest/deepseek.env` 或环境变量读取；
- 任何文件、日志、报告里都不能出现密钥；
- 测试脚本打印请求时，一律把它遮成 `***`。

## D29 人设：先做 Offline day 的四位家庭成员，再覆盖第一单元全部角色

为 `unit01.json` 里每个 `people[].role` 写 `Content/Data/npc/personas/<role>.json`，字段如下：

- 基本信息：`role`、`display_name`、`age`、`occupation`。
- 外观：`appearance`，用哪个 MetaHuman（`character` 为 me2026、lin、mei、an、rui、organizer、old2090 之一）、服装和发型要求，交给 Claude 和 Codex 用。
- `personality`：3–5 个特征词，加一段说话风格描述。
- `voice`：TTS 声音名、语速、音高。macOS 的可用声音见 `say -v '?'`。
- `scene_ids`：出现在哪些情景，以及在每个情景里在做什么（日程）。
- `backstory`：原创，不照搬课文。
- `knowledge`：知道什么、不知道什么。比如他们活在 2026 年，不知道 2090 年。
- `teaching`：
  - `target_words`：本单元生词中，这个人自然会用到的 5–10 个，取自 `text_words` 和 `words.csv`；
  - `level`：语言难度，CEFR B1–B2；
  - `correction_style`：怎样温和纠错。
- `boundaries`：不谈的话题、安全边界、不扮演现实人物。
- `fallback_lines`：断网时用的 5 句本地台词。

## D30 提示词模板

- 写 `Content/Data/npc/prompts/system_template.md`：通用规则加人设插槽加场景插槽，要求如下：
  - 永远以角色身份、用英语回答；
  - 每次 1–3 句，口语化；
  - 难度控制在 B1–B2；
  - 自然地用上 1–2 个目标词；
  - 学习者有明显错误时，在回答里顺带用正确说法复述，不说教；
  - 学习者用中文时，用简单英语回应并鼓励他说英语。
- 输出格式：先是自然对话文本，再附一行 JSON 元数据 `{"used_words": [...], "correction": "..."|null, "suggested_replies": ["...","...","..."]}`，供游戏里显示 3 个建议回复。

## D31 评测工具

- 写 `Tools/npc_eval.py`：为每个人设准备 10 段模拟玩家输入，包括正确英语、有错误的英语、中文、跑题、不当请求；调用 DeepSeek 后自动检查：
  - 是否保持角色；
  - 句数、难度（用词频表估算）；
  - 是否用到目标词；
  - 纠错是否温和；
  - JSON 元数据能否解析；
  - 有无越界内容；
  - 首字延迟和 token 用量。
- 输出 `Docs/qa/npc-eval.md`。先只跑 Offline day 的 4 个人，控制费用，整个评测的 token 用量写进报告。

## D32 交互清单和音频需求

- 列出第一单元每个情景里可交互的物件（开、拿、坐、用），写进 `Content/Data/npc/interactions_unit01.json`，供 Codex 的物理和交互系统用。
- 列出按物理材质区分的脚步声和碰撞声需求清单，交给 Codex。

## 延续

- C13：证据图改用视口截图（你已找到原因），重新出证据。
- D28：返工，按 `Docs/qa/review-d28-claude.md`。
- **视频**：你在 15:46 做的 `unit01_showcase_textbook_2k.mp4` 用了教材原文，只能内部使用。对外版本请用 `Tools/film_narration.py` 的原创旁白重新合成。

## 顺序

D29（先做四位家庭成员）→ D30 → D31（这 4 人）→ 交给 Codex 接入 → D29 补全 → D32 → 延续项。
