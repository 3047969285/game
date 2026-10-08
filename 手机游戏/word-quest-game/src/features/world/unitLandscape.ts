import * as THREE from "three";
import type { MapNode } from "../../core/types";
import type { UnitBiome } from "./unitBiome";

type PassageKind = "section_a" | "section_b" | "section_c";
type PassageSceneKind =
  | "message" | "dialogue" | "focus" | "notification" | "study-desk" | "filter" | "offline-rest"
  | "listening-bench" | "clinic" | "telemedicine" | "community" | "community-library" | "community-network" | "timeline" | "perseverance" | "route-evidence" | "legacy" | "archive-crossroads"
  | "spotlight" | "humanitarian" | "lasting-service" | "community-witness" | "fleet" | "peace-contact" | "chart-room" | "exchange-harbor"
  | "itinerary" | "detour" | "market-encounter" | "reflection-garden" | "hostel" | "open-route" | "rain-shelter" | "confidence" | "rail-platform" | "rail-car" | "landscape-window" | "route-network"
  | "career" | "violin" | "craft-quality" | "bench" | "caliper" | "trust-bridge" | "loom" | "heritage"
  | "work-dignity" | "craft-evolution" | "embroidery-table" | "living-heritage"
  | "lunar-probe" | "test-console" | "lander" | "orbit-adjustment" | "training" | "science-exhibit"
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
    section_a: ["timeline", "route-evidence", "perseverance", "archive-crossroads"],
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
    addCentralSanctuary(root, ground, dark, glow, edge);
    addStudyStations(root, dark, glow, edge);
  }
  if (isFocusedLearningWorld(worldId)) {
    const landmark = new THREE.Group();
    addLearningSceneLandmark(landmark, worldId, worldTitle, ground, dark, glow, edge, accent, biome.id);
    landmark.scale.setScalar(0.78);
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
      addKnowledgeMarket(environment, ground, dark, glow);
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
      addCommonsExchange(environment, ground, dark, glow, edge, isFocusedLearningWorld(worldId));
      break;
    default:
      addLibraryCampus(environment, ground, dark, glow, edge);
      break;
  }
  if (isFocusedLearningWorld(worldId)) {
    environment.scale.setScalar(0.72);
    environment.position.z = 14;
  } else {
    // Keep each unit's defining environment legible from the fixed sanctuary entrance.
    environment.scale.setScalar(0.62);
    environment.position.z = 1.5;
  }
  root.add(environment);

  root.traverse((object) => {
    object.castShadow = object instanceof THREE.Mesh;
    object.receiveShadow = object instanceof THREE.Mesh && !isFocusedLearningWorld(worldId);
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
  const route = new THREE.MeshStandardMaterial({
    color: routeColor,
    emissive: routeColor,
    emissiveIntensity: 0.12,
    roughness: 0.62,
    metalness: 0.12,
  });
  for (let index = 0; index < 5; index++) {
    const z = 1.8 + index * 2.1;
    const stepY = 0.54 + index * 0.32;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.18, 3.3), route);
    slab.position.set(index % 2 === 0 ? -0.28 : 0.28, stepY, z);
    slab.rotation.y = index % 2 === 0 ? -0.035 : 0.035;
    slab.userData.isLandscapeRoute = true;
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
    const platform = add(new THREE.CylinderGeometry(7.8, 8.8, 0.48, 8), dark, 0, 0.92, 27);
    platform.userData.isLandscapeStage = true;

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
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const x = Math.cos(angle) * 5.1;
      const z = 27 + Math.sin(angle) * 5.1;
      const stone = add(new THREE.BoxGeometry(1.35, 2.2 + ((i + level) % 2) * 0.8, 1.35), ground, x, 2.1, z, angle);
      stone.userData.isLandscapeStage = true;
      const wordCore = add(new THREE.OctahedronGeometry(0.82, 1), glow, x, 4.2, z);
      wordCore.userData.isLandscapeBeacon = true;
    }
    ring(6.4, 1.1);
    return true;
  }

  if (worldId === "lab-grammar") {
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
    add(new THREE.BoxGeometry(8.5, 0.55, 5.2), dark, 0, 2.4, 27);
    add(new THREE.BoxGeometry(5.8, 0.18, 3.4), glow, 0, 2.8, 27, -0.08);
    for (const x of [-3.4, 3.4]) add(new THREE.BoxGeometry(0.35, 2.6, 0.35), edge, x, 1.2, 25.4);
    beacon(5.2);
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
      const cliffFace = new THREE.MeshStandardMaterial({ color: 0x355574, roughness: 0.92, metalness: 0.02 });
      for (const [x, y, z, scaleX, scaleY, scaleZ] of [
        [-6.15, 4.25, 28.7, 1.35, 2.05, 0.76], [-7.45, 3.55, 25.65, 1.05, 1.55, 0.65],
        [6.15, 4.25, 28.7, 1.35, 2.05, 0.76], [7.45, 3.55, 25.65, 1.05, 1.55, 0.65],
      ] as const) {
        const cliff = add(new THREE.DodecahedronGeometry(1.6, 0), cliffFace, x, y, z);
        cliff.scale.set(scaleX, scaleY, scaleZ);
        cliff.rotation.z = x < 0 ? -0.035 : 0.035;
        cliff.userData.isLandscapeStage = true;
      }

      box(-3.9, 3.95, 26.35, 1.9, 3.55, 0.48, dark);
      box(-3.9, 3.95, 26.06, 1.48, 3.05, 0.08, ground);
      for (const [x, y, width] of [[-4.12, 4.75, 1.08], [-3.65, 4.18, 0.94], [-4.08, 3.55, 1.12]] as const) {
        box(x, y, 25.98, width, 0.18, 0.08, edge);
      }
      const signal = add(new THREE.SphereGeometry(0.2, 10, 8), glow, -3.9, 6.18, 25.98);
      signal.userData.isLandscapeBeacon = true;

      for (const [x, y, material] of [[-1.65, 4.7, edge], [0, 5.45, glow], [1.62, 4.82, edge]] as const) {
        box(x, y, 26.35, 1.05, 0.66, 0.16, material, x * 0.035);
        for (const offsetX of [-0.2, 0, 0.2]) {
          const dot = add(new THREE.SphereGeometry(0.055, 7, 6), dark, x + offsetX, y, 26.24);
          dot.userData.isLandscapeBeacon = true;
        }
      }

      box(3.72, 1.8, 27.1, 2.25, 0.3, 0.9, ground);
      for (const x of [2.9, 4.54]) box(x, 1.42, 27.1, 0.14, 0.55, 0.16, dark);
      const quietFigure = add(new THREE.CylinderGeometry(0.36, 0.52, 1.36, 8), dark, 3.72, 2.72, 27.1);
      quietFigure.userData.isLandscapeStage = true;
      const quietHead = add(new THREE.SphereGeometry(0.44, 12, 10), ground, 3.72, 3.72, 27.1);
      quietHead.userData.isLandscapeStage = true;
      const phoneBasket = box(-1.8, 1.74, 25.35, 1.8, 0.42, 0.72, ground);
      phoneBasket.rotation.z = -0.08;
      for (const x of [-2.28, -1.8, -1.32]) box(x, 2.03, 25.26, 0.3, 0.06, 0.42, edge);

      route([[-3.15, 5.9, 26.22], [-1.72, 5.2, 26.22], [0, 5.7, 26.22], [1.75, 5.05, 26.22], [3.18, 4.4, 26.22]], edge, 0.075);
      route([[-5.5, 1.35, 27], [-3.7, 1.35, 25.4], [0, 1.35, 25.4], [3.7, 1.35, 25.4], [5.5, 1.35, 27]], glow, 0.095);
      const canyonLight = new THREE.PointLight(0x70cfff, 0.9, 15, 2);
      canyonLight.position.set(0, 5.4, 25.2);
      root.add(canyonLight);
      break;
    }
    case "dialogue": {
      for (const [index, z] of [25.1, 27.5, 29.9].entries()) {
        arch(9.3 - index * 0.45, 6.45 - index * 0.2, index === 1 ? edge : ground, z);
        const roofRib = add(new THREE.TorusGeometry(3.95 - index * 0.18, 0.075, 7, 24, Math.PI), index === 1 ? glow : edge, 0, 2.95, z + 0.05);
        roofRib.userData.isLandscapeStage = true;
      }
      route([[-4.2, 6.35, 25.1], [-4.1, 6.65, 27.5], [-3.9, 6.45, 29.9]], edge, 0.075);
      route([[4.2, 6.35, 25.1], [4.1, 6.65, 27.5], [3.9, 6.45, 29.9]], edge, 0.075);
      route([[0, 6.6, 25.1], [0, 6.9, 27.5], [0, 6.6, 29.9]], glow, 0.075);

      cylinder(0, 1.52, 26.35, 0.34, 1.32, dark, 10);
      cylinder(0, 2.24, 26.35, 1.68, 0.22, ground, 12);
      const sharedIdea = add(new THREE.OctahedronGeometry(0.34, 1), glow, 0, 2.55, 26.35);
      sharedIdea.userData.isLandscapeBeacon = true;

      const listenerMaterials = [edge, glow, ground] as const;
      for (const [index, x] of [-3.25, 0, 3.25].entries()) {
        box(x, 1.62, 28, 1.16, 0.24, 0.92, dark, x * -0.04);
        box(x, 2.02, 28.38, 1.08, 0.78, 0.16, ground, x * -0.04);
        const torso = add(new THREE.CylinderGeometry(0.34, 0.48, 1.22, 8), listenerMaterials[index], x, 2.82, 28);
        torso.userData.isLandscapeStage = true;
        const head = add(new THREE.SphereGeometry(0.4, 12, 10), ground, x, 3.72, 28);
        head.userData.isLandscapeStage = true;
      }

      const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x69bd91,
        emissive: 0x163d2d,
        emissiveIntensity: 0.28,
        roughness: 0.86,
      });
      for (const [x, z] of [[-5.3, 26.2], [5.3, 26.2], [-5.3, 29.1], [5.3, 29.1]] as const) {
        cylinder(x, 1.55, z, 0.43, 0.62, dark, 8);
        cylinder(x, 2.22, z, 0.08, 1.05, edge, 7);
        const leaf = add(new THREE.DodecahedronGeometry(0.46, 0), leafMaterial, x, 2.95, z);
        leaf.scale.set(0.8, 1.35, 0.8);
        leaf.userData.isLandscapeStage = true;
      }

      box(-4.35, 1.63, 25.55, 1.42, 0.34, 0.76, dark);
      for (const x of [-4.78, -4.35, -3.92]) box(x, 1.9, 25.48, 0.24, 0.08, 0.38, edge);
      for (const [radius, y] of [[0.65, 4.75], [0.98, 4.95], [1.31, 5.15]] as const) {
        const wave = add(new THREE.TorusGeometry(radius, 0.055, 7, 24, Math.PI), glow, 0, y, 27.78);
        wave.userData.isLandscapeRoute = true;
      }
      route([[-3.2, 4.25, 27.78], [0, 5.25, 27.78], [3.2, 4.25, 27.78]], edge, 0.07);
      const greenhouseLight = new THREE.PointLight(0x9ce8c8, 0.85, 16, 2);
      greenhouseLight.position.set(0, 5.4, 25.7);
      root.add(greenhouseLight);
      break;
    }
    case "focus": {
      const desk = cylinder(0, 1.5, 27, 3.4, 0.34, ground, 12);
      desk.userData.isLandscapeRoute = true;
      box(0, 2.2, 27, 2.1, 0.18, 1.6, glow, -0.08);
      for (const x of [-3.2, 3.2]) {
        const distraction = add(new THREE.OctahedronGeometry(0.36, 0), dark, x, 3.4, 27);
        distraction.userData.isLandscapeBeacon = true;
      }
      const focusCore = add(new THREE.OctahedronGeometry(1.02, 1), edge, 0, 4.25, 27);
      focusCore.userData.isLandscapeBeacon = true;
      ring(4.7, 1.05, 0.08);
      break;
    }
    case "listening-bench": {
      cylinder(0, 1.18, 27, 5.1, 0.34, dark, 12);
      for (const x of [-2.25, 2.25]) {
        box(x, 1.78, 27, 1.85, 0.22, 0.78, ground);
        box(x, 2.34, x < 0 ? 27.38 : 26.62, 1.85, 0.78, 0.18, edge, x < 0 ? -0.04 : 0.04);
        for (const z of [26.72, 27.28]) cylinder(x, 1.42, z, 0.1, 0.58, dark, 8);
      }
      for (const x of [-1.7, 1.7]) {
        const torso = cylinder(x, 2.55, 27, 0.34, 1.02, x < 0 ? edge : ground, 8);
        torso.userData.isLandscapeStage = true;
        const head = add(new THREE.SphereGeometry(0.37, 12, 10), ground, x, 3.28, 27);
        head.userData.isLandscapeStage = true;
      }
      const sharedFocus = add(new THREE.OctahedronGeometry(0.46, 1), glow, 0, 3.22, 27);
      sharedFocus.userData.isLandscapeBeacon = true;
      route([[-1.18, 3.05, 27], [-0.55, 3.55, 27], [0.42, 3.55, 27], [1.18, 3.05, 27]], edge, 0.075);
      for (const [radius, y] of [[0.82, 4.26], [1.18, 4.56], [1.54, 4.86]] as const) {
        const echo = add(new THREE.TorusGeometry(radius, 0.055, 7, 28, Math.PI), glow, 0, y, 27.25);
        echo.userData.isLandscapeRoute = true;
      }
      ring(4.75, 1.05, 0.12);
      break;
    }
    case "notification": {
      const panels = [
        { x: -3.4, y: 4.1, scale: 0.86, rows: [0.76, 1.28, 0.94, 0.62] },
        { x: 0, y: 5.6, scale: 1.08, rows: [1.34, 0.82, 1.12, 0.68] },
        { x: 3.4, y: 4.5, scale: 0.9, rows: [0.92, 1.22, 0.74, 1.04] },
      ] as const;
      for (const { x, y, scale, rows } of panels) {
        const rotationY = x * 0.035;
        box(x, y, 27, 2.2 * scale, 2.8 * scale, 0.42, dark, x * 0.035);
        box(x, y, 26.73, 1.88 * scale, 2.44 * scale, 0.1, glow, rotationY);
        box(x - 0.1 * scale, y + 0.78 * scale, 26.62, 0.78 * scale, 0.15 * scale, 0.06, edge, rotationY);
        rows.forEach((width, row) => {
          const material = row === 1 && x === 0 ? edge : dark;
          box(x - 0.08 * scale, y + (0.34 - row * 0.43) * scale, 26.62, width * scale, 0.14 * scale, 0.06, material, rotationY);
        });
        const dot = add(new THREE.SphereGeometry(0.22 * scale, 10, 8), edge, x + 0.58 * scale, y + 0.68 * scale, 26.6);
        dot.userData.isLandscapeBeacon = true;
      }
      route([[-4.4, 1.55, 27], [0, 1.55, 27], [4.4, 1.55, 27]], ground, 0.18);
      break;
    }
    case "study-desk": {
      box(0, 2.45, 27, 8.2, 0.42, 3.2, ground);
      for (const x of [-3.45, 3.45]) for (const z of [25.8, 28.2]) box(x, 1.35, z, 0.24, 2, 0.24, dark);
      box(0, 2.12, 27, 5.2, 0.18, 0.22, dark);
      box(-1.35, 2.75, 26.25, 2.1, 0.1, 1.45, glow, -0.08);
      box(-1.35, 2.82, 26.25, 0.08, 0.04, 1.35, edge, -0.08);
      for (const z of [25.82, 26.12, 26.42]) box(-1.38, 2.83, z, 1.54, 0.025, 0.035, edge);
      box(-0.05, 2.88, 26.9, 1.1, 0.07, 0.09, dark, -0.38);
      box(1.9, 2.68, 27.45, 1.55, 0.16, 1.45, dark, -0.12);
      box(1.9, 2.79, 27.45, 0.72, 0.09, 1.2, edge, -0.12);
      box(1.9, 2.85, 27.45, 0.56, 0.025, 1.02, dark, -0.12);
      box(0, 1.18, 29.65, 1.9, 0.26, 1.6, dark);
      box(0, 2.08, 30.35, 1.9, 1.8, 0.22, dark);
      cylinder(0, 0.62, 29.65, 0.14, 0.86, edge, 8);
      box(0, 4.05, 29.2, 4.7, 2.5, 0.18, dark);
      box(0, 4.05, 29.08, 4.34, 2.16, 0.05, glow);
      box(0, 4.83, 29.02, 3.25, 0.08, 0.04, edge);
      box(-0.65, 4.35, 29.02, 1.95, 0.07, 0.04, edge);
      box(0.65, 4.35, 29.02, 1.1, 0.07, 0.04, edge);
      box(-1.05, 3.88, 29.02, 2.75, 0.07, 0.04, edge);
      cylinder(3.15, 3.15, 27, 0.12, 1.3, edge, 8);
      box(2.82, 3.82, 27, 0.9, 0.14, 0.56, edge, -0.18);
      const lamp = add(new THREE.SphereGeometry(0.3, 10, 8), glow, 2.82, 3.55, 26.73);
      lamp.userData.isLandscapeBeacon = true;
      break;
    }
    case "filter": {
      const platform = cylinder(0, 0.98, 27, 7.1, 0.36, dark, 12);
      platform.userData.isLandscapeStage = true;
      arch(10.4, 6.4, edge, 28.1);

      const risk = new THREE.MeshStandardMaterial({
        color: 0xc9636b,
        emissive: 0x6b202a,
        emissiveIntensity: 0.22,
        roughness: 0.72,
      });
      const cardCenters = [-3.35, 0, 3.35] as const;
      for (const [index, x] of cardCenters.entries()) {
        box(x, 3.05, 25.72, 1.84, 2.35, 0.2, dark);
        box(x, 3.05, 25.59, 1.58, 2.08, 0.06, index === 1 ? ground : glow);
        box(x, 3.88, 25.53, 1.08, 0.1, 0.06, edge);
      }

      // A link, a credential request, and a public post enter one visible safety check.
      for (const offset of [-0.2, 0.2]) {
        const link = add(new THREE.TorusGeometry(0.26, 0.075, 8, 20), edge, -3.35 + offset, 3.12, 25.46);
        link.rotation.z = offset < 0 ? -0.62 : 0.62;
        link.userData.isLandscapeStage = true;
      }
      const lockShackle = add(new THREE.TorusGeometry(0.32, 0.075, 8, 20, Math.PI), edge, 0, 3.42, 25.45);
      lockShackle.userData.isLandscapeStage = true;
      box(0, 2.96, 25.45, 0.72, 0.56, 0.16, edge);
      const profileHead = add(new THREE.SphereGeometry(0.2, 10, 8), edge, 3.35, 3.34, 25.44);
      profileHead.userData.isLandscapeStage = true;
      const profileBody = add(new THREE.SphereGeometry(0.36, 10, 8), edge, 3.35, 2.75, 25.44);
      profileBody.scale.set(1.1, 0.68, 0.55);
      profileBody.userData.isLandscapeStage = true;

      const shieldShape = new THREE.Shape();
      shieldShape.moveTo(0, 1.16);
      shieldShape.lineTo(1.02, 0.72);
      shieldShape.lineTo(0.86, -0.12);
      shieldShape.quadraticCurveTo(0.62, -0.72, 0, -1.08);
      shieldShape.quadraticCurveTo(-0.62, -0.72, -0.86, -0.12);
      shieldShape.lineTo(-1.02, 0.72);
      shieldShape.closePath();
      const shield = add(
        new THREE.ExtrudeGeometry(shieldShape, { depth: 0.18, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.06, bevelThickness: 0.04 }),
        edge,
        0,
        5.48,
        28.4
      );
      shield.userData.isLandscapeBeacon = true;
      route([[-3.35, 1.65, 25.5], [-3.35, 1.85, 27.2], [0, 2.05, 28.2]], risk, 0.1);
      route([[0, 1.65, 25.5], [0, 2.2, 26.9], [0, 4.25, 28.3]], edge, 0.13);
      route([[3.35, 1.65, 25.5], [3.35, 1.85, 27.2], [0, 2.05, 28.2]], risk, 0.1);
      ring(5.4, 1.24, 0.08);
      break;
    }
    case "offline-rest": {
      const plaza = cylinder(0, 0.98, 27, 7.1, 0.36, dark, 12);
      plaza.userData.isLandscapeStage = true;
      arch(7.2, 6.2, edge, 27);

      box(-3.1, 2.15, 27, 2.65, 0.24, 0.78, ground);
      box(-3.1, 2.76, 27.34, 2.65, 0.84, 0.18, edge);
      for (const x of [-4.08, -2.12]) {
        for (const z of [26.76, 27.24]) box(x, 1.7, z, 0.14, 0.72, 0.14, dark);
      }

      cylinder(2.55, 1.82, 27, 0.78, 0.16, ground, 10);
      cylinder(2.55, 1.3, 27, 0.14, 0.96, dark, 8);
      box(2.55, 1.98, 26.86, 0.72, 0.08, 0.34, dark, -0.12);
      box(2.55, 2.04, 26.86, 0.56, 0.025, 0.22, glow, -0.12);

      for (const [x, material] of [[-0.68, edge], [0.68, ground]] as const) {
        cylinder(x, 2.35, 27, 0.3, 1.05, material, 8);
        const head = add(new THREE.SphereGeometry(0.29, 12, 10), material, x, 3.08, 27);
        head.userData.isLandscapeStage = true;
      }
      route([[-0.3, 3.23, 27], [0, 3.62, 27], [0.3, 3.23, 27]], glow, 0.065);

      for (const x of [-5.15, 5.15]) {
        cylinder(x, 1.3, 27, 0.48, 0.62, ground, 8);
        for (const [dx, dy, dz, scale] of [
          [-0.28, 2.15, 0, 0.5],
          [0.22, 2.45, 0.08, 0.58],
          [0, 2.92, -0.08, 0.48],
        ] as const) {
          const leaf = add(new THREE.DodecahedronGeometry(scale, 0), glow, x + dx, dy, 27 + dz);
          leaf.userData.isLandscapeStage = true;
        }
      }

      for (let index = 0; index < 4; index++) {
        const x = index % 2 === 0 ? -0.32 : 0.32;
        box(x, 1.24, 32 - index * 1.1, 0.92, 0.12, 0.66, index % 2 === 0 ? ground : glow, x * 0.08);
      }
      route([[0, 1.2, 33], [0, 1.2, 30], [0, 1.2, 27.5]], edge, 0.1);

      const orb = add(new THREE.SphereGeometry(0.62, 12, 10), glow, 0, 4.45, 27);
      orb.userData.isLandscapeBeacon = true;
      for (const [radius, y] of [[0.92, 4.38], [1.2, 4.62]] as const) {
        const halo = add(new THREE.TorusGeometry(radius, 0.055, 7, 28), edge, 0, y, 27);
        halo.userData.isLandscapeRing = true;
      }
      break;
    }
    case "clinic": {
      const clinicWall = new THREE.MeshStandardMaterial({
        color: 0x6c8593,
        emissive: 0x142936,
        emissiveIntensity: 0.18,
        roughness: 0.9,
      });
      clinicWall.fog = false;
      const clinic = box(0, 3.45, 27, 8, 4.5, 2.3, clinicWall);
      clinic.userData.isLandscapeStage = true;
      box(0, 5.82, 27, 8.55, 0.3, 2.75, dark);

      const ridge = new THREE.MeshStandardMaterial({ color: 0x354f61, roughness: 0.96 });
      ridge.fog = false;
      for (const [x, y, z, scale] of [[-7.7, 2.55, 32, 1], [-6.1, 1.75, 34, 0.7], [7.6, 2.35, 33, 0.88]] as const) {
        const peak = add(new THREE.ConeGeometry(3.1 * scale, 4.8 * scale, 5), ridge, x, y, z);
        peak.scale.set(1.2, 1, 0.7);
        peak.userData.isLandscapeStage = true;
      }

      box(0, 3.38, 25.78, 1.25, 3.18, 0.18, dark);
      box(-0.12, 3.42, 25.66, 0.78, 2.64, 0.06, glow);
      box(0.58, 3.05, 25.6, 0.08, 0.12, 0.08, edge);
      for (const x of [-2.5, 2.5]) {
        box(x, 4.05, 25.78, 1.28, 1.24, 0.18, edge);
        box(x, 4.05, 25.65, 1.08, 1.02, 0.06, glow);
        box(x, 4.05, 25.59, 0.08, 1.02, 0.035, ground);
        box(x, 4.05, 25.59, 1.08, 0.07, 0.035, ground);
        box(x, 3.42, 25.55, 1.5, 0.12, 0.36, dark);
      }
      box(0, 4.98, 25.16, 2.55, 0.2, 0.92, edge);
      box(0, 6.35, 25.64, 0.55, 1.8, 0.18, edge);
      box(0, 6.35, 25.62, 1.8, 0.55, 0.2, edge);

      box(0, 1.45, 25.12, 2.6, 0.22, 1.16, ground);
      box(0, 1.24, 26.1, 3.2, 0.18, 0.82, dark);
      route([[0, 1.18, 33], [0, 1.2, 30], [0, 1.32, 27.8], [0, 1.48, 25.5]], edge, 0.12);

      for (const x of [-5.1, 5.1]) {
        box(x, 1.72, 27.1, 1.85, 0.18, 0.62, dark);
        box(x, 2.22, 27.38, 1.85, 0.68, 0.14, edge);
        for (const dx of [-0.68, 0.68]) box(x + dx, 1.42, 27.1, 0.12, 0.54, 0.12, ground);
      }

      const kiosk = box(4.5, 2.72, 25.42, 1.18, 2.12, 0.28, dark);
      kiosk.userData.isLandscapeStage = true;
      box(4.5, 2.92, 25.24, 0.92, 1.38, 0.06, glow);
      for (const [x, material] of [[4.28, edge], [4.72, ground]] as const) {
        const patient = add(new THREE.SphereGeometry(0.13, 8, 6), material, x, 3.28, 25.18);
        patient.userData.isLandscapeStage = true;
        box(x, 2.92, 25.18, 0.22, 0.34, 0.07, material);
      }
      route([[4.5, 4.12, 25.2], [3.6, 4.75, 26], [2.5, 5.2, 27]], glow, 0.07);

      const antenna = cylinder(2.8, 6.02, 27.5, 0.09, 0.62, dark, 8);
      antenna.userData.isLandscapeStage = true;
      const dish = add(new THREE.TorusGeometry(0.58, 0.08, 8, 24), edge, 2.8, 6.38, 27.5);
      dish.rotation.y = Math.PI / 2;
      dish.userData.isLandscapeBeacon = true;
      for (const [radius, y] of [[0.58, 6.15], [0.82, 6.1]] as const) {
        const signal = add(new THREE.TorusGeometry(radius, 0.045, 7, 24, Math.PI), glow, 2.8, y, 27.5);
        signal.rotation.y = Math.PI / 2;
        signal.userData.isLandscapeRing = true;
      }
      break;
    }
    case "telemedicine": {
      const consultationFloor = cylinder(0, 0.98, 27, 7.1, 0.36, dark, 12);
      consultationFloor.userData.isLandscapeStage = true;
      arch(9.4, 6.5, ground, 27);
      box(0, 4.5, 26.58, 4.8, 3.2, 0.16, dark);
      box(0, 4.55, 26.45, 4.18, 2.6, 0.1, glow);

      for (const [x, material] of [[-0.88, edge], [0.88, ground]] as const) {
        const clinicianHead = add(new THREE.SphereGeometry(0.27, 10, 8), material, x, 4.98, 26.34);
        clinicianHead.userData.isLandscapeStage = true;
        box(x, 4.3, 26.34, 0.68, 0.72, 0.1, material);
      }
      box(0, 4.3, 26.32, 0.12, 0.68, 0.08, edge);
      box(0, 4.3, 26.32, 0.56, 0.12, 0.08, edge);

      box(-3.45, 1.92, 27, 2.55, 0.28, 0.88, ground);
      box(-3.45, 2.48, 27.34, 2.55, 0.82, 0.2, edge);
      for (const x of [-4.35, -2.55]) {
        box(x, 1.55, 26.72, 0.14, 0.72, 0.14, dark);
        box(x, 1.55, 27.28, 0.14, 0.72, 0.14, dark);
      }
      const resident = cylinder(-3.45, 2.63, 26.82, 0.3, 0.82, ground, 8);
      resident.userData.isLandscapeStage = true;
      const residentHead = add(new THREE.SphereGeometry(0.27, 10, 8), ground, -3.45, 3.26, 26.82);
      residentHead.userData.isLandscapeStage = true;

      cylinder(3.15, 1.82, 27, 0.76, 0.16, dark, 10);
      cylinder(3.15, 1.32, 27, 0.12, 0.94, dark, 8);
      box(3.15, 2.3, 26.72, 0.5, 0.86, 0.1, edge);
      box(3.15, 2.3, 26.65, 0.34, 0.68, 0.04, glow);
      const privacyLock = add(new THREE.TorusGeometry(0.19, 0.055, 7, 18, Math.PI), edge, 3.15, 2.48, 26.6);
      privacyLock.userData.isLandscapeStage = true;
      box(3.15, 2.24, 26.6, 0.34, 0.22, 0.08, edge);

      for (const x of [-4.2, 4.2]) {
        const node = add(new THREE.SphereGeometry(0.55, 12, 10), edge, x, 2.7, 27);
        node.userData.isLandscapeBeacon = true;
      }
      route([[-4.2, 2.9, 27], [-3.45, 3.35, 27], [-1.6, 3.6, 27], [0, 3.2, 27], [1.7, 3.6, 27], [3.15, 3.4, 27], [4.2, 2.9, 27]], edge, 0.1);
      break;
    }
    case "community": {
      for (const [x, height] of [[-4, 2.8], [-1.4, 4.1], [1.5, 3.1], [4, 4.5]] as const) {
        box(x, 1.3 + height / 2, 27, 1.8, height, 1.8, ground);
        const roof = add(new THREE.ConeGeometry(1.4, 1.2, 4), edge, x, 2 + height, 27);
        roof.rotation.y = Math.PI / 4;
        roof.userData.isLandscapeStage = true;
      }
      const hub = add(new THREE.SphereGeometry(0.58, 12, 10), glow, 0, 2.7, 26);
      hub.userData.isLandscapeBeacon = true;
      for (const x of [-4, -1.4, 1.5, 4]) route([[x, 2.4, 27], [x / 2, 2.15, 26], [0, 2.7, 26]], edge, 0.075);
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
    case "community-network": {
      cylinder(0, 0.98, 27, 6.1, 0.34, dark, 12);
      for (const x of [-4, 4]) {
        box(x, 2.55, 27, 2.3, 2.55, 1.8, ground);
        box(x, 3.88, 27, 2.48, 0.18, 1.96, edge);
        box(x - 0.48, 2.55, 26.06, 0.52, 0.78, 0.12, glow);
        box(x + 0.48, 2.55, 26.06, 0.52, 0.78, 0.12, glow);
      }
      box(-4, 4.55, 26.02, 0.28, 1.18, 0.14, edge);
      box(-4, 4.55, 26.02, 1.18, 0.28, 0.14, edge);
      for (const x of [-4, 0, 4]) {
        const node = add(new THREE.SphereGeometry(0.34, 12, 10), glow, x, x === 0 ? 4.1 : 4.45, 27);
        node.userData.isLandscapeBeacon = true;
      }
      const device = box(0, 2.15, 26.88, 1.35, 0.18, 0.86, dark);
      device.rotation.z = -0.08;
      box(0, 2.72, 26.42, 0.64, 0.92, 0.12, edge, -0.08);
      const screen = box(0, 2.75, 26.34, 0.48, 0.68, 0.06, glow, -0.08);
      screen.userData.isLandscapeStage = true;
      route([[-4, 4.45, 26.65], [-2.35, 4.85, 26.25], [0, 4.15, 26.25], [2.35, 4.85, 26.25], [4, 4.45, 26.65]], edge, 0.09);
      route([[-4, 1.45, 27], [-2.2, 1.4, 25.9], [0, 1.5, 25.6], [2.2, 1.4, 25.9], [4, 1.45, 27]], glow, 0.08);
      ring(5.35, 1.3, 0.16);
      const networkLight = new THREE.PointLight(0xa9e6ff, 0.9, 16, 2);
      networkLight.position.set(0, 5.2, 25.4);
      root.add(networkLight);
      break;
    }
    case "timeline": {
      const stops = [-4, 0, 4] as const;
      for (const [index, x] of stops.entries()) {
        const height = index === 1 ? 3.75 : 3.25;
        const centerY = 3.55;
        cylinder(x, 1.28, 27, 1.22, 0.34, dark, 8);
        box(x, centerY, 27, 2.55, height, 0.48, dark);
        box(x, centerY, 26.7, 2.2, height - 0.32, 0.1, ground);
        box(x - 1.14, centerY, 26.58, 0.12, height + 0.08, 0.1, edge);
        box(x + 1.14, centerY, 26.58, 0.12, height + 0.08, 0.1, edge);
        box(x, centerY + height / 2, 26.58, 2.38, 0.12, 0.1, edge);
        box(x, centerY - height / 2, 26.58, 2.38, 0.12, 0.1, edge);
        box(x, 2.55, 26.55, 1.24, 0.075, 0.055, edge);
        box(x, 2.33, 26.55, 0.92, 0.075, 0.055, edge);
      }

      route([[stops[0] - 0.84, 3.7, 26.34], [stops[0] + 0.84, 3.7, 26.34]], edge, 0.1);
      for (const x of [-4.84, -4.28, -3.72, -3.16]) {
        const stop = add(new THREE.SphereGeometry(0.16, 10, 8), glow, x, 3.7, 26.3);
        stop.userData.isLandscapeBeacon = true;
      }
      const routeArrow = add(new THREE.ConeGeometry(0.2, 0.42, 4), edge, stops[0] + 0.98, 3.7, 26.3);
      routeArrow.rotation.z = -Math.PI / 2;
      routeArrow.userData.isLandscapeStage = true;

      const sea = new THREE.MeshStandardMaterial({ color: 0x426e78, emissive: 0x102a32, emissiveIntensity: 0.22, roughness: 0.62, metalness: 0.12 });
      const water = add(new THREE.CylinderGeometry(2.7, 2.9, 0.22, 12), sea, 0, 1.48, 25.2);
      water.scale.z = 0.58;
      water.userData.isLandscapeStage = true;

      const hullShape = new THREE.Shape();
      hullShape.moveTo(-1.7, 0.18);
      hullShape.lineTo(-1.28, -0.38);
      hullShape.lineTo(1.2, -0.38);
      hullShape.lineTo(1.7, 0.18);
      hullShape.lineTo(0.9, 0.34);
      hullShape.lineTo(-1.15, 0.34);
      hullShape.closePath();
      const hullMaterial = new THREE.MeshStandardMaterial({ color: 0x704b31, roughness: 0.82, metalness: 0.04 });
      const hull = add(new THREE.ExtrudeGeometry(hullShape, { depth: 0.62, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.06, bevelThickness: 0.05 }), hullMaterial, 0, 1.94, 24.9);
      hull.userData.isLandscapeStage = true;
      route([[-1.48, 2.13, 24.83], [0, 2.23, 24.83], [1.48, 2.13, 24.83]], edge, 0.07);

      const mast = cylinder(0, 3.52, 25.05, 0.075, 2.95, dark, 8);
      mast.userData.isLandscapeStage = true;
      const sailMaterial = new THREE.MeshStandardMaterial({ color: 0xf2dfb8, roughness: 0.8, side: THREE.DoubleSide });
      const mainSailShape = new THREE.Shape();
      mainSailShape.moveTo(-0.08, 0);
      mainSailShape.lineTo(-0.08, 2.45);
      mainSailShape.lineTo(-1.62, 0.3);
      mainSailShape.closePath();
      const mainSail = add(new THREE.ShapeGeometry(mainSailShape), sailMaterial, 0, 2.34, 24.82);
      mainSail.userData.isLandscapeStage = true;
      const foreSailShape = new THREE.Shape();
      foreSailShape.moveTo(0.08, 0.08);
      foreSailShape.lineTo(0.08, 1.62);
      foreSailShape.lineTo(1.08, 0.34);
      foreSailShape.closePath();
      const foreSail = add(new THREE.ShapeGeometry(foreSailShape), edge, 0, 2.42, 24.8);
      foreSail.userData.isLandscapeStage = true;
      route([[-1.62, 2.2, 25], [0, 5.05, 25], [1.12, 2.5, 25]], glow, 0.045);
      for (const [z, shift] of [[24.3, 0], [25.8, 0.28], [26.55, -0.2]] as const) {
        route([[-2.1, 1.61, z], [-0.8, 1.68 + shift, z - 0.08], [0.7, 1.62, z], [2, 1.7 + shift, z + 0.08]], glow, 0.045);
      }
      const voyageLight = new THREE.PointLight(0xffd9a6, 0.9, 13, 2);
      voyageLight.position.set(0, 5.2, 24.9);
      root.add(voyageLight);
      route([[-5.3, 1.52, 27], [-4, 1.52, 26.35], [0, 1.52, 26.35], [4, 1.52, 26.35], [5.3, 1.52, 27]], edge, 0.12);
      break;
    }
    case "perseverance": {
      for (let i = 0; i < 6; i++) box(-4.2 + i * 1.45, 1.15 + i * 0.53, 27, 1.55, 0.28, 2.1, i === 5 ? edge : ground);
      const peak = add(new THREE.OctahedronGeometry(0.9, 1), glow, 3.3, 5.1, 27);
      peak.userData.isLandscapeBeacon = true;
      route([[-4.2, 1.45, 26.7], [-1.7, 2, 26.7], [0.2, 3.1, 26.7], [3.3, 5.1, 26.7]], edge, 0.09);
      break;
    }
    case "route-evidence": {
      cylinder(0, 1.2, 27, 5.2, 0.32, dark, 12);
      box(0, 3.45, 27, 7.8, 3.8, 0.3, ground);
      box(0, 3.45, 26.78, 7.1, 3.1, 0.08, dark);
      route([[-3.1, 2.6, 26.62], [-1.7, 4.4, 26.62], [0.4, 3.3, 26.62], [2.8, 4.55, 26.62]], edge, 0.09);
      for (const [index, x] of [-3.1, -1.7, 0.4, 2.8].entries()) {
        const marker = add(new THREE.OctahedronGeometry(0.3, 0), index % 2 === 0 ? glow : edge, x, index % 2 === 0 ? 2.6 : 4.4, 26.48);
        marker.userData.isLandscapeBeacon = true;
      }
      for (const x of [-1.75, 1.75]) {
        box(x, 3.18, 26.45, 2.05, 1.48, 0.1, x < 0 ? glow : edge);
        box(x, 3.18, 26.36, 1.58, 1.02, 0.06, dark);
      }
      ring(4.7, 1.05, 0.1);
      break;
    }
    case "legacy": {
      for (let i = 0; i < 3; i++) {
        const x = (i - 1) * 3.2;
        arch(2.4, 4.6 + i * 1.1, i === 2 ? edge : ground, 27, x);
        const light = add(new THREE.SphereGeometry(0.34 + i * 0.08, 10, 8), glow, x, 5 + i, 26.55);
        light.userData.isLandscapeBeacon = true;
      }
      route([[-4.6, 1.4, 27], [0, 1.4, 27], [4.6, 1.4, 27]], edge, 0.13);
      break;
    }
    case "archive-crossroads": {
      cylinder(0, 1.05, 27, 5.8, 0.34, dark, 12);
      for (const x of [-3.15, 3.15]) {
        box(x, 3.65, 27, 2.3, 3.55, 0.42, ground);
        box(x, 3.65, 26.72, 1.78, 2.98, 0.08, dark);
        arch(1.35, 3.5, x < 0 ? glow : edge, 26.58, x);
      }
      const crossing = box(0, 2.15, 26.35, 4.1, 0.3, 1.05, edge);
      crossing.userData.isLandscapeRoute = true;
      const center = add(new THREE.OctahedronGeometry(0.62, 1), glow, 0, 3.25, 26.18);
      center.userData.isLandscapeBeacon = true;
      route([[-4.4, 1.45, 27], [-2.5, 1.72, 26.2], [0, 1.9, 26.2], [2.5, 1.72, 26.2], [4.4, 1.45, 27]], edge, 0.1);
      ring(5.1, 1.1, 0.12);
      break;
    }
    case "spotlight": {
      cylinder(0, 1.2, 27, 4.4, 0.5, dark, 12);
      cylinder(0, 1.55, 27, 2.3, 0.22, edge, 12);
      for (const x of [-4.2, 4.2]) {
        const beam = add(new THREE.ConeGeometry(1.35, 6.8, 12, 1, true), glow, x, 5.1, 27);
        beam.rotation.z = x < 0 ? -0.22 : 0.22;
        beam.userData.isLandscapeStage = true;
      }
      const star = add(new THREE.OctahedronGeometry(0.62, 1), edge, 0, 3.25, 26.4);
      star.userData.isLandscapeBeacon = true;
      break;
    }
    case "humanitarian": {
      arch(6.2, 5.6, edge, 27);
      box(0, 2.15, 27, 4.2, 0.42, 2.2, ground);
      for (const x of [-1.25, 0, 1.25]) {
        box(x, 2.7, 26.85, 0.78, 0.62, 0.6, glow);
        const parcel = add(new THREE.SphereGeometry(0.27, 10, 8), edge, x, 3.35, 26.82);
        parcel.userData.isLandscapeBeacon = true;
      }
      route([[-4.5, 1.25, 27], [-2.4, 1.65, 26.3], [0, 1.85, 26.3], [2.4, 1.65, 26.3], [4.5, 1.25, 27]], edge, 0.1);
      break;
    }
    case "lasting-service": {
      cylinder(0, 1.4, 27, 3.2, 0.36, ground, 12);
      cylinder(0, 4.25, 27, 0.32, 5.4, dark, 8);
      for (const [x, y] of [[-1.1, 5.5], [0, 6.1], [1.1, 5.5], [-0.6, 7], [0.7, 7]] as const) {
        const crown = add(new THREE.SphereGeometry(1.05, 10, 8), glow, x, y, 27);
        crown.userData.isLandscapeStage = true;
      }
      for (const x of [-3.5, 3.5]) {
        const seed = add(new THREE.OctahedronGeometry(0.42, 0), edge, x, 2.1, 27);
        seed.userData.isLandscapeBeacon = true;
      }
      break;
    }
    case "community-witness": {
      cylinder(0, 1.18, 27, 5.7, 0.34, dark, 12);
      cylinder(0, 1.56, 27, 3.3, 0.18, edge, 12);
      for (const [x, z, rotation] of [[-2.2, 28.2, -0.3], [0, 28.8, 0], [2.2, 28.2, 0.3]] as const) {
        const seat = box(x, 1.95, z, 1.6, 0.2, 0.72, ground, rotation);
        seat.userData.isLandscapeStage = true;
        box(x, 2.34, z - 0.34, 1.6, 0.62, 0.16, edge, rotation);
      }
      const table = cylinder(0, 2.12, 26.15, 1.08, 0.2, ground, 10);
      table.userData.isLandscapeStage = true;
      for (const x of [-3.5, 0, 3.5]) {
        const voice = add(new THREE.SphereGeometry(0.3, 10, 8), glow, x, 3.15, 26.55);
        voice.userData.isLandscapeBeacon = true;
      }
      route([[-3.7, 2.75, 26.6], [-1.8, 3.3, 26.1], [0, 2.9, 25.95], [1.8, 3.3, 26.1], [3.7, 2.75, 26.6]], edge, 0.075);
      ring(4.95, 1.08, 0.12);
      break;
    }
    case "fleet": {
      const hull = box(0, 2.4, 27, 8.8, 1.15, 2.4, dark);
      hull.rotation.z = Math.PI;
      for (const x of [-2.6, 0, 2.6]) {
        cylinder(x, 5.1, 27, 0.1, 5.1, edge, 8);
        const sail = add(new THREE.ConeGeometry(1.65, 3.2, 3), x === 0 ? glow : ground, x, 5.1, 26.7);
        sail.rotation.z = Math.PI / 2;
        sail.rotation.y = Math.PI / 2;
        sail.userData.isLandscapeStage = true;
      }
      route([[-5.5, 1.35, 27], [-2.8, 1.1, 26], [0, 1.1, 27], [2.8, 1.1, 28], [5.5, 1.35, 27]], edge, 0.16);
      break;
    }
    case "peace-contact": {
      for (const x of [-4.5, 4.5]) {
        box(x, 2.2, 27, 2.2, 2.1, 2.2, ground);
        box(x, 4.1, 26.55, 1.65, 1.1, 0.8, glow);
      }
      const bridge = box(0, 1.7, 27, 6.8, 0.34, 1.3, edge);
      bridge.userData.isLandscapeRoute = true;
      for (const x of [-1.8, 0, 1.8]) book(x, 2.35, 26.25, Math.round(x + 2));
      ring(5.5, 1.2, 0.12);
      break;
    }
    case "chart-room": {
      cylinder(0, 1.25, 27, 5.7, 0.42, dark, 16);
      cylinder(0, 1.52, 27, 4.25, 0.14, ground, 16);
      const chart = cylinder(0, 1.64, 27, 3.72, 0.12, edge, 16);
      chart.scale.z = 0.68;
      chart.userData.isLandscapeStage = true;
      route([[-3.1, 1.82, 27], [-1.8, 2.05, 26.5], [0, 1.9, 27.1], [1.55, 2.15, 26.4], [3.1, 1.82, 27]], glow, 0.065);
      route([[-2.65, 1.84, 27.6], [-1.4, 1.96, 27.2], [0.2, 1.86, 26.7], [1.95, 1.98, 27.35], [2.8, 1.84, 27.6]], edge, 0.065);
      for (const [x, z] of [[-3.1, 27], [-1.8, 26.5], [0, 27.1], [1.55, 26.4], [3.1, 27]] as const) {
        const port = add(new THREE.OctahedronGeometry(0.22, 0), glow, x, 2.03, z);
        port.userData.isLandscapeBeacon = true;
      }
      const axis = cylinder(0, 3.25, 26.15, 0.12, 3.2, dark, 8);
      axis.userData.isLandscapeStage = true;
      const compass = add(new THREE.OctahedronGeometry(0.48, 1), edge, 0, 4.98, 26.15);
      compass.userData.isLandscapeBeacon = true;
      ring(5.15, 1.12, 0.1);
      break;
    }
    case "exchange-harbor": {
      cylinder(0, 1.05, 27, 6.2, 0.36, dark, 14);
      for (const x of [-4, 4]) {
        box(x, 1.62, 27, 2.1, 0.42, 5.4, ground);
        for (const z of [25.2, 27, 28.8]) cylinder(x, 1.2, z, 0.17, 1.1, edge, 8);
        box(x, 2.15, 26.2, 1.25, 0.86, 1.1, x < 0 ? glow : edge);
        box(x, 2.15, 27.55, 1.25, 0.86, 1.1, ground);
      }
      const crossing = box(0, 1.78, 27, 5.4, 0.28, 1.25, edge);
      crossing.userData.isLandscapeRoute = true;
      for (const [x, y] of [[-1.55, 2.52], [0, 3.15], [1.55, 2.52]] as const) {
        const exchange = add(new THREE.OctahedronGeometry(0.34, 0), glow, x, y, 26.35);
        exchange.userData.isLandscapeBeacon = true;
      }
      route([[-4.8, 1.42, 27], [-2.5, 1.72, 26.2], [0, 2.1, 26.2], [2.5, 1.72, 26.2], [4.8, 1.42, 27]], glow, 0.085);
      ring(5.55, 1.18, 0.14);
      break;
    }
    case "itinerary": {
      const mapPaper = new THREE.MeshStandardMaterial({ color: 0xe4d3ad, emissive: 0x332f22, emissiveIntensity: 0.28, roughness: 0.96 });
      const mapInk = new THREE.MeshStandardMaterial({ color: 0x425b4c, emissive: 0x18251c, emissiveIntensity: 0.12, roughness: 0.8 });
      box(0, 3.5, 27, 9.4, 4.6, 0.42, dark);
      box(0, 3.5, 26.7, 8.7, 3.9, 0.1, mapPaper);
      route([[-3.4, 2.4, 26.54], [-1.9, 4.2, 26.54], [0.4, 3.2, 26.54], [2.7, 4.5, 26.54], [3.6, 2.5, 26.54]], mapInk, 0.1);
      for (const [x, y] of [[-3.4, 2.4], [-1.9, 4.2], [0.4, 3.2], [2.7, 4.5], [3.6, 2.5]] as const) {
        const pin = add(new THREE.SphereGeometry(0.22, 10, 8), glow, x, y, 26.45);
        pin.userData.isLandscapeBeacon = true;
      }

      const trailBed = new THREE.MeshStandardMaterial({ color: 0x665b44, roughness: 0.96 });
      route([[-4.8, 1.48, 25], [-2.8, 1.5, 24.2], [-0.2, 1.52, 24.6], [2.2, 1.52, 25.55], [4.5, 1.55, 25.35]], trailBed, 0.18);
      route([[-0.2, 1.52, 24.6], [-1.6, 1.5, 26.1], [-2.9, 1.52, 27.8]], edge, 0.085);

      box(-4.35, 1.95, 24.9, 1.55, 1.12, 0.95, dark);
      box(-4.35, 2.56, 24.9, 1.62, 0.18, 1.02, edge);
      for (const x of [-4.78, -3.92]) {
        const wheel = add(new THREE.SphereGeometry(0.16, 10, 8), ground, x, 1.35, 24.84);
        wheel.userData.isLandscapeStage = true;
        cylinder(x, 2.83, 24.9, 0.055, 0.55, ground, 7);
      }
      box(-4.35, 3.12, 24.9, 0.92, 0.11, 0.12, ground);

      cylinder(2.55, 2.55, 24.95, 0.12, 2.75, dark, 8);
      box(2.05, 3.48, 24.95, 1.62, 0.35, 0.18, edge, -0.08);
      box(3.03, 4.02, 24.95, 1.5, 0.35, 0.18, ground, 0.08);
      const forkMarker = add(new THREE.OctahedronGeometry(0.26, 0), glow, 2.55, 4.35, 24.95);
      forkMarker.userData.isLandscapeBeacon = true;

      const shopX = 6.85;
      box(shopX, 2.8, 26.45, 2.3, 2.45, 1.5, dark);
      box(shopX, 2.92, 25.66, 1.9, 1.55, 0.12, mapPaper);
      box(shopX, 4.12, 25.72, 2.45, 0.24, 1.68, edge);
      box(shopX, 2.1, 25.42, 2.2, 0.38, 0.78, ground);
      for (const x of [shopX - 1.02, shopX + 1.02]) box(x, 2.92, 25.54, 0.12, 1.65, 0.14, ground);
      for (const x of [shopX - 0.5, shopX, shopX + 0.5]) box(x, 2.42, 25.3, 0.24, 0.28, 0.24, glow);
      const shopLamp = add(new THREE.SphereGeometry(0.2, 10, 8), glow, shopX, 4.42, 25.56);
      shopLamp.userData.isLandscapeBeacon = true;

      const traveler = add(new THREE.CylinderGeometry(0.27, 0.38, 0.92, 8), edge, 3.95, 2.25, 25.1);
      traveler.userData.isLandscapeStage = true;
      const travelerHead = add(new THREE.SphereGeometry(0.29, 10, 8), ground, 3.95, 2.95, 25.1);
      travelerHead.userData.isLandscapeStage = true;
      const owner = add(new THREE.CylinderGeometry(0.27, 0.38, 0.92, 8), dark, shopX + 0.22, 2.92, 26.25);
      owner.userData.isLandscapeStage = true;
      const ownerHead = add(new THREE.SphereGeometry(0.29, 10, 8), ground, shopX + 0.22, 3.62, 26.25);
      ownerHead.userData.isLandscapeStage = true;
      route([[4.12, 2.72, 25.15], [5.1, 3.05, 25.15], [shopX - 0.72, 3.1, 25.15]], glow, 0.055);
      break;
    }
    case "detour": {
      for (const [x, z, size] of [[-3.8, 27, 1.2], [-2.5, 28.1, 1.5], [2.8, 26.6, 1.2], [4, 27.4, 0.95]] as const) {
        const rock = add(new THREE.DodecahedronGeometry(size, 0), ground, x, 1.15, z);
        rock.userData.isLandscapeStage = true;
      }
      route([[-5.1, 1.35, 29], [-2.5, 1.5, 29.5], [0, 1.45, 28], [2.1, 1.4, 25.3], [5, 1.3, 25.6]], edge, 0.2);
      for (const x of [-2.4, 2.1]) {
        const waymark = add(new THREE.OctahedronGeometry(0.46, 0), glow, x, 2.4, 27.2);
        waymark.userData.isLandscapeBeacon = true;
      }
      break;
    }
    case "market-encounter": {
      cylinder(0, 1.08, 27, 5.8, 0.3, dark, 12);
      for (const [index, x] of [-3.35, 3.35].entries()) {
        box(x, 3.05, 27, 2.8, 0.18, 2.25, index === 0 ? edge : ground);
        for (const dx of [-1.05, 1.05]) cylinder(x + dx, 2.12, 27, 0.08, 1.85, dark, 7);
        box(x, 2.55, 27, 2.38, 0.72, 1.8, index === 0 ? ground : edge);
        for (const z of [26.5, 27.5]) box(x, 1.82, z, 0.48, 0.36, 0.42, glow);
      }
      for (const [x, material] of [[-0.95, edge], [0.95, glow]] as const) {
        const traveler = add(new THREE.CylinderGeometry(0.24, 0.33, 0.88, 8), material, x, 2.12, 25.7);
        traveler.userData.isLandscapeStage = true;
        const head = add(new THREE.SphereGeometry(0.25, 10, 8), ground, x, 2.78, 25.7);
        head.userData.isLandscapeStage = true;
      }
      route([[-4.8, 1.38, 29], [-2.4, 1.46, 28.2], [0, 1.55, 27.6], [2.4, 1.46, 28.2], [4.8, 1.38, 29]], glow, 0.08);
      ring(5.1, 1.08, 0.11);
      break;
    }
    case "hostel": {
      box(0, 3.2, 27, 7.6, 3.8, 2, ground);
      box(0, 3, 25.9, 1.55, 2.8, 0.16, dark);
      for (const x of [-2.3, 2.3]) box(x, 4.05, 25.88, 1.12, 0.96, 0.15, glow);
      const lamp = add(new THREE.SphereGeometry(0.42, 10, 8), edge, 0, 5.55, 25.75);
      lamp.userData.isLandscapeBeacon = true;
      route([[-4.3, 1.25, 29], [-2.2, 1.4, 27.6], [0, 1.45, 26], [2.4, 1.35, 25]], edge, 0.14);
      break;
    }
    case "open-route": {
      arch(8.4, 5.4, ground, 27);
      route([[0, 1.35, 30], [0, 1.55, 28], [-2.5, 2.1, 26], [-4.1, 2.55, 24.8]], edge, 0.14);
      route([[0, 1.35, 30], [0, 1.55, 28], [2.5, 2.1, 26], [4.1, 2.55, 24.8]], glow, 0.14);
      for (const x of [-4.1, 4.1]) {
        const end = add(new THREE.SphereGeometry(0.46, 10, 8), edge, x, 2.55, 24.8);
        end.userData.isLandscapeBeacon = true;
      }
      break;
    }
    case "confidence": {
      for (let i = 0; i < 4; i++) box(0, 1.05 + i * 0.47, 28 - i * 0.8, 7.6 - i * 1.25, 0.28, 1.2, i === 3 ? edge : ground);
      box(0, 3.45, 24.65, 4.6, 0.28, 1.35, dark);
      for (const x of [-1.9, 1.9]) box(x, 3.95, 24.65, 0.22, 0.9, 0.22, edge);
      const horizon = add(new THREE.SphereGeometry(0.56, 12, 10), glow, 0, 5.25, 24.65);
      horizon.userData.isLandscapeBeacon = true;
      break;
    }
    case "reflection-garden": {
      cylinder(0, 1.05, 27, 6.1, 0.34, dark, 14);
      for (let i = 0; i < 4; i++) box(0, 1.38 + i * 0.42, 29 - i * 1.05, 8.2 - i * 1.25, 0.24, 0.82, i % 2 === 0 ? ground : edge);
      const pool = cylinder(0, 2.05, 24.8, 2.35, 0.16, glow, 16);
      pool.scale.z = 0.55;
      for (const x of [-3.45, 3.45]) {
        box(x, 2.1, 25.6, 1.7, 0.2, 0.58, ground);
        box(x, 2.62, 25.88, 1.7, 0.72, 0.16, edge);
      }
      const compass = add(new THREE.OctahedronGeometry(0.48, 1), glow, 0, 4.05, 24.55);
      compass.userData.isLandscapeBeacon = true;
      route([[-4.7, 1.45, 29.4], [-2.4, 1.65, 27.8], [0, 1.86, 26.5], [2.4, 1.65, 27.8], [4.7, 1.45, 29.4]], edge, 0.075);
      ring(5.3, 1.1, 0.12);
      break;
    }
    case "rain-shelter": {
      cylinder(0, 1.04, 27, 5.7, 0.34, dark, 12);
      for (const x of [-3.2, 3.2]) {
        cylinder(x, 2.75, 26.4, 0.1, 3.15, edge, 8);
        cylinder(x, 2.75, 28.1, 0.1, 3.15, edge, 8);
      }
      box(0, 4.48, 27.25, 7.25, 0.24, 3.6, ground, -0.08);
      box(0, 4.63, 27.25, 7.25, 0.12, 3.6, edge, -0.08);
      box(0, 1.95, 27.45, 3.6, 0.2, 0.72, dark);
      box(0, 2.42, 27.78, 3.6, 0.68, 0.16, glow);
      for (const x of [-4.1, -2.05, 0, 2.05, 4.1]) {
        route([[x, 3.35, 24.8], [x + 0.35, 2.85, 24.8]], edge, 0.045);
      }
      route([[-4.9, 1.38, 29.4], [-2.3, 1.5, 28.8], [0, 1.55, 28.1], [2.4, 1.5, 28.8], [4.9, 1.38, 29.4]], glow, 0.08);
      ring(5.15, 1.07, 0.1);
      break;
    }
    case "rail-platform": {
      for (const z of [25.6, 28.5]) box(0, 1.3, z, 10.5, 0.32, 1.3, ground);
      for (const x of [-4.6, 4.6]) {
        const signal = cylinder(x, 4.15, 27, 0.18, 5.7, dark, 8);
        const lamp = add(new THREE.SphereGeometry(0.38, 10, 8), edge, x, 6.55, 26.78);
        lamp.userData.isLandscapeBeacon = true;
        signal.userData.isLandscapeStage = true;
      }
      arch(8.7, 5.8, edge, 27);
      route([[-5.5, 1.12, 25.3], [0, 1.12, 25.3], [5.5, 1.12, 25.3]], dark, 0.08);
      break;
    }
    case "rail-car": {
      box(0, 3.15, 27, 9.6, 3.6, 2.6, dark);
      box(0, 5.05, 27, 8.8, 0.4, 2.3, edge);
      for (const x of [-3.5, -1.2, 1.2, 3.5]) box(x, 3.8, 25.63, 1.65, 1.35, 0.12, glow);
      for (const x of [-3.5, 3.5]) {
        const wheel = add(new THREE.SphereGeometry(0.52, 12, 10), ground, x, 1.15, 26.1);
        wheel.userData.isLandscapeStage = true;
      }
      route([[-5.4, 0.92, 27], [0, 0.92, 27], [5.4, 0.92, 27]], edge, 0.14);
      break;
    }
    case "landscape-window": {
      cylinder(0, 1.05, 27, 5.9, 0.34, dark, 14);
      box(0, 3.62, 27, 8.5, 4.8, 0.42, ground);
      box(0, 3.64, 26.74, 7.75, 4.05, 0.08, dark);
      arch(6.9, 4.2, edge, 26.58);
      for (const [x, width, height, material] of [[-2.9, 2.3, 2.1, glow], [-0.9, 2.5, 3.15, edge], [1.35, 2.9, 2.45, ground], [3.05, 1.65, 1.75, glow]] as const) {
        const hill = add(new THREE.ConeGeometry(width, height, 5), material, x, 1.78 + height / 2, 26.48);
        hill.userData.isLandscapeStage = true;
      }
      route([[-3.6, 1.7, 26.3], [-1.5, 2.02, 26.3], [0.4, 1.78, 26.3], [3.45, 2.08, 26.3]], edge, 0.075);
      const sun = add(new THREE.SphereGeometry(0.4, 12, 10), glow, 2.6, 4.35, 26.25);
      sun.userData.isLandscapeBeacon = true;
      ring(5.2, 1.12, 0.1);
      break;
    }
    case "route-network": {
      cylinder(0, 1.06, 27, 6.2, 0.34, dark, 14);
      for (const [x, z, width, height] of [[-4, 28.3, 2.1, 1.45], [0, 26.1, 2.7, 1.95], [4, 28.3, 2.1, 1.45]] as const) {
        const city = box(x, 2.05, z, width, height, 1.15, x === 0 ? ground : edge);
        city.userData.isLandscapeStage = true;
        const marker = add(new THREE.OctahedronGeometry(x === 0 ? 0.38 : 0.28, 0), glow, x, 3.1 + height / 2, z);
        marker.userData.isLandscapeBeacon = true;
      }
      route([[-4.2, 2.45, 28.05], [-2.2, 2.15, 27.25], [0, 2.12, 26.75], [2.2, 2.15, 27.25], [4.2, 2.45, 28.05]], glow, 0.1);
      route([[-4.2, 1.18, 29], [-2.1, 1.2, 27], [0, 1.22, 26], [2.1, 1.2, 27], [4.2, 1.18, 29]], edge, 0.085);
      arch(7.8, 5.1, edge, 27);
      ring(5.55, 1.16, 0.13);
      break;
    }
    case "career": {
      cylinder(0, 1.15, 27, 6.15, 0.3, dark, 12);
      cylinder(0, 2.15, 27, 3.25, 0.42, ground, 12);
      arch(10.4, 7.1, edge, 30.2);
      box(0, 4.75, 30.52, 6.8, 3.5, 0.3, dark);
      for (const x of [-2.15, 0, 2.15]) {
        box(x, 4.75, 30.32, 1.72, 2.88, 0.12, x === 0 ? glow : ground);
        box(x, 6.18, 30.21, 0.88, 0.12, 0.08, edge);
        box(x, 3.55, 30.21, 1.1, 0.1, 0.08, edge);
      }
      for (const x of [-3.6, 0, 3.6]) {
        cylinder(x, 5.95, 27.7, 0.07, 1.55, dark, 6);
        const lamp = add(new THREE.SphereGeometry(0.3, 10, 8), glow, x, 5.05, 27.7);
        lamp.userData.isLandscapeBeacon = true;
      }
      for (const angle of [0, Math.PI / 3, (Math.PI * 2) / 3, Math.PI, (Math.PI * 4) / 3, (Math.PI * 5) / 3]) {
        const x = Math.cos(angle) * 4.5;
        const z = 27 + Math.sin(angle) * 2.4;
        const chair = box(x, 1.52, z, 1.1, 0.28, 0.95, dark, angle + Math.PI / 2);
        chair.userData.isLandscapeStage = true;
        const backrest = box(x + Math.cos(angle) * 0.42, 2.02, z + Math.sin(angle) * 0.32, 1.02, 0.82, 0.2, ground, angle + Math.PI / 2);
        backrest.userData.isLandscapeStage = true;
        route([[x * 0.72, 2.2, 27 + (z - 27) * 0.7], [0, 2.25, 27]], edge, 0.055);
      }
      // 让“职业讨论厅”一眼可读：三位静态低多边形参与者围坐讨论，避免只剩空椅和抽象面板。
      const skin = new THREE.MeshStandardMaterial({ color: 0xd5a477, roughness: 0.86 });
      const coats = [
        new THREE.MeshStandardMaterial({ color: 0x7d573d, roughness: 0.9 }),
        new THREE.MeshStandardMaterial({ color: 0x496c72, roughness: 0.88 }),
        new THREE.MeshStandardMaterial({ color: 0x8a6844, roughness: 0.9 }),
      ];
      const participants = [
        { x: 4.5, z: 27, coat: coats[0], facing: Math.PI },
        { x: -2.25, z: 29.08, coat: coats[1], facing: -Math.PI / 3 },
        { x: 2.25, z: 24.92, coat: coats[2], facing: Math.PI / 3 },
      ];
      for (const participant of participants) {
        const { x, z, coat, facing } = participant;
        const hips = box(x, 1.82, z, 0.66, 0.32, 0.48, coat, facing);
        const torso = box(x, 2.32, z, 0.7, 0.82, 0.43, coat, facing);
        const head = add(new THREE.SphereGeometry(0.3, 10, 8), skin, x, 2.98, z);
        const hair = add(new THREE.SphereGeometry(0.305, 8, 6), dark, x, 3.08, z + 0.045);
        hair.scale.set(1, 0.48, 0.92);
        for (const side of [-1, 1]) {
          const arm = box(x + side * 0.4, 2.29, z - 0.06, 0.2, 0.62, 0.24, coat, facing);
          arm.rotation.z = side * -0.12;
          const hand = add(new THREE.SphereGeometry(0.12, 8, 6), skin, x + side * 0.43, 1.98, z - 0.15);
          hand.userData.isLandscapeStage = true;
        }
        for (const mesh of [hips, torso, head, hair]) mesh.userData.isLandscapeStage = true;
      }
      box(-1.18, 2.58, 26.45, 1.12, 0.16, 0.78, ground, -0.08);
      box(-1.18, 2.7, 26.45, 0.92, 0.08, 0.68, glow, -0.08);
      const gear = add(new THREE.TorusGeometry(0.42, 0.1, 8, 16), edge, 1.25, 2.76, 26.5);
      gear.userData.isLandscapeStage = true;
      const shared = add(new THREE.OctahedronGeometry(0.62, 1), glow, 0, 3.1, 26.5);
      shared.userData.isLandscapeBeacon = true;
      break;
    }
    case "violin": {
      const lower = add(new THREE.SphereGeometry(1.55, 16, 12), ground, -0.58, 3.25, 27);
      lower.scale.set(0.82, 1, 0.28);
      lower.userData.isLandscapeStage = true;
      const upper = add(new THREE.SphereGeometry(1.2, 16, 12), edge, 0.62, 3.65, 27);
      upper.scale.set(0.78, 0.86, 0.27);
      upper.userData.isLandscapeStage = true;
      box(0, 3.7, 27, 0.66, 3.25, 0.48, dark, -0.1);
      box(0, 5.42, 26.65, 0.92, 0.16, 0.2, edge);
      for (const x of [-0.16, 0, 0.16]) box(x, 4.1, 26.62, 0.035, 3.05, 0.05, glow);
      route([[-2.65, 1.65, 26.5], [0.1, 1.45, 26.5], [2.8, 6.2, 26.5]], edge, 0.09);
      break;
    }
    case "craft-quality": {
      // 三件等高的作品共享同一张工作台，强调工艺价值来自质量与责任，而非职业等级。
      box(0, 2.05, 27, 8.6, 0.42, 3.1, dark);
      for (const x of [-3.5, 3.5]) {
        box(x, 1.05, 26.05, 0.34, 1.65, 0.34, ground);
        box(x, 1.05, 27.95, 0.34, 1.65, 0.34, ground);
      }
      for (const x of [-2.45, 0, 2.45]) {
        const workpiece = box(x, 2.58, 26.92, 1.72, 0.58, 1.18, x === 0 ? glow : ground, x === 0 ? 0 : 0.08);
        workpiece.userData.isLandscapeStage = true;
        box(x, 2.91, 26.92, 1.32, 0.08, 0.82, edge, x === 0 ? 0 : 0.08);
      }
      for (const z of [25.95, 28.05]) box(0, 3.05, z, 6.1, 0.1, 0.12, edge);
      route([[-3.7, 3.28, 25.55], [-1.8, 3.68, 25.18], [0, 3.92, 25.02], [1.8, 3.68, 25.18], [3.7, 3.28, 25.55]], edge, 0.07);
      const finish = beacon(4.05);
      finish.scale.setScalar(0.54);
      ring(3.6, 3.72);
      break;
    }
    case "bench": {
      // 服务观察台落在真实可辨的自习室维护现场：清单、课桌和待检椅子构成一段小叙事。
      arch(9.2, 5.5, dark, 30.8);
      box(0, 4.55, 30.45, 5.35, 2.9, 0.24, dark);
      box(0, 4.55, 30.29, 4.95, 2.48, 0.08, ground);
      for (let index = 0; index < 3; index++) {
        const y = 5.35 - index * 0.64;
        const mark = add(new THREE.OctahedronGeometry(0.16, 0), edge, -1.72, y, 30.2);
        mark.userData.isLandscapeStage = true;
        box(-0.25, y, 30.2, 2.35, 0.075, 0.05, glow);
      }
      for (const x of [-4, 4]) {
        box(x, 2.35, 28.25, 1.65, 0.18, 1.25, ground);
        for (const dx of [-0.58, 0.58]) for (const dz of [-0.42, 0.42]) box(x + dx, 1.65, 28.25 + dz, 0.12, 1.3, 0.12, dark);
        box(x, 1.52, 26.25, 0.9, 0.2, 0.82, dark);
        box(x, 2.12, 26.65, 0.86, 0.92, 0.16, edge);
      }
      box(0, 2.35, 27, 7.2, 0.4, 2.6, ground);
      for (const x of [-3, 3]) for (const z of [26.1, 27.9]) box(x, 1.35, z, 0.2, 1.8, 0.2, dark);
      box(-1.55, 2.75, 26.48, 2.2, 0.22, 0.92, edge);
      box(1.55, 2.8, 26.6, 1.35, 0.3, 0.72, glow);
      cylinder(2.9, 3.4, 27, 0.12, 1.6, dark, 8);
      route([[-3.4, 3, 26.6], [-1.6, 3.45, 26.4], [0, 3.1, 26.1], [1.55, 3.5, 26.6]], edge, 0.075);
      const looseSeat = box(3.65, 1.66, 24.55, 0.98, 0.2, 0.86, glow, 0.12);
      looseSeat.rotation.z = 0.08;
      box(3.65, 2.28, 24.94, 0.9, 0.92, 0.17, edge, 0.12);
      for (const [dx, dz, height] of [[-0.34, -0.28, 0.72], [0.34, -0.28, 0.72], [-0.34, 0.28, 0.42], [0.34, 0.28, 0.72]] as const) {
        box(3.65 + dx, 1.24, 24.55 + dz, 0.12, height, 0.12, dark);
      }
      const safetyRing = add(new THREE.TorusGeometry(0.82, 0.07, 8, 24), glow, 3.65, 1.1, 24.55);
      safetyRing.rotation.x = Math.PI / 2;
      safetyRing.userData.isLandscapeRing = true;
      break;
    }
    case "caliper": {
      for (const x of [-3.1, 3.1]) box(x, 4.2, 27, 0.42, 5.8, 0.5, edge);
      box(0, 7, 27, 6.6, 0.42, 0.5, edge);
      box(-0.7, 4.95, 27, 0.35, 2.5, 0.45, glow);
      box(0.25, 3.05, 27, 2.2, 1.25, 1.8, ground);
      for (let i = 0; i < 5; i++) box(-2.35 + i * 0.5, 6.55, 26.72, 0.08, 0.24, 0.12, dark);
      const measure = add(new THREE.SphereGeometry(0.36, 10, 8), glow, -0.78, 5.05, 26.68);
      measure.userData.isLandscapeBeacon = true;
      break;
    }
    case "trust-bridge": {
      for (const x of [-5, 5]) for (const z of [26.2, 27.8]) cylinder(x, 2.5, z, 0.48, 3.4, ground, 8);
      const deck = box(0, 2.25, 27, 10.5, 0.42, 2.5, edge);
      deck.userData.isLandscapeRoute = true;
      for (const x of [-4.1, 4.1]) box(x, 4.1, 27, 0.28, 3.5, 0.28, dark);
      route([[-4.1, 5.6, 27], [0, 5.6, 27], [4.1, 5.6, 27]], glow, 0.12);
      break;
    }
    case "loom": {
      arch(8.2, 6.4, ground, 27);
      for (let i = 0; i < 11; i++) {
        const x = -3.45 + i * 0.69;
        box(x, 3.95, 26.55, 0.075, 4.55, 0.12, i % 3 === 0 ? edge : glow);
      }
      for (let i = 0; i < 5; i++) box(0, 2.5 + i * 0.65, 26.45, 7.2, 0.1, 0.1, i % 2 ? ground : edge);
      ring(4.8, 1.25, 0.05);
      break;
    }
    case "heritage": {
      box(0, 4.2, 27, 8.4, 5.6, 0.56, dark);
      box(0, 4.2, 26.66, 7.7, 4.9, 0.12, ground);
      for (let row = 0; row < 5; row++) for (let col = 0; col < 7; col++) {
        const motif = add(new THREE.OctahedronGeometry(0.22 + ((row + col) % 2) * 0.08, 0), (row + col) % 3 === 0 ? edge : glow, -2.85 + col * 0.95, 2.4 + row * 0.85, 26.5);
        motif.userData.isLandscapeStage = true;
      }
      route([[-4.7, 1.2, 27], [-2.2, 1.5, 26], [0, 1.35, 25.8], [2.3, 1.5, 26], [4.7, 1.2, 27]], edge, 0.1);
      break;
    }
    case "work-dignity": {
      cylinder(0, 1.18, 27, 5.6, 0.32, dark, 12);
      for (const [index, x] of [-3.75, -1.25, 1.25, 3.75].entries()) {
        const plinth = box(x, 1.96, 27, 1.55, 1.15, 1.5, index % 2 === 0 ? ground : dark);
        plinth.userData.isLandscapeStage = true;
        const emblem = add(
          index % 2 === 0 ? new THREE.OctahedronGeometry(0.56, 0) : new THREE.TorusGeometry(0.42, 0.12, 7, 16),
          index % 2 === 0 ? edge : glow,
          x,
          2.9,
          26.45
        );
        emblem.userData.isLandscapeStage = true;
        route([[x, 3.2, 26.4], [x / 2, 3.72, 26.2], [0, 4.05, 26.2]], edge, 0.055);
      }
      const shared = add(new THREE.OctahedronGeometry(0.48, 1), glow, 0, 4.25, 26.15);
      shared.userData.isLandscapeBeacon = true;
      ring(5.05, 1.12, 0.08);
      break;
    }
    case "craft-evolution": {
      box(0, 1.85, 27, 8.4, 0.42, 2.9, dark);
      for (const x of [-3.2, 3.2]) {
        box(x, 1.12, 26.08, 0.28, 1.35, 0.28, ground);
        box(x, 1.12, 27.92, 0.28, 1.35, 0.28, ground);
      }
      const oldGauge = add(new THREE.TorusGeometry(0.88, 0.14, 8, 24), edge, -2.25, 3.55, 26.72);
      oldGauge.userData.isLandscapeStage = true;
      box(-2.25, 3.55, 26.68, 0.12, 1.38, 0.08, dark, -0.46);
      box(2.25, 3.55, 26.7, 2.35, 1.7, 0.22, ground);
      box(2.25, 3.55, 26.55, 1.85, 1.16, 0.08, glow);
      for (const y of [3.3, 3.55, 3.8]) box(2.25, y, 26.49, 1.2, 0.055, 0.04, edge);
      route([[-1.24, 3.55, 26.52], [0, 4.1, 26.52], [1.08, 3.55, 26.52]], glow, 0.085);
      const result = add(new THREE.OctahedronGeometry(0.38, 1), edge, 0, 4.45, 26.45);
      result.userData.isLandscapeBeacon = true;
      break;
    }
    case "embroidery-table": {
      box(0, 1.72, 27.15, 8.2, 0.4, 3.15, dark);
      for (const x of [-3.25, 3.25]) for (const z of [26.15, 28.15]) box(x, 1.05, z, 0.24, 1.45, 0.24, ground);
      box(0, 3.62, 26.58, 4.6, 3.35, 0.2, ground);
      box(0, 3.62, 26.43, 4.12, 2.88, 0.08, dark);
      for (let i = 0; i < 7; i++) {
        const x = -1.5 + i * 0.5;
        const thread = box(x, 3.62, 26.34, 0.075, 2.35, 0.06, i % 2 === 0 ? edge : glow);
        thread.userData.isLandscapeStage = true;
      }
      for (let i = 0; i < 5; i++) box(0, 2.68 + i * 0.47, 26.32, 3.05, 0.065, 0.055, i % 2 === 0 ? glow : edge);
      for (const x of [-3.15, 3.15]) {
        cylinder(x, 2.25, 26.55, 0.3, 0.85, ground, 10);
        const spool = add(new THREE.TorusGeometry(0.34, 0.1, 7, 16), edge, x, 2.75, 26.55);
        spool.userData.isLandscapeStage = true;
      }
      route([[-3.3, 2.45, 28.1], [-1.8, 2.82, 27.1], [0, 2.55, 26.2], [1.8, 2.82, 27.1], [3.3, 2.45, 28.1]], glow, 0.06);
      break;
    }
    case "living-heritage": {
      for (const [index, z] of [29.2, 27, 24.8].entries()) {
        const width = 7.8 - index * 0.75;
        arch(width, 5.5 - index * 0.3, index === 1 ? edge : ground, z);
        for (let i = 0; i < 5; i++) {
          const motif = add(new THREE.OctahedronGeometry(0.2 + (i % 2) * 0.06, 0), i % 2 === 0 ? glow : edge, -1.6 + i * 0.8, 2.5 + (i % 2) * 0.7, z - 0.36);
          motif.userData.isLandscapeStage = true;
        }
      }
      route([[-3.2, 4.65, 29.2], [-1.5, 5.1, 27], [0, 4.45, 24.8], [1.5, 5.1, 27], [3.2, 4.65, 29.2]], edge, 0.08);
      route([[-3.2, 2.1, 29.2], [-1.5, 2.25, 27], [0, 2.12, 24.8], [1.5, 2.25, 27], [3.2, 2.1, 29.2]], glow, 0.065);
      ring(5.1, 1.12, 0.1);
      break;
    }
    case "lunar-probe": {
      const moon = add(new THREE.SphereGeometry(4.8, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), ground, 0, 0.3, 33.5);
      moon.userData.isLandscapeStage = true;
      for (const [x, z, size] of [[-3.2, 32.2, 0.72], [-1.6, 34, 0.52], [2.8, 32.5, 0.84], [3.6, 34.1, 0.44]] as const) {
        const crater = add(new THREE.TorusGeometry(size, 0.13, 6, 18), dark, x, 0.62, z);
        crater.rotation.x = Math.PI / 2;
        crater.userData.isLandscapeStage = true;
      }
      const rover = add(new THREE.BoxGeometry(2.25, 0.86, 1.58), ground, -1.8, 2.02, 24.5);
      rover.userData.isLandscapeStage = true;
      box(-1.8, 2.47, 24.5, 2.04, 0.16, 1.4, edge);
      const solarPanel = new THREE.MeshStandardMaterial({ color: 0x294f70, emissive: 0x10283d, emissiveIntensity: 0.24, roughness: 0.58, metalness: 0.3 });
      for (const x of [-3.72, 0.12]) {
        box(x, 2.56, 24.5, 1.42, 0.14, 1.62, solarPanel);
        for (let row = 0; row < 4; row++) {
          box(x, 2.65, 23.92 + row * 0.38, 1.3, 0.035, 0.035, edge);
        }
        route([[x < -1.8 ? -2.86 : -0.74, 2.4, 24.5], [x, 2.45, 24.5]], edge, 0.055);
      }
      for (const x of [-3, -1.8, -0.6]) for (const z of [23.58, 25.42]) {
        const wheel = add(new THREE.CylinderGeometry(0.4, 0.4, 0.24, 12), dark, x, 1.62, z);
        wheel.rotation.z = Math.PI / 2;
        wheel.userData.isLandscapeStage = true;
      }
      cylinder(-1.8, 3.32, 24.5, 0.08, 1.72, dark, 8);
      box(-1.8, 4.2, 24.5, 0.82, 0.42, 0.52, ground);
      const cameraLens = add(new THREE.SphereGeometry(0.13, 10, 8), edge, -1.8, 4.2, 24.2);
      cameraLens.userData.isLandscapeBeacon = true;
      const probe = add(new THREE.OctahedronGeometry(0.58, 0), glow, -1.8, 4.92, 24.5);
      probe.userData.isLandscapeBeacon = true;
      const antenna = add(new THREE.SphereGeometry(0.19, 10, 8), edge, -1.8, 5.72, 24.5);
      antenna.userData.isLandscapeBeacon = true;
      route([[-4.5, 0.82, 24.2], [-3.5, 0.85, 23.8], [-1.8, 0.85, 24.5], [0.1, 0.82, 25.4]], edge, 0.09);
      break;
    }
    case "test-console": {
      box(0, 2.45, 27, 7.8, 0.56, 2.6, dark);
      box(0, 3.25, 26.55, 7.2, 1.1, 0.28, ground, -0.16);
      for (let i = 0; i < 7; i++) {
        const x = -2.8 + i * 0.92;
        const lamp = add(new THREE.SphereGeometry(0.22 + (i % 2) * 0.07, 10, 8), i % 3 === 0 ? edge : glow, x, 3.42, 26.28);
        lamp.userData.isLandscapeBeacon = true;
      }
      for (const x of [-2.3, 0, 2.3]) box(x, 4.75, 27, 1.35, 1.45, 0.65, ground);
      route([[-3.3, 1.25, 29], [-1.7, 1.3, 27.9], [0, 1.28, 27], [1.7, 1.3, 27.9], [3.3, 1.25, 29]], edge, 0.1);
      break;
    }
    case "lander": {
      const body = add(new THREE.OctahedronGeometry(1.45, 1), glow, 0, 5.35, 27);
      body.scale.y = 0.82;
      body.userData.isLandscapeStage = true;
      for (const [x, z] of [[-2.1, 25.2], [2.1, 25.2], [-2.1, 28.8], [2.1, 28.8]] as const) {
        const leg = box(x * 0.68, 3.15, (z + 27) / 2, 0.16, 3.5, 0.16, edge);
        leg.rotation.z = x < 0 ? -0.24 : 0.24;
        box(x, 1.4, z, 1.1, 0.22, 0.82, dark);
      }
      for (const x of [-3.7, 3.7]) {
        box(x, 5.2, 27, 1.25, 1.65, 0.14, edge);
        for (let i = 0; i < 4; i++) box(x, 4.6 + i * 0.4, 26.9, 1.1, 0.055, 0.08, glow);
      }
      cylinder(0, 7.3, 27, 0.08, 2.2, dark, 6);
      const pulse = add(new THREE.SphereGeometry(0.38, 10, 8), edge, 0, 8.55, 27);
      pulse.userData.isLandscapeBeacon = true;
      break;
    }
    case "orbit-adjustment": {
      const moon = add(new THREE.SphereGeometry(2.1, 16, 12), ground, 0, 3.1, 27);
      moon.userData.isLandscapeStage = true;
      for (const [rotationX, rotationY] of [[0.2, 0], [0.72, 0.55], [-0.5, -0.72]] as const) {
        const orbit = ring(4.4, 3.2, rotationX);
        orbit.rotation.y = rotationY;
      }
      for (const [x, y, z] of [[3.6, 4.9, 27], [-1.8, 5.8, 27.5], [-2.2, 2.2, 26.7]] as const) {
        const satellite = add(new THREE.OctahedronGeometry(0.44, 0), edge, x, y, z);
        satellite.userData.isLandscapeBeacon = true;
      }
      route([[3.6, 4.9, 27], [1.9, 5.3, 27], [0, 5.4, 27], [-1.8, 5.8, 27.5]], glow, 0.07);
      break;
    }
    case "training": {
      // 以体能器械、舱内程序板和固定绳替代抽象行星模型，让“训练舱”语义一眼成立。
      arch(9, 6.2, edge, 30.2);
      box(0, 4.45, 30, 5.8, 2.7, 0.22, dark);
      box(0, 4.45, 29.82, 5.35, 2.3, 0.08, ground);
      for (let row = 0; row < 3; row++) {
        const y = 5.2 - row * 0.62;
        for (const x of [-1.55, 0, 1.55]) {
          const step = add(new THREE.OctahedronGeometry(0.13, 0), row === 1 ? glow : edge, x, y, 29.72);
          step.userData.isLandscapeStage = true;
        }
        box(0, y - 0.2, 29.72, 3.8, 0.035, 0.03, dark);
      }
      box(0, 1.28, 26.5, 3.25, 0.28, 1.55, dark);
      for (const x of [-1.05, 1.05]) {
        const wheel = add(new THREE.CylinderGeometry(0.42, 0.42, 0.18, 12), edge, x, 1.18, 26.5);
        wheel.rotation.z = Math.PI / 2;
        wheel.userData.isLandscapeStage = true;
        box(x, 2.28, 26.45, 0.16, 1.78, 0.16, ground);
      }
      const suit = new THREE.MeshStandardMaterial({ color: 0xd8e0e4, roughness: 0.76, metalness: 0.04 });
      const visor = new THREE.MeshStandardMaterial({ color: 0x325b7c, roughness: 0.22, metalness: 0.34, emissive: 0x17344b, emissiveIntensity: 0.18 });
      const torso = box(0, 2.78, 25.6, 0.78, 1.18, 0.55, suit);
      const helmet = add(new THREE.SphereGeometry(0.4, 12, 9), suit, 0, 3.62, 25.6);
      const faceplate = add(new THREE.SphereGeometry(0.28, 10, 8), visor, 0, 3.64, 25.31);
      faceplate.scale.set(1, 0.72, 0.45);
      for (const side of [-1, 1]) {
        const arm = box(side * 0.55, 2.72, 25.56, 0.22, 0.82, 0.25, suit);
        arm.rotation.z = side * -0.18;
        box(side * 0.22, 1.96, 25.45, 0.22, 0.72, 0.26, suit);
        const tether = add(new THREE.TorusGeometry(0.17, 0.055, 7, 14), edge, side * 0.9, 2.0, 26.0);
        tether.rotation.x = Math.PI / 2;
        tether.userData.isLandscapeStage = true;
      }
      for (const mesh of [torso, helmet, faceplate]) mesh.userData.isLandscapeStage = true;
      route([[-0.8, 3.7, 25.7], [-0.55, 4.55, 26.1], [0, 5.25, 26.4], [0.65, 5.75, 27]], glow, 0.07);
      const status = add(new THREE.SphereGeometry(0.3, 10, 8), edge, 0, 5.7, 27);
      status.userData.isLandscapeBeacon = true;
      ring(3.2, 1.08, 0.1);
      break;
    }
    case "science-exhibit": {
      for (const [x, y, radius] of [[-3.5, 3.5, 0.65], [0, 5.1, 0.88], [3.5, 3.5, 0.65]] as const) {
        const planet = add(new THREE.SphereGeometry(radius, 12, 10), x === 0 ? edge : glow, x, y, 27);
        planet.userData.isLandscapeBeacon = true;
      }
      for (const x of [-2.5, 0, 2.5]) {
        const stem = cylinder(x, 2.2, 27, 0.13, 2.7, dark, 8);
        stem.rotation.z = x * 0.04;
      }
      ring(4.5, 5.4, 0.44);
      ring(2.7, 3.6, -0.7);
      break;
    }
    case "relay-bridge": {
      arch(10.2, 6.2, dark, 29.7);
      const earth = add(new THREE.SphereGeometry(1.15, 14, 10), edge, -4.2, 3.7, 27.7);
      earth.userData.isLandscapeBeacon = true;
      const moon = add(new THREE.SphereGeometry(1.75, 16, 12), ground, 4.2, 2.7, 28.1);
      moon.userData.isLandscapeStage = true;
      for (const [x, z, radius] of [[3.35, 28.1, 0.38], [4.8, 28.1, 0.52], [5.05, 27.75, 0.24]] as const) {
        const crater = add(new THREE.TorusGeometry(radius, 0.09, 6, 16), dark, x, 2.72, z);
        crater.rotation.x = Math.PI / 2;
        crater.userData.isLandscapeStage = true;
      }
      box(0, 4.65, 27, 0.92, 0.68, 0.7, glow);
      for (const x of [-1.45, 1.45]) {
        box(x, 4.68, 27, 1.52, 0.12, 0.82, edge);
        for (let row = 0; row < 3; row++) box(x, 4.69, 26.72 + row * 0.27, 1.38, 0.035, 0.035, dark);
      }
      const link = add(new THREE.SphereGeometry(0.22, 10, 8), glow, 0, 5.75, 27);
      link.userData.isLandscapeBeacon = true;
      route([[-3.05, 4.15, 27.5], [-1.5, 5.4, 27], [0, 5.72, 27], [1.5, 4.3, 27.3], [3.2, 3.2, 27.8]], glow, 0.09);
      ring(3.1, 5.2, 0.36);
      break;
    }
    case "sample-lab": {
      box(0, 2.05, 27, 8.4, 0.38, 3.2, dark);
      for (const x of [-3.4, 3.4]) for (const z of [25.9, 28.1]) box(x, 1.14, z, 0.22, 1.62, 0.22, edge);
      box(0, 4.7, 30, 6.8, 2.9, 0.22, ground);
      for (const x of [-2.3, 0, 2.3]) {
        const caseGlass = add(new THREE.BoxGeometry(1.55, 1.22, 1.06), glow, x, 3.0, 26.55);
        caseGlass.material = new THREE.MeshStandardMaterial({ color: 0x9bb8cc, transparent: true, opacity: 0.2, roughness: 0.28, metalness: 0.08 });
        caseGlass.userData.isLandscapeStage = true;
        const sample = add(new THREE.DodecahedronGeometry(0.42, 0), x === 0 ? edge : ground, x, 2.68, 26.42);
        sample.scale.set(1, 0.72, 0.82);
        sample.userData.isLandscapeStage = true;
        cylinder(x, 2.35, 26.42, 0.52, 0.1, dark, 12);
      }
      for (let row = 0; row < 3; row++) {
        box(0, 5.35 - row * 0.6, 29.86, 3.4, 0.06, 0.035, row === 1 ? glow : edge);
      }
      const microscope = cylinder(3.05, 3.35, 26.55, 0.16, 1.75, edge, 10);
      microscope.rotation.z = 0.28;
      box(3.25, 4.05, 26.55, 0.85, 0.14, 0.14, glow, -0.28);
      route([[-3.4, 3.1, 28.4], [-1.6, 3.7, 27.7], [0, 3.45, 27.2], [1.8, 3.1, 28.4], [3.05, 3.7, 27.7]], edge, 0.055);
      break;
    }
    case "moon-horizon": {
      const horizon = add(new THREE.SphereGeometry(6.3, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), ground, 0, 0.55, 34.5);
      horizon.userData.isLandscapeStage = true;
      for (const [x, z, radius] of [[-4.3, 32.2, 0.72], [-1.8, 34.4, 0.5], [2.1, 33.1, 0.86], [4.2, 35, 0.48]] as const) {
        const crater = add(new THREE.TorusGeometry(radius, 0.11, 6, 18), dark, x, 0.8, z);
        crater.rotation.x = Math.PI / 2;
        crater.userData.isLandscapeStage = true;
      }
      box(0, 1.55, 25.6, 8.8, 0.34, 2.7, dark);
      for (const x of [-3.6, 3.6]) box(x, 2.45, 25.7, 0.24, 1.62, 0.24, edge);
      box(0, 3.35, 25.7, 7.4, 0.22, 0.35, glow);
      const horizonBeacon = add(new THREE.OctahedronGeometry(0.46, 0), edge, 0, 4.15, 25.7);
      horizonBeacon.userData.isLandscapeBeacon = true;
      route([[-4.1, 1.02, 28.7], [-2.1, 1.06, 27.3], [0, 1.1, 26.6], [2.1, 1.06, 27.3], [4.1, 1.02, 28.7]], glow, 0.085);
      break;
    }
    case "systems-simulation": {
      for (const x of [-3.6, 0, 3.6]) {
        box(x, 3.35, 27.8, 2.35, 2.25, 0.3, dark);
        box(x, 3.55, 27.58, 1.95, 1.48, 0.08, ground);
        for (let row = 0; row < 3; row++) {
          route([[x - 0.78, 3.05 + row * 0.26, 27.48], [x - 0.18, 3.24 + row * 0.26, 27.48], [x + 0.28, 3.12 + row * 0.26, 27.48], [x + 0.78, 3.36 + row * 0.26, 27.48]], row === 1 ? glow : edge, 0.035);
        }
        cylinder(x, 1.82, 27.8, 0.1, 1.24, edge, 8);
      }
      box(0, 1.3, 27.7, 8.6, 0.22, 2.25, dark);
      const dataCore = add(new THREE.IcosahedronGeometry(0.56, 1), glow, 0, 5.25, 27.48);
      dataCore.userData.isLandscapeBeacon = true;
      route([[-2.3, 4.8, 27.45], [0, 5.2, 27.45], [2.3, 4.8, 27.45]], edge, 0.07);
      break;
    }
    case "mission-control": {
      arch(10.8, 6.8, edge, 30.2);
      box(0, 5.0, 30.0, 7.1, 3.0, 0.24, dark);
      for (let i = 0; i < 5; i++) {
        const x = -2.4 + i * 1.2;
        const screen = box(x, 5.0, 29.82, 0.88, 1.65, 0.08, i === 2 ? glow : ground);
        for (let row = 0; row < 4; row++) box(x, 4.5 + row * 0.27, 29.74, 0.58, 0.035, 0.025, row === 2 ? glow : edge);
        screen.userData.isLandscapeStage = true;
      }
      for (const x of [-3.2, 0, 3.2]) {
        box(x, 2.2, 26.7, 2.15, 0.35, 1.35, edge);
        box(x, 2.65, 26.3, 1.75, 0.65, 0.18, ground, -0.18);
        for (const dx of [-0.72, 0.72]) box(x + dx, 1.65, 26.72, 0.12, 1.1, 0.12, dark);
      }
      route([[-4.2, 3.1, 27.2], [-2.1, 3.75, 27], [0, 4.15, 27], [2.1, 3.75, 27], [4.2, 3.1, 27.2]], glow, 0.065);
      const sharedSignal = add(new THREE.OctahedronGeometry(0.38, 1), glow, 0, 6.95, 29.7);
      sharedSignal.userData.isLandscapeBeacon = true;
      break;
    }
    case "crew-simulation": {
      arch(8.6, 6.1, edge, 29.5);
      for (const x of [-3.1, 3.1]) {
        const pod = add(new THREE.SphereGeometry(1.2, 12, 10), dark, x, 3.2, 27.6);
        pod.scale.set(0.9, 1.1, 0.62);
        pod.userData.isLandscapeStage = true;
        box(x, 3.2, 26.96, 1.7, 0.1, 0.1, glow);
      }
      const suit = new THREE.MeshStandardMaterial({ color: 0xd9e2e5, roughness: 0.78, metalness: 0.04 });
      const visor = new THREE.MeshStandardMaterial({ color: 0x375a78, roughness: 0.24, metalness: 0.32, emissive: 0x18344a, emissiveIntensity: 0.16 });
      for (const [x, z, turn] of [[-1.8, 25.9, -0.22], [1.8, 25.9, 0.22]] as const) {
        const torso = box(x, 2.55, z, 0.72, 0.98, 0.48, suit, turn);
        const helmet = add(new THREE.SphereGeometry(0.42, 12, 9), suit, x, 3.48, z);
        const glass = add(new THREE.SphereGeometry(0.28, 10, 8), visor, x, 3.49, z - 0.22);
        glass.scale.set(1, 0.72, 0.48);
        for (const side of [-1, 1]) box(x + side * 0.5, 2.48, z - 0.04, 0.2, 0.76, 0.24, suit, turn);
        const badge = add(new THREE.OctahedronGeometry(0.16, 0), edge, x, 2.75, z - 0.27);
        for (const mesh of [torso, helmet, glass, badge]) mesh.userData.isLandscapeStage = true;
      }
      route([[-2.8, 2.1, 27.2], [-1.2, 2.55, 26.7], [0, 2.7, 26.1], [1.2, 2.55, 26.7], [2.8, 2.1, 27.2]], glow, 0.065);
      const check = add(new THREE.SphereGeometry(0.28, 10, 8), edge, 0, 5.15, 27.15);
      check.userData.isLandscapeBeacon = true;
      break;
    }
    case "future-frontier": {
      const habitat = add(new THREE.SphereGeometry(2.55, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), glow, 0, 1.42, 28);
      habitat.userData.isLandscapeStage = true;
      box(0, 1.45, 28, 5.15, 0.18, 0.3, dark);
      for (const x of [-4.2, 4.2]) {
        const panel = box(x, 2.05, 27.3, 2.35, 0.12, 1.25, edge, x < 0 ? -0.12 : 0.12);
        panel.userData.isLandscapeStage = true;
        for (let row = 0; row < 3; row++) box(x, 2.14, 26.86 + row * 0.42, 2.12, 0.03, 0.03, dark);
        for (const dx of [-0.92, 0.92]) box(x + dx, 1.35, 27.3, 0.12, 1.35, 0.12, dark);
      }
      for (const angle of [0, Math.PI / 3, (Math.PI * 2) / 3, Math.PI, (Math.PI * 4) / 3, (Math.PI * 5) / 3]) {
        const x = Math.cos(angle) * 3.2;
        const z = 28 + Math.sin(angle) * 2.6;
        const light = add(new THREE.SphereGeometry(0.16, 8, 6), edge, x, 1.25, z);
        light.userData.isLandscapeBeacon = true;
        route([[x, 1.05, z], [x * 0.55, 1.12, 28 + (z - 28) * 0.55], [0, 1.12, 28]], glow, 0.045);
      }
      const future = add(new THREE.OctahedronGeometry(0.48, 1), edge, 0, 5.1, 28);
      future.userData.isLandscapeBeacon = true;
      ring(5.2, 1.2, 0.1);
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

function addCentralSanctuary(
  root: THREE.Group,
  ground: THREE.MeshStandardMaterial,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial
): void {
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(13, 14.5, 0.65, 8), ground);
  plaza.position.y = 0.34;
  root.add(plaza);

  const lowerRing = new THREE.Mesh(new THREE.TorusGeometry(11.8, 0.11, 8, 48), edge);
  lowerRing.rotation.x = Math.PI / 2;
  lowerRing.position.y = 0.72;
  lowerRing.userData.isLandscapeRing = true;
  root.add(lowerRing);

  const innerDisc = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 7.6, 0.16, 8), dark);
  innerDisc.position.y = 0.76;
  root.add(innerDisc);

  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(6.8, 0.07, 8, 40), glow);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = 0.9;
  innerRing.userData.isLandscapeRing = true;
  root.add(innerRing);

  // 入口门廊放在玩家出生点正前方，保证打开单元时第一眼能感到“这是一个地方”。
  const gateLeft = new THREE.Mesh(new THREE.BoxGeometry(0.72, 8.5, 0.72), edge);
  gateLeft.position.set(-5.2, 4.8, 8.5);
  const gateRight = gateLeft.clone();
  gateRight.position.x = 5.2;
  const gateTop = new THREE.Mesh(new THREE.BoxGeometry(11.1, 0.72, 0.72), edge);
  gateTop.position.set(0, 8.7, 8.5);
  root.add(gateLeft, gateRight, gateTop);

  const gateRing = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.1, 8, 40), glow);
  gateRing.position.set(0, 4.65, 8.5);
  root.add(gateRing);

  // 中央可交互水晶由学习圣所 MapNode 提供，不在这里叠加第二颗发光核心。

  for (const [x, z] of [[-7, -7], [7, -7], [-7, 7], [7, 7]]) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 4.8, 8), dark);
    pillar.position.set(x, 2.6, z);
    root.add(pillar);

    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.43, 10, 8), glow);
    cap.position.set(x, 5.05, z);
    cap.userData.isLandscapeBeacon = true;
    root.add(cap);
  }
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

function addStudyStations(root: THREE.Group, dark: THREE.MeshStandardMaterial, glow: THREE.MeshStandardMaterial, edge: THREE.MeshStandardMaterial): void {
  const stations = [
    { x: -21, z: -20, color: 0x38bdf8 },
    { x: 21, z: -20, color: 0xfbbf24 },
    { x: -21, z: 20, color: 0x4ade80 },
    { x: 21, z: 20, color: 0xf472b6 },
  ];

  for (const station of stations) {
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.7, 0.32, 6), dark);
    platform.position.set(station.x, 0.7, station.z);
    root.add(platform);

    const stationMat = glow.clone();
    stationMat.color.setHex(station.color);
    stationMat.emissive.setHex(station.color);
    stationMat.emissiveIntensity = 1.3;
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 1), stationMat);
    core.position.set(station.x, 2.2, station.z);
    core.userData.isLandscapeBeacon = true;
    root.add(core);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.08, 6, 24), edge.clone());
    (ring.material as THREE.MeshStandardMaterial).color.setHex(station.color);
    (ring.material as THREE.MeshStandardMaterial).emissive.setHex(station.color);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(station.x, 1.25, station.z);
    ring.userData.isLandscapeRing = true;
    root.add(ring);
  }
}

function addDigitalCoast(
  root: THREE.Group,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focused: boolean
): void {
  if (focused) {
    const canyonWall = new THREE.MeshStandardMaterial({
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
      const wall = new THREE.Mesh(new THREE.BoxGeometry(3.8, 5.2, 11), canyonWall);
      wall.position.set(side * 12.8, 2.65, 34);
      wall.rotation.y = -side * 0.08;
      root.add(wall);

      for (const y of [1.25, 2.1, 2.95]) {
        const signal = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 5.6), canyonSignal);
        signal.position.set(side * 10.84, y, 34);
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

  const towers: ReadonlyArray<readonly [number, number, number]> = [[-28, 35, 13], [0, 43, 18], [28, 35, 11]];
  for (const [x, z, h] of towers) {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.3, h, 6), dark);
    tower.position.set(x, h / 2, z);
    root.add(tower);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 8), glow);
    cap.position.set(x, h + 1.1, z);
    cap.userData.isLandscapeBeacon = true;
    root.add(cap);

    const dataRing = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.08, 6, 32), edge);
    dataRing.rotation.x = Math.PI / 2;
    dataRing.position.set(x, h * 0.64, z);
    dataRing.userData.isLandscapeRing = true;
    root.add(dataRing);
  }

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(54, 0.18, 0.34), dark);
  bridge.position.set(0, 6.5, 35);
  root.add(bridge);
}

function addKnowledgeMarket(root: THREE.Group, ground: THREE.MeshStandardMaterial, dark: THREE.MeshStandardMaterial, glow: THREE.MeshStandardMaterial): void {
  for (const x of [-28, 0, 28]) {
    const stall = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 6), ground);
    stall.position.set(x, 0.9, 34);
    root.add(stall);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(7, 3.6, 4), dark);
    roof.position.set(x, 4.2, 34);
    roof.rotation.y = Math.PI / 4;
    root.add(roof);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.7, 10, 8), glow);
    lamp.position.set(x, 5.3, 34);
    lamp.userData.isLandscapeBeacon = true;
    root.add(lamp);
  }
}

function addMemoryForest(
  root: THREE.Group,
  ground: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focusedWorld = false
): void {
  if (focusedWorld) return;
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 4.2, 18, 8), ground);
  trunk.position.set(0, 9, 38);
  root.add(trunk);
  for (const [x, y, z, s] of [[-7, 16, 38, 7], [7, 18, 38, 8], [0, 24, 38, 9]]) {
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 1), glow);
    crown.position.set(x, y, z);
    crown.userData.isLandscapeBeacon = true;
    root.add(crown);
  }
  for (const x of [-31, 31]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4, 0.16, 8, 32), edge);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, 0.9, 36);
    ring.userData.isLandscapeRing = true;
    root.add(ring);
  }
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
  const steps = new THREE.Mesh(new THREE.BoxGeometry(26, 0.7, 15), ground);
  steps.position.set(0, 1.1, 39);
  root.add(steps);
  for (const x of [-9, -3, 3, 9]) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.5, 13, 8), dark);
    pillar.position.set(x, 7.5, 40);
    root.add(pillar);
  }
  const crown = new THREE.Mesh(new THREE.ConeGeometry(12, 5, 4), glow);
  crown.position.set(0, 17, 40);
  crown.rotation.y = Math.PI / 4;
  crown.userData.isLandscapeBeacon = true;
  root.add(crown);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(8, 0.18, 8, 48), edge);
  halo.rotation.x = Math.PI / 2;
  halo.position.set(0, 15, 40);
  halo.userData.isLandscapeRing = true;
  root.add(halo);
}

function addOrbitCampus(
  root: THREE.Group,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focusedWorld = false
): void {
  if (focusedWorld) {
    const station = new THREE.Mesh(new THREE.CylinderGeometry(5, 5.8, 0.3, 10), dark);
    station.position.set(9, 0.65, 40);
    root.add(station);
    const rocket = new THREE.Mesh(new THREE.ConeGeometry(1.65, 8, 8), glow);
    rocket.position.set(9, 4.8, 40);
    rocket.userData.isLandscapeBeacon = true;
    root.add(rocket);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.13, 8, 40), edge);
    orbit.rotation.x = Math.PI / 2.4;
    orbit.position.set(9, 5, 40);
    orbit.userData.isLandscapeRing = true;
    root.add(orbit);
    return;
  }
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(12, 14, 0.55, 8), dark);
  pad.position.set(0, 1.1, 40);
  root.add(pad);
  const rocket = new THREE.Mesh(new THREE.ConeGeometry(3.2, 16, 8), glow);
  rocket.position.set(0, 9.5, 40);
  rocket.userData.isLandscapeBeacon = true;
  root.add(rocket);
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(8, 0.2, 8, 48), edge);
  ringA.rotation.x = Math.PI / 2.4;
  ringA.position.set(0, 9, 40);
  ringA.userData.isLandscapeRing = true;
  root.add(ringA);
  const ringB = ringA.clone();
  ringB.rotation.x = -Math.PI / 3;
  ringB.rotation.z = Math.PI / 5;
  root.add(ringB);
}

function addCommonsExchange(
  root: THREE.Group,
  ground: THREE.MeshStandardMaterial,
  dark: THREE.MeshStandardMaterial,
  glow: THREE.MeshStandardMaterial,
  edge: THREE.MeshStandardMaterial,
  focusedWorld = false
): void {
  const square = new THREE.Mesh(new THREE.BoxGeometry(30, 0.55, 18), ground);
  square.position.set(0, 1.0, 38);
  root.add(square);

  for (const x of [-12, 0, 12]) {
    const stall = new THREE.Mesh(new THREE.BoxGeometry(8, 0.42, 5.5), dark);
    stall.position.set(x, 2.0, 35);
    root.add(stall);
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(5.7, 2.8, 4), glow);
    canopy.position.set(x, 5.1, 35);
    canopy.rotation.y = Math.PI / 4;
    canopy.userData.isLandscapeBeacon = true;
    root.add(canopy);
  }

  if (!focusedWorld) {
    const ledger = new THREE.Mesh(new THREE.BoxGeometry(13, 13, 2.2), dark);
    ledger.position.set(0, 7.2, 49);
    root.add(ledger);
    const ledgerFace = new THREE.Mesh(new THREE.BoxGeometry(10.5, 8.5, 0.22), glow);
    ledgerFace.position.set(0, 7.4, 47.8);
    ledgerFace.userData.isLandscapeBeacon = true;
    root.add(ledgerFace);
    for (let i = -3; i <= 3; i++) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.08, 0.12), edge);
      line.position.set(0, 5.0 + i * 1.15, 47.62);
      line.userData.isLandscapeRing = true;
      root.add(line);
    }
  }
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
