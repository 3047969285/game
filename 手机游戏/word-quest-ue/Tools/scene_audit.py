"""Claude · dump every light and every large actor around a textbook set (diagnosing lighting artefacts).

  WQ_AUDIT_SCENE=u01a_s1 ... -ExecutePythonScript=Tools/scene_audit.py   (level given on the command line)
Writes Saved/RoomReview/<scene>/audit.json: lights (class, location, intensity, shadows, attenuation) and
actors whose bounds overlap the set's room box and exceed 1 m in any dimension.
"""
import json
import os
import sys
from pathlib import Path

import unreal as u

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "Tools"))
from textbook_scene_contract import read_unit  # noqa: E402

sid = os.environ.get("WQ_AUDIT_SCENE", "u01a_s1")
scene = next(s for a in read_unit(int(sid[1:3]))["articles"] for s in a["scenes"] if s["id"] == sid)
o = [float(v) * 100 for v in scene["origin"]]
out, lights, big = ROOT / "Saved/RoomReview" / sid, [], []
out.mkdir(parents=True, exist_ok=True)
eas = u.get_editor_subsystem(u.EditorActorSubsystem)
for a in eas.get_all_level_actors():
    loc = a.get_actor_location()
    rel = [loc.x - o[0], loc.y - o[1], loc.z - o[2]]
    if any(abs(v) > 3000 for v in rel[:2]):
        continue
    comps = a.get_components_by_class(u.LightComponent)
    for c in comps:
        lights.append({"actor": a.get_actor_label(), "class": c.get_class().get_name(), "rel_cm": [round(v) for v in rel],
                       "intensity": c.intensity, "shadows": c.cast_shadows,
                       "radius": c.get_editor_property("attenuation_radius") if hasattr(c, "attenuation_radius") else None})
    origin, extent = a.get_actor_bounds(False)
    size = [2 * extent.x, 2 * extent.y, 2 * extent.z]
    if max(size) > 100 and not comps:
        big.append({"actor": a.get_actor_label(), "class": a.get_class().get_name(),
                    "center_rel_cm": [round(origin.x - o[0]), round(origin.y - o[1]), round(origin.z - o[2])],
                    "size_cm": [round(v) for v in size], "tags": [str(t) for t in a.tags][:6]})
(out / "audit.json").write_text(json.dumps({"lights": lights, "large_actors": big}, indent=1, ensure_ascii=False))
u.log_warning(f"[scene_audit] {sid}: {len(lights)} lights, {len(big)} large actors")
u.SystemLibrary.execute_console_command(None, "log flush")
os._exit(0)
