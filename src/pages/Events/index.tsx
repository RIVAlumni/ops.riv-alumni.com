import { memo, useEffect, useRef, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { collection } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { Event } from '../../models';
import { Search } from '../../ui/Search';
import { QUERY_LIMIT, MAX_EVENT_CODE } from '../../constants';
import { PageHeader, DynamicCard, RenderTableLoading } from '../../components';

interface IRenderDataProps {
  data: Event[];
  loading: boolean;
}

const baseRef = firestore().collection('events');
const onSearch$ = new BehaviorSubject<number>(0);

const COLSPAN = 5;

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  const router = useHistory();

  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={COLSPAN} className='text-center'>
          No events found.
        </td>
      </tr>
    );

  return (
    <Fragment>
      {data.map((evt) => (
        <tr key={evt['Event Code']}>
          <td>{evt['Event Year']}</td>
          <td>{evt['Event Code']}</td>
          <td className='text-dark text-truncate'>{evt['Event Name']}</td>
          <td>
            <a
              href={evt['Google Drive']}
              target='_blank'
              rel='noopener noreferrer'>
              External Link
            </a>
          </td>
          <td>
            <button
              className='btn btn-primary'
              onClick={() =>
                router.push(`/manage/events/${evt['Event Code']}/view`)
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

const Events: React.FC = memo(() => {
  const lastDoc = useRef<firestore.QueryDocumentSnapshot | undefined>();

  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const resetCursors = () => onSearch$.value && (lastDoc.current = undefined);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getEvents = (eventCode: number) => {
    if (eventCode > 0) {
      const query = baseRef
        .where('Event Code', '==', eventCode)
        .limit(QUERY_LIMIT);

      return collection(query);
    }

    const query = baseRef
      .orderBy('Event Code', 'desc')
      .startAfter(lastDoc.current ?? MAX_EVENT_CODE)
      .limit(QUERY_LIMIT);

    return collection(query);
  };

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        switchMap(getEvents),
        tap(adjustCursors),
        map((result) => result.map((r) => r.data() as Event)),
        tap(() => setLoading(false)),
        tap(resetCursors)
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  return (
    <section>
      <PageHeader>Manage Events</PageHeader>

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
                <th>Event Year</th>
                <th>Event Code</th>
                <th>Event Name</th>
                <th>Google Drive</th>
                <th>Event Details</th>
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

export default Events;
