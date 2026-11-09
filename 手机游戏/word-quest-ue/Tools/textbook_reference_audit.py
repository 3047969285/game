"""Resolve authored references against full article/exercise books before UE launch."""
import json,re
from pathlib import Path
from textbook_scene_contract import ROOT,read_unit

def reference_audit(data,root=ROOT,section=None):
    unit=data['unit'];root=Path(root)
    book=json.loads((root/f'Content/Data/textbook/rw3/articles/unit{unit:02d}.json').read_text())
    tasks=json.loads((root/f'Content/Data/textbook/rw3/exercises/unit{unit:02d}.json').read_text())
    texts={row['section']:row['paragraphs'] for row in book['texts']}
    exercises={row['id']:row for row in tasks['exercises']}
    errors=[];coverage=[];scene_keys=set();prop_keys=set()
    for article in data['articles']:
        sec=article['section']
        if section and sec!=section:continue
        seen=set();refs=set()
        for scene in article['scenes']:
            scene_keys.update(scene)
            for prop in scene.get('props',[]):prop_keys.update(prop)
            for number in scene['paragraphs']:
                if sec not in texts or not 1<=number<=len(texts[sec]):errors.append(f"{scene['id']}: paragraph {sec}#{number} does not exist")
                else:seen.add(number)
            for ref in scene.get('exercises',[]):
                match=re.fullmatch(r'([A-Za-z0-9_]+)(?:#([1-9][0-9]*)(?:-([1-9][0-9]*))?)?',ref)
                if not match:errors.append(f"{scene['id']}: invalid exercise reference {ref}");continue
                eid,first,last=match.groups();exercise=exercises.get(eid)
                if not exercise:errors.append(f"{scene['id']}: exercise {eid} does not exist");continue
                refs.add(eid)
                if first:
                    first,last=int(first),int(last or first)
                    if last<first:errors.append(f"{scene['id']}: reversed item range {ref}");continue
                    available={item['n'] for item in exercise.get('items',[])}
                    for number in range(first,last+1):
                        if number not in available:errors.append(f"{scene['id']}: exercise item {eid}#{number} does not exist")
        coverage.append({'section':sec,'paragraphs':len(texts.get(sec,[])),'covered_paragraphs':sorted(seen),'unplaced_paragraphs':sorted(set(range(1,len(texts.get(sec,[]))+1))-seen),'referenced_exercises':sorted(refs)})
    unknown_scene=sorted(scene_keys-{'id','title','paragraphs','light','props','people','shots','exercises','origin','transition','decals','clutter'})
    unknown_prop=sorted(prop_keys-{'kit','pos','size','yaw','scale','layer','word'})
    return {'unit':unit,'status':'FAIL' if errors else 'PASS','errors':errors,'coverage':coverage,'new_scene_fields':unknown_scene,'new_prop_fields':unknown_prop}

def require_references(data,section=None):
    result=reference_audit(data,section=section)
    if result['errors']:raise ValueError('Textbook reference preflight failed:\n'+'\n'.join(result['errors']))
    return result

if __name__=='__main__':
    import argparse
    parser=argparse.ArgumentParser();parser.add_argument('--unit',type=int);parser.add_argument('--report',default='Docs/qa/textbook-references-round4.json');args=parser.parse_args()
    reports=[reference_audit(read_unit(n)) for n in ([args.unit] if args.unit else range(1,7))]
    path=ROOT/args.report;path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(reports,ensure_ascii=False,indent=2))
    for row in reports:print('unit',row['unit'],row['status'],'errors',len(row['errors']))
    if any(row['errors'] for row in reports):raise SystemExit(1)
