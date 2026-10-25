import { WorldCollision } from "./worldCollision";
import { Locomotion } from "./locomotion";
import { renderPixelRatio,resolutionMode,type ResolutionMode } from "./renderResolution";
import { EffectBudget } from "./effectBudget";
import { SolarClock } from "./solarClock";
import { attachGameSettings } from "./settingsPanel";
import { bindRenderSettings } from "./renderSettingsBinding";
import { getGameSettings,updateGameSettings } from "./gameSettings";
import { FrameGate } from "./frameGate";
import type { MusicPlayer } from "../../infra/music";
import { surfaceClimate } from "./surfaceClimate";
import { WaterCapture } from "./waterCapture";
import { createTerrainTiles, type TerrainTiles } from "./terrainLod";
import { makePhysicalSky, solarPosition, WorldCascades } from "./physicalAtmosphere";
import { HERO_MODELS } from "./characterModels";
import { buildVegetationField, type VegetationField } from "./vegetationField";
import { planVegetation, type AvoidCircle, type AvoidEllipse, type AvoidSegment } from "./vegetationPlan";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { Timer } from "three/src/core/Timer.js";
import type { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import type { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { applyGrade, buildSkyEnvironment, createPostPipeline, detectQuality, QUALITY_PRESETS, type PostPipeline, type QualityConfig, type QualityTier } from "./postPipeline";
import type { MapNode, WordPickup } from "../../core/types";
import { loadAvatarGlb, loadModelsManifest, enhanceAvatarMaterials, createContactShadow } from "./ModelLoader";

import { createLandmarkWithCad } from "./cadLandmark";
import { loadHumanModels, hasHumanModel } from "./humanVisual";
import { createExplorerAvatar, type AvatarRig } from "./explorerAvatar";
import { ExplorerCamera } from "./ExplorerCamera";
import { buildNearScatter, type NearScatter } from "./nearScatter";
import { createMountainRing } from "./mountains";
import { buildRoadRibbon } from "./roadRibbon";
import { applySurfaceGrain, lanternGlass, lanternMetal, makeLanternGlowTexture } from "./materials";
import { disposeSurfaceArrays, getSurfaceArrays, setSurfaceQuality } from "./kitShader";
import { createWaterBody, waterUniforms, type WaterBody } from "./waterSurface";
import { addCornerBlend, buildFlagstonePaths } from "./flagstonePath";
import { PlayerController } from "./PlayerController";
import {
  createBush,
  createFallenLog,
  createFlower,
  createLantern,
  createPine,
  createReed,
  createRock,
  createTree,
  disposeFoliageResources,
  foliageSun,
  setFoliageQuality,
  windTime,
  grassBladeGeometry,
  wildflowerGeometry,
  GRASS_TUFT_HEIGHT,
} from "./props";
import { createSignpost } from "./signpost";
import type { MinimapBiomePalette, MinimapState } from "./Minimap";
import { getTheme } from "./theme";
import { DEFAULT_BIOME, getBiome, getGroundPalette, type UnitBiome } from "./unitBiome";
import { AdaptiveScaler } from "./adaptiveScaler";
import { attachPerfOverlay, perfOverlayEnabled, type PerfOverlay } from "./perfOverlay";
import { windStrength } from "./foliageMaterials";
import { foliageWindStrength, UNIT_DEFAULT_WEATHER, WeatherState, weatherTint, type WeatherKind } from "./weather";
import { WeatherFx, WetnessTracker } from "./weatherFx";
import { hexToRgb, LookBlender, lookFor, type Rgb } from "../memory/memoryLooks";
import { spawnActor, type ActorHandle } from "../memory/actors";
import type { NpcDef } from "../explore/npcs";
import { layerWeights, layerWeightsGLSL, LAYER_ROUGHNESS, paletteFromGround, terrainNoises, terrainNoisesGLSL, type LayerPalette } from "./terrainLayers";
import { buildTerrainTextureSet, type TerrainTextureSet } from "./terrainTextures";
import {
  applyLockedStyle,
  disposeGroup,
  fbm,
  hash2,
  removeGroup,
  seededRand,
  terrainHeight,
} from "./utils";
import { buildUnitLandscape, isFocusedLearningWorld } from "./unitLandscape";
import {
  INTERACT_RADIUS,
  sampleTerrainY,
  TERRAIN_ORIGIN_Y,
  TERRAIN_ORIGIN_Z,
  TERRAIN_SIZE,
} from "./worldConfig";

/** 词汇光球靠近触发半径 */
const PICKUP_RADIUS = 5;
/** NPC 可对话半径 / 开始转头注视的半径 */
const NPC_RADIUS = 3.6;
const NPC_NOTICE_RADIUS = 9;
const NPC_BLOCKER_GEO = new THREE.CylinderGeometry(0.34, 0.34, 1.8, 10);
const NPC_BLOCKER_MAT = new THREE.MeshStandardMaterial({ colorWrite: false, depthWrite: false });
/** 环境微粒的环绕盒尺寸（水平）与浮动高度 */
const MOTE_BOX = 70;
const MOTE_HEIGHT = 12;
/** 云影：低频正弦叠加的移动明暗（地形与草共用），返回 0.82–1.04 的亮度系数 */
const cloudTime = { value: 0 };
const CLOUD_GLSL = `float cHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float cNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(cHash(i), cHash(i + vec2(1.0, 0.0)), f.x), mix(cHash(i + vec2(0.0, 1.0)), cHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float cloudK(vec2 p, float t) {
  // 与天空积云同一类 fbm：世界坐标 / 120 m 为一个云团，随时间漂移（与天空云同向）
  vec2 q = p * 0.0085 + vec2(t * 0.010, t * 0.004);
  float base = cNoise(q) * 0.5 + cNoise(q * 2.07 + 13.1) * 0.25 + cNoise(q * 4.3 + 7.0) * 0.125;
  float cover = smoothstep(0.38, 0.62, base);
  return 1.04 - 0.24 * cover;
}
`;/** 日照偏低时的光色：冷白（不再往橙黄走） */
const WARM_SUN = new THREE.Color(0xe4eeff);
/** 生物群系颜色向记忆色调靠拢的比例 */
const LOOK_MIX = 0.6;
const mixRgb = (a: Rgb, b: Rgb, t: number, out: Rgb): Rgb => {
  out.r = a.r + (b.r - a.r) * t;
  out.g = a.g + (b.g - a.g) * t;
  out.b = a.b + (b.b - a.b) * t;
  return out;
};

/** 朝向计算常量 */
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const X_AXIS = new THREE.Vector3(1, 0, 0);

export interface World3DOptions {
  music?:MusicPlayer;
  onNodeClick: (nodeId: string) => void;
  onProximity?: (node: MapNode | null) => void;
  onExploreUpdate?: (state: MinimapState) => void;
  onPickupNear?: (pickup: WordPickup | null) => void;
  onPickupCollect?: (pickupId: string) => void;
  /** 走近 / 离开 NPC（null = 附近没有人） */
  onNpcNear?: (npc: NpcDef | null) => void;
  /** 与 NPC 互动（E 键 / 点击按钮） */
  onNpcTalk?: (npc: NpcDef) => void;
}

/** 地形湿润带最多支持的湖泊数（着色器 uniform 数组长度） */
const MAX_WET_LAKES = 8;
interface WetLake {
  x: number;
  z: number;
  /** 湖面椭圆半轴（米） */
  rx: number;
  rz: number;
  /** 水位（世界 y） */
  level: number;
}

/** 三维探险世界：走动探索 + 走近互动（原神风格单元地图） */
/** 不规则湖岸轮廓：椭圆 + 多频率径向噪声，逆时针，闭合 */
function lakeOutline(rx: number, ry: number, seed: number, n = 56): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + Math.sin(a * 3 + seed) * 0.12 + Math.sin(a * 5 + seed * 1.7) * 0.07 + Math.sin(a * 9 + seed * 2.3) * 0.035;
    pts.push(new THREE.Vector2(Math.cos(a) * rx * k, Math.sin(a) * ry * k));
  }
  return pts;
}
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
  private vegetation?: VegetationField;
  private nearScatter?: NearScatter;
  private waterGroup?: THREE.Group;
  private terrain?: THREE.Mesh;
  private terrainTiles?: TerrainTiles;
  private terrainTex?: TerrainTextureSet;
  /** 地形湿润带：湖泊 (x, z, rx, rz) 与水位，rebuildDecor 随湖泊更新数值（材质不重编译） */
  private readonly lakeUniforms = {
    uLakeA: { value: Array.from({ length: MAX_WET_LAKES }, () => new THREE.Vector4(0, 0, 1, 1)) },
    uLakeL: { value: new Array<number>(MAX_WET_LAKES).fill(0) },
    uLakeN: { value: 0 },
  };
  private readonly terrainUniforms = {
    uTerrAlbedo: { value: null as THREE.DataArrayTexture | null },
    uTerrNormal: { value: null as THREE.DataArrayTexture | null },
    uTerrDesat: { value: 1 },
  };
  private grassBaseColor = new THREE.Color(0x5d8a3c);
  private grassDryColor = new THREE.Color(0xa09a58);
  private readonly grassHsl = { h: 0, s: 0, l: 0 };
  /** PMREM 环境贴图（天空反射，提升材质真实感） */
  private envRT?: THREE.WebGLRenderTarget;
  private mountains?: THREE.Group;
  private skyDome?: THREE.Mesh;
  private cascades?: WorldCascades;
  private solarClock = new SolarClock(14);
  private removeWeatherPanel?:ReturnType<typeof attachGameSettings>;
  private releaseRenderSettings?:()=>void;
  private frameGate=new FrameGate();
  private settingsOpen=false;
  private starField?:THREE.Points;
  private solarDay = 1;
  private grassMesh?: THREE.InstancedMesh;
  private flowerMesh?: THREE.InstancedMesh;
  private grassUniforms?: { uTime: { value: number }; uPlayer: { value: THREE.Vector3 } };
  /** 草丛动态铺设状态（跟随玩家，只在附近铺设密草） */
  private grassCellSize = 1.1;
  private grassRadius = 54;
  private readonly grassCellMap = new Map<number, number>();
  private readonly grassNeeded = new Set<number>();
  private grassFreeSlots: number[] = [];
  private grassLastX = Number.POSITIVE_INFINITY;
  private grassLastZ = Number.POSITIVE_INFINITY;
  private readonly grassDummy = new THREE.Object3D();
  private readonly grassColor = new THREE.Color();
  private clouds?: THREE.Group;
  /** 当前读写3单元专属的空间骨架 */
  private unitLandscape?: THREE.Group;
  /** 脚步扬尘粒子池 */
  private dustGroup?: THREE.Group;
  private motes?: THREE.Points;
  private moteBase?: Float32Array;
  private dustPool: THREE.Sprite[] = [];
  private lastStep = 0;
  private sunDisc?: THREE.Sprite;
  /** 后期处理 */
  private composer?: EffectComposer;
  private post?:PostPipeline;
  private resolutionPreference=resolutionMode();
  private effectBudget=new EffectBudget();
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
  /** 角色脚下接地阴影（GLB 与程序化人形各一份） */
  private contactShadow?: THREE.Mesh;
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
  private disposed = false;
  /** 页面进入后台时记住原状态，回到前台后只恢复原本正在运行的世界。 */
  private pausedBeforeVisibility = true;
  private spectatorMode = false;
  private clock = new Timer();
  /** 自适应分辨率（目标 60 fps，带迟滞）与 ?perf=1 浮层 */
  private scaler!: AdaptiveScaler;
  private perf?: PerfOverlay;
  private lastFrameTs = 0;
  /** 记忆色调与天气 */
  private readonly look = new LookBlender(lookFor(undefined));
  private readonly weather = new WeatherState("clear");
  private weatherFx?: WeatherFx;
  private readonly wet = new WetnessTracker();
  private gradePass?: import("three/addons/postprocessing/ShaderPass.js").ShaderPass;
  private weatherTime = 0;
  private readonly bRgb: Record<"skyTop" | "skyMid" | "skyBot" | "fog" | "sun" | "hemiSky" | "hemiGround" | "ambient", Rgb> = {
    skyTop: { r: 0, g: 0, b: 0 }, skyMid: { r: 0, g: 0, b: 0 }, skyBot: { r: 0, g: 0, b: 0 }, fog: { r: 0, g: 0, b: 0 },
    sun: { r: 0, g: 0, b: 0 }, hemiSky: { r: 0, g: 0, b: 0 }, hemiGround: { r: 0, g: 0, b: 0 }, ambient: { r: 0, g: 0, b: 0 },
  };
  private readonly rgbT: Rgb = { r: 0, g: 0, b: 0 };
  private readonly rgbU: Rgb = { r: 0, g: 0, b: 0 };
  private nodes: MapNode[] = [];
  private currentId = "";
  private onNodeClick: (nodeId: string) => void;
  private onProximity?: (node: MapNode | null) => void;
  private onExploreUpdate?: (state: MinimapState) => void;
  private onPickupNear?: (pickup: WordPickup | null) => void;
  private onPickupCollect?: (pickupId: string) => void;
  private onNpcNear?: (npc: NpcDef | null) => void;
  private onNpcTalk?: (npc: NpcDef) => void;
  /** 探索世界里的 NPC：真人骨骼动画角色，走近时转头看向玩家 */
  private npcGroup?: THREE.Group;
  private npcs: { def: NpcDef; handle: ActorHandle; x: number; z: number }[] = [];
  private nearNpc: NpcDef | null = null;
  private waterBodies: WaterBody[] = [];
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
  private readonly sunDirV = new THREE.Vector3();
  private readonly spectatorFocus = new THREE.Vector3();
  private hasSpectatorFocus = false;
  private rebuildToken = 0;
  private collisions=new WorldCollision((x,z)=>sampleTerrainY(x,z,terrainHeight));
  private collisionDirty=true;
  private locomotion=new Locomotion();
  private player = new PlayerController(this.collisions);
  private explorerCam = new ExplorerCamera((x,z)=>sampleTerrainY(x,z,terrainHeight),(target,position)=>this.collisions.clipCamera(target,position));
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
  private waterCapture?: WaterCapture;

  constructor(container: HTMLElement, options: World3DOptions) {
    this.container = container;
    this.onNodeClick = options.onNodeClick;
    this.onProximity = options.onProximity;
    this.onExploreUpdate = options.onExploreUpdate;
    this.onPickupNear = options.onPickupNear;
    this.onPickupCollect = options.onPickupCollect;
    this.onNpcNear = options.onNpcNear;
    this.onNpcTalk = options.onNpcTalk;
    setFoliageQuality(this.quality === "low" ? "low" : "high"); // 植被纹理档位：必须先于任何树 / 灌木的创建

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
    this.renderer.setPixelRatio(renderPixelRatio(w,h,this.resolutionPreference,this.quality,window.devicePixelRatio,this.renderer.capabilities.maxTextureSize));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.shadowMap.type = this.quality === "low" ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
    // AgX：高光平滑去饱和、暗部保留色彩，比 ACES 更接近真实摄影的响应
    this.renderer.toneMapping = THREE.AgXToneMapping;
    this.renderer.toneMappingExposure = 1.28;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);
    // 建筑 / 地标程序化表面的 8 层数组纹理：必须先于任何建筑材质第一次编译，启动时一次生成
    setSurfaceQuality(this.quality === "low" ? "low" : "high");
    getSurfaceArrays(this.quality === "low" ? "low" : "high", Math.min(this.renderer.capabilities.getMaxAnisotropy(), this.quality === "high" ? 8 : 4));

    this.explorerCam.bindDrag(this.renderer.domElement);

    this.buildSky();
    this.buildClouds();
    this.buildLights();
    if (this.quality !== "low") this.cascades = new WorldCascades(this.scene, this.camera, this.quality);
    this.scene.userData.atmosphereShadows=this.cascades?.csm.lights??[this.sun];
    this.scene.userData.atmosphereSun=this.sun;
    this.buildEnvironment(this.currentBiome);
    // 初始即应用默认生物群系：天空 / 灯光 / 雾，避免首帧沿用占位的深色夜景雾
    this.applyBiomeToSky(this.currentBiome);
    this.applyBiomeToLights(this.currentBiome);
    this.scene.fog = new THREE.FogExp2(this.currentBiome.fogColor, this.currentBiome.fogDensity);
    this.buildTerrain();
    this.buildMountains();
    this.buildGrass();
    this.buildDust();
    this.buildMotes();
    this.spawnExplorer();
    this.setupPostFX();
    if (this.quality !== "low") this.waterCapture = new WaterCapture(this.quality);
    this.cacheBiomeRgb(this.currentBiome);
    const pr0 = this.renderer.getPixelRatio();
    this.scaler = new AdaptiveScaler({ max: pr0, min: this.resolutionPreference!=="balanced"?pr0:Math.min(.75,pr0), initial: pr0 });
    if (perfOverlayEnabled()) this.perf = attachPerfOverlay(this.renderer, container, this.scaler);
    this.weatherFx = new WeatherFx({ quality: this.quality, mode: "outdoor", radius: 14, flatGround: false, groundHeight:(x,z)=>sampleTerrainY(x,z,terrainHeight) });
    this.scene.add(this.weatherFx.object);
    this.removeWeatherPanel=attachGameSettings(container,{tier:this.quality,exploration:true,music:options.music,weather:kind=>this.setWeather(kind),time:hour=>this.setTimeOfDay(hour),onOpen:open=>{this.settingsOpen=open;this.explorerCam.setInputEnabled(!open&&!this.paused);this.player.setEnabled(!open&&!this.spectatorMode&&!this.paused);}});
    this.releaseRenderSettings=bindRenderSettings(this.renderer,this.post,{
      resolution:mode=>{this.resolutionPreference=mode;this.onResize();this.perf?.reset();},
      shadowSize:size=>{this.cascades?.setShadowSize(this.quality==="low"?1024:size);if(this.sun&&!this.cascades){this.sun.shadow.map?.dispose();this.sun.shadow.map=null;this.sun.shadow.mapSize.set(size,size);}},
      fov:value=>{this.camera.fov=value;this.camera.updateProjectionMatrix();},
      stats:()=>{this.perf?.dispose();this.perf=perfOverlayEnabled()?attachPerfOverlay(this.renderer,container,this.scaler):undefined;},
    });
    this.removeWeatherPanel.setResolution(this.renderer.domElement.width,this.renderer.domElement.height);
    this.bindEvents();
    if (import.meta.env.DEV) (window as unknown as { __world?: World3D }).__world = this;
  }

  /** 后期处理管线：泛光（Bloom）让水晶 / 光球 / 太阳产生电影级辉光（共享实现见 postPipeline.ts） */
  private setupPostFX(): void {
    const post = createPostPipeline(this.renderer, this.scene, this.camera, this.quality);
    this.post=post;
    this.composer = post?.composer;
    this.bloomPass = post?.bloomPass;
    this.gradePass = post?.gradePass;
  }

  setNodes(nodes: MapNode[], currentId: string, showNodeLandmarks = true): void {
    this.collisionDirty=true;
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
    // 暂停时长不是渲染卡顿；恢复后重新计时，避免首帧把整段学习时间误判为低 FPS。
    this.lastFrameTs = 0;
    this.player.setEnabled(!this.spectatorMode&&!this.settingsOpen);
    this.explorerCam.setInputEnabled(!this.settingsOpen);
    this.onResize();
    if (!this.animId) this.animate();
  }

  pause(): void {
    this.paused = true;
    this.explorerCam.setInputEnabled(false);
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
    this.player.setEnabled(!enabled && !this.paused&&!this.settingsOpen);
    if (this.explorer) this.explorer.visible = !enabled;
  }

  /** 外部触发互动（按钮 / E 键）：优先收集光球，其次进入节点 */
  tryInteract(): boolean {
    if (this.spectatorMode || this.paused) return false;
    if (this.nearPickup) {
      this.onPickupCollect?.(this.nearPickup.id);
      return true;
    }
    if (this.nearNpc) {
      this.onNpcTalk?.(this.nearNpc);
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
    this.hasSpectatorFocus = false;
    const biome = getBiome(unitId);
    this.currentBiome = biome;
    if (this.grassMesh) this.grassMesh.visible = ["coast", "forest", "plains"].includes(biome.decorStyle);
    this.updateGrassPlacement(true);
    this.applyBiomeToSky(biome);
    this.applyBiomeToLights(biome);
    this.buildEnvironment(biome);
    this.applyBiomeToTerrain(biome, false);
    this.applyOutfitFromBiome(biome);
    if (this.mountains) this.mountains.visible = biome.decorStyle === "forest" || biome.decorStyle === "plains";
    this.scene.fog = new THREE.FogExp2(biome.fogColor, biome.fogDensity);
    this.cacheBiomeRgb(biome);
    // 记忆色调与天气随单元变化（色调 2 秒、天气 6 秒平滑过渡）
    this.look.setTarget(lookFor(unitId), 2);
    this.setWeather(unitId ? UNIT_DEFAULT_WEATHER[unitId] ?? "clear" : "clear", 6);
  }

  private cacheBiomeRgb(b: UnitBiome): void {
    const c = this.bRgb;
    hexToRgb(b.skyTop, c.skyTop);
    hexToRgb(b.skyMid, c.skyMid);
    hexToRgb(b.skyBot, c.skyBot);
    hexToRgb(b.fogColor, c.fog);
    hexToRgb(b.sunColor, c.sun);
    hexToRgb(b.hemiSky, c.hemiSky);
    hexToRgb(b.hemiGround, c.hemiGround);
    hexToRgb(b.ambientColor, c.ambient);
  }

  /** 切换天气（默认 6 秒平滑过渡）；seconds <= 0 立即切换 */
  setWeather(kind: WeatherKind, seconds = 6): void {
    this.weather.set(kind, seconds);
    this.solarClock.set(kind==="night"?22:kind==="dusk"?18.5:14,seconds);
  }

  setTimeOfDay(hour:number,seconds=6):void {this.solarClock.set(hour,seconds);}

  getWeather(): WeatherKind {
    return this.weather.kind;
  }

  /** 切换单元内部子世界的空间焦点，不改变单元入口和词汇探索数据。 */
  setSubWorld(worldId?: string, title?: string): void {
    if (this.activeWorldId === worldId && this.activeWorldTitle === title) return;
    this.activeWorldId = worldId;
    this.activeWorldTitle = title;
    const focusedWorld = isFocusedLearningWorld(worldId);
    this.hasSpectatorFocus = false;
    this.applyBiomeToTerrain(this.currentBiome, focusedWorld);
    this.applySunDiscScale(focusedWorld);
    if (this.mountains) {
      this.mountains.visible = !focusedWorld && (this.currentBiome.decorStyle === "forest" || this.currentBiome.decorStyle === "plains");
    }
    if (this.grassMesh) {
      this.grassMesh.visible = ["coast", "forest", "plains"].includes(this.currentBiome.decorStyle) && !focusedWorld;
      this.updateGrassPlacement(true);
    }
    if (this.bloomPass) {
      this.bloomPass.strength = focusedWorld
        ? 0.2
        : THREE.MathUtils.clamp(0.5 + (1.5 - this.currentBiome.sunIntensity) * 0.28, 0.45, 1.05);
    }
    if (this.activeUnitId && this.nodes.length > 0) {
      this.rebuildUnitLandscape();
      if (isFocusedLearningWorld(worldId)) {
        const node = this.nodes.find((item) => item.id === this.currentId) ?? this.nodes[0];
        if (node) {
          const y = sampleTerrainY(node.x, node.z, terrainHeight);
          // The lesson panel overlays the right side on desktop; bias the stage focus left of it.
          this.spectatorFocus.set(node.x - 3.5, y + 4.8, node.z + 11.5);
          this.hasSpectatorFocus = true;
          this.player.yaw = 0;
          this.player.setPosition(node.x, y, node.z + 2.5);
          this.avatarYaw = 0;
          this.explorerCam.snapToPlayer(this.camera,this.player.position,0);
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
          const name = mesh.name;
          // 主体装甲跟随单元水晶色，避免整只机器人自发光成"彩灯"
          if (/^Torso$|^Body$/i.test(name)) {
            mat.color.setHex(accent);
            mat.emissive.setHex(accent).multiplyScalar(0.14);
          } else {
            mat.emissive.setHex(accent).multiplyScalar(0.06);
          }
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

  /** 世界坐标 → 草丛格子的紧凑数值键 */
  private grassKey(i: number, j: number): number {
    return (i + 100000) * 262147 + (j + 100000);
  }

  /** 把某个实例隐藏（缩放为 0 并移到地下） */
  private hideGrassSlot(slot: number): void {
    const mesh = this.grassMesh;
    if (!mesh) return;
    this.grassDummy.position.set(0, -9999, 0);
    this.grassDummy.rotation.set(0, 0, 0);
    this.grassDummy.scale.setScalar(0);
    this.grassDummy.updateMatrix();
    mesh.setMatrixAt(slot, this.grassDummy.matrix);
    this.flowerMesh?.setMatrixAt(slot, this.grassDummy.matrix);
  }

  /** 在指定格子里种下一丛草 */
  private placeGrass(slot: number, i: number, j: number): void {
    const mesh = this.grassMesh;
    if (!mesh) return;
    const cs = this.grassCellSize;
    const h1 = hash2(i * 1.7, j * 2.3);
    const h2 = hash2(i * 3.1 + 5, j * 1.3 + 7);
    const h3 = hash2(i * 0.7 + 11, j * 2.9 + 3);

    const x = (i + 0.5) * cs + (h1 - 0.5) * cs;
    const z = (j + 0.5) * cs + (h2 - 0.5) * cs;
    const y = sampleTerrainY(x, z, terrainHeight);

    // 陡坡上不长草
    const e = 1.2;
    const gxs = (sampleTerrainY(x + e, z, terrainHeight) - sampleTerrainY(x - e, z, terrainHeight)) / (2 * e);
    const gzs = (sampleTerrainY(x, z + e, terrainHeight) - sampleTerrainY(x, z - e, terrainHeight)) / (2 * e);
    const slopeM = Math.hypot(gxs, gzs);
    if (slopeM > 0.85) {
      this.hideGrassSlot(slot);
      return;
    }
    // 跟随地表层权重：泥土 / 碎石 / 岩面处草变稀、变矮、偏枯黄
    const nzs = terrainNoises(x, z - TERRAIN_ORIGIN_Z);
    const lw = layerWeights({ normalY: 1 / Math.sqrt(1 + slopeM * slopeM), height: y - TERRAIN_ORIGIN_Y, ...nzs });
    const bare = lw[2] + lw[3] + lw[4];
    if (hash2(i * 9.1 + 3, j * 4.7 + 1) < bare * 0.9) {
      this.hideGrassSlot(slot);
      return;
    }

    this.grassDummy.position.set(x, y, z);
    this.grassDummy.rotation.set(0, h3 * Math.PI * 2, 0);
    const s = 0.68 + h2 * 0.45;
    this.grassDummy.scale.set(s * (1 - 0.25 * bare), (0.72 + h1 * 0.45) * (1 - 0.55 * bare - 0.15 * lw[1]), s * (1 - 0.25 * bare));
    this.grassDummy.updateMatrix();
    mesh.setMatrixAt(slot, this.grassDummy.matrix);

    // 每丛草轻微冷暖色差，避免整片同色
    const warm = h2;
    // 颜色取草地层配色附近：色相 ±0.03、亮度 ±12%，枯 / 裸地处偏枯黄；除以几何均色后作为实例色
    this.grassColor.copy(this.grassBaseColor).lerp(this.grassDryColor, Math.min(1, lw[1] * 0.9 + bare * 0.8));
    this.grassColor.getHSL(this.grassHsl);
    this.grassColor.setHSL(
      (this.grassHsl.h + (warm - 0.5) * 0.06 + 1) % 1,
      this.grassHsl.s,
      this.grassHsl.l * (1 + (h1 - 0.5) * 0.24)
    );
    this.grassColor.r = (this.grassColor.r * 1.02) / 0.19;
    this.grassColor.g = (this.grassColor.g * 1.02) / 0.3;
    this.grassColor.b = (this.grassColor.b * 1.02) / 0.088;
    mesh.setColorAt(slot, this.grassColor);

    // 野花：按低频噪声成片分布（花田），一片内有主色调，偶尔混入其它色
    const fm = this.flowerMesh;
    if (fm) {
      const patch = fbm(x * 0.035 + 210, z * 0.035 + 55, 2);
      const fh = hash2(i * 5.3 + 9, j * 7.1 + 2);
      if (patch > 0.54 && fh > 0.25) {
        this.grassDummy.position.set(x + (h3 - 0.5) * cs * 0.8, y, z + (h1 - 0.5) * cs * 0.8);
        this.grassDummy.rotation.set(0, h2 * 6.28, 0);
        const fs = 1.1 + fh * 1.1;
        this.grassDummy.scale.set(fs, fs * (0.8 + h3 * 0.5), fs);
        this.grassDummy.updateMatrix();
        fm.setMatrixAt(slot, this.grassDummy.matrix);
        const palette = [0xf6f2e8, 0xf4d34a, 0xe8738f, 0xa985e8, 0xf29a4a];
        const main = Math.floor(patch * 17) % palette.length;
        const pick = fh > 0.85 ? Math.floor(h1 * palette.length) : main;
        this.grassColor.setHex(palette[pick]);
        fm.setColorAt(slot, this.grassColor);
      } else {
        this.grassDummy.position.set(0, -9999, 0);
        this.grassDummy.scale.setScalar(0);
        this.grassDummy.updateMatrix();
        fm.setMatrixAt(slot, this.grassDummy.matrix);
      }
    }
  }

  /**
   * 按玩家位置动态铺设 / 回收草丛。只保留玩家周围半径内的格子，
   * 让近处草皮足够密实，远处自动回收，兼顾观感与性能。
   */
  private updateGrassPlacement(force = false): void {
    const mesh = this.grassMesh;
    if (!mesh || !mesh.visible) return;

    const px = this.player.position.x;
    const pz = this.player.position.z;
    if (!force) {
      const dx = px - this.grassLastX;
      const dz = pz - this.grassLastZ;
      if (dx * dx + dz * dz < 9) return; // 移动不足 3m 不重排
    }
    this.grassLastX = px;
    this.grassLastZ = pz;

    const cs = this.grassCellSize;
    const R = this.grassRadius;
    const R2 = R * R;
    const minI = Math.floor((px - R) / cs);
    const maxI = Math.ceil((px + R) / cs);
    const minJ = Math.floor((pz - R) / cs);
    const maxJ = Math.ceil((pz + R) / cs);

    const needed = this.grassNeeded;
    needed.clear();
    for (let i = minI; i <= maxI; i++) {
      for (let j = minJ; j <= maxJ; j++) {
        const dx = (i + 0.5) * cs - px;
        const dz = (j + 0.5) * cs - pz;
        if (dx * dx + dz * dz > R2) continue;
        needed.add(this.grassKey(i, j));
      }
    }

    // 回收离开范围的格子
    for (const [key, slot] of this.grassCellMap) {
      if (!needed.has(key)) {
        this.grassCellMap.delete(key);
        this.hideGrassSlot(slot);
        this.grassFreeSlots.push(slot);
      }
    }

    // 为新格子分配实例
    for (const key of needed) {
      if (this.grassCellMap.has(key)) continue;
      const slot = this.grassFreeSlots.pop();
      if (slot === undefined) break;
      const jj = (key % 262147) - 100000;
      const ii = (key - (jj + 100000)) / 262147 - 100000;
      this.placeGrass(slot, ii, jj);
      this.grassCellMap.set(key, slot);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (this.flowerMesh) {
      this.flowerMesh.instanceMatrix.needsUpdate = true;
      if (this.flowerMesh.instanceColor) this.flowerMesh.instanceColor.needsUpdate = true;
    }
  }

  /** 释放湖面的几何、材质与水深纹理 */
  private disposeWaterBodies(): void {
    for (const b of this.waterBodies) b.dispose();
    this.waterBodies = [];
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

    // 表情偏移相对于角色面部静止位置（米），与具体模型比例解耦
    let browY = rig.faceRest.browY;
    let mouthSX = 1;
    let mouthSY = 1;
    let mouthY = rig.faceRest.mouthY;
    if (eff === "happy") {
      browY += 0.006;
      mouthSX = 1.45;
      mouthSY = 0.9;
      mouthY -= 0.004;
    } else if (eff === "surprised") {
      browY += 0.014;
      mouthSX = 0.6;
      mouthSY = 2.2;
      mouthY -= 0.006;
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

  /** 在单元中心周围放置 NPC（传入空数组清除） */
  setNpcs(defs: NpcDef[], center: { x: number; z: number }): void {
    this.clearNpcs();
    if (defs.length === 0) return;
    this.npcGroup = new THREE.Group();
    this.npcGroup.name = "npcs";
    for (const def of defs) {
      const x = center.x + def.dx;
      const z = center.z + def.dz;
      const y = sampleTerrainY(x, z, terrainHeight);
      const handle = spawnActor(
        { id: `npc:${def.unitId}:${def.id}`, name: def.name, look: def.look, position: { x, y, z }, rotationY: def.yaw, pose: def.pose },
        [],
        this.quality === "low" ? "low" : "high"
      );
      handle.root.traverse((o) => {
        o.castShadow = this.quality !== "low";
      });
      this.npcGroup.add(handle.root);
      // 骨骼网格不参与碰撞：放一个不渲染的圆柱挡住玩家
      const blocker = new THREE.Mesh(NPC_BLOCKER_GEO, NPC_BLOCKER_MAT);
      blocker.position.set(x, y + 0.9, z);
      blocker.name = `npc-blocker:${def.id}`;
      this.npcGroup.add(blocker);
      this.npcs.push({ def, handle, x, z });
    }
    this.scene.add(this.npcGroup);
    this.collisionDirty = true;
  }

  /** 让指定 NPC 开口 / 闭口（对话时同步嘴型与手势） */
  setNpcSpeaking(npcId: string, on: boolean): void {
    const npc = this.npcs.find((n) => n.def.id === npcId);
    if (!npc) return;
    npc.handle.setSpeaking(on);
    if (on) npc.handle.setPose("talk");
  }

  /** 对话中的 NPC 注视玩家 */
  setNpcEngaged(npcId: string | null): void {
    this.engagedNpc = npcId;
  }

  private engagedNpc: string | null = null;

  private clearNpcs(): void {
    for (const npc of this.npcs) npc.handle.dispose();
    this.npcs = [];
    if (this.npcGroup) this.scene.remove(this.npcGroup);
    this.npcGroup = undefined;
    if (this.nearNpc) {
      this.nearNpc = null;
      this.onNpcNear?.(null);
    }
  }

  private updateNpcs(dt: number, t: number): void {
    if (this.npcs.length === 0) return;
    const px = this.player.position.x;
    const pz = this.player.position.z;
    let nearest: NpcDef | null = null;
    let best = NPC_RADIUS;
    const eye = this.npcEye.set(px, this.player.position.y + 1.55, pz);
    for (const npc of this.npcs) {
      const d = Math.hypot(px - npc.x, pz - npc.z);
      npc.handle.setDistance(d);
      const engaged = this.engagedNpc === npc.def.id;
      if (d < NPC_NOTICE_RADIUS || engaged) {
        npc.handle.attend(eye);
        npc.handle.setListening(false);
      } else {
        npc.handle.attend(null);
      }
      if (d < best) {
        best = d;
        nearest = npc.def;
      }
      if (d < 70 || engaged) npc.handle.update(dt, t);
    }
    if (nearest?.id !== this.nearNpc?.id) {
      this.nearNpc = nearest;
      this.onNpcNear?.(nearest);
    }
  }

  private readonly npcEye = new THREE.Vector3();

  /** 主动触发拾取最近的光球 */
  tryCollectPickup(): boolean {
    if (!this.nearPickup) return false;
    this.onPickupCollect?.(this.nearPickup.id);
    return true;
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.animId);
    this.animId = 0;
    this.renderer.domElement.removeEventListener("pointerdown", this.onPointerDown);
    this.renderer.domElement.removeEventListener("pointerup", this.onPointerUp);
    this.renderer.domElement.removeEventListener("pointermove", this.onPointerMove);
    this.renderer.domElement.removeEventListener("pointercancel", this.onPointerCancel);
    this.renderer.domElement.removeEventListener("lostpointercapture", this.onPointerCancel);
    this.explorerCam.disposeDrag();
    this.collisions.dispose();
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.resizeObserver?.disconnect();
    this.vegetation?.dispose();
    this.vegetation = undefined;
    this.nearScatter?.dispose();
    this.nearScatter = undefined;
    this.clearNpcs();
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
    if (this.motes) {
      this.scene.remove(this.motes);
      this.motes.geometry.dispose();
      const mm = this.motes.material as THREE.PointsMaterial;
      mm.map?.dispose();
      mm.dispose();
      this.motes = undefined;
    }
    this.disposeWaterBodies();
    this.mixer?.stopAllAction();
    this.releaseRenderSettings?.();
    this.removeWeatherPanel?.();
    this.starField?.geometry.dispose();
    (this.starField?.material as THREE.Material|undefined)?.dispose();
    this.waterCapture?.dispose();
    this.cascades?.dispose();
    this.weatherFx?.dispose();
    this.perf?.dispose();
    for (const pass of this.composer?.passes ?? []) pass.dispose();
    this.composer?.dispose();
    for (const g of this.nodeGroups.values()) disposeGroup(g);
    this.pickupMeshes.clear();

    if (this.terrain) {
      this.terrainTiles?.dispose();
      this.terrain.geometry.dispose();
      const mat = this.terrain.material as THREE.MeshStandardMaterial;
      mat.dispose();
      this.terrainTex?.dispose();
      this.terrainTex = undefined;
    }
    this.envRT?.dispose();
    if (this.skyDome) {
      this.skyDome.geometry.dispose();
      (this.skyDome.material as THREE.Material).dispose();
    }
    disposeFoliageResources();
    disposeSurfaceArrays();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private spawnExplorer(): void {
    removeGroup(this.scene, this.explorer);
    this.explorer = createExplorerAvatar(HERO_MODELS.me2026);
    this.contactShadow = createContactShadow(1.9);
    this.explorer.add(this.contactShadow);
    this.scene.add(this.explorer);
    this.explorer.visible = !this.spectatorMode;
    this.applyOutfitFromBiome(this.currentBiome);
    void this.tryLoadGlbAvatar();
  }

  /** 尝试加载真实 GLB 角色模型，存在则替换程序化人形 */
  private async tryLoadGlbAvatar(): Promise<void> {
    try {
      await loadHumanModels();
      if (this.disposed) return;
      if (hasHumanModel("male",HERO_MODELS.me2026) && this.explorer?.parent) {
        const previous = this.explorer;
        this.explorer = createExplorerAvatar(HERO_MODELS.me2026);
        this.explorer.position.copy(previous.position);
        this.explorer.quaternion.copy(previous.quaternion);
        this.explorer.visible = previous.visible;
        removeGroup(this.scene, previous);
        this.contactShadow = createContactShadow(1.9);
        this.explorer.add(this.contactShadow);
        this.scene.add(this.explorer);
        return;
      }
      const manifest = await loadModelsManifest();
      const cfg = manifest?.world?.avatar;
      if (!manifest || !cfg) return;
      const loaded = await loadAvatarGlb(cfg.file, cfg, manifest);
      if (!loaded) return;

      // 替换为 GLB 角色，并美化材质、补接地阴影
      removeGroup(this.scene, this.explorer);
      enhanceAvatarMaterials(loaded.group);
      this.explorer = loaded.group;
      this.contactShadow = createContactShadow(1.9);
      this.explorer.add(this.contactShadow);
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
    this.explorerCam.snapToPlayer(this.camera,this.player.position,this.player.yaw);
  }

  private buildSky(): void {
    this.skyDome = makePhysicalSky(this.camera.far);
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
    this.starField=new THREE.Points(starsGeo,new THREE.PointsMaterial({ color: 0xe8eef8, size: 0.42, transparent: true, opacity: 0.0, sizeAttenuation: true, visible: false, depthWrite:false }));
    this.scene.add(this.starField);

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

  /**
   * 由天空配色生成 PMREM 环境贴图。没有环境反射时，水晶 / 水面 / 金属 / 角色
   * 都会呈现"死黑"的塑料感；生成后所有 PBR 材质都能反射天空与太阳。
   */
  private buildEnvironment(biome: UnitBiome): void {
    const rt = buildSkyEnvironment(this.renderer, biome);
    if (!rt) return; // 环境贴图生成失败时退回无反射渲染
    this.envRT?.dispose();
    this.envRT = rt;
    this.scene.environment = rt.texture;
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

  /** 环境微粒：围绕玩家漂浮的花粉 / 萤火 / 尘埃，随生物群系变色，配合 Bloom 形成空气透视感 */
  private buildMotes(): void {
    const count = this.quality === "low" ? 70 : this.quality === "med" ? 120 : 190;
    const rnd = seededRand(7311);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd() - 0.5) * MOTE_BOX;
      pos[i * 3 + 1] = rnd() * MOTE_HEIGHT;
      pos[i * 3 + 2] = (rnd() - 0.5) * MOTE_BOX;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.motes = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        map: this.makeGlowTexture(),
        color: this.currentBiome.sunColor,
        size: 0.5,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        fog: false,
      })
    );
    this.motes.frustumCulled = false;
    this.moteBase = pos.slice();
    this.scene.add(this.motes);
  }

  private updateMotes(t: number, _dt: number): void {
    if (!this.motes || !this.moteBase) return;
    const px = this.player.position.x;
    const pz = this.player.position.z;
    const py = this.player.position.y;
    const geo = this.motes.geometry.attributes.position as THREE.BufferAttribute;
    const arr = geo.array as Float32Array;
    const half = MOTE_BOX / 2;
    for (let i = 0; i < geo.count; i++) {
      const bx = this.moteBase[i * 3];
      const by = this.moteBase[i * 3 + 1];
      const bz = this.moteBase[i * 3 + 2];
      // 以玩家为中心的环形空间：粒子在盒内回绕，因此跟随玩家移动而不会成片消失
      let x = bx - px;
      let z = bz - pz;
      x = ((((x + half) % MOTE_BOX) + MOTE_BOX) % MOTE_BOX) - half;
      z = ((((z + half) % MOTE_BOX) + MOTE_BOX) % MOTE_BOX) - half;
      arr[i * 3] = px + x + Math.sin(t * 0.35 + i * 1.7) * 0.9;
      arr[i * 3 + 1] = py + 0.4 + ((by + t * 0.12 * (0.4 + (i % 5) * 0.15)) % MOTE_HEIGHT) + Math.sin(t * 0.6 + i) * 0.25;
      arr[i * 3 + 2] = pz + z + Math.cos(t * 0.3 + i * 2.3) * 0.9;
    }
    geo.needsUpdate = true;
    const mat = this.motes.material as THREE.PointsMaterial;
    mat.color.setHex(this.currentBiome.sunColor);
    mat.opacity = 0.26 + Math.sin(t * 0.8) * 0.07;
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
    // 注意：scene.environment（PMREM 天空反射）会再叠加一份环境光，
    // 因此这里的半球光 / 环境光强度需低于早期无环境图的版本。
    this.hemi = new THREE.HemisphereLight(0xc8e0ff, 0x243828, 0.5);
    this.scene.add(this.hemi);
    this.ambientLight = new THREE.AmbientLight(0x9ab0cc, 0.18);
    this.scene.add(this.ambientLight);

    this.sun = new THREE.DirectionalLight(0xfff4e0, 1.45);
    this.sun.position.set(55, 72, 35);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(this.qcfg.shadowMap, this.qcfg.shadowMap);
    const cam = this.sun.shadow.camera;
    cam.near = 8;
    cam.far = 340;
    cam.left = cam.bottom = -70;
    cam.right = cam.top = 70;
    this.sun.shadow.bias = -0.0003;
    this.sun.shadow.normalBias = 0.04;
    this.scene.add(this.sun, this.sun.target);

    const rim = new THREE.DirectionalLight(0xdfe8ff, 0.22);
    rim.position.set(-40, 28, -30);
    const moon = new THREE.PointLight(0xa5c8ff, 0.1, 160);
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
      if(!light.userData.isOrbLight){light.userData.nightBase??=light.intensity;light.intensity=(light.userData.nightBase as number)*(.25+.75*(1-this.solarDay));}
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
    const u = (this.skyDome.material as THREE.ShaderMaterial).uniforms;
    u.turbidity.value = 2.5 + biome.fogDensity * 80;
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
      this.applySunDiscScale(isFocusedLearningWorld(this.activeWorldId));
    }
    // 越暗的单元（夜空 / 星际）辉光越强，强化氛围
    if (this.bloomPass) {
      this.bloomPass.strength = THREE.MathUtils.clamp(0.5 + (1.5 - biome.sunIntensity) * 0.28, 0.45, 1.05);
    }
  }

  private applySunDiscScale(focusedWorld: boolean): void {
    if (!this.sunDisc) return;
    const sunDiscScale = focusedWorld
      ? this.currentBiome.sunFocusedDiscScale ?? this.currentBiome.sunDiscScale ?? 52
      : this.currentBiome.sunDiscScale ?? 52;
    this.sunDisc.scale.set(sunDiscScale, sunDiscScale, 1);
  }

  /** 让地表配色跟随单元主题（顶点色重绘），告别所有单元同一块灰绿平面。 */
  private applyBiomeToTerrain(biome: UnitBiome, focusedWorld: boolean): void {
    if (!this.terrain) return;
    const material = this.terrain.material as THREE.MeshStandardMaterial;
    material.color.setRGB(1, 1, 1);
    material.vertexColors = true;
    material.roughness = focusedWorld ? 0.95 : 0.9;
    material.metalness = 0.02;
    material.needsUpdate = true;
    this.terrainUniforms.uTerrDesat.value = focusedWorld ? 0.72 : 1;
    this.applyTerrainTextures(paletteFromGround(getGroundPalette(biome)));
    this.paintTerrain(biome, focusedWorld);
  }

  /** 按配色（重新）生成 5 层地表数组纹理；同配色复用，旧纹理释放。 */
  private applyTerrainTextures(palette: LayerPalette): void {
    const size = this.quality === "low" ? 256 : 512;
    const key = `${palette.grass}-${palette.dirt}-${palette.rock}-${size}`;
    this.grassBaseColor.setHex(palette.grass);
    this.grassDryColor.setHex(palette.dryGrass);
    if (this.terrainTex?.key !== key) {
      const aniso = Math.min(this.renderer.capabilities.getMaxAnisotropy(), this.quality === "high" ? 8 : 4);
      const next = buildTerrainTextureSet(palette, size, 20260616, aniso);
      this.terrainUniforms.uTerrAlbedo.value = next.albedo;
      this.terrainUniforms.uTerrNormal.value = next.normal;
      this.terrainTex?.dispose();
      this.terrainTex = next;
    }
    // 已铺设的草丛按新配色重新着色
    for (const [k, slot] of this.grassCellMap) {
      const jj = (k % 262147) - 100000;
      const ii = (k - (jj + 100000)) / 262147 - 100000;
      this.placeGrass(slot, ii, jj);
    }
    if (this.grassMesh) {
      this.grassMesh.instanceMatrix.needsUpdate = true;
      if (this.grassMesh.instanceColor) this.grassMesh.instanceColor.needsUpdate = true;
    }
    if (this.flowerMesh) {
      this.flowerMesh.instanceMatrix.needsUpdate = true;
      if (this.flowerMesh.instanceColor) this.flowerMesh.instanceColor.needsUpdate = true;
    }
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
    const geo = new THREE.PlaneGeometry(0, 0);
    geo.setDrawRange(0, 0);

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.02,
      envMapIntensity: 0.32,
    });
    const hiQ = this.quality !== "low";
    // 逐像素 5 层混合：世界坐标采样数组纹理 + 高度混合；岩面三向投影；保留低频明暗斑 / 云影 / 自定义雾
    terrainMat.onBeforeCompile = (shader) => {
      shader.uniforms.uCloudT = cloudTime;
      shader.uniforms.uTerrAlbedo = this.terrainUniforms.uTerrAlbedo;
      shader.uniforms.uTerrNormal = this.terrainUniforms.uTerrNormal;
      shader.uniforms.uTerrDesat = this.terrainUniforms.uTerrDesat;
      shader.uniforms.uLakeA = this.lakeUniforms.uLakeA;
      shader.uniforms.uLakeL = this.lakeUniforms.uLakeL;
      shader.uniforms.uLakeN = this.lakeUniforms.uLakeN;
      shader.vertexShader = "varying vec3 vTerrWorld;\nvarying vec3 vTerrN;\n" + shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         vTerrWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
         vTerrN = mat3(modelMatrix) * normal;`
      );
      const rc = [0, 1, 2, 3, 4].map((l) => LAYER_ROUGHNESS[l as 0 | 1 | 2 | 3 | 4].toFixed(3)).join(", ");
      shader.fragmentShader = `
        ${hiQ ? "#define TERR_HI" : "#define TL_LOW"}
        uniform float uCloudT;
        uniform float uTerrDesat;
        uniform vec4 uLakeA[${MAX_WET_LAKES}];
        uniform float uLakeL[${MAX_WET_LAKES}];
        uniform int uLakeN;
        uniform highp sampler2DArray uTerrAlbedo;
        uniform highp sampler2DArray uTerrNormal;
        ${CLOUD_GLSL}
        varying vec3 vTerrWorld;
        varying vec3 vTerrN;
        float tHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float tNoise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(tHash(i), tHash(i + vec2(1.0, 0.0)), f.x), mix(tHash(i + vec2(0.0, 1.0)), tHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
        ${terrainNoisesGLSL()}
        ${layerWeightsGLSL()}
        vec4 tlA(float l, vec2 uv, vec2 gx, vec2 gy) { return textureGrad(uTerrAlbedo, vec3(uv, l), gx, gy); }
        vec4 tlN(float l, vec2 uv, vec2 gx, vec2 gy) { return textureGrad(uTerrNormal, vec3(uv, l), gx, gy); }
        const float TL_ROUGH[5] = float[5](${rc});
      ` + shader.fragmentShader.replace(
        "#include <map_fragment>",
        `
         vec3 tN = normalize(vTerrN);
         vec3 wp = vTerrWorld;
         vec3 dX = dFdx(wp);
         vec3 dY = dFdy(wp);
         const float TS = 0.2857143; // 3.5 m 一块
         vec2 uvA = wp.xz * TS;
         vec2 gxA = dX.xz * TS;
         vec2 gyA = dY.xz * TS;
         vec3 tnz = terrainNoises(vec2(wp.x, wp.z - ${TERRAIN_ORIGIN_Z.toFixed(1)}));
         float tHgt = wp.y - (${TERRAIN_ORIGIN_Y.toFixed(1)});
         float lh[5];
         float w[5];
         for (int k = 0; k < 5; k++) lh[k] = 0.5;
         layerWeights(tN.y, tHgt, tnz.x, tnz.y, tnz.z, lh, w);
         #ifdef TERR_HI
           // Bounded two-sample parallax: centimetre relief, fades before distant aliasing.
           vec3 tv = normalize(cameraPosition - wp);
           float pf = (1.0 - smoothstep(14.0, 65.0, length(cameraPosition - wp))) * smoothstep(0.35, 0.8, tN.y);
           vec2 pv = tv.xz / max(abs(tv.y), 0.3) * 0.014 * pf;
           int dominant = 0; for(int k=1;k<5;k++)if(w[k]>w[dominant])dominant=k;
           float relief = tlA(float(dominant), uvA, gxA, gyA).a - 0.5;
           uvA -= pv * relief;
           relief = tlA(float(dominant), uvA, gxA, gyA).a - 0.5;
           uvA -= pv * relief * 0.5;
         #endif
         vec4 cc[5];
         cc[0] = tlA(0.0, uvA, gxA, gyA);
         cc[1] = tlA(1.0, uvA, gxA, gyA);
         cc[2] = tlA(2.0, uvA, gxA, gyA);
         cc[3] = tlA(3.0, uvA, gxA, gyA);
         cc[4] = vec4(0.5);
         vec3 tbw = vec3(0.0);
         bool tRock = false;
         vec2 tOff = vec2(0.13, 0.41);
         #ifdef TERR_HI
           tRock = w[4] > 0.003;
           if (tRock) {
             tbw = pow(abs(tN), vec3(4.0));
             tbw /= (tbw.x + tbw.y + tbw.z);
             cc[4] = tlA(4.0, uvA + tOff, gxA, gyA) * tbw.y
                   + tlA(4.0, wp.xy * TS + tOff, dX.xy * TS, dY.xy * TS) * tbw.z
                   + tlA(4.0, wp.zy * TS + tOff, dX.zy * TS, dY.zy * TS) * tbw.x;
           }
         #else
           cc[4] = tlA(4.0, uvA, gxA, gyA);
         #endif
         for (int k = 0; k < 5; k++) lh[k] = cc[k].a;
         layerWeights(tN.y, tHgt, tnz.x, tnz.y, tnz.z, lh, w);
         vec3 tAlb = cc[0].rgb * w[0] + cc[1].rgb * w[1] + cc[2].rgb * w[2] + cc[3].rgb * w[3] + cc[4].rgb * w[4];
         // 主导的平地层
         int td = 0;
         float twm = w[0];
         #ifdef TERR_HI
           for (int k = 1; k < 4; k++) if (w[k] > twm) { twm = w[k]; td = k; }
         #else
           for (int k = 1; k < 5; k++) if (w[k] > twm) { twm = w[k]; td = k; }
         #endif
         #ifdef TERR_HI
           // 去重复：主导层再用旋转 37° 的另一尺度采样，按世界噪声遮罩切换
           mat2 tRot = mat2(0.7986, 0.6018, -0.6018, 0.7986);
           vec2 uvB = tRot * (uvA * 0.61) + vec2(0.31, 0.17);
           vec4 sB = tlA(float(td), uvB, tRot * (gxA * 0.61), tRot * (gyA * 0.61));
           float tMask = smoothstep(0.4, 0.6, tNoise(wp.xz * 0.31));
           tAlb += w[td] * (mix(cc[td].rgb, sB.rgb, tMask) - cc[td].rgb);
         #endif
         vec4 nD = tlN(float(td), uvA, gxA, gyA);
         vec3 tTs = nD.xyz * 2.0 - 1.0;
         tTs.xy *= 0.9;
         vec3 tT = normalize(vec3(1.0, 0.0, 0.0) - tN * tN.x + vec3(0.0, 0.0, 1e-4));
         vec3 tB = cross(tT, tN);
         vec3 tWN = normalize(tT * tTs.x + tB * tTs.y + tN * tTs.z);
         float tRough = 0.0;
         for (int k = 0; k < 5; k++) tRough += w[k] * TL_ROUGH[k];
         tRough += w[td] * (nD.a - TL_ROUGH[td]);
         #ifdef TERR_HI
           if (tRock) {
             vec4 nx_ = tlN(4.0, wp.zy * TS + tOff, dX.zy * TS, dY.zy * TS);
             vec4 ny_ = tlN(4.0, uvA + tOff, gxA, gyA);
             vec4 nz_ = tlN(4.0, wp.xy * TS + tOff, dX.xy * TS, dY.xy * TS);
             vec3 rx = nx_.xyz * 2.0 - 1.0;
             vec3 ry = ny_.xyz * 2.0 - 1.0;
             vec3 rz = nz_.xyz * 2.0 - 1.0;
             rx = vec3(rx.xy + tN.zy, abs(rx.z) * tN.x);
             ry = vec3(ry.xy + tN.xz, abs(ry.z) * tN.y);
             rz = vec3(rz.xy + tN.xy, abs(rz.z) * tN.z);
             vec3 nR = normalize(rx.zyx * tbw.x + ry.xzy * tbw.y + rz.xyz * tbw.z);
             tWN = normalize(mix(tWN, nR, w[4]));
             tRough += w[4] * ((nx_.a * tbw.x + ny_.a * tbw.y + nz_.a * tbw.z) - TL_ROUGH[4]);
           }
         #endif
         float tLum = dot(tAlb, vec3(0.299, 0.587, 0.114));
         tAlb = mix(vec3(tLum), tAlb, uTerrDesat);
         diffuseColor.rgb *= tAlb;
         float tMacro = tNoise(vTerrWorld.xz * 0.035) * 0.6 + tNoise(vTerrWorld.xz * 0.15) * 0.4;
         diffuseColor.rgb *= 0.88 + tMacro * 0.24;
         diffuseColor.rgb *= cloudK(vTerrWorld.xz, uCloudT);
         // 湖岸湿润带：水位 -0.1 ~ +0.5 米之间的土壤变暗、变光滑
         float tWet = 0.0;
         for (int li = 0; li < ${MAX_WET_LAKES}; li++) {
           if (li >= uLakeN) break;
           vec4 lk = uLakeA[li];
           vec2 lq = (wp.xz - lk.xy) / lk.zw;
           if (dot(lq, lq) < 2.1) {
             float lvl = uLakeL[li];
             float lUp = 0.22 + 0.28 * tNoise(wp.xz * 0.9 + float(li) * 13.0);
             float lw = smoothstep(lvl - 0.12, lvl - 0.02, wp.y) * (1.0 - smoothstep(lvl + 0.12, lvl + lUp, wp.y));
             tWet = max(tWet, lw);
           }
         }
         diffuseColor.rgb *= 1.0 - tWet * (0.15 + 0.1 * tNoise(wp.xz * 2.3));`
      ).replace(
        "#include <roughnessmap_fragment>",
        "float roughnessFactor = clamp(tRough, 0.4, 1.0) * (roughness / 0.9) * (1.0 - 0.45 * tWet);"
      ).replace(
        "#include <normal_fragment_maps>",
        "normal = normalize((viewMatrix * vec4(tWN, 0.0)).xyz);"
      ).replace(
        "#include <fog_fragment>",
        `#ifdef USE_FOG
           // 远处地形向雾色渐隐（大气透视），并让山谷外缘与远山融为一体
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`
      );
    };
    terrainMat.customProgramCacheKey = () => "terrain-v6-parallax-" + this.quality;
    this.terrain = new THREE.Mesh(geo, terrainMat);
    this.terrainTiles = createTerrainTiles(terrainMat, this.quality);
    this.terrain.add(this.terrainTiles.group);
    this.terrain.receiveShadow = true;
    this.terrain.position.set(0, TERRAIN_ORIGIN_Y, TERRAIN_ORIGIN_Z);
    this.scene.add(this.terrain);
    // 首次构建就生成地表纹理（否则主世界在第一次切换单元前采样到空纹理，地面发灰）
    this.applyTerrainTextures(paletteFromGround(getGroundPalette(this.currentBiome)));
    this.paintTerrain(this.currentBiome, false);
  }

  /**
   * 按生物群系与地形形态给顶点着色：
   * 平坦处铺草、噪声斑块露出泥土、陡坡过渡为岩石，并叠加明暗起伏。
   */
  private paintTerrain(biome: UnitBiome, focusedWorld: boolean): void {
    // LOD tiles bake continuous world-coordinate macro colour once at construction.
    // Unit colour and desaturation remain in the shared terrain shader uniforms.
    void biome; void focusedWorld;
  }

  /** 远景山脉环带：山脊 / 岩层 / 林带 / 雪线（顶点色，合并为单个网格） */
  private buildMountains(): void {
    removeGroup(this.scene, this.mountains);
    const group = createMountainRing({
      count: this.quality === "low" ? 18 : this.quality === "med" ? 24 : 30,
      ringRadius: Math.max(TERRAIN_SIZE.width, TERRAIN_SIZE.depth) * 0.5,
      originZ: TERRAIN_ORIGIN_Z,
      snow: this.quality !== "low",
    });
    this.mountains = group;
    this.scene.add(group);
  }

  /** 实例化草地：草丛跟随玩家动态铺设，近处密实、远处回收（GPU 风吹摆动） */
  private buildGrass(): void {
    const geo = grassBladeGeometry(this.quality === "low" ? 9 : 12);
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.92,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uPlayer = { value: new THREE.Vector3(0, 0, 0) };
      shader.uniforms.uCloudT = cloudTime;
      shader.uniforms.uWind = windStrength;
      shader.uniforms.uGrassSun = foliageSun.dir;
      shader.uniforms.uGrassSunColor = foliageSun.color;
      shader.uniforms.uFade = { value: new THREE.Vector2(this.grassRadius * 0.55, this.grassRadius * 0.96) };
      this.grassUniforms = shader.uniforms as { uTime: { value: number }; uPlayer: { value: THREE.Vector3 } };
      shader.vertexShader = "uniform float uWind;\nuniform float uTime;\nuniform vec3 uPlayer;\nuniform vec2 uFade;\nuniform float uCloudT;\nvarying float vCloud;\n" + CLOUD_GLSL + shader.vertexShader;
      shader.fragmentShader = "uniform vec3 uGrassSun,uGrassSunColor;\nvarying float vCloud;\n" + shader.fragmentShader.replace("#include <color_fragment>", "#include <color_fragment>\n diffuseColor.rgb *= vCloud;").replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n vec3 grassSunView=normalize((viewMatrix*vec4(uGrassSun,0.0)).xyz);\n totalEmissiveRadiance+=diffuseColor.rgb * uGrassSunColor * pow(max(dot(normalize(vViewPosition),-grassSunView),0.0),3.0)*0.16;");
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         float gH = position.y / ${GRASS_TUFT_HEIGHT.toFixed(3)};
         vec4 gWp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
         vCloud = cloudK(gWp.xz, uCloudT);
         float gPh = gWp.x * 0.12 + gWp.z * 0.12;
         float gSway = (sin(uTime * 1.5 + gPh) * 0.12 + sin(uTime * 2.7 + gPh * 1.6) * 0.04) * uWind;
         transformed.x += gSway * gH;
         transformed.z += gSway * 0.4 * gH;
         // 角色踩踏：附近草向外侧倒伏并压低
         vec2 gToP = gWp.xz - uPlayer.xz;
         float gd = length(gToP);
         float gTramp = smoothstep(2.4, 0.5, gd);
         vec2 gDir = gToP / max(gd, 0.001);
         transformed.xz += gDir * gTramp * gH * 0.55;
         transformed.y -= gTramp * gH * 0.4;
         // 外圈渐隐：草簇随距离缩小直至消失，避免铺草范围出现生硬的圆形边界
         transformed *= 1.0 - smoothstep(uFade.x, uFade.y, gd);`
      );
    };

    this.grassRadius = this.qcfg.grassRadius;
    this.grassCellSize = this.qcfg.grassCell;
    // 容量 = 半径内格子数 + 余量
    const capacity =
      Math.ceil((Math.PI * this.grassRadius * this.grassRadius) / (this.grassCellSize * this.grassCellSize)) + 96;
    const mesh = new THREE.InstancedMesh(geo, mat, capacity);
    // 实例位置随玩家变化，包围盒不可靠，关闭视锥剔除
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = true;

    this.grassFreeSlots = [];
    for (let i = 0; i < capacity; i++) {
      this.grassFreeSlots.push(i);
      this.hideGrassSlotInit(mesh, i);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // 野花：与草共用实例槽位（子网格，随草一起显隐）
    const flowers = new THREE.InstancedMesh(wildflowerGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, metalness: 0, side: THREE.DoubleSide }), capacity);
    flowers.frustumCulled = false;
    flowers.castShadow = false;
    for (let i = 0; i < capacity; i++) this.hideGrassSlotInit(flowers, i);
    flowers.instanceMatrix.needsUpdate = true;
    mesh.add(flowers);
    this.flowerMesh = flowers;

    this.grassMesh = mesh;
    mesh.visible = this.currentBiome.decorStyle !== "space";
    this.scene.add(mesh);
    this.updateGrassPlacement(true);
  }

  /** 初始化时把实例藏到地下 */
  private hideGrassSlotInit(mesh: THREE.InstancedMesh, slot: number): void {
    this.grassDummy.position.set(0, -9999, 0);
    this.grassDummy.rotation.set(0, 0, 0);
    this.grassDummy.scale.setScalar(0);
    this.grassDummy.updateMatrix();
    mesh.setMatrixAt(slot, this.grassDummy.matrix);
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
    group.visible = false; // 体积云由天空着色器负责，精灵云块太糊
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
    this.wet.clear();
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
    const routeCurves: THREE.CatmullRomCurve3[] = [];
    const groundY = (x: number, z: number): number => sampleTerrainY(x, z, terrainHeight);

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
        // 底层：泥土 / 碎石路基（石板缝隙里露出的就是它）；中线嵌条保留但很淡
        this.pathGroup.add(
          buildRoadRibbon(sub, {
            width: 3.4,
            steps: Math.max(24, Math.ceil(sub.getLength() / 1.4)),
            groundY,
            base: cleared ? 0x6f6a58 : 0x6b6050,
            inlay: cleared ? { color: 0x7fa58f, emissive: 0x3f7d62, intensity: 0.1 } : { color: 0x6a80a8, emissive: 0x3a5590, intensity: 0.05 },
          })
        );
      }
    }

    // 石板铺路：不规则石板 + 路缘碎石，合并成一个网格（单元路线用深蓝灰）
    const flagQuality = this.quality;
    if (unitRoute) {
      const branches = routeCurves.map((branch) => {
        const len = branch.getLength();
        return branch.getSpacedPoints(Math.max(4, Math.ceil(len / 0.5))).map((pt) => ({ x: pt.x, z: pt.z }));
      });
      this.pathGroup.add(
        buildFlagstonePaths(branches, { width: 1.5, groundY, seed: 1207, quality: flagQuality, palette: "unit", lift: () => 0.07, startInset: 2.5, endInset: 1 })
      );
    } else {
      const line = addCornerBlend(this.nodes.map((node) => ({ x: node.x, z: node.z })), 6);
      this.pathGroup.add(buildFlagstonePaths([line], { width: 3.4, groundY, seed: 1207, quality: flagQuality }));
    }

    if (!unitRoute) {
      // 路灯（每隔 6 节点放 1 对）；单元放射路线由主题地标照明。杆 / 臂、灯罩、光晕各合并成一个网格。
      const curve = new THREE.CatmullRomCurve3(
        this.nodes.map((node) => new THREE.Vector3(node.x, sampleTerrainY(node.x, node.z, terrainHeight) + 0.45, node.z)),
        false,
        "catmullrom",
        0.35
      );
      const glowTex = makeLanternGlowTexture("rgba(255,220,140,1)");
      const poleGeo = new THREE.CylinderGeometry(0.055, 0.07, 2.6, 7);
      const armGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 5);
      armGeo.rotateZ(Math.PI / 2);
      const lampGeo = new THREE.SphereGeometry(0.14, 8, 6);
      const metalGeos: THREE.BufferGeometry[] = [];
      const lampGeos: THREE.BufferGeometry[] = [];
      const glowPos: number[] = [];

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
          metalGeos.push(poleGeo.clone().translate(lx, ly + 1.3, lz), armGeo.clone().translate(lx + 0.4 * sign * -1, ly + 2.55, lz));
          lampGeos.push(lampGeo.clone().translate(lx + 0.8 * sign * -1, ly + 2.55, lz));
          glowPos.push(lx + 0.8 * sign * -1, ly + 2.6, lz);
        }
      }
      poleGeo.dispose();
      armGeo.dispose();
      lampGeo.dispose();
      if (metalGeos.length > 0) {
        const poles = new THREE.Mesh(mergeGeometries(metalGeos, false)!, lanternMetal());
        poles.castShadow = true;
        const lamps = new THREE.Mesh(mergeGeometries(lampGeos, false)!, lanternGlass(0xffe080));
        for (const g of [...metalGeos, ...lampGeos]) g.dispose();
        // 光晕：一个 Points（加性混合），尺寸按世界单位随距离衰减
        const glowGeo = new THREE.BufferGeometry();
        glowGeo.setAttribute("position", new THREE.Float32BufferAttribute(glowPos, 3));
        const glow = new THREE.Points(
          glowGeo,
          new THREE.PointsMaterial({ map: glowTex, size: 1.8, sizeAttenuation: true, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending })
        );
        glow.frustumCulled = false;
        this.pathGroup.add(poles, lamps, glow);
      }
    }

    this.scene.add(this.pathGroup);
  }

  /** 把当前湖泊写入地形着色器的湿润带 uniform（超出上限的湖泊忽略） */
  private applyWetLakes(lakes: WetLake[]): void {
    const n = Math.min(lakes.length, MAX_WET_LAKES);
    for (let i = 0; i < n; i++) {
      const l = lakes[i];
      this.lakeUniforms.uLakeA.value[i].set(l.x, l.z, l.rx, l.rz);
      this.lakeUniforms.uLakeL.value[i] = l.level;
    }
    this.lakeUniforms.uLakeN.value = n;
  }

  /** 湖岸：沿岸的芦苇与卵石（平面的泡沫 / 泥岸带会在坡地上悬空成平板，故不使用） */
  private addLakeShore(outline: THREE.Vector2[], wx: number, ly: number, wz: number, rnd: () => number): void {
    if (!this.decorGroup) return;
    for (let i = 0; i < outline.length; i += 4) {
      const p = outline[i];
      const out = 1.03 + rnd() * 0.12;
      const sx = wx + p.x * out;
      const sz = wz - p.y * out;
      const sy = sampleTerrainY(sx, sz, terrainHeight);
      const roll = rnd();
      if (roll < 0.55) {
        const reed = createReed(1 + rnd() * 0.8);
        reed.position.set(sx, Math.min(sy, ly + 0.5), sz);
        this.decorGroup.add(reed);
      } else if (roll < 0.68) {
        const rock = createRock(0.5 + rnd() * 0.7);
        rock.position.set(sx, sy - 0.03, sz);
        rock.rotation.y = rnd() * Math.PI * 2;
        this.decorGroup.add(rock);
      }
    }
  }

  private rebuildDecor(): void {
    this.collisionDirty=true;
    this.disposeWaterBodies();
    this.vegetation?.dispose();
    this.vegetation = undefined;
    this.nearScatter?.dispose();
    this.nearScatter = undefined;
    removeGroup(this.scene, this.decorGroup);
    removeGroup(this.scene, this.waterGroup);
    this.decorGroup = new THREE.Group();
    this.waterGroup = new THREE.Group();

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

    // 全局零散植被：树木、灌木、野花、岩石、芦苇、倒木混合铺开，避免视野只有一块空地。
    const scatter = seededRand(909);
    const halfW = unitMode ? 145 : TERRAIN_SIZE.width * 0.46;
    const halfD = unitMode ? 190 : TERRAIN_SIZE.depth * 0.46;
    const style = this.currentBiome.decorStyle;
    for (let i = 0; i < scatterCount; i++) {
      const wx = anchorX + (scatter() - 0.5) * 2 * halfW;
      const wz = anchorZ + (scatter() - 0.5) * 2 * halfD;
      if (unitMode && Math.hypot(wx - anchorX, wz - anchorZ) < 25) continue;
      if (isNearGlobalEntry(wx, wz)) continue;
      if (!unitMode && Math.abs(wx) < 14) continue;
      const wy = sampleTerrainY(wx, wz, terrainHeight);
      const scale = 0.8 + scatter() * 1.5;
      const roll = scatter();

      // 星际 / 月面：只有岩石与岩块
      if (style === "space") {
        const rock = createRock(scale * 0.72);
        rock.position.set(wx, wy - 0.03, wz);
        rock.rotation.set(scatter() * 0.12, scatter() * Math.PI * 2, scatter() * 0.12);
        this.decorGroup!.add(rock);
        continue;
      }

      // 树木（roll < 0.24）交给 vegetation 植被场
      if (roll < 0.24) {
        continue;
      } else if (roll < 0.46) {
        const bush = createBush(scale);
        bush.position.set(wx, wy, wz);
        bush.rotation.y = scatter() * Math.PI * 2;
        this.decorGroup!.add(bush);
      } else if (roll < 0.62) {
        const rock = createRock(scale * 0.8);
        rock.position.set(wx, wy - 0.03, wz);
        rock.rotation.set(scatter() * 0.12, scatter() * Math.PI * 2, scatter() * 0.12);
        this.decorGroup!.add(rock);
      } else if (roll < 0.8) {
        const flower = createFlower(0.85 + scatter() * 0.7);
        flower.position.set(wx, wy, wz);
        this.decorGroup!.add(flower);
      } else if (roll < 0.91) {
        const reed = createReed(scale);
        reed.position.set(wx, wy, wz);
        reed.rotation.y = scatter() * Math.PI * 2;
        this.decorGroup!.add(reed);
      } else {
        const log = createFallenLog(scale * 0.9);
        log.position.set(wx, wy + 0.12, wz);
        this.decorGroup!.add(log);
      }
    }

    // 单元模式的近景：入口周围一圈乔木 / 灌木 / 岩石 / 花丛 / 倒木 / 石板小径 / 路灯，
    // 避免圣所之外是一片空地。
    const nearScatterAvoid: AvoidCircle[] = [
      [anchorX, anchorZ, 16],
      [anchorX, anchorZ + 9.3, 17],
      [anchorX - 21, anchorZ - 20, 6.5],
      [anchorX + 21, anchorZ - 20, 6.5],
      [anchorX - 21, anchorZ + 20, 6.5],
      [anchorX + 21, anchorZ + 20, 6.5],
      [anchorX - 17.4, anchorZ + 23.2, 6],
      [anchorX, anchorZ + 28.2, 6.5],
      [anchorX + 17.4, anchorZ + 23.2, 6],
    ];
    if (unitMode && style !== "space") {
      this.nearScatter = buildNearScatter({
        centerX: anchorX,
        centerZ: anchorZ,
        groundY: (x, z) => sampleTerrainY(x, z, terrainHeight),
        density: this.quality === "low" ? 0.5 : this.quality === "med" ? 0.75 : 1,
        avoid: nearScatterAvoid,
      });
      this.decorGroup!.add(this.nearScatter.group);
    }

    // 河谷湖泊（沿两侧山脚分布）：单元模式改为围绕当前区域的两处水面。
    const lakeCount = unitMode && this.currentBiome.decorStyle === "space" ? 0 : unitMode ? 2 : 6;
    const lakeEllipses: AvoidEllipse[] = [];
    const wetLakes: WetLake[] = [];
    for (let wi = 0; wi < lakeCount; wi++) {
      const side = wi % 2 === 0 ? -1 : 1;
      const wx = anchorX + side * (unitMode ? 52 + rnd() * 18 : 60 + rnd() * 55);
      const wz = anchorZ - halfD * 0.8 + wi * ((halfD * 1.5) / lakeCount) + rnd() * 18;
      const lw = unitMode ? 34 + rnd() * 14 : 48 + rnd() * 26;
      const lh = unitMode ? 24 + rnd() * 12 : 30 + rnd() * 18;
      // 水面高度取岸线最低点之上一点：低处被淹没成水域，高处的岸坡自然遮住水面，不会悬在坡上变成一块平板
      let minShore = sampleTerrainY(wx, wz, terrainHeight);
      let sumShore = 0;
      const shorePts = lakeOutline(lw * 0.5, lh * 0.5, wi * 7 + 3, 24);
      for (const p of shorePts) {
        const sh = sampleTerrainY(wx + p.x * 0.97, wz - p.y * 0.97, terrainHeight);
        minShore = Math.min(minShore, sh);
        sumShore += sh;
      }
      const ly = (minShore + sumShore / shorePts.length) / 2 - 0.1;
      lakeEllipses.push({ x: wx, z: wz, rx: (lw / 2) * 1.15, rz: (lh / 2) * 1.15 });
      // 不规则湖岸：噪声扰动的椭圆轮廓，而不是矩形水面
      const outline = lakeOutline(lw * 0.5, lh * 0.5, wi * 7 + 3);
      this.addLakeShore(outline, wx, ly, wz, rnd);
      const body = createWaterBody({
        outline,
        x: wx,
        y: ly,
        z: wz,
        groundY: (x, z) => sampleTerrainY(x, z, terrainHeight),
        quality: this.quality,
      });
      this.waterBodies.push(body);
      this.waterGroup.add(body.mesh);
      if (wetLakes.length < MAX_WET_LAKES) wetLakes.push({ x: wx, z: wz, rx: lw * 0.5, rz: lh * 0.5, level: ly });
    }
    this.applyWetLakes(wetLakes);

    // 成片植被：湖泊位置已知后规划，避开道路、入口、湖面
    const roadSegments: AvoidSegment[] = (unitMode
      ? this.nodes.slice(1).map((node) => [this.nodes[0], node] as const)
      : this.nodes.slice(0, -1).map((node, index) => [node, this.nodes[index + 1]] as const)
    ).map(([a, b]) => ({ ax: a.x, az: a.z, bx: b.x, bz: b.z, halfWidth: 7 }));
    const vegCircles: AvoidCircle[] = unitMode
      ? [[anchorX, anchorZ, 25], ...nearScatterAvoid]
      : this.nodes.map((node) => [node.x + 4, node.z - 8, 26] as const);
    let vegSeed = 2024;
    if (unitMode && this.activeUnitId) {
      vegSeed = 7;
      for (let ci = 0; ci < this.activeUnitId.length; ci++) vegSeed = (Math.imul(vegSeed, 31) + this.activeUnitId.charCodeAt(ci)) >>> 0;
    }
    const vegInstances = planVegetation({
      centerX: anchorX,
      centerZ: anchorZ,
      halfW,
      halfD,
      quality: this.quality,
      decorStyle: style,
      seed: vegSeed,
      groundY: (x, z) => sampleTerrainY(x, z, terrainHeight),
      avoidCircles: vegCircles,
      avoidEllipses: lakeEllipses,
      avoidSegments: roadSegments,
      clearCenterStrip: unitMode ? 0 : 14,
    });
    this.vegetation = buildVegetationField(vegInstances, { castShadow: this.quality !== "low", groundY:(x,z)=>sampleTerrainY(x,z,terrainHeight) });
    this.decorGroup.add(this.vegetation.group);

    this.collisions.setVegetation(vegInstances);
    this.scene.add(this.decorGroup, this.waterGroup);
    this.updateDynamicLightBudget(true);
  }

  private rebuildUnitLandscape(): void {
    this.collisionDirty=true;
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
      this.activeWorldTitle,
      this.quality === "low" ? "low" : "high"
    );
    this.unitLandscape.position.set(
      unitNode.x,
      sampleTerrainY(unitNode.x, unitNode.z, terrainHeight),
      unitNode.z
    );
    applySurfaceGrain(this.unitLandscape);
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
      rock.position.set(x, y - 0.03, z);
      rock.rotation.set(rand() * 0.12, rand() * Math.PI * 2, rand() * 0.12);
      this.decorGroup!.add(rock);
      return;
    }
    if (rand() > 0.5) {
      const rock = createRock(scale * 0.65);
      rock.position.set(x, y - 0.03, z);
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
      this.collisionDirty=true;
      this.nodeGroups.set(node.id, group);
      this.scene.add(group);
      this.updateDynamicLightBudget(true);
    }
  }

  private bindEvents(): void {
    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.renderer.domElement.addEventListener("pointerup", this.onPointerUp);
    this.renderer.domElement.addEventListener("pointermove", this.onPointerMove);
    this.renderer.domElement.addEventListener("pointercancel", this.onPointerCancel);
    this.renderer.domElement.addEventListener("lostpointercapture", this.onPointerCancel);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("resize", this.onResize);
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.container);
    }
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (this.paused || this.spectatorMode || this.settingsOpen) return;
    if (e.key.toLowerCase() === "e" || e.key === "Enter") {
      this.tryInteract();
    }
  };

  private pointerTap?: { id:number;x:number;y:number };
  private onPointerDown = (e: PointerEvent): void => {
    if (this.paused || this.spectatorMode || this.settingsOpen || this.explorerCam.mouseLookActive || e.button !== 0 || this.pointerTap) return;
    this.pointerTap = {id:e.pointerId,x:e.clientX,y:e.clientY};
  };
  private onPointerCancel = (): void => { this.pointerTap = undefined; };
  private onPointerMove = (e: PointerEvent): void => {
    const tap = this.pointerTap;
    if (tap?.id === e.pointerId && Math.hypot(e.clientX-tap.x,e.clientY-tap.y)>10) this.pointerTap = undefined;
  };
  private onPointerUp = (e: PointerEvent): void => {
    const tap = this.pointerTap;
    if (!tap || tap.id !== e.pointerId) return;
    this.pointerTap = undefined;
    if (this.paused || this.spectatorMode || this.settingsOpen || this.explorerCam.mouseLookActive || Math.hypot(e.clientX-tap.x,e.clientY-tap.y)>10) return;
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
      const groundHit = this.raycaster.intersectObject(this.terrain, true)[0];
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
    this.configureResolution(w,h);
    this.renderer.setSize(w, h);
    this.composer?.setSize(w, h);
    this.removeWeatherPanel?.setResolution(this.renderer.domElement.width,this.renderer.domElement.height);
  };

  private configureResolution(w:number,h:number):void {
    const ratio=renderPixelRatio(w,h,this.resolutionPreference,this.quality,window.devicePixelRatio,this.renderer.capabilities.maxTextureSize);
    this.scaler=new AdaptiveScaler({max:ratio,min:this.resolutionPreference!=="balanced"?ratio:Math.min(.75,ratio),initial:ratio});
    this.perf?.setScaler(this.scaler);this.renderer.setPixelRatio(ratio);this.composer?.setPixelRatio(ratio);
  }
  setResolutionMode(mode:ResolutionMode):void {updateGameSettings({resolution:mode});}
  setRenderFeature(name:"ssr"|"ao"|"taa"|"aerial"|"bloom",enabled:boolean):void {this.post?.setFeature(name,enabled);}
  performanceSnapshot(){return {mode:this.resolutionPreference,effectBudget:this.effectBudget.level,...this.perf?.snapshot()};}
  capture2K():string {
    const size=this.renderer.getSize(new THREE.Vector2()),ratio=this.renderer.getPixelRatio(),aspect=this.camera.aspect;
    try{
      this.renderer.setPixelRatio(1);this.renderer.setSize(2560,1440,false);
      this.composer?.setPixelRatio(1);this.composer?.setSize(2560,1440);
      this.camera.aspect=2560/1440;this.camera.updateProjectionMatrix();
      if(this.composer)this.composer.render();else this.renderer.render(this.scene,this.camera);
      return this.renderer.domElement.toDataURL("image/png");
    }finally{
      this.camera.aspect=aspect;this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(ratio);this.renderer.setSize(size.x,size.y,false);
      this.composer?.setPixelRatio(ratio);this.composer?.setSize(size.x,size.y);
    }
  }

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

    if(!this.frameGate.ready(timestamp??performance.now(),getGameSettings().fpsLimit))return;
    this.clock.update(timestamp);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.getElapsed();

    // 真实帧间隔（毫秒）：交给自适应分辨率与 ?perf=1 浮层；暂停恢复后的第一帧不计
    const nowTs = timestamp ?? performance.now();
    const rawMs = this.lastFrameTs > 0 ? nowTs - this.lastFrameTs : 0;
    this.lastFrameTs = nowTs;

    if (this.mixer) this.mixer.update(dt);

    if(this.collisionDirty){
      this.collisions.rebuild([...this.nodeGroups.values(),...[this.unitLandscape,this.decorGroup,this.npcGroup].filter((root):root is THREE.Group=>!!root)]);
      this.collisionDirty=false;
    }
    // Move first, then follow the same displayed position; no one-frame camera lag.
    this.player.update(dt,this.explorerCam.heading);
    if(this.explorer)this.explorer.position.lerp(this.player.position,1-Math.exp(-14*dt));
    this.explorerCam.update(
      this.camera,
      this.explorer?.position??this.player.position,
      this.player.yaw,
      dt,
      !this.spectatorMode,
      this.spectatorMode && this.hasSpectatorFocus ? this.spectatorFocus : undefined
    );

    if (this.explorer) {

      // 平滑朝向角
      let yawDiff = this.player.yaw - this.avatarYaw;
      while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
      while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
      this.avatarYaw += yawDiff * Math.min(1, dt * 12);

      const walk = this.player.speed>.08;
      const sprint = this.player.isSprinting();
      this.locomotion.update(dt,this.player.speed,sprint);
      if (walk) {
        this.walkPhase = this.locomotion.phase;
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
        this.locomotion.apply(rig,dt,sprint);

        this.updateFace(rig, dt);
        this.explorer.userData.updateHumanVisual?.();
      }

      // GLB 角色：在 idle / walk 间平滑过渡（情绪动作播放时暂停）
      if (this.usingGlb && this.glbWalk && this.glbIdle && !this.glbEmoting) {
        const cur = this.glbWalk.getEffectiveWeight();
        const next = cur + ((walk ? 1 : 0) - cur) * Math.min(1, dt * 6);
        this.glbWalk.setEffectiveWeight(next);
        this.glbIdle.setEffectiveWeight(1 - next);
      }

      // 目标前倾角度（行进 / 奔跑）
      const targetLean = this.locomotion.weight * (sprint ? .08 : .025);
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

      this.explorer.position.y = this.collisions.ground(px,pz,this.player.position.y);

      const footRing = this.explorer.children.find((c) => (c as THREE.Mesh).userData?.isFootRing) as THREE.Mesh | undefined;
      if (footRing) {
        const s = walk ? 1 + Math.sin(this.walkPhase) * 0.08 : 1;
        footRing.scale.set(s, s, s);
        (footRing.material as THREE.MeshBasicMaterial).opacity = walk ? 0.45 : 0.28;
      }
    }

    this.updateProximity();
    this.updatePickupProximity();
    this.updateNpcs(dt, t);
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
    this.renderer.shadowMap.needsUpdate=this.waterFrame%(this.effectBudget.level+1)===0;
    this.waterCapture?.update(this.renderer,this.scene,this.camera);
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    if (rawMs > 0) {
      this.perf?.update(rawMs);
      const budget=this.effectBudget.update(rawMs,dt);if(budget!==null){this.post?.setBudget(budget);this.waterCapture?.setBudget(budget);}
      const next = this.scaler.push(rawMs, dt);
      if (next !== null) {
        this.renderer.setPixelRatio(next);
        this.composer?.setPixelRatio(next);
        this.removeWeatherPanel?.setResolution(this.renderer.domElement.width,this.renderer.domElement.height);
      }
    }
  };

  /**
   * 每帧大气：生物群系颜色 → 向记忆色调靠拢（LOOK_MIX）→ 按天气压暗 / 灰化 / 染色；
   * 再叠加光照强度、雾浓度、曝光、泛光、调色，以及降水粒子、潮湿与风力。
   */
  private updateAtmosphere(dt: number): void {
    this.weather.update(dt);
    this.look.update(dt);
    this.weatherTime += dt;
    const look = this.look.current;
    const wp = this.weather.params;
    const b = this.bRgb;
    const biome = this.currentBiome;
    const T = this.rgbT;
    if (this.skyDome) {
      const u = (this.skyDome.material as THREE.ShaderMaterial).uniforms;
      this.skyDome.position.copy(this.camera.position);
      u.sunPosition.value.copy(this.sunDirV).multiplyScalar(450000);
      u.time.value = this.weatherTime;
      u.cloudCoverage.value = .2 + wp.cloud * .7;
      u.cloudDensity.value = .4 + wp.skyDark * .5;
      u.turbidity.value = 2.5 + wp.mist * 5 + wp.cloud * 2;
      u.mieCoefficient.value = .0035 + wp.mist * .008;
    }
    const fogC = weatherTint(mixRgb(b.fog, look.fog, LOOK_MIX, T), wp, this.rgbU);
    const fog = this.scene.fog as THREE.FogExp2;
    fog.color.setRGB(fogC.r, fogC.g, fogC.b, THREE.SRGBColorSpace);
    fog.density = biome.fogDensity * look.fogMul * wp.fogMul * (1 + wp.mist * 1.6) * getGameSettings().hazeStrength;
    if (this.sun) {
      const sc = mixRgb(b.sun, look.sun, LOOK_MIX, T);
      this.sun.color.setRGB(Math.min(1, sc.r * wp.sunTintR), Math.min(1, sc.g * wp.sunTintG), Math.min(1, sc.b * wp.sunTintB), THREE.SRGBColorSpace);
      this.sun.intensity *= look.sunMul * wp.sunMul;
      foliageSun.color.value.copy(this.sun.color).multiplyScalar(this.sun.intensity / 1.45);
      waterUniforms.sunColor.value.copy(this.sun.color).multiplyScalar(Math.min(this.sun.intensity, 3));
      if (this.sunDisc) {
        const m = this.sunDisc.material as THREE.SpriteMaterial;
        m.color.copy(this.sun.color);
        m.opacity *= Math.max(0, 1 - wp.cloud * 0.92);
      }
    }
    if (this.hemi) {
      const h = weatherTint(mixRgb(b.hemiSky, look.hemiSky, LOOK_MIX, T), wp, this.rgbU, 0.6);
      this.hemi.color.setRGB(h.r, h.g, h.b, THREE.SRGBColorSpace);
      const g = mixRgb(b.hemiGround, look.hemiGround, 0.5, T);
      this.hemi.groundColor.setRGB(g.r, g.g, g.b, THREE.SRGBColorSpace);
      this.hemi.intensity *= wp.hemiMul;
    }
    if (this.ambientLight) {
      const a = weatherTint(mixRgb(b.ambient, look.ambient, LOOK_MIX, T), wp, this.rgbU, 0.6);
      this.ambientLight.color.setRGB(a.r, a.g, a.b, THREE.SRGBColorSpace);
    }
    this.scene.environmentIntensity = Math.max(0.04, wp.envMul*(.15+.85*this.solarDay));
    this.renderer.toneMappingExposure *= look.exposure * wp.exposureMul;
    if (this.bloomPass) {
      const base = THREE.MathUtils.clamp(0.5 + (1.5 - biome.sunIntensity) * 0.28, 0.45, 1.05);
      this.bloomPass.strength = base * .32 * look.bloom * (1 + 0.25 * wp.skyTintAmt);
      this.bloomPass.threshold = 1.2;
    }
    if (this.gradePass) {
      applyGrade(this.gradePass, look, this.weatherTime, this.renderer.domElement.width, this.renderer.domElement.height);
      // A clean exploration view: retain unit hue, without a milky black floor,
      // chromatic blur or scan lines over the landscape.
      const u = this.gradePass.uniforms;
      u.uLift.value = 0;
      u.uTintAmt.value *= .35;
      u.uSat.value = Math.max(1.06, look.saturation);
      u.uContrast.value = Math.max(1.12, look.contrast);
      u.uAberration.value = 0;
      u.uScan.value = 0;
      u.uVig.value *= .5;
    }
    // 风：植被摇摆倍率；降水粒子；潮湿
    const wind = this.weather.windNow(this.weatherTime);
    windStrength.value = foliageWindStrength(wind);
    if (this.weatherFx) {
      this.weatherFx.setGround(this.player.position.y);
      const tone = THREE.MathUtils.clamp(wp.sunMul * 0.6 + wp.skyDark * 0.5, 0, 1);
      this.weatherFx.update(dt, this.weather, this.camera, tone, this.renderer.domElement.height, this.camera.fov, wind);
    }
    if (this.terrain) this.wet.add(this.terrain);
    this.wet.add(this.grassMesh);this.wet.add(this.pathGroup);this.wet.add(this.decorGroup);this.wet.add(this.unitLandscape);
    this.wet.apply(this.weather.wet);
    surfaceClimate.wet.value=this.weather.wet;surfaceClimate.rain.value=wp.rain;surfaceClimate.time.value=this.weatherTime;
    if(this.starField){const material=this.starField.material as THREE.PointsMaterial;material.opacity=(1-this.solarDay)*.85;material.visible=material.opacity>.01;}
  }

  private tickScene(t: number, dt: number): void {
    this.terrainTiles?.update(this.camera);
    this.vegetation?.update(this.camera);
    this.nearScatter?.update(this.camera);
    this.updateDynamicLightBudget();
    this.waterFrame++;
    // 日照循环：太阳在 18°–50° 高度间缓慢摆动（始终是白天），低角度时偏暖；
    // 光源来自相机一侧偏左，使建筑正面被照亮；阴影相机跟随玩家并对齐到网格，近处阴影精细且不闪烁。
    if (this.sun) {
      this.sunDirV.copy(solarPosition(this.solarClock.update(dt)));
      this.solarDay=THREE.MathUtils.smoothstep(this.sunDirV.y,-.08,.18);
      const el = Math.asin(this.sunDirV.y);
      const snap = 3;
      const tx = Math.round(this.player.position.x / snap) * snap;
      const tz = Math.round(this.player.position.z / snap) * snap;
      this.sun.target.position.set(tx, this.player.position.y, tz);
      this.sun.target.updateMatrixWorld();
      this.sun.position.set(tx, this.player.position.y, tz).addScaledVector(this.sunDirV, 140);
      const daylight = THREE.MathUtils.clamp((Math.sin(el) - 0.15) / 0.6, 0.3, 1);
      const focusedWorld = isFocusedLearningWorld(this.activeWorldId);
      this.sun.color.setHex(this.currentBiome.sunColor).lerp(WARM_SUN, (1 - daylight) * 0.6);
      this.sun.intensity = this.currentBiome.sunIntensity * (focusedWorld ? 0.92 : 0.88 + daylight * 0.12) * this.solarDay;
      // 植被：叶片逆光透射用的太阳方向 / 颜色（颜色含强度）
      waterUniforms.sunDir.value.copy(this.sunDirV);
      waterUniforms.sunColor.value.copy(this.sun.color).multiplyScalar(Math.min(this.sun.intensity, 3));
      foliageSun.dir.value.copy(this.sunDirV);
      foliageSun.color.value.copy(this.sun.color).multiplyScalar(this.sun.intensity / 1.45);
      this.renderer.toneMappingExposure = focusedWorld ? 1.16 : 1.1 + daylight * 0.08;
      if (this.hemi) this.hemi.intensity = (focusedWorld ? 0.66 : 0.58 + daylight * 0.12)*(.3+.7*this.solarDay);

      // 太阳圆盘跟随光源方向，锚定在相机前方的固定远处（天空穹顶附近）。
      if (this.sunDisc) {
        this.sunDisc.position
          .copy(this.camera.position)
          .addScaledVector(this.sunDirV, 480);
        const sunDiscOpacity = focusedWorld
          ? this.currentBiome.sunFocusedDiscOpacity ?? this.currentBiome.sunDiscOpacity ?? 1
          : this.currentBiome.sunDiscOpacity ?? 1;
        (this.sunDisc.material as THREE.SpriteMaterial).opacity = THREE.MathUtils.clamp(daylight * 1.2 * sunDiscOpacity, 0, 1);
      }
    }
    this.updateAtmosphere(dt);
    if (this.sun) this.cascades?.update(this.sun, this.sunDirV);
    windTime.value += dt * (0.8 + Math.min(1.2, this.weather.windNow(t)) * 0.9); // 树 / 灌木的风摆共用时间（风越大摆得越快）
    // 草地风吹 + 角色踩踏
    if (this.grassUniforms) {
      this.grassUniforms.uTime.value = t;
      cloudTime.value = t;
      this.grassUniforms.uPlayer.value.copy(this.player.position);
    }
    this.updateGrassPlacement();

    // 云层缓慢漂移；天空着色器同步太阳方向与时间
    if (this.clouds) this.clouds.rotation.y = t * 0.006;
    if (this.skyDome) {
      this.skyDome.position.copy(this.camera.position);
      const u = (this.skyDome.material as THREE.ShaderMaterial).uniforms;
      u.time.value = t;
      u.sunPosition.value.copy(this.sunDirV).multiplyScalar(450000);

    }
    this.updateMotes(t, dt);

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

    // 水面：时间与太阳方向 / 颜色由共享 uniform 驱动（太阳部分在上面的日照块里更新）
    waterUniforms.time.value = t;
  }
}
