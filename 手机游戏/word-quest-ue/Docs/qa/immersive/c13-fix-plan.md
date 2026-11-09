# C13 证据返修方案（Claude 退回 2026-10-23）

## 1. 根因（已定位，按影响排序）

1. **相机单位错了 100 倍**：场景 JSON `shots[].pos/look` 是**米**，`EnterScene` 直接当厘米用 → 相机在 z≈2 cm（地板/几何体内），所以旧证据大面积全黑。4K 场景 checker 的 `saved_camera` 是厘米（如 `(0,-550,170)`），可作为对照。
   - 修复：`Pos/Look` 乘 100，并按该关卡内 set 间隔加 `SceneIndex*6000 cm`；FOV 同步到 `PlayerCameraManager`。
2. **世界截图 alpha=0**：`SCS_FinalColorLDR` 的 RT 读回 alpha 为 0，保存的 PNG 透明 → 看图软件显示白/空。已把 `Pixels[i].A=255`。
3. **SceneCapture2D 拍不到世界内 Widget**：字幕/词卡/玻璃是 `UWidgetComponent`（Slate），SceneCapture2D 只渲染场景 mesh，所以即使相机修好也看不到字幕与词卡。
   - 修复：改用**视口截图**（玩家视角，含世界 Widget）；新增 `UWordQuestMemoryDirector::CaptureScreenEvidenceIn()`（`FScreenshotRequest::RequestScreenshot(..., bShowUI=true)`）。
4. **转场期间全黑**：转场 3 秒内截世界图会拍到黑/白闪。测试改为检测到 `transition=1` 先 `SetGamePaused(true)` 冻结，截一张静态转场帧，再解冻并 `SkipTransition()`。

## 2. 代码改动（本轮已写，待恢复后编译）

- `WordQuestMemoryDirector::EnterScene`：shot 单位 ×100 + set 偏移；FOV 对齐。
- `WordQuestRenderDiagnostics`：读回像素强制 A=255。
- `WordQuestMemoryDirector`：新增 `CaptureScreenEvidenceIn(Folder,Name)`。
- `Tools/test_textbook_c13.py`：
  - 证据全部改视口截图；
  - 字幕前后图：`c13-subtitle-spawn` vs `c13-subtitle-next`（各换一句）；
  - 单词前后图：`c13-word-before`（暂停世界，无词卡）vs `c13-word-gaze`（注入注视后 0.6 s → 词卡）；
  - 转场：冻结后截 `c13-transition-scan`，skip 后截 `c13-transition-after-skip`；
  - 结束前调用 `Tools/qa/c13_evidence_gate.py`，只有门禁 PASS 才打印 `WQ_C13_PIE_PASS`。
- `Tools/qa/c13_evidence_gate.py`：所有 `Docs/qa/immersive/*.png` 平均亮度 25–200；两对前后图差异面积 >0.5%；输出 `gate.json`。

## 3. 恢复后的验证顺序

1. 编译（`run_ue_serial.sh` + `Result: Succeeded`）。
2. 跑 PIE，先看 `gate.json` 与首张 `c13-subtitle-spawn.png`：应能看到真实客厅 + 漂浮句子的可读英文。
3. 若字幕仍不出现：用 `ProjectWorldLocationToScreen` 记录句子 fragment 投影坐标与相机位姿，确认 fragment 在视锥内且未被柱子/家具遮挡；必要时把锚点从 JSON eye 改为 `PlayerCameraManager` 实时位置并前移。
4. 逐张人工检查：字幕可读、词卡音标+释义可见、练习断片有玻璃质感、转场帧有画面。
5. 全部通过后写验收说明，通知 Claude 评审。

## 4. 未做

- 未编译、未跑 PIE（按 Claude 协调暂停 UE）。
- 横竖屏证据：恢复后先用 `FScreenshotRequest` 原生分辨率，再对 450×900 / 1280×720 做 `r.SetRes` 截图；门禁已按像素亮度覆盖。
