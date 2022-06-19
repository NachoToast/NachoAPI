import { Server } from './classes/Server';
import { Config } from './types/Config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config: Config = require('../config.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = process.env.npm_package_version || require('../package.json').version;

export const server = new Server({ config, version });
