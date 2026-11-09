# Claude 交接：2026-11-02 傍晚 → 晚上继续

用户说“额度快到了，整理一下晚上再做”。下面是当前真实状态和晚上的起点。未提交，未推送。Codex 额度已用完；DeepSeek 上次活动是 10-28。

## 今天完成并验证的

- **NPC 对话（C17）通过**：
  - 原生测试和 mock 测试都 PASS；和 Paul 在线 5 轮全部完成（`FIVE_TURNS_COMPLETE_REQUIRES_LANGUAGE_REVIEW`），首字 0.5–0.9 秒。
  - C++ 改动：元数据缺失时保留口语回答；用词不匹配时丢掉该词，不再判失败；建议回复 1–3 条都接受；场景预算改为 80k；回退状态里写明原因。
  - 待做：人工审读 5 轮内容（`Saved/NpcTests/online-*/online-result.json`），四人试听。
- **物理（C16）PIE 通过**：`WQ_OFFLINE_PHYSICS_PIE_PASS`，覆盖拿起、放下、扔出、推、门铰链。注意：每次重建场景后要先跑 `python3 Tools/setup_offline_physics.py`。
- **C15 指标已采集**：`Saved/Round6/c15-experience.json`，还没生成报告、没看结果。
- **封闭客厅**：
  - 墙体位置 bug 已修（墙块轴心在底部，之前整面墙浮高了半个墙高，墙脚露出一道“暗带”）。
  - 家具 11 件，窗外景板（`spawn_window_views`），一家四口按坐姿放好。
  - 姿势之前失败的原因：C++ 的 `EvaluatePreviewPose` 只放行 `/Game/Memory/Characters` 下的角色。已加上 `/Game/MetaHumans`。
  - 失败的人物不再堆在原点（`textbook_character_staging.py`）。
- **人物**：
  - 组装管线打通：`char_assemble.py` 会先请求云端纹理源。
  - 一家四口 paul/maria/jason/jack 和 v2 主角 `me2026s_v2`、`lins_v2` 都已组装，6 人发色已上（`Tools/char_finish.py`，参数名是 hairMelanin/hairRedness）。
  - 加了用户要求：女主是用户的大学女友（见 memory）。
- **烟大世界**：
  - 资料：`Docs/world/ytu-campus-reference.md`（28 张参考照片在 `SourceArt/Reference/ytu/`，已 gitignore）。
  - 计划：`Docs/tasks/round7-ytu-memory-world.md`，含记忆碎片的时空穿梭设计，以及 22 个情景对应的校园地点（待用户确认）。
  - OSM 数据 → `Content/Data/world/ytu_north_osm.json`；Blender 体块 `Tools/props/ytu_campus_blocks.py`（171 栋楼加地面）。
  - **`L_YTU_Campus` 已导入 UE**（`Tools/ytu_campus_import.py`，172 个网格），**还没拍图验收**。

## 已知问题（晚上按这个顺序做）

1. **校园验收**：给 `L_YTU_Campus` 拍图（南门出生点人眼高度和鸟瞰），确认朝向和位置正确（Blender→UE 是 (x, -y)），检查材质。
2. **主角像不像**：
   - 组装版皮肤偏黑：u 已设 0.10/0.06，仍然暗。怀疑云端纹理源覆盖了肤色，查 `request_texture_sources` 和皮肤参数。
   - 审图相机只渲染发片：改用 PIE 世界截图（`WordQuestRenderDiagnostics.request_world_capture`）审人物。
   - 脸型离参考图还远，继续雕刻并增加关键点组。
3. **客厅**：
   - 天花板和窗墙太暗，Lumen 反弹弱；按 `review-c19-claude.md` 开启 HWRT 和自动曝光。
   - 窗外依旧像夜晚：检查 `WINDOW_0_view` 是否生成，以及 HDRI 亮度。
   - 一家人穿的是默认 T 恤和短裤，要按人设换衣服。
4. 生成 C15 报告：`python3 Tools/qa/c15_experience_report.py`；把步频和曝光修正落到 C++。
5. 烟大第二阶段：按照片精修地标，顺序是钟楼 → 烟雨亭和玉带桥 → 承先图书馆 → 七餐 → 校门；然后做记忆重建效果 `MPC_MemoryReveal`。
6. 更新进度页 https://claude.ai/artifact/SzANFYSYqTL9DdjapjbAiB（模板在 scratchpad `report/template.html`，丢失就重写）。

## 运行方式备忘

- UE：`/Volumes/Games/Game-Engine/Epic Games/UE_5.8/.../UnrealEditor`，一律走 `Tools/run_ue_serial.sh`。
- 编译：`Tools/run_ue_serial.sh '<engine>/Engine/Build/BatchFiles/Mac/Build.sh' WordQuestUEEditor Mac Development -project=... -NoPCH -MaxParallelActions=2`
- Xcode 27.2 需要单独装 Metal Toolchain（已装）。
- 场景：`python3 Tools/build_textbook_scene.py --unit 1 --section section_a` → `setup_offline_physics.py` → `room_review.py u01a_s1`。
- 人物：`CHARV2_MODE=build` → `char_autorig.py` → `char_assemble.py`（`ASSEMBLE_PATH=/Game/MetaHumans/v2`）→ `char_finish.py`。
