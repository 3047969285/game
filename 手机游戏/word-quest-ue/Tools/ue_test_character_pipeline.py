"""Offline safety tests: python3 Tools/ue_test_character_pipeline.py."""
import json
from pathlib import Path
import struct
import tempfile
import unittest
from ue_character_common import VIEWS, character_id, fit_pose, character_profile
from ue_render_compare import validate_capture, inherited_lock, archive_capture

class CaptureContract(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.folder=Path(self.temp.name)
        self.capture={'status':'complete','source':'MHC','resolution':[1024,1024],
            'views':{v:{'ortho_width':25 if v=='closeup' else 40} for v in VIEWS}}
        # Minimal IHDR probe; full image decoding is checked on the actual UE output.
        for view in VIEWS:(self.folder/(view+'.png')).write_bytes(b'\x89PNG\r\n\x1a\n'+b'\0'*8+struct.pack('>II',1024,1024))
        self.save()
    def save(self): (self.folder/'capture.json').write_text(json.dumps(self.capture))
    def test_archive_preserves_previous_capture_and_unrelated_files(self):
        (self.folder/'note.txt').write_text('keep')
        archive=self.folder/'history'
        archive_capture(self.folder,archive)
        self.assertTrue((archive/'capture.json').is_file())
        self.assertEqual((self.folder/'note.txt').read_text(),'keep')
        self.assertFalse((self.folder/'front.png').exists())
        self.assertTrue((archive/'front.png').is_file())
    def test_reuse_only_ancestor_lock(self):
        self.assertTrue(inherited_lock(10,{30:20,20:10,10:1},30))
        self.assertFalse(inherited_lock(99,{30:20,20:10,10:1},30))
        self.assertFalse(inherited_lock(99,{30:20,20:30},30))
    def test_import_plan_owns_only_blueprints_and_preserves_source_hash(self):
        from unittest.mock import patch
        from ue_import_character import import_plan
        (self.folder/'male_groom.abc').write_bytes(b'fixture')
        (self.folder/'male_brows.abc').write_bytes(b'brows')
        with patch('ue_import_character.export_dir',return_value=self.folder):
            plan=import_plan('me2026')
        self.assertEqual(len(plan['files']),2)
        self.assertTrue(plan['destination'].startswith('/Game/Blueprints/'))
        self.assertEqual(plan['conversion']['scale'],[100,100,-100])
        self.assertEqual(plan['conversion']['rotation'],[-90,0,0])
        self.assertEqual(len(plan['files'][0]['sha256']),64)
    def test_missing_groom_fails_before_editor_start(self):
        from unittest.mock import patch
        from ue_import_character import import_plan
        with patch('ue_import_character.export_dir',return_value=self.folder):
            with self.assertRaises(FileNotFoundError):import_plan('me2026')
    def test_build_and_editor_commands_share_lock(self):
        from unittest.mock import patch
        from ue_character_common import run_locked_command
        with patch('ue_character_common.ROOT',self.folder), patch('subprocess.check_output',return_value='200 100\n100 1\n'), patch('os.getpid',return_value=200), patch('subprocess.run') as run:
            run_locked_command(['Build.sh','WordQuestUEEditor'],{},self.folder/'build.log')
            self.assertEqual(run.call_args.args[0][0],'bash')
            self.assertTrue(run.call_args.args[0][1].endswith('run_ue_serial.sh'))
            self.assertEqual(run.call_args.kwargs['env']['UE_LOCK_WHO'],'codex')
            lock=self.folder/'Saved/ue_run.lock/pid';lock.parent.mkdir(parents=True);lock.write_text('100')
            run_locked_command(['UnrealEditor','-ExecutePythonScript=test.py'],{},self.folder/'editor.log')
            self.assertEqual(run.call_args.args[0][0],'UnrealEditor')
            lock.write_text('999')
            run_locked_command(['UnrealEditor'],{},self.folder/'other.log')
            self.assertEqual(run.call_args.args[0][0],'bash')
    def test_cast_height_and_who(self):
        p=self.folder/'mei_cast.json';p.write_text('{"height_m":1.63}')
        profile=character_profile('mei',self.folder)
        self.assertEqual(profile['who'],'mei');self.assertEqual(profile['height_cm'],163)
        p.write_text('{"height_m":NaN}')
        with self.assertRaises(ValueError):character_profile('mei',self.folder)
    def test_missing_cast_height_fails_instead_of_using_female(self):
        with self.assertRaises(FileNotFoundError):character_profile('mei',self.folder)
    def test_cast_no_fit_defaults_without_roll(self):
        import unittest.mock
        with unittest.mock.patch('pathlib.Path.is_file',return_value=False):
            self.assertEqual(fit_pose('an')[0],[37,0,0])
    def test_complete_mhc(self): self.assertEqual(validate_capture(self.folder,True)['source'],'MHC')
    def test_source_fallback_rejected(self):
        self.capture['source']='Source';self.save()
        with self.assertRaisesRegex(RuntimeError,'MHC'):validate_capture(self.folder,True)
    def test_incomplete_rejected(self):
        self.capture['status']='rendering';self.save()
        with self.assertRaisesRegex(RuntimeError,'Incomplete'):validate_capture(self.folder,True)
    def test_fullbody_in_portrait_slot_rejected(self):
        self.capture['views']['front']['ortho_width']=220;self.save()
        with self.assertRaisesRegex(RuntimeError,'framing'):validate_capture(self.folder,True)
    def test_corrupt_image_rejected(self):
        (self.folder/'side.png').write_bytes(b'bad')
        with self.assertRaisesRegex(RuntimeError,'PNG'):validate_capture(self.folder,True)
    def test_missing_view_rejected(self):
        (self.folder/'back.png').unlink()
        with self.assertRaises(FileNotFoundError):validate_capture(self.folder,True)
    def test_wrong_resolution_rejected(self):
        (self.folder/'front.png').write_bytes(b'\x89PNG\r\n\x1a\n'+b'\0'*8+struct.pack('>II',512,512))
        with self.assertRaisesRegex(RuntimeError,'PNG'):validate_capture(self.folder,True)
    def test_id_cannot_escape_output_directory(self):
        for value in ('../lin','/tmp/lin','lin/../../','', 'a'*65):
            with self.assertRaises(ValueError):character_id(value)
    def test_fit_uses_file_pose_and_checksum(self):
        fit=self.folder/'fit.json';fit.write_text('{"pose_q34":[37,3,-9]}')
        pose,path,sha=fit_pose('me2026',str(fit));self.assertEqual(pose,[37,3,-9]);self.assertEqual(len(sha),64)
        fit.write_text('{"pose_q34":[37,3,NaN]}')
        with self.assertRaises(ValueError):fit_pose('me2026',str(fit))
    def test_explicit_missing_fit_is_error(self):
        with self.assertRaises(FileNotFoundError):fit_pose('lin',str(self.folder/'missing.json'))

if __name__=='__main__':unittest.main()
