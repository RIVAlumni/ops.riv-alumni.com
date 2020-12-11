import React from 'react';

import { useAuth } from '../../hooks';
import { UserAccessLevels } from '../../models';
import { PageHeader, SectionHeader } from '../../components';

import { WidgetGuard } from '../../guards';
import { RecentEventsWidget } from './RecentEventsWidget';
import { UpcomingEventsWidget } from './UpcomingEventsWidget';
import { SystemStatisticsWidget } from './SystemStatisticsWidget';
import { ProfileStatisticsWidget } from './ProfileStatisticsWidget';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <section>
      <PageHeader>Dashboard</PageHeader>
      <p onClick={signOut}>Click here to logout?</p>

      <WidgetGuard
        role={UserAccessLevels.Editor}
        widget={SystemStatisticsWidget}
      />

      <SectionHeader>My Profile</SectionHeader>

      <ProfileStatisticsWidget />

      <SectionHeader>Upcoming Events</SectionHeader>

      <UpcomingEventsWidget />

      <SectionHeader>Recent Events</SectionHeader>

      <RecentEventsWidget />
    </section>
  );
};

export { Dashboard };
