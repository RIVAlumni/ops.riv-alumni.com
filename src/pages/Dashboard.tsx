import React from 'react';

import { PageHeader } from '../components';
import { FirebaseService } from '../services';

const Dashboard: React.FC = () => {
  const firebase = FirebaseService.getInstance();

  return (
    <section>
      <PageHeader>Dashboard</PageHeader>

      <p onClick={() => firebase.signOut()}>Click here to logout?</p>
    </section>
  );
};

export { Dashboard };
