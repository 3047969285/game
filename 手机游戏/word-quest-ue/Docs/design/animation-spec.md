# 动画与表演规格（D16）

> 作者：DeepSeek Harness · 2026-10-21 · 任务书 [../tasks/deepseek-round5.md](../tasks/deepseek-round5.md)
> 依据：D9 `Content/Data/memory/acts.json`、`Docs/characters/*`、`Docs/design/learning-ui.md`
> 范围：只写规格与清单，不含任何动画素材；不得使用未授权 mocap/动作库。

## 1. 技术基线

| 项 | 规格 |
|----|------|
| 帧率 | 游戏 60 fps；动画采样 30 fps；过场镜头 24 fps 电影感 |
| 骨架 | MetaHuman 标准骨架（Rocketbox 命名兼容层保留） |
| 面部 | ARKit 52 blendshape；头部/眼球单独控制（Look-at） |
| 分层 | Base（全身位移） + UpperBody（additive 手势/书写） + Face（additive 表情） + IK（脚/手） |
| 混入 | 动作切换 0.15–0.25 s crossfade；表情 0.1–0.2 s；不做快速弹跳 |
| IK | 脚部贴地（IK Foot）、坐姿脚平放、手伸向桌面/纸/保温杯、Look-at 目标（黑板/对话者） |
| LOD | LOD0 全骨骼 + 手指；LOD1 简化手指；LOD2 去掉手指/脸部细节（远景用发片） |

## 2. 优先级与分层

| 优先级 | 含义 | 示例 |
|--------|------|------|
| **P0** | 过场/剧情必须播放，可打断 ambient | 开场下潜、定格、关键台词 |
| **P1** | 交互/对话动作，可被 P0 打断 | 坐下、举手、写字、说话手势、表情 |
| **P2** | 环境循环，随时可被覆盖 | idle、呼吸、翻书、走路 |

- Base 层只受 P0/P1 控制；P2 循环在无输入时自动播放，退出时淡出。
- UpperBody additive：说话手势、书写、翻书、举杯；权重 0–1，可叠加在 idle/walk/sit 上。
- Face additive：表情与眨眼/呼吸分离；对话时 mouth 由音频驱动或按台词打关键帧。

## 3. 通用动作库

| anim_id（示例） | 动作 | 类别 | 时长 | 循环 | 优先级 | 来源 |
|-----------------|------|------|------|------|--------|------|
| `<char>_walk` | 行走 | locomotion | 1.0 s | 是 | P2 | mocap |
| `<char>_idle_stand` | 站立待机（呼吸+微动） | locomotion | 4–6 s | 是 | P2 | mocap |
| `<char>_sit_down` / `stand_up` | 坐下 / 起身 | classroom | 1.2 s | 否 | P1 | mocap |
| `<char>_idle_sit` | 坐姿待机（课堂） | classroom | 6–8 s | 是 | P2 | mocap |
| `<char>_write` | 伏案写字 | classroom | 3–4 s | 是 | P2 | handkey |
| `<char>_read_book` | 低头看书 | classroom | 4–5 s | 是 | P2 | handkey |
| `mei_turn_page` | 翻页 | classroom | 0.8 s | 否 | P1 | handkey |
| `<char>_raise_hand` | 举手 | classroom | 1.0 s | 否 | P1 | handkey |
| `<char>_look_blackboard` | 抬头看黑板 | classroom | 2–3 s | 是 | P2 | procedural |
| `<char>_head_turn` | 转头（对话/环顾） | social | 0.6 s | 否 | P1 | procedural |
| `<char>_talk_gesture` | 说话手势 | social | 2–3 s | 是 | P1 | mocap |
| `organizer_hold_cup` | 双手捧保温杯 | social | 4 s | 是 | P2 | procedural |
| `rui_adjust_glasses` | 推眼镜 | social | 0.8 s | 否 | P1 | handkey |
| `old2090_walk_slow_cane` | 慢走（拐杖） | locomotion | 1.6 s | 是 | P1 | procedural |
| `old2090_hand_tremble` | 手部轻颤（叠加） | social | 2 s | 是 | P2 | procedural |
| `old2090_sigh` | 叹气 | social | 2.5 s | 否 | P1 | handkey |

完整 ID 列表见 `Content/Data/anim/anim_manifest.csv`（88 条，按角色 × 动作展开，字段：`anim_id, character, category, loop, priority, source`）。

## 4. 面部表情配方（ARKit 52）

> 数值为 0–1 的曲线权重；`Left/Right` 分别给左右对称值（默认相同）。所有表情叠加在 `face_idle`（眨眼 0.0–1.0 周期、呼吸微动）之上。

| 表情 | 配方 | 使用场景 |
|------|------|----------|
| **温和的笑** | `mouthSmileLeft/Right 0.25` + `eyeSquintLeft/Right 0.15` + `cheekSquintLeft/Right 0.1` | lin 打招呼、陈老师 |
| **紧张的笑** | `mouthSmileLeft/Right 0.40` + `browInnerUp 0.30` + `eyeSquintLeft/Right 0.20` + `mouthPressLeft/Right 0.1` | mei 说错话后 |
| **惊讶** | `jawOpen 0.35` + `eyeWideLeft/Right 0.60` + `browInnerUp 0.50` | an 听到意外消息 |
| **叹气/失落** | `mouthFrownLeft/Right 0.30` + `jawOpen 0.10` + `browInnerUp 0.20` + `eyeBlinkLeft/Right 0.15` | old2090、me2026 |
| **回忆失焦** | `eyeBlinkLeft/Right 0.15` + `eyeLookUpLeft/Right 0.25` + `browInnerUp 0.15` + `mouthClose 0.1` | old2090 记忆开场 |
| **专注/思考** | `browDownLeft/Right 0.30` + `eyeSquintLeft/Right 0.20` + `mouthPressLeft/Right 0.10` | rui 查档案 |
| **倾听（不说话）** | `mouthClose 0.15` + `eyeSquintLeft/Right 0.05` + 头部 Look-at 主讲人 | lin/rui 课堂 |
| **开口说话** | `jawOpen 0.20–0.40` 周期 + `mouthFunnel 0.05` / `mouthPucker 0.05` 交替 | 所有角色对话 |
| **悲伤（克制）** | `mouthFrownLeft/Right 0.45` + `browInnerUp 0.55` + `eyeSquintLeft/Right 0.10` | 散伙饭、结尾 |
| **强忍情绪** | `mouthPressLeft/Right 0.35` + `jawOpen 0.05` + `browDownLeft/Right 0.20` + `noseSneer 0.1` | 角色冲突 |

- 极值校验：所有表情组合在 MetaHuman 面部绑定下不破面；每帧只允许 2–3 个表情叠加（除说话的嘴部）。
- 眼球：Look-at 目标；对话时看对方眼睛 60%，思考时看下方 25%，回忆时看远方 15%。
- 眨眼：基础 14–18 次/分；old2090 8–10 次/分（慢）；紧张时短暂变快。

## 5. 角色表演特征（来自设定集）

| 角色 | 动作特征 | 面部 |
|------|----------|------|
| **me2026** | 站姿直、动作干净；紧张时手插兜；说话时少量手势 | 克制，笑只动嘴角；专注时皱眉 |
| **lin** | 动作轻、幅度小；坐下时先理裙摆；说话看对方 | 温和的笑、眼神稳定；害羞时看下方 |
| **mei** | 动作快、手势多；坐姿前倾、转手机、别头发 | 紧张的笑、眼睛睁大 |
| **an** | 动作大、外八站姿、抖腿、转笔；后仰靠椅 | 单眼皮、低眉，笑先低头 |
| **rui** | 慢、稳；推眼镜、对齐纸边；低头走路 | 思考皱眉、说话前清嗓子 |
| **organizer** | 双手捧保温杯、点头、慢；批评前沉默 2 秒 | 平静、笑先低头再抬眼 |
| **old2090** | 慢走（拐杖）、坐下先撑膝、手轻颤；含胸 | 眨眼慢、回忆失焦、克制 |

## 6. 状态机（Base 层）

```
IdleStand ──WASD──▶ Walk ──speed>0.7──▶ Run(仅 me2026/an)
   │                  │
   │E(坐下)/剧情        │Space(坐下)
   ▼                  ▼
IdleSit ──E/剧情──▶ StandUp ──▶ IdleStand
   │
   │对话/过场
   ▼
Dialogue（UpperBody additive + Face）──▶ IdleStand/IdleSit
```

- 过渡：0.2 s crossfade；坐/起 0.15 s 位移蒙太奇；禁止 0.5 s 以上滑步。
- 打断：P0 可打断一切；P1 可打断 P2；P2 只在空闲播放。
- 课堂段落：进入 `IdleSit` 后按 acts 的 `cues` 触发 `read_book` / `write` / `look_blackboard`（additive）。

## 7. 与 `acts.json` 时间线对接

- 每段回忆 5 幕（`acts[].index 0–4`）；每幕 4–8 句，按旁白/字幕时间推进。
- 每幕的 `cues[].build` 触发场景显形；角色动作由 `cues`/`build` 派生的表演提示驱动（如“课桌出现”→ `sit_down`）。
- 过场：P0 级别；对话：角色 `talk_gesture` + Face 说话曲线；定格：`face_recall` + 静止。
- 时长预算：单幕 20–60 s；单段回忆 3–6 min（与现有玩法一致）。

## 8. 性能与验收

- 同屏角色 ≤6；LOD0 只给主角，其余 LOD1；面部 morph 只在近景（≤3 m）开启。
- 动画预算：单角色骨骼动画 ≤1.2 ms CPU（LOD0），全场景 ≤4 ms。
- 验收：脚部不滑步（位移误差 <3 cm/步）、坐姿脚掌贴地、手 IK 不穿桌面、表情极值不破面、循环无缝（首尾帧差 <0.5 cm）。
- 版权：动作只允许 `mocap`（自有录制）/`handkey`/`procedural`；禁止使用第三方动作库素材，除非用户书面授权。

## 9. 交付清单

- `Content/Data/anim/anim_manifest.csv`（88 条，本规格的机器可读版本）
- Codex：按 manifest 建 AnimSequence/BlendSpace/Montage 与 ABP；Claude：确认角色专属动作与表情范围。
