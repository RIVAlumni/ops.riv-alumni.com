import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { app, storage, firestore } from 'firebase/app';
import { collection } from 'rxfire/firestore';

import { BehaviorSubject } from 'rxjs';
import { map, switchMap, debounceTime } from 'rxjs/operators';

import { Event, Member } from '../../models';
import { FORM_SCHEMA_EVENT } from '../../schema';
import { STORAGE_BUCKETS, FIRESTORE_COLLECTIONS } from '../../constants';

type FormEventData = Omit<
  Event,
  'Event Year' | 'Event Code' | 'Event Thumbnail'
> & {
  'Event Code': string;
  'Event Thumbnail': FileList;
};

type FormEventParsed = Event;

const membersRef = firestore().collection(FIRESTORE_COLLECTIONS.Members);
const eventsRef = firestore().collection(FIRESTORE_COLLECTIONS.Events);

const storageApp = app(STORAGE_BUCKETS.Events);
const storageRef = storage(storageApp).ref('thumbnails');

const searchQuery = new BehaviorSubject('');

const initialValues: FormEventData = {
  'Event Code': undefined as any,
  'Event Name': undefined as any,
  'Event Thumbnail': undefined as any,
  'Event Overall In-Charge': undefined as any,
  'Event Assistant In-Charge': undefined as any,
  'Google Drive': undefined as any,
  'Roles': [
    { ID: 'OIC', Definition: 'Overall In-Charge' },
    { ID: 'AIC', Definition: 'Assistant In-Charge' },
    { ID: 'PTR', Definition: 'Participant' },
  ],
  'Official Event': false,
  'updatedAt': firestore.FieldValue.serverTimestamp(),
  'createdAt': firestore.FieldValue.serverTimestamp(),
};

const useEventFormController = () => {
  const history = useHistory();
  const [searchQueryResults, setSearchQueryResults] = useState<Member[]>([]);

  useEffect(() => {
    searchQuery.next('');

    const sub = searchQuery
      .pipe(
        debounceTime(300),
        switchMap((search) => {
          const start = search;
          const end = start + '~';

          const query = membersRef
            .orderBy('Full Name')
            .startAt(start)
            .endAt(end)
            .limit(5);

          return collection(query);
        }),
        map((snapshot) => snapshot.map((snap) => snap.data() as Member))
      )
      .subscribe(setSearchQueryResults);

    return () => sub.unsubscribe();
  }, []);

  const onSearchQuery = (fullName: string) => {
    searchQuery.next(fullName);
  };

  const onFormSubmit = async (data: FormEventData) => {
    const casted = FORM_SCHEMA_EVENT().cast(data);
    const parsedEventCode = casted['Event Code'].split('-').join('');

    const thumbnailUrl = await (
      await storageRef.child(parsedEventCode).put(casted['Event Thumbnail'])
    ).ref.getDownloadURL();

    const parsedFormData: FormEventParsed = {
      ...casted,
      'Event Code': Number(parsedEventCode),
      'Event Year': Number(parsedEventCode.substr(0, 4)),
      'Event Thumbnail': thumbnailUrl,
    };

    try {
      await eventsRef.doc(parsedEventCode).set(parsedFormData, { merge: true });
      return history.replace(`/manage/events/${parsedEventCode}/view`);
    } catch (e) {
      return alert(`An Error Occurred: ${e}`);
    }
  };

  return {
    initialValues,
    searchQueryResults,
    onSearchQuery,
    onFormSubmit,
  };
};

export { useEventFormController };
export type { FormEventData, FormEventParsed };
