import React, { useEffect, useState } from 'react';
import { collectionData } from 'rxfire/firestore';

import { User } from '../models';
import { FirebaseService } from '../services';
import { PageHeader, DynamicCard } from '../components';

const UsersData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const firebase = FirebaseService.getInstance();
    const ref = firebase.getUsersCol().orderBy('Display Name', 'asc').limit(10);

    const subscription = collectionData<User>(ref).subscribe(setUsers);

    return () => subscription.unsubscribe();
  }, []);

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
};

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
              <UsersData />
            </tbody>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Users };
