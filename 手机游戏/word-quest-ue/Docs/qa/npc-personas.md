# 第一单元 NPC 人设覆盖（D29）

> 生成/校验：`Tools/data_npc_personas.py`；手写 4 位家庭成员 + 其余按分组生成。

## 1. 覆盖

| 项 | 值 |
|---|---|
| 情景 | 3 |
| 角色 | 51 |
| 人设文件 | 51 |
| 手写 | jack, jason, maria, paul |
| 缺失 | 0 |
| 重复 display_name | 0 |

## 2. 校验口径

- 每个 `people[].role` 都有 JSON；字段：role/display_name/age/occupation/appearance/personality/voice/scene_ids/schedule/backstory/knowledge/teaching/boundaries/fallback_lines。
- `appearance.character` ∈ {me2026, lin, mei, an, rui, organizer, old2090}。
- `teaching.target_words` 5–10 个，全部能在 `words.csv` 找到；`level` 统一 B1–B2。
- `voice` 都在 macOS `say -v '?'` 列表内；`fallback_lines` 恰好 5 句。

## 3. 角色槽位

| 槽位 | 人数 | 说明 |
|---|---|---|
| organizer | 6 | 背景角色复用槽位，需 Claude/Codex 换专属 MetaHuman |
| mei | 7 | 背景角色复用槽位，需 Claude/Codex 换专属 MetaHuman |
| lin | 8 | 背景角色复用槽位，需 Claude/Codex 换专属 MetaHuman |
| rui | 8 | 背景角色复用槽位，需 Claude/Codex 换专属 MetaHuman |
| me2026 | 8 | 背景角色复用槽位，需 Claude/Codex 换专属 MetaHuman |
| an | 8 | 背景角色复用槽位，需 Claude/Codex 换专属 MetaHuman |
| old2090 | 6 | 背景角色复用槽位，需 Claude/Codex 换专属 MetaHuman |

## 4. 已知限制

- 现有 7 个 MetaHuman 槽位不够 51 个角色；Jason/Jack 需要青少年/儿童体型，背景角色是临时槽位。
- 背景角色的 backstory 是分组模板（有原创内容，但不是逐人精修）；核心 4 位家庭成员是精写版。
- 目标词按情景 `text_words` 自动选 5–6 个，后续可人工调整偏好。

## 5. 复现

```bash
python3 Tools/data_npc_personas.py --force
```
