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

## DeepSeek（数据 / 文档 / QA 工具）

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

## 需要用户处理

- MetaHuman 自动绑定和装配需要在 UE 里登录 Epic 账号（云服务）。只有用户本人能登录。
- 安装 **MetaHuman Creator Core Data**（皮肤纹理合成要用）：Epic Games Launcher → Unreal Engine → 库 → UE 5.8 启动按钮旁的下拉菜单 → 选项 → 勾选“MetaHuman Creator Core Data” → 应用。

- 2026-10-21（Codex C1 实测）：UE 5.8 缺少 **MetaHuman Creator Core Data**（MetaHumanCharacter/Content/Optional、TextureSynthesis、BodyTextures）。请用户在 Epic Games Launcher 的 UE 5.8 安装选项中补装；如安装或后续云绑定要求 Epic 登录，请用户本人操作。本轮未尝试登录，未隐藏缺失警告。
