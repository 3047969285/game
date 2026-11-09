# organizer 拟合误差诊断（目标网格 vs MetaHuman / MHC）

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
| left_eye | 6.14 | 6.96 |
| right_eye | 4.84 | 5.49 |
| brows | 9.79 | 13.76 |
| nose | 2.83 | 5.18 |
| mouth | 4.40 | 7.23 |
| contour | 6.12 | 8.91 |
| **整体** | **4.15** | **13.76** |

- 头部剪影 IoU：**0.956**
- 下颌/颈部左右不对称：**0.2%**
- 并排图：`organizer_conform/front_target_vs_mhc.png`
- 差异热图：`organizer_conform/front_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：9.8 px（整体 4.2 px）
- 左眼（眼型/眼距） 偏差最大：6.1 px（整体 4.2 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 3.70 | 4.54 |
| right_eye | 7.23 | 8.43 |
| brows | 8.31 | 12.81 |
| nose | 8.20 | 12.13 |
| mouth | 3.07 | 6.07 |
| contour | 10.85 | 26.97 |
| **整体** | **6.03** | **26.97** |

- 头部剪影 IoU：**0.946**
- 下颌/颈部左右不对称：**6.7%**
- 并排图：`organizer_conform/q34_target_vs_mhc.png`
- 差异热图：`organizer_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：10.9 px（整体 6.0 px）
- 下颌/颈部左右宽度差 6.7% → 颈部扭转或下颌不对称

### side

- 头部剪影 IoU：**0.432**
- 下颌/颈部左右不对称：**0.5%**
- 并排图：`organizer_conform/side_target_vs_mhc.png`
- 差异热图：`organizer_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.302**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`organizer_conform/back_target_vs_mhc.png`
- 差异热图：`organizer_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 12.18 | 14.43 |
| right_eye | 9.30 | 11.45 |
| brows | 19.81 | 26.56 |
| nose | 8.34 | 11.48 |
| mouth | 9.12 | 18.76 |
| contour | 11.13 | 18.56 |
| **整体** | **9.01** | **26.56** |

- 头部剪影 IoU：**0.946**
- 下颌/颈部左右不对称：**0.5%**
- 并排图：`organizer_conform/closeup_target_vs_mhc.png`
- 差异热图：`organizer_conform/closeup_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：19.8 px（整体 9.0 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
