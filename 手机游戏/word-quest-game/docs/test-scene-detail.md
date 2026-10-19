# 三维近景精细化验收记录

日期：2026-10-19。对应 [PRD](prd-scene-detail.md) 与 [内部接口](api-scene-detail.md)。

## 上一轮记录：自动验证

- `npm test`：28 项 Vitest 测试与 7 项 Python 测试通过，共 35 项。本轮新增 17 项三维几何、材质采样和道具约束测试。
- `npm run build`：数据打包、TypeScript 检查与 Vite 生产构建通过，仓库中既有的 `dist` 分发目录同步重建。
- `git diff --check`：通过。
- 覆盖纸页的曲面/法线/尺寸、印刷贴合、书签下垂、花坛中心开口与下凹土面、固定种子、高低画质、面数/材质合并预算，以及所有零件随 Frame 旋转和平移。
- 叶片卡片的 UV 回归测试先复现采到白色色块的问题，修复后通过；实心树冠的白色采样区域保持原样。

## 浏览器对照

使用同一预览器、同一相机和 1280×720 视口，在临时本地预览中加载本轮改动前的共用道具代码作对照。统计是当前画面渲染调用与三角形计数（包括阴影渲染），不代表 FPS；三角形按 0.1k 四舍五入。

| 单元与抽样场景 | 绘制调用：改前 → 改后 | 三角形：改前 → 改后 |
| --- | --- | --- |
| unit01 / section_b-world-2 书桌 | 147 → 153 | 108.3k → 109.8k |
| unit02 / section_c-world-3 海图室 | 177 → 177 | 220.4k → 220.4k |
| unit03 / section_b-world-1 旅舍 | 150 → 152 | 166.6k → 166.7k |
| unit04 / section_b-world-2 工艺品质 | 143 → 143 | 163.7k → 163.7k |
| unit05 / section_b-world-4 任务控制 | 209 → 209 | 301.7k → 301.7k |
| unit06 / section_a-world-1 书店 | 314 → 318 | 256.2k → 257.6k |

抽样最大增加 6 次调用，三角形最大增幅约 1.4%，在本轮目标范围内。没有用到这批共用道具的场景保持原样。

unit01 同一书桌场景低档为 151 次调用 / 104.8k 三角形，确认实际场景已收到低画质参数。另分别近看翻开书、书堆、电脑、长椅和花坛，检查贴合与阴影；花坛叶片周围的白点已消除。六个单元的抽样预览均未记录到控制台 error。

真实游戏也验证了主地图 → 单元 → 第一篇文章世界的入口，页面与三维场景正常加载，未记录到控制台 error；未修改或绕过学习解锁进度。

## 范围与保留问题

本轮是共用近景道具与叶片采样的细化，未重做人物、全部建筑或全部文章场景。未进行手机持续帧率、发热、所有关卡和长时间内存稳定性测试。生产构建仍有原有的大分包提示，未为消除提示而提高告警阈值。改动尚未提交或部署。

## 本轮补充：房屋门窗立面

### 自动验证

- `sceneProps.test.ts` 新增窄屋真实外包边界、墙体射线洞口、玻璃/后退暖光板命中、门洞和完整墙面命中，以及转向后的窗玻璃命中测试。
- 窄房布局以 `w=1.7m, h=2.0m, d=1.5m` 验证：门仍在 `x=0, y=0.3m`，门宽 `0.82m`；窗台、过梁内缘都离门框至少 `0.04m`，窗外框至少离墙边 `0.05m`。
- 单屋高档不超过 3500 三角形、合并网格不超过 10；low 三角形严格少于 high，网格数不增加。旋转实例、high/low 结果都在测试结束时释放合并几何和材质。
- 低档入口经代码路径核验：`World3D.rebuildUnitLandscape()` 将 `quality === "low"` 传给 `buildUnitLandscape` 第五参数，后者经 `SceneContext.detail` 交给 `createSceneKit`。预览器同样通过这条 `buildUnitLandscape` 构建路径呈现 high/low 场景。

### 最终画面与预算抽样

前后使用同一 scene viewer、同一 1280×720 视口和近景机位。窄房立面原始基线为 299 draw / 266.7k tris；最终 high 为 299 draw / 269.8k tris（+3.1k、约 +1.16%），最终 low 为 297 draw / 265.6k tris。总体 draw 不增；截图中四屋窗洞清晰、窗台与门框不相接、分段墙板无可见漏缝。此场景计数包含整幅场景及阴影，不代表实机 FPS。

最终截图保存于仓库忽略目录 `.cache/3d-refinement-next/`：

| 场景 | 抽样统计 | 截图 |
| --- | --- | --- |
| unit06 / section_a-world-3 resilience high（四座窄屋） | 299 draw / 269.8k tris | `unit06-resilience-final.png` |
| unit06 / section_a-world-3 resilience low | 297 draw / 265.6k tris | `unit06-resilience-low-final.png` |
| unit06 / section_a-world-1 bookshop | 318 draw / 257.6k tris | `unit06-bookshop-final.png` |
| unit03 / section_b-world-1 hostel | 152 draw / 167.5k tris | `unit03-hostel-final.png` |
| unit01 / section_c-world-1 clinic | 175 draw / 176.0k tris | `unit01-clinic-after.png` |
| unit02 / section_c-world-2 peace-contact | 224 draw / 299.0k tris | `unit02-peace-contact-after.png` |

bookshop 橱窗中的书本未被新墙面遮挡；hostel 一层房屋开口和独立二层窗都保持可见。unit01、unit02、unit03、unit06 中实际调用 `house()` 的场景会获得立面变化；unit04、unit05 没有被此次共享房屋改动影响。

## 本轮最终：门窗立面验证

- `npm test`：31 项 Vitest 与 7 项 Python 测试通过，共 38 项。
- `npm run build`：数据打包、TypeScript 检查、Vite 生产构建通过；`dist` 按既有构建流程更新。
- 源码与文档的 `git diff --check`：通过。暂存完整 `dist` 构建产物后，生成的 `dist/assets/index-XaqkhRtC.js` 因内嵌 Three.js shader 字符串带有尾随空白而产生检查提示；未手工改动构建产物。
