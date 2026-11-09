"""C19 fixed-camera PIE capture, runtime readback and wall-time frame evidence."""
import json, os, sys, time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
LEVEL='/Game/Memory/Scenes/U01/L_U01_A'
CVARS=('r.RayTracing','r.Lumen.HardwareRayTracing','r.MegaLights.EnableForProject','r.MegaLights.Allowed','r.VirtualTextures','r.VirtualTexturedLightmaps','r.DefaultFeature.AutoExposure')
def editor_main(u):
    sys.path.insert(0,str(ROOT/'Tools'))
    from room_review import scene_and_level
    scene,_=scene_and_level('u01a_s1')
    label=os.environ['WQ_C19_LABEL'];out=ROOT/'Saved/Round6/c19';out.mkdir(parents=True,exist_ok=True)
    image=out/(label+'.png'); report=out/(label+'.json')
    les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level(LEVEL)
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    h=[];s={'phase':'start','started':time.monotonic(),'frames':[]}
    def finish(code):
        if h:u.unregister_slate_post_tick_callback(h[0])
        sys.stdout.flush();sys.stderr.flush();os._exit(code)
    def tick(dt):
        try:
            now=time.monotonic()
            if now-s['started']>120:raise RuntimeError('C19 timeout '+s['phase'])
            if s['phase']=='start':les.editor_request_begin_play();s['phase']='world';return
            world=ues.get_game_world()
            if not world:return
            pc=u.GameplayStatics.get_player_controller(world,0);pawn=u.GameplayStatics.get_player_pawn(world,0)
            if not pc or not pawn:return
            if s['phase']=='world':
                origin=scene['origin']
                def cm(p):return u.Vector(*[(float(a)+float(b))*100 for a,b in zip(origin,p)])
                eye=cm([2.5,1.2,1.65]);target=cm([-3.,.4,1.3]);rot=u.MathLibrary.find_look_at_rotation(eye,target)
                pawn.place_view(eye,rot);pc.set_control_rotation(rot)
                assert u.WordQuestRenderDiagnostics.set_test_viewport_size(world,1920,1080)
                s.update(phase='settle',at=now);return
            if s['phase']=='settle':
                if now-s['at']<5:return
                assert u.WordQuestRenderDiagnostics.request_world_capture(world,1920,1080,str(image))
                s.update(phase='capture',at=now);return
            if s['phase']=='capture':
                if not image.exists() or image.stat().st_size<1000:
                    if now-s['at']>30:raise RuntimeError('capture missing')
                    return
                s.update(phase='sample',at=now,last=now);return
            if s['phase']=='sample':
                interval=now-s['last'];s['last']=now
                if 0<interval<2:s['frames'].append(interval)
                if now-s['at']<10:return
                frames=s['frames'];assert len(frames)>=50,'insufficient frame samples'
                ordered=sorted(frames);p99=ordered[min(len(ordered)-1,int(.99*len(ordered)))];elapsed=sum(frames)
                viewport=u.WidgetLayoutLibrary.get_viewport_size(world)
                values={name:u.SystemLibrary.get_console_variable_int_value(name) for name in CVARS}
                caps={str(k):str(v) for k,v in u.WordQuestRenderDiagnostics.capabilities().items()}
                report.write_text(json.dumps({'label':label,'image':str(image),'requested_resolution':[1920,1080], 'viewport_resolution':[viewport.x,viewport.y], 'frame_samples':len(frames),'average_fps':len(frames)/elapsed,'one_percent_low_fps':1/p99,'frame_intervals_seconds':frames,'observed_cvars':values,'capabilities':caps,'note':'PIE callback wall-clock intervals; viewport resolution is reported separately from screenshot resolution.'},indent=2))
                print('WQ_C19_ROUND6_CAPTURED',flush=True);les.editor_request_end_play();finish(0)
        except Exception:
            import traceback;traceback.print_exc();finish(1)
    h.append(u.register_slate_post_tick_callback(tick))
def main():
    sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
    label=os.environ.get('WQ_C19_LABEL','before');log=ROOT/'Saved/Round6/c19'/(label+'.log')
    r=run_locked_editor(__file__,{'WQ_C19_LABEL':label},log,level=LEVEL,total_timeout=420)
    if r.returncode or 'WQ_C19_ROUND6_CAPTURED' not in log.read_text(errors='replace'):raise SystemExit('C19 capture failed: '+str(log))
    print('C19_CAPTURED',label)
if __name__=='__main__':
    try:import unreal
    except ImportError:main()
    else:editor_main(unreal)
