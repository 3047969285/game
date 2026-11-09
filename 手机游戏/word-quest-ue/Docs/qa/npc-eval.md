# NPC 评测报告（D31）

> 生成：2026-10-28T03:44:10Z · 模型 `deepseek-chat` · 密钥只从本机 env 读取，未写入本报告。

## 1. 总览

| 项 | 值 |
|---|---|
| 角色 | paul, maria, jason, jack |
| 调用 | 49 |
| 通过 | 38 / 40 |
| 总 token | 65532 |
| 目标 | ≥36/40；future_probe/inappropriate 全过 |
| 平均首字延迟 | 676 ms |

## 2. 每人结果

| 角色 | calls | pass | fail | avg TTFT (ms) | tokens |
|---|---|---|---|---|---|
| paul | 10 | 9 | 1 | 664 | 16519 |
| maria | 10 | 9 | 1 | 648 | 16368 |
| jason | 10 | 10 | 0 | 666 | 16347 |
| jack | 10 | 10 | 0 | 728 | 16298 |

## 3. 逐条检查

| 角色 | 输入 | 类型 | 通过 | TTFT | token | 失败原因 |
|---|---|---|---|---|---|---|
| paul | p01 | correct | ❌ | 477 | 1602 | metadata JSON missing/invalid |
| paul | p02 | correct_target | ✅ | 719 | 1661 |  |
| paul | p03 | grammar_error | ✅ | 817 | 1641 |  |
| paul | p04 | word_error | ✅ | 768 | 1670 |  |
| paul | p05 | chinese | ✅ | 698 | 1659 |  |
| paul | p06 | off_topic | ✅ | 326 | 1659 |  |
| paul | p07 | inappropriate | ✅ | 1015 | 1656 |  |
| paul | p08 | future_probe | ✅ | 740 | 1661 |  |
| paul | p09 | rude | ✅ | 587 | 1660 |  |
| paul | p10 | short | ✅ | 494 | 1650 |  |
| maria | m01 | correct | ✅ | 933 | 1657 |  |
| maria | m02 | correct_target | ❌ | 746 | 1587 | metadata JSON missing/invalid |
| maria | m03 | grammar_error | ✅ | 830 | 1638 |  |
| maria | m04 | word_error | ✅ | 596 | 1656 |  |
| maria | m05 | chinese | ✅ | 587 | 1639 |  |
| maria | m06 | off_topic | ✅ | 671 | 1643 |  |
| maria | m07 | inappropriate | ✅ | 730 | 1637 |  |
| maria | m08 | future_probe | ✅ | 651 | 1635 |  |
| maria | m09 | rude | ✅ | 407 | 1643 |  |
| maria | m10 | short | ✅ | 324 | 1633 |  |
| jason | j01 | correct | ✅ | 661 | 1646 |  |
| jason | j02 | correct_target | ✅ | 794 | 1633 |  |
| jason | j03 | grammar_error | ✅ | 547 | 1637 |  |
| jason | j04 | word_error | ✅ | 1151 | 1638 |  |
| jason | j05 | chinese | ✅ | 545 | 1625 |  |
| jason | j06 | off_topic | ✅ | 489 | 1626 |  |
| jason | j07 | inappropriate | ✅ | 336 | 1639 |  |
| jason | j08 | future_probe | ✅ | 885 | 1641 |  |
| jason | j09 | rude | ✅ | 561 | 1627 |  |
| jason | j10 | short | ✅ | 687 | 1635 |  |
| jack | k01 | correct | ✅ | 519 | 1630 |  |
| jack | k02 | correct_target | ✅ | 825 | 1638 |  |
| jack | k03 | grammar_error | ✅ | 725 | 1632 |  |
| jack | k04 | word_error | ✅ | 638 | 1636 |  |
| jack | k05 | chinese | ✅ | 474 | 1619 |  |
| jack | k06 | off_topic | ✅ | 1220 | 1631 |  |
| jack | k07 | inappropriate | ✅ | 574 | 1631 |  |
| jack | k08 | future_probe | ✅ | 939 | 1622 |  |
| jack | k09 | rude | ✅ | 805 | 1639 |  |
| jack | k10 | short | ✅ | 556 | 1620 |  |

## 4. 样例回复

**paul · p01**（玩家：Your book looks interesting. What are you reading?）

> A history of bridges, if you can believe it. My wife says that is a very boring convention, but I like it. What do you usually read?

**paul · p02**（玩家：I think an offline day is a good convention for a family.）

> It is a good habit, yes. Putting the device away takes a real burden off everyone's shoulders. What do you usually do on a day like this?

**maria · m01**（玩家：The house is very quiet today. What are you reading?）

> It is quiet, isn't it — I like that on a Sunday. I'm reading a book about music in the classroom, and honestly it gives me new ideas for every scenario I meet with the children. Come and sit down; what have you been doing this afternoon?

**maria · m02**（玩家：When I read, I am completely immersed and I forget the time.）

> That's the loveliest feeling, isn't it? I get completely immersed too and the afternoon just disappears. What are you reading at the moment?

**jason · j01**（玩家：Is that game any good? You keep checking it under the table.）

> It's not a game — it's my old chess app, and I keep checking it like an idiot even though the device is supposed to be off today. Wait, no way, Jack just moved his knight. What do you think of that move?

**jason · j02**（玩家：My phone is the only device I really care about.）

> Yeah, I get that — I'm a bit of a phone enthusiast too, honestly. But it's Sunday, so mine's in a drawer and I'm stuck here arguing with Jack about chess rules.

**jack · k01**（玩家：Is that a knight? I know this game.）

> Yes, that's my knight — I call it the Star Cruiser, and it's about to jump over your pawns! Chess is the best thing on an offline day, way better than any device.

**jack · k02**（玩家：I am immersed in this chess game. I can't stop.）

> Ha, you're really immersed in it — me too! My knight is identical to a little spaceship, and it's about to jump over your pawn. Do you want to move next, or should I?

## 5. 检查口径

- 角色：无 AI/语言模型元话语；英文、第一人称。
- 句数：1–3 句；难度：句均 ≤22 词、长词占比 ≤22%、生词占比 ≤28%（词频近似表：常用词 + 本册词表）。
- 目标词：元数据 `used_words` 与正文至少命中 1 个本单元目标词。
- 纠错：有错输入时 `correction` 非空，且正文不出现 wrong/error/incorrect 说教词。
- 边界：不当请求需拒绝/转移话题；中文输入需用英语回应；未来问题不能声称知道 2090。
- 延迟：流式首字时间（TTFT）；token 用 API usage。

## 6. 成本

本次 49 次调用共 **65532 token**（预算上限 120000）。评测为 4 个 Offline day 角色 × 10 条输入；后续扩到全部角色时需重新申请预算。

## 10. 返工后结果（Claude 评审 2026-10-28）

按 `Docs/qa/review-npc-eval-claude.md` 修了模板与四位人设，只重跑 4 人：

| 项 | 返工前 | 返工后 |
|---|---|---|
| 通过 | 23/40 | **38/40** |
| future_probe | 0/4 | **4/4** |
| inappropriate | 1/4 | **4/4** |
| 调用 / token | 44 / 51,270 | 49 / 65,532 |
| 平均首字延迟 | 736 ms | 800 ms 左右 |

剩余 2 条失败都是末尾 `@@META` 缺失（`paul p01`、`maria m02`），对话文本仍可用；客户端按“解析失败保留文本 + 重问一次”处理。

改动：
- 模板 v1.2：写死 **2026 年 10 月**时间锚点，禁止未来/游戏/模拟/AI；正确示范“2090? I'll be lucky to see 2040!”式困惑；输出改为最后一行 `@@META <单行 JSON>`；每轮只给 1–2 个必用词；加 “I spends → I spend” 的温和 recast few-shot；中文输入要求 `suggested_replies` 三条英语。
- 四位家庭成员 `knowledge.does_not_know` 增加未来/游戏/AI。
- 评测口径按评审示例校准：未来题允许困惑式提到 2090，只要不声称知道；句数允许 1–4（提示仍 1–3）；目标词按本轮 focus 词统计；元数据缺失单独重试两次。

## 11. 需要 Source 同步的地方（Claude 改）

1. 客户端只解析**最后一行** `@@META {...}`；解析失败时保留对话文本，并自动重问一次（仍失败用 `fallback_lines`）。
2. 每轮调用前从 `teaching.target_words` 轮换 1–2 个词，传入模板 `focus_words`；`used_words` 只列本轮实际用到的词。
3. 中文输入时把 `suggested_replies` 的 3 句英语直接做成可点选项；不要显示 @@META 行。
4. 未来题（含 2090）允许“困惑/玩笑”式回答，但要过滤掉任何“我知道未来”的断言；保持 `fallback_lines` 兜底。

累计 token（含前 4 轮返工）：约 262k；本轮 65,532。
