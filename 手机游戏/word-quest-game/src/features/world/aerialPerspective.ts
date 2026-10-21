import * as THREE from "three";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

/** Eight-step height-density integration with cascaded shadow visibility. */
export function createAerialPerspective(camera: THREE.PerspectiveCamera, scene: THREE.Scene, depth: () => THREE.DepthTexture | null): ShaderPass {
  const fallback=new THREE.DepthTexture(1,1,THREE.UnsignedIntType);fallback.compareFunction=THREE.LessEqualCompare;fallback.needsUpdate=true;
  const pass=new ShaderPass({uniforms:{tDiffuse:{value:null},tDepth:{value:null},inverseProjection:{value:camera.projectionMatrixInverse},
    cameraWorld:{value:camera.matrixWorld},eye:{value:camera.position},sun:{value:new THREE.Vector3(.4,.7,-.4).normalize()},
    shadow0:{value:fallback},shadow1:{value:fallback},shadow2:{value:fallback},
    shadowMatrix0:{value:new THREE.Matrix4()},shadowMatrix1:{value:new THREE.Matrix4()},shadowMatrix2:{value:new THREE.Matrix4()},
    shadowCount:{value:0},sunEnergy:{value:0},
    fogColor:{value:new THREE.Color(.45,.62,.8)},density:{value:.0008}},
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:`uniform sampler2D tDiffuse,tDepth;uniform mat4 inverseProjection,cameraWorld;uniform vec3 eye,sun,fogColor;uniform float density;varying vec2 vUv;
    uniform highp sampler2DShadow shadow0,shadow1,shadow2;
    uniform mat4 shadowMatrix0,shadowMatrix1,shadowMatrix2;uniform float shadowCount,sunEnergy;
    bool insideShadow(vec3 p){return p.x>=0.0&&p.x<=1.0&&p.y>=0.0&&p.y<=1.0&&p.z>=0.0&&p.z<=1.0;}
    float visibility(vec3 world){
      vec4 a=shadowMatrix0*vec4(world,1.0);vec3 p=a.xyz/a.w;
      if(shadowCount>.5&&insideShadow(p))return texture(shadow0,vec3(p.xy,p.z-.0004));
      a=shadowMatrix1*vec4(world,1.0);p=a.xyz/a.w;
      if(shadowCount>1.5&&insideShadow(p))return texture(shadow1,vec3(p.xy,p.z-.0004));
      a=shadowMatrix2*vec4(world,1.0);p=a.xyz/a.w;
      if(shadowCount>2.5&&insideShadow(p))return texture(shadow2,vec3(p.xy,p.z-.0004));
      return 1.0;
    }
    void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;float z=texture2D(tDepth,vUv).r;
      vec4 p=inverseProjection*vec4(vUv*2.0-1.0,z*2.0-1.0,1.0);p/=p.w;
      vec3 end=(cameraWorld*p).xyz;vec3 ray=end-eye;float distance_=min(length(ray),450.0);vec3 direction=normalize(ray);
      float optical=0.0,illuminated=0.0;for(int i=0;i<8;i++){vec3 s=eye+direction*distance_*(float(i)+.5)/8.0;float column=exp(-max(s.y,0.0)/32.0)*distance_/8.0;optical+=column;illuminated+=column*visibility(s);}
      float extinction=1.0-exp(-optical*density);float mu=dot(direction,sun);float g=.72;
      float phase=(1.0-g*g)/pow(max(.05,1.0+g*g-2.0*g*mu),1.5);
      vec3 scatter=fogColor*(.7+.18*min(phase,6.0)*sunEnergy*illuminated/max(optical,.001));
      if(z>.99999)extinction*=.2;
      gl_FragColor=vec4(mix(c,scatter,clamp(extinction,0.0,.65)),1.0);
    }`});
  const valid:THREE.DirectionalLight[]=[];
  const render=pass.render.bind(pass);
  pass.render=(renderer,write,read,dt,mask)=>{
    pass.uniforms.tDepth.value=depth();
    const lights=(scene.userData.atmosphereShadows??[]) as THREE.DirectionalLight[];
    valid.length=0;if(renderer.shadowMap.enabled)for(const light of lights)if(light.shadow.map?.depthTexture)valid.push(light);
    pass.uniforms.shadowCount.value=valid.length;
    for(let i=0;i<3;i++){const light=valid[i]??valid[0];pass.uniforms[`shadow${i}`].value=light?.shadow.map?.depthTexture??fallback;
      if(light)pass.uniforms[`shadowMatrix${i}`].value.copy(light.shadow.matrix);
    }
    const sun=scene.userData.atmosphereSun as THREE.DirectionalLight|undefined;
    if(sun){pass.uniforms.sun.value.copy(sun.position).sub(sun.target.position).normalize();pass.uniforms.sunEnergy.value=Math.min(1,sun.intensity/2);}
    const fog=scene.fog as THREE.FogExp2| null;
    if(fog){pass.uniforms.fogColor.value.copy(fog.color);pass.uniforms.density.value=Math.min(.004,fog.density*.22);}
    render(renderer,write,read,dt,mask);
  };
  const dispose=pass.dispose.bind(pass);pass.dispose=()=>{fallback.dispose();dispose();};
  return pass;
}
