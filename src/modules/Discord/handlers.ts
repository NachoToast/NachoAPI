import { Request, Response } from 'express';
import { Global } from '../../classes/Global';
import { User } from './DiscordTypes';
import { discordErrorLogger } from './logger';
import { Discord, MainServer } from './requesters';

const {
    modules: {
        discord: { clientId },
    },
} = Global.config;

export function makeLink(_req: Request, res: Response): void {
    const scopes = [`identify`].join(`%20`);
    const uri = encodeURIComponent(`http://localhost:5000/discord`);

    const link = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&state=${`fakeState`}&redirect_uri=${uri}&prompt=consent`;

    res.status(200).json(link);
}

/**
 * Upgrades a user's OAuth code into an access token.
 * {@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example API Reference}
 */
export async function getToken(req: Request, res: Response): Promise<void> {
    try {
        const { code, state } = req.query;
        if (typeof code !== `string`) {
            res.status(400).json(`'code' must be a string (got ${typeof code})`);
            return;
        }

        if (typeof state !== `string`) {
            res.status(400).json(`'state' must be a string (got ${typeof state})`);
            return;
        }

        const apiResponse = await Discord.getToken(code);

        res.status(200).json(apiResponse);
    } catch (error) {
        discordErrorLogger.log(error);
        res.sendStatus(500);
    }
}

/**
 * Refreshes a Discord access token.
 * {@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example API Reference}
 */
export async function refreshToken(req: Request, res: Response): Promise<void> {
    try {
        const { refresh_token } = req.body;
        if (typeof refresh_token !== `string`) {
            res.status(400).json(`'refresh_token' must be a string (got ${typeof refresh_token})`);
            return;
        }

        const apiResponse = await Discord.refreshToken(refresh_token);

        res.status(200).json(apiResponse);
    } catch (error) {
        discordErrorLogger.log(error);
        res.sendStatus(500);
    }
}

/** Revokes a Discord access token. */
export async function revokeToken(req: Request, res: Response): Promise<void> {
    try {
        const { token } = req.body;
        if (typeof token !== `string`) {
            res.status(400).json(`body "token" must be a string (got ${typeof token})`);
            return;
        }

        if (!(await Discord.revokeToken(token))) {
            throw new Error(`Revoke token failure`);
        }

        res.sendStatus(200);
    } catch (error) {
        discordErrorLogger.log(error);
        res.sendStatus(500);
    }
}

export async function getUserInfo(req: Request, res: Response): Promise<void> {
    try {
        const { access_token } = req.body;

        if (typeof access_token !== `string`) {
            res.status(400).json(`'access_token' must be a string (got ${typeof access_token})`);
            return;
        }

        const { status, statusText, data } = await MainServer.get<User>(`/users/@me`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (status !== 200) {
            discordErrorLogger.log(`Got status code ${status} (${statusText}) while trying to get token`, data);
        }

        res.status(200).json(data);
    } catch (error) {
        discordErrorLogger.log(error);
        res.sendStatus(500);
    }
}
