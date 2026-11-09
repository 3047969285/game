# DeepSeek 任务书 · 第七轮（Claude 下发，2026-10-22）

目录规则不变：只改 `Docs/**`（任务书除外）、`Tools/qa/**`、`Tools/data_*.py`、`Content/Data/**`。UE 必须走 `Tools/run_ue_serial.sh`，本轮不需要开 UE。

## D19 配角形体调参建议（我等着用）

问题：配角是按设定集的脸部参数，用 `~/.local/share/hunyuan3d/work/build_cast.py` 映射到 MPFB target 建出来的。从渲染看，有几处偏离设定：

- rui 头顶过高（headAspect −0.65 加 foreheadHeight 0.55 被放大）
- old2090 下颌和颈部偏厚
- mei 的眼睛比设定小

任务：

1. 用 `Saved/Compare/<id>/front.png`、`side.png`（MHC 渲染），配合 MediaPipe 关键点，量出每个配角的比例：
   - 脸长 / 脸宽
   - 额头高度占脸长的比例
   - 眼宽 / 脸宽
   - 眼距 / 脸宽
   - 鼻宽 / 脸宽
   - 嘴宽 / 脸宽
   - 下颌宽 / 颧骨宽
   - 侧面下巴突出度
2. 和设定集（`Docs/characters/<id>.md`）的描述，以及“普通中国 20 岁大学生”的参考区间（写明来源或估计依据）对比，算出每个比例的偏差。
3. 给出 `build_cast.py` 里 `CAST[<id>]["face"]` 参数的修改建议：具体数值，以及对应修正哪一项偏差。还要给出 `MAP` 映射增益的建议，比如 headAspect 映射到 `head-scale-horiz` 的增益从 1.0 改成多少。
4. 输出 `Docs/qa/cast-tuning.md`。`build_cast.py` 由我来改，你不要动它。
5. 测试：比例计算函数用合成关键点验证。

## D20 看板刷新和发丝验收准备

1. 男主的渲染已经重新生成，请重跑 `dashboard.py`，把 7 个角色都填上。
2. 发丝验收：在 `report.py` / `dashboard.py` 里加入“头发剪影 vs `Docs/qa/ref_masks`”。
   - 主角对比参考掩码。
   - 配角只检查头发覆盖率和轮廓是否合理，例如马尾是否超出头顶、寸头是否贴头。
   - 等 Codex 重新导入 Groom 并渲染后，这项指标才有意义；先把代码和测试做好。
3. 结果写进 STATUS。
