"""Encode a gentle 12-second looping camera movement from the supplied hero artwork.

Optional tooling only: pip install --target .artifacts/python imageio-ffmpeg
Run from the project root with Python. The website itself needs no Python.
"""
from pathlib import Path
import subprocess
import sys

sys.path.insert(0, str(Path('.artifacts/python').resolve()))
import imageio_ffmpeg

subprocess.run([
    imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-loop', '1',
    '-i', 'public/assets/hero-sculpture.png',
    '-vf', "scale=2400:-1,zoompan=z='1.035+0.025*sin(on*2*PI/288)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=288:s=1600x900:fps=24",
    '-t', '12', '-c:v', 'libx264', '-preset', 'fast', '-crf', '24',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
    'public/assets/hero-loop.mp4',
], check=True)
