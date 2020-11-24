import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { DynamicCard } from '../components';

const ProfileEventsParticipatedWidget = () => {
  const events = useSelector((state: AppState) => state.events);
  const participations = useSelector((state: AppState) => state.participations);

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
            {events.map((evt, idx) => {
              const participation = participations.find(
                (p) => p['Event Code'] === evt['Event Code']
              );

              return (
                <tr key={evt['Event Code']}>
                  <td>{idx + 1}</td>
                  <td>{evt['Event Year']}</td>
                  <td>{evt['Event Code']}</td>
                  <td>{evt['Event Name']}</td>
                  <td>{!participation ? 0 : participation['VIA Hours']}</td>
                  <td> | </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DynamicCard>
  );
};

export { ProfileEventsParticipatedWidget };
