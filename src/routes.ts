import { Router, Request, Response } from 'express';
import { Global } from './classes/Global';
import { routes as SpotifyRoutes } from './modules/Spotify/routes';
import { routes as DiscordRoutes } from './modules/Discord/routes';
import { Config } from './types/Config';

function moduleNotEnabled(moduleName: keyof Config[`modules`]): (req: Request, res: Response) => void {
    return (_, res) => {
        res.status(501).json(`${moduleName[0].toUpperCase() + moduleName.slice(1)} module is not enabled`);
    };
}

const { modules } = Global.config;

const router = Router({ mergeParams: true });

// spotify module
if (!modules.spotify.disabled) {
    SpotifyRoutes(router);
} else {
    router.get(`/spotify`, moduleNotEnabled(`spotify`));
    router.get(`/spotify/*`, moduleNotEnabled(`spotify`));
}

// discord module
if (!modules.discord.disabled) {
    DiscordRoutes(router);
} else {
    router.get(`/discord`, moduleNotEnabled(`discord`));
    router.get(`/discord/*`, moduleNotEnabled(`discord`));
}

export { router };
