import React from 'react';

import { useAuth } from '../hooks';
import { PageHeader } from '../components';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <section>
      <PageHeader>Login to RIVAlumni</PageHeader>

      <p onClick={signInWithGoogle}>Click here to sign in</p>
    </section>
  );
};

export { Login };
