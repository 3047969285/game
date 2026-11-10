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

### 第一单元客厅书架细化（2026-11-09）

产品需求：Text A 离线日的客厅书架应有自然的阅读物件，使用已取得的 CC0 书籍资产，不遮挡玩家通道或课文物件。接口：`living_room_dressing.spawn_room_dressing` 支持按物件 ID 增量生成；书籍相对书架局部坐标排列，六层板高度依据 `wooden_bookshelf_worn` 原始 glTF 网格测得。测试：现有布景计划测试检查确定性、资源存在、局部边界与数量；在真实 UE 客厅单独检查书籍的层板接触、穿模和画面，完整工具测试随后重跑。

### 第一客厅布景刷新执行器（2026-11-10）

- 产品需求说明书：刷新 `u01a_s1` 时必须保留房间壳、场景物件和其他 set，只重建该客厅的程序化阅读物件与人物；缺失窗帘、家庭照片等资产要报告，不能用几何体伪装。
- 接口文档：`Tools/update_first_room.py` 调用 `living_room_dressing.spawn_room_dressing` 和 `textbook_character_staging.stage_people`，使用外盘 UE 5.8，并通过 `run_locked_editor` / `Tools/run_ue_serial.sh` 排队；锁取得后最多运行 900 秒，失败返回非零并保留日志。
- 测试：`test_living_room_dressing.py` 校验确定性、网格存在、支撑顺序、书架边界和课文物件通道；真实编辑器刷新后检查报告中生成数量和缺失项，再用 `room_review.py` 输出四个 1920×1080 人眼机位供视觉复核。

世界文字可读性：产品需求为课文提示中的中文不能显示方框；接口沿用现有世界文字组件和输入接口，字体改用引擎自带 DroidSansFallback，保留英文及中文字符；测试需实际渲染中文并核查缺字警告，另运行完整工具测试。

### 第一房间玩家出生机位修复（2026-11-10）

- 产品需求说明书：进入封闭房间场景时，玩家应从室内开始，距墙至少 0.45 m，且完整玩家胶囊不得与家具、墙体相交；入场稳定后不得因碰撞被挤移。用于镜头展示的室外广角机位不能成为玩家出生点。
- 接口文档：`WordQuestMemoryDirector::EnterScene` 在存在 `room` 边界时从 `shots` 选择室内机位，并通过与玩家胶囊同尺寸的 Pawn 通道碰撞查询验证落点；查询排除玩家自身及允许承托玩家的 `arch:floor`，仍检查家具和墙体。若落点被占用，在 1.5 m 范围内按半径递增、固定角度采样搜索空闲点，仍找不到时明确失败。第一人称 `CharacterMovement` 保留正常走路和蹲伏，最大台阶高度限制为 18 cm，避免攀上桌椅。无 `room` 的旧场景继续沿用首机位。运行日志记录场景、机位名、原始位置和落点。
- 测试：全工具测试校验所有房间场景至少有一个室内机位；`test_opening_flow.py` 在 PIE 进入 Text A 后记录入场首帧，并要求 2 秒稳定后漂移不超过 10 cm、角色仍在房内、眼高 168–176 cm，再验证移动时眼高变化不超过 30 cm、实际位移和暂停稳定。截图只作流程证据，视觉品质单独审查。

### 第一客厅窗景与室内光照复核（2026-11-10）

- 产品需求说明书：`u01a_s1` 的固定窗需要呈现有草地、树篱、房屋、天空层次的真实户外视野；玻璃不能遮成灰幕，窗外 HDRI 球不得在窗沿形成黑带。室内同一曝光下需保留墙面和人物暗部细节，避免一面过曝、另一面近黑。房间源 JSON 不改；缺少的窗帘和家庭照片继续明确报告，不用伪造替代品。
- 接口文档：`Tools/build_window_panorama.py` 从 Poly Haven CC0 `suburban_garden` HDRI 生成固定相机透视 PNG；`room_shell.py` 按 `kit_assets.json` HDRI 角色导入 Texture2D，创建无光照远景材质，并与 CC0 近景树木分层。窗玻璃材质使用低不透明度（0.025）、粗糙度（0.02）和反射（0.02），避免磨砂效果模糊窗外。`room_lighting_profile/apply_room_lighting` 统一配置房间 KEY、FILL、Skylight 和色调参数，以环境光抬升暗部并压低直射热点；`update_first_room.py` 仅重建第一客厅生成层并清理旧 HDRI 球。`room_review.py` 提供固定人眼四机位截图，并允许慢速 Metal SceneCapture 有足够预热时间完成。
- 测试：离线检查窗体几何、玻璃清晰度参数、园景坐标、房间灯光值和 HDRI dome 选择；运行全套 `Tools` 测试；通过 `run_ue_serial.sh` 刷新真实房间并按相同四机位复拍。Metal 显存限制下若只能输出 1280×720，记录为诊断预览，不得声称达到 2K/4K 或画质验收通过。

### 第一客厅窗景复测与交付记录（2026-11-10）

- 产品需求说明书：修正窗外全景上下方向，玻璃必须实际使用清透材质；室内补光覆盖顶棚暗部，同时保留自然明暗。最新四机位仍作为诊断结果，窗外层次和室内人物光照未达到视觉验收标准。
- 接口文档：远景卡片固定为 18 m × 6 m，沿窗外法线后退 12 m 并按窗台中心对齐；`room_review.py --resolution 1280x720` 可指定受显存限制的诊断分辨率，单帧捕获超时 90 秒、整轮超时 480 秒。`update_first_room.py` 对玻璃材质路径进行回读断言，并在房间布光中增加无阴影顶棚反弹光。
- 测试：全量工具测试 `236 passed, 11 subtests passed`，`git diff --check` 通过。编辑器复拍记录在资源工作树 `Saved/RoomReview/u01a_s1/1280x720/`，四个机位均为 1280×720；完成标记为 `WQ_ROOM_REVIEW_DONE`。此前 2560×1440/4K Metal 捕获发生显存不足，本次结果不代表 2K/4K 验收；`visual=NOT_ACCEPTED`。
