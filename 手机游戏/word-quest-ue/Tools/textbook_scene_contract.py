"""Pure schema/coordinate contract for textbook scene generation (no Unreal import)."""
import json
import math
import re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def read_unit(unit, source=None):
    path = Path(source) if source else ROOT / f'Content/Data/memory/textbook_scenes/unit{unit:02d}.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    validate(data)
    return data

def triple(value, name):
    if not isinstance(value, list) or len(value)!=3 or not all(type(x) in (float,int) and math.isfinite(x) for x in value):
        raise ValueError('Expected finite XYZ: '+name)
    return value

def validate(data):
    if data.get('schema')!='wordquest.textbook_scenes/1': raise ValueError('Unsupported scene schema')
    unit=data['unit']
    if type(unit)!=int or not 1<=unit<=6: raise ValueError('Invalid unit')
    ids=set(); sections=set()
    if not data.get('articles'): raise ValueError('No articles')
    for article in data['articles']:
        section=article['section']
        if section not in ('section_a','section_b','section_c') or section in sections: raise ValueError('Duplicate/invalid section')
        sections.add(section)
        expected=f'L_U{unit:02d}_{section[-1].upper()}'
        if article['level']!=expected: raise ValueError('Invalid level path')
        if not article.get('scenes'): raise ValueError('No scenes')
        for scene in article['scenes']:
            sid=scene['id']
            if not re.fullmatch(r'[A-Za-z0-9_]+',sid) or sid in ids: raise ValueError('Invalid/duplicate scene id')
            ids.add(sid); triple(scene['origin'],'origin')
            if not isinstance(scene.get('paragraphs'),list) or any(type(n)!=int or n<1 for n in scene['paragraphs']): raise ValueError('Invalid paragraph indexes')
            if not scene['paragraphs'] and not scene.get('exercises'):raise ValueError('Empty set must contain an exercise')
            for prop in scene.get('props',[]):
                if not re.fullmatch(r'[A-Za-z0-9_]+',prop['kit']): raise ValueError('Unsafe kit name')
                triple(prop['pos'],'prop.pos'); triple(prop.get('size',[1,1,1]),'prop.size')
                if any(v<=0 for v in prop.get('size',[1,1,1])): raise ValueError('Nonpositive prop size')
                if prop.get('layer','always') not in ('then','now','always'): raise ValueError('Invalid layer')
            names=set()
            if not scene.get('shots'): raise ValueError('Scene needs a camera')
            for shot in scene['shots']:
                if not re.fullmatch(r'[A-Za-z0-9_]+',shot['name']) or shot['name'] in names: raise ValueError('Duplicate/unsafe shot')
                names.add(shot['name']); triple(shot['pos'],'shot.pos'); triple(shot['look'],'shot.look')
                if shot['pos']==shot['look'] or not 5<=shot.get('fov',40)<=150: raise ValueError('Invalid camera')
            light=scene.get('light',{})
            if light.get('type','interior') not in ('sun','interior'): raise ValueError('Invalid light')
    return data

def world_cm(scene, local):
    return [(float(a)+float(b))*100 for a,b in zip(scene['origin'],local)]

def level_path(data,article): return f"/Game/Memory/Scenes/U{data['unit']:02d}/{article['level']}"

def prop_tags(scene,prop,index):
    tags=['textbook_generated','set:'+scene['id'],'layer:'+prop.get('layer','always'),f'prop:{index}','kit:'+prop['kit']]
    if prop.get('word'): tags.append('word:'+prop['word'])
    return tags

def read_asset_map(source=None):
    path=Path(source) if source else ROOT/'Content/Data/memory/kit_assets.json'
    if not path.exists(): return {}
    data=json.loads(path.read_text(encoding='utf-8'))
    return data.get('kits',data.get('assets',data))

def asset_spec(mapping,kit):
    value=mapping.get(kit)
    if isinstance(value,str): return {'asset':value}
    return value if isinstance(value,dict) else {}

def clutter_instances(scene):
    """Deterministic scatter; source data remains immutable. Region bounds are in local metres."""
    import random
    result=[]
    for index,group in enumerate(scene.get('clutter',[])):
        rng=random.Random(group.get('seed',scene['id']+':'+str(index)))
        region=group.get('region',{}); low=region.get('min',group.get('min',[-1,-1,0])); high=region.get('max',group.get('max',[1,1,0]));triple(low,'clutter.min');triple(high,'clutter.max')
        count=group.get('count',1)
        if type(count)!=int or not 0<=count<=2000: raise ValueError('Invalid clutter count')
        for _ in range(count):
            result.append({'kit':group['kit'],'pos':[rng.uniform(a,b) for a,b in zip(low,high)],'yaw':rng.uniform(0,360),'scale':group.get('scale',1.),'size':group.get('size',[.1,.1,.1]),'layer':group.get('layer','always'),'clutter':True})
    return result

def mapped_surface_clutter(scene, clutter_assets):
    """Place deterministic CC0 tabletop objects on authored tables/counters.

    This fills scenes whose authored JSON has no `clutter` entries without
    mutating Claude's source data. Returned positions are local metres; z is
    the tabletop height, and the editor builder compensates for mesh pivots.
    """
    import hashlib
    if not isinstance(clutter_assets, dict):
        return []
    preferred = (
        'office_notepads', 'stationery_supplies', 'book_encyclopedia_set_01',
        'tea_set_01', 'ceramic_vase_01', 'alarm_clock_01', 'jug_01', 'chess_set',
    )
    available = [asset_id for asset_id in preferred if clutter_assets.get(asset_id)]
    if not available:
        return []
    surfaces = {
        'board_table', 'cafe_table', 'coffee_table', 'dining_table',
        'reading_table', 'student_desk', 'office_desk', 'home_desk',
        'kitchen_counter', 'travel_counter', 'checkout_counter', 'bank_counter',
    }
    result = []
    for prop_index, prop in enumerate(props_for(scene)):
        if prop.get('clutter') or prop.get('kit') not in surfaces:
            continue
        size = prop.get('size', [1, 1, 1])
        slots = 2 if size[0] * size[1] >= 0.8 else 1
        slots = min(slots, 2)
        for slot in range(slots):
            token = f"{scene['id']}:{prop_index}:{slot}".encode('utf-8')
            choice = int.from_bytes(hashlib.sha256(token).digest()[:4], 'big') % len(available)
            asset_id = available[choice]
            spread = min(0.18, max(0.035, size[0] * 0.18))
            cross = min(0.12, max(0.025, size[1] * 0.16))
            offset_x = (-spread if slot == 0 else spread)
            offset_y = (cross if (prop_index + slot) % 2 else -cross)
            result.append({
                'asset_id': asset_id,
                'asset': clutter_assets[asset_id],
                'pos': [prop['pos'][0] + offset_x, prop['pos'][1] + offset_y,
                        prop['pos'][2] + size[2] + 0.015],
                'target_max_m': {
                    'office_notepads': 0.18, 'stationery_supplies': 0.15,
                    'book_encyclopedia_set_01': 0.22, 'tea_set_01': 0.18,
                    'ceramic_vase_01': 0.12, 'alarm_clock_01': 0.10,
                    'jug_01': 0.12, 'chess_set': 0.16,
                }[asset_id],
                'yaw': (choice * 47 + prop_index * 31 + slot * 19) % 360,
            })
            if len(result) >= 8:
                return result
    return result

def props_for(scene): return list(scene.get('props',[]))+clutter_instances(scene)

def kit_surface_role(kit):
    """Choose a CC0 material role for unfinished geometry without claiming it is final."""
    return {
        'street':'asphalt',
        'wall':'plaster',
        'window_wall':'plaster',
        'hutong_wall':'brick',
        'rug':'carpet',
        'mall_atrium':'marble',
    }.get(kit)

def scene_surface_role(scene):
    """Choose a conservative scanned ground material from authored set contents."""
    kits={prop.get('kit') for prop in props_for(scene)}
    if 'street' in kits:
        return 'asphalt'
    if 'mall_atrium' in kits:
        return 'marble'
    outdoor={'city_skyline','network_node','storefront','shared_bike','playground','lawn','hutong_wall'}
    if kits & outdoor:
        return 'pavement'
    home={'armchair','sofa','rug','kitchen_counter','dining_table','coffee_table','home_desk'}
    if kits & home:
        return 'wood_floor'
    return 'concrete'
