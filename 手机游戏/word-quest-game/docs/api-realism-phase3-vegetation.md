# 接口文档：写实化阶段 3：植被

对应 PRD：`docs/prd-world-realism.md` 阶段 3。

## 问题

| 现状 | 要变成 |
|------|--------|
| 阔叶树冠 = 实心顶点色团块 + 256px 叶片卡片 | 由大量**叶簇卡片**组成的通透树冠，枝干从缝隙中露出，内部更暗 |
| 针叶树 = 7 层实心圆锥 + 少量卡片 | 真实针叶树结构：笔直主干 + 逐层轮生、末端下垂的枝条，每根枝条上是**针叶枝片**卡片，没有实心圆锥 |
| 灌木 = 实心团块 | 由叶簇卡片组成，底部有少量细枝 |
| 树皮 = 顶点色 | 程序树皮纹理（纵向裂纹、鳞片）+ 法线贴图，UV 沿树干展开 |
| 叶子不动 | 风吹摆动（树干轻晃、枝梢和叶片高频抖动），逆光时叶片透光 |

## 模块 `src/features/world/foliageTextures.ts`（纯逻辑像素生成，不 import three，可单测）

```ts
export interface RGBA8Image { size: number; data: Uint8Array }  // RGBA8, size*size*4

/** 叶片图集：2×2 格子，每格一种叶簇，alpha 为叶片轮廓 */
export const FOLIAGE_ATLAS_CELLS = { broadleaf: 0, broadleafDark: 1, conifer: 2, shrub: 3 } as const;
export function generateFoliageAtlas(size: number, seed: number): { albedo: RGBA8Image; normal: RGBA8Image };

/** 树皮：可沿 u 无缝平铺（周期噪声），v 方向也无缝 */
export function generateBarkTexture(size: number, seed: number, kind: "broadleaf" | "conifer"): { albedo: RGBA8Image; normal: RGBA8Image };

/** 图集里某格的 UV 矩形 [u0, v0, u1, v1] */
export function atlasRect(cell: number): [number, number, number, number];
```

### 内容要求（写实）

- **阔叶叶簇**：一根小枝上着生 8–14 片卵形 / 椭圆叶片，有叶脉（主脉 + 侧脉）、叶缘轻微锯齿、正反面明暗差、色相随机（绿 → 黄绿），叶片之间留空隙让 alpha 镂空。
- **深色叶簇**：同结构但更暗、更蓝，用在树冠内部，制造体积感。
- **针叶枝片**：一根细枝两侧密生针叶（细长线段，深绿偏蓝），枝片整体呈扇形 / 羽状。
- **灌木叶簇**：较小、较圆的叶片，更密。
- **树皮**：阔叶树皮灰褐、纵向不规则裂纹 + 横向浅纹；针叶树皮红褐、鳞片状剥落。法线由高度图 Sobel 求得。
- 每一格四周留出 alpha = 0 的边距，避免 mipmap 串色；颜色 **不要过饱和**。
- 尺寸：high 1024 图集 / 512 树皮；low 512 / 256。生成总耗时目标 < 200ms（high）。

## `props.ts` 改造

- 新增共享材质：
  - `getFoliageMaterial()`：改用新图集（`map` + `normalMap` + `alphaTest 0.45`、`side: DoubleSide`），在 `onBeforeCompile` 加入：
    - **透光**：`diffuse += albedo * sunColor * pow(max(dot(-viewDir, sunDir), 0), 4) * 0.35`（背光时叶片透亮）。太阳方向和颜色用模块导出的共享 uniform `foliageSun = { dir, color }`，由 `World3D.tickScene` 每帧更新。
    - **风**：顶点着色器里按世界位置相位、高度（`position.y`）和顶点色 alpha / 一个“摆动权重”属性做位移。整树低频轻摆（幅度随高度平方增长），叶片高频小抖动。时间用共享 uniform `windTime`。必须兼容 `BatchedMesh`（顶点着色器里先应用 `batchingMatrix` 再求世界相位；three r184 的 `batching_vertex` chunk 提供 `batchingMatrix`）和普通 Mesh。
  - `getBarkMaterial(kind)`：`MeshStandardMaterial`，`map` + `normalMap`（树皮纹理）+ `vertexColors`（保留明暗），同样加入整树低频摆动（与叶片同相位，避免叶子和树枝脱节）。
- `createTree` / `createPine` / `createBush` 保持签名（含 `detail` 参数）不变，内部重写：
  - **阔叶树**：保留现有分枝生成（主干、主枝、分叉），树干 / 枝条几何保留 UV（u 绕周、v 沿长度，按真实长度缩放让纹理不拉伸）。叶子：在枝梢周围按球壳分布叶簇卡片（每张卡片朝外、略随机倾斜），外层用 broadleaf 格，内层用 broadleafDark 格；去掉实心团块，或只在 high detail 保留一个很暗、半径 0.5 倍的内核来挡住穿透的天空。
  - **针叶树**：主干收细到顶；从下往上 6–9 轮枝，每轮 4–6 根枝条，下部枝长、上部枝短，枝条先水平伸出再末端下垂；每根枝条上沿长度排列 3–6 张针叶枝片卡片（面朝上、略下垂），顶端一束向上的枝片。不再使用 ConeGeometry。
  - **灌木**：从地面伸出 5–9 根细枝，叶簇卡片分布在半球形范围内，底部稀疏。
  - 卡片几何要带 `uv`（指向图集格子）、`color`（明暗：内部更暗、底部更暗，模拟自遮蔽）和摆动权重（存入 color 的第 4 分量或单独属性；注意 `vegetationField.ts` 的 `normalize()` 要求同一 BatchedMesh 内属性一致——如果新增属性，`normalize()` 也要补齐缺省值）。
  - low detail：卡片数量约为 high 的 1/4、更大张；针叶树 4–5 轮。
- 顶点预算：high 阔叶树 ≤ 12k 顶点、针叶树 ≤ 8k、灌木 ≤ 3k；low 分别 ≤ 2.5k / 2k / 800。

## 影响范围

- `vegetationField.ts`（BatchedMesh）、`nearScatter.ts`、`sceneProps.ts`、`scenes/*.ts`、`unitLandscape.ts` 等所有调用 `createTree / createPine / createBush` 的地方会自动获得新造型，**不要改它们的调用方式**。检查这些地方没有依赖旧材质的特定属性（比如直接改 `getFoliageMaterial().color`）。
- `createAncientTree()`（单元 3 记忆树）同样使用新叶簇和树皮。

## 测试 `src/features/world/foliageTextures.test.ts`

- 图集：尺寸正确；每格中心附近有不透明像素、每格边距一圈 alpha 全为 0；同种子结果一致。
- 叶片颜色不过饱和：所有不透明像素的平均饱和度（HSV S）< 0.65。
- 树皮：u 方向无缝（第 0 列和最后一列的平均差 < 内部相邻列平均差 × 2），v 方向同样。
- `atlasRect` 返回的 4 个格子互不重叠、都在 [0,1] 内。
- 另外为几何生成写测试（可以 import three，vitest 跑 node 环境没问题）：`createPine(1, "high")` 的叶片几何里没有 ConeGeometry 的特征（可以检查顶点数 ≤ 预算、叶片网格每个顶点都有 uv 和 color）；高 / 低细节顶点数都在预算内。

## 实现备注（阶段 3 落地）

- 新增 `foliageTextures.ts`（纯像素生成）、`foliageMaterials.ts`（共享材质 / 风 / 透光 / 阴影深度材质），`props.ts` 再导出 `getFoliageMaterial`、`getBarkMaterial`、`windTime`、`foliageSun`、`setFoliageQuality`、`disposeFoliageResources`。
- 风摆数据存在几何属性 `aSway`（vec2）：x = 整树低频摆幅（几何生成时按 (高度/树高)² 烘焙，物体空间单位），y = 叶片高频抖动幅度。着色器在 `begin_vertex` 之后位移 `transformed`（物体空间，之后才乘 `batchingMatrix` / `modelMatrix`）；世界相位取 `modelMatrix * batchingMatrix` 的平移列（普通 Mesh 为 `modelMatrix`）。
- 阴影：叶片 / 树皮材质各登记一对 `MeshDepthMaterial` / `MeshDistanceMaterial`（同样的风位移、同图集 alphaTest），由 `applyFoliageShadow(mesh, material)` 挂到 `customDepthMaterial` / `customDistanceMaterial`（`finish`、树 / 灌木的网格、`MergedBuilder.build`、`vegetationField` 的 BatchedMesh）。
- `World3D.tickScene` 每帧更新 `windTime`、`foliageSun`；`World3D` 构造时按画质调用 `setFoliageQuality`，销毁时 `disposeFoliageResources`。
- `vegetationField.normalize()` 额外复制 `aSway`（若有）。灌木 low 档不带浆果。
