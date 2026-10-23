# 2090 开场公寓

## 产品需求说明书

把现有 acts.json 的 prologue 放回可游玩的实体空间，提供 1.6 米眼高、旧照片册触发物、书桌阅读区和有内容的书架。原文仍由 OpeningFlow 读取；本脚本不增加台词。房间采用已导入 PBR 家具、木地板、抹灰墙、夜景 HDRI、体积雾与局部三点照明。禁止缺失资产时使用默认几何体冒充家具。

当前 stages.json **没有 apartment2090 条目**；8×6.4×3m 布局是独立工程布局，不宣称为原空间恢复。acts 中 old2090 的 pose=lap，搭建器请求现有 sit 动画；姿态有效性须在实机检查。lightRain 属运行时待接条件，静态构建不伪报降雨完成。

## 接口文档

- `python3 Tools/build_opening_apartment.py --plan`：只读输出故事来源和布置尺寸。
- `python3 Tools/build_opening_apartment.py`：经 `run_locked_editor`（UE_LOCK_WHO=codex）运行完整编辑器，生成 `/Game/Maps/L_Opening2090`。
- 只清理 `opening_generated` 标签所属 actor；人工 actor 保留。重复运行仍只生成一组自有布置。
- `opening_camera`：可用于开场的 CameraActor，镜头高度 160cm。
- `opening_camera_point`：备用 TargetPoint，同样为 160cm。
- `opening_memory_anchor`、`memory:prologue`、`destination:2026`：照片册记忆触发物。OpeningFlow 负责注视/输入交互、字幕、雨声雨滴与转换到第一单元。
- GameMode 为 `/Script/WordQuestUE.WordQuestGameMode`，不改项目默认启动地图。
- 老年主角通过 `textbook_character_staging.stage_people` 只读装配。自有生成 actor 标签透传至各身体部件、groom；作者人物资产不修改。
- `Saved/Opening2090/build.json`：最终资源清单、人物装配证据、错误及运行时待接事项。缺资产写 FAIL 并抛错，禁止完成标记。完成仅代表地图保存，日志标记 `WQ_OPENING_BUILT`；状态为 BUILT_REQUIRES_PLAYTEST。

## 测试

本次已执行 `python3 -m py_compile Tools/build_opening_apartment.py`、`python3 Tools/build_opening_apartment.py --plan`，均通过。未启动 UE、未编译、未提交。

合并后主控需要串行实机验证：

1. 执行搭建并检查 JSON、完成标记、level 保存；缺资产时不得出现成功标记。
2. 连续搭建两次，生成 actor 数稳定且手工 actor 保留。
3. CameraActor 的镜头位置为 160cm，出生点胶囊不落在家具/墙内，第三人称移动可通行。
4. 家具贴图无默认棋盘格；夜景窗外不是虚空，截图亮度 40–170，无大面积黑块。
5. 老年人物真实显示且坐姿、发丝正常；照片册距离/注视触发读取原文并进入第一单元。
6. 接入运行时小雨和声音后检查雨在窗外、室内无穿透；当前这一项明确待接。
