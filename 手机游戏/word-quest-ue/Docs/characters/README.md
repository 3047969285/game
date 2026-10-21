# 配角设定集（D1）

> 交付：DeepSeek Harness · 2026-10-21 · 任务书 [../tasks/deepseek-data-qa.md](../tasks/deepseek-data-qa.md)
> 用途：Claude 在 MetaHuman 参数空间里建脸、做发型和服装；Codex 做动画与场景调度。
> 主角 `me2026` / `lin` 以参考图为准，不在本目录。

## 角色索引

| ID | 角色 | 年龄 | 身高 | 一句话剪影 | 文件 |
|----|------|------|------|-----------|------|
| `old2090` | 2090 年的“我” | 84 | 1.78–1.80 m（驼背） | 银白后梳 + 金属圆框 + 宽开衫，灰蓝调 | [old2090.md](old2090.md) |
| `mei` | 同学 Mei | 20 | 1.63 m | 小个 + 高马尾尖 + 粉色卫衣 | [mei.md](mei.md) |
| `an` | 同学 An | 20 | 1.80 m | 方头宽肩 + 寸头 + 芥黄 T 恤（最宽轮廓） | [an.md](an.md) |
| `rui` | 同学 Rui | 20 | 1.87 m | 最高 + 长脸高额 + 棕色微卷 + 方框眼镜（蓝格纹） | [rui.md](rui.md) |
| `organizer` | 陈老师 | 38 | 1.70 m | 低马尾 + 米色开衫 + 保温杯（柔和圆肩） | [organizer.md](organizer.md) |

## 主角服装 / 发型规格（Claude 建衣服与 Groom 用）

| 文档 | 内容 |
|------|------|
| [me2026-outfit.md](me2026-outfit.md) | 白衬衫 / 黑西裤 / 黑皮鞋：cm 尺寸、sRGB、材质、卷袖与磨损 |
| [lin-outfit.md](lin-outfit.md) | 浅蓝 A 字连衣裙 / 银色高跟鞋 / 项链：cm 尺寸、sRGB、材质 |
| [me2026-hair.md](me2026-hair.md) | 黑色层次碎发：分区长度、梳向、蓬起、发尖、分缝、目标掩码 |
| [lin-hair.md](lin-hair.md) | 酒红长直发 + 齐刘海：分区长度、梳向、发尖、目标掩码 |

## 与既有代码的对应

- 外形参数来源：`../word-quest-game/src/features/memory/characters.ts`（`CHARACTERS`）。
- 故事来源：`../word-quest-game/docs/gdd-memory-game.md`（18 段回忆、人物关系）。
- 冲突处理：任务书声明**以本设定集为准**；`characters.ts` 中 `lin` 的旧发色（`#6b3f2a`）与旧服装已被总方案覆盖（酒红长直发、浅蓝 A 字裙），主角以参考图与总方案为准。
- 颜色写法：所有材质颜色用 **sRGB `#rrggbb`**；肤色同时给 **Fitzpatrick 分型**。

## 验证

`Tools/qa/tests/test_character_docs.py` 会检查：5 份文件存在、必备小节齐全、颜色格式合法、身高 / 年龄 / 肤色字段可解析、`old2090` 含与 `me2026` 的衰老一致性说明。
