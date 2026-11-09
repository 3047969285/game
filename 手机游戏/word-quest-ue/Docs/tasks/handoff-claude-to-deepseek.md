# 交接：Claude → DeepSeek（2026-10-23 15:25）

用户指示：Claude 不再亲自执行，任务细节全部交给 DeepSeek。下面是当前进行中的工作、正在后台跑的流程，以及接下来要做的事，按优先级排列。

所有 UE 操作走 `Tools/run_ue_serial.sh`（锁）。这台机器只有 16 GB 内存：**UE 和 Blender 重活不要同时跑**，否则 UE 会被系统杀掉（MetaHuman 组装已经因此失败两次）。

后台流程的日志和标记都在 Claude 的 scratchpad：
`/private/tmp/claude-501/-Users-shoudaodefengge---/4ef3cf31-570b-4600-aeab-846b83c48bfa/scratchpad/`
后面用 `$S` 指代这个目录。

---

## P0 第 1 单元展示视频，用户要求 17:00 前看到（最紧急）

**正在跑**：`$S/run_fast.sh`，日志 `$S/run_fast.log`，完成标记 `$S/run_fast.done`。它已经脱离会话独立运行，不要重复启动。流程如下：

1. 重建第 1 单元：`python3 Tools/build_textbook_scene.py --unit 1`，15:21 开始。
   - 人物用 MetaHuman 快照，并已摆姿势：脸、眼、牙、头发挂在身体的 head 骨骼上，身体播放 `/Game/Memory/Characters/Poses/A_MH_<pose>`。代码在 `Tools/textbook_character_staging.py` 的 `_attach_head` 和 `_apply_pose`。
   - 结果写到 `Docs/qa/character-staging-unit01.json`，日志里会有 `[staging] people N posed M fails K` 一行。
2. 渲染视频帧：每个关卡（A/B/C）单独开一个 UE 进程，地图通过命令行指定（在 UE 里调 LoadLevel 会崩）。
   - 脚本 `Tools/render_unit_film.py`，每个场景只拍 1 个镜头，镜头和帧数由 `Saved/Film/unit01/plan.json` 决定。
   - 输出到 `Saved/Film/unit01/<a|b|c>NNN_<scene>_<shot>/frame_*.png`。
3. 合成：`Tools/compose_unit_film.py 1`，包括调色（记忆感、2.39:1 黑边、颗粒）、原创旁白、逐词浮现的冷光字幕、记忆转场，再用 `Tools/mux_av.swift` 混入音频。
   - 成片：`Docs/qa/demo/unit01_showcase.mp4`。

**你要做的**：

- 盯 `$S/run_fast.log`。任何一步失败就修，然后重跑对应的一步。可以单独执行：
  ```
  WQ_TEXTBOOK_UNIT=1 FILM_SECTION=section_a UE_LOCK_WHO=deepseek Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" /Game/Memory/Scenes/U01/L_U01_A -ExecutePythonScript="$PWD/Tools/render_unit_film.py" -unattended -nosplash
  ```
  B、C 关卡同理；合成用 `~/.local/share/hunyuan3d/.venv/bin/python Tools/compose_unit_film.py 1`。
- 成片出来后，抽查 10 张以上的帧：
  - 画面不能黑、不能过曝；
  - 人物姿势要对：坐着的人在椅子上，头和身体相连，头发在头上；
  - 字幕清楚、没有乱码；
  - 声音能对上画面。
- 有问题就修，没问题就交给用户（在 STATUS 写上路径并通知 Claude）。
- **视频里不能出现教材原文。** 旁白和字幕全部是 `Tools/film_narration.py` 里的原创台词，因为视频要公开分享。不要换成课文朗读。

已知风险：

- 快照人物的姿势是新加的，还没有在 UE 里看过实际效果。如果头和身体脱节、头发飘在空中，可以先在 `_apply_pose` 里只对坐姿生效，或者退回站姿，以按时交付为先。
- 截图曝光沿用 `Docs/qa/textbook-scenes-unit01.json` 里每个机位校准过的 exposure_bias。

## P1 演示完成后的收尾

1. **Poly Haven 扫描材质导入**：15:17 失败了，原因是 `import_polyhaven.py` 第 308 行少传了参数，Claude 已经修好。重跑 `python3 Tools/import_polyhaven.py --types textures`，再跑 `Tools/make_arch_materials.py` 生成 `MI_Arch_grass`、`sand`、`moon`、`mars` 等。
   - 然后把 `kit_assets.json` 里的 lawn、garden_plot、trail_path、sand_beach、moon_surface、mars_surface 恢复映射。它们的 `pending` 字段里记着原来的 asset 和 materials。
2. **MetaHuman 组装**（`Tools/char_assemble.py`，Optimized + High）：必须在没有 Blender 运行时做，7 个角色逐个跑。组装出的 BP 会被 staging 自动优先使用。
3. **被跳过的精品物件**，脚本都已写好，只差烘焙、导入和映射：window_wall、door、whiteboard、interactive_board、checkout_counter（`Tools/props/hero_*.py`）。
   - 导入用 `HERO_KITS=... Tools/import_hero_props.py`。window_wall 的玻璃需要先运行 `Tools/make_memory_materials.py` 生成 `M_ArchGlass`。
4. 第 2–6 单元的搭建和截图（C11）：`python3 Tools/build_textbook_scene.py --unit N`，然后 `Tools/check_textbook_scene.py --unit N`。
5. 你自己的任务：C13 证据重拍（用视口截图，你已经找到原因）、你 15:16 那次被停掉的 C++ 编译、D24、D28 返工（`Docs/qa/review-d28-claude.md`）。

## 关键工具速查

| 用途 | 文件 |
|------|------|
| 精品物件管线 | `Tools/props/hero_common.py`（`pbr` 程序化材质 + `scan=` 扫描贴图 + `image=` 印刷图案；`finish` 负责烘焙和导出） |
| 物件导入 UE | `Tools/import_hero_props.py`（`M_HeroPBR`、`M_HeroScreen`、外部材质槽） |
| 建筑材质 | `Tools/make_arch_materials.py`（世界对齐，配合 `SM_arch_box` 和 `fit: size`） |
| 姿势 | `Tools/export_mh_body.py` → `Tools/props/pose_author.py` → `Tools/import_poses.py` |
| 视频 | `Tools/film_narration.py` → `Tools/render_unit_film.py` → `Tools/compose_unit_film.py` → `Tools/mux_av.swift` |
| 生词入句 | `Tools/scene_text_words.py` |

不要提交、不要推送，除非用户要求。
