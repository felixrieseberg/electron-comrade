import { setupCleanupHandlers } from './cleanup';
import { runApp } from './runner';
import { addTempRuntime, copyInStaticBuild } from './runtime';
import { parseArguments } from './utils/args';

export async function main() {
  const args = parseArguments();
  const tempRuntime = await addTempRuntime(args);

  setupCleanupHandlers(tempRuntime);

  await copyInStaticBuild(args, tempRuntime);
  await runApp(tempRuntime);
}

main().catch((error) => {
  console.warn(error);
});
