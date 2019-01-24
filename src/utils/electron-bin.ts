import * as fs from 'fs-extra';
import * as path from 'path';

export function getElectronBin(): string {
  switch (process.platform) {
    case 'win32': return 'electron.exe';
    case 'darwin': return `Electron.app/Contents/MacOS/Electron`;
    default: return 'electron';
  }
}
