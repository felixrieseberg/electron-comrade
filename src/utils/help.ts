export function logHelp() {
  console.log(`
    electron-comrade: Run Electron apps with different versions of Electron.

    Usage: electron-comrade --electron <path | version> --app <path>

    * -e, --electron: Version of Electron or path to an Electron build or distribution
    * -a, --app: Path to an app or a static build of an app

    Examples:
    electron-comrade -electron 3.0.9 -app /Applications/Slack.app
    electron-comrade -e 3.0.9 -a /Applications/Slack.app
    electron-comrade -e C:\\electron\\out\\Debug -a ~\\AppData\\Local\\slack\\app-3.3.0
  `);

  process.exit(0);
}
