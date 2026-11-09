"""Deterministic Unit 1 home dressing. No Unreal import or placeholder fallback."""
import math


def _mesh(group, name):
    return f'/Game/PolyHaven/Models/{group}/{group}_2k/StaticMeshes/{name}'


def derive_room_dressing(scene, mapping_doc):
    """Return local-metre plan; missing mappings stay explicit and are never cubes.

    support names refer to earlier items. Child Z is clearance above actual support
    bounds top, not a guessed tabletop height. No story data is mutated.
    """
    result = {'items': [], 'missing': []}
    if scene.get('id') != 'u01a_s1':
        return result
    kits = mapping_doc.get('kits', {})
    clutter = mapping_doc.get('clutter_imported', {})

    def add(name, asset, pos, size, yaw=0, support=None, parts=None):
        if not asset:
            result['missing'].append({'id': name, 'reason': 'final asset mapping absent'})
            return
        result['items'].append(dict(id=name, asset=asset, parts=parts or [asset],
                                    pos=list(pos), target_max_m=size, yaw=yaw,
                                    support=support, source='polyhaven_cc0',
                                    layer='always'))

    # Rear perimeter keeps the 1 m centre approach and original chess/basket shots clear.
    for side, x in [('left', -2.22), ('right', .9)]:
        table = f'{side}_reading_table'
        add(table, kits.get('cafe_table', {}).get('asset'), [x, 2.05, 0], .65)
        if not any(p['id'] == table for p in result['items']):
            continue
        # Books are a deliberate small reading pile, not disconnected random clutter.
        for n in range(3):
            add(f'{side}_book_{n}', _mesh('book_encyclopedia_set_01',
                f'book_encyclopedia_set_01_book{n+1:02d}'),
                [x-.16+n*.008, 2.00, 0], .23, (-5, 3, -2)[n],
                table if n==0 else f'{side}_book_{n-1}')
        add(f'{side}_saucer', _mesh('tea_set_01','tea_set_01_saucer_circular_03'),
            [x+.15, 1.98, 0], .15, support=table)
        add(f'{side}_cup', _mesh('tea_set_01','tea_set_01_cup_small_01'),
            [x+.15, 1.98, 0], .095, yaw=35, support=f'{side}_saucer')
        add(f'{side}_notepad', _mesh('office_notepads','office_notepads_note_stack'),
            [x+.03, 2.20, 0], .14, yaw=-8, support=table)
        add(f'{side}_pencil', _mesh('stationery_supplies','stationery_supplies_pencil_used'),
            [x+.03, 2.20, 0], .13, yaw=12, support=f'{side}_notepad')
        if side=='left':
            add('reading_lamp',kits.get('desk_lamp',{}).get('asset'),
                [x-.12,2.25,0],.52,yaw=150,support=table)
    # Assembled using one common origin and scale, never a naked leaf/dirt submesh.
    group='potted_plant_04'
    parts=[_mesh(group,group+'_'+part) for part in ('pot','dirt','plant')]
    add('window_plant', parts[0], [-2.52,.65,0], .80, 18, parts=parts)
    add('family_frame', clutter.get('hanging_picture_frame_01'), [.10,2.87,1.7], .48, yaw=180)
    add('family_frame_small', clutter.get('hanging_picture_frame_02'), [-.58,2.87,1.62], .32, yaw=180)
    add('shelf_clock', clutter.get('wall_clock'), [2.15,2.87,2.28], .26)
    # Only the two chess players lack authored seating; readers already have chairs.
    existing_chairs=[p for p in scene.get('props',[]) if p.get('kit') in ('chair','armchair')]
    for person in scene.get('people',[]):
        if not person.get('pose','').startswith('sit'): continue
        x,y,_=person['pos']
        if any(math.hypot(x-p['pos'][0],y-p['pos'][1])<.35 for p in existing_chairs): continue
        add('seat_'+person['role'],kits.get('chair',{}).get('asset'),
            [x,y,0],.8,yaw=person.get('yaw',0))
    # Fill the actual shelf TOP now; interior levels remain unresolved until traced.
    for n in range(6):
        add(f'shelf_top_book_{n}',_mesh('book_encyclopedia_set_01',
            f'book_encyclopedia_set_01_book{n+1:02d}'),
            [1.88+n*.075,2.70,.002],.23,yaw=180,support='existing_bookshelf')
    result['missing'].extend([
        {'id':'curtains','reason':'No delivered complete curtain asset; do not substitute a slab'},
        {'id':'family_photographs','reason':'Frames available; authored family image inserts still needed'},
        {'id':'shelf_interior_books','reason':'Shelf board support heights require mesh inspection before placing books'},
    ])
    return result


def bottom_aligned_location(pos_cm, origin, extent, scale, yaw):
    """Correct asymmetric mesh pivot in XY and minimum Z after uniform scale."""
    r=math.radians(yaw)
    x,y=origin[0]*scale,origin[1]*scale
    return [pos_cm[0]-(x*math.cos(r)-y*math.sin(r)),
            pos_cm[1]-(x*math.sin(r)+y*math.cos(r)),
            pos_cm[2]-(origin[2]-extent[2])*scale]


def spawn_room_dressing(u, spawn, scene, mapping_doc):
    """spawn(cls,label,world_cm,tags) -> actor; result includes real delivery failures.

    All component pieces share assembly transform; parents' measured bounds top
    supports their children. No shared materials or meshes are modified.
    """
    plan=derive_room_dressing(scene,mapping_doc)
    result={'spawned':[], 'missing':list(plan['missing'])}
    supports={}
    if scene.get('id')=='u01a_s1':
        eas=u.get_editor_subsystem(u.EditorActorSubsystem)
        shelves=[a for a in eas.get_all_level_actors()
                 if a.actor_has_tag('set:'+scene['id']) and a.actor_has_tag('kit:bookshelf')]
        if len(shelves)==1:
            centre,extent=shelves[0].get_actor_bounds(False)
            supports['existing_bookshelf']=float(centre.z+extent.z)
    origin=scene.get('origin',[0,0,0])
    for item in plan['items']:
        meshes=[u.load_asset(path) for path in item['parts']]
        if any(m is None for m in meshes):
            result['missing'].append({'id':item['id'],'reason':'one or more final assembly meshes not loadable'})
            continue
        if item['support'] and item['support'] not in supports:
            result['missing'].append({'id':item['id'],'reason':'support unavailable'})
            continue
        bb=[m.get_bounds() for m in meshes]
        mins=[min(float(getattr(b.origin,k))-float(getattr(b.box_extent,k)) for b in bb) for k in 'xyz']
        maxs=[max(float(getattr(b.origin,k))+float(getattr(b.box_extent,k)) for b in bb) for k in 'xyz']
        extent=[(b-a)/2 for a,b in zip(mins,maxs)]
        centre=[(b+a)/2 for a,b in zip(mins,maxs)]
        if max(extent)<=0:
            result['missing'].append({'id':item['id'],'reason':'degenerate mesh bounds'})
            continue
        scale=item['target_max_m']*100/(2*max(extent))
        loc=[(a+b)*100 for a,b in zip(origin,item['pos'])]
        if item['support']:
            loc[2]=supports[item['support']]+item['pos'][2]*100
        loc=bottom_aligned_location(loc,centre,extent,scale,item['yaw'])
        top=loc[2]+maxs[2]*scale
        for index,mesh in enumerate(meshes):
            actor=spawn(u.StaticMeshActor,f"ROOM_{scene['id']}_{item['id']}_{index}",loc,
                        ['set:'+scene['id'],'layer:always','clutter','room_dressing',
                         'source:'+item['source'],'dressing:'+item['id']])
            actor.static_mesh_component.set_mobility(u.ComponentMobility.MOVABLE)
            actor.static_mesh_component.set_static_mesh(mesh)
            actor.set_actor_scale3d(u.Vector(scale,scale,scale))
            actor.set_actor_rotation(u.Rotator(yaw=item['yaw']),False)
            result['spawned'].append(actor)
        supports[item['id']]=top
    return result
