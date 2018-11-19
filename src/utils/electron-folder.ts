import * as fs from 'fs-extra';
import * as path from 'path';
import * as semver from 'semver';

import { IArgs } from 'src/interfaces';
import { getOrDownloadElectron } from './electron-download';

export function isVersion(version: string) {
  return semver.valid(version);
}

export async function getElectronFolder({ electron }: IArgs): Promise<string | null> {
  if (isVersion(electron)) {
    return getOrDownloadElectron(electron);
  }

  if (fs.existsSync(electron)) {
    const stats = await fs.stat(electron);

    return stats.isDirectory()
      ? electron
      : path.dirname(electron);
  }

  return null;
}
