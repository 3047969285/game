import * as THREE from "three";
import type { MapNode } from "../../core/types";
import type { UnitBiome } from "./unitBiome";
import { buildUnit1Sanctuary } from "./unit1Sanctuary";
import { createPerson } from "./people";
import { buildApproachSlab, buildFocusedTerrace } from "./focusedTerrace";
import { buildPortalTrim, buildSignFrame } from "./portalTrim";
import { SCENE_MODULES } from "./scenes";
import { upgradeGeometry } from "./geometryUpgrade";
import { buildSignalMasts, buildStudyStations } from "./stations";
import { buildExchangeHub, buildHarborHub, buildIdeaTempleHub, buildLaunchComplex, buildMemoryTreeHub } from "./hubLandmarks";

type PassageKind = "section_a" | "section_b" | "section_c";
type PassageSceneKind =
  | "message" | "dialogue" | "focus" | "notification" | "study-desk" | "filter" | "offline-rest"
  | "listening-bench" | "clinic" | "telemedicine" | "community" | "community-library" | "community-network" | "timeline" | "perseverance" | "route-evidence" | "legacy"
  | "spotlight" | "humanitarian" | "lasting-service" | "community-witness" | "fleet" | "peace-contact" | "chart-room" | "exchange-harbor"
  | "itinerary" | "detour" | "market-encounter" | "reflection-garden" | "hostel" | "open-route" | "rain-shelter" | "confidence" | "rail-platform" | "rail-car" | "landscape-window" | "route-network"
  | "career" | "violin" | "craft-quality" | "bench" | "caliper" | "trust-bridge" | "loom" | "heritage"
  | "work-dignity" | "craft-evolution" | "embroidery-table" | "living-heritage"
  | "lunar-probe" | "test-console" | "orbit-adjustment" | "training" | "science-exhibit"
  | "relay-bridge" | "sample-lab" | "moon-horizon" | "systems-simulation" | "mission-control" | "crew-simulation" | "future-frontier"
  | "bookshop" | "exchange" | "resilience" | "exchange-wall" | "resource-cycle" | "library" | "digital-lending"
  | "budget-board" | "trust-ledger" | "sustainable-market" | "knowledge-bridge";

const PASSAGE_SCENES: Record<string, Partial<Record<PassageKind, PassageSceneKind[]>>> = {
  unit01: {
    section_a: ["message", "dialogue", "focus", "listening-bench"],
    section_b: ["notification", "study-desk", "filter", "offline-rest"],
    section_c: ["clinic", "telemedicine", "community", "community-network"],
  },
  unit02: {
    section_a: ["timeline", "route-evidence", "perseverance", "legacy"],
    section_b: ["spotlight", "humanitarian", "lasting-service", "community-witness"],
    section_c: ["fleet", "peace-contact", "chart-room", "exchange-harbor"],
  },
  unit03: {
    section_a: ["itinerary", "detour", "market-encounter", "reflection-garden"],
    section_b: ["hostel", "open-route", "rain-shelter", "confidence"],
    section_c: ["rail-platform", "rail-car", "landscape-window", "route-network"],
  },
  unit04: {
    section_a: ["career", "bench", "violin", "work-dignity"],
    section_b: ["caliper", "craft-quality", "craft-evolution", "trust-bridge"],
    section_c: ["loom", "embroidery-table", "heritage", "living-heritage"],
  },
  unit05: {
    section_a: ["lunar-probe", "relay-bridge", "sample-lab", "moon-horizon"],
    section_b: ["test-console", "orbit-adjustment", "systems-simulation", "mission-control"],
    section_c: ["training", "crew-simulation", "science-exhibit", "future-frontier"],
  },
  unit06: {
    section_a: ["bookshop", "exchange", "resilience", "budget-board"],
    section_b: ["exchange-wall", "resource-cycle", "trust-ledger", "sustainable-market"],
    section_c: ["library", "digital-lending", "community-library", "knowledge-bridge"],
  },
};

/**
 * 读写教程 3 的单元场景骨架。
 *
 * 这里不依赖外部 3D 资产，先用低多边形几何把“可走的空间”搭出来：
 * 中央学习圣所、远景地标和主题装置。这样在 GLB 资产
 * 加载慢、移动端降画质或资源缺失时，世界仍然有明确的空间结构。
 */
export function buildUnitLandscape(biome: UnitBiome, _anchor: MapNode, worldId?: string, worldTitle?: string): THREE.Group {
  const root = new THREE.Group();
  root.name = ["unit-landscape", biome.id, worldId ?? "hub"].join("-");

  const focus = getWorldFocusPalette(biome, worldId);
  const accent = new THREE.Color(focus.accent);
  const secondary = new THREE.Color(focus.secondary);
  const groundColor = new THREE.Color(...biome.terrainTint);
  groundColor.multiplyScalar(0.88);

  const ground = new THREE.MeshStandardMaterial({
    color: groundColor,
    roughness: 0.72,
    metalness: 0.16,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x34485e,
    roughness: 0.84,
    metalness: 0.12,
  });
  const glow = new THREE.MeshStandardMaterial({
    color: secondary,
    emissive: secondary,
    emissiveIntensity: 1.2,
    roughness: 0.2,
    metalness: 0.36,
  });
  const edge = new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 0.75,
    roughness: 0.18,
    metalness: 0.42,
  });
  // 场景远景可以进雾，但学习入口必须保持清晰，否则移动端会只剩一层色块。
  dark.fog = false;
  glow.fog = false;
  edge.fog = false;
  if (isFocusedLearningWorld(worldId)) {
    glow.emissiveIntensity = 0.56;
    edge.emissiveIntensity = 0.42;
    dark.color.set(0x465a70);
    dark.roughness = 0.86;
    dark.metalness = 0.08;
  }

  if (isFocusedLearningWorld(worldId)) {
    addFocusedLearningApproach(root, focus.route, edge);
  } else {
    root.add(buildUnit1Sanctuary(glow, edge, { tint: biome.crystalColor, greenery: biome.decorStyle !== "space" }));
    root.add(buildStudyStations());
  }
  if (isFocusedLearningWorld(worldId)) {
    const landmark = new THREE.Group();
    addLearningSceneLandmark(landmark, worldId, worldTitle, ground, dark, glow, edge, accent, biome.id);
    landmark.scale.setScalar(0.9);
    landmark.position.set(0, 1.8, -15);
    root.add(landmark);
  } else if (!addLearningSceneLandmark(root, worldId, worldTitle, ground, dark, glow, edge, accent, biome.id)) {
    addWorldFocusLandmark(root, worldId, ground, dark, glow, edge);
  }
  // 学习页已有固定地标铭牌；近景再放大型 3D 文字牌会被阅读层裁切成黑色块。
  if (!isFocusedLearningWorld(worldId)) addWorldTitleSign(root, worldId, worldTitle, focus.accent);

  const environment = new THREE.Group();
  switch (biome.decorStyle) {
    case "coast":
      addDigitalCoast(environment, dark, glow, edge, isFocusedLearningWorld(worldId));
      break;
    case "market":
      if (biome.id === "unit02" && /^section_b-world-\d+$/.test(worldId ?? "")) {
        addEthiopianReliefLandscape(environment, edge);
      } else {
        addLivesArchiveHarbor(environment, ground, dark, glow, edge);
      }
      break;
    case "forest":
      addMemoryForest(environment, ground, glow, edge, isFocusedLearningWorld(worldId));
      break;
    case "temple":
      addIdeaTemple(environment, ground, dark, glow, edge, isFocusedLearningWorld(worldId));
      break;
    case "space":
      addOrbitCampus(environment, dark, glow, edge, isFocusedLearningWorld(worldId));
      break;
    case "exchange":
      addCommonsExchange(environment, ground, dark, glow, edge, isFocusedLearningWorld(worldId), worldId);
      break;
    default:
      addLibraryCampus(environment, ground, dark, glow, edge);
      break;
  }
  if (isFocusedLearningWorld(worldId)) {
    environment.scale.setScalar(biome.focusedLandscapeScale ?? 0.72);
    environment.position.z = biome.focusedLandscapeOffsetZ ?? 14;
  } else {
    // Keep each unit's defining environment legible from the fixed sanctuary entrance.
    environment.scale.setScalar(0.62);
    environment.position.z = 1.5;
  }
  root.add(environment);

  upgradeGeometry(root);
  root.traverse((object) => {
    const castsLandscapeShadow = object instanceof THREE.Mesh && !object.userData.noLandscapeShadow;
    object.castShadow = castsLandscapeShadow;
    object.receiveShadow = castsLandscapeShadow && !isFocusedLearningWorld(worldId);
  });
  return root;
}

export function isFocusedLearningWorld(worldId?: string): boolean {
  return Boolean(
    worldId &&
    (/^section_[abc]-world-\d+$/.test(worldId) ||
      /^lab-vocab-\d+$/.test(worldId) ||
      [
        "lab-grammar",
        "lab-cloze",
        "lab-translation",
        "project-reading",
        "project-listening",
        "project-writing",
        "project-memory",
      ].includes(worldId))
  );
}

/** 段落/训练微世界从入口直达自己的地标，不再被共用的单元圣所遮住。 */
function addFocusedLearningApproach(root: THREE.Group, routeColor: number, edge: THREE.Material): void {
  for (let index = 0; index < 5; index++) {
    const z = 1.8 + index * 2.1;
    const stepY = 0.54 + index * 0.32;
    const slab = buildApproachSlab(routeColor);
    slab.position.set(index % 2 === 0 ? -0.28 : 0.28, stepY, z);
    slab.rotation.y = index % 2 === 0 ? -0.035 : 0.035;
    root.add(slab);

    const marker = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), edge);
    marker.position.set(0, stepY + 0.42, z);
    marker.userData.isLandscapeBeacon = true;
    root.add(marker);
  }
}

interface WorldFocusPalette {
  accent: number;
  secondary: number;
  route: number;
}

/** 子世界保留任务色，同时优先呈现单元本身的主题色，避免六个单元看起来像同一张地图。 */
function getWorldFocusPalette(biome: UnitBiome, worldId?: string): WorldFocusPalette {
  if (!worldId || worldId === "hub") {
    return { accent: biome.crystalColor, secondary: biome.orbColor, route: biome.pathColor };
  }
  const articleScene = worldId.match(/^(section_[abc])-world-(\d+)$/);
  if (articleScene) {
    const sectionPalettes: Record<string, WorldFocusPalette[]> = {
      section_a: [
        { accent: 0x62d8ff, secondary: 0xb8f1ff, route: 0x2c86ff },
        { accent: 0x79f2d0, secondary: 0xc1fff0, route: 0x238b78 },
        { accent: 0xffc56a, secondary: 0xffe1a3, route: 0x9d6b1d },
        { accent: 0xf4a2ff, secondary: 0xffd96b, route: 0x9c5cff },
      ],
      section_b: [
        { accent: 0x79b8ff, secondary: 0xb7d8ff, route: 0x376fbb },
        { accent: 0xb5a0ff, secondary: 0xe0d7ff, route: 0x694ac2 },
        { accent: 0x67e8a5, secondary: 0xbaffd5, route: 0x288956 },
        { accent: 0xffbd78, secondary: 0xffdfb4, route: 0xa76b29 },
      ],
      section_c: [
        { accent: 0xff7b72, secondary: 0xffc17a, route: 0xd65352 },
        { accent: 0xf6a6bd, secondary: 0xffd6e4, route: 0xb05276 },
        { accent: 0x7ce7cf, secondary: 0xc6fff0, route: 0x328d79 },
        { accent: 0xffd36a, secondary: 0xffedaa, route: 0x9e7428 },
      ],
    };
    const palette = sectionPalettes[articleScene[1]][(Number(articleScene[2]) - 1) % 4];
    return {
      accent: new THREE.Color(palette.accent).lerp(new THREE.Color(biome.crystalColor), 0.66).getHex(),
      secondary: new THREE.Color(palette.secondary).lerp(new THREE.Color(biome.orbColor), 0.56).getHex(),
      route: new THREE.Color(palette.route).lerp(new THREE.Color(biome.pathColor), 0.6).getHex(),
    };
  }
  const vocabScene = worldId.match(/^lab-vocab-(\d+)$/);
  if (vocabScene) {
    const levelPalette = [0x55d6ff, 0x74e0b0, 0xb5a0ff, 0xffbe69, 0xff8f9d, 0x8eb7ff];
    const accent = levelPalette[(Number(vocabScene[1]) - 1) % levelPalette.length];
    return {
      accent: new THREE.Color(accent).lerp(new THREE.Color(biome.crystalColor), 0.52).getHex(),
      secondary: biome.orbColor,
      route: biome.pathColor,
    };
  }
  const stagePalettes: Record<string, WorldFocusPalette> = {
    "lab-grammar": { accent: 0x7dd3fc, secondary: 0xdbeafe, route: 0x3977b8 },
    "lab-cloze": { accent: 0x84ccae, secondary: 0xd1fae5, route: 0x267a5d },
    "lab-translation": { accent: 0xc4a5ff, secondary: 0xf0dcff, route: 0x7750b5 },
    "project-reading": { accent: 0xffcb70, secondary: 0xffedb5, route: 0xa47328 },
    "project-listening": { accent: 0x75d7ff, secondary: 0xbaf1ff, route: 0x377da7 },
    "project-writing": { accent: 0xffa87c, secondary: 0xffdec1, route: 0x9f5736 },
    "project-memory": { accent: 0xd3a2ff, secondary: 0xf1dcff, route: 0x7250b6 },
  };
  const stagePalette = stagePalettes[worldId];
  if (stagePalette) {
    return {
      accent: new THREE.Color(stagePalette.accent).lerp(new THREE.Color(biome.crystalColor), 0.58).getHex(),
      secondary: new THREE.Color(stagePalette.secondary).lerp(new THREE.Color(biome.orbColor), 0.5).getHex(),
      route: new THREE.Color(stagePalette.route).lerp(new THREE.Color(biome.pathColor), 0.58).getHex(),
    };
  }
  const palettes: Record<string, WorldFocusPalette> = {
    "section-a": { accent: 0x62d8ff, secondary: 0xb8f1ff, route: 0x2c86ff },
    "section-b": { accent: 0xffc56a, secondary: 0xffe1a3, route: 0x9d6b1d },
    "stories-of-china": { accent: 0xff7b72, secondary: 0xffc17a, route: 0xd65352 },
    "learning-lab": { accent: 0x8fffbe, secondary: 0x7dd3fc, route: 0x31b37e },
    "unit-project": { accent: 0xf4a2ff, secondary: 0xffd96b, route: 0x9c5cff },
  };
  return palettes[worldId] ?? { accent: biome.crystalColor, secondary: biome.orbColor, route: biome.pathColor };
}

function addLearningSceneLandmark(
  root: THREE.Group,
  worldId: string | undefined,
  worldTitle: string | undefined,
  ground: THREE.MeshStandardMaterial,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  beaconAccent: THREE.Color,
  biomeId: string
): boolean {
  if (!worldId) return false;
  const add = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    x: number,
    y: number,
    z: number,
    rotationY = 0
  ): THREE.Mesh => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotationY;
    root.add(mesh);
    return mesh;
  };
  const beacon = (y = 5.2): THREE.Mesh => {
    const material = glow.clone();
    if (isFocusedLearningWorld(worldId)) {
      material.color.copy(beaconAccent);
      material.emissive.copy(beaconAccent);
      material.emissiveIntensity = 0.24;
      material.roughness = 0.42;
      material.metalness = 0.16;
    }
    const mesh = add(new THREE.OctahedronGeometry(1.7, 1), material, 0, y, 27);
    mesh.userData.isLandscapeBeacon = true;
    return mesh;
  };
  const ring = (radius: number, y: number, rotation = Math.PI / 2): THREE.Mesh => {
    const mesh = add(new THREE.TorusGeometry(radius, 0.16, 8, 40), edge, 0, y, 27);
    mesh.rotation.x = rotation;
    mesh.userData.isLandscapeRing = true;
    return mesh;
  };

  const article = worldId.match(/^(section_[abc])-world-(\d+)$/);
  if (article) {
    const section = article[1];
    const index = Number(article[2]);
    const articleHeading = (worldTitle ?? "").split(" · ")[0];
    const isDialogueWorld = /connection|conversation|communication|dialogue|social/i.test(articleHeading);
    root.add(buildFocusedTerrace(beaconAccent.getHex()));

    if (biomeId === "unit06" && section === "section_a" && index === 1) {
      // Unit 6's opening passage is specifically about a neighborhood bookstore
      // that survives by exchanging books; make that story visible, not generic.
      const signFrame = new THREE.MeshStandardMaterial({
        color: 0x624a36,
        roughness: 0.78,
        metalness: 0.04,
      });
      add(new THREE.BoxGeometry(9.2, 4.8, 0.42), signFrame, 0, 3.7, 29);
      for (const x of [-4.2, 4.2]) add(new THREE.BoxGeometry(0.42, 5, 0.5), edge, x, 3.8, 27.2);
      for (const y of [1.75, 2.7, 3.65, 4.6]) {
        add(new THREE.BoxGeometry(7.9, 0.14, 0.6), ground, 0, y, 27.15);
      }

      const bookMaterials = [0xf2b36b, 0x80cbb4, 0x9bb9ef, 0xe48782].map((color) =>
        new THREE.MeshStandardMaterial({ color, roughness: 0.72 })
      );
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
          const height = 0.42 + ((row + col) % 3) * 0.1;
          const book = add(
            new THREE.BoxGeometry(0.42, height, 0.34),
            bookMaterials[(row * 3 + col) % bookMaterials.length],
            -3.5 + col,
            1.84 + row * 0.95 + height / 2,
            26.78
          );
          book.userData.isLandscapeStage = true;
        }
      }

      add(new THREE.BoxGeometry(6.2, 0.9, 1.05), dark, 0, 1.65, 23.7);
      add(new THREE.BoxGeometry(6.45, 0.16, 1.18), glow, 0, 2.18, 23.7);
      for (let i = 0; i < 3; i++) {
        const stack = add(new THREE.BoxGeometry(0.92, 0.16, 0.7), bookMaterials[i], -1.8 + i * 1.8, 2.37, 23.7);
        stack.userData.isLandscapeStage = true;
      }

      const awning = add(new THREE.BoxGeometry(10.2, 0.32, 2.3), ground, 0, 6.25, 26.2);
      awning.userData.isLandscapeStage = true;
      add(new THREE.BoxGeometry(8.45, 1.62, 0.18), signFrame, 0, 5.55, 27.02);

      const signCanvas = document.createElement("canvas");
      signCanvas.width = 1024;
      signCanvas.height = 192;
      const signContext = signCanvas.getContext("2d");
      if (signContext) {
        signContext.fillStyle = "#24483f";
        signContext.fillRect(0, 0, signCanvas.width, signCanvas.height);
        signContext.strokeStyle = "#d9b77a";
        signContext.lineWidth = 8;
        signContext.strokeRect(12, 12, signCanvas.width - 24, signCanvas.height - 24);
        signContext.fillStyle = "#fff4dc";
        signContext.textAlign = "center";
        signContext.textBaseline = "middle";
        signContext.font = "bold 68px Arial, sans-serif";
        signContext.fillText("BOOK EXCHANGE", 512, 67);
        signContext.font = "bold 32px Arial, sans-serif";
        signContext.fillText("LEAVE ONE  ·  TAKE ONE", 512, 145);
        const signTexture = new THREE.CanvasTexture(signCanvas);
        signTexture.colorSpace = THREE.SRGBColorSpace;
        const sign = new THREE.Mesh(
          new THREE.PlaneGeometry(8.05, 1.38),
          new THREE.MeshBasicMaterial({ map: signTexture, side: THREE.DoubleSide, toneMapped: false })
        );
        sign.position.set(0, 5.55, 26.88);
        sign.rotation.y = Math.PI;
        root.add(sign);
      }

      const shopLight = new THREE.PointLight(0xffdca0, 2.4, 18, 2);
      shopLight.position.set(0, 5.2, 22.6);
      root.add(shopLight);
      const exchangePath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, 2.65, 24.2),
        new THREE.Vector3(0, 3.3, 25.4),
        new THREE.Vector3(2.2, 2.65, 26.6),
      ]);
      const path = new THREE.Mesh(new THREE.TubeGeometry(exchangePath, 16, 0.065, 7, false), edge);
      path.userData.isLandscapeRoute = true;
      root.add(path);
      return true;
    }

    const passageScene = PASSAGE_SCENES[biomeId]?.[section as PassageKind]?.[index - 1];
    const keepDialogueLandmark = passageScene === "dialogue" && section === "section_a" && index === 1 && isDialogueWorld;
    if (passageScene && passageScene !== "bookshop" && !keepDialogueLandmark) {
      addPassageSceneLandmark(root, passageScene, add, ground, dark, glow, edge, beacon, ring);
      return true;
    }

    if (section === "section_a") {
      if (index === 1 && isDialogueWorld) {
        add(new THREE.BoxGeometry(6.2, 0.32, 4.8), ground, -1.9, 4, 27, -0.12);
        add(new THREE.BoxGeometry(6.2, 0.32, 4.8), glow, 1.9, 4, 27, 0.12);
        for (const x of [-1.9, 1.9]) {
          const support = add(new THREE.CylinderGeometry(0.24, 0.34, 2.7, 8), dark, x, 2.5, 27);
          support.userData.isLandscapeStage = true;
        }
        const addSpeechBubble = (x: number, y: number, material: THREE.Material, tailRight: boolean): void => {
          const shape = new THREE.Shape();
          shape.moveTo(-1.15, -0.62);
          if (tailRight) {
            shape.lineTo(0.22, -0.62);
            shape.lineTo(0.62, -1.08);
            shape.lineTo(0.74, -0.62);
          } else {
            shape.lineTo(-0.72, -0.62);
            shape.lineTo(-0.62, -1.08);
            shape.lineTo(-0.22, -0.62);
          }
          shape.lineTo(1.02, -0.62);
          shape.quadraticCurveTo(1.22, -0.62, 1.22, -0.42);
          shape.lineTo(1.22, 0.48);
          shape.quadraticCurveTo(1.22, 0.68, 1.02, 0.68);
          shape.lineTo(-1.02, 0.68);
          shape.quadraticCurveTo(-1.22, 0.68, -1.22, 0.48);
          shape.lineTo(-1.22, -0.42);
          shape.quadraticCurveTo(-1.22, -0.62, -1.15, -0.62);
          const bubble = add(
            new THREE.ExtrudeGeometry(shape, {
              depth: 0.34,
              bevelEnabled: true,
              bevelSegments: 2,
              steps: 1,
              bevelSize: 0.055,
              bevelThickness: 0.055,
              curveSegments: 8,
            }),
            material,
            x,
            y,
            26.7
          );
          bubble.userData.isLandscapeStage = true;
        };
        addSpeechBubble(-2.1, 5.6, edge, true);
        addSpeechBubble(2.1, 4.9, glow, false);
        const speechDot = new THREE.MeshStandardMaterial({
          color: 0xf1f8ff,
          emissive: 0xb9e7ff,
          emissiveIntensity: 0.24,
          roughness: 0.34,
        });
        for (const [centerX, centerY] of [[-2.1, 5.6], [2.1, 4.9]]) {
          for (const offsetX of [-0.38, 0, 0.38]) {
            add(new THREE.SphereGeometry(0.085, 8, 6), speechDot, centerX + offsetX, centerY, 26.62);
          }
        }
        const exchange = new THREE.Mesh(
          new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-0.9, 5.25, 26.7),
              new THREE.Vector3(0, 4.35, 26.7),
              new THREE.Vector3(0.9, 4.55, 26.7),
            ]),
            20,
            0.08,
            6,
            false
          ),
          edge
        );
        exchange.userData.isLandscapeRoute = true;
        root.add(exchange);
      } else if (index === 1) {
        for (const x of [-3.6, 3.6]) {
          add(new THREE.CylinderGeometry(0.55, 0.82, 5.6, 8), ground, x, 3.8, 27);
        }
        add(new THREE.BoxGeometry(9, 0.32, 0.52), edge, 0, 6.7, 27);
        beacon(5.1);
        ring(3.2, 4.4, 0.18);
      } else if (index === 2) {
        for (const x of [-4, 4]) add(new THREE.CylinderGeometry(0.62, 0.9, 7.2, 8), ground, x, 4.4, 27);
        add(new THREE.BoxGeometry(10, 0.42, 0.5), edge, 0, 8.2, 27);
        const core = beacon(4.9);
        core.scale.setScalar(0.8);
        ring(3.4, 4.9, Math.PI / 2.3);
      } else if (index === 3) {
        for (const side of [-1, 1]) {
          const path = add(new THREE.BoxGeometry(2.3, 0.32, 10), ground, side * 2.8, 1.35, 27, side * 0.3);
          path.userData.isLandscapeRoute = true;
        }
        beacon(5.8);
        ring(3.1, 1.7);
      } else {
        for (const x of [-4.8, 4.8]) add(new THREE.CylinderGeometry(0.72, 1, 8, 8), edge, x, 4.8, 27);
        add(new THREE.TorusGeometry(5, 0.22, 8, 40, Math.PI), glow, 0, 8.8, 27, Math.PI);
        beacon(5.2);
      }
    } else if (section === "section_b") {
      if (index === 1) {
        for (const [x, height] of [[-5, 5], [0, 8], [5, 6]] as const) {
          add(new THREE.BoxGeometry(2.4, height, 0.5), ground, x, height / 2 + 1.1, 27);
        }
        for (const y of [3.2, 5.8]) add(new THREE.BoxGeometry(11, 0.16, 0.28), edge, 0, y, 27);
        beacon(10);
      } else if (index === 2) {
        add(new THREE.CylinderGeometry(1.8, 2.3, 7.4, 10), glow, 0, 4.7, 27);
        ring(4.8, 4.7, 0.42);
        ring(4.8, 4.7, -0.42);
        beacon(9.2);
      } else if (index === 3) {
        add(new THREE.CylinderGeometry(5.8, 6.5, 1, 12), ground, 0, 2, 27);
        add(new THREE.SphereGeometry(4.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), edge, 0, 2.5, 27);
        add(new THREE.CylinderGeometry(1.1, 1.6, 6.2, 8), dark, 0, 5.4, 27);
        beacon(9.4);
      } else {
        add(new THREE.CylinderGeometry(0.55, 0.9, 5.5, 8), dark, 0, 3.4, 27);
        const beam = add(new THREE.BoxGeometry(12, 0.42, 1.1), edge, 0, 6.1, 27, 0.06);
        beam.userData.isLandscapeRoute = true;
        for (const x of [-5, 5]) {
          const orb = add(new THREE.SphereGeometry(1.2, 12, 8), glow, x, 6.8, 27);
          orb.userData.isLandscapeBeacon = true;
        }
        ring(4.3, 1.5);
      }
    } else if (index === 1) {
      for (const [radius, y, sides] of [[5.8, 2.3, 8], [4.6, 4.3, 6], [3.3, 6.1, 5]] as const) {
        add(new THREE.CylinderGeometry(radius, radius + 0.55, 0.72, sides), ground, 0, y, 27);
      }
      const lantern = add(new THREE.OctahedronGeometry(1.9, 1), glow, 0, 9, 27);
      lantern.userData.isLandscapeBeacon = true;
      ring(2.8, 9);
    } else if (index === 2) {
      for (const angle of [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2]) {
        const x = Math.cos(angle) * 4.7;
        const z = 27 + Math.sin(angle) * 4.7;
        const pillar = add(new THREE.CylinderGeometry(0.5, 0.78, 5.8, 8), ground, x, 3.8, z);
        pillar.userData.isLandscapeBeacon = true;
        const light = add(new THREE.SphereGeometry(0.72, 10, 8), glow, x, 7.1, z);
        light.userData.isLandscapeBeacon = true;
      }
      ring(6, 1.8);
      beacon(4.5);
    } else if (index === 3) {
      for (const x of [-5, 5]) add(new THREE.CylinderGeometry(0.65, 1, 7.4, 8), edge, x, 4.4, 27);
      const bridge = add(new THREE.BoxGeometry(12, 0.4, 2.6), ground, 0, 3.2, 27);
      bridge.userData.isLandscapeRoute = true;
      add(new THREE.TorusGeometry(4.2, 0.18, 8, 36), glow, 0, 7.5, 27, Math.PI / 2);
      beacon(5.2);
    } else {
      for (const [x, z] of [[-4, 24], [4, 24], [-4, 30], [4, 30]]) {
        add(new THREE.BoxGeometry(1.2, 5.6, 1.2), ground, x, 3.8, z);
      }
      beacon(8.4);
      ring(4.6, 2);
    }
    return true;
  }

  const vocab = worldId.match(/^lab-vocab-(\d+)$/);
  if (vocab) {
    const level = Number(vocab[1]);
    const layouts: Record<number, [number, number][]> = {
      1: Array.from({ length: 5 }, (_, index) => {
        const angle = (index / 5) * Math.PI * 2;
        return [Math.cos(angle) * 5.1, 27 + Math.sin(angle) * 5.1];
      }),
      2: [[-6, 30], [-3, 28.5], [0, 27], [3, 25.5], [6, 24]],
      3: [[-5.2, 30], [-2.6, 28.3], [0, 26.2], [2.6, 28.3], [5.2, 30]],
      4: [[0, 23.5], [-4.4, 27], [0, 27], [4.4, 27], [0, 30.5]],
      5: Array.from({ length: 5 }, (_, index) => {
        const angle = -Math.PI / 2 + index * 1.12;
        const radius = 1.8 + index * 0.92;
        return [Math.cos(angle) * radius, 27 + Math.sin(angle) * radius];
      }),
      6: [[-4.5, 24.4], [-4.5, 29.6], [0, 27], [4.5, 24.4], [4.5, 29.6]],
    };
    const layout = layouts[level] ?? layouts[1];
    const routePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 5; i++) {
      const [x, z] = layout[i];
      const height = level === 2 ? 1.7 + i * 0.55 : level === 3 ? [2.2, 1.6, 3.1, 1.6, 2.2][i] : level === 6 && i === 2 ? 3.6 : 2.2 + (i % 2) * 0.65;
      const geometry = level === 2
        ? new THREE.CylinderGeometry(0.72, 0.95, height, 7)
        : level === 5
          ? new THREE.ConeGeometry(0.96, height, 5)
          : new THREE.BoxGeometry(1.35, height, 1.35);
      const stone = add(geometry, ground, x, 1 + height / 2, z, i * 0.14);
      stone.userData.isLandscapeStage = true;
      const coreY = 1 + height + (level === 6 && i === 2 ? 1.15 : 0.9);
      const wordCore = add(
        new THREE.OctahedronGeometry(level === 6 && i === 2 ? 1.15 : 0.72, 1),
        level === 6 && i === 2 ? edge : glow,
        x,
        coreY,
        z
      );
      wordCore.userData.isLandscapeBeacon = true;
      routePoints.push(new THREE.Vector3(x, coreY - 0.35, z));
    }
    if (level > 1) {
      const route = add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(routePoints), 36, 0.055, 6, false), edge, 0, 0, 0);
      route.userData.isLandscapeRoute = true;
    }
    const boundary = add(new THREE.TorusGeometry(level === 5 ? 6.6 : 6.2, 0.075, 7, 40), edge, 0, 0.8, 27);
    boundary.rotation.x = Math.PI / 2;
    return true;
  }

  if (worldId === "lab-grammar") {
    if (biomeId === "unit01") {
      const actionPoints: THREE.Vector3[] = [];
      const addSignal = (points: THREE.Vector3[], material: THREE.Material, radius = 0.085): void => {
        const curve = new THREE.CatmullRomCurve3(points);
        const signal = add(new THREE.TubeGeometry(curve, 24, radius, 7, false), material, 0, 0, 0);
        signal.userData.isLandscapeRoute = true;
      };

      for (const side of [-1, 1]) {
        const x = side * 4.1;
        const stem = add(new THREE.CylinderGeometry(0.68, 0.92, 4.8, 8), side < 0 ? ground : dark, x, 3.35, 27);
        stem.userData.isLandscapeStage = true;
        const source = add(new THREE.OctahedronGeometry(0.52, 1), side < 0 ? glow : edge, x, 6.15, 27);
        source.userData.isLandscapeBeacon = true;
        addSignal([
          new THREE.Vector3(x, 5.7, 27),
          new THREE.Vector3(side * 2.5, 6.35, 26.5),
          new THREE.Vector3(0, 5.2, 26.2),
        ], side < 0 ? glow : edge);
      }

      const connector = add(new THREE.TorusGeometry(4.35, 0.13, 8, 40, Math.PI), edge, 0, 5.35, 27, Math.PI);
      connector.scale.y = 0.55;
      connector.userData.isLandscapeStage = true;
      const conjunction = add(new THREE.OctahedronGeometry(1.05, 1), glow, 0, 5.05, 26.15);
      conjunction.userData.isLandscapeBeacon = true;

      for (let index = 0; index < 3; index++) {
        const x = (index - 1) * 2.55;
        const action = add(new THREE.CylinderGeometry(0.62, 0.82, 0.38, 6), ground, x, 1.28, 23.6);
        action.userData.isLandscapeStage = true;
        const verb = add(new THREE.DodecahedronGeometry(0.42, 0), index === 1 ? edge : glow, x, 2.0, 23.6);
        verb.userData.isLandscapeBeacon = true;
        actionPoints.push(new THREE.Vector3(x, 2.35, 23.6));
      }

      const subject = add(new THREE.BoxGeometry(3.3, 0.28, 1.28), dark, 0, 2.72, 23.6);
      subject.userData.isLandscapeStage = true;
      const singlePredicate = add(new THREE.CylinderGeometry(0.32, 0.48, 1.25, 8), edge, 0, 3.5, 23.6);
      singlePredicate.userData.isLandscapeStage = true;
      const predicateCore = add(new THREE.SphereGeometry(0.38, 12, 8), glow, 0, 4.25, 23.6);
      predicateCore.userData.isLandscapeBeacon = true;
      addSignal([
        actionPoints[0],
        new THREE.Vector3(-1.8, 2.55, 23.6),
        new THREE.Vector3(0, 2.5, 23.6),
      ], glow, 0.065);
      addSignal([
        actionPoints[2],
        new THREE.Vector3(1.8, 2.55, 23.6),
        new THREE.Vector3(0, 2.5, 23.6),
      ], edge, 0.065);

      const foliage = new THREE.MeshStandardMaterial({ color: 0x4c9b70, emissive: 0x173b2a, emissiveIntensity: 0.14, roughness: 0.9 });
      for (const x of [-6.1, 6.1]) {
        for (const z of [24.4, 29.6]) {
          const planter = add(new THREE.CylinderGeometry(0.42, 0.62, 0.52, 7), ground, x, 1.28, z);
          planter.userData.isLandscapeStage = true;
          for (const [offset, y, size] of [[-0.22, 1.95, 0.48], [0.22, 2.25, 0.55], [0, 2.65, 0.45]] as const) {
            const leaf = add(new THREE.DodecahedronGeometry(size, 0), foliage, x + offset, y, z);
            leaf.userData.isLandscapeStage = true;
          }
        }
      }
      return true;
    }
    for (const x of [-4.5, 4.5]) add(new THREE.CylinderGeometry(0.7, 0.95, 7.2, 8), ground, x, 4.4, 27);
    add(new THREE.TorusGeometry(4.5, 0.24, 8, 40, Math.PI), edge, 0, 8, 27, Math.PI);
    beacon(4.9);
    return true;
  }
  if (worldId === "lab-cloze") {
    for (const x of [-4.1, 4.1]) {
      const bridge = add(new THREE.BoxGeometry(4.4, 0.35, 5.6), ground, x, 2, 27);
      bridge.userData.isLandscapeRoute = true;
    }
    for (const x of [-1.5, 0, 1.5]) {
      const answer = add(new THREE.OctahedronGeometry(0.62, 0), glow, x, 2.6, 27);
      answer.userData.isLandscapeBeacon = true;
    }
    ring(5.2, 1.2);
    return true;
  }
  if (worldId === "lab-translation") {
    for (const x of [-4.5, 4.5]) {
      add(new THREE.CylinderGeometry(0.62, 0.92, 7.4, 8), ground, x, 4.4, 27);
      const portal = add(new THREE.TorusGeometry(2.4, 0.16, 8, 32), edge, x, 5.4, 27, Math.PI / 2);
      portal.userData.isLandscapeRing = true;
    }
    const bridge = add(new THREE.BoxGeometry(8, 0.26, 0.28), glow, 0, 5, 27);
    bridge.userData.isLandscapeRoute = true;
    return true;
  }

  const projectScenes: Record<string, string> = {
    "project-reading": "reading",
    "project-listening": "listening",
    "project-writing": "writing",
    "project-memory": "memory",
  };
  const project = projectScenes[worldId];
  if (!project) return false;

  if (project === "reading") {
    add(new THREE.BoxGeometry(7.4, 0.34, 5.2), ground, -2, 3.7, 27, -0.14);
    add(new THREE.BoxGeometry(7.4, 0.34, 5.2), glow, 2, 3.7, 27, 0.14);
    add(new THREE.BoxGeometry(0.3, 2.1, 5.3), edge, 0, 2.6, 27);
    ring(4.6, 1.2);
  } else if (project === "listening") {
    for (const [radius, y] of [[2.4, 3], [3.8, 4.6], [5.3, 6.2]] as const) {
      const wave = add(new THREE.TorusGeometry(radius, 0.15, 8, 40), edge, 0, y, 27, Math.PI / 2.15);
      wave.userData.isLandscapeRing = true;
    }
    beacon(3.4);
  } else if (project === "writing") {
    const desk = add(new THREE.BoxGeometry(8.5, 0.55, 5.2), dark, 0, 2.4, 27);
    desk.userData.isLandscapeStage = true;
    const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xf2ead8, roughness: 0.88 });
    const paper = add(new THREE.BoxGeometry(5.8, 0.14, 3.4), paperMaterial, -0.25, 2.8, 27, -0.08);
    paper.userData.isLandscapeStage = true;
    for (let index = 0; index < 5; index++) {
      const line = add(new THREE.BoxGeometry(3.6, 0.035, 0.045), edge, -0.25, 2.89, 26.15 + index * 0.42, -0.08);
      line.userData.isLandscapeRoute = true;
    }
    const pen = add(new THREE.CylinderGeometry(0.035, 0.06, 2.15, 8), edge, 1.95, 2.98, 27.8);
    pen.rotation.z = Math.PI / 2;
    pen.rotation.y += 0.08;
    pen.userData.isLandscapeStage = true;
    for (const x of [-3.4, 3.4]) add(new THREE.BoxGeometry(0.35, 2.6, 0.35), edge, x, 1.2, 25.4);
    const lampBase = add(new THREE.CylinderGeometry(0.42, 0.48, 0.16, 12), dark, 3.05, 2.77, 26.2);
    lampBase.userData.isLandscapeStage = true;
    const lampStem = add(new THREE.CylinderGeometry(0.055, 0.08, 1.15, 8), edge, 3.05, 3.35, 26.2);
    lampStem.userData.isLandscapeStage = true;
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 8), glow);
    lamp.position.set(3.05, 4.0, 26.2);
    lamp.scale.set(1, 0.72, 0.78);
    lamp.userData.isLandscapeBeacon = true;
    root.add(lamp);
  } else {
    for (let i = 0; i < 4; i++) {
      const angle = i * Math.PI / 3;
      const stop = add(new THREE.SphereGeometry(0.72, 12, 8), glow, Math.cos(angle) * 5.3, 2.6 + (i % 2), 27 + Math.sin(angle) * 5.3);
      stop.userData.isLandscapeBeacon = true;
    }
    ring(5.6, 1.3, 0.52);
    beacon(6.1);
  }
  return true;
}

type PassageSceneAdd = (
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  x: number,
  y: number,
  z: number,
  rotationY?: number
) => THREE.Mesh;

function addPassageSceneLandmark(
  root: THREE.Group,
  kind: PassageSceneKind,
  add: PassageSceneAdd,
  ground: THREE.MeshStandardMaterial,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  beacon: (y?: number) => THREE.Mesh,
  ring: (radius: number, y: number, rotation?: number) => THREE.Mesh
): void {
  const sceneModule = SCENE_MODULES[kind];
  if (sceneModule) {
    sceneModule({ root, glow, edge, dark, ground, accent: new THREE.Color(0xffffff), beacon, ring });
    return;
  }

  const box = (x: number, y: number, z: number, w: number, h: number, d: number, material = ground, rotationY = 0): THREE.Mesh => {
    const mesh = add(new THREE.BoxGeometry(w, h, d), material, x, y, z, rotationY);
    mesh.userData.isLandscapeStage = true;
    return mesh;
  };
  const cylinder = (x: number, y: number, z: number, radius: number, height: number, material = ground, sides = 10): THREE.Mesh => {
    const mesh = add(new THREE.CylinderGeometry(radius * 0.86, radius, height, sides), material, x, y, z);
    mesh.userData.isLandscapeStage = true;
    return mesh;
  };
  const route = (points: [number, number, number][], material: THREE.Material = edge, radius = 0.12): void => {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, radius, 8, false), material);
    mesh.userData.isLandscapeRoute = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  };
  const arch = (width: number, height: number, material = ground, z = 27, centerX = 0): void => {
    box(centerX - width / 2, height / 2, z, 0.52, height, 0.62, material);
    box(centerX + width / 2, height / 2, z, 0.52, height, 0.62, material);
    box(centerX, height, z, width + 0.52, 0.5, 0.62, material);
  };
  const book = (x: number, y: number, z: number, index: number, width = 0.48): void => {
    const colors = [ground, edge, glow, dark];
    box(x, y, z, width, 0.74 + (index % 2) * 0.16, 0.34, colors[index % colors.length], (index % 3 - 1) * 0.035);
  };

  switch (kind) {
    case "message": {
      const libraryWall = new THREE.MeshStandardMaterial({
        color: 0x9aab91,
        emissive: 0x25372e,
        emissiveIntensity: 0.24,
        roughness: 0.9,
        metalness: 0.02,
      });
      const libraryTrim = new THREE.MeshStandardMaterial({ color: 0x344b49, roughness: 0.78 });
      const libraryGlass = new THREE.MeshStandardMaterial({
        color: 0xa5c8c4,
        emissive: 0x102c2b,
        emissiveIntensity: 0.12,
        roughness: 0.2,
        metalness: 0.08,
        transparent: true,
        opacity: 0.36,
        depthWrite: false,
      });
      const courtyardWood = new THREE.MeshStandardMaterial({ color: 0x765b42, roughness: 0.88 });

      // The passage opens at a campus library courtyard, not a metaphorical canyon.
      const facadeShape = new THREE.Shape();
      facadeShape.moveTo(-7.9, -3.275);
      facadeShape.lineTo(7.9, -3.275);
      facadeShape.lineTo(7.9, 3.275);
      facadeShape.lineTo(-7.9, 3.275);
      facadeShape.closePath();
      for (const [x, y, width, height] of [
        [-4.55, 0.2, 3.18, 2.96],
        [4.55, 0.2, 3.18, 2.96],
        [0, -1.54, 2.6, 3.35],
      ]) {
        const opening = new THREE.Path();
        opening.moveTo(x - width / 2, y - height / 2);
        opening.lineTo(x - width / 2, y + height / 2);
        opening.lineTo(x + width / 2, y + height / 2);
        opening.lineTo(x + width / 2, y - height / 2);
        opening.closePath();
        facadeShape.holes.push(opening);
      }
      const facade = new THREE.Mesh(
        new THREE.ExtrudeGeometry(facadeShape, { depth: 0.42, bevelEnabled: false }),
        libraryWall
      );
      facade.position.set(0, 4.42, 30.73);
      facade.userData.isLandscapeStage = true;
      root.add(facade);
      box(0, 4.42, 33.02, 15.38, 6.55, 0.42, libraryWall);
      for (const side of [-1, 1]) {
        const wallX = side * 7.69;
        box(wallX, 6.93, 31.98, 0.42, 1.53, 2.5, libraryWall);
        box(wallX, 2.11, 31.98, 0.42, 1.93, 2.5, libraryWall);
        box(wallX, 4.62, 30.92, 0.42, 3.08, 0.38, libraryWall);
        box(wallX, 4.62, 33.02, 0.42, 3.08, 0.42, libraryWall);
        box(wallX, 4.62, 31.97, 0.035, 2.82, 1.68, libraryGlass);
        for (const z of [31.1, 32.84]) box(wallX, 4.62, z, 0.42, 3.08, 0.1, libraryTrim);
        for (const y of [3.13, 6.11]) box(wallX, y, 31.97, 0.42, 0.12, 1.84, libraryTrim);
      }
      box(0, 7.82, 31.95, 16.35, 0.34, 2.85, libraryTrim);
      box(0, 1.28, 31.9, 15.5, 0.26, 2.6, libraryTrim);

      for (const x of [-4.55, 4.55]) {
        box(x, 4.62, 30.72, 3.5, 3.28, 0.16, libraryTrim);
        box(x, 4.62, 30.6, 3.18, 2.96, 0.08, libraryGlass);
        box(x, 4.62, 30.53, 0.12, 2.96, 0.06, edge);
        box(x, 4.62, 30.53, 3.18, 0.12, 0.06, edge);
        box(x, 4.62, 30.53, 0.1, 2.96, 0.06, libraryTrim);
        box(x, 4.62, 30.53, 3.18, 0.1, 0.06, libraryTrim);
      }

      // Shelves sit behind the glazing so the facade reads as a working library, not a painted box.
      const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x574638, roughness: 0.88 });
      const shelves = new THREE.InstancedMesh(new THREE.BoxGeometry(2.8, 0.075, 0.42), shelfMaterial, 6);
      const books = new THREE.InstancedMesh(
        new THREE.BoxGeometry(0.3, 0.72, 0.26),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84 }),
        30
      );
      const shelfDummy = new THREE.Object3D();
      const shelfYs = [3.35, 4.28, 5.21];
      let shelfIndex = 0;
      let bookIndex = 0;
      const bookColors = [0xb87956, 0xd0ae72, 0x6f8b78, 0x70899a, 0x9b7378, 0xd8d0b8];
      for (const windowX of [-4.55, 4.55]) {
        for (const [row, y] of shelfYs.entries()) {
          shelfDummy.position.set(windowX, y, 31.62);
          shelfDummy.scale.set(1, 1, 1);
          shelfDummy.rotation.set(0, 0, 0);
          shelfDummy.updateMatrix();
          shelves.setMatrixAt(shelfIndex++, shelfDummy.matrix);
          for (let column = 0; column < 5; column++) {
            shelfDummy.position.set(windowX - 1.08 + column * 0.54, y + 0.39, 31.58);
            shelfDummy.scale.set(0.78 + ((row + column) % 2) * 0.12, 0.72 + ((row * 2 + column) % 3) * 0.14, 0.84);
            shelfDummy.rotation.set(0, ((column % 3) - 1) * 0.035, 0);
            shelfDummy.updateMatrix();
            books.setMatrixAt(bookIndex, shelfDummy.matrix);
            books.setColorAt(bookIndex, new THREE.Color(bookColors[(row + column * 2) % bookColors.length]));
            bookIndex++;
          }
        }
      }
      shelves.instanceMatrix.needsUpdate = true;
      books.instanceMatrix.needsUpdate = true;
      if (books.instanceColor) books.instanceColor.needsUpdate = true;
      shelves.castShadow = true;
      books.castShadow = true;
      root.add(shelves, books);

      // A shallow canopy and narrow fins give the entrance and window bays real architectural depth.
      box(0, 4.82, 29.78, 4.9, 0.2, 1.4, libraryTrim);
      for (const x of [-2.18, 2.18]) box(x, 3.05, 29.78, 0.16, 3.4, 0.18, libraryTrim);
      for (const x of [-7.1, -2.68, 2.68, 7.1]) box(x, 4.62, 30.48, 0.14, 3.02, 0.22, libraryTrim);

      // Side glazing gives the library a readable building volume when the learner orbits the scene.
      // Side panes are now set into the side-wall openings rather than floating over a solid wall.

      // A recessed, glazed entrance makes the building legible at a glance.
      box(0, 2.88, 30.62, 2.6, 3.35, 0.2, libraryTrim);
      box(-0.62, 2.72, 30.47, 1.08, 2.98, 0.08, libraryGlass);
      box(0.62, 2.72, 30.47, 1.08, 2.98, 0.08, libraryGlass);
      box(0, 2.72, 30.4, 0.1, 2.98, 0.06, edge);
      box(0.38, 2.72, 30.35, 0.08, 0.12, 0.08, courtyardWood);
      box(0, 1.18, 29.95, 3.5, 0.22, 1.2, courtyardWood);

      const signCanvas = document.createElement("canvas");
      signCanvas.width = 1024;
      signCanvas.height = 192;
      const signContext = signCanvas.getContext("2d");
      if (signContext) {
        signContext.fillStyle = "#263e3b";
        signContext.fillRect(0, 0, signCanvas.width, signCanvas.height);
        signContext.strokeStyle = "#d6c19a";
        signContext.lineWidth = 8;
        signContext.strokeRect(12, 12, signCanvas.width - 24, signCanvas.height - 24);
        signContext.fillStyle = "#f4edda";
        signContext.textAlign = "center";
        signContext.textBaseline = "middle";
        signContext.font = "bold 66px Arial, sans-serif";
        signContext.fillText("CAMPUS LIBRARY", 512, 98);
        const signTexture = new THREE.CanvasTexture(signCanvas);
        signTexture.colorSpace = THREE.SRGBColorSpace;
        const sign = new THREE.Mesh(
          new THREE.PlaneGeometry(4.4, 0.82),
          new THREE.MeshBasicMaterial({ map: signTexture, side: THREE.DoubleSide, toneMapped: false })
        );
        sign.position.set(0, 6.9, 30.55);
        sign.rotation.y = Math.PI;
        root.add(sign);
      }

      // Courtyard benches and two students show the central contrast: easy online contact,
      // but an awkward silence when people sit together in person.
      for (const x of [-2.05, 2.05]) {
        box(x, 1.72, 25.9, 3.05, 0.24, 0.68, courtyardWood);
        box(x, 2.18, 26.18, 3.05, 0.78, 0.16, courtyardWood);
        for (const legX of [x - 1.2, x + 1.2]) {
          box(legX, 1.38, 25.9, 0.12, 0.62, 0.14, libraryTrim);
          box(legX, 1.84, 26.18, 0.12, 0.72, 0.14, libraryTrim);
        }
        for (const armX of [x - 1.43, x + 1.43]) {
          box(armX, 2.0, 25.9, 0.14, 0.36, 0.68, libraryTrim);
          box(armX, 2.2, 25.9, 0.22, 0.1, 0.76, courtyardWood);
        }
      }

      // 四位坐在长椅上低头看手机的同学：线上随时联络，线下却相对无言
      const studentXs = [-2.55, -1.55, 1.55, 2.55];
      const studentLooks = [
        { shirt: 0x708797, hair: 0x302924, skin: 0xd8ad8a, trousers: 0x344453, style: "short" as const },
        { shirt: 0x9c705e, hair: 0x352d28, skin: 0x9c684c, trousers: 0x594940, style: "long" as const },
        { shirt: 0x596f69, hair: 0x42342b, skin: 0xc78e70, trousers: 0x455b54, style: "bun" as const },
        { shirt: 0x8a8169, hair: 0x272a30, skin: 0xe0bb9e, trousers: 0x4e4c56, style: "short" as const },
      ];
      for (const [studentIndex, x] of studentXs.entries()) {
        const look = studentLooks[studentIndex];
        const student = createPerson({
          shirt: look.shirt,
          hair: look.hair,
          hairStyle: look.style,
          skin: look.skin,
          trousers: look.trousers,
          seated: true,
          pose: "phone",
          lean: 0.08,
          scale: 1.6,
        });
        student.position.set(x, 1.84, 25.98);
        student.rotation.y = Math.PI;
        root.add(student);
      }

      // Floating message cards are small cues above the real courtyard, not the setting itself.
      for (const [x, y, width] of [[-2.9, 5.15, 1.25], [0, 5.75, 1.45], [2.9, 5.15, 1.25]] as const) {
        box(x, y, 25.2, width, 0.68, 0.12, dark, x * 0.035);
        box(x, y + 0.1, 25.11, width * 0.62, 0.08, 0.06, edge, x * 0.035);
        const unread = add(new THREE.SphereGeometry(0.09, 8, 6), glow, x + width * 0.34, y + 0.29, 25.08);
        unread.userData.isLandscapeBeacon = true;
      }
      route([[-2.15, 5.12, 25.14], [0, 5.7, 25.14], [2.15, 5.12, 25.14]], glow, 0.06);
      route([[0, 1.24, 34], [0, 1.28, 31], [0, 1.28, 28], [0, 1.34, 26.8]], edge, 0.1);

      for (const x of [-6.35, 6.35]) {
        cylinder(x, 1.43, 27.65, 0.48, 0.46, courtyardWood, 8);
        cylinder(x, 2.75, 27.65, 0.1, 2.55, libraryTrim, 8);
        for (const [dx, y, scale] of [[-0.34, 3.55, 0.72], [0.28, 3.82, 0.8], [0, 4.38, 0.72]] as const) {
          const crown = add(new THREE.DodecahedronGeometry(scale, 0), ground, x + dx, y, 27.65);
          crown.userData.isLandscapeStage = true;
        }
      }

      const courtyardLight = new THREE.PointLight(0xffd79b, 0.72, 16, 2);
      courtyardLight.position.set(0, 5.2, 25.2);
      root.add(courtyardLight);
      break;
    }
    case "dialogue": {
      const roomWall = new THREE.MeshStandardMaterial({ color: 0xd1c7ae, roughness: 0.9 });
      const roomTimber = new THREE.MeshStandardMaterial({ color: 0x755b43, roughness: 0.84 });
      const roomFloor = new THREE.MeshStandardMaterial({ color: 0x88755f, roughness: 0.92 });
      const roomTrim = new THREE.MeshStandardMaterial({ color: 0x526c63, roughness: 0.82 });
      const windowGlass = new THREE.MeshStandardMaterial({
        color: 0xa7c7bd,
        emissive: 0x1d3530,
        emissiveIntensity: 0.08,
        roughness: 0.24,
        metalness: 0.04,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      });
      const courtyardLeaf = new THREE.MeshStandardMaterial({ color: 0x728d69, roughness: 0.94 });
      type StaticPlacement = {
        position: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number];
      };
      const addStaticInstances = (
        geometry: THREE.BufferGeometry,
        material: THREE.Material,
        placements: StaticPlacement[],
        role: "stage" | "route" | "beacon" = "stage"
      ): THREE.InstancedMesh => {
        const mesh = new THREE.InstancedMesh(geometry, material, placements.length);
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        const rotation = new THREE.Quaternion();
        const euler = new THREE.Euler();
        const matrix = new THREE.Matrix4();
        placements.forEach((placement, index) => {
          position.set(...placement.position);
          euler.set(...(placement.rotation ?? [0, 0, 0]));
          rotation.setFromEuler(euler);
          scale.set(...(placement.scale ?? [1, 1, 1]));
          matrix.compose(position, rotation, scale);
          mesh.setMatrixAt(index, matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
        mesh.userData[`isLandscape${role[0].toUpperCase()}${role.slice(1)}`] = true;
        root.add(mesh);
        return mesh;
      };

      // A conversation room opens onto the library courtyard described in the passage.
      box(0, 1.19, 28.15, 12.1, 0.08, 9.2, roomFloor);
      addStaticInstances(
        new THREE.BoxGeometry(11.85, 0.018, 0.035),
        roomTimber,
        [24.15, 24.95, 25.75, 26.55, 27.35, 28.15, 28.95, 29.75, 30.55, 31.35, 32.15]
          .map((z) => ({ position: [0, 1.235, z] }))
      );

      // Side walls and a back facade frame the view without closing the entrance or hiding the room.
      addStaticInstances(new THREE.BoxGeometry(0.26, 4, 9), roomWall, [
        { position: [-6.05, 3.2, 28.25] },
        { position: [6.05, 3.2, 28.25] },
      ]);
      addStaticInstances(new THREE.BoxGeometry(1.9, 5.4, 0.28), roomWall, [
        { position: [-5.55, 3.9, 23.85] },
        { position: [5.55, 3.9, 23.85] },
      ]);
      box(0, 1.78, 23.85, 9.2, 1.16, 0.28, roomWall);
      box(0, 6.02, 23.85, 9.2, 1.28, 0.28, roomWall);
      addStaticInstances(new THREE.BoxGeometry(0.12, 3.02, 0.12), roomTimber, [-4.58, -1.53, 1.53, 4.58].map((x) => ({
        position: [x, 3.93, 24.02],
      })));
      addStaticInstances(new THREE.BoxGeometry(9.2, 0.12, 0.12), roomTimber, [2.43, 5.43].map((y) => ({
        position: [0, y, 24.02],
      })));
      const windowPanes = addStaticInstances(new THREE.BoxGeometry(2.92, 2.88, 0.045), windowGlass, [-3.05, 0, 3.05].map((x) => ({
        position: [x, 3.93, 24.015],
      })));
      windowPanes.userData.noLandscapeShadow = true;
      addStaticInstances(new THREE.BoxGeometry(12.15, 0.18, 0.24), roomTimber, [24.1, 26.3, 28.5, 30.7, 32.85].map((z) => ({
        position: [0, 6.34, z],
      })));
      addStaticInstances(new THREE.BoxGeometry(0.3, 4, 0.3), roomTrim, [
        { position: [-6.03, 3.2, 32.75] },
        { position: [6.03, 3.2, 32.75] },
      ]);
      box(0, 6.32, 32.75, 12.25, 0.2, 0.32, roomTimber);

      // The tree line, low garden wall, and bench make the courtyard legible through the glazing.
      addStaticInstances(new THREE.CylinderGeometry(0.103, 0.12, 1.8, 7), roomTimber, [-3.35, 0, 3.35].map((x) => ({
        position: [x, 2.12, 21.55],
      })));
      addStaticInstances(new THREE.DodecahedronGeometry(1.08, 1), courtyardLeaf, [
        { position: [-3.35, 3.55, 21.55], scale: [1.18, 0.9, 0.72] },
        { position: [0, 3.95, 21.55], scale: [1.18, 0.9, 0.72] },
        { position: [3.35, 3.6, 21.55], scale: [1.18, 0.9, 0.72] },
      ]);
      box(0, 1.56, 20.35, 5.2, 0.28, 0.52, roomTrim);
      addStaticInstances(new THREE.BoxGeometry(0.16, 0.62, 0.4), roomTimber, [-2.1, 2.1].map((x) => ({
        position: [x, 1.33, 20.35],
      })));

      // Three distinct seats form an open circle, leaving a clear route from the doorway.
      const people = [
        { x: -2.55, y: 1.22, z: 28, yaw: Math.PI / 2, shirt: 0x78968a, hair: 0x483a31 },
        { x: 2.55, y: 1.22, z: 28, yaw: -Math.PI / 2, shirt: 0xc18168, hair: 0x343b43 },
        { x: 0, y: 1.22, z: 25.45, yaw: 0, shirt: 0x718aa2, hair: 0x5d4736 },
      ];
      type FigurePlacement = {
        person: number;
        offset: [number, number, number];
        scale?: [number, number, number];
        rotation?: [number, number, number];
        color?: number;
      };
      const addFigurePart = (
        geometry: THREE.BufferGeometry,
        material: THREE.Material,
        placements: FigurePlacement[]
      ): THREE.InstancedMesh => {
        const mesh = new THREE.InstancedMesh(geometry, material, placements.length);
        const up = new THREE.Vector3(0, 1, 0);
        const offset = new THREE.Vector3();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        const yaw = new THREE.Quaternion();
        const localRotation = new THREE.Quaternion();
        const rotation = new THREE.Quaternion();
        const euler = new THREE.Euler();
        const matrix = new THREE.Matrix4();
        placements.forEach((placement, index) => {
          const person = people[placement.person];
          yaw.setFromAxisAngle(up, person.yaw);
          offset.set(...placement.offset).applyQuaternion(yaw);
          position.set(person.x, person.y, person.z).add(offset);
          euler.set(...(placement.rotation ?? [0, 0, 0]));
          localRotation.setFromEuler(euler);
          rotation.copy(yaw).multiply(localRotation);
          scale.set(...(placement.scale ?? [1, 1, 1]));
          matrix.compose(position, rotation, scale);
          mesh.setMatrixAt(index, matrix);
          if (placement.color !== undefined) mesh.setColorAt(index, new THREE.Color(placement.color));
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        mesh.computeBoundingSphere();
        mesh.userData.isLandscapeStage = true;
        root.add(mesh);
        return mesh;
      };
      const chairSeat = new THREE.BoxGeometry(1.1, 0.14, 0.9);
      const chairBack = new THREE.BoxGeometry(1.08, 0.78, 0.13);
      const chairLeg = new THREE.CylinderGeometry(0.055, 0.07, 0.56, 6);
      const chairSeats: FigurePlacement[] = [];
      const chairBacks: FigurePlacement[] = [];
      const chairLegs: FigurePlacement[] = [];
      people.forEach((_, person) => {
        chairSeats.push({ person, offset: [0, 0.48, -0.35] });
        chairBacks.push({ person, offset: [0, 0.91, -0.79], rotation: [-0.06, 0, 0] });
        for (const x of [-0.43, 0.43]) {
          for (const z of [-0.68, -0.05]) chairLegs.push({ person, offset: [x, 0.17, z] });
        }
      });
      addFigurePart(chairSeat, roomTimber, chairSeats);
      addFigurePart(chairBack, roomTimber, chairBacks);
      addFigurePart(chairLeg, roomTimber, chairLegs);

      cylinder(0, 1.63, 27.95, 0.22, 0.82, roomTimber, 10);
      cylinder(0, 2.08, 27.95, 1.28, 0.16, roomTimber, 16);
      addStaticInstances(new THREE.BoxGeometry(0.34, 0.035, 0.5), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92 }), [
        { position: [-0.42, 2.18, 27.95], scale: [1, 1, 1], rotation: [0, 0, 0] },
        { position: [0, 2.18, 27.95], scale: [1, 1, 1], rotation: [0, 0, 0] },
        { position: [0.42, 2.18, 27.95], scale: [1, 1, 1], rotation: [0, 0, 0] },
      ]);

      // 三位同学围坐：中间一人在发言，其余两人专注倾听
      people.forEach((spec, index) => {
        const person = createPerson({
          shirt: spec.shirt,
          hair: spec.hair,
          hairStyle: index === 0 ? "long" : "short",
          skin: [0xd9a07c, 0xb97d5a, 0xe2b693][index],
          seated: true,
          pose: index === 2 ? "talk" : "listen",
          lean: index === 2 ? 0 : 0.05,
          scale: 1.45,
        });
        person.position.set(spec.x, spec.y + 0.55, spec.z);
        person.rotation.y = spec.yaw;
        root.add(person);
      });

      // The basket and four session markers carry the story from device-free arrival to repeated practice.
      cylinder(4.65, 1.48, 32.05, 0.54, 0.46, roomTimber, 10);
      const basketRim = add(new THREE.TorusGeometry(0.54, 0.075, 7, 24), roomTrim, 4.65, 1.73, 32.05);
      basketRim.rotation.x = Math.PI / 2;
      basketRim.userData.isLandscapeStage = true;
      const phoneGeometry = new THREE.BoxGeometry(0.22, 0.045, 0.38);
      const phonePlacements = [
        { position: [4.38, 1.75, 31.98], rotation: -0.3 },
        { position: [4.66, 1.76, 32.02], rotation: 0.18 },
        { position: [4.91, 1.75, 32.14], rotation: -0.12 },
      ];
      addStaticInstances(phoneGeometry, dark, phonePlacements.map((phone) => ({
        position: phone.position as [number, number, number],
        rotation: [0, phone.rotation, 0],
        scale: [1, 0.8, 1],
      })));
      addStaticInstances(new THREE.BoxGeometry(0.16, 0.012, 0.28), roomTrim, phonePlacements.map((phone) => ({
        position: [phone.position[0], phone.position[1] + 0.03, phone.position[2]] as [number, number, number],
        rotation: [0, phone.rotation, 0],
      })));
      addStaticInstances(new THREE.BoxGeometry(0.12, 0.48, 0.5), roomTrim, [2.85, 3.7, 4.55].map((y) => ({
        position: [-5.88, y, 29.9],
      })));
      addStaticInstances(new THREE.BoxGeometry(0.12, 0.48, 0.5), edge, [{ position: [-5.88, 5.4, 29.9] }]);
      addStaticInstances(new THREE.SphereGeometry(0.11, 8, 6), glow, [2.85, 3.7, 4.55, 5.4].map((y) => ({
        position: [-5.78, y, 29.55],
      })), "beacon");

      const routeStepGeometry = new THREE.CylinderGeometry(0.2408, 0.28, 0.055, 10);
      addStaticInstances(routeStepGeometry, edge, [31.5, 29.15].map((z) => ({ position: [0, 1.285, z] })), "route");
      addStaticInstances(routeStepGeometry, glow, [{ position: [0, 1.285, 30.05] }], "route");
      for (const [radius, y] of [[0.72, 4.45], [1.08, 4.78]] as const) {
        const listeningWave = add(new THREE.TorusGeometry(radius, 0.045, 6, 24, Math.PI), glow, 0, y, 27.35);
        listeningWave.userData.isLandscapeRoute = true;
      }

      box(0, 5.92, 32.75, 9.9, 1.48, 0.24, roomTimber);
      const signCanvas = document.createElement("canvas");
      signCanvas.width = 1024;
      signCanvas.height = 192;
      const signContext = signCanvas.getContext("2d");
      if (signContext) {
        signContext.fillStyle = "#36574d";
        signContext.fillRect(0, 0, signCanvas.width, signCanvas.height);
        signContext.strokeStyle = "#d6c49d";
        signContext.lineWidth = 8;
        signContext.strokeRect(12, 12, signCanvas.width - 24, signCanvas.height - 24);
        signContext.fillStyle = "#f6eedb";
        signContext.textAlign = "center";
        signContext.textBaseline = "middle";
        signContext.font = "bold 48px Arial, sans-serif";
        signContext.fillText("FOUR-WEEK LISTENING EXPERIMENT", 512, 65);
        signContext.font = "bold 29px Arial, sans-serif";
        signContext.fillText("20 MIN  ·  ASK ONE FOLLOW-UP  ·  SUMMARIZE BEFORE REPLYING", 512, 130);
        const signTexture = new THREE.CanvasTexture(signCanvas);
        signTexture.colorSpace = THREE.SRGBColorSpace;
        const sign = new THREE.Mesh(
          new THREE.PlaneGeometry(9.45, 1.22),
          new THREE.MeshBasicMaterial({ map: signTexture, side: THREE.DoubleSide, toneMapped: false })
        );
        sign.position.set(0, 5.92, 33.02);
        sign.userData.isLandscapeStage = true;
        root.add(sign);
      }

      const conversationLight = new THREE.PointLight(0xffd7a2, 0.72, 17, 2);
      conversationLight.position.set(0, 5.35, 27.2);
      root.add(conversationLight);
      break;
    }
    case "listening-bench": {
      const stone = new THREE.MeshStandardMaterial({ color: 0x8d9085, roughness: 0.92 });
      const inlay = new THREE.MeshStandardMaterial({ color: 0x6f7771, roughness: 0.86 });
      const timber = new THREE.MeshStandardMaterial({ color: 0x765b45, roughness: 0.88 });
      const foliage = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.94 });
      const soil = new THREE.MeshStandardMaterial({ color: 0x4c4939, roughness: 1 });
      const paper = new THREE.MeshStandardMaterial({ color: 0xece3cf, roughness: 0.96 });

      const terrace = cylinder(0, 1.18, 27, 5.25, 0.34, stone, 16);
      terrace.userData.isLandscapeRoute = true;
      for (const radius of [3.55, 4.7]) {
        const pavingEcho = add(new THREE.TorusGeometry(radius, 0.026, 6, 56), inlay, 0, 1.37, 27);
        pavingEcho.rotation.x = Math.PI / 2;
        pavingEcho.userData.isLandscapeRoute = true;
        pavingEcho.userData.noLandscapeShadow = true;
      }

      const benchSeats = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, 0.18, 1.9), timber, 2);
      const benchBacks = new THREE.InstancedMesh(new THREE.BoxGeometry(0.16, 0.82, 1.9), timber, 2);
      const benchLegs = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 0.48, 0.12), dark, 8);
      const benchMatrix = new THREE.Matrix4();
      const benchCenters = [-1.65, 1.65] as const;
      benchCenters.forEach((x, index) => {
        benchMatrix.makeTranslation(x, 1.82, 27);
        benchSeats.setMatrixAt(index, benchMatrix);
        benchMatrix.makeTranslation(Math.sign(x) * 2.14, 2.31, 27);
        benchBacks.setMatrixAt(index, benchMatrix);
      });
      let legIndex = 0;
      for (const x of benchCenters) {
        for (const dx of [-0.3, 0.3]) {
          for (const dz of [-0.68, 0.68]) {
            benchMatrix.makeTranslation(x + dx, 1.59, 27 + dz);
            benchLegs.setMatrixAt(legIndex++, benchMatrix);
          }
        }
      }
      for (const [mesh, name] of [
        [benchSeats, "echo-bench-seats"],
        [benchBacks, "echo-bench-backs"],
        [benchLegs, "echo-bench-legs"],
      ] as const) {
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
        mesh.name = name;
        mesh.userData.isLandscapeStage = true;
        root.add(mesh);
      }

      // 两位坐在长椅上的同学：一人说话、一人倾听，面朝彼此（写实比例人物）
      for (const [x, facing, shirtColor, hairColor, speaking] of [
        [-1.78, Math.PI / 2, 0x789585, 0x443a34, true],
        [1.78, -Math.PI / 2, 0x7d91a4, 0x2b2420, false],
      ] as const) {
        const person = createPerson({
          shirt: shirtColor,
          hair: hairColor,
          hairStyle: speaking ? "short" : "long",
          skin: speaking ? 0xd9a07c : 0xe2b693,
          seated: true,
          pose: speaking ? "talk" : "listen",
          lean: speaking ? 0 : 0.07,
          scale: 1.4,
        });
        person.name = speaking ? "echo-speaker" : "echo-listener";
        person.position.set(x, 1.91, 27);
        person.rotation.y = facing;
        root.add(person);
      }

      cylinder(0, 1.55, 27, 0.15, 0.36, timber, 10);
      cylinder(0, 1.78, 27, 0.62, 0.16, timber, 12);
      box(-0.17, 1.875, 27, 0.36, 0.025, 0.46, paper, 0.08);
      box(0.17, 1.875, 27, 0.36, 0.025, 0.46, paper, -0.08);
      box(0, 1.895, 27, 0.025, 0.018, 0.46, inlay);
      box(-0.42, 1.9, 27.25, 0.035, 0.025, 0.42, dark, -0.18);
      for (const x of [-0.43, 0.43]) {
        cylinder(x, 1.95, 27.32, 0.075, 0.14, paper, 8);
        const cupHandle = add(new THREE.TorusGeometry(0.045, 0.012, 6, 12), paper, x + Math.sign(x) * 0.07, 1.95, 27.32);
        cupHandle.userData.noLandscapeShadow = true;
      }

      for (const x of [-4.05, 4.05]) {
        box(x, 1.57, 27, 1.3, 0.44, 2.7, timber);
        box(x, 1.81, 27, 1.15, 0.06, 2.52, soil);
      }
      const gardenTrunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.09, 0.14, 1.2, 7), timber, 2);
      const trunkMatrix = new THREE.Matrix4();
      [-4.05, 4.05].forEach((x, index) => {
        trunkMatrix.makeTranslation(x, 2.42, 27);
        gardenTrunks.setMatrixAt(index, trunkMatrix);
      });
      gardenTrunks.instanceMatrix.needsUpdate = true;
      gardenTrunks.computeBoundingSphere();
      gardenTrunks.name = "echo-garden-tree-trunks";
      gardenTrunks.userData.isLandscapeStage = true;
      root.add(gardenTrunks);

      const gardenCanopies = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.48, 1), foliage, 6);
      const canopyMatrix = new THREE.Matrix4();
      const canopyPosition = new THREE.Vector3();
      const canopyScale = new THREE.Vector3();
      const canopyColors = [0x607a62, 0x8da079, 0x708a6a, 0x708a6a, 0x8da079, 0x607a62];
      for (const [index, [x, z]] of [
        [-4.05, 26.42], [-4.05, 27.12], [-4.05, 27.78],
        [4.05, 26.42], [4.05, 27.12], [4.05, 27.78],
      ].entries()) {
        canopyPosition.set(x, 3.05 + (index % 2) * 0.2, z);
        canopyScale.set(1.1, 0.94 + (index % 2) * 0.14, 0.96);
        canopyMatrix.compose(canopyPosition, new THREE.Quaternion(), canopyScale);
        gardenCanopies.setMatrixAt(index, canopyMatrix);
        gardenCanopies.setColorAt(index, new THREE.Color(canopyColors[index]));
      }
      gardenCanopies.instanceMatrix.needsUpdate = true;
      if (gardenCanopies.instanceColor) gardenCanopies.instanceColor.needsUpdate = true;
      gardenCanopies.computeBoundingSphere();
      gardenCanopies.name = "echo-garden-canopies";
      gardenCanopies.userData.isLandscapeStage = true;
      root.add(gardenCanopies);

      arch(9.2, 5.65, timber, 31.15);
      root.add(buildPortalTrim(9.2, 5.65, 31.15, "timber"));
      root.add(buildSignFrame(8.55, 1.9, 0, 4.55, 31.15));
      box(0, 4.55, 31.15, 8.55, 1.9, 0.24, timber);
      const signCanvas = document.createElement("canvas");
      signCanvas.width = 1200;
      signCanvas.height = 280;
      const signContext = signCanvas.getContext("2d");
      if (signContext) {
        signContext.fillStyle = "#3a5045";
        signContext.fillRect(0, 0, signCanvas.width, signCanvas.height);
        signContext.strokeStyle = "#d8c9a8";
        signContext.lineWidth = 8;
        signContext.strokeRect(14, 14, signCanvas.width - 28, signCanvas.height - 28);
        signContext.textAlign = "center";
        signContext.textBaseline = "middle";
        signContext.fillStyle = "#f4eddd";
        signContext.font = "bold 48px Arial, sans-serif";
        signContext.fillText("THE ECHO BENCH", 600, 52);
        signContext.font = "bold 40px Arial, sans-serif";
        signContext.fillText("DID SOMEONE FEEL HEARD TODAY?", 600, 132);
        signContext.fillStyle = "#e5cf9d";
        signContext.font = "bold 30px Arial, sans-serif";
        signContext.fillText("LISTEN · ASK · REFLECT   |   I heard you say...", 600, 218);
        const signTexture = new THREE.CanvasTexture(signCanvas);
        signTexture.colorSpace = THREE.SRGBColorSpace;
        const signFace = new THREE.Mesh(
          new THREE.PlaneGeometry(8.2, 1.72),
          new THREE.MeshBasicMaterial({ map: signTexture, side: THREE.DoubleSide, toneMapped: false })
        );
        signFace.position.set(0, 4.55, 31.28);
        signFace.name = "echo-reflection-sign";
        signFace.userData.isLandscapeStage = true;
        signFace.userData.noLandscapeShadow = true;
        root.add(signFace);
      }

      box(0, 1.62, 29.25, 1.25, 0.14, 0.62, timber);
      for (const x of [-0.48, 0.48]) for (const z of [29.05, 29.45]) box(x, 1.48, z, 0.08, 0.28, 0.08, timber);
      box(0.34, 1.715, 29.25, 0.18, 0.025, 0.32, dark, 0.12);
      const terraceLight = new THREE.PointLight(0xffd9ad, 0.42, 11, 2);
      terraceLight.position.set(0, 4.6, 27.4);
      root.add(terraceLight);
      break;
    }
    case "community-library": {
      cylinder(0, 1.06, 27, 6.2, 0.4, dark, 14);

      const table = cylinder(0, 1.62, 27, 2.05, 0.28, ground, 12);
      table.userData.isLandscapeRoute = true;
      cylinder(0, 1.8, 27, 1.86, 0.08, glow, 12);
      for (let i = 0; i < 6; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        book(-0.74 + col * 0.74, 2.07 + row * 0.04, 26.45 + row * 0.9, i, 0.42);
      }

      for (const x of [-4.65, 4.65]) {
        box(x, 3.05, 27, 1.42, 3.6, 1.08, dark);
        for (const y of [2.02, 3.12, 4.22]) {
          box(x, y, 26.38, 1.28, 0.12, 0.16, edge);
          for (let i = 0; i < 3; i++) book(x - 0.4 + i * 0.4, y + 0.46, 26.16, i + Math.round(y * 2), 0.24);
        }
      }

      box(0, 4.15, 29.35, 7.8, 4.2, 0.4, dark);
      box(0, 4.15, 29.08, 7.24, 3.62, 0.08, ground);
      for (const x of [-2.3, 0, 2.3]) box(x, 4.12, 29.0, 0.08, 2.8, 0.06, edge);
      for (const y of [3.18, 4.12, 5.06]) box(0, y, 28.98, 6.8, 0.06, 0.06, edge);
      for (const [x, y, material] of [
        [-1.4, 3.55, glow], [0.85, 3.55, edge], [-2.25, 4.5, edge], [1.55, 4.5, glow],
        [-0.8, 5.42, edge], [2.25, 5.42, glow],
      ] as const) {
        const feedbackCard = box(x, y, 28.86, 0.48, 0.34, 0.08, material, -0.04);
        feedbackCard.userData.isLandscapeBeacon = true;
      }

      for (const [index, [x, z]] of [[-3.15, 27], [3.15, 27], [0, 24.9]].entries()) {
        const reader = cylinder(x, 2.05, z, 0.28, 0.86, index % 2 ? edge : dark, 8);
        reader.userData.isLandscapeStage = true;
        const head = add(new THREE.SphereGeometry(0.25, 10, 8), ground, x, 2.64, z);
        head.userData.isLandscapeStage = true;
      }

      box(0, 2.0, 23.35, 1.72, 1.42, 1.06, edge);
      box(0, 2.38, 22.78, 1.12, 0.12, 0.08, dark);
      box(0, 1.42, 22.78, 0.84, 0.12, 0.08, glow);
      route([[-4.2, 2.08, 27], [-2.5, 2.02, 26.1], [0, 2.08, 25.7], [2.5, 2.02, 26.1], [4.2, 2.08, 27]], glow, 0.08);
      route([[0, 2.3, 24], [0, 2.75, 25.1], [0, 2.9, 27], [0, 3.6, 28.4], [0, 4.0, 29]], edge, 0.075);
      ring(5.45, 1.28, 0.12);
      break;
    }
    case "exchange": {
      for (const x of [-3.8, 3.8]) {
        box(x, 3.7, 27, 0.35, 5.8, 0.48, edge);
        for (let row = 0; row < 3; row++) box(x * 0.85, 2.15 + row * 1.45, 27, 1.4, 0.12, 0.62, ground);
      }
      for (let i = 0; i < 8; i++) book(-3.1 + (i % 4) * 2.05, 2.65 + Math.floor(i / 4) * 1.45, 26.55, i, 0.34);
      route([[-4.1, 1.35, 29], [-2.1, 1.6, 27.5], [0, 1.45, 26], [2.1, 1.6, 27.5], [4.1, 1.35, 29]], edge, 0.12);
      break;
    }
    case "resilience": {
      arch(8.6, 5.8, ground, 27);
      for (let i = 0; i < 4; i++) {
        const x = -3 + i * 2;
        box(x, 2.25, 26.1, 1.28, 1.1, 0.94, i % 2 ? edge : glow);
        const light = add(new THREE.SphereGeometry(0.27, 10, 8), glow, x, 3.05, 25.72);
        light.userData.isLandscapeBeacon = true;
      }
      route([[-4.5, 1.25, 29], [-2.2, 1.45, 27.4], [0, 1.45, 26], [2.2, 1.45, 27.4], [4.5, 1.25, 29]], edge, 0.14);
      break;
    }
    case "exchange-wall": {
      box(0, 4, 27, 9.2, 5.8, 0.56, dark);
      box(0, 4, 26.65, 8.5, 5.15, 0.12, ground);
      for (const y of [2.2, 3.4, 4.6, 5.8]) box(0, y, 26.35, 8.1, 0.14, 0.44, edge);
      for (let row = 0; row < 3; row++) for (let col = 0; col < 7; col++) book(-3.3 + col * 1.1, 2.68 + row * 1.2, 26.05, row * 7 + col, 0.37);
      route([[-4.4, 1.2, 29], [0, 1.38, 28.2], [4.4, 1.2, 29]], glow, 0.1);
      break;
    }
    case "resource-cycle": {
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 3.4;
        const z = 27 + Math.sin(angle) * 2.2;
        cylinder(x, 1.55, z, 1.05, 0.5, ground, 8);
        book(x, 2.2, z - 0.35, i, 0.7);
      }
      route([[-3.4, 2.6, 27], [0, 3, 24.7], [3.4, 2.6, 27], [0, 2.3, 29.2], [-3.4, 2.6, 27]], edge, 0.11);
      const shared = add(new THREE.SphereGeometry(0.52, 12, 10), glow, 0, 3.8, 27);
      shared.userData.isLandscapeBeacon = true;
      break;
    }
    case "library": {
      box(0, 3.55, 27, 8.8, 4.8, 2.3, ground);
      for (const x of [-3.1, 0, 3.1]) {
        box(x, 3.8, 25.78, 1.8, 3.1, 0.14, dark);
        for (let row = 0; row < 3; row++) {
          box(x, 2.65 + row * 0.92, 25.62, 1.56, 0.12, 0.18, edge);
          for (let col = 0; col < 3; col++) book(x - 0.48 + col * 0.48, 3.1 + row * 0.92, 25.42, row * 3 + col, 0.24);
        }
      }
      box(0, 3.1, 25.68, 1.12, 2.6, 0.18, glow);
      arch(9.3, 6.3, edge, 28.1);
      break;
    }
    case "digital-lending": {
      box(0, 4.1, 27, 4.3, 6, 0.62, dark);
      box(0, 4.1, 26.62, 3.72, 5.4, 0.12, glow);
      for (const [x, y] of [[-0.62, 5.6], [0.52, 4.25], [-0.45, 2.9]] as const) {
        box(x, y, 26.43, 1.68, 0.28, 0.08, edge);
      }
      for (const x of [-4.2, 4.2]) {
        const bookcase = box(x, 3.5, 27, 1.7, 4.6, 1.2, ground);
        bookcase.userData.isLandscapeStage = true;
        for (let row = 0; row < 3; row++) box(x, 2.15 + row * 1.25, 26.35, 1.5, 0.1, 0.2, edge);
      }
      route([[-4, 2.2, 26.1], [-2.2, 2.8, 26.1], [0, 3.2, 26.1], [2.2, 2.8, 26.1], [4, 2.2, 26.1]], glow, 0.08);
      break;
    }
    case "budget-board": {
      box(0, 4.15, 28.7, 8.8, 5.2, 0.42, dark);
      box(0, 4.15, 28.46, 8.2, 4.62, 0.08, ground);
      for (const x of [-2.7, 0, 2.7]) box(x, 4.05, 28.38, 0.08, 3.55, 0.06, edge);
      for (const y of [2.45, 3.65, 4.85, 6.05]) box(0, y, 28.38, 7.8, 0.07, 0.06, edge);
      for (const [index, height] of [1.05, 1.7, 2.5].entries()) {
        const bar = box(-1.8 + index * 1.8, 2.55 + height / 2, 28.18, 0.92, height, 0.18, index === 2 ? glow : edge);
        bar.userData.isLandscapeStage = true;
      }
      for (let i = 0; i < 5; i++) cylinder(3.38, 1.48 + i * 0.24, 27, 0.48, 0.13, i % 2 ? edge : glow, 12);
      route([[-4.5, 1.28, 29.2], [-2.2, 1.35, 27.8], [0, 1.4, 26.3], [2.1, 1.48, 25.6], [4.4, 1.55, 26.4]], edge, 0.1);
      ring(5.1, 1.08, 0.1);
      break;
    }
    case "trust-ledger": {
      cylinder(0, 1.18, 27, 6.1, 0.34, dark, 12);
      box(0, 1.92, 27, 7.4, 0.28, 3.5, ground);
      box(-1.75, 2.13, 26.72, 2.5, 0.12, 2.45, glow, -0.08);
      box(1.1, 2.13, 26.72, 2.5, 0.12, 2.45, edge, 0.08);
      for (const x of [-2.45, -1.72, -0.98, 0.38, 1.1, 1.82]) box(x, 2.24, 26.35, 0.08, 0.04, 1.72, dark);
      for (const z of [25.85, 26.42, 27.02]) box(-1.73, 2.24, z, 2.24, 0.04, 0.06, dark);
      for (const x of [-4, 4]) {
        const token = add(new THREE.OctahedronGeometry(0.62, 0), x < 0 ? edge : glow, x, 3.45, 27);
        token.userData.isLandscapeBeacon = true;
      }
      route([[-4, 2.9, 27], [-2, 2.55, 27], [0, 2.42, 27], [2, 2.55, 27], [4, 2.9, 27]], edge, 0.08);
      ring(5.15, 1.16, 0.1);
      break;
    }
    case "sustainable-market": {
      for (const [index, x] of [-3.55, 0, 3.55].entries()) {
        box(x, 2.28, 27, 2.75, 0.22, 2.2, index === 1 ? edge : ground);
        for (const dx of [-0.98, 0.98]) box(x + dx, 1.55, 27, 0.16, 1.35, 0.16, dark);
        const canopy = box(x, 4.05, 27, 3.05, 0.24, 2.5, index === 1 ? glow : edge, index === 1 ? 0.03 : -0.03);
        canopy.userData.isLandscapeStage = true;
        for (let item = 0; item < 3; item++) {
          const crate = box(x - 0.78 + item * 0.78, 2.76, 26.2, 0.56, 0.72, 0.54, item % 2 ? glow : dark);
          crate.userData.isLandscapeStage = true;
        }
      }
      for (const x of [-1.75, 1.75]) {
        const shopper = add(new THREE.CylinderGeometry(0.24, 0.32, 0.9, 8), x < 0 ? edge : dark, x, 1.82, 24.9);
        shopper.userData.isLandscapeStage = true;
        add(new THREE.SphereGeometry(0.24, 10, 8), ground, x, 2.47, 24.9);
      }
      route([[-5.1, 1.2, 29.2], [-3, 1.28, 27.7], [0, 1.35, 26], [3, 1.28, 27.7], [5.1, 1.2, 29.2]], glow, 0.08);
      ring(5.35, 1.08, 0.1);
      break;
    }
    case "knowledge-bridge": {
      for (const x of [-4.15, 4.15]) {
        box(x, 3.4, 27, 1.55, 4.3, 1.55, ground);
        for (let row = 0; row < 3; row++) {
          box(x, 2.15 + row * 1.12, 26.12, 1.28, 0.12, 0.18, edge);
          for (let col = 0; col < 3; col++) book(x - 0.42 + col * 0.42, 2.53 + row * 1.12, 25.96, row * 3 + col, 0.22);
        }
      }
      arch(10.4, 5.35, edge, 28.8);
      const bridge = box(0, 2.28, 27, 7.1, 0.36, 2.35, dark);
      bridge.userData.isLandscapeRoute = true;
      for (const x of [-2.3, 0, 2.3]) {
        const steppingStone = box(x, 2.5, 27, 1.18, 0.14, 1.45, x === 0 ? glow : edge);
        steppingStone.userData.isLandscapeStage = true;
      }
      route([[-4.2, 2.58, 27], [-2.2, 2.68, 27], [0, 2.72, 27], [2.2, 2.68, 27], [4.2, 2.58, 27]], glow, 0.08);
      ring(5.3, 1.12, 0.1);
      break;
    }
    default:
      beacon();
  }
}

function addWorldTitleSign(root: THREE.Group, worldId: string | undefined, title: string | undefined, accent: number): void {
  if (!worldId || !title || worldId === "hub" || worldId === "section-a" || worldId === "section-b" || worldId === "stories-of-china" || worldId === "learning-lab" || worldId === "unit-project") return;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return;

  context.fillStyle = "rgba(7, 14, 27, 0.88)";
  context.fillRect(20, 24, 984, 208);
  context.strokeStyle = `#${accent.toString(16).padStart(6, "0")}`;
  context.lineWidth = 8;
  context.strokeRect(24, 28, 976, 200);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 52px 'Microsoft YaHei', sans-serif";
  context.fillStyle = "#f8fbff";
  context.fillText(title.slice(0, 26), 512, 126, 920);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sign = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  }));
  sign.position.set(0, 11, 14);
  sign.scale.set(19, 4.75, 1);
  sign.renderOrder = 8;
  root.add(sign);
}

/** 子世界的空间锚点：几何形状对应学习任务，帮助用户形成位置记忆。 */
function addWorldFocusLandmark(
  root: THREE.Group,
  worldId: string | undefined,
  ground: THREE.MeshStandardMaterial,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial
): void {
  if (!worldId || worldId === "hub") return;

  const platform = new THREE.Mesh(new THREE.CylinderGeometry(7.8, 8.8, 0.4, 8), dark);
  platform.position.set(0, 0.86, 27);
  root.add(platform);

  switch (worldId) {
    case "section-a": {
      const book = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.42, 5.6), ground);
      book.position.set(-2.2, 3.5, 27);
      book.rotation.y = -0.18;
      const page = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.16, 4.4), glow);
      page.position.set(2.2, 3.8, 27);
      page.rotation.y = 0.18;
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.1, 5.8), edge);
      spine.position.set(0, 2.25, 27);
      root.add(book, page, spine);
      markAnimatedBeacon(page);
      break;
    }
    case "section-b": {
      for (const x of [-3.8, 3.8]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 1.05, 8.2, 8), ground);
        pillar.position.set(x, 4.9, 27);
        root.add(pillar);
      }
      const bridge = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.2, 8, 40, Math.PI), edge);
      bridge.position.set(0, 8.2, 27);
      bridge.rotation.z = Math.PI;
      root.add(bridge);
      const conversationCore = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 12), glow);
      conversationCore.position.set(0, 4.9, 27);
      root.add(conversationCore);
      markAnimatedBeacon(conversationCore);
      break;
    }
    case "stories-of-china": {
      for (const [radius, y, sides] of [[5.8, 2.0, 8], [4.4, 4.2, 6], [3.0, 6.2, 5]] as const) {
        const tier = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius + 0.55, 0.7, sides), ground);
        tier.position.set(0, y, 27);
        root.add(tier);
      }
      const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(1.7, 1), glow);
      lantern.position.set(0, 9.0, 27);
      root.add(lantern);
      const lanternRing = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.13, 8, 32), edge);
      lanternRing.rotation.x = Math.PI / 2;
      lanternRing.position.set(0, 9, 27);
      root.add(lanternRing);
      markAnimatedBeacon(lantern);
      markAnimatedRing(lanternRing);
      break;
    }
    case "learning-lab": {
      const labCore = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 6.5, 12), glow);
      labCore.position.set(0, 4.3, 27);
      root.add(labCore);
      for (const tilt of [0.35, -0.35]) {
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.16, 8, 48), edge);
        orbit.position.set(0, 4.3, 27);
        orbit.rotation.set(tilt, 0.4, tilt * 1.4);
        root.add(orbit);
        markAnimatedRing(orbit);
      }
      markAnimatedBeacon(labCore);
      break;
    }
    case "unit-project": {
      const goal = new THREE.Mesh(new THREE.OctahedronGeometry(2.8, 1), glow);
      goal.position.set(0, 7.4, 27);
      root.add(goal);
      for (const [x, z] of [[-5.3, 24], [5.3, 24], [-5.3, 30], [5.3, 30]]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.78, 6.8, 8), edge);
        pillar.position.set(x, 3.9, z);
        root.add(pillar);
      }
      const finishRing = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.18, 8, 48), edge);
      finishRing.rotation.x = Math.PI / 2;
      finishRing.position.set(0, 1.2, 27);
      root.add(finishRing);
      markAnimatedBeacon(goal);
      markAnimatedRing(finishRing);
      break;
    }
    default:
      break;
  }
}

function markAnimatedBeacon(object: THREE.Object3D): void {
  object.userData.isLandscapeBeacon = true;
}

function markAnimatedRing(object: THREE.Object3D): void {
  object.userData.isLandscapeRing = true;
}

function addDigitalCoast(
  root: THREE.Group,
  _dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focused: boolean
): void {
  if (focused) {
    const signalPylon = new THREE.MeshStandardMaterial({
      color: 0x33485e,
      emissive: 0x102839,
      emissiveIntensity: 0.14,
      roughness: 0.78,
      metalness: 0.18,
    });
    const canyonSignal = new THREE.MeshStandardMaterial({
      color: 0x578396,
      emissive: 0x286174,
      emissiveIntensity: 0.18,
      roughness: 0.62,
      metalness: 0.12,
    });
    for (const side of [-1, 1]) {
      const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.46, 2.8, 7), signalPylon);
      pylon.position.set(side * 13.2, 1.4, 34);
      root.add(pylon);

      for (const y of [0.7, 1.35, 2]) {
        const signal = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.07, 0.09), canyonSignal);
        signal.position.set(side * 13.2, y, 33.56);
        signal.userData.isLandscapeRoute = true;
        root.add(signal);
      }
    }

    const signalLine = new THREE.MeshStandardMaterial({
      color: 0x3b6175,
      emissive: 0x286c80,
      emissiveIntensity: 0.28,
      roughness: 0.52,
      metalness: 0.2,
    });
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9, 5.5, 42),
      new THREE.Vector3(-6, 8, 42),
      new THREE.Vector3(0, 9.2, 42),
      new THREE.Vector3(6, 8, 42),
      new THREE.Vector3(9, 5.5, 42),
    ]);
    const arc = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.07, 6, false), signalLine);
    arc.userData.isLandscapeRoute = true;
    root.add(arc);

    const signalNode = new THREE.MeshStandardMaterial({
      color: 0x9ed9dd,
      emissive: 0x559dac,
      emissiveIntensity: 0.34,
      roughness: 0.4,
      metalness: 0.18,
    });
    for (const x of [-9, 9]) {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.46, 12, 8), signalNode);
      node.position.set(x, 5.5, 42);
      node.userData.isLandscapeBeacon = true;
      root.add(node);
    }
    return;
  }

  root.add(buildSignalMasts(glow, edge));
}

function addLivesArchiveHarbor(
  root: THREE.Group,
  _ground: THREE.MeshStandardMaterial,
  _dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial
): void {
  let texture: THREE.CanvasTexture | undefined;
  const headingCanvas = document.createElement("canvas");
  headingCanvas.width = 1024;
  headingCanvas.height = 192;
  const context = headingCanvas.getContext("2d");
  if (context) {
    context.fillStyle = "#182b3b";
    context.fillRect(0, 0, headingCanvas.width, headingCanvas.height);
    context.strokeStyle = "#d7b67a";
    context.lineWidth = 8;
    context.strokeRect(12, 12, headingCanvas.width - 24, headingCanvas.height - 24);
    context.fillStyle = "#f4e6c6";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 66px Arial, sans-serif";
    context.fillText("THE HARBOR OF LIVES", 512, 72);
    context.font = "bold 30px Arial, sans-serif";
    context.fillText("CHOICE  ·  SERVICE  ·  LEGACY", 512, 145);
    texture = new THREE.CanvasTexture(headingCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  root.add(buildHarborHub(glow, edge, texture));
}
function addEthiopianReliefLandscape(
  root: THREE.Group,
  edge: THREE.MeshStandardMaterial
): void {
  const ridge = new THREE.MeshBasicMaterial({ color: 0x9f9077, side: THREE.DoubleSide });
  const nearRidge = new THREE.MeshBasicMaterial({ color: 0xb29a73, side: THREE.DoubleSide });
  const earthPath = new THREE.MeshStandardMaterial({ color: 0xb5966c, roughness: 0.96, metalness: 0 });
  const acaciaTrunk = new THREE.MeshStandardMaterial({ color: 0x66513a, roughness: 1, metalness: 0 });
  const acaciaCanopy = new THREE.MeshStandardMaterial({ color: 0x78815a, roughness: 0.96, metalness: 0 });

  const addRidge = (z: number, material: THREE.Material, scale: number): void => {
    const shape = new THREE.Shape();
    shape.moveTo(-82, 0);
    shape.lineTo(-82, 8 * scale);
    shape.quadraticCurveTo(-64, 17 * scale, -48, 10 * scale);
    shape.quadraticCurveTo(-28, 3 * scale, -10, 12 * scale);
    shape.quadraticCurveTo(10, 21 * scale, 29, 11 * scale);
    shape.quadraticCurveTo(49, 3 * scale, 64, 12 * scale);
    shape.quadraticCurveTo(74, 16 * scale, 82, 8 * scale);
    shape.lineTo(82, 0);
    shape.closePath();
    const ridgeMesh = new THREE.Mesh(new THREE.ShapeGeometry(shape, 20), material);
    ridgeMesh.position.set(0, 0.35, z);
    ridgeMesh.userData.noLandscapeShadow = true;
    root.add(ridgeMesh);
  };
  addRidge(76, ridge, 1);
  addRidge(65, nearRidge, 0.64);

  for (const [x, z, width, depth, rotation] of [
    [-1.6, 39, 5.6, 13, 0.08],
    [-4.3, 51, 7.5, 15, 0.2],
    [-7.1, 64, 9.4, 16, 0.28],
  ] as const) {
    const track = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), earthPath);
    track.position.set(x, 0.49, z);
    track.rotation.y = rotation;
    track.userData.isLandscapeRoute = true;
    root.add(track);
  }

  for (const [x, z, scale] of [[-19, 46, 1], [19, 54, 0.84], [-28, 61, 0.72]] as const) {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 3.6 * scale, 7), acaciaTrunk);
    trunk.position.set(x, 2.3 * scale, z);
    root.add(trunk);

    const canopy = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 5), acaciaCanopy);
    canopy.position.set(x, 4.1 * scale, z);
    canopy.scale.set(2.6 * scale, 0.62 * scale, 1.7 * scale);
    canopy.userData.isLandscapeStage = true;
    root.add(canopy);
  }

  const routeBeacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), edge);
  routeBeacon.position.set(-7.1, 1.1, 64);
  routeBeacon.userData.isLandscapeBeacon = true;
  root.add(routeBeacon);
}

function addMemoryForest(
  root: THREE.Group,
  _ground: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focusedWorld = false
): void {
  if (focusedWorld) return;
  root.add(buildMemoryTreeHub(glow, edge));
}
function addIdeaTemple(
  root: THREE.Group,
  ground: THREE.MeshStandardMaterial,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focusedWorld = false
): void {
  if (focusedWorld) {
    const floor = new THREE.Mesh(new THREE.BoxGeometry(18, 0.36, 8), ground);
    floor.position.set(0, 0.85, 39);
    root.add(floor);
    for (const x of [-6.2, 6.2]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.48, 5.8, 0.5), dark);
      post.position.set(x, 3.9, 39);
      root.add(post);
    }
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(14, 0.48, 6.4), edge);
    canopy.position.set(0, 6.9, 39);
    root.add(canopy);
    const workbench = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.3, 1.35), dark);
    workbench.position.set(0, 1.9, 35.5);
    workbench.userData.isLandscapeStage = true;
    root.add(workbench);
    for (const x of [-2.2, 2.2]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.6, 0.22), edge);
      leg.position.set(x, 1.05, 35.5);
      root.add(leg);
    }
    const workLight = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 8), glow);
    workLight.position.set(0, 5.7, 38.6);
    workLight.userData.isLandscapeBeacon = true;
    root.add(workLight);
    return;
  }
  root.add(buildIdeaTempleHub(glow, edge));
}

function addOrbitCampus(
  root: THREE.Group,
  _dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focusedWorld = false
): void {
  if (focusedWorld) {
    const pivot = new THREE.Group();
    pivot.position.set(9, 0, 40);
    const complex = buildLaunchComplex(glow, edge, false);
    complex.position.set(0, 0, -40);
    pivot.scale.setScalar(0.62);
    pivot.add(complex);
    root.add(pivot);
    return;
  }
  root.add(buildLaunchComplex(glow, edge, true));
}
function addCommonsExchange(
  root: THREE.Group,
  _ground: THREE.MeshStandardMaterial,
  _dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focusedWorld = false,
  worldId?: string
): void {
  const countyLibraryStory = focusedWorld && /^section_c-world-[1-4]$/.test(worldId ?? "");
  root.add(buildExchangeHub(glow, edge, { stalls: !countyLibraryStory, ledger: !focusedWorld }));
}
function addLibraryCampus(root: THREE.Group, ground: THREE.MeshStandardMaterial, dark: THREE.MeshStandardMaterial, glow: THREE.MeshStandardMaterial, edge: THREE.MeshStandardMaterial): void {
  const base = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 14), ground);
  base.position.set(0, 1.2, 38);
  root.add(base);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 7, 16, 8), dark);
  tower.position.set(0, 9.5, 38);
  root.add(tower);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(8, 5, 8), glow);
  roof.position.set(0, 20, 38);
  roof.userData.isLandscapeBeacon = true;
  root.add(roof);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(7, 0.18, 8, 40, Math.PI), edge);
  arch.rotation.z = Math.PI;
  arch.position.set(0, 11, 30);
  arch.userData.isLandscapeRing = true;
  root.add(arch);
}
