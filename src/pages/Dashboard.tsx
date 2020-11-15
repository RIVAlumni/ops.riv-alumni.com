import React from 'react';

import { UserAccessLevels } from '../models';
import { FirebaseService } from '../services';
import { PageHeader, SectionHeader } from '../components';

import { WidgetGuard } from '../guards';
import { DashboardStatisticsWidget, ProfileStatisticsWidget } from '../widgets';

const Dashboard: React.FC = () => {
  const firebase = FirebaseService.getInstance();

  return (
    <section>
      <PageHeader>Dashboard</PageHeader>
      <p onClick={() => firebase.signOut()}>Click here to logout?</p>

      <WidgetGuard
        role={UserAccessLevels.Editor}
        widget={DashboardStatisticsWidget}
      />

      <SectionHeader>My Profile</SectionHeader>

      <ProfileStatisticsWidget />
    </section>
  );
};

export { Dashboard };
