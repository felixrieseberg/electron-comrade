import * as fs from 'fs-extra';
import * as path from 'path';

import { RUNTIMES_DIR, RUNTIME_DIR, TEMP_RUNTIMES_DIR } from './config';
import { IArgs } from './interfaces';
import { getAppFolder } from './utils/app-folder';
import { getElectronFolder } from './utils/electron-folder';

export async function getRuntimeDir() {
  await fs.ensureDir(RUNTIME_DIR);

  return RUNTIME_DIR;
}

export async function getRuntimes() {
  await fs.ensureDir(RUNTIMES_DIR);

  const runtimes = await fs.readdir(RUNTIMES_DIR);

  return runtimes.map((runtime) => ({
    version: runtime,
    path: path.join(RUNTIMES_DIR, runtime)
  }));
}

export async function addTempRuntime(options: IArgs) {
  const sourceDir = await getElectronFolder(options);

  if (!sourceDir) {
    throw new Error(`Source directory not found`);
  }

  const tempDir = path.join(TEMP_RUNTIMES_DIR, Date.now().toString());
  await fs.ensureDir(tempDir);

  console.log(`Creating temporary execution environment...`);
  await fs.copy(sourceDir, tempDir, { filter: copyFilter });
  await fs.remove(path.join(tempDir, 'resources'));

  return tempDir;
}

export async function copyInStaticBuild(options: IArgs, tempRuntimeFolder: string) {
  const source = await getAppFolder(options);
  const target = path.join(tempRuntimeFolder, 'resources');

  console.log(`Creating app symlink...`);
  await fs.symlink(source, target, 'dir');
}

export function copyFilter(src: string): boolean {
  if (/.*(ilk|pdb)$/.test(src)) {
    return false;
  }

  if (/.*(\/|\\)(obj|gen|gen\.runtime|pyproto|angledata|resources)(\/|\\|$).*?/.test(src)) {
    return false;
  }

  return true;
}
