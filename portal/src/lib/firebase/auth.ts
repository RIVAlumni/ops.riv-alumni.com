import { dev } from '$app/environment';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '$lib/firebase';

/**
 * Signs in the user using the Google provider.
 * @returns   A promise that resolves with the user credential.
 * @throws    If an unknown error occurs during the sign-in process.
 */
export function signInGoogleProvider() {
  const provider = new GoogleAuthProvider();

  try {
    return signInWithPopup(auth, provider);
  } catch (error) {
    if (dev) console.error(error);
    if (!(error instanceof FirebaseError))
      throw new Error('Unknown error caught');
  }
}

/**
 * Signs out the current user.
 * @returns A Promise that resolves when the sign out operation is complete.
 */
export function signOut() {
  return auth.signOut();
}
