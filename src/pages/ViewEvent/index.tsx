import React, { memo, useState, useEffect } from 'react';

import { firestore } from 'firebase/app';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'lodash';
import { docData } from 'rxfire/firestore';
import { tap, map } from 'rxjs/operators';

import { Event } from '../../models';
import { PageHeader, DynamicCard, LoadingStatus } from '../../components';

interface IViewEventProps {
  id: string;
}

const ViewEvent: React.FC = memo(() => {
  const params = useParams<IViewEventProps>();

  const [event, setEvent] = useState<Event | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore().doc(`events/${params.id}`);

    const sub = docData<Event | undefined>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((data) => (isEmpty(data) ? undefined : data)),
        tap(() => setLoading(false))
      )
      .subscribe(setEvent);

    return () => sub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!event)
    return (
      <section>
        <PageHeader>Event Not Found.</PageHeader>

        <DynamicCard>
          <pre className='m-0'>
            No event found. Please check if <b>{params.id}</b> is the correct
            identifer.
          </pre>
        </DynamicCard>
      </section>
    );

  return (
    <section>
      <PageHeader>Event Information</PageHeader>

      <DynamicCard>
        <div className='row'>
          <div className='col-12'>
            <h6>{event['Event Name']}</h6>
          </div>
        </div>
      </DynamicCard>
    </section>
  );
});

export default ViewEvent;
