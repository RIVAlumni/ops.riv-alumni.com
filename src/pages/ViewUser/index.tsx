import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'lodash';

import { firestore } from 'firebase/app';
import { tap, map } from 'rxjs/operators';
import { docData } from 'rxfire/firestore';

import { User } from '../../models';
import {
  PageHeader,
  DynamicCard,
  SectionHeader,
  LoadingStatus,
} from '../../components';

interface IUserRouteParams {
  id: string;
}

const ViewUser: React.FC = memo(() => {
  const params = useParams<IUserRouteParams>();

  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore().doc(`users/${params.id}`);
    const sub = docData<User | undefined>(query)
      .pipe(
        tap(() => setLoading(true)),
        tap(console.log),
        map((data) => (isEmpty(data) ? undefined : data)),
        tap(() => setLoading(false))
      )
      .subscribe(setUser);

    return () => sub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  return (
    <section>
      <PageHeader>
        {user?.['Display Name']} ({user?.['Membership ID']})
      </PageHeader>

      <SectionHeader>User Information</SectionHeader>

      <DynamicCard>
        <div className='row'>
          <div className='col-6'>User UID</div>
          <div className='col-6'>{user && user['User ID']}</div>
        </div>
      </DynamicCard>
    </section>
  );
});

export default ViewUser;
