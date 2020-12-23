import { auth, analytics } from 'firebase/app';

const useAuth = () => {
  const signOut = () => {
    auth()
      .signOut()
      .catch(({ code, message }: auth.AuthError) => {
        console.error(`ERROR (${code}) - ${message}`);
        analytics().logEvent('error_sign_out', { code, message });
      });
  };

  const signInWithGoogle = async () => {
    const provider = new auth.GoogleAuthProvider();

    return auth()
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => auth().signInWithPopup(provider))
      .then((user) => {
        if (user.additionalUserInfo && user.additionalUserInfo.isNewUser)
          return console.log('New user detected.');

        return console.log('Existing user detected.');
      })
      .catch(({ code, message }: auth.AuthError) => {
        console.error(`ERROR (${code}) - ${message}`);
        analytics().logEvent('error_sign_in_google', { code, message });
      });
  };

  return { signOut, signInWithGoogle };
};

export { useAuth };
