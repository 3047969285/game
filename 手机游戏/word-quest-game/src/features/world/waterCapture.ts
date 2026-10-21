import * as THREE from 'three';
import { getWaterView } from './waterSurface';
import type { QualityTier } from './postPipeline';

export function mirrorWaterCamera(source:THREE.PerspectiveCamera,height:number,target=new THREE.PerspectiveCamera()):THREE.PerspectiveCamera {
  target.copy(source);source.updateMatrixWorld();
  target.position.y=2*height-source.position.y;
  const look=source.getWorldDirection(new THREE.Vector3());look.y=-look.y;
  target.up.copy(source.up);target.up.y=-target.up.y;
  target.lookAt(target.position.clone().add(look));target.updateMatrixWorld();return target;
}
const bias=new THREE.Matrix4().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);

/** One pair of half-float captures shared by the nearest horizontal water plane.
 * Captures are throttled and never recursively capture other water surfaces. */
export class WaterCapture {
  private reflection:THREE.WebGLRenderTarget;
  private refraction:THREE.WebGLRenderTarget;
  private reflected=new THREE.PerspectiveCamera();
  private frame=0;
  private interval=4;
  private frustum=new THREE.Frustum();
  private projection=new THREE.Matrix4();
  setBudget(level:0|1|2):void{this.interval=4*Math.pow(2,level);}
  private previousView?:NonNullable<ReturnType<typeof getWaterView>>;
  constructor(private tier:QualityTier){
    const size=tier==='high'?512:256;
    this.reflection=new THREE.WebGLRenderTarget(size,size,{type:THREE.HalfFloatType});
    this.refraction=this.reflection.clone();
  }
  update(renderer:THREE.WebGLRenderer,scene:THREE.Scene,camera:THREE.PerspectiveCamera):void {
    if(this.tier==='low'||this.frame++%this.interval!==0)return;
    if(this.previousView)this.previousView.ready.value=0;
    const waters:Array<{mesh:THREE.Mesh;view:NonNullable<ReturnType<typeof getWaterView>>;y:number;distance:number}>=[];
    scene.updateMatrixWorld();camera.updateMatrixWorld();
    this.frustum.setFromProjectionMatrix(this.projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
    const box=new THREE.Box3(),p=new THREE.Vector3();
    scene.traverse(o=>{if(!(o instanceof THREE.Mesh)||!o.visible)return;
      const materials=Array.isArray(o.material)?o.material:[o.material];
      for(const m of materials){const view=getWaterView(m);if(!view)continue;
        box.setFromObject(o);if(!this.frustum.intersectsBox(box))continue;box.getCenter(p);const distance=box.distanceToPoint(camera.position);
        if(camera.position.y>box.max.y+.1&&distance<65)waters.push({mesh:o,view,y:box.max.y,distance});
      }
    });
    if(!waters.length)return;waters.sort((a,b)=>a.distance-b.distance);
    const chosen=waters[0];
    for(const water of waters)water.view.ready.value=0;
    const hidden:Array<[THREE.Object3D,boolean]>=[];
    scene.traverse(o=>{if(o instanceof THREE.Mesh&&(Array.isArray(o.material)?o.material:[o.material]).some(m=>!!getWaterView(m))){hidden.push([o,o.visible]);o.visible=false;}});
    const previousTarget=renderer.getRenderTarget(),clipping=renderer.clippingPlanes,shadowUpdate=renderer.shadowMap.autoUpdate;
    const xr=renderer.xr.enabled,autoClear=renderer.autoClear,shadowNeedsUpdate=renderer.shadowMap.needsUpdate;
    try{
      renderer.xr.enabled=false;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=false;renderer.autoClear=true;
      mirrorWaterCamera(camera,chosen.y,this.reflected);
      renderer.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,1,0),-chosen.y+.03)];
      renderer.setRenderTarget(this.reflection);renderer.clear();renderer.render(scene,this.reflected);
      renderer.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,-1,0),chosen.y+.03)];
      renderer.setRenderTarget(this.refraction);renderer.clear();renderer.render(scene,camera);
      const view=chosen.view;
      view.reflection.value=this.reflection.texture;view.refraction.value=this.refraction.texture;
      view.reflectionMatrix.value.copy(bias).multiply(this.reflected.projectionMatrix).multiply(this.reflected.matrixWorldInverse);
      view.refractionMatrix.value.copy(bias).multiply(camera.projectionMatrix).multiply(camera.matrixWorldInverse);
      view.planeY.value=chosen.y;view.ready.value=1;this.previousView=view;
    }finally{
      for(const [o,visible] of hidden)o.visible=visible;
      renderer.clippingPlanes=clipping;renderer.shadowMap.autoUpdate=shadowUpdate;renderer.shadowMap.needsUpdate=shadowNeedsUpdate;
      renderer.xr.enabled=xr;renderer.autoClear=autoClear;renderer.setRenderTarget(previousTarget);
    }
  }
  dispose():void {this.reflection.dispose();this.refraction.dispose();}
}
