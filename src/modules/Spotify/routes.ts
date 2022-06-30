import { Router } from 'express';
import { auth } from './auth';

export function routes(router: Router) {
    router.get(`/spotify`, (req, res) => res.status(200).json(`Spotify base endpoint`));
    router.get(`/spotify/auth`, auth);
}
