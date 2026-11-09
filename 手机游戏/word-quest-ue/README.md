# Word Quest UE5 · 大学英语读写3

「大学英语读写3」学习软件的 Unreal Engine 5.8 客户端（先做读写3，四六级暂不接入）。

## 状态

当前唯一客户端是本 UE5.8 工程；旧 Web 客户端已退役。数据、剧情、角色与场景迁移持续推进，任务进度见 `Docs/tasks/STATUS.md`。

所有编辑器启动、导入、渲染及 C++ 编译必须遵守 `Docs/tasks/ue-run-rules.md`，通过共享锁运行。例如：

```bash
UE_LOCK_WHO=codex Tools/run_ue_serial.sh \
  "/Users/Shared/Epic Games/UE_5.8/Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor" \
  "$PWD/WordQuestUE.uproject"
```

## 目录

- `Config/`：引擎/游戏/输入配置（Lumen、虚拟阴影、宏曝光关闭、Enhanced Input）
- `Tools/bootstrap_project.py`：编辑器 Python 脚本，创建 `/Game/Maps/L_Main` 并导入
  `public/models/heroes/*.glb`（来自 Blender 英雄流水线）
- `Docs/ue5-migration-plan.md`：从 Three.js 客户端迁移的功能清单与里程碑

## 数据来源

学习数据仍由 `手机游戏/word-quest`（Python 数据工程）与
`手机游戏/word-quest-game/public/data` 生成；UE5 端通过 `Tools/import_data.py`
把 JSON 导入 UE。旧目录仅为源资料，已移除 Web 入口和运行环境。剧情权威数据为 `Content/Data/memory/acts.json`；`python3 Tools/data_export_acts.py --check` 无需 Node 即可校验。

退役范围和验证见 `Docs/web-retirement.md`。
