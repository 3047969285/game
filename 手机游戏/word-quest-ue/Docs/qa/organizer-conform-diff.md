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
| left_eye | 6.37 | 7.22 |
| right_eye | 5.54 | 6.27 |
| brows | 6.29 | 8.44 |
| nose | 2.82 | 4.61 |
| mouth | 4.31 | 6.32 |
| contour | 5.66 | 11.44 |
| **整体** | **3.88** | **11.44** |

- 头部剪影 IoU：**0.960**
- 下颌/颈部左右不对称：**0.4%**
- 并排图：`organizer_conform/front_target_vs_mhc.png`
- 差异热图：`organizer_conform/front_mask_diff.png`

**诊断：**
- 左眼（眼型/眼距） 偏差最大：6.4 px（整体 3.9 px）
- 眉区（眉骨/眉形） 偏差最大：6.3 px（整体 3.9 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

### q34

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 2.12 | 3.03 |
| right_eye | 4.11 | 4.67 |
| brows | 4.08 | 7.52 |
| nose | 5.97 | 9.16 |
| mouth | 2.58 | 5.42 |
| contour | 7.54 | 18.34 |
| **整体** | **4.03** | **18.34** |

- 头部剪影 IoU：**0.959**
- 下颌/颈部左右不对称：**5.3%**
- 并排图：`organizer_conform/q34_target_vs_mhc.png`
- 差异热图：`organizer_conform/q34_mask_diff.png`

**诊断：**
- 下颌/脸廓/下巴 偏差最大：7.5 px（整体 4.0 px）
- 鼻部（鼻梁高度/鼻翼宽度） 偏差最大：6.0 px（整体 4.0 px）

### side

- 头部剪影 IoU：**0.244**
- 下颌/颈部左右不对称：**1.4%**
- 并排图：`organizer_conform/side_target_vs_mhc.png`
- 差异热图：`organizer_conform/side_mask_diff.png`

### back

- 头部剪影 IoU：**0.331**
- 下颌/颈部左右不对称：**0.0%**
- 并排图：`organizer_conform/back_target_vs_mhc.png`
- 差异热图：`organizer_conform/back_mask_diff.png`

### closeup

| 区域 | 平均误差 (px) | 最大误差 (px) |
|------|---------------|---------------|
| left_eye | 10.93 | 13.44 |
| right_eye | 10.60 | 12.85 |
| brows | 15.25 | 18.93 |
| nose | 3.83 | 5.52 |
| mouth | 9.26 | 16.40 |
| contour | 8.88 | 14.06 |
| **整体** | **7.09** | **18.93** |

- 头部剪影 IoU：**0.957**
- 下颌/颈部左右不对称：**2.5%**
- 并排图：`organizer_conform/closeup_target_vs_mhc.png`
- 差异热图：`organizer_conform/closeup_mask_diff.png`

**诊断：**
- 眉区（眉骨/眉形） 偏差最大：15.3 px（整体 7.1 px）
- 左眼（眼型/眼距） 偏差最大：10.9 px（整体 7.1 px）
- 嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移

## 3. 建议

- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。
- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。
- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。
