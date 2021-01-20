import React, { memo, useRef, useEffect, useState } from 'react';

import { firestore } from 'firebase/app';
import { Link } from 'react-router-dom';

import { collectionData } from 'rxfire/firestore';
import { BehaviorSubject, of, combineLatest } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { FirebaseService } from '../../services';
import { Member, Participation } from '../../models';
import { DynamicCard, PageHeader, SearchField } from '../../components';
import { QUERY_LIMIT, MAX_VIA_HOURS, MAX_EVENT_CODE } from '../../constants';

interface IRenderLoadingProps {
  loading: boolean;
}

interface IRenderDataProps {
  data: (Member & Participation)[];
  loading: boolean;
}

const firebase = FirebaseService.getInstance();
const onSearch$ = new BehaviorSubject<number>(0);
const baseRef = firestore().collection('participations');

const RenderLoading: React.FC<IRenderLoadingProps> = memo(({ loading }) => {
  if (loading)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          Loading...
        </td>
      </tr>
    );

  return null;
});

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          No participants found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {data.map((prt) => (
        <tr key={prt['Membership ID'] + prt['Event Code']}>
          <td>
            <Link
              className='text-dark text-truncate'
              to={`/manage/members/${prt['Membership ID']}`}>
              {prt['Full Name']}
            </Link>
          </td>
          <td>{prt['Event Code']}</td>
          <td>{prt['Role']}</td>
          <td>{prt['VIA Hours']}</td>
        </tr>
      ))}
    </React.Fragment>
  );
});

const Participants: React.FC = memo(() => {
  const lastDoc = useRef<Participation | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<(Member & Participation)[]>([]);

  const adjustCursors = (docs: Participation[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getParticipations = (eventCode: number) => {
    if (eventCode > 0) {
      const query = baseRef
        .where('Event Code', '==', eventCode)
        .orderBy('VIA Hours', 'desc')
        .startAfter(lastDoc.current || MAX_VIA_HOURS)
        .limit(QUERY_LIMIT);

      return collectionData<Participation>(query);
    }

    const query = baseRef
      .orderBy('VIA Hours', 'desc')
      .orderBy('Event Code', 'desc')
      .startAfter(lastDoc.current || MAX_EVENT_CODE)
      .limit(QUERY_LIMIT);

    return collectionData<Participation>(query);
  };

  const getFullParticipation = (participations: Participation[]) => {
    if (participations.length === 0) return of([]);

    return combineLatest(
      participations.map((participation) =>
        firebase
          .getMemberDoc(participation['Membership ID'])
          .pipe(map((member) => ({ ...member, ...participation })))
      )
    );
  };

  useEffect(() => {
    setTimeout(() => onSearch$.next(0), 3000);
  }, []);

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        tap(() => console.log('lastDoc Before', lastDoc.current)),
        switchMap(getParticipations),
        tap(adjustCursors),
        switchMap(getFullParticipation),
        tap(() => setLoading(false)),
        tap(() => console.log('lastDoc After', lastDoc.current))
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <DynamicCard>
        <SearchField
          type='number'
          placeholder='Event Code'
          min='00000000'
          max='99999999'
          onChangeFn={(e) => onSearch$.next(Number(e.target.value))}
        />

        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Event Code</th>
                <th>Role</th>
                <th>VIA Hours</th>
              </tr>
            </thead>

            <tbody>
              <RenderLoading loading={loading} />
              <RenderData data={data} loading={loading} />
            </tbody>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
});

export default Participants;
