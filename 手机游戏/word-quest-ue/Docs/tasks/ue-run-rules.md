# UE 运行规则（三方共用，2026-10-21 起强制）

## 起因

2026-10-21 晚，Claude、Codex、DeepSeek 同时在同一个工程上启动 UnrealEditor / UnrealEditor-Cmd，出现了多次崩溃和崩溃报告弹窗。崩溃报告在 `~/Library/Application Support/Epic/UnrealEngine/5.8/Saved/Crashes/`。

- **pid 10714 / 10878**：DeepSeek 用 `-run=pythonscript -nullrhi` 通过 `AssetImportTask` 导入 StringTable，在 `UAssetToolsImpl::ImportAssetsInternal` 触发 `Assertion failed: IsValid() (SharedPointer.h:1133)`。
- **pid 9982 / 10445**：Claude 的 MetaHuman 拟合脚本在成功保存资产后，用 `quit_editor()` 退出时在 Slate 文本析构中崩溃（`malloc: pointer being freed was not allocated`）。已修：保存后直接 `os._exit(0)`。
- 另外，多个编辑器实例同时写 DDC 和资产，本身就会互相破坏。

## 规则

1. **所有 UE 进程都要通过锁来启动**：
   ```bash
   UE_LOCK_WHO=codex Tools/run_ue_serial.sh "/Users/Shared/Epic Games/UE_5.8/Engine/Binaries/Mac/UnrealEditor-Cmd" WordQuestUE.uproject ...
   ```
   - 同一时间只会有一个 UE 进程，其他调用会排队等待。
   - 锁在 `Saved/ue_run.lock`，进程死掉后会自动清理。
2. **commandlet + `-nullrhi` 只能做纯数据操作**，例如 DataTable 填充、读资产。
   - 资产导入工厂（StringTable、FBX、Alembic、贴图等）和任何会弹 Slate 通知的操作（MetaHuman、Groom 导入、渲染），都必须用完整编辑器：`UnrealEditor ... -ExecutePythonScript=<脚本> -unattended -nosplash`。
3. **退出时不要依赖 `quit_editor()`**。资产保存后可以用 `os._exit(0)` 直接退出，避免析构时崩溃。如果确实需要正常关闭，先等 Slate 通知全部消失（隔几帧再退）。
4. 不要在用户自己打开的编辑器窗口里执行会弹窗的操作。
5. 崩溃以后，把 `Crashes/` 下对应目录的命令行和调用栈写进 STATUS，标明是谁的进程。

## 补充（22:35）：C++ 编译也必须加锁

22:33 有一次 UE 启动时弹出“游戏模块 WordQuestUE 无法被找到”，随后退出。原因是 Codex 当时在重新编译 C++ 模块，`Binaries/Mac/libUnrealEditor-WordQuestUE.dylib` 那段时间不存在，而锁没有覆盖编译。

**编译（Build.sh / UnrealBuildTool / RunUBT）也要走锁**：

```bash
UE_LOCK_WHO=codex Tools/run_ue_serial.sh "/Users/Shared/Epic Games/UE_5.8/Engine/Build/BatchFiles/Mac/Build.sh" WordQuestUEEditor Mac Development -project="$PWD/WordQuestUE.uproject"
```
