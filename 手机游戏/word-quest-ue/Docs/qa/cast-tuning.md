# 配角形体调参建议（D19）

> 作者：DeepSeek Harness · 2026-10-22 · 任务书 [../tasks/deepseek-round7.md](../tasks/deepseek-round7.md)
> 数据：`Tools/qa/cast_proportions.py` → `Docs/qa/cast-proportions.json`（MHC 渲染 `Saved/Compare/<id>/{front,side}.png`，MediaPipe 468 点 + 剪影几何）
> 修改对象：`~/.local/share/hunyuan3d/work/build_cast.py` —— **由 Claude 修改，本文件只给建议**。
> 复核命令：`~/.local/share/hunyuan3d/.venv/bin/python Tools/qa/cast_proportions.py`（重跑 `build_cast.py` + Codex 重渲染后）

## 1. 方法与口径

- **脸长/脸宽**：脸长 = 关键点 10（额顶）→152（下巴）；脸宽 = 234↔454（颧骨）。`face_lw = 脸长/脸宽`。
- **额头比例**：眉线（105/334/107/336 的 y 均值）到 10 的距离 / 脸长；MediaPipe 的 10 不是发际线，绝对值偏低，**只用于同口径横比**。
- **眼宽/眼距/鼻宽/嘴宽/下颌宽**：均 / 颧骨宽（下颌宽 = 58↔288）。
- **head_aspect**：剪影头顶 → 下巴的距离 / 颧骨宽（直接量化“头显长/头顶过高”）。
- **forehead_visible**：剪影头顶 → 眉线 /（剪影头顶 → 下巴）。
- **nose_chin_delta**（侧面）：(下巴前缘 − 鼻尖前缘)/头高；**越大 = 下巴越后缩**。
- **neck_depth_ratio**（侧面）：颈部最窄处前后宽 / 头高；越大越厚。
- 局限：当前 MHC 渲染是**皮肤预览（无头发、无口腔内壁）**，背景有渐变；头发相关指标不参与本轮；脸部比例不受影响。

**普通中国 20 岁大学生参考区间（估计值，用于方向判断）**
> 依据：面部三庭五眼经验 + 成人头面测量均值，按本工具同一 MediaPipe 口径回推的**估计区间**（不是文献原始数据）。媒体口径不同会产生 5–10% 系统差，因此以“相对偏差”为主。

| 指标 | 参考区间（估计） |
|------|------------------|
| face_lw（脸长/脸宽） | 1.14–1.32（男性偏 1.20–1.32，女性偏 1.14–1.26） |
| forehead_ratio（同口径） | 0.17–0.21 |
| eye_width_ratio | 0.20–0.22 |
| eye_spacing_ratio | 0.24–0.27 |
| nose_width_ratio | 0.28–0.31 |
| mouth_width_ratio | 0.33–0.39 |
| jaw_cheek_ratio | 0.87–0.91 |
| nose_chin_delta（侧） | 0.08–0.13 |
| neck_depth_ratio（侧） | 0.72–0.82 |

## 2. 实测（front + side）

| id | face_lw | forehead | eye_w | eye_sp | nose_w | mouth_w | jaw/cheek | head_aspect | forehead_vis | nose_chin↓ | neck_depth |
|----|---------|----------|-------|--------|--------|---------|-----------|-------------|--------------|------------|------------|
| **rui** | **1.312** | 0.189 | 0.201 | 0.245 | 0.287 | 0.324 | 0.891 | **2.051** | 0.482 | 0.109 | 0.825 |
| **old2090** | 1.164 | 0.189 | 0.202 | 0.245 | 0.297 | 0.358 | **0.908** | 1.909 | 0.506 | **0.130** | 0.729 |
| **mei** | 1.269 | 0.172 | **0.202** | 0.239 | 0.284 | 0.337 | 0.892 | **2.346** | 0.552 | 0.096 | 0.820 |
| an | 1.158 | 0.185 | 0.201 | 0.250 | 0.305 | 0.377 | 0.910 | 1.825 | 0.483 | 0.127 | 0.765 |
| organizer | 1.133 | 0.198 | 0.198 | 0.246 | 0.292 | 0.358 | 0.904 | 2.016 | 0.549 | 0.092 | 0.814 |
| *参考（女主校准）* lin | 1.149 | 0.202 | 0.214 | 0.265 | 0.305 | 0.376 | 0.869 | 2.046 | 0.552 | 0.112 | 0.789 |

## 3. 逐角色诊断与 build_cast.py 建议

### 3.1 rui —— 头顶过高（主要问题）

**证据**：`head_aspect 2.051` 是同性别（男）里最高（an 1.825，**+12.4%**）；`face_lw 1.312` 已到参考上界（脸最长最窄）；同口径 `forehead_ratio 0.189` 不低。当前 `headAspect=-0.65`（水平压窄 → 显高）+ `foreheadHeight=0.55`（额部纵向拉伸）叠加，是“头显长”的主因。

**建议（CAST + MAP）**
```python
# CAST["rui"]["face"]
"headAspect":     -0.65 → -0.45   # 减少水平压窄（头顶不再显高）
"foreheadHeight":  0.55 →  0.35   # 额头纵向拉伸减半（主因）
"jawWidth":       -0.45 → -0.40   # 下颌略放宽，避免尖下巴
# MAP 增益
"headAspect":     [("head/head-scale-horiz", 1.0 → 0.8)]
"foreheadHeight": [("forehead/forehead-scale-vert", 1.0 → 0.85)]
# 可选：新增直接压低颅顶
"headScaleVert":  [("head/head-scale-vert", 1.0)]，CAST 里设 -0.12
```
**预期**：`head_aspect 2.05 → ≈1.92`；`face_lw 1.31 → ≈1.26`；仍保留设定里的“长脸高额”。

### 3.2 old2090 —— 下颌/颈部偏厚、下巴后缩

**证据**：`jaw_cheek_ratio 0.908`（参考上界 0.91，cast 内偏高）；`nose_chin_delta 0.130` **全场最大**（下巴最靠后）；颈部观察偏厚。当前是从 `male_fit.json` 继承 + `age_targets["neck-double-incr"]=0.3`（加双下巴厚度）、cheek-volume 减少。

**建议**
```python
# age_targets
"neck-double-incr": 0.30 → 0.10          # 主要减颈部/下颌厚度
# 新增 face（在 from_fit 权重之后叠加；build_cast 需允许同时有 from_fit + face）
face=dict(jawWidth=-0.10, jawLength=0.15, cheekFull=-0.10)
# MAP 增益
"jawWidth":  [("chin/chin-width", 1.0 → 1.2)]     # 下颌收窄更有效
"jawLength": [("chin/chin-height", 1.0 → 1.2)]    # 下巴拉长、改善后缩
# 可选：新增颈部收窄
"neckWidth": [("neck/neck-scale-horiz", 1.0)]，CAST 里设 -0.15
```
**预期**：`jaw_cheek 0.908 → ≈0.88`；侧脸 `nose_chin_delta 0.130 → ≈0.11`；颈部厚度下降一档。

### 3.3 mei —— 眼睛比设定小

**证据**：`eye_width_ratio 0.202`（女性参考 0.20–0.22，但同口径下 lin 0.214 → 小 **5.6%**）；设定要求“大圆眼”。当前 `eyeSize=0.45` 映射到 `eyes/*-eye-scale` 的增益 1.0 偏弱（测下来眼宽比例没拉开）。另 `head_aspect 2.346` 为全场最高（头显长，也会衬得眼睛小）。

**建议**
```python
# CAST["mei"]["face"]
"eyeSize":        0.45 → 0.65    # 主修正
"headAspect":    -0.55 → -0.48   # 头略放宽，减少“长脸显小眼”
"foreheadHeight": 0.10 → 0.00    # 额部略收
# MAP 增益
"eyeSize": [("eyes/l-eye-scale", 1.0 → 1.35), ("eyes/r-eye-scale", 1.0 → 1.35)]
```
**预期**：`eye_width_ratio 0.202 → ≈0.215`；`head_aspect 2.35 → ≈2.22`。

### 3.4 an / organizer —— 基本在参考区间

- **an**：`jaw_cheek 0.910`（宽方脸设定，参考上界，可接受）；`neck_depth 0.765` 正常；`nose_chin_delta 0.127` 略后缩 → 可选 `jawLength: 0.20 → 0.28`（下巴稍前）。
- **organizer**：`eye_width 0.198` 略小于女性参考下界 → 可选 `eyeSize: -0.35 → -0.30`、MAP `eyeSize` 增益 1.0→1.2；其余比例在区间内。

## 4. MAP 增益修改汇总

| 参数 | 映射目标 | 现增益 | 建议 | 原因 |
|------|----------|--------|------|------|
| headAspect | head/head-scale-horiz | 1.0 | **0.8**（rui） | -0.65 过窄导致头显高 |
| foreheadHeight | forehead/forehead-scale-vert | 1.0 | **0.85**（rui） | 0.55 纵向拉伸过强 |
| eyeSize | eyes/l,r-eye-scale | 1.0 | **1.35**（mei） / 1.2（organizer） | 眼睛比例没拉开 |
| jawWidth | chin/chin-width | 1.0 | **1.2**（old2090） | 下颌/颈部偏厚 |
| jawLength | chin/chin-height | 1.0 | **1.2**（old2090） | 下巴后缩 |
| headScaleVert（新增） | head/head-scale-vert | — | rui 设 -0.12 | 直接压低颅顶 |
| neckWidth（新增） | neck/neck-scale-horiz | — | old2090 设 -0.15 | 颈部收窄 |

## 5. 复核流程

```bash
# 1) Claude 改 build_cast.py 后重建 5 个配角（Blender，逐角色）
# 2) Codex 重新跑 ue_render_compare.py <id>（白底、无发丝；本轮只验形体）
# 3) 量比例 + 对照
~/.local/share/hunyuan3d/.venv/bin/python Tools/qa/cast_proportions.py
~/.local/share/hunyuan3d/.venv/bin/python Tools/qa/dashboard.py
```
**判据**：rui `head_aspect` 目标 ≤1.95；mei `eye_width_ratio` 目标 ≥0.212；old2090 `jaw_cheek_ratio` 目标 ≤0.885、`nose_chin_delta` ≤0.115；其余比例落在第 1 节参考区间内。

## 6. 结果（D22，第一轮调参后）

> 2026-10-22 10:00-10:03，5 位配角按 D19 建议重建并重渲染；以下为同一工具（`cast_proportions.py`）复测。

| 角色 | 指标 | 调参前 | 调参后 | 变化 | 目标/判据 | 结论 |
|------|------|--------|--------|------|-----------|------|
| rui | head_aspect | 2.0510 | 1.9809 | -0.0701 | <=1.95 | 仍差1.6% |
| rui | face_lw | 1.3120 | 1.2783 | -0.0337 | <=1.30 | 达标 |
| rui | eye_width_ratio | 0.2013 | 0.1980 | -0.0033 | - | - |
| rui | jaw_cheek_ratio | 0.8913 | 0.8985 | +0.0072 | 0.87-0.91 | - |
| rui | forehead_visible | 0.4816 | 0.4776 | -0.0040 | - | - |
| rui | nose_chin_delta | 0.1087 | 0.1119 | +0.0032 | - | - |
| rui | neck_depth_ratio | 0.8254 | 0.7987 | -0.0267 | - | - |
| mei | head_aspect | 2.3464 | 2.2206 | -0.1258 | <=2.22 | - |
| mei | face_lw | 1.2694 | 1.2251 | -0.0443 | - | - |
| mei | eye_width_ratio | 0.2015 | 0.1985 | -0.0030 | >=0.212 | 未改善 |
| mei | jaw_cheek_ratio | 0.8921 | 0.8876 | -0.0045 | - | - |
| mei | forehead_visible | 0.5522 | 0.5500 | -0.0022 | - | - |
| mei | nose_chin_delta | 0.0961 | 0.0995 | +0.0034 | - | - |
| mei | neck_depth_ratio | 0.8197 | 0.8171 | -0.0026 | - | - |
| old2090 | head_aspect | 1.9094 | 1.8988 | -0.0106 | - | - |
| old2090 | face_lw | 1.1638 | 1.1889 | +0.0251 | - | - |
| old2090 | eye_width_ratio | 0.2019 | 0.1973 | -0.0046 | - | - |
| old2090 | jaw_cheek_ratio | 0.9080 | 0.9047 | -0.0033 | <=0.885 | 仍偏厚 |
| old2090 | forehead_visible | 0.5058 | 0.4940 | -0.0118 | - | - |
| old2090 | nose_chin_delta | 0.1302 | 0.1393 | +0.0091 | <=0.115 | 仍后缩 |
| old2090 | neck_depth_ratio | 0.7287 | 0.7406 | +0.0119 | - | - |
| an | head_aspect | 1.8251 | 1.7776 | -0.0475 | <=1.83 | - |
| an | face_lw | 1.1575 | 1.1438 | -0.0137 | - | - |
| an | eye_width_ratio | 0.2011 | 0.1976 | -0.0035 | - | - |
| an | jaw_cheek_ratio | 0.9101 | 0.9061 | -0.0040 | - | - |
| an | forehead_visible | 0.4828 | 0.4883 | +0.0055 | - | - |
| an | nose_chin_delta | 0.1274 | 0.1228 | -0.0046 | - | - |
| an | neck_depth_ratio | 0.7652 | 0.7707 | +0.0055 | - | - |
| organizer | head_aspect | 2.0156 | 2.0906 | +0.0750 | <=2.02 | - |
| organizer | face_lw | 1.1330 | 1.1023 | -0.0307 | - | - |
| organizer | eye_width_ratio | 0.1980 | 0.2035 | +0.0055 | - | - |
| organizer | jaw_cheek_ratio | 0.9041 | 0.9100 | +0.0059 | - | - |
| organizer | forehead_visible | 0.5493 | 0.5627 | +0.0134 | - | - |
| organizer | nose_chin_delta | 0.0919 | 0.0853 | -0.0066 | - | - |
| organizer | neck_depth_ratio | 0.8139 | 0.8365 | +0.0226 | - | - |

### 结论

1. **rui**：`head_aspect 2.051 -> 1.981`（-3.4%）接近但未达 1.95；`face_lw` 达标。**第二轮**：`headAspect -0.45 -> -0.40`、`headScaleVert -0.12 -> -0.14`。
2. **mei**：`head_aspect 2.346 -> 2.221`（达标边缘）；但 **`eye_width_ratio 0.2015 -> 0.1985` 反而变小** —— 眼睛仍偏小。**第二轮**：`eyeSize 0.65 -> 0.80`、`eyes/*-eye-scale` 增益 `1.35 -> 1.6`；`headAspect -0.48 -> -0.45` 稳住头高。
3. **old2090**：`jaw_cheek 0.908 -> 0.905`（目标 <=0.885 未达）；`nose_chin_delta 0.130 -> 0.139`（更后缩）；`neck_depth 0.729 -> 0.741`。**第二轮**：`jawWidth -0.25 -> -0.35`（gain 1.2->1.5）、`neck-double-incr 0.1 -> 0.05`、`jawLength 0.20 -> 0.30`；并核查 new MHC 拟合颈部（`old2090-conform-diff.md`）。
4. **an**：`head_aspect 1.778`、`jaw_cheek 0.906` 均在区间；`eye_width 0.198` 略低于参考，可 `eyeSize -0.1 -> 0.0`。
5. **organizer**：`eyes 0.198 -> 0.204` 改善；但 `head_aspect 2.016 -> 2.091`（脸变窄更显长）。**第二轮**：`headAspect 0.10 -> 0.16` 或加 `headScaleVert -0.06`。

> 说明：`cast_proportions.py` 以 MHC 渲染的 MediaPipe 点为基准，与 D19 同口径；目标值来自 D19 文档。

## 7. 复核命令

```bash
~/.local/share/hunyuan3d/.venv/bin/python Tools/qa/cast_proportions.py
~/.local/share/hunyuan3d/.venv/bin/python Tools/qa/dashboard.py
```
