# 配角第二轮调参（可直接粘贴到 build_cast.py）

> 依据：D22 复测（`Docs/qa/cast-tuning.md` 第 6 节）+ 各角色 `*-conform-diff.md`。
> 只改 CAST 的 face/gains/age_targets 行；MAP 新增项已在上一轮加入（headScaleVert、neckWidth）。
> 修改后重建 5 人 → 重渲染 → 跑 `cast_proportions.py` / `dashboard.py` 复测。

## rui（head_aspect 1.981，目标 ≤1.95）
```python
# face 内
"headAspect":     -0.45 → -0.40
"headScaleVert":  -0.12 → -0.14
# gains 保持 dict(headAspect=0.8, foreheadHeight=0.85)
```

## mei（eye_width 0.1985，目标 ≥0.212；head_aspect 2.221 已达标边缘）
```python
# face 内
"eyeSize":        0.65 → 0.80
"headAspect":    -0.48 → -0.45
# gains
gains=dict(eyeSize=1.35 → 1.60)
```

## old2090（jaw_cheek 0.905，目标 ≤0.885；nose_chin_delta 0.139，目标 ≤0.115）
```python
# face 内
"jawWidth":   -0.25 → -0.35
"jawLength":   0.20 → 0.30
"neckWidth":  -0.15 → -0.22
# gains
gains=dict(jawWidth=1.2 → 1.5, jawLength=1.2)
# age_targets
"neck-double-incr": 0.10 → 0.05
```

## organizer（head_aspect 2.091，目标 ≤2.02）
```python
# face 内
"headAspect":  0.10 → 0.16     # 略放宽，降低“显长”
# 可选：增加 "headScaleVert": -0.06
```

## an（均在区间；eye_width 0.198 略低）
```python
"eyeSize": -0.10 → 0.00
```

## 复测判据

| 角色 | 指标 | 目标 |
|------|------|------|
| rui | head_aspect | ≤1.95 |
| mei | eye_width_ratio | ≥0.212 |
| old2090 | jaw_cheek_ratio / nose_chin_delta | ≤0.885 / ≤0.115 |
| organizer | head_aspect | ≤2.02 |
| an | eye_width_ratio | ≥0.20 |
