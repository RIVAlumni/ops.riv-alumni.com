import React, { memo, useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { docData } from 'rxfire/firestore';
import { firestore } from 'firebase/app';
import { useParams } from 'react-router-dom';
import { tap, map } from 'rxjs/operators';

import { Event } from '../../models';
import {
  Input,
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
        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Event Code</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input disabled type='text' value={event['Event Code']} />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Event Year</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input disabled type='text' value={event['Event Year']} />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Event Name</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input type='text' value={event['Event Name']} />
          </div>
        </div>
      </DynamicCard>
    </section>
  );
});

export default EditEvent;
