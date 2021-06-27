import { useRef, useState, useEffect } from 'react';

import { firestore } from 'firebase/app';
import { docData, collection } from 'rxfire/firestore';

import { uniqBy } from 'lodash';
import { of, combineLatest, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { Member, Participation } from '../../models';
import {
  QUERY_LIMIT,
  MAX_VIA_HOURS,
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

  const [complete, setComplete] = useState(false);
  const [data, setData] = useState<(Member & Participation)[]>();

  const setSearchQuery = (search: number) => searchQuery$.next(search);
  const fetchNextPage = () => searchQuery$.next(searchQuery$.value);

  const resetCursors = () =>
    searchQuery$.value && (lastDoc.current = undefined);

  const adjustComplete = (docs: firestore.QueryDocumentSnapshot[]) =>
    setComplete(docs.length < QUERY_LIMIT);

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
        debounceTime(300),
        switchMap(getParticipations),
        tap(adjustCursors),
        tap(adjustComplete),
        map((docs) => docs.map((doc) => doc.data() as Participation)),
        switchMap(mergeWithMembership),
        tap(resetCursors)
      )
      .subscribe((docs) =>
        setData((prevState) =>
          uniqBy([...(prevState || []), ...docs], 'Participation ID')
        )
      );

    return () => sub.unsubscribe();
  }, []);

  return { data, complete, setSearchQuery, fetchNextPage };
};

export { useParticipationsController };
