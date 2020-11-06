import React from 'react';

import { PageHeader } from '../components';
import { FirebaseService } from '../services';

const MembershipNotFound: React.FC = () => {
  const firebase = FirebaseService.getInstance();

  return (
    <section>
      <PageHeader>Membership Not Found.</PageHeader>

      <pre>Please contact the organising committee for assistance.</pre>

      <button
        className='btn btn-dark px-5 py-2'
        onClick={() => firebase.signOut()}>
        Sign Out
      </button>
    </section>
  );
};

export { MembershipNotFound };
