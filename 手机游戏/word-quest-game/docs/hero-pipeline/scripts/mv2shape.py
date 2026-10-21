"""Multi-view (front / left / back) -> 3D shape with Hunyuan3D-2mv turbo on Apple Silicon.

Usage: python mv2shape.py <views_dir> <who> <out.glb> [steps] [octree]
"""
import os, sys, time, torch
from PIL import Image
from hy3dgen.rembg import BackgroundRemover
from hy3dgen.shapegen import Hunyuan3DDiTFlowMatchingPipeline, FloaterRemover, DegenerateFaceRemover

views_dir, who, out = sys.argv[1], sys.argv[2], sys.argv[3]
steps = int(sys.argv[4]) if len(sys.argv) > 4 else 10
octree = int(sys.argv[5]) if len(sys.argv) > 5 else 384

t0 = time.time()
pipe = Hunyuan3DDiTFlowMatchingPipeline.from_pretrained(
    "tencent/Hunyuan3D-2mv", subfolder="hunyuan3d-dit-v2-mv-turbo", variant="fp16", use_safetensors=True, device="mps")
print("loaded", round(time.time() - t0, 1), "s", flush=True)

rm = BackgroundRemover()
images = {}
for view in ("front", "left", "back"):
    path = os.path.join(views_dir, f"{who}_{view}.png")
    if not os.path.exists(path):
        continue
    images[view] = rm(Image.open(path).convert("RGB"))
print("views", list(images), flush=True)
t1 = time.time()
mesh = pipe(image=images, num_inference_steps=steps, octree_resolution=octree, num_chunks=20000,
            generator=torch.manual_seed(1234), output_type="trimesh")[0]
mesh = FloaterRemover()(mesh)
mesh = DegenerateFaceRemover()(mesh)
mesh.export(out)
print("generated", round(time.time() - t1, 1), "s", "verts", len(mesh.vertices), "faces", len(mesh.faces), flush=True)
