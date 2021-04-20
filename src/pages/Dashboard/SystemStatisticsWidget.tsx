import { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { StaticCard } from '../../components';

const SystemStatisticsWidget: React.FC = memo(() => {
  const {
    usersCount,
    membersCount,
    eventsCount,
    participationsCount,
  } = useSelector(({ remote }: AppState) => remote.aggregations.data);

  return (
    <div className='row mb-2'>
      <div className='mb-3 col-sm-12 col-md-6 col-lg-3 col-12'>
        <StaticCard
          icon='fas fa-user'
          title='USERS'
          value={String(usersCount)}
        />
      </div>

      <div className='mb-3 col-sm-12 col-md-6 col-lg-3 col-12'>
        <StaticCard
          icon='fas fa-users'
          title='MEMBERS'
          value={String(membersCount)}
        />
      </div>

      <div className='mb-3 col-sm-12 col-md-6 col-lg-3 col-12'>
        <StaticCard
          icon='fas fa-calendar-alt'
          title='EVENTS'
          value={String(eventsCount)}
        />
      </div>

      <div className='mb-3 col-sm-12 col-md-6 col-lg-3 col-12'>
        <StaticCard
          icon='fas fa-clock'
          title='PARTICIPATIONS'
          value={String(participationsCount)}
        />
      </div>
    </div>
  );
});

export { SystemStatisticsWidget };
