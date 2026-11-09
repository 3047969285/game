# 内容覆盖审计（D23）

> 生成：`python3 Tools/qa/content_coverage.py` · 2026-10-23T03:19:29+00:00
> 数据：articles / exercises / textbook_scenes / words.csv（真实数据，只读统计）

## 1. 总览

| 项 | 覆盖 | 总数 | 覆盖率 |
|----|------|------|--------|
| 课文段落 | 187 | 187 | 100.0% |
| 生词 | 506 | 506 | 100.0% |
| 题目 | 472 | 487 | 96.9% |

## 2. 分单元

| 单元 | 段落 | 生词 | 题目 | 无效引用 |
|------|------|------|------|----------|
| unit01 | 31/31 (100.0%) | 75/75 (100.0%) | 61/76 (80.3%) | 0 |
| unit02 | 32/32 (100.0%) | 117/117 (100.0%) | 83/83 (100.0%) | 0 |
| unit03 | 29/29 (100.0%) | 87/87 (100.0%) | 83/83 (100.0%) | 0 |
| unit04 | 33/33 (100.0%) | 76/76 (100.0%) | 82/82 (100.0%) | 0 |
| unit05 | 30/30 (100.0%) | 63/63 (100.0%) | 81/81 (100.0%) | 0 |
| unit06 | 32/32 (100.0%) | 88/88 (100.0%) | 82/82 (100.0%) | 0 |

## 3. 缺口明细

### unit01
- 未挂题 15 道：u01_a_expressions_in_use#4、u01_a_expressions_in_use#5、u01_a_expressions_in_use#6、u01_a_expressions_in_use#7、u01_a_expressions_in_use#8、u01_a_pre_reading#1、u01_a_pre_reading#2、u01_a_understanding#3、u01_a_understanding#4、u01_a_understanding#5 …

### unit02（100% 覆盖）

### unit03（100% 覆盖）

### unit04（100% 覆盖）

### unit05（100% 覆盖）

### unit06（100% 覆盖）

## 4. 生词口径（2026-10-23 起）

- 主口径：场景 JSON 的 `text_words[]`（漂浮句子里的词形，Claude 的 `Tools/scene_text_words.py` 生成）；`props[].word` 仍是具体名词的物件挂载。
- 本次统计：`text_words` 条目 506 条，未挂载 0 条（旧 word-placement-proposals 仅作历史参考，不再采用）。
- `text_words[].form` 必须出现在对应段落原文中，否则计入下方明细。

## 5. 修改记录（只允许改引用）

- `Content/Data/memory/textbook_scenes/unit01.json`
  - `u01b_s2`: `u01_b_text_b_mcq#1-2` → `u01_b_understanding#1-2`（exercise id 不存在，实际 block 名为 `u01_b_understanding`）
  - `u01b_s3`: `u01_b_text_b_mcq#3` → `u01_b_understanding#3`（exercise id 不存在，实际 block 名为 `u01_b_understanding`）
  - `u01b_s4`: `u01_b_text_b_mcq#4` → `u01_b_understanding#4`（exercise id 不存在，实际 block 名为 `u01_b_understanding`）
  - `u01b_s5`: `u01_b_text_b_mcq#5` → `u01_b_understanding#5`（exercise id 不存在，实际 block 名为 `u01_b_understanding`）
  - `u01b_s7`: `u01_b_text_b_mcq#6` → `u01_b_understanding#6`（exercise id 不存在，实际 block 名为 `u01_b_understanding`）

## 6. 复现

```bash
python3 Tools/qa/content_coverage.py
~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests/test_content_coverage.py -q
```
