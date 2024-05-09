import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';
import { getFunctions } from 'firebase-admin/functions';

/**
 * Singleton Firebase app instance
 *
 * @remarks
 * This is to prevent hot Cloud Functions from crashing
 */
const app = getApps().length ? getApp() : initializeApp();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app);
