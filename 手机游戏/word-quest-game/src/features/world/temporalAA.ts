import * as THREE from "three";
import { Pass, FullScreenQuad } from "three/addons/postprocessing/Pass.js";

/** Depth-reprojected HDR history with neighborhood clamp and disocclusion rejection.
 * No object velocity buffer: animated foliage relies on clamping, not velocity reprojection.
 */
export class TemporalAA extends Pass {
  private history = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
  private copy = new THREE.ShaderMaterial({ uniforms: { tex: { value: this.history.texture } }, vertexShader: vertex,
    fragmentShader: 'uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=vec4(texture2D(tex,vUv).rgb,1.0);}' });
  private resolve = new THREE.ShaderMaterial({ uniforms: {
    current: { value: null }, history: { value: this.history.texture }, depth: { value: null },
    inverseVP: { value: new THREE.Matrix4() }, previousVP: { value: new THREE.Matrix4() },
    resolution: { value: new THREE.Vector2(1,1) }, valid: { value: 0 },
  }, vertexShader: vertex, fragmentShader: `
    uniform sampler2D current,history,depth;
    uniform mat4 inverseVP,previousVP;uniform vec2 resolution;uniform float valid;varying vec2 vUv;
    void main(){
      float z=texture2D(depth,vUv).r;
      vec4 world=inverseVP*vec4(vUv*2.0-1.0,z*2.0-1.0,1.0);world/=world.w;
      vec4 old=previousVP*world;vec3 oldNdc=old.xyz/old.w;vec2 uv=oldNdc.xy*.5+.5;
      vec3 c=texture2D(current,vUv).rgb,lo=c,hi=c;
      for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){
        vec3 n=texture2D(current,vUv+vec2(float(x),float(y))/resolution).rgb;lo=min(lo,n);hi=max(hi,n);
      }
      vec4 h=texture2D(history,clamp(uv,vec2(0.0),vec2(1.0)));
      float allowed=valid*step(0.0,uv.x)*step(uv.x,1.0)*step(0.0,uv.y)*step(uv.y,1.0)*step(0.0,old.w);
      allowed*=1.0-step(.0015,abs(h.a-(oldNdc.z*.5+.5)));
      float motion=length((uv-vUv)*resolution);
      float blend=allowed*.72/(1.0+motion*.12);
      gl_FragColor=vec4(mix(c,clamp(h.rgb,lo,hi),blend),z);
    }` });
  private quad = new FullScreenQuad(this.resolve);
  private resolved = new THREE.WebGLRenderTarget(1,1,{ type:THREE.HalfFloatType,depthBuffer:false });
  private vp = new THREE.Matrix4();
  private previousPosition = new THREE.Vector3(Infinity,0,0);
  private previousRotation = new THREE.Quaternion();
  private frame = 0;
  constructor(private camera: THREE.PerspectiveCamera, private depthSource: () => THREE.DepthTexture | null) { super(); }
  setSize(w:number,h:number):void {
    this.history.setSize(w,h);this.resolved.setSize(w,h);this.resolve.uniforms.resolution.value.set(w,h);this.reset();
  }
  reset():void { this.resolve.uniforms.valid.value=0;this.frame=0; }
  /** Subpixel jitter is restored immediately after rendering the scene. */
  jitter(width:number,height:number):void {
    const i=(this.frame++%8)+1;
    this.camera.setViewOffset(width,height,halton(i,2)-.5,halton(i,3)-.5,width,height);
  }
  render(renderer:THREE.WebGLRenderer,write:THREE.WebGLRenderTarget,read:THREE.WebGLRenderTarget):void {
    this.camera.updateMatrixWorld();
    this.vp.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse);
    if(this.previousPosition.distanceToSquared(this.camera.position)>9 || this.previousRotation.angleTo(this.camera.quaternion)>.35)this.reset();
    const u=this.resolve.uniforms;
    u.current.value=read.texture;u.depth.value=this.depthSource();
    u.inverseVP.value.copy(this.vp).invert();
    this.quad.material=this.resolve;renderer.setRenderTarget(this.resolved);this.quad.render(renderer);
    // Swap history; copying only RGB prevents stored depth alpha escaping into bloom.
    const tmp=this.history;this.history=this.resolved;this.resolved=tmp;
    u.history.value=this.history.texture;this.copy.uniforms.tex.value=this.history.texture;
    this.quad.material=this.copy;renderer.setRenderTarget(this.renderToScreen?null:write);this.quad.render(renderer);
    u.previousVP.value.copy(this.vp);u.valid.value=1;
    this.previousPosition.copy(this.camera.position);this.previousRotation.copy(this.camera.quaternion);
    this.camera.clearViewOffset();
  }
  dispose():void {this.history.dispose();this.resolved.dispose();this.copy.dispose();this.resolve.dispose();this.quad.dispose();}
}
const vertex='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
export function halton(index:number,base:number):number {let f=1,r=0;while(index>0){f/=base;r+=f*(index%base);index=Math.floor(index/base);}return r;}
