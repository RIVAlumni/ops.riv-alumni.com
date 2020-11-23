import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { DynamicCard } from '../components';

const ProfileGeneralDataWidget: React.FC = () => {
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
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Membership ID</div>
          <h5 className='w-100'>{membership['Membership ID']}</h5>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Full Name</div>
          <h5 className='w-100'>{membership['Full Name']}</h5>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Email Address</div>
          <h5 className='w-100'>{membership['Email']}</h5>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Gender</div>
          <h5 className='w-100'>{membership['Gender']}</h5>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Graduating Class</div>
          <h5 className='w-100'>{membership['Graduating Class']}</h5>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Graduating Year</div>
          <h5 className='w-100'>{membership['Graduating Year']}</h5>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Contact Number</div>
          <h5 className='w-100'>{membership['Contact Number']}</h5>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100 font-weight-light'>Home Number</div>
          <h5 className='w-100'>{membership['Home Number']}</h5>
        </div>
      </div>
    </DynamicCard>
  );
};

export { ProfileGeneralDataWidget };
