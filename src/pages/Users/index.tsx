import React, { memo, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { collectionData } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, debounceTime, switchMap } from 'rxjs/operators';

import { User } from '../../models';
import { QUERY_LIMIT } from '../../constants';
import { UserAccessLevels } from '../../models';
import { PageHeader, DynamicCard, SearchField } from '../../components';

interface IRenderLoadingProps {
  loading: boolean;
}

interface IRenderDataProps {
  data: User[];
  loading: boolean;
}

const baseRef = firestore().collection('users');
const onSearch$ = new BehaviorSubject<string>('');

const RenderLoading: React.FC<IRenderLoadingProps> = memo(({ loading }) =>
  !loading ? null : (
    <tr>
      <td colSpan={3} className='text-center'>
        Loading...
      </td>
    </tr>
  )
);

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={3} className='text-center'>
          No users found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {data.map((user) => (
        <tr key={user['User ID']}>
          <td>
            <Link
              className='text-dark text-truncate'
              to={`/manage/users/${user['User ID']}`}>
              {user['Display Name']}
            </Link>
          </td>

          <td>{user['Email']}</td>
          <td>{UserAccessLevels[user['Access Level']]}</td>
        </tr>
      ))}

      {data.length === QUERY_LIMIT && (
        <tr>
          <td colSpan={3} className='text-center'>
            <button onClick={() => onSearch$.next(onSearch$.value)}>
              Load More
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
});

const Users: React.FC = () => {
  const lastDoc = useRef<User | undefined>(undefined);

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const adjustCursors = (docs: User[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getUsers = (displayName: string) => {
    if (displayName) {
      const start = displayName;
      const end = start + '~';

      const query = baseRef
        .orderBy('Display Name')
        .startAt(start)
        .endAt(end)
        .limit(QUERY_LIMIT);

      return collectionData<User>(query);
    }

    const query = baseRef
      .orderBy('Display Name', 'asc')
      .startAfter(lastDoc.current ? lastDoc.current['Display Name'] : null)
      .limit(QUERY_LIMIT);

    return collectionData<User>(query);
  };

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        switchMap(getUsers),
        tap(adjustCursors),
        tap(() => setLoading(false))
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  return (
    <section>
      <PageHeader>Manage Users</PageHeader>

      <DynamicCard>
        <SearchField
          type='text'
          placeholder='Display Name'
          onChangeFn={(e) => onSearch$.next(e.target.value)}
        />

        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>Display Name</th>
                <th>Email Address</th>
                <th>Access Level</th>
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
};

export default Users;
