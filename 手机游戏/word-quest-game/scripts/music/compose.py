#!/usr/bin/env python3
"""Render three original instrumental scores. Requires NumPy and macOS afconvert.
Raw CC0 instrument samples are fetched at a pinned revision into .cache only.
Run from the game folder: python3 scripts/music/compose.py
"""
import hashlib
import json
import math
import pathlib
import subprocess
import urllib.parse
import urllib.request
import wave
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/audio'
CACHE = ROOT / '.cache/music-production'
SR = 44100
manifest = json.loads((ROOT / 'scripts/music/sample-sources.json').read_text())
sources = []
for item in manifest['samples']:
    if item['instrument'] == 'piano':
        # VCSL's Kawai naming uses C3 for concert middle C (MIDI 60).
        item['midi'] = int(item['file'][7]) * 12 + 24
    path = CACHE / 'samples' / item['file']
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        url = f"https://raw.githubusercontent.com/sgossner/VCSL/{manifest['revision']}/" + urllib.parse.quote(item['path'])
        path.write_bytes(urllib.request.urlopen(url, timeout=60).read())
    item['sha256'] = hashlib.sha256(path.read_bytes()).hexdigest()
    with wave.open(str(path)) as wav:
        assert wav.getsampwidth() == 2 and wav.getframerate() == SR
        sample = np.frombuffer(wav.readframes(wav.getnframes()), '<i2').reshape(-1, wav.getnchannels()).astype(np.float32) / 32768
    active = np.flatnonzero(np.max(np.abs(sample), axis=1) > max(0.0007, np.max(np.abs(sample)) * 0.008))
    if len(active): sample = sample[max(0, active[0] - 180):]
    # Gentle darkening of the sampled piano; retain recorded stereo transients.
    nfft = 1 << (len(sample) - 1).bit_length()
    freq = np.fft.rfftfreq(nfft, 1 / SR)
    lowpass = 1 / np.sqrt(1 + (freq / 4600) ** 6)
    sample = np.fft.irfft(np.fft.rfft(sample, nfft, axis=0) * lowpass[:, None], nfft, axis=0)[:len(sample)].astype(np.float32)
    sample /= max(0.05, float(np.max(np.abs(sample))))
    sources.append((item['instrument'], item['midi'], sample))

# All melodies and voicings below are newly authored for this game.
SCORES = [
 dict(id='explore', title='光下的远行', bpm=80, bars=32, key='D major', wet=.20,
      chords=[[50,57,61,66],[47,54,57,62],[43,50,57,59],[45,52,57,61], [50,57,61,64],[42,49,54,57],[43,50,54,59],[45,52,55,61]],
      melody=[[78,76,73,69],[74,73,69,66],[71,74,78,76],[73,71,69,None], [78,81,78,76],[73,74,76,73],[71,69,66,69],[73,71,69,None]],
      offsets=[0,1.5,2.5,3.25], velocity=.55),
 dict(id='memory', title='把昨天轻轻拾起', bpm=64, bars=24, key='A major / F sharp minor', wet=.29,
      chords=[[42,49,56,57],[50,57,61,64],[45,52,59,61],[40,47,54,56], [42,49,57,61],[50,57,61,66],[47,54,57,61],[40,47,56,59]],
      melody=[[73,None,69,68],[66,69,None,73],[71,None,69,None],[68,66,64,None], [66,69,73,None],[74,None,73,69],[68,66,None,64],[68,None,64,None]],
      offsets=[0,1.5,2.5,3.5], velocity=.42),
 dict(id='study', title='窗边的专注', bpm=60, bars=24, key='C major / A minor', wet=.24,
      chords=[[48,55,62,64],[45,52,59,60],[41,48,55,57],[43,50,57,59], [48,55,59,64],[45,52,60,64],[41,48,55,60],[43,50,55,62]],
      melody=[[None,76,None,74],[72,None,None,71],[69,None,72,None],[71,None,None,None], [76,None,79,None],[76,None,None,72],[74,None,72,None],[71,None,None,None]],
      offsets=[.5,1.5,2.5,3.5], velocity=.34)
]


def write_wav(path, audio):
    with wave.open(str(path), 'wb') as wav:
        wav.setparams((2, 2, SR, len(audio), 'NONE', 'not compressed'))
        wav.writeframes((np.clip(audio, -.999, .999) * 32767).astype('<i2').tobytes())


def render(score):
    rng = np.random.default_rng(20261020 + len(score['id']))
    beat = 60 / score['bpm']
    length = round(score['bars'] * 4 * beat * SR)
    dry = np.zeros((length, 2), np.float32)

    def mix(audio, when, gain=1):
        start = round(when * SR) % length
        amount = min(len(audio), length)
        end = start + amount
        if end <= length: dry[start:end] += audio[:amount] * gain
        else:
            split = length - start
            dry[start:] += audio[:split] * gain
            dry[:amount-split] += audio[split:amount] * gain

    def note(midi, at, duration, velocity, instrument='piano', pan=0):
        available = [(abs(root-midi), root, audio) for kind, root, audio in sources if kind == instrument]
        _, root, audio = min(available, key=lambda value: value[0])
        speed = 2 ** ((midi-root) / 12)
        count = min(round((duration + .85) * SR), int((len(audio)-1) / speed))
        indices = np.arange(count) * speed
        whole = indices.astype(np.int32)
        fraction = (indices-whole).astype(np.float32)[:, None]
        sample = audio[whole] * (1-fraction) + audio[whole+1] * fraction
        t = np.arange(count) / SR
        env = np.minimum(1, t / .007) * np.exp(-np.maximum(0, t-duration) * 6)
        env[-min(count, 600):] *= np.linspace(1, 0, min(count, 600))
        sample *= env[:, None]
        sample[:, 0] *= math.sqrt((1-pan) / 2)
        sample[:, 1] *= math.sqrt((1+pan) / 2)
        mix(sample, at, velocity)

    def pad(chord, at, duration, gain):
        count = round((duration+1.7) * SR)
        t = np.arange(count) / SR
        envelope = np.minimum(1, t/1.4) * np.minimum(1, np.maximum(0, (duration+1.7-t)/2.0))
        stereo = np.zeros((count, 2), np.float32)
        for midi in chord:
            freq = 440 * 2 ** ((midi-69)/12)
            for ch, cents in enumerate([-.0008, .0008]):
                phase = 2*np.pi*freq*(1+cents)*t
                stereo[:, ch] += ((np.sin(phase)+.15*np.sin(2*phase)+.035*np.sin(3*phase))*envelope).astype(np.float32)
        mix(stereo, at, gain / len(chord))

    for bar in range(score['bars']):
        index = bar % 8
        chord = score['chords'][index]
        section = bar // 8
        energy = [0.80, 1.0, .88, .78][section]
        at = bar * 4 * beat
        # A breathed left-hand phrase, voiced to avoid low-mid congestion.
        note(chord[0], at, 2.8*beat, .24*energy, pan=-.2)
        if score['id'] == 'explore':
            pattern = [1,2,3,2,1,3]
            for step, degree in enumerate(pattern):
                note(chord[degree]+12, at+(0.5+step*.5)*beat+rng.uniform(-.012,.012), .7*beat, (.16+rng.uniform(-.02,.02))*energy, pan=-.12)
        else:
            for j, degree in enumerate([1,2,3]):
                note(chord[degree]+12, at+(j*.10+.12)*beat, 2.2*beat, .13*energy, pan=-.16+j*.12)
            if bar % 2 == 1:
                note(chord[2]+12, at+2.7*beat, .9*beat, .11*energy, pan=.14)
        # Theme: actual rests, long notes and answering phrases, not a scale loop.
        if score['id'] != 'study' or bar >= 4:
            for j, midi in enumerate(score['melody'][index]):
                if midi is None: continue
                variation = -12 if score['id'] == 'memory' and section == 0 else 0
                note(midi+variation, at+score['offsets'][j]*beat+rng.uniform(-.018,.018), (1.7 if score['id']=='memory' else 1.1)*beat,
                     score['velocity']*energy*(.88+rng.random()*.15), pan=.16)
        # Sparse sampled harp responses and warm sustained room texture.
        if score['id'] == 'explore' and section in [1,2] and bar % 2 == 0:
            for j, pitch in enumerate([chord[1]+24, chord[2]+24, chord[3]+24]):
                note(pitch, at+(2+j*.5)*beat, 1.3*beat, .12, 'harp', .4)
        if bar % 2 == 0:
            pad([p+12 for p in chord[1:]], at, 7.3*beat, .025 if score['id']=='study' else .035)

    # A diffuse stereo room: short early reflections, no beat-synced echo wash.
    wet = np.zeros_like(dry)
    for delay, gain in [(.041,.13),(.073,.11),(.113,.09),(.181,.075),(.293,.06),(.419,.045),(.617,.035),(.887,.025),(1.237,.018),(1.661,.012)]:
        wet += np.roll(dry[:, ::-1], round(delay*SR), axis=0) * gain
    audio = dry + wet * (score['wet'] / .2)
    audio -= audio.mean(axis=0)
    # Preserve dynamics and stereo; leave ample playback headroom.
    rms = float(np.sqrt(np.mean(audio**2)))
    audio *= .10 / max(.001, rms)
    peak = float(np.max(np.abs(audio)))
    if peak > .76: audio *= .76/peak
    # Keep the musical bar length exact and remove any sub-millisecond
    # discontinuity at the PCM loop boundary without a long silent gap.
    edge = round(.008 * SR)
    ramp = np.sin(np.linspace(0, np.pi/2, edge))**2
    audio[:edge] *= ramp[:, None]
    audio[-edge:] *= ramp[::-1, None]
    wav = CACHE / (score['id']+'.wav')
    write_wav(wav, audio)
    target = OUT / (score['id']+'.m4a')
    subprocess.run(['/usr/bin/afconvert', '-f', 'm4af', '-d', 'aac', '-b', '160000', '-q', '127', str(wav), str(target)], check=True)
    stats = dict(id=score['id'], title=score['title'], bpm=score['bpm'], key=score['key'], bars=score['bars'],
                 duration=length/SR, sampleRate=SR, channels=2, peak=round(float(np.max(np.abs(audio))),5),
                 rms=round(float(np.sqrt(np.mean(audio**2))),5), loopJoinDelta=round(float(np.max(np.abs(audio[0]-audio[-1]))),6),
                 sha256=hashlib.sha256(target.read_bytes()).hexdigest(), bytes=target.stat().st_size)
    # A short ready-to-audition excerpt for the in-app delivery.
    write_wav(CACHE / (score['id']+'-preview.wav'), audio[round(8*4*beat*SR):round(8*4*beat*SR)+18*SR])
    print(json.dumps(stats, ensure_ascii=False), flush=True)
    return stats

OUT.mkdir(exist_ok=True, parents=True)
report = [render(score) for score in SCORES]
(OUT / 'score-manifest.json').write_text(json.dumps(dict(tracks=report, samples=manifest), ensure_ascii=False, indent=2)+'\n')
