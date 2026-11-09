"""Regression tests for actual shell locking; launches no UE or compiler."""
import os,shutil,subprocess,tempfile,time,unittest
from pathlib import Path
SOURCE=Path(__file__).with_name('run_ue_serial.sh')
class SerialLockTests(unittest.TestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory();self.root=Path(self.temp.name);(self.root/'Tools').mkdir();(self.root/'Saved').mkdir();self.runner=self.root/'Tools/run_ue_serial.sh';shutil.copyfile(SOURCE,self.runner);self.children=[]
 def tearDown(self):
  for child in self.children:
   if child.poll() is None:child.terminate();child.wait(timeout=5)
  self.temp.cleanup()
 def run_script(self,command):
  p=subprocess.Popen(['bash',str(self.runner)]+command,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);self.children.append(p);return p
 def wait_for(self,condition):
  until=time.monotonic()+5
  while time.monotonic()<until:
   if condition():return
   time.sleep(.02)
  self.fail('lock test setup timed out')
 def test_stale_lock_is_recovered(self):
  lock=self.root/'Saved/ue_run.lock';lock.mkdir();(lock/'pid').write_text('999999999')
  p=self.run_script(['/usr/bin/true']);self.assertEqual(p.wait(timeout=8),0);self.assertFalse(lock.exists())
 def test_queued_build_runs_before_new_editor(self):
  order=self.root/'order';release=self.root/'release';started=self.root/'started'
  holder=self.root/'holder.sh';holder.write_text(f'touch "{started}"\nwhile [ ! -f "{release}" ]; do sleep .05; done\n')
  a=self.run_script(['bash',str(holder)]);self.wait_for(started.exists)
  build=self.root/'Build.sh';build.write_text(f'#!/bin/bash\necho B >> "{order}"\nsleep .1\n');build.chmod(0o700)
  b=self.run_script([str(build)]);self.wait_for(lambda:bool(list((self.root/'Saved').glob('ue_run.lock.build.*'))))
  editor=self.root/'editor.sh';editor.write_text(f'echo E >> "{order}"\n')
  c=self.run_script(['bash',str(editor)]);release.touch()
  for p in (a,b,c):self.assertEqual(p.wait(timeout=18),0)
  self.assertEqual(order.read_text().splitlines(),['B','E']);self.assertFalse((self.root/'Saved/ue_run.lock').exists())
if __name__=='__main__':unittest.main()
