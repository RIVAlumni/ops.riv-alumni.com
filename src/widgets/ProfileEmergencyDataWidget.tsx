import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { DynamicCard } from '../components';

const ProfileEmergencyDataWidget: React.FC = () => {
  const membership = useSelector((state: AppState) => state.member);

  if (!membership)
    return (
      <pre>
        Error Occurred. Please contact the organising committee for assistance.
      </pre>
    );

  return (
    <DynamicCard>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-12 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Name Of Next-Of-Kin</div>
          <h5 className='w-100'>{membership['Name Of Next-Of-Kin']}</h5>
        </div>

        <div className='col-sm-12 col-md-12 col-lg-12 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>
            Relationship With Next-Of-Kin
          </div>
          <h5 className='w-100'>
            {membership['Relationship With Next-Of-Kin']}
          </h5>
        </div>

        <div className='col-sm-12 col-md-12 col-lg-12 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>
            Contact Number of Next-Of-Kin
          </div>
          <h5 className='w-100'>
            {membership['Contact Number Of Next-Of-Kin']}
          </h5>
        </div>
      </div>
    </DynamicCard>
  );
};

export { ProfileEmergencyDataWidget };
