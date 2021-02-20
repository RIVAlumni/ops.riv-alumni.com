import React, { memo, useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { firestore } from 'firebase/app';
import { useParams } from 'react-router-dom';

import { tap, map } from 'rxjs/operators';
import { docData } from 'rxfire/firestore';

import { Event } from '../../models';
import {
  InputField,
  PageHeader,
  DynamicCard,
  LoadingStatus,
} from '../../components';

interface IEditEventParams {
  id: string;
}

const EditEvent: React.FC = memo(() => {
  const params = useParams<IEditEventParams>();

  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore().doc(`events/${params.id}`);

    const unsub = docData<Event>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((data) => (isEmpty(data) ? undefined : data)),
        tap(() => setLoading(false))
      )
      .subscribe(setEvent);

    return () => unsub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!event)
    return (
      <section>
        <PageHeader>Event Not Found.</PageHeader>

        <pre>Please try again.</pre>
      </section>
    );

  return (
    <section>
      <PageHeader>Edit Event</PageHeader>

      <DynamicCard>
        <InputField
          disabled
          type='text'
          name='Event Code'
          label='Event Code'
          defaultValue={event['Event Code']}
        />

        <InputField
          disabled
          type='text'
          name='Event Year'
          label='Event Year'
          defaultValue={event['Event Year']}
        />

        <InputField
          type='text'
          name='Event Name'
          label='Event Name'
          defaultValue={event['Event Name']}
        />

        <InputField
          type='text'
          name='Event Overall In-Charge'
          label='Event Overall In-Charge'
          defaultValue={event['Event Overall In-Charge']}
        />

        <InputField
          type='text'
          name='Event Assistant In-Charge'
          label='Event Assistant In-Charge'
          defaultValue={event['Event Assistant In-Charge']}
        />

        <InputField
          type='text'
          name='Google Drive'
          label='Google Drive'
          defaultValue={event['Google Drive']}
        />
      </DynamicCard>
    </section>
  );
});

export default EditEvent;
