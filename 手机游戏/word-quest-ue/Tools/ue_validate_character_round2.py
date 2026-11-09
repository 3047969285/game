"""Sequential C3 captures, unchanged QA tools, then the C4 archetype validation.

Run under Tools/run_ue_serial.sh to keep a consistent UE asset snapshot. Children
reuse that ancestor lock. QA process success is never reported as visual acceptance.
"""
import json
from pathlib import Path
import subprocess
import sys
from ue_character_common import ROOT

IDS=['me2026','lin','mei','an','rui','organizer','old2090']

def main():
    folder=ROOT/'Saved/CharacterEngine/Round2';folder.mkdir(parents=True,exist_ok=True)
    result={}
    def run(name,command):
        log=folder/(name+'.log')
        with log.open('w') as output:
            proc=subprocess.run(command,cwd=ROOT,stdout=output,stderr=subprocess.STDOUT)
        result[name]={'exit_code':proc.returncode,'log':str(log)}
        (folder/'results.json').write_text(json.dumps(result,indent=2))
        print(name+' exit='+str(proc.returncode),flush=True)
        return proc.returncode
    if run('build',[sys.executable,str(ROOT/'Tools/ue_build_character_engine.py')]):
        raise RuntimeError('Build failed; no UE launch after a failed compilation')
    run('C3-cast',[sys.executable,str(ROOT/'Tools/ue_render_cast.py'),'--import-before'])
    summary=ROOT/'Saved/CharacterEngine/cast-render-summary.json'
    captures={r['character']:r for r in json.loads(summary.read_text())} if summary.exists() else {}
    python=Path.home()/'.local/share/hunyuan3d/.venv/bin/python'
    qa_python=str(python) if python.exists() else sys.executable
    for cid in IDS:
        capture=captures.get(cid,{})
        if capture.get('status')!='pass':
            result['report-'+cid]={'skipped':'No fresh successful Groom capture; old images are not evidence'}
            (folder/'results.json').write_text(json.dumps(result,indent=2));continue
        immutable=ROOT/'Saved/CompareRuns'/cid/capture['run_id']
        run('report-'+cid,[qa_python,str(ROOT/'Tools/qa/report.py'),cid,'--render-dir',str(immutable)])
        if cid not in ['me2026','lin']:
            run('conform-'+cid,[qa_python,str(ROOT/'Tools/qa/conform_report.py'),cid])
    run('dashboard',[qa_python,str(ROOT/'Tools/qa/dashboard.py')])
    run('C4-retarget',[sys.executable,str(ROOT/'Tools/ue_retarget_character.py')])
    print('WQ_ROUND2_VALIDATION_FINISHED '+str(folder/'results.json'),flush=True)

if __name__=='__main__':main()
