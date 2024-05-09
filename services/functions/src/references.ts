import { firestore } from './firebase';

const { doc } = firestore;

export const userRef = (uid: string) => doc(`users/${uid}`);
export const memberRef = (uid: string) => doc(`members/${uid}`);
export const eventRef = (uid: string) => doc(`events/${uid}`);
