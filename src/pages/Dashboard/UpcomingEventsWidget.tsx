import dayjs from 'dayjs';

import { memo, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { DynamicCard } from '../../components';

const UpcomingEventsWidgetData: React.FC = memo(() => {
  const events = useSelector(({ remote }: AppState) => remote.events.data);
  const currentDate = Number(dayjs().format('YYYYMMDD'));

  const filteredEvents = events.filter(
    (evt) => evt['Event Code'] >= currentDate
  );

  if (filteredEvents.length === 0)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          No upcoming events found.
        </td>
      </tr>
    );

  return (
    <Fragment>
      {filteredEvents.map((event, idx) => (
        <tr key={event['Event Code']}>
          <td>{idx + 1}</td>
          <td>{event['Event Code']}</td>
          <td>{event['Event Name']}</td>
          <td> | </td>
        </tr>
      ))}
    </Fragment>
  );
});

const UpcomingEventsWidget: React.FC = memo(() => {
  return (
    <DynamicCard>
      <div className='table-responsive'>
        <table className='table table-hover table-borderless mb-0'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Event Code</th>
              <th>Event Name</th>
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
});

export { UpcomingEventsWidget };
