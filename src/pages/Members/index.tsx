import { memo, useRef, useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { collection } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { Member } from '../../models';
import { QUERY_LIMIT } from '../../constants';
import {
  PageHeader,
  DynamicCard,
  SearchField,
  RenderTableLoading,
} from '../../components';

interface IRenderDataProps {
  data: Member[];
  loading: boolean;
}

const baseRef = firestore().collection('members');
const onSearch$ = new BehaviorSubject<string>('');

const COLSPAN = 5;

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  const router = useHistory();

  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={COLSPAN} className='text-center'>
          No members found.
        </td>
      </tr>
    );

  return (
    <Fragment>
      {data.map((mem) => (
        <tr key={mem['Membership ID']}>
          <td className='text-dark text-truncate'>{mem['Full Name']}</td>
          <td>{mem['Gender']}</td>
          <td>{mem['Graduating Year']}</td>
          <td>{mem['Contact Number']}</td>
          <td>
            <button
              className='btn btn-primary'
              onClick={() =>
                router.push(`/manage/members/${mem['Membership ID']}/view`)
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
    </Fragment>
  );
});

const Members: React.FC = memo(() => {
  const lastDoc = useRef<firestore.QueryDocumentSnapshot | undefined>();

  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const resetCursors = () =>
    onSearch$.value.length && (lastDoc.current = undefined);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
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

      return collection(query);
    }

    const query = baseRef
      .orderBy('Full Name', 'asc')
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
        switchMap(getMembers),
        tap(adjustCursors),
        map((result) => result.map((r) => r.data() as Member)),
        tap(() => setLoading(false)),
        tap(resetCursors)
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

export default Members;
