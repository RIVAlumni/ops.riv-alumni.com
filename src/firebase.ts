import { apps, analytics, initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './configs/firebase.json';
import eventStorageConfig from './configs/firebase.json';

function initialize() {
  if (apps.length === 0) return;

  initializeApp(firebaseConfig);
  initializeApp(eventStorageConfig);

  analytics();
}

export { initialize };
