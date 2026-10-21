import * as THREE from 'three';
/** A camera-relative height cache for GPU precipitation; 2 m snap avoids rebuilding every frame. */
export class WeatherHeightField {
  readonly texture:THREE.DataTexture;
  readonly box=new THREE.Vector4(0,0,1,1);
  private lastX=Infinity;private lastZ=Infinity;
  constructor(private sample:(x:number,z:number)=>number,private span=44,private size=32){
    this.texture=new THREE.DataTexture(new Uint16Array(size*size),size,size,THREE.RedFormat,THREE.HalfFloatType);
    this.texture.minFilter=this.texture.magFilter=THREE.LinearFilter;this.texture.generateMipmaps=false;
  }
  update(x:number,z:number):boolean {
    const cx=Math.round(x/2)*2,cz=Math.round(z/2)*2;
    if(cx===this.lastX&&cz===this.lastZ)return false;
    this.lastX=cx;this.lastZ=cz;const ox=cx-this.span/2,oz=cz-this.span/2;
    this.box.set(ox,oz,1/this.span,1/this.span);
    const data=this.texture.image.data as Uint16Array;
    for(let j=0;j<this.size;j++)for(let i=0;i<this.size;i++)data[j*this.size+i]=THREE.DataUtils.toHalfFloat(this.sample(ox+(i+.5)/this.size*this.span,oz+(j+.5)/this.size*this.span));
    this.texture.needsUpdate=true;return true;
  }
  dispose():void{this.texture.dispose();}
}
