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

def character_profile(cid, cast_root=None):
    character_id(cid)
    heroes={'me2026':('male',184.0),'lin':('female',168.0)}
    if cid in heroes:
        who,height=heroes[cid]
        return {'who':who,'height_cm':height,'cast_json':None,'cast_sha256':None}
    root=Path(cast_root) if cast_root else Path.home()/'.local/share/hunyuan3d/work/fit'
    path=root/(cid+'_cast.json');data=json.loads(path.read_text());height=data['height_m']
    if type(height) not in (int,float) or not math.isfinite(height) or not .8<=height<=2.5:
        raise ValueError('Invalid cast height_m')
    return {'who':cid,'height_cm':height*100,'cast_json':str(path),'cast_sha256':hashlib.sha256(path.read_bytes()).hexdigest()}

def fit_pose(cid, explicit=None):
    who = {'me2026':'male','lin':'female'}.get(cid,character_id(cid))
    paths = [Path(explicit)] if explicit else [export_dir(cid) / f'{who}_fit.json',
        GAME / 'art/characters/lian/fit' / f'{who}_fit.json',
        Path.home() / '.local/share/hunyuan3d/work/fit' / f'{who}_fit.json']
    for path in paths:
        if path.is_file():
            data=json.loads(path.read_text());pose=data.get('pose_q34',[data.get('yaw_q34',37),0,0])
            if len(pose)!=3 or not all(isinstance(v,(int,float)) and math.isfinite(v) for v in pose):
                raise ValueError('Invalid q34 fit pose')
            return list(pose),str(path),hashlib.sha256(path.read_bytes()).hexdigest()
    if explicit: raise FileNotFoundError(explicit)
    return [37,0,0],'default (fit JSON unavailable)',None

def inherited_lock(lock_pid, parents, current_pid):
    seen=set()
    while current_pid and current_pid not in seen:
        if current_pid==lock_pid:return True
        seen.add(current_pid);current_pid=parents.get(current_pid,0)
    return False

def run_locked_command(command, env, log_path):
    """One lock for UBT, imports, MetaHuman and rendering; safely inherit ancestor lock."""
    import os,subprocess
    rows=subprocess.check_output(['ps','-ax','-o','pid=,ppid='],text=True)
    parents={int(a):int(b) for a,b in (row.split() for row in rows.splitlines())}
    try:pid=int((ROOT/'Saved/ue_run.lock/pid').read_text())
    except (FileNotFoundError,ValueError):pid=0
    if not pid or not inherited_lock(pid,parents,os.getpid()):
        command=['bash',str(ROOT/'Tools/run_ue_serial.sh')]+command
    else:print('Reusing ancestor run_ue_serial.sh lock '+str(pid),flush=True)
    log_path=Path(log_path);log_path.parent.mkdir(parents=True,exist_ok=True)
    with log_path.open('w') as output:
        return subprocess.run(command,env={**os.environ,**env,'UE_LOCK_WHO':'codex'},stdout=output,stderr=subprocess.STDOUT)

def run_locked_editor(script, env, log_path, engine='/Users/Shared/Epic Games/UE_5.8', level=None):
    binary=Path(engine)/'Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor'
    command=[str(binary),str(ROOT/'WordQuestUE.uproject')]
    if level:command.append(level)
    command += [f'-ExecutePythonScript={Path(script).resolve()}','-RenderOffscreen','-culture=en','-language=en','-unattended','-nosplash','-nosound','-NoEpicPortal','-stdout','-FullStdOutLogOutput']
    return run_locked_command(command,env,log_path)
