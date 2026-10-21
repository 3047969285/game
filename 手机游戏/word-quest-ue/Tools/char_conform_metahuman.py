"""Claude · character pipeline: conform a MetaHuman Character to the code-fitted body mesh.

Run inside the full editor (the conform posts Slate notifications, so the -run=pythonscript
commandlet crashes on CurrentApplication.IsValid()):
  CHAR_ID=me2026 CHAR_WHO=male CHAR_QUIT=1 UnrealEditor WordQuestUE.uproject \
      -ExecutePythonScript="Tools/char_conform_metahuman.py" -unattended -nosplash

Inputs (from ../word-quest-game/docs/hero-pipeline/export/<id>/):
  <who>_body.fbx              full neutral body, real scale, face toward UE +Y after import
  <who>_portrait.png          front portrait rendered with a known camera
  <who>_portrait_camera.json  that camera in UE terms
Outputs:
  /Game/Characters/<id>/Source/<who>_body          imported static mesh
  /Game/Characters/<id>/MHC_<id>                    conformed MetaHuman Character (unrigged until
                                                    auto-rigging is requested with the user's Epic login)
  /Game/Characters/<id>/<id>_PosedDNA               posed DNA of the conform
Follows the engine example MetaHumanCharacter/Content/Python/examples/example_conform_from_custom_mesh.py.
"""
import json
import os
import sys

import unreal

args = [a for a in sys.argv[1:] if not a.startswith("-")]
CID = os.environ.get("CHAR_ID") or (args[0] if args else "me2026")
WHO = os.environ.get("CHAR_WHO") or (args[1] if len(args) > 1 else "male")
PROJECT = unreal.Paths.convert_relative_path_to_full(unreal.Paths.project_dir())
EXP = os.path.normpath(os.path.join(PROJECT, "..", "word-quest-game", "docs", "hero-pipeline", "export", CID))
DEST = f"/Game/Characters/{CID}"


def log(msg):
    unreal.log_warning(f"[char_conform] {msg}")


def import_body():
    task = unreal.AssetImportTask()
    task.filename = os.path.join(EXP, f"{WHO}_body.fbx")
    task.destination_path = f"{DEST}/Source"
    task.destination_name = f"{WHO}_body"
    task.automated = True
    task.replace_existing = True
    task.save = True
    opts = unreal.FbxImportUI()
    opts.import_mesh = True
    opts.import_as_skeletal = False
    opts.import_materials = False
    opts.import_textures = False
    opts.mesh_type_to_import = unreal.FBXImportType.FBXIT_STATIC_MESH
    opts.static_mesh_import_data.combine_meshes = True
    opts.static_mesh_import_data.generate_lightmap_u_vs = False
    task.options = opts
    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks([task])
    mesh = unreal.load_asset(f"{DEST}/Source/{WHO}_body")
    if mesh is None:
        raise RuntimeError("body FBX import failed: " + task.filename)
    b = mesh.get_bounding_box()
    log(f"imported body, bounds min={b.min} max={b.max}")
    return mesh


def main():
    cam = json.load(open(os.path.join(EXP, f"{WHO}_portrait_camera.json")))
    mesh = import_body()
    mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)

    curve_tracking, image_size = None, None
    for img in (cam["image"], f"{WHO}_portrait_clay.png"):
        path = os.path.join(EXP, img)
        if not os.path.exists(path):
            continue
        image_size, pixels = unreal.PromotedFrameUtils.get_promoted_frame_as_pixel_array_from_disk(path)
        res = mh.track_face_landmarks_from_image(pixels, image_size.x, image_size.y)
        if isinstance(res, tuple) and len(res) == 1:
            res = res[0]
        if res and hasattr(res, "items") and len(res):
            curve_tracking = res
            log(f"landmarks: {len(res)} contour curves from {img}")
            break
        log(f"no landmarks on {img}")
    if not curve_tracking:
        raise RuntimeError("face landmark tracking failed on every portrait")

    verts, indices, *_ = mh.get_mesh_data_for_conforming(mesh)
    log(f"target mesh {len(verts)} verts, {len(indices) // 3} tris")

    name = f"MHC_{CID}"
    path = f"{DEST}/{name}"
    if unreal.EditorAssetLibrary.does_asset_exist(path):
        unreal.EditorAssetLibrary.delete_asset(path)
    character = unreal.AssetToolsHelpers.get_asset_tools().create_asset(
        asset_name=name, package_path=DEST, asset_class=unreal.MetaHumanCharacter,
        factory=unreal.new_object(type=unreal.MetaHumanCharacterFactoryNew))
    if character is None or not mh.try_add_object_to_edit(character):
        raise RuntimeError("could not create / edit " + path)
    ok = False
    try:
        p = unreal.ConformTargetParams()
        p.conform_target_mesh.target_parts_type = unreal.TargetPartsType.COMBINED
        p.conform_target_mesh.body_vertices = verts
        p.conform_target_mesh.body_vertex_indices = indices
        p.estimate_body_joints_from_mesh = True
        p.auto_solve = True
        try:
            p.report_progress = False
        except Exception:  # noqa: BLE001
            pass
        p.body_conform_solve_settings.pipeline_name = "combined"
        v = unreal.MinimalViewInfo()
        loc = cam["ue_location_cm"]
        v.location = unreal.Vector(loc[0], loc[1], loc[2])
        r = cam["ue_rotation"]
        v.rotation = unreal.Rotator(pitch=r["pitch"], yaw=r["yaw"], roll=r["roll"])
        v.fov = cam["ue_fov_deg_horizontal"]
        v.aspect_ratio = float(image_size.x) / float(image_size.y)
        v.projection_mode = unreal.CameraProjectionMode.PERSPECTIVE
        p.curve_tracking_points = curve_tracking
        p.camera_view_info = v
        p.image_size = image_size
        key = unreal.MetaHumanCharacterTargetMeshKey()
        key.combined_mesh = mesh
        log("conforming ...")
        if not mh.conform_to_target_meshes(character, key, p):
            raise RuntimeError("conform_to_target_meshes failed")
        dna = unreal.MetaHumanPosedDNAExportParams()
        dna.target_mesh_key = key
        dna.project_path = DEST
        dna.asset_name = f"{CID}_PosedDNA"
        dna.external_path = os.path.join(EXP, "metahuman")
        dna.overwrite_existing_assets = True
        os.makedirs(dna.external_path, exist_ok=True)
        unreal.MetaHumanCharacterExportBlueprintLibrary.export_posed_dna(character, dna)
        mh.commit_posed_state_as_a_pose(character, key)
        unreal.EditorAssetLibrary.save_asset(path, only_if_is_dirty=False)
        ok = True
        log("CONFORM DONE " + path)
    finally:
        if mh.is_object_added_for_editing(character):
            mh.remove_object_to_edit(character)
        if not ok:
            log("conform failed; asset kept for inspection: " + path)


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[char_conform] FAILED: {e}")
finally:
    if os.environ.get("CHAR_QUIT") == "1":
        # quit_editor() crashes in Slate teardown (TextBiDi free) after MetaHuman notifications ->
        # crash reporter dialogs. Assets are saved above, so leave without engine shutdown.
        unreal.log_warning("[char_conform] exiting")
        try:
            unreal.SystemLibrary.execute_console_command(None, "log flush")
        except Exception:  # noqa: BLE001
            pass
        os._exit(0)
