import React from 'react';

import { DynamicCard, PageHeader, SectionHeader } from '../components';

const Profile: React.FC = () => {
  return (
    <section>
      <PageHeader>Profile Page</PageHeader>

      <SectionHeader>Membership Profile</SectionHeader>

      <DynamicCard>
        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'>
            <div className='w-100 font-weight-light'>Membership ID</div>
            <h5 className='w-100 texxt-monospace'>yzpfkGl1uRvDc1WqIlrz</h5>
          </div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'></div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'></div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'></div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'></div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'></div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'></div>

          <div className='col-sm-12 col-md-6 col-lg-6 mb-2 mb-md-0 mb-lg-0'></div>
        </div>
      </DynamicCard>
    </section>
  );
};

export { Profile };
