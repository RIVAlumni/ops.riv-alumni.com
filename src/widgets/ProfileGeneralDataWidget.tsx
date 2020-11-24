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
          <div className='w-100'>Membership ID</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Membership ID']}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Full Name</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Full Name']}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Gender</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Gender']}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Email Address</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Email'] || '-'}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Contact Number</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Contact Number']}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Home Number</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Home Number'] || '-'}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Current School</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Current School'] || '-'}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Graduating Class</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Graduating Class']}</h5>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <div className='w-100'>Graduating Year</div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
          <h5 className='w-100'>{membership['Graduating Year']}</h5>
        </div>
      </div>
    </DynamicCard>
  );
};

export { ProfileGeneralDataWidget };
