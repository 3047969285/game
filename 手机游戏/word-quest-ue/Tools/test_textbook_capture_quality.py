import tempfile,unittest
from pathlib import Path
from PIL import Image,ImageDraw
from textbook_capture_quality import audit_capture

class CaptureQualityTests(unittest.TestCase):
 def render(self,color,detail=False):
  temp=tempfile.TemporaryDirectory();self.addCleanup(temp.cleanup)
  path=Path(temp.name)/'capture.png';im=Image.new('RGB',(64,32),color)
  if detail:ImageDraw.Draw(im).rectangle((0,0,31,31),fill=(110,120,130))
  im.save(path);return path
 def test_all_zero_pixels_are_failure(self):
  result=audit_capture(self.render((0,0,0)),None)
  self.assertEqual(result['capture_quality'],'FAIL');self.assertEqual(result['black_fraction'],1)
 def test_overexposed_image_is_failure(self):
  result=audit_capture(self.render((205,205,205)),None)
  self.assertTrue(any('overexposed' in issue for issue in result['issues']))
 def test_detailed_midtone_is_pass(self):
  self.assertEqual(audit_capture(self.render((60,70,80),True),None)['capture_quality'],'PASS')
 def test_large_black_region_even_with_valid_mean_is_failure(self):
  path=self.render((0,0,0));im=Image.open(path);ImageDraw.Draw(im).rectangle((0,0,31,31),fill=(140,140,140));im.save(path)
  r=audit_capture(path,None);self.assertTrue(40<r['mean_luma']<170);self.assertEqual(r['capture_quality'],'FAIL')
 def test_uniform_grey_is_not_rendered_scene(self):
  self.assertEqual(audit_capture(self.render((80,80,80)),None)['capture_quality'],'FAIL')
 def test_wrong_resolution_fails(self):
  self.assertEqual(audit_capture(self.render((60,70,80),True))['capture_quality'],'FAIL')

if __name__=='__main__':unittest.main()
