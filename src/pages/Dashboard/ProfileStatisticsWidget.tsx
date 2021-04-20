import { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { StaticCard } from '../../components';

const ProfileStatisticsWidget: React.FC = memo(() => {
  const pp = useSelector(({ local }: AppState) => local.participations.data);

  const getHoursCompleted = pp.reduce(
    (total, event) => total + event['VIA Hours'],
    0.0
  );

  return (
    <div className='row mb-2'>
      <div className='mb-3 col-sm-12 col-md-6 col-lg-6 col-12'>
        <StaticCard
          icon='fas fa-calendar-alt'
          title='EVENTS COMPLETED'
          value={`${pp.length} Events`}
        />
      </div>

      <div className='mb-3 col-sm-12 col-md-6 col-lg-6 col-12'>
        <StaticCard
          icon='fas fa-clock'
          title='HOURS COMPLETED'
          value={`${getHoursCompleted} Hours`}
        />
      </div>
    </div>
  );
});

export { ProfileStatisticsWidget };
