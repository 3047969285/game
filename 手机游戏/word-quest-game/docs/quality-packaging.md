# 学习数据打包可靠性

## 产品需求说明书

依据 README 的“打开即玩”、三套课程和独立仓库可运行要求，开发与构建命令需兼容 Windows、macOS、Linux。源数据缺失或损坏时，不得删除此前可用的数据包；独立仓库只能在自带数据包完整时沿用，否则明确失败。

## 接口文档

`npm run pack` 通过 Node 启动 Python：优先使用 `PYTHON` 指定的可执行文件；否则 Windows 尝试 `py -3`、`python3`、`python`，其他系统尝试 `python3`、`python`。解释器执行失败必须传播退出码，只有找不到解释器才换下一个。

Python 模块公开 `pack_data(source: Path, output: Path) -> bool`：成功从源数据构建返回 `True`，源目录不存在但已有完整包时返回 `False`。新包先在同目录临时目录完成构建、解析全部 JSON 并检查必需文件，再替换输出；替换失败时恢复旧包。若文件系统异常导致恢复也失败，则保留 `.data.backup-*` 备份并在错误中给出路径。文件格式、课程 ID 和四级词汇精简数量保持不变。

## 测试

`npm test` 依次执行 Vitest 与 Python 测试，验证植被布局、解释器选择、三套课程打包、源文件损坏或缺失时保留旧包、独立仓库复用、缺失包报错及替换失败恢复。Python 部分也可独立运行 `python3 -m unittest discover -s tests -v`。`npm run build` 验证真实数据打包、TypeScript 与 Vite 构建。突然断电时的目录持久化不在本轮保证范围内。

2026-10-19 验证：11 项 Vitest 测试与 7 项 Python 测试通过；macOS 真实打包、TypeScript 检查和 Vite 生产构建通过。对实际 `public/data` 运行旁边内容库的校验，课程引用、计数、ID 和答案索引全部通过。Windows 启动器选择通过模拟测试，尚未在 Windows 实机执行。生产构建仍有大于 500 kB 的分包提示，场景性能需单独测量。

依赖检查发现 nanoid、postcss、source-map-js 的 3 项高风险告警，已在当前版本范围内更新锁文件。更新后统一 `npm test` 的 18 项测试与生产构建通过，当前 npm audit 报告 0 项漏洞。
