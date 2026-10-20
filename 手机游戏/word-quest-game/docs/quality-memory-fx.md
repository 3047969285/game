# 记忆场景特效质量说明

## 产品需求说明书

记忆场景中的环境光尘、物件显形、候选提示和定格胶片应保持轻柔、稳定、易辨认。环境粒子采用低密度的青绿与暖米色，显形以前沿噪声渐进展开，边缘辉光与 Ghost 点阵避免高亮白边和快速闪烁。目标提示保留问号、光点和柔光方向提示，降低蓝色竖线的对比度。定格胶片保留暖色与暗角，降低颗粒幅度、变化频率和暗角强度。

粒子预算沿用单次 Points 绘制：MemoryFlow 为 high 384、med 278、low 140 个点；Materializer 保持现有环形缓冲容量与每件上限；每个目标提示仍使用两个 Sprite。实现不增加 draw call、纹理或后处理 pass。低画质继续使用最少粒子。

系统启用 `prefers-reduced-motion` 时，环境光尘、提示浮动、提示呼吸、边缘脉冲、抖动和汇聚粒子运动会收敛或停止；物件表面直接显示最终显形状态。显形与隐藏仍按原设定时长推进，调用方等待的 Promise 只在原有生命周期结束时完成。

## 接口文档

- `new MemoryFlow(quality, { reducedMotion? })`：选填覆盖系统动态偏好。无覆盖时读取 `prefers-reduced-motion`。每种画质仍只有一个 Points 对象。
- `new Materializer({ capacity?, perPiece?, headless?, reducedMotion? })`：新增可选 `reducedMotion`；粒子池和 `reveal()`、`hide()`、`completeAll()` 的完成语义保持不变。
- `new CandidateMarks(scene, reducedMotion?)` 与 `new TargetBeacons(scene, reducedMotion?)`：新增可选动态偏好覆盖，默认读取系统设置。新增参数只控制装饰性呼吸与浮动。
- `applyFilm(pass, controls, time)`：签名不变；系统偏好减少动态时抖动 uniform 被压为零，其他底片控制仍生效。全部有效控制量为零时 pass 关闭。

## 测试

- `MemoryFlow.test.ts` 检查 high/med/low 粒子预算，以及 reduced-motion 下流动时间固定。
- `Materializer.test.ts` 检查 reduced-motion 下材质立即呈现最终表面，同时 Piece 状态与 Promise 仍等待原显形时长；着色器检查 Ghost 使用稳定世界坐标抽样。
- `CandidateMarks.test.ts` 检查 reduced-motion 下提示位置与亮度稳定，并保留原来的目标提示淡入淡出、可辨认性和清理行为。
- `filmPass.test.ts` 检查零控制量关闭 pass，减少动态时关闭抖动并保留暖色底片效果。

