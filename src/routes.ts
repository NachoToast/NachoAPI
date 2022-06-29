import { Router, Request, Response } from 'express';
import { routes as SpotifyRoutes } from './modules/Spotify/routes';
import { Config } from './@types/Config';

function moduleNotEnabled(moduleName: keyof Config['modules']): (req: Request, res: Response) => void {
    return (_, res) => {
        res.status(501).json(`${moduleName[0].toUpperCase() + moduleName.slice(1)} module is not enabled`);
    };
}

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
