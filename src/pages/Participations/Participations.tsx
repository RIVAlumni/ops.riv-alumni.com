import React from 'react';

import { TableDataWidget } from './TableDataWidget';
import { PageHeader, DynamicCard } from '../../components';

const Participations: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Member Name</th>
                <th>Event Code</th>
                <th>VIA Hours</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <TableDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Participations };
