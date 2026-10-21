"""Build the editor under the same lock used by import/render jobs."""
import argparse
from pathlib import Path
from ue_character_common import ROOT,run_locked_command

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--engine',default='/Users/Shared/Epic Games/UE_5.8')
    args=parser.parse_args()
    log=ROOT/'Saved/CharacterEngine/build.log'
    command=[str(Path(args.engine)/'Engine/Build/BatchFiles/Mac/Build.sh'),'WordQuestUEEditor','Mac','Development',str(ROOT/'WordQuestUE.uproject'),'-WaitMutex','-NoHotReloadFromIDE','-MaxParallelActions=2']
    result=run_locked_command(command,{},log)
    if result.returncode:raise RuntimeError('Editor build failed: '+str(log))
    print('WQ_EDITOR_BUILD_PASS '+str(log))

if __name__=='__main__':main()
