"""Wait for the active opening build, then validate real PIE before changing entry."""
import os,sys,time,subprocess,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
log=ROOT/'Saved/Opening2090/build.log';started=time.monotonic()
while time.monotonic()-started<1200:
 text=log.read_text(errors='replace') if log.exists() else ''
 if 'WQ_OPENING_2090_BUILT' in text or 'WQ_OPENING_BUILT' in text:break
 if 'Traceback (most recent call last)' in text:raise SystemExit('Opening build failed; default map retained')
 time.sleep(5)
else:raise SystemExit('Opening build timeout; default map retained')
r=subprocess.run([sys.executable,str(ROOT/'Tools/test_opening_flow.py')],cwd=ROOT)
if r.returncode:raise SystemExit(r.returncode)
report=json.loads((ROOT/'Saved/Opening2090/playthrough.json').read_text())
if report.get('technical')!='PASS' or report.get('visual')!='PASS':
 raise SystemExit('Technical flow verified; visual acceptance pending, default map retained')
p=ROOT/'Config/DefaultEngine.ini';text=p.read_text();text=text.replace('EditorStartupMap=/Game/Maps/L_Main.L_Main','EditorStartupMap=/Game/Maps/L_Opening2090.L_Opening2090').replace('GameDefaultMap=/Game/Maps/L_Main.L_Main','GameDefaultMap=/Game/Maps/L_Opening2090.L_Opening2090');p.write_text(text)
print('WQ_OPENING_ENTRY_VERIFIED',flush=True)
