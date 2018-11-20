export function getElectronBin() {
  if (process.platform === 'win32') {
    return 'electron.exe';
  }

  if (process.platform === 'darwin') {
    return `Electron.app/Contents/MacOS/Electron`;
  }
}
