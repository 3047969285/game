# 学习场景道具细化接口

## 内部模块

- `sceneProps.ts` 新增类型 `PropDetail = "high" | "low"`，`createSceneKit(detail = "high")` 把档位放在 `SceneKit.detail`；已有函数 `openBook`、`bookStack`、`laptop`、`bench`、`planter` 的参数不变。
- `SceneContext.detail` 为可选档位，`createStage` 传递给 `createSceneKit`。未指定仍为高档。
- `buildUnitLandscape(biome, anchor, worldId?, worldTitle?, detail = "high")` 第五个参数为可选档位。`World3D` 把低画质映射为 `low`，其余为 `high`，继续复用原有舞台位置。
- `propGeometry.ts` 提供纸页曲面、纸页印刷与中空花坛边框几何；均为新创建、可独立释放的 `BufferGeometry`，不访问 DOM，不创建全局可变模型缓存。

## 几何约定

所有道具仍使用 `Frame` 的米制局部坐标：底面 y=0，家具主要面向 +z。翻开书宽约 0.44m、深 0.30m，左右页共用高度函数，印刷行随纸面弯曲。花坛沿用原有半径参数，土面位于石圈顶部以下，中心不再被实心石盖遮挡。

小件写入 `MergedBuilder`，使用 `SceneKit` 中已有材质；高档细节增加有限材质分组，低档省略细小印刷、键帽和固定件。调用者继续按现有 `disposeGroup` 生命周期释放最终网格与材质。

新增纸页印刷使用哑光 `PropMaterials.printInk`，书签随页缘下垂。`props.ts` 的 `leafCard` 将卡片 UV 的 U 范围限制为 0.05～1，避开 256px 图集左上角的 10px 白色区域；`withConstUV` 不变，保留实心树冠用途。

## 开发预览

`tools/scene-viewer.html` 保留单元和世界参数；新增 `detail=low` 与 `prop=book|books|laptop|bench|planter`，用于独立道具验收。页面显示统计与运行异常，生产学习页面不增加开发信息。

## 房屋立面补充

### 内部构建接口

- `getHouseFacadeLayout(w, h)` 接收房屋宽、高（米），返回按 `[door, leftWindow, rightWindow]` 排列的局部立面开口。本轮布局支持现有房屋调用尺寸，最小为 `1.7×2.0m`；局部原点为房屋地面中心，立面朝 `+z`。门中心 `x=0`、底边 `y=0.30m`，宽 `min(0.82, w-0.08)m`、高 `min(1.65, h-0.35)m`；门槛和入口不随布局改变。
- 两扇窗宽为 `min(0.56, max(0.20, (w-1.25)/2))m`，底边为 `min(1.20, h-0.80)m`，高为 `min(0.64, h-windowY-0.16)m`。中心横向坐标为 `±(w/2 - 0.05 - max(sillOverhang, lintelOverhang, 0.045) - windowWidth/2)`。房屋调用使用 `sillOverhang=lintelOverhang=0.025m`，确保外框与饰边满足窄墙边界；洞口横向在墙体分段处生成。
- `house(k, frame, w=2.4, h=2.6, d=2.2, roof, wall)` 保持原参数与默认尺寸。立面墙厚为 `min(0.16, d*0.12)m`，外表面位于局部 `z=d/2`；内部暖光背板退至 `z=-(wallDepth+0.03)m`（相对于窗洞窗框原点），窗玻璃、窗框仍在前景层。正面开洞由合并墙板分段实现，其他三面为封闭墙。
- `windowPane(k, frame, width, height, opts)` 在原选项上增加可选 `recess`、`sillOverhang` 与 `lintelOverhang`。省略时暖光板仍后退 `0.02m`、窗台外伸 `0.11m`、过梁外伸 `0.10m`，保留商店橱窗、旅舍二层窗等旧调用语义；房屋调用分别显式传入 `wallDepth+0.03m`、`0.025m`、`0.025m`。

### 画质与资源生命周期

- `World3D.rebuildUnitLandscape()` 将档位作为第五参数传给 `buildUnitLandscape(..., detail)`；`buildUnitLandscape` 创建 `SceneContext.detail`，随后传给 `createSceneKit(detail)`。World3D 的 `low` 选择映射到 `low`，`med/high` 映射到 `high`；未提供参数时默认为 `high`。low 省略窗帘并将窗棂降为 1×1，high 使用 2×2 窗棂及单侧窗帘。
- 开口布局只决定展示几何，不参与玩法坐标或碰撞。`house()` 仍把所有细节写入现有 `MergedBuilder`，没有新增每个开口独立的场景网格。`MergedBuilder.build()` 后的最终网格和材质按既有场景树生命周期由 `disposeGroup()`/World3D 清理；测试自行 dispose 合并几何与非共享材质。`windowPane` 的暖光/窗帘材质弱缓存按 `SceneKit` 生命周期键控，不由单个开口调用释放。
