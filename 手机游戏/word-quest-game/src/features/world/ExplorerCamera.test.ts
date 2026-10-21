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
