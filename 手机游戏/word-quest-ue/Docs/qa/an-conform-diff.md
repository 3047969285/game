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
| left_eye | 6.11 | 6.70 |
| right_eye | 5.81 | 6.35 |
| brows | 10.80 | 15.86 |
| nose | 4.73 | 6.29 |
| mouth | 4.65 | 7.54 |
| contour | 7.06 | 9.59 |
| **整体** | **5.28** | **15.86** |

- 头部剪影 IoU：**0.954**
- 下颌/颈部左右不对称：**0.9%**
- 并排图：`an_conform/front_target_vs_mhc.png`
- 差异热图：`an_conform/front_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：10.8 px（整体 5.3 px）

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 7.05 | 9.46 |
| right_eye | 9.49 | 10.68 |
| brows | 8.44 | 15.51 |
| nose | 2.87 | 5.55 |
| mouth | 4.36 | 7.84 |
| contour | 9.63 | 16.13 |
| **整体** | **5.93** | **16.13** |

- 头部剪影 IoU：**0.946**
- 下颌/颈部左右不对称：**6.7%**
- 并排图：`an_conform/q34_target_vs_mhc.png`
- 差异热图：`an_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：9.6 px（整体 5.9 px）
- 右眼（眼型/眼距） 偏差最大：9.5 px（整体 5.9 px）
- 下颌/颈部左右宽度差 6.7% → 颈部扭转或下颌不对称

### side

- 头部剪影 IoU：**0.515**
- 下颌/颈部左右不对称：**1.3%**
- 并排图：`an_conform/side_target_vs_mhc.png`
- 差异热图：`an_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.428**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`an_conform/back_target_vs_mhc.png`
- 差异热图：`an_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 9.75 | 10.89 |
| right_eye | 9.20 | 9.90 |
| brows | 14.35 | 21.83 |
| nose | 8.57 | 11.47 |
| mouth | 8.40 | 15.74 |
| contour | 11.15 | 20.07 |
| **整体** | **8.58** | **21.83** |

- 头部剪影 IoU：**0.951**
- 下颌/颈部左右不对称：**0.5%**
- 并排图：`an_conform/closeup_target_vs_mhc.png`
- 差异热图：`an_conform/closeup_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：14.3 px（整体 8.6 px）

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
