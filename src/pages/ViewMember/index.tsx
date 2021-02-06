import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'lodash';
import { tap, map } from 'rxjs/operators';

import { firestore } from 'firebase/app';
import { docData } from 'rxfire/firestore';

import { Member } from '../../models';
import {
  PageHeader,
  DynamicCard,
  SectionHeader,
  LoadingStatus,
} from '../../components';

import EmergencyContact from './EmergencyContact';
import MembershipProfile from './MembershipProfile';
import EventsParticipated from './EventsParticipated';

interface IProfileRouteParams {
  id: string;
}

const ViewMember: React.FC = memo(() => {
  const params = useParams<IProfileRouteParams>();

  const [loading, setLoading] = useState<boolean>(true);
  const [member, setMember] = useState<Member | undefined>();

  useEffect(() => {
    const query = firestore().doc(`members/${params.id}`);
    const sub = docData<Member | undefined>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((data) => (isEmpty(data) ? undefined : data)),
        tap(() => setLoading(false))
      )
      .subscribe(setMember);

    return () => sub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  return (
    <section>
      <PageHeader>Profile</PageHeader>

      <SectionHeader>Membership Profile</SectionHeader>

      <DynamicCard>
        <MembershipProfile member={member} />
      </DynamicCard>

      <SectionHeader>Emergency Contact Details</SectionHeader>

      <DynamicCard>
        <EmergencyContact member={member} />
      </DynamicCard>

      <SectionHeader>Events Participated</SectionHeader>

      <DynamicCard>
        <EventsParticipated member={member} />
      </DynamicCard>
    </section>
  );
});

export default ViewMember;
