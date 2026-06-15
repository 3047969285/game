# AimForge

企业级单机 CS2 / 无畏契约练枪平台（非官方）。原生 .NET 9 + OpenGL，目标 **700+ FPS**、**零 GC 热路径**、**Raw Input 低延迟**。

## 架构

```
AimForge.Core           领域层：训练模式、压枪、灵敏度、统计
AimForge.Infrastructure JSON 持久化、DI
AimForge.App            OpenGL 渲染、输入、启动
AimForge.Tests          单元测试
```

## 训练模式

| 键 | 模式 |
|----|------|
| F1 | 甩枪 Flick |
| F2 | 跟枪 Tracking |
| F3 | 压枪 Spray Wall（Tab 切枪） |
| F4 | 预瞄 Pre-aim |
| F5 | 反应 Reaction |

`1`/`2` CS2 / 无畏契约 Profile · `R` 重置 · `Esc` 保存退出

## 性能设计（防卡顿）

- **零分配热路径**：场景用复用 `TrainingSceneState`，每帧不 new 数组
- **输入轮询**：Update 内直接读鼠标，无事件回调延迟
- **渲染缓存**：投影矩阵仅在分辨率/FOV 变化时重算
- **无运行时写盘**：统计仅在退出时保存，避免 IO 卡顿
- **精简启动**：轻量 DI，无 Hosting 后台服务
- **VSync 关** · **标题栏 30 帧刷新一次**（StringBuilder 复用）

## 一键运行（推荐）

双击项目根目录下的文件即可：

| 文件 | 说明 |
|------|------|
| **`启动 AimForge.bat`** | 一键启动（首次会自动编译） |
| **`启动 AimForge.vbs`** | 无黑窗口启动（需已编译过） |
| **`重新编译并启动.bat`** | 改代码后重新编译再启动 |

双击 **`启动 AimForge.bat`** 启动后，会先看到**主菜单界面**：

- 选择 CS2 / 无畏契约 Profile
- 选择训练模式（甩枪 / 跟枪 / 压枪 / 预瞄 / 反应）
- 调节 DPI、灵敏度、FOV
- 点击 **「开始训练」** 进入练枪

训练中左上角有 HUD（FPS、命中、状态），底部有操作提示。`Esc` 返回菜单。

## 命令行运行

```powershell
cd D:\mavenooo\游戏\电脑游戏
dotnet run --project AimForge.App -c Release
```

## 测试

```powershell
dotnet test -c Release
```

## 配置 `appsettings.json`

```json
{
  "AimForge": {
    "TargetFpsMinimum": 700,
    "VSync": false,
    "DefaultDpi": 800,
    "WindowWidth": 1920,
    "WindowHeight": 1080
  }
}
```

数据目录：`data/sessions.json`、`data/personal-bests.json`
