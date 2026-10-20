# 接口文档：人物坐姿与动作（写实化）

## 问题（试玩）

- 坐着很假：现在真人模型（Rocketbox）只驱动 12 根骨骼（单节 Spine、Head、上臂、前臂、大腿、小腿、脚），没有骨盆、多节脊柱、颈、锁骨 / 肩、腕、手指（只有握拳一个参数）。
  “坐”= 站姿 listen 下移到座高：骨盆不后倾、背不靠椅、手悬空不落在桌上、脚不贴地；部分同学没被标记为坐着，站在桌子后面。
- 动作太少：基本是静止 + 眨眼，没有呼吸、视线、点头、手部动作、坐姿调整。
- 只有男女两个底模，同学是“克隆人”；2090 年的老人看起来 35 岁（黑发黑胡子）。

## 目标

近看（1–3 m，第三人称电影机位和第一人称同桌视角）人物像真人坐在那里上课：重量落在椅面上、手搭在桌上 / 拿着手机或笔、会呼吸、会看说话的人、会点头、会换姿势。

## 模块

### `src/features/world/humanRig.ts` — 完整骨骼驱动

- 直接驱动 Rocketbox 骨架：`Hips, Spine, Spine1, Spine2, Neck, Head, Left/RightShoulder, Left/RightArm, Left/RightForeArm, Left/RightHand, 手指三节 ×5, Left/RightUpLeg, Left/RightLeg, Left/RightFoot, Left/RightToeBase`（以 GLB 实际骨骼名为准，启动时打印缺失）。
- 姿势表达为 `HumanPose = Record<BoneName, Euler (character axes)>` + `hipsOffset: Vector3`，继续用 `retargetRotation` 从角色轴转到骨骼本地轴。
- **IK**：两骨 IK（解析解，带极向量）用于
  - 手：落到世界目标点（桌面某处 / 手机 / 笔 / 下巴 / 大腿），手腕朝向可指定；
  - 脚：脚掌贴地（地面高度），膝盖朝前。
- **坐姿校准**：`seat: { position, height, forward }` + `table?: { height, nearEdgeZ }`。骨盆坐在椅面上（臀部后缘距椅背 ~4 cm），大腿沿椅面略下倾，膝 90–105°，小腿近竖直，脚平放；靠背时 Spine 后倾 8–12°、前倾听讲时 Spine/Spine1 前倾 10–20°、手肘落桌面。

### `src/features/world/humanPoses.ts` — 姿势库（数据）

坐姿：`sitUpright`（端坐听讲）、`sitLeanForward`（前倾、双肘撑桌、手交叠）、`sitPhoneLap`（低头看腿上的手机，双手握机，拇指滑动）、`sitPhoneTable`（手机放桌上，一手点屏）、`sitChinHand`（单手托腮）、`sitWrite`（一手按纸、一手写字）、`sitSlouch`（靠背、双手放腿上）、`sitTalk`（坐着说话，手势）、`sitLaugh`（大笑后仰，用于定格）。
站姿：`standRelaxed`（重心在一条腿上，骨盆微斜）、`standArmsCrossed`、`standTalk`（讲解手势）、`standHoldBook`。
每个姿势：主要骨骼角度 + 手 / 脚 IK 目标（相对座位或身体）+ 头默认视线。

### `src/features/world/humanMotion.ts` — 程序化动作层（叠加在姿势上）

| 层 | 内容 |
|----|------|
| 呼吸 | 胸腔 Spine1/Spine2 微俯仰 + 肩上提，周期 3.5–4.5 s，说话时变浅变快 |
| 微晃 | 坐姿上身 ±0.5°、站姿重心缓慢左右移动 |
| 视线 | look-at 目标（说话人 / 屏幕 / 讲义 / 镜头），眼 → 头 → 颈分层跟随（眼最快、颈最慢，限位），偶尔扫视（saccade）与回看 |
| 眨眼 | 2–6 s 随机，说话时稍频繁，转头时触发一次 |
| 倾听 | 别人说话时偶尔点头（幅度小、2–3 下） |
| 说话 | 由 `speechActivity` / Narrator 当前说话人驱动：下颌 + 口型 morph（jawOpen、mouthFunnel、mouthClose 随音节包络）、眉毛、头部点动、手势（拍点式小手势，手腕 + 前臂） |
| 手 | 拿手机：拇指滑动 / 点击周期；写字：手腕小幅位移 + 笔尖沿行；空闲手：手指自然弯曲（非握拳），偶尔动一下 |
| 小动作 | 每个人 8–20 s 一次随机：调整坐姿（骨盆前后挪）、摸后颈、推眼镜、翻一页、看一眼手机、伸手拿杯子 |
| 过渡 | 任意两个姿势之间 0.5–0.9 s 缓入缓出混合（四元数 slerp + IK 目标插值）；`sitDown` / `standUp` 过渡动作（转身、手扶桌、坐下）|

- 每个人一个 `seed`：所有周期、幅度、小动作间隔都带个体差异，不同步。
- 性能：每人每帧 IK ≤ 4 条链，桌边 6 人 ≤ 0.6 ms（桌面 Mac）；远处（> 15 m）或画面外的人降为 10 fps 更新。

### 外观多样性

- 同一底模每个实例：衣服颜色 / 明度（按材质名区分上衣、裤子、鞋）、发色（含灰白）、肤色微调、身高 ±4%、体型（肩宽 / 腰）缩放 ±3%。
- 2026 年大学生着装：卫衣、T 恤 + 衬衫外套、针织衫，不要全员深色西装（把西装外套材质换色 / 降低对比，或在可能时隐藏外套层）。
- **2090 年的他**：灰白头发和胡子（发 / 胡材质去饱和提亮）、皮肤略暗淡、坐姿略含胸、动作更慢（所有动作层速度 ×0.8）。

## 接入

- `memory/actors.ts`：`Actor.pose` 映射到新姿势库；`look.seated` 或场景给出 `seat` 时一律坐姿并校准到椅子；场景 `clubRoom` 为每个座位导出 `seat`（位置、朝向、高度）和桌面高度。
- 剧本里的人物动作（enter / walk / pose / exit）走新的过渡；`freeze` 前的“第一次一起笑”用 `sitLaugh`。
- 2090 公寓的老人用 `sitSlouch` → 伸手动作保留（用手 IK 指向面板）。
- 第一人称：同桌同学在视野里要有完整的上课动作（看讲义、写字、偶尔看你）。

## 测试

- `humanRig`：两骨 IK 到达可达目标误差 < 1 cm、不可达时伸直指向目标、极向量决定肘 / 膝方向；坐姿校准后骨盆高度 = 椅面 + 臀厚、脚底 y ≈ 地面（±1 cm）。
- `humanPoses`：每个姿势的关节角都在限位内；所有坐姿的手 IK 目标在桌面或身体附近。
- `humanMotion`：同一 seed 可复现；不同 seed 的呼吸 / 眨眼相位不同；视线限位（头转 ≤ 70°、颈 ≤ 45°）；过渡 0.5–0.9 s 内完成且无跳变（相邻帧四元数夹角 < 阈值）。
- 外观：同一底模两个实例的上衣颜色不同；2090 老人发色亮度 > 年轻实例。

---

## 实现说明（已落地）

### 文件

| 文件 | 内容 |
|------|------|
| `src/features/world/humanRig.ts` | 骨架绑定（休息姿势快照）、FK、两骨 IK（`solveTwoBone` + `HumanRig.solveLimb`）、手 / 脚朝向、手指逐节卷曲；`buildSkeletonFromGltfJson` 只用 GLB 的 JSON 在 node 里重建骨架（测试用） |
| `src/features/world/humanPoses.ts` | 姿势库（纯数据，`buildPose(id, { dims, seat })`），`SeatSpec`，姿势限位 `FK_LIMITS`，剧本姿势 → 姿势库的映射 `poseForScript` |
| `src/features/world/humanMotion.ts` | `HumanAnimator`：过渡 + 全部程序化动作层；`mulberry32` 种子随机 |
| `src/features/world/humanAppearance.ts` | 外观多样性：`pickAppearance`、身体 / 头部贴图像素重染、肤色校正、老人皱纹、GLB 贴图提取 |
| `src/features/world/humanVisual.ts` | 加载底模、每实例克隆 + 贴图重染（`CanvasTexture`，实例销毁时释放）、`HumanVisualInfo`；旧的 12 骨骼 `HumanControls` 路径仍保留给回退 |
| `src/features/memory/actors.ts` | `spawnActor` 接入动画器；`updateCrowd`（群体注意力）；真人模型未加载时回退旧程序化骨架 |
| `src/features/memory/stages/clubRoom.ts` | `CHAIR_SEAT_HEIGHT`、`CLUB_TABLE`、`clubSeatSpec(id)`（椅面 / 桌面高度、桌边距离、桌上笔记本在座位局部的位置） |
| `src/features/memory/stages/apartment2090.ts` | `OLD_MAN_SEAT`（座高、书桌边距、伸手目标 = 悬浮界面） |
| `src/infra/speechActivity.ts` | `beginSpeech(speakerId?)`、`getActiveSpeaker()`、`onSpeakerChange` |

### Rocketbox 骨骼（GLB 实测，`male.glb` / `female.glb` 相同，81 个关节）

脊柱 / 腿（驱动）：`Hips, Spine, Spine1, Spine2, Neck, Head, LeftUpLeg, LeftLeg, LeftFoot, LeftToeBase, RightUpLeg, RightLeg, RightFoot, RightToeBase`
肩 / 臂 / 手（驱动）：`LeftShoulder, LeftArm, LeftForeArm, LeftHand, RightShoulder, RightArm, RightForeArm, RightHand`
手指（驱动，每指 3 节，共 30 根）：`{Left,Right}Hand{Thumb,Index,Middle,Ring,Pinky}{1,2,3}`
面部骨骼（不驱动，脸全部走 morph）：`Bip01 {L,R}{Caninus, Cheek, Eye, EyeBlinkBottom, EyeBlinkTop, InnerEyebrow, Masseter, MouthCorner, OuterEyebrow, Upperlip, MouthBottom}`、`Bip01 {MJaw, MBottomLip, MTongue, MMiddleEyebrow, MNose, MUpperLip}`
根：`Bip01`（旋转 -90°、缩放 0.01）。启动时缺失骨骼会 `console.warn`，目前两个底模都是 0 缺失。

骨骼局部轴因 3ds Max Biped 而五花八门（例如手的 X 轴沿掌心、头的 Y 轴向前），所以代码不依赖局部轴：FK 用休息姿势的世界朝向把“角色轴”增量换算到局部（`retargetDelta`），IK 用世界空间的方向对齐，手 / 脚朝向用“指尖方向 + 掌心法线”两个向量（手的掌心法线由拇指 / 小指 / 中指骨骼的位置和手性推出）。

脸部 morph：GLB 有 52 个 ARKit 形变 + 15 个 viseme，**viseme 目标是空的（顶点位移为 0）**，所以口型用 `jawOpen / mouthFunnel / mouthPucker / mouthStretch* / mouthLowerDown*`；眼睛用 `eyeLook*`（实测 `eyeLookOutLeft` 向 +x = 角色左侧），眨眼 `eyeBlink*`，笑 `mouthSmile* / cheekSquint* / eyeSquint*`，眉 `browInnerUp / browOuterUp* / browDown*`。

### 坐姿校准（按真实蒙皮顶点实测，不是估的）

- `SeatSpec = { height, tableHeight, tableEdge, paper?, reach? }`：actor 的 `position / rotationY` 就是椅面中心与朝向，其余量相对它。长桌近侧边缘离每个座位 0.35 m。
- 骨盆骨骼高度 = 椅面 + `dims.sitDrop`（男底模 0.16、女底模 0.125：臀部网格最低处距骨盆骨骼的实测距离，含 2–3 cm 压缩）。
- 骨盆放在座面中部偏前（`SEAT_HIP_Z = +0.04`）：男底模大腿很粗而且膝高被小腿长限制（≤ 椅面高），骨盆太靠后时大腿会被椅面前沿切进去 7 cm；偏前后 ≤ 2 cm。
- 脚：踝目标在地面上方 `ankleHeight`，脚平放（脚尖略外八），脚在膝前方 ≈ 1.04 × 大腿长；膝盖 pole 朝前上方。
- 手：落在桌面上方 5.8 cm（手腕），手掌略向内侧滚使拇指一侧抬起；指尖 / 拇指不穿桌面。写字时笔尖落在 `paper` 上。
- 站起 / 坐下：站在椅子左侧 0.55 m（不是站在椅面上）；坐下 = 水平先走、垂直后落，两脚先后抬起迈一步，0.9 s。
- 回归测试：`humanVisual.mesh.test.mjs` 用 GLB 里真实的蒙皮网格（node 里给 GLTFLoader 补 `self / createImageBitmap`），每个坐姿都检查：脚底在地面（±3 cm）、臀 / 大腿陷进椅面 ≤ 3.5 cm、背不穿椅背、手 / 身体不穿桌面 ≤ 1.5 cm；70 秒运动层（呼吸 / 视线 / 手势 / 小动作 / 变体姿势）下身体不穿桌面 ≤ 2.5 cm。

### 姿势库

坐：`sitUpright, sitLeanForward, sitPhoneLap, sitPhoneTable, sitChinHand, sitWrite, sitSlouch, sitTalk, sitLaugh, sitReach`（`sitReach` 是 2090 老人伸手够界面：右手 IK 指向 `seat.reach`，够不到时伸直指向它）。
站：`standRelaxed, standArmsCrossed, standTalk, standHoldBook, standPoint, standPhone`。
剧本姿势名映射：`listen / sit → sitUpright`（空闲时在 `sitUpright / sitWrite / sitLeanForward / sitChinHand` 之间每 20–50 s 轮换）、`phone → sitPhoneLap`（与 `sitPhoneTable` 轮换）、`talk → sitTalk`、`write → sitWrite`、`read → sitLeanForward`、`lap → sitSlouch`、`reach → sitReach`（1.5 s）、`laugh → sitLaugh`；`stand / walk` 在有座位的人身上 = 站在椅子旁（`walk` 叠加步态）。

### 运动层（`HumanAnimator.update`）

呼吸（3.5–4.5 s，说话变浅变快；Spine1/Spine2 俯仰 + 肩上提）→ 微晃（坐姿躯干 ±0.4°，站姿重心左右移）→ 视线（眼 0.05 s → 头 0.16 s → 颈 0.26 s → 脊柱 0.5 s，小角度只动眼，大角度头 / 颈 / 脊柱接力；限位：眼 30°、头 70°、颈 45°；扫视 0.7–2.8 s、回看 / 瞟玩家 4–10 s）→ 眨眼（2–6 s，左右错开 16 ms，转头时顺带一次，偶尔连眨两次）→ 倾听点头（别人说话时每 1.8–5 s 点 1–3 下，说话人停下时 55% 概率再点一下）→ 说话（音节包络 110–230 ms → 下颌 / 口型 / 眉重音 / 头部点动 / 拍点手势 ≤ 9 cm）→ 手机拇指滑动 / 食指点屏 → 写字（笔尖沿行推进，行尾换行）→ 笑（头后仰、肩抖、眯眼）→ 空闲小动作（8–20 s：调整坐姿 / 耸肩 / 活动脖子 / 摸后颈 / 托下巴 / 摸鼻子 / 推眼镜（仅戴眼镜的人）/ 伸懒腰；手忙时不摸脸）→ 姿势过渡（四元数 slerp + IK 目标插值，手 / 脚朝向用基四元数插值，避免掌心翻转；0.55–0.85 s，坐下 / 起身 0.9 s）→ 走路（步态叠在站姿上）。
每个人的 `seed` 决定呼吸周期 / 相位、微晃周期、眨眼与小动作间隔、点头倾向、惯用手。年长者 `speed = 0.8`（所有层的 dt 与过渡时长），脊柱 / 颈额外前倾。

### 群体注意力与说话人

- `ActorHandle.setPose("talk")` / `setSpeaking(true)` 标记说话人；`narrate` 节拍新增可选 `speaker`（actor id），2090 开场旁白由老人说出。
- `updateCrowd(actors, viewer?)`（MemoryStage 每帧在 `update` 前调用）：其余人看向说话人并倾听（点头）；说话人看向最近的听众（第一人称里别人说话时看向玩家的眼睛）；第一人称里同桌同学偶尔瞟一眼玩家。Narrator 词事件 → `pulse()` 推一下口型 / 重音。
- `speechActivity.beginSpeech(speakerId)` 把 id 登记到共享语音状态（`getActiveSpeaker()`），Narrator.speak 第三个参数传入。

### 外观

贴图是 512×512：身体贴图按区域（夹克 / 裤 / 鞋 / 手）重染（亮度保留，夹克的青 / 洋红内衬换成内搭 T 恤色，鞋的点缀色随机），头部贴图重染头发 / 眉 / 胡子并校正肤色；`opacity` 材质（睫毛 / 眉）乘发色。上衣调色盘是 2026 年大学生的卫衣 / T 恤 / 针织衫 / 衬衫外套颜色，剧本里接近黑色的上衣会被提亮（不再是“西装”）。身高 ±4%、肩宽 / 腰 ±3%。2090 年的他：头发 / 胡子灰白、皮肤去饱和 + 皱纹、含胸、`speed = 0.8`。
局限：发型 / 脸型由底模决定（男底模有胡子，年轻男生默认“刮干净”：胡子区域混向肤色）；眼镜是独立的细框道具（`glasses: true`）。

### 每帧成本

`HumanAnimator.update` 在 node 下实测：6 个坐着的人（含 IK、手指、视线、道具）合计 ≈ 0.09 ms / 帧（≈ 0.015 ms / 人）。其余成本在 GPU 蒙皮（每人 3 个 SkinnedMesh、≈ 8.7k 三角形、81 根骨骼，与之前相同）。> 15 m 的人降到 10 fps 更新。

### 与规格的差异

- `HumanPose` 用 `[俯仰, 偏转, 侧倾]` 元组 + 手 / 脚 IK 目标 + 手指弯曲表达，而不是 `Record<BoneName, Euler>`（姿势之间用四元数 / 向量插值）。
- 头 / 眼不走姿势里的 FK：姿势只给“默认视线点”，头 / 颈 / 眼由视线层解出。
- 起身 / 坐下没有“手扶桌面 / 转身”的细节，只有侧步 + 抬脚 + 水平 / 垂直错开；伸手拿杯子、翻页没有做。
- 骨盆比规格里的“臀部后缘距椅背 4 cm”更靠前（约 12 cm），原因见上文坐姿校准。
