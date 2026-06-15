import * as THREE from "three";
import type { MapNode } from "../../core/types";
import { createLandmarkWithCad } from "./cadLandmark";
import { createExplorerAvatar } from "./explorerAvatar";
import { ExplorerCamera } from "./ExplorerCamera";
import { glowPath, stone, water } from "./materials";
import { PlayerController } from "./PlayerController";
import { createLantern, createPine, createRock, createTree } from "./props";
import { createSignpost } from "./signpost";
import type { MinimapState } from "./Minimap";
import { getTheme } from "./theme";
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

export interface World3DOptions {
  onNodeClick: (nodeId: string) => void;
  onProximity?: (node: MapNode | null) => void;
  onExploreUpdate?: (state: MinimapState) => void;
}

/** 三维探险世界：走动探索 + 走近互动 */
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
  private skyDome?: THREE.Mesh;
  private sun?: THREE.DirectionalLight;
  private animId = 0;
  private paused = true;
  private clock = new THREE.Clock();
  private nodes: MapNode[] = [];
  private currentId = "";
  private onNodeClick: (nodeId: string) => void;
  private onProximity?: (node: MapNode | null) => void;
  private onExploreUpdate?: (state: MinimapState) => void;
  private waterMeshes: THREE.Mesh[] = [];
  private rebuildToken = 0;
  private player = new PlayerController();
  private explorerCam = new ExplorerCamera();
  private nearNode: MapNode | null = null;

  constructor(container: HTMLElement, options: World3DOptions) {
    this.container = container;
    this.onNodeClick = options.onNodeClick;
    this.onProximity = options.onProximity;
    this.onExploreUpdate = options.onExploreUpdate;

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
    this.buildLights();
    this.buildTerrain();
    this.spawnExplorer();
    this.bindEvents();
    this.animate();
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

  /** 外部触发互动（按钮 / E 键） */
  tryInteract(): boolean {
    if (!this.nearNode?.unlocked) return false;
    this.onNodeClick(this.nearNode.id);
    return true;
  }

  /** 虚拟摇杆输入（-1～1） */
  setStickInput(x: number, z: number): void {
    this.player.setStickInput(x, z);
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
    removeGroup(this.scene, this.explorer);
    for (const g of this.nodeGroups.values()) disposeGroup(g);

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
      this.explorer.rotation.y = this.player.yaw;
    }
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
    this.skyDome = new THREE.Mesh(new THREE.SphereGeometry(420, 40, 28), mat);
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
  }

  private buildLights(): void {
    this.scene.add(new THREE.HemisphereLight(0xc8e0ff, 0x243828, 0.72));
    this.scene.add(new THREE.AmbientLight(0x9ab0cc, 0.32));

    this.sun = new THREE.DirectionalLight(0xfff4e0, 1.45);
    this.sun.position.set(55, 72, 35);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(4096, 4096);
    const cam = this.sun.shadow.camera;
    cam.near = 8;
    cam.far = 280;
    cam.left = cam.bottom = -120;
    cam.right = cam.top = 120;
    this.sun.shadow.bias = -0.00035;
    this.scene.add(this.sun);

    const rim = new THREE.DirectionalLight(0x8cb4ff, 0.5);
    rim.position.set(-40, 28, -30);
    const moon = new THREE.PointLight(0xa5c8ff, 0.55, 160);
    moon.position.set(-35, 28, TERRAIN_ORIGIN_Z);
    this.scene.add(rim, moon);
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
      for (let i = 0; i < 26; i++) {
        const angle = rand() * Math.PI * 2;
        const dist = 6 + rand() * 18;
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

    for (let wi = 0; wi < 10; wi++) {
      const wx = (wi % 2 === 0 ? -22 : 22) + rnd() * 8;
      const wz = wi * 48 + rnd() * 12;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(36, 22), water());
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(wx, sampleTerrainY(wx, wz, terrainHeight) - 0.75, wz);
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

  private animate = (): void => {
    this.animId = requestAnimationFrame(this.animate);
    if (this.paused) return;

    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.getElapsedTime();

    const camYaw = this.explorerCam.update(this.camera, this.player.position, this.player.yaw, dt);
    this.player.update(dt, camYaw);

    if (this.explorer) {
      this.explorer.position.lerp(this.player.position, 1 - Math.exp(-14 * dt));
      let yawDiff = this.player.yaw - this.explorer.rotation.y;
      while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
      while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
      this.explorer.rotation.y += yawDiff * Math.min(1, dt * 12);

      const walk = this.player.isMoving();
      const bob = walk ? Math.sin(t * 9) * 0.05 : 0;
      this.explorer.position.y = this.player.position.y + bob;

      const footRing = this.explorer.children.find((c) => (c as THREE.Mesh).userData?.isFootRing) as THREE.Mesh | undefined;
      if (footRing) {
        const s = walk ? 1 + Math.sin(t * 9) * 0.08 : 1;
        footRing.scale.set(s, s, s);
        (footRing.material as THREE.MeshBasicMaterial).opacity = walk ? 0.45 : 0.28;
      }
    }

    this.updateProximity();
    this.tickScene(t);
    this.onExploreUpdate?.({
      playerX: this.player.position.x,
      playerZ: this.player.position.z,
      nodes: this.nodes,
      nearNodeId: this.nearNode?.id,
    });
    this.renderer.render(this.scene, this.camera);
  };

  private tickScene(t: number): void {
    if (this.sun) {
      this.sun.position.x = 55 + Math.sin(t * 0.06) * 10;
      this.sun.intensity = 1.35 + Math.sin(t * 0.12) * 0.12;
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
    }
  }
}
