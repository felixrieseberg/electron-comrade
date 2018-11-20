import * as clp from 'clp';
import * as fs from 'fs-extra';

import { IArgs } from '../interfaces';
import { isVersion } from './electron-folder';
import { logHelp } from './help';

export function parseArguments(argv: Array<string> = process.argv): IArgs {
  const parsed = clp(argv);

  const result: IArgs = {
    electron: parsed.e || parsed.electron,
    app: parsed.a || parsed.app
  };

  if (parsed.help || (!result.electron && !result.app)) {
    logHelp();
  }

  const errors = [];

  if (!result.electron) {
    errors.push(`No Electron binary specified. Please pass one with --electron.`);
  }

  if (!result.app) {
    errors.push(`No app. Please pass one with --app.`);
  }

  if (result.electron && result.electron.endsWith('"')) {
    result.electron = result.electron.slice(0, result.electron.length - 1);
  }

  if (result.app && result.app.endsWith('"')) {
    result.app = result.app.slice(0, result.app.length - 1);
  }

  if (!isVersion(result.electron) && !fs.existsSync(result.electron)) {
    errors.push(`Specified Electron path does not exist: ${result.electron}.`);
  }

  if (!fs.existsSync(result.app)) {
    errors.push(`Specified app path does not exist: ${result.app}.`);
  }

  if (errors.length > 0) {
    errors.forEach((err) => console.log(err));
    console.log(`electron-comrade will now exit.`);
    process.exit(0);
  }

  console.log(`Running ${result.app} with ${result.electron}`);

  return result;
}
