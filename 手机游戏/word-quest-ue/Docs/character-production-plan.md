# 人物高精度制作方案（UE 5.8 + MetaHuman）

> 2026-10-21 · 负责人：Claude（人物三维）。Codex、DeepSeek Harness 按 [tasks/](tasks/) 中的任务书协作。
> 目标：每个角色达到 UE5 写实级别（MetaHuman 拓扑 + 发丝 Groom + 布料），主角和参考图完全一致。

## 1. 分工与目录所有权（不得互改对方的文件）

| 角色 | 负责 | 只能改的目录 |
|------|------|--------------|
| **Claude** | 所有人物的三维：脸型拟合、MetaHuman 身份、皮肤、发丝、眉毛和睫毛、服装、验收对比 | `Content/Characters/**`、`Docs/character-production-plan.md`、`Docs/tasks/**`、`../word-quest-game/docs/hero-pipeline/**`、Blender 脚本（`~/.local/share/hunyuan3d/work`） |
| **Codex** | 引擎侧：插件、Lookdev 关卡、对比相机、导入和装配自动化、角色蓝图、动画重定向、LOD 与性能、Three.js 客户端同步 | `Config/**`、`Source/**`、`Tools/ue_*.py`、`Content/Maps/**`、`Content/Blueprints/**`、`Content/Animation/**`、`../word-quest-game/src/**` |
| **DeepSeek Harness** | 数据、文档、验收工具：配角设定集、词汇 DataTable、关键点和剪影对比工具、QA 清单 | `Docs/characters/**`、`Docs/qa/**`、`Tools/data_*.py`、`Tools/qa/**`、`Content/Data/**` |

交接都写在 `Docs/tasks/STATUS.md`。每个人只追加自己那一节。

## 2. 角色表

两位主角以用户提供的参考图为准，服装以三视图为准，覆盖 `characters.ts` 里旧的服装设定。

| ID | 角色 | 身份来源 | 年龄 / 身高 | 发型 | 服装 | 难度 |
|----|------|----------|-------------|------|------|------|
| `me2026` | 男主（2026） | `~/Downloads/male_sheet.png`、`lian1/2/3/7` + 已完成的 MPFB 脸型拟合 | 20 岁 / 1.84 m | 黑色层次碎发：头顶蓬松、侧扫刘海、颈后收尖 | 白衬衫卷袖、黑西裤、黑皮鞋 | ★★★ |
| `lin` | 女主 | `female_sheet.png`、`lian5/6/8`（`lian7` 作 3/4 补充） | 20 岁 / 1.68 m | 酒红长直发 + 齐刘海 | 浅蓝 A 字连衣裙、银色高跟鞋、项链 | ★★★ |
| `old2090` | 男主（2090） | 由 me2026 的身份做年龄化（MetaHuman 年龄、皮肤、脂肪分布） | 84 岁 / 1.80 m | 稀疏后梳银发 | 开衫、长裤、皮鞋、金属圆框眼镜 | ★★ |
| `mei` | 同学 Mei | DeepSeek 写设定 → Claude 在 MetaHuman 参数空间中建脸 | 20 岁 | 高马尾、黑发、发夹 | 粉色卫衣、深色长裤、白鞋 | ★★ |
| `an` | 同学 An | 同上 | 20 岁 | 寸头、深棕 | 芥黄 T 恤、牛仔裤、帆布鞋 | ★★ |
| `rui` | 同学 Rui | 同上 | 20 岁 | 棕色微卷 | 蓝格衬衫、卡其裤、方框眼镜 | ★★ |
| `organizer` | 陈老师 | 同上 | 约 38 岁 | 低马尾 | 米色开衫、长裤 | ★★ |

## 3. 每个角色的制作流水线

1. **脸型**
   - 有参考图的角色：沿用 `fit_face.py` 的拟合结果（正面 3 px、3/4 视角 10 px、侧面轮廓 2 px），导出中性表情的头部网格（OBJ，1 单位 = 1 cm 换算由 Codex 的导入脚本统一）。
   - 没有参考图的配角：直接在 MetaHuman Character 里用参数和混合建脸，依据 DeepSeek 的设定集。
2. **MetaHuman 身份**：在 MetaHuman Character 编辑器里从模板网格拟合（conform from mesh），拿到 MetaHuman 拓扑、眼睛、牙齿、完整面部绑定。
   - ⚠️ 自动绑定和装配需要登录 **Epic 账号的云服务**，必须由**用户本人**登录。Claude 和 Codex 都不处理凭据。
3. **皮肤**：先用 MetaHuman 的皮肤合成做底，再叠加照片投影（`project_mpfb.py` 的方法换到 MetaHuman UV），得到痣、唇色、眉形等个人特征。
   - 去光照、色调匹配沿用现有脚本。
   - 法线和粗糙度用 MetaHuman 自带的。
4. **发丝**
   - 在 Blender 里用代码生成引导线，插值出 6–12 万根发丝，导出 Alembic Groom（含 `groom_width`、`groom_root_uv`、guide 标记）。
   - 导入 UE 成为 Groom 资产，绑定到 MetaHuman 头部，再自动生成发片 LOD 给远景和移动端用。
   - Groom 的发丝渲染替代现在 GLB 里的发片（`hair_cards2` 渲染出现了倒退：发尖碎片化，已作废）。
5. **眉毛和睫毛**：浓黑直眉是男主的关键特征，用代码生成的眉毛 Groom，睫毛用 MetaHuman 自带的 Groom 调密度和颜色。
6. **服装**
   - 用 MetaHuman 的身体导出到 Blender，`clothes.py` 用代码建衣服、蒙皮到 MetaHuman 骨骼。
   - 衬衫下摆、裙摆用 Chaos Cloth。
   - 鞋和饰品是静态网格挂点。
7. **表情**：MetaHuman 面部绑定 + Live Link，ARKit 52 个表情；游戏里至少要用 `eyeBlinkLeft/Right`、`jawOpen`、`mouthSmileLeft/Right`、`browInnerUp`。
8. **验收**（见第 4 节）通过后，在 `Docs/tasks/STATUS.md` 登记交付。

## 4. 验收标准（每个主角都要过）

| 项 | 标准 |
|----|------|
| 正面关键点 | 1024 px 渲染上，MediaPipe 468 点平均误差 ≤ 3 px |
| 侧面轮廓 | 侧面剪影和参考图的 IoU ≥ 0.95（只算脸部，排除头发） |
| 3/4 视角 | 头部姿态对齐后，关键点平均误差 ≤ 8 px |
| 并排对比 | 在 UE Lookdev 关卡里，用和参考图相同的机位和布光（Codex 的对比相机）渲染正面 / 3/4 / 侧面 / 背面 / 脸部特写，和参考图并排检查 |
| 发型 | 轮廓和参考图的头发剪影 IoU ≥ 0.85；不能看到发片的边缘或碎片 |
| 性能 | 1440p、Lumen 下单个英雄 LOD0 ≤ 2.5 ms GPU；远处自动切换到发片 LOD |

对比工具由 DeepSeek 实现（`Tools/qa/`），Claude 使用并判断。

## 5. 顺序

1. **M-C1**（Claude）：男主脸型导出 → MetaHuman 拟合 → 眉毛和发丝 Groom。等 Codex 的 Lookdev 关卡就绪后做第一次对比。
2. **M-C2**：男主服装和皮肤细节 → 全身验收 → 交付 `Content/Characters/me2026`。
3. **M-C3**：女主。拟合流程同男主，`fit_face.py -- female`。
4. **M-C4**：由男主派生 old2090。
5. **M-C5**：四个配角（拿到 DeepSeek 的设定集后）。

## 6. 风险

- **Epic 云绑定**需要用户登录，没登录前只能做到 MetaHuman 的未绑定身份。
- **磁盘**约剩 46 GB，Groom 和 DDC 增长快。DerivedDataCache 定期清理，不进 git。
- **网页版**：Three.js 客户端继续使用 `public/models/heroes/*.glb`。MetaHuman 是否能导出到网页端，要先确认当前许可条款再决定；在确认之前，网页版维持发片 GLB 方案。
