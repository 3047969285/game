# D25 课文配音（需求 / 接口 / 测试）

> 第九轮 · 2026-10-23 · 任务书 D25
> 世界是随着英语声音一点点建立起来的：每个段落都要有朗读，配逐句时间戳。

## 1. 需求

1. 清单覆盖 6 个单元的**全部课文段落**（18 篇 × 每段）与**练习指令**（每个 exercise block 的 `instructions`），每行含：id、文本、说话人、情绪。
2. 用本机 TTS（macOS `say`，本机无神经 TTS；不调用任何在线上传服务）。不同文本用不同声线，旁白/课文朗读用沉稳声线。
3. 输出：
   - `Content/Data/vo/textbook/unitNN/<line_id>.wav`：22.05 kHz / mono / 16-bit PCM。
   - 同名 `.json`：`{line_id, unit, section, speaker, emotion, text, sentences:[{i, start, end, text}], duration}`
   - 清单：`Docs/data/vo-textbook-manifest.md` + `Content/Data/vo/textbook/manifest.csv`
4. 句级时间戳由逐句合成 + 精确时长累加得到（不靠估算），供字幕/朗读同步。
5. 不修改教材文本：读什么就合成什么（只做 TTS 前的数字/缩写不做替换，保持原文）。

## 2. 接口

```bash
python3 Tools/data_vo_textbook.py --manifest   # 只生成清单（快，无需 say）
python3 Tools/data_vo_textbook.py --synth      # 合成全部 WAV + 时间戳
python3 Tools/data_vo_textbook.py --synth --unit 3   # 只做某单元
python3 Tools/data_vo_textbook.py --check      # 校验清单与段落数一致
```

- 声线映射（macOS `say -v` 名称）：
  - `section_a` → `Samantha`（美音女声，清晰温和）
  - `section_b` → `Daniel`（英音男声，沉稳，作为旁白基底）
  - `section_c` → `Flo`（美音女声，明亮）
  - 练习指令 → `Reed`（美音男声，平稳）
  - 语速统一 `-r 165`；情绪标签：`calm` / `clear` / `steady` / `warm`。
- 命名：段落 `vo.tb.unitNN.section_x.pNN`；指令 `vo.tb.unitNN.ex.<exercise_id>`。
- 合成流程：每句 → `say -v <voice> -r 165 -o /tmp/x.wav --data-format=LEI16@22050` → `afinfo` 取时长 → wave 拼接 → 写 JSON。
- 测试（`Tools/qa/tests/test_data_vo_textbook.py`）：
  1. 清单行数 = 段落数 + 练习指令数；id 唯一；
  2. `--manifest` 产物里每句文本能在原文中找到；
  3. 用小样本合成：WAV 存在、时长 > 0.2 s、时间戳单调且末句 end ≤ duration + 0.05、RMS 非静音；
  4. voice 映射合法（只在允许集合里）。

## 3. 真实数据验收

- `--check` 通过；每个 unit 段落数、指令数、实际 WAV 数一致；
- 报告 `Docs/qa/voice-report.md`：每单元条数/总时长/静音检查/复现命令。
