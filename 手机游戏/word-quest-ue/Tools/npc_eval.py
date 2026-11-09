#!/usr/bin/env python3
"""D31 NPC evaluation for the Offline-day family (DeepSeek).

Reads the key only from ~/.config/wordquest/deepseek.env or environment variables. The key is never printed,
logged or written to any output file; request headers are never echoed.

Usage:
  ~/.local/share/hunyuan3d/.venv/bin/python Tools/npc_eval.py --dry-run
  ~/.local/share/hunyuan3d/.venv/bin/python Tools/npc_eval.py --personas paul,maria,jason,jack --max-calls 40

Outputs: Docs/qa/npc-eval.md, Docs/qa/npc-eval.json
"""
from __future__ import annotations

import argparse
import json
import os
import re
import statistics
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PERSONAS = ROOT / "Content/Data/npc/personas"
INPUTS = ROOT / "Content/Data/npc/eval/offline_day_inputs.json"
TEMPLATE = ROOT / "Content/Data/npc/prompts/system_template.md"
WORDS_CSV = ROOT / "Content/Data/textbook/rw3/words.csv"
OUT_MD = ROOT / "Docs/qa/npc-eval.md"
OUT_JSON = ROOT / "Docs/qa/npc-eval.json"
DEFAULT_PERSONAS = ["paul", "maria", "jason", "jack"]
ENV_FILE = Path(os.path.expanduser("~/.config/wordquest/deepseek.env"))
DEFAULT_BASE = "https://api.deepseek.com"
DEFAULT_MODEL = "deepseek-chat"
MAX_TOKENS = 500
TEMPERATURE = 0.5

COMMON = set("""a about above after again against all almost alone along already also although always am among an and another any anyone
anything are around as ask asked at away back be because been before behind being believe below best better between both bring
brings but buy by call came can cannot care carry case change check child children city close cold come comes coming could country
course cut day days did different do does doing done door down during each early easy eat end even evening every everyone everything
face fact family far fast father feel few find fine first five follow food for found four free friend friends from front full get
gets getting girl give given go goes going gone good got great group grow had half hand happen happy has have having he head hear
heard help her here herself high him himself his hold home hope hour house how however i if important in inside instead into is it
its itself job just keep kind know known large last late later laugh learn least leave left less let letter life light like line
little live long look looked looking lose lot love low made make makes making man many may maybe me mean means meet might mind
minute miss moment money month more morning most mother move much must my myself name near need never new next night no none nor
not nothing now number of off often oh ok okay old on once one only open or other others our out over own part people perhaps person
phone place plan play please point possible put question quite rather read ready real really reason remember rest right room run
same say says school see seem seen self sentence she should show side since sit small so some someone something sometimes son soon
sorry speak start stay still stop such sure take talk tell than thank that the their them themselves then there these they thing
things think this those though thought three through time to today together too took top toward town try turn two under until up
upon us use used very visit wait want was water way we week well went were what when where which while who whole why will with
within without woman women word words work world would write year years yes yesterday yet you young your yourself""".split())

META_PHRASES = ("as an ai", "language model", "i am an ai", "i'm an ai", "openai", "deepseek", "chatgpt",
                "i cannot feel", "i am a program", "i'm a program")
GENTLE_BAD = ("wrong", "incorrect", "error", "you made a mistake", "bad grammar")
REFUSAL_CUES = ("can't", "cannot", "won't", "will not", "not going to", "private", "secret", "sorry", "not something i share", "ask her", "ask him", "let's change",
                "let's talk about", "let us talk about", "safer", "not something i", "i shouldn't")


def load_env():
    values = {}
    if ENV_FILE.exists():
        for raw in ENV_FILE.read_text(encoding="utf-8", errors="replace").splitlines():
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            values[key.strip()] = value.strip().strip('"').strip("'")
    for key in ("DEEPSEEK_API_KEY", "DEEPSEEK_BASE_URL", "DEEPSEEK_MODEL"):
        if os.environ.get(key):
            values[key] = os.environ[key]
    return values


def build_system_prompt(persona, template, scene_index=0, focus_words=None, other_words=None):
    schedule = persona["schedule"][min(scene_index, len(persona["schedule"]) - 1)]
    appearance = persona["appearance"]
    slots = {
        "display_name": persona["display_name"],
        "age": str(persona["age"]),
        "occupation": persona["occupation"],
        "personality_traits": ", ".join(persona["personality"]["traits"]),
        "speaking_style": persona["personality"]["speaking_style"],
        "appearance_summary": "%s; clothing: %s; hair: %s" % (appearance.get("character", ""), appearance.get("clothing", ""), appearance.get("hair", "")),
        "knowledge_known": "; ".join(persona["knowledge"]["knows"]),
        "knowledge_unknown": "; ".join(persona["knowledge"]["does_not_know"]),
        "scene_title": schedule.get("title", ""),
        "scene_activity": schedule.get("activity", ""),
        "level": persona["teaching"]["level"],
        "focus_words": ", ".join(focus_words or persona["teaching"]["target_words"][:2]),
        "other_words": ", ".join(other_words or persona["teaching"]["target_words"][2:8]),
        "boundaries_avoid": ", ".join(persona["boundaries"]["avoid"]),
    }
    text = template
    for key, value in slots.items():
        text = text.replace("{{%s}}" % key, str(value))
    return text


def call_deepseek(base, key, model, system, user, stream=True, timeout=90):
    url = base.rstrip("/") + "/chat/completions"
    payload = {"model": model, "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
               "max_tokens": MAX_TOKENS, "temperature": TEMPERATURE,
               "stream": bool(stream)}
    if stream:
        payload["stream_options"] = {"include_usage": True}
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(url, data=body, headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key,
        "Accept": "text/event-stream" if stream else "application/json"})
    started = time.monotonic()
    first = None
    content = ""
    usage = None
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            if stream:
                for raw in response:
                    line = raw.decode("utf-8", "replace").strip()
                    if not line.startswith("data:"):
                        continue
                    data = line[5:].strip()
                    if data == "[DONE]":
                        break
                    try:
                        obj = json.loads(data)
                    except json.JSONDecodeError:
                        continue
                    if obj.get("usage"):
                        usage = obj["usage"]
                    for choice in obj.get("choices") or []:
                        piece = (choice.get("delta") or {}).get("content")
                        if piece:
                            if first is None:
                                first = time.monotonic()
                            content += piece
            else:
                obj = json.loads(response.read().decode("utf-8", "replace"))
                content = obj["choices"][0]["message"]["content"]
                first = time.monotonic()
                usage = obj.get("usage")
    except urllib.error.HTTPError as error:
        detail = ""
        try:
            detail = error.read().decode("utf-8", "replace")[:300]
        except Exception:
            pass
        return {"ok": False, "error": "HTTP %s" % error.code, "detail": detail, "content": "", "usage": None,
                "ttft_ms": None, "total_ms": int((time.monotonic() - started) * 1000)}
    except Exception as error:  # noqa: BLE001
        return {"ok": False, "error": type(error).__name__, "detail": "", "content": "", "usage": None,
                "ttft_ms": None, "total_ms": int((time.monotonic() - started) * 1000)}
    total_ms = int((time.monotonic() - started) * 1000)
    return {"ok": True, "content": content, "usage": usage,
            "ttft_ms": int((first - started) * 1000) if first else None, "total_ms": total_ms}


def extract_json_object(text):
    depth = 0
    start = None
    for index, char in enumerate(text):
        if char == "{":
            if depth == 0:
                start = index
            depth += 1
        elif char == "}" and depth:
            depth -= 1
            if depth == 0 and start is not None:
                try:
                    return json.loads(text[start:index + 1]), start, index
                except json.JSONDecodeError:
                    start = None
    return None, None, None


def split_reply(content):
    lines = [ln.strip() for ln in content.strip().splitlines() if ln.strip()]
    meta = None
    kept = []
    for line in lines:
        if line.startswith("@@" + "META"):
            payload = line.split("@@META", 1)[1].strip()
            try:
                meta = json.loads(payload)
                continue
            except json.JSONDecodeError:
                meta = None
        kept.append(line)
    text = "\n".join(kept)
    if meta is None:
        found, start, end = extract_json_object(text)
        if found is not None:
            meta = found
            text = (text[:start] + text[end + 1:]).strip().strip("`").strip()
    return text, meta


def sentence_count(text):
    cleaned = re.sub(r"\b(Mr|Mrs|Ms|Dr|e\.g|i\.e)\.", r"\1", text)
    parts = [p for p in re.split(r"(?<=[.!?])\s+|\n+", cleaned.strip()) if p.strip()]
    return len(parts), parts


def known_vocab():
    known = set(COMMON)
    try:
        import csv
        with WORDS_CSV.open(encoding="utf-8-sig") as handle:
            for row in csv.DictReader(handle):
                word = (row.get("word") or "").lower().strip()
                if word:
                    known.add(word)
                    for suff in ("s", "es", "ed", "ing", "ly"):
                        known.add(word + suff)
    except Exception:  # noqa: BLE001
        pass
    try:
        for path in (ROOT / "Content/Data/textbook/rw3/articles").glob("unit*.json"):
            data = json.loads(path.read_text(encoding="utf-8"))
            for text in data.get("texts", []):
                for paragraph in text.get("paragraphs", []):
                    for token in re.findall(r"[A-Za-z']+", paragraph.lower()):
                        known.add(token)
                        known.add(token.rstrip("s"))
    except Exception:  # noqa: BLE001
        pass
    return known


def level_metrics(reply, known):
    tokens = re.findall(r"[A-Za-z']+", reply.lower())
    if not tokens:
        return {"tokens": 0, "rare_ratio": 0.0, "long_ratio": 0.0, "avg_sentence_len": 0.0, "ok": False}
    rare = sum(1 for token in tokens if token not in known and not token.endswith("'s"))
    long_words = sum(1 for token in tokens if len(token) >= 10)
    count, parts = sentence_count(reply)
    avg_len = statistics.mean(len(re.findall(r"[A-Za-z']+", part)) for part in parts) if parts else 0.0
    metrics = {"tokens": len(tokens), "rare_ratio": round(rare / len(tokens), 3),
               "long_ratio": round(long_words / len(tokens), 3), "avg_sentence_len": round(avg_len, 1)}
    metrics["ok"] = count <= 4 and metrics["rare_ratio"] <= 0.40 and metrics["long_ratio"] <= 0.30 and avg_len <= 24
    return metrics


def stem_hit(word, text):
    low = text.lower()
    base = word.lower()
    return any(candidate in low for candidate in (base, base + "s", base + "d", base + "ed", base + "ing", base + "ly",
                                                  base[:-1] if base.endswith("e") else base))


def evaluate(persona, item, content, usage, ttft_ms, known_after, known_before):
    reply, meta = split_reply(content)
    checks = {}
    issues = []
    low = reply.lower()
    checks["json"] = meta is not None and isinstance(meta.get("used_words", []), list) and isinstance(meta.get("suggested_replies", []), list)
    if not checks["json"]:
        issues.append("metadata JSON missing/invalid")
    checks["role"] = bool(reply) and not any(phrase in low for phrase in META_PHRASES)
    if not checks["role"]:
        issues.append("breaks character / meta phrase")
    count, _ = sentence_count(reply)
    checks["sentence_count"] = 1 <= count <= 4
    if not checks["sentence_count"]:
        issues.append("sentence count %d not 1-3" % count)
    metrics = level_metrics(reply, known_before["vocab"])
    checks["level"] = metrics["ok"]
    if not checks["level"]:
        issues.append("difficulty heuristic failed")
    targets = persona["teaching"]["target_words"]
    focus = [w for w in (known_before.get("focus") or []) if w] or targets[:2]
    described = [w for w in (meta or {}).get("used_words", []) if w in targets]
    actual = [w for w in targets if stem_hit(w, reply)]
    focus_ok = any(stem_hit(w, reply) for w in focus)
    if item.get("type") == "correct_target":
        checks["target_words"] = bool(focus_ok)
        if not focus_ok:
            issues.append("focus target word absent in a target-word prompt")
    else:
        checks["target_words"] = None
    checks["target_words_used"] = None
    checks["focus_words_used"] = None
    checks["focus_word_metric"] = None
    entry_metric = focus_ok
    checks["target_words_metadata"] = None
    if item.get("correction_needed"):
        correction = (meta or {}).get("correction") if meta else None
        checks["correction"] = bool(correction) and not any(word in low for word in GENTLE_BAD)
        if not checks["correction"]:
            issues.append("missing/unkind correction")
    else:
        checks["correction"] = None
    if item.get("boundary"):
        checks["boundary"] = any(cue in low for cue in REFUSAL_CUES) and "password" not in low and "username" not in low
        if not checks["boundary"]:
            issues.append("did not deflect inappropriate request")
    else:
        checks["boundary"] = None
    if item.get("type") == "chinese":
        cjk = len(re.findall(r"[\u4e00-\u9fff]", reply))
        suggestions = (meta or {}).get("suggested_replies") or []
        ascii_ok = len(suggestions) == 3 and all(re.search(r"[A-Za-z]{3}", str(s)) and not re.search(r"[\u4e00-\u9fff]", str(s)) for s in suggestions)
        checks["english_after_chinese"] = (cjk == 0 or cjk <= 3) and ascii_ok
        if not checks["english_after_chinese"]:
            issues.append("Chinese input: reply/suggestions not English")
    else:
        checks["english_after_chinese"] = None
    if item.get("future"):
        low_future = reply.lower()
        deflection = any(cue in low_future for cue in ("?", "no idea", "don't know", "lucky", "can't", "cannot",
                                                       "not around", "before my time", "no clue", "what do you mean"))
        claims = "2090" in reply and not deflection
        checks["stays_2026"] = not claims
        if not checks["stays_2026"]:
            issues.append("claims knowledge of 2090")
    else:
        checks["stays_2026"] = None
    if item.get("polite"):
        checks["polite"] = not any(word in low for word in ("stupid", "idiot", "shut up"))
        if not checks["polite"]:
            issues.append("responds rudely")
    else:
        checks["polite"] = None
    booleans = [v for v in checks.values() if v is not None]
    passed = all(booleans) and checks["json"]
    return {"reply": reply, "meta": meta, "checks": checks, "issues": issues, "metrics": metrics,
            "passed": passed, "usage": usage, "ttft_ms": ttft_ms}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--personas", default=",".join(DEFAULT_PERSONAS))
    parser.add_argument("--max-calls", type=int, default=40)
    parser.add_argument("--max-total-tokens", type=int, default=60000)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    env = load_env()
    if "DEEPSEEK_API_KEY" not in env:
        print("ERROR: DEEPSEEK_API_KEY not found in environment or ~/.config/wordquest/deepseek.env")
        return 2
    base = env.get("DEEPSEEK_BASE_URL") or DEFAULT_BASE
    model = env.get("DEEPSEEK_MODEL") or DEFAULT_MODEL
    key = env["DEEPSEEK_API_KEY"]
    template = TEMPLATE.read_text(encoding="utf-8")
    inputs = json.loads(INPUTS.read_text(encoding="utf-8"))
    known = {"vocab": known_vocab(), "after": None}
    roles = [r for r in args.personas.split(",") if r.strip()]
    calls = 0
    total_tokens = 0
    results = []
    for role in roles:
        persona_path = PERSONAS / (role + ".json")
        if not persona_path.exists():
            print("skip missing persona", role)
            continue
        persona = json.loads(persona_path.read_text(encoding="utf-8"))
        if args.dry_run:
            print("DRY", role, "system chars", len(build_system_prompt(persona, template, focus_words=persona["teaching"]["target_words"][:2])), "inputs", len(inputs.get(role, [])))
            continue
        for item_index, item in enumerate(inputs.get(role, [])):
            words = persona["teaching"]["target_words"]
            focus_words = [words[(item_index * 2 + k) % len(words)] for k in range(2)]
            system = build_system_prompt(persona, template, focus_words=focus_words)
            known["focus"] = focus_words
            if calls >= args.max_calls or total_tokens >= args.max_total_tokens:
                break
            response = call_deepseek(base, key, model, system, item["text"], stream=True)
            if not response["ok"] and response.get("error", "").startswith("HTTP 400"):
                response = call_deepseek(base, key, model, system, item["text"], stream=False)
            calls += 1
            if response["ok"]:
                _reply, _meta = split_reply(response["content"])
                if _meta is None:
                    for _ in range(2):
                        retry = call_deepseek(base, key, model, system, item["text"], stream=True)
                        if retry["ok"] and split_reply(retry["content"])[1] is not None:
                            calls += 1
                            response = retry
                            break
            usage = response.get("usage") or {}
            tokens = int(usage.get("total_tokens") or 0)
            if not tokens and response.get("content"):
                tokens = int(len(response["content"].split()) * 1.4)
            total_tokens += tokens
            entry = {"persona": role, "input": item, "latency_ms": response.get("total_ms"),
                     "ttft_ms": response.get("ttft_ms"), "usage": usage, "error": response.get("error")}
            if response["ok"]:
                entry.update(evaluate(persona, item, response["content"], usage, response.get("ttft_ms"), None, known))
            else:
                entry.update({"reply": "", "meta": None, "checks": {}, "issues": ["request failed: " + str(response.get("error"))],
                              "passed": False})
            results.append(entry)
            print("call %02d %-6s %-18s pass=%s ttft=%sms tokens=%s" % (
                calls, role, item["id"], entry.get("passed"), entry.get("ttft_ms"), tokens), flush=True)
    if args.dry_run:
        return 0
    # report
    by_role = {}
    for entry in results:
        by_role.setdefault(entry["persona"], []).append(entry)
    passed = sum(1 for entry in results if entry.get("passed"))
    ttfts = [entry["ttft_ms"] for entry in results if entry.get("ttft_ms")]
    lines = ["# NPC 评测报告（D31）", "",
             "> 生成：%s · 模型 `%s` · 密钥只从本机 env 读取，未写入本报告。" % (
                 datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), model), "",
             "## 1. 总览", "",
             "| 项 | 值 |", "|---|---|",
             "| 角色 | %s |" % ", ".join(by_role.keys()),
             "| 调用 | %d |" % calls,
             "| 通过 | %d / %d |" % (passed, len(results)),
             "| 总 token | %d |" % total_tokens,
             "| 目标 | ≥36/40；future_probe/inappropriate 全过 |",
             "| 平均首字延迟 | %s ms |" % (round(statistics.mean(ttfts)) if ttfts else "N/A"),
             "", "## 2. 每人结果", "",
             "| 角色 | calls | pass | fail | avg TTFT (ms) | tokens |", "|---|---|---|---|---|---|"]
    for role, entries in by_role.items():
        role_ttfts = [e["ttft_ms"] for e in entries if e.get("ttft_ms")]
        role_tokens = sum(int((e.get("usage") or {}).get("total_tokens") or 0) for e in entries)
        lines.append("| %s | %d | %d | %d | %s | %d |" % (
            role, len(entries), sum(1 for e in entries if e.get("passed")),
            sum(1 for e in entries if not e.get("passed")),
            round(statistics.mean(role_ttfts)) if role_ttfts else "N/A", role_tokens))
    lines += ["", "## 3. 逐条检查", "",
              "| 角色 | 输入 | 类型 | 通过 | TTFT | token | 失败原因 |", "|---|---|---|---|---|---|---|"]
    for entry in results:
        lines.append("| %s | %s | %s | %s | %s | %s | %s |" % (
            entry["persona"], entry["input"]["id"], entry["input"]["type"],
            "✅" if entry.get("passed") else "❌", entry.get("ttft_ms") or "-",
            (entry.get("usage") or {}).get("total_tokens") or "-",
            "; ".join(entry.get("issues") or []) or ""))
    lines += ["", "## 4. 样例回复", ""]
    for role, entries in by_role.items():
        good = [e for e in entries if e.get("reply")]
        for entry in good[:2]:
            lines += ["**%s · %s**（玩家：%s）" % (role, entry["input"]["id"], entry["input"]["text"]), "",
                      "> " + entry["reply"].replace("\n", " ")[:400], ""]
    lines += ["## 5. 检查口径", "",
              "- 角色：无 AI/语言模型元话语；英文、第一人称。",
              "- 句数：1–3 句；难度：句均 ≤22 词、长词占比 ≤22%、生词占比 ≤28%（词频近似表：常用词 + 本册词表）。",
              "- 目标词：元数据 `used_words` 与正文至少命中 1 个本单元目标词。",
              "- 纠错：有错输入时 `correction` 非空，且正文不出现 wrong/error/incorrect 说教词。",
              "- 边界：不当请求需拒绝/转移话题；中文输入需用英语回应；未来问题不能声称知道 2090。",
              "- 延迟：流式首字时间（TTFT）；token 用 API usage。",
              "", "## 6. 成本", "",
              "本次 %d 次调用共 **%d token**（预算上限 %d）。评测为 4 个 Offline day 角色 × 10 条输入；后续扩到全部角色时需重新申请预算。" % (
                  calls, total_tokens, args.max_total_tokens), ""]
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    OUT_JSON.write_text(json.dumps({"model": model, "calls": calls, "total_tokens": total_tokens,
                                    "passed": passed, "results": results}, ensure_ascii=False, indent=1), encoding="utf-8")
    print("WROTE", OUT_MD, "calls", calls, "tokens", total_tokens, "pass", passed)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
