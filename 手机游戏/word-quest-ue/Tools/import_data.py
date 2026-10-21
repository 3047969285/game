"""Import the learning-data JSON into UE DataTables.

Source: 手机游戏/word-quest-game/public/data/{templates,vocabulary,content}
Run headless with UnrealEditor-Cmd -run=pythonscript -script=<this file>.
"""
import json
import os
import unreal

PROJECT = unreal.Paths.project_dir()
SRC = os.path.normpath(os.path.join(PROJECT, "..", "word-quest-game", "public", "data"))
DEST = "/Game/Data"

# course id -> struct/table name (DataTable row structs are created in editor once;
# this script only prints the conversion plan until the structs exist)
COURSES = ("cet4", "cet6", "college_english_rw3")


def main():
    unreal.EditorAssetLibrary.make_directory(DEST)
    for course in COURSES:
        vocab = os.path.join(SRC, "vocabulary", course + ".json")
        if not os.path.exists(vocab):
            unreal.log_warning("missing vocabulary: " + vocab)
            continue
        data = json.load(open(vocab, encoding="utf-8"))
        words = data.get("words", [])
        unreal.log(f"{course}: {len(words)} words -> {DEST}/DT_{course}_Vocabulary (TODO: DataTable struct)")
    unreal.log("IMPORT DATA PLAN DONE")


if __name__ == "__main__":
    main()
