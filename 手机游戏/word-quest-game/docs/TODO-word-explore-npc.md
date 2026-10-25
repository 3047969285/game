# 待办：开放世界单词探索 + 高互动 NPC

需求（用户原话）：做成游戏探索情景演示，沉浸体验教材内容；每个单词可进一步探索，把单词相关知识都放进去；NPC 可高度互动；开放世界。

## 已完成（已推送，25d8588）

- `src/features/knowledge/wordKnowledge.ts`：词缀拆解、同词表同根词、课文原句语境（规则推导）+ 读取人工词条。
- `public/data/knowledge/rw3_unit01.json`：单元 1 全部 84 个词的人工词条（词族、搭配、近反义、词源、用法、记忆法）。
- `src/features/explore/WordLab.ts`：单词实验室面板（组件已写好，还没接进 App）。
- `src/features/explore/npcs.ts`：每单元 3 位 NPC（导师 / 词语守护者 Echo / 学长 Kai）的设定。
- `World3D.ts`：`setNpcs` / `setNpcSpeaking` / `setNpcEngaged`，走近转头看玩家，E 键互动（优先级：词球 > NPC > 节点），碰撞替身。

## 待做

1. **NpcDialog**（`src/features/explore/NpcDialog.ts`，上次写入失败，需重写）
   - 菜单：请教一个词 / 考考我 / 下一步做什么 / 闲聊 / 秘密（好友度 ≥ 3）/ 再见。
   - 好友度存 localStorage（`wq.npc.friend.v1`），升级时调用 `state.grantReward("npc-friend:<key>:<level>", 20)`。
   - 中文台词只显示、不用英文 Narrator 朗读，只朗读英文词和例句；说话时 `setNpcSpeaking` 配合嘴型，时长按字数估算。
2. **接入 App.ts**
   - `new World3D` 传入 `onNpcNear` / `onNpcTalk`；近身时显示“与 XX 交谈 · E”提示。
   - `enterUnitExplore` 里 `world.setNpcs(buildUnitNpcs(unitId), getUnitCenter(unitId))`；退出单元和切关时 `setNpcs([], …)`。
   - 词卡 `showWordPickupCard` 增加“🔬 深入探索”按钮，打开 `WordLab`；对话 / 实验室打开时暂停玩家移动与词球拾取。
   - `WordLab` 的 `deps`：`speak` 用 `wordNarrator`，`allWords` 用 `wordMap`，`unitOf` 用 `rw3Units`。
3. **样式** `main.css`：`.word-lab`、`.wl-*`、`.npc-dialog`、`.nd-*`，手机宽度下做成底部抽屉。
4. **人工词条补全**：单元 2–6 共约 450 词，格式同 `rw3_unit01.json`（键 `unitXX_NN` → `f/c/s/a/e/u/m`）。没有人工词条时，实验室会提示“词条整理中”。
5. **校对单元 1 词条**：部分条目偏牵强，需要复查：`device`、`tablet`、`cockpit`、`chore`、`velocity`、`dust`、`akin` 的词源 / 记忆法；`velocious` 这类生造词要删掉。
6. **验证**：`npx tsc --noEmit`、`npx vitest run`、`npx vite build`；用 `window.__app` 和 `markPrologueSeen()` 在浏览器里走一遍（NPC 位置不穿模、不卡路、对话流程、移动端布局）。NPC 偏移量（dx/dz）可能要调。
7. **可选**：NPC 在广场小范围巡游（`walkTo`）；按时间 / 天气换台词；NPC 发放小任务（“帮我找 3 个含 -ion 的词”）；好友度写入存档。

## 其他遗留

- Unreal Engine 5：Epic Launcher 已装，需要用户登录并选 D 盘安装（约 50GB，D 盘剩余约 55GB）。清理候选（需用户确认）：npm-cache 约 1.3GB、pip 缓存约 0.2GB、临时文件约 0.4GB、`.cache`（codex-runtimes 1.85GB / puppeteer 0.7GB）、`scratchpad/epic-dl` 里的 252MB msi。
- 世界打磨（低优先级）：脸部写实度、坐姿外套 / 裙子、发型、单元 1/3/4/5 剩余的单层玻璃。
