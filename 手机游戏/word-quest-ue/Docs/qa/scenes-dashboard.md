# 场景质检 Dashboard（D26）

> 生成：`python3 Tools/qa/scene_audit.py` · 2026-10-23T05:47:03+00:00
> 来源：Codex checker 报告 `Docs/qa/textbook-scenes-unitNN.json` + 4K 截图；机器筛查，仅供 Claude 人工评审参考。

## 1. 阈值

- 过暗：dark_ratio > 0.35；过曝：bright_ratio > 0.25
- 纯色面积：flat_ratio > 0.45；空旷：edge_ratio < 0.03
- 贴花：< 10/10；占位物/缺资产 > 0 都会标出

## 2. 总览

| 项 | 值 |
|----|----|
| 有报告的单元 | 1 / 6 |
| set 总数 | 22 |
| checker FAIL | 22 |
| 缺最终资产（合计） | 116 |
| 占位物（合计） | 163 |
| 截图 | 33 |

## 3. 每篇课文（18 关卡）

| 单元/文章 | set 数 | FAIL | 缺资产 | 占位 | 截图 | 状态 |
|-----------|-------|------|--------|------|------|------|
| unit01/section_a | 8 | 8 | 37 | 78 | 18 | 待修 |
| unit01/section_b | 8 | 8 | 59 | 56 | 8 | 待修 |
| unit01/section_c | 6 | 6 | 20 | 29 | 7 | 待修 |

## 4. 每个 set

| set | 文章 | quality | 占位 | 缺资产 | 贴花 | 亮度 | 过暗 | 过曝 | 纯色 | 边缘(空旷) | flags | 缩略图 |
|-----|------|---------|------|--------|------|------|------|------|------|-----------|-------|--------|
| u01a_s1 | unit01/section_a | FAIL | 6 | 2 | 0 | 78.367 | 0.206 | 0.000 | 0.256 | 0.018 | needs_final_asset:2 placeholders:6 decals:0/10 empty:0.018 checker:FAIL | [图](Docs/qa/scenes/u01a_s1/wide.png) |
| u01a_s2 | unit01/section_a | FAIL | 5 | 1 | 0 | 79.950 | 0.307 | 0.000 | 0.299 | 0.011 | needs_final_asset:1 placeholders:5 decals:0/10 empty:0.0115 checker:FAIL | [图](Docs/qa/scenes/u01a_s2/wide.png) |
| u01a_s3 | unit01/section_a | FAIL | 7 | 1 | 0 | 64.000 | 0.213 | 0.000 | 0.274 | 0.002 | needs_final_asset:1 placeholders:7 decals:0/10 empty:0.0022 checker:FAIL | [图](Docs/qa/scenes/u01a_s3/wide.png) |
| u01a_s4 | unit01/section_a | FAIL | 10 | 4 | 0 | 113.900 | 0.247 | 0.025 | 0.244 | 0.030 | needs_final_asset:4 placeholders:10 decals:0/10 checker:FAIL | [图](Docs/qa/scenes/u01a_s4/library.png) |
| u01a_s5 | unit01/section_a | FAIL | 20 | 13 | 0 | 152.500 | 0.113 | 0.000 | 0.181 | 0.003 | needs_final_asset:13 placeholders:20 decals:0/10 empty:0.0034 checker:FAIL | [图](Docs/qa/scenes/u01a_s5/door.png) |
| u01a_s6 | unit01/section_a | FAIL | 10 | 8 | 0 | 66.900 | 0.470 | 0.037 | 0.462 | 0.046 | needs_final_asset:8 placeholders:10 decals:0/10 too_dark:0.47 flat_area:0.4615 checker:FAIL | [图](Docs/qa/scenes/u01a_s6/orbit.png) |
| u01a_s7 | unit01/section_a | FAIL | 14 | 6 | 0 | 79.033 | 0.443 | 0.042 | 0.424 | 0.010 | needs_final_asset:6 placeholders:14 decals:0/10 too_dark:0.4427 empty:0.0104 checker:FAIL | [图](Docs/qa/scenes/u01a_s7/pan.png) |
| u01a_s8 | unit01/section_a | FAIL | 6 | 2 | 0 | 83.750 | 0.417 | 0.002 | 0.404 | 0.024 | needs_final_asset:2 placeholders:6 decals:0/10 too_dark:0.417 empty:0.0243 checker:FAIL | [图](Docs/qa/scenes/u01a_s8/wide.png) |
| u01b_s1 | unit01/section_b | FAIL | 5 | 5 | 0 | 50.900 | 0.446 | 0.000 | 0.435 | 0.004 | needs_final_asset:5 placeholders:5 decals:0/10 too_dark:0.446 empty:0.0037 checker:FAIL | [图](Docs/qa/scenes/u01b_s1/city.png) |
| u01b_s2 | unit01/section_b | FAIL | 9 | 9 | 0 | 130.100 | 0.114 | 0.016 | 0.110 | 0.056 | needs_final_asset:9 placeholders:9 decals:0/10 checker:FAIL | [图](Docs/qa/scenes/u01b_s2/front.png) |
| u01b_s3 | unit01/section_b | FAIL | 7 | 5 | 0 | 168.800 | 0.052 | 0.000 | 0.222 | 0.006 | needs_final_asset:5 placeholders:7 decals:0/10 empty:0.0064 checker:FAIL | [图](Docs/qa/scenes/u01b_s3/room.png) |
| u01b_s4 | unit01/section_b | FAIL | 6 | 8 | 0 | 69.800 | 0.561 | 0.033 | 0.529 | 0.025 | needs_final_asset:8 placeholders:6 decals:0/10 too_dark:0.561 flat_area:0.529 empty:0.0253 checker:FAIL | [图](Docs/qa/scenes/u01b_s4/home.png) |
| u01b_s5 | unit01/section_b | FAIL | 7 | 7 | 0 | 67.100 | 0.540 | 0.000 | 0.531 | 0.020 | needs_final_asset:7 placeholders:7 decals:0/10 too_dark:0.54 flat_area:0.531 empty:0.0202 checker:FAIL | [图](Docs/qa/scenes/u01b_s5/office.png) |
| u01b_s6 | unit01/section_b | FAIL | 7 | 7 | 0 | 120.300 | 0.219 | 0.069 | 0.199 | 0.027 | needs_final_asset:7 placeholders:7 decals:0/10 empty:0.0269 checker:FAIL | [图](Docs/qa/scenes/u01b_s6/both.png) |
| u01b_s7 | unit01/section_b | FAIL | 7 | 9 | 0 | 126.500 | 0.099 | 0.053 | 0.085 | 0.026 | needs_final_asset:9 placeholders:7 decals:0/10 empty:0.0258 checker:FAIL | [图](Docs/qa/scenes/u01b_s7/street.png) |
| u01b_s8 | unit01/section_b | FAIL | 8 | 9 | 0 | 54.000 | 0.266 | 0.008 | 0.227 | 0.003 | needs_final_asset:9 placeholders:8 decals:0/10 empty:0.0033 checker:FAIL | [图](Docs/qa/scenes/u01b_s8/rise.png) |
| u01c_s1 | unit01/section_c | FAIL | 5 | 3 | 0 | 108.550 | 0.028 | 0.000 | 0.124 | 0.002 | needs_final_asset:3 placeholders:5 decals:0/10 empty:0.0024 checker:FAIL | [图](Docs/qa/scenes/u01c_s1/stall.png) |
| u01c_s2 | unit01/section_c | FAIL | 7 | 5 | 0 | 110.900 | 0.348 | 0.012 | 0.321 | 0.040 | needs_final_asset:5 placeholders:7 decals:0/10 checker:FAIL | [图](Docs/qa/scenes/u01c_s2/counter.png) |
| u01c_s3 | unit01/section_c | FAIL | 7 | 6 | 0 | 82.800 | 0.227 | 0.002 | 0.190 | 0.045 | needs_final_asset:6 placeholders:7 decals:0/10 checker:FAIL | [图](Docs/qa/scenes/u01c_s3/street.png) |
| u01c_s4 | unit01/section_c | FAIL | 4 | 2 | 0 | 60.600 | 0.415 | 0.000 | 0.375 | 0.049 | needs_final_asset:2 placeholders:4 decals:0/10 too_dark:0.415 checker:FAIL | [图](Docs/qa/scenes/u01c_s4/table.png) |
| u01c_s5 | unit01/section_c | FAIL | 4 | 3 | 0 | 44.700 | 0.537 | 0.000 | 0.478 | 0.006 | needs_final_asset:3 placeholders:4 decals:0/10 too_dark:0.537 flat_area:0.478 empty:0.0057 checker:FAIL | [图](Docs/qa/scenes/u01c_s5/mall.png) |
| u01c_s6 | unit01/section_c | FAIL | 2 | 1 | 0 | 80.600 | 0.405 | 0.001 | 0.377 | 0.008 | needs_final_asset:1 placeholders:2 decals:0/10 too_dark:0.405 empty:0.0076 checker:FAIL | [图](Docs/qa/scenes/u01c_s6/desk.png) |

## 5. 复现

```bash
python3 Tools/qa/scene_audit.py
~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests/test_scene_audit.py -q
```
