# 后续计划（2090 回溯：我的大学）

分支：`memory-game`（工作树 `~/项目/.claude/worktrees/game-memory`），尚未合并 main。
开发服务器：在 `手机游戏/word-quest-game` 下运行 `PATH=$HOME/.local/node/bin:$PATH npx vite`；
试玩开关（仅开发环境）：`?memauto=1` 自动作答、`?memfast=1` 快速朗读、`?mempov=me|paper|watch` 指定起始视角。

## 已完成

| 提交 | 内容 |
|------|------|
| beacc25 | 设计文档（2090 回溯设定）+ M1 接口 |
| 9c04716 | M1a 回忆引擎：随英语朗读建世界、字幕、镜头、视角、触碰、二维笔记本 |
| 177f145 | M1b：2090 公寓开场 +《周四的沉默》完整可玩 + 两轮试玩修复 |
| f69cec8 | M1c 接口（视角切换、第一人称学习、导入教材） |
| f3a548c | M1c：他/我/纸 自由切换（默认第三人称）、第一人称真实上课、全文进回忆；526 个测试通过 |

## 2026-10-22 单元 5–6 六篇舞台（已完成）

- 新增 `stages/moonExhibit.ts`、`controlRoom.ts`、`astronautHall.ts`（单元 5）；
- 新增 `stages/bookstore.ts`、`bookExchange.ts`、`countyLibrary.ts`（单元 6）；
- 新增 `scripts/u05.ts`、`u06.ts`，注册进 `scripts/index.ts`；
- 场景清单：`docs/textbook-rebuild/scenes/unit05.md`、`unit06.md`；
- 18 篇文章全部有专属舞台与手写脚本；测试覆盖 18 篇引用校验和全部件显形。

## 2026-10-22 单元 4 三篇舞台（已完成）

- 新增 `stages/careerWorkshop.ts`（职业工作坊）、`violinWorkshop.ts`（小提琴作坊）、`embroideryWorkshop.ts`（苏州绣坊）；
- 新增 `scripts/u04.ts`（三篇开场/人物/舞台接入），已注册；
- 场景清单：`docs/textbook-rebuild/scenes/unit04.md`；
- 测试：unit4 引用校验 + 全部件覆盖；舞台测试含高铁窗外动画。

## 2026-10-22 单元 3 三篇舞台（已完成）

- 新增 `stages/travelLounge.ts`（旅店前厅）、`soloStation.ts`（夜晚站厅）、`highSpeedTrain.ts`（高铁车厢，窗外景观动画）；
- 新增 `scripts/u03.ts`（三篇开场/人物/舞台接入），已注册；
- 场景清单：`docs/textbook-rebuild/scenes/unit03.md`；
- 测试：unit3 引用校验 + 全部件覆盖；舞台测试覆盖 8 个新舞台。

## 2026-10-22 单元 2 三篇舞台（已完成）

- 新增 `stages/archiveExhibit.ts`（校史展厅）、`hepburnGallery.ts`（Hepburn 展厅）、`chartRoom.ts`（海图室）；
- 新增 `scripts/u02.ts`（A/B/C 三篇开场旁白 + 人物 + 舞台接入），注册进 `stages/index.ts` / `scripts/index.ts`；
- 场景清单：`docs/textbook-rebuild/scenes/unit02.md`；
- `autoScript` 改为把**所有**舞台部件均分到各幕，不再只建前 N 个；
- 测试：scripts.test 增加 unit2 引用校验 + 全部件覆盖；stages.test 覆盖 5 个新舞台。

## 2026-10-22 单元 1 三篇舞台（已完成）

- 新增 `stages/bedroomDawn.ts`（宿舍清晨）与 `stages/clinicRemote.ts`（山区诊室），注册进 `stages/index.ts`；
- 新增手写脚本 `scripts/u01b.ts`、`scripts/u01c.ts`，单元 1 的 A/B/C 三篇不再共用 emptyRoom；
- 场景清单：`docs/textbook-rebuild/scenes/unit01.md`（样板块，后续 unit02–06 按同一格式）；
- 测试：`src/features/memory/scripts/scripts.test.ts` 校验 B/C 的舞台引用；`stages.test.ts` 校验新舞台部件/摆放位/机位。

## 2026-10-22 场景方向调整（已完成）

- 双场景线：读写 3 = 文章实时演绎（回忆线）；CET 4/6 = 单词自由组合建造世界（新 `src/features/wordworld/`）。
- 读写 3 沉浸化：`mem-tech` 科技记忆质感（扫描线/冷光/边缘光词签）；默认纯英文字幕；自由触碰不弹完整词签。
- 入口：地图右下 ✦ 打开 `WORDWORLD · CET`（四级/六级切换，本机记录已建造世界数）。
- 设计文档：`docs/gdd-scene-modes.md`。

## 下一步（按顺序）

1. **试玩 M1c**（浏览器里还没看过）：三种视角各玩一遍 + 中途切换；重点看手机上讲义 / 笔记本尺寸、翻页动画、漫画格滤镜、四个选项是否超过屏幕 30%。修问题。
2. **导入我的教材**（`docs/api-memory-m1c.md` 第 5 节）：.txt / .docx / .pdf 导入，识别 Unit / Section A·B / Stories of China / 生词表，核对页，只存本机 IndexedDB。
3. **单元 1 的 B、C 手写回忆**：《床头的光》《山那边的诊室》（舞台 + 物件 + 附身对话）。
4. **单元 2–6 共 15 段手写回忆**（每单元一次提交），130 个词全部做成记忆物件。
5. **每单元专属二维玩法**（消息流排序、展板拼贴、车窗卷轴、绣绷、轨道中继、账本）。
6. **记忆匣**：重看电影、“这一幕的笔记还空着”、单词清晰度与间隔复习回流。
7. **整体验收**：手机竖屏、低画质帧率、`npm run build` 重建 dist、合并 main、推送。

## 关于教材原文

《大学英语读写教程 3（第四版·思政智慧版）》的课文和练习有版权，网上流传的电子版基本是未授权的，游戏又在 GitHub Pages 公开发布，所以不会从网上抓取原文放进游戏或仓库。
游戏现有的 18 篇文章是按教材各单元主题、标题和结构写的原创练习文本，词汇是教材单元词表。
想用原文学习：用学校发的电子教材 / 出版社官方平台购买的电子版，或纸质书拍照转文字，通过第 2 步的「导入我的教材」导入，只保存在你自己的浏览器里。
