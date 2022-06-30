import axios, { AxiosInstance } from 'axios';
import { Global } from '../../classes/Global';
import { AccessTokenResponse } from './DiscordTypes';
import { discordErrorLogger } from './logger';

const {
    modules: {
        discord: { clientId, clientSecret },
    },
} = Global.config;

export const AuthServer: AxiosInstance = axios.create({
    baseURL: `https://discord.com/api/v9/oauth2`,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
    },
});

export const MainServer: AxiosInstance = axios.create({
    baseURL: `https://discord.com/api/v9`,
    headers: {
        'Content-Type': `application/json`,
    },
});

function makeRequestBody(): URLSearchParams {
    const params = new URLSearchParams();
    params.set(`client_id`, clientId);
    params.set(`client_secret`, clientSecret);

    return params;
}

/** Get a full fledged OAuth access token from a code. */
async function getToken(code: string): Promise<AccessTokenResponse> {
    const body = makeRequestBody();
    body.set(`code`, code);
    body.set(`redirect_uri`, Global.config.modules.discord.redirectURI);
    body.set(`grant_type`, `authorization_code`);

    const { data, status, statusText } = await AuthServer.post<AccessTokenResponse>(`/token`, body);

    if (status !== 200) {
        discordErrorLogger.log(`Got status code ${status} (${statusText}) while trying to get token`, data);
    }

    return data;
}

/** Refresh an OAuth token. */
async function refreshToken(token: string): Promise<AccessTokenResponse> {
    const body = makeRequestBody();
    body.set(`refresh_token`, token);
    body.set(`grant_type`, `refresh_token`);

    const { data, status, statusText } = await AuthServer.post<AccessTokenResponse>(`/token`, body);

    if (status !== 200) {
        discordErrorLogger.log(`Got status code ${status} (${statusText}) while trying to refresh token`, data);
    }

    return data;
}

/** Revoke an OAuth token. */
async function revokeToken(token: string): Promise<boolean> {
    const body = makeRequestBody();
    body.set(`token`, token);

    const { data, status, statusText } = await AuthServer.post<boolean>(`/token/revoke`, body);

    if (status !== 200) {
        discordErrorLogger.log(`Got status code ${status} (${statusText}) while trying to revoke token`, data);
    }

    return data;
}

export const Discord = { getToken, refreshToken, revokeToken };
