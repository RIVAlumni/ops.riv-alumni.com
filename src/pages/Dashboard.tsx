import React from 'react';

import { AccessLevels } from '../models';
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
        role={AccessLevels.Editor}
        widget={DashboardStatisticsWidget}
      />

      <SectionHeader>My Profile</SectionHeader>

      <ProfileStatisticsWidget />
    </section>
  );
};

export { Dashboard };
