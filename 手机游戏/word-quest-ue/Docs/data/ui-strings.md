# UI 本地化字符串表（D14）

> 生成：`Tools/data_import_strings.py`（纯 Python 部分可离线生成；UE 导入按 `Docs/tasks/ue-run-rules.md` 串行执行）
> 产物：
> - `Content/Data/loc/ui_strings.csv` —— 主表（`key,zh,en`，126 条，UI 文案唯一来源）
> - `Content/Data/loc/ui_strings_for_st.csv` —— StringTable 导入格式（`Key,SourceString`，源语言中文）
> - `Content/Data/loc/ui_strings_audit.json` —— 对 `src/**/*.ts` 中文 UI 文案的覆盖审计
> - `Content/Data/DT_UIStrings.uasset` —— 过渡期兜底（DataTable + JsonObjectWrapper，行名 = key，`JsonString = {"zh":..,"en":..}`，126 行，已 headless 导入成功）

## 导入 /Game/Data/ST_UI（交给 Codex）

⚠️ **不要**用 `UnrealEditor-Cmd -run=pythonscript -nullrhi` 导入 StringTable：2026-10-21 的
pid 10714 / 10878 崩溃就是这条路径（`UAssetToolsImpl::ImportAssetsInternal` →
`Assertion failed: IsValid()`，SharedPointer.h:1133）。按 `Docs/tasks/ue-run-rules.md`：

1. 用**完整编辑器**（不是 -Cmd、不要 -nullrhi）：
   ```bash
   UE_LOCK_WHO=codex Tools/run_ue_serial.sh \
     "/Users/Shared/Epic Games/UE_5.8/Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor" \
     "$PWD/WordQuestUE.uproject" -ExecutePythonScript="$PWD/Tools/ue_import_st_ui.py" \
     -unattended -nosplash
   ```
2. 导入脚本（Codex 侧，供参考）：
   ```python
   import unreal
   task = unreal.AssetImportTask()
   task.filename = r"<project>/Content/Data/loc/ui_strings_for_st.csv"
   task.destination_path = "/Game/Data"
   task.destination_name = "ST_UI"
   task.automated = True; task.save = True; task.replace_existing = True
   task.factory = unreal.StringTableFactory()
   unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks([task])
   unreal.EditorAssetLibrary.save_loaded_asset(unreal.load_asset("/Game/Data/ST_UI"))
   os._exit(0)   # 按 ue-run-rules：不要 quit_editor()
   ```
3. 英文译文：`ui_strings.csv` 的 `en` 列；可在 ST_UI 就绪后用本地化（.po/.locres）或 UMG 内 key→text 映射。源语言设为中文（zh）时，中文为 SourceString，英文走本地化。

## 校验

`pytest Tools/qa/tests -q`（`test_ui_strings.py`）：
- key 唯一、`ui.` 前缀、zh/en 非空且不相等
- 8 个界面前缀覆盖（unit/wordcard/reading/listening/translation/writing/quiz/review/result/settings/nav）
- ST 格式文件列名与行数正确
- 源审计：`src/**/*.ts` 中文文案 1027 条，主表覆盖 286 条（其余为剧情/内容文本，非 UI）
