"""Assemble the full hero: head (hair/brows/lashes/skin from male_face.blend) + garment objects
from male_clothes.blend.  Renders full-body turnaround previews.

Usage: Blender -b fit/male_face.blend -P assemble.py -- male fit
Writes fit/male_hero.blend and fit/male_hero_{front,q34,side,back}.png
"""
import bpy, sys, os, math
import numpy as np
from mathutils import Vector, Matrix

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT = a[0], a[1]
CLOTHES = os.path.join(OUT, f"{WHO}_clothes.blend")

body = bpy.data.objects["Human"]
if "Delete.shoes04" not in body.vertex_groups:
    # bring the feet-hiding mask over from the clothes scene (same basemesh vertex order)
    with bpy.data.libraries.load(CLOTHES) as (src, dst):
        dst.objects = ["Human"]
    src_human = dst.objects[0]
    if src_human is not None and len(src_human.data.vertices) == len(body.data.vertices):
        vg_src = src_human.vertex_groups.get("Delete.shoes04")
        vg = body.vertex_groups.new(name="Delete.shoes04")
        if vg_src is not None:
            idx = vg_src.index
            for v in src_human.data.vertices:
                for g in v.groups:
                    if g.group == idx and g.weight > 0.5:
                        vg.add([v.index], 1.0, "REPLACE")
        print("copied feet mask", flush=True)
    if src_human is not None:
        bpy.data.objects.remove(src_human, do_unlink=True)

# add the mask modifier if the clothes pass did not already add it
if not any(m.type == "MASK" and m.vertex_group == "Delete.shoes04" for m in body.modifiers):
    m = body.modifiers.new("hide_feet_under_shoes", "MASK")
    m.vertex_group = "Delete.shoes04"
    m.invert_vertex_group = True
    print("added feet mask modifier", flush=True)

# append the garments
with bpy.data.libraries.load(CLOTHES) as (src, dst):
    dst.objects = [n for n in src.objects if n.startswith("male_shirt") or
                   n.startswith("male_trousers") or n.startswith("male_shoes")]
for o in dst.objects:
    if o is not None:
        bpy.context.scene.collection.objects.link(o)
        o.parent = None
        o.matrix_world = Matrix.Identity(4)
        print("appended", o.name, flush=True)

# clear the cameras / lights that came with the face scene, build a neutral studio again
for o in list(bpy.data.objects):
    if o.type in {"LIGHT", "CAMERA"}:
        bpy.data.objects.remove(o, do_unlink=True)

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
try:
    scene.eevee.taa_render_samples = 96
except Exception:  # noqa: BLE001
    pass
scene.render.resolution_x = 1024
scene.render.resolution_y = 1024
scene.render.film_transparent = True
scene.view_settings.view_transform = "Standard"
w = scene.world or bpy.data.worlds.new("World")
scene.world = w
w.use_nodes = True
w.node_tree.nodes["Background"].inputs[0].default_value = (0.92, 0.93, 0.95, 1)
w.node_tree.nodes["Background"].inputs[1].default_value = 0.22

bpy.context.view_layer.update()
ev = body.evaluated_get(bpy.context.evaluated_depsgraph_get())
V = np.array([(body.matrix_world @ v.co)[:] for v in ev.data.vertices])
top, bottom = float(V[:, 2].max()), float(V[:, 2].min())
height = top - bottom
print("body eval bbox", round(bottom, 3), round(top, 3), "height", round(height, 3), flush=True)
hc = np.array([0.0, 0.0, bottom + height * 0.93])

lights = []
ld = bpy.data.lights.new("key", "AREA")
ld.energy = 220; ld.size = 3.0; ld.color = (1.0, 0.97, 0.94)
lo = bpy.data.objects.new("key", ld); scene.collection.objects.link(lo); lo.location = Vector((3.0, -5.0, bottom + height * 1.15))
lo.rotation_euler = (Vector((0, 0, bottom + height * 0.55)) - lo.location).to_track_quat("-Z", "Y").to_euler()
ld = bpy.data.lights.new("fill", "AREA")
ld.energy = 70; ld.size = 3.5; ld.color = (0.92, 0.95, 1.0)
lo = bpy.data.objects.new("fill", ld); scene.collection.objects.link(lo); lo.location = Vector((-4.0, -3.5, bottom + height * 0.8))
lo.rotation_euler = (Vector((0, 0, bottom + height * 0.55)) - lo.location).to_track_quat("-Z", "Y").to_euler()

cd = bpy.data.cameras.new("hero_cam")
cam = bpy.data.objects.new("hero_cam", cd); scene.collection.objects.link(cam); scene.camera = cam
cd.type = "ORTHO"
cd.ortho_scale = height * 1.12
UP = np.array([0, 0, 1.0])
center = np.array([0.0, 0.0, 0.5 * (top + bottom) + 0.01])
cam_z = Vector(center.tolist())


def shoot(name, yaw):
    t = math.radians(yaw)
    d = np.array([math.sin(t), -math.cos(t), 0.0])
    cam.location = Vector((center + d * 8.0).tolist())
    cam.rotation_euler = (Vector(center.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_hero_{name}.png")
    bpy.ops.render.render(write_still=True)


for name, yaw in (("front", 0), ("q34", 35), ("side", 90), ("back", 180)):
    shoot(name, yaw)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_hero.blend"))
print("ASSEMBLE DONE", WHO)
