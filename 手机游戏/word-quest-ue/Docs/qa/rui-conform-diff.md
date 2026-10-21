# rui 拟合误差诊断（目标网格 vs MetaHuman / MHC）

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
| left_eye | 6.50 | 7.52 |
| right_eye | 7.04 | 7.83 |
| brows | 6.15 | 8.60 |
| nose | 1.76 | 3.06 |
| mouth | 8.48 | 13.82 |
| contour | 5.46 | 11.08 |
| **整体** | **4.93** | **13.82** |

- 头部剪影 IoU：**0.969**
- 下颌/颈部左右不对称：**0.2%**
- 并排图：`rui_conform/front_target_vs_mhc.png`
- 差异热图：`rui_conform/front_mask_diff.png`

**诊断：**
- 嘴部（唇形/张口/唇厚） 偏差最大：8.5 px（整体 4.9 px）
- 右眼（眼型/眼距） 偏差最大：7.0 px（整体 4.9 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

- 头部剪影 IoU：**0.413**
- 下颌/颈部左右不对称：**4.5%**
- 并排图：`rui_conform/q34_target_vs_mhc.png`
- 差异热图：`rui_conform/q34_mask_diff.png`

### side

- 头部剪影 IoU：**0.361**
- 下颌/颈部左右不对称：**3.1%**
- 并排图：`rui_conform/side_target_vs_mhc.png`
- 差异热图：`rui_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.345**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`rui_conform/back_target_vs_mhc.png`
- 差异热图：`rui_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 13.67 | 15.97 |
| right_eye | 12.17 | 14.16 |
| brows | 11.14 | 13.77 |
| nose | 3.84 | 7.42 |
| mouth | 6.11 | 8.71 |
| contour | 13.41 | 26.72 |
| **整体** | **7.57** | **26.72** |

- 头部剪影 IoU：**0.930**
- 下颌/颈部左右不对称：**0.8%**
- 并排图：`rui_conform/closeup_target_vs_mhc.png`
- 差异热图：`rui_conform/closeup_mask_diff.png`

**诊断：**
- 左眼（眼型/眼距） 偏差最大：13.7 px（整体 7.6 px）
- 下颌/脸廓/下巴 偏差最大：13.4 px（整体 7.6 px）

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
