import * as THREE from "three";
import type { WordEntry } from "../../core/types";
import { windTime } from "../world/foliageMaterials";
import { getSurfaceArrays, setSurfaceQuality } from "../world/kitShader";
import { buildSkyEnvironment, createPostPipeline, detectQuality, QUALITY_PRESETS, type PostPipeline, type QualityTier } from "../world/postPipeline";
import { createSceneKit, type SceneKit } from "../world/sceneProps";
import { spawnActor, type ActorHandle } from "./actors";
import { CinemaDirector } from "./CinemaDirector";
import { createFilmPass } from "./filmPass";
import { MemoryHud } from "./hud";
import { Interaction } from "./Interaction";
import { Materializer } from "./Materializer";
import { MemoryFlow } from "./MemoryFlow";
import { buildWordObject, memoryObjectFor, verbPose, type Verb } from "./memoryObjects";
import { Narrator, splitWords } from "./Narrator";
import { PaperLayer } from "./paper2d";
import { PovRig } from "./PovRig";
import { buildStage, getStage, stageTargets, type StageDef } from "./stages";
import { findWordToken, validateScript, type Beat, type MemoryResult, type MemoryScript, type Pov } from "./types";
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

const VERB_SECONDS = 1.3;
const baseFovFor = (aspect: number): number => (aspect >= 1 ? 46 : Math.min(70, 46 + (1 - aspect) * 34));

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
  private post?: PostPipeline;
  private readonly cinema: CinemaDirector;
  private readonly pov: PovRig;
  private readonly interaction: Interaction;
  private paper?: PaperLayer;
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
  private lightLevel = 0.3;
  private fogBase = 0.05;
  private envBase = 0.9;
  private sunBase = 2.4;
  private hemiBase = 0.9;
  private unitPrefix = "";

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
    if (this.post) this.post.composer.addPass(this.filmPass);

    this.cinema = new CinemaDirector(this.hud, this.filmPass, this.camera.fov);
    const spawn = { x: 0, y: 0, z: 0, yaw: Math.PI };
    this.pov = new PovRig({
      camera: this.camera,
      canvas: this.renderer.domElement,
      cinema: this.cinema,
      bounds: { minX: -4, maxX: 4, minZ: -4, maxZ: 4 },
      spawn,
      baseFov: this.camera.fov,
    });
    this.scene.add(this.pov.root);
    this.interaction = new Interaction({
      camera: this.camera,
      canvas: this.renderer.domElement,
      labelLayer: this.hud.labels,
      materializer: this.materializer,
      getPlayer: () => (this.pov.pov === "you" ? this.pov.player : null),
    });

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
      await this.hud.fade(false, 1400);
      if (this.opts.gate) await this.until(this.hud.gate("轻触 · 开始回溯", "Tap to begin", () => this.narrator.unlock()));
      if (!this.exited) {
        // 空场景：只有雾与光尘。稍等片刻，再让 2090 年的他浮现
        await this.sleep(1800);
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
      if (completed && script.beats[script.beats.length - 1]?.kind !== "freeze") await this.hud.fade(true, 900);
      // 玩家退出时 requestExit 已开始淡出黑场，等它走完再交还控制权
      else if (this.exited && !this.disposed) await new Promise<void>((resolve) => setTimeout(resolve, 520));
    } catch (err) {
      console.error("[memory] 回忆执行出错", err);
    }
    this.narrator.cancel();
    return { completed, exited: this.exited, wordsSeen: [...this.wordsSeen], mistakes: this.mistakes };
  }

  /** 玩家退出：淡出并让 play() 尽快返回 */
  private requestExit(): void {
    if (this.exited) return;
    this.exited = true;
    this.narrator.cancel();
    this.interaction.disable();
    this.paper?.hide();
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

    this.paper?.dispose();
    this.interaction.dispose();
    this.pov.dispose();
    this.materializer.dispose();
    this.flow.dispose();
    for (const a of this.actors.values()) a.dispose();
    this.cinema.dispose();
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

    this.envRT?.dispose();
    if (this.post) {
      for (const pass of this.post.composer.passes) (pass as { dispose?: () => void }).dispose?.();
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
    this.unitWordForms = [...this.opts.words.values()].filter((w) => (this.unitPrefix ? w.id.startsWith(this.unitPrefix) : false)).map((w) => w.word);

    // 开发期校验：只提示，不阻塞
    if (import.meta.env?.DEV) {
      const errs = validateScript(script, { stageTargets: stageTargets(script.stage), words: this.opts.words });
      if (errs.length) console.warn("[memory] 脚本校验问题\n" + errs.join("\n"));
    }

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
    this.scene.add(group);
    for (const child of [...group.children]) {
      if (!child.name) continue;
      collect(child);
      const o = overrides.get(child.name);
      this.materializer.register(child, o?.style ?? stage.targets[child.name] ?? "rise");
      if (o?.duration) this.pieceOverrides.set(child.name, { duration: o.duration });
    }

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
      const handle = spawnActor(actor, poses);
      this.scene.add(handle.root);
      collect(handle.root);
      this.materializer.register(handle.root, "fade");
      this.actors.set(actor.id, handle);
    }

    // 2090 年的他
    this.pov.setBounds(stage.bounds);
    this.pov.place(stage.spawn.x, stage.spawn.y, stage.spawn.z, stage.spawn.yaw);
    this.materializer.register(this.pov.avatar, "fade");

    // 笔记本的手写字体需要提前开始下载
    if (script.beats.some((b) => b.kind === "paper")) this.getPaper();

    this.onResize();
    this.updateLighting(0, true);
    await this.materializer.prewarm(this.renderer, this.scene, this.camera);
  }

  private applyEnvironment(stage: StageDef): void {
    const e = stage.environment;
    (this.scene.fog as THREE.FogExp2).color.setHex(e.fogColor);
    this.fogBase = e.fogDensity;
    (this.scene.background as THREE.Color).setHex(e.fogColor);
    this.sunBase = e.sunIntensity;
    this.hemiBase = e.hemiIntensity;
    this.envBase = e.envIntensity;
    this.sun.color.setHex(e.sunColor);
    const d = new THREE.Vector3(e.sunDir.x, e.sunDir.y, e.sunDir.z).normalize();
    this.sun.position.copy(d).multiplyScalar(26);
    this.sun.target.position.set(0, 0, 0);
    const r = e.shadowRadius;
    const cam = this.sun.shadow.camera;
    cam.left = -r;
    cam.right = r;
    cam.top = r;
    cam.bottom = -r;
    cam.near = 1;
    cam.far = 60;
    cam.updateProjectionMatrix();
    this.hemi.color.setHex(e.hemiSky);
    this.hemi.groundColor.setHex(e.hemiGround);
    const rt = buildSkyEnvironment(this.renderer, { skyTop: e.skyTop, skyMid: e.skyMid, skyBot: e.skyBot, sunColor: e.sunColor, sunDir: d });
    if (rt) {
      this.envRT?.dispose();
      this.envRT = rt;
      this.scene.environment = rt.texture;
    }
  }

  // ───────────────────────── 主循环 ─────────────────────────

  private startLoop(): void {
    if (this.raf || this.disposed) return;
    this.lastTs = performance.now();
    const frame = (ts: number): void => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, Math.max(0, (ts - this.lastTs) / 1000));
      this.lastTs = ts;
      this.tick(dt);
      if (this.post) this.post.composer.render();
      else this.renderer.render(this.scene, this.camera);
    };
    this.raf = requestAnimationFrame(frame);
  }

  private tick(dt: number): void {
    const frozen = this.cinema.frozen;
    if (!frozen) {
      this.time += dt;
      windTime.value += dt;
      this.materializer.update(dt);
      this.flow.update(dt);
      for (const a of this.actors.values()) a.update(dt, this.time);
      this.updateWordObjects(dt);
      this.updateLighting(dt);
      this.updateAttractor();
    }
    this.pov.update(dt);
    this.cinema.update(dt);
    this.interaction.update();

    this.flow.setCenter(this.tmpFocus());
    const h = this.renderer.domElement.height;
    this.materializer.setView(h, this.camera.fov);
    this.flow.setView(h, this.camera.fov);
  }

  private readonly focusV = new THREE.Vector3();
  private tmpFocus(): THREE.Vector3 {
    const dir = this.focusV.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    return dir.multiplyScalar(4).add(this.camera.position);
  }

  /** 世界建得越完整，环境越亮、雾越淡、洪流越淡 */
  private updateLighting(dt: number, snap = false): void {
    const progress = this.materializer.progress((p) => !p.id.startsWith("word:") && !p.id.startsWith("actor:") && p.id !== "old-self");
    const target = 0.3 + 0.7 * progress;
    this.lightLevel = snap ? target : this.lightLevel + (target - this.lightLevel) * (1 - Math.exp(-dt * 2.5));
    const l = this.lightLevel;
    this.sun.intensity = this.sunBase * l * l;
    this.hemi.intensity = this.hemiBase * l;
    this.scene.environmentIntensity = this.envBase * l;
    (this.scene.fog as THREE.FogExp2).density = this.fogBase * (1.5 - 0.5 * progress);
    this.flow.setVisibility(1 - 0.45 * progress);
  }

  /** 洪流偏向正在显形的东西 */
  private updateAttractor(): void {
    let best: THREE.Vector3 | null = null;
    this.materializer.forEach((p) => {
      if (!best && p.state === "revealing" && p.id !== "old-self") best = p.center;
    });
    this.flow.setAttractor(best, 1);
  }

  private updateWordObjects(dt: number): void {
    for (const a of this.verbAnims) a.t += dt / VERB_SECONDS;
    this.verbAnims = this.verbAnims.filter((a) => a.t < 1 || this.finishVerb(a));
    for (const [id, w] of this.wordObjs) {
      const anim = this.verbAnims.find((a) => a.wordId === id);
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
      case "freeze":
        return this.doFreeze(beat);
    }
  }

  private setPov(pov: Pov): void {
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
  private async readAloud(text: string, voice: "system" | "young" | "old", build: string[], speak = true): Promise<void> {
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
    this.hud.beginReading();
    this.hud.setSkipVisible(true);
    const unsub = this.narrator.onWord((e) => {
      this.hud.setReadProgress(e.index);
      revealUpTo(e.index);
    });
    const timing = speak ? this.narrator.speak(text, voice) : this.skippableSleep(Narrator.estimate(text) * 1000);
    await this.until(timing);
    unsub();
    this.hud.setSkipVisible(false);
    // 没来得及触发的部件（跳过 / 词数太少）立即开始显形
    revealUpTo(Number.MAX_SAFE_INTEGER);
    this.hud.endReading();
    this.hud.setReadProgress(Number.MAX_SAFE_INTEGER);
    this.flow.setSpeaking(false);
  }

  private async doNarrate(b: Extract<Beat, { kind: "narrate" }>): Promise<void> {
    this.setPov(b.pov);
    if (b.camera) void this.cinema.shot(b.camera);
    this.hud.setSubtitle(b.text, b.zh, { vocab: this.vocabIn(b.text) });
    await this.readAloud(b.text, b.voice ?? "system", b.build ?? [], b.speak !== false);
    await this.sleep(600);
  }

  private nameOf(wordId: string): string {
    return `word:${wordId}`;
  }

  private async doTouch(b: Extract<Beat, { kind: "touch" }>): Promise<void> {
    this.setPov("you");
    this.hud.setPrompt(b.prompt, b.zh);
    const targets = b.wordIds.filter((id) => this.materializer.has(this.nameOf(id)));
    for (const id of targets) this.materializer.setGhost(this.nameOf(id), 0.55);
    await new Promise<void>((resolve) => {
      let remaining = targets.length;
      if (remaining === 0) return resolve();
      const done = (): void => {
        if (--remaining === 0) resolve();
      };
      const exitHook = (): void => resolve();
      this.exitPromise.then(exitHook);
      this.interaction.enable(
        targets.map((id) => {
          const w = this.opts.words.get(id);
          return { id, object: this.wordObjs.get(id)!.obj, label: w ? { word: w.word, phonetic: w.phonetic } : undefined };
        }),
        (id) => {
          this.interaction.remove(id);
          this.touchWord(id);
          done();
        }
      );
    });
    this.interaction.disable();
    await this.until(this.speechChain);
    this.hud.setPrompt();
    await this.sleep(500);
  }

  /** 触碰一个词：物件完整显形落位 + verb 动画 + 词卡 + 朗读词与旁白 */
  private touchWord(id: string): void {
    const w = this.opts.words.get(id);
    const def = memoryObjectFor(id, w?.word);
    const name = this.nameOf(id);
    this.materializer.setGhost(name, 0);
    void this.materializer.reveal(name, 1.5, { letters: w?.word });
    this.playVerb(id);
    this.wordsSeen.add(id);
    this.hud.showWordCard({ word: w?.word ?? id, phonetic: w?.phonetic, meaning: w?.meaning, line: def.line }, 3200);
    const word = w?.word ?? id;
    this.speechChain = this.speechChain.then(async () => {
      if (this.exited) return;
      await this.narrator.speak(word, "system");
      if (this.exited) return;
      await this.narrator.speak(def.line, "system");
    });
  }

  private async doGap(b: Extract<Beat, { kind: "gap" }>): Promise<void> {
    this.setPov("watch");
    if (b.camera) void this.cinema.shot(b.camera);
    const answer = this.opts.words.get(b.answerWordId);
    const token = answer ? findWordToken(b.sentence, answer.word) : null;
    this.hud.setSubtitle(b.sentence, b.zh, { vocab: [], blank: token ?? undefined });
    this.flow.setSentence(b.sentence);
    for (const ref of b.build ?? []) {
      const target = this.resolveTarget(ref);
      void this.materializer.reveal(target, this.pieceDuration(ref, target), { letters: b.sentence });
    }

    const ids = [b.answerWordId, ...b.decoyWordIds].filter((id) => this.materializer.has(this.nameOf(id)));
    for (const id of ids) {
      if (!this.materializer.isRevealed(this.nameOf(id))) this.materializer.setGhost(this.nameOf(id), 0.6);
    }
    await new Promise<void>((resolve) => {
      this.exitPromise.then(() => resolve());
      this.interaction.enable(
        ids.map((id) => ({ id, object: this.wordObjs.get(id)!.obj })),
        (id) => {
          if (id === b.answerWordId) {
            this.interaction.disable();
            resolve();
            return;
          }
          // 答错：物件暗下去、胶片轻微抖动，可再选
          this.mistakes++;
          this.interaction.remove(id);
          if (!this.materializer.isRevealed(this.nameOf(id))) this.materializer.setGhost(this.nameOf(id), 0);
          this.hud.shakeSubtitle();
          this.cinema.glitch(0.6);
        },
        { labels: false, baseGlow: 0.9 }
      );
    });
    this.interaction.disable();
    if (this.exited) return;

    // 答对：空位填上，答案物件落位，继续朗读整句
    this.hud.fillBlank(token?.text ?? answer?.word ?? "");
    for (const id of ids) if (id !== b.answerWordId && !this.materializer.isRevealed(this.nameOf(id))) this.materializer.setGhost(this.nameOf(id), 0);
    this.materializer.setGhost(this.nameOf(b.answerWordId), 0);
    void this.materializer.reveal(this.nameOf(b.answerWordId), 1.4, { letters: answer?.word });
    this.playVerb(b.answerWordId);
    this.wordsSeen.add(b.answerWordId);
    this.hud.showWordCard({ word: answer?.word ?? "", phonetic: answer?.phonetic, meaning: answer?.meaning }, 2600);
    await this.readAloud(b.sentence, "system", []);
    await this.sleep(500);
  }

  private async doChoice(b: Extract<Beat, { kind: "choice" }>): Promise<void> {
    this.setPov("me");
    if (b.camera) void this.cinema.shot(b.camera);
    this.hud.setSubtitle(`${b.speaker}: ${b.line}`, b.zh, { vocab: this.vocabIn(b.line) });
    await this.readAloud(b.line, "young", []);
    const items = b.options.map((o) => ({ label: this.opts.words.get(o.wordId)?.word ?? o.wordId, sub: o.reply }));
    await new Promise<void>((resolve) => {
      this.exitPromise.then(() => resolve());
      this.hud.showChoices(items, (i) => {
        const opt = b.options[i];
        if (!opt) return;
        if (!opt.correct) {
          this.mistakes++;
          this.hud.markChoice(i, "wrong");
          this.hud.setSubtitle(`(${b.speaker} looks confused.)`, "（对方露出困惑的神情。）");
          return;
        }
        this.hud.markChoice(i, "right");
        this.wordsSeen.add(opt.wordId);
        this.hud.hideChoices();
        this.hud.setSubtitle(opt.reply, undefined, { vocab: this.vocabIn(opt.reply) });
        void this.readAloud(opt.reply, "young", []).then(() => resolve());
      });
    });
    this.hud.hideChoices();
    await this.sleep(400);
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
    const ok = await this.until(paper.show(b.page));
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
  }

  // ───────────────────────── 并发小工具 ─────────────────────────

  /** 与“玩家退出”赛跑：退出后立刻返回 */
  private until<T>(p: Promise<T>): Promise<T | undefined> {
    return Promise.race([p, this.exitPromise.then(() => undefined)]);
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
