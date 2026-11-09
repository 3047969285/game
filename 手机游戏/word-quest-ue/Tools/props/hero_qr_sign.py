"""Hero prop: qr_sign (D28, unit 1). Blender -b -P Tools/props/hero_qr_sign.py"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_u01_small import run  # noqa: E402

run("qr_sign")
