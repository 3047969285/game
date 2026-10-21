import * as THREE from 'three';
import { it,expect } from 'vitest';
import { mirrorWaterCamera,WaterCapture } from './waterCapture';
import { createSimpleWaterMaterial,getWaterView } from './waterSurface';
it('mirrors camera position and direction across a horizontal plane',()=>{
  const camera=new THREE.PerspectiveCamera(55,1.6,.1,500);camera.position.set(3,7,20);camera.lookAt(0,0,0);
  const mirrored=mirrorWaterCamera(camera,2),a=camera.getWorldDirection(new THREE.Vector3()),b=mirrored.getWorldDirection(new THREE.Vector3());
  expect(mirrored.position.y).toBe(-3);expect(mirrored.position.x).toBe(3);expect(b.x).toBeCloseTo(a.x);expect(b.y).toBeCloseTo(-a.y);expect(b.z).toBeCloseTo(a.z);
  expect(mirrored.fov).toBe(55);expect(camera.position.y).toBe(7);
});
it('water clones share serializable capture keys and dispose registrations',()=>{
  const mat=createSimpleWaterMaterial({quality:'high'}),clone=mat.clone();
  expect(getWaterView(clone)).toBe(getWaterView(mat));expect(getWaterView(mat)!.ready.value).toBe(0);
  mat.dispose();expect(getWaterView(clone)).toBeUndefined();clone.dispose();
});
it('restores hidden surfaces, target, clipping and shadow state after a failed capture',()=>{
  const mat=createSimpleWaterMaterial({quality:'high'}),mesh=new THREE.Mesh(new THREE.PlaneGeometry(10,10),mat);mesh.rotation.x=-Math.PI/2;
  const scene=new THREE.Scene();scene.add(mesh);const camera=new THREE.PerspectiveCamera();camera.position.set(0,5,7);camera.lookAt(0,0,0);
  const target=new THREE.WebGLRenderTarget(2,2),planes=[new THREE.Plane()];let active=target;
  const renderer={getRenderTarget:()=>active,setRenderTarget:(t:THREE.WebGLRenderTarget)=>{active=t;},clippingPlanes:planes,shadowMap:{autoUpdate:true},xr:{enabled:false},autoClear:false,clear:()=>{},render:()=>{throw new Error('fixture failure');}};
  const capture=new WaterCapture('high');
  expect(()=>capture.update(renderer as unknown as THREE.WebGLRenderer,scene,camera)).toThrow('fixture failure');
  expect(mesh.visible).toBe(true);expect(renderer.clippingPlanes).toBe(planes);expect(renderer.shadowMap.autoUpdate).toBe(true);expect(renderer.autoClear).toBe(false);expect(active).toBe(target);
  capture.dispose();target.dispose();mesh.geometry.dispose();mat.dispose();
});
