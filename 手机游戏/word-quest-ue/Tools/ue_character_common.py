"""Shared deterministic contracts; safe to import without Unreal."""
import hashlib
import json
import math
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT.parent / 'word-quest-game'
VIEWS = ('front', 'q34', 'side', 'back', 'closeup')

def character_id(value):
    if not re.fullmatch(r'[A-Za-z0-9_-]{1,64}', value):
        raise ValueError('Invalid character id')
    return value

def export_dir(cid):
    return GAME / 'docs/hero-pipeline/export' / character_id(cid)

def fit_pose(cid, explicit=None):
    who = 'male' if cid == 'me2026' else 'female'
    paths = [Path(explicit)] if explicit else [export_dir(cid) / f'{who}_fit.json',
        GAME / 'art/characters/lian/fit' / f'{who}_fit.json',
        Path.home() / '.local/share/hunyuan3d/work/fit' / f'{who}_fit.json']
    for path in paths:
        if path.is_file():
            data=json.loads(path.read_text());pose=data.get('pose_q34',[data.get('yaw_q34',37),6,-8])
            if len(pose)!=3 or not all(isinstance(v,(int,float)) and math.isfinite(v) for v in pose):
                raise ValueError('Invalid q34 fit pose')
            return list(pose),str(path),hashlib.sha256(path.read_bytes()).hexdigest()
    if explicit: raise FileNotFoundError(explicit)
    return [37,6,-8],'task brief (fit JSON unavailable)',None
