# 第一单元交互与材质音效需求（D32）

> 生成：`Tools/data_npc_interactions.py` · 数据：`Content/Data/npc/interactions_unit01.json`

## 1. 总览

| 项 | 值 |
|---|---|
| 情景 | 22 |
| 物件 | 242 |
| 可交互 | 187 |
| 纯背景 | 55 |

## 2. 各情景可交互物件

| 情景 | 标题 | 地面材质 | 可交互物件 | 动作 |
|---|---|---|---|---|
| u01a_s1 | Offline day | carpet | window_wall, bookshelf, calendar, floor_lamp, coffee_table, armchair, armchair, book, book, chess_set, phone_basket, phone, phone | window_wall: open/close/look_through; bookshelf: take/place/browse; calendar: touch/flip; floor_lamp: switch_on/switch_off; coffee_table: touch/place; armchair: sit/stand; armchair: sit/stand; book: pick_up/open/read/put_down; book: pick_up/open/read/put_down; chess_set: pick_up/move/sit_near; phone_basket: pick_up/place; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap |
| u01a_s2 | Always on | carpet | window_wall, bookshelf, calendar, floor_lamp, coffee_table, sofa, phone, phone, tablet, laptop | window_wall: open/close/look_through; bookshelf: take/place/browse; calendar: touch/flip; floor_lamp: switch_on/switch_off; coffee_table: touch/place; sofa: sit/stand; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap; tablet: pick_up/put_down/tap; laptop: open/close/type/pick_up |
| u01a_s3 | Board meeting | wood | blinds, board_table, projector_screen, office_chair, office_chair, office_chair, office_chair, office_chair, office_chair, office_chair, office_chair, document_stack, document_stack, document_stack, document_stack, phone, phone | blinds: pull/raise; board_table: touch/place; projector_screen: pull_down/touch; office_chair: sit/stand/roll; office_chair: sit/stand/roll; office_chair: sit/stand/roll; office_chair: sit/stand/roll; office_chair: sit/stand/roll; office_chair: sit/stand/roll; office_chair: sit/stand/roll; office_chair: sit/stand/roll; document_stack: pick_up/leaf_through; document_stack: pick_up/leaf_through; document_stack: pick_up/leaf_through; document_stack: pick_up/leaf_through; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap |
| u01a_s4 | Alone together | grass | library_shelf, library_shelf, reading_table, chair, chair, chair, keyboard, tablet, bench, bench | library_shelf: take/place/browse; library_shelf: take/place/browse; reading_table: touch/place; chair: sit/stand/push; chair: sit/stand/push; chair: sit/stand/push; keyboard: type/press; tablet: pick_up/put_down/tap; bench: sit/stand; bench: sit/stand |
| u01a_s5 | Cockpits | wood | door, office_desk, office_desk, office_desk, office_desk, office_desk, office_desk, laptop, laptop, laptop, laptop, laptop, laptop, phone, phone, phone, phone, phone, phone, tablet, tablet, tablet, tablet, tablet, tablet, headphones, headphones, headphones, headphones, headphones, headphones | door: open/close/knock; office_desk: touch/place/open_drawer; office_desk: touch/place/open_drawer; office_desk: touch/place/open_drawer; office_desk: touch/place/open_drawer; office_desk: touch/place/open_drawer; office_desk: touch/place/open_drawer; laptop: open/close/type/pick_up; laptop: open/close/type/pick_up; laptop: open/close/type/pick_up; laptop: open/close/type/pick_up; laptop: open/close/type/pick_up; laptop: open/close/type/pick_up; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap; tablet: pick_up/put_down/tap; tablet: pick_up/put_down/tap; tablet: pick_up/put_down/tap; tablet: pick_up/put_down/tap; tablet: pick_up/put_down/tap; tablet: pick_up/put_down/tap; headphones: pick_up/put_on/take_off; headphones: pick_up/put_on/take_off; headphones: pick_up/put_on/take_off; headphones: pick_up/put_on/take_off; headphones: pick_up/put_on/take_off; headphones: pick_up/put_on/take_off |
| u01a_s6 | Sips and a swallow | wood | cafe_table, chair, chair, coffee_cup, coffee_cup | cafe_table: touch/place; chair: sit/stand/push; chair: sit/stand/push; coffee_cup: pick_up/put_down/drink; coffee_cup: pick_up/put_down/drink |
| u01a_s7 | Sacred spaces | wood | kitchen_counter, sink, dish_rack, dining_table, chair, chair, car_interior, device_box, office_desk, whiteboard, chair, chair | kitchen_counter: touch/place/lean; sink: turn_tap/wash; dish_rack: pick_up/place; dining_table: touch/place/lean; chair: sit/stand/push; chair: sit/stand/push; car_interior: sit/touch/open_door; device_box: pick_up/open/close; office_desk: touch/place/open_drawer; whiteboard: write/erase; chair: sit/stand/push; chair: sit/stand/push |
| u01a_s8 | Look up | carpet | window_wall, bookshelf, calendar, floor_lamp, coffee_table, armchair, armchair, book, book, chess_set, phone_basket, phone, phone | window_wall: open/close/look_through; bookshelf: take/place/browse; calendar: touch/flip; floor_lamp: switch_on/switch_off; coffee_table: touch/place; armchair: sit/stand; armchair: sit/stand; book: pick_up/open/read/put_down; book: pick_up/open/read/put_down; chess_set: pick_up/move/sit_near; phone_basket: pick_up/place; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap |
| u01b_s2 | Classroom | wood | student_desk, student_desk, student_desk, student_desk, blackboard, chalk_tray, duster, school_bag, textbook_stack, interactive_board, tablet, tablet, wifi_router | student_desk: touch/place/open_lid; student_desk: touch/place/open_lid; student_desk: touch/place/open_lid; student_desk: touch/place/open_lid; blackboard: write/erase; chalk_tray: take_chalk/put_back; duster: pick_up/wipe; school_bag: pick_up/open/put_down; textbook_stack: pick_up/open; interactive_board: tap/write/erase; tablet: pick_up/put_down/tap; tablet: pick_up/put_down/tap; wifi_router: press/pick_up |
| u01b_s3 | Children | wood | window_wall, sofa, playground, swing, game_console, phone | window_wall: open/close/look_through; sofa: sit/stand; playground: climb/slide/touch; swing: sit/swing/push; game_console: turn_on/press/pick_up; phone: pick_up/put_down/tap |
| u01b_s4 | Home | wood | kitchen_counter, sofa, recipe_book, tv, tv_stand, tablet, jar, laptop, laptop | kitchen_counter: touch/place/lean; sofa: sit/stand; recipe_book: pick_up/open; tv: turn_on/turn_off/touch; tv_stand: open_drawer/place; tablet: pick_up/put_down/tap; jar: pick_up/open/close; laptop: open/close/type/pick_up; laptop: open/close/type/pick_up |
| u01b_s5 | Work | wood | cubicle, cubicle, cubicle, monitor, home_desk, laptop | cubicle: sit/place/touch; cubicle: sit/place/touch; cubicle: sit/place/touch; monitor: turn_on/turn_off; home_desk: touch/place/open_drawer; laptop: open/close/type/pick_up |
| u01b_s6 | Holidays | wood | travel_counter, brochure_rack, resort_poster, home_desk, laptop, review_panel, review_panel | travel_counter: touch/place; brochure_rack: take/browse; resort_poster: read; home_desk: touch/place/open_drawer; laptop: open/close/type/pick_up; review_panel: tap/read; review_panel: tap/read |
| u01b_s7 | One street, four errands | asphalt | bank_counter, queue_rope, video_shelf, arcade_cabinet, phone, phone, laptop, game_console | bank_counter: touch/place; queue_rope: push/step_over; video_shelf: take/place; arcade_cabinet: press/play; phone: pick_up/put_down/tap; phone: pick_up/put_down/tap; laptop: open/close/type/pick_up; game_console: turn_on/press/pick_up |
| u01b_s8 | Social life and the future | stone_floor | photo_album, coffee_table | photo_album: pick_up/open; coffee_table: touch/place |
| u01c_s1 | Jianbing at dawn | wood | griddle, qr_sign | griddle: touch/cook/scrape; qr_sign: scan/touch |
| u01c_s2 | Checkout | wood | market_shelf, market_shelf, market_shelf, checkout_counter, payment_sign | market_shelf: take/place/browse; market_shelf: take/place/browse; market_shelf: take/place/browse; checkout_counter: touch/place; payment_sign: scan/touch |
| u01c_s3 | Getting around | asphalt | car, bike_rack, shared_bike, shared_bike, shared_bike, shared_bike, shared_bike | car: enter/sit/start; bike_rack: place/lock; shared_bike: scan/pick_up/ride; shared_bike: scan/pick_up/ride; shared_bike: scan/pick_up/ride; shared_bike: scan/pick_up/ride; shared_bike: scan/pick_up/ride |
| u01c_s4 | Lunch and coupons | wood | cafe_table, chair, sandwich_plate, coffee_cup, coupon_card | cafe_table: touch/place; chair: sit/stand/push; sandwich_plate: pick_up/put_down/eat; coffee_cup: pick_up/put_down/drink; coupon_card: pick_up/show/put_down |
| u01c_s5 | Boutique and mall | stone_floor | payment_sign | payment_sign: scan/touch |
| u01c_s6 | Evening bills | wood | home_desk, desk_lamp, phone, notebook, dashboard_screen | home_desk: touch/place/open_drawer; desk_lamp: switch_on/switch_off; phone: pick_up/put_down/tap; notebook: pick_up/write; dashboard_screen: touch |

## 3. 脚步声需求（按地面材质）

| 材质 | 音色 | 事件 |
|---|---|---|
| asphalt | gritty step | walk, run |
| carpet | muffled step | walk, run |
| grass | soft crush | walk, run |
| stone_floor | hard echo step | walk, run |
| wood | hollow mid knock | walk, run, jump_land, small_impact, large_impact |

## 4. 碰撞声需求（按物件材质）

| 材质 | 音色 | 事件 |
|---|---|---|
| acrylic | tight tick | tap, slide |
| aluminium | dull metal tap | lid_open, lid_close, set_down |
| cardboard | hollow soft knock | pick_up, lid_open, set_down |
| ceramic | crisp clink | pick_up, set_down, cutlery_touch |
| fabric | soft thud | walk, sit_down, stand_up, brush |
| glass | thin ring + shatter (no destruction in unit 1) | tap, set_down, slide |
| iron | heavy metallic thud | touch, scrape |
| laminate | hard flat knock | walk, run, object_drop |
| metal | metallic clang | walk, knock, impact, door_latch |
| paper | soft rustle | pick_up, page_flip, crumple |
| plastic | light clack | pick_up, button_press, set_down |
| stone | hard clack | walk, run, cup_set_down |
| wood | dry knock | walk, run, jump_land, small_impact, large_impact |

## 5. 给 Codex 的实现备注

- 第一人称：眼高按角色身高，水平 FOV ~80°，走路头部起伏；脚步声与步频同步（0.5–0.6 s/步）。
- 门/抽屉/柜门用铰链或滑轨约束；布料（窗帘、桌布、沙发）用 Chaos Cloth。
- 可拿物件用真实质量；小物件（杯子、书、手机）触发抓取点与手部 IK。
- 碰撞声按材质分档（轻/中/重），避免每次碰撞同一采样；同一材质至少 3 个变体。
- 交互提示不显示 UI/准星，只用注视高亮 + 轻微描边。
