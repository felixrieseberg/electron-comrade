import * as os from 'os';
import * as path from 'path';

export const RUNTIME_DIR = path.join(os.homedir(), '.electron-comrade');
export const RUNTIMES_DIR = path.join(RUNTIME_DIR, 'runtimes');
export const TEMP_RUNTIMES_DIR = path.join(RUNTIME_DIR, 'temp');
export const DISTS_DIR = path.join(RUNTIME_DIR, 'dists');
