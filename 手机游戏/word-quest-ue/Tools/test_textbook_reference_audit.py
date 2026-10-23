import copy,unittest
from textbook_scene_contract import read_unit
from textbook_reference_audit import reference_audit,require_references

class ReferenceTests(unittest.TestCase):
 def test_units_two_to_six_resolve(self):
  for n in range(2,7):self.assertEqual(reference_audit(read_unit(n))['errors'],[],n)
 def test_missing_article_paragraph_fails(self):
  data=read_unit(2);data['articles'][0]['scenes'][0]['paragraphs']=[999]
  with self.assertRaisesRegex(ValueError,'paragraph'):require_references(data)
 def test_missing_exercise_fails(self):
  data=read_unit(2);data['articles'][0]['scenes'][0]['exercises']=['missing#1']
  with self.assertRaisesRegex(ValueError,'does not exist'):require_references(data)
 def test_missing_exercise_item_fails(self):
  data=read_unit(2);data['articles'][0]['scenes'][0]['exercises']=['u02_a_understanding#999']
  with self.assertRaisesRegex(ValueError,'item'):require_references(data)
 def test_invalid_range_fails(self):
  data=read_unit(2);data['articles'][0]['scenes'][0]['exercises']=['u02_a_understanding#3-1']
  with self.assertRaisesRegex(ValueError,'reversed'):require_references(data)
 def test_section_scope_preserves_vertical_slice(self):
  self.assertEqual(require_references(read_unit(1),'section_a')['status'],'PASS')

if __name__=='__main__':unittest.main()
