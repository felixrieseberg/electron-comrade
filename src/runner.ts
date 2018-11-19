import { spawn } from 'child_process';
import * as path from 'path';

import { getElectronBin } from './utils/electron-bin';

export function runApp(tempRuntimeDir: string) {
  return new Promise((resolve, reject) => {
    console.log(`Running app...`);

    const bin = path.join(tempRuntimeDir, getElectronBin());

    const child = spawn(bin, [], {
      stdio: 'inherit'
    });

    child.on('exit', resolve);
  });
}
