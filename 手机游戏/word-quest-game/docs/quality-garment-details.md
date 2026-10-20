# 服装结构细节质量说明

## 产品需求说明书

服装细节应让人物更像穿着衣物，而不是表面光滑的假人。新增领口、肩缝、门襟、口袋轮廓、袖口和少量肘部褶线；线条保持低幅、贴面、平顺，不添加高频噪声、纹理或外部素材。细节随躯干、上臂和前臂锚点一起运动，不改变角色比例、衣型或动画生命周期。`low` 保留主要结构线，`high` 增加少量缝线和袖褶。

整套上衣细节的三角面预算由专项测试锁定：`low` 不超过 4,000 面，`high` 不超过 8,000 面；每个锚点、侧别和材质只输出一个合批几何。

## 接口文档

```ts
createGarmentDetails(options: {
  style: "tee" | "hoodie" | "coat";
  detail: "low" | "high";
}): Array<{
  anchor: "torso" | "upperArm" | "forearm";
  side: -1 | 0 | 1;
  material: "cloth" | "trim";
  geometry: THREE.BufferGeometry;
}>;
```

函数只构建几何，不创建 Mesh、材质或纹理。躯干坐标以脚底 `y=0`、前方 `+Z` 为准；上臂与前臂分别以肩、肘为原点，`Y` 向下、前方 `+Z`。`side: +1` 是角色左臂（`+X`），`side: -1` 是角色右臂（`-X`），躯干使用 `0`。`cloth` 与 `trim` 由调用方映射到现有衣料和内衬材质。返回的几何由调用方拥有；合并到人物网格后负责 `dispose()`。

## 测试

`garmentDetails.test.ts` 检查三种款式的锚点/材质分组、坐标范围、左右臂镜像数据、口袋线落在实体袋面、顶点与法线有效，以及低画质仍覆盖三类锚点。测试同时限制总三角面数并验证 `low` 明显轻于 `high`。

专项验证：`npm exec vitest -- run src/features/world/garmentDetails.test.ts`；类型验证：`npm exec tsc -- --noEmit`。
