import dayjs from 'dayjs';

import { memo, FC, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { DynamicCard } from '../../components';

const RecentEventsWidgetData: FC = memo(() => {
  const events = useSelector(({ remote }: AppState) => remote.events.data);

  const currentDate = Number(dayjs().format('YYYYMMDD'));
  const yearAgoDate = Number(dayjs().subtract(1, 'year').format('YYYYMMDD'));

  const filteredEvents = events.filter(
    (event) =>
      event['Event Code'] >= yearAgoDate && event['Event Code'] <= currentDate
  );

  if (filteredEvents.length === 0)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          No recent events found.
        </td>
      </tr>
    );

  return (
    <Fragment>
      {filteredEvents.map((evt, idx) => (
        <tr key={evt['Event Code']}>
          <td>{idx + 1}</td>
          <td>{evt['Event Code']}</td>
          <td>{evt['Event Name']}</td>
          <td> | </td>
        </tr>
      ))}
    </Fragment>
  );
});

const RecentEventsWidget: React.FC = memo(() => {
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
            <RecentEventsWidgetData />
          </tbody>

          <caption>Note: Limited to 10 results only.</caption>
        </table>
      </div>
    </DynamicCard>
  );
});

export { RecentEventsWidget };
