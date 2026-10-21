import * as THREE from 'three';
import { it,expect } from 'vitest';
import { createPostPipeline } from './postPipeline';
it('keeps the requested drawing-buffer size and manual AO choice across budget changes',()=>{
  const renderer={getSize:(v:THREE.Vector2)=>v.set(1280,720),getPixelRatio:()=>2} as unknown as THREE.WebGLRenderer;
  const post=createPostPipeline(renderer,new THREE.Scene(),new THREE.PerspectiveCamera(50,16/9,.1,900),'high');
  expect(post).toBeDefined();expect(post!.composer.readBuffer.width).toBe(2560);expect(post!.composer.readBuffer.height).toBe(1440);
  const ao=post!.composer.passes.find(p=>p.constructor.name.includes('GTAO'))!;expect(ao).toBeDefined();
  post!.setFeature('ao',false);post!.setBudget(2);post!.setBudget(0);expect(ao.enabled).toBe(false);
  post!.setFeature('ao',true);expect(ao.enabled).toBe(true);post!.setBudget(2);expect(ao.enabled).toBe(false);
  for(const pass of post!.composer.passes)pass.dispose();post!.composer.dispose();
});
