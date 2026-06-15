#!/usr/bin/env python3
"""生成四级/六级听力、阅读、翻译仿真题内容。"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "content"


READING_TEMPLATES = [
    {
        "title": "Campus Library Hours Extended",
        "passage": (
            "Starting next semester, the main campus library will extend weekday hours until midnight "
            "during exam periods. The change responds to student requests for safer and quieter study "
            "spaces after evening classes. Laptop loans and group rooms can be reserved through the "
            "library app. Staff remind students that extended hours do not reduce the need for sleep."
        ),
        "questions": [
            {
                "question": "Why are library hours extended?",
                "options": [
                    "To reduce staff workload",
                    "To meet student study needs",
                    "To host concerts",
                    "To close other buildings",
                ],
                "answer": 1,
            }
        ],
    },
    {
        "title": "Remote Internships Gain Popularity",
        "passage": (
            "A recent survey shows that more undergraduates choose remote internships. Students value "
            "flexible schedules and lower commuting costs. Employers, however, worry about communication "
            "delays. Career advisors suggest setting weekly goals and documenting outcomes to make remote "
            "experience visible in future interviews."
        ),
        "questions": [
            {
                "question": "What do career advisors recommend?",
                "options": [
                    "Avoid remote internships",
                    "Set weekly goals and record results",
                    "Work without communication",
                    "Quit after one week",
                ],
                "answer": 1,
            }
        ],
    },
]


LISTENING_TEMPLATES = [
    {
        "title": "Conversation at the Bookstore",
        "script": (
            "W: Do you have the new edition of the writing guide?\n"
            "M: Yes, but the paperback is sold out. The e-book is available.\n"
            "W: Then I'll take the e-book. I need it for next week's class.\n"
            "M: Great. I can email you the download link in two minutes."
        ),
        "questions": [
            {
                "question": "What will the woman probably do?",
                "options": [
                    "Wait for the paperback",
                    "Buy the e-book",
                    "Cancel the class",
                    "Borrow a magazine",
                ],
                "answer": 1,
            }
        ],
    },
    {
        "title": "Announcement in the Gym",
        "script": (
            "Attention please. Due to maintenance, the swimming pool will close at 4 p.m. today. "
            "Morning swim classes are unaffected. Members may use the running track instead. "
            "We apologize for the inconvenience."
        ),
        "questions": [
            {
                "question": "What is closed this afternoon?",
                "options": ["The running track", "The swimming pool", "The cafeteria", "The library"],
                "answer": 1,
            }
        ],
    },
]


TRANSLATION_TEMPLATES = [
    {
        "zh": "越来越多的人意识到，良好的睡眠对学习效率至关重要。",
        "en_reference": "More and more people realize that good sleep is essential to learning efficiency.",
        "keywords": ["sleep", "efficiency"],
    },
    {
        "zh": "这位教授鼓励学生通过提问来培养批判性思维。",
        "en_reference": "The professor encourages students to develop critical thinking by asking questions.",
        "keywords": ["critical", "thinking"],
    },
]


def expand_items(prefix: str, templates: list[dict], count: int, title_key: str = "title") -> list[dict]:
    items = []
    for i in range(1, count + 1):
        base = templates[(i - 1) % len(templates)]
        item = dict(base)
        item["id"] = f"{prefix}_{i:02d}"
        if title_key in base:
            item["title"] = f"{base[title_key]} ({i})"
        else:
            item["title"] = f"{prefix}_{i:02d}"
        items.append(item)
    return items


def write_course_content(course_id: str) -> None:
    course_dir = OUT / course_id
    course_dir.mkdir(parents=True, exist_ok=True)

    reading = expand_items(f"{course_id}_r", READING_TEMPLATES, 15)
    listening = expand_items(f"{course_id}_l", LISTENING_TEMPLATES, 15)
    translation = expand_items(f"{course_id}_t", TRANSLATION_TEMPLATES, 10, title_key="zh")

    for name, data in [
        ("reading.json", reading),
        ("listening.json", listening),
        ("translation.json", translation),
    ]:
        path = course_dir / name
        path.write_text(
            json.dumps({"course_id": course_id, "count": len(data), "items": data}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"Wrote {path}")


def main() -> None:
    write_course_content("cet4")
    write_course_content("cet6")


if __name__ == "__main__":
    main()
