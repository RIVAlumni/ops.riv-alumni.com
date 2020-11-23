import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { LoadingStatus, PageHeader, SectionHeader } from '../components';
import {
  ProfileEmergencyDataWidget,
  ProfileGeneralDataWidget,
} from '../widgets';

const Profile: React.FC = () => {
  const status = useSelector(({ status }: AppState) => status.loading.member);

  if (status) return <LoadingStatus />;

  return (
    <section>
      <PageHeader>Profile Page</PageHeader>

      <SectionHeader>Membership Profile</SectionHeader>

      <ProfileGeneralDataWidget />

      <SectionHeader>Emergency Contact Details</SectionHeader>

      <ProfileEmergencyDataWidget />
    </section>
  );
};

export { Profile };
