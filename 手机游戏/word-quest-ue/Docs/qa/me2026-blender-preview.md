# 男主 me2026（Blender lookdev 临时验收）

- 生成：`Tools/qa/run_blender_preview_report.py me2026`（DeepSeek D10）
- 渲染：`/Users/shoudaodefengge/.local/share/hunyuan3d/work/fit`，`male_look_{front,q34,side,back,closeup}.png`
- 性质：**临时验收**（Blender lookdev 渲染，不是 MetaHuman/UE 最终渲染；Codex 的对比相机就绪后以 `report.py` 为准）
- 结论：**存在 FAIL**

## PASS / FAIL 表

| 视角 / 指标 | 数值 | 阈值 | 判定 | 说明 |
|-------------|------|------|------|------|
| front 关键点平均误差 | 4.47 px | ≤ 3 px | FAIL | max 11.8 / p95 8.7 |
| front 头发剪影 IoU | 0.210 | ≥ 0.85 | FAIL | 对比 D7 参考头发掩码 |
| q34 关键点平均误差 | 6.04 px | ≤ 8 px | PASS | max 17.1 / p95 12.0 |
| side 脸部剪影 IoU | 0.449 | ≥ 0.95 | FAIL | 白底前景去掉头发；临时渲染构图可能不一致 |
| side 头发剪影 IoU | 0.261 | ≥ 0.85 | FAIL | 对比 D7 参考头发掩码 |

## 并排图（左=参考，右=当前渲染）

![front](me2026_blender_preview/front_side_by_side.png)
![q34](me2026_blender_preview/q34_side_by_side.png)
![side](me2026_blender_preview/side_side_by_side.png)
![back](me2026_blender_preview/back_side_by_side.png)
![closeup](me2026_blender_preview/closeup_side_by_side.png)

## 临时验收说明

- 本报告用于 Claude 在 MetaHuman 交付前跟踪 Blender 阶段进度，数值只作趋势参考。
- 构图/焦距/背景与参考图不完全一致时，剪影 IoU 会偏低；关键点误差受头部裁切影响。
