import * as THREE from 'three';
import { fbm, smoothstep, terrainHeight } from './utils';
import { TERRAIN_SIZE } from './worldConfig';
import type { QualityTier } from './postPipeline';

export function terrainShade(x:number,z:number,h:number):[number,number,number] {
  const warm=fbm(x*.017+91,z*.017+47,3)-.5;
  const shade=(.86+fbm(x*.02+5,z*.02+9,3)*.26+smoothstep(6,34,h)*.1)*(.94+smoothstep(-6,10,h)*.08);
  return [shade*(1+warm*.16),shade,shade*(1-warm*.16)];
}

/** Continuous height/normal samples on boundaries; skirt hides LOD T-junctions. */
export function terrainPatch(cx:number,cz:number,width:number,depth:number,segments:number):THREE.BufferGeometry {
  const side=segments+1,p:number[]=[],n:number[]=[],uv:number[]=[],colors:number[]=[],indices:number[]=[];
  const add=(x:number,z:number,drop=0):number=>{
    const wx=x+cx,wz=z+cz,h=terrainHeight(wx,wz);
    const nx=terrainHeight(wx-.15,wz)-terrainHeight(wx+.15,wz);
    const nz=terrainHeight(wx,wz-.15)-terrainHeight(wx,wz+.15);
    const normal=new THREE.Vector3(nx,.3,nz).normalize();
    const index=p.length/3;p.push(x,h-drop,z);n.push(normal.x,normal.y,normal.z);uv.push(wx/width,wz/depth);colors.push(...terrainShade(wx,wz,h));return index;
  };
  for(let z=0;z<=segments;z++)for(let x=0;x<=segments;x++)add((x/segments-.5)*width,(z/segments-.5)*depth);
  for(let z=0;z<segments;z++)for(let x=0;x<segments;x++){
    const a=z*side+x,b=a+1,c=a+side,d=c+1;indices.push(a,c,b,b,c,d);
  }
  const edges=[Array.from({length:side},(_,i)=>i),Array.from({length:side},(_,i)=>i*side+segments),
    Array.from({length:side},(_,i)=>segments*side+segments-i),Array.from({length:side},(_,i)=>(segments-i)*side)];
  for(const edge of edges){const lower=edge.map(i=>add(p[i*3],p[i*3+2],1.4));
    for(let i=0;i<segments;i++)indices.push(edge[i],lower[i],edge[i+1],edge[i+1],lower[i],lower[i+1]);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(n,3));
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeBoundingSphere();g.computeBoundingBox();return g;
}

export interface TerrainTiles { group:THREE.Group;update(camera:THREE.Camera):void;dispose():void; }
export function createTerrainTiles(material:THREE.MeshStandardMaterial,tier:QualityTier):TerrainTiles {
  const group=new THREE.Group();group.name='terrain-lod-tiles';const lods:THREE.LOD[]=[];
  const nx=12,nz=14,tw=TERRAIN_SIZE.width/nx,td=TERRAIN_SIZE.depth/nz;
  for(let z=-1;z<=nz;z++)for(let x=-1;x<=nx;x++){
    const cx=(x+.5)*tw-TERRAIN_SIZE.width/2,cz=(z+.5)*td-TERRAIN_SIZE.depth/2;
    const border=x<0||z<0||x>=nx||z>=nz,lod=new THREE.LOD();lod.position.set(cx,0,cz);lod.autoUpdate=false;
    const levels=border?[{n:6,d:0}]:tier==='low'?[{n:16,d:0},{n:8,d:100}]:[{n:32,d:0},{n:16,d:90},{n:8,d:210}];
    for(const level of levels){const mesh=new THREE.Mesh(terrainPatch(cx,cz,tw,td,level.n),material);mesh.receiveShadow=true;mesh.name=`terrain-${x}-${z}-${level.n}`;lod.addLevel(mesh,level.d,.12);}
    lods.push(lod);group.add(lod);
  }
  return {group,update(camera){for(const lod of lods)lod.update(camera);},dispose(){group.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose();});group.removeFromParent();}};
}
