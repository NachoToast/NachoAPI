/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from './Config';
import { Server } from './server';

import config from '../config.json';
const version = process.env.npm_package_version || require('../package.json').version;

export const server = new Server(version, config as Config);
