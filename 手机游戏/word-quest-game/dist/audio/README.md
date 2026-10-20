# Word Quest original soundtrack

Three newly authored, lyric-free instrumental pieces for this game. All melody,
harmony, arrangement and rendering instructions are in scripts/music/compose.py.
No existing songs or commercial recordings were copied.

| File | Title | Role | Tempo / length |
| --- | --- | --- | --- |
| explore.m4a | 光下的远行 | Spacious piano, harp responses, warm pad; exploration | 80 BPM / 96 s |
| memory.m4a | 把昨天轻轻拾起 | Slower intimate piano with a returning theme; memories | 64 BPM / 90 s |
| study.m4a | 窗边的专注 | Sparse piano and quiet sustained harmony; reading / study | 60 BPM / 96 s |

Stereo 44.1 kHz AAC, requested 160 kbps VBR, rendered with dynamic headroom.
PCM masters use a very short 8 ms edge envelope to suppress loop-boundary clicks.
The player crossfades scene changes over 1.2 s and lowers music to 16% of the
selected level while English speech is active. Music starts after a gesture;
backgrounding the page pauses it. No third-party music service is contacted.

## Instrument sample provenance

Kawai grand piano and concert harp recorded by Versilian Studios / Sam Gossner,
from the Versilian Community Sample Library (VCSL), CC0 1.0:
https://github.com/sgossner/VCSL
Pinned revision: c1ea7bcc3c7309650ab0da9d15c9cd1fbc4a4c7e.
Full original dedication: SAMPLE-LICENSE-CC0.txt.
Exact sample paths and SHA-256 hashes are in score-manifest.json.
Raw WAV instrument samples are downloaded into .cache/music-production/samples
for reproducible rendering; they are not needed during game playback.

## Re-render

Install NumPy in your Python environment, and run from the game folder:
`python3 scripts/music/compose.py`
Rendering currently uses macOS `/usr/bin/afconvert` for AAC encoding. The shipped
M4A files are browser assets; no Python or encoder is needed to run the game.
