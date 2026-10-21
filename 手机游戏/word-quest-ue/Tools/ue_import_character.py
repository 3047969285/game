"""Import Claude's Alembic hair without writing Content/Characters.
python3 Tools/ue_import_character.py me2026 [--plan]
Run the matching renderer with --grooms to build transient MHC preview bindings.
"""
import hashlib
import json
import os
from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).parent))
from ue_character_common import ROOT,character_id,character_profile,export_dir,run_locked_editor

def import_plan(cid):
    profile=character_profile(cid);who=profile['who'];folder=export_dir(cid)
    files=[folder/(who+'_groom.abc')]
    brows=folder/(who+'_brows.abc')
    if brows.is_file():files.append(brows)
    for path in files:
        if not path.is_file():raise FileNotFoundError(path)
    return {'id':cid,'profile':profile,'destination':f'/Game/Blueprints/Characters/Imported/{cid}',
        'files':[{'file':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'asset':p.stem} for p in files],
        'conversion':{'rotation':[-90,0,0],'scale':[100,100,-100]},
        'missing_clothes':not (folder/(who+'_clothes.fbx')).exists(),
        'binding':'transient MHC preview; never persist references to transient FaceMesh'}

def editor_import_character(unreal,cid):
    plan=import_plan(cid);assets=[]
    tools=unreal.AssetToolsHelpers.get_asset_tools()
    for source in plan['files']:
        path=plan['destination']+'/'+source['asset'];groom=unreal.load_asset(path) if unreal.EditorAssetLibrary.does_asset_exist(path) else None
        stamp=ROOT/'Saved/CharacterEngine'/cid/(source['asset']+'-import.json')
        old=json.loads(stamp.read_text()) if stamp.exists() else {}
        unchanged=old.get('sha256')==source['sha256'] and old.get('conversion')==plan['conversion']
        if groom is None or not unchanged:
            options=unreal.GroomImportOptions();conversion=options.get_editor_property('conversion_settings')
            conversion.set_editor_property('rotation',unreal.Vector(-90,0,0));conversion.set_editor_property('scale',unreal.Vector(100,100,-100))
            options.set_editor_property('conversion_settings',conversion)
            task=unreal.AssetImportTask();task.set_editor_property('filename',source['file'])
            task.set_editor_property('destination_path',plan['destination']);task.set_editor_property('destination_name',source['asset'])
            task.set_editor_property('automated',True);task.set_editor_property('replace_existing',True);task.set_editor_property('save',True)
            task.set_editor_property('factory',unreal.HairStrandsFactory());task.set_editor_property('options',options)
            tools.import_asset_tasks([task]);groom=unreal.load_asset(path)
        if not isinstance(groom,unreal.GroomAsset):raise RuntimeError('Not a GroomAsset: '+path)
        info=[]
        for group in groom.get_editor_property('hair_groups_info'):
            info.append({'curves':group.get_editor_property('num_curves'),'guides':group.get_editor_property('num_guides')})
        if sum(x['curves'] for x in info)<=0:raise RuntimeError('Empty Groom: '+path)
        # Strands LODs are useful now. Cards are not enabled until real card geometry exists.
        groups=groom.get_editor_property('hair_groups_lod')
        for group in groups:
            lods=[]
            for size,curves,points in [(1.0,1.0,1.0),(.3,.4,.7),(.08,.12,.4)]:
                lod=unreal.HairLODSettings();lod.set_editor_property('screen_size',size)
                lod.set_editor_property('curve_decimation',curves);lod.set_editor_property('vertex_decimation',points)
                lod.set_editor_property('geometry_type',unreal.GroomGeometryType.STRANDS)
                lods.append(lod)
            group.set_editor_property('LODs',lods)
        groom.set_editor_property('hair_groups_lod',groups)
        # Alembic has no authored widths/colors: apply the author's sidecar in UE units.
        info_path=export_dir(cid)/(plan['profile']['who']+'_groom_info.json')
        sidecar=json.loads(info_path.read_text()) if info_path.exists() else {}
        width_m=sidecar.get('strand_width_m',[.00006,.00009])
        width_cm=sum(width_m)/len(width_m)*100
        rendering=groom.get_editor_property('hair_groups_rendering')
        for group in rendering:
            geometry=group.get_editor_property('geometry_settings')
            geometry.set_editor_property('HairWidth',width_cm)
            geometry.set_editor_property('HairWidth_Override',True)
            group.set_editor_property('geometry_settings',geometry)
        groom.set_editor_property('hair_groups_rendering',rendering)
        parent=unreal.load_asset('/HairStrands/Materials/HairDefaultMaterial')
        parameters=[str(x) for x in unreal.MaterialEditingLibrary.get_vector_parameter_names(parent)]
        unreal.log('WQ_GROOM_MATERIAL_PARAMETERS '+str(parameters))
        material_path=plan['destination']+'/MI_'+source['asset']
        material=unreal.load_asset(material_path) if unreal.EditorAssetLibrary.does_asset_exist(material_path) else None
        if not material:material=tools.create_asset('MI_'+source['asset'],plan['destination'],unreal.MaterialInstanceConstant,unreal.MaterialInstanceConstantFactoryNew())
        unreal.MaterialEditingLibrary.set_material_instance_parent(material,parent)
        color=sidecar.get('colour_linear',[.012,.01,.01])
        parameter=next((x for x in parameters if x.lower() in ['color','basecolor','haircolor']),None)
        if parameter is None:raise RuntimeError('Default hair material color parameter unavailable: '+str(parameters))
        # UE 5.8 implementation always returns false; verify the value by reading it back.
        unreal.MaterialEditingLibrary.set_material_instance_vector_parameter_value(material,parameter,unreal.LinearColor(*color,1))
        actual=unreal.MaterialEditingLibrary.get_material_instance_vector_parameter_value(material,parameter)
        if max(abs(a-b) for a,b in zip([actual.r,actual.g,actual.b],color))>1e-6:
            raise RuntimeError('Source Groom color readback mismatch')
        unreal.EditorAssetLibrary.save_loaded_asset(material)
        materials=groom.get_editor_property('hair_groups_materials')
        if not materials:materials=[unreal.HairGroupsMaterial()]
        for slot in materials:slot.set_editor_property('material',material)
        groom.set_editor_property('hair_groups_materials',materials)
        if not unreal.EditorAssetLibrary.save_loaded_asset(groom):raise RuntimeError('Cannot save Groom: '+path)
        if hashlib.sha256(Path(source['file']).read_bytes()).hexdigest()!=source['sha256']:raise RuntimeError('Source ABC changed during import')
        record=dict(source,package=path,groups=info,conversion=plan['conversion'],cards_generated=False,width_cm=width_cm,color_linear=color)
        stamp.parent.mkdir(parents=True,exist_ok=True);stamp.write_text(json.dumps(record,indent=2));assets.append(record)
        unreal.log('WQ_GROOM_IMPORTED '+json.dumps(record))
    plan['assets']=assets;plan['status']='grooms_imported';plan['cards_generated']=False
    out=ROOT/'Saved/CharacterEngine'/cid/'C3-import.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(plan,indent=2))
    return plan

def editor_main(unreal):
    cid=character_id(os.environ['WQ_CHARACTER_ID'])
    ids=['me2026','lin','mei','an','rui','organizer','old2090'] if cid=='all' else [cid]
    for item in ids:
        editor_import_character(unreal,item)
        unreal.SystemLibrary.collect_garbage()
    print('WQ_C3_IMPORT_PASS',flush=True);os._exit(0)

def cli():
    import argparse,subprocess,uuid
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('id');parser.add_argument('--plan',action='store_true');parser.add_argument('--engine',default='/Users/Shared/Epic Games/UE_5.8');args=parser.parse_args()
    cid=character_id(args.id)
    if args.plan:
        ids=['me2026','lin','mei','an','rui','organizer','old2090'] if cid=='all' else [cid]
        print(json.dumps([import_plan(x) for x in ids],indent=2));return
    binary=Path(args.engine)/'Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor'
    log=ROOT/'Saved/CharacterEngine'/cid/('import-'+uuid.uuid4().hex+'.log');log.parent.mkdir(parents=True,exist_ok=True)
    result=run_locked_editor(__file__,{'WQ_CHARACTER_ID':cid},log,args.engine)
    if result.returncode or 'WQ_C3_IMPORT_PASS' not in log.read_text(errors='replace'):raise RuntimeError('Groom import failed; inspect '+str(log))
    print('WQ_C3_IMPORT_PASS '+cid+' '+str(log))

if __name__=='__main__':
    try:import unreal
    except ImportError:cli()
    else:
        try:editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc();sys.stderr.flush();os._exit(1)
