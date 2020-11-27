import React from 'react';

import { EventsTableDataWidget } from '../widgets';
import { PageHeader, DynamicCard } from '../components';

const Events: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Events</PageHeader>

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Event Year</th>
                <th>Event Code</th>
                <th>Event Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <EventsTableDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Events };
