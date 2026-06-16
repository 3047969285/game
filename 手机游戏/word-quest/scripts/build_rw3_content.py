#!/usr/bin/env python3
"""生成《新视野大学英语（第四版）读写教程3》课程词汇与阅读内容（原创仿学内容，非教材原文）。"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_VOCAB = ROOT / "data" / "vocabulary" / "college_english_rw3.json"
OUT_CONTENT = ROOT / "data" / "content" / "college_english_rw3"

# 新视野大学英语（第四版）读写教程 Book 3 — 6 个单元
# 每单元含 Section A / Section B / Section C (Stories of China)
UNITS = [
    {
        "unit": 1,
        "id": "unit01",
        "title": "The digital age: Are we ready?",
        "title_zh": "数字时代：我们准备好了吗？",
        "theme": "digital life, connection, technology",
        "section_a": "Connection or conversation",
        "section_b": "Living in the digital world",
        "section_c": "Stories of China",
        "words": [
            ("digital", "adj.", "数字的", "We live in a digital age."),
            ("connection", "n.", "连接；联系", "True connection needs attention."),
            ("conversation", "n.", "对话", "Face-to-face conversation builds trust."),
            ("notification", "n.", "通知", "Constant notifications distract students."),
            ("scroll", "v.", "滚动浏览", "Many people scroll before sleep."),
            ("algorithm", "n.", "算法", "Algorithms shape what we see online."),
            ("privacy", "n.", "隐私", "Protect your privacy settings."),
            ("virtual", "adj.", "虚拟的", "Virtual meetings save time."),
            ("attention", "n.", "注意力", "Digital tools compete for attention."),
            ("offline", "adj.", "离线的", "Try an offline hour each day."),
            ("multitask", "v.", "多任务处理", "Multitasking can reduce quality."),
            ("cyber", "adj.", "网络的", "Cyber safety matters on campus."),
            ("device", "n.", "设备", "Put devices away during meals."),
            ("addiction", "n.", "成瘾", "Screen addiction affects sleep."),
            ("balance", "n.", "平衡", "Balance online and offline life."),
            ("interaction", "n.", "互动", "Meaningful interaction takes effort."),
            ("platform", "n.", "平台", "Choose platforms carefully."),
            ("filter", "v.", "过滤", "Learn to filter unreliable information."),
            ("habit", "n.", "习惯", "Healthy habits start small."),
            ("mindful", "adj.", "留心的", "Be mindful of how you spend time online."),
        ],
        "reading": {
            "title": "Connection or Conversation?",
            "passage": (
                "College students send hundreds of messages every week, yet many report feeling lonely. "
                "A communication teacher asked her class to keep phones in bags during group discussions. "
                "At first students felt anxious. After three sessions, however, they spoke longer and listened "
                "more carefully. One student said, 'Messages connect us quickly, but conversation helps us "
                "understand each other.' The experiment suggests that readiness for the digital age is not "
                "about owning more devices—it is about choosing when to connect and when to converse."
            ),
            "questions": [
                {
                    "question": "What changed after students put away phones?",
                    "options": [
                        "They stopped talking",
                        "They listened more carefully",
                        "They failed the course",
                        "They deleted social apps",
                    ],
                    "answer": 1,
                    "explanation": "学生表示对话更认真、倾听更仔细。",
                },
                {
                    "question": "What is the main message?",
                    "options": [
                        "Devices should be banned forever",
                        "Digital readiness includes how we use technology",
                        "Messages are useless",
                        "Students should not study communication",
                    ],
                    "answer": 1,
                    "explanation": "文章强调数字时代的关键在于如何使用技术。",
                },
            ],
        },
        "translation_zh": "在数字时代，真正的交流不仅取决于网速，还取决于我们是否愿意专注倾听。",
        "translation_en": "In the digital age, real communication depends not only on internet speed, but also on our willingness to listen with focus.",
    },
    {
        "unit": 2,
        "id": "unit02",
        "title": "Life stories",
        "title_zh": "人生故事",
        "theme": "biography, exploration, inspiration",
        "section_a": "Zheng He, the great ancient Chinese explorer",
        "section_b": "Audrey Hepburn — a real angel in the world",
        "section_c": "Stories of China",
        "words": [
            ("explorer", "n.", "探险家", "Zheng He was a great ancient explorer."),
            ("voyage", "n.", "航行", "His voyages reached distant ports."),
            ("fleet", "n.", "船队", "The fleet carried gifts and culture."),
            ("legacy", "n.", "遗产", "His legacy inspires modern readers."),
            ("biography", "n.", "传记", "A biography reveals personal choices."),
            ("humanitarian", "n.", "人道主义者", "She worked as a humanitarian."),
            ("elegant", "adj.", "优雅的", "Her elegant style became iconic."),
            ("charity", "n.", "慈善", "Charity work defined her later life."),
            ("inspire", "v.", "激励", "Life stories inspire young readers."),
            ("perseverance", "n.", "毅力", "Perseverance appears in every chapter."),
            ("ambition", "n.", "抱负", "Ambition guided his early career."),
            ("compassion", "n.", "同情", "Compassion turns fame into service."),
            ("portrait", "n.", "肖像；描写", "The article paints a vivid portrait."),
            ("era", "n.", "时代", "Each era creates its own heroes."),
            ("mission", "n.", "使命", "Her mission went beyond acting."),
            ("remarkable", "adj.", "非凡的", "Their remarkable paths differ greatly."),
            ("witness", "v.", "见证", "History witnesses courage and failure."),
            ("devotion", "n.", "奉献", "Devotion to others builds trust."),
            ("narrative", "n.", "叙述", "A good narrative shows growth."),
            ("admire", "v.", "钦佩", "Readers admire their moral choices."),
        ],
        "reading": {
            "title": "Two Lives, One Lesson",
            "passage": (
                "Life stories from different centuries can still speak to the same classroom. "
                "One story follows an explorer who sailed across oceans to build peaceful exchange. "
                "Another follows an actress who used her fame to help children in need. "
                "Their professions were different, yet both made difficult choices when comfort was easier. "
                "Students who compare such stories learn that greatness is not a single template. "
                "It can appear in a fleet on the sea or in a clinic in a small town."
            ),
            "questions": [
                {
                    "question": "What do the two figures share?",
                    "options": [
                        "The same profession",
                        "Difficult but meaningful choices",
                        "A dislike of travel",
                        "A focus only on wealth",
                    ],
                    "answer": 1,
                    "explanation": "两人都做出了艰难而有意义的选择。",
                }
            ],
        },
        "translation_zh": "伟大的人生故事提醒我们，影响力来自行动而非名声本身。",
        "translation_en": "Great life stories remind us that influence comes from action, not fame itself.",
    },
    {
        "unit": 3,
        "id": "unit03",
        "title": "Let's go",
        "title_zh": "出发吧",
        "theme": "travel, purpose, solo journey",
        "section_a": "The Surprising purpose of travel",
        "section_b": "Traveling solo — a blessing overall!",
        "section_c": "Stories of China",
        "words": [
            ("travel", "v.", "旅行", "People travel for many reasons."),
            ("journey", "n.", "旅程", "The journey changed her attitude."),
            ("destination", "n.", "目的地", "The destination was less important than growth."),
            ("solo", "adj.", "独自的", "Solo travel builds independence."),
            ("itinerary", "n.", "行程", "Keep a flexible itinerary."),
            ("luggage", "n.", "行李", "Pack light luggage for long trips."),
            ("hostel", "n.", "青年旅舍", "A hostel offers budget accommodation."),
            ("landscape", "n.", "风景", "The landscape surprised every visitor."),
            ("encounter", "v.", "偶遇", "You encounter new ideas while traveling."),
            ("perspective", "n.", "视角", "Travel broadens perspective."),
            ("navigate", "v.", "导航；应对", "Learn to navigate unfamiliar cities."),
            ("curiosity", "n.", "好奇心", "Curiosity makes travel meaningful."),
            ("reservation", "n.", "预订", "Make a reservation during peak season."),
            ("wander", "v.", "漫游", "Sometimes it is fine to wander."),
            ("memorable", "adj.", "难忘的", "A memorable trip needs open plans."),
            ("adapt", "v.", "适应", "Travelers must adapt quickly."),
            ("route", "n.", "路线", "We chose a scenic route."),
            ("local", "adj.", "当地的", "Ask local residents for advice."),
            ("departure", "n.", "出发", "Departure day finally arrived."),
            ("transform", "v.", "转变", "Travel can transform confidence."),
        ],
        "reading": {
            "title": "Why We Leave Home",
            "passage": (
                "Many students assume travel is only about famous sights and photos. "
                "Yet experienced travelers often say the real purpose is surprise: "
                "a conversation with a shop owner, a wrong turn that leads to a quiet street, "
                "or a day alone that teaches self-reliance. Solo travel can feel frightening at first, "
                "but it also creates space for reflection. The best trips do not always go as planned; "
                "they go deep enough to change how we see daily life back home."
            ),
            "questions": [
                {
                    "question": "According to the passage, travel is mainly about ___.",
                    "options": [
                        "buying expensive gifts",
                        "growth and new perspectives",
                        "avoiding all risks",
                        "collecting photos only",
                    ],
                    "answer": 1,
                    "explanation": "旅行意义在于成长与新视角。",
                }
            ],
        },
        "translation_zh": "旅行的意义不只是到达某地，而是在路上重新认识自己。",
        "translation_en": "The purpose of travel is not only to reach a place, but to rediscover ourselves along the way.",
    },
    {
        "unit": 4,
        "id": "unit04",
        "title": "When work is a pleasure",
        "title_zh": "当工作成为乐趣",
        "theme": "work, labor, tradition, pride",
        "section_a": "Will you be a worker or a laborer?",
        "section_b": "The joy of a prideful tradition",
        "section_c": "Stories of China",
        "words": [
            ("worker", "n.", "工作者", "A worker finds meaning in craft."),
            ("laborer", "n.", "体力劳动者", "A laborer may only repeat tasks."),
            ("craft", "n.", "手艺", "Respect for craft takes years."),
            ("tradition", "n.", "传统", "Tradition connects generations."),
            ("pride", "n.", "自豪", "Pride grows from quality work."),
            ("skill", "n.", "技能", "Skill improves with practice."),
            ("routine", "n.", "常规", "Routine can be comforting or boring."),
            ("fulfillment", "n.", "成就感", "Fulfillment comes from purpose."),
            ("dedication", "n.", "敬业", "Dedication shapes excellent teams."),
            ("apprentice", "n.", "学徒", "An apprentice learns by observing."),
            ("master", "n.", "大师", "A master values every detail."),
            ("dignity", "n.", "尊严", "All honest work deserves dignity."),
            ("passion", "n.", "热情", "Passion turns effort into pleasure."),
            ("occupation", "n.", "职业", "Choose an occupation that fits your values."),
            ("workshop", "n.", "作坊；车间", "The workshop smelled of wood and oil."),
            ("precision", "n.", "精确", "Precision matters in fine craft."),
            ("heritage", "n.", "传承", "Cultural heritage needs young learners."),
            ("attitude", "n.", "态度", "Attitude often decides job satisfaction."),
            ("rewarding", "adj.", "有回报的", "Teaching can be deeply rewarding."),
            ("excellence", "n.", "卓越", "Excellence is a daily habit."),
        ],
        "reading": {
            "title": "More Than a Paycheck",
            "passage": (
                "In a career workshop, students debated the difference between a worker and a laborer. "
                "One instructor argued that a laborer repeats tasks for pay, while a worker invests skill "
                "and judgment even in small jobs. A visiting craftsman showed how he repaired violins by hand. "
                "He said tradition was not nostalgia; it was a standard. When work becomes pleasure, "
                "people stop watching the clock and start caring about quality."
            ),
            "questions": [
                {
                    "question": "How does the craftsman view tradition?",
                    "options": [
                        "As outdated nostalgia",
                        "As a standard of quality",
                        "As a reason to quit",
                        "As a marketing trick",
                    ],
                    "answer": 1,
                    "explanation": "工匠把传统视为品质标准。",
                }
            ],
        },
        "translation_zh": "当工作成为乐趣时，人们追求的不再是熬时间，而是把事做好。",
        "translation_en": "When work becomes a pleasure, people pursue quality instead of just killing time.",
    },
    {
        "unit": 5,
        "id": "unit05",
        "title": "China's space dream",
        "title_zh": "中国的航天梦",
        "theme": "space exploration, innovation, China",
        "section_a": "No limit for China's astronauts in their space exploration endeavors",
        "section_b": "Chang'e-4 kicked off a new space odyssey",
        "section_c": "Stories of China",
        "words": [
            ("astronaut", "n.", "宇航员", "Astronauts train for years."),
            ("spacecraft", "n.", "航天器", "The spacecraft entered lunar orbit."),
            ("exploration", "n.", "探索", "Space exploration demands teamwork."),
            ("mission", "n.", "任务", "The mission lasted several weeks."),
            ("lunar", "adj.", "月球的", "The lunar surface is harsh."),
            ("orbit", "n.", "轨道", "The satellite stayed in orbit."),
            ("landing", "n.", "着陆", "A safe landing required precision."),
            ("endeavor", "n.", "努力；事业", "Their endeavor inspired the nation."),
            ("breakthrough", "n.", "突破", "The probe marked a major breakthrough."),
            ("innovation", "n.", "创新", "Innovation drives space programs."),
            ("research", "n.", "研究", "Scientists published new research."),
            ("telescope", "n.", "望远镜", "The telescope captured clear images."),
            ("gravity", "n.", "重力", "Gravity changes in deep space."),
            ("station", "n.", "空间站", "The space station supports experiments."),
            ("launch", "v.", "发射", "They will launch the rocket next month."),
            ("ambitious", "adj.", "雄心勃勃的", "China's space plan is ambitious."),
            ("cooperation", "n.", "合作", "International cooperation continues."),
            ("data", "n.", "数据", "The team analyzed valuable data."),
            ("frontier", "n.", "前沿", "Space remains a scientific frontier."),
            ("odyssey", "n.", "漫长探索", "The lunar odyssey opened a new chapter."),
        ],
        "reading": {
            "title": "A New Chapter in Lunar Exploration",
            "passage": (
                "When a probe landed on the far side of the moon, students across the country followed "
                "the news in real time. The mission was not only a technical success; it showed how "
                "long-term planning turns dreams into routine capability. Engineers explained that each "
                "launch depends on thousands of small tests and failures. China's space dream, they said, "
                "is less about spectacle and more about building reliable systems for future generations."
            ),
            "questions": [
                {
                    "question": "What does the passage emphasize?",
                    "options": [
                        "Luck alone brings success",
                        "Long-term planning and reliable systems",
                        "Space travel has no scientific value",
                        "Students should avoid engineering",
                    ],
                    "answer": 1,
                    "explanation": "文章强调长期规划与可靠体系。",
                }
            ],
        },
        "translation_zh": "中国航天事业的进步，是无数代人持续探索与协作的结果。",
        "translation_en": "China's progress in space is the result of continuous exploration and cooperation across generations.",
    },
    {
        "unit": 6,
        "id": "unit06",
        "title": "The economy: power behind everyday life",
        "title_zh": "经济：日常生活背后的力量",
        "theme": "economy, crisis, sharing economy",
        "section_a": "Surviving an economic crisis",
        "section_b": "The sharing economy turns a new page with books",
        "section_c": "Stories of China",
        "words": [
            ("economy", "n.", "经济", "The economy affects everyday prices."),
            ("crisis", "n.", "危机", "Families adapted during the crisis."),
            ("inflation", "n.", "通货膨胀", "Inflation changed shopping habits."),
            ("budget", "n.", "预算", "Students planned a monthly budget."),
            ("saving", "n.", "储蓄", "Saving became a popular topic."),
            ("sharing", "adj.", "共享的", "Sharing platforms reduce waste."),
            ("resource", "n.", "资源", "Resources should be used wisely."),
            ("consumer", "n.", "消费者", "Consumers compare prices online."),
            ("supply", "n.", "供应", "Supply chains influence delivery speed."),
            ("demand", "n.", "需求", "Demand rose for digital services."),
            ("startup", "n.", "初创公司", "A startup tested book-sharing lockers."),
            ("sustainable", "adj.", "可持续的", "Sustainable models last longer."),
            ("recession", "n.", "经济衰退", "A recession tests small businesses."),
            ("invest", "v.", "投资", "Communities invest in local shops."),
            ("loan", "n.", "贷款", "A small loan helped the bookstore."),
            ("revenue", "n.", "收入", "Revenue improved in the second year."),
            ("efficiency", "n.", "效率", "Efficiency keeps costs lower."),
            ("exchange", "n.", "交换", "Book exchange builds community trust."),
            ("affordable", "adj.", "负担得起的", "Affordable reading matters on campus."),
            ("resilience", "n.", "韧性", "Economic resilience needs diverse skills."),
        ],
        "reading": {
            "title": "Books on the Move",
            "passage": (
                "After an economic downturn, a neighborhood bookstore struggled to pay rent. "
                "Instead of closing, the owner partnered with a campus club to create a book-sharing wall. "
                "Readers could leave a book and take another for a small fee. The model did not make anyone "
                "rich quickly, but it kept knowledge circulating and supported local jobs. "
                "Students learned that the economy is not only charts in textbooks; "
                "it is the system behind every price tag and every shared resource."
            ),
            "questions": [
                {
                    "question": "How did the bookstore survive?",
                    "options": [
                        "By raising prices sharply",
                        "By creating a book-sharing model",
                        "By selling only online ads",
                        "By refusing all customers",
                    ],
                    "answer": 1,
                    "explanation": "书店通过图书共享模式维持经营。",
                }
            ],
        },
        "translation_zh": "共享经济提醒我们，资源的价值不仅在于拥有，还在于流动与再利用。",
        "translation_en": "The sharing economy reminds us that value lies not only in ownership, but also in circulation and reuse.",
    },
]

# Section B / Section C 原创阅读篇章（与单元主题、词汇呼应，非教材原文）
SECTION_PASSAGES: dict[str, dict[str, str]] = {
    "unit01": {
        "section_b": (
            "Living in the digital world means learning new habits every semester. "
            "Notifications interrupt attention during late-night study. Algorithms on social platforms "
            "filter what we read and shape how we scroll. Many students multitask without noticing the cost. "
            "Privacy settings are easy to ignore until a data leak occurs. Cyber safety workshops remind "
            "users to balance online convenience with offline rest. A mindful hour without devices can "
            "restore interaction with roommates and rebuild healthier habits."
        ),
        "section_c": (
            "In a mountain county in western China, a clinic adopted telemedicine to serve elderly patients. "
            "Doctors in a coastal city reviewed scans through a secure platform. Villagers who once traveled "
            "for hours now receive advice at home. The project shows how digital connection can support "
            "real communities, not only wealthy districts. China's development story includes such quiet "
            "innovation: technology with human purpose, respect for local needs, and pride in shared progress."
        ),
    },
    "unit02": {
        "section_b": (
            "Audrey Hepburn remains a remarkable figure long after her film career. "
            "Fans admire her elegant style, but humanitarian work defined her later decades. "
            "She devoted years to charity programs for hungry children. Compassion turned fame into service, "
            "and her mission went far beyond the portrait on a magazine cover. Students who read her biography "
            "learn that devotion to others can outlast any spotlight."
        ),
        "section_c": (
            "In the early fifteenth century, Zheng He commanded a fleet that crossed the Indian Ocean. "
            "His voyages carried exchange of goods, maps, and mutual respect. The explorer's legacy is not "
            "mere conquest; it is a narrative of peaceful contact across eras. Chinese students today witness "
            "how one era's courage can inspire another classroom's discussion about responsibility and global trust."
        ),
    },
    "unit03": {
        "section_b": (
            "Traveling solo frightened Mei at first, yet it became a blessing overall. "
            "Without a fixed itinerary, she could wander through a hostel neighborhood and talk with local shop owners. "
            "A wrong turn led to a memorable landscape and a lesson in self-reliance. Solo travel creates space "
            "to adapt, reflect, and transform confidence. The best departure is not escape—it is curiosity with purpose."
        ),
        "section_c": (
            "High-speed rail now links cities that once required a full day on the road. "
            "A student from Chengdu described her journey to Xi'an as more than tourism: the route itself "
            "taught perspective. She met travelers who shared stories about work, family, and change. "
            "China's travel infrastructure shows how movement can connect people and renew respect for diverse landscapes."
        ),
    },
    "unit04": {
        "section_b": (
            "In a small workshop, a violin craftsman demonstrated prideful tradition. "
            "As an apprentice years ago, he watched his master measure every joint with precision. "
            "Craft was not nostalgia; it was a standard of excellence. Workers who love their occupation "
            "stop watching the clock and invest skill in each detail. Heritage survives when young learners "
            "choose dedication over shortcuts."
        ),
        "section_c": (
            "In Suzhou, a team restores silk embroidery patterns passed down for generations. "
            "Tour guides explain how heritage supports local jobs and dignity for artisans. "
            "Visitors learn that tradition is living labor, not a museum label. "
            "Such stories of China remind students that rewarding work can preserve culture and community identity."
        ),
    },
    "unit05": {
        "section_b": (
            "When Chang'e-4 landed on the far side of the moon, classrooms followed the odyssey in real time. "
            "The breakthrough depended on thousands of tests, not luck alone. Engineers analyzed data from "
            "each launch and orbit adjustment. A lunar landing is a lesson in long-term planning: ambitious goals "
            "become routine capability through cooperation and patient research."
        ),
        "section_c": (
            "China's astronauts train for years before a single mission enters orbit. "
            "Their endeavor reflects generations of exploration—from early telescopes to modern spacecraft. "
            "Students visiting a space exhibit learn that the nation's frontier dreams rely on discipline, "
            "innovation, and shared investment in science for the future."
        ),
    },
    "unit06": {
        "section_b": (
            "The sharing economy turned a new page when a campus club built a book-exchange wall. "
            "Readers left a novel and took another for an affordable fee. The startup model did not create "
            "instant revenue, but it kept resources circulating. Consumers learned that sustainable exchange "
            "can support local shops during uncertain seasons."
        ),
        "section_c": (
            "During a recession, a county library in central China expanded digital lending services. "
            "Families on tight budgets accessed affordable reading through a shared platform. "
            "The project showed economic resilience: communities invest in knowledge when income is unstable. "
            "Such stories remind students that the economy is the system behind everyday prices and shared resources."
        ),
    },
}


def build_vocab() -> list[dict]:
    words: list[dict] = []
    for unit in UNITS:
        for i, (word, pos, meaning, example) in enumerate(unit["words"], start=1):
            uid = unit["id"]
            words.append(
                {
                    "id": f"rw3_{uid}_{i:02d}",
                    "word": word,
                    "phonetic": "",
                    "pos": pos,
                    "meaning": meaning,
                    "meanings": [f"{pos} {meaning}"],
                    "example": example,
                    "example_zh": "",
                    "tags": ["college_english_rw3", "edition4", uid, unit["theme"]],
                    "difficulty": 2 + (i % 3),
                    "unit_id": uid,
                    "unit_title": unit["title"],
                    "edition": 4,
                }
            )
    return words


def main() -> None:
    words = build_vocab()
    OUT_VOCAB.parent.mkdir(parents=True, exist_ok=True)
    OUT_VOCAB.write_text(
        json.dumps(
            {
                "meta": {
                    "course_id": "college_english_rw3",
                    "name": "大学英语读写教程3",
                    "textbook": "新视野大学英语（第四版）读写教程 Book 3（思政智慧版）",
                    "edition": 4,
                    "units": 6,
                    "sections_per_unit": ["Section A", "Section B", "Section C Stories of China"],
                    "note": "词汇与阅读内容为原创仿学材料，用于游戏化学习，非教材原文转载",
                },
                "count": len(words),
                "words": words,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Wrote vocabulary: {len(words)} words")

    OUT_CONTENT.mkdir(parents=True, exist_ok=True)

    # 清理第三版遗留的 unit07 / unit08
    for stale in OUT_CONTENT.glob("unit0[78].json"):
        stale.unlink()
        print(f"Removed stale file: {stale}")

    for unit in UNITS:
        extra = SECTION_PASSAGES.get(unit["id"], {})
        passage_a = unit["reading"]["passage"]
        passage_b = extra.get("section_b", "")
        passage_c = extra.get("section_c", "")
        listen_script = passage_a
        if passage_b and passage_b not in listen_script:
            listen_script = f"{passage_a} {passage_b}"

        payload = {
            "unit_id": unit["id"],
            "unit_number": unit["unit"],
            "edition": 4,
            "title": unit["title"],
            "title_zh": unit["title_zh"],
            "theme": unit["theme"],
            "word_ids": [f"rw3_{unit['id']}_{i:02d}" for i in range(1, len(unit["words"]) + 1)],
            "sections": {
                "section_a": {
                    "title": unit["section_a"],
                    "type": "reading",
                    "passage": passage_a,
                },
                "section_b": {
                    "title": unit["section_b"],
                    "type": "reading",
                    "passage": passage_b,
                },
                "section_c": {
                    "title": unit["section_c"],
                    "type": "stories_of_china",
                    "passage": passage_c,
                },
                "vocabulary": {
                    "level_count": 4,
                    "words_per_level": 5,
                },
                "reading": unit["reading"],
                "listening": {
                    "title": f"Listening: {unit['title']}",
                    "script": listen_script,
                    "questions": unit["reading"]["questions"],
                },
                "translation": {
                    "sentences": [
                        {
                            "zh": f"请将下列句子译为英文：{unit['translation_zh']}",
                            "en_reference": unit["translation_en"],
                            "keywords": [unit["words"][0][0], unit["words"][1][0]],
                        }
                    ],
                },
                "writing": {
                    "prompt": f"Write 120-150 words about the theme: {unit['title_zh']}.",
                    "outline": ["Introduction", "Example", "Personal view", "Conclusion"],
                },
            },
        }
        out = OUT_CONTENT / f"{unit['id']}.json"
        out.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote unit content -> {out}")


if __name__ == "__main__":
    main()
