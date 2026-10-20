# 接口文档：M1 回忆引擎 + 垂直切片

对应 GDD：`docs/gdd-memory-game.md`（先读第 1、2、5、7 节）。

M1 分两步交付：

- **M1a 引擎**：`src/features/memory/` 全部通用模块 + App 接入 + 一段由数据自动生成的“最小回忆”能从头跑到尾。
- **M1b 内容**：2090 年公寓开场 + 单元 1 回忆 A《周四的沉默》的手写舞台布置、物件、附身选择、旧笔记本。

---

## 1. 运行方式

- 回忆在独立的全屏层里运行：`MemoryStage` 有自己的 `THREE.Scene`、相机和渲染管线（新建一个 WebGLRenderer + canvas，覆盖在页面最上层）。
  进入回忆时 App 暂停 `World3D`（`world.pause()`），退出时销毁 `MemoryStage` 并 `world.resume()`。
- 渲染管线与主世界一致：AgX 色调映射、PMREM 环境、太阳阴影、泛光、`OutputPass`、同款调色（可从 `World3D.setupPostFX` 抽一个共享函数 `createPostPipeline(renderer, scene, camera, quality)`，World3D 也改用它）。
- 画质沿用 `detectQuality()` 的档位（导出它）。

## 2. 数据格式 `src/features/memory/types.ts`

```ts
export type Pov = "you" | "watch" | "me" | "paper";   // 第二人称 / 第三人称 / 第一人称 / 二维

export interface Vec3 { x: number; y: number; z: number }

/** 场景里的一块“可建立”的东西：随某句话从洪流中显形 */
export interface BuildPiece {
  id: string;
  /** 由 stage builder 生成的 Object3D 的名字（builder 用 group.name 标记） */
  target: string;
  /** 显形时长（秒），默认 2.5 */
  duration?: number;
  /** 显形方式：rise 从地面升起（墙、桌）、condense 光粒凝结（物件）、grow 由下往上生长（树、植物）、fade 淡入（光、天空） */
  style?: "rise" | "condense" | "grow" | "fade";
}

/** 记忆物件 = 一个单词 */
export interface WordObjectPlacement {
  wordId: string;                 // rw3_unit01_04
  archetype: string;              // 见 memoryObjects.ts
  position: Vec3;
  rotationY?: number;
  scale?: number;
}

export interface Actor {
  id: string;                     // "me2026" 表示年轻的“我”
  name: string;                   // "Me (2026)" / "Lin"
  /** createPerson 的参数：服装、发型、肤色、性别 */
  look: Record<string, unknown>;
  position: Vec3;
  rotationY?: number;
  pose?: "stand" | "phone" | "listen" | "talk" | "write" | "read" | "walk" | "point" | "sit";
}

/** 节拍：回忆按顺序执行的一步 */
export type Beat =
  | { kind: "narrate"; pov: Pov; text: string; zh?: string; build?: string[]; camera?: CameraShot; speak?: boolean; voice?: "system" | "young" | "old" }
  | { kind: "touch"; prompt: string; zh?: string; wordIds: string[] }                       // 第二人称：触碰这些物件
  | { kind: "gap"; sentence: string; answerWordId: string; decoyWordIds: string[]; camera?: CameraShot } // 断片：选对物件
  | { kind: "choice"; speaker: string; line: string; zh?: string; options: Array<{ wordId: string; reply: string; correct: boolean }>; camera?: CameraShot } // 附身对话
  | { kind: "actor"; actorId: string; action: "enter" | "walk" | "pose" | "exit"; to?: Vec3; pose?: Actor["pose"]; duration?: number }
  | { kind: "pov"; to: Pov; camera?: CameraShot }
  | { kind: "paper"; page: PaperPage }                                                        // 二维旧笔记本
  | { kind: "wait"; seconds: number }
  | { kind: "freeze"; caption: string; zh?: string };                                          // 定格成底片，上浮

export interface CameraShot {
  /** 机位与目标；duration 秒内从当前机位平滑运镜过去 */
  from?: Vec3; to: Vec3; look: Vec3; duration?: number; fov?: number;
  /** 镜头运动风格 */
  move?: "dolly" | "orbit" | "push" | "still";
}

export interface PaperPage {
  style: "notebook" | "diary" | "ticket";
  title: string;
  /** 每行：原文含 {{wordId}} 占位，被“晕开”的位置由玩家用词块补全 */
  lines: string[];
  /** 额外干扰词块 */
  decoyWordIds: string[];
}

export interface MemoryScript {
  id: string;                     // "u01a"
  unitId: string;                 // "unit01"
  section: "section_a" | "section_b" | "section_c";
  title: string; titleZh: string;
  /** 舞台：由哪个 builder 搭场景 */
  stage: string;                  // "clubRoom"
  actors: Actor[];
  objects: WordObjectPlacement[];
  beats: Beat[];
  /** 回忆完成后 2026 校园地图上点亮的东西（交给 App） */
  reward?: { lightNode?: string };
}
```

## 3. 模块 `src/features/memory/`

| 文件 | 导出 | 说明 |
|------|------|------|
| `MemoryStage.ts` | `class MemoryStage { constructor(container, opts); play(script): Promise<MemoryResult>; dispose() }` | 组装下面所有模块；`play` 跑完全部节拍或玩家退出时 resolve |
| `Materializer.ts` | `register(obj, style)`, `reveal(target, duration)`, `isRevealed`, `update(dt)` | **世界随声音建立**。`register` 时把对象所有材质用 `onBeforeCompile` 打上溶解补丁：uniform `uReveal`(0..1) 按世界高度 + 噪声做溶解阈值，阈值边缘发冷白光（emissive），未显形部分 discard；同时在对象包围盒附近发射一团向对象汇聚的光粒（`THREE.Points`，加色混合）和 3–6 个飘散的英文字母精灵（取该物件单词的字母或句子里的词），显形完成后粒子消散。rise/condense/grow/fade 只是溶解方向与粒子形态不同。所有对象开始时完全不可见 |
| `MemoryFlow.ts` | `class MemoryFlow`（“记忆的洪流”） | 场景里持续存在的环境粒子：缓慢流动的光尘与半透明字母（来自当前朗读的句子），朗读时流速变快、往正在显形的物件方向偏转；空场景时它是唯一可见的东西（雾中的光） |
| `Narrator.ts` | `speak(text, voice): Promise<void>`, `cancel()`, `onWord(cb)` | `speechSynthesis` 英语朗读（选 en-US/en-GB 声音；system 音色平稳略慢 rate 0.92，young 正常，old 略低 pitch 0.85 rate 0.88）；用 `onboundary` 报告当前词（字幕逐词高亮、触发 build）；无 TTS 或被拦截时按“每词 0.33 秒”计时降级，不能卡死 |
| `CinemaDirector.ts` | `letterbox(on)`, `shot(CameraShot)`, `subtitle(text, zh, highlightWordIds)`, `freezeFrame(caption)` | 宽银幕黑边动画；机位平滑运镜（缓入缓出）；底部字幕条（英文大、中文小，可开关中文）；定格：画面停住 → 褪成暖色胶片质感（后期 pass：降饱和、加颗粒、暗角）→ 淡白上浮 |
| `PovRig.ts` | `setPov(pov)`, `update(dt)` | you：第三人称跟随 2090 年的他（半透明微光身影，复用 `createExplorerAvatar` 换成冷色半透明材质），WASD / 摇杆走动，拖动转视角；watch：交给 CinemaDirector；me：相机放到年轻的“我”眼睛高度（1.6m），拖动 / 鼠标环顾，轻微呼吸晃动，年轻的“我”的身体隐藏头部；paper：相机不动，场景虚化（后期加模糊或降低曝光）|
| `Interaction.ts` | `enable(targets, onHit)`, `disable()` | 射线拾取（鼠标点 / 触屏点；you 模式下也支持走到 1.6m 内按 E）；悬停物件时描边高亮（`OutlinePass` 或自发光脉冲）+ 浮出小词签（DOM：单词 + 音标，跟随物件屏幕坐标）|
| `memoryObjects.ts` | `MEMORY_OBJECTS: Record<wordId, { archetype; verb; line }>`, `buildWordObject(wordId, kit): THREE.Group` | M1 至少覆盖单元 1 的 30 个词；archetype 用现有 `sceneProps` / `props` 拼（phone、laptop、openBook、bookStack、lamp、chair…）加少量新几何；`verb` 是触碰时的小动画（glow / open / spin / ring / flip / bloom）|
| `stages/*.ts` | `buildStage(name, kit): THREE.Group` | 舞台搭建；每块可显形的部件 `group.name` 唯一，供 `BuildPiece.target` 引用。M1a 提供一个通用 `"emptyRoom"`（地面 + 四面墙 + 窗 + 桌椅），M1b 提供 `"clubRoom"`（图书馆庭院边的社团教室：长桌、窗外庭院、黑板、书架、植物）和 `"apartment2090"` |
| `actors.ts` | `spawnActor(actor)`, `setPose`, `walkTo(pos, duration)` | 复用 `people.ts` 的 `createPerson`；`sit` 姿势如果不存在，用 stand 下移 + 腿弯曲的简单变体；走路用平移 + 现有步态（若有）|
| `paper2d.ts` | `class PaperLayer { show(page): Promise<boolean>; hide() }` | 二维旧笔记本：全屏 DOM / Canvas，纸张质感（横线、泛黄、手写体英文字体 Google Fonts 如 “Caveat”/“Patrick Hand”）；被晕开的位置显示墨渍；下方一排词块（正确词 + 干扰），拖到墨渍上（或点选后点墨渍）；填对墨渍变成手写字，填错纸面轻抖；全部填对 resolve(true) |
| `hud.ts` | `MemoryHud`：字幕条、视角标记（右上角：YOU / WATCHING / ME / PAPER 小字）、选择条（附身对话的 2–3 个选项）、断片提示（字幕里的空位闪烁）、退出按钮（左上角小 ×，二次确认）| 极简，不遮挡；手机竖屏字幕 + 选项 ≤ 屏幕高 30% |
| `autoScript.ts` | `buildAutoScript(unit, words, section): MemoryScript` | **通用回忆**：没有手写脚本的段落自动生成：`emptyRoom` 舞台；把文章前 6 句作为 narrate（watch），每句 build 一块舞台部件；含本单元词的句子随机 2 句改成 gap；最后一页 paper 用含词句子 3 行。M1a 用它验证引擎；M3 之前其他段落都走它 |
| `progress.ts` | `markMemoryDone(id)`, `isMemoryDone(id)`, `memoryWordsSeen` | 存档（沿用 `infra/storage`）|

### 节拍执行规则（`MemoryRunner`，可放在 MemoryStage 里）

- `narrate`：设置 pov / 机位 → 字幕显示 → 朗读；朗读过程中按句内顺序把 `build` 里的部件逐个 `reveal`（均匀分布在朗读时长里）；朗读结束后至少停 0.6 秒。
- `touch`：pov = you；列出的物件处于“半显形、在洪流里漂浮发光”状态，玩家触碰一个 → 物件完全显形落位 + 播放 verb 动画 + 浮出词签（词、音标、中文义、物件旁白 line）2.5 秒 + 朗读该词和 line；全部触碰后继续。底部只显示一行 prompt。
- `gap`：pov = watch；字幕句子里答案词位置换成闪烁空位；答案物件和干扰物件同时闪烁；点对 → 空位填上、继续朗读整句；点错 → 物件暗下去、胶片轻微抖动，可再选。
- `choice`：pov = me；同学说 line（朗读 young/其他音色）；底部 2–3 个选项（只显示单词 + 小字回复）；选对 → 年轻的我说出 reply（朗读）；选错 → 同学困惑地看你，可重选。
- `paper`：PaperLayer.show，结束后回到之前的 pov。
- `freeze`：CinemaDirector.freezeFrame → 上浮 → resolve。
- 玩家任何时候可点“跳过当前句”（字幕条右侧小箭头），但 touch / gap / choice / paper 必须完成。

## 4. App 接入

- 新增 screen `"memory"`：`App.openMemory(script)` → 暂停 World3D → 创建 MemoryStage → `play` → 结束后 `markMemoryDone` → 返回地图（单元探索上下文保留）。
- **首次进入游戏**（存档里没有 `prologueSeen`）：先播放 2090 开场（M1b；M1a 先用一个占位：黑屏 + 一句系统字幕 “Destination: 2026. University.”），然后进入地图。
- 单元 1 节点的“进入学习”按钮：改为进入回忆选择（三个记忆点 A/B/C，A 用手写脚本，B/C 用 autoScript）；原来的学习面板入口移到一个小的“记忆匣”按钮里，不删除。
- 其他单元暂时也走 autoScript（让整套流程处处可玩），手写脚本在 M2/M3 补。

## 5. M1b 内容：2090 开场 + 《周四的沉默》

### 2090 开场（`stages/apartment2090.ts` + `scripts/prologue.ts`）

- 舞台：夜，雨。干净极简的公寓：落地窗外是远处安静的未来城市（发光的楼体轮廓、缓慢移动的悬浮交通光点）、窗上雨痕（玻璃材质 + 滚动雨水法线）、一张椅子、桌上一本纸质旧笔记本（2026 年的）、悬浮的柔光界面面板（“MEMORY RECALL”）。老年的他坐在椅子上（`createPerson` 灰发、开衫）。
- 节拍（约 60–90 秒）：
  1. 镜头缓推：窗外的城市与雨（无字幕 3 秒，只有雨声——可用 WebAudio 白噪声滤波模拟）。
  2. narrate(old, 字幕)：“It has been sixty-four years.” / “六十四年了。”
  3. narrate(old)：“I still remember the sound of English in that classroom.”
  4. 他把手放上界面。narrate(system)：“Memory recall. Destination: 2026. University. Are you ready?”
  5. choice（唯一选项也可以是两个：“Ready.” / “Not yet.”，Not yet 时停 2 秒再问一次）。
  6. 下潜：画面被光粒洪流吞没 → 白 → 进入 2026 校园地图（地图场景本身在下潜后以“随声音建立”的方式出现是 M4 的事；M1 只需淡入）。

### 《周四的沉默》u01a（`stages/clubRoom.ts` + `scripts/u01a.ts`）

文章：unit01 section_a “Connection or conversation”。舞台：周四傍晚，社团教室，一扇大窗外是图书馆庭院（树、石板、长椅）。

- **下潜建世界（you）**：雾中光尘 → system：“You remember a Thursday. A room by the library courtyard.” → 地面、窗、庭院的树、长桌依次显形 →
  touch：`device`(桌上一排手机) `notification`(一部亮起的手机) `message`(屏幕上的消息气泡) `conversation`(桌上一张写着话题的卡片) `lonely`(角落里一把空椅子) `connection`(两部手机之间的数据线)。
- **我在看我（watch）**：同学们（Lin、Mei、另外 2 人）和年轻的我（2026，黑发、卫衣、背包）逐个入场坐下，每人低头看手机（pose phone）。
  文章前 8–10 句逐句朗读，句子提到的东西继续显形（黑板、四周计划表 = experiment、计时器 = session）。2–3 个 gap（如 lonely / experiment / attention）。
- **附身（me）**：镜头推进年轻的我眼里。Lin 抬头问：“So… what do we actually talk about?”（choice：`conversation`/`purpose`/`algorithm`，正确 purpose 或 conversation 均可接受，回复不同）；
  再一个：组织者说要把手机放进篮子，“For one session, can we stay ___?”（`offline` / `virtual` / `cyber`）。
- **旧笔记本（paper）**：2026 年的课堂笔记，3 行：
  “Week 1: we put every {{device}} in a basket.” / “It felt strange to start a {{conversation}} without a screen.” / “Real {{connection}} needs {{attention}}.” 干扰：algorithm, platform, scroll。
- **定格**：大家第一次笑起来的一刻定格 → 泛黄 → 上浮回 2090 → 老年的他：“We were so young. And we were learning to listen.” → 回到地图，单元 1 节点亮起。

## 6. 约束

- 默认界面不出现大面板；字幕条 + 选项 ≤ 屏幕高 30%。
- 回忆舞台绘制调用 ≤ 150（合并几何，复用 MergedBuilder / bakeGroupByMaterial）。
- 低画质：洪流粒子数减半、不做阴影软化、二维层不做背景模糊（用暗化代替）。
- 所有资源在 `MemoryStage.dispose` 释放；退出回忆后地图正常继续。
- 朗读失败不能卡死流程（计时降级）。

## 7. 测试（vitest）

- `autoScript`：对 6 个单元的 A/B/C 都能生成脚本；narrate 的文本都是文章原句；gap 的答案词出现在对应句子里，干扰词与答案不同且都属于同单元；paper 行里的占位都能在词表里找到。
- `types` 校验函数 `validateScript(script)`：所有 build target、wordId、actorId 引用都存在；touch / gap / choice / paper 引用的词都在 objects 里或单元词表里。手写的 prologue、u01a 都通过校验。
- `Narrator` 计时降级：无 `speechSynthesis` 时 `speak` 在 (词数 × 0.33 ± 0.2) 秒内 resolve（用 fake timers）。
- `memoryObjects`：单元 1 的 30 个词都有条目；每个 archetype 都能 build 出非空 Group（three 在 node 下可用）。
- `paper2d` 的判定逻辑抽成纯函数 `checkPaperFill(page, fills)` 测试。

## 8. M1a 实现说明（与上文的差异与补充）

- **共享渲染基础设施**：`src/features/world/postPipeline.ts` 导出 `detectQuality` / `QUALITY_PRESETS` / `createPostPipeline(renderer, scene, camera, quality, { ao, forceComposer })` / `buildSkyEnvironment`。World3D 与 MemoryStage 共用；回忆关闭 GTAO（溶解中的物件在法线预通道里是实心的），低画质也强制建立 composer 以便追加底片通道。
- **Materializer**：每个 Piece 对其每种材质克隆一份并打溶解补丁（uniform 为 Piece 私有，克隆保留原材质的 onBeforeCompile / 程序缓存键，故同类材质仍共用 GPU 程序）；castShadow 的网格配带丢弃的深度材质。粒子与字母整个舞台共用一个 `THREE.Points`。未显形且无幽灵态的 Piece `visible=false`，不产生 draw call。扩展 API：`setGhost`（漂浮发光态）、`setPulse`（边缘光脉冲）、`hide`（反向溶解）、`prewarm`（预编译着色器）、`completeAll`、`progress`。
- **脚本补充**：`MemoryScript.pieces?: BuildPiece[]`（`narrate.build` 先按 piece id 查，查不到当作舞台部件名）；`gap.build?`；`gap.zh?`；`WordObjectPlacement` 的 y > 0.9 视为悬空（轻微上下浮动与自转）。
- **舞台注册**：`stages/index.ts` 的 `registerStage(def)`；`StageDef` 含部件表（部件名 → 默认显形风格）、可走范围、出生点、摆放位、机位、环境参数。M1b 的 clubRoom / apartment2090 只需实现 `StageDef` 并注册。M1a 提供 `emptyRoom` 与开场占位用的 `void`。
- **脚本注册**：`scripts/index.ts` 的 `registerMemoryScript(script)` 登记手写脚本（id 约定 `u{单元}{a|b|c}`，如 `u01a`）；没有登记的段落由 `buildAutoScript` 生成，`resolveMemoryScript` 负责二选一。
- **进度存储**：`infra/storage.ts` 新增 `loadMemoryProgress / writeMemoryProgress`（独立 key `word_quest_memory_v1`，含 `prologueSeen` / `done` / `wordsSeen`），不放进 GameSave，避免内存里的 GameSave 副本把它覆盖掉。
- **App 路由**：新增 screen `"memory"`；`App.runMemory(script, gate)` 暂停 World3D → 动态 import 回忆引擎 → 创建 / 运行 / 销毁 MemoryStage → 恢复地图。单元入口卡改为 A/B/C 三个记忆点，原学习面板（故事、子世界入口、词汇统计）收进卡内的“🗃️ 记忆匣 · 学习面板”折叠区；地图上的子世界水晶仍直接进入原学习场景。
- **开场占位**：`scripts/prologue.ts`（舞台 `void`，一句系统字幕）。首次进入先出现“轻触 · 开始回溯”（用这次点击拿到朗读所需的用户手势）。

## 9. M1b 实现说明（内容 + M1a 试玩问题的修复）

### 9.1 新增文件

| 文件 | 说明 |
|------|------|
| `stages/apartment2090.ts` | 2090 年雨夜公寓：落地窗外的未来城市（≈40 栋带窗户贴图的楼体、三层纵深、地平线光晕）、44 道悬浮交通光迹（一个 `InstancedMesh`，随城市显形）、窗上的雨层（着色器：三层滚动雨痕 + 静止水珠）、椅子 / 小桌 / 2026 年的旧笔记本 / 悬浮的 “MEMORY RECALL” 面板（画布贴图，叠加混合）/ 落地灯 / 绿植。`showPlayer:false`，`ambience:"rain"`，`animate` 推进雨、交通、面板浮动。导出 `APARTMENT`（关键位置）|
| `stages/clubRoom.ts` | 《周四的沉默》的教室：长桌 + 五把椅子（导出 `CLUB_SEATS`）、大窗（斜阳光束）、庭院（草坪、石板路、长椅、4 棵写实树、图书馆立面）、黑板、四周计划表、挂钟、书架、植物、软木板、吊灯、角落的手机篮。前墙 `BackSide`（从外面看透明），`cameraBounds` 允许跟随相机退到墙外 |
| `scripts/prologue.ts` | 真正的 2090 开场（替换占位）|
| `scripts/u01a.ts` | 单元 1 记忆点 A；`scripts/index.ts` 里登记，B / C 仍由 autoScript 生成 |
| `ambience.ts` | `RainAmbience`：WebAudio 滤波噪声（沙沙 + 低频底噪 + 偶尔的水滴），`start()` 在用户手势之后调用，`stop()` 淡出并关闭 |
| `CandidateMarks.ts` | 断片候选的光晕 + 浮动的 “?” |
| `PovRig.test.ts` / `scripts/scripts.test.ts` | 见 9.5 |

### 9.2 数据格式的扩展（`types.ts`）

- `Beat.choice`：`options[].wordId` 可省略，改用 `label`；`soft:true` 的选项不算答错（回复一句话、停 2 秒再问一次）；新增 `voice`（提问音色，开场用 `system`）、`viewer`（第一人称借谁的眼睛，缺省 `me2026`）、`lookAt`（视线朝向）。
- 新节拍 `build`（让一批部件 / 人物 / 物件显形，可带机位，不朗读）、`dive`（光粒洪流吞没画面，淡白）。
- `freeze.epilogue`：定格淡白之后回到 2090 年——深蓝夜色 + 雨丝 + 雨声，老年的他轻声说一句话。
- `StageDef`：`cameraBounds`、`ambience`、`animate(root, dt, time)`；`addDisposer(root, fn)` 登记舞台自己的资源（画布纹理），`MemoryStage.dispose` 统一调用。

### 9.3 对 M1a 试玩问题的修复

1. **第二人称视角**：2090 年的他改为低不透明度（0.3）的冷色微光 + 菲涅尔边缘光 + 身后光尘；跟随相机后退到 5.6 m、偏到肩后（他出现在画面一侧）；有可点物件被他挡在后面时他淡到 0.06；他不参与射线。根因之一是旧相机被房间范围夹住，实际只有 1.5 m——现在前墙是 `BackSide`，相机范围由 `cameraBounds` 单独给出。
2. **触碰**：触碰阶段开始时清掉上一句字幕；词卡（词 + 音标 + 中文 + 旁白）贴在被触碰的物件旁（屏幕投影、夹在视口内），底部只剩一行提示。
3. **断片**：机位由候选物件（答案 + 干扰）的包围盒并集算出（距离按视野、从略高处俯看）；候选完整显形并带标签、光晕、浮动的 “?”，边缘光脉冲；其余物件退暗；答错的候选暗下去，没出现过的干扰物件在答对后散去。
4. **通用 emptyRoom**：素净暖灰泥墙（程序化灰泥，污渍压轻）、木地板、白漆踢脚线、灰褐地毯、更柔的窗光。
5. **第一人称**：`me` 视角的眼睛锚点现在真正接到 viewer 人物（M1a 里一直用玩家位置）：朝向说话的人，viewer 的身体隐藏。

### 9.4 其它引擎改动

- `Materializer.setDim`（让无关物件退暗）；`MemoryFlow.setSpeed`（下潜时加速）。
- `actors.ts`：`look.seated` 的人物在 phone / listen / talk 等姿势下也坐在座面上（M1a 只有 `sit` 姿势才抬高）；走路 / 站立变体不坐；**人物压缩**：按 “布料 / 皮肤 / 头发” 把颜色烘进顶点色合并，每个人 4 个网格（原来 12–15），五个人 ≈ 20 次绘制。
- 背景色随世界建好的程度从深色雾渐变到舞台自己的雾色（暖色舞台才不会一开始就把光尘淹没）；树叶的透光太阳方向随舞台。
- 绘制预算：clubRoom 舞台 ≈ 77 个网格 + 人物 20 + 脚本里的 9 个物件 ≈ 28 个网格 < 150（`stages.test.ts` 里有断言）。

### 9.5 测试

- `scripts/scripts.test.ts`：prologue、u01a 通过 `validateScript`；节拍顺序、旁白取自文章原句且顺序一致、断片候选靠得够近、答案词在句子里、笔记本三行、定格 + epilogue、所有字幕有中文、舞台部件都会显形。
- `memoryObjects.test.ts`：单元 1 的 30 个词都 build 出非空物件、旁白是第二人称、原型最多两个词共用。
- `stages.test.ts`：两个新舞台的部件 / 网格预算 / 光路 / 前墙 / 与 Materializer 的配合（着色器材质、实例化网格）。
- `PovRig.test.ts`：微光身影的不透明度与边缘光补丁、肩后机位、被挡时淡出、拖尾、第一人称锚点。

### 9.6 试玩第 2 轮（触碰阶段可玩性）

- **到位动作**：触碰节拍开始时 `PovRig.moveTo` 带 2090 年的他走到目标群靠近玩家的一侧（偏左），同时 `PovRig.frameFocus` 让跟随镜头平滑拉近 / 抬高、视线移向目标群中心；到位后仍是你的视角（`releaseFraming` 在触碰结束时恢复肩后机位）。
- **找得到**：未触碰的目标头顶有 `TargetBeacons` 灯柱 + 光点（屏幕大小恒定、不被遮挡）；目标在画面外时屏幕边缘有指向它的箭头（`Interaction` 的 `.mem-edge`）。
- **点得中**：`Interaction` 改为屏幕空间拾取（`pickNearest`，半径 max(36 px, 投影半径)）；点空了触发 `onMiss`，MemoryStage 用它做 click-to-move（点地面走过去；WASD / 摇杆立即取消）。
- **词签**：只有悬停 / 离鼠标（触屏为屏幕中心）最近的目标显示完整词签，其余是小圆点；词卡打开时词签全部隐藏。提示条带进度：`Reach out. Touch what you remember. 3 / 6`。
- **老年的他的姿势**：新增 `lap`（双手放膝）与 `reach`（右手屈肘慢慢抬向前方，约 1.5 秒内逐步切换 reach1..reach4 变体，左手仍在膝上）。
- **测试开关（仅 dev 构建）**：`?memauto=1` 约 1.2 秒后自动作答每个交互节拍（逐个触碰、选对断片 / 选项、补全笔记本、点开场的“轻触”）；`?memfast=1` 旁白不用 TTS，计时降级 ×4。见 `devFlags.ts`。
