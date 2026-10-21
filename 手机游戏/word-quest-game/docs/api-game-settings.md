# 游戏设置与性能调度

## 产品需求说明书

主世界和全部回忆使用相同的设置入口：画面、环境、声音、操作。桌面默认 QHD 画质优先，手机默认自动分辨率；显示实际绘制像素。提供即时开关与持久化，只有场景细节档位需要重载。人物模型、脸、发型、服装不在本次范围内。

## 接口文档

- `gameSettings.ts`：`getGameSettings()` 返回缓存只读设置，`updateGameSettings(patch)` 清洗、保存、通知；`subscribeGameSettings` 返回解除订阅函数；`resetGameSettings()` 按当前设备恢复默认。localStorage 键 `word-quest-settings-v1`，损坏/不可写时内存回退；兼容原 `world-resolution-mode`。不涉及服务端接口。
- 画面字段：`tier: auto|high|med|low`、`resolution: quality|1080p|balanced`、`shadows/ssr/ao/taa/aerial/bloom`、`shadowSize:1024|2048`、`fpsLimit:0|60|120`、`showStats`。分辨率保持视口宽高比，受 `maxTextureSize` 限制。固定档锁住绘制像素；自动档使用自适应比例。
- 操作字段：`sensitivity:.25–2.5`、`invertY`（回忆视角）、`exploreFov:40–75`（探索视野）、`followDistance:2.5–12` 米（第三人称跟随）。界面音效 `sfxVolume:0–1`；配乐使用现有 MusicPlayer 音量/播放/持久化接口，不创建第二套音轨。
- `attachGameSettings(host,options)` 返回释放函数并提供 `setResolution(w,h)`。设置开关按场景能力禁用；打开面板停止游戏移动输入，关闭恢复，Escape 关闭。天气/太阳时间通过回调进入现有平滑状态机；回忆太阳方向由剧情决定，天气可能被后续剧情接管。天气/时刻不跨剧情持久保存。
- `bindRenderSettings` 在主世界与回忆共用，只分发改变的字段；声音/操作滑块不会重新分配阴影或后期目标。`unavailableFeatures` 标识本场景不启用的后期功能。几何档位影响实例/LOD 数量，应用时重载。
- `EffectBudget`：EMA 约 .5 秒，持续 >18 ms 约 2 秒降级，8 秒冷却，持续 <12 ms 约 12 秒恢复一级。等级 1 暂停 SSR，等级 2 再暂停 AO；水面捕获间隔 4/8/16 帧，阴影按等级降低更新频率。手动关闭的效果不会被预算恢复覆盖。
- `FrameGate` 只跳过昂贵模拟/渲染，不阻塞浏览器 RAF。帧率上限是调度上限，不保证硬件能达到目标。`?perf=1` 或设置开关启用统计，最多保留 600 帧；均值/中位数/P95 排除非有限、非正和 >250 ms 的间隔。记录 RAF 帧间隔，不代表 GPU 时间。
- `World3D.capture2K()` 同步输出原生 2560×1440 PNG data URL，并在 finally 恢复尺寸、比例与投影；仅用于验收，不是正常帧中的持续捕获。`tools/world-quality.html` 提供同机位记录、通道诊断、120 帧采样、暂停与原生 PNG 预览/保存；`tools/memory-runtime-test.html` 调用正式 MemoryStage，保持场景用于设置验收，不写学习进度。
- 所有设置监听、DOM、后期纹理、阴影与水面目标随场景正常释放。没有新增外部美术资产。

## 测试

`gameSettings.test.ts` 检查清洗、默认、增量分发和释放；`renderResolution.test.ts` 检查 QHD、手机预算、尺寸保护、迟滞与统计；`postPipeline.test.ts` 检查 composer 原生像素及手动 AO/自动预算交互；其余现有世界/回忆/天气/摄像机测试完整保留。完整验收记录及性能限制见 `world-quality.md`。

### 第三人称默认机位

用户反馈进入主世界后视角过高过远。原跟随距离 18 m、基础高度 7.2 m（俯仰后约 8.3 m）改为默认 4.2 m、注视人物 1.45 m 高度、初始俯仰 .18 rad，实际相机约 2.2 m 高。出生/切换学习世界使用 `ExplorerCamera.snapToPlayer` 直接放到跟随位置，避免从旧高空位置飞下来。拖动支持水平/垂直环绕；滚轮调整距离，操作页可持久保存 2.5–12 m 跟随距离。移动采用指数阻尼，方向跨 ±π 采用最短转角，近景相机避让地形高度；尚未加入完整建筑碰撞臂。观赏模式仍可主动拉远。人物外观未修改。

`ExplorerCamera.test.ts` 回归首帧距离/高度/方向、跨角度边界、60/120 Hz 跟随一致性、地形防穿与设置距离。截图 `09-third-person-after.png`，原高空默认视角见 `06-performance-after.png`；视角变更属于需求对照，不作为同机位性能比较。
