import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';

const UsersTableDataWidget: React.FC = memo(() => {
  const users = useSelector(({ remote }: AppState) => remote.users.data);

  if (users.length === 0)
    return (
      <tr>
        <td colSpan={6} className='text-center'>
          No users found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {users.map((u, idx) => (
        <tr key={u['User ID']}>
          <td>{idx + 1}</td>
          <td>{u['Display Name']}</td>
          <td>{u['Email']}</td>
          <td>{u['Membership ID'] ? 'Yes' : 'No'}</td>
          <td> | </td>
        </tr>
      ))}
    </React.Fragment>
  );
});

export { UsersTableDataWidget };
