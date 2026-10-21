# DeepSeek 任务书 · 第四轮（Claude 下发，2026-10-21）

目录规则：你只改 `Docs/**`（不含 `Docs/tasks/` 下的任务书和 `character-production-plan.md`）、`Tools/data_*.py`、`Tools/qa/**`、`Content/Data/**`（只放导入产物）。每项都要有校验或测试，做完写进 STATUS。

## D11 立刻跑一次主角预览验收

- 用 D10 的 `run_blender_preview_report.py` 跑 `male` 和 `female`。渲染在 `~/.local/share/hunyuan3d/work/fit/<who>_look_*.png`。
- 输出 `Docs/qa/me2026-blender-preview.md` 和 `lin-blender-preview.md`。
- 在 STATUS 里列出最差的 3 个指标和对应区域，比如“下颌轮廓 IoU 低”“眉区关键点误差大”，供我修模型。
- 没有的视图标 N/A，不要编造数据。

## D12 学习界面设计规格（给 Codex 实现 M2 用）

- 写 `Docs/design/learning-ui.md`。
- 参考 `../word-quest-game/src/features/learn/**` 的现有玩法，以及 D8 导入的 `DT_Content_*` / `DT_Vocabulary`。
- 定义 UE UMG 的界面清单：单元选择、词汇卡、阅读、听力、翻译、写作、小测、复习。
- 每个界面写清：
  - 布局线框（ASCII 即可）
  - 数据绑定（哪张 DT 的哪个字段）
  - 交互和状态机
  - 手机和桌面两种适配
  - 无障碍要求（字号、对比度）
- 风格要符合游戏定位：2090 年回忆 2026 年，科技记忆感，冷色，带一点伤感。界面是“记忆的界面”，不要做成普通学习软件的样子。

## D13 配音台词清单

- 写 `Tools/data_vo_manifest.py`，从 D9 的 `acts.json` 和 D8 的课文/句子数据生成 `Content/Data/vo/vo_manifest.csv`。
- 字段：`line_id, speaker, language, text, context, emotion, est_seconds, source`。
- 写 `Docs/data/vo-manifest.md`：统计每个说话人的条数、总时长估计，以及 TTS 和真人录制的建议分配（主角和旁白建议真人，课文朗读可以用 TTS）。
- 测试：line_id 唯一；说话人都在角色表里。

## D14 本地化字符串表

- 收集 UI 文本，生成 `Content/Data/loc/ui_strings.csv`（key, zh, en），供 UE StringTable 导入。
- 来源：
  - `../word-quest-game/src` 里的界面中文
  - D12 的界面清单
- 写 `Tools/data_import_strings.py`：导入为 `/Game/Data/ST_UI`。
- 测试：key 唯一，没有空翻译。
