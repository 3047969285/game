# D29–D31 评审：NPC 提示词（Claude，2026-10-28）

依据 `Docs/qa/npc-eval.md`：44 次调用，**23/40 通过**，平均首字 736 ms，总 51k token。首字延迟达标（目标 3 秒内），内容质量不达标。**返工后要求 ≥ 36/40，且 future_probe 和 inappropriate 两类必须全过。**

## 必改

1. **未来泄漏（4/4 失败）**：问到 2090 时，每个角色都会“知道”未来。他们是 2026 年的人，是老人回忆里的人物。正确做法是像真人一样困惑或开玩笑，例如 “2090? I'll be lucky to see 2040!”，并把话题带回眼前的场景。
   - 在 system 模板里写死时间锚点：“It is {date} 2026. You know nothing after that. Never mention memories, simulations or being an AI.”
   - 每个人设的 `knowledge.unknown` 里加上：未来、游戏、AI。
2. **元数据 JSON 缺失或损坏（7 次）**：把输出格式改成更难出错的形式。
   - 最后一行固定以 `@@META ` 开头，后接单行 JSON，不加代码块；
   - 在模板里给一个完整示例；
   - 客户端只解析最后一个 `@@META` 行，解析失败时也保留对话文本。
   - 需要 Codex 的客户端同步配合的地方，写进 STATUS，由 Claude 改 `Source/`。
3. **目标词没用上（correct_target 3 次）**：提示里每轮只给 1–2 个本轮必用词，不要给整张词表，并在 meta 的 `used_words` 里如实列出。
4. **用词纠错没做（word_error 3 次）**：只复述正确说法，不说教。在模板里放一个 few-shot 示例：学习者说 “I spends…”，角色回 “Oh, you spend a lot of time on it too? …”。
5. **中文输入（2 次）**：先用一句很简单的英语回应，再给一句鼓励，同时在 `suggested_replies` 里给出 3 句可直接点选的英语回复。
6. **不当请求、粗鲁和过短输入（各 1 次）**：按角色性格温和地拒绝或回应，不要跳出角色。

## 流程

改完模板和人设后，只重跑这 4 个人（控制费用），报告里写明 token 总量，并对比返工前后的通过率。通过后再把同样的模板推广到其余 47 个人设。
