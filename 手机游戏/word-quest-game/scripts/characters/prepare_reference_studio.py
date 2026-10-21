"""Create a non-destructive Blender reference workspace; never claims to generate a mesh.
Run: Blender --background --factory-startup --python this.py -- --output path
"""
import argparse, sys, math, json
from pathlib import Path
import bpy
from mathutils import Vector

parser=argparse.ArgumentParser()
parser.add_argument('--output',required=True)
args=parser.parse_args(sys.argv[sys.argv.index('--')+1:])
project=Path(__file__).resolve().parents[2]
refs=project/'art/characters/lian'
output=Path(args.output).resolve();output.parent.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene
scene.unit_settings.system='METRIC';scene.unit_settings.scale_length=1
scene.render.engine='CYCLES';scene.cycles.samples=64
scene.render.resolution_x=1600;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.world.color=(.8,.8,.8)
scene.view_settings.view_transform='AgX'

def collection(name):
 c=bpy.data.collections.new(name);scene.collection.children.link(c);return c

def image_reference(path,name,x,y,z,size,col):
 image=bpy.data.images.load(str(path),check_existing=True)
 obj=bpy.data.objects.new(name,None);obj.empty_display_type='IMAGE';obj.data=image;obj.empty_display_size=size
 obj.location=(x,y,z);obj.rotation_euler=(math.pi/2,0,0);obj.color[3]=.8
 obj['reference_only']=True;obj['source_file']=path.name
 col.objects.link(obj);obj.hide_render=True
 return obj

for kind,indices in [('male',range(1,5)),('female',range(5,9))]:
 col=collection('REF_'+kind.upper())
 for i,index in enumerate(indices):
  image_reference(refs/f'lian{index}.png',f'{kind}_portrait_{i+1}',(-3 if kind=='male' else 3)+(i%2)*1.35,-1.5,1.2+(i//2)*1.35,1.2,col)
 image_reference(refs/f'{kind}-turnaround.png',f'{kind}_target_turnaround',-2.5 if kind=='male' else 3.5,0,1.3,4.8,col)
for x in [-2.5,3.5]:
 bpy.ops.object.empty_add(type='PLAIN_AXES',location=(x,0,0));obj=bpy.context.object
 obj.name='MODEL_ORIGIN_MALE' if x<0 else 'MODEL_ORIGIN_FEMALE';obj.empty_display_size=.2
 obj['status']='Awaiting Hunyuan mesh; references are not 3D character assets'
for name,position,target in [('Front',(0,-7,1.0),(0,0,1.0)),('ThreeQuarter',(5,-6,1.4),(0,0,1.0)),('Back',(0,7,1.0),(0,0,1.0)),('Portrait',(0,-3,1.6),(0,0,1.6))]:
 data=bpy.data.cameras.new(name);obj=bpy.data.objects.new('CAM_'+name,data);scene.collection.objects.link(obj)
 obj.location=position;obj.rotation_euler=(Vector(target)-obj.location).to_track_quat('-Z','Y').to_euler();data.type='ORTHO';data.ortho_scale=.7 if name=='Portrait' else 2.3
 if name=='Front':scene.camera=obj
for name,position,energy,size in [('Key',(3,-4,5),700,5),('Fill',(-4,-2,3),450,4),('Rim',(0,3,4),500,3)]:
 data=bpy.data.lights.new(name,'AREA');data.energy=energy;data.shape='DISK';data.size=size;data.color=(1,1,1)
 obj=bpy.data.objects.new('LIGHT_'+name,data);scene.collection.objects.link(obj);obj.location=position;obj.rotation_euler=(-obj.location+Vector((0,0,1))).to_track_quat('-Z','Y').to_euler()
text=bpy.data.texts.new('READ_ME')
text.write('REFERENCE WORKSPACE — NO GENERATED CHARACTER MESH YET\nMale: lian1–4. Female: lian5–8.\nThe two turnaround sheets are AI-generated identity references, not geometry.\nImport Hunyuan GLB/FBX into a separate collection at the model origin.\nBefore game export: inspect face/ears/hands/feet, retopology, UV/PBR textures, rig, skin weights, blink/mouth expression and animation.\nKeep a high resolution source; export a separate game-ready GLB. Never overwrite the current game humans without validation.\n')
# Keep project self contained when opened on another workstation.
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=str(output))
print(json.dumps({'blend':str(output),'references':10,'character_meshes':0,'status':'reference_workspace_ready'}))
