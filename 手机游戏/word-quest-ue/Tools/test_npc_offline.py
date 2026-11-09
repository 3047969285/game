"""Checks the local mock fixture without opening UE or reading local credentials.
Native parser and lifecycle coverage live in WordQuestNpcProtocolTests.cpp and
Tools/test_npc_client_mock.py; these tests do not claim native client acceptance.
"""
import http.client
import json
import threading
import unittest
from http.server import ThreadingHTTPServer
from test_npc_client_mock import MockHandler

class MockFixtureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server=ThreadingHTTPServer(('127.0.0.1',0),MockHandler)
        cls.thread=threading.Thread(target=cls.server.serve_forever,daemon=True)
        cls.thread.start()
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown();cls.server.server_close();cls.thread.join()
    def response(self, prompt="offline stream", repairing=False):
        connection=http.client.HTTPConnection('127.0.0.1',self.server.server_port,timeout=2)
        messages=[{'role':'system','content':'You are Paul.'},{'role':'user','content':prompt}]
        if repairing: messages.extend([{'role':'assistant','content':'Invalid response'},{'role':'user','content':'Repeat the reply in character.'}])
        body=json.dumps({'stream':True,'stream_options':{'include_usage':True},'messages':messages})
        connection.request('POST','/chat/completions',body,{'Content-Type':'application/json','Authorization':'Bearer mock-local-only'})
        response=connection.getresponse();data=response.read();connection.close()
        return response.status,data
    def test_fixture_includes_utf8_and_complete_events(self):
        status,data=self.response()
        self.assertEqual(status,200)
        text=data.decode('utf8')
        self.assertIn('你好',text)
        self.assertIn('data: [DONE]\n\n',text)
        self.assertIn('\r\n\r\n',text)
    def test_fixture_metadata_and_usage_are_deterministic(self):
        _,data=self.response()
        events=[line[6:] for line in data.decode().splitlines() if line.startswith('data: ') and line!='data: [DONE]']
        values=[json.loads(x) for x in events]
        self.assertEqual(values[-1]['usage']['total_tokens'],23)
        self.assertEqual(values[-1]['choices'],[])
        content=''.join(x['choices'][0]['delta']['content'] for x in values[:-1])
        speech,metadata=content.rsplit('\n',1)
        self.assertEqual(speech,'A device can wait. Let us talk — 你好.')
        self.assertEqual(len(json.loads(metadata.removeprefix('@@META '))['suggested_replies']),3)
    def test_retry_fixtures(self):
        for prompt,repairing,has_meta in [('repair once',False,False),('repair once',True,True),('repair twice',True,False)]:
            with self.subTest(prompt=prompt,repairing=repairing):
                status,data=self.response(prompt,repairing)
                self.assertEqual(status,200)
                self.assertEqual(b'@@META' in data,has_meta)
        _,data=self.response('future claim')
        self.assertIn(b'2090',data)
        _,data=self.response('future claim',True)
        self.assertNotIn(b'2090',data)
if __name__=='__main__':unittest.main()
