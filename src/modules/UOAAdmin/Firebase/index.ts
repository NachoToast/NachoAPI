import admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(`./serviceAccountKey.json`);

export const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://nachoapi-ldab-default-rtdb.asia-southeast1.firebasedatabase.app`,
});

export const db = getDatabase(app);
const ref = db.ref(`server/saving-data/fireblog`);

const usersRef = ref.child(`users`);
usersRef.set({
    alanisawesome: {
        date_of_birth: `June 23, 1912`,
        full_name: `Alan Turing`,
    },
    gracehop: {
        date_of_birth: `December 9, 1906`,
        full_name: `Grace Hopper`,
    },
});
