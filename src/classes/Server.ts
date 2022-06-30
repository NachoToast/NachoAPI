import cors from 'cors';
import express, { Express } from 'express';
import { router } from '../routes';
import { Config } from '../types/Config';
import rateLimit from 'express-rate-limit';
import { Global } from './Global';

export class Server {
    private readonly _app: Express = express();

    public constructor() {
        this._app.use(cors());

        this._app.use(express.json());

        const adminTokens = new Set<string>(Global.config.adminTokens);

        // 30 requests per minute
        this._app.use(
            rateLimit({
                windowMs: 60 * 1000,
                max: 30,
                standardHeaders: true,
                legacyHeaders: false,
                skip: (req, res) => {
                    const token = req.get(`RateLimit-Bypass-Token`);
                    if (token === undefined) return false;
                    if (typeof token !== `string`) {
                        res.setHeader(`RateLimit-Bypass-Response`, `Expected string, got '${typeof token}'`);
                        return false;
                    }
                    if (!adminTokens.has(token)) {
                        res.setHeader(`RateLimit-Bypass-Response`, `Invalid`);
                        return false;
                    }
                    res.setHeader(`RateLimit-Bypass-Response`, `Valid`);
                    return true;
                },
            }),
        );

        const modulesEnabled: string[] = [];
        const modulesDisabled: string[] = [];

        for (const m in Global.config.modules) {
            const moduleName = m as keyof Config[`modules`];
            if (!Global.config.modules[moduleName].disabled) {
                modulesEnabled.push(moduleName);
            } else {
                modulesDisabled.push(moduleName);
            }
        }

        const functionality = modulesEnabled.length / (modulesEnabled.length + modulesDisabled.length);

        this._app.get(`/`, (_, res) => {
            res.status(200).json({
                devmode: Global.devmode,
                version: Global.version,
                modulesEnabled,
                modulesDisabled,
                functionality,
            });
        });

        this._app.use(router);

        const listener = this._app.listen(Global.config.port ?? 5000, () => {
            const addressInfo = listener.address();
            if (typeof addressInfo === `string`) {
                console.log(`Listening on ${addressInfo}`);
            } else if (addressInfo === null) {
                console.log(`Listening on port NULL, that doesn't seem right`);
            } else {
                console.log(
                    `Listening on ${addressInfo.address.replace(`::`, `localhost`)}:${addressInfo.port} (${
                        addressInfo.family
                    })`,
                );
            }
        });
    }
}
