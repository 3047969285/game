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
| left_eye | 5.97 | 7.81 |
| right_eye | 5.98 | 7.71 |
| brows | 12.09 | 14.26 |
| nose | 7.62 | 10.44 |
| mouth | 7.98 | 13.22 |
| contour | 11.22 | 20.47 |
| **整体** | **7.32** | **20.47** |

- 头部剪影 IoU：**0.932**
- 下颌/颈部左右不对称：**1.3%**
- 并排图：`rui_conform/front_target_vs_mhc.png`
- 差异热图：`rui_conform/front_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：12.1 px（整体 7.3 px）
- 下颌/脸廓/下巴 偏差最大：11.2 px（整体 7.3 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

- 头部剪影 IoU：**0.519**
- 下颌/颈部左右不对称：**4.1%**
- 并排图：`rui_conform/q34_target_vs_mhc.png`
- 差异热图：`rui_conform/q34_mask_diff.png`

### side

- 头部剪影 IoU：**0.549**
- 下颌/颈部左右不对称：**2.4%**
- 并排图：`rui_conform/side_target_vs_mhc.png`
- 差异热图：`rui_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.343**
- 下颌/颈部左右不对称：**0.1%**
- 并排图：`rui_conform/back_target_vs_mhc.png`
- 差异热图：`rui_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 10.48 | 13.56 |
| right_eye | 10.53 | 11.83 |
| brows | 13.29 | 18.64 |
| nose | 10.81 | 15.02 |
| mouth | 11.55 | 19.89 |
| contour | 17.38 | 27.76 |
| **整体** | **10.80** | **27.76** |

- 头部剪影 IoU：**0.926**
- 下颌/颈部左右不对称：**1.0%**
- 并排图：`rui_conform/closeup_target_vs_mhc.png`
- 差异热图：`rui_conform/closeup_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：17.4 px（整体 10.8 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
