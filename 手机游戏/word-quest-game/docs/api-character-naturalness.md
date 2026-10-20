# 人物自然度改造：接口文档

## 人物创建

`createPerson(opts: PersonOptions): THREE.Group` 继续服务于普通场景 NPC。默认创建静态合批人物；设 `animated: true` 时构造单一骨架与按材质合并的蒙皮网格，并将控制器挂到 `root.userData.personRig`。`garmentDetail` 接受 `low | high`，缺省为 `low`。衣服款式仍由 `outfit` 或现有确定性选择逻辑决定。

回忆人物入口为：

```ts
spawnActor(actor, poses = [], garmentDetail = "low")
```

第三个参数可选，旧的 `spawnActor(actor, poses)` 调用仍有效并使用 low。`MemoryStage` 按场景质量传递：low → low，med/high → high。创建人物的默认姿势、人物外观和位置语义不变。

## 坐标与层级

人物面朝局部 `+Z`，站姿脚底 `y=0`，髋部 `y≈0.91`。身体骨骼位于髋部，静坐时移到座面高度；人物参考框架将髋坐标转为身体网格的脚底坐标。头骨锚点位于身体框架 `y=1.5`。

肩关节在 `x=±0.19, y=1.42`，上臂沿局部 `-Y` 延伸约 `0.28`；肘点在上臂局部 `y=-0.28`，前臂继续沿 `-Y` 延伸约 `0.255`，腕点在肘局部 `y=-0.27`。左右臂的镜像几何共享基础形状。坐姿仍通过 `ActorPose`/`seated` 参数解释，保留原座高与剧情脚本。

衣物细节 API `createGarmentDetails({ style, detail })` 返回 `{ anchor, side, material, geometry }[]`。`anchor` 是 `torso | upperArm | forearm`；`side` 为 `-1 | 1` 表示左右臂，躯干为 `0`；`material` 为 `cloth | trim`。躯干坐标使用脚底原点，前方 `+Z`；上臂、前臂各自以肩/肘为原点，局部 `Y` 向下，`+Z` 朝前。该 helper 不创建 Mesh 或 Material，调用方负责将几何加入相应锚点并在合并后释放返回的 BufferGeometry。

## 姿势与表情

`PersonRig.setPose(pose, seated, duration?)` 将原有姿势角插值到目标姿势；默认过渡时长 `0.42s`。`PersonRig.setExpression(expression, duration?)` 可独立切换 `neutral | listen | think | softSmile | talk`；默认过渡 `0.24s`。`PersonRig.update(dt, time, walking, walkPhase, seed)` 驱动呼吸、头部微动、非同步眨眼、视线、眉毛和嘴部；talk 嘴部以时间连续脉冲开合。现有演员脚本仍通过 `ActorHandle.setPose()`、`walkTo()` 驱动人物。

## 资源生命周期

- 每个 animated 人物的源部件在构造时合成到单骨架的蒙皮网格；源网格和非缓存的源几何在合并后释放。
- `ActorHandle.dispose()` 移除人物并释放该演员的最终 BufferGeometry 与 `ownedMaterials`。
- `people.ts` 中的 LOD 基础几何及共享眼睛、鞋、手机和屏幕材质由模块级缓存持有；演员释放时不得 dispose 这些共享对象。
- `createGarmentDetails` 返回的几何归调用方所有；不得将其缓存或在完成合并前释放。

## Viewer

`tools/avatar-test.html` 可用 `mode=actor` 预览演员；`v=face|upper|full|hand` 选择机位，`yaw=0.25` 固定比较朝向；`pose=listen|talk|walk|read|phone|write|reach` 选择动作，`expression=...` 单独覆盖表情，`outfit=tee|hoodie|coat` 和 `detail=low|high` 选择衣物款式与细节档。统计信息放在 `window.__characterStats`，人物控制器放在 `window.__actorHandle`。

## 真人模型默认显示路径（最终实现）

`loadHumanModels(): Promise<void>` 预载本地 male/female GLB，使用模块模板缓存并在失败时保留回退身体。App 在构造 MemoryStage 前等待；World3D 在加载后重建玩家，保留位置、朝向和可见性。

`attachHumanVisual(root, controls, kind?)` 克隆独立骨架/几何/材质，隐藏原身体网格与原灯具，保留动作控制节点和剧情道具，返回更新函数。`root.userData.updateHumanVisual` 供探险者每帧同步；演员的 `PersonRig.update` 自动调用。`root.userData.humanModel` 为 male/female。

`HumanControls` 提供躯干、头部、双臂、肘、髋、膝、踝的控制节点，以及眨眼、嘴部、眉部、微笑和视线读取函数。`retargetRotation` 将角色空间旋转共轭到模型骨骼的绑定空间，避免直接写入不同骨骼轴造成肢体折断。模型按脚底 y=0、高约 1.8m 归一。

面部驱动 ARKit `eyeBlinkLeft/Right`、`jawOpen`、`mouthSmileLeft/Right`、`eyeSquintLeft/Right`、`browInnerUp` 与视线方向形变。讲话开合并非音素对齐。

`tools/avatar-test.html` 增加可见的姿势、人物、表情、机位选择器；`human=male|female` 选择基础外观。真人服装采用资源贴图；前述 `outfit` / `garmentDetail` 的几何预算描述适用于程序化回退，不再是默认真人身体的可见网格预算。

演员/PovRig/主世界销毁时释放实例骨骼、几何和材质；纹理标记 shared，由模板缓存持有，单个角色销毁不得影响其他角色。纹理不包含外部 URI。
