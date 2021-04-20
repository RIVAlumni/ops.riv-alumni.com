import { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { DynamicCard } from '../../components';

const EmergencyDataWidget: React.FC = memo(() => {
  const membership = useSelector(({ membership }: AppState) => membership.data);

  if (!membership)
    return (
      <pre>
        Error Occurred. Please contact the organising committee for assistance.
      </pre>
    );

  const profile = [
    { key: 'Name Of Next-Of-Kin', value: membership['Name Of Next-Of-Kin'] },
    {
      key: 'Relationship With Next-Of-Kin',
      value: membership['Relationship With Next-Of-Kin'],
    },
    {
      key: 'Contact Number Of Next-Of-Kin',
      value: membership['Contact Number Of Next-Of-Kin'],
    },
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

export { EmergencyDataWidget };
