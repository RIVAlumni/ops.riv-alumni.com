import { Fragment } from 'react';
import { Member } from '../../models';

interface IEmergencyContactProps {
  member: Member;
}

const EmergencyContact: React.FC<IEmergencyContactProps> = ({ member }) => {
  const details = [
    { key: 'Name Of Next-Of-Kin', value: member['Name Of Next-Of-Kin'] },
    {
      key: 'Relationship With Next-Of-Kin',
      value: member['Relationship With Next-Of-Kin'],
    },
    {
      key: 'Contact Number Of Next-Of-Kin',
      value: member['Contact Number Of Next-Of-Kin'],
    },
  ];

  return (
    <Fragment>
      {details.map((data) => (
        <div key={data['key']} className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6'>
            <h6>{data['key']}</h6>
          </div>

          <div className='col-sm-12 col-md-6 col-lg-6'>
            <h5>{data['value'] ?? '-'}</h5>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default EmergencyContact;
