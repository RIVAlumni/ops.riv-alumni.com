import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { PageHeader, DynamicCard } from '../../components';

const EventsDataWidget: React.FC = memo(() => {
  const events = useSelector(({ remote }: AppState) => remote.events.data);

  if (events.length === 0)
    return (
      <tr>
        <td colSpan={6} className='text-center'>
          No events found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {events.map((e, idx) => (
        <tr key={e['Event Code']}>
          <td>{idx + 1}</td>
          <td>{e['Event Year']}</td>
          <td>{e['Event Code']}</td>
          <td>{e['Event Name']}</td>
          <td> | </td>
        </tr>
      ))}
    </React.Fragment>
  );
});

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
              <EventsDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Events };
