import { Server } from './classes/Server';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { port } = require('../config.json');

export const server = new Server({ port });
