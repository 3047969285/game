import * as THREE from "three";
import type { SceneKit } from "../../world/sceneProps";

/** Fine furniture grain, without the large plank gaps used by exterior lumber. */
export function interiorWood(color: number, roughness = .64): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });
  mat.name = "memory-interior-wood";
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vInteriorP;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvInteriorP = transformed;");
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
        varying vec3 vInteriorP;
        float iwHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float iwNoise(vec2 p){
          vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
          return mix(mix(iwHash(i),iwHash(i+vec2(1,0)),f.x),mix(iwHash(i+vec2(0,1)),iwHash(i+vec2(1,1)),f.x),f.y);
        }
      `)
      .replace("#include <color_fragment>", `#include <color_fragment>
        vec2 iwP = vec2(vInteriorP.x, vInteriorP.z+vInteriorP.y*.17);
        float iwWarp = iwNoise(iwP*vec2(1.7,4.0))*.8;
        float iwGrain = iwNoise(iwP*vec2(.8,95.0)+iwWarp)-.5;
        float iwFine = iwNoise(iwP*vec2(2.7,235.0)+iwWarp*2.0)-.5;
        float iwBroad = iwNoise(iwP*vec2(.5,8.0))-.5;
        float iwFilter = 1.0-smoothstep(.5,1.8,fwidth(iwP.y*95.0));
        diffuseColor.rgb *= 1.0+iwBroad*.06+(iwGrain*.13+iwFine*.04)*iwFilter;
      `);
  };
  mat.customProgramCacheKey = () => "memory-interior-wood-v1";
  return mat;
}

export function interiorKit(kit: SceneKit): SceneKit {
  return { ...kit, m: { ...kit.m, wood: interiorWood(0x96724d), woodDark: interiorWood(0x624a34,.74) } };
}

/** Fine wall grain instead of large cracks and chipped patches. */
export function interiorPlaster(side: THREE.Side): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({ color: 0xe3d8c4, roughness: .93, side });
  mat.name = "memory-interior-plaster";
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vPlasterP;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvPlasterP = transformed;");
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vPlasterP;")
      .replace("#include <color_fragment>", `#include <color_fragment>
        float ipMottle = sin(vPlasterP.x*1.7+vPlasterP.y*.8)*sin(vPlasterP.z*2.1+vPlasterP.y*1.3);
        diffuseColor.rgb *= .99 + .01*ipMottle;
      `);
  };
  mat.customProgramCacheKey = () => "memory-interior-plaster-v1";
  return mat;
}
