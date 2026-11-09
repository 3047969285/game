"""Claude · lead characters v2 (Docs/qa/leads-likeness-v2.md).

v1 dragged the MetaHuman mesh onto 2D photo landmarks and broke the 3D structure. v2 stays inside
the MetaHuman face model: blend the coefficients of Epic's presets, then dress (skin, eyes, makeup,
grooms) from the reference sheets.

  CHARV2_MODE=survey   render every preset (front + q34) and dump its face-model coefficients to
                       Saved/CharV2/survey/ so the blend weights can be chosen against the sheets
  CHARV2_MODE=build    CHARV2_ID=me2026 — create /Game/Characters/<id>_v2/MHC_<id>_v2 from the
                       blend in Saved/CharV2/<id>_blend.json, then skin / eyes / makeup / grooms

  UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$UE" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/char_v2.py" -RenderOffscreen -unattended -nosplash -nosound
($UE is the real engine binary under /Volumes/Games; the /Users/Shared alias breaks the project path.)
"""
import json
import os
import shutil
import time
import traceback
from pathlib import Path

import unreal

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Saved/CharV2"
PRESETS = "/MetaHumanCharacter/Optional/Presets"
GROOMS = "/MetaHumanCharacter/Optional/Grooms/Bindings"
MODE = os.environ.get("CHARV2_MODE", "survey")


def log(m):
    unreal.log_warning(f"[char_v2] {m}")


def preset_names():
    # The asset registry is still scanning plugin content at startup (it returned only "Ada"),
    # so list the plugin folder on disk.
    folder = Path(unreal.Paths.convert_relative_path_to_full(unreal.Paths.engine_plugins_dir())) / \
        "MetaHuman/MetaHumanCharacter/Content/Optional/Presets"
    return sorted(p.stem for p in folder.glob("*.uasset"))


def coefficients(mh, character):
    res = mh.get_face_model_coefficients(character)
    if isinstance(res, tuple):
        res = res[-1] if len(res) else []
    return [float(x) for x in res]


def head_center(actor, fallback):
    for comp in actor.get_components_by_class(unreal.SkeletalMeshComponent):
        if comp.get_bone_index("FACIAL_L_Eye") >= 0:
            eye = comp.get_socket_location("FACIAL_L_Eye")
            return unreal.Vector(0, eye.y, eye.z - 3)
    return fallback


# ---------------------------------------------------------------- build helpers

def blend_into(mh, character, blend):
    """blend = {"Aoi": 0.6, "Bo": 0.4, ...}; weights are renormalised."""
    total = sum(blend.values())
    acc = None
    for name, w in blend.items():
        src = unreal.load_asset(f"{PRESETS}/{name}")
        if not mh.try_add_object_to_edit(src):
            raise RuntimeError("cannot edit preset " + name)
        try:
            c = coefficients(mh, src)
        finally:
            mh.remove_object_to_edit(src)
        acc = [w / total * x for x in c] if acc is None else [a + w / total * x for a, x in zip(acc, c)]
    mh.set_face_model_coefficients(character, acc)
    mh.commit_face_state(character)


def wardrobe(character, slot, binding):
    item = unreal.load_asset(binding if binding.startswith("/") else f"{GROOMS}/{binding}")   # full path: outfits
    if item is None:
        raise RuntimeError("missing wardrobe item " + binding)
    key = character.internal_collection.try_add_item_from_wardrobe_item(slot, item)
    # replace whatever the base preset had in this slot (Kelvin's buzz cut survived try_add_slot_selection)
    character.internal_collection.default_instance.set_single_slot_selection(slot, key)
    return key


def clear_slots(character, slots):
    """Drop the base preset's facial hair etc. — an empty key leaves the slot unselected."""
    for slot in slots:
        try:
            character.internal_collection.default_instance.set_single_slot_selection(slot, unreal.MetaHumanPaletteItemKey())
            log(f"cleared slot {slot}")
        except Exception as e:  # noqa: BLE001 — a slot the pipeline does not have
            log(f"slot {slot} not cleared: {e}")


def set_groom_params(mh, character, key, params):
    mh.assemble_for_preview(character=character) if hasattr(mh, "assemble_for_preview") else None
    path = unreal.MetaHumanPaletteItemPath(item_key=key)
    found = character.internal_collection.default_instance.get_instance_parameters(item_path=path)
    log("groom params available: " + ", ".join(str(p.name) for p in found))
    for p in found:
        if p.name in params:
            v = params[p.name]
            p.set_color(unreal.LinearColor(*v)) if isinstance(v, (list, tuple)) else p.set_float(value=float(v))


def build(mh, cid):
    spec = json.loads((OUT / f"{cid}_blend.json").read_text())
    dest = f"/Game/Characters/{cid}" if spec.get("cast") else f"/Game/Characters/{cid}_v2"   # cast: story NPCs
    name = f"MHC_{cid}" if spec.get("cast") else f"MHC_{cid}_v2"
    path = f"{dest}/{name}"
    base = spec.get("base") or next(iter(spec["face_blend"]))      # body, teeth and defaults come from it
    if unreal.EditorAssetLibrary.does_asset_exist(path):
        unreal.EditorAssetLibrary.delete_asset(path)
    character = unreal.EditorAssetLibrary.duplicate_asset(f"{PRESETS}/{base}", path)   # body, teeth, defaults
    if character is None:
        raise RuntimeError("duplicate failed " + path)
    if not mh.try_add_object_to_edit(character):
        raise RuntimeError("cannot edit " + path)
    try:
        blend_into(mh, character, spec["face_blend"])
        log(f"{cid}: face blend {spec['face_blend']}")
        if spec.get("sculpt"):
            pts = [[float(v.x), float(v.y), float(v.z)] for v in mh.get_face_landmarks(character=character)]
            sculpt(mh, character, spec["sculpt"], pts)

        # Skin starts from a preset whose tone matches the sheet ("skin_from"); accents are given as
        # offsets from MetaHuman's neutral 0.5 — absolute values near 0 darken the region (that was the
        # brown cheek/nose patches in v1 and in the first v2 build).
        sk = spec["skin"]
        if sk.get("skin_from"):
            donor = unreal.load_asset(f"{PRESETS}/{sk['skin_from']}")
            settings = donor.get_editor_property("skin_settings")
            log(f"{cid}: skin from {sk['skin_from']} u={settings.skin.u:.3f} v={settings.skin.v:.3f}")
        else:
            settings = character.get_editor_property("skin_settings")
        sp = settings.skin
        if "u" in sk:                          # absolute tone (copied preset tones rendered too dark once assembled)
            sp.u, sp.v = sk["u"], sk["v"]
        sp.u += sk.get("du", 0.0)
        sp.v += sk.get("dv", 0.0)
        sp.roughness = sk.get("roughness", sp.roughness)
        sp.show_top_underwear = True
        acc = settings.accents
        for region, (d_red, d_light, d_sat) in sk.get("accent_offsets", {}).items():
            a = getattr(acc, region)
            a.redness = min(1.0, max(0.0, 0.5 + d_red))
            a.lightness = min(1.0, max(0.0, 0.5 + d_light))
            a.saturation = min(1.0, max(0.0, 0.5 + d_sat))
            setattr(acc, region, a)
        settings.skin, settings.accents = sp, acc
        settings.freckles.density = 0.0
        settings.freckles.strength = 0.0
        settings.enable_texture_overrides = False
        character.preview_material_type = unreal.MetaHumanCharacterSkinPreviewMaterial.EDITABLE
        mh.commit_skin_settings(character, settings)

        ey = spec.get("eyes")                 # omitted: keep the base preset's (brown) eyes
        if ey:
            eyes = character.eyes_settings
            for side in (eyes.eye_left, eyes.eye_right):
                if "iris_uv" in ey:
                    side.iris.primary_color_u, side.iris.primary_color_v = ey["iris_uv"]
                    side.iris.secondary_color_u, side.iris.secondary_color_v = ey["iris_uv2"]
                side.iris.limbal_ring_size = ey.get("limbal_ring_size", side.iris.limbal_ring_size)
            mh.commit_eyes_settings(character, eyes)

        mk = spec.get("makeup")
        if mk:
            m = unreal.MetaHumanCharacterMakeupSettings()
            if "lips" in mk:
                m.lips.type = getattr(unreal.MetaHumanCharacterLipsMakeupType, mk["lips"]["type"])
                m.lips.color = unreal.LinearColor(*mk["lips"]["color"])
                m.lips.opacity, m.lips.roughness = mk["lips"]["opacity"], mk["lips"]["roughness"]
            if "blush" in mk:
                m.blush.type = getattr(unreal.MetaHumanCharacterBlushMakeupType, mk["blush"]["type"])
                m.blush.color = unreal.LinearColor(*mk["blush"]["color"])
                m.blush.intensity = mk["blush"]["intensity"]
            if "eyes" in mk:
                m.eyes.type = getattr(unreal.MetaHumanCharacterEyeMakeupType, mk["eyes"]["type"])
                m.eyes.primary_color = unreal.LinearColor(*mk["eyes"]["color"])
                m.eyes.opacity = mk["eyes"]["opacity"]
            mh.commit_makeup_settings(character, m)

        clear_slots(character, spec.get("clear_slots", ["Beard", "Mustache", "Peachfuzz"]))
        for slot, g in spec["grooms"].items():
            key = wardrobe(character, slot, g["binding"])
            if g.get("params"):
                set_groom_params(mh, character, key, g["params"])
        unreal.EditorAssetLibrary.save_asset(path, only_if_is_dirty=False)
        log(f"{cid}: BUILD DONE {path}")
    finally:
        if mh.is_object_added_for_editing(character):
            mh.remove_object_to_edit(character)


GROOM_ASSETS = "/MetaHumanCharacter/Optional/Grooms/GroomAssets"


def attach_grooms(rig, actor, asset_path):
    """Review renders: bind the spec's grooms straight onto the preview actor with Codex's lookdev rig.
    assemble_for_preview (the Creator's own preview pipeline) dies without a trace in a headless editor
    while synthesising textures, so grooms are attached here instead. Hair colour goes on the groom
    material instances (Melanin / Redness parameters of the MetaHuman hair material)."""
    cid = asset_path.rsplit("/", 1)[-1].replace("MHC_", "").removesuffix("_v2")
    spec_path = OUT / f"{cid}_blend.json"
    if not spec_path.exists():
        return
    for slot, g in json.loads(spec_path.read_text()).get("grooms", {}).items():
        if g["binding"].startswith("/"):
            continue                                     # outfits are not grooms
        kind, item = g["binding"].split("/")
        name = item.removeprefix("WI_")
        groom = unreal.load_asset(f"{GROOM_ASSETS}/{kind}/{name}/{name}")
        if groom is None or not rig.attach_preview_groom(actor, groom, True):
            raise RuntimeError(f"cannot attach groom {kind}/{name}")
        log(f"groom {slot}: {kind}/{name}")
    params = {k: v for g in json.loads(spec_path.read_text()).get("grooms", {}).values()
              if not g["binding"].startswith("/")
              for k, v in [("_" + g["binding"].split("/")[0], g.get("params", {}))]}
    for comp in actor.get_components_by_class(unreal.GroomComponent):
        asset = comp.get_editor_property("groom_asset")
        kind = next((k[1:] for k in params if asset and f"/{k[1:]}/" in asset.get_path_name()), None)
        for i in range(comp.get_num_materials()):
            mid = comp.create_dynamic_material_instance(i)
            for pname, value in (params.get("_" + kind, {}) if kind else {}).items():
                mid.set_scalar_parameter_value(pname, float(value))


# ---------------------------------------------------------------- survey (needs ticking for capture)

def survey(mh):
    unreal.EditorPythonScripting.set_keep_python_script_alive(True)
    (OUT / "survey").mkdir(parents=True, exist_ok=True)
    # A few presets per editor launch: MetaHuman previews hold several GB each and a long run gets
    # killed on this 16 GB machine. Finished presets are skipped, so relaunch until "SURVEY COMPLETE".
    todo = [n for n in preset_names() if not (OUT / f"survey/{n}.coeffs.json").exists()
            and (not os.environ.get("CHARV2_ONLY") or n in os.environ["CHARV2_ONLY"].split(","))]
    names = todo[:int(os.environ.get("CHARV2_BATCH", "3"))]
    # CHARV2_RENDER="/Game/Characters/me2026_v2/MHC_me2026_v2,..." renders built characters for review
    render = [p for p in os.environ.get("CHARV2_RENDER", "").split(",") if p]
    if render:
        names = render
    views = (0, 1, 2, 4) if render else (0, 1)          # rig order: front, q34, side, back, closeup
    dest = OUT / ("renders" if render else "survey")
    dest.mkdir(parents=True, exist_ok=True)
    if not todo and not render:
        log("SURVEY COMPLETE")
    les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    les.load_level("/Game/Maps/L_CharacterLookdev")
    eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    rig = next(a for a in eas.get_all_level_actors() if a.get_actor_label() == "WQ_Lookdev_RefCameraRig")
    rig.set_editor_property("character_height_cm", 175.0)
    st = {"i": -1, "actor": None, "char": None, "view": 0, "frame": 0, "t": time.monotonic()}

    def next_preset():
        if st["actor"] is not None:
            eas.destroy_actor(st["actor"])
            if st["char"] is not None:
                mh.remove_object_to_edit(st["char"])
            unreal.SystemLibrary.collect_garbage()
            st["char"] = st["actor"] = None
        st["i"] += 1
        if st["i"] >= len(names):
            return False
        name = names[st["i"]]
        if "/BP_" in name:                     # assembled MetaHuman Blueprint: final skin, grooms and outfit
            cls = unreal.load_class(None, name + "_C" if "." in name else f"{name}.{name.rsplit('/', 1)[-1]}_C")
            a = eas.spawn_actor_from_class(cls, unreal.Vector(0, 0, 0))
            st["actor"], st["char"], st["coeffs"] = a, None, []
            rig.set_editor_property("head_center_cm", head_center(a, unreal.Vector(0, 0, 160)))
            rig.configure_views()
            for comp in rig.get_editor_property("views"):
                pp = comp.get_editor_property("post_process_settings")
                pp.set_editor_property("auto_exposure_bias", -9.5)
                comp.set_editor_property("post_process_settings", pp)
            st["view"], st["frame"], st["t"] = 0, 0, time.monotonic()
            return True
        c = unreal.load_asset(name if name.startswith("/") else f"{PRESETS}/{name}")
        if not mh.try_add_object_to_edit(c):
            raise RuntimeError("cannot edit preset " + name)
        st["char"] = c
        st["coeffs"] = coefficients(mh, c)

        a = mh.spawn_meta_human_actor(c, True)
        a.set_actor_location(unreal.Vector(), False, False)
        st["actor"] = a
        if render and os.environ.get("CHARV2_NOGROOM") != "1":     # shape reviews skip the (headless-unreliable) grooms
            attach_grooms(rig, a, name)
        rig.set_editor_property("head_center_cm", head_center(a, unreal.Vector(0, 0, 160)))
        rig.configure_views()
        for comp in rig.get_editor_property("views"):
            pp = comp.get_editor_property("post_process_settings")
            pp.set_editor_property("auto_exposure_bias", -9.5)
            comp.set_editor_property("post_process_settings", pp)
        st["view"], st["frame"], st["t"] = 0, 0, time.monotonic()
        return True

    def finish(code):
        unreal.unregister_slate_post_tick_callback(handle)
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(code)

    def tick(dt):
        try:
            if st["actor"] is None and not next_preset():
                log("SURVEY DONE")
                finish(0)
            if rig.get_editor_property("pending_groom_bindings"):
                if time.monotonic() - st["t"] > 300:
                    raise RuntimeError("groom binding timeout")
                return
            if rig.get_editor_property("failed_groom_bindings"):
                raise RuntimeError("groom binding failed")
            rig.warm_view(views[st["view"]])
            st["frame"] += 1
            if st["frame"] < 48 or time.monotonic() - st["t"] < 5:
                return
            name = names[st["i"]].rsplit("/", 1)[-1].replace("MHC_", "").replace("BP_", "bp_")
            index = views[st["view"]]
            if not rig.export_run_view(index, "preset_" + name.replace("-", "_"), "survey"):
                raise RuntimeError("export failed " + name)
            view = ("front", "q34", "side", "back", "closeup")[index]
            src = ROOT / f"Saved/CompareRuns/preset_{name.replace('-', '_')}/survey/{view}.png"
            if src.exists():
                shutil.copy2(src, dest / f"{name}_{view}.png")
            st["view"] += 1
            st["frame"], st["t"] = 0, time.monotonic()
            if st["view"] == len(views):
                if not render:
                    (OUT / f"survey/{name}.coeffs.json").write_text(json.dumps(st["coeffs"]))   # marks it done
                log(f"surveyed {name}")
                next_preset()
        except Exception:  # noqa: BLE001
            (OUT / "survey/error.txt").write_text(names[st["i"]] + "\n" + traceback.format_exc())
            finish(1)

    handle = unreal.register_slate_post_tick_callback(tick)


def tracking_points(tp):
    """unreal.TrackingPoints wraps the 2D point array; its property name is not documented, so take
    the first array property whose items have x and y."""
    for attr in dir(tp):
        if attr.startswith("_"):
            continue
        try:
            v = tp.get_editor_property(attr)
        except Exception:  # noqa: BLE001 - methods and non-properties
            continue
        if hasattr(v, "__len__") and len(v) and hasattr(v[0], "x") and hasattr(v[0], "y"):
            return v
    raise RuntimeError("no point array in TrackingPoints: " + ", ".join(a for a in dir(tp) if not a.startswith("_")))


def track(mh):
    """Face contours (MetaHuman's own tracker) for the reference views and every survey render, so the
    blend weights can be solved numerically (Tools/char_v2_solve.py) instead of picked by eye."""
    heads = Path.home() / ".local/share/hunyuan3d/work/headviews"
    images = {f"ref_{p.stem}": p for p in sorted(heads.glob("*_front.png")) + sorted(heads.glob("*_q34.png"))}
    images.update({p.stem: p for p in sorted((OUT / "survey").glob("*_*.png"))})
    out = {}
    for key, path in images.items():
        size, pixels = unreal.PromotedFrameUtils.get_promoted_frame_as_pixel_array_from_disk(str(path))
        res = mh.track_face_landmarks_from_image(pixels, size.x, size.y)
        if isinstance(res, tuple) and len(res) == 1:
            res = res[0]
        curves = {}
        for name in (res.keys() if res else []):
            curves[str(name)] = [[float(p.x), float(p.y)] for p in tracking_points(res[name])]
        out[key] = {"size": [size.x, size.y], "curves": curves}
        log(f"tracked {key}: {len(curves)} curves")
    (OUT / "landmarks.json").write_text(json.dumps(out))


def dump_landmarks(mh, cid):
    """CHARV2_MODE=landmarks: the face sculpt landmarks (cm, character space) for designing sculpt rules."""
    path = f"/Game/Characters/{cid}_v2/MHC_{cid}_v2"
    c = unreal.load_asset(path)
    if not mh.try_add_object_to_edit(c):
        raise RuntimeError("cannot edit " + path)
    try:
        pts = [[float(v.x), float(v.y), float(v.z)] for v in mh.get_face_landmarks(character=c)]
    finally:
        mh.remove_object_to_edit(c)
    (OUT / f"{cid}_landmarks.json").write_text(json.dumps(pts))
    log(f"{cid}: {len(pts)} landmarks")


def sculpt(mh, character, rules, pts):
    """Symmetric landmark sculpt. Each rule selects landmarks by region (axis-aligned box in the face's
    own frame: x = lateral, z = up, y = depth, all relative to the landmark centroid and scaled by face
    width) and moves them: "scale_x" pulls toward/away from the midline, "dz"/"dy" shift in cm, and
    "scale" expands about the selection's own centre (eyes). Left/right pairs get mirrored deltas."""
    import statistics
    cx = statistics.mean(p[0] for p in pts)
    cy = statistics.mean(p[1] for p in pts)
    cz = statistics.mean(p[2] for p in pts)
    width = max(p[0] for p in pts) - min(p[0] for p in pts)
    deltas = {}
    for r in rules:
        if "indices" in r:                               # explicit landmark ids (Saved/CharV2/*_landmarks.json map)
            sel = [i for i in r["indices"] if i < len(pts)]
        else:
            box = r["box"]                               # [[xmin,xmax],[ymin,ymax],[zmin,zmax]] in widths
            sel = [i for i, (x, y, z) in enumerate(pts)
                   if box[0][0] <= abs(x - cx) / width <= box[0][1]
                   and box[1][0] <= (y - cy) / width <= box[1][1]
                   and box[2][0] <= (z - cz) / width <= box[2][1]]
        if not sel:
            continue
        for side in (-1, 1):
            group = [i for i in sel if (pts[i][0] - cx) * side > 0 or (side > 0 and abs(pts[i][0] - cx) < 1e-3)]
            if not group:
                continue
            gx = statistics.mean(pts[i][0] for i in group)
            gy = statistics.mean(pts[i][1] for i in group)
            gz = statistics.mean(pts[i][2] for i in group)
            for i in group:
                x, y, z = pts[i]
                d = deltas.setdefault(i, [0.0, 0.0, 0.0])
                d[0] += (x - cx) * (r.get("scale_x", 1.0) - 1.0)
                d[1] += r.get("dy", 0.0)
                d[2] += r.get("dz", 0.0)
                k = r.get("scale", 1.0) - 1.0
                d[0] += (x - gx) * k
                d[1] += (y - gy) * k
                d[2] += (z - gz) * k
        log(f"sculpt {r.get('name')}: {len(sel)} landmarks")
    if deltas:
        idx = sorted(deltas)
        mh.translate_face_landmarks(character=character, landmark_indices=idx,
                                    deltas=[unreal.Vector(*deltas[i]) for i in idx])
        mh.commit_face_state(character=character)


mh_sub = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
if MODE == "survey":
    survey(mh_sub)
elif MODE == "landmarks":
    try:
        OUT.mkdir(parents=True, exist_ok=True)
        for cid in os.environ["CHARV2_ID"].split(","):
            dump_landmarks(mh_sub, cid)
    except Exception:  # noqa: BLE001
        (OUT / "landmarks-error.txt").write_text(traceback.format_exc())
    finally:
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
elif MODE == "track":
    try:
        track(mh_sub)
    except Exception:  # noqa: BLE001
        (OUT / "track-error.txt").write_text(traceback.format_exc())
    finally:
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
else:
    try:
        OUT.mkdir(parents=True, exist_ok=True)
        for cid in os.environ["CHARV2_ID"].split(","):
            build(mh_sub, cid)
    except Exception:  # noqa: BLE001
        (OUT / f"build-{os.environ.get('CHARV2_ID')}-error.txt").write_text(traceback.format_exc())
    finally:
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
