#!/usr/bin/env python3
"""D32：第一单元可交互物件清单 + 材质音效需求（给 Codex 的物理/交互系统）。

输入 Content/Data/memory/textbook_scenes/unit01.json
输出 Content/Data/npc/interactions_unit01.json
     Docs/qa/interaction-audio-spec.md（脚步声 / 碰撞声需求）
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCENES = ROOT / "Content/Data/memory/textbook_scenes/unit01.json"
OUT = ROOT / "Content/Data/npc/interactions_unit01.json"
AUDIO_MD = ROOT / "Docs/qa/interaction-audio-spec.md"

# kit -> (category, material, actions, physics note)
KIT_RULES = {
    "door": ("opening", "wood", ["open", "close", "knock"], "hinge constraint, 1 dof, mass 18 kg"),
    "window_wall": ("opening", "glass", ["open", "close", "look_through"], "sliding constraint, 2 dof"),
    "blinds": ("opening", "fabric", ["pull", "raise"], "cloth + spring, 1 dof"),
    "interactive_board": ("opening", "glass", ["tap", "write", "erase"], "screen surface, stylus hit"),
    "whiteboard": ("opening", "metal", ["write", "erase"], "marker contact, no physics body"),
    "blackboard": ("opening", "stone", ["write", "erase"], "chalk contact"),
    "school_bag": ("container", "fabric", ["pick_up", "open", "put_down"], "mass 2.2 kg, soft body strap"),
    "device_box": ("container", "cardboard", ["pick_up", "open", "close"], "mass 0.6 kg, lid hinge"),
    "phone_basket": ("container", "wood", ["pick_up", "place"], "mass 1.1 kg"),
    "jar": ("container", "glass", ["pick_up", "open", "close"], "mass 0.5 kg"),
    "photo_album": ("container", "paper", ["pick_up", "open"], "mass 0.8 kg"),
    "chair": ("seating", "wood", ["sit", "stand", "push"], "mass 4.5 kg, floor friction 0.5"),
    "office_chair": ("seating", "plastic", ["sit", "stand", "roll"], "mass 8 kg, castors"),
    "armchair": ("seating", "fabric", ["sit", "stand"], "mass 22 kg, heavy"),
    "sofa": ("seating", "fabric", ["sit", "stand"], "mass 45 kg, cloth simulation"),
    "bench": ("seating", "wood", ["sit", "stand"], "mass 30 kg, fixed"),
    "table": ("surface", "wood", ["touch", "place", "lean"], "static, surface contact"),
    "coffee_table": ("surface", "wood", ["touch", "place"], "static"),
    "dining_table": ("surface", "wood", ["touch", "place", "lean"], "static"),
    "cafe_table": ("surface", "wood", ["touch", "place"], "static"),
    "home_desk": ("surface", "wood", ["touch", "place", "open_drawer"], "drawer slider"),
    "office_desk": ("surface", "laminate", ["touch", "place", "open_drawer"], "drawer slider"),
    "student_desk": ("surface", "laminate", ["touch", "place", "open_lid"], "lid hinge"),
    "board_table": ("surface", "wood", ["touch", "place"], "static"),
    "reading_table": ("surface", "wood", ["touch", "place"], "static"),
    "kitchen_counter": ("surface", "stone", ["touch", "place", "lean"], "static"),
    "checkout_counter": ("surface", "laminate", ["touch", "place"], "static"),
    "travel_counter": ("surface", "laminate", ["touch", "place"], "static"),
    "bank_counter": ("surface", "stone", ["touch", "place"], "static"),
    "market_shelf": ("storage", "metal", ["take", "place", "browse"], "shelf static, items physics"),
    "bookshelf": ("storage", "wood", ["take", "place", "browse"], "shelf static, books physics"),
    "library_shelf": ("storage", "wood", ["take", "place", "browse"], "shelf static"),
    "video_shelf": ("storage", "wood", ["take", "place"], "shelf static"),
    "tv_stand": ("storage", "wood", ["open_drawer", "place"], "drawer slider"),
    "cubicle": ("storage", "fabric", ["sit", "place", "touch"], "partitions static"),
    "coffee_cup": ("tableware", "ceramic", ["pick_up", "put_down", "drink"], "mass 0.25 kg, liquid"),
    "sandwich_plate": ("tableware", "ceramic", ["pick_up", "put_down", "eat"], "mass 0.6 kg, food pieces"),
    "dish_rack": ("tableware", "metal", ["pick_up", "place"], "static rack, plates physics"),
    "griddle": ("appliance", "iron", ["touch", "cook", "scrape"], "hot surface, no pick up"),
    "sink": ("appliance", "metal", ["turn_tap", "wash"], "water VFX + splash audio"),
    "tv": ("device", "glass", ["turn_on", "turn_off", "touch"], "screen emissive"),
    "monitor": ("device", "glass", ["turn_on", "turn_off"], "screen emissive"),
    "dashboard_screen": ("device", "glass", ["touch"], "screen emissive"),
    "projector_screen": ("device", "fabric", ["pull_down", "touch"], "cloth + spring"),
    "game_console": ("device", "plastic", ["turn_on", "press", "pick_up"], "mass 3 kg"),
    "arcade_cabinet": ("device", "wood", ["press", "play"], "static"),
    "phone": ("device", "glass", ["pick_up", "put_down", "tap"], "mass 0.2 kg"),
    "tablet": ("device", "glass", ["pick_up", "put_down", "tap"], "mass 0.5 kg"),
    "laptop": ("device", "aluminium", ["open", "close", "type", "pick_up"], "lid hinge, mass 1.4 kg"),
    "keyboard": ("device", "plastic", ["type", "press"], "keys depress 1 mm"),
    "headphones": ("device", "plastic", ["pick_up", "put_on", "take_off"], "mass 0.3 kg, head socket"),
    "wifi_router": ("device", "plastic", ["press", "pick_up"], "mass 0.4 kg"),
    "floor_lamp": ("light", "metal", ["switch_on", "switch_off"], "switch + light change"),
    "desk_lamp": ("light", "metal", ["switch_on", "switch_off"], "switch + light change"),
    "book": ("paper", "paper", ["pick_up", "open", "read", "put_down"], "mass 0.5 kg, page flip"),
    "textbook_stack": ("paper", "paper", ["pick_up", "open"], "mass 1.2 kg"),
    "document_stack": ("paper", "paper", ["pick_up", "leaf_through"], "mass 0.4 kg"),
    "notebook": ("paper", "paper", ["pick_up", "write"], "mass 0.3 kg"),
    "calendar": ("paper", "paper", ["touch", "flip"], "wall fixed"),
    "recipe_book": ("paper", "paper", ["pick_up", "open"], "mass 0.8 kg"),
    "menu": ("paper", "paper", ["pick_up", "read"], "mass 0.1 kg"),
    "coupon_card": ("paper", "paper", ["pick_up", "show", "put_down"], "mass 0.01 kg"),
    "qr_sign": ("signage", "acrylic", ["scan", "touch"], "static"),
    "payment_sign": ("signage", "acrylic", ["scan", "touch"], "static"),
    "brochure_rack": ("signage", "metal", ["take", "browse"], "static rack, brochures physics"),
    "review_panel": ("signage", "glass", ["tap", "read"], "static"),
    "resort_poster": ("signage", "paper", ["read"], "static"),
    "queue_rope": ("furniture", "fabric", ["push", "step_over"], "belt spring, posts fixed"),
    "chess_set": ("game", "wood", ["pick_up", "move", "sit_near"], "pieces 12 g, board static"),
    "duster": ("cleaning", "wood", ["pick_up", "wipe"], "felt contact"),
    "chalk_tray": ("cleaning", "metal", ["take_chalk", "put_back"], "chalk mass 8 g"),
    "shared_bike": ("vehicle", "metal", ["scan", "pick_up", "ride"], "wheel physics, 15 kg"),
    "bike_rack": ("vehicle", "metal", ["place", "lock"], "static"),
    "car": ("vehicle", "metal", ["enter", "sit", "start"], "driving, heavy"),
    "car_interior": ("vehicle", "fabric", ["sit", "touch", "open_door"], "interior static"),
    "swing": ("playground", "metal", ["sit", "swing", "push"], "rope + hinge"),
    "playground": ("playground", "plastic", ["climb", "slide", "touch"], "static"),
}

MATERIAL_AUDIO = {
    "wood": {"footstep": "hollow mid knock", "collision": "dry knock", "needs": ["walk", "run", "jump_land", "small_impact", "large_impact"]},
    "laminate": {"footstep": "tight mid tap", "collision": "hard flat knock", "needs": ["walk", "run", "object_drop"]},
    "stone": {"footstep": "bright tap", "collision": "hard clack", "needs": ["walk", "run", "cup_set_down"]},
    "glass": {"footstep": "n/a", "collision": "thin ring + shatter (no destruction in unit 1)", "needs": ["tap", "set_down", "slide"]},
    "metal": {"footstep": "ringing step", "collision": "metallic clang", "needs": ["walk", "knock", "impact", "door_latch"]},
    "aluminium": {"footstep": "n/a", "collision": "dull metal tap", "needs": ["lid_open", "lid_close", "set_down"]},
    "ceramic": {"footstep": "n/a", "collision": "crisp clink", "needs": ["pick_up", "set_down", "cutlery_touch"]},
    "paper": {"footstep": "n/a", "collision": "soft rustle", "needs": ["pick_up", "page_flip", "crumple"]},
    "fabric": {"footstep": "soft muffled step", "collision": "soft thud", "needs": ["walk", "sit_down", "stand_up", "brush"]},
    "leather": {"footstep": "n/a", "collision": "soft creak", "needs": ["sit_down", "hand_contact"]},
    "plastic": {"footstep": "n/a", "collision": "light clack", "needs": ["pick_up", "button_press", "set_down"]},
    "iron": {"footstep": "n/a", "collision": "heavy metallic thud", "needs": ["touch", "scrape"]},
    "cardboard": {"footstep": "n/a", "collision": "hollow soft knock", "needs": ["pick_up", "lid_open", "set_down"]},
    "acrylic": {"footstep": "n/a", "collision": "tight tick", "needs": ["tap", "slide"]},
    "water": {"footstep": "n/a", "collision": "water splash", "needs": ["tap_on", "tap_off", "splash", "drain"]},
    "stone_floor": {"footstep": "hard echo step", "collision": "n/a", "needs": ["walk", "run"]},
    "asphalt": {"footstep": "gritty step", "collision": "n/a", "needs": ["walk", "run"]},
    "grass": {"footstep": "soft crush", "collision": "n/a", "needs": ["walk", "run"]},
    "carpet": {"footstep": "muffled step", "collision": "n/a", "needs": ["walk", "run"]},
}
FLOOR_RULES = {"street": "asphalt", "lawn": "grass", "rug": "carpet", "city_skyline": "stone_floor", "mall_atrium": "stone_floor"}


def main():
    data = json.loads(SCENES.read_text(encoding="utf-8"))
    scenes_out = []
    materials_used = set()
    for article in data["articles"]:
        for scene in article["scenes"]:
            props = []
            floor = "wood"
            for kit, material in FLOOR_RULES.items():
                if any((p.get("kit") == kit) for p in scene.get("props", [])):
                    floor = material
            for index, prop in enumerate(scene.get("props", [])):
                kit = prop.get("kit") or "prop"
                rule = KIT_RULES.get(kit)
                if rule:
                    category, material, actions, physics = rule
                    interactive = True
                else:
                    category, material, actions, physics = "decor", "mixed", [], "static"
                    interactive = False
                materials_used.add(material)
                props.append({
                    "prop_id": "%s_prop_%03d" % (scene["id"], index),
                    "kit": kit,
                    "pos": prop.get("pos"),
                    "size": prop.get("size"),
                    "layer": prop.get("layer"),
                    "interactive": interactive,
                    "category": category,
                    "material": material,
                    "actions": actions,
                    "physics": physics,
                })
            scenes_out.append({"scene": scene["id"], "title": scene.get("title", ""), "section": article["section"],
                               "floor_material": floor, "props": props})
    payload = {
        "unit": 1,
        "generated_from": "Content/Data/memory/textbook_scenes/unit01.json",
        "notes": "每件可交互物件的动作、约束和物理质量估计；decor 表示不可交互背景。给 Codex 的物理/交互系统。",
        "scenes": scenes_out,
        "audio_requirements": {
            "footsteps": [{"surface": s, "description": MATERIAL_AUDIO.get(s, {}).get("footstep", ""),
                           "events": MATERIAL_AUDIO.get(s, {}).get("needs", [])} for s in sorted({sc["floor_material"] for sc in scenes_out})],
            "collisions": [{"material": m, "description": MATERIAL_AUDIO[m]["collision"], "events": MATERIAL_AUDIO[m]["needs"]}
                           for m in sorted(materials_used) if m in MATERIAL_AUDIO],
        },
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    total = sum(len(sc["props"]) for sc in scenes_out)
    interactive = sum(1 for sc in scenes_out for p in sc["props"] if p["interactive"])
    lines = ["# 第一单元交互与材质音效需求（D32）", "",
             "> 生成：`Tools/data_npc_interactions.py` · 数据：`Content/Data/npc/interactions_unit01.json`", "",
             "## 1. 总览", "", "| 项 | 值 |", "|---|---|",
             "| 情景 | %d |" % len(scenes_out), "| 物件 | %d |" % total, "| 可交互 | %d |" % interactive,
             "| 纯背景 | %d |" % (total - interactive), "", "## 2. 各情景可交互物件", "",
             "| 情景 | 标题 | 地面材质 | 可交互物件 | 动作 |", "|---|---|---|---|---|"]
    for sc in scenes_out:
        items = [p for p in sc["props"] if p["interactive"]]
        if not items:
            continue
        lines.append("| %s | %s | %s | %s | %s |" % (
            sc["scene"], sc["title"], sc["floor_material"],
            ", ".join(p["kit"] for p in items),
            "; ".join("%s: %s" % (p["kit"], "/".join(p["actions"])) for p in items)))
    lines += ["", "## 3. 脚步声需求（按地面材质）", "", "| 材质 | 音色 | 事件 |", "|---|---|---|"]
    for item in payload["audio_requirements"]["footsteps"]:
        lines.append("| %s | %s | %s |" % (item["surface"], item["description"], ", ".join(item["events"])))
    lines += ["", "## 4. 碰撞声需求（按物件材质）", "", "| 材质 | 音色 | 事件 |", "|---|---|---|"]
    for item in payload["audio_requirements"]["collisions"]:
        lines.append("| %s | %s | %s |" % (item["material"], item["description"], ", ".join(item["events"])))
    lines += ["", "## 5. 给 Codex 的实现备注", "",
              "- 第一人称：眼高按角色身高，水平 FOV ~80°，走路头部起伏；脚步声与步频同步（0.5–0.6 s/步）。",
              "- 门/抽屉/柜门用铰链或滑轨约束；布料（窗帘、桌布、沙发）用 Chaos Cloth。",
              "- 可拿物件用真实质量；小物件（杯子、书、手机）触发抓取点与手部 IK。",
              "- 碰撞声按材质分档（轻/中/重），避免每次碰撞同一采样；同一材质至少 3 个变体。",
              "- 交互提示不显示 UI/准星，只用注视高亮 + 轻微描边。", ""]
    AUDIO_MD.write_text("\n".join(lines), encoding="utf-8")
    print("INTERACTIONS", OUT, "props", total, "interactive", interactive)


if __name__ == "__main__":
    main()
