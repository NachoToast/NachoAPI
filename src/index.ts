/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from './@types/Config';
import { Server } from './Server';

import config from '../config.json';
const version = process.env.npm_package_version || require('../package.json').version;

export const server = new Server(version, config as Config);
