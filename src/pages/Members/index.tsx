import React, { memo, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { collectionData } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, switchMap, debounceTime } from 'rxjs/operators';

import { Member } from '../../models';
import { QUERY_LIMIT } from '../../constants';
import { PageHeader, DynamicCard, SearchField } from '../../components';

interface IRenderLoadingProps {
  loading: boolean;
}

interface IRenderDataProps {
  data: Member[];
  loading: boolean;
}

const onSearch$ = new BehaviorSubject<string>('');
const baseRef = firestore().collection('members');

const RenderLoading: React.FC<IRenderLoadingProps> = memo(({ loading }) =>
  !loading ? null : (
    <tr>
      <td colSpan={4} className='text-center'>
        Loading...
      </td>
    </tr>
  )
);

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          No members found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {data.map((mem) => (
        <tr key={mem['Membership ID']}>
          <td>
            <Link
              className='text-dark text-truncate'
              to={`/manage/members/${mem['Membership ID']}`}>
              {mem['Full Name']}
            </Link>
          </td>
          <td>{mem['Gender']}</td>
          <td>{mem['Graduating Year']}</td>
          <td>{mem['Contact Number']}</td>
        </tr>
      ))}

      {data.length === QUERY_LIMIT && (
        <tr>
          <td colSpan={4} className='text-center'>
            <button onClick={() => onSearch$.next(onSearch$.value)}>
              Load More
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
});

const Members: React.FC = memo(() => {
  const lastDoc = useRef<Member | undefined>(undefined);

  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const adjustCursors = (docs: Member[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getMembers = (fullName: string) => {
    if (fullName) {
      const start = fullName;
      const end = start + '~';

      const query = baseRef
        .orderBy('Full Name')
        .startAt(start)
        .endAt(end)
        .limit(QUERY_LIMIT);

      return collectionData<Member>(query);
    }

    const query = baseRef
      .orderBy('Full Name', 'asc')
      .startAfter(lastDoc.current ? lastDoc.current['Full Name'] : null)
      .limit(QUERY_LIMIT);

    return collectionData<Member>(query);
  };

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        switchMap(getMembers),
        tap(adjustCursors),
        tap(() => setLoading(false)),
        tap(() => onSearch$.value.length && (lastDoc.current = undefined))
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  return (
    <section>
      <PageHeader>Manage Members</PageHeader>

      <DynamicCard>
        <SearchField
          type='text'
          placeholder='Full Name'
          onChangeFn={(e) => onSearch$.next(e.target.value)}
        />

        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Grad. Year</th>
                <th>Contact Number</th>
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

export default Members;
