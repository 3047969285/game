# Three.js → UE5 迁移方案

## 目标

把现有 `手机游戏/word-quest-game`（TypeScript + Three.js）的 3D 记忆游戏客户端迁移为 UE5.8 工程。
玩法不变：2090 年老人回忆 2026 年大学英语课；世界随英语声音逐步建立；默认第三人称；
内容覆盖《大学英语读写 3》全部单词与课文；记忆玩法（M1 回忆舞台 / 视角切换 / 笔记本 / 记忆盒子）。

## 现有资产盘点（迁移来源）

| 资源 | 位置 | UE5 处理方式 |
|------|------|--------------|
| 学习数据 JSON | `word-quest-game/public/data/**` | Python 脚本转 DataTable / DataAsset |
| 英雄模型 | `word-quest-game/public/models/heroes/me2026.glb`、`lin.glb` | GLTF 导入 + 骨骼/表情校验 |
| 场景/世界 | `src/features/world/**`（Three.js 程序化） | 在 UE5 用 PCG + Landscape/Water 重建 |
| 学习玩法 | `src/features/learn/**` | 用 UMG + Blueprint 复刻（Cloze/Translation/Review/Quiz） |
| 记忆玩法 | 记忆 game 分支代码/文档 | 用 Level Sequence + Blueprint 重建 |
| 音频（钢琴配乐/朗读） | 现有音频与 TTS | UE5 MetaSounds + Audio Component |

## 里程碑

- **M0 工程可用**：UE5.8 安装（进行中）、工程能打开、Lumen 场景渲染、GLB 英雄导入、Mac 包可跑（需 Xcode）
- **M1 英雄场景**：L_Main 内第三人称角色（GLB 骨骼 + 6 个 ARKit 表情）、相机/输入（Enhanced Input）
- **M2 学习 UI**：DataTable 驱动词汇/阅读/听力/翻译界面；完成 1 个单元可完整游玩
- **M3 记忆玩法**：回忆舞台、声音建世界、视角切换、笔记本
- **M4 打包**：Mac / Windows 打包流程；素材与版权边界检查

## 技术选择

- **Blueprint 优先**：当前机器没有 Xcode，先用 Blueprint 工程跑通编辑器；C++ 子模块等 Xcode 就绪后加
- **Lumen + 虚拟阴影 + Nanite**：对应现有"world realism"目标；宏曝光关闭（由关卡/后处理控制）
- **Enhanced Input**：鼠标锁定环顾 / 手机触控摇杆（对应现有 PlayerController 需求）
- **数据管线**：Python(UE) 脚本 + JSON → UDataTable，保持与 `word-quest` 数据工程同源

## 风险 / 阻塞

1. **Xcode 缺失**：C++ 编译、iOS/Mac 打包需要 Xcode（App Store，约 15GB）；Blueprint 项目可先运行
2. **磁盘**：UE 5.8 安装约 45–55GB，当前余量需关注
3. **资产规模**：现有 Three.js 世界是程序化代码，UE5 侧需逐个系统重建（地形/植被/建筑/水面）
4. **版权**：教材内容仍只用原创仿学材料 + 用户合法授权资源，沿用现有边界
