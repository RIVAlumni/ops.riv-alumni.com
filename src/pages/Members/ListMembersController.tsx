import { useRef, useState, useEffect } from 'react';

import { firestore } from 'firebase/app';
import { collection } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { Member } from '../../models';
import { FIRESTORE_COLLECTIONS } from '../../constants';

import { LoadingStatus } from '../../components';
import { ListMembersView } from './ListMembersView';

const onSearch$ = new BehaviorSubject('');

const useController = () => {
  const setSearch = (search: string) => onSearch$.next(search);
  const loadNextPage = () => onSearch$.next(onSearch$.value);

  return { setSearch, loadNextPage };
};

const ListMembersController: React.FC = () => {
  const [data, setData] = useState<Member[] | undefined>();
  const lastDoc = useRef<firestore.QueryDocumentSnapshot>();

  const resetCursors = () =>
    onSearch$.value.length && (lastDoc.current = undefined);

  const adjustCursors = (docs: firestore.QueryDocumentSnapshot[]) =>
    docs.length <= 0
      ? (lastDoc.current = undefined)
      : (lastDoc.current = docs[docs.length - 1]);

  const getMembers = (fullName: string) => {
    const ref = firestore().collection(FIRESTORE_COLLECTIONS.Members);

    if (!fullName) {
      const query = ref
        .orderBy('Full Name', 'asc')
        .startAfter(lastDoc.current ?? null)
        .limit(15);

      return collection(query);
    }

    const start = fullName;
    const end = start + '~';

    const query = ref.orderBy('Full Name').startAt(start).endAt(end).limit(15);

    return collection(query);
  };

  useEffect(() => {
    /**
     * Invalidates the previous search that is stored as cache.
     */
    onSearch$.next('');

    const sub = onSearch$
      .pipe(
        debounceTime(300),
        switchMap(getMembers),
        tap(adjustCursors),
        map((snapshot) => snapshot.map((snap) => snap.data() as Member)),
        tap(resetCursors)
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  if (data === undefined) return <LoadingStatus />;
  return <ListMembersView data={data} />;
};

export { useController, ListMembersController };
