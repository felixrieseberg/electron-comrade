export function getElectronBin() {
  if (process.platform === 'win32') {
    return 'electron.exe';
  } else {
    return 'electron';
  }
}
