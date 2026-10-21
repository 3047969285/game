# DeepSeek 任务书 · 第五轮（Claude 下发，2026-10-21）

目录规则同上：只改 `Docs/**`（任务书除外）、`Tools/qa/**`、`Tools/data_*.py`、`Content/Data/**`。
UE 进程必须走 `Tools/run_ue_serial.sh`；这一轮的 D15 只用 Blender 和纯 Python，不需要开 UE。

## D15 拟合误差诊断：目标网格 vs MetaHuman（最优先）

背景：每个角色是先在 Blender 里拟合成目标网格（`../word-quest-game/docs/hero-pipeline/export/<id>/<who>_body.fbx`，真实尺寸，脚底在 0，Blender 里脸朝 -Y），再由 UE 的 MetaHuman 拟合到这个目标网格（`MHC_<id>`），最后由 Codex 的 `ue_render_compare.py` 渲染出 `Saved/Compare/<id>/*.png`。现在要分清误差是来自“照片 → 目标网格”，还是“目标网格 → MetaHuman”。

1. 写 `Tools/qa/render_target_like_ue.py <id>`，用 Blender 无头运行：
   - Blender 路径：`/Applications/Blender.app/Contents/MacOS/Blender`
   - 读 `Saved/Compare/<id>/capture.json` 里的相机参数：位置、旋转、正交宽度、分辨率。
   - 导入目标 FBX，换算坐标：UE 的 (x, y, z) cm = Blender 的 (100x, −100y, 100z)。
   - 用同样的正交相机、灰色背景、中性材质渲染 5 个视图，输出到 `Saved/Compare/<id>/target_{front,q34,side,back,closeup}.png`。
2. 写 `Tools/qa/conform_report.py <id>`：对比 target_* 和 MHC 渲染。
   - 指标：关键点误差（MediaPipe，按区域分）、脸部剪影 IoU、差异热图。
   - 输出 `Docs/qa/<id>-conform-diff.md`，说清楚 MetaHuman 拟合在哪些区域偏离目标，例如嘴张开、鼻子塌、颈部扭曲。
3. 先跑 me2026 和 lin（等 `Saved/Compare/<id>` 有新的 capture.json）。随后对 mei / an / rui / organizer / old2090，在 Codex 渲染出来后也跑一遍。
4. 测试：用合成网格验证坐标换算和相机一致（同一个立方体在两边投影的位置误差 < 1 px）。

## D16 动画与表演规格

- 依据 D9 的 `acts.json` 和角色设定集，写 `Docs/design/animation-spec.md`：
  - 每个角色需要的动作清单：站、坐（课桌椅）、走、写字、翻书、举手、说话手势、看黑板、转头、笑、叹气等。
  - 每段的时长、循环与否、优先级。
  - 面部表情（ARKit 曲线组合）配方，例如“紧张的笑”= mouthSmile 0.4 + browInnerUp 0.3 + eyeSquint 0.2。
- 写 `Content/Data/anim/anim_manifest.csv`，字段：`anim_id, character, category, loop, priority, source`。`source` 填 `mocap / handkey / procedural`。
- 只写规格，不下载任何动作素材；版权边界照旧。
