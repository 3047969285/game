import * as THREE from 'three';

/** Retain deterministic leaf cards and expand them about their centres to
 * preserve distant canopy coverage without drawing the full near geometry. */
export function distantLeafCards(source:THREE.BufferGeometry,stride=3):THREE.BufferGeometry {
  const p=source.attributes.position,n=p.count;
  if(n%4!==0 || !source.attributes.aSway)return source.clone();
  const selected:number[]=[];
  for(let card=0;card<n/4;card+=stride)for(let j=0;j<4;j++)selected.push(card*4+j);
  const result=new THREE.BufferGeometry();
  for(const [name,attribute] of Object.entries(source.attributes)){
    const values=new Float32Array(selected.length*attribute.itemSize);
    selected.forEach((index,i)=>{for(let j=0;j<attribute.itemSize;j++)values[i*attribute.itemSize+j]=attribute.array[index*attribute.itemSize+j];});
    result.setAttribute(name,new THREE.BufferAttribute(values,attribute.itemSize));
  }
  const position=result.attributes.position;
  const expansion=Math.sqrt(stride)*.9;
  for(let i=0;i<selected.length;i+=4){const centre=new THREE.Vector3();for(let j=0;j<4;j++)centre.add(new THREE.Vector3().fromBufferAttribute(position,i+j));centre.multiplyScalar(.25);
    for(let j=0;j<4;j++){const v=new THREE.Vector3().fromBufferAttribute(position,i+j).sub(centre).multiplyScalar(expansion).add(centre);position.setXYZ(i+j,v.x,v.y,v.z);}}
  const indices:number[]=[];for(let i=0;i<selected.length;i+=4)indices.push(i,i+1,i+2,i+2,i+1,i+3);
  result.setIndex(indices);result.computeBoundingSphere();return result;
}

/** Conservative terrain-only occlusion. Test the crown, never only the trunk. */
export function terrainOccludes(eye:{x:number;y:number;z:number},target:{x:number;y:number;z:number},ground:(x:number,z:number)=>number):boolean {
  if(Math.hypot(target.x-eye.x,target.z-eye.z)<100)return false;
  for(const t of [.25,.5,.75]){
    const x=eye.x+(target.x-eye.x)*t,z=eye.z+(target.z-eye.z)*t;
    if(ground(x,z)>eye.y+(target.y-eye.y)*t+3)return true;
  }return false;
}
