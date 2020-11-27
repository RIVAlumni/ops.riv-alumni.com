import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';

const EventsTableDataWidget: React.FC = memo(() => {
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

export { EventsTableDataWidget };
