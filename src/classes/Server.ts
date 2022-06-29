import cors from 'cors';
import express, { Express } from 'express';
import { router } from '../routes';
import { Config } from '../@types/Config';

export class Server {
    public readonly version: string;

    private readonly _app: Express = express();

    public constructor(version: string, config: Config) {
        this.version = version;
        this._app.use(cors());

        this._app.use(express.json());

        const modulesEnabled: string[] = [];
        const modulesDisabled: string[] = [];

        for (const m in config.modules) {
            const moduleName = m as keyof Config['modules'];
            if (!config.modules[moduleName].disabled) {
                modulesEnabled.push(moduleName);
            } else {
                modulesDisabled.push(moduleName);
            }
        }

        const functionality = modulesEnabled.length / (modulesEnabled.length + modulesDisabled.length);

        this._app.get('/', (_, res) => {
            res.status(200).json({
                version,
                modulesEnabled,
                modulesDisabled,
                functionality,
            });
        });

        this._app.use(router);

        this._app.listen(config.port, () => {
            console.log(`Listening on port ${config.port}`);
        });
    }
}
