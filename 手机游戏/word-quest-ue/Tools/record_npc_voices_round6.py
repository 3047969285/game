#!/usr/bin/env python3
"""Record isolated AVFoundation auditions; no UE, API credentials or speech text logging."""
import os
from pathlib import Path
import subprocess
import signal
import sys

root = Path(__file__).resolve().parents[1]
proc = subprocess.Popen(['/usr/bin/swift', str(root/'Tools/record_npc_voices_round6.swift'), str(root)],
                        cwd=root, start_new_session=True)
try:
    result = proc.wait(timeout=120)
except subprocess.TimeoutExpired:
    os.killpg(proc.pid, signal.SIGTERM)
    try:
        proc.wait(timeout=5)
    except subprocess.TimeoutExpired:
        os.killpg(proc.pid, signal.SIGKILL)
        proc.wait()
    print('VOICE_AUDITION_TIMEOUT', file=sys.stderr)
    raise SystemExit(124)
raise SystemExit(result)
