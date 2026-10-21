# Codex 任务书：人物引擎侧（UE 5.8）

> 下发人：Claude · 2026-10-21 · 总方案：[../character-production-plan.md](../character-production-plan.md)
> 工程：`手机游戏/word-quest-ue/WordQuestUE.uproject`，引擎在 `/Users/Shared/Epic Games/UE_5.8`
> 你只改：`Config/**`、`Source/**`、`Tools/ue_*.py`、`Content/Maps/**`、`Content/Blueprints/**`、`Content/Animation/**`、`../word-quest-game/src/**`。
> **不要改** `Content/Characters/**`（Claude 负责）、`Docs/characters|qa/**`、`Tools/qa/**`、`Tools/data_*.py`（DeepSeek 负责）。

每项都要按三件套交付：需求说明 + 接口文档（写进 `Docs/engine-characters.md`）+ 测试或检查脚本。完成后在 `Docs/tasks/STATUS.md` 的 **Codex** 一节追加：做了什么、怎么验证的、还缺什么。

## C1 插件和工程设置（最先做）

- 在 `WordQuestUE.uproject` 里启用这些插件：`MetaHumanCharacter`、`MetaHumanSDK`、`MetaHuman`（Animator）、`MetaHumanLiveLink`、`HairStrands`、`LiveLink`、`ChaosCloth`、`ChaosClothAsset`、`AlembicImporter`、`IKRig`。
- 在 `Config/DefaultEngine.ini` 打开：Skin Cache、Hair Strands、Substrate 不开、Lumen 继续用。
- 工程要能编译（需要 Xcode）、能用无头方式打开（`UnrealEditor-Cmd ... -run=pythonscript`），把日志里的报错清零。

## C2 Lookdev 关卡和对比相机

- 新建 `Content/Maps/L_CharacterLookdev`：
  - 纯白背景
  - 柔光三点布光：主光在前左上、补光、轮廓光
  - Lumen 打开，曝光固定，不用自动曝光
- 做一个对比机位蓝图 `Content/Blueprints/BP_RefCameraRig`，用正交相机复现参考图的 5 个机位：
  - 正面 yaw 0
  - 3/4：男主 yaw 37 / pitch 6 / roll −8，参数从 `../word-quest-game` 的 fit json 读
  - 左侧面 90
  - 背面 180
  - 脸部特写
- 写 `Tools/ue_render_compare.py`：无头渲染 `Content/Characters/<id>` 的 5 张 1024² PNG，输出到 `Saved/Compare/<id>/`。DeepSeek 的 QA 工具会读这个目录。

## C3 导入和装配自动化

`Tools/ue_import_character.py <id>`：

- 导入 `../word-quest-game/docs/hero-pipeline/export/<id>/` 下的文件：
  - `*_groom.abc` → Groom 资产，并绑定到头部
  - `*_clothes.fbx` → SkeletalMesh，用 MetaHuman 骨骼
  - `*_textures/*` → 贴图
- 生成 Groom 的发片 LOD。
- 在 `Content/Blueprints/Characters/BP_<id>` 里组装角色：MetaHuman 本体 + Groom + 服装 + 饰品挂点。
- 导入目标路径固定为 `Content/Characters/<id>/Imported/`。

## C4 动画

- 用 IK Retargeter 把现有动画重定向到 MetaHuman 骨骼：Rocketbox / MPFB 的 idle、walk、sit，以及 `word-quest-game` 里的坐姿和生活化动作。
- 第三人称角色 `WordQuestCharacter` 能换成 `BP_me2026`。
- Live Link 面部：接 ARKit 52 个表情曲线的预览，没有设备时用曲线测试动画代替。

## C5 性能和 LOD

- 单个英雄在 1440p 下 LOD0 的 GPU 时间 ≤ 2.5 ms。
- Groom 远处切换到发片。
- 布料的 LOD 也要有。
- 输出 `Docs/engine-characters.md` 的性能表（stat gpu 截图或数据）。

## C6 网页版保持可用

- `word-quest-game/src/features/memory/characters.ts`：
  - `me2026` 的服装改为白衬衫卷袖 + 黑西裤 + 黑皮鞋，去掉眼镜和背包。
  - `lin` 改为浅蓝 A 字裙 + 银色高跟鞋 + 项链 + 酒红长直发齐刘海。
  - 以用户的三视图为准。
- 继续加载 `public/models/heroes/*.glb`。
- 跑 `npm test` 和构建。

## 注意

- MetaHuman 云绑定需要登录 Epic 账号：**不要**尝试登录或处理凭据，遇到就在 STATUS 里标“需要用户登录”。
- 提交只提交自己的文件。`Intermediate/`、`DerivedDataCache/`、`Saved/`、`Binaries/` 已经在 `.gitignore` 里。
