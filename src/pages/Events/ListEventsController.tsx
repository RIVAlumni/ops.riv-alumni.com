import { useRef, useState, useEffect } from 'react';

import { firestore } from 'firebase/app';
import { collection } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { Event } from '../../models';
import { LoadingStatus } from '../../components';
import { MAX_EVENT_CODE } from '../../constants';
import { ListEventsView } from './ListEventsView';

const onSearch$ = new BehaviorSubject(0);

const useController = () => {
  const setSearch = (search: number) => onSearch$.next(search);
  const loadNextPage = () => onSearch$.next(onSearch$.value);

  return { setSearch, loadNextPage };
};

const ListEventsController: React.FC = () => {
  const [data, setData] = useState<Event[] | undefined>();
  const lastDoc = useRef<firestore.QueryDocumentSnapshot>();

  const resetCursors = () => onSearch$.value && (lastDoc.current = undefined);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getEvents = (eventCode: number) => {
    if (eventCode > 0) {
      const query = firestore()
        .collection('events')
        .where('Event Code', '==', eventCode)
        .limit(15);

      return collection(query);
    }

    const query = firestore()
      .collection('events')
      .orderBy('Event Code', 'desc')
      .startAfter(lastDoc.current ?? MAX_EVENT_CODE)
      .limit(15);

    return collection(query);
  };

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(300),
        switchMap(getEvents),
        tap(adjustCursors),
        map((snapshot) => snapshot.map((snap) => snap.data() as Event)),
        tap(resetCursors)
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  if (data === undefined) return <LoadingStatus />;
  return <ListEventsView data={data} />;
};

export { useController, ListEventsController };
