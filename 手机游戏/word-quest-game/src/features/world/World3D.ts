import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import type { MapNode, WordPickup } from "../../core/types";
import { createLandmarkWithCad } from "./cadLandmark";
import { createExplorerAvatar, type AvatarRig } from "./explorerAvatar";
import { ExplorerCamera } from "./ExplorerCamera";
import { glowPath, stone, water } from "./materials";
import { PlayerController } from "./PlayerController";
import { createLantern, createPine, createRock, createTree, grassBladeGeometry } from "./props";
import { createSignpost } from "./signpost";
import type { MinimapState } from "./Minimap";
import { getTheme } from "./theme";
import { DEFAULT_BIOME, getBiome, type UnitBiome } from "./unitBiome";
import { createTerrainMaps } from "./textures";
import { applyLockedStyle, disposeGroup, removeGroup, seededRand, terrainHeight } from "./utils";
import {
  INTERACT_RADIUS,
  sampleTerrainY,
  TERRAIN_ORIGIN_Y,
  TERRAIN_ORIGIN_Z,
  TERRAIN_SEGMENTS,
  TERRAIN_SIZE,
} from "./worldConfig";

/** 词汇光球靠近触发半径 */
const PICKUP_RADIUS = 5;

/** 朝向计算常量 */
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const X_AXIS = new THREE.Vector3(1, 0, 0);

export interface World3DOptions {
  onNodeClick: (nodeId: string) => void;
  onProximity?: (node: MapNode | null) => void;
  onExploreUpdate?: (state: MinimapState) => void;
  onPickupNear?: (pickup: WordPickup | null) => void;
  onPickupCollect?: (pickupId: string) => void;
}

/** 三维探险世界：走动探索 + 走近互动（原神风格单元地图） */
export class World3D {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private nodeGroups = new Map<string, THREE.Group>();
  private pickables: THREE.Object3D[] = [];
  private explorer?: THREE.Group;
  private pathGroup?: THREE.Group;
  private decorGroup?: THREE.Group;
  private waterGroup?: THREE.Group;
  private terrain?: THREE.Mesh;
  private mountains?: THREE.Group;
  private skyDome?: THREE.Mesh;
  private grassMesh?: THREE.InstancedMesh;
  private grassUniforms?: { uTime: { value: number }; uPlayer: { value: THREE.Vector3 } };
  private clouds?: THREE.Group;
  /** 脚步扬尘粒子池 */
  private dustGroup?: THREE.Group;
  private dustPool: THREE.Sprite[] = [];
  private lastStep = 0;
  private sunDisc?: THREE.Sprite;
  /** 后期处理 */
  private composer?: EffectComposer;
  private bloomPass?: UnrealBloomPass;
  /** 走路相位（驱动四肢摆动） */
  private walkPhase = 0;
  /** 角色平滑朝向与前倾 */
  private avatarYaw = 0;
  private avatarLean = 0;
  // 朝向计算复用对象（避免每帧分配）
  private readonly _n = new THREE.Vector3();
  private readonly _fwd = new THREE.Vector3();
  private readonly _right = new THREE.Vector3();
  private readonly _basis = new THREE.Matrix4();
  private readonly _q = new THREE.Quaternion();
  private readonly _leanQ = new THREE.Quaternion();
  private sun?: THREE.DirectionalLight;
  private hemi?: THREE.HemisphereLight;
  private ambientLight?: THREE.AmbientLight;
  private animId = 0;
  private paused = true;
  private clock = new THREE.Clock();
  private nodes: MapNode[] = [];
  private currentId = "";
  private onNodeClick: (nodeId: string) => void;
  private onProximity?: (node: MapNode | null) => void;
  private onExploreUpdate?: (state: MinimapState) => void;
  private onPickupNear?: (pickup: WordPickup | null) => void;
  private onPickupCollect?: (pickupId: string) => void;
  private waterMeshes: THREE.Mesh[] = [];
  private rebuildToken = 0;
  private player = new PlayerController();
  private explorerCam = new ExplorerCamera();
  private nearNode: MapNode | null = null;
  private currentBiome: UnitBiome = DEFAULT_BIOME;
  /** 词汇光球组 */
  private pickupGroup?: THREE.Group;
  private pickupMeshes = new Map<string, THREE.Group>();
  private pickupData: WordPickup[] = [];
  private nearPickup: WordPickup | null = null;

  constructor(container: HTMLElement, options: World3DOptions) {
    this.container = container;
    this.onNodeClick = options.onNodeClick;
    this.onProximity = options.onProximity;
    this.onExploreUpdate = options.onExploreUpdate;
    this.onPickupNear = options.onPickupNear;
    this.onPickupCollect = options.onPickupCollect;

    const w = container.clientWidth || 360;
    const h = container.clientHeight || 420;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x1a2540, 0.0042);

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.2, 900);
    this.camera.position.set(0, 8, 20);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.28;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    this.explorerCam.bindDrag(this.renderer.domElement);

    this.buildSky();
    this.buildClouds();
    this.buildLights();
    this.buildTerrain();
    this.buildMountains();
    this.buildGrass();
    this.buildDust();
    this.spawnExplorer();
    this.setupPostFX(w, h);
    this.bindEvents();
    this.animate();
  }

  /** 后期处理管线：泛光（Bloom）让水晶 / 光球 / 太阳产生电影级辉光 */
  private setupPostFX(w: number, h: number): void {
    try {
      const composer = new EffectComposer(this.renderer);
      composer.addPass(new RenderPass(this.scene, this.camera));

      const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.62, 0.5, 0.78);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());

      composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      composer.setSize(w, h);

      this.composer = composer;
      this.bloomPass = bloom;
    } catch {
      // 后期处理初始化失败时回退到直接渲染
      this.composer = undefined;
    }
  }

  setNodes(nodes: MapNode[], currentId: string): void {
    this.nodes = nodes;
    this.currentId = currentId;
    this.rebuildPath();
    this.rebuildDecor();
    void this.rebuildNodesAsync();
    this.teleportToNode(currentId);
  }

  resume(): void {
    this.paused = false;
    this.player.setEnabled(true);
    this.onResize();
  }

  pause(): void {
    this.paused = true;
    this.player.setEnabled(false);
  }

  /** 外部触发互动（按钮 / E 键）：优先收集光球，其次进入节点 */
  tryInteract(): boolean {
    if (this.nearPickup) {
      this.onPickupCollect?.(this.nearPickup.id);
      return true;
    }
    if (!this.nearNode?.unlocked) return false;
    this.onNodeClick(this.nearNode.id);
    return true;
  }

  /** 虚拟摇杆输入（-1～1） */
  setStickInput(x: number, z: number): void {
    this.player.setStickInput(x, z);
  }

  /** 切换生物群系主题（单元地图风格） */
  setBiome(unitId?: string): void {
    const biome = getBiome(unitId);
    this.currentBiome = biome;
    this.applyBiomeToSky(biome);
    this.applyBiomeToLights(biome);
    this.scene.fog = new THREE.FogExp2(biome.fogColor, biome.fogDensity);
  }

  /** 设置词汇光球（散布在探索地图上的收集点） */
  setPickups(pickups: WordPickup[]): void {
    this.pickupData = pickups;
    this.rebuildPickups();
  }

  /** 标记某个光球已被收集（播放消失动画并从场景移除） */
  markPickupCollected(pickupId: string): void {
    const item = this.pickupData.find((p) => p.id === pickupId);
    if (item) item.collected = true;

    const group = this.pickupMeshes.get(pickupId);
    if (group) {
      group.userData.dying = true;
      group.userData.dieTimer = 0;
    }

    if (this.nearPickup?.id === pickupId) {
      this.nearPickup = null;
      this.onPickupNear?.(null);
    }
  }

  /** 主动触发拾取最近的光球 */
  tryCollectPickup(): boolean {
    if (!this.nearPickup) return false;
    this.onPickupCollect?.(this.nearPickup.id);
    return true;
  }

  dispose(): void {
    cancelAnimationFrame(this.animId);
    this.renderer.domElement.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("resize", this.onResize);
    this.player.dispose();

    removeGroup(this.scene, this.pathGroup);
    removeGroup(this.scene, this.decorGroup);
    removeGroup(this.scene, this.waterGroup);
    removeGroup(this.scene, this.mountains);
    removeGroup(this.scene, this.clouds);
    removeGroup(this.scene, this.explorer);
    removeGroup(this.scene, this.pickupGroup);
    if (this.grassMesh) {
      this.scene.remove(this.grassMesh);
      this.grassMesh.geometry.dispose();
      (this.grassMesh.material as THREE.Material).dispose();
    }
    if (this.sunDisc) {
      this.scene.remove(this.sunDisc);
      (this.sunDisc.material as THREE.SpriteMaterial).map?.dispose();
      this.sunDisc.material.dispose();
    }
    if (this.dustGroup) {
      this.scene.remove(this.dustGroup);
      const first = this.dustPool[0]?.material as THREE.SpriteMaterial | undefined;
      first?.map?.dispose();
      for (const s of this.dustPool) (s.material as THREE.SpriteMaterial).dispose();
      this.dustPool = [];
    }
    this.composer?.dispose();
    for (const g of this.nodeGroups.values()) disposeGroup(g);
    for (const g of this.pickupMeshes.values()) disposeGroup(g);

    if (this.terrain) {
      this.terrain.geometry.dispose();
      const mat = this.terrain.material as THREE.MeshStandardMaterial;
      mat.map?.dispose();
      mat.roughnessMap?.dispose();
      mat.normalMap?.dispose();
      mat.dispose();
    }
    if (this.skyDome) {
      this.skyDome.geometry.dispose();
      (this.skyDome.material as THREE.Material).dispose();
    }
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private spawnExplorer(): void {
    removeGroup(this.scene, this.explorer);
    this.explorer = createExplorerAvatar();
    this.scene.add(this.explorer);
  }

  private teleportToNode(nodeId: string): void {
    const node = this.nodes.find((n) => n.id === nodeId) ?? this.nodes[0];
    if (!node) return;
    const y = sampleTerrainY(node.x, node.z, terrainHeight);
    this.player.setPosition(node.x + 4, y, node.z + 6);
    if (this.explorer) {
      this.explorer.position.copy(this.player.position);
      this.explorer.rotation.set(0, this.player.yaw, 0);
      this.explorer.quaternion.setFromEuler(this.explorer.rotation);
    }
    this.avatarYaw = this.player.yaw;
    this.avatarLean = 0;
    this.explorerCam.resetBehind(this.player.yaw);
    this.camera.position.set(node.x + 10, y + 7, node.z + 14);
    this.camera.lookAt(node.x, y + 1.5, node.z);
  }

  private buildSky(): void {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x3a5a8a) },
        midColor: { value: new THREE.Color(0x5a7aaa) },
        bottomColor: { value: new THREE.Color(0x0a1020) },
        offset: { value: 22 },
        exponent: { value: 0.52 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor, midColor, bottomColor;
        uniform float offset, exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          vec3 col = mix(bottomColor, midColor, smoothstep(-0.15, 0.35, h));
          col = mix(col, topColor, smoothstep(0.25, 0.95, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.skyDome = new THREE.Mesh(new THREE.SphereGeometry(560, 48, 32), mat);
    this.scene.add(this.skyDome);

    const positions = new Float32Array(2000 * 3);
    const rnd = seededRand(42);
    for (let i = 0; i < 2000; i++) {
      const r = 300 + rnd() * 80;
      const theta = rnd() * Math.PI * 2;
      const phi = rnd() * Math.PI * 0.45;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) + 30;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) + TERRAIN_ORIGIN_Z;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.scene.add(
      new THREE.Points(
        starsGeo,
        new THREE.PointsMaterial({ color: 0xe8eef8, size: 0.42, transparent: true, opacity: 0.82, sizeAttenuation: true })
      )
    );

    // 发光太阳圆盘（配合 Bloom 形成耀斑光晕）
    const sunMat = new THREE.SpriteMaterial({
      map: this.makeGlowTexture(),
      color: 0xfff0c8,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    this.sunDisc = new THREE.Sprite(sunMat);
    this.sunDisc.scale.set(90, 90, 1);
    this.scene.add(this.sunDisc);
  }

  /** 径向辉光贴图（太阳 / 光晕用） */
  private makeGlowTexture(): THREE.CanvasTexture {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.18, "rgba(255,245,210,0.95)");
    grad.addColorStop(0.5, "rgba(255,210,140,0.35)");
    grad.addColorStop(1, "rgba(255,200,120,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /** 脚步扬尘粒子池 */
  private buildDust(): void {
    const tex = this.makeCloudTexture();
    const group = new THREE.Group();
    for (let i = 0; i < 28; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        color: 0xcdbfa6,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.visible = false;
      sprite.userData = { life: 0, vx: 0, vy: 0, vz: 0 };
      group.add(sprite);
      this.dustPool.push(sprite);
    }
    this.dustGroup = group;
    this.scene.add(group);
  }

  /** 在指定位置喷出几缕扬尘 */
  private emitDust(x: number, y: number, z: number): void {
    let emitted = 0;
    for (const s of this.dustPool) {
      if ((s.userData.life as number) > 0) continue;
      s.position.set(x + (Math.random() - 0.5) * 0.2, y + 0.05, z + (Math.random() - 0.5) * 0.2);
      s.userData.life = 1;
      s.userData.vx = (Math.random() - 0.5) * 0.6;
      s.userData.vy = 0.3 + Math.random() * 0.45;
      s.userData.vz = (Math.random() - 0.5) * 0.6;
      const sc = 0.3 + Math.random() * 0.2;
      s.scale.set(sc, sc, 1);
      s.visible = true;
      (s.material as THREE.SpriteMaterial).opacity = 0.5;
      if (++emitted >= 3) break;
    }
  }

  /** 推进扬尘粒子（上飘、扩散、淡出） */
  private updateDust(dt: number): void {
    for (const s of this.dustPool) {
      const life = s.userData.life as number;
      if (life <= 0) continue;
      const next = life - dt * 1.4;
      s.userData.life = next;
      if (next <= 0) {
        s.visible = false;
        continue;
      }
      s.userData.vy = (s.userData.vy as number) - dt * 0.6;
      s.position.x += (s.userData.vx as number) * dt;
      s.position.y += (s.userData.vy as number) * dt;
      s.position.z += (s.userData.vz as number) * dt;
      (s.material as THREE.SpriteMaterial).opacity = next * 0.5;
      const sc = (1.3 - next) * 0.6 + 0.3;
      s.scale.set(sc, sc, 1);
    }
  }

  private buildLights(): void {
    this.hemi = new THREE.HemisphereLight(0xc8e0ff, 0x243828, 0.72);
    this.scene.add(this.hemi);
    this.ambientLight = new THREE.AmbientLight(0x9ab0cc, 0.32);
    this.scene.add(this.ambientLight);

    this.sun = new THREE.DirectionalLight(0xfff4e0, 1.45);
    this.sun.position.set(55, 72, 35);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(4096, 4096);
    const cam = this.sun.shadow.camera;
    cam.near = 8;
    cam.far = 340;
    cam.left = cam.bottom = -150;
    cam.right = cam.top = 150;
    this.sun.shadow.bias = -0.00035;
    this.scene.add(this.sun);

    const rim = new THREE.DirectionalLight(0x8cb4ff, 0.5);
    rim.position.set(-40, 28, -30);
    const moon = new THREE.PointLight(0xa5c8ff, 0.55, 160);
    moon.position.set(-35, 28, TERRAIN_ORIGIN_Z);
    this.scene.add(rim, moon);
  }

  /** 更新天空 shader 颜色 */
  private applyBiomeToSky(biome: UnitBiome): void {
    if (!this.skyDome) return;
    const mat = this.skyDome.material as THREE.ShaderMaterial;
    mat.uniforms.topColor.value.setHex(biome.skyTop);
    mat.uniforms.midColor.value.setHex(biome.skyMid);
    mat.uniforms.bottomColor.value.setHex(biome.skyBot);
    mat.needsUpdate = true;
  }

  /** 更新光照颜色 */
  private applyBiomeToLights(biome: UnitBiome): void {
    if (this.hemi) {
      this.hemi.color.setHex(biome.hemiSky);
      this.hemi.groundColor.setHex(biome.hemiGround);
    }
    if (this.ambientLight) this.ambientLight.color.setHex(biome.ambientColor);
    if (this.sun) {
      this.sun.color.setHex(biome.sunColor);
      this.sun.intensity = biome.sunIntensity;
    }
    if (this.sunDisc) {
      (this.sunDisc.material as THREE.SpriteMaterial).color.setHex(biome.sunColor);
    }
    // 越暗的单元（夜空 / 星际）辉光越强，强化氛围
    if (this.bloomPass) {
      this.bloomPass.strength = THREE.MathUtils.clamp(0.5 + (1.5 - biome.sunIntensity) * 0.28, 0.45, 1.05);
    }
  }

  /** 重建词汇光球 */
  private rebuildPickups(): void {
    removeGroup(this.scene, this.pickupGroup);
    this.pickupMeshes.clear();

    this.pickupGroup = new THREE.Group();

    for (const pickup of this.pickupData) {
      if (pickup.collected) continue;
      const orb = this.createPickupOrb(pickup);
      this.pickupGroup.add(orb);
      this.pickupMeshes.set(pickup.id, orb);
    }

    this.scene.add(this.pickupGroup);
  }

  /** 创建单个词汇光球 */
  private createPickupOrb(pickup: WordPickup): THREE.Group {
    const biome = this.currentBiome;
    const g = new THREE.Group();
    g.position.set(pickup.x, pickup.y, pickup.z);
    g.userData.pickupId = pickup.id;

    // 内核球
    const coreMat = new THREE.MeshStandardMaterial({
      color: biome.orbColor,
      emissive: new THREE.Color(biome.orbColor),
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.4,
      transparent: true,
      opacity: 0.92,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 10), coreMat);
    core.userData.isOrbCore = true;
    g.add(core);

    // 外层辉光壳
    const glowMat = new THREE.MeshBasicMaterial({
      color: biome.glowColor,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const glowShell = new THREE.Mesh(new THREE.SphereGeometry(0.58, 12, 8), glowMat);
    glowShell.userData.isOrbGlow = true;
    g.add(glowShell);

    // 旋转光环
    const ringGeo = new THREE.TorusGeometry(0.52, 0.04, 6, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: biome.orbColor,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.userData.isOrbRing = true;
    ring.rotation.x = Math.PI / 3;
    g.add(ring);

    // 点光源
    const light = new THREE.PointLight(biome.glowColor, 0.6, 8);
    light.userData.isOrbLight = true;
    g.add(light);

    // 文字精灵
    const sprite = this.createWordSprite(pickup.word, biome.orbColor);
    sprite.position.y = 1.1;
    sprite.userData.isWordSprite = true;
    g.add(sprite);

    // 储存基准Y用于浮动动画
    g.userData.baseY = pickup.y;
    g.userData.pickupId = pickup.id;

    return g;
  }

  /** 用 Canvas 绘制单词文字精灵 */
  private createWordSprite(word: string, color: number): THREE.Sprite {
    const c = new THREE.Color(color);
    const hex = `#${c.getHexString()}`;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 256, 64);
    ctx.fillStyle = "rgba(0,0,0,0.52)";
    ctx.roundRect?.(4, 8, 248, 48, 12);
    ctx.fill();
    ctx.font = "bold 26px 'Arial', sans-serif";
    ctx.fillStyle = hex;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = hex;
    ctx.shadowBlur = 8;
    ctx.fillText(word, 128, 34);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2.4, 0.6, 1);
    return sprite;
  }

  private buildTerrain(): void {
    const geo = new THREE.PlaneGeometry(
      TERRAIN_SIZE.width,
      TERRAIN_SIZE.depth,
      TERRAIN_SEGMENTS.w,
      TERRAIN_SEGMENTS.d
    );
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = terrainHeight(x, z);
      pos.setY(i, h);
      const g = 0.14 + Math.abs(h) * 0.06;
      colors[i * 3] = 0.07 + g * 0.55;
      colors[i * 3 + 1] = g * 0.95;
      colors[i * 3 + 2] = 0.09 + g * 0.38;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const maps = createTerrainMaps();
    this.terrain = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        map: maps.color,
        roughnessMap: maps.roughness,
        normalMap: maps.normal,
        normalScale: new THREE.Vector2(0.85, 0.85),
        vertexColors: true,
        roughness: 0.82,
        metalness: 0.06,
      })
    );
    this.terrain.receiveShadow = true;
    this.terrain.position.set(0, TERRAIN_ORIGIN_Y, TERRAIN_ORIGIN_Z);
    this.scene.add(this.terrain);
  }

  /** 远景低多边形山脉环带（提升纵深与"真实"地平线） */
  private buildMountains(): void {
    removeGroup(this.scene, this.mountains);
    const group = new THREE.Group();
    const rnd = seededRand(7);
    const ringRadius = Math.max(TERRAIN_SIZE.width, TERRAIN_SIZE.depth) * 0.5;
    const count = 30;

    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + (rnd() - 0.5) * 0.18;
      const r = ringRadius + rnd() * 40;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r + TERRAIN_ORIGIN_Z;
      const h = 42 + rnd() * 78;
      const rad = 32 + rnd() * 46;
      // 远山偏冷色，与雾气融合形成大气透视
      const shade = 0x2f3c52 + Math.floor(rnd() * 0x0a) * 0x010101;
      const mat = new THREE.MeshStandardMaterial({ color: shade, roughness: 1, metalness: 0, flatShading: true });
      const peak = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 5 + Math.floor(rnd() * 3), 1), mat);
      peak.position.set(x, h / 2 - 8, z);
      peak.rotation.y = rnd() * Math.PI;
      peak.scale.set(1, 0.8 + rnd() * 0.5, 1);
      group.add(peak);
    }

    this.mountains = group;
    this.scene.add(group);
  }

  /** 实例化草地（GPU 风吹摆动） */
  private buildGrass(): void {
    const geo = grassBladeGeometry();
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uPlayer = { value: new THREE.Vector3(0, 0, 0) };
      this.grassUniforms = shader.uniforms as { uTime: { value: number }; uPlayer: { value: THREE.Vector3 } };
      shader.vertexShader = "uniform float uTime;\nuniform vec3 uPlayer;\n" + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         float gH = position.y / 0.5;
         vec4 gWp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
         float gPh = gWp.x * 0.12 + gWp.z * 0.12;
         float gSway = sin(uTime * 1.5 + gPh) * 0.16 + sin(uTime * 2.7 + gPh * 1.6) * 0.06;
         transformed.x += gSway * gH;
         transformed.z += gSway * 0.4 * gH;
         // 角色踩踏：附近草向外侧倒伏并压低
         vec2 gToP = gWp.xz - uPlayer.xz;
         float gd = length(gToP);
         float gTramp = smoothstep(2.4, 0.5, gd);
         vec2 gDir = gToP / max(gd, 0.001);
         transformed.xz += gDir * gTramp * gH * 0.55;
         transformed.y -= gTramp * gH * 0.4;`
      );
    };

    const count = 7000;
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = true;

    const rnd = seededRand(31337);
    const dummy = new THREE.Object3D();
    let placed = 0;
    for (let i = 0; i < count; i++) {
      const x = (rnd() - 0.5) * 220;
      const z = TERRAIN_ORIGIN_Z + (rnd() - 0.5) * TERRAIN_SIZE.depth * 0.9;
      const y = sampleTerrainY(x, z, terrainHeight);
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, rnd() * Math.PI, 0);
      const s = 0.7 + rnd() * 1.2;
      dummy.scale.set(s, 0.8 + rnd() * 1.0, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(placed++, dummy.matrix);
    }
    mesh.count = placed;
    mesh.instanceMatrix.needsUpdate = true;
    this.grassMesh = mesh;
    this.scene.add(mesh);
  }

  /** 体积感云层（缓慢漂移） */
  private buildClouds(): void {
    removeGroup(this.scene, this.clouds);
    const tex = this.makeCloudTexture();
    const group = new THREE.Group();
    group.position.z = TERRAIN_ORIGIN_Z;
    const rnd = seededRand(5150);
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.42 + rnd() * 0.28,
        depthWrite: false,
        fog: false,
      });
      const sprite = new THREE.Sprite(mat);
      const a = rnd() * Math.PI * 2;
      const r = 130 + rnd() * 260;
      sprite.position.set(Math.cos(a) * r, 86 + rnd() * 70, Math.sin(a) * r);
      const sc = 70 + rnd() * 140;
      sprite.scale.set(sc, sc * (0.42 + rnd() * 0.2), 1);
      group.add(sprite);
    }
    this.clouds = group;
    this.scene.add(group);
  }

  /** 生成柔和云朵贴图 */
  private makeCloudTexture(): THREE.CanvasTexture {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    for (let i = 0; i < 26; i++) {
      const cx = size * (0.25 + Math.random() * 0.5);
      const cy = size * (0.35 + Math.random() * 0.3);
      const r = size * (0.08 + Math.random() * 0.18);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, "rgba(255,255,255,0.5)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private rebuildPath(): void {
    removeGroup(this.scene, this.pathGroup);
    this.pathGroup = new THREE.Group();
    if (this.nodes.length < 2) {
      this.scene.add(this.pathGroup);
      return;
    }

    const points = this.nodes.map((n) => new THREE.Vector3(n.x, sampleTerrainY(n.x, n.z, terrainHeight) + 0.45, n.z));
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.35);
    const steps = Math.max(points.length * 28, 80);

    for (let i = 0; i < this.nodes.length - 1; i++) {
      const a = this.nodes[i];
      const b = this.nodes[i + 1];
      const cleared = a.cleared && b.cleared;
      const ay = sampleTerrainY(a.x, a.z, terrainHeight) + 0.45;
      const by = sampleTerrainY(b.x, b.z, terrainHeight) + 0.45;
      const sub = new THREE.CatmullRomCurve3(
        [new THREE.Vector3(a.x, ay, a.z), new THREE.Vector3(b.x, by, b.z)],
        false,
        "catmullrom",
        0.4
      );

      const rail = new THREE.Mesh(
        new THREE.TubeGeometry(sub, 16, 0.48, 12, false),
        new THREE.MeshStandardMaterial({ color: cleared ? 0x4a8c72 : 0x3d4a5c, roughness: 0.68, metalness: 0.1 })
      );
      rail.receiveShadow = true;
      const glow = new THREE.Mesh(new THREE.TubeGeometry(sub, 16, 0.26, 10, false), glowPath(cleared));
      glow.position.y = 0.08;
      this.pathGroup.add(rail, glow);
    }

    for (let s = 0; s <= steps; s++) {
      const p = curve.getPoint(s / steps);
      p.y = sampleTerrainY(p.x, p.z, terrainHeight) + 0.02;
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.14, 0.6),
        stone(s % 3 === 0 ? 0x6b7280 : 0x8b939f, 0.75)
      );
      tile.position.copy(p);
      tile.rotation.y = (s / steps) * Math.PI * 4;
      tile.receiveShadow = true;
      this.pathGroup.add(tile);
    }

    this.scene.add(this.pathGroup);
  }

  private rebuildDecor(): void {
    removeGroup(this.scene, this.decorGroup);
    removeGroup(this.scene, this.waterGroup);
    this.decorGroup = new THREE.Group();
    this.waterGroup = new THREE.Group();
    this.waterMeshes = [];

    const rnd = seededRand(2024);
    const placed = new Set<string>();

    for (const node of this.nodes) {
      const rand = seededRand(node.id.length * 997 + node.z);
      for (let i = 0; i < 34; i++) {
        const angle = rand() * Math.PI * 2;
        const dist = 6 + rand() * 24;
        const wx = node.x + Math.cos(angle) * dist;
        const wz = node.z + Math.sin(angle) * dist;
        const key = `${Math.round(wx)}_${Math.round(wz)}`;
        if (placed.has(key)) continue;
        placed.add(key);

        const wy = sampleTerrainY(wx, wz, terrainHeight);
        const scale = 0.75 + rand() * 1.1;
        this.addDecorAt(node.theme, wx, wy, wz, scale, rand);
      }
    }

    // 全局零散植被 / 岩石，填充大世界（避开中央走廊保留道路）
    const scatter = seededRand(909);
    const halfW = TERRAIN_SIZE.width * 0.46;
    const halfD = TERRAIN_SIZE.depth * 0.46;
    for (let i = 0; i < 180; i++) {
      const wx = (scatter() - 0.5) * 2 * halfW;
      const wz = TERRAIN_ORIGIN_Z + (scatter() - 0.5) * 2 * halfD;
      if (Math.abs(wx) < 14) continue;
      const wy = sampleTerrainY(wx, wz, terrainHeight);
      const scale = 0.8 + scatter() * 1.5;
      if (scatter() > 0.42) {
        const tree = scatter() > 0.5 ? createPine(scale) : createTree(scale);
        tree.position.set(wx, wy, wz);
        tree.rotation.y = scatter() * Math.PI * 2;
        this.decorGroup!.add(tree);
      } else {
        const rock = createRock(scale * 0.85);
        rock.position.set(wx, wy + 0.2, wz);
        rock.rotation.set(scatter(), scatter(), scatter());
        this.decorGroup!.add(rock);
      }
    }

    // 河谷湖泊（沿两侧山脚分布）
    for (let wi = 0; wi < 12; wi++) {
      const side = wi % 2 === 0 ? -1 : 1;
      const wx = side * (60 + rnd() * 55);
      const wz = TERRAIN_ORIGIN_Z - halfD * 0.8 + wi * (halfD * 1.3 / 12) + rnd() * 18;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(44 + rnd() * 24, 28 + rnd() * 18, 18, 12), water());
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(wx, sampleTerrainY(wx, wz, terrainHeight) - 0.6, wz);
      mesh.userData.isWater = true;
      this.waterMeshes.push(mesh);
      this.waterGroup.add(mesh);
    }

    const mist = new THREE.Mesh(
      new THREE.PlaneGeometry(TERRAIN_SIZE.width + 40, TERRAIN_SIZE.depth + 40),
      new THREE.MeshBasicMaterial({ color: 0x9ec8ff, transparent: true, opacity: 0.038, depthWrite: false })
    );
    mist.rotation.x = -Math.PI / 2;
    mist.position.set(0, 5, TERRAIN_ORIGIN_Z);
    this.decorGroup.add(mist);
    this.scene.add(this.decorGroup, this.waterGroup);
  }

  private addDecorAt(theme: string, x: number, y: number, z: number, scale: number, rand: () => number): void {
    if (theme === "forest" || theme === "plains" || theme === "library") {
      const tree = rand() > 0.4 ? createPine(scale) : createTree(scale * 1.05);
      tree.position.set(x, y, z);
      tree.rotation.y = rand() * Math.PI * 2;
      this.decorGroup!.add(tree);
      return;
    }
    if (theme === "coast" && rand() > 0.45) {
      const rock = createRock(scale * 0.85);
      rock.position.set(x, y + 0.3, z);
      rock.rotation.set(rand(), rand(), rand());
      this.decorGroup!.add(rock);
      return;
    }
    if (rand() > 0.5) {
      const rock = createRock(scale * 0.65);
      rock.position.set(x, y + 0.2, z);
      this.decorGroup!.add(rock);
    }
    if (rand() > 0.65) {
      const lantern = createLantern(getTheme(theme).accent);
      lantern.position.set(x, y, z);
      this.decorGroup!.add(lantern);
    }
  }

  private async rebuildNodesAsync(): Promise<void> {
    const token = ++this.rebuildToken;

    for (const g of this.nodeGroups.values()) {
      this.scene.remove(g);
      disposeGroup(g);
    }
    this.nodeGroups.clear();
    this.pickables = [];

    for (const node of this.nodes) {
      if (token !== this.rebuildToken) return;

      const group = new THREE.Group();
      const groundY = sampleTerrainY(node.x, node.z, terrainHeight);
      group.position.set(node.x, groundY, node.z);
      group.userData.nodeId = node.id;

      const { root, crystal } = await createLandmarkWithCad(node, node.id === this.currentId);
      group.add(root);
      crystal.userData.nodeId = node.id;
      this.pickables.push(crystal);

      const sign = createSignpost(node.name, node.unlocked);
      group.add(sign);

      if (!node.unlocked) applyLockedStyle(group);
      this.nodeGroups.set(node.id, group);
      this.scene.add(group);
    }
  }

  private bindEvents(): void {
    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("resize", this.onResize);
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (this.paused) return;
    if (e.key.toLowerCase() === "e" || e.key === "Enter") {
      this.tryInteract();
    }
  };

  private onPointerDown = (e: PointerEvent): void => {
    if (this.paused) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const crystalHit = this.raycaster.intersectObjects(this.pickables, false)[0];
    const crystalId = crystalHit?.object.userData.nodeId as string | undefined;

    if (crystalId && this.nearNode?.id === crystalId && this.nearNode.unlocked) {
      this.onNodeClick(crystalId);
      return;
    }

    if (this.terrain) {
      const groundHit = this.raycaster.intersectObject(this.terrain, false)[0];
      if (groundHit) {
        this.player.setMoveTarget(groundHit.point.x, groundHit.point.z);
        if (crystalId) {
          const node = this.nodes.find((n) => n.id === crystalId);
          if (node?.unlocked) this.player.setMoveTarget(node.x + 3, node.z + 3);
        }
      }
    }
  };

  private onResize = (): void => {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer?.setSize(w, h);
  };

  private updateProximity(): void {
    let nearest: MapNode | null = null;
    let best = INTERACT_RADIUS;

    for (const node of this.nodes) {
      if (!node.unlocked) continue;
      const dx = this.player.position.x - node.x;
      const dz = this.player.position.z - node.z;
      const d = Math.hypot(dx, dz);
      if (d < best) {
        best = d;
        nearest = node;
      }
    }

    if (nearest?.id !== this.nearNode?.id) {
      this.nearNode = nearest;
      this.onProximity?.(nearest);
    }
  }

  private updatePickupProximity(): void {
    let nearestPickup: WordPickup | null = null;
    let bestDist = PICKUP_RADIUS;

    for (const pickup of this.pickupData) {
      if (pickup.collected) continue;
      const dx = this.player.position.x - pickup.x;
      const dz = this.player.position.z - pickup.z;
      const d = Math.hypot(dx, dz);
      if (d < bestDist) {
        bestDist = d;
        nearestPickup = pickup;
      }
    }

    if (nearestPickup?.id !== this.nearPickup?.id) {
      this.nearPickup = nearestPickup;
      this.onPickupNear?.(nearestPickup);
    }
  }

  private animate = (): void => {
    this.animId = requestAnimationFrame(this.animate);
    if (this.paused) return;

    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.getElapsedTime();

    const camYaw = this.explorerCam.update(this.camera, this.player.position, this.player.yaw, dt);
    this.player.update(dt, camYaw);

    if (this.explorer) {
      this.explorer.position.lerp(this.player.position, 1 - Math.exp(-14 * dt));

      // 平滑朝向角
      let yawDiff = this.player.yaw - this.avatarYaw;
      while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
      while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
      this.avatarYaw += yawDiff * Math.min(1, dt * 12);

      const walk = this.player.isMoving();
      const sprint = this.player.isSprinting();
      if (walk) {
        this.walkPhase += dt * (sprint ? 15 : 9.5);
        // 每半个步态周期落地一次 → 扬尘
        const step = Math.floor(this.walkPhase / Math.PI);
        if (step !== this.lastStep) {
          this.lastStep = step;
          const side = step % 2 === 0 ? 1 : -1;
          const rx = Math.cos(this.avatarYaw) * 0.18 * side;
          const rz = -Math.sin(this.avatarYaw) * 0.18 * side;
          this.emitDust(this.player.position.x + rx, this.player.position.y, this.player.position.z + rz);
        }
      }

      const rig = this.explorer.userData.rig as AvatarRig | undefined;
      if (rig) {
        if (walk) {
          // 屈膝步态：髋摆动 + 膝在抬腿相位弯曲
          const hipAmp = sprint ? 0.95 : 0.6;
          const kneeAmp = sprint ? 1.35 : 0.95;
          const swL = Math.sin(this.walkPhase);
          const swR = Math.sin(this.walkPhase + Math.PI);
          rig.leftLeg.hip.rotation.x = swL * hipAmp;
          rig.rightLeg.hip.rotation.x = swR * hipAmp;
          rig.leftLeg.knee.rotation.x = 0.12 + Math.max(0, -swL) * kneeAmp;
          rig.rightLeg.knee.rotation.x = 0.12 + Math.max(0, -swR) * kneeAmp;
          rig.leftArm.rotation.x = -swL * 0.8;
          rig.rightArm.rotation.x = -swR * 0.8;
          rig.head.rotation.z = 0;
          // 披风随步伐飘起
          rig.cape.rotation.x = -0.18 - (0.32 + Math.abs(Math.sin(this.walkPhase)) * 0.18) * (sprint ? 1.3 : 1);
          rig.cape.rotation.z = Math.sin(this.walkPhase * 0.5) * 0.08;
        } else {
          // 回归站姿 + 待机呼吸
          const k = Math.min(1, dt * 9);
          rig.leftLeg.hip.rotation.x *= 1 - k;
          rig.rightLeg.hip.rotation.x *= 1 - k;
          rig.leftLeg.knee.rotation.x += (0.06 - rig.leftLeg.knee.rotation.x) * k;
          rig.rightLeg.knee.rotation.x += (0.06 - rig.rightLeg.knee.rotation.x) * k;
          rig.leftArm.rotation.x *= 1 - k;
          rig.rightArm.rotation.x *= 1 - k;
          rig.head.rotation.z = Math.sin(t * 1.4) * 0.05;
          // 披风静止微摆
          rig.cape.rotation.x += (-0.2 - rig.cape.rotation.x) * k;
          rig.cape.rotation.z += (Math.sin(t * 1.1) * 0.04 - rig.cape.rotation.z) * k;
        }
      }

      // 目标前倾角度（行进 / 奔跑）
      const targetLean = walk ? (sprint ? 0.14 : 0.05) : 0;
      this.avatarLean += (targetLean - this.avatarLean) * Math.min(1, dt * 8);

      // 采样地形法线 → 角色贴地朝向（坡面对齐，告别"悬空平站"）
      const px = this.explorer.position.x;
      const pz = this.explorer.position.z;
      const e = 1.6;
      const hL = sampleTerrainY(px - e, pz, terrainHeight);
      const hR = sampleTerrainY(px + e, pz, terrainHeight);
      const hD = sampleTerrainY(px, pz - e, terrainHeight);
      const hU = sampleTerrainY(px, pz + e, terrainHeight);
      this._n.set(hL - hR, 2 * e, hD - hU).normalize();
      // 软化倾斜，避免陡坡过度倾倒
      this._n.lerp(WORLD_UP, 0.55).normalize();

      this._fwd.set(Math.sin(this.avatarYaw), 0, Math.cos(this.avatarYaw));
      this._fwd.addScaledVector(this._n, -this._fwd.dot(this._n)).normalize();
      this._right.crossVectors(this._n, this._fwd).normalize();
      this._fwd.crossVectors(this._right, this._n).normalize();
      this._basis.makeBasis(this._right, this._n, this._fwd);
      this._q.setFromRotationMatrix(this._basis);
      this._leanQ.setFromAxisAngle(X_AXIS, this.avatarLean);
      this._q.multiply(this._leanQ);
      this.explorer.quaternion.slerp(this._q, 1 - Math.exp(-12 * dt));

      const bob = walk ? Math.abs(Math.sin(this.walkPhase)) * 0.06 : Math.sin(t * 1.4) * 0.01;
      this.explorer.position.y = this.player.position.y + bob;

      const footRing = this.explorer.children.find((c) => (c as THREE.Mesh).userData?.isFootRing) as THREE.Mesh | undefined;
      if (footRing) {
        const s = walk ? 1 + Math.sin(this.walkPhase) * 0.08 : 1;
        footRing.scale.set(s, s, s);
        (footRing.material as THREE.MeshBasicMaterial).opacity = walk ? 0.45 : 0.28;
      }
    }

    this.updateProximity();
    this.updatePickupProximity();
    this.updateDust(dt);
    this.tickScene(t);
    this.onExploreUpdate?.({
      playerX: this.player.position.x,
      playerZ: this.player.position.z,
      nodes: this.nodes,
      nearNodeId: this.nearNode?.id,
      pickups: this.pickupData,
    });
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  };

  private tickScene(t: number): void {
    // 昼夜循环：太阳沿天空划过，亮度 / 曝光 / 天光随之变化
    if (this.sun) {
      const day = t * 0.03; // 完整循环约 210s
      const sx = Math.sin(day) * 72;
      const sy = 36 + Math.cos(day) * 46; // 约 -10 ~ 82
      this.sun.position.set(sx, Math.max(5, sy), 35);
      const daylight = THREE.MathUtils.clamp((sy + 8) / 90, 0.18, 1);
      this.sun.intensity = this.currentBiome.sunIntensity * (0.32 + daylight * 0.68);
      this.renderer.toneMappingExposure = 1.05 + daylight * 0.3;
      if (this.hemi) this.hemi.intensity = 0.38 + daylight * 0.5;

      // 太阳圆盘跟随光源方向（置于远空），夜间淡出
      if (this.sunDisc) {
        this.sunDisc.position.set(sx * 4.2, this.sun.position.y * 4.2, this.sun.position.z * 4.2 + TERRAIN_ORIGIN_Z);
        (this.sunDisc.material as THREE.SpriteMaterial).opacity = THREE.MathUtils.clamp(daylight * 1.2, 0, 1);
      }
    }

    // 草地风吹 + 角色踩踏
    if (this.grassUniforms) {
      this.grassUniforms.uTime.value = t;
      this.grassUniforms.uPlayer.value.copy(this.player.position);
    }

    // 云层缓慢漂移
    if (this.clouds) this.clouds.rotation.y = t * 0.006;

    // 词汇光球动画
    for (const [id, group] of this.pickupMeshes) {
      const isNear = this.nearPickup?.id === id;
      const baseY = group.userData.baseY as number ?? group.position.y;

      // 消亡动画
      if (group.userData.dying) {
        group.userData.dieTimer = (group.userData.dieTimer as number ?? 0) + 0.04;
        const p = group.userData.dieTimer as number;
        group.scale.setScalar(1 - p * 0.9);
        group.position.y = baseY + p * 3;
        group.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.material && "opacity" in m.material) (m.material as THREE.Material & { opacity: number }).opacity *= 0.85;
        });
        if (p >= 1) {
          this.pickupGroup?.remove(group);
          this.pickupMeshes.delete(id);
        }
        continue;
      }

      // 浮动动画
      group.position.y = baseY + Math.sin(t * 1.4 + id.length * 0.5) * 0.28;

      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.userData?.isOrbCore) {
          mesh.rotation.y = t * 0.8 + id.length;
          const sc = isNear ? 1 + Math.sin(t * 4) * 0.15 : 1 + Math.sin(t * 2) * 0.06;
          mesh.scale.setScalar(sc);
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = isNear ? 3.5 + Math.sin(t * 5) * 0.8 : 1.8 + Math.sin(t * 2) * 0.3;
        }
        if (mesh.userData?.isOrbGlow) {
          (mesh.material as THREE.MeshBasicMaterial).opacity = isNear
            ? 0.42 + Math.sin(t * 3) * 0.15
            : 0.18 + Math.sin(t * 1.5) * 0.06;
        }
        if (mesh.userData?.isOrbRing) {
          mesh.rotation.z = t * 1.2 + id.length * 0.3;
          mesh.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.2;
          (mesh.material as THREE.MeshBasicMaterial).opacity = isNear ? 0.8 : 0.45;
        }
        if (mesh.userData?.isOrbLight) {
          const light = mesh as unknown as THREE.PointLight;
          light.intensity = isNear ? 1.4 + Math.sin(t * 4) * 0.4 : 0.6 + Math.sin(t * 2) * 0.1;
        }
        if (mesh.userData?.isWordSprite) {
          const sprite = mesh as unknown as THREE.Sprite;
          sprite.material.opacity = isNear ? 1.0 : 0.72 + Math.sin(t * 1.2) * 0.12;
        }
      });
    }

    for (const [id, group] of this.nodeGroups) {
      const isNear = this.nearNode?.id === id;
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.userData?.isCrystal) {
          if (mesh.userData.baseY === undefined) mesh.userData.baseY = mesh.position.y;
          mesh.rotation.y = t * 0.6 + id.length * 0.3;
          mesh.position.y = mesh.userData.baseY + Math.sin(t * 1.8 + id.length) * (isNear ? 0.28 : 0.15);
        }
        if (mesh.userData?.isPulse) {
          const s = 1 + Math.sin(t * 3) * 0.08;
          mesh.scale.set(s, s, s);
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.35 + Math.sin(t * 3) * 0.2;
        }
        if (mesh.userData?.isDueRing) {
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.28 + Math.sin(t * 2.4 + id.length) * 0.18;
        }
      });
    }

    for (const w of this.waterMeshes) {
      if (w.userData.baseY === undefined) w.userData.baseY = w.position.y;
      w.position.y = w.userData.baseY + Math.sin(t * 0.9 + w.position.x) * 0.07;
      (w.material as THREE.MeshPhysicalMaterial).opacity = 0.68 + Math.sin(t * 0.7) * 0.08;

      // 顶点涟漪
      const geo = w.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      if (!w.userData.flat) w.userData.flat = Float32Array.from(pos.array as Float32Array);
      const flat = w.userData.flat as Float32Array;
      for (let i = 0; i < pos.count; i++) {
        const ox = flat[i * 3];
        const oy = flat[i * 3 + 1];
        const ripple =
          Math.sin(ox * 0.22 + t * 1.7) * 0.12 +
          Math.cos(oy * 0.27 + t * 1.25) * 0.1;
        pos.setZ(i, ripple);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }
  }
}
