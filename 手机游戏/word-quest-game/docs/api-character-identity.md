# 接口文档：同学各不相同（脸型、发型、发色）

## 问题

只有两个底模（Rocketbox 男 / 女）。同性别同学脸一样、发型一样（两个女生都是同一个发髻），只是衣服颜色不同；当年的“我”认不出来。

## 底模结构（已核实）

- 每个 GLB 一个 Mesh，3 个 primitive：`*_body`、`*_head`、`*_opacity`（头发卡片、睫毛等透明层）。
- 脸部骨骼：`Bip01 L/RCheek`、`Bip01 MJaw`、`Bip01 MNose`、`Bip01 L/R/M(Inner/Outer/Middle)Eyebrow`、`Bip01 L/RUpperlip`、`Bip01 MUpperLip`、`Bip01 MBottomLip`、`Bip01 L/REye`、眼睑、`Head`、`Neck`。
- 67 个形变（ARKit 52 + 15 viseme；viseme 为空）。

## 方案

### 1. 脸型（`humanIdentity.ts`）

`FaceShape` 参数（每项 −1..1）：下颌宽、下颌长 / 下巴、颧骨（cheek 外移与前凸）、脸颊丰满、鼻长、鼻宽、鼻梁高、眼距、眼睛大小、眉毛高度与弧度、嘴宽、唇厚、额头高（Head 骨上部比例）、头部整体宽长比。
- 通过脸部骨骼的**静息位移 / 缩放偏移**实现（在 rest pose 上叠加，动画与表情照常叠在上面）；幅度控制在不穿模、不变形的范围（测试里限位）。
- 头部比例用 `Head` 骨的非等比缩放（≤ ±5%）。

### 2. 发型（新的头发几何）

- 原始头发：把 head / opacity primitive 中**颅骨外的头发顶点**（以 Head 骨为中心的颅骨椭球之外、且在眉线以上 / 耳后的点）收缩贴到椭球表面（每个实例 geometry 已是克隆，可直接改），opacity 层头发卡片透明度设为 0（睫毛保留：按 UV 区域或位置区分）。让原发髻消失，变成贴头皮的底层。
- 新发型：程序生成、绑在 `Head` 骨上的发片网格（类似植被的 card 技术：多层弯曲发片 + 程序头发纹理（发丝走向、透明发梢、发根暗、高光带）+ alphaTest + 双面），每个发型 ≤ 6k 顶点，1 个材质：
  - 男：短碎发（凌乱刘海）、侧分短发、寸头、微卷蓬松、中长扎小揪；
  - 女：齐肩波波头、高马尾、低马尾、长直发披肩、短发（耳际）、丸子头（与原来的不同位置）；
  - 2090 老人：稀疏灰白后梳 + 鬓角。
- 头发随头部动作（继承骨骼即可）；马尾 / 长发尾端做简单的二阶摆动（弹簧，跟随头部转动与走路）。

### 3. 发色、肤色、眉毛、胡子、配饰

- 发色：黑、深棕、栗色、浅棕染、蓝黑、灰白（老人）；眉毛颜色跟随发色（头部贴图眉毛区域重着色）。
- 肤色：在现有范围内 ±，加少量雀斑 / 痣（头部贴图叠加，确定性随机）。
- 男生可选：轻胡茬、无胡；配饰：圆框眼镜、方框眼镜（程序几何，绑 Head）、耳机挂脖、发卡。

### 4. 身份表（`characters.ts`）

每个固定角色一份不会变的身份：

```ts
export interface CharacterIdentity {
  id: "me2026" | "lin" | "mei" | "an" | "rui" | "organizer" | "old2090" | string;
  name: string;
  base: "male" | "female";
  face: FaceShape;
  hair: { style: HairStyleId; color: string };
  skinTone: number;      // −1..1
  brows?: { color?: string; thickness?: number };
  facialHair?: "none" | "stubble";
  accessories?: Array<"roundGlasses" | "squareGlasses" | "neckHeadphones" | "hairClip">;
  outfit: { top: string; topColor: string; bottom: string; bottomColor: string; shoes?: string };
  heightScale: number;   // 0.96–1.04
}
```

- **当年的我（me2026）**：黑色凌乱短碎发 + 圆框眼镜 + 灰色连帽卫衣 + 深蓝牛仔裤 + 黑双肩包，身高中等偏高；所有场景都一样，一眼能认出。
- **2090 年的我（old2090）**：同一张脸（同 FaceShape，加年龄：脸颊下垂、眉低、皱纹贴图）+ 稀疏灰白后梳 + 同款圆框眼镜（金属细框），让玩家意识到这是同一个人。
- Lin：齐肩波波头、栗色、方脸偏宽、薄荷绿针织衫；Mei：高马尾、黑发、瓜子脸、发卡、粉色卫衣；An：寸头、深棕、宽下颌、芥末黄 T 恤 + 衬衫；Rui：微卷蓬松、浅棕、窄长脸、方框眼镜、蓝格衬衫；组织者：低马尾、深棕、成熟一点的脸、米色开衫。
- 同一单元多段回忆、后续单元里出现的同一人用同一身份。

### 5. 识别提示

- 第三人称电影里，当年的我第一次出现时，头顶短暂浮出一行小字 “Me · 2026”（1.5 s 淡出）；其余同学第一次说话时浮出名字（同样 1.5 s）。不用常驻名牌。

## 测试

- `FaceShape` 应用后各脸部骨骼偏移在限位内；同一身份每次生成一致；两个不同身份的骨骼偏移向量距离足够大。
- 头发顶点收缩：收缩后头发顶点都在颅骨椭球上或内部；睫毛 / 眼睛 / 脸部顶点不动。
- 每种发型顶点数 ≤ 6k、有 uv / normal、alpha 纹理边缘有透明。
- 身份表：u01a 的 5 个同学 + me2026 + organizer 的（发型、发色、脸型）组合两两不同；me2026 与 old2090 共用 FaceShape。

---

## 实现说明

文件：`world/humanIdentity.ts`（FaceShape → 脸部骨骼静息偏移，限幅）、`world/humanHair.ts`（底模头发收缩 / opacity 剔除 / 程序发片 / 发丝贴图 / 弹簧）、`world/humanAccessories.ts`（眼镜 / 耳机 / 发卡 / 背包）、`memory/characters.ts`（身份表 + `characterLook`）、`memory/NameCaption.ts`（名字小字）；`humanAppearance.ts` 增加肤色微调 / 雀斑 / 痣 / 眉色 / 胡茬。

### 头发 / 睫毛 / 脸的分离（实测）

- `*_head` primitive（男 1790 / 女 1826 顶点）：脸、眼、嘴、颈和一层头发壳在同一个 primitive 里；真正“蓬出”颅骨的头发只有约 250 个顶点，其余头发是贴图画在颅骨上。判据（纯几何，不依赖贴图）：Head 骨权重 ≥ 0.5，且在眉线以上（眼上 5 cm）/ 头两侧蓬出（|x| > 9.6 cm）/ 脑后（z < 眼 − 6 cm）/ 拖出颅骨的发束（z < 眼 − 12 cm）；耳朵（|x| 6.2–9.6 cm、眼高 ±5 cm、耳位前后）与 眼 / 嘴 / 颌 / 舌 / 鼻骨主导的顶点永远不动。这些顶点被收缩到颅骨椭球（中心 = 眼中点后 6.6 cm，半径 8 × 11.2 × 10.8 cm）表面，已在椭球内的不动。
- `*_opacity` primitive：男 744 顶点全是发丝卡片（0 个睫毛）；女 596 顶点里 180 个在眼周（睫毛 / 眉）。只保留落在“眼睛周围包围盒”（眼高 ±4.5 cm、眼前、|x| < 8.5 cm）里的三角形，其余整体剔除（男 → 整层隐藏）。
- GLTFLoader 会把节点名里的空格换成下划线（`Bip01_LEye`），所有按名字查找的代码两种写法都认。

### 发型顶点数（≤ 6000）

messyCrop 2208 · sidePart 2112 · buzz 1800 · wavy 3084 · shortTieUp 1448 · bob 4000 · earShort 2340 · longStraight 4540 · highPonytail 3000 · lowPonytail 2980 · sideBun 2264 · thinningSwept ≈ 1700。

### 局限

脸型只能通过脸部骨骼（颌骨 190 顶点、鼻 12、眼球 73×2、眉 / 唇各几个顶点）实现，幅度被限制在 ≤ 6.5 mm，辨识度主要来自发型 / 发色 / 眼镜 / 衣着；背包只在站立 / 走路时显示（坐下后隐藏）。
