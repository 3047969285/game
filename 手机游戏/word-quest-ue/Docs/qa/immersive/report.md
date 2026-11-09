# C13 沉浸式界面验证报告（Unit 1 Text A）

> 2026-10-23 · DeepSeek · 运行方式：`Tools/run_ue_serial.sh`（UE_LOCK_WHO=deepseek）+ `Tools/test_textbook_c13.py`
> 结果：**WQ_C13_PIE_PASS** · run_id `1792727197852099000` · 帧数 2305 · 关卡 `L_U01_A`（WQ_TEXTBOOK_ENGINE_QA=1）

## 1. 覆盖矩阵

| 项 | 证据 | 结论 |
|----|------|------|
| 字幕在空间中生成 | `c13-subtitle-spawn.png`；playback state `world_fragments≥1`、`world_space_fragments==world_fragments`、`sentence_fragments≥1` | PASS |
| 字幕消散 / 转场 | `c13-transition-scan.png`、`c13-transition-after-skip.png`；`transition=1` → skip → `transition=0` | PASS（`transition-skip-requested skipped=True`） |
| 单词注视 0.6s 浮现 | `c13-word-gaze.png`；`word_fragment=1`；句子 fragment 带 `highlight_words≥1` | PASS（见 §3 说明：无头 PIE 用 QA 注入注视目标，0.6s/浮现逻辑走真实运行时） |
| 长按记住 | `c13-word-remembered.png`；`remembered=1`；写入 `Saved/Player/Notebook.qa.json` | PASS |
| 12 种练习断片 | `pre_reading/understanding/critical/words_in_use/word_building/banked_cloze/expressions_in_use/structure_writing/reading_skills/text_b_mcq/collocation/translation.png` | PASS（12/12） |
| 冻结与恢复 | 每个 probe `paused=1`；`c13-resume.png` 后 `paused=0` | PASS |
| 答错失真 | 每个 probe 的 playback state `distortion>0`（12/12） | PASS |
| 横屏 / 竖屏 | `text_b_mcq`/`banked_cloze`/`collocation` 各 `-portrait.png` 450×900、`-landscape.png` 1280×720（脚本校验尺寸） | PASS |
| 屏幕空间 UI | 每次断言 `screen_ui=0`；`progress_ring=1`（完整度环由后端 widget 绘制） | PASS |
| 证据完整性 | `results.json` 24 条 capture + 12 kinds；全部文件 >1 KB | PASS |

## 2. 本轮修的问题（C13 Source 归 DeepSeek 后）

1. **开场相机错位**：level 里的 shot 相机在 (0,-2781,-215)（离场景 2.7 km），视线全打在 `HDRI_BACKGROUND` 上。改为按场景 JSON `shots[0]` 生成相机并把 pawn 移到该位置（`WordQuestMemoryDirector::EnterScene`）。
2. **世界碎片锚点错位**：fragment 原先用 pawn 实时视角算锚点，首帧相机未稳定导致漂移；改为记录场景 shot 的 eye/view 作为锚点。
3. **text_words 运行时接入**：`MemoryDirector` 读场景 `text_words`，按当前段落/句子算出标亮词形；`MemoryFragment` 逐词排版句子，命中的 `form` 用冷光色高亮；句内注视 0.6 秒后弹出音标+释义；长按记住并写入 `Notebook.json`（QA 环境写 `Notebook.qa.json`）。
4. **状态可观测**：`GetImmersiveState` 暴露 `world_fragments/world_space_fragments/sentence_fragments/choice_fragments/question_fragments/screen_ui/progress_ring/gaze/gaze_clock/hold_clock/remembered/distortion/highlight_forms/highlight_words/highlighted_fragments/fading_fragments`。

## 3. 说明与限制

- **注视注入**：无头 `-RenderOffscreen` PIE 中，PlayerCameraManager 的 view target 切换/控制旋转不可靠（实测视线一直停在 shot 相机方向），所以 `Tools/test_textbook_c13.py` 用 `ProbeGazeSentenceFragment()`（WQ_TEXTBOOK_ENGINE_QA 语义）注入“已注视的句子 fragment + 首个未记住的标亮词”，之后的 0.6 秒计时、`ShowWord` 浮现、长按 Remember、Notebook 写入全部走真实运行时逻辑，没有绕过。
- **屏幕空间 UI 定义**：`screen_ui` 由 `CountVisibleScreenWidgets()` 实测（遍历 viewport 的 UUserWidget，排除隐藏的后端控制器 widget）；后端 widget 只画完整度环，且 `NativePaint` 无其它文字/面板；HUD 在回忆关卡使用原生 `AHUD`（不是带字幕的 AWordQuestHUD）。
- 12 种练习的断片表现均已截图；答错失真在 `RunExerciseProbe` 内部先提交一次错误答案再正确提交，状态里可读到 `distortion>0`。

## 4. 复现

```bash
UE="/Applications/../UnrealEditor"   # /Users/Shared/Epic Games/UE_5.8/Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor
WQ_TEXTBOOK_ENGINE_QA=1 UE_LOCK_WHO=deepseek Tools/run_ue_serial.sh "$UE" "$PWD/WordQuestUE.uproject" \
  -ExecutePythonScript="$PWD/Tools/test_textbook_c13.py" -RenderOffscreen -culture=en -language=en \
  -unattended -nosplash -nosound -NoEpicPortal -stdout -FullStdOutLogOutput
# 期望日志：WQ_C13_PIE_PASS run_id=...
```

证据目录：`Docs/qa/immersive/`（25 个文件，含 results.json）。
