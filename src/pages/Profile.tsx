import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { LoadingStatus, PageHeader, SectionHeader } from '../components';
import {
  ProfileGeneralDataWidget,
  ProfileEmergencyDataWidget,
  ProfileEventsParticipatedWidget,
} from '../widgets';

const Profile: React.FC = () => {
  const status = useSelector(({ membership }: AppState) => membership.loading);

  if (status) return <LoadingStatus />;

  return (
    <section>
      <PageHeader>Profile Page</PageHeader>

      <SectionHeader>Membership Profile</SectionHeader>

      <ProfileGeneralDataWidget />

      <SectionHeader>Emergency Contact Details</SectionHeader>

      <ProfileEmergencyDataWidget />

      <SectionHeader>Events Participated</SectionHeader>

      <ProfileEventsParticipatedWidget />
    </section>
  );
};

export { Profile };
