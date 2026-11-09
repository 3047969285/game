# 第四轮任务重新分配（Codex 额度用完，2026-10-23）

## Codex 交付时的状态（Claude 核查）

| 项 | 代码 | 在 UE 里验证 | 说明 |
|----|------|--------------|------|
| P0 截图链路修复 | 已写：`check_textbook_scene.py`、`textbook_capture_quality.py`、`diagnose_textbook_capture.py`，C++ `WordQuestRenderDiagnostics` | 未跑 | 截图仍是 10-22 的旧图，28/33 张全黑 |
| C11 第 2–6 单元 | 搭建器有所修改（`build_textbook_scene.py`、`textbook_scene_contract.py`、`textbook_reference_audit.py`） | 未跑 | 15 张关卡还没生成 |
| C12 布景细节 | 已写：`textbook_environment.py`、`repair_polyhaven_materials.py`，设计见 `Docs/round4-set-dressing.md` | 未跑 | 贴花、杂物、窗光、记忆玻璃材质 |
| C13 沉浸式界面 | 已写：C++ `WordQuestMemoryFragment`、`WordQuestMemoryDirector`、`WordQuestExerciseWidget`，设计见 `Docs/round4-immersive-interface.md` | 未跑 PIE | 字幕、练习断片进入世界，注视、长按、转场 |
| C14 人物入场 | 已写：`textbook_character_staging.py`、C++ `WordQuestCharacterStagingLibrary`，纯 Python 测试 9 项通过 | 未跑 | MHC 静态快照、`needs_rig` 标记 |
| 编译 | 有 3 处编译错误 | — | **Claude 已修复，编译通过**（2026-10-23） |

## 新分工

**Claude**：世界的画面和人物，因为这部分要靠眼睛评审。

1. P0：跑 Codex 写好的截图修复，重出 33 张 4K 截图，验收平均亮度在 40–170 之间。
2. C12：跑布景细节（贴花、杂物、光束），逐张评审画面。
3. C11：建出第 2–6 单元。
4. C14：人物入场。
5. 精品物件：phone 已入 UE，tablet、monitor 进行中，后续按 STATUS 列的清单继续。

**DeepSeek**：交互、运行时和内容。你之前做过 HUD 和 PIE，熟悉这部分。

1. **C13 沉浸式界面验证与收尾（新增，排在 D23 之后、D24 之前）**：
   - 从本条起，`Source/` 的 C13 相关文件交给你：`WordQuestMemoryDirector`、`WordQuestMemoryFragment`、`WordQuestExerciseWidget`、`WordQuestHUD`。
   - 先读 `Docs/round4-immersive-interface.md` 和 `Docs/engine-textbook-round4.md`。
   - 用 `Tools/test_textbook_pie.py` 跑第 1 单元 Text A 的完整垂直切片，要覆盖：
     - 字幕在空间中生成和消散；
     - 单词注视 0.6 秒后浮现，长按“记住”；
     - 12 种练习的断片表现，以及冻结与恢复；
     - 答错时的失真反馈；
     - 转场和跳过；
     - 横屏、竖屏。
   - 证据放 `Saved/` 和 `Docs/qa/immersive/`。屏幕空间 UI 计数必须为 0，记忆完整度环除外。
   - 修 bug 走锁编译，以日志里的 `Result: Succeeded` 为准。
2. 原有的 D23（内容覆盖）、D24（答案）、D25（配音）、D26（场景质检）继续。

UE 只有一把锁：两边的编辑器任务都要排队，不要并发；编译也要走锁。

## 需要用户处理

- Fab 网页的 Cloudflare 人机验证（33 个 Fab kit 等这一步）。
- 在 UE 里登录 Epic，用于 MetaHuman auto-rig，人物骨骼和动画要用。
