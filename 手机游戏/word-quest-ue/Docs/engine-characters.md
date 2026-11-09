# 人物引擎侧交付（UE 5.8）

## 产品需求说明书

按 `tasks/codex-character-engine.md` 的 C1→C6 顺序推进。C1 要求 MetaHuman 身份/动画、Groom、Live Link、Chaos Cloth、Alembic 和 IK Rig 可用，保持 Lumen 与传统材质路线，工程可编译并以 Python 命令行方式无头打开。C1 不创建、导入或修改人物资产，不访问 Epic 账号或启动云端绑定；无头打开成功也不代表 Groom 已在 GPU 上正确渲染。

本机版本：UE **5.8.4**（CL 58902052），Xcode **27.1**，Mac arm64；工程 `WordQuestUE.uproject`，引擎 `/Users/Shared/Epic Games/UE_5.8`。

## 接口文档

### C1 插件与渲染配置

`WordQuestUE.uproject` 显式启用 `MetaHumanCharacter`、`MetaHumanSDK`、`MetaHuman`（Animator）、`MetaHumanLiveLink`、`HairStrands`、`LiveLink`、`ChaosCloth`、`ChaosClothAsset`、`AlembicImporter`、`IKRig`，保留原 Python/编辑器脚本插件。

`Config/DefaultEngine.ini` 的 RendererSettings：

| 配置 | 值 | 用途 |
|---|---:|---|
| `r.SkinCache.CompileShaders` | 1 | UE 5.8 的 InlineAndSkinCacheShaders；同时保留普通蒙皮与 Skin Cache 路径 |
| `r.SkinCache.DefaultBehavior` | 1 | 默认允许蒙皮缓存 |
| `r.HairStrands.Strands` | 1 | 发丝路径 |
| `r.HairStrands.Cards` | 1 | 后续远景发片 LOD 路径 |
| `r.HairStrands.Binding` | 1 | Groom 绑定路径 |
| `r.Substrate` | 0 | 继续传统材质，不开启 Substrate |
| `r.DynamicGlobalIlluminationMethod` / `r.ReflectionMethod` | 1 / 1 | 保留 Lumen GI 与反射 |

以上名称核对过本机 UE 5.8 源码：`RendererSettings.h`、`GPUSkinCache.cpp`、`HairStrandsInterface.cpp`。UE 5.8 没有使用 `r.HairStrands.Enable` 这个旧式猜测开关，采用当前引擎真实注册的 Strands/Cards/Binding CVar。

### C1 自检接口

`Tools/ue_check_character_engine.py`：

- 普通 Python 带 `--offline`：核对工程插件和 ini，配置缺项/禁用/值错误直接失败。
- 在 `UnrealEditor-Cmd -run=pythonscript` 内执行：另核对实际已启用插件、运行时 CVar 和 MetaHuman/Groom/Live Link/Cloth/Alembic/IK/项目角色的反射类。
- 结果写入忽略的 `Saved/CharacterEngine/`，成功打印 `WQ_C1_PASS`，失败抛出 `WQ_C1_FAIL`。不保存地图、角色或蓝图；不处理登录/凭据。

编译：

```sh
ENGINE='/Users/Shared/Epic Games/UE_5.8'
PROJECT="$PWD/WordQuestUE.uproject"
UE_LOCK_WHO=codex Tools/run_ue_serial.sh "$ENGINE/Engine/Build/BatchFiles/Mac/Build.sh" WordQuestUEEditor Mac Development "$PROJECT" -WaitMutex -NoHotReloadFromIDE
```

无头自检：

```sh
UE_LOCK_WHO=codex Tools/run_ue_serial.sh "$ENGINE/Engine/Binaries/Mac/UnrealEditor-Cmd" "$PROJECT" \
  -run=pythonscript "-script=$PWD/Tools/ue_check_character_engine.py" \
  -nullrhi -unattended -nop4 -nosplash -nosound -NoEpicPortal \
  -stdout -FullStdOutLogOutput
```

`-nullrhi` 只用于插件/项目加载检查，不能用其结果声称完成 Lumen、Groom 画面或 C5 GPU 性能验收。MetaHuman 自动绑定/装配仍待用户自行登录 Epic 账号，记录在 STATUS“需要用户处理”。

## 测试

### C1：2026-10-21 本机验证

- 离线配置自检通过，`WQ_C1_PASS`。
- Mac Development Editor 编译通过；随后更新项目 5 个 `.cpp` 的时间戳（内容不改），强制执行 **5 次 C++ 编译 + 1 次 dylib 链接**，`Result: Succeeded`，约 9.29 秒。
- 实际 `UnrealEditor-Cmd -run=pythonscript -nullrhi` 首轮正常退出（code 0），10/10 插件、8/8 CVar、8/8 反射类检查通过，`errors=[]`、`WQ_C1_PASS`。重新编译后的最终复核结果追加在下方。
- 已扫描引擎日志，无 Error/Fatal/Assertion/Python Traceback；没有通过降低日志级别来隐藏错误。
- **已知警告**：缺少 **MetaHuman Creator Core Data**（`MetaHumanCharacter/Content/Optional` 下 Optional / TextureSynthesis / BodyTextures 安装检查失败），Creator 以受限功能初始化。用户需在 Epic Games Launcher 的 UE 5.8 安装选项中补装；本次未尝试登录。正常的项目“hero mesh assigned”警告亦保留。
- C1 通过仅表示工程编译和无头加载能力；Creator 完整身份制作、Metal/Lumen/Groom 渲染、C2–C6 与 C5 性能尚未验收。

最终复核：强制 C++ 重编译后再次无头启动，退出码 **0**，`mode=editor`、`passed=true`、`errors=[]`，10 个运行时插件 / 8 个 CVar / 8 个反射类全部通过。完整报告位于 `Saved/CharacterEngine/C1-report.json`，日志 `/tmp/ue-c1-final-headless.log`；仅保留已说明的 Core Data 缺失警告。

## C2 产品需求说明书：MHC 头肩验收

按 2026-10-21 最新验收反馈，五个标准文件改为头肩特写：front/q34/side/back 为 40 cm 正交宽度，closeup 为 25 cm；取景中心在眼骨下方 3 cm。全身图不得占用这五个文件名。本轮必须使用两位未绑定 MHC 预览体，不能把 Source body 回退图当作交付证据。采用固定曝光（EV100 等效 9.5）、主/补/轮廓光强 10000/4000/6000、灰背景、隐藏地面，保留 Lumen。灯光比指光源强度，皮肤实际照度还受距离和面法线影响。

## C2 接口文档

- `Tools/ue_setup_lookdev.py`：编辑器 Python 建立或刷新 `/Game/Maps/L_CharacterLookdev`、`/Game/Blueprints/BP_RefCameraRig` 和 Lookdev 材质；只删除带 `WQ_Lookdev` 前缀的布景 Actor。地面同时关闭组件可见性与游戏可见性；背景关闭投影和距离场/间接光贡献，避免背景成为大面积补光源。
- `AWordQuestRefCameraRig`：五路 1024² SceneCapture；`ConfigureViews()` 设置头肩取景，`WarmView(index)` 积累渲染历史，`ExportView(index,id)` 输出 PNG。固定手动曝光，关闭物理相机曝光计算，曝光补偿 −9.5（以 EV0 为基准等效 EV9.5），禁用动态自动曝光和运动模糊。
- `UsePreviewSkin(character)`：仅编辑器可用，调用引擎 `UpdateCharacterPreviewMaterial(..., Editable, false)`；最后的 `false` 明确禁止持久化状态，不保存人物或将人物包标记为 dirty。默认 Topology 彩色材质切换为当前可用的 Skin 预览材质，不能据此声称缺失的 Creator Core Data 或最终皮肤贴图已补全。
- `python3 Tools/ue_render_compare.py <me2026|lin> --require-mhc`：完整离屏 Metal 渲染，不能用 NullRHI。UE 5.8 的实际 Python 名称为 `spawn_meta_human_actor`；先 `try_add_object_to_edit`，完成后 `remove_object_to_edit`（子系统自动销毁其 Actor）。没有 MHC 或预览失败即失败。
- q34 参数优先来自显式 `--fit-json`，其次导出目录、项目 art/fit，最后本机 `~/.local/share/hunyuan3d/work/fit/<male|female>_fit.json`；记录路径和 SHA256。没有 fit 时才用任务书默认姿态，不伪称读取过文件。
- 输出：`Saved/Compare/<id>/{front,q34,side,back,closeup}.png`、`capture.json`、`render.log`。元数据包含 `status=complete`、`source=MHC`、源资产、未绑定预览标记、Skin 显示模式、机位、分辨率及曝光。新一轮开始前将旧五视图和 capture/error 归档至 `Saved/CompareHistory/<id>/<uuid>/`，失败不会留下旧 Source 图冒充新结果。
- 每个机位至少 48 个 Slate 帧且 5 秒预热；成功需五张 PNG 头部/尺寸和机位宽度均合约、完成标志及进程退出码 0。使用 `-culture=en -language=en` 避免此前中文 Slate/ICU 文本退出崩溃；不更改用户编辑器语言设置。
- 自动退出与异常退出均释放脚本保活；没有 Epic 登录或云端绑定操作。

## C2 测试

`python3 Tools/ue_test_character_pipeline.py` 覆盖 10 项离线检查：完整 MHC、拒绝 Source 回退、未完成捕获、错误全身构图、损坏/缺失/错误尺寸 PNG、路径逃逸、实际 fit 参数/校验和、非法数值和显式缺失文件。真实渲染后另外用 Pillow 完整解码十张 PNG，不能将合成 IHDR 单测当作成图质量验收。真实构建/渲染/QA 结果见下方追加记录。

Creator Core Data 安装路径（需用户本人）：关闭工程 → Epic Games Launcher → Unreal Engine → Library（库）→ 已安装 UE **5.8** 的 Launch（启动）按钮旁下拉 → Options（选项）→ 勾选 **MetaHuman Creator Core Data** → Apply（应用）。这是引擎安装组件；不需要通过 Fab 搜索替代素材。入口依据 [Epic 官方安装说明](https://dev.epicgames.com/documentation/en-us/metahuman/getting-started-with-metahuman-creator)。后续云绑定如要求 Epic 登录，也由用户本人完成。

### C2 统一 UE 运行锁与退出修复（紧急规则）

遵守 `Docs/tasks/ue-run-rules.md`：所有新 UE 子进程通过 `bash Tools/run_ue_serial.sh`，环境 `UE_LOCK_WHO=codex`；只使用完整 `UnrealEditor.app/Contents/MacOS/UnrealEditor -ExecutePythonScript`，Groom/FBX/MetaHuman/渲染不用 commandlet 或 NullRHI。渲染器先等待同一工程的存量 UE 实例结束，再进入共享锁，兼容新规则之前尚未加锁的实例；不关闭其他人的编辑器。等待锁不占用固定渲染超时，不会因此杀死另一个锁拥有者。

五张 PNG 完整导出、元数据写盘、MHC 编辑会话释放后，刷新成功标志并 `os._exit(0)`，避免完整 Slate 析构；异常写错误文件后 `_exit(1)`，不会给成功标志。Lookdev setup 同样在同步保存后直接退出。当前渲染不保存人物资产，MHC 资产文件在捕获开始和完成时核对 SHA256（变化即失败）。

崩溃溯源：Codex 的历史 PID **8480** 与 **9481**，报告目录分别为 `~/Library/Application Support/Epic/UnrealEngine/5.8/Saved/Crashes/CrashReport-UE-WordQuestUE-pid-8480-F7CE4B76A748B110364F92BD420449F3`、`...pid-9481-E7C2A983694111F55DA507BE7CCF6E8A`。两者 `Caught signal` 栈为 `malloc_report → POINTER_BEING_FREED_WAS_NOT_ALLOCATED → ubidi_close_64 → FICUTextBiDi::~FICUTextBiDi → FTextLayout/FSlateTextLayout/STextBlock`，发生在退出清理，并非 Python 单测堆栈。8480 保存了旧版 Source 五视图后触发编辑器关闭；9481 为 MHC 调用名称写错而失败的旧进程，停止时再次走到同一析构崩溃。真实 API 名称现已改为 `spawn_meta_human_actor`。

对应旧命令行为 `UnrealEditor-Cmd WordQuestUE.uproject /Game/Maps/L_CharacterLookdev -ExecutePythonScript=<工程>/Tools/ue_render_compare.py -RenderOffscreen -unattended -nosplash -nosound -NoEpicPortal -stdout -FullStdOutLogOutput`（9481 另有 `-culture=en -language=en`）。CrashContext 的命令行被引擎脱敏为 CommandLineRemoved，以上从各报告附带的 WordQuestUE.log 回读；不记录账号信息。

`LogAutomationTest: Condition failed` 是早期中文启动日志中的引擎 SmokeTests 报错；未运行 `Automation RunTests` 指令。源码 `LaunchEngineLoop.cpp` 的启动阶段会自动 `RunSmokeTests()`；`Core/Tests/Experimental/UnifiedError/UnifiedErrorTests.cpp` 485–533 行将格式化文本与英文常量比较，而旧日志输出中文。**据此推断是这些启动自测与本地化的兼容问题**，不是将“紧邻 TextureGraph 日志”当作 TextureGraph 故障证据。保留引擎测试和原日志级别，新进程仅通过 `-culture=en -language=en` 固定自动化运行语言；最终日志还需实测确认 Condition failed / Caught signal 数量。

嵌套锁兼容：外部若已执行 `run_ue_serial.sh python3 Tools/ue_render_compare.py ...`，CLI 会用实际 PID/PPID 祖先链确认锁拥有者确为自己的祖先进程，然后在这把锁保护下启动 UE，防止内部再次等待自己的外层锁。不能仅凭环境变量或锁文件存在就跳过锁；其他调用仍通过锁脚本排队。离线测试新增祖先/无关进程/环路检查，共 **11 项**。本轮发现并取消了一次 PID 13627 的嵌套锁等待（没有 UE 子进程、没有资产导入/保存），保留外层自动释放锁的清理流程，未结束任何他人的 UE 编辑器。

同角色多 CLI 排队也需要隔离证据：归档动作已移入持锁的编辑器进程，排队中的 CLI 不再提前搬走其他进程正在写的五视图。每次运行分配独立 `run_id`，PNG、capture.json 与日志保存在 `Saved/CompareRuns/<id>/<run_id>/`，CLI 校验自己的这一份不可变快照；标准 `Saved/Compare/<id>/` 保持最新运行输出。增加历史归档保留/无关文件不受影响的测试，目前共 **12 项**。这修复了外部协作者连续重拍同一人物时，前一个调用的验收文件可能被下一个排队调用提前移走的竞争问题。

### C2 最终实测

两位最新 MHC 的普通 CLI / 外层加锁 CLI 均退出 **0**，无 Condition failed、Caught signal、Python Error；12/12 离线测试通过，C++ 编译通过。最终快照与人物资产 SHA256：

| 角色 | run_id | 不变的 MHC SHA256 | 退出码 |
|---|---|---|---:|
| me2026 | `5d12ebb112cc4734af20d4e6eb1f3ca8` | `e806301192ca0b16412aed6a03e7f096dfbdf4789470361ab8d0826f1f840c9a` | 0 |
| lin | `4236eef8142d4803a7b0ae883db55f35` | `e4a35293e278ed7a0878c93d5fab45140c866eab65dbdd39b7c089f6c1030db0` | 0 |

QA 工具实际执行完成，每位 4 FAIL（没有修改工具/阈值）：

**me2026**

| front 关键点平均误差 | 7.52 px | ≤ 3 px | FAIL | max 21.2 px / p95 14.5 px |
| front 头发剪影 IoU | 0.010 | ≥ 0.85 | FAIL | 暗色低饱和区域 |
| q34 关键点平均误差 | 14.22 px | ≤ 8 px | FAIL | max 47.8 px / p95 29.9 px |
| side 脸部剪影 IoU | 0.247 | ≥ 0.95 | FAIL | 白底前景去掉头发 |

**lin**

| front 关键点平均误差 | 7.88 px | ≤ 3 px | FAIL | max 24.5 px / p95 16.6 px |
| front 头发剪影 IoU | 0.069 | ≥ 0.85 | FAIL | 暗色低饱和区域 |
| q34 关键点平均误差 | 7.13 px | ≤ 8 px | PASS | max 17.4 px / p95 13.0 px |
| side 脸部剪影 IoU | 0.218 | ≥ 0.95 | FAIL | 白底前景去掉头发 |

当前无 Groom；灰背景低于 QA 白底阈值 244，因此 side 前景分割 IoU 不能单独判断脸型。Core Data 缺少 Optional/BodyTextures/T_Skin_Microtiling_M 等纹理，日志 LoadErrors 保留，Skin 灰白不表示真实皮肤完成；最新两位 MHC 已不再张嘴露牙。照片相似度、发型和 GPU 性能仍需后续验收。

### 背颈诊断的需求、接口与实测

需求：区分女主背颈暗带来自后处理/贴图/阴影，还是 MHC 表面过渡。接口：`python3 Tools/ue_diagnose_neck.py` 通过共享锁运行完整编辑器，只在临时预览组件上替换统一灰色 PBR 材质（无纹理、无法线贴图、roughness=1），关闭阴影/SSAO/Lumen，并将背光由 z=220 改到 z=95 cm；不保存 MHC。输出 `Saved/CompareDiagnostics/lin/{back_beauty,back_flat_no_shadow,back_flat_low_light}.png` 和 `diagnosis.json`。

测试：实际退出 0，三张 1024² 同机位图成功，MHC SHA256 不变。无贴图和屏幕/自阴影的灰模仍有同一条颅底—颈部折痕；改下方光后暗带变亮但表面折线仍可见。因此源于模型表面/顶点法线过渡，顶部轮廓光会放大；不归因于地面、曝光或皮肤法线贴图。尚未进一步分离顶点几何和法线的贡献，交 Claude 检查拟合后颅底和颈部的过渡及法线平滑。

**新增强制约定：C++ Build.sh / UBT 也必须使用与 UE 同一把锁。** 22:33 Codex 未加锁链接造成 dylib 短暂缺失，rui 的 ab600750130147c79cbe4febbbe333bb 日志明确为模块找不到。后续编译不再与编辑器并行。


## 第二轮（2026-10-22）产品需求说明书

C3 先等待 Claude 在 STATUS 的 Claude 一节写入“Groom 重新导出完成”，再读取九份新 ABC。源 radius=1 的问题由 Claude 修正；Codex 不修改发丝源数据。首先验证男主的真实 FaceMesh 绑定耗时与画面，再渲染七人并运行原 QA report/dashboard。C4 先验证 idle/walk/sit 的 IK Retargeter 和 archetype 预览；登录和正式身份 auto-rig 由用户处理。C6 以 Docs/characters 的服装和发型规格同步身份数据，继续独立英雄 GLB 加载。

## 第二轮接口文档

- `ue_import_character.py <id|all>`：导入前、持锁编辑器内再次检查 Claude 的交付标记；发丝来源 SHA256 改变才重新导入。头发直径使用 sidecar 均值 0.0075 cm（0.075 mm），眉毛 0.008 cm（0.08 mm）；拒绝非有限值及明显错误的米制直径。导入目标仍为 `/Game/Blueprints/Characters/Imported/<id>`，自动生成 10% guides，保留真实 Strands LOD；Cards 未生成。
- `ue_inventory_animation.py`：只读本地资产与 API 清点，写 `Saved/CharacterEngine/C4-inventory.json`，走共享完整编辑器锁。
- `ue_retarget_character.py`：引擎自带 TutorialTPP idle/walk 与明确标为 handkey 的坐姿源，经 IK Retargeter 输出到 `/Game/Animation/CharacterPreview`。目标为 MetaHuman 插件真实 archetype 的本地副本；不会伪造正式身份骨架或保存 MHC。`BP_me2026` 预览由 `WordQuestAnimationPreview` 驱动，`EvaluatePreview(state,seconds)` 可采样 pelvis/head/feet/hands，预览状态为 idle/walk/sit。
- 网页 `CharacterIdentity.outfit` 新增袖型、鞋色、裙摆/鞋跟高度和领口元数据；`necklace` 记录黑皮绳和深金属吊坠。`characterLook().wardrobe` 传递作者规格；独立 GLB 保留原几何，不由身份表自动生成鞋跟或裙装。男主回退使用已有 shirtJacket 贴图模式，女主程序回退选择 dress；Rocketbox 身体本身仍不能代替最终 A 字裙、吊带与项链，最终外形依赖 Claude 的 GLB 交付。

## 第二轮测试（持续追加）

- 离线安全合约 20/20，通过交付标记所属章节、直径单位、错误直径拒绝、路径隔离、共享锁等校验。
- 动画清点完整编辑器退出 0；本机已能发现 MetaHuman Optional 动画/Core Data 资产，之前“缺少 Core Data”的记录为上一轮历史状态，正式合成质量仍需实际图像验证。
- 新动画预览 C++ 类共享锁编译成功，15.60 秒。C4 实际重定向/动作采样尚待执行。
- 网页 `VITEST_MAX_WORKERS=2 npm test`：76 文件、811 前端测试 + 7 数据测试通过；`npm run build` 通过。首次默认并行跑测试时，旧服装断言已按新需求更新；两个既有重型网格测试在 UE/Blender 同机高负载时超过 5 秒，限制测试 worker 数后全量通过，未放宽断言/超时。


### 第二轮 C3 实测补充（2026-10-22）

九份源 Groom 已重新导入，来源 SHA256 全部匹配。男主正常 FaceMesh 绑定耗时 1.98 秒；`d71249389b61439db7b2882400460159` 五视图含真实皮肤，但仍有条纹，渲染成功不表示质量通过。新增 `InspectGroom` 只读检测实际 UE 几何：男主最大直径 0.006164 cm、最长相邻线段 0.171545 cm；眉毛 0.008 cm / 0.098730 cm，均为合理尺寸。

Metal 对照：只为诊断进程启动时覆写 `r.HairStrands.Strands.UseTriangleStrips=0`（只读 CVar 不能在运行中随意切换），配合 rigid/rest-only 对照后长条消失；尚待保留皮肤绑定、只改 triangle-list 的复核。没有修改全局引擎或作者发丝。参考 Epic 的 [Groom 导入与绑定指南](https://dev.epicgames.com/documentation/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine)；当前平台结果以本项目实测为准。

`ue_render_compare.py --triangle-list` 提供这项启动级对照；`ue_render_cast.py --import-before` 在每位渲染前重新核对源哈希，防止作者继续更新源文件后沿用旧导入。角色皮肤保持交付资产设置，`preview_material=Authored`；已选 Skin 的角色不切换材质；若保存的模式是彩色 Topology，仅使用 display-only Editable 选择器显示角色已有 SkinSettings 的合成皮肤，不提交肤色设置、不保存 MHC。上文 C2 缺少 Core Data 时的灰白 Skin 是 2026-10-21 的历史验证。


### C3 相机与 Mac 配置修复

`Config/Mac/MacEngine.ini` 仅对 Mac 启动设置 `r.HairStrands.Strands.UseTriangleStrips=0`。正常 FaceMesh 绑定对照已证明长条消失（`71bc95eca95d4a08a11b5f0edea4f85d`，1.73 s）；不会在运行中改只读 CVar。`ConfigureViews` 对已保存的相机也开启 AntiAliasing/TemporalAA，已有 bAlwaysPersistRenderingState 保留历史。发丝 lookdev 组件强制 LOD0，不使用远景降档作为质量验收输入。最终本机构建成功 13.02 秒。

CPU 几何检查用于发现单位错误，长发 16 CV 可以有数厘米的相邻线段，因此不会套用男主短发的密度上限。Lin 真实最长相邻线段 2.305 cm，首次 2 cm 限制误拦后已改为只拦明显单位错误，真实数值保留在 capture.json；没有修改作者线段。人脸检测失败会作为 quality_issues=FAIL 记录，仍保存完整五视图供 QA 诊断，不再用单一检测器中止采集。

`ue_validate_character_round2.py` 按编译→七人五视图→原版 report/conform_report/dashboard→C4 预览顺序执行，建议外层 run_ue_serial.sh 持同一把锁，子进程验证祖先后复用锁，保证比较期间 MHC 不被另一 UE 进程改写。日志与逐步骤退出码写 `Saved/CharacterEngine/Round2/`。渲染退出 0 仅表示图像采集完成，quality_status 及 QA 的 FAIL/N/A 单独保留。
