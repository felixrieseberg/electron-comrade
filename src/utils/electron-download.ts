import * as download from 'electron-download';
import * as extract from 'extract-zip';
import * as fs from 'fs-extra';
import * as path from 'path';

import { DISTS_DIR } from '../config';

export async function getOrDownloadElectron(version: string): Promise<string> {
  if (!hasDownloadedDist(version)) {
    return downloadElectron(version);
  }

  return getVersionPath(version);
}

export function hasDownloadedDist(version: string) {
  return fs.existsSync(getVersionPath(version));
}

export function getVersionPath(version: string): string {
  return path.join(DISTS_DIR, version);
}

export async function downloadElectron(version: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log(`Downloading Electron v${version}...`);

    download({ version }, async (downloadError: undefined | Error, zipPath: string) => {
      // zipPath will be the path of the zip that it downloaded.
      // If the zip was already cached it will skip
      // downloading and call the cb with the cached zip path.
      // If it wasn't cached it will download the zip and save
      // it in the cache path.
      if (downloadError) {
        return reject(downloadError);
      }

      const target = getVersionPath(version);
      await fs.emptyDir(target);

      console.log(`Unzipping downloaded distribution...`);
      extract(zipPath, { dir: target }, (zipError) => {
        if (zipError) {
          return reject(zipError);
        }

        resolve(target);
      });
    });
  });
}
