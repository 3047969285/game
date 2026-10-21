import * as THREE from 'three';
import type {VegetationInstance} from './vegetationPlan';

/** Static scene broad phase; triangle tests preserve real doorways and stairs. */
export class WorldCollision {
  private cells=new Map<string,THREE.Mesh[]>();
  private ray=new THREE.Raycaster();
  private hits:THREE.Intersection[]=[];
  private candidates:THREE.Mesh[]=[];
  private unique=new Set<THREE.Mesh>();
  private normal=new THREE.Vector3();
  private matrix=new THREE.Matrix3();
  private direction=new THREE.Vector3();
  private origin=new THREE.Vector3();
  private remaining=new THREE.Vector3();
  private readonly radius=.32;
  private proxies:THREE.Mesh[]=[];
  private trunkGeometry=new THREE.CylinderGeometry(1,1,1,8);
  private trunkMaterial=new THREE.MeshStandardMaterial();
  setVegetation(instances:readonly VegetationInstance[]):void {
    this.proxies=instances.filter(i=>i.kind!=='bush').map(i=>{
      const rock=i.kind==='rock',radius=(rock?.65:.28)*i.scale,height=(rock?1.1:5)*i.scale;
      const mesh=new THREE.Mesh(this.trunkGeometry,this.trunkMaterial);mesh.scale.set(radius,height,radius);mesh.position.set(i.x,i.y+height/2,i.z);return mesh;
    });
  }
  dispose():void {this.cells.clear();this.proxies=[];this.trunkGeometry.dispose();this.trunkMaterial.dispose();}
  constructor(private readonly terrain:(x:number,z:number)=>number){}
  rebuild(roots:readonly THREE.Object3D[]):void {
    this.cells.clear();const box=new THREE.Box3();
    for(const root of [...roots,...this.proxies]){root.updateWorldMatrix(true,true);root.traverse(object=>{
      if(!(object instanceof THREE.Mesh)||object instanceof THREE.SkinnedMesh||object instanceof THREE.InstancedMesh||object instanceof THREE.BatchedMesh)return;
      if(!object.visible||object.userData.isCrystal||object.userData.isOrbCore||object.userData.noCollision||object.userData.isWater||object.geometry.attributes.aSway)return;
      const materials=Array.isArray(object.material)?object.material:[object.material];
      if(materials.every(m=>m.userData.waterViewId!==undefined||m.alphaTest>.1||!(m instanceof THREE.MeshStandardMaterial)||((m.transparent||m.opacity<.85)&&!(m instanceof THREE.MeshPhysicalMaterial))))return;
      if(!object.geometry.boundingBox)object.geometry.computeBoundingBox();
      box.copy(object.geometry.boundingBox!).applyMatrix4(object.matrixWorld);
      if(![box.min.x,box.min.y,box.min.z,box.max.x,box.max.y,box.max.z].every(Number.isFinite)||Math.abs(box.min.x)>1e6||Math.abs(box.min.z)>1e6||box.isEmpty()||box.max.x-box.min.x>150||box.max.z-box.min.z>150)return;
      for(let x=Math.floor(box.min.x/12);x<=Math.floor(box.max.x/12);x++)for(let z=Math.floor(box.min.z/12);z<=Math.floor(box.max.z/12);z++){
        const key=`${x},${z}`,cell=this.cells.get(key);if(cell)cell.push(object);else this.cells.set(key,[object]);
      }
    });}
  }
  private query(x:number,z:number,range:number):THREE.Mesh[]{
    this.unique.clear();this.candidates.length=0;
    if(![x,z,range].every(Number.isFinite))return this.candidates;
    range=Math.min(96,Math.max(0,range));
    for(let a=Math.floor((x-range)/12);a<=Math.floor((x+range)/12);a++)for(let b=Math.floor((z-range)/12);b<=Math.floor((z+range)/12);b++){
      for(const mesh of this.cells.get(`${a},${b}`)??[])if(!this.unique.has(mesh)){this.unique.add(mesh);this.candidates.push(mesh);}
    }
    return this.candidates;
  }
  private cast(origin:THREE.Vector3,direction:THREE.Vector3,far:number,meshes:THREE.Mesh[]):THREE.Intersection[]{
    this.ray.set(origin,direction);this.ray.near=0;this.ray.far=far;this.hits.length=0;this.ray.intersectObjects(meshes,false,this.hits);return this.hits;
  }
  ground(x:number,z:number,previousY:number):number {
    const terrain=this.terrain(x,z),meshes=this.query(x,z,.4);
    this.origin.set(x,Math.max(terrain,previousY)+.38,z);this.direction.set(0,-1,0);
    for(const hit of this.cast(this.origin,this.direction,Math.max(3,previousY-terrain+1),meshes)){
      if(!hit.face)continue;this.normal.copy(hit.face.normal).applyMatrix3(this.matrix.getNormalMatrix(hit.object.matrixWorld)).normalize();
      if(this.normal.y>.65&&hit.point.y>=terrain-.05&&hit.point.y<=previousY+.36)return Math.max(terrain,hit.point.y);
    }
    return terrain;
  }
  /** Substeps prevent sprint tunneling; project blocked movement along the wall. */
  move(start:THREE.Vector3,delta:THREE.Vector3,out:THREE.Vector3):void {
    out.copy(start);if(![delta.x,delta.z,start.x,start.y,start.z].every(Number.isFinite))return;const steps=Math.max(1,Math.ceil(Math.hypot(delta.x,delta.z)/.18));
    for(let step=0;step<steps;step++){
      this.remaining.set(delta.x/steps,0,delta.z/steps);
      for(let slide=0;slide<3&&this.remaining.lengthSq()>1e-8;slide++){
        const distance=this.remaining.length();this.direction.copy(this.remaining).divideScalar(distance);
        const meshes=this.query(out.x,out.z,distance+this.radius);
        let nearest=distance,blocked=false;const nx=this.direction.z,nz=-this.direction.x;
        for(const [height,offset]of [[.38,0],[.95,0],[1.55,0],[.95,this.radius],[.95,-this.radius]]){
          this.origin.set(out.x+nx*offset,out.y+height,out.z+nz*offset);
          for(const hit of this.cast(this.origin,this.direction,distance+this.radius,meshes)){
            if(!hit.face)continue;
            const normal=hit.face.normal.clone().applyMatrix3(this.matrix.getNormalMatrix(hit.object.matrixWorld)).normalize();
            if(Math.abs(normal.y)>.65)continue;
            const travel=Math.max(0,hit.distance-this.radius-.015);
            if(travel<nearest){nearest=travel;this.normal.copy(normal);blocked=true;}break;
          }
        }
        out.addScaledVector(this.direction,nearest);
        if(!blocked)break;
        this.remaining.addScaledVector(this.direction,-nearest);this.normal.y=0;this.normal.normalize();
        this.remaining.addScaledVector(this.normal,-this.remaining.dot(this.normal));
      }
      out.y=this.ground(out.x,out.z,out.y);
    }
  }
  clipCamera(target:THREE.Vector3,position:THREE.Vector3):void {
    this.direction.copy(position).sub(target);const distance=this.direction.length();if(distance<.01)return;
    this.direction.divideScalar(distance);const meshes=this.query(target.x,target.z,distance);
    const hit=this.cast(target,this.direction,distance,meshes)[0];
    if(hit)position.copy(target).addScaledVector(this.direction,Math.max(.3,hit.distance-.25));
  }
}
