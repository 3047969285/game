# 人物自然度改造：测试记录

## 自动化验证

本轮针对性检查通过：

- `npx tsc --noEmit`：通过。
- `npx vitest run src/features/world/avatarBody.character.test.ts src/features/memory/actors.test.ts src/features/memory/PovRig.test.ts src/features/world/garmentDetails.test.ts`：4 个文件、22 项通过。

测试覆盖：头部与上臂袖 SDF 不接触采样盒平面边界；演员仅有一套骨架、蒙皮权重归一；姿势插值、走路摆臂摆腿、talk 连续开合、neutral 静息闭口、表情眉眼差异、非同步眨眼、动态书本/手机/笔切换；low 与 high 真实演员构造的三角面差异和批次预算；衣物锚点、镜像、衣物细节几何预算；幽灵的 depthWrite、去脚圈/灯笼、不可拾取、第一人称隐藏与拖尾行为；ActorHandle 独占资源释放。

MemoryStage 将 quality 映射到 `spawnActor` 的第三参数：low 真实调用 low 几何，med/high 调用 high 几何。Actor 专项用同一 `spawnActor` 入口分别构造两档并验证 high 增加超过 1,000 个衣物三角面，且人物 draw 批次数不增加；人物整体测试上限为 50,000 三角面、11 个最坏批次（含隐藏道具）。测试同时验证衣物细节 helper low ≤4,000 / high ≤8,000 三角面。

## 视觉复核机位

主协调者使用 `http://127.0.0.1:5194/tools/avatar-test.html` 做前后截图与 WebGL 视觉审阅。重点参数：

```text
?mode=actor&v=upper&yaw=0.25&pose=listen&detail=high
?mode=actor&v=face&yaw=0.25&pose=talk&detail=high
?mode=actor&v=upper&yaw=0.25&pose=walk&detail=low
?mode=actor&v=upper&yaw=0.25&pose=listen&detail=low
```

复核脸型、闭口静息与说话开合、眉眼表情、肩袖连续性、衣物细节贴面、动作过渡和 low 档视觉完整性。使用原 explorer `v=upper&yaw=0.25` 机位时检查探险者表情 API 兼容。视觉截图最终结论和路径由主协调者补录。

## 未覆盖项

本轮没有重复整仓库 Vitest、生产 build 或跨设备 WebGL 回归；这些由主协调者统一运行。测试无法替代不同 GPU 上的实际蒙皮边缘、皮肤阴影和表情可读性复核。特效 shader 和 MemoryStage 教材/存储变更由其他工作范围处理，不在本人物测试结论内。

## 真人模型接入后的追加验证

上一轮程序化近景未通过视觉检查，因此最终默认显示改用经许可核对的 Rocketbox 蒙皮身体。

- 新增 humanVisual.test.mjs：两份 GLB 完整性、大小、三角面预算、内嵌贴图、所需骨骼、眨眼/嘴角/下颌形变与 Microsoft 版权通知；不同绑定朝向下的动作适配与零动作保持。
- actors.test.ts 新增连续 3,600 帧回归，验证头部转角不会逐帧累积。修复 head.rotation.z 的累加错误。
- 浏览器近景已确认真人眼白与虹膜、嘴唇、皮肤、衣领/门襟/褶皱；男性 8,684、女性 8,308 三角面，各 3 个可见材质批次。坐姿连续蒙皮无原腰部敞口；主世界玩家也加载真人外观。
- 截图保存在本地 .cache/character-refinement/，该缓存不作为仓库交付资产。最终整仓测试、生产构建和回忆场景检查由主协调者补录。

## 最终整体验证（2026-10-20）

- `npm test`：42 个 Vitest 文件、567 项测试通过；7 项 Python 数据打包测试通过。
- `npm run build`：TypeScript 与 Vite 生产构建通过，dist 已更新并包含本地模型及许可。
- 浏览器实际操作：男女面部/上身、坐姿、读书动作、主世界玩家；无模型 shader 编译错误。修复并回归了脚圈后新增模型导致的 traverse 启动异常。
- 正式回忆：导入原创 4 句测试正文，保存后重新加载游戏，使用自带 memauto/memfast 测试开关走完 Unit 1 A 并返回“已重温”界面；生产预览端口 5195 首次回溯能够显示场景并到达 Ready 选择，无控制台错误。
- 回退模式因独立眼白/虹膜/面部材质，将五人预算从 25 调整为 40，整幕上限从 150 调整为 165；默认本地真人为每人 3 个可见身体批次，另加当时可见道具。
- 未进行真实手机 GPU 的长时间帧率测量；嘴部没有音素同步，当前真人外观为两套基础模型。
