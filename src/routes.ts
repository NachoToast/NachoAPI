import { Router, Request, Response } from 'express';
import { Global } from './classes/Global';
import { routes as SpotifyRoutes } from './modules/Spotify/routes';
import { routes as DiscordRoutes } from './modules/Discord/routes';
import { routes as UOAAdminRoutes } from './modules/UOAAdmin/routes';
import { Config } from './types/Config';

function moduleNotEnabled(router: Router, moduleName: keyof Config[`modules`]): void {
    const notEnabled = (req: Request, res: Response) =>
        res.status(501).json(`${moduleName[0].toUpperCase() + moduleName.slice(1)} module is not enabled`);

    router.get(`/${moduleName}`, notEnabled);
    router.get(`/${moduleName}/*`, notEnabled);
    router.post(`/${moduleName}`, notEnabled);
    router.post(`/${moduleName}/*`, notEnabled);
}

const { modules } = Global.config;

const router = Router({ mergeParams: true });

// spotify module
if (!modules.spotify.disabled) {
    SpotifyRoutes(router);
} else {
    moduleNotEnabled(router, `spotify`);
}

// discord module
if (!modules.discord.disabled) {
    DiscordRoutes(router);
} else {
    moduleNotEnabled(router, `discord`);
}

// ldab module
if (!modules.uoaAdmin.disabled) {
    UOAAdminRoutes(router);
} else {
    moduleNotEnabled(router, `uoaAdmin`);
}

export { router };
