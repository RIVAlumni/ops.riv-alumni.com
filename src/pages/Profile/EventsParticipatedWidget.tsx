import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { from } from 'rxjs';
import { map, take, filter, switchMap, toArray } from 'rxjs/operators';

import { AppState } from '../../services';
import { DynamicCard } from '../../components';
import { Event, Participation } from '../../models';

const EventsParticipatedData: React.FC = memo(() => {
  const [result, setResult] = useState<(Event & Participation)[]>([]);

  const events = useSelector(({ remote }: AppState) => remote.events.data);
  const participations = useSelector(
    ({ local }: AppState) => local.participations.data
  );

  useEffect(() => {
    from(events)
      .pipe(
        filter(() => events.length > 0 && participations.length > 0),
        switchMap((e) =>
          from(participations).pipe(
            filter((p) => p['Event Code'] === e['Event Code']),
            map((p) => ({ ...e, ...p }))
          )
        ),
        toArray(),
        filter((c) => c.length > 0),
        take(events.length)
      )
      .subscribe(setResult);
  }, [events, participations]);

  if (result.length === 0)
    return (
      <tr>
        <td colSpan={6} className='text-center'>
          No events participated.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {result.map((r, idx) => (
        <tr key={r['Event Code']}>
          <td>{idx + 1}</td>
          <td>{r['Event Year']}</td>
          <td>{r['Event Code']}</td>
          <td>{r['Event Name']}</td>
          <td>{r['VIA Hours'] || 0}</td>
          <td> | </td>
        </tr>
      ))}
    </React.Fragment>
  );
});

const EventsParticipatedWidget: React.FC = memo(() => {
  return (
    <DynamicCard>
      <div className='table-responsive'>
        <table className='table table-hover table-borderless mb-0'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Event Year</th>
              <th>Event Code</th>
              <th>Event Name</th>
              <th>VIA Hours</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <EventsParticipatedData />
          </tbody>
        </table>
      </div>
    </DynamicCard>
  );
});

export { EventsParticipatedWidget };
