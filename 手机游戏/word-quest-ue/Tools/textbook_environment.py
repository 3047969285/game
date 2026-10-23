"""Generated environment helpers. HDRI lighting and a visible sky are distinct.

SkyLight cubemaps light surfaces but do not render a background. A sky-marked,
unlit dome samples the same CC0 cubemap along camera rays, providing actual
window scenery without adding emissive GI or a synthetic flat backdrop.
"""

def hdri_material(u,cubemap):
    tools=u.AssetToolsHelpers.get_asset_tools();folder='/Game/Memory/Materials';path=folder+'/M_TextbookHDRISky'
    parent=u.load_asset(path)
    if not parent:
        parent=tools.create_asset('M_TextbookHDRISky',folder,u.Material,u.MaterialFactoryNew())
        parent.set_editor_property('shading_model',u.MaterialShadingModel.MSM_UNLIT)
        parent.set_editor_property('two_sided',True);parent.set_editor_property('is_sky',True)
        tex=u.MaterialEditingLibrary.create_material_expression(parent,u.MaterialExpressionTextureSampleParameterCube)
        tex.set_editor_property('parameter_name','SkyCube');tex.set_editor_property('texture',cubemap)
        direction=u.MaterialEditingLibrary.create_material_expression(parent,u.MaterialExpressionCameraVectorWS)
        reverse=u.MaterialEditingLibrary.create_material_expression(parent,u.MaterialExpressionMultiply);reverse.set_editor_property('const_b',-1.)
        assert u.MaterialEditingLibrary.connect_material_expressions(direction,'',reverse,'A')
        assert u.MaterialEditingLibrary.connect_material_expressions(reverse,'',tex,'UVs')
        intensity=u.MaterialEditingLibrary.create_material_expression(parent,u.MaterialExpressionScalarParameter);intensity.set_editor_property('parameter_name','SkyLuminance');intensity.set_editor_property('default_value',1.)
        gain=u.MaterialEditingLibrary.create_material_expression(parent,u.MaterialExpressionMultiply)
        assert u.MaterialEditingLibrary.connect_material_expressions(tex,'RGB',gain,'A')
        assert u.MaterialEditingLibrary.connect_material_expressions(intensity,'',gain,'B')
        assert u.MaterialEditingLibrary.connect_material_property(gain,'',u.MaterialProperty.MP_EMISSIVE_COLOR)
        u.MaterialEditingLibrary.recompile_material(parent);u.EditorAssetLibrary.save_loaded_asset(parent)
    name='MI_Sky_'+cubemap.get_name();instance=u.load_asset(folder+'/'+name)
    if not instance:instance=tools.create_asset(name,folder,u.MaterialInstanceConstant,u.MaterialInstanceConstantFactoryNew())
    u.MaterialEditingLibrary.set_material_instance_parent(instance,parent)
    u.MaterialEditingLibrary.set_material_instance_texture_parameter_value(instance,'SkyCube',cubemap)
    u.MaterialEditingLibrary.set_material_instance_scalar_parameter_value(instance,'SkyLuminance',1.)
    u.EditorAssetLibrary.save_loaded_asset(instance)
    return instance

def spawn_hdri_sky(u,spawn,scene,cubemap):
    from textbook_scene_contract import world_cm
    actor=spawn(u.StaticMeshActor,'HDRI_BACKGROUND_'+scene['id'],world_cm(scene,[0,0,2]),['set:'+scene['id'],'environment:sky','environment:hdri_backdrop','source:polyhaven_cc0'])
    mesh=actor.static_mesh_component;mesh.set_static_mesh(u.load_asset('/Engine/BasicShapes/Sphere'))
    mesh.set_material(0,hdri_material(u,cubemap));mesh.set_editor_property('cast_shadow',False)
    mesh.set_collision_enabled(u.CollisionEnabled.NO_COLLISION);actor.set_actor_scale3d(u.Vector(55,55,55))
    return actor

def scene_hdri_path(scene,mapping):
    light=scene.get('light',{});title=(scene.get('title','')+' '+scene.get('id','')).lower()
    role=light.get('hdri')
    if not role:
        if any(w in title for w in ('night','evening','晚','夜')):role='night_city'
        elif any(w in title for w in ('dusk','sunset','黄昏','日落')):role='dusk'
        elif any(w in title for w in ('morning','早晨','清晨')):role='morning'
        elif light.get('type')=='interior':role='office'
        else:role='day'
    asset_id=mapping.get('hdris_polyhaven',{}).get(role,role)
    return mapping.get('hdris_imported',{}).get(asset_id)
