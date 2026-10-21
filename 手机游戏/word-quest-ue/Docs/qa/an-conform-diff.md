# an 拟合误差诊断（目标网格 vs MetaHuman / MHC）

- 生成：`Tools/qa/conform_report.py`（DeepSeek D15）
- 目标网格渲染：`Tools/qa/render_target_like_ue.py`（Blender，正弦相机参数来自 `Saved/Compare/<id>/capture.json`）
- MHC 渲染：Codex `ue_render_compare.py` 输出（皮肤预览、无头发/服装）
- 对齐：MediaPipe 468 点（MHC 侧做相似变换到 target 坐标系）+ 前景剪影

## 1. 分段结论（误差来自哪一段）

- **front**：分段数据不足（参考/target/MHC 至少缺一项）
- **q34**：分段数据不足（参考/target/MHC 至少缺一项）
- **side**：分段数据不足（参考/target/MHC 至少缺一项）

## 2. 各视图指标

### front

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 6.56 | 7.70 |
| right_eye | 8.21 | 9.07 |
| brows | 7.53 | 9.66 |
| nose | 5.98 | 8.65 |
| mouth | 5.46 | 8.35 |
| contour | 9.67 | 19.46 |
| **整体** | **6.18** | **19.46** |

- 头部剪影 IoU：**0.938**
- 下颌/颈部左右不对称：**0.1%**
- 并排图：`an_conform/front_target_vs_mhc.png`
- 差异热图：`an_conform/front_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：9.7 px（整体 6.2 px）

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 4.76 | 6.89 |
| right_eye | 6.76 | 7.62 |
| brows | 5.85 | 10.07 |
| nose | 3.80 | 5.56 |
| mouth | 4.97 | 8.69 |
| contour | 8.15 | 12.75 |
| **整体** | **5.19** | **12.75** |

- 头部剪影 IoU：**0.953**
- 下颌/颈部左右不对称：**4.4%**
- 并排图：`an_conform/q34_target_vs_mhc.png`
- 差异热图：`an_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：8.2 px（整体 5.2 px）

### side

- 头部剪影 IoU：**0.296**
- 下颌/颈部左右不对称：**0.9%**
- 并排图：`an_conform/side_target_vs_mhc.png`
- 差异热图：`an_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.440**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`an_conform/back_target_vs_mhc.png`
- 差异热图：`an_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 9.35 | 10.92 |
| right_eye | 10.53 | 11.73 |
| brows | 14.35 | 20.46 |
| nose | 6.45 | 10.03 |
| mouth | 8.81 | 12.14 |
| contour | 13.03 | 26.44 |
| **整体** | **8.07** | **26.44** |

- 头部剪影 IoU：**0.954**
- 下颌/颈部左右不对称：**1.6%**
- 并排图：`an_conform/closeup_target_vs_mhc.png`
- 差异热图：`an_conform/closeup_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：14.4 px（整体 8.1 px）
- 下颌/脸廓/下巴 偏差最大：13.0 px（整体 8.1 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
