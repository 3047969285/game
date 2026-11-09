"""Claude · character pipeline: move a conformed MetaHuman's face landmarks by a 2D displacement field.

Reads Saved/Compare/<id>/refine2d.json (Tools/char_refine2d_prep.py: MediaPipe on the MHC front render vs
the target-mesh front render, in UE world cm on the front image plane x/z). Each front-facing MetaHuman face
landmark samples the field with a Gaussian kernel and is translated by STEP * (dx, 0, dz) with
translate_face_landmarks, so MetaHuman re-solves a valid identity. Depth (y) is left to the conform.
One step per run; loop prep -> refine -> ue_render_compare.py.

Run in the full editor through the project lock (see Docs/tasks/ue-run-rules.md):
  CHAR_ID=me2026 CHAR_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh \\
      UnrealEditor WordQuestUE.uproject -ExecutePythonScript=Tools/char_refine_2d.py -unattended -nosplash
"""
import json
import os

import numpy as np
import unreal

CID = os.environ.get("CHAR_ID", "me2026")
STEP = float(os.environ.get("REFINE_STEP", "0.8"))
SIGMA = float(os.environ.get("REFINE_SIGMA_CM", "0.9"))
DEPTH_CM = float(os.environ.get("REFINE_DEPTH_CM", "9.0"))   # landmarks this far behind the face front are skipped
DEST = f"/Game/Characters/{CID}"
FIELD = os.path.join(unreal.Paths.project_saved_dir(), "Compare", CID, "refine2d.json")


def log(m):
    unreal.log_warning(f"[char_refine2d] {m}")


def landmarks(mh, character):
    L = mh.get_face_landmarks(character)
    if isinstance(L, tuple):
        L = L[0]
    return np.array([[p.x, p.y, p.z] for p in L], float)


def main():
    field = json.load(open(FIELD))
    S, D = np.array(field["points"]), np.array(field["disp"])
    mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
    character = unreal.load_asset(f"{DEST}/MHC_{CID}")
    if character is None or not mh.try_add_object_to_edit(character):
        raise RuntimeError("cannot edit MHC")
    try:
        P = landmarks(mh, character)
        front = P[:, 1] > P[:, 1].max() - DEPTH_CM             # face looks toward +Y
        d2 = ((P[:, None, [0, 2]] - S[None]) ** 2).sum(-1)
        w = np.exp(-d2 / (2 * SIGMA ** 2))
        near = w.max(1) > 0.3                                  # inside the MediaPipe-covered face area
        sel = np.where(front & near)[0]
        disp = (w[sel] @ D) / w[sel].sum(1, keepdims=True)
        log(f"{len(P)} landmarks, moving {len(sel)}, field mean {field['mean_cm']:.3f} cm, "
            f"applied mean {np.linalg.norm(disp, axis=1).mean() * STEP:.3f} cm")
        deltas = [unreal.Vector(float(dx * STEP), 0.0, float(dz * STEP)) for dx, dz in disp]
        mh.translate_face_landmarks(character, [int(i) for i in sel], deltas)
        moved = landmarks(mh, character)[sel] - P[sel]
        log(f"landmarks actually moved mean {np.linalg.norm(moved, axis=1).mean():.3f} cm")
        unreal.EditorAssetLibrary.save_asset(f"{DEST}/MHC_{CID}", only_if_is_dirty=False)
        log("REFINE2D DONE")
    finally:
        if mh.is_object_added_for_editing(character):
            mh.remove_object_to_edit(character)


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[char_refine2d] FAILED: {e}")
finally:
    if os.environ.get("CHAR_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
