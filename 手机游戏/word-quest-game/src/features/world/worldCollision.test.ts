import * as THREE from 'three';
import {it,expect} from 'vitest';
import {WorldCollision} from './worldCollision';
const material=new THREE.MeshStandardMaterial();
function box(x:number,y:number,z:number,w:number,h:number,d:number){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);return mesh;}
it('blocks sprint tunneling and slides along actual solid geometry',()=>{
 const world=new WorldCollision(()=>0),wall=box(0,1,2,12,2,.1);world.rebuild([wall]);const out=new THREE.Vector3();
 world.move(new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,8),out);
 expect(out.z).toBeLessThan(1.65);expect(out.z).toBeGreaterThan(1.4);expect(out.x).toBeGreaterThan(.8);world.dispose();
});
it('preserves door gaps and steps onto low platforms without falling through',()=>{
 const world=new WorldCollision(()=>0);world.rebuild([box(-2,1,2,2,2,.2),box(2,1,2,2,2,.2),box(0,.1,3,1.8,.2,1)]);
 const out=new THREE.Vector3();world.move(new THREE.Vector3(),new THREE.Vector3(0,0,3),out);expect(out.z).toBeCloseTo(3);expect(out.y).toBeCloseTo(.2);world.dispose();
});
it('shortens a third-person camera before a wall',()=>{
 const world=new WorldCollision(()=>0);world.rebuild([box(0,1,-2,10,3,.2)]);const position=new THREE.Vector3(0,2,-5);world.clipCamera(new THREE.Vector3(0,1.45,0),position);expect(position.z).toBeGreaterThan(-1.9);expect(position.z).toBeLessThan(-1.4);world.dispose();
});
it('indexes many instanced tree proxies once and moves without traversing the world',()=>{
 const world=new WorldCollision(()=>0);world.setVegetation(Array.from({length:2000},(_,i)=>({kind:'pine' as const,x:(i%40)*4,y:0,z:Math.floor(i/40)*4+10,scale:1,rotY:0,variant:0})));world.rebuild([]);
 const out=new THREE.Vector3();for(let i=0;i<60;i++)world.move(new THREE.Vector3(0,0,8),new THREE.Vector3(0,0,.1),out);
 expect(out.z).toBeLessThan(10);world.dispose();
});
it('treats transparent architectural glass as solid while excluding water surfaces',()=>{
 const world=new WorldCollision(()=>0),glass=box(0,1,2,4,2,.1);glass.material=new THREE.MeshPhysicalMaterial({transparent:true,opacity:.3});world.rebuild([glass]);
 const out=new THREE.Vector3();world.move(new THREE.Vector3(),new THREE.Vector3(0,0,3),out);expect(out.z).toBeLessThan(1.65);
 glass.userData.isWater=true;world.rebuild([glass]);world.move(new THREE.Vector3(),new THREE.Vector3(0,0,3),out);expect(out.z).toBeCloseTo(3);world.dispose();
});
