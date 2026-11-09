# DeepSeek 任务书 · 第八轮（Claude 下发，2026-10-22）

目录规则不变：只改 `Docs/**`（任务书除外）、`Tools/qa/**`、`Tools/data_*.py`、`Content/Data/**`。本轮不需要开 UE。

## D21 皮肤颜色校准工具（最优先，我正在用）

背景：Core Data 已安装，我在用 `Tools/char_skin.py` 合成 MetaHuman 皮肤，参数是 U（肤色深浅）、V（冷暖 / 黄红）、face_texture_index。现在只能靠肉眼对比，需要量化。

1. 写 `Tools/qa/skin_color.py <render.png> <ref.png>`：
   - 用 MediaPipe 关键点取以下区域，排除阴影、高光和头发：两颊、额头中部、鼻梁、下巴、颈部。
   - 取每个区域的中位色，转成 CIE Lab，计算 ΔE2000，并分别给出 L*（亮度）、a*（红绿）、b*（黄蓝）的差值。
   - 光照不同时要先做白平衡归一。可以用参考图的白背景和渲染的灰背景估计光源颜色并校正，要写清楚方法和局限。
2. 写 `Tools/qa/skin_suggest.py <id>`：根据 ΔL、Δa、Δb 给出 U / V 的调整方向和步长。
   - 规则自己定，写进文档。参考：L 太暗就降 U；b 太黄就调 V。V 偏黄还是偏红要用我给的样本标定。
   - 标定样本：`/private/tmp/claude-501/-Users-shoudaodefengge---/c6ddeaad-46f0-42d0-927e-6ffb1e8d61be/scratchpad/me_skin_*.png`，文件名里有 u_v_index。
3. 先跑男主：渲染用 `Saved/Compare/me2026/closeup.png` 和 front.png，参考图用 `~/Downloads/lian1.png`。结果写进 `Docs/qa/skin-me2026.md` 和 STATUS。
4. 测试：用合成色块验证 Lab 和 ΔE 的计算。

## D22 配角调参效果验证

我已按 D19 的建议修改了 `build_cast.py`，配角 5 人正在重新拟合和渲染（`Saved/Compare/<id>/` 会陆续更新）。更新完成后：

- 重跑 `cast_proportions.py` 和 `dashboard.py`，对比调参前后的比例：rui 头高、mei 眼宽、old2090 下颌和颈部。
- 写进 `Docs/qa/cast-tuning.md` 的“结果”一节和 STATUS。
- 如果仍然偏差，给出第二轮建议。
