import { Router } from 'express';
import { getToken, getUserInfo, makeLink, refreshToken, revokeToken } from './handlers';

export function routes(router: Router) {
    router.get(`/discord`, getToken);
    router.post(`/discord/revoke`, revokeToken);
    router.post(`/discord/refresh`, refreshToken);
    router.get(`/discord/success`, (req, res) => res.status(200).json(`Discord login successful`));
    router.post(`/discord/me`, getUserInfo);
    router.get(`/discord/test`, makeLink);
}
