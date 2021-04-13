import React, { memo, useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { collection } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { User } from '../../models';
import { QUERY_LIMIT } from '../../constants';
import { UserAccessLevels } from '../../models';
import {
  PageHeader,
  DynamicCard,
  SearchField,
  RenderTableLoading,
} from '../../components';

interface IRenderDataProps {
  data: User[];
  loading: boolean;
}

const baseRef = firestore().collection('users');
const onSearch$ = new BehaviorSubject<string>('');

const COLSPAN = 4;

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  const router = useHistory();

  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={COLSPAN} className='text-center'>
          No users found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {data.map((user) => (
        <tr key={user['User ID']}>
          <td className='text-dark text-truncate'>{user['Display Name']}</td>
          <td>{user['Email']}</td>
          <td>{UserAccessLevels[user['Access Level']]}</td>
          <td>
            <button
              className='btn btn-primary'
              onClick={() =>
                router.push(`/manage/users/${user['User ID']}/view`)
              }>
              <i className='fas fa-eye' />
            </button>
          </td>
        </tr>
      ))}

      {data.length === QUERY_LIMIT && (
        <tr>
          <td colSpan={COLSPAN} className='text-center'>
            <button onClick={() => onSearch$.next(onSearch$.value)}>
              Load More
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
});

const Users: React.FC = memo(() => {
  const lastDoc = useRef<firestore.QueryDocumentSnapshot | undefined>();

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const resetCursors = () =>
    onSearch$.value.length && (lastDoc.current = undefined);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
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

      return collection(query);
    }

    const query = baseRef
      .orderBy('Display Name', 'asc')
      .startAfter(lastDoc.current ?? null)
      .limit(QUERY_LIMIT);

    return collection(query);
  };

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        map((search) => search.trim()),
        tap(() => setLoading(true)),
        switchMap(getUsers),
        tap(adjustCursors),
        map((result) => result.map((r) => r.data() as User)),
        tap(() => setLoading(false)),
        tap(resetCursors)
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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <RenderTableLoading colspan={COLSPAN} loading={loading} />
              <RenderData data={data} loading={loading} />
            </tbody>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
});

export default Users;
