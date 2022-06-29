import axios from 'axios';
import { Request, Response } from 'express';
import { Config } from '../../@types/Config';
import { AccessToken } from './AccessToken';

const {
    port,
    modules: {
        spotify: { clientId, clientSecret },
    },
}: // eslint-disable-next-line @typescript-eslint/no-var-requires
Config = require('../../../config.json');

export async function auth(req: Request, res: Response): Promise<void> {
    const { code, error } = req.query;

    if (error === 'access_denied') {
        res.status(200).json('Decline successful, you can safely close this window.');
    } else if (typeof code === 'string') {
        const body = new URLSearchParams();
        body.set('code', code);
        body.set('redirect_uri', `http://localhost:${port}/spotify/auth`);
        body.set('grant_type', 'authorization_code');

        try {
            const spotifyRequest = await axios.post<AccessToken>('https://accounts.spotify.com/api/token', body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                },
            });

            if (spotifyRequest.status !== 200) throw spotifyRequest;

            res.status(200).json('Success');
        } catch (error) {
            res.status(500).json('Something went wrong');
        }
    } else {
        res.status(400).json('No code, or unrecognized error state');
    }
}
