import copy,json,unittest
from pathlib import Path
from textbook_scene_contract import read_unit,validate,world_cm,prop_tags,ROOT,kit_surface_role,scene_surface_role,mapped_surface_clutter
class ContractTests(unittest.TestCase):
 def setUp(self): self.data=read_unit(1)
 def test_real_unit_has_three_articles_and_22_sets(self):
  self.assertEqual([len(a['scenes']) for a in self.data['articles']],[8,8,6])
 def test_coordinates_include_origin_once(self): self.assertEqual(world_cm({'origin':[60,2,3]},[1,-2,.5]),[6100.,0.,350.])
 def test_tag_contract(self):
  tags=prop_tags({'id':'s1'},{'kit':'desk','word':'scenario','layer':'then'},2)
  self.assertTrue({'set:s1','layer:then','word:scenario','prop:2','kit:desk'}<=set(tags))
 def test_proxy_geometry_gets_semantic_cc0_surface_role(self):
  self.assertEqual(kit_surface_role('wall'),'plaster')
  self.assertEqual(kit_surface_role('street'),'asphalt')
  self.assertEqual(kit_surface_role('unmapped_prop'),None)
 def test_scene_ground_surface_uses_set_context(self):
  self.assertEqual(scene_surface_role({'props':[{'kit':'street'}]}),'asphalt')
  self.assertEqual(scene_surface_role({'props':[{'kit':'mall_atrium'}]}),'marble')
  self.assertEqual(scene_surface_role({'props':[{'kit':'shared_bike'}]}),'pavement')
  self.assertEqual(scene_surface_role({'props':[{'kit':'armchair'}]}),'wood_floor')
  self.assertEqual(scene_surface_role({'props':[]}),'concrete')
 def test_mapped_tabletop_clutter_is_stable_and_stays_on_surface(self):
  scene={'id':'test_set','origin':[10,0,0],'props':[{'kit':'board_table','pos':[0,0,0],'size':[1.2,.8,.75]}]}
  assets={'office_notepads':'/Game/PolyHaven/Models/office_notepads/SM','tea_set_01':'/Game/PolyHaven/Models/tea_set_01/SM'}
  first=mapped_surface_clutter(scene,assets);second=mapped_surface_clutter(scene,assets)
  self.assertEqual(first,second)
  self.assertEqual(len(first),2)
  for item in first:
   self.assertLessEqual(abs(item['pos'][0]),.6)
   self.assertLessEqual(abs(item['pos'][1]),.4)
   self.assertAlmostEqual(item['pos'][2],.765)
 def test_reject_duplicate_scene(self):
  self.data['articles'][0]['scenes'].append(copy.deepcopy(self.data['articles'][0]['scenes'][0]))
  with self.assertRaises(ValueError):validate(self.data)
 def test_reject_unsafe_kit(self):
  self.data['articles'][0]['scenes'][0]['props'][0]['kit']='../bad'
  with self.assertRaises(ValueError):validate(self.data)
 def test_reject_nonfinite_origin(self):
  self.data['articles'][0]['scenes'][0]['origin'][0]=float('nan')
  with self.assertRaises(ValueError):validate(self.data)
 def test_reject_duplicate_camera(self):
  scene=self.data['articles'][0]['scenes'][0];scene['shots'].append(copy.deepcopy(scene['shots'][0]))
  with self.assertRaises(ValueError):validate(self.data)
 def test_exercise_references_resolve(self):
  exercises=json.loads((ROOT/'Content/Data/textbook/rw3/exercises/unit01.json').read_text())['exercises']; lookup={e['id']:e for e in exercises}
  for a in self.data['articles']:
   for s in a['scenes']:
    for ref in s.get('exercises',[]):
     eid,_,n=ref.partition('#');self.assertTrue(eid in lookup,'Unknown exercise '+eid)
     if n:
      bounds=[int(v) for v in n.split('-')]; expected=range(bounds[0],bounds[-1]+1)
      for number in expected:self.assertIn(number,[i['n'] for i in lookup[eid]['items']])
 def test_paragraph_indexes_resolve(self):
  article_book=json.loads((ROOT/'Content/Data/textbook/rw3/articles/unit01.json').read_text())['texts']
  paragraphs={row['section']:row['paragraphs'] for row in article_book}
  for a in self.data['articles']:
   for s in a['scenes']:
    for n in s['paragraphs']:self.assertLessEqual(n,len(paragraphs[a['section']]),(s['id'],n,len(paragraphs[a['section']])))
if __name__=='__main__':unittest.main()
