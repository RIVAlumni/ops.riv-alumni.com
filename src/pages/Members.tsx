import React from 'react';

import { MembersTableDataWidget } from '../widgets';
import { PageHeader, DynamicCard } from '../components';

const Members: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Members</PageHeader>

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Graduating Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <MembersTableDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Members };
