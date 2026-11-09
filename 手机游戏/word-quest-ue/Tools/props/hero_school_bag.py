"""Hero prop: school_bag (D28, unit 1). Blender -b -P Tools/props/hero_school_bag.py"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_u01_small import run  # noqa: E402

run("school_bag")
