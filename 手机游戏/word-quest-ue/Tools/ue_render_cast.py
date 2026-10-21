"""Render delivered MHC characters sequentially, with actual Groom skin bindings."""
import argparse
import json
import subprocess
import sys
from pathlib import Path
from ue_character_common import ROOT,character_id

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ids',nargs='+',default=['me2026','lin','mei','an','rui','organizer','old2090'])
    args=parser.parse_args();results=[]
    out=ROOT/'Saved/CharacterEngine/cast-render-summary.json';out.parent.mkdir(parents=True,exist_ok=True)
    for value in args.ids:
        cid=character_id(value)
        if not (ROOT/'Content/Characters'/cid/('MHC_'+cid+'.uasset')).exists():
            results.append({'character':cid,'status':'missing MHC'});continue
        result=subprocess.run([sys.executable,str(ROOT/'Tools/ue_render_compare.py'),cid,'--require-mhc','--grooms'])
        record={'character':cid,'exit_code':result.returncode,'status':'pass' if result.returncode==0 else 'failed'}
        if result.returncode==0:
            capture=json.loads((ROOT/'Saved/Compare'/cid/'capture.json').read_text())
            record.update({k:capture[k] for k in ['run_id','character_profile','groom_assets','groom_binding','mhc_asset_sha256']})
        results.append(record);out.write_text(json.dumps(results,indent=2));print(json.dumps(record),flush=True)
    if any(r['status']!='pass' for r in results):raise SystemExit(1)
    print('WQ_CAST_RENDER_PASS '+str(out))

if __name__=='__main__':main()
