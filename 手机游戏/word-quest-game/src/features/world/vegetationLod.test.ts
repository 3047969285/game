import * as THREE from 'three';
import { it,expect } from 'vitest';
import { distantLeafCards,terrainOccludes } from './vegetationLod';
import { createTree,getFoliageMaterial } from './props';
it('far canopy reduces cards, preserves atlas UVs, normals and sway',()=>{
  const root=createTree(1,'low');let source:THREE.BufferGeometry|undefined;
  root.traverse(o=>{if(o instanceof THREE.Mesh&&o.material===getFoliageMaterial())source=o.geometry;});
  const g=distantLeafCards(source!);
  expect(g.attributes.position.count).toBeLessThan(source!.attributes.position.count*.4);
  expect(g.index!.count).toBe(g.attributes.position.count/4*6);
  for(const name of ['uv','normal','color','aSway'])expect(g.attributes[name].count).toBe(g.attributes.position.count);
  expect(g.boundingSphere!.radius).toBeGreaterThan(1);
  root.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose();});g.dispose();
});
it('terrain occlusion keeps near objects and visible crowns',()=>{
  expect(terrainOccludes({x:0,y:2,z:0},{x:200,y:12,z:0},()=>0)).toBe(false);
  expect(terrainOccludes({x:0,y:2,z:0},{x:200,y:12,z:0},()=>30)).toBe(true);
  expect(terrainOccludes({x:0,y:2,z:0},{x:200,y:60,z:0},()=>10)).toBe(false);
  expect(terrainOccludes({x:0,y:2,z:0},{x:20,y:12,z:0},()=>30)).toBe(false);
});
