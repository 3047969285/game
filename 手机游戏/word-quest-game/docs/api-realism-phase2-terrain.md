# 接口文档：写实化阶段 2：地表与草地

对应 PRD：`docs/prd-world-realism.md` 阶段 2。

## 目标

地形从“顶点色 + 一张平铺细节图”改为**逐像素多层材质混合**：

| 层 | 用途 | 出现位置 |
|----|------|----------|
| 0 草地 grass | 主地表 | 平地、缓坡 |
| 1 枯草 dryGrass | 冷暖、干湿变化 | 低频噪声斑块、高处 |
| 2 泥土 dirt | 裸露土壤 | 噪声斑块、路边、树下 |
| 3 碎石 gravel | 碎石滩 | 中频噪声斑块、坡脚 |
| 4 岩面 rock | 岩石 | 陡坡（三向投影，避免拉伸） |

## 模块 `src/features/world/terrainLayers.ts`（纯逻辑，不 import three，可单测）

```ts
export const LAYER_COUNT = 5;
export type LayerId = 0 | 1 | 2 | 3 | 4;

export interface LayerWeightsInput {
  /** 法线 y 分量（1 = 水平） */
  normalY: number;
  /** 地形高度（世界单位） */
  height: number;
  /** 三个 0..1 噪声：dry / dirt / gravel 斑块（由调用方用 fbm 求得） */
  nDry: number;
  nDirt: number;
  nGravel: number;
  /** 每层的“高度图”值 0..1（来自各层纹理的 alpha），用于高度混合，让过渡呈现颗粒边缘而不是糊在一起 */
  layerHeights?: [number, number, number, number, number];
}

/** 返回 5 个层权重，和为 1，均 ≥ 0 */
export function layerWeights(i: LayerWeightsInput): [number, number, number, number, number];

/** 生成 GLSL 函数源码：与 layerWeights 使用同一组常量（阈值、过渡宽度），保证 CPU/GPU 一致 */
export function layerWeightsGLSL(): string;

export interface TileTextureData {
  size: number;
  /** RGBA8，长度 size*size*4。albedo 贴图：rgb = sRGB 颜色，a = 该层高度图 */
  albedo: Uint8Array;
  /** RGBA8。normal 贴图：rgb = 切线空间法线（0..255 编码），a = 粗糙度 */
  normal: Uint8Array;
}

/** 生成一层可无缝平铺的程序纹理（周期噪声，左右 / 上下边界连续） */
export function generateLayerTexture(layer: LayerId, size: number, seed: number, palette: LayerPalette): TileTextureData;

export interface LayerPalette { grass: number; dryGrass: number; dirt: number; gravel: number; rock: number }

/** 由现有 biome 地表配色（getGroundPalette 的 grass/dirt/rock）推导 5 层配色 */
export function paletteFromGround(ground: { grass: number; dirt: number; rock: number }): LayerPalette;
```

### 纹理内容要求（写实）

- **草地**：多尺度噪声底色 + 大量细短草叶笔触（方向随机、明暗不一），偶有小花点；高度图 = 草叶密度。
- **枯草**：偏黄褐，草叶笔触更长更稀，夹杂土色。
- **泥土**：多尺度噪声 + 小石子 / 土块（带阴影边），细裂纹；高度图在石子处高。
- **碎石**：密集的不规则卵石（Voronoi / 随机多边形），每颗有明暗与描边阴影；高度图 = 石子凸起。
- **岩面**：分层的岩石纹理（拉伸噪声 + 裂隙），带风化色差和少量苔藓色；高度图 = 岩面起伏。
- 法线贴图由高度图求梯度得到（Sobel），强度适中；粗糙度：泥土 / 岩面较高，碎石略低。
- 所有纹理都是**周期性**的：用周期噪声（坐标对 size 取模），保证平铺无缝。
- 尺寸：high 512，med 512，low 256。5 层生成总耗时目标 < 250ms（high）。

## 渲染集成（`World3D.buildTerrain` / `paintTerrain`）

- 5 层 albedo 打包进一个 `THREE.DataArrayTexture`（depth = 5，sRGB，mipmap），5 层 normal 打包进另一个（线性）。
- 地形材质继续用 `MeshStandardMaterial` + `onBeforeCompile`：
  - 片元着色器里用世界坐标 xz 采样，平铺尺度约 3.5 米一次；同时用 0.37 倍尺度、旋转 37° 的第二次采样做去重复。
  - 用 `layerWeightsGLSL()` 求权重（输入：世界法线 y、高度、三个 fbm 噪声、各层高度图 alpha），再做**高度混合**。
  - 岩面层用三向投影（xz / xy / zy，按法线绝对值加权）。
  - 混合后的法线替换 `normal_fragment_maps`，粗糙度替换 `roughnessmap_fragment`。
  - 保留现有的低频明暗斑、云影 `cloudK`、自定义雾。
- 顶点色改为只承载**单元主题的整体色调和大尺度明暗**（保留 desat 逻辑），不再决定层分布。
- 每个单元切换时（`applyBiomeToTerrain`）按 `paletteFromGround(getGroundPalette(biome))` 重新生成纹理并替换，旧纹理 `dispose()`。同一配色有缓存则复用。
- low 画质：只用第一次采样（不做去重复采样），岩面不做三向投影，纹理 256。

## 草地（`buildGrass` 现有的 InstancedMesh 草叶）

- 每片草叶的颜色：在草地层颜色附近随机（色相 ±0.03，亮度 ±12%），叶尖更亮偏黄、叶根更暗（模拟根部遮蔽）。
- 草叶颜色跟随所在位置的层权重：在泥土 / 碎石 / 岩面权重高的地方草叶变稀、变矮、偏枯黄（CPU 放置时用 `layerWeights` 判断）。
- 保留现有风吹和角色踩踏。

## 测试 `src/features/world/terrainLayers.test.ts`

- `layerWeights`：和为 1、非负；水平平地且噪声低时草地权重最大；`normalY` 很小（陡坡）时岩面权重最大；`nDirt` 高时泥土权重明显上升。
- `generateLayerTexture`：长度正确；同种子结果相同；**无缝**：第 0 列与第 size-1 列、第 0 行与第 size-1 行的平均色差小于内部相邻列的平均色差 × 2；法线编码后的 z 分量 ≥ 128（朝外）。
- `paletteFromGround`：5 种颜色都不同；枯草比草地更偏黄（色相更小或 r/g 更大）。
- `layerWeightsGLSL()` 返回的字符串里包含函数名和与 TS 相同的阈值常量。
