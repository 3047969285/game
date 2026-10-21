import * as THREE from "three";
import { Sky } from "three/addons/objects/Sky.js";
import { CSM } from "three/addons/csm/CSM.js";
import type { QualityTier } from "./postPipeline";

/** Solar time (not civil timezone time), day of year 1..366. Y up, +Z south. */
export function solarPosition(hour: number, latitude = 31.2, day = 172): THREE.Vector3 {
  const lat = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(latitude, -89, 89));
  const dec = THREE.MathUtils.degToRad(23.44) * Math.sin(2 * Math.PI * (284 + day) / 365);
  const angle = ((hour % 24 + 24) % 24 - 12) * Math.PI / 12;
  return new THREE.Vector3(-Math.cos(dec) * Math.sin(angle),
    Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(angle),
    Math.sin(lat) * Math.cos(dec) * Math.cos(angle) - Math.cos(lat) * Math.sin(dec)).normalize();
}

/** Frame-rate independent adaptation, bounded to prevent flashes after cuts. */
export function adaptExposure(current: number, luminance: number, dt: number): number {
  const target = THREE.MathUtils.clamp(0.22 / Math.max(.01, luminance), .72, 1.35);
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-Math.max(0, Math.min(dt, .1)) / (target < current ? .9 : 2.4)));
}

export function makePhysicalSky(far: number): Sky {
  const sky = new Sky();
  sky.name = "physical-rayleigh-mie-sky";
  sky.material.fragmentShader = sky.material.fragmentShader.replace("vec4( texColor, 1.0 )", "vec4( texColor * 0.16, 1.0 )");
  sky.scale.setScalar(far);
  sky.frustumCulled = false;
  const u = sky.material.uniforms;
  u.turbidity.value = 2.5;
  u.rayleigh.value = 1.25;
  u.mieCoefficient.value = .004;
  u.mieDirectionalG.value = .78;
  u.sunPosition.value.copy(solarPosition(14)).multiplyScalar(450000);
  u.cloudScale.value = .0015;
  u.cloudCoverage.value = .25;
  u.cloudDensity.value = .55;
  // Scattering stays linear HDR until the shared OutputPass.
  return sky;
}

/** CSM setup must chain existing terrain / foliage shader hooks. */
export class WorldCascades {
  readonly csm: CSM;
  private known = new WeakSet<THREE.Material>();
  private scanned = 0;
  private projection = "";
  constructor(private scene: THREE.Scene, private camera: THREE.PerspectiveCamera, tier: QualityTier) {
    this.csm = new CSM({ camera, parent: scene, cascades: tier === "high" ? 3 : 2,
      mode: "practical", maxFar: tier === "high" ? 150 : 90, shadowMapSize: tier === "high" ? 2048 : 1024,
      lightDirection: solarPosition(14).negate(), lightIntensity: 1, lightNear: .1, lightFar: 650,
      shadowBias: -.00005, lightMargin: 160 });
    this.csm.fade = true;
    for (const light of this.csm.lights) { light.shadow.normalBias = .018; light.shadow.radius = 2; }
  }
  update(sun: THREE.DirectionalLight, direction: THREE.Vector3): void {
    if (this.scanned++ % 30 === 0) this.scene.traverse(o => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
        if (!(material instanceof THREE.MeshStandardMaterial) || this.known.has(material)) continue;
        this.known.add(material);
        const hook = material.onBeforeCompile, key = material.customProgramCacheKey.bind(material);
        this.csm.setupMaterial(material);
        const csmHook = material.onBeforeCompile;
        material.onBeforeCompile = function(shader, renderer) { csmHook.call(this, shader, renderer); hook.call(this, shader, renderer); };
        material.customProgramCacheKey = () => `${key()}|world-csm-${this.csm.cascades}`;
        material.needsUpdate = true;
        material.addEventListener("dispose", () => this.csm.shaders.delete(material));
      }
    });
    const projection = `${this.camera.aspect}/${this.camera.fov}/${this.camera.far}`;
    if (projection !== this.projection) { this.projection = projection; this.csm.updateFrustums(); }
    this.csm.lightDirection.copy(direction).negate();
    for (const light of this.csm.lights) { light.color.copy(sun.color); light.intensity = sun.intensity; }
    // Original sun remains a colour/intensity controller, not an additional light.
    sun.visible = false;
    this.camera.updateMatrixWorld();
    this.csm.update();
  }
  setShadowSize(size:number):void {
    if(this.csm.shadowMapSize===size)return;
    this.csm.shadowMapSize=size;
    for(const light of this.csm.lights){light.shadow.map?.dispose();light.shadow.map=null;light.shadow.mapSize.set(size,size);light.shadow.needsUpdate=true;}
    this.csm.updateFrustums();
  }
  dispose(): void { this.csm.remove(); this.csm.dispose(); }
}
