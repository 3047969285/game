import * as THREE from "three";
import type { QualityTier } from "../world/postPipeline";
import type { StageBounds } from "./stages/types";

/** Sparse, sunlit room dust: one draw call, fixed buffers, no lights or audio. */
export class MemoryAir {
  readonly object: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  private disposed = false;
  constructor(bounds: StageBounds, quality: QualityTier, private readonly reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true) {
    const count = quality === "low" ? 80 : quality === "med" ? 160 : 240;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let state = 20261020;
    const rand = (): number => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
    for (let i = 0; i < count; i++) {
      // Concentrate near the window without filling the whole screen with glitter.
      positions[i*3] = THREE.MathUtils.lerp(Math.max(bounds.minX, -3), Math.min(bounds.maxX, 3), rand());
      positions[i*3+1] = .25 + rand()*2.6;
      positions[i*3+2] = THREE.MathUtils.lerp(bounds.minZ+.25, Math.min(bounds.maxZ, .8), rand());
      seeds[i] = rand();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.computeBoundingSphere();
    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uScale: { value: 500 } },
      vertexShader: `
        attribute float aSeed;
        uniform float uTime, uScale;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.x += sin(uTime*.13+aSeed*29.)*.085;
          p.y += sin(uTime*.19+aSeed*17.)*.07;
          p.z += cos(uTime*.11+aSeed*31.)*.065;
          vec4 mv = modelViewMatrix * vec4(p,1.);
          gl_Position = projectionMatrix*mv;
          gl_PointSize = clamp((.012+aSeed*.012)*uScale/max(.2,-mv.z),1.,7.);
          vAlpha = (.18+.24*aSeed)*smoothstep(.4,1.5,-mv.z);
        }`,
      fragmentShader: `
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          float r = length(gl_PointCoord-.5)*2.;
          float a = (1.-smoothstep(.12,1.,r))*vAlpha*uOpacity;
          if(a<.003) discard;
          gl_FragColor = vec4(vec3(.84,.92,1.),a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
      transparent: true, depthWrite: false, blending: THREE.NormalBlending,
    });
    this.object = new THREE.Points(geometry, material);
    this.object.name = "memory-window-dust";
    this.object.raycast = () => undefined;
    this.object.visible = false;
  }
  update(time: number, visibility: number, heightPx: number, fov: number): void {
    if (this.disposed) return;
    const u = this.object.material.uniforms;
    u.uTime.value = this.reduced ? 0 : time;
    u.uOpacity.value = THREE.MathUtils.smoothstep(visibility, .15, .85) * .65;
    u.uScale.value = heightPx/(2*Math.tan(THREE.MathUtils.degToRad(fov)/2));
    this.object.visible = u.uOpacity.value > .001;
  }
  dispose(): void {
    if(this.disposed) return;
    this.disposed = true;
    this.object.removeFromParent();
    this.object.geometry.dispose(); this.object.material.dispose();
  }
}
