# 接口文档：写实化阶段 4：岩石与道路（含阶段 3 收尾）

对应 PRD：`docs/prd-world-realism.md` 阶段 4。

## A. 阶段 3 收尾：残留的卡通植被

阶段 3 只重写了 `props.ts` 的 `createTree / createPine / createBush`。下面这些地方仍在用实心几何体代替植被，要换成写实植被：

| 位置 | 现状 | 改成 |
|------|------|------|
| `nearScatter.ts` 单元入口外圈 | `IcosahedronGeometry` 团块灌木 / 树冠、`ConeGeometry` 松树 | 用 `createTree / createPine / createBush`（`detail` 按距离或画质选择）。数量较多时走 `vegetationField` 的 BatchedMesh（`buildVegetationField`），不要每棵树单独一个网格 |
| `unitLandscape.ts` 庭院叶丛（`DodecahedronGeometry` crown / courtyardLeaf，约 716、817 行）、花园树冠（约 1085 行 `IcosahedronGeometry` InstancedMesh） | 实心多面体 | 修剪过的庭院灌木 / 小树：用 `createBush`（可缩放成球形修剪灌木）或 `createTree` 小尺寸 |
| `unit1Sanctuary.ts` 花坛叶丛（约 143、181、188 行 `IcosahedronGeometry`） | 实心多面体 | `createBush` 叶簇 |
| 其他 `scenes/*.ts`、`sceneProps.ts`、`hubLandmarks.ts` 里用多面体充当叶子的地方 | — | 同上（搜索 leaf / foliage / canopy / hedge 材质名） |

保持位置、大致尺寸和轮廓不变（玩法和构图不变），只换成写实造型。

## B. 岩石

`props.ts` 的 `createRock(scale)` 和 `nearScatter.ts` 里的 `rockGeo`：

- 造型：在噪声变形之外，加**分层节理**（沿一个随机倾斜平面方向做台阶状切削）和**棱角**（少量平面切削，让一部分面是平的），不要像一团泥。底部压平、略微埋入地面。
- 材质：新共享材质 `getRockMaterial()`：
  - 三向投影的程序岩石纹理（可复用阶段 2 `terrainLayers.generateLayerTexture` 的 rock 层，或新生成更细的版本）+ 法线 + 粗糙度。
  - **苔藓 / 地衣**：世界法线朝上的面混入苔藓色（`smoothstep(0.55, 0.9, N.y)` × 噪声），底部接地处加深（接触阴影 + 湿润）。
  - 顶点色只保留每块岩石的色差。
- 现有所有调用者（vegetationField 的 rock、nearScatter、散布、scenes）自动获得新岩石。

## C. 道路

### 主世界道路

`World3D.rebuildPath()` 现在：`buildRoadRibbon` 带状路面 + 沿路约 170 块独立的 `BoxGeometry` 石板（每块一个 Mesh、三种材质轮换）+ 路灯。

改为：

- 新模块 `src/features/world/flagstonePath.ts`：
  ```ts
  export interface FlagstoneOpts {
    width: number;           // 路宽
    groundY: (x: number, z: number) => number;
    seed: number;
    quality: "high" | "med" | "low";
  }
  /** 沿曲线铺不规则石板：返回一个合并网格组（每种材质最多一个网格） */
  export function buildFlagstonePath(curve: THREE.Curve<THREE.Vector3>, opts: FlagstoneOpts): THREE.Group;

  /** 纯逻辑：沿路生成石板多边形（Voronoi / 抖动网格切分后内缩出缝隙），可单测 */
  export function planFlagstones(points: Array<{ x: number; z: number }>, width: number, seed: number): Array<{
    cx: number; cz: number;
    /** 多边形顶点（世界 xz），逆时针，5–8 个点 */
    poly: Array<[number, number]>;
    /** 0..1 色调随机 */
    tone: number;
  }>;
  ```
- 石板：不规则多边形，内缩出 4–8 cm 的缝隙；挤出 8–12 cm 厚，顶面边缘倒角；每块顶点贴合地形高度；颜色在灰 / 暖灰 / 青灰之间随机，有磨损；缝隙里露出泥土 / 苔藓（路面下方保留 ribbon 作为泥土 / 碎石底层）。
- 路缘：两侧零散的小碎石和泥土过渡，不要硬边。
- 全部石板合并成**一个网格**（共享一个石材材质，颜色走顶点色 + 纹理），绘制调用从约 170 降到个位数。
- 单元路线（`unitRoute`）的深色石板也用同一套，只是配色不同。
- 路灯保留，但同样合并几何（杆 / 臂 / 灯罩各一个合并网格或 InstancedMesh）。

## 约束

- 主画面每帧绘制调用相比阶段 3 结束时要**下降**（道路合并后至少减少 150）。
- 所有新纹理 / 材质在 `dispose()` 和单元切换时释放（共享材质只在 `World3D.dispose` 释放，与阶段 3 一致）。

## 测试

- `flagstonePath.test.ts`：`planFlagstones` 确定性；所有石板中心都在路宽范围内；任意两块石板多边形不重叠（用中心距离 + 多边形包含测试抽样检查）；每块 5–8 个顶点、逆时针；石板覆盖率（石板面积 / 路面面积）在 0.6–0.9。
- 岩石：`createRock(1)` 顶点数 ≤ 1500，几何底部最低点接近 0（埋地），有 uv / color 属性。
- 回归：原有测试全部通过。

## 实现备注（阶段 4 落地）

- 岩石材质在 `rockMaterial.ts`（`getRockMaterial` / `getFlagstoneMaterial` / `getRockTextures`），随 `disposeFoliageResources()` 一并释放；单例材质带 `userData.shared`，`disposeGroup` 跳过它们（避免 decor 重建时反复释放共享纹理）。
- `flagstonePath.ts` 额外导出 `buildFlagstonePaths`（多条折线合并成同一个网格）、`addCornerBlend`（折线拐点处平滑石板基准线，中线仍沿原折线）、`smoothPolyline`。
- `buildNearScatter` 现返回 `{ group, update, dispose }`；World3D 持有句柄，在 `rebuildDecor` / `dispose` 释放植被 BatchedMesh。`disposeGroup` 也会 dispose BatchedMesh。
- 岩石底面落在 y=0，`vegetationPlan` 的岩石 y 改为 `gy - 0.04 * scale`（原 `+0.15`）。
- 场景 / 地标残留的实心多面体叶团已换成 `foliageClumpGeometry`（叶片卡片团）与 `bushParts`（写实灌木）；`scenes` 与 `hubLandmarks` 中大块岩石改用 `createRock` 几何。
