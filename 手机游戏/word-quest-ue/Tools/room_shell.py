"""Claude · enclosed real-world rooms for textbook sets (Docs/qa/review-c19-claude.md).

A scene with a "room" block gets four walls built around their window and door openings, a ceiling,
skirting, window frames with glass, closed door leaves and a floor cut to the footprint, instead of a
single wall standing on an endless floor. All pieces are the world-aligned SM_arch_box stretched to size
(texel density stays constant), tagged so the physics/interaction layer can find doors and windows.

Scene coordinates are metres, origin at the set centre, z up (textbook_scene_contract.world_cm).

  "room": {
    "x": [-3.0, 3.0], "y": [-2.6, 3.0], "height": 2.75, "wall_thickness": 0.15,
    "materials": {"wall": "plaster_warm", "ceiling": "plaster", "floor": "wood_floor", "trim": "plaster"},
    "openings": [
      {"wall": "west", "type": "window", "center": 0.5, "width": 2.4, "sill": 0.8, "height": 1.5, "mullions": 2},
      {"wall": "east", "type": "door", "center": 1.9, "width": 0.9, "height": 2.05, "hinge": "south"}
    ],
    "key_light": [-6.5, 0.5, 3.6], "fill_light": [0.5, -0.5, 2.4],
    "replaces": ["wall", "window_wall"]
  }
Walls: west = x min, east = x max, south = y min, north = y max. "center" runs along the wall
(y for west/east, x for south/north).
"""
ARCH_MESH = "/Game/Memory/Props/Hero/SM_arch_box"
ARCH_MI = "/Game/Memory/Materials/Arch/MI_Arch_"
GLASS = "/Game/Memory/Materials/M_TextbookWindowGlass_ClearV2"
WINDOW_BACKDROP = "/Game/Memory/Materials/M_TextbookWindowBackdrop_Panorama"
SKIRT_H, SKIRT_D = 0.10, 0.015
FRAME_W, FRAME_D = 0.06, 0.10          # window frame / mullion profile
DOOR_T, ARCHITRAVE_W = 0.04, 0.07


def _wall_axes(room, wall):
    """(along-axis bounds, fixed coordinate of the interior face, outward sign, along axis name)."""
    (x0, x1), (y0, y1) = room["x"], room["y"]
    return {
        "west": ((y0, y1), x0, -1, "y"),
        "east": ((y0, y1), x1, +1, "y"),
        "south": ((x0, x1), y0, -1, "x"),
        "north": ((x0, x1), y1, +1, "x"),
    }[wall]


def wall_pieces(room, wall):
    """Solid rectangles of one wall as (a0, a1, z0, z1) along the wall, openings cut out."""
    (a0, a1), _, _, _ = _wall_axes(room, wall)
    h = room["height"]
    ops = sorted((o for o in room.get("openings", []) if o["wall"] == wall), key=lambda o: o["center"])
    pieces, cursor = [], a0
    for o in ops:
        lo, hi = o["center"] - o["width"] / 2, o["center"] + o["width"] / 2
        bottom = o.get("sill", 0.0)
        top = bottom + o["height"]
        if lo > cursor:
            pieces.append((cursor, lo, 0.0, h))
        if bottom > 0:
            pieces.append((lo, hi, 0.0, bottom))
        if top < h:
            pieces.append((lo, hi, top, h))
        cursor = hi
    if cursor < a1:
        pieces.append((cursor, a1, 0.0, h))
    return pieces


def _box(wall, room, a0, a1, z0, z1, depth, inset=0.0):
    """Centre and size (scene metres) of a box lying against `wall`; inset > 0 moves it into the room."""
    _, face, out, along = _wall_axes(room, wall)
    n = face + out * (depth / 2 - inset)
    centre_along, len_along = (a0 + a1) / 2, a1 - a0
    if along == "y":
        return [n, centre_along, (z0 + z1) / 2], [depth, len_along, z1 - z0]
    return [centre_along, n, (z0 + z1) / 2], [len_along, depth, z1 - z0]


def window_glass_profile():
    """Conservative clear-glass values tuned to keep the garden readable through the pane."""
    return {
        "base_color": (0.92, 0.97, 1.0),
        "roughness": 0.02,
        "specular": 0.02,
        "opacity": 0.025,
    }


def window_backdrop_plan(room):
    """Plan distant, non-colliding horizon panels behind windows so the garden has a readable sky."""
    plan = []
    for index, opening in enumerate(o for o in room.get("openings", []) if o["type"] == "window"):
        (_, _), face, outward, along = _wall_axes(room, opening["wall"])
        center = float(opening["center"])
        normal = face + outward * 12.0
        center_z = float(opening.get("sill", 0.0)) + float(opening["height"]) / 2.0
        width = max(18.0, float(opening["width"]) * 4.0)
        height = max(6.0, float(opening["height"]) * 4.0)
        pos = [normal, center, center_z] if along == "y" else [center, normal, center_z]
        size = [0.12, width, height] if along == "y" else [width, 0.12, height]
        plan.append({"name": f"WINDOW_{index}_backdrop", "pos": pos, "size": size,
                     "wall": opening["wall"]})
    return plan


def window_backdrop_profile():
    """Keep the tone-mapped panorama bright enough to read through the fixed-exposure room."""
    return {"luminance": 40.0, "fallback_color": (2.4, 3.8, 6.8)}


def window_backdrop_source(scene, mapping):
    """Resolve a generated perspective image from the mapped Poly Haven HDRI role."""
    role = (scene.get("light") or {}).get("hdri") or (scene.get("room") or {}).get("exterior_hdri")
    asset_id = mapping.get("hdris_polyhaven", {}).get(role, role) if role else None
    if not asset_id:
        return None, None
    from pathlib import Path
    source = Path(__file__).resolve().parents[1] / "SourceArt/PolyHaven/hdris" / f"{asset_id}_window_4k.png"
    return asset_id, source


def ensure_window_backdrop_texture(u, source, asset_id):
    """Import the source-derived panorama as a Texture2D, preserving sRGB for stable display color."""
    from pathlib import Path
    project_root = Path(__file__).resolve().parents[1]
    folder = "/Game/Memory/Textures/Window"
    path = f"{folder}/{asset_id}_window_4k"
    source = Path(source)
    if not source.is_file():
        return None
    package_file = project_root / "Content/Memory/Textures/Window" / f"{asset_id}_window_4k.uasset"
    if u.EditorAssetLibrary.does_asset_exist(path) and package_file.exists() \
            and package_file.stat().st_mtime >= source.stat().st_mtime:
        texture = u.load_asset(path)
        if isinstance(texture, u.Texture2D):
            return texture
        raise RuntimeError(f"Window panorama asset has the wrong type: {path}")
    u.EditorAssetLibrary.make_directory(folder)
    task = u.AssetImportTask()
    task.set_editor_property("filename", str(source))
    task.set_editor_property("destination_path", folder)
    task.set_editor_property("automated", True)
    task.set_editor_property("save", True)
    task.set_editor_property("replace_existing", True)
    u.AssetToolsHelpers.get_asset_tools().import_asset_tasks([task])
    imported = [u.load_asset(str(p).split(".")[0])
                for p in (task.get_editor_property("imported_object_paths") or [])]
    texture = next((asset for asset in imported if isinstance(asset, u.Texture2D)), None)
    if texture is None:
        raise RuntimeError(f"UE did not import the window panorama as a Texture2D: {source}")
    texture.set_editor_property("srgb", True)
    if not u.EditorAssetLibrary.save_loaded_asset(texture):
        raise RuntimeError(f"Failed to save window panorama texture: {texture.get_path_name()}")
    return texture


def ensure_window_backdrop_material(u, texture_asset, asset_id):
    """Create an unlit panorama material and a per-HDRI instance for the room's distant scenery."""
    tools = u.AssetToolsHelpers.get_asset_tools()
    material = u.load_asset(WINDOW_BACKDROP)
    if not material:
        material = tools.create_asset("M_TextbookWindowBackdrop_Panorama", "/Game/Memory/Materials",
                                      u.Material, u.MaterialFactoryNew())
        material.set_editor_property("shading_model", u.MaterialShadingModel.MSM_UNLIT)
        material.set_editor_property("two_sided", True)
        texture_node = u.MaterialEditingLibrary.create_material_expression(
            material, u.MaterialExpressionTextureSampleParameter2D, -300, 0)
        texture_node.set_editor_property("parameter_name", "WindowPanorama")
        texture_node.set_editor_property("texture", texture_asset)
        coordinates = u.MaterialEditingLibrary.create_material_expression(
            material, u.MaterialExpressionTextureCoordinate, -550, 0)
        if not u.MaterialEditingLibrary.connect_material_expressions(coordinates, "", texture_node, "UVs"):
            raise RuntimeError("Failed to connect the window panorama UVs")
        intensity = u.MaterialEditingLibrary.create_material_expression(
            material, u.MaterialExpressionScalarParameter, -300, 250)
        intensity.set_editor_property("parameter_name", "WindowSkyLuminance")
        intensity.set_editor_property("default_value", window_backdrop_profile()["luminance"])
        gain = u.MaterialEditingLibrary.create_material_expression(
            material, u.MaterialExpressionMultiply, -50, 0)
        if not u.MaterialEditingLibrary.connect_material_expressions(texture_node, "RGB", gain, "A"):
            raise RuntimeError("Failed to connect window panorama color")
        if not u.MaterialEditingLibrary.connect_material_expressions(intensity, "", gain, "B"):
            raise RuntimeError("Failed to connect window panorama luminance")
        if not u.MaterialEditingLibrary.connect_material_property(
                gain, "", u.MaterialProperty.MP_EMISSIVE_COLOR):
            raise RuntimeError("Failed to connect window panorama emissive output")
        u.MaterialEditingLibrary.recompile_material(material)
        if not u.EditorAssetLibrary.save_loaded_asset(material):
            raise RuntimeError("Failed to save the window panorama material")

    instance_name = f"MI_TextbookWindowBackdrop_{asset_id}"
    instance_path = f"/Game/Memory/Materials/{instance_name}"
    instance = u.load_asset(instance_path)
    if not instance:
        instance = tools.create_asset(instance_name, "/Game/Memory/Materials",
                                      u.MaterialInstanceConstant, u.MaterialInstanceConstantFactoryNew())
    u.MaterialEditingLibrary.set_material_instance_parent(instance, material)
    u.MaterialEditingLibrary.set_material_instance_texture_parameter_value(
        instance, "WindowPanorama", texture_asset)
    u.MaterialEditingLibrary.set_material_instance_scalar_parameter_value(
        instance, "WindowSkyLuminance", window_backdrop_profile()["luminance"])
    if not u.EditorAssetLibrary.save_loaded_asset(instance):
        raise RuntimeError("Failed to save the window panorama material instance")
    return instance


def ensure_window_backdrop_fallback(u):
    """Create a visible self-authored sky tint only when the mapped CC0 cubemap is missing."""
    path = "/Game/Memory/Materials/M_TextbookWindowBackdrop_Fallback"
    if u.EditorAssetLibrary.does_asset_exist(path):
        return u.load_asset(path)
    tools = u.AssetToolsHelpers.get_asset_tools()
    material = tools.create_asset("M_TextbookWindowBackdrop_Fallback", "/Game/Memory/Materials",
                                  u.Material, u.MaterialFactoryNew())
    material.set_editor_property("shading_model", u.MaterialShadingModel.MSM_UNLIT)
    color = u.MaterialEditingLibrary.create_material_expression(
        material, u.MaterialExpressionConstant3Vector, -300, 0)
    color.set_editor_property("constant", u.LinearColor(*window_backdrop_profile()["fallback_color"], 1.0))
    if not u.MaterialEditingLibrary.connect_material_property(color, "", u.MaterialProperty.MP_EMISSIVE_COLOR):
        raise RuntimeError("Failed to connect fallback window sky color")
    u.MaterialEditingLibrary.recompile_material(material)
    if not u.EditorAssetLibrary.save_loaded_asset(material):
        raise RuntimeError("Failed to save fallback window sky material")
    return material


def spawn_window_backdrop(u, spawn, scene, world_cm, missing):
    """Add source-derived panorama panels behind windows; CC0 garden meshes provide foreground depth."""
    mesh = u.load_asset("/Engine/BasicShapes/Cube")
    import json
    from textbook_scene_contract import ROOT
    mapping = json.loads((ROOT / "Content/Data/memory/kit_assets.json").read_text(encoding="utf-8"))
    asset_id, source = window_backdrop_source(scene, mapping)
    panorama = ensure_window_backdrop_texture(u, source, asset_id) if asset_id else None
    if panorama is None:
        missing.append("window_backdrop_panorama:" + str(asset_id or "unmapped"))
        material = ensure_window_backdrop_fallback(u)
    else:
        material = ensure_window_backdrop_material(u, panorama, asset_id)
    labels = []
    for item in window_backdrop_plan(scene["room"]):
        location = world_cm(scene, item["pos"])
        actor = spawn(u.StaticMeshActor, f"ROOM_{scene['id']}_{item['name']}", location,
                      ["set:" + scene["id"], "layer:always", "room_shell",
                       "environment:window_backdrop", "source:procedural"])
        component = actor.static_mesh_component
        component.set_mobility(u.ComponentMobility.STATIC)
        component.set_static_mesh(mesh)
        component.set_material(0, material)
        component.set_collision_enabled(u.CollisionEnabled.NO_COLLISION)
        component.set_editor_property("cast_shadow", False)
        actor.set_actor_scale3d(u.Vector(*[float(value) for value in item["size"]]))
        labels.append(actor.get_actor_label())
    return labels


def ensure_window_glass_material(u):
    """Create a low-opacity, lightly tinted window material with restrained reflections."""
    if u.EditorAssetLibrary.does_asset_exist(GLASS):
        return u.load_asset(GLASS)
    tools = u.AssetToolsHelpers.get_asset_tools()
    material = tools.create_asset("M_TextbookWindowGlass_ClearV2", "/Game/Memory/Materials",
                                  u.Material, u.MaterialFactoryNew())
    material.set_editor_property("blend_mode", u.BlendMode.BLEND_TRANSLUCENT)
    material.set_editor_property("shading_model", u.MaterialShadingModel.MSM_DEFAULT_LIT)
    material.set_editor_property("two_sided", True)
    profile = window_glass_profile()

    def expression(kind, x, y, **properties):
        node = u.MaterialEditingLibrary.create_material_expression(material, kind, x, y)
        for name, value in properties.items():
            node.set_editor_property(name, value)
        return node

    base = expression(u.MaterialExpressionConstant3Vector, -600, -300,
                      constant=u.LinearColor(*profile["base_color"], 1.0))
    roughness = expression(u.MaterialExpressionConstant, -600, -100, r=profile["roughness"])
    specular = expression(u.MaterialExpressionConstant, -600, 100, r=profile["specular"])
    opacity = expression(u.MaterialExpressionConstant, -600, 300, r=profile["opacity"])
    for source, target in (
        (base, u.MaterialProperty.MP_BASE_COLOR),
        (roughness, u.MaterialProperty.MP_ROUGHNESS),
        (specular, u.MaterialProperty.MP_SPECULAR),
        (opacity, u.MaterialProperty.MP_OPACITY),
    ):
        u.MaterialEditingLibrary.connect_material_property(source, "", target)
    u.MaterialEditingLibrary.recompile_material(material)
    if not u.EditorAssetLibrary.save_loaded_asset(material):
        raise RuntimeError("Failed to save the clear window material")
    return material


def assign_window_glass(component, material):
    """Apply and verify the clear pane override instead of inheriting the mesh's Fab glass."""
    slot_count = int(component.get_num_materials())
    if slot_count < 1:
        raise RuntimeError("Window glass mesh has no material slot")
    overrides = list(component.get_editor_property("override_materials"))
    overrides.extend([None] * (slot_count - len(overrides)))
    overrides[0] = material
    component.set_editor_property("override_materials", overrides)
    component.set_material(0, material)
    assigned = component.get_material(0)
    path = str(assigned.get_path_name()).split(".", 1)[0] if assigned else ""
    expected = str(material.get_path_name()).split(".", 1)[0]
    if path != expected:
        raise RuntimeError(f"Window glass material override failed: expected {expected}, got {path or 'None'}")


def shell_boxes(room):
    """Every box of the shell as dicts {name, pos, size, material, tags}. Pure; unit-tested offline."""
    t = room.get("wall_thickness", 0.15)
    mats = {"wall": "plaster_warm", "ceiling": "plaster", "floor": "wood_floor", "trim": "plaster", **room.get("materials", {})}
    (x0, x1), (y0, y1), h = room["x"], room["y"], room["height"]
    out = []

    def add(name, pos, size, material, tags=()):
        out.append({"name": name, "pos": pos, "size": size, "material": material, "tags": list(tags)})

    # walls extend by the thickness at the corners so they close without gaps
    for wall in ("west", "east", "south", "north"):
        ext = t if wall in ("south", "north") else 0.0
        for i, (a0, a1, z0, z1) in enumerate(wall_pieces(room, wall)):
            if wall in ("south", "north"):
                a0, a1 = (a0 - ext if a0 <= x0 else a0), (a1 + ext if a1 >= x1 else a1)
            pos, size = _box(wall, room, a0, a1, z0, z1, t)
            add(f"WALL_{wall}_{i}", pos, size, mats["wall"], ["arch:wall", "wall:" + wall])
        # skirting along the solid parts that reach the floor
        for i, (a0, a1, z0, _) in enumerate(p for p in wall_pieces(room, wall) if p[2] == 0.0):
            if any(o["wall"] == wall and o["type"] == "door" and abs((a0 + a1) / 2 - o["center"]) < 1e-6
                   for o in room.get("openings", [])):
                continue
            pos, size = _box(wall, room, a0, a1, 0.0, SKIRT_H, SKIRT_D, inset=SKIRT_D)
            add(f"SKIRT_{wall}_{i}", pos, size, mats["trim"], ["arch:skirting"])

    add("CEILING", [(x0 + x1) / 2, (y0 + y1) / 2, h + t / 2], [x1 - x0 + 2 * t, y1 - y0 + 2 * t, t], mats["ceiling"], ["arch:ceiling"])
    add("FLOOR", [(x0 + x1) / 2, (y0 + y1) / 2, -0.06], [x1 - x0, y1 - y0, 0.12], mats["floor"], ["arch:floor"])

    for k, o in enumerate(room.get("openings", [])):
        wall, lo, hi = o["wall"], o["center"] - o["width"] / 2, o["center"] + o["width"] / 2
        bottom = o.get("sill", 0.0)
        top = bottom + o["height"]
        if o["type"] == "window":
            tag = [f"window:{k}", "interactive:window"]
            # frame sits mid-wall; sill board projects into the room
            for name, (a0, a1, z0, z1) in {
                "L": (lo, lo + FRAME_W, bottom, top), "R": (hi - FRAME_W, hi, bottom, top),
                "B": (lo, hi, bottom, bottom + FRAME_W), "T": (lo, hi, top - FRAME_W, top),
            }.items():
                pos, size = _box(wall, room, a0, a1, z0, z1, FRAME_D, inset=-(t - FRAME_D) / 2)
                add(f"WINDOW_{k}_frame{name}", pos, size, mats["trim"], tag)
            n = o.get("mullions", 0)
            for m in range(n):
                c = lo + (hi - lo) * (m + 1) / (n + 1)
                pos, size = _box(wall, room, c - FRAME_W / 2, c + FRAME_W / 2, bottom, top, FRAME_D, inset=-(t - FRAME_D) / 2)
                add(f"WINDOW_{k}_mullion{m}", pos, size, mats["trim"], tag)
            pos, size = _box(wall, room, lo, hi, bottom, top, 0.012, inset=-t / 2)
            add(f"WINDOW_{k}_glass", pos, size, "GLASS", tag + ["glass", "render:non_nanite"])
            pos, size = _box(wall, room, lo - 0.05, hi + 0.05, bottom - 0.03, bottom, 0.20, inset=0.05)
            add(f"WINDOW_{k}_sill", pos, size, mats["trim"], ["arch:sill"])
        elif o["type"] == "door":
            tag = [f"door:{k}", "interactive:door", "hinge:" + o.get("hinge", "left")]
            pos, size = _box(wall, room, lo, hi, 0.0, top, DOOR_T, inset=-(t - DOOR_T) / 2)
            add(f"DOOR_{k}_leaf", pos, size, mats["trim"], tag)
            for name, (a0, a1, z0, z1) in {
                "L": (lo - ARCHITRAVE_W, lo, 0.0, top + ARCHITRAVE_W), "R": (hi, hi + ARCHITRAVE_W, 0.0, top + ARCHITRAVE_W),
                "T": (lo - ARCHITRAVE_W, hi + ARCHITRAVE_W, top, top + ARCHITRAVE_W),
            }.items():
                pos, size = _box(wall, room, a0, a1, z0, z1, 0.02, inset=0.02)
                add(f"DOOR_{k}_architrave{name}", pos, size, mats["trim"], ["arch:architrave"])
    return out


def spawn_room_shell(u, spawn, scene, world_cm):
    """Spawn the shell for scene["room"]; returns the spawned labels and any missing assets."""
    room = scene.get("room")
    if not room:
        return {"spawned": [], "missing": []}
    sid = scene["id"]
    mesh = u.load_asset(ARCH_MESH)
    bb = mesh.get_bounding_box()
    ext = [bb.max.x - bb.min.x, bb.max.y - bb.min.y, bb.max.z - bb.min.z]
    cache, missing, spawned = {}, [], []

    def material(name):
        path = GLASS if name == "GLASS" else ARCH_MI + name
        if path not in cache:
            cache[path] = (ensure_window_glass_material(u) if name == "GLASS" else
                           u.load_asset(path) if u.EditorAssetLibrary.does_asset_exist(path) else None)
            if cache[path] is None:
                missing.append(path)
        return cache[path]

    pivot = [(bb.min.x + bb.max.x) / 2, (bb.min.y + bb.max.y) / 2, (bb.min.z + bb.max.z) / 2]
    for b in shell_boxes(room):
        # boxes are specified by their centre; SM_arch_box's pivot is at its base, so shift by the scaled
        # bounds centre (without this every wall floated half its height up — the "dark band" of 11-02)
        scale = [b["size"][k] * 100.0 / max(ext[k], 1e-3) for k in range(3)]
        loc = world_cm(scene, b["pos"])
        loc = [loc[k] - pivot[k] * scale[k] for k in range(3)]
        a = spawn(u.StaticMeshActor, f"ROOM_{sid}_{b['name']}", loc,
                  ["set:" + sid, "layer:always", "room_shell"] + b["tags"])
        c = a.static_mesh_component
        c.set_mobility(u.ComponentMobility.MOVABLE if any(t.startswith("interactive:door") for t in b["tags"])
                       else u.ComponentMobility.STATIC)
        c.set_static_mesh(mesh)
        if "render:non_nanite" in b["tags"]:
            c.set_editor_property("disallow_nanite", True)
            c.set_editor_property("cast_shadow", False)
        a.set_actor_scale3d(u.Vector(*scale))
        m = material(b["material"])
        if m:
            if b["material"] == "GLASS":
                assign_window_glass(c, m)
            else:
                c.set_material(0, m)
        spawned.append(a.get_actor_label())
    spawned += spawn_window_backdrop(u, spawn, scene, world_cm, missing)
    spawned += spawn_window_garden(u, spawn, scene, world_cm, missing)
    dressed = spawn_dressing(u, spawn, scene, world_cm)
    return {"spawned": spawned + dressed["spawned"], "missing": missing + dressed["missing"]}


def window_garden_plan(room):
    """Return a deterministic CC0 garden composition behind each room window.

    Positions are room-local metres and use the opening's outward normal, so the composition works for
    windows on any wall. Two near shrubs add depth above the sill; a smaller distant tree frames the sky.
    """
    plan = []
    for index, opening in enumerate(o for o in room.get("openings", []) if o["type"] == "window"):
        (_, _), face, outward, along = _wall_axes(room, opening["wall"])
        center, width = float(opening["center"]), float(opening["width"])
        for item_index, (asset, offset, distance, size, yaw) in enumerate((
            ("shrub_01", -0.20, 1.2, 1.6, 28.0),
            ("shrub_01", 0.15, 1.8, 1.7, 146.0),
            ("tree_small_02", 0.05, 4.2, 4.2, -18.0),
        )):
            tangent = center + width * offset
            normal = face + outward * distance
            pos = [normal, tangent, 0.0] if along == "y" else [tangent, normal, 0.0]
            plan.append({"name": f"WINDOW_{index}_{asset}_{item_index}", "asset": asset,
                         "pos": pos, "size": size, "yaw": yaw})
    return plan


def room_lighting_profile(scene):
    """Stable, soft interior lighting defaults; values are engine units, not authored scene data."""
    room = scene.get("room")
    if not room:
        return None
    light = scene.get("light", {})
    base = max(0.0, float(light.get("intensity", 6.0)))
    fill = max(0.0, float(light.get("fill", 0.6)))
    return {
        "key_intensity": base * 900.0 * 0.30,
        "key_source_width_cm": 420.0,
        "key_source_height_cm": 320.0,
        "key_volumetric_scattering": 0.35,
        "fill_intensity": base * fill * 560.0,
        "fill_color": (0.80, 0.84, 0.90),
        "fill_radius_cm": 3000.0,
        "ceiling_bounce_intensity": base * fill * 900.0,
        "ceiling_bounce_width_cm": 480.0,
        "ceiling_bounce_height_cm": 360.0,
        "skylight_intensity": max(4.0, float(light.get("hdri_intensity", 0.8))),
        "vignette": 0.02,
        "grain": 0.0,
        "chromatic_aberration": 0.0,
    }


def apply_room_lighting(u, scene):
    """Apply the profile to this generated set's lights/PPV and fail if its contract is incomplete."""
    profile = room_lighting_profile(scene)
    if profile is None:
        return {"applied": False, "reason": "scene has no room"}
    room = scene["room"]
    sid = scene["id"]
    actors = {a.get_actor_label(): a for a in u.get_editor_subsystem(u.EditorActorSubsystem).get_all_level_actors()}
    required = {name: actors.get(f"{name}_{sid}") for name in ("KEY", "FILL", "HDRI", "GRADE")}
    missing = [name for name, actor in required.items() if actor is None]
    if missing:
        raise RuntimeError(f"Room lighting actors missing for {sid}: {', '.join(missing)}")

    key = required["KEY"].light_component
    key.set_mobility(u.ComponentMobility.MOVABLE)
    key.set_intensity(profile["key_intensity"])
    key.set_editor_property("source_width", profile["key_source_width_cm"])
    key.set_editor_property("source_height", profile["key_source_height_cm"])
    key.set_editor_property("volumetric_scattering_intensity", profile["key_volumetric_scattering"])

    fill = required["FILL"].light_component
    fill.set_mobility(u.ComponentMobility.MOVABLE)
    fill.set_intensity(profile["fill_intensity"])
    fill.set_editor_property("attenuation_radius", profile["fill_radius_cm"])
    fill.set_light_color(u.LinearColor(*profile["fill_color"], 1.0))
    fill.set_cast_shadows(False)

    sky = required["HDRI"].get_component_by_class(u.SkyLightComponent)
    sky.set_mobility(u.ComponentMobility.MOVABLE)
    sky.set_editor_property("intensity", profile["skylight_intensity"])
    sky.recapture_sky()

    bounce_label = f"CEILING_BOUNCE_{sid}"
    bounce = actors.get(bounce_label)
    if bounce is None:
        from textbook_scene_contract import world_cm
        location = world_cm(scene, [0.0, 0.0, 0.35])
        bounce = u.get_editor_subsystem(u.EditorActorSubsystem).spawn_actor_from_class(
            u.RectLight, u.Vector(*location), u.Rotator())
        if not bounce:
            raise RuntimeError(f"Could not spawn ceiling bounce light for {sid}")
        bounce.set_actor_label(bounce_label)
        tags = [str(tag) for tag in bounce.tags]
        tags.extend(tag for tag in ("textbook_generated", "set:" + sid, "room_shell", "environment:fill")
                    if tag not in tags)
        bounce.set_editor_property("tags", [u.Name(tag) for tag in tags])
    from textbook_scene_contract import world_cm
    bounce.set_actor_rotation(u.MathLibrary.find_look_at_rotation(
        bounce.get_actor_location(), u.Vector(*world_cm(scene, [0.0, 0.0, room["height"]]))), False)
    bounce_light = bounce.light_component
    bounce_light.set_mobility(u.ComponentMobility.MOVABLE)
    bounce_light.set_intensity(profile["ceiling_bounce_intensity"])
    bounce_light.set_editor_property("source_width", profile["ceiling_bounce_width_cm"])
    bounce_light.set_editor_property("source_height", profile["ceiling_bounce_height_cm"])
    bounce_light.set_editor_property("attenuation_radius", 900.0)
    bounce_light.set_light_color(u.LinearColor(0.90, 0.93, 1.0, 1.0))
    bounce_light.set_cast_shadows(False)

    settings = required["GRADE"].get_editor_property("settings")
    for name, value in (("vignette_intensity", profile["vignette"]),
                        ("film_grain_intensity", profile["grain"]),
                        ("scene_fringe_intensity", profile["chromatic_aberration"])):
        settings.set_editor_property("override_" + name, True)
        settings.set_editor_property(name, value)
    required["GRADE"].set_editor_property("settings", settings)
    return {"applied": True, **profile}


def spawn_window_garden(u, spawn, scene, world_cm, missing):
    """Place imported CC0 shrubs and a tree outside each window; the HDRI dome remains the far background."""
    import json
    from textbook_scene_contract import ROOT
    room, sid = scene["room"], scene["id"]
    mapping = json.loads((ROOT / "Content/Data/memory/kit_assets.json").read_text(encoding="utf-8"))
    assets = mapping.get("clutter_imported", {})
    labels = []
    for item in window_garden_plan(room):
        parts = model_parts(u, item["asset"], assets)
        if not parts:
            missing.append("window_garden:" + item["asset"])
            continue
        for part_index, mesh in enumerate(parts):
            bounds = mesh.get_bounds()
            extent = bounds.box_extent
            max_dimension = max(abs(float(extent.x)), abs(float(extent.y)), abs(float(extent.z))) * 2.0
            if max_dimension <= 0.0:
                missing.append("window_garden_degenerate:" + item["asset"])
                continue
            scale = item["size"] * 100.0 / max_dimension
            loc = world_cm(scene, item["pos"])
            loc[2] -= (float(bounds.origin.z) - float(extent.z)) * scale
            actor = spawn(u.StaticMeshActor, f"ROOM_{sid}_{item['name']}_{part_index}", loc,
                          ["set:" + sid, "layer:always", "room_shell", "clutter",
                           "environment:window_garden", "source:polyhaven_cc0", "kit:" + item["asset"]])
            component = actor.static_mesh_component
            component.set_mobility(u.ComponentMobility.STATIC)
            component.set_static_mesh(mesh)
            component.set_collision_enabled(u.CollisionEnabled.NO_COLLISION)
            component.set_editor_property("cast_shadow", False)
            # The tree mesh includes a translucent leaf section. Nanite drops that section on UE 5.8.
            # These small window-side meshes render more reliably with the component-level fallback.
            component.set_editor_property("disallow_nanite", True)
            actor.set_editor_property("tags", list(actor.tags) + [u.Name("render:non_nanite")])
            actor.set_actor_scale3d(u.Vector(scale, scale, scale))
            actor.set_actor_rotation(u.Rotator(yaw=item["yaw"]), False)
            labels.append(actor.get_actor_label())
    return labels


POLYHAVEN_MODELS = "/Game/PolyHaven/Models"


def model_parts(u, model_id, mapping):
    """The mesh(es) for a Poly Haven model. Prefer the mapped asset (kit_assets.json clutter_imported, or an
    explicit "parts" list): the StaticMeshes folder can hold the combined mesh *and* its parts, each part
    with its own pivot, so loading the whole folder scatters pieces (black lamp shades on the walls)."""
    mapped = mapping.get(model_id)
    if mapped:
        m = u.load_asset(mapped)
        return [m] if isinstance(m, u.StaticMesh) else []
    folder = f"{POLYHAVEN_MODELS}/{model_id}/{model_id}_2k/StaticMeshes"
    combined = f"{folder}/{model_id}_2k"
    if u.EditorAssetLibrary.does_asset_exist(combined):
        return [u.load_asset(combined)]
    paths = [p.split(".")[0] for p in u.EditorAssetLibrary.list_assets(folder, recursive=False)]
    return [m for m in (u.load_asset(p) for p in sorted(set(paths))) if isinstance(m, u.StaticMesh)][:1]


def spawn_dressing(u, spawn, scene, world_cm):
    """room["dressing"]: [{"id", "model", "pos", "yaw", "size", "mount"}] — real-size Poly Haven models.
    size = largest dimension in metres; pos z is the bottom (mount "floor"/"surface"), or the top when
    mount is "ceiling" (pos z ignored, set to the room height)."""
    room, sid = scene["room"], scene["id"]
    spawned, missing = [], []
    import json
    from textbook_scene_contract import ROOT
    mapping = json.loads((ROOT / "Content/Data/memory/kit_assets.json").read_text(encoding="utf-8")).get("clutter_imported", {})
    for item in room.get("dressing", []):
        parts = model_parts(u, item["model"], mapping) if "parts" not in item else \
            [u.load_asset(p) for p in item["parts"]]
        if not parts:
            missing.append(item["model"])
            continue
        lo = [min(float(getattr(m.get_bounds().origin, k) - getattr(m.get_bounds().box_extent, k)) for m in parts) for k in "xyz"]
        hi = [max(float(getattr(m.get_bounds().origin, k) + getattr(m.get_bounds().box_extent, k)) for m in parts) for k in "xyz"]
        scale = item["size"] * 100.0 / max(max(h - l for l, h in zip(lo, hi)), 1e-3)
        x, y, z = item["pos"]
        if item.get("mount") == "ceiling":
            loc = world_cm(scene, [x, y, room["height"]])
            loc[2] -= hi[2] * scale
        else:
            loc = world_cm(scene, [x, y, z])
            loc[2] -= lo[2] * scale
        for i, m in enumerate(parts):
            a = spawn(u.StaticMeshActor, f"ROOM_{sid}_{item['id']}_{i}", loc,
                      ["set:" + sid, "layer:always", "room_dressing", "kit:" + item["model"]]
                      + (["interactive:pickup"] if item.get("pickup") else []))
            c = a.static_mesh_component
            c.set_mobility(u.ComponentMobility.MOVABLE)
            c.set_static_mesh(m)
            a.set_actor_scale3d(u.Vector(scale, scale, scale))
            a.set_actor_rotation(u.Rotator(yaw=item.get("yaw", 0.0)), False)
            spawned.append(a.get_actor_label())
    return {"spawned": spawned, "missing": missing}
