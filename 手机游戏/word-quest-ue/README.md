# Word Quest UE5 · 大学英语读写3

「大学英语读写3」学习软件的 Unreal Engine 5.8 客户端（先做读写3，四六级暂不接入）。

## 状态

工程骨架（2026-10-21 建立）：`.uproject` + Config + 导入/引导脚本。引擎安装完成后：

```bash
# 1. 打开工程（第一次会编译 shader）
open "WordQuestUE.uproject"

# 2. 或先跑无头引导脚本（建 L_Main、导入英雄 GLB）
"/Users/Shared/Epic Games/UE_5.8/Engine/Binaries/Mac/UnrealEditor-Cmd" \
  "$PWD/WordQuestUE.uproject" -run=pythonscript \
  -script="$PWD/Tools/bootstrap_project.py" -unattended -nosplash -nullrhi
```

## 目录

- `Config/`：引擎/游戏/输入配置（Lumen、虚拟阴影、宏曝光关闭、Enhanced Input）
- `Tools/bootstrap_project.py`：编辑器 Python 脚本，创建 `/Game/Maps/L_Main` 并导入
  `public/models/heroes/*.glb`（来自 Blender 英雄流水线）
- `Docs/ue5-migration-plan.md`：从 Three.js 客户端迁移的功能清单与里程碑

## 数据来源

学习数据仍由 `手机游戏/word-quest`（Python 数据工程）与
`手机游戏/word-quest-game/public/data` 生成；UE5 端通过 `Tools/import_data.py`
把 JSON 导入为 DataTable（下一里程碑）。
