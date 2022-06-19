import { Router } from 'express';
import { routes as SpotifyRoutes } from './modules/Spotify/routes';
import { moduleNotEnabled } from './helpers/moduleNotEnabled';
import { Config } from './types/Config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { modules }: Config = require('../config.json');

const router = Router({ mergeParams: true });

// spotify module
if (!modules.spotify.disabled) {
    SpotifyRoutes(router);
} else {
    router.get('/spotify', moduleNotEnabled('spotify'));
    router.get('/spotify/*', moduleNotEnabled('spotify'));
}

export { router };
