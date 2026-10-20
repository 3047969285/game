import * as THREE from "three";
import { Frame, type SceneKit } from "../../world/sceneProps";

/** Built into the parent's merged batches, so details share its reveal and shadows. */
export function studyNotebook(k: SceneKit, f: Frame): void {
  f.box(k.p.fabricBlue, .29, .009, .28, 0, 0, 0, .002);
  f.box(k.m.paper, .135, .011, .265, -.07, .009, 0, .001);
  f.box(k.m.paper, .135, .011, .265, .07, .009, 0, .001);
  f.box(k.m.woodDark, .003, .001, .25, 0, .021, 0, 0);
  // Page edges, stitched binding and a few broken pencil lines.
  if (k.detail === "high") {
    for (let i = 0; i < 4; i++) {
      f.box(k.p.printInk, .132, .0006, .001, -.07, .011+i*.0025, .132, 0);
      f.box(k.p.printInk, .132, .0006, .001, .07, .011+i*.0025, .132, 0);
    }
    for (let i = 0; i < 7; i++) {
      const z = -.09+i*.027;
      f.box(k.m.steel, .005, .0008, .003, 0, .022, z, 0);
      for (const side of [-1, 1]) {
        const width = .055+(i%3)*.013;
        f.box(k.p.printInk, width, .0005, .0012, side*.071, .0205, z, 0);
        f.box(k.p.printInk, .014, .0005, .0012, side*.12, .0205, z, 0);
      }
    }
  }
  const pen = f.child(.18,.014,.01,-.12);
  pen.box(k.p.plasticDark, .008, .008, .145, 0, 0, 0, .001);
  pen.box(k.m.steel, .009, .009, .018, 0, 0, -.067, .001);
  pen.box(k.m.steel, .002, .003, .028, .004, .009, -.043, .0005);
  // A narrow bookmark protrudes past the paper, adding scale and a soft color accent.
  f.box(k.p.fabricRed, .013, .0007, .09, .095, .0215, .116, 0);
}

export function floorJoints(k: SceneKit, width: number, depth: number): void {
  const f = new Frame(k.kit);
  const seam = new THREE.MeshStandardMaterial({ color: 0x927658, roughness: 1 });
  const spacing = .55;
  const count = Math.floor(width/spacing);
  for (let i = 1; i < count; i++) {
    const x = -width/2+i*spacing;
    f.box(seam, .003, .0007, depth, x, .0003, 0, 0);
    // Stagger end joints, avoiding a tiled grid appearance.
    for (let z = -depth/2+.8+(i%3)*.63; z < depth/2; z += 1.9) {
      f.box(seam, spacing, .0007, .003, x+spacing/2, .0003, z, 0);
    }
  }
}
