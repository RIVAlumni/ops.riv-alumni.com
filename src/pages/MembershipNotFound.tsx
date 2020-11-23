import React from 'react';

import { useAuth } from '../hooks';
import { PageHeader } from '../components';

const MembershipNotFound: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <section>
      <PageHeader>Membership Not Found.</PageHeader>

      <pre>Please contact the organising committee for assistance.</pre>

      <button className='btn btn-dark px-5 py-2' onClick={signOut}>
        Sign Out
      </button>
    </section>
  );
};

export { MembershipNotFound };
