# D26 场景质检自动化（需求 / 接口 / 测试）

> 第九轮 · 2026-10-23 · 任务书 D26
> 为 Claude 的人工评审先做机器筛查：把 18 篇课文的 checker 报告与 4K 截图汇总成一张 dashboard。

## 1. 需求

1. 读 Codex 的 checker 报告 `Docs/qa/textbook-scenes-unitNN.json` 与它引用的 4K 截图，按 set 统计：
   - 占位物数量（`placeholders`，含人物）、`needs_final_asset` 数量；
   - 贴花数是否 ≥ 10（`decals n/10`，无记录按 0）；
   - 曝光：平均亮度、过暗（<16）与过曝（>240）像素占比；
   - 大面积纯色区域：量化后最大同色 bin 占比（疑似纯色材质/窗外纯色）；
   - 画面空旷度：边缘像素占比（Sobel 简化实现），越低越空。
2. 输出 `Docs/qa/scenes-dashboard.md`：18 篇课文汇总 + 每个 set 一行（关卡/文章/set、质量、占位、缺资产、贴花、曝光、纯色、空旷度、缩略图链接）。
3. 报告缺失（如尚未出 unit02–06）不伪造：表里标 `N/A (report missing)`，并在汇总里说明。
4. 阈值（可调常量）：过暗占比 > 0.35 FAIL；过曝 > 0.25 FAIL；纯色占比 > 0.45 WARN；边缘占比 < 0.03 = 空旷；贴花 < 10 WARN。
5. 生成 `Docs/qa/scenes-audit.json` 机器可读结果。

## 2. 接口

```bash
python3 Tools/qa/scene_audit.py                 # 读全部报告，写 dashboard + json
python3 Tools/qa/scene_audit.py --unit 1        # 只跑某单元
python3 Tools/qa/scene_audit.py --project DIR   # 指定工程根
```

- 输入：`Docs/qa/textbook-scenes-unit*.json`（字段见 checker 报告：`resolution`、`scenes[].{scene, props, needs_final_asset, placeholders, issues, quality, shots[]}`）；截图相对工程根。
- 输出：
  - `Docs/qa/scenes-dashboard.md`
  - `Docs/qa/scenes-audit.json`：`{units:[{unit, scenes:[{scene, metrics:{...}, flags:[...]}]}], totals:{...}}`
- 关键函数（可被测试 import）：`image_metrics(path) -> dict`（dark_ratio, bright_ratio, mean_luma, flat_ratio, edge_ratio, size）、`parse_decals(issues) -> int`、`audit_project(project) -> dict`、`render_dashboard(audit) -> str`。
- 测试（`Tools/qa/tests/test_scene_audit.py`，PIL 合成图）：
  1. 全黑图 → `dark_ratio≈1`、`mean_luma≈0`；全白图 → `bright_ratio≈1`；
  2. 纯色图 → `flat_ratio` 接近 1；棋盘/噪声图 → `edge_ratio` 高；
  3. `parse_decals("decals 7/10")==7`、无匹配=0；
  4. 合成 checker 报告 + 2 张截图 → dashboard 行数、flags、N/A 处理正确。

## 3. 真实数据验收

- 若 6 份报告齐全：dashboard 覆盖 18 篇课文 / 全部 set；汇总列出口径与待人工复核项。
- 若仅有部分报告：`--unit N` 可用，dashboard 明确标注缺失。
