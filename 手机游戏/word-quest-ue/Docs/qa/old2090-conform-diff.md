# old2090 拟合误差诊断（目标网格 vs MetaHuman / MHC）

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
| left_eye | 5.87 | 6.15 |
| right_eye | 4.91 | 5.20 |
| brows | 3.83 | 5.39 |
| nose | 7.66 | 11.65 |
| mouth | 12.90 | 21.00 |
| contour | 9.96 | 14.86 |
| **整体** | **7.17** | **21.00** |

- 头部剪影 IoU：**0.940**
- 下颌/颈部左右不对称：**3.7%**
- 并排图：`old2090_conform/front_target_vs_mhc.png`
- 差异热图：`old2090_conform/front_mask_diff.png`

**诊断：**
- 嘴部（唇形/张口/唇厚） 偏差最大：12.9 px（整体 7.2 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 12.09 | 13.02 |
| right_eye | 11.35 | 14.55 |
| brows | 10.14 | 17.13 |
| nose | 7.95 | 12.22 |
| mouth | 6.60 | 11.30 |
| contour | 12.73 | 19.52 |
| **整体** | **8.36** | **19.52** |

- 头部剪影 IoU：**0.944**
- 下颌/颈部左右不对称：**5.2%**
- 并排图：`old2090_conform/q34_target_vs_mhc.png`
- 差异热图：`old2090_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：12.7 px（整体 8.4 px）
- 左眼（眼型/眼距） 偏差最大：12.1 px（整体 8.4 px）

### side

- 头部剪影 IoU：**0.536**
- 下颌/颈部左右不对称：**1.6%**
- 并排图：`old2090_conform/side_target_vs_mhc.png`
- 差异热图：`old2090_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.382**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`old2090_conform/back_target_vs_mhc.png`
- 差异热图：`old2090_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 7.63 | 7.98 |
| right_eye | 7.71 | 8.61 |
| brows | 6.08 | 9.03 |
| nose | 10.75 | 16.08 |
| mouth | 16.76 | 23.78 |
| contour | 16.12 | 25.25 |
| **整体** | **10.54** | **25.25** |

- 头部剪影 IoU：**0.934**
- 下颌/颈部左右不对称：**2.6%**
- 并排图：`old2090_conform/closeup_target_vs_mhc.png`
- 差异热图：`old2090_conform/closeup_mask_diff.png`

**诊断：**
- 嘴部（唇形/张口/唇厚） 偏差最大：16.8 px（整体 10.5 px）
- 下颌/脸廓/下巴 偏差最大：16.1 px（整体 10.5 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
