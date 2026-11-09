#!/usr/bin/env python3
"""Evaluate saved C15 samples without treating capture as acceptance."""
import json
import statistics
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def evaluate(data):
    walk = data.get('walk', [])
    crossings = []
    for a, b in zip(walk, walk[1:]):
        if a['bob_z'] < 0 <= b['bob_z'] and b['t'] > a['t']:
            d = b['bob_z'] - a['bob_z']
            crossings.append(a['t'] + (b['t'] - a['t']) * (-a['bob_z'] / d))
    hz = (len(crossings)-1)/(crossings[-1]-crossings[0]) if len(crossings) >= 4 and crossings[-1] > crossings[0] else None
    samples = [v for v in data.get('exposure', []) if v.get('exposure', 0) > 0]
    baseline = data.get('samples', {}).get('dark_exposure', {}).get('exposure_scale', 0)
    stable = statistics.median([v['exposure'] for v in samples if v['t'] >= samples[-1]['t'] - 1]) if samples else 0
    t63 = None
    # Tiny changes or unavailable readings do not establish a real exposure step.
    if baseline > 0 and stable > 0 and abs(stable-baseline)/baseline >= .05:
        target = baseline + .63*(stable-baseline)
        prev = {'t': 0, 'exposure': baseline}
        for item in samples:
            v0, v1 = prev['exposure'], item['exposure']
            if (v0-target)*(v1-target) <= 0 and v1 != v0:
                t63 = prev['t'] + (item['t']-prev['t'])*(target-v0)/(v1-v0)
                break
            prev = item
    return {'step_hz': hz, 'step_pass': hz is not None and 1.6 <= hz <= 2,
            'exposure_t63_s': t63, 'exposure_pass': t63 is not None and 1 <= t63 <= 2,
            'dark_exposure': baseline, 'final_exposure': stable,
            'body': 'needs_visual_and_animation_review' if 'body_ready=1' in data.get('samples', {}).get('body_state', '') else 'not_delivered',
            'capture_status': data.get('result', 'not_captured')}

def main():
    source = Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'Saved/Round6/c15-experience.json'
    dest = ROOT/'Saved/Round6/c15-round6-metrics.json'
    result = evaluate(json.loads(source.read_text(encoding='utf-8')))
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
    print('C15_METRICS', json.dumps(result, ensure_ascii=False))
    return 0 if result['step_pass'] and result['exposure_pass'] else 1

if __name__ == '__main__':
    raise SystemExit(main())
