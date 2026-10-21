# 主角三维建模：计划 / 完成情况 / 下一步（交接文档）

> Owner：Claude（人物模型）。世界画质由 Codex 负责，分工见 [../collab-3d.md](../collab-3d.md)。
> 用户要求：男女主和参考图**完全一致，不得打折扣**；**用代码建造所有细节，质量最高**（不用 MetaHuman，不买模型）。
> 最后更新：2026-10-21

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

## 5. 完成情况

| 项 | 状态 |
|----|------|
| 环境：Blender、MPFB、mediapipe、venv | ✅ |
| 男主 target 拟合，加侧面轮廓 | ✅ 正面 3.8 px，3/4 19 px，侧面 1.9 px |
| 男主 RBF 自由形变 | 🟡 已跑通（侧 2.2 px，正面下颌 3.1 px），但要逐项确认（见第 6 节第 1 步） |
| 照片投影到 MPFB 皮肤（`project_mpfb.py`） | 🟡 跑通，但会把刘海和衬衫投到皮肤上，要加遮罩 |
| 发丝头发 | ❌ 未开始。早期的 `hairgen.py` 原型在临时目录里，已丢失，需重写 |
| 衣服 / 绑定 / ARKit 表情 / GLB 导出 | ❌ |
| 女主 | ❌ 流程同男主，换参数和参考图 |
| 最新对比图 | `progress/male_fit_vs_ref.png`，上排是参考，下排是当前模型 |

## 6. 下一步（按顺序做）

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
