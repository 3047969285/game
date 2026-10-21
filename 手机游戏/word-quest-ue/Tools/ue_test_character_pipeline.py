"""Offline safety tests: python3 Tools/ue_test_character_pipeline.py."""
import json
from pathlib import Path
import struct
import tempfile
import unittest
from ue_character_common import VIEWS, character_id, fit_pose
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
