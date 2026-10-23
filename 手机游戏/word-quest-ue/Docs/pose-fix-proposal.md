# Opening 2090: engine-only pose audit

## 产品需求说明书

只使作者交付的 old2090 MHC 身体正确显示坐姿，不改 MHC、作者网格、脸、毛发或服装。成功标准是保存后重新打开，骨盆下降、膝关节弯曲、头部跟随且截图可见；仅报告 pose_asset 存在不算通过。

## 接口文档

2026-10-23 静态审计证据：

- `Tools/textbook_character_staging.py::_apply_pose` 当前只调用 set_animation_mode、set_animation、set_update_animation_in_editor，缺少显式求值/刷新。
- 本机 UE 5.8 `Engine/Source/Runtime/Engine/Private/Components/SkeletalMeshComponent.cpp:4291` 的 SetAnimation 调用 SetAnimationAsset 后立即 SetPlaying(false)。PlayAnimation 会额外调用 Play，但仍依赖下一次组件更新。
- `SourceArt/Poses/skeleton.json` 指定 `/MetaHumanCharacter/Female/Medium/NormalWeight/Body/metahuman_base_skel`；动画来自通用 IdentityTemplate 身体。此路径的 Female 字样不证明角色是女性，但必须记录动画骨架与 snapshot SK_Body 骨架兼容性。
- `Tools/props/pose_author.py` 设计了 pelvis 向 0.56m 降低、thigh 前伸、calf 向下的 sit，两帧同姿势；脚本设计上并不是站立动画。然而尚未在 UE 中采样其真实骨轨，不能排除导出/导入骨轨丢失。
- `Saved/Opening2090/build.json` 仅记录 A_MH_sit 资产路径，没有姿态骨矩阵验证。

建议在已有受限 staging C++ library 新增只操作场景组件的 helper：

```cpp
// Pseudocode; requires null/mesh/animation/skeleton validation and editor guards.
Body->SetAnimationMode(EAnimationMode::AnimationSingleNode);
Body->SetUpdateAnimationInEditor(true);
Body->PlayAnimation(Anim, true);
Body->SetPosition(0.f, false); // no notifies / sound / gameplay side effects
Body->TickAnimation(0.f, false);
Body->RefreshBoneTransforms();
Body->UpdateComponentToWorld();
Body->MarkRenderDynamicDataDirty();
Body->SetPlaying(false); // freeze the evaluated one-frame pose
```

Python supports play_animation, set_position, set_update_animation_in_editor. TickAnimation and RefreshBoneTransforms are public ENGINE_API methods but not exposed as Python UFUNCTIONs, so use C++ helper rather than invented Python methods. Refresh attached head component world transforms after body evaluation. Do not rebind authors skeletons or set animation skeleton blindly to bypass compatibility failure; if incompatible, use a generated animation copy on a verified compatible skeleton or proper retargeting.

### 身体来源证据与限制

Snapshot capture takes every skeletal component directly from `spawn_meta_human_actor(character, True)` and duplicates the Body mesh/material; there is no female body selection code or replacement mesh here. old2090_cast.json requests male (`gender=1.0`), age≈0.954, height=1.79m. `Tools/char_conform_metahuman.py` creates the MHC then requests COMBINED body/face conform with estimate_body_joints_from_mesh. This does not prove that the current binary MHC actually has the intended body: conform can partially solve or retain a preview body. The current preview must be compared with the author-owned MHC preview and exported target before attributing apparent feminine anatomy to staging. Staging cannot safely fix this by replacing the body or adding invented clothes. `Saved/Compare/old2090/capture.json` labels source=MHC, unrigged_preview=true and Authored skin; preview materials are skin-only, not the prescribed cardigan outfit.

## 测试

1. Log mesh skeleton, animation skeleton, compatibility, sequence length and sampled track/bone count; fail on null animation.
2. Log pelvis/calf_l/head component-space or socket positions before/after helper, check sit knee/hip angles change substantially. No arbitrary absolute world-height assertion until character transform/scale is accounted for.
3. If transforms unchanged: sample animation pose vs reference pose to isolate absent tracks from component-update failure. Check pelvis retarget translation mode if legs bend but pelvis remains standing height.
4. Save level, close/reopen under serial lock and compare pose again; transient AnimInstance state alone is not a persistence guarantee.
5. Capture body+face at start and after 2 seconds PIE, verify no T-pose reset or detached face, chair contact and no floor penetration.

Audit only: no UE process, compile, model change, or commit performed by this investigator.
