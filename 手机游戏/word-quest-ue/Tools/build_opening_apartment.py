"""Build the authored prologue space; run only through run_locked_editor.
No story data or default startup map is changed. See Docs/opening-apartment.md.
"""
import argparse
import json
import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
ROOT = Path(__file__).resolve().parents[1]
LEVEL = '/Game/Maps/L_Opening2090'
TAG = 'opening_generated'
MARKER = 'WQ_OPENING_BUILT'


def plan():
    prologue = json.loads((ROOT/'Content/Data/memory/acts.json').read_text())['prologue']
    if prologue['stage'] != 'apartment2090':
        raise ValueError('Prologue stage changed; review opening layout')
    return {'stage': prologue['stage'], 'weather': prologue['weather'],
            'actors': prologue['actors'], 'story_source': 'Content/Data/memory/acts.json#prologue',
            'stage_design_available': 'apartment2090' in json.loads((ROOT/'Content/Data/memory/stages.json').read_text()).get('stages', {}),
            'room_cm': [800, 640, 300], 'eye_height_cm': 160,
            'level': LEVEL, 'lines': len(prologue['lines'])}


def editor_main(u):
    from textbook_character_staging import stage_people
    from textbook_environment import spawn_hdri_sky, scene_hdri_path
    audit = plan(); audit.update(status='FAIL', errors=[], props=[])
    output = ROOT/'Saved/Opening2090/build.json'; output.parent.mkdir(parents=True, exist_ok=True)
    def save_audit(): output.write_text(json.dumps(audit, ensure_ascii=False, indent=2))
    eas = u.get_editor_subsystem(u.EditorActorSubsystem)
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    mapping = json.loads((ROOT/'Content/Data/memory/kit_assets.json').read_text())
    def require(path):
        if not path or not u.EditorAssetLibrary.does_asset_exist(path):
            raise RuntimeError('Missing final asset: '+str(path))
        return u.load_asset(path)
    def tag(actor, extra=()):
        actor.set_editor_property('tags', [u.Name(x) for x in [TAG, *extra]])
    def spawn(cls, label, location, extra=()):
        actor = eas.spawn_actor_from_class(cls, u.Vector(*location))
        actor.set_actor_label(label); tag(actor, extra); return actor
    def rotated(v,r):
        import math
        p,y,z=[math.radians(x) for x in (r.pitch,r.yaw,r.roll)]
        cp,sp,cy,sy,cr,sr=math.cos(p),math.sin(p),math.cos(y),math.sin(y),math.cos(z),math.sin(z)
        return u.Vector(v.x*cp*cy+v.y*(sr*sp*cy-cr*sy)-v.z*(cr*sp*cy+sr*sy),v.x*cp*sy+v.y*(sr*sp*sy+cr*cy)+v.z*(sr*cy-cr*sp*sy),v.x*sp-v.y*sr*cp+v.z*cr*cp)
    def mesh(kit, label, pos, yaw=0, size=None, extra=(), roll=0):
        spec = mapping['kits'][kit]; asset = require(spec.get('asset'))
        actor = spawn(u.StaticMeshActor, label, pos, extra)
        comp = actor.static_mesh_component; comp.set_mobility(u.ComponentMobility.MOVABLE)
        comp.set_static_mesh(asset)
        rotation=u.Rotator(yaw=yaw+spec.get('yaw_offset',0),roll=roll)
        actor.set_actor_rotation(rotation, False)
        bounds=asset.get_bounds();extent=bounds.box_extent
        if size:
            bounds = asset.get_bounds(); extent = bounds.box_extent
            scale = [size[i]/max(2*v,.001) for i,v in enumerate((extent.x,extent.y,extent.z))]
            actor.set_actor_scale3d(u.Vector(*scale))
        else:
            scale = spec.get('scale',1); scale = [scale]*3 if isinstance(scale,(int,float)) else scale
            actor.set_actor_scale3d(u.Vector(*scale))
        # Compensate asymmetric pivots after the full rotation, including upright
        # books. Place each mesh's actual lowest corner on its support plane.
        center=rotated(u.Vector(bounds.origin.x*scale[0],bounds.origin.y*scale[1],bounds.origin.z*scale[2]),rotation)
        corners=[rotated(u.Vector(x*extent.x*scale[0],y*extent.y*scale[1],z*extent.z*scale[2]),rotation) for x in (-1,1) for y in (-1,1) for z in (-1,1)]
        low=min(c.z for c in corners)
        actor.set_actor_location(u.Vector(pos[0]-center.x,pos[1]-center.y,pos[2]-center.z-low),False,False)
        for slot,path in spec.get('materials',{}).items(): comp.set_material(int(slot),require(path))
        audit['props'].append({'kit':kit,'label':label,'asset':spec['asset']})
        return actor
    try:
        # Validate all required resources before touching this map.
        kits = ['wall','home_desk','armchair','bookshelf','side_table','book','desk_lamp','photo_album','rug','notebook']
        for kit in kits: require(mapping['kits'][kit].get('asset'))
        surfaces = {role:require('/Game/PolyHaven/Materials/'+mapping['textures_polyhaven'][role]+'/MI_'+mapping['textures_polyhaven'][role]) for role in ('wood_floor','plaster')}
        scene = {'id':'opening2090','origin':[0,0,0],'title':'apartment night','light':{'hdri':'night_city'}}
        hdri = require(scene_hdri_path(scene,mapping))
        if u.EditorAssetLibrary.does_asset_exist(LEVEL):
            if not les.load_level(LEVEL): raise RuntimeError('Cannot load '+LEVEL)
        elif not les.new_level(LEVEL): raise RuntimeError('Cannot create '+LEVEL)
        for actor in list(eas.get_all_level_actors()):
            if actor.actor_has_tag(TAG): eas.destroy_actor(actor)
        def surface(label,pos,size,role):
            a=mesh('wall',label,pos,size=size);a.static_mesh_component.set_material(0,surfaces[role]);return a
        surface('Opening_OakFloor',[0,0,-18],[800,640,18],'wood_floor')
        surface('Opening_Ceiling',[0,0,300],[800,640,16],'plaster')
        for label,pos,size in [('Back',[0,320,0],[800,16,300]),('Left',[-400,0,0],[16,640,300]),('Right',[400,0,0],[16,640,300]),('WindowSill',[0,-320,0],[800,16,85]),('WindowHeader',[0,-320,255],[800,16,45]),('WindowPierL',[-340,-320,85],[120,16,170]),('WindowPierR',[340,-320,85],[120,16,170])]:
            surface('Opening_'+label,pos,size,'plaster')
        mesh('home_desk','Opening_RecallDesk',[150,-190,0],size=[155,70,76])
        mesh('armchair','Opening_OldReadingChair',[150,-75,0],yaw=180)
        mesh('bookshelf','Opening_Library',[-340,150,0],yaw=90,size=[140,35,225])
        mesh('side_table','Opening_SideTable',[275,-70,0],size=[55,55,60])
        mesh('desk_lamp','Opening_TaskLamp',[205,-200,76])
        mesh('rug','Opening_ReadingRug',[100,-60,1],size=[260,200,1])
        mesh('photo_album','Opening_MemoryAlbum',[125,-170,77],extra=['opening_memory_anchor','memory:prologue','destination:2026'])
        mesh('notebook','Opening_Notes',[175,-173,77])
        for index in range(18):
            mesh('book',f'Opening_LibraryBook_{index:02d}',[-337,92+(index%6)*22,45+(index//6)*56],yaw=90,roll=90,size=[22,30,3])
        spawn_hdri_sky(u,spawn,scene,hdri)
        sky=spawn(u.SkyLight,'Opening_SkyLight',[0,0,280]);sky.light_component.set_editor_property('source_type',u.SkyLightSourceType.SLS_SPECIFIED_CUBEMAP);sky.light_component.set_editor_property('cubemap',hdri);sky.light_component.set_intensity(.3)
        for label,pos,look,intensity,color in [('Window',[0,-285,220],[100,-50,110],2400,(.50,.67,1)),('Task',[205,-195,140],[125,-170,76],450,(1,.83,.64)),('Fill',[-150,130,220],[100,-80,110],600,(.72,.81,1))]:
            a=spawn(u.RectLight,'Opening_Light'+label,pos);a.set_actor_rotation(u.MathLibrary.find_look_at_rotation(a.get_actor_location(),u.Vector(*look)),False)
            c=a.light_component;c.set_intensity(intensity);c.set_light_color(u.LinearColor(*color,1));c.set_editor_property('attenuation_radius',650.);c.set_editor_property('source_width',100.);c.set_editor_property('source_height',80.)
        fog=spawn(u.ExponentialHeightFog,'Opening_Atmosphere',[0,0,-80]);fog.component.set_editor_property('fog_density',.003);fog.component.set_editor_property('enable_volumetric_fog',True)
        pp=spawn(u.PostProcessVolume,'Opening_Exposure',[0,0,150]);pp.set_editor_property('unbound',True)
        s=pp.get_editor_property('settings')
        for key,value in {'override_auto_exposure_method':True,'auto_exposure_method':u.AutoExposureMethod.AEM_MANUAL,'override_auto_exposure_apply_physical_camera_exposure':True,'auto_exposure_apply_physical_camera_exposure':False,'override_auto_exposure_bias':True,'auto_exposure_bias':-3.}.items(): s.set_editor_property(key,value)
        pp.set_editor_property('settings',s)
        camera=spawn(u.CameraActor,'Opening_EyeCamera',[-170,170,160],['opening_camera']);camera.set_actor_rotation(u.MathLibrary.find_look_at_rotation(camera.get_actor_location(),u.Vector(125,-170,110)),False);camera.camera_component.set_field_of_view(65.)
        spawn(u.TargetPoint,'Opening_CameraPoint',[-170,170,160],['opening_camera_point'])
        spawn(u.PlayerStart,'Opening_PlayerStart',[-170,170,98],['opening_player_start'])
        actor_scene={'id':'opening2090','people':[{'role':'old2090','character':'old2090','pose':'sit','pos':[1.5,-.75,0],'yaw':180}]}
        audit['characters']=stage_people(u,eas,actor_scene,lambda scene,p:[v*100 for v in p],tags=lambda a,t:tag(a,t),strict=True)
        world=u.get_editor_subsystem(u.UnrealEditorSubsystem).get_editor_world()
        world.get_world_settings().set_editor_property('default_game_mode',u.load_class(None,'/Script/WordQuestUE.WordQuestGameMode'))
        audit['weather_requested']='lightRain';audit['weather_runtime_required']=True
        if not les.save_current_level(): raise RuntimeError('Level save failed')
        audit['status']='BUILT_REQUIRES_PLAYTEST';save_audit();u.log(MARKER+' '+LEVEL)
    except Exception as exc:
        audit['errors'].append(str(exc));save_audit();raise


def cli():
    parser=argparse.ArgumentParser();parser.add_argument('--plan',action='store_true');args=parser.parse_args()
    if args.plan: print(json.dumps(plan(),ensure_ascii=False,indent=2));return
    from ue_character_common import run_locked_editor
    log=ROOT/'Saved/Opening2090/build.log';log.parent.mkdir(parents=True,exist_ok=True)
    result=run_locked_editor(__file__,{'UE_LOCK_WHO':'codex'},log)
    if result.returncode: raise SystemExit(result.returncode)
    if MARKER not in log.read_text(errors='replace'): raise SystemExit('Missing opening build completion marker')


if __name__=='__main__':
    try: import unreal
    except ImportError: cli()
    else:
        try: editor_main(unreal)
        except Exception:
            import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
        sys.stdout.flush();os._exit(0)
