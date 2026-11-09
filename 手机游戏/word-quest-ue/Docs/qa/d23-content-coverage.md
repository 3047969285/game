# D23 内容覆盖审计（需求 / 接口 / 测试）

> 第九轮 · 2026-10-23 · 任务书 `Docs/tasks/deepseek-round9.md` D23
> 目标：教材每段课文、每个生词、每道题都能在游戏世界里遇到；目标是三项 100%。

## 1. 需求

1. 以真实数据为准逐单元核对三类内容：
   - **段落**：`Content/Data/textbook/rw3/articles/unitNN.json` 的 Text A/B/C 段落（1 起始段号），是否被 `Content/Data/memory/textbook_scenes/unitNN.json` 中某个 set 的 `paragraphs` 引用。
   - **生词**：`Content/Data/textbook/rw3/words.csv`（506 条，按 unit 归属）中的词，是否以 `props[].word` 挂在某个物件上。
   - **题目**：`Content/Data/textbook/rw3/exercises/unitNN.json` 的每个 block item（`(block_id, n)`），是否被某个 set 的 `exercises` 引用（支持 `id`、`id#n`、`id#n-m` 三种写法）。
2. 列出：未被引用的段落/题目、被引用但不存在的内容（越界段号、不存在的 block、越界题号）。
3. **只允许**在 `textbook_scenes/*.json` 里修“引用类”错误（题目 id、段落号），不改布景/物件/灯光；每处改动记录进 `Docs/qa/content-coverage.md`。
4. 未挂载的生词输出到 `Docs/qa/word-placement-proposals.json`（供 Claude 审核），含：词、词性、释义、课文出现位置、建议挂载的 set、kit、方式（挂已有物件 / 新增物件）与理由。
5. 输出 `Docs/qa/content-coverage.md`：按单元覆盖率表 + 缺失明细 + 修改记录 + 复现命令。
6. 覆盖率未达 100% 时不得把缺失数据“补空”，只如实统计并给出建议。

## 2. 接口

```bash
python3 Tools/qa/content_coverage.py                # 生成 md + proposals（默认写 Docs/qa/）
python3 Tools/qa/content_coverage.py --json         # 额外把汇总 JSON 打到 stdout
python3 Tools/qa/content_coverage.py --project DIR  # 指定工程根（默认 Tools/qa/../..）
python3 Tools/qa/content_coverage.py --out-md PATH --out-proposals PATH
```

- 输入目录（相对工程根）：
  - `Content/Data/textbook/rw3/articles/unitNN.json`：`{unit, texts:[{section, title, paragraphs[]}]}`
  - `Content/Data/textbook/rw3/exercises/unitNN.json`：`{unit, exercises:[{id, section, kind, items:[{n,...}]}]}`
  - `Content/Data/memory/textbook_scenes/unitNN.json`：`{unit, articles:[{section, scenes:[{id, paragraphs[], exercises[], props[]}]}]}`
  - `Content/Data/textbook/rw3/words.csv`：列 `unit, section, word, phonetic, pos, meaning_cn`
- 输出：
  - `Docs/qa/content-coverage.md`
  - `Docs/qa/word-placement-proposals.json`：`{generated_at, total_missing, units:{unitNN:{words:[...]}}}`
  - `--json` 打印 `{units:[{unit, paragraphs:{total,covered,missing,invalid}, words:{...}, exercises:{...}}], totals:{...}}`
- 关键函数（pytest 直接 import）：`parse_ref(ref) -> (block_id, set[int] | None)`、`coverage(project: Path) -> dict`、`render_markdown(summary) -> str`、`propose_placements(project, summary) -> dict`。

## 3. 测试

`Tools/qa/tests/test_content_coverage.py`（pytest，合成小工程 `tmp_path`）：

1. 未被引用的段落 → 计入 `missing`；覆盖率为 0。
2. 引用了不存在的段号（如段落只有 3 段却引用 4）→ 计入 `invalid`。
3. scene 引用不存在的 exercise id → `invalid`；`id#n` 越界 → `invalid`。
4. `parse_ref`：`id` / `id#2` / `id#2-4` / 非法值。
5. 词未挂载 → `missing`；proposals 里按出现段落给出 set 建议。
6. 真实数据跑一遍：命令执行成功，输出文件存在，覆盖率表与粗细统计一致（不作为 100% 断言，覆盖率写进报告）。

## 4. 真实数据执行记录

- 2026-10-23：`~/.local/share/hunyuan3d/.venv/bin/python Tools/qa/content_coverage.py --fix-log /tmp/d23-fix-log.md`
- 结果：**段落 187/187（100%）**；**生词 148/506（29.2%）**；**题目 472/487（96.9%）**；无效引用 0。
- 修的引用错误（`Content/Data/memory/textbook_scenes/unit01.json`，只改 id）：
  - `u01b_s2`: `u01_b_text_b_mcq#1-2` → `u01_b_understanding#1-2`
  - `u01b_s3`: `u01_b_text_b_mcq#3` → `u01_b_understanding#3`
  - `u01b_s4`: `u01_b_text_b_mcq#4` → `u01_b_understanding#4`
  - `u01b_s5`: `u01_b_text_b_mcq#5` → `u01_b_understanding#5`
  - `u01b_s7`: `u01_b_text_b_mcq#6` → `u01_b_understanding#6`
- 剩余缺口（不改布景，留 Claude 审核）：
  - unit01 有 15 道题没有 set 引用：`a_pre_reading#1-2`、`a_understanding#3-8`、`a_expressions_in_use#4-8`（16 题中 1 题已覆盖）。
  - 358 条生词未挂到物件；建议见 `Docs/qa/word-placement-proposals.json`（按课文出现位置 + 场景 + kit 排序，high/medium/low 三档）。
  - 注意：`words.csv` 是 OCR 原始词表，含 `adrougnt`、`cevice`、`avia` 这类拼写噪声；合入前建议与数据层校订词表（`word-quest/data/vocabulary/college_english_rw3.json`，536 词）对照。
