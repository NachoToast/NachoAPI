import { Router } from 'express';
import { Bot } from './Bot';
import './Firebase';

export function routes(router: Router) {
    const bot = new Bot();

    router.get(`/uoaadmin`, (req, res) =>
        res.status(200).json(`LDAB base endpoint, bot is ${bot.client.isReady() ? `ONLINE` : `OFFLINE`}`),
    );

    router.post(`/interactionReceive`, (req, res) => {
        console.log(req.body);
        res.sendStatus(200);
    });
}
