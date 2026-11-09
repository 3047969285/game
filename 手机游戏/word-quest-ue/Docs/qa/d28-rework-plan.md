# D28 返工记录（Claude 评审 2026-10-23；暂停期只改代码，不烘焙）

状态：**代码已写，未烘焙/未预览**（遵守“暂停所有 UE/Blender”）。恢复后先跑低分辨率 + `check_contacts`，再提交预览给 Claude。

## 共性问题
1. **零件接触**：已在 `Tools/props/hero_common.py` 增加 `check_contacts(parts, max_gap=0.001)`；`hero_u01_small.run()` 在 `finish` 之前调用，任意两零件最近距离 >1 mm 直接报错。
2. **文字镜像**：`coupon_card`、`device_box` 待恢复后用预览确认方向（平放物件从上看 +x 在右；立面 XZ 用 `pbr(image_plane="XZ")` 的 u 沿 −x 约定）。已给 `recipe_book`/`qr_sign`/`payment_sign` 的立面图设置 `image_center` 垂直对齐，避免采到图外黑边。
3. **造型细节**：见下表。

## 本批代码改动
| kit | 改动 |
|-----|------|
| headphones | 头梁→伸缩滑管→trunnion→yoke 臂→耳罩全连通；皮质耳垫改为鼓起 lathe；内衬网布 |
| duster | 改为黑板擦：木块手柄 + 毛毡底 + 粉笔灰斑（原羽毛掸造型） |
| dish_rack | 不锈钢焊框：底框、7 根竖向分隔、上下横杆、筷子筒（含支架）、接水盘、碗盘；全部接触 |
| griddle | 圆形铸铁鏊 + 养锅面 + 灶圈/支架 + 边缘刮板（原方形锈板） |
| sandwich_plate | 三角切面三明治：面包/金黄外皮/起伏生菜边/芝士/番茄/牙签，陶瓷盘 |
| school_bag | 主仓 + 盖 + 前袋 + 拉链齿/拉头 + 弧形肩带（分段倾斜）+ 侧网兜 + 提手 |
| wifi_router | 2 根带铰链座的天线、4 个 RJ45、散热槽、发光 LED 条、底部胶脚 |
| queue_rope | 立柱落座铸铁底座、顶部伸缩盒；织带分段连续并接卡扣（待预览确认） |
| brochure_rack | 立杆连底座并穿过隔层；折页改为三色卡纸 + 白色标签（世界投影黑块问题） |

## 尚未完成（恢复后做）
- 预览 + `check_contacts` 迭代：耳机/碗碟架/宣传册架/排队栏优先。
- recipe_book：书脊烫字（可用小尺寸印刷条）、页边分层、圆角；封面图已有。
- coupon_card / device_box：镜像方向修正并复验。
- qr_sign / payment_sign：亚克力透明质感与边缘高光（现有深色板 + 印刷面，需调材质）。
- brochure_rack：评审要求“透明亚克力兜”，现为金属隔层，恢复后改亚克力材质兜。
- sink：减弱白色水斑、加下水滤网/溢水孔、鹅颈龙头接到台面。
- chalk_tray：改成铝型材 U 形槽 + 长短不一的粉笔 + 粉笔灰（现为木槽）。
- keyboard（已通过）：正式烘焙时让空格/回车/WASD 磨亮、确认键帽字符方向；本批未改动。
- 全部 17 件：正式 2K 烘焙**必须等返工验收通过后**再做（Claude 要求）。
