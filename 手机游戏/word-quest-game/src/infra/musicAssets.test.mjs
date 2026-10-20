import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
const base = new URL('../../public/audio/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('score-manifest.json', base), 'utf8'));
describe('实际配乐交付资产', () => {
  it('三首完整曲目均包含 AAC 音轨，文件校验和与制作报告相符', () => {
    expect(manifest.tracks.map(track => track.id)).toEqual(['explore', 'memory', 'study']);
    const hashes = new Set();
    for (const track of manifest.tracks) {
      const bytes = readFileSync(new URL(`${track.id}.m4a`, base));
      expect(bytes.length).toBe(track.bytes);
      expect(bytes.toString('ascii', 4, 8)).toBe('ftyp');
      expect(bytes.includes(Buffer.from('mp4a'))).toBe(true);
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hash).toBe(track.sha256); hashes.add(hash);
      expect(track.duration).toBeGreaterThanOrEqual(90);
      expect(track.duration).toBeLessThanOrEqual(100);
      expect(track.channels).toBe(2);
      expect(track.sampleRate).toBe(44100);
      expect(track.peak).toBeLessThan(.8);
      expect(track.rms).toBeGreaterThan(.05);
      expect(track.loopJoinDelta).toBeLessThan(.0001);
    }
    expect(hashes.size).toBe(3);
  });
  it('采样来源已固定版本和哈希，附原始 CC0 许可', () => {
    expect(manifest.samples.revision).toMatch(/^[a-f0-9]{40}$/);
    expect(manifest.samples.license).toBe('CC0-1.0');
    for (const sample of manifest.samples.samples) expect(sample.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(readFileSync(new URL('SAMPLE-LICENSE-CC0.txt', base), 'utf8')).toContain('CC0 1.0 Universal');
  });
});
