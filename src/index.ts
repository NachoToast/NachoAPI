/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from './@types/Config';
import { Server } from './Server';

const config: Config = require('../config.json');
const version = process.env.npm_package_version || require('../package.json').version;

export const server = new Server(version, config);
