import * as THREE from "three";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

/** Eight-step height-density integration in world metres. Screen-depth visibility
 * masks the forward Mie shaft; off-screen shadow occlusion is not reconstructed. */
export function createAerialPerspective(camera: THREE.PerspectiveCamera, scene: THREE.Scene, depth: () => THREE.DepthTexture | null): ShaderPass {
  const pass=new ShaderPass({uniforms:{tDiffuse:{value:null},tDepth:{value:null},inverseProjection:{value:camera.projectionMatrixInverse},
    cameraWorld:{value:camera.matrixWorld},eye:{value:camera.position},sun:{value:new THREE.Vector3(.4,.7,-.4).normalize()},
    fogColor:{value:new THREE.Color(.45,.62,.8)},density:{value:.0008}},
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:`uniform sampler2D tDiffuse,tDepth;uniform mat4 inverseProjection,cameraWorld;uniform vec3 eye,sun,fogColor;uniform float density;varying vec2 vUv;
    void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;float z=texture2D(tDepth,vUv).r;
      vec4 p=inverseProjection*vec4(vUv*2.0-1.0,z*2.0-1.0,1.0);p/=p.w;
      vec3 end=(cameraWorld*p).xyz;vec3 ray=end-eye;float distance_=min(length(ray),450.0);vec3 direction=normalize(ray);
      float optical=0.0;for(int i=0;i<8;i++){vec3 s=eye+direction*distance_*(float(i)+.5)/8.0;optical+=exp(-max(s.y,0.0)/32.0)*distance_/8.0;}
      float extinction=1.0-exp(-optical*density);float mu=dot(direction,sun);float g=.72;
      float phase=(1.0-g*g)/pow(max(.05,1.0+g*g-2.0*g*mu),1.5);
      vec3 scatter=fogColor*(.7+.18*min(phase,6.0));
      if(z>.99999)extinction*=.2;
      gl_FragColor=vec4(mix(c,scatter,clamp(extinction,0.0,.65)),1.0);
    }`});
  const render=pass.render.bind(pass);
  pass.render=(renderer,write,read,dt,mask)=>{
    pass.uniforms.tDepth.value=depth();
    const fog=scene.fog as THREE.FogExp2| null;
    if(fog){pass.uniforms.fogColor.value.copy(fog.color);pass.uniforms.density.value=Math.min(.004,fog.density*.22);}
    render(renderer,write,read,dt,mask);
  };
  return pass;
}
