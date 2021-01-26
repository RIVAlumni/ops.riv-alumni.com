import React from 'react';

import { Member } from '../../models';

interface IMembershipProfileProps {
  member: Member | undefined;
}

const MembershipProfile: React.FC<IMembershipProfileProps> = ({ member }) => {
  if (!member) return <pre>Unable to retrieve data.</pre>;

  const details = [
    { key: 'Full Name', value: member['Full Name'] },
    { key: 'Gender', value: member['Gender'] },
    { key: 'Email Address', value: member['Email'] },
    { key: 'Contact Number', value: member['Contact Number'] },
    { key: 'Home Number', value: member['Home Number'] },
    { key: 'Current School', value: member['Current School'] },
    { key: 'Graduating Class', value: member['Graduating Class'] },
    { key: 'Graduating Year', value: member['Graduating Year'] },
  ];

  return (
    <React.Fragment>
      {details.map((data) => (
        <div key={data['key']} className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
            <h6>{data['key']}</h6>
          </div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
            <h5 className='w-100'>{data['value'] || '-'}</h5>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default MembershipProfile;
