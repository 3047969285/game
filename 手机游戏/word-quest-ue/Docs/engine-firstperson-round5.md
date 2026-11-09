# C15 人眼第一人称

## 产品需求说明书
玩家身高184cm、眼高172cm，舒适水平视野80°可调，140cm/s步行和惯性。胶囊碰撞、45°坡度限制和30cm台阶由CharacterMovement处理；蹲姿平滑眼高过渡，头部摆幅低于1cm且可关。物理相机轻微景深，曝光适应约1–2秒，低运动模糊。鼠标、手柄、触屏均共享移动/注视语义，不加准星或屏幕按钮。人物第一人称身体只接受最终装配资源，缺失明确needs_first_person_body，不冒充完成。

## 接口文档
AWordQuestFirstPersonCharacter拥有UCineCameraComponent和UCharacterMovementComponent；PlaceView(EyePosition,Rotation)按脚底/眼高定位；SetHorizontalFov、SetHeadBobEnabled、SetCrouching、GetFirstPersonState、GetEyeWorldLocation供设置和PIE使用。导航组件驱动角色输入，停止直接移动取景相机；Director每个scene复用Pawn作为ViewTarget，取景用参考shot的眼高位置并固定游戏FOV。摄影截图shot不修改。曝光覆盖仅作用于玩家相机，不修改每个作者PPV。

## 测试
加锁UE编译；真实PIE在Offline day记录眼高、胶囊尺寸、FOV、焦距/光圈、速度、头摆幅度、台阶/坡度限制与蹲姿眼高。真实W输入运动、障碍碰撞、暂停与三套输入共享路径；截图2560×1440和4K审查。记录曝光设置与实测适应曲线分开，不把设置值当作已测效果。最终角色身体未交付或未绑定，C15该项保留FAIL。
