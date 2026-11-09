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
GLASS = "/Game/Fab/Materials/Standard/M_MS_Glass"   # translucent; the hero-prop glass MI is an opaque bake
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
            add(f"WINDOW_{k}_glass", pos, size, "GLASS", tag + ["glass"])
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
            cache[path] = u.load_asset(path) if u.EditorAssetLibrary.does_asset_exist(path) else None
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
        a.set_actor_scale3d(u.Vector(*scale))
        m = material(b["material"])
        if m:
            c.set_material(0, m)
        spawned.append(a.get_actor_label())
    spawned += spawn_window_views(u, spawn, scene, world_cm, mesh, ext, pivot, missing)
    dressed = spawn_dressing(u, spawn, scene, world_cm)
    return {"spawned": spawned + dressed["spawned"], "missing": missing + dressed["missing"]}


VIEW_DISTANCE = 3.0      # metres outside the wall: close enough that the level's memory-void fog barely tints it


def spawn_window_views(u, spawn, scene, world_cm, mesh, ext, pivot, missing):
    """A panel of the room's exterior HDRI outside every window. The sky material samples the cubemap by view
    direction, so the panel reads as an infinitely distant garden, while sitting a few metres away keeps the
    level-wide MEMORY_VOID_FOG from turning it into a night sky (the 11-02 review)."""
    import json
    from textbook_scene_contract import ROOT
    from textbook_environment import hdri_material
    room, sid = scene["room"], scene["id"]
    hdri_id = room.get("exterior_hdri")
    if not hdri_id:
        return []
    mapping = json.loads((ROOT / "Content/Data/memory/kit_assets.json").read_text(encoding="utf-8"))
    path = mapping.get("hdris_imported", {}).get(hdri_id)
    cube = u.load_asset(path) if path and u.EditorAssetLibrary.does_asset_exist(path) else None
    if cube is None:
        missing.append("hdri:" + str(hdri_id))
        return []
    mat = hdri_material(u, cube)
    labels = []
    for k, o in enumerate(op for op in room.get("openings", []) if op["type"] == "window"):
        (a0, a1), face, out, along = _wall_axes(room, o["wall"])
        width, height = o["width"] + 2 * VIEW_DISTANCE * 1.6, room["height"] + 2 * VIEW_DISTANCE
        n = face + out * VIEW_DISTANCE
        c = o["center"]
        pos = [n, c, room["height"] / 2] if along == "y" else [c, n, room["height"] / 2]
        size = [0.02, width, height] if along == "y" else [width, 0.02, height]
        scale = [size[i] * 100.0 / max(ext[i], 1e-3) for i in range(3)]
        loc = world_cm(scene, pos)
        loc = [loc[i] - pivot[i] * scale[i] for i in range(3)]
        a = spawn(u.StaticMeshActor, f"ROOM_{sid}_WINDOW_{k}_view", loc,
                  ["set:" + sid, "layer:always", "room_shell", "environment:window_view"])
        cmp = a.static_mesh_component
        cmp.set_static_mesh(mesh)
        a.set_actor_scale3d(u.Vector(*scale))
        cmp.set_material(0, mat)
        cmp.set_editor_property("cast_shadow", False)
        cmp.set_collision_enabled(u.CollisionEnabled.NO_COLLISION)
        labels.append(a.get_actor_label())
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
