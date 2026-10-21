# me2026 拟合误差诊断（目标网格 vs MetaHuman / MHC）

- 生成：`Tools/qa/conform_report.py`（DeepSeek D15）
- 目标网格渲染：`Tools/qa/render_target_like_ue.py`（Blender，正弦相机参数来自 `Saved/Compare/<id>/capture.json`）
- MHC 渲染：Codex `ue_render_compare.py` 输出（皮肤预览、无头发/服装）
- 对齐：MediaPipe 468 点（MHC 侧做相似变换到 target 坐标系）+ 前景剪影

## 1. 分段结论（误差来自哪一段）

- **front**：照片→目标网格 4.35 px；目标网格→MetaHuman 5.47 px
- **q34**：照片→目标网格 14.11 px；目标网格→MetaHuman 8.72 px
- **side**：分段数据不足（参考/target/MHC 至少缺一项）

## 2. 各视图指标

### front

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 7.10 | 7.42 |
| right_eye | 7.20 | 7.57 |
| brows | 5.31 | 7.56 |
| nose | 3.95 | 7.10 |
| mouth | 6.62 | 9.82 |
| contour | 7.49 | 13.79 |
| **整体** | **5.47** | **13.79** |

- 头部剪影 IoU：**0.961**
- 下颌/颈部左右不对称：**2.6%**
- 并排图：`me2026_conform/front_target_vs_mhc.png`
- 差异热图：`me2026_conform/front_mask_diff.png`

**诊断：**
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 10.59 | 12.02 |
| right_eye | 12.28 | 17.40 |
| brows | 9.94 | 16.78 |
| nose | 10.09 | 15.41 |
| mouth | 7.68 | 11.82 |
| contour | 10.29 | 18.73 |
| **整体** | **8.72** | **18.73** |

- 头部剪影 IoU：**0.959**
- 下颌/颈部左右不对称：**8.5%**
- 并排图：`me2026_conform/q34_target_vs_mhc.png`
- 差异热图：`me2026_conform/q34_mask_diff.png`

**诊断：**
- 右眼（眼型/眼距） 偏差最大：12.3 px（整体 8.7 px）
- 下颌/颈部左右宽度差 8.5% → 颈部扭转或下颌不对称

### side

- 头部剪影 IoU：**0.265**
- 下颌/颈部左右不对称：**5.7%**
- 并排图：`me2026_conform/side_target_vs_mhc.png`
- 差异热图：`me2026_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.433**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`me2026_conform/back_target_vs_mhc.png`
- 差异热图：`me2026_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 11.05 | 12.00 |
| right_eye | 13.18 | 14.09 |
| brows | 6.78 | 11.43 |
| nose | 9.82 | 16.31 |
| mouth | 12.57 | 21.12 |
| contour | 13.85 | 29.95 |
| **整体** | **9.73** | **29.95** |

- 头部剪影 IoU：**0.965**
- 下颌/颈部左右不对称：**2.2%**
- 并排图：`me2026_conform/closeup_target_vs_mhc.png`
- 差异热图：`me2026_conform/closeup_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：13.8 px（整体 9.7 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
