import copy
import json
from pathlib import Path
import unittest
from living_room_dressing import derive_room_dressing, bottom_aligned_location

ROOT=Path(__file__).resolve().parents[1]
class RoomDressingTests(unittest.TestCase):
    def setUp(self):
        self.mapping=json.loads((ROOT/'Content/Data/memory/kit_assets.json').read_text())
        self.scene=json.loads((ROOT/'Content/Data/memory/textbook_scenes/unit01.json').read_text())['articles'][0]['scenes'][0]
    def test_deterministic_and_non_mutating(self):
        before=copy.deepcopy(self.scene)
        self.assertEqual(derive_room_dressing(self.scene,self.mapping),derive_room_dressing(self.scene,self.mapping))
        self.assertEqual(before,self.scene)
    def test_local_assets_delivered_and_support_ordered(self):
        seen={'existing_bookshelf', *(f'shelf_level_{i}' for i in range(6))}
        for p in derive_room_dressing(self.scene,self.mapping)['items']:
            if p['support']: self.assertIn(p['support'],seen)
            seen.add(p['id'])
            for mesh in p['parts']:
                self.assertTrue((ROOT/'Content'/Path(mesh.removeprefix('/Game/')+'.uasset')).exists(),mesh)
            self.assertLessEqual(p['target_max_m'],3.2 if p['id']=='curtains' else .8)
    def test_centre_approach_and_story_props_clear(self):
        plan=derive_room_dressing(self.scene,self.mapping)
        for p in plan['items']:
            x,y,z=p['pos']
            if p.get('shelf_relative'):
                self.assertLess(abs(x), .60)
                self.assertLess(abs(y), .20)
                continue
            if not p['id'].startswith('seat_'):
                self.assertFalse(abs(x)<.6 and y<1.5)
            self.assertGreater((x-2.6)**2+(y+1.6)**2,1)
        by_id={p['id']:p for p in plan['items']}
        self.assertEqual(by_id['left_cup']['support'],'left_saucer')
        self.assertEqual(by_id['right_pencil']['support'],'right_notepad')
        self.assertEqual(len(by_id['window_plant']['parts']),3)
    def test_seats_and_frame_front(self):
        items={p['id']:p for p in derive_room_dressing(self.scene,self.mapping)['items']}
        self.assertIn('reading_lamp',items)
        self.assertIn('seat_jason',items); self.assertIn('seat_jack',items)
        self.assertNotIn('seat_paul',items)
        self.assertEqual(items['family_frame']['yaw'],180)
        self.assertEqual(items['shelf_top_book_0']['support'],'existing_bookshelf')
        self.assertEqual(len([k for k in items if k.startswith('shelf_inside_')]),60)

    def test_curtains_use_the_final_asset_and_preserve_open_window_view(self):
        plan=derive_room_dressing(self.scene,self.mapping)
        items={p['id']:p for p in plan['items']}
        curtains=items['curtains']
        self.assertEqual(curtains['asset'],'/Game/Memory/Props/Hero/SM_curtains')
        self.assertAlmostEqual(curtains['pos'][0],-2.84)
        self.assertAlmostEqual(curtains['pos'][1],0.5)
        self.assertAlmostEqual(curtains['target_max_m'],3.16)
        self.assertFalse(curtains['collision'])
        self.assertEqual({entry['id'] for entry in plan['missing']},
                         {'family_photographs','curtain_physics'})

    def test_curtain_asset_meets_geometry_and_2k_pbr_contract(self):
        import struct
        manifest_path=ROOT/'SourceArt/Props/Hero/SM_curtains.hero.json'
        self.assertTrue(manifest_path.is_file(),manifest_path)
        manifest=json.loads(manifest_path.read_text())
        self.assertGreaterEqual(manifest['triangles'],200000)
        self.assertEqual(manifest['texture_res'],2048)
        self.assertEqual(manifest['normal_convention'],'OpenGL (flip green in UE)')
        self.assertEqual({slot['slot'] for slot in manifest['slots']},
                         {'linen','tieback','hardware'})
        texture_names={name for slot in manifest['slots'] for name in
                       (slot.get('BaseColor'),slot.get('Normal'),slot.get('ARM')) if name}
        self.assertEqual(len(texture_names),9)
        for name in texture_names:
            image=ROOT/'SourceArt/Props/Hero'/name
            self.assertTrue(image.is_file(),image)
            with image.open('rb') as stream:
                header=stream.read(24)
            self.assertEqual(header[:8],b'\x89PNG\r\n\x1a\n',image)
            self.assertEqual(struct.unpack('>II',header[16:24]),(2048,2048),image)
    def test_other_scene_untouched_and_missing_explicit(self):
        self.assertEqual(derive_room_dressing({'id':'u01a_s2'},{}),{'items':[],'missing':[]})
        plan=derive_room_dressing(self.scene,{})
        self.assertTrue(plan['missing'])
        self.assertNotIn('left_cup',[p['id'] for p in plan['items']])
    def test_asymmetric_pivot_bottom_and_rotated_centre(self):
        loc=bottom_aligned_location([100,200,50],[10,-20,15],[4,6,5],2,90)
        for a,b in zip(loc,[60,180,30]):self.assertAlmostEqual(a,b)
if __name__=='__main__': unittest.main()
