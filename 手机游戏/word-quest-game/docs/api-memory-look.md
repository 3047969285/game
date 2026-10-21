# 回忆画面：记忆色调 · 天气 · 睁眼入场 · 丝滑度（PRD + API）

分支 `memory-game`。依赖 `api-memory-m1.md` §8–9、`api-memory-m1c.md` §7、`world/postPipeline.ts`、`world/unitBiome.ts`。

## 1. PRD

### 1.1 用户反馈
1. 色彩偏黄 → 要“记忆回溯 · 科技风”的冷、净、通透，并随每个单元的世界变化。
2. 加天气系统（回忆舞台与主世界都要）。
3. 进入回忆时视角不要又高又远、不要突然变白；要像人眼睁开，不能跳变。
4. 不够丝滑 → 排查卡顿、自适应分辨率、`?perf=1` 性能浮层。

### 1.2 验收
| 编号 | 验收标准 |
|---|---|
| L1 | 6 个单元各有一份 `MemoryLook`（数据，`memory/memoryLooks.ts`），关键色平均色温不偏暖，调色分离色调无黄色相。 |
| L2 | 调色通道（postPipeline 的 gradePass）由 look 驱动：中性偏冷的白、暗部微青、冷色泛光、边缘色差 + 扫描线（仅暗角区域）、黑位微抬、无暖色分离色调。 |
| L3 | 天空 / 雾 / 灯光颜色 / 洪流粒子颜色跟随 look；look 切换用 2 秒平滑插值。MemoryStage 与主世界（每个单元）都应用。 |
| W1 | 9 种天气：晴、阴、小雨、大雨、毛毛雨+薄雾、雪、阵风、黄昏（金色时刻，冷调珊瑚紫，不发黄）、夜。 |
| W2 | 每个脚本 / 舞台可设默认天气；`weather` 节拍在剧情中切换；主世界按单元默认天气，可 `setWeather`。 |
| W3 | 渲染：GPU 实例化雨线 / 雪片（相机相对体积、风驱动）；地面与水面涟漪溅射；潮湿变暗 + 粗糙度降低；水洼反光；云量与天空着色；雾浓度；光照强度；风力驱动植被摇摆。 |
| W4 | 室内（clubRoom）不在室内落雨，只在窗玻璃上有雨痕与灰色光。低画质粒子数减半。不新增任何合成声音。 |
| E1 | 入场：眼高 1.6 m、离场景近；黑 → 眼睑形暗角（上下两道软弧）缓慢张开，眨 1–2 次；画面从虚焦拉到清晰；曝光渐适应；轻微头部晃动；全程无白闪。 |
| E2 | 下潜（2090 → 2026）、上浮、光之门全部改为闭眼 / 睁眼隐喻，不再有白屏。 |
| E3 | 镜头连续：机位变化一律时间平滑（临界阻尼），远距离“切镜”只允许发生在眨眼的全黑瞬间。 |
| S1 | 更新循环里不产生逐帧分配（MemoryStage、PovRig、CinemaDirector、Materializer、MemoryFlow、Interaction）。 |
| S2 | 自适应分辨率：帧时间 > 18 ms 持续 2 s 逐级降像素比；< 12 ms 持续 2 s 逐级升回，带迟滞。 |
| S3 | `?perf=1`：显示 fps、帧耗时、draw calls、三角形数、像素比。仅开发用，默认不加载。 |

### 1.3 非目标
不改角色模型；不加任何合成音；不改变学习 / 答题逻辑。

## 2. API

### 2.1 `memory/memoryLooks.ts`（纯数据 + 纯函数，无 three 依赖）
```ts
type Rgb = { r: number; g: number; b: number }       // sRGB 0..1
interface MemoryLook { id; label; sky:{top,mid,bot}; fog:{color,density}; sun:{color,intensity}; hemi:{sky,ground}; ambient; grade:{...}; flow:{dustA,dustB} } // 颜色为 0xRRGGBB
interface ResolvedLook { /* Rgb / number 字段，可原地插值 */ }
LOOKS: Record<"unit01"…"unit06"|"memory2090"|"neutral", MemoryLook>
lookFor(unitId?: string): MemoryLook
resolveLook(look, out?): ResolvedLook
lerpLook(a, b, t, out): ResolvedLook           // 无分配
class LookBlender { constructor(initial); setTarget(look, seconds = 2); update(dt); readonly current: ResolvedLook; readonly settled: boolean }
lookKeyColors(look): number[]                   // 供测试
warmth(rgb): number                              // r - b
```
`LookBlender` 用 smoothstep 时间曲线（`t = elapsed / seconds`），保证两端速度为 0。

### 2.2 `world/weather.ts`（纯逻辑）
```ts
type WeatherKind = "clear"|"overcast"|"lightRain"|"heavyRain"|"drizzleMist"|"snow"|"windGusts"|"dusk"|"night"
interface WeatherParams { cloud, sunMul, hemiMul, envMul, exposureMul, fogMul, skyGrey, skyDark, sunTintR/G/B, rain, snow, mist, wind, gust, wetTarget }
WEATHER_PRESETS: Record<WeatherKind, WeatherParams>
class WeatherState {
  constructor(initial = "clear")
  set(kind, seconds = 4): void            // 雨 ↔ 雪互切时：先把当前降水淡到 < 0.02 再升新的
  update(dt): void
  readonly kind, target, params, wet, windNow(time)
}
precipitationBudget(kind, quality): { drops, flakes, splashes }   // low 档约为 med 的一半
isWeatherKind(x): x is WeatherKind
```
潮湿 `wet` 上升快（约 12 s 到饱和）、变干慢（约 60 s）。

### 2.3 `world/weatherFx.ts`（three 渲染）
```ts
class WeatherFx {
  constructor(opts: { quality; mode: "outdoor" | "window" | "off"; window?: {center,width,height,normalZ}; groundY? })
  readonly object: THREE.Group
  update(dt, state: WeatherState, camera, time)   // 相机相对体积，位置取模环绕
  setGround(y), setViewHeight(px)
  dispose()
}
class WetnessTracker { add(root); apply(wet); dispose() }  // 只在 wet 变化 > 0.01 时改材质：color × (1 - 0.35 wet)，roughness × (1 - 0.55 wet)
```
- 雨 / 雪：一个 `InstancedBufferGeometry` 面片（雨线沿速度方向拉伸，雪片为柔点），顶点着色器里算位置；`uIntensity` 按实例序号裁剪。
- 涟漪：另一个实例化环形面片，随机相位循环，仅雨天可见。
- 窗雨：窗玻璃前一张薄平面，片元着色器画雨痕（下滑的水珠 + 纵向拖尾），`uRain` 控制。
- 水洼：地面叠加平面，噪声遮罩 + 菲涅尔天空色高光，不透明度随 `wet`。

### 2.4 `memory/eyeOpen.ts`
```ts
eyeOpenAmount(t): number          // 睁眼开度 0..1，t 秒；含 1–2 次眨眼，单调趋近 1，不超过 1
eyeExposure(t): number            // 曝光（相对稳态）：略暗 → 1，不超过 1
eyeBlur(t): number                // 虚焦 1 → 0
class EyeController                // 纯逻辑：open / blur / exposure 随时间推进
  startOpening(): Promise<void>; close(seconds): Promise<void>; reopen(seconds): Promise<void>; blink(mid?: () => void): Promise<void>; openNow()
// eyePass.ts：createEyePass() / applyEye(pass, controller, aspect, time) —— ShaderPass：眼睑暗角 + 虚焦 + 曝光；完全睁开后自动关闭通道
// blink 是叠加在当前开度上的乘子，睁眼时间线进行中也能眨眼
```
`eyeOpenAmount` 的亮度增益 `gain = open × exposure ≤ 1`，无过冲（测试断言）。

### 2.5 `world/adaptiveScaler.ts` 与 `world/perfOverlay.ts`
```ts
class AdaptiveScaler { constructor({max, min = 0.75, step = 0.25, high = 18, low = 12, hold = 2}); push(frameMs, dtSec): number | null }
perfOverlayEnabled(): boolean; attachPerfOverlay(renderer, scaler?): { update(frameMs); dispose() }
```
迟滞：连续 `hold` 秒超过 18 ms 才降一档；连续 `hold` 秒低于 12 ms 才升一档；两者之间不动并重置计时。升降后冷却 `hold` 秒。

### 2.6 剧本与舞台扩展
- `Beat`：`{ kind: "weather"; weather: WeatherKind; seconds?: number }`。
- `MemoryScript.weather?: WeatherKind`（脚本默认）、`MemoryScript.look?: string`（look 覆盖）。
- `StageDef.weather?: { default: WeatherKind; mode: "outdoor" | "window" | "own"; window?: … }`。`own` 表示舞台自己画天气（apartment2090 的雨）。

### 2.7 入场与镜头
- `MemoryStage` 播放前把相机放在“首个机位的起点 / 出生点 1.6 m 眼高”，pov 直接设为 watch，不做高位远景混合。
- `CinemaDirector`：输出姿态经临界阻尼跟随（`smoothTime ≈ 0.28 s`）；`shot({from})` 若与当前姿态相距大于 0.35 m，则通过 `blinkCut` 钩子在眨眼全黑瞬间切换。
- `hud.fade` 默认黑；下潜 / 上浮 / 淡白全部走 `EyePass.close()`。`filmPass` 的 `uFade` 改为向深冷色（闭眼）淡出。

### 2.8 平滑度清单
| 位置 | 处理 |
|---|---|
| MemoryStage | 去掉逐帧闭包（`progress(filter)`、`forEach(cb)`、`find`），换成 Materializer 的零分配专用方法；`verbAnims` 原地压缩。 |
| PovRig | 复用 Euler / Vector3；`targetsProvider` 复用数组；头部晃动用时间函数。 |
| CinemaDirector | 临界阻尼；`getPose` 零分配。 |
| Materializer | 新增 `buildProgress()` / `windowFloorProgress()` / `firstRevealingCenter()`。 |
| MemoryFlow | 字母换字去 `Math.random`，look 颜色走 uniform。 |
| Interaction | `onScreen` Map 复用。 |
| 后期 | 泛光分辨率随画质；回忆舞台 GTAO 关闭；阴影贴图只在太阳 / 物体变化时更新（`shadowMap.autoUpdate` 在静止帧可关）。 |
| 自适应 | MemoryStage 与 World3D 共用 `AdaptiveScaler`。 |

### 2.9 主世界
`World3D.setBiome(unitId)` 之后同时设置 look 目标；`setWeather(kind, seconds?)`；`getWeather()`。每个单元有默认天气（unit01 晴、unit02 阴、unit03 毛毛雨+薄雾、unit04 阵风、unit05 夜、unit06 小雨），退出单元恢复晴。

### 2.10 实现备注（与初稿的差异）
- 记忆色调 / 天气对主世界的实际应用在 `World3D.updateAtmosphere()`（每帧），对回忆舞台在 `MemoryStage.updateLighting()`；环境反射贴图只在 look 过渡稳定后重建一次。
- 涟漪画在“玩家脚下高度”的平面上（主世界地形起伏，不画水洼；水洼只在 `flatGround` 的舞台里出现）。主世界的水面涟漪沿用同一层，没有单独的水面高度。
- 主世界只对地形材质做潮湿（变暗 + 粗糙度），建筑 / 植被不改材质。
- “你”的跟随机位改为肩后约 3.8 m、高 1.72 m（原 5.6 m / 2.2 m）。

## 3. 测试
`memoryLooks.test.ts`（6 单元齐全、色温、黄色相、插值端点与平滑）；`weather.test.ts`（状态机、降水交接、潮湿、预算）；`eyeOpen.test.ts`（曲线无过冲、单调、眨眼次数）；`adaptiveScaler.test.ts`（迟滞与冷却）；`types.test.ts` 补 weather 节拍校验；`stages.test.ts` 补 weather 配置。

## 4. 目视检查清单
入场睁眼 / 虚焦 / 无白闪；各单元冷色基调不偏黄；暗角处色差与扫描线；窗上雨痕、室内不落雨；`?perf=1` 浮层与降分辨率；主世界雨雪与植被摇摆。
