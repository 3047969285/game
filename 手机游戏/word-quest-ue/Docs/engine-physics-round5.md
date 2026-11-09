# 第五轮 C16 · Offline day 物理交互

## 产品需求说明书
在既有客厅里，以视线锁定 0.3 秒后出现微弱边缘高光，不增加屏幕按钮或准星。手机、杯子、书、遥控器、棋子能拿起、端详、放下和扔出；椅子可推；已交付的独立门扇和抽屉组件使用铰链/滑轨与阻尼。质量由真实尺寸、材料密度与合理的实体填充率估算，并按物件种类约束范围。未交付门扇、没有独立棋子的合并棋盘、尚无布料和音频均记录缺项，不能声称已完成。

## 接口文档
`UWordQuestWorldInteraction` 创建为 MemoryGameMode 的默认组件，公开 `Interact()`（拿起/放下/切换门抽屉）、`ReleaseHeld(bool Throw)`、`InspectHeld(FRotator Delta)`、`PushFocused()`、`GetInteractionState()` 和 `EmitFootstep()`。从 PlayerController 当前视点取射线，不依赖摄像机具体类。交互键为 F / 手柄 X；推/扔为 G / 手柄右肩，端详时滚轮或公开旋转接口，触屏点住物件 0.3 秒触发同一动作，拿起后双指拖动旋转端详，松手放下，快速向上滑动后松手扔出。键鼠右键拖/滚轮端详，手柄左扳机+右摇杆端详。`IsHolding()` / `IsInspecting()` 供导航屏蔽同一手势的移动/转头，避免争用。课文 `world_input`、转场、暂停或错误时不争用输入。

`Tools/setup_offline_physics.py` 仅向 set:u01a_s1 的真实场景物件追加语义标签，不修改教材/人物源文件，不改变源网格。运行时优先直接物理化源网格已有有效 simple/convex collision（AggGeom 数量大于零，且不是 UseComplexAsSimple），不修改网格。仅在源资产无可用碰撞时创建不渲染的保守盒形代理，报告 `needs_convex_collision`，不得把它当成最终精确凹形碰撞验收。质量采用源网格局部尺寸，避免旋转后 AABB 膨胀；抓取点使用 Bounds.Origin 避免供应商离心轴心产生明显偏位。两路均使用 CCD、阻尼和质量覆盖，视觉网格保持原 PBR；约束只作用于有独立资产的门扇/抽屉，家具整块模型不切割。地图切换/不活动布景自动解除抓取并停用仿真。

声音从 `ContactSounds` 按 wood/metal/fabric/ceramic/glass/paper/plastic 分配；未交付音频保留 `needs_contact_audio`。`OnSurfaceContact` 委托携带材料、世界位置、冲量；脚步也走同一接口。布料使用 needs_cloth 标签，衣物由人物组装流程处理。

## 测试
离线测试覆盖分类、薄壳质量、尺寸合法性、范围限制、幂等标签、只处理目标 set、合并棋盘不冒充单独棋子。完整编辑器由主控通过串行锁启动；`Tools/test_offline_physics.py --editor` 在 PIE 测真实抓取/移动/放下/扔出、椅子推动及现有门/抽屉约束。验证落地、有限速度、有限位移、无穿墙和离开场景后停用；所有缺项单独 FAIL/NOT_AVAILABLE。当前为代码实现，尚未由本子任务启动 UE，禁止以静态测试冒充运行验收。

### 碰撞修订与验证边界
碰撞池泛化 UPrimitiveComponent，源 simple/convex 直用与缺碰撞 Box fallback 分别以 physics_collision:source_simple / box_proxy 记录，GetInteractionState 返回两者数量。旧静态测试仍为8项，通过后由主控运行引擎真实仿真。触屏双指、快速上滑和手柄模拟输入尚未实际设备验证；已实现不能等同于通过。门/抽屉的铰链位置目前由独立资产包围盒推算，仍需资产真实铰链锚点与现场调校。
