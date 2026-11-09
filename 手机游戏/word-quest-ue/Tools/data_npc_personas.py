#!/usr/bin/env python3
"""D29 全员 NPC 人设生成器（unit 01）。

Offline day 的四位家庭成员（paul/maria/jason/jack）是手写人设，此脚本只补齐其余 `people[].role`。
每个角色输出 Content/Data/npc/personas/<role>.json，字段同 deepseek-round10.md 的 D29 规范：
基本信息 / appearance（character 七选一）/ personality / voice / scene_ids + schedule / backstory /
knowledge / teaching / boundaries / fallback_lines。

用法：python3 Tools/data_npc_personas.py [--force]
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCENES = ROOT / "Content/Data/memory/textbook_scenes/unit01.json"
WORDS = ROOT / "Content/Data/textbook/rw3/words.csv"
OUT = ROOT / "Content/Data/npc/personas"
HANDWRITTEN = {"paul", "maria", "jason", "jack"}
CHARACTERS = ["me2026", "lin", "mei", "an", "rui", "organizer", "old2090"]

BOUNDARIES = {
    "avoid": ["politics", "religion", "violence", "adult content", "romance with the learner"],
    "safety": ["If the learner seems distressed, gently suggest talking to a parent or teacher.",
               "Never ask for addresses, phone numbers, passwords or money."],
    "never_pretend": ["a real living person", "an AI or a language model", "a character from a textbook"],
}
P2026 = ["The year is 2026; smartphones, tablets, wifi and video calls exist.",
         "English is the language the learner is practising; Chinese is their first language."]

NAME_POOLS = {
    "office": ["Daniel", "Grace", "Victor", "Priya", "Marcus", "Elena", "Samuel", "Nina", "Owen", "Tara"],
    "campus": ["Leo", "Maya", "Ethan", "Sophie", "Noah", "Ivy", "Ben", "Chloe", "Ryan", "Zoe"],
    "law": ["Andrew", "Rachel", "Peter", "Diana", "Nathan", "Laura", "Charles", "Meera", "Tom", "Julia"],
    "family": ["George", "Linda", "Megan", "Oliver", "Ruby", "Henry", "Clara", "Jamal"],
    "school": ["Ms. Harper", "Mr. Ellis", "Amelia", "Bo", "Cathy", "Dev", "Emma", "Finn", "Gina", "Hugo"],
    "service": ["Wen", "Aisha", "Marco", "Lily", "Ravi", "Sofia", "Chen", "Nadia"],
}

GROUPS = {
    "executive_": {"pool": "office", "ages": (38, 55), "occupation": "company executive in a board meeting",
                   "traits": ["composed", "impatient", "status-aware"], "voice": ("Daniel", 165, 40),
                   "clothes": "dark tailored suit, white shirt, quiet tie", "hair": "short, carefully combed",
                   "knows": ["how board meetings work", "office etiquette"]},
    "associate_": {"pool": "law", "ages": (26, 34), "occupation": "junior associate at a law firm",
                   "traits": ["tired", "careful", "eager to please"], "voice": ("Karen", 172, 55),
                   "clothes": "grey office shirt, sleeves rolled, headphones around the neck", "hair": "tidy but a little flat",
                   "knows": ["legal paperwork", "how to stay awake at a desk"]},
    "senior_partner": {"pool": "law", "ages": (48, 60), "occupation": "senior partner at a law firm",
                       "traits": ["watchful", "terse", "fair"], "voice": ("Moira", 158, 48),
                       "clothes": "charcoal suit, silver watch", "hair": "silver-streaked, swept back",
                       "knows": ["how a firm is run", "what a good trainee looks like"]},
    "student_": {"pool": "campus", "ages": (19, 24), "occupation": "university student",
                 "traits": ["distracted", "curious", "sociable"], "voice": ("Rishi", 178, 62),
                 "clothes": "hoodie, jeans, canvas bag", "hair": "casual, unstyled",
                 "knows": ["campus life", "student apps and deadlines"]},
    "engineer_": {"pool": "campus", "ages": (24, 34), "occupation": "software engineer at a tech company",
                  "traits": ["focused", "literal", "dryly funny"], "voice": ("Alex", 170, 45),
                  "clothes": "plain T-shirt, light jacket, lanyard", "hair": "short and practical",
                  "knows": ["source code", "how to debug a system"]},
    "worker_": {"pool": "office", "ages": (26, 45), "occupation": "office worker",
                "traits": ["busy", "polite", "slightly rushed"], "voice": ("Tessa", 172, 55),
                "clothes": "office blouse or shirt, thin cardigan", "hair": "neat everyday cut",
                "knows": ["office routines", "how to write a short email"]},
    "remote_worker": {"pool": "office", "ages": (28, 42), "occupation": "remote worker on a video call",
                      "traits": ["organised", "friendly", "self-deprecating"], "voice": ("Daniel", 168, 42),
                      "clothes": "smart shirt on top, comfortable trousers below", "hair": "neat but relaxed",
                      "knows": ["video meeting etiquette", "working from home"]},
    "child_": {"pool": "school", "ages": (7, 11), "occupation": "primary-school child",
               "traits": ["energetic", "blunt", "imaginative"], "voice": ("Fred", 180, 68),
               "clothes": "bright jumper, shorts, scuffed trainers", "hair": "messy, with a cowlick",
               "knows": ["games", "animals", "cartoons"]},
    "pupil_": {"pool": "school", "ages": (13, 16), "occupation": "secondary-school pupil",
               "traits": ["curious", "self-conscious", "chatty in a whisper"], "voice": ("Rishi", 175, 60),
               "clothes": "school jumper, white shirt, loose tie", "hair": "short school cut",
               "knows": ["school subjects", "classroom rules"]},
    "sibling_": {"pool": "family", "ages": (10, 16), "occupation": "school student",
                 "traits": ["teasing", "loyal", "restless"], "voice": ("Rishi", 178, 62),
                 "clothes": "home clothes, hoodie", "hair": "casual",
                 "knows": ["family habits", "games"]},
    "parent": {"pool": "family", "ages": (38, 50), "occupation": "parent juggling home and work",
               "traits": ["warm", "practical", "tired but present"], "voice": ("Samantha", 168, 55),
               "clothes": "comfortable home clothes, apron", "hair": "tied back while cooking",
               "knows": ["family routines", "how to cook for four"]},
    "family_": {"pool": "family", "ages": (30, 55), "occupation": "family member visiting home",
                "traits": ["easy-going", "observant", "fond of small talk"], "voice": ("Samantha", 168, 54),
                "clothes": "weekend clothes, soft jumper", "hair": "everyday style",
                "knows": ["family stories", "local shops"]},
    "friend_": {"pool": "campus", "ages": (20, 26), "occupation": "university friend",
                "traits": ["lively", "blunt", "loyal"], "voice": ("Tessa", 175, 58),
                "clothes": "casual jacket, tote bag", "hair": "loose, casual",
                "knows": ["campus gossip", "coffee places"]},
    "colleague_": {"pool": "office", "ages": (25, 40), "occupation": "colleague at the same company",
                   "traits": ["sociable", "wry", "distracted by phones"], "voice": ("Karen", 170, 55),
                   "clothes": "office casual, lanyard", "hair": "practical",
                   "knows": ["office projects", "who is in which meeting"]},
    "queue_": {"pool": "service", "ages": (22, 55), "occupation": "customer waiting in a queue",
               "traits": ["impatient", "chatty", "practical"], "voice": ("Rishi", 172, 55),
               "clothes": "everyday coat, shopping bag", "hair": "everyday",
               "knows": ["how long queues take", "local errands"]},
    "driver": {"pool": "service", "ages": (30, 55), "occupation": "city driver",
               "traits": ["patient", "watchful", "quietly funny"], "voice": ("Daniel", 165, 42),
               "clothes": "dark jacket, comfortable shoes", "hair": "short",
               "knows": ["city roads", "traffic"]},
    "passenger": {"pool": "family", "ages": (20, 45), "occupation": "passenger on the way home",
                  "traits": ["tired", "friendly", "curious"], "voice": ("Samantha", 168, 54),
                  "clothes": "coat, bag on the lap", "hair": "everyday",
                  "knows": ["the route home", "the day's small news"]},
    "teacher": {"pool": "school", "ages": (30, 50), "occupation": "English teacher",
                "traits": ["encouraging", "precise", "patient"], "voice": ("Moira", 162, 50),
                "clothes": "smart cardigan, lanyard, chalk-dusted sleeves", "hair": "neat, practical",
                "knows": ["how to explain a word simply", "classroom routines"]},
    "travel_agent": {"pool": "service", "ages": (25, 45), "occupation": "travel agency clerk",
                     "traits": ["cheerful", "organised", "persuasive"], "voice": ("Karen", 172, 56),
                     "clothes": "agency blazer, name badge", "hair": "neat",
                     "knows": ["holiday packages", "ticket rules"]},
    "stall_owner": {"pool": "service", "ages": (35, 55), "occupation": "street-food stall owner",
                    "traits": ["quick", "warm", "proud of the food"], "voice": ("Rishi", 168, 50),
                    "clothes": "apron over a warm jacket", "hair": "covered for cooking",
                    "knows": ["how to make jianbing", "morning customers"]},
    "cashier": {"pool": "service", "ages": (22, 45), "occupation": "supermarket cashier",
                "traits": ["efficient", "polite", "observer of small habits"], "voice": ("Tessa", 172, 56),
                "clothes": "shop uniform, name badge", "hair": "tidy",
                "knows": ["checkout routine", "how to scan coupons"]},
    "waitress": {"pool": "service", "ages": (20, 40), "occupation": "café waitress",
                 "traits": ["brisk", "friendly", "good memory"], "voice": ("Samantha", 172, 56),
                 "clothes": "café apron, dark shirt", "hair": "tied back",
                 "knows": ["the menu", "the lunch rush"]},
    "me": {"pool": "campus", "ages": (20, 28), "occupation": "the learner's own character (player avatar)",
           "traits": ["curious", "polite", "trying their English"], "voice": ("Samantha", 170, 55),
           "clothes": "everyday student clothes", "hair": "the player's chosen look",
           "knows": ["their own day", "that they are practising English"]},
}

POSE_ACTIVITY = {
    "sit_read": "reading", "sit_phone": "checking a phone", "sit_chess": "playing chess",
    "sit_tablet": "using a tablet", "sit_text_under_table": "texting under the table during a meeting",
    "sit_type": "typing at a desk", "sit_laptop": "working on a laptop", "sit_headphones": "listening with headphones",
    "stand_watch": "watching quietly", "sit_talk": "talking with someone", "sit_listen": "listening",
    "cook_hectic": "cooking in a hurry", "wash_dishes": "washing dishes", "talk": "talking",
    "sit_drive": "driving", "stand_point": "pointing at the board", "sit_game": "playing a game",
    "play_swing": "playing on a swing", "run": "running around", "sit_watch": "watching TV",
    "sit_video_call": "on a video call", "stand_sell": "serving a customer", "stand_wait": "waiting in line",
    "cook": "cooking", "stand": "standing at the till", "stand_talk": "serving a table",
    "scan_bike": "scanning a shared bike", "scan_pay": "paying with a phone", "sit_browse": "browsing",
    "stand_look": "looking around", "stand_look_up": "looking up from a screen", "walk_phone": "walking while using a phone",
}

GENERIC_TARGETS = ["scenario", "convention", "device", "identical", "executive", "enthusiast", "immerse", "alter", "assess", "burden"]


def load_declared_words():
    import csv
    with WORDS.open(encoding="utf-8-sig") as handle:
        return {row["word"].lower().strip(): row["word"].strip() for row in csv.DictReader(handle) if row.get("word")}


def group_for(role):
    for prefix in sorted(GROUPS, key=len, reverse=True):
        if role == prefix or role.startswith(prefix):
            return GROUPS[prefix], prefix
    return GROUPS["colleague_"], "colleague_"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    data = json.loads(SCENES.read_text(encoding="utf-8"))
    declared = load_declared_words()
    roles = {}
    for article in data["articles"]:
        for scene in article["scenes"]:
            for person in scene.get("people", []):
                role = person["role"]
                if role in HANDWRITTEN:
                    continue
                entry = roles.setdefault(role, {"scenes": [], "poses": [], "words": set(), "titles": []})
                entry["scenes"].append(scene["id"])
                entry["poses"].append(person.get("pose", "stand"))
                entry["titles"].append(scene.get("title", ""))
                for item in scene.get("text_words", []):
                    entry["words"].add(item["word"])
    used_names = set()
    for index, (role, info) in enumerate(sorted(roles.items())):
        group, prefix = group_for(role)
        pool = NAME_POOLS[group["pool"]]
        name = next((n for n in pool if n not in used_names), None)
        if not name:
            name = "Neighbour %d" % (index + 1)
        used_names.add(name)
        age_low, age_high = group["ages"]
        age = age_low + (index * 3) % max(1, (age_high - age_low))
        character = CHARACTERS[index % len(CHARACTERS)]
        schedule = []
        for scene_id, title, pose in zip(info["scenes"], info["titles"], info["poses"]):
            schedule.append({"scene": scene_id, "title": title, "activity": POSE_ACTIVITY.get(pose, "standing nearby")})
        words = [declared[w.lower()] for w in sorted(info["words"]) if w.lower() in declared]
        for candidate in GENERIC_TARGETS:
            if len(words) >= 6:
                break
            if candidate in declared and declared[candidate] not in words:
                words.append(declared[candidate])
        target_words = words[:6]
        persona = {
            "role": role,
            "display_name": name,
            "age": age,
            "occupation": group["occupation"],
            "player_avatar": role == "me",
            "appearance": {"character": character, "clothing": group["clothes"], "hair": group["hair"],
                           "notes": "Character slot is provisional; Claude/Codex should swap in a bespoke MetaHuman for this background role."},
            "personality": {"traits": group["traits"],
                            "speaking_style": "Speaks in short everyday sentences, reacts to what is in front of them, and asks one small question back."},
            "voice": {"name": group["voice"][0], "rate": group["voice"][1], "pitch": group["voice"][2]},
            "scene_ids": info["scenes"],
            "schedule": schedule,
            "backstory": "Originally from a nearby town, now part of the everyday life of Unit 1's 2026 city. "
                         "They are %s; a small habit of theirs is noticing details other people walk past. "
                         "They have never met the learner before this scene." % group["occupation"],
            "knowledge": {"knows": P2026 + group["knows"],
                          "does_not_know": ["Anything after 2026, including 2090 technology.",
                                             "The learner's private life, marks or family problems.",
                                             "That they are inside a textbook or a game."]},
            "teaching": {"target_words": target_words or GENERIC_TARGETS[:5],
                         "level": "B1–B2",
                         "correction_style": "Repeats the correct phrase naturally inside their own answer, once, and keeps the conversation moving without saying 'wrong'."},
            "boundaries": BOUNDARIES,
            "fallback_lines": ["Sorry, I didn't catch that — say it again?",
                               "It's busy today, isn't it?",
                               "I'm in the middle of something, but I can talk for a minute.",
                               "What do you think about all this?",
                               "Let's keep it simple — one step at a time."],
        }
        path = OUT / (role + ".json")
        if path.exists() and not args.force:
            continue
        path.write_text(json.dumps(persona, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print("PERSONAS_WRITTEN", len(list(OUT.glob("*.json"))), "roles")


if __name__ == "__main__":
    main()
