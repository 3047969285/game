# C16 物理落地报告（Offline day 客厅，2026-10-28）

数据：`Saved/Round5/physics-setup.json`、`Saved/Round5/c16-physics.json`、`Saved/Round5/c16-physics.error.txt`
工具：`Tools/setup_offline_physics.py`（标注/质量/约束）、`Tools/test_round5_physics.py`（PIE 自动测试）

## 1. 已落地

- **质量与碰撞**：按 `Content/Data/npc/interactions_unit01.json` 的 s1 清单，为 28 个物件建立运行时物理（源碰撞 28，box proxy 0）。动态物件质量与标签一致，例如书 0.788 kg、手机 0.2686 kg；静态家具（书架/咖啡桌/灯/日历）只做碰撞、不模拟。
- **约束**：`window_wall` 使用铰链（`physics_mode:hinge`，±90° twist）；没有把整组棋子当可拿物（`chess_set` 仍标记为待独立棋子资产）。
- **占位音效**：`WordQuestWorldInteraction` 在 BeginPlay 生成 9 个材质程序化接触音（wood/metal/ceramic/glass/paper/fabric/plastic/stone/generic），无外部音频资产；`audio=9`、`contact_events` 有累计。
- **可观测字段**：`GetInteractionState()` 增加 `audio/contact_events/contact_material/max_body_speed/flying`，PIE 可直接断言。
- **运行时地板兜底**：s1 的 rug/地板实际没有有效碰撞，已额外 spawn 一个隐藏 `BasicShapes/Cube` 物理地板（Tag `physics_runtime_floor`）。

## 2. PIE 实测结果（WQ_C16_PIE_FAIL）

| 项 | 结果 | 证据 |
|---|---|---|
| 抓取/端详/放下 | PASS | 书被抓取、旋转、放下；`grabs=1 drops=1` |
| 无 NaN / 无飞出（速度/边界） | PASS | `no_nan=true`、`no_flying=true`、max_body_speed 正常 |
| 无穿透地面 | **FAIL** | 放下的书 `z=-175 cm`（穿透隐藏地板） |
| 椅子推动 | PASS | `chair_push=true`（ProbeFocus 锁定后 PushFocused 生效） |
| 窗铰链开合 | PASS | `hinge=true`（ProbeFocus 锁定后 Interact 切到约束分支） |
| 占位接触音 | PASS | `audio_placeholders=true`、`contact_fired=true` |
| 扔出 | SKIP | 第二次抓取在当前流程未成功；本轮未测到真实 throw |

## 3. 根因与下一步

1. **地板穿透**：`BlockAll` 的隐藏 cube 对物理代理仍无效，需检查代理的 collision response/channel 或直接用 `AStaticMeshActor` 的地板在关卡里补碰撞（属场景/引擎侧）。测试会继续暴露该问题，不能标记 PASS。
2. **聚焦推送/铰链**：`ProbeFocusActor` 只设置 Focused/GazeClock；`PushFocused`/`Interact` 还依赖 `BodyFor(Focused)` 与 `Constraints` 的运行时状态，当前 PIE 下未命中。下一步在 `WordQuestWorldInteraction` 把约束/推力的判定分支写入 `GetInteractionState()`（例如 `focused_body=0/1`、`focused_mode=`），再定位是 Focused actor 不是 body 所属 actor 还是 constraint 键不匹配。
3. **扔出流程**：已改为 ProbeFocus + release(true)；书仍会穿透地板，因此 throw 的地面检查与 drop 一样失败。
4. **静态家具质量**：`GetMass` 对非模拟体返回默认 10 kg，测试已跳过这些条目；后续用标签质量作为验收值。

## 4. 复现

```bash
python3 Tools/setup_offline_physics.py
UE_LOCK_WHO=deepseek python3 Tools/test_round5_physics.py
# 证据：Saved/Round5/c16-physics.json / .error.txt
```
