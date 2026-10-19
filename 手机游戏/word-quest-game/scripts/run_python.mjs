import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export function runPython(args, {
  platform = process.platform,
  executable = process.env.PYTHON,
  spawn = spawnSync,
} = {}) {
  const candidates = executable
    ? [[executable]]
    : platform === 'win32'
      ? [['py', '-3'], ['python3'], ['python']]
      : [['python3'], ['python']];

  for (const [command, ...prefix] of candidates) {
    const result = spawn(command, [...prefix, ...args], { stdio: 'inherit' });
    if (result.error?.code === 'ENOENT') continue;
    if (result.error) throw result.error;
    return result.status ?? 1;
  }
  throw new Error('未找到 Python 3，请安装 Python 3 或用 PYTHON 指定解释器路径。');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = runPython(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
