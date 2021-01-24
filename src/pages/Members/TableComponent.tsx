import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from 'firebase/app';

import { collectionData } from 'rxfire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, debounceTime, switchMap } from 'rxjs/operators';

import { Member } from '../../models';
import { QUERY_LIMIT } from '../../constants';

let lastDoc: Member | null = null;

const onSearch$ = new BehaviorSubject<string>('');

const adjustCursors = (docs: Member[]) => {
  return docs.length <= 0
    ? (lastDoc = null)
    : (lastDoc = docs[docs.length - 1]);
};

const getMembers = (fullName: string): Observable<Member[]> => {
  if (fullName) {
    const start = fullName;
    const end = start + '~';

    const query = firestore()
      .collection('members')
      .orderBy('Full Name')
      .startAt(start)
      .endAt(end)
      .limit(QUERY_LIMIT);

    return collectionData<Member>(query);
  }

  const query = firestore()
    .collection('members')
    .orderBy('Full Name', 'asc')
    .startAfter(lastDoc ? lastDoc['Full Name'] : null)
    .limit(QUERY_LIMIT);

  return collectionData<Member>(query);
};

const InfiniteScrollComponent: React.FC = memo(() => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        switchMap(getMembers),
        tap(adjustCursors),
        tap(() => setLoading(false)),
        tap(() => onSearch$.value.length > 0 && (lastDoc = null))
      )
      .subscribe(setMembers);

    return () => sub.unsubscribe();
  }, []);

  if (loading)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          Loading...
        </td>
      </tr>
    );

  if (!loading && members.length === 0)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          No members found.
        </td>
      </tr>
    );

  if (!loading)
    return (
      <React.Fragment>
        {members.map((m) => (
          <tr key={m['Membership ID']}>
            <td>
              <Link
                className='text-dark text-truncate'
                to={`/manage/members/${m['Membership ID']}`}>
                {m['Full Name']}
              </Link>
            </td>
            <td>{m['Gender']}</td>
            <td>{m['Contact Number']}</td>
            <td>{m['Graduating Year']}</td>
          </tr>
        ))}

        {!loading && members.length === QUERY_LIMIT && (
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

  return (
    <tr>
      <td colSpan={4} className='text-center'>
        An error occurred.
      </td>
    </tr>
  );
});

const TableComponent: React.FC = memo(() => {
  return (
    <div className='table-responsive'>
      <table className='table table-hover table-borderless mb-0'>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Graduating Year</th>
          </tr>
        </thead>

        <tbody>
          <InfiniteScrollComponent />
        </tbody>
      </table>
    </div>
  );
});

export { onSearch$, TableComponent };
