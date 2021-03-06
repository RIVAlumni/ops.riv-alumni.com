import { memo, useRef, useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { of, combineLatest } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { firestore } from 'firebase/app';
import { docData, collection } from 'rxfire/firestore';

import { Event, Member, Participation } from '../../models';
import {
  QUERY_LIMIT,
  MAX_EVENT_CODE,
  FIRESTORE_COLLECTIONS,
} from '../../constants';

import { RenderTableLoading } from '../../components';

interface IEventsParticipated {
  member: Member;
}

interface IRenderDataProps {
  data: (Event & Participation)[];
  loading: boolean;
}

const eventsRef = firestore().collection(FIRESTORE_COLLECTIONS.Events);
const participationsRef = firestore().collection(
  FIRESTORE_COLLECTIONS.Participations
);

const RenderData: React.FC<IRenderDataProps> = ({ data, loading }) => {
  if (!loading && data.length === 0)
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          No participations found.
        </td>
      </tr>
    );

  return (
    <Fragment>
      {data.map((prt) => (
        <tr key={prt['Event Code']}>
          <td>
            <Link
              className='text-dark text-truncate'
              to={`/manage/events/${prt['Event Code']}/view`}>
              {prt['Event Code']}
            </Link>
          </td>
          <td>{prt['Event Name']}</td>
          <td>{prt['Role']}</td>
          <td>{prt['VIA Hours']}</td>
        </tr>
      ))}
    </Fragment>
  );
};

const EventsParticipated: React.FC<IEventsParticipated> = memo(({ member }) => {
  const lastDoc = useRef<firestore.QueryDocumentSnapshot | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<(Event & Participation)[]>([]);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getFullEvent = (participations: Participation[]) => {
    if (participations.length === 0) return of([]);

    return combineLatest(
      participations.map((participation) =>
        docData<Event>(
          eventsRef.doc(participation['Event Code'].toString())
        ).pipe(map((event) => ({ ...event, ...participation })))
      )
    );
  };

  useEffect(() => {
    if (!member) return () => {};

    const query = participationsRef
      .where('Membership ID', '==', member['Membership ID'])
      .orderBy('Event Code', 'desc')
      .startAfter(lastDoc.current ?? MAX_EVENT_CODE)
      .limit(QUERY_LIMIT);

    const sub = collection(query)
      .pipe(
        tap(() => setLoading(true)),
        tap(adjustCursors),
        map((result) => result.map((r) => r.data() as Participation)),
        switchMap(getFullEvent),
        tap(() => setLoading(false))
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, [member]);

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-borderless mb-0'>
        <thead>
          <tr>
            <th>Event Code</th>
            <th>Event Name</th>
            <th>Role</th>
            <th>VIA Hours</th>
          </tr>
        </thead>

        <tbody>
          <RenderTableLoading colspan={4} loading={loading} />
          <RenderData data={data} loading={loading} />
        </tbody>
      </table>
    </div>
  );
});

export default EventsParticipated;
