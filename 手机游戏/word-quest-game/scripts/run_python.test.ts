import { describe, expect, it, vi } from 'vitest';
// @ts-expect-error JavaScript launcher is also used directly by npm.
import { runPython } from './run_python.mjs';

describe('跨平台 Python 启动', () => {
  it('macOS 使用 python3', () => {
    const spawn = vi.fn(() => ({ status: 0 }));
    expect(runPython(['script.py'], { platform: 'darwin', executable: '', spawn })).toBe(0);
    expect(spawn.mock.calls[0]).toEqual(['python3', ['script.py'], { stdio: 'inherit' }]);
  });

  it('Windows 使用 py -3，找不到时回退', () => {
    const spawn = vi.fn()
      .mockReturnValueOnce({ error: { code: 'ENOENT' } })
      .mockReturnValueOnce({ status: 0 });
    expect(runPython(['script.py'], { platform: 'win32', executable: '', spawn })).toBe(0);
    expect(spawn.mock.calls.map(call => call.slice(0, 2))).toEqual([
      ['py', ['-3', 'script.py']], ['python3', ['script.py']],
    ]);
  });

  it('脚本失败时传播退出码，不能换解释器再执行一遍', () => {
    const spawn = vi.fn(() => ({ status: 2 }));
    expect(runPython(['script.py'], { executable: '/path with spaces/python', spawn })).toBe(2);
    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawn.mock.calls[0][0]).toBe('/path with spaces/python');
  });

  it('所有解释器均不存在时给出明确错误', () => {
    const spawn = vi.fn(() => ({ error: { code: 'ENOENT' } }));
    expect(() => runPython(['script.py'], { executable: '', spawn })).toThrow('未找到 Python 3');
  });
});
