# 全员验收看板（D18）

- 生成：`Tools/qa/dashboard.py` · 2026-10-21 23:12
- 阈值：正面关键点 ≤ 3 px、3/4 ≤ 8 px、侧面脸部剪影 IoU ≥ 0.95、头发 IoU ≥ 0.85
- 主角比参考照片；配角只比「目标网格 vs MHC」+ 关键点比例（无参考照片）。
- 缺失数据一律 N/A，不估算。

## 1. 总览

| 角色 | 状态 | front px | q34 px | side px | 脸部 IoU | 头发 IoU | 照片→目标 | 目标→MHC | 渲染时间 | 趋势 |
|------|------|----------|--------|---------|----------|----------|-----------|----------|----------|------|
| me2026 | N/A | — | — | — | — | — | — | — | — | front_px:— / face_iou:— / hair_iou:— |
| lin | FAIL | 4.61 | 4.80 | — | 0.941 | — | 5.58 | 4.61 | 2026-10-21 22:27 | front_px:持平 / face_iou:持平 / hair_iou:— |
| mei | FAIL | 4.07 | 3.57 | — | 0.954 | — | — | 4.07 | 2026-10-21 22:30 | front_px:持平 / face_iou:持平 / hair_iou:— |
| an | FAIL | 6.18 | 5.19 | — | 0.953 | — | — | 6.18 | 2026-10-21 22:31 | front_px:持平 / face_iou:持平 / hair_iou:— |
| rui | FAIL | 4.93 | — | — | 0.969 | — | — | 4.93 | 2026-10-21 22:38 | front_px:— / face_iou:— / hair_iou:— |
| organizer | FAIL | 3.88 | 4.03 | — | 0.959 | — | — | 3.88 | 2026-10-21 22:35 | front_px:持平 / face_iou:持平 / hair_iou:— |
| old2090 | FAIL | 7.40 | 7.06 | — | 0.943 | — | — | 7.40 | 2026-10-21 22:37 | front_px:— / face_iou:— / hair_iou:— |

## 2. 逐角色

### me2026（N/A）

- 备注：无 capture.json（Codex 渲染未完成）

N/A —— Codex 尚未渲染。

### lin（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/lin/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/lin/target_back.png；front: 渲染头发面积与参考差太多（4.1% vs 40.3%，可能是发片/皮肤预览），头发 IoU 跳过；side: 渲染头发面积与参考差太多（5.3% vs 38.9%，可能是发片/皮肤预览），头发 IoU 跳过

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 4.61 | 0.952 | 1.09/0.47/0.30 → 1.13/0.47/0.30 |
| q34 | 4.80 | 0.941 | 1.07/0.44/0.28 → 1.12/0.45/0.30 |
| side | — | — | — |
| back | — | — | — |
| closeup | 6.91 | 0.942 | 1.10/0.47/0.30 → 1.10/0.47/0.30 |

- 拟合误差拆分：照片→目标网格 5.58 px（front）；目标网格→MetaHuman 4.61 px（front）
- 头发 IoU：front — / side —

### mei（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/mei/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/mei/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 4.07 | 0.943 | 1.20/0.43/0.27 → 1.25/0.43/0.28 |
| q34 | 3.57 | 0.954 | 1.19/0.43/0.28 → 1.21/0.43/0.28 |
| side | — | — | — |
| back | — | — | — |
| closeup | 6.43 | 0.944 | 1.18/0.43/0.26 → 1.25/0.43/0.27 |

### an（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/an/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/an/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 6.18 | 0.938 | 1.08/0.44/0.28 → 1.15/0.45/0.30 |
| q34 | 5.19 | 0.953 | 1.13/0.40/0.28 → 1.17/0.40/0.28 |
| side | — | — | — |
| back | — | — | — |
| closeup | 8.07 | 0.954 | 1.11/0.44/0.29 → 1.13/0.45/0.30 |

### rui（FAIL）

- 备注：q34: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/rui/target_q34.png；side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/rui/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/rui/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 4.93 | 0.969 | 1.25/0.44/0.27 → 1.29/0.44/0.28 |
| q34 | — | — | — |
| side | — | — | — |
| back | — | — | — |
| closeup | 7.57 | 0.930 | 1.23/0.44/0.28 → 1.29/0.44/0.29 |

### organizer（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/organizer/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/organizer/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 3.88 | 0.960 | 1.08/0.44/0.28 → 1.12/0.44/0.29 |
| q34 | 4.03 | 0.959 | 1.16/0.40/0.27 → 1.17/0.39/0.27 |
| side | — | — | — |
| back | — | — | — |
| closeup | 7.09 | 0.957 | 1.11/0.44/0.28 → 1.13/0.44/0.29 |

### old2090（FAIL）

- 备注：side: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/old2090/target_side.png；back: 关键点检测失败 [compare_landmarks] no face detected in /Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Saved/Compare/old2090/target_back.png

| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |
|------|----------------|----------|----------------------------------------|
| front | 7.40 | 0.929 | 1.11/0.43/0.27 → 1.15/0.44/0.29 |
| q34 | 7.06 | 0.943 | 1.13/0.41/0.25 → 1.19/0.39/0.25 |
| side | — | — | — |
| back | — | — | — |
| closeup | 11.02 | 0.927 | 1.10/0.43/0.27 → 1.14/0.44/0.29 |

## 3. 历史趋势

历史写入 `Docs/qa/history.csv`（每次运行追加）。

| 角色 | 上次 front px | 本次 front px | 上次脸部 IoU | 本次脸部 IoU | 结论 |
|------|----------------|----------------|--------------|--------------|------|
| me2026 | 5.466523619410224 | — | 0.9588790431844019 | — | — |
| lin | 4.610488911850241 | 4.61 | 0.94098508811568 | 0.941 | 持平 |
| mei | 4.070056943600829 | 4.07 | 0.9538362835729491 | 0.954 | 持平 |
| an | 6.18419709892391 | 6.18 | 0.9528377243587556 | 0.953 | 持平 |
| rui | — | 4.93 | — | 0.969 | — |
| organizer | 3.8752725070941176 | 3.88 | 0.9590843146155421 | 0.959 | 持平 |
| old2090 | — | 7.40 | — | 0.943 | — |
