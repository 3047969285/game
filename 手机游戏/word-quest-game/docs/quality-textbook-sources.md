> **2026-10-22 更新**：新加坡教师已提供本书并授权教学使用，教材原文已进入数据层（`word-quest/data/textbook/` → `word-quest/data/content/college_english_rw3/`）。
> 本文保留为“玩家自带教材导入”功能的说明；下面的来源核查是历史记录。

# 我的教材本机来源接入

## 产品需求说明书

玩家可以导入自己合法拥有的 UTF-8 `.txt` / `.md` 教材文本，按 Unit 1–6 与 Section A/B/C 核对、改名、编辑后，仅保存到当前浏览器的 IndexedDB。入口位于单元卡的“记忆匣”；可查看、编辑、删除单篇或清除本机保存的全部段落。导入和回忆过程不请求网络、不写入游戏存档或仓库，也不会假称已经下载整本教材。

保存前会提示将替换的已有段落；若一批勾选内容有相同 Unit/Section，界面会说明按列表顺序保存、仅最后一段留在该目标，并在保存后反馈覆盖结果。

无法识别标题的粘贴文本会暂放在当前单元的 Section A，并标记为待核对。空正文、超限文本、无效 UTF-8、非文本字节、不支持的 PDF / DOCX、IndexedDB 不可用或写入失败都会给出明确提示，并保留编辑框里的文本供用户重试。

教材来源核查记录见 [textbook-source-audit.json](./textbook-source-audit.json)。截至 2026-10-20，本次检索未找到可核实为目标版本且允许再分发的完整教材来源。仓库未声明 license 仅说明没有达到项目的授权核实标准，不是法律结论；功能因此只处理用户主动提供的本机文本。

## 接口文档

- `parseTextbookText(raw)` 识别 `Unit 1` / `Unit One`、Markdown 标题、`Section A` / `Text A`、`Section B` / `Text B`、`Section C` / `Stories of China`。每个结果含单元、章节、标题、正文；无句末标点且足够短的首行才作为候选标题，完整首句保留在正文。识别到 `New words` / `Words and expressions` / `Glossary` 时停止收录后续词表内容并显示省略提示。无法识别结构时返回一个默认段落并附核对提示。
- `decodeTextbookBytes(bytes)` 只解码 UTF-8，拒绝无效编码、NUL 字节、空文件和超过 512,000 字节的文件；文本解析与存储都限制在 200,000 个字符。文件选择器仅接受 `.txt` / `.md`。
- `textbookStore` 提供 `list()`、`get(unit, section)`、`save(input)`、`remove(unit, section)`、`clear()`。IndexedDB 数据库名为 `word-quest-textbook-local`，对象仓库 `passages` 以 `unit:section` 为键。数据库错误转为可显示的 `TextbookStorageError`，不回退写入 localStorage。
- `analyzeTextbookOverwrites(targets, existing)` 返回将替换的已有目标及当前批次中的重复目标；UI 在保存前与保存后用状态提示展示覆盖影响。用户文本只写入/读取表单 `.value` 或 DOM `textContent`；`innerHTML` 只包含固定界面骨架和 Unit/Section 白名单选项，不插入标题、正文、预览或错误内容。
- 单元卡打开 `textbook/ui` 时才加载编辑界面及 CSS；启动某段回忆时，App 动态读取对应本机段落，并调用现有 `resolveMemoryScript(unit, words, section, passageOverride)`。
- modal 收到键盘焦点后拦截向 `window` 冒泡的 keydown，避免输入 `e`、Enter、WASD 时触发游戏交互或移动；Enter 的默认输入行为保留，Escape 关闭，Tab 在 modal 内循环。关闭时返回打开按钮焦点。keyup 继续冒泡，让此前按住的移动键可以正常释放。
- 有 `passageOverride` 时，`buildActs()` 用导入正文切幕，只保留从该正文生成的填词笔记；不混用游戏自带的理解题、翻译和写作数据。讲义标题标出“我的教材”来源。没有导入内容时原练习行为保持不变。

## 测试

- `textbook.test.ts` 使用完全原创的模拟课文，覆盖英文单元名、Markdown 标题、A/B/C、缺少 Section C、无标题粘贴回退、首句与句数预览、空文本、超长文本 / 文件、无效 UTF-8、NUL 字节、保存 / 读取隔离、删除 / 清除、IndexedDB 失败提示，以及重复保存目标和已有目标的覆盖分析。
- `keyboard.test.ts` 通过 editor → modal → window 的冒泡事件路径验证 e / Enter / w keydown 不会到达 window 热键、Enter 默认行为没有被取消、Escape 会关闭，以及 modal 外的 window 监听仍可用；另覆盖 Tab 焦点循环。
- `acts.test.ts` 与 `scripts.test.ts` 验证导入正文确实经 `resolveMemoryScript()` 进入手写 / 自动脚本，且不会继续展示不匹配的配套理解题、翻译或写作。
- 编辑器说明当前只支持 UTF-8 `.txt` / `.md` 与粘贴文本；PDF 和 DOCX 未实现，界面不会声称支持。

2026-10-20：教材解析、存储和脚本接入相关专项 Vitest（8 个文件，299 项）通过；`git diff --check` 与审计 JSON 解析通过。`tsc --noEmit` 当前被并行修改的 `src/features/world/people.ts:459` 阻断（实参数量不符，非本功能文件），主代理整合时需复跑。浏览器 IndexedDB / 手机编辑器的视觉与多标签页行为仍需整体验收中实测。
