#!/bin/bash
# Run ONE Unreal process at a time for this project (Claude / Codex / DeepSeek share it).
# Usage: Tools/run_ue_serial.sh <UnrealEditor or UnrealEditor-Cmd> <args...>
# Concurrent editors on the same project corrupt DDC/asset saves and crash (seen 2026-10-21).
LOCK="$(cd "$(dirname "$0")/.." && pwd)/Saved/ue_run.lock"
mkdir -p "$(dirname "$LOCK")"
# Give queued compilation priority over a fresh editor launch. UBT removes the
# previous module before linking; repeated editor probes otherwise show a missing
# module dialog and starve the build which would repair it.
BUILD_PENDING=""
case "$(basename "$1")" in
  Build.sh|RunUBT.sh|UnrealBuildTool*) BUILD_PENDING="${LOCK}.build.$$"; echo $$ > "$BUILD_PENDING" ;;
esac
OWN_LOCK=0
cleanup() { [ -n "$BUILD_PENDING" ] && rm -f "$BUILD_PENDING"; [ "$OWN_LOCK" -eq 1 ] && rm -rf "$LOCK"; }
trap cleanup EXIT
has_pending_build() {
  local marker pending_pid
  for marker in "${LOCK}".build.*; do
    [ -f "$marker" ] || continue
    pending_pid=$(cat "$marker" 2>/dev/null)
    if [ -n "$pending_pid" ] && kill -0 "$pending_pid" 2>/dev/null; then return 0; fi
    rm -f "$marker"
  done
  return 1
}
waited=0
while :; do
  if [ -z "$BUILD_PENDING" ] && has_pending_build; then
    [ $((waited % 60)) -eq 0 ] && echo "[run_ue_serial] waiting for queued module build" >&2
    sleep 5; waited=$((waited + 5)); continue
  fi
  if mkdir "$LOCK" 2>/dev/null; then OWN_LOCK=1; break; fi
  pid=$(cat "$LOCK/pid" 2>/dev/null)
  if [ -n "$pid" ] && ! kill -0 "$pid" 2>/dev/null; then rm -rf "$LOCK"; continue; fi
  [ $((waited % 60)) -eq 0 ] && echo "[run_ue_serial] waiting for UE lock held by pid $pid ($(cat "$LOCK/who" 2>/dev/null))" >&2
  sleep 5; waited=$((waited + 5))
done
echo $$ > "$LOCK/pid"; echo "${UE_LOCK_WHO:-unknown} $(date '+%H:%M:%S') $*" > "$LOCK/who"
trap cleanup EXIT
echo "WQ_LOCK_ACQUIRED $$"
"$@"
