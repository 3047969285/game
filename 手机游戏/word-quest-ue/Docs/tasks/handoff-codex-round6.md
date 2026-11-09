# 第六轮 Codex 交接（2026-11-02）

遵守 `round6-claude-codex.md` 的分工与顺序；不得提交或推送，不改 `Content/Characters/**`、`Tools/char_*.py` 和 Claude 的房间数据。所有 UE 与 Build.sh 走 `UE_LOCK_WHO=codex Tools/run_ue_serial.sh`，外盘引擎 `/Volumes/Games/Game-Engine/Epic Games/UE_5.8`；UE 与 Blender 重活不能同时跑。不要重复 Metal 下载：Claude 已完成安装，`xcodebuild -showComponent MetalToolchain` 确认 `Status: installed`；启动前仍须确认锁与 Blender 状态。

## C17 NPC
- `Docs/engine-npc-round6.md` 是需求、接口、测试；`WordQuestNpcProtocol.{h,cpp}`、`WordQuestNpcProtocolTests.cpp`、`WordQuestNpcDialogueClient.{h,cpp}` 已接 v1.2 `@@META`、一次重问、备用台词、整轮 8 秒、首字和用量；不可输出或保存凭据。经串行锁带 `-NoPCH -MaxParallelActions=2` 的引擎 Build.sh 编译通过，日志 `Saved/Round6/build-c17.log`；后续总编译 `Saved/Round6/build-npc-motion.log` 也通过。
- 新增 `Tools/test_npc_native_round6.py`（5 项原生自动化），更新 `Tools/test_npc_client_mock.py`（正常、修复、再次失败、未来断言、超时、取消）和 `Tools/test_npc_online_round5.py`（五轮及首字<3秒），统一有硬超时和 tick 异常注销。Python 离线 mock fixture `python3 -m unittest discover -s Tools -p 'test_npc_offline.py' -v` 3 项通过；这不代表原生/mock/在线测试通过。原生自动化重跑 5/5 通过，结果 `Saved/Round6/npc-native.json`、日志 `Saved/Round6/npc-native.log`。mock 首次排队因 Claude 客厅构建持锁超过 420 秒而超时（`Saved/NpcTests/mock-1793599937640896000/editor.log`），UE 未启动、用例未执行；锁空闲后继续 `python3 Tools/test_npc_client_mock.py`、`python3 Tools/test_npc_online_round5.py`，检查结果及五轮语言质量；实际在线测试只在运行时读取密钥。
- `Docs/engine-npc-motion-round6.md` 描述 `WordQuestNpcMotion.{h,cpp}`、`WordQuestNpcMotionTests.cpp` 和 `WordQuestNpcDirector.cpp`：按日程选择兼容姿势，支持存在时的脸部 morph，已编译。真实头眼骨 LookAt、动作平滑过渡和 MetaHuman 视觉验收仍未完成，不要删除 `needs_npc_gaze_rig`；需在 PIE 验证角色实际绑定和曲线。
- 四人声音 `Tools/record_npc_voices_round6.py` / `.swift` 已通过语法与类型检查；按顺序完成在线对话后运行，文件在 `Saved/Round6/voice-audition/`。这是独立 AVFoundation 输出，不是 PIE 实录，须人工实际试听并记录；`Docs/engine-npc-voice-audition-round6.md` 有说明。

## C16 物理
`WordQuestWorldInteraction.cpp` 识别 `interactive:door`、`hinge:south`、`interactive:window` + `glass`，修复静态物件被 Tick 误开启模拟，移除无限地板与越界传送。`Tools/test_offline_physics.py` 和 `Docs/engine-physics-round6.md` 已更新，离线契约 9 项通过，锁内编译通过 `Saved/Round6/build-c16.log`。封闭客厅交付并安装 Metal 后用 `python3 Tools/test_offline_physics.py --editor` 验证拿、放、扔、推、门窗和非穿模，截图交付；当前真实窗扇/窗框仍有资产依赖。

## C15 人眼第一人称
`Docs/engine-c15-round6.md`、`Tools/test_c15_round6.py`、`Tools/c15_round6_metrics.py`、`Tools/test_c15_round6_metrics.py` 已准备，合成指标测试 2 项通过。步频 1.6–2 Hz、曝光 1–2 秒均需 UE 阶跃实测；身体可见但隐藏头部依赖 Claude 组装角色；必须先验证 `L_Opening2090` 全流程再切默认入口，均未完成。

## C19 渲染与垂直切片
先等 Claude 明确交付封闭客厅；按 `Docs/qa/review-c19-claude.md` 开启/验证渲染功能与窗外环境并测帧时间，目前尚未做。之后完成 Offline day 行走、交互和四人对话的垂直切片录屏交评审，尚未做。
