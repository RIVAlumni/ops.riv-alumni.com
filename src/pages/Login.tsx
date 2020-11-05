import React from 'react';

import { FirebaseService } from '../services';

const Login: React.FC = () => {
  const firebase = FirebaseService.getInstance();

  return (
    <section>
      <p onClick={() => firebase.signInWithGoogle()}>Click here to login.</p>
      <p onClick={() => firebase.signOut()}>Click here to logout.</p>
    </section>
  );
};

export { Login };
