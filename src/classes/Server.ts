import cors from 'cors';
import express, { Express } from 'express';

export interface ServerProps {
    port: number;
}

export class Server {
    private unusedThing = '';
    private readonly _app: Express = express();

    public constructor({ port }: ServerProps) {
        this._app.use(cors());

        this._app.use(express.json());

        this._app.get('/', (_, res) => {
            res.sendStatus(200);
        });

        this._app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
}
