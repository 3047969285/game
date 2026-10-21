# 主角三维建模：计划 / 完成情况 / 下一步（交接文档）

> Owner：Claude（人物模型）。世界画质由 Codex 负责，分工见 [../collab-3d.md](../collab-3d.md)。
> 用户要求：男女主和参考图**完全一致，不得打折扣**；**用代码建造所有细节，质量最高**（不用 MetaHuman，不买模型）。
> 最后更新：2026-10-21（男主：脸型、皮肤投影、发片头发初版已完成）

## 1. 参考图（用户提供，位于 `~/Downloads/`）

| 角色 | 三视图 | 脸部图 |
|------|--------|--------|
| 男主 me2026 | `male_sheet.png` | lian1 正面，lian2 / lian7 侧面，lian3 3/4 |
| 女主 lin | `female_sheet.png` | lian5 正面，lian6 3/4，lian8 侧面（lian7 也作 3/4 用） |

外观要点：
- 男主：黑色碎发、侧扫刘海；白衬衫卷袖；黑裤；黑鞋。
- 女主：酒红色长直发、齐刘海；浅蓝 A 字连衣裙；银色高跟鞋；项链。

## 2. 环境（本机，已装好）

- Blender 4.5.14 LTS：`/Applications/Blender.app/Contents/MacOS/Blender`
- MPFB 扩展（MakeHuman CC0 资产）：`~/Library/Application Support/Blender/4.5/extensions/user_default/mpfb`
- Python venv：`~/.local/share/hunyuan3d/.venv`
  - 装有 numpy、scipy、PIL、torch(MPS)
  - mediapipe 固定 **0.10.21**，1.x 版本没有 `solutions`
- 工作目录：`~/.local/share/hunyuan3d/work/`
  - `headviews/`：裁好的脸部参考图 `{who}_front/left/right/q34/q34r/back.png`
  - `views/`：三视图裁切
  - `fit/`：当前方案的输出
- 本目录 `scripts/` 是工作目录脚本的**备份**，运行时用工作目录里的版本。改完要同步回来。

## 3. 路线演变（为什么是现在这个方案）

1. Rocketbox 换装 + 脸部雕刻 → 用户：“不像”。
2. Hunyuan3D-2mv 生成网格 + 照片投影 → 用户：“橡胶人物 / 垃圾”。生成网格表面糊，头发是面条状。**已放弃。**
3. **当前方案：MPFB 参数化人体，用代码拟合照片，再加自由形变。**
   - 拓扑干净，自带 UV、骨骼和表情基础。
   - 后续再用代码生成发丝、皮肤材质和衣服。

## 4. 当前流水线

```bash
cd ~/.local/share/hunyuan3d/work
# ① 脸型拟合：290 个 MPFB 脸部 target + 侧面轮廓 ICP + RBF 自由形变（自动调用 refine_solve.py）
/Applications/Blender.app/Contents/MacOS/Blender -b -P fit_face.py -- male fit headviews/male_front.png headviews/male_q34.png
#    环境变量（都可选）：
#      YAWS=40         只试一个 3/4 角度，调参时加快
#      REFINE=0        关闭自由形变
#      PROFILE_W / PROFILE_ROWS   侧面轮廓的权重 / 参与拟合的行范围
#    输出：fit/male_fit.blend、male_fit.json、male_fit_{front,q34,side}.png、male_profile_dbg_40.json
# ② 照片投影到皮肤贴图
/Applications/Blender.app/Contents/MacOS/Blender -b fit/male_fit.blend -P project_mpfb.py -- male fit headviews
# 调试：侧面轮廓叠加图
~/.local/share/hunyuan3d/.venv/bin/python profile_overlay.py headviews/male_left.png fit/male_profile_dbg_40.json out.png
```

### `fit_face.py` 关键点

- **人体与锚点**
  - 用 `HumanService.create_human(MACRO)` 生成人体。注意：模型身高约 2.1 m，导出时要缩放到 1.84 / 1.68 m。
  - 468 个 MediaPipe 关键点用射线投射到网格，得到重心坐标锚点。
  - **只用 `body` 顶点组**：其余都是辅助几何（睫毛、牙齿、tights、joint cubes）。之前误用它们，侧面轮廓全错。
- **目标基与求解**
  - 290 个 target 构成线性基，用投影 Gauss-Seidel 求解，权重约束在 [0, 1]。
  - incr/decr 成对的 target 互斥惩罚。
  - 眉毛以上的关键点权重为 0：在照片里被刘海挡住，MediaPipe 只是猜的。
- **侧面轮廓**
  - 侧面照取每行最左的皮肤像素，作为轮廓；模型取每个高度分箱最靠前的顶点，二者做点到线 ICP。
  - 比例尺来自侧面照的 MediaPipe 关键点 9 和 152。
  - 结果：侧面轮廓误差 1.9 px，正面关键点 3.8 px。
- **`refine_solve.py`（venv 里跑）**
  - 420 个控制点的高斯 RBF 空间形变：所有顶点都跟随同一个平滑场，口腔和眼部辅助几何不会穿模。
  - 约束：
    - 正面与 3/4 关键点（去掉眼睑、内唇、额头的点）
    - 侧面轮廓 ICP
    - 正面下颌轮廓 ICP
    - 下颈部钉住
    - 弱的“保持原位”先验
  - 结果写回为 shape key `refine`，然后 `HumanService.refit` 让眼球等跟随。

## 4b. 完整重跑顺序（2026-10-21 最新）

```bash
cd ~/.local/share/hunyuan3d/work
B=/Applications/Blender.app/Contents/MacOS/Blender
$B -b -P fit_face.py -- male fit headviews/male_front.png headviews/male_q34.png
$B -b fit/male_fit.blend      -P project_mpfb.py -- male fit headviews
$B -b fit/male_textured.blend -P hair_cards.py   -- male fit
KEY=70 AMB=0.22 $B -b fit/male_hair.blend -P lookdev.py -- male fit headviews
```

- **`fit_face.py`**（约 10 分钟）：拟合脸型。
  - 3/4 视角做头部姿态（yaw/pitch/roll）坐标下降搜索，男主最佳约 (37, 3~6, -8)。
  - 左右对称的 target 合并为一个变量。
  - 不用 ears / forehead 区的 target：这两处没有关键点，拟合只会产生噪声。
  - 宏参数可用环境变量调：`WEIGHT=0.26`、`MUSCLE=0.68`。
  - 输出：`fit/{who}_fit.blend`、`{who}_fit.json`（含 `pose_q34`）、`{who}_lm3d.json`（拟合后 468 个点的 3D 坐标，后续步骤都要用）。
- **`project_mpfb.py`**：照片投影到皮肤贴图。
  - 遮罩：用肤色色度判断（r−b），去掉头发、衬衫和背景；保护眉、眼、唇。
  - 软置信度：发丝边缘降低权重。
  - 去光照。
  - 补洞：未投影的区域用原皮肤贴图的细节，但套上照片的局部色调（三线性体素场）。
  - 额头（刘海下）和脖子（领口阴影）不用投影，改用补洞结果。
  - 头皮刷成发根深色，发际线处烘焙头发遮挡阴影（AO）。
  - 输出：`fit/{who}_textured.blend`。
- **`hair_cards.py`**：用代码生成发片头发，规则在 `hairline.py`。
  - 发际线规则是共享的。
  - 发流：以发旋 WHORL 为中心向外梳，前额区向前扫，两侧和后脑受重力下垂。
  - 4 层发片：头皮覆盖层、内层、中层、外层。外两层向 89 个发簇 leader 聚拢，形成成束的发尖。
  - 法线做体积化（55% 球面 + 45% 发片自身），每片发片随机色调。
  - 发丝 atlas 用 numpy 绘制，4 种变体。
  - 输出：`fit/{who}_hair.blend` 和 `{who}_hair_atlas.png`，约 2600 片、5.6 万个四边形。
- **`lookdev.py`**：设材质（皮肤哑光 SSS、湿润的眼睛、深色虹膜）、三点布光、透明背景，渲染正面 / 3/4 / 侧面 / 背面。
  - `scripts/compare_sheet.sh` 把渲染和参考图拼成对比图。

## 5. 完成情况

| 项 | 状态 |
|----|------|
| 环境：Blender、MPFB、mediapipe、venv | ✅ |
| 男主 target 拟合，加侧面轮廓 | ✅ 正面 3.8 px，3/4 19 px，侧面 1.9 px |
| 男主 RBF 自由形变 | ✅ 头顶不再被压扁，眼睑和口腔不穿模 |
| 3/4 头部姿态 | ✅ 3/4 关键点误差 20 px → 10 px |
| 照片投影到皮肤 | ✅ 头发 / 衬衫遮罩、去光照、色调匹配补洞、头皮着色、发际线 AO。脸已经像参考图（见 `progress/male_skin_vs_ref.png`） |
| 发片头发（男） | 🟡 侧面和后脑已像短碎发，刘海有尖。还剩三个问题：头顶轮廓有碎片感（发旋附近）、前额上方显得像头盔、高光层次不够。见 `progress/male_look_vs_ref.png` |
| 皮肤 / 眼睛材质 | 🟡 有了初版（`lookdev.py`）。皮肤偏白偏粉，肩部贴图有一道接缝竖线 |
| 衣服 / 绑定 / ARKit 表情 / GLB 导出 | ❌ |
| 女主 | ❌ 流程同男主，换参数和参考图 |
| 最新对比图 | `progress/male_fit_vs_ref.png`，上排是参考，下排是当前模型 |

## 6. 下一步（按顺序做）

**接着做（2026-10-21 停在这里）：**

1. **头发**（`hair_cards.py`）
   - 头顶碎片：发旋附近的发片太短、方向乱。可以把 WHORL 再往后下移，或者让头顶区域只用长的外层发片。
   - 前额上方“头盔”感：内层发片在正面太均匀。可以减少前额区内层的数量，加强发簇间的缝隙，并在 atlas 里画出明显的高光带。
   - 加几根“飞丝”。
   - 头发要能导出到 glTF：法线和顶点色 `tint` 要带进 GLB。three.js 端用 alphaTest / alphaToCoverage。
2. **皮肤**
   - `lookdev` 里皮肤偏白，可在 `project_mpfb` 的 glob 色调后乘 0.92，并降低 SSS。
   - 修肩部接缝：查 `base_px * glob` 是否在 UV 岛边界造成色差。
   - 眉心（额头中间）有一小块发丝残影，扩大那里的遮罩。
3. **眉毛 / 睫毛**：加 MPFB 的 eyebrows / eyelashes 资产，或用代码做眉毛卡片。眉毛浓黑是这张脸的重要特征。
4. 之后继续下面原来的第 3 步以后的内容（衣服、骨骼、导出、女主）。

1. **检查形变结果**：看 `fit/male_fit_{front,q34,side}.png`。
   - 头顶 / 额头不能被压扁，下颌要更窄更利落。
   - 可调 `refine_solve.py` 里的 `W_STAY / W_SIL / SIGMA`。
   - 宏参数可以试 `weight 0.30, muscle 0.65`，让人更瘦。
2. **皮肤投影加遮罩**：
   - 照片里的头发（暗色、低饱和）和衬衫（白色）不投影。
   - 额头发际线以上用皮肤贴图补。
   - 再加去光照（delight），减掉照片里的高光和阴影。
3. **头发**：用代码生成发丝，Blender curves 按 comb field 长出来，加碰撞、成簇，最后烘焙成发片卡。
   - 男主：黑色层次碎发，侧扫刘海，耳后和后颈较短，对照 lian1/2/3/7。
   - 女主：酒红长直发，齐刘海。
   - 用 alpha 卡片 + 各向异性高光材质。
4. **皮肤材质**：SSS、毛孔法线（程序化噪声烘焙）、粗糙度分区。眉毛和睫毛用卡片。
5. **衣服**：按三视图做。
   - 男主：白衬衫卷袖、黑裤、黑鞋。
   - 女主：浅蓝 A 字裙、银色高跟鞋、项链。
   - 方法：MPFB 自带服装改型，或用代码建模后 shrinkwrap。
6. **骨骼与表情**：
   - 骨骼名重命名为 Rocketbox 的名字（见 collab-3d.md 交付约定）。
   - ARKit morph 名：`eyeBlinkLeft/Right`、`jawOpen`、`mouthSmileLeft/Right`、`browInnerUp`。可用 MPFB 的 FaceService 面部单元生成。
7. **导出**：`public/models/heroes/me2026.glb` 和 `lin.glb`。
   - 不超过 60k 三角形，Y 轴朝上，面朝 +Z，脚底在 y = 0。
   - 附正面 / 侧面 / 背面 / 脸部特写与参考图的并排对比。
   - 在 collab-3d.md 的“交付记录”里登记。
8. 女主重复第 1–7 步（`fit_face.py -- female ...`，MACRO 已有 female 配置）。

## 7. 注意事项

- 只在完成并和参考图并排对比后再给用户看。用户对半成品反应很差。
- 不要动主仓库 `~/项目/game` 的未提交改动，所有工作都在 worktree 里做。
- `src/`、`tools/`、`dist/` 归 Codex 管，Claude 只改 `public/models/heroes/`、`docs/collab-3d.md`、`docs/hero-pipeline/`。

## 7. 转入 UE 5.8 + MetaHuman（2026-10-21 起）

- 总方案：`../word-quest-ue/Docs/character-production-plan.md`
- 分工任务书：`word-quest-ue/Docs/tasks/`
  - `codex-character-engine.md`：Codex 负责引擎侧
  - `deepseek-data-qa.md`：DeepSeek 负责设定集、数据和验收工具
  - `STATUS.md`：协作状态
- Claude 继续负责所有人物的三维。
- `scripts/export_metahuman_input.py` 把拟合好的中性网格导出为 MetaHuman 拟合用的输入，男主已导出到 `export/me2026/`：
  - `male_head.obj`
  - `male_body.fbx`
  - `male_landmarks.json`
  - `male_skin_face.png`
- 下一步：
  1. UE 里用 MetaHuman Character 从这个网格做拟合（自动绑定需要用户登录 Epic 账号）。
  2. 用代码生成发丝 Groom（Blender 曲线 → Alembic），替代 `hair_cards2`。`hair_cards2` 的渲染出现倒退，已作废。
  3. 代码生成眉毛 Groom。
  4. 衣服改为基于 MetaHuman 身体来做。

### 7.1 UE / MetaHuman 流水线（已跑通）

```bash
cd ~/.local/share/hunyuan3d/work; B=/Applications/Blender.app/Contents/MacOS/Blender
E=~/项目/.claude/worktrees/game-memory/手机游戏/word-quest-game/docs/hero-pipeline/export/<id>
$B -b fit/<who>_fit.blend -P export_metahuman_input.py -- <who> $E          # 中性 body.fbx / head.obj / 3D 关键点
$B -b fit/<who>_textured.blend -P render_portrait.py -- <who> $E            # 已知相机的正面像（CLAY=1 出灰模版）
EXPORT_GUIDES=fit/<who>_guides.pkl $B -b fit/<who>_textured.blend -P hair_cards.py -- <who> fit   # 发簇引导
$B -b fit/<who>_textured.blend -P groom_strands.py -- <who> fit $E          # 发丝 Groom（Alembic）
$B -b fit/<who>_textured.blend -P groom_brows.py -- <who> fit $E            # 眉毛 Groom（Alembic）
# UE：MetaHuman 拟合（要在完整编辑器里跑；commandlet 模式会崩在 Slate）
CHAR_ID=<id> CHAR_WHO=<who> CHAR_QUIT=1 UnrealEditor WordQuestUE.uproject -ExecutePythonScript=Tools/char_conform_metahuman.py
```

- 男主 me2026：
  - 已拟合，生成 `/Game/Characters/me2026/MHC_me2026` 和 `export/me2026/metahuman/me2026_PosedDNA.dna`。
  - 发丝 102,928 根，眉毛 2,141 根。
- 女主：`hair_cards.py` 新增长直发模式（中分、空气刘海到眼睛、发长约 52 cm），用 `LONG = WHO == "female"` 开关。
- 用户要做的两件事：
  1. 安装 MetaHuman Creator Core Data（Optional Content）。装好后才能用皮肤纹理合成。
  2. 在 UE 里登录 Epic 账号，用于 auto-rig；导出几何体也要先完成 auto-rig。
