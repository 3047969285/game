# QA 工具（D3）

> DeepSeek Harness · 2026-10-21 · 任务书 [../tasks/deepseek-data-qa.md](../tasks/deepseek-data-qa.md)
> Python 3.11，使用 `~/.local/share/hunyuan3d/.venv`（已装 mediapipe 0.10.21 / numpy / PIL / scipy / pytest）。

## 1. 关键点对比

```bash
V=~/.local/share/hunyuan3d/.venv/bin/python
$V Tools/qa/compare_landmarks.py <参考图.png> <渲染图.png> --out /tmp/overlay.png
```

- MediaPipe FaceMesh 468 点；渲染侧做**相似变换**（缩放+旋转+平移，Umeyama）对齐到参考图。
- 输出 JSON：`mean / max / p95` 像素误差，以及 `left_eye / right_eye / brows / nose / mouth / contour` 分区误差。
- 判定阈值见 `Docs/character-production-plan.md` §4：正面 ≤3 px，3/4 视角 ≤8 px。

## 2. 剪影对比

```bash
$V Tools/qa/compare_silhouette.py <参考.png> <渲染.png> --region face --out /tmp/face_diff.png
$V Tools/qa/compare_silhouette.py <参考.png> <渲染.png> --region hair --out /tmp/hair_diff.png
```

- 前景：白底（任意通道 < 244 视为前景）；`face` 会减去头发区域。
- 头发：暗色 + 低饱和；男女发色不同，用 `--hair-vmax / --hair-smax` 调整（男主黑发 100/200，女主酒红发 130/200）。
- 输出 IoU；热图颜色：绿=重合，红=参考有渲染无，蓝=渲染有参考无。
- 判定：侧面脸部 IoU ≥0.95，头发 IoU ≥0.85。

## 3. 验收报告

```bash
$V Tools/qa/report.py me2026      # 或 lin
```

- 渲染来源：`Saved/Compare/<id>/{front,q34,side,back,closeup}.png`（Codex 对比相机输出，文件名固定）。
- 参考图（按 Claude 2026-10-21 第二轮指令）：
  - 男主 me2026：`front=lian1.png`、`q34=lian3.png`、`side=lian2.png`、`back=male_sheet.png`、`closeup=male_sheet.png`
  - 女主 lin：`front=lian5.png`、`q34=lian7.png`、`side=lian6.png`、`back=female_sheet.png`、`closeup=female_sheet.png`（`lian8.png` 也是侧面，可作补充）
  - 男主 me2026：`front=lian1.png`、`q34=lian3.png`、`side=lian2.png`（`lian4.png` 也是侧面）、`back=male_sheet.png`、`closeup=male_sheet.png`
- 渲染文件名约定：`Saved/Compare/<id>/{front,q34,side,back,closeup}.png`（Codex 渲染脚本遵守同一约定）。
- 输出：`Docs/qa/<id>-report.md`（PASS/FAIL 表 + 并排图 + 差异热图 + 人工检查项）。
- 没有渲染时报告为 N/A，不会伪造数据。

## 4. 参考头发掩码（D7）

```bash
$V Tools/qa/ref_hair_masks.py
```

- 输出到 `Docs/qa/ref_masks/`：`<id>_<view>.png`（白=头发，黑=其它）+ `_overlay.png`（原图红色叠加）。
- 男主：`me2026_{front,q34,side}.png`；女主：`lin_{front,q34,side,q34_supplement}.png`；全身三视图：`{me2026,lin}_sheet_{front,side,back}.png`。
- 作用：Groom 验收目标；用 `compare_silhouette.py --region hair`（女主 `--hair-vmax 150`）对比，IoU ≥0.85。
- 注意：`*_sheet_*` 受参考图轮廓光影响（亮部发丝缺失），置信度低于 `lian*` 单视图掩码。

## 5. 测试

```bash
cd 手机游戏/word-quest-ue
~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests -q
```

- `test_qa_metrics.py`：合成数据验证相似变换、分区误差、前景/头发掩码、IoU、差异热图颜色、并排图与渲染发现、阈值常量。
- `test_vocabulary_csv.py`：D2 词汇 CSV 行数/字段/单元分布。
- `test_character_docs.py`：D1 配角设定集结构与字段。
- `test_measure_sheet.py`：D6 三视图切分/像素→厘米/横截线宽度/颜色采样。
- `test_ref_hair_masks.py`：D7 头发掩码生成与真实掩码存在性。

## 已知限制

- 剪影 IoU 要求参考图与渲染图**构图一致**（同一机位、同焦距、白底）；构图不一致时数值只作参考。
- MediaPipe 对遮挡（手、头发挡脸）敏感；检测不到脸时会退出码 2。
- 头发掩码对黑发/深红发有效；浅色发（银白）需要调大 `--hair-vmax`。
