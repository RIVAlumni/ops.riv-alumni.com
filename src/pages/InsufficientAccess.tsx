import React from 'react';

import { PageHeader } from '../components';

const InsufficientAccess: React.FC = () => {
  return (
    <section>
      <PageHeader>Insufficient Access.</PageHeader>

      <pre>You do not have sufficient permissions to view this page.</pre>
    </section>
  );
};

export { InsufficientAccess };
