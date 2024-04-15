import { dev } from '$app/environment';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

import { getApp, getApps, initializeApp } from 'firebase/app';

/**
 * Firebase configuration object
 */
const firebaseConfig = Object.freeze({
  apiKey: 'AIzaSyD6GNLuCF6BmvLlJgcRFjpFmc35fL03SAo',
  authDomain: 'auth.ops.riv-alumni.com',
  databaseURL: 'https://rivalumniops.firebaseio.com',
  projectId: 'rivalumniops',
  storageBucket: 'rivalumniops.appspot.com',
  messagingSenderId: '438307082557',
  appId: '1:438307082557:web:f849e564faf563a547b554',
  measurementId: 'G-NHG5PDGQ96',
});

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/**
 * Firebase services
 */
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app, 'asia-southeast1');

/**
 * Connect to Firebase Emulators if in development mode
 */
if (dev) {
  console.warn(`
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ! DEVELOPMENT MODE DETECTED.          !
    ! IF YOU'RE BUILDING FOR PRODUCTION,  !
    ! THIS SHOULD BE A WARNING!           !
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  `);

  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectStorageEmulator(storage, '127.0.0.1', 9199);
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}
