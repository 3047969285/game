# 协作状态（每人只追加自己那一节）

总方案：[../character-production-plan.md](../character-production-plan.md) · 任务书：[codex-character-engine.md](codex-character-engine.md)、[deepseek-data-qa.md](deepseek-data-qa.md)

## Claude（人物三维）

- 2026-10-21：方案和任务书已下发（Codex、DeepSeek 已收到）。
- 2026-10-21：M-C1 第一步完成。男主的中性网格已导出到 `../word-quest-game/docs/hero-pipeline/export/me2026/`（`male_head.obj`、`male_body.fbx`、1.84 m、468 个 3D 关键点、照片皮肤贴图）。下一步：在 UE 的 MetaHuman Character 里从这个网格做拟合（自动绑定需要用户登录 Epic 账号），然后用代码生成发丝和眉毛的 Groom（Alembic）。
- 2026-10-21：**男主发丝 Groom 完成第一版**。
  - 文件：`export/me2026/male_groom.abc`，102,928 根，每根 16 个点，共约 165 万点，26 MB。
  - 生成方法：由代码生成的 2600 个发簇（clump）展开成真实发丝，发尖收拢、长度错落、带细微毛躁。
  - 坐标：真实尺寸、脚底在 0，和 `male_body.fbx` 同一坐标系。
  - 脚本：`hair_cards.py`（EXPORT_GUIDES）→ `groom_strands.py`。
- 2026-10-21：**MetaHuman 拟合流程打通到求解**：`Tools/char_conform_metahuman.py`。
  - 已完成：导入 body FBX；从带已知相机参数的正面像（`male_portrait.png` 和 `_camera.json`，`render_portrait.py` 生成）追踪出 16 条脸部轮廓线；用 `conform_to_target_meshes` 求解。
  - 问题：命令行（commandlet）模式在求解后因为没有 Slate 界面而崩溃。现改为在完整编辑器里运行（`-ExecutePythonScript`），正在跑。

- 2026-10-21：**两位主角的 MetaHuman 拟合完成**：`/Game/Characters/me2026/MHC_me2026` 和 `/Game/Characters/lin/MHC_lin`。
  - 每位都从照片追踪出 16 条脸部轮廓线，在完整编辑器里用 `conform_to_target_meshes` 求解成功。
  - 姿态 DNA：`export/<id>/metahuman/<id>_PosedDNA.dna`。
  - 已请 Codex 让 `ue_render_compare.py` 用 `spawn_metahuman_actor` 直接渲染 MHC 预览体（不需要绑定）。
- 2026-10-21：**女主发型改为长直发**：中分、齐刘海 8–9 cm 到眉毛，按 DeepSeek D7 的实测，两侧 34 cm、耳后约 58 cm、后面约 1 m 到髋部，酒红色。之前用的是男款短发，是错的。
  - 女主 Groom 已导出：`export/lin/female_groom.abc`（82,773 根发丝）、`female_brows.abc`（1,502 根眉毛）。

- 2026-10-21 晚：**配角 5 人用代码建模并完成 MetaHuman 拟合**。
  - 规格来自 DeepSeek 的设定集，脚本 `build_cast.py`：
    - 脸部参数映射到 MPFB target
    - 身体按设定的年龄、身高、体型
    - old2090 用男主拟合好的脸做衰老
  - 已生成：`MHC_mei`、`MHC_an`、`MHC_rui`、`MHC_organizer`；`MHC_old2090` 也已完成，7 个角色的 MHC 全部就绪。
  - 发丝 Groom：`export/<id>/<id>_groom.abc`
    | 角色 | 发型 | 根数 |
    |------|------|------|
    | mei | 高马尾 | 75,517 |
    | an | 寸头 | 88,556 |
    | rui | 棕色短卷 | 116,617 |
    | organizer | 低马尾 | 84,761 |
    | old2090 | 稀疏银发后梳、发际线后移 | 43,713 |
- 2026-10-21 晚：**女主脸型重新拟合**。正面 7.76 → 6.77 px，3/4 12.8 → 8.87 px，侧面轮廓误差 2.4 px。
  - 修了两个问题：
    1. 酒红头发通过了 r>b 的皮肤判断，加上亮度门限后排除。
    2. 鼻尖对齐被刘海带偏，改为只在检测到的鼻尖附近找。
  - 下游（皮肤、导出、正面像、MHC_lin 重新拟合、发丝）正在重跑。
- 2026-10-21 晚：**UE 崩溃已定位**，见 `ue-run-rules.md`。
  - 我的拟合脚本在退出析构时崩溃：已改为保存后直接 `os._exit`。
  - DeepSeek 在 commandlet 里导入 StringTable 时崩溃。
  - 三方同时开 UE。
  - 新增 `Tools/run_ue_serial.sh` 锁，三方都已通知。

- 2026-10-21 晚：**MetaHuman 拟合的“张嘴露牙”问题已修好**。
  - 原因：目标网格里带着 MPFB 的口腔内壁，MetaHuman 张开下颌去贴合它们。
  - 改法：`export_metahuman_input.py` 去掉头部内表面，判断方法是沿法线 4 cm 内能再次射中网格的顶点；男主去掉 792 个，女主 829 个。
  - 两位主角重新拟合后再渲染：男主脸干净可信，女主嘴部恢复正常。
  - QA：男主 front 7.18 px / q34 13.66 px；女主 front 15.52 → 7.76 px。
  - 女主 q34 显示 38.6 px，是因为 D5 我给错了参考图映射（lian6 其实是侧面，3/4 应该用 lian7），已通知 DeepSeek 修正后重跑。
  - 配角 5 人正在用同样的方法重新导出和拟合。

- 2026-10-22：**MetaHuman Creator Core Data 已安装**（6.0 GB）。UE 已能加载 TextureSynthesis 模型，不再出现“Optional Content folder not found”的警告，验证脚本是 `Tools/char_check_coredata.py`。新增 `Tools/char_skin.py`：按设定集为 7 个角色在本地合成皮肤（肤色、冷暖、两颊和唇色、雀斑），正在先用男主测试。
- 2026-10-22：**发丝满屏条纹的原因已查明**：Alembic 每个点的 radius 都是默认值 1.0（相当于每根发丝宽 1–2 米）。已改为真实半宽（头发 0.03–0.045 mm，眉毛 0.04 mm），9 份 Groom 正在重新导出。

- 2026-10-22 09:15：**Groom 重新导出完成**。9 份文件已带真实宽度：Alembic radius 范围 0.01–0.045 mm，此前全部为 1.0。路径不变：`../word-quest-game/docs/hero-pipeline/export/<id>/*.abc`。Codex 可以重新导入并绑定。

- 2026-10-22 09:35：**两位主角的服装已用代码建好并导出**，坐标系和各自的 `*_body.fbx` / MHC 拟合目标一致（米，脚底在 0，导入后脸朝 UE +Y）。
  - 男主：`export/me2026/male_outfit.fbx`，白衬衫卷袖 + 黑西裤 + 黑皮鞋，约 1 万三角面，脚本 `clothes.py`。
  - 女主：`export/lin/female_outfit.fbx`，浅蓝 A 字连衣裙（方领、细吊带、腰线 1.14 m、裙摆离地 28.6 cm）+ 黑皮绳吊坠项链，按 DeepSeek D6 的实测，脚本 `dress.py`。高跟鞋还没做。
  - Codex：可以作为静态网格挂到 MHC 预览上验证；蒙皮和 Chaos Cloth 等 auto-rig 骨骼就绪后再做。
- 2026-10-22：**配角调参（DeepSeek D19）已应用到 `build_cast.py`**（按角色单独设置增益），正在重新拟合和渲染：rui 已完成，其余进行中。
- 2026-10-22：**MetaHuman 改为直接用参考照片做 conform**：`char_conform_metahuman.py` 新增 `PORTRAIT=photo` 模式，相机由 `photo_camera.py` 生成。男主 front 关键点误差 7.38 → 5.58 px，q34 14.22 → 12.77 px（clay 模式为 6.55 / 13.25 px）；女主正在跑。
  - 查到的问题出在上游：Blender 拟合里 neck 类 target 饱和到 1.0。照片上脖子没有关键点，优化器借脖子去贴下颌线，结果脖子变粗、出现褶皱；eye-height-decr 约 0.5，把眼睛压小了。
  - `fit_face.py` 已加 `CAPS` 上限（neck ≤ 0.15，eye-height-decr ≤ 0.15），正在重拟合到 `fit_v2/`。
  - 肤色按 D21 的结果（ΔL +7、Δa −6、Δb −9，即参考图更亮、更少红黄），下一步把 U 调到 0、V 调到 0.45。
- 2026-10-23 傍晚：**MetaHuman 装配、姿势、展示视频管线**
  - 用户已登录 Epic。7 个角色全部 auto-rig 完成（`Tools/char_autorig.py`），资产从约 10 MB 增至约 50 MB。
  - 组装蓝图用 `Tools/char_assemble.py`，配置为 Optimized + High。这台机器只有 16 GB 内存，和 Blender 同时跑时 UE 被系统杀掉了两次，所以组装改为等机器上没有 Blender 时才开始。
  - **姿势**：
    - `Tools/export_mh_body.py` 导出 MetaHuman 身体骨架；
    - `Tools/props/pose_author.py` 在 Blender 里按肢体方向制作 10 个姿势（站、看、站着看手机、坐、打字、笔记本、手机、平板、阅读）；
    - `Tools/import_poses.py` 导入为 `/Game/Memory/Characters/Poses/A_MH_*`；
    - staging 已接上：优先用组装出的 BP，在身体上播放对应姿势。
  - **展示视频**：
    - `Tools/render_unit_film.py`：每个关卡单独开一个 UE 进程（在启动时 LoadLevel 会崩），每个机位做推镜。
    - `Tools/film_narration.py`：旁白全部原创，用老人回忆的口吻，**不含教材原文**，因为视频要公开分享。
    - `Tools/compose_unit_film.py` 合成序幕、卡片、逐词浮现的冷光字幕、记忆转场和环境音；`Tools/mux_av.swift` 用 AVFoundation 合成音视频，成片约 3.5 分钟。
  - **D28 评审**（`Docs/qa/review-d28-claude.md`）：17 个小物件通过 1、返工 3、退回 13。**C13 证据图 25 张里 21 张全黑，不通过。** 两项都已退回 DeepSeek，并请它在组装期间暂停 Blender。
- 2026-10-23 下午：**Codex 额度用完，任务重新分配**（`Docs/tasks/round4-reassign.md`）。Claude 负责画面、布景、人物和第 2–6 单元；DeepSeek 负责 C13 沉浸式运行时、内容、配音，以及 D28 精品小物件。
  - **Codex 遗留代码**：修了 3 处编译错误，现在编译通过。截图修复已生效：第 1 单元 33 张 4K 截图全部落在亮度 40–170 之间，此前 28 张全黑。
  - **C14 人物入场**：搭建器原来从未调用 `textbook_character_staging.py`，人物一直是圆柱。已接入，人物改为 MetaHuman 快照；失败的人物留下带标记的 TargetPoint，并输出 `Docs/qa/character-staging-unitNN.json`。坐姿和动作要等 auto-rig，需要用户在 UE 里登录 Epic。
  - **kit 映射纠错**：chess_set（一个骑士棋子放大 6 倍）、reading_table（小桌放大 5.7 倍）、checkout_counter、hutong_wall、kitchen_counter、market_shelf、tv、blackboard 共 8 个错配已撤销，旧值保留在 `rejected` 字段。
  - **精品物件**（`Tools/props/hero_*.py`）：phone、tablet、monitor、home_desk、rug、calendar、floor_lamp、bubble（记忆玻璃壳，`M_MemoryBubble`）、chess_set（车削棋子，中局摆位）、blackboard（粉笔手写板书）、kitchen_counter、tv（屏幕是 HDRI 实拍画面）、market_shelf（按货架布局生成商品和投影标签）、reading_table（银行家台灯）。其中前 8 个已入 UE，其余由后台流程烘焙和导入。
  - **建筑**：`Tools/make_arch_materials.py` 生成世界对齐的 PBR 材质 `M_ArchWorld` / `MI_Arch_*`，配合单位盒 `SM_arch_box` 和搭建器新增的 `fit: size`。墙、街道、胡同墙、码头、发射台、舞台等 12 个 kit 已映射；草地、沙滩、月面、火星等地面 kit 等扫描材质导入后映射。
  - **Poly Haven CC0 扫描**：经用户同意下载 22 套（191 MB），涵盖草、沙、岩、泥、月面、雪、橡木、胡桃木、枫木、亚麻等，见 `Tools/download_polyhaven_textures.py`，许可已登记。`pbr(scan=...)` 支持把扫描材质烘焙进精品物件，书桌和棋盘已换成真实木纹。
  - **生词**：`Tools/scene_text_words.py` 让每个生词在课文所在的漂浮句子里点亮。DeepSeek 已校对词表，现在 506/506 全部覆盖。
- 2026-10-23：**第四轮任务已下发**（`Docs/tasks/codex-round4.md`、`deepseek-round9.md`）：六个单元全部建成、教材内容全覆盖、沉浸式少 UI。
  - **第 1 单元画面评审：全部退回**，见 `Docs/qa/review-u01-claude.md`。33 张 4K 截图中 28 张平均亮度为 0（没渲染出画面），能看的 4 张仍是白模和棋盘格材质。
  - **新的精品物件管线（Claude）**：`Tools/props/hero_common.py`。流程是 Blender 代码建模（真实倒角）→ 程序化材质（边缘磨损、缝隙脏污、划痕、指纹）→ Cycles 烘焙 2K BaseColor / Normal / ARM → `Tools/import_hero_props.py` 导入到 `/Game/Memory/Props/Hero/SM_<kit>`（开 Nanite，母材质 `M_HeroPBR`；屏幕类用 `M_HeroScreen` 自发光贴图）。
    - 已完成：phone（3.3 万三角面，带锁屏界面）；tablet 烘焙中。屏幕贴图由 `Tools/props/hero_screens.py` 生成，文字全部原创。
    - 下一批：monitor、keyboard、headphones、wifi_router、home_desk、floor_lamp、rug、door、calendar。
  - **缺失 kit 分工**（全部 6 个单元共 268 个没有最终资产）：
    - 近景物件和设备：Claude 用上面的管线做精品物件。
    - 建筑和地面（wall、window_wall、street、lawn、sea_water、moon_surface、mars_surface 等）：Codex 用模块化几何加 Poly Haven PBR 材质。
    - 大型布景（火箭、船、建筑外立面）：Codex 用模块化方案搭，Fab 恢复后再替换。
  - 男主：换上瘦颈目标并用照片重新 conform 后，front 5.72 → **3.88 px**，q34 **7.09 px（PASS）**；正在按 D21 调皮肤（U 0、V 0.45）。
- 2026-10-22 10:05：**二维闭环精修 + q34 相机姿态修正**
  - 新工具 `Tools/char_refine2d_prep.py` + `Tools/char_refine_2d.py`：用 MediaPipe 比对 MHC 正面渲染和目标网格渲染，得到图像平面上的位移场，再用 translate_face_landmarks 移动 MH 脸部关键点。男主跑了 3 轮，相对目标的局部形状误差 6.5 → 2.8 px，脸部纵向被压短的问题已修正（z 向缩放 1.074 → 0.98）。
  - **修了 q34 渲染姿态的符号（改的是 Codex 的 `Tools/ue_render_compare.py` 第 28 行）**：`fit_face.view_frame` 里 pitch>0 是相机在下方、roll 绕朝向相机的轴，UE 相机架两者都相反，现在传 (yaw, −pitch, −roll)。男主 q34 12.77 → **7.74 px（PASS）**，front 5.72 px。7 个角色都已重渲，dashboard 已更新。DeepSeek 的 `render_target_like_ue.py` 如果照搬了旧 UE 约定，也要同步改。
  - 女主改用照片做 conform 失败（刘海挡住了眉和额头，跟踪点出错）；重新 conform 也恢复不了（conform 是在当前状态上迭代的），已从 checkpoint 8413d47 恢复 `MHC_lin.uasset`。当前 dashboard：front 5.76 / q34 6.03 px。
  - 男主的瘦颈目标 `fit_v2/male_fit_slim.blend`（fit_face.py 新增 CAPS 上限 + 颈部收窄）已做好、还没换上。

## Codex（引擎侧）

- （待更新）

- **2026-10-21 · C1 工程基础验证完成（Creator Core Data 待用户补装）**
  - 已做：启用任务书全部 10 个插件；Skin Cache、Strands/Cards/Binding 开启，Substrate=0，Lumen GI/反射保留。新增 `Tools/ue_check_character_engine.py` 与三件套文档 `Docs/engine-characters.md`；未修改 Content/Characters、DeepSeek 的文档/工具或人物资产。
  - 验证：UE 5.8.4 / Mac arm64 / Xcode 27.1，5 个项目 C++ 文件强制编译并链接成功；重编译后 `UnrealEditor-Cmd -run=pythonscript -nullrhi -unattended -NoEpicPortal` 退出 0，10/10 插件、8/8 运行时 CVar、8/8 反射类通过，`WQ_C1_PASS`、errors=[]；扫描日志无 Error/Fatal/Python Traceback。报告 `Saved/CharacterEngine/C1-report.json`，日志 `/tmp/ue-c1-final-headless.log`。
  - 还缺：MetaHuman Creator Core Data 缺失，Creator 受限（警告保留）；用户补装和云绑定登录见“需要用户处理”。无头 NullRHI 不代表已验证 Lumen/Groom 画面或 GPU 性能；C2–C6 待按顺序继续。未尝试登录 Epic。


- **2026-10-21 · C2 验收重渲染与崩溃修复（进行中）**
  - 已做：固定 EV100 等效 9.5，主/补/轮廓 1/0.4/0.6，隐藏地面；40 cm 头肩四视图 + 25 cm 脸部特写；强制 MHC，实际 API `spawn_meta_human_actor`，只对预览切换 Skin（不保存 MHC）。旧 Source 图已归档，渲染失败不再展示旧图冒充新 MHC。
  - 当前结果：两位 MHC 均已出五张 1024²图；男主 QA front 6.59 px、q34 14.03 px、side face IoU 0.302、hair IoU 0.013（4 FAIL）；女主 front 15.52 px、q34 43.68 px、side 0.244、hair 0.069（4 FAIL）。`Docs/qa/{me2026,lin}-report.md` 由原版 report.py 实际生成。女主鼻部畸变、牙齿穿出嘴唇需要 Claude 检查 MHC 拟合；未修改人物。Core Data 缺失导致 Skin 预览灰白、没有最终皮肤；Groom 尚未装配，头发指标不代表最终交付。灰背景与 QA 白底阈值 244 亦不匹配，side IoU 暂不适合单独判断脸型质量。
  - 稳定性：遵守 ue-run-rules，子进程改为 UE_LOCK_WHO=codex + run_ue_serial.sh + 完整编辑器；还会等待规则前未加锁的同工程实例。保存、释放 MHC 会话后 os._exit(0)，异常退出 1。女主新锁运行退出 0，Condition failed / Caught signal / Python Error 均 0；男主正排队按新锁复核。
  - 崩溃归属：历史 PID 8480、9481 是 Codex 渲染进程，报告在 Crashes/ 下对应 pid 目录；均为 malloc → ubidi_close_64 → FICUTextBiDi → FSlateTextLayout 析构栈。8480 出图后正常关编辑器时崩溃；9481 因旧 API 名称错误停止时触发同栈。启动 Condition failed 源码核对为引擎自动 SmokeTests，UnifiedError 的英文文本断言与中文输出不一致是目前推断；改用英文运行后未复现，未禁用测试或日志。命令行、报告目录与栈写入 Docs/engine-characters.md。
  - 验证：编辑器 C++ 编译成功（51.39 s），离线安全合约 10/10 测试通过；还需新锁男主复核和最终记录/提交。


- **2026-10-21 · C2 完成渲染修复与串行稳定性复核（人物 QA 尚未通过）**
  - 已做：两位最新 MHC 五张头肩/脸部图，source=MHC / Skin；固定 EV100 等效 9.5、三点光 1/.4/.6、地面隐藏。标准输出 Saved/Compare/<id>，每轮独立 CompareRuns 快照；不会在排队时搬走已有图，旧图归档在持锁编辑器内执行。MHC 前后 SHA256 不变，不保存人物。
  - 稳定性：普通 CLI 和外层已包 run_ue_serial.sh 两种入口均实际成功（识别祖先锁避免嵌套死锁），完整编辑器、UE_LOCK_WHO=codex；写盘并释放 MHC 会话后 os._exit(0)。两轮退出均 0，Condition failed / Caught signal / Python Error 均 0。历史 8480/9481 的 Slate/ICU 退出崩溃、旧命令行与调用栈已写入 Docs/engine-characters.md；保留引擎 SmokeTests，自动化固定英文避免本地化断言。
  - 验证：C++ Editor 编译成功 51.39 s，12/12 离线安全测试通过。原 Tools/qa/report.py 对两位实际运行成功，均生成 6 行、4 FAIL；完整指标见 Docs/qa/{me2026,lin}-report.md 与 engine-characters.md。两位当前均无张嘴露牙；未修改 QA 工具或阈值。
  - 还缺：Core Data 皮肤微细节纹理缺失，Skin 仍灰白；无 Groom 时头发指标不能验收，灰背景与 QA 白底阈值 244 不一致，side IoU 需结合原图判断。身份/q34 仍 FAIL 由 Claude 继续检查。接下来按新指令扩展 5 配角、C3 Groom 和女主背颈诊断；未修改 Content/Characters、未尝试 Epic 登录。


- **2026-10-21 · 女主背颈暗褶诊断 / 编译锁补充**
  - 结论：属于 MHC 的颅底—颈部几何/顶点法线过渡，顶部轮廓光放大了折痕；不是地面阴影、自动曝光、皮肤纹理或法线贴图造成。实际三组同机位对照：原 Skin；统一灰色无贴图/无法线贴图材质 + 阴影/SSAO/Lumen 全关；相同灰材质改为下方背光。第二组横向折痕仍在，第三组亮暗方向反转但表面折线仍在。尚未进一步区分顶点位置和顶点法线各自贡献，建议 Claude 检查拟合后颅底到颈部的过渡及法线平滑，未修改人物。
  - 证据：Tools/ue_diagnose_neck.py 实际完整编辑器、串行锁运行成功，退出 0，Saved/CompareDiagnostics/lin/{back_beauty,back_flat_no_shadow,back_flat_low_light}.png 与 diagnosis.json（MHC SHA256 前后不变）。
  - 编译事故归属：22:33 是 Codex 的未加锁 C3 C++ 编译导致短暂没有 dylib；rui 失败日志 Saved/CompareRuns/rui/ab600750130147c79cbe4febbbe333bb/render.log 在 14:33:13 UTC 明确记录游戏模块 WordQuestUE could not be found。后续 Build.sh / UBT 和所有 UE 启动都使用同一 run_ue_serial.sh 锁；不再与其他 UE 并行链接。旧失败不是 rui 人物资产不合格的证据，待拟合完成后按新构建重拍。


- **2026-10-21 · C3 导入进度与源属性检查（绑定验证中）**
  - 七位 Groom + 主角眉毛共 9 份已完整编辑器导入成功，C3_IMPORT_PASS、退出 0；总约 92 MB，全部保存到 /Game/Blueprints/Characters/Imported/<id>，遵守不写 Content/Characters 的最新所有权约束。记录每份来源 SHA256，转换 rotation=(90,0,0)、scale=(100,100,-100)，三个真实 Strands LOD；没有把空发片 LOD 冒充已生成 Cards。
  - 男主首次临时 FaceMesh 皮肤绑定 180 秒超时，按失败退出 1，没有报完成或生成假截图；正在加边界日志、延长离线绑定等待并核查 CPU 热点/坐标。额外 rigid 模式只用于验证导入坐标与材质，不能冒充可变形皮肤绑定。
  - 源属性线索：当前读取的 docs/hero-pipeline/scripts/groom_strands.py 统计 is_guide/widths/COL，但创建 legacy Curve 导出时未看到把 groom_guide/groom_width/groom_root_uv/颜色写入 Alembic 的代码。UE 实测男主 102,928 curves / 10,292 guides（自动生成 10%），不是源 info.json 的 2,600 guides。请 Claude 检查当前 ABC 属性；此处只反馈，未改源发丝或作者脚本。

- **2026-10-22 · 第二轮接收 / C3 等待重新导出交接**
  - 已做：按 codex-round2.md 接续 C3→C4→C6，导入器增加 Claude 一节“Groom 重新导出完成”门槛；头发/眉毛直径显式换算和范围校验。上一轮坐标记录更正：最终有效 conversion 为 rotation=(-90,0,0)、scale=(100,100,-100)，原 +90 会倒置；正确坐标下男主 FaceMesh 临时绑定约 1 秒，上一轮最终仍因源半径导致画面条纹未验收。
  - 验证：20/20 离线测试通过；动画资产只读清点退出 0；新增 archetype 动画预览类共享锁编译成功 15.60 秒。网页规格同步的全量测试 811+7 通过，构建通过，最终交付随 C3/C4 结果继续记录。
  - 还缺：Claude 正在导出，尚未有交付标记，因此未提前重新导入；七人带 Groom 五视图、QA、动画实际重定向均待后续执行。没有操作 Epic 登录或修改 Content/Characters。

- **2026-10-22 · C3 重新导入启动 / 皮肤保持约定**
  - Claude 的交付标记已出现，男主 2 份 Groom 已实际重新导入成功、退出 0。其余 7 份待男主带发丝画面验证后继续。比较渲染取消 UsePreviewSkin/材质切换，保留角色保存的合成皮肤与 preview_material_type，capture.json 记录 Authored、实际材质路径及 MHC 前后 SHA256。
  - 男主渲染当前在等共享 UE 锁，未终止 Claude 的肤色校准/拟合进程。Core Data 已安装，之前缺少 Core Data 的条目仅为历史状态。
  - 给 QA 的接口问题：当前 report.py 的 PROFILES 只支持 me2026/lin，5 配角会 unknown id；conform_report.py 和 dashboard.py 已支持全部角色。Codex 不改 Tools/qa，计划主角执行 report，配角补 conform_report + dashboard，并记录 report 的工具限制；请 DeepSeek 后续扩展 report 的配角入口与有 Groom 的文案。

- **2026-10-22 · C3 男主重新导入后实际渲染反馈（画质仍 FAIL）**
  - 九份新源文件交付后，男主发丝/眉毛重新导入成功；MHC 两个 FaceMesh 临时绑定合计 **1.98 秒**，五视图完整生成、退出 0，保留 Authored 真实皮肤、MHC SHA256 未变。运行快照：`Saved/CompareRuns/me2026/d71249389b61439db7b2882400460159`。
  - 目视 front 仍有斜向黑色长条和噪点，半径修复后尚未通过画面验收；人脸追踪返回 16 条曲线也不能证明发丝正常，未把渲染进程成功当成质量 PASS。接下来检查 UE 实际导入直径/相邻点长度和 triangle strip/渲染路径，结果会继续追加。其余源 Groom 正在串行全量重新导入，不修改作者数据。

- **2026-10-22 · C3 渲染路径定位 / C6 配置与测试完成**
  - C3：只切 triangle-list、保留正常 FaceMesh 绑定的对照运行 `71bc95eca95d4a08a11b5f0edea4f85d` 五视图已完成，退出 0，绑定 1.73 秒，斜向满屏长条消失；仍有噪点与发型/轮廓偏差，不能标最终质量 PASS。UE 内部男主最大直径 0.006164 cm、最长相邻线段 0.171545 cm；眉毛 0.008 / 0.098730 cm。新增 MacEngine.ini 启动级 triangle-list 配置，正在共享编译锁内接续复核。
  - 相机噪点另查到 SceneCaptureComponent2D 构造函数默认 ShowFlags.TemporalAA=false；ConfigureViews 将对已有序列化相机显式启用 TemporalAA + AntiAliasing，保留视图历史。七人最终带 Groom 渲染和 QA 待此构建完成后继续，未更改作者材质。
  - C6：网页角色表按 Docs/characters 同步白衬衫卷袖/黑西裤/黑皮鞋、浅蓝 A 字裙/银色 7 cm 高跟鞋/黑绳金属吊坠/酒红长直发，男主无眼镜和背包。英雄 GLB 加载及材质几何保留；衣服/首饰元数据不冒充回退身体已能生成最终裙装与鞋跟。VITEST_MAX_WORKERS=2 npm test：811 前端 + 7 数据测试通过；npm run build 通过。测试旧的卫衣/背包断言已同步新需求。尚未提交，待本轮引擎结果一起按范围整理。

### 2026-10-22 Web 客户端退役（用户最新指令）
- 检查最新提交 f44eb78 / 81f9ef6 / 8413d47 / ff7ba78，确认以 UE5.8 为唯一客户端。删除旧 Web 入口、src、dist、Vite/npm 配置、移动壳与浏览器调试页面；教材、角色源资料及导入路径保留。删除前含未提交改动的快照在本机 ~/.local/share/wordquest-archives/。
- 剧情先从最新工作树导出至 UE（6 单元、18 段、90 幕、98 台词），后将 data_export_acts 改为直接校验 UE JSON；本地化历史审计冻结，消除对已删除 src 和 Node 的依赖。
- 验证：7 项剧情 QA + 22 项角色管线测试通过；63 个保留源文件哈希一致；旧入口不存在；Python 语法检查通过。说明见 Docs/web-retirement.md。
- 尚缺：UE 各系统迁移验收继续按原计划推进；保留目录只是源资料，不代表旧 Web 仍可运行。此前 C3 发丝质量尚未通过，C4 AnimSequence.get_controller API 问题尚未解决，不因删除 Web 标记完成。

### 2026-10-22 第三轮 C7 / C8 接口联调（未提交）
- 已完整阅读 codex-round3.md、unit01.md、ue-run-rules.md。C7 搭建器已用 Claude 正式 unit01.json 建出 3 张关卡、22 个 set；C8/C9 正在编译及 PIE 联调。接口/测试方案见 Docs/engine-textbook-round3.md。
- **待 Claude 核对数据**：当前 textbook_units.json 的 unit01/section_c passage 只有 2 个空行段落；正式场景引用第 1–9 段，u01c_s1 就引用到不存在的第 3 段。请补齐真实 Section C 段落结构，或明确 scenes 段号如何映射到 OCR 正文。Codex 不改写教材/场景数据。练习 #1-3 范围已在引擎接口补支持。
- 编译调试曾出现保护成员和 TObjectPtr 类型错误，已修复；一次脚本在编译失败后仍被串行启动，因 dylib 缺失弹出模块提示（无并发编辑器、未发生新崩溃）。已停止这种串接调用，后续必须确认编译成功后再启动，并要求日志完成标记，避免 UE exit=0 误报成功。截图和最终验收结果随后追加。

### 第三轮 · 新画质门槛已接入（联调中）
- 已读取 quality-bar.md / round3 画质补充；kit_assets.json 映射已接入，空路径回退打 needs_final_asset；人物占位也计入 FAIL。新增 per-set PPV、LocalFogVolume、SkyAtmosphere/Cloud、Nanite、decals/clutter（固定种子）、全机位 3840×2160 截图与逐 set 的质量报告。最终资产尚空，不标视觉完成；运行时默认阻止未过最终资产门槛的粗糙关卡，仅 WQ_TEXTBOOK_ENGINE_QA=1 允许引擎内部诊断。
- 最新数据还在变动：场景现引用 A 第 1–12 段、C 第 1–10 段，textbook_units 仍是 A=9、C=2；scene 里的 u01_b_text_b_mcq 与最新 exercises 文件的 id 不一致。请 Claude 同步正文段落结构和题目引用（Codex 只读数据）。
- C9 首轮 12 kind 正确/错误提交与暂停恢复逻辑已过；截图复核发现旧 Slate 树没有刷新，已修为同一树内更新，正在重跑图像验收，不能只凭旧 results.json 当完成。首次 PIE 结束后退出回调漏判 world=None，自己的编辑器 pid46978 已终止释放锁，脚本已修正；未影响其他进程。

### 2026-10-22 · C10 最终资产接入与 C7–C9 收尾（Codex，未提交）
- 需求 / 接口 / 测试记录在 `Docs/engine-textbook-round3.md`。FabStaging 迁移核验为 150 个 `.uasset`；迁移时哈希一致，之后主工程为椅子、轿车、会议桌保存 Nanite 设置，故这 3 个文件现在与暂存副本不同，其余一致。编辑器已加载并映射 4 个交付项（office_chair、board_table、car、book）；Wooden Bookcases 不在暂存目录。Fab 网页停在 Cloudflare 人机验证，未尝试绕过；需要用户在 Fab 页面完成人工验证并补齐书柜、贴花等免费资产。
- Poly Haven 导入报告 `Saved/Textbook/polyhaven-import.json`：51 个模型、9 套 PBR 贴图、6 个 TextureCube HDRI，另有 `urban_street_01` 源 HDR 以 Texture2D 导入；昼间照明映射回退至 `urban_courtyard` TextureCube。总计 0 个导入错误、1 项 HDRI 警告；8 个含透明材质模型跳过 Nanite，26 个 CC0 杂物网格已登记。kit 映射静态测试 4/4 通过。
- 重建 `L_U01_A/B/C` 并运行 C7 质量检查：22 个 set、33 个机位，33 张 `3840×2160` PNG 已输出到 `Docs/qa/scenes/<sceneId>/`；`Docs/qa/textbook-scenes-unit01.json` 与 Markdown 逐 set 列出缺失 kit。当前 22/22 仍为 FAIL：154 个场景几何 actor 需要最终资产，208 个占位 actor（含角色胶囊），56 种 kit 缺最终映射；正式贴花为 0/10，5 个无桌面/柜台的 set 没有适配的 CC0 杂物。其余 17 个 set 已从 Poly Haven CC0 网格做确定性桌面散布。Poly Haven 资产仍须逐项完成 PBR、倒角、三角面及视觉复核，不能算最终验收。
- C8/C9：通过 `Tools/run_ue_serial.sh` 编译成功；`Tools/test_textbook_pie.py` 同一 run `1792659124067307000` 下 12 种练习、答题暂停/恢复、全文句子推进和跨场景转场均通过，生成 21 张 fresh UI 证据。修复点：macOS 无头 PIE 不落盘 `FScreenshotRequest`，现由 UMG `FWidgetRenderer` 导出 1280×720（横竖屏测试另核 1280×720 / 450×900）；场景画面由 C7 4K SceneCapture 单独验收。转场断言现等待真实完成状态，不按固定帧数误报失败。
- 静态验证：Python 语法检查通过；Poly Haven 4 项测试及场景契约其余 11 项通过。唯一已知失败是 Claude 场景 JSON 引用不存在的 `u01_b_text_b_mcq`（题库实际 id 为 `u01_b_understanding`）；Codex 未修改教材或场景源数据。未提交、未推送。
- 2026-10-22 · Fab 资产补齐尝试：Epic Games Launcher 显示账号已登录；在 Safari 打开 Fab 后遇到 Cloudflare“请验证您是真人”复选框。按 `Docs/engine-textbook-round3.md` 的“不绕过登录或验证码”规则停止在此处，未点击、未绕过，也未下载新资产。待用户本人完成验证后继续；当前 33 个 `source=fab` kit 仍为空，待按搜索词逐项筛选免费且允许的许可、下载、核对路径并登记到许可清单。
- 2026-10-22 · Fab 补齐继续尝试：用户明确要求 Codex 自行操作；已确认 Epic Games Launcher 账号处于登录态，FabStaging UE 5.8 主窗口可用且 Fab 插件已启用。编辑器 Fab 入口与 Launcher Fab 导航均未成功打开商品页；独立 Fab 页面停在“请稍候”加载/保护页面。未下载新资产、未把候选写成正式映射、未接受新许可；33 个空 Fab kit 保持原状。继续从可响应的已登录 Fab 面板逐项筛选“免费 + Personal”后获取，并在每项完成时登记作者、许可、路径、日期。

### 2026-10-23 · 用户纠偏：完整开场和生活空间（未提交）
- 独立 OpeningFlow 已挂接 GameMode，加锁编译 Result: Succeeded；读取原 prologue，Ready/等待/跳过经三秒穿梭进入第一单元。新增2090公寓搭建器，实际锁内生成进行中；PIE完整地图切换验证由 verify_opening_delivery.py 等待搭建完成后执行，只有真实通过才切换默认启动地图。
- living_room_dressing 已接入 Unit1A builder，禁用该set旧通用杂物；5项测试通过。书籍、茶具纸笔、盆植、相框使用本地交付资产，底部与支撑对齐；尚未重建出图和视觉验收。
- 未将已写代码当成游玩完成；天气、语音、人物坐姿、字幕中文字体和实际机位仍待实景检查。未提交、未推送。

- 2026-10-23 续修：2090实际搭建失败已定位两处UE5.8属性API兼容问题（Skeleton只读/未暴露Python setter；动画编辑器更新属性不能直接写），新增受限C++ setter桥接且编译Succeeded，移除冗余动画属性直写。人物副本已实际生成身体材质、骨架和DNA，关卡重建再次执行中。修正公寓网格旋转后的pivot/接地与18本书站立摆放。9项staging和5项room单测通过；完整PIE仍未通过，默认入口未切换。

- **2026-10-23 17:45 · 可玩序幕到第一单元：实际 PIE 通过，视觉继续返修（未提交）**
  - 正常状态链：4段原始独白→等待确认→Not yet→等待返回→Ready→3秒2090/2026转场→L_U01_A；空间UI=0、完整度环=1。导航排除了天空/雾碰撞体，本轮实际W输入移动46.91cm、眼高无跳变，暂停位置不变。证据 Saved/Opening2090/playthrough.json，日志 playthrough.log 的 WQ_OPENING_PLAYTHROUGH_PASS；图 ready-1792748462734920000.png / 同名-first-room.png。
  - 最新隔离/导航编译与原生皮肤复制编译日志均 Result: Succeeded（isolation-build.log、skin-copy-build.log）。角色源保护9项、场景契约12项、陈设5项离线测试通过。
  - 视觉仍FAIL：旧副本脸黑、人物预览服装/发丝未达标、部分座位不足、相框背面与空架。皮肤快照改用原生完整参数复制并隔离skin_v2缓存，正重建；不修改作者MHC/脸/服装/头发。请Claude继续交付最终穿衣/发丝/自动绑定结果，当前预览体不能冒充最终角色。
  - 运行时未齐资产改为保留WQ_VISUAL_QUALITY_FAIL日志且允许进入课文，质量checker仍按原门禁判FAIL；此前不应以不透明准备屏代替可玩流程。新正常环境（无QA变量）复测待完成；默认入口暂未切换。无提交、无推送。

- **2026-10-23 17:54 · 用户要求提交推送：代码检查点**
  - 此次提交范围：引擎Source、C7/C8/C9场景/播放/沉浸交互工具、序幕与导航、房间细节、需求/接口/测试文档；不混入人物源资产、扫描素材/场景二进制、教材作者数据、截图/视频和缓存。
  - 实测：45项离线单测通过；最新texture-source-build.log为Result: Succeeded（10.61s），包含skin_v3持久纹理Source修复；scene-material-repair.log达到WQ_SCENE_SAMPLER_DEFAULTS_REPAIRED，修正Normal/Masks默认纹理和Nanite用法。git diff --cached --check通过。
  - 皮肤进一步根因：MHC Editable纹理仅有动态PlatformData，直接复制后重开没有mip，不能只复制材质参数。skin_v3读取MHC已存储的SynthesizedFaceTextureDataAsync原始像素，初始化副本TextureSource，保留颜色/压缩属性，不改作者脸/头发/服装。编译已通过，skin_v3重新装配/实景重渲染仍待做，不声称视觉通过。
  - 最新已完成首次房间更新达到WQ_FIRST_ROOM_UPDATED（skin_v2）；新增相框翻转、棋椅和书架顶部书籍的代码已纳入，但待下一轮更新和视觉核对。视觉总验收仍FAIL，默认地图没有切换。

## DeepSeek（数据 / 文档 / QA 工具）

- **2026-10-22 · UE P1：PIE 截图复现（HUD 验证通过，构图仍未过）**
  - 新增 `AWordQuestMemoryGameMode`（SpectatorPawn + WordQuestHUD）并切到 U1A；`smoke_u01a_pie.py` 可稳定 PIE + 截图。
  - 日志确认 HUD：`[memory-hud] begin/loaded 25 lines/130 words`，HUD=WordQuestHUD；截图 `Saved/Screenshots/u01a_pie.png`。
  - 问题：Python 的 PlayerController 无 `set_view_target`，无法切到 cam_00；当前截图被近处几何挡满，构图不可验收。下一轮用 C++ 设 ViewTarget / `take_automation_screenshot_at_camera` 再验。

- **2026-10-22 · UE P1：PIE 带视口验证（第一次真实截图）**
  - `smoke_u01a_pie.py`：PIE 启动 → 2s → 记录 world/pc/hud → 1600×900 截图 → 结束；日志确认 `[memory-hud] begin/loaded 25 lines/130 words`，HUD=WordQuestHUD。
  - 新增 `AWordQuestMemoryGameMode`（DefaultPawn=ADefaultPawn），U1A 已切到该 GameMode，避免第三人称身体穿帮；损坏的 Source body 占位已移除。
  - 截图：`Saved/Screenshots/u01a_pie.png`；暴露的问题：出生点/构图被墙挡满、灯光偏亮、角色/MetaHuman 未进场、字幕位置需调。
  - 下一步：修 PlayerStart/相机构图、降低曝光、再截一张可读的垂直切片图。

- **2026-10-22 · UE P1：E 收集 + PlayerStart（部分验证）**
  - 词卡改为按 E 收集；增加 `[E] 记住` 提示；L_Unit01A 加 `PlayerStart_Memory`（-260,260,90 / yaw 180）。
  - 编译通过；无头 `-game` 成功加载 L_Unit01A（Game class=WordQuestGameMode，进入 play），但**日志无 `[memory-hud] begin`**，HUD 未在无头模式按预期 BeginPlay；待 PIE/Automation 带视口验证，不宣称 HUD 已可用。

- **2026-10-22 · UE P1：词物件 + 视线词卡（已编译）**
  - `build_u01a_words.py` 生成 11 个 `word_<wordId>` actor（碰撞 BlockAll）；L_Unit01A 共 **59 actors**。
  - `AWordQuestHUD` 增加视线射线（600cm）→ 词卡：英文词/音标/英文例句优先 + 弱化中文；记录已触碰词数 `MEMORY · n`。
  - `Build.sh WordQuestUEEditor Mac Development` 编译通过；待 PIE 验证、断片/记忆匣。

- **2026-10-22 · UE P1：极简回忆 HUD（Canvas，已编译）**
  - `AWordQuestHUD` 新增 memory mode：U1A 地图不画学习面板，只画轻黑边/极淡 MEMORY 角标/底部英文字幕（自动换行、中文 0.32 alpha）/右下进度；数据运行时读 `Content/Data/Memory/scenes.json`（unit01_section_a）。
  - U1A WorldSettings 的 GameMode 已设为 `WordQuestGameMode`（`Tools/set_u01a_gamemode.py`）。
  - `Build.sh WordQuestUEEditor Mac Development` 编译通过；待 PIE 试玩验证、词卡/断片/触碰、UMG 化。

- **2026-10-22 · UE P1：LS_Unit01A Sequencer 相机 Cut（完成）**
  - 新增 `Tools/build_u01a_sequence.py` + `Tools/check_u01a_sequence.py`；`/Game/Memory/Sequencer/LS_Unit01A` 已生成。
  - 实测：1 条 Camera Cut Track、3 段 cut（0–300/300–600/600–870 @30fps），3 个相机 binding 均绑定成功。
  - 待补：句子/字幕/显形事件、运行时 playback range（默认 0–150）；随后做极简 UMG 与触碰交互。

- **2026-10-22 · UE P1：U1A 角色持久占位（完成）**
  - 确认 MHC preview actor 无法保存（transient 设计）；改用 `/Game/Characters/<id>/Source/*_body` 网格生成持久 SkeletalMesh/StaticMeshActor。
  - `build_u01a_characters.py` 现可把 5 人（me2026/lin/mei/an/rui）摆进 L_Unit01A；检查脚本确认 **48 actors**（43 场景 + 5 角色）。
  - 下一步：Sequencer（相机/句子/部件显形事件）；真正 MetaHuman 外观走运行时 spawn 或补 BP。

- **2026-10-22 · UE P1：U1A 场景 + MetaHuman 进场验证（部分完成）**
  - U1A 关卡已按正式尺寸/材质/灯光/相机重建（43 actors）；`Tools/build_unit01a_scene.py` 可幂等重建。
  - 新增 `Tools/build_u01a_characters.py`：5 个 MetaHuman 在编辑器内 spawn 成功，但**引擎规定 MHC 预览 actor 不可保存进关卡**（保存后仍 43 actors）；已写入 `Docs/design/ue-scene-pipeline.md` §11。
  - 下一步：做运行时 spawn 的 `MemorySceneDirector`，或生成持久 `BP_<id>`；随后接 Sequencer/UMG/性能。

- **2026-10-22 · UE 场景管线 P1 第一步：U1A 关卡片段（完成）**
  - 新增 `Tools/build_unit01a_scene.py` / `Tools/check_unit01a_scene.py`；生成 `/Game/Memory/Scenes/L_Unit01A`：11×8m 房间、长桌椅子/黑板/书架/灯/植物、6 个自建材质、DirectionalLight+SkyLight+RectLight+点光+雾、按 shots 的 3 台 CineCameraActor。
  - 实测：关卡已保存，检查脚本统计 **43 actors**（32 StaticMesh / 3 CineCamera / 3 灯 + 雾）。
  - 未完成：角色（暂无 BP_<id>）、Sequencer、UMG HUD、性能实测；截屏 API 在无头编辑器下不可用（已记录，不影响关卡）。
  - 文档：`Docs/design/ue-scene-pipeline.md` 第 10 节。

- **2026-10-22 · UE 场景管线 P0：数据导出 + 18 篇白盒关卡（已完成）**
  - 导出：`Content/Data/Memory/scenes.json`（18 篇 stage+script 纯数据，630KB）、`stages.json`（18 舞台，64KB）。
  - 校验：`Tools/validate_memory_scenes.py` → `validation.json`：18 scenes / 18 stages / **0 errors**。
  - UE 导入：`Tools/import_memory_scenes.py`（白盒生成）；已通过 `run_ue_serial.sh` 实跑，生成 **18 个白盒关卡** `/Game/Memory/Whitebox/L_<unitXX_section_x>`，含 piece 白盒、CameraActor、slots/wordId/actor TargetPoint。
  - 文档：`Docs/design/ue-scene-pipeline.md` 第 9 节记录 P0 进展。
  - 下一步：U1A（clubRoom）正式 EnvKit + Sequencer 垂直切片；白盒 piece 位置目前仅按 target 名近似，需在切片中替换。

- **2026-10-22 · 选择 B：UE 场景管线迁移方案（完成方案文档）**
  - 产出：`Docs/design/ue-scene-pipeline.md`（目标/非目标、现有资产盘点、目标架构、数据格式、性能预算、P0–P4 阶段、风险与验收）；`Content/Data/Memory/scene-schema.sample.json`（U1A 的 StageDef/MemoryScript 简化 schema 样例）。
  - 结论：UE 版目标为 **PC 1440p 60fps + Nanite/Lumen/VSM + Sequencer 演绎 + 极简 UMG**；不是浏览器里做《地平线》级。
  - 现有可复用：7 个 MetaHuman、Groom、服装、6 个单元 RW3 地标网格、`L_Main`、Nanite/Lumen/VSM 配置、`acts.json`；Web 侧 18 舞台/脚本作为数据源。
  - 工期估计：垂直切片 U1A 约 1 个月；18 篇接近发行级约 5–8 个月（1 技术美术 + 1 UE 程序）；写实资产需授权/采购。
  - 下一步 P0：写 Web→JSON 导出器（18 篇 stage/script 纯数据）→ UE Python 导入 DataAsset/Level Instance → U1A 白盒垂直切片。

- **2026-10-22 · 质量 pass 第二轮（L2 材质第一层）**
  - 新增 `stages/microSurface.ts`：给 15 个新舞台里无贴图的纯色 `MeshStandardMaterial` 加对象空间微表面噪声（颜色/粗糙度微变化），不依赖 UV、不改基调；跳过玻璃/自发光/现有 interior 材质。
  - `dress.ts` 增加窗口层：淡窗光 + 斜向光束（加法混合、低透明），让窗“有方向”，不是一块平光。
  - `docs/quality-bar.md` 更新：L2 标为“部分完成（微表面+窗光）”，L3 灯光仍未做。
  - 验证：`npx tsc --noEmit` ✅；`npx vitest run` → **874 passed**；`npx vite build` ✅。
  - 下一轮：L3 逐场景布光（主光/补光/实用光源、灯罩发光、色调分级），再进逐篇手写重点戏。

- **2026-10-22 · 质量 pass 第一轮（陈设密度 + 质量基线文档）**
  - 新增 `stages/dress.ts`：给 15 个新舞台自动补陈设（墙面画/地图、地面箱子/行李/植物、桌面纸笔杯子、书架书脊），细节挂在部件组上随文章演绎显形；原 clubRoom/apartment2090/emptyRoom 不动以保原网格预算。
  - 新增 `docs/quality-bar.md`：视觉 L0–L4、情节演绎、英语学习、内容正确性、学习效果五层基线；当前明确标出已完成/未完成。
  - 验证：`npx tsc --noEmit` ✅；`npx vitest run` → **874 passed**；`npx vite build` ✅。
  - 下一轮：L2 材质/纹理 pass（木/布/纸/金属/玻璃 + 窗景层次），再 L3 灯光。

- **2026-10-22 · 学习质量基础升级（英语词卡 / 表演层 / 内容 lint）**
  - 词卡改为**英文优先**：先显示英文例句与搭配，再以弱化样式显示中文义（`hud.ts` / `MemoryStage` 透传 `example`/`collocation`；130 词均有英文例句）。
  - 表演层：新增 `scripts/choreography.ts`——按句子动词给 organizer/student 选动作（talk/read/write/point/listen），已接入 u01b/u01c 与单元 2–6 共 15 篇；每一幕至少有 1–2 个角色动作 cue，带单测。
  - 内容质量 lint：新增 `scripts/lint_content.mjs`（npm `lint:content`）→ `docs/content-quality-report.md`。当前 6 单元 / 18 课文 / 130 词 / 23 阅读 / 24 听力 / 72 微检查 / 24 翻译 / 6 写作 / 24 提纲：**0 errors，0 warnings**（结构、字段、答案越界、词表引用均通过）。
  - 验证：`npx tsc --noEmit` ✅；`npx vitest run` → **874 passed**；`npx vite build` ✅。
  - 仍未完成（不掩盖）：三维场景仍是 blockout 级美术；逐篇手写剧情/表演、英文产出闭环、录音配音、学习效果试玩与前后测 —— 这些不是自动测试能保证的。

- **2026-10-22 · 读写 3 单元 5–6 六篇舞台/脚本（18/18 全完成）**
  - 单元 5：`moonExhibit.ts`（任务展）、`controlRoom.ts`（鹊桥控制室）、`astronautHall.ts`（航天员训练区），脚本 `scripts/u05.ts`。
  - 单元 6：`bookstore.ts`（老港区书店）、`bookExchange.ts`（校园换书角）、`countyLibrary.ts`（云河县图书馆），脚本 `scripts/u06.ts`。
  - 场景清单：`docs/textbook-rebuild/scenes/unit05.md`、`unit06.md`；`plan-next.md` 更新为 18 篇全部完成。
  - 测试：18 篇均通过 `validateScript` + 全部件显形覆盖；舞台测试覆盖 18 个手写舞台（含高铁窗外动画）。
  - 验证：`npx tsc --noEmit` 通过；`npx vitest run` → **871 passed**；`npx vite build` 成功。
  - 进度：**读写 3 的 18 篇文章（6 单元 × Text A / Text B / Stories of China）全部有专属三维舞台与手写脚本**。
  - 下一阶段：教材包导入后的 `passageOverride` 长文验证、把 New words / Understanding / Banked cloze / Translation / Collocation 等练习落成场景交互（PRD P3）。

- **2026-10-22 · 读写 3 单元 4 三篇舞台/脚本：完成**
  - 新增舞台：`careerWorkshop.ts`（校园职业工作坊）、`violinWorkshop.ts`（小提琴作坊）、`embroideryWorkshop.ts`（苏州绣坊），已注册。
  - 新增脚本：`scripts/u04.ts`（三篇舞台、开场旁白、人物；保留 `passageOverride`），已注册。
  - 高铁确认：`highSpeedTrain` 车厢 + 窗外景观动画已接入，新增单测验证 animate 移动景观、车厢本体不动。
  - 场景清单：`docs/textbook-rebuild/scenes/unit04.md`；`plan-next.md` 已更新。
  - 验证：`npx tsc --noEmit` 通过；`npx vitest run` → **859 passed**；`npx vite build` 成功。
  - 进度：单元 1–4 共 12/18 篇有专属舞台；余下单元 5–6 共 6 篇。

- **2026-10-22 · 读写 3 单元 3 三篇舞台/脚本：完成**
  - 新增舞台：`word-quest-game/src/features/memory/stages/travelLounge.ts`（小城旅店前厅）、`soloStation.ts`（夜晚火车站大厅）、`highSpeedTrain.ts`（高铁车厢，窗外景观持续动画），已注册。
  - 新增脚本：`scripts/u03.ts`（三篇的舞台、开场旁白、人物/向导；保留 `passageOverride`），已注册。
  - 场景清单：`word-quest-game/docs/textbook-rebuild/scenes/unit03.md`；`plan-next.md` 已更新。
  - 测试：unit3 三篇引用校验 + 全部件覆盖；舞台测试扩展到 8 个新舞台。
  - 验证：`npx tsc --noEmit` 通过；`npx vitest run` → **852 passed**；`npx vite build` 成功。
  - 进度：单元 1–3 各 3 篇有专属舞台（9/18 篇）；余下单元 4–6 共 9 篇。

- **2026-10-22 · 回忆 UI 缩小淡化、去掉地点/篇名提示：完成**
  - 进入回忆的过渡层（`MemoryEntryTransition`）不再显示篇名/地点：只留一枚极小的 `MEMORY RECALL` + 一条细线，标题、副标题、提示文字全部移除（CSS 同步缩小、降低不透明度）。
  - 回忆结束的定格卡不再显示文章标题/单元名（`autoScript`、`u01a` 的 freeze caption 置空）；保留 u01a 的尾声独白。
  - 整体 HUD 缩小/淡化：视角角标 8px/0.38 透明度、退出按钮 24px/低对比、字幕 18–27px、中文 10–12px/0.55、提示胶囊与选项按钮更小更淡、词签更小、摇杆 0.5 透明度。风格保持“科技记忆”的冷光/扫描线。
  - 验证：`npx tsc --noEmit` 通过；`npx vitest run` → **846 passed**；`npx vite build` 成功。

- **2026-10-22 · 读写 3 单元 2 三篇舞台/脚本 + 全件显形修复：完成**
  - 新增舞台：`word-quest-game/src/features/memory/stages/archiveExhibit.ts`（校史展厅）、`hepburnGallery.ts`（Hepburn 小展厅）、`chartRoom.ts`（郑和海图室），已注册。
  - 新增脚本：`scripts/u02.ts`（三篇各自的舞台、开场旁白、人物出场；保留 `passageOverride`），注册进 `scripts/index.ts`。
  - 引擎修复：`autoScript.ts` 原先只把剩余舞台部件分给前 N 幕（多出的永不显形），改为按幕均分 → 所有部件都会在文章演绎里出现；新增 unit2 全件覆盖测试。
  - 场景清单：`word-quest-game/docs/textbook-rebuild/scenes/unit02.md`；`plan-next.md` 已更新。
  - 验证：`npx tsc --noEmit` 通过；`npx vitest run` → **846 passed**；`npx vite build` 成功。
  - 当前进度：单元 1（3 篇）+ 单元 2（3 篇）有专属舞台；余下单元 3–6 共 12 篇。

- **2026-10-22 · 读写 3 单元 1 三篇舞台（继续写代码）：完成**
  - 新增舞台：`word-quest-game/src/features/memory/stages/bedroomDawn.ts`（宿舍清晨，22 个可显形部件）、`clinicRemote.ts`（山区诊室，21 个部件），已注册进 `stages/index.ts`；各含 bounds/slots/4 机位/环境/窗口天气。
  - 新增手写脚本：`scripts/u01b.ts`《床头的光》→ bedroomDawn（清晨旁白 + 年轻的我坐在床沿）、`scripts/u01c.ts`《山那边的诊室》→ clinicRemote（周医生/奶奶/年轻的我），已注册；B/C 不再共用 emptyRoom。
  - 场景清单：`word-quest-game/docs/textbook-rebuild/scenes/unit01.md`（A/B/C 地点/时间/人物/物件/光线/段落映射/机制，样板块）。
  - 测试：`scripts.test.ts` 更新 B/C 舞台断言并校验引用；`stages.test.ts` 新增新舞台部件/摆放位/机位检查。
  - 验证：`npx tsc --noEmit` 通过；`npx vitest run` → **840 passed**；`npx vite build` 成功。

- **2026-10-22 · 游戏场景双线改造（用户方向：文章演绎 × 词造世界）：完成**
  - 读写 3（`word-quest-game`）：文章演绎线保留（`autoScript/buildActs` 按段落逐句显形）；新增 `mem-tech` 科技记忆质感（扫描线/冷光/边缘光词签/宽银幕）；**少提示**——默认纯英文字幕（ZH 按需开）、自由触碰不弹完整词签（只留微小边缘光点）、断片才显示候选词签；HUD 维持极简。
  - CET 4/6：新增独立「词造世界」模式 `src/features/wordworld/`（`combine.ts` 纯逻辑 + `WordWorldScreen.ts` Canvas 场景 + `wordworld.css`）：自由选 2–4 个词 → 角色（物件/动作/性质）→ 地形/天气/结构/调色配方 → 立即建造；同组词确定性生成同一世界；四级/六级切换；本机记录 `WORLDS · N`；入口在地图右下 ✦。
  - 设计文档：`word-quest-game/docs/gdd-scene-modes.md`；`plan-next.md` 已记录。
  - 验证：`npx tsc --noEmit` 通过；`npx vitest run` → **838 passed**（新增 wordworld 6 项）；`npx vite build` 成功。未做浏览器实机截图（可起 dev server 试玩）。

- **2026-10-22 · 教材提取审查 + 接入项目（后续按教材改造）：完成**
  - 审查：`Docs/qa/textbook-extract-audit.md`。结构检查通过（6 单元 / 12 篇 Text A/B / 6 篇 Stories / 506 词 / 270 题 / 6 段翻译）；文章页覆盖率 Text A 98–100%、Text B 90–100%（已剔除 Reading skills 说明页）。
  - 审查中修复 10 类问题：Section C 首单元识别、Text B 正文起点裁剪、页眉/词数行混入、选择题选项续行、OCR 标题别名、词首 A 标记、重复标题合并、故事/翻译同页拆分、**55 处高置信 OCR 纠错**（正文/题目 + 中文提示）、Culture notes 截断、单词释义注释过滤。
  - 接入：`Tools/data_textbook_bridge.py` → `Content/Data/content/textbook_units.json`（6 单元文章/单词/题目/翻译提示，`needsProofreading: true`，答案留空）+ `textbook_vocabulary.csv`（506 词，字段同 DT_Vocabulary）；约定文档 `Docs/data/textbook-integration.md`，`rw3-schema.md` 增加教材基准说明。
  - 明确未伪造/需另编：答案与解析、听力原文、微检查、写作提纲、参考译文、可靠音标；教材原文仅在本地项目使用，公开/分发前确认授权。
  - 验证：`pytest Tools/qa/tests -q` → **144 passed**（新增 `test_textbook_bridge.py` 3 项；教材提取 7 项）。

- **2026-10-22 · 英语教材提取进项目（用户新任务）：完成**
  - 源：用户本地 `~/Downloads/新视野大学英语（第四版）读写教程3思政智慧版.docx`（176 张页图，无文字层）；docx 解压 + 按 document.xml 还原页序 → macOS Vision OCR（zh-Hans/en-US，保留 y/x）→ 双栏排序 → 规则解析。
  - 工具与数据：`Tools/data_textbook.py`（解析/导入/导出，幂等）、`Docs/data/textbook-rw3.md`（方法/页码映射/限制/版权提示）、`Tools/qa/tests/test_textbook_extract.py`（7 项验收）；产物在 `Content/Data/textbook/rw3/`（`textbook.json`、`words.csv`、`questions.csv`、`units/unit01–06.md`、`pages/page_001–176.txt`，共 1.6 MB）。
  - 提取结果（已统计）：6 单元；Text A 50 段（每篇约 660–940 词）、Text B 72 段（每篇约 890–1030 词）；单词 506 条（505 条含中文释义，音标 506 条）；题目 270 道（理解/词汇/结构/写作，44 道带 A–D 选项）；Stories of China 短文 6 篇；Section C 翻译提示 25 行。
  - 已知限制：OCR 有误读（已做标题别名/词首标记词典纠正），段落号/选项/释义偶有错位；教材答案、听力原文、二维码数字资源不在 docx 内，未伪造。
  - 版权提示：教材原文仅存在本地项目供个人学习使用；**公开仓库/分发前需确认授权**，必要时把 `Content/Data/textbook/` 加入 `.gitignore`（已写入 `Docs/data/textbook-rw3.md` §7）。
  - 验证：`pytest Tools/qa/tests -q` → **141 passed**。

- **2026-10-22 · D21 补测（Claude 新一轮渲染后）**
  - 男主 10:01 渲染复测：closeup **ΔE00 8.41**（ΔL +5.98 / Δa −5.29 / Δb −8.32）、front **ΔE00 8.48**（+5.25 / −4.29 / −8.06）——仍偏暗/红/黄；建议 **U↓、V↓**，目标 ΔE00 ≤5。
  - ⚠️ 与 Claude 计划对照：`U=0` 方向正确（更亮/去红），但 **V=0.45 是升高方向**，按标定会让 a/b 再升高；建议先 `V 0.42→0.34` 复测（已写入 `Docs/qa/skin-me2026.md` 第 6 节）。
- **2026-10-22 · D22 配角调参效果验证：完成（5 人全部复测）**
  - 5 位配角已于 09:58–10:03 完成重建/重渲染；已为 5 人重渲 target 并生成 `{mei,an,rui,organizer,old2090}-conform-diff.md`。
  - 结果（详细表见 `Docs/qa/cast-tuning.md` 第 6 节）：
    - **rui**：head_aspect 2.051→**1.981**（−3.4%，仍差 1.6%）、face_lw 1.312→1.278（达标）；第二轮 `headAspect -0.45→-0.40`、`headScaleVert -0.12→-0.14`。
    - **mei**：head_aspect 2.346→**2.221**（达标边缘）；但 eye_width_ratio 0.2015→**0.1985（反而变小）**；第二轮 `eyeSize 0.65→0.80`、gain 1.35→1.6、`headAspect -0.48→-0.45`。
    - **old2090**：jaw_cheek 0.908→0.905（目标 ≤0.885 未达）、nose_chin_delta 0.130→0.139（更后缩）、neck_depth 0.729→0.741；第二轮 `jawWidth -0.25→-0.35`（gain 1.2→1.5）、`neck-double-incr 0.1→0.05`、`jawLength 0.20→0.30`。
    - **an**：head_aspect 1.778、jaw_cheek 0.906 均在区间；eye_width 0.198 略低，可 `eyeSize -0.1→0.0`。
    - **organizer**：eyes 0.198→0.204（改善）；head_aspect 2.016→**2.091（更显长）**；第二轮 `headAspect 0.10→0.16` 或 `headScaleVert -0.06`。
  - 看板已用最新渲染刷新（7/7）：me2026 front 4.11 / q34 7.99（趋势变好）；lin 6.27/7.77（新渲染变差，待 Claude/Codex 复核）；配角均更新；发丝验收仍 N/A（等 Groom 白底渲染）。
  - 验证：`pytest Tools/qa/tests -q` → **134 passed**。

- **2026-10-22 · D21 皮肤颜色校准工具：完成（已先跑男主）**
  - 工具：`Tools/qa/skin_color.py`（MediaPipe 468 点分区采样两颊/额头/鼻梁/下巴/颈部 + 多候选点与肤色范围/阴影过滤 + 背景白点白平衡 + CIE Lab/ΔE2000）、`Tools/qa/skin_suggest.py`（ΔL/Δa/Δb → U/V 方向与步长，标定来自 Claude 的 `me_skin` 样本）；测试 `test_skin_color.py`（Lab 已知值/ΔE2000 标准样例/白平衡/采样）、`test_skin_suggest.py`（方向/步长/标定符号）。
  - 标定：`me_skin.png`（默认 U=0.22 V=0.42 → Lab 67.60,15.14,18.38）与 `me_skin_idx12.png`（U=0.06 V=0.30 → 70.69,13.94,18.18）⇒ **dL/dU≈−19.3**（U 降→变亮）、**da/dV≈+10.0 / db/dV≈+1.67**（V 升→更红、略黄）；idx40 提示 `face_texture_index` 也影响 b。
  - 男主结果（`Docs/qa/skin-me2026.md` + `skin-me2026.json`，渲染 09:17、参考 lian1）：
    - closeup 聚合 **ΔE00 8.92**（ΔL +7.37 / Δa −6.41 / Δb −9.15）；front 聚合 **ΔE00 9.07**（ΔL +5.96 / Δa −4.58 / Δb −8.80）
    - 结论：渲染**偏暗、偏红、明显偏黄**；建议 **降低 U（更亮）**、**降低 V（更冷/去黄红）**，每轮 U −0.04~−0.06、V −0.06~−0.08，一轮估计 `U 0.22→0.16、V 0.42→0.34`；目标 `|ΔL|≤2、|Δb|≤4、ΔE00≤5`；仍偏黄则对比 face_texture_index 0/12/40。
  - 局限已写进报告：白平衡假设中性背景、渲染/参考光照与材质差异带来 5–10 ΔE 残差、颈部在小图可能不可见。
- **2026-10-22 · D22 配角调参效果验证：进行中（已验 rui，其余待重渲染）**
  - 已对更新后的 rui（09:18 渲染）重测并重渲 target：`head_aspect 2.051 → 1.997`（−2.6%）、`face_lw 1.312 → 1.284`、`forehead_visible 0.482 → 0.456`、`jaw_cheek 0.891 → 0.906`、`eye_width 0.201 → 0.204` —— 调参方向正确，但 head_aspect 仍高于目标 1.95；**第二轮建议**：`headAspect -0.45→-0.38`、`headScaleVert -0.12→-0.16`（预期 1.94–1.96）。另 target→MHC front 4.93→6.38 px（已重渲 target），需 Claude 用 `rui-conform-diff.md` 复核 q34/side 拟合。
  - 结果已写入 `Docs/qa/cast-tuning.md` 第 6 节；mei / an / organizer / old2090 的对比渲染仍是旧图（22:29–22:37），待 Claude 重渲染后按同一命令复测。
  - 看板 `Docs/qa/dashboard.md` 已刷新：me2026 恢复正常（front 4.30 / q34 8.68 / 脸 IoU 0.960，趋势“变好”）；7/7 角色均有数据；发丝验收仍 N/A（皮肤预览 + 渐变背景，等 Groom 白底渲染）。
  - 测试：`pytest Tools/qa/tests -q` → **134 passed**。

- **2026-10-22 · D19 配角形体调参建议：完成**
  - 工具：`Tools/qa/cast_proportions.py`（MediaPipe 468 点比例 + 剪影几何）、`Tools/qa/tests/test_cast_proportions.py`（合成关键点验证 6 项比例 + 侧面下巴突出度 + 尺度不变性）；实测数据 `Docs/qa/cast-proportions.json`；建议文档 `Docs/qa/cast-tuning.md`。
  - 实测关键值：rui `head_aspect 2.051`（男配角最高，an 1.825，+12.4%）、`face_lw 1.312`（参考上界）；mei `eye_width_ratio 0.202`（同口径 lin 0.214，小 5.6%）、`head_aspect 2.346`；old2090 `jaw_cheek 0.908`、`nose_chin_delta 0.130`（全场最大，下巴最后缩）。
  - 已给 `build_cast.py` 具体改法（**文件由 Claude 修改**）：
    - rui：`headAspect -0.65→-0.45`、`foreheadHeight 0.55→0.35`、`jawWidth -0.45→-0.40`；MAP 增益 `head/head-scale-horiz 1.0→0.8`、`forehead/forehead-scale-vert 1.0→0.85`，可选新增 `head/head-scale-vert -0.12`
    - old2090：`neck-double-incr 0.3→0.10`；新增 `face(jawWidth=-0.10, jawLength=0.15, cheekFull=-0.10)`；MAP `chin/chin-width 1.0→1.2`、`chin/chin-height 1.0→1.2`，可选新增 `neck/neck-scale-horiz -0.15`
    - mei：`eyeSize 0.45→0.65`、`headAspect -0.55→-0.48`、`foreheadHeight 0.1→0.0`；MAP `eyes/*-eye-scale 1.0→1.35`
    - an/organizer：基本在区间内，给可选微调（an `jawLength 0.20→0.28`；organizer `eyeSize -0.35→-0.30`）
  - 判据已写进文档（rui head_aspect ≤1.95；mei eye_width ≥0.212；old2090 jaw_cheek ≤0.885、nose_chin_delta ≤0.115）。
- **2026-10-22 · D20 看板刷新 + 发丝验收准备：完成**
  - 看板已刷新为 **7/7 角色**（`Docs/qa/dashboard.md`，`history.csv` 追加）：lin 4.61/4.80/0.941；mei 4.07/3.57/0.954；an 6.18/5.19/0.953；rui 4.93/—/0.969；organizer 3.88/4.03/0.959；old2090 7.40/7.06/0.943。
  - me2026 本次标 **N/A**：`Saved/Compare/me2026/front.png` 当前是**发丝诊断特写图**（Codex 的 groom 诊断覆盖了对比渲染，且 capture/back/closeup 缺失）；等重新渲染后自动恢复。已让看板支持 “capture.json 缺失时用现有渲染继续”，并在逐角色备注中说明。
  - 发丝验收代码已加入 `dashboard.py`：
    - 主角：与 `Docs/qa/ref_masks` 对比头发 IoU（含“渲染头发面积与参考差 >50% 时跳过”的保护）；
    - 配角：`hair_acceptance` — 覆盖率（相对头部扩展框）、`top_excess`（马尾/寸头/后梳的分型阈值）、飞出头部比例；发色 vmax 按角色配置；
    - 背景不均匀（渐变/彩边）或皮肤预览无头发时自动 N/A 并注明原因。
  - 测试：新增 `Tools/qa/tests/test_hair_acceptance.py`（寸头贴头 PASS、高马尾超头顶 PASS、无头发 N/A、飞出头部 FAIL、capture 缺失不中断）+ 既有测试；`pytest Tools/qa/tests -q` → **123 passed**。
  - 当前所有发丝验收均为 **N/A**：MHC 预览是无头发皮肤、且背景为渐变（不是白底），等 Codex 导入 Groom 并按白底约定重渲染后，此项才会出真实 PASS/FAIL。

- **2026-10-21 · D17 补完上一轮（映射 / q34 空图 / D15-D16 补记）：完成**
  - 映射核对：`report.py` 男主 front=lian1/q34=lian3/side=lian2，女主 front=lian5/**q34=lian7**/**side=lian6**；`conform_report.py`、`run_blender_preview_report.py`、`Docs/qa/README.md` 同步。重跑 `report.py me2026` / `report.py lin`。
  - target_q34 空图修复（两个根因）：
    1. `mathutils.Matrix` 参数是“行”，相机局部轴需要“列” → 改为传入 right/up/z 后 `transposed()`；
    2. `ue_camera.ue_rotation_basis` 的 pitch 符号与 UE 相反（UE pitch 正=抬头，forward.z=sin(pitch)）→ 用 `_rot_y(-pitch)`。
    - 修复后 target_q34 有效：me2026 前景 442,163 px、lin 342,697 px（修复前为 0）。相关单元测试新增（pitch 约定、投影一致性 <1 px）。
  - `conform_report.py` 剪影改为 **468 点凸包 IoU**（不再依赖灰底/HDRI 背景分割），并保留颈部左右不对称指标与自动诊断。
  - 已生成并重跑：`Docs/qa/{me2026,lin,mei,an,organizer}-conform-diff.md`（各 5 视图）；`Docs/qa/me2026-report.md`、`lin-report.md` 已按更正后的映射更新。
  - 关键结果（front）：me2026 照片→目标网格 **4.35 px** / 目标网格→MetaHuman **5.47 px**（脸廓 7.49、嘴 6.62，凸包 IoU 0.959）；lin 5.58 / 4.61（脸廓 7.43，凸包 IoU 0.941，**下颌/颈部左右不对称 8.0%** —— 与 Claude 观察到的颈部扭曲一致）。q34：me2026 14.11→8.72（目标网格本身偏差大，MHC 拟合反而更接近参考）；lin 5.47→4.80。
- **2026-10-21 · D15 拟合误差诊断（target mesh vs MetaHuman）：完成**
  - 产出：`Tools/qa/ue_camera.py`（UE↔Blender 坐标/相机换算、正交投影，纯 math）、`Tools/qa/render_target_like_ue.py`（Blender 无头，按 capture.json 渲染 target 五视图）、`Tools/qa/conform_report.py`（分区关键点误差 / 凸包 IoU / 颈部不对称 / 自动诊断）、`Tools/qa/tests/test_ue_camera.py`、`test_conform_report.py`。
  - 已渲染 target：me2026、lin、mei、an、organizer（各 5 视图，输出 `Saved/Compare/<id>/target_*.png`）；rui/old2090 等 Codex 渲染完成后补跑。
  - 诊断结论：me2026/lin 的 **“目标网格→MHC”误差与“照片→目标网格”同量级**（4–5.5 px），局部以**脸廓/下颌**最大；lin 的颈部不对称 8% 提示 MHC 颈部/下颌拟合偏差；me2026 q34 的误差主要来自目标网格（14.1 px），MetaHuman 阶段反而降到 8.7 px。
  - 限制：MHC 预览为“皮肤、无头发”，头发相关指标不可比（dashboard 已自动跳过）；脸部凸包 IoU 不含头发。
- **2026-10-21 · D16 动画与表演规格：完成**
  - 产出：`Docs/design/animation-spec.md`（技术基线/优先级分层/通用动作库/角色表演特征/状态机/与 acts.json 对接/性能验收/版权）、`Content/Data/anim/anim_manifest.csv`（**88 条**，字段 `anim_id, character, category, loop, priority, source`）、`Tools/data_anim_manifest.py`、`Tools/qa/tests/test_anim_manifest.py`。
  - 面部配方：温和的笑 / 紧张的笑 / 惊讶 / 叹气 / 回忆失焦 / 专注 / 倾听 / 开口说话 / 悲伤 / 强忍，全部给出 ARKit 曲线与权重。
  - 验证：manifest ID 唯一、7 角色均有动作、类别/优先级/来源合法、文档含角色特征与 ARKit 配方。
- **2026-10-21 · D18 全员验收看板：完成**
  - 产出：`Tools/qa/dashboard.py`（7 角色总览 + 逐角色视图/比例 + 拟合误差拆分 + 头发 IoU + 渲染时间 + PASS/FAIL + 历史趋势）、`Docs/qa/dashboard.md`、`Docs/qa/history.csv`（每次运行追加）、`Tools/qa/tests/test_dashboard.py`。
  - 当前状态（**6/7 有数据**；me2026 因 Codex 正在重渲染，本次 capture 暂缺 → N/A，渲染完成后重跑即可）：
    - lin FAIL（front 4.61 / q34 4.80 / 脸 IoU 0.941 / 照片→目标 5.58）
    - mei FAIL（4.07 / 3.57 / 0.954）
    - an FAIL（6.18 / 5.19 / 0.953）
    - rui FAIL（front 4.93、closeup 7.57；脸 IoU 0.969/0.930；比例 target 1.25/0.44/0.27 → MHC 1.29/0.44/0.28）
    - organizer FAIL（3.88 / 4.03 / 0.959）
    - old2090 FAIL（front 7.40 / q34 7.06 / closeup 11.02；脸 IoU 0.929/0.943/0.927；下颌/颈部为主要偏差）
    - me2026 N/A（重渲染中；上次数据：front 5.47 / q34 8.72 / 脸 IoU 0.959 / 照片→目标 4.35）
  - 工具限制：Blender target 网格无眼球/贴图，MediaPipe 在部分 q34/side/back target 图上检测不到脸（已在逐角色备注里标出，不影响 MHC 侧渲染检测）；LOD/头发指标在皮肤预览阶段跳过。
  - 配角用“目标网格 vs MHC”+ 脸长宽比/眼距/鼻宽比例对照（无参考照片）；头发 IoU 在皮肤预览阶段自动跳过并写明原因。
  - 验证：`pytest Tools/qa/tests -q` → **115 passed**。

- **2026-10-21 · D12 学习界面设计规格：完成**
  - 产出：`Docs/design/learning-ui.md`（290 行）—— 2090 记忆基调（冷蓝/磨砂/扫描线/胶片颗粒）、信息架构、9 个界面（单元选择/学习 Hub/词汇卡/阅读/听力/翻译/写作/小测/结果）逐项含 ASCII 线框、`DT_Content_*`/`DT_Vocabulary` 数据绑定、状态机、桌面/手机适配、无障碍（字号/对比度/键盘手柄/减少动态/字幕）、`ST_UI` key 约定、UMG 实现注意。
  - 测试：`Tools/qa/tests/test_design_doc.py`（9 界面覆盖、DT 绑定、状态机/适配/无障碍关键词、ST_UI 约定）→ 全部通过。
- **2026-10-21 · D13 配音台词清单：完成**
  - 产出：`Tools/data_vo_manifest.py`、`Content/Data/vo/vo_manifest.csv`（**441 条**，估算 **46 分钟**）、`Content/Data/vo/vo_summary.json`、`Docs/data/vo-manifest.md`、`Tools/qa/tests/test_vo_manifest.py`。
  - 统计：tts_reader 359 条（课文朗读，TTS，≈42 min）；narrator 76 条（旁白，建议真人）；old2090 3 条 / lin 1 / rui 1 / system 1（真人优先）。
  - 验证：line_id 唯一、说话人均在角色表 + tts_reader/narrator/system、字段非空、6 单元都有课文朗读行、条数与 summary 一致。
- **2026-10-21 · D14 本地化字符串表：完成（CSV 交付，ST_UI 导入交 Codex）**
  - 产出：`Tools/data_import_strings.py`、`Content/Data/loc/ui_strings.csv`（**126 条**，key/zh/en）、`ui_strings_for_st.csv`（StringTable 格式 `Key,SourceString`）、`ui_strings_audit.json`（扫描 `src/**/*.ts` 中文 1027 条、主表覆盖 286 条）、`Content/Data/DT_UIStrings.uasset`（过渡兜底，126 行，headless DataTable 填充）、`Docs/data/ui-strings.md`（Codex 导入说明）。
  - 测试：`test_ui_strings.py` + `test_design_doc.py` → 通过（key 唯一、zh/en 非空且不同、界面 key 覆盖、ST 格式列/行数、审计覆盖）。
  - **重要**：按 Claude 紧急指令，`/Game/Data/ST_UI` 的 StringTable 导入**不再由 DeepSeek 在 commandlet 下执行**，改由 Codex 用完整编辑器 + `Tools/run_ue_serial.sh` 导入（`Docs/data/ui-strings.md` 已写步骤）。原因见下条崩溃记录。
- **2026-10-21 · 事故记录（StringTable 导入崩溃，DeepSeek 进程）**
  - 崩溃：pid **10714 / 10878**，`CrashReport-UE-WordQuestUE-pid-10714/10878`，`Assertion failed: IsValid() [Runtime/Core/Public/Templates/SharedPointer.h:1133]`，发生在 `UAssetToolsImpl::ImportAssetsInternal`。
  - 原因：我用 `UnrealEditor-Cmd -run=pythonscript -nullrhi` + `AssetImportTask(StringTableFactory)` 导入 StringTable（`/tmp/probe_st2.py` 与 D14 首次版本）。已停止该做法，相关脚本已删除/改为 CSV-only。
  - 整改：所有 UE 进程改用 `Tools/run_ue_serial.sh`（`UE_LOCK_WHO=deepseek`）串行启动；资产导入工厂（StringTable/FBX/Alembic/贴图等）只用完整编辑器 `-ExecutePythonScript`；纯数据操作（DataTable 填充、读资产）才可用 commandlet + nullrhi；退出不依赖 `quit_editor()`。
- **2026-10-21 · D11 补记（Codex UE 渲染已产出）**
  - `Saved/Compare/me2026/{front,q34,side,back,closeup}.png` 已由 Codex 输出，已纯 Python（无 UE）生成正式报告 `Docs/qa/me2026-report.md`：当前渲染是 **MetaHuman 基础脸（无头发/无服装、灰底）**，所以 front 6.59 px、q34 14.03 px、side 脸部 IoU 0.248、头发 IoU 0.012 都还不是最终值；等头发/服装交付后重跑。
  - `Saved/Compare/lin/` 目前只有 `render.log`（Codex 渲染进行中），`Docs/qa/lin-report.md` 全部 N/A，未编造数据。
  - QA 工具已增强：`metrics.foreground_mask_auto` 用四角背景色估计前景，支持灰底/深色 lookdev 渲染（不再假设白底），`compare_silhouette`/`report`/`run_blender_preview_report` 已切换；新增 2 个合成图测试。

- **2026-10-21 · D11 主角预览验收（立刻跑）：完成**
  - 已用 `Tools/qa/run_blender_preview_report.py male|female` 生成/刷新 `Docs/qa/me2026-blender-preview.md`、`Docs/qa/lin-blender-preview.md`（并排图在 `Docs/qa/<id>_blender_preview/`）。缺失视图会标 N/A，未编造数据。
  - **男主 me2026 最差的 3 项（供 Claude 修模型）**：
    1. **头发剪影 IoU 0.210（正面）/ 0.261（侧面）** —— 头发体积与轮廓整体不对：顶部蓬起不足、刘海走向/分缝偏差、发片边缘明显。
    2. **侧面脸部剪影 IoU 0.449** —— 下颌/脸颊外轮廓与参考不符；关键点分区：正面脸廓 **8.41 px**、q34 脸廓 **10.35 px**，下巴长度与下颌角是主要偏差。
    3. **眉区/眼周关键点误差**：q34 眉区 **8.26 px**、正面左右眼 **5.20 / 5.39 px** —— 眉骨高度、眉形上挑与眼距偏大。
    补充：q34 整体关键点 6.04 px（PASS，阈值 8）；正面 4.47 px（FAIL，阈值 3）。
  - **女主 lin 最差的 3 项**：
    1. **q34 整体关键点 37.28 px（max 139.25）**：脸廓 **71.35 px**、眉 **45.95 px**、眼 32–33 px —— 全脸错位，先核对渲染机位/朝向是否与 `lian6.png` 一致，再修脸型。
    2. **侧面脸部剪影 IoU 0.246** —— 下颌/鼻颏轮廓严重不符。
    3. **头发剪影 IoU 0.399（正面）/ 0.322（侧面）** —— 齐刘海厚度、发长/发量、发梢形态都偏；另有正面嘴部 **11.12 px**、脸廓 **12.10 px** 的局部偏差。
  - 说明：以上为 **Blender lookdev 临时验收**，构图/焦距与参考图不完全一致时剪影指标会偏低；正式验收仍以 Codex 的 UE 对比相机 + `report.py` 为准。

- **2026-10-21 · D8 全部读写3 学习内容导入 UE：完成**
  - 产出：`Docs/data/rw3-schema.md`（数据字段/条数/单元分布/示例 + 建议的 C++ 行结构 `FRw3UnitRow/SectionRow/QuestionRow/ListeningRow/TranslationRow/WritingRow`）；`Tools/data_import_content.py`（纯 Python 生成 + UE 无头导入，可重复执行）；`Tools/qa/tests/test_content_import.py`；`Content/Data/content/{rw3_units.json,dt_*.csv,import-summary.json}`；UE `/Game/Data/DT_Content_*`。
  - 条数：unit 6、section 18、reading_question 23、listening_question 24、micro_check 72、translation 24、writing 6、outline_point 24（与源 JSON 完全一致）。
  - UE 导入日志（通用行结构 `/Script/JsonUtilities.JsonObjectWrapper`，列 `JsonString`）：8 个 DataTable 全部 `fill=True rows == expected`（6/18/23/24/72/24/6/24）；exit code 非 0 仅因用 error 级日志保证可见。
  - 过渡期约定：行名 `unit01`、`unit01:section_a`、`unit01:reading:0`、`unit01:listening:2`、`unit01:section_a:3`、`unit01:translation:1`、`unit01:writing`、`unit01:outline:2`；Codex 加好强类型 struct 后可切换。
  - 验证：`pytest Tools/qa/tests -q` → **75 passed**（条数/必填/单元分布/中英配对/CSV 行数）。
- **2026-10-21 · D9 记忆剧情脚本导出：完成**
  - 产出：`Tools/data_export_acts.py`（esbuild 打包 `acts/autoScript/scripts` TS → node 执行 `resolveMemoryScript`）；`Content/Data/memory/acts.json`；`Docs/data/memory-acts.md`；`Tools/qa/tests/test_export_acts.py`。
  - 结果：单元 6 / 段落脚本 18 / **幕 90（每段 5 幕）** / 台词行 98（含 prologue 5 行）；`u01a` 手写脚本 + 其余 autoScript；说话人已归一化为角色 ID（`Lin→lin`、`Rui→rui`、`Memory Recall→system`），未知说话人 0。
  - 内容：每段导出 `acts[]`（sentences/wordIds/questions/notes/gap/dialog/build/cues）、`lines[]`（kind/pov/speaker/voice/text/zh/options/camera）、`cameras[]`、`actors[]`，供 UE Level Sequence 使用。
  - 验证：`pytest` 全部通过（幕数/台词数/句子覆盖全文/wordId ∈ 词表/说话人合法/标题中英）。
- **2026-10-21 · D10 Blender 预览验收回归脚本：完成**
  - 产出：`Tools/qa/run_blender_preview_report.py <who>`（me2026/lin），用 `~/.local/share/hunyuan3d/work/fit/<male|female>_look_*.png` + `compare_landmarks` / `compare_silhouette` / `Docs/qa/ref_masks` 出 `Docs/qa/<id>-blender-preview.md`（含并排图）；`Tools/qa/tests/test_blender_preview.py`。
  - 当前临时结果（**FAIL 属预期：Blender lookdev 与新参考图构图/造型差距还大，不是 MetaHuman 交付**）：
    - 男主 me2026：front 关键点 **4.47 px（FAIL，阈值 3）**；q34 **6.04 px（PASS，阈值 8）**；side 脸部 IoU **0.449（FAIL）**；front/side 头发 IoU **0.210 / 0.261（FAIL）**。
    - 女主 lin：front **7.74 px（FAIL）**；q34 **37.28 px（FAIL）**；side 脸部 IoU **0.246（FAIL）**；头发 IoU **0.399 / 0.322（FAIL）** —— 女主当前 lookdev 与参考差距更大，供 Claude 排期参考。
  - 验证：`pytest Tools/qa/tests -q` → **75 passed**。
- **DeepSeek 第三轮状态：D8–D10 全部完成**；等待 Claude 的 UE 渲染/新参考图后跑正式验收；C++ 行结构切换需 Codex 加 struct（已在 `Docs/data/rw3-schema.md` 第 3 节给出）。

- **2026-10-21 · D5 女主参考图映射确认：完成**
  - `report.py` 女主映射改为 `front=lian5 / q34=lian6 / side=lian8 / back=female_sheet / closeup=female_sheet`；`lian7` 只作男女主共用 3/4 补充（已从 back 移除）；`Docs/qa/README.md` 去掉“待确认”。
  - 验证：`pytest Tools/qa/tests -q` → 56 passed；`report.py` 映射常量与 README 一致。
- **2026-10-21 · D6 主角服装规格：完成**
  - 产出：`Docs/characters/me2026-outfit.md`、`Docs/characters/lin-outfit.md`、`Tools/qa/measure_sheet.py`（白底三视图自动切分/前景分割/像素→厘米/横截线宽度/暗色与浅色衣物范围与中位 sRGB）+ `Tools/qa/tests/test_measure_sheet.py`。
  - 关键量测（脚本 + 人工核对）：
    - 男主：`male_sheet.png` 前视高 963 px → **5.234 px/cm（1.84 m）**；腰头距头顶 68.0 cm（距地 1.16 m）；裤脚离地约 11 cm、裤口 21–22 cm；前臂皮肤在头顶下 73.9 cm 出现 → 袖口卷到肘下 8–10 cm；衬衫 `#eceef2`、西裤 `#19181b`（`25,24,27`）、鞋 `#141416`。
    - 女主：`female_sheet.png` 前视高 994 px → **5.917 px/cm（1.68 m）**；腰线距头顶 32.3%（距地 1.14 m）；裙摆距地 28.6 cm（膝下 18–19 cm）；前视裙摆宽 57.3 cm（下摆周长估算 2.0–2.4 m）；连衣裙 `#d1dae9`（`209,218,233`）；裙为方形/一字领 + 细吊带 + 6–8 片 A 字裁片；鞋跟 7.0±0.5 cm；项链黑皮绳 46 cm + 2.2×0.6 cm 吊坠。
  - 验证：`pytest` 全部通过（合成三视图验证切分/换算/宽度/颜色）；两份文档含测量方法、复现命令、材质判断、磨损与 2026 中国大学生依据。
- **2026-10-21 · D7 主角发型规格 + 参考头发掩码：完成**
  - 产出：`Docs/characters/me2026-hair.md`、`Docs/characters/lin-hair.md`、`Tools/qa/ref_hair_masks.py`、`Tools/qa/tests/test_ref_hair_masks.py`、`Docs/qa/ref_masks/`（13 张掩码 + overlay 图）。
  - 规格要点：男主黑发 `#15110f`，7:3 分缝、侧扫刘海 12–15 cm、头顶 8–10 cm、两侧 4–5 cm（露耳）、耳后 6–7 cm、颈后 5–6 cm 收尖，顶部蓬起 5.5–6.5 cm，发尖尖、密度 8.5/10；女主酒红 `#482123`，齐刘海 8–9 cm 齐眉、两侧 30–35 cm、耳后 55–60 cm、后长发 95–105 cm 至髋，发尖齐/微圆，密度 7.5/10。
  - 掩码：`me2026_{front,q34,side}.png`、`lin_{front,q34,side,q34_supplement}.png`、`{me2026,lin}_sheet_{front,side,back}.png`；用 `compare_silhouette.py --region hair` 作为 Groom 验收目标（IoU ≥0.85）。
  - 验证：`pytest Tools/qa/tests -q` → **56 passed**（含掩码生成、真实掩码存在性检查）；合成图验证头发掩码；已目视检查男主正面掩码（已剔除眉毛/眼睛/嘴唇小块）。
  - 已知限制：`*_sheet_*` 掩码受参考图强轮廓光影响，亮部发丝缺失（置信度低，仅作轮廓补充）；高精度目标以 `lian*` 单视图掩码为准。

- **2026-10-21 · D3 映射补充（按 Claude 指令）**：
  - `report.py` 男主参考图映射改为 `front=lian1.png / q34=lian3.png / side=lian2.png / back=male_sheet.png / closeup=male_sheet.png`；渲染文件名固定为 `Saved/Compare/<id>/{front,q34,side,back,closeup}.png`（与 Codex 渲染脚本约定一致）。
  - 女主映射暂定 `front=lian5 / q34=lian6 / side=lian8 / back=lian7 / closeup=female_sheet.png`，已在 `Docs/qa/README.md` 标注“待 Claude 确认”。
  - 验证：`pytest Tools/qa/tests -q` → 49 passed；`report.py me2026` 重新生成（当前无渲染 → N/A，待 Codex 输出五视图后自动出 PASS/FAIL）。
  - D3 工具在收到本指令前已完成（`compare_landmarks.py` / `compare_silhouette.py` / `report.py`），本次只更新映射，不影响交付。

- **2026-10-21 · D3 验收对比工具：完成**
  - 产出：
    - `Tools/qa/metrics.py`：Umeyama 相似变换、分区关键点误差（眼/眉/鼻/嘴/脸廓）、白底前景 / 暗色低饱和头发掩码（vmax/smax 可配）、IoU、差异热图。
    - `Tools/qa/compare_landmarks.py`：MediaPipe FaceMesh 468 点，渲染→参考相似对齐，输出 mean/max/p95 + 分区误差 + 叠加图/JSON。
    - `Tools/qa/compare_silhouette.py --region face|hair`：IoU + 差异热图（绿重合/红参考独有/蓝渲染独有）；男女发色可配（男 100/200，女 130/200）。
    - `Tools/qa/report.py <id>`：读 `Saved/Compare/<id>/` 五视图 + 参考图，按方案 §4 阈值输出 `Docs/qa/<id>-report.md`（PASS/FAIL 表 + 并排图 + 差异图 + 人工项）。`Docs/qa/README.md` 写用法与限制。
  - 验证：
    - `pytest Tools/qa/tests -q` → **49 passed**（合成数据验证变换/误差/掩码/IoU/热图颜色/并排图/渲染发现/阈值常量）。
    - 真实图冒烟：`headviews/male_front.png` vs `fit/male_look_front.png` 关键点 mean 4.47 px、max 11.8 px（分区正常输出）；剪影 face IoU 0.60、hair IoU 0.22（两张图构图/背景不同，数值只说明工具链路通，不代表模型终值）。
    - `report.py me2026` 已生成 `Docs/qa/me2026-report.md`（当前 Codex 无渲染 → 全部 N/A，不伪造数据）。
  - 还缺：Codex 的 `/Game/Lookdev` 对比相机与 `Saved/Compare/<id>/` 五视图后，才能给出真实 PASS/FAIL；`lin` 报告等女主资产。
- **2026-10-21 · D4 QA 清单：完成**
  - 产出：`Docs/qa/character-checklist.md` —— 交付门槛 + 10 组检查：穿模、发丝穿透、眼睛高光、牙齿口腔、表情极值、布料自交、LOD 切换、性能（1440p Lumen LOD0 ≤2.5 ms）、参考图并排、角色特定项（old2090 叠脸/衰老、四配角标志物），附记录模板。
  - 验证：清单与方案 §4 阈值、`report.py` 输出项一一对应；pytest 全绿（49 passed）。
  - 还缺：清单是人工执行项，需 Claude 在每个角色交付时逐项打勾并附证据。
- **DeepSeek 任务状态：D1–D4 全部完成**。等待 Claude/Codex 的渲染与对比相机后跑真实报告；如需要，我可继续做 `DT_Vocabulary` 接入 HUD（需 Codex 改 `Source/`，已登记）。

- **2026-10-21 · D2 词汇 DataTable 导入：完成**
  - 产出：`Tools/data_vocabulary_csv.py`（纯 Python：JSON→CSV，字段对齐 `Source/WordQuestUE/WordQuestData.h` 的 `FWordEntry`：Word/Phonetic/Pos/Meaning/Example/UnitId/UnitTitle/Meanings；CSV 数组用 UE 语法 `("a","b")`）、`Tools/data_import_vocabulary.py`（UE Python：重建 CSV → 创建/填充 `/Game/Data/DT_Vocabulary` → 行数/列/样本校验）、`Content/Data/vocabulary/college_english_rw3.csv`、`Content/Data/DT_Vocabulary.uasset`（130 行）。
  - 验证：
    - UE 无头导入日志：`fill_data_table_from_csv_file -> True`；`row names=130`；`columns=['Word','Phonetic','Pos','Meaning','Example','UnitId','UnitTitle','Meanings']`；`validation OK`；`D2 DONE`（样本 `digital`/`数字的`/`unit01` 回读存在）。
    - `pytest Tools/qa/tests -q` → **39 passed**（JSON/CSV 行数一致=130、必填字段非空、单元分布 30/20/20/20/20/20、CSV 往返、工程 CSV 最新）。
  - 备注：导入脚本用 error 级日志保证无头可见，commandlet 会因此返回 -1（非失败）；校验不通过才会真正报错。字段未改动，无需 Codex 改 `WordQuestData.h`。DT 行结构使用 `/Script/WordQuestUE.WordEntry`。
  - 还缺：游戏侧把 HUD 从 JSON 读取改为读 `DT_Vocabulary`（HUD 在 `Source/`，属于 Codex 范围，已在 STATUS 提请）。
- **下一步（DeepSeek）**：D3 对比工具（`Tools/qa/compare_landmarks.py`、`compare_silhouette.py`、`report.py` + 合成图 pytest）→ D4 QA 清单。

- **2026-10-21 · D1 配角设定集：完成**
  - 产出：`Docs/characters/{old2090,mei,an,rui,organizer}.md` + `Docs/characters/README.md`（角色索引与颜色/身高约定）。每份含：一句话人物、身份卡、故事作用、MetaHuman 外貌规格（骨相/五官/肤色+Fitzpatrick/痣斑/身高体型/剪影辨识度）、发型规格（cm、分缝、刘海、发量、卷度、sRGB）、服装规格（版型/材质/主色/磨损）、表情与姿态习惯、MetaHuman 参数建议。`old2090` 按“me2026 同骨相 + 64 年衰老”写，含骨相不变项、皮肤/脂肪/发际线/白发/老年斑/驼背 12–18° 的量化说明。
  - 验证：`~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests -q` → **33 passed**（文件存在、必备小节、颜色 ≥6 个 sRGB、脸/发/服装字段、old2090 衰老一致性、README 索引）。
  - 冲突处理：`characters.ts` 里 lin 的旧发色/旧服装与总方案冲突，已在 README 注明以参考图与总方案为准；未修改他人文件。
  - 还缺：Claude 建脸后的回读校验（比对 MetaHuman 捏脸参数与本文档）；如需我补 `Docs/characters/me2026|lin` 的配角视角对照表，请下发。
- **下一步（DeepSeek）**：D2 词汇 DataTable 导入（`Tools/data_import_vocabulary.py` + 行结构 CSV → `/Game/Data/DT_Vocabulary`，字段对齐 `Source/WordQuestUE/WordQuestData.h`）→ D3 对比工具 → D4 QA 清单。

- （待更新）

- **2026-10-23 · 第九轮 D23 / D24 / D25 / D26（DeepSeek，未提交）**
  - **D23 内容覆盖审计（完成）**：新增 `Tools/qa/content_coverage.py` + `Tools/qa/tests/test_content_coverage.py`（4 passed，覆盖未引用/越界/不存在的 id 三类合成用例），规格见 `Docs/qa/d23-content-coverage.md`。
    - 真实数据：**段落 187/187 = 100%**；**生词 148/506 = 29.2%**；**题目 472/487 = 96.9%**；无效引用 0。
    - 修了 unit01 的 5 处引用错误（`u01_b_text_b_mcq` → 实际 block `u01_b_understanding`），只改 id，未动布景/物件/灯光；记录在 `Docs/qa/content-coverage.md` §4。
    - 未挂载生词 358 条 → `Docs/qa/word-placement-proposals.json`（含课文出现句、建议 set/kit/尺寸、high/medium/low 置信度），等 Claude 审核合入。注意 `words.csv` 是 OCR 原始词表，含拼写噪声（adrougnt / cevice / avia 等），建议与数据层 536 词校订表对照后再挂。
    - unit01 仍有 15 道题没有被 set 引用（`a_pre_reading#1-2`、`a_understanding#3-8`、`a_expressions_in_use#4-8`），属于布景设计范围，未擅自加引用。
  - **D24 答案 / 英文解析 / 翻译参考（完成）**：草稿在 `Content/Data/textbook/rw3/answers/draft_unit01–06.json`（6 个 agent 按单元撰写，逐项与 exercises 对齐）；`Tools/data_answers.py` 合并并生成 `Docs/qa/d24-answer-report.md`。
    - 487 个 item 全部有 answer + 一句英文 `explanation`；69 个开放题补英文参考作答，标 `answer_source: "draft"` + `needs_review: true`；选择题答案保持 0–3 唯一正确。
    - 6 个单元 `--check` 通过；合并后复查：无缺答案、无缺解析、MCQ 下标合法。
  - **D26 场景质检（工具完成，报告部分）**：新增 `Tools/qa/scene_audit.py` + 测试（3 passed，合成黑/白/纯色/纹理图验证曝光、纯色、边缘、贴花解析）。
    - 当前只有 `Docs/qa/textbook-scenes-unit01.json`：22 个 set、33 张截图、全部 FAIL、缺资产合计 154、占位 208；dashboard 已生成 `Docs/qa/scenes-dashboard.md`，unit02–06 明确标 N/A（等 Codex checker 报告）。
  - **D25 课文配音（完成）**：`Tools/data_vo_textbook.py` + 测试（3 passed，含 say 超时重试）；清单 **267 行 = 187 段落 + 80 条练习指令**（887 句），声线 A=Samantha / B=Daniel / C=Flo / 指令=Reed；WAV **267 个 + 267 个逐句时间戳 JSON**，总时长 **91.5 分钟**；`--check` 通过，报告 `Docs/qa/voice-report.md`（各单元静音/异常 0）。
  - 新增文档：`Docs/qa/d23-content-coverage.md`、`d24-answers.md`、`d25-voices.md`、`d26-scene-audit.md`（均为需求/接口/测试三件套）。
  - **给 Codex 的 Source 交接**（DeepSeek 从本轮起不再改 `Source/`）：
    - DeepSeek 上一轮留下、当前工作区未提交的 Source 改动：`WordQuestHUD.cpp/.h`、`WordQuestRefCameraRig.cpp/.h`（修改）；新增 `WordQuestMemoryGameMode.cpp/.h`（回忆舞台 GameMode：无第三人称身体、极简 HUD、自由视角）、`WordQuestMemoryDirector.cpp/.h`（数据驱动课文播放，练习时暂停世界）、`WordQuestExerciseWidget.cpp/.h`（练习 UI/选项按钮）、`WordQuestAnimationPreview.cpp/.h`（编辑器内动画预览）、`WordQuestRenderDiagnostics.cpp/.h`（场景截图/能力查询）。
    - 请 Codex 接手后先编译确认这些文件状态，后续 `Source/` 归 Codex 全权维护；DeepSeek 本轮只改 Docs/Tools/Content/Data。

- **2026-10-23 · D27 词表校对（完成）**
  - `Tools/data_words_fix.py`：修正 18 条 OCR 拼写（交给 Claude 的清单全覆盖）、被大写常见词 5 条；音标统一美式为 CMUdict（490 转换 + 8 短语拼接 + 4 参考层 + 4 人工专名 = **506/506**）；中文释义 469 条用已校对参考词表覆盖，其余规则纠错。
  - `Tools/scene_text_words.py` 匹配器修正：连字符复合词（nine-masted/self-reflection/near-infinite）、句末标点、`-ic→-ally`、`conceive→inconceivable` 派生匹配。
  - 重跑结果：**placed 506/506, unmatched 0**；`Docs/qa/text-words-unmatched.md` 已清空；修改记录写入 `Docs/qa/textbook-extract-audit.md` §6 + `Docs/qa/words-fix-report.json`。
  - `Tools/qa/content_coverage.py` 已改按 `text_words` 口径统计：**段落 187/187（100%）、生词 506/506（100%）、题目 472/487（96.9%）**。
- **2026-10-23 · C13 沉浸式界面验证（进行中，Source 本轮归 DeepSeek）**
  - 已修：开场相机按场景 JSON `shots[0]` 生成（原来 level 里的 shot 相机在 2.7 km 外，视线全打在 HDRI 天幕）、fragment 锚点按场景相机计算、句子文本 `text_words` 标亮（Fragment Widget 逐词排版，form 冷光色）、句内注视 0.6s 浮现音标+释义、长按记住并写入 `Saved/Player/Notebook.json`、`GetImmersiveState` 暴露 world_fragments/screen_ui/highlight/remember 等指标。
  - `Tools/test_textbook_c13.py` 覆盖字幕生成/消散、注视、长按、12 类练习断片、冻结恢复、答错失真、转场/跳过、横竖屏；证据 `Docs/qa/immersive/`（25 文件 + `results.json` + `report.md`）。
  - **PIE 已通过**：`WQ_C13_PIE_PASS run_id=1792727197852099000`，2305 帧；12/12 练习断片、`screen_ui=0`、`progress_ring=1`、每个练习 `distortion>0`、`remembered=1`、转场 `skip=True`、横竖屏尺寸校验通过。
  - 已知限制：无头 PIE 相机 view target 切换不可靠，注视目标用 QA 注入（`ProbeGazeSentenceFragment`），之后的 0.6s 浮现/长按/Notebook 走真实运行时；详见 `Docs/qa/immersive/report.md` §3。

- **2026-10-23 · C13 重跑确认（排队等 Claude UE 锁后）**
  - `WQ_C13_PIE_PASS run_id=1792727641300587000`（3678 帧、`L_U01_A`、WQ_TEXTBOOK_ENGINE_QA=1），exit 0。
  - `Docs/qa/immersive/`：25 条 capture + `results.json`（12/12 练习断片、每个练习 `distortion>0`、`screen_ui=0`、`progress_ring=1`、`remembered=1`、`transition skip=True`）；报告见 `Docs/qa/immersive/report.md`。
  - `unit01.json` 的 `text_words`（75 条）在运行时按句标亮、注视 0.6s 浮现、长按写 `Saved/Player/Notebook.qa.json`。
- **2026-10-23 · D26 场景质检刷新**
  - Claude 新出 33 张 4K 截图 + checker `Docs/qa/textbook-scenes-unit01.json`（11:46）后重跑 `Tools/qa/scene_audit.py --unit 1`：22 个 set、33 张截图、FAIL 22/22、缺最终资产 116、占位 163；dashboard/json 已更新。
- **2026-10-23 · D28 精品小物件（低分辨率自查完成，2K 正式烘焙进行中）**
  - 17 个物件脚本：`Tools/props/hero_<kit>.py`（共享 `hero_u01_small.py`），批处理 `Tools/props/bake_u01_small.sh`。
  - 每个物件已按 `HERO_RES=512 HERO_SAMPLES=2` 试烘焙并自查预览；尺寸经 `_fit()` 落地 + 三轴校准，全部 ≤2%。正式 `HERO_RES=2048` 烘焙正在跑，完成后本表会自动覆盖。
  - 印刷图新增在 `Tools/props/hero_textures.py`：`keyboard_labels`、`qr_panel`、`payment_panel`、`coupon_face`、`recipe_cover`、`brochure_panels`（折页架改用三色卡纸+白标签）、`box_print`、`router_leds`。
  - 预览图（`SourceArt/Props/Hero/preview/<kit>.png`）与三角面数：

| kit | tris | size (m) | preview |
|-----|------|----------|---------|
| keyboard | 51152 | [0.44, 0.14, 0.03] | `SourceArt/Props/Hero/preview/keyboard.png` |
| headphones | 10164 | [0.2, 0.1, 0.22] | `SourceArt/Props/Hero/preview/headphones.png` |
| wifi_router | 11040 | [0.22, 0.15, 0.04] | `SourceArt/Props/Hero/preview/wifi_router.png` |
| recipe_book | 3376 | [0.2, 0.26, 0.03] | `SourceArt/Props/Hero/preview/recipe_book.png` |
| duster | 3872 | [0.14, 0.06, 0.05] | `SourceArt/Props/Hero/preview/duster.png` |
| chalk_tray | 3984 | [3.0, 0.08, 0.05] | `SourceArt/Props/Hero/preview/chalk_tray.png` |
| sandwich_plate | 7152 | [0.24, 0.24, 0.06] | `SourceArt/Props/Hero/preview/sandwich_plate.png` |
| coupon_card | 912 | [0.09, 0.055, 0.003] | `SourceArt/Props/Hero/preview/coupon_card.png` |
| qr_sign | 2704 | [0.25, 0.02, 0.32] | `SourceArt/Props/Hero/preview/qr_sign.png` |
| payment_sign | 2848 | [0.5, 0.02, 0.35] | `SourceArt/Props/Hero/preview/payment_sign.png` |
| device_box | 2416 | [0.3, 0.2, 0.12] | `SourceArt/Props/Hero/preview/device_box.png` |
| school_bag | 6832 | [0.32, 0.18, 0.42] | `SourceArt/Props/Hero/preview/school_bag.png` |
| griddle | 4208 | [0.5, 0.5, 0.05] | `SourceArt/Props/Hero/preview/griddle.png` |
| dish_rack | 4736 | [0.45, 0.3, 0.25] | `SourceArt/Props/Hero/preview/dish_rack.png` |
| sink | 6412 | [0.6, 0.45, 0.2] | `SourceArt/Props/Hero/preview/sink.png` |
| brochure_rack | 10528 | [0.6, 0.3, 1.4] | `SourceArt/Props/Hero/preview/brochure_rack.png` |
| queue_rope | 14432 | [2.4, 0.1, 0.95] | `SourceArt/Props/Hero/preview/queue_rope.png` |

- **2026-10-23 15:16 · 暂停 UE/Blender（Claude 协调）**：用户要提前看第 1 单元演示/视频，机器（16 GB）由 Claude 独占约 3 小时组装 MetaHuman、重建第 1 单元、渲染视频。此期间不做编译、不跑 PIE、不烘焙；只做纯数据（D24）与 C13/D28 的代码/方案。恢复信号由 Claude 发出。

- **2026-10-23 · D28 返工代码（暂停期，未烘焙）**
  - `hero_common.py` 新增 `check_contacts(parts)`（>1 mm 报错）；`hero_u01_small.run()` 在 `finish` 前调用。
  - 已重写：headphones（连通臂/滑轨/鼓耳垫）、duster（黑板擦木块+毛毡+粉笔灰）、dish_rack（焊框+筷子筒+接水盘）、griddle（圆形铸铁鏊+养锅面+刮板）、sandwich_plate（三角三明治+生菜边）、school_bag（拉链齿/肩带/网兜/提手）、wifi_router（天线/网口/LED/胶脚）、queue_rope、brochure_rack。
  - 其余返工项与验收前“禁止正式烘焙”的要求见 `Docs/qa/d28-rework-plan.md`；恢复后先低分辨率预览 + 接触自查，再提交 Claude 评审。
- **2026-10-23 · C13 证据返修代码（暂停期，未编译）**
  - 根因与修复方案见 `Docs/qa/immersive/c13-fix-plan.md`：shot 单位 ×100；世界截图 alpha=255；SceneCapture2D 拍不到世界 Widget → 改视口截图 `CaptureScreenEvidenceIn`；转场冻结截图；像素门禁 `Tools/qa/c13_evidence_gate.py`（亮度 25–200、前后差异 >0.5%）。
  - 待恢复后重新编译 + 跑 PIE 验证，再写验收说明。

- **2026-10-23 15:46 · P0 第 1 单元演示视频（58s，2K，教材原文版）**
  - 成片：`Docs/qa/demo/unit01_showcase_textbook_2k.mp4`（1920×1080、58s、7.3MB）。
  - 画面：第 1 单元 A/B/C 各选机位（10 个镜头，共 600 帧 1080p），记忆调色 + 2.39:1 黑边 + 转场；字幕与旁白全部为**教材原文**（D25 段落配音按句切片）。
  - 备注：MetaHuman 组装进程卡在角色快照（15:31 后无进展、日志刷 idevice_id 失败），已强杀并改用现有快照/占位资产渲染，部分全景里的人物仍是占位圆柱；16:00 后继续修 MetaHuman → 重建 → 重渲染替换。
  - 生成链：`Tools/build_textbook_film_plan.py`（教材原文计划）→ `Tools/render_unit_film.py`（A/B/C）→ `Tools/compose_unit_film.py`（COMPOSE_PLAN=plan_textbook.json）。

## 需要用户处理

- MetaHuman 自动绑定和装配需要在 UE 里登录 Epic 账号（云服务）。只有用户本人能登录。
- ✅（2026-10-22 已完成）安装 **MetaHuman Creator Core Data**（皮肤纹理合成要用）：Epic Games Launcher → Unreal Engine → 库 → UE 5.8 启动按钮旁的下拉菜单 → 选项 → 勾选“MetaHuman Creator Core Data” → 应用。

- 2026-10-21（Codex C1 实测）：UE 5.8 缺少 **MetaHuman Creator Core Data**（MetaHumanCharacter/Content/Optional、TextureSynthesis、BodyTextures）。请用户在 Epic Games Launcher 的 UE 5.8 安装选项中补装；如安装或后续云绑定要求 Epic 登录，请用户本人操作。本轮未尝试登录，未隐藏缺失警告。
- 2026-10-22（C10 Fab 补资产）：Fab 页面停在 Cloudflare 人机验证；本轮未尝试绕过。请用户在已登录的 FabStaging 页面完成人工验证，再补齐免费 Personal 许可的 Wooden Bookcases、扫描贴花，以及 `Docs/qa/textbook-scenes-unit01.json` 中列出的未交付 kit 资产；每项补入时继续登记 `Docs/licenses/third-party-assets.md`。
