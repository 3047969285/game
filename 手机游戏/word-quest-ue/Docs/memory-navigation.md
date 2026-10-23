# 回忆场景探索导航

## 产品需求说明书

玩家进入单元场景后直接用鼠标上下左右看，WASD 与手柄左摇杆以 280 cm/s 地面移动；右摇杆控制看向。手机单指滑动超出 14 px 才旋转，轻触留给课文和断片；双指拖动是无 UI 的移动手势。旋转与速度平滑，无走路摇晃。初始位置和眼高保留场景镜头定义。相机换场重置，暂停、练习、转场、错误、文字编辑时停止。碰撞胶囊阻止穿过开启碰撞的墙和家具，拒绝超过 25 cm 的台阶与无地板边缘。

## 接口文档

新增 `UWordQuestMemoryNavigation` ActorComponent，挂在 MemoryGameMode，与 Director 同 owner。组件轮询本地 PlayerController，不绑定或吞掉 Space/E、鼠标点击等既有交互。只移动 Director 运行时 ViewTarget，不修改源关卡镜头。序列化镜头及 shot 标签镜头拒绝移动。

接入 GameMode 头文件的 public：

```cpp
UPROPERTY(VisibleAnywhere) TObjectPtr<class UWordQuestMemoryNavigation> MemoryNavigation;
```

接入 GameMode cpp：

```cpp
#include "WordQuestMemoryNavigation.h"
// 放入构造函数
MemoryNavigation=CreateDefaultSubobject<UWordQuestMemoryNavigation>(TEXT("MemoryNavigation"));
```

`GetNavigationState()` 返回 enabled、active、gate、view、position、speed、blocked、collisions、view_changes、touch_look。`bEnabled` 可用于流程禁用；`WalkSpeed` 默认 280。当前通过 Director 的既有 `GetPlaybackState()` 判断转场/文字编辑/error，避免修改 C13 接口。

## 测试

本次仅静态检查，无 UE 启动或编译；运行验收交主控串行执行：

1. PIE 进入第一单元，获取组件 state，gate=ready，view 为 Director 动态 CameraActor；比较输入前后实际 CameraManager 镜头和 position（不能只看 pawn）。
2. W 持续 2 秒，平地稳定速度接近 280 cm/s；松键平滑停止。斜向不超 280；鼠标/手柄右杆可看上下左右，俯仰限 ±75 度。
3. 走向墙、低矮家具、侧向沿墙，确认碰撞计数增加、无穿透。带关闭 collision 的装饰无法物理阻挡，需场景资产修 collision。
4. 暂停/练习/转场/error：位置不动；恢复后不累积旧触控或速度。下一 scene view_changes 增加且不沿用旧朝向。
5. 单指轻点无导航、14px 以上转向；双指拖动平地走路，无屏幕按钮。Space/E 和断片点选保留给原交互。
6. 地面有起伏时小于 25 cm 的变化平滑，高台和边缘拒绝；没有 headbob。截图与录像按实际 CameraManager 留证。

限制：这个组件只负责导航；Director 原有触摸交互也可能处理同一根手指，需主控在 PIE 验证拖动不触发轻点。不能假称编译或实玩已通过。
