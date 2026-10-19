# 接口文档：写实化阶段 5：水面

对应 PRD：`docs/prd-world-realism.md` 阶段 5。

## 现状与问题

- 主世界 6 个湖，最多 3 个用 `three/addons` 的 `Reflector`（平面镜反射）：**每个反射湖每帧把整个场景再渲染一遍**。
  实测（高画质，出生点）：反射通道每帧 152 次绘制调用、约 344 万三角形，比主画面（82 次、约 163 万）还重。
- 水面材质 `materials.water()`：半透明 `MeshPhysicalMaterial` + 噪声起伏，没有深浅变化、没有岸边泡沫，看起来像一块蓝色玻璃。
- 湖岸是 `addLakeShore` 的一圈装饰。

## 目标

去掉 `Reflector`，换成**一个写实水面着色器**：

| 效果 | 做法 |
|------|------|
| 波纹 | 两层不同方向、不同尺度的滚动法线纹理（程序生成、可平铺）+ 一层远处低频大波，按距离淡化细节避免远处闪烁 |
| 反射 | 用 `scene.environment`（PMREM 天空）按扰动后的反射向量采样；加上太阳高光（GGX 或 Blinn，锐利、随波纹碎裂）|
| 菲涅尔 | Schlick，F0 = 0.02：俯视时透明能看到水底，平视时几乎全反射 |
| 深浅色 | 水深 = 水面高度 − 地形高度（见下）；浅水偏青绿、透明，深水偏深蓝绿、不透明；加吸收（Beer-Lambert）|
| 岸边 | 水深很浅处出现泡沫（噪声阈值 + 随时间流动），岸上 0.3–0.6 米宽的湿润带（地形材质在水位附近变暗、变光滑）|
| 焦散（可选，high） | 浅水区水底的流动光纹 |

### 水深从哪来

不用深度缓冲（避免依赖后期管线）。建湖时在湖的包围盒内按 64×64（low 32×32）采样 `sampleTerrainY`，生成一张 `DataTexture`（R 通道 = 地形高度，Float 或 HalfFloat；不支持时用 RGBA8 编码），水面片元按世界 xz 采样得到水底高度。

## 模块

### `src/features/world/waterSurface.ts`

```ts
export interface WaterBodyOpts {
  /** 湖面轮廓（局部 xz，已是不规则椭圆） */
  outline: THREE.Vector2[];
  /** 世界坐标中心与水面高度 */
  x: number; y: number; z: number;
  groundY: (x: number, z: number) => number;
  quality: "high" | "med" | "low";
  /** 主题色：浅水 / 深水 */
  shallowColor?: number;
  deepColor?: number;
}

export interface WaterBody {
  mesh: THREE.Mesh;
  dispose(): void;
}

export function createWaterBody(opts: WaterBodyOpts): WaterBody;

/** 共享 uniform：时间、太阳方向 / 颜色（World3D.tickScene 每帧更新） */
export const waterUniforms: { time: { value: number }; sunDir: { value: THREE.Vector3 }; sunColor: { value: THREE.Color } };
```

- 网格：湖面轮廓三角化（`ShapeGeometry`），high 档在内部适当细分以便近处顶点波动（可选）。
- 材质：`ShaderMaterial` 或 `MeshStandardMaterial` + `onBeforeCompile` 都可以，但必须：支持雾（与地形同样的自定义雾公式，远处融入雾色）、`transparent`、`depthWrite: true`（避免排序问题）、接收太阳阴影（可选，high）。
- 法线纹理由新的纯函数生成（见下），所有湖共享一份。

### `src/features/world/waterTextures.ts`（纯逻辑，不 import three）

```ts
/** 可平铺的波纹法线图（RGBA8，rgb = 切线空间法线，a = 高度） */
export function generateWaveNormalMap(size: number, seed: number): { size: number; data: Uint8Array };
/** 泡沫纹理（R 通道），可平铺 */
export function generateFoamTexture(size: number, seed: number): { size: number; data: Uint8Array };
/** 水深 → 颜色/透明度的 CPU 版本（与 GLSL 同参数，供测试） */
export function waterAbsorption(depth: number, shallow: [number, number, number], deep: [number, number, number]): { color: [number, number, number]; alpha: number };
```

## World3D 集成

- `rebuildDecor` 的湖泊循环：删除 `Reflector` 分支和 `ripple` / `lake` 网格，改为 `createWaterBody`；`disposeReflectors` 及 `reflectors` 字段、`QUALITY_PRESETS` 里的 `reflectors / reflectRes / reflectDist` 删除；`tickScene` 里 Reflector 距离暂停逻辑删除，改为更新 `waterUniforms`。
- 地形湿润带：地形着色器里，在已知湖泊附近（把湖中心 / 半径 / 水位作为 uniform 数组传入，最多 8 个）且高度在 `[水位 − 0.1, 水位 + 0.5]` 的像素变暗 15–25%、粗糙度降低。
- 单元场景里其他水面（搜索 `scenes/`、`unitLandscape.ts`、`sceneProps.ts`、`hubDetail.ts`、`hubLandmarks.ts` 中的水 / 池 / 喷泉 / 港湾材质）：能用 `createWaterBody` 的换成它；喷泉水池等小水面至少换成同一套水面材质（无深度纹理时按固定浅水深度处理）。
- `materials.water()` 如果不再有调用者就删除。

## 约束

- 删除反射后，高画质每帧总绘制调用至少减少 140，总三角形至少减少 300 万。
- 水面着色器 high 档每片元纹理采样 ≤ 8 次，low ≤ 4 次。

## 测试

- `waterTextures.test.ts`：法线图和泡沫图无缝（首尾列 / 行的平均差 < 内部相邻差 × 2）；法线 z 分量 ≥ 128；同种子一致。
- `waterAbsorption`：深度 0 时 alpha 最小、颜色接近浅水色；深度增加时 alpha 单调不减、颜色趋向深水色；负深度按 0 处理。
- 回归：原有 71 个测试全部通过。
