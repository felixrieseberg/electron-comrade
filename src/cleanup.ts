import * as fs from 'fs-extra';

export function cleanup(tempRuntimeFolder: string, attempts: number = 0) {
  if (fs.existsSync(tempRuntimeFolder)) {
    if (attempts === 0) {
      console.log(`Cleaning up temporary execution environment...`);
    }

    try {
      fs.removeSync(tempRuntimeFolder);
    } catch (error) {
      if (attempts < 5) {
        cleanup(tempRuntimeFolder, attempts + 1);
      } else {
        console.log(`Could not cleanup environment. Please delete the temporary folder manually:`);
        console.log(tempRuntimeFolder);
      }
    }
  }
}

export function setupCleanupHandlers(tempRuntimeFolder: string) {
  const cleanupFn = () => cleanup(tempRuntimeFolder);

  process.on('exit', cleanupFn);

  // Catches ctrl+c event
  process.on('SIGINT', cleanupFn);

  // Catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', cleanupFn);
  process.on('SIGUSR2', cleanupFn);

  // Catches uncaught exceptions
  process.on('uncaughtException', cleanupFn);
}
