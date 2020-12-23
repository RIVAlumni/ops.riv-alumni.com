import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { PageHeader, DynamicCard } from '../../components';

const MembersDataWidget: React.FC = memo(() => {
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

const Members: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Members</PageHeader>

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Graduating Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <MembersDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Members };
