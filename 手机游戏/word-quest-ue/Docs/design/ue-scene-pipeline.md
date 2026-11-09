# UE 场景管线迁移方案（读写 3 · 记忆舞台）

> 2026-10-22 · DeepSeek
> 目标：把 Web（Three.js）里的 18 篇「回忆舞台」迁到 **UE 5.8**，用 Nanite / Lumen / Virtual Shadow / Sequencer / UMG 做到
> "高保真、科技记忆风、60fps"；**不是**在浏览器里追求《地平线》级写实。
> 现状：UE 里已有 MetaHuman 角色、Groom、服装、6 个单元的 RW3 地标网格（`Content/RW3/unit01–06`）、
> `L_Main`、Nanite/Lumen/VSM 配置；Web 里有 18 个舞台 + 脚本 + 交互逻辑。

## 1. 目标与非目标

| 要做 | 不做 |
|---|---|
| PC 优先（1440p，RTX 3060 级 60fps） | 手机/浏览器同画质 |
| Nanite 场景 + Lumen GI + VSM | WebGL/Three.js 里假装 3A |
| Sequencer 驱动文章演绎、角色表演、镜头 | 继续用代码拼 primitive 盒子当最终美术 |
| 元人类 + Groom + 服装 + 动画 | 重新捏 7 个角色 |
| 每篇一个 Level Instance / DataAsset，18 篇可批量生成 | 手摆 18 个独立关卡（维护不了） |

## 2. 现有可复用资产（盘点）

### UE 侧（`word-quest-ue`）
- 角色：`/Game/Characters/<id>/MHC_<id>`（7 个 MetaHuman），`docs/hero-pipeline/export/<id>/` 的 FBX / ABC / PosedDNA。
- Groom：`*_groom.abc`、`*_brows.abc`（已修 radius）。
- 服装：`male_outfit.fbx`、`female_outfit.fbx`（静态，待蒙皮/Cloth）。
- 场景地标：`Content/RW3/unit01–06/unitXX/StaticMeshes/unitXX.uasset` + `Materials/`（6 个单元地标，已导入，`Tools/import_rw3_models.py` 已摆进 `L_Main`）。
- 地图：`L_Main`、`L_CharacterLookdev`；渲染设置：Nanite 开、Lumen 开、VSM 开、AutoExposure/MotionBlur 关（可按场景覆盖）。
- 数据：`Content/Data/memory/acts.json`（剧情/字幕数据，可转 UE DataAsset/DataTable）。
- 工具：`Tools/run_ue_serial.sh`（UE 锁）、`char_*`、`ue_render_compare.py`。

### Web 侧（`word-quest-game`，作为**数据与设计源**）
- 18 个手写舞台：`src/features/memory/stages/*.ts`（targets / slots / shots / environment / animate）。
- 18 个脚本：`scripts/u0*.ts` + `autoScript`（文章切幕、断片、POV、文字/语音节拍）。
- 角色表：`characters.ts`；物件表：`memoryObjects.ts`；文字/字幕：`acts.ts`。
- 资产：`public/models`（21MB，含 unit01.glb / 角色 glb）、`public/data`（单元内容/词表/题目）。
- 交互：触碰/断片/第一人称学习/纸面笔记/HUD/后期（TAA/SSR/Bloom/grade）。

## 3. 目标架构

```
Content/
  Memory/
    Data/                  # DataAsset / DataTable（每篇一份）
      DA_MemoryScene_Unit01A.uasset
      ...
    Stages/                # Level Instance：18 个舞台（同一套模块化资产）
      LI_Stage_Unit01A.umap
    Actors/                # BP_MemoryStage, BP_MemoryPiece, BP_WordObject, BP_MemoryCamera
    UI/                    # WBP_MemoryHUD, WBP_Subtitle, WBP_WordCard, WBP_PaperNote
    Sequencer/             # LS_Unit01A（文章演绎、镜头、灯光事件）
  EnvKits/                 # 模块化场景资产：室内墙/地板/家具/道具/布料/纸张
  Materials/               # 母材质 + 实例（wood/fabric/paper/metal/glass/screen）
Data/Memory/               # JSON 源（由 Web 导出，导入为 DataAsset）
```

### 3.1 数据格式（与 Web 的 `StageDef`/`MemoryScript` 对齐）
UE 端用 **DataAsset（UDataAsset）或 DataTable**，字段与 Web 一一对应，便于自动生成：

| Web | UE 字段 | 说明 |
|---|---|---|
| `stage.targets{name:style}` | `FPieceDef{Id, Style}` | 部件 id / 显形风格（rise/condense/grow/fade） |
| `slots.table/hover/floor` | `FVector` 列表 | 词物件摆放位 |
| `shots[]` | `FCameraShot` | from/to/look/duration/move/fov |
| `environment` | `FEnvironment` | fog/sky/sun/hemi/风/雨 |
| `script.acts[]` | `FActDef` | sentences/cues/build/actorCues/gap/dialog |
| `objects[]` | `FWordObjectDef` | wordId/archetype/transform |
| `actors[]` | `FActorDef` | look/pose/position/rotationY |
| `beats[]` | Sequencer 事件 | narrate/touch/gap/choice/actor/pov/paper/wait/build |

- 生成方式：**Web 端用 Node 脚本导出 JSON**（`stage`/`script` 纯数据部分），UE 端 Python（`Tools/import_memory_scenes.py`）导入为 DataAsset/DataTable。
- 样例：`Content/Data/Memory/scene-schema.sample.json`（U1A 结构）。

### 3.2 运行时
- `AMemoryStage`：根据 DataAsset 生成/加载 Level Instance；管理 Piece 显形、词物件、相机。
- `UMaterializerComponent`：材质溶解（DitherTemporalAA / Custom 深度噪声）+ 光粒 Niagara；每个 Piece 一个 MID，按 Sequencer 事件 `<style>` 播放。
- `AMemoryCameraDirector`：接 Sequencer Camera Cut Track；POV（you/watch/me/paper）切换。
- `UWordObjectComponent`：词物件 archetype → 网格 + 词签 Widget（3D Widget/UMG）；触碰 → 词卡（英文例句/搭配优先）。
- `AMemoryPaper`：UMG 纸面笔记（翻译/填空/提纲）。
- `WBP_MemoryHUD`：英文字幕、极简视角角标、词卡、选择条、断片提示。

### 3.3 美术与光照
- 场景：模块化 EnvKit（墙/地板/门/窗/桌/椅/书架/灯/布/纸/金属），Nanite 静态网格；小型道具（书/杯/纸/工具/线缆）实例化 + HISM。
- 光照：Lumen GI + VSM；每场景 1 个 PostProcessVolume（色温/曝光/ Bloom/颗粒/暗角），1 个主光 + 1 个补光 + 实用光源（灯罩自发光/窗光 RectLight）。
- 体积：Niagara 窗尘 + 光柱（体积雾/光束卡片）；玻璃用折射；金属/木/布用 PBR 贴图。
- 风格：冷色科技记忆（青/蓝 + 少量暖窗光），扫描线/故障只放在 UMG 和后期少量。

### 3.4 角色与动画
- MetaHuman + Groom + 服装；每篇 2–4 个角色。
- 表演：Idle/Read/Write/Listen/Talk/Point 动作库 + Sequencer 关键帧；重点戏（U1A）手 K；后续可接 MetaHuman Animator 从视频生成。
- 口型：文章朗读用 TTS/VO + 简单口型或 Live Link Face（后期）。

## 4. 性能预算（PC 优先）

| 项 | 目标 |
|---|---|
| 分辨率/帧率 | 1440p，60fps；RTX 3060 级 |
| 每场景 Nanite 三角面 | ≤ 20M 可见 |
| 动态光 | 1 主光 + 1 补光 + ≤4 实用光 |
| 后期 | Lumen GI + VSM + Bloom + 轻体积雾 + TAA |
| 内存 | ≤ 4GB 场景资产流送 |
| 加载 | Level Instance 流送，单篇 ≤ 3s |

> 若目标改为「主机/高端 PC 写实」，可开硬件光追/Lumen HWRT、路径追踪预览；但那是另一档预算。

## 5. 迁移阶段（建议）

### P0（1 周）冻结数据
- Web 端导出 18 篇 `stage`/`script` 的 JSON（不含 TS 逻辑，只含数据）。
- UE 端定 DataAsset schema、命名规范、资产目录。
- 性能基线：空场景 L_Main 帧率/显存；锁定 PC 目标。

### P1（3–5 周）垂直切片：U1A《周四的沉默》
- 用 EnvKit 重建 clubRoom；导入/白盒 → 材质/光照；Nanite/Lumen。
- Sequencer 跑通「逐句朗读 → 部件显形 → 断片 → 定格」。
- 三 POV + 第一人称学习 + 纸面笔记 + 极简 HUD。
- 验收：60fps、无大面板、手机不需要。

### P2（4–6 周）管线化 + 18 篇
- `import_memory_scenes.py` 从 JSON 生成 DataAsset/Level Instance 白盒。
- 18 个舞台白盒 → 按场景类别补 EnvKit；6 个 RW3 地标网格接入。
- 自动化测试（Python）：Piece 数、slot 数量、相机、词物件、Sequencer 事件。

### P3（8–12 周）美术与表演
- 资产：EnvKit 精模/PBR 贴图/Decals/植被（Megascans/Quixel 需授权确认，或用自建/CC0）。
- 18 篇逐篇灯光与重点戏；角色表演/口型；音效/VO。
- 后期：体积光、景深、色调、颗粒；UI 科技化。

### P4（2–4 周）性能与打包
- Lumen/VSM 档位、DLSS/FSR、流送、内存、加载时间；打包 Windows。
- 回归测试与对比截图；文档交付。

> 总工期：**1 人技术美术 + 1 人 UE 程序 ≈ 5–8 个月**做到 18 篇接近发行级；只做垂直切片约 1 个月。

## 6. 风险与决策点

1. **资产授权**：Megascans/Quixel 已含在 UE 订阅（需确认当前授权范围）；商用写实资产要买/自制。
2. **美术人力**：程序化 EnvKit 只能到"精致"，要《地平线》级需要美术团队与扫描库，不是代码能补。
3. **MetaHuman 自动绑定**：需用户 Epic 账号登录（已记录）。
4. **平台**：UE 版 PC；手机继续用 Web 版（两套内容同源数据，避免分叉）。
5. **内容版权**：教材原文只在本机导入，UE 包也不得把原文打进发行包。

## 7. 下一步（本次会话可执行）

1. 冻结 `scene-schema.sample.json` + DataAsset 字段（本文件 §3.1）。
2. 写 `Tools/export_memory_scenes.ts`（Web 仓库）导出 18 篇数据。
3. 写 `Tools/import_memory_scenes.py`（UE）生成白盒 Level Instance。
4. 先做 U1A 垂直切片。

## 8. 验收（垂直切片）

- [ ] U1A 在 UE 里 1440p 60fps（RTX 3060 级）
- [ ] 文章逐句朗读与部件显形同步（Sequencer 不漂移）
- [ ] 三种 POV + 触碰/断片/词卡/纸面笔记可用
- [ ] 无 Web 版的大面板；字幕 + 选项 ≤ 屏幕下方 30%
- [ ] 同一套数据可生成第 2 篇白盒（证明管线化）

## 9. P0 进展（2026-10-22）

- Web → JSON 导出：`Content/Data/Memory/scenes.json`（18 篇，630 KB）、`stages.json`（18 个舞台，64 KB）。
- 数据校验：`Tools/validate_memory_scenes.py` → `validation.json`：**18 scenes / 18 stages / 0 errors**（build 引用、slots、shots、acts、objects、actors 全部通过）。
- UE 导入：`Tools/import_memory_scenes.py`（白盒生成，`SCENE` 可单篇；`BUILD_LEVELS=1`）。
- 已用串行锁跑 UE，生成 **18 个白盒关卡**：`/Game/Memory/Whitebox/L_<unitXX_section_x>.umap`。
  - 每个关卡含：命名 piece 白盒、CameraActor（shots）、TargetPoint（slots / wordId / actor id）。
  - 白盒的 piece 位置是**按 target 名近似的规则**（`piece_transform`），不是最终构图；下一步在 U1A 里替换成正式 EnvKit。
- 下一步：U1A（clubRoom）正式资产/Sequencer 垂直切片。

## 10. P1 第一步：U1A 场景（已完成）

- 新关卡：`/Game/Memory/Scenes/L_Unit01A`（`Content/Memory/Scenes/L_Unit01A.umap`）。
- 生成脚本：`Tools/build_unit01a_scene.py`（读 `stages.json` 的 clubRoom 尺寸/机位，建几何、材质、灯光、相机）。
- 自建材质：`/Game/Memory/Materials/M_U01A_{Plaster,Wood,Dark,Cloth,Paper,Leaf}`（BaseColor + Roughness）。
- 场景内容：11×8m 房间（地板/四墙/窗洞/天花板）、长桌+5 椅子、黑板、书架、灯、植物、窗玻璃。
- 灯光：低角度暖阳 DirectionalLight + SkyLight + 窗口 RectLight + 4 点光 + 雾。
- 相机：按 `stage.shots` 生成 CineCameraActor。
- 检查：`Tools/check_unit01a_scene.py` → **43 actors**（32 StaticMesh / 3 CineCamera / 3 灯类 + 雾），已保存。
- 未完成：MetaHuman 角色（工程里暂无 `BP_<id>` 角色蓝图，需直接 spawn MHC 或新建 BP）、Sequencer 文章演绎、UMG HUD、性能实测。

## 11. P1 第二步：MetaHuman 进场（发现引擎限制）

- 新增 `Tools/build_u01a_characters.py`：加载 `/Game/Characters/<id>/MHC_<id>`，`spawn_meta_human_actor(..., True)` 在 L_Unit01A 里放置 5 人（me2026/lin/mei/an/rui），设置位置/朝向并保存。
- 实测：5 人全部 spawn 成功；但保存后关卡 actor 数仍为 **43**（无 MetaHuman）——插件示例明确说明：
  *"The spawned actor will be owned by the subsystem and when its editor window is closed the actor is automatically destroyed. This prevents issues with saving an actor instance that points to transient assets."*
  即 **MHC 预览 actor 按设计不可保存进关卡**。
- 结论：不能把 preview actor 当关卡内容。需要以下之一：
  1. 用 MetaHuman 官方管线生成 **persistent actor/Blueprint**（`BP_<id>`，工程当前缺失）；
  2. 游戏运行时由 **MemorySceneDirector** 从 MHC 资产/已装配 SkeletalMesh 动态 spawn（需要运行时 MetaHuman actor 方案）；
  3. 用已导出的 FBX/DNA 装配成普通 SkeletalMeshActor 放到关卡（姿态/表情需另做）。
- 下一步优先级：先做 (2) 运行时 spawn 或补 (1) BP；在解决前，关卡里用 TargetPoint 标记角色位（已有）。

## 12. P1 第三步：持久角色占位（为 Sequencer 让路）

- 结论确认：`spawn_meta_human_actor(..., bKeepTransient=false)` 也**不能**在关卡里保存 MetaHuman preview actor（子系统持有，退出编辑器销毁）。
- 已改用 **已导入的 Source body 网格**做持久占位：`/Game/Characters/<id>/Source/<male_body|female_body|...>` → `SkeletalMeshActor/StaticMeshActor`，可保存、可做走位/镜头/Sequencer。
- `build_u01a_characters.py` 现输出：L_Unit01A **48 actors**（43 场景 + 5 角色占位：me2026/lin/mei/an/rui）。
- 真正的 MetaHuman 外观需要后续二选一：
  1. **运行时 spawn**（`MemorySceneDirector` 读 MHC/已装配 SkeletalMesh，游戏开始生成，不存关卡）；
  2. 补出持久 `BP_<id>`（MetaHuman 官方管线导出，编辑器操作）。
- 当前占位体只用于构图/机位/Sequencer；材质/脸/发不参与验收。

## 13. P1 第四步：U1A Sequencer（相机 Cut 完成）

- 新增 `Tools/build_u01a_sequence.py`：读 `stages.json` 的 `shots`，创建 `/Game/Memory/Sequencer/LS_Unit01A`。
- 实测：Camera Cut Track **1 条**、Camera Cut Section **3 段**（0–300 / 300–600 / 600–870 帧，30fps），
  3 个相机 binding 全部通过 `set_camera_binding_id` 绑定成功。
- 已验证 asset 存在：`Content/Memory/Sequencer/LS_Unit01A.uasset`；`check_u01a_sequence.py` 可复查。
- 待补：文章句子/字幕事件、部件显形事件、playback range 显式写入（默认显示 0–150，需在序列设置/运行时指定）。

## 14. P1 第五步：极简回忆 HUD（Canvas 版，已编译）

- 在现有 `AWordQuestHUD` 增加 **memory mode**：地图名含 `Unit01` 时不画学习面板，只画：
  - 顶部/底部轻黑边（宽银幕）
  - 左下极淡 `MEMORY` 角标
  - 底部居中英文字幕（自动换行）+ 很淡的中文（0.32 alpha）
  - 右下 `n / N` 进度
- 数据来自 `Content/Data/Memory/scenes.json`：运行时读 `unit01_section_a`，按 beats/acts 顺序展开句子，按词数估算时长。
- 已把 U1A 关卡 WorldSettings 的 GameMode 设为 `WordQuestGameMode`（`Tools/set_u01a_gamemode.py`）。
- 编译：`Build.sh WordQuestUEEditor Mac Development` → **Succeeded**。
- 待做：PIE 截图/试玩验证、词卡/断片/触碰交互、UMG 化（如需更精细排版）。

## 15. P1 第六步：词物件 + 视线词卡（已编译）

- `Tools/build_u01a_words.py`：按 `scenes.json` 的 `script.objects` 在 L_Unit01A 里生成 11 个 `word_<wordId>` StaticMeshActor（基础形状 + U1A 材质，BlockAll 碰撞，标签/`WordObject` tag）。
- HUD（`AWordQuestHUD`）新增：
  - 读 `Content/Data/vocabulary/college_english_rw3.json`（id → word/phonetic/example/meaning）
  - 每帧从玩家视角做 `LineTraceSingleByChannel(ECC_Visibility, 600cm)`，命中 `word_*` 时在右侧显示词卡：**英文词 + 音标 + 英文例句 + 弱化中文义**
  - 记录已触碰词数，右上角 `MEMORY · n`
- 实测：L_Unit01A 现在 **59 actors**（48 场景/角色 + 11 词物件）；`Build.sh WordQuestUEEditor Mac Development` **Succeeded**。
- 待做：PIE 实际验证视线/碰撞/卡片位置，断片选择与记忆匣。

## 16. P1 第七步：E 收集 + PlayerStart + 无头试跑（部分验证）

- HUD：视线命中词物件后，按 **E** 才记入 `MEMORY · n`（不再只是看一眼就收集）；词卡增加 `[E] 记住` 提示。
- `Tools/build_u01a_playerstart.py`：在 clubRoom 的 spawn 位置放 `PlayerStart_Memory`（x=-260, y=260, z=90，yaw=180）。
- 编译：`Build.sh WordQuestUEEditor Mac Development` → **Succeeded**。
- 无头 `-game` 试跑：`L_Unit01A` 成功加载，Game class = `WordQuestGameMode`，世界进入 play；
  但日志里**没有出现 `[memory-hud] begin`**，说明 HUD 在无头 `-game` 下未按预期 BeginPlay（或日志被截断）。
  需要下一轮用 PIE/Automation 或带视口的游戏实例验证 HUD；不能仅凭编译通过就说 HUD 可用。

## 17. P1 第八步：PIE 带视口验证（第一次真实截图）

- 新增 `Tools/smoke_u01a_pie.py`：PIE 开始 → 等 2 秒 → 记录 game world/PlayerController/HUD → `AutomationLibrary.take_high_res_screenshot(1600×900)` → 结束。
- 实测日志：
  - `[memory-hud] begin map=UEDPIE_0_L_Unit01A`
  - `[memory-hud] loaded 25 lines / 130 words from unit01_section_a`
  - `world=L_Unit01A pc=PlayerController_0 hud=WordQuestHUD`
  - 截图：`Saved/Screenshots/u01a_pie.png`（1600×900）
- 为消除第三人称身体穿帮，新增 `AWordQuestMemoryGameMode`（DefaultPawn=ADefaultPawn，HUD=AWordQuestHUD），U1A WorldSettings 已改用它。
- 截图暴露的问题（下一轮修）：
  1. **相机起点/构图不对**：玩家出生点在房间边缘，画面被墙/物件挡满；
  2. 灯光仍偏亮，材质是纯色（L2 未完成）；
  3. 角色占位已移除（Source body 蒙皮/朝向损坏），真正的 MetaHuman 仍未进场；
  4. 字幕可读（深色衬底 + 中文），但位置/字号需再调。

## 18. P1 第九步：PIE 截图复现与已知问题

- 新增 `AWordQuestMemoryGameMode`（DefaultPawn=`ASpectatorPawn`，HUD=`AWordQuestHUD`）；U1A 已切换，默认第三人称身体不再挡镜头。
- `smoke_u01a_pie.py` 能稳定启动 PIE、加载 HUD（25 lines / 130 words）、生成 1600×900 截图；
  但把镜头切到 `cam_00` 失败：Python 的 `PlayerController` 没有 `set_view_target`（API 不存在），
  目前截图仍是 PlayerStart 的默认视角，画面被近处几何/物件挡满，不能作为构图验收。
- 下一步：
  1. 用 C++ 在 MemoryGameMode/PlayerController 里把 ViewTarget 设为关卡里的 CineCameraActor，或用 `take_automation_screenshot_at_camera`；
  2. 再检查房间/桌椅是否按预期在镜头里（当前视角异常，先排查 spawn/camera 变换）；
  3. 再调 Lumen 曝光与材质。
