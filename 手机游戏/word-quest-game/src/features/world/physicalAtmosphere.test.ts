import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { WorldCascades, adaptExposure, makePhysicalSky, solarPosition } from "./physicalAtmosphere";
describe("physical daylight", () => {
  it("puts equinox equatorial noon overhead, dawn east and midnight below ground", () => {
    expect(solarPosition(12, 0, 81).y).toBeGreaterThan(.999);
    expect(solarPosition(6, 0, 81).x).toBeGreaterThan(.999);
    expect(solarPosition(0, 0, 81).y).toBeLessThan(-.999);
    expect(solarPosition(38).distanceTo(solarPosition(14))).toBeLessThan(1e-10);
  });
  it("adapts gradually and bounds scene cuts", () => {
    expect(adaptExposure(1, 1000, .016)).toBeGreaterThan(.99);
    let e = 1; for(let i=0;i<600;i++) e=adaptExposure(e,100,.016);
    expect(e).toBeCloseTo(.72,3);
    expect(adaptExposure(1,.001,0)).toBe(1);
    expect(adaptExposure(1,.001,.016)).toBeLessThan(1.01);
  });
  it("has Rayleigh, Mie and cloud coefficients in a disposable sky", () => {
    const sky=makePhysicalSky(900);
    expect(sky.material.uniforms.rayleigh.value).toBeGreaterThan(0);
    expect(sky.material.uniforms.mieCoefficient.value).toBeGreaterThan(0);
    expect(sky.scale.x).toBe(900);sky.geometry.dispose();sky.material.dispose();
  });
});

it("chains landscape shader hooks and releases CSM lights",()=>{
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,900);
  const mat=new THREE.MeshStandardMaterial();let called=false;
  mat.onBeforeCompile=shader=>{called=true;shader.fragmentShader+="// terrain-preserved";};
  const geometry=new THREE.BoxGeometry();scene.add(new THREE.Mesh(geometry,mat));
  const cascades=new WorldCascades(scene,camera,"med");
  const sun=new THREE.DirectionalLight(0xffffff,2);scene.add(sun);
  cascades.update(sun,solarPosition(14));
  const shader={uniforms:{},vertexShader:"",fragmentShader:""};
  mat.onBeforeCompile(shader as unknown as Parameters<THREE.Material["onBeforeCompile"]>[0],{} as THREE.WebGLRenderer);
  expect(called).toBe(true);expect(shader.fragmentShader).toContain("terrain-preserved");
  expect(shader.uniforms).toHaveProperty("CSM_cascades");expect(sun.visible).toBe(false);
  expect(cascades.csm.lights).toHaveLength(2);
  cascades.dispose();expect(scene.children.filter(o=>o instanceof THREE.DirectionalLight)).toHaveLength(1);
  geometry.dispose();mat.dispose();
});
