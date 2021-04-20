import { memo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { of } from 'rxjs';
import { isEmpty } from 'lodash';
import { firestore } from 'firebase/app';
import { docData } from 'rxfire/firestore';
import { tap, map, switchMap } from 'rxjs/operators';

import { FirebaseService } from '../../services';
import { Member, Event, Participation } from '../../models';
import { PageHeader, DynamicCard, LoadingStatus } from '../../components';

interface IViewParticipationProps {
  id: string;
}

const firebase = FirebaseService.getInstance();

const ViewParticipation: React.FC = memo(() => {
  const params = useParams<IViewParticipationProps>();

  const [loading, setLoading] = useState<boolean>(true);
  const [participation, setParticipation] = useState<
    Member & Event & Participation
  >();

  useEffect(() => {
    const query = firestore().doc(`participations/${params.id}`);

    const sub = docData<Member & Event & Participation>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((_prt) => (isEmpty(_prt) ? undefined : _prt)),
        switchMap((_prt) => {
          if (!_prt) return of(undefined);

          return firebase
            .getMemberDoc(_prt['Membership ID'])
            .pipe(map((_member) => ({ ..._prt, ..._member })));
        }),
        switchMap((_prt) => {
          if (!_prt) return of(undefined);

          return firebase
            .getEventDoc(_prt['Event Code'].toString())
            .pipe(map((_event) => ({ ..._prt, ..._event })));
        }),
        tap(() => setLoading(false))
      )
      .subscribe(setParticipation);

    return () => sub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!participation)
    return (
      <section>
        <PageHeader>Participation Not Found.</PageHeader>

        <DynamicCard>
          <pre className='m-0'>
            No participation found. Please check if <b>{params.id}</b> is the
            correct identifer.
          </pre>
        </DynamicCard>
      </section>
    );

  const getRole = (roleId: string) => {
    const roles = participation['Roles'];
    const specificRole = roles.filter((_role) => _role['ID'] === roleId);

    return specificRole.length <= 0
      ? 'Role Not Found.'
      : specificRole[0]['Definition'];
  };

  const details = [
    { key: 'Participation ID', value: participation['Participation ID'] },
    { key: 'Full Name', value: participation['Full Name'] },
    { key: 'Event Code', value: participation['Event Code'] },
    { key: 'Role', value: getRole(participation['Role']) },
    {
      key: 'VIA Hours',
      value: `${participation['VIA Hours'].toFixed(1)} Hours`,
    },
  ];

  return (
    <section>
      <PageHeader>Participation Information</PageHeader>

      <DynamicCard>
        {details.map((detail) => (
          <div key={detail['key']} className='row py-1'>
            <div className='col-sm-12 col-md-6 col-lg-6 align-self-center'>
              <span>{detail['key']}</span>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6'>
              <span className='h5'>{detail['value'] || '-'}</span>
            </div>
          </div>
        ))}
      </DynamicCard>

      <Link
        className='btn btn-dark'
        to={`/manage/participations/${params.id}/edit`}>
        <i className='mr-2 fas fa-pencil-alt' />
        Edit Participation
      </Link>
    </section>
  );
});

export default ViewParticipation;
