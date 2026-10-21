# 独立英雄 GLB 游戏接入

## 产品需求说明书

遵守 collab-3d.md：Claude 制作 me2026 / Lin 资产；Codex 接入游戏、对照工具及测试。英雄资产存在且核心骨架合格时，直接保留其几何、材质、贴图、发型与原始米制身高（男 1.84 m、女 1.68 m）；不对它重染、雕脸、生成发型或统一归一到 1.8 m。未交付、HTTP 错误、非 GLB 或核心骨架缺失时，使用现有 Rocketbox / 程序模型回退，不阻断游戏。

新资产是否达到参考图外观，需要 Claude 交付真实文件后目视验收；测试夹具不会冒充交付资产。Codex 不创建 public/models/heroes/ 中的占位模型。

## 接口文档

- `CharacterIdentity.model` → `characterLook().model` → `PersonOptions.model` → `AppearanceBase.model`：模型路径相对于 public/models/。
- `HERO_MODELS`：me2026 = heroes/me2026.glb；lin = heroes/lin.glb。
- `loadCharacterModel(path)` / `loadCharacterModels(paths)`：加载本地 GLB，去重并发请求，成功缓存模板；缺失和失败不会永久缓存，下次进入或影棚“重新检查交付”可重试。已经加载的文件更新后刷新页面以重新载入。
- `registerCharacterModel(path,scene)`：校验核心同名骨骼、蒙皮网格、有限几何和米制尺寸；记录脚底、身高、面数、材质数、缺失手指和 ARKit 表情警告。核心骨骼缺失会拒绝登记；预算或表情警告不修改资产。
- `getCharacterModelReport(path)`：可读报告供影棚核对。已知两位英雄的身高偏差超过 2.5 cm 会报告。
- `loadHumanModels(models?)`：保留原底模加载，额外尝试请求的独立模型。App 每次进入回忆读取脚本演员的 model；地图加载男主，既有老年观察者保持原有模型。
- `attachHumanVisual`：优先查独立模板；SkeletonUtils 克隆骨架，各实例独立几何、材质和表情数组，源贴图只读共享。英雄跳过所有 Rocketbox 专用换装 / 雕刻 / 发型 / 归一化，沿用既有 HumanRig、HumanAnimator 与 ARKit 驱动。
- `tools/hero-studio.html`：左侧原始参考，右侧同角度实时模型。支持正面/侧面/背面/胸像/四分之三、眨眼/微笑/张嘴、重新检查未交付文件，未交付时不创建或显示旧模型，右侧只显示“新模型制作中（Claude）”，表情按钮禁用。使用中性影棚灯，静态画面按需渲染，减少校对时的持续 GPU 占用。
- 参考图从用户 Downloads 的 male_sheet.png、female_sheet.png、lian1–8.png 原样复制至 tools/hero-reference/，校验和在 manifest.json。开发工具参考不作为游戏模型。

英雄模型应包含 Hips、Spine/Spine1/Spine2、Neck、Head、左右肩/上臂/前臂/手/大腿/小腿/脚/脚趾，以及 Left/RightHand{Thumb,Index,Middle,Ring,Pinky}{1,2,3}。ARKit 最低表情：eyeBlinkLeft、eyeBlinkRight、jawOpen、mouthSmileLeft、mouthSmileRight、browInnerUp。

## 测试

新增实际 GLB 骨架夹具回归：原始 1.84/1.68 m 尺寸和脚底保持、绕开换装和脸发修改、原材质纹理保留、骨架/几何/材质实例隔离、六个表情、全身动画器连续更新、缺失回退、404/HTML 响应保护、重试与并发去重、路径越界拒绝、交付报告。测试夹具仅在内存中创建，不写 Claude 的交付目录。

运行 npm test、npx tsc --noEmit 与生产构建。真实英雄的视觉一致性和动画穿模，须等待 Claude 的 GLB 交付后继续验收。

本轮验证结果：63 个 Vitest 文件、773 项测试及 7 项 Python 数据测试通过；npx tsc --noEmit 通过。浏览器实际核对男主侧面、女主胸像与眨眼按钮、原图加载；新分工后另外核对未交付占位提示与禁用按钮，未捕获脚本 / WebGL 错误。真实 me2026.glb / lin.glb 当前未交付，尚未进行它们的外观、表情和坐姿目视验收。
