import React, { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { collectionData } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, debounceTime, switchMap } from 'rxjs/operators';

import { Event } from '../../models';
import { QUERY_LIMIT, MAX_EVENT_CODE } from '../../constants';
import {
  PageHeader,
  DynamicCard,
  SearchField,
  RenderTableLoading,
} from '../../components';

interface IRenderDataProps {
  data: Event[];
  loading: boolean;
}

const onSearch$ = new BehaviorSubject<number>(0);
const baseRef = firestore().collection('events');

const RenderData: React.FC<IRenderDataProps> = memo(({ data, loading }) => {
  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          No events found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {data.map((evt) => (
        <tr key={evt['Event Code']}>
          <td>{evt['Event Year']}</td>
          <td>{evt['Event Code']}</td>
          <td>
            <Link
              className='text-dark'
              to={`/manage/events/${evt['Event Code']}`}>
              {evt['Event Name']}
            </Link>
          </td>
          <td>
            <a
              href={evt['Google Drive']}
              target='_blank'
              rel='noopener noreferrer'>
              External Link
            </a>
          </td>
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

const Events: React.FC = memo(() => {
  const lastDoc = useRef<Event | undefined>(undefined);

  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const adjustCursors = (docs: Event[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getEvents = (eventCode: number) => {
    if (eventCode > 0) {
      const query = baseRef
        .where('Event Code', '==', eventCode)
        .limit(QUERY_LIMIT);

      return collectionData<Event>(query);
    }

    const query = baseRef
      .orderBy('Event Code', 'desc')
      .startAfter(lastDoc.current ?? MAX_EVENT_CODE)
      .limit(QUERY_LIMIT);

    return collectionData<Event>(query);
  };

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        switchMap(getEvents),
        tap(adjustCursors),
        tap(() => setLoading(false))
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  return (
    <section>
      <PageHeader>Manage Events</PageHeader>

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
                <th>Event Year</th>
                <th>Event Code</th>
                <th>Event Name</th>
                <th>Google Drive</th>
              </tr>
            </thead>

            <tbody>
              <RenderTableLoading colspan={4} loading={loading} />
              <RenderData data={data} loading={loading} />
            </tbody>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
});

export default Events;
