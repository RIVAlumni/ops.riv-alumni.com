import React, { memo } from 'react';

import { PageHeader, DynamicCard } from '../../components';

const UsersDataWidget: React.FC = memo(() => {
  const users: unknown[] = [];

  if (users.length === 0)
    return (
      <tr>
        <td colSpan={6} className='text-center'>
          No users found.
        </td>
      </tr>
    );

  return (
    <tr>
      <td colSpan={6} className='text-center'>
        Invalid data.
      </td>
    </tr>
  );

  // return (
  //   <React.Fragment>
  //     {users.map((u, idx) => (
  //       <tr key={u['User ID']}>
  //         <td>{idx + 1}</td>
  //         <td>{u['Display Name']}</td>
  //         <td>{u['Email']}</td>
  //         <td>{u['Membership ID'] ? 'Yes' : 'No'}</td>
  //         <td> | </td>
  //       </tr>
  //     ))}
  //   </React.Fragment>
  // );
});

const Users: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Users</PageHeader>

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Member</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <UsersDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Users };
