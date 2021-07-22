import { useRef, useState, useEffect } from 'react';

import { firestore } from 'firebase/app';
import { docData, collection } from 'rxfire/firestore';

import { uniqBy } from 'lodash';
import { of, combineLatest, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { Member, Participation } from '../../models';
import {
  QUERY_LIMIT,
  // MAX_VIA_HOURS,
  MAX_EVENT_CODE,
  FIRESTORE_COLLECTIONS,
} from '../../constants';

const searchQuery$ = new BehaviorSubject(0);

const membersRef = firestore().collection(FIRESTORE_COLLECTIONS.Members);
const participationsRef = firestore().collection(
  FIRESTORE_COLLECTIONS.Participations
);

const useParticipationsController = () => {
  const lastDoc = useRef<firestore.QueryDocumentSnapshot>();
  const lastQueryCode = useRef<number>(0);

  useEffect(() => console.log(lastDoc.current?.data()));

  const [complete, setComplete] = useState(false);
  const [data, setData] = useState<(Member & Participation)[]>();

  const setSearchQuery = (search: number) => searchQuery$.next(search);
  const fetchNextPage = () => searchQuery$.next(searchQuery$.value);

  const resetCursors = () =>
    searchQuery$.value !== lastQueryCode.current &&
    (lastDoc.current = undefined);

  const resetDataWhenSearching = (eventCode: number) => {
    if (eventCode === lastQueryCode.current) return;

    setData([]);
    lastDoc.current = undefined;
  };

  const adjustLastSearch = (eventCode: number) =>
    (lastQueryCode.current = eventCode);

  const adjustComplete = (docs: firestore.QueryDocumentSnapshot[]) =>
    setComplete(docs.length < QUERY_LIMIT);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getParticipations = (eventCode: number) => {
    if (eventCode > 0) {
      // const query = participationsRef
      //   .where('Event Code', '==', eventCode)
      //   .orderBy('VIA Hours', 'desc')
      //   .startAfter(lastDoc.current ?? MAX_VIA_HOURS)
      //   .limit(QUERY_LIMIT);

      const query = participationsRef
        .where('Event Code', '==', eventCode)
        .orderBy('Role', 'asc')
        .startAfter(lastDoc.current ?? '')
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

  const mergeWithMembership = (participations: Participation[]) => {
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
    searchQuery$.next(0);

    const sub = searchQuery$
      .pipe(
        /*
         * Prevent searching after every keystroke. Waits 300ms
         * before actually querying the database.
         */
        debounceTime(300),
        /*
         * Resets query pointers if there is a change in the
         * search parameters.
         */
        tap(resetDataWhenSearching),
        /*
         * Stores the current search for future comparison.
         */
        tap(adjustLastSearch),
        /*
         * Get data from Firestore query.
         */
        switchMap(getParticipations),
        /*
         * Stores the last DocumentSnapshot found in the returned
         * list of data from the query, to be used for querying
         * the next set of data.
         */
        tap(adjustCursors),
        /*
         * Changes the query state from "complete" to "non-complete"
         * if there is more data that has not been fetched yet.
         */
        tap(adjustComplete),
        /*
         * Converts all the DocumentSnapshots into actual data values.
         */
        map((docs) => docs.map((doc) => doc.data() as Participation)),
        /*
         * Fetch the next half of the query from the `members`
         * collection and merge the data with the participations
         * record.
         */
        switchMap(mergeWithMembership),
        /*
         * Resets the last DocumentSnapshot to `undefined` if the
         * cached query does not match the current query value.
         */
        tap(resetCursors)
      )
      .subscribe((docs) =>
        setData((prevDocs) =>
          uniqBy([...(prevDocs || []), ...docs], 'Participation ID')
        )
      );

    return () => sub.unsubscribe();
  }, []);

  return { data, complete, setSearchQuery, fetchNextPage };
};

export { useParticipationsController };
