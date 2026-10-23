#!/usr/bin/env python3
"""Import the checked-in Poly Haven CC0 library and map usable assets in UE.

Run from the project root: python3 Tools/import_polyhaven.py
The CLI starts the full editor through run_ue_serial.sh (no commandlet/nullrhi).
"""
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "SourceArt/PolyHaven/MANIFEST.json"
MAP_PATH = ROOT / "Content/Data/memory/kit_assets.json"
OUTPUT = ROOT / "Saved/Textbook/polyhaven-import.json"


def pbr_graph_spec():
    """Pure description of the surface graph, shared by import, repair and tests."""
    return {
        "samples": {
            "BaseColor": {"sampler": "SAMPLERTYPE_COLOR", "default": "/Engine/EngineMaterials/DefaultDiffuse"},
            "Normal": {"sampler": "SAMPLERTYPE_NORMAL", "default": "/Engine/EngineMaterials/DefaultNormal"},
            "ARM": {"sampler": "SAMPLERTYPE_MASKS", "default": "/Engine/EngineMaterials/DefaultDiffuse_TC_Masks"},
        },
        "outputs": {
            "BaseColor": ("BaseColor", "RGB"),
            "Normal": ("Normal", "RGB"),
            "AmbientOcclusion": ("ARM", "R"),
            "Roughness": ("ARM", "G"),
            "Metallic": ("ARM", "B"),
        },
        "metallic_scale_default": 0.0,
        "metallic_scale_instance": 1.0,
    }


def ensure_material_parent(u):
    """Rebuild a predictable PBR parent graph instead of trusting stale expressions."""
    path = "/Game/PolyHaven/Materials/M_PH_PBR"
    material = u.load_asset(path)
    if not material:
        u.EditorAssetLibrary.make_directory("/Game/PolyHaven/Materials")
        tools = u.AssetToolsHelpers.get_asset_tools()
        material = tools.create_asset("M_PH_PBR", "/Game/PolyHaven/Materials", u.Material, u.MaterialFactoryNew())

    graph = pbr_graph_spec()
    u.MaterialEditingLibrary.delete_all_material_expressions(material)
    material.set_editor_property("blend_mode", u.BlendMode.BLEND_OPAQUE)

    def enum_value(enum_class, candidates):
        enum = getattr(u, enum_class)
        for name in candidates:
            value = getattr(enum, name, None)
            if value is not None:
                return value
        raise RuntimeError(f"UE Python API is missing {enum_class} value from {candidates}")

    sampler_names = {
        "SAMPLERTYPE_COLOR": ("SAMPLERTYPE_COLOR", "SAMPLERTYPE_Color"),
        "SAMPLERTYPE_NORMAL": ("SAMPLERTYPE_NORMAL", "SAMPLERTYPE_Normal"),
        "SAMPLERTYPE_MASKS": ("SAMPLERTYPE_MASKS", "SAMPLERTYPE_Masks"),
    }
    samples = {}
    for index, (parameter, settings) in enumerate(graph["samples"].items()):
        texture = u.load_asset(settings["default"])
        if not texture:
            raise RuntimeError("Required engine texture is missing: " + settings["default"])
        sample = u.MaterialEditingLibrary.create_material_expression(
            material, u.MaterialExpressionTextureSampleParameter2D, -500, index * 220
        )
        sample.set_editor_property("parameter_name", parameter)
        sample.set_editor_property("sampler_type", enum_value("MaterialSamplerType", sampler_names[settings["sampler"]]))
        sample.set_editor_property("texture", texture)
        samples[parameter] = sample

    output_properties = {
        "BaseColor": u.MaterialProperty.MP_BASE_COLOR,
        "Normal": u.MaterialProperty.MP_NORMAL,
        "AmbientOcclusion": u.MaterialProperty.MP_AMBIENT_OCCLUSION,
        "Roughness": u.MaterialProperty.MP_ROUGHNESS,
        "Metallic": u.MaterialProperty.MP_METALLIC,
    }
    metallic_scale = u.MaterialEditingLibrary.create_material_expression(
        material, u.MaterialExpressionScalarParameter, 0, 440
    )
    metallic_scale.set_editor_property("parameter_name", "MetallicScale")
    metallic_scale.set_editor_property("default_value", graph["metallic_scale_default"])
    metallic = u.MaterialEditingLibrary.create_material_expression(material, u.MaterialExpressionMultiply, 220, 440)
    if not u.MaterialEditingLibrary.connect_material_expressions(samples["ARM"], "B", metallic, "A"):
        raise RuntimeError("Could not connect ARM.B to metallic scale")
    if not u.MaterialEditingLibrary.connect_material_expressions(metallic_scale, "", metallic, "B"):
        raise RuntimeError("Could not connect MetallicScale")

    for output, (parameter, channel) in graph["outputs"].items():
        expression = metallic if output == "Metallic" else samples[parameter]
        channel = "" if output == "Metallic" else channel
        if not u.MaterialEditingLibrary.connect_material_property(expression, channel, output_properties[output]):
            raise RuntimeError(f"Could not connect material output {output}")

    u.MaterialEditingLibrary.recompile_material(material)
    u.EditorAssetLibrary.save_loaded_asset(material)
    return material


def source_path(item):
    path = ROOT / item["path"]
    if item["type"] == "hdris":
        return path if path.is_file() else None
    if not path.is_dir():
        return None
    preferred = sorted(path.glob("*_2k.gltf")) + sorted(path.glob("*_2k.fbx"))
    if item["type"] == "models":
        return preferred[0] if preferred else None
    return path


def validate_manifest():
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    valid_types = {"models", "textures", "hdris"}
    for name, item in manifest.items():
        if item.get("type") not in valid_types:
            raise ValueError(f"Unsupported Poly Haven asset type for {name}: {item.get('type')}")
    missing = [name for name, item in manifest.items() if source_path(item) is None]
    if missing:
        raise FileNotFoundError("Missing Poly Haven source files: " + ", ".join(missing))
    return manifest


def validate_asset_mapping(manifest=None):
    manifest = manifest or validate_manifest()
    data = json.loads(MAP_PATH.read_text(encoding="utf-8"))
    ids_by_type = {
        kind: {name for name, item in manifest.items() if item["type"] == kind}
        for kind in ("models", "textures", "hdris")
    }
    errors = []
    for kit, spec in data.get("kits", {}).items():
        if spec.get("source") == "polyhaven" and spec.get("polyhaven") not in ids_by_type["models"]:
            errors.append(f"kit {kit}: unknown model id {spec.get('polyhaven')}")
    clutter = data.get("clutter_polyhaven", [])
    clutter_ids = clutter.values() if isinstance(clutter, dict) else clutter
    for asset_id in clutter_ids:
        if asset_id not in ids_by_type["models"]:
            errors.append(f"clutter: unknown model id {asset_id}")
    for role, asset_id in data.get("textures_polyhaven", {}).items():
        if asset_id not in ids_by_type["textures"]:
            errors.append(f"texture role {role}: unknown texture id {asset_id}")
    for role, asset_id in data.get("hdris_polyhaven", {}).items():
        if asset_id not in ids_by_type["hdris"]:
            errors.append(f"HDRI role {role}: unknown HDRI id {asset_id}")
    if errors:
        raise ValueError("Invalid kit_assets.json references:\n- " + "\n- ".join(errors))
    return {kind: len(ids) for kind, ids in ids_by_type.items()}


def editor_main(u):
    manifest = validate_manifest()
    counts = validate_asset_mapping(manifest)
    interchange_enabled = int(u.SystemLibrary.get_console_variable_int_value("Interchange.FeatureFlags.Import.Enable"))
    if interchange_enabled != 1:
        raise RuntimeError("Interchange import is disabled; enable Interchange.FeatureFlags.Import.Enable=1 before import")
    asset_tools = u.AssetToolsHelpers.get_asset_tools()
    mesh_editor = u.get_editor_subsystem(u.StaticMeshEditorSubsystem)
    report = {"source": "SourceArt/PolyHaven/MANIFEST.json", "license": "CC0", "items": {}, "warnings": [], "errors": []}
    meshes_by_id = {}
    imported_textures = {}

    def log(message):
        u.log("[PolyHaven] " + str(message))

    log(f"Interchange enabled; manifest counts={counts}")

    def import_task(source, destination, options=None):
        task = u.AssetImportTask()
        task.set_editor_property("filename", str(source))
        task.set_editor_property("destination_path", destination)
        task.set_editor_property("automated", True)
        task.set_editor_property("save", True)
        task.set_editor_property("replace_existing", True)
        if options is not None:
            task.set_editor_property("options", options)
        asset_tools.import_asset_tasks([task])
        paths = list(task.get_editor_property("imported_object_paths") or [])
        return [str(path) for path in paths]

    def set_nanite(mesh):
        path = mesh.get_path_name()
        material_slots = mesh.get_editor_property("static_materials")
        transparent = False
        for slot in material_slots:
            material = slot.get_editor_property("material_interface")
            if material and material.get_blend_mode() == u.BlendMode.BLEND_TRANSLUCENT:
                transparent = True
                break
        settings = mesh_editor.get_nanite_settings(mesh)
        settings.set_editor_property("enabled", not transparent)
        mesh_editor.set_nanite_settings(mesh, settings, True)
        u.EditorAssetLibrary.save_loaded_asset(mesh)
        return "skipped_translucent_material" if transparent else "enabled"

    def find_imported(kind, name, paths):
        assets = []
        for path in paths:
            asset = u.load_asset(path)
            if asset:
                assets.append(asset)
        if not assets:
            folder = "/Game/PolyHaven/" + kind + "/" + name
            for path in u.EditorAssetLibrary.list_assets(folder, recursive=True, include_folder=False):
                asset = u.load_asset(path)
                if asset:
                    assets.append(asset)
        return assets

    def choose_mesh(assets):
        candidates = [asset for asset in assets if isinstance(asset, u.StaticMesh)]
        if not candidates:
            return None
        # Multi-object glTF sets often contain a group mesh plus small components.
        # Prefer the largest triangle mesh, then the most descriptive name.
        def score(asset):
            try:
                return (asset.get_num_triangles(0), len(asset.get_name()))
            except Exception:
                return (0, len(asset.get_name()))
        return max(candidates, key=score)

    def import_models():
        for name, item in manifest.items():
            if item["type"] != "models":
                continue
            source = source_path(item)
            try:
                dest = "/Game/PolyHaven/Models/" + name
                paths = import_task(source, dest)
                assets = find_imported("Models", name, paths)
                mesh = choose_mesh(assets)
                if not mesh:
                    raise RuntimeError("Interchange produced no StaticMesh; imported=" + repr(paths))
                mesh_path = mesh.get_path_name().split(".")[0]
                nanite = set_nanite(mesh)
                meshes_by_id[name] = mesh_path
                report["items"][name] = {"type": "model", "source": str(source.relative_to(ROOT)), "assets": paths,
                                         "mesh": mesh_path, "nanite": nanite}
                log(f"model {name}: {mesh_path} Nanite={nanite}")
            except Exception as error:
                report["errors"].append({"name": name, "error": str(error)})
                log(f"ERROR model {name}: {error}")

    def texture_pipeline(cubemap=False):
        stack_class = getattr(u, "InterchangePipelineStackOverride", None)
        pipeline_class = getattr(u, "InterchangeGenericTexturePipeline", None)
        if stack_class is None or pipeline_class is None:
            raise RuntimeError("UE Python API does not expose InterchangePipelineStackOverride / GenericTexturePipeline")
        stack = stack_class()
        pipeline = pipeline_class()
        if cubemap:
            # All local .hdr files are 2:1 equirectangular lat-long images.
            # Extension routing is deterministic when auto-detection varies by source.
            pipeline.set_editor_property("detect_long_lat_cubemap", False)
            pipeline.set_editor_property("file_extensions_to_import_as_long_lat_cubemap", {"hdr"})
        stack.add_pipeline(pipeline)
        return stack

    def import_textures():
        for name, item in manifest.items():
            if item["type"] != "textures":
                continue
            folder = ROOT / item["path"]
            files = sorted(p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in (".jpg", ".jpeg", ".png", ".exr", ".tif", ".tiff"))
            try:
                paths = []
                for source in files:
                    paths += import_task(source, "/Game/PolyHaven/Textures/" + name)
                assets = find_imported("Textures", name, paths)
                textures = [asset for asset in assets if isinstance(asset, u.Texture2D)]
                if not textures:
                    raise RuntimeError("No Texture2D imported")
                by_role = {}
                for texture in textures:
                    token = texture.get_name().lower()
                    if any(s in token for s in ("nor_gl", "normal")):
                        role = "Normal"
                        texture.set_editor_property("srgb", False)
                        texture.set_editor_property("compression_settings", u.TextureCompressionSettings.TC_NORMALMAP)
                    elif any(s in token for s in ("_arm", "occlusionroughnessmetallic", "orm")):
                        role = "ARM"
                        texture.set_editor_property("srgb", False)
                        texture.set_editor_property("compression_settings", u.TextureCompressionSettings.TC_MASKS)
                    elif any(s in token for s in ("diff", "diffuse", "basecolor", "base_color", "color")):
                        role = "BaseColor"
                        texture.set_editor_property("srgb", True)
                    else:
                        continue
                    u.EditorAssetLibrary.save_loaded_asset(texture)
                    by_role.setdefault(role, texture)
                imported_textures[name] = by_role
                report["items"][name] = {"type": "textures", "source": str(folder.relative_to(ROOT)),
                                         "assets": paths, "roles": {role: tex.get_path_name().split(".")[0] for role, tex in by_role.items()}}
                log(f"texture {name}: roles={sorted(by_role)} assets={len(textures)}")
            except Exception as error:
                report["errors"].append({"name": name, "error": str(error)})
                log(f"ERROR texture {name}: {error}")

    def create_surface_instances():
        ensure_material_parent(u)
        tools = u.AssetToolsHelpers.get_asset_tools()
        for name, roles in imported_textures.items():
            if not all(k in roles for k in ("BaseColor", "Normal", "ARM")):
                report["errors"].append({"name": name, "error": "PBR set must contain BaseColor, Normal and ARM maps"})
                continue
            path = "/Game/PolyHaven/Materials/" + name + "/MI_" + name
            instance = u.load_asset(path)
            if not instance:
                folder = "/Game/PolyHaven/Materials/" + name
                if not u.EditorAssetLibrary.does_directory_exist(folder):
                    u.EditorAssetLibrary.make_directory(folder)
                instance = tools.create_asset("MI_" + name, folder, u.MaterialInstanceConstant, u.MaterialInstanceConstantFactoryNew())
            u.MaterialEditingLibrary.set_material_instance_parent(instance, u.load_asset("/Game/PolyHaven/Materials/M_PH_PBR"))
            for role, texture in roles.items():
                u.MaterialEditingLibrary.set_material_instance_texture_parameter_value(instance, role, texture)
            u.MaterialEditingLibrary.set_material_instance_scalar_parameter_value(
                instance, "MetallicScale", pbr_graph_spec()["metallic_scale_instance"]
            )
            u.EditorAssetLibrary.save_loaded_asset(instance)
            report["items"].setdefault(name, {}).update({"material": path})

    def import_hdris():
        for name, item in manifest.items():
            if item["type"] != "hdris":
                continue
            source = source_path(item)
            try:
                expected_asset = "/Game/PolyHaven/HDRI/" + source.stem
                existing = u.load_asset(expected_asset)
                if existing and not isinstance(existing, u.TextureCube):
                    # A prior failed import can leave a Texture2D at the final
                    # package path; Interchange reimport would preserve that type.
                    if not u.EditorAssetLibrary.delete_asset(expected_asset):
                        raise RuntimeError("Could not replace non-cubemap HDRI asset " + expected_asset)
                # Interchange mutates pipeline instances while executing; a fresh
                # stack per file prevents a later HDR from reverting to Texture2D.
                pipeline = texture_pipeline(cubemap=True)
                paths = import_task(source, "/Game/PolyHaven/HDRI", pipeline)
                assets = [u.load_asset(path) for path in paths]
                assets = [asset for asset in assets if asset]
                cubes = [asset for asset in assets if isinstance(asset, u.TextureCube)]
                if not cubes:
                    folder = "/Game/PolyHaven/HDRI"
                    assets = [u.load_asset(p) for p in u.EditorAssetLibrary.list_assets(folder, recursive=True, include_folder=False)]
                    cubes = [asset for asset in assets if asset and isinstance(asset, u.TextureCube) and name.lower() in asset.get_name().lower()]
                if not cubes:
                    latlong = [asset for asset in assets if asset and isinstance(asset, u.Texture2D) and name.lower() in asset.get_name().lower()]
                    if not latlong:
                        raise RuntimeError("Interchange produced neither TextureCube nor HDR Texture2D; imported=" + repr(paths))
                    texture = latlong[0]
                    texture.set_editor_property("srgb", False)
                    texture.set_editor_property("compression_settings", u.TextureCompressionSettings.TC_HDR)
                    u.EditorAssetLibrary.save_loaded_asset(texture)
                    fallback_id = "urban_courtyard" if name == "urban_street_01" else None
                    fallback_path = None
                    if fallback_id:
                        fallback_source = source_path(manifest[fallback_id])
                        fallback_path = "/Game/PolyHaven/HDRI/" + fallback_source.stem
                        fallback_cube = u.load_asset(fallback_path)
                        if not isinstance(fallback_cube, u.TextureCube):
                            fallback_path = None
                    if not fallback_path:
                        raise RuntimeError("Interchange produced a 2D equirectangular HDR with no valid TextureCube fallback")
                    texture_path = texture.get_path_name().split(".")[0]
                    report["items"][name] = {
                        "type": "hdri_2d_with_cubemap_fallback", "source": str(source.relative_to(ROOT)),
                        "assets": paths, "asset": texture_path, "cubemap_asset": fallback_path,
                    }
                    report["warnings"].append({"name": name, "warning": "UE 5.8 Interchange kept this source as Texture2D; the daylight SkyLight uses the CC0 urban_courtyard cubemap."})
                    log(f"hdri {name}: imported as Texture2D; cubemap fallback={fallback_path}")
                    continue
                cube = cubes[0]
                cube.set_editor_property("srgb", False)
                cube.set_editor_property("compression_settings", u.TextureCompressionSettings.TC_HDR)
                u.EditorAssetLibrary.save_loaded_asset(cube)
                asset_path = cube.get_path_name().split(".")[0]
                report["items"][name] = {"type": "hdri", "source": str(source.relative_to(ROOT)), "assets": paths, "asset": asset_path}
                log(f"hdri {name}: {asset_path}")
            except Exception as error:
                report["errors"].append({"name": name, "error": str(error)})
                log(f"ERROR hdri {name}: {error}")

    def map_assets():
        data = json.loads(MAP_PATH.read_text(encoding="utf-8"))
        kits = data["kits"]
        scenes_path = ROOT / "Content/Data/memory/textbook_scenes/unit01.json"
        scene_data = json.loads(scenes_path.read_text(encoding="utf-8"))

        def target_size_cm(kit):
            sizes = []
            for article in scene_data.get("articles", []):
                for scene in article.get("scenes", []):
                    for prop in scene.get("props", []):
                        if prop.get("kit") == kit:
                            size = prop.get("size")
                            if isinstance(size, list) and len(size) == 3:
                                sizes.append(max(float(value) for value in size) * 100)
            if not sizes:
                return None
            return sorted(sizes)[len(sizes) // 2]

        def mesh_max_dimension_cm(mesh):
            try:
                bounds = mesh.get_bounds()
                extent = bounds.box_extent
                return max(abs(float(extent.x)), abs(float(extent.y)), abs(float(extent.z))) * 2
            except Exception:
                return None
        fab_paths = u.EditorAssetLibrary.list_assets("/Game/Fab", recursive=True, include_folder=False)
        fab_meshes = []
        fab_materials = []
        for path in fab_paths:
            asset = u.load_asset(path)
            if isinstance(asset, u.StaticMesh):
                fab_meshes.append((path.split(".")[0], asset.get_name().lower()))
            elif isinstance(asset, u.MaterialInterface):
                fab_materials.append((path.split(".")[0], asset.get_name().lower()))

        def match(rows, tokens):
            candidates = [(path, name) for path, name in rows if all(token in name for token in tokens)]
            return candidates[0][0] if candidates else None

        fab_mesh_map = {
            "office_chair": match(fab_meshes, ("executive", "office", "chair")),
            "board_table": match(fab_meshes, ("conference", "meeting", "table")),
            "car": match(fab_meshes, ("generic", "sedan", "car")),
            "book": match(fab_meshes, ("vf0pbfyoa",)),
        }
        for kit, path in fab_mesh_map.items():
            if path:
                kits[kit].update({"asset": path, "source": "fab"})
                report["items"].setdefault("fab:" + kit, {}).update({"asset": path})
            else:
                report["errors"].append({"name": "fab:" + kit, "error": "StaticMesh not found in migrated /Game/Fab"})

        poly_map = {}
        for kit, spec in kits.items():
            model_id = spec.get("polyhaven")
            path = meshes_by_id.get(model_id) if model_id else None
            if path:
                spec["asset"] = path
                mesh = u.load_asset(path)
                source_size = mesh_max_dimension_cm(mesh) if mesh else None
                target_size = target_size_cm(kit)
                if source_size and target_size:
                    base_scale = float(spec.setdefault("scale_base", spec.get("scale", 1.0)))
                    spec["scale"] = round(base_scale * target_size / source_size, 6)
                    report["items"].setdefault(model_id, {}).setdefault("kit_scales", {})[kit] = {
                        "target_max_cm": round(target_size, 2),
                        "source_max_cm": round(source_size, 2),
                        "scale": spec["scale"],
                    }
                elif target_size:
                    report["errors"].append({"name": "scale:" + kit, "error": "Could not determine imported mesh bounds or unit01 target size"})
                poly_map[kit] = path
        for kit, texture_id in data.get("textures_polyhaven", {}).items():
            material = "/Game/PolyHaven/Materials/" + texture_id + "/MI_" + texture_id
            if not u.EditorAssetLibrary.does_asset_exist(material):
                continue
            surface_kits = {
                "asphalt": ("street",),
                "plaster": ("wall", "window_wall"),
                "brick": ("hutong_wall",),
                "marble": ("mall_atrium",),
                "carpet": ("rug",),
            }
            for target_kit in surface_kits.get(kit, ()):
                if target_kit in kits:
                    kits[target_kit].setdefault("materials", {})["0"] = material

        fab_asphalt = match(fab_materials, ("mi_sfrofg0a",))
        if not fab_asphalt:
            fab_asphalt = "/Game/PolyHaven/Materials/asphalt_02/MI_asphalt_02"
        for kit in ("street",):
            if kit in kits and u.EditorAssetLibrary.does_asset_exist(fab_asphalt):
                kits[kit].setdefault("materials", {})["0"] = fab_asphalt
        # Use the CC0 modular facade/bookcase where the listed Fab equivalent was not delivered.
        for kit, model_id in (("library_shelf", "wooden_bookshelf_worn"), ("hutong_wall", "modular_urban_apartments_facade")):
            if kit in kits and meshes_by_id.get(model_id):
                kits[kit]["asset"] = meshes_by_id[model_id]
                kits[kit]["source"] = "polyhaven"
                mesh = u.load_asset(meshes_by_id[model_id])
                source_size = mesh_max_dimension_cm(mesh) if mesh else None
                target_size = target_size_cm(kit)
                if source_size and target_size:
                    base_scale = float(kits[kit].setdefault("scale_base", kits[kit].get("scale", 1.0)))
                    kits[kit]["scale"] = round(base_scale * target_size / source_size, 6)
                    report["items"].setdefault(model_id, {}).setdefault("kit_scales", {})[kit] = {
                        "target_max_cm": round(target_size, 2), "source_max_cm": round(source_size, 2), "scale": kits[kit]["scale"]
                    }
                elif target_size:
                    report["errors"].append({"name": "scale:" + kit, "error": "Could not determine imported mesh bounds or unit01 target size"})
        data["hdris_imported"] = {}
        for name, item in manifest.items():
            if item["type"] != "hdris":
                continue
            record = report["items"].get(name, {})
            if record.get("type") == "hdri":
                data["hdris_imported"][name] = record["asset"]
            elif record.get("cubemap_asset"):
                data["hdris_imported"][name] = record["cubemap_asset"]
            else:
                source = source_path(item)
                existing = u.load_asset("/Game/PolyHaven/HDRI/" + source.stem)
                if isinstance(existing, u.TextureCube):
                    data["hdris_imported"][name] = existing.get_path_name().split(".")[0]
                elif name == "urban_street_01":
                    # The 2D HDR remains imported and usable as source art; use
                    # the nearest daylight cubemap for SkyLight until UE imports it as a cube.
                    courtyard = source_path(manifest["urban_courtyard"])
                    fallback = u.load_asset("/Game/PolyHaven/HDRI/" + courtyard.stem)
                    if isinstance(fallback, u.TextureCube):
                        data["hdris_imported"][name] = fallback.get_path_name().split(".")[0]
                        report["warnings"].append({"name": name, "warning": "SkyLight uses urban_courtyard TextureCube fallback; source HDR imported as Texture2D."})

        clutter_ids = data.get("clutter_polyhaven", [])
        clutter_ids = clutter_ids.values() if isinstance(clutter_ids, dict) else clutter_ids
        data["clutter_imported"] = {
            model_id: meshes_by_id[model_id]
            for model_id in clutter_ids if meshes_by_id.get(model_id)
        }
        tmp = MAP_PATH.with_suffix(".json.tmp")
        tmp.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        tmp.replace(MAP_PATH)
        report["mapped_polyhaven_kits"] = poly_map
        report["fab_mesh_assets"] = dict((k, v) for k, v in fab_mesh_map.items() if v)
        report["fab_material_assets"] = dict((k, v) for k, v in (("asphalt_fresh", fab_asphalt),
                                                                      ("asphalt_striped", match(fab_materials, ("mi_ufoidcskw",)))) if v)

    def finalize():
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if report["errors"]:
            log(f"WQ_POLYHAVEN_IMPORT_INCOMPLETE errors={len(report['errors'])} report={OUTPUT}")
        elif report["warnings"]:
            log(f"WQ_POLYHAVEN_IMPORT_PASS_WITH_WARNINGS items={len(report['items'])} warnings={len(report['warnings'])} report={OUTPUT}")
        else:
            log(f"WQ_POLYHAVEN_IMPORT_PASS items={len(report['items'])} report={OUTPUT}")
        sys.stdout.flush()
        os._exit(0)

    def run():
        try:
            selected = set(filter(None, os.environ.get("WQ_POLYHAVEN_TYPES", "models,textures,hdris").split(",")))
            if "models" in selected:
                import_models()
            if "textures" in selected:
                import_textures()
                create_surface_instances()
            if "hdris" in selected:
                import_hdris()
            map_assets()
        except Exception as error:
            report["errors"].append({"name": "fatal", "error": str(error)})
        finalize()

    run()


def cli():
    import argparse
    from ue_character_common import run_locked_editor
    parser = argparse.ArgumentParser()
    parser.add_argument("--types", default="models,textures,hdris", help="comma separated: models,textures,hdris")
    parser.add_argument("--validate-only", action="store_true", help="validate local sources and kit mappings without opening UE")
    args = parser.parse_args()
    manifest = validate_manifest()
    counts = validate_asset_mapping(manifest)
    if args.validate_only:
        print(f"Poly Haven preflight passed: {counts}")
        return
    selected = set(filter(None, args.types.split(",")))
    if not selected or selected - {"models", "textures", "hdris"}:
        raise SystemExit("--types accepts a comma-separated subset of: models,textures,hdris")
    result = run_locked_editor(
        __file__, {"WQ_POLYHAVEN_TYPES": args.types}, ROOT / "Saved/Textbook/polyhaven-import.log",
        extra_args=['-ExecCmds="Interchange.FeatureFlags.Import.Enable 1"'])
    log = (ROOT / "Saved/Textbook/polyhaven-import.log").read_text(errors="replace")
    if result.returncode or "WQ_POLYHAVEN_IMPORT_PASS" not in log:
        raise SystemExit("Poly Haven import incomplete; inspect Saved/Textbook/polyhaven-import.json and .log")


if __name__ == "__main__":
    try:
        import unreal
    except ImportError:
        cli()
    else:
        run = None
        try:
            editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc()
            sys.stderr.flush()
            os._exit(1)
