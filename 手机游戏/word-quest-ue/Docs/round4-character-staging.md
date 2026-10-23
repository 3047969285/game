# C14 人物入场

## 产品需求说明书

教材布景使用已装配 MetaHuman BP；未完成 auto-rig 时，使用同一 MHC 的静态预览姿态快照，并标记 `needs_rig`。禁止把 Source body 或胶囊伪装成 MHC。角色原资产、脸、头发、服装不修改。现有 Groom 作为静态未绑定预览复用，绑定缺失明确记为 `needs_groom_binding`。无法解析到角色的教材人物保留故事 role，并用确定性的演员替身标记 `cast_standin`，不能算人物最终验收。

## 接口文档

`Tools/textbook_character_staging.py` 提供 `stage_people(unreal, eas, scene, world_cm, tags=None, strict=True)`，返回 actor 与报告。调用前关卡已加载，调用后由搭建器保存；模块不启动 UE、不退出、不保存作者资产。

优先 `/Game/Blueprints/Characters/BP_<id>`（排除 WordQuestAnimationPreview archetype），其次 `/Game/Characters/<id>/MHC_<id>`。MHC 用 `try_add_object_to_edit` / `spawn_meta_human_actor(character, True)`，在 `finally` 里 `remove_object_to_edit`。引擎源码说明 remove 会销毁已注册预览 actor，且 preview mesh 为 transient，因此必须在释放前复制为 `/Game/Memory/Characters/<id>/<sourceHash>/` 的独立网格/骨骼/材质/纹理快照，再用独立 SkeletalMeshActor 装配；不直接保存编辑器预览 actor。

角色根 actor 标签：`textbook_generated`、`set:<setId>`、`actor:<storyRole>`、`character:<id>`、`layer:<layer>`、`pose:<requestedPose>`、`source:MHC_snapshot|BP`、`memory_speaker`。身体子 actor 用 `character_part:<componentName>`，不重复 `actor:`。脸部带 `memory_face`；运行时可从 root 的 attached actors 获取脸部 SkeletalMeshComponent。未支持的 pose 追加 `needs_pose:<pose>`；头部朝向、眨眼由运行时对 face mesh 的骨骼/现有 morph 执行，模块不改骨架。

Groom 用独立持久 GroomActor 附着角色 root，复用 Imported groom/brows 和现有材质。因尚未 rig，使用同空间静态发丝，不保存指向 transient FaceMesh 的绑定。`needs_groom_binding` 是明确交付缺口。

## 测试

- 纯 Python：角色白名单、主角/教材别名、确定性的替身分配、不误把故事身份标记成正式演员、标签唯一性、源资产摘要及哈希路径、编辑会话释放异常路径。
- 主智能体验证：锁内完整 UE editor 构建后保存/重开，截图核对 MHC、皮肤、头发、朝向/脚底、源 MHC 文件哈希不变。每个 actor 的 `needs_rig` / `needs_pose` / `cast_standin` 计入质量报告，不能因为有网格就 PASS。

## 限制

本模块不自动登录 Epic，不执行 auto-rig，不伪造坐姿。坐姿、服装/儿童/宇航员等精确身份未交付时明确保留缺口。静态快照仅用于待 rig 的可保存预览；完整 facial animation 和 skin binding 仍需装配资产。

## 验证记录

2026-10-23：`python3 -m unittest discover -s Tools -p test_textbook_character_staging.py -v`：9 passed；`py_compile` 通过；本次文件 `git diff --check` 无空白错误。覆盖编辑会话异常释放、未取得所有权不释放、演员替身可追溯、源资产哈希、静态依赖不保存/不改写、transient 依赖使用清标记 helper 和缓存。尚未启动 UE 或编译，实际 snapshot 保存/重开/渲染验证由主流程串行执行。

辅助库 `WordQuestCharacterStagingLibrary` 的 editor 依赖是 `AssetRegistry`（由主流程添加）；`DuplicatePreviewAsset` 只允许写入 `/Game/Memory/Characters/`，清掉复制对象及其 owned subobjects 的 transient 标记，注册新资产但不提前保存。Python 在外部 transient 依赖（皮肤纹理、材质、Skeleton、PhysicsAsset、DNA）替换完成后保存。组件模板记录在 `Saved/Textbook/characters/<id>-<sourceHash>.json`，重复布景复用同一角色快照，避免重新打开同一 MHC 数百次。
