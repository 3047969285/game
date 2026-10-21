import * as THREE from 'three';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { adaptExposure } from './physicalAtmosphere';
/** 16-point log-luminance meter; one asynchronous byte read every 24 frames. */
export class MeteredOutputPass extends OutputPass {
  private meter=new THREE.WebGLRenderTarget(1,1,{depthBuffer:false});
  private mat=new THREE.ShaderMaterial({uniforms:{tex:{value:null}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:`uniform sampler2D tex;void main(){float l=0.0;for(int x=0;x<4;x++)for(int y=0;y<4;y++){vec3 c=texture2D(tex,(vec2(float(x),float(y))+.5)/4.0).rgb;l+=log2(max(.0001,dot(c,vec3(.2126,.7152,.0722))));}gl_FragColor=vec4(clamp((l/16.0+12.0)/24.0,0.0,1.0),0.0,0.0,1.0);}`});
  private quad=new FullScreenQuad(this.mat);
  private counter=0;private luminance=.22;private exposure=1;private pending=false;private alive=true;
  render(renderer:THREE.WebGLRenderer,write:THREE.WebGLRenderTarget,read:THREE.WebGLRenderTarget,dt:number):void {
    if(this.counter++%24===0&&!this.pending){this.mat.uniforms.tex.value=read.texture;renderer.setRenderTarget(this.meter);this.quad.render(renderer);
      const bytes=new Uint8Array(4);this.pending=true;
      void renderer.readRenderTargetPixelsAsync(this.meter,0,0,1,1,bytes).then(()=>{if(this.alive)this.luminance=Math.pow(2,bytes[0]/255*24-12);}).catch(()=>{}).finally(()=>{this.pending=false;});
    }
    this.exposure=adaptExposure(this.exposure,this.luminance,dt||1/60);
    const base=renderer.toneMappingExposure;renderer.toneMappingExposure=base*this.exposure;
    try{super.render(renderer,write,read,dt,false);}finally{renderer.toneMappingExposure=base;}
  }
  dispose():void{this.alive=false;this.meter.dispose();this.mat.dispose();this.quad.dispose();super.dispose();}
}
