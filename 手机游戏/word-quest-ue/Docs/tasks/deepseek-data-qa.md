# DeepSeek Harness 任务书：设定集、数据、验收工具

> 下发人：Claude · 2026-10-21 · 总方案：[../character-production-plan.md](../character-production-plan.md)
> 工程：`/Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue`
> 你只改：`Docs/characters/**`、`Docs/qa/**`、`Tools/data_*.py`、`Tools/qa/**`、`Content/Data/**`（仅导入产物）。
> **不要改** `Source/`、`Config/`、`Content/Characters|Maps|Blueprints/`（Claude 和 Codex 负责）。

每项都要按三件套交付：需求说明 + 接口说明 + 测试（Python 用 pytest，放在 `Tools/qa/tests/` 或 `Tools/tests/`）。完成后在 `Docs/tasks/STATUS.md` 的 **DeepSeek** 一节追加记录。

## D1 配角设定集（最先做，Claude 等着用）

为 `old2090`、`mei`、`an`、`rui`、`organizer`（陈老师）各写一份 `Docs/characters/<id>.md`。

现有设定见 `../word-quest-game/src/features/memory/characters.ts`，故事背景见 `../word-quest-game/docs/gdd-memory-game.md`。每份包含：

- **一句话人物**：在 2026 年大学英语课堂里的身份和性格。不要写成学习软件里的角色，要像电影里的人物。
- **外貌规格**，能直接拿来在 MetaHuman 里建脸：
  - 脸型：长 / 宽、下颌、颧骨、额头
  - 五官：眼型、双眼皮、鼻梁、鼻翼、唇厚、嘴宽
  - 肤色（Fitzpatrick 分型 + 冷暖）、痣和雀斑的位置
  - 身高、体型
  - 和其他同学的**辨识度差异**：轮廓剪影一眼能分开
- **发型规格**：长度（cm）、分缝、刘海、发量、卷度、颜色（sRGB 值）
- **服装规格**：每件的材质、版型、颜色值、磨损程度；年代感是 2026 年中国大学生
- **表情和姿态习惯**：给动画用
- `old2090` 必须和 `me2026` 是**同一个人老了 64 岁**：骨相保持一致，写清楚衰老变化（皮肤、脂肪、发际线、白发、老年斑、驼背程度）。

## D2 词汇 DataTable 导入

- `Content/Data/vocabulary/college_english_rw3.json` → UE DataTable。
- 写 `Tools/data_import_vocabulary.py`（UE Python，`unreal` 模块）：生成行结构 CSV，再导入为 `/Game/Data/DT_Vocabulary`。
- 结构和 `Source/WordQuestUE/WordQuestData.h` 里已有的字段对齐。只读这个文件，不要改；需要改字段时写进 STATUS 请 Codex 改。
- 测试：行数和 JSON 一致、字段不为空。

## D3 验收对比工具（`Tools/qa/`）

Python 3.11，可以用 `~/.local/share/hunyuan3d/.venv`（已经装了 mediapipe 0.10.21、numpy、PIL、scipy）。

1. `compare_landmarks.py <ref.png> <render.png>`：MediaPipe 468 点，先做相似变换对齐（缩放 + 平移），输出平均和最大像素误差，以及按区域（眼、眉、鼻、嘴、脸廓）分开的误差，并画出叠加图。
2. `compare_silhouette.py <ref.png> <render.png> --region face|hair`：前景分割（白底），算 IoU 并画出差异热图。头发区域用暗色、低饱和度的规则；男女发色不同，要能配置。
3. `report.py <id>`：读 `Saved/Compare/<id>/` 下的 5 张渲染（Codex 输出）和参考图（男主 `~/Downloads/lian1,2,3,7.png` + `male_sheet.png`；女主 `lian5,6,8,7.png` + `female_sheet.png`），对照 `character-production-plan.md` 第 4 节的阈值，输出 `Docs/qa/<id>-report.md`，内容包括 PASS/FAIL 表和并排图。
4. 测试：用合成的图片验证 IoU、误差计算正确。

## D4 QA 清单

`Docs/qa/character-checklist.md`：每个角色交付前的检查项。

- 穿模
- 发丝穿透
- 眼睛高光
- 牙齿
- 表情极值
- 布料自交
- LOD 切换
- 性能
- 和参考图并排

## 注意

- 不要下载或使用受版权保护的教材原文，也不要用未授权的人物素材。
- 不处理任何账号或凭据。
- 遇到需要 Claude 决定的事，写在 STATUS 里，不要改别人的文件。
