import React from 'react';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { DynamicCard } from '../components';

const UpcomingEventsWidgetData: React.FC = () => {
  const events = useSelector((state: AppState) => state.events);
  const currentDate = Number(DateTime.local().toFormat('yyyyLLdd'));

  const filteredEvents = events.filter(
    (evt) => evt['Event Code'] >= currentDate
  );

  if (filteredEvents.length === 0)
    return (
      <tr>
        <td colSpan={6} className='text-center'>
          No upcoming events found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {filteredEvents.map((event, idx) => (
        <tr key={event['Event Code']}>
          <td>{idx + 1}</td>
          <td>{event['Event Code']}</td>
          <td>{event['Event Name']}</td>
          <td>{event['Event Overall In-Charge']}</td>
          <td>{event['Event Assistant In-Charge']}</td>
          <td> | </td>
        </tr>
      ))}
    </React.Fragment>
  );
};

const UpcomingEventsWidget: React.FC = () => {
  return (
    <DynamicCard>
      <div className='table-responsive'>
        <table className='table table-hover table-borderless mb-0'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Event Code</th>
              <th>Event Name</th>
              <th>Overall In-Charge</th>
              <th>Assistant In-Charge</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <UpcomingEventsWidgetData />
          </tbody>

          <caption>Note: Limited to 10 results only.</caption>
        </table>
      </div>
    </DynamicCard>
  );
};

export { UpcomingEventsWidget };
