import React from 'react';

import { PageHeader } from '../components';
import { FirebaseService } from '../services';

const Login: React.FC = () => {
  const firebase = FirebaseService.getInstance();

  return (
    <section>
      <PageHeader>Login to RIVAlumni</PageHeader>

      <p onClick={() => firebase.signInWithGoogle()}>Click here to sign in</p>
    </section>
  );
};

export { Login };
