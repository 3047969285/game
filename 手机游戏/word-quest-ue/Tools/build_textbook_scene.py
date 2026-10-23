"""C7: idempotent data-driven textbook sets. python3 Tools/build_textbook_scene.py --unit 1.
Only generated actors are replaced; authored assets and manual actors are preserved.
Use --replace-placeholders to rebuild generated sets after the prop library arrives.
"""
import os,sys,math,argparse,json,hashlib
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from textbook_scene_contract import ROOT,read_unit,world_cm,prop_tags,level_path,read_asset_map,asset_spec,props_for,mapped_surface_clutter,kit_surface_role,scene_surface_role
from textbook_environment import spawn_hdri_sky

def editor_main(u):
    data=read_unit(int(os.environ.get('WQ_TEXTBOOK_UNIT','1')),os.environ.get('WQ_TEXTBOOK_SOURCE'))
    from textbook_reference_audit import require_references
    require_references(data,os.environ.get('WQ_TEXTBOOK_SECTION'))
    eas=u.get_editor_subsystem(u.EditorActorSubsystem); les=u.get_editor_subsystem(u.LevelEditorSubsystem)
    mapping=read_asset_map(); mesh_editor=u.get_editor_subsystem(u.StaticMeshEditorSubsystem); nanite_done=set()
    staging_reports=[]
    mapping_doc=json.loads((ROOT/'Content/Data/memory/kit_assets.json').read_text(encoding='utf-8'))
    assets=u.AssetToolsHelpers.get_asset_tools()
    def material(name,color,reveal=False):
        path='/Game/Memory/Materials/'+name
        if u.EditorAssetLibrary.does_asset_exist(path): return u.load_asset(path)
        m=assets.create_asset(name,'/Game/Memory/Materials',u.Material,u.MaterialFactoryNew())
        c=u.MaterialEditingLibrary.create_material_expression(m,u.MaterialExpressionConstant3Vector)
        c.set_editor_property('constant',color)
        u.MaterialEditingLibrary.connect_material_property(c,'',u.MaterialProperty.MP_BASE_COLOR)
        r=u.MaterialEditingLibrary.create_material_expression(m,u.MaterialExpressionScalarParameter)
        r.set_editor_property('parameter_name','MemoryReveal'); r.set_editor_property('default_value',1.)
        m.set_editor_property('blend_mode',u.BlendMode.BLEND_MASKED)
        u.MaterialEditingLibrary.connect_material_property(r,'',u.MaterialProperty.MP_OPACITY_MASK)
        u.MaterialEditingLibrary.recompile_material(m); u.EditorAssetLibrary.save_asset(path)
        return m
    def reveal_material(source):
        """Separate reveal instances preserve the prop library; never edit Claude's materials."""
        translucent=source.get_blend_mode()==u.BlendMode.BLEND_TRANSLUCENT
        name='M_TextbookRevealGlass' if translucent else 'M_TextbookRevealSolid'
        parent_path='/Game/Memory/Materials/'+name
        if not u.EditorAssetLibrary.does_asset_exist(parent_path):
            m=assets.create_asset(name,'/Game/Memory/Materials',u.Material,u.MaterialFactoryNew())
            m.set_editor_property('blend_mode',u.BlendMode.BLEND_TRANSLUCENT if translucent else u.BlendMode.BLEND_MASKED)
            def scalar(n,default):
                e=u.MaterialEditingLibrary.create_material_expression(m,u.MaterialExpressionScalarParameter);e.set_editor_property('parameter_name',n);e.set_editor_property('default_value',default);return e
            def vector(n):
                e=u.MaterialEditingLibrary.create_material_expression(m,u.MaterialExpressionVectorParameter);e.set_editor_property('parameter_name',n);return e
            for n,property in [('BaseColor',u.MaterialProperty.MP_BASE_COLOR),('EmissiveColor',u.MaterialProperty.MP_EMISSIVE_COLOR)]:
                e=vector(n);u.MaterialEditingLibrary.connect_material_property(e,'',property)
            for n,default,property in [('Roughness',.6,u.MaterialProperty.MP_ROUGHNESS),('Metallic',0.,u.MaterialProperty.MP_METALLIC)]:
                e=scalar(n,default);u.MaterialEditingLibrary.connect_material_property(e,'',property)
            reveal=scalar('MemoryReveal',1.)
            if translucent:
                opacity=scalar('Opacity',.3);mul=u.MaterialEditingLibrary.create_material_expression(m,u.MaterialExpressionMultiply)
                u.MaterialEditingLibrary.connect_material_expressions(reveal,'',mul,'A');u.MaterialEditingLibrary.connect_material_expressions(opacity,'',mul,'B');u.MaterialEditingLibrary.connect_material_property(mul,'',u.MaterialProperty.MP_OPACITY)
            else:
                noise=u.MaterialEditingLibrary.create_material_expression(m,u.MaterialExpressionNoise);noise.set_editor_property('scale',.05);noise.set_editor_property('output_min',0.);noise.set_editor_property('output_max',1.)
                subtract=u.MaterialEditingLibrary.create_material_expression(m,u.MaterialExpressionSubtract);u.MaterialEditingLibrary.connect_material_expressions(reveal,'',subtract,'A');u.MaterialEditingLibrary.connect_material_expressions(noise,'',subtract,'B');m.set_editor_property('opacity_mask_clip_value',.001);u.MaterialEditingLibrary.connect_material_property(subtract,'',u.MaterialProperty.MP_OPACITY_MASK)
            u.MaterialEditingLibrary.recompile_material(m);u.EditorAssetLibrary.save_loaded_asset(m)
        parent=u.load_asset(parent_path); dest='/Game/Memory/Materials/MI_Reveal_'+source.get_name()
        mi=u.load_asset(dest) if u.EditorAssetLibrary.does_asset_exist(dest) else assets.create_asset('MI_Reveal_'+source.get_name(),'/Game/Memory/Materials',u.MaterialInstanceConstant,u.MaterialInstanceConstantFactoryNew())
        u.MaterialEditingLibrary.set_material_instance_parent(mi,parent)
        if isinstance(source,u.MaterialInstance):
            for n in ['BaseColor','EmissiveColor']:
                v=u.MaterialEditingLibrary.get_material_instance_vector_parameter_value(source,n)
                if n=='EmissiveColor':
                    strength=u.MaterialEditingLibrary.get_material_instance_scalar_parameter_value(source,'EmissiveStrength');v=u.LinearColor(v.r*strength,v.g*strength,v.b*strength,1)
                u.MaterialEditingLibrary.set_material_instance_vector_parameter_value(mi,n,v)
            for n in ['Roughness','Metallic','Opacity']:u.MaterialEditingLibrary.set_material_instance_scalar_parameter_value(mi,n,u.MaterialEditingLibrary.get_material_instance_scalar_parameter_value(source,n))
        u.EditorAssetLibrary.save_loaded_asset(mi);return mi
    neutral=material('M_TextbookPlaceholder',u.LinearColor(.16,.23,.25,1))
    dark=material('M_TextbookVoid',u.LinearColor(.004,.006,.011,1))
    cube=u.load_asset('/Engine/BasicShapes/Cube'); capsule=u.load_asset('/Engine/BasicShapes/Cylinder')
    def tags(actor,values): actor.set_editor_property('tags',[u.Name(x) for x in values])
    def spawn(cls,label,loc,values):
        a=eas.spawn_actor_from_class(cls,u.Vector(*loc)); a.set_actor_location(u.Vector(*loc),False,True);a.set_actor_label(label); tags(a,['textbook_generated']+values); return a
    def color(value):
        h=value.lstrip('#'); return u.LinearColor(*[int(h[i:i+2],16)/255 for i in (0,2,4)],1.)
    def polyhaven_material(role):
        texture_id=mapping_doc.get('textures_polyhaven',{}).get(role)
        if not texture_id: return None
        path=f'/Game/PolyHaven/Materials/{texture_id}/MI_{texture_id}'
        return u.load_asset(path) if u.EditorAssetLibrary.does_asset_exist(path) else None
    def kit_surface_material(kit):
        spec=asset_spec(mapping,kit)
        overrides=spec.get('materials',{})
        candidate=overrides.get('0') if isinstance(overrides,dict) else (overrides[0] if overrides else None)
        if candidate and u.EditorAssetLibrary.does_asset_exist(candidate): return u.load_asset(candidate)
        role=kit_surface_role(kit)
        return polyhaven_material(role) if role else None
    for article in data['articles']:
        if os.environ.get('WQ_TEXTBOOK_SECTION') and article['section']!=os.environ['WQ_TEXTBOOK_SECTION']: continue
        path=level_path(data,article)
        if u.EditorAssetLibrary.does_asset_exist(path):
            if not les.load_level(path): raise RuntimeError('Load failed: '+path)
        elif not les.new_level(path): raise RuntimeError('Create failed: '+path)
        for a in list(eas.get_all_level_actors()):
            if a.actor_has_tag('textbook_generated'): eas.destroy_actor(a)
        digest=hashlib.sha256(json.dumps(data,sort_keys=True).encode()).hexdigest()
        spawn(u.TargetPoint,'TEXTBOOK_SOURCE_METADATA',[0,0,0],['source:'+digest])
        for scene in article['scenes']:
            sid=scene['id']; base=['set:'+sid]
            for i,p in enumerate(props_for(scene)):
                spec=asset_spec(mapping,p['kit']); asset=spec.get('asset',spec.get('path','')); final=bool(asset and u.EditorAssetLibrary.does_asset_exist(asset)); fallback='/Game/Memory/Props/SM_'+p['kit']; mesh=u.load_asset(asset if final else fallback) if u.EditorAssetLibrary.does_asset_exist(asset if final else fallback) else None
                # A proxy mesh remains a placeholder until kit_assets.json maps final geometry.
                placeholder=not final; loc=world_cm(scene,p['pos']); size=p.get('size',[1,1,1]); scale=p.get('scale',1.)
                if placeholder: loc[2]+=size[2]*50*scale
                a=spawn(u.StaticMeshActor,f"PROP_{sid}_{i:03d}_{p['kit']}",loc,prop_tags(scene,p,i)+(['placeholder'] if placeholder else [])+([] if final else ['needs_final_asset'])+(['clutter'] if p.get('clutter') else []))
                c=a.static_mesh_component; c.set_mobility(u.ComponentMobility.MOVABLE); c.set_static_mesh(mesh or cube)
                correction=spec.get('rotation',[0,spec.get('yaw_offset',0),0]); a.set_actor_rotation(u.Rotator(pitch=correction[0],yaw=p.get('yaw',0)+correction[1],roll=correction[2]),False)
                correction_scale=spec.get('scale',1.); correction_scale=[correction_scale]*3 if isinstance(correction_scale,(int,float)) else correction_scale
                a.set_actor_scale3d(u.Vector(*([s*scale for s in size] if placeholder else [scale*x for x in correction_scale])))
                if final and mesh and spec.get('fit')=='size':
                    # architecture kits (walls, ground, streets): stretch the unit mesh to this placement's size;
                    # their world-aligned materials keep texel density constant, so nothing smears
                    bb=mesh.get_bounding_box(); ext=[bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z]
                    a.set_actor_scale3d(u.Vector(*[scale*size[k]*100./max(ext[k],1e-3) for k in range(3)]))
                overrides=spec.get('materials',{})
                overrides=overrides.items() if isinstance(overrides,dict) else enumerate(overrides)
                if placeholder: c.set_material(0,neutral)
                for slot,override in overrides:
                    slot=int(slot) if str(slot).isdigit() else c.get_material_index(str(slot))
                    if slot<0: raise RuntimeError('Unknown material slot '+str(slot))
                    if not u.EditorAssetLibrary.does_asset_exist(override): raise RuntimeError('Missing override material '+override)
                    c.set_material(slot,u.load_asset(override))
                # Give proxy wall / road / rug geometry its available scanned CC0 surface,
                # while retaining placeholder + needs_final_asset tags for missing geometry.
                if placeholder and not spec.get('materials'):
                    surface=kit_surface_material(p['kit'])
                    if surface: c.set_material(0,surface)
                elif p.get('layer','always')!='always' and not final:
                    for slot in range(c.get_num_materials()):
                        source=c.get_material(slot)
                        if source: c.set_material(slot,reveal_material(source))
                if final and p.get('layer','always')!='always':
                    for slot in range(c.get_num_materials()):
                        mat=c.get_material(slot)
                        if mat and 'MemoryReveal' not in [str(n) for n in u.MaterialEditingLibrary.get_scalar_parameter_names(mat)]:
                            tags(a,[str(t) for t in a.tags]+['needs_final_asset','needs_reveal_material'])
                if mesh and mesh.get_path_name().startswith('/Game/') and mesh.get_path_name() not in nanite_done:
                    materials=[c.get_material(slot) for slot in range(c.get_num_materials())]
                    nanite_supported=all(not mat or mat.get_blend_mode()!=u.BlendMode.BLEND_TRANSLUCENT for mat in materials)
                    settings=mesh_editor.get_nanite_settings(mesh); settings.set_editor_property('enabled',nanite_supported); mesh_editor.set_nanite_settings(mesh,settings,True)
                    if not nanite_supported: tags(a,[str(t) for t in a.tags]+['nanite_unsupported:translucent_material'])
                    nanite_done.add(mesh.get_path_name()); u.EditorAssetLibrary.save_loaded_asset(mesh)
            # Scene JSON owns story props; mapped CC0 clutter fills empty
            # tabletops deterministically without changing the authored file.
            from living_room_dressing import spawn_room_dressing
            if sid=='u01a_s1':
                room_report=spawn_room_dressing(u,spawn,scene,mapping_doc)
                u.log('WQ_ROOM_DRESSING '+json.dumps({'scene':sid,'spawned':len(room_report['spawned']),'missing':room_report['missing']},ensure_ascii=False))
            for i,item in enumerate([] if sid=='u01a_s1' else mapped_surface_clutter(scene,mapping_doc.get('clutter_imported',{}))):
                mesh=u.load_asset(item['asset'])
                if not mesh: continue
                bounds=mesh.get_bounds(); extent=bounds.box_extent
                max_dimension=max(abs(float(extent.x)),abs(float(extent.y)),abs(float(extent.z)))*2
                if max_dimension<=0: continue
                scale=item['target_max_m']*100/max_dimension
                loc=world_cm(scene,item['pos'])
                local_bottom=float(bounds.origin.z)-float(extent.z)
                loc[2]-=local_bottom*scale
                a=spawn(u.StaticMeshActor,f"CLUTTER_{sid}_{i:02d}_{item['asset_id']}",loc,base+['clutter','source:polyhaven_cc0','kit:'+item['asset_id']])
                a.static_mesh_component.set_mobility(u.ComponentMobility.MOVABLE)
                a.static_mesh_component.set_static_mesh(mesh)
                a.set_actor_scale3d(u.Vector(scale,scale,scale))
                a.set_actor_rotation(u.Rotator(yaw=item['yaw']),False)
                if mesh.get_path_name() not in nanite_done:
                    slots=[a.static_mesh_component.get_material(slot) for slot in range(a.static_mesh_component.get_num_materials())]
                    supported=all(not mat or mat.get_blend_mode()!=u.BlendMode.BLEND_TRANSLUCENT for mat in slots)
                    settings=mesh_editor.get_nanite_settings(mesh);settings.set_editor_property('enabled',supported);mesh_editor.set_nanite_settings(mesh,settings,True)
                    if not supported: tags(a,[str(t) for t in a.tags]+['nanite_unsupported:translucent_material'])
                    nanite_done.add(mesh.get_path_name());u.EditorAssetLibrary.save_loaded_asset(mesh)
            floor=spawn(u.StaticMeshActor,'FLOOR_'+sid,world_cm(scene,[0,0,-.12]),base+['layer:always'])
            floor.static_mesh_component.set_static_mesh(cube); floor.set_actor_scale3d(u.Vector(22,22,.2))
            ground_surface=polyhaven_material(scene_surface_role(scene)) or dark
            floor.static_mesh_component.set_material(0,ground_surface)
            # C14: people are MetaHuman snapshots (or rigged BPs) from Tools/textbook_character_staging.py, never
            # cylinders; a failed person leaves a tagged TargetPoint (needs_final_character) for the QA report
            from textbook_character_staging import stage_people
            staged=stage_people(u,eas,scene,world_cm,tags=tags,strict=False)
            staging_reports.append(staged)
            for err in staged['errors']: u.log_warning('[C14] '+err)
            light=scene.get('light',{}); lc=color(light.get('color','#B8D1D5')); intensity=float(light.get('intensity',6.))
            # Local rect sunlight avoids cross-set directional-light leakage (60 m separation).
            lamp=spawn(u.RectLight,'KEY_'+sid,world_cm(scene,[-3,-3,5]),base)
            target=u.Vector(*world_cm(scene,[0,0,.8])); lamp.set_actor_rotation(u.MathLibrary.find_look_at_rotation(lamp.get_actor_location(),target),False)
            c=lamp.light_component; c.set_mobility(u.ComponentMobility.MOVABLE); c.set_intensity(intensity*900); c.set_light_color(lc)
            c.set_editor_property('attenuation_radius',2200.);c.set_editor_property('volumetric_scattering_intensity',1.5)
            if light.get('dir'):
                d=light['dir']; lamp.set_actor_rotation(u.MathLibrary.find_look_at_rotation(u.Vector(),u.Vector(*d)),False)
            fill=spawn(u.PointLight,'FILL_'+sid,world_cm(scene,[3,1,3]),base)
            fill.light_component.set_intensity(intensity*float(light.get('fill',.6))*350); fill.light_component.set_editor_property('attenuation_radius',1600.)
            sky_value=light.get('sky','#1A2433'); sky_value=sky_value.get('color','#1A2433') if isinstance(sky_value,dict) else sky_value
            fill.light_component.set_light_color(color(sky_value))
            for i,decal in enumerate(scene.get('decals',[])):
                mat=decal.get('material',decal.get('asset','')); actor=spawn(u.DecalActor,f'DECAL_{sid}_{i}',world_cm(scene,decal['pos']),base+['decal'])
                if not mat or not u.EditorAssetLibrary.does_asset_exist(mat):
                    tags(actor,['textbook_generated']+base+['decal','needs_final_asset']);continue
                dc=actor.decal;dc.set_decal_material(u.load_asset(mat));dc.set_editor_property('decal_size',u.Vector(*[x*100 for x in decal.get('size',[.3,.3,.3])]))
                rot=decal.get('rotation',[-90,0,0]);actor.set_actor_rotation(u.Rotator(pitch=rot[0],yaw=rot[1],roll=rot[2]),False)
            localfog=spawn(u.LocalFogVolume,'ATMOSPHERE_'+sid,world_cm(scene,[0,0,2]),base+['environment:fog'])
            localfog.set_actor_scale3d(u.Vector(2,2,2))
            lf=localfog.get_component_by_class(u.LocalFogVolumeComponent);lf.set_editor_property('radial_fog_extinction',float(light.get('fog',{}).get('density',.08)) if isinstance(light.get('fog'),dict) else .08)
            sky=spawn(u.SkyAtmosphere,'SKY_'+sid,world_cm(scene,[0,0,0]),base+['environment:sky'])
            clouds=spawn(u.VolumetricCloud,'CLOUD_'+sid,world_cm(scene,[0,0,0]),base+['environment:sky'])
            hdri_roles=mapping_doc.get('hdris_polyhaven',{}); hdri_assets=mapping_doc.get('hdris_imported',{})
            explicit_hdri=light.get('hdri')
            if explicit_hdri:
                hdri_role=explicit_hdri
            else:
                title=(scene.get('title','')+' '+scene.get('id','')).lower()
                if any(token in title for token in ('night','evening','晚','夜')): hdri_role='night_city'
                elif any(token in title for token in ('dusk','sunset','黄昏','日落')): hdri_role='dusk'
                elif any(token in title for token in ('morning','早晨','清晨')): hdri_role='morning'
                elif light.get('type')=='interior': hdri_role='office'
                elif lc.r>lc.b*1.18: hdri_role='warm_afternoon'
                else: hdri_role='day'
            hdri_id=hdri_roles.get(hdri_role,hdri_role); hdri_path=hdri_assets.get(hdri_id)
            if hdri_path and u.EditorAssetLibrary.does_asset_exist(hdri_path):
                spawn_hdri_sky(u,spawn,scene,u.load_asset(hdri_path))
                hdr=spawn(u.SkyLight,'HDRI_'+sid,world_cm(scene,[0,0,0]),base+['environment:hdri'])
                hc=hdr.get_component_by_class(u.SkyLightComponent)
                hc.set_editor_property('source_type',u.SkyLightSourceType.SLS_SPECIFIED_CUBEMAP)
                hc.set_editor_property('cubemap',u.load_asset(hdri_path))
                hc.set_editor_property('real_time_capture',False)
                hc.set_editor_property('intensity',float(light.get('hdri_intensity',.35)))
                hc.recapture_sky()
            pp=spawn(u.PostProcessVolume,'GRADE_'+sid,world_cm(scene,[0,0,0]),base+['environment:ppv']);pp.set_editor_property('unbound',True);pp.set_editor_property('enabled',scene==article['scenes'][0])
            settings=pp.get_editor_property('settings'); settings.set_editor_property('override_auto_exposure_method',True);settings.set_editor_property('auto_exposure_method',u.AutoExposureMethod.AEM_MANUAL)
            settings.set_editor_property('override_auto_exposure_apply_physical_camera_exposure',True);settings.set_editor_property('auto_exposure_apply_physical_camera_exposure',False)
            settings.set_editor_property('override_auto_exposure_bias',True);settings.set_editor_property('auto_exposure_bias',float(light.get('exposure',-3)) if isinstance(light.get('exposure',-3),(float,int)) else float(light['exposure'].get('compensation',-3)))
            grade=light.get('grade',{})
            for name,value in [('vignette_intensity',grade.get('vignette',.15)),('film_grain_intensity',grade.get('grain',.08)),('scene_fringe_intensity',grade.get('chromatic_aberration',.12))]:
                settings.set_editor_property('override_'+name,True);settings.set_editor_property(name,float(value))
            pp.set_editor_property('settings',settings)
            for shot in scene['shots']:
                a=spawn(u.CineCameraActor,'CAM_'+sid+'_'+shot['name'],world_cm(scene,shot['pos']),base+['shot:'+shot['name']])
                a.set_actor_rotation(u.MathLibrary.find_look_at_rotation(a.get_actor_location(),u.Vector(*world_cm(scene,shot['look']))),False)
                c=a.get_cine_camera_component(); c.set_editor_property('current_aperture',float(shot.get('aperture',5.6))); c.set_editor_property('current_focal_length',float(shot.get('focal_length',c.get_editor_property('filmback').sensor_width/(2*math.tan(math.radians(float(shot.get('fov',40)))*.5)))))
                focus=c.get_editor_property('focus_settings'); focus.set_editor_property('focus_method',u.CameraFocusMethod.MANUAL); focus.set_editor_property('manual_focus_distance',(u.Vector(*world_cm(scene,shot['look']))-a.get_actor_location()).length()); c.set_editor_property('focus_settings',focus)
        fog=spawn(u.ExponentialHeightFog,'MEMORY_VOID_FOG',[0,0,-300],[])
        fog.component.set_editor_property('fog_density',.012); fog.component.set_editor_property('enable_volumetric_fog',True); fog.component.set_editor_property('fog_inscattering_luminance',u.LinearColor(.004,.006,.011,1))
        gs=u.load_class(None,'/Script/WordQuestUE.WordQuestMemoryGameMode'); world=u.get_editor_subsystem(u.UnrealEditorSubsystem).get_editor_world(); world.get_world_settings().set_editor_property('default_game_mode',gs)
        les.save_current_level(); u.log('WQ_C7_BUILT '+path)
    (ROOT/f"Docs/qa/character-staging-unit{int(os.environ.get('WQ_TEXTBOOK_UNIT','1')):02d}.json").write_text(json.dumps(staging_reports,indent=1,ensure_ascii=False))
    sys.stdout.flush(); os._exit(0)

def cli():
    from ue_character_common import run_locked_editor
    p=argparse.ArgumentParser(); p.add_argument('--unit',type=int,default=1); p.add_argument('--source'); p.add_argument('--section'); p.add_argument('--replace-placeholders',action='store_true'); a=p.parse_args()
    from textbook_reference_audit import require_references
    require_references(read_unit(a.unit,a.source),a.section)
    env={'WQ_TEXTBOOK_UNIT':str(a.unit)}
    if a.source: env['WQ_TEXTBOOK_SOURCE']=str(Path(a.source).resolve())
    if a.section: env['WQ_TEXTBOOK_SECTION']=a.section
    result=run_locked_editor(__file__,env,ROOT/f'Saved/Textbook/unit{a.unit:02d}-build.log')
    if result.returncode: raise SystemExit(result.returncode)
    if 'WQ_C7_BUILT' not in (ROOT/f'Saved/Textbook/unit{a.unit:02d}-build.log').read_text(errors='replace'): raise SystemExit('Editor did not execute scene generation')
if __name__=='__main__':
    try: import unreal
    except ImportError: cli()
    else:
        try: editor_main(unreal)
        except Exception:
            import traceback; traceback.print_exc(); sys.stderr.flush(); os._exit(1)
