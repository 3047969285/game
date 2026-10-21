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
| left_eye | 4.06 | 5.49 |
| right_eye | 4.53 | 5.23 |
| brows | 5.02 | 7.78 |
| nose | 4.47 | 6.21 |
| mouth | 3.50 | 6.03 |
| contour | 6.31 | 10.62 |
| **整体** | **4.07** | **10.62** |

- 头部剪影 IoU：**0.943**
- 下颌/颈部左右不对称：**0.6%**
- 并排图：`mei_conform/front_target_vs_mhc.png`
- 差异热图：`mei_conform/front_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：6.3 px（整体 4.1 px）

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 1.84 | 2.46 |
| right_eye | 3.38 | 3.73 |
| brows | 3.12 | 5.13 |
| nose | 4.91 | 7.81 |
| mouth | 3.28 | 6.48 |
| contour | 6.23 | 13.18 |
| **整体** | **3.57** | **13.18** |

- 头部剪影 IoU：**0.954**
- 下颌/颈部左右不对称：**5.5%**
- 并排图：`mei_conform/q34_target_vs_mhc.png`
- 差异热图：`mei_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：6.2 px（整体 3.6 px）

### side

- 头部剪影 IoU：**0.232**
- 下颌/颈部左右不对称：**1.2%**
- 并排图：`mei_conform/side_target_vs_mhc.png`
- 差异热图：`mei_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.314**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`mei_conform/back_target_vs_mhc.png`
- 差异热图：`mei_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 7.12 | 8.79 |
| right_eye | 6.86 | 8.02 |
| brows | 7.66 | 13.91 |
| nose | 6.79 | 8.73 |
| mouth | 4.84 | 6.59 |
| contour | 10.35 | 19.13 |
| **整体** | **6.43** | **19.13** |

- 头部剪影 IoU：**0.944**
- 下颌/颈部左右不对称：**2.8%**
- 并排图：`mei_conform/closeup_target_vs_mhc.png`
- 差异热图：`mei_conform/closeup_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：10.4 px（整体 6.4 px）

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
