import * as fs from 'fs-extra';
import * as path from 'path';

import { IArgs } from 'src/interfaces';

export async function getAppFolder({ app }: IArgs): Promise<string | null> {
  const contents = await fs.readdir(app);

  return contents.indexOf('resources') > -1
    ? path.join(app, 'resources')
    : app;
}
