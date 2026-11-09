# DeepSeek D28：精品小物件（Claude 下发，2026-10-23）

排在 D24 之后。C13 和 D24 优先。

## 背景

第 1–6 单元共有 268 个 kit 没有最终资产。Claude 已经建好精品物件管线，并做完 phone、tablet、monitor、home_desk、rug、calendar、floor_lamp、chess_set、blackboard、kitchen_counter、tv、market_shelf 和 reading_table。小件请你按同样的方法做，**Claude 逐个看预览图验收，不达标就退回**。

## 先读

- `Tools/props/hero_common.py`：管线说明。`pbr()` 是程序化材质，可选参数：
  - `scan=<Poly Haven id>`：真实扫描材质，本地有 31 套，在 `SourceArt/PolyHaven/textures/`，木纹、布料优先用它；
  - `image=` 印刷图案；`external()` 指定 UE 材质；`emissive()` 屏幕或灯。
  - 几何工具有 `rounded_slab`、`cylinder`、`lathe`（车削件）、`arc`、`extrude_outline`、`subdivide`。
- 范例：`hero_phone.py`（小电子件）、`hero_chess_set.py`（车削件 + 轮廓挤出）、`hero_calendar.py`（印刷品 + 立面贴图）、`hero_market_shelf.py`（批量摆放 + 投影标签）。
- 图案和屏幕内容写在 `Tools/props/hero_textures.py` 和 `hero_screens.py` 里，**文字全部原创**，不搬教材原文。

## 物件清单（第 1 单元，尺寸以 `textbook_scenes/unit01.json` 为准）

keyboard（键帽要有字符，用 image 投影）、headphones、wifi_router（状态灯用 emissive）、recipe_book、duster、chalk_tray（附几根粉笔）、sandwich_plate、coupon_card、qr_sign（二维码图案）、payment_sign、device_box、school_bag（布料用 scan）、griddle、dish_rack、sink、brochure_rack（折页用 image）、queue_rope（立柱加织带）。

## 标准

`Docs/quality-bar.md` 第 2 节：

- 所有硬边都要倒角，不能留原始方盒边；
- 材质要有磨损、脏污、划痕、指纹，跟着物件用途来，例如锅边有油渍、键盘常用键磨亮；
- 尺寸误差在 2% 以内；
- 正面朝 +Y，底面在 z = 0。

## 每个物件的流程

1. 写 `Tools/props/hero_<kit>.py`。先低分辨率试烘焙（`HERO_RES=512 HERO_SAMPLES=2`），看 `preview/<kit>.png` 自查，再用正式分辨率烘焙。
2. 把预览图路径和三角面数写进 STATUS，等 Claude 验收。
3. 验收通过后，由 Claude 统一导入 UE（`Tools/import_hero_props.py`）并映射 kit，你不需要开 UE。

## 注意

- 坐标朝向要特别小心。从 +Y 看过去，+x 在观察者左边，立面贴图的 u 要沿 −x 方向（`pbr(image_plane="XZ")` 已经处理了）。Claude 做的显示器和日历都在这里出过镜像错误。
- 金属件的 BaseColor 要用 EMIT 烘焙，`hero_common` 已经修好，不要改回 DIFFUSE。
