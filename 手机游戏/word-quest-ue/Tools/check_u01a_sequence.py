import unreal
seq = unreal.load_asset("/Game/Memory/Sequencer/LS_Unit01A")
tracks = seq.find_tracks_by_exact_type(unreal.MovieSceneCameraCutTrack)
unreal.log_warning(f"[u01a-seq-check] tracks={len(tracks)} bindings={len(seq.get_bindings())} range={seq.get_playback_range()}")
for t in tracks:
    secs = t.get_sections()
    unreal.log_warning(f"[u01a-seq-check] camera cuts={len(secs)}")
    for s in secs:
        r = s.get_range()
        bid = s.get_camera_binding_id()
        unreal.log_warning(f"[u01a-seq-check] section {r.get_start()}-{r.get_end()} camera_binding={bid.to_dict() if hasattr(bid,'to_dict') else bid}")
