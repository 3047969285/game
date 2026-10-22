# Web 客户端退役

## 产品需求说明书

英语记忆游戏以 UE5.8 为唯一客户端。删除旧 Web 的页面、运行代码、Three.js/Vite 配置、npm 清单、构建输出、浏览器调试页面和本机依赖缓存。教材、角色源素材、授权记录和制作工具保留，现有 UE 导入路径继续可用。删除前的完整工作树快照（包含未提交改动，排除依赖缓存）存放于本机 `~/.local/share/wordquest-archives/`。

`word-quest-game` 目前为源资料目录而非应用；为避免打断并行角色制作，暂时保留原素材路径。独立数据工程 `word-quest` 不属于本次 Web 客户端删除范围。

## 接口文档

- `Content/Data/memory/acts.json` 成为剧情权威来源；退役前已从最新工作树重新导出，包含 6 单元、18 段、90 幕、98 条台词。
- `Tools/data_export_acts.py [--check]` 保留兼容调用入口，直接读取并校验 UE JSON，不再依赖 Node/esbuild/Three.js；数据缺失明确失败，不回退到 Web。
- `Tools/data_import_strings.py` 继续维护 CURATED 字符串；旧页面扫描审计冻结于 `SourceAssets/Migration/web-ui-audit.json`，返回 `sourceStatus=archived-web-client`。
- UE 的教材、FBX、Groom、参考图导入路径保持可用。没有修改角色资产或角色制作脚本。

## 测试

执行剧情校验、剧情 QA、字符串审计及 Python 语法检查；检查旧入口、src、dist、Vite 配置和 npm 清单不存在，并逐文件核对保留素材 SHA-256。此次不修改 UE C++ 或 uasset，不启动编辑器。

验收结果：7 项剧情 QA、22 项角色管线离线测试通过；旧客户端入口检查通过；保留的 63 个教材/模型/美术源文件 SHA-256 全部一致。字符串历史审计覆盖 208 个源文件。重新导出发现新剧情标题部分只有中文，已保留中文标题并从对应教材补齐英文标题，双语 QA 通过。Python 语法检查通过。
