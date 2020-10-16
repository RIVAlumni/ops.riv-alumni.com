import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { FirebaseService } from '../services';
import { LoadCurrentUser } from '../states';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const firebase = FirebaseService.getInstance();

  useEffect(() => {
    dispatch(LoadCurrentUser());
  }, [dispatch]);

  return (
    <section>
      <h1>Dashboard</h1>

      <p onClick={() => firebase.signInWithGoogle()}>Click here to login</p>
      <p onClick={() => firebase.signOut()}>Click here to sign out</p>
    </section>
  );
};

export { Dashboard };
