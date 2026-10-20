# 记忆游戏界面与进度可靠性修复

## 产品需求说明书

玩家在第一人称课堂中途切换视角后返回时，尚未完成的附身对话必须继续显示，不能因切换动作被当作已回答。浏览器存储写入失败时，本次会话里的最新记忆进度仍应可读；读取结果也不能暴露内部数组引用。低画质与高画质场景道具应分别创建对应档位的水材质，开发水面预览页必须沿用当前水面模块接口。

## 接口文档

- `MemoryStage.meAct()` 只有在 `meDialog()` 完成且当前 session 未中断后才把幕编号加入 `dialogDone`；中断时返回 `false`，让幕留在当前视角流程中待恢复。
- `loadMemoryProgress()` 在最近一次 `localStorage.setItem()` 失败后返回最新会话内副本，即使旧存档仍可读。持久化读取和内存 fallback 都返回独立的 `done`、`wordsSeen` 数组；`writeMemoryProgress()` 也会先复制输入，避免调用方后续修改内部快照。
- `createSceneKit(detail)` 将 `low` 映射到水面 `low` 画质，将 `high` 映射到 `high`。
- `tools/water-test.html` 使用 `createSimpleWaterMaterial()` 创建水面，并通过 `waterUniforms` 更新时间与太阳方向 / 颜色。

## 测试

- `src/features/memory/MemoryStage.test.ts` 模拟第一次对话等待期间切视角，再返回第一人称，验证对话重播且第二次成功完成。修复前回归复现为只调用一次对话（预期两次）。
- `src/features/memory/progress.test.ts` 让 `localStorage` 保留旧值并在写入时抛出配额错误，验证读取使用最新 fallback；随后篡改返回对象及数组，验证不会污染之后的读取。修复前返回了旧存档。
- `src/features/world/sceneProps.water.test.ts` 检查 `createSceneKit("low"|"high")` 产生的 shader cache key。修复前 low 档实际为 `water-v1-med-f-n`，测试按预期失败。
- `src/features/world/waterTestPage.test.ts` 核对预览页导入的命名导出真实存在于 `waterSurface.ts`，并驱动共享时间与太阳 uniforms。旧 `materials.ts` 导入会使该测试失败。
- 2026-10-20：上述 4 个文件中的 5 项 Vitest 测试通过；`tsc --noEmit` 通过。未运行全量测试、构建或浏览器画面验收，由整体验收流程执行。

Notebook 中途切视角时恢复未提交的部分作答仍未处理；该状态由 `study.ts` 内部维护，本轮按要求避开该文件，留待后续单独处理。
