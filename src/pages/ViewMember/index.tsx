import { memo, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const params = useParams<IProfileRouteParams>();

  const [loading, setLoading] = useState<boolean>(true);
  const [member, setMember] = useState<Member | undefined>();

  const onDelete = () => {
    if (!member) return;
    if (!window.confirm('Are you sure?')) return;

    return firestore()
      .doc(`members/${member['Membership ID']}`)
      .delete()
      .then(() => history.replace('/manage/members'))
      .catch((err) => alert(`An error occurred: ${err}`));
  };

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

  if (!member)
    return (
      <section>
        <PageHeader>Membership Not Found.</PageHeader>

        <DynamicCard>
          <pre className='m-0'>
            No membership found. Please check if <b>{params.id}</b> is the
            correct identifer.
          </pre>
        </DynamicCard>
      </section>
    );

  return (
    <section>
      <PageHeader>Profile</PageHeader>

      <SectionHeader
        linkText='Edit Profile'
        linkTo={`/manage/members/${member['Membership ID']}/edit`}>
        Membership Profile
      </SectionHeader>

      <DynamicCard>
        <MembershipProfile member={member} />
      </DynamicCard>

      <SectionHeader
        linkText='Edit Profile'
        linkTo={`/manage/members/${member['Membership ID']}/edit`}>
        Emergency Contact Details
      </SectionHeader>

      <DynamicCard>
        <EmergencyContact member={member} />
      </DynamicCard>

      <SectionHeader>Events Participated</SectionHeader>

      <DynamicCard>
        <EventsParticipated member={member} />
      </DynamicCard>

      <button onClick={onDelete} className='btn btn-danger'>
        Delete Member
      </button>
    </section>
  );
});

export default ViewMember;
