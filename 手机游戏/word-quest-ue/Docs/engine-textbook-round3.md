# C7–C10 教材场景引擎与最终资产接入

## 产品需求说明书
一篇真实课文一张地图，多个独立记忆布景；段落字幕、生词物件、过去/现在覆写与练习断片形成完整学习流程。沿用近黑底、冷光细线和等宽标签。支持鼠标与触屏、横竖屏。不修改 Claude 的教材、场景设计及题目文件。不提交、不推送。

C10 将已批准的 Fab 与 Poly Haven 资产接入正式工程，保持 Fab `/Game/Fab/...` 路径，Poly Haven 来源限本地 CC0 清单；根据 kit 映射替换单元 1 用到的占位，缺少的几何、贴花或布景杂物逐项留在质量报告中，不伪报最终画质通过。Fab 仅取免费且允许的 Personal 资产，不购买、不绕过登录或验证码。

## 接口文档
输入：`wordquest.textbook_scenes/1`（米，UE XYZ）、教材 `textbook_units.json`、`rw3-pack/1` 练习列表。生成 `/Game/Memory/Scenes/U{NN}/L_U{NN}_{A|B|C}`。生成 Actor 以 `textbook_generated` 标记，重跑只替换生成物；保留人工布景。物件有 set/layer/prop/kit/word 标签；缺失库资源有 placeholder 标签。占位体 size 是米，真实物件使用原始网格尺寸乘 scale。sun 使用局部 RectLight 模拟方向光，以半径隔离，避免所有场景共享 DirectionalLight；光强为 JSON 艺术单位映射到本地光流明（主光×900、补光×350）。

运行 `python3 Tools/build_textbook_scene.py --unit 1`；物件库到位后 `--replace-placeholders` 重建生成物。`python3 Tools/check_textbook_scene.py --unit 1` 检查关卡并输出报告和截图。所有编辑器与编译自动通过共享锁。

## 测试
纯 Python schema/坐标/标签测试；完整编辑器生成与重跑检查；运行时 PIE 场景推进、练习冻结与恢复、各种 kind 作答与截图。Claude 数据未到位时只使用 Saved 下的明确标记测试夹具，不覆盖正式数据。


### 画质补充接口
- 只读 `Content/Data/memory/kit_assets.json` 的 `kits`：`asset`（空路径计未交付）、`scale`（标量或 XYZ）、`yaw_offset` / `rotation`（pitch/yaw/roll 度）、`materials`（材质槽索引/名称到路径，也兼容数组）。没有映射时 fallback SM_kit 并加 needs_final_asset，不能算最终成品。
- `decals[]`: `{material, pos:[x,y,z], size:[depth,width,height], rotation:[pitch,yaw,roll]}`，米；缺材质标 needs_final_asset。
- `clutter[]`: `{kit,count,seed,region:{min:[x,y,z],max:[x,y,z]},size,scale,layer}`；种子固定、不会改源 JSON；每项拥有相同 prop 标签和额外 clutter 标签。
- C10 导入后若正式场景 JSON 没有作者填写的 clutter，搭建器可从 `clutter_imported` 的 CC0 小物件清单为桌面/柜台确定性补充摆件（每布景最多 8 件）；按承托面尺寸定位并补偿网格枢轴，不写回 Claude 的场景 JSON。原始剧情 prop 的 `prop:<index>` 校验与这些补充摆件分开。
- `light.exposure` 数字为固定曝光补偿；对象支持 compensation；默认 -3 EV 补偿（关闭相机物理曝光，以保持局部光单位稳定）。`light.fog.density` 为 LocalFogVolume 径向消光；`light.sky` 可为原十六进制补光色或 `{color}`；`grade` 支持 grain、vignette、chromatic_aberration。每 set 的 PPV / 大气 / 云在播放和截图时只激活当前 set，避免跨布景污染。
- Text B 的非最终占位材质使用独立的 MemoryReveal 噪声遮罩母材质，不改原 Props 材质；正式 PBR 材质必须由资产方保留贴图并接入 MemoryReveal，不对扫描材质做纯色替换。
- 所有 /Game 导入网格启用 Nanite，不修改 /Engine 基础形体；景深使用实际 filmback/focal length/aperture 和目标距离，截图启用持久 TAA 历史。
- `check_textbook_scene.py` 输出 `Docs/qa/scenes/<sceneId>/<shot>.png`（3840×2160）及每 set FAIL / REVIEW_REQUIRED 报告。捕获完成标记不等于质量 PASS；最终截图由 Claude 人工评审。
- Runtime 未过 needs_final_asset 门槛时不进入粗糙场景。`WQ_TEXTBOOK_ENGINE_QA=1` 仅用于独立引擎联调截图，不能作为最终画质证明。

### C8 / C9 运行时接口
- MemoryGameMode 默认创建 UWordQuestMemoryDirector，地图名 L_U{NN}_{A/B/C} 决定单元/篇章；场景/练习读取 JSON，字幕从 `Content/Data/textbook/rw3/articles/unitNN.json` 按 `section` 和段落序号取全文，词汇仍取 `textbook_units.json`，不依赖退役 Web。
- Advance / SetChineseEnabled / OpenExercise(ref) / ExerciseCompleted；ref 支持 id、id#n、id#n-m。缺失课文段落或题目明确报告并停住，不静默跳过。
- 中文译文当前源数据未提供，开关会明确显示缺少译文，不生成伪译文。
- 练习实际暂停世界（SetGamePaused），Slate 保持触摸/鼠标响应，答对/保存开放回答后恢复；练习 PP 去饱和，返回时恢复。
- PIE 自动化中的记忆/练习界面证据由 `FWidgetRenderer` 以 1280×720 离屏导出，避免 macOS 无头窗口不执行 `FScreenshotRequest`；横竖屏响应截图分别为 1280×720 / 450×900。3D 世界机位由 C7 SceneCapture 单独输出 3840×2160。
- 选择题匹配下标；填空匹配词形；banked_cloze 全部空位一起校验；构词支持根/缀拼合；collocation 将题库给定搭配转成两列候选；翻译按中文句子推进，只保存并对照参考，不判死分。无 options 的理解问答同样保存对照，不要求逐字复述。
- Notebook 写入 Saved/Player/Notebook.json，临时文件替换；保存失败不放行练习。截图 QA 会留下明确的测试回答，发布验收前清理测试存档。

### C10 资产导入接口
- Fab 暂存目录 `Saved/FabStaging/Content/Fab/` 整体复制到 `Content/Fab/`，映射保持 `/Game/Fab/...`；复制前关闭并保存暂存工程，复制后文件数与 SHA256 一致，并由主工程编辑器加载关键网格/材质验证。
- `SourceArt/PolyHaven/MANIFEST.json` 是导入清单，源路径相对工程根目录；模型（glTF/FBX）导入 `/Game/PolyHaven/Models/<id>`，PBR 贴图导入 `/Game/PolyHaven/Textures/<id>` 并生成 `/Game/PolyHaven/Materials/<id>/MI_<id>`，HDRI 导入 `/Game/PolyHaven/HDRI`。脚本 `Tools/import_polyhaven.py [--types models,textures,hdris]` 走完整 UE 编辑器与 `run_ue_serial.sh`，不会启动 commandlet/nullrhi；支持 `--validate-only` 无 UE 来源/映射预检。
- Interchange 导入的静态网格逐项启用 Nanite；透明材质不支持时保留原材质并显式报告。能导成 TextureCube 的 HDRI 才直接用于 SkyLight；UE 5.8 将 `urban_street_01` 留作 Texture2D 时，源图保留、日间 SkyLight 映射回退到 `urban_courtyard` TextureCube，并写入报告警告。`kit_assets.json` 是 kit 几何与材质覆盖运行接口；墙、地面、道路材质角色由确定性表映射到 CC0 PBR 材质实例。许可证、作者、kit、资产路径记录在 `Docs/licenses/third-party-assets.md`。

## C10 测试与验收
- 本地静态测试：MANIFEST 所有源文件存在且符合类型；所有 Poly Haven kit 与 clutter 引用均在模型清单中；贴图 / HDRI 映射 id 都在对应 manifest 类别内；桌面补充摆件位置确定、落在承托面上；Fab 迁移源与目标文件清单、哈希完全一致。
- 编辑器集成测试：通过 `Tools/run_ue_serial.sh` 导入后，日志 `WQ_POLYHAVEN_IMPORT_PASS`，report 中每个模型有 StaticMesh 路径和 Nanite 结果、每套贴图具有 BaseColor/Normal/ARM；TextureCube HDRI 与 2D 回退有显式记录；导入资产可重载且保存。
- 场景验收：C7 重建 L_U01_A/B/C 后由 checker 为 33 个机位生成 3840×2160 PNG；JSON 按 set 列出 `unmapped_kits`、needs_final_asset、PPV / 雾 / 天空、decals（每 set 至少 10 个）、clutter 和透明材质 Nanite 例外。任何未完成项均写入 STATUS 与 QA 报告，不能把 4K 截图存在当作视觉通过。
- C8/C9：串行编译成功后执行完整 PIE；报告中的正文段落推进必须对齐文章 JSON，练习 kind / 冻结恢复 / 横竖屏截图全部来自同一 fresh run。
