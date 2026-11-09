# Codex 任务书 · 第二轮（Claude 下发，2026-10-22）

目录所有权和 UE 规则不变，见 `codex-character-engine.md` 和 `ue-run-rules.md`。所有 UE 进程和编译都必须走 `Tools/run_ue_serial.sh`。不写 `Content/Characters/**`；导入产物放在 `/Game/Blueprints/Characters/Imported/<id>`（与你上一轮相同）。

## 0. 发丝条纹问题已找到原因（Claude 已修）

你在 C3 报的“满屏拉伸条纹”原因是：我导出的 Alembic 每个点的 `radius` 都是 Blender 默认值 1.0。UE 把它读成宽度，于是每根发丝宽 1～2 米。

我已把 radius 改为发丝半宽：头发 0.03–0.045 mm，从发根到发尖逐渐变细；眉毛 0.04 mm。7 份发丝和 2 份眉毛正在重新导出，路径不变：`../word-quest-game/docs/hero-pipeline/export/<id>/*.abc`。Alembic 数据本身已经检查过：没有 NaN，包围盒在头部，同一根发丝内的相邻点距离 ≤ 1.2 cm，每根 16 个点。

`groom_guide`、`groom_root_uv` 等属性仍然没有写入，因为 Blender 的 Alembic 导出器写不了。导入时请继续让 UE 自动生成 guide（10%）。如果绑定需要 root UV，请在 UE 端用绑定资产生成。

## C3 续：重新导入并完成绑定（最优先）

1. 等 STATUS 里 Claude 一节出现“Groom 重新导出完成”后，重新导入 9 份 Groom。
   - 确认导入后的发丝宽度大约是 0.07 mm。如果 importer 把宽度当半径，再按需加 width override。
2. 绑定到 MHC 预览体的面部或头部网格。上次 180 秒超时，请：
   - 先用男主跑通一份，记录耗时。
   - 必要时把 binding 的 strands LOD 数量降下来先通过，再逐步加回。
3. 带 Groom 重新渲染 7 个角色的对比图，然后跑 `Tools/qa/report.py <id>` 和 `Tools/qa/dashboard.py`。
4. 远景发片 LOD（Cards）等发丝显示正常后再生成。

## C4 动画

- 按 `Docs/design/animation-spec.md` 和 `Content/Data/anim/anim_manifest.csv`，把现有动画（UE 自带的 Mannequin 动画，以及 `word-quest-game` 里的 Rocketbox / MPFB 动作）用 IK Retargeter 重定向到 MetaHuman 骨骼。
- 先做 idle、walk、sit 三个，在 `L_CharacterLookdev` 里放一个 `BP_me2026` 预览，验证能播放。
- MetaHuman 正式骨骼要等用户登录 Epic 账号后做 auto-rig。在那之前用 MHC 预览体或 archetype 骨骼验证流程，不要伪造正式骨骼。

## C6 网页版

- `word-quest-game/src/features/memory/characters.ts`：两位主角的服装和发型按三视图改，规格见 `Docs/characters/me2026-outfit.md`、`lin-outfit.md`、`me2026-hair.md`、`lin-hair.md`。
- 跑 `npm test` 和构建，结果写进 STATUS。

## 汇报

每完成一项，在 STATUS 的 Codex 一节追加：做了什么、怎么验证的、还缺什么。不需要等我确认，按顺序连续推进。
