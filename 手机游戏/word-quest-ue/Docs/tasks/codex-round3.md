# Codex 任务书 · 第三轮：按真实课文重建单元（Claude 下发，2026-10-22）

背景：Web 客户端已退役，UE 是唯一客户端。用户要求把读写教程 3 的每个单元按**真实课文**重建：
- 一篇文章 = 多个场景；
- 课文里写到的地方都要建出来；
- 单词、练习都做成游戏交互。

分工如下。Claude 负责：
- 场景设计（`Docs/scenes/unitNN.md` + `Content/Data/memory/textbook_scenes/unitNN.json`）；
- 物件库（Blender 代码建模 → `Content/Memory/Props/` FBX）；
- 题目数据（`Content/Data/textbook/rw3/exercises/unitNN.json`）。

**Codex 负责引擎侧：C7 → C8 → C9。**

规则不变：
- 所有 UE 启动、导入、编译走 `Tools/run_ue_serial.sh`（`UE_LOCK_WHO=codex`），见 `Docs/tasks/ue-run-rules.md`；
- 不要改 Claude 的数据文件和场景设计文档；
- 进度写进 `Docs/tasks/STATUS.md` 的 Codex 一节；
- 不提交，等用户说。

视觉语言：沿用 2090 “MEMORY RECALL” 开场。近黑底 #04060B，冷光细线 rgba(184,209,213,0.28)，主文字 #ECEDE5，强调 #B8D1D5，暖色只用于“褪色/提醒” #FFD9B0，等宽字距大写小标签。不要 emoji，不要彩色胶囊按钮。

---

## C7 通用场景搭建脚本（最优先）

写 `Tools/build_textbook_scene.py`，读 `Content/Data/memory/textbook_scenes/unitNN.json`（schema 见下），每篇文章生成一张关卡 `/Game/Memory/Scenes/U{NN}/L_U{NN}_{A|B|C}`：

1. 每个场景（set）是一个布景，原点在 `origin`（米，UE 轴：X 右、Y 前、Z 上），布景之间相距约 60 m，四周是暗色记忆虚空（大雾 + 暗天穹）。
2. 物件：`props[].kit` 对应 `/Game/Memory/Props/SM_<kit>`。物件库还没到位时，用 BasicShapes 按 `size` 生成占位，并打 tag `placeholder`，之后能一键替换。
3. 每个物件打 tag：
   - `set:<sceneId>`；
   - `layer:then|now|always`（Text B 的覆写用）；
   - 有 `word` 字段的，再打 `word:<wordId>`。
4. 灯光：每个布景按 `light` 生成 DirectionalLight 或 RectLight + 点光，强度和颜色用 JSON 里的值。
   - 布景之间用 Lighting Channel 或光源半径隔离，不要串光。
5. 机位：`shots[]` → CineCameraActor，命名 `CAM_<sceneId>_<name>`。
6. 人物：`people[]` → 先放占位胶囊 + 名字文字，打 tag `actor:<role>`。之后由 Claude 换成 MetaHuman。
7. 幂等：重跑会清掉旧的生成物再建。

最后写 `Tools/check_textbook_scene.py`：检查每个 set 的物件数、机位、tag 都齐全，输出 `Docs/qa/textbook-scenes-unitNN.md`。

### textbook_scenes JSON schema（Claude 维护，Codex 只读）

```json
{
  "schema": "wordquest.textbook_scenes/1",
  "unit": 1,
  "articles": [{
    "section": "section_a", "level": "L_U01_A", "title": "Connection or Conversation",
    "scenes": [{
      "id": "u01a_s1", "title": "Offline day", "paragraphs": [1], "origin": [0, 0, 0],
      "light": {"type": "sun|interior", "dir": [-0.4, 0.3, -0.85], "color": "#FFD2A0", "intensity": 6.0, "sky": "#1A2433", "fill": 0.6},
      "props": [{"kit": "armchair", "pos": [-1.2, 0.4, 0], "yaw": 30, "scale": 1.0, "size": [0.9, 0.9, 1.0], "layer": "always", "word": "rw3_u01_scenario"}],
      "people": [{"role": "paul", "pos": [-1.2, 0.4, 0], "yaw": 30, "pose": "sit_read"}],
      "shots": [{"name": "wide", "pos": [0, -5, 1.6], "look": [0, 0, 0.9], "fov": 40}],
      "exercises": ["u01_a_understanding#1"],
      "transition": "dissolve"
    }]
  }]
}
```

## C8 记忆播放器（运行时，C++）

`UWordQuestMemoryDirector`（或放在 `WordQuestMemoryGameMode`）：

- 读同一份 JSON 和课文段落（`Content/Data/content/textbook_units.json`）。
- 按场景顺序推进：
  1. 相机切到该场景的机位；
  2. 英文字幕逐句播放（中文可开）；
  3. 句子提到的生词，让对应 `word:` 物件发光，并浮现单词卡。
- 场景切换做“记忆溶解”：后处理里画面化成光尘、渐黑，相机切到下一个 set，再凝聚。
- `layer:then` / `layer:now`：读到触发句时，then 物件用溶解材质参数淡出，now 物件淡入（材质参数 `MemoryReveal` 0→1）。
- `exercises` 字段：场景播完后冻结画面（时间膨胀 0 + 去饱和），弹出练习 UI（C9）。答对后继续。
- 手机竖屏和横屏都要能用：触屏点击推进，不出现 WASD 提示。

## C9 练习 UI（UMG，CG 风格）

数据：`Content/Data/textbook/rw3/exercises/unitNN.json`（schema 见 `../word-quest-game/docs/textbook-rebuild/pack-schema.md` 第 5 节）。

按 kind 实现这些交互组件：

| kind | 交互 |
|------|------|
| choice（understanding 带 options / text_b_mcq / reading_skills） | 细线选项，选中发冷光 |
| words_in_use / expressions_in_use | 句子空位，从浮在画面上的词库里选词填入，检查词形 |
| banked_cloze | 整段光洞短文，词库 15 词，填满后整段亮起 |
| word_building | 词根 + 词缀拼合 |
| collocation | 两列词用光线连线 |
| translation | 中文逐句显示，玩家输入英文，给出参考译文对照（不判死分） |
| critical / structure_writing / pre_reading | 开放作答，写进“笔记本”，不判分 |

验收：
- 单元 1 的每种 kind 至少能在编辑器 PIE 里完整作答一题；
- 截图放进 `Docs/qa/c9-exercises/`。

## 完成顺序

C7 先用 `unit01.json` 跑通 → C8 → C9。每完成一步：
1. 在 STATUS 写一条：做了什么、产物路径、验证方式；
2. 截一张关卡截图或 PIE 截图。

---

## 补充：画质一步到位（用户新要求，优先级最高）

用户要求：从一开始就达到《极限竞速：地平线 6》级别的画质，不做粗糙版本。标准见 `Docs/quality-bar.md`，必须遵守。对 C7 / C8 的影响：

1. **物件来源映射**。C7 不要把 `/Game/Memory/Props/SM_<kit>` 写死。
   - 读 `Content/Data/memory/kit_assets.json`（Claude 维护）：kit → 最终资产路径（Megascans / Fab 资产，或升级后的代码物件），附带缩放、旋转修正、材质覆盖。
   - 映射里没有的 kit，回退到 `SM_<kit>` 占位，并打 tag `needs_final_asset`。
   - `check_textbook_scene.py` 要统计每个布景的占位数，占位数 > 0 的布景标为“未达标”。
2. **每个布景的写实环境**：
   - Post Process Volume：手动曝光、电影色调、颗粒、暗角、景深；
   - 体积雾 + 光束；
   - 外景用 Sky Atmosphere + 体积云，或 HDRI；室内的窗外放真实景物。
   - 参数写成 JSON 里每个场景 `light` 的扩展字段：`exposure`、`fog`、`sky`、`grade`。Claude 会补到 unit01.json；没有的用合理默认值。
3. **渲染设置**：
   - 评估在本机（Apple Silicon / Metal）打开 Lumen 硬件光追和 MegaLights 是否可用、稳定，结论写进 STATUS；
   - Nanite 对所有导入网格开启。
4. **贴花与杂物**：C7 支持 JSON 的 `decals[]`（贴花材质路径、位置、尺寸）和 `clutter[]`（批量小物件，按区域随机散布，固定种子）。
5. **4K 截图**：check 脚本按每个机位出 4K 截图，放在 `Docs/qa/scenes/<sceneId>/`，供 Claude 评审。

C7 现有工作照常推进，以上作为 C7 的验收条件。

---

## C10 最终资产接入（Claude 交接，用户指定交给 Codex）

背景：用户已批准三个来源，并在 UE 里登录了 Fab：
- Poly Haven CC0 下载；
- 免费 Fab 资产（个人许可，每项都要登记）；
- 不购买付费资产。

Claude 已完成的部分：
- **Poly Haven**：`Tools/fetch_polyhaven.py` 正在把模型（glTF 2k）、贴图（2k）、HDRI（4k）下载到 `SourceArt/PolyHaven/`，清单写在 `MANIFEST.json`。完成后重跑一次，补齐失败项。
- **Fab**：在一个单独的暂存工程 `Saved/FabStaging/FabStaging.uproject` 里，已经通过 Fab 面板添加了 7 项，都在 `/Game/Fab/` 下：
  - Executive Office Chair、Generic Sedan Car、Conference Meeting Table and Chairs、Wooden Bookcases with Books；
  - Megascans White Book、Asphalt Fresh、Striped Asphalt。
  - 许可已登记到 `Docs/licenses/third-party-assets.md`：前四项 CC BY 4.0 或 Fab Personal，作者见资产页；Megascans 三项是 Fab 标准许可、免费。
- **映射**：`Content/Data/memory/kit_assets.json` 写了 kit → 来源。`source`：
  - `polyhaven` 并带 `polyhaven` 字段（33 个 kit）；
  - `fab`（待取）；
  - `code`（代码物件为最终版）；
  - `surface`。
  - 另有 `clutter_polyhaven`、`textures_polyhaven`、`hdris_polyhaven` 三个列表。

请 Codex 做：
1. **迁移 Fab 资产**：把 FabStaging 的 `Content/Fab/` 整个目录复制到主工程 `Content/Fab/`，保持 `/Game/Fab/...` 路径不变，引用才不会断。
   - 暂存工程编辑器还开着，复制前先在里面保存全部，或关掉它；
   - 在主工程里验证资产能正常加载；
   - 完成后把 kit_assets.json 里对应 kit 的 `asset` 填上：office_chair、car、board_table、library_shelf、book。
2. **导入 Poly Haven**：写 `Tools/import_polyhaven.py`。
   - glTF 用 Interchange 导入到 `/Game/PolyHaven/Models/<id>`，开启 Nanite，材质自动连好；
   - 贴图做成 `/Game/PolyHaven/Materials/MI_<id>` 材质实例（BaseColor / Normal / ARM），给墙、地、路面用；
   - HDRI 导入为 `/Game/PolyHaven/HDRI/<id>`（HDRI Backdrop 或 Sky Light 立方体贴图）。
   - 导入后把 kit_assets.json 里 `polyhaven` kit 的 `asset` 填成网格路径，并按真实尺寸给出 `scale` 修正（对照 unit01.json 里的 `size`）。
3. **再取 Fab 免费资产**（如果你能操作 UE 编辑器界面）：
   - 在 FabStaging 里打开“窗口 → Fab”，价格勾“免费”，Megascans 选“高质量”，许可选 Personal；
   - 补齐 kit_assets.json 里 `source: fab` 且 `asset` 为空的 kit，优先：显示器、键盘、耳机、落地灯、城市建筑 / 玻璃写字楼、车内饰、白板、书包、门、草地植物（Megascans 免费植物很多）、贴花（污渍 / 杯印 / 地面磨损）；
   - 每加一项，都要在 `Docs/licenses/third-party-assets.md` 记一行：资产、作者、许可、kit、路径、日期；
   - 只用免费许可；任何 $>0 的都不加。
4. **重建单元 1**：用 C7 脚本按 kit_assets.json 重建 L_U01_A/B/C。
   - 墙、地、路面换成扫描材质，每个布景按 `light` 选 HDRI；
   - 体积雾、PPV、贴花、杂物（clutter_polyhaven）都按 `Docs/quality-bar.md` 做；
   - 占位数降到 0，或者逐个列出剩下的。
5. **出图**：每个机位出 4K 截图，放在 `Docs/qa/scenes/<sceneId>/`。在 STATUS 写一条，Claude 来评审。

段落号已经按完整课文 `Content/Data/textbook/rw3/articles/unitNN.json` 修正过。C8 字幕请读这个文件，不要读旧的 textbook.json。
