import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';

const TableDataWidget: React.FC = memo(() => {
  const members = useSelector(({ remote }: AppState) => remote.members.data);

  if (members.length === 0)
    return (
      <tr>
        <td colSpan={6} className='text-center'>
          No members found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {members.map((m, idx) => (
        <tr key={m['Membership ID']}>
          <td>{idx + 1}</td>
          <td>{m['Full Name']}</td>
          <td>{m['Gender']}</td>
          <td>{m['Graduating Year']}</td>
          <td> | </td>
        </tr>
      ))}
    </React.Fragment>
  );
});

export { TableDataWidget };
