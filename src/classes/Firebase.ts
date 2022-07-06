import admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';
import { Global } from './Global';

export abstract class Firebase {
    public static readonly app = admin.initializeApp({
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        credential: admin.credential.cert(require(`../../serviceAccountKey.json`)),
        databaseURL: Global.config.databaseURL,
    });

    public static readonly db = getDatabase(this.app);

    public static readonly rootName: string = Global.devmode ? `dev` : `prod`;
}
