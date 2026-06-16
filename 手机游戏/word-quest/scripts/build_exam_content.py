#!/usr/bin/env python3
"""生成四级/六级听力、阅读、翻译仿真题内容（每道题唯一，不重复）。"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "content"

# ──────────────────────────────────────────────
# CET-4 听力材料（15条唯一）
# ──────────────────────────────────────────────
CET4_LISTENING = [
    {
        "title": "Choosing a Textbook",
        "script": (
            "W: Professor Li, I can't find the textbook you recommended. Is there an alternative?\n"
            "M: Yes, you can use the second edition instead. It covers the same chapters.\n"
            "W: Great. Can I borrow it from the library?\n"
            "M: There are three copies on reserve. You can check one out for two hours."
        ),
        "questions": [{"question": "What does the professor suggest the woman do?",
            "options": ["Buy the first edition", "Borrow a copy from the library",
                        "Download a digital version", "Share with a classmate"], "answer": 1}],
    },
    {
        "title": "Campus Shuttle Schedule Change",
        "script": (
            "Attention, students. Due to road construction near Gate 2, the evening campus shuttle "
            "will depart from Gate 4 starting Monday. The schedule remains the same. Last departure "
            "is at 10:30 p.m. Please allow extra walking time to reach the new stop."
        ),
        "questions": [{"question": "What has changed about the campus shuttle?",
            "options": ["The departure time", "The departure location",
                        "The ticket price", "The route number"], "answer": 1}],
    },
    {
        "title": "Job Interview Preparation",
        "script": (
            "M: I have a job interview tomorrow and I'm really nervous.\n"
            "W: Have you researched the company?\n"
            "M: A little, but I haven't prepared answers to common questions yet.\n"
            "W: Start with 'Tell me about yourself.' That's almost always the first question."
        ),
        "questions": [{"question": "What does the woman advise the man to prepare first?",
            "options": ["Company background", "A self-introduction",
                        "Technical skills", "A list of references"], "answer": 1}],
    },
    {
        "title": "Lost Student ID",
        "script": (
            "W: Excuse me, I lost my student ID. How do I get a replacement?\n"
            "M: You'll need to fill out a form at the student affairs office and pay a fee of ten yuan.\n"
            "W: How long will it take?\n"
            "M: Usually three working days. You can pick it up at window five."
        ),
        "questions": [{"question": "Where should the woman go to get a replacement ID?",
            "options": ["The library counter", "The student affairs office",
                        "The security office", "The IT center"], "answer": 1}],
    },
    {
        "title": "Dormitory Maintenance Notice",
        "script": (
            "This is an announcement for residents of Building C. Hot water will be unavailable "
            "from 8 a.m. to noon on Saturday for routine pipe maintenance. Cold water supply will "
            "not be affected. We apologize for the inconvenience and thank you for your patience."
        ),
        "questions": [{"question": "What will be unavailable Saturday morning in Building C?",
            "options": ["Cold water", "Hot water", "Electricity", "Internet"], "answer": 1}],
    },
    {
        "title": "Study Group Arrangement",
        "script": (
            "M: Are we still meeting at the library at six?\n"
            "W: I have a lab session until seven. Can we move it to seven-thirty?\n"
            "M: That works. Should we reserve a group room?\n"
            "W: I already did — Room 204 on the second floor."
        ),
        "questions": [{"question": "What time will the study group meet?",
            "options": ["Six o'clock", "Six-thirty", "Seven o'clock", "Seven-thirty"], "answer": 3}],
    },
    {
        "title": "Choosing a Major",
        "script": (
            "W: I'm torn between economics and computer science. Which do you think is better?\n"
            "M: It depends on what you enjoy. Economics suits analytical thinkers; CS suits problem-solvers.\n"
            "W: I love both. Is there a combined program?\n"
            "M: Yes, the business computing track lets you take courses in both departments."
        ),
        "questions": [{"question": "What does the man suggest the woman consider?",
            "options": ["Choosing economics only", "Choosing computer science only",
                        "A combined business computing track", "Switching to engineering"], "answer": 2}],
    },
    {
        "title": "Library Fine Notice",
        "script": (
            "Dear library users, please be reminded that overdue books incur a fine of 0.2 yuan per day. "
            "You may renew online up to twice before the item must be returned. Renewals are not possible "
            "if another user has placed a hold on the book. Check your account before the due date."
        ),
        "questions": [{"question": "When is online renewal NOT possible?",
            "options": ["When the fine exceeds ten yuan", "When another user has reserved the book",
                        "After the book is one week overdue", "On weekends"], "answer": 1}],
    },
    {
        "title": "Planning a Graduation Trip",
        "script": (
            "M: Where should we go for the graduation trip? Some people want the beach, others the mountains.\n"
            "W: Why not vote? We could send a survey to the whole class.\n"
            "M: Good idea. And we should book early — prices double in summer.\n"
            "W: I'll set up the survey tonight and share it in the group chat."
        ),
        "questions": [{"question": "What will the woman do tonight?",
            "options": ["Book the hotel", "Call a travel agent",
                        "Create a survey for the class", "Post photos online"], "answer": 2}],
    },
    {
        "title": "Health Center Announcement",
        "script": (
            "The campus health center will offer free flu vaccinations next Thursday from 9 a.m. to 4 p.m. "
            "Students must bring their student ID. No appointment is needed. The clinic is located in "
            "Building A, Room 101. Quantities are limited, so early arrival is recommended."
        ),
        "questions": [{"question": "What do students need to bring for the vaccination?",
            "options": ["A health insurance card", "A student ID", "A doctor's note", "Cash payment"], "answer": 1}],
    },
    {
        "title": "Requesting a Grade Review",
        "script": (
            "W: I think there's a mistake in my exam grade. Who should I contact?\n"
            "M: You need to submit a grade review form within five days of the result release.\n"
            "W: Can I email the professor directly?\n"
            "M: Only after you submit the official form through the academic affairs portal."
        ),
        "questions": [{"question": "What must the woman do before contacting the professor?",
            "options": ["Wait two weeks", "Submit an official review form",
                        "Speak to the department head", "Re-take the exam"], "answer": 1}],
    },
    {
        "title": "Part-time Job Search",
        "script": (
            "M: I'm looking for a part-time job near campus. Any suggestions?\n"
            "W: The coffee shop on West Street is hiring. It's only a ten-minute walk.\n"
            "M: What are the hours?\n"
            "W: Weekends only, nine to five. The pay is sixteen yuan an hour."
        ),
        "questions": [{"question": "When does the coffee shop need workers?",
            "options": ["Weekdays only", "Every evening", "Weekends only", "Monday through Friday"], "answer": 2}],
    },
    {
        "title": "Campus Event Cancelled",
        "script": (
            "We regret to inform you that this Saturday's outdoor film screening has been cancelled "
            "due to the weather forecast. A replacement indoor screening will take place in Lecture "
            "Hall B at the same time — 7 p.m. Seating is limited to 200. Arrive early to secure a seat."
        ),
        "questions": [{"question": "Why was the outdoor screening cancelled?",
            "options": ["Lack of funding", "Equipment failure",
                        "Bad weather forecast", "Low ticket sales"], "answer": 2}],
    },
    {
        "title": "Renting an Apartment",
        "script": (
            "W: I found a two-bedroom apartment near the university for 2,800 yuan a month.\n"
            "M: That sounds reasonable. Is it furnished?\n"
            "W: Yes, basic furniture is included, but there's no washing machine.\n"
            "M: You could use the laundry room on the ground floor. Most buildings have one."
        ),
        "questions": [{"question": "What is NOT included in the apartment?",
            "options": ["Basic furniture", "A washing machine",
                        "A kitchen", "A bathroom"], "answer": 1}],
    },
    {
        "title": "Sports Center Policy Update",
        "script": (
            "The sports center will now require all users to register online at least one hour before "
            "their session. Walk-ins will no longer be accepted during peak hours — 6 to 9 p.m. on "
            "weekdays. Weekend slots remain open for walk-ins. Student ID must be scanned at entry."
        ),
        "questions": [{"question": "When must users register online in advance?",
            "options": ["Every day without exception", "On weekends only",
                        "During weekday peak hours", "Only for team sports"], "answer": 2}],
    },
]

# ──────────────────────────────────────────────
# CET-4 阅读材料（15条唯一）
# ──────────────────────────────────────────────
CET4_READING = [
    {
        "title": "The Rise of Online Learning",
        "passage": (
            "Online learning has expanded rapidly in recent years. Universities now offer thousands of "
            "courses that students can access from anywhere. Studies show that students who engage "
            "actively with discussion boards perform better than those who only watch videos. Instructors "
            "are experimenting with live sessions and peer review to recreate classroom interaction online."
        ),
        "questions": [{"question": "What helps online students perform better?",
            "options": ["Watching more videos", "Participating in discussion boards",
                        "Paying higher tuition", "Taking longer courses"], "answer": 1}],
    },
    {
        "title": "Sleep and Academic Performance",
        "passage": (
            "A study of 500 undergraduates found a strong link between sleep duration and grade point "
            "average. Students who slept fewer than six hours scored significantly lower on exams. "
            "Researchers recommend that students establish a consistent sleep schedule and avoid screens "
            "for one hour before bed. Adequate sleep improves memory consolidation and problem-solving."
        ),
        "questions": [{"question": "What do researchers recommend to improve academic performance?",
            "options": ["Study before sunrise", "Maintain a regular sleep schedule",
                        "Drink more coffee", "Exercise every morning"], "answer": 1}],
    },
    {
        "title": "Urban Green Spaces and Mental Health",
        "passage": (
            "Access to parks and green spaces in cities has been linked to lower rates of anxiety and "
            "depression. A survey across fifteen cities found that residents within 300 meters of a "
            "park reported higher well-being scores. City planners are now prioritizing green corridors "
            "in new developments to support public mental health."
        ),
        "questions": [{"question": "What are city planners focusing on in new developments?",
            "options": ["Wider roads", "Taller buildings", "Green corridors", "Underground parking"], "answer": 2}],
    },
    {
        "title": "The Gig Economy and Young Workers",
        "passage": (
            "The gig economy — freelance and short-term contract work — has attracted millions of young "
            "workers who value flexibility. However, gig workers often lack benefits such as health "
            "insurance and pension contributions. Labor economists warn that relying on gig work as a "
            "primary income source can lead to financial instability in the long term."
        ),
        "questions": [{"question": "What concern do labor economists raise about gig work?",
            "options": ["It pays too well", "It can cause long-term financial instability",
                        "It is too physically demanding", "It requires advanced education"], "answer": 1}],
    },
    {
        "title": "Food Waste on Campus",
        "passage": (
            "Universities generate significant food waste in campus canteens. A pilot program at one "
            "university reduced waste by 30 percent by allowing students to pay only for the weight of "
            "food they take. Students reported being more mindful of portion sizes. The model is now "
            "being considered for adoption across multiple campuses nationwide."
        ),
        "questions": [{"question": "How did the university reduce food waste?",
            "options": ["Limiting menu options", "Charging by food weight",
                        "Closing the canteen earlier", "Offering smaller plates"], "answer": 1}],
    },
    {
        "title": "Bilingualism and Brain Health",
        "passage": (
            "Research suggests that speaking two or more languages may delay the onset of dementia by "
            "up to five years. Scientists believe that switching between languages exercises the brain's "
            "executive function, keeping neural pathways active. These findings have encouraged language "
            "learning programs targeted at older adults as a preventive health measure."
        ),
        "questions": [{"question": "What benefit of bilingualism do researchers highlight?",
            "options": ["Higher income", "Better social skills",
                        "Delayed onset of dementia", "Improved physical fitness"], "answer": 2}],
    },
    {
        "title": "The Value of Volunteering",
        "passage": (
            "Students who volunteer regularly report higher levels of satisfaction and stronger career "
            "prospects. Employers increasingly look for evidence of community involvement when hiring. "
            "Volunteering builds soft skills such as teamwork, communication, and leadership. Many "
            "universities now formally recognize volunteer hours on student transcripts."
        ),
        "questions": [{"question": "Why do universities formally recognize volunteer hours?",
            "options": ["To replace exam credits", "To reward students who build useful skills",
                        "To reduce tuition fees", "To fulfill government requirements"], "answer": 1}],
    },
    {
        "title": "Electric Vehicles and Urban Air Quality",
        "passage": (
            "Cities that have encouraged electric vehicle adoption report measurable improvements in "
            "air quality. Nitrogen oxide levels, a key pollutant linked to respiratory disease, have "
            "fallen by up to 20 percent in pilot zones. However, the full environmental benefit depends "
            "on whether the electricity used to charge vehicles comes from renewable sources."
        ),
        "questions": [{"question": "What limits the full environmental benefit of electric vehicles?",
            "options": ["High vehicle cost", "Limited charging stations",
                        "The source of electricity for charging", "Battery weight"], "answer": 2}],
    },
    {
        "title": "Reading for Pleasure and Language Skills",
        "passage": (
            "Students who read fiction for pleasure outside of class consistently score higher on "
            "reading comprehension and vocabulary tests. Researchers attribute this to exposure to "
            "complex sentence structures and diverse vocabulary in literary texts. Teachers are "
            "encouraged to allow students to self-select books to increase motivation."
        ),
        "questions": [{"question": "What do researchers recommend to increase reading motivation?",
            "options": ["Assigning more textbooks", "Letting students choose their own books",
                        "Reading aloud in class daily", "Banning electronic devices"], "answer": 1}],
    },
    {
        "title": "Noise Pollution in Cities",
        "passage": (
            "Chronic exposure to urban noise above 65 decibels has been linked to cardiovascular "
            "disease, disturbed sleep, and reduced cognitive performance in children. City governments "
            "are responding by enforcing stricter nighttime noise ordinances and planting sound-absorbing "
            "vegetation along busy roads. Residents near airports receive the highest levels of noise exposure."
        ),
        "questions": [{"question": "Who is most exposed to noise pollution, according to the passage?",
            "options": ["City office workers", "Residents near airports",
                        "Primary school children", "Construction workers"], "answer": 1}],
    },
    {
        "title": "The Popularity of Podcasts",
        "passage": (
            "Podcast listeners have grown from 100 million to over 500 million globally in five years. "
            "Commuters are the largest audience, using travel time for self-improvement and entertainment. "
            "Educational podcasts on history, science, and language learning have seen the strongest "
            "growth. Advertisers follow audiences, making podcasting an increasingly valuable industry."
        ),
        "questions": [{"question": "Which type of podcast has grown the fastest?",
            "options": ["True crime stories", "Sports commentary",
                        "Educational content", "Celebrity interviews"], "answer": 2}],
    },
    {
        "title": "University Mental Health Services",
        "passage": (
            "Demand for university counselling services has increased sharply over the past decade. "
            "Students cite academic pressure, social isolation, and financial stress as primary causes "
            "of anxiety. Many universities have expanded online therapy options to reduce waiting times. "
            "Early intervention programs that identify struggling students have proven most effective."
        ),
        "questions": [{"question": "What approach has proven most effective in supporting student mental health?",
            "options": ["Reducing tuition fees", "Extending exam periods",
                        "Early intervention programs", "Building new dormitories"], "answer": 2}],
    },
    {
        "title": "Artificial Intelligence in Education",
        "passage": (
            "AI-powered tutoring systems can adapt lesson difficulty in real time based on student "
            "performance. Early trials in middle schools show gains in mathematics scores of up to "
            "15 percent. Critics worry that excessive reliance on AI may reduce teacher-student "
            "interaction, which is essential for social and emotional learning."
        ),
        "questions": [{"question": "What concern do critics express about AI in education?",
            "options": ["It is too expensive to maintain", "It may reduce important human interaction",
                        "It gives students unfair advantages", "It makes homework too easy"], "answer": 1}],
    },
    {
        "title": "Water Conservation on Campus",
        "passage": (
            "A university installed smart meters on all dormitory showers, displaying real-time "
            "water usage on a screen. Within three months, average shower time dropped from nine "
            "minutes to six minutes, reducing water consumption by 33 percent. Students reported "
            "that seeing the data made them more conscious of their environmental impact."
        ),
        "questions": [{"question": "What caused students to use less water?",
            "options": ["Higher water bills", "Shorter hot water supply",
                        "Seeing real-time usage data", "A campus water shortage"], "answer": 2}],
    },
    {
        "title": "Social Media and Self-Esteem",
        "passage": (
            "A study of university students found that those who spent more than three hours daily "
            "on social media reported lower self-esteem and greater feelings of loneliness. "
            "Researchers suggest that comparing oneself to curated online profiles leads to "
            "unrealistic expectations. Setting daily time limits on apps can help restore balance."
        ),
        "questions": [{"question": "What do researchers suggest to improve well-being?",
            "options": ["Delete all social media accounts", "Set daily time limits on app use",
                        "Post more positive content", "Follow more friends online"], "answer": 1}],
    },
]

# ──────────────────────────────────────────────
# CET-4 翻译题（10条唯一）
# ──────────────────────────────────────────────
CET4_TRANSLATION = [
    {"zh": "越来越多的大学生意识到，良好的睡眠对学习效率至关重要。",
     "en_reference": "More and more college students realize that good sleep is crucial to learning efficiency.",
     "keywords": ["sleep", "crucial", "efficiency"]},
    {"zh": "这位教授鼓励学生通过提问来培养批判性思维能力。",
     "en_reference": "The professor encourages students to develop critical thinking skills by asking questions.",
     "keywords": ["critical", "thinking", "encourage"]},
    {"zh": "随着互联网技术的飞速发展，在线教育已成为一种广受欢迎的学习方式。",
     "en_reference": "With the rapid development of internet technology, online education has become a widely popular way of learning.",
     "keywords": ["internet", "online", "popular"]},
    {"zh": "政府正在采取一系列措施来减少城市中的空气污染。",
     "en_reference": "The government is taking a series of measures to reduce air pollution in cities.",
     "keywords": ["measures", "reduce", "pollution"]},
    {"zh": "坚持锻炼不仅能增强体质，还能有效缓解学习压力。",
     "en_reference": "Regular exercise not only strengthens physical fitness but also effectively relieves study pressure.",
     "keywords": ["exercise", "relieves", "pressure"]},
    {"zh": "中国传统文化在全球范围内的影响力正在不断增强。",
     "en_reference": "The influence of traditional Chinese culture is continuously growing on a global scale.",
     "keywords": ["traditional", "influence", "global"]},
    {"zh": "大学生应该充分利用课余时间拓展自己的知识面和技能。",
     "en_reference": "College students should make full use of their spare time to broaden their knowledge and skills.",
     "keywords": ["spare", "broaden", "skills"]},
    {"zh": "共享经济的兴起为人们提供了更多便利，但同时也带来了新的挑战。",
     "en_reference": "The rise of the sharing economy has provided people with more convenience while bringing new challenges.",
     "keywords": ["sharing", "convenience", "challenges"]},
    {"zh": "越来越多的年轻人选择在大城市创业，以实现自己的职业梦想。",
     "en_reference": "More and more young people choose to start businesses in big cities to realize their career dreams.",
     "keywords": ["start", "businesses", "career"]},
    {"zh": "保护生态环境是每位公民的责任，也是可持续发展的基础。",
     "en_reference": "Protecting the ecological environment is the responsibility of every citizen and the foundation of sustainable development.",
     "keywords": ["protecting", "responsibility", "sustainable"]},
]

# ──────────────────────────────────────────────
# CET-6 听力材料（15条唯一）
# ──────────────────────────────────────────────
CET6_LISTENING = [
    {
        "title": "Research Funding Application",
        "script": (
            "W: Have you submitted the grant application for the climate project?\n"
            "M: Not yet. The deadline was extended by two weeks because the committee needs additional review time.\n"
            "W: That's good news. I still need to finalize the budget section.\n"
            "M: Make sure the overhead costs are itemized separately — they check that carefully."
        ),
        "questions": [{"question": "Why was the grant deadline extended?",
            "options": ["The system was down", "The committee needs more review time",
                        "The applicants requested it", "The budget was unclear"], "answer": 1}],
    },
    {
        "title": "Graduate School Interview",
        "script": (
            "M: I just received an interview invitation from three graduate programs. I'm not sure which to prioritize.\n"
            "W: Consider the faculty research focus first. If your interests align, you'll be more motivated.\n"
            "M: One program offers full funding; the others only partial.\n"
            "W: Financial support matters for a multi-year degree, but research fit matters more long term."
        ),
        "questions": [{"question": "What does the woman recommend prioritizing in graduate school choice?",
            "options": ["Geographic location", "Faculty research alignment",
                        "Campus facilities", "Alumni network"], "answer": 1}],
    },
    {
        "title": "International Conference Registration",
        "script": (
            "Good afternoon. This is a reminder that early-bird registration for the International "
            "Linguistics Conference closes on Friday at midnight. The reduced rate of 800 yuan applies "
            "only to registered students with valid ID. Hotel blocks near the venue are nearly full. "
            "Please complete registration and accommodation booking before rates increase."
        ),
        "questions": [{"question": "What is the discounted registration rate for students?",
            "options": ["500 yuan", "650 yuan", "800 yuan", "1,000 yuan"], "answer": 2}],
    },
    {
        "title": "Thesis Defense Scheduling",
        "script": (
            "W: Professor, I'd like to schedule my thesis defense for next month. Is that feasible?\n"
            "M: It depends on whether all three committee members are available. Have you checked their calendars?\n"
            "W: Two confirmed the 15th, but Professor Zhang is traveling that week.\n"
            "M: Email him the 22nd as an alternative. We need all three present."
        ),
        "questions": [{"question": "What is preventing the defense from being scheduled on the 15th?",
            "options": ["The venue is booked", "The student isn't ready",
                        "Professor Zhang will be away", "The paperwork is incomplete"], "answer": 2}],
    },
    {
        "title": "Urban Planning Discussion",
        "script": (
            "M: The proposal to convert the old factory district into a mixed-use neighborhood has divided the council.\n"
            "W: What are the main objections?\n"
            "M: Residents worry about gentrification pushing out long-term tenants.\n"
            "W: The city should require that at least 30 percent of units remain affordable housing."
        ),
        "questions": [{"question": "What solution does the woman propose?",
            "options": ["Cancel the development plan", "Reserve affordable housing units",
                        "Build a new factory instead", "Survey residents again"], "answer": 1}],
    },
    {
        "title": "Technology Ethics Seminar",
        "script": (
            "Today's seminar examines algorithmic bias in hiring software. Research has shown that "
            "recruitment algorithms trained on historical data can systematically disadvantage female "
            "and minority candidates. Companies are now required in some jurisdictions to audit their "
            "AI tools for discriminatory patterns before deployment."
        ),
        "questions": [{"question": "What are companies in some regions required to do before using AI hiring tools?",
            "options": ["Register with the government", "Audit them for bias",
                        "Test them on 1,000 applicants", "Submit them to a university"], "answer": 1}],
    },
    {
        "title": "Climate Data Interpretation",
        "script": (
            "W: The latest data shows a 1.2-degree global average temperature increase since pre-industrial levels.\n"
            "M: That's ahead of what most models predicted for this decade.\n"
            "W: Ocean surface temperatures are the most alarming indicator. Coral bleaching is accelerating.\n"
            "M: The next IPCC report will need to revise its near-term projections upward."
        ),
        "questions": [{"question": "Which indicator does the woman find most alarming?",
            "options": ["Rising sea levels", "Ocean surface temperatures",
                        "Glacier retreat", "Extreme rainfall"], "answer": 1}],
    },
    {
        "title": "Publishing Research Findings",
        "script": (
            "M: My paper was rejected by the first journal. Should I revise and resubmit or try a different outlet?\n"
            "W: Read the reviewers' comments carefully. If the feedback is substantive and fair, revise first.\n"
            "M: Two reviewers were positive; one had serious methodological objections.\n"
            "W: Address the methodology concern with additional analysis, then resubmit. It's usually worth it."
        ),
        "questions": [{"question": "What does the woman advise the man to do with his rejected paper?",
            "options": ["Give up on publishing it", "Submit to a lower-ranked journal",
                        "Address the methodology and resubmit", "Remove the controversial section"], "answer": 2}],
    },
    {
        "title": "Cross-Cultural Communication Workshop",
        "script": (
            "Effective cross-cultural communication goes beyond language fluency. Silence, for example, "
            "signals respect in many Asian contexts but discomfort in some Western interactions. Indirect "
            "communication styles, common in high-context cultures, may be misread as evasiveness. "
            "Training programs help professionals recognize and adapt to these differences."
        ),
        "questions": [{"question": "What may indirect communication be misread as in low-context cultures?",
            "options": ["Confidence", "Evasiveness", "Formality", "Intelligence"], "answer": 1}],
    },
    {
        "title": "Academic Library Reorganization",
        "script": (
            "W: The library is moving its print journal collection to off-campus storage by December.\n"
            "M: Will researchers still have access?\n"
            "W: Yes, through a 48-hour retrieval request system. Digital access remains unchanged.\n"
            "M: For rare materials, 48 hours is quite reasonable. Most of us use digital versions anyway."
        ),
        "questions": [{"question": "How long does it take to retrieve items from off-campus storage?",
            "options": ["24 hours", "48 hours", "3 days", "One week"], "answer": 1}],
    },
    {
        "title": "Startup Ecosystem Discussion",
        "script": (
            "M: The city's innovation district has attracted 200 startups in its first two years.\n"
            "W: What's driving that growth?\n"
            "M: Subsidized office space, proximity to the university's engineering faculty, and a government tax incentive.\n"
            "W: The university connection is probably the most sustainable advantage — it provides a steady talent pipeline."
        ),
        "questions": [{"question": "What does the woman consider the most sustainable advantage of the innovation district?",
            "options": ["Tax incentives", "Subsidized rent",
                        "Proximity to the university", "Government contracts"], "answer": 2}],
    },
    {
        "title": "Healthcare Workforce Shortage",
        "script": (
            "A new government report projects a shortage of 200,000 nurses nationwide by 2030. "
            "Contributing factors include an ageing workforce, high burnout rates, and insufficient "
            "training program capacity. The Ministry of Health is offering tuition subsidies for nursing "
            "students who commit to working in underserved rural areas after graduation."
        ),
        "questions": [{"question": "What incentive is the Ministry offering to nursing students?",
            "options": ["Free housing", "Guaranteed city placements",
                        "Tuition subsidies for rural service", "Monthly performance bonuses"], "answer": 2}],
    },
    {
        "title": "Museum Digitalization Project",
        "script": (
            "W: The museum completed 3D scanning of its entire ceramic collection last month.\n"
            "M: Will the scans be publicly accessible?\n"
            "W: Yes, a free online portal launches next spring. Educators can download models for classroom use.\n"
            "M: That's a significant step. Physical access to fragile artifacts has always been restricted."
        ),
        "questions": [{"question": "What can educators do with the digital models?",
            "options": ["Purchase them at a discount", "Download them for classroom use",
                        "Exhibit them in schools", "Print them at the museum"], "answer": 1}],
    },
    {
        "title": "Food Security Panel",
        "script": (
            "M: The panel today will address how vertical farming can contribute to urban food security.\n"
            "W: The yield-per-square-meter figures look promising, but energy costs remain a barrier.\n"
            "M: Several companies are experimenting with solar-powered vertical farms to address that.\n"
            "W: If they can bring the energy cost down, this could genuinely transform city food supply chains."
        ),
        "questions": [{"question": "What is the main barrier to widespread vertical farming adoption?",
            "options": ["Lack of consumer interest", "High energy costs",
                        "Limited crop variety", "Insufficient land space"], "answer": 1}],
    },
    {
        "title": "Philosophy of Language Lecture",
        "script": (
            "Language does not merely describe reality — it helps construct it. Consider how renaming "
            "a conflict a 'police action' changes public perception of its legitimacy. Politicians, "
            "advertisers, and journalists all understand that word choice shapes how people think. "
            "This insight, from speech act theory, has profound implications for media literacy."
        ),
        "questions": [{"question": "What does the speaker say language does beyond describing reality?",
            "options": ["Simplifies complex ideas", "Helps construct reality",
                        "Replaces human emotion", "Translates culture"], "answer": 1}],
    },
]

# ──────────────────────────────────────────────
# CET-6 阅读材料（15条唯一）
# ──────────────────────────────────────────────
CET6_READING = [
    {
        "title": "The Neuroscience of Habit Formation",
        "passage": (
            "Habits are encoded in the basal ganglia, a region of the brain associated with routine "
            "behavior. Once a habit is formed, the cognitive load required to perform the behavior "
            "drops significantly, freeing conscious attention for other tasks. This automaticity is "
            "why breaking bad habits is difficult — the neural circuits remain even after the behavior stops."
        ),
        "questions": [{"question": "Why is breaking a bad habit difficult according to the passage?",
            "options": ["It requires expensive treatment", "The neural circuits persist even after stopping",
                        "The basal ganglia is irreplaceable", "Habits involve conscious decisions"], "answer": 1}],
    },
    {
        "title": "Carbon Capture Technology",
        "passage": (
            "Direct air capture (DAC) technology draws carbon dioxide directly from the atmosphere "
            "using chemical processes. While promising, current DAC systems cost between $400 and $1,000 "
            "per ton of CO2 removed, far above the $50–100 target economists say is necessary for "
            "widespread deployment. Government subsidies and private investment are accelerating research "
            "to lower costs."
        ),
        "questions": [{"question": "What economic target must DAC technology reach for large-scale adoption?",
            "options": ["$50–100 per ton", "$200–300 per ton",
                        "$400–500 per ton", "$1,000 per ton"], "answer": 0}],
    },
    {
        "title": "The Attention Economy",
        "passage": (
            "Technology companies compete for users' attention as their primary business resource. "
            "Every minute a user spends on a platform translates to advertising revenue. Designers "
            "employ techniques such as variable reward schedules — borrowed from behavioral psychology — "
            "to keep users engaged longer. Critics argue this model prioritizes engagement metrics over "
            "user well-being, contributing to anxiety and reduced attention spans."
        ),
        "questions": [{"question": "What technique do designers use to increase user engagement?",
            "options": ["Personalized news feeds only", "Variable reward schedules",
                        "Reduced notification frequency", "Educational content curation"], "answer": 1}],
    },
    {
        "title": "Diplomatic Language in International Relations",
        "passage": (
            "Diplomatic language is characterized by deliberate ambiguity, allowing parties to agree "
            "on a text while interpreting it differently at home. The phrase 'constructive dialogue' "
            "often signals that substantive agreement was not reached. Scholars of international "
            "relations study this linguistic dimension as carefully as they study policy substance, "
            "because the framing of agreements shapes their implementation."
        ),
        "questions": [{"question": "What does 'constructive dialogue' often signal in diplomatic contexts?",
            "options": ["A successful treaty", "No substantive agreement was reached",
                        "Military cooperation", "Trade concessions"], "answer": 1}],
    },
    {
        "title": "Microplastics in the Ocean",
        "passage": (
            "Microplastics — particles smaller than 5 millimeters — have been detected in every ocean "
            "zone, including deep-sea sediments and Arctic ice. Marine organisms ingest these particles, "
            "which can accumulate toxic chemicals and enter the food chain. Scientists estimate that "
            "humans consume roughly 5 grams of microplastics per week through water, seafood, and air."
        ),
        "questions": [{"question": "How do microplastics enter the human body?",
            "options": ["Only through contaminated tap water", "Through water, seafood, and air",
                        "Only through contact with packaging", "Through sunscreen products"], "answer": 1}],
    },
    {
        "title": "The Philosophy of Expertise",
        "passage": (
            "Expertise is not merely the accumulation of facts but the development of intuition — the "
            "ability to recognize patterns rapidly and act without conscious deliberation. Chess grandmasters, "
            "for example, do not calculate every possible move; they perceive the board holistically and "
            "focus on the most promising areas. This transfer of knowledge to implicit memory is the "
            "hallmark of genuine mastery."
        ),
        "questions": [{"question": "How do chess grandmasters approach the game, according to the passage?",
            "options": ["By calculating every possible move", "By relying on holistic pattern recognition",
                        "By memorizing historical games only", "By using probabilistic models"], "answer": 1}],
    },
    {
        "title": "Remote Work and Urban Migration",
        "passage": (
            "The normalization of remote work has prompted a measurable shift of workers from major "
            "metropolitan areas to smaller cities and rural regions. Real estate markets in mid-sized "
            "cities have seen price increases of up to 25 percent as urban professionals relocate. "
            "Municipal governments in these areas are investing in broadband infrastructure and "
            "co-working spaces to attract and retain this new resident demographic."
        ),
        "questions": [{"question": "How are mid-sized cities responding to the influx of remote workers?",
            "options": ["Restricting new housing development", "Investing in broadband and co-working spaces",
                        "Raising local income taxes", "Reducing public transport routes"], "answer": 1}],
    },
    {
        "title": "The Psychology of Procrastination",
        "passage": (
            "Procrastination is primarily an emotional regulation problem rather than a time management "
            "failure. People avoid tasks associated with negative feelings — boredom, anxiety, or self-doubt — "
            "by substituting more pleasant activities. Effective interventions focus on reducing the "
            "emotional discomfort of starting a task, such as using the two-minute rule to begin a "
            "small portion of the work immediately."
        ),
        "questions": [{"question": "What does research identify as the root cause of procrastination?",
            "options": ["Poor planning skills", "Emotional discomfort avoidance",
                        "Lack of discipline", "Unrealistic deadlines"], "answer": 1}],
    },
    {
        "title": "Gene Editing Ethics",
        "passage": (
            "CRISPR-Cas9 technology enables precise modifications to the human genome, raising "
            "profound ethical questions. While germline editing — changes that are heritable — holds "
            "promise for eliminating genetic diseases, critics warn it could be misused for enhancement "
            "purposes. International scientific bodies have called for a moratorium on clinical "
            "applications until governance frameworks are established."
        ),
        "questions": [{"question": "What have international scientific bodies called for regarding germline editing?",
            "options": ["Immediate clinical trials", "A moratorium until governance is in place",
                        "Complete prohibition of all CRISPR research", "Government ownership of the technology"], "answer": 1}],
    },
    {
        "title": "Language Endangerment and Revitalization",
        "passage": (
            "Approximately half of the world's 7,000 languages are projected to become extinct by 2100. "
            "The loss of a language means the irretrievable disappearance of unique cultural knowledge, "
            "ecological terminology, and ways of perceiving the world. Revitalization efforts — such as "
            "immersion schools and digital archiving — have successfully stabilized several endangered "
            "languages, including Welsh and Māori."
        ),
        "questions": [{"question": "What have immersion schools and digital archiving helped achieve?",
            "options": ["Complete language revival in all cases", "Stabilizing some endangered languages",
                        "Translating ancient texts", "Teaching dominant languages more efficiently"], "answer": 1}],
    },
    {
        "title": "Behavioral Economics and Public Policy",
        "passage": (
            "Behavioral economics applies insights from psychology to understand why people make "
            "irrational economic decisions. Governments have adopted 'nudge' policies — subtle "
            "environmental design choices that guide behavior without restricting freedom. Defaulting "
            "employees into pension savings plans, for example, dramatically increases participation "
            "rates compared to requiring active opt-in."
        ),
        "questions": [{"question": "What example of a 'nudge' policy does the passage describe?",
            "options": ["Taxing unhealthy foods", "Automatic enrollment in pension plans",
                        "Banning inefficient appliances", "Subsidizing electric cars"], "answer": 1}],
    },
    {
        "title": "Satellite Internet Access",
        "passage": (
            "Low-earth orbit satellite constellations are expanding internet connectivity to remote "
            "regions where fiber infrastructure is economically unfeasible. Latency has dropped to "
            "under 50 milliseconds with current systems, making real-time applications viable. "
            "Critics note concerns about space debris and the concentration of orbital infrastructure "
            "in the hands of a few private companies."
        ),
        "questions": [{"question": "What concern do critics raise about satellite internet expansion?",
            "options": ["It is too slow for video calls", "Space debris and corporate concentration",
                        "Signal interference with aircraft", "Its high monthly subscription cost"], "answer": 1}],
    },
    {
        "title": "Urban Heat Islands",
        "passage": (
            "Urban heat islands form when built surfaces — concrete, asphalt, and glass — absorb and "
            "retain solar energy, raising city temperatures by 2–5 degrees Celsius above surrounding "
            "rural areas. This effect intensifies heatwave mortality and increases energy demand for "
            "cooling. Green roofs, reflective pavements, and urban tree canopy expansion are among the "
            "most effective mitigation strategies."
        ),
        "questions": [{"question": "What is an effective strategy to reduce the urban heat island effect?",
            "options": ["Building underground car parks", "Expanding green roofs and tree canopy",
                        "Increasing air conditioning capacity", "Using darker road surfaces"], "answer": 1}],
    },
    {
        "title": "Philosophical Aspects of Time",
        "passage": (
            "Physicists and philosophers disagree on whether time is fundamental or emergent. "
            "Some interpretations of quantum mechanics suggest that time is not a basic ingredient "
            "of reality but arises from the relationships between physical systems. If correct, "
            "our intuitive sense of a flowing present moment may be a product of consciousness "
            "rather than an objective feature of the universe."
        ),
        "questions": [{"question": "What might the flowing sense of time be, according to some quantum interpretations?",
            "options": ["An objective universal feature", "A product of consciousness",
                        "A measurement error", "A cultural construct"], "answer": 1}],
    },
    {
        "title": "Digital Literacy in Education",
        "passage": (
            "As AI-generated content becomes indistinguishable from human-written text, digital "
            "literacy has emerged as a core educational competency. Students must learn not only "
            "how to use digital tools but how to critically evaluate the credibility and origin of "
            "information. Schools that integrate media literacy across all subjects see greater "
            "improvements in student critical thinking than those treating it as a standalone course."
        ),
        "questions": [{"question": "What approach is most effective for teaching media literacy?",
            "options": ["A dedicated semester-long course", "Integration across all subjects",
                        "After-school workshops only", "Online self-paced modules"], "answer": 1}],
    },
]

# ──────────────────────────────────────────────
# CET-6 翻译题（10条唯一）
# ──────────────────────────────────────────────
CET6_TRANSLATION = [
    {"zh": "随着人工智能技术的迅猛发展，许多传统行业正面临前所未有的挑战与机遇。",
     "en_reference": "With the rapid development of artificial intelligence technology, many traditional industries are facing unprecedented challenges and opportunities.",
     "keywords": ["artificial", "intelligence", "unprecedented"]},
    {"zh": "中国政府高度重视生态文明建设，致力于实现经济发展与环境保护的协调统一。",
     "en_reference": "The Chinese government attaches great importance to ecological civilization and is committed to achieving harmonious development between economic growth and environmental protection.",
     "keywords": ["ecological", "committed", "harmonious"]},
    {"zh": "全球化背景下，跨文化交流能力已成为衡量高素质人才的重要标准之一。",
     "en_reference": "In the context of globalization, cross-cultural communication skills have become one of the key criteria for measuring high-quality talent.",
     "keywords": ["cross-cultural", "globalization", "criteria"]},
    {"zh": "研究表明，长期坚持阅读不仅能扩大词汇量，还能显著提升逻辑思维能力。",
     "en_reference": "Research shows that consistent long-term reading not only expands vocabulary but also significantly enhances logical thinking ability.",
     "keywords": ["consistent", "vocabulary", "logical"]},
    {"zh": "面对日益严峻的就业形势，越来越多的大学生选择通过创业来实现自身价值。",
     "en_reference": "Faced with increasingly severe employment pressures, more and more college students choose entrepreneurship to realize their self-worth.",
     "keywords": ["entrepreneurship", "employment", "realize"]},
    {"zh": "科学技术的进步使人类得以探索宇宙的奥秘，拓宽了我们对世界的认知边界。",
     "en_reference": "Advances in science and technology have enabled humanity to explore the mysteries of the universe, broadening our cognitive boundaries of the world.",
     "keywords": ["advances", "explore", "broadening"]},
    {"zh": "优质的医疗资源分配不均是制约许多国家公共卫生体系发展的重要因素。",
     "en_reference": "The unequal distribution of quality medical resources is an important factor restricting the development of public health systems in many countries.",
     "keywords": ["unequal", "distribution", "restricting"]},
    {"zh": "社交媒体的普及既为信息传播提供了便利，也对个人隐私保护带来了新的挑战。",
     "en_reference": "The popularity of social media has facilitated information dissemination while also bringing new challenges to personal privacy protection.",
     "keywords": ["dissemination", "facilitated", "privacy"]},
    {"zh": "在追求经济高速增长的同时，我们不能忽视社会公平与可持续发展的重要性。",
     "en_reference": "While pursuing rapid economic growth, we must not neglect the importance of social equity and sustainable development.",
     "keywords": ["neglect", "equity", "sustainable"]},
    {"zh": "传承和弘扬中华优秀传统文化，是增强民族凝聚力和文化自信的重要途径。",
     "en_reference": "Inheriting and promoting outstanding traditional Chinese culture is an important way to enhance national cohesion and cultural confidence.",
     "keywords": ["inheriting", "cohesion", "confidence"]},
]


def build_listening(items: list, prefix: str) -> list:
    result = []
    for i, item in enumerate(items, start=1):
        obj = dict(item)
        obj["id"] = f"{prefix}_l_{i:02d}"
        result.append(obj)
    return result


def build_reading(items: list, prefix: str) -> list:
    result = []
    for i, item in enumerate(items, start=1):
        obj = dict(item)
        obj["id"] = f"{prefix}_r_{i:02d}"
        result.append(obj)
    return result


def build_translation(items: list, prefix: str) -> list:
    result = []
    for i, item in enumerate(items, start=1):
        obj = dict(item)
        obj["id"] = f"{prefix}_t_{i:02d}"
        result.append(obj)
    return result


def write_course_content(course_id: str, listening: list, reading: list, translation: list) -> None:
    course_dir = OUT / course_id
    course_dir.mkdir(parents=True, exist_ok=True)

    datasets = [
        ("listening.json", {"course_id": course_id, "count": len(listening), "items": listening}),
        ("reading.json", {"course_id": course_id, "count": len(reading), "items": reading}),
        ("translation.json", {"course_id": course_id, "count": len(translation), "items": translation}),
    ]
    for name, data in datasets:
        path = course_dir / name
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote {path}  ({data['count']} items)")


def main() -> None:
    write_course_content(
        "cet4",
        build_listening(CET4_LISTENING, "cet4"),
        build_reading(CET4_READING, "cet4"),
        build_translation(CET4_TRANSLATION, "cet4"),
    )
    write_course_content(
        "cet6",
        build_listening(CET6_LISTENING, "cet6"),
        build_reading(CET6_READING, "cet6"),
        build_translation(CET6_TRANSLATION, "cet6"),
    )


if __name__ == "__main__":
    main()
