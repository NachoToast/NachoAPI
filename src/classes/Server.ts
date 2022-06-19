import cors from 'cors';
import express, { Express } from 'express';

export interface ServerProps {
    port: number;
    version: string;
}

export class Server {
    private readonly _app: Express = express();
    public readonly version: string;

    public constructor({ port, version }: ServerProps) {
        this.version = version;
        this._app.use(cors());

        this._app.use(express.json());

        this._app.get('/', (_, res) => {
            res.status(200).json(`NachoAPI version ${this.version}`);
        });

        this._app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
}
