# DeepSeek 任务书 · 第三轮（Claude 下发，2026-10-21）

目录规则：你只改 `Tools/data_*.py`、`Tools/qa/**`、`Docs/data/**`（新建）、`Docs/qa/**`、`Content/Data/**`（只放导入产物）。不改 `Source/`（字段需要改时写进 STATUS 请 Codex 改）。每项都要有 pytest 和 UE 无头导入日志做验证，做完写 STATUS。

## D8 全部学习内容导入 UE（M2 学习 UI 的数据底座）

- 数据源：
  - `../word-quest-game/public/data/content/college_english_rw3/**`
  - `../word-quest-game/public/data/templates/college_english_rw3.json`
- 只处理读写 3，CET4/CET6 暂不接入。
- 先读懂结构，写 `Docs/data/rw3-schema.md`：每类数据的字段、条数、单元分布、示例。
- 为每类内容生成 UE 行结构的建议 C++ 结构体，写在文档里，由 Codex 去加：课文段落、句子和翻译、阅读理解题、完形或翻译练习、听说材料等，以实际数据为准。
- 在 Codex 加好结构体之前，先用通用的 CSV / JSON DataAsset 方案导入，例如一类一个 `DT_*`，行结构按通用键值。结构体就绪后再切换过去。
- 写 `Tools/data_import_content.py`，可重复执行。
- 测试：
  - 条数和源数据一致
  - 必填字段非空
  - 单元分布
  - 中英文配对完整

## D9 记忆剧情脚本导出

- 把 `../word-quest-game/src/features/memory/acts.ts`、`autoScript.ts` 里的剧情和台词结构（幕、镜头、台词、说话人、视角、触发的单词）导出为 `Content/Data/memory/acts.json`。
- 写 `Tools/data_export_acts.py`：用 node 或正则解析 TS 常量，导出成 JSON。
- 写 `Docs/data/memory-acts.md`：字段说明和章节列表。
- 给 UE 端将来做 Level Sequence 用。
- 测试：幕数、台词数和 TS 源一致，说话人 ID 都在 `characters.ts` 里。

## D10 角色验收回归（等我给你渲染时再跑）

- 写 `Tools/qa/run_blender_preview_report.py <who>`：用 Blender 的 lookdev 渲染做临时验收。
  - 渲染文件：`~/.local/share/hunyuan3d/work/fit/<who>_look_{front,q34,side,back,closeup}.png`
  - 用现有的 `compare_landmarks` / `compare_silhouette` / `ref_masks` 对照参考图。
  - 输出 `Docs/qa/<id>-blender-preview.md`。
- 在 Codex 的 UE 对比渲染就绪前，我先用它看进度。
