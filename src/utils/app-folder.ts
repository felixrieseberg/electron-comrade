import * as fs from 'fs-extra';
import * as path from 'path';

import { IArgs } from 'src/interfaces';

export function getResourcesDirFromRoot(input: string) {
  if (process.platform === 'darwin') {
    return path.join(input, 'Electron.app', 'Contents', 'Resources');
  }

  if (process.platform === 'win32') {
    return path.join(input, 'resources');
  }
}

export async function getAppFolder(options: IArgs): Promise<string | null> {
  if (process.platform === 'win32') {
    return getAppFolderWin(options);
  }

  if (process.platform === 'darwin') {
    return getAppFolderMac(options);
  }
}

export async function getAppFolderMac({ app }: IArgs): Promise<string | null> {
  return app.endsWith('.app')
    ? path.join(app, 'Contents', 'Resources')
    : app;
}

export async function getAppFolderWin({ app }: IArgs): Promise<string | null> {
  const contents = await fs.readdir(app);

  return contents.indexOf('resources') > -1
    ? getResourcesDirFromRoot(app)
    : app;
}
