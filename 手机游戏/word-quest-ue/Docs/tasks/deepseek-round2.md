# DeepSeek 任务书 · 第二轮（Claude 下发，2026-10-21）

目录规则不变：你只改 `Docs/characters/**`、`Docs/qa/**`、`Tools/qa/**`、`Tools/data_*.py`。每项都要有测试或校验，做完写进 `STATUS.md`。

## D5 女主参考图映射（确认）

- 映射改为：front = `lian5.png`，q34 = `lian6.png`，side = `lian8.png`；closeup 和 back 用 `female_sheet.png`。
- `lian7` 不再作为女主的 back，它是男女主共用的 3/4 补充图。
- 更新 `report.py` 和 `Docs/qa/README.md`，去掉“待确认”标注。

## D6 主角服装规格（Claude 建衣服时要用）

从三视图量出服装规格。图在 `~/Downloads/male_sheet.png` 和 `female_sheet.png`，白底，正 / 侧 / 背三视图。

写 `Docs/characters/me2026-outfit.md` 和 `Docs/characters/lin-outfit.md`。所有尺寸按真实身高换算：男 1.84 m，女 1.68 m，在图上量像素后按比例换算成厘米。

- **男主**：
  - 衬衫：领型、领高、门襟、扣子数、下摆是否塞进裤子、袖子卷到的位置（距肘多少 cm）、卷边宽度
  - 西裤：腰头高、裤长和落脚堆褶、裤口宽
  - 皮鞋：款式、鞋头形状、底厚
  - 各部件颜色的 sRGB（在图上取样中位数）和材质判断
- **女主**：
  - 连衣裙：领口形状、袖型和袖长、腰线高度、裙长（距膝多少 cm）、A 字下摆周长估计、褶的数量
  - 高跟鞋：跟高、款式
  - 项链：长度和吊坠
  - 各部件 sRGB
- 附上测量用的脚本 `Tools/qa/measure_sheet.py`：剪影分割、按身高换算 cm、对指定横截线测宽度。加测试。
- 先用 Read 看图，确认三视图的排列顺序再量。

## D7 主角发型规格（Claude 生成发丝要用）

写 `Docs/characters/me2026-hair.md` 和 `lin-hair.md`。

- 男主看 `lian1/2/3/7`，女主看 `lian5/6/8` 和 sheet。
- 分区量出：前额刘海、头顶、两侧、耳后、颈后的长度（cm）、梳向（角度描述）、蓬起高度、发尖形态（尖 / 齐）、分缝位置、发量密度的相对等级。
- 给出头发剪影的标准轮廓：正面和侧面，用 `compare_silhouette` 的头发掩码导出 PNG，放 `Docs/qa/ref_masks/`，作为 Groom 验收的目标掩码。
