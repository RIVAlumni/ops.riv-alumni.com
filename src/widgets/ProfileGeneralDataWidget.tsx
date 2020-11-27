import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { DynamicCard } from '../components';

const ProfileGeneralDataWidget: React.FC = memo(() => {
  const membership = useSelector(({ membership }: AppState) => membership.data);

  if (!membership)
    return (
      <pre>
        Error Occurred. Please contact the organising committee for assistance.
      </pre>
    );

  const profile = [
    { key: 'Membership ID', value: membership['Membership ID'] },
    { key: 'Full Name', value: membership['Full Name'] },
    { key: 'Gender', value: membership['Gender'] },
    { key: 'Email Address', value: membership['Email'] },
    { key: 'Contact Number', value: membership['Contact Number'] },
    { key: 'Home Number', value: membership['Home Number'] },
    { key: 'Current School', value: membership['Current School'] },
    { key: 'Graduating Class', value: membership['Graduating Class'] },
    { key: 'Graduating Year', value: membership['Graduating Year'] },
  ];

  return (
    <DynamicCard>
      {profile.map((data) => (
        <div key={data['key']} className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
            <div className='w-100'>{data['key']}</div>
          </div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
            <h5 className='w-100'>{data['value'] || '-'}</h5>
          </div>
        </div>
      ))}
    </DynamicCard>
  );
});

export { ProfileGeneralDataWidget };
