import cors from 'cors';
import express, { Express } from 'express';
import { router } from '../routes';
import { Config } from '../types/Config';

export interface ServerProps {
    config: Config;
    version: string;
}

export class Server {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    public readonly version: string;

    private readonly _app: Express = express();

    public constructor({ version, config }: ServerProps) {
        this.version = version;
        this._app.use(cors());

        this._app.use(express.json());

        const modulesEnabled = Object.keys(config.modules).filter(
            (e) => config.modules[e as keyof Config['modules']].disabled === false,
        );
        const modulesEnabledCount = Object.values(config.modules).filter((e) => e.disabled === false).length;
        const functionality = Math.floor((100 * modulesEnabledCount) / Object.keys(config.modules).length);
        this._app.get('/', (_, res) => {
            res.status(200).json({
                version,
                modulesEnabled: modulesEnabled.join(','),
                functionality: `${functionality}%`,
            });
        });

        this._app.use(router);

        this._app.listen(config.port, () => {
            console.log(`Listening on port ${config.port}`);
        });
    }
}
