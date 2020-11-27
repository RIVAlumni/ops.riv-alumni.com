import React from 'react';

import { UsersTableDataWidget } from '../widgets';
import { PageHeader, DynamicCard } from '../components';

const Users: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Users</PageHeader>

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Member</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <UsersTableDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Users };
