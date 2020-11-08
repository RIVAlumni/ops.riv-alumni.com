import React from 'react';

import { StaticCard } from '../components';

const ProfileStatisticsWidget: React.FC = () => {
  return (
    <div className='row mb-2'>
      <div className='mb-3 col-sm-12 col-md-6 col-lg-6 col-12'>
        <StaticCard
          icon='fas fa-calendar-alt'
          title='EVENTS COMPLETED'
          value='0 Events'
        />
      </div>

      <div className='mb-3 col-sm-12 col-md-6 col-lg-6 col-12'>
        <StaticCard
          icon='fas fa-clock'
          title='HOURS COMPLETED'
          value='0 Hours'
        />
      </div>
    </div>
  );
};

export { ProfileStatisticsWidget };
