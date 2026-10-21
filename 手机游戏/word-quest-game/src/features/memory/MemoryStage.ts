import { MemoryAir } from "./MemoryAir";
import * as THREE from "three";
import type { WordEntry } from "../../core/types";
import { foliageSun, setFoliageQuality, windStrength, windTime } from "../world/foliageMaterials";
import { getSurfaceArrays, setSurfaceQuality } from "../world/kitShader";
import { applyGrade, buildSkyEnvironment, createPostPipeline, detectQuality, QUALITY_PRESETS, type PostPipeline, type QualityTier } from "../world/postPipeline";
import { AdaptiveScaler } from "../world/adaptiveScaler";
import { attachPerfOverlay, perfOverlayEnabled, type PerfOverlay } from "../world/perfOverlay";
import { foliageWindStrength, WeatherState, weatherTint, type WeatherKind } from "../world/weather";
import { WeatherFx, WetnessTracker } from "../world/weatherFx";
import { hexToRgb, LookBlender, LOOKS, lookFor, type MemoryLook, type Rgb } from "./memoryLooks";
import { EyeController } from "./eyeOpen";
import { applyEye, createEyePass } from "./eyePass";
import { createSceneKit, type SceneKit } from "../world/sceneProps";
import { spawnActor, updateCrowd, type ActorHandle } from "./actors";
import { CaptionTracker, NameCaption } from "./NameCaption";
import { CandidateMarks, TargetBeacons } from "./CandidateMarks";
import { actSeen, averageFocus, buildGlossIndex, flowReduce, focusScore, initFlow, initLearnState, nextLearnStep, notesEmpty, planDistractions, relatedSentences, type FlowState, type GlossIndex, type LearnEvent, type LearnState } from "./actFlow";
import { comicify } from "./comicFilter";
import { AUTO_DELAY_MS, AUTO_STUDY_MS, memoryDevFlags, type MemoryDevFlags } from "./devFlags";
import { CinemaDirector } from "./CinemaDirector";
import { createFilmPass } from "./filmPass";
import { MemoryHud } from "./hud";
import { Interaction } from "./Interaction";
import { Materializer } from "./Materializer";
import { MemoryFlow } from "./MemoryFlow";
import { buildWordObject, memoryObjectFor, verbPose, type Verb } from "./memoryObjects";
import { Narrator, setNarratorFast, setNarratorRate, splitWords } from "./Narrator";
import { PaperLayer } from "./paper2d";
import { PovRig } from "./PovRig";
import { buildStage, getStage, stageTargets, type StageDef } from "./stages";
import { createStudyLayer, Handout, Notebook, PhoneNag, type StudyDeps } from "./study";
import { findWordToken, validateScript, type ActDialog, type ActPov, type Beat, type CameraShot, type MemoryAct, type MemoryResult, type MemoryScript, type NoteTask, type Pov, type Vec3 } from "./types";
import "./memory.css";

/**
 * 回忆舞台：独立的全屏层，自己的 Scene / 相机 / WebGLRenderer / 后期管线。
 * 组装 Materializer（世界随声音建立）、MemoryFlow（记忆洪流）、Narrator（朗读）、CinemaDirector（电影）、
 * PovRig（三种人称）、Interaction（触碰）、PaperLayer（二维笔记本）、MemoryHud（极简界面），
 * 并按节拍（beats）顺序执行脚本。play() 跑完全部节拍或玩家退出时 resolve；dispose() 释放全部资源。
 */

export interface MemoryStageOptions {
  /** 词表（字幕强调、词签、词卡、纸页用） */
  words: ReadonlyMap<string, WordEntry>;
  quality?: QualityTier;
  /** 开场用：先等一次轻触（拿到浏览器朗读所需的用户手势） */
  gate?: boolean;
  /** Entry overlay reveals only after prepare and a rendered frame. */
  onSceneReady?: () => Promise<void>;
  onMusicScene?: (scene: "memory" | "study") => void;
}

interface WordObj {
  obj: THREE.Object3D;
  base: { y: number; rotY: number; scale: number };
  hover: boolean;
  phase: number;
}

interface VerbAnim {
  wordId: string;
  verb: Verb;
  t: number;
}

/**
 * 一次 “会话” = 一幕在某个视角下的一次播放。玩家切换视角时 abort()：这一轮里所有等待（朗读、断片、对话、
 * 笔记……）立刻返回，残余代码很快跑完，再开始新视角的一轮。
 */
interface Session {
  aborted: boolean;
  promise: Promise<void>;
  abort(): void;
}

function newSession(): Session {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => (resolve = r));
  const session: Session = {
    aborted: false,
    promise,
    abort() {
      session.aborted = true;
      resolve();
    },
  };
  return session;
}

const COMIC_W = 640;
const COMIC_H = 380;

const VERB_SECONDS = 1.3;
/** 世界尚未建起时的背景（深色雾） */
const VOID_COLOR = new THREE.Color(0x0b1018);
const baseFovFor = (aspect: number): number => (aspect >= 1 ? 46 : Math.min(70, 46 + (1 - aspect) * 34));
/** 舞台自带环境色向记忆色调靠拢的比例 */
const LOOK_MIX = 0.7;
const EYE_MIN = 1.45;
const EYE_MAX = 1.7;
const mixRgb = (a: Rgb, b: Rgb, t: number, out: Rgb): Rgb => {
  out.r = a.r + (b.r - a.r) * t;
  out.g = a.g + (b.g - a.g) * t;
  out.b = a.b + (b.b - a.b) * t;
  return out;
};

export class MemoryStage {
  private readonly host: HTMLElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly quality: QualityTier;
  private readonly hud: MemoryHud;
  private readonly narrator = new Narrator();
  private readonly materializer: Materializer;
  private readonly flow: MemoryFlow;
  private readonly sun: THREE.DirectionalLight;
  private readonly hemi: THREE.HemisphereLight;
  private readonly filmPass = createFilmPass();
  private readonly eyePass = createEyePass();
  private readonly reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
  private readonly eye = new EyeController(this.reduced);
  private look!: LookBlender;
  private readonly weather = new WeatherState("clear");
  private weatherFx?: WeatherFx;
  private readonly wet = new WetnessTracker();
  private sunShaft: THREE.Mesh | null = null;
  private scaler!: AdaptiveScaler;
  private perf?: PerfOverlay;
  private shadowFrame = 0;
  private envLookVersion = -1;
  private readonly stageFogRgb: Rgb = { r: 0, g: 0, b: 0 };
  private readonly stageSunRgb: Rgb = { r: 1, g: 1, b: 1 };
  private readonly stageHemiSkyRgb: Rgb = { r: 1, g: 1, b: 1 };
  private readonly stageHemiGroundRgb: Rgb = { r: 0, g: 0, b: 0 };
  private readonly rgbA: Rgb = { r: 0, g: 0, b: 0 };
  private readonly rgbB: Rgb = { r: 0, g: 0, b: 0 };
  private actorList: ActorHandle[] = [];
  private wordList: Array<[string, WordObj]> = [];
  private readonly posScratch: THREE.Vector3[] = [];
  private post?: PostPipeline;
  private readonly cinema: CinemaDirector;
  private readonly pov: PovRig;
  private readonly interaction: Interaction;
  private paper?: PaperLayer;
  private readonly marks: CandidateMarks;
  private readonly beacons: TargetBeacons;
  /** 开发期测试开关（?memauto=1 / ?memfast=1） */
  private readonly flags: MemoryDevFlags = memoryDevFlags();
  private readonly floorRay = new THREE.Raycaster();
  private readonly floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private stageGroup?: THREE.Group;
  private air?: MemoryAir;
  /** 词卡跟随的物件（屏幕投影定位） */
  private cardAnchor: THREE.Object3D | null = null;
  /** 第一人称时被隐藏的那位 “借眼睛” 的人物 */
  private meViewer: ActorHandle | null = null;
  private diving = false;
  private readonly touchedNow = new Set<string>();
  private envRT?: THREE.WebGLRenderTarget;
  private resizeObserver?: ResizeObserver;

  private script?: MemoryScript;
  private stageDef?: StageDef;
  private readonly sourceMaterials = new Set<THREE.Material>();
  private readonly wordObjs = new Map<string, WordObj>();
  private readonly actors = new Map<string, ActorHandle>();
  private verbAnims: VerbAnim[] = [];
  private pieceOverrides = new Map<string, { duration?: number }>();

  private raf = 0;
  private lastTs = 0;
  private time = 0;
  private disposed = false;
  private exited = false;
  private exitResolve!: () => void;
  private readonly exitPromise = new Promise<void>((resolve) => (this.exitResolve = resolve));
  private readonly timers = new Set<ReturnType<typeof setTimeout>>();
  private skipHooks = new Set<() => void>();
  private speechChain: Promise<void> = Promise.resolve();
  private readonly wordsSeen = new Set<string>();
  private mistakes = 0;
  private unitWordForms: string[] = [];
  private readonly boxTmp = new THREE.Box3();
  private readonly vTmp = new THREE.Vector3();
  private readonly vTmp2 = new THREE.Vector3();
  private readonly bgColor = new THREE.Color();
  private readonly fogTarget = new THREE.Color();
  private readonly sunColor = new THREE.Color();
  private lightLevel = 0.3;
  private fogBase = 0.05;
  private envBase = 0.9;
  private sunBase = 2.4;
  private hemiBase = 0.9;
  private unitPrefix = "";

  // ── 幕：时间线与三种视角 ──
  private session: Session = newSession();
  private actState: FlowState | null = null;
  private study?: { layer: HTMLElement; handout: Handout; notebook: Notebook; phone: PhoneNag | null };
  private gloss: GlossIndex | null = null;
  private unitWords: WordEntry[] = [];
  private readonly learnStates = new Map<number, LearnState>();
  private readonly notesDone = new Map<number, number>();
  private readonly dialogDone = new Set<number>();
  private readonly comics = new Map<number, HTMLCanvasElement>();
  private readonly focusScores = new Map<number, number>();
  private readonly mastered = new Set<string>();

  constructor(
    container: HTMLElement,
    private readonly opts: MemoryStageOptions
  ) {
    this.quality = opts.quality ?? detectQuality();
    const qcfg = QUALITY_PRESETS[this.quality];

    this.host = document.createElement("div");
    this.host.className = "mem-stage";
    container.appendChild(this.host);
    const w = this.host.clientWidth || window.innerWidth;
    const h = this.host.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: this.quality !== "low", alpha: false, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, qcfg.pixelRatio));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = this.quality === "low" ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.AgXToneMapping;
    this.renderer.toneMappingExposure = 1.22;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.className = "mem-canvas";
    this.host.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(baseFovFor(w / h), w / h, 0.1, 120);
    this.camera.position.set(0, 2, 6);

    this.scene.fog = new THREE.FogExp2(0x0b1018, 0.06);
    this.scene.background = new THREE.Color(0x0b1018);

    // 灯光固定为两盏：太阳 + 半球。灯数量不能在运行中变（会让全部着色器重编译），亮度随“世界建好的程度”变化
    this.sun = new THREE.DirectionalLight(0xffe2b8, 0);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(qcfg.shadowMap, qcfg.shadowMap);
    this.sun.shadow.bias = -0.0005;
    this.sun.shadow.normalBias = 0.03;
    this.scene.add(this.sun, this.sun.target);
    this.hemi = new THREE.HemisphereLight(0x9db4d8, 0x3a3228, 0);
    this.scene.add(this.hemi);

    this.hud = new MemoryHud(this.host);
    // 朗读解锁：构造发生在用户点击的调用栈里
    this.narrator.unlock();

    this.materializer = new Materializer({ capacity: this.quality === "low" ? 1800 : this.quality === "med" ? 3000 : 4800, perPiece: this.quality === "low" ? 90 : 160 });
    this.scene.add(this.materializer.group);
    this.flow = new MemoryFlow(this.quality);
    this.scene.add(this.flow.object);

    this.post = createPostPipeline(this.renderer, this.scene, this.camera, this.quality, { ao: false, forceComposer: true });
    if (this.post) {
      this.post.composer.addPass(this.filmPass);
      // 眼睛通道放在最后：闭眼时全黑，睁眼时眼睑 + 虚焦 + 曝光适应
      this.post.composer.addPass(this.eyePass);
    }
    const pr0 = Math.min(window.devicePixelRatio || 1, qcfg.pixelRatio);
    this.scaler = new AdaptiveScaler({ max: pr0, min: Math.min(0.75, pr0), initial: pr0 });
    if (perfOverlayEnabled()) this.perf = attachPerfOverlay(this.renderer, this.host, this.scaler);
    this.look = new LookBlender(LOOKS.neutral);
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.shadowMap.needsUpdate = true;

    this.cinema = new CinemaDirector(this.hud, this.filmPass, this.camera.fov);
    // 远距离切镜只在眨眼的全黑瞬间发生
    if (this.post) {
      this.cinema.blinkCut = (apply) => {
        void this.eye.blink(() => {
          apply();
          this.pov.cancelBlend();
        });
      };
    }
    const spawn = { x: 0, y: 0, z: 0, yaw: Math.PI };
    this.pov = new PovRig({
      camera: this.camera,
      canvas: this.renderer.domElement,
      cinema: this.cinema,
      bounds: { minX: -4, maxX: 4, minZ: -4, maxZ: 4 },
      spawn,
      baseFov: this.camera.fov,
    });
    this.scene.add(this.pov.root, this.pov.trail);
    this.marks = new CandidateMarks(this.scene);
    this.beacons = new TargetBeacons(this.scene);
    if (this.flags.fast) setNarratorFast(4);
    this.interaction = new Interaction({
      camera: this.camera,
      canvas: this.renderer.domElement,
      labelLayer: this.hud.labels,
      materializer: this.materializer,
      getPlayer: () => (this.pov.pov === "you" ? this.pov.player : null),
    });

    this.interaction.onMiss = (x, y) => this.onFloorTap(x, y);
    this.pov.setTargetsProvider(() => (this.interaction.active ? this.interaction.activePositions(this.posScratch) : this.clearScratch()));
    this.hud.onExit = () => this.requestExit();
    this.hud.onSkip = () => this.skip();
    this.hud.onStick = (x, z) => this.pov.setStick(x, z);
    this.hud.setFadeInstant(true);
    this.hud.setPov("you");

    window.addEventListener("resize", this.onResize);
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.onResize());
      this.resizeObserver.observe(this.host);
    }
    this.onResize();
  }

  // ───────────────────────── 生命周期 ─────────────────────────

  /** 跑完整段回忆。玩家中途退出时 exited=true；无论怎样都不会抛出 */
  async play(script: MemoryScript): Promise<MemoryResult> {
    this.script = script;
    let completed = false;
    try {
      await this.prepare(script);
      this.startLoop();
      if (this.opts.onSceneReady) {
        // 眼睛仍闭着（画面是黑的）：先撤掉黑场层，再让入场遮罩散去，然后睁眼——全程没有任何亮闪
        if (this.post) this.hud.setFadeInstant(false);
        await this.until(new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
        if (this.exited || this.disposed) return { completed: false, exited: true, wordsSeen: [], mistakes: 0 };
        this.awaken();
        await this.until(this.opts.onSceneReady());
      } else {
        this.awaken();
        await this.sleep(700);
      }
      if (this.exited || this.disposed) return { completed: false, exited: true, wordsSeen: [], mistakes: 0 };
      if (this.opts.gate) {
        const gate = this.hud.gate("轻触 · 开始回溯", "Tap to begin", () => {
          this.narrator.unlock();
        });
        if (this.flags.auto) setTimeout(() => this.hud.tapGate(), AUTO_DELAY_MS);
        await this.until(gate);
      }
      if (!this.exited) {
        // 空场景：只有雾与光尘。稍等片刻，再让 2090 年的他浮现
        await this.sleep(this.opts.onSceneReady ? 350 : 1800);
        if (this.stageDef?.showPlayer !== false) {
          void this.materializer.reveal("old-self", 3.2);
          await this.sleep(1200);
        }
      }
      for (const beat of script.beats) {
        if (this.exited || this.disposed) break;
        await this.runBeat(beat);
      }
      completed = !this.exited && !this.disposed;
      // 以定格收尾的回忆已经淡白上浮，直接交还；其它（开场）渐黑
      const lastKind = script.beats[script.beats.length - 1]?.kind;
      if (completed && lastKind !== "freeze" && lastKind !== "dive") await this.closeEyes(0.9);
      // 玩家退出时 requestExit 已开始淡出黑场，等它走完再交还控制权
      else if (this.exited && !this.disposed) await new Promise<void>((resolve) => setTimeout(resolve, 520));
    } catch (err) {
      console.error("[memory] 回忆执行出错", err);
    }
    this.narrator.cancel();
    return {
      completed,
      exited: this.exited,
      wordsSeen: [...this.wordsSeen],
      mistakes: this.mistakes,
      wordsMastered: [...this.mastered],
      focus: averageFocus([...this.focusScores.values()]),
    };
  }

  /** 睁眼：从全黑开始的醒来时间线（眼睑张开 + 眨眼 + 虚焦收敛 + 曝光适应）。没有后期管线时退回黑场渐亮 */
  private awaken(): void {
    if (this.post) void this.eye.startOpening();
    else void this.hud.fade(false, 2400);
  }

  /** 闭眼：慢慢暗到全黑（下潜 / 收尾）。没有后期管线时退回黑场渐暗 */
  private closeEyes(seconds: number): Promise<void> {
    if (this.post) return this.eye.close(seconds);
    return this.hud.fade(true, seconds * 1000);
  }

  private clearScratch(): THREE.Vector3[] {
    this.posScratch.length = 0;
    return this.posScratch;
  }

  /** 玩家退出：淡出并让 play() 尽快返回 */
  private requestExit(): void {
    if (this.exited) return;
    this.exited = true;
    this.narrator.cancel();
    this.interaction.disable();
    this.paper?.hide();
    this.study?.handout.hide();
    this.study?.notebook.hide();
    this.study?.phone?.stop();
    this.exitResolve();
    void this.hud.fade(true, 500);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.exited = true;
    this.exitResolve();
    cancelAnimationFrame(this.raf);
    this.timers.forEach(clearTimeout);
    this.timers.clear();
    window.removeEventListener("resize", this.onResize);
    this.resizeObserver?.disconnect();
    this.narrator.cancel();
    try {
      globalThis.speechSynthesis?.cancel();
    } catch {
      // ignore
    }
    for (const hook of [...this.skipHooks]) hook();
    this.skipHooks.clear();

    if (this.flags.fast) setNarratorFast(1);
    setNarratorRate(1);
    this.marks.dispose();
    this.beacons.dispose();
    this.paper?.dispose();
    this.study?.handout.dispose();
    this.study?.notebook.dispose();
    this.study?.phone?.dispose();
    this.study?.layer.remove();
    this.interaction.dispose();
    this.pov.dispose();
    this.materializer.dispose();
    this.flow.dispose();
    this.air?.dispose();
    this.weatherFx?.dispose();
    this.perf?.dispose();
    for (const a of this.actors.values()) a.dispose();
    this.cinema.dispose();
    this.nameCaption?.dispose();
    this.hud.dispose();

    // 舞台几何与（从未被渲染过的）原始材质；克隆材质已由 Materializer 释放
    const geometries = new Set<THREE.BufferGeometry>();
    this.scene.traverse((o) => {
      const g = (o as THREE.Mesh).geometry;
      if (g && !geometries.has(g)) {
        geometries.add(g);
        g.dispose();
      }
    });
    this.sourceMaterials.forEach((m) => m.dispose());
    this.sourceMaterials.clear();
    for (const fn of (this.stageGroup?.userData.disposers ?? []) as Array<() => void>) {
      try {
        fn();
      } catch {
        // 释放失败不影响退出
      }
    }

    this.envRT?.dispose();
    if (this.post) {
      for (const pass of this.post.composer.passes) (pass as { dispose?: () => void }).dispose?.();
      this.eyePass.dispose();
      this.post.composer.dispose();
    }
    this.scene.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
    this.host.remove();
  }

  // ───────────────────────── 搭建 ─────────────────────────

  private async prepare(script: MemoryScript): Promise<void> {
    const stage = getStage(script.stage);
    this.stageDef = stage;
    this.pov.setAvatarHidden(stage.showPlayer === false);
    this.unitPrefix = script.unitId ? `rw3_${script.unitId}_` : "";
    this.unitWords = [...this.opts.words.values()].filter((w) => (this.unitPrefix ? w.id.startsWith(this.unitPrefix) : false));
    this.unitWordForms = this.unitWords.map((w) => w.word);

    // 开发期校验：只提示，不阻塞
    if (import.meta.env?.DEV) {
      const errs = validateScript(script, { stageTargets: stageTargets(script.stage), words: this.opts.words });
      if (errs.length) console.warn("[memory] 脚本校验问题\n" + errs.join("\n"));
    }

    // 记忆色调与天气：先定下来，再据此生成环境贴图与灯光
    const lookId = script.look ?? (script.unitId ? script.unitId : stage.name === "apartment2090" ? "memory2090" : "");
    const startLook: MemoryLook = LOOKS[lookId] ?? lookFor(script.unitId);
    this.look.setTarget(startLook, 0);
    this.weather.set(script.weather ?? stage.weather?.default ?? "clear", 0);

    setFoliageQuality(this.quality === "low" ? "low" : "high"); // 树 / 灌木的纹理档位：必须先于任何植被材质创建（主世界已建过时无效果）
    this.applyEnvironment(stage);
    // 程序化表面的数组纹理必须先于任何套件材质第一次编译
    setSurfaceQuality(this.quality === "low" ? "low" : "high");
    getSurfaceArrays(this.quality === "low" ? "low" : "high", Math.min(this.renderer.capabilities.getMaxAnisotropy(), this.quality === "high" ? 8 : 4));

    const kit: SceneKit = createSceneKit(this.quality === "low" ? "low" : "high");
    const collect = (root: THREE.Object3D): void =>
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) if (!(m as THREE.Material).userData.shared) this.sourceMaterials.add(m);
      });

    // 舞台部件
    const overrides = new Map((script.pieces ?? []).map((p) => [p.target, p]));
    const group = buildStage(script.stage, kit);
    this.stageGroup = group;
    this.scene.add(group);
    for (const child of [...group.children]) {
      if (!child.name) continue;
      collect(child);
      const o = overrides.get(child.name);
      this.materializer.register(child, o?.style ?? stage.targets[child.name] ?? "rise");
      if (o?.duration) this.pieceOverrides.set(child.name, { duration: o.duration });
    }

    if (stage.name === "emptyRoom" || stage.name === "clubRoom") {
      this.air = new MemoryAir(stage.bounds, this.quality);
      this.scene.add(this.air.object);
    }

    // 天气渲染：室内只在窗上，室外落雪落雨；舞台自己画天气的（own）只调光
    const sw = stage.weather;
    if (sw && sw.mode !== "own") {
      this.weatherFx = new WeatherFx({
        quality: this.quality,
        mode: sw.mode,
        window: sw.window,
        groundY: sw.groundY ?? 0,
        flatGround: true,
        radius: 10,
      });
      this.scene.add(this.weatherFx.object);
    }
    for (const name of sw?.wetParts ?? []) this.wet.add(group.getObjectByName(name));
    this.sunShaft = (group.getObjectByName("sunlight")?.children[0] as THREE.Mesh | undefined) ?? null;

    // 词物件
    const phases = [0.3, 1.7, 2.9, 4.1, 5.3];
    script.objects.forEach((p, i) => {
      const word = this.opts.words.get(p.wordId)?.word;
      const obj = buildWordObject(p.wordId, kit, p.archetype, word);
      const scale = obj.scale.x * (p.scale ?? 1);
      obj.scale.setScalar(scale);
      obj.position.set(p.position.x, p.position.y, p.position.z);
      obj.rotation.y = p.rotationY ?? 0;
      this.scene.add(obj);
      collect(obj);
      this.materializer.register(obj, "condense");
      this.wordObjs.set(p.wordId, {
        obj,
        base: { y: p.position.y, rotY: obj.rotation.y, scale },
        hover: p.position.y > 0.9,
        phase: phases[i % phases.length],
      });
    });

    // 人物
    for (const actor of script.actors) {
      const poses = script.beats.flatMap((b) => (b.kind === "actor" && b.actorId === actor.id && b.pose ? [b.pose] : []));
      // 幕里的人物动作、提问的人（说话 / 倾听）、附身对话里的两方也要预建姿势
      for (const act of script.acts ?? []) {
        for (const cue of act.actorCues ?? []) if (cue.kind === "actor" && cue.actorId === actor.id && cue.pose) poses.push(cue.pose);
        if (act.dialog && (actor.name === act.dialog.speaker || actor.id === act.dialog.speaker || actor.id === (script.student ?? "me2026"))) poses.push("talk", "listen");
      }
      if (actor.id === script.organizer) poses.push("talk", "listen");
      const handle = spawnActor(actor, poses, this.quality === "low" ? "low" : "high");
      this.scene.add(handle.root);
      collect(handle.root);
      this.materializer.register(handle.root, "fade");
      this.actors.set(actor.id, handle);
    }

    // 2090 年的他
    this.pov.setBounds(stage.bounds, stage.cameraBounds);
    this.pov.place(stage.spawn.x, stage.spawn.y, stage.spawn.z, stage.spawn.yaw);
    this.materializer.register(this.pov.avatar, "fade");

    this.actorList = [...this.actors.values()];
    this.wordList = [...this.wordObjs.entries()];
    this.placeIntroCamera(script);

    // 笔记本的手写字体需要提前开始下载
    if (script.beats.some((b) => b.kind === "paper")) this.getPaper();

    this.onResize();
    this.updateLighting(0, true);
    await this.materializer.prewarm(this.renderer, this.scene, this.camera);
  }

  private applyEnvironment(stage: StageDef): void {
    const e = stage.environment;
    this.fogTarget.setHex(e.fogColor);
    hexToRgb(e.fogColor, this.stageFogRgb);
    hexToRgb(e.sunColor, this.stageSunRgb);
    hexToRgb(e.hemiSky, this.stageHemiSkyRgb);
    hexToRgb(e.hemiGround, this.stageHemiGroundRgb);
    this.sunColor.setHex(e.sunColor);
    this.fogBase = e.fogDensity;
    this.sunBase = e.sunIntensity;
    this.hemiBase = e.hemiIntensity;
    this.envBase = e.envIntensity;
    this.sun.color.setHex(e.sunColor);
    const d = new THREE.Vector3(e.sunDir.x, e.sunDir.y, e.sunDir.z).normalize();
    this.sun.position.copy(d).multiplyScalar(26);
    this.sun.target.position.set(0, 0, 0);
    foliageSun.dir.value.copy(d);
    const r = e.shadowRadius;
    const cam = this.sun.shadow.camera;
    cam.left = -r;
    cam.right = r;
    cam.top = r;
    cam.bottom = -r;
    cam.near = 1;
    cam.far = 60;
    cam.updateProjectionMatrix();
    this.rebuildEnvironmentMap(stage);
  }

  /** 环境反射贴图：用舞台天色向记忆色调混合后的颜色生成（look 切换稳定后才重建，避免过渡中途卡一下） */
  private rebuildEnvironmentMap(stage: StageDef): void {
    const e = stage.environment;
    const l = this.look.current;
    const mix = (hex: number, c: Rgb): THREE.Color => {
      hexToRgb(hex, this.rgbA);
      mixRgb(this.rgbA, c, LOOK_MIX, this.rgbB);
      return new THREE.Color().setRGB(this.rgbB.r, this.rgbB.g, this.rgbB.b, THREE.SRGBColorSpace);
    };
    const d = new THREE.Vector3(e.sunDir.x, e.sunDir.y, e.sunDir.z).normalize();
    const rt = buildSkyEnvironment(this.renderer, { skyTop: mix(e.skyTop, l.skyTop), skyMid: mix(e.skyMid, l.skyMid), skyBot: mix(e.skyBot, l.skyBot), sunColor: mix(e.sunColor, l.sun), sunDir: d });
    if (rt) {
      this.envRT?.dispose();
      this.envRT = rt;
      this.scene.environment = rt.texture;
    }
    this.envLookVersion = this.look.version;
  }

  /**
   * 入场机位：眼高（约 1.6 m）、离场景近，相机在第一帧就落在那里（不从高处俯冲下来）。
   * 取第一个带机位的节拍的起点；没有的话保留“你”的跟随机位（已降到肩后眼高）。
   */
  private placeIntroCamera(script: MemoryScript): void {
    let shot: CameraShot | undefined;
    for (const b of script.beats) {
      if (b.kind === "narrate" || b.kind === "build" || b.kind === "pov" || b.kind === "gap" || b.kind === "choice") {
        if (b.kind === "pov" && !b.camera) break;
        if (b.kind === "choice") break; // 附身对话的机位是眼睛，不在这里处理
        if (b.camera) shot = b.camera;
        break;
      }
      if (b.kind === "wait") continue;
      break;
    }
    if (!shot) return;
    const from = shot.from ?? shot.to;
    const pos = new THREE.Vector3(from.x, THREE.MathUtils.clamp(from.y, EYE_MIN, EYE_MAX), from.z);
    const look = new THREE.Vector3(shot.look.x, shot.look.y, shot.look.z);
    this.pov.placeCamera(pos, look, shot.fov ?? this.cinema.baseFov);
    this.setPov("watch");
    this.pov.cancelBlend();
  }

  // ───────────────────────── 主循环 ─────────────────────────

  private startLoop(): void {
    if (this.raf || this.disposed) return;
    this.lastTs = performance.now();
    const frame = (ts: number): void => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(frame);
      const rawMs = ts - this.lastTs;
      const dt = Math.min(0.05, Math.max(0, rawMs / 1000));
      this.lastTs = ts;
      this.tick(dt);
      // 阴影贴图只在需要时更新：人物 / 显形一直在动，所以中低档隔帧更新，静止（定格）时完全不更新
      this.shadowFrame++;
      this.renderer.shadowMap.needsUpdate = !this.cinema.frozen && (this.quality === "high" || (this.shadowFrame & 1) === 0 || this.materializer.progress() < 1);
      if (this.post) this.post.composer.render();
      else this.renderer.render(this.scene, this.camera);
      this.perf?.update(rawMs);
      const next = this.scaler.push(rawMs, dt);
      if (next !== null) {
        this.renderer.setPixelRatio(next);
        this.post?.composer.setPixelRatio(next);
      }
    };
    this.raf = requestAnimationFrame(frame);
  }

  private tick(dt: number): void {
    const frozen = this.cinema.frozen;
    this.eye.update(dt);
    if (!frozen) {
      this.time += dt;
      this.weather.update(dt);
      this.look.update(dt);
      const wind = this.weather.windNow(this.time);
      windStrength.value = foliageWindStrength(wind);
      windTime.value += dt * (0.8 + Math.min(1.2, wind) * 0.9);
      this.materializer.update(dt);
      this.flow.update(dt);
      this.updateAttention();
      this.updateCaptions(dt);
      for (let i = 0; i < this.actorList.length; i++) {
        const a = this.actorList[i];
        a.setDistance(this.camera.position.distanceTo(a.root.position));
        a.update(dt, this.time);
      }
      if (this.stageGroup) this.stageDef?.animate?.(this.stageGroup, dt, this.time);
      this.updateWordObjects(dt);
      this.updateLighting(dt);
      this.updateAttractor();
      if (this.weatherFx) {
        const tone = THREE.MathUtils.clamp(this.weather.params.sunMul * 0.6 + this.weather.params.skyDark * 0.5, 0, 1);
        this.weatherFx.update(dt, this.weather, this.camera, tone, this.renderer.domElement.height, this.camera.fov, wind);
      }
      this.wet.apply(this.weather.wet);
    }
    this.pov.update(dt);
    this.cinema.update(dt);
    this.interaction.update();
    this.marks.update(dt);
    this.beacons.update(dt);
    this.interaction.setSuppressed(this.hud.cardOn);
    this.updateCardAnchor();

    this.flow.setCenter(this.tmpFocus());
    const h = this.renderer.domElement.height;
    this.materializer.setView(h, this.camera.fov);
    this.flow.setView(h, this.camera.fov);
    this.air?.update(this.time, this.materializer.windowFloorProgress(), h, this.camera.fov);
    if (this.post) {
      applyGrade(this.post.gradePass, this.look.current, this.time, this.renderer.domElement.width, h);
      applyEye(this.eyePass, this.eye, this.camera.aspect, this.time);
      if (this.post.bloomPass) this.post.bloomPass.strength = 0.62 * this.look.current.bloom;
    }
    // 记忆色调切换稳定之后重建一次环境反射贴图
    if (this.look.settled && this.envLookVersion !== this.look.version && this.stageDef) this.rebuildEnvironmentMap(this.stageDef);
  }

  private readonly focusV = new THREE.Vector3();
  private tmpFocus(): THREE.Vector3 {
    const dir = this.focusV.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    return dir.multiplyScalar(4).add(this.camera.position);
  }

  /**
   * 世界建得越完整，环境越亮、雾越淡、洪流越淡。
   * 颜色 = 舞台自带色向“记忆色调”靠拢，再经天气（压暗 / 灰化 / 染色）；强度 = 舞台基准 × 世界完整度 × 色调 × 天气。
   */
  private updateLighting(dt: number, snap = false): void {
    const look = this.look.current;
    const wp = this.weather.params;
    const progress = this.materializer.buildProgress();
    const target = 0.3 + 0.7 * progress;
    this.lightLevel = snap ? target : this.lightLevel + (target - this.lightLevel) * (1 - Math.exp(-dt * 2.5));
    const l = this.lightLevel;
    this.sun.intensity = this.sunBase * l * l * look.sunMul * wp.sunMul;
    // 世界还没建起来时背景是深色的雾（光尘才看得见）；建得越完整越接近舞台自己的雾色
    const fog = this.scene.fog as THREE.FogExp2;
    const fc = weatherTint(mixRgb(this.stageFogRgb, look.fog, LOOK_MIX, this.rgbA), wp, this.rgbA);
    this.fogTarget.setRGB(fc.r, fc.g, fc.b, THREE.SRGBColorSpace);
    this.bgColor.copy(VOID_COLOR).lerp(this.fogTarget, THREE.MathUtils.clamp(progress * 1.15, 0, 1));
    fog.color.copy(this.bgColor);
    (this.scene.background as THREE.Color).copy(this.bgColor);
    // 太阳色：向冷白靠拢，再乘天气色乘子（黄昏珊瑚 / 夜蓝）
    const sc = mixRgb(this.stageSunRgb, look.sun, LOOK_MIX, this.rgbB);
    this.sun.color.setRGB(Math.min(1, sc.r * wp.sunTintR), Math.min(1, sc.g * wp.sunTintG), Math.min(1, sc.b * wp.sunTintB), THREE.SRGBColorSpace);
    this.sunColor.copy(this.sun.color);
    foliageSun.color.value.copy(this.sunColor).multiplyScalar(this.sun.intensity / 1.45);
    const hs = weatherTint(mixRgb(this.stageHemiSkyRgb, look.hemiSky, LOOK_MIX, this.rgbA), wp, this.rgbA, 0.6);
    this.hemi.color.setRGB(hs.r, hs.g, hs.b, THREE.SRGBColorSpace);
    const hg = mixRgb(this.stageHemiGroundRgb, look.hemiGround, 0.5, this.rgbB);
    this.hemi.groundColor.setRGB(hg.r, hg.g, hg.b, THREE.SRGBColorSpace);
    this.hemi.intensity = this.hemiBase * l * wp.hemiMul;
    this.scene.environmentIntensity = this.envBase * l * wp.envMul;
    fog.density = this.fogBase * (1.5 - 0.5 * progress) * look.fogMul * wp.fogMul * (1 + wp.mist * 0.8);
    this.renderer.toneMappingExposure = 1.22 * look.exposure * wp.exposureMul;
    this.flow.setColors(look.dustA, look.dustB);
    if (this.sunShaft) {
      const m = this.sunShaft.material as THREE.Material;
      m.opacity = THREE.MathUtils.clamp(wp.sunMul * (1 - wp.cloud * 0.6) * 1.1, 0, 1);
      m.transparent = true;
    }
    if (!this.diving) this.flow.setVisibility(1 - 0.45 * progress);
  }

  /** 洪流偏向正在显形的东西 */
  private updateAttractor(): void {
    this.flow.setAttractor(this.materializer.firstRevealingCenter(), 1);
  }

  private updateWordObjects(dt: number): void {
    const anims = this.verbAnims;
    for (let i = 0; i < anims.length; i++) anims[i].t += dt / VERB_SECONDS;
    for (let i = anims.length - 1; i >= 0; i--) {
      if (anims[i].t >= 1) {
        this.finishVerb(anims[i]);
        anims.splice(i, 1);
      }
    }
    for (let wi = 0; wi < this.wordList.length; wi++) {
      const id = this.wordList[wi][0];
      const w = this.wordList[wi][1];
      let anim: VerbAnim | undefined;
      for (let i = 0; i < anims.length; i++) {
        if (anims[i].wordId === id) {
          anim = anims[i];
          break;
        }
      }
      if (anim) {
        const pose = verbPose(anim.verb, anim.t);
        w.obj.scale.setScalar(w.base.scale * pose.scale);
        w.obj.position.y = w.base.y + pose.lift + (w.hover ? Math.sin(this.time * 1.1 + w.phase) * 0.05 : 0);
        w.obj.rotation.set(pose.rotX, w.base.rotY + pose.rotY, pose.rotZ);
      } else if (w.hover) {
        w.obj.position.y = w.base.y + Math.sin(this.time * 1.1 + w.phase) * 0.06;
        w.base.rotY += dt * 0.28;
        w.obj.rotation.y = w.base.rotY;
      }
    }
  }

  private finishVerb(a: VerbAnim): false {
    const w = this.wordObjs.get(a.wordId);
    if (w) {
      w.obj.scale.setScalar(w.base.scale);
      w.obj.rotation.set(0, w.base.rotY, 0);
    }
    return false;
  }

  private playVerb(wordId: string): void {
    const w = this.opts.words.get(wordId);
    const verb = memoryObjectFor(wordId, w?.word).verb;
    this.verbAnims = this.verbAnims.filter((a) => a.wordId !== wordId);
    this.verbAnims.push({ wordId, verb, t: 0 });
  }

  private readonly onResize = (): void => {
    if (this.disposed) return;
    const w = this.host.clientWidth || window.innerWidth;
    const h = this.host.clientHeight || window.innerHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h);
    this.post?.composer.setSize(w, h);
    this.camera.aspect = w / h;
    const fov = baseFovFor(w / h);
    this.cinema.baseFov = fov;
    if (this.pov.pov === "you" || this.pov.pov === "me") this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.pov.setBaseFov(fov);
  };

  // ───────────────────────── 节拍 ─────────────────────────

  private async runBeat(beat: Beat): Promise<void> {
    switch (beat.kind) {
      case "narrate":
        return this.doNarrate(beat);
      case "touch":
        return this.doTouch(beat);
      case "gap":
        return this.doGap(beat);
      case "choice":
        return this.doChoice(beat);
      case "actor":
        return this.doActor(beat);
      case "pov":
        this.setPov(beat.to);
        if (beat.camera) await this.until(this.cinema.shot(beat.camera));
        return;
      case "paper":
        return this.doPaper(beat);
      case "wait":
        return this.sleep(beat.seconds * 1000);
      case "build":
        return this.doBuild(beat);
      case "dive":
        return this.doDive(beat);
      case "weather":
        this.setWeather(beat.weather, beat.seconds ?? 6);
        if (beat.look) this.look.setTarget(LOOKS[beat.look] ?? lookFor(beat.look), 2);
        return;
      case "acts":
        return this.runActs(beat);
      case "freeze":
        return this.doFreeze(beat);
    }
  }

  /** 切换天气（不阻塞）；也是对外的 API（脚本节拍、测试页） */
  setWeather(kind: WeatherKind, seconds = 6): void {
    this.weather.set(kind, seconds);
  }

  /** 切换记忆色调（2 秒平滑） */
  setLook(id: string, seconds = 2): void {
    this.look.setTarget(LOOKS[id] ?? lookFor(id), seconds);
  }

  private setPov(pov: Pov): void {
    this.opts.onMusicScene?.(pov === "paper" ? "study" : "memory");
    if (pov !== "me" && this.meViewer) {
      this.meViewer.root.visible = true;
      this.meViewer = null;
    }
    this.pov.setPov(pov);
    this.hud.setPov(pov);
    this.cinema.letterbox(pov === "watch");
  }

  private vocabIn(text: string): string[] {
    return this.unitWordForms.filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(text));
  }

  private pieceDuration(ref: string, target: string): number {
    const piece = this.script?.pieces?.find((p) => p.id === ref);
    return piece?.duration ?? this.pieceOverrides.get(target)?.duration ?? 2.8;
  }

  private resolveTarget(ref: string): string {
    return this.script?.pieces?.find((p) => p.id === ref)?.target ?? ref;
  }

  /**
   * 朗读一句话：字幕逐词点亮；朗读过程中把 build 里的部件均匀分布在句子里逐个显形。
   * 玩家点“跳过”会立刻结束朗读并把剩余部件显形。
   */
  private async readAloud(text: string, voice: "system" | "young" | "old", build: string[], speak = true, opts: { quiet?: boolean; onWord?: (index: number) => void } = {}): Promise<void> {
    this.flow.setSentence(text);
    this.flow.setSpeaking(true);
    const count = Math.max(1, splitWords(text).length);
    const refs = build.filter((r) => this.materializer.has(this.resolveTarget(r)));
    const triggers = refs.map((_, k) => Math.floor((k / refs.length) * count * 0.8));
    let next = 0;
    const revealUpTo = (index: number): void => {
      while (next < refs.length && triggers[next] <= index) {
        const target = this.resolveTarget(refs[next]);
        void this.materializer.reveal(target, this.pieceDuration(refs[next], target), { letters: text });
        next++;
      }
    };
    revealUpTo(0);
    // quiet：第一人称的讲义自己高亮，不动字幕条
    if (!opts.quiet) {
      this.hud.beginReading();
      this.hud.setSkipVisible(true);
    }
    const unsub = this.narrator.onWord((e) => {
      for (const a of this.actors.values()) if (a.speaking) a.pulse(0.7);
      if (!opts.quiet) this.hud.setReadProgress(e.index);
      opts.onWord?.(e.index);
      revealUpTo(e.index);
    });
    const speakerId = [...this.actors.values()].find((a) => a.speaking)?.id;
    const timing = speak ? this.narrator.speak(text, voice, speakerId) : this.skippableSleep(Narrator.estimate(text) * 1000);
    await this.until(timing);
    unsub();
    // 没来得及触发的部件（跳过 / 词数太少）立即开始显形
    revealUpTo(Number.MAX_SAFE_INTEGER);
    if (!opts.quiet) {
      this.hud.setSkipVisible(false);
      this.hud.endReading();
      this.hud.setReadProgress(Number.MAX_SAFE_INTEGER);
    }
    this.flow.setSpeaking(false);
  }

  private async doNarrate(b: Extract<Beat, { kind: "narrate" }>): Promise<void> {
    this.setPov(b.pov);
    if (b.camera) void this.cinema.shot(b.camera);
    this.hud.setSubtitle(b.text, b.zh, { vocab: this.vocabIn(b.text) });
    // 说这句话的人物：嘴 / 手势 / 其他人的视线与点头跟着他
    const speaker = b.speaker ? this.actors.get(b.speaker) : undefined;
    speaker?.setSpeaking(true);
    try {
      await this.readAloud(b.text, b.voice ?? "system", b.build ?? [], b.speak !== false);
    } finally {
      speaker?.setSpeaking(false);
    }
    await this.sleep(600);
  }

  private readonly viewerEye = new THREE.Vector3();
  private readonly captionTracker = new CaptionTracker();
  private nameCaption: NameCaption | null = null;
  private readonly frustum = new THREE.Frustum();
  private readonly frustumMatrix = new THREE.Matrix4();
  private readonly captionPoint = new THREE.Vector3();

  /** 名字小字：当年的我第一次出现 / 同学第一次说话时头顶浮出 1.5 s */
  private updateCaptions(dt: number): void {
    this.nameCaption ??= new NameCaption(this.host);
    this.frustumMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.frustumMatrix);
    const thirdPerson = this.pov.pov === "watch";
    for (let i = 0; i < this.actorList.length; i++) {
      const a = this.actorList[i];
      if (this.captionTracker.has(a.id)) continue;
      const isViewer = this.meViewer === a;
      a.eyePosition(this.captionPoint);
      const inView = a.root.visible && this.camera.position.distanceTo(this.captionPoint) < 12 && this.frustum.containsPoint(this.captionPoint);
      const text = this.captionTracker.consider(a.id, a.actor.name, { inView, speaking: a.speaking, thirdPerson, isViewer });
      if (text) this.nameCaption.show(text, () => (a.root.visible ? a.eyePosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.3, 0)) : null));
    }
    this.nameCaption.update(dt, this.camera);
  }

  /** 群体注意力：谁在说话，其余人看谁、点头；第一人称里同学偶尔瞟一眼玩家 */
  private updateAttention(): void {
    const viewer = this.pov.pov === "me" ? this.meViewer : null;
    if (viewer) viewer.eyePosition(this.viewerEye);
    updateCrowd(this.actorList, viewer ? { handle: viewer, eye: this.viewerEye } : undefined);
  }

  private nameOf(wordId: string): string {
    return `word:${wordId}`;
  }

  private async doTouch(b: Extract<Beat, { kind: "touch" }>): Promise<void> {
    this.setPov("you");
    // 上一句旁白的字幕不留在画面上：触碰阶段底部只有一行提示（带进度）
    this.hud.clearSubtitle();
    this.hud.hideWordCard();
    const targets = b.wordIds.filter((id) => this.materializer.has(this.nameOf(id)));
    const total = targets.length;
    let touched = 0;
    const progressPrompt = (): string => `${b.prompt} ${touched} / ${total}`;
    this.hud.setPrompt(progressPrompt(), b.zh);
    for (const id of targets) {
      this.materializer.setGhost(this.nameOf(id), 0.55);
      this.beacons.add(id, this.wordObjs.get(id)!.obj);
    }
    this.frameTouchTargets(targets);
    await new Promise<void>((resolve) => {
      if (total === 0) return resolve();
      const hit = (id: string): void => {
        if (!targets.includes(id) || this.touchedNow.has(id)) return;
        this.touchedNow.add(id);
        this.interaction.remove(id);
        this.beacons.remove(id);
        this.touchWord(id);
        touched++;
        this.hud.setPrompt(progressPrompt(), b.zh);
        if (touched === total) resolve();
      };
      this.touchedNow.clear();
      void this.abortSignal().then(() => resolve());
      this.interaction.enable(
        targets.map((id) => {
          const w = this.opts.words.get(id);
          return { id, object: this.wordObjs.get(id)!.obj, label: w ? { word: w.word, phonetic: w.phonetic } : undefined };
        }),
        hit
      );
      // 测试开关：按顺序逐个触碰
      if (this.flags.auto) {
        void (async () => {
          for (const id of targets) {
            await this.sleep(AUTO_DELAY_MS);
            if (this.exited) return;
            hit(id);
          }
        })();
      }
    });
    this.interaction.disable();
    this.beacons.clear();
    this.pov.releaseFraming();
    await this.until(this.speechChain);
    this.hud.setPrompt();
    this.hud.hideWordCard();
    this.cardAnchor = null;
    await this.sleep(500);
  }

  /**
   * 触碰阶段开始时的 “到位” 动作：2090 年的他自己走到桌边一个能看清目标的位置（偏在画面一侧），
   * 同时跟随镜头平滑拉近 / 抬高、视线移向目标群的中心，让目标占满画面中部。到位之后仍然是你的视角，可以走动、拖动。
   */
  private frameTouchTargets(ids: string[]): void {
    const union = new THREE.Box3();
    for (const id of ids) {
      const obj = this.wordObjs.get(id)?.obj;
      if (obj) union.union(new THREE.Box3().setFromObject(obj));
    }
    if (union.isEmpty()) return;
    const center = union.getCenter(new THREE.Vector3());
    const size = union.getSize(new THREE.Vector3());
    const span = Math.max(size.x, size.z, 1);
    const vHalf = THREE.MathUtils.degToRad(this.cinema.baseFov) / 2;
    const hHalf = Math.atan(Math.tan(vHalf) * (this.camera.aspect || 1.6));
    const fit = THREE.MathUtils.clamp((span / 2 + 0.6) / Math.tan(Math.min(hHalf, vHalf * 1.4)), 3.4, 9);
    // 站在目标群靠近玩家的一侧、偏左一点（他不挡在目标正前方）
    const here = this.pov.player;
    const toward = new THREE.Vector3(here.x - center.x, 0, here.z - center.z);
    if (toward.lengthSq() < 0.5) toward.set(0, 0, 1);
    toward.normalize();
    const lateral = THREE.MathUtils.clamp(span * 0.28, 0.8, 2.2);
    const stand = new THREE.Vector3(center.x + toward.x * 1.5 - toward.z * lateral, 0, center.z + toward.z * 1.5 + toward.x * lateral);
    this.pov.moveTo(stand.x, stand.z, 3.6);
    const dist = THREE.MathUtils.clamp(fit - 1.5, 2.2, 6.5);
    this.pov.frameFocus(new THREE.Vector3(center.x, Math.max(0.6, union.min.y + (union.max.y - union.min.y) * 0.45), center.z), dist, THREE.MathUtils.clamp(1.1 + dist * 0.2, 1.6, 2.5));
  }

  /** 点地面：2090 年的他走过去（click-to-move）。点到物件走的是 Interaction，不会到这里 */
  private onFloorTap(clientX: number, clientY: number): void {
    if (this.exited || this.pov.pov !== "you" || this.cinema.frozen) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.floorRay.setFromCamera(ndc, this.camera);
    const hit = this.floorRay.ray.intersectPlane(this.floorPlane, new THREE.Vector3());
    if (hit && hit.distanceTo(this.camera.position) < 60) this.pov.moveTo(hit.x, hit.z);
  }

  /** 触碰一个词：物件完整显形落位 + verb 动画 + 贴在物件旁的词卡 + 朗读词与旁白 */
  private touchWord(id: string): void {
    const w = this.opts.words.get(id);
    const def = memoryObjectFor(id, w?.word);
    const name = this.nameOf(id);
    this.materializer.setGhost(name, 0);
    void this.materializer.reveal(name, 1.5, { letters: w?.word });
    this.playVerb(id);
    this.wordsSeen.add(id);
    this.showCardAt(id, { word: w?.word ?? id, phonetic: w?.phonetic, meaning: w?.meaning, line: def.line }, 3200);
    const word = w?.word ?? id;
    this.speechChain = this.speechChain.then(async () => {
      if (this.exited) return;
      await this.narrator.speak(word, "system");
      if (this.exited) return;
      await this.narrator.speak(def.line, "system");
    });
  }

  /** 词卡跟随某个物件（屏幕投影，夹在视口内） */
  private showCardAt(wordId: string, info: Parameters<MemoryHud["showWordCard"]>[0], ms: number): void {
    this.cardAnchor = this.wordObjs.get(wordId)?.obj ?? null;
    this.hud.showWordCard(info, ms);
    this.updateCardAnchor();
  }

  private updateCardAnchor(): void {
    if (!this.cardAnchor || !this.hud.cardOn) return;
    const w = this.host.clientWidth || window.innerWidth;
    const h = this.host.clientHeight || window.innerHeight;
    const box = this.boxTmp.setFromObject(this.cardAnchor);
    if (box.isEmpty()) return;
    const cx = (box.min.x + box.max.x) / 2;
    const cz = (box.min.z + box.max.z) / 2;
    const top = this.vTmp.set(cx, box.max.y, cz).project(this.camera);
    const bottom = this.vTmp2.set(cx, box.min.y, cz).project(this.camera);
    if (top.z > 1) return;
    this.hud.placeCard((top.x * 0.5 + 0.5) * w, (-top.y * 0.5 + 0.5) * h, w, h, (-bottom.y * 0.5 + 0.5) * h);
  }

  /**
   * 断片的机位：把候选物件的包围盒并起来，按相机视野算出能框住它们（连同头顶的问号）的距离，
   * 从略高的位置俯看，这样桌边坐着的人不会挡住桌面上的物件。方向参考脚本里给的机位（缺省为当前机位方向）。
   */
  private frameCandidates(ids: string[], hint?: CameraShot): CameraShot | null {
    const union = new THREE.Box3();
    for (const id of ids) {
      const obj = this.wordObjs.get(id)?.obj;
      if (obj) union.union(new THREE.Box3().setFromObject(obj));
    }
    if (union.isEmpty()) return null;
    union.max.y += 0.35; // 问号与光晕
    const center = union.getCenter(new THREE.Vector3());
    const size = union.getSize(new THREE.Vector3());
    const radius = Math.max(0.5, size.length() / 2 + 0.12);
    const vHalf = THREE.MathUtils.degToRad(this.cinema.baseFov) / 2;
    const hHalf = Math.atan(Math.tan(vHalf) * (this.camera.aspect || 1.6));
    const dist = THREE.MathUtils.clamp((radius / Math.sin(Math.min(vHalf, hHalf))) * 1.08, 2.4, 7.5);

    const from = hint ? new THREE.Vector3(hint.to.x, 0, hint.to.z) : new THREE.Vector3(this.camera.position.x, 0, this.camera.position.z);
    const dir = from.sub(new THREE.Vector3(center.x, 0, center.z));
    if (dir.lengthSq() < 0.05) dir.set(0, 0, 1);
    dir.normalize();
    const lift = THREE.MathUtils.clamp(dist * 0.5, 0.9, 2.5);
    const pos = new THREE.Vector3(center.x + dir.x * dist, center.y + lift, center.z + dir.z * dist);
    const cb = this.stageDef?.cameraBounds ?? this.stageDef?.bounds;
    if (cb) {
      pos.x = THREE.MathUtils.clamp(pos.x, cb.minX, cb.maxX);
      pos.z = THREE.MathUtils.clamp(pos.z, cb.minZ, cb.maxZ);
    }
    pos.y = Math.min(pos.y, 3.1);
    return { to: { x: pos.x, y: pos.y, z: pos.z }, look: { x: center.x, y: center.y - 0.1, z: center.z }, duration: 1.8, move: "dolly" };
  }

  private async doGap(b: Extract<Beat, { kind: "gap" }>): Promise<void> {
    this.setPov("watch");
    this.hud.hideWordCard();
    const answer = this.opts.words.get(b.answerWordId);
    const token = answer ? findWordToken(b.sentence, answer.word) : null;
    this.hud.setSubtitle(b.sentence, b.zh, { vocab: [], blank: token ?? undefined });
    this.flow.setSentence(b.sentence);
    for (const ref of b.build ?? []) {
      const target = this.resolveTarget(ref);
      void this.materializer.reveal(target, this.pieceDuration(ref, target), { letters: b.sentence });
    }

    // 候选 = 答案 + 干扰（答案一定在内）。机位由候选的包围盒算出，保证它们全部入画
    const ids = [b.answerWordId, ...b.decoyWordIds].filter((id) => this.materializer.has(this.nameOf(id)) && this.wordObjs.has(id));
    if (!ids.includes(b.answerWordId)) console.warn(`[memory] 断片的答案物件不存在: ${b.answerWordId}`);
    const shot = this.frameCandidates(ids, b.camera) ?? b.camera;
    if (shot) void this.cinema.shot(shot);

    // 候选：完整显形（让玩家看清是什么），光晕 + 问号脉动；其余已显形的物件稍微退暗
    const wasRevealed = new Set(ids.filter((id) => this.materializer.isRevealed(this.nameOf(id))));
    for (const id of ids) {
      this.materializer.setGhost(this.nameOf(id), 0);
      if (!wasRevealed.has(id)) void this.materializer.reveal(this.nameOf(id), 1.1, { letters: b.sentence });
      this.marks.add(id, this.wordObjs.get(id)!.obj);
    }
    for (const [id, w] of this.wordObjs) {
      if (!ids.includes(id) && this.materializer.isRevealed(this.nameOf(id))) this.materializer.setDim(w.obj, 0.7);
    }
    await new Promise<void>((resolve) => {
      void this.abortSignal().then(() => resolve());
      const onPick = (id: string): void => {
        if (id === b.answerWordId) {
          this.interaction.disable();
          resolve();
          return;
        }
        // 答错：物件暗下去、胶片轻微抖动，可再选
        this.mistakes++;
        this.interaction.remove(id);
        this.marks.dismiss(id);
        this.materializer.setDim(this.wordObjs.get(id)!.obj, 0.75);
        this.hud.shakeSubtitle();
        this.cinema.glitch(0.6);
      };
      this.interaction.enable(
        ids.map((id) => {
          const w = this.opts.words.get(id);
          return { id, object: this.wordObjs.get(id)!.obj, label: w ? { word: w.word, phonetic: w.phonetic } : undefined };
        }),
        onPick,
        { labels: true, alwaysLabels: true, baseGlow: 1.0 }
      );
      // 测试开关：直接选对答案
      if (this.flags.auto) {
        void this.sleep(AUTO_DELAY_MS).then(() => {
          if (!this.exited) onPick(b.answerWordId);
        });
      }
    });
    this.interaction.disable();
    this.marks.clear();
    for (const w of this.wordObjs.values()) this.materializer.setDim(w.obj, 0);
    if (this.dead) return;

    // 答对：空位填上，答案物件落位，没出现过的干扰物件散去，继续朗读整句
    this.hud.fillBlank(token?.text ?? answer?.word ?? "");
    for (const id of ids) {
      if (id !== b.answerWordId && !wasRevealed.has(id)) void this.materializer.hide(this.nameOf(id), 1.0);
    }
    this.playVerb(b.answerWordId);
    this.wordsSeen.add(b.answerWordId);
    this.showCardAt(b.answerWordId, { word: answer?.word ?? "", phonetic: answer?.phonetic, meaning: answer?.meaning }, 2600);
    await this.readAloud(b.sentence, "system", []);
    this.hud.hideWordCard();
    this.cardAnchor = null;
    await this.sleep(500);
  }

  private actorByName(name: string): ActorHandle | undefined {
    const key = name.trim().toLowerCase();
    for (const a of this.actors.values()) if (a.id.toLowerCase() === key || a.actor.name.toLowerCase() === key) return a;
    return undefined;
  }

  /** 第一人称：借 viewer 的眼睛看，朝向说话的人（或 lookAt / viewer 自己的朝向）；viewer 的身体隐藏 */
  private enterFirstPerson(viewerId: string, speaker: string, lookAt?: Vec3): void {
    const viewer = this.actors.get(viewerId);
    if (viewer && viewer !== this.meViewer) {
      this.meViewer = viewer;
      viewer.root.visible = false;
    }
    if (viewer) {
      const eye = viewer.eyePosition(new THREE.Vector3());
      const speakerActor = this.actorByName(speaker);
      let target: THREE.Vector3 | null = null;
      if (speakerActor && speakerActor !== viewer) target = speakerActor.eyePosition(new THREE.Vector3());
      else if (lookAt) target = new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z);
      if (target) {
        const d = target.sub(eye);
        this.pov.setEyeAnchor(eye, Math.atan2(d.x, d.z), Math.atan2(d.y, Math.hypot(d.x, d.z)));
      } else {
        this.pov.setEyeAnchor(eye, viewer.actor.rotationY ?? 0, 0);
      }
    }
    this.setPov("me");
  }

  private async doChoice(b: Extract<Beat, { kind: "choice" }>): Promise<void> {
    this.hud.hideWordCard();
    this.enterFirstPerson(b.viewer ?? "me2026", b.speaker, b.lookAt);
    const askVoice = b.voice ?? "young";
    const ask = async (): Promise<void> => {
      this.hud.setSubtitle(`${b.speaker}: ${b.line}`, b.zh, { vocab: this.vocabIn(b.line) });
      await this.readAloud(b.line, askVoice, []);
    };
    await ask();
    const items = b.options.map((o) => ({ label: o.label ?? (o.wordId ? this.opts.words.get(o.wordId)?.word : undefined) ?? o.wordId ?? "", sub: o.wordId ? o.reply : undefined }));
    await new Promise<void>((resolve) => {
      void this.abortSignal().then(() => resolve());
      let busy = false;
      const pickOption = (i: number): void => {
        const opt = b.options[i];
        if (!opt || busy) return;
        if (opt.soft) {
          // “还没准备好”：不算答错。回一句话，停两秒，再问一次
          busy = true;
          this.hud.setSubtitle(opt.reply, undefined, { vocab: [] });
          void (async () => {
            await this.readAloud(opt.reply, askVoice, []);
            await this.sleep(2000);
            if (!this.exited) await ask();
            busy = false;
          })();
          return;
        }
        if (!opt.correct) {
          this.mistakes++;
          this.hud.markChoice(i, "wrong");
          this.hud.setSubtitle(`(${b.speaker} looks confused.)`, "（对方露出困惑的神情。）");
          return;
        }
        busy = true;
        this.hud.markChoice(i, "right");
        if (opt.wordId) this.wordsSeen.add(opt.wordId);
        this.hud.hideChoices();
        this.hud.setSubtitle(opt.reply, undefined, { vocab: this.vocabIn(opt.reply) });
        void this.readAloud(opt.reply, opt.wordId ? "young" : askVoice === "system" ? "old" : "young", []).then(() => resolve());
      };
      this.hud.showChoices(items, pickOption);
      // 测试开关：直接选第一个正确的选项
      if (this.flags.auto) {
        void this.sleep(AUTO_DELAY_MS).then(() => {
          const i = b.options.findIndex((o) => o.correct && !o.soft);
          if (!this.exited && i >= 0) pickOption(i);
        });
      }
    });
    this.hud.hideChoices();
    await this.sleep(400);
  }

  /** 让一批部件 / 人物 / 物件显形（不朗读） */
  private async doBuild(b: Extract<Beat, { kind: "build" }>): Promise<void> {
    if (b.pov) this.setPov(b.pov);
    if (b.camera) void this.cinema.shot(b.camera);
    const dur = b.duration ?? 2.4;
    b.targets.forEach((ref, i) => {
      const name = this.actors.has(ref) ? `actor:${ref}` : this.wordObjs.has(ref) ? this.nameOf(ref) : this.resolveTarget(ref);
      void this.materializer.reveal(name, dur, { delay: i * 0.18 });
    });
    await this.sleep((b.wait ?? dur) * 1000);
  }

  /** 下潜：光粒洪流越来越急，他慢慢闭上眼睛（渐黑，不再淡白） */
  private async doDive(b: Extract<Beat, { kind: "dive" }>): Promise<void> {
    const sec = b.seconds ?? 3.4;
    this.diving = true;
    this.hud.clearSubtitle();
    this.hud.setPrompt();
    this.flow.setSpeed(9);
    this.flow.setVisibility(1.8);
    this.flow.setAttractor(this.camera.position, 1);
    await this.until(this.closeEyes(sec));
  }

  private async doActor(b: Extract<Beat, { kind: "actor" }>): Promise<void> {
    const a = this.actors.get(b.actorId);
    if (!a) return;
    switch (b.action) {
      case "enter":
        if (b.to) a.root.position.set(b.to.x, b.to.y, b.to.z);
        if (b.pose) a.setPose(b.pose);
        void this.materializer.reveal(a.root, b.duration ?? 1.8);
        return;
      case "walk":
        if (b.to) await this.until(a.walkTo(b.to, b.duration ?? 2));
        return;
      case "pose":
        if (b.pose) a.setPose(b.pose);
        return;
      case "exit":
        await this.until(this.materializer.hide(a.root, b.duration ?? 1.4));
        return;
    }
  }

  private getPaper(): PaperLayer {
    this.paper ??= new PaperLayer(
      this.host,
      (id) => {
        const w = this.opts.words.get(id);
        return w ? { word: w.word, meaning: w.meaning } : undefined;
      },
      this.quality === "low"
    );
    return this.paper;
  }

  private async doPaper(b: Extract<Beat, { kind: "paper" }>): Promise<void> {
    const prev = this.pov.pov;
    this.setPov("paper");
    this.hud.clearSubtitle();
    this.cinema.setDim(this.quality === "low" ? 0.55 : 0.4);
    const paper = this.getPaper();
    const shown = paper.show(b.page);
    if (this.flags.auto) void this.sleep(AUTO_DELAY_MS).then(() => paper.autoSolve());
    const ok = await this.until(shown);
    if (!ok) paper.hide(); // 退出时立即收起；填完时由纸页自己淡出
    this.cinema.setDim(0);
    for (const id of b.page.lines.flatMap((l) => [...l.matchAll(/\{\{([^{}]+)\}\}/g)].map((m) => m[1]))) this.wordsSeen.add(id);
    if (!this.exited) this.setPov(prev === "paper" ? "watch" : prev);
  }

  private async doFreeze(b: Extract<Beat, { kind: "freeze" }>): Promise<void> {
    this.setPov("watch");
    this.hud.clearSubtitle();
    // 回忆完整：所有尚未显形的部件与物件一起浮现
    this.materializer.forEach((p) => {
      if (p.state === "hidden" && p.id !== "old-self") {
        this.materializer.setGhost(p.id, 0);
        void this.materializer.reveal(p.id, 2.2);
      }
    });
    await this.sleep(2400);
    this.narrator.cancel();
    await this.until(this.cinema.freezeFrame(b.caption, b.zh));
    const distracted = b.epilogueDistracted && this.focusScores.size > 0 && averageFocus([...this.focusScores.values()]) < 0.7;
    const epilogue = distracted ? b.epilogueDistracted : b.epilogue;
    if (epilogue && !this.exited) await this.playEpilogue(epilogue);
  }

  /** 淡白之后回到 2090 年：深蓝的夜，老年的他轻声说一句话 */
  private async playEpilogue(e: NonNullable<Extract<Beat, { kind: "freeze" }>["epilogue"]>): Promise<void> {
    this.hud.setCaption();
    this.hud.showEpilogue(e.text, e.zh);
    await this.sleep(2200);
    await this.until(this.narrator.speak(e.text, e.voice ?? "old"));
    await this.sleep(2800);
    await this.until(this.hud.fade(true, 1400));
  }

  // ───────────────────────── 幕：时间线与三种视角 ─────────────────────────
  //
  // 一段回忆 = 课文按段落切成的若干幕。三种视角（他 / 我 / 纸）看的是同一幕的不同内容，进度共享：
  //  - 他（默认）：电影，本幕句子逐句朗读，世界继续生长，每幕一次断片；
  //  - 我：坐在当年我的位子上上课（预习生词 → 跟读 → 课堂提问 → 记笔记）；
  //  - 纸：当年的笔记本（漫画格 + 生词卡 + 笔记任务）。
  // 玩家随时可以点右上角的 他 / 我 / 纸：本轮立刻中断（abortSession），同一幕换一种内容重新开始。

  private ensureStudy(): NonNullable<MemoryStage["study"]> {
    if (this.study) return this.study;
    this.gloss ??= buildGlossIndex(this.unitWords, this.opts.words.values());
    const layer = createStudyLayer(this.host, this.hud.root, this.quality === "low");
    const deps: StudyDeps = {
      words: this.opts.words,
      gloss: this.gloss,
      speak: (text, voice) => this.narrator.speak(text, voice ?? "system"),
      lowQuality: this.quality === "low",
    };
    const handout = new Handout(layer, deps);
    handout.onSpeed = (scale) => setNarratorRate(scale);
    handout.onSkip = () => this.skip();
    const notebook = new Notebook(layer, deps);
    notebook.onMistake = () => {
      this.mistakes++;
    };
    notebook.onCard = (id) => {
      this.mastered.add(id);
      this.wordsSeen.add(id);
    };
    if (this.flags.auto) notebook.setAuto(AUTO_STUDY_MS);
    const spec = this.script?.distraction;
    const phone = spec ? new PhoneNag(layer, spec.messages) : null;
    this.study = { layer, handout, notebook, phone };
    return this.study;
  }

  private async runActs(beat: Extract<Beat, { kind: "acts" }>): Promise<void> {
    const acts = this.script?.acts ?? [];
    if (acts.length === 0) return;
    this.ensureStudy();
    this.actState = initFlow(acts.length, this.flags.pov ?? beat.startPov ?? "watch");
    this.hud.setActSwitcher(true);
    this.hud.onPickPov = (pov) => this.requestPov(pov);
    try {
      while (!this.exited && this.actState && !this.actState.finished) {
        const act = acts[this.actState.act];
        const pov = this.actState.pov;
        this.session = newSession();
        this.refreshActHud();
        const finished = await this.playAct(act, pov);
        if (this.exited || !this.actState) break;
        // 玩家切换了视角：同一幕换一种内容。playAct 里每个等待都会在中断时立刻返回，所以残余已经收拾干净
        if (!finished) continue;
        this.actState = flowReduce(this.actState, pov === "watch" ? { type: "complete", pov } : { type: "next" });
      }
    } finally {
      this.leaveActs();
    }
  }

  private leaveActs(): void {
    this.hud.setActSwitcher(false);
    this.hud.onPickPov = undefined;
    this.hideStudyOverlays();
    setNarratorRate(1);
    this.session = newSession();
  }

  private hideStudyOverlays(): void {
    const study = this.study;
    if (study) {
      study.handout.hide();
      study.notebook.hide();
      study.phone?.stop();
    }
    this.hud.hideQuiz();
    this.pov.setLookDown(0);
    this.cinema.setDim(0);
  }

  /** 玩家点了右上角的某个视角 */
  private requestPov(pov: ActPov): void {
    const state = this.actState;
    if (!state || state.finished || this.exited || pov === state.pov) return;
    this.actState = flowReduce(state, { type: "switch", pov });
    this.hud.setActPov(pov);
    this.abortSession();
  }

  private abortSession(): void {
    this.narrator.cancel();
    this.session.abort();
    for (const hook of [...this.skipHooks]) hook();
  }

  private refreshActHud(): void {
    const state = this.actState;
    if (!state) return;
    const acts = this.script?.acts ?? [];
    this.hud.setActPov(state.pov);
    this.hud.setActDots(
      state.total,
      state.act,
      state.progress.map(actSeen),
      state.progress.map((p, i) => acts[i] !== undefined && notesEmpty(p, acts[i]))
    );
  }

  /** 播放一幕的一种视角。返回 true = 这一幕在这个视角完成了；false = 被切换视角（或退出）打断 */
  private async playAct(act: MemoryAct, pov: ActPov): Promise<boolean> {
    try {
      for (const cue of act.actorCues ?? []) {
        if (this.dead) return false;
        await this.doActor(cue as Extract<Beat, { kind: "actor" }>);
      }
      if (this.dead) return false;
      if (pov === "watch") return await this.watchAct(act);
      if (pov === "me") return await this.meAct(act);
      return await this.paperAct(act);
    } catch (err) {
      console.error("[memory] 幕执行出错", err);
      return !this.dead; // 一幕出错不拖垮整段回忆：当作完成，进入下一幕
    }
  }

  private studentId(): string {
    return this.script?.student ?? "me2026";
  }

  private organizerActor(): ActorHandle | undefined {
    const id = this.script?.organizer;
    if (id) return this.actors.get(id);
    return [...this.actors.values()].find((a) => a.id !== this.studentId());
  }

  /** 进入某个视角：他 = 电影机位；我 / 纸 = 当年我的眼睛（纸多低一点头） */
  private enterActPov(pov: ActPov): void {
    this.hud.setActPov(pov);
    this.hud.hideWordCard();
    this.interaction.disable();
    this.marks.clear();
    this.hud.clearSubtitle();
    this.hud.hideChoices();
    this.hud.hideQuiz();
    this.hud.setPrompt();
    if (pov === "watch") {
      this.setPov("watch");
      this.pov.setLookDown(0);
      return;
    }
    const organizer = this.organizerActor();
    this.enterFirstPerson(this.studentId(), organizer?.actor.name ?? "", organizer ? undefined : { x: 0, y: 1.3, z: -1.5 });
    this.hud.setPov(pov === "paper" ? "paper" : "me");
    this.opts.onMusicScene?.(pov === "paper" ? "study" : "memory");
  }

  private async ensureBuilt(act: MemoryAct): Promise<void> {
    const refs = [...(act.build ?? []), ...(act.cues ?? []).flatMap((c) => c.build ?? [])];
    const jobs = refs.map((ref) => {
      const target = this.resolveTarget(ref);
      return this.materializer.has(target) ? this.materializer.reveal(target, 1.0) : Promise.resolve();
    });
    await this.until(Promise.all(jobs));
  }

  // ───────── 他：第三人称 ─────────

  private async watchAct(act: MemoryAct): Promise<boolean> {
    this.hideStudyOverlays();
    this.enterActPov("watch");
    const stage = this.stageDef;
    for (const ref of act.build ?? []) {
      const target = this.resolveTarget(ref);
      if (this.materializer.has(target)) void this.materializer.reveal(target, this.pieceDuration(ref, target));
    }
    for (let i = 0; i < act.sentences.length; i++) {
      if (this.dead) return false;
      const cue = act.cues?.[i];
      const sentence = act.sentences[i];
      let camera = cue?.camera;
      if (!camera && i === 0 && stage && stage.shots.length > 0) camera = stage.shots[act.index % stage.shots.length];
      if (act.gap && act.gap.sentence === i) {
        await this.doGap({ kind: "gap", sentence, zh: cue?.zh, answerWordId: act.gap.answerWordId, decoyWordIds: act.gap.decoyWordIds, camera, build: cue?.build });
      } else {
        await this.doNarrate({ kind: "narrate", pov: "watch", text: sentence, zh: cue?.zh, build: cue?.build, camera, voice: "system" });
      }
    }
    if (this.dead) return false;
    if (act.dialog) await this.watchDialog(act.dialog);
    if (this.dead) return false;
    this.captureComic(act, false);
    return true;
  }

  /** 附身对话在第三人称里是旁观：对方说话，当年的我用正确的那个词回答 */
  private async watchDialog(d: ActDialog): Promise<void> {
    const speaker = this.actorByName(d.speaker);
    const me = this.actors.get(this.studentId());
    speaker?.setPose("talk");
    this.hud.setSubtitle(`${d.speaker}: ${d.line}`, d.zh, { vocab: this.vocabIn(d.line) });
    await this.readAloud(d.line, "young", []);
    if (this.dead) return;
    const reply = d.options.find((o) => o.correct)?.reply;
    if (reply) {
      speaker?.setPose("listen");
      me?.setPose("talk");
      this.hud.setSubtitle(`Me: ${reply}`, undefined, { vocab: this.vocabIn(reply) });
      await this.readAloud(reply, "young", []);
    }
    speaker?.setPose("listen");
    me?.setPose("listen");
    await this.sleep(450);
  }

  // ───────── 我：第一人称，真实上课 ─────────

  private learnStateFor(act: MemoryAct): LearnState {
    let st = this.learnStates.get(act.index);
    if (!st) {
      st = initLearnState(act, this.notesDone.get(act.index) ?? 0);
      this.learnStates.set(act.index, st);
    }
    return st;
  }

  private learnEvent(act: MemoryAct, event: LearnEvent): LearnState {
    const next = nextLearnStep(this.learnStateFor(act), event);
    this.learnStates.set(act.index, next);
    return next;
  }

  private handoutHeader(act: MemoryAct): { unit: string; act: string } {
    const s = this.script!;
    return { unit: `${s.title}`, act: `Act ${act.index + 1} / ${s.acts?.length ?? 1}` };
  }

  private showHandout(act: MemoryAct): void {
    const { handout } = this.study!;
    if (handout.visible) return;
    handout.show(act, this.handoutHeader(act));
  }

  private async meAct(act: MemoryAct): Promise<boolean> {
    const { handout, notebook, phone } = this.ensureStudy();
    this.hideStudyOverlays();
    this.enterActPov("me");
    notebook.hide();
    if (phone && !this.flags.auto && this.learnStateFor(act).step !== "done") phone.begin(planDistractions(this.script!.id, act.index));
    try {
      for (;;) {
        if (this.dead) return false;
        const st = this.learnStateFor(act);
        if (st.step === "preview") await this.stepPreview(act);
        else if (st.step === "read") await this.stepRead(act);
        else if (st.step === "ask") await this.stepAsk(act);
        else {
          if (act.dialog && !this.dialogDone.has(act.index)) {
            handout.hide();
            await this.meDialog(act.dialog);
            if (this.dead) return false;
            this.dialogDone.add(act.index);
            continue;
          }
          return await this.runNotebook(act, "tasks");
        }
      }
    } finally {
      if (phone) {
        const score = focusScore(phone.taps);
        this.focusScores.set(act.index, Math.min(score, this.focusScores.get(act.index) ?? 1));
        phone.stop();
      }
      setNarratorRate(1);
      handout.onWordTap = undefined;
      handout.onSentenceTap = undefined;
      handout.onNext = undefined;
    }
  }

  private cleanToken(token: string): string {
    return token.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
  }

  /** ① 预习生词：讲义上本幕的单元词淡淡标出，点一个词 → 笔划线 + 页边批注 + 朗读 */
  private async stepPreview(act: MemoryAct): Promise<void> {
    const { handout } = this.study!;
    this.pov.setLookDown(0.5);
    this.cinema.setDim(0.28);
    this.showHandout(act);
    // 只有真的能在讲义上点到的词才算（极少数屈折形式查不到）
    const tappable = new Set(handout.vocabPositions().map((p) => p.entry.id));
    let st = this.learnStateFor(act);
    if (st.words.some((id) => !tappable.has(id))) {
      st = { ...st, words: st.words.filter((id) => tappable.has(id)) };
      this.learnStates.set(act.index, st);
    }
    if (st.words.length === 0) {
      this.learnStates.set(act.index, { ...st, step: "read" });
      return;
    }
    const refresh = (): void => {
      handout.setStep("1  New words: tap each marked word", `${st.tapped.length} / ${st.words.length}`);
      handout.setNext("Next ▸", st.tapped.length >= st.words.length);
    };
    handout.setTools({ speed: false, skip: false });
    refresh();
    await this.until(
      new Promise<void>((resolve) => {
        handout.onWordTap = (token, entry) => {
          void this.narrator.speak(this.cleanToken(token), "system");
          if (!entry || !st.words.includes(entry.id)) return;
          const next = this.learnEvent(act, { type: "tapWord", wordId: entry.id });
          if (next === st) return;
          st = next;
          this.mastered.add(entry.id);
          this.wordsSeen.add(entry.id);
          refresh();
        };
        handout.onSentenceTap = (i) => void this.narrator.speak(act.sentences[i], "system");
        handout.onNext = () => {
          const next = this.learnEvent(act, { type: "advance" });
          if (next.step !== st.step) resolve();
        };
        if (this.flags.auto) void this.autoPreview(handout);
      })
    );
  }

  private async autoPreview(handout: Handout): Promise<void> {
    for (const pos of handout.vocabPositions()) {
      await this.sleep(AUTO_STUDY_MS);
      if (this.dead) return;
      handout.tapToken(pos.si, pos.ti);
    }
    await this.sleep(AUTO_STUDY_MS);
    if (!this.dead) handout.clickNext();
  }

  private async readSentence(act: MemoryAct, i: number): Promise<void> {
    const { handout } = this.study!;
    handout.highlightSentence(i);
    await this.readAloud(act.sentences[i], "system", act.cues?.[i]?.build ?? [], true, { quiet: true, onWord: (index) => handout.highlightWord(index) });
  }

  /** ② 跟读课文：朗读本幕句子，当前句高亮、笔尖跟着走；随时可以点句子重听、点词查义，语速可调 */
  private async stepRead(act: MemoryAct): Promise<void> {
    const { handout } = this.study!;
    this.pov.setLookDown(0.5);
    this.cinema.setDim(0.28);
    this.showHandout(act);
    const st0 = this.learnStateFor(act);
    let passDone = st0.readDone;
    const ctl: { interrupt: Promise<void> | null; jumpTo: number | null } = { interrupt: null, jumpTo: null };
    handout.setTools({ speed: true, skip: true });
    handout.setStep("2  Read along", "tap a word or ▸ to hear it again");
    handout.setNext("Next ▸", passDone);

    const next = new Promise<void>((resolve) => {
      handout.onNext = () => {
        const s = this.learnEvent(act, { type: "advance" });
        if (s.step !== "read") resolve();
      };
    });
    handout.onWordTap = (token) => {
      ctl.interrupt = this.narrator.speak(this.cleanToken(token), "system");
    };
    handout.onSentenceTap = (i) => {
      this.narrator.cancel();
      if (passDone) void this.readSentence(act, i);
      else ctl.jumpTo = i;
    };

    const pass = (async (): Promise<void> => {
      if (passDone) return;
      let i = 0;
      while (i < act.sentences.length && !this.dead) {
        ctl.interrupt = null;
        ctl.jumpTo = null;
        await this.readSentence(act, i);
        if (this.dead) return;
        if (ctl.jumpTo !== null) {
          i = ctl.jumpTo;
          continue;
        }
        if (ctl.interrupt) {
          // 点词听了发音：把这一句从头再读
          await this.until(ctl.interrupt);
          continue;
        }
        await this.sleep(220);
        i++;
      }
      if (this.dead) return;
      this.learnEvent(act, { type: "readFinished" });
      passDone = true;
      handout.highlightSentence(null);
      handout.setNext("Next ▸", true);
    })();
    if (this.flags.auto) {
      void pass.then(async () => {
        await this.sleep(AUTO_STUDY_MS);
        if (!this.dead) handout.clickNext();
      });
    }
    await this.until(next);
    await this.until(pass);
    handout.onWordTap = undefined;
    handout.onSentenceTap = undefined;
    handout.onNext = undefined;
  }

  private chooseOption(options: readonly string[], wrong: ReadonlySet<number>, autoIndex: number): Promise<number | null> {
    return new Promise<number | null>((resolve) => {
      this.hud.showQuiz(options, (i) => {
        if (!wrong.has(i)) resolve(i);
      });
      wrong.forEach((i) => this.hud.markQuiz(i, "wrong"));
      void this.abortSignal().then(() => resolve(null));
      if (this.flags.auto) void this.sleep(AUTO_STUDY_MS).then(() => resolve(this.dead ? null : autoIndex));
    });
  }

  /** ③ 课堂提问：抬头，老师 / 组织者看着你问本幕的理解题；选对点头并讲解，选错说 “Look at the text again.” */
  private async stepAsk(act: MemoryAct): Promise<void> {
    const { handout } = this.study!;
    handout.hide();
    this.cinema.setDim(0);
    this.pov.setLookDown(0);
    this.enterActPov("me");
    const organizer = this.organizerActor();
    const name = organizer?.actor.name ?? "Teacher";
    for (;;) {
      const st = this.learnStateFor(act);
      if (st.step !== "ask" || this.dead) return;
      const q = act.questions[st.questionIndex];
      const wrong = new Set<number>();
      organizer?.setPose("talk");
      this.hud.setSubtitle(`${name}: ${q.question}`, undefined, { vocab: this.vocabIn(q.question) });
      await this.readAloud(q.question, "young", []);
      if (this.dead) return;
      organizer?.setPose("listen");
      for (;;) {
        const idx = await this.chooseOption(q.options, wrong, q.answer);
        if (idx === null || this.dead) {
          this.hud.hideQuiz();
          return;
        }
        if (idx === q.answer) {
          this.hud.markQuiz(idx, "right");
          this.learnEvent(act, { type: "answer", correct: true });
          this.hud.hideQuiz();
          organizer?.setPose("talk");
          const line = q.explanation || "Yes, that is right.";
          this.hud.setSubtitle(`${name}: ${line}`, undefined, { vocab: this.vocabIn(line) });
          await this.readAloud(line, "young", []);
          organizer?.setPose("listen");
          await this.sleep(300);
          break;
        }
        // 选错：老师让你再看一遍课文，相关的那一句在讲义上闪一下
        this.mistakes++;
        wrong.add(idx);
        this.learnEvent(act, { type: "answer", correct: false });
        this.hud.markQuiz(idx, "wrong");
        this.hud.hideQuiz();
        organizer?.setPose("talk");
        this.hud.setSubtitle(`${name}: Look at the text again.`, undefined, { vocab: [] });
        await this.readAloud("Look at the text again.", "young", []);
        if (this.dead) return;
        this.pov.setLookDown(0.5);
        this.cinema.setDim(0.28);
        this.hud.clearSubtitle();
        this.showHandout(act);
        handout.setTools({ speed: false, skip: false });
        handout.setStep("Look at the text again", "");
        handout.setNext(null);
        const flash = relatedSentences(act, q)[0];
        if (flash !== undefined) handout.flashSentence(flash, 2200);
        await this.sleep(2300);
        handout.hide();
        this.cinema.setDim(0);
        this.pov.setLookDown(0);
        if (this.dead) return;
        organizer?.setPose("listen");
        this.hud.setSubtitle(`${name}: ${q.question}`, undefined, { vocab: this.vocabIn(q.question) });
      }
    }
  }

  /** 附身对话（第一人称）：同学问了一句话，你用一个词回答 */
  private async meDialog(d: ActDialog): Promise<void> {
    this.pov.setLookDown(0);
    this.cinema.setDim(0);
    await this.doChoice({ kind: "choice", speaker: d.speaker, line: d.line, zh: d.zh, options: d.options, voice: "young", viewer: this.studentId() });
    const speaker = this.actorByName(d.speaker);
    speaker?.setPose("listen");
  }

  // ───────── 笔记本（第一人称低头记笔记 / 纸）─────────

  private keywordWordIds(task: Extract<NoteTask, { kind: "translate" }>): string[] {
    const ids: string[] = [];
    for (const kw of task.keywords) {
      const w = this.unitWords.find((u) => u.word.toLowerCase() === kw.toLowerCase());
      if (w) ids.push(w.id);
    }
    return ids;
  }

  /** 笔记本：tasks = 第一人称的笔记步骤；full = 纸（漫画格 + 生词卡 + 笔记）。玩家点 “下一幕” 才返回 true */
  private async runNotebook(act: MemoryAct, mode: "full" | "tasks"): Promise<boolean> {
    const { handout, notebook, phone } = this.study!;
    const acts = this.script!.acts ?? [];
    handout.hide();
    this.hud.clearSubtitle();
    this.hud.hideQuiz();
    let comic: HTMLCanvasElement | null = null;
    if (mode === "full") {
      comic = this.comics.get(act.index) ?? this.captureComic(act, true);
      if (this.dead) return false;
    }
    this.pov.setLookDown(mode === "full" ? 0.9 : 0.8);
    this.cinema.setDim(0.28);
    // 在第一人称里先把还没记的笔记同步给状态机
    if (mode === "tasks") {
      const done = this.notesDone.get(act.index) ?? 0;
      let st = this.learnStateFor(act);
      if (st.noteIndex < done) {
        st = { ...st, noteIndex: Math.min(done, st.notesTotal) };
        if (st.step === "notes" && st.noteIndex >= st.notesTotal) st = { ...st, step: "done" };
        this.learnStates.set(act.index, st);
      }
    }
    const total = acts.length;
    const finishLabel = act.index === total - 1 ? "Finish ▸" : "Next act ▸";
    const completePov: ActPov = mode === "full" ? "paper" : "me";
    const markComplete = (): void => {
      if (this.actState && !this.actState.finished && this.actState.act === act.index) this.actState = flowReduce(this.actState, { type: "complete", pov: completePov });
      this.refreshActHud();
    };

    let finished = false;
    notebook.onTaskDone = (index, task, ids) => {
      this.notesDone.set(act.index, Math.max(this.notesDone.get(act.index) ?? 0, index + 1));
      const all = [...ids, ...(task.kind === "translate" ? this.keywordWordIds(task) : [])];
      for (const id of all) {
        this.mastered.add(id);
        this.wordsSeen.add(id);
      }
      const st = this.learnStateFor(act);
      if (st.step === "notes" && st.noteIndex === index) this.learnEvent(act, { type: "noteDone" });
      if ((this.notesDone.get(act.index) ?? 0) >= act.notes.length) markComplete();
    };
    const result = new Promise<void>((resolve) => {
      notebook.onFinished = () => {
        finished = true;
        resolve();
      };
    });
    const startIndex = this.notesDone.get(act.index) ?? 0;
    notebook.show({
      act,
      total,
      mode,
      startIndex,
      comic,
      vocab: act.wordIds.map((id) => this.opts.words.get(id)).filter((w): w is WordEntry => w !== undefined),
      pool: this.unitWordForms,
      finishLabel,
      summary: phone && mode === "tasks" ? () => `Focus ${Math.round(focusScore(phone.taps) * 100)}%${phone.taps > 0 ? " · a message pulled you away" : ""}` : undefined,
    });
    // 没有笔记（或都已经做完）：看到页面就算完成
    if (startIndex >= act.notes.length) markComplete();
    await this.until(result);
    if (!finished) return false;
    notebook.hide();
    return true;
  }

  // ───────── 纸：二维笔记本 ─────────

  private async paperAct(act: MemoryAct): Promise<boolean> {
    this.hideStudyOverlays();
    this.enterActPov("paper");
    await this.ensureBuilt(act);
    if (this.dead) return false;
    return this.runNotebook(act, "full");
  }

  /**
   * 漫画格：把当前画面读到一张小画布上，套手绘风格滤镜（降饱和 + 色阶 + 墨线 + 纸纹）。
   * 第三人称看完一幕时抓最后一帧；没看过的幕用舞台的默认机位抓一帧。
   */
  private captureComic(act: MemoryAct, useDefaultShot: boolean): HTMLCanvasElement {
    const canvas = this.comics.get(act.index) ?? document.createElement("canvas");
    canvas.width = COMIC_W;
    canvas.height = COMIC_H;
    this.comics.set(act.index, canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;
    const cam = this.camera;
    const saved = { pos: cam.position.clone(), quat: cam.quaternion.clone(), fov: cam.fov };
    const avatarVisible = this.pov.root.visible;
    const trailVisible = this.pov.trail.visible;
    try {
      if (useDefaultShot) {
        const shots = this.stageDef?.shots ?? [];
        const shot = act.cues?.[0]?.camera ?? shots[act.index % Math.max(1, shots.length)];
        if (shot) {
          cam.position.set(shot.to.x, shot.to.y, shot.to.z);
          cam.lookAt(shot.look.x, shot.look.y, shot.look.z);
          cam.fov = this.cinema.baseFov;
          cam.updateProjectionMatrix();
          cam.updateMatrixWorld(true);
        }
      }
      this.pov.root.visible = false;
      this.pov.trail.visible = false;
      this.cinema.captureClean(() => {
        if (this.post) this.post.composer.render();
        else this.renderer.render(this.scene, this.camera);
      });
      const src = this.renderer.domElement;
      // 取中间 COMIC_W:COMIC_H 比例的一块
      const want = COMIC_W / COMIC_H;
      let sw = src.width;
      let sh = src.width / want;
      if (sh > src.height) {
        sh = src.height;
        sw = src.height * want;
      }
      ctx.drawImage(src, (src.width - sw) / 2, (src.height - sh) / 2, sw, sh, 0, 0, COMIC_W, COMIC_H);
      const img = ctx.getImageData(0, 0, COMIC_W, COMIC_H);
      comicify(img.data, COMIC_W, COMIC_H, { seed: act.index + 3 });
      ctx.putImageData(img, 0, 0);
    } catch (err) {
      // 读取画面失败（例如被浏览器拦截）：留一张纸色空白，不影响笔记
      console.warn("[memory] 漫画格抓取失败", err);
      ctx.fillStyle = "#efe4c3";
      ctx.fillRect(0, 0, COMIC_W, COMIC_H);
    } finally {
      cam.position.copy(saved.pos);
      cam.quaternion.copy(saved.quat);
      cam.fov = saved.fov;
      cam.updateProjectionMatrix();
      this.pov.root.visible = avatarVisible;
      this.pov.trail.visible = trailVisible;
    }
    return canvas;
  }

  // ───────────────────────── 并发小工具 ─────────────────────────

  /** 与“玩家退出”和 “切换视角” 赛跑：退出 / 中断后立刻返回 */
  private until<T>(p: Promise<T>): Promise<T | undefined> {
    return Promise.race([p, this.exitPromise.then(() => undefined), this.session.promise.then(() => undefined)]);
  }

  /** 退出或本轮被中断时 resolve（等待玩家作答的 Promise 用它收尾） */
  private abortSignal(): Promise<void> {
    return Promise.race([this.exitPromise, this.session.promise]);
  }

  /** 玩家已退出，或本轮（幕 × 视角）被切换视角打断 */
  private get dead(): boolean {
    return this.exited || this.session.aborted;
  }

  private sleep(ms: number): Promise<void> {
    return this.until(
      new Promise<void>((resolve) => {
        const t = setTimeout(() => {
          this.timers.delete(t);
          resolve();
        }, ms);
        this.timers.add(t);
      })
    ).then(() => undefined);
  }

  /** 可被“跳过”打断的等待（不朗读时代替 speak） */
  private skippableSleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      const hook = (): void => {
        clearTimeout(t);
        this.skipHooks.delete(hook);
        resolve();
      };
      const t = setTimeout(hook, ms);
      this.skipHooks.add(hook);
    });
  }

  private skip(): void {
    this.narrator.cancel();
    for (const hook of [...this.skipHooks]) hook();
  }
}
