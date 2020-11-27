import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';

const ParticipationsTableDataWidget: React.FC = memo(() => {
  const participations = useSelector(
    ({ remote }: AppState) => remote.participations.data
  );

  if (participations.length === 0)
    return (
      <tr>
        <td colSpan={6} className='text-center'>
          No participations found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {participations.map((p, idx) => (
        <tr key={`${p['Membership ID']} + ${p['Event Code']}`}>
          <td>{idx + 1}</td>
          <td>{p['Membership ID']}</td>
          <td>{p['Event Code']}</td>
          <td>{p['VIA Hours']}</td>
          <td> | </td>
        </tr>
      ))}
    </React.Fragment>
  );
});

export { ParticipationsTableDataWidget };
