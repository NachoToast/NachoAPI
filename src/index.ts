/* eslint-disable @typescript-eslint/no-var-requires */
import { Server } from './classes/Server';
import { Config } from './types/Config';

export const config: Config = require('../config.json');
const version = process.env.npm_package_version || require('../package.json').version;

export const server = new Server({ config, version });
