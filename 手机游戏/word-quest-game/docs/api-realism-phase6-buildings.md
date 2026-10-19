# 接口文档：写实化阶段 6：建筑与地标材质

对应 PRD：`docs/prd-world-realism.md` 阶段 6。

## 现状

- `detailKit.createKitMaterials()` 提供 stone / stoneDark / stoneWarm / paveA / paveB / slate / wood / woodDark / brass / steel / copper / terracottaRoof / glass 等材质，`kitShader.applyKitPattern` 用世界空间三平面程序图案给其中一部分加灰缝、块面明暗和磨损——**只改颜色**，没有法线、粗糙度、AO，近看仍是平的。
- `unitLandscape.ts`（29 个）、`stations.ts`、`landmarks.ts`、`scenes/*.ts`、`hubDetail.ts` 等处直接 `new MeshStandardMaterial({ color })` 的纯色材质很多，只有 `applySurfaceGrain` 加了一点颗粒。

## 目标

建筑、地标、桥、台阶、栏杆、灯柱等人造物的表面看起来像真实材料：砌块有凹凸和灰缝深度，木板有纹理和接缝，金属有拉丝 / 氧化 / 划痕，屋瓦有起伏，墙根有污渍，边角有磨损。

## 模块 `src/features/world/surfaceTextures.ts`（纯逻辑，不 import three，可单测）

```ts
export type SurfaceKind =
  | "masonry"   // 石砌块（错缝、不规则块面、深灰缝）
  | "brick"     // 砖墙（统一尺寸、砂浆缝、个别砖色差）
  | "plaster"   // 灰泥 / 粉刷墙（细颗粒、细裂纹、局部剥落）
  | "paving"    // 方石铺地
  | "wood"      // 木板（纵向纹理、节疤、板缝）
  | "tiles"     // 屋瓦（弧形起伏、搭接阴影）
  | "metal"     // 金属（拉丝、细划痕、局部氧化斑）
  | "concrete"; // 混凝土（气孔、模板缝）

export const SURFACE_KINDS: SurfaceKind[];

/** 每层输出：albedo 为“细节亮度 + 轻微色偏”（颜色由材质 color 决定），normal rgb + roughness 写 alpha，ao 写 albedo.a */
export function generateSurfaceTexture(kind: SurfaceKind, size: number, seed: number): {
  size: number;
  albedo: Uint8Array; // RGBA8：rgb 细节（围绕 0.5–0.8 灰度，带轻微色偏），a = AO
  normal: Uint8Array; // RGBA8：rgb 切线空间法线，a = 粗糙度
};

/** 每种材质的物理尺度（米）：一张贴图在世界里覆盖多大 */
export const SURFACE_SCALE: Record<SurfaceKind, number>;
```

- 所有贴图周期性无缝；high 512、low 256；8 种生成总耗时 < 250ms（high）。

## 渲染：`kitShader.ts` 重写 `applyKitPattern(mat, kind)`

- 签名扩展为 `applyKitPattern(mat, kind: SurfaceKind, opts?: { grime?: number; wear?: number })`，旧的 4 种 kind 名称保持兼容（masonry / paving / wood / tiles）。
- 8 种贴图打包成两个 `DataArrayTexture`（albedo/AO 和 normal/roughness），全局共享一份（`getSurfaceArrays(quality)`），在 `World3D.dispose` 释放。
- 片元着色器：世界空间三平面投影（按法线加权，锐化 power 4），按 `SURFACE_SCALE` 缩放；
  - `diffuseColor.rgb *= detail.rgb / 0.65`（保持材质原色的平均亮度）；
  - 法线：三平面 whiteout 混合后替换 `normal_fragment_maps`；
  - 粗糙度：材质 roughness 与贴图 alpha 相乘调节；
  - AO：乘到 `material.aoMap` 的效果位置（`aomap_fragment` 之后乘以 ambient 遮蔽）；
  - **墙根污渍（grime）**：竖直面上，世界 y 距本物体最低点（用 uniform `uKitBaseY`，默认按 mesh 世界包围盒最低点在 `onBeforeRender` 设置，或按调用方传入）0–1.2 m 内逐渐变暗、偏褐；加少量竖向雨水流痕（拉伸噪声）；
  - **边缘磨损（wear）**：用法线变化率（`fwidth(normal)`）在棱角处提亮 / 露出底色。
- 继续保持 `mat.fog = false` 等原有设置；`customProgramCacheKey` 按 kind 区分。
- low 画质：只用顶面 + 一个主侧面两次采样（双平面），不做雨痕。

## 推广到纯色材质

- 新增 `classifySurface(mat: THREE.MeshStandardMaterial, hint?: string): SurfaceKind | null`：按调用方提示或材质颜色 / metalness / roughness 推断（metalness > 0.5 → metal；暖褐低饱和 → wood；红褐 → brick/tiles；浅灰 → plaster/concrete；中灰 → masonry），发光、透明、顶点色、已有 map 的材质返回 null。
- `materials.applySurfaceGrain(root)` 当前给整棵子树加颗粒——改为对每个可分类材质调用 `applyKitPattern`（同一材质只处理一次），这样 `unitLandscape`、`scenes`、`stations`、`landmarks` 等现有调用自动获得写实表面。
- `createKitMaterials()` 中：stone/stoneDark/stoneWarm → masonry，paveA/paveB → paving，wood/woodDark → wood，terracottaRoof/slate → tiles，brass/steel/copper/darkSteel → metal（copper 带铜绿），soil 不处理，rock → 用阶段 4 的岩石材质规则或 masonry。

## 约束

- 不新增绘制调用；不改几何。
- 发光体（emissive）、玻璃、水、植被、地形、人物不受影响。

## 测试

- `surfaceTextures.test.ts`：8 种贴图无缝、同种子一致、法线 z ≥ 128、AO 平均值在 0.6–0.95；brick 的灰缝像素比例在合理范围（5–25%）。
- `classifySurface`：metal / wood / brick / plaster 典型颜色归类正确；emissive、transparent、vertexColors、有 map 的返回 null。
- 回归：原有 81 个测试全部通过。
