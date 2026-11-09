# mei 拟合误差诊断（目标网格 vs MetaHuman / MHC）

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
| left_eye | 4.30 | 5.14 |
| right_eye | 3.82 | 4.20 |
| brows | 4.64 | 8.65 |
| nose | 4.59 | 6.71 |
| mouth | 8.90 | 13.03 |
| contour | 6.24 | 11.41 |
| **整体** | **4.99** | **14.17** |

- 头部剪影 IoU：**0.944**
- 下颌/颈部左右不对称：**0.1%**
- 并排图：`mei_conform/front_target_vs_mhc.png`
- 差异热图：`mei_conform/front_mask_diff.png`

**诊断：**
- 嘴部（唇形/张口/唇厚） 偏差最大：8.9 px（整体 5.0 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 5.84 | 6.67 |
| right_eye | 6.86 | 8.72 |
| brows | 6.90 | 9.51 |
| nose | 6.38 | 10.11 |
| mouth | 4.00 | 6.03 |
| contour | 11.01 | 24.18 |
| **整体** | **6.06** | **24.18** |

- 头部剪影 IoU：**0.945**
- 下颌/颈部左右不对称：**8.6%**
- 并排图：`mei_conform/q34_target_vs_mhc.png`
- 差异热图：`mei_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：11.0 px（整体 6.1 px）
- 下颌/颈部左右宽度差 8.6% → 颈部扭转或下颌不对称

### side

- 头部剪影 IoU：**0.418**
- 下颌/颈部左右不对称：**0.7%**
- 并排图：`mei_conform/side_target_vs_mhc.png`
- 差异热图：`mei_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.329**
- 下颌/颈部左右不对称：**0.1%**
- 并排图：`mei_conform/back_target_vs_mhc.png`
- 差异热图：`mei_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 6.54 | 7.99 |
| right_eye | 5.04 | 6.79 |
| brows | 8.84 | 11.61 |
| nose | 4.72 | 7.36 |
| mouth | 13.73 | 23.65 |
| contour | 10.14 | 15.68 |
| **整体** | **7.35** | **28.19** |

- 头部剪影 IoU：**0.944**
- 下颌/颈部左右不对称：**1.0%**
- 并排图：`mei_conform/closeup_target_vs_mhc.png`
- 差异热图：`mei_conform/closeup_mask_diff.png`

**诊断：**
- 嘴部（唇形/张口/唇厚） 偏差最大：13.7 px（整体 7.3 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
