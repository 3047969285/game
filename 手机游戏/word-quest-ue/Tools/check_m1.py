import unreal

def W(msg):
    unreal.log_warning("CHK " + str(msg))

W("HELLO")
les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
W("SUBSYSTEM " + str(les is not None))
les.load_level("/Game/Maps/L_Main")
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
actors = eas.get_all_level_actors()
W("ACTOR_COUNT " + str(len(actors)))
for a in actors:
    W("ACTOR " + a.get_actor_label() + " " + a.get_class().get_name())
mesh = unreal.load_asset("/Game/Heroes/me2026/SkeletalMeshes/Human")
W("MESH " + str(mesh))
if mesh:
    try:
        morphs = mesh.get_editor_property("morph_targets")
        W("MORPHS " + str([m.get_name() for m in morphs]) if morphs else "MORPHS []")
    except Exception as e:
        W("MORPH_ERR " + str(e))
    try:
        W("SKELETON " + mesh.skeleton.get_name())
    except Exception as e:
        W("SKEL_ERR " + str(e))
W("CHECK DONE")
