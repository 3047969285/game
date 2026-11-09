"""D14：UI 本地化字符串表 → Content/Data/loc/ui_strings.csv，并导入 UE StringTable `/Game/Data/ST_UI`。

来源：D12 学习界面清单；旧 Web 界面中文审计已冻结到 SourceAssets/Migration/web-ui-audit.json。
注意：按 Docs/tasks/ue-run-rules.md，所有 UE 进程必须通过 Tools/run_ue_serial.sh 串行启动；
StringTable 资产导入必须用完整编辑器 -ExecutePythonScript，不能在 commandlet + -nullrhi 下做
（2026-10-21 曾在 UAssetToolsImpl::ImportAssetsInternal 触发 SharedPointer.h:1133 断言崩溃）。
"""
from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
SOURCE_AUDIT = PROJECT / "SourceAssets" / "Migration" / "web-ui-audit.json"
OUT_DIR = PROJECT / "Content" / "Data" / "loc"
OUT_CSV = OUT_DIR / "ui_strings.csv"
AUDIT = OUT_DIR / "ui_strings_audit.json"
FIELDS = ["key", "zh", "en"]

# 人工整理：key 与 D12 界面清单一致；英文翻译面向 UE 显示（简洁）。
CURATED: list[tuple[str, str, str]] = [
    # 全局 / 通用
    ("ui.common.back", "返回", "Back"), ("ui.common.next", "继续", "Continue"),
    ("ui.common.submit", "提交", "Submit"), ("ui.common.skip", "跳过", "Skip"),
    ("ui.common.close", "关闭", "Close"), ("ui.common.cancel", "取消", "Cancel"),
    ("ui.common.confirm", "确认", "Confirm"), ("ui.common.retry", "重试", "Retry"),
    ("ui.common.loading", "加载中…", "Loading…"), ("ui.common.error", "出错了", "Something went wrong"),
    ("ui.common.saved", "已保存", "Saved"), ("ui.common.score", "得分", "Score"),
    ("ui.common.progress", "进度", "Progress"), ("ui.common.completed", "已完成", "Completed"),
    ("ui.common.locked", "未解锁", "Locked"), ("ui.common.unlocked", "已解锁", "Unlocked"),
    ("ui.common.start", "开始", "Start"), ("ui.common.pause", "暂停", "Pause"),
    ("ui.common.resume", "继续", "Resume"), ("ui.common.exit", "退出", "Exit"),
    ("ui.common.settings", "设置", "Settings"), ("ui.common.on", "开", "On"),
    ("ui.common.off", "关", "Off"), ("ui.common.day", "天", "day"), ("ui.common.days", "天后", "days"),
    # 导航 / 单元选择
    ("ui.nav.memory_box", "记忆匣", "Memory Box"), ("ui.nav.learning", "学习实验室", "Learning Lab"),
    ("ui.nav.explore", "探索", "Explore"), ("ui.nav.review", "复习", "Review"),
    ("ui.unit.title", "单元", "Unit"), ("ui.unit.select", "选择单元", "Select a unit"),
    ("ui.unit.enter_memory", "进入记忆", "Enter memory"), ("ui.unit.complete", "本单元已完成", "Unit completed"),
    ("ui.unit.locked_hint", "完成上一单元后解锁", "Complete the previous unit to unlock"),
    ("ui.unit.words", "本单元词汇", "Unit vocabulary"), ("ui.unit.continue_last", "继续上次", "Continue where you left off"),
    # 学习实验室
    ("ui.learn.vocabulary", "词汇", "Vocabulary"), ("ui.learn.reading", "阅读", "Reading"),
    ("ui.learn.listening", "听力", "Listening"), ("ui.learn.translation", "翻译", "Translation"),
    ("ui.learn.writing", "写作", "Writing"), ("ui.learn.quiz", "小测", "Quiz"),
    ("ui.learn.new_words", "新词学习", "New words"), ("ui.learn.weak_words", "薄弱巩固", "Weak words"),
    ("ui.learn.spaced_review", "间隔复习", "Spaced review"),
    ("ui.learn.start_review", "开始复习", "Start review"),
    ("ui.learn.due_count", "待复习 {0} 词", "{0} words due"),
    ("ui.learn.mastered_count", "已掌握 {0}", "Mastered {0}"),
    # 词汇卡
    ("ui.wordcard.reveal", "点击翻面", "Tap to reveal"),
    ("ui.wordcard.word", "单词", "Word"), ("ui.wordcard.phonetic", "音标", "Phonetic"),
    ("ui.wordcard.pos", "词性", "Part of speech"), ("ui.wordcard.meaning", "释义", "Meaning"),
    ("ui.wordcard.example", "例句", "Example"), ("ui.wordcard.collocation", "搭配", "Collocation"),
    ("ui.wordcard.blurred", "模糊", "Blurred"), ("ui.wordcard.clear", "清晰", "Clear"),
    ("ui.wordcard.sparkling", "闪光", "Sparkling"), ("ui.wordcard.play_audio", "播放发音", "Play pronunciation"),
    ("ui.wordcard.prev", "上一个", "Previous"), ("ui.wordcard.next", "下一个", "Next"),
    # 阅读
    ("ui.reading.title", "课文", "Reading passage"), ("ui.reading.paragraph", "段落", "Paragraph"),
    ("ui.reading.anchor", "段落锚点", "Paragraph anchor"), ("ui.reading.read_aloud", "朗读本段", "Read this paragraph"),
    ("ui.reading.hide_meaning", "隐藏释义", "Hide meanings"), ("ui.reading.next_paragraph", "下一段", "Next paragraph"),
    # 听力
    ("ui.listening.title", "听力", "Listening"), ("ui.listening.play", "播放", "Play"),
    ("ui.listening.show_script", "显示原文", "Show transcript"), ("ui.listening.hide_script", "隐藏原文", "Hide transcript"),
    ("ui.listening.replay", "重听", "Replay"), ("ui.listening.speed", "语速", "Speed"),
    # 翻译
    ("ui.translation.title", "翻译", "Translation"), ("ui.translation.source", "中文", "Chinese"),
    ("ui.translation.input_hint", "输入英文…", "Type your English…"),
    ("ui.translation.keywords", "关键词提示", "Keyword hints"),
    ("ui.translation.submit", "提交", "Submit"), ("ui.translation.show_reference", "看参考", "Show reference"),
    ("ui.translation.reference", "参考译文", "Reference translation"),
    ("ui.translation.keyword_hits", "命中 {0}/{1} 个关键词", "{0}/{1} keywords used"),
    # 写作
    ("ui.writing.title", "写作", "Writing"), ("ui.writing.prompt", "题目", "Prompt"),
    ("ui.writing.outline", "提纲", "Outline"), ("ui.writing.drafting", "写作中", "Drafting"),
    ("ui.writing.word_bank", "词块", "Word bank"), ("ui.writing.word_count", "字数：{0}", "Words: {0}"),
    # 小测 / 题目
    ("ui.quiz.title", "小测", "Quiz"), ("ui.quiz.question", "第 {0} 题，共 {1} 题", "Question {0} of {1}"),
    ("ui.quiz.correct", "正确", "Correct"), ("ui.quiz.incorrect", "不正确", "Not quite"),
    ("ui.quiz.explanation", "解析", "Explanation"), ("ui.quiz.show_answer", "显示答案", "Show answer"),
    ("ui.quiz.streak", "连对 {0}", "Streak {0}"), ("ui.quiz.result", "本轮结果", "Round results"),
    # 复习
    ("ui.review.title", "间隔复习", "Spaced review"), ("ui.review.due_today", "今日 {0} 词", "{0} words today"),
    ("ui.review.weak", "薄弱词", "Weak words"), ("ui.review.all", "全部", "All words"),
    ("ui.review.next_review", "下次复习：{0}", "Next review: {0}"),
    ("ui.review.reviewed_times", "已复习 {0} 次", "Reviewed {0} times"),
    ("ui.review.empty", "今天没有到期复习词", "No reviews due today"),
    ("ui.review.round_done", "本轮复习完成！", "Review round complete!"),
    # 结果 / 记忆底片
    ("ui.result.title", "记忆底片", "Memory negative"), ("ui.result.correct_ratio", "正确 {0}/{1}", "{0}/{1} correct"),
    ("ui.result.new_mastered", "新掌握 {0} 词", "{0} new words mastered"),
    ("ui.result.back_to_box", "返回记忆匣", "Back to memory box"), ("ui.result.watch_again", "再看一遍", "Watch again"),
    # 设置 / 字幕
    ("ui.settings.subtitle", "字幕", "Subtitles"), ("ui.settings.subtitle_zh", "仅中文", "Chinese only"),
    ("ui.settings.subtitle_en", "仅英文", "English only"), ("ui.settings.subtitle_both", "中英双语", "Bilingual"),
    ("ui.settings.subtitle_off", "关闭字幕", "Subtitles off"),
    ("ui.settings.font_size", "字号", "Font size"), ("ui.settings.font_standard", "标准", "Standard"),
    ("ui.settings.font_large", "大", "Large"), ("ui.settings.font_xl", "特大", "Extra large"),
    ("ui.settings.reduce_motion", "减少动态", "Reduce motion"),
    ("ui.settings.high_contrast", "高对比度", "High contrast"),
    ("ui.settings.volume", "音量", "Volume"), ("ui.settings.language", "语言", "Language"),
    # 无障碍 / 系统
    ("ui.a11y.focus_hint", "按 Tab 移动焦点，Enter 确认", "Press Tab to move focus, Enter to confirm"),
    ("ui.a11y.question_progress", "第 {0} 题，共 {1} 题", "Question {0} of {1}"),
    ("ui.system.memory_recall", "记忆回放", "Memory Recall"),
    ("ui.system.enter_memory", "进入记忆", "Enter memory"),
    ("ui.system.recalling", "正在回忆…", "Recalling…"),
]


def collect_source_strings() -> dict:
    """返回退役前的历史界面审计；UE 新增字符串由 CURATED 维护。"""
    result = json.loads(SOURCE_AUDIT.read_text(encoding="utf-8"))
    return {**result, "sourceStatus": "archived-web-client"}


def write_csv(rows) -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=FIELDS)
        w.writeheader()
        for key, zh, en in rows:
            if any(x in en for x in ("；", "，", "。")) or any(x in zh for x in ("；", ",", "?", "!")) is False:
                pass
            w.writerow({"key": key, "zh": zh, "en": en})
    return OUT_CSV


ST_CSV = OUT_DIR / "ui_strings_for_st.csv"


def write_st_csv() -> Path:
    """StringTable 导入格式：Key,SourceString（源语言中文；英文在 ui_strings.csv 与 DT_UIStrings 里）。"""
    with ST_CSV.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["Key", "SourceString"])
        for key, zh, _en in CURATED:
            w.writerow([key, zh])
    return ST_CSV


def ue_import_datatable() -> dict:
    """headless 可用的兜底：DT_UIStrings（JsonObjectWrapper，列 JsonString = {"zh","en"}）。"""
    import unreal
    row_struct = unreal.load_object(None, "/Script/JsonUtilities.JsonObjectWrapper")
    factory = unreal.DataTableFactory()
    try:
        factory.struct = row_struct
    except Exception:
        factory.set_editor_property("struct", row_struct)
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    path = "/Game/Data/DT_UIStrings"
    if unreal.EditorAssetLibrary.does_asset_exist(path):
        dt = unreal.load_asset(path)
    else:
        dt = asset_tools.create_asset("DT_UIStrings", "/Game/Data", unreal.DataTable, factory)
    rows = []
    for i, (key, zh, en) in enumerate(CURATED):
        rows.append({"Name": key, "JsonString": json.dumps({"zh": zh, "en": en}, ensure_ascii=False)})
    csv_path = OUT_DIR / "dt_ui_strings.csv"
    with csv_path.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["Name", "JsonString"])
        w.writeheader()
        w.writerows(rows)
    ok = unreal.DataTableFunctionLibrary.fill_data_table_from_csv_file(dt, str(csv_path), row_struct)
    count = len(list(unreal.DataTableFunctionLibrary.get_data_table_row_names(dt)))
    unreal.EditorAssetLibrary.save_loaded_asset(dt)
    unreal.log_error(f"[D14] DT_UIStrings fill={ok} rows={count} expected={len(CURATED)}")
    if not ok or count != len(CURATED):
        raise RuntimeError(f"DT_UIStrings import mismatch: ok={ok} rows={count}")
    return {"asset": path, "rows": count, "ok": True}


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--data-only", action="store_true")
    args = ap.parse_args(argv)
    keys = [k for k, _, _ in CURATED]
    assert len(keys) == len(set(keys)), "duplicate keys"
    assert all(zh.strip() and en.strip() for _, zh, en in CURATED)
    path = write_csv(CURATED)
    st_path = write_st_csv()
    audit = collect_source_strings()
    AUDIT.write_text(json.dumps(audit, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"[D14] rows={len(CURATED)} -> {path} (ST 格式: {st_path}); audit={json.dumps(audit, ensure_ascii=False)[:160]}")
    if not args.data_only:
        try:
            print("[D14] UE:", ue_import_datatable())
            print("[D14] ST_UI 导入交给 Codex：用完整编辑器 + Tools/run_ue_serial.sh（见 Docs/data/ui-strings.md）")
        except ImportError:
            print("[D14] unreal not available; CSV written only")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
