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
| left_eye | 5.55 | 6.15 |
| right_eye | 6.55 | 7.86 |
| brows | 4.73 | 7.03 |
| nose | 10.17 | 15.84 |
| mouth | 8.18 | 15.81 |
| contour | 13.37 | 22.83 |
| **整体** | **7.40** | **22.83** |

- 头部剪影 IoU：**0.929**
- 下颌/颈部左右不对称：**1.8%**
- 并排图：`old2090_conform/front_target_vs_mhc.png`
- 差异热图：`old2090_conform/front_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：13.4 px（整体 7.4 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 7.40 | 7.98 |
| right_eye | 8.53 | 12.17 |
| brows | 6.25 | 11.81 |
| nose | 10.11 | 15.74 |
| mouth | 3.54 | 6.55 |
| contour | 12.72 | 25.60 |
| **整体** | **7.06** | **25.60** |

- 头部剪影 IoU：**0.943**
- 下颌/颈部左右不对称：**4.9%**
- 并排图：`old2090_conform/q34_target_vs_mhc.png`
- 差异热图：`old2090_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：12.7 px（整体 7.1 px）
- 鼻部（鼻梁高度/鼻翼宽度） 偏差最大：10.1 px（整体 7.1 px）

### side

- 头部剪影 IoU：**0.288**
- 下颌/颈部左右不对称：**1.5%**
- 并排图：`old2090_conform/side_target_vs_mhc.png`
- 差异热图：`old2090_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.396**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`old2090_conform/back_target_vs_mhc.png`
- 差异热图：`old2090_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 7.42 | 8.45 |
| right_eye | 9.36 | 12.57 |
| brows | 10.14 | 16.28 |
| nose | 16.06 | 25.33 |
| mouth | 9.19 | 19.87 |
| contour | 22.47 | 38.48 |
| **整体** | **11.02** | **38.48** |

- 头部剪影 IoU：**0.927**
- 下颌/颈部左右不对称：**0.9%**
- 并排图：`old2090_conform/closeup_target_vs_mhc.png`
- 差异热图：`old2090_conform/closeup_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：22.5 px（整体 11.0 px）
- 鼻部（鼻梁高度/鼻翼宽度） 偏差最大：16.1 px（整体 11.0 px）

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
