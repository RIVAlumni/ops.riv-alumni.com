import React, { memo, useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { tap, map } from 'rxjs/operators';
import { docData } from 'rxfire/firestore';

import { AppState } from '../../services';
import { User, UserAccessLevels } from '../../models';
import {
  PageHeader,
  DynamicCard,
  SectionHeader,
  LoadingStatus,
} from '../../components';

interface IUserRouteParams {
  id: string;
}

interface IMembershipInformationProps {
  user: User;
}

const MembershipInformation: React.FC<IMembershipInformationProps> = memo(
  ({ user }) => {
    if (user['Membership ID'])
      return (
        <Link to={`/manage/members/${user['Membership ID']}/view`}>
          Goto Membership Profile
        </Link>
      );

    return <pre className='m-0'>No Membership Found.</pre>;
  }
);

const ViewUser: React.FC = memo(() => {
  const params = useParams<IUserRouteParams>();
  const currentUser = useSelector(({ auth }: AppState) => auth.user);

  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore().doc(`users/${params.id}`);
    const sub = docData<User | undefined>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((data) => (isEmpty(data) ? undefined : data)),
        tap(() => setLoading(false))
      )
      .subscribe(setUser);

    return () => sub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!user)
    return (
      <section>
        <PageHeader>User Not Found.</PageHeader>

        <pre>Please try again.</pre>
      </section>
    );

  return (
    <section>
      <PageHeader>User Information</PageHeader>

      <DynamicCard>
        <div className='row d-flex flex-row align-items-center'>
          <div className='col-md-3 col-lg-2 text-center my-2 my-md-0'>
            <img
              src={`${user['Photo URL']}`}
              alt='Profile'
              style={{ borderRadius: '50%' }}
            />
          </div>

          <div className='col-md-5 col-lg-6 mb-2 mb-md-0'>
            <h5 className='m-0 font-weight-bold' style={{ lineHeight: 1.5 }}>
              {user['Display Name']}
            </h5>

            <p className='mb-0' style={{ lineHeight: 1.5 }}>
              {user['Email']}
            </p>

            <p className='m-0' style={{ lineHeight: 1.5 }}>
              {UserAccessLevels[user['Access Level']]}
            </p>
          </div>

          <div className='col-md-4 col-lg-4 d-none d-md-block'>
            <div className='btn-group-vertical float-right'>
              <button className='btn btn-dark'>
                <i className='mr-2 fas fa-pencil-alt' />
                Edit User
              </button>

              <button
                className='btn btn-primary'
                disabled={!!currentUser && currentUser['Access Level'] <= 2}>
                <i className='mr-2 fas fa-trash' />
                Delete User
              </button>
            </div>
          </div>

          <div className='col-md-4 col-lg-4 d-md-none'>
            <div className='btn-group w-100'>
              <button className='btn btn-dark'>
                <i className='mr-2 fas fa-pencil-alt' />
                Edit User
              </button>

              <button
                className='btn btn-primary'
                disabled={!!currentUser && currentUser['Access Level'] <= 2}>
                <i className='mr-2 fas fa-trash' />
                Delete User
              </button>
            </div>
          </div>
        </div>
      </DynamicCard>

      <SectionHeader>Membership Information</SectionHeader>

      <DynamicCard>
        <MembershipInformation user={user} />
      </DynamicCard>
    </section>
  );
});

export default ViewUser;
