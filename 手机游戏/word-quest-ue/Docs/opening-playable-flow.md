# 可玩序幕衔接

## 产品需求说明书
读取 acts.json 的 prologue 全部独白、记忆回溯和 Ready/Not yet 选择，2090 公寓中以空间冷光文字显示。Ready 和跳过均经过三秒相机/时间码扫描转场，再进入第一单元。不得创建白模冒充完整开场；缺少场景锚点时明确报错。

## 接口文档
GameMode 构造函数添加 `CreateDefaultSubobject<UWordQuestOpeningFlow>(TEXT("OpeningFlow"));` 并 include 头文件。
关卡必须提供唯一 `opening_camera`（CameraActor）和 `opening_memory_anchor`（空间文字中心）tag。可选 `opening_player_start` 由关卡 PlayerStart 承担。组件只接管有上述 tag 的开场地图。键盘空格/回车、鼠标点击、手柄 A、触屏点击共用 Advance/选择逻辑；左/右键及手柄方向选择 Ready/Not yet。点击或触摸按屏幕射线命中对应文字区域选择。Esc/手柄 SpecialRight 请求跳过，仍走转场。
蓝图/PIE 接口：GetOpeningState、AdvanceOpening、ConfirmRecall、SkipOpening、WaitBeforeRecall。GetOpeningState 返回 phase/line/error；所有接口直接进入实际运行状态机。缺资产和完整剧情校验失败为 error。目标关卡现有质量门禁不变。

## 测试
主控通过加锁编译及真实 PIE 验证：逐句原文、Not yet 等待后返回选择、Ready/Skip 均持续三秒转场、OpenLevel 到 L_U01_A、无 tag 不接管、坏 JSON 报错、鼠标/手柄/触摸使用同一动作函数；屏幕 UMG 计数零。此组件仅完成编写与静态审查，未启动 UE，实际渲染、输入和视觉质量待主控验证。

## 2026-10-23 序幕空间文字可读性修正
### 产品需求说明书
序幕完整英中台词使用世界内 Slate 文字绘制，支持中文字体回退、段落换行和冷白蓝半透明墨色；文字固定在场景空间内、距初始相机约 1.7 米，避免照片册远端小字。保留原始剧情、等待/确认与三秒穿梭状态机。
### 接口文档
公开 API 和 phase 不变。内部以 World UWidgetComponent 替代 TextRender；鼠标/触摸与实际文字平面求交并检查局部矩形，避免角度近似导致左右误选。所有 UObject 引用由 UPROPERTY/组件所有权持有。
### 测试
主控统一编译、PIE 检查中文非方框、长句完整换行、Ready/Not yet 边缘及空白点击、触摸同路径、无 AddToViewport。此变更不启动 UE、不改地图和剧情数据。

## 2026-10-23 材质与可玩入口验收修正
### 产品需求说明书
原生复制 MetaHuman 预览材质的静态开关、分层参数、基础属性和皮肤轮廓，避免逐项参数读取将皮肤变黑。运行时允许进入未完成美术的课文，缺最终资产仍作为质量报告 FAIL，不能把美术未完成变成黑屏或阻止探索。
### 接口文档
新增编辑器限定 CopyPreviewMaterial(Target, Source)，只写 /Game/Memory/Characters。skin_v2 缓存与旧副本隔离，源 Content/Characters 保持只读。WQ_VISUAL_QUALITY_FAIL 日志保留未完成计数；LoadArticle 数据错误仍阻止进入。实际默认启动地图待正常运行验证后再切换。
### 测试
纯 Python 角色映射/源文件保护测试，加锁 C++ 编译，再执行正常环境（无需 WQ_TEXTBOOK_ENGINE_QA）PIE 序幕、Not yet、Ready、转场、第一间房、WASD 和暂停测试；实际截图检验皮肤，不能仅以编译成功验收。
