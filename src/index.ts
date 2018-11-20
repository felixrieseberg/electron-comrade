import { setupCleanupHandlers } from './cleanup';
import { IArgs } from './interfaces';
import { runApp } from './runner';
import { addTempRuntime, copyInStaticBuild } from './runtime';
import { parseArguments } from './utils/args';

export async function main() {
  return comrade(parseArguments());
}

export async function comrade(args: IArgs) {
  const tempRuntime = await addTempRuntime(args);

  setupCleanupHandlers(tempRuntime);

  await copyInStaticBuild(args, tempRuntime);
  await runApp(tempRuntime);
}
