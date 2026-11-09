# 全员验收看板（D18）

- 生成：`Tools/qa/dashboard.py` · 2026-10-22 10:09
- 阈值：正面关键点 ≤ 3 px、3/4 ≤ 8 px、侧面脸部剪影 IoU ≥ 0.95、头发 IoU ≥ 0.85
- 主角比参考照片；配角只比「目标网格 vs MHC」+ 关键点比例（无参考照片）。
- 缺失数据一律 N/A，不估算。

## 1. 总览

| 角色 | 状态 | front px | q34 px | 脸部 IoU | 头发 IoU | 发丝验收 | 照片→目标 | 目标→MHC | 渲染时间 | 趋势 |
|------|------|----------|--------|----------|----------|----------|-----------|----------|----------|------|
| me2026 | FAIL | 4.11 | 7.99 | 0.950 | — | N/A | 4.35 | 4.11 | 2026-10-22 10:06 | front_px:变好 / face_iou:变差 / hair_iou:— |
| lin | FAIL | 6.27 | 7.77 | 0.936 | — | N/A | 5.58 | 6.27 | 2026-10-22 10:07 | front_px:变差 / face_iou:变好 / hair_iou:— |
| mei | FAIL | 4.99 | 6.06 | 0.945 | — | N/A | — | 4.99 | 2026-10-22 10:02 | front_px:持平 / face_iou:持平 / hair_iou:— |
| an | FAIL | 5.28 | 5.93 | 0.946 | — | N/A | — | 5.28 | 2026-10-22 10:05 | front_px:变差 / face_iou:变差 / hair_iou:— |
| rui | FAIL | 7.32 | — | 0.932 | — | N/A | — | 7.32 | 2026-10-22 10:03 | front_px:持平 / face_iou:持平 / hair_iou:— |
| organizer | FAIL | 4.15 | 6.03 | 0.946 | — | N/A | — | 4.15 | 2026-10-22 10:04 | front_px:变差 / face_iou:变差 / hair_iou:— |
| old2090 | FAIL | 7.17 | 8.36 | 0.944 | — | N/A | — | 7.17 | 2026-10-22 10:04 | front_px:变差 / face_iou:变好 / hair_iou:— |

## 2. 逐角色

### me2026（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/me2026/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/me2026/target_back.png；front: 渲染头发面积与参考差太多（5.0% vs 15.1%，可能是发片/皮肤预览），头发 IoU 跳过；side: 渲染头发面积与参考差太多（8.3% vs 22.2%，可能是发片/皮肤预览），头发 IoU 跳过

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 4.11 | 0.959 | 1.14/0.44/0.28 → 1.18/0.44/0.28 |
| q34 | 7.99 | 0.950 | 1.10/0.40/0.25 → 1.18/0.38/0.26 |
| side | — | — | — |
| back | — | — | — |
| closeup | 8.38 | 0.961 | 1.15/0.44/0.28 → 1.18/0.44/0.28 |

- 拟合误差拆分：照片→目标网格 4.35 px（front）；目标网格→MetaHuman 4.11 px（front）
- 头发 IoU：front — / side —

### lin（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/lin/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/lin/target_back.png；front: 渲染头发面积与参考差太多（8.6% vs 40.3%，可能是发片/皮肤预览），头发 IoU 跳过

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 6.27 | 0.935 | 1.09/0.47/0.30 → 1.10/0.45/0.28 |
| q34 | 7.77 | 0.936 | 1.07/0.44/0.28 → 1.10/0.44/0.27 |
| side | — | — | — |
| back | — | — | — |
| closeup | 10.52 | 0.916 | 1.10/0.47/0.30 → 1.08/0.45/0.28 |

- 拟合误差拆分：照片→目标网格 5.58 px（front）；目标网格→MetaHuman 6.27 px（front）
- 头发 IoU：front — / side 0.339

### mei（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/mei/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/mei/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 4.99 | 0.944 | 1.19/0.43/0.26 → 1.21/0.43/0.27 |
| q34 | 6.06 | 0.945 | 1.15/0.39/0.26 → 1.24/0.39/0.26 |
| side | — | — | — |
| back | — | — | — |
| closeup | 7.35 | 0.944 | 1.18/0.43/0.26 → 1.22/0.43/0.27 |

### an（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/an/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/an/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 5.28 | 0.954 | 1.10/0.45/0.29 → 1.14/0.44/0.29 |
| q34 | 5.93 | 0.946 | 1.11/0.40/0.28 → 1.18/0.39/0.27 |
| side | — | — | — |
| back | — | — | — |
| closeup | 8.58 | 0.951 | 1.11/0.45/0.30 → 1.13/0.44/0.29 |

### rui（FAIL）

- 备注：q34: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/rui/target_q34.png；side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/rui/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/rui/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 7.32 | 0.932 | 1.22/0.43/0.27 → 1.27/0.43/0.27 |
| q34 | — | — | — |
| side | — | — | — |
| back | — | — | — |
| closeup | 10.80 | 0.926 | 1.19/0.44/0.27 → 1.23/0.43/0.28 |

### organizer（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/organizer/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/organizer/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 4.15 | 0.956 | 1.09/0.44/0.28 → 1.12/0.43/0.29 |
| q34 | 6.03 | 0.946 | 1.16/0.39/0.26 → 1.20/0.38/0.28 |
| side | — | — | — |
| back | — | — | — |
| closeup | 9.01 | 0.946 | 1.11/0.44/0.29 → 1.13/0.43/0.28 |

### old2090（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/old2090/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/old2090/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 7.17 | 0.940 | 1.15/0.43/0.27 → 1.18/0.43/0.28 |
| q34 | 8.36 | 0.944 | 1.14/0.41/0.24 → 1.23/0.38/0.26 |
| side | — | — | — |
| back | — | — | — |
| closeup | 10.54 | 0.934 | 1.12/0.42/0.27 → 1.17/0.43/0.28 |

## 3. 历史趋势

历史写入 `Docs/qa/history.csv`（每次运行追加）。

| 角色 | 上次 front px | 本次 front px | 上次脸部 IoU | 本次脸部 IoU | 结论 |
|------|----------------|----------------|--------------|--------------|------|
| me2026 | 4.218643068833522 | 4.11 | 0.9587012445247862 | 0.950 | 变好 |
| lin | 5.76155505646501 | 6.27 | 0.9207157913620666 | 0.936 | 变差 |
| mei | 4.987234350246455 | 4.99 | 0.9449576673524291 | 0.945 | 持平 |
| an | 5.239369607056078 | 5.28 | 0.9498279333822708 | 0.946 | 变差 |
| rui | 7.320847371373632 | 7.32 | 0.932282541751625 | 0.932 | 持平 |
| organizer | 4.07623161024196 | 4.15 | 0.946987485599205 | 0.946 | 变差 |
| old2090 | 6.740582995863486 | 7.17 | 0.9382738436319061 | 0.944 | 变差 |
