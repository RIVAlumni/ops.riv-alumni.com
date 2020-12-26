import React, { memo } from 'react';

import { PageHeader, DynamicCard } from '../../components';

const ParticipationsDataWidget: React.FC = memo(() => {
  const pp: unknown[] = [];

  if (pp.length === 0)
    return (
      <tr>
        <td colSpan={5} className='text-center'>
          No participations found.
        </td>
      </tr>
    );

  return (
    <tr>
      <td colSpan={5} className='text-center'>
        Invalid data.
      </td>
    </tr>
  );

  // return (
  //   <React.Fragment>
  //     {pp.map((p, idx) => {
  //       return (
  //         <tr key={`${p['Membership ID']} + ${p['Event Code']}`}>
  //           <td>{idx + 1}</td>
  //           <td>{p['Membership ID']}</td>
  //           <td>{p['Event Code']}</td>
  //           <td>{p['VIA Hours']}</td>
  //           <td> | </td>
  //         </tr>
  //       );
  //     })}
  //   </React.Fragment>
  // );
});

const Participations: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Member Name</th>
                <th>Event Code</th>
                <th>VIA Hours</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <ParticipationsDataWidget />
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Participations };
