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
"$ENGINE/Engine/Build/BatchFiles/Mac/Build.sh" WordQuestUEEditor Mac Development "$PROJECT" -WaitMutex -NoHotReloadFromIDE
```

无头自检：

```sh
"$ENGINE/Engine/Binaries/Mac/UnrealEditor-Cmd" "$PROJECT" \
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
