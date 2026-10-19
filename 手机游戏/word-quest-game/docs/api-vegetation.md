# 接口文档：成片植被

模块分两层：纯函数布局规划（可单测，不依赖 WebGL）和 three.js 渲染构建。

## `src/features/world/vegetationPlan.ts`（纯逻辑，不 import three）

```ts
export type VegetationKind = "broadleaf" | "pine" | "bush" | "rock";

export interface VegetationInstance {
  kind: VegetationKind;
  /** 该类别内的造型变体序号，0 ≤ variant < VARIANTS_PER_KIND */
  variant: number;
  x: number;
  y: number;
  z: number;
  /** 均匀缩放 */
  scale: number;
  /** 绕 Y 轴旋转（弧度） */
  rotY: number;
}

/** 圆形避让区 [x, z, 半径] */
export type AvoidCircle = readonly [number, number, number];
/** 椭圆避让区（湖面）：中心、x / z 半轴 */
export interface AvoidEllipse { x: number; z: number; rx: number; rz: number }
/** 线段避让区（道路）：两端点和半宽 */
export interface AvoidSegment { ax: number; az: number; bx: number; bz: number; halfWidth: number }

export interface VegetationPlanInput {
  /** 区域中心与半宽 / 半深（世界坐标） */
  centerX: number;
  centerZ: number;
  halfW: number;
  halfD: number;
  quality: "high" | "med" | "low";
  /** "space" 时只出 rock */
  decorStyle: string;
  seed: number;
  groundY: (x: number, z: number) => number;
  avoidCircles?: AvoidCircle[];
  avoidEllipses?: AvoidEllipse[];
  avoidSegments?: AvoidSegment[];
  /** |x - centerX| 小于该值的条带不放植被（主世界中轴视线），默认 0 */
  clearCenterStrip?: number;
}

export const VARIANTS_PER_KIND = 3;
/** high 档各类别实例上限；med = 0.6×，low = 0.35× */
export const BASE_BUDGET = { broadleaf: 900, pine: 1100, bush: 1200, rock: 500 };

export function planVegetation(input: VegetationPlanInput): VegetationInstance[];

/** 林地密度 0..1（导出供测试） */
export function forestDensity(x: number, z: number, input: VegetationPlanInput): number;
```

### 行为

- 候选点用确定性抖动网格生成（种子随机，`seed` 相同输出完全相同）。
- 每个候选点取 `forestDensity`，与随机数比较决定是否落点。密度是低频值噪声，距边界 60 以内的区域额外抬高（远景林带）。
- 类别：密度高处以乔木为主（越靠边缘越偏针叶 `pine`），密度中等处是 `bush`，`rock` 在各处少量分布。
- 命中任一避让区、`clearCenterStrip` 条带或超出区域的候选点一律丢弃。
- 各类别数量不超过 `BASE_BUDGET × 画质系数`（向下取整）。超出时按“随机数 ×（1.15 − 密度）”升序保留，先删林缘稀疏处，林心保持成片。
- `scale` 范围：broadleaf 0.8–1.6，pine 0.9–2.0，bush 0.7–1.5，rock 0.5–1.3。
- `y = groundY(x, z)`；rock 额外 +0.15 × scale。

### 错误情况

- `halfW` 或 `halfD` ≤ 0 → 返回 `[]`。
- `groundY` 返回非有限数 → 丢弃该点。

## `src/features/world/vegetationField.ts`（three.js）

```ts
export interface VegetationField {
  /** 加入场景的根节点（内含若干 BatchedMesh） */
  group: THREE.Group;
  /** 每帧调用；内部节流（约每 0.4 秒一次）按相机距离切换精细 / 简化几何 */
  update(camera: THREE.Camera): void;
  /** 释放全部 BatchedMesh 几何体；共享材质（vcMaterial / getFoliageMaterial）不释放 */
  dispose(): void;
}

export function buildVegetationField(
  instances: VegetationInstance[],
  opts?: { lodDistance?: number /* 默认 70 */; castShadow?: boolean /* 默认 true */ }
): VegetationField;
```

### 行为

- 每个类别 × 变体生成一份**精细**和一份**简化**模型，复用 `props.ts` 的生成器（需给 `createTree / createPine / createBush` 加可选 `detail: "high" | "low"` 参数，默认 `"high"`，保持现有调用不变）。
- 按材质把子网格的几何体放进同一个 `BatchedMesh`（树皮、叶片、岩石、浆果各一个），所以总绘制调用是材质个数，约 3–4 个。
- 放进同一个 BatchedMesh 的几何体属性要一致（position / normal / color / uv；缺 uv 的补常量 uv，缺 color 的补白色）。
- `perObjectFrustumCulled = true`。
- LOD：用 `setGeometryIdAt` 在精细和简化几何之间切换。一个实例由多个子网格组成时，它的所有子网格一起切换。

## `World3D` 集成

- `rebuildDecor()`：算完湖泊位置后调用 `planVegetation`。避让区来自：现有入口规则（主世界：节点入口半径 26）、单元模式锚点 25、湖面椭圆、道路线段（相邻节点连线，半宽 7）；主世界设 `clearCenterStrip: 14`。
- 字段 `vegetation?: VegetationField`：重建前先 `dispose()`；在 `tickScene` 里调用 `update(camera)`；`dispose()` 时一并释放。
- 现有 scatter 循环里的树（`roll < 0.24` 分支）删掉，交给植被场；其余花、芦苇、倒木保留。

## 测试 `src/features/world/vegetationPlan.test.ts`（vitest）

- 同一输入两次调用，结果深度相等；换种子后结果不同。
- 所有实例都不落在避让圆、椭圆、线段和中轴条带内。
- 所有实例都在区域范围内，且各类别数量不超过 budget。
- low / high 总数比例在 0.25–0.45 之间。
- `decorStyle: "space"` 时只有 rock。
- 边缘带（距边界 < 60）的实例密度高于中部。
- `halfW <= 0` 返回 `[]`。
