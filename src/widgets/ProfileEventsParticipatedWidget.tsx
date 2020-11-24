import React from 'react';
import { merge } from 'lodash';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { DynamicCard } from '../components';

const ProfileEventsParticipatedData: React.FC = () => {
  const events = useSelector((state: AppState) => state.events);
  const participations = useSelector((state: AppState) => state.participations);

  const result = events.map((e) =>
    merge(
      participations.find((p) => p['Event Code'] === e['Event Code']),
      e
    )
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
};

const ProfileEventsParticipatedWidget = () => {
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
            <ProfileEventsParticipatedData />
          </tbody>
        </table>
      </div>
    </DynamicCard>
  );
};

export { ProfileEventsParticipatedWidget };
