# lin 拟合误差诊断（目标网格 vs MetaHuman / MHC）

- 生成：`Tools/qa/conform_report.py`（DeepSeek D15）
- 目标网格渲染：`Tools/qa/render_target_like_ue.py`（Blender，正弦相机参数来自 `Saved/Compare/<id>/capture.json`）
- MHC 渲染：Codex `ue_render_compare.py` 输出（皮肤预览、无头发/服装）
- 对齐：MediaPipe 468 点（MHC 侧做相似变换到 target 坐标系）+ 前景剪影

## 1. 分段结论（误差来自哪一段）

- **front**：照片→目标网格 5.58 px；目标网格→MetaHuman 4.61 px
- **q34**：照片→目标网格 5.47 px；目标网格→MetaHuman 4.80 px
- **side**：分段数据不足（参考/target/MHC 至少缺一项）

## 2. 各视图指标

### front

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 3.76 | 4.17 |
| right_eye | 3.06 | 4.27 |
| brows | 4.92 | 7.11 |
| nose | 5.74 | 8.94 |
| mouth | 4.31 | 9.81 |
| contour | 7.43 | 12.45 |
| **整体** | **4.61** | **12.45** |

- 头部剪影 IoU：**0.952**
- 下颌/颈部左右不对称：**8.0%**
- 并排图：`lin_conform/front_target_vs_mhc.png`
- 差异热图：`lin_conform/front_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：7.4 px（整体 4.6 px）
- 下颌/颈部左右宽度差 8.0% → 颈部扭转或下颌不对称

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 2.21 | 2.87 |
| right_eye | 4.21 | 4.88 |
| brows | 5.53 | 10.87 |
| nose | 6.63 | 9.96 |
| mouth | 2.75 | 6.22 |
| contour | 8.66 | 15.87 |
| **整体** | **4.80** | **15.87** |

- 头部剪影 IoU：**0.941**
- 下颌/颈部左右不对称：**7.9%**
- 并排图：`lin_conform/q34_target_vs_mhc.png`
- 差异热图：`lin_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：8.7 px（整体 4.8 px）
- 下颌/颈部左右宽度差 7.9% → 颈部扭转或下颌不对称

### side

- 头部剪影 IoU：**0.207**
- 下颌/颈部左右不对称：**2.1%**
- 并排图：`lin_conform/side_target_vs_mhc.png`
- 差异热图：`lin_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.320**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`lin_conform/back_target_vs_mhc.png`
- 差异热图：`lin_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 8.56 | 10.33 |
| right_eye | 7.24 | 8.73 |
| brows | 12.04 | 15.23 |
| nose | 6.15 | 7.96 |
| mouth | 7.45 | 14.67 |
| contour | 10.97 | 22.93 |
| **整体** | **6.91** | **22.93** |

- 头部剪影 IoU：**0.942**
- 下颌/颈部左右不对称：**6.1%**
- 并排图：`lin_conform/closeup_target_vs_mhc.png`
- 差异热图：`lin_conform/closeup_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：12.0 px（整体 6.9 px）
- 下颌/脸廓/下巴 偏差最大：11.0 px（整体 6.9 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移
- 下颌/颈部左右宽度差 6.1% → 颈部扭转或下颌不对称

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
