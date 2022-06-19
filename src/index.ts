import { Server } from './classes/Server';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { port } = require('../config.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = process.env.npm_package_version || require('../package.json').version;

export const server = new Server({ port, version });
