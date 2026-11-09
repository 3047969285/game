# 第五轮 C18 / C19：组装预检与真实渲染能力

## 产品需求说明书

先完成 Offline day 可玩垂直切片，再逐项评估硬件光追/Lumen、MegaLights、虚拟纹理和物理相机。这里的预检只报告源码能力、运行时配置和已交付资产，不能把开关值当成实际渲染通过，也不能把旧男女主当作新版交付。作者的 MHC、脸、头发、服装只读；不登录 Epic、不触碰密钥。UE/Blender 重活不得并发，16 GB 机器只串行加载角色。

## 接口文档

- `python3 Tools/round5_renderer_audit.py --self-test`：纯数据判定自测，不启动编辑器。
- `python3 Tools/round5_renderer_audit.py`：通过 `run_locked_editor` / `run_ue_serial.sh` 启动完整编辑器，只读 CVar 与已有原生 `WordQuestRenderDiagnostics.capabilities()`；不强制开启配置、不编译新 shader；写 `Saved/Round5/render-capabilities.json` 和 `.log`。运行时 capability 和 configuration 分开，实际 view 启用情况仍标为 `requires_view_evidence`。
- `python3 Tools/round5_assembly_preflight.py`：不启动 UE，列 7 个源 MHC 的 SHA256、已组装 BP、skin_v3 缓存以及人类参考图存在性；写 `Saved/Round5/assembly-preflight.json`。目录存在并不意味着人物质量或皮肤有效。
- `python3 Tools/round5_assembly_preflight.py --editor`：走串行锁、完整编辑器，只读调用每个 MHC 的 `try_add_object_to_edit` / `can_build_meta_human`，随后 `remove_object_to_edit`。不 build、不保存 MHC、不触发登录；记录实际 can_build 和 BP 内容路径。每人结束后 GC，减少并行内存。`--self-test` 只测离线交付状态判定。
- 新版交付不能靠 mtime 推断。Claude 未明确交付时报告 `new_hero_delivery=NOT_CONFIRMED`；预检仅记录当前来源 hash。正式组装由主控收到交付后执行 Claude 的 `char_assemble.py`，Optimized + High，每个角色单独进程，退出成功还必须检查真正 BP 资产。

## 本机 UE 5.8 源码支持表

引擎根 `/Users/Shared/Epic Games/UE_5.8` 当前指向外盘。以下是本机源码事实，尚非运行时性能验收。

| 项目 | 源码证据（相对 Engine/） | 结论与限制 |
|---|---|---|
| Metal SM6 硬件 RT | `Config/Mac/DataDrivenPlatformInfo.ini:95` 开启 RT/Shaders/Inline；`Source/Runtime/Apple/MetalRHI/Private/MetalRHI.cpp:1120` 按设备 feature、编译宏和 `-noraytracing` 设置 GRHI 能力 | UE 5.8 不能沿用“Mac 一律不支持光追”的旧结论；设备必须实读，`r.RayTracing` 当前关闭也不等于硬件不支持 |
| Metal 设备门禁 | `Source/Runtime/Apple/MetalRHI/Private/MetalDevice.cpp:374` 查询 `supportsRaytracing()` | Apple 设备型号、shader 平台与实际 RHI 必须匹配 |
| Lumen | `Config/Mac/DataDrivenPlatformInfo.ini:77` 为 SM6 `bSupportsLumenGI=true`；项目原生 diagnostics 读取 GI/Reflection method | GI/Reflection method=1 表示请求 Lumen；HW 路线还要求 `RHIHardwareRayTracing` 与 RayTracing/HWRT 开关。实际贡献需同机位图和帧时间 |
| MegaLights | `Renderer/Private/MegaLights/MegaLights.cpp:531–548` 的 IsRequested/HasRequiredTracingData；`MegaLightsRayTracing.cpp:361–382` | 项目开关只是请求，view PPV/show flags、shader 和追踪数据也要满足。此版本有软件距离场路径（`r.MegaLights.SoftwareRayTracing.Allow`），不能只引用 CVar 描述声称只支持硬件；开启后仍需画面对比，不自动判通过 |
| VT | 只读 `r.VirtualTextures`、`r.VirtualTexturedLightmaps`、`r.VT.EnableAutoImport` 与实际纹理 `virtual_texture_streaming` | CVar=1 并不证明当前墙地面/人物纹理走 VT。不能全量强改原材质采样器，必须逐项检查 |
| 物理相机曝光 | C15 CineCamera 配置与曝光曲线证据 | 本脚本只审计全局 auto-exposure CVar，camera/PPV 的最终叠加由 C15 实测 |

## 测试与验收

1. 自测配置与硬件分离：硬件支持但项目关闭不能写 UNSUPPORTED；项目开启但硬件不支持不能写 ACTIVE。两个 self-test 无 UE、无网络运行。
2. 真实审计由主控在没有 Blender 重活时运行；检查完成 marker，报告不得含密钥或任意环境变量转储。
3. 组装预检每个 MHC 打开前后 SHA256 必须一致；can_build=false 是阻塞，不绕过 auto-rig/Epic 登录。
4. skin_v3 必须在**新进程重开**验证 TextureSource 非空、mip 与尺寸非零、正常肤色实际截图。只有文件存在不算通过。原问题是 Editable 瞬态纹理只有 PlatformData，复制后保存重开没有 mip。
5. 必须补同机位 before/after 4K 图、曝光适应曲线和帧时间，再接受 C19；预检的 status 始终不代表视觉完成。

## 当前编写状态

工具已编写，未启动 UE、未 build 或组装、未改项目渲染设置及作者资产。7 个源 MHC 文件在本次文件检查范围中；尚无 `/Game/MetaHumans` BP 目录，skin_v3 清单尚缺，新男女主交付未确认。实际数量以运行工具输出为准。
