"""Claude · import the Yantai University massing (Tools/props/ytu_campus_blocks.py) into L_YTU_Campus.

python3 Tools/ytu_campus_import.py          # through the UE lock (run_locked_editor), ~10 min first time
Creates /Game/Memory/World/L_YTU_Campus: ground, 171 building blocks at their OSM centroids, campus materials
by slot, sun + sky + fog, a PlayerStart at the south gate. Re-running replaces only actors tagged ytu_generated.
OSM attribution travels with the data (Content/Data/world/ytu_north_osm.json, ODbL).
"""
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOCKS = ROOT / "SourceArt/YTU/blocks"
LEVEL = "/Game/Memory/World/L_YTU_Campus"
DEST = "/Game/Memory/World/YTU/Blocks"
SLOT_MATERIAL = {   # campus language: beige tile walls, red-orange eaves (Docs/world/ytu-campus-reference.md)
    "wall": "/Game/Memory/Materials/Arch/MI_Arch_plaster_warm",
    "trim": "/Game/Memory/Materials/Arch/MI_Arch_brick_red",
    "roof": "/Game/Memory/Materials/Arch/MI_Arch_concrete",
    "paving": "/Game/Memory/Materials/Arch/MI_Arch_concrete",
    "road": "/Game/Memory/Materials/Arch/MI_Arch_asphalt",
    "grass": "/Game/Memory/Materials/Arch/MI_Arch_grass",
    "water": "/Game/Memory/World/YTU/Blocks/water",
}
SOUTH_GATE_M = (-3.0, -540.0)  # inside campus near OSM road; actual gate location requires verification


def to_ue(x, y, z=0.0):
    """Blender/OSM metres (x east, y north) -> UE cm (X forward=east, Y right=south)."""
    return (x * 100.0, -y * 100.0, z * 100.0)


def editor_main(u):
    manifest = json.loads((BLOCKS / "manifest.json").read_text(encoding="utf-8"))
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    eas = u.get_editor_subsystem(u.EditorActorSubsystem)
    if u.EditorAssetLibrary.does_asset_exist(LEVEL):
        les.load_level(LEVEL)
    else:
        les.new_level(LEVEL)
    repair_ground = os.environ.get("WQ_YTU_REPAIR_GROUND") == "1"
    existing_actors = list(eas.get_all_level_actors())
    if not repair_ground:
        for a in existing_actors:
            if a.actor_has_tag("ytu_generated"):
                eas.destroy_actor(a)

    tasks = []
    ground_names = manifest.get("ground", [])
    if not ground_names or "G_campus" not in ground_names:
        raise RuntimeError("Ground manifest is empty or has no campus surface")
    sources = ([] if repair_ground else manifest["buildings"][:])
    if any(not u.EditorAssetLibrary.does_asset_exist(f"{DEST}/{name}") for name in ground_names):
        sources.append({"fbx": "SM_YTU_Ground.fbx"})
    for b in sources:
        name = Path(b["fbx"]).stem
        if u.EditorAssetLibrary.does_asset_exist(f"{DEST}/{name}"):
            continue
        t = u.AssetImportTask()
        t.filename = str(BLOCKS / b["fbx"])
        t.destination_path = DEST
        t.destination_name = name
        t.automated = True
        t.replace_existing = True
        t.save = True
        tasks.append(t)
    if tasks:
        u.AssetToolsHelpers.get_asset_tools().import_asset_tasks(tasks)
    u.log_warning(f"[ytu] imported {len(tasks)} meshes")

    grass_path = SLOT_MATERIAL["grass"]
    if not u.EditorAssetLibrary.does_asset_exist(grass_path):
        parent = u.load_asset("/Game/Memory/Materials/Arch/M_ArchWorld")
        texture_root = "/Game/PolyHaven/Textures/leafy_grass/leafy_grass_"
        textures = {key: u.load_asset(texture_root + suffix) for key, suffix in
                    (("BaseColor", "diffuse_2k"), ("Normal", "nor_gl_2k"), ("ARM", "arm_2k"))}
        if not parent or any(not texture for texture in textures.values()):
            raise RuntimeError("Missing CC0 grass textures or architecture material")
        grass = u.AssetToolsHelpers.get_asset_tools().create_asset(
            "MI_Arch_grass", "/Game/Memory/Materials/Arch", u.MaterialInstanceConstant,
            u.MaterialInstanceConstantFactoryNew())
        if not grass:
            raise RuntimeError("Could not create grass material")
        u.MaterialEditingLibrary.set_material_instance_parent(grass, parent)
        for key, texture in textures.items():
            u.MaterialEditingLibrary.set_material_instance_texture_parameter_value(grass, key, texture)
        u.MaterialEditingLibrary.set_material_instance_scalar_parameter_value(grass, "TileSize", 260.0)
        if not u.EditorAssetLibrary.save_loaded_asset(grass):
            raise RuntimeError("Could not save grass material")
    mats = {k: u.load_asset(v) for k, v in SLOT_MATERIAL.items() if u.EditorAssetLibrary.does_asset_exist(v)}
    if any(k not in mats for k in ("paving", "road", "grass", "water")):
        raise RuntimeError("Missing required campus ground materials")

    def apply_materials(actor):
        c = actor.static_mesh_component
        slots = c.get_material_slot_names()
        for i in range(c.get_num_materials()):
            slot = str(slots[i]) if i < len(slots) else ""
            key = next((k for k in mats if slot.lower().startswith(k)), None)
            if key:
                c.set_material(i, mats[key])

    def place(asset, loc, label, tags):
        mesh = u.load_asset(f"{DEST}/{asset}")
        if not isinstance(mesh, u.StaticMesh):
            return None
        a = eas.spawn_actor_from_class(u.StaticMeshActor, u.Vector(*loc))
        a.set_actor_label(label)
        a.set_editor_property("tags", [u.Name(t) for t in ["ytu_generated"] + tags])
        a.static_mesh_component.set_static_mesh(mesh)
        apply_materials(a)
        return a

    missing = [name for name in ground_names if not u.EditorAssetLibrary.does_asset_exist(f"{DEST}/{name}")]
    if missing:
        raise RuntimeError(f"Missing {len(missing)} campus ground meshes after import: {missing[:5]}")
    present = {str(tag)[11:]: actor for actor in existing_actors for tag in actor.tags
               if str(tag).startswith("ytu_ground:")} if repair_ground else {}
    for name in ground_names:
        if name in present:
            apply_materials(present[name])
            continue
        actor = place(name, to_ue(0, 0), "YTU_" + name, ["ytu:ground", "ytu_ground:" + name])
        if not actor:
            raise RuntimeError(f"Could not place campus ground mesh: {name}")
    if repair_ground:
        starts = [a for a in existing_actors if a.get_actor_label() == "YTU_Start_SouthGate"]
        if len(starts) != 1:
            raise RuntimeError("Expected exactly one campus player start")
        start = starts[0]
        old = start.get_actor_location()
        # Only migrate the previously generated default. Preserve custom placements.
        if abs(old.x) < 1 and abs(old.y - 64000) < 1 and abs(old.z - 100) < 1:
            start.set_actor_location(u.Vector(*to_ue(*SOUTH_GATE_M, 1.0)), False, True)
        if not les.save_current_level():
            raise RuntimeError("Could not save repaired campus level")
        print("WQ_YTU_GROUND_REPAIRED", len(ground_names), flush=True)
        return
    for b in manifest["buildings"]:
        label = f"YTU_{b['name'] or 'B'}_{b['id']}"
        place(Path(b["fbx"]).stem, to_ue(*b["centroid_m"]), label,
              ["ytu:building", f"osm:{b['id']}", f"levels:{b['levels']}"] + ([f"name:{b['name']}"] if b["name"] else []))

    sun = eas.spawn_actor_from_class(u.DirectionalLight, u.Vector(0, 0, 50000))
    sun.set_actor_label("YTU_Sun")
    sun.set_actor_rotation(u.Rotator(pitch=-38, yaw=135, roll=0), False)   # mid-morning sun from the south-east
    sun.set_editor_property("tags", [u.Name("ytu_generated")])
    sun.light_component.set_intensity(8.0)
    sun.light_component.set_editor_property("atmosphere_sun_light", True)
    for cls, label in [(u.SkyAtmosphere, "YTU_Sky"), (u.SkyLight, "YTU_SkyLight"),
                       (u.ExponentialHeightFog, "YTU_Fog"), (u.VolumetricCloud, "YTU_Clouds")]:
        a = eas.spawn_actor_from_class(cls, u.Vector(0, 0, 0))
        a.set_actor_label(label)
        a.set_editor_property("tags", [u.Name("ytu_generated")])
        if cls is u.SkyLight:
            sc = a.get_component_by_class(u.SkyLightComponent)
            sc.set_editor_property("real_time_capture", True)
    start = eas.spawn_actor_from_class(u.PlayerStart, u.Vector(*to_ue(*SOUTH_GATE_M, 1.0)))
    start.set_actor_label("YTU_Start_SouthGate")
    start.set_actor_rotation(u.Rotator(yaw=-90), False)                      # facing north, up the axis road
    start.set_editor_property("tags", [u.Name("ytu_generated")])
    les.save_current_level()
    print("WQ_YTU_IMPORT_DONE", len(manifest["buildings"]), flush=True)
    u.log_warning("[ytu] WQ_YTU_IMPORT_DONE")


def cli():
    sys.path.insert(0, str(ROOT / "Tools"))
    from ue_character_common import run_locked_editor
    log = ROOT / "Saved/YTU/import.log"
    log.parent.mkdir(parents=True, exist_ok=True)
    r = run_locked_editor(__file__, {}, log, engine="/Volumes/Games/Game-Engine/Epic Games/UE_5.8", total_timeout=3000)
    text = log.read_text(errors="replace")
    expected = "WQ_YTU_GROUND_REPAIRED" if os.environ.get("WQ_YTU_REPAIR_GROUND") == "1" else "WQ_YTU_IMPORT_DONE"
    if r.returncode or expected not in text:
        raise SystemExit("YTU import failed; see " + str(log))
    print("YTU import OK")


if __name__ == "__main__":
    try:
        import unreal
    except ImportError:
        cli()
    else:
        try:
            editor_main(unreal)
        except Exception:  # noqa: BLE001
            import traceback
            traceback.print_exc()
            sys.stderr.flush()
            os._exit(1)
        os._exit(0)
