import dayjs from 'dayjs';

import { memo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { isEmpty } from 'lodash';
import { app, storage, firestore } from 'firebase/app';

import { of, combineLatest } from 'rxjs';
import { docData } from 'rxfire/firestore';
import { tap, map, switchMap } from 'rxjs/operators';

import { FirebaseService } from '../../services';
import { Member, Event } from '../../models';
import { PageHeader, DynamicCard, LoadingStatus } from '../../components';

interface IViewEventProps {
  id: string;
}

interface DetailedEventView extends Event {
  'Overall In-Charge': Member;
  'Assistant In-Charge': Member;
}

const storageApp = app('storage');
const storageRef = storage(storageApp).ref('thumbnails');

const firebase = FirebaseService.getInstance();

const ViewEvent: React.FC = memo(() => {
  const params = useParams<IViewEventProps>();

  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<DetailedEventView>();

  useEffect(() => {
    const query = firestore().collection('events').doc(params.id);

    const sub = docData<DetailedEventView>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((data) => (isEmpty(data) ? undefined : data)),
        switchMap((_event) => {
          if (!_event) return of(undefined);

          return combineLatest(
            firebase.getMemberDoc(_event['Event Overall In-Charge']),
            firebase.getMemberDoc(_event['Event Assistant In-Charge']),
            storageRef.child(_event['Event Code'].toString()).getDownloadURL()
          ).pipe(
            map(([_oic, _aic, _url]) => ({
              ..._event,
              'Overall In-Charge': _oic,
              'Assistant In-Charge': _aic,
              'Event Thumbnail': `${_url}?alt=media`,
            }))
          );
        }),
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

  const isOfficial = event['Official Event'] ? 'Official' : 'Non-Official';
  const happenedOn = dayjs(String(event['Event Code']), 'YYYYMMDD').format(
    'dddd, DD MMMM YYYY'
  );

  return (
    <section>
      <PageHeader>Event Information</PageHeader>

      <div
        className='text-white jumbotron'
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${event['Event Thumbnail']}), black`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '10px',
        }}>
        <h1
          className='m-0 display-5 font-weight-bold'
          style={{ lineHeight: 1.5 }}>
          {event['Event Name']}
        </h1>

        <p className='mb-5 text-light'>
          {isOfficial} Event &bull; Occurred on {happenedOn}
        </p>

        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6'>
            <p className='mb-1 text-light'>Event Year</p>
            <h5 className='text-white font-weight-bold'>
              {event['Event Year']}
            </h5>
          </div>

          <div className='col-sm-12 col-md-6 col-lg-6'>
            <p className='mb-1 text-light'>Event Code</p>
            <h5 className='text-white font-weight-bold'>
              {event['Event Code']}
            </h5>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6'>
            <p className='mb-1 text-light'>Overall In-Charge</p>
            <h5>
              <Link
                className='text-white font-weight-bold'
                to={`/manage/members/${event['Event Overall In-Charge']}/view`}>
                {event['Overall In-Charge']['Full Name']}
              </Link>
            </h5>
          </div>

          <div className='col-sm-12 col-md-6 col-lg-6'>
            <p className='mb-1 text-light'>Assistant In-Charge</p>
            <h5>
              <Link
                className='h5 text-white font-weight-bold'
                to={`/manage/members/${event['Event Assistant In-Charge']}/view`}>
                {event['Assistant In-Charge']['Full Name']}
              </Link>
            </h5>
          </div>

          <div className='col-12'>
            <p className='mb-1 text-light'>Event Actions</p>
            <div className='btn-group btn-group-sm'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={event['Google Drive']}
                className='btn btn-light font-weight-bold'>
                <i className='mr-2 fas fa-external-link-alt' />
                Google Drive
              </a>
              <Link
                to={`/manage/events/${params.id}/edit`}
                className='btn btn-warning font-weight-bold'>
                <i className='mr-2 fas fa-pencil-alt' />
                Edit Event
              </Link>
              <button className='btn btn-danger' disabled>
                <i className='mr-2 fas fa-trash' />
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ViewEvent;
