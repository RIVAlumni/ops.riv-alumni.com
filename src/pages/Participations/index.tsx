import { memo, useRef, useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { docData, collection } from 'rxfire/firestore';

import { of, combineLatest, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { Member, Participation } from '../../models';
import {
  QUERY_LIMIT,
  MAX_VIA_HOURS,
  MAX_EVENT_CODE,
  FIRESTORE_COLLECTIONS,
} from '../../constants';

import { Search } from '../../ui/Search';
import { PageHeader, DynamicCard, RenderTableLoading } from '../../components';

interface IRenderDataProps {
  data: (Member & Participation)[];
  loading: boolean;
}

const onSearch$ = new BehaviorSubject<number>(0);

const membersRef = firestore().collection(FIRESTORE_COLLECTIONS.Members);
const participationsRef = firestore().collection(
  FIRESTORE_COLLECTIONS.Participations
);

const COLSPAN = 5;

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  const router = useHistory();

  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={COLSPAN} className='text-center'>
          No participants found.
        </td>
      </tr>
    );

  return (
    <Fragment>
      {data.map((prt) => (
        <tr key={prt['Membership ID'] + prt['Event Code']}>
          <td className='text-dark text-truncate'>{prt['Full Name']}</td>
          <td>{prt['Event Code']}</td>
          <td>{prt['Role']}</td>
          <td>{prt['VIA Hours']}</td>
          <td>
            <button
              className='btn btn-primary'
              onClick={() =>
                router.push(
                  `/manage/participations/${prt['Participation ID']}/view`
                )
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

const Participants: React.FC = memo(() => {
  const lastDoc = useRef<firestore.QueryDocumentSnapshot | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<(Member & Participation)[]>([]);

  const resetCursors = () => onSearch$.value && (lastDoc.current = undefined);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getParticipations = (eventCode: number) => {
    if (eventCode > 0) {
      const query = participationsRef
        .where('Event Code', '==', eventCode)
        .orderBy('VIA Hours', 'desc')
        .startAfter(lastDoc.current ?? MAX_VIA_HOURS)
        .limit(QUERY_LIMIT);

      return collection(query);
    }

    const query = participationsRef
      .orderBy('VIA Hours', 'desc')
      .orderBy('Event Code', 'desc')
      .startAfter(lastDoc.current ?? MAX_EVENT_CODE)
      .limit(QUERY_LIMIT);

    return collection(query);
  };

  const getFullParticipation = (participations: Participation[]) => {
    if (participations.length === 0) return of([]);

    return combineLatest(
      participations.map((participation) =>
        docData<Member>(membersRef.doc(participation['Membership ID'])).pipe(
          map((member) => ({ ...member, ...participation }))
        )
      )
    );
  };

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        switchMap(getParticipations),
        tap(adjustCursors),
        map((result) => result.map((r) => r.data() as Participation)),
        switchMap(getFullParticipation),
        tap(() => setLoading(false)),
        tap(resetCursors)
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <Search
        type='number'
        placeholder='Event Code'
        min='00000000'
        max='99999999'
        onChange={(e) => onSearch$.next(Number(e.target.value))}
      />

      <DynamicCard>
        <div className='table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Event Code</th>
                <th>Role</th>
                <th>VIA Hours</th>
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

export default Participants;
