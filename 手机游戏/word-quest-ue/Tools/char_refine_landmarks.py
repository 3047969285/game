"""Claude · character pipeline: refine a conformed MetaHuman face toward the code-fitted target mesh.

MetaHuman's conform-to-custom-mesh leaves ~4-5 px of front-view error on top of the target fit
(DeepSeek D15 report). This pass uses MetaHuman's own sculpting controls: each face landmark is pulled
toward the nearest surface point of the target mesh (ICP-style, damped, a few iterations), so the face
stays a valid MetaHuman identity while matching the target more closely.

Run in the full editor through the project lock (see Docs/tasks/ue-run-rules.md):
  CHAR_ID=me2026 CHAR_WHO=male CHAR_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh \\
      UnrealEditor WordQuestUE.uproject -ExecutePythonScript=Tools/char_refine_landmarks.py -unattended -nosplash
"""
import os

import numpy as np
import unreal

CID = os.environ.get("CHAR_ID", "me2026")
WHO = os.environ.get("CHAR_WHO", "male")
ITERS = int(os.environ.get("REFINE_ITERS", "4"))
STEP = float(os.environ.get("REFINE_STEP", "0.6"))
MAX_CM = float(os.environ.get("REFINE_MAX_CM", "1.5"))
DEST = f"/Game/Characters/{CID}"


def log(m):
    unreal.log_warning(f"[char_refine] {m}")


def nearest_on_mesh(points, verts, tris):
    """closest point on triangle mesh (brute force over the candidate triangles near each point)."""
    out = np.empty_like(points)
    vc = verts[tris].mean(1)
    for i, p in enumerate(points):
        cand = np.argsort(((vc - p) ** 2).sum(1))[:24]
        best, bd = p, 1e18
        for t in cand:
            a, b, c = verts[tris[t]]
            # project onto triangle (barycentric clamp)
            ab, ac, ap = b - a, c - a, p - a
            d1, d2 = ab @ ap, ac @ ap
            n = np.cross(ab, ac); nn = n @ n
            if nn < 1e-12:
                continue
            u = np.cross(ap, ac) @ n / nn; v = np.cross(ab, ap) @ n / nn
            u, v = max(0.0, u), max(0.0, v)
            if u + v > 1:
                s = u + v; u, v = u / s, v / s
            q = a + ab * u + ac * v
            d = ((q - p) ** 2).sum()
            if d < bd:
                best, bd = q, d
        out[i] = best
    return out


def main():
    mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
    character = unreal.load_asset(f"{DEST}/MHC_{CID}")
    target = unreal.load_asset(f"{DEST}/Source/{WHO}_body")
    if character is None or target is None:
        raise RuntimeError("missing MHC or target mesh")
    verts, idx, *_ = mh.get_mesh_data_for_conforming(target)
    V = np.array([[v.x, v.y, v.z] for v in verts], float)
    T = np.array(list(idx), int).reshape(-1, 3)
    # only the head part of the target matters for face landmarks
    head = V[:, 2] > V[:, 2].max() - 35.0
    keep_t = head[T].all(1)
    T = T[keep_t]
    if not mh.try_add_object_to_edit(character):
        raise RuntimeError("cannot edit MHC")
    try:
        for it in range(ITERS):
            L = mh.get_face_landmarks(character)
            if isinstance(L, tuple):
                L = L[0]
            P = np.array([[p.x, p.y, p.z] for p in L], float)
            Q = nearest_on_mesh(P, V, T)
            d = Q - P
            dist = np.linalg.norm(d, axis=1)
            sel = np.where(dist < MAX_CM)[0]
            log(f"iter {it}: {len(P)} landmarks, mean dist {dist.mean():.3f} cm, median {np.median(dist):.3f}, "
                f"moving {len(sel)}")
            if not len(sel):
                break
            deltas = [unreal.Vector(*(d[i] * STEP)) for i in sel]
            mh.translate_face_landmarks(character, [int(i) for i in sel], deltas)
        L = mh.get_face_landmarks(character)
        if isinstance(L, tuple):
            L = L[0]
        P = np.array([[p.x, p.y, p.z] for p in L], float)
        dist = np.linalg.norm(nearest_on_mesh(P, V, T) - P, axis=1)
        log(f"final mean dist {dist.mean():.3f} cm, median {np.median(dist):.3f}")
        unreal.EditorAssetLibrary.save_asset(f"{DEST}/MHC_{CID}", only_if_is_dirty=False)
        log("REFINE DONE")
    finally:
        if mh.is_object_added_for_editing(character):
            mh.remove_object_to_edit(character)


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[char_refine] FAILED: {e}")
finally:
    if os.environ.get("CHAR_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
