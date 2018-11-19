export function logHelp() {
  console.log(`
    electron-comrade: Run Electron apps with different versions of Electron.

    Usage: electron-comrade --electron <path> | <version> --app <path>

    * -e, --electron: Version of Electron or path to an Electron build or distribution
    * -a, --app: Path to an app or a static build of an app
  `);

  process.exit(0);
}
