"""D16：角色动作清单 → Content/Data/anim/anim_manifest.csv（只写规格，不含素材）。"""
from __future__ import annotations

import csv
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
OUT = PROJECT / "Content" / "Data" / "anim" / "anim_manifest.csv"
FIELDS = ["anim_id", "character", "category", "loop", "priority", "source"]

# (character, action, category, loop, priority, source)
ROWS = [
    # 通用移动（P2 环境/玩法）
    *[(c, "walk", "locomotion", "true", "P2", "mocap") for c in ("me2026", "lin", "mei", "an", "rui", "organizer", "old2090")],
    *[(c, "idle_stand", "locomotion", "true", "P2", "mocap") for c in ("me2026", "lin", "mei", "an", "rui", "organizer", "old2090")],
    ("me2026", "run", "locomotion", "true", "P2", "mocap"), ("an", "run", "locomotion", "true", "P2", "mocap"),
    ("old2090", "walk_slow_cane", "locomotion", "true", "P1", "procedural"),
    *[(c, "sit_down", "classroom", "false", "P1", "mocap") for c in ("me2026", "lin", "mei", "an", "rui", "old2090")],
    *[(c, "stand_up", "classroom", "false", "P1", "mocap") for c in ("me2026", "lin", "mei", "an", "rui", "old2090")],
    *[(c, "idle_sit", "classroom", "true", "P2", "mocap") for c in ("me2026", "lin", "mei", "an", "rui", "organizer")],
    # 课堂动作
    *[(c, "write", "classroom", "true", "P2", "handkey") for c in ("me2026", "mei", "rui", "lin")],
    *[(c, "read_book", "classroom", "true", "P2", "handkey") for c in ("me2026", "lin", "rui", "mei")],
    ("mei", "turn_page", "classroom", "false", "P1", "handkey"), ("rui", "turn_page", "classroom", "false", "P1", "handkey"),
    *[(c, "raise_hand", "classroom", "false", "P1", "handkey") for c in ("mei", "an", "me2026")],
    *[(c, "look_blackboard", "classroom", "true", "P2", "procedural") for c in ("me2026", "lin", "mei", "an", "rui")],
    *[(c, "head_turn", "social", "false", "P1", "procedural") for c in ("me2026", "lin", "mei", "an", "rui", "organizer", "old2090")],
    # 说话/社交手势
    *[(c, "talk_gesture", "social", "true", "P1", "mocap") for c in ("mei", "an", "organizer", "me2026")],
    ("mei", "laugh", "social", "false", "P1", "mocap"), ("an", "laugh", "social", "false", "P1", "mocap"),
    ("organizer", "nod", "social", "false", "P1", "handkey"), ("rui", "nod", "social", "false", "P1", "handkey"),
    ("an", "shrug", "social", "false", "P1", "handkey"),
    ("organizer", "hold_cup", "social", "true", "P2", "procedural"),
    ("rui", "adjust_glasses", "social", "false", "P1", "handkey"),
    ("old2090", "adjust_glasses", "social", "false", "P1", "handkey"),
    ("old2090", "hand_tremble", "social", "true", "P2", "procedural"),
    ("me2026", "sigh", "social", "false", "P1", "handkey"), ("old2090", "sigh", "social", "false", "P1", "handkey"),
    # 面部表情（ARKit 曲线组合，see Docs/design/animation-spec.md §4）
    *[(c, "face_idle", "face", "true", "P2", "procedural") for c in ("me2026", "lin", "mei", "an", "rui", "organizer", "old2090")],
    ("me2026", "face_smile_warm", "face", "false", "P1", "procedural"),
    ("lin", "face_smile_soft", "face", "false", "P1", "procedural"),
    ("mei", "face_smile_tense", "face", "false", "P1", "procedural"),
    ("an", "face_surprise", "face", "false", "P1", "procedural"),
    ("old2090", "face_recall_gaze", "face", "true", "P1", "procedural"),
    ("old2090", "face_sigh_grief", "face", "false", "P1", "procedural"),
]


def write() -> int:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    seen = set()
    rows = []
    for character, action, category, loop, priority, source in ROWS:
        anim_id = f"{character}_{action}"
        if anim_id in seen:
            continue
        seen.add(anim_id)
        rows.append((anim_id, character, category, loop, priority, source))
    with OUT.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(FIELDS)
        w.writerows(rows)
    return len(rows)


if __name__ == "__main__":
    print(f"[D16] {write()} rows -> {OUT}")
