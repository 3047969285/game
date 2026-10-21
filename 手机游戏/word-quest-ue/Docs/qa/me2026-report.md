# 男主 me2026（2026） 验收报告

- 生成：`Tools/qa/report.py me2026`（DeepSeek D3）
- 渲染目录：`/Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/me2026`
- 阈值来源：`Docs/character-production-plan.md` 第 4 节
- 结论：**存在 FAIL**

## PASS / FAIL 表

| 检查项 | 数值 | 阈值 | 判定 | 说明 |
|--------|------|------|------|------|
| front 关键点平均误差 | 7.38 px | ≤ 3 px | FAIL | max 22.9 px / p95 14.7 px |
| front 头发剪影 IoU | 0.010 | ≥ 0.85 | FAIL | 暗色低饱和区域 |
| q34 关键点平均误差 | 14.22 px | ≤ 8 px | FAIL | max 46.9 px / p95 29.5 px |
| side 脸部剪影 IoU | 0.247 | ≥ 0.95 | FAIL | 白底前景去掉头发 |
| back 并排图 | 已生成 | 人工检查 | N/A | 背面/特写以人工确认为准 |
| closeup 并排图 | 已生成 | 人工检查 | N/A | 背面/特写以人工确认为准 |

## 并排图与差异图

![front](me2026/front_side_by_side.png)
![hair diff](me2026/front_hair_diff.png)
![q34](me2026/q34_side_by_side.png)
![side](me2026/side_side_by_side.png)
![side face diff](me2026/side_face_diff.png)
![back](me2026/back_side_by_side.png)
![closeup](me2026/closeup_side_by_side.png)

## 人工检查项（未自动判定）

- [ ] 发丝是否有碎片/发片边缘
- [ ] 眼睛高光与虹膜质感
- [ ] 牙齿与口腔
- [ ] 表情极值（眨眼/张嘴/微笑）
- [ ] 布料自交与穿模
- [ ] LOD 远近切换
- [ ] 1440p Lumen 下单英雄 LOD0 ≤ 2.5 ms GPU
