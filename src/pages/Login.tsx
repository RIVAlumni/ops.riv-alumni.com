import React from 'react';
import { useSelector } from 'react-redux';

import { AppState, FirebaseService } from '../services';
import { PageHeader, LoadingStatus } from '../components';

const Login: React.FC = () => {
  const firebase = FirebaseService.getInstance();
  const loading = useSelector(
    (state: AppState) => state.status.loading.auth_user
  );

  if (loading) return <LoadingStatus />;

  return (
    <section>
      <PageHeader>Login to RIVAlumni</PageHeader>

      <p onClick={() => firebase.signInWithGoogle()}>Click here to sign in</p>
    </section>
  );
};

export { Login };
