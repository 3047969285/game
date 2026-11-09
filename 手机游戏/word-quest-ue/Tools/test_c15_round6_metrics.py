#!/usr/bin/env python3
import math
import unittest
from c15_round6_metrics import evaluate

class Metrics(unittest.TestCase):
    def test_measured_frequency_and_exposure(self):
        samples = [{'t': i/100, 'bob_z': math.sin(2*math.pi*1.8*i/100)} for i in range(601)]
        exposure = [{'t': i/100, 'exposure': 1 + 2*(1-math.exp(-i/140))} for i in range(1, 1001)]
        result = evaluate({'walk': samples, 'exposure': exposure, 'samples': {'dark_exposure': {'exposure_scale': 1}}})
        self.assertAlmostEqual(result['step_hz'], 1.8, places=2)
        self.assertTrue(result['step_pass'])
        self.assertTrue(result['exposure_pass'])
        self.assertEqual(result['body'], 'not_delivered')
    def test_no_fabricated_measurements(self):
        result = evaluate({'walk': [], 'exposure': [{'t': 1, 'exposure': 1}], 'samples': {'dark_exposure': {'exposure_scale': 1}}})
        self.assertIsNone(result['step_hz'])
        self.assertIsNone(result['exposure_t63_s'])
        self.assertFalse(result['step_pass'])
        self.assertFalse(result['exposure_pass'])

if __name__ == '__main__':
    unittest.main()
