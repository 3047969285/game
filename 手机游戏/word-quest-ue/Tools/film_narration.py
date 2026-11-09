#!/usr/bin/env python3
"""Claude · showcase film: original narration for the Unit 1 film + per-shot timing plan.

The film is meant to be shared publicly, so it carries NO textbook prose: the old man of 2090 remembers each memory
set in his own words (original lines below; prologue lines are the game's own, acts.json). The textbook text and its
voice-over stay inside the game.

Writes Saved/Film/unit01/narration/<key>.wav (macOS `say`, voice Daniel, ~150 wpm) and Saved/Film/unit01/plan.json:
  {"intro": [...], "cards": {section: {...}}, "scenes": {scene_id: {...}}, "outro": {...},
   "shots": {"<scene>/<shot>": frames}}  — shot frames sized so each scene lasts its narration + air.
Usage: python3 Tools/film_narration.py
"""
import json
import subprocess
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Saved" / "Film" / "unit01"
VOICE, RATE, FPS = "Daniel", "148", 24

INTRO = ["It has been sixty-four years.", "I still remember the sound of English in that classroom.",
         "Tonight, I would like to hear it once more."]
CARDS = {
    "section_a": "The first lesson was about talking, and about not talking.",
    "section_b": "Then we read about the digital wave, and how it carried all of us.",
    "section_c": "And at home, a smartphone was almost all you needed.",
}
SCENES = {
    "u01a_s1": "One family switched everything off for a weekend. I remember the quiet: a chessboard, two books, and nobody looking down.",
    "u01a_s2": "The rest of the week, the screens came back. Four people in one room, each of them somewhere else.",
    "u01a_s3": "Even at the long table, eyes kept slipping down to small lights under the edge.",
    "u01a_s4": "We sat side by side in the library, so close, and each of us alone.",
    "u01a_s5": "Desks became cockpits. A wall of screens, and a door no one knocked on.",
    "u01a_s6": "A message is a sip. A real talk is a long, slow swallow. We forgot the difference.",
    "u01a_s7": "The kitchen, the car, the dinner table. Some places should belong only to the people in them.",
    "u01a_s8": "So the lesson ended with a simple wish: look up, and listen.",
    "u01b_s1": "The city glowed at night. Every window a screen, and every screen a window.",
    "u01b_s2": "Our classroom had chalk and a touchscreen at the same time. I loved them both.",
    "u01b_s3": "Children learned to swipe before they learned to tie their shoes.",
    "u01b_s4": "At home we gathered around one light, and spoke to it more than to each other.",
    "u01b_s5": "Work followed us everywhere. Some colleagues I only knew as small faces in a grid.",
    "u01b_s6": "Even a holiday began on a screen, a beach chosen by its reviews.",
    "u01b_s7": "One street, four errands, and I never once took out my wallet.",
    "u01b_s8": "We wondered what the future would make of us. Now I am the future, and I am still wondering.",
    "u01c_s1": "Breakfast at dawn: the hiss of batter, the smell of spring onions, and a quiet beep to pay.",
    "u01c_s2": "At the counter, the cashier never touched a coin.",
    "u01c_s3": "Shared bikes waited on every corner, unlocked with a glance at a code.",
    "u01c_s4": "Lunch came with a coupon, and the coupon came with a notification.",
    "u01c_s5": "The mall was bright and full, and almost everyone was looking at their hand.",
    "u01c_s6": "At night I paid my bills in a minute, and spent an hour wishing someone would call.",
}
OUTRO = "That was Unit One. Sixty-four years later, I still remember who was in the room."


def tts(key, text):
    aiff = OUT / "narration" / f"{key}.aiff"
    wav = OUT / "narration" / f"{key}.wav"
    subprocess.run(["say", "-v", VOICE, "-r", RATE, "-o", str(aiff), text], check=True)
    subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16@22050", "-c", "1", str(aiff), str(wav)], check=True)
    aiff.unlink()
    with wave.open(str(wav)) as w:
        dur = w.getnframes() / w.getframerate()
    return {"text": text, "wav": str(wav.relative_to(ROOT)), "seconds": round(dur, 3)}


def main():
    (OUT / "narration").mkdir(parents=True, exist_ok=True)
    scenes = json.loads((ROOT / "Content/Data/memory/textbook_scenes/unit01.json").read_text())
    plan = {"fps": FPS, "intro": [tts(f"intro_{i}", t) for i, t in enumerate(INTRO)],
            "cards": {k: tts(f"card_{k}", v) for k, v in CARDS.items()}, "scenes": {}, "shots": {},
            "outro": tts("outro", OUTRO)}
    for art in scenes["articles"]:
        for sc in art["scenes"]:
            n = tts(sc["id"], SCENES[sc["id"]])
            n["title"] = sc["title"]
            plan["scenes"][sc["id"]] = n
            total = max(4.5, n["seconds"] + 1.6)                 # narration + air
            # one shot per scene (the scene's primary camera, listed first) keeps the film tight and fast to render
            plan["shots"][f"{sc['id']}/{sc['shots'][0]['name']}"] = int(round(total * FPS))
    (OUT / "plan.json").write_text(json.dumps(plan, indent=1, ensure_ascii=False))
    secs = sum(plan["shots"].values()) / FPS
    print(f"PLAN {len(plan['scenes'])} scenes, {len(plan['shots'])} shots, {secs:.0f}s of shots, "
          f"{sum(n['seconds'] for n in plan['scenes'].values()):.0f}s narration")


if __name__ == "__main__":
    main()
