import {readFileSync} from 'node:fs';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {afterEach,beforeAll,describe,it,expect,vi} from 'vitest';
import {getCharacterModel,inspectCharacterModel,loadCharacterModel,registerCharacterModel,validCharacterModelPath} from './characterModels';
import {attachHumanVisual,registerHumanModel} from './humanVisual';
import {face} from './humanIdentity';
import {HumanRig} from './humanRig';
import {HumanAnimator} from './humanMotion';
import {CHARACTERS,characterLook} from '../memory/characters';
let template;
beforeAll(async()=>{
 globalThis.self=globalThis;globalThis.createImageBitmap=async()=>({width:4,height:4,close(){}});
 const bytes=readFileSync(new URL('../../../public/models/humans/male.glb',import.meta.url));
 template=(await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'')).scene;
 registerHumanModel('male',template);
});
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals();});
function fixture(height){
 const scene=clone(template);scene.updateMatrixWorld(true);let box=new THREE.Box3().setFromObject(scene);
 const factor=height/(box.max.y-box.min.y);scene.scale.multiplyScalar(factor);scene.position.y=-box.min.y*factor;
 scene.traverse(o=>{if(o.isMesh){o.geometry=o.geometry.clone();o.material=o.material.clone();o.material.roughness=.31;o.material.color.setHex(0x456789);}});
 scene.updateMatrixWorld(true);return scene;
}
function controls(){
 const node=()=>new THREE.Object3D();
 return{body:node(),bodyRestY:0,head:node(),leftArm:node(),rightArm:node(),leftElbow:node(),rightElbow:node(),leftHip:node(),rightHip:node(),leftKnee:node(),rightKnee:node(),leftAnkle:node(),rightAnkle:node(),blinkLeft:()=>.8,blinkRight:()=>.6,mouthOpen:()=>.4,smile:()=>.5,browLift:()=>.3,gazeX:()=>0,gazeY:()=>0};
}
function attach(path,kind='male'){
 const root=new THREE.Group();root.userData.ownedMaterials=new Set();
 const update=attachHumanVisual(root,controls(),kind,{model:path,look:{face:face({jawWidth:1,noseLength:1}),hairStyle:'buzz',hairColor:0xff0000,skinTone:-1,accessories:['backpack']}});
 expect(update).toBeTypeOf('function');return {root,info:root.userData.humanVisual,update};
}
function cleanup(root){
 const geometries=new Set(),skeletons=new Set();root.traverse(o=>{if(o.isMesh)geometries.add(o.geometry);if(o.isSkinnedMesh)skeletons.add(o.skeleton);});
 geometries.forEach(g=>g.dispose());skeletons.forEach(s=>s.dispose());root.userData.ownedMaterials.forEach(m=>m.dispose());root.removeFromParent();
}
describe('独立英雄模型交付接口',()=>{
 it('身份表指定独立资产，同时保留旧外观作为缺失时的回退',()=>{
  expect(CHARACTERS.me2026.model).toBe('heroes/me2026.glb');expect(CHARACTERS.lin.model).toBe('heroes/lin.glb');
  expect(characterLook('me2026').model).toBe(CHARACTERS.me2026.model);expect(characterLook('lin').model).toBe(CHARACTERS.lin.model);
  expect(characterLook('me2026').humanLook).toBeDefined();
 });
 it('拒绝外部 URL、绝对路径和目录越界',()=>{
  for(const path of ['https://example.com/a.glb','../a.glb','/a.glb','heroes/../../a.glb','heroes\\a.glb','heroes/%2e%2e/a.glb'])expect(validCharacterModelPath(path)).toBe(false);
  expect(validCharacterModelPath('heroes/me2026.glb')).toBe(true);
 });
 it('缺少核心骨骼时不登记，不会把运行到一半才报错的资产交给动画器',()=>{
  const scene=fixture(1.84);scene.getObjectByName('Hips').name='InvalidHips';
  expect(()=>registerCharacterModel('heroes/test-invalid.glb',scene)).toThrow(/Hips/);expect(getCharacterModel('heroes/test-invalid.glb')).toBeUndefined();
 });
 it('交付缺表情会给出可读报告，原尺寸、三角形和材质预算可以核查',()=>{
  const scene=fixture(1.68);scene.traverse(o=>{if(o.isMesh)o.morphTargetDictionary={};});
  const report=inspectCharacterModel(scene);expect(report.height).toBeCloseTo(1.68,4);expect(report.missingMorphs).toHaveLength(6);
  expect(report.triangles).toBeGreaterThan(0);expect(report.warnings.some(w=>w.includes('morphs'))).toBe(true);
 });
 for(const [kind,height] of [['male',1.84],['female',1.68]])it(`${kind} 保留 ${height} 米资产尺寸，不套旧发型、雕刻、配饰或材质染色`,()=>{
  const path=`heroes/test-${kind}-native.glb`,source=fixture(height);
  registerCharacterModel(path,source);const originalScale=source.scale.clone();
  const {root,info}=attach(path,kind);info.restoreRest();root.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(info.visual);expect(box.max.y-box.min.y).toBeCloseTo(height,4);expect(box.min.y).toBeCloseTo(0,4);
  expect(info.visual.scale.toArray()).toEqual(originalScale.toArray());expect(info.sourceModel).toBe(path);expect(info.recolored).toBe(false);
  expect(info.hair).toBeUndefined();expect(info.accessories).toBeUndefined();expect(info.ownedTextures).toHaveLength(0);
  const meshes=[];source.traverse(o=>{if(o.isMesh)meshes.push(o);});const output=[];info.visual.traverse(o=>{if(o.isMesh)output.push(o);});
  output.forEach((m,i)=>{expect(Array.from(m.geometry.attributes.position.array)).toEqual(Array.from(meshes[i].geometry.attributes.position.array));expect(m.material.roughness).toBe(.31);expect(m.material.color.getHex()).toBe(0x456789);expect(m.material.map).toBe(meshes[i].material.map);});
  cleanup(root);
 });
 it('每个实例独立骨架、几何、材质和 ARKit 表情，源资产不被修改',()=>{
  const path='heroes/test-independent.glb',source=fixture(1.84);registerCharacterModel(path,source);
  const a=attach(path),b=attach(path);let am,bm; a.info.visual.traverse(o=>{if(o.isSkinnedMesh&&!am)am=o;});b.info.visual.traverse(o=>{if(o.isSkinnedMesh&&!bm)bm=o;});
  expect(am.skeleton).not.toBe(bm.skeleton);expect(am.geometry).not.toBe(bm.geometry);expect(am.material).not.toBe(bm.material);
  a.update();const values={eyeBlinkLeft:.8,eyeBlinkRight:.6,jawOpen:.4,mouthSmileLeft:.5,mouthSmileRight:.5,browInnerUp:.3};
  for(const [name,value] of Object.entries(values)){const mesh=a.info.faces.find(m=>m.morphTargetDictionary[name]!==undefined);expect(mesh,name).toBeDefined();expect(mesh.morphTargetInfluences[mesh.morphTargetDictionary[name]]).toBeCloseTo(value);}
  const bone=a.info.visual.getObjectByName('Head'),other=b.info.visual.getObjectByName('Head');bone.position.x+=.02;expect(bone.position.x).not.toBe(other.position.x);
  cleanup(a.root);cleanup(b.root);
 });
 it('同名骨架能直接交给全身动画器，更新后位置和形变保持有限值',()=>{
  const path='heroes/test-animator.glb',source=fixture(1.84);source.traverse(o=>{if(o.name.startsWith('Bip01'))o.name='Extra_'+o.name;});registerCharacterModel(path,source);const {root,info}=attach(path);info.restoreRest();
  const animator=new HumanAnimator(new HumanRig(info.visual,root),{faces:info.faces,seed:1,hasSeat:false});animator.setScriptPose('stand',false,{instant:true});
  for(let i=0;i<120;i++)animator.update(1/60);
  info.visual.traverse(o=>{expect(o.position.toArray().every(Number.isFinite)).toBe(true);expect(o.quaternion.toArray().every(Number.isFinite)).toBe(true);});
  cleanup(root);
 });
 it('未交付时仍能创建旧模型',()=>{
  const {root,info}=attach('heroes/not-delivered.glb');expect(info.sourceModel).toBeUndefined();expect(root.userData.humanModel).toBe('male');cleanup(root);
 });
 it('404 和 SPA 的 HTML 回退都不进入 GLB 解析器；下一次可以重试',async()=>{
  const fetch=vi.fn().mockResolvedValueOnce({status:404,ok:false}).mockResolvedValueOnce({status:200,ok:true,arrayBuffer:async()=>new TextEncoder().encode('<!doctype html>not a model').buffer});
  vi.stubGlobal('fetch',fetch);const parse=vi.spyOn(GLTFLoader.prototype,'parseAsync');
  expect((await loadCharacterModel('heroes/test-network-missing.glb')).status).toBe('missing');
  expect((await loadCharacterModel('heroes/test-network-missing.glb')).status).toBe('invalid');expect(fetch).toHaveBeenCalledTimes(2);expect(parse).not.toHaveBeenCalled();
 });
 it('并发请求合并；加载通过后缓存模板，不会反复下载',async()=>{
  const path='heroes/test-coalesced.glb',bytes=new ArrayBuffer(12);new DataView(bytes).setUint32(0,0x46546c67,true);
  let resolve;const response=new Promise(r=>resolve=r);const fetch=vi.fn(()=>response);vi.stubGlobal('fetch',fetch);
  const parse=vi.spyOn(GLTFLoader.prototype,'parseAsync').mockResolvedValue({scene:fixture(1.84)});
  const first=loadCharacterModel(path),second=loadCharacterModel(path);resolve({status:200,ok:true,arrayBuffer:async()=>bytes});
  const results=await Promise.all([first,second]);expect(results.every(r=>r.status==='ready')).toBe(true);expect(fetch).toHaveBeenCalledOnce();expect(parse).toHaveBeenCalledOnce();
  expect((await loadCharacterModel(path)).status).toBe('ready');expect(fetch).toHaveBeenCalledOnce();
 });
});
