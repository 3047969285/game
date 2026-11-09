# D24 答案、英文解析与翻译参考（需求 / 接口 / 测试）

> 第九轮 · 2026-10-23 · 任务书 D24
> 教材没有答案页；游戏里每道题都要能判对错，所以答案必须齐全且可追溯。

## 1. 需求

1. `exercises/unitNN.json` 每个 item 都要有：
   - `answer`：选择题为正确项下标 0–3；填空/翻译为字符串；开放题给**参考作答**（model answer）。
   - `explanation`：**一句英文解析**（见接口约定），解释为什么是这个答案。
   - 本轮由 AI 推断/撰写的内容一律标 `answer_source: "draft"`；主观题或不确定的再标 `needs_review: true`。
2. 开放题（`pre_reading` / `critical` / `structure_writing` / `reading_skills` 等 `answer_source: open` 且 `answer: null`）补 2–4 句英文参考作答 + 英文解析，标 draft + needs_review。
3. 翻译题（`kind: translation`）保留/补齐英文参考译文，并加一句英文解析（点出 2–3 个关键译法）。
4. 不编造教材没有的事实：答案只能由课文段落、词表 bank、题目自身推出。
5. 产出 `Docs/qa/d24-answer-report.md`：每题块签名、补写条数、needs_review 清单、复现命令。

## 2. 接口

- 草稿来源：`Content/Data/textbook/rw3/answers/draft_unitNN.json`
  ```json
  {"unit": 1, "items": [
    {"block": "u01_a_understanding", "n": 1, "explanation_en": "Para. 1 says ...",
     "draft_answer": null, "needs_review": false}
  ]}
  ```
  - `draft_answer` 仅对原本 `answer` 为空的题填写；已有答案的题只补 `explanation_en`。
- 合并脚本：
  ```bash
  python3 Tools/data_answers.py --check     # 校验草稿完整性与引用
  python3 Tools/data_answers.py             # 写入 exercises/unitNN.json + 报告
  ```
  - 写入字段（item 级）：`answer`、`answer_source`（新填=“draft”）、`needs_review`、`explanation`（英文，覆盖已有则保留旧 `explanation_zh` 不动）。
  - 幂等：重复运行不改变已写入结果。
- 测试（`Tools/qa/tests/test_data_answers.py`，合成数据）：
  1. 缺 answer 的题合并后必须有 answer，且 `answer_source=="draft"`；
  2. 选择题答案必须 0–3 且唯一；
  3. 填空题答案出现在该 block 的 `bank` 或对应课文中；
  4. 已存在答案不被覆盖；`explanation` 非空并以英文为主；
  5. 引用校验：草稿 `(block, n)` 必须存在；缺草稿条目的题要在 `--check` 报错；
  6. 幂等性：跑两次结果一致。

## 3. 真实数据验收

- 每个 unit：`items == draft 条目数`；`answer` 为空的数量 = 0；needs_review 清单写入报告。
- 报告里给出如 `unit01: 76/76 answers, 11 drafts, 11 needs_review`。
