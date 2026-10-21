import * as THREE from 'three';
import {afterEach,it,expect} from 'vitest';
import {ExplorerCamera} from './ExplorerCamera';
import {getGameSettings,updateGameSettings} from './gameSettings';
const original={...getGameSettings()};
afterEach(()=>updateGameSettings(original));
it('spawns at a close shoulder-height third-person camera on the very first frame',()=>{
  updateGameSettings({followDistance:4.2});
  const rig=new ExplorerCamera(),camera=new THREE.PerspectiveCamera(),player=new THREE.Vector3(3,10,8);
  camera.position.set(0,100,100);rig.snapToPlayer(camera,player,0);
  expect(camera.position.z).toBeLessThan(player.z);expect(camera.position.distanceTo(player)).toBeLessThan(5);
  expect(camera.position.y-player.y).toBeGreaterThan(2);expect(camera.position.y-player.y).toBeLessThan(2.5);
  const direction=camera.getWorldDirection(new THREE.Vector3());expect(direction.y).toBeGreaterThan(-.3);expect(direction.z).toBeGreaterThan(.9);
});
it('smooths movement independently of frame rate and follows the shortest turn across ±pi',()=>{
  const cameraA=new THREE.PerspectiveCamera(),cameraB=new THREE.PerspectiveCamera(),a=new ExplorerCamera(),b=new ExplorerCamera();
  const origin=new THREE.Vector3();a.snapToPlayer(cameraA,origin,Math.PI-.01);b.snapToPlayer(cameraB,origin,Math.PI-.01);
  const next=new THREE.Vector3(2,0,0);let yaw=0;
  for(let i=0;i<60;i++)yaw=a.update(cameraA,next,-Math.PI+.01,1/60);
  for(let i=0;i<120;i++)b.update(cameraB,next,-Math.PI+.01,1/120);
  expect(Math.abs(yaw-Math.PI)).toBeLessThan(.02);expect(cameraA.position.distanceTo(cameraB.position)).toBeLessThan(.01);
});
it('keeps the close camera above rising terrain and honors follow-distance settings',()=>{
  const camera=new THREE.PerspectiveCamera(),rig=new ExplorerCamera(()=>6),player=new THREE.Vector3();
  updateGameSettings({followDistance:3});rig.snapToPlayer(camera,player,0);expect(camera.position.y).toBeGreaterThanOrEqual(6.4);
  expect(Math.abs(camera.position.z)).toBeLessThan(3.1);
  updateGameSettings({followDistance:8});rig.snapToPlayer(camera,player,0);expect(Math.abs(camera.position.z)).toBeGreaterThan(7.8);
});

function inputSurface(){
  const doc=Object.assign(new EventTarget(),{pointerLockElement:null as HTMLElement|null,defaultView:new EventTarget(),exitPointerLock(){this.pointerLockElement=null;(this as unknown as EventTarget).dispatchEvent(new Event('pointerlockchange'));}});
  const surface=Object.assign(new EventTarget(),{ownerDocument:doc,parentElement:null,style:{touchAction:''},setPointerCapture(){},hasPointerCapture(){return false;},releasePointerCapture(){},requestPointerLock(){doc.pointerLockElement=this as unknown as HTMLElement;doc.dispatchEvent(new Event('pointerlockchange'));return Promise.resolve();}});
  return {surface:surface as unknown as HTMLElement,doc};
}
function pointer(surface:HTMLElement,type:string,x:number,y:number){surface.dispatchEvent(Object.assign(new Event(type),{pointerId:1,pointerType:'touch',button:0,clientX:x,clientY:y}));}
it('uses identical four-axis look input for mouse and touch without snapping back after a drag',()=>{
  const input=inputSurface(),touch=new ExplorerCamera(),mouse=new ExplorerCamera(),a=new THREE.PerspectiveCamera(),b=new THREE.PerspectiveCamera(),player=new THREE.Vector3();
  touch.snapToPlayer(a,player,0);mouse.snapToPlayer(b,player,0);touch.bindDrag(input.surface);
  pointer(input.surface,'pointerdown',0,0);pointer(input.surface,'pointermove',30,40);pointer(input.surface,'pointerup',30,40);mouse.applyLookDelta(30,40);
  for(let i=0;i<120;i++){touch.update(a,player,0,1/60);mouse.update(b,player,0,1/60);}
  expect(touch.heading).toBeCloseTo(-.18);expect(a.position.distanceTo(b.position)).toBeLessThan(1e-8);expect(a.position.y).toBeGreaterThan(2.7);
  mouse.applyLookDelta(-30,-40);expect(mouse.heading).toBeCloseTo(0);touch.disposeDrag();
});
it('routes locked mouse movement once, releases on disable and removes listeners on disposal',()=>{
  const input=inputSurface(),rig=new ExplorerCamera();rig.bindDrag(input.surface);
  input.surface.requestPointerLock();input.doc.dispatchEvent(Object.assign(new Event('mousemove'),{movementX:20,movementY:-20}));
  expect(rig.mouseLookActive).toBe(true);expect(rig.heading).toBeCloseTo(-.12);
  rig.setInputEnabled(false);expect(rig.mouseLookActive).toBe(false);
  input.doc.dispatchEvent(Object.assign(new Event('mousemove'),{movementX:50,movementY:0}));expect(rig.heading).toBeCloseTo(-.12);
  rig.disposeDrag();expect(input.surface.style.touchAction).toBe('');
  input.doc.pointerLockElement=input.surface;input.doc.dispatchEvent(Object.assign(new Event('mousemove'),{movementX:50,movementY:0}));expect(rig.heading).toBeCloseTo(-.12);
});
