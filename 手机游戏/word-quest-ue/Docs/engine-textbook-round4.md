# 第四轮：教材世界与沉浸式体验

## 产品需求说明书

2026-10-23：先交付 Unit 1 Text A 完整垂直切片，再扩展到六单元、18 张关卡。保留完整课文、单词与全部练习引用；字幕、词汇和练习进入三维空间，屏幕仅保留无数字的极淡完整度环。视线/移动推进，鼠标、手柄、触屏共用交互语义。转场持续 2–4 秒、允许跳过，包含冷光扫描、粒子和 2090→2026 时间码。人物使用 MHC 预览体或已装配角色，未绑定标记 needs_rig。

画质按 quality-bar.md：扫描 PBR、每 set 至少十处贴花、合理杂物、体积雾与光束、HDRI/天空、真实摄影参数及手动曝光。只映射语义和尺寸适合的本地 CC0 资产；缺失 kit 逐项报告，禁止用不相关物件填充来获得虚假通过。Fab 验证阻塞保持记录。不改 Claude 的场景、练习与设计数据，不提交、不推送。

## 接口文档

- 输入：Content/Data/memory/textbook_scenes/unit01–06.json；全文 Content/Data/textbook/rw3/articles/unitNN.json；既有 exercises 数据。现有 schema 扩展只在搭建器/验证器兼容，不改输入。引用无法解析时启动前报错。
- 最终资产：Content/Data/memory/kit_assets.json；新增派生布景（贴花、杂物、光束）使用固定种子和 textbook_generated 标签，重建仅替换生成 actor。缺失资产输出 Docs/qa/missing-kits.md。
- 运行时：MemoryDirector 维护文章、段落、词汇、练习与转场状态；世界内 actor/component 承载文字和玻璃断片，输入统一为注视/选择/记住/暂停/跳过。屏幕空间 UMG 不再承担字幕和练习。
- 人物：优先装配 BP，MHC 编辑器预览作为未 rig 回退；记录角色 id、来源和 needs_rig，保留作者资产不修改。
- 产物：L_U01_A…L_U06_C；Docs/qa/scenes/<setId>/*.png（3840×2160）；逐单元结构、引用、画质报告；沉浸式 PIE 测试结果。所有 UE 执行/编译通过 run_ue_serial.sh，UE_LOCK_WHO=codex。
- ue_render_compare.py 的 q34 变换保持 (yaw, -pitch, -roll)。

## 测试

1. 纯数据：六单元 schema、完整课文段落、单词与练习引用、未知字段和 kit；错误引用必须失败。确定性生成的贴花/杂物至少十处且重跑一致。
2. 引擎：加锁编译，以成功日志为准；18 张关卡加载；每 set actor/camera/人物、环境和资产审计；重建前后生成 actor 数一致。
3. 垂直切片：Unit 1 Text A 在 PIE 完整播放；字幕生成/消散、0.6 秒词汇注视、记住脉冲、12 种练习断片、错误失真、冻结/恢复、转场/跳过、全文结尾完成；横屏和竖屏证据。
4. 画面：每机位 4K；屏幕 UI 计数（仅一个完整度环），人物来源/needs_rig、缺失 kit、贴花、杂物、光束与曝光记录。截图成功不代表画质 PASS，未达标明确 FAIL。

## 执行记录

### 用户纠偏：完整游戏流程与家庭空间（2026-10-23）

- 产品需求：交付从2090回忆开场、触发回忆、穿梭2026、进入Unit1 Text A、探索家庭客厅直到学习推进的连续可玩体验；关卡截图或剪辑不能代替该验收。客厅围绕家庭阅读、棋局与手机篮增加有功能的生活细节，保持合理尺度、通道、触达距离和视线。
- 接口：主入口现为 /Game/Maps/L_Main + WordQuestGameMode；教材入口为 /Game/Memory/Scenes/U01/L_U01_A + WordQuestMemoryGameMode。新增独立开场流程负责两者衔接，既有C13文件仍按round4-reassign归DeepSeek维护。开场从已有剧情读取，不改写Claude数据；物件增加用生成层，不改源场景JSON。
- 测试：从默认地图冷启动，完整走过开场→回忆触发→穿梭→第一单元；覆盖跳过/重复进入、鼠标/手柄/触屏；需实际游戏视口录像与逐阶段状态证据。房间检查物件接地、无穿插、交互可达、镜头无遮挡、角色真实入场。缺失素材继续FAIL，不以占位数量或截图亮度替代游戏品质。

- 已完整阅读 codex-round4.md、quality-bar.md 和 ue-run-rules.md；本轮从 Unit 1 Text A 垂直切片开始。

### P0：Unit 1 截图链路修复

- 需求：C11 前先修复 33 个机位；禁止全零图被当成成功，平均亮度逐张要求 40–170。保留原始诊断，不通过调色图片伪造渲染。
- 接口：checker 显式激活唯一 set 的 PPV/灯光/天空；按 JSON 原始机位核对已保存相机；每帧显式 CaptureScene，最低时间和帧数双重预热；导出后进行像素质量门禁，并记录位置、曝光、灯光半径、相机相交诊断。
- 测试：全黑、过曝、大面积黑、正常细节合成 PNG；重新跑 33 个真实机位并核对 4K 尺寸和均值。材料编译日志同时核查，棋盘格视为失败。

### 完整开场接入验收补充

- 默认入口使用独立 L_Opening2090，保持原 prologue 全部叙事，Ready/稍等有真实状态，不自动替玩家确认。开场组件与原文章播放器通过 OpenLevel 衔接，生产画质门禁保持。
- PIE 必须验证 narration→waiting（稍等不穿越）→transition→U01_A 的真实世界切换；另测跳过路径。证据同时记录地图、阶段和当前句号，不能用剪辑证明流程存在。

### 2090 人物持久化兼容修复

- 需求：开场必须使用真实老年角色，不能因预览骨架保存失败回退为胶囊。
- 接口：CharacterStagingLibrary.SetPreviewMeshDependency 仅接受 /Game/Memory/Characters/ 生成网格及 skeleton/physics_asset；通过C++专用 setter 写入副本，原MHC不改。UE Python反射属性和BlueprintSetter均不可用，已用实际引擎错误确认。
- 验证：锁内重新编译 Result: Succeeded；9项staging测试和5项room测试通过；完整公寓重建和PIE尚在执行，未标PASS。

### 实际PIE发现与修复（持续验收）

- 已跑通原序幕四句、等待、Not yet后恢复、确认、三秒穿梭与L_U01_A播放器加载，Saved/Opening2090/playthrough.json记录technical PASS、visual NOT_ACCEPTED。
- 实际截图发现头部丢失：FaceMesh独立/Engine/Transient包未带RF_Transient，旧逻辑误当持久资源。现强制按路径复制面部网格及DNA并拒绝缓存中的Transient引用。
- 坐姿原接口只SetAnimation并未真正评估；新增受限EvaluatePreviewPose：只修改生成副本，严格骨架层级兼容检查、主动TickAnimation/RefreshBoneTransforms后定格并记录pelvis变换。生产角色资产不改。
- 序幕改为世界内Widget文字，中文fallback和可读性等待实际截图验证；第一房间布置与角色接入独立更新，不重建其余set。

## 2026-10-23 可玩回忆流程收尾
### 产品需求说明书
从原文2090独白开始，经Ready/Not yet进入第一单元并自由探索，细化书桌、阅读角、相框和座位。材质接入不得改变作者人物源资产；未齐资产继续由画质报告判FAIL，不能在游戏入口遮成黑屏。
### 接口文档
细节见 Docs/opening-playable-flow.md、Docs/memory-navigation.md、Docs/living-room-detail-plan.md。新增CopyPreviewMaterial以原生参数关联和静态开关复制角色预览材质，skin_v2缓存隔离旧错误副本；只写Memory/Characters。世界空间文字使用曝光补偿色，主流程仍由原文数据驱动。
### 测试
源保护与映射9项、场景契约12项、房间细节测试；所有C++编译和实际PIE均用run_ue_serial。正常运行无需QA变量，检查Not yet、Ready、机位稳定、WASD与暂停，截图审查人脸和细节；未完成完整视觉检查前不标最终通过。

### 提交前验证补记
45项离线单测通过；加锁texture-source-build编译成功。持久化纹理使用MHC内部同样的已存储合成像素数据初始化TextureSource（skin_v3），避免保存只带PlatformData的空纹理；该运行重装配仍待验证。repair_scene_material_defaults.py已实际执行完成，为Normal/Masks配置正确默认纹理并序列化Nanite使用标记，母材质/实例原覆盖保留。最终画质验收不因技术编译通过而自动变更。
