import React from 'react';
import { useSelector } from 'react-redux';

import { useAuth } from '../hooks';
import { AppState } from '../services';
import { PageHeader, LoadingStatus } from '../components';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { loading } = useSelector(({ auth }: AppState) => auth);

  if (loading) return <LoadingStatus />;

  return (
    <section>
      <PageHeader>Login to RIVAlumni</PageHeader>

      <p onClick={signInWithGoogle}>Click here to sign in</p>
    </section>
  );
};

export { Login };
