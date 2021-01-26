import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../services';
import { LoadingStatus, PageHeader, SectionHeader } from '../../components';

import { GeneralDataWidget } from './GeneralDataWidget';
import { EmergencyDataWidget } from './EmergencyDataWidget';
import { EventsParticipatedWidget } from './EventsParticipatedWidget';

const Profile: React.FC = memo(() => {
  const status = useSelector(({ membership }: AppState) => membership.loading);

  if (status) return <LoadingStatus />;

  return (
    <section>
      <PageHeader>Profile Page</PageHeader>

      <SectionHeader>Membership Profile</SectionHeader>

      <GeneralDataWidget />

      <SectionHeader>Emergency Contact Details</SectionHeader>

      <EmergencyDataWidget />

      <SectionHeader>Events Participated</SectionHeader>

      <EventsParticipatedWidget />
    </section>
  );
});

export default Profile;
