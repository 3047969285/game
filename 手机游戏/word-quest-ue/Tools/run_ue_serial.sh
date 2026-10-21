#!/bin/bash
# Run ONE Unreal process at a time for this project (Claude / Codex / DeepSeek share it).
# Usage: Tools/run_ue_serial.sh <UnrealEditor or UnrealEditor-Cmd> <args...>
# Concurrent editors on the same project corrupt DDC/asset saves and crash (seen 2026-10-21).
LOCK="$(cd "$(dirname "$0")/.." && pwd)/Saved/ue_run.lock"
mkdir -p "$(dirname "$LOCK")"
waited=0
until mkdir "$LOCK" 2>/dev/null; do
  pid=$(cat "$LOCK/pid" 2>/dev/null)
  if [ -n "$pid" ] && ! kill -0 "$pid" 2>/dev/null; then rm -rf "$LOCK"; continue; fi   # stale lock
  [ $((waited % 60)) -eq 0 ] && echo "[run_ue_serial] waiting for UE lock held by pid $pid ($(cat "$LOCK/who" 2>/dev/null))" >&2
  sleep 5; waited=$((waited + 5))
done
echo $$ > "$LOCK/pid"; echo "${UE_LOCK_WHO:-unknown} $(date '+%H:%M:%S') $*" > "$LOCK/who"
trap 'rm -rf "$LOCK"' EXIT
"$@"
