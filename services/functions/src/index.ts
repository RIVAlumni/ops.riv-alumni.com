/**
 * Initialise Firebase Admin SDK
 */
import './firebase';
import { setGlobalOptions } from 'firebase-functions/v2';

setGlobalOptions({
  maxInstances: 1,
  concurrency: 1000,
  timeoutSeconds: 60,
  region: 'asia-northeast1',
});

export * from './auth/beforeUserCreated';
