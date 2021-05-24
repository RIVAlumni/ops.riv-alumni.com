import { useState, useEffect } from 'react';
import { firestore } from 'firebase/app';

import { collection } from 'rxfire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, debounceTime } from 'rxjs/operators';

import { Event, Member } from '../../models';
import { FORM_SCHEMA_EVENT } from '../../schema';

type FormEventData = Omit<
  Event,
  'Event Year' | 'Event Code' | 'Event Thumbnail'
> & {
  'Event Code': string;
  'Event Thumbnail': FileList;
};

type FormEventParsed = Event;

const ref = firestore().collection('members');
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
  const [searchQueryResults, setSearchQueryResults] = useState<Member[]>([]);

  useEffect(() => {
    searchQuery.next('');

    const sub = searchQuery
      .pipe(
        debounceTime(300),
        switchMap((search) => {
          const start = search;
          const end = start + '~';

          const query = ref
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

    const parsedFormData: FormEventParsed = {
      ...casted,
      'Event Code': Number(parsedEventCode),
      'Event Year': Number(parsedEventCode.substr(0, 4)),

      // TODO: Must change!
      'Event Thumbnail': casted['Event Thumbnail'].name,
    };

    console.log(parsedFormData);
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
