import * as THREE from "three";
import { Timer } from "three/src/core/Timer.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { Reflector } from "three/addons/objects/Reflector.js";
import type { MapNode, WordPickup } from "../../core/types";
import { loadAvatarGlb, loadModelsManifest } from "./ModelLoader";

type QualityTier = "high" | "med" | "low";

interface QualityConfig {
  /** 渲染像素比上限 */
  pixelRatio: number;
  /** 草叶实例数量 */
  grass: number;
  /** 镜面反射湖泊数量（0 表示关闭反射，使用普通水面） */
  reflectors: number;
  /** 反射渲染目标分辨率 */
  reflectRes: number;
  /** 反射启用的玩家距离阈值 */
  reflectDist: number;
  /** 阴影贴图尺寸 */
  shadowMap: number;
  /** 是否启用泛光后期 */
  bloom: boolean;
  /** 泛光内部分辨率系数 */
  bloomScale: number;
}

const QUALITY_PRESETS: Record<QualityTier, QualityConfig> = {
  high: { pixelRatio: 2, grass: 7000, reflectors: 3, reflectRes: 512, reflectDist: 300, shadowMap: 2048, bloom: true, bloomScale: 1 },
  med: { pixelRatio: 1.5, grass: 3800, reflectors: 2, reflectRes: 384, reflectDist: 220, shadowMap: 1536, bloom: true, bloomScale: 0.66 },
  low: { pixelRatio: 1, grass: 1600, reflectors: 0, reflectRes: 256, reflectDist: 160, shadowMap: 1024, bloom: false, bloomScale: 0.5 },
};

/** 依据设备能力推断画质档位 */
function detectQuality(): QualityTier {
  if (typeof window === "undefined") return "med";
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const small = Math.min(window.innerWidth, window.innerHeight) < 540;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const mobile = coarse || small;
  if (mobile && (cores <= 4 || mem <= 3)) return "low";
  if (mobile) return "med";
  if (cores <= 4 || mem <= 4) return "med";
  return "high";
}
import { createLandmarkWithCad } from "./cadLandmark";
import { createExplorerAvatar, type AvatarRig } from "./explorerAvatar";
import { ExplorerCamera } from "./ExplorerCamera";
import { glowPath, lanternGlass, lanternMetal, makeLanternGlowTexture, mossyStone, water } from "./materials";
import { PlayerController } from "./PlayerController";
import { createLantern, createPine, createRock, createTree, grassBladeGeometry } from "./props";
import { createSignpost } from "./signpost";
import type { MinimapBiomePalette, MinimapState } from "./Minimap";
import { getTheme } from "./theme";
import { DEFAULT_BIOME, getBiome, type UnitBiome } from "./unitBiome";
import { createReadableGroundMap, createTerrainMaps } from "./textures";
import { applyLockedStyle, disposeGroup, removeGroup, seededRand, terrainHeight } from "./utils";
import { buildUnitLandscape, isFocusedLearningWorld } from "./unitLandscape";
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
  private resizeObserver?: ResizeObserver;
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
  private terrainMaps?: ReturnType<typeof createTerrainMaps>;
  private readableGroundMap?: THREE.Texture;
  private mountains?: THREE.Group;
  private skyDome?: THREE.Mesh;
  private grassMesh?: THREE.InstancedMesh;
  private grassUniforms?: { uTime: { value: number }; uPlayer: { value: THREE.Vector3 } };
  private clouds?: THREE.Group;
  /** 当前读写3单元专属的空间骨架 */
  private unitLandscape?: THREE.Group;
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
  /** 表情与眨眼 */
  private expression: "neutral" | "happy" | "surprised" = "neutral";
  private blinkTimer = 2;
  private blink = 0;
  /** GLB 角色（存在时替代程序化人形） */
  private usingGlb = false;
  private mixer?: THREE.AnimationMixer;
  private glbIdle?: THREE.AnimationAction;
  private glbWalk?: THREE.AnimationAction;
  private glbClips?: THREE.AnimationClip[];
  private glbEmoting = false;
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
  /** 页面进入后台时记住原状态，回到前台后只恢复原本正在运行的世界。 */
  private pausedBeforeVisibility = true;
  private spectatorMode = false;
  private clock = new Timer();
  /** 帧率自适应 */
  private _fpsTs = 0;
  private _fpsFrames = 0;
  private _fpsAdapted = false;
  private nodes: MapNode[] = [];
  private currentId = "";
  private onNodeClick: (nodeId: string) => void;
  private onProximity?: (node: MapNode | null) => void;
  private onExploreUpdate?: (state: MinimapState) => void;
  private onPickupNear?: (pickup: WordPickup | null) => void;
  private onPickupCollect?: (pickupId: string) => void;
  private waterMeshes: THREE.Mesh[] = [];
  private reflectors: Reflector[] = [];
  /** 画质分级（按设备能力自适应，兼顾精细与流畅） */
  private readonly quality: QualityTier = detectQuality();
  private readonly qcfg: QualityConfig = QUALITY_PRESETS[this.quality];
  /**
   * Three.js 会把可见点光源 / 聚光灯展开成材质 uniforms。地图节点、灯笼和词汇光球
   * 数量一多，WebGL1 / 移动端很容易超过 MAX_FRAGMENT_UNIFORM_VECTORS。只保留玩家
   * 周围的动态灯光，既保留局部氛围，也让课程地图规模不再决定着色器是否能编译。
   */
  private readonly dynamicLightLimit = this.quality === "low" ? 5 : this.quality === "med" ? 8 : 12;
  private dynamicLightBudgetFrames = 30;
  private readonly _lightPosition = new THREE.Vector3();
  private rebuildToken = 0;
  private player = new PlayerController();
  private explorerCam = new ExplorerCamera();
  private nearNode: MapNode | null = null;
  private currentBiome: UnitBiome = DEFAULT_BIOME;
  private activeUnitId?: string;
  /** 当前单元内的子世界焦点，未进入子世界时为 hub。 */
  private activeWorldId?: string;
  private activeWorldTitle?: string;
  /** 词汇光球组 */
  private pickupGroup?: THREE.Group;
  private pickupMeshes = new Map<string, THREE.Group>();
  private pickupData: WordPickup[] = [];
  private nearPickup: WordPickup | null = null;
  /** 小地图不需要跟随每一帧重绘，降低移动端主线程压力。 */
  private lastExploreUpdateAt = 0;
  private waterFrame = 0;

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

    this.renderer = new THREE.WebGLRenderer({
      antialias: this.quality !== "low",
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.qcfg.pixelRatio));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
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
  }

  /** 后期处理管线：泛光（Bloom）让水晶 / 光球 / 太阳产生电影级辉光 */
  private setupPostFX(w: number, h: number): void {
    if (!this.qcfg.bloom) {
      this.composer = undefined;
      return;
    }
    try {
      const composer = new EffectComposer(this.renderer);
      composer.addPass(new RenderPass(this.scene, this.camera));

      const bs = this.qcfg.bloomScale;
      const bloom = new UnrealBloomPass(new THREE.Vector2(w * bs, h * bs), 0.62, 0.5, 0.78);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());

      composer.setPixelRatio(Math.min(window.devicePixelRatio, this.qcfg.pixelRatio));
      composer.setSize(w, h);

      this.composer = composer;
      this.bloomPass = bloom;
    } catch {
      // 后期处理初始化失败时回退到直接渲染
      this.composer = undefined;
    }
  }

  setNodes(nodes: MapNode[], currentId: string, showNodeLandmarks = true): void {
    this.nodes = nodes;
    this.currentId = currentId;
    this.rebuildPath();
    this.rebuildDecor();
    if (showNodeLandmarks) {
      void this.rebuildNodesAsync();
    } else {
      this.rebuildToken++;
      for (const group of this.nodeGroups.values()) {
        this.scene.remove(group);
        disposeGroup(group);
      }
      this.nodeGroups.clear();
      this.pickables = [];
    }
    this.teleportToNode(currentId);
    this.updateDynamicLightBudget(true);
  }

  resume(): void {
    if (!this.paused) return;
    this.paused = false;
    this.player.setEnabled(!this.spectatorMode);
    this.onResize();
    if (!this.animId) this.animate();
  }

  pause(): void {
    this.paused = true;
    this.player.setEnabled(false);
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = 0;
    }
  }

  private onVisibilityChange = (): void => {
    if (document.hidden) {
      this.pausedBeforeVisibility = this.paused;
      this.pause();
      return;
    }
    if (!this.pausedBeforeVisibility) this.resume();
  };

  /** 世界观赏模式：保留镜头拖拽，但不要求角色移动。 */
  setSpectatorMode(enabled: boolean): void {
    this.spectatorMode = enabled;
    this.player.setStickInput(0, 0);
    this.player.setEnabled(!enabled && !this.paused);
    if (this.explorer) this.explorer.visible = !enabled;
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
    this.activeUnitId = unitId;
    this.activeWorldId = undefined;
    this.activeWorldTitle = undefined;
    const biome = getBiome(unitId);
    this.currentBiome = biome;
    if (this.grassMesh) this.grassMesh.visible = biome.decorStyle !== "space";
    this.applyBiomeToSky(biome);
    this.applyBiomeToLights(biome);
    this.applyBiomeToTerrain(biome, false);
    this.applyOutfitFromBiome(biome);
    this.scene.fog = new THREE.FogExp2(biome.fogColor, biome.fogDensity);
  }

  /** 切换单元内部子世界的空间焦点，不改变单元入口和词汇探索数据。 */
  setSubWorld(worldId?: string, title?: string): void {
    if (this.activeWorldId === worldId && this.activeWorldTitle === title) return;
    this.activeWorldId = worldId;
    this.activeWorldTitle = title;
    this.applyBiomeToTerrain(this.currentBiome, isFocusedLearningWorld(worldId));
    if (this.grassMesh) {
      this.grassMesh.visible = this.currentBiome.decorStyle !== "space" && !isFocusedLearningWorld(worldId);
    }
    if (this.bloomPass) {
      this.bloomPass.strength = isFocusedLearningWorld(worldId)
        ? 0.2
        : THREE.MathUtils.clamp(0.5 + (1.5 - this.currentBiome.sunIntensity) * 0.28, 0.45, 1.05);
    }
    if (this.activeUnitId && this.nodes.length > 0) {
      this.rebuildUnitLandscape();
      if (isFocusedLearningWorld(worldId)) {
        const node = this.nodes.find((item) => item.id === this.currentId) ?? this.nodes[0];
        if (node) {
          const y = sampleTerrainY(node.x, node.z, terrainHeight);
          this.player.yaw = 0;
          this.player.setPosition(node.x, y, node.z + 2.5);
          this.avatarYaw = 0;
          this.explorerCam.resetBehind(0);
        }
      }
    }
  }

  /** 角色换装：以颜色为镶边 / 披风主色（GLB 角色则做辉光染色） */
  setOutfitAccent(accent: number): void {
    const rig = this.explorer?.userData.rig as AvatarRig | undefined;
    if (rig) {
      rig.mats.trim.color.setHex(accent);
      rig.mats.trim.emissive.setHex(accent).multiplyScalar(0.4);
      rig.mats.cape.color.setHex(accent);
      rig.mats.cape.emissive.setHex(accent).multiplyScalar(0.35);
      return;
    }
    if (this.usingGlb && this.explorer) {
      this.explorer.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
        if (mesh.isMesh && mat && "emissive" in mat) {
          mat.emissive.setHex(accent).multiplyScalar(0.45);
        }
      });
    }
  }

  /** 设置表情：neutral / happy / surprised（GLB 角色映射为机器人情绪动作） */
  setExpression(kind: "neutral" | "happy" | "surprised"): void {
    this.expression = kind;
    if (this.usingGlb) this.playGlbEmote(kind);
  }

  /** GLB 角色情绪动作：happy→Wave，surprised→Jump，neutral→回到 idle */
  private playGlbEmote(kind: "neutral" | "happy" | "surprised"): void {
    if (!this.mixer || !this.glbClips || !this.glbIdle) return;
    const name = kind === "happy" ? "Wave" : kind === "surprised" ? "Jump" : null;
    if (!name) {
      this.glbEmoting = false;
      this.glbIdle.reset().fadeIn(0.3).play();
      return;
    }
    const clip = this.glbClips.find((c) => c.name === name);
    if (!clip) return;

    const act = this.mixer.clipAction(clip);
    act.setLoop(THREE.LoopOnce, 1);
    act.clampWhenFinished = false;
    act.reset().play();
    this.glbWalk?.setEffectiveWeight(0);
    this.glbIdle.crossFadeTo(act, 0.2, false);
    this.glbEmoting = true;

    const onFinished = (e: { action: THREE.AnimationAction }): void => {
      if (e.action !== act) return;
      this.glbEmoting = false;
      act.crossFadeTo(this.glbIdle!.reset().play(), 0.3, false);
      this.mixer?.removeEventListener("finished", onFinished as never);
    };
    this.mixer.addEventListener("finished", onFinished as never);
  }

  /** 依据生物群系自动换装 */
  private applyOutfitFromBiome(biome: UnitBiome): void {
    this.setOutfitAccent(biome.crystalColor);
  }

  /** 由当前生物群系换算小地图配色 */
  private minimapPalette(): MinimapBiomePalette {
    const b = this.currentBiome;
    const [r, g, bl] = b.terrainTint;
    const ground = (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(bl * 255);
    const highland =
      (Math.min(255, Math.round(r * 255) + 70) << 16) |
      (Math.min(255, Math.round(g * 255) + 80) << 8) |
      Math.min(255, Math.round(bl * 255) + 60);
    return { ground, highland, path: b.pathColor };
  }

  /** 草叶 LOD：每 30 帧把玩家 65 m 外的实例缩为 0，近处恢复 */
  private updateGrassLOD(): void {
    const mesh = this.grassMesh;
    if (!mesh?.userData.grassPositions) return;
    const frame: number = (mesh.userData.lodFrame ?? 0) + 1;
    mesh.userData.lodFrame = frame;
    if (frame % 30 !== 0) return;   // 30 帧刷新一次

    const pos = mesh.userData.grassPositions as Float32Array;
    const scales = mesh.userData.grassScales as Float32Array;
    const count = mesh.count;
    const px = this.player.position.x;
    const pz = this.player.position.z;
    const SHOW_SQ = 65 * 65;
    const dummy = new THREE.Object3D();
    let dirty = false;
    for (let i = 0; i < count; i++) {
      const dx = pos[i * 3] - px;
      const dz = pos[i * 3 + 2] - pz;
      const near = dx * dx + dz * dz < SHOW_SQ;
      const cur = scales[i];
      const want: number = near ? 1 : 0;
      if (cur === want) continue;
      scales[i] = want;
      mesh.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      if (want === 0) {
        dummy.scale.setScalar(0);
      } else {
        // 恢复原始缩放（从位置数组重建）
        const s = 0.7 + ((Math.abs(pos[i * 3] * 7919 + pos[i * 3 + 2] * 3571) % 1000) / 1000) * 1.2;
        dummy.scale.set(s, 0.8 + ((Math.abs(pos[i * 3 + 1] * 6271) % 1000) / 1000), s);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      dirty = true;
    }
    if (dirty) mesh.instanceMatrix.needsUpdate = true;
  }

  /** 释放镜面反射的渲染目标 */
  private disposeReflectors(): void {
    for (const r of this.reflectors) {
      r.getRenderTarget().dispose();
      r.geometry.dispose();
      (r.material as THREE.Material).dispose();
    }
    this.reflectors = [];
  }

  /** 表情 + 眨眼动画 */
  private updateFace(rig: AvatarRig, dt: number): void {
    // 眨眼计时
    this.blinkTimer -= dt;
    if (this.blinkTimer <= 0) {
      this.blink = 1;
      this.blinkTimer = 2.4 + Math.random() * 3.2;
    }
    this.blink = Math.max(0, this.blink - dt * 9);
    const eyeScaleY = 1 - this.blink * 0.85;
    rig.eyeL.scale.y = eyeScaleY;
    rig.eyeR.scale.y = eyeScaleY;

    // 靠近站点 / 光球时自动微笑
    const eff = this.nearNode || this.nearPickup ? "happy" : this.expression;

    let browY = 0.37;
    let mouthSX = 1;
    let mouthSY = 1;
    let mouthY = 0.2;
    if (eff === "happy") {
      browY = 0.39;
      mouthSX = 1.5;
      mouthSY = 0.85;
      mouthY = 0.188;
    } else if (eff === "surprised") {
      browY = 0.42;
      mouthSX = 0.7;
      mouthSY = 2.4;
      mouthY = 0.192;
    }

    const k = Math.min(1, dt * 8);
    rig.brow.position.y += (browY - rig.brow.position.y) * k;
    rig.mouth.scale.x += (mouthSX - rig.mouth.scale.x) * k;
    rig.mouth.scale.y += (mouthSY - rig.mouth.scale.y) * k;
    rig.mouth.position.y += (mouthY - rig.mouth.position.y) * k;
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
    this.animId = 0;
    this.renderer.domElement.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.resizeObserver?.disconnect();
    this.player.dispose();

    removeGroup(this.scene, this.pathGroup);
    removeGroup(this.scene, this.decorGroup);
    removeGroup(this.scene, this.waterGroup);
    removeGroup(this.scene, this.mountains);
    removeGroup(this.scene, this.clouds);
    removeGroup(this.scene, this.unitLandscape);
    removeGroup(this.scene, this.explorer);
    this.removePickupGroup();
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
    this.disposeReflectors();
    this.mixer?.stopAllAction();
    this.composer?.dispose();
    for (const g of this.nodeGroups.values()) disposeGroup(g);
    this.pickupMeshes.clear();

    if (this.terrain) {
      this.terrain.geometry.dispose();
      const mat = this.terrain.material as THREE.MeshStandardMaterial;
      for (const map of new Set([mat.map, this.readableGroundMap])) map?.dispose();
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
    this.explorer.visible = !this.spectatorMode;
    this.applyOutfitFromBiome(this.currentBiome);
    void this.tryLoadGlbAvatar();
  }

  /** 尝试加载真实 GLB 角色模型，存在则替换程序化人形 */
  private async tryLoadGlbAvatar(): Promise<void> {
    try {
      const manifest = await loadModelsManifest();
      const cfg = manifest?.world?.avatar;
      if (!manifest || !cfg) return;
      const loaded = await loadAvatarGlb(cfg.file, cfg, manifest);
      if (!loaded) return;

      // 替换为 GLB 角色
      removeGroup(this.scene, this.explorer);
      this.explorer = loaded.group;
      this.explorer.position.copy(this.player.position);
      this.explorer.quaternion.setFromEuler(new THREE.Euler(0, this.avatarYaw, 0));
      this.scene.add(this.explorer);
      this.usingGlb = true;

      if (loaded.clips.length) {
        this.mixer = new THREE.AnimationMixer(this.explorer);
        this.glbClips = loaded.clips;
        const idleClip =
          loaded.clips.find((c) => /idle|stand|breath/i.test(c.name)) ?? loaded.clips[0];
        this.glbIdle = this.mixer.clipAction(idleClip);
        this.glbIdle.play();
        const walkClip = loaded.clips.find((c) => /walk|run|move/i.test(c.name));
        if (walkClip) {
          this.glbWalk = this.mixer.clipAction(walkClip);
          this.glbWalk.play();
          this.glbWalk.setEffectiveWeight(0);
        }
      }
    } catch {
      // 失败则保留程序化人形
    }
  }

  private teleportToNode(nodeId: string): void {
    const node = this.nodes.find((n) => n.id === nodeId) ?? this.nodes[0];
    if (!node) return;
    const y = sampleTerrainY(node.x, node.z, terrainHeight);
    // 角色站在入口后方，镜头朝入口方向看，避免出生时把学习圣所放到镜头背面。
    this.player.yaw = 0;
    this.player.setPosition(node.x + 4, y, node.z - 8);
    if (this.explorer) {
      this.explorer.position.copy(this.player.position);
      this.explorer.rotation.set(0, this.player.yaw, 0);
      this.explorer.quaternion.setFromEuler(this.explorer.rotation);
    }
    this.avatarYaw = this.player.yaw;
    this.avatarLean = 0;
    this.explorerCam.resetBehind(this.player.yaw);
    this.camera.position.set(node.x + 10, y + 7, node.z - 16);
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
    this.sunDisc.scale.set(52, 52, 1);
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
    this.sun.shadow.mapSize.set(this.qcfg.shadowMap, this.qcfg.shadowMap);
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
    moon.userData.isGlobalLight = true;
    this.scene.add(rim, moon);
  }

  /**
   * 限制当前场景参与材质编译的动态灯光数量。
   *
   * 不能只在创建时截断：玩家移动后，远处的灯应当熄灭，近处的灯应当恢复。这里保留
   * 所有对象和动画，只切换 visible，避免反复创建 / 销毁灯光导致额外的 GPU 编译抖动。
   */
  private updateDynamicLightBudget(force = false): void {
    if (!force && ++this.dynamicLightBudgetFrames < 30) return;
    this.dynamicLightBudgetFrames = 0;

    const candidates: Array<{ light: THREE.PointLight | THREE.SpotLight; distance: number }> = [];
    this.scene.traverse((object) => {
      const candidate = object as THREE.Object3D & {
        isPointLight?: boolean;
        isSpotLight?: boolean;
        isLight?: boolean;
      };
      if (candidate.userData.isGlobalLight || !candidate.isLight || (!candidate.isPointLight && !candidate.isSpotLight)) {
        return;
      }

      const light = candidate as THREE.PointLight | THREE.SpotLight;
      light.getWorldPosition(this._lightPosition);
      candidates.push({
        light,
        distance: this._lightPosition.distanceToSquared(this.player.position),
      });
    });

    candidates.sort((a, b) => a.distance - b.distance);
    for (let i = 0; i < candidates.length; i++) {
      candidates[i].light.visible = i < this.dynamicLightLimit;
    }
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
      const sunDiscScale = biome.sunDiscScale ?? 52;
      this.sunDisc.scale.set(sunDiscScale, sunDiscScale, 1);
    }
    // 越暗的单元（夜空 / 星际）辉光越强，强化氛围
    if (this.bloomPass) {
      this.bloomPass.strength = THREE.MathUtils.clamp(0.5 + (1.5 - biome.sunIntensity) * 0.28, 0.45, 1.05);
    }
  }

  /** 让地面颜色跟随单元主题，避免所有单元都像同一块绿色平面。 */
  private applyBiomeToTerrain(biome: UnitBiome, focusedWorld: boolean): void {
    if (!this.terrain) return;
    const [r, g, b] = biome.terrainTint;
    const material = this.terrain.material as THREE.MeshStandardMaterial;
    const nextMap = this.readableGroundMap ?? null;
    const materialVariantChanged = material.map !== nextMap || material.vertexColors;
    material.map = nextMap;
    material.vertexColors = false;
    if (focusedWorld) {
      // Keep subtle surface detail in reading scenes without restoring the hub's dark grass palette.
      material.color.setRGB(
        THREE.MathUtils.clamp(0.28 + r * 0.34, 0.26, 0.48),
        THREE.MathUtils.clamp(0.28 + g * 0.34, 0.26, 0.46),
        THREE.MathUtils.clamp(0.29 + b * 0.32, 0.27, 0.44)
      );
      material.roughness = 0.94;
      material.metalness = 0.02;
    } else {
      material.color.setRGB(
        THREE.MathUtils.clamp(0.27 + r * 0.8, 0.28, 0.58),
        THREE.MathUtils.clamp(0.28 + g * 0.62, 0.3, 0.58),
        THREE.MathUtils.clamp(0.29 + b * 0.72, 0.3, 0.6)
      );
      material.roughness = 0.9;
      material.metalness = 0.02;
    }
    if (materialVariantChanged) material.needsUpdate = true;
  }

  /** 重建词汇光球 */
  private rebuildPickups(): void {
    this.removePickupGroup();
    this.pickupMeshes.clear();

    this.pickupGroup = new THREE.Group();

    for (const pickup of this.pickupData) {
      if (pickup.collected) continue;
      const orb = this.createPickupOrb(pickup);
      this.pickupGroup.add(orb);
      this.pickupMeshes.set(pickup.id, orb);
    }

    this.scene.add(this.pickupGroup);
    this.updateDynamicLightBudget(true);
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

  /** 释放词汇光球专属资源（包含每个单词精灵独立创建的 CanvasTexture）。 */
  private disposePickupResources(group: THREE.Group): void {
    disposeGroup(group);
  }

  /** 从场景移除当前词汇光球组，避免重建时遗留 GPU 资源。 */
  private removePickupGroup(): void {
    if (!this.pickupGroup) return;
    this.scene.remove(this.pickupGroup);
    this.disposePickupResources(this.pickupGroup);
    this.pickupGroup = undefined;
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

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = terrainHeight(x, z);
      pos.setY(i, h);
    }
    geo.computeVertexNormals();

    this.terrainMaps = createTerrainMaps();
    this.readableGroundMap = createReadableGroundMap();
    this.terrain = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: this.readableGroundMap,
        roughnessMap: this.terrainMaps.roughness,
        normalMap: this.terrainMaps.normal,
        normalScale: new THREE.Vector2(0.85, 0.85),
        vertexColors: false,
        roughness: 0.82,
        metalness: 0.06,
      })
    );
    this.terrain.receiveShadow = true;
    this.terrain.position.set(0, TERRAIN_ORIGIN_Y, TERRAIN_ORIGIN_Z);
    this.scene.add(this.terrain);
    this.applyBiomeToTerrain(this.currentBiome, false);
  }

  /** 远景低多边形山脉环带（大气透视 + 雪顶） */
  private buildMountains(): void {
    removeGroup(this.scene, this.mountains);
    const group = new THREE.Group();
    const rnd = seededRand(7);
    const ringRadius = Math.max(TERRAIN_SIZE.width, TERRAIN_SIZE.depth) * 0.5;
    const count = this.quality === "low" ? 18 : this.quality === "med" ? 24 : 30;
    const snow = this.quality !== "low";

    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + (rnd() - 0.5) * 0.18;
      const r = ringRadius + rnd() * 40;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r + TERRAIN_ORIGIN_Z;
      const h = 42 + rnd() * 78;
      const rad = 32 + rnd() * 46;
      const shade = 0x2f3c52 + Math.floor(rnd() * 0x0a) * 0x010101;
      const mat = new THREE.MeshStandardMaterial({
        color: shade,
        roughness: 1,
        metalness: 0,
        flatShading: true,
        fog: true,
      });
      const peak = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 5 + Math.floor(rnd() * 3), 1), mat);
      peak.position.set(x, h / 2 - 8, z);
      peak.rotation.y = rnd() * Math.PI;
      peak.scale.set(1, 0.8 + rnd() * 0.5, 1);
      group.add(peak);

      // 高画质：远山雪顶
      if (snow && h > 70) {
        const capH = h * (0.18 + rnd() * 0.12);
        const cap = new THREE.Mesh(
          new THREE.ConeGeometry(rad * 0.42, capH, 5, 1),
          new THREE.MeshStandardMaterial({ color: 0xd8e8f8, roughness: 0.95, metalness: 0, flatShading: true, fog: true })
        );
        cap.position.set(x, h - capH * 0.35 - 8, z);
        cap.rotation.y = peak.rotation.y;
        group.add(cap);
      }
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

    const count = this.qcfg.grass;
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    // 开启视锥剔除（Three.js 会对 InstancedMesh 做整体包围盒检测）
    mesh.frustumCulled = true;
    mesh.castShadow = false;
    mesh.receiveShadow = true;

    const rnd = seededRand(31337);
    const dummy = new THREE.Object3D();
    // 预存所有草叶的世界坐标，用于运行时 LOD 剔除
    const grassPositions: Float32Array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (rnd() - 0.5) * 220;
      const z = TERRAIN_ORIGIN_Z + (rnd() - 0.5) * TERRAIN_SIZE.depth * 0.9;
      const y = sampleTerrainY(x, z, terrainHeight);
      grassPositions[i * 3] = x;
      grassPositions[i * 3 + 1] = y;
      grassPositions[i * 3 + 2] = z;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, rnd() * Math.PI, 0);
      const s = 0.7 + rnd() * 1.2;
      dummy.scale.set(s, 0.8 + rnd() * 1.0, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.count = count;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.grassPositions = grassPositions;
    mesh.userData.grassScales = new Float32Array(count).fill(1);
    mesh.userData.lodFrame = 0;
    this.grassMesh = mesh;
    mesh.visible = this.currentBiome.decorStyle !== "space";
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

    const unitRoute = Boolean(this.activeUnitId);
    const routePairs: Array<readonly [MapNode, MapNode]> = unitRoute
      ? this.nodes.slice(1).map((node) => [this.nodes[0], node] as const)
      : this.nodes.slice(0, -1).map((node, index) => [node, this.nodes[index + 1]] as const);
    const points = this.nodes.map((node) =>
      new THREE.Vector3(node.x, sampleTerrainY(node.x, node.z, terrainHeight) + 0.45, node.z)
    );
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.35);
    const steps = Math.max(points.length * 28, 80);
    const routeCurves: THREE.CatmullRomCurve3[] = [];

    for (const [a, b] of routePairs) {
      const cleared = a.cleared && b.cleared;
      const ay = sampleTerrainY(a.x, a.z, terrainHeight) + 0.45;
      const by = sampleTerrainY(b.x, b.z, terrainHeight) + 0.45;
      const sub = new THREE.CatmullRomCurve3(
        [new THREE.Vector3(a.x, ay, a.z), new THREE.Vector3(b.x, by, b.z)],
        false,
        "catmullrom",
        0.4
      );
      routeCurves.push(sub);

      if (!unitRoute) {
        const rail = new THREE.Mesh(
          new THREE.TubeGeometry(sub, 16, 0.48, 12, false),
          new THREE.MeshStandardMaterial({ color: cleared ? 0x4a8c72 : 0x3d4a5c, roughness: 0.68, metalness: 0.1 })
        );
        rail.receiveShadow = true;
        const glow = new THREE.Mesh(new THREE.TubeGeometry(sub, 16, 0.26, 10, false), glowPath(cleared));
        glow.position.y = 0.08;
        this.pathGroup.add(rail, glow);
      }
    }

    // 石板铺路（苔藓石砖 + 方向对齐）
    const tileMatA = mossyStone(unitRoute ? 0x2b4157 : 0x6b7280);
    const tileMatB = mossyStone(unitRoute ? 0x354f66 : 0x8b939f);
    const tileMatC = mossyStone(unitRoute ? 0x26384b : 0x55606e);
    const tileMats = [tileMatA, tileMatB, tileMatC];
    const tileGeo = new THREE.BoxGeometry(1.05, 0.13, 0.72);
    if (unitRoute) {
      routePairs.forEach(([a, b], routeIndex) => {
        const branch = routeCurves[routeIndex];
        const branchSteps = Math.max(16, Math.ceil(Math.hypot(a.x - b.x, a.z - b.z) / 1.6));
        for (let step = 0; step <= branchSteps; step++) {
          const t0 = step / branchSteps;
          const t1 = Math.min(1, (step + 0.5) / branchSteps);
          const p = branch.getPoint(t0);
          p.y = sampleTerrainY(p.x, p.z, terrainHeight) + 0.01;
          const p2 = branch.getPoint(t1);
          const tile = new THREE.Mesh(tileGeo, tileMats[step % tileMats.length]);
          tile.position.copy(p);
          tile.lookAt(p2.x, p.y, p2.z);
          tile.receiveShadow = true;
          this.pathGroup!.add(tile);
        }
      });
    } else {
      for (let step = 0; step <= steps; step++) {
        const t0 = step / steps;
        const t1 = Math.min(1, (step + 0.5) / steps);
        const p = curve.getPoint(t0);
        p.y = sampleTerrainY(p.x, p.z, terrainHeight) + 0.01;
        const p2 = curve.getPoint(t1);
        const tile = new THREE.Mesh(tileGeo, tileMats[step % tileMats.length]);
        tile.position.copy(p);
        tile.lookAt(p2.x, p.y, p2.z);
        tile.receiveShadow = true;
        this.pathGroup.add(tile);
      }
    }

    if (!unitRoute) {
      // 路灯（每隔 6 节点放 1 对）；单元放射路线由主题地标照明。
      const glowTex = makeLanternGlowTexture("rgba(255,220,140,1)");
      const poleGeo = new THREE.CylinderGeometry(0.055, 0.07, 2.6, 7);
      const armGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 5);
      const lampGeo = new THREE.SphereGeometry(0.14, 8, 6);
      const poleMat = lanternMetal();
      const lampMat = lanternGlass(0xffe080);

      for (let nodeIndex = 0; nodeIndex < this.nodes.length; nodeIndex += Math.max(1, Math.floor(this.nodes.length / 8))) {
        const node = this.nodes[nodeIndex];
        // 路灯方向：沿路径法线左右各一盏
        const t = Math.min(1, (nodeIndex + 0.5) / Math.max(1, this.nodes.length - 1));
        const tangent = curve.getTangent(t);
        const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        for (const sign of [-1, 1]) {
          const lx = node.x + side.x * 2.2 * sign;
          const lz = node.z + side.z * 2.2 * sign;
          const ly = sampleTerrainY(lx, lz, terrainHeight);

          const pole = new THREE.Mesh(poleGeo, poleMat);
          pole.position.set(lx, ly + 1.3, lz);
          pole.castShadow = true;

          const arm = new THREE.Mesh(armGeo, poleMat);
          arm.rotation.z = Math.PI / 2;
          arm.position.set(lx + 0.4 * sign * -1, ly + 2.55, lz);

          const lamp = new THREE.Mesh(lampGeo, lampMat);
          lamp.position.set(lx + 0.8 * sign * -1, ly + 2.55, lz);

          // 光晕 sprite
          const glow = new THREE.Sprite(new THREE.SpriteMaterial({
            map: glowTex, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending,
          }));
          glow.scale.setScalar(1.8);
          glow.position.set(lx + 0.8 * sign * -1, ly + 2.6, lz);

          this.pathGroup!.add(pole, arm, lamp, glow);
        }
      }
    }

    this.scene.add(this.pathGroup);
  }

  private rebuildDecor(): void {
    this.disposeReflectors();
    removeGroup(this.scene, this.decorGroup);
    removeGroup(this.scene, this.waterGroup);
    this.decorGroup = new THREE.Group();
    this.waterGroup = new THREE.Group();
    this.waterMeshes = [];

    const rnd = seededRand(2024);
    const placed = new Set<string>();
    const unitNode = this.activeUnitId ? (this.nodes.find((node) => node.unlocked) ?? this.nodes[0]) : undefined;
    const unitMode = Boolean(unitNode && this.activeUnitId);
    const anchorX = unitNode?.x ?? 0;
    const anchorZ = unitNode?.z ?? TERRAIN_ORIGIN_Z;
    const isNearGlobalEntry = (x: number, z: number): boolean =>
      !unitMode && this.nodes.some((node) => Math.hypot(x - (node.x + 4), z - (node.z - 8)) < 26);

    this.rebuildUnitLandscape();

    const treesPerNode = unitMode
      ? (this.quality === "low" ? 8 : this.quality === "med" ? 12 : 18)
      : (this.quality === "low" ? 16 : this.quality === "med" ? 24 : 34);
    const scatterCount = unitMode
      ? (this.quality === "low" ? 42 : this.quality === "med" ? 64 : 92)
      : (this.quality === "low" ? 80 : this.quality === "med" ? 120 : 180);

    for (const node of this.nodes) {
      const rand = seededRand(node.id.length * 997 + node.z);
      for (let i = 0; i < treesPerNode; i++) {
        const angle = rand() * Math.PI * 2;
        const dist = unitMode ? 32 + rand() * 22 : 6 + rand() * 24;
        const wx = node.x + Math.cos(angle) * dist;
        const wz = node.z + Math.sin(angle) * dist;
        if (unitMode && Math.hypot(wx - anchorX, wz - anchorZ) < 25) continue;
        // Keep the spawn point and its third-person sightline clear on the global unit map.
        if (isNearGlobalEntry(wx, wz)) continue;
        const key = `${Math.round(wx)}_${Math.round(wz)}`;
        if (placed.has(key)) continue;
        placed.add(key);

        const wy = sampleTerrainY(wx, wz, terrainHeight);
        const scale = unitMode ? 0.65 + rand() * 0.75 : 0.75 + rand() * 1.1;
        this.addDecorAt(unitMode ? this.currentBiome.decorStyle : node.theme, wx, wy, wz, scale, rand);
      }
    }

    // 全局零散植被 / 岩石：单元探索围绕当前单元铺开，避免视野只有一块空地。
    const scatter = seededRand(909);
    const halfW = unitMode ? 145 : TERRAIN_SIZE.width * 0.46;
    const halfD = unitMode ? 190 : TERRAIN_SIZE.depth * 0.46;
    for (let i = 0; i < scatterCount; i++) {
      const wx = anchorX + (scatter() - 0.5) * 2 * halfW;
      const wz = anchorZ + (scatter() - 0.5) * 2 * halfD;
      if (unitMode && Math.hypot(wx - anchorX, wz - anchorZ) < 25) continue;
      if (isNearGlobalEntry(wx, wz)) continue;
      if (!unitMode && Math.abs(wx) < 14) continue;
      const wy = sampleTerrainY(wx, wz, terrainHeight);
      const scale = 0.8 + scatter() * 1.5;
      if (unitMode && this.currentBiome.decorStyle === "space") {
        const rock = createRock(scale * 0.72);
        rock.position.set(wx, wy + 0.16, wz);
        rock.rotation.set(scatter() * 0.18, scatter() * Math.PI * 2, scatter() * 0.18);
        this.decorGroup!.add(rock);
      } else if (scatter() > 0.42) {
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

    // 河谷湖泊（沿两侧山脚分布）：单元模式改为围绕当前区域的两处水面。
    const lakeCount = unitMode && this.currentBiome.decorStyle === "space" ? 0 : unitMode ? 2 : 6;
    const reflectiveMax = this.qcfg.reflectors;
    for (let wi = 0; wi < lakeCount; wi++) {
      const side = wi % 2 === 0 ? -1 : 1;
      const wx = anchorX + side * (unitMode ? 52 + rnd() * 18 : 60 + rnd() * 55);
      const wz = anchorZ - halfD * 0.8 + wi * ((halfD * 1.5) / lakeCount) + rnd() * 18;
      const lw = unitMode ? 34 + rnd() * 14 : 48 + rnd() * 26;
      const lh = unitMode ? 24 + rnd() * 12 : 30 + rnd() * 18;
      const ly = sampleTerrainY(wx, wz, terrainHeight) - 0.6;
      const reflective = wi < reflectiveMax;

      if (reflective) {
        // 镜面反射层（仅近处少量湖泊，按画质分辨率）
        const reflector = new Reflector(new THREE.PlaneGeometry(lw, lh), {
          textureWidth: this.qcfg.reflectRes,
          textureHeight: this.qcfg.reflectRes,
          color: 0x1d4456,
        });
        reflector.rotation.x = -Math.PI / 2;
        reflector.position.set(wx, ly, wz);
        this.reflectors.push(reflector);
        this.waterGroup.add(reflector);

        // 涟漪 / 高光叠层（半透明，让反射透出）
        const ripple = new THREE.Mesh(new THREE.PlaneGeometry(lw, lh, 18, 12), water());
        (ripple.material as THREE.MeshPhysicalMaterial).opacity = 0.26;
        ripple.rotation.x = -Math.PI / 2;
        ripple.position.set(wx, ly + 0.05, wz);
        ripple.userData.isWater = true;
        ripple.userData.baseOpacity = 0.26;
        this.waterMeshes.push(ripple);
        this.waterGroup.add(ripple);
      } else {
        // 无反射湖泊：单层半透明程序化水面（开销低）
        const lake = new THREE.Mesh(new THREE.PlaneGeometry(lw, lh, 16, 10), water());
        (lake.material as THREE.MeshPhysicalMaterial).opacity = 0.82;
        lake.rotation.x = -Math.PI / 2;
        lake.position.set(wx, ly + 0.02, wz);
        lake.userData.isWater = true;
        lake.userData.baseOpacity = 0.82;
        this.waterMeshes.push(lake);
        this.waterGroup.add(lake);
      }
    }

    const mist = new THREE.Mesh(
      new THREE.PlaneGeometry(unitMode ? halfW * 2.2 : TERRAIN_SIZE.width + 40, unitMode ? halfD * 2.2 : TERRAIN_SIZE.depth + 40),
      new THREE.MeshBasicMaterial({ color: 0x9ec8ff, transparent: true, opacity: 0.038, depthWrite: false })
    );
    mist.rotation.x = -Math.PI / 2;
    mist.position.set(anchorX, 5, anchorZ);
    this.decorGroup.add(mist);
    this.scene.add(this.decorGroup, this.waterGroup);
    this.updateDynamicLightBudget(true);
  }

  private rebuildUnitLandscape(): void {
    removeGroup(this.scene, this.unitLandscape);
    this.unitLandscape = undefined;

    const unitNode = this.activeUnitId
      ? this.nodes.find((node) => node.unlocked) ?? this.nodes[0]
      : undefined;
    if (!unitNode || !this.activeUnitId) return;

    this.unitLandscape = buildUnitLandscape(
      this.currentBiome,
      unitNode,
      this.activeWorldId,
      this.activeWorldTitle
    );
    this.unitLandscape.position.set(
      unitNode.x,
      sampleTerrainY(unitNode.x, unitNode.z, terrainHeight),
      unitNode.z
    );
    this.scene.add(this.unitLandscape);
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
      if (token !== this.rebuildToken) {
        disposeGroup(root);
        return;
      }
      group.add(root);
      crystal.userData.nodeId = node.id;
      this.pickables.push(crystal);

      const sign = createSignpost(node.name, node.unlocked);
      group.add(sign);

      if (!node.unlocked) applyLockedStyle(group);
      this.nodeGroups.set(node.id, group);
      this.scene.add(group);
      this.updateDynamicLightBudget(true);
    }
  }

  private bindEvents(): void {
    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("resize", this.onResize);
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.container);
    }
    document.addEventListener("visibilitychange", this.onVisibilityChange);
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

  private animate = (timestamp?: number): void => {
    if (this.paused) {
      this.animId = 0;
      return;
    }
    this.animId = requestAnimationFrame(this.animate);

    this.clock.update(timestamp);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.getElapsed();

    // 帧率自适应：连续 3 s 平均低于 40 fps 则降一档像素比
    if (!this._fpsAdapted) {
      this._fpsFrames++;
      const now = performance.now();
      if (this._fpsTs === 0) this._fpsTs = now;
      if (now - this._fpsTs >= 3000) {
        const fps = this._fpsFrames / ((now - this._fpsTs) / 1000);
        if (fps < 40) {
          const cur = this.renderer.getPixelRatio();
          const next = Math.max(0.75, cur - 0.5);
          if (next < cur) {
            this.renderer.setPixelRatio(next);
            this.composer?.setPixelRatio(next);
          }
          this._fpsAdapted = true;
        }
        this._fpsTs = now;
        this._fpsFrames = 0;
      }
    }

    if (this.mixer) this.mixer.update(dt);

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

        this.updateFace(rig, dt);
      }

      // GLB 角色：在 idle / walk 间平滑过渡（情绪动作播放时暂停）
      if (this.usingGlb && this.glbWalk && this.glbIdle && !this.glbEmoting) {
        const cur = this.glbWalk.getEffectiveWeight();
        const next = cur + ((walk ? 1 : 0) - cur) * Math.min(1, dt * 6);
        this.glbWalk.setEffectiveWeight(next);
        this.glbIdle.setEffectiveWeight(1 - next);
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
    this.tickScene(t, dt);
    const updateNow = performance.now();
    if (updateNow - this.lastExploreUpdateAt >= 66 || this.lastExploreUpdateAt === 0) {
      this.lastExploreUpdateAt = updateNow;
      this.onExploreUpdate?.({
        playerX: this.player.position.x,
        playerZ: this.player.position.z,
        playerYaw: this.player.yaw,
        nodes: this.nodes,
        nearNodeId: this.nearNode?.id,
        pickups: this.pickupData,
        biome: this.minimapPalette(),
      });
    }
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  };

  private tickScene(t: number, dt: number): void {
    this.updateDynamicLightBudget();
    this.waterFrame++;
    // 昼夜循环：太阳沿天空划过，亮度 / 曝光 / 天光随之变化
    if (this.sun) {
      const day = t * 0.03; // 完整循环约 210s
      const sx = Math.sin(day) * 72;
      const sy = 36 + Math.cos(day) * 46; // 约 -10 ~ 82
      this.sun.position.set(sx, Math.max(5, sy), 35);
      const daylight = THREE.MathUtils.clamp((sy + 8) / 90, 0.18, 1);
      const focusedWorld = isFocusedLearningWorld(this.activeWorldId);
      this.sun.intensity = this.currentBiome.sunIntensity * (focusedWorld ? 0.82 + daylight * 0.18 : 0.52 + daylight * 0.38);
      this.renderer.toneMappingExposure = focusedWorld
        ? 1.14 + daylight * 0.12
        : 1.08 + daylight * 0.1;
      if (this.hemi) this.hemi.intensity = focusedWorld ? 0.78 + daylight * 0.22 : 0.58 + daylight * 0.26;

      // 太阳圆盘跟随光源方向（置于远空），夜间淡出
      if (this.sunDisc) {
        this.sunDisc.position.set(sx * 4.2, this.sun.position.y * 4.2, this.sun.position.z * 4.2 + TERRAIN_ORIGIN_Z);
        const sunDiscOpacity = this.currentBiome.sunDiscOpacity ?? 1;
        (this.sunDisc.material as THREE.SpriteMaterial).opacity = THREE.MathUtils.clamp(daylight * 1.2 * sunDiscOpacity, 0, 1);
      }
    }

    // 草地风吹 + 角色踩踏
    if (this.grassUniforms) {
      this.grassUniforms.uTime.value = t;
      this.grassUniforms.uPlayer.value.copy(this.player.position);
    }
    this.updateGrassLOD();

    // 云层缓慢漂移
    if (this.clouds) this.clouds.rotation.y = t * 0.006;

    // 单元场景中的环、信标和学习站保持轻微运动，让空间不是静态模型堆。
    this.unitLandscape?.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.userData?.isLandscapeRing) {
        mesh.rotation.y += dt * 0.42;
      }
      if (mesh.userData?.isLandscapeBeacon) {
        if (mesh.userData.landscapeBaseY === undefined) mesh.userData.landscapeBaseY = mesh.position.y;
        const baseY = mesh.userData.landscapeBaseY as number;
        mesh.position.y = baseY + Math.sin(t * 1.5 + mesh.position.x * 0.08) * 0.24;
      }
    });

    // 词汇光球动画
    for (const [id, group] of this.pickupMeshes) {
      const isNear = this.nearPickup?.id === id;
      const baseY = group.userData.baseY as number ?? group.position.y;

      // 消亡动画
      if (group.userData.dying) {
        group.userData.dieTimer = (group.userData.dieTimer as number ?? 0) + dt * 1.4;
        const p = group.userData.dieTimer as number;
        group.scale.setScalar(1 - p * 0.9);
        group.position.y = baseY + p * 3;
        group.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.material && "opacity" in m.material) (m.material as THREE.Material & { opacity: number }).opacity *= 0.85;
        });
        if (p >= 1) {
          this.pickupGroup?.remove(group);
          this.disposePickupResources(group);
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
        if (mesh.userData?.isSignpost) mesh.visible = !isNear;
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

    const px = this.player.position.x;
    const pz = this.player.position.z;
    const RIPPLE_DIST = 90;   // 只对 90 m 以内的水面做顶点涟漪
    const RIPPLE_DIST_SQ = RIPPLE_DIST * RIPPLE_DIST;

    for (const w of this.waterMeshes) {
      if (w.userData.baseY === undefined) w.userData.baseY = w.position.y;
      const baseOp: number = w.userData.baseOpacity ?? 0.68;
      const dx = w.position.x - px;
      const dz = w.position.z - pz;
      const distSq = dx * dx + dz * dz;
      const near = distSq < RIPPLE_DIST_SQ;

      // 轻微整体起伏（所有湖）
      w.position.y = w.userData.baseY + Math.sin(t * 0.9 + w.position.x * 0.03) * 0.04;
      // 透明度淡动（保留 baseOpacity 区间）
      (w.material as THREE.MeshPhysicalMaterial).opacity =
        baseOp + Math.sin(t * 0.7) * Math.min(0.08, baseOp * 0.12);

      if (!near || this.waterFrame % 2 !== 0) continue; // 远处跳过，近处隔帧更新法线

      // 顶点涟漪（仅近处）
      const geo = w.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      if (!w.userData.flat) w.userData.flat = Float32Array.from(pos.array as Float32Array);
      const flat = w.userData.flat as Float32Array;
      for (let i = 0; i < pos.count; i++) {
        const ox = flat[i * 3];
        const oy = flat[i * 3 + 1];
        pos.setZ(i,
          Math.sin(ox * 0.22 + t * 1.7) * 0.12 +
          Math.cos(oy * 0.27 + t * 1.25) * 0.10
        );
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    // 距离超限时暂停 Reflector 渲染（节省 GPU）
    const reflectDistSq = this.qcfg.reflectDist * this.qcfg.reflectDist;
    for (const r of this.reflectors) {
      const rdx = r.position.x - px;
      const rdz = r.position.z - pz;
      r.visible = rdx * rdx + rdz * rdz < reflectDistSq;
    }
  }
}
