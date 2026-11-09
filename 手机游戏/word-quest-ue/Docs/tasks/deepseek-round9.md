# DeepSeek 任务书 · 第九轮：教材内容全覆盖 + 质检（Claude 下发，2026-10-23）

## 用户原话

> 完成大学英语读写3 在 ue 的世界的建造，一定优先质量高，细节超级细节精致，然后把教材所有内容放进游戏里面。少 ui，沉浸体验。

本轮你负责保证**教材的每一段、每个生词、每道题都在游戏里能遇到**，并且答案、配音、质检都齐全。

## 目录规则（本轮调整）

- 可改：`Docs/**`（任务书除外）、`Tools/qa/**`、`Tools/data_*.py`、`Content/Data/**`。
- **`Content/Data/memory/textbook_scenes/*.json`**：只允许修 D23 里列出的引用错误，即题目 id 和段落号。不改布景、物件、灯光。每处改动都记进 `Docs/qa/content-coverage.md`。
- **`Source/**`（C++ 运行时、HUD、GameMode）从本轮起归 Codex**，你不要再改，免得两边冲突。你上一轮做的 memory HUD 和 GameMode 改动，写一段交接说明给 Codex，放在 STATUS 里。
- UE 只在导入数据时开，走 `Tools/run_ue_serial.sh`（`UE_LOCK_WHO=deepseek`）。
- 每项工作先写需求、接口、测试三件套，再动手。进度写进 STATUS 的 DeepSeek 一节。不提交。

---

## D23 内容覆盖审计（最优先）

写 `Tools/qa/content_coverage.py`，对 6 个单元逐项核对：

1. **段落**：`Content/Data/textbook/rw3/articles/unitNN.json` 里 Text A / B / C 的每个段落，是否被 `textbook_scenes/unitNN.json` 的某个 set 引用。列出没被引用的段落，以及引用了不存在段落的地方。
2. **生词**：教材 New words（506 条，`textbook_vocabulary.csv`）中，每个词是否挂在某个物件的 `word` 字段上。列出没挂的词，并给出建议挂载物件：哪个 set、哪个已有物件，或需要新增的物件和尺寸。
3. **题目**：`exercises/unitNN.json` 的每道题，是否被某个 set 引用；scene 里引用的 id 是否存在。
   - 已知错误：unit01 引用了 `u01_b_text_b_mcq`，实际 id 是 `u01_b_understanding`。
   - 这类引用错误直接修在 scene JSON 里。
4. 输出 `Docs/qa/content-coverage.md`：按单元列覆盖率表，目标是三项全部 100%。另输出 `Docs/qa/word-placement-proposals.json`，交给 Claude 审核后合入。
5. **测试**：pytest 用合成小数据覆盖未引用、越界、id 不存在三种情况；真实数据跑一遍，结果写进报告。

## D24 答案与参考译文

教材没有答案页，游戏里每道题都需要答案才能判对错。

1. 为 `exercises/unitNN.json` 中缺 `answer` 的题补答案和一句英文解析，标记 `"answer_source": "draft"`。只依据课文内容推断，不编造。拿不准的标 `"needs_review": true`。
2. 为翻译题写参考译文，同样标 draft。
3. 测试：每道选择题恰好一个正确答案；填空答案出现在词表或课文里；所有引用都合法。

## D25 课文配音（沉浸体验的声音）

世界是随着英语声音一点点建立起来的，所以每个段落都要有朗读。

1. 读 `Docs/data/vo-manifest.md`，为 6 个单元的全部段落和练习指令生成配音清单（id、文本、说话人、情绪）。
2. 用本机能用的最好的 TTS：先检查是否有本地神经 TTS，没有就用 macOS 高质量语音。不同人物用不同声线，旁白用沉稳的声音。
   - 不要调用要上传文本的在线服务；用之前先问 Claude。
3. 输出 WAV 到 `Content/Data/vo/unitNN/`，每条附逐句时间戳 JSON，用于字幕和朗读同步。
4. 测试：条目数和段落数一致；时长合理；不能有静音文件。

## D26 场景质检自动化

为 Claude 的人工评审先做一轮机器筛查。

1. 写 `Tools/qa/scene_audit.py`，读 Codex 的 checker 报告（`Docs/qa/textbook-scenes-unitNN.json`）和 4K 截图，按 set 统计：
   - 占位物数量、needs_final_asset 数量；
   - 贴花数是否 ≥ 10；
   - 曝光直方图：过暗或过曝的比例；
   - 大面积纯色区域：疑似纯色材质或窗外纯色；
   - 画面空旷度。
2. 输出 `Docs/qa/scenes-dashboard.md`，汇总 18 张关卡，每个 set 一行，附缩略图链接。
3. 测试：用合成图验证每项指标。

## 顺序

D23 → D24 → D26 → D25（配音最耗时，最后做；前面做完就开始）。
